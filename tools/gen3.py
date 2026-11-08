import os;os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','src'))
import json
OUT={};RECTS={}
class Mp:
    def __init__(s,name,W,H):
        s.n=name;s.W=W;s.H=H;s.g=[[' ']*W for _ in range(H)];s.R={}
    def rm(s,k,x0,y0,x1,y1,ch='.'):
        s.R[k]=[x0,y0,x1-x0+1,y1-y0+1]
        s.fill(x0,y0,x1,y1,ch)
    def fill(s,x0,y0,x1,y1,ch):
        for y in range(y0,y1+1):
            for x in range(x0,x1+1):s.g[y][x]=ch
    def put(s,x,y,ch):s.g[y][x]=ch
    def done(s,walls=True):
        walk=set('._D=gGamxo,')
        g=s.g;H,W=s.H,s.W
        if walls:
            for y in range(H):
                for x in range(W):
                    if g[y][x] in walk:
                        for dy in (-1,0,1):
                            for dx in (-1,0,1):
                                yy,xx=y+dy,x+dx
                                if 0<=yy<H and 0<=xx<W and g[yy][xx]==' ':g[yy][xx]='#'
            for y in range(2,H):
                for x in range(W):
                    if g[y][x] in walk and g[y-1][x]=='#' and g[y-2][x]==' ':g[y-2][x]='#'
        OUT[s.n]=[''.join(r) for r in g];RECTS[s.n]=s.R
        return s

# 1. city square (mall)
m=Mp('CITY',36,21)
m.rm('square',1,3,34,15)
m.rm('street',1,16,34,18,'a')
for x in [4,9,14,22,27,31]:m.put(x,1,'w')
m.done()

# 2. harbour + container yard
m=Mp('HARBOUR',48,26)
m.fill(0,11,27,25,'~')
m.rm('quay',1,3,26,10)
m.rm('pier',12,11,14,22)
m.rm('shore',1,11,6,13)
m.rm('yard',30,3,46,23)
m.fill(27,6,29,6,'.')
m.put(28,6,'D')
m.done()
for y in range(11,26):
    r=list(OUT['HARBOUR'][y])
    for x in range(0,28):
        if r[x]=='#' and y>=12 and not (11<=x<=15): r[x]='~'
    OUT['HARBOUR'][y]=''.join(r)

# 3. Kururin Land
m=Mp('PARK',44,28)
m.rm('park',1,3,42,25,'G')
m.fill(2,22,41,23,'g');m.fill(20,4,22,24,'g');m.fill(2,12,41,13,'g')
m.done()

# 4. haunted house interior
m=Mp('HAUNT',30,14)
m.rm('hall',1,3,12,11);m.rm('mirrors',14,3,22,6);m.rm('ride',14,8,28,11);m.rm('coffin',24,3,28,6)
m.fill(13,9,13,10,'.');m.fill(23,4,23,5,'.');m.fill(18,7,19,7,'.')
m.done()

# 5. laundromat
m=Mp('LAUNDRO',24,12)
m.rm('laundro',1,3,22,9)
for x in [5,9,13,17]:m.put(x,1,'w')
m.done()

# 6. sento
m=Mp('SENTO',30,14)
m.rm('genkan',1,4,6,11);m.rm('changing',8,3,15,11);m.rm('bath',17,3,28,11)
m.fill(7,7,7,8,'.');m.fill(16,6,16,8,'.')
m.done()

# 7. shrine + cemetery
m=Mp('SHRINE',42,30)
m.rm('shrine',1,9,30,27)
m.fill(12,10,18,27,'g')
m.rm('graves',31,2,40,12)
m.fill(31,13,33,15,'g');m.R['path']=[31,13,3,3]
m.fill(28,13,30,15,'g')
m.done()

# 8. station platform
m=Mp('STATION',36,14)
m.rm('platform',1,3,34,8)
m.fill(0,9,35,13,'T')
m.done()
r=list(OUT['STATION'][9]);OUT['STATION'][9]=''.join(r)

# 9. last carriage
m=Mp('CARRIAGE',34,8)
m.rm('car',1,3,32,5)
for x in range(3,32,4):m.put(x,1,'w')
m.done()

# 10. the coast
m=Mp('COAST',40,22)
m.rm('beach',1,3,38,15)
m.fill(0,16,39,21,'~')
m.done()
for y in range(16,22):
    r=list(OUT['COAST'][y]);r=['~' if ch=='#' else ch for ch in r];OUT['COAST'][y]=''.join(r)

# 11. old track
m=Mp('OLDTRACK',40,24)
m.rm('track',1,3,38,21)
m.done()

# 12. Kyoto: machiya + river at Uji
m=Mp('KYOTO',48,22)
m.rm('machiya',1,3,14,9)
for x in [3,6,9,12]:m.put(x,1,'w')
m.fill(15,6,16,6,'.');m.put(15,6,'D')
m.rm('uji',17,3,46,13)
m.fill(16,14,47,21,'~')
m.done()
for y in range(14,22):
    r=list(OUT['KYOTO'][y]);r=['~' if (ch=='#' and x>=16) else ch for x,ch in enumerate(r)];OUT['KYOTO'][y]=''.join(r)
# the station door to the machiya: fix the passage
mj=json.load(open('maps.json'))
mj.update(OUT)
json.dump(mj,open('maps.json','w'))
json.dump(RECTS,open('city_rooms.json','w'))
for k,v in OUT.items():
    print(k);print('\n'.join(v))
