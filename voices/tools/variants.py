"""Build candidate packings: (default bits, group) with optional per-prefix overrides."""
import struct, zlib, sys, numpy as np
from onnxscan import scan
M='/home/claude/k2-fsa/voices/vits-piper-en_US-john-medium/en_US-john-medium.onnx'
b, ts, _ = scan(M)
def build(name, rule):
    rebuilt = bytearray(b); bits_total = 0; scales = 0
    for t in ts:
        if t["type"] != 1 or not t["raw"]: continue
        n = (t["raw"][1] - t["raw"][0]) // 4
        if n < 4096: continue
        bits, group = rule(t["name"])
        off = t["raw"][0]
        w = np.frombuffer(b, dtype="<f4", count=n, offset=off).astype(np.float64)
        ng = -(-n // group); g = np.zeros(ng * group); g[:n] = w; g = g.reshape(ng, group)
        q = 2 ** (bits - 1) - 1
        sc = (np.abs(g).max(axis=1) / q).astype(np.float32); sc[sc == 0] = 1
        codes = np.clip(np.rint(g / sc[:, None]), -q, q)
        rec = (codes.astype(np.float32) * sc[:, None]).reshape(-1)[:n].astype("<f4")
        rebuilt[off:off + 4 * n] = rec.tobytes(); bits_total += n * bits; scales += ng
    open(name + ".onnx", "wb").write(rebuilt)
    print(f"{name}: approx packed {(bits_total/8 + scales*4 + 0.9e6)/1048576:.2f} MiB")
enc = lambda n: n.startswith("enc_p.")
build("v8g256", lambda n: (8, 256))
build("v6g32", lambda n: (6, 32))
build("vmix", lambda n: (5, 32) if enc(n) else (8, 64))
build("vmix6", lambda n: (6, 32) if enc(n) else (8, 64))
