#!/usr/bin/env python3
"""Check or apply dialogue replacements to a line range of index.html.
usage: apply_pairs.py pairs.json START END [--write]
pairs.json = [["old text","new text"], ...]  (text as it appears in the file, between the quotes)"""
import json,sys
pairs=json.load(open(sys.argv[1]));a,b=int(sys.argv[2]),int(sys.argv[3]);write='--write' in sys.argv
L=open('index.html').read().split('\n');seg='\n'.join(L[a-1:b]);ok=bad=0
for o,n in pairs:
    why=None
    if o==n: continue
    if seg.count(o)<1: why='old text not found in range'
    elif "'" in n and "'" not in o: why="raw ' in new text"
    elif '`' in n and '`' not in o: why='backtick in new text'
    elif '\n' in n or ('\\' in n and '\\' not in o): why='newline/backslash in new text'
    elif '${' in n and '${' not in o: why='${ in new text'
    elif len(o)<12: why='old text too short to be safe'
    if why: bad+=1;print('SKIP:',why,'|',o[:70]);continue
    seg=seg.replace(o,n);ok+=1
print('ok',ok,'skipped',bad)
if write:
    L[a-1:b]=seg.split('\n');open('index.html','w').write('\n'.join(L))
