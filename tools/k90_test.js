/* kc90: the nights, and two beats. Usage: node tools/k90_test.js   (kc90's pool scenes are covered by k86_test)
   (a) the three nights: late slot only, one a night, in order; both settings, both POVs, both options; night II in
       full story counts as a denial for Misaki and in injuries only does not; night III waits until Misaki is clear;
       delivered by hub; nothing off the route or outside the infirmary.
   (b) e2l_bucket and e2l_table: due in order, both POVs, both options, free, on the war page.
   (c) ending lines.
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
   if(o.e2l!==0){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1};(o.done||[]).forEach(x=>S.f.e2ld[x]=1);if(!o.raw90){if((o.done||[]).includes('e2l_show')||(o.done||[]).includes('e2l_kennel'))S.f.e2ld.e2l_bucket=1;if((o.done||[]).includes('e2l_pair'))S.f.e2ld.e2l_table=1}if((o.done||[]).includes('e2l_after')&&!o.raw){S.f.e2ld.e2l_room=1;S.f.e2ld.e2l_thurs=1;S.f.e2ld.e2l_marks=1}if((o.done||[]).includes('e2l_boat')&&!o.raw)S.f.e2ld.e2l_eve=1;S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save();window.__hubbed=0}});
 const ev=(f,a)=>p.evaluate(f,a);
 const drive=async picks=>{let i=0;for(let k=0;k<300;k++){const r=await ev(pk=>{for(let j=0;j<400&&dlg;j++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'clicked'}}return dlg?'dlg':'idle'},picks[i]||0);
  if(r==='hub')return 'hub';if(r==='clicked')i++;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};



 const med=(pov,o)=>ev(([pov,o])=>{__set(pov,'after',Object.assign({done:['e2l_door']},o||{}));S.kd.t0=S.day;S.kd.med={d:1,clar:(o&&o.clar)||0,run:0,sev:2};S.comp=(o&&o.comp)??50;S.slot=(o&&o.slot)||0;save()},[pov,o]);

 /* (a) the nights: delivered by hub in the late slot, one a night, in order, by setting and POV */
 const night=async(pick)=>{await ev(()=>{window.__cb=0;const s=k90Night();window.__got=!!s;if(s)s(()=>{window.__cb=1})});
  for(let k=0,i=0;k<200;k++){const r=await ev(pk=>{for(let j=0;j<300&&dlg;j++)adv();if(window.__cb)return 'done';if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'c'}}return 'x'},pick);if(r==='done')return 'done';await p.waitForTimeout(4)}
  return (await ev(()=>window.__got))?'timeout':'none'};
 for(const mode of ['sa','inj'])for(const pov of ['m','v'])for(const pick of [0,1]){await ev(mode=>{META.kdFull=mode==='sa'?1:0},mode);await med(pov,{clar:0});const d0=await ev(()=>S.kd.deny||0);
  await ev(()=>{S.slot=2});ok(await night(pick)==='none',`${mode} ${pov} no night before the late slot`);
  await ev(()=>{S.slot=3});ok(await night(pick)==='done'&&await ev(()=>S.f.e2l90N===1&&!!S.f.e2lN1),`${mode} ${pov} night I #${pick}: ${await ev(()=>S.f.e2lN1)}`);
  ok(await night(pick)==='none',`${mode} ${pov} one a night`);
  await ev(()=>{S.day++;S.slot=3});ok(await night(pick)==='done'&&await ev(()=>S.f.e2l90N===2&&!!S.f.e2lN2),`${mode} ${pov} night II #${pick}: ${await ev(()=>S.f.e2lN2)}`);
  if(pov==='m')ok(await ev(([d0,sa])=>(S.kd.deny||0)===d0+(sa?1:0),[d0,mode==='sa']),`${mode} night II: ${mode==='sa'?'the pretence is a denial':'no denial'}`);
  await ev(()=>{S.day++;S.slot=3});if(pov==='m'){ok(await night(pick)==='none',`${mode} night III waits until Misaki is clear`);await ev(()=>{S.kd.med.clar=2})}
  ok(await night(pick)==='done'&&await ev(()=>S.f.e2l90N===3&&!!S.f.e2lN3),`${mode} ${pov} night III #${pick}: ${await ev(()=>S.f.e2lN3)}`);
  await ev(()=>{S.day++;S.slot=3});ok(await night(pick)==='none',`${mode} ${pov} three nights, and no more`)}
 await ev(()=>{META.kdFull=1});
 await med('m',{e2l:0});await ev(()=>{S.slot=3});ok(await night(0)==='none','no nights off the route');
 await ev(()=>{__set('m','after',{done:['e2l_door']});S.slot=3});ok(await night(0)==='none','no nights outside the infirmary');
 /* this harness stubs hub(), so the wrapper is checked on the source */
 ok(/const _hub90=hub;hub=function\(\)\{[^}]*k90Night\(\)/.test(require('fs').readFileSync(path.join(ROOT,'src/kc90.js'),'utf8')),'hub is wrapped to deliver the night');
 /* (b) the two beats */
 const B={e2l_bucket:{ph:'normal',done:['e2l_eye','e2l_show','e2l_lift','e2l_kennel'],fl:'e2lBucket',m:['fed','left'],v:['in','out']},
  e2l_table:{ph:'act2',done:['e2l_after','e2l_marks','e2l_rifle','e2l_fork','e2l_car','e2l_list','e2l_stitch','e2l_pair'],f:{e2lAfter:'war'},fl:'e2lTable',m:['lay','stood'],v:['lay','stood']}};
 for(const id of Object.keys(B))for(const pov of ['m','v'])for(const o of [0,1]){const w=B[id];await ev(([pov,w])=>__set(pov,w.ph,{done:w.done,f:w.f||{},raw90:1}),[pov,w]);
  const r0=await ev(()=>{const b=k73Due();const x=b&&sideHub(false).find(x=>x.t==='⚔ '+b.t());if(!x)return 'none:'+(b&&b.id);window.__sub=x.sub;x.fn();return b.id});const r=await drive([o]);
  const st=await ev(([fl,id])=>({f:S.f[fl],done:!!S.f.e2ld[id],last:S.f.e2lLast===S.day,sub:window.__sub,pg:k76Line(id)}),[w.fl,id]);
  ok(r0===id&&r==='hub'&&st.f===w[pov][o]&&st.done&&!st.last&&st.pg.length>30&&/the war · (I|III) · \d+ of \d+/.test(st.sub),`${id} ${pov} #${o}: ${r0} ${r} ${JSON.stringify(st).slice(0,170)}`)}
 for(const pov of ['m','v']){await ev(pov=>__set(pov,'normal',{done:['e2l_eye','e2l_show','e2l_lift'],raw90:1}),pov);ok(await ev(()=>(k73Due()||{}).id)==='e2l_kennel',pov+' the bucket waits for the kennel');
  await ev(pov=>__set(pov,'act2',{done:['e2l_after','e2l_marks','e2l_rifle','e2l_fork','e2l_car','e2l_list','e2l_stitch','e2l_pair'],f:{e2lAfter:'war'},raw90:1}),pov);await ev(()=>{S.f.e2ld.e2l_table=1});ok(await ev(()=>(k73Due()||{}).id)==='e2l_spar',pov+' the mat follows the table')}
 /* (c) endings */
 for(const [f,rx] of [[{e2lN1:'yard'},/far wall/],[{e2lN1:'bowl'},/It was chicken/],[{e2lN3:'chain'},/chain on the door/],[{e2lN3:'ear'},/never told him/],[{e2lTable:'lay'},/He said please/],[{e2lBucket:'fed'},/still on his muzzle/]]){
  const L=await ev(f=>{__set('m','epilogue',{f});return extraEnding().join(' | ')},f);ok(rx.test(L),'ending '+JSON.stringify(f));const L0=await ev(f=>{__set('m','epilogue',{f,e2l:0});return extraEnding().join(' | ')},f);ok(!rx.test(L0),'ending off the route '+JSON.stringify(f))}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const SHE=/doctor|She wants the wrists|woman in the cardigan|She has a short|She says|She puts|She asks|She takes four|She lays|She tells you|When she has gone|She has the ruler|she is not moving|she would like|The woman has stopped|grey hound stops, and lifts her|She has decided|she goes back|Then she goes back|She says that|She has asked you|cardigan|told her so|the grey hound|She says|She holds out|Angel|she will shoot me|then she’ll shoot|She has the shotgun|She looks at|she is to tell|she was to tell|pale hound|grey hound|She expects|She has lent|her ball|her whole attention|her flank|seen her lend|She means it|she’s gettin|she has finished/;const sb=all.filter(x=>/\b(she|herself)\b/i.test(x[1])&&!SHE.test(x[1])&&!/pawnshop|Tonight’s name|She has been waiting|She buys|She is on my list|she hunts|She keeps them|on my list for two years|what she did|she’s exactly as alive|she is exactly as alive|She is alive|while she |She knew your face|while she hunts|She stays on the line|She has no make-up|she made me|she says it is about/.test(x[1]));ok(!sb.length,'she/herself: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
