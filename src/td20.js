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
/* one pre-rendered overlay per mood (time of day, outdoors, dark state): darkening, tint and vignette in a single
   cheap drawImage per frame. No per-frame blend modes (they were the expensive part on big screens). */
function vfxOverlay(key,tint,dark){VFX.ov=VFX.ov||{};if(VFX.ov[key])return VFX.ov[key];const k=2,o=document.createElement('canvas');o.width=W*k;o.height=H*k;const g=o.getContext('2d');if(!g)return null;g.scale(k,k);
 g.fillStyle=`rgba(6,3,12,${dark})`;g.fillRect(0,0,W,H);if(tint){g.fillStyle=tint;g.fillRect(0,0,W,H)}
 const R=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.28,W/2,H/2,Math.hypot(W,H)*.56);R.addColorStop(0,'rgba(0,0,0,0)');R.addColorStop(.62,'rgba(4,2,10,.22)');R.addColorStop(1,'rgba(2,0,6,.62)');g.fillStyle=R;g.fillRect(0,0,W,H);return VFX.ov[key]=o}
function vfxMood(z){if(!S)return null;const sl=Math.min(S.slot,3),out=!!(z&&z.out);if(S.dark)return['dk'+out,'rgba(60,30,40,.12)',.26];
 return [['m'+out,`rgba(255,190,150,${out?.05:.03})`,.13],['d'+out,'rgba(40,30,60,.04)',.12],['e'+out,`rgba(170,50,40,${out?.09:.06})`,.18],['n'+out,`rgba(30,40,110,${out?.12:.08})`,.22]][sl]}
function vfxPost(zone,cam){if(META.fxOff||!scene||!scene.td)return;const sc=scene;
 c.save();
 /* keep the player readable when it is dark: a faint warm rim, not a torch */
 if(sc.p&&tdNight()){const r=26;c.globalCompositeOperation='lighter';c.globalAlpha=zone&&zone.out?.14:.08;c.drawImage(tdGrad(r,'255,214,170'),sc.p.x-cam.x-r,sc.p.y-cam.y-r-8,r*2,r*2);c.globalAlpha=1;c.globalCompositeOperation='source-over'}
 const m=vfxMood(zone);if(m){const o=vfxOverlay(m[0],m[1],m[2]);if(o){c.imageSmoothingEnabled=true;c.drawImage(o,0,0,W,H)}}
 c.restore()}
const _wfx20=tdWeatherFX;tdWeatherFX=function(zone,cam){_wfx20.apply(this,arguments);try{vfxPost(zone||(scene&&scene.zone),cam)}catch(e){}};
const _pm20=pauseMenu;pauseMenu=function(){_pm20.apply(this,arguments);const box=document.querySelector('.pausebox .pbtns');if(!box)return;const b=document.createElement('button');const lab=()=>'Visual polish: '+(META.fxOff?'off':'on');b.textContent=lab();
 b.onclick=e=>{e.stopPropagation();META.fxOff=!META.fxOff;saveMeta();b.textContent=lab()};box.insertBefore(b,box.lastElementChild)};
/* characters and dogs get soft shading (tdPx, TD.shade / TDSH) */
const _act20=tdActor;tdActor=function(){TD.shade=1;try{return _act20.apply(this,arguments)}finally{TD.shade=0}};
const _dog20=tdDog;tdDog=function(){TD.shade=1;try{return _dog20.apply(this,arguments)}finally{TD.shade=0}};
const _back20=tdBack;tdBack=function(a){const r=_back20(a);try{if(r&&TDSH.has(a))TDSH.add(r)}catch(e){}return r};
try{if(typeof ANG!=='undefined')TDSH.add(ANG);if(typeof RON!=='undefined')TDSH.add(RON)}catch(e){}
/* anatomy: the base sprites are chibi (head ≈ a third of the body). For people, drop one hair row and one cheek row
   and add the two rows back as a longer torso and longer legs, and trim the outermost hair pixel each side of the head.
   Same height and feet line, so nothing else moves. Cached per array; back views reuse their front view's rows. */
const ANAT=new WeakMap(),ANATP=new WeakMap();
function anatParams(a){if(ANATP.has(a))return ANATP.get(a);const h=a.length,n=a[0].length;let p=null;
 if(h>=28&&n>=14){const r0=a.findIndex(r=>/[^.]/.test(r));const eye=a.findIndex(r=>r.includes('e'));if(r0>=0&&eye>r0+2&&eye<h*.45)p={r0,eye,hip:Math.round(eye+(h-eye)*.4),knee:Math.round(eye+(h-eye)*.72)}}
 ANATP.set(a,p);return p}
function anat(a){if(ANAT.has(a))return ANAT.get(a);const p=anatParams(a);if(!p){ANAT.set(a,a);return a}
 const {r0,eye,hip,knee}=p,h=a.length;const drop=new Set([r0+1,eye+1]);const out=[];
 for(let j=0;j<h;j++){if(drop.has(j))continue;let r=a[j];
  if(j>=r0&&j<=eye+2){const L=r.search(/[^.]/),R=r.length-1-[...r].reverse().join('').search(/[^.]/);const skin=ch=>ch==='s'||ch==='S'||ch==='e';if(L>=0&&R-L>6){if(!skin(r[L]))r=r.slice(0,L)+'.'+r.slice(L+1);if(!skin(r[R]))r=r.slice(0,R)+'.'+r.slice(R+1)}}
  out.push(r);if(j===hip||j===knee)out.push(r)}
 while(out.length<h)out.unshift('.'.repeat(a[0].length));while(out.length>h)out.shift();
 out.P=a.P;out.S=a.S;if(TDSH.has(a))TDSH.add(out);ANAT.set(a,out);return out}
const _px20=tdPx;tdPx=function(a){if(a&&!META.fxOff&&(TD.shade||TDSH.has(a))&&!TD.noAnat){const b=anat(a);if(b!==a){arguments[0]=b}}return _px20.apply(this,arguments)};
const _back20b=tdBack;tdBack=function(a){const r=_back20b(a);try{if(r&&r!==a&&!ANATP.has(r)){const p=anatParams(a);if(p)ANATP.set(r,p)}}catch(e){}return r};
