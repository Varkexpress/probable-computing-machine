/* ===================== LATE NIGHT: who is asleep, and what you do about it ===================== */
const LATE=()=>S&&S.slot>=3&&!S.dark&&S.phase!=='taken'&&!isLone();
const youV=()=>tdWho()==='v';
/* where people sleep */
const sleepsV=()=>LATE()&&!youV();
const sleepsM=k=>LATE()&&youV()&&(k==='base'?!!S.f.movedIn:!S.f.movedIn);
const sleepsR=()=>LATE()&&!(S.vrom==='r'&&youV()&&false);
const sleepsA=()=>LATE();
/* V stops wandering the house at night: he's in bed */
const _vwNight=vWhere;vWhere=function(){if(LATE()&&S.pov!=='v'&&S.visitAs!=='v')return'bedroom';return _vwNight()};
/* a figure under a blanket */
function zzz(x,y){for(let k=0;k<3;k++){const t=(T/50+k*.33)%1;c.globalAlpha=1-t;txt('z',x+k*3+t*6,y-t*14,'#c8c0e0',5+k,'left')}c.globalAlpha=1}
function sleeper(x,y,hair,skin,blanket,flip){const b=Math.sin(T/45)*.6;c.fillStyle=blanket;c.beginPath();c.ellipse(x+(flip?-8:8),y+4+b*.5,16,7,0,0,7);c.fill();c.fillStyle='rgba(255,255,255,.12)';c.fillRect(x+(flip?-20:-4),y+1,24,1);
 c.fillStyle=skin;c.beginPath();c.arc(x+(flip?10:-10),y,4,0,7);c.fill();c.fillStyle=hair;c.beginPath();c.arc(x+(flip?11:-11),y-1,4.6,Math.PI*.9,Math.PI*2.1);c.fill();zzz(x+(flip?6:-14),y-6)}
function sleepMenu(name,pron,opts){ask(tdN(),`${name} is sleeping. Best not wake ${pron}.`,opts.filter(Boolean))}
/* ---------- V, asleep (Misaki's side) ---------- */
TD.maps.ewing.props.push({id:'sl_v',x:124,y:58,w:48,d:24,flat:1,solid:false,show:()=>sleepsV(),label:'V (asleep)',draw:(x,y)=>sleeper(x+20,y+8,'#2a1810','#6e4a32','#3a4a6a',false),
 act:()=>sleepMenu('V','him',[
  {t:'Let him sleep.',fn:()=>{apply({aff:1});tdSay([['','He sleeps on his back like a man laid out for a viewing, one hand hanging off the bed where Biscuit can reach it. You close the door to the width of a dog.']])}},
  {t:'Pull the blanket up.',fn:()=>{apply({aff:2});tdSay([['','He doesn’t wake. As you tuck the edge he says your name, once, quietly, not to you. Then he turns over.'],['hitmeuppp',MV('(gross. cute. gross.)','(...ok that was cute.)','(He said my name in his sleep. I’m going to think about that until I die.)','(He says my name in his sleep like it’s something he’s holding onto.)')]])}},
  {t:'Wake him.',fn:()=>{tdSay([['','Your hand is still an inch from his shoulder when his eyes open, already awake, already reaching for something on the nightstand that isn’t there any more.'],['K9','...Misaki. What is wrong.'],['hitmeuppp',MV('nothing. couldn’t sleep.','nothing. couldn’t sleep. sorry.','Nothing. I couldn’t sleep.','Nothing’s wrong. I just wanted to see you were here.')],['K9','Then neither can I. Kettle?']],()=>talkV('atrium'))}},
  tier()>=2?{t:'Lie down on top of the covers, just for a minute.',fn:()=>{apply({aff:3});if(typeof calm==='function')calm(6);tdSay([['','You lie down on the very edge, on top of the covers, shoes still on. He doesn’t wake. Without opening his eyes he moves over, exactly enough.'],['','“Just for a minute” turns out to be until the birds start.']])}}:null])});
