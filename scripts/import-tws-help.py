"""One-off import: parse the reviewed TWS help-center HTML export into
src/data/tws-help.json, which the Astro pages under src/pages/help/tws render.

Usage: python scripts/import-tws-help.py <path-to>/preview/help/tws
"""
import glob, json, os, re, sys
from bs4 import BeautifulSoup

src = sys.argv[1]
out = os.path.join(os.path.dirname(__file__), "..", "src", "data", "tws-help.json")
BASE = "/help/tws/"


def fix_links(html: str) -> str:
    html = re.sub(r'(href|src)="\.\./assets/', rf'\1="{BASE}assets/', html)
    html = re.sub(r'href="\.\./([a-z0-9-]+)/index\.html"', rf'href="{BASE}\1/"', html)
    return html


def inner(tag) -> str:
    return fix_links("".join(str(c) for c in tag.contents))


articles = []
for f in sorted(glob.glob(os.path.join(src, "*", "index.html"))):
    slug = os.path.basename(os.path.dirname(f))
    s = BeautifulSoup(open(f, encoding="utf8").read(), "html.parser")
    m = s.find("main")
    ld = json.loads(s.find("script", type="application/ld+json").string)
    art = ld["@graph"][0]
    meta = m.find("p", class_="meta").get_text()
    read = re.search(r"(\d+) min read", meta)

    def section(id_, stop_ids):
        """HTML of all siblings after h2#id_ until the next stop."""
        h = m.find("h2", id=id_)
        parts = []
        for sib in h.find_next_siblings():
            if sib.name == "h2" or sib.get("id") in stop_ids:
                break
            parts.append(fix_links(str(sib)))
        return "".join(parts)

    steps = [inner(li) for li in m.find("ol", class_="steps").find_all("li", recursive=False)]
    step_ids = [li.get("id") for li in m.find("ol", class_="steps").find_all("li", recursive=False)]
    verify = m.find("div", id="verify")
    verify_title = verify.find("strong").extract().get_text()
    faqs = [
        {"q": d.find("h3").get_text(), "a": inner(d.find("p"))}
        for d in m.find_all("div", class_="faq")
    ]
    sources = [inner(li) for li in m.find("ul", class_="sources").find_all("li", recursive=False)]
    related = [
        {"slug": re.search(r"\.\./([^/]+)/", a["href"]).group(1), "title": a.get_text()}
        for a in m.find("div", class_="related").find_all("a")
    ]
    screen_h = m.find("h2", id="screen")
    screen = []
    for sib in screen_h.find_next_siblings():
        if sib.get("id") == "verify":
            break
        screen.append(fix_links(str(sib)))
    # trailing "Screenshots show control locations" note sits after sources
    src_note = m.find("ul", class_="sources").find_next_sibling("p", class_="meta")
    articles.append({
        "slug": slug,
        "title": m.find("h1").get_text(),
        "description": s.find("meta", attrs={"name": "description"})["content"],
        "group": m.find("div", class_="eyebrow").get_text(),
        "readMin": int(read.group(1)) if read else 2,
        "modified": art.get("dateModified"),
        "image": art.get("image"),
        "citation": art.get("citation", []),
        "answer": inner(m.find("section", class_="answer").find("p")),
        "steps": [{"id": i, "html": h} for i, h in zip(step_ids, steps)],
        "example": section("example", {"screen"}),
        "screen": "".join(screen),
        "verify": inner(verify),
        "avoid": inner(m.find("h2", id="avoid").find_next_sibling("div")),
        "faq": faqs,
        "sources": sources,
        "sourcesNote": inner(src_note) if src_note else "",
        "related": related,
        "pending": [inner(li) for li in m.find("details", class_="pending").find_all("li")] if m.find("details", class_="pending") else [],
        "passed": "passes internal checks" in str(m.find("div", class_="draft")),
    })

d = {"articles": articles}
os.makedirs(os.path.dirname(out), exist_ok=True)
json.dump(d, open(out, "w", encoding="utf8"), ensure_ascii=False, indent=1)
print(len(articles), "articles ->", os.path.normpath(out))
