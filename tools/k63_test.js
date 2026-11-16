/* kc63: every spot, option (greyed ones included), daily scene, shatter hook, aftermath scene and variant of "what her
   head does", both POVs and both aftermath settings. Usage: node tools/k63_test.js */
const ROOT=require('path').resolve(__dirname,'..');
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+ROOT+'/index.html');await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
await p.evaluate(()=>{globalThis.KD_AUTO=1;document.querySelectorAll('.splash').forEach(e=>e.remove())});
const ev=(f,a)=>p.evaluate(f,a);let bad=0,runs=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
await ev(()=>{window.__said=[];const _S=window.say;window.say=function(L,cb){try{(L||[]).forEach(l=>{if(l)window.__said.push((l[0]||'')+': '+l[1])})}catch(e){}return _S.apply(this,arguments)}});
/* picks: a number (first option box) or an array (one entry per option box, in order); later boxes default to 0 */
await ev(()=>{window.__drain=(pick,opts)=>{const P=Array.isArray(pick)?pick:[pick];let n=0;for(let k=0;k<60;k++){for(let i=0;i<400&&dlg;i++){adv()}
  if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt')];const en=os.filter(o=>!o.classList.contains('dis'));if(!en.length)break;opts.push(os.map(o=>(o.classList.contains('dis')?'×':'')+o.textContent.slice(0,80)).join(' / '));
   const o=os[Math.min(P[n]||0,os.length-1)];n++;(o.classList.contains('dis')?en[0]:o).click();continue}if(!dlg)break}}});
const load=i=>ev(i=>{benchLoad(BENCH[i]);for(let k=0;k<80&&dlg;k++)adv();if(ctrl&&ctrl.close)try{ctrl.close()}catch(e){}},i);
const play=(setup,fn,pick,flags)=>{runs++;return ev(([setup,fn,pick,flags])=>{const opts=[];window.__done=0;window.__said=[];try{(new Function(setup))();const r=(new Function('cb',fn))(()=>{window.__done=1});__drain(pick||0,opts);
  return {r:r===undefined?null:r,done:window.__done,n:window.__said.length,txt:window.__said.join(' | '),opts,f:(flags||[]).map(k=>S.f[k])}}catch(e){return {err:e.message+' '+(e.stack||'').split('\n')[1]}}},[setup,fn,pick||0,flags||[]])};
const F=['k63Band','k63MC','k63MX','k63MW','k63Day','k63Sh','k63ShW','k63XB','k63XBa','k63WB','k63Up','k63Quiz','k63Note','k63Yday','k63Ord','k63Pulse','k63Name','k63VC','k63VX','k63VW','k63VB','k63Boots','k63Alarm','k63Card',
 'k61Day','k62Day','k61Tubs','k61Lids','kdMindDay','kdInterrupted','k62Fl'];
/* quiet: kc61's and kc62's scenes for today are already done, so the hub is free for this module */
const QUIET='S.f.k61Day=S.day;S.f.k62Day=S.day;';
const med=(pov,o)=>`S.captor=S.captor||captorOrg();S.takenDay=S.takenDay||S.day-6;S.pov="${pov}";S.dark=0;S.lone=null;S.phase="after";if(!S.kd)KD();S.kd.days=6;S.kd.med=${JSON.stringify(o)};S.done={};S.slot=1;S.aff=100;S.fr={a:60,r:60};S.comp=30;META.kdFull=1;`+F.map(k=>`S.f.${k}=0;`).join('');
const spot=lab=>`const sp=ROOMS.medbay.spots.find(s=>s.label===${JSON.stringify(lab)}&&(!s.show||s.show()));if(!sp)return 'hidden';sp.act();cb();`;
const shown=lab=>`return !!ROOMS.medbay.spots.find(s=>s.label===${JSON.stringify(lab)}&&(!s.show||s.show()));`;
const chk=(label,r,c)=>{if(r.err)return ok(0,label+' ERR '+r.err);ok(r.done,label+' not done '+JSON.stringify(r).slice(0,300));if(c)ok(c(r),label+' check '+JSON.stringify(r).slice(0,600));if(process.env.V)console.log(label,JSON.stringify(r).slice(0,300))};
const sc=`const f=k63Scene();if(!f)return 'none';f(cb);`;
const grey=(r,lab)=>r.opts.length>0&&r.opts[0].includes('×'+lab);
let r;

