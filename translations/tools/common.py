"""Shared pieces for turning public-domain Bible texts into Quiet Bible translation packs."""
import json, os, re, zipfile

# The app's book ids (same order as its meta.json) with OSIS / Zefania-number equivalents.
BOOKS = [
 ("GEN","Gen"),("EXO","Exod"),("LEV","Lev"),("NUM","Num"),("DEU","Deut"),("JOS","Josh"),("JDG","Judg"),("RUT","Ruth"),
 ("1SA","1Sam"),("2SA","2Sam"),("1KI","1Kgs"),("2KI","2Kgs"),("1CH","1Chr"),("2CH","2Chr"),("EZR","Ezra"),("NEH","Neh"),
 ("EST","Esth"),("JOB","Job"),("PSA","Ps"),("PRO","Prov"),("ECC","Eccl"),("SNG","Song"),("ISA","Isa"),("JER","Jer"),
 ("LAM","Lam"),("EZK","Ezek"),("DAN","Dan"),("HOS","Hos"),("JOL","Joel"),("AMO","Amos"),("OBA","Obad"),("JON","Jonah"),
 ("MIC","Mic"),("NAM","Nah"),("HAB","Hab"),("ZEP","Zeph"),("HAG","Hag"),("ZEC","Zech"),("MAL","Mal"),
 ("MAT","Matt"),("MRK","Mark"),("LUK","Luke"),("JHN","John"),("ACT","Acts"),("ROM","Rom"),("1CO","1Cor"),("2CO","2Cor"),
 ("GAL","Gal"),("EPH","Eph"),("PHP","Phil"),("COL","Col"),("1TH","1Thess"),("2TH","2Thess"),("1TI","1Tim"),("2TI","2Tim"),
 ("TIT","Titus"),("PHM","Phlm"),("HEB","Heb"),("JAS","Jas"),("1PE","1Pet"),("2PE","2Pet"),("1JN","1John"),("2JN","2John"),
 ("3JN","3John"),("JUD","Jude"),("REV","Rev")]
APP_META = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../web/bible/meta.json")))["meta"]
assert [m["id"] for m in APP_META] == [b[0] for b in BOOKS]

def clean(s):
    s = s.replace("¶", " ")                  # pilcrows
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"\s+([,;:.!?])", r"\1", s)
    return s

def write_pack(out, tid, name, abbr, license_line, source, books, note="", language="en", names=None, abbrs=None):
    """books: {APPID: {chapter: {verse: {"t":..., "p":bool}}}}  -> .qbbible zip"""
    meta = []; files = {}; total = 0
    for app_id, _ in BOOKS:
        chs = books.get(app_id)
        if not chs: continue
        base = next(m for m in APP_META if m["id"] == app_id)
        out_chs = []
        for c in sorted(chs):
            vs = [{"n": v, "t": chs[c][v]["t"], **({"p": 1} if chs[c][v].get("p") else {}),
                   **({"d": chs[c][v]["d"]} if chs[c][v].get("d") else {}),
                   **({"j": 1} if chs[c][v].get("j") else {})} for v in sorted(chs[c]) if chs[c][v]["t"]]
            out_chs.append({"n": c, "v": vs}); total += len(vs)
        meta.append({"id": app_id, "name": (names or {}).get(app_id) or base["name"],
                     "abbr": (abbrs or {}).get(app_id) or base["abbr"], "t": base["t"],
                     "chapters": len(out_chs), "verses": sum(len(c["v"]) for c in out_chs)})
        files[f"books/{app_id}.json"] = json.dumps(out_chs, ensure_ascii=False, separators=(",", ":"))
    props = (f"format=1\nid={tid}\nname={name}\nabbr={abbr}\nlanguage={language}\nlicense={license_line}\nsource={source}\n"
             + (f"note={note}\n" if note else ""))
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        z.writestr("translation.properties", props.encode("utf-8"))
        z.writestr("meta.json", json.dumps({"meta": meta}, ensure_ascii=False, separators=(",", ":")))
        for n, data in files.items(): z.writestr(n, data.encode("utf-8"))
    return meta, total
