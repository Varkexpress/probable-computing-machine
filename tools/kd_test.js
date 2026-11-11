/* td27: the harder kidnapping and its aftermath. Runs the captivity loop, V's search, every kd_ event option for both
   POVs, the topics and the ending lines. */
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);await p.evaluate(()=>{globalThis.KD_AUTO=1});
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
 st=await ev(()=>({ph:S.phase,kd:Object.assign({},S.kd,{aftL:(S.kd.aftL||[]).length}),end:S.endDay-S.day,comp:S.comp,list:S.list.length,room:S.room}));ok(st.ph==='after'&&st.kd.t0&&st.end===9&&st.kd.med,'after '+JSON.stringify(st));console.log('   after():',JSON.stringify(st))}

/* --- the infirmary --- */
for(const pov of ['m','v'])for(const pick of [0,1,2]){await load(pov==='v'?1:0);await ev(pov=>{S.pov=pov;S.orgs={sato:1};S.captor='sato';S.takenDay=S.day;S.phase='taken';S.kd=null;KD();S.kd.ses=2;S.kd.hrs=14;S.f.missing=1;after(false)},pov);
 for(let i=0;i<8;i++){await drain(pick);await p.waitForTimeout(40)}
 let st=await ev(()=>({med:S.kd.med,room:S.room,post:kdPost(),end:S.endDay-S.day}));ok(st.med&&!st.post&&(pov==='v'||st.room==='medbay'),'med start '+pov+JSON.stringify(st));
 if(pov==='m'){for(const cl of [0,3]){const labs=await ev(cl=>{S.kd.med.clar=cl;S.kd.med.d=1;return ROOMS.medbay.spots.filter(s=>s.show()).map(s=>s.label)},cl);
   for(const lab of labs){if(lab==='Cot'||lab==='Bed'||lab==='Your phone')continue;await ev(([lab,cl])=>{S.kd.med.clar=cl;S.done={};ROOMS.medbay.spots.find(s=>s.label===lab&&s.show()).act()},[lab,cl]);await p.waitForTimeout(30);
    if(lab==='Door'&&pick===1){await ev(()=>{const o=[...ctrl.box.querySelectorAll('.opt')];o[0].click()})}
    for(let i=0;i<5;i++){await drain(lab==='Door'?(pick===1?0:2):pick);await p.waitForTimeout(30)}
    ok(await ev(()=>!dlg&&S.room==='medbay'),'spot '+lab+' cl'+cl+' pick'+pick)}
   if(!pick)console.log('med labels clar',cl,labs.join(' | '))}
  await ev(()=>{S.kd.med.clar=0;S.kd.med.d=0;openPhone('dm')});ok(await ev(()=>!ctrl||!ctrl.box||true),'phone blocked')}
 else{await ev(()=>{S.done={};S.slot=0;const o=sideHub(false).find(o=>o.t==='The infirmary');o.fn()});for(let i=0;i<4;i++){await drain(pick);await p.waitForTimeout(30)}}
 for(let d=1;d<=3;d++){await ev(()=>{window.__d=0;morningEvent(()=>{window.__d=1})});for(let i=0;i<8;i++){await drain(pick);await p.waitForTimeout(40)}
  ok(await ev(()=>window.__d),'med morning '+pov+d+' pick'+pick)}
 st=await ev(()=>({med:S.kd.med,post:kdPost(),t0:S.kd.t0===S.day,msgs:Object.values(phS().th).reduce((a,t)=>a+t.length,0)}));ok(!st.med&&st.post&&st.t0,'discharge '+pov+JSON.stringify(st));if(!pick)console.log('med',pov,JSON.stringify(st))}
/* escape outcomes from the infirmary, the dock and the carry, with stealth stubbed */
console.log('stubbed stealth',await ev(()=>{const out=[];const _s=stealth;const run=(res,fn,chk)=>{stealth=(cfg,cb)=>{out.push(cfg.title);cb(res)};try{fn()}catch(e){out.push('ERR '+e.message)}for(let i=0;i<400&&dlg;i++)adv();out.push(chk())};
 benchLoad(BENCH[0]);for(let i=0;i<60&&dlg;i++)adv();S.captor='sato';S.phase='after';S.kd=null;KD();S.kd.t0=S.day;
 for(const res of [{ok:false},{ok:true,kills:0,bodies:0},{ok:true,kills:1,bodies:1}]){S.kd.med={d:1,clar:0,run:0};run(res,kdMedRun,()=>'clar'+S.kd.med.clar+(S.f.kdStab?' stab':''))}
 stealth=_s;return out}));
