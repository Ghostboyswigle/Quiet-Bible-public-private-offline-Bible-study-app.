"""Median pitch (Hz) of each wav, to tell higher (usually female) from lower (usually male) voices.
    python3 pitch.py a.wav b.wav ..."""
import sys, wave, numpy as np
for f in sys.argv[1:]:
    w = wave.open(f); sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    fr, hop = int(sr * 0.04), int(sr * 0.01); f0 = []
    for i in range(0, len(x) - fr, hop):
        s = x[i:i + fr] - x[i:i + fr].mean()
        if np.sqrt((s * s).mean()) < 0.02: continue
        ac = np.correlate(s, s, "full")[fr - 1:]
        lo, hi = int(sr / 400), int(sr / 70)
        k = lo + int(np.argmax(ac[lo:hi]))
        if ac[k] > 0.3 * ac[0]: f0.append(sr / k)
    print(f, round(float(np.median(f0)) if f0 else 0))
