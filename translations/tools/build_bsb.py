#!/usr/bin/env python3
"""Builds the built-in Berean Standard Bible: web/bible/bsb/meta.json and books/XXX.json.

    python3 translations/tools/build_bsb.py --txt bsb.txt

The words come from bsb.txt, the Berean Bible's own one-verse-per-line text
(https://bereanbible.com/bsb.txt, dedicated to the public domain), checked against its SHA-256.
The same file, pinned to the same checksum, is data/raw/bsb.txt in
https://github.com/trekhleb/bible-cross-references.

Section headings, parallel passages, translator notes, psalm titles, poetry indents and the
words of Jesus come from translations/bsb/structure.json, kept from the BSB that Quiet Bible was
first built with (that build lost the end of 540 verses, which is why the words are taken from
bsb.txt now). As in the KJV, a psalm's title stays at the start of verse 1 and is also given as
"d"; the reader shows it once.

The 16 verses the BSB leaves out (Matthew 17:21 and the like, empty in bsb.txt) are left out
here too; the notes on the verses before them say so.
"""
import argparse
import hashlib
import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SHA256 = "2ac3af1de52d4e68261cba91d85c320b7eadc6560e830d99e591767b8ff5ca96"
STRUCTURE = os.path.join(ROOT, "translations", "bsb", "structure.json")
KJV_META = os.path.join(ROOT, "web", "bible", "meta.json")
OUT = os.path.join(ROOT, "web", "bible", "bsb")
FIELDS = ("p", "d", "h", "r", "f", "j")

