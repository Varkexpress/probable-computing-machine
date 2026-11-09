const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);
const drain=async()=>{for(let k=0;k<40;k++){const r=await ev(()=>{for(let i=0;i<300&&dlg;i++)adv();if(ctrl&&ctrl.box){const op=ctrl.box.querySelector('.opt:not(.dis)');if(op){op.click();return 1}}return dlg?1:0});if(!r)break;await p.waitForTimeout(30)}};
/* exhaustively walk every option path of every thread */
console.log(await ev(()=>{const out=[];document.querySelectorAll('.splash').forEach(e=>e.remove());
 const paths=(id)=>{const T=TXS[id];const res=[];const walk=(node,trail)=>{const nd=T.nodes[node];const os=nd.opts();os.forEach((o,i)=>{const t=trail.concat(i);if(o.next)walk(o.next,t);else res.push(t)})};walk('start',[]);return res};
 for(const id in TXS){const T=TXS[id];const P=paths(id);let ok=0;for(const path of P){benchLoad(BENCH[T.pov==='v'?1:0]);for(let i=0;i<60&&dlg;i++)adv();S.pov=T.pov||'m';S.tx=null;S.fr={a:80,r:80};S.f.angelSecret=1;
   try{txStart(id);S.slot++;phDeliver();for(const i of path){const r=phS().run[id];if(!r.await)throw new Error('not awaiting at '+r.node);const nd=TXS[id].nodes[r.node];txChoose(id,nd.opts()[i]);S.slot++;phDeliver()}const r=phS().run[id];if(!r.done)throw new Error('not done');
    const th=phS().th[T.with]||[];if(!th.length)throw new Error('empty thread');ok++}catch(e){out.push(id+' path '+path+' ERR '+e.message)}}
  /* expiry */
  benchLoad(BENCH[T.pov==='v'?1:0]);for(let i=0;i<60&&dlg;i++)adv();S.pov=T.pov||'m';S.tx=null;txStart(id);phDeliver();S.day+=2;txTick();const r=phS().run[id];
  out.push(id.padEnd(12)+' paths '+ok+'/'+P.length+(T.nodes.start.expire?' · expiry→'+(r.missed?'missed ok':'NOT EXPIRED'):''))}
 return out.join('\n')}));
/* calls */
for(const c of ['c_angel3am','c_vjob','c_ronlift','c_mlate'])for(const ans of [0,1]){await ev(([id,ans])=>{benchLoad(BENCH[id==='c_ronlift'||id==='c_mlate'?1:0]);for(let i=0;i<60&&dlg;i++)adv();S.tx=null;const C=CALLS.find(x=>x.id===id);phRing(C);setTimeout(()=>{const o=ctrl&&ctrl.box&&ctrl.box.querySelectorAll('.opt');if(o)o[ans?0:1].click()},10)},[c,ans]);await p.waitForTimeout(60);await drain();
 console.log(c,ans?'answered':'missed',await ev(()=>JSON.stringify(Object.fromEntries(Object.entries(S.f).filter(([k])=>/angel|vRon|vJob|Missed|Stayed|Visit/.test(k))))))}
/* outgoing + UI */
await ev(()=>{benchLoad(BENCH[0]);for(let i=0;i<60&&dlg;i++)adv();S.tx=null;S.f.angelCallOwed=1;S.f.angelSecret=1;S.f.toldAngel=0;phCallOut('a')});await drain();console.log('outcall a toldAngel',await ev(()=>S.f.toldAngel+' lie '+S.f.angelLie));
await ev(()=>{S.tx=null;txStart('tx_amaria');phDeliver();PHONE.sel=null;phone('dm')});await p.waitForTimeout(300);await (await p.$('#stage')).screenshot({path:'/tmp/ph_list.png'});
await ev(()=>{PHONE.sel='a';phone('dm')});await p.waitForTimeout(300);await (await p.$('#stage')).screenshot({path:'/tmp/ph_thread.png'});
/* maria arc */
await ev(()=>{ui.querySelectorAll('.panel').forEach(e=>e.remove());ctrl=null;const r=phS().run.tx_amaria;txChoose('tx_amaria',TXS.tx_amaria.nodes.start.opts()[0]);S.day++;S.slot=0;console.log(romHub(false).map(o=>o.t).join('|'))});
console.log(await ev(()=>romHub(false).map(o=>o.t||o.h).filter(t=>/Maria/.test(t)).join('|')));
await ev(()=>mariaShoot());await p.waitForTimeout(100);await drain();await p.waitForTimeout(400);await drain();
for(const id of ['maria_crack','maria_end']){await ev(id=>{S.fr={a:90,r:60};S.f.mariaKnown=1;const e=EVENTS.find(e=>e.id===id);if(!e.when())throw new Error(id+' when false');e.run(()=>{})},id);await drain()}
console.log('maria',await ev(()=>JSON.stringify({shoot:S.f.mariaShootDone,how:S.f.mariaShootHow,end:S.f.mariaEnd,real:S.f.mariaReal})));
await ev(()=>{PHONE.sel='feed';phone('dm')});await p.waitForTimeout(300);await (await p.$('#stage')).screenshot({path:'/tmp/ph_feed.png'});
console.log('ERR',errs);await b.close()})();
