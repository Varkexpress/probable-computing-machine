const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
const ROOT='/home/user/probable-computing-machine/.claude/worktrees/agent-a2a2b2a7ae131b8f0';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{document.querySelectorAll('.splash').forEach(e=>e.remove());window.__realHub=hub;hub=function(){window.__hubbed=1}});
/* drive a scene: advance dialogue, click option `pick` at the first choice, option 0 after */
const drive=async(pick)=>{let first=true,n=0;for(let k=0;k<200;k++){const r=await ev(([pick,first])=>{for(let i=0;i<400&&dlg;i++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){const o=os[first?Math.min(pick,os.length-1):0];o.click();return 'clicked'}}return dlg?'dlg':'idle'},[pick,first]);
  if(r==='hub')return 'hub';if(r==='clicked'){first=false;n++}if(r==='idle'){await p.waitForTimeout(20);if(++n>60)return 'idle'}await p.waitForTimeout(5)}return 'timeout'};
const load=async(i,flags)=>ev(([i,flags])=>{benchLoad(BENCH[i]);for(let k=0;k<80&&dlg;k++)adv();window.__hubbed=0;S.fr={a:80,r:80};S.tx=null;S.dark=0;S.lone=null;S.f.abroad=0;Object.assign(S.f,flags||{});
  if(S.phase==='act3'&&S.a3)S.day=S.a3.start+3},[i,flags]);
const log=[];
/* 1. side-menu listing per phase/POV */
for(const i of [0,1,2,3,4,5,6,7]){await load(i);const L=await ev(()=>{S.day=Math.max(S.day,(S.act2Start||0)+3);return sideHub(false).map(o=>o.t).filter(t=>t&&/Ronin|Angel|pickup|Maria|ten forty|garment|safe|roof|news/i.test(t))});log.push('bench '+i+' '+L.join(' | '))}
/* 2. every beat, every option, both POVs */
const beats=[
 ['k57rClock',[0,2],3],['k57rTruck',[2,4],3],['k57rBoat',[4,6],3],['k57rPew',[6,7],2],
 ['k57aSafe',[0,2],3],['k57aTip',[2,4],1],['k57aBoat',[4,6],2],['k57aEpi',[6,7],1]];
const streets=[undefined,'let','stop','closer'],boats=[undefined,'on','two','home'],rifles=['taken','went','rule','alone'],backs=[undefined,'gave','kept','still','none','late','fed'];
for(const [fn,benches,nopt] of beats)for(const pov of ['m','v'])for(const bi of benches){const bench=bi+(pov==='v'?1:0)-(bi%2);
 const variants=fn==='k57rBoat'?streets.flatMap(s=>[{k57rStreets:s,k57rKnow:1},{k57rStreets:s,k57rKnow:0}]):fn==='k57rPew'?boats.map(x=>({k57rBoat:x})):fn==='k57aBoat'?rifles.flatMap(r=>[{k57aRifle:r,k57aNight:1,k57aCode:'took'},{k57aRifle:r,k57aNight:1}]):fn==='k57aEpi'?backs.flatMap(k=>[{k57aBack:k,k57aRifle:'taken'},{k57aBack:k}]):[{},{k57rClock:'asked'}];
 for(const v of variants)for(let o=0;o<nopt;o++){await load(bench,v);const pv=await ev(pov=>{S.pov=pov;return S.phase},pov);await ev(fn=>{window[fn]?window[fn]():eval(fn+'()')},fn);const r=await drive(o);
  const f=await ev(()=>JSON.stringify(Object.fromEntries(Object.entries(S.f).filter(([k])=>/^k57/.test(k)&&k!=='k57d'))));
  log.push(`${fn} ${pov} ${pv} ${JSON.stringify(v)} opt${o} → ${r} ${f}`);if(r!=='hub')errs.push('scene did not finish '+fn+' '+pov+' '+JSON.stringify(v)+' '+o)}}
