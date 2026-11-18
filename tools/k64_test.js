/* kc64: every beat, location event, option, thread, topic, spot and side option of "off hours", both POVs.
   Usage: node tools/k64_test.js [repo root]   (V=1 for verbose) */
const ROOT=process.argv[2]||require('path').resolve(__dirname,'..');
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+ROOT+'/index.html');await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
await p.evaluate(()=>{globalThis.KD_AUTO=1;document.querySelectorAll('.splash').forEach(e=>e.remove())});
const ev=(f,a)=>p.evaluate(f,a);let bad=0,runs=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
await ev(()=>{window.__drain=(pick,lines,opts)=>{let first=1;for(let k=0;k<60;k++){for(let i=0;i<400&&dlg;i++){try{const t=document.querySelector('.dlg');if(t)lines.push(t.textContent.slice(0,60))}catch(e){}adv()}
  if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt')];const en=os.filter(o=>!o.classList.contains('dis'));if(!en.length)break;opts.push(os.map(o=>(o.classList.contains('dis')?'×':'')+o.textContent.slice(0,28)).join(' / '));
   const o=os[Math.min(first?pick:0,os.length-1)];(o.classList.contains('dis')?en[0]:o).click();first=0;continue}if(!dlg)break}}});
const load=i=>ev(i=>{benchLoad(BENCH[i]);for(let k=0;k<80&&dlg;k++)adv();if(ctrl&&ctrl.close)try{ctrl.close()}catch(e){}},i);
const base='S.dark=0;S.lone=null;S.f.abroad=0;if(S.kd)S.kd.med=null;S.fr={a:60,r:60};S.aff=100;S.talks={};S.rom=null;S.vrom=null;S.f.k58End=null;S.done={};S.slot=0;';
/* run any code that takes a callback, drain it with the given first pick */
const run=(code,pick,setup)=>ev(([code,pick,setup])=>{const L=[],O=[];let d=0;try{(new Function(setup))();(new Function('cb',code))(()=>{d=1});__drain(pick,L,O)}catch(e){return {err:e.message+' '+(e.stack||'').split('\n')[1]}}return {d,n:L.length,o:O.length,first:L[0]}},[code,pick,setup]);
const R=async(label,code,pick,setup,check)=>{runs++;const r=await run(code,pick,setup);if(r.err)ok(0,label+' ERR '+r.err);else{ok(r.d,label+' not done '+JSON.stringify(r));if(check)ok(check(r),label+' check '+JSON.stringify(r))}if(process.env.V)console.log(label,JSON.stringify(r).slice(0,200));return r};

