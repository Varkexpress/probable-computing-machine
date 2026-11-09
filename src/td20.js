/* ===================== td20: visual pass =====================
   Baked contact shadows where floors meet walls and solid tiles; a vignette; a gentle colour grade by time of day
   (and a cold, drained grade while things are dark); the player stays readable at night.
   Pause menu → "Visual polish" turns the screen effects off (META.fxOff). */
const VFX={};
function vfxGrad(w,h,dir,a){const o=document.createElement('canvas');o.width=w;o.height=h;const g=o.getContext('2d');if(!g)return o;
 const L=dir==='t'?g.createLinearGradient(0,0,0,h):dir==='b'?g.createLinearGradient(0,h,0,0):dir==='l'?g.createLinearGradient(0,0,w,0):g.createLinearGradient(w,0,0,0);
 L.addColorStop(0,`rgba(6,4,12,${a})`);L.addColorStop(1,'rgba(6,4,12,0)');g.fillStyle=L;g.fillRect(0,0,w,h);return o}
function vfxAO(M,o){const g=o.getContext('2d');if(!g)return;if(!VFX.t){VFX.t=vfxGrad(TS,8,'t',.38);VFX.b=vfxGrad(TS,3,'b',.16);VFX.l=vfxGrad(5,TS,'l',.24);VFX.r=vfxGrad(5,TS,'r',.24)}
 const walk=(i,j)=>i>=0&&j>=0&&i<M.W&&j<M.H&&TDWALK.includes(tdCh(M,i,j));const casts=(i,j)=>{if(i<0||j<0||i>=M.W||j>=M.H)return false;const ch=tdCh(M,i,j);return !TDWALK.includes(ch)&&ch!=='~'&&ch!=='T'&&ch!==' '};
 for(let j=0;j<M.H;j++)for(let i=0;i<M.W;i++){if(!walk(i,j))continue;const x=i*TS,y=j*TS;
  if(casts(i,j-1))g.drawImage(VFX.t,x,y);
  if(casts(i-1,j))g.drawImage(VFX.l,x,y);
  if(casts(i+1,j))g.drawImage(VFX.r,x+TS-5,y);
  if(casts(i,j+1))g.drawImage(VFX.b,x,y+TS-3);
  if(casts(i-1,j-1)&&!casts(i,j-1)&&!casts(i-1,j)){g.fillStyle='rgba(6,4,12,.12)';g.fillRect(x,y,3,3)}
  if(casts(i+1,j-1)&&!casts(i,j-1)&&!casts(i+1,j)){g.fillStyle='rgba(6,4,12,.12)';g.fillRect(x+TS-3,y,3,3)}}}
const _bake20=tdBake;tdBake=function(M){const o=_bake20(M);try{if(o)vfxAO(M,o)}catch(e){}return o};
function vfxVignette(){if(VFX.vig)return VFX.vig;const o=document.createElement('canvas');o.width=W;o.height=H;const g=o.getContext('2d');if(!g)return null;
 const R=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.32,W/2,H/2,Math.hypot(W,H)*.56);R.addColorStop(0,'rgba(0,0,0,0)');R.addColorStop(.7,'rgba(4,2,10,.16)');R.addColorStop(1,'rgba(4,2,10,.42)');g.fillStyle=R;g.fillRect(0,0,W,H);return VFX.vig=o}
function vfxGrade(z){if(!S)return null;if(S.dark)return['color','rgba(70,60,70,.20)'];const sl=Math.min(S.slot,3);const out=z&&z.out;
 return [['soft-light',`rgba(255,196,150,${out?.16:.10})`],null,['soft-light',`rgba(255,120,90,${out?.18:.10})`],['soft-light',`rgba(70,90,180,${out?.22:.14})`]][sl]}
function vfxPost(zone,cam){if(META.fxOff||!scene||!scene.td)return;const sc=scene;
 c.save();
 const gr=vfxGrade(zone);if(gr){c.globalCompositeOperation=gr[0];c.fillStyle=gr[1];c.fillRect(0,0,W,H);c.globalCompositeOperation='source-over'}
 /* keep the player readable when it is dark: a faint warm rim, not a torch */
 if(sc.p&&tdNight()){const r=26;c.globalCompositeOperation='lighter';c.globalAlpha=zone&&zone.out?.14:.08;c.drawImage(tdGrad(r,'255,214,170'),sc.p.x-cam.x-r,sc.p.y-cam.y-r-8,r*2,r*2);c.globalAlpha=1;c.globalCompositeOperation='source-over'}
 const v=vfxVignette();if(v)c.drawImage(v,0,0);
 c.restore()}
const _wfx20=tdWeatherFX;tdWeatherFX=function(zone,cam){_wfx20.apply(this,arguments);try{vfxPost(zone||(scene&&scene.zone),cam)}catch(e){}};
const _pm20=pauseMenu;pauseMenu=function(){_pm20.apply(this,arguments);const box=document.querySelector('.pausebox .pbtns');if(!box)return;const b=document.createElement('button');const lab=()=>'Visual polish: '+(META.fxOff?'off':'on');b.textContent=lab();
 b.onclick=e=>{e.stopPropagation();META.fxOff=!META.fxOff;saveMeta();b.textContent=lab()};box.insertBefore(b,box.lastElementChild)};
/* characters and dogs get soft shading (tdPx, TD.shade / TDSH) */
const _act20=tdActor;tdActor=function(){TD.shade=1;try{return _act20.apply(this,arguments)}finally{TD.shade=0}};
const _dog20=tdDog;tdDog=function(){TD.shade=1;try{return _dog20.apply(this,arguments)}finally{TD.shade=0}};
const _back20=tdBack;tdBack=function(a){const r=_back20(a);try{if(r&&TDSH.has(a))TDSH.add(r)}catch(e){}return r};
try{if(typeof ANG!=='undefined')TDSH.add(ANG);if(typeof RON!=='undefined')TDSH.add(RON)}catch(e){}
