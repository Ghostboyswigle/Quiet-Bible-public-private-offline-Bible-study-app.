#!/usr/bin/env python3
"""
Builds Quiet Bible's study data (web/bible/study/): the Hebrew and Greek behind every KJV
word, a Strong's lexicon with KJV usage and every verse a word appears in, cross-references,
two commentaries and three Bible dictionaries. Everything is read offline by the page.

    python3 study/tools/build_study.py --src /path/to/sources [--out web/bible/study]

<sources> holds the inputs, as cloned or downloaded (see study/SOURCES.md):
    xmlBible.org/                      github.com/DannyCarlton/xmlBible.org (KJVs/)
    strongs/                           github.com/openscriptures/strongs
    stepbible-lexicons/tbesh-hebrew.txt, tbesg-greek.txt   STEPBible-Data Lexicons/ (TBESH, TBESG)
    cross_references.txt               OpenBible.info cross references
    commentaries/matthew-henry/, commentaries/jamieson-fausset-brown/
                                       github.com/eve-coda/open-christian-data data/commentaries/
    dictionary/easton/, smith/, hitchcock/
                                       github.com/neuu-org/bible-dictionary-dataset data/02_sources/

Output (all JSON, read through QuietBibleAssets.read("bible/study/..."))
    meta.json            {"version", "books": [GEN .. REV], "commentaries": {"mh": [books], "jfb": [books]}}
    w/<BOOK>.json        {"c:v": [phrase, ...]}; phrase = [english, strongs, flags, [[orig, translit, gloss, parsing, strongs+letter], ...]]
                         strongs is space-separated, the content word first; flags 1 = italics (supplied), 2 = LORD (divine name)
    lex/<H|G><nn>.json   {"<number>": entry} for numbers nn*100 .. nn*100+99 (see lexicon_entry)
    x/<BOOK>.json        {"c:v": [[book, chapter, verse, (end chapter, end verse)], ...]} most-voted first; book is 1-66
    c/mh|jfb/<BOOK>.json {"i": book intro, "c": {"<ch>": {"i": chapter intro, "e": [[from verse, to verse, text], ...]}}}
    d/index.json         [[name, key, flags], ...]; flags 1 Easton, 2 Smith, 4 Hitchcock, 8 too common to match in a verse
    d/<A-Z>.json         {"<key>": {"n": name, "e": Easton, "s": Smith, "h": Hitchcock, "r": [[book, chapter, verse], ...]}}
"""
import argparse
import collections
import glob
import hashlib
import json
import os
import re
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
META = json.load(open(os.path.join(ROOT, "web", "bible", "meta.json"), encoding="utf8"))["meta"]
BOOKS = [b["id"] for b in META]                                  # GEN .. REV
OSIS = [b["abbr"].replace(" ", "") for b in META]                # Gen .. Rev, as OpenBible writes them
OSIS_INDEX = {o: i + 1 for i, o in enumerate(OSIS)}
NAME_INDEX = {b["name"].lower(): i + 1 for i, b in enumerate(META)}
NAME_INDEX.update({"psalm": 19, "song of songs": 22, "canticles": 22})

STEP_SHA256 = {   # STEPBible-Data commit 0f60797c170f11a1f8dc75c5f7617973e2e66b0d
    "tbesh-hebrew.txt": "bdfdd17c1377aa5400618930fd0ea6f9a6f8d77ffdbbcd575b35d2d81c89401f",
    "tbesg-greek.txt": "312f723d7b8ef263bbdfb0451c9b8057125804dfff390b6f8544cff2a84b57f4",
}
# Words that carry no meaning of their own in a phrase; another Strong's number in the
# same phrase is the one to look up ("the world" is G2889, not the article G3588).
FUNCTION = {"G3588", "H853"}


