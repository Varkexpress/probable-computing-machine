/* the morning events that existed before any of the add-on modules; the picker favours them */
const EV_ORIG=new Set((typeof EVENTS!=='undefined'?EVENTS:[]).map(e=>e.id));
/* ===================== TOP-DOWN HOUSE: the trailer and V's base as walkable 3/4-view interiors =====================
   Rooms in TD.room are drawn as tile maps you physically walk through (doors, stairs, clutter, lamps, drawers, seats).
   Every legacy spot in ROOMS[id].spots still works: a prop with `legacy:'Label'` takes it over, anything unclaimed is
   placed automatically by mapping its side-view coordinates into the zone. scene.pos() keeps answering in legacy
   coordinates so toRoom(S.room,S.roomPos) round-trips land you where you were standing. META.classicRooms = old view. */
const TS=16;
const TD={maps:{},room:{},resume:null,drawing:false,cache:new Map(),parts:[],banner:null,react:[],lastSeat:null};
function tdS(){if(!S.td)S.td={};const t=S.td;['seen','l','door','dr','f','mv','cnt'].forEach(k=>{if(!t[k])t[k]={}});return t}
const tdSeen=k=>!!(S&&S.td&&S.td.seen&&S.td.seen[k]);
function tdMark(k){const t=tdS();const first=!t.seen[k];t.seen[k]=(t.seen[k]||0)+1;save();return first}
const tdWho=()=>(S&&(S.visitAs==='v'||(S.pov==='v'&&!S.visitAs)))?'v':'m';
const tdN=()=>tdWho()==='v'?'K9':'hitmeuppp';
const tdNight=()=>S&&S.slot>=2;
const tdOn=()=>!(typeof META!=='undefined'&&META.classicRooms);
const tdHash=(a,b)=>{let h=(a*374761393+b*668265263)^0x5bd1e995;h=Math.imul(h^h>>>13,1274126177);return((h^h>>>16)>>>0)/4294967296};
function tdSay(lines,cb){say(lines.filter(Boolean).map(l=>typeof l==='string'?['',l]:l),cb)}
/* ---------- map registration ---------- */
const TDWALK='.,_D=gGamxo';
function tdMap(id,def){def.id=id;const rows=def.rows;def.H=rows.length;def.W=Math.max(...rows.map(r=>r.length));def.g=rows.map(r=>r.padEnd(def.W,' '));def.pw=def.W*TS;def.ph=def.H*TS;
 def.zl=[];for(const k in def.zones){const z=def.zones[k];z.id=k;z.room=z.room||k;z.px=[z.r[0]*TS,z.r[1]*TS,z.r[2]*TS,z.r[3]*TS];def.zl.push(z);if(ROOMS[z.room]&&(!TD.room[z.room]||z.main))TD.room[z.room]={map:id,z}}
 def.doors={};for(let j=0;j<def.H;j++)for(let i=0;i<def.W;i++)if(def.g[j][i]==='D'){const o=(def.doorOpt||{})[i+','+j]||{};const sol=(x,y)=>'#w '.includes(tdCh(def,x,y));
  const ori=sol(i-1,j)&&sol(i+1,j)?'h':'v';def.doors[i+','+j]=Object.assign({i,j,ori,id:id+':'+i+','+j,open:o.open,face:ori==='h'&&!sol(i,j+1)},o)}
 def.props=(def.props||[]);def.props.forEach((p,n)=>{p.id=p.id||id+'#'+n;p.map=def;if(p.solid===undefined)p.solid=!p.flat&&!p.wall&&!p.exit;p.w=p.w||TS;p.d=p.d===undefined?TS:p.d});
 TD.maps[id]=def;def.static=null;return def}
const tdCh=(M,i,j)=>(j<0||i<0||j>=M.H||i>=M.W)?' ':M.g[j][i];
function tdZoneNear(M,x,y){for(const [dx,dy] of [[0,0],[0,16],[0,-16],[16,0],[-16,0],[0,32],[0,-32]]){const z=tdZoneAt(M,x+dx,y+dy);if(z)return z}return null}
function tdZoneAt(M,x,y){for(const z of M.zl){const r=z.px;if(x>=r[0]&&x<r[0]+r[2]&&y>=r[1]&&y<r[1]+r[3])return z}return null}
function tdDoorOpen(M,d){const t=tdS();const k=d.id;if(t.door[k]===undefined)return d.open===undefined?!d.closed:!!d.open;return !!t.door[k]}
function tdSolidTile(M,i,j){const ch=tdCh(M,i,j);if(!TDWALK.includes(ch))return true;if(ch==='D'){const d=M.doors[i+','+j];return !tdDoorOpen(M,d)}return false}
function tdPropRect(p){return[p.x,p.y,p.w,p.d]}
function tdBlocked(M,x,y,ignoreProps){const hw=4.5,h0=-4,h1=0;const pts=[[x-hw,y+h0],[x+hw,y+h0],[x-hw,y+h1],[x+hw,y+h1],[x,y+h0],[x,y+h1]];
 for(const [px,py] of pts){if(tdSolidTile(M,Math.floor(px/TS),Math.floor(py/TS)))return true}
 if(!ignoreProps)for(const p of M.props){if(!p.solid||(p.show&&!p.show())||p.gone&&p.gone())continue;const r=tdPropRect(p);if(x+hw>r[0]&&x-hw<r[0]+r[2]&&y+h1>r[1]&&y+h0<r[1]+r[3])return true}
 return false}
