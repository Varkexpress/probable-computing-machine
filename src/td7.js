/* ===================== BUG FIXES: one of everyone, bathroom access, sprites, friends' flats, bubbles ===================== */
/* each character is in exactly one place in the house at a time */
const HOUSE=['atrium','ops','green','kennel','training','archive','vbath','bedroom','garage','roof','cellar','wing_craft','wing_games','wing_sun','wing_lab','wing_redroom','wing_trophy','wing_armory'];
HOUSE.forEach(r=>{const R=ROOMS[r];if(!R)return;const o=R.npcs;R.npcs=()=>{let L=[];try{L=o?o():[]}catch(e){}return L.filter(n=>{const l=n.label||'';
 if(/(^| )V$|K9/.test(l))return S.visitAs!=='v'&&S.pov!=='v'&&r===vWhere();if(/Misaki/.test(l))return r===misWhereBase();if(/Angel/.test(l))return r===angWhere();if(/Ronin/.test(l))return r===ronWhere();return true})}});
(function(){const st=ROOMS.studio,rn=ROOMS.ronin;const so=st.npcs,ro=rn.npcs;st.npcs=()=>{const L=so?so():[];return HOUSE.includes(angWhere()||'')?L.filter(n=>!/Angel/.test(n.label||'')):L};rn.npcs=()=>{const L=ro?ro():[];return HOUSE.includes(ronWhere()||'')?L.filter(n=>!/Ronin/.test(n.label||'')):L}})();
/* V's bathroom: the sink was in the doorway */
(function(){const B=TD.maps.base;const g=id=>B.props.find(p=>p.id===id);g('vb_sink').x=612;g('vb_mirror').x=610;g('vb_bath').y=416;g('vb_bath').x=620})();
/* legacy speech bubbles wrap and stay on screen in side-view rooms */
bubble=function(s,x,y){if(scene&&scene.td)return tdBubble(s,x,y);c.font='9px VT323, monospace';const out=[];let line='';String(s).split(' ').forEach(w=>{const t=line?line+' '+w:w;if(c.measureText(t).width>130&&line){out.push(line);line=w}else line=t});if(line)out.push(line);
 const w=Math.max(...out.map(l=>c.measureText(l).width))+8,h=out.length*9+3;let lo=2,hi=W-w-2;if(scene&&scene.cam&&!META.camFixed){const z=(ROOMS[S&&S.room]&&ROOMS[S.room].zoom)||ROOMZOOM[S&&S.room]||1.3;lo=scene.cam.x-W/(2*z)+2;hi=scene.cam.x+W/(2*z)-w-2}
 const bx=clamp(x-w/2,lo,Math.max(lo,hi)),by=y-h+3;rect(bx,by-9,w,h,'rgba(244,240,234,.94)');rect(clamp(x-2,bx+2,bx+w-6),by-9+h,4,3,'rgba(244,240,234,.94)');c.fillStyle='#141014';out.forEach((l,i)=>c.fillText(l,bx+4,by+i*9))};
