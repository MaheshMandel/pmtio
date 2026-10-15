"""One-off import: parse the reviewed Rithmic help-center HTML export into
src/data/rithmic-help.json, rendered by src/pages/[...locale]/help/rithmic.

Usage: python scripts/import-rithmic-help.py <path-to>/rithmic-help-center
"""
import json, os, re, shutil, sys
from bs4 import BeautifulSoup

src = sys.argv[1]
prev = os.path.join(src, "preview", "help", "rithmic")
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
out = os.path.join(root, "src", "data", "rithmic-help.json")
BASE = "/help/rithmic/"


def fix_links(html: str) -> str:
    html = re.sub(r'(href|src)="\.\./assets/', rf'\1="{BASE}assets/', html)
    html = re.sub(r'href="\.\./([a-z0-9-]+)/(?:index\.html)?"', rf'href="{BASE}\1/"', html)
    html = re.sub(r'href="\.\./index\.html"', f'href="{BASE}"', html)
    return html


def inner(tag) -> str:
    return fix_links("".join(str(c) for c in tag.contents))


meta = json.load(open(os.path.join(src, "content", "articles.json"), encoding="utf8"))
order = {a["slug"]: i for i, a in enumerate(sorted(meta, key=lambda a: [int(x) for x in a["page_id"].split(".")]))}
articles = []
for slug in sorted(order, key=order.get):
    s = BeautifulSoup(open(os.path.join(prev, slug, "index.html"), encoding="utf8").read(), "html.parser")
    m = s.find("main")
    ld = json.loads(s.find("script", type="application/ld+json").string)["@graph"][0]
    read = re.search(r"(\d+) min read", m.find("p", class_="meta").get_text())
    note = m.find("p", class_="education-note")
    body = []
    for sib in note.find_next_siblings():
        if sib.name == "h2" and sib.get("id") == "faq":
            break
        body.append(fix_links(str(sib)))
    body = "".join(body)
    related_h = m.find("h2", id="related")
    related = [
        {"slug": re.search(r"\.\./([^/]+)/", a["href"]).group(1), "title": a.get_text()}
        for a in m.find("div", class_="related").find_all("a")
    ]
    toc = [{"id": h["id"], "label": h.get_text()} for h in note.find_next_siblings("h2") if h.get("id") not in ("faq", "related")]
    articles.append({
        "slug": slug,
        "title": m.find("h1").get_text(),
        "description": s.find("meta", attrs={"name": "description"})["content"],
        "group": m.find("div", class_="eyebrow").get_text(),
        "readMin": int(read.group(1)) if read else 2,
        "modified": ld["dateModified"],
        "answer": inner(m.find("section", class_="answer").find("p")),
        "toc": toc,
        "body": body,
        "faq": [{"q": d.find("h3").get_text(), "a": inner(d.find("p"))} for d in m.find_all("div", class_="faq")],
        "related": [r for r in related if r["slug"] in order],
    })

json.dump({"articles": articles}, open(out, "w", encoding="utf8"), ensure_ascii=False, indent=1)
dst = os.path.join(root, "public", "help", "rithmic", "assets", "screenshots")
os.makedirs(dst, exist_ok=True)
for f in os.listdir(os.path.join(prev, "assets", "screenshots")):
    shutil.copy2(os.path.join(prev, "assets", "screenshots", f), dst)
print(len(articles), "articles ->", os.path.normpath(out), "|", len(os.listdir(dst)), "images")