/* ================= Misaki, in the infirmary ================= */
await load(0);
const clear=med('m',{d:2,clar:2,run:0,sev:0,shattered:1});
const cell=med('m',{d:1,clar:0,run:0,sev:0});
/* the wristband: both settings, both choices, the greyed one */
for(const full of [1,0])for(const [pick,want,re] of [[0,'read',/crossword/],[1,'sleeve',/cuff/]]){
 r=await play(clear+`META.kdFull=${full};`,spot('Your wristband'),pick,['k63Band']);
 chk(`band full${full} ${want}`,r,r=>r.r===null&&r.f[0]===want&&/UNCOOPERATIVE/.test(r.txt)&&re.test(r.txt)&&grey(r,'Ask him to cut')&&(full?/The doctor wrote/.test(r.txt):/V wrote it/.test(r.txt)&&!/doctor/i.test(r.txt)))}
await ev(()=>{META.kdFull=1});
r=await play(clear+'S.f.k63Band="read";',shown('Your wristband'));ok(r.r===false,'band once');
r=await play(cell,shown('Your wristband'));ok(r.r===false,'band hidden in the cell reading');
r=await play(med('v',{d:2,clar:2,run:0,sev:0}),shown('Your wristband'));ok(r.r===false,'band hidden in V POV');

/* clear: the questions (both settings, both choices), the note (both choices) */
for(const full of [1,0])for(const [pick,want,re] of [[0,'hard',/Thursday/],[1,'stop',/mental arithmetic/]]){
 r=await play(clear+QUIET+`META.kdFull=${full};`,sc,pick,['k63MC','k63Quiz','k63Day']);
 chk(`questions full${full} ${want}`,r,r=>r.f[0]===1&&r.f[1]===want&&r.f[2]>0&&/biscuit tin/.test(r.txt)&&re.test(r.txt)&&grey(r,'Ask V if your answers')&&(full?/hours the questions/.test(r.txt):/a van the questions/.test(r.txt)))}
await ev(()=>{META.kdFull=1});
for(const [pick,want,re] of [[0,'count',/heartbeats|gaps between/],[1,'pump',/hand flat on the pump/]]){
 r=await play(clear+QUIET+'S.f.k63MC=1;',sc,pick,['k63MC','k63Note']);chk('note '+want,r,r=>r.f[0]===2&&r.f[1]===want&&/high note/.test(r.txt)&&re.test(r.txt)&&grey(r,'Ask V if he can hear'))}
r=await play(clear+QUIET+'S.f.k63MC=2;',sc);ok(r.r==='none','clear list ends');
r=await play(clear+QUIET+'S.slot=0;',sc);ok(r.r==='none','not in the morning');
r=await play(clear+QUIET+'S.f.k63Day=S.day;',sc);ok(r.r==='none','one a day');
r=await play(clear+QUIET+'S.kd.med.shattered=0;',sc);ok(r.r==='none','not before the shatter');
r=await play(clear,sc);ok(r.r==='none','waits while kc61 has a scene due');
r=await play(clear+'S.f.k61Day=S.day;S.f.k61CN=2;S.f.k62Day=S.day;','hub();cb();',0,['k63MC']);chk('clear via hub',r,r=>r.f[0]===1);

/* extended delusion: which day was real; the order (both choices each, greyed shown) */
const ext=med('m',{d:3,clar:0,run:0,sev:5,xd:1,ext:0,shattered:1});
for(const [pick,want,re] of [[0,'hold',/the island, the cereal/],[1,'bars',/hands stop shaking/]]){
 r=await play(ext+QUIET,sc,pick,['k63MX','k63Yday']);chk('yesterday '+want,r,r=>r.f[0]===1&&r.f[1]===want&&/pat this one down/.test(r.txt)&&re.test(r.txt)&&grey(r,'Ask the tall one'))}
