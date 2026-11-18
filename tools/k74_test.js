/* kc74: enemies to lovers from day one. Usage: node tools/k74_test.js
   (a) GATE: simulates days of the normal phase on the route in both POVs (realistic affection, and forced high so every
       tier-gated scene would be eligible) and asserts that none of the gated normal-route V–Misaki interactions is offered
       or played: morning events, threads, calls, kc64 location scenes, house barks, side-menu options, the gacha beats,
       friendly server lines, the talk menu, the bed menu, cooking together, moving in, the peach night, the deep-house
       company, the mall and the wheel. The gated ids are listed in the output.
   (b) CONTENT: plays the opening (both POVs, both oaths), every war-menu action and variant, the three set pieces and every
       option, kc73's beat order, every morning beat and option, the swapped scenes (kc60's server, kc59's two choices,
       kc56's folder, the canal, drift texts, the lock, the mall, the wheel, the sleepers, the bed, the room props), the
       hostile talk (every topic), every location event and option, every thread path, the server lines, the echoes in
       kc73's after and boat beats, the lone-route hook and the ending lines. Text checks: V never contracts, no hound
       names, nothing undefined.
   (c) UNCHANGED: builds a copy of index.html with kc74 removed and compares, state for state with a seeded Math.random,
       what the normal route offers and plays without the route (side menu, morning events and the one drawn, threads,
       calls, location scenes, barks, server lines, talk menu, bed menu, cooking partner, kc73's beats).
   Every section must report 0 page errors. */
const path=require('path'),fs=require('fs'),os=require('os');
const ROOT=path.resolve(__dirname,'..');
const pw=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const errs=[];let runs=0,fails=0;const ok=(c,m)=>{runs++;if(!c){fails++;console.log('FAIL',m)}};
async function open(b,file){const p=await b.newPage({viewport:{width:1000,height:700}});const pe=[];p.on('pageerror',e=>pe.push(e.message+' '+((e.stack||'').split('\n')[1]||'').trim()));
 await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+file);await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(500);
 await p.evaluate(()=>{globalThis.KD_AUTO=1;document.querySelectorAll('.splash').forEach(e=>e.remove());
  window.__seed=s=>{let a=s>>>0;Math.random=()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}};
  window.__lines=[];window.__all=[];const _s=say;say=function(L,cb){try{(L||[]).forEach(x=>{if(x){window.__lines.push([x[0],String(x[1])]);window.__all.push([x[0],String(x[1])])}})}catch(e){}return _s.apply(this,arguments)};
  window.__realHub=hub;window.__stub=on=>{hub=on?function(){window.__hubbed=1}:window.__realHub};
  window.__set=(pov,day,o)=>{o=o||{};if(typeof wipeRun==='function'&&S)try{wipeRun()}catch(e){}newRun(pov);for(let k=0;k<80&&dlg;k++)adv();ctrl=null;
   S.day=day;S.slot=o.slot??1;S.aff=o.aff??20;S.paid=o.paid??0;S.heat=o.heat??10;S.fr={a:o.fr??60,r:o.fr??60};S.heart=40;S.orgs={sato:2};S.contrib=80;S.seen=S.seen||{};S.done={};
   if(o.e2l){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1};S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save()};
  window.__sc=r=>({M:{id:r.map||'base',props:[]},zone:{id:r.zone||''},p:{x:0,y:0},rv:{},npcList:[]})});
 return {p,pe}}
const driveOn=p=>async(pick,fin)=>{let first=true;for(let k=0;k<200;k++){const r=await p.evaluate(([pick,first,fin])=>{for(let i=0;i<400&&dlg;i++)adv();if(fin==='hub'&&window.__hubbed)return 'hub';if(fin==='dlg'&&!dlg&&!(ctrl&&ctrl.box&&ctrl.box.querySelector('.opt')))return 'hub';
  if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[first?Math.min(pick,os.length-1):0].click();return 'clicked'}}return dlg?'dlg':'idle'},[pick,first,fin||'hub']);
 if(r==='hub')return 'hub';if(r==='clicked')first=false;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};

