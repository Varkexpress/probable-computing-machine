/* alternate universes: play The Long Leash through its five days on both sides with a bot, several policies, no errors */
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);
/* one bot step: returns a short tag of what it did */
const step=(side,mode,prefer,avoid)=>ev(([side,mode,prefer,avoid])=>{const TS=16;
 for(let i=0;i<300&&dlg;i++)adv();
 if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(!os.length)return 'noopts';const h=document.querySelector('.panel h2');if(h&&/—/.test(h.textContent))return 'END '+h.textContent+' | '+[...document.querySelectorAll('.panel p')].map(x=>x.textContent).join(' / ');
  let o=null;for(const re of prefer){o=os.find(x=>new RegExp(re).test(x.textContent));if(o)break}
  if(!o)o=os.find(x=>!avoid.some(re=>new RegExp(re).test(x.textContent)))||os[0];const t=o.textContent.slice(0,34);o.click();return 'opt:'+t}
 const sc=scene;if(!sc||!sc.onTap)return 'idle';let n=0;const D=LL.dbg;
 const next=(e,tx,ty)=>{const [ex,ey]=llT(e);const d=llDist(tx,ty);let b=[ex,ey],bd=d[ey][ex]<0?1e9:d[ey][ex];for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=ex+dx,ny=ey+dy;if(llBlk(nx,ny,1))continue;if(d[ny][nx]>=0&&d[ny][nx]<bd){bd=d[ny][nx];b=[nx,ny]}}return b};
 while(scene===sc&&!dlg&&!(ctrl&&ctrl.box)&&n++<5000){for(const k in pressed)delete pressed[k];
  if(mode==='try'){if(LL.game==='hush'){if(LL.hush())pressed.act=1}else if(LL.game==='bench'){if(LL.bench())pressed.act=1}
   else if(LL.game==='inspect'){const I=LL.insp;if(n%12===0){if(I.phase==='hide'){const k=[4,6,8,2,5].find(k=>I.got[k].length<I.cap(k));if(k!==undefined){I.cur=k;pressed.act=1}}else if(I.phase==='seek'){const g=I.glance;const k=g>=0&&!I.searched[g]&&g!==8?g:[0,1,3,7,5,4,6,2].find(k=>!I.searched[k]);if(k!==undefined){I.cur=k;pressed.act=1}}}}
   else if(LL.game==='gen'){if(LL.gen.mode==='in'&&n%6===0)pressed[['up','right','down','left'][LL.gen.want]]=1}
   else if(LL.game==='scarf'){const b=next(D.P,...llT(D.F));sc.onTap(b[0]*TS+8,b[1]*TS+8+16);if(Math.hypot(D.P.x-D.F.x,D.P.y-D.F.y)<36)pressed.act=1}
   else if(side==='v'){const [mx,my]=llT(D.M);const b=next(D.V,mx,my);sc.onTap(b[0]*TS+8,b[1]*TS+8+16);if(Math.hypot(D.M.x-D.V.x,D.M.y-D.V.y)<50)pressed.act=1}
   else{const dv=llDist(...llT(D.V)),dm=llDist(...llT(D.M));let g;if(D.kits.length){g=D.kits.slice().sort((a,b)=>(dm[a[1]][a[0]]-dv[a[1]][a[0]])-(dm[b[1]][b[0]]-dv[b[1]][b[0]]))[0]}else{g=LLE.slice().sort((a,b)=>(dv[b[1]][b[0]]-dm[b[1]][b[0]])-(dv[a[1]][a[0]]-dm[a[1]][a[0]]))[0]}
    if(Math.hypot(D.M.x-D.V.x,D.M.y-D.V.y)<30)pressed.act=1;const [mx,my]=llT(D.M);if(dv[my][mx]<5&&!(mx===g[0]&&my===g[1]&&dv[my][mx]>3)){let b=[mx,my],bd=dv[my][mx];for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=mx+dx,ny=my+dy;if(llBlk(nx,ny,0))continue;if(dv[ny][nx]>bd){bd=dv[ny][nx];b=[nx,ny]}}sc.onTap(b[0]*TS+8,b[1]*TS+8+16)}else if(!(mx===g[0]&&my===g[1])){const b=next(D.M,g[0],g[1]);sc.onTap(b[0]*TS+8,b[1]*TS+8+16)}}}
  else if(mode==='mash'){if(n%7===0)pressed.act=1;if(n%40===0)sc.onTap((n*37)%320,(n*53)%180)}
  else if(mode==='quit'&&n===30)pressed.back=1;
  sc.update();if(n%50===0&&sc.draw)sc.draw()}
 return 'game:'+LL.game+':'+n},[side,mode,prefer,avoid]);
const RUNS=[['Sergeant','try',['Take the coat','“I hold the same','Half an hour','Hold out the basin','Subject is well','Very well','cushion','Hold the programme','Sit with me'],['Leave this','Turn in','Back']],
 ['Sergeant','idle',['Stand in the door','Go to bed','Take the door'],['Leave this','Turn in','Back']],
 ['Researcher','try',['Run for it','Go for the cloakroom','Go for the door'],['Leave this','Turn in','Back']],
 ['Researcher','try',['Come with me','Write it on his hand','Half an hour','Sit down by his chair','Put the pencil','Say my name'],['Leave this','Turn in','Back']],
 ['Researcher','mash',['Turn in'],['Leave this','Back']],
 ['Sergeant','quit',[],['Leave this','Turn in','Back']]];
for(const [side,mode,prefer,avoid] of RUNS){await ev(()=>{title()});await p.waitForTimeout(120);const log=[];let end='';
 const pre=['Alternate universes','The Long Leash','The '+side].concat(prefer);let seen=0;
 for(let k=0;k<1400&&!end;k++){const r=await step(side==='Sergeant'?'v':'m',mode,seen<3?pre:prefer,avoid);if(/^opt:/.test(r))seen++;if(/^END/.test(r))end=r;else if(/^game/.test(r))log.push(r.slice(5));else if(r==='idle'||r==='noopts')await p.waitForTimeout(20);await p.waitForTimeout(8)}
 console.log(side,mode,'|',log.join(' '),'|',end.slice(0,330)||'NO ENDING')}
/* screenshots of each minigame */
const S='/tmp/claude-0/-home-user-probable-computing-machine/fb953b83-67f4-577f-b1f2-c602f62e0513/scratchpad/';
for(const [nm,fn] of [['inspect','llInspect("m",()=>{})'],['gen','llGen(()=>{})'],['scarf','llScarf("v",()=>{})'],['hush','llHush(()=>{})'],['bench','llBench("v",()=>{})'],['yard','llNight("m",1,()=>{},"yard")'],['theatre','llNight("v",1,()=>{},"theatre")']]){await ev(fn=>{AUON=true;eval(fn);for(let i=0;i<130;i++){if(i===100)pressed.act=1;scene.update()}},fn);await p.waitForTimeout(150);await (await p.$('#stage')).screenshot({path:S+'au_'+nm+'.png'})}
/* map sanity */
console.log('maps',await ev(()=>Object.keys(LL.MAPS).map(k=>{const m=llUse(k);const bad=m.rows.filter(r=>r.length!==20).length;const d=llDist(...m.m);const un=[];m.kits.flat().forEach(q=>{if(d[q[1]][q[0]]<0)un.push(q)});LLE.forEach(q=>{if(d[q[1]][q[0]]<0)un.push('E'+q)});return k+': badrows '+bad+' exits '+LLE.length+' unreachable '+JSON.stringify(un)+' vstart '+d[m.v[1]][m.v[0]]}).join(' | ')));
console.log('ERR',errs);await b.close()})();