/* ---------- legacy coordinate mapping ---------- */
function tdToMap(room,lx,ly){const e=TD.room[room];const R=ROOMS[room];if(!e||!R)return null;const z=e.z,w=R.walk;const fx=clamp((lx-w[0])/Math.max(1,w[1]-w[0]),0,1),fy=clamp((ly-w[2])/Math.max(1,w[3]-w[2]),0,1);
 const r=z.walkr||z.r;return{map:e.map,x:(r[0]+.6+fx*(r[2]-1.2))*TS,y:(r[1]+.7+fy*(r[3]-1.2))*TS}}
function tdToLegacy(room,x,y){const e=TD.room[room];const R=ROOMS[room];if(!e||!R)return[160,150];const z=e.z,w=R.walk,r=z.walkr||z.r;
 const fx=clamp((x/TS-r[0]-.6)/Math.max(.1,r[2]-1.2),0,1),fy=clamp((y/TS-r[1]-.7)/Math.max(.1,r[3]-1.2),0,1);return[Math.round(w[0]+fx*(w[1]-w[0])),Math.round(w[2]+fy*(w[3]-w[2]))]}
function tdFree(M,x,y){if(!tdBlocked(M,x,y))return[x,y];for(let r=4;r<80;r+=4)for(let a=0;a<16;a++){const nx=x+Math.cos(a/16*6.283)*r,ny=y+Math.sin(a/16*6.283)*r;if(!tdBlocked(M,nx,ny))return[nx,ny]}return[x,y]}
/* ---------- sprites at 1px ---------- */
const TDSPR=new WeakMap();
const TDSH=new WeakSet();const TDSHC=new Map();/* character sprites get soft volume: shadow side darker, lit side a touch brighter (light from upper left of the facing) */
function tdShadeCol(col,f){const k=col+'|'+f;let o=TDSHC.get(k);if(o)return o;const m=/^#([0-9a-f]{6})$/i.exec(col);if(!m){TDSHC.set(k,col);return col}const v=parseInt(m[1],16);const ch=x=>Math.max(0,Math.min(255,Math.round(f<1?x*f:x+(255-x)*(f-1))));
 o='#'+[v>>16&255,v>>8&255,v&255].map(x=>ch(x).toString(16).padStart(2,'0')).join('');TDSHC.set(k,o);return o}
function tdPx(a,cx,fy,flip,ps=1,pal){const n=a[0].length,h=a.length;const P=pal||a.P||PAL;const sh=(TD.shade||TDSH.has(a))&&!META.fxOff;
 let m=TDSPR.get(a);if(!m){m=new Map();TDSPR.set(a,m)}const key=(flip?1:0)+'|'+ps+'|'+SC+'|'+(sh?'s|':'')+Object.values(P).join(',');let o=m.get(key);
 if(!o){o=document.createElement('canvas');const k=ps*SC;o.width=Math.ceil(n*k);o.height=Math.ceil(h*k);const g=o.getContext('2d');if(g){for(let j=0;j<h;j++){const r=a[j];for(let i=0;i<n;i++){const ch=r[flip?n-1-i:i];if(ch==='.'||ch===undefined)continue;let col=P[ch];if(!col)continue;if(sh){const u=flip?n-1-i:i,dr=flip?-1:1,op=(x,y)=>y>=0&&y<h&&x>=0&&x<n&&a[y][x]&&a[y][x]!=='.';let f=1;if(!op(u+dr,j))f=.78;else if(!op(u+2*dr,j))f=.9;else if(!op(u-dr,j)||!op(u,j-1))f=1.1;if(f!==1)col=tdShadeCol(col,f)}g.fillStyle=col;const x0=Math.round(i*k),y0=Math.round(j*k);g.fillRect(x0,y0,Math.round((i+1)*k)-x0,Math.round((j+1)*k)-y0)}}}if(m.size>24)m.clear();m.set(key,o)}
 const sn=v=>Math.round(v*SC)/SC;c.drawImage(o,sn(cx-n*ps/2),sn(fy-h*ps),o.width/SC,o.height/SC)}
