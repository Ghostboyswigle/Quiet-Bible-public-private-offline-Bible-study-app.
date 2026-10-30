#!/usr/bin/env python3
"""Asante Twi Bible (Biblica, 2020) -> QuietBible-TWI.qbbible

    python3 translations/tools/build_twi.py --ebible <BibleNLP/ebible checkout> \\
        --beblia <TwiAsanteBible.xml> --out QuietBible-TWI.qbbible

The text is Biblica's Open Asante Twi Contemporary Bible ("Asante Twi Nkwa Asɛm"),
Copyright © 1996, 2020 by Biblica, Inc., under CC BY-SA 4.0.

Where the words come from:
- corpus/twi-twiasante.txt in https://github.com/BibleNLP/ebible (commit c531ff2), eBible.org's
  text one verse per line, lined up with metadata/vref.txt. The translation numbers its verses
  as English Bibles do, and so does Quiet Bible, so each verse stays at its own number.
- vref.txt follows the Hebrew numbering, so it has no line for 136 English verses (Genesis
  31:55, Joel 2:28-32 and 3:6-21, Malachi 4, 2 Corinthians 13:14 and others), and the corpus
  loses them. Those 136 come from TwiAsanteBible.xml in
  https://github.com/Beblia/Holy-Bible-XML-Format (commit 61622da), the same Bible as published on
  bible.com. That file agrees with the corpus word for word in 30,790 shared verses. It
  renumbers the verses after a joined verse (Numbers 5:20-28), so nothing else is taken from
  it. Each of the 136 was also checked by hand against a third copy (bibles/tw-wasna in
  https://github.com/wldeh/bible-api, commit 1d6987e), which cuts poetry to its first line and
  runs footnotes into the text, so it isn't used: all 136 agree with it (97 exactly, 36 where it
  stops at a line break, 3 where it carries a footnote).

Quiet Bible's changes, as the licence asks to be stated: verse text only (section headings and
footnotes left out; the source has no psalm titles), spacing tidied, and the 136 verses above
filled in. Numbers 5:19 holds verses 19-22 and Mark 6:22 holds 22-23, as the translation joins
them. Revelation 12:18 and 3 John 1:15, which the English numbering doesn't have, end the verses
before them, as in the built-in BSB. The pack's name leaves out the Biblica® trademark, as Biblica asks of changed copies.
"""
import argparse
import hashlib
import json
import os
import re
import sys
import xml.etree.ElementTree as ET

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import BOOKS, write_pack  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SHA256 = {
    "corpus/twi-twiasante.txt": "c04c94014f6bebf19afe7167d6c2ff0b64d0bd9250750db3280a5eedff881823",
    "metadata/vref.txt": "a7575f550dd2260cf707f98c909a551f5b1ef9c0b52e1e3ccce96df1f2dba845",
    "TwiAsanteBible.xml": "19488f0c840ade94827406888875fe07af158fa1f6192570a4fcd4252293c5fb",
}
FILLED = 136
# Verses the English numbering doesn't have: each ends the verse before it, as in the built-in BSB.
APPEND = {("REV", 12, 18): ("REV", 12, 17), ("3JN", 1, 15): ("3JN", 1, 14)}

# Book names as the translation titles them (eBible's index), and short forms for references.
NAMES = ["1 Mose", "2 Mose", "3 Mose", "4 Mose", "5 Mose", "Yosua", "Atemmufoɔ", "Rut", "1 Samuel", "2 Samuel",
         "1 Ahemfo", "2 Ahemfo", "1 Berɛsosɛm", "2 Berɛsosɛm", "Ɛsra", "Nehemia", "Ɛster", "Hiob", "Nnwom", "Mmɛbusɛm",
         "Ɔsɛnkafoɔ", "Nnwom Mu Dwom", "Yesaia", "Yeremia", "Kwadwom", "Hesekiel", "Daniel", "Hosea", "Yoɛl", "Amos",
         "Obadia", "Yona", "Mika", "Nahum", "Habakuk", "Sefania", "Hagai", "Sakaria", "Malaki",
         "Mateo", "Marko", "Luka", "Yohane", "Asomafoɔ", "Romafoɔ", "1 Korintofoɔ", "2 Korintofoɔ", "Galatifoɔ",
         "Efesofoɔ", "Filipifoɔ", "Kolosefoɔ", "1 Tesalonikafoɔ", "2 Tesalonikafoɔ", "1 Timoteo", "2 Timoteo", "Tito",
         "Filemon", "Hebrifoɔ", "Yakobo", "1 Petro", "2 Petro", "1 Yohane", "2 Yohane", "3 Yohane", "Yuda", "Adiyisɛm"]
