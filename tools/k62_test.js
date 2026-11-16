/* kc62: every spot, option, daily scene, side option, aftermath scene and variant of "the good one", both POVs and
   both aftermath settings. Usage: node tools/k62_test.js */
const ROOT=require('path').resolve(__dirname,'..');
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+ROOT+'/index.html');await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
await p.evaluate(()=>{globalThis.KD_AUTO=1;document.querySelectorAll('.splash').forEach(e=>e.remove())});
const ev=(f,a)=>p.evaluate(f,a);let bad=0,runs=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
await ev(()=>{window.__said=[];const _S=window.say;window.say=function(L,cb){try{(L||[]).forEach(l=>{if(l)window.__said.push((l[0]||'')+': '+l[1])})}catch(e){}return _S.apply(this,arguments)}});
await ev(()=>{window.__drain=(pick,opts)=>{let first=1;for(let k=0;k<60;k++){for(let i=0;i<400&&dlg;i++){adv()}
  if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt')];const en=os.filter(o=>!o.classList.contains('dis'));if(!en.length)break;opts.push(os.map(o=>(o.classList.contains('dis')?'×':'')+o.textContent.slice(0,28)).join(' / '));
   const o=os[Math.min(first?pick:0,os.length-1)];(o.classList.contains('dis')?en[0]:o).click();first=0;continue}if(!dlg)break}}});
const load=i=>ev(i=>{benchLoad(BENCH[i]);for(let k=0;k<80&&dlg;k++)adv();if(ctrl&&ctrl.close)try{ctrl.close()}catch(e){}},i);
const play=(setup,fn,pick,flags)=>{runs++;return ev(([setup,fn,pick,flags])=>{const opts=[];window.__done=0;window.__said=[];try{(new Function(setup))();const r=(new Function('cb',fn))(()=>{window.__done=1});__drain(pick||0,opts);
  return {r:r===undefined?null:r,done:window.__done,n:window.__said.length,txt:window.__said.join(' | '),opts,f:(flags||[]).map(k=>S.f[k])}}catch(e){return {err:e.message+' '+(e.stack||'').split('\n')[1]}}},[setup,fn,pick||0,flags||[]])};
const F=['k62Th','k62LsAt','k62Rule','k62Mouth','k62MP','k62Nap','k62Fl','k62FlC','k62Day','k62VW','k62VX','k62VC','k62VKnock','k62Go','k62VSink','k62VPlan','k62Sir','k62Walk','k62Clock','k62Rep','k58Stair','kdThanks','kdInterrupted','k61Day','kdMindDay'];
const med=(pov,o)=>`S.captor=S.captor||captorOrg();S.takenDay=S.takenDay||S.day-6;S.pov="${pov}";S.dark=0;S.lone=null;S.phase="after";if(!S.kd)KD();S.kd.days=6;S.kd.med=${JSON.stringify(o)};S.done={};S.slot=1;S.aff=100;S.fr={a:60,r:60};S.comp=30;META.kdFull=1;`+F.map(k=>`S.f.${k}=0;`).join('');
const spot=lab=>`const sp=ROOMS.medbay.spots.find(s=>s.label===${JSON.stringify(lab)}&&(!s.show||s.show()));if(!sp)return 'hidden';sp.act();cb();`;
const shown=lab=>`return !!ROOMS.medbay.spots.find(s=>s.label===${JSON.stringify(lab)}&&(!s.show||s.show()));`;
const chk=(label,r,c)=>{if(r.err)return ok(0,label+' ERR '+r.err);ok(r.done,label+' not done '+JSON.stringify(r).slice(0,300));if(c)ok(c(r),label+' check '+JSON.stringify(r).slice(0,500));if(process.env.V)console.log(label,JSON.stringify(r).slice(0,300))};
const sc=`const f=k62Scene();if(!f)return 'none';f(cb);`;
let r;