function tdBack(a){if(!a)return a;let b=TD.cache.get(a);if(b)return b;const keep=new Set();for(let j=0;j<4&&j<a.length;j++)for(const ch of a[j])if(ch!=='.')keep.add(ch);
 const cnt={};for(let j=0;j<5;j++)for(const ch of a[j]||'')if(ch!=='.')cnt[ch]=(cnt[ch]||0)+1;const hair=Object.keys(cnt).sort((x,y)=>cnt[y]-cnt[x])[0]||'k';
 const he=Math.round(a.length*.36);b=a.map((r,j)=>j>=he?r:r.split('').map(ch=>ch==='.'||keep.has(ch)?ch:hair).join(''));b.P=a.P;b.S=a.S;TD.cache.set(a,b);return b}
function tdSide(a){if(!a)return a;let b=TD.cache.get('s'+a.length+a[0]+a.P);if(b&&b.src===a)return b;const keep=new Set();for(let j=0;j<4&&j<a.length;j++)for(const ch of a[j])if(ch!=='.')keep.add(ch);
 const cnt={};for(let j=0;j<5;j++)for(const ch of a[j]||'')if(ch!=='.')cnt[ch]=(cnt[ch]||0)+1;const hair=Object.keys(cnt).sort((x,y)=>cnt[y]-cnt[x])[0]||'k';const he=Math.round(a.length*.36),n=a[0].length;
 b=a.map((r,j)=>j>=he?r:r.split('').map((ch,i)=>i<n*.42&&ch!=='.'&&!keep.has(ch)?hair:ch).join(''));b.P=a.P;b.S=a.S;b.src=a;TD.cache.set('s'+a.length+a[0]+a.P,b);return b}
function tdActor(k,x,y,dir,moving,fr,opt={}){const v=k==='v';const base=v?VSP:MIS;const fi=moving?Math.floor(fr/6)%4:0;
 let a=fi===1?(v?VSPW:MISW):fi===3?(v?VSPW2:MISW2):base;if(dir==='u')a=tdBack(a);
 const bob=(fi===1||fi===3)?-1:0;shadowAt(x,y-1,7);
 if(opt.sit){c.save();c.beginPath();c.rect(x-20,y-60,40,60-(opt.sitCut||9));c.clip();tdPx(a,x,y+(opt.sitDrop||7),dir==='l',1);c.restore();return}
 tdPx(a,x,y+bob,dir==='l'||(dir==='d'&&opt.flip),1)}
/* V's hounds: too big, too lean, head carried low, pale eyes, old surgical seams. They do not wag. */
const HND=["..x.............",".xx.............","xxxx............","xxxe............","xxxxxxxxxxxxxx..",".xxxxxxxxxxxxxxx","..xxxsxxxxxxxx.x","..xxxxsxxxxxxx..","..xx.x.....xx.x.","..x..x.....x..x.","..x..x.....x..x.",".xx.xx....xx.xx."];
const HNDW=HND.slice(0,8).concat(["..x.xx....x.xx..",".x..x.....x..x..",".x...x.....x..x.",".xx..xx...xx..xx"]);
const HNDS=["..x.............",".xxx............","xxxexxxxxxxxx...","xxxxxxxxxxxxxxx.",".xxxxsxxxxxxxxxx","..xxxxxxxxxxxxx."];
const HNDP=new Map();const hndPal=col=>{let p=HNDP.get(col);if(!p){p=Object.assign({},PAL,{x:col,e:'#dfe8e2',s:'#6e5052'});HNDP.set(col,p)}return p};
function tdDog(x,y,col,flip,walk,sleep){c.fillStyle='rgba(0,0,0,.34)';c.beginPath();c.ellipse(x,y,12,3,0,0,7);c.fill();const P=hndPal(col);
 if(sleep)tdPx(HNDS,x,y,flip,1.9,P);else tdPx(walk&&(T>>3)%2?HNDW:HND,x,y,flip,1.9,P)}
