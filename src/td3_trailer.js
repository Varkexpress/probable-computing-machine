/* ---------- shared prop helpers ---------- */
const tdL=(id,def)=>{const t=S&&S.td&&S.td.l;return t&&t[id]!==undefined?!!t[id]:!!def};
function tdSetL(id,v){tdS().l[id]=v?1:0;save();sfx(v?'sel':'snap')}
const tdF=k=>!!(S&&S.td&&S.td.f&&S.td.f[k]);
function tdSetF(k,v=1){tdS().f[k]=v;save()}
function tdAsk(text,opts,who){ask(who||tdN(),text,opts.filter(Boolean).concat([{t:'Never mind',fn:()=>{}}]))}
function tdSeat(sx,sy,sdir){return{sx,sy,sdir}}
function tdSit(sc,P,lines,onStand){sc.sitOn(P.seat,lines,onStand)}
function tdBooks(x,y,w,rows,rh){for(let r=0;r<rows;r++){let bx=x+1;let n=0;while(bx<x+w-2){const bw=2+Math.floor(tdHash(bx,r+y)*2);rect(bx,y+r*rh+1+(tdHash(r,bx)<.2?1:0),bw,rh-2-(tdHash(r,bx)<.2?1:0),['#7a1a2a','#3a5a3a','#c9a050','#2a2a3a','#f2a0b8','#4a5a7a','#8a6a40'][Math.floor(tdHash(bx*3,r)*7)]);bx+=bw+(tdHash(bx,n++)<.1?2:0)}rect(x,y+r*rh+rh-1,w,1,'#2a1c12')}}
function tdPlant(x,y,s,col){rect(x-3*s,y-4*s,6*s,4*s,'#7a4a2a');rect(x-3*s,y-4*s,6*s,1,'#9a6a40');c.fillStyle=col||'#3f8a46';const sw=Math.sin(T/50+x)*.6;for(let k=0;k<5;k++){c.beginPath();c.ellipse(x+(k-2)*2*s+sw,y-6*s-(k%2)*3*s,2.4*s,4*s,(k-2)*.4,0,7);c.fill()}c.fillStyle='rgba(255,255,255,.08)';c.beginPath();c.ellipse(x-1*s+sw,y-9*s,1.2*s,2*s,0,0,7);c.fill()}
function tdRug(x,y,w,d,col,edge){rect(x,y,w,d,col);rect(x+1,y+1,w-2,1,edge);rect(x+1,y+d-2,w-2,1,edge);rect(x+1,y+1,1,d-2,edge);rect(x+w-2,y+1,1,d-2,edge)}
function tdSock(x,y){rect(x-3,y-3,6,3,'#f4f0ea');rect(x+1,y-6,2,4,'#f4f0ea');rect(x-3,y-3,6,1,'#c2253a')}
const TDP={};/* per-map runtime state that doesn't need saving */
/* =========================================================== THE TRAILER =========================================================== */
const trPower=()=>!tdF('trip');
const trMain=()=>trPower()&&tdL('tr_main',!tdNight()||true)&&tdL('tr_main',1);
function trTrip(sc){tdSetF('trip');sfx('snap');TD.parts.push({k:'dust',x:sc.p.x,y:sc.p.y-20,vx:0,vy:-.1,t:0,m:60});
 const first=!tdF('tripOnce');tdSetF('tripOnce');
 tdSay(first?[['','Click. The fridge stops humming. The strip light dies mid-flicker. The kettle gives up halfway to a boil.'],['hitmeuppp','oh, fuck. the HEATER. i knew it. and the breaker’s outside, because of course the fucking breaker’s outside.'],tdNight()?['','In the dark something on the ceiling starts, very faintly, to glow.']:null]
  :[['','Click, and everything goes dark. The heater and the kettle went on together again and tripped the breaker.'],['hitmeuppp','every. fucking. time.']])}