/* ================= Misaki, in the infirmary ================= */
await load(0);
const cell=med('m',{d:1,clar:0,run:0,sev:0});
const clear=med('m',{d:2,clar:2,run:0,sev:0,shattered:1});
const LS='Listen for the tall one';
/* the file: four entries, both options each, and the variants */
const TH=[[/nine steps/i,/back stair/],[/both hands/,/callus/],[/laundry soap/,/across the seat of the truck/],[/raised his voice/,/You know my name/]];
for(let i=0;i<4;i++)for(const pick of [0,1]){
 const vars=i===0?['S.f.k58Stair="his";','S.f.k58Stair="over";']:i===1?['META.kdFull=1;','META.kdFull=0;']:i===3?['S.f.kdThanks=2;','S.f.kdThanks=0;']:[''];
 for(const v of vars){r=await play(cell+`S.f.k62Th=${i};`+v,spot(LS),pick,['k62Th','k62Rule','k62Mouth']);
  chk(`file ${i} pick${pick} ${v}`,r,r=>r.r===null&&r.f[0]===i+1&&TH[i][0].test(r.txt)&&(pick===0||TH[i][1].test(r.txt))
   &&(i!==0||pick===0||(/seventh step/.test(r.txt)===(v.includes('his'))))
   &&(i!==1||(v.includes('=1')?/hours that are gone/.test(r.txt):/broken three times/.test(r.txt)))
   &&(i!==2||pick!==0||r.f[2]===1)
   &&(i!==3||(r.f[1]===(pick?'name':'polite')&&(v.includes('=2')?/started keeping him/.test(r.txt):/thought about it for a day/.test(r.txt)))))}}
r=await play(cell+'S.f.k62LsAt=S.day+"/"+S.slot;',shown(LS));ok(r.r===false,'file once per time of day');
r=await play(cell+'S.f.k62LsAt=S.day+"/0";',shown(LS));ok(r.r===true,'file again later in the day');
r=await play(cell+'S.f.k62Th=4;',shown(LS));ok(r.r===false,'file ends at four');
r=await play(clear,shown(LS));ok(r.r===false,'file hidden once she knows the room');
r=await play(med('v',{d:1,clar:0,run:0,sev:0}),shown(LS));ok(r.r===false,'file hidden in V POV');
/* evenings: the sink, then the napkin (both choices) */
r=await play(cell+'S.slot=2;',sc,0,['k62MP','k62Day']);chk('evening sink',r,r=>r.f[0]===1&&r.f[1]>0&&/It is your sink/.test(r.txt));
for(const [pick,want] of [[0,'fold'],[1,'keep']]){r=await play(cell+'S.slot=2;S.f.k62MP=1;',sc,pick,['k62MP','k62Nap']);chk('evening napkin '+want,r,r=>r.f[0]===2&&r.f[1]===want&&/napkin/.test(r.txt))}
r=await play(cell+'S.slot=2;S.f.k62MP=2;',sc);ok(r.r==='none','evening list ends');
r=await play(cell+'S.slot=1;',sc);ok(r.r==='none','evening only');
r=await play(clear+'S.slot=2;',sc);ok(r.r==='none','no evening scenes once she knows');
r=await play(cell+'S.slot=2;S.f.k62Day=S.day;',sc);ok(r.r==='none','one a day');
r=await play(cell+'S.slot=2;S.f.k61Day=S.day;S.f.kdUncDay=S.day;','hub();cb();',0,['k62MP']);chk('evening via hub',r,r=>r.f[0]===1);
/* worst route, after she reasons it out (or is talked out): it comes back when he walks in */
for(const [pick,want] of [[0,'name'],[1,'eat']])for(const intr of [0,1]){
 r=await play(med('m',{d:2,clar:2,run:0,sev:9,logicOut:1,shattered:1})+`S.f.kdInterrupted=${intr};`,sc,pick,['k62Fl','k62FlC']);
 chk(`worst flash ${want} intr${intr}`,r,r=>r.f[0]===1&&r.f[1]===want&&/Sir, to V/.test(r.txt)&&(intr?/held your wrists/.test(r.txt):/worked it out yourself/.test(r.txt)))}
r=await play(med('m',{d:2,clar:2,run:0,sev:9,logicOut:1,shattered:1})+'S.f.k62Fl=1;S.slot=2;',sc);ok(r.r==='none','worst flash once');
r=await play(med('m',{d:2,clar:2,run:0,sev:2,logicOut:1,shattered:1}),sc);ok(r.r==='none','flash only on the worst stay');
r=await play(med('m',{d:2,clar:0,run:0,sev:9})+'S.slot=2;',sc,0,['k62MP']);chk('worst route still deluded gets the evenings',r,r=>r.f[0]===1);

