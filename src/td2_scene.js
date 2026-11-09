/* ---------- interactables ---------- */
const TDHIDE=/^(Stairs|Back to|East corridor|Back hatch|Lower hall|Hallway →|East wing|Door — head out|Ladder|Hatch|Elevator|Leave$)/;
function tdRoomsOf(M){const s=[];M.zl.forEach(z=>{if(ROOMS[z.room]&&!s.includes(z.room))s.push(z.room)});return s}
function tdPropRoom(M,p){const z=p.z?M.zones[p.z]:(tdZoneAt(M,p.x+p.w/2,p.y+p.d/2)||tdZoneAt(M,p.x+p.w/2,p.y+p.d+8)||tdZoneAt(M,p.x+p.w/2,p.y+p.d+24));return z?z.room:null}
function tdLegacyOf(M,p,who){if(!p.legacy)return null;const room=p.room||(p.room=tdPropRoom(M,p));const R=ROOMS[room];if(!R||!R.spots)return null;const keys=Array.isArray(p.legacy)?p.legacy:[p.legacy];
 for(const k of keys){const arr=R.spots.filter(s=>s.label.startsWith(k)&&(!s.show||s.show())&&(!s.only||s.only===who));const s=arr[p.legacyN||0];if(s)return s}return null}
const TDAUTO=new WeakMap();
function tdAutoPos(M,room,s){let v=TDAUTO.get(s);if(v&&v.m===M.id)return v;const q=tdToMap(room,s.at[0],s.at[1]);if(!q)return null;const f=tdFree(M,q.x,q.y);v={m:M.id,x:f[0],y:f[1]};TDAUTO.set(s,v);return v}
function tdIRect(p){if(p.wall)return[p.x,p.y+p.d-2,p.w,p.reach||24];return[p.x-3,p.y-3,p.w+6,p.d+6]}
function tdCollect(sc){const M=sc.M,who=tdWho(),L=[];const claimed={};
 for(const p of M.props){if(p.show&&!p.show())continue;if(p.gone&&p.gone())continue;const leg=tdLegacyOf(M,p,who);if(leg){(claimed[p.room]=claimed[p.room]||new Set()).add(leg)}
  if(!p.act&&!leg&&!p.kind)continue;if(p.kind==='deco'||p.exit)continue;const lab=p.label?tdLabel(p):leg?leg.label:null;if(!lab)continue;L.push({k:'prop',p,leg,r:tdIRect(p),label:lab,top:p.y-(p.h||10)})}
 for(const room of tdRoomsOf(M)){const R=ROOMS[room];(R.spots||[]).forEach(s=>{if(s.show&&!s.show())return;if(s.only&&s.only!==who)return;if(claimed[room]&&claimed[room].has(s))return;if(TDHIDE.test(s.label))return;
  if(M.props.some(p=>p.legacy&&(p.room||(p.room=tdPropRoom(M,p)))===room&&(Array.isArray(p.legacy)?p.legacy:[p.legacy]).some(k=>s.label.startsWith(k))))return;
  const q=tdAutoPos(M,room,s);if(!q)return;L.push({k:'spot',s,room,x:q.x,y:q.y,r:[q.x-7,q.y-8,14,12],label:s.label,top:q.y-14})})}
 sc.npcList.forEach(n=>L.push({k:'npc',n,r:[n.x-8,n.y-8,16,12],label:n.label,top:n.y-38}));
 sc.dogs.forEach(d=>L.push({k:'dog',d,r:[d.x-8,d.y-6,16,10],label:(d.sleep?'Wake ':'Pet ')+d.n,top:d.y-14}));
 for(const k in M.doors){const d=M.doors[k];const x=d.i*TS,y=d.j*TS;if(d.hidden&&d.hidden())continue;if(d.noUse&&d.noUse())continue;const op=tdDoorOpen(M,d);L.push({k:'door',d,r:[x-2,y-2,TS+4,TS+4],label:d.label?d.label(op):(op?'Close the door':'Open the door'),top:y-(d.face?20:6),low:1})}
 return L}
function tdPick(sc){const p=sc.p;const f={u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]}[p.dir];const px=p.x+f[0]*9,py=p.y-2+f[1]*8;
 const dist=(r,x,y)=>{const dx=Math.max(r[0]-x,0,x-(r[0]+r[2])),dy=Math.max(r[1]-y,0,y-(r[1]+r[3]));return Math.hypot(dx,dy)};
 let best=null,bs=1e9;for(const it of sc.inter){const d0=dist(it.r,p.x,p.y-2),d1=dist(it.r,px,py);if(d0>15)continue;const s=d1+d0*.6+(it.low?3:0);if(s<bs){bs=s;best=it}}return best}
function tdRunSpot(s){const v=tdWho()==='v'&&s.vact;if(s.j&&!v)note(s.label,s.j);(v?s.vact:s.act)()}
/* ---------- path finding for taps ---------- */
function tdGridBlock(M){const B=new Uint8Array(M.W*M.H);for(let j=0;j<M.H;j++)for(let i=0;i<M.W;i++){const ch=tdCh(M,i,j);if(!TDWALK.includes(ch)){B[j*M.W+i]=1;continue}if(ch==='D'){const d=M.doors[i+','+j];if(d.locked&&d.locked()&&!tdDoorOpen(M,d))B[j*M.W+i]=1}}
 for(const p of M.props){if(!p.solid||(p.show&&!p.show())||(p.gone&&p.gone()))continue;for(let j=Math.floor(p.y/TS);j<=Math.floor((p.y+p.d-1)/TS);j++)for(let i=Math.floor(p.x/TS);i<=Math.floor((p.x+p.w-1)/TS);i++){const cx=i*TS+8,cy=j*TS+8;if(cx>=p.x-3&&cx<=p.x+p.w+3&&cy>=p.y-3&&cy<=p.y+p.d+3&&i>=0&&j>=0&&i<M.W&&j<M.H)B[j*M.W+i]=1}}return B}
