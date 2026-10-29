"""Checks a built APK against the previous release before it is handed out.

    python3 tools/verify.py out/QuietBible-v1.0.0.apk path/to/previous.apk

Prints what changed between the two and fails on anything unexpected: a broken
signature, a different signing certificate (the update would not install), a
version code that does not go up, misaligned stored entries, or a corrupt entry.
"""
import hashlib, os, struct, sys, zipfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import manifest  # noqa: E402

MAGIC = b"APK Sig Block 42"
CHUNK = 1048576
ok = True


def check(label, cond, extra=""):
    global ok
    ok = ok and bool(cond)
    print(f"  [{'PASS' if cond else 'FAIL'}] {label}{(' — ' + str(extra)) if extra != '' else ''}")


def seq(buf):
    out, i = [], 0
    while i < len(buf):
        n = struct.unpack_from("<I", buf, i)[0]
        out.append(buf[i + 4:i + 4 + n])
        i += 4 + n
    return out


def v2(path):
    raw = open(path, "rb").read()
    e = raw.rfind(b"PK\x05\x06")
    co = struct.unpack_from("<I", raw, e + 16)[0]
    cs = struct.unpack_from("<I", raw, e + 12)[0]
    se = struct.unpack_from("<Q", raw, co - 24)[0]
    bs = co - se - 8
    p, blk = bs + 8, None
    while p < co - 24:
        pl = struct.unpack_from("<Q", raw, p)[0]
        if struct.unpack_from("<I", raw, p + 8)[0] == 0x7109871A:
            blk = raw[p + 12:p + 8 + pl]
        p += 8 + pl
    return raw, e, co, cs, bs, blk


def cert_of(path):
    _, _, _, _, _, blk = v2(path)
    return seq(seq(seq(seq(seq(blk)[0])[0])[0])[1])[0]


def main(new, old):
    a, b = zipfile.ZipFile(old), zipfile.ZipFile(new)
    an, bn = a.namelist(), b.namelist()
    print("Contents")
    check("every entry passes its CRC", b.testzip() is None)
    check("nothing from the previous release went missing", not (set(an) - set(bn)), sorted(set(an) - set(bn))[:5])
    added = sorted(set(bn) - set(an))
    changed = sorted(n for n in an if n in bn and a.read(n) != b.read(n))
    print("     added:", added or "none")
    print("     changed:", changed or "none")
    libs = sorted(n for n in bn if n.startswith("lib/"))
    check("native speech engine for 64-bit phones present", "lib/arm64-v8a/libsherpa-onnx-jni.so" in libs, libs)
    check("built-in voice present", "assets/tts/voice.qb8" in bn)
    check("licence texts present", all(f"assets/licenses/{f}" in bn for f in
          ["THIRD-PARTY-NOTICES.txt", "espeak-ng-GPL-3.0.txt", "sherpa-onnx-Apache-2.0.txt", "onnxruntime-MIT.txt",
           "piper-voices-MIT.txt", "voice-john-medium-model-card.txt", "supertonic-OpenRAIL-M.txt"]))
    check("built-in King James Version present", "assets/www/bible/meta.json" in bn and "assets/www/bible/books/REV.json" in bn)
    print("Version")
    oc, on = manifest.show(a.read("AndroidManifest.xml"))
    nc, nn = manifest.show(b.read("AndroidManifest.xml"))
    check("version code goes up", nc > oc, f"{oc} ({on}) -> {nc} ({nn})")
    ot = manifest.get_int_attr(a.read("AndroidManifest.xml"), "uses-sdk", "targetSdkVersion")
    nt = manifest.get_int_attr(b.read("AndroidManifest.xml"), "uses-sdk", "targetSdkVersion")
    check("target SDK", nt >= ot, f"{ot} -> {nt}")
    js = b.read("assets/www/app.js").decode("utf8")
    check("About screen shows the same version", f"var QB_VERSION=`{nn}`" in js)
    print("Alignment")
    raw = open(new, "rb").read()
    bad = []
    for i in b.infolist():
        if i.compress_type == zipfile.ZIP_STORED:
            nl, el = struct.unpack_from("<HH", raw, i.header_offset + 26)
            if (i.header_offset + 30 + nl + el) % 4:
                bad.append(i.filename)
    check("stored entries 4-byte aligned", not bad, bad[:3])
    check("resources.arsc stored uncompressed", b.getinfo("resources.arsc").compress_type == zipfile.ZIP_STORED)
    print("APK Signature Scheme v2")
    raw, e, co, cs, bs, blk = v2(new)
    check("signing block present", raw[co - 16:co] == MAGIC and blk is not None)
    signer = seq(seq(blk)[0])
    check("one signer", len(signer) == 1)
    sd, sigs, _ = seq(signer[0])
    dg, certs, _ = seq(sd)
    claimed = seq(dg)[0][8:]
    cert = seq(certs)[0]
    em = bytearray(raw[e:])
    struct.pack_into("<I", em, 16, bs)
    secs = [raw[:bs], raw[co:co + cs], bytes(em)]
    ch = [s[i:i + CHUNK] for s in secs for i in range(0, len(s), CHUNK)]
    d = b"".join(hashlib.sha256(b"\xa5" + struct.pack("<I", len(c)) + c).digest() for c in ch)
    check("content digest matches", hashlib.sha256(b"\x5a" + struct.pack("<I", len(ch)) + d).digest() == claimed, f"{len(ch)} chunks")
    from cryptography import x509
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.asymmetric import padding
    c = x509.load_der_x509_certificate(cert)
    rec = seq(sigs)[0]
    try:
        c.public_key().verify(rec[8:], sd, padding.PKCS1v15(), hashes.SHA256())
        check("signature verifies", True)
    except Exception as ex:  # noqa: BLE001
        check("signature verifies", False, ex)
    check("same certificate as the previous release (installs over it)", cert_of(old) == cert, c.subject.rfc4514_string())
    print(f"\n{os.path.basename(new)}: {os.path.getsize(new) / 1048576:.2f} MiB")
    print("RESULT:", "all checks passed" if ok else "FAILURES PRESENT")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1], sys.argv[2]))