/* ================= V, in the infirmary ================= */
await load(1);
const vcell=med('v',{d:1,clar:1,run:0,sev:0});
const side=lab=>`const o=sideHub(false).find(o=>o.t===${JSON.stringify(lab)});if(!o)return 'none';if(o.dis)return 'dis';o.fn();cb();`;
const GO='Go in anyway';
r=await play(vcell+'S.f.k62Day=S.day;',side(GO),0,['k62Go']);chk('go 0',r,r=>r.f[0]===1&&/parking attendants/.test(r.txt));
for(const [pick,want] of [[0,'your'],[1,'v']]){r=await play(vcell+'S.f.k62Day=S.day;S.f.k62Go=1;',side(GO),pick,['k62Go','k62VSink']);chk('go sink '+want,r,r=>r.f[0]===2&&r.f[1]===want&&/allowed to cry/.test(r.txt))}
for(const [pick,want] of [[0,'same'],[1,'six']]){r=await play(vcell+'S.f.k62Day=S.day;S.f.k62Go=2;',side(GO),pick,['k62Go','k62VPlan']);chk('go plan '+want,r,r=>r.f[0]===3&&r.f[1]===want&&/plan for him/.test(r.txt))}
r=await play(vcell+'S.f.k62Go=3;',side(GO));ok(r.r==='none','go ends');
r=await play(vcell+'S.done.k62Go=1;',side(GO));ok(r.r==='dis','go once a day');
r=await play(med('v',{d:2,clar:2,run:0,sev:0}),side(GO));ok(r.r==='none','go only while she does not know him');
r=await play(med('m',{d:1,clar:0,run:0,sev:0}),side(GO));ok(r.r==='none','go is V only');
/* daily, by band */
r=await play(med('v',{d:2,clar:1,run:0,sev:9}),sc,0,['k62VW']);chk('V worst',r,r=>r.f[0]===1&&/good one/.test(r.txt));
r=await play(med('v',{d:2,clar:1,run:0,sev:9})+'S.f.k62VW=1;',sc);ok(r.r==='none','V worst once, nothing else on the worst stay');
r=await play(med('v',{d:0,clar:0,run:0,sev:9}),sc);ok(r.r==='none','V worst not on day 0');
r=await play(med('v',{d:3,clar:0,run:0,sev:5,xd:1,ext:1}),sc,0,['k62VX']);chk('V ext coat',r,r=>r.f[0]===1&&/through her mouth/.test(r.txt));
for(const [pick,want] of [[0,1],[1,0]]){r=await play(med('v',{d:2,clar:2,run:0,sev:5}),sc,pick,['k62VC','k62VKnock']);chk('V clear sir '+pick,r,r=>r.f[0]===1&&r.f[1]===want&&/sir/.test(r.txt))}
r=await play(med('v',{d:2,clar:2,run:0,sev:2}),sc);ok(r.r==='none','V clear sir only after a bad stay');
r=await play(med('v',{d:2,clar:2,run:0,sev:5})+'S.slot=0;',sc);ok(r.r==='none','V not at the first hub of the day');
r=await play(med('v',{d:2,clar:2,run:0,sev:5})+'S.f.k61VCN=2;','hub();cb();',0,['k62VC']);chk('V via hub',r,r=>r.f[0]===1);

