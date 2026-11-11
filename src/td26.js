/* ===================== td26: the pool, and after-the-job for Ronin and Angel =====================
   - B5's seed vault was a hydroponics project: grow tanks, nutrient water, lights. It devolved into a pool.
   - Ronin after a job: four-in-the-morning cooking, gospel radio, an apron over the shirt. He runs hot; he cannot
     sleep without the radio. The ice bath Angel walked in on.
   - Angel after a job: an hour of total silence; the rifle cleaned with the same cotton pads as her face.
     The time Ronin borrowed her setting spray.
   - Pool scenes for each of the four. Facts stated, not underlined. Voices: V never contracts. */
const k26Ok=()=>S&&S.phase!=='taken'&&!isLone()&&!(S.f&&S.f.abroad);
const k26M=()=>S.pov!=='v';

/* ---------- the pool (B5, the old seed vault) ---------- */
(function(){const M=TD.maps.deep;if(!M)return;const z=M.zl.find(z=>z.id==='dp_seeds');if(z){z.name='The pool (B5)';z.label=z.name}
 const D=M.doors&&M.doors['48,71'];if(D){D.label=o=>o?'Close it':'The pool (it was hydroponics, once)'}
 M.props.forEach(p=>{if(p.id==='sv_frost'||p.id==='sv_dragon')p.show=()=>false;if(p.id==='sv_drawers'||p.id==='sv_drawers2'){p.label='Old seed drawers';p.act=()=>tdSay([['','Drawers of seeds from when this was a grow room: tanks, nutrient lines, lights on timers. Most of the labels have gone soft in the damp.'],[tdN(),k26M()?MV('he was growing food down here. then he wasn’t.','it was a farm. now it’s a pool. he never said when it changed.','It was going to feed the house through a siege. It turned into a pool somewhere around the second winter.','He was going to grow enough down here to survive anything. Then he filled the biggest tank and got in, and that was that.'):'The plan was to grow enough to outlast anything. The tanks were already waterproof. The rest happened slowly, and then all at once one night in February.']])}});
 const X=TX(44),Y=TX(73),Wd=TX(10),Hd=TX(5);
 const pool={id:'k26_pool',flat:1,x:X,y:Y,w:Wd,d:Hd,h:0,label:'The pool',solid:false,draw:(x,y)=>{c.fillStyle='#0b2a33';c.fillRect(x,y,Wd,Hd);c.fillStyle='#123c48';c.fillRect(x+2,y+2,Wd-4,Hd-4);for(let k=0;k<14;k++){const wx=x+4+((k*37+(T>>2))%(Wd-8)),wy=y+4+((k*23)%(Hd-8));c.fillStyle='rgba(140,220,230,.18)';c.fillRect(wx,wy,6,1)}c.fillStyle='#5a6a70';c.fillRect(x-2,y-2,Wd+4,2);c.fillRect(x-2,y+Hd,Wd+4,2);c.fillRect(x-2,y,2,Hd);c.fillRect(x+Wd,y,2,Hd);
  c.fillStyle='rgba(90,255,190,.25)';for(let k=0;k<3;k++)c.fillRect(x+10+k*48,y-1,20,1)},light:{dx:Wd/2,dy:Hd/2,r:70,i:.35,col:'120,220,230',flick:.03},
  act:()=>k26Pool()};
 const edge={id:'k26_tank',x:TX(43)+2,y:TX(79),w:14,d:8,h:10,label:'A rusted nutrient tank',draw:(x,y)=>{tdBox(x,y,14,8,10,'#5a6a5a','#3a4a3a');rect(x+3,y-8,8,2,'#8a9a7a')},act:()=>tdSay([['','The last nutrient tank. The dial still reads PH 6.1. Somebody has hung a towel on the valve.']])};
 [pool,edge].forEach(p=>{p.map=M;p.w=p.w||TS;if(p.d===undefined)p.d=TS;if(p.solid===undefined)p.solid=!p.flat;M.props.push(p)});M.static=null})();
