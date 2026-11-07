from PIL import Image,ImageFilter,ImageEnhance
import numpy as np,sys
from collections import deque
SP='./' # run from the repo's art/ folder parent with the source charts at images/1-4.webp, or edit SRC below
def blackbg(im,bg=(95,7,42),t1=48,t2=95):
    a=np.array(im).astype(int);H,W,_=a.shape;d=np.sqrt(((a-np.array(bg))**2).sum(2));fill=np.zeros((H,W),bool);q=deque()
    for x in range(W):
        for y in (0,H-1):
            if d[y,x]<t1 and not fill[y,x]:fill[y,x]=True;q.append((y,x))
    for y in range(H):
        for x in (0,W-1):
            if d[y,x]<t1 and not fill[y,x]:fill[y,x]=True;q.append((y,x))
    while q:
        y,x=q.popleft()
        for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=y+dy,x+dx
            if 0<=ny<H and 0<=nx<W and not fill[ny,nx] and d[ny,nx]<t1:fill[ny,nx]=True;q.append((ny,nx))
    nb=np.zeros_like(fill);nb[1:]|=fill[:-1];nb[:-1]|=fill[1:];nb[:,1:]|=fill[:,:-1];nb[:,:-1]|=fill[:,1:]
    fr=nb&~fill&(d<t2);k=(1-(d[fr]-t1)/(t2-t1)).clip(0,1)[:,None];a[fill]=0;a[fr]=(a[fr]*(1-k)).astype(int)
    return Image.fromarray(a.clip(0,255).astype('uint8'))
# eye band per character, as fractions of the cell (x0,y0,x1,y1)
EYE={'v':(.22,.27,.80,.42),'m':(.15,.26,.70,.42),'r':(.20,.20,.78,.36),'a':(.18,.20,.78,.36)}
SRC={'v':'images/1.webp','m':'images/2.webp','r':'images/3.webp','a':'images/4.webp'}
NAMES={'v':['neutral','calm','angry','surprised','stern','smile','shout','fluster','content'],'m':['neutral','talk','annoyed','surprised','cry','smug','shout','fluster','content'],
 'r':['neutral','grin','angry','surprised','cry','smirk','shout','fluster','laugh'],'a':['neutral','flirt','annoyed','surprised','cry','smirk','shout','fluster','laugh']}
N=56;COLS={'v':32,'m':32,'r':32,'a':40}
def cells(k):
    im=Image.open(SP+SRC[k]).convert('RGB');c=1254/3
    for i in range(9):
        x,y=i%3,i//3;cell=im.crop((int(x*c)+4,int(y*c)+4,int((x+1)*c)-4,int((y+1)*c)-4))
        if k=='r':cell=blackbg(cell)
        yield NAMES[k][i],cell
def pix(k,cell,eyes=True):
    base=cell.resize((N,N),Image.BOX)
    base=ImageEnhance.Contrast(base).enhance(1.06)
    if eyes:
        x0,y0,x1,y1=EYE[k];W=cell.size[0]
        sharp=cell.filter(ImageFilter.UnsharpMask(radius=3,percent=160,threshold=2)).resize((N,N),Image.LANCZOS)
        sharp=ImageEnhance.Contrast(sharp).enhance(1.12)
        box=(int(x0*N),int(y0*N),int(x1*N)+1,int(y1*N)+1)
        A=np.array(base).astype(int);B=np.array(sharp).astype(int);lum=lambda X:X[...,0]*.3+X[...,1]*.59+X[...,2]*.11
        diff=np.abs(lum(B)-lum(A));chroma=np.abs(B-B.mean(2,keepdims=True)).sum(2)-np.abs(A-A.mean(2,keepdims=True)).sum(2)
        m=np.zeros((N,N),bool);m[box[1]:box[3],box[0]:box[2]]=True;m&=(diff>14)|(chroma>22)
        A[m]=B[m];base=Image.fromarray(A.clip(0,255).astype('uint8'))
        # palette sample weights the eye band so iris colours survive quantization
        eb=base.crop(box);samp=Image.new('RGB',(N,N+eb.size[1]*4));samp.paste(base,(0,0))
        for r in range(4):samp.paste(eb,(0,N+r*eb.size[1]))
        pal=samp.quantize(colors=COLS[k],method=Image.FASTOCTREE)
    else:pal=base.quantize(colors=COLS[k],method=Image.FASTOCTREE)
    return base.quantize(palette=pal,dither=Image.NONE).convert('RGB')
if __name__=='__main__':
    rows=[]
    for k in 'vmra':
        for name,cell in cells(k):
            if name in ('neutral','surprised','fluster'):rows.append((pix(k,cell,False),pix(k,cell,True)))
    S=4;o=Image.new('RGB',(N*S*2+8,len(rows)*N*S),(40,40,40))
    for i,(a,b) in enumerate(rows):o.paste(a.resize((N*S,N*S),Image.NEAREST),(0,i*N*S));o.paste(b.resize((N*S,N*S),Image.NEAREST),(N*S+8,i*N*S))
    o.save(SP+'scratchpad/shots/pix_cmp.png')
