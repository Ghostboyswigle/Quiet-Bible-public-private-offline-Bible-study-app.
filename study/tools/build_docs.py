#!/usr/bin/env python3
"""
Builds "Other research documents" (web/bible/docs/): the documents the Ben Born Again channel
(youtube.com/@1BENBORNAGAIN, benbornagain.faith) talks about, in free editions, with the
descriptions and warnings in study/docs/catalog.json.

    python3 study/tools/build_docs.py --src /path/to/sources [--out web/bible/docs]

Books 1 and 4 of the Talmud and the Zohar keep the archive's notice allowing non-commercial use
only; their catalog entries say so, and they are not covered by Quiet Bible's GPL licence.

<sources> (see study/SOURCES.md):
    lxx2012/       eBible.org eng-lxx2012 USFM (Brenton's Septuagint), from github.com/BibleNLP/ebible
                   tests/versifications/eng-lxx2012
    ebible/        github.com/BibleNLP/ebible: metadata/vref.txt and corpus/eng-enggnv.txt,
                   eng-engWycliffe.txt, grc-grctr.txt
    wlc/           github.com/openscriptures/morphhb wlc/*.xml (the Hebrew text only)
    kjva/          github.com/eve-coda/open-christian-data data/bible-text/kjva/<apocryphal books>.json
    hcf/           github.com/HistoricalChristianFaith/Writings-Database
    sacred/        sacred-texts.com pages, as mirrored in github.com/Neckr0ik/Sacred-Texts.com
                   (sacred_obsidian_vault): jud/t01..t10, jud/zdm, jud/yetzirah.md, jud/josephus,
                   grim/lks, cla/tac/a15040.md

Output
    index.json      [{id, group, title, by, date, edition, about, channel, warning, credit, license,
                      lang, dir, kind, parts: [{t, n}]}] in catalog order, plus {"groups": [...]}
    <id>/<i>.json   part i: {"t": title, "s": [section, ...]}
                    section: {"t": title, "v": [[verse, text], ...]}            (kind "verses")
                          or {"t": title, "b": [["h" | "p", text], ...], "f": [note, ...]}  (kind "prose")
    Text keeps only <i>, <b> and <sup> (footnote numbers) as markup.
"""
import argparse
import glob
import html
import json
import os
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
META = json.load(open(os.path.join(ROOT, "web", "bible", "meta.json"), encoding="utf8"))["meta"]
NAMES = {b["id"]: b["name"] for b in META}
NAMES.update({"TOB": "Tobit", "JDT": "Judith", "ESG": "Esther (Greek)", "WIS": "Wisdom of Solomon", "SIR": "Sirach",
              "BAR": "Baruch", "LJE": "Letter of Jeremiah", "S3Y": "Song of the Three Young Men", "SUS": "Susanna",
              "BEL": "Bel and the Dragon", "1MA": "1 Maccabees", "2MA": "2 Maccabees", "3MA": "3 Maccabees",
              "4MA": "4 Maccabees", "1ES": "1 Esdras", "2ES": "2 Esdras", "MAN": "Prayer of Manasseh",
              "PS2": "Psalm 151", "ODA": "Odes", "PSS": "Psalms of Solomon"})
OSIS_TO_ID = {b["abbr"].replace(" ", ""): b["id"] for b in META}


