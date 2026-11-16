/* kc61: every spot, option, daily scene, side option, aftermath scene and variant of "what she keeps", both POVs and
   both aftermath settings. Usage: node tools/k61_test.js [repo root] */
const ROOT=process.argv[2]||require('path').resolve(__dirname,'..');
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+ROOT+'/index.html');await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
await p.evaluate(()=>{globalThis.KD_AUTO=1;document.querySelectorAll('.splash').forEach(e=>e.remove())});
const ev=(f,a)=>p.evaluate(f,a);let bad=0,runs=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
/* every line handed to say() is recorded, since the dialogue box types its text out over time */
await ev(()=>{window.__said=[];const _S=window.say;window.say=function(L,cb){try{(L||[]).forEach(l=>{if(l)window.__said.push((l[0]||'')+': '+l[1])})}catch(e){}return _S.apply(this,arguments)}});
await ev(()=>{window.__drain=(pick,lines,opts)=>{let first=1;for(let k=0;k<60;k++){for(let i=0;i<400&&dlg;i++){adv()}
  if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt')];const en=os.filter(o=>!o.classList.contains('dis'));if(!en.length)break;opts.push(os.map(o=>(o.classList.contains('dis')?'×':'')+o.textContent.slice(0,28)).join(' / '));
   const o=os[Math.min(first?pick:0,os.length-1)];(o.classList.contains('dis')?en[0]:o).click();first=0;continue}if(!dlg)break}}});
const load=i=>ev(i=>{benchLoad(BENCH[i]);for(let k=0;k<80&&dlg;k++)adv();if(ctrl&&ctrl.close)try{ctrl.close()}catch(e){}},i);
/* run code that takes a callback `cb`, drain it with option `pick`, return flags and the text seen */
const play=(setup,fn,pick,flags)=>{runs++;return ev(([setup,fn,pick,flags])=>{const lines=[],opts=[];window.__done=0;window.__said=[];try{(new Function(setup))();const r=(new Function('cb',fn))(()=>{window.__done=1});__drain(pick||0,lines,opts);
  return {r:r===undefined?null:r,done:window.__done,n:window.__said.length,txt:window.__said.join(' | '),opts,f:(flags||[]).map(k=>S.f[k])}}catch(e){return {err:e.message+' '+(e.stack||'').split('\n')[1]}}},[setup,fn,pick||0,flags||[]])};
const med=(pov,o)=>`S.captor=S.captor||captorOrg();S.takenDay=S.takenDay||S.day-6;S.pov="${pov}";S.dark=0;S.lone=null;S.phase="after";if(!S.kd)KD();S.kd.days=6;S.kd.med=${JSON.stringify(o)};S.done={};S.slot=1;S.aff=100;S.fr={a:60,r:60};S.comp=30;`+
 ['k61Rcpt','k61Hair','k61Pile','k61Cam','k61Prk','k61Tubs','k61Lids','k61Day','k61WN','k61XN','k61CN','k61VW','k61VX','k61VCN','k61VRcpt','k61VPaid','k61Things','k61File','k61Ask','k61AskR','k61Shoe','kdMindDay'].map(k=>`S.f.${k}=0;`).join('');
const spot=lab=>`const sp=ROOMS.medbay.spots.find(s=>s.label===${JSON.stringify(lab)}&&(!s.show||s.show()));if(!sp)return 'hidden';sp.act();cb();`;
const shown=lab=>`return !!ROOMS.medbay.spots.find(s=>s.label===${JSON.stringify(lab)}&&(!s.show||s.show()));`;
const chk=(label,r,c)=>{if(r.err)return ok(0,label+' ERR '+r.err);ok(r.done,label+' not done '+JSON.stringify(r).slice(0,300));if(c)ok(c(r),label+' check '+JSON.stringify(r).slice(0,400));if(process.env.V)console.log(label,JSON.stringify(r).slice(0,300))};