function k26Pool(){const m=k26M();const who=typeof dpCompanion==='function'?dpCompanion():null;
 ask(tdN(),m?'Green-blue water, warm, faintly mineral. The old grow lights still hum over it on their timers.':'The pool. Warm, still, the grow lights humming on their old timers.',[
  {t:m?'Go under':'Swim lengths',fn:()=>{if(S.dark&&typeof calm==='function')calm(6);apply({energy:-3});tdSay(m?[['','You sink to the bottom and sit there cross-legged, eyes open. The grow lights become one long smear of green. Nothing down here is looking at you.'],['','You stay until you decide to come up. You always decide. The water has never once decided for you.']]:[['','Forty lengths. You count them the way you count everything. On the turn at thirty you notice a hound lying at the edge, chin on the tile, watching the water like it is a doorway.']])}},
  {t:'Float',fn:()=>{apply({energy:4});tdSay([['','You float on your back with your ears under, so the whole building turns into a low hum. The pumps, the lights, the hounds breathing two walls away. All of it far off, and all of it on your side.']])}},
  {t:'Sit on the edge',fn:()=>tdSay([['','Feet in the water. The tank lights tick. '+(m?'You think about nothing for eleven minutes, which is a personal record.':'You do not think about the foundation for eleven minutes, which is a personal record.')]])}])}