function tdBFS(M,sx,sy){const B=tdGridBlock(M),N=M.W*M.H,D=new Int32Array(N).fill(-1),P=new Int32Array(N).fill(-1);const s=Math.floor(sy/TS)*M.W+Math.floor(sx/TS);if(s<0||s>=N)return{D,P};D[s]=0;const q=[s];
 for(let h=0;h<q.length;h++){const u=q[h],i=u%M.W,j=(u/M.W)|0;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const ni=i+dx,nj=j+dy;if(ni<0||nj<0||ni>=M.W||nj>=M.H)continue;const v=nj*M.W+ni;if(D[v]>=0||B[v])continue;D[v]=D[u]+1;P[v]=u;q.push(v)}}return{D,P,B}}
/* like tdFree, but refuses a spot that is sealed off (a 1-tile pocket in a curved wall, a gap between planters): it must sit on an open tile with room to walk */
function tdFreeReach(M,x,y,z){const f=tdFree(M,x,y);const ok=(px,py)=>{const {D,B}=tdBFS(M,px,py);const s=Math.floor(py/TS)*M.W+Math.floor(px/TS);if(!B||B[s])return false;let n=0;for(let i=0;i<D.length&&n<24;i++)if(D[i]>=0)n++;return n>=24};
 if(ok(f[0],f[1]))return f;const r=(z&&z.r)||[0,0,M.W,M.H];const C=[];for(let j=r[1];j<r[1]+r[3];j++)for(let i=r[0];i<r[0]+r[2];i++){const cx=i*TS+8,cy=j*TS+12;if(!tdBlocked(M,cx,cy))C.push([Math.hypot(cx-x,cy-y),cx,cy])}
 C.sort((a,b)=>a[0]-b[0]);for(const [,cx,cy] of C)if(ok(cx,cy))return[cx,cy];return f}
function tdPathTo(M,sx,sy,test){const {D,P}=tdBFS(M,sx,sy);let best=-1,bs=1e9;for(let v=0;v<D.length;v++){if(D[v]<0)continue;const sc=test(v%M.W,(v/M.W)|0);if(sc===null)continue;const t=sc*4+D[v]*.2;if(t<bs){bs=t;best=v}}
 if(best<0)return null;const out=[];let u=best;while(u>=0&&D[u]>0){out.unshift([(u%M.W)*TS+8,((u/M.W)|0)*TS+12]);u=P[u]}return out}