/* ================= Misaki, in the infirmary ================= */
await load(0);
const clear=med('m',{d:2,clar:2,run:0,sev:0,shattered:1});
const cell=med('m',{d:1,clar:0,run:0,sev:0});
/* the drawer: cell reading hides the receipt in the cast; clear reading has it pressed in the book; both repeats */
let r=await play(cell,spot('A drawer'),0,['k61Rcpt']);chk('drawer cell',r,r=>r.r===null&&r.f[0]==='cast'&&/inside the cast/.test(r.txt));
r=await play(cell+'S.f.k61Rcpt="cast";',shown('A drawer'));ok(r.r===false,'drawer cell once');
r=await play(clear+'S.f.k61Rcpt="cast";',spot('The drawer'));chk('drawer clear cast',r,r=>/still inside your cast/.test(r.txt));
r=await play(clear,spot('The drawer'),0,['k61Rcpt']);chk('drawer clear book',r,r=>r.f[0]==='book'&&/chapter six/.test(r.txt));
r=await play(clear+'S.f.k61Rcpt="book";',spot('The drawer'));chk('drawer clear repeat',r,r=>r.n>=1);
r=await play(clear,shown('A drawer'));ok(r.r===false,'cell drawer hidden when clear');
r=await play(cell,shown('The drawer'));ok(r.r===false,'clear drawer hidden in cell');
/* the hair tie: three choices and the two repeats */
for(const [pick,want] of [[0,'one'],[1,'down'],[2,'v']]){r=await play(clear+(pick===1?'S.f.k61Rcpt="cast";':''),spot('Hair tie'),pick,['k61Hair']);chk('hair '+want,r,r=>r.f[0]===want);
 r=await play(clear+`S.f.k61Hair="${want}";`,spot('Hair tie'));chk('hair repeat '+want,r,r=>r.n>=1)}
r=await play(clear+'S.aff=10;',spot('Hair tie'),2,['k61Hair']);chk('hair low tier',r,r=>r.f[0]==='one'&&r.opts[0].includes('×Ask V'));
/* what he leaves by the door */
for(const [pick,want] of [[0,'all'],[1,'kit'],[2,'none']]){r=await play(clear,spot('The things by the door'),pick,['k61Pile']);chk('pile '+want,r,r=>r.f[0]===want)}
r=await play(clear+'S.f.k61Pile="kit";',shown('The things by the door'));ok(r.r===false,'pile once');
r=await play(clear+'S.kd.med.d=0;',shown('The things by the door'));ok(r.r===false,'pile not on day 0');
/* the camera bag: full story only, the honest option greyed, each pretence a kdDeny */
for(const [pick,want] of [[0,'chair'],[1,'chair'],[2,'v']]){r=await play(clear+'META.kdFull=1;S.kd.deny=0;',spot('A black bag on the chair'),pick,['k61Cam']);
 chk('camera '+pick,r,r=>r.f[0]===want&&r.opts[0].startsWith('×Ask her'));const d=await ev(()=>S.kd.deny);ok(d===1,'camera deny '+pick+' '+d)}
r=await play(clear+'META.kdFull=0;',shown('A black bag on the chair'));ok(r.r===false,'camera hidden in injuries only');
await ev(()=>{META.kdFull=1});
/* nothing for Misaki's spots in V's POV */
r=await play(med('v',{d:2,clar:2,run:0,sev:0}),'return ["The drawer","Hair tie","The things by the door","A black bag on the chair"].filter(l=>ROOMS.medbay.spots.find(s=>s.label===l).show());');ok(r.r&&r.r.length===0,'M spots hidden in V POV '+JSON.stringify(r.r));