/* ---------- Misaki, asleep (V's side) ---------- */
const mSleep=where=>()=>sleepMenu('Misaki','her',[
 {t:'Let her sleep.',fn:()=>{tdSay([['','She sleeps curled around a gun case like a cat round a radiator, one star clip still in. Her phone is face-down next to her, still on the server.'],['K9','(She looks younger asleep. She would hate that I noticed.)']])}},
 where==='trailer'?{t:'Leave a note on the fridge.',fn:()=>{S.f.fridgeNote=(S.f.fridgeNote||0)+1;apply({aff:2});save();tdSay([['','You write it on a sticky note and put it under the strawberry magnet: “Eat. —V”.'],['K9',S.f.fridgeNote>1?'(There are '+S.f.fridgeNote+' of them now. She has kept every one. They are in a row.)':'(She will pretend she didn’t see it. She will eat.)']])}}:{t:'Put a glass of water by her side of the bed.',fn:()=>{apply({aff:2});tdSay([['','You set it down without a sound. In the morning it will be empty and she will say nothing about it, and that will be how you know.']])}},
 {t:'Wake her.',fn:()=>tdSay([['','There is a knife at your throat before her eyes are open. Then the eyes open.'],['hitmeuppp',MV('oh. it’s u. what.','oh. it’s you. what. what time is it.','Oh. It’s you. ...What’s wrong?','It’s you. Sorry. Sorry. Habit. What’s wrong?')],['K9','Nothing. I am sorry. Go back to sleep.'],['hitmeuppp',MV('no ur here now. sit','no, you’re here now. sit.','You’re already here. Sit with me.','Stay. You woke me up, so now you have to stay.')]],()=>convo('m',where))},
 tier()>=2?{t:'Sit with her until she settles.',fn:()=>{apply({aff:3});tdSay([['','She is having a bad one. Her hands keep closing on nothing. You sit on the floor with your back to the bed and say the dogs’ names, quietly, in order, until her breathing slows.'],['K9','(Biscuit. Mochi. Sergeant. Max. Biscuit. Mochi...)']])}}:null]);
TD.maps.trailer.props.push({id:'sl_m_tr',x:30,y:54,w:44,d:22,flat:1,solid:false,show:()=>sleepsM('trailer'),label:'Misaki (asleep)',draw:(x,y)=>sleeper(x+22,y+8,'#1b1626','#f0c8a8','#5a3a5a',false),act:mSleep('trailer')});
TD.maps.ewing.props.push({id:'sl_m_bd',x:150,y:58,w:30,d:24,flat:1,solid:false,show:()=>sleepsM('base'),label:'Misaki (asleep)',draw:(x,y)=>sleeper(x+12,y+8,'#1b1626','#f0c8a8','#c2253a',true),act:mSleep('atrium')});
/* ---------- Ronin, asleep on the couch ---------- */
TD.maps.ronin.props.push({id:'sl_r',x:142,y:104,w:58,d:14,flat:1,solid:false,show:()=>sleepsA(),label:'Ronin (asleep)',draw:(x,y)=>{sleeper(x+28,y+2,'#3a2a2a','#f0d0b8','#4a1424',true);rect(x+8,y-4,22,2,'#8a8a96')},
 act:()=>sleepMenu('Ronin','him',[
  {t:'Let him sleep.',fn:()=>{fr('r',1);tdSay([['','He sleeps with the good crowbar tucked under one arm like a teddy bear. Heathers is still playing, on mute, on the croquet lawn.']])}},
  {t:'Turn off the TV.',fn:()=>{fr('r',1);tdSay([['','The second the screen goes dark, without opening his eyes:'],[RN,'I was watchin’ that.'],['','He was not. He’s asleep again before you’ve put the remote down.']])}},
  {t:'Put a blanket over him.',fn:()=>{fr('r',2);tdSay([['','You drape the throw over him. In his sleep he mutters “June, quit it,” and pulls it up to his chin.'],['','You leave in your socks.']])}},
  {t:'Wake him.',fn:()=>{fr('r',1);tdSay([['','Wrong move. You are on the floor before you know you’ve fallen, a crowbar resting politely on your collarbone.'],[RN,'...Oh. It’s you, darlin’. Coulda knocked. ...Coffee?']])}}])});