/* ---------- the scene ---------- */
function tdScene(mapId,x,y,dir,opt={}){const M=TD.maps[mapId];const p={x,y,dir:dir||'d',fr:0,vx:0,vy:0,sit:null,hold:null};
 const sc={isRoom:true,td:true,M,p,npcList:[],dogs:[],inter:[],cur:null,fade:opt.noFade?0:16,ns:{},rv:{},zone:null,
  pos(){if(TD.drawing)return[p.x,p.y+12];return tdToLegacy(S.room,p.x,p.y)},
  near(){return this.cur?{label:this.cur.label,at:tdToLegacy(S.room,p.x,p.y)}:null},
  enter(){const z=tdZoneNear(M,p.x,p.y);this.cam={x:clamp(p.x-W/2,Math.min(0,M.pw-W)/1,Math.max(0,M.pw-W)),y:clamp(p.y-H/2-10,Math.min(0,M.ph-H),Math.max(0,M.ph-H))};if(M.pw<W)this.cam.x=(M.pw-W)/2;if(M.ph<H)this.cam.y=(M.ph-H)/2;
   if(z){S.room=z.room}S.roomPos=this.pos();TD.bark=null;this.exitLock=M.props.some(q=>q.exit&&p.x>q.x&&p.x<q.x+q.w&&p.y>q.y&&p.y<q.y+q.d)?1:0;TD.parts=[];this.spawnDogs();if(M.enter)M.enter(this);if(z)this.zoneIn(z,true)},
  spawnDogs(){this.dogs=[];const cols={Biscuit:'#c98a3a',Sergeant:'#3a3030',Mochi:'#f4f0ea',Pancake:'#9a6a40'};
   M.zl.forEach(z=>{const R=ROOMS[z.room];if(!R||!R.dogs||z.room!==z.id)return;R.dogs().forEach((d,i)=>{const pos=tdFree(M,z.px[0]+20+((i*53)%(z.px[2]-40)),z.px[1]+24+((i*29)%(z.px[3]-40)));this.dogs.push(Object.assign({x:pos[0],y:pos[1],vx:0,vy:0,t:ri(30,120),z,R,f:false,sleep:d.n==='Sergeant'&&tdNight()},d))})})},
  zoneIn(z,first){const prev=this.zone;this.zone=z;if(!first&&prev&&prev.room!==z.room&&TD.bark&&TD.bark.self)TD.bark=null;if(p.hold==='can'&&z.id!=='green'&&!first){p.hold=null;tdThink(tdWho()==='v'?'He puts the can back by the bench. Order.':'can goes back. i’m not a thief. (i am. but not of cans.)',120)}if(!first&&prev&&prev.room===z.room&&prev.id===z.id)return;const roomChanged=!prev||prev.room!==z.room||first;S.room=z.room;
   if(z.onEnter)try{z.onEnter(this,first)}catch(e){console.error(e)}
   if(roomChanged){const R=ROOMS[z.room];if(R&&R.enter&&!dlg&&!ctrl)try{R.enter()}catch(e){console.error(e)}}
   if(roomChanged&&typeof flashCheck==='function'&&!this.fl){try{if(flashCheck(z.room,{x:160,y:150})){this.fl=1}}catch(e){}}},
  leaveTD(){if(this.noResume||!S){TD.resume=null;return}TD.resume={room:S.room,map:M.id,x:p.x,y:p.y,dir:p.dir,lp:this.pos()}},
  trans(fn){if(this.tr)return;this.noResume=1;this.tr={t:0,fn:()=>{fn();if(scene===this)this.noResume=0}};sfx('step')},
  tapTo(sx,sy){if(!this.cam)return;const wx=sx+this.cam.x,wy=sy+this.cam.y;this.tapFx={x:wx,y:wy,t:20};if(p.sit){this.stand();return}
   let it=null,bd=10;for(const q of this.inter){const r=q.r;const dx=Math.max(r[0]-wx,0,wx-(r[0]+r[2])),dy=Math.max(r[1]-12-wy,0,wy-(r[1]+r[3]));const d=Math.hypot(dx,dy);if(d<bd){bd=d;it=q}}
   if(it){const r=it.r;const path=tdPathTo(M,p.x,p.y-2,(i,j)=>{const cx=i*TS+8,cy=j*TS+12;const dx=Math.max(r[0]-cx,0,cx-(r[0]+r[2])),dy=Math.max(r[1]-cy,0,cy-(r[1]+r[3]));const d=Math.hypot(dx,dy);return d<=13?d:null});
    if(path){this.path=path;this.goal=it;if(!path.length)this.arrive();return}}
   const ti=Math.floor(wx/TS),tj=Math.floor(wy/TS);const path=tdPathTo(M,p.x,p.y-2,(i,j)=>Math.hypot(i-ti,j-tj));if(path){if(path.length)path[path.length-1]=tdBlocked(M,wx,wy)?path[path.length-1]:[wx,wy];this.path=path;this.goal=null}},
  arrive(){const it=this.goal;this.goal=null;this.path=null;if(!it)return;const r=it.r,cx=r[0]+r[2]/2,cy=r[1]+r[3]/2;const dx=cx-p.x,dy=cy-(p.y-2);p.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'l':'r'):(dy<0?'u':'d');this.use(it)},
  use(it){if(!it)return;const who=tdWho();const room=it.k==='spot'?it.room:it.k==='prop'?(it.p.room||tdPropRoom(M,it.p)):this.zone?this.zone.room:S.room;if(room&&ROOMS[room])S.room=room;S.roomPos=this.pos();sfx('sel');
   try{if(it.k==='prop'){const P=it.p;const L=it.leg?()=>tdRunSpot(it.leg):null;tdMark(P.id);if(P.seen)tdMark(P.seen);if(P.act)P.act(who,L,P,this);else if(L)L()}
    else if(it.k==='spot')tdRunSpot(it.s);else if(it.k==='npc'){it.n.face=1;it.n.act()}else if(it.k==='dog'){if(it.d.sleep){it.d.sleep=false;tdSay([['',it.d.n+' opens one eye, decides you are not dinner, and closes it again. Then thinks better of it and gets up.']])}else it.d.R.petDog(it.d)}
    else if(it.k==='door')this.toggleDoor(it.d)}catch(e){console.error(e)}},
  toggleDoor(d,auto){const op=tdDoorOpen(M,d);if(!op&&d.locked&&d.locked()){if(d.onLocked)d.onLocked(this);else tdSay([['','Locked.']]);return false}
   if(op&&tdBlocked(M,p.x,p.y,true)===false){const x=d.i*TS,y=d.j*TS;if(p.x+5>x&&p.x-5<x+TS&&p.y>y&&p.y-4<y+TS)return false}
   tdS().door[d.id]=op?0:1;save();sfx(op?'snap':'step');if(!op&&d.onOpen)d.onOpen(this);return true},
  stand(){if(!p.sit)return;const s=p.sit;p.sit=null;p.x=s.ox;p.y=s.oy;if(s.onStand)s.onStand()},
  sitOn(seat,lines,onStand){const pp=seat;p.sit={ox:p.x,oy:p.y,onStand};p.x=pp.sx;p.y=pp.sy;p.dir=pp.sdir||'d';if(lines)tdSay(lines)},
  update(){const M=this.M;if(this.tr){this.tr.t+=DT||1;if(this.tr.t>=12){const f=this.tr.fn;this.tr=null;f()}return}
   if(!this.cam)return;
   if(p.sit){if(held.left||held.right||held.up||held.down||hit('back')){this.stand()}else if(hit('act')){const it=this.cur;if(it&&it.k==='prop'&&it.p.seat){this.stand()}else if(it)this.use(it);else this.stand()}this.tick();return}
   let mx=(held.right?1:0)-(held.left?1:0),my=(held.down?1:0)-(held.up?1:0);
   if(mx||my){this.path=null;this.goal=null;p.dir=Math.abs(mx)>=Math.abs(my)&&mx?(mx<0?'l':'r'):(my<0?'u':'d')}
   else if(this.path){if(!this.path.length){this.arrive()}else{const [tx,ty]=this.path[0];const dx=tx-p.x,dy=ty-p.y,dd=Math.hypot(dx,dy);if(dd<2){this.path.shift();if(!this.path.length)this.arrive()}else{mx=dx/dd;my=dy/dd;p.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'l':'r'):(dy<0?'u':'d')}}}
   const dt=DT||1;let sp=1.25;if(M.speedMul)sp*=M.speedMul(this);const cl=M.props.find(q=>q.clutter&&(!q.show||q.show())&&!(q.gone&&q.gone())&&p.x>q.x-2&&p.x<q.x+q.w+2&&p.y>q.y&&p.y<q.y+q.d+4);if(cl){sp*=cl.clutter;if((mx||my)&&T%20===0){sfx('step');TD.parts.push({k:'dust',x:p.x+rnd(-4,4),y:p.y-2,vx:rnd(-.2,.2),vy:-.2,t:0,m:40})}if(cl.onWade&&!this.rv['wade'+cl.id]){this.rv['wade'+cl.id]=1;cl.onWade(this)}}
   let tx=0,ty=0;if(mx||my){const l=Math.hypot(mx,my);tx=mx/l*sp;ty=my/l*sp}const k=Math.min(1,(tx||ty?.35:.5)*dt);p.vx+=(tx-p.vx)*k;p.vy+=(ty-p.vy)*k;if(!tx&&!ty&&Math.hypot(p.vx,p.vy)<.05){p.vx=0;p.vy=0}
   const ox=p.x,oy=p.y;if(p.vx){const nx=p.x+p.vx*dt;if(!tdBlocked(M,nx,p.y))p.x=nx;else{let ok=false;if(!my)for(const o of [1,2,3,4,5,6]){for(const s of [-1,1]){if(!tdBlocked(M,nx,p.y+s*o)&&!tdBlocked(M,p.x,p.y+s*o*.5)){p.y+=s*Math.min(.9,o)*dt;ok=true;break}}if(ok)break}if(!ok){this.bumpDoor(Math.sign(p.vx),0);this.tryPush(Math.sign(p.vx),0);p.vx=0}}}
   if(p.vy){const ny=p.y+p.vy*dt;if(!tdBlocked(M,p.x,ny))p.y=ny;else{let ok=false;if(!mx)for(const o of [1,2,3,4,5,6]){for(const s of [-1,1]){if(!tdBlocked(M,p.x+s*o,ny)&&!tdBlocked(M,p.x+s*o*.5,p.y)){p.x+=s*Math.min(.9,o)*dt;ok=true;break}}if(ok)break}if(!ok){this.bumpDoor(0,Math.sign(p.vy));this.tryPush(0,Math.sign(p.vy));p.vy=0}}}
   const moved=Math.hypot(p.x-ox,p.y-oy);p.fr+=moved;if(moved>.3&&(this.stepT=(this.stepT||0)+moved)>14){this.stepT=0;sfx('step')}
   if(this.path&&moved<.05&&(mx||my)){this.stuck=(this.stuck||0)+1;if(this.stuck>40){this.path=null;this.goal=null;this.stuck=0}}else this.stuck=0;
   const z=tdZoneAt(M,p.x,p.y-2);if(z&&z!==this.zone)this.zoneIn(z);
   for(const e of M.props){if(!e.exit||(e.show&&!e.show()))continue;const r=tdPropRect(e);const inside=p.x>r[0]&&p.x<r[0]+r[2]&&p.y>r[1]&&p.y<r[1]+r[3];if(inside&&!this.exitLock){this.exitLock=1;this.path=null;p.vx=p.vy=0;e.exit(this);return}if(!inside&&this.exitLock===1&&!M.props.some(q=>q.exit&&p.x>q.x&&p.x<q.x+q.w&&p.y>q.y&&p.y<q.y+q.d))this.exitLock=0}
   this.tick();
   if(hit('act')){if(this.cur)this.use(this.cur)}
   if(hit('back'))this.leaveMenu()},
  tryPush(dx,dy){const px=p.x+dx*8,py=p.y-2+dy*6;const q=M.props.find(q=>q.push&&px>q.x-1&&px<q.x+q.w+1&&py>q.y-2&&py<q.y+q.d+2);if(!q){this.pushT=0;return}if(dx&&dy)return;
   if((this.pushT=(this.pushT||0)+1)<12)return;this.pushT=0;const nx=q.x+dx*16,ny=q.y+dy*16;
   for(const [cx,cy] of [[nx+1,ny+1],[nx+q.w-2,ny+1],[nx+1,ny+q.d-2],[nx+q.w-2,ny+q.d-2]])if(tdSolidTile(M,Math.floor(cx/TS),Math.floor(cy/TS))){tdThink(tdWho()==='v'?'It will not go any further.':'nope. stuck. wall.',90);return}
   for(const o of M.props){if(o===q||!o.solid||(o.show&&!o.show()))continue;if(nx<o.x+o.w&&nx+q.w>o.x&&ny<o.y+o.d&&ny+q.d>o.y){tdThink(tdWho()==='v'?'Something behind it.':'something’s in the way.',90);return}}
   q.x=nx;q.y=ny;sfx('snap');for(let k=0;k<6;k++)TD.parts.push({k:'dust',x:q.x+rnd(0,q.w),y:q.y+q.d,vx:rnd(-.3,.3),vy:rnd(-.3,0),t:0,m:40});if(!this.pushedOnce){this.pushedOnce=1;tdThink(tdWho()==='v'?'Heavy. Paper, mostly. Paper is heavy.':'*shove* ...heavy. what’s IN these.',120)}},
  bumpDoor(dx,dy){const i=Math.floor((p.x+dx*7)/TS),j=Math.floor((p.y-2+dy*6)/TS);const d=M.doors[i+','+j];if(!d||tdDoorOpen(M,d))return;this.bump=(this.bump||0)+1;if(this.bump>7){this.bump=0;if(this.toggleDoor(d,true))TD.parts.push({k:'dust',x:i*TS+8,y:j*TS+12,vx:0,vy:-.2,t:0,m:30})}},
  leaveMenu(){const L=M.leave?M.leave(this):[{t:'Head out',fn:()=>hub()}];ask(tdN(),M.leaveText?M.leaveText():'Head out?',L.concat([{t:'Stay',fn:()=>{}}]))},
  tick(){if(this.M.tick)this.M.tick(this);this.syncNpcs();this.updDogs();this.inter=tdCollect(this);this.cur=(!dlg&&!ctrl)?tdPick(this):null;if(this.cur!==this.lastCur){if(this.cur)sfx('blip');this.lastCur=this.cur}
   if(T%15===0)tdReact(this)},
  syncNpcs(){const seen={};const L=[];for(const room of tdRoomsOf(M)){const R=ROOMS[room];if(!R.npcs)continue;let arr=[];try{arr=R.npcs()||[]}catch(e){}
    arr.forEach((n,i)=>{const lab=n.label||'';const key=room+'|'+lab+'|'+i;seen[key]=1;let st=this.ns[key];const kk=/(^| )V$|K9/.test(lab)?'v':/Misaki/.test(lab)?'m':/Angel/.test(lab)?'a':/Ronin/.test(lab)?'r':'x';
     if(!st){let q=tdToMap(room,n.at[0],n.at[1]-4);if(!q)return;if(q.map!==M.id)return;const ov=(M.npcAt||{})[room+':'+kk];if(ov){q={x:ov[0]*TS,y:ov[1]*TS}}const f=['v','m','a','r'].includes(kk)?tdFreeReach(M,q.x,q.y,tdZoneAt(M,q.x,q.y)):tdFree(M,q.x,q.y);st=this.ns[key]={x:f[0],y:f[1],ax:f[0],ay:f[1],dir:'d',t:ri(60,200),tx:null,ty:null,k:kk,fr:0}}
     st.label=lab;st.act=n.act;st.draw=n.draw;st.at=n.at;L.push(st)})}
   for(const k in this.ns)if(!seen[k])delete this.ns[k];
   L.forEach(n=>{const d=Math.hypot(p.x-n.x,p.y-n.y);if(d<46&&!n.tx){const dx=p.x-n.x,dy=p.y-n.y;n.dir=Math.abs(dx)>Math.abs(dy)*1.3?(dx<0?'l':'r'):(dy<0?'u':'d');return}
    if(!['v','m','a','r'].includes(n.k))return;if(--n.t<=0){n.t=ri(140,360);if(Math.random()<.55){const a=rnd(0,6.28),r=rnd(6,22);const tx=n.ax+Math.cos(a)*r,ty=n.ay+Math.sin(a)*r*.6;if(!tdBlocked(M,tx,ty)){n.tx=tx;n.ty=ty}}else n.dir=pk(['d','d','l','r','u'])}
    if(n.tx!==null&&n.tx!==undefined){const dx=n.tx-n.x,dy=n.ty-n.y,dd=Math.hypot(dx,dy);if(dd<1){n.tx=null}else{const s=.55*(DT||1);const nx=n.x+dx/dd*s,ny=n.y+dy/dd*s;if(tdBlocked(M,nx,ny)){n.tx=null}else{n.x=nx;n.y=ny;n.fr+=s;n.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'l':'r'):(dy<0?'u':'d')}}}});
   this.npcList=L},
  updDogs(){this.dogs.forEach(d=>{if(d.sleep)return;const z=d.z;if(--d.t<=0){d.t=ri(50,200);const near=Math.hypot(p.x-d.x,p.y-d.y)<70;if(near&&Math.random()<.45){const a=Math.atan2(p.y-d.y,p.x-d.x);d.vx=Math.cos(a)*.7;d.vy=Math.sin(a)*.5}else if(Math.random()<.35){d.vx=0;d.vy=0}else{d.vx=rnd(-.6,.6);d.vy=rnd(-.35,.35)}}
   if(Math.hypot(p.x-d.x,p.y-d.y)<14){d.vx*=.8;d.vy*=.8}const nx=d.x+d.vx*(DT||1),ny=d.y+d.vy*(DT||1);if(!tdBlocked(M,nx,ny,true)&&nx>z.px[0]+6&&nx<z.px[0]+z.px[2]-6&&ny>z.px[1]+8&&ny<z.px[1]+z.px[3]-2){d.x=nx;d.y=ny}else{d.vx*=-1;d.vy*=-1}if(Math.abs(d.vx)>.1)d.f=d.vx<0})},
  draw(){const M=this.M;if(!this.cam)return;RHINT.id=S.room;RHINT.f=T;const cam=this.cam;const red=META.reduceMotion;
   const tx=clamp(p.x-W/2+(p.dir==='r'?14:p.dir==='l'?-14:0),Math.min(0,M.pw-W),Math.max(0,M.pw-W)),ty=clamp(p.y-H/2-14+(p.dir==='d'?10:p.dir==='u'?-10:0),Math.min(-14,M.ph-H),Math.max(-14,M.ph-H));
   const k=red?.3:.08;cam.x+=(tx-cam.x)*k;cam.y+=(ty-cam.y)*k;if(M.pw<=W)cam.x=(M.pw-W)/2;if(M.ph+14<=H)cam.y=(M.ph-H)/2-7;cam.x=Math.round(cam.x*SC)/SC;cam.y=Math.round(cam.y*SC)/SC;
   rect(0,0,W,H,M.void||'#07060b');if(M.backdrop)M.backdrop(cam);
   c.save();c.translate(-cam.x,-cam.y);TD.drawing=true;
   try{if(!M.static)M.static=tdBake(M);if(M.static)c.drawImage(M.static,0,0);
    const i0=Math.max(0,Math.floor(cam.x/TS)),i1=Math.min(M.W-1,Math.ceil((cam.x+W)/TS)),j0=Math.max(0,Math.floor(cam.y/TS)),j1=Math.min(M.H-1,Math.ceil((cam.y+H)/TS));
    for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++)if(M.g[j][i]==='w'){const lower=TDWALK.includes(tdCh(M,i,j+1)),upper=!lower&&tdCh(M,i,j+1)==='w'&&TDWALK.includes(tdCh(M,i,j+2));if(lower||upper)tdWindowGlass(M,i,j,upper)}
    if(M.under)M.under(this);
    const vis=q=>!(q.show&&!q.show())&&!(q.gone&&q.gone());
    M.props.forEach(q=>{if((q.wall||q.flat)&&q.draw&&vis(q))q.draw(q.x,q.y,q,this)});
    const E=[];M.props.forEach(q=>{if(!q.wall&&!q.flat&&q.draw&&vis(q))E.push({y:q.y+q.d+(q.zb||0),f:()=>q.draw(q.x,q.y,q,this)})});
    for(const kk in M.doors){const d=M.doors[kk];if(d.hidden&&d.hidden())continue;E.push({y:d.j*TS+(d.face?TS-1:TS*.5),f:()=>tdDrawDoor(M,d)})}
    const who=tdWho();const moving=Math.hypot(p.vx,p.vy)>.15;
    E.push({y:p.y,f:()=>{tdActor(who,p.x,p.y,p.dir,moving,p.fr,{sit:!!p.sit});if(p.hold&&TDHOLD[p.hold])TDHOLD[p.hold](p.x+(p.dir==='l'?-7:7),p.y-12)}});
    this.npcList.forEach(n=>E.push({y:n.y,f:()=>{if(n.k==='v'||n.k==='m'){tdActor(n.k,n.x,n.y,n.dir,n.tx!=null,n.fr,{})}else if((n.k==='a'&&typeof ANG!=='undefined')||(n.k==='r'&&typeof RON!=='undefined')){shadowAt(n.x,n.y-1,7);const A=n.k==='a'?ANG:RON;tdPx(n.dir==='u'?tdBack(A):A,n.x,n.y-((n.tx!=null&&(n.fr>>3)%2)?1:0),n.dir==='l',1)}else if(n.draw){shadowAt(n.x,n.y-1,7);c.save();const kk=.8;c.translate(n.x-n.at[0]*kk,n.y-(n.at[1]-9)*kk);c.scale(kk,kk);try{n.draw()}catch(e){}c.restore()}}}));
    this.dogs.forEach(d=>E.push({y:d.y,f:()=>{tdDog(d.x,d.y,d.col,d.f,Math.hypot(d.vx,d.vy)>.1,d.sleep);if(d.sleep&&(T>>5)%2)txt('z',d.x+6,d.y-10-((T>>3)%4),'rgba(236,228,218,.7)',8)}}));
    tdFollower(this,E);
    E.sort((a,b)=>a.y-b.y).forEach(e=>{try{e.f()}catch(er){console.error(er)}});
    if(M.over)M.over(this);
    if(this.tapFx&&this.tapFx.t>0){this.tapFx.t--;c.strokeStyle=`rgba(255,240,210,${this.tapFx.t/20})`;c.beginPath();c.ellipse(this.tapFx.x,this.tapFx.y,7-this.tapFx.t/4,3-this.tapFx.t/9,0,0,7);c.stroke()}
    if(this.path&&this.path.length){const q=this.path[this.path.length-1];c.fillStyle=`rgba(255,236,200,${.3+.2*Math.sin(T/6)})`;c.fillRect(q[0]-1,q[1]-1,2,2)}
   }finally{TD.drawing=false;c.restore()}
   const z=this.zone;const amb=tdAmbient(M,z);const lights=tdLights(M,cam);tdSpawnParts(M,cam,z,lights);
   c.save();c.translate(-cam.x,-cam.y);tdDrawParts(lights);c.restore();
   tdLight(cam,amb,lights,p);tdBeams(M,cam);tdWeatherFX(z&&z.out?z:(M.out?{out:1}:null),cam);
   if(M.post)try{M.post(this,cam)}catch(e){console.error(e)}
   if(M.fg)tdFG(M,cam);
   TD.cx=cam.x;TD.cy=cam.y;let TG=null;
   c.save();c.translate(-cam.x,-cam.y);TD.drawing=true;try{if(typeof drawEmote==='function')drawEmote();tdBarks(this);
    if(this.cur&&!dlg&&!ctrl&&!this.tr){const it=this.cur;const cx=it.r[0]+it.r[2]/2;let ty=it.top;if(it.k==='prop'&&it.p.tagY!==undefined)ty=it.p.y+it.p.tagY;const a=(Math.sin(T/8)+1)/2;
     c.strokeStyle=`rgba(255,236,200,${.18+.25*a})`;c.lineWidth=.5;c.strokeRect(Math.round(it.r[0])+.5,Math.round(it.r[1])+.5,Math.round(it.r[2]),Math.round(it.r[3]));
     TG=[(p.sit&&it.p&&it.p.seat?'Stand up':it.label),cx-cam.x,Math.max(24,ty-4-cam.y)]}}finally{TD.drawing=false;c.restore()}
   if(TG)tag(((typeof isTouch==='function'&&isTouch())?'':'E · ')+TG[0],TG[1],TG[2]);
   if(typeof vignette==='function')vignette();
   tdCaption();
   const nm=(z&&z.name)||(ROOMS[S.room]?ROOMS[S.room].name():'');_rhdr(nm,goalText(),'Esc · '+(M.backLabel||'leave'));
   if(this.fade>0){c.fillStyle=`rgba(5,4,10,${this.fade/16})`;c.fillRect(0,0,W,H);this.fade--}
   if(this.tr){c.fillStyle=`rgba(5,4,10,${Math.min(1,this.tr.t/12)})`;c.fillRect(0,0,W,H)}}};
 return sc}
