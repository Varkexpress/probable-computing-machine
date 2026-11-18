/* kc94: the thought, again. Usage: node tools/k94_test.js
   (a) V's seven scenes: in order, one a slot, free, both options of the sixth; the seventh waits until Misaki is
       themselves; the war page shows the count.
   (b) Misaki's: three while the room is a cell, two once clear.
   (c) nothing off the route or outside the infirmary; no doctor; the same text under both settings.  (d) endings.
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
   if(o.e2l!==0){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1};(o.done||[]).forEach(x=>S.f.e2ld[x]=1);if(!o.raw90){if((o.done||[]).includes('e2l_show')||(o.done||[]).includes('e2l_kennel'))S.f.e2ld.e2l_bucket=1;if((o.done||[]).includes('e2l_pair'))S.f.e2ld.e2l_table=1}if((o.done||[]).includes('e2l_after')&&!o.raw){S.f.e2ld.e2l_room=1;S.f.e2ld.e2l_thurs=1;S.f.e2ld.e2l_marks=1;S.f.e2ld.e2l_green=1}if((o.done||[]).includes('e2l_boat')&&!o.raw)S.f.e2ld.e2l_eve=1;S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save();window.__hubbed=0}});
 const ev=(f,a)=>p.evaluate(f,a);
 const drive=async picks=>{let i=0;for(let k=0;k<300;k++){const r=await ev(pk=>{for(let j=0;j<400&&dlg;j++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'clicked'}}return dlg?'dlg':'idle'},picks[i]||0);
  if(r==='hub')return 'hub';if(r==='clicked')i++;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};



 const med=(pov,o)=>ev(([pov,o])=>{__set(pov,'after',Object.assign({done:['e2l_door']},o||{}));S.kd.t0=S.day;S.kd.med={d:1,clar:(o&&o.clar)||0,run:0,sev:2};S.comp=(o&&o.comp)??50;S.slot=(o&&o.slot)||0;save()},[pov,o]);



 const runScene=async(id,pick)=>{await ev(id=>{window.__cb=0;const e=K85S.find(e=>e.id===id);go(cutBg('#000'));e.run(()=>{window.__cb=1})},id);
  for(let k=0;k<160;k++){const r=await ev(pk=>{for(let j=0;j<300&&dlg;j++)adv();if(window.__cb)return 'done';if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'c'}}return 'x'},pick);if(r==='done')return 'done';await p.waitForTimeout(3)}return 'timeout'};


 const ENT='^⚔ (The thought|What you want)';const side=rx=>ev(rx=>sideHub(false).filter(o=>new RegExp(rx).test(o.t||'')).length,rx);
 const step=async(pick)=>{await ev(rx=>{window.__hubbed=0;sideHub(false).find(o=>new RegExp(rx).test(o.t||'')).fn()},ENT);return drive([pick||0])};
 /* (a) V: seven, in order, one a slot, free; the last waits until they are themselves */
 for(const pick of [0,1]){await med('v',{clar:0});const slot0=await ev(()=>S.slot);const seq=[];
  for(let i=0;i<6;i++){ok(await side(ENT)===1,'V entry offered '+i);const lab=await ev(()=>sideHub(false).find(o=>/^⚔ The thought/.test(o.t||'')));seq.push(await step(pick)+':'+await ev(()=>S.f.e2l94V));
   ok(await side(ENT)===0,'V one a slot '+i);await ev(()=>{S.slot++;if(S.slot>3){S.slot=0;S.day++}})}
  ok(seq.join(' ')==='hub:1 hub:2 hub:3 hub:4 hub:5 hub:6'&&await ev(p=>S.f.e2lTotal===['blot','T'][p],pick),`V sequence #${pick}: ${seq.join(' ')} ${await ev(()=>S.f.e2lTotal)}`);
  await ev(()=>{S.kd.med.clar=0;S.kd.med.d=1});ok(await side(ENT)===0,'the seventh waits');
  await ev(()=>{S.kd.med.clar=2});ok(await side(ENT)===1&&await step(0)==='hub'&&await ev(()=>S.f.e2l94V===7),'the seventh, once they are themselves');
  await ev(()=>{S.slot=(S.slot+1)%4;S.day++});ok(await side(ENT)===0,'seven, and no more');
  ok(/Times you have set out to do it:<\/b> 7/.test(await ev(()=>{k76Page(()=>{});const el=document.querySelector('.panel');const h=el?el.innerHTML:'';ctrl=null;ui.innerHTML='';return h})),'the war page shows the count')}
 ok(/again/.test(await ev(()=>{S.f.e2l94V=2;S.f.e2l94Slot='x';return k94Label().t}))&&/2 times/.test(await ev(()=>k94Label().sub)),'the label counts');
 /* (b) Misaki: three while the room is a cell, two once clear */
 {await med('m',{clar:0});const seq=[];for(let i=0;i<4;i++){const n=await side(ENT);seq.push(n?await step(0)+':'+await ev(()=>S.f.e2l94M):'none');await ev(()=>{S.slot++;if(S.slot>3){S.slot=0;S.day++}})}
  ok(seq.join(' ')==='hub:1 hub:2 hub:3 none','Misaki cell: '+seq.join(' '));
  await ev(()=>{S.kd.med.clar=2});const s2=[];for(let i=0;i<3;i++){const n=await side(ENT);s2.push(n?await step(0)+':'+await ev(()=>S.f.e2l94X):'none');await ev(()=>{S.slot++;if(S.slot>3){S.slot=0;S.day++}})}
  ok(s2.join(' ')==='hub:1 hub:2 none','Misaki clear: '+s2.join(' '))}
 /* (c) nothing off the route or outside the infirmary; same text under both settings */
 await med('v',{e2l:0});ok(await side(ENT)===0,'nothing off the route');await ev(()=>__set('v','after',{done:['e2l_door']}));ok(await side(ENT)===0,'nothing outside the infirmary');
 {const src=require('fs').readFileSync(path.join(ROOT,'src/kc94.js'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');ok(!/doctor|cardigan|k84SA|k84Deny/.test(src),'no doctor, no setting switch');ok((src.match(/sick/g)||[]).length>=5,'he is sickened, repeatedly')}
 /* (d) endings */
 for(const [f,rx] of [[{e2l94V:7},/Seven times his own body/],[{e2l94V:3},/set out 3 times/],[{e2lTotal:'blot'},/one blot/],[{e2lTotal:'T'},/one upright stroke/],[{e2l94M:3},/forty times to a smoke detector/],[{e2l94X:2},/He kneels in it/]]){
  const L=await ev(f=>{__set('m','epilogue',{f});return extraEnding().join(' | ')},f);ok(rx.test(L),'ending '+JSON.stringify(f));const L0=await ev(f=>{__set('m','epilogue',{f,e2l:0});return extraEnding().join(' | ')},f);ok(!rx.test(L0),'ending off the route '+JSON.stringify(f))}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const SHE=/doctor|She made you tea|she put her pen down|chair of the board|She does not once say|woman in the cardigan|She says it kindly|She has a basin|She does your|She tells you|She stops|She puts the cloth|she will|she has done this|she has been sent|She can work a handle|She is on the bed|She has refused|She is doing what|She may lie|where she can hear|leave her|lifts her head|with her jaw|against her|You tell her|She nods|She looks at you for a moment|She puts the cup down|Angel is in the kitchen|she has not drunk|She wants the wrists|woman in the cardigan|She has a short|She says|She puts|She asks|She takes four|She lays|She tells you|When she has gone|She has the ruler|she is not moving|she would like|The woman has stopped|grey hound stops, and lifts her|She has decided|she goes back|Then she goes back|She says that|She has asked you|cardigan|told her so|the grey hound|She says|She holds out|Angel|she will shoot me|then she’ll shoot|She has the shotgun|She looks at|she is to tell|she was to tell|pale hound|grey hound|She expects|She has lent|her ball|her whole attention|her flank|seen her lend|She means it|she’s gettin|she has finished/;const sb=all.filter(x=>/\b(she|herself)\b/i.test(x[1])&&!SHE.test(x[1])&&!/pawnshop|Tonight’s name|She has been waiting|She buys|She is on my list|she hunts|She keeps them|on my list for two years|what she did|she’s exactly as alive|she is exactly as alive|She is alive|while she |She knew your face|while she hunts|She stays on the line|She has no make-up|she made me|she says it is about/.test(x[1]));ok(!sb.length,'she/herself: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
