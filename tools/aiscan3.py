"""Third AI-tell scanner, for fiction: the tics that aiscan2 does not catch, taken from docs/VOICE.md's tic list and
from what the humanizer pass found in this game's prose. Same scope as aiscan2 (src/*.js and index.html outside the
TD and UI2 regions); it reads string literals only.
Usage: python3 tools/aiscan3.py            -> per-file / per-rule counts
       python3 tools/aiscan3.py -v [glob]  -> every hit as file:line [rule] text"""
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
 # negation-first reveal: "It is not X. It is Y." / "It was not X; it was Y" / "not X, but Y"
 ('not-x-it-is-y',r"\b(?:It|That|This|He|She|They|You)(?:"+A+r"s| is| was| are| were) not [^.;!?]{1,60}[.;] (?:It|That|This|He|She|They|You)(?:"+A+r"s| is| was| are| were) ",0),
 ('not-x-but-y',r"\bnot (?:because|for|about|that)\b[^.;]{1,50}, but\b",0),
 ('worst-of-it',r"\b(?:That|This|It)(?:"+A+r"s| is| was) the (?:worst|best|strangest|hardest|only) (?:of it|part|thing)\b",0),
 ('most-x-thing',r"\b(?:is|was) the most \w+ thing (?:that )?(?:you|he|she|they|anybody|anyone|I)\b",0),
 ('you-find-that',r"\b(?:You|He|They|She) (?:find|finds|found) that\b",0),
 ('which-is-worse',r"\bwhich is worse\b|\bthat is worse\b|\bIt is worse\.",0),
 ('know-exactly',r"\b(?:know|knew|knows) exactly\b",0),
 ('for-a-long',r"\bfor a long (?:moment|time|while)\b",0),
 ('something-in',r"\bsomething in (?:your|his|her|their) (?:chest|face|eyes|voice|throat)\b",0),
 ('as-if-to-say',r"\bas if to say\b",0),
 ('a-thing-that',r"\b(?:It|That) is a thing that\b",0),
 ('you-did-that',r"(?:^|[.!?] )You did that\.",0),
 ('all-at-once',r"\ball at once\b",0),
 ('the-only-thing',r"\bthe only (?:thing|one) (?:that )?(?:you|he|they|she) (?:have|has|had|know|knew|can|could)\b",0),
 ('and-that-is',r"(?:^|[.!?] )And that is\b|\bThat is all\.|\bThat is the whole of it\b|\bThat is what\b",0),
 ('very-carefully',r"\bvery (?:carefully|gently|slowly|quietly|softly)\b",0),
 ('neither-of',r"\b[Nn]either of (?:you|them|us)\b",0),
]
RULES=[(n,re.compile(p,f)) for n,p,f in RULES]
LIT=re.compile(r"'((?:[^'\\\n]|\\.){12,})'|`((?:[^`\\]|\\.){12,})`|\"((?:[^\"\\\n]|\\.){12,})\"")
verbose='-v' in sys.argv;pat=[x for x in sys.argv[1:] if x!='-v'];pat=pat[0] if pat else None
tot=Counter();per=defaultdict(Counter)
for fn,(t,spans) in files.items():
    if pat and not fnmatch.fnmatch(fn,pat):continue
    for s0,s1 in spans:
        seg=t[s0:s1]
        for m in LIT.finditer(seg):
            s=m.group(1) or m.group(2) or m.group(3)
            if ' ' not in s:continue
            for n,r in RULES:
                if r.search(s):
                    tot[n]+=1;per[fn][n]+=1
                    if verbose:
                        line=t.count('\n',0,s0+m.start())+1;print(f'{fn}:{line} [{n}] {s[:220]}')
if not verbose:
    for fn in sorted(per,key=lambda k:-sum(per[k].values())):print(f'{fn:22s} {sum(per[fn].values()):4d}  '+' '.join(f'{k}={v}' for k,v in per[fn].most_common()))
print('TOTAL',sum(tot.values()),' '.join(f'{k}={v}' for k,v in tot.most_common()))