/* daily afternoon scenes, by band */
const sc=`const f=k61Scene();if(!f)return 'none';f(cb);`;
/* clear: the alarm (both choices), then the teeth (both settings); only one a day; not before the shatter or in the morning */
for(const [pick,want] of [[0,'v'],[1,'snooze']]){r=await play(clear,sc,pick,['k61Prk','k61CN']);chk('alarm '+want,r,r=>r.f[0]===want&&r.f[1]===1&&/PRICKLES/.test(r.txt))}
for(const full of [1,0]){r=await play(clear+`META.kdFull=${full};S.f.k61CN=1;`,sc,0,['k61CN']);chk('teeth full'+full,r,r=>r.f[0]===2&&(full?/always been like that/.test(r.txt):/Further back/.test(r.txt)&&!/chart/.test(r.txt)))}
await ev(()=>{META.kdFull=1});
r=await play(clear+'S.f.k61Day=S.day;',sc);ok(r.r==='none','one a day');
r=await play(clear+'S.slot=0;',sc);ok(r.r==='none','not in the morning');
r=await play(clear+'S.kd.med.shattered=0;',sc);ok(r.r==='none','not before the shatter');
r=await play(clear+'S.f.k61CN=2;',sc);ok(r.r==='none','clear list ends');
/* extended delusion: the mug, then the lot number */
const ext=med('m',{d:3,clar:0,run:0,sev:5,xd:1,ext:1});
r=await play(ext,sc,0,['k61XN']);chk('ext mug',r,r=>r.f[0]===1&&/chip/.test(r.txt));
r=await play(ext+'S.f.k61XN=1;',sc,0,['k61XN']);chk('ext lot',r,r=>r.f[0]===2&&/fourteen/.test(r.txt));
r=await play(ext+'S.f.k61XN=2;',sc);ok(r.r==='none','ext list ends');
/* worst route (still deluded): the bread, then the polish; only after the state-of-mind scene */
const wr=med('m',{d:2,clar:0,run:0,sev:9});
r=await play(wr,sc);ok(r.r==='none','worst waits for the mind scene');
r=await play(wr+'S.f.kdMindDay=S.day;',sc,0,['k61WN']);chk('worst bread',r,r=>r.f[0]===1&&/roll/.test(r.txt));
r=await play(wr+'S.f.kdMindDay=S.day;S.f.k61WN=1;',sc,0,['k61WN']);chk('worst polish',r,r=>r.f[0]===2&&/star/.test(r.txt));
r=await play(wr+'S.f.kdMindDay=S.day;S.f.k61WN=2;',sc);ok(r.r==='none','worst list ends');
/* through the real hub: a worst-route afternoon plays the bread and goes on */
r=await play(wr+'S.f.kdMindDay=S.day;S.f.a60WR=1;S.f.kdWarnDay=S.day;S.f.kdUncDay=S.day;','hub();cb();',0,['k61WN','k61Day']);chk('worst via hub',r,r=>r.f[0]===1&&r.f[1]>0);
/* the shatter, then the bin: both choices, through the real hub and the real effect */
for(const pick of [0,1]){const st=await ev(c=>{(new Function(c))();S.slot=0;window.__said=[];hub();return !!(S.kd.med.shattered)},med('m',{d:1,clar:2,run:0,sev:0}));ok(st,'shatter started');
 await p.waitForTimeout(3500);runs++;
 const t=await ev(pick=>{const L=[],O=[];__drain(pick,L,O);return {tubs:S.f.k61Tubs,lids:S.f.k61Lids||0,txt:window.__said.join(' | '),O}},pick);
 ok(t.tubs===1&&/look in the bin/.test(t.txt)&&/today|the lids/i.test(t.O.join(' '))&&(pick?t.lids===1:t.lids===0),'tubs pick'+pick+' '+JSON.stringify(t).slice(0,400));
 ok(/There was always a room|always a room/.test(t.txt),'shatter lines kept '+pick)}
const tw=await ev(c=>{(new Function(c))();S.f.k61Tubs=1;S.slot=0;window.__said=[];hub();return S.kd.med.shattered},med('m',{d:1,clar:2,run:0,sev:0}));
await p.waitForTimeout(3500);const tw2=await ev(()=>{const L=[],O=[];__drain(0,L,O);return window.__said.join(' ')});ok(!/look in the bin/.test(tw2),'tubs only once');
/* the logic shatter (worst route reasoning out) leaves the bin alone */
const lg=await ev(c=>{(new Function(c))();S.kd.med.clues=['bed','needle','pen','design'];window.__said=[];kdLogicOut();return 1},med('m',{d:2,clar:0,run:0,sev:9}));await p.waitForTimeout(3500);
const lg2=await ev(()=>{const L=[],O=[];__drain(0,L,O);return {t:/look in the bin/.test(window.__said.join(' ')),f:S.f.k61Tubs}});ok(!lg2.t&&!lg2.f,'no bin after the logic shatter');

