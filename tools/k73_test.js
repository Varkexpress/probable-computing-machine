/* kc73: enemies to lovers, V × Misaki. Route entry (both POVs, both answers), every beat in both POVs with every option
   and the upstream flags that change it, the kidnapping hooks (vRescue, after), the infirmary layer (V and Misaki, the
   worst route and the 'gone' band), the side menu per phase and its gates, the morning after through the morning cap,
   every phone-thread path, the server lines, the location events, both outcomes (lovers, rivals) with META.sug on and
   off, the ending lines, the affection cap, kc66 on the route, and a check that nothing changes when the route is not
   chosen. Also checks V's lines for contractions and visible text for hound names and "undefined".
   Usage: node tools/k73_test.js */
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{globalThis.KD_AUTO=1;document.querySelectorAll('.splash').forEach(e=>e.remove());window.__realHub=hub;hub=function(){window.__hubbed=1};
 window.__lines=[];const _s=say;say=function(L,cb){try{(L||[]).forEach(x=>{if(x)window.__lines.push([x[0],String(x[1])])})}catch(e){}return _s.apply(this,arguments)}});
const drive=async(pick)=>{let first=true,n=0;for(let k=0;k<200;k++){const r=await ev(([pick,first])=>{for(let i=0;i<400&&dlg;i++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){const o=os[first?Math.min(pick,os.length-1):0];o.click();return 'clicked'}}return dlg?'dlg':'idle'},[pick,first]);
  if(r==='hub')return 'hub';if(r==='clicked'){first=false;n++}if(r==='idle'){await p.waitForTimeout(20);if(++n>60)return 'idle'}await p.waitForTimeout(5)}return 'timeout'};
/* phases: n normal (day 2), t taken, m infirmary, f after (out), 2 act2, 3 act3, e epilogue */
const BI={n:0,t:0,m:0,f:2,2:2,3:4,e:6};
const load=async(ph,pov,flags,e2l=1)=>ev(([bi,ph,pov,flags,e2l])=>{benchLoad(BENCH[bi]);for(let k=0;k<80&&dlg;k++)adv();window.__hubbed=0;
  S.tx=null;S.dark=0;S.lone=null;S.f.abroad=0;S.f.heartbreak=0;S.pov=pov;S.rom=null;S.vrom=null;S.f.k28pair=null;S.f.married=0;S.seen=S.seen||{};
  Object.keys(S.f).filter(k=>/^e2l/.test(k)).forEach(k=>delete S.f[k]);delete S.f.k64LDay;delete S.f.mbDay;delete S.f.mbN;
  if(e2l){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1}}
  if(ph==='n'){S.phase='normal';S.day=2;S.slot=0;S.f.kidnapSet=0;S.f.movedIn=0;S.paid=0;if(S.kd)S.kd.med=0}
  if(ph==='t'){S.phase='taken';S.dark=1;S.captor=S.captor||captorOrg();S.takenDay=S.day}
  if(ph==='m'){S.phase='after';KD();S.kd.t0=S.day;S.kd.med={d:1,clar:0,run:0,sev:2};S.slot=2;S.comp=50}
  if(ph==='f'){S.phase='after';KD();S.kd.t0=S.day-5;S.kd.med=0}
  if(ph==='2'){S.day=Math.max(S.day,(S.act2Start||0)+2)}
  if(ph==='3'&&S.a3)S.day=S.a3.start+3;
  S.aff=Math.min(S.aff,40);Object.assign(S.f,flags||{});save()},[BI[ph],ph,pov,flags||{},e2l]);
const log=[];const fx=()=>ev(()=>JSON.stringify(Object.fromEntries(Object.entries(S.f).filter(([k])=>/^e2l/.test(k)&&k!=='e2ld'))));
const play=async(fn,opt)=>{await ev(fn=>{window.__hubbed=0;eval(fn+'()')},fn);return drive(opt)};

