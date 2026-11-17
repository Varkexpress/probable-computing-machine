/* kc71 (peach): every option in normal and epilogue, the gates, the ending line. node tools/k71_test.js */
const path=require('path'),ROOT=path.resolve(__dirname,'..');
const pw=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await pw.chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+ROOT+'/index.html');await p.keyboard.press('x');
await p.evaluate(()=>document.querySelector('.splash')?.remove());
let fails=0;const ok=(c,m)=>{if(!c){fails++;console.log('FAIL',m)}};
const run=(bench,picks,setup)=>p.evaluate(([bench,picks,setup])=>{benchLoad(BENCH[bench]);(new Function(setup))();S.pov='m';S.f.k71Peach=0;S.done.job=1;S.bed='vbed';S.aff=Math.max(S.aff||0,100);S.dark=0;
 const txt=[];let fin=0,pi=0;globalThis.K71_FORCE=1;afterBed=(f=>f)(afterBed);
 const ok0=k71Ok();k71Scene(()=>{fin=1});
 for(let i=0;i<300&&!fin;i++){if(typeof dlg!=='undefined'&&dlg){const l=dlg.lines&&dlg.lines[dlg.i];if(l)txt.push(l[1]);adv();continue}
  const o=[...document.querySelectorAll('.opt:not(.dis)')];if(o.length){o[Math.min(picks[pi++]||0,o.length-1)].click();continue}break}
 globalThis.K71_FORCE=0;return {ok0,fin,how:S.f.k71How,txt:txt.join(' | '),end:extraEnding().filter(x=>/peach|jug/.test(x)).length}},[bench,picks,setup]);
for(const bench of [0,6])for(const a of [0,1])for(const c of [0,1,2]){const r=await run(bench,[a,c],bench===0?'S.f.kidnapSet=0;':'');
 ok(r.ok0&&r.fin,`b${bench} ${a}${c} finished`);ok(r.how===['told','quiet','lied'][c],`flag ${r.how}`);ok(/1961/.test(r.txt)&&!/undefined/.test(r.txt),'text');ok(r.end===1,'ending')}
const gates=await p.evaluate(()=>{benchLoad(BENCH[0]);S.f.k71Peach=0;S.done.job=1;S.bed='vbed';S.aff=100;const g={};
 S.pov='v';g.v=k71Ok();S.pov='m';S.done.job=0;g.nojob=k71Ok();S.done.job=1;S.bed='trailer';g.trailer=k71Ok();S.bed='vbed';S.f.k71Peach=1;g.once=k71Ok();return g});
ok(!gates.v&&!gates.nojob&&!gates.trailer&&!gates.once,'gates '+JSON.stringify(gates));
const v=require('fs').readFileSync(ROOT+'/src/kc71.js','utf8');ok(!/\['K9','[^']*\b\w+’(t|s|re|ll|ve|d)\b/.test(v),'V contractions');
console.log(fails?'K71 FAIL '+fails:'K71 OK','page errors',errs.length,errs.slice(0,3));await b.close();process.exit(fails||errs.length?1:0)})();
