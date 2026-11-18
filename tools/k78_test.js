/* kc78: not an enemy, and still in danger. Usage: node tools/k78_test.js
   (a) the four beats (the realisation, the parapet, the corridor, Pier Six): due in order and in the right phase, both
       POVs, every option, flags, the row's affection cost, kc76's "where it stands", and the boat's lead-in.
   (b) the case menu: "Watch him / Study them" after the realisation (first scene and every repeat); no sleeping in
       shifts after the row.
   (c) the two mornings (one a day, shared cap), the 3am threads, server lines, ending lines; nothing off the route.
   Text checks: V never contracts, no hound names, no she/herself for Misaki, nothing undefined. 0 page errors. */
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const pw=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
let runs=0,fails=0;const ok=(c,m)=>{runs++;if(!c){fails++;console.log('FAIL',m)}};
(async()=>{const b=await pw.chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const pe=[];p.on('pageerror',e=>pe.push(e.message));
 await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(500);
 await p.evaluate(()=>{globalThis.KD_AUTO=1;document.querySelectorAll('.splash').forEach(e=>e.remove());
  window.__all=[];const _s=say;say=function(L,cb){try{(L||[]).forEach(x=>{if(x)window.__all.push([x[0],String(x[1])])})}catch(e){}return _s.apply(this,arguments)};
  window.__hubbed=0;hub=function(){window.__hubbed=1};
  /* benchmark saves give each phase its real state (as tools/k73_test.js does) */
  const BI={normal:0,after:2,act2:2,act3:4,epilogue:6};
  window.__set=(pov,ph,o)=>{o=o||{};benchLoad(BENCH[BI[ph]]);for(let k=0;k<80&&dlg;k++)adv();ctrl=null;dlg=null;
   S.tx=null;S.dark=0;S.lone=null;S.f.abroad=0;S.f.heartbreak=0;S.pov=pov;S.rom=null;S.vrom=null;S.f.k28pair=null;S.f.married=0;S.seen=S.seen||{};S.done={};
   Object.keys(S.f).filter(k=>/^e2l/.test(k)).forEach(k=>delete S.f[k]);delete S.f.k64LDay;delete S.f.mbDay;delete S.f.mbN;Object.keys(S.seen).filter(k=>/^l7[37]_/.test(k)).forEach(k=>delete S.seen[k]);
   if(ph==='normal'){S.phase='normal';S.day=2;S.f.kidnapSet=0;S.f.movedIn=0;S.paid=0;if(S.kd)S.kd.med=0}
   if(ph==='after'){S.phase='after';KD();S.kd.t0=S.day-5;S.kd.med=0}
   if(ph==='act2'){S.day=Math.max(S.day,(S.act2Start||0)+2);KD();S.kd.t0=S.day-9;S.kd.med=0}
   if(ph==='act3'&&S.a3)S.day=S.a3.start+3;
   if(o.day)S.day=o.day;S.slot=1;S.aff=Math.min(S.aff,40);
   if(o.e2l!==0){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1};(o.done||[]).forEach(x=>S.f.e2ld[x]=1);S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save();window.__hubbed=0}});
 const ev=(f,a)=>p.evaluate(f,a);
 const drive=async picks=>{let i=0;for(let k=0;k<300;k++){const r=await ev(pk=>{for(let j=0;j<400&&dlg;j++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'clicked'}}return dlg?'dlg':'idle'},picks[i]||0);
  if(r==='hub')return 'hub';if(r==='clicked')i++;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};

 const PRE2=['e2l_after','e2l_rifle','e2l_fork','e2l_car','e2l_list','e2l_stitch','e2l_pair','e2l_spar'];
 /* (a) the four beats */
 const B={e2l_know:{ph:'act2',done:PRE2,fl:'e2lKnow',v:['hide','watch'],free:1,ch:'III'},e2l_test:{ph:'act2',done:PRE2.concat('e2l_know'),fl:'e2lTest',v:['fought','laughed'],free:0,ch:'III'},
  e2l_row:{ph:'act3',done:PRE2.concat('e2l_know','e2l_test'),fl:'e2lRow',v:['said','silent'],free:0,ch:'IV'},e2l_guard:{ph:'act3',done:PRE2.concat('e2l_know','e2l_test','e2l_row'),fl:'e2lGuard',v:['own','blame'],free:0,ch:'IV'}};
 for(const id of Object.keys(B))for(const pov of ['m','v'])for(const o of [0,1])for(const extra of (id==='e2l_know'?[{},{e2lSpar:'kiss'}]:[{}])){const w=B[id];
  await ev(([pov,w,extra])=>__set(pov,w.ph,{done:w.done,f:Object.assign({e2lAfter:'war',e2lKnow:'hide',e2lTest:'fought',e2lRow:null},extra)}),[pov,w,extra]);
  await ev(([id,fl])=>{delete S.f[fl];if(id!=='e2l_guard')delete S.f.e2lRow;if(id==='e2l_guard')S.f.e2lRow='said';S.aff=40;save()},[id,w.fl]);
  const r0=await ev(()=>{const b=k73Due();const x=b&&sideHub(false).find(x=>x.t==='⚔ '+b.t());if(!x)return 'none:'+(b&&b.id);window.__sub=x.sub;x.fn();return b.id});const r=await drive([o]);
  const st=await ev(([fl,id])=>({f:S.f[fl],done:!!S.f.e2ld[id],last:S.f.e2lLast===S.day,again:(k73Due()||{}).id===id,sub:window.__sub,aff:S.aff}),[w.fl,id]);
  ok(r0===id&&r==='hub'&&st.f===w.v[o]&&st.done&&!st.again,`${id} ${pov} #${o}: ${r0} ${r} ${JSON.stringify(st)}`);ok(st.last===!w.free,`${id} ${pov} day's move: ${st.last}`);
  ok(new RegExp('the war · '+w.ch+' · \\d+ of \\d+').test(st.sub||''),`${id} ${pov} sub: ${st.sub}`);if(id==='e2l_row')ok(st.aff===34,`${pov} the row costs affection: ${st.aff}`)}
 for(const pov of ['m','v']){
  await ev(pov=>__set(pov,'act2',{done:['e2l_after','e2l_rifle','e2l_fork','e2l_list','e2l_stitch','e2l_pair','e2l_spar'],f:{e2lAfter:'war'}}),pov);ok(await ev(()=>(k73Due()||{}).id)==='e2l_car',pov+' the realisation waits for the car');
  await ev(([pov,d])=>__set(pov,'act2',{done:d,f:{e2lAfter:'war'}}),[pov,PRE2.concat('e2l_know','e2l_test')]);ok(await ev(()=>k73Due())===null,pov+' the row waits for Act III');
  await ev(([pov,d])=>__set(pov,'act3',{done:d,f:{e2lAfter:'war'}}),[pov,PRE2]);ok(await ev(()=>(k73Due()||{}).id)==='e2l_know',pov+' the realisation can still happen in Act III');
  await ev(([pov,d])=>__set(pov,'act3',{done:d,f:{e2lEnd:'lovers'}}),[pov,PRE2.concat('e2l_will','e2l_boat')]);ok(await ev(()=>!['e2l_know','e2l_test','e2l_row','e2l_guard'].includes((k73Due()||{}).id)),pov+' nothing of it after the boat');
  /* where it stands */
  const st=await ev(([pov,d])=>{__set(pov,'act2',{done:d,f:{e2lKnow:'hide'}});const a=k76Stand();S.f.e2lRow='said';const b=k76Stand();S.f.e2lEnd='lovers';return [a,b,k76Stand()]},[pov,PRE2.concat('e2l_know')]);
  ok(/not going to kill (him|them)\. You are certain/.test(st[0])&&/locked/.test(st[1])&&/declared/.test(st[2]),pov+' where it stands: '+st.join(' // ').slice(0,200));
  /* the boat's lead-in */
  for(const row of ['said','silent'])for(const g of [null,'own']){const L=await ev(([pov,row,g])=>{__set(pov,'act3',{f:{e2lRow:row,e2lGuard:g}});const L=k78BoatPre();L.forEach(x=>window.__all.push(x));return L.map(x=>x[1]).join(' ')},[pov,row,g]);
   ok(/since the corridor/.test(L)&&/has their back to the other one/.test(L)&&(!!g===/strapped/.test(L)),`${pov} boat lead-in ${row} ${g}`)}
  ok(await ev(pov=>{__set(pov,'act3',{});return k78BoatPre().length===0},pov),pov+' no lead-in without the row');
  const bt=await ev(([pov,d])=>{__set(pov,'act3',{done:d,f:{e2lRow:'said'}});window.__n0=window.__all.length;const b=K73B.find(b=>b.id==='e2l_boat');b.run();for(let j=0;j<12&&dlg;j++)adv();const T=window.__all.slice(window.__n0).map(x=>x[1]);return T.findIndex(t=>/since the corridor/.test(t))+'/'+T.findIndex(t=>/Pier Nine, two nights/.test(t))},[pov,PRE2.concat('e2l_know','e2l_test','e2l_row','e2l_guard','e2l_will')]);
  ok(/^0\/\d+$/.test(bt)&&bt!=='0/-1',pov+' the lead-in runs into the boat: '+bt)}
 /* (b) the case menu */
 for(const pov of ['m','v']){
  await ev(([pov,d])=>__set(pov,'act2',{done:['e2l_after','e2l_car']}),[pov]);
  ok(await ev(()=>{k77Case();const t=[...ctrl.box.querySelectorAll('.opt')].map(o=>o.textContent);ctrl=null;ui.innerHTML='';return !t.some(x=>/Watch him|Study them/.test(x))}),pov+' no watching before the realisation');
  await ev(pov=>{__set(pov,'act2',{done:['e2l_after','e2l_car','e2l_know'],f:{e2lKnow:'watch'}});k77Case()},pov);
  const o1=await ev(()=>[...ctrl.box.querySelectorAll('.opt')].map(o=>o.textContent+(o.classList.contains('dis')?' [dis]':'')));ok(o1.some(x=>/^(Watch him|Study them)/.test(x))&&!o1.some(x=>/Sleep in shifts.*\[dis\]/.test(x)),pov+' watching offered: '+o1.join(' | ').slice(0,200));
  ok(await drive([3])==='hub'&&await ev(()=>S.f.e2l77.tells===1&&S.done.k77act===1),pov+' watching, first');
  for(let rep=0;rep<3;rep++){await ev(()=>{S.done={};window.__hubbed=0;k77Case()});ok(await drive([3])==='hub',pov+' watching, repeat '+rep)}
  await ev(pov=>{__set(pov,'act2',{done:['e2l_after','e2l_car','e2l_know','e2l_test','e2l_row'],f:{e2lRow:'said'}});k77Case()},pov);
  const o2=await ev(()=>[...ctrl.box.querySelectorAll('.opt')].map(o=>o.textContent+(o.classList.contains('dis')?' [dis]':'')));ok(o2.some(x=>/Sleep in shifts.*neither of you will.*\[dis\]/.test(x)),pov+' no shifts after the row: '+o2.join(' | ').slice(0,260));await ev(()=>{ctrl=null;ui.innerHTML=''})}
 /* (c) mornings, threads, server, endings */
 const keep=await ev(()=>window.__all.length);
 for(const pov of ['m','v']){
  const r=await ev(([pov,d])=>{__set(pov,'act3',{done:d,f:{e2lRow:'said'}});delete S.seen.m78_ronin;delete S.seen.m78_angel;const out=[];for(let i=0;i<3;i++){S.day++;delete S.f.mbDay;delete S.f.mbN;const was=JSON.stringify([S.seen.m78_ronin,S.seen.m78_angel]);let d=0;const o=K78MORN.map(x=>x.run);
    try{morningEvent(()=>{d=1})}catch(e){out.push('threw '+e.message)}for(let j=0;j<80&&dlg;j++)adv();out.push(JSON.stringify([S.seen.m78_ronin,S.seen.m78_angel]))}return out.join(' ')},[pov,PRE2.concat('e2l_know','e2l_test','e2l_row')]);
  ok(/\[1,null\] \[1,1\] \[1,1\]/.test(r),pov+' mornings, one a day: '+r);
  ok(await ev(pov=>{__set(pov,'act3',{e2l:0,f:{e2lKnow:'hide',e2lRow:'said'}});delete S.seen.m78_ronin;delete S.f.mbDay;try{morningEvent(()=>{})}catch(e){}for(let j=0;j<80&&dlg;j++)adv();return !S.seen.m78_ronin},pov),pov+' no mornings off the route')}
 /* other modules' mornings played above too; keep only this module's lines for the text checks */
 await ev(keep=>{window.__all.length=keep},keep);
 for(const pov of ['m','v'])ok(await ev(([pov,d])=>{__set(pov,'act3',{done:d,f:{e2lRow:'said'}});let n=0;K78MORN.forEach(e=>{e.run(()=>{n++});for(let j=0;j<40&&dlg;j++)adv()});return n===2},[pov,PRE2.concat('e2l_know','e2l_test','e2l_row')]),pov+' morning scenes finish');
 for(const [id,pov] of [['tx_e2l_3am_m','m'],['tx_e2l_3am_v','v']]){
  const r=await ev(([id,pov,d])=>{__set(pov,'act3',{done:d,f:{e2lRow:'silent'}});const t=TXS[id];const on=t.when();const n=t.nodes.start;const os=n.opts();[].concat(n.in()).forEach(x=>window.__all.push([pov==='m'?'K9':'hitmeuppp',x]));os.forEach(o=>[].concat(o.reply()).forEach(x=>window.__all.push([pov==='m'?'K9':'hitmeuppp',String(x)])));
   delete S.f.e2ld.e2l_row;const before=t.when();__set(pov,'act3',{e2l:0});return {on,before,off:t.when(),n:os.length}},[id,pov,PRE2.concat('e2l_know','e2l_test','e2l_row')]);ok(r.on&&!r.before&&!r.off&&r.n===3,id+': '+JSON.stringify(r))}
 {const r=await ev(d=>{const seen=new Set();for(let i=0;i<12;i++){__set('m','act2',{done:d});S.day+=i;S.slot=i%4;chatLog().forEach(x=>seen.add(String(x[1])))}const all=K78CHAT.every(c=>c.every(x=>seen.has(x[1])));K78CHAT.forEach(c=>c.forEach(x=>window.__all.push([x[0]==='k9'?'K9':x[0],x[1]])));
   let off=false;for(let i=0;i<6;i++){__set('m','act2',{done:['e2l_after','e2l_car']});S.day+=i;off=off||chatLog().some(x=>K78CHAT.some(c=>c.some(y=>y[1]===x[1])))}return {all,off}},PRE2.concat('e2l_know'));ok(r.all&&!r.off,'server: '+JSON.stringify(r))}
 for(const [f,rx] of [[{e2lRow:'said'},/was not believed/],[{e2lRow:'silent'},/locked their doors/],[{e2lGuard:'own'},/boat hook on Pier Six/],[{e2lTest:'fought'},/both got the answer wrong/]]){
  const L=await ev(f=>{__set('m','epilogue',{f});return extraEnding().join(' | ')},f);ok(rx.test(L),'ending '+JSON.stringify(f));const L0=await ev(f=>{__set('m','epilogue',{f,e2l:0});return extraEnding().join(' | ')},f);ok(!rx.test(L0),'ending off the route '+JSON.stringify(f))}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const sb=all.filter(x=>/\b(she|herself)\b/i.test(x[1])&&!/pawnshop|Tonight’s name|She has been waiting|She buys|She is on my list|she hunts|She keeps them|on my list for two years|what she did|she’s exactly as alive|she is exactly as alive|She is alive|while she |She knew your face|while she hunts/.test(x[1]));ok(!sb.length,'she/herself: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
