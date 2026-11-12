/* ===================== THE BIRDCAGE (kc39) =====================
   A dream. A white birdcage the size of a cathedral, hung in stars; glass and crystal keepsakes on the floor. She
   touches a bar, it shatters, she falls, and lands on a giant snake with green eyes. Misaki's POV plays the dream;
   V's POV hears about it at breakfast. Drawn on the canvas in four stages (dcDraw). */
let DC={st:'cage',t:0,shards:null,pick:-1};
const DC_STARS=Array.from({length:180},(_,i)=>({x:(i*97)%320,y:(i*53+i*i*7)%180,s:(i%7===0)?2:1,p:i*1.7}));
const DC_KEEP=[['the rent receipt','A receipt, in glass. PAID, in letters that catch the light. You can read it through itself.'],
 ['the star clip','Your star clip, cut from crystal, as big as a hand. One point is chipped, the same point as the real one.'],
 ['a small cactus','A cactus made of green glass, every spine separate. It is in a glass pot with a label: DO NOT WATER.'],
 ['four hounds','Four hounds in clear crystal, curled into each other, nose to tail. The grey one is cloudier, the way old glass goes.'],
 ['a coat','A long coat in smoked glass, hung on nothing. The pockets are full of light.']];
function dcDraw(){const t=DC.t++;rect(0,0,W,H,'#03030a');
 DC_STARS.forEach(s=>{const fall=DC.st==='fall'?(t*3)%180:0;const y=(s.y-fall+180)%180;const a=.35+.35*Math.sin(t/30+s.p);c.fillStyle=`rgba(230,235,255,${a})`;c.fillRect(s.x,y,s.s,DC.st==='fall'?4:s.s)});
 if(DC.st==='cage'){const cx=160,base=150,top=22;
  c.strokeStyle='rgba(245,245,255,.85)';c.lineWidth=2;c.beginPath();c.ellipse(cx,base,118,14,0,0,7);c.stroke();
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2,x=cx+Math.cos(a)*118;const back=Math.sin(a)<0;c.strokeStyle=back?'rgba(220,220,240,.35)':'rgba(250,250,255,.95)';c.lineWidth=back?1.5:3;
   c.beginPath();c.moveTo(x,base+Math.sin(a)*14);c.quadraticCurveTo(cx+Math.cos(a)*112,top+18,cx,top);c.stroke()}
  rect(cx-3,top-12,6,12,'#f4f4ff');c.strokeStyle='#f4f4ff';c.lineWidth=2;c.beginPath();c.arc(cx,top-16,6,0,7);c.stroke();
  c.fillStyle='rgba(255,255,255,.05)';c.beginPath();c.ellipse(cx,base,118,14,0,0,7);c.fill();
  DC_KEEP.forEach((k,i)=>{const x=78+i*41,y=base-4+(i%2)*6,g=.5+.5*Math.sin(t/20+i);c.fillStyle=`rgba(180,220,255,${.35+.4*g})`;c.beginPath();c.moveTo(x,y-7);c.lineTo(x+4,y);c.lineTo(x,y+3);c.lineTo(x-4,y);c.fill();
   if(DC.pick===i){c.strokeStyle='#ffffff';c.lineWidth=1;c.strokeRect(x-6,y-9,12,14)}});
  spr(MIS,150,base-34,false,1.2)}
 else if(DC.st==='shatter'){if(!DC.shards)DC.shards=Array.from({length:140},()=>({x:160+rnd(-120,120),y:rnd(20,150),vx:rnd(-1.5,1.5),vy:rnd(-1,1.5),r:rnd(0,6)}));
  DC.shards.forEach(s=>{s.x+=s.vx;s.y+=s.vy;s.vy+=.04;s.r+=.1;c.save();c.translate(s.x,s.y);c.rotate(s.r);c.fillStyle='rgba(245,245,255,.8)';c.fillRect(-2,-1,4,2);c.restore()})}
 else if(DC.st==='fall'){c.save();c.translate(160,90);c.rotate(Math.sin(t/25)*.3);spr(MIS,-10,-24,false,1.2);c.restore()}
 else if(DC.st==='snake'){const g=c.createLinearGradient(0,60,0,180);g.addColorStop(0,'#0c1a10');g.addColorStop(1,'#050a06');
  for(let k=0;k<5;k++){c.fillStyle=g;c.beginPath();c.ellipse(160+Math.sin(k*1.7)*90,150-k*6+Math.sin(t/40+k)*2,170-k*18,26-k*2,0,0,7);c.fill();
   c.strokeStyle='rgba(60,110,70,.35)';c.lineWidth=1;for(let s=-6;s<=6;s++){c.beginPath();c.arc(160+Math.sin(k*1.7)*90+s*22,150-k*6,6,Math.PI,0);c.stroke()}}
  const blink=(t%240)<6;const ey=48;c.fillStyle='#0c1a10';c.beginPath();c.ellipse(160,ey+6,70,26,0,0,7);c.fill();
  if(!blink)[[-30],[30]].forEach(([dx])=>{const gl=c.createRadialGradient(160+dx,ey,1,160+dx,ey,16);gl.addColorStop(0,'rgba(120,255,140,.5)');gl.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gl;c.fillRect(160+dx-16,ey-16,32,32);
   c.fillStyle='#4fe07a';c.beginPath();c.ellipse(160+dx,ey,9,6,0,0,7);c.fill();c.fillStyle='#061008';c.fillRect(160+dx-1,ey-5,2,10)});
  spr(MIS,150,118,false,1.2)}
 hudBar('','')}