/* ---------- drawing helpers for furniture (x,y = footprint top-left, w/d = footprint, h = height) ---------- */
function tdBox(x,y,w,d,h,top,front,edge){rect(x,y-h,w,d,top);rect(x,y+d-h,w,h,front);if(edge){rect(x,y-h,w,1,edge)}rect(x,y+d-1,w,1,'rgba(0,0,0,.35)')}
function tdShadowRect(x,y,w,d){c.fillStyle='rgba(0,0,0,.22)';c.fillRect(x+1,y+d-2,w,4)}
function tdLabel(p){const L=p.label;return typeof L==='function'?L():L}
/* ---------- the static layer (floors, wall faces, caps) ---------- */
const TDFLOOR={
 wood:(g,x,y,i,j,h)=>{g.fillStyle=['#5a3e2a','#553a27','#5e432e'][Math.floor(h*3)];g.fillRect(x,y,16,16);g.fillStyle='rgba(0,0,0,.22)';g.fillRect(x,y+((i%2)?5:11),16,1);g.fillRect(x+((j*7+i*3)%16),y,1,16)},
 oak:(g,x,y,i,j,h)=>{g.fillStyle=['#8a6440','#86603c','#8e6844'][Math.floor(h*3)];g.fillRect(x,y,16,16);g.fillStyle='rgba(60,30,10,.25)';g.fillRect(x,y+4,16,1);g.fillRect(x,y+12,16,1);g.fillRect(x+((i*5+j*3)%16),y,1,4);g.fillRect(x+((i*11+j*7)%16),y+5,1,7)},
 lino:(g,x,y,i,j,h)=>{g.fillStyle=(i+j)%2?'#6e6450':'#7c7258';g.fillRect(x,y,16,16);g.fillStyle='rgba(0,0,0,.08)';g.fillRect(x+8,y,8,8);g.fillRect(x,y+8,8,8);if(h<.15){g.fillStyle='rgba(40,20,10,.25)';g.fillRect(x+3+h*40,y+6,4,3)}},
 tile:(g,x,y,i,j,h)=>{g.fillStyle='#c9ccc8';g.fillRect(x,y,16,16);g.fillStyle='#b4b8b4';g.fillRect(x,y+15,16,1);g.fillRect(x+15,y,1,16);g.fillRect(x+7,y,1,16);g.fillRect(x,y+7,16,1)},
 stone:(g,x,y,i,j,h)=>{g.fillStyle=['#3a3640','#36323c','#3e3a44'][Math.floor(h*3)];g.fillRect(x,y,16,16);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(x,y+15,16,1);g.fillRect(x+((j%2)?7:15),y,1,16);g.fillStyle='rgba(255,255,255,.04)';g.fillRect(x+1,y+1,6,1)},
 concrete:(g,x,y,i,j,h)=>{g.fillStyle=['#3c3c42','#38383e','#404046'][Math.floor(h*3)];g.fillRect(x,y,16,16);g.fillStyle='rgba(0,0,0,.12)';for(let k=0;k<3;k++)g.fillRect(x+Math.floor(tdHash(i+k,j)*15),y+Math.floor(tdHash(j+k,i)*15),1,1);if(i%4===0)g.fillRect(x,y,1,16)},
 mat:(g,x,y,i,j,h)=>{g.fillStyle=(i+j)%2?'#26364a':'#2a3c52';g.fillRect(x,y,16,16);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(x,y,16,1);g.fillRect(x,y,1,16)},
 grate:(g,x,y,i,j,h)=>{g.fillStyle='#1c242c';g.fillRect(x,y,16,16);g.fillStyle='#2a3640';for(let k=0;k<16;k+=4)g.fillRect(x+k,y,1,16);g.fillStyle='#141a20';g.fillRect(x,y+15,16,1)},
 brick:(g,x,y,i,j,h)=>{g.fillStyle='#2a1e16';g.fillRect(x,y,16,16);g.fillStyle='#22180f';g.fillRect(x,y+7,16,1);g.fillRect(x,y+15,16,1);g.fillRect(x+((j%2)?4:12),y,1,7);g.fillRect(x+((j%2)?12:4),y+8,1,7)},
 soil:(g,x,y,i,j,h)=>{g.fillStyle=['#3a5a3a','#36543a','#3e5e40'][Math.floor(h*3)];g.fillRect(x,y,16,16);g.fillStyle='rgba(20,40,20,.4)';g.fillRect(x+Math.floor(h*12),y+Math.floor(tdHash(j,i)*12),2,1);g.fillStyle='rgba(120,180,110,.25)';g.fillRect(x+Math.floor(tdHash(i*3,j)*14),y+Math.floor(h*14),1,2)},
 carpet:(g,x,y,i,j,h)=>{g.fillStyle=['#3a2a3a','#382838','#3c2c3c'][Math.floor(h*3)];g.fillRect(x,y,16,16);g.fillStyle='rgba(255,255,255,.03)';g.fillRect(x+Math.floor(h*14),y+Math.floor(tdHash(j,i)*14),1,1)},
 roof:(g,x,y,i,j,h)=>{g.fillStyle=['#3a3440','#363040','#3e3846'][Math.floor(h*3)];g.fillRect(x,y,16,16);g.fillStyle='rgba(0,0,0,.18)';g.fillRect(x,y+15,16,1);if(h<.1){g.fillStyle='rgba(20,20,30,.4)';g.fillRect(x+4,y+4,6,5)}},
 g:(g,x,y,i,j,h)=>{g.fillStyle=['#4a4440','#46403c','#4e4844'][Math.floor(h*3)];g.fillRect(x,y,16,16);for(let k=0;k<6;k++){g.fillStyle=k%2?'#5a5450':'#3a3430';g.fillRect(x+Math.floor(tdHash(i*7+k,j)*15),y+Math.floor(tdHash(j*5+k,i)*15),1,1)}},
 G:(g,x,y,i,j,h)=>{g.fillStyle=['#2e3e26','#2a3a24','#32422a'][Math.floor(h*3)];g.fillRect(x,y,16,16);for(let k=0;k<5;k++){g.fillStyle='#3e5230';g.fillRect(x+Math.floor(tdHash(i*7+k,j)*15),y+Math.floor(tdHash(j*5+k,i)*13),1,3)}},
 a:(g,x,y,i,j,h)=>{g.fillStyle='#26262c';g.fillRect(x,y,16,16);g.fillStyle='rgba(255,255,255,.03)';g.fillRect(x+Math.floor(h*15),y+Math.floor(tdHash(j,i)*15),1,1)},
 '_':(g,x,y)=>{g.fillStyle='#16121a';g.fillRect(x,y,16,16);g.fillStyle='rgba(255,255,255,.04)';g.fillRect(x,y+15,16,1)}};