ABBRS = ["1 Mos", "2 Mos", "3 Mos", "4 Mos", "5 Mos", "Yos", "Ate", "Rut", "1 Sam", "2 Sam", "1 Ahe", "2 Ahe",
         "1 Ber", "2 Ber", "Ɛsr", "Neh", "Ɛst", "Hio", "Nnw", "Mmɛ", "Ɔsɛ", "Dwom", "Yes", "Yer", "Kwa", "Hes", "Dan",
         "Hos", "Yoɛ", "Amo", "Oba", "Yon", "Mik", "Nah", "Hab", "Sef", "Hag", "Sak", "Mal",
         "Mat", "Mar", "Luk", "Yoh", "Aso", "Rom", "1 Kor", "2 Kor", "Gal", "Efe", "Flp", "Kol", "1 Tes", "2 Tes",
         "1 Tim", "2 Tim", "Tit", "Flm", "Heb", "Yak", "1 Pet", "2 Pet", "1 Yoh", "2 Yoh", "3 Yoh", "Yud", "Adi"]
assert len(NAMES) == len(ABBRS) == len(BOOKS) == 66
assert len(set(NAMES)) == 66 and len(set(ABBRS)) == 66

LICENSE = ("CC BY-SA 4.0 (creativecommons.org/licenses/by-sa/4.0). Copyright © 1996, 2020 by Biblica, Inc. "
           "The original work by Biblica, Inc. is available for free at www.biblica.com and open.bible. "
           "This copy is changed (see below) and shared under the same licence.")
SOURCE = ("Asante Twi Contemporary Bible (Nkwa Asɛm, 2020), Biblica, Inc.; eBible.org's text, via the BibleNLP "
          "eBible corpus (github.com/BibleNLP/ebible), with 136 verses that corpus lacks from "
          "github.com/Beblia/Holy-Bible-XML-Format. Changed for Quiet Bible: verse text only (headings and "
          "footnotes left out), English verse numbers, spacing tidied.")
NOTE = ("Numbers 5:19 holds verses 19-22 and Mark 6:22 holds 22-23, as the translation joins them; "
        "Revelation 12:18 ends 12:17 and 3 John 1:15 ends 1:14. The source has no psalm titles.")


