/* Reading copy of kc100. Usage: node tools/k100_dump.js > docs/kc100_text.md */
const fs=require('fs'),path=require('path'),vm=require('vm');
const out=[];const P=s=>out.push(s);
const line=l=>{if(!l)return;const [w,t,lo]=l;if(w==='')P('*'+t+'*\n');else{P('**'+w+':** '+t+'\n');if(lo&&lo!==t)P('> text-speak tier: '+lo+'\n')}};
const ctx={S:{pov:'m',f:{},day:1},console,N:t=>['',t],K76V:t=>['V',t],K76MV:(a,b,c,d)=>['Misaki',d,a],sugOn:()=>true,extraEnding:()=>[],affectionMenu:()=>{},TOPICS_V:[],TOPICS_M:[]};
ctx.M2=(a,b)=>ctx.K76MV(a,a,b,b);vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/kc100.js'),'utf8')+';globalThis.__A=K100A;',ctx);
const ST=[['wary','Out of the infirmary: enemies under one roof'],['know','After the realisation: neither will do it, each is sure the other would'],['cold','After the corridor: apart'],['lov','After the boat: lovers'],['riv','After the boat: rivals']];
P('# Up close (kc100)\n');P('Reading copy of the enemies route’s own “Up close…” actions, which replace the Affection… menu after the early game. Notes: docs/notes_kc100.md. The first version plays the first time; the others on repeats. Misaki’s lines show the fuller tier.\n');
for(const [st,h] of ST){P('# '+h+'\n');for(const [w,wh] of [['v','Misaki, to V'],['m','V, to Misaki']]){P('## '+wh+'\n');ctx.__A[st][w].forEach(a=>{P('### '+a.t+'\n');a.V.forEach((f,i)=>{if(i)P('*(again)*\n');f().forEach(line)})})}}
console.log(out.join('\n'));
