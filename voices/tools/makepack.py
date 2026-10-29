"""Builds a many-language voice pack (format 2) as several .qbvoice parts, each small
enough for GitHub (under 100 MB).

    python3 makepack.py <supertonic model dir> <out prefix> <voices spec> [--parts 2] [--license file]

voices spec: "lang|style|name|note|gain;..." (style = index in voice.bin)
Writes <out prefix>-part1.qbvoice ... -partN.qbvoice. The app joins the parts once all
are added and checks every file against the sizes and SHA-256 sums listed here.
"""
import argparse, hashlib, os, zipfile

FILES = ["duration_predictor.int8.onnx", "text_encoder.int8.onnx", "vector_estimator.int8.onnx",
         "vocoder.int8.onnx", "tts.json", "unicode_indexer.bin", "voice.bin"]
DATE = (2026, 10, 7, 0, 0, 0)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("model_dir"); ap.add_argument("out"); ap.add_argument("voices")
    ap.add_argument("--parts", type=int, default=2)
    ap.add_argument("--id", default="supertonic3"); ap.add_argument("--name", default="Supertonic 3")
    ap.add_argument("--build", default="2026-05-11")
    ap.add_argument("--steps", default="5")
    ap.add_argument("--license-file", default=None)
    ap.add_argument("--license", default="BigScience Open RAIL-M (Supertone Inc.); commercial use allowed, with use restrictions")
    ap.add_argument("--source", default="Supertonic 3 by Supertone Inc. (huggingface.co/Supertone/supertonic-3), int8 version by sherpa-onnx")
    a = ap.parse_args()

    blobs = {f: open(os.path.join(a.model_dir, f), "rb").read() for f in FILES}
    extra = {}
    if a.license_file:
        extra["license.txt"] = open(a.license_file, "rb").read()
    total = sum(len(b) for b in blobs.values())
    target = -(-total // a.parts)

    # Fill parts in order; a file that doesn't fit is cut into numbered pieces.
    parts = [[] for _ in range(a.parts)]
    p, room = 0, target
    for f in FILES:
        b, off, piece = blobs[f], 0, 0
        pieces = []
        while off < len(b):
            take = len(b) - off if p == a.parts - 1 else min(room, len(b) - off)
            pieces.append((p, b[off:off + take]))
            off += take
            room -= take
            if room <= 0 and p < a.parts - 1:
                p, room = p + 1, target
        if len(pieces) == 1:
            parts[pieces[0][0]].append((f, pieces[0][1]))
        else:
            for i, (pp, chunk) in enumerate(pieces, 1):
                parts[pp].append((f"{f}.part{i:02d}", chunk))

    props = [f"format=2", f"engine=supertonic", f"id={a.id}", f"name={a.name}", f"build={a.build}",
             f"parts={a.parts}", f"files={','.join(FILES)}", f"steps={a.steps}",
             f"license={a.license}", f"source={a.source}", f"voices={a.voices}"]
    props += [f"size.{f}={len(blobs[f])}" for f in FILES]
    props += [f"sha256.{f}={hashlib.sha256(blobs[f]).hexdigest()}" for f in FILES]
    for i, entries in enumerate(parts, 1):
        out = f"{a.out}-part{i}.qbvoice"
        with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
            z.writestr(zipfile.ZipInfo("voice.properties", DATE), ("\n".join(props + [f"part={i}"]) + "\n").encode("utf-8"),
                       zipfile.ZIP_DEFLATED)
            for n, data in list(extra.items()) + entries:
                z.writestr(zipfile.ZipInfo(n, DATE), data, zipfile.ZIP_DEFLATED)
        print(out, round(os.path.getsize(out) / 1048576, 1), "MiB:", ", ".join(n for n, _ in entries))


if __name__ == "__main__":
    main()