tdMap('trailer',{floor:'lino',wall:'trailer',void:'#10140e',backLabel:'head out',
 rows:[
 '                          ',
 ' ###w#######w########     ',
 ' ###w#######w########     ',
 ' #.............#....######',
 ' #.............#....#gggg#',
 ' #.............D....#gggg#',
 ' #.............#....#gggg#',
 ' #.............#....#gggg#',
 ' #########D##########gggg#',
 '#gggggggggggggggggggggggg#',
 '#gggggggggggggggggggggggg#',
 '#ggggggggggggggggggggggggg',
 '#ggggggggggggggggggggggggg',
 '#gggggggggggggggggggggggg#',
 '#gggggggggggggggggggggggg#',
 '##########################'],
 zones:{trailer:{r:[2,3,13,5],floor:'lino',wall:'trailer',main:1,name:'Misaki’s trailer',walkr:[2,3,13,5],arrive:()=>[10,9,'u'],at:{'150,140':[10,9,'u']}},
  tbath:{r:[16,3,4,5],room:'trailer',floor:'tile',wall:'tile',name:'The tiny bathroom'},
  lot:{r:[0,9,26,7],room:'trailer',floor:'g',wall:'skin',out:1,name:'The lot'},
  side:{r:[21,3,5,6],room:'trailer',floor:'g',wall:'fence',out:1,name:'Behind the trailer'}},
 doorOpt:{'10,8':{label:o=>o?'Close the front door':'Open the front door',style:{col:'#8a3a3a',dk:'#6a2a2a',knob:'#e0d0a0',frame:'#4a4038'},onOpen:sc=>{if(sc.zone&&sc.zone.out&&tdNight()&&!tdF('kickDoor')){tdSetF('kickDoor');tdThink(tdWho()==='v'?'It sticks. You lift and push, the way she showed you.':'sticky. kick. there we go.')}}},
  '15,5':{label:o=>o?'Close the bathroom door':'Open the bathroom door',closed:1,style:{col:'#c8c0b0',dk:'#a8a090'}}},
 lights:[{x:120,y:70,r:96,i:.95,col:'225,240,255',flick:.25,on:()=>trPower()&&tdL('tr_main',1)},
  {x:290,y:76,r:46,i:.8,col:'230,240,255',on:()=>trPower()&&tdL('tr_bath',0)},
  {x:166,y:150,r:40,i:.7,col:'255,200,130',on:()=>tdNight()&&trPower()&&tdL('tr_porch',1)},
  {x:386,y:228,r:70,i:.8,col:'255,190,120',flick:.15,on:()=>tdNight()}],
 steam:[{x:198,y:44,on:()=>TDP.kettle>T,rate:.4},{x:296,y:60,on:()=>TDP.shower>T,rate:.6}],
 dust:1,winR:40,
 view:(x,y,w,h,i)=>{const sl=Math.min(S.slot,3);c.fillStyle=sl>=2?'#141018':'#4a5a4a';c.fillRect(x,y+h-5,w,5);if(sl>=2){rect(x+2,y+h-7,2,2,'#f2d24a');if(S.heat>=35&&!S.f.movedIn&&i===12)rect(x+6,y+h-4,5,2,'#6a6a72')}},
 under:sc=>{/* lot: puddles in the rain, tyre tracks */if(weather()==='rain')for(const [x,y,r] of [[60,180,14],[250,200,18],[140,226,10]]){c.fillStyle='rgba(120,150,190,.22)';c.beginPath();c.ellipse(x,y,r,r*.35,0,0,7);c.fill();const k=(T+x)%50;c.strokeStyle=`rgba(190,210,240,${.3-k*.006})`;c.beginPath();c.ellipse(x+3,y,k*.3,k*.1,0,0,7);c.stroke()}
  rect(40,212,300,2,'rgba(0,0,0,.12)');rect(40,222,300,2,'rgba(0,0,0,.12)');
  /* interior: dark when the power is out */
  if(!trPower()){c.fillStyle='rgba(0,0,10,.25)';c.fillRect(32,48,288,80)}},
 post:sc=>{if(!(TDP.stars>0))return;TDP.stars--;const a=Math.min(1,TDP.stars/60,(520-TDP.stars)/50);c.fillStyle=`rgba(2,4,8,${.55*a})`;c.fillRect(0,0,W,H);
  const G={'4':['1.1','1.1','111','..1','..1'],'9':['111','1.1','111','..1','111'],'.':['.','.','.','.','1'],'8':['111','1.1','111','1.1','111']};let ox=W/2-62;const oy=56;
  c.save();c.globalCompositeOperation='lighter';['4','9','.','8'].forEach(ch=>{const g=G[ch];g.forEach((r,j)=>[...r].forEach((v,i)=>{if(v!=='1')return;const x=ox+i*10,y=oy+j*10+Math.sin(T/40+i+j)*.4;const tw=.7+.3*Math.sin(T/25+i*3+j);c.globalAlpha=a*.35*tw;c.drawImage(tdGrad(9,'150,255,170'),x-9,y-9,18,18);c.globalAlpha=a*tw;rect(x-1,y,3,1,'#c8ffd0');rect(x,y-1,1,3,'#c8ffd0')}));ox+=ch==='.'?14:36});
  for(let k=0;k<26;k++){c.globalAlpha=a*(.25+.25*Math.sin(T/30+k));rect((k*71)%W,(k*37)%110+8,1,1,'#b8ffc0')}c.restore()},
 fg:[{x:60,y:132,par:.5,draw:(x,y,g)=>{for(let i=0;i<9;i++){const a=.5+.5*Math.sin(T/20+i);g.fillStyle=['rgba(255,210,122,','rgba(255,138,176,','rgba(138,212,255,'][i%3]+(.35+.4*a)+')';g.beginPath();g.arc(x+i*26,y+Math.sin(i*1.3)*5,3.5,0,7);g.fill()}},show:()=>trPower()&&tdL('tr_fairy',1)&&scene&&scene.zone&&scene.zone.id==='trailer'},
  {x:330,y:250,par:.45,blur:1.8,draw:(x,y,g)=>{g.fillStyle='rgba(40,56,34,.95)';for(let i=0;i<7;i++){g.beginPath();g.ellipse(x+i*8,y-(i%3)*6,5,16,(i-3)*.15,0,7);g.fill()}}},
  {x:-10,y:260,par:.45,blur:1.8,draw:(x,y,g)=>{g.fillStyle='rgba(36,48,30,.95)';for(let i=0;i<6;i++){g.beginPath();g.ellipse(x+i*9,y-(i%2)*8,6,18,(i-3)*.2,0,7);g.fill()}}}],
 leave:()=>[{t:'Head into the city',fn:()=>hub()}],
 props:[
  /* ---- the bed nook ---- */
  {id:'tr_bed',x:32,y:50,w:40,d:30,h:6,legacy:'Bed — sleep',label:'Bed',draw:(x,y)=>{tdBox(x,y,40,30,6,'#2a2440','#1e1a30','#3a3458');rect(x+2,y-4,10,24,'#e8e0f0');rect(x+12,y-5,27,28,S.f.movedIn?'#5a3a5a':'#3a2a5a');for(let i=0;i<6;i++)rect(x+15+(i*7)%22,y-2+(i*5)%20,2,2,'#f2d24a');rect(x+12,y-5,27,1,'rgba(255,255,255,.12)');if(tdF('plush'))rect(x+4,y+2,5,6,'#c98a3a')},
   act:(who,L,P,sc)=>{if(who==='v'){tdSay([['','Her bed. Unmade, three pillows, a duvet with stars on it. The stars are the same as the clip in her hair.'],['K9','I was not invited to sit on it. I will stand.']]);return}
    tdAsk('Her bed has the good pillow, the okay pillow, and one that’s just a hoodie.',[L&&{t:'Sleep',sub:'end the day',fn:L},{t:'Lie down for a minute',sub:tdNight()&&(!trPower()||!tdL('tr_main',1))?'it’s dark in here':'',fn:()=>trLie(sc)}])}},
  {id:'tr_stash',x:36,y:84,w:30,d:8,h:5,legacy:'Stash under the bed',label:'Stash crate',draw:(x,y)=>{tdBox(x,y,30,8,5,'#5a4630','#46361f','#6a5640');rect(x+4,y-3,8,2,'#2a2a2a');rect(x+16,y-3,10,2,'#8a8a96')}},
  {id:'tr_night',x:74,y:50,w:14,d:12,h:12,label:'Nightstand',draw:(x,y)=>{tdBox(x,y,14,12,12,'#6a4a32','#4e3622','#7a5a40');rect(x+3,y+2,8,1,'#2a1c12');rect(x+6,y+3,2,1,'#c9a050');const on=trPower()&&tdL('tr_lamp',0);rect(x+5,y-18,4,6,'#3a2a20');c.fillStyle=on?'#ffd27a':'#6a5a4a';c.beginPath();c.moveTo(x+2,y-18);c.lineTo(x+12,y-18);c.lineTo(x+10,y-24);c.lineTo(x+4,y-24);c.fill();if(tdF('phoneHere')||true){rect(x+1,y-14,4,6,'#141014');rect(x+2,y-13,2,4,(T>>5)%5===0&&S.unread?'#5fd4c4':'#2a3a4a')}},
   light:()=>trPower()&&tdL('tr_lamp',0)?{dx:7,dy:-16,r:44,i:.9,col:'255,190,120'}:null,
   act:(who,L,P,sc)=>{const on=tdL('tr_lamp',0);const ph=ROOMS.trailer.spots.find(s=>/^(Phone|Journal)/.test(s.label));
    if(who==='v'){tdAsk('A nightstand with a lamp with a scarf over it. The drawer is shut.',[{t:on?'Turn the lamp off':'Turn the lamp on',fn:()=>{tdSetL('tr_lamp',!on);if(!trPower())tdThink('Nothing. The power is out.')}},{t:'Open the drawer',fn:()=>tdSay([['K9','No.'],['','He takes his hand off the handle. That one is hers.']])}],'K9');return}
    tdAsk('The nightstand has a lamp with a scarf over the shade, the phone on its cable, and one drawer that sticks.',[{t:on?'Lamp off':'Lamp on',fn:()=>{tdSetL('tr_lamp',!on);if(!trPower())tdThink('click. click. ...oh right. breaker.')}},ph&&{t:'Phone',fn:()=>tdRunSpot(ph)},{t:trDrawerLabel(),fn:()=>trDrawer(sc)}])}},
  {id:'tr_posters',wall:1,x:34,y:18,w:44,d:30,legacy:'Posters',label:'Posters',draw:(x,y)=>{rect(x+2,y+3,14,20,'#141014');rect(x+4,y+6,10,6,'#c2253a');rect(x+4,y+14,10,1,'#f4f0ea');rect(x+20,y+2,12,16,'#e8dcc8');rect(x+22,y+5,8,5,'#3a3030');rect(x+22,y+12,8,1,'#c2253a');rect(x+34,y+6,9,13,'#2a3a5a');rect(x+36,y+9,5,1,'#f2d24a');rect(x+35,y+16,7,1,'#f2d24a')}},
  /* ---- living area ---- */
  {id:'tr_fairy',x:80,y:52,w:10,d:6,flat:1,solid:false,label:()=>tdL('tr_fairy',1)?'Fairy lights (on)':'Fairy lights',tagY:-30,draw:(x,y)=>{const on=trPower()&&tdL('tr_fairy',1);for(let i=0;i<16;i++){const cx=34+i*15,cy=20+Math.sin(i*.9)*3;rect(cx,cy,2,2,on?['#ffd27a','#ff8ab0','#8ad4ff'][(i+(T>>5))%3]:'#3a3440')}},
   light:()=>trPower()&&tdL('tr_fairy',1)?[{dx:-30,dy:-28,r:28,i:.35,col:'255,190,170'},{dx:60,dy:-28,r:28,i:.35,col:'200,190,255'},{dx:140,dy:-28,r:28,i:.3,col:'255,220,150'}]:null,act:()=>tdSetL('tr_fairy',!tdL('tr_fairy',1))},
  {id:'tr_shelf',x:96,y:48,w:22,d:8,h:28,legacy:'Manga shelf',label:'Manga shelf',draw:(x,y)=>{tdBox(x,y,22,8,28,'#4a3424','#3a2818','#5a4430');tdBooks(x+1,y-26,20,3,9)}},
  {id:'tr_crt',x:126,y:48,w:26,d:12,h:22,legacy:'CRT TV',label:'CRT TV',draw:(x,y)=>{tdBox(x,y,26,12,8,'#5a4630','#46361f');tdBox(x+3,y-8,20,10,14,'#2a2a30','#202026','#3a3a42');const on=trPower()&&tdL('tr_tv',1);rect(x+5,y-17,16,9,on?(['#3a5a8a','#5a3a6a','#2a6a5a','#7a5a3a'][(T>>6)%4]):'#14161a');if(on){for(let k=0;k<9;k+=2)rect(x+5,y-17+k,16,1,'rgba(0,0,0,.18)');rect(x+5+((T>>2)%14),y-15,2,2,'rgba(255,255,255,.5)')}},
   light:()=>trPower()&&tdL('tr_tv',1)?{dx:13,dy:10,r:46,i:.65,col:['120,160,255','200,140,255','120,230,200','255,200,140'][(T>>6)%4],flick:.4}:null,
   act:(who,L,P,sc)=>{const on=tdL('tr_tv',1);if(!trPower()){tdThink(who==='v'?'Dead. No power.':'no power, no tv, no horse show. tragic.');return}
    tdAsk(on?'The CRT hums. Somebody is selling a mop very aggressively.':'The CRT is off. You can see yourself in the curve of the glass.',[on&&L&&{t:'Watch for a bit',fn:L},{t:on?'Switch it off':'Switch it on',fn:()=>{tdSetL('tr_tv',!on);if(!on)tdThink(who==='v'?'It takes eleven seconds to warm up. He counts.':'*thunk* ...come on, you old bastard, warm up.')}},
     ])}},
  {id:'tr_table',x:124,y:80,w:30,d:12,h:6,legacy:'Laptop',label:'Laptop',draw:(x,y)=>{tdBox(x,y,30,12,6,'#7a5a3a','#5a4026','#8a6a4a');rect(x+3,y-5,12,7,'#1a1a22');rect(x+4,y-4,10,5,trPower()||true?'#2a4a5a':'#14161a');rect(x+4,y-4,(T>>3)%10,1,'#5fd4c4');rect(x+18,y-4,8,6,'#e8dcc8');rect(x+19,y-3,6,1,'#7a6a5a');rect(x+19,y-1,4,1,'#7a6a5a');if(tdF('note'))rect(x+26,y-5,3,3,'#f2d24a')},
   light:{dx:9,dy:-2,r:20,i:.5,col:'120,220,230'}},
  {id:'tr_beads',x:142,y:86,w:10,d:6,h:3,flat:1,legacy:'Bead box',label:'Bead box',solid:false,draw:(x,y)=>{rect(x,y,10,6,'#c2b0d8');for(let i=0;i<6;i++)rect(x+1+i*1.5,y+1+(i%2)*2,1,1,['#f2d24a','#ff8ab0','#8ad4ff'][i%3])}},
  {id:'tr_couch',x:120,y:104,w:44,d:16,h:10,legacy:'Couch — nap',label:'Couch',seat:tdSeat(138,118,'u'),zb:2,draw:(x,y)=>{tdBox(x,y,44,16,10,'#6a2a3a','#4a1e2a','#7a3a4a');rect(x,y-14,44,6,'#5a2232');rect(x-3,y-8,4,14,'#4a1e2a');rect(x+43,y-8,4,14,'#4a1e2a');rect(x+6,y-8,14,6,'#7a3a4a');rect(x+22,y-8,14,6,'#7a3a4a');if(tdF('blanket'))rect(x+26,y-9,14,8,'#5fd4c4')},
   act:(who,L,P,sc)=>{const opts=[{t:'Sit down',fn:()=>trSitCouch(sc,P)}];if(L&&who==='m')opts.push({t:'Nap',sub:'+energy',fn:L});const kn=ROOMS.trailer.spots.find(s=>s.label.startsWith('Half-finished knitting')&&(!s.show||s.show()));if(kn&&who==='m')opts.push({t:'Pick up the knitting',fn:()=>tdRunSpot(kn)});
    tdAsk(who==='v'?'The couch. It is lower than it looks. Everything in here is lower than it looks.':'the couch. it has a dip shaped exactly like me.',opts)}},
  {id:'tr_yarn',x:166,y:108,w:12,d:10,h:8,legacy:'Yarn basket',label:'Yarn basket',draw:(x,y)=>{tdBox(x,y,12,10,8,'#a8784a','#8a5a30');for(let i=0;i<3;i++){c.fillStyle=['#ff8ab0','#5fd4c4','#f2d24a'][i];c.beginPath();c.arc(x+3+i*3,y-8,2.4,0,7);c.fill()}}},
  {id:'tr_stream',x:100,y:66,w:12,d:8,h:4,legacy:'Stream setup',label:'Stream setup',draw:(x,y)=>{rect(x+5,y-22,2,24,'#3a3a42');c.strokeStyle=trPower()&&tdL('tr_ring',0)?'#fff4e0':'#6a6a72';c.lineWidth=2;c.beginPath();c.arc(x+6,y-26,5,0,7);c.stroke();c.lineWidth=1;rect(x,y,12,2,'#2a2a30')},
   light:()=>trPower()&&tdL('tr_ring',0)?{dx:6,dy:-20,r:40,i:.7,col:'255,244,230'}:null,
   act:(who,L)=>{const on=tdL('tr_ring',0);tdAsk(who==='v'?'A ring light, a microphone with a sock on it, and a webcam taped to a ruler.':'the stream corner: ring light, mic in a sock, webcam taped to a ruler. top production values.',[who==='m'&&L&&{t:'Go live',fn:L},{t:on?'Ring light off':'Ring light on',fn:()=>tdSetL('tr_ring',!on)}],who==='v'?'K9':null)}},
  {id:'tr_cables',x:94,y:78,w:24,d:12,clutter:.6,flat:1,solid:false,draw:(x,y)=>{c.strokeStyle='#141018';c.lineWidth=1;c.beginPath();c.moveTo(x,y+2);c.bezierCurveTo(x+8,y+12,x+12,y-2,x+24,y+8);c.moveTo(x+2,y+8);c.bezierCurveTo(x+10,y,x+16,y+14,x+22,y+3);c.stroke()},
   onWade:sc=>tdThink(tdWho()==='v'?'There are several cables here. He steps over them one at a time.':'it’s cable spaghetti, but i know which one is which. mostly.',150)},
  {id:'tr_laundry',x:174,y:84,w:18,d:14,clutter:.5,flat:1,solid:false,gone:()=>tdF('laundry'),label:'Laundry pile',draw:(x,y)=>{for(let i=0;i<7;i++){c.fillStyle=['#2a2a36','#c2253a','#f4f0ea','#3a3a5a','#141014'][i%5];c.beginPath();c.ellipse(x+3+(i*5)%14,y+4+(i*3)%8,5,3,i,0,7);c.fill()}},
   act:who=>{if(who==='v'){tdSay([['','A pile of clothes, clean or dirty impossible to say. He folds the top three. The fourth has a bloodstain set in badly: cold water and salt, had she asked him.']]);return}tdSetF('laundry');tdSay([['hitmeuppp','*kicks the pile into the corner* ...there. organised.']])},
   onWade:sc=>tdThink(tdWho()==='v'?'Something soft is under his shoe. It is only a sock.':'i’m wading through the laundry mountain. this is fine.',150)},
  /* ---- kitchenette ---- */
  {id:'tr_counter',x:176,y:48,w:46,d:12,h:16,legacy:'Kitchenette',label:'Kitchenette',act:(who,L,P,sc)=>tdAsk(who==='v'?'The kitchenette has two burners, one of which works, and a red kettle.':'two burners and only one works. the kettle does all the real cooking.',[{t:'Put the kettle on',fn:()=>trKettle(who,sc)},L&&{t:who==='v'?'Cook something / look':'Cook / noodles / recipes',fn:L}],who==='v'?'K9':null),draw:(x,y)=>{tdBox(x,y,46,12,16,'#b8b0a0','#8a7a6a','#d0c8b8');rect(x+3,y-14,8,6,'#2a2a30');rect(x+13,y-14,8,6,'#2a2a30');c.strokeStyle='#5a5a62';c.beginPath();c.arc(x+7,y-11,2,0,7);c.arc(x+17,y-11,2,0,7);c.stroke();if(TDP.kettle>T||TDP.burner>T){rect(x+5,y-12,4,1,'#ff6a2a')}rect(x+26,y-14,12,8,'#8a96a0');rect(x+27,y-13,10,6,'#5a6a7a');rect(x+12,y+4,2,2,'#5a5a62');rect(x+32,y+4,2,2,'#5a5a62');for(let i=0;i<3;i++)rect(x+40+i*2,y-15,1,4,'#e8d0a0')}},
  {id:'tr_kettle',x:192,y:50,w:8,d:6,h:2,flat:1,solid:false,draw:(x,y)=>{rect(x,y-9,8,7,'#c2253a');rect(x+1,y-11,6,2,'#a01a2a');rect(x+7,y-8,3,2,'#a01a2a');rect(x+1,y-8,2,2,'rgba(255,255,255,.3)')},
   kact:(who,L,P,sc)=>{if(!trPower()){tdThink(who==='v'?'The kettle is cold, and so is the trailer. She lives like this.':'no power. no tea. this is a hate crime.');return}
    TDP.kettle=T+300;sfx('chime');if(tdL('tr_heat',0)&&tdL('tr_main',1)){setTimeout(()=>{if(scene===sc&&!tdF('trip'))trTrip(sc)},1400);tdThink(who==='v'?'The kettle starts. The lights dip, very slightly.':'kettle on. lights did a little... wobble. hm.',120);return}
    apply({energy:3});tdSay([[tdN(),who==='v'?'He makes two cups. Hers goes in the mug with the cartoon knife on it. He knows which mug is hers because it is the only clean one.':pk(['tea. the cheap kind. the bag is older than some of my targets.','barley tea. tastes like being eight. gross. i’m having two.','hot water and a sad little bag. self-care.'])]])}},
  {id:'tr_fridge',x:224,y:48,w:14,d:12,h:30,legacy:'Fridge',label:'Fridge',draw:(x,y)=>{tdBox(x,y,14,12,30,'#e0e0d8','#b8b8b0','#f0f0e8');rect(x+1,y-12,12,1,'#a0a098');rect(x+11,y-24,1,6,'#8a8a82');rect(x+11,y-9,1,6,'#8a8a82');rect(x+2,y-26,4,4,'#f2d24a');rect(x+7,y-22,3,3,S.f.cg?'#8ad4ff':'#ff8ab0');if(tdAff(1))rect(x+3,y-18,5,5,'#c98a3a');if(tdAff(2))rect(x+3,y-12,6,3,'#fff4a0')}},
  {id:'tr_window',wall:1,x:190,y:16,w:20,d:32,legacy:'The little window',label:'The little window',draw:()=>{}},
  {id:'tr_cactus',wall:1,x:206,y:38,w:12,d:10,legacy:'Prickles',label:'Prickles the cactus',tagY:-6,draw:(x,y)=>{rect(x+2,y+4,7,5,'#a85a3a');rect(x+3,y-3,5,8,'#4a8a4a');rect(x+1,y,2,4,'#4a8a4a');rect(x+8,y-1,2,3,'#4a8a4a');if(S.f.prickBloom)rect(x+4,y-5,3,2,'#ff8ab0')}},
  {id:'tr_bills',x:190,y:80,w:22,d:12,h:10,legacy:'Bills',label:'Bills (and the table)',draw:(x,y)=>{tdBox(x,y,22,12,10,'#6a5a48','#4a3e30','#7a6a58');rect(x+2,y-9,8,6,'#f4f0ea');rect(x+3,y-8,6,1,S.paid>=2?'#3a8a4a':'#c2253a');rect(x+12,y-9,7,5,'#e8dcc8');if(tdF('coach'))rect(x+12,y-10,6,4,'#8ad4ff');rect(x-6,y+2,6,6,'#3a2a20');rect(x+22,y+2,6,6,'#3a2a20')},
   act:(who,L,P,sc)=>{const opts=[];if(L)opts.push({t:'The bills',fn:L});const rad=ROOMS.trailer.spots.find(s=>s.label==='Radio');if(rad)opts.push({t:'Radio',fn:()=>tdRunSpot(rad)});
    if(opts.length===1&&L)return L();tdAsk(who==='v'?'The fold-out table. Envelopes, a radio, a ring from a mug.':'the table. it’s also the desk. and the dining room. and the office.',opts)}},
  {id:'tr_binbag',x:226,y:100,w:14,d:12,h:12,legacy:'Bin bag of clothes',label:'Bin bag of clothes',draw:(x,y)=>{c.fillStyle='#141418';c.beginPath();c.ellipse(x+7,y+2,8,9,0,0,7);c.fill();rect(x+5,y-8,4,3,'#141418');rect(x+3,y-2,3,1,'rgba(255,255,255,.12)')}},
  {id:'tr_switch',x:142,y:120,w:8,d:6,flat:1,solid:false,label:()=>tdL('tr_main',1)?'Light switch (on)':'Light switch (off)',tagY:-8,draw:(x,y)=>{rect(x+2,y-4,4,6,'#e0d8c8');rect(x+3,y-3+(tdL('tr_main',1)?0:2),2,2,'#6a6a72')},
   act:who=>{const on=tdL('tr_main',1);tdSetL('tr_main',!on);if(!trPower())tdThink(who==='v'?'He flips it. Nothing. The breaker, then.':'click. nothing. BREAKER. right.')}},
  {id:'tr_heater',x:96,y:104,w:12,d:10,h:12,label:()=>tdL('tr_heat',0)?'Space heater (on)':'Space heater',draw:(x,y)=>{tdBox(x,y,12,10,12,'#d8d0c0','#a8a090');const on=trPower()&&tdL('tr_heat',0);for(let i=0;i<3;i++)rect(x+2,y-8+i*3,8,1,on?['#ff6a2a','#ff9a4a','#ff6a2a'][(i+(T>>4))%3]:'#5a5a5a')},
   light:()=>trPower()&&tdL('tr_heat',0)?{dx:6,dy:0,r:30,i:.55,col:'255,120,60'}:null,
   act:who=>{const on=tdL('tr_heat',0);tdSetL('tr_heat',!on);if(!on)tdThink(who==='v'?'Orange coils. The smell of dust burning off. It is very warm and very loud.':weather()==='snow'?'heater ON. toes: returning to the body.':'heater. it smells like burnt hair the first minute. that’s how u know it’s working.')}},
  /* ---- bathroom ---- */
  {id:'tr_shower',x:290,y:48,w:28,d:26,h:28,legacy:'Tiny shower',label:'Tiny shower',draw:(x,y)=>{rect(x,y-28,28,54,'rgba(190,210,220,.25)');rect(x,y-28,28,1,'#d0dce0');rect(x,y+25,28,1,'#9aa6aa');rect(x+12,y-26,4,3,'#8a96a0');if(TDP.shower>T)for(let i=0;i<6;i++)rect(x+6+i*3,y-22+((T*2+i*7)%40),1,3,'rgba(200,230,255,.7)');rect(x+1,y-26,2,52,'#e0a0c0')},
   act:(who,L)=>{if(L){TDP.shower=T+400;L()}else tdThink(who==='v'?'A shower the size of a phone box. He would have to go in sideways.':'not now.')}},
  {id:'tr_mirror',wall:1,x:258,y:20,w:16,d:28,label:'Mirror',draw:(x,y)=>{rect(x+2,y+2,12,14,'#8a96a0');rect(x+3,y+3,10,12,'#5a6a7a');rect(x+4,y+4,2,6,'rgba(255,255,255,.35)');rect(x+2,y+18,12,6,'#e8e8e0');rect(x+6,y+19,4,2,'#9aa6aa')},
   act:who=>trMirror(who)},
  {id:'tr_firstaid',x:258,y:100,w:14,d:10,h:6,legacy:'First-aid kit',label:'First-aid kit (shoebox)',draw:(x,y)=>{tdBox(x,y,14,10,6,'#e8dcc8','#c8b8a0');rect(x+5,y-5,4,4,'#c2253a');rect(x+6,y-6,2,6,'#c2253a')}},
  {id:'tr_toilet',x:282,y:98,w:12,d:14,h:10,label:'Toilet',draw:(x,y)=>{tdBox(x,y,12,8,12,'#e8e8e0','#c8c8c0');c.fillStyle='#f4f4ee';c.beginPath();c.ellipse(x+6,y+6,6,5,0,0,7);c.fill();c.fillStyle='#aab4b8';c.beginPath();c.ellipse(x+6,y+6,3.5,3,0,0,7);c.fill()},
   act:who=>tdSay([[tdN(),who==='v'?'He reads the sticker on the cistern. It says “JIGGLE THE HANDLE.” He jiggles the handle. It stops running. Crude, but serviceable.':pk(['the handle needs jiggling. everything in here needs jiggling.','someone wrote “ronin was here” on the cistern lid. in MY nail polish. asshole.'])]])},
  {id:'tr_bathlight',x:300,y:116,w:10,d:6,flat:1,solid:false,label:()=>'Bathroom light',tagY:-6,draw:(x,y)=>{rect(x+3,y-3,4,6,'#e0d8c8');rect(x+4,y-2+(tdL('tr_bath',0)?0:2),2,2,'#6a6a72')},act:()=>tdSetL('tr_bath',!tdL('tr_bath',0))},
  /* ---- the lot ---- */
  {id:'tr_steps',x:152,y:146,w:32,d:10,flat:1,solid:false,draw:(x,y)=>{rect(x,y,32,4,'#6a6a70');rect(x+4,y+4,24,4,'#5a5a60');rect(x,y,32,1,'#8a8a90')}},
  {id:'tr_chair',x:60,y:166,w:16,d:12,h:10,label:'Lawn chair',seat:tdSeat(68,176,'d'),draw:(x,y)=>{rect(x,y-10,16,10,'#3a8a8a');for(let i=0;i<4;i++)rect(x,y-10+i*3,16,1,'#f4f0ea');rect(x,y,16,8,'#3a8a8a');rect(x,y+8,1,4,'#8a8a90');rect(x+15,y+8,1,4,'#8a8a90');rect(x+20,y+2,10,8,'#7a5a3a');rect(x+22,y,6,2,'#3a3a3a')},
   act:(who,L,P,sc)=>trChair(sc,P)},
  {id:'tr_mail',x:20,y:200,w:10,d:8,h:20,label:'Mailbox',draw:(x,y)=>{rect(x+4,y-14,2,22,'#5a5a60');tdBox(x,y-6,10,8,8,'#c2253a','#8a1a2a');rect(x+9,y-16,1,6,'#f2d24a')},act:who=>trMail(who)},
  {id:'tr_post',x:352,y:58,w:12,d:12,h:30,label:'Power post & breaker box',draw:(x,y)=>{rect(x+5,y-40,3,52,'#5a4a3a');tdBox(x,y-6,12,8,12,'#7a8288','#5a6268');rect(x+2,y-16,8,6,'#3a4248');rect(x+3,y-15,2,4,tdF('trip')?'#c2253a':'#3a8a4a');rect(x+7,y-15,2,4,'#3a8a4a');c.strokeStyle='#141418';c.beginPath();c.moveTo(x+6,y-40);c.quadraticCurveTo(x-60,y-30,x-30,y-48);c.stroke()},
   act:(who,L,P,sc)=>trBreaker(who,sc)},
  {id:'tr_line',x:340,y:96,w:48,d:4,flat:1,solid:false,draw:(x,y)=>{c.strokeStyle='#c8c8c8';c.beginPath();c.moveTo(x,y-26);c.quadraticCurveTo(x+24,y-20,x+48,y-26);c.stroke();rect(x,y-28,1,30,'#6a5a4a');rect(x+47,y-28,1,30,'#6a5a4a');const sw=Math.sin(T/30)*1.5;[['#c2253a',6],['#141014',18],['#f4f0ea',30]].forEach(([col,o],i)=>{rect(x+o+sw*(i%2?1:-1),y-22,7,9,col);rect(x+o+1+sw*(i%2?1:-1),y-22,5,1,'rgba(255,255,255,.2)')})},
   label:'Washing line',act:who=>tdSay([[tdN(),who==='v'?'Three items: a band shirt, a black skirt, and a hoodie that is his. He leaves it. It has been hers for some time.':pk(['the line. the hoodie’s V’s. i stole it. it’s mine now, he can fight me.','if it rains on my washing ONE more time. seriously! life is so unfair.'])]])},
  {id:'tr_sedan',x:290,y:180,w:64,d:26,h:12,label:'Grey sedan',show:()=>tdWho()==='m'&&S.heat>=35&&!S.f.movedIn&&!(TDP.sedanGone>T),draw:(x,y)=>{tdBox(x,y,64,26,12,'#5a5a62','#46464e','#6a6a72');rect(x+14,y-10,36,20,'#2a2e36');rect(x+16,y-8,32,4,'rgba(140,160,200,.25)');rect(x-2,y+6,4,8,'#1a1a1e');rect(x+62,y+6,4,8,'#1a1a1e');if(tdNight()&&(T>>4)%9===0)rect(x+20,y-4,2,1,'#ff6a2a')},
   act:(who,L,P,sc)=>{TDP.sedanGone=T+99999;apply({heat:-2});tdSay([['','You walk right up to it. The windows are tinted. You see your own face in the glass and nothing behind it.'],['','You knock twice, politely.'],['','The engine turns over. The sedan reverses out of the lot without its lights on and is gone before the gravel settles.'],['hitmeuppp','yeah, fuck off. that’s what i thought.']])}},
  {id:'tr_vcar',x:290,y:180,w:64,d:26,h:12,label:'V’s car',show:()=>tdWho()==='v',draw:(x,y)=>{tdBox(x,y,64,26,12,'#141418','#0c0c10','#2a2a32');rect(x+14,y-10,36,20,'#1a1e26');rect(x+16,y-8,32,4,'rgba(140,160,200,.2)');rect(x+4,y+2,2,2,'#f4f0ea')},
   act:()=>tdAsk('His car, badly parked, which means he parked it in a hurry.',[{t:'Drive home',fn:()=>hub()}],'K9')},
  {id:'tr_cat',x:186,y:150,w:10,d:6,flat:1,solid:false,show:()=>!tdNight()&&weather()!=='rain'&&(S.day%3===1),label:'A stray cat',draw:(x,y)=>{rect(x+1,y-4,8,4,'#e0a060');rect(x+7,y-7,3,3,'#e0a060');rect(x+7,y-8,1,1,'#e0a060');rect(x+9,y-8,1,1,'#e0a060');rect(x,y-6+Math.sin(T/20),2,3,'#e0a060')},
   act:who=>{tdMark('cat_'+S.day);tdSay([[tdN(),who==='v'?'The cat looks at him. He looks at the cat. It smells the meat on his cuffs and decides they are friends.':pk(['hi sir. no i don’t have ham. i have NEVER had ham.','the landlord’s cat. or nobody’s cat. she sleeps on my step like she pays rent. she doesn’t. we have that in common.'])]])}},
  {id:'tr_lamppost',x:380,y:224,w:8,d:6,h:50,draw:(x,y)=>{rect(x+3,y-50,2,56,'#4a4a52');rect(x-4,y-52,14,4,'#3a3a42');c.fillStyle=tdNight()?'#ffd8a0':'#8a8a80';c.fillRect(x-2,y-48,10,2)}},
  {id:'tr_radioclaim',kind:'deco',z:'trailer',x:0,y:0,w:0,d:0,flat:1,solid:false,legacy:'Radio'},
  {id:'tr_knitclaim',kind:'deco',z:'trailer',x:0,y:0,w:0,d:0,flat:1,solid:false,legacy:'Half-finished knitting'},
  {id:'tr_exit',x:392,y:176,w:24,d:32,exit:sc=>sc.trans(()=>hub())}]});
