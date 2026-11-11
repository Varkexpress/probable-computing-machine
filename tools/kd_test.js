/* td27: the harder kidnapping and its aftermath. Runs the captivity loop, V's search, every kd_ event option for both
   POVs, the topics and the ending lines. */
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);
const drain=async(pick)=>{let first=1;for(let k=0;k<80;k++){const r=await ev(([pick,first])=>{for(let i=0;i<300&&dlg;i++)adv();if(ctrl&&ctrl.box){const os=ctrl.box.querySelectorAll('.opt:not(.dis)');if(os.length){os[first?Math.min(pick,os.length-1):0].click();return 2}}return dlg?1:0},[pick,first]);if(r===2)first=0;if(!r)break;await p.waitForTimeout(30)}};
const load=(i)=>ev(i=>{document.querySelectorAll('.splash').forEach(e=>e.remove());benchLoad(BENCH[i]);for(let k=0;k<60&&dlg;k++)adv()},i);
let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
/* --- captivity --- */
for(const pick of [0,1,2,3]){await load(0);await ev(()=>{S.orgs={sato:1};takenM()});await p.waitForTimeout(60);
 for(let i=0;i<14;i++){await drain(pick);await p.waitForTimeout(40)}
 let st=await ev(()=>({room:S.room,ph:S.phase,kd:S.kd,leaks:S.leaks,wz:kdWoozy(),spots:ROOMS.cell.spots.map(s=>s.label)}));
 ok(st.room==='cell'&&st.kd.ses===1&&st.kd.hrs>0,'first session '+JSON.stringify(st));
 console.log('pick',pick,'after session 1: ses',st.kd.ses,'hrs',st.kd.hrs,'said',st.kd.said,'leaks',st.leaks,'woozy',st.wz);
 // burn the clock with the two new spots, then anything → they come
 for(let i=0;i<7;i++){await ev(i=>{const s=ROOMS.cell.spots.find(s=>s.label===(i%2?'Your arm':'The radio down the hall'));s.act()},i);await p.waitForTimeout(30);for(let j=0;j<10;j++){await drain(pick);await p.waitForTimeout(30)}}
 st=await ev(()=>({room:S.room,kd:S.kd,wz:kdWoozy(),q2:S.f.kdQ2,loops:S.f.kdLoops}));ok(st.kd.ses===2&&st.room==='cell','forced session '+JSON.stringify(st));
 for(let i=0;i<7;i++){await ev(()=>ROOMS.cell.spots.find(s=>s.label==='Cot').act());await p.waitForTimeout(30);for(let j=0;j<10;j++){await drain(pick);await p.waitForTimeout(30)}}
 st=await ev(()=>({room:S.room,kd:S.kd,leaks:S.leaks}));ok(st.kd.ses===3&&st.room==='cell','short session '+JSON.stringify(st));
 console.log('   after 3 sessions: hrs',st.kd.hrs,'said',st.kd.said,'leaks',st.leaks);
 // vent needs tray + listening; escape cfg
 const v=await ev(()=>{S.f.tray=1;S.f.listened=0;S.kd.clock=0;ROOMS.cell.spots.find(s=>s.label==='Vent').act();const a=!!dlg;for(let i=0;i<50&&dlg;i++)adv();S.tries=1;const c=kdEscapeCfg({map:VENT,guards:VENT_G,title:'t'});return [a,c.guards.length,c.sens]});console.log('   vent gated',v);ok(v[0]&&v[1]===3,'vent gate');
 await ev(pick=>{after(pick%2===0)},pick);await p.waitForTimeout(50);for(let i=0;i<6;i++){await drain(0);await p.waitForTimeout(40)}await ev(()=>hub());
 st=await ev(()=>({ph:S.phase,kd:S.kd,end:S.endDay-S.day,comp:S.comp,list:S.list.length}));ok(st.ph==='after'&&st.kd.t0&&st.end===6,'after '+JSON.stringify(st));console.log('   after():',JSON.stringify(st))}
