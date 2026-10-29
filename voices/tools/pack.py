"""
Pack a Piper ONNX voice for the APK: every large float32 weight is stored as 8-bit
codes with one float32 scale per group of GROUP values (weight-only quantization);
everything else is kept byte-for-byte. The phone rebuilds a normal float32 .onnx
once (VoiceBridge / ModelPack.java), so inference runs exactly as with the original
file format and speed.

Container "QBQ8" v1, little-endian:
  "QBQ8" u32 version u64 outLen u32 crc32(out) u32 group u32 regionCount
  regionCount x { u64 offset u32 count }            (offsets into the rebuilt file, ascending)
  u64 gapLen, gap bytes                             (all bytes of the file not inside a region, in order)
  for each region: f32 scales[ceil(count/group)], i8 codes[count]
"""
import struct, sys, zlib
import numpy as np
from onnxscan import scan

MIN_ELEMS = 4096

def pack(src, dst, group):
    b, ts, _ = scan(src)
    regs = sorted((t["raw"][0], (t["raw"][1] - t["raw"][0]) // 4) for t in ts
                  if t["type"] == 1 and t["raw"] and (t["raw"][1] - t["raw"][0]) // 4 >= MIN_ELEMS)
    gaps, pos, payload = [], 0, []
    err_num = err_den = 0.0
    for off, n in regs:
        gaps.append(b[pos:off]); pos = off + 4 * n
        w = np.frombuffer(b, dtype="<f4", count=n, offset=off).astype(np.float64)
        ng = -(-n // group); padded = np.zeros(ng * group); padded[:n] = w
        g = padded.reshape(ng, group)
        scale = np.abs(g).max(axis=1) / 127.0; scale[scale == 0] = 1.0
        scale32 = scale.astype("<f4")
        codes = np.clip(np.rint(g / scale32.astype(np.float64)[:, None]), -127, 127).astype(np.int8)
        rec = (codes.astype(np.float32) * scale32[:, None]).reshape(-1)[:n]
        err_num += ((rec - w) ** 2).sum(); err_den += (w ** 2).sum()
        payload.append(scale32.tobytes() + codes.reshape(-1)[:n].tobytes())
    gaps.append(b[pos:])
    gap = b"".join(gaps)
    rebuilt = bytearray(b)
    for (off, n), pl in zip(regs, payload):
        ng = -(-n // group)
        scale = np.frombuffer(pl, dtype="<f4", count=ng); codes = np.frombuffer(pl, dtype=np.int8, count=n, offset=4 * ng)
        full = np.zeros(ng * group, dtype=np.int8); full[:n] = codes
        rebuilt[off:off + 4 * n] = (full.reshape(ng, group).astype(np.float32) * scale[:, None]).reshape(-1)[:n].astype("<f4").tobytes()
    hdr = b"QBQ8" + struct.pack("<IQIII", 1, len(b), zlib.crc32(bytes(rebuilt)) & 0xffffffff, group, len(regs))
    hdr += b"".join(struct.pack("<QI", off, n) for off, n in regs)
    out = hdr + struct.pack("<Q", len(gap)) + gap + b"".join(payload)
    open(dst, "wb").write(out)
    snr = 10 * np.log10(err_den / err_num)
    print(f"{len(regs)} tensors quantized; weight SNR {snr:.1f} dB; packed {len(out)/1048576:.2f} MiB, deflated {len(zlib.compress(out, 9))/1048576:.2f} MiB")

def unpack(src):
    """Reference decoder (the phone's ModelPack.java must produce identical bytes)."""
    p = open(src, "rb").read()
    assert p[:4] == b"QBQ8"
    ver, outlen, crc, group, nreg = struct.unpack_from("<IQIII", p, 4); i = 4 + 24
    regs = [struct.unpack_from("<QI", p, i + 12 * k) for k in range(nreg)]; i += 12 * nreg
    (gaplen,) = struct.unpack_from("<Q", p, i); i += 8
    gap = p[i:i + gaplen]; i += gaplen
    out = bytearray(); gp = 0; pos = 0
    for off, n in regs:
        take = off - pos; out += gap[gp:gp + take]; gp += take
        ng = -(-n // group)
        scale = np.frombuffer(p, dtype="<f4", count=ng, offset=i); i += 4 * ng
        codes = np.frombuffer(p, dtype=np.int8, count=n, offset=i); i += n
        full = np.zeros(ng * group, dtype=np.int8); full[:n] = codes
        rec = (full.reshape(ng, group).astype(np.float32) * scale[:, None]).reshape(-1)[:n].astype("<f4")
        out += rec.tobytes(); pos = off + 4 * n
    out += gap[gp:]
    assert len(out) == outlen, (len(out), outlen)
    return bytes(out), crc

if __name__ == "__main__":
    pack(sys.argv[1], sys.argv[2], int(sys.argv[3]))
    if len(sys.argv) > 4:
        out, crc = unpack(sys.argv[2]); open(sys.argv[4], "wb").write(out)
        ok = (zlib.crc32(out) & 0xffffffff) == crc
        print("rebuilt", len(out), "bytes; crc", "matches" if ok else "MISMATCH"); assert ok