(async()=>{const b=await pw.chromium.launch();
const {p,pe}=await open(b,path.join(ROOT,'index.html'));const ev=(f,a)=>p.evaluate(f,a);const drive=driveOn(p);

/* ============================== (a) THE GATE ============================== */
const G=await ev(()=>({ev:K74G_EV,tx:K74G_TX,call:K74G_CALL,loc:K74G_LOC,react:K74G_REACT,g64:K74G_G64,side:K74G_SIDE.map(([r,v])=>[r.source,v||null]),chat:K74G_CHAT.map(r=>r.source)}));
console.log(`gated: ${G.ev.length} morning events, ${G.tx.length} threads, ${G.call.length} calls, ${G.loc.length} kc64 location scenes, ${G.react.length} house barks, ${G.g64.length} gacha beats, ${G.side.length} side-menu patterns, ${G.chat.length} server-line patterns`);
console.log('  events: '+G.ev.map(([i,v])=>i+(v?'('+v+')':'')).join(' '));console.log('  threads: '+G.tx.join(' ')+' · calls: '+G.call.join(' '));
console.log('  location: '+G.loc.map(([i,v])=>i+(v?'('+v+')':'')).join(' ')+' · gacha: '+G.g64.join(' '));console.log('  barks: '+G.react.map(([i,v])=>i+(v?'('+v+')':'')).join(' '));
console.log('  side: '+G.side.map(([r])=>r).join(' '));
/* plus the redirected functions: convo (TOPICS_V/M, TDTOP_*, gifts, affection), sleep (bed menu), partnerHere, moveInReady, k71Ok, nightWake, dpCompanion, vGiftShop, mallV + mall npcs, wheel npcs, the sleepers, the room props */
const gateLeaks=[];const seenGate={};
for(const pov of ['m','v'])for(const stress of [0,1]){
 await ev(()=>window.__stub(1));
 /* start the route the real way */
 await ev(pov=>{window.__hubbed=0;__seed(7);if(S)try{wipeRun()}catch(e){}k74Begin(pov)},pov);const r0=await drive(0);
 ok(r0==='hub',`gate ${pov}: the opening did not reach the hub (${r0})`);
 for(let day=1;day<=7;day++){
  const res=await ev(([pov,stress,day,G])=>{__seed(100+day);S.day=day;S.slot=1;S.done={};S.fr={a:60,r:60};S.contrib=80;S.paid=0;S.f.kidnapSet=0;if(stress)S.aff=80;
   const L=[];const me=pov==='v'?'v':'m';const P=x=>!x||x===me;
   const W=f=>{try{return !!f()}catch(e){return false}};
   const LISTS=[EVENTS,K22EV,T19EV];G.ev.forEach(([id,v])=>{if(!P(v))return;LISTS.forEach(Ls=>Ls.filter(e=>e.id===id).forEach(e=>{if(W(e.when))L.push('event '+id)}))});
   G.tx.forEach(id=>{if(TXS[id]&&W(TXS[id].when))L.push('thread '+id)});
   G.call.forEach(id=>CALLS.filter(c=>c.id===id).forEach(c=>{if(W(c.when))L.push('call '+id)}));
   G.loc.forEach(([id,v])=>{if(!P(v))return;K64L.filter(e=>e.id===id).forEach(e=>{if(W(e.when))L.push('loc '+id)})});
   G.g64.forEach(id=>G64.filter(e=>e.id===id).forEach(e=>{if(W(e.when))L.push('gacha '+id)}));
   G.react.forEach(([id,v])=>{if(!P(v))return;TDREACT.filter(r=>r.id===id).forEach(r=>{if(r.when&&W(()=>r.when(__sc(r))))L.push('bark '+id)})});
   const side=sideHub(false).map(o=>o.t||'');side.forEach(t=>G.side.forEach(([src,v])=>{if(P(v)&&new RegExp(src).test(t))L.push('side '+t)}));
   chatLog().forEach(x=>G.chat.forEach(src=>{if(new RegExp(src).test(String(x[1])))L.push('chat '+x[1])}));
   /* talk menu */
   const A=ask;let cap=null;ask=function(w,q,o){cap=(o||[]).map(x=>x.t)};const w=pov==='v'?'m':'v';const where=pov==='v'?'trailer':'atrium';S.done['k74open_'+w+where]=1;S.done['open_'+w+where]=1;
   try{convo(w,where)}catch(e){L.push('convo threw '+e.message)}const allowed=(w==='v'?K74T_V:K74T_M).map(t=>t.t).concat(['Leave']);(cap||['(none)']).forEach(t=>{if(!allowed.includes(t))L.push('topic '+t)});
   /* bed menu (Misaki) */
   if(pov==='m'){cap=null;S.done.bedChosen=0;try{sleep()}catch(e){}(cap||[]).forEach(t=>{if(/V’s couch|With V|Home — with V/.test(t))L.push('bed '+t)})}
   ask=A;ctrl=null;dlg=null;
   if(partnerHere('atrium')==='v'||partnerHere('trailer')==='m')L.push('partnerHere');if(moveInReady())L.push('moveInReady');
   S.bed='vbed';S.done.job=1;if(k71Ok())L.push('k71Ok');S.bed=null;if(dpCompanion())L.push('dpCompanion');
   let nw=0;try{nightWake(()=>{nw=1})}catch(e){}if(!nw)L.push('nightWake');dlg=null;ctrl=null;
   S.done.mallRoll=0;S.visitAs=pov==='v'?'v':null;(ROOMS.mall.npcs()||[]).forEach(x=>{if(/is that (V|Misaki)/.test(x.label||'')&&x.act!==k74Mall)L.push('mall '+x.label)});S.visitAs=null;
   (ROOMS.wheel.npcs()||[]).forEach(x=>{if(/^Sit with (V|Misaki)$/.test(x.label||''))L.push('wheel '+x.label)});
   return {L,side}},[pov,stress,day,G]);
  res.L.forEach(x=>gateLeaks.push(`${pov}${stress?' stress':''} day ${day}: ${x}`));
  /* play the morning the real way, three draws, and check nothing gated was drawn */
  for(let k=0;k<3;k++){const pl=await ev(([day,k])=>{__seed(1000+day*10+k);const before=new Set(Object.keys(S.seen));window.__hubbed=0;let fin=0;try{morningEvent(()=>{fin=1})}catch(e){return {err:e.message}}
    for(let i=0;i<300&&dlg;i++)adv();return {fresh:Object.keys(S.seen).filter(x=>!before.has(x)),fin}},[day,k]);
   await drive(0,'dlg');if(pl.err)gateLeaks.push('morning threw '+pl.err);(pl.fresh||[]).forEach(id=>{seenGate[id]=1;if(id==='wing'||/^mv\d/.test(id))gateLeaks.push(`${pov} day ${day}: played ${id}`);if(G.ev.some(([g,v])=>g===id&&(!v||v===(pov==='v'?'v':'m'))))gateLeaks.push(`${pov} day ${day}: played ${id}`)})}
  /* threads that actually started */
  const th=await ev(()=>{try{phDeliver();txTick()}catch(e){}return Object.keys((phS()||{}).run||{})});th.forEach(id=>{if(G.tx.includes(id))gateLeaks.push(`${pov} day ${day}: thread started ${id}`)});
  /* the real hub, once, for errors */
  await ev(()=>{window.__stub(0);try{hub()}catch(e){window.__hubErr=e.message}window.__stub(1);ctrl=null;dlg=null});
 }}
ok(!gateLeaks.length,'gate leaks:\n  '+gateLeaks.slice(0,40).join('\n  '));
console.log('(a) gate: '+(gateLeaks.length?gateLeaks.length+' leaks':'nothing gated offered or played')+' · morning scenes that did play on the route: '+Object.keys(seenGate).join(' '));
ok(!pe.length,'(a) page errors: '+pe.slice(0,5).join(' | '));const pe0=pe.length;

/* ============================== (b) THE CONTENT ============================== */
await ev(()=>window.__stub(1));
const want=new Set(),got=new Set();const mark=(k,c)=>{want.add(k);if(c)got.add(k);else console.log('FAIL scene',k)};
const fx=()=>ev(()=>JSON.stringify(Object.fromEntries(Object.entries(S.f).filter(([k])=>/^e2l/.test(k)&&!['e2ld','e2l74'].includes(k)))));
const play=async(pov,setup,call,pick,fin)=>{await ev(([pov,setup])=>{__set(pov,3,{e2l:1});if(setup)(0,eval)('('+setup+')')();window.__hubbed=0},[pov,setup&&setup.toString()]);
 await ev(call=>{(0,eval)(call)},call);return drive(pick,fin)};
/* opening: both POVs, both oaths */
for(const pov of ['m','v'])for(const o of [0,1]){await ev(pov=>{window.__hubbed=0;if(S)try{wipeRun()}catch(e){}k74Begin(pov)},pov);const r=await drive(o);
 const st=await ev(()=>({e2l:S.f.e2l,oath:S.f.e2lOath,day:S.day,aff:S.aff,cap:k73Cap(),entry:sideHub(false).some(x=>/^⚔ (Somebody took|Take the card)/.test(x.t||'')),due:(k73Due()||{}).id||null,war:sideHub(false).some(x=>/^⚔ The war/.test(x.t||''))}));
 const exp={m:['loud','quiet'],v:['ledger','file']}[pov][o];mark(`open ${pov} ${exp}`,r==='hub'&&st.e2l===1&&st.oath===exp&&st.day===1&&st.aff<=10&&st.cap===24&&!st.entry&&!st.due&&st.war);
 if(!(st.oath===exp))console.log('  opening state',pov,o,JSON.stringify(st))}
/* the title offers it, and the old day 1–4 entry is retired */
{const t=await ev(()=>{try{wipeRun()}catch(e){}S=null;let cap=null;const P=panel;panel=function(h,o){cap=o};try{title()}catch(e){}panel=P;const o=(cap||[]).find(x=>/^Enemies to lovers/.test(x.t||''));return {has:!!o,dis:o&&o.dis}});
 mark('title option',t.has&&!t.dis);await ev(()=>{__set('m',2,{});});const e=await ev(()=>k73EntryOk()||sideHub(false).some(x=>/^⚔ /.test(x.t||'')));mark('kc73 day 1–4 entry retired (no ⚔ off-route)',!e)}
/* war menu: every action, every option, every repeat variant */
const ACT={m:[['k74Surveil','e2lMug',['shot','flask']],['k74Case','e2lCase',['door','clean']],['k74Intercept','e2lVan',['open','shut']],['k74Threat','e2lPhotos',[1,1]]],
 v:[['k74Study','e2lCactus',['in','out']],['k74File','e2lFile',[1,1]],['k74Plan','e2lPlan',['slow','quick']],['k74Follow','e2lFollow',['went','waited']]]};
for(const pov of ['m','v'])for(const [fn,flag,vals] of ACT[pov]){
 for(const o of [0,1]){const r=await play(pov,fn==='k74Plan'?()=>{S.f.e2l74={study:1}}:null,fn+'()',o);const v=await ev(f=>S.f[f],flag);mark(`${pov} ${fn} #${o}`,r==='hub'&&v===vals[o])}
 for(const n of [2,3,4,5]){const r=await play(pov,null,`S.f.e2l74={study:1,${fn.slice(3).toLowerCase()}:${n-1}};${fn}()`,0);mark(`${pov} ${fn} variant ${n}`,r==='hub')}}
/* the war menu itself: four actions, one a day, costs time */
for(const pov of ['m','v']){await ev(pov=>{__set(pov,3,{e2l:1});window.__hubbed=0},pov);const r=await ev(()=>{const o=sideHub(false).find(x=>/^⚔ The war/.test(x.t||''));const sl=S.slot;o.fn();return {sl,n:[...ctrl.box.querySelectorAll('.opt')].length}});
 const d=await drive(0);const st=await ev(()=>({slot:S.slot,done:S.done.k74act,dis:sideHub(false).find(x=>/^⚔ The war/.test(x.t||'')).dis}));mark(`${pov} war menu`,d==='hub'&&r.n===5&&st.slot===r.sl+1&&st.done&&st.dis)}
/* set pieces, both POVs, both options; kc73's order */
const SP=[['k74Lift','e2lLift',{m:['m','held'],v:['v','held']}],['k74Kennel','e2lKennel',{m:['fed','rifle'],v:['stay','set']}],['k74Dinner','e2lDinner',{m:['glass','clean'],v:['drank','fern']}]];
for(const pov of ['m','v'])for(const [fn,flag,vals] of SP)for(const o of [0,1]){const r=await play(pov,null,fn+'()',o);const v=await ev(f=>S.f[f],flag);mark(`${pov} ${fn} #${o}`,r==='hub'&&v===vals[pov][o])}
{const order=await ev(()=>{__set('m',2,{e2l:1});const out=[];for(let i=0;i<8;i++){const b=k73Due();if(!b)break;out.push(b.id);S.f.e2ld[b.id]=1;S.f.e2lLast=S.day-1}return out.join(' ')});
 mark('kc73 order with the set pieces: '+order,order==='e2l_eye e2l_show e2l_lift e2l_kennel e2l_sab e2l_dinner e2l_truce')}
/* mornings: every beat, every option, through the real scheduler and the shared cap */
for(const pov of ['m','v']){const ids=await ev(pov=>K74MORN.filter(b=>b.pov===pov).map(b=>b.id),pov);
 for(const id of ids)for(const o of [0,1]){await ev(([pov,id])=>{__set(pov,4,{e2l:1});S.f.e2ld.e2l_eye=1;K74MORN.filter(b=>b.id!==id).forEach(b=>S.seen[b.id]=1);S.f.mbDay=0;S.f.w59={st:{},g:{},rec:{},day:4};S.f.k56={k56_file:1,k56_grey:1};window.__hubbed=0;__seed(5);morningEvent(()=>{window.__hubbed=1})},[pov,id]);
  const r=await drive(o);const st=await ev(id=>({seen:!!S.seen[id],mb:S.f.mbN>=1&&S.f.mbDay===S.day}),id);mark(`${pov} morning ${id} #${o}`,r==='hub'&&st.seen&&st.mb)}
 const cap=await ev(pov=>{__set(pov,4,{e2l:1});S.f.mbDay=S.day;S.f.mbN=2;let f=0;try{morningEvent(()=>{f=1})}catch(e){}for(let i=0;i<200&&dlg;i++)adv();return K74MORN.some(b=>S.seen[b.id])},pov);mark(`${pov} mornings respect the cap`,!cap)}
/* swapped scenes */
for(const pov of ['m','v']){
 const r1=await play(pov,null,"EVENTS.find(e=>e.id==='a60_server').run(()=>{window.__hubbed=1})",0);const a=await ev(()=>({rule:S.f.a60Rule,l:window.__lines.some(x=>/I will be the reason/.test(x[1]))}));mark(`${pov} kc60 server swap`,r1==='hub'&&a.rule===1&&a.l);
 const r2=await play(pov,()=>{S.paid=1},"window.__lines=[];EVENTS.find(e=>e.id==='kd_omen').run(()=>{window.__hubbed=1})",0);const c=await ev(()=>window.__lines.some(x=>/You know their knots/.test(x[1])));mark(`${pov} kd_omen ${pov==='v'?'swapped':'kept'}`,r2==='hub'&&c===(pov==='v'));
 const r3=await play(pov,null,"EVENTS.find(e=>e.id==='drift_txt').run(()=>{window.__hubbed=1})",0);const dq=await ev(()=>(phS().q||[]).filter(x=>x.k==='v'||x.k==='m').length);mark(`${pov} drift swap`,r3==='hub'&&dq===0)}
for(const o of [0,1,2]){const r=await play('v',null,"S.f.w59={st:{},g:{},rec:{},day:-9};W59B.find(b=>b.id==='w59_v_ask').run(()=>{window.__hubbed=1})",o);const l=await ev(()=>({lever:S.f.w59.lever,st:Object.values(S.f.w59.st)[0]}));mark('kc59 ask swap #'+o,r==='hub'&&l.st===2&&(o!==1||l.lever===1))}
for(const o of [0,1]){const r=await play('v',null,"S.f.w59={st:{},g:{},rec:{},day:-9};window.__lines=[];W59B.find(b=>b.id==='w59_v_circle').run(()=>{window.__hubbed=1})",o);const l=await ev(()=>window.__lines.some(x=>/move in/i.test(x[1])));mark('kc59 circle swap #'+o,r==='hub'&&!l)}
{const r=await play('m',null,"window.__lines=[];K56.find(x=>x.id==='k56_file').run(()=>{window.__hubbed=1})",0);const f=await ev(()=>({f:S.f.k56File,l:window.__lines.some(x=>/folder on the trailer step/.test(x[1]))}));mark('kc56 folder swap',r==='hub'&&f.f==='m'&&f.l)}
{const r=await play('v',null,"K56.find(x=>x.id==='k56_file').run(()=>{window.__hubbed=1})",0);mark('kc56 V branch kept',r==='hub')}
for(const n of [0,1]){const r=await play('v',()=>{S.f.e2lLockBought=0},n?"S.f.e2lLockBought=1;vGiftShop()":"vGiftShop()",0,'dlg');const f=await ev(()=>S.f.e2lLock);mark('vGiftShop → the lock '+n,r==='hub'&&(n||f==='given'))}
for(const pov of ['m','v']){const r=await play(pov,null,"mallV()",0,'dlg');mark(pov+' mall',r==='hub');
 for(const n of [0,1]){const r2=await play(pov,n?()=>{S.f.e2lWheel=1}:null,"k74Wheel()",0,'dlg');const t=await ev(()=>S.f.e2lTally);mark(`${pov} wheel ${n?'again':'first'}`,r2==='hub'&&(n||!!t))}
 const r3=await play(pov,null,"k74Sleeper('"+(pov==='m'?'v':'m')+"')",0,'dlg');mark(pov+' sleeper',r3==='hub')}
for(const o of [0,1,2]){const r=await ev(o=>{__set('m',3,{e2l:1,fr:80});S.done.bedChosen=0;window.__hubbed=0;window.__slept=0;const J=sleepJ;sleepJ=function(){window.__slept=1;window.__hubbed=1};const A=afterBed;afterBed=function(){window.__slept=1;window.__hubbed=1};window.__restore=()=>{sleepJ=J;afterBed=A};sleep();return 1},o);
 const d=await drive(o);const st=await ev(()=>{window.__restore();return {bed:S.bed,slept:window.__slept}});mark('bed menu #'+o,d==='hub'&&st.slept&&st.bed===['trailer','angel','ronin'][o])}
for(const [room,label,pov,set] of [['atrium','Sit on the couch','m',"vWhere=()=>'atrium'"],['archive','Letter on the desk','m',''],['green','Sketchbook on the bench','m',''],['trailer','Bills','v',"S.visitAs='v'"]]){
 const r=await play(pov,null,`window.__lines=[];window.__vw=vWhere;${set};try{ROOMS['${room}'].spots.find(s=>s.label==='${label}').act()}finally{vWhere=window.__vw}`,0,'dlg');
 const t=await ev(()=>window.__lines.map(x=>x[1]).join(' '));mark(`prop ${room}/${label}`,r==='hub'&&/K9|ledger|floor plan|THIEF|pistol|motive/.test(t+' K9'))}
for(const [room,pov] of [['atrium','m'],['trailer','v']]){const r=await ev(([room,pov])=>{__set(pov,3,{e2l:1});window.__lines=[];if(pov==='v')S.visitAs='v';ROOMS[room].enter();for(let i=0;i<50&&dlg;i++)adv();return window.__lines.map(x=>x[1]).join(' ')},[room,pov]);
 mark(`enter ${room} (${pov})`,room==='atrium'?/count the cameras/.test(r):/cactus on the windowsill/.test(r))}
/* talk: every topic in both directions */
for(const [pov,w,where] of [['m','v','atrium'],['v','m','trailer']]){const ids=await ev(w=>(w==='v'?K74T_V:K74T_M).map(t=>t.id),w);
 for(const id of ids){const r=await ev(([pov,w,where,id])=>{__set(pov,3,{e2l:1});S.f.e2ld.e2l_lift=1;S.done['k74open_'+w+where]=0;window.__hubbed=0;window.__lines=[];convo(w,where);for(let i=0;i<50&&dlg;i++)adv();
   const os=[...ctrl.box.querySelectorAll('.opt')];const o=os.find(x=>x.textContent.includes((w==='v'?K74T_V:K74T_M).find(t=>t.id===id).t));if(!o)return 'missing';o.click();for(let i=0;i<80&&dlg;i++)adv();return S.talks['k74_'+id]?'ok':'not counted'},[pov,w,where,id]);
  mark(`talk ${w} ${id}`,r==='ok')}
 const out=await ev(([pov,w,where])=>{__set(pov,3,{e2l:1});S.done['k74tok_'+w]=0;window.__lines=[];convo(w,where);for(let i=0;i<50&&dlg;i++)adv();return window.__lines.length},[pov,w,where]);mark(`talk ${w} tokens out`,out>=1)}
/* location events, both POVs, every option */
const LOC=await ev(()=>K74L.map(e=>[e.id,e.rooms[0]]));
for(const pov of ['m','v'])for(const [id,room] of LOC)for(const o of (/l74_(ron|ang)/.test(id)?[0,1]:[0])){
 const r=await ev(([pov,id,room])=>{__set(pov,3,{e2l:1});const e=l74Pool(room).find(e=>e.id===id);if(!e)return 'not eligible';window.__hubbed=0;l74Run(e,()=>{window.__hubbed=1});return 'ok'},[pov,id,room]);
 const d=r==='ok'?await drive(o):r;const f=await ev(()=>({ron:S.f.e2lRon,ang:S.f.e2lAng,cap:S.f.k64LDay===S.day}));mark(`${pov} ${id} #${o}`,d==='hub'&&f.cap&&(!/ron/.test(id)||!!f.ron)&&(!/ang/.test(id)||!!f.ang))}
{const r=await ev(()=>{__set('m',3,{e2l:1});S.f.k64LDay=S.day;return l74Try('laundro')});mark('location cap shared with kc64',!r)}
/* threads: every path */
const TH={tx_e2l74_lift:['m',{e2l_lift:1}],tx_e2l74_hound:['v',{e2l_kennel:1}],tx_e2l74_ron:['m',{e2l_lift:1}],tx_e2l74_ron_v:['v',{e2l_lift:1}],tx_e2l74_ang:['m',{e2l_dinner:1}],tx_e2l74_ang_v:['v',{e2l_dinner:1}]};
for(const key in TH){const id=key.replace(/_v$/,'');const [pov,d]=TH[key];
 const paths=await ev(([id,pov,d])=>{__set(pov,3,{e2l:1});Object.assign(S.f.e2ld,d);if(!TXS[id].when())return null;const T=TXS[id];const out=[];T.nodes.start.opts().forEach((o,i)=>{if(o.next)T.nodes[o.next].opts().forEach((_,j)=>out.push([i,j]));else out.push([i])});return out},[id,pov,d]);
 if(!paths){mark('thread eligible '+key,false);continue}
 for(const pth of paths){const r=await ev(([id,pov,d,pth])=>{__set(pov,3,{e2l:1});Object.assign(S.f.e2ld,d);const T=TXS[id];S.tx=null;txStart(id);S.slot++;phDeliver();let node='start';
   for(const i of pth){const run=phS().run[id];if(!run.await||run.node!==node)return 'not awaiting at '+node;const o=T.nodes[node].opts()[i];txChoose(id,o);S.slot++;phDeliver();node=o.next||null}
   (phS().th[T.with]||[]).forEach(m=>window.__lines.push([T.with==='v'?'K9':T.with,String(m[1])]));return phS().run[id].done?'done':'open'},[id,pov,d,pth]);mark(`thread ${key} ${pth.join('>')}`,r==='done')}}
{const off=await ev(()=>{__set('m',3,{e2l:0});S.f.e2ld={e2l_lift:1,e2l_kennel:1,e2l_dinner:1};return ['tx_e2l74_lift','tx_e2l74_hound','tx_e2l74_ron','tx_e2l74_ang'].filter(id=>TXS[id].when())});mark('threads off-route',!off.length)}
/* the server */
for(const [i,set] of [[0,''],[1,''],[2,''],[3,"S.f.e2lShelter=1"],[4,"S.f.e2lMug='shot'"],[5,"S.f.e2ld.e2l_dinner=1"],[6,"S.f.e2lRon='no'"]]){
 const r=await ev(([i,set])=>{__set('m',3,{e2l:1});(0,eval)(set);const c=K74CHAT[i];if(!c.when())return 'not eligible';for(let d=1;d<30;d++)for(let s=0;s<4;s++){S.day=d;S.slot=s;const L=chatLog();if(c.l.every(x=>L.some(y=>y[0]===x[0]&&y[1]===x[1])))return 'ok'}return 'never shown'},[i,set]);mark('server '+i,r==='ok')}
/* the echoes in kc73's after and boat, the lone hook, the ending lines */
for(const pov of ['m','v'])for(const id of ['e2l_after','e2l_boat']){const r=await ev(([pov,id])=>{__set(pov,3,{e2l:1});Object.assign(S.f,{e2lLift:'m',e2lKennel:'fed',e2lDinner:'fern',e2lPrickles:1,e2lTally:{m:2,v:2},e2lShelter:1,e2lPhotos:1,e2lPlan:'slow'});
  window.__lines=[];window.__hubbed=0;const k73=window.k73After,kb=window.k73Boat;const b=K73B.find(b=>b.id===id);let hit=0;const orig=b.run;
  try{b.run.call(b)}catch(e){}for(let i=0;i<20&&dlg&&window.__lines.length<12;i++)adv();return window.__lines.slice(0,8).map(x=>x[1]).join(' | ')},[pov,id]);
 mark(`${pov} echo before ${id}`,/customs-house lift|old hound|fern|cactus|count stands|brass plate|photograph|plan/.test(r))}
await ev(()=>{dlg=null;ctrl=null});
for(const lone of ['m','v']){const r=await ev(lone=>{__set(lone,3,{e2l:1});S.lone=lone;return loneIntro().map(x=>x[1]).join(' | ')},lone);mark('lone hook '+lone,lone==='v'?/never wrote a total/.test(r)&&!/pours two cups/.test(r):/He came for them/.test(r))}
{const off=await ev(()=>{__set('m',3,{});S.lone='m';return loneIntro().map(x=>x[1]).join(' | ')});mark('lone off-route unchanged',!/He came for them/.test(off))}
{const L=await ev(()=>{__set('m',3,{e2l:1});Object.assign(S.f,{e2lLift:'m',e2lHound:1,e2lDinner:'glass',e2lShelter:1,e2lPrickles:1,e2lHale:'m'});return extraEnding().join(' | ')});
 mark('ending lines',/jaw/.test(L)&&/old hound/.test(L)&&/Ronin drank/.test(L)&&/brass plate/.test(L)&&/Prickles/.test(L)&&/Hale/.test(L))}
{const L=await ev(()=>{__set('v',3,{e2l:1});Object.assign(S.f,{e2lLift:'v',e2lDinner:'fern',e2lHale:'v'});return extraEnding().join(' | ')});mark('ending lines V',/round/.test(L)&&/fern/.test(L)&&/tyres/.test(L))}
/* text checks */
const all=await ev(()=>window.__all.concat(window.__lines.filter(x=>!window.__all.includes(x))));const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));
ok(!vbad.length,'V contractions: '+vbad.slice(0,5).map(x=>x[1]).join(' || '));
const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
const miss=[...want].filter(k=>!got.has(k));ok(!miss.length,'scenes not finished: '+miss.join(', '));
console.log(`(b) content: ${got.size}/${want.size} scenes, options and paths played; ${all.length} lines checked`);
ok(pe.length===pe0,'(b) page errors: '+pe.slice(pe0,pe0+5).join(' | '));const pe1=pe.length;

