const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const errs=new Map();
for(const bi of [0,3,7]){const p=await b.newPage({viewport:{width:800,height:500}});p.on('pageerror',e=>{const k=e.message+' @'+((e.stack||'').split('\n')[1]||'').trim().slice(0,90);errs.set(k,(errs.get(k)||0)+1)});
await p.route('**/three.min.js',r=>r.abort());await p.route('**/fonts.googleapis.com/**',r=>r.abort());
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);await p.evaluate(()=>document.querySelectorAll('.splash').forEach(e=>e.remove()));
await p.evaluate(i=>{benchLoad(BENCH[i]);},bi);await p.waitForTimeout(200);
const maps=['trailer','base','ewing','ops','roof','garage','cellar'];let stats={td:0,other:0,inter:0};
for(let r=0;r<60;r++){
 const s=await p.evaluate(([m,bi])=>{if(!S){benchLoad(BENCH[bi]);ctrl=null;ui.innerHTML='';return 'reload'}if(ctrl&&Math.random()<.35){ctrl=null;ui.innerHTML='';dlg=null}if(ctrl){const o=[...document.querySelectorAll('.opt:not(.dis)')];if(o.length){(Math.random()<.6?o[o.length-1]:o[Math.floor(Math.random()*o.length)]).click()}else{ctrl=null;ui.innerHTML=''}return 'ctrl'}
  if(dlg){adv();return 'dlg'}
  if(!scene||!scene.td){S.slot=Math.floor(Math.random()*4);TD.resume=null;const M=TD.maps[m];const z=M.zl[Math.floor(Math.random()*M.zl.length)];const room=z.room;if(Math.random()<.3){hub();return 'hub'}if(scene&&scene.isMap){scene.onTap(Math.random()*W,Math.random()*H);return 'map'}if(Math.random()<.15){cityMap();return 'map'}if(m==='trailer'||m==='base'||m==='ewing')toRoom(room,[160,150]);else tdGo(m,z.r[0]+1,z.r[1]+1,'d');return 'enter '+m}
  return 'td';},[maps[Math.floor(Math.random()*maps.length)],bi]);
 if(s==='td'){stats.td++;const k=['w','a','s','d','e','e','w','d'][Math.floor(Math.random()*8)];await p.keyboard.down(k);await p.waitForTimeout(120+Math.random()*400);await p.keyboard.up(k);
  if(Math.random()<.25)await p.evaluate(()=>{if(scene&&scene.td&&scene.inter.length){const it=scene.inter[Math.floor(Math.random()*scene.inter.length)];scene.tapTo(it.r[0]+it.r[2]/2-scene.cam.x,it.r[1]-scene.cam.y)}});}
 else{stats.other++;await p.waitForTimeout(40)}
 if(r%10===0)await p.evaluate(()=>{if(scene&&!scene.td&&!dlg&&!ctrl){TD.resume=null;hub()}});}
console.log('bench',bi,JSON.stringify(stats));await p.close()}
console.log('ERRORS',errs.size);for(const [k,v] of errs)console.log(v,k);await b.close()})();
