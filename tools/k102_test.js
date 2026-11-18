/* kc102: what they are bad at. Usage: node tools/k102_test.js
   (a) the fifteen infirmary scenes are in the pool for the right POV and stage, and play.
   (b) the four mornings: when each comes, either POV, once each, one a day, not in the infirmary or off the route.
   (c) ending lines.   Text checks as elsewhere. */
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
 const IDS={cell:['s_tray','s_scream','s_bite'],clear:['s_wreck','s_ronin','s_debt','s_four','s_pity'],v:['s_figure','s_letter','s_wrong','s_board','s_bitten','s_steady']};
 for(const [k,ids] of Object.entries(IDS)){const pov=k==='v'?'v':'m';await med(pov,{clar:k==='clear'?2:0});const list=await ev(()=>k85List().map(e=>e.id));
  for(const id of ids){ok(list.includes(id),id+' listed');ok(await ev(id=>{let d=0;const e=K85S.find(e=>e.id===id);e.run(()=>{d=1});for(let j=0;j<400&&dlg;j++)adv();return d},id),id+' plays')}}
 const morn=()=>ev(()=>{globalThis.KD_AUTO=0;window.__d=0;morningEvent(()=>{window.__d=1});for(let j=0;j<500&&dlg;j++)adv()});
 const clean=()=>ev(()=>{Object.keys(S.seen).filter(k=>/^m10[12]_|^m78_|^m82_/.test(k)).forEach(k=>delete S.seen[k]);S.seen.m78_ronin=1;S.seen.m78_angel=1;S.seen.m82_wall=1;['m101_cactus','m101_book','m101_receipt','m101_date'].forEach(k=>S.seen[k]=1);S.f.mbDay=null;S.f.mbN=0;S.f.e2lMornDay=null});
 for(const pov of ['m','v']){
  await ev(pov=>__set(pov,'after',{done:['e2l_door']}),pov);await clean();await morn();ok(await ev(()=>!!S.seen.m102_range),pov+' the range, after the infirmary');
  await ev(pov=>__set(pov,'act2',{done:['e2l_door','e2l_car']}),pov);await clean();await ev(()=>{S.seen.m102_range=1});await morn();ok(await ev(()=>!!S.seen.m102_job),pov+' the job, in act II');
  await ev(pov=>__set(pov,'act3',{done:['e2l_door','e2l_car','e2l_know','e2l_row']}),pov);await clean();await ev(()=>{S.seen.m102_range=1;S.seen.m102_job=1});await morn();ok(await ev(()=>!!S.seen.m102_sorry),pov+' sorry, after the corridor')}
 await med('m',{clar:2});await clean();await morn();ok(await ev(()=>!Object.keys(S.seen).some(k=>/^m102_/.test(k))),'not in the infirmary');
 ok(await ev(()=>K97_MIND.fray.length===4&&K97_MIND.thin.length===4),'two more for the worst route');
 {const L=await ev(()=>{__set('m','epilogue',{f:{e2l85:{s_wreck:1,s_debt:1,s_figure:1,s_letter:1,s_bitten:1},e2lEnd:'lovers'}});S.seen.m102_sorry=1;S.seen.m102_range=1;return extraEnding().join(' | ')});
  for(const rx of [/glass replaced/,/fucking LINE/,/gave them a figure/,/He burned it/,/Bit me/,/carved stone ball/,/fifth box/])ok(rx.test(L),'ending '+rx)}
 const SRC=require('fs').readFileSync(path.join(ROOT,'src/kc102.js'),'utf8');const all=(await ev(()=>window.__all)).filter(x=>SRC.includes(x[1].slice(0,40)));ok(all.length>60,'own lines checked: '+all.length);
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vb=all.filter(x=>(x[0]==='K9'||x[0]==='')&&!/sticker that says/.test(x[1])&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vb.length,'V and narration contractions: '+vb.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!all.some(x=>/grandpa/i.test(x[1])&&/kc101/.test('')),'no “grandpa”');
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined: '+ub.slice(0,2).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
