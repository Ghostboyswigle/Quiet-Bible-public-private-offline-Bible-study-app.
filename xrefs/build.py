#!/usr/bin/env python3
"""Builds the cross-reference map (Bible Cross-References by Oleksii Trekhleb, MIT) into the app.

    python3 xrefs/build.py --upstream <checkout> --three <checkout> --stepbible <checkout> \\
        --node-modules <folder> --esbuild <folder>

Inputs (see xrefs/README.md for where each comes from):
  --upstream      https://github.com/trekhleb/bible-cross-references at the commit in UPSTREAM_COMMIT
  --three         https://github.com/mrdoob/three.js at tag r186 (package.json and build/)
  --stepbible     https://github.com/STEPBible/STEPBible-Data (the six tagged-text files and the
                  two lexicons; their SHA-256 must match the project's data/sources.json)
  --node-modules  a folder holding react and react-dom 19.2, react-icons 5.6
  --esbuild       the esbuild package folder (0.27)

Writes:
  web/xrefs/index.html, app.js, app.css     the map
  web/bible/xrefs/cross-references/openbible.json, words/stepbible.json
                                            built by the project's own importers, and checked
                                            against the project's data/datasets.lock.json
  web/bible/xrefs/translations/kjv.json, bsb.json
                                            Quiet Bible's own KJV and BSB, in the project's
                                            verse order
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
UPSTREAM_COMMIT = "fc190ea"
PATCH = os.path.join(HERE, "quiet-bible.patch")
STEPBIBLE_FILES = {
    "stepbible-tagnt-mat-jhn.txt": "Translators Amalgamated OT+NT/TAGNT Mat-Jhn - Translators Amalgamated Greek NT - STEPBible.org CC-BY.txt",
    "stepbible-tagnt-act-rev.txt": "Translators Amalgamated OT+NT/TAGNT Act-Rev - Translators Amalgamated Greek NT - STEPBible.org CC-BY.txt",
    "stepbible-tahot-gen-deu.txt": "Translators Amalgamated OT+NT/TAHOT Gen-Deu - Translators Amalgamated Hebrew OT - STEPBible.org CC BY.txt",
    "stepbible-tahot-jos-est.txt": "Translators Amalgamated OT+NT/TAHOT Jos-Est - Translators Amalgamated Hebrew OT - STEPBible.org CC BY.txt",
    "stepbible-tahot-job-sng.txt": "Translators Amalgamated OT+NT/TAHOT Job-Sng - Translators Amalgamated Hebrew OT - STEPBible.org CC BY.txt",
    "stepbible-tahot-isa-mal.txt": "Translators Amalgamated OT+NT/TAHOT Isa-Mal - Translators Amalgamated Hebrew OT - STEPBible.org CC BY.txt",
    "stepbible-tbesg.txt": "Lexicons/TBESG - Translators Brief lexicon of Extended Strongs for Greek - STEPBible.org CC BY.txt",
    "stepbible-tbesh.txt": "Lexicons/TBESH - Translators Brief lexicon of Extended Strongs for Hebrew - STEPBible.org CC BY.txt",
}
TEXTS = {
    "kjv": ("bible", "King James Version (Authorized Version), the 1769 text, as in Quiet Bible",
            {"name": "Public domain", "url": "https://ebible.org/Scriptures/details.php?id=eng-kjv2006", "publicDomain": True}),
    "bsb": ("bible/bsb", "Berean Standard Bible (BSB), dedicated to the public domain",
            {"name": "Public domain", "url": "https://berean.bible/terms.htm", "publicDomain": True}),
}


def run(cmd, **kw):
    print("+", " ".join(cmd[:4]), "…" if len(cmd) > 4 else "")
    subprocess.run(cmd, check=True, **kw)


def texts(work, out):
    """Quiet Bible's KJV and BSB as the project's translation files: one string per verse, in
    the project's canonical (KJV) order, "" for a verse the translation leaves out."""
    order = json.loads(subprocess.run(
        ["node", "--input-type=module", "-e",
         "import {KJV_CHAPTER_VERSE_COUNTS as C} from './src/core/bible/kjv-versification.ts';"
         "import {BOOKS} from './src/core/bible/books.ts';"
         "console.log(JSON.stringify(BOOKS.map(b => [b.id, C[b.id]])));"],
        cwd=work, check=True, capture_output=True, text=True).stdout)
    meta = json.load(open(os.path.join(ROOT, "web", "bible", "meta.json"), encoding="utf8"))
    meta = meta["meta"] if isinstance(meta, dict) else meta
    if len(meta) != len(order):
        sys.exit("book lists differ")
    for tid, (folder, attribution, license_) in TEXTS.items():
        verses, missing = [], 0
        for (osis, counts), book in zip(order, meta):
            chapters = json.load(open(os.path.join(ROOT, "web", folder, "books", book["id"] + ".json"), encoding="utf8"))
            by = {(c["n"], v["n"]): v["t"] for c in chapters for v in c["v"]}
            if len(by) and max(c for c, _ in by) != len(counts):
                sys.exit(f"{tid} {book['id']}: {max(c for c, _ in by)} chapters, expected {len(counts)}")
            for c, n in enumerate(counts, 1):
                for v in range(1, n + 1):
                    t = by.pop((c, v), "")
                    missing += t == ""
                    verses.append(t)
            if by:
                sys.exit(f"{tid} {book['id']}: verses outside the KJV numbering: {sorted(by)[:5]}")
        doc = {
            "format": "translation-text", "schemaVersion": 1, "versification": "kjv",
            "provenance": {"url": "quiet-bible:web/" + folder + "/books", "sha256": "",
                           "retrievedAt": "", "snapshotDate": None},
            "notices": [], "translationId": tid, "license": license_,
            "attribution": "Scripture text: " + attribution + ".", "verses": verses,
        }
        path = os.path.join(out, "translations", tid + ".json")
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf8") as fh:
            json.dump(doc, fh, ensure_ascii=False, separators=(",", ":"))
        print(f"✓ translations/{tid}.json ({len(verses)} verses, {missing} left out)")