def dump(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf8") as f:
        json.dump(obj, f, ensure_ascii=False, separators=(",", ":"))


def strong_key(s):
    """'H0430G' -> ('H', 430, 'G'); 'G25' -> ('G', 25, '')."""
    m = re.match(r"^([HG])0*(\d+)([A-Za-z]?)$", s or "")
    return (m.group(1), int(m.group(2)), m.group(3).upper()) if m else None


def strong_plain(s):
    k = strong_key(s)
    return f"{k[0]}{k[1]}" if k else ""


# --------------------------------------------------------------------------- words

def clean_orig(t):
    t = (t or "").replace("/", "").replace("\\", "")
    return t.replace("׃", "").strip()          # sof pasuq


def clean_gloss(g):
    return re.sub(r"\s+", " ", (g or "").replace("/ ", " ").replace("/", " ")).strip()


LEADING = set("""and the a an of in to unto with from by for upon on at into out that which who whom is was be
were are am been thou ye he she it they we i you him her them us me my thy his their our your shall shalt will wilt
should would hath have had did do doth dost not o though than as but if even also so then when thee because let whose these those behold until himself herself themselves there""".split())


def usage_form(eng):
    """How the KJV rendered a word, without the words Hebrew/Greek fold into it ('and the waters' -> 'waters')."""
    w = re.sub(r"[^\w\s'-]", "", eng.lower()).split()
    while len(w) > 1 and w[0] in LEADING:
        w.pop(0)
    while len(w) > 1 and w[-1] in LEADING:
        w.pop()
    return " ".join(w)


def build_words(xml_dir, out):
    """Per book: every KJV verse as phrases with their Strong's numbers and original words."""
    dirs = sorted(d for d in os.listdir(os.path.join(xml_dir, "KJVs")) if re.match(r"^\d\d-", d))
    if len(dirs) != 66:
        sys.exit(f"expected 66 book folders in {xml_dir}/KJVs, found {len(dirs)}")
    occ = collections.defaultdict(set)              # "H4325" -> {verse key}
    count = collections.Counter()                  # "H4325" -> times the Hebrew/Greek word occurs
    usage = collections.defaultdict(collections.Counter)  # 'H4325' -> {'water': 571}
    words = phrases = 0
    for bi, (book, d) in enumerate(zip(BOOKS, dirs), 1):
        verses = {}
        for f in sorted(glob.glob(os.path.join(xml_dir, "KJVs", d, "chapter-*.xml"))):
            for ch in ET.parse(f).getroot().iter("chapter"):
                cn = int(ch.get("num"))
                for v in ch.iter("verse"):
                    vn = int(v.get("num"))
                    vkey = bi * 1000000 + cn * 1000 + vn
                    out_v = []
                    for ph in v.iter("phrase"):
                        t = ph.get("type")
                        for o in ph.iter("orig"):          # every Hebrew/Greek word, translated or not
                            s = strong_plain(o.get("strong"))
                            if s:
                                occ[s].add(vkey)
                                count[s] += 1
                        if t in ("orig-only", "cam-only"):
                            continue
                        eng = " ".join((w.text or "").strip() for w in ph.iter("word")).strip()
                        if not eng:
                            continue
                        words += len(eng.split())
                        flags = (1 if t == "supplied" else 0) | (2 if ph.get("divine") == "true" else 0)
                        ss = [strong_plain(s) for s in (ph.get("strongs"), ph.get("strongs2")) if strong_plain(s)]
                        if len(ss) > 1 and ss[0] in FUNCTION and ss[1] not in FUNCTION:
                            ss = [ss[1], ss[0]]
                        origs = []
                        for o in ph.iter("orig"):
                            origs.append([clean_orig(o.text), (o.get("translit") or "").strip(), clean_gloss(o.get("gloss")),
                                          o.get("pos") or "", re.sub(r"^([HG])0+", r"\1", o.get("strong") or "")])
                        p = [eng, " ".join(ss), flags]
                        if origs:
                            p.append(origs)
                        while len(p) > 1 and p[-1] in ("", 0):
                            p.pop()
                        out_v.append(p)
                        phrases += 1
                        if ss:
                            usage[ss[0]][usage_form(eng)] += 1
                            if not origs:
                                for s in ss:
                                    occ[s].add(vkey)
                    verses[f"{cn}:{vn}"] = out_v
        dump(os.path.join(out, "w", f"{book}.json"), verses)
    print(f"words: {words} English words in {phrases} phrases, {len(occ)} Strong's numbers used")
    return occ, count, usage


# --------------------------------------------------------------------------- lexicon

def flat(e, lang):
    """Text of an XML element with Strong's cross-references written as H123 / G123."""
    out = [e.text or ""]
    for c in e:
        tag = c.tag.split("}")[-1]
        if tag == "strongsref":
            out.append(("H" if c.get("language") == "HEBREW" else "G") + str(int(c.get("strongs"))))
        elif tag == "greek":
            out.append(c.get("unicode") or "")
        elif tag == "w" and c.get("src"):
            out.append(f"{lang}{int(re.sub(r'[^0-9]', '', c.get('src')) or 0)}" + (f" ({c.get('lemma')})" if c.get("lemma") else ""))
        else:
            out.append(flat(c, lang))
        out.append(c.tail or "")
    return re.sub(r"\s+", " ", "".join(out)).strip()


def strongs_hebrew(path):
    ns = {"o": "http://www.bibletechnologies.net/2003/OSIS/namespace"}
    out = {}
    for div in ET.parse(path).getroot().iter("{%s}div" % ns["o"]):
        if div.get("type") != "entry":
            continue
        n = int(div.get("n"))
        w = div.find("o:w", ns)
        e = {"l": w.get("lemma") or "", "x": w.get("xlit") or "", "p": w.get("POS") or ""}
        for note in div.findall("o:note", ns):
            key = {"exegesis": "d", "explanation": "s", "translation": "k"}.get(note.get("type"))
            if key:
                e[key] = flat(note, "H")
        out[n] = e
    return out


def strongs_greek(path):
    out = {}
    root = ET.parse(path).getroot()
    for en in root.iter("entry"):
        n = int(en.get("strongs"))
        g = en.find("greek")
        p = en.find("pronunciation")
        e = {"l": g.get("unicode") if g is not None else "", "x": g.get("translit") if g is not None else "",
             "p": p.get("strongs") if p is not None else ""}
        for tag, key in (("strongs_derivation", "d"), ("strongs_def", "s"), ("kjv_def", "k")):
            el = en.find(tag)
            if el is not None:
                e[key] = re.sub(r"^:--\s*", "", flat(el, "G"))
        out[n] = e
    return out


def tbes_html(s):
    """STEPBible's meaning field -> text with \\n line breaks and only <b>/<i> kept."""
    s = re.sub(r"<ref='[^']*'>(.*?)</ref>", r"\1", s)
    s = re.sub(r"<ref=[^>]*>", "", s).replace("</ref>", "")
    s = re.sub(r"(?i)<br\s*/?>", "\n", s)
    s = re.sub(r"(?i)<(/?)(b|i)>", r"<\1\2>", s)
    s = re.sub(r"(?i)<(?!/?[bi]>)[^>]*>", "", s)
    s = s.replace("__", "").replace("&nbsp;", " ")
    s = re.sub(r"[ \t]+", " ", s)
    s = "\n".join(l.strip() for l in s.split("\n"))
    return re.sub(r"\n{2,}", "\n", s).strip(" \n:")


def tbes(path, name):
    h = hashlib.sha256(open(path, "rb").read()).hexdigest()
    if h != STEP_SHA256[name]:
        sys.exit(f"{path}: not the pinned STEPBible file ({h})")
    out = collections.defaultdict(list)
    for line in open(path, encoding="utf-8-sig"):
        f = line.rstrip("\n").split("\t")
        if len(f) < 8 or not re.match(r"^[HG]\d", f[0]):
            continue
        k = strong_key(f[2].strip() or f[0])
        if not k:
            continue
        # [letter, original, translit, parsing, gloss, meaning]
        out[(k[0], k[1])].append([k[2], f[3].strip(), f[4].strip(), f[5].strip(), f[6].strip(), tbes_html(f[7])])
    return out


def delta(keys):
    out, last = [], 0
    for k in sorted(keys):
        out.append(k - last)
        last = k
    return out


def build_lexicon(src, out, occ, count, usage):
    heb = strongs_hebrew(os.path.join(src, "strongs", "hebrew", "StrongHebrewG.xml"))
    grk = strongs_greek(os.path.join(src, "strongs", "greek", "StrongsGreekDictionaryXML_1.4", "strongsgreek.xml"))
    tb = {}
    tb.update(tbes(os.path.join(src, "stepbible-lexicons", "tbesh-hebrew.txt"), "tbesh-hebrew.txt"))
    tb.update(tbes(os.path.join(src, "stepbible-lexicons", "tbesg-greek.txt"), "tbesg-greek.txt"))
    chunks = collections.defaultdict(dict)
    n = 0
    for lang, table, top in (("H", heb, 8674), ("G", grk, 5624)):
        for num in range(1, top + 1):
            key = f"{lang}{num}"
            e = dict(table.get(num, {}))
            senses = tb.get((lang, num))
            if senses:
                e["t"] = senses
            if not e:
                continue
            u = usage.get(key)
            if u:
                e["u"] = [[w, c] for w, c in u.most_common(12)]
                e["n"] = count[key]
            if occ.get(key):
                e["r"] = delta(occ[key])
            chunks[f"{lang}{num // 100:02d}"][str(num)] = e
            n += 1
    for name, entries in chunks.items():
        dump(os.path.join(out, "lex", f"{name}.json"), entries)
    print(f"lexicon: {n} entries in {len(chunks)} files")


# --------------------------------------------------------------------------- cross-references

def osis_ref(r):
    m = re.match(r"^(\w+)\.(\d+)\.(\d+)$", r)
    if not m or m.group(1) not in OSIS_INDEX:
        return None
    return OSIS_INDEX[m.group(1)], int(m.group(2)), int(m.group(3))


def build_xrefs(path, out):
    per = collections.defaultdict(lambda: collections.defaultdict(list))
    kept = 0
    lines = open(path, encoding="utf8").read().splitlines()
    if "openbible.info" not in lines[0]:
        sys.exit(f"{path}: not OpenBible.info's cross-reference file")
    for line in lines[1:]:
        a, b, votes = line.split("\t")
        if int(votes) < 1:
            continue
        fr = osis_ref(a)
        parts = b.split("-")
        to = osis_ref(parts[0])
        end = osis_ref(parts[1]) if len(parts) > 1 else None
        if not fr or not to:
            continue
        item = [to[0], to[1], to[2]]
        if end and end[0] == to[0] and end[1:] != to[1:]:
            item += [end[1], end[2]]
        per[fr[0]][f"{fr[1]}:{fr[2]}"].append((int(votes), item))
        kept += 1
    for bi, verses in per.items():
        dump(os.path.join(out, "x", f"{BOOKS[bi - 1]}.json"),
             {k: [i for _, i in sorted(v, key=lambda x: -x[0])] for k, v in verses.items()})
    print(f"cross-references: {kept} kept (votes 1 or more)")


# --------------------------------------------------------------------------- commentaries

def build_commentary(cdir, out, short, intro_is_verse_one=False):
    """intro_is_verse_one: the commentary keeps its note on a chapter's first verse(s) as the
    chapter "intro" (Jamieson, Fausset & Brown), so it becomes the note on the verses before the
    first numbered note."""
    man = json.load(open(os.path.join(cdir, "_manifest.json"), encoding="utf8"))
    n = 0
    for b in man["books"]:
        if b["usfm_code"] not in BOOKS:
            sys.exit(f"{cdir}: unknown book {b['usfm_code']}")
        d = json.load(open(os.path.join(cdir, b["file"]), encoding="utf8"))
        lic = d["meta"].get("license")
        if lic not in ("cc0-1.0", "public-domain"):
            sys.exit(f"{cdir}/{b['file']}: licence {lic}")
        book = {"c": {}}
        for e in d["data"]:
            text = re.sub(r"[ \t]+", " ", (e.get("commentary_text") or "")).strip()
            text = re.sub(r"\n{3,}", "\n\n", text)
            if not text:
                continue
            ch = int(e["chapter"])
            vr = str(e["verse_range"])
            if ch == 0:
                book["i"] = (book.get("i", "") + "\n\n" + text).strip()
                continue
            c = book["c"].setdefault(str(ch), {"e": []})
            if vr == "intro":
                c["i"] = (c.get("i", "") + "\n\n" + text).strip()
                continue
            m = re.match(r"^(\d+)(?:-(\d+))?$", vr)
            if not m:
                sys.exit(f"{cdir}/{b['file']}: verse range {vr}")
            c["e"].append([int(m.group(1)), int(m.group(2) or m.group(1)), text])
            n += 1
        for c in book["c"].values():
            c["e"].sort(key=lambda x: (x[0], x[1]))
            if intro_is_verse_one and c.get("i"):
                text = re.sub(r"^[1-3]?\s?[A-Za-z][A-Za-z ]*\s\d+:\d+\s*\n", "", c.pop("i")).strip()
                first = c["e"][0][0] if c["e"] else 2
                c["e"].insert(0, [1, max(1, first - 1), text])
                n += 1
        dump(os.path.join(out, "c", short, f"{b['usfm_code']}.json"), book)
    print(f"commentary {short}: {n} passages in {len(man['books'])} books")
    return sorted(b["usfm_code"] for b in man["books"])


# --------------------------------------------------------------------------- dictionaries

COMMON = set("""a an and are as at be but by for from had has have he her him his i in is it its me my no not of on
or our out she so that the their them then there they this to up us was we were what when which who will with ye you
your all any can did do does go god lord man men one said shall should some than thou thee thy unto upon would day
days came come made make people over every""".split())


def scripture_ref(s):
    m = re.match(r"^(.+?)\s+(\d+):(\d+)", s or "")
    if not m:
        return None
    bi = NAME_INDEX.get(m.group(1).lower())
    return [bi, int(m.group(2)), int(m.group(3))] if bi else None


def build_dictionary(ddir, out):
    terms = {}
    for src, key, bit in (("easton", "e", 1), ("smith", "s", 2), ("hitchcock", "h", 4)):
        for f in sorted(glob.glob(os.path.join(ddir, src, "*.json"))):
            if f.endswith("_index.json"):
                continue
            for k, e in json.load(open(f, encoding="utf8")).items():
                text = "\n\n".join(d["text"].strip() for d in e.get("definitions", []) if d.get("text"))
                if not text:
                    continue
                k = re.sub(r"\s+", " ", k.upper()).strip()
                t = terms.setdefault(k, {"n": e.get("name") or k.title(), "flags": 0, "r": []})
                t[key] = text
                t["flags"] |= bit
                for r in e.get("scripture_refs", []):
                    ref = scripture_ref(r.get("reference"))
                    if ref and ref not in t["r"]:
                        t["r"].append(ref)
    index = []
    chunks = collections.defaultdict(dict)
    for k in sorted(terms):
        t = terms[k]
        flags = t.pop("flags") | (8 if k.lower() in COMMON or len(k) < 3 else 0)
        index.append([t["n"], k, flags])
        t["r"] = t["r"][:80]
        if not t["r"]:
            del t["r"]
        first = k[0] if "A" <= k[0] <= "Z" else "_"
        chunks[first][k] = t
    dump(os.path.join(out, "d", "index.json"), index)
    for c, entries in chunks.items():
        dump(os.path.join(out, "d", f"{c}.json"), entries)
    print(f"dictionary: {len(index)} terms")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True)
    ap.add_argument("--out", default=os.path.join(ROOT, "web", "bible", "study"))
    a = ap.parse_args()
    out = os.path.abspath(a.out)
    if os.path.isdir(out):
        for f in glob.glob(os.path.join(out, "**", "*.json"), recursive=True):
            os.remove(f)
    occ, count, usage = build_words(os.path.join(a.src, "xmlBible.org"), out)
    build_lexicon(a.src, out, occ, count, usage)
    build_xrefs(os.path.join(a.src, "cross_references.txt"), out)
    mh = build_commentary(os.path.join(a.src, "commentaries", "matthew-henry"), out, "mh")
    jfb = build_commentary(os.path.join(a.src, "commentaries", "jamieson-fausset-brown"), out, "jfb", True)
    build_dictionary(os.path.join(a.src, "dictionary"), out)
    dump(os.path.join(out, "meta.json"), {"version": 1, "books": BOOKS, "commentaries": {"mh": mh, "jfb": jfb}})


if __name__ == "__main__":
    main()
