"""Build a .qbvoice (zip: voice.properties, tokens.txt, voice.qb8, optional espeak/<lang>_dict,
or for dictionary voices lexicon.txt plus text-rule .fst files)."""
import sys, zipfile, subprocess, os, argparse
ap = argparse.ArgumentParser()
ap.add_argument("--piper"); ap.add_argument("--id"); ap.add_argument("--name"); ap.add_argument("--note")
ap.add_argument("--gain", default="1"); ap.add_argument("--language", default="en"); ap.add_argument("--speaker", default="0")
ap.add_argument("--dict", default=None); ap.add_argument("--out")
ap.add_argument("--lexicon", action="store_true"); ap.add_argument("--rules", default="phone.fst,date.fst,number.fst")
ap.add_argument("--source", default="https://huggingface.co/rhasspy/piper-voices"); ap.add_argument("--license", default=None)
a = ap.parse_args()
src = f"/home/claude/k2-fsa/voices/vits-piper-{a.piper}"
qb8 = f"{a.id}-g64.qb8"
subprocess.run([sys.executable, "pack.py", f"{src}/{a.piper}.onnx", qb8, "64"], check=True)
props = (f"format=1\nid={a.id}\nname={a.name}\nnote={a.note}\ngain={a.gain}\nlanguage={a.language}\nspeaker={a.speaker}\n"
         f"source=Piper {a.piper}, {a.source}\n" + (f"license={a.license}\n" if a.license else "")
         + (f"rules={a.rules}\n" if a.lexicon and a.rules else ""))
with zipfile.ZipFile(a.out, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    z.writestr(zipfile.ZipInfo("voice.properties", (2026, 9, 30, 0, 0, 0)), props.encode("utf-8"), zipfile.ZIP_DEFLATED)
    z.write(f"{src}/tokens.txt", "tokens.txt")
    z.write(qb8, "voice.qb8")
    if a.dict: z.write(f"{src}/espeak-ng-data/{a.dict}", f"espeak/{a.dict}")
    if a.lexicon:
        z.write(f"{src}/lexicon.txt", "lexicon.txt")
        for r in filter(None, a.rules.split(",")): z.write(f"{src}/{r}", r)
print(a.out, round(os.path.getsize(a.out) / 1048576, 2), "MiB")
