/* Reading copy for the player-opened infirmary pool (kc86–kc89), whose scenes are registered with k86(...).
   Usage: node tools/room_dump.js 86 > docs/kc86_text.md   (Misaki's lines show the fuller tier) */
const fs=require('fs'),path=require('path'),vm=require('vm');const n=process.argv[2];
const src=fs.readFileSync(path.join(__dirname,'..','src','kc'+n+'.js'),'utf8');
const out=[];const who={'':null,K9:'V',hitmeuppp:'Misaki',RN:'Ronin',AN:'Angel'};
const line=l=>{if(!l)return;const w=who[l[0]];out.push(w?`**${w}:** ${l[1]}`:`*${l[1]}*`);out.push('')};
const ctx={RN:'RN',AN:'AN',K76V:t=>['K9',t],K76MV:(...a)=>['hitmeuppp',a[a.length-1]],k80Gone:()=>false,S:{f:{}},K85S:[],
 k84No:(t,why)=>({t,dis:1,why}),k84Deny:()=>{},K85:()=>true,
 hub:()=>{},extraEnding:()=>[],morningEvent:()=>{},K100:()=>true,mbOk:()=>false,mbUse:()=>{},save:()=>{},apply:()=>{},k77Go:()=>{},k73Mark:()=>{},go:()=>{},cutBg:()=>({}),K73Who:()=>'',__m:true,k76M:()=>ctx.__m,k76H:(a,b)=>ctx.__m?a:b,k84SA:()=>true,K86:()=>true,K84_POOLS:{mc:[],v:[]},K90:()=>true,K91:()=>true,K92:()=>true,K93:()=>true,sideHub:()=>[],kdClar:()=>0,k85Room:undefined,
 ask:(w,hint,opts)=>{out.push(hint);out.push('');opts.forEach(o=>{out.push(o.dis?`- ▸ ~~${o.t}~~ (greyed: ${o.why||'they are not going to'})`:`- ▸ ${o.t}`);out.push('');if(!o.dis&&o.fn)o.fn()})},
 say:(L,cb)=>{L.filter(Boolean).forEach(line);if(cb)cb()}};
vm.createContext(ctx);
const helpers=n==='86'?'':fs.readFileSync(path.join(__dirname,'..','src','kc86.js'),'utf8').split('/* ===================================== MISAKI')[0]+(n==='89'||n==='88'||n==='90'||n==='91'||n==='92'||n==='93'||n==='94'?'\nconst k87Pick=(who,hint,no,why,yes,after)=>cb=>ask(who,hint,[k84No(no,why),{t:yes,fn:()=>{k84Deny();say(after.filter(Boolean),cb)}}]);':'');
vm.runInContext(helpers+'\n'+src+'\n;globalThis.__P=K85S;'+(n==='91'?'globalThis.__line=k91_line;globalThis.__dose=k91_dose;':'')+(n==='94'?'globalThis.__V=K94_V;globalThis.__M=K94_M;globalThis.__X=K94_X;':''),ctx);
const lab={m:'Misaki',v:'V'},md={sa:'full story',inj:'injuries only',null:'either setting'};
console.log(`# New text (kc${n})\n\nReading copy. Misaki's lines show the fuller tier; ▸ marks a choice, struck through where it is greyed. Design notes: docs/notes_kc86_88.md.\n`);
if(n==='90'){const run=(title,fn,m)=>{ctx.__m=m;out.length=0;try{fn(()=>{})}catch(e){out.push('(dump failed: '+e.message+')')}console.log(`### ${title}\n`);console.log(out.join('\n'))};
 run('Night I · Misaki',ctx.k90N1m,true);run('Night I · V',ctx.k90N1v,false);run('Night II · full story · Misaki',ctx.k90N2mSA,true);run('Night II · full story · V',ctx.k90N2vSA,false);
 run('Night II · injuries only · Misaki',ctx.k90N2mINJ,true);run('Night II · injuries only · V',ctx.k90N2vINJ,false);run('Night III · Misaki',ctx.k90N3m,true);run('Night III · V',ctx.k90N3v,false);
 run('The bucket (e2l_bucket) · Misaki',()=>ctx.k90Bucket(),true);run('The bucket (e2l_bucket) · V',()=>ctx.k90Bucket(),false);run('The steel table (e2l_table) · Misaki',()=>ctx.k90Table(),true);run('The steel table (e2l_table) · V',()=>ctx.k90Table(),false);console.log('\n## The pool\n')}
if(n==='91'){const run=(title,fn,m)=>{ctx.__m=m;out.length=0;try{fn(()=>{})}catch(e){out.push('(dump failed: '+e.message+')')}console.log(`### ${title}\n`);console.log(out.join('\n'))};
 run('The drip · Misaki (opens the stay)',ctx.__line,true);run('The drip · V (opens the stay)',ctx.__dose,false);run('The green book (e2l_green) · Misaki',()=>ctx.k91Green(),true);run('The green book (e2l_green) · V',()=>ctx.k91Green(),false);console.log('\n## The pool\n')}
if(n==='94'){const run=(title,fn,m)=>{ctx.__m=m;out.length=0;try{fn(()=>{})}catch(e){out.push('(dump failed: '+e.message+')')}console.log(`### ${title}\n`);console.log(out.join('\n'))};
 const VT=['the law','mercy','anger','the hands','a throat offered','the tidy book','once more'];ctx.__V.forEach((f,i)=>run('V · the thought, '+(i+1)+' · '+VT[i],f,false));
 const MT=['dead, and alive','over','the hatred'];ctx.__M.forEach((f,i)=>run('Misaki, cell · what you want · '+MT[i],f,true));
 const XT=['owing','the car park'];ctx.__X.forEach((f,i)=>run('Misaki, clear · what you want · '+XT[i],f,true));process.exit(0)}
ctx.__P.forEach(e=>{out.length=0;e.run(()=>{});console.log(`### ${e.t}  (${e.id} · ${lab[e.pov]} · ${md[e.mode]}${e.st?' · '+e.st:''})\n`);console.log(out.join('\n'))});