# Psalm titles the earlier build did not mark (or marked with the name of the book of Psalms
# instead), as they begin verse 1 in bsb.txt. Each must match the text exactly.
PSALM_TITLES = {
    6: "For the choirmaster. With stringed instruments, according to Sheminith. A Psalm of David.",
    7: "A Shiggaion of David, which he sang to the LORD concerning the words of Cush, a Benjamite.",
    18: "For the choirmaster. Of David the servant of the LORD, who sang this song to the LORD on "
        "the day the LORD had delivered him from the hand of all his enemies and from the hand of "
        "Saul. He said:",
    34: "Of David, when he pretended to be insane before Abimelech, so that the king drove him away.",
    42: "For the choirmaster. A Maskil of the sons of Korah.",
    45: "For the choirmaster. To the tune of “The Lilies.” A Maskil of the sons of Korah. A love song.",
    51: "For the choirmaster. A Psalm of David. When Nathan the prophet came to him after his "
        "adultery with Bathsheba.",
    52: "For the choirmaster. A Maskil of David. After Doeg the Edomite went to Saul and told him, "
        "“David has gone to the house of Ahimelech.”",
    54: "For the choirmaster. With stringed instruments. A Maskil of David. When the Ziphites went "
        "to Saul and said, “Is David not hiding among us?”",
    56: "For the choirmaster. To the tune of “A Dove on Distant Oaks.” A Miktam of David, when the "
        "Philistines seized him in Gath.",
    57: "For the choirmaster. To the tune of “Do Not Destroy.” A Miktam of David, when he fled from "
        "Saul into the cave.",
    59: "For the choirmaster. To the tune of “Do Not Destroy.” A Miktam of David, when Saul sent men "
        "to watch David’s house in order to kill him.",
    60: "For the choirmaster. To the tune of “The Lily of the Covenant.” A Miktam of David for "
        "instruction. When he fought Aram-naharaim and Aram-zobah, and Joab returned and struck down "
        "12,000 Edomites in the Valley of Salt.",
    73: "A Psalm of Asaph.",
    80: "For the choirmaster. To the tune of “The Lilies of the Covenant.” A Psalm of Asaph.",
    88: "A song. A Psalm of the sons of Korah. For the choirmaster. According to Mahalath Leannoth. "
        "A Maskil of Heman the Ezrahite.",
    90: "A prayer of Moses the man of God.",
    102: "A prayer of one who is afflicted, when he grows faint and pours out his lament before the "
         "LORD.",
}
# The earlier build gave the five books of Psalms ("Psalms 42–72") as the title of their first
# psalm; they belong with the heading ("BOOK II").
DIVISION = re.compile(r"^Psalms \d+–\d+$")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--txt", required=True, help="bsb.txt from bereanbible.com")
    ap.add_argument("--out", default=OUT)
    a = ap.parse_args()

    raw = open(a.txt, "rb").read()
    if hashlib.sha256(raw).hexdigest() != SHA256:
        sys.exit("bsb.txt does not match the pinned SHA-256 " + SHA256)
    kjv = json.load(open(KJV_META, encoding="utf8"))
    kjv = kjv["meta"] if isinstance(kjv, dict) else kjv
    ids = {b["name"]: b["id"] for b in kjv}
    ids["Psalm"] = "PSA"
    structure = json.load(open(STRUCTURE, encoding="utf8"))["books"]

    text = {}
    order = []
    for line in raw.decode("utf-8-sig").splitlines():
        m = re.match(r"^(.+?) (\d+):(\d+)\t(.*)$", line)
        if not m:
            continue
        book = ids.get(m.group(1))
        if book is None:
            sys.exit("unknown book in bsb.txt: " + m.group(1))
        if book not in text:
            text[book] = {}
            order.append(book)
        text[book][(int(m.group(2)), int(m.group(3)))] = re.sub(r"\s+", " ", m.group(4)).strip()
    if order != [b["id"] for b in kjv]:
        sys.exit("bsb.txt does not have the 66 books in the expected order")

    os.makedirs(os.path.join(a.out, "books"), exist_ok=True)
    meta = []
    total = left_out = used = 0
    titles_apart = []
    for b in kjv:
        bid = b["id"]
        extra = structure.get(bid, {})
        chapters = []
        verses_in_book = 0
        for (c, v), t in sorted(text[bid].items()):
            key = f"{c}:{v}"
            if not t:
                left_out += 1
                if key in extra:
                    sys.exit(f"{bid} {key}: notes on a verse the BSB leaves out")
                continue
            if not chapters or chapters[-1]["n"] != c:
                chapters.append({"n": c, "v": []})
            verse = {"n": v, "t": t}
            for f in FIELDS:
                if f in extra.get(key, {}):
                    verse[f] = extra[key][f]
            if key in extra:
                used += 1
            if bid == "PSA" and v == 1:
                if DIVISION.match(verse.get("d", "")):
                    verse["h"] = f"{verse['h']} ({verse.pop('d')})" if verse.get("h") else verse.pop("d")
                if c in PSALM_TITLES:
                    if "d" in verse:
                        sys.exit(f"PSA {key}: already has a title")
                    verse["d"] = PSALM_TITLES[c]
            if "d" in verse and not t.startswith(verse["d"]):
                titles_apart.append(f"{bid} {key}: {verse['d']}")
            chapters[-1]["v"].append(verse)
            verses_in_book += 1
        unused = [k for k in extra if (int(k.split(":")[0]), int(k.split(":")[1])) not in text[bid]]
        if unused:
            sys.exit(f"{bid}: notes for verses bsb.txt does not have: {unused[:5]}")
        with open(os.path.join(a.out, "books", bid + ".json"), "w", encoding="utf8") as fh:
            json.dump(chapters, fh, ensure_ascii=False, separators=(",", ":"))
        meta.append({"id": bid, "name": b["name"], "abbr": b["abbr"], "t": b["t"],
                     "chapters": len(chapters), "verses": verses_in_book})
        total += verses_in_book
    with open(os.path.join(a.out, "meta.json"), "w", encoding="utf8") as fh:
        json.dump({"meta": meta}, fh, ensure_ascii=False, separators=(",", ":"))
    print(f"BSB: {total} verses ({left_out} left out as in the BSB), notes on {used} verses")
    for line in titles_apart:
        print("  title shown apart from the verse:", line)


if __name__ == "__main__":
    main()
