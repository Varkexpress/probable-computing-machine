"""Second AI-tell scanner: stock phrases, closers and rhythm tics inside string literals.
Usage: python3 tools/aiscan2.py            -> per-file / per-rule counts
       python3 tools/aiscan2.py -v [glob]  -> every hit as file:line [rule] text (optionally only files matching glob)
Scans src/*.js and index.html outside the TD and UI2 generated regions (same scope as aiscan.py)."""
import re,glob,os,sys,fnmatch
from collections import Counter,defaultdict
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
h=open(ROOT+'/index.html',encoding='utf-8').read()
a=h.index('/* ===TD-BEGIN=== */');b=h.index('/* ===UI2-END=== */')
files={'index.html':(h,[(0,a),(b,len(h))])}
for f in sorted(glob.glob(ROOT+'/src/*.js')):
    t=open(f,encoding='utf-8').read();files['src/'+os.path.basename(f)]=(t,[(0,len(t))])
A="[’']"
RULES=[
 ('something-like',r"\bsomething like\b",0),
 ('somehow',r"\bsomehow\b",0),
 ('that-was-enough',r"\b(?:and )?that(?:"+A+r"s| was| is) enough\b",0),
 ('weight-of',r"\bthe weight of\b",0),
 ('the-silence',r"\b[Tt]he silence\b",0),
 ('kind-of',r"\b(?:a|some) kind of\b",0),
 ('in-a-way-that',r"\bin a way that\b",0),
 ('first-time-in',r"\bfor the first time in\b",0),
 ('quietly',r"\bquietly\b",0),
 ('repeat',r"\b((?:\w+"+A+r"?\w* ){1,3}\w+"+A+r"?\w*[.!?,]) \1",re.I),
 ('triad-closer',r"(?:^|[.!?] )[^.!?]{0,80}\b\w+(?: \w+){0,2}, \w+(?: \w+){0,2}, and \w+(?: [\w’']+){0,3}\.$",'N'),
 ('em-dash-x2',r"—[^—]*—",0),
 ('just-opener',r"(?:^|[.!?)] )Just\b",'N'),
 ('aphorism-closer',r"[.!?)] (?:That|This|It|Some things?|Nothing|Everything|Which|And that)(?:"+A+r"s| is| was| stays?| stayed| holds?| works?| counts?| matters?| helps?| keeps| will keep| lasts?)(?: \w+"+A+r"?\w*){0,3}\.$",'N'),
 ('aphorism-dialogue',r"[.!?)] (?:(?:That|This|It)(?:"+A+r"s| is| was) (?:the (?:deal|point|thing|rule|trick|job)|what \w+ (?:do|does)|how it (?:goes|works|is)|all (?:it|there)\b[^.]*|enough)|Some things \w+|Nothing \w+ forever|Everything \w+)\.$",0),
 ('neither-said',r"\bNeither of (?:them|you|us)\b[^.]{0,40}\b(?:says?|said|speaks?|spoke|answers?)\b",0),
 ('and-yet',r"\b[Aa]nd yet\b",0),
 ('every-single',r"\b[Ee]very single\b",0),
 ('a-beat',r"\ba beat\b|(?:^|[.!?] )Beat\.",0),
 ('the-way-you',r"\bthe way (?:you|he|she|they|a person|people|someone) \w+ (?:a|an|the) \w+",0),
 ('named-emotion',r"[.!?)] (?:It|That|This)(?:"+A+r"s| is| was) (?:grief|love|fear|joy|relief|shame|guilt|pride|longing|tenderness|what (?:love|grief|fear|care|trust)[^.]{0,30})\.",0),
 ('nobody-ever',r"\b(?:[Nn]obody|[Nn]o one|[Nn]o-one)(?: has| had|"+A+r"s|"+A+r"d)? ever\b",0),
]
RULES=[(n,re.compile(p,f if isinstance(f,int) else 0),f=='N') for n,p,f in RULES]
LIT=re.compile(r"'((?:[^'\\\n]|\\.){12,})'|`((?:[^`\\]|\\.){12,})`|\"((?:[^\"\\\n]|\\.){12,})\"")
NARR=re.compile(r"\[\s*(?:''|\"\")\s*,\s*$")
verbose='-v' in sys.argv;filt=[x for x in sys.argv[1:] if x!='-v']
per=defaultdict(Counter);tot=Counter();hits=[]
for name,(txt,ranges) in files.items():
    if filt and not any(fnmatch.fnmatch(name,g) for g in filt):continue
    for lo,hi in ranges:
        for m in LIT.finditer(txt,lo,hi):
            s=next(g for g in m.groups() if g is not None)
            if ' ' not in s or (re.search(r"[{}=;]|=>|function|rect\(|\bc\.",s) and '${' not in s):continue
            narr=bool(NARR.search(txt[max(0,m.start()-12):m.start()]))
            for rn,rx,nar in RULES:
                if nar and not narr:continue
                if rx.search(s):
                    per[name][rn]+=1;tot[rn]+=1
                    hits.append((name,txt.count('\n',0,m.start())+1,rn,s))
if verbose:
    for f,l,r,s in hits:print(f"{f}:{l} [{r}] {s[:300]}")
else:
    for f in sorted(per):print(f"{f:20s} {sum(per[f].values()):4d}  "+' '.join(f"{k}={v}" for k,v in per[f].most_common()))
    print(f"{'TOTAL':20s} {sum(tot.values()):4d}  "+' '.join(f"{k}={v}" for k,v in tot.most_common()))