/* --- V's search --- */
await load(1);await ev(()=>{S.orgs={sato:1};takenV()});await p.waitForTimeout(50);await drain(0);
console.log('V hub opts',await ev(()=>{S.f.traced=1;hub();const P=(typeof WH!=='undefined'&&WH.opts)||[];return [...document.querySelectorAll('.opt')].map(o=>o.textContent.slice(0,40)).join(' | ')||'(world hub)'}));
for(const pick of [0,1,2]){await ev(()=>{S.f.kdBldg=0;S.f.kdAlert=0;S.f.angelHelp=0;kdScout()});await p.waitForTimeout(40);await drain(pick);await p.waitForTimeout(40);await drain(0);const r=await ev(()=>[S.f.kdBldg,S.f.kdAlert,kdRescueGuards().length]);console.log('scout',pick,r);ok(pick===1?r[0]===1:r[1]===1,'scout '+pick)}
await ev(()=>{S.f.kdBldg=0;S.f.angelHelp=1;kdScout()});await drain(0);ok(await ev(()=>S.f.kdBldg===1),'scout angel');
for(const pick of [0,1,2]){await ev(()=>{S.f.kdTape=0;S.f.missing=1;const e=EVENTS.find(e=>e.id==='kd_tape');window.__d=0;window.__w=e.when();e.run(()=>{window.__d=1})});await drain(pick);ok(await ev(()=>window.__d&&window.__w),'kd_tape '+pick)}
await ev(()=>{S.f.missing=2;after(false)});await drain(0);console.log('V after kd',JSON.stringify(await ev(()=>S.kd)));
/* --- events, both POVs --- */
const IDS=['kd_count','kd_round','kd_card','kd_book','kd_bookout','kd_knock1','kd_knock2','kd_knock3','kd_blank','kd_van','kd_lost','kd_practice','kd_hara','kd_epi'];
for(const pov of ['m','v'])for(const said of [0,3])for(const id of IDS)for(const pick of [0,1,2,3]){
 const r=await ev(([pov,id,said,pick])=>{document.querySelectorAll('.splash').forEach(e=>e.remove());benchLoad(BENCH[pov==='v'?1:0]);for(let i=0;i<60&&dlg;i++)adv();S.pov=pov;S.captor='sato';
  S.phase=id==='kd_hara'||id==='kd_bookout'||id==='kd_van'?'act2':id==='kd_epi'?'epilogue':'after';S.veng=10;S.comp=50;S.list=[{id:'driver',n:'The driver',d:'x',st:0},{id:'notes',n:'The note-taker',d:'x',st:id==='kd_book'?1:0},{id:'water',n:'The one who brought water',d:'x',st:0}];
  S.kd={hrs:19,ses:2,said,clock:0,dose:0,anc:0,lost:pick,shake:2,t0:S.day-5,days:3};S.f.kdCount=1;S.f.kdRound=id==='kd_round'?1:0;S.f.kdBook=/knock/.test(id)?(pick%2?'burn':'read'):undefined;
  if(id==='kd_knock2')S.f.kdKnock1=1;if(id==='kd_knock3'){S.f.kdKnock1=1;S.f.kdKnock2=1}if(id==='kd_van')S.f.kdKeep=pick%2;if(id==='kd_count')S.f.kdCount=0;S.f.kdKnockDay=0;
  const e=EVENTS.find(e=>e.id===id);if(!e)return 'MISSING';let w;for(let i=0;i<40&&!w;i++)w=e.when();window.__d=0;e.run(()=>{window.__d=1});return 'when='+!!w},[pov,id,said,pick]);
 await p.waitForTimeout(25);await drain(pick);await p.waitForTimeout(25);await drain(0);const d=await ev(()=>window.__d);
 const exp=!(id==='kd_hara'&&pov==='v')&&!(/knock/.test(id)&&said===0)&&!(id==='kd_practice'&&0);
 if(!d||(exp&&r!=='when=true'))console.log(pov,'said',said,id,'opt',pick,r,d?'done':'NOT DONE');ok(d,id+' done');if(exp)ok(r==='when=true',id+' when '+pov+said)}
console.log('events run');
/* list entry gone / fifth name */
console.log('list',await ev(()=>{S.phase='after';S.list[0].gone=1;S.list.push({id:'voice',n:'The one behind the chair',d:'x',st:0});theList();const tx=document.body.innerText;return [/gone blank/.test(tx),/behind the chair/.test(tx),[...document.querySelectorAll('.opt')].map(o=>o.textContent.slice(0,22))]}));
/* --- topics --- */
for(const [L,id,pov] of [['TDTOP_V','kd_file','m'],['TDTOP_M','kd_file','v'],['TDTOP_V','kd_backup','m'],['TDTOP_M','kd_shoes','v']])for(const pick of [0,1,2]){
 const sh=await ev(([L,id,pov])=>{benchLoad(BENCH[pov==='v'?1:0]);for(let i=0;i<60&&dlg;i++)adv();S.pov=pov;S.phase='after';S.kd={hrs:19,ses:2,said:1,clock:0,dose:0,anc:0,lost:1,shake:0,t0:S.day-4,days:3};S.f.kdBlankQ=1;S.f.kdMother=2;S.f.kdKeep=0;S.talks={};window.__d=0;const t=(L==='TDTOP_V'?TDTOP_V:TDTOP_M).find(x=>x.id===id);const s=t.show();t.run(()=>{window.__d=1});return s},[L,id,pov]);
 await drain(pick);const d=await ev(()=>window.__d);if(!d||!sh)console.log('topic',id,pov,pick,'show',sh,d?'done':'NOT DONE');ok(d&&sh,'topic '+id)}
console.log('ending',await ev(()=>{S.f.kdBook='burn';S.f.kdHit=1;S.f.kdFile='open';return extraEnding().slice(-3)}));
/* stealth wrapper leaves callbacks intact */
console.log('shake',await ev(()=>{S.kd.shake=2;let got=null;stealth({map:VENT,guards:[],actor:'m',title:'t'},r=>{got=r});return typeof scene}));
console.log('ERR',errs,'FAILS',bad);await b.close();process.exit(bad||errs.length?1:0)})();