for(const [pick,want,re] of [[0,'self',/your own name first/],[1,'list',/phone number/]]){
 r=await play(ext+QUIET+'S.f.k63MX=1;',sc,pick,['k63MX','k63Ord']);chk('order '+want,r,r=>r.f[0]===2&&r.f[1]===want&&/forgive you fastest/.test(r.txt)&&re.test(r.txt)&&grey(r,'Tear it up'))}
r=await play(ext+QUIET+'S.f.k63MX=2;',sc);ok(r.r==='none','ext list ends');
r=await play(ext+'S.f.k61Day=S.day;S.f.k61XN=2;S.f.k62Day=S.day;','hub();cb();',0,['k63MX']);chk('ext via hub',r,r=>r.f[0]===1);
/* extended: clarity comes back without breaking (both choices); it has priority over the clear list */
for(const [pick,want,re] of [[0,'date',/reading off a gauge/],[1,'wait',/taken off you twice/]]){
 r=await play(med('m',{d:3,clar:2,run:0,sev:5,xd:1,ext:0,shattered:1})+QUIET,sc,pick,['k63XB','k63XBa','k63MC']);
 chk('ext back '+want,r,r=>r.f[0]===1&&r.f[1]===want&&r.f[2]===0&&/without breaking/.test(r.txt)&&re.test(r.txt)&&grey(r,'Tell V it'))}
r=await play(med('m',{d:3,clar:2,run:0,sev:5,xd:1,ext:0,shattered:1})+QUIET+'S.f.k63XB=1;',sc,0,['k63MC']);chk('ext back once, then the clear list',r,r=>r.f[0]===1);

/* worst route, still deluded: the pulse, the name (both choices each), only after that day's state of mind */
const wr=med('m',{d:2,clar:0,run:0,sev:9});
for(const [pick,want,re] of [[0,'again',/Eighty-eight/],[1,'off',/sit on the hand/]]){
 r=await play(wr+QUIET+'S.f.kdMindDay=S.day;',sc,pick,['k63MW','k63Pulse']);chk('pulse '+want,r,r=>r.f[0]===1&&r.f[1]===want&&/Some people knit/.test(r.txt)&&re.test(r.txt)&&grey(r,'Let it be'))}
for(const [pick,want,re] of [[0,'say',/forty times/],[1,'pillow',/twice more/]]){
 r=await play(wr+QUIET+'S.f.kdMindDay=S.day;S.f.k63MW=1;',sc,pick,['k63MW','k63Name']);chk('name '+want,r,r=>r.f[0]===2&&r.f[1]===want&&/learned off a tape/.test(r.txt)&&re.test(r.txt)&&grey(r,'Answer him'))}
r=await play(wr+QUIET,sc);ok(r.r==='none','worst waits for the state of mind');
r=await play(wr+QUIET+'S.f.kdMindDay=S.day;S.f.k63MW=2;',sc);ok(r.r==='none','worst list ends');
r=await play(wr+'S.f.kdMindDay=S.day;S.f.k61Day=S.day;S.f.k61WN=2;S.f.k62Day=S.day;S.f.k62MP=4;S.f.kdWarnDay=S.day;S.f.kdUncDay=S.day;S.f.a60WR=1;','hub();cb();',0,['k63MW']);chk('worst via hub',r,r=>r.f[0]===1);

/* worst route, the moment it comes back (pending from the logic or caught shatter): both variants, both choices */
for(const intr of [0,1])for(const [pick,want,re] of [[0,'door',/hear the pages/],[1,'count',/a four you trust/]]){
 r=await play(med('m',{d:3,clar:2,run:0,sev:9,logicOut:1,shattered:1})+`S.f.k63ShW=1;S.f.kdInterrupted=${intr};S.f.k62Fl=1;`,sc,pick,['k63ShW','k63WB']);
 chk(`worst back intr${intr} ${want}`,r,r=>r.f[0]===2&&r.f[1]===want&&/exactly like being right/.test(r.txt)&&re.test(r.txt)&&grey(r,'Tell him what you')&&(intr?/let go of your wrists/.test(r.txt)&&/he heard/.test(r.opts[0]):/worked it out/.test(r.txt)&&/can’t ever know/.test(r.opts[0])))}