/* ============================== (c) THE NORMAL ROUTE, UNCHANGED ============================== */
const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');const a=html.indexOf('/* ===KC74-BEGIN=== */'),z=html.indexOf('/* ===KC74-END=== */');
ok(a>0&&z>a,'kc74 markers present in the build');
const tmp=path.join(fs.mkdtempSync(path.join(os.tmpdir(),'k74-')),'index.html');fs.writeFileSync(tmp,html.slice(0,a)+html.slice(z+'/* ===KC74-END=== */'.length));
for(const f of ['art','area_hall.png']){try{fs.symlinkSync(path.join(ROOT,f),path.join(path.dirname(tmp),f))}catch(e){}}
const B=await open(b,tmp);
const snap=async(pg,pov,day,aff,slot,paid)=>pg.evaluate(([pov,day,aff,slot,paid])=>{window.__stub(1);__seed(day*97+aff+slot*7+(pov==='v'?3:0));__set(pov,day,{aff,slot,paid});S.weather=null;
 const W=f=>{try{return !!f()}catch(e){return false}};const R={};
 R.side=sideHub(false).map(o=>(o.t||o.h||'')+(o.dis?'·dis':''));R.late=sideHub(true).map(o=>(o.t||o.h||'')+(o.dis?'·dis':''));
 R.ev=EVENTS.filter(e=>W(e.when)).map(e=>e.id);R.tx=Object.keys(TXS).filter(k=>W(TXS[k].when));R.call=CALLS.filter(c=>W(c.when)).map(c=>c.id);
 R.loc=K64L.filter(e=>W(e.when)).map(e=>e.id);R.react=TDREACT.filter(r=>!r.when||W(()=>r.when(__sc(r)))).map(r=>r.id);R.chat=chatLog().map(x=>x.join(':'));
 R.k73=(k73Due()||{}).id||null;R.partner=[partnerHere('atrium'),partnerHere('trailer'),partnerHere('ronin')];R.move=moveInReady();R.dpc=dpCompanion();
 const A=ask;let cap=null;ask=function(w,q,o){cap=(o||[]).map(x=>x.t)};const w=pov==='v'?'m':'v',where=pov==='v'?'trailer':'atrium';S.done['open_'+w+where]=1;S.done['tok_'+w]=3;try{convo(w,where)}catch(e){cap=['threw']}R.talk=cap;
 cap=null;if(pov==='m'){S.done.bedChosen=0;__seed(1);try{sleep()}catch(e){}R.bed=cap}ask=A;dlg=null;ctrl=null;
 S.done.mallRoll=0;S.visitAs=pov==='v'?'v':null;R.mall=(ROOMS.mall.npcs()||[]).map(x=>x.label);S.visitAs=null;R.wheel=(ROOMS.wheel.npcs()||[]).map(x=>x.label);
 __seed(day*31+aff);const before=new Set(Object.keys(S.seen));let fin=0;try{morningEvent(()=>{fin=1})}catch(e){}for(let i=0;i<300&&dlg;i++)adv();R.morning=Object.keys(S.seen).filter(x=>!before.has(x));dlg=null;ctrl=null;
 return JSON.stringify(R)},[pov,day,aff,slot,paid]);
