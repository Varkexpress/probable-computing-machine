/* kc59: every beat, option, glimpse, thread, side option and hook, from both POVs and for every org. */
const ROOT=process.argv[2];
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+ROOT+'/index.html');await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);await p.evaluate(()=>{globalThis.KD_AUTO=1});
const ev=(f,a)=>p.evaluate(f,a);
let texts=[];
const drain=async(pick)=>{let first=1;for(let k=0;k<60;k++){const r=await ev(([pick,first])=>{const T=[];for(let i=0;i<300&&dlg;i++){T.push(dlg.lines&&dlg.lines[dlg.i]?dlg.lines[dlg.i][1]:'');adv()}window.__T=(window.__T||[]).concat(T);if(ctrl&&ctrl.box){const os=ctrl.box.querySelectorAll('.opt:not(.dis)');if(os.length){os[first?Math.min(pick,os.length-1):0].click();return 2}}return dlg?1:0},[pick,first]);if(r===2)first=0;if(!r)break;await p.waitForTimeout(20)}};
const load=i=>ev(i=>{document.querySelectorAll('.splash').forEach(e=>e.remove());benchLoad(BENCH[i]);for(let k=0;k<60&&dlg;k++)adv()},i);
let bad=0,runs=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
const ORGS=await ev(()=>Object.keys(ORG));const BEATS=await ev(()=>W59B.map(b=>b.id));
console.log('beats',BEATS.length,BEATS.join(' '));
const prep=(a)=>ev(a=>{S.phase=a.phase;S.f.kidnapSet=0;S.orgs={[a.k]:a.lv};S.day=6;S.slot=0;S.paid=1;S.f.w59=null;S.captor=a.k;S.takenDay=5;S.act2Start=5;S.list=null;
 for(const id of Object.keys(S.seen))if(/^w59/.test(id))delete S.seen[id];if(a.done)S.f['done_'+TARGETS.find(t=>t.org===a.k).id]=1;else TARGETS.forEach(t=>delete S.f['done_'+t.id]);
 const F=w59F();F.nDay=1;F.lDay=1;F.lease=1;F.phone=a.k;F.vTold=1;F.lever=1;F.deal='promise';F.mHale='yes';S.seen.w59_m_notice=0;go(cutBg('#000'))},a);
/* 1. every beat x every org x both POVs x every option */
for(const [bi,pov] of [[0,'m'],[1,'v']]){await load(bi);
 for(const k of ORGS)for(const id of BEATS)for(const pick of [0,1,2]){
  await prep({k,lv:3,phase:id==='w59_v_halecall'?'taken':id==='w59_a2_hale'?'act2':'normal',done:pick===1});
  const isMe=await ev(([id,pov])=>{const b=W59B.find(b=>b.id===id);if(id==='w59_v_hunted'){w59F().got=S.captor}
   S.f.finalRuin=id==='w59_a2_hale'&&Math.random()<.5?1:0;let fired=0;b.run(()=>{fired=1});window.__fired=()=>fired;return 1},[id,pov]);
  await drain(pick);runs++;
  const f=await ev(()=>window.__fired());ok(f,`${pov} ${k} ${id} pick ${pick} did not finish`);
 }
 console.log(pov,'beats done');}
/* 2. when() eligibility through the real scheduler (morningEvent) */
for(const [bi,pov] of [[0,'m'],[1,'v']]){await load(bi);await prep({k:'syn',lv:3,phase:'normal'});
 await ev(()=>{S.f.w59=null;for(const id of Object.keys(S.seen))if(/^w59/.test(id))delete S.seen[id];S.day=2;S.paid=0});
 const seen=[];for(let d=2;d<14;d++){await ev(d=>{S.day=d;if(d>=6)S.paid=1;S.phase='normal';morningEvent(()=>go(cutBg('#000')))},d);await drain(0);
  seen.push(await ev(()=>Object.keys(S.seen).filter(x=>/^w59/.test(x)&&S.seen[x]).length))}
 const ids=await ev(()=>Object.keys(S.seen).filter(x=>/^w59/.test(x)&&S.seen[x]));console.log(pov,'scheduler fired',ids.join(' '));
 ok(ids.length>=5,pov+' scheduler fired too few: '+ids.length);
 const g=await ev(()=>w59F().g);console.log(pov,'glimpses',JSON.stringify(g));}
