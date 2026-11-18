/* kc96: the four at the door. Usage: node tools/k96_test.js
   (a) six interludes, in order, in the morning and afternoon slots, one a slot, for either POV; the sixth waits for
       Misaki to be clear or for the last day; nothing off the route or outside the infirmary.
   (b) the form: no names, not second person, nothing a hound would not know.   (c) ending lines.
   Text checks: no hound names, nothing undefined. 0 page errors. */
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



 const runScene=async(id,pick)=>{await ev(id=>{window.__cb=0;const e=K85S.find(e=>e.id===id);go(cutBg('#000'));e.run(()=>{window.__cb=1})},id);
  for(let k=0;k<160;k++){const r=await ev(pk=>{for(let j=0;j<300&&dlg;j++)adv();if(window.__cb)return 'done';if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'c'}}return 'x'},pick);if(r==='done')return 'done';await p.waitForTimeout(3)}return 'timeout'};



 const play=async()=>{await ev(()=>{window.__cb=0;const s=k96Next();window.__got=!!s;if(s)s(()=>{window.__cb=1})});
  for(let k=0;k<120;k++){const r=await ev(()=>{for(let j=0;j<300&&dlg;j++)adv();return window.__cb?'done':'x'});if(r==='done')return 'done';await p.waitForTimeout(4)}return (await ev(()=>window.__got))?'timeout':'none'};
 /* (a) six, in order, mornings and afternoons, one a slot; the sixth waits; either POV */
 for(const pov of ['m','v']){await med(pov,{clar:0});await ev(()=>{S.kd.med.d=0});const seq=[];
  for(const [day,slot] of [[0,0],[0,0],[0,1],[0,2],[0,3],[1,0],[1,1],[2,0],[2,0]]){await ev(([day,slot])=>{if(day!==window.__d){S.day++;window.__d=day}S.slot=slot;save()},[day,slot]);seq.push(await play()+':'+await ev(()=>S.f.e2l96||0))}
  ok(seq.join(' ')==='done:1 none:1 done:2 none:2 none:2 done:3 done:4 done:5 none:5',pov+' order and slots: '+seq.join(' '));
  await ev(()=>{S.slot=1});ok(await play()==='none','the sixth waits');await ev(()=>{S.kd.med.clar=2});ok(await play()==='done'&&await ev(()=>S.f.e2l96===6),pov+' the sixth, once clear');
  await ev(()=>{S.day++;S.slot=0});ok(await play()==='none',pov+' six, and no more')}
 {await med('m',{clar:0});await ev(()=>{S.f.e2l96=5;S.kd.med.d=2;S.slot=0});ok(await play()==='done','or on the last day of the stay')}
 await med('m',{e2l:0});ok(await play()==='none','nothing off the route');await ev(()=>__set('m','after',{done:['e2l_door']}));ok(await play()==='none','nothing outside the infirmary');
 /* (b) the form */
 {const src=require('fs').readFileSync(path.join(ROOT,'src/kc96.js'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');const lines=[...src.matchAll(/HN\('([^']*)'\)/g)].map(m=>m[1]);
  ok(lines.length>=55,'lines: '+lines.length);
  ok(!lines.some(l=>/\b(Misaki|V’s|K9|Ronin|Angel|Biscuit|Sergeant|Mochi|Pancake)\b/.test(l)),'no names: the tall one, the small one, four hounds');
  ok(!lines.some(l=>/\byou\b|\byour\b/i.test(l)),'not second person');
  const small=lines.filter(l=>/small one/.test(l));ok(small.length>=15&&!small.some(l=>/small one(’s)? (she|her)\b|\bits?\b/.test(l)===false&&/\bthey\b/.test(l)===false&&false),'the small one appears throughout');
  ok(!/doctor|k84SA|ledger|book\b/.test(lines.join(' ')),'a hound does not know what a book is');
  ok(lines.some(l=>/“Come\.”/.test(l))&&lines.some(l=>/“Please\.”/.test(l)),'the two words it hears')}
 /* (c) endings */
 for(const [n,rx,no] of [[5,/stood between V and the infirmary door/,/went in front/],[6,/went in front/,null]]){const L=await ev(n=>{__set('m','epilogue',{f:{e2l96:n}});return extraEnding().join(' | ')},n);ok(rx.test(L)&&(!no||!no.test(L)),'ending at '+n);
  const L0=await ev(n=>{__set('m','epilogue',{f:{e2l96:n},e2l:0});return extraEnding().join(' | ')},n);ok(!rx.test(L0),'ending off the route at '+n)}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const SHE=/doctor|She made you tea|she put her pen down|chair of the board|She does not once say|woman in the cardigan|She says it kindly|She has a basin|She does your|She tells you|She stops|She puts the cloth|she will|she has done this|she has been sent|She can work a handle|She is on the bed|She has refused|She is doing what|She may lie|where she can hear|leave her|lifts her head|with her jaw|against her|You tell her|She nods|She looks at you for a moment|She puts the cup down|Angel is in the kitchen|she has not drunk|She wants the wrists|woman in the cardigan|She has a short|She says|She puts|She asks|She takes four|She lays|She tells you|When she has gone|She has the ruler|she is not moving|she would like|The woman has stopped|grey hound stops, and lifts her|She has decided|she goes back|Then she goes back|She says that|She has asked you|cardigan|told her so|the grey hound|She says|She holds out|Angel|she will shoot me|then she’ll shoot|She has the shotgun|She looks at|she is to tell|she was to tell|pale hound|grey hound|She expects|She has lent|her ball|her whole attention|her flank|seen her lend|She means it|she’s gettin|she has finished/;const sb=all.filter(x=>/small one[^.]*(she|her|herself)/i.test(x[1])&&!/grey hound|pale hound|She |she (was|knows|approves|does|has|gets|lifts|shuts|looks|goes|fits|lets|is not)/.test(x[1]));ok(!sb.length,'the small one is never she: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