/* ================= V, in the infirmary ================= */
await load(1);
const vclear=med('v',{d:2,clar:2,run:0,sev:0});
const side=(lab)=>`S.f.k61Day=S.day;const o=sideHub(false).find(o=>o.t===${JSON.stringify(lab)});if(!o)return 'none';if(o.dis)return 'dis';o.fn();cb();`;
/* her things, three days */
for(let n=0;n<3;n++){r=await play(vclear+`S.f.k61Things=${n};`,side('Her things, from the river'),0,['k61Things','k61Shoe','k61VRcpt']);
 chk('things '+n,r,r=>r.f[0]===n+1&&[/one clean shoe/,/chapter six/,/kettle/][n].test(r.txt)&&(n!==0||r.f[1]===1)&&(n!==1||r.f[2]===1))}
r=await play(vclear+'S.f.k61Things=3;',side('Her things, from the river'));ok(r.r==='none','things end');
r=await play(vclear+'S.done.k61Th=1;',side('Her things, from the river'));ok(r.r==='dis','things once a day');
/* her file, both settings */
for(const full of [1,0]){r=await play(vclear+`META.kdFull=${full};`,side('Her file'),0,['k61File']);chk('file full'+full,r,r=>r.f[0]===1&&(full?/DO NOT SHOW PATIENT/.test(r.txt):/kennel room/.test(r.txt)&&!/doctor/i.test(r.txt)))}
await ev(()=>{META.kdFull=1});
/* ask what she needs: only once she knows him; both choices */
for(const [pick,want] of [[0,'back'],[1,'leave']]){r=await play(vclear,side('Ask what she needs'),pick,['k61Ask','k61AskR']);chk('ask '+want,r,r=>r.f[0]===1&&r.f[1]===want&&/cleaning kit/.test(r.txt))}
r=await play(med('v',{d:1,clar:1,run:0,sev:0}),side('Ask what she needs'));ok(r.r==='none','ask waits for clarity');
r=await play(med('m',{d:2,clar:2,run:0,sev:0}),'return sideHub(false).filter(o=>/Her things|Her file|Ask what she needs/.test(o.t||"")).length;');ok(r.r===0,'V side options are V only');
/* daily scenes, by band */
r=await play(vclear,sc,0,['k61VCN']);chk('V eat',r,r=>r.f[0]===1&&/Did you eat|did u eat/i.test(r.txt));
for(const [flat,pick,want] of [[1,0,1],[0,1,0]]){r=await play(vclear+`S.f.k61VCN=1;S.f.k61VRcpt=${flat};`,sc,pick,['k61VCN','k61VPaid']);
 chk(`V pockets flat${flat} pick${pick}`,r,r=>r.f[0]===2&&r.f[1]===want&&(flat?/chapter six/.test(r.txt):/soft grey lump/.test(r.txt)))}
r=await play(vclear+'S.f.k61VCN=2;',sc);ok(r.r==='none','V clear list ends');
r=await play(med('v',{d:3,clar:0,run:0,sev:5,xd:1,ext:1}),sc,0,['k61VX']);chk('V ext mug',r,r=>r.f[0]===1&&/chip/.test(r.txt));
r=await play(med('v',{d:2,clar:1,run:0,sev:9}),sc,0,['k61VW']);chk('V worst bread',r,r=>r.f[0]===1&&/bread roll/.test(r.txt));
r=await play(med('v',{d:2,clar:1,run:0,sev:9})+'S.f.k61VW=1;',sc);ok(r.r==='none','V worst once, no clear scenes on the worst stay');
r=await play(med('v',{d:0,clar:0,run:0,sev:0}),sc);ok(r.r==='none','V nothing on the first day');
/* through V's real hub */
r=await play(vclear,'hub();cb();',0,['k61VCN']);chk('V via hub',r,r=>r.f[0]===1);

