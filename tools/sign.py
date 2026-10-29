"""Repacks an APK and signs it with APK Signature Scheme v2 (Android 7+; the app needs 8+).

repack_and_sign(base, out, over, add, key_path, password)
  base   the original APK; its entries are kept in order (old v1 signature files dropped)
  over   {entry name: bytes} replacing entries of the same name
  add    [(entry name, file path)] appended after the base entries, compressed
"""
import hashlib, struct, zipfile, zlib

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat, pkcs12

ALIGN, CHUNK = 4, 1048576
MAGIC = b"APK Sig Block 42"
V2_ID, ALGO = 0x7109871A, 0x0103          # RSASSA-PKCS1-v1_5 with SHA2-256
DATE = (2026, 9, 29, 0, 0, 0)


def lp(b):
    return struct.pack("<I", len(b)) + b


def _zip(entries):
    out, cen = bytearray(), bytearray()
    for zi, data in entries:
        m = zipfile.ZIP_DEFLATED if zi.compress_type == zipfile.ZIP_DEFLATED else zipfile.ZIP_STORED
        if m == zipfile.ZIP_DEFLATED:
            co = zlib.compressobj(9, zlib.DEFLATED, -15)
            blob = co.compress(data) + co.flush()
        else:
            blob = data
        crc = zlib.crc32(data) & 0xFFFFFFFF
        name = zi.filename.encode()
        extra = b""
        if m == zipfile.ZIP_STORED:                       # stored entries start on a 4-byte boundary
            need = (-(len(out) + 30 + len(name))) % ALIGN
            pad = 0 if need == 0 else need + 4
            if pad:
                extra = struct.pack("<HH", 0xD935, pad - 4) + b"\0" * (pad - 4)
            assert (len(out) + 30 + len(name) + len(extra)) % ALIGN == 0
        off = len(out)
        d = zi.date_time
        dt = (d[3] << 11) | (d[4] << 5) | (d[5] // 2)
        dd = ((d[0] - 1980) << 9) | (d[1] << 5) | d[2]
        out += struct.pack("<IHHHHHIIIHH", 0x04034B50, 20, 0, m, dt, dd, crc, len(blob), len(data), len(name), len(extra))
        out += name + extra + blob
        cen += struct.pack("<IHHHHHHIIIHHHHHII", 0x02014B50, 0x0314, 20, 0, m, dt, dd, crc, len(blob), len(data),
                           len(name), 0, 0, 0, 0, zi.external_attr, off) + name
    eocd = struct.pack("<IHHHHIIH", 0x06054B50, 0, 0, len(entries), len(entries), len(cen), 0, 0)
    return bytes(out), bytes(cen), bytearray(eocd)


def _digest(sections):
    chunks = [s[i:i + CHUNK] for s in sections for i in range(0, len(s), CHUNK)] or [b""]
    d = b"".join(hashlib.sha256(b"\xa5" + struct.pack("<I", len(c)) + c).digest() for c in chunks)
    return hashlib.sha256(b"\x5a" + struct.pack("<I", len(chunks)) + d).digest()


def new_key(path, password, name="Quiet Bible (own build)"):
    """Writes a new RSA-2048 key and a self-signed certificate (valid 30 years) to a .p12 file."""
    import datetime
    from cryptography import x509
    from cryptography.hazmat.primitives.asymmetric import rsa
    from cryptography.hazmat.primitives.serialization import BestAvailableEncryption
    from cryptography.x509.oid import NameOID
    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    subject = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, name)])
    now = datetime.datetime.now(datetime.timezone.utc)
    cert = (x509.CertificateBuilder().subject_name(subject).issuer_name(subject).public_key(key.public_key())
            .serial_number(x509.random_serial_number()).not_valid_before(now - datetime.timedelta(days=1))
            .not_valid_after(now + datetime.timedelta(days=365 * 30)).sign(key, hashes.SHA256()))
    data = pkcs12.serialize_key_and_certificates(name.encode(), key, cert, None, BestAvailableEncryption(password))
    with open(path, "wb") as f:
        f.write(data)


def repack_and_sign(base, out_path, over, add, key_path, password):
    key, cert, _ = pkcs12.load_key_and_certificates(open(key_path, "rb").read(), password)
    src = zipfile.ZipFile(base)
    entries, seen = [], set()
    for zi in src.infolist():
        n = zi.filename
        if n.startswith("META-INF/") and (n.upper().endswith((".SF", ".RSA", ".DSA", ".EC"))
                                          or n.split("/")[-1].upper() == "MANIFEST.MF"):
            continue
        entries.append((zi, over[n] if n in over else src.read(n)))
        seen.add(n)
    missing = sorted(set(over) - seen - {n for n, _ in add})
    if missing:
        raise SystemExit(f"replacements for entries the base APK does not have: {missing[:5]}")
    for n, path in add:
        if n in seen:
            raise SystemExit(f"{n} is already in the base APK")
        z = zipfile.ZipInfo(n, date_time=DATE)
        z.compress_type = zipfile.ZIP_DEFLATED
        z.external_attr = 0o644 << 16
        entries.append((z, over[n] if n in over else open(path, "rb").read()))
    region, cen, eocd = _zip(entries)
    e = bytearray(eocd)
    struct.pack_into("<I", e, 16, len(region))
    dg = _digest([region, cen, bytes(e)])
    cd = cert.public_bytes(Encoding.DER)
    spki = key.public_key().public_bytes(Encoding.DER, PublicFormat.SubjectPublicKeyInfo)
    signed = lp(lp(struct.pack("<I", ALGO) + lp(dg))) + lp(lp(cd)) + lp(b"")
    sig = key.sign(signed, padding.PKCS1v15(), hashes.SHA256())
    signer = lp(signed) + lp(lp(struct.pack("<I", ALGO) + lp(sig))) + lp(spki)
    val = lp(lp(signer))
    pair = struct.pack("<Q", 4 + len(val)) + struct.pack("<I", V2_ID) + val
    size = len(pair) + 8 + 16
    block = struct.pack("<Q", size) + pair + struct.pack("<Q", size) + MAGIC
    fin = bytearray(eocd)
    struct.pack_into("<I", fin, 16, len(region) + len(block))
    with open(out_path, "wb") as f:
        f.write(region + block + cen + bytes(fin))
