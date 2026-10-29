"""Scores synthetic speech by reading it back with Whisper (sherpa-onnx) and comparing to the text.

    python3 asr_score.py <verses.tsv: lang\tref\ttext> <wav dir> [out.json]

Wav files are named <lang>-<voice>-<ref>.wav. Prints the character error rate (CER) per
language and voice; lower is clearer. Diacritics are ignored for Arabic (Whisper rarely
writes them), kept for every other language.
"""
import json, os, re, subprocess, sys, unicodedata
from collections import defaultdict

BIN = "/home/claude/k2-fsa/linuxjni/sherpa-onnx-v1.13.8-linux-x64-jni/bin/sherpa-onnx-offline"
LIB = "/home/claude/k2-fsa/linuxjni/sherpa-onnx-v1.13.8-linux-x64-jni/lib"
W = "/home/claude/k2-fsa/asr/sherpa-onnx-whisper-small"


def norm(s, lang):
    s = unicodedata.normalize("NFC", s).lower()
    s = re.sub(r"\[[^\]]*\]", " ", s)
    if lang == "ar":
        s = re.sub(r"[ً-ٰٟـ]", "", s)
        s = re.sub(r"[إأآ]", "ا", s).replace("ى", "ي").replace("ة", "ه")
    s = re.sub(r"[^\w\s]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def cer(ref, hyp):
    r, h = ref.replace(" ", ""), hyp.replace(" ", "")
    d = list(range(len(h) + 1))
    for i, rc in enumerate(r, 1):
        prev, d[0] = d[0], i
        for j, hc in enumerate(h, 1):
            prev, d[j] = d[j], min(d[j] + 1, d[j - 1] + 1, prev + (rc != hc))
    return d[len(h)] / max(1, len(r))


def transcribe(wavs, lang):
    env = dict(os.environ, LD_LIBRARY_PATH=LIB)
    out = subprocess.run([BIN, f"--whisper-encoder={W}/small-encoder.int8.onnx", f"--whisper-decoder={W}/small-decoder.int8.onnx",
                          f"--tokens={W}/small-tokens.txt", f"--whisper-language={lang}", "--num-threads=2"] + wavs,
                         capture_output=True, text=True, env=env)
    paths = [l.strip() for l in (out.stdout + out.stderr).splitlines() if re.match(r"^/\S+\.wav$", l.strip())]
    heard = [m.group(1) for m in re.finditer(r'"text":\s*"(.*?)",\s*"timestamps"', out.stdout + out.stderr)]
    texts = dict(zip(paths, heard)) if len(paths) == len(heard) else {}
    if not texts:
        print("could not match transcripts to files", len(paths), len(heard), file=sys.stderr)
    return texts


def main():
    verses = {}
    for line in open(sys.argv[1], encoding="utf8"):
        p = line.rstrip("\n").split("\t", 2)
        if len(p) == 3:
            verses[(p[0], p[1])] = p[2]
    d = sys.argv[2]
    by_lang = defaultdict(list)
    for f in sorted(os.listdir(d)):
        if f.endswith(".wav"):
            lang, voice, ref = f[:-4].split("-", 2)
            by_lang[lang].append((voice, ref, os.path.join(d, f)))
    result = {}
    for lang, items in sorted(by_lang.items()):
        texts = transcribe([p for _, _, p in items], lang)
        per_voice = defaultdict(list)
        for voice, ref, path in items:
            hyp = texts.get(path, "")
            c = cer(norm(verses[(lang, ref)], lang), norm(hyp, lang))
            per_voice[voice].append(c)
            result[f"{lang}-{voice}-{ref}"] = {"cer": round(c, 3), "heard": hyp}
        print(lang, "  ".join(f"{v}:{sum(cs) / len(cs):.3f}" for v, cs in sorted(per_voice.items(), key=lambda x: int(x[0]) if x[0].isdigit() else x[0])))
    if len(sys.argv) > 3:
        json.dump(result, open(sys.argv[3], "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
