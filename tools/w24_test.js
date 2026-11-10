/* td24: run every new event (each option), call (answer/miss) and prop, for both POVs */
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);
const drain=async(pick)=>{let first=1;for(let k=0;k<60;k++){const r=await ev(([pick,first])=>{for(let i=0;i<300&&dlg;i++)adv();if(ctrl&&ctrl.box){const os=ctrl.box.querySelectorAll('.opt:not(.dis)');if(os.length){os[first?Math.min(pick,os.length-1):0].click();return 2}}return dlg?1:0},[pick,first]);if(r===2)first=0;if(!r)break;await p.waitForTimeout(30)}};
const EV={m:['five_eve','five_day','five_after','m_bowls','m_door','m_hands','m_bento'],v:['five_v','v_bowls','v_latch','m_frogs']};
for(const pov of ['m','v'])for(const id of EV[pov])for(const pick of [0,1,2]){
 const r=await ev(([pov,id,known])=>{document.querySelectorAll('.splash').forEach(e=>e.remove());benchLoad(BENCH[pov==='v'?1:0]);for(let i=0;i<60&&dlg;i++)adv();S.pov=pov;S.day=12;S.heat=5;S.dark=0;S.fr={a:80,r:80};if(known)tdSetF('vChildKnown');
  if(id==='five_day')S.f.fiveDay=11;if(id==='five_after'){S.f.fiveDone=['told','angel','bench'][known?0:1];S.f.fiveOn=10}
  const e=EVENTS.find(e=>e.id===id);if(!e)return 'MISSING';const w=!!e.when();window.__d=0;e.run(()=>{window.__d=1});return 'when='+w+' tier='+tier()},[pov,id,pick===0]);
 await p.waitForTimeout(40);await drain(pick);const d=await ev(()=>window.__d);console.log(pov,id.padEnd(11),'opt',pick,r,d?'done':'NOT DONE')}
for(const [c,pov] of [['c_vfour','m'],['c_mtap','v']])for(const ans of [0,1,2]){await ev(([id,pov])=>{benchLoad(BENCH[pov==='v'?1:0]);for(let i=0;i<60&&dlg;i++)adv();S.tx=null;S.slot=3;S.day=12;const C=CALLS.find(x=>x.id===id);console.log(id,'when',C.when());phRing(C)},[c,pov]);await p.waitForTimeout(60);
 await ev(ans=>{const o=ctrl&&ctrl.box&&ctrl.box.querySelectorAll('.opt');if(o)o[ans===2?1:0].click()},ans);await p.waitForTimeout(60);await drain(ans);console.log(c,ans===2?'missed':'answered '+ans,await ev(()=>!dlg?'ok':'STUCK'))}
for(const [map,id] of [['trailer','tr_box'],['ewing','bd_wedge'],['ewing','gl_stand']])for(const who of ['m','v'])for(const pick of [0,1]){const r=await ev(([map,id,who])=>{benchLoad(BENCH[who==='v'?1:0]);for(let i=0;i<60&&dlg;i++)adv();S.pov=who;const pr=TD.maps[map].props.find(p=>p.id===id);if(!pr)return 'MISSING';pr.act(who,null,pr,scene);return 'solid='+pr.solid+' label='+(typeof pr.label==='function'?pr.label():pr.label)},[map,id,who]);await p.waitForTimeout(40);await drain(pick);if(!pick)console.log(id,who,r)}
console.log('topics',await ev(()=>['hour70','sleeping'].map(i=>!!TOPICS_V.find(x=>x.id===i))+' '+!!TOPICS_M.find(x=>x.id==='menu')));
for(const [L,id,pov] of [['TOPICS_V','hour70','m'],['TOPICS_V','sleeping','m'],['TOPICS_M','menu','v']]){await ev(([L,id,pov])=>{benchLoad(BENCH[pov==='v'?1:0]);for(let i=0;i<60&&dlg;i++)adv();S.pov=pov;window.__d=0;(L==='TOPICS_V'?TOPICS_V:TOPICS_M).find(x=>x.id===id).run(()=>{window.__d=1})},[L,id,pov]);await drain(0);console.log('topic',id,await ev(()=>window.__d?'done':'NOT DONE'))}
console.log('ending',await ev(()=>{S.f.fiveDone='bench';S.f.hour70Told=1;S.f.doorAsk='asked';S.f.handsTold=1;S.f.angelCeil='down';S.f.boxAdd=1;return extraEnding().slice(-6).length}));
console.log('ERR',errs);await b.close()})();
