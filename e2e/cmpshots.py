import sys,glob,os
from PIL import Image, ImageChops
a_dir,b_dir=sys.argv[1],sys.argv[2]; bad=0; n=0
for f in sorted(glob.glob(a_dir+'/*.png')):
    g=os.path.join(b_dir,os.path.basename(f))
    if not os.path.exists(g): continue
    n+=1
    a=Image.open(f).convert('RGB'); b=Image.open(g).convert('RGB')
    for im in (a,b): im.paste((0,0,0),(0,0,60,60))      # the app icon in the header is not pixel-stable between runs
    d=ImageChops.difference(a,b).getbbox()
    if d: bad+=1; print('DIFFERS', os.path.basename(f), d)
print(f'{n-bad}/{n} identical')