function trKettle(who,sc){const P=TD.maps.trailer.props.find(q=>q.id==='tr_kettle');P.kact(who,null,P,sc)}
function tdAff(n){return S&&tier()>=n}
function trDrawerLabel(){const k=(S.td&&S.td.dr&&S.td.dr.tr)||0;return k>=4?'The drawer (empty-ish)':k?'Keep rummaging in the drawer':'Rummage in the drawer'}
const TR_DRAWER=[
 [['','Hair ties. A dead lighter. Four identical star clips, because she buys them in packs and loses them in fights.'],['hitmeuppp','three of these were lost in fights. one was lost in a ramen.']],
 [['','A drawing-tablet pen held together with a hair tie, the nib worn flat. Under it, printed invoices: COMMISSION — HEADSHOT, $25. COMMISSION — FULL BODY + BACKGROUND, $60. COMMISSION — “MY OC BUT SAD”, $40.'],['hitmeuppp','rent money. before the other kind of rent money.'],['hitmeuppp','i was good at faces. you have to look at someone for a really long time to draw them. that’s the same skill, it turns out.']],
 [['','A photocopied script, Kita High Drama Club (back in Japan): Twelfth Night. Viola’s lines are highlighted in three different colours.'],['hitmeuppp','yellow is what she says. pink is what she means. green is the bits i used to say in the mirror.'],['hitmeuppp','“i am not what i am.” ...ok, viola. relatable.']],
 [['','At the very bottom, under a flattened sock: a train ticket. One way, into the city. Eight years old. Punched.'],['hitmeuppp','the one i left on.'],['','She turns it over. On the back, in pencil, very small: “you’re allowed.”'],['hitmeuppp','i wrote that on the train. sixteen. i didn’t believe it. kept it anyway. in case.']]];
