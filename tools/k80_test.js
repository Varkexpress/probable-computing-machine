/* kc80–kc84: the infirmary, the house menu, one question a day, the edges. Usage: node tools/k80_test.js
   (a) infirmary scenes (kc80, kc83): delivered through the real scheduler in order, one a slot, Misaki's only in the
       morning and afternoon, V's only where kc73 has nothing; every option; nothing outside the infirmary or off the route.
   (b) the house menu (kc81–kc83): when it is offered; every action, first with each option and three repeats; all
       twelve questions each way.
   (c) beats: the room, Thursday, the eve (lovers and rivals), and V's two while Misaki is held.
   (d) a year on: three scenes, lovers and rivals, both POVs.
   (e) location scenes, threads, the morning, ending lines; nothing off the route.
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
   if(o.e2l!==0){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1};(o.done||[]).forEach(x=>S.f.e2ld[x]=1);if(!o.raw90){if((o.done||[]).includes('e2l_kennel'))S.f.e2ld.e2l_bucket=1;if((o.done||[]).includes('e2l_pair'))S.f.e2ld.e2l_table=1}if((o.done||[]).includes('e2l_after')&&!o.raw){S.f.e2ld.e2l_room=1;S.f.e2ld.e2l_thurs=1;S.f.e2ld.e2l_marks=1;S.f.e2ld.e2l_green=1}if((o.done||[]).includes('e2l_boat')&&!o.raw)S.f.e2ld.e2l_eve=1;S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save();window.__hubbed=0}});
 const ev=(f,a)=>p.evaluate(f,a);
 const drive=async picks=>{let i=0;for(let k=0;k<300;k++){const r=await ev(pk=>{for(let j=0;j<400&&dlg;j++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'clicked'}}return dlg?'dlg':'idle'},picks[i]||0);
  if(r==='hub')return 'hub';if(r==='clicked')i++;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};



 const A=['e2l_door','e2l_after'];
 const med=(pov,o)=>ev(([pov,o])=>{__set(pov,'after',Object.assign({done:['e2l_door']},o||{}));S.kd.t0=S.day;S.kd.med={d:1,clar:(o&&o.clar)||0,run:0,sev:2};S.comp=(o&&o.comp)??50;S.slot=(o&&o.slot)||0;save()},[pov,o]);
 const play=async(picks)=>{await ev(()=>{window.__cb=0;const s=k80MedScene();window.__got=!!s;if(s)s(()=>{window.__cb=1})});
  for(let k=0,i=0;k<200;k++){const r=await ev(pk=>{for(let j=0;j<300&&dlg;j++)adv();if(window.__cb)return 'done';if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'c'}}return 'x'},(picks||[])[i]||0);if(r==='done')return 'done';if(r==='c')i++;await p.waitForTimeout(4)}
  return (await ev(()=>window.__got))?'timeout':'none'};
 /* (a) the infirmary: kc84's scheduler, by setting (full story / injuries only) */
 const ORD={sa:{mc:['d_line','ask','rules','s_clothes','hound','s_asks'],mx:['s_book','said','thanks','doctor'],v:['d_dose','message','s_table','file','form','s_voice','vhand','ronin','s_vent','laugh']},
  inj:{mc:['d_line','ask','rules','i_wrists','hound','i_careful'],mx:['i_snob','said','thanks'],v:['d_dose','message','i_manner','file','i_third','vhand','ronin','i_scale','laugh']}};
 for(const mode of ['sa','inj'])for(const comp of [50,0]){await ev(mode=>{META.kdFull=mode==='sa'?1:0},mode);
  await med('m',{comp});const seq=[],slots=[];for(let d=0;d<3;d++)for(const slot of [0,1,2,3]){await ev(([d,slot])=>{S.slot=slot;if(slot===0&&d)S.day++;save()},[d,slot]);const r=await play([1]);if(r==='done')slots.push(slot);seq.push(r)}
  const got=await ev(()=>Object.keys(S.f.e2l84||{}));ok(JSON.stringify(got)===JSON.stringify(ORD[mode].mc)&&!slots.includes(2),`${mode} Misaki cell scenes in order, never in kc73's slot (comp ${comp}): ${got} / slots ${slots}`);ok(await ev(()=>S.f.e2lMedAsk===1),'the message sets its flag');
  for(const o of [1,2]){await med('m',{clar:2,comp});const s2=[];for(let i=0;i<6;i++){await ev(i=>{S.slot=[0,1,3][i%3];if(i===3)S.day++;save()},i);s2.push(await play([o]))}
   const g2=await ev(()=>Object.keys(S.f.e2l84||{}));ok(JSON.stringify(g2)===JSON.stringify(ORD[mode].mx),`${mode} Misaki clear scenes #${o}: ${g2}`)}
  for(const o of [1,2]){await med('v',{f:o===2?{e2lMedAsk:1}:{}});await ev(()=>{S.f.e2lVM=4;save();window.__k6=[k61Scene,k62Scene,k63Scene];k61Scene=k62Scene=k63Scene=()=>null});for(let i=0;i<16;i++){await ev(i=>{S.slot=i%4;if(i&&i%4===0)S.day++;save()},i);await play([o])}
   const g3=await ev(()=>Object.keys(S.f.e2l84||{}));ok(JSON.stringify(g3)===JSON.stringify(ORD[mode].v),`${mode} V scenes #${o}: ${g3}`);await ev(()=>{[k61Scene,k62Scene,k63Scene]=window.__k6})}}
 ok(await ev(()=>{const all=new Set();['mc','mx','v'].forEach(k=>K84_POOLS[k].forEach(e=>all.add(e.id)));return all.size})===27,'twenty-seven infirmary scenes in the pools');
 await ev(()=>{META.kdFull=1});
 await med('v',{slot:1});ok(await play([0])==='none','kc73 goes first in a slot it wants');
 await med('v');await ev(()=>{S.f.e2lVM=4;save();window.__k6=[k61Scene,k62Scene,k63Scene];k61Scene=k62Scene=k63Scene=()=>null});ok(await play([0])==='done'&&await play([0])==='none','one a slot');await ev(()=>{[k61Scene,k62Scene,k63Scene]=window.__k6});
 await ev(()=>__set('v','after',{done:['e2l_door']}));ok(await play([0])==='none','nothing outside the infirmary');
 await med('m',{e2l:0});ok(await play([0])==='none','nothing off the route');
 /* the greyed honest option, the denial count, and the two versions of the beat */
 {await med('m');const d0=await ev(()=>(S.kd.deny||0));await ev(()=>{S.f.e2l84={d_line:1,ask:1,rules:1};S.slot=0;save()});await ev(()=>{window.__cb=0;k80MedScene()(()=>{window.__cb=1})});
  const o=await ev(()=>{for(let j=0;j<300&&dlg;j++)adv();return [...ctrl.box.querySelectorAll('.opt')].map(x=>(x.classList.contains('dis')?'[dis] ':'')+x.textContent)});ok(/^\[dis\] Finish the sum/.test(o[0])&&o.length===2,'the honest option is there, and greyed: '+o.join(' | '));
  await ev(()=>{ctrl.box.querySelector('.opt:not(.dis)').click();for(let j=0;j<300&&dlg;j++)adv()});ok(await ev(d0=>(S.kd.deny||0)===d0+1&&window.__cb===1,d0),'a pretence counts as a denial')}
 for(const mode of ['sa','inj'])for(const pov of ['m','v'])for(const o of [0,1]){await ev(([mode,pov])=>{META.kdFull=mode==='sa'?1:0;__set(pov,'after',{done:['e2l_door','e2l_after','e2l_room','e2l_green'],raw:1})},[mode,pov]);
  const r0=await ev(()=>{const b=k73Due();const x=b&&sideHub(false).find(x=>x.t==='⚔ '+b.t());if(!x)return 'none:'+(b&&b.id);x.fn();return b.id});const r=await drive([o]);
  const st=await ev(()=>({f:S.f.e2lMarks,last:S.f.e2lLast===S.day,pg:k76Line('e2l_marks')}));
  ok(r0==='e2l_marks'&&r==='hub'&&st.f===(mode==='sa'?['boiler','towels']:['same','differ'])[o]&&!st.last&&st.pg.length>20,`marks ${mode} ${pov} #${o}: ${r0} ${r} ${JSON.stringify(st).slice(0,140)}`)}
 for(const [mode,f,rx] of [['sa',{e2l84:{s_table:1}},/burned his plan/],['sa',{e2lVent:'shut'},/boarded shut/],['sa',{e2l84:{s_book:1}},/recovered alive/],['inj',{e2l84:{i_manner:1}},/snob about it/],['inj',{e2l84:{i_third:1}},/never set/],['inj',{e2lMarks:'same'},/did not argue/]]){
  const L=await ev(([mode,f])=>{META.kdFull=mode==='sa'?1:0;__set('m','epilogue',{f});return extraEnding().join(' | ')},[mode,f]);ok(rx.test(L),'ending '+mode+' '+JSON.stringify(f));
  const L1=await ev(([mode,f])=>{META.kdFull=mode==='sa'?0:1;__set('m','epilogue',{f});return extraEnding().join(' | ')},[mode,f]);ok(!rx.test(L1),'ending not in the other setting '+JSON.stringify(f))}
 /* kc85–kc89's player-opened pool is covered by tools/k86_test.js */
 /* Misaki's fuller tiers keep their contractions (tools/mv_loosen.py) */
 {const fs=require('fs');const bad=[];for(const n of [76,77,78,79,80,81,82,83,84,85]){const src=fs.readFileSync(path.join(ROOT,'src/kc'+n+'.js'),'utf8');const re=/K7\dMV\('[^']*','[^']*','[^']*','([^']*)'\)/g;let m;while((m=re.exec(src)))if(/\b(I am not|do not|does not|did not|cannot|will not|is not|are not)\b/.test(m[1]))bad.push('kc'+n+': '+m[1].slice(0,70))}
  ok(!bad.length,'Misaki top tier keeps its contractions: '+bad.slice(0,5).join(' || '))}
 await ev(()=>{META.kdFull=1});
 /* in injuries-only, the infirmary text has no doctor */
 const injdoc=await ev(()=>window.__injdoc||[]);
 /* (b) the house menu */
 const HOUSE='^⚔ (His house|Your house: them)$';const side=rx=>ev(rx=>sideHub(false).filter(o=>new RegExp(rx).test(o.t||'')).length,rx);
 for(const pov of ['m','v']){
  await ev(pov=>__set(pov,'after',{done:['e2l_door']}),pov);ok(await side(HOUSE)===1,pov+' house menu, after phase');
  await ev(pov=>__set(pov,'act2',{done:['e2l_door','e2l_after','e2l_car']}),pov);ok(await side(HOUSE)===1,pov+' house menu, Act II');
  await ev(pov=>__set(pov,'act2',{done:['e2l_door','e2l_after','e2l_car'],f:{e2lRow:'said'}}),pov);ok(await side(HOUSE)===0,pov+' no house menu after the corridor');
  await ev(pov=>__set(pov,'act2',{done:['e2l_door'],e2l:0}),pov);ok(await side(HOUSE)===0,pov+' no house menu off the route');
  await med(pov);ok(await side(HOUSE)===0,pov+' no house menu in the infirmary');
  for(let act=0;act<5;act++)for(const first of [0,1]){await ev(pov=>__set(pov,'act2',{done:['e2l_door','e2l_after','e2l_car'],f:{e2lLoose:'word'}}),pov);
   const slot=await ev(()=>S.slot);await ev(rx=>sideHub(false).find(o=>new RegExp(rx).test(o.t||'')).fn(),HOUSE);const r=await drive([act,first]);
   ok(r==='hub'&&await ev(slot=>S.slot===slot+1&&S.done.k81act===1,slot),`${pov} house ${act} first #${first}: ${r}`);
   for(let rep=0;rep<3;rep++){await ev(()=>{S.done={};window.__hubbed=0;k81House()});ok(await drive([act,0])==='hub',`${pov} house ${act} repeat ${rep}`)}}
  await ev(pov=>__set(pov,'act2',{done:['e2l_door','e2l_after','e2l_car']}),pov);let q=0;for(let i=0;i<13;i++){await ev(()=>{S.done={};window.__hubbed=0;k81House()});const has=await ev(()=>[...ctrl.box.querySelectorAll('.opt')].some(o=>/^Ask (him|them) one thing/.test(o.textContent)));if(!has){await ev(()=>{ctrl=null;ui.innerHTML=''});break}ok(await drive([5])==='hub',pov+' question '+i);q++}
  ok(q===12&&await ev(()=>S.f.e2lAskd===12),pov+' twelve questions, then the option goes: '+q)}
 /* (c) beats */
 const B={e2l_room:{ph:'after',done:A,fl:'e2lRoom',v:['sat','sign'],raw:1},e2l_thurs:{ph:'act2',done:A.concat('e2l_room','e2l_green','e2l_marks','e2l_rifle','e2l_fork'),fl:'e2lThurs',v:['stayed','gate'],raw:1,f:{e2lAfter:'war'}},
  e2l_eve:{ph:'act3',done:['e2l_will','e2l_boat'],fl:'e2lEve',v:[1,1],raw:1,f:{e2lEnd:'lovers'}},e2l_eve_r:{id:'e2l_eve',ph:'act3',done:['e2l_will','e2l_boat','e2l_book'],fl:'e2lEve',v:[1,1],raw:1,f:{e2lEnd:'rivals'}}};
 for(const key of Object.keys(B))for(const pov of ['m','v'])for(const o of [0,1]){const w=B[key],id=w.id||key;await ev(([pov,w])=>__set(pov,w.ph,{done:w.done,f:w.f,raw:1}),[pov,w]);
  const r0=await ev(()=>{const b=k73Due();const x=b&&sideHub(false).find(x=>x.t==='⚔ '+b.t());if(!x)return 'none:'+(b&&b.id);x.fn();return b.id});const r=await drive([o]);
  const st=await ev(([fl,id])=>({f:S.f[fl],done:!!S.f.e2ld[id],last:S.f.e2lLast===S.day,pg:k76Line(id)}),[w.fl,id]);
  ok(r0===id&&r==='hub'&&st.f===w.v[o]&&st.done&&!st.last&&st.pg.length>20,`${key} ${pov} #${o}: ${r0} ${r} ${JSON.stringify(st).slice(0,160)}`)}
 for(const pov of ['m','v']){await ev(pov=>__set(pov,'act3',{done:['e2l_will','e2l_boat'],f:{e2lEnd:'rivals'},raw:1}),pov);ok(await ev(()=>(k73Due()||{}).id)==='e2l_book',pov+' rivals: the book before the eve');
  await ev(([pov,d])=>__set(pov,'act2',{done:d,f:{e2lAfter:'soft'},raw:1}),[pov,A.concat('e2l_room','e2l_green','e2l_marks','e2l_rifle')]);ok(await ev(()=>(k73Due()||{}).id)==='e2l_thurs',pov+' Thursday does not need the fork after the kind answer')}
 /* while they are held */
 const taken=(pov,o)=>ev(([pov,o])=>{__set(pov,'normal',o||{});S.phase='taken';S.dark=1;S.captor=S.captor||captorOrg();S.takenDay=S.day-1;save()},[pov,o]);
 const G2='^⚔ Midnight: Angel and Ronin',G3='^⚔ Four in the morning: the black hound';
 await taken('v');ok(await side(G2)===0&&await side(G3)===0,'the step waits for the trailer');
 for(const o of [0,1]){await taken('v',{done:['e2l_gone']});ok(await side(G2)===1,'the step offered');await ev(rx=>sideHub(false).find(o=>new RegExp(rx).test(o.t||'')).fn(),G2);
  ok(await drive([o])==='hub'&&await ev(o=>S.f.e2lGone2===['table','door'][o]&&k73Done('e2l_gone2'),o),'the step #'+o);ok(await side(G3)===0,'the shoe waits a day');
  await ev(()=>{S.day++;window.__hubbed=0});ok(await side(G3)===1,'the shoe offered');await ev(rx=>sideHub(false).find(o=>new RegExp(rx).test(o.t||'')).fn(),G3);ok(await drive([0])==='hub'&&await ev(()=>k73Done('e2l_gone3')&&k76Line('e2l_gone3').length>10),'the shoe');
  ok(await side(G2)===0&&await side(G3)===0,'both once')}
 await taken('m',{done:['e2l_gone']});ok(await side(G2)===0,'not for Misaki');
 /* (d) a year on */
 const EPI='^⚔ A year on: ';
 for(const pov of ['m','v'])for(const end of ['lovers','rivals']){await ev(([pov,end])=>__set(pov,'epilogue',{done:['e2l_epi'],f:{e2lEnd:end}}),[pov,end]);ok(await side(EPI)===1,`${pov} ${end} a year on offered`);
  for(let i=0;i<5;i++){await ev(()=>{S.done={};window.__hubbed=0;k83Epi()});ok(await drive([0])==='hub',`${pov} ${end} scene ${i}`)}
  ok(await ev(()=>Object.keys(S.f.e2l83).length===5)&&await side(EPI)===0,`${pov} ${end} five scenes, then closed`)}
 await ev(()=>__set('m','epilogue',{done:['e2l_epi'],f:{}}));ok(await side(EPI)===0,'a year on needs an outcome');
 /* (e) scenes, threads, the morning, endings */
 for(const pov of ['m','v'])for(const [id,ph,room] of [['l82_pew','act2','ronin'],['l82_reflector','act2','studio'],['l82_hall','act2','atrium']]){
  await ev(([pov,ph])=>__set(pov,ph,{done:['e2l_door','e2l_after','e2l_car']}),[pov,ph]);
  const r=await ev(([id,room])=>{const pool=l73Pool(room).map(e=>e.id);const e=K73L.find(e=>e.id===id);if(!pool.includes(id))return 'not in pool '+pool;let d=0;l73Run(e,()=>{d=1});for(let j=0;j<60&&dlg;j++)adv();return d?'ok':'unfinished'},[id,room]);ok(r==='ok',`${id} ${pov}: ${r}`)}
 for(const [id,pov,done] of [['tx_e2l_both','m',['e2l_after','e2l_car','e2l_know']],['tx_e2l_both','v',['e2l_after','e2l_car','e2l_know']],['tx_e2l_days','m',['e2l_after']]]){
  const r=await ev(([id,pov,done])=>{__set(pov,'act2',{done});const t=TXS[id];const on=t.when();const n=t.nodes.start;[].concat(n.in()).forEach(x=>window.__all.push(['x',String(x)]));const os=n.opts();os.forEach(o=>[].concat(o.reply()).forEach(x=>window.__all.push(['x',String(x)])));__set(pov,'act2',{done,e2l:0});return {on,off:t.when(),n:os.length}},[id,pov,done]);ok(r.on&&!r.off&&r.n>=2,id+' '+pov+': '+JSON.stringify(r))}
 const keep=await ev(()=>window.__all.length);
 for(const pov of ['m','v']){const r=await ev(pov=>{__set(pov,'after',{done:['e2l_door','e2l_after']});delete S.seen.m82_wall;S.seen.m95_rent=1;delete S.f.e2lMornDay;delete S.f.mbDay;let d=0;try{morningEvent(()=>{d=1})}catch(e){return 'threw '+e.message}for(let j=0;j<80&&dlg;j++)adv();return S.seen.m82_wall?'ok':'no'},pov);ok(r==='ok',pov+' the morning through the wall: '+r)}
 await ev(keep=>{window.__all.length=keep},keep);
 for(const [f,rx,done] of [[{e2lMedAsk:1},/burned the straps/],[{e2lThanks:'told'},/not addressed to him/],[{e2lMedKey:'ronin'},/only key/],[{e2lRoom:'sign'},/LAUNDRY sign is gone/],[{e2lThurs:'gate'},/outside V’s gate/],[{e2lNightW:'light'},/nine keys/],
   [{e2lAskd:12},/one thing a day/],[{e2lStudy:'near'},/two armchairs/],[{e2lEve:1,e2lEnd:'rivals'},/sixth back in the box/],[{e2l83:{hound:1},e2lEnd:'rivals'},/four kilometres/],[{},/shoe on V’s pillow/,['e2l_gone3']]]){
  const L=await ev(([f,done])=>{__set('m','epilogue',{f,done:done||[]});return extraEnding().join(' | ')},[f,done]);ok(rx.test(L),'ending '+JSON.stringify(f));
  const L0=await ev(([f,done])=>{__set('m','epilogue',{f,done:done||[],e2l:0});if(done)S.f.e2ld={};return extraEnding().join(' | ')},[f,done]);ok(!rx.test(L0),'ending off the route '+JSON.stringify(f))}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const SHE=/doctor|You tell her|She nods|She looks at you for a moment|She says that|She has asked you|cardigan|told her so|the grey hound|She says|She holds out|Angel|she will shoot me|then she’ll shoot|She has the shotgun|She looks at|she is to tell|she was to tell|pale hound|grey hound|She expects|She has lent|her ball|her whole attention|her flank|seen her lend|She means it|she’s gettin|she has finished/;const sb=all.filter(x=>/\b(she|herself)\b/i.test(x[1])&&!SHE.test(x[1])&&!/pawnshop|Tonight’s name|She has been waiting|She buys|She is on my list|she hunts|She keeps them|on my list for two years|what she did|she’s exactly as alive|she is exactly as alive|She is alive|while she |She knew your face|while she hunts|She stays on the line|She has no make-up|she made me|she says it is about/.test(x[1]));ok(!sb.length,'she/herself: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
