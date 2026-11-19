/* kc103: oh. Usage: node tools/k103_test.js
   Five scenes for Misaki and three for V, in order, one a day, after the infirmary and before the boat, only once
   kc102's anger has begun; V's third waits until the deed has been found. Flags, endings, text checks. */
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
   if(o.e2l!==0){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1};(o.done||[]).forEach(x=>S.f.e2ld[x]=1);if(!o.raw90){if((o.done||[]).includes('e2l_show')||(o.done||[]).includes('e2l_kennel'))S.f.e2ld.e2l_bucket=1;if((o.done||[]).includes('e2l_pair'))S.f.e2ld.e2l_table=1}if((o.done||[]).includes('e2l_after')&&!o.raw){S.f.e2ld.e2l_room=1;S.f.e2ld.e2l_thurs=1;S.f.e2ld.e2l_marks=1;S.f.e2ld.e2l_green=1}if((o.done||[]).includes('e2l_boat')&&!o.raw)S.f.e2ld.e2l_eve=1;S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save();window.__hubbed=0}});
 const ev=(f,a)=>p.evaluate(f,a);
 const drive=async picks=>{let i=0;for(let k=0;k<300;k++){const r=await ev(pk=>{for(let j=0;j<400&&dlg;j++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'clicked'}}return dlg?'dlg':'idle'},picks[i]||0);
  if(r==='hub')return 'hub';if(r==='clicked')i++;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};



 const med=(pov,o)=>ev(([pov,o])=>{__set(pov,'after',Object.assign({done:['e2l_door']},o||{}));S.kd.t0=S.day;S.kd.med={d:1,clar:(o&&o.clar)||0,run:0,sev:2};S.comp=(o&&o.comp)??50;S.slot=(o&&o.slot)||0;save()},[pov,o]);
 const step=async()=>{const r=await ev(()=>{window.__hubbed=0;const e=k103Next();if(!e)return null;const t='⚔ '+K103_T[e.v?'v':'m'][e.i];const inMenu=sideHub(0).some(o=>o.t===t);k103Run();return t+(inMenu?'':' (not in menu)')});if(!r)return null;return (await drive([0]))==='hub'?r:'timeout'};
 for(const pov of ['m','v']){
  await ev(pov=>__set(pov,'after',{done:['e2l_door']}),pov);ok(await ev(()=>k103Next())===null,pov+' not before kc102’s anger');
  await ev(()=>{S.seen.m102_range=1;save()});const T=[];
  for(let d=0;d<7;d++){T.push(await step());ok(await step()===null,pov+' one a day');await ev(()=>{S.day++;save()})}
  const n=pov==='m'?5:2;ok(T.slice(0,n).every(t=>t&&!/timeout|not in menu/.test(t))&&T[n]===null,pov+': '+T.join(' / '))}
 {await ev(()=>{__set('v','act2',{done:['e2l_door']});S.seen.m102_range=1;S.f.e2l103V=2;S.f.e2l103Deed=1;save()});const t=await step();ok(t&&/The deed/.test(t),'V’s third, once the deed is found: '+t)}
 ok(await ev(()=>{__set('m','after',{done:['e2l_door']});S.seen.m102_range=1;S.f.e2l103M=5;return S.f.e2l103Oh===undefined}),'flag reset');
 {await ev(()=>{__set('m','after',{done:['e2l_door']});S.seen.m102_range=1;S.f.e2l103M=4;save()});await step();ok(await ev(()=>S.f.e2l103Oh===1),'oh')}
 {await ev(()=>{__set('m','after',{done:['e2l_door']});S.seen.m102_range=1;S.f.e2l103M=2;save()});await step();ok(await ev(()=>S.f.e2l103Deed===1),'the deed is written on')}
 await med('m',{clar:2});await ev(()=>{S.seen.m102_range=1});ok(await ev(()=>k103Next())===null,'not in the infirmary');
 await ev(()=>{__set('m','after',{done:['e2l_door'],e2l:0});S.seen.m102_range=1});ok(await ev(()=>k103Next())===null,'not off the route');
 await ev(()=>{__set('m','act3',{done:['e2l_door'],f:{e2lEnd:'lovers'}});S.seen.m102_range=1});ok(await ev(()=>k103Next())===null,'not after the boat');
 {const L=await ev(()=>{__set('m','epilogue',{f:{e2l103Oh:1,e2l103M:5,e2l103Deed:1,e2l103V:2,e2lEnd:'lovers'}});return extraEnding().join(' | ')});for(const rx of [/half past seven/,/came to nine/,/good tree/,/burned the bacon/])ok(rx.test(L),'ending '+rx)}
 const SRC=require('fs').readFileSync(path.join(ROOT,'src/kc103.js'),'utf8');const all=(await ev(()=>window.__all)).filter(x=>SRC.includes(x[1].slice(0,30)));ok(all.length>40,'own lines: '+all.length);
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vb=all.filter(x=>(x[0]==='K9'||x[0]==='')&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vb.length,'V and narration contractions: '+vb.slice(0,3).map(x=>x[1]).join(' || '));
 const sb=all.filter(x=>/\b(she|her)\b/i.test(x[1])&&!/Angel|her face|She does|her stream|her bedroom|she comes|She comes|the hand|grey hound|ring light|on stage|her hands/i.test(x[1]));ok(!sb.length,'she/her: '+sb.slice(0,2).map(x=>x[1].slice(0,80)).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
