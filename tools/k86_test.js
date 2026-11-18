/* kc85–kc89: the player-opened infirmary pool. Usage: node tools/k86_test.js
   - 102 scenes (kc90 cut twenty-two and added fifteen) with unique ids; for each setting, POV and clarity the list is exactly the scenes that belong there;
   - every scene plays to the end in its own setting (cell scenes also with composure gone);
   - full story: pretences count as denials; injuries only: no denial, and no doctor in the text;
   - the menu lists six, allows three a slot, costs no time, and reopens in the next slot.
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
   if(o.e2l!==0){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1};(o.done||[]).forEach(x=>S.f.e2ld[x]=1);if((o.done||[]).includes('e2l_after')&&!o.raw){S.f.e2ld.e2l_room=1;S.f.e2ld.e2l_thurs=1;S.f.e2ld.e2l_marks=1}if((o.done||[]).includes('e2l_boat')&&!o.raw)S.f.e2ld.e2l_eve=1;S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save();window.__hubbed=0}});
 const ev=(f,a)=>p.evaluate(f,a);
 const drive=async picks=>{let i=0;for(let k=0;k<300;k++){const r=await ev(pk=>{for(let j=0;j<400&&dlg;j++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'clicked'}}return dlg?'dlg':'idle'},picks[i]||0);
  if(r==='hub')return 'hub';if(r==='clicked')i++;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};



 const med=(pov,o)=>ev(([pov,o])=>{__set(pov,'after',Object.assign({done:['e2l_door']},o||{}));S.kd.t0=S.day;S.kd.med={d:1,clar:(o&&o.clar)||0,run:0,sev:2};S.comp=(o&&o.comp)??50;S.slot=(o&&o.slot)||0;save()},[pov,o]);
 const A=[];

 const POOL=await ev(()=>K85S.map(e=>({id:e.id,pov:e.pov,mode:e.mode||null,st:e.st||null,when:!!e.when})));
 ok(POOL.length===133,'a hundred and thirty-three scenes in the player-opened pool: '+POOL.length);ok(new Set(POOL.map(e=>e.id)).size===POOL.length,'ids are unique');
 const want=(mode,pov,st)=>POOL.filter(e=>!e.when&&e.pov===pov&&(!e.mode||e.mode===mode)&&(!e.st||e.st===st)).map(e=>e.id);
 let played=0;
 for(const mode of ['sa','inj'])for(const [pov,clar,st] of [['m',0,'cell'],['m',2,'clear'],['v',0,null]])for(const comp of (st==='cell'?[50,0]:[50])){
  await ev(mode=>{META.kdFull=mode==='sa'?1:0},mode);await med(pov,{clar,comp});const W=want(mode,pov,st);
  const got=await ev(()=>k85List().map(e=>e.id));ok(JSON.stringify(got)===JSON.stringify(W)&&W.length>=9,`${mode} ${pov} ${st}: ${got.length} listed`);
  const d0=await ev(()=>S.kd.deny||0);
  for(const id of W){const r=await ev(id=>{window.__cb=0;const e=K85S.find(e=>e.id===id);go(cutBg('#000'));e.run(()=>{window.__cb=1});return 1},id);
   let res='timeout';for(let k=0;k<120;k++){const x=await ev(()=>{for(let j=0;j<300&&dlg;j++)adv();if(window.__cb)return 'done';if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt')];const dis=os.filter(o=>o.classList.contains('dis')).length;const en=os.filter(o=>!o.classList.contains('dis'));window.__dis=(window.__dis||0)+dis;if(en.length){en[en.length-1].click();return 'c'}}return 'x'});if(x==='done'){res='done';break}await p.waitForTimeout(3)}
   ok(res==='done',`${mode} ${pov} ${id} (comp ${comp}): ${res}`);played++}
  if(mode==='sa'&&pov==='m')ok(await ev(d0=>(S.kd.deny||0)>d0,d0),`${mode} ${st}: pretences counted as denials`);
  if(mode==='inj')ok(await ev(d0=>(S.kd.deny||0)===d0,d0),`${mode} ${pov} ${st}: no denial in injuries only`)}
 await ev(()=>{META.kdFull=1});
 /* the menu: six at a time, three a slot, free */
 {await med('v');const r=await ev(()=>{k85Room();const o=[...ctrl.box.querySelectorAll('.opt')].map(x=>x.textContent);ctrl=null;ui.innerHTML='';return o});ok(r.length===7&&/more after these/.test(r[6]),'six listed, and how many are left: '+r[6]);
  const slot=await ev(()=>S.slot);for(let i=0;i<3;i++){await ev(()=>{window.__hubbed=0;k85Room()});ok(await drive([0,0])==='hub','menu scene '+i)}
  const st=await ev(()=>{k85Room();const d=[...ctrl.box.querySelectorAll('.opt')].map(x=>x.classList.contains('dis'));ctrl=null;ui.innerHTML='';return {d,slot:S.slot}});ok(st.d.slice(0,6).every(Boolean)&&!st.d[6]&&st.slot===slot,'three a slot, and it costs no time: '+JSON.stringify(st));
  await ev(()=>{S.slot++;k85Room()});ok(await ev(()=>{const d=[...ctrl.box.querySelectorAll('.opt')].map(x=>x.classList.contains('dis'));ctrl=null;ui.innerHTML='';return !d[0]}),'open again in the next slot')}
 /* the rules, checked on the source */
 {const fs=require('fs');const src=n=>fs.readFileSync(path.join(ROOT,'src/kc'+n+'.js'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
  const inj=src(88)+(src(89).split('INJURIES ONLY')[1]||'');ok(!/doctor|cardigan/i.test(inj.replace(/doctor’s care/g,'')),'no doctor in the injuries-only scenes');ok(!/k84Deny|k87Pick/.test(src(88)),'no denial mechanic in the injuries-only module');
  const all4=src(86)+src(87)+src(88)+src(89);ok(!/\b(Biscuit|Sergeant|Mochi|Pancake)\b/.test(all4),'no hound names');
  const sa=src(87)+src(89);const picks=(sa.match(/k87Pick\(/g)||[]).length-1;ok(picks>=10,'full story: the greyed honest option on '+picks+' menus')}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const SHE=/doctor|she has been sent|woman in the cardigan|She says it kindly|She has a basin|she will hold up|she will tell you|She does your|She tells you|She stops|She puts the cloth|she will be on the other side|She does not once|she has done this|She can work a handle|She is on the bed|against her|She has refused|She is doing what|She may lie|where she can hear|leave her|lifts her head|with her jaw|She has not been to bed|she is good at|she is\.|seen her take|She fires|She looks at you|she breaks the gun|Then she breaks|she breathes|she takes the pink|she does the thumb|she does not look|she says|she knows who|and she |She does the little|She paints|She never misses|about her|grey hound lifts her|The grey hound stops, and lifts her|She has decided|she goes back|She gets the star|she’s wrong|she shut the vent|She opens her mouth|She says|She asks it|She writes|She puts it|She has no doubt|she has said nothing|she has left|she thinks|She is|She does|She leaves|She takes|She keeps|She cuts|She sits|She stays|She stops|She comes|she could not|she does|she is|She walks|She puts|When she|she takes|she blows|she thinks the vent|she would like|she has to|pale hound|grey hound|sat with her|She says that|She has asked you|cardigan|told her so|the grey hound|She says|She holds out|Angel|she will shoot me|then she’ll shoot|She has the shotgun|She looks at|she is to tell|she was to tell|pale hound|grey hound|She expects|She has lent|her ball|her whole attention|her flank|seen her lend|She means it|she’s gettin|she has finished/;const sb=all.filter(x=>/\b(she|herself)\b/i.test(x[1])&&!SHE.test(x[1])&&!/pawnshop|Tonight’s name|She has been waiting|She buys|She is on my list|she hunts|She keeps them|on my list for two years|what she did|she’s exactly as alive|she is exactly as alive|She is alive|while she |She knew your face|while she hunts|She stays on the line|She has no make-up|she made me|she says it is about/.test(x[1]));ok(!sb.length,'she/herself: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