r=await play(med('m',{d:3,clar:2,run:0,sev:9,logicOut:1,shattered:1})+'S.f.k63ShW=2;S.f.k62Fl=1;'+QUIET,sc);ok(!/exactly like being right/.test(r.txt),'worst back once');

/* the morning shatter, through the real hub and the real effect: lines, kc61's bin, then this; both settings, both choices */
for(const [full,pick,want,re] of [[1,0,'up',/fist is under your thigh/],[0,1,'floor',/no plans/]]){
 const st=await ev(c=>{(new Function(c))();S.slot=0;window.__said=[];hub();return !!(S.kd.med.shattered)},med('m',{d:1,clar:2,run:0,sev:0})+`META.kdFull=${full};`);ok(st,'shatter started');
 await p.waitForTimeout(3500);runs++;
 const t=await ev(pick=>{const O=[];__drain([0,pick],O);return {sh:S.f.k63Sh,up:S.f.k63Up,txt:window.__said.join(' | '),O}},pick);
 const a=t.txt.indexOf('always a room'),bn=t.txt.indexOf('look in the bin'),me=t.txt.indexOf('hasn’t been told');
 ok(t.sh===1&&t.up===want&&a>=0&&bn>a&&me>bn&&re.test(t.txt)&&t.O[1]&&t.O[1].includes('×Call him in')&&(full?/hours from the other building/.test(t.txt):/throbbing/.test(t.txt)),'shatter after '+want+' '+JSON.stringify(t).slice(0,500))}
await ev(()=>{META.kdFull=1});
{const st=await ev(c=>{(new Function(c))();S.f.k63Sh=1;S.slot=0;window.__said=[];hub();return 1},med('m',{d:1,clar:2,run:0,sev:0}));await p.waitForTimeout(3500);runs++;
 const t=await ev(()=>{const O=[];__drain(0,O);return window.__said.join(' ')});ok(!/hasn’t been told/.test(t),'shatter after: once')}
/* the logic shatter and the caught shatter leave a pending scene for the next hub; the late (dark) one does not */
{await ev(c=>{(new Function(c))();S.kd.med.clues=['bed','needle','pen','design'];window.__said=[];kdLogicOut();return 1},med('m',{d:2,clar:0,run:0,sev:9}));await p.waitForTimeout(3500);runs++;
 const t=await ev(()=>{const O=[];__drain(0,O);return {w:S.f.k63ShW,sh:S.f.k63Sh,txt:window.__said.join(' ')}});ok(t.w===1&&!t.sh&&!/hasn’t been told/.test(t.txt),'logic shatter pends '+JSON.stringify(t).slice(0,200));
 const h=await ev(()=>{window.__said=[];S.slot=1;hub();const O=[];__drain(1,O);return {w:S.f.k63ShW,wb:S.f.k63WB,txt:window.__said.join(' ')}});runs++;
 ok(h.w===2&&h.wb==='count'&&/You worked it out/.test(h.txt),'logic pending plays at the next hub '+JSON.stringify(h).slice(0,300))}
{await ev(c=>{(new Function(c))();window.__said=[];kdInterrupted();return 1},med('m',{d:2,clar:0,run:0,sev:9}));await p.waitForTimeout(3500);runs++;
 const t=await ev(()=>{const O=[];__drain(0,O);return {w:S.f.k63ShW,i:S.f.kdInterrupted}});ok(t.w===1&&t.i===1,'caught shatter pends '+JSON.stringify(t));
 const h=await ev(()=>{window.__said=[];S.slot=1;hub();const O=[];__drain(0,O);return {w:S.f.k63ShW,txt:window.__said.join(' ')}});runs++;
 ok(h.w===2&&/let go of your wrists/.test(h.txt),'caught pending plays at the next hub '+JSON.stringify(h).slice(0,300))}
{await ev(c=>{(new Function(c))();kdShatterFx(()=>{},{dark:1});return 1},med('m',{d:2,clar:0,run:0,sev:9}));await p.waitForTimeout(3500);runs++;
 const t=await ev(()=>S.f.k63ShW);ok(!t,'dark shatter leaves nothing pending')}

