import os;os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','src'))
import json
m=json.load(open('maps.json'))
def ext(name):
    R=[r.ljust(36) for r in m[name]]
    R=[list(r) for r in R]
    # back room x22..33, y3..8 with walls
    for y in range(1,10):
        for x in range(21,35):
            if R[y][x]==' ' or x>=21:R[y][x]='#'
    for y in range(3,9):
        for x in range(22,34):R[y][x]='.'
    for x in (25,26,30,31):R[1][x]='w';R[2][x]='w'
    R[5][20]='D';R[5][21]='_'
    m[name]=[''.join(r).rstrip() for r in R]
ext('RONIN');ext('STUDIO')
json.dump(m,open('maps.json','w'))
print('\n'.join(m['RONIN']))
