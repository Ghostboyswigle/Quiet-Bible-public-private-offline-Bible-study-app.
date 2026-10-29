import struct,sys
d=open(sys.argv[1],'rb').read()
def u16(o):return struct.unpack_from('<H',d,o)[0]
def u32(o):return struct.unpack_from('<I',d,o)[0]
strings=[];off=8;depth=0
while off<len(d):
    t,hs,sz=u16(off),u16(off+2),u32(off+4)
    if t==1:
        n=u32(off+8);flags=u32(off+16);ss=u32(off+20);utf8=flags&0x100
        for i in range(n):
            so=off+ss+u32(off+hs+i*4)
            if utf8:
                l=d[so];so+=2 if l&0x80 else 1
                l2=d[so]
                if l2&0x80: l2=((l2&0x7f)<<8)|d[so+1];so+=2
                else: so+=1
                strings.append(d[so:so+l2].decode('utf8','replace'))
            else:
                l=u16(so);strings.append(d[so+2:so+2+l*2].decode('utf16','replace'))
    elif t==0x102:
        name=strings[u32(off+20)];ac=u16(off+28);ao=off+16+u16(off+24)
        attrs=[]
        for i in range(ac):
            a=ao+i*20;nm=strings[u32(a+4)];raw=u32(a+8);dt=d[a+15];val=u32(a+16)
            v=strings[raw] if raw!=0xffffffff else (val if dt in(16,17) else ('true' if dt==18 and val else 'false' if dt==18 else hex(val)))
            attrs.append(f'{nm}={v}')
        print('  '*depth+name,' '.join(attrs));depth+=1
    elif t==0x103: depth-=1
    off+=sz