def dump(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf8") as f:
        json.dump(obj, f, ensure_ascii=False, separators=(",", ":"))


def tidy(s):
    s = html.unescape(s).replace("\u00a0", " ")
    s = re.sub(r"[ \t\r\n]+", " ", s)
    s = re.sub(r"\s+([,.;:!?])", r"\1", s)
    s = re.sub(r"<(i|b|sup)>\s*</\1>", "", s)
    return s.strip()


# --------------------------------------------------------------------------- inline HTML

class Inline(HTMLParser):
    """HTML fragment -> text keeping <i>, <b>, <sup>; footnote links become <sup>n</sup>."""

    def __init__(self, note_ref):
        super().__init__(convert_charrefs=True)
        self.out, self.note_ref, self.skip = [], note_ref, 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if self.skip:
            self.skip += 1 if tag in ("font", "a", "span", "sup") else 0
            return
        if tag in ("i", "em"):
            self.out.append("<i>")
        elif tag in ("b", "strong"):
            self.out.append("<b>")
        elif tag == "br":
            self.out.append(" ")
        elif tag == "a":
            href = a.get("href") or ""
            name = a.get("name") or ""
            m = re.search(r"#(fn_?\d+)$", href)
            if m and self.note_ref:
                self.out.append(f"<sup>{self.note_ref(m.group(1))}</sup>")
                self.skip = 1
            elif name.startswith("page_"):
                self.skip = 1
        elif tag == "img":
            pass

    def handle_endtag(self, tag):
        if self.skip:
            if tag in ("font", "a", "span", "sup"):
                self.skip -= 1
            return
        if tag in ("i", "em"):
            self.out.append("</i>")
        elif tag in ("b", "strong"):
            self.out.append("</b>")

    def handle_data(self, data):
        if not self.skip:
            self.out.append(data.replace("<", "‹").replace(">", "›"))

    def text(self):
        return tidy("".join(self.out))


def inline(fragment, note_ref=None):
    p = Inline(note_ref)
    p.feed(fragment)
    p.close()
    return p.text()


def plain(fragment):
    return re.sub(r"</?(i|b|sup)>", "", inline(fragment))


# --------------------------------------------------------------------------- Bible-like texts

USFM_DROP = re.compile(r"\\(f|x|fe)\s.*?\\\1\*", re.S)
USFM_CHAR = re.compile(r"\\\+?(add|nd|wj|qs|tl|bk|k|w|sc|it|bd|em|pn|sig|qac|fig)\*?")


def usfm_text(s):
    s = USFM_DROP.sub("", s)
    s = re.sub(r"\\\+?add\s?(.*?)\\\+?add\*", r"<i>\1</i>", s)
    s = re.sub(r"\|[^\\]*?(?=\\w\*)", "", s)
    s = USFM_CHAR.sub("", s)
    s = re.sub(r"\\[a-z0-9]+\*?", "", s)
    return tidy(s)


def usfm_book(path):
    """A USFM book -> (code, name, [chapter sections]) or an introduction -> prose."""
    lines = open(path, encoding="utf-8-sig").read().replace("\r", "").split("\n")
    code = name = None
    chapters, cur, intro = [], None, []
    for raw in lines:
        m = re.match(r"\\(\w+)\s?(.*)$", raw.strip())
        if not m:
            if cur is not None and cur["v"] and raw.strip():
                cur["v"][-1][1] = tidy(cur["v"][-1][1] + " " + usfm_text(raw))
            continue
        tag, rest = m.group(1), m.group(2)
        if tag == "id":
            code = rest.split()[0]
        elif tag in ("h", "toc2") and not name:
            name = usfm_text(rest)
        elif tag == "c":
            cur = {"t": rest.split()[0], "v": []}
            chapters.append(cur)
        elif tag == "v":
            vm = re.match(r"(\S+)\s?(.*)$", rest)
            cur["v"].append([vm.group(1), usfm_text(vm.group(2))])
        elif tag == "d" and cur is not None:
            cur["v"].append(["", "<i>" + usfm_text(rest) + "</i>"])
        elif tag in ("ip", "ipi", "im", "p", "pi", "m", "q", "q1", "q2") and cur is None and rest.strip():
            intro.append(["p", usfm_text(rest)])
        elif tag in ("imt", "imt1", "imt2", "is", "is1", "is2", "mt", "mt1", "mt2") and cur is None and rest.strip():
            intro.append(["h", usfm_text(rest)])
        elif cur is not None and rest.strip() and tag in ("p", "q", "q1", "q2", "q3", "m", "pi", "li", "li1", "li2") and cur["v"]:
            cur["v"][-1][1] = tidy(cur["v"][-1][1] + " " + usfm_text(rest))
    for c in chapters:
        c["v"] = [v for v in c["v"] if v[1]]
    return code, name, [c for c in chapters if c["v"]], intro


def build_lxx(src):
    d = os.path.join(src, "lxx2012")
    parts = []
    for f in sorted(glob.glob(os.path.join(d, "*.usfm"))):
        code, name, chapters, intro = usfm_book(f)
        if code == "FRT":
            continue
        if code == "INT":
            parts.append({"t": "Brenton’s introduction", "s": [{"t": "Introduction", "b": intro, "f": []}]})
            continue
        parts.append({"t": NAMES.get(code) or name, "s": [{"t": f"Chapter {c['t']}", "v": c["v"]} for c in chapters]})
    return parts


def build_vref(src, corpus, books=None):
    refs = open(os.path.join(src, "ebible", "metadata", "vref.txt"), encoding="utf8").read().split("\n")
    text = open(os.path.join(src, "ebible", "corpus", corpus), encoding="utf8").read().split("\n")
    order, data = [], {}
    for r, t in zip(refs, text):
        t = t.strip()
        if not t or t == "<range>" or not r:
            continue
        b, cv = r.split(" ")
        c, v = cv.split(":")
        if books and b not in books:
            continue
        if b not in data:
            order.append(b)
            data[b] = {}
        data[b].setdefault(int(c), []).append([v, tidy(t)])
    return [{"t": NAMES[b], "s": [{"t": f"Chapter {c}", "v": vs} for c, vs in sorted(data[b].items())]} for b in order]


ROMAN = {"I ": "1 ", "II ": "2 ", "III ": "3 "}


def build_scroll(src, name):
    """A scrollmapper bible_databases JSON Bible -> books with text (empty books and verses left out)."""
    d = json.load(open(os.path.join(src, "scrollmapper", name + ".json"), encoding="utf8"))
    parts = []
    for i, b in enumerate(d["books"]):
        title = b["name"]
        for k, v in ROMAN.items():
            if title.startswith(k):
                title = v + title[len(k):]
        title = {"Revelation of John": "Revelation", "Additional Psalm": "Psalm 151", "Laodiceans": "Epistle to the Laodiceans"}.get(title, title)
        secs = []
        for c in b["chapters"]:
            vs = [[str(v["verse"]), tidy(v["text"])] for v in c["verses"] if v["text"].strip()]
            if vs:
                secs.append({"t": f"Chapter {c['chapter']}", "v": vs})
        if secs:
            parts.append({"t": title, "s": secs})
    return parts


def build_wlc(src):
    ns = {"o": "http://www.bibletechnologies.net/2003/OSIS/namespace"}
    parts = []
    for b in META[:39]:
        root = ET.parse(os.path.join(src, "wlc", b["abbr"].replace(" ", "") + ".xml")).getroot()
        chapters = []
        for ch in root.iter("{%s}chapter" % ns["o"]):
            vs = []
            for v in ch.iter("{%s}verse" % ns["o"]):
                out = []
                for e in v:
                    tag = e.tag.split("}")[-1]
                    if tag == "w":
                        out.append(("w", "".join(e.itertext()).replace("/", "")))
                    elif tag == "seg":
                        t = (e.text or "").strip()
                        out.append(("j" if e.get("type") in ("x-maqqef", "x-sof-pasuq") else "s", t))
                s = ""
                for kind, t in out:
                    if kind == "j" or s.endswith("־"):
                        s += t
                    else:
                        s += (" " if s else "") + t
                vs.append([v.get("osisID").split(".")[-1], tidy(s)])
            chapters.append({"t": f"Chapter {ch.get('osisID').split('.')[-1]}", "v": vs})
        parts.append({"t": b["name"], "s": chapters})
    return parts


KJVA = [("1-esdras", "1 Esdras"), ("2-esdras", "2 Esdras"), ("tobit", "Tobit"), ("judith", "Judith"),
        ("additions-to-esther", "The Rest of Esther"), ("wisdom", "The Wisdom of Solomon"),
        ("sirach", "Ecclesiasticus (Sirach)"), ("baruch", "Baruch, with the Epistle of Jeremiah"),
        ("prayer-of-azariah", "The Song of the Three Children"), ("susanna", "Susanna"),
        ("bel-and-the-dragon", "Bel and the Dragon"), ("prayer-of-manasses", "The Prayer of Manasses"),
        ("1-maccabees", "1 Maccabees"), ("2-maccabees", "2 Maccabees")]


def build_kjva(src):
    parts = []
    for f, name in KJVA:
        d = json.load(open(os.path.join(src, "kjva", f + ".json"), encoding="utf8"))
        if d["meta"].get("license") != "public-domain":
            sys.exit(f"kjva/{f}: licence {d['meta'].get('license')}")
        chs = {}
        for v in d["data"]:
            chs.setdefault(int(v["chapter"]), []).append([str(v["verse"]), tidy(v["text"])])
        parts.append({"t": name, "s": [{"t": f"Chapter {c}", "v": vs} for c, vs in sorted(chs.items())]})
    return parts


# --------------------------------------------------------------------------- prose: Historical Christian Faith

def hcf_sections(path, skip_intro=False):
    s = open(path, encoding="utf8").read()
    s = re.sub(r"<h1>.*?</h1>", "", s, flags=re.S)
    notes_html = ""
    m = re.search(r'<section class="notes">(.*?)</section>', s, re.S)
    if m:
        notes_html = m.group(1)
        s = s[:m.start()]
    s = re.sub(r"^.*?<article[^>]*>", "", s, flags=re.S)
    s = re.sub(r"Alternative Sources:.*?<br/>", "", s, flags=re.S)
    notes = {}
    for nm in re.finditer(r'<span id="(fn\d+)"><a href="#r\d+">\d+</a>(.*?)</span>', notes_html, re.S):
        notes[nm.group(1)] = inline(nm.group(2))
    sections = []
    for chunk in re.split(r"(<h[2-4][^>]*>.*?</h[2-4]>)", s, flags=re.S):
        hm = re.match(r"<h[2-4][^>]*>(.*?)</h[2-4]>", chunk, re.S)
        if hm:
            sections.append({"t": plain(hm.group(1)) or "…", "b": [], "f": []})
            continue
        if not chunk.strip():
            continue
        if not sections:
            sections.append({"t": "Opening", "b": [], "f": []})
        sec = sections[-1]
        seen = {}

        def ref(fid, sec=sec, seen=seen):
            if fid not in seen:
                sec["f"].append(notes.get(fid, ""))
                seen[fid] = len(sec["f"])
            return seen[fid]

        for para in re.split(r"<br\s*/?>\s*<br\s*/?>|</?blockquote>|</?p>", chunk):
            t = inline(para, ref)
            if t:
                sec["b"].append(["p", t])
    sections = [x for x in sections if x["b"]]
    if skip_intro:
        sections = [x for x in sections if x["t"] != "Historical Introductions"]
    for x in sections:
        if x["t"] == "Historical Introductions":
            x["t"] = "What early writers said about it"
        x["f"] = [f for f in x["f"]]
    return sections


def hcf(src, *paths):
    return [hcf_sections(os.path.join(src, "hcf", p)) for p in paths]


# --------------------------------------------------------------------------- prose: sacred-texts.com pages

def sacred_page(path):
    """One sacred-texts page -> section blocks and footnotes (navigation, page numbers and images left out)."""
    s = open(path, encoding="utf8", errors="replace").read()
    m = re.search(r"at sacred-texts\.com</font></p>\s*<hr>", s)
    if m:
        s = s[m.end():]
    else:
        parts = s.split("<hr>")
        s = "<hr>".join(parts[1:]) if len(parts) > 1 else s
    end = s.rfind("<hr>")
    if end > 0 and len(s) - end < 1200:
        s = s[:end]
    s = re.sub(r"<(script|style|table[^>]*class=\"?nav)[^>]*>.*?</\1>", "", s, flags=re.S | re.I)
    s = re.sub(r"<center>((?:(?!</center>).)*?<a href(?:(?!</center>).)*?)</center>", "", s, flags=re.S | re.I)
    s = re.sub(r"<img[^>]*>", "", s, flags=re.I)
    notes, order = {}, {}
    for nm in re.finditer(r'<p>\s*<a name="(fn_\d+)"></a>\s*<a href="[^"]*">[^<]*</a>(.*?)</p>', s, re.S):
        notes[nm.group(1)] = nm.group(2)
    s = re.sub(r'<p>\s*<a name="fn_\d+"></a>.*?</p>', "", s, flags=re.S)
    s = re.sub(r"<h3[^>]*>\s*Footnotes\s*</h3>", "", s, flags=re.I)
    blocks, foot = [], []

    def ref(fid):
        if fid not in order:
            foot.append(inline(notes.get(fid, "")))
            order[fid] = len(foot)
        return order[fid]

    for bm in re.finditer(r"<(h[1-6]|p|blockquote|li|td)[^>]*>(.*?)</\1>", s, re.S | re.I):
        tag = bm.group(1).lower()
        inner = bm.group(2)
        if tag == "td" and "<p" in inner.lower():
            continue
        t = inline(inner, ref)
        if not t or re.fullmatch(r"p\. \d+", t):
            continue
        blocks.append(["h" if tag.startswith("h") else "p", t])
    return blocks, foot


def sacred_index(src, d, include=None, exclude=()):
    """Section list from a sacred-texts book index: [(title, file)] in index order."""
    s = open(os.path.join(src, "sacred", d, "index.md"), encoding="utf8", errors="replace").read()
    out, seen = [], set()
    for m in re.finditer(r'<a href="([a-z0-9_-]+)\.htm">(.*?)</a>', s, re.S | re.I):
        f, t = m.group(1), plain(m.group(2))
        if f in seen or f == "index" or not os.path.exists(os.path.join(src, "sacred", d, f + ".md")):
            continue
        if include and not re.match(include, f):
            continue
        if f in exclude or not t:
            continue
        seen.add(f)
        out.append((t, f))
    return out


def sacred_book(src, d, include=None, exclude=(), title_fix=None):
    secs = []
    for t, f in sacred_index(src, d, include, exclude):
        blocks, foot = sacred_page(os.path.join(src, "sacred", d, f + ".md"))
        if blocks:
            secs.append({"t": title_fix(t) if title_fix else t, "b": blocks, "f": foot})
    return secs


def build_talmud(src):
    top = open(os.path.join(src, "sacred", "jud", "talmud.md"), encoding="utf8", errors="replace").read()
    names = {int(m.group(1)): plain(m.group(2)) for m in re.finditer(r'<a href="#t(\d\d)">(.*?)</a>', top, re.S)}
    parts = []
    for i in range(1, 11):
        parts.append({"t": names.get(i) or f"Book {i}", "s": sacred_book(src, f"jud/t{i:02d}")})
    return parts


def build_hermas(src):
    parts = []
    for book, kind, n in (("First Book - Visions", "Vision", 5), ("Second Book - Commandments", "Commandment", 12),
                          ("Third Book - Similitudes", "Similitude", 10)):
        secs = []
        for i in range(1, n + 1):
            got = hcf_sections(os.path.join(src, "hcf", "Shepherd of Hermas", "Translation-ANF", book, f"{kind} {i}.html"))
            blocks, notes = [], []
            for x in got:
                if x["t"] not in ("Opening", "…"):
                    blocks.append(["h", x["t"]])
                off = len(notes)
                blocks += [[k, re.sub(r"<sup>(\d+)</sup>", lambda m: f"<sup>{int(m.group(1)) + off}</sup>", t)] for k, t in x["b"]]
                notes += x["f"]
            secs.append({"t": f"{kind} {i}", "b": blocks, "f": notes})
        parts.append({"t": book.split(" - ")[1], "s": secs})
    return parts


def build_yetzirah(src):
    s = open(os.path.join(src, "sacred", "jud", "yetzirah.md"), encoding="utf8", errors="replace").read()
    s = s.split("<hr>", 1)[1] if "<hr>" in s else s
    secs, cur = [], None
    for bm in re.finditer(r"<(h[1-6]|p)[^>]*>(.*?)</\1>", s, re.S | re.I):
        t = inline(bm.group(2))
        if not t:
            continue
        if bm.group(1).lower().startswith("h") and re.match(r"(CHAPTER|THE THIRTY|NOTES|APPENDIX)", t, re.I):
            cur = {"t": t[0] + t[1:].lower() if not t.upper().startswith("CHAPTER") else "Chapter " + t.split()[-1], "b": [], "f": []}
            secs.append(cur)
        elif cur is None:
            continue
        else:
            cur["b"].append(["h" if bm.group(1).lower().startswith("h") else "p", t])
    return [x for x in secs if x["b"]]


def build_tacitus(src):
    s = open(os.path.join(src, "sacred", "cla", "tac", "a15040.md"), encoding="utf8", errors="replace").read()
    i = s.find('<a name="a_15_044">')
    m = re.search(r'<td valign="TOP" width="45%">(.*?)</td>', s[i:], re.S)
    text = inline(m.group(1))
    if not text.startswith("44.") or "Christus" not in text:
        sys.exit("Tacitus: Annals 15.44 not found")
    return [{"t": "Annals, Book 15, chapter 44", "b": [["p", text[3:].strip()]], "f": []}]


def build_josephus(src):
    """Whiston's Josephus, one section per chapter ("Book 18, chapter 3")."""
    d = "jud/josephus"
    parts = []
    for title, files in (("The Wars of the Jews", ["war-pref"] + [f"war-{i}" for i in range(1, 8)]),
                         ("Antiquities of the Jews", ["ant-pref"] + [f"ant-{i}" for i in range(1, 21)]),
                         ("The Life of Flavius Josephus", ["autobiog"]),
                         ("Against Apion", ["apion-1", "apion-2"]),
                         ("Discourse concerning Hades", ["hades"])):
        secs = []
        for f in files:
            blocks, foot = sacred_page(os.path.join(src, "sacred", d, f + ".md"))
            book = f.split("-")[1] if "-" in f and f.split("-")[1].isdigit() else None
            label = "Preface" if f.endswith("pref") else (f"Book {book}" if book else None)
            cur = {"t": label or plain(next((b[1] for b in blocks if b[0] == "h"), "")).title() or title, "b": [], "f": foot}
            secs.append(cur)
            for k, t in blocks:
                m = re.fullmatch(r"CHAPTER (\d+)\.?", plain(t).strip())
                if m:
                    cur = {"t": f"{label}, chapter {m.group(1)}" if label else f"Chapter {m.group(1)}", "b": [], "f": foot}
                    secs.append(cur)
                    continue
                cur["b"].append([k, t])
        parts.append({"t": title, "s": [x for x in secs if x["b"]]})
    return parts


# --------------------------------------------------------------------------- main

def builders(src):
    H = lambda *p: hcf(src, *p)
    return {
        "lxx": lambda: build_lxx(src),
        "wlc": lambda: build_wlc(src),
        "geneva": lambda: build_scroll(src, "Geneva1599"),
        "kjva": lambda: build_kjva(src),
        "tr": lambda: build_scroll(src, "TR"),
        "wycliffe": lambda: build_scroll(src, "Wycliffe"),
        "1clement": lambda: [{"t": "1 Clement", "s": H("Clement of Rome/First Epistle to the Corinthians.html")[0]}],
        "2clement": lambda: [{"t": "2 Clement", "s": H("Clement of Rome/Pseudo-Clement/Second Epistle to the Corinthians.html")[0]}],
        "didache": lambda: [{"t": "The Didache", "s": H("Didache/Didache.html")[0]}],
        "barnabas": lambda: [{"t": "The Epistle of Barnabas", "s": H("Epistle of Barnabas/The Epistle of Barnabas.html")[0]}],
        "ignatius": lambda: [{"t": t, "s": H(f"Ignatius of Antioch/{f}.html")[0]} for t, f in (
            ("To the Ephesians", "Epistle to the Ephesians"), ("To the Magnesians", "Epistle to the Magnesians"),
            ("To the Trallians", "Epistle to the Trallians"), ("To the Romans", "Epistle to the Romans"),
            ("To the Philadelphians", "Epistle to the Philadelphians"), ("To the Smyrnaeans", "Epistle to the Smyrnaeans"),
            ("To Polycarp", "Epistle to Polycarp"))],
        "polycarp": lambda: [{"t": "Polycarp to the Philippians", "s": H("Polycarp of Smyrna/Epistle to the Philippians.html")[0]},
                             {"t": "The Martyrdom of Polycarp", "s": H("Polycarp of Smyrna/Martyrdom of Polycarp.html")[0]}],
        "diognetus": lambda: [{"t": "The Epistle to Diognetus", "s": H("Epistle to Diognetus/The Epistle to Diognetus.html")[0]}],
        "hermas": lambda: build_hermas(src),
        "justin": lambda: [{"t": "The First Apology", "s": H("Justin Martyr/The First Apology.html")[0]},
                           {"t": "Dialogue with Trypho", "s": H("Justin Martyr/Dialogue with Trypho.html")[0]}],
        "josephus": lambda: build_josephus(src),
        "tacitus": lambda: [{"t": "Annals 15.44", "s": build_tacitus(src)}],
        "talmud": lambda: build_talmud(src),
        "zohar": lambda: [{"t": "Bereshith (Genesis 1–12)", "s": sacred_book(src, "jud/zdm")}],
        "yetzirah": lambda: [{"t": "Sepher Yetzirah", "s": build_yetzirah(src)}],
        "goetia": lambda: [{"t": "The Lesser Key of Solomon", "s": sacred_book(src, "grim/lks")}],
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True)
    ap.add_argument("--out", default=os.path.join(ROOT, "web", "bible", "docs"))
    ap.add_argument("--only", nargs="*")
    a = ap.parse_args()
    catalog = json.load(open(os.path.join(ROOT, "study", "docs", "catalog.json"), encoding="utf8"))
    out = os.path.abspath(a.out)
    build = builders(a.src)
    index = []
    for doc in catalog["documents"]:
        if a.only and doc["id"] not in a.only:
            continue
        parts = build[doc["id"]]()
        parts = [p for p in parts if p["s"]]
        if not parts:
            sys.exit(f"{doc['id']}: nothing built")
        d = os.path.join(out, doc["id"])
        for f in glob.glob(os.path.join(d, "*.json")):
            os.remove(f)
        words = 0
        for i, p in enumerate(parts):
            dump(os.path.join(d, f"{i}.json"), p)
            for s in p["s"]:
                for x in s.get("v", []) + s.get("b", []):
                    words += len(x[1].split())
        e = dict(doc)
        e["parts"] = [{"t": p["t"], "n": len(p["s"])} for p in parts]
        index.append(e)
        print(f"{doc['id']:10s} {len(parts):3d} parts {sum(len(p['s']) for p in parts):5d} sections {words:8d} words")
    if not a.only:
        dump(os.path.join(out, "index.json"), {"intro": catalog["intro"], "groups": catalog["groups"],
                                               "missing": catalog["missing"], "documents": index})


if __name__ == "__main__":
    main()