/* ---------- Ronin's apartment and Angel's studio, walkable ---------- */
function fExit(sc){sc.trans(()=>whOK()?cityMap():hub())}
tdMap('ronin',{floor:'wood',wall:'pink',backLabel:'leave',dust:1,rows:TDROWS.RONIN,
 zones:{ronin:{r:[2,3,18,6],floor:'wood',wall:'pink',main:1,name:'Ronin’s apartment',arrive:[4,8,'u'],at:{'30,160':[4,8,'u'],'20,160':[4,8,'u']}},rlanding:{r:[3,10,3,1],room:'ronin',floor:'concrete',name:'Ronin’s landing'}},
 npcAt:{'ronin:r':[13,7]},doorOpt:{'4,9':{open:1,style:{col:'#5a1e1e',dk:'#3a1212'}}},
 lights:[{x:168,y:70,r:60,i:.7,col:'255,120,140',flick:.35},{x:60,y:70,r:60,i:.8,col:'255,190,140'},{x:300,y:90,r:50,i:.6,col:'255,214,160'}],
 view:(x,y,w,h,i)=>{c.fillStyle=tdNight()?'#0e0a18':'#6a7a9a';c.fillRect(x,y+h-6,w,6);for(let k=0;k<3;k++)rect(x+1+k*4,y+h-9,3,9,tdNight()?'#18122a':'#4a5a7a');if(tdNight())rect(x+2+(i%3)*3,y+h-7,1,1,'#ff6fa8')},
 leave:()=>[{t:'Head out',sub:'the city map',fn:()=>whOK()?cityMap():hub()}],
 under:()=>{tdRug(130,70,80,40,'#3a1424','#c2253a')},
 props:[{id:'rn_exit',x:48,y:166,w:48,d:12,exit:fExit},{id:'rn_doorclaim',kind:'deco',z:'ronin',x:0,y:0,w:0,d:0,flat:1,solid:false,legacy:'Door — leave'},
  {id:'rn_vinyl',wall:1,x:34,y:18,w:60,d:30,legacy:'Tapes & vinyl',label:'Tapes & vinyl',draw:(x,y)=>{rect(x,y+8,60,2,'#3a1a1a');rect(x,y+18,60,2,'#3a1a1a');for(let k=0;k<14;k++)rect(x+2+k*4,y+(k%2?11:1)+2,3,7,['#7a1e8a','#e8e0f0','#3a2a3a','#c2253a'][k%4])}},
  {id:'rn_window',wall:1,x:240,y:16,w:32,d:32,legacy:'Ronin’s window',label:'Ronin’s window',draw:()=>{}},
  {id:'rn_tv',x:150,y:50,w:40,d:10,h:24,legacy:'TV',label:'TV (Heathers on loop)',draw:(x,y)=>{tdBox(x,y,40,10,8,'#2a1a1a','#1e1212');tdBox(x+4,y-8,32,8,16,'#141418','#0e0e12');rect(x+6,y-22,28,12,['#8a1e3a','#c2253a','#3a1a4a'][(T>>6)%3]);txt('HEATHERS',x+20,y-14,'rgba(255,255,255,.6)',5,'center')},light:{dx:20,dy:14,r:44,i:.6,col:'255,90,120',flick:.3}},
  {id:'rn_crow',wall:1,x:278,y:18,w:38,d:30,legacy:'Crowbar wall',label:'Crowbar wall',draw:(x,y)=>{rect(x,y+3,38,24,'#2a1414');for(let k=0;k<5;k++){rect(x+4+k*7,y+5,2,20,'#8a8a96');rect(x+4+k*7,y+5,4,2,'#8a8a96')}}},
  {id:'rn_record',x:98,y:50,w:26,d:12,h:16,legacy:'Record player',label:'Record player',draw:(x,y)=>{tdBox(x,y,26,12,16,'#5a3a2a','#3a2418');c.fillStyle='#141014';c.beginPath();c.arc(x+12,y-12,6,0,7);c.fill();rect(x+11,y-13,2,2,'#c2253a');rect(x+20,y-16,2,8,'#b8b8c0')}},
  {id:'rn_couch',x:140,y:108,w:62,d:16,h:12,legacy:'Couch',label:'Couch — movie night',seat:tdSeat(170,120,'u'),zb:2,draw:(x,y)=>{tdBox(x,y,62,16,12,'#4a1424','#2a0a14','#6a1e34');rect(x,y-16,62,6,'#3a0e1c');for(let k=0;k<3;k++)rect(x+4+k*20,y-10,18,6,'#6a1e34')},
   act:(who,L,P,sc)=>tdAsk('Ronin’s couch. It has been reupholstered with something that might be a curtain.',[{t:'Sit',fn:()=>{tdSit(sc,P,[['',who==='v'?'He sits. A spring finds him immediately.':'you sit. the couch exhales cigarette smoke from 2009.']])}},L&&{t:'Host movie night',fn:L}])},
  {id:'rn_table',x:150,y:84,w:36,d:12,h:6,legacy:'Gameboy',label:'Coffee table (Gameboy)',draw:(x,y)=>{tdBox(x,y,36,12,6,'#3a2418','#2a180f');rect(x+6,y-5,6,8,'#8a8a8a');rect(x+7,y-4,4,3,'#6a8a4a');rect(x+20,y-4,8,4,'#c9a050')}},
  {id:'rn_chair',x:214,y:88,w:20,d:16,h:12,legacy:'Give Ronin something',label:'Ronin’s armchair (give him something)',draw:(x,y)=>{tdBox(x,y,20,16,12,'#5a3a2a','#3a2418');rect(x,y-18,20,8,'#4a2a1e')}},
  {id:'rn_kitchen',x:294,y:56,w:24,d:60,h:16,legacy:'Kitchen',label:'Kitchen — Ronin’s cooking',zb:-50,draw:(x,y)=>{tdBox(x,y,24,60,16,'#6a6a72','#4a4a52','#8a8a92');rect(x+4,y-12,14,10,'#2a2a30');rect(x+6,y+10,12,8,'#3a3a42');for(let k=0;k<4;k++)rect(x+3+k*5,y+30,1,10,'#b8b8c0')},light:{dx:12,dy:20,r:40,i:.5,col:'255,214,160'}},
  {id:'rn_freezer',x:36,y:112,w:32,d:16,h:14,legacy:'Freezer',label:'Freezer',draw:(x,y)=>{tdBox(x,y,32,16,14,'#e8ecec','#c8cccc','#f8fcfc');rect(x+12,y-12,8,2,'#8a8a92')}}]});