function tdLight(cam,amb,lights,p){if(!TD.lm){TD.lm=document.createElement('canvas');TD.lm.width=W;TD.lm.height=H}const g=TD.lm.getContext('2d');if(!g)return;
 g.globalCompositeOperation='source-over';g.globalAlpha=1;g.clearRect(0,0,W,H);g.fillStyle=`rgba(${amb.col},${amb.d})`;g.fillRect(0,0,W,H);g.globalCompositeOperation='destination-out';
 lights.forEach(l=>{g.globalAlpha=Math.min(1,l.i);g.drawImage(tdGrad(l.r,'255,255,255'),l.x-cam.x-l.r,l.y-cam.y-l.r,l.r*2,l.r*2)});
 g.globalAlpha=.28;g.drawImage(tdGrad(30,'255,255,255'),p.x-cam.x-30,p.y-cam.y-46,60,60);g.globalAlpha=1;g.globalCompositeOperation='source-over';
 c.save();c.imageSmoothingEnabled=true;c.drawImage(TD.lm,0,0,W,H);c.globalCompositeOperation='lighter';
 lights.forEach(l=>{c.globalAlpha=Math.min(.5,.22*l.i*(amb.d+.2));const r=l.r*.75;c.drawImage(tdGrad(r,l.col),l.x-cam.x-r,l.y-cam.y-r,r*2,r*2)});c.restore()}
