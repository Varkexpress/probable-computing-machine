/* Reading copy of kc95. Usage: node tools/k95_dump.js > docs/kc95_text.md
   Misaki's lines are shown at the top tier, with the text-speak tier beneath where it differs. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const out=[];const P=s=>out.push(s);
const line=l=>{if(!l)return;const [w,t,lo]=l;if(w==='')P('*'+t+'*\n');else{P('**'+w+':** '+t+'\n');if(lo&&lo!==t)P('> text-speak tier: '+lo+'\n')}};
const ctx={S:{pov:'m',f:{},day:1},console,N:t=>['',t],K76V:t=>['V',t],K76MV:(a,b,c,d)=>['Misaki',d,a],RN:'Ronin',AN:'Angel',
 say:(L,cb)=>{L.filter(Boolean).forEach(line);if(cb)cb()},ask:(me,hint,opts)=>{opts.forEach(o=>{P('**→ '+o.t+'**'+(o.sub?' ('+o.sub+')':'')+'\n');o.fn()})},
 K83E:{},extraEnding:()=>[],sideHub:()=>[],hub:()=>{},save:()=>{},go:()=>{},cutBg:x=>x,K94:()=>true};
ctx.M2=(a,b)=>ctx.K76MV(a,a,b,b);vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/kc95.js'),'utf8')+';globalThis.__K={K95_M,K95_V,K95_T};',ctx);
const K=ctx.__K,ST=[['war','The war, before the river'],['bed','The infirmary'],['up','Out of the infirmary, until the corridor'],['cold','Apart, after the corridor']];
P('# The quarrel (kc95)\n');P('Reading copy. Design notes: docs/notes_kc95.md. Second person is the point-of-view character.\n');
for(const [p,ph,A] of [['m','Misaki’s point of view',K.K95_M],['v','V’s point of view',K.K95_V]]){P('# '+ph+'\n');for(const [st,h] of ST){P('## '+h+'\n');A[st].forEach((fn,i)=>{P('### '+(i+1)+' · '+K.K95_T[p][st][i]+'\n');fn(()=>{})})}}
P('# A year on\n');
for(const k of ['pet','work','charges']){P('## '+ctx.K83E[k].t()+'\n');for(const [e,eh] of [['lov','lovers'],['riv','rivals']])for(const [m,mh] of [[true,'Misaki’s point of view'],[false,'V’s point of view']]){P('### '+eh+' · '+mh+'\n');ctx.K83E[k][e](m).forEach(line)}}
console.log(out.join('\n'));