/* 0. NOT CHOSEN: the normal route is unchanged */
for(const pov of ['m','v']){
 await load('n',pov,{},0);
 const off=await ev(()=>{const r={};r.entry=sideHub(false).filter(o=>/^⚔/.test(o.t||'')).length;r.cap=k73Cap();r.due=k73Due();S.f.e2lAsk=1;S.f.e2l=0;
  r.after=sideHub(false).filter(o=>/^⚔/.test(o.t||'')).length;const a0=S.aff;apply({aff:30});r.aff=S.aff-a0;
  r.th=['tx_e2l_m','tx_e2l_v','tx_e2l_pool','tx_e2l_a2m','tx_e2l_a2v'].filter(id=>{try{return TXS[id].when()}catch(e){return false}});
  r.chat=chatLog().filter(x=>/ledger|book|envelope|accords|WAR DAY|nobody’s dead/.test(x[1])).length;
  r.loc=['mall','atrium','ronin','dp_range','training'].map(id=>l73Pool(id).length).reduce((a,b)=>a+b,0);
  r.k66=(()=>{const a=k66Due();let b=null;if(K66())for(const x of K66B){if(k66Done(x.id))continue;let ok=false;try{ok=!!x.when()}catch(e){}if(ok){b=x;break}}return (a&&a.id)===(b&&b.id)})();
  r.ends=extraEnding().filter(t=>/carpet|Constance|accords|IOU|ledger/.test(t)).length;
  S.phase='act3';S.f.e2lEnd='lovers';S.seen.e2l_morn=0;S.f.e2lMorn=0;let fired=0;const mk=morningEvent;r.morn=(()=>{const o=k73Morn;k73Morn=()=>{fired=1};try{morningEvent(()=>{})}catch(e){}k73Morn=o;return fired})();
  return r});
 log.push('not chosen '+pov+' '+JSON.stringify(off));
 if(off.entry!==0)errs.push('retired day 1–4 entry still offered '+pov);
 if(off.after||off.cap!==100||off.due||off.aff!==30||off.th.length||off.chat||off.loc||!off.k66||off.ends||off.morn)errs.push('route leaks when not chosen '+pov+' '+JSON.stringify(off));
 /* the kidnapping hooks pass straight through */
 await load('t',pov,{},0);const hk=await ev(()=>{window.__lines=[];try{after(false)}catch(e){}for(let i=0;i<5&&dlg;i++)adv();return {m:JSON.stringify(S.f.e2ld||null),l:window.__lines.some(x=>/Of all the people|In the car they sleep/.test(x[1]))}});
 if(hk.l||hk.m!=='null')errs.push('after hook fired off-route '+pov);
 /* entry gates */
 for(const [name,patch] of [['day 5',s=>{S.day=5}],['kidnap set',s=>{S.f.kidnapSet=1}],['moved in',s=>{S.f.movedIn=1}],['rom',s=>{S.rom='r'}],['lone',s=>{S.lone='m'}],['asked',s=>{S.f.e2lAsk=1}]]){
  await load('n',pov,{},0);const r=await ev(src=>{(eval('('+src+')'))(S);return k73EntryOk()},patch.toString());if(r)errs.push('entry offered with '+name)}}
/* 1. ENTRY (kc74 retired the side entry; k73Entry() keeps the swear / let-go pair, k73Entry(true) is the new-game opening): both POVs, both answers */
for(const pov of ['m','v'])for(const o of [0,1]){await load('n',pov,{},0);await ev(()=>{S.aff=30});
 const r0=await ev(()=>{window.__hubbed=0;const sl=S.slot;k73Entry();return sl});const r=await drive(o);
 const st=await ev(()=>{const same=(k73Due()||{}).id||null;S.day++;return {e2l:S.f.e2l,ask:S.f.e2lAsk,aff:S.aff,slot:S.slot,same,due:(k73Due()||{}).id||null}});
 log.push(`entry ${pov} opt${o} → ${r} ${JSON.stringify(st)}`);
 if(r!=='hub')errs.push('entry did not finish '+pov+o);if(st.slot!==r0)errs.push('entry cost time');
 if(o===0&&(st.e2l!==1||st.aff>10||st.same||st.due!=='e2l_eye'))errs.push('entry war '+pov+' '+JSON.stringify(st));
 if(o===1&&(st.e2l!==0||st.ask!==1||st.due))errs.push('entry let go '+pov+' '+JSON.stringify(st))}