/* ================= V, in the infirmary: from a distance ================= */
await load(1);
for(const [i,re] of [[0,/go back through the days/],[1,/biscuit tin/]]){r=await play(med('v',{d:2,clar:2,run:0,sev:0})+QUIET+`S.f.k63VC=${i};`,sc,0,['k63VC']);chk('V clear '+i,r,r=>r.f[0]===i+1&&re.test(r.txt))}
r=await play(med('v',{d:2,clar:2,run:0,sev:0})+QUIET+'S.f.k63VC=2;',sc);ok(r.r==='none','V clear list ends');
r=await play(med('v',{d:3,clar:0,run:0,sev:5,xd:1}),sc+'',0);ok(r.r==='none','V waits while kc61/kc62 have a scene due');
r=await play(med('v',{d:3,clar:0,run:0,sev:5,xd:1})+QUIET,sc,0,['k63VX']);chk('V ext list',r,r=>r.f[0]===1&&/her own name/.test(r.txt)&&/left me off/.test(r.txt));
r=await play(med('v',{d:3,clar:2,run:0,sev:5,xd:1})+QUIET,sc,0,['k63VB','k63VC']);chk('V ext back',r,r=>r.f[0]===1&&r.f[1]===0&&/same words/.test(r.txt));
r=await play(med('v',{d:3,clar:2,run:0,sev:5,xd:1})+QUIET+'S.f.k63VB=1;',sc,0,['k63VC']);chk('V ext back once, then clear',r,r=>r.f[0]===1);
r=await play(med('v',{d:2,clar:1,run:0,sev:9})+QUIET,sc,0,['k63VW']);chk('V worst name',r,r=>r.f[0]===1&&/forty times/.test(r.txt)&&/“40”/.test(r.txt));
r=await play(med('v',{d:2,clar:1,run:0,sev:9})+QUIET+'S.f.k63VW=1;',sc);ok(r.r==='none','V worst once');
r=await play(med('v',{d:0,clar:2,run:0,sev:0})+QUIET,sc);ok(r.r==='none','V nothing on day 0');
r=await play(med('v',{d:2,clar:2,run:0,sev:0})+QUIET+'S.slot=0;',sc);ok(r.r==='none','V not at the first hub of the day');
r=await play(med('v',{d:2,clar:2,run:0,sev:0})+'S.f.k61Day=S.day;S.f.k61VCN=2;S.f.k62Day=S.day;','hub();cb();',0,['k63VC']);chk('V via hub',r,r=>r.f[0]===1);

