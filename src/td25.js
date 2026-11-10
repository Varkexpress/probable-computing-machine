/* ===================== ALTERNATE UNIVERSES ===================== */
/* Small self-contained side games, opened from the title screen. They never touch a run (S stays null).
   Add a universe by pushing {id,name,sub,run(back)} onto AUS. Results live in META.au[id]. */
const AUS=[];
function auMeta(id){META.au=META.au||{};return META.au[id]=META.au[id]||{}}
function auMenu(){const back=()=>title();go({draw(){rect(0,0,W,H,'#06050c');for(let i=0;i<40;i++){const x=(i*83+T*.05*(1+i%3))%W,y=(i*47)%H;rect(x,y,1,1,i%5?'#3a3450':'#8a80b0')}},enter(){
  panel('<h2>Alternate universes</h2><p>Same people, different lives. Nothing here touches your run.</p>',AUS.map(a=>{const m=auMeta(a.id);return{t:a.name,sub:a.sub+(m.end?' · last ending: '+m.end:''),fn:()=>a.run(()=>auMenu())}}).concat([{t:'More universes later',dis:1,sub:'this shelf has room'},{t:'Back to title',fn:back}]))}})}
const _panelAU=panel;panel=function(html,opts){if(typeof html==='string'&&html.indexOf('<h1>Killer Chat!')===0&&opts&&!opts.find(o=>o.au))opts.push({h:'Elsewhere'},{t:'Alternate universes',sub:'side stories · the first: The Long Leash',au:1,fn:()=>auMenu()});return _panelAU(html,opts)};

/* ---------- AU 1: THE LONG LEASH ----------
   A survey station under eleven months of snow. Misaki is the chief researcher: a genius who keeps leaving without
   clearance, with a scarf that is alive and on her side. V is the commander whose one standing order is that she stays. */
const LL={TS:16,OY:16,MAP:[
 '##########E#########',
 '#....c.......#.....#',
 '#.##...##....#.c...#',
 '#.#.....#..........#',
 'E...c.......##..c..#',
 '#.......#....#.....E',
 '#.##....#.c........#',
 '#..#..........##...#',
 '#....c...#.........#',
 '####################'],EX:[[10,0],[0,4],[19,5]]};
function llBlk(tx,ty,run){const r=LL.MAP[ty];if(!r)return true;const ch=r[tx];if(ch===undefined)return true;if(ch==='E')return !run;return ch==='#'||ch==='c'}
function llDist(sx,sy){const D=LL.MAP.map(r=>Array(r.length).fill(-1));const q=[[sx,sy]];D[sy][sx]=0;while(q.length){const [x,y]=q.shift();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(llBlk(nx,ny,1)||D[ny][nx]>=0)continue;D[ny][nx]=D[y][x]+1;q.push([nx,ny])}}return D}
const llT=e=>[Math.floor(e.x/LL.TS),Math.floor(e.y/LL.TS)];
function llStep(e,tx,ty,sp){/* walk one tile toward (tx,ty) along the shortest path */const [ex,ey]=llT(e);if(ex===tx&&ey===ty){llMove(e,(tx+.5)*LL.TS-e.x,(ty+.5)*LL.TS-e.y,sp,1);return}
 const D=llDist(tx,ty);let best=null,bd=1e9;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=ex+dx,ny=ey+dy;if(llBlk(nx,ny,1))continue;const d=D[ny][nx];if(d>=0&&d<bd){bd=d;best=[nx,ny]}}
 if(best)llMove(e,(best[0]+.5)*LL.TS-e.x,(best[1]+.5)*LL.TS-e.y,sp,1)}
function llMove(e,dx,dy,sp,run){const m=Math.hypot(dx,dy);if(m<.01)return;const k=Math.min(1,sp/m);const sx=dx*k,sy=dy*k;const ok=(x,y)=>{for(const [ox,oy] of [[-3,-3],[3,-3],[-3,3],[3,3]])if(llBlk(Math.floor((x+ox)/LL.TS),Math.floor((y+oy)/LL.TS),run))return false;return true};
 if(ok(e.x+sx,e.y))e.x+=sx;if(ok(e.x,e.y+sy))e.y+=sy;if(Math.abs(sx)>Math.abs(sy))e.f=sx<0?-1:1;e.mv=1}