/* ---------- scheduled scenes (share td22's spacing) ---------- */
K22EV.push(
 {id:'k26_ronin',when:()=>k26Ok()&&frT('r')>=1&&S.day>=7,run:done=>{const m=k26M();
  say([['',(m?'You':'You')+' let yourself into Ronin’s at four in the morning because he texted one word, “breakfast”, which means a job went well.'],
   ['','He is at the stove in an apron over a shirt that used to be white, frying eggs and bacon and something that might be a third kind of pork, with the gospel station on low. He does not sleep without that station. He has tried. He says the silence has opinions.'],
   [RN,'Sit, '+(m?'darlin’':'Vee')+'. Sit. Plate’s nearly up. I always cook after. Somethin’ about havin’ my hands in somethin’ that ain’t gonna testify.'],
   ['','He is barefoot on cold tile with the window open in November. Ronin runs hot. He has never once owned a winter coat; he says the Devil keeps him warm, and nobody has been able to prove otherwise.'],
   ['','He hums along to the choir. He knows every word. He was in one, once, before.'],
   [RN,'There. Eggs over easy. Don’t you dare say nothin’ about the shirt.'],
   [m?'hitmeuppp':'K9',m?MV('i wasn’t going to','i wasn’t going to say anything about the shirt','I was not going to say anything about the shirt.','Nice shirt.'):'I was not going to mention the shirt.'],
   [RN,'Liar. Eat.']],()=>{fr('r',4);apply({energy:6});done()})}},
 {id:'k26_ice',when:()=>k26Ok()&&frT('r')>=1&&frT('a')>=1&&!!S.seen.k26_ronin,run:done=>say([
   [AN,'(server) ok i need to tell the ronin ice bath story because he’s pretending it didn’t happen'],
   [RN,'(server) It didn’t happen.'],
   [AN,'(server) i went over to drop off his phone charger. door’s open. radio’s on. i go in the bathroom and he is in the TUB. full of ICE. eyes shut. grey. not moving. crowbar on his chest like a lily'],
   [AN,'(server) i screamed so loud the neighbour called the police. the police did not come because it’s ronin’s building and they don’t'],
   [RN,'(server) I was coolin’ down, darlin’. After work. Tryin’ somethin’ new. Good for the muscles.'],
   [AN,'(server) u opened ONE EYE and said “angel. you’re lettin’ the cold out.”'],
   [k26M()?'hitmeuppp':'K9',k26M()?'(server) did you close the door':'(server) Did you close the door?'],
   [AN,'(server) I CLOSED THE DOOR. and then i stood outside it for ten minutes with my hand on my heart like a victorian widow'],
   [RN,'(server) She brought me soup after. Real nice soup. That’s all I’m gonna say about it.']],()=>{fr('r',2);fr('a',2);done()})},
 {id:'k26_angel',when:()=>k26Ok()&&frT('a')>=1&&S.day>=9,run:done=>{const m=k26M();
  say([['','Angel’s studio after a job. The ring light is off. Angel does not speak for an hour after. She never has. Anybody who knows her knows to bring nothing but company.'],
   ['','She sits cross-legged on the floor with a bottle of micellar water and a bag of cotton pads, and takes her face off, one pad at a time. Then, with the same pads and the same bottle, she cleans the rifle.'],
   ['','Foundation, then scope. Mascara, then bolt. The pads go into one bag. She hands you the bag without looking at you, and you hold it, because that is the job.'],
   ['',m?'You sit on her bed and do not say anything, which you are good at.':'You sit on the edge of her bed and do not say anything, which she has told you is the most attractive thing about you.'],
   ['','At fifty-eight minutes she puts the rifle in its case under the bed, under the ring light, and looks up.'],
   [AN,'ok. hi. sorry. i’m back. do u want a face mask. i have the gold ones.'],
   [m?'hitmeuppp':'K9',m?MV('yeah','yeah. the gold ones.','Yes. The gold ones.','Yes. Thank you for letting me stay for the quiet part.'):'Yes. Thank you for letting me stay for the quiet part.'],
   [AN,'u’re the only ones i let stay for the quiet part. don’t make it weird. ok it’s a little weird. put ur mask on.']],()=>{fr('a',4);if(S.dark&&typeof calm==='function')calm(6);done()})}},
 {id:'k26_spray',when:()=>k26Ok()&&frT('a')>=1&&frT('r')>=1&&!!S.seen.k26_angel,run:done=>say([
   [AN,'(server) who used my setting spray'],
   [AN,'(server) the expensive one. the one in the gold bottle. it’s empty and there is GLITTER on the crowbar in the hall'],
   [RN,'(server) It said “lock it in all day”, darlin’. I took that as a promise.'],
   [AN,'(server) it’s for MAKEUP ronin'],
   [RN,'(server) Crowbar looks real good though. Holds a shine. Ain’t nothin’ sticks to it now.'],
   [AN,'(server) ...wait. nothing sticks to it?'],
   [RN,'(server) Nothin’.'],
   [AN,'(server) i’m ordering six more bottles. don’t tell my sponsor.'],
   ['K9','(server) Please do not put a product placement on the crowbar.']],()=>{fr('r',2);fr('a',2);done()})},
 {id:'k26_poolfour',when:()=>k26Ok()&&frT('r')>=1&&frT('a')>=1&&tier()>=1&&S.day>=12,run:done=>say([
   ['','Two in the morning, B5, the pool. All four of you, because the server agreed it was too hot to sleep and V’s house is the only place in the city with a pool nobody else knows about.'],
   ['','Ronin cannonballs in fully clothed and comes up singing. Angel sits on the edge with her feet in, filming nothing, for once. V swims lengths in perfect silence, counting. Misaki goes under and does not come up for a long time.'],
   [RN,'...She alright?'],
   ['K9','Give it a minute.'],
   [AN,'it’s been like two minutes'],
   ['K9','Give it another.'],
   ['','She comes up at four minutes ten, perfectly calm, and asks who ate the last of the crisps. Ronin crosses himself, backwards.'],
   ['','The grow lights tick over to their night cycle, the water goes dark green, and nobody goes upstairs until the sun is up somewhere far above them.']],()=>{fr('r',2);fr('a',2);apply({aff:2});done()})});

/* ---------- tone: the killing is a fact here, not a refrain ---------- */
(function(){try{K23_MORN.m.length=0;K23_MORN.v.length=0;}catch(e){}
 try{const i=TDREACT.findIndex(r=>r.id==='k23_think');if(i>=0)TDREACT.splice(i,1)}catch(e){}
 try{const keep={base:[0,1],ewing:[1],ops:[],roof:[],garage:[0,1],cellar:[0],deep:[0],trailer:[0,1],ronin:[0,1],studio:[0,1]};
  for(const k in K24_THINK){const P=K24_THINK[k];const ks=keep[k]||[];P.m=P.m.filter((x,i)=>ks.includes(i));P.v=P.v.filter((x,i)=>i===0&&!['base','ops','roof','deep'].includes(k))}}catch(e){}
 try{K24_RUMOUR.splice(0,K24_RUMOUR.length,'They say there is a house in the hills where the dogs do not bark.','They say a streamer with two million followers has never missed a shot.','They say the man who funds the shelters keeps very large dogs.')}catch(e){}})();