function tdBeams(M,cam){if(tdNight()||META.reduceMotion&&false)return;const wx=weather();const str=(S.slot===0?.13:.09)*(wx==='clear'?1:wx==='snow'?.7:.4);if(str<=0)return;
 c.save();c.translate(-cam.x,-cam.y);c.globalCompositeOperation='lighter';const sk=M.beamSkew===undefined?14:M.beamSkew,L=M.beamLen||44;
 for(let j=0;j<M.H;j++)for(let i=0;i<M.W;i++){if(M.g[j][i]!=='w'||!TDWALK.includes(tdCh(M,i,j+1)))continue;const x=i*TS,y=(j+1)*TS;if(x<cam.x-60||x>cam.x+W+20||y<cam.y-20||y>cam.y+H+60)continue;
  const g=c.createLinearGradient(0,y,0,y+L);g.addColorStop(0,`rgba(255,240,205,${str})`);g.addColorStop(1,'rgba(255,240,205,0)');c.fillStyle=g;c.beginPath();c.moveTo(x+2,y);c.lineTo(x+14,y);c.lineTo(x+14+sk,y+L);c.lineTo(x+2+sk,y+L);c.closePath();c.fill();
  if(wx==='rain'){c.save();c.clip();c.globalCompositeOperation='source-over';c.fillStyle='rgba(0,0,20,.10)';for(let k=0;k<5;k++){const yy=(T*.5+k*11+i*7)%(L+10)-5;c.fillRect(x+3+((k*5+i*3)%11)+yy*sk/L,y+yy,1,5)}c.restore()}}
 c.restore()}
