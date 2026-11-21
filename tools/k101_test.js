/* kc101: what is lost. Usage: node tools/k101_test.js
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
 const morn=()=>ev(()=>{globalThis.KD_AUTO=0;window.__d=0;const a=window.__all.length;morningEvent(()=>{window.__d=1});for(let j=0;j<500&&dlg;j++)adv();const t=window.__all.slice(a).map(x=>x[1]).join(' ');return t});
 for(const pov of ['m','v']){await ev(pov=>{__set(pov,'act2',{done:['e2l_door']});Object.keys(S.seen).filter(k=>/^m101_/.test(k)).forEach(k=>delete S.seen[k]);S.seen.m78_ronin=1;S.seen.m78_angel=1;S.seen.m82_wall=1},pov);const got=[];
  for(let d=0;d<8;d++){await ev(()=>{S.f.mbDay=null;S.f.mbN=0;S.f.e2lMornDay=null;S.f.e2l74MDay=null});await morn();got.push(await ev(()=>Object.keys(S.seen).filter(k=>/^m101_/.test(k)).sort().join(',')));await ev(()=>{S.day++;save()})}
  const fin=got[got.length-1];ok(/m101_cactus/.test(fin)&&/m101_book/.test(fin)&&/m101_receipt/.test(fin)&&!/m101_date/.test(fin),pov+' act2 mornings: '+fin);
  ok(new Set(got).size>=3,pov+' one a day: '+got.join(' | '));
  await ev(pov=>{__set(pov,'epilogue',{done:['e2l_door','e2l_boat'],f:{e2lEnd:'lovers'}});S.f.mbDay=null;S.f.mbN=0;S.f.e2lMornDay=null;delete S.seen.m101_date;S.seen.e2l_morn=1;S.seen.m78_ronin=1;S.seen.m78_angel=1},pov);
  for(let d=0;d<3;d++){await ev(()=>{S.f.mbDay=null;S.f.mbN=0});await morn();await ev(()=>{S.day++;save()})}ok(await ev(()=>!!S.seen.m101_date),pov+' a year on')}
 {const r=await ev(()=>{__set('m','after',{done:['e2l_door','e2l_after']});delete S.seen.m82_wall;S.f.mbDay=null;S.f.mbN=0;S.f.e2lMornDay=null;return k101Pending()});ok(r,'yields to the route’s earlier mornings')}
 await med('m',{clar:2});await ev(()=>{Object.keys(S.seen).filter(k=>/^m101_/.test(k)).forEach(k=>delete S.seen[k]);S.f.mbDay=null;S.f.mbN=0});await morn();ok(await ev(()=>!Object.keys(S.seen).some(k=>/^m101_/.test(k))),'not in the infirmary');
 await ev(()=>{__set('m','act2',{done:['e2l_door'],e2l:0});Object.keys(S.seen).filter(k=>/^m101_/.test(k)).forEach(k=>delete S.seen[k])});await morn();ok(await ev(()=>!Object.keys(S.seen).some(k=>/^m101_/.test(k))),'not off the route');
 {const L=await ev(()=>{__set('m','epilogue',{f:{e2l85:{r_plot:1,r_entry:1,r_war:1},e2lEnd:'lovers'}});S.seen.m101_cactus=1;S.seen.m101_book=1;S.seen.m101_receipt=1;return extraEnding().join(' | ')});
  for(const rx of [/drowned it/,/could not set a price/,/unreadable/])ok(rx.test(L),'ending '+rx)}
 const SRC=require('fs').readFileSync(path.join(ROOT,'src/kc101.js'),'utf8');const all=(await ev(()=>window.__all)).filter(x=>SRC.includes(x[1].slice(0,40)));ok(all.length>10,'own lines checked: '+all.length);
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vb=all.filter(x=>(x[0]==='K9'||x[0]==='')&&!/sticker that says/.test(x[1])&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vb.length,'V and narration contractions: '+vb.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!all.some(x=>/grandpa/i.test(x[1])&&/kc101/.test('')),'no “grandpa”');
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined: '+ub.slice(0,2).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