function trDrawer(sc){const t=tdS();const k=t.dr.tr||0;if(k>=4){tdSay([['hitmeuppp',pk(['that’s everything. that’s every important thing i own, in one drawer that sticks.','i put it all back in the same order. the ticket goes on the bottom. it holds everything else up.'])]]);return}
 t.dr.tr=k+1;save();sfx('step');tdSay(TR_DRAWER[k],()=>{if(k===3){tdSetF('drawerDone');toast('Something new to do at the table');note('td_drawer','Misaki keeps the ticket she left home on, the pen and invoices from when she drew commissions for rent, and a Twelfth Night script.')}})}
function trCoach(sc){tdSetF('coachStart');const pick=(t,line)=>({t,fn:()=>{tdSetF('coach');apply({aff:2,energy:6});if(typeof calm==='function'&&S.dark)calm(6);
  tdSay([['','She writes the first line three times. The third one stays.'],['hitmeuppp','“'+line+'”'],['','Then a paragraph that is mostly about a dog she knows. Then her address, which she has never written on anything that wasn’t a lie.'],['','It goes in her jacket pocket. It’ll get posted tomorrow, or it’ll sit in there for a month going soft.'],['hitmeuppp','...that was IT? eight years i was scared of a fucking horse card?']],()=>note('td_coach','Misaki finally wrote back to her old track coach.'))}});
 ask('hitmeuppp','A blank New Year card. Cartoon horse on the front. Eight years of “still fast?”',[pick('“yeah. still fast. different track.”','yeah. still fast. different track.'),pick('“sorry it took me eight years.”','sorry it took me eight years. i read every one.'),pick('“i’m ok. i think i’m actually ok.”','i’m ok. i think i’m actually ok. there’s a dog involved.'),{t:'Not tonight',fn:()=>{}}])}