const gr=(g,x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h)};
function tdFG(M,cam){const cx=cam.x+W/2,cy=cam.y+H/2;const D=3;if(!TD.fgc){TD.fgc=document.createElement('canvas');TD.fgc.width=Math.ceil(W/D);TD.fgc.height=Math.ceil(H/D)}const g=TD.fgc.getContext('2d');if(!g)return;g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,TD.fgc.width,TD.fgc.height);g.setTransform(1/D,0,0,1/D,0,0);
 let any=false;M.fg.forEach(f=>{if(f.show&&!f.show())return;const par=f.par||.35;const sx=(f.x-cx)*(1+par)+W/2,sy=(f.y-cy)*(1+par)+H/2;if(sx<-80||sx>W+80||sy<-80||sy>H+80)return;g.save();g.globalAlpha=f.a||.92;try{f.draw(sx,sy,g)}finally{g.restore()}any=true});
 if(!any)return;c.save();c.imageSmoothingEnabled=true;c.drawImage(TD.fgc,0,0,W,H);c.restore()}
const TDHOLD={can:(x,y)=>{rect(x-3,y-2,6,5,'#5a8a9a');rect(x+3,y-1,3,1,'#5a8a9a');rect(x-2,y-4,4,2,'#3a6a7a')},mug:(x,y)=>{rect(x-2,y-2,4,4,'#f4f0ea');rect(x+2,y-1,1,2,'#f4f0ea')},torch:(x,y)=>{rect(x-1,y-2,5,2,'#2a2a30');rect(x+4,y-2,1,2,'#fff2c0')}};
function tdDrawDoor(M,d){const x=d.i*TS,y=d.j*TS;const op=tdDoorOpen(M,d);const st=d.style||{};const col=st.col||'#6e4a32',dk=st.dk||'#4e3322';
 if(d.draw)return d.draw(x,y,op);
 if(d.face){if(op){rect(x+1,y-12,14,28,'#0e0b12');c.fillStyle='rgba(255,230,190,.05)';c.fillRect(x+2,y+10,12,6);rect(x+13,y-12,3,28,col);rect(x+13,y-12,1,28,dk)}else{rect(x+1,y-12,14,28,col);rect(x+2,y-11,12,12,dk);rect(x+2,y+3,12,11,dk);rect(x+3,y-10,10,10,col);rect(x+3,y+4,10,9,col);rect(x+11,y+2,2,2,st.knob||'#d8c070');if(d.sign)rect(x+5,y-9,6,3,typeof d.sign==='function'?d.sign():d.sign)}
  rect(x,y-14,16,2,st.frame||'#2a1e16');rect(x,y-14,1,30,st.frame||'#2a1e16');rect(x+15,y-14,1,30,st.frame||'#2a1e16')}
 else if(d.ori==='h'){if(op){rect(x+1,y+1,3,14,dk);rect(x+1,y+1,1,14,col)}else{rect(x,y+5,16,6,col);rect(x,y+5,16,1,'#a88a6a');rect(x,y+10,16,1,dk);rect(x+12,y+7,2,2,'#d8c070')}}
 else{if(op){rect(x+1,y,14,3,col);rect(x+1,y+2,14,1,dk)}else{rect(x+5,y-10,6,26,col);rect(x+5,y-10,6,2,'#a88a6a');rect(x+10,y-10,1,26,dk);rect(x+7,y+4,2,2,'#d8c070')}}}
