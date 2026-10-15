"""Prepare / validate / merge translations of src/data/rithmic-help.json.

  prepare <outdir> [chunks]   write translatable-only chunk inputs (en)
  merge <indir> <locale>      validate translated chunks and write
                              src/data/rithmic-help.<locale>.json
"""
import json, os, re, sys, glob

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
DATA = os.path.join(ROOT, "src", "data")


def load():
    return json.load(open(os.path.join(DATA, "rithmic-help.json"), encoding="utf8"))["articles"]


def translatable(a):
    return {
        "slug": a["slug"],
        "title": a["title"],
        "description": a["description"],
        "answer": a["answer"],
        "body": a["body"],
        "faq": a["faq"],
    }


def skeleton(html):
    """Tags + non-text attributes, text stripped: translated HTML must match."""
    return [re.sub(r'\s(alt|aria-label|title)="[^"]*"', "", t) for t in re.findall(r"<[^>]+>", html)]


def check(en, tr, errs, where):
    if skeleton(en) != skeleton(tr):
        errs.append(f"{where}: HTML tags/attributes differ")
    if not tr.strip():
        errs.append(f"{where}: empty")


def prepare(outdir, n=8):
    os.makedirs(outdir, exist_ok=True)
    arts = [translatable(a) for a in load()]
    size = -(-len(arts) // n)
    for i in range(n):
        chunk = arts[i * size:(i + 1) * size]
        if chunk:
            json.dump(chunk, open(os.path.join(outdir, f"chunk-{i+1}.json"), "w", encoding="utf8"),
                      ensure_ascii=False, indent=1)
    print("chunks:", len(glob.glob(os.path.join(outdir, "chunk-*.json"))))


def merge(indir, locale):
    en = {a["slug"]: a for a in load()}
    tr = {}
    for f in sorted(glob.glob(os.path.join(indir, "chunk-*.json"))):
        for a in json.load(open(f, encoding="utf8")):
            tr[a["slug"]] = a
    errs, out = [], []
    for slug, a in en.items():
        t = tr.get(slug)
        if not t:
            errs.append(f"{slug}: missing")
            continue
        ta = translatable(a)
        for k in ("answer", "body"):
            check(ta[k], t.get(k, ""), errs, f"{slug}.{k}")
        if len(t.get("faq", [])) != len(ta["faq"]):
            errs.append(f"{slug}.faq: length mismatch")
        else:
            for i, (x, y) in enumerate(zip(ta["faq"], t["faq"])):
                check(x["a"], y["a"], errs, f"{slug}.faq[{i}].a")
                if not y["q"].strip():
                    errs.append(f"{slug}.faq[{i}].q empty")
        if not t.get("title", "").strip() or not t.get("description", "").strip():
            errs.append(f"{slug}: title/description empty")
        if t.get("title") == a["title"] or t.get("body") == a["body"]:
            errs.append(f"{slug}: untranslated")
        b = dict(a)
        b.update({k: t[k] for k in ("title", "description", "answer", "body", "faq")})
        # TOC labels come from the translated headings (ids are unchanged, checked above)
        heads = dict(re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', t["body"], re.S))
        b["toc"] = [{"id": x["id"], "label": re.sub(r"<[^>]+>", "", heads.get(x["id"], x["label"]))} for x in a["toc"]]
        out.append(b)
    if errs:
        print("\n".join(errs[:80])); print(len(errs), "errors"); sys.exit(1)
    by = {x["slug"]: x for x in out}
    for b in out:
        b["related"] = [{"slug": r["slug"], "title": by[r["slug"]]["title"]} for r in b["related"]]
    json.dump({"articles": out}, open(os.path.join(DATA, f"rithmic-help.{locale}.json"), "w", encoding="utf8"),
              ensure_ascii=False, indent=1)
    print(locale, "ok", len(out))


if __name__ == "__main__":
    if sys.argv[1] == "prepare":
        prepare(sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 8)
    else:
        merge(sys.argv[2], sys.argv[3])