tdMap('studio',{floor:'oak',wall:'pink',backLabel:'leave',dust:1,rows:TDROWS.STUDIO,
 zones:{studio:{r:[2,3,18,6],floor:'oak',wall:'pink',main:1,name:'Angelic’s studio',arrive:[4,8,'u'],at:{'30,160':[4,8,'u'],'20,160':[4,8,'u']}},slanding:{r:[3,10,3,1],room:'studio',floor:'concrete',name:'Angel’s landing'}},
 npcAt:{'studio:a':[11,6]},doorOpt:{'4,9':{open:1,style:{col:'#f2a0b8',dk:'#c27a98'}}},
 lights:[{x:58,y:62,r:56,i:.9,col:'255,236,220'},{x:170,y:84,r:60,i:.8,col:'255,250,240'},{x:270,y:90,r:50,i:.6,col:'255,200,230'}],
 view:(x,y,w,h,i)=>{c.fillStyle=tdNight()?'#1a1030':'#f2c4d8';c.fillRect(x,y,w,h);rect(x,y+h-4,w,4,tdNight()?'#2a1a3a':'#d8a0b8')},
 leave:()=>[{t:'Head out',sub:'the city map',fn:()=>whOK()?cityMap():hub()}],
 under:()=>{tdRug(140,70,70,46,'#f8d8e8','#ff8ab0')},
 props:[{id:'st_exit',x:48,y:166,w:48,d:12,exit:fExit},{id:'st_doorclaim',kind:'deco',z:'studio',x:0,y:0,w:0,d:0,flat:1,solid:false,legacy:'Door — leave'},
  {id:'st_vanity',x:34,y:50,w:46,d:14,h:12,legacy:'Vanity',label:'Vanity — glam assistant',draw:(x,y)=>{tdBox(x,y,46,14,12,'#f8f0f4','#e0d0d8');rect(x+6,y-30,34,18,'#c8d8e0');for(let k=0;k<6;k++)rect(x+5+k*7,y-32,3,3,'#fff4c0');for(let k=0;k<5;k++)rect(x+4+k*8,y-10,4,6,['#ff6fa8','#f2d24a','#5fd4c4','#141014','#d04a7a'][k])},light:{dx:23,dy:-10,r:44,i:.8,col:'255,240,220'}},
  {id:'st_case',x:90,y:50,w:22,d:12,h:28,legacy:'Locked case',label:'Locked case',draw:(x,y)=>{tdBox(x,y,22,12,28,'#3a2a3a','#2a1a2a');rect(x+3,y-24,16,14,'rgba(200,220,240,.3)');txt('DO NOT',x+11,y-4,'#ff6fa8',4,'center')}},
  {id:'st_mood',wall:1,x:196,y:18,w:44,d:30,legacy:'Angel’s mood board',label:'Angel’s mood board',draw:(x,y)=>{rect(x,y+3,44,24,'#e8dcc8');for(let k=0;k<8;k++)rect(x+3+(k%4)*10,y+5+Math.floor(k/4)*11,8,9,['#ff8ab0','#141014','#c2253a','#f4f0ea','#5fd4c4'][k%5])}},
  {id:'st_cam',x:162,y:88,w:16,d:10,h:30,legacy:'Camera',label:'Camera — film an alibi',draw:(x,y)=>{rect(x+7,y-26,2,30,'#3a3a42');rect(x+3,y-30,10,7,'#141418');rect(x+12,y-28,3,3,'#5fd4c4');c.strokeStyle='#fff4e0';c.lineWidth=2;c.beginPath();c.arc(x+8,y-26,11,0,7);c.stroke();c.lineWidth=1}},
  {id:'st_wheel',x:40,y:104,w:22,d:16,h:10,legacy:'Pottery wheel',label:'Pottery wheel',draw:(x,y)=>{tdBox(x,y,22,16,8,'#c9a87a','#a8875a');c.fillStyle='#b87a5a';c.beginPath();c.ellipse(x+11,y-6,6,3,0,0,7);c.fill()}},
  {id:'st_brunch',x:100,y:100,w:40,d:16,h:8,legacy:'Brunch table',label:'Brunch table',draw:(x,y)=>{tdBox(x,y,40,16,8,'#f4f0ea','#d8d0d8');rect(x+6,y-6,6,4,'#c2253a');rect(x+20,y-6,8,4,'#f2d24a');rect(x+30,y-7,4,5,'#ff8ab0')}},
  {id:'st_oven',x:294,y:56,w:24,d:52,h:16,legacy:'Oven',label:'Oven — bake with Angel',zb:-40,draw:(x,y)=>{tdBox(x,y,24,52,16,'#f8f0f4','#e0d0d8');rect(x+4,y+6,16,12,'#3a2a3a');rect(x+6,y+8,12,8,'rgba(255,160,80,.4)')},light:{dx:12,dy:14,r:30,i:.4,col:'255,160,80'}},
  {id:'st_rack',x:240,y:56,w:44,d:10,h:28,legacy:'Wardrobe rack',label:'Wardrobe rack',draw:(x,y)=>{rect(x,y-28,44,2,'#b8b8c0');rect(x,y-28,2,34,'#b8b8c0');rect(x+42,y-28,2,34,'#b8b8c0');for(let k=0;k<8;k++)rect(x+3+k*5,y-26,4,18,['#ff8ab0','#141014','#f4f0ea','#c2253a','#e8b4d8'][k%5])}},
  {id:'st_mirror',x:262,y:112,w:14,d:8,h:32,legacy:'Mirror',label:'Mirror',draw:(x,y)=>{rect(x,y-30,14,36,'#f2a0b8');rect(x+2,y-28,10,32,'#c8d8e0');rect(x+3,y-26,2,20,'rgba(255,255,255,.5)')}},
  {id:'st_pouf',x:200,y:112,w:22,d:16,h:8,legacy:'Give Angelic something',label:'Angel’s pouf (give her something)',draw:(x,y)=>{c.fillStyle='#ff8ab0';c.beginPath();c.ellipse(x+11,y+4,11,8,0,0,7);c.fill();c.fillStyle='#ffb0c8';c.beginPath();c.ellipse(x+11,y,9,5,0,0,7);c.fill()}}]});