/* ================= after discharge ================= */
const post=pov=>`S.pov="${pov}";S.phase="after";if(!S.kd)KD();S.kd.med=null;S.kd.t0=S.day-12;S.kd.days=6;S.kd.sev0=0;S.dark=0;S.lone=null;S.aff=100;S.fr={a:60,r:60};`+['kd62_sir','kd62_good','kd62_clock','kd62_report'].map(k=>`S.f.${k}=0;S.seen.${k}=0;`).join('')+'S.f.k58_creak=0;S.f.kd_hard_work=0;S.f.kd_v_sees=0;'+F.map(k=>`S.f.${k}=0;`).join('');
const evr=id=>`const e=EVENTS.find(e=>e.id===${JSON.stringify(id)});let w;KD_RUN=1;try{w=e.when()}finally{KD_RUN=0}if(!w)return 'not due';S.seen[e.id]=1;e.run(cb);`;
for(const [bi,pov] of [[2,'m'],[3,'v']]){await load(bi);const me=pov==='m';
 /* sir: both choices, ordinary and worst */
 for(const w of [0,9])for(const [pick,want] of [[0,'name'],[1,'left']]){r=await play(post(pov)+`S.kd.sev0=${w};`,evr('kd62_sir'),pick,['kd62_sir','k62Sir']);
  chk(`sir ${pov} w${w} ${want}`,r,r=>r.f[0]===1&&r.f[1]===want&&/sir/i.test(r.txt)&&(/second time this morning/.test(r.txt)===!!w))}
 /* the file, told: both choices, with and without a file */
 for(const th of [0,4])for(const [pick,want] of me?[[0,'change'],[1,'keep']]:[[0,'keep'],[1,'ask']]){r=await play(post(pov)+`S.f.kd62_sir=1;S.f.k62Th=${th};`,evr('kd62_good'),pick,['kd62_good','k62Walk']);
  chk(`good ${pov} th${th} ${want}`,r,r=>r.f[0]===1&&r.f[1]===want&&(th?/Nine steps from the stairs/.test(r.txt)&&/worst thing in it/.test(r.txt):/very neat/.test(r.txt)))}
 r=await play(post(pov),evr('kd62_good'));ok(r.r==='not due','good waits for sir '+pov);
 /* the timetable: both choices, worst and not, the seventh step or not */
 for(const w of [0,9])for(const [st,line] of [['his','seventh'],['over','landing']])for(const [pick,want] of [[0,'told'],[1,'kept']]){
  r=await play(post(pov)+`S.f.k58_creak=1;S.kd.sev0=${w};S.f.k58Stair="${st}";`,evr('kd62_clock'),pick,['kd62_clock','k62Clock']);
  chk(`clock ${pov} w${w} ${st} ${want}`,r,r=>r.f[0]===1&&r.f[1]===want&&(/good one again|tall one’s voice/.test(r.txt)===!!w)&&(want!=='told'||new RegExp(line).test(r.txt)))}
 r=await play(post(pov),evr('kd62_clock'));ok(r.r==='not due','clock waits for the stair '+pov);
 /* the report: both choices; Misaki cannot sit unasked at a low tier */
 const hard=me?'S.f.kd_hard_work=1;':'S.f.kd_v_sees=1;';
 for(const [pick,want] of [[0,'wait'],[1,'sat']]){r=await play(post(pov)+hard,evr('kd62_report'),pick,['kd62_report','k62Rep']);chk(`report ${pov} ${want}`,r,r=>r.f[0]===1&&r.f[1]===want&&/fifty-two|11:52/.test(r.txt))}
 if(me){r=await play(post(pov)+hard+'S.aff=5;',evr('kd62_report'),1,['k62Rep']);chk('report low tier',r,r=>r.f[0]==='wait'&&r.opts[0].includes('×Sit down'))}
 r=await play(post(pov),evr('kd62_report'));ok(r.r==='not due','report waits for the hardening '+pov);
 r=await play(post(pov)+hard+'S.kd.t0=S.day-5;',evr('kd62_report'));ok(r.r==='not due','report waits for day 11 '+pov);
 /* the scheduler reaches each one */
 const kn=await ev(c=>{(new Function(c))();S.f.k58_creak=1;S.f.kd_hard_work=1;S.f.kd_v_sees=1;EVENTS.filter(e=>e.kd&&!/^kd62_/.test(e.id)).forEach(e=>S.seen[e.id]=1);const out=[];
  for(let i=0;i<4;i++){const e=kdNext();if(!e)break;out.push(e.id);S.seen[e.id]=1;S.f[e.id]=1}return out},post(pov));
 ok(kn.length===4&&kn[0]==='kd62_sir'&&kn[1]==='kd62_good'&&kn.includes('kd62_clock')&&kn.includes('kd62_report'),'kdNext '+pov+' '+kn);
 const lone=await ev(c=>{(new Function(c))();S.lone='v';const e=EVENTS.find(e=>e.id==='kd62_sir');KD_RUN=1;try{return e.when()}finally{KD_RUN=0;S.lone=null}},post(pov));ok(!lone,'not lone '+pov)}
const ord=await ev(()=>['kd61_home','kd62_sir','kd61_rent','kd62_good','k58_creak','kd62_clock','kd_v_sees','kd62_report'].map(k=>KD_ORDER.indexOf(k)));
ok(ord.every(i=>i>=0)&&ord[0]<ord[1]&&ord[2]<ord[3]&&ord[4]<ord[5]&&ord[6]<ord[7]&&ord[1]<ord[3],'KD_ORDER '+ord);
/* ending lines */
const en=await ev(()=>{S.kd.t0=S.kd.t0||1;const f=S.f,out=[];f.kd62_sir=1;f.k62Sir='left';f.k62Clock='told';f.k62Th=4;f.kd62_good=1;
 out.push(extraEnding().filter(x=>/still calls V sir|cactus magnet|the good one/.test(x)).length);f.k62Sir='name';out.push(extraEnding().some(x=>/once, on the second morning/.test(x)));
 f.kd62_sir=0;f.k62Clock=0;f.k62Th=0;f.kd62_good=0;out.push(extraEnding().some(x=>/sir|cactus magnet|good one/.test(x)));return out});
ok(en[0]===3&&en[1]&&!en[2],'ending lines '+en);
console.log('runs',runs,'page errors',errs.length);errs.slice(0,10).forEach(e=>console.log('  ',e));
console.log(bad||errs.length?'K62 FAIL '+bad:'K62 OK');await b.close();process.exit(bad||errs.length?1:0)})();