/* ---------- companion barks & reactions ---------- */
TD.bark=null;
function tdThink(s,t){TD.bark={self:1,s,t:t||220,m:t||220}}
function tdCaption(){const B=TD.bark;if(!B||!B.self||B.t<=0||dlg||ctrl)return;const a=Math.min(1,B.t/20,(B.m-B.t)/12);const L=tdWrap(B.s,250);c.font='9px VT323, monospace';const h=L.length*10+6,y=H-14-h;
 c.globalAlpha=a;c.fillStyle='rgba(12,9,18,.78)';c.fillRect(30,y,W-60,h);c.fillStyle='rgba(200,180,230,.45)';c.fillRect(30,y,2,h);
 L.forEach((l,i)=>{c.fillStyle='rgba(228,218,244,.98)';c.font='italic 9px VT323, monospace';c.fillText(l,38,y+10+i*10)});c.globalAlpha=1}
function tdBarks(sc){const B=TD.bark;if(B&&B.t>0&&!dlg&&!ctrl){B.t--;if(B.self){}else{const n=sc.npcList.find(n=>n.k===B.k);if(n)tdBubble(B.s,n.x,n.y-38);else B.t=0}return}
 if(dlg||ctrl)return;sc.npcList.forEach((n,i)=>{if(!BARK[n.k])return;const ph=(T+i*260)%720;if(ph>170)return;if(Math.hypot(n.x-sc.p.x,n.y-sc.p.y)>150)return;let L;try{L=BARK[n.k]()}catch(e){return}if(!L||!L.length)return;tdBubble(L[Math.floor((T+i*260)/720)%L.length],n.x,n.y-38)})}
