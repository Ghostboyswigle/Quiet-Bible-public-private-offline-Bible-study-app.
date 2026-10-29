"""Read or rewrite the version in a binary AndroidManifest.xml (the compiled form inside an APK).

    python3 manifest.py show  <AndroidManifest.xml>
    python3 manifest.py set   <in.xml> <out.xml> <versionCode> <versionName>

Only versionCode / versionName change; the string pool is rebuilt so the new name can
be any length. Everything else in the file is copied unchanged.
"""
import struct, sys

ANDROID_NS = "http://schemas.android.com/apk/res/android"
RES_STRING_POOL, RES_XML_START_ELEMENT = 0x0001, 0x0102
TYPE_STRING, TYPE_INT_DEC = 0x03, 0x10


def parse_pool(d, off):
    hs, sz = struct.unpack_from("<HI", d, off + 2)
    n, styles, flags, s_start, st_start = struct.unpack_from("<IIIII", d, off + 8)
    if styles:
        raise SystemExit("string pools with styles are not supported")
    utf8 = bool(flags & 0x100)
    out = []
    for i in range(n):
        so = off + s_start + struct.unpack_from("<I", d, off + hs + i * 4)[0]
        if utf8:
            l = d[so]; so += 2 if l & 0x80 else 1
            l2 = d[so]
            if l2 & 0x80:
                l2 = ((l2 & 0x7F) << 8) | d[so + 1]; so += 2
            else:
                so += 1
            out.append(d[so:so + l2].decode("utf8"))
        else:
            l = struct.unpack_from("<H", d, so)[0]
            if l & 0x8000:
                l = ((l & 0x7FFF) << 16) | struct.unpack_from("<H", d, so + 2)[0]; so += 2
            out.append(d[so + 2:so + 2 + l * 2].decode("utf-16-le"))
    return out, flags, sz


def build_pool(strings, flags):
    if flags & 0x100:
        raise SystemExit("UTF-8 string pools are not supported by this tool")
    data = bytearray(); offs = []
    for s in strings:
        offs.append(len(data))
        u = s.encode("utf-16-le"); n = len(u) // 2
        if n >= 0x8000:
            raise SystemExit("string too long")
        data += struct.pack("<H", n) + u + b"\0\0"
    while len(data) % 4:
        data += b"\0"
    hs = 28
    s_start = hs + 4 * len(strings)
    body = struct.pack("<IIIII", len(strings), 0, flags, s_start, 0) + b"".join(struct.pack("<I", o) for o in offs) + bytes(data)
    return struct.pack("<HHI", RES_STRING_POOL, hs, 8 + len(body)) + body


def walk(d):
    """Yields (offset, type, size) for each chunk inside the XML document."""
    off = 8
    while off < len(d):
        t, hs, sz = struct.unpack_from("<HHI", d, off)
        yield off, t, sz
        off += sz


def manifest_attrs(d, strings):
    """Offsets of the versionCode/versionName attribute records on <manifest>."""
    found = {}
    for off, t, sz in walk(d):
        if t != RES_XML_START_ELEMENT:
            continue
        name = strings[struct.unpack_from("<I", d, off + 20)[0]]
        if name != "manifest":
            continue
        a_start, a_size, a_count = struct.unpack_from("<HHH", d, off + 24)
        base = off + 16 + a_start
        for i in range(a_count):
            a = base + i * a_size
            ns, nm = struct.unpack_from("<iI", d, a)
            if ns >= 0 and strings[ns] == ANDROID_NS and strings[nm] in ("versionCode", "versionName"):
                found[strings[nm]] = a
        return found
    raise SystemExit("no <manifest> element")


def set_int_attr(d, element, attr, value):
    """Sets an integer attribute (e.g. uses-sdk targetSdkVersion) in place."""
    d = bytearray(d)
    strings, _, _ = parse_pool(d, 8)
    for off, t, sz in walk(d):
        if t != RES_XML_START_ELEMENT or strings[struct.unpack_from("<I", d, off + 20)[0]] != element:
            continue
        a_start, a_size, a_count = struct.unpack_from("<HHH", d, off + 24)
        for i in range(a_count):
            a = off + 16 + a_start + i * a_size
            ns, nm = struct.unpack_from("<iI", d, a)
            if ns >= 0 and strings[ns] == ANDROID_NS and strings[nm] == attr:
                if d[a + 15] != TYPE_INT_DEC:
                    raise SystemExit(f"{element} {attr} is not a plain integer")
                struct.pack_into("<I", d, a + 16, value)
                return bytes(d)
    raise SystemExit(f"no {attr} on <{element}>")


def get_int_attr(d, element, attr):
    strings, _, _ = parse_pool(d, 8)
    for off, t, sz in walk(d):
        if t != RES_XML_START_ELEMENT or strings[struct.unpack_from("<I", d, off + 20)[0]] != element:
            continue
        a_start, a_size, a_count = struct.unpack_from("<HHH", d, off + 24)
        for i in range(a_count):
            a = off + 16 + a_start + i * a_size
            ns, nm = struct.unpack_from("<iI", d, a)
            if ns >= 0 and strings[ns] == ANDROID_NS and strings[nm] == attr:
                return struct.unpack_from("<I", d, a + 16)[0]
    return None


def show(d):
    strings, _, _ = parse_pool(d, 8)
    at = manifest_attrs(d, strings)
    code = struct.unpack_from("<I", d, at["versionCode"] + 16)[0]
    raw = struct.unpack_from("<i", d, at["versionName"] + 8)[0]
    return code, strings[raw]


def set_version(d, code, name):
    d = bytearray(d)
    strings, flags, pool_size = parse_pool(d, 8)
    at = manifest_attrs(d, strings)
    struct.pack_into("<I", d, at["versionCode"] + 16, code)          # typed value data
    if d[at["versionCode"] + 15] != TYPE_INT_DEC:
        raise SystemExit("versionCode is not a plain integer")
    idx = struct.unpack_from("<i", d, at["versionName"] + 8)[0]
    if _used_elsewhere(d, strings, idx, at["versionName"]):
        strings.append(name); idx = len(strings) - 1                 # keep the old string for its other users
    else:
        strings[idx] = name
    struct.pack_into("<i", d, at["versionName"] + 8, idx)              # raw value
    struct.pack_into("<I", d, at["versionName"] + 16, idx)             # typed value data (string index)
    pool = build_pool(strings, flags)
    out = bytes(d[:8]) + pool + bytes(d[8 + pool_size:])
    out = bytearray(out)
    struct.pack_into("<I", out, 4, len(out))
    return bytes(out)


def _used_elsewhere(d, strings, idx, skip):
    """True if string idx is referenced anywhere in the file other than the versionName value."""
    pat = struct.pack("<I", idx)
    body = bytes(d[8 + struct.unpack_from("<I", d, 12)[0]:])
    start = 8 + struct.unpack_from("<I", d, 12)[0]
    hits = [start + i for i in range(0, len(body) - 3, 4) if body[i:i + 4] == pat]
    return any(h not in (skip + 8, skip + 16) for h in hits)


if __name__ == "__main__":
    if sys.argv[1] == "show":
        print(*show(open(sys.argv[2], "rb").read()))
    elif sys.argv[1] == "set":
        src = open(sys.argv[2], "rb").read()
        out = set_version(src, int(sys.argv[4]), sys.argv[5])
        open(sys.argv[3], "wb").write(out)
        print(*show(out))
    else:
        raise SystemExit(__doc__)