const TDWALL={
 panel:{f:'#4a3a4a',f2:'#433444',b:'#2a1e2a',cap:'#17121a',trim:'#6a5468'},
 trailer:{f:'#6a5a48',f2:'#625240',b:'#3a2e22',cap:'#1a1612',trim:'#8a7860',strip:1},
 skin:{f:'#c8c0b0',f2:'#b8b0a0',b:'#5a5448',cap:'#2a2620',trim:'#e0d8c8',siding:1},
 plaster:{f:'#3e4a52',f2:'#38444c',b:'#1e2830',cap:'#10161c',trim:'#5a6a74'},
 green:{f:'#2a4a3a',f2:'#244232',b:'#14281e',cap:'#0c1812',trim:'#4a7a5a'},
 wood:{f:'#4a3626',f2:'#44301f',b:'#2a1c12',cap:'#150e09',trim:'#6a4e36',plank:1},
 dark:{f:'#26262c',f2:'#222228',b:'#141418',cap:'#0c0c10',trim:'#3a3a44'},
 brick:{f:'#3a2418',f2:'#341f14',b:'#1c120c',cap:'#0e0906',trim:'#4a3020',bricks:1},
 tile:{f:'#a8b4b8',f2:'#9eaaae',b:'#5a6468',cap:'#2a3034',trim:'#c8d4d8',tiles:1},
 ops:{f:'#14242e',f2:'#12202a',b:'#0a141a',cap:'#060c10',trim:'#2a5058'},
 pink:{f:'#4a2e40',f2:'#44293a',b:'#2a1824',cap:'#160c12',trim:'#7a4a66'},
 parapet:{f:'#4a4450',f2:'#444050',b:'#2a2630',cap:'#1a1820',trim:'#6a6474'},
 fence:{f:'rgba(0,0,0,0)',f2:'rgba(0,0,0,0)',b:'rgba(0,0,0,0)',cap:'rgba(0,0,0,0)',trim:'#7a7a80',chain:1}};
