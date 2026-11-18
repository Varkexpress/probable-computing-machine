/* kc98: how the worst route ends, on the enemies route. Usage: node tools/k98_test.js
   (a) the last night plays the route's text and ends on V's lone route; off the route the original plays.
   (b) with two clues and the message, it is interrupted, and Misaki lives.   (c) the dark thought, once a day.
   (d) V, after: seven mornings, one a day, and the original aftermath does not then start.
   (e) nothing about a method; they/them; V never contracts. */
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
 const worst=o=>ev(o=>{o=o||{};__set('m','after',{done:['e2l_door'],e2l:o.e2l});S.kd.t0=S.day-2;S.kd.med={d:2,clar:0,run:0,sev:9,clues:o.clues||[]};S.comp=o.comp===undefined?2:o.comp;S.f.kdBye=o.bye||'';S.slot=2;
  window.__lone=null;startLone=function(k){window.__lone=k};window.__n0=window.__all.length;save()},o);
 const run=async()=>{await ev(()=>kdSpiral());for(let k=0;k<200;k++){const r=await ev(()=>{for(let j=0;j<400&&dlg;j++)adv();return (window.__lone||(S.kd.med&&S.kd.med.logicOut&&!dlg))?'end':'x'});if(r==='end')break;await p.waitForTimeout(5)}return ev(()=>window.__all.slice(window.__n0).map(x=>x[1]).join(' '))};
 /* (a) */
 {await worst({});const t=await run();ok(/YRDNUAL/.test(t)&&/“came anyway\.”/.test(t)&&/It was not\./.test(t),'the route’s last night');ok(!/“V\?”|fallen asleep to that breathing/.test(t),'not the original');
  ok(await ev(()=>window.__lone==='v'&&S.f.lateRoute==='self'&&S.f.e2l98==='late'&&S.kd.med===null),'ends on V’s lone route')}
 for(const mode of [1,0]){await ev(m=>{META.kdFull=m},mode);await worst({});const t=await run();ok(mode?/You do not have the hours/.test(t):/owes rent/.test(t),'by setting: '+mode)}
 {await worst({e2l:0});const t=await run();ok(/The radio that isn’t there/.test(t)&&/Not Friday\. Not them\./.test(t)&&!/YRDNUAL|not when he says/.test(t),'off the route the original plays, untouched')}
 /* (b) */
 {await worst({clues:['a','b'],bye:'v'});const t=await run();ok(/I am K9/.test(t)&&/hold them to it/.test(t)&&!/funeral/.test(t),'interrupted');
  ok(await ev(()=>S.f.kdInterrupted===1&&S.f.e2l98==='heard'&&S.kd.med.logicOut===1&&S.kd.med.clar===3&&!window.__lone),'Misaki lives, and is clear')}
 /* (c) */
 {const w=await ev(()=>{__set('m','after',{done:['e2l_door']});S.kd.med={d:1,clar:0,run:0,sev:9};S.comp=10;S.slot=1;S.f.kdMindDay=S.day;window.__n0=window.__all.length;return typeof K98_WARN!=='undefined'&&K98()&&kdWR()});ok(w,'the dark thought is available on the route');
  ok(await ev(()=>K98_WARN.length===3&&K98_WARN.every(x=>/when/.test(x[0]))),'three lines, about the when')}
 /* (d) */
 {await ev(()=>{__set('v','act2',{done:['e2l_door']});S.lone='v';S.pov='v';S.f.lateRoute='self';S.f.kdAfterN=0;S.f.kdAfterDay=null;window.__n0=window.__all.length});const seq=[];
  for(let d=0;d<9;d++){const r=await ev(()=>{window.__me=0;const a=window.__all.length;morningEvent(()=>{window.__me=1});for(let j=0;j<600&&dlg;j++)adv();const t=window.__all.slice(a).map(x=>x[1]).join(' ');S.day++;save();return (S.f.e2l98After||0)+':'+(/Not collected|Book’s closed|don’t water it|PAID|takes the four|made the soup|car park/.test(t)?'r':'-')+(/tea for two|truck apart|seven down/.test(t)?'B':'')});seq.push(r)}
  ok(seq.slice(0,7).join(' ')==='1:r 2:r 3:r 4:r 5:r 6:r 7:r','seven mornings, in order: '+seq.join(' '));ok(!seq.join('').includes('B'),'the original aftermath does not play');
  ok(await ev(()=>S.f.kdAfterN>=KD_AFTER.length),'and will not start afterwards')}
 /* (e) */
 {const src=require('fs').readFileSync(path.join(ROOT,'src/kc98.js'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/door hanging by one hinge/g,'');
  ok(!/\b(rope|noose|pills|tablets|overdose|razor|hang(ed|ing)?|jump(ed)?|cut (their|your) wrists?|bleed|bled|vein)\b/i.test(src),'nothing about a method');
  ok(!/\b(she|her|hers)\b/.test(src.replace(/Angel[^']*'|her hands shake|she does not stop/g,'')),'they/them for Misaki');
  const all=await ev(()=>window.__all);const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who)’(?:s|re|ve|ll|d|m)\b/i;
  const vb=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vb.length,'V never contracts: '+vb.slice(0,2).map(x=>x[1]).join(' || '))}
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
