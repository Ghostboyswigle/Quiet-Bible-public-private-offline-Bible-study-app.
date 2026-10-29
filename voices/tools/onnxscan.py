"""Minimal protobuf walk of an ONNX file: find float initializers and where their raw bytes sit."""
import struct, sys

def varint(b, i):
    r = s = 0
    while True:
        c = b[i]; i += 1; r |= (c & 0x7f) << s; s += 7
        if c < 0x80: return r, i

def fields(b, start, end):
    i = start
    while i < end:
        key, i = varint(b, i); f, wt = key >> 3, key & 7
        if wt == 0: v, i = varint(b, i); yield f, wt, v, None
        elif wt == 1: yield f, wt, b[i:i+8], None; i += 8
        elif wt == 5: yield f, wt, b[i:i+4], None; i += 4
        elif wt == 2:
            n, i = varint(b, i); yield f, wt, (i, i + n), None; i += n
        else: raise ValueError(f"wire type {wt} at {i}")

def tensor(b, s, e):
    t = {"dims": [], "type": None, "name": "", "raw": None, "float_data": False}
    for f, wt, v, _ in fields(b, s, e):
        if f == 1:
            if wt == 0: t["dims"].append(v)
            else:  # packed
                j = v[0]
                while j < v[1]: d, j = varint(b, j); t["dims"].append(d)
        elif f == 2: t["type"] = v
        elif f == 8: t["name"] = b[v[0]:v[1]].decode()
        elif f == 9: t["raw"] = v
        elif f == 4: t["float_data"] = True
    return t

def scan(path):
    b = open(path, "rb").read()
    out = []; consts = 0
    for f, wt, v, _ in fields(b, 0, len(b)):
        if f == 7 and wt == 2:                      # ModelProto.graph
            for g, gwt, gv, _ in fields(b, *v):
                if g == 5 and gwt == 2:             # GraphProto.initializer
                    out.append(tensor(b, *gv))
                if g == 1 and gwt == 2:             # NodeProto: look for Constant tensors
                    for nf, nwt, nv, _ in fields(b, *gv):
                        if nf == 5 and nwt == 2:    # attribute
                            for af, awt, av, _ in fields(b, *nv):
                                if af == 5 and awt == 2:  # AttributeProto.t
                                    t = tensor(b, *av); t["name"] = "(Constant)"; out.append(t); consts += 1
    return b, out, consts

if __name__ == "__main__":
    b, ts, consts = scan(sys.argv[1])
    import numpy as np
    fl = [t for t in ts if t["type"] == 1 and t["raw"]]
    sizes = sorted(((t["raw"][1]-t["raw"][0])//4, t["name"], t["dims"]) for t in fl)
    tot = sum(s for s, _, _ in sizes) * 4
    print(f"file {len(b)/1e6:.1f} MB; tensors {len(ts)} ({consts} in Constant nodes); float raw {tot/1e6:.1f} MB; float_data tensors {sum(t['float_data'] for t in ts)}")
    big = [s for s in sizes if s[0] >= 4096]
    print(f"float tensors >= 4096 elems: {len(big)}, {sum(s for s,_,_ in big)*4/1e6:.1f} MB")
    for s, n, d in sizes[-12:]: print(f"  {s:9d} {d} {n}")
    other = {}
    for t in ts:
        if t["type"] != 1: other[t["type"]] = other.get(t["type"], 0) + 1
    print("non-float tensor types:", other)