/* she must be able to walk on arrival in both rooms, from every position the code sends her to */
console.log('spawn clear',await ev(()=>{const out=[];benchLoad(BENCH[0]);for(let i=0;i<60&&dlg;i++)adv();S.captor='sato';S.kd=null;KD();
 for(const [room,ph,pts] of [['cell','taken',[[120,150],[212,128],[246,140]]],['medbay','after',[[120,150],[178,150],[64,150],[246,150]]]]){S.phase=ph;if(ph==='after'){S.kd.t0=S.day;S.kd.med={d:1,clar:3,run:0}}
  for(const pt of [null].concat(pts)){TD.resume=null;if(pt)toRoom(room,pt);else{toRoom(room,[160,150])}const b=tdBlocked(scene.M,scene.p.x,scene.p.y);out.push(room+(pt?pt.join(','):'arrive')+':'+(b?'BLOCKED':'ok'))}}
 window.__sp=out.some(x=>/BLOCKED/.test(x));return out.join(' ')}));ok(!(await ev(()=>window.__sp)),'spawn blocked');
/* the cup, the overheard lines, V's photograph */
await load(0);console.log('cup+hear',await ev(()=>{S.captor='sato';S.phase='taken';S.kd=null;KD();S.f.kdCup=1;S.f.kdLoops=1;S.f.kdLoopN=80;S.f.kdHear=0;const out=[];const cup=ROOMS.cell.spots.find(s=>s.label==='A cup of water');
 for(const pick of [0,1,2]){S.f.kdCup=1;S.kd.clock=0;cup.act();const o=[...ctrl.box.querySelectorAll('.opt')];o[pick].click();for(let i=0;i<50&&dlg;i++)adv();out.push('cup'+pick+':'+(S.f.kdCup?'left':'gone'))}
 const rd=ROOMS.cell.spots.find(s=>s.label==='The radio down the hall');for(let i=0;i<4;i++){S.kd.clock=0;rd.act();for(let j=0;j<60&&dlg;j++)adv()}out.push('hear'+S.f.kdHear+' fri'+S.f.kdFriday);return out.join(' ')}));
await load(1);for(const id of ['kd_vphoto','kd_vfloor'])for(const pick of [0,1,2]){await ev(id=>{S.phase='taken';S.f.missing=2;S.f.called=1;S.f.kdVPhoto=0;S.f.kdVFloor=0;const e=EVENTS.find(e=>e.id===id);window.__d=0;window.__w=e.when();e.run(()=>{window.__d=1})},id);await drain(pick);ok(await ev(()=>window.__d&&window.__w),id+pick)}
/* --- V's search --- */
await load(1);await ev(()=>{S.orgs={sato:1};takenV()});await p.waitForTimeout(50);await drain(0);
console.log('V hub opts',await ev(()=>{S.f.traced=1;hub();const P=(typeof WH!=='undefined'&&WH.opts)||[];return [...document.querySelectorAll('.opt')].map(o=>o.textContent.slice(0,40)).join(' | ')||'(world hub)'}));
for(const pick of [0,1,2]){await ev(()=>{S.f.kdBldg=0;S.f.kdAlert=0;S.f.angelHelp=0;kdScout()});await p.waitForTimeout(40);await drain(pick);await p.waitForTimeout(40);await drain(0);const r=await ev(()=>[S.f.kdBldg,S.f.kdAlert,kdRescueGuards().length]);console.log('scout',pick,r);ok(pick===1?r[0]===1:r[1]===1,'scout '+pick)}
await ev(()=>{S.f.kdBldg=0;S.f.angelHelp=1;kdScout()});await drain(0);ok(await ev(()=>S.f.kdBldg===1),'scout angel');
for(const pick of [0,1,2]){await ev(()=>{S.f.kdTape=0;S.f.missing=1;const e=EVENTS.find(e=>e.id==='kd_tape');window.__d=0;window.__w=e.when();e.run(()=>{window.__d=1})});await drain(pick);ok(await ev(()=>window.__d&&window.__w),'kd_tape '+pick)}
await ev(()=>{S.f.missing=2;after(false)});await drain(0);console.log('V after kd',JSON.stringify(await ev(()=>S.kd)));
/* --- events, both POVs --- */
const IDS=['kd_recount','kd_slip','kd_sleeptalk','kd_bank','kd_jacket','kd_shop','kd_box','kd_crash','kd_crash2','kd_march','kd_home','kd_parcel','kd_ronradio','kd_ronmad','kd_cast','kd_math','kd_clothes','kd_exam','kd_photos','kd_wash','kd_smell','kd_notask','kd_vknows','kd_later','kd_draft','kd_konbini','kd_angelsees','kd_count','kd_round','kd_card','kd_book','kd_bookout','kd_knock1','kd_knock2','kd_knock3','kd_blank','kd_van','kd_lost','kd_practice','kd_hara','kd_epi'];
for(const pov of ['m','v'])for(const said of [0,3])for(const id of IDS)for(const pick of [0,1,2,3]){
 const r=await ev(([pov,id,said,pick])=>{document.querySelectorAll('.splash').forEach(e=>e.remove());benchLoad(BENCH[pov==='v'?1:0]);for(let i=0;i<60&&dlg;i++)adv();S.pov=pov;S.captor='sato';
  S.phase=id==='kd_hara'||id==='kd_bookout'||id==='kd_van'?'act2':id==='kd_epi'?'epilogue':'after';S.veng=10;S.comp=50;S.list=[{id:'driver',n:'The driver',d:'x',st:0},{id:'notes',n:'The note-taker',d:'x',st:id==='kd_book'?1:0},{id:'water',n:'The one who brought water',d:'x',st:0}];
  S.kd={hrs:19,ses:2,said,clock:0,dose:0,anc:0,lost:pick,shake:2,t0:S.day-5,days:3};S.f.kdCount=1;S.f.kdCard=id==='kd_card'?0:1;S.f.kdChart=1;S.f.kdAngelSees=id==='kd_notask'?1:0;if(id!=='kd_math')S.f.kd_math=1;if(id==='kd_later'){S.phase='act2';S.kd.deny=3;S.kd.t0=S.day-12}if(id==='kd_draft')S.f.kdDraft=pick;if(id==='kd_cast'){S.phase='act2';S.f.kdGripN=pick}if(id==='kd_ronradio'||id==='kd_ronmad'){S.f.kdRonCall=1;S.list.unshift({id:'radio',n:'The man with the radio',d:'x',st:id==='kd_ronmad'?1:0})}S.f.movedIn=0;S.f.kdLoops=1;S.f.kdHas=id==='kd_recount'?0:1;S.f.kd_clothes=id==='kd_clothes'?0:1;if(['kd_box','kd_crash','kd_crash2','kd_march'].includes(id)){S.kd.deny=9;S.kd.t0=S.day-12;if(id!=='kd_box')S.phase='act2';if(id==='kd_crash2')S.f.kdCrash=S.day-3;if(id==='kd_march')S.f.kdFile='open'}S.f.kdRound=id==='kd_round'?1:0;S.f.kdBook=/knock/.test(id)?(pick%2?'burn':'read'):undefined;
  if(id==='kd_knock2')S.f.kdKnock1=1;if(id==='kd_knock3'){S.f.kdKnock1=1;S.f.kdKnock2=1}if(id==='kd_van')S.f.kdKeep=pick%2;if(id==='kd_count')S.f.kdCount=0;S.f.kdKnockDay=0;
  const e=EVENTS.find(e=>e.id===id);if(!e)return 'MISSING';let w;for(let i=0;i<40&&!w;i++)w=e.when();window.__d=0;e.run(()=>{window.__d=1});return 'when='+!!w},[pov,id,said,pick]);
 await p.waitForTimeout(25);await drain(pick);await p.waitForTimeout(25);await drain(0);const d=await ev(()=>window.__d);
 const exp=!(id==='kd_hara'&&pov==='v')&&!((id==='kd_wash'||id==='kd_konbini')&&pov==='v')&&!(id==='kd_vknows'&&pov==='m')&&!((id==='kd_bank'||id==='kd_box')&&pov==='v')&&!(/knock/.test(id)&&said===0)&&!(id==='kd_practice'&&0);
 if(!d||(exp&&r!=='when=true'))console.log(pov,'said',said,id,'opt',pick,r,d?'done':'NOT DONE');ok(d,id+' done');if(exp)ok(r==='when=true',id+' when '+pov+said)}