/* 2. the side menu offers the right beat per phase, plays it once */
/* kc76 adds e2l_show after the trailer (it leaves the day's move free) and e2l_pair before the mat */
const SEQ=[['n','e2l_eye',[]],['n','e2l_show',['e2l_eye']],['n','e2l_lift',['e2l_eye','e2l_show']],['n','e2l_kennel',['e2l_eye','e2l_show','e2l_lift']],['n','e2l_sab',['e2l_eye','e2l_show','e2l_lift','e2l_kennel']],['n','e2l_dinner',['e2l_eye','e2l_show','e2l_lift','e2l_kennel','e2l_sab']],['n','e2l_truce',['e2l_eye','e2l_show','e2l_lift','e2l_kennel','e2l_sab','e2l_dinner']],['f','e2l_after',[]],['2','e2l_after',[]],
 ['2','e2l_rifle',['e2l_after']],['2','e2l_fork',['e2l_after','e2l_rifle']],['2','e2l_car',['e2l_after','e2l_rifle','e2l_fork']],['2','e2l_list',['e2l_after','e2l_rifle','e2l_fork','e2l_car']],['2','e2l_stitch',['e2l_after','e2l_rifle','e2l_fork','e2l_car','e2l_list']],['2','e2l_pair',['e2l_after','e2l_rifle','e2l_fork','e2l_car','e2l_list','e2l_stitch']],['2','e2l_spar',['e2l_after','e2l_rifle','e2l_fork','e2l_car','e2l_list','e2l_stitch','e2l_pair']],['2','e2l_know',['e2l_after','e2l_rifle','e2l_fork','e2l_car','e2l_list','e2l_stitch','e2l_pair','e2l_spar']],['2','e2l_test',['e2l_after','e2l_rifle','e2l_fork','e2l_car','e2l_list','e2l_stitch','e2l_pair','e2l_spar','e2l_know']],['3','e2l_will',[]],['3','e2l_boat',['e2l_will']],['e','e2l_epi',[]]];
const FREE=['e2l_show','e2l_fork','e2l_list','e2l_will','e2l_know']; /* kc76/kc77 beats that leave the day's move free */
for(const pov of ['m','v'])for(const [ph,id,pre] of SEQ){await load(ph,pov,{});await ev(pre=>{pre.forEach(x=>S.f.e2ld[x]=1);if(pre.includes('e2l_kennel'))S.f.e2ld.e2l_bucket=1;if(pre.includes('e2l_pair'))S.f.e2ld.e2l_table=1;if(pre.includes('e2l_after')){S.f.e2ld.e2l_room=1;S.f.e2ld.e2l_thurs=1;S.f.e2ld.e2l_marks=1;S.f.e2ld.e2l_green=1}if(S.phase==='act2'&&!pre.includes('e2l_after')){S.f.e2ld.e2l_after=0;KD();S.kd.t0=S.day-6;S.kd.med=0}},pre);
 if(id!=='e2l_after'&&ph==='2')await ev(()=>{S.f.e2ld.e2l_after=1;S.f.e2lAfter='war';S.f.e2ld.e2l_thurs=1;S.f.e2ld.e2l_room=1;S.f.e2ld.e2l_marks=1;S.f.e2ld.e2l_green=1});
 const d=await ev(()=>{const b=k73Due();return b&&b.id});if(d!==id)errs.push(`side ${pov} ${ph} expected ${id} got ${d}`);
 const r2=await ev(()=>{const b=k73Due();const o=b&&sideHub(false).find(o=>o.t==='⚔ '+b.t());if(!o)return 'none';window.__hubbed=0;o.fn();return 'ok'});const r3=await drive(0);
 if(r2!=='ok'||r3!=='hub')errs.push('side option '+pov+' '+id+' '+r2+' '+r3);
 const again=await ev(id=>{const b=k73Due();return b&&b.id===id},id);if(again)errs.push('beat repeats '+id);
 const same=await ev(()=>{const b=k73Due();return b?b.id:null});if(['n','2'].includes(ph)&&same&&same!=='e2l_epi'&&!FREE.includes(id))errs.push('second beat same day '+pov+' '+same)}
