/* alternate universes: play The Long Leash on both sides with a simple bot, every ending path, no errors */
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);
const opts=()=>ev(()=>ctrl&&ctrl.box?[...ctrl.box.querySelectorAll('.opt')].map(o=>o.textContent):[]);
const click=async re=>{for(let k=0;k<80;k++){const r=await ev(re=>{for(let i=0;i<200&&dlg;i++)adv();if(ctrl&&ctrl.box){const o=[...ctrl.box.querySelectorAll('.opt:not(.dis)')].find(o=>new RegExp(re).test(o.textContent));if(o){o.click();return 1}}return 0},re);if(r)return true;await p.waitForTimeout(25)}return false};
/* bot: 'try' plays to win using the debug handle, 'idle' does nothing */
const night=(side,mode)=>ev(([side,mode])=>{let n=0;const sc=scene;if(!sc.onTap)return 'NO GAME';const D=LL.dbg,TS=16;
 const next=(e,tx,ty)=>{const [ex,ey]=llT(e);const d=llDist(tx,ty);let b=[ex,ey],bd=d[ey][ex]<0?1e9:d[ey][ex];for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=ex+dx,ny=ey+dy;if(llBlk(nx,ny,1))continue;if(d[ny][nx]>=0&&d[ny][nx]<bd){bd=d[ny][nx];b=[nx,ny]}}return b};
 while(scene===sc&&!dlg&&!(ctrl&&ctrl.box)&&n++<4000){for(const k in pressed)delete pressed[k];
  if(mode==='try'){if(side==='v'){const [mx,my]=llT(D.M);const b=next(D.V,mx,my);sc.onTap(b[0]*TS+8,b[1]*TS+8+16);if(Math.hypot(D.M.x-D.V.x,D.M.y-D.V.y)<50)pressed.act=1}
   else{const dv=llDist(...llT(D.V)),dm=llDist(...llT(D.M));let g;if(D.kits.length){g=D.kits.slice().sort((a,b)=>(dm[a[1]][a[0]]-dv[a[1]][a[0]])-(dm[b[1]][b[0]]-dv[b[1]][b[0]]))[0]}else{g=LL.EX.slice().sort((a,b)=>(dv[b[1]][b[0]]-dm[b[1]][b[0]])-(dv[a[1]][a[0]]-dm[a[1]][a[0]]))[0]}
    if(Math.hypot(D.M.x-D.V.x,D.M.y-D.V.y)<30)pressed.act=1;const [mx,my]=llT(D.M);if(dv[my][mx]<5&&!(mx===g[0]&&my===g[1]&&dv[my][mx]>3)){let b=[mx,my],bd=dv[my][mx];for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=mx+dx,ny=my+dy;if(llBlk(nx,ny,0))continue;if(dv[ny][nx]>bd){bd=dv[ny][nx];b=[nx,ny]}}sc.onTap(b[0]*TS+8,b[1]*TS+8+16)}else if(!(mx===g[0]&&my===g[1])){const b=next(D.M,g[0],g[1]);sc.onTap(b[0]*TS+8,b[1]*TS+8+16)}}}
  sc.update()}return 'frames '+n},[side,mode]);
for(const [side,mode,third] of [['Commander','idle','Stand'],['Commander','try','Take the coat'],['Commander','try','Stand'],['Researcher','idle','Run for it'],['Researcher','try','Come with me'],['Researcher','try','Run for it']]){
 await ev(()=>{title()});await p.waitForTimeout(100);if(!await click('Alternate universes')){console.log('NO MENU ENTRY',await opts());break}
 await p.waitForTimeout(80);await click('The Long Leash');await p.waitForTimeout(80);await click('The '+side);const s=side==='Commander'?'v':'m';const log=[];
 for(let n=0;n<3;n++){for(let k=0;k<60;k++){const st=await ev(()=>{for(let i=0;i<200&&dlg;i++)adv();return ctrl&&ctrl.box?2:dlg?0:scene&&scene.onTap?1:0});if(st===1)break;if(st===2){const o=await opts();if(o.some(t=>/Take the coat|Come with me/.test(t))){await click(third);if(/coat|Come/.test(third)){n=9}}}await p.waitForTimeout(25)}
  if(n>=9)break;log.push(await night(s,mode));await p.waitForTimeout(30)}
 for(let k=0;k<60;k++){const o=await opts();if(o.some(t=>/Play it again/.test(t)))break;await ev(()=>{for(let i=0;i<200&&dlg;i++)adv()});await p.waitForTimeout(25)}
 console.log(side,mode,third,'|',log.join(', '),'|',await ev(()=>document.querySelector('.panel h2')?.textContent+' · '+document.querySelector('.panel p')?.textContent))}
await ev(()=>{title()});await click('Alternate universes');await p.waitForTimeout(100);console.log('menu:',(await opts()).join(' | '));
await click('The Long Leash');await click('The Researcher');for(let k=0;k<40;k++){if(await ev(()=>{for(let i=0;i<200&&dlg;i++)adv();return !dlg&&!(ctrl&&ctrl.box)&&scene&&scene.onTap?1:0}))break;await p.waitForTimeout(25)}
await ev(()=>{for(let i=0;i<150;i++)scene.update()});await p.waitForTimeout(200);await (await p.$('#stage')).screenshot({path:'/tmp/claude-0/-home-user-probable-computing-machine/fb953b83-67f4-577f-b1f2-c602f62e0513/scratchpad/au1.png'});
console.log('ERR',errs);await b.close()})();
