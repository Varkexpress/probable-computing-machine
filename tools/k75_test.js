/* kc75: the hounds listen to two people. Usage: node tools/k75_test.js
   (a) ENEMIES TO LOVERS: the warehouse-yard beat is offered only on the route, after kc74's kennel and before the truce,
       once; plays in both POVs with every option and sets S.f.e2lLoose; the ending lines read the flag.
   (b) NORMAL ROUTE: the towpath walk and the gate scene are offered off the route only, play in both POVs with every
       option, and set S.f.k75Walk / S.f.k75Gate; neither is offered on the route.
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
  window.__set=(pov,day,o)=>{o=o||{};if(typeof wipeRun==='function'&&S)try{wipeRun()}catch(e){}newRun(pov);for(let k=0;k<80&&dlg;k++)adv();ctrl=null;dlg=null;
   S.day=day;S.slot=1;S.aff=o.aff??40;S.fr={a:60,r:60};S.heart=40;S.done={};S.seen=S.seen||{};
   if(o.e2l){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1,e2l_eye:1,e2l_lift:1,e2l_kennel:1};S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save();window.__hubbed=0}});
 const ev=(f,a)=>p.evaluate(f,a);
 const drive=async picks=>{let i=0;for(let k=0;k<300;k++){const r=await ev(pk=>{for(let j=0;j<400&&dlg;j++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'clicked'}}return dlg?'dlg':'idle'},picks[i]||0);
  if(r==='hub')return 'hub';if(r==='clicked')i++;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};
 const side=rx=>ev(rx=>sideHub(false).filter(o=>new RegExp(rx).test(o.t||'')).length,rx);
 const YARD='^⚔ (His yard by the river|The warehouse yard)',WALK='^Walk the hounds with',GATE='^The gate, the black hound';
 /* (a) */
 for(const pov of ['m','v']){
  await ev(pov=>__set(pov,4,{e2l:1}),pov);ok(await side(YARD)===1,pov+' yard offered after the kennel');ok(await side(WALK)===0,pov+' walk hidden on the route');
  await ev(pov=>{__set(pov,4,{e2l:1});delete S.f.e2ld.e2l_kennel},pov);ok(await side(YARD)===0,pov+' yard hidden before the kennel');
  await ev(pov=>{__set(pov,4,{e2l:1});S.f.e2ld.e2l_truce=1},pov);ok(await side(YARD)===0,pov+' yard hidden after the truce');
  await ev(pov=>__set(pov,4,{}),pov);ok(await side(YARD)===0,pov+' yard hidden off the route');
  const want=pov==='m'?['word','hand']:['again','called'];
  for(const o of [0,1])for(const kn of ['fed','set',null]){await ev(([pov,kn])=>__set(pov,4,{e2l:1,f:kn?{e2lKennel:kn}:{}}),[pov,kn]);
   const r0=await ev(rx=>{const o=sideHub(false).find(o=>new RegExp(rx).test(o.t||''));if(!o)return 'none';o.fn();return 'ok'},YARD);
   const r=await drive(pov==='m'?[o]:[0,o]);const st=await ev(()=>({f:S.f.e2lLoose,again:sideHub(false).filter(o=>/^⚔ (His yard|The warehouse yard)/.test(o.t||'')).length}));
   ok(r0==='ok'&&r==='hub'&&st.f===want[o]&&st.again===0,`${pov} yard option ${o} kennel ${kn}: ${r0} ${r} ${JSON.stringify(st)}`)}}
 for(const [fl,rx] of [['word',/his own word/],['hand',/open hand/],['again',/refused him/],['called',/lose/]]){
  const L=await ev(fl=>{__set('m',9,{e2l:1,f:{e2lLoose:fl}});return extraEnding().join(' | ')},fl);ok(rx.test(L),'ending line '+fl)}
 /* (b) */
 for(const pov of ['m','v']){
  await ev(pov=>__set(pov,2,{}),pov);ok(await side(WALK)===0,pov+' walk waits until day 3');
  await ev(pov=>__set(pov,4,{aff:10}),pov);ok(await side(WALK)===0,pov+' walk needs tier 1');
  for(const o of [0,1]){await ev(pov=>__set(pov,4,{}),pov);ok(await side(WALK)===1,pov+' walk offered');
   await ev(rx=>sideHub(false).find(o=>new RegExp(rx).test(o.t||'')).fn(),WALK);const r=await drive([o]);
   const st=await ev(()=>({w:S.f.k75Walk,again:sideHub(false).filter(o=>/^Walk the hounds with/.test(o.t||'')).length}));ok(r==='hub'&&st.w===['off','look'][o]&&!st.again,`${pov} walk ${o}: ${r} ${JSON.stringify(st)}`)}
  await ev(()=>{window.__hubbed=0});ok(await side(GATE)===0,pov+' gate waits a day');
  await ev(()=>{S.day+=2;window.__hubbed=0});ok(await side(GATE)===1,pov+' gate offered');
  await ev(rx=>sideHub(false).find(o=>new RegExp(rx).test(o.t||'')).fn(),GATE);const r=await drive([0]);ok(r==='hub'&&await ev(()=>S.f.k75Gate===1&&!sideHub(false).some(o=>/^The gate, the black hound/.test(o.t||''))),pov+' gate plays once');
  await ev(pov=>__set(pov,4,{e2l:1,f:{k75Walk:'off',k75WalkDay:1}}),pov);ok(await side(GATE)===0&&await side(WALK)===0,pov+' normal-route scenes hidden on the route');
  const L=await ev(pov=>{__set(pov,9,{f:{k75Walk:'off'}});return extraEnding().join(' | ')},pov);ok(/answer to two people/.test(L),pov+' normal ending line')}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const sb=all.filter(x=>/\b(she|herself)\b/i.test(x[1]));ok(!sb.length,'she/herself in kc75 text: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();