def sha(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def tidy(s):
    """One space between words, none before punctuation or after an opening quote. The narrow
    space the translation puts between closing quotes (’ ”) is kept."""
    s = re.sub(r"[ \t\r\n ]+", " ", s).strip()
    s = re.sub(r" ([,;:.!?])", r"\1", s)
    s = re.sub(r"([“‘]) ", r"\1", s)
    s = re.sub(r" —", "—", s)
    s = re.sub(r"([.!?,;:]) ([’”])", r"\1\2", s)
    s = s.replace("’ ”", "’ ”").replace("” ’", "” ’")
    s = re.sub(r"([a-zɛɔ][.!?])([A-ZƐƆ])", r"\1 \2", s)   # "mu.Ɔkataa" (Matthew 13:44)
    return s


def kjv_verses():
    out = {}
    for app, _ in BOOKS:
        for c in json.load(open(os.path.join(ROOT, "web", "bible", "books", app + ".json"), encoding="utf-8")):
            out[(app, c["n"])] = {v["n"] for v in c["v"]}
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ebible", required=True, help="a checkout of github.com/BibleNLP/ebible")
    ap.add_argument("--beblia", required=True, help="TwiAsanteBible.xml from github.com/Beblia/Holy-Bible-XML-Format")
    ap.add_argument("--out", default=os.path.join(ROOT, "out", "QuietBible-TWI.qbbible"))
    a = ap.parse_args()
    files = {"corpus/twi-twiasante.txt": os.path.join(a.ebible, "corpus", "twi-twiasante.txt"),
             "metadata/vref.txt": os.path.join(a.ebible, "metadata", "vref.txt"),
             "TwiAsanteBible.xml": a.beblia}
    for name, path in files.items():
        if sha(path) != SHA256[name]:
            sys.exit(f"{name}: not the file this builder was checked against")

    kjv = kjv_verses()
    ids = [b for b, _ in BOOKS]
    books, joined, later = {}, [], {}
    refs = open(files["metadata/vref.txt"], encoding="utf-8").read().split("\n")
    text = open(files["corpus/twi-twiasante.txt"], encoding="utf-8").read().split("\n")
    for r, t in zip(refs, text):
        if not r or r.split(" ")[0] not in ids or not t.strip():
            continue
        b, cv = r.split(" ")
        c, v = map(int, cv.split(":"))
        if t.strip() == "<range>":           # joined to the verse before it
            joined.append((b, c, v))
            continue
        if (b, c, v) in APPEND:
            later[APPEND[(b, c, v)]] = tidy(t)
            continue
        if v not in kjv.get((b, c), ()):
            sys.exit(f"{r} is outside the English numbering")
        books.setdefault(b, {}).setdefault(c, {})[v] = {"t": tidy(t), "p": b == "PSA"}

    if len(later) != len(APPEND):
        sys.exit("the verses past the English numbering have moved")
    for (b, c, v), t in later.items():
        books[b][c][v]["t"] += " " + t

    other = {}
    for bk in ET.parse(files["TwiAsanteBible.xml"]).getroot().iter("book"):
        b = ids[int(bk.get("number")) - 1]
        for ch in bk.iter("chapter"):
            for vs in ch.iter("verse"):
                other[(b, int(ch.get("number")), int(vs.get("number")))] = tidy(vs.text or "")

    filled = []
    for (b, c), numbers in sorted(kjv.items(), key=lambda x: (ids.index(x[0][0]), x[0][1])):
        have = books.get(b, {}).get(c, {})
        missing = [v for v in sorted(numbers) if v not in have and (b, c, v) not in joined]
        if not missing:
            continue
        # The other copy must agree with the corpus wherever both have the chapter.
        shared = [v for v in have if (b, c, v) in other and (b, c, v + 1) not in APPEND]
        bad = [v for v in shared if other[(b, c, v)] != have[v]["t"]]
        if bad:
            sys.exit(f"{b} {c}: the two copies differ at verses {bad[:5]}")
        for v in missing:
            t = other.get((b, c, v), "")
            if not t:
                continue                     # a verse the translation leaves out
            books.setdefault(b, {}).setdefault(c, {})[v] = {"t": t, "p": b == "PSA"}
            filled.append((b, c, v))
    if len(filled) != FILLED:
        sys.exit(f"filled {len(filled)} verses, expected {FILLED}")

    left_out = [(b, c, v) for (b, c), ns in kjv.items() for v in ns
                if v not in books.get(b, {}).get(c, {}) and (b, c, v) not in joined]
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    meta, total = write_pack(a.out, "TWI", "Asante Twi Bible (2020)", "TWI", LICENSE, SOURCE, books, note=NOTE,
                             language="tw", names=dict(zip(ids, NAMES)), abbrs=dict(zip(ids, ABBRS)))
    print(f"{len(meta)} books, {total} verses ({len(filled)} filled in), {round(os.path.getsize(a.out) / 1048576, 2)} MiB")
    print("joined to the verse before:", " ".join(f"{b} {c}:{v}" for b, c, v in joined))
    print("not in this translation:", " ".join(f"{b} {c}:{v}" for b, c, v in sorted(left_out, key=lambda x: (ids.index(x[0]), x[1], x[2]))))
    for r in [("GEN", 1, 1), ("PSA", 23, 1), ("JOL", 2, 28), ("MAL", 4, 6), ("JHN", 3, 16), ("REV", 22, 21)]:
        print(r, books[r[0]][r[1]][r[2]]["t"])


if __name__ == "__main__":
    main()
