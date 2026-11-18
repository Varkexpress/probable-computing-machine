"""List dialogue strings that use contrast-reveal constructions ("X. It's not Y.", "Not X. Y.", "That's the point.").
Usage: python3 tools/aiscan.py > /tmp/ai.json"""
import re,glob,json,os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
h=open(ROOT+'/index.html',encoding='utf-8').read()
a=h.index('/* ===TD-BEGIN=== */');b=h.index('/* ===UI2-END=== */')
files={'index.html#pre':h[:a],'index.html#post':h[b:]}
for f in sorted(glob.glob(ROOT+'/src/*.js')):files['src/'+os.path.basename(f)]=open(f,encoding='utf-8').read()
PAT=re.compile("|".join([
 r"\b(?:It|That|This|He|She|They|I|You|We)(?:’s| is| was|’m| am|’re| are)? not [^.!?]{2,70}[.!?] (?:It|That|This|He|She|They|I|You|We)(?:’s| is| was|’m|’re| are)\b",
 r"(?:^|[.!?] )Not [^.!?]{2,60}[.!?] ",
 r"[Tt]hat(?:’s| is| was) the (?:whole )?(?:point|thing|trick|deal|part|difference|problem)\b",
 r"\bthe whole (?:thing|point|conversation|video|vow|reason|man|job|plan|message|deal)\b",
 r"[Bb]oth (?:things )?(?:are|is) (?:allowed to be )?true",
 r"which is (?:somehow )?(?:worse|how|so him)",
 r"(?:isn’t|is not|wasn’t|was not) (?:really )?about\b",
 r"\b(?:not just|isn’t just|is not just|not only)\b",
 r"[.!?] (?:He|She|You|They) (?:doesn’t|does not|don’t|do not|didn’t|did not) [^.!?]{2,50}[.!?] (?:He|She|You|They) (?:just )?\w",
 r"\b(?:isn’t|is not|wasn’t|was not|aren’t) [^.!?,]{2,40}[.!?] (?:It|That|This)(?:’s| is| was) ",
 r"Not because [^.]{2,60}\.",
 r"less like [^.]{2,40} (?:and )?more like",
]))
LIT=re.compile(r"'((?:[^'\\\n]|\\.){12,})'|`((?:[^`\\]|\\.){12,})`")
out=[];seen=set()
for name,txt in files.items():
    for m in LIT.finditer(txt):
        s=m.group(1) if m.group(1) is not None else m.group(2)
        if not PAT.search(s) or s in seen:continue
        if re.search(r"[{}=;]|=>|function|rect\(|\bc\.",s) and '${' not in s:continue
        seen.add(s);out.append({'f':name,'s':s})
print(json.dumps(out,ensure_ascii=False,indent=0))
