"""Dump a module's player-facing text as Markdown for reading: python3 tools/text_dump.py src/kc64.js [more...] > out.md
Heuristic: headings at ids, then [speaker,'line'] pairs, MV tiers (top tier), option labels."""
import re,sys
SP={"'hitmeuppp'":'Misaki',"'K9'":'V','AN':'Angel','RN':'Ronin',"''":'',"'Hale'":'Hale'}
STR=r"(?:'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)"
def clean(s):return s[1:-1].replace("\\'","'").replace('\\n',' ')
def mv(expr):
    m=re.findall(STR,expr);return clean(m[-1]) if m else None
tok=re.compile(r"(?P<id>(?:\bid\s*:\s*|\b[A-Za-z0-9_]+\(\s*)'(?P<idv>[a-z][a-z0-9]*_[a-z0-9_]+)')|(?P<pair>\[\s*(?P<sp>'hitmeuppp'|'K9'|AN|RN|''|'Hale'|m\?'hitmeuppp':'K9'|me\?'hitmeuppp':'K9')\s*,\s*(?P<body>MV\((?:[^()]|\([^()]*\))*\)|"+STR+r"))|(?P<tern>\[\s*''\s*,\s*[A-Za-z0-9_.!()='&|]{1,40}\?\s*(?P<ta>"+STR+r")\s*:\s*(?P<tb>"+STR+r"))|(?P<hv>\bK\d+V\(\s*(?P<hvb>"+STR+r"))|(?P<hm>\bK\d+MV\((?P<hmb>(?:[^()]|\([^()]*\))*)\))|(?P<opt>\{\s*t\s*:\s*(?P<ot>"+STR+r"))|(?P<arr>(?:in|txt|q)\s*:\s*(?:\(\)\s*=>\s*)?\[(?P<ab>(?:\s*"+STR+r"\s*,?)+)\])")
for f in sys.argv[1:]:
    src=open(f).read();print('# '+f.split('/')[-1]+'\n')
    for m in tok.finditer(src):
        if m.group('id'):print('\n### '+m.group('idv').replace('_','\\_')+'\n');continue
        if m.group('pair'):
            sp=m.group('sp');who=SP.get(sp,'Misaki / V');b=m.group('body')
            t=mv(b) if b.startswith('MV') else clean(b)
            if not t or len(t)<2:continue
            print(f'*{t}*\n' if who=='' else f'**{who}:** {t}\n');continue
        if m.group('tern'):print(f"*{clean(m.group('ta'))}*\n\n*(or)* *{clean(m.group('tb'))}*\n");continue
        if m.group('hv'):print(f"**V:** {clean(m.group('hvb'))}\n");continue
        if m.group('hm'):
            t=mv('MV('+m.group('hmb')+')')
            if t:print(f'**Misaki:** {t}\n')
            continue
        if m.group('opt'):print(f'- ▸ {clean(m.group("ot"))}\n');continue
        if m.group('arr'):
            for s in re.findall(STR,m.group('ab')):print(f'> {clean(s)}\n')