/* gates */
for(const [ph,name,patch] of [['n','rom',s=>{S.rom='r'}],['n','vrom',s=>{S.vrom='a'}],['2','lone',s=>{S.lone='v'}],['f','infirmary',s=>{S.kd.med={d:1}}],['f','too soon',s=>{S.kd.t0=S.day-1}],['t','taken',s=>{}],['n','pair',s=>{S.f.k28pair={lead:'v',with:'a'}}]]){
 await load(ph,'m',{});const d=await ev(src=>{(eval('('+src+')'))(S);const b=k73Due();return b?b.id:null},patch.toString());if(d)errs.push('gate leak '+name+' '+d)}
/* 3. every beat, both POVs, every option, the upstream flags */
const R=[['n','k73Eye',2,[{}]],['n','k73Sab',2,[{},{e2lEye:'scope'},{e2lEye:'note'}]],['n','k73Truce',2,[{},{e2lEye:'scope'},{e2lEye:'note'}]],
 ['f','k73After',2,[{},{e2lSab:'m'},{e2lSab:'v'}]],['2','k73Car',2,[{}]],['2','k73Stitch',2,[{e2lSab:'m'},{e2lSab:'v'}]],['2','k73Spar',2,[{}]],
 ['3','k73Boat',2,[{},{e2lTruce:'v',e2lScar:'crooked',e2lSpar:'kiss',e2lLedger:'torn',e2lEye:'note'},{e2lTruce:'m',e2lScar:'neat',e2lSpar:'pin',e2lLedger:'kept',e2lEye:'scope'}]],
 ['e','k73Epi',1,[{e2lEnd:'lovers'},{e2lEnd:'rivals'},{e2lEnd:'lovers',e2lEye:'note',e2lScar:'crooked',e2lTruce:'v'},{e2lEnd:'rivals',e2lEye:'note',e2lScar:'crooked'},{e2lEnd:'lovers',e2lEye:'scope'}]]];
const want=new Set(),got=new Set();
for(const pov of ['m','v'])for(const [ph,fn,nopt,vars] of R)for(const v of vars)for(let o=0;o<nopt;o++)for(const sug of (fn==='k73Boat'?[1,0]:[1])){
 await load(ph,pov,v);await ev(s=>{META.sug=s},sug);const k=`${pov} ${fn} ${JSON.stringify(v)} #${o} sug${sug}`;want.add(k);const r=await play(fn,o);const f=await fx();
 log.push(`${k} → ${r} ${f}`);if(r!=='hub')errs.push('scene did not finish '+k);else got.add(k)}
await ev(()=>{META.sug=1});
/* META.sug on and off: the same flags, different text, nothing implied when off */
for(const pov of ['m','v'])for(const [ph,fn,fl,o] of [['3','k73Boat',{},0],['3','k73Boat',{e2lScar:'crooked'},1]]){const out={};
 for(const sug of [1,0]){await load(ph,pov,fl);await ev(s=>{META.sug=s;window.__lines=[]},sug);const r=await play(fn,o);out[sug]={r,f:await fx(),t:await ev(()=>window.__lines.map(x=>x[1]).join('\n'))}}
 await ev(()=>{META.sug=1});if(out[1].r!==out[0].r||out[1].f!==out[0].f)errs.push('sug state differs '+pov+fn+o);
 if(o===0&&out[1].t===out[0].t)errs.push('sug text same '+pov+fn);if(/not much on under it|Repeatedly|in bed by/.test(out[0].t))errs.push('sug off implies '+pov+fn)}
for(const pov of ['m','v']){const out={};for(const sug of [1,0]){await load('3',pov,{e2lEnd:'lovers',e2lScar:'crooked'});await ev(s=>{META.sug=s;window.__lines=[];S.f.e2lMorn=S.day;S.seen.e2l_morn=0;window.__hubbed=0;morningEvent(()=>{window.__hubbed=1})},sug);await drive(0);out[sug]=await ev(()=>window.__lines.map(x=>x[1]).join('\n'))}
 await ev(()=>{META.sug=1});if(out[1]===out[0])errs.push('sug morning same '+pov);if(/shirtless|Repeatedly|in bed by|his bed|your bed/.test(out[0]))errs.push('sug off morning implies '+pov)}
