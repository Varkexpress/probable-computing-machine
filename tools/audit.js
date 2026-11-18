const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:640}});const errs=new Map();p.on('pageerror',e=>{const k=e.message+' @'+((e.stack||'').split('\n')[1]||'').trim().slice(0,100);errs.set(k,(errs.get(k)||0)+1)});
await p.route('**/fonts.g*/**',r=>r.abort());await p.route('**/three.min.js',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
console.log(await p.evaluate(()=>{benchLoad(BENCH[0]);const out=[];S.wing={craft:1,games:1,sun:1,lab:1,redroom:1,trophy:1,armory:1};
 for(const id in TD.maps){const M=TD.maps[id];const tdS0=tdS();const saved=Object.assign({},tdS0.door);for(const k in M.doors)tdS0.door[M.doors[k].id]=1;
  const z=M.zl.find(z=>z.main)||M.zl[0];const a=z.arrive?(typeof z.arrive==='function'?z.arrive():z.arrive):[z.r[0]+1,z.r[1]+1];
  const sc={M,npcList:[],dogs:[],p:{}};const {D,B}=tdBFS(M,a[0]*TS+8,a[1]*TS+12);
  const unreach=[];for(let j=0;j<M.H;j++)for(let i=0;i<M.W;i++){const v=j*M.W+i;if(!TDWALK.includes(tdCh(M,i,j))||B[v])continue;if(D[v]<0)unreach.push(i+','+j)}
  const bad=[];sc.inter=[];const L=tdCollect(sc);L.forEach(it=>{const r=it.r;let ok=false;for(let j=0;j<M.H&&!ok;j++)for(let i=0;i<M.W&&!ok;i++){const v=j*M.W+i;if(D[v]<0)continue;const cx=i*TS+8,cy=j*TS+12;const dx=Math.max(r[0]-cx,0,cx-(r[0]+r[2])),dy=Math.max(r[1]-cy,0,cy-(r[1]+r[3]));if(Math.hypot(dx,dy)<=14)ok=true}if(!ok)bad.push(it.label)});
  tdS0.door=saved;out.push(id+': unreachable tiles '+unreach.length+(unreach.length?' ['+unreach.slice(0,12).join(' ')+']':'')+' | unreachable things: '+(bad.join(', ')||'none'))}
 return out.join('\n')}));
// sweep every spot in every room
for(const bi of [0,1,4,6]){const res=await p.evaluate(i=>{benchLoad(BENCH[i]);S.wing={craft:1,games:1,sun:1,lab:1,redroom:1,trophy:1,armory:1};const fails=[];let n=0;
  const reset=()=>{for(let k=0;k<60&&dlg;k++){try{adv()}catch(e){fails.push('adv '+e.message);dlg=null}}ctrl=null;ui.querySelectorAll('.panel,.dlg,.logbox,.bag').forEach(e=>e.remove());if(typeof BAG!=='undefined')BAG.el=null;OVK=0};var OVK;
  for(const r in ROOMS){if(r==='cell')continue;try{TD.resume=null;toRoom(r,[160,150])}catch(e){fails.push('enter '+r+': '+e.message);continue}reset();
   const R=ROOMS[r];(R.spots||[]).forEach(s=>{if(s.show&&!s.show())return;for(const f of [s.act,s.vact]){if(!f)continue;n++;try{f()}catch(e){fails.push(r+' / '+s.label+': '+e.message)}try{if(ctrl&&ctrl.box){const o=ctrl.box.querySelector('.opt:not(.dis)');if(o)o.click()}}catch(e){fails.push(r+' / '+s.label+' (option): '+e.message)}reset();try{if(!(scene&&scene.isRoom)){TD.resume=null;toRoom(r,[160,150]);reset()}}catch(e){}}});
   (R.npcs?R.npcs():[]).forEach(nn=>{n++;try{nn.act()}catch(e){fails.push(r+' / npc '+nn.label+': '+e.message)}reset();try{TD.resume=null;toRoom(r,[160,150]);reset()}catch(e){}})}
  for(const id in TD.maps){const M=TD.maps[id];const z=M.zl[0];try{tdGo(id,z.r[0]+1,z.r[1]+1,'d')}catch(e){fails.push('tdGo '+id+' '+e.message);continue}reset();
   M.props.forEach(P=>{if(!P.act||(P.show&&!P.show()))return;n++;try{P.act(tdWho(),null,P,scene)}catch(e){fails.push(id+' / '+P.id+': '+e.message)}try{if(ctrl&&ctrl.box){const o=ctrl.box.querySelector('.opt:not(.dis)');if(o)o.click()}}catch(e){fails.push(id+' / '+P.id+' (option): '+e.message)}reset();try{if(!(scene&&scene.td)){tdGo(id,z.r[0]+1,z.r[1]+1,'d');reset()}}catch(e){}})}
  return {n,fails:fails.slice(0,40)}},bi);console.log('bench',bi,'checked',res.n,'failures',res.fails.length);res.fails.forEach(f=>console.log('  ',f))}
await p.waitForTimeout(300);console.log('PAGE ERRORS',errs.size);for(const [k,v] of errs)console.log(v,k);await b.close()})();