/* ================= after discharge ================= */
const post=(pov)=>`S.pov="${pov}";S.phase="after";if(!S.kd)KD();S.kd.med=null;S.kd.t0=S.day-8;S.kd.days=6;S.dark=0;S.lone=null;S.fr={a:60,r:60};S.f.kd61_home=0;S.f.kd61_rent=0;S.seen.kd61_home=0;S.seen.kd61_rent=0;`;
const evr=id=>`const e=EVENTS.find(e=>e.id===${JSON.stringify(id)});let w;KD_RUN=1;try{w=e.when()}finally{KD_RUN=0}if(!w)return 'not due';S.seen[e.id]=1;e.run(cb);`;
for(const [bi,pov] of [[2,'m'],[3,'v']]){await load(bi);
 for(const [days,word,shoe] of [[6,'three',0],[11,'four',1],[3,'two',1]]){r=await play(post(pov)+`S.kd.days=${days};S.f.k61Shoe=${shoe};`,evr('kd61_home'),0,['kd61_home']);
  chk(`home ${pov} ${days}`,r,r=>r.r===null&&r.f[0]===1&&new RegExp(word,'i').test(r.txt)&&(pov==='v'&&shoe?/under the stairs/.test(r.txt):!/under the stairs/.test(r.txt)))}
 if(pov==='m')for(const rc of ['cast','book']){const y0=await ev(()=>S.yen);r=await play(post(pov)+`S.f.k61Rcpt="${rc}";`,evr('kd61_rent')+'return S.yen;',0,['kd61_rent']);
  chk('rent m '+rc,r,r=>r.f[0]===1&&/ladder/i.test(r.txt)&&(rc==='cast'?/next to the other one/.test(r.txt):/red light/.test(r.txt)))}
 else for(const paid of [1,0]){r=await play(post(pov)+`S.f.k61VPaid=${paid};`,evr('kd61_rent'),0,['kd61_rent']);chk('rent v paid'+paid,r,r=>r.f[0]===1&&(paid?/house ledger/.test(r.txt):/unprecedented/.test(r.txt)))}
 r=await play(post(pov)+'S.kd.t0=S.day-2;',evr('kd61_rent'));ok(r.r==='not due','rent waits '+pov);
 /* the scheduler reaches them, home first */
 const kn=await ev(c=>{(new Function(c))();EVENTS.filter(e=>e.kd&&!/^kd61_/.test(e.id)).forEach(e=>S.seen[e.id]=1);const a=kdNext();S.seen.kd61_home=1;S.f.kd61_home=1;const b=kdNext();return [a&&a.id,b&&b.id]},post(pov));
 ok(kn[0]==='kd61_home'&&kn[1]==='kd61_rent','kdNext '+pov+' '+kn);
 const lone=await ev(c=>{(new Function(c))();S.lone='v';const e=EVENTS.find(e=>e.id==='kd61_home');KD_RUN=1;try{return e.when()}finally{KD_RUN=0;S.lone=null}},post(pov));ok(!lone,'not lone '+pov)}
const ord=await ev(()=>['kd_discharge','kd61_home','kd_count','kd61_rent'].map(k=>KD_ORDER.indexOf(k)));ok(ord.every(i=>i>=0)&&ord[0]<ord[1]&&ord[2]<ord[3],'KD_ORDER '+ord);
/* ending lines */
const en=await ev(()=>{S.kd.t0=S.kd.t0||1;const out=[];S.f.kd61_rent=1;S.f.k61Rcpt='cast';S.f.k61Lids=1;out.push(extraEnding().filter(x=>/two rent receipts|plastic lids/.test(x)).length);
 S.f.k61Rcpt='book';S.f.k61VPaid=1;S.pov='v';out.push(extraEnding().some(x=>/torn edge/.test(x)));S.pov='m';out.push(extraEnding().some(x=>/late payment/.test(x)));S.f.kd61_rent=0;S.f.k61Lids=0;out.push(extraEnding().some(x=>/rent receipt|late payment|torn edge|plastic lids/.test(x)));return out});
ok(en[0]===2&&en[1]&&en[2]&&!en[3],'ending lines '+en);
console.log('runs',runs,'page errors',errs.length);errs.slice(0,10).forEach(e=>console.log('  ',e));
console.log(bad||errs.length?'K61 FAIL '+bad:'K61 OK');await b.close();process.exit(bad||errs.length?1:0)})();