/* 3. taken phase: Hale's call via the scheduler, V */
await load(1);await prep({k:'grant',lv:3,phase:'taken'});await ev(()=>{S.f.traced=0;S.takenDay=S.day-1;morningEvent(()=>go(cutBg('#000')))});await drain(0);
ok(await ev(()=>!!S.seen.w59_v_halecall&&S.f.traced===1),'hale call/traced');
/* 4. job → glimpse on the way home (Misaki) */
await load(0);await prep({k:'syn',lv:1,phase:'normal'});await ev(()=>{S.f.w59.g={};S.f.w59.gl=-9;jobResult(TARGETS[0],true,{})});await drain(0);
ok(await ev(()=>Object.keys(w59F().g).length===1),'job glimpse');
/* 5. cell spot */
await load(0);await prep({k:'sato',lv:3,phase:'taken'});await ev(()=>{w59F().g={driver:'m',radio:'m',notes:'m',water:'m'};const s=ROOMS.cell.spots.find(s=>s.label==='Their faces');window.__ok=s.show();s.act()});await drain(0);
ok(await ev(()=>window.__ok&&w59F().faces===1),'cell faces');
/* 6. the list recognition, both POVs */
for(const bi of [0,1]){await load(bi);await prep({k:'sato',lv:3,phase:'after'});
 for(const id of ['driver','radio','notes','water']){await ev(id=>{w59F().g={driver:'m',radio:'v',notes:'m',water:'v'};w59F().rec={};S.slot=0;S.list=[{id,n:'x',d:'y',st:0}];window.__T=[];listTarget(S.list[0])},id);
  const t=await ev(()=>dlg?dlg.lines[0][1]:'');ok(/./.test(t),'list rec '+id);await ev(()=>{for(let i=0;i<20&&dlg;i++)adv();if(ctrl&&ctrl.box){const o=[...ctrl.box.querySelectorAll('.opt')].find(o=>/Not tonight/.test(o.textContent));o&&o.click()}});await drain(0)}}
/* 7. after-phase kd scenes, both POVs, every option */
for(const bi of [0,1])for(const id of ['w59_know','w59_hale_after'])for(const pick of [0,1]){await load(bi);await prep({k:'reyes',lv:3,phase:'after'});
 await ev(id=>{w59F().g={driver:'m'};w59F().wOrg='reyes';delete S.f[id];S.kd=S.kd||{};if(!S.kd.t0)S.kd.t0=S.day-3;const e=EVENTS.find(e=>e.id===id);window.__w=e.when();e.run(()=>{window.__d=1})},id);await drain(pick);
 ok(await ev(()=>window.__d===1),'kd '+id+' '+bi+' '+pick);await ev(()=>{window.__d=0})}
ok(await ev(()=>KD_ORDER.includes('w59_know')&&KD_ORDER.includes('w59_hale_after')),'KD_ORDER');
/* 8. hunts */
await load(1);await prep({k:'lark',lv:3,phase:'normal'});await ev(()=>{S.slot=2;S.f.lastVHunt=-9;S.f.vHunted={};vHuntMenu(hub)});
const ho=await ev(()=>[...ctrl.box.querySelectorAll('.opt')].map(o=>o.textContent));console.log('hunt menu',ho.join(' | '));ok(ho.some(t=>/Lark’s delivery man/.test(t)),'war hunt offered');
ok(await ev(()=>HUNTS.length>=14),'HUNTS restored');
await ev(()=>{const h=HUNTS.find(h=>h.w59==='lark');for(let i=0;i<5&&dlg;i++)adv();ctrl&&ctrl.box&&ctrl.box.remove();ctrl=null;vHunt(h);for(let i=0;i<20&&dlg;i++)adv();dispose('v',0,()=>{})});
ok(await ev(()=>w59F().got==='lark'&&w59F().phone==='lark'),'hunt marks phone');await ev(()=>go(cutBg('#000')));
/* 9. side options both POVs, every option */
for(const bi of [0,1])for(const pick of [0,1,2]){await load(bi);await prep({k:'mori',lv:pick+1,phase:'normal'});
 await ev(()=>{const o=sideHub(false).find(o=>/who’s asking|street file/.test(o.t||''));window.__o=!!o;o.fn()});await drain(pick);ok(await ev(()=>window.__o),'side '+bi)}
/* 10. threads */
for(const [bi,ids] of [[0,['tx_w59_ron','tx_w59_ang','tx_w59_vq']],[1,['tx_w59_vm']]])for(const id of ids){await load(bi);await prep({k:'pike',lv:3,phase:'normal'});
 const n=await ev(id=>{w59F().g={driver:'m'};S.seen.w59_m_notice=1;const T=TXS[id];window.__w=T.when();return T.nodes.start.opts().length},id);ok(await ev(()=>window.__w),'thread when '+id);
 for(let i=0;i<n;i++){await ev(([id,i])=>{txStart(id);const P=phS();P.run[id].node='start';txChoose(id,TXS[id].nodes.start.opts()[i]);phDeliver()},[id,i])}}
/* 11. ending lines */
await load(1);await prep({k:'hale',lv:3,phase:'act2'});const L=await ev(()=>{S.f.finalRuin=1;w59F().faces=1;w59F().wOrg='hale';return extraEnding()});console.log('ending lines',L.filter(x=>/Hale|told them|vans|V told/.test(x)).length);
await ev(()=>{S.f.finalRuin=0;extraEnding()});
/* 12. phase gates: nothing fires in lone mode */
await load(0);await ev(()=>{S.lone='m'});ok(await ev(()=>w59Next()===null),'lone gate');
const txt=await ev(()=>window.__T.join('\n'));
ok(!/undefined|NaN|\[object/.test(txt),'bad text: '+(txt.match(/.{0,40}(undefined|NaN|\[object).{0,40}/)||[''])[0]);
console.log('beat runs',runs,'lines seen',txt.split('\n').length);
console.log('PAGE ERRORS',errs.length);errs.slice(0,10).forEach(e=>console.log(e));console.log(bad?'FAILED '+bad:'ALL OK');await b.close();process.exit(bad||errs.length?1:0)})();
