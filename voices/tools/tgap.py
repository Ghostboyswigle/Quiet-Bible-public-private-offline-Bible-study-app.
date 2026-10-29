"""Usage: python3 tgap.py "<glob of wavs named prefix-<i>-<take>.wav>"   (env WIN, SKIP: seconds)
Measure the consonant between the two vowels of the last word ("water"):
closure = longest run of 5 ms frames whose 80-500 Hz energy is >=20 dB under the vowel level,
dip = depth of the deepest low-band frame, burst = 3.5-8 kHz peak just after the dip minus at the dip."""
import wave, numpy as np, sys, glob, collections
def an(fn):
    w=wave.open(fn); sr=w.getframerate(); x=np.frombuffer(w.readframes(w.getnframes()),np.int16)/32768.0
    hop=int(sr*.005); win=int(sr*.02)
    fr=np.array([x[i:i+win]*np.hanning(win) for i in range(0,len(x)-win,hop)])
    S=np.abs(np.fft.rfft(fr,axis=1))**2; f=np.fft.rfftfreq(win,1/sr)
    db=lambda m: 10*np.log10(S[:,m].sum(1)+1e-10)
    lo=db((f>80)&(f<500)); hi=db((f>3500)&(f<8000)); tot=db(f>0)
    end=np.where(tot>tot.max()-30)[0][-1]
    # "water" ~ last 0.42 s; skip the final 0.08 s (fading schwa)
    import os; WIN=float(os.environ.get("WIN",".42")); SKIP=float(os.environ.get("SKIP",".08")); s0=end-int(WIN/.005); s1=end-int(SKIP/.005)
    seg=lo[s0:s1]; ref=np.percentile(seg,90)
    k=int(np.argmin(seg[10:]))+10   # skip the onset (w)
    thr=ref-20; a=b=k
    while a>0 and seg[a-1]<thr: a-=1
    while b<len(seg)-1 and seg[b+1]<thr: b+=1
    closure=(b-a+1)*5 if seg[k]<thr else 0
    burst=hi[s0+b+1:s0+b+5].max()-hi[s0+k] if s0+b+5<len(hi) else 0
    return closure, ref-seg[k], burst
res=collections.defaultdict(list)
for fn in sorted(glob.glob(sys.argv[1])):
    key=fn.rsplit('/',1)[-1].rsplit('-',2)[0]
    res[key].append(an(fn))
for k,v in res.items():
    v=np.array(v)
    print(f"{k:14s} closure ms {' '.join('%3d'%c for c in v[:,0])}  | mean {v[:,0].mean():5.1f}  dip dB {v[:,1].mean():5.1f}  burst dB {v[:,2].mean():5.1f}")