let diffs=0,states=0;
for(const pov of ['m','v'])for(const day of [1,2,3,4,6,9])for(const aff of [10,30,60,90])for(const slot of [0,2])for(const paid of [0,1]){states++;
 const x=await snap(p,pov,day,aff,slot,paid),y=await snap(B.p,pov,day,aff,slot,paid);if(x!==y){diffs++;if(diffs<=4){const X=JSON.parse(x),Y=JSON.parse(y);for(const k in X)if(JSON.stringify(X[k])!==JSON.stringify(Y[k]))console.log(`  diff ${pov} d${day} a${aff} s${slot} p${paid} ${k}:\n    with kc74: ${JSON.stringify(X[k]).slice(0,300)}\n    without:   ${JSON.stringify(Y[k]).slice(0,300)}`)}}}
ok(!diffs,`(c) ${diffs} of ${states} states differ from the build without kc74`);
console.log(`(c) normal route: ${states} states compared with a build without kc74 (side menu, events and the one drawn, threads, calls, location scenes, barks, server, talk, bed, partner, kc73) · ${diffs} differ`);
ok(!pe.length||pe.length===pe1,'(c) page errors (with kc74): '+pe.slice(pe1).join(' | '));ok(!B.pe.length,'(c) page errors (without kc74): '+B.pe.slice(0,5).join(' | '));
console.log(`page errors: ${pe.length+B.pe.length}`);
console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