TD.maps.ronin.props.forEach(p=>{if(p.id==='sl_r')p.zb=4});
const _rnNpc=ROOMS.ronin.npcs;ROOMS.ronin.npcs=()=>{const L=_rnNpc?_rnNpc():[];return LATE()?L.filter(n=>!/Ronin/.test(n.label||'')):L};
/* ---------- Angel, asleep on the daybed in the set ---------- */
TD.maps.studio.props.push({id:'sl_daybed',x:TX(27),y:TX(7)+2,w:44,d:14,h:8,label:'Daybed',draw:(x,y)=>{tdBox(x,y,44,14,8,'#f8d8e8','#e0b8c8','#ffe8f0');rect(x+2,y-10,10,5,'#ffffff')},act:who=>tdSay([['',who==='v'?'A daybed covered in eleven cushions. One of them has your face printed on it. You decide not to ask.':'a daybed with eleven cushions. one has V’s face on it. she said it was “for a bit.” it is not for a bit.']])},
 {id:'sl_a',x:TX(27),y:TX(7),w:44,d:14,flat:1,solid:false,show:()=>sleepsA(),label:'Angel (asleep)',draw:(x,y)=>{sleeper(x+22,y-2,'#f2a0b8','#f4e0d0','#ff8ab0',false);c.fillStyle='rgba(255,255,255,.75)';c.fillRect(x+9,y-5,6,4)},
  act:()=>sleepMenu('Angel','her',[
   {t:'Let her sleep.',fn:()=>{fr('a',1);tdSay([['','Full sheet mask, satin bonnet, an alarm on the floor set for 5:00 labelled GLOW UP OR DIE. She is snoring, very slightly, in a way she would deny under oath.']])}},
   {t:'Turn the ring light off.',fn:()=>{fr('a',1);tdSay([['','The ring light clicks off. From under the sheet mask: “thanks babe… contour… the jaw is a lie…” and then nothing.']])}},
   {t:'Fix her bonnet, it’s slipping.',fn:()=>{fr('a',2);tdSay([['','You tug it back over her hair. She smiles in her sleep and says “i know, i know, i look amazing,” to nobody.']])}},
   {t:'Wake her.',fn:()=>{fr('a',1);tdSay([['','She sits bolt upright, hits you with a cushion, then hugs the cushion.'],[AN,'is someone dead. who do i have to kill. give me two minutes, i need my lashes.']])}}])});