function tdFloorStyle(M,i,j){const ch=tdCh(M,i,j);if('gGa'.includes(ch))return ch;if(ch==='_')return'_';const z=tdZoneAt(M,i*TS+8,j*TS+8);return(z&&z.floor)||M.floor||'wood'}
function tdWallStyle(M,i,j){for(const [dx,dy] of [[0,1],[0,2],[0,-1],[-1,0],[1,0],[0,3]]){const ch=tdCh(M,i+dx,j+dy);if(TDWALK.includes(ch)&&ch!=='_'){const z=tdZoneAt(M,(i+dx)*TS+8,(j+dy)*TS+8);if(z&&z.wall)return TDWALL[z.wall]||TDWALL.panel}}return TDWALL[M.wall]||TDWALL.panel}
function tdBake(M){const o=document.createElement('canvas');o.width=M.pw;o.height=M.ph;const g=o.getContext('2d');if(!g)return null;g.imageSmoothingEnabled=false;
 const walk=(i,j)=>TDWALK.includes(tdCh(M,i,j));const wall=(i,j)=>'#w'.includes(tdCh(M,i,j));
 for(let j=0;j<M.H;j++)for(let i=0;i<M.W;i++){const ch=tdCh(M,i,j),x=i*TS,y=j*TS,h=tdHash(i,j);
  if(walk(i,j)){const st=ch==='D'||ch==='='?tdFloorStyle(M,i,j+1)==='_'?'_':tdFloorStyle(M,i,j):tdFloorStyle(M,i,j);(TDFLOOR[st]||TDFLOOR.wood)(g,x,y,i,j,h);
   if(ch==='='){for(let k=0;k<4;k++){g.fillStyle=k%2?'#2a2430':'#3a3240';g.fillRect(x,y+k*4,16,4);g.fillStyle='rgba(255,255,255,.08)';g.fillRect(x,y+k*4,16,1)}}
   continue}
  if(!wall(i,j))continue;const Wl=tdWallStyle(M,i,j);
  const lower=walk(i,j+1),upper=!lower&&wall(i,j+1)&&walk(i,j+2);
  if(lower||upper){g.fillStyle=Wl.f;g.fillRect(x,y,16,16);
   if(Wl.strip){g.fillStyle=Wl.f2;for(let k=0;k<16;k+=4)g.fillRect(x+k,y,2,16)}
   if(Wl.plank){g.fillStyle=Wl.f2;g.fillRect(x+(i%2?3:9),y,1,16);g.fillRect(x,y+((i+j)%2?6:12),16,1)}
   if(Wl.bricks){g.fillStyle=Wl.f2;for(let r=0;r<4;r++){g.fillRect(x,y+r*4+3,16,1);g.fillRect(x+((r+j)%2?4:12),y+r*4,1,3)}}
   if(Wl.tiles){g.fillStyle=Wl.f2;g.fillRect(x,y+7,16,1);g.fillRect(x,y+15,16,1);g.fillRect(x+7,y,1,16);g.fillRect(x+15,y,1,16)}
   if(Wl.siding){g.fillStyle=Wl.f2;for(let r=0;r<16;r+=3)g.fillRect(x,y+r,16,1);g.fillStyle='rgba(120,60,40,.25)';if(h<.3)g.fillRect(x+Math.floor(h*30),y+5,3,6)}
   if(Wl.chain){g.fillStyle='rgba(150,150,160,.55)';for(let r=0;r<16;r+=3)for(let k=(r/3)%2?1:0;k<16;k+=3)g.fillRect(x+k,y+r,1,1);g.fillStyle='#5a5a62';g.fillRect(x,y+1,16,1);if(i%3===0)g.fillRect(x+7,y,2,16)}
   else if(!Wl.siding){if(lower){g.fillStyle=Wl.b;g.fillRect(x,y+13,16,3);g.fillStyle=Wl.trim;g.fillRect(x,y+13,16,1)}if(upper&&!wall(i,j-1)){g.fillStyle=Wl.trim;g.fillRect(x,y,16,2)}
    if(upper&&!Wl.bricks&&!Wl.tiles){g.fillStyle='rgba(0,0,0,.12)';g.fillRect(x,y+2,16,2)}}
   else if(lower){g.fillStyle='#3a342c';g.fillRect(x,y+14,16,2)}
   if(!lower&&!upper){}
  }else{g.fillStyle=Wl.cap;g.fillRect(x,y,16,16);g.fillStyle='rgba(255,255,255,.05)';if(walk(i-1,j)||(!wall(i-1,j)&&false))g.fillRect(x,y,1,16);if(walk(i+1,j))g.fillRect(x+15,y,1,16);if(walk(i,j-1))g.fillRect(x,y,16,1)}
  /* window glass is drawn live; bake the frame */
  if(ch==='w'&&(lower||upper)){g.fillStyle='#2a2420';g.fillRect(x+1,y+(upper?3:0),14,upper?13:11);g.fillStyle='#0a0c14';g.fillRect(x+2,y+(upper?4:0),12,upper?12:10)}}
 /* soft ambient occlusion under faces and beside walls */
 for(let j=0;j<M.H;j++)for(let i=0;i<M.W;i++){if(!walk(i,j))continue;const x=i*TS,y=j*TS;
  if(wall(i,j-1)){const gr=g.createLinearGradient(0,y,0,y+7);gr.addColorStop(0,'rgba(0,0,0,.42)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x,y,16,7)}
  if(wall(i-1,j)){g.fillStyle='rgba(0,0,0,.22)';g.fillRect(x,y,3,16)}if(wall(i+1,j)){g.fillStyle='rgba(0,0,0,.16)';g.fillRect(x+13,y,3,16)}}
 if(M.bake)try{M.bake(g)}catch(e){console.error(e)}
 return o}
/* ---------- light & particles ---------- */
const TDG={};function tdGrad(r,col){const k=r+'|'+col;if(TDG[k])return TDG[k];const s=Math.max(2,Math.ceil(r*2));const o=document.createElement('canvas');o.width=o.height=s;const g=o.getContext('2d');
 if(g&&g.createRadialGradient){const gr=g.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);if(gr){gr.addColorStop(0,`rgba(${col},1)`);gr.addColorStop(.45,`rgba(${col},.55)`);gr.addColorStop(1,`rgba(${col},0)`);g.fillStyle=gr;g.fillRect(0,0,s,s)}}TDG[k]=o;return o}
function tdAmbient(M,z){const sl=Math.min(S.slot,3);let d=[.2,.1,.6,.76][sl];const out=z&&z.out;if(out)d=[.06,0,.5,.66][sl];if(M.dim)d+=M.dim;if(z&&z.dim)d+=z.dim;if(S.dark)d+=.06;const w=weather();if(!tdNight()&&(w==='rain'||w==='fog'))d+=.1;
 const col=sl>=2?'8,8,26':S.dark?'26,4,10':'22,14,28';return{d:clamp(d,0,.86),col}}
function tdLights(M,cam){const L=[];const add=(x,y,r,i,col,fl)=>{if(x+r<cam.x||x-r>cam.x+W||y+r<cam.y||y-r>cam.y+H)return;L.push({x,y,r,i,col,fl})};
 (M.lights||[]).forEach(l=>{if(l.on&&!l.on())return;let i=l.i===undefined?1:l.i;if(l.flick){const f=Math.sin(T*.7+l.x)*Math.sin(T*.13+l.y);if(f>1-l.flick*.6)i*=.25}add(l.x,l.y,l.r,i,l.col||'255,214,160')});
 M.props.forEach(p=>{if(!p.light||(p.show&&!p.show()))return;const ls=typeof p.light==='function'?p.light():p.light;if(!ls)return;(Array.isArray(ls)?ls:[ls]).forEach(l=>{if(!l)return;let i=l.i===undefined?1:l.i;if(l.flick&&Math.sin(T*.9+p.x)>1-l.flick*.5)i*=.3;add(p.x+(l.dx||0),p.y+(l.dy||0),l.r,i,l.col||'255,214,160')})});
 const day=!tdNight();for(let j=0;j<M.H;j++)for(let i=0;i<M.W;i++)if(M.g[j][i]==='w'&&TDWALK.includes(tdCh(M,i,j+1))){const x=i*TS+8,y=(j+1)*TS+14;
  if(day)add(x,y,M.winR||44,(S.slot===0?.75:.6)*(weather()==='clear'?1:.55),S.slot===0?'255,230,190':'255,244,220');else add(x,y,26,.22,'150,170,255')}
 return L}
function tdRain(){const w=weather();return w==='rain'}
function tdSpawnParts(M,cam,zone,lights){const P=TD.parts;if(META.reduceMotion){if(P.length>40)P.length=40;return}
 if(P.length<140){lights.forEach(l=>{if(Math.random()<.035*l.i){P.push({k:'dust',x:l.x+rnd(-l.r*.6,l.r*.6),y:l.y+rnd(-l.r*.7,l.r*.3),vx:rnd(-.05,.05),vy:rnd(-.06,.01),t:0,m:ri(200,420)})}});
  if(M.dust&&Math.random()<.25)P.push({k:'dust',x:cam.x+rnd(0,W),y:cam.y+rnd(0,H),vx:rnd(-.04,.04),vy:rnd(-.04,.02),t:0,m:ri(200,400)});
  (M.steam||[]).forEach(s=>{if((!s.on||s.on())&&Math.random()<(s.rate||.2))P.push({k:'steam',x:s.x+rnd(-2,2),y:s.y,vx:rnd(-.08,.08),vy:rnd(-.35,-.2),t:0,m:ri(50,90)})});
  if(M.mist&&Math.random()<.12)P.push({k:'mist',x:cam.x+rnd(-20,W+20),y:cam.y+rnd(20,H),vx:rnd(.05,.18),vy:rnd(-.03,.03),t:0,m:ri(300,500),r:rnd(14,30)});
  if(M.mistRect&&zone&&zone.id==='green'&&Math.random()<.14){const r=M.mistRect;P.push({k:'mist',x:r[0]+rnd(0,r[2]),y:r[1]+rnd(0,r[3]),vx:rnd(.04,.14),vy:rnd(-.03,.03),t:0,m:ri(260,420),r:rnd(12,26)})}
  if(M.drip&&Math.random()<.02)P.push({k:'drip',x:cam.x+rnd(0,W),y:cam.y+rnd(10,H*.6),vx:0,vy:1.6,t:0,m:ri(20,40)})}
 for(let n=P.length-1;n>=0;n--){const p=P[n];p.t++;p.x+=p.vx*(DT||1);p.y+=p.vy*(DT||1);if(p.k==='dust'){p.vx+=rnd(-.004,.004);p.vy+=rnd(-.004,.004)}if(p.t>p.m)P.splice(n,1)}}
function tdDrawParts(lights){TD.parts.forEach(p=>{const a=Math.min(1,p.t/30,(p.m-p.t)/30);
 if(p.k==='dust'){let lit=.12;for(const l of lights){const d=Math.hypot(p.x-l.x,p.y-l.y);if(d<l.r){lit=Math.max(lit,(1-d/l.r)*l.i)}}c.fillStyle=`rgba(255,244,220,${a*lit*.9})`;c.fillRect(p.x,p.y,1,1)}
 else if(p.k==='steam'){c.fillStyle=`rgba(230,230,240,${a*.18})`;c.beginPath();c.arc(p.x,p.y,1.5+p.t*.06,0,7);c.fill()}
 else if(p.k==='mist'){c.fillStyle=`rgba(200,230,215,${a*.06})`;c.beginPath();c.arc(p.x,p.y,p.r,0,7);c.fill()}
 else if(p.k==='drip'){c.fillStyle=`rgba(160,190,220,${a*.5})`;c.fillRect(p.x,p.y,1,2)}})}
function tdWeatherFX(zone,cam){const w=weather();if(!zone||!zone.out)return;
 if(w==='rain'){c.strokeStyle='rgba(170,190,230,.35)';c.lineWidth=.6;c.beginPath();for(let i=0;i<70;i++){const x=(i*53+T*2.2+(i%5)*T*.4)%(W+40)-20,y=(i*97+T*7.5)%(H+20)-10;c.moveTo(x,y);c.lineTo(x-2,y+7)}c.stroke();
  for(let i=0;i<10;i++){const k=(T+i*37)%40;if(k<12){c.strokeStyle=`rgba(190,210,240,${.35-k*.03})`;c.beginPath();c.ellipse((i*71+Math.floor((T+i*37)/40)*29)%W,(i*41+Math.floor((T+i*37)/40)*53)%H,k*.6,k*.25,0,0,7);c.stroke()}}
  if(tdNight()&&(T%1400)<6){c.fillStyle='rgba(220,220,255,.3)';c.fillRect(0,0,W,H)}}
 if(w==='snow'){c.fillStyle='rgba(255,255,255,.75)';for(let i=0;i<60;i++){const x=(i*41+Math.sin(T/40+i)*10+T*.2)%W,y=(i*67+T*.5*(1+(i%3)*.3))%H;c.fillRect(x,y,i%4?1:2,i%4?1:2)}}
 if(w==='fog'){for(let i=0;i<6;i++){c.fillStyle='rgba(200,200,210,.07)';c.beginPath();c.ellipse((i*90+T*.15)%(W+160)-80,40+i*26,90,22,0,0,7);c.fill()}}}
/* ---------- window glass (live) ---------- */
function tdWindowGlass(M,i,j,upper){const x=i*TS+2,y=j*TS+(upper?4:0),w=12,h=upper?12:10;const sl=Math.min(S.slot,3),wx=weather();
 const sky=[['#f2c8a0','#a8c8e8'],['#9ac8f0','#d8ecf8'],['#1a1838','#3a2848'],['#06060e','#141024']][sl];const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,sky[0]);g.addColorStop(1,sky[1]);c.fillStyle=g;c.fillRect(x,y,w,h);
 if(M.view)M.view(x,y,w,h,i);else{c.fillStyle=sl>=2?'#0c0a14':'rgba(40,50,60,.5)';c.fillRect(x,y+h-4,w,4);if(sl>=2&&(i+j)%2)rect(x+3+(i%4),y+h-3,1,1,'#f2d24a')}
 if(wx==='rain'){c.fillStyle='rgba(200,220,255,.35)';for(let k=0;k<4;k++){const yy=(T*.6+k*13+i*7)%(h+4);c.fillRect(x+((k*5+i*3)%w),y+yy-4,1,3)}}
 if(wx==='fog'){c.fillStyle='rgba(220,220,230,.4)';c.fillRect(x,y,w,h)}if(wx==='snow'){c.fillStyle='#fff';for(let k=0;k<3;k++)c.fillRect(x+((k*5+T/9+i)|0)%w,y+((T/4+k*7)|0)%h,1,1);c.fillStyle='rgba(255,255,255,.7)';c.fillRect(x,y+h-2,w,2)}
 c.fillStyle='rgba(255,255,255,.18)';c.fillRect(x+1,y+1,1,h-2);c.fillStyle='#2a2420';c.fillRect(x+5,y,1,h);c.fillRect(x,y+Math.floor(h/2),w,1)}