function trLie(sc){const dark=!trPower()||(!tdL('tr_main',1)&&!tdL('tr_lamp',0));const night=tdNight();
 if(dark&&night){const first=!tdF('stars');tdSetF('stars');TDP.stars=520;
  tdSay(first?[['','She lies on her back. Her eyes adjust.'],['','On the ceiling, glow-in-the-dark stars. Someone arranged them: three digits, a dot, one more digit.'],['','4 9 . 8'],['hitmeuppp','forty-nine point eight.'],['hitmeuppp','my 400 at prefecture finals. i was the fastest girl in the prefecture for one whole summer.'],['hitmeuppp','stuck it up there the first night i had this place. everything else in here’s got a fake name on it. that one i actually ran.'],['hitmeuppp','...forgot it glows. you’ve got to turn everything off first.']]
   :[['','4 9 . 8, faintly green above her.'],['hitmeuppp',pk(['still true.','still the fastest anyone’s ever been in here.','i should show V. he’d get weird about it. ...maybe.'])]],()=>{apply({energy:4});if(first)note('td_stars','Misaki’s best 400m time, 49.8, is stuck to her trailer ceiling in glow-in-the-dark stars.')});return}
 if(night)tdSay([['','She lies down. The strip light buzzes. Through the ceiling, faintly, rain or the neighbour’s TV.'],['hitmeuppp','can’t sleep with that fucking light on. can’t be bothered to get up.']]);else tdSay([['','She lies down. Sun on the ceiling. Somebody in the next lot is mowing nothing in particular.'],['hitmeuppp',pk(['five minutes. i’m not sleeping. i’m resting my everything.','the ceiling’s got a water stain shaped like a dog. V would name it. V would feed it.'])]])}
