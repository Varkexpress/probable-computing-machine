// Plays N days as each POV: drains morning events, answers every pending text, takes calls, wanders rooms, sleeps.
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:640}});const errs=new Map();p.on('pageerror',e=>{const k=e.message+' @'+((e.stack||'').split('\n')[1]||'').trim().slice(0,90);errs.set(k,(errs.get(k)||0)+1)});
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(500);
const ev=(f,a)=>p.evaluate(f,a);
const drain=async(pick)=>{for(let k=0;k<60;k++){const r=await ev(pick=>{for(let i=0;i<300&&dlg;i++)adv();if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[pick==='rand'?Math.floor(Math.random()*os.length):0].click();return 1}}return dlg?1:0},pick);if(!r)break;await p.waitForTimeout(25)}};
for(const pov of ['m','v']){await ev(pov=>{document.querySelectorAll('.splash').forEach(e=>e.remove());if(typeof wipeRun==='function'&&S)wipeRun();newRun(pov);S.fr={a:55,r:55};S.aff=55},pov);await drain();
 const log=[];
 for(let d=0;d<16;d++){
  // answer texts
  for(let k=0;k<4;k++){const did=await ev(()=>{phDeliver();txTick();const P=phS();for(const id in P.run){const r=P.run[id];if(r.await){const os=TXS[id].nodes[r.node].opts().filter(o=>!o.ok||o.ok());txChoose(id,os[Math.floor(Math.random()*os.length)]);return id}}return null});if(!did)break}
  // maybe a call
  await ev(()=>{const P=phS();const c=CALLS.find(c=>phAlive(c.from)&&c.from!==phMe()&&P.calls[c.id]===undefined&&(()=>{try{return c.when()}catch(e){return false}})());if(c&&!dlg&&!ctrl)phRing(c)});await drain('rand');
  // Misaki pays rent on days 2 and 4, which sets up the kidnapping, then sits in the cell and tries to get out
  const ph=await ev(d=>{if(S.pov==='m'&&S.phase==='normal'&&(S.day===2||S.day===4)&&(S.paid||0)<2){S.paid=(S.paid||0)+1;if(S.paid>=2)S.f.kidnapSet=1;save()}return S.phase+'/'+S.pov},d);
  if(ph==='taken/m'){await ev(()=>{const R=ROOMS.cell;const sp=(R.spots||[]).filter(s=>!s.show||s.show());const s=sp[Math.floor(Math.random()*sp.length)];if(s&&s.act)s.act()});await drain('rand');
   await ev(()=>{if(S.day>=(S.takenDay||0)+1&&S.phase==='taken'){failedEscape('A flashlight in your face.')}});await p.waitForTimeout(150);await drain('rand');await p.waitForTimeout(150);await drain('rand');log.push(await ev(()=>S?S.day+':'+S.phase:'ended'));
   if(await ev(()=>S&&S.phase==='taken')){await ev(()=>{S.slot=3;sleep()});await p.waitForTimeout(120);await drain('rand')}continue}
  await ev(()=>{const rooms=Object.keys(TD.room);for(let k=0;k<3;k++){try{TD.resume=null;toRoom(rooms[Math.floor(Math.random()*rooms.length)],[160,150])}catch(e){}}});await p.waitForTimeout(150);await drain('rand');
  await ev(()=>{if(scene&&scene.td){const L=scene.inter||[];const it=L[Math.floor(Math.random()*L.length)];if(it)try{scene.use(it)}catch(e){throw new Error('use '+it.label+': '+e.message)}}});await drain('rand');
  // sleep
  await ev(()=>{S.slot=3;try{sleep()}catch(e){throw new Error('sleep: '+e.message)}});await p.waitForTimeout(120);await drain('rand');await p.waitForTimeout(120);await drain('rand');
  log.push(await ev(()=>S?S.day+':'+S.phase:'ended'));if(log[log.length-1]==='ended')break}
 console.log(pov,'days →',log.join(' '),'| threads run:',await ev(()=>S&&S.tx?Object.keys(S.tx.run).length:0),'msgs:',await ev(()=>S&&S.tx?Object.values(S.tx.th).reduce((a,t)=>a+t.length,0):0))}
console.log('PAGE ERRORS',errs.size);for(const [k,v] of errs)console.log(v,k);await b.close()})();