for(const [bi,pov,phase] of [[0,'m','normal'],[1,'v','normal'],[6,'m','epilogue'],[7,'v','epilogue']]){await load(bi);
 const st=base+`S.phase="${phase}";S.day=Math.max(S.day||0,9);S.day+=(3-S.day%3)%3;`;
 /* ---------- the gacha arc: every beat, both picks ---------- */
 const nG=await ev(()=>G64.length);ok(nG===8,'eight gacha beats '+nG);
 for(let i=0;i<nG;i++)for(const pick of [0,1]){
  const setup=st+`S.f.g64=${i};S.f.g64Last=-9;S.f.k64Day=0;S.f.g64End=null;`;
  const due=await ev(([setup,i])=>{(new Function(setup))();const b=g64Next();return b&&b.id===G64[i].id},[setup,i]);ok(due,`g64 due ${pov} ${phase} ${i}`);
  const r=await R(`g64 ${pov} ${phase} ${i} pick${pick}`,`G64[${i}].run(cb)`,pick,setup);
  if(i===7){const f=await ev(()=>S.f.g64End);ok(f===(pick?'keep':'limit'),'intervention flag '+f)}}
 /* gacha scheduler: a morning plays the next beat, not again tomorrow; the side menu offers it */
 const sch=await ev(st=>{(new Function(st))();S.f.g64=0;S.f.g64Last=-9;S.f.k64Day=0;S.f.mbN=0;S.f.mbDay=0;S.f.k64Side=0;G64.forEach(b=>S.seen[b.id]=0);E64.forEach(b=>S.seen[b.id]=1);const L=[],O=[];
  /* the kc64 scheduler wraps morningEvent last, so it runs first */
  let ran=0;morningEvent(()=>{ran=1});__drain(0,L,O);const a=S.f.g64;S.day++;S.done={};S.slot=1;const gap=!g64Next();S.day++;S.done={};const nx=k64Next();const o=sideHub(false).find(o=>nx&&o.t===nx.side);let side=0;if(o){o.fn();__drain(0,[],[]);side=S.f.g64}
  const again=!sideHub(false).some(o=>G64.concat(E64).some(b=>b.side===o.t)&&!o.dis);return {a,gap,side,again}},st);
 ok(sch.a===1&&sch.gap&&sch.side===2&&sch.again,'gacha scheduler '+pov+phase+JSON.stringify(sch));
 /* not while alone, dark or in the infirmary */
 const ex=await ev(st=>{(new Function(st))();S.f.g64=2;S.f.g64Last=-9;S.lone='v';const a=!!g64Next();S.lone=null;S.dark=1;const b=!!g64Next();S.dark=0;S.phase='after';const c=!!g64Next();return [a,b,c]},st);ok(!ex.some(Boolean),'gacha exclusions '+ex);
 /* pings */
 const pg=await ev(st=>{(new Function(st))();S.f.g64=3;const a=g64Ping();S.f.g64=8;const b=g64Ping();return [a,b]},st);ok(pg[0]===true&&pg[1]===false,'pings '+pg);
 /* ---------- epilogue days ---------- */
 const nE=await ev(()=>E64.length);
 for(let i=0;i<nE;i++)for(const pick of [0,1]){const id=await ev(i=>E64[i].id,i);
  const w=await ev(([st,i])=>{(new Function(st))();E64.forEach(b=>S.seen[b.id]=0);return E64[i].when()},[st,i]);ok(w,'e64 when '+id);
  await R(`${id} ${pov} ${phase} pick${pick}`,`E64[${i}].run(cb)`,pick,st)}
 const en=await ev(st=>{(new Function(st))();E64.forEach(b=>S.seen[b.id]=0);S.f.g64=8;S.f.k64Day=0;S.f.mbN=0;S.f.mbDay=0;const L=[],O=[];morningEvent(()=>{});__drain(0,L,O);return E64.filter(b=>S.seen[b.id]).length},st);
 ok(phase==='epilogue'?en===1:en===0,'epilogue scheduler '+pov+phase+' '+en);
 /* ---------- location events: every one, both picks where they ask ---------- */
 const L=await ev(()=>K64L.map(e=>e.id));
 for(const id of L)for(const pick of [0,1]){
  const setup=st+`S.f.g64=3;S.seen.c64_bed=1;S.f.k64LDay=0;S.seen["${id}"]=0;`;
  const w=await ev(([setup,id])=>{(new Function(setup))();const e=K64L.find(e=>e.id===id);const sv=[angWhere,ronWhere];return e.when()},[setup,id]);
  if(/^f64_/.test(id)&&phase==='normal'||!/^f64_/.test(id))ok(w,'loc when '+id+' '+pov+phase);
  await R(`loc ${id} ${pov} ${phase} pick${pick}`,`const e=K64L.find(e=>e.id==="${id}");l64Run(e,cb)`,pick,setup)}
 /* flirting gates: other routes, act II, "apart" */
 const fg=await ev(st=>{(new Function(st))();const a=fl64();S.rom='a';const b=fl64();S.rom=null;S.vrom='r';const c=fl64();S.vrom=null;S.f.k58End='apart';const d=fl64();S.f.k58End=null;S.phase='act2';const e=fl64();return [a,b,c,d,e]},st);
 ok(fg[0]&&!fg[1]&&!fg[2]&&!fg[3]&&!fg[4],'flirt gates '+fg);
 /* the trigger: every room offers its pool, the daily cap holds, and walking into a room really fires one */
 const tr=await ev(st=>{(new Function(st))();S.f.g64=3;S.seen.c64_bed=1;K64L.forEach(e=>S.seen[e.id]=0);S.f.k64LDay=0;const out={};K64ROOMS.forEach(r=>{out[r]=!!l64Try(r,true)});S.f.k64LDay=S.day;const cap=!l64Try('kennel');return {out,cap,wrapped:K64ROOMS.every(r=>typeof ROOMS[r].enter==='function')}},st);
 ok(tr.cap&&tr.wrapped,'trigger cap/wrap '+JSON.stringify(tr));ok(Object.values(tr.out).filter(Boolean).length>=10,'rooms with a pool '+JSON.stringify(tr.out));
 const walk=await ev(st=>{(new Function(st))();S.f.g64=3;K64L.forEach(e=>S.seen[e.id]=0);S.f.k64LDay=0;window.__rnd=Math.random;Math.random=()=>0.01;S.room='atrium';toRoom('kennel',[150,166]);Math.random=window.__rnd;return 1},st);
 /* whatever the room opens on arrival closes first; the scene waits for it */
 for(let t=0;t<3;t++){await p.waitForTimeout(1200);const busy=await ev(()=>{if(K64L.some(e=>S.seen[e.id]))return 0;let n=0;for(let i=0;i<200&&dlg;i++){adv();n++}if(ctrl&&ctrl.box){const o=ctrl.box.querySelector('.opt');if(o){o.click();n++}}return n});if(!busy)break}
 const wk=await ev(()=>{const fired=K64L.filter(e=>S.seen[e.id]).map(e=>e.id);const L=[],O=[];__drain(0,L,O);return {fired,n:L.length,room:S.room}});
 ok(wk.fired.length===1&&wk.n>0,'walk-in fires '+pov+phase+JSON.stringify(wk));
 /* ---------- the spot on the couch ---------- */
 for(const pick of [0,1]){const r=await ev(([st,pick])=>{(new Function(st))();S.f.g64=3;S.done={};const sp=ROOMS.atrium.spots.find(s=>s.label==='Angel’s phone, face down');for(let d=10;d<20;d++){S.day=d;if(sp.show())break}const sh=sp.show();if(!sh)return 'hidden day'+S.day;sp.act();const L=[],O=[];__drain(pick,L,O);return sh&&L.length>0&&O.length===1&&!sp.show()?'ok':'n'+L.length+' o'+O.length},[st,pick]);ok(r==='ok','phone spot '+pick+' '+r)}
 /* ---------- topics (from the lists the talk menu reads) ---------- */
 for(const [id,list,who,fl] of [['c64_t_why','M','v',0],['c64_t_teach','V','m',0],['c64_t_teach','V','m',1],['g64_t_angel','V','m',0]]){const r=await ev(([id,list,who,fl,st])=>{(new Function(st))();S.pov=who;S.seen.c64_bed=1;S.f.g64=5;S.phase=fl?'epilogue':'act2';const t=(list==='V'?TOPICS_V:TOPICS_M).find(t=>t.id===id);if(!t)return 'missing';const sh=t.show();let d=0;t.run(()=>{d=1});const L=[],O=[];__drain(0,L,O);const sh2=t.show();return sh&&d&&!sh2&&L.length>3?'ok':'show'+sh+' d'+d+' after'+sh2+' n'+L.length},[id,list,who,fl,st]);ok(r==='ok','topic '+id+fl+' '+r)}
 /* ---------- the couch, four times ---------- */
 const cs=await ev(st=>{(new Function(st))();S.seen.c64_bed=1;S.f.c64N=0;const out=[];for(let n=0;n<5;n++){S.done={};S.slot=1;const o=sideHub(false).find(o=>/integrals/i.test(o.t));if(!o){out.push('none');continue}const L=[],O=[];o.fn();__drain(0,L,O);out.push(L.length+':'+(L[0]||'').slice(0,12));if(n===0){const a=sideHub(false).find(o=>/integrals/i.test(o.t));out.push(a&&a.dis?'dis':'?')}}return out},st);
 ok(cs.length===6&&cs[1]==='dis'&&!cs.some(x=>x==='none'||/^0:/.test(x)),'couch '+cs.join('|'));
 const nc=await ev(st=>{(new Function(st))();['c64_bed','c64_env','c64_limits','c64_parab','c64_book','c64_skin','c64_hole'].forEach(k=>S.seen[k]=0);return sideHub(false).some(o=>/integrals/i.test(o.t))},st);ok(!nc,'couch needs a calculus scene first');
}
/* ---------- threads, every path ---------- */
await load(0);
const IDS=['tx_g64_3am','tx_g64_v','tx_g64_ron','tx_c64_ron','tx_c64_v'];
const thr=await ev(IDS=>{const out=[];const walk=(id,node)=>{const nd=TXS[id].nodes[node];const L=nd.in();if(!L.length)out.push('empty '+id);nd.opts().forEach((o,i)=>{if(o.ok&&!o.ok()){out.push(id+'/'+node+i+':gated');return}if(o.fx)o.fx();const rep=o.reply?o.reply():[];out.push(id+'/'+node+i+':'+rep.length);if(o.next)walk(id,o.next)})};
 IDS.forEach(id=>walk(id,'start'));return out},IDS);