const _stNpc=ROOMS.studio.npcs;ROOMS.studio.npcs=()=>{const L=_stNpc?_stNpc():[];return LATE()?L.filter(n=>!/Angel/.test(n.label||'')):L};
for(const id of ['ewing','trailer','ronin','studio']){const M=TD.maps[id];M.props.forEach((p,n)=>{p.id=p.id||id+'#n'+n;p.map=M;if(p.solid===undefined)p.solid=!p.flat&&!p.wall&&!p.exit;p.w=p.w||TS;p.d=p.d===undefined?TS:p.d})}
/* ---------- waking in the middle of the night ---------- */
function nightWake(go){const v=S.pov==='v',moved=!!S.f.movedIn,t=tier();let L,O;
 if(S.rom&&!v){const N=romName(),W=romWho();L=[['','You wake at 3:12 with your heart going for no reason. The phone glows on the floor.']];O=[
  {t:`Go to ${N}’s place.`,fn:()=>{fr(S.rom,3);say(S.rom==='r'?[['','You climb his fire escape. The window is already open. He’s sitting up in the dark with the crowbar across his knees.'],[RN,'Heard you comin’ three streets off, darlin’. Get in. Kettle’s on.']]:[['','You knock once. Angel opens the door already holding a second sheet mask.'],[AN,'i KNEW it. i had a feeling. get in. we’re doing the cucumber ones.']],go)}},
  {t:'Text instead.',fn:()=>say([['hitmeuppp','(text) u up'],[W,S.rom==='r'?'(text) always, darlin’.':'(text) obviously. call me. no wait FaceTime me, i look cute.']],go)},
  {t:'Go back to sleep.',fn:go}]}
 else if(S.vrom&&v){const N=vromName(),W=vromWho();L=S.vrom==='r'?[['','4:02. A soft thud on the roof. Then another. Then someone very large trying, and failing, to be quiet on your skylight.']]:[['','3:47. Your phone lights up. A photo: Angel in a sheet mask, giving the camera a thumbs-up, captioned “cant sleep. thinking abt ur pores.”']];O=[
  {t:S.vrom==='r'?'Open the skylight.':'Call her.',fn:()=>{fr(S.vrom,3);say(S.vrom==='r'?[[RN,'Evenin’. Couldn’t sleep. Brought crumble.'],['K9','It is four in the morning.'],[RN,'Breakfast crumble, then.']]:[[AN,'you CALLED. nobody calls. i’m going to cry. okay tell me about your day. all of it. start with the soap.']],go)}},
  {t:'Go back to sleep.',fn:go}]}
 else if(!v&&moved){L=[['','You wake at 3:12. The house is so quiet you can hear the server racks two floors down. His door is at the end of the hall.'],['hitmeuppp','(go to his room?)']];O=[
  {t:t>=2?'Go. Don’t knock.':'Go. Knock first.',fn:()=>{apply({aff:t>=2?3:2});if(typeof calm==='function')calm(5);say(t>=2?[['','You slip in without knocking. He lifts the blanket without opening his eyes, like he was waiting.'],['K9','(asleep, almost) ...Cold feet.'],['hitmeuppp','deal with it.']]:[['','You knock, very softly. The door opens immediately. He was awake.'],['K9','Couldn’t sleep either?'],['hitmeuppp','...no.'],['K9','Kettle, then. The dogs will want to be involved.']],go)}},
  {t:'Go to the kennel instead.',fn:()=>{if(typeof calm==='function')calm(4);say([['','You sleep on the kennel floor in a pile of dogs. Biscuit puts her chin on your neck like a seatbelt.']],go)}},
  {t:'Stay in bed. Stare at the ceiling.',fn:go}]}
 else if(!v){L=[['','You wake at 3am in the trailer. Something outside — wind, probably. Your hand is already under the pillow.'],['hitmeuppp','(text him?)']];O=[
  {t:'Text him “u up”.',fn:()=>{apply({aff:2});say([['hitmeuppp','(text) u up'],['K9','(text, nine seconds later) I am up.'],['K9','(text) Do you want me to drive by? I will not stop. I will just drive by.'],['hitmeuppp',MV('(text) no. ...maybe. no.','(text) no. stay. just text me till i fall asleep','(text) No. Just stay on the phone a bit?','(text) Don’t drive by. Come in. The door’s open.')]],go)}},
  {t:'Check the lot. Barefoot. With the gun.',fn:()=>say([['','Nothing. A cat on the bonnet of a car. Stars. You stand there anyway until your feet go numb.']],go)},
  {t:'Go back to sleep.',fn:go}]}
 else{L=moved?[['','4:00. Habit. You are awake before you know why. Down the hall, her door is open a crack, the way she leaves it.'],['K9','(Go and check on her?)']]:[['','4:00. Habit. You are awake before you know why. You think about the trailer, the lot, the fence with the gap in it.'],['K9','(She asked you once not to drive by at night. Do you?)']];O=moved?[
  {t:'Look in. Don’t go in.',fn:()=>{apply({aff:1});say([['','She’s asleep sideways across the bed with Mochi. One sock on. You stand in the doorway for one minute exactly, by your watch, and go back to bed.']],go)}},
  {t:'Go in and sit for a while.',fn:()=>{apply({aff:2});say([['','You sit in the chair by her window. She half-wakes, sees you, says “creep” very fondly, and goes back to sleep.']],go)}},
  {t:'Go down to the library instead.',fn:()=>say([['','You read under the tree until the light well turns grey. It is the only kind of night that ever ends well.']],go)}]:[
  {t:'Respect it. Stay home.',fn:()=>{apply({aff:2});if(typeof relApply==='function')relApply({trust:3});say([['','You don’t go. You sit in the chair by the front door instead, with the phone face-up on your knee, until it is light.']],go)}},
  {t:'Text her instead.',fn:()=>say([['K9','(text) Are you safe?'],['hitmeuppp',MV('(text) yes grandpa. go to bed','(text) yes. go to bed v','(text) Yes. Thank you for asking instead of driving.','(text) Yes. And thank you for texting instead of coming. I noticed.')]],go)},
  {t:'Drive by. Just once.',fn:()=>{if(typeof relApply==='function')relApply({tension:4});say([['','You drive by. Once. Her light is off. On the way back you see her text: “i can hear ur car v. go home.”']],go)}}]}
 cut(L,()=>ask(v?'K9':'hitmeuppp','(...)',O),'#06050c')}
