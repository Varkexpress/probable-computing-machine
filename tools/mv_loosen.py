"""Misaki keeps some contractions even at the highest tier. This pass contracts the common pairs (I am, do not, it is…)
in the 4th variant of K7xMV(...) calls and changes nothing else: no rewording, and the 3rd variant is left alone.
Usage: python3 tools/mv_loosen.py src/kc76.js [...]   (rewrites in place, prints a count)"""
import re,sys
C=[(r"\bI am\b","I’m"),(r"\bI have (?=(?:been|got|had|never|only|just|seen|known|done|always|not)\b)","I’ve "),(r"\bI will\b","I’ll"),(r"\bI would\b","I’d"),
 (r"\b([Yy])ou are\b",r"\1ou’re"),(r"\b([Yy])ou have (?=(?:been|got|had|never|only|just|done|always|not)\b)",r"\1ou’ve "),(r"\b([Yy])ou will\b",r"\1ou’ll"),(r"\b([Yy])ou would\b",r"\1ou’d"),
 (r"\b([Hh])e is\b",r"\1e’s"),(r"\b([Hh])e has (?=(?:been|got|had|never|only|just|done|always|not|locked|waited)\b)",r"\1e’s "),(r"\b([Hh])e will\b",r"\1e’ll"),(r"\b([Hh])e would\b",r"\1e’d"),
 (r"\b([Ii])t is\b",r"\1t’s"),(r"\b([Tt])hat is\b",r"\1hat’s"),(r"\b([Tt])here is\b",r"\1here’s"),(r"\b([Ww])hat is\b",r"\1hat’s"),(r"\b([Ww])ho is\b",r"\1ho’s"),
 (r"\b([Dd])o not\b",r"\1on’t"),(r"\b([Dd])oes not\b",r"\1oesn’t"),(r"\b([Dd])id not\b",r"\1idn’t"),(r"\b([Cc])annot\b",r"\1an’t"),(r"\b([Cc])ould not\b",r"\1ouldn’t"),
 (r"\b([Ww])ould not\b",r"\1ouldn’t"),(r"\b([Ww])ill not\b",r"\1on’t"),(r"\b([Ii])s not\b",r"\1sn’t"),(r"\b([Aa])re not\b",r"\1ren’t"),(r"\b([Ww])as not\b",r"\1asn’t"),
 (r"\b([Hh])ave not\b",r"\1aven’t"),(r"\b([Hh])as not\b",r"\1asn’t"),(r"\bI’m not going to\b","I’m not gonna")]
FIX=[("I’ve not","I haven’t"),("you’ve not","you haven’t"),("You’ve not","You haven’t"),("he’s not ","he hasn’t ") if False else ("",""),("it’s what it’s","it is what it is"),("That’s all?","That’s all?")]
def loosen(t):
    for a,b in C:t=re.sub(a,b,t)
    t=t.replace("I’ve not ","I haven’t ").replace("ou’ve not ","ou haven’t ").replace("I’m not gonna","I’m not going to")
    t=re.sub(r"’(s|re|m|ve|ll|d)([.?!,;:)]|$)",lambda m:{"s":" is","re":" are","m":" am","ve":" have","ll":" will","d":" would"}[m.group(1)]+m.group(2),t)  # no dangling contraction at a clause end
    return t
PAT=re.compile(r"(K7\dMV\()'([^']*)','([^']*)','([^']*)','([^']*)'\)")
n=0
for f in sys.argv[1:]:
    s=open(f,encoding='utf-8').read()
    def rep(m):
        global n
        c,d=m.group(4),loosen(m.group(5))
        if c!=m.group(4) or d!=m.group(5):n+=1
        return "%s'%s','%s','%s','%s')"%(m.group(1),m.group(2),m.group(3),c,d)
    s2=PAT.sub(rep,s)
    open(f,'w',encoding='utf-8').write(s2)
print('lines loosened:',n)