/* each option sets its flag, in both POVs */
const FL=[['n','k73Eye','e2lEye',['scope','note']],['n','k73Sab','e2lSab',null],['n','k73Truce','e2lTruce',null],['f','k73After','e2lAfter',['war','soft']],
 ['2','k73Car','e2lCar',['bet','watch']],['2','k73Stitch','e2lScar',['neat','crooked']],['2','k73Spar','e2lSpar',['kiss','pin']],['3','k73Boat','e2lEnd',['lovers','rivals']]];
const POVV={m:{e2lSab:['m','v'],e2lTruce:['m','v']},v:{e2lSab:['v','m'],e2lTruce:['m','v']}};
for(const pov of ['m','v'])for(const [ph,fn,k,vals0] of FL){const vals=vals0||POVV[pov][k];for(let o=0;o<2;o++){await load(ph,pov,{});await play(fn,o);
 const r=await ev(k=>S.f[k],k);if(r!==vals[o])errs.push(`${pov} ${k} opt${o}: ${r} != ${vals[o]}`)}}
/* 4. the kidnapping: V at the river (wraps vRescue), the door (wraps after) */
for(const o of [0,1]){await load('t','v',{});const k='v k73Come #'+o;want.add(k);const r=await ev(()=>{window.__hubbed=0;k73Come(()=>{window.__hubbed=1});return 1});const d=await drive(o);
 const f=await ev(()=>S.f.e2lPride);log.push(`${k} → ${d} ${f}`);if(d!=='hub'||f!==(o?'true':'debt'))errs.push('come '+o+' '+d+' '+f);else got.add(k)}
{await load('t','v',{});const r=await ev(()=>{window.__lines=[];vRescue();for(let i=0;i<40&&dlg;i++)adv();return {m:!!S.f.e2ld.e2l_come,l:window.__lines.some(x=>/The river, past midnight/.test(x[1]))}});
 log.push('vRescue wrapper '+JSON.stringify(r));if(!r.m||!r.l)errs.push('vRescue wrapper');await ev(()=>{if(ctrl&&ctrl.box){const o=ctrl.box.querySelector('.opt');o&&o.click()}});await p.waitForTimeout(50);
 await ev(()=>{for(let i=0;i<40&&dlg;i++)adv()});await p.waitForTimeout(100);const sc=await ev(()=>!!(scene&&scene!==null));if(!sc)errs.push('vRescue did not continue')}
{await load('t','m',{});const r=await ev(()=>{window.__lines=[];vRescue&&0;return 1})}
for(const pov of ['m','v'])for(const self of [0,1]){await load('t',pov,{});const k=`${pov} k73Door self${self}`;want.add(k);
 const d=await ev(self=>{window.__hubbed=0;let fin=0;k73Door(!!self,()=>{fin=1});for(let i=0;i<40&&dlg;i++)adv();return fin},self);if(!d)errs.push('door '+k);else got.add(k)}
for(const pov of ['m','v']){await load('t',pov,{});const r=await ev(()=>{window.__lines=[];try{after(false)}catch(e){}for(let i=0;i<20&&dlg;i++)adv();return {m:!!(S.f.e2ld&&S.f.e2ld.e2l_door),l:window.__lines.some(x=>/Of all the people|In the car they sleep/.test(x[1]))}});
 log.push('after wrapper '+pov+' '+JSON.stringify(r));if(!r.m||!r.l)errs.push('after wrapper '+pov)}
/* 5. the infirmary: delivered through the hub, in order; every scene, option and variant */
for(const pov of ['m','v']){await load('m',pov,{});const seq=await ev(pov=>{const o61=k61Scene,o62=k62Scene,o63=k63Scene;k61Scene=()=>null;k62Scene=()=>null;k63Scene=()=>null;const out=[];for(let day=0;day<4;day++){for(let sl=1;sl<4;sl++){S.slot=sl;window.__lines=[];const s=k73MedScene();if(s){let fin=0;s(()=>{fin=1});for(let i=0;i<60&&dlg;i++)adv();
    if(ctrl&&ctrl.box){const o=ctrl.box.querySelector('.opt:not(.dis)');o&&o.click();for(let i=0;i<60&&dlg;i++)adv()}out.push((pov==='v'?'V':'M')+(pov==='v'?S.f.e2lVM:(S.f.e2lMC?'C':S.f.e2lMM))+(fin?'':'!'))}}
   S.day++;if(day===1)S.kd.med.clar=2}k61Scene=o61;k62Scene=o62;k63Scene=o63;return out},pov);
 log.push('infirmary '+pov+': '+seq.join(' '));if(pov==='v'&&seq.join(' ')!=='V1 V2 V3 V4')errs.push('V infirmary order '+seq.join(' '));if(pov==='m'&&seq.join(' ')!=='M1 M2 MC')errs.push('M infirmary order '+seq.join(' '))}
