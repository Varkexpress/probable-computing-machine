/* kc100: up close. Usage: node tools/k100_test.js
   Each stage (wary, know, cold, lovers, rivals) and POV: the menu replaces Affection…, lists the stage's actions,
   and every action plays first and repeat versions. Not in the normal phase, the infirmary, or off the route.
   Text checks: V and narration never contract, Misaki never she/her, no “grandpa”, nothing undefined. */
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
 const SET={wary:pov=>ev(pov=>__set(pov,'after',{done:['e2l_door']}),pov),know:pov=>ev(pov=>__set(pov,'act2',{done:['e2l_door','e2l_know']}),pov),
  cold:pov=>ev(pov=>__set(pov,'act3',{done:['e2l_door','e2l_know','e2l_row']}),pov),lov:pov=>ev(pov=>__set(pov,'epilogue',{done:['e2l_door','e2l_boat'],f:{e2lEnd:'lovers'}}),pov),riv:pov=>ev(pov=>__set(pov,'epilogue',{done:['e2l_door','e2l_boat'],f:{e2lEnd:'rivals'}}),pov)};
 const N={wary:5,know:5,cold:3,lov:6,riv:5};
 const open=w=>ev(w=>{window.__b=0;affectionMenu(w,()=>{window.__b=1});return ctrl&&ctrl.box?[...ctrl.box.querySelectorAll('.opt')].map(o=>o.innerText.split('\n')[0]):[]},w);
 const pick=async i=>{await ev(i=>{const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];os[i].click()},i);for(let k=0;k<200;k++){const r=await ev(()=>{for(let j=0;j<400&&dlg;j++)adv();return window.__b});if(r)return true;await p.waitForTimeout(3)}return false};
 for(const st of Object.keys(SET))for(const pov of ['m','v']){const w=pov==='m'?'v':'m';await SET[st](pov);
  ok(await ev(st=>k100St()===st,st),`${pov} ${st}: stage`);
  ok(await ev(w=>(w==='v'?TOPICS_V:TOPICS_M).find(t=>t.id===(w==='v'?'affx':'maffx')).label()==='⚔ Up close…',w),`${pov} ${st}: label`);
  const o=await open(w);ok(o.length===N[st]+1&&o[o.length-1]==='Never mind',`${pov} ${st}: ${N[st]} actions: `+o.join(' / '));
  for(let i=0;i<N[st];i++)for(let r=0;r<3;r++){await open(w);ok(await pick(i),`${pov} ${st} #${i} play ${r}`)}
  ok(await ev(st=>Object.keys(S.talks).filter(k=>k.startsWith('k100_'+st+'_')).length,st)===N[st],`${pov} ${st}: counted`)}
 {await ev(()=>__set('m','after',{done:['e2l_door']}));const t0=await ev(()=>{S.done.tok_v=1;return 1});await open('v');await ev(()=>{const os=[...ctrl.box.querySelectorAll('.opt')];os[os.length-1].click()});ok(await ev(()=>S.done.tok_v===2),'never mind refunds the token')}
 await ev(()=>__set('m','normal',{}));ok(await ev(()=>k100St()===null),'not in the normal phase');
 await med('m',{clar:2});ok(await ev(()=>k100St()===null),'not in the infirmary');
 await ev(()=>__set('m','after',{done:['e2l_door'],e2l:0}));ok(await ev(()=>k100St()===null),'not off the route');
 {const o=await ev(()=>{__set('m','after',{done:['e2l_door'],e2l:0});S.aff=60;affectionMenu('v',()=>{});return [...ctrl.box.querySelectorAll('.opt')].map(o=>o.innerText.split('\n')[0]).join(' / ')});ok(/Hug/.test(o)&&!/stupid/.test(o),'off the route the base menu: '+o.slice(0,80))}
 {const L=await ev(()=>{__set('m','epilogue',{f:{e2lEnd:'lovers'}});S.talks={k100_know_collar:1,k100_lov_kiss:2,k100_lov_page:1,k100_riv_four:1};return extraEnding().join(' | ')});for(const rx of [/same inch/,/somewhere stupid/,/“Guilty,”/,/three and a half/])ok(rx.test(L),'ending '+rx)}
 for(const sug of [1,0]){await SET.lov('v');await ev(s=>{META.sug=s},sug);await ev(()=>{window.__n0=window.__all.length});await open('m');await pick(1);const t=await ev(()=>window.__all.slice(window.__n0).map(x=>x[1]).join(' '));ok(sug?/pistol under the pillow/.test(t):/On the roof/.test(t),'behind them, suggestive '+(sug?'on':'off'))}
 const all=await ev(()=>window.__all);
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vb=all.filter(x=>(x[0]==='K9'||x[0]==='')&&!/sticker that says/.test(x[1])&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vb.length,'V and narration contractions: '+vb.slice(0,3).map(x=>x[1]).join(' || '));
 const sb=[...new Set(all.filter(x=>/\b(she|her|hers|herself)\b/i.test(x[1])&&!/Angel|grey hound|hound/.test(x[1])).map(x=>x[1].slice(0,90)))];ok(!sb.length,'she/her: '+sb.slice(0,3).join(' || '));
 ok(!all.some(x=>/grandpa/i.test(x[1])),'no “grandpa”');
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined: '+ub.slice(0,2).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