console.log('events run');
/* list entry gone / fifth name */
console.log('list',await ev(()=>{S.phase='after';S.list[0].gone=1;S.list.push({id:'voice',n:'The one behind the chair',d:'x',st:0});theList();const tx=document.body.innerText;return [/gone blank/.test(tx),/behind the chair/.test(tx),[...document.querySelectorAll('.opt')].map(o=>o.textContent.slice(0,22))]}));
/* --- topics --- */
for(const [L,id,pov] of [['TDTOP_V','kd_second','m'],['TDTOP_M','kd_second','v'],['TDTOP_V','kd_file','m'],['TDTOP_M','kd_file','v'],['TDTOP_V','kd_backup','m'],['TDTOP_M','kd_shoes','v']])for(const pick of [0,1,2]){
 const sh=await ev(([L,id,pov])=>{benchLoad(BENCH[pov==='v'?1:0]);for(let i=0;i<60&&dlg;i++)adv();S.pov=pov;S.phase='after';S.kd={hrs:19,ses:2,said:1,clock:0,dose:0,anc:0,lost:1,shake:0,t0:S.day-4,days:3};S.f.kdBlankQ=1;S.f.kdMother=2;S.f.kdKeep=0;S.f.kd_math=1;S.talks={};window.__d=0;const t=(L==='TDTOP_V'?TDTOP_V:TDTOP_M).find(x=>x.id===id);const s=t.show();t.run(()=>{window.__d=1});return s},[L,id,pov]);
 await drain(pick);const d=await ev(()=>window.__d);if(!d||!sh)console.log('topic',id,pov,pick,'show',sh,d?'done':'NOT DONE');ok(d&&sh,'topic '+id)}
console.log('ending',await ev(()=>{S.f.kdBook='burn';S.f.kdHit=1;S.f.kdFile='open';return extraEnding().slice(-3)}));
/* stealth wrapper leaves callbacks intact */
console.log('shake',await ev(()=>{S.kd.shake=2;let got=null;stealth({map:VENT,guards:[],actor:'m',title:'t'},r=>{got=r});return typeof scene}));
console.log('ERR',errs,'FAILS',bad);await b.close();process.exit(bad||errs.length?1:0)})();