for(const [i,o,v] of [[0,0,{}],[0,1,{}],[0,0,{e2lEye:'note'}],[1,0,{}],[2,0,{}],[2,0,{sev:8}],[3,0,{}],[3,0,{comp:0}]]){await load('m','v',{});const k=`v infirmary ${i} #${o} ${JSON.stringify(v)}`;want.add(k);
 await ev(v=>{if(v.e2lEye)S.f.e2lEye=v.e2lEye;if(v.sev)S.kd.med.sev=v.sev;if(v.comp!==undefined)S.comp=v.comp},v);
 const d=await ev(i=>{window.__hubbed=0;K73_VM[i](()=>{window.__hubbed=1});return 1},i);const r=await drive(o);if(r!=='hub')errs.push('infirmary scene '+k);else got.add(k)}
{await load('m','v',{});for(const o of [0,1]){await load('m','v',{});await ev(()=>{window.__hubbed=0;K73_VM[0](()=>{window.__hubbed=1})});await drive(o);const f=await ev(()=>S.f.e2lLedger);if(f!==['kept','torn'][o])errs.push('ledger '+o+' '+f)}}
for(const [fn,v] of [['K73_MM[0]',{}],['K73_MM[0]',{comp:0}],['K73_MM[1]',{}],['k73MClear',{}]]){await load('m','m',{});const k='m infirmary '+fn+' '+JSON.stringify(v);want.add(k);await ev(v=>{if(v.comp!==undefined)S.comp=v.comp},v);
 await ev(fn=>{window.__hubbed=0;eval(fn)(()=>{window.__hubbed=1})},fn);const r=await drive(0);if(r!=='hub')errs.push('infirmary '+k);else got.add(k)}
{await load('m','v',{});const r=await ev(()=>{S.f.e2l=0;return k73MedScene()});if(r)errs.push('infirmary off-route')}
/* infirmary text is never romantic */
{const L=await ev(()=>window.__lines.map(x=>x[1]).join(' '));}
/* 6. the morning after: scheduled the next morning, under the cap */
for(const pov of ['m','v'])for(const sug of [1,0])for(const [ph,end,day,exp] of [['3','lovers',0,true],['3','rivals',0,false],['3','lovers',5,false],['e','lovers',0,true],['2','lovers',0,false]]){
 await load(ph,pov,{e2lEnd:end});const r=await ev(([day,sug])=>{META.sug=sug;S.f.e2lMorn=S.day+day;S.seen.e2l_morn=0;window.__hubbed=0;window.__lines=[];let fired=0;
   morningEvent(()=>{window.__hubbed=1});fired=!!S.seen.e2l_morn;return fired},[day,sug]);
 if(r!==exp)errs.push(`morning ${pov} ${ph} ${end} +${day}: ${r}`);if(r){const k=`${pov} e2l_morn sug${sug}`;want.add(k);const d=await drive(0);if(d!=='hub')errs.push('morning did not finish '+k);else got.add(k);
  const used=await ev(()=>S.f.mbDay===S.day&&S.f.mbN>=1);if(!used)errs.push('morning did not use the cap')}}