/* one night. side: 'v' = you are the commander, 'm' = you are the researcher. cb(true) if she got out. */
function llNight(side,n,cb){cb=once(cb);const C=(tx,ty)=>({x:(tx+.5)*LL.TS,y:(ty+.5)*LL.TS,f:1,mv:0});
 const M=C(5,3),V=C(17,8);LL.dbg={M,V,kits:null,side};let dec=null,t=0,over=0,out=false,pick=0,pickAt=null,goal=null,stun=0,frz=0,cdA=0,tgt=null,msg='',msgT=0,lock=null,lockT=0;const trail=[];const TT=60*45;const kits=[[[3,1],[16,7]],[[2,7],[17,1],[6,4]],[[1,8],[18,3],[11,6]]][n].map(k=>k.slice());const NEED=side==='v'?80:50;LL.dbg.kits=kits;
 const kitPick=(from,avoid)=>{const dm=llDist(...llT(from)),dv=llDist(...llT(avoid));let b=null,bs=-1e9;for(const k of kits){const s=dv[k[1]][k[0]]-dm[k[1]][k[0]]*1.2;if(s>bs){bs=s;b=k}}return b};
 const spM=side==='v'?[1.1,1.17,1.22][n]:1.25,spV=side==='v'?1.25:[.95,1.02,1.08][n];
 const say1=(s)=>{msg=s;msgT=110};
 const choose=(from,avoid,skip)=>{const dm=llDist(...llT(from)),dv=llDist(...llT(avoid));let b=null,bs=-1e9;for(const [x,y] of LL.EX){if(skip&&skip[0]===x&&skip[1]===y)continue;if(lock&&lock[0]===x&&lock[1]===y)continue;const s=dv[y][x]*1.3-dm[y][x];if(s>bs){bs=s;b=[x,y]}}return b};
 if(n>=1){dec=C(6,3);dec.goal=null;say1(side==='v'?'Two of her. One is the scarf in her coat.':'The scarf takes your coat and runs the other way.')}
 const finish=o=>{if(over)return;out=o;over=1};
 const act=()=>{if(cdA>0||over)return;if(side==='v'){cdA=240;if(Math.hypot(M.x-V.x,M.y-V.y)<52){frz=26;say1('“Researcher. HALT.”')}else say1('Too far for an order.')}
  else{cdA=170;const ax=Math.abs(M.ux||0),ay=Math.abs(M.uy||0);const ux=M.ux===undefined?M.f:ax>=ay?Math.sign(M.ux):0,uy=M.ux===undefined?0:ax>=ay?0:Math.sign(M.uy);let ok=0;for(let k=3;k>=1&&!ok;k--){const nx=M.x+ux*k*LL.TS,ny=M.y+uy*k*LL.TS;if(!llBlk(Math.floor(nx/LL.TS),Math.floor(ny/LL.TS),1)){M.sx=M.x;M.sy=M.y;M.x=nx;M.y=ny;M.st=12;ok=1}}say1(ok?'The scarf grabs a beam and throws you.':'The scarf has nothing to grab.')}};
 go({update(){t++;if(msgT)msgT--;if(cdA)cdA--;if(M.st)M.st--;if(over){if(++over>80)cb(out);return}
   M.mv=V.mv=0;const P=side==='v'?V:M;
   /* player */
   if(!(side==='v'&&stun>0)){let dx=(held.right?1:0)-(held.left?1:0),dy=(held.down?1:0)-(held.up?1:0);if(dx||dy)tgt=null;else if(tgt){dx=tgt.x-P.x;dy=tgt.y-P.y;if(Math.hypot(dx,dy)<3){tgt=null;dx=dy=0}}
    if(dx||dy){const mm=Math.hypot(dx,dy);P.ux=dx/mm;P.uy=dy/mm;llMove(P,dx*9,dy*9,side==='v'?spV:spM,side==='m')}}
   if(hit('act'))act();if(stun)stun--;
   /* the commander locks an exit for a while when he is the AI */
   if(side==='m'&&n>=1){if(lockT>0){if(--lockT===0)lock=null}else if(t%420===200){lock=LL.EX[(t/420|0)%3];lockT=200;say1('V seals a door from the panel.')}}
   /* researcher AI */
   if(side==='v'){if(frz>0)frz--;else{if(t%20===1||!goal)goal=kits.length?kitPick(M,V):choose(M,V);const [mx,my]=llT(M);
     if(n>=2&&cdM()&&Math.hypot(M.x-V.x,M.y-V.y)<34){/* scarf dash: three tiles along the path */M.sx=M.x;M.sy=M.y;for(let k=0;k<26;k++)llStep(M,goal[0],goal[1],2);M.st=12;M.cd=t+260;say1('The scarf hauls her down the corridor.')}
     const dv=llDist(...llT(V));if(!kits.length&&mx===goal[0]&&my===goal[1])pick++;else{if(pick>0)pick=Math.max(0,pick-2);
      if(M.fc>0)M.fc--;if(!(M.fc>0)&&dv[my][mx]>=0&&dv[my][mx]<4&&llDist(goal[0],goal[1])[my][mx]>2){M.fl=(M.fl||0)+1;if(M.fl>45){M.fl=0;M.fc=80}/* he is close: break away before going for it */let bt=null,bd=dv[my][mx];for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=mx+dx,ny=my+dy;if(llBlk(nx,ny,0))continue;if(dv[ny][nx]>bd){bd=dv[ny][nx];bt=[nx,ny]}}if(bt)llMove(M,(bt[0]+.5)*LL.TS-M.x,(bt[1]+.5)*LL.TS-M.y,spM,1);else llStep(M,goal[0],goal[1],spM)}
      else llStep(M,goal[0],goal[1],spM)}}}
   else{/* commander AI */const chase=dec&&Math.hypot(dec.x-V.x,dec.y-V.y)<Math.hypot(M.x-V.x,M.y-V.y)?dec:M;if(stun<=0&&t>70){const [cx,cy]=llT(chase);llStep(V,cx,cy,spV)}
    const [mx,my]=llT(M);const at=LL.EX.find(e=>e[0]===mx&&e[1]===my&&!(lock&&lock[0]===e[0]&&lock[1]===e[1]));if(at&&!M.mv&&!kits.length)pick++;else if(!at)pick=0}
   function cdM(){return !(M.cd>t)}
   /* the decoy: the scarf in her coat */
   if(dec){if(!dec.goal||t%30===2)dec.goal=choose(dec,V,side==='v'?goal:null);llStep(dec,dec.goal[0],dec.goal[1],side==='v'?spM:1.15);
    if(Math.hypot(dec.x-V.x,dec.y-V.y)<11){stun=side==='v'?50:80;dec=null;say1(side==='v'?'It is the scarf. It slaps you.':'V grabs the coat. The coat slaps him.')}
    else{const [dx,dy]=llT(dec);if(LL.EX.find(e=>e[0]===dx&&e[1]===dy)){dec=null;say1('The scarf drops the coat and whips back to her.')}}}
   for(let i=kits.length-1;i>=0;i--)if(Math.hypot((kits[i][0]+.5)*LL.TS-M.x,(kits[i][1]+.5)*LL.TS-M.y)<9){kits.splice(i,1);goal=null;say1(kits.length?(side==='v'?'She has grabbed an instrument case.':'Got one. '+kits.length+' to go.'):(side==='v'?'She has everything. She is going for a door.':'That’s the lot. Door. NOW.'))}
   trail.unshift([M.x,M.y]);if(trail.length>14)trail.pop();
   if(pick>=NEED)return finish(true);
   if(Math.hypot(M.x-V.x,M.y-V.y)<10&&stun<=0)return finish(false);
   if(t>=TT)return finish(false)},
  onTap(x,y){const P=side==='v'?V:M;const wx=x,wy=y-LL.OY;if(Math.hypot(wx-P.x,wy-P.y)<12)act();else tgt={x:wx,y:wy}},
  draw(){rect(0,0,W,H,'#0a0c14');const oy=LL.OY,TS=LL.TS;
   for(let y=0;y<LL.MAP.length;y++)for(let x=0;x<20;x++){const ch=LL.MAP[y][x],px=x*TS,py=oy+y*TS;
    if(ch==='#'){rect(px,py,TS,TS,'#2a3040');rect(px,py,TS,3,'#3a4256');rect(px,py+TS-2,TS,2,'#1a1e2a')}
    else if(ch==='E'){const lk=lock&&lock[0]===x&&lock[1]===y;rect(px,py,TS,TS,lk?'#3a1418':'#0e2a26');rect(px+3,py+3,TS-6,TS-6,lk?'#a83a3a':(T>>4)%2?'#3ad0a0':'#2aa080');for(let i=0;i<3;i++)rect(px+((T/3+i*6)%TS),py+((i*5+T/5)%TS),1,1,'#e8f0f8')}
    else{rect(px,py,TS,TS,(x+y)%2?'#161a26':'#181c2a');if(ch==='c'){rect(px+2,py+3,12,11,'#6a5236');rect(px+2,py+3,12,2,'#8a6e4a');rect(px+7,py+3,2,11,'#4a3a26')}}}
   for(const k of kits){const px=k[0]*TS,py=oy+k[1]*TS,b=(T>>4)%2;rect(px+4,py+6-b,8,6,'#c8a030');rect(px+4,py+6-b,8,1,'#f2d24a');rect(px+7,py+4-b,2,2,'#8a6a20')}
   const fig=(e,coat,hair,tall,clip)=>{const x=Math.round(e.x),y=Math.round(e.y)+oy,b=e.mv?(T>>3)%2:0;c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(x,y+4,5,2,0,0,7);c.fill();
    rect(x-3,y-4-tall+b,6,8+tall,coat);rect(x-3,y+3,2,2-b,'#14141c');rect(x+1,y+3,2,1+b,'#14141c');rect(x-3,y-9-tall+b,6,5,'#e8c8a8');rect(x-3,y-10-tall+b,6,3,hair);if(clip)rect(x+(e.f>0?-3:2),y-9-tall+b,1,1,'#f2d24a')};
   /* the scarf: a red line that follows her a beat behind */
   const sc=(arr,col)=>{c.strokeStyle=col;c.lineWidth=2;c.beginPath();arr.forEach(([x,y],i)=>{const w=Math.sin(T/6+i*.8)*1.5;i?c.lineTo(x+w,y+oy-7):c.moveTo(x,y+oy-7)});c.stroke()};
   if(M.st){c.strokeStyle='#ff5a6a';c.lineWidth=1;c.beginPath();c.moveTo(M.sx,M.sy+oy-7);c.lineTo(M.x,M.y+oy-7);c.stroke()}
   const ents=[[V.y,()=>{fig(V,'#3a4668','#2a2a34',3,0);rect(Math.round(V.x)-3,Math.round(V.y)+oy-7,6,1,'#c8a030');if(stun>0)txt('✶',V.x,V.y+oy-22,'#f2d24a',9,'center')}],[M.y,()=>{if(!dec||side==='m')sc(trail.filter((_,i)=>i%2===0),'#e03a4a');fig(M,'#e8e8f0','#1a1420',0,1);if(!dec||side==='m')rect(Math.round(M.x)-3,Math.round(M.y)+oy-6,6,2,'#e03a4a');if(dec&&side!=='m'){rect(Math.round(M.x)-3,Math.round(M.y)+oy-6,6,2,'#e03a4a')}if(frz>0)txt('!',M.x,M.y+oy-20,'#f2d24a',10,'center')}]];
   if(dec)ents.push([dec.y,()=>{fig(dec,'#e8e8f0',side==='v'?'#1a1420':'#e03a4a',0,side==='v');rect(Math.round(dec.x)-3,Math.round(dec.y)+oy-6,6,2,'#e03a4a')}]);
   ents.sort((a,b)=>a[0]-b[0]).forEach(e=>e[1]());
   if(pick>0){const g=side==='v'?goal:llT(M);if(g){rect(g[0]*TS,oy+g[1]*TS-4,TS,2,'#14141c');rect(g[0]*TS,oy+g[1]*TS-4,TS*Math.min(1,pick/NEED),2,'#f2d24a')}}
   /* cold light and vignette */
   const P=side==='v'?V:M;c.save();const gr=c.createRadialGradient(P.x,P.y+oy,26,P.x,P.y+oy,150);gr.addColorStop(0,'rgba(4,6,14,0)');gr.addColorStop(1,'rgba(4,6,14,.5)');c.fillStyle=gr;c.fillRect(0,0,W,H);c.restore();
   if(msgT)txt(msg,160,H-5,'#e8e0d0',9,'center');
   if(over)txt(out?(side==='v'?'She is out.':'You are out.'):(side==='v'?'Caught.':t>=TT?'Dawn. Too late.':'Caught.'),160,96,'#f2d24a',16,'center');
   hudBar('Night '+(n+1)+' · '+(side==='v'?'catch her · E: halt':'cases, then a green door · E: scarf'),(kits.length?kits.length+' case'+(kits.length>1?'s':'')+' · ':'')+(cdA?'··· ':'E ready · ')+Math.max(0,Math.ceil((TT-t)/60))+'s')}})}
