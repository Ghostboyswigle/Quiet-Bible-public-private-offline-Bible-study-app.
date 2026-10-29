import sys,subprocess,re,os,unicodedata
B='/home/claude/k2-fsa/linuxjni/sherpa-onnx-v1.13.8-linux-x64-jni'; M='/home/claude/k2-fsa/asr/sherpa-onnx-whisper-small'
ref=[l.strip() for l in open(sys.argv[1],encoding='utf-8') if l.strip()]
def norm(s):
    s=unicodedata.normalize('NFC',s); s=re.sub('[ً-ٰٟـ]','',s); s=re.sub('[أإآٱ]','ا',s).replace('ى','ي').replace('ة','ه')
    return re.sub(r'[^\w\s]',' ',s).split()
def ed(a,b):
    d=list(range(len(b)+1))
    for i,x in enumerate(a,1):
        p=d[:]; d[0]=i
        for j,y in enumerate(b,1): d[j]=min(p[j]+1,d[j-1]+1,p[j-1]+(x!=y))
    return d[-1]
for pre in sys.argv[2:]:
    files=[f'{pre}-{i}.wav' for i in range(len(ref))]
    o=subprocess.run([B+'/bin/sherpa-onnx-offline','--tokens='+M+'/small-tokens.txt','--whisper-encoder='+M+'/small-encoder.int8.onnx','--whisper-decoder='+M+'/small-decoder.int8.onnx','--whisper-language=ar','--whisper-task=transcribe','--num-threads=8']+files,capture_output=True,text=True,env={**os.environ,'LD_LIBRARY_PATH':B+'/lib'})
    hyp=re.findall(r'"text": "([^"]*)"',o.stdout+o.stderr)
    E=N=0
    for r,h in zip(ref,hyp): E+=ed(norm(r),norm(h)); N+=len(norm(r))
    print(pre, len(hyp), 'WER %.1f%%'%(100*E/max(N,1)), '| e.g.', hyp[0][:70] if hyp else '', '| ref', ref[0][:70])
