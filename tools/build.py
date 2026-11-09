"""Rebuild index.html from src/. Run from the repo root:  python3 tools/build.py
The game code outside the two marked blocks is edited directly in index.html; the blocks are regenerated."""
import json,os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC=os.path.join(ROOT,'src')+os.sep
idx=os.path.join(ROOT,'index.html')
rd=lambda f:open(SRC+f,encoding='utf-8').read()
h=open(idx,encoding='utf-8').read()
B='/* ===TD-BEGIN=== */';E='/* ===TD-END=== */'
if B in h:
    a=h.index(B);b=h.index(E)+len(E)+1
    h=h[:a]+h[b:]
rows=json.load(open(SRC+'maps.json'))
body='const TDROWS='+json.dumps(rows,separators=(',',':'))+';\n'+''.join(rd(f)+'\n' for f in ['td1_engine.js','td2_scene.js','td3_trailer.js','td4_base.js','td5_story.js'])
anchor='requestAnimationFrame(frame);splash();'
assert h.count(anchor)==1
B2='/* ===UI2-BEGIN=== */';E2='/* ===UI2-END=== */'
if B2 in h:
    a=h.index(B2);b=h.index(E2)+len(E2)+1
    h=h[:a]+h[b:]
# order matters: later modules wrap functions defined by earlier ones (td12 is loaded before td11 on purpose)
ui2='\n'.join([rd('ui2.js'),rd('td6.js'),rd('td7.js'),rd('td8.js')])
ui2+='\nconst TD_DEEPROOMS='+rd('deep_rooms.json').strip()+';\n'+rd('td9.js')
ui2+='\nconst TD_CITYROOMS='+rd('city_rooms.json').strip()+';\n'+'\n'.join(rd(f) for f in ['td10.js','td12.js','td11.js','td13.js','td14.js','td15.js','td16.js','td17.js','td18.js','td19.js','td20.js','td21.js'])
h=h.replace(anchor,B+'\n'+body+E+'\n'+B2+'\n'+ui2+E2+'\n'+anchor)
open(idx,'w',encoding='utf-8').write(h)
s=h[h.index('<script>\n"use strict";')+8:h.rindex('</script>')]
open(os.path.join(ROOT,'tools','main.js'),'w',encoding='utf-8').write(s)
print('built index.html; syntax-check with: node --check tools/main.js')