function trSitCouch(sc,P){const vHere=sc.npcList.some(n=>n.k==='v');const mHere=sc.npcList.some(n=>n.k==='m');const who=tdWho();
 tdSit(sc,P,null);const L=who==='v'?(mHere?[['','He sits. The couch sinks. Misaki tips slightly towards him and doesn’t correct it.'],['hitmeuppp',MV('u broke the couch','the couch has never been this low. it’s scared of u','You make my couch look like doll furniture. Seriously! It’s obscene.','Stay there, babe. Don’t move. If the couch dies it dies, I’ll bill a client for a new one.')]]:[['','He sits. His knees end up somewhere near his chin.'],['K9','I see why she sits on the floor.']])
  :vHere?[['','You drop onto the couch. After a second V sits on the other end, leaving one cushion between you.'],['K9',byT('Is it meant to make that noise?','It is lower than I expected. Everything in here is lower than I expected.','It is crude, but serviceable. I have sat on worse for longer, waiting on worse people.','I will stay a while. You sleep badly when the lot is empty, and I have nothing to butcher tonight.')]]
  :[['','You drop onto the couch. It makes its usual noise, and you fit the dip.'],['hitmeuppp',S.dark?'back to the wall. door in view. ok. ok.':pk(['ahh. home.','if i sit really still the trailer stops rocking. (it’s not the trailer. shut up.)','this couch has seen some shit. three stitch-yourself jobs and one bazooka unboxing.'])]];
 tdSay(L)}