function llRun(back){const R={side:'v',out:0,in:0,coat:0};const mm=auMeta('leash');
 const N=(n,then)=>llNight(R.side,n,o=>{o?R.out++:R.in++;then(o)});
 const end=()=>{const k=R.coat?'Escort':R.out>=2?'Gone':'Leash';mm.end=k;mm.n=(mm.n||0)+1;saveMeta();
  const L=k==='Escort'?[['','Report forty-three. The Commander accompanied the subject to the north ridge, to ensure she did not run off.'],['','She ran off. He kept up. It is in the report as “a brisk escort”.'],['','On the ridge the scarf loops itself round both their necks and pulls tight.'],['K9','It is strangling me.'],['hitmeuppp','that’s a HUG. she likes you. I’ve never seen her like anyone, she bit the last commander.']]
   :k==='Gone'?[['','Morning. Her bunk is empty and so is the equipment locker.'],['','One end of the scarf is tied to the outer door handle. The rest of it runs out across the snow, north, further than a scarf should go.'],['K9','(Four kilometres, by my estimate. It has left me a line to follow. It was not her idea.)'],['','He takes his coat, a flask, and her other boot. He follows the scarf.']]
   :[['','Report forty-three. The subject remained on station for the full quarter. The Commander slept a total of nine hours across it.'],['hitmeuppp','I solved it from the desk, by the way. The singing. It’s a pressure vent. Fucking boring. I want a refund on my whole week.'],['','The scarf slides his keys out of his pocket while she talks. He watches it happen.'],['K9','(I will get them back in the morning. I am very tired, and it is only going to the kitchen.)']];
  say(L,()=>{go({draw(){rect(0,0,W,H,'#06050c')},enter(){panel('<h2>The Long Leash — '+k+'</h2><p>Nights she got out: '+R.out+' · nights she stayed in: '+R.in+(R.coat?' · and one he walked her out himself':'')+'</p><p class="hint">Three endings: Escort, Gone, Leash. Either side can reach all three.</p>',[{t:'Play it again',fn:()=>llRun(back)},{t:'Back',fn:back}])}})})};
 const night3=()=>{say([['hitmeuppp','It’s a day’s walk. There is something under that ridge and it is SINGING, V. In a key. I checked.'],['hitmeuppp','One: I’m going. Two: you can’t stop me. Three: okay you can, you have twice, but I’ll be a bitch about it for a month.'],['','The scarf picks his coat up off the hook and holds it out to him.']],()=>{
   const o=R.side==='v'?[{t:'Take the coat.',sub:'go with her',fn:()=>{R.coat=1;say([['K9','My orders are that you do not leave unaccompanied. I have read them again. They do not say which of us carries the instruments.'],['hitmeuppp','...you’re coming? You’re COMING. Oh my God. Carry the heavy one.']],end)}},{t:'Stand in the door.',sub:'last night, and she is fast now',fn:()=>say([['K9','No.'],['hitmeuppp','Cool. Scarf? Get him.']],()=>N(2,end))}]
    :[{t:'“Come with me.”',sub:'hand him the coat',fn:()=>{R.coat=1;say([['hitmeuppp','Come with me. You’re supposed to make sure I don’t run off, right? So keep up.'],['K9','...That is a wilful misreading of a standing order.'],['K9','Give me the heavy case. You will drop it.']],end)}},{t:'Run for it.',sub:'last night, and he has stopped being polite',fn:()=>say([['K9','Researcher. I am asking you once.'],['hitmeuppp','And I’m ignoring you once! We’re so in sync!']],()=>N(2,end))}];
   ask(R.side==='v'?'K9':'hitmeuppp','(...)',o)})};
 const night2=()=>say([['K9','Report forty-one. The subject has taught the scarf to wear her coat.'],['hitmeuppp','Slander. She taught herself. I just said “wouldn’t it be funny if”.'],['K9','It is two in the morning again, Researcher.'],['hitmeuppp','Is it? Wild. Anyway.']],()=>N(1,o=>say(o?[['','A door bangs. The coat is on the floor with nobody in it.'],['K9','(Report forty-one, addendum. I am going to need a second lock, and a first night of sleep.)']]:[['','He has her by the collar and the scarf by the fringe. Both of them go limp at the same moment, like cats.'],['hitmeuppp','This is a war crime. Put it in your little report.'],['K9','I have a column for it.']],night3)));
 const night1=()=>say([['K9','Researcher. It is two in the morning. Why are you wearing boots.'],['hitmeuppp','One: these are indoor boots. Two: the north ridge just spiked and it’s the best fucking data of my career. Three: you can’t prove anything.'],['','The scarf lifts one end off her shoulder and points at the door.'],['K9','It has just proved it.'],['hitmeuppp','TRAITOR.']],()=>N(0,o=>say(o?[['','Snow blows in through the open door. On the mat: one indoor boot.'],['K9','(She will be back by breakfast with frostbite and a graph. I will have the kettle on. I will also have the report.)']]:[['K9','Back inside. You may be brilliant at a desk.'],['hitmeuppp','I hate the desk. The desk has never once exploded.'],['','The scarf pats his arm twice. He is fairly sure it is being sarcastic.']],night2)));
 go({draw(){rect(0,0,W,H,'#06050c');for(let i=0;i<60;i++){const x=(i*53+T*(.3+i%4*.1))%W,y=(i*29+T*(.5+i%3*.2))%H;rect(x,y,1,1,'#c8d0e0')}},enter(){
  say([['','Another universe. A survey station at the top of the map, under eleven months of snow.'],['','Chief Researcher Misaki has left it without clearance nine times this quarter. Her scarf helped. The scarf is alive, and nobody has had a straight answer about how.'],['','Commander V has one standing order: she does not run off. He has not slept properly since it was issued.']],()=>
   ask('','Three nights. Whose boots?',[{t:'The Commander',sub:'V · catch her before she picks a door',fn:()=>{R.side='v';night1()}},{t:'The Researcher',sub:'Misaki · get out, with help from the scarf',fn:()=>{R.side='m';night1()}},{t:'Back',fn:back}]))}})}
AUS.push({id:'leash',name:'The Long Leash',sub:'a researcher, her scarf, and the commander told to keep her in',run:llRun});