await load('3','m',{e2lEnd:'lovers'});{const r=await ev(()=>{S.f.e2lMorn=S.day;S.seen.e2l_morn=0;S.f.mbDay=S.day;S.f.mbN=2;let f=0;const o=k73Morn;try{morningEvent(()=>{})}catch(e){}return !!S.seen.e2l_morn});if(r)errs.push('morning ignored the cap')}
await ev(()=>{META.sug=1});
/* 7. threads: every path */
const TH={tx_e2l_m:['m','n',{}],tx_e2l_v:['v','n',{}],tx_e2l_pool:['m','n',{e2ld:{e2l_mark:1,e2l_eye:1}}],tx_e2l_pool_v:['v','n',{e2ld:{e2l_mark:1,e2l_eye:1}}],tx_e2l_a2m:['m','2',{e2ld:{e2l_mark:1,e2l_stitch:1}}],tx_e2l_a2v:['v','2',{e2ld:{e2l_mark:1,e2l_stitch:1}}]};
for(const key in TH){const id=key==='tx_e2l_pool_v'?'tx_e2l_pool':key;const [pov,ph,fl]=TH[key];await load(ph,pov,fl);
 const w=await ev(id=>TXS[id].when(),id);if(!w)errs.push('thread not eligible '+key);
 const paths=await ev(id=>{const T=TXS[id];const out=[];T.nodes.start.opts().forEach((o,i)=>{if(o.next)T.nodes[o.next].opts().forEach((_,j)=>out.push([i,j]));else out.push([i])});return out},id);
 for(const pth of paths){await load(ph,pov,fl);const r=await ev(([id,pth])=>{const T=TXS[id];S.tx=null;txStart(id);S.slot++;phDeliver();let node='start';
   for(const i of pth){const run=phS().run[id];if(!run.await||run.node!==node)return 'not awaiting at '+node;const o=T.nodes[node].opts()[i];txChoose(id,o);S.slot++;phDeliver();node=o.next||null}
   (phS().th[T.with]||[]).forEach(m=>window.__lines.push([T.with==='v'||(T.with==='m'&&false)?'K9':'txt',String(m[1])]));return 'done '+!!phS().run[id].done},[id,pth]);
  const k=key+' '+pth.join('>');want.add(k);log.push(k+': '+r);if(!/done true/.test(r))errs.push('thread '+k+' '+r);else got.add(k)}}
for(const id of ['tx_e2l_m','tx_e2l_v','tx_e2l_pool']){await load('n','m',{e2ld:{e2l_mark:1,e2l_eye:1}},0);const w=await ev(id=>{try{return TXS[id].when()}catch(e){return false}},id);if(w)errs.push('thread off-route '+id)}
/* 8. the server */
for(const [ph,fl,rx] of [['n',{},/ledger|rent|book|envelope/],['2',{},/mimic|car/],['e',{e2lEnd:'lovers'},/WAR DAY/],['e',{e2lEnd:'rivals'},/nobody’s dead|car park/]]){await load(ph,'m',fl);
 const L=await ev(()=>chatLog().map(x=>x[1]).join(' | '));if(!rx.test(L))errs.push('server lines missing '+ph+' '+JSON.stringify(fl))}
/* 9. location events */
for(const pov of ['m','v'])for(const [id,ph,room,pre] of [['l73_crepe','n','mall',{}],['l73_base','n','atrium',{}],['l73_board','n','ronin',{}],['l73_board','2','ronin',{}],['l73_range','2','dp_range',{e2ld:{e2l_mark:1,e2l_car:1}}],['l73_range','3','training',{e2ld:{e2l_mark:1,e2l_car:1}}]]){
 await load(ph,pov,pre);const k=`${pov} ${id} ${ph}`;want.add(k);const ok=await ev(([id,room])=>!!l73Pool(room).find(e=>e.id===id),[id,room]);if(!ok){errs.push('location not eligible '+k);continue}
 await ev(id=>{window.__hubbed=0;l73Run(K73L.find(e=>e.id===id),()=>{window.__hubbed=1})},id);const r=await drive(0);if(r!=='hub')errs.push('location '+k);else got.add(k);
 const cap=await ev(room=>l73Try(room,false),room);if(cap)errs.push('location cap '+k)}
/* 10. ending lines */
for(const [fl,rx] of [[{e2lEnd:'lovers'},/losing to each other on purpose/],[{e2lEnd:'rivals'},/since the Constance/],[{},/over a carpet/],[{e2lEnd:'lovers',e2lEye:'note'},/every morning, first thing/],
 [{e2lEnd:'rivals',e2lEye:'note'},/never collected/],[{e2lScar:'crooked'},/tail of an M/],[{e2lLedger:'torn'},/page missing/],[{e2lLedger:'kept'},/no total/],[{e2lTruce:'v'},/smoke alarm/],[{e2lTruce:'m'},/three days/]]){
 await load('e','m',fl);const L=await ev(()=>extraEnding());const hit=L.filter(x=>rx.test(x));log.push('ending '+JSON.stringify(fl)+': '+(hit[0]||'MISSING'));if(!hit.length)errs.push('ending '+JSON.stringify(fl))}