function birdcageDream(done){DC={st:'cage',t:0,shards:null,pick:-1};go({draw:dcDraw});
 say([['','You are standing in a birdcage.'],
  ['','It is white, and it is enormous. The bars are each as thick as a tree and so far apart you could walk between two of them with your arms out. They curve up and meet a long way overhead in a ring, the way the ribs of a roof meet, and from the ring hangs nothing. It is less a cage than a cathedral.'],
  ['','Outside the bars there is no room and no floor. There are stars, and behind them more stars, and behind those more, all the way down.'],
  ['','The floor of the cage is scattered with things made of glass and crystal. They are all yours.']],()=>look());
 function look(){const o=DC_KEEP.map((k,i)=>({t:'Pick up '+k[0],dis:DC.pick===i,fn:()=>{DC.pick=i;say([['',k[1]],['hitmeuppp',MV('(mine.)','(that’s mine. i didn’t know i had it in glass.)','(That’s mine. I didn’t know I’d kept it.)','(That’s mine. I never kept anything long enough for it to turn to glass. Apparently I did.)')]],look)}}));
  o.push({t:'Touch a bar',fn:touch});ask('hitmeuppp','(The bars hum, very faintly, like a glass when you run a wet finger round it.)',o)}
 function touch(){say([['','You put your hand flat on the nearest bar. It is warm. It is not glass. It is not bone either, though you thought for a second that it was.'],
   ['','It hums once, louder.']],()=>{DC.st='shatter';DC.t=0;say([['','The whole cage goes at once. There is no noise. Every bar and every keepsake comes apart into pieces as small as salt, and the pieces go out into the stars and are gone, and there is nothing under your feet.']],()=>{DC.st='fall';say([
    ['','You fall.'],['','You fall for a long time. The stars go past you upward. You are not frightened. You notice that you are not frightened, and that is the only thing in the dream that feels strange.']],()=>{DC.st='snake';DC.t=0;say([
    ['','You land on something that gives, very slightly, the way a body does.'],
    ['','It is a snake. It is so large that you are standing on one coil and you can see four more going away from you into the dark, each as wide as a road, and the scales under your bare feet are warm.'],
    ['','The head rises up in front of you, slowly, until it is higher than you. It looks at you.'],
    ['','It has green eyes.'],
    ['hitmeuppp',MV('(...oh.)','(oh. hi.)','(Oh. Hello.)','(Oh. It’s you. ...I don’t know who you are. It’s you, though.)')]],()=>ask('hitmeuppp','(It is waiting.)',[
     {t:'Sit down on the coil.',fn:()=>end('sit')},{t:'Put your hand on its head.',fn:()=>end('touch')},{t:'Ask it what it is.',fn:()=>end('ask')}]))})})})}
 function end(k){S.f.dreamCage=k;save();say([k==='sit'?['','You sit down. The coil is warm. The snake lowers its head next to you and keeps watching, and you lean on it, and the green eyes stay open, and that is how you fall asleep inside the dream.']
   :k==='touch'?['','You put your hand on its head, between the eyes. It closes them. It is the first thing in the whole dream that does what you expected.']
   :['','You ask it what it is. It does not answer. It moves its head closer, very slowly, until one green eye is level with your face, and in it you can see the cage, whole again, very small and very far away.'],
  ['','You wake up.']],()=>{go(cutBg('#05040a'));say([['',S.f.movedIn||S.room==='bedroom'?'It is early. The house is quiet. One of the hounds is lying across the end of the bed, and its eyes are open in the dark.':'It is early. The trailer ticks as it warms up. Outside, one of the hounds V lends you is asleep against the step.'],
   ['hitmeuppp',MV('(weird.)','(weird dream. good weird.)','(That was a strange dream. Not a bad one.)','(I’ve never dreamed about anything that wasn’t a room I had to get out of. That one had a way out, and I didn’t even want it.)')]],done)})}}