function trMirror(who){const k=tdS().cnt;k.mirror=(k.mirror||0)+1;save();
 if(who==='v')return tdSay([['','A mirror the size of a paperback. He has to bend to find his own face in it.'],['K9',pk(['I look tired. She would say I look “like a sad horse.” She would be correct.','There is a sticker in the corner of the glass: a small cartoon knife with a heart. She looks at this every morning. Good.'])]]);
 const L=S.f.hurt?'...that’s gonna go purple. purple’s fine. purple goes with everything.':S.dark?pk(['she looks fine. she always looks fine, so that doesn’t mean anything.','one: eyes open. two: four tiles behind you, count them. three: you’re here. ok.']):S.phase==='epilogue'?'i look older. less eyeliner, more sleep. who even is this.':k.mirror>3?'ok we’ve established i exist. stop checking.':pk(['eyeliner’s holding. it survived a whole chainsaw job. worth every yen.','hi. you look like someone who kills people for money. ...cute though.','star clip: straight. hair: crimes. face: acceptable.']);
 tdSay([['hitmeuppp',L]])}
function trChair(sc,P){const who=tdWho();tdSit(sc,P,null);const n=tdNight();
 tdSay(who==='v'?[['','He sits in her lawn chair. It creaks, then holds. The city does its night noise beyond the fence.'],['K9','She sits out here at two in the morning. She has an empty lot, one lamp, and a clear view in every direction. I would have chosen it too.']]
  :n?[['','You sit in the lawn chair. The city hums, and moths fry on the buzzing streetlamp.'],['hitmeuppp',S.heat>=35?'the grey car’s not here tonight. or it’s somewhere i can’t see, which is worse.':pk(['counting lit windows. it’s how you case a block. i’m off the clock and i’m still doing it.','sometimes i sit here till the birds start. loud little fuckers.','smoke? no. ...maybe. no.'])]]
  :[['','The lawn chair is warm from the sun. A plastic bag drifts across the lot like it has somewhere to be.'],['hitmeuppp',pk(['this is my garden. it’s gravel. it’s low maintenance.','if i squint the fence is a beach. i’m squinting. i’m on holiday.'])]])}