function tdWrap(s,max){c.font='9px VT323, monospace';const out=[];let line='';String(s).split(' ').forEach(w=>{const t=line?line+' '+w:w;if(c.measureText(t).width>max&&line){out.push(line);line=w}else line=t});if(line)out.push(line);return out}
function tdBubbleBox(s,x,y,bg,fg,edge){const L=tdWrap(s,150);c.font='9px VT323, monospace';const w=Math.max(...L.map(l=>c.measureText(l).width))+10,h=L.length*9+4;const bx=clamp(x-w/2,(TD.cx||0)+2,(TD.cx||0)+W-w-2),by=Math.max((TD.cy||0)+16,y-h+3);
 rect(bx,by-1,w,h,bg);if(edge)rect(bx,by+h-1,w,1,edge);rect(clamp(x-2,bx+2,bx+w-6),by+h-1,4,3,bg);c.fillStyle=fg;L.forEach((l,i)=>c.fillText(l,bx+5,by+7+i*9))}
function tdBubble(s,x,y){tdBubbleBox(s,x,y,'rgba(244,240,234,.95)','#141014')}
function tdThought(s,x,y){tdBubbleBox(s,x,y,'rgba(20,16,28,.92)','rgba(225,215,240,.97)','rgba(200,180,230,.5)')}
const TDREACT=[];
function tdReact(sc){if(dlg||ctrl||(TD.bark&&TD.bark.t>0))return;const t=tdS();const p=sc.p;
 for(const r of TDREACT){if(r.map&&r.map!==sc.M.id)continue;if(r.zone&&(!sc.zone||sc.zone.id!==r.zone))continue;const key='r_'+r.id;if(r.once!==false&&(r.visit?sc.rv[key]:t.f[key]))continue;
  if(r.near){const q=typeof r.near==='string'?sc.M.props.find(x=>x.id===r.near||x.key===r.near):null;const [nx,ny,rr]=q?[q.x+q.w/2,q.y+q.d/2,r.r||26]:r.near;if(Math.hypot(p.x-nx,p.y-ny)>rr)continue}
  let n=null;if(r.by){n=sc.npcList.find(x=>x.k===r.by);if(!n||Math.hypot(n.x-p.x,n.y-p.y)>(r.far||(sc.M.id==='base'?420:260)))continue}
  try{if(r.when&&!r.when(sc))continue}catch(e){continue}
  const s=typeof r.line==='function'?r.line(sc):r.line;if(!s)continue;if(r.visit)sc.rv[key]=1;else t.f[key]=1;save();
  if(r.say){tdSay(typeof s==='string'?[[r.by==='v'?'K9':r.by==='m'?'hitmeuppp':'',s]]:s)}else if(r.by){TD.bark={k:r.by,s,t:r.t||240};if(n){const dx=p.x-n.x,dy=p.y-n.y;n.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'l':'r'):(dy<0?'u':'d')}}else tdThink(s,r.t);if(r.after)r.after(sc);return}}
/* ---------- dog on a walk follows you through doors ---------- */
function tdFollower(sc,E){if(!S.done||!S.done.walk)return;const F=sc.fol||(sc.fol={trail:[],x:sc.p.x-14,y:sc.p.y,f:false});const p=sc.p;const last=F.trail[F.trail.length-1];if(!last||Math.hypot(last[0]-p.x,last[1]-p.y)>3)F.trail.push([p.x,p.y]);if(F.trail.length>60)F.trail.shift();
 const tg=F.trail.length>9?F.trail[F.trail.length-9]:null;let mv=false;if(tg){const dx=tg[0]-F.x,dy=tg[1]-F.y,d=Math.hypot(dx,dy);if(d>2){const s=Math.min(1.6,d*.12);F.x+=dx/d*s;F.y+=dy/d*s;mv=true;F.f=dx<0}}
 const cols={Biscuit:'#c98a3a',Sergeant:'#3a3030',Mochi:'#f4f0ea',Pancake:'#9a6a40'};E.push({y:F.y,f:()=>tdDog(F.x,F.y,cols[S.done.walk]||'#d8b878',F.f,mv,false)})}
/* ---------- hooking into the old room engine ---------- */
let TDRS_LAST=null;
const _tdGo=go;go=function(s){if(scene&&scene.td&&scene!==s&&scene.leaveTD)scene.leaveTD();_tdGo(s)};
const _tdHub=hub;hub=function(){TD.resume=null;return _tdHub.apply(this,arguments)};
const _tdTitle=title;title=function(){TD.resume=null;return _tdTitle.apply(this,arguments)};
function tdGo(mapId,tx,ty,dir,opt){go(tdScene(mapId,tx*TS+8,ty*TS+12,dir,opt||{}))}
const _tdRS=roomScene;roomScene=function(id,sp){const e=TD.room[id];if(!e||!tdOn()||!S)return _tdRS(id,sp);
 const M=TD.maps[e.map];const R=TD.resume;const fromTD=scene&&scene.td;
 if(fromTD&&scene.M&&scene.M.id===e.map&&S.room===id){const lp=scene.pos();if(Math.abs(lp[0]-sp[0])<5&&Math.abs(lp[1]-sp[1])<5)return tdScene(e.map,scene.p.x,scene.p.y,scene.p.dir,{noFade:true})}
 if(R&&R.room===id&&R.map===e.map){return tdScene(e.map,R.x,R.y,R.dir,{noFade:false})}
 const key=sp[0]+','+sp[1];const z=e.z;if(z.at&&z.at[key]){const a=z.at[key];return tdScene(e.map,a[0]*TS+8,a[1]*TS+12,a[2]||'d',{banner:1})}
 if(!fromTD&&z.arrive){const a=typeof z.arrive==='function'?z.arrive():z.arrive;return tdScene(e.map,a[0]*TS+8,a[1]*TS+12,a[2]||'u',{banner:1})}
 const q=tdToMap(id,sp[0],sp[1]);const f=tdFreeReach(M,q.x,q.y,z);return tdScene(e.map,f[0],f[1],'d',{banner:1})};