/* ================= after discharge ================= */
const post=pov=>`S.pov="${pov}";S.phase="after";if(!S.kd)KD();S.kd.med=null;S.kd.t0=S.day-12;S.kd.days=6;S.kd.sev0=0;S.dark=0;S.lone=null;S.aff=100;S.fr={a:60,r:60};META.kdFull=1;`+['kd63_boots','kd63_alarms','kd63_card'].map(k=>`S.f.${k}=0;S.seen.${k}=0;`).join('')+F.map(k=>`S.f.${k}=0;`).join('');
const evr=id=>`const e=EVENTS.find(e=>e.id===${JSON.stringify(id)});let w;KD_RUN=1;try{w=e.when()}finally{KD_RUN=0}if(!w)return 'not due';S.seen[e.id]=1;e.run(cb);`;
for(const [bi,pov] of [[2,'m'],[3,'v']]){await load(bi);const me=pov==='m';
 for(const [pick,want,re] of me?[[0,'on',/mud from the garage/],[1,'off',/one foot already/]]:[[0,'sheets',/dark grey/],[1,'his',/point at the door as well/]]){
  r=await play(post(pov),evr('kd63_boots'),pick,['kd63_boots','k63Boots']);chk(`boots ${pov} ${want}`,r,r=>r.f[0]===1&&r.f[1]===want&&/boots/.test(r.txt)&&re.test(r.txt)&&(!me||grey(r,'Tell him why')))}
 r=await play(post(pov)+'S.kd.t0=S.day;',evr('kd63_boots'));ok(r.r==='not due','boots wait for day 1 '+pov);
 for(const full of me?[1,0]:[1])for(const [pick,want,re] of me?[[0,'all',/butter knife/],[1,'three',/four o’clock/]]:[[0,'v',/coffee for five/]]){
  r=await play(post(pov)+`META.kdFull=${full};`,evr('kd63_alarms'),pick,['kd63_alarms','k63Alarm']);
  chk(`alarms ${pov} full${full} ${want}`,r,r=>r.f[0]===1&&r.f[1]===want&&/forty minutes/.test(r.txt)&&re.test(r.txt)&&(!me||grey(r,'Sleep through')&&(full?/came up with in the dark/.test(r.txt):/jingle/.test(r.txt))))}
 await ev(()=>{META.kdFull=1});
 r=await play(post(pov)+'S.kd.t0=S.day-1;',evr('kd63_alarms'));ok(r.r==='not due','alarms wait for day 2 '+pov);
 for(const [pick,want,re] of me?[[0,'cards',/index cards/],[1,'back',/new scope/]]:[[0,'v',/her own handwriting/]]){
  r=await play(post(pov),evr('kd63_card'),pick,['kd63_card','k63Card']);chk(`card ${pov} ${want}`,r,r=>r.f[0]===1&&r.f[1]===want&&/glovebox/.test(r.txt)&&re.test(r.txt)&&(!me||grey(r,'Tell V it moved')))}
 r=await play(post(pov)+'S.kd.t0=S.day-3;',evr('kd63_card'));ok(r.r==='not due','card waits for day 4 '+pov);
 const kn=await ev(c=>{(new Function(c))();EVENTS.filter(e=>e.kd&&!/^kd63_/.test(e.id)).forEach(e=>S.seen[e.id]=1);const out=[];
  for(let i=0;i<4;i++){const e=kdNext();if(!e)break;out.push(e.id);S.seen[e.id]=1;S.f[e.id]=1}return out},post(pov));
 ok(kn.join()==='kd63_boots,kd63_alarms,kd63_card','kdNext '+pov+' '+kn);
 const lone=await ev(c=>{(new Function(c))();S.lone='v';const e=EVENTS.find(e=>e.id==='kd63_boots');KD_RUN=1;try{return e.when()}finally{KD_RUN=0;S.lone=null}},post(pov));ok(!lone,'not lone '+pov)}
const ord=await ev(()=>['kd61_home','kd63_boots','kd63_alarms','kd62_file','kd63_card'].map(k=>KD_ORDER.indexOf(k)));
ok(ord.every(i=>i>=0)&&ord[0]<ord[1]&&ord[1]<ord[2]&&ord[3]<ord[4],'KD_ORDER '+ord);
/* ending lines */
const en=await ev(()=>{S.kd.t0=S.kd.t0||1;const f=S.f,out=[],has=re=>extraEnding().some(x=>re.test(x));
 f.kd63_boots=1;f.k63Boots='his';f.kd63_alarms=1;f.k63Card='cards';out.push(has(/Two pairs of boots/),has(/every forty minutes/),has(/index cards/));
 f.k63Boots='on';out.push(has(/slept with her boots/));
 f.kd63_boots=0;f.kd63_alarms=0;f.k63Card='v';out.push(!has(/boots by the bed|Two pairs of boots|forty minutes|index cards/));return out});
ok(en.every(x=>x),'ending lines '+en);
console.log('runs',runs,'page errors',errs.length);errs.slice(0,10).forEach(e=>console.log('  ',e));
console.log(bad||errs.length?'K63 FAIL '+bad:'K63 OK');await b.close();process.exit(bad||errs.length?1:0)})();