if(process.env.V)console.log('threads',thr.join(' '));ok(!thr.some(x=>/gated|empty|:0$/.test(x))&&thr.length===30,'threads '+thr.length);
const tw=await ev(()=>{const r={};S.dark=0;S.lone=null;S.f.abroad=0;if(S.kd)S.kd.med=null;S.fr={a:60,r:60};S.phase='normal';S.day=9;S.f.g64=5;S.seen.c64_limits=1;S.seen.c64_bed=1;
 for(const id of ['tx_g64_3am','tx_g64_v','tx_g64_ron','tx_c64_ron','tx_c64_v'])r[id]=TXS[id].when();S.f.g64=8;r.off=!TXS.tx_g64_3am.when()&&!TXS.tx_g64_v.when()&&!TXS.tx_g64_ron.when();return r});
ok(Object.values(tw).every(Boolean),'thread whens '+JSON.stringify(tw));
for(const [bi,id,k] of [[0,'tx_g64_3am','a'],[1,'tx_g64_v','a'],[0,'tx_g64_ron','r'],[0,'tx_c64_ron','r'],[1,'tx_c64_v','m']]){await load(bi);const r=await ev(([id,k])=>{S.dark=0;S.lone=null;S.fr={a:60,r:60};S.phase='normal';S.day=9;S.f.g64=5;S.seen.c64_limits=1;S.seen.c64_bed=1;S.slot=0;const w=TXS[id].when();txStart(id);S.slot=3;phDeliver();PHONE.sel=k;
  let n=0;for(let g=0;g<3;g++){const t=dmTab();const o=t.opts.filter(o=>o.t.startsWith('↳'));if(!o.length)break;n+=o.length;o[0].fn();S.slot++;phDeliver();for(let i=0;i<50&&dlg;i++)adv()}if(ctrl&&ctrl.close)try{ctrl.close()}catch(e){}return [w,n,phS().run[id].done]},[id,k]);ok(r[0]&&r[1]>=2&&r[2],'phone '+id+JSON.stringify(r))}