def main():
    ap = argparse.ArgumentParser()
    for name in ("upstream", "three", "stepbible", "node-modules", "esbuild"):
        ap.add_argument("--" + name, required=True)
    a = ap.parse_args()

    head = subprocess.run(["git", "-C", a.upstream, "rev-parse", "HEAD"], capture_output=True, text=True).stdout.strip()
    if not head.startswith(UPSTREAM_COMMIT):
        sys.exit(f"--upstream is at {head or '?'}, expected {UPSTREAM_COMMIT}")

    tmp = tempfile.mkdtemp(prefix="qb-xrefs-")
    work = os.path.join(tmp, "project")
    try:
        run(["git", "clone", "-q", a.upstream, work])
        run(["git", "-C", work, "checkout", "-q", UPSTREAM_COMMIT])
        run(["git", "-C", work, "apply", PATCH])
        shutil.copy(os.path.join(HERE, "scripts", "qb-datasets.ts"), os.path.join(work, "scripts", "data"))
        nm = os.path.join(work, "node_modules")
        os.makedirs(nm)
        for pkg in ("react", "react-dom", "react-icons"):
            os.symlink(os.path.realpath(os.path.join(a.node_modules, pkg)), os.path.join(nm, pkg))
        os.symlink(os.path.realpath(a.three), os.path.join(nm, "three"))
        os.symlink(os.path.join(HERE, "shims", "fflate"), os.path.join(nm, "fflate"))
        for name, src in STEPBIBLE_FILES.items():
            shutil.copy(os.path.join(a.stepbible, src), os.path.join(work, "data", "raw", name))

        data = os.path.join(ROOT, "web", "bible", "xrefs")
        shutil.rmtree(data, ignore_errors=True)
        run(["node", "scripts/data/qb-datasets.ts", data], cwd=work)
        texts(work, data)

        site = os.path.join(ROOT, "web", "xrefs")
        shutil.rmtree(site, ignore_errors=True)
        os.makedirs(site)
        run(["node", os.path.join(HERE, "scripts", "bundle.mjs"), os.path.realpath(a.esbuild), work, site])
        shutil.copy(os.path.join(HERE, "index.html"), os.path.join(site, "index.html"))
        print("✓ web/xrefs/", ", ".join(f"{f} {os.path.getsize(os.path.join(site, f))} bytes" for f in sorted(os.listdir(site))))
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
