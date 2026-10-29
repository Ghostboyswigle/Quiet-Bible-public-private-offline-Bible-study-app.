"""Build a .qbvoice file: a zip with voice.properties, tokens.txt and the packed model."""
import sys, zipfile, subprocess, os
voice, name, note, gain, out = sys.argv[1:6]
src = f"/home/claude/k2-fsa/voices/vits-piper-en_US-{voice}-medium"
qb8 = f"{voice}-g64.qb8"
subprocess.run([sys.executable, "pack.py", f"{src}/en_US-{voice}-medium.onnx", qb8, "64"], check=True)
props = (f"format=1\nid={voice}\nname={name}\nnote={note}\ngain={gain}\n"
         f"source=Piper en_US-{voice}-medium, https://huggingface.co/rhasspy/piper-voices\n")
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    z.writestr(zipfile.ZipInfo("voice.properties", (2026, 9, 29, 0, 0, 0)), props.encode("utf-8"), zipfile.ZIP_DEFLATED)
    z.write(f"{src}/tokens.txt", "tokens.txt")
    z.write(qb8, "voice.qb8")
print(out, round(os.path.getsize(out) / 1048576, 2), "MiB")
