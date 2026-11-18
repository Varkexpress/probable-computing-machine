/* kc95: talking, after. Usage: node tools/k95_test.js
   (a) the later-phase talk menu: the stage follows the route (wary / know / cold); both ways; every topic; three a
       day; not off the route, not in the early game, the infirmary, after the boat or the epilogue.
   (b) the epilogue menu has five scenes, lovers and rivals.  (c) the two mornings.  (d) ending lines.
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



 const PRE=['e2l_door','e2l_after','e2l_car'];
 const stageSet=(pov,st)=>ev(([pov,st,PRE])=>{const done=PRE.concat(st==='wary'?[]:st==='know'?['e2l_know']:['e2l_know','e2l_test','e2l_row']);__set(pov,st==='cold'?'act3':'act2',{done,f:st==='cold'?{e2lRow:'said'}:{}})},[pov,st,PRE]);
 /* (a) the talk menu: by stage, both ways, every topic, three a day */
 for(const pov of ['m','v'])for(const st of ['wary','know','cold']){const w=pov==='m'?'v':'m';await stageSet(pov,st);
  ok(await ev(()=>k95Stage())===st,`${pov} stage ${st}: ${await ev(()=>k95Stage())}`);
  for(let i=0;i<5;i++){await ev(w=>{S.done={};window.__hubbed=0;convo(w,'x')},w);
   const r=await ev(i=>{for(let j=0;j<60&&dlg;j++)adv();if(!ctrl||!ctrl.box)return 'no menu';const os=[...ctrl.box.querySelectorAll('.opt')];if(os.length!==6)return 'opts '+os.length;const hint=ctrl.box.parentElement.textContent;os[i].click();for(let j=0;j<120&&dlg;j++)adv();
     const again=ctrl&&ctrl.box?[...ctrl.box.querySelectorAll('.opt')].length:0;return /3 things left/.test(hint)&&again===6?'ok':'bad '+again},i);ok(r==='ok',`${pov} ${st} topic ${i}: ${r}`);await ev(()=>{ctrl=null;dlg=null;ui.innerHTML=''})}
  const n=await ev(()=>Object.keys(S.talks||{}).filter(k=>/^k95_/.test(k)).length);ok(n>=5,`${pov} ${st}: five topics recorded (${n})`);
  const out=await ev(w=>{S.done={};convo(w,'x');for(let j=0;j<60&&dlg;j++)adv();for(let k=0;k<3;k++){ctrl.box.querySelectorAll('.opt')[k].click();for(let j=0;j<120&&dlg;j++)adv()}const left=!(ctrl&&ctrl.box&&ctrl.box.querySelectorAll('.opt').length===6);ctrl=null;dlg=null;ui.innerHTML='';window.__n0=window.__all.length;convo(w,'x');for(let j=0;j<20&&dlg;j++)adv();return left&&/enough for|done for today|we’re done/i.test(window.__all.slice(window.__n0).map(x=>x[1]).join(' '))},w);ok(out,`${pov} ${st}: three a day, then “enough”`);await ev(()=>{ctrl=null;dlg=null;ui.innerHTML=''})}
 /* where it does not apply */
 for(const [name,fn] of [['off the route',()=>{__set('m','act2',{done:['e2l_door','e2l_after','e2l_car'],e2l:0})}],['after the boat',()=>{__set('m','act3',{done:['e2l_door','e2l_boat'],f:{e2lEnd:'lovers'}})}],['in the early game',()=>{__set('m','normal',{done:['e2l_eye']})}],['in the epilogue',()=>{__set('m','epilogue',{done:['e2l_door'],f:{e2lEnd:'rivals'}})}]])
  ok(await ev(src=>{(eval('('+src+')'))();return k95Stage()===null},fn.toString()),'no route talk '+name);
 await med('m');ok(await ev(()=>k95Stage()===null),'no route talk in the infirmary');
 /* (b) a year on: five scenes now, both outcomes */
 for(const pov of ['m','v'])for(const end of ['lovers','rivals']){await ev(([pov,end])=>__set(pov,'epilogue',{done:['e2l_epi'],f:{e2lEnd:end}}),[pov,end]);
  for(let i=0;i<5;i++){await ev(()=>{S.done={};window.__hubbed=0;k83Epi()});ok(await drive([0])==='hub',`${pov} ${end} year-on scene ${i}`)}
  ok(await ev(()=>Object.keys(S.f.e2l83).sort().join()==='hound,number,race,table,trailer'&&!k83EpiOk()),`${pov} ${end}: five, then closed`)}
 /* (c) the mornings */
 const keep=await ev(()=>window.__all.length);
 for(const pov of ['m','v'])for(const [id,ph,done] of [['m95_rent','after',['e2l_door','e2l_after']],['m95_coffee','act2',['e2l_door','e2l_after','e2l_car']]]){
  const r=await ev(([pov,id,ph,done])=>{__set(pov,ph,{done});delete S.seen[id];S.seen.m82_wall=1;S.seen.m78_ronin=1;S.seen.m78_angel=1;delete S.f.e2lMornDay;delete S.f.mbDay;try{morningEvent(()=>{})}catch(e){return 'threw '+e.message}for(let j=0;j<80&&dlg;j++)adv();return S.seen[id]?'ok':'no'},[pov,id,ph,done]);ok(r==='ok',`${pov} ${id}: ${r}`)}
 await ev(keep=>{window.__all.length=keep},keep);
 for(const pov of ['m','v'])ok(await ev(pov=>{__set(pov,'act2',{done:['e2l_door','e2l_after','e2l_car']});let n=0;K95MORN.forEach(e=>{e.run(()=>{n++});for(let j=0;j<60&&dlg;j++)adv()});return n===2},pov),pov+' morning scenes finish');
 /* (d) endings */
 for(const [f,seen,rx] of [[{},{m95_rent:1},/keeping a debtor’s property/],[{},{m95_coffee:1},/prove it/],[{e2l83:{trailer:1},e2lEnd:'rivals'},{},/Six minutes|six minutes/],[{e2l83:{number:1},e2lEnd:'lovers'},{},/one number on his fridge/]]){
  const L=await ev(([f,seen])=>{__set('m','epilogue',{f});Object.assign(S.seen,seen);return extraEnding().join(' | ')},[f,seen]);ok(rx.test(L),'ending '+JSON.stringify([f,seen]));
  const L0=await ev(([f,seen])=>{__set('m','epilogue',{f,e2l:0});Object.assign(S.seen,seen);return extraEnding().join(' | ')},[f,seen]);ok(!rx.test(L0),'ending off the route '+JSON.stringify([f,seen]))}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const SHE=/doctor|She made you tea|she put her pen down|chair of the board|She does not once say|woman in the cardigan|She says it kindly|She has a basin|She does your|She tells you|She stops|She puts the cloth|she will|she has done this|she has been sent|She can work a handle|She is on the bed|She has refused|She is doing what|She may lie|where she can hear|leave her|lifts her head|with her jaw|against her|You tell her|She nods|She looks at you for a moment|She puts the cup down|Angel is in the kitchen|she has not drunk|She wants the wrists|woman in the cardigan|She has a short|She says|She puts|She asks|She takes four|She lays|She tells you|When she has gone|She has the ruler|she is not moving|she would like|The woman has stopped|grey hound stops, and lifts her|She has decided|she goes back|Then she goes back|She says that|She has asked you|cardigan|told her so|the grey hound|She says|She holds out|Angel|she will shoot me|then she’ll shoot|She has the shotgun|She looks at|she is to tell|she was to tell|pale hound|grey hound|She expects|She has lent|her ball|her whole attention|her flank|seen her lend|She means it|she’s gettin|she has finished/;const sb=all.filter(x=>/\b(she|herself)\b/i.test(x[1])&&!SHE.test(x[1])&&!/pawnshop|Tonight’s name|She has been waiting|She buys|She is on my list|she hunts|She keeps them|on my list for two years|what she did|she’s exactly as alive|she is exactly as alive|She is alive|while she |She knew your face|while she hunts|She stays on the line|She has no make-up|she made me|she says it is about/.test(x[1]));ok(!sb.length,'she/herself: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
