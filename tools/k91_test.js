/* kc91: the drip. Usage: node tools/k91_test.js   (kc91's pool scenes are also covered by k86_test)
   (a) the drip scene opens the infirmary stay for both POVs and both settings; kinking the line or halving the rate
       brings clarity a day sooner, once; leaving it does not.
   (b) the war page's "where it stands" names the drip during the delusion.
   (c) d_cost reads the choice.  (d) the green book beat, both POVs, both options, free.
   (e) ending lines; no drug names or quantities in the source.
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


 const play=async(pick)=>{await ev(()=>{window.__cb=0;const s=k80MedScene();window.__got=!!s;if(s)s(()=>{window.__cb=1})});
  for(let k=0;k<200;k++){const r=await ev(pk=>{for(let j=0;j<300&&dlg;j++)adv();if(window.__cb)return 'done';if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'c'}}return 'x'},pick);if(r==='done')return 'done';await p.waitForTimeout(4)}
  return (await ev(()=>window.__got))?'timeout':'none'};
 /* (a) the drip opens the stay, for both POVs and both settings; the choice and what it does to clarity */
 for(const mode of ['sa','inj'])for(const pov of ['m','v'])for(const pick of [0,1]){await ev(mode=>{META.kdFull=mode==='sa'?1:0},mode);await med(pov,{clar:0});
  if(pov==='v')await ev(()=>{S.f.e2lVM=4;window.__k6=[k61Scene,k62Scene,k63Scene];k61Scene=k62Scene=k63Scene=()=>null});
  const c0=await ev(()=>S.kd.med.clar);const r=await play(pick);const st=await ev(()=>({first:Object.keys(S.f.e2l84||{})[0],dose:S.f.e2lDose,clar:S.kd.med.clar}));
  const want=pov==='m'?['kinked','left'][pick]:['cut','held'][pick];
  ok(r==='done'&&st.first===(pov==='m'?'d_line':'d_dose')&&st.dose===want,`${mode} ${pov} #${pick}: the drip comes first: ${JSON.stringify(st)}`);
  ok(st.clar===c0+(pick===0?1:0),`${mode} ${pov} #${pick}: clarity ${pick===0?'a day sooner':'unchanged'}: ${c0} → ${st.clar}`);
  if(pick===0){await ev(()=>{k91Clear()});ok(await ev(c=>S.kd.med.clar===c,st.clar),`${mode} ${pov}: only once`)}
  if(pov==='v')await ev(()=>{[k61Scene,k62Scene,k63Scene]=window.__k6})}
 await ev(()=>{META.kdFull=1});
 /* (b) the page says so */
 for(const pov of ['m','v']){await med(pov,{clar:0});ok(/drip|pain relief/.test(await ev(()=>k76Stand())),pov+' where it stands names the drip')}
 await med('m',{clar:2});ok(/off the worst of the drip/.test(await ev(()=>k76Stand())),'and that it is easing, once clear');
 /* (c) the cost scene reads the choice */
 for(const d of ['cut','kinked','held','left']){const t=await ev(d=>{__set('v','after',{done:['e2l_door'],f:{e2lDose:d}});window.__n0=window.__all.length;const e=K85S.find(e=>e.id==='d_cost');let c=0;e.run(()=>{c=1});for(let j=0;j<60&&dlg;j++)adv();return window.__all.slice(window.__n0).map(x=>x[1]).join(' ')},d);
  ok((d==='cut'||d==='kinked')===/Seven hours/.test(t)&&(d==='kinked')===/crease in it/.test(t),'d_cost for '+d)}
 /* (d) the green book */
 for(const pov of ['m','v'])for(const o of [0,1]){await ev(pov=>__set(pov,'after',{done:['e2l_door','e2l_after','e2l_room'],raw:1}),pov);
  const r0=await ev(()=>{const b=k73Due();const x=b&&sideHub(false).find(x=>x.t==='⚔ '+b.t());if(!x)return 'none:'+(b&&b.id);x.fn();return b.id});const r=await drive([o]);
  const st=await ev(()=>({f:S.f.e2lGreen,last:S.f.e2lLast===S.day,pg:k76Line('e2l_green')}));ok(r0==='e2l_green'&&r==='hub'&&st.f===['read','unread'][o]&&!st.last&&st.pg.length>30,`green book ${pov} #${o}: ${r0} ${r} ${JSON.stringify(st).slice(0,150)}`)}
 /* (e) endings; no dose or drug name anywhere */
 for(const [f,rx] of [[{e2lDose:'cut'},/halved it/],[{e2lDose:'held'},/took him for a gaoler/],[{e2lDose:'kinked'},/lay on the drip line/],[{e2l85:{d_drugged:1}},/Like they did/]]){
  const L=await ev(f=>{__set('m','epilogue',{f});return extraEnding().join(' | ')},f);ok(rx.test(L),'ending '+JSON.stringify(f));const L0=await ev(f=>{__set('m','epilogue',{f,e2l:0});return extraEnding().join(' | ')},f);ok(!rx.test(L0),'ending off the route '+JSON.stringify(f))}
 {const src=require('fs').readFileSync(path.join(ROOT,'src/kc91.js'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');ok(!/\b(morphine|fentanyl|ketamine|oxycodone|diazepam|midazolam|milligram|\d+\s?mg|\d+\s?ml)\b/i.test(src),'no drug names or quantities')}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const SHE=/doctor|You tell her|She nods|She looks at you for a moment|She puts the cup down|Angel is in the kitchen|she has not drunk|She wants the wrists|woman in the cardigan|She has a short|She says|She puts|She asks|She takes four|She lays|She tells you|When she has gone|She has the ruler|she is not moving|she would like|The woman has stopped|grey hound stops, and lifts her|She has decided|she goes back|Then she goes back|She says that|She has asked you|cardigan|told her so|the grey hound|She says|She holds out|Angel|she will shoot me|then she’ll shoot|She has the shotgun|She looks at|she is to tell|she was to tell|pale hound|grey hound|She expects|She has lent|her ball|her whole attention|her flank|seen her lend|She means it|she’s gettin|she has finished/;const sb=all.filter(x=>/\b(she|herself)\b/i.test(x[1])&&!SHE.test(x[1])&&!/pawnshop|Tonight’s name|She has been waiting|She buys|She is on my list|she hunts|She keeps them|on my list for two years|what she did|she’s exactly as alive|she is exactly as alive|She is alive|while she |She knew your face|while she hunts|She stays on the line|She has no make-up|she made me|she says it is about/.test(x[1]));ok(!sb.length,'she/herself: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