function trMail(who){if(who==='v'){tdSay([['','He does not open her mailbox. He straightens the flag, which was crooked, and leaves.']]);return}
 const t=tdS();if(t.f['mail'+S.day]){tdThink('already checked. it’s not gonna fill up just cos i stare at it.');return}t.f['mail'+S.day]=1;save();
 const L=S.paid<1&&S.day>=3?[['','A pink slip from the landlord. The pink ones are the angry ones.'],['hitmeuppp','PINK. he’s escalating.']]
  :S.f.cg&&!t.f.postcard?(t.f.postcard=1,[['','A postcard. No return address. A photo of a beach she has never been to.'],['','On the back, in V’s handwriting: “Wish you were here. You are, in fact, here. I wish it anyway.”'],['hitmeuppp','...he wrote “in fact” on a POSTCARD.']])
  :pk([[['','Pizza flyer. Gym flyer. A flyer for a psychic who says she already knows you’ll call.'],['hitmeuppp','then she knows i won’t.']],[['','Nothing. Just a spider who has made the mailbox his whole life.'],['hitmeuppp','respect.']],[['','A catalogue for garden furniture, addressed to the previous tenant, who is, according to the address label, “Occupant.”'],['hitmeuppp','occupant’s got good taste in chairs.']]]);
 tdSay(L)}
function trBreaker(who,sc){if(tdF('trip')){tdS().f.trip=0;save();sfx('chime');const first=!tdF('fixedOnce');tdSetF('fixedOnce');
  tdSay(first?[['','You thumb the breaker back up. Inside the trailer, the fridge clunks and starts humming like nothing happened.'],[tdN(),who==='v'?'He labels the breaker in tiny capitals with the pen in his breast pocket: “HEATER + KETTLE = NO.”':'heater OR kettle. not both. i say this every winter. every winter i forget.']]:[['','You flip the breaker back up, and the fridge starts humming again.']]);return}
 tdSay([['','Two breakers in a rusty box. One says TRAILER in marker. The other says DO NOT, also in marker.'],[tdN(),who==='v'?'He does not touch DO NOT. He respects a clear instruction.':'never touched DO NOT. i’ve defused bombs with less signage.']])}