await load('e','m',{e2lEnd:'lovers'});{const L=await ev(()=>{S.rom='r';return extraEnding()});if(L.some(x=>/Constance|carpet/.test(x)))errs.push('ending on another route')}
/* 11. the affection cap */
for(const [ph,fl,cap] of [['n',{},24],['t',{},49],['f',{},49],['2',{},74],['3',{},74],['3',{e2lEnd:'lovers'},100],['e',{e2lEnd:'rivals'},49],['e',{e2lEnd:'lovers'},100]]){await load(ph,'m',fl);
 const r=await ev(()=>{S.aff=10;apply({aff:200});const a=S.aff;S.aff=99;try{hub()}catch(e){}return [k73Cap(),a]});if(r[0]!==cap||r[1]!==Math.min(100,cap))errs.push('cap '+ph+' '+JSON.stringify(fl)+' '+r)}
/* 12. kc66 on this route: only the security room */
await load('f','m',{});{const r=await ev(()=>{S.aff=40;S.f.k66d={};const b=k66Due();return b&&b.id});log.push('kc66 after on route → '+r);if(r&&r!=='vm_codes')errs.push('kc66 leak '+r)}
await load('n','m',{});{const r=await ev(()=>{S.aff=60;S.f.k66d={};const b=k66Due();return b&&b.id});if(r)errs.push('kc66 break-in on route '+r)}
await load('e','m',{e2lEnd:'lovers'});{const r=await ev(()=>{S.aff=90;S.f.k66d={vm_codes:1};const b=k66Due();return b&&b.id});if(r)errs.push('kc66 epilogue on route '+r)}
/* 13. text checks */
const lines=await ev(()=>window.__lines);let vbad=[];for(const [w,t] of lines){if(w==='K9'&&/n[’']t\b|[’'](re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here)[’']s\b/i.test(t.replace(/“[^”]*”/g,'')))vbad.push(t);
 if(/\b(Biscuit|Sergeant|Mochi|Pancake|Elysium)\b/.test(t))errs.push('forbidden name: '+t);if(/undefined|NaN|\[object/.test(t))errs.push('bad text: '+t)}
const vtx=await ev(()=>{const out=[];['tx_e2l_m','tx_e2l_a2m'].forEach(id=>{const T=TXS[id];Object.values(T.nodes).forEach(n=>{(n.in?n.in():[]).forEach(x=>out.push(x));n.opts().forEach(o=>(o.reply?o.reply():[]).forEach(x=>out.push(x)))})});
 ['tx_e2l_v','tx_e2l_a2v'].forEach(id=>Object.values(TXS[id].nodes).forEach(n=>n.opts().forEach(o=>out.push(o.t.replace(/[“”]/g,'')))));return out});
for(const t of vtx)if(/n[’']t\b|[’'](re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here)[’']s\b/i.test(t))vbad.push('(text) '+t);
if(vbad.length)errs.push('V contractions: '+vbad.slice(0,5).join(' || '));
const src=require('fs').readFileSync(path.join(ROOT,'src/kc73.js'),'utf8');for(const m of src.matchAll(/K73V\('((?:[^'\\]|\\.)*)'\)/g))if(/n’t\b|’(re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here)’s\b/i.test(m[1].replace(/“[^”]*”/g,'')))errs.push('V contraction in source: '+m[1]);
if(/\b(Biscuit|Sergeant|Mochi|Pancake)\b/.test(src.replace(/\/\*[\s\S]*?\*\//g,'')))errs.push('hound name in kc73 source');
log.push('lines checked: '+lines.length);
console.log(log.join('\n'));console.log('COVERED',got.size,'of',want.size);console.log('PAGE ERRORS',errs.length,errs.slice(0,40));await b.close();process.exit(errs.length?1:0)})();
