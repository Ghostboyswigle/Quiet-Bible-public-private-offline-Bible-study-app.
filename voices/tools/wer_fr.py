import sys,subprocess,re,os,unicodedata,wave,numpy as np
B='/home/claude/k2-fsa/linuxjni/sherpa-onnx-v1.13.8-linux-x64-jni'; M='/home/claude/k2-fsa/asr/sherpa-onnx-streaming-zipformer-fr-2023-04-14'
ref=[l.strip() for l in open(sys.argv[1],encoding='utf-8') if l.strip()]
def norm(s):
    s=unicodedata.normalize('NFC',s).lower().replace('’',"'").replace('-',' ')
    s=re.sub(r"[^\w\s']",' ',s); s=s.replace("'"," ")
    return s.split()
def ed(a,b):
    d=list(range(len(b)+1))
    for i,x in enumerate(a,1):
        p=d[:]; d[0]=i
        for j,y in enumerate(b,1): d[j]=min(p[j]+1,d[j-1]+1,p[j-1]+(x!=y))
    return d[-1]
for pre in sys.argv[2:]:
    E=N=0
    files=[f'{pre}-{i}.wav' for i in range(len(ref))]
    o=subprocess.run([B+'/bin/sherpa-onnx','--tokens='+M+'/tokens.txt','--encoder='+M+'/encoder-epoch-29-avg-9-with-averaged-model.int8.onnx','--decoder='+M+'/decoder-epoch-29-avg-9-with-averaged-model.onnx','--joiner='+M+'/joiner-epoch-29-avg-9-with-averaged-model.int8.onnx','--num-threads=4']+files,capture_output=True,text=True,env={**os.environ,'LD_LIBRARY_PATH':B+'/lib'})
    hyps=re.findall(r'"text": "([^"]*)"',o.stdout+o.stderr)
    for r,h in zip(ref,hyps): E+=ed(norm(r),norm(h)); N+=len(norm(r))
    print(pre, 'WER %.1f%%'%(100*E/N), '| e.g.', hyps[1][:80])
