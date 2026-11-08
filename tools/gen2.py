import os;os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','src'))
import json,random
W,H=80,100
g=[[' ']*W for _ in range(H)]
R={}
def rm(n,x0,y0,x1,y1):
    R[n]=(x0,y0,x1,y1)
    for y in range(y0,y1+1):
        for x in range(x0,x1+1):g[y][x]='.'
rm('land',4,4,9,7);rm('h1',12,5,27,6);rm('depot',30,3,46,11);rm('wc1',13,9,18,12);rm('h2',26,9,27,20)
rm('h3',29,18,52,19);rm('gallery',30,22,58,26);rm('curio',61,21,70,29);rm('h4',26,23,27,40);rm('cinema',8,29,22,40)
rm('wc2',30,30,35,33);rm('work',38,29,49,37);rm('h5',24,43,60,44);rm('dome',36,47,60,58);rm('doors',63,33,64,52);rm('tunnel',63,55,76,56);rm('range',3,44,20,55)
def gapv(x,y0,y1,door=True):  # vertical passage rows y0..y1, door at the last row
    for y in range(y0,y1+1):g[y][x]='_'
    if door:g[y1][x]='D'
def gaph(y,x0,x1,dx):
    for x in range(x0,x1+1):g[y][x]='_'
    g[y][dx]='D'
gaph(6,10,11,11)      # land -> h1
gapv(26,7,8)          # h1 -> h2
gaph(6,28,29,29)      # h1 -> depot
gapv(15,7,8)          # h1 -> wc1
gaph(18,28,28,28)     # h2 -> h3
gapv(40,20,21)        # h3 -> gallery
gaph(24,59,60,60)     # gallery -> curio (hidden)
gapv(26,21,22)        # h2 -> h4 (corridor continues, open arch)
g[22][26]='_'
gaph(35,23,25,23)     # h4 -> cinema (door at cinema side)
gaph(31,28,29,29)     # h4 -> wc2
gaph(31,36,37,37)     # wc2 -> work (hidden)
gapv(26,41,42)        # h4 -> h5 : sub-level 4 door
gapv(48,45,46)        # h5 -> dome
gaph(43,61,62,62)     # h5 -> doors
gapv(63,53,54)        # doors -> tunnel
gaph(44,21,23,22)     # h5 -> range
# ---- sub-level 5 ----
rm('b5land',6,64,16,69);rm('b5h1',17,66,60,67);R['library']=[12,73,32,93]
for yy in range(72,95):
    for xx in range(10,35):
        if (xx-22)**2+(yy-83)**2<=110.25:g[yy][xx]='.'
rm('seeds',43,72,54,80);rm('obs',43,84,54,93)
rm('wing',57,69,60,96);rm('cham1',63,70,76,74);rm('cham2',63,77,76,81);rm('cham3',63,84,76,88);rm('cham4',63,91,76,95);rm('pump',4,96,54,97)
gapv(11,56,63)        # range -> b5 stairwell (door at the bottom)
gapv(22,68,72)        # corridor -> library (north)
gapv(48,68,71)        # corridor -> seed vault
gapv(48,81,83)        # seed vault -> observation
gaph(88,32,42,42)     # library -> observation (east)
gaph(86,55,56,56)     # observation -> wing
for yy in (72,79,86,93):gaph(yy,61,62,62)   # wing -> chambers
gapv(22,94,95)        # library -> pump hall (south)
gaph(96,55,56,56)     # wing -> pump room
gapv(58,68,68)        # corridor -> wing B
# walls: any empty neighbour of a walkable tile; north faces get two rows
walk=set('._D')
for y in range(H):
    for x in range(W):
        if g[y][x] in walk:
            for dy in (-1,0,1):
                for dx in (-1,0,1):
                    yy,xx=y+dy,x+dx
                    if 0<=yy<H and 0<=xx<W and g[yy][xx]==' ':g[yy][xx]='#'
for y in range(1,H):
    for x in range(W):
        if g[y][x] in walk and g[y-1][x]=='#' and y>=2 and g[y-2][x]==' ':g[y-2][x]='#'
rows=[''.join(r) for r in g]
# forest: open ground with a tunnel grate on the west edge
F=[[' ']*56 for _ in range(44)]
for y in range(1,43):
    for x in range(1,55):F[y][x]='G'
for x in range(56):F[0][x]='#';F[43][x]='#'
for y in range(44):F[y][0]='#';F[y][55]='#'
for x in range(56):F[1][x]='#'
frows=[''.join(r) for r in F]
m=json.load(open('maps.json'));m['DEEP']=rows;m['FOREST']=frows;json.dump(m,open('maps.json','w'));json.dump(R,open('deep_rooms.json','w'))
print('\n'.join(rows[55:100]))
