import sys,subprocess,re,os,unicodedata
B='/home/claude/k2-fsa/linuxjni/sherpa-onnx-v1.13.8-linux-x64-jni'; M='/home/claude/k2-fsa/asr/sherpa-onnx-zipformer-vi-int8-2025-04-20'
ref=[l.strip() for l in open(sys.argv[1],encoding='utf-8') if l.strip()]
def norm(s): return re.sub(r'[^\w\s]',' ',unicodedata.normalize('NFC',s).lower().replace('-',' ')).split()
def ed(a,b):
    d=list(range(len(b)+1))
    for i,x in enumerate(a,1):
        p=d[:]; d[0]=i
        for j,y in enumerate(b,1): d[j]=min(p[j]+1,d[j-1]+1,p[j-1]+(x!=y))
    return d[-1]
for pre in sys.argv[2:]:
    files=[f'{pre}-{i}.wav' for i in range(len(ref))]
    o=subprocess.run([B+'/bin/sherpa-onnx-offline','--tokens='+M+'/tokens.txt','--encoder='+M+'/encoder-epoch-12-avg-8.int8.onnx','--decoder='+M+'/decoder-epoch-12-avg-8.onnx','--joiner='+M+'/joiner-epoch-12-avg-8.int8.onnx','--num-threads=4']+files,capture_output=True,text=True,env={**os.environ,'LD_LIBRARY_PATH':B+'/lib'})
    hyp=re.findall(r'"text": "([^"]*)"',o.stdout+o.stderr)
    E=N=0
    for r,h in zip(ref,hyp): E+=ed(norm(r),norm(h)); N+=len(norm(r))
    print(pre, len(hyp), 'WER %.1f%%'%(100*E/max(N,1)))
    if len(sys.argv)>2 and pre==sys.argv[2]: print('  e.g.', hyp[0][:100], '| ref:', ref[0][:100])
