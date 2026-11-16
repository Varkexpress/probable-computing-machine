/* kc56: every bridging scene and option, from both POVs, plus the Hale-was-the-Mimic replacements in Act III.
   Fails on any page error, or a scene that shows no dialogue. */
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);await p.evaluate(()=>{globalThis.KD_AUTO=1});
const ev=(f,a)=>p.evaluate(f,a);
const drain=async(pick)=>{let first=1;for(let k=0;k<60;k++){const r=await ev(([pick,first])=>{for(let i=0;i<300&&dlg;i++)adv();if(ctrl&&ctrl.box){const os=ctrl.box.querySelectorAll('.opt:not(.dis)');if(os.length&&!globalThis.__k56done){os[first?Math.min(pick,os.length-1):0].click();return 2}}return dlg?1:0},[pick,first]);if(r===2)first=0;if(!r)break;await p.waitForTimeout(25)}};
const load=(i)=>ev(i=>{document.querySelectorAll('.splash').forEach(e=>e.remove());benchLoad(BENCH[i]);for(let k=0;k<80&&dlg;k++)adv()},i);
let bad=0,runs=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
const play=async(bench,setup,id,pick)=>{await load(bench);await drain(0);const r=await ev(([setup,id])=>{globalThis.__k56done=0;try{(new Function(setup))()}catch(e){return 'setup '+e.message}k56Play(id,()=>{globalThis.__k56done=1});return dlg||(ctrl&&ctrl.box)?'ok':'nodlg'},[setup,id]);ok(r==='ok',id+' bench '+bench+' pick '+pick+': '+r);await drain(pick);const d=await ev(()=>globalThis.__k56done);ok(d===1,id+' did not finish (bench '+bench+' pick '+pick+')');runs++};
const N='S.phase="normal";S.orgs={sato:3};S.f.k56=null;';
for(const [bm,bv] of [[0,1]]){
 for(const bench of [bm,bv])for(const pick of [0,1]){await play(bench,N,'k56_file',pick);await play(bench,N+'S.f.k56={k56_file:1};S.day=5;','k56_grey',pick)}
}
/* taken (V) */
await play(1,'S.phase="taken";S.captor="sato";S.takenDay=S.day;S.f.k56Ship="kept";','k56_plate',0);
await play(1,'S.phase="taken";S.captor="reyes";S.takenDay=S.day;','k56_plate',0);
/* after: both POVs, with and without leaks and the plants */
const A='S.phase="after";S.captor="sato";S.endDay=S.day+5;S.kd=S.kd||{};S.kd.t0=S.day-1;S.kd.med=null;S.list=S.list||[];';
for(const bench of [0,1]){
 await play(bench,A+'S.leaks=0;','k56_why',0);await play(bench,A+'S.leaks=2;S.f.k56Grey=1;S.f.k56Plate=1;','k56_why',0);
 await play(bench,A,'k56_hale',0);await play(bench,A,'k56_avery',0);
 for(const fl of ['','S.f.finalRuin=1;','S.f.bossLives=1;','S.f.k56Plate=1;']){await load(bench);await ev(s=>{(new Function(s))();globalThis.__k56done=0;k56BossScene(()=>{globalThis.__k56done=1})},A+fl);await drain(0);ok(await ev(()=>globalThis.__k56done)===1,'boss scene '+fl);runs++}
 /* the wrapper on ending('final'): boss scene, then the Act I panel */
 await load(bench);await ev(s=>{(new Function(s))();S.f.k56=null;ending('final')},A);await drain(1);ok(await ev(()=>!!S===false||S.phase!=='after'||(S.f.k56&&S.f.k56.k56_boss!==undefined)),'ending wrapper');runs++;
}
/* Act II */
for(const bench of [2,3]){
 await play(bench,'','k56_a2sus',0);await play(bench,'S.q=S.q||{};S.q.stalker=2;S.f.k56Hale=1;S.f.k56Avery=1;','k56_a2sus',0);
 for(const bk of ['burn','read','vsolo','out',''])await play(bench,'S.f.kdBook="'+bk+'";S.kd=S.kd||{};S.kd.said='+(bk==='out'?2:0)+';S.leaks=0;','k56_a2pages',0);
 await play(bench,'','k56_a2grey',0);await play(bench,'S.f.k56Grey=1;S.f.k56Plate=1;','k56_a2grey',0);
 await play(bench,'','k56_a2burn',0);
 await play(bench,'S.lone="'+(bench===2?'m':'v')+'";','k56_lone2',0);
 for(const c of ['{solved:true,end:"police"}','{solved:true,end:"kill"}','{solved:true,end:"ronin"}','{wrong:1}','{escaped:1}']){await load(bench);await ev(c=>{Object.assign(S.case,eval('('+c+')'));S.f.k56Ship='kept';globalThis.__k56done=0;k56WhyScene(()=>{globalThis.__k56done=1})},c);await drain(0);ok(await ev(()=>globalThis.__k56done)===1,'why scene '+c);runs++}
 /* the culprit mapping */
 const cul=await ev(()=>{const r={};for(const [k,f] of [['kill',{}],['ruin',{finalRuin:1}],['lives',{bossLives:1}],['stalker',{stalkerPaper:1}]]){S.lone=null;Object.assign(S.f,{finalRuin:0,bossLives:0,stalkerPaper:0},f);const d=S.day;startAct2();for(let i=0;i<80&&dlg;i++)adv();r[k]=S.case.cul}return r});console.log('culprits',JSON.stringify(cul));ok(cul.kill==='heir'&&cul.ruin==='hara'&&cul.stalker==='dale','culprit mapping');
 /* startAct3 wrapper plays the why scene first */
 await load(bench);await ev(()=>{S.f.inter={};S.f.k56=null;S.case.solved=true;S.case.end='police';startAct3()});await drain(0);ok(await ev(()=>S.phase==='act3'&&S.f.k56.k56_a3why!==undefined),'startAct3 wrapper');runs++;
}
/* Act III */
for(const bench of [4,5]){
 await load(bench);await ev(()=>{S.f.ginzaKey=1;S.f.k56Plate=1;S.f.k56Ship='back';S.f.k56={k56_a3why:1};S.kd=S.kd||{};S.kd.ses=2;a3Box()});await drain(0);ok(await ev(()=>S.a3.box===1),'box opens');runs++;
 await load(bench);await ev(()=>{S.f.ginzaKey=1;S.kd=null;a3Box()});await drain(0);runs++;
 await play(bench,'S.a3.box=1;S.captor="lark";','k56_a3river',0);
 await play(bench,'S.a3.box=1;S.a3.names={chairman:"study"};','k56_a3heir',0);
 await play(bench,'S.a3.box=1;','k56_a3hale',0);
 await play(bench,'S.a3.box=1;S.a3.names={tsuji:"ronin",kanzaki:"spare"};','k56_a3kt',0);
 /* Hale was the Mimic */
 const h=await ev(()=>{S.case.cul='hara';const o={};o.b8=A3L(A3_BEATS[8]).map(l=>l[0]+':'+l[1]).join('|');o.n7=A3L(A3_NIGHTS[A3_NIGHTS.length-1]).map(l=>l[0]).join(',');o.ps=A3L(A3_ENDINGS.paper.scene).map(l=>l[0]+':'+l[1]).join('|');o.pl=A3_ENDINGS.paper.L().join('|');o.fl=A3_ENDINGS.fall.L().join('|');
  const ts=A3N().find(n=>n.id==='tsuji').o.paper.L.map(l=>l[0]+':'+l[1]).join('|');const ok2=A3N().find(n=>n.id==='okubo').o.leverage.L.map(l=>l[1]).join('|');const fu=A3N().find(n=>n.id==='fumiko').o.paper.t;o.all=[o.b8,o.n7,o.ps,o.pl,o.fl,ts,ok2,fu].join('#');
  S.case.cul='heir';o.back=A3L(A3_BEATS[8]).some(l=>l[0]==='Hale')&&A3_ENDINGS.paper.L().join('').includes('Hale');return o});
 ok(!/Hale/.test(h.all),'Hale still in Act III when he was the Mimic: '+h.all.match(/.{40}Hale.{40}/));ok(h.back,'Hale missing in Act III when he was not the Mimic');
 for(const id of ['tsuji','okubo','kanzaki','fumiko'])for(const k of ['paper','leverage','spare','kill','ask']){await load(bench);const has=await ev(([id,k])=>{S.case.cul='hara';const n=A3N().find(x=>x.id===id);if(!n.o[k])return 0;globalThis.__k56done=0;a3Name(n);return 1},[id,k]);if(!has)continue;const idx=await ev(([id,k])=>Object.keys(A3N().find(x=>x.id===id).o).filter(q=>{const x=A3N().find(z=>z.id===id).o[q];return !x.ok||x.ok()}).indexOf(k),[id,k]);await drain(Math.max(0,idx));runs++}
 for(const end of ['paper','fall','blood']){await load(bench);await ev(e=>{S.case.cul='hara';S.a3.witness=3;a3End(e)},end);await drain(0);const opts=await ev(()=>[...document.querySelectorAll('.opt')].map(o=>o.textContent).join('|'));ok(end!=='fall'||!/epilogue/.test(opts),'fall ending still offers the epilogue');runs++}
}
/* epilogue */
for(const bench of [6,7])for(const e of ['paper','blood','burn','inherit','live',''])await play(bench,'S.f.a3End="'+e+'";','k56_epi',0);
/* the scheduler: a due scene plays first thing in the morning */
for(const bench of [2,3]){await load(bench);const r=await ev(()=>{S.f.k56=null;S.f.k56Last=null;S.day=S.act2Start+1;let fin=0;morningEvent(()=>{fin=1});for(let i=0;i<400&&dlg;i++)adv();return S.f.k56&&S.f.k56.k56_a2sus!==undefined});ok(r,'scheduler did not play k56_a2sus');await drain(0);runs++}
console.log('runs',runs,'failures',bad,'page errors',errs.length);errs.slice(0,10).forEach(e=>console.log('ERR',e));
await b.close();process.exit(bad||errs.length?1:0)})();