/* ---------- ending lines ---------- */
await load(6);
const el=await ev(()=>{S.f.g64End='limit';S.f.c64Book=1;const a=extraEnding().filter(x=>/12:01|FOR FUN/.test(x)).length;S.f.g64End='keep';const b=extraEnding().some(x=>/bell made of teeth/.test(x));S.f.g64End=null;S.f.c64Book=0;const c=extraEnding().some(x=>/12:01|FOR FUN|teeth/.test(x));return [a,b,c]});
ok(el[0]===2&&el[1]&&!el[2],'ending lines '+el);
/* ---------- text rules: V does not contract; hounds unnamed; no yen ---------- */
const tx=await ev(()=>{const src=[...document.scripts].map(s=>s.textContent).join('\n');const a=src.indexOf('OFF HOURS (kc64)');const z=src.indexOf('/* ---------- ending lines ---------- */',a);const s=src.slice(a,z);
 const vl=[...s.matchAll(/\['K9','([^']*)'\]/g)].map(m=>m[1]).filter(t=>/n’t\b|’(re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|who|here|this)’s\b/i.test(t));
 return {vl,names:/Biscuit|Sergeant|Mochi|Pancake/.test(s.replace(/cols=\{[^}]*\}/,'')),yen:/yen|¥|Japan/.test(s)}});
ok(!tx.vl.length,'V contractions '+tx.vl.join(' | '));ok(!tx.names&&!tx.yen,'names/yen '+JSON.stringify(tx));
console.log(`k64: ${runs} runs, ${bad} failures, ${errs.length} page errors`);errs.slice(0,5).forEach(e=>console.log('  ',e));
await b.close();process.exit(bad||errs.length?1:0)})();