/* A2 night, every rifle answer */
for(const pov of ['m','v'])for(const r of rifles){await load(pov==='v'?3:2,{k57aRifle:r});await ev(pov=>{S.pov=pov;k57aNight()},pov);const x=await drive(0);log.push(`k57aNight ${pov} ${r} → ${x}`);if(x!=='hub')errs.push('night '+pov+r)}
/* 3. morning events, all states */
const evs={k57r_minute:[{}],k57r_visor:streets.slice(1).map(s=>({k57rStreets:s})),k57a_tips:[{},{}],k57a_after:rifles.map(r=>({k57aRifle:r,k57aNight:1}))};
for(const id in evs)for(const pov of ['m','v'])for(const v of evs[id])for(const bi of [0,2,4,6]){await load(bi+(pov==='v'?1:0),v);
 const w=await ev(([id,pov])=>{S.pov=pov;const e=EVENTS.find(e=>e.id===id);const ok=e.when();window.__evdone=0;e.run(()=>{window.__hubbed=1});return ok},[id,pov]);const r=await drive(0);log.push(`${id} ${pov} bench${bi} ${JSON.stringify(v)} when=${w} → ${r}`);if(r!=='hub')errs.push('event '+id)}
/* 4. threads with every state and every option path */
const thr={tx_k57r_watch:[{}],tx_k57r_watch_v:[{}],tx_k57r_two:streets.slice(1).map(s=>({k57rStreets:s})),tx_k57r_two_v:streets.slice(1).map(s=>({k57rStreets:s})),
 tx_k57a_code:[{k57aCode:'took'},{k57aCode:'away'}],tx_k57a_code_v:[{k57aCode:'took'},{k57aCode:'away'}],tx_k57a_rifle:[{}],tx_k57a_rifle_v:[{}],
 tx_k57_epi_r:boats.slice(1).map(x=>({k57rBoat:x})),tx_k57_epi_rv:boats.slice(1).map(x=>({k57rBoat:x})),tx_k57_epi_a:backs.slice(1).map(x=>({k57aBack:x})),tx_k57_epi_av:[{k57aBack:'gave'}]};
for(const id in thr)for(const v of thr[id]){const n=await ev(id=>TXS[id].nodes.start.opts().length,id);for(let o=0;o<n;o++){await load(0,v);
 const r=await ev(([id,o,v])=>{const T=TXS[id];S.pov=T.pov;Object.assign(S.f,v);S.tx=null;txStart(id);S.slot++;phDeliver();const nd=T.nodes.start;txChoose(id,nd.opts()[o]);S.slot++;phDeliver();
  const th=phS().th[T.with]||[];return th.length+' msgs, run done '+!!phS().run[id].done+' '+JSON.stringify(Object.fromEntries(Object.entries(S.f).filter(([k])=>/^k57/.test(k))))},[id,o,v]);log.push(`${id} ${JSON.stringify(v)} opt${o}: ${r}`)}}
/* expiry of the rifle thread sets 'alone' */
await load(2);log.push('rifle expiry → '+await ev(()=>{S.pov='m';S.tx=null;txStart('tx_k57a_rifle');phDeliver();S.day+=2;txTick();return S.f.k57aRifle}));
/* 5. talk topics */
for(const [arr,pov,flag] of [['TDTOP_V','m',{k57rStreets:'let',k57rBy:'m'}],['TDTOP_M','v',{k57aRifle:'taken'}],['TDTOP_M','v',{k57aRifle:'went'}],['TDTOP_M','v',{k57aRifle:'rule'}]]){await load(pov==='v'?3:2,flag);
 const s=await ev(([arr,pov])=>{S.pov=pov;const t=window[arr]||eval(arr);const x=t.find(x=>/^k57/.test(x.id));const sh=x.show();x.run(()=>{window.__hubbed=1});return x.id+' show='+sh},[arr,pov]);const r=await drive(0);log.push(`${s} → ${r}`)}
/* 6. ending lines */
for(const f of [{k57rPew:'stop',k57aBack:'gave'},{k57rBoat:'on',k57aBack:'none'},{k57rBoat:'two',k57aBack:'fed'},{k57rBoat:'home',k57aBack:'late'},{k57rStreets:'let',k57aRifle:'taken'},{k57aBack:'kept'},{k57aBack:'still'}]){await load(6,f);
 log.push('ending '+JSON.stringify(f)+': '+await ev(()=>extraEnding().filter(x=>/Ronin|Angel|pickup|Heartsick|rifle/.test(x)).slice(-2).join(' / ')))}
console.log(log.join('\n'));console.log('PAGE ERRORS',errs.length,errs.slice(0,20));await b.close()})();