/* Angel and Ronin are drawn natively and move around a little, like V and Misaki */
/* furniture that was blocking doorways or hiding things */
(function(){const g=(m,id)=>TD.maps[m].props.find(p=>p.id===id);
 const y=g('trailer','tr_yarn');y.x=186;y.y=112;
 const gl=g('base','gr_glass');gl.x=602;gl.w=36;
 const lb=g('ewing','wl_bench');lb.x=36;lb.y=300;const lc=g('ewing','wl_cab');lc.x=104;lc.y=262;
 const tc=g('ewing','wt_cases');tc.x=274;tc.w=60;})();
(function(){const g=id=>TD.maps.trailer.props.find(p=>p.id===id);const st=g('tr_stream');st.x=58;st.y=96;const f=g('tr_fairy');f.x=134;f.y=64;f.tagY=-8;const sw=g('tr_switch');sw.x=180;sw.y=118})();
(function(){const s=TD.maps.trailer.props.find(p=>p.id==='tr_shelf');s.d=12})();
/* Esc ("Back") picks a menu's cancel option (Stay, Never mind, Back…) and closes the dialogue log / help card.
   Before, Esc did nothing in menus, and the log could only be closed with a click or L. */
const _ocEsc=optsCtrl;optsCtrl=function(box,opts,done){const C=_ocEsc(box,opts,done);const u=C.update;
 const ci=opts.findIndex(o=>o&&!o.dis&&!o.h&&/^(Stay|Never mind|Back|Cancel|Keep playing|Not now|Not yet|Leave it|Close|Nothing)\b/i.test(String(o.t||'').replace(/<[^>]+>/g,'').replace(/^[“"]/,'')));
 C.update=function(){if(ci>=0&&ctrl===C&&hit('back')){const el=box.querySelectorAll('.opt,.oh')[ci];if(el&&el.onclick){el.onclick();return}}return u.apply(this,arguments)};return C};
if(typeof addEventListener!=='undefined')addEventListener('keydown',e=>{if(e.key!=='Escape')return;const lb=document.querySelector('.logbox');if(lb&&!lb.querySelector('input,textarea')){lb.remove();e.stopImmediatePropagation();pressed.back=0}},true);
/* Phone held upright: the stage used to stay a 16:9 strip with every dialogue, menu and the bag squeezed into ~200px
   (text cut off, bag rows overlapping) and the rest of the screen empty. Now the stage fills the screen height:
   the game view stays 16:9 at the top and dialogue/menus get the space underneath. */
(function(){if(typeof document==='undefined')return;const st=document.createElement('style');
 st.textContent=`@media (orientation:portrait) and (max-width:760px){#wrap{max-width:100%}#stage{aspect-ratio:auto;height:calc(100dvh - 92px);min-height:320px}#cv{height:auto;aspect-ratio:16/9}
 #ui .dlg{max-height:56%}#ui .bag{inset:calc(56.25vw + 6px) 2% 2% 2%}}`;document.head.appendChild(st)})();
