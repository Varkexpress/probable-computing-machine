/* kc97: the worst of it. Usage: node tools/k97_test.js
   The enemies route's own state-of-mind scenes on the worst route: one per composure band and day, only for Misaki,
   only at severity 8+, only while the room is a cell, only on the route; twelve scenes, none naming a method. */
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
 const worst=(pov,o)=>ev(([pov,o])=>{o=o||{};__set(pov,'after',{done:['e2l_door'],e2l:o.e2l});S.kd.t0=S.day;S.kd.med={d:o.d||0,clar:o.clar||0,run:0,sev:o.sev===undefined?9:o.sev};S.comp=o.comp===undefined?30:o.comp;save();const L=k97Mind();return L?L.map(x=>x[1]).join(' '):null},[pov,o]);
 const seen=new Set();
 for(const [comp,rx] of [[30,/inventory|five things|case against him/i],[16,/lose time|run out of reasons|it is fine/i],[9,/cannot remember why|do not eat|Nothing gets up/i],[2,/facing the wall|station bench|Somewhere stupid/i]])for(const d of [0,1,2]){const t=await worst('m',{comp,d});ok(t&&rx.test(t),`band at ${comp}, day ${d}: `+(t||'').slice(0,60));seen.add(t)}
 ok(seen.size===12,'twelve different scenes: '+seen.size);
 ok(await worst('v',{})===null,'not for V');ok(await worst('m',{sev:5})===null,'not below severity 8');ok(await worst('m',{clar:2})===null,'not once clear');ok(await worst('m',{e2l:0})===null,'not off the route');
 ok(await ev(()=>{__set('m','after',{done:['e2l_door']});S.kd.med={d:0,clar:0,run:0,sev:9};S.f.kdMindDay=S.day;return k97Mind()===null}),'once a day');
 {const src=require('fs').readFileSync(path.join(ROOT,'src/kc97.js'),'utf8');ok(!/\b(she|her|hers)\b/.test(src.replace(/\/\*[\s\S]*?\*\//g,'')),'they/them');ok(!/grandpa/i.test(src),'no “grandpa”');
  ok(!/\b(rope|pills|blade to|wrists? with|hang|overdose|jump)\b/i.test(src.replace(/\/\*[\s\S]*?\*\//g,'')),'nothing about a method')}
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