EVENTS.push({id:'dream_cage',when:()=>{try{return S.pov!=='v'&&!isLone()&&S.phase!=='taken'&&!(S.kd&&S.kd.med)&&S.day>=4&&tier()>=1}catch(e){return false}},run:done=>birdcageDream(done)});
EVENTS.push({id:'dream_cage_v',when:()=>{try{return S.pov==='v'&&!isLone()&&S.phase!=='taken'&&!(S.kd&&S.kd.med)&&S.day>=5&&tier()>=2}catch(e){return false}},run:done=>{S.f.dreamCageV=1;save();say([
 ['','At breakfast Misaki tells him a dream, between mouthfuls, the way she tells him about jobs: a white birdcage as big as a cathedral, hung in stars. Glass on the floor, all of it hers. She touched a bar and the whole thing broke, and she fell, and landed on a snake.'],
 ['hitmeuppp',MV('it had green eyes.','huge snake. it had green eyes.','It was a huge snake. It had green eyes.','A snake the size of a motorway. Green eyes. It just looked at me. I wasn’t even scared, which, rude, I wanted to be scared.')],
 ['K9','What did you do?']],()=>ask('K9','(She is waiting to see what he makes of it.)',[
  {t:'“What did you do?” (listen)',fn:()=>{apply({aff:2});say([['hitmeuppp',MV('sat on it.','i sat on it. it let me.','I sat on it. It let me.','I sat down on it and leaned on it and fell asleep. In the dream. Is that allowed? It felt allowed.')],['K9','It sounds allowed.'],['','He writes “birdcage, stars, snake, green” at the bottom of the page he keeps of things she has said, and does not say what he thinks it means.']],done)}},
  {t:'“Cages do not usually break when touched.”',fn:()=>{apply({aff:1});say([['hitmeuppp',MV('this one did.','this one did. one finger.','This one did. One finger.','This one did. One finger and it went, like it had been waiting for somebody to try.')],['K9','Then it was not much of a cage.'],['hitmeuppp',MV('no.','no. it was pretty though.','No. It was pretty, though.','No. It was really beautiful, though. I miss it a bit. Is that stupid.')]],done)}}]))}});