const _slNW=sleep;sleep=function(){if(S&&!S.dark&&S.phase!=='taken'&&!isLone()&&S.day>=3&&Math.random()<.3&&(tier()>=1||S.rom||S.vrom)){const go=()=>_slNW();return nightWake(go)}return _slNW()};
/* friends call at night too */
EVENTS.push({id:'nw_angel3am',when:()=>frT('a')>=2&&!S.dark&&S.phase!=='taken',run:done=>say([['','3:30am. A call from Angel. No hello.'],[AN,'are you asleep. don’t answer that. i had the dream again. the one with the comments. can you just stay on the line while i make tea.'],['','You stay on the line. She makes tea, and narrates it, and somewhere in the middle she falls asleep with the phone on the pillow. You listen to her breathe for a minute, then hang up.']],()=>{fr('a',3);done()})},
 {id:'nw_ronin3am',when:()=>frT('r')>=2&&!S.dark&&S.phase!=='taken',run:done=>say([['','4am. A text from Ronin: a photo of a full moon over a car park, slightly blurry.'],[RN,'(text) june liked full moons. thats all. go back to sleep.'],['','You don’t. You send him a photo of your ceiling. He sends back a thumbs up. Neither of you sends anything else.']],()=>{fr('r',3);done()})});
/* when he's the one awake, she isn't wandering the house at 3am either */
HOUSE.forEach(r=>{const R=ROOMS[r];if(!R)return;const o=R.npcs;R.npcs=()=>{const L=o?o():[];return LATE()&&youV()?L.filter(n=>!/Misaki/.test(n.label||'')):L}});
/* sleepers draw on top of the furniture they're lying on */
[['ewing','sl_v'],['ewing','sl_m_bd'],['trailer','sl_m_tr'],['ronin','sl_r'],['studio','sl_a']].forEach(([m,id])=>{const p=TD.maps[m].props.find(q=>q.id===id);if(p){p.flat=false;p.solid=false;p.h=2;p.zb=40}});
/* anchor the sleepers to wherever the beds ended up */
function sleeperV(x,y,hair,skin,blanket){const b=Math.sin(T/45)*.5;c.fillStyle=blanket;c.beginPath();c.ellipse(x,y+16+b,10,14,0,0,7);c.fill();c.fillStyle='rgba(255,255,255,.12)';c.fillRect(x-9,y+6,18,1);c.fillStyle=skin;c.beginPath();c.arc(x,y,4,0,7);c.fill();c.fillStyle=hair;c.beginPath();c.arc(x,y-1,4.6,Math.PI,Math.PI*2);c.fill();zzz(x+6,y-6)}
(function(){const g=(m,id)=>TD.maps[m].props.find(q=>q.id===id);
 const bd=g('ewing','bd_bed'),sv=g('ewing','sl_v'),sm=g('ewing','sl_m_bd');
 if(bd&&sv){Object.assign(sv,{x:bd.x,y:bd.y,w:28,d:bd.d,draw:()=>sleeperV(bd.x+14,bd.y-4,'#2a1810','#6e4a32','#3a4a6a')})}
 if(bd&&sm){Object.assign(sm,{x:bd.x+28,y:bd.y,w:28,d:bd.d,draw:()=>sleeperV(bd.x+42,bd.y-4,'#1b1626','#f0c8a8','#c2253a')})}
 const tb=g('trailer','tr_bed'),st=g('trailer','sl_m_tr');if(tb&&st)Object.assign(st,{x:tb.x,y:tb.y,w:tb.w,d:tb.d,draw:()=>sleeper(tb.x+17,tb.y+6,'#1b1626','#f0c8a8','#5a3a5a',false)});
 const rc=g('ronin','rn_couch'),sr=g('ronin','sl_r');if(rc&&sr)Object.assign(sr,{x:rc.x,y:rc.y-4,w:rc.w,d:rc.d,draw:()=>{sleeper(rc.x+34,rc.y-6,'#3a2a2a','#f0d0b8','#4a1424',true);rect(rc.x+14,rc.y-12,22,2,'#8a8a96')}})})();
