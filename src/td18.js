/* ===================== LATE NIGHT: who is asleep, and what you do about it ===================== */
const LATE=()=>S&&S.slot>=3&&!S.dark&&S.phase!=='taken'&&!isLone();
const youV=()=>tdWho()==='v';
/* where people sleep */
/* nobody is asleep every night: each person sleeps through roughly two nights in five, on their own schedule */
const sleepNight=k=>{const c={v:1,m:2,r:3,a:4}[k]||0;return ((S.day*7+c*3)%5)<2};
const sleepsV=()=>LATE()&&!youV()&&sleepNight('v');
const sleepsM=k=>LATE()&&youV()&&sleepNight('m')&&(k==='base'?!!S.f.movedIn:!S.f.movedIn);
const sleepsR=()=>LATE()&&sleepNight('r');
const sleepsA=()=>LATE()&&sleepNight('a');
/* V stops wandering the house at night: he's in bed */
const _vwNight=vWhere;vWhere=function(){if(sleepsV()&&S.pov!=='v'&&S.visitAs!=='v')return'bedroom';return _vwNight()};
/* a figure under a blanket */
function zzz(x,y){for(let k=0;k<3;k++){const t=(T/50+k*.33)%1;c.globalAlpha=1-t;txt('z',x+k*3+t*6,y-t*14,'#c8c0e0',5+k,'left')}c.globalAlpha=1}
function sleeper(x,y,hair,skin,blanket,flip){const b=Math.sin(T/45)*.6;c.fillStyle=blanket;c.beginPath();c.ellipse(x+(flip?-8:8),y+4+b*.5,16,7,0,0,7);c.fill();c.fillStyle='rgba(255,255,255,.12)';c.fillRect(x+(flip?-20:-4),y+1,24,1);
 c.fillStyle=skin;c.beginPath();c.arc(x+(flip?10:-10),y,4,0,7);c.fill();c.fillStyle=hair;c.beginPath();c.arc(x+(flip?11:-11),y-1,4.6,Math.PI*.9,Math.PI*2.1);c.fill();zzz(x+(flip?6:-14),y-6)}
function sleepMenu(name,pron,opts){ask(tdN(),`${name} is sleeping. Best not wake ${pron}.`,opts.filter(Boolean))}
/* ---------- V, asleep (Misaki's side) ---------- */
TD.maps.ewing.props.push({id:'sl_v',x:124,y:58,w:48,d:24,flat:1,solid:false,show:()=>sleepsV(),label:'V (asleep)',draw:(x,y)=>sleeper(x+20,y+8,'#2a1810','#6e4a32','#3a4a6a',false),
 act:()=>sleepMenu('V','him',[
  {t:'Let him sleep.',fn:()=>{apply({aff:1});tdSay([['','He sleeps on his back like a man laid out for a viewing, one hand hanging off the bed where Biscuit can reach it. You close the door to the width of a dog.']])}},
  {t:'Pull the blanket up.',fn:()=>{apply({aff:2});tdSay([['','He doesn’t wake. As you tuck the edge he says your name, once, quietly, not to you. Then he turns over.'],['hitmeuppp',MV('(gross. cute. gross.)','(ok that was cute. shut up.)','(He said my name in his sleep. Oh, fuck. That’s living in my head forever.)','(He said my name in his sleep like he was taking a headcount, and I’m on it. Oh, fuck. I’m never recovering from this, seriously.)')]])}},
  {t:'Wake him.',fn:()=>{tdSay([['','Your hand is still an inch from his shoulder when his eyes open, already awake, already reaching for something on the nightstand that isn’t there any more.'],['K9','Misaki. What is wrong.'],['hitmeuppp',MV('nothing. cant sleep. move','nothing. couldn’t sleep. ur boring when ur asleep','Nothing! God. I couldn’t sleep and you’re the only other thing in this house.','Nothing’s wrong, babe. I couldn’t sleep, and if I’m up, you’re up. Them’s the rules.')],['K9','Then I am awake. I will put the kettle on.']],()=>talkV('atrium'))}},
  tier()>=2?{t:'Lie down on top of the covers, just for a minute.',fn:()=>{apply({aff:3});if(typeof calm==='function')calm(6);tdSay([['','You lie down on the very edge, on top of the covers, shoes still on. He doesn’t wake. Without opening his eyes he moves over, exactly enough.'],['','“Just for a minute” turns out to be until the birds start.']])}}:null])});
/* ---------- Misaki, asleep (V's side) ---------- */
const mSleep=where=>()=>sleepMenu('Misaki','her',[
 {t:'Let her sleep.',fn:()=>{tdSay([['','She sleeps curled around a gun case like a cat round a radiator, one star clip still in. Her phone is face-down next to her, still on the server.'],['K9','(She looks younger asleep. I will not mention it. She is armed.)']])}},
 where==='trailer'?{t:'Leave a note on the fridge.',fn:()=>{S.f.fridgeNote=(S.f.fridgeNote||0)+1;apply({aff:2});save();tdSay([['','You write it on a sticky note and put it under the strawberry magnet: “Eat. —V”.'],['K9',S.f.fridgeNote>1?'(There are '+S.f.fridgeNote+' of them now. She has kept every one. They are in a row.)':'(She will pretend she did not see it. She will eat.)']])}}:{t:'Put a glass of water by her side of the bed.',fn:()=>{apply({aff:2});tdSay([['','You set it down without a sound. In the morning it will be empty and she will say nothing about it. You will refill it.']])}},
 {t:'Wake her.',fn:()=>tdSay([['','There is a knife at your throat before her eyes are open. Then the eyes open.'],['hitmeuppp',MV('oh. its u. what','oh, fuck. it’s you. what. what time is it.','Oh, fuck, it’s you. I nearly opened your neck, seriously! What’s wrong?','It’s you. Oh my God, babe, what did I say about sneaking up on me? Who’s dead? Do I need the rifle?')],['K9','No one. It was an error. Go back to sleep.'],['hitmeuppp',MV('no ur here now. sit','no, you’re here now. sit. SIT.','Nope. You’re here now. Sit down, I’m not putting the knife away for nothing.','Nope. You woke me up, sugar honey dumpling, so now you’re stuck with me. Sit.')]],()=>convo('m',where))},
 tier()>=2?{t:'Sit with her until she settles.',fn:()=>{apply({aff:3});tdSay([['','She is having a bad one. Her hands keep closing on nothing. You sit on the floor with your back to the bed and say the dogs’ names, quietly, in order, until her breathing slows.'],['K9','(Biscuit. Mochi. Sergeant. Max. Biscuit. Mochi...)']])}}:null]);
TD.maps.trailer.props.push({id:'sl_m_tr',x:30,y:54,w:44,d:22,flat:1,solid:false,show:()=>sleepsM('trailer'),label:'Misaki (asleep)',draw:(x,y)=>sleeper(x+22,y+8,'#1b1626','#f0c8a8','#5a3a5a',false),act:mSleep('trailer')});
TD.maps.ewing.props.push({id:'sl_m_bd',x:150,y:58,w:30,d:24,flat:1,solid:false,show:()=>sleepsM('base'),label:'Misaki (asleep)',draw:(x,y)=>sleeper(x+12,y+8,'#1b1626','#f0c8a8','#c2253a',true),act:mSleep('atrium')});
/* ---------- Ronin, asleep on the couch ---------- */
TD.maps.ronin.props.push({id:'sl_r',x:142,y:104,w:58,d:14,flat:1,solid:false,show:()=>sleepsR(),label:'Ronin (asleep)',draw:(x,y)=>{sleeper(x+28,y+2,'#3a2a2a','#f0d0b8','#4a1424',true);rect(x+8,y-4,22,2,'#8a8a96')},
 act:()=>sleepMenu('Ronin','him',[
  {t:'Let him sleep.',fn:()=>{fr('r',1);tdSay([['','He sleeps with the good crowbar under one arm and his boots on the armrest. Heathers is still playing, on mute, on the croquet lawn.']])}},
  {t:'Turn off the TV.',fn:()=>{fr('r',1);tdSay([['','The second the screen goes dark, without opening his eyes:'],[RN,'I was fuckin’ watchin’ that.'],['','He was not. He’s asleep again before you’ve put the remote down.']])}},
  {t:'Put a blanket over him.',fn:()=>{fr('r',2);tdSay([['','You drape the throw over him. In his sleep he mutters “June, fuck off,” and pulls it up to his chin.'],['','You leave in your socks.']])}},
  {t:'Wake him.',fn:()=>{fr('r',1);tdSay([['','You are on the floor before you know you’ve fallen, a crowbar resting politely on your collarbone.'],[RN,'Oh, it’s you. Shit. Nearly had a new skull for the shelf. You’re makin’ the coffee.']],()=>talkRonin())}}])});
TD.maps.ronin.props.forEach(p=>{if(p.id==='sl_r')p.zb=4});
const _rnNpc=ROOMS.ronin.npcs;ROOMS.ronin.npcs=()=>{const L=_rnNpc?_rnNpc():[];return sleepsR()?L.filter(n=>!/Ronin/.test(n.label||'')):L};
/* ---------- Angel, asleep on the daybed in the set ---------- */
TD.maps.studio.props.push({id:'sl_daybed',x:TX(27),y:TX(7)+2,w:44,d:14,h:8,label:'Daybed',draw:(x,y)=>{tdBox(x,y,44,14,8,'#f8d8e8','#e0b8c8','#ffe8f0');rect(x+2,y-10,10,5,'#ffffff')},act:who=>tdSay([['',who==='v'?'A daybed covered in eleven cushions. One of them has your face printed on it. You decide not to ask.':'a daybed with eleven cushions. one has V’s face on it. she said it was “for a bit.” it is not for a bit.']])},
 {id:'sl_a',x:TX(27),y:TX(7),w:44,d:14,flat:1,solid:false,show:()=>sleepsA(),label:'Angel (asleep)',draw:(x,y)=>{sleeper(x+22,y-2,'#f2a0b8','#f4e0d0','#ff8ab0',false);c.fillStyle='rgba(255,255,255,.75)';c.fillRect(x+9,y-5,6,4)},
  act:()=>sleepMenu('Angel','her',[
   {t:'Let her sleep.',fn:()=>{fr('a',1);tdSay([['','She sleeps in a full sheet mask and satin bonnet, with Beyoncé in reach on the floor beside an alarm labelled GLOW UP OR DIE. She is snoring, very slightly; she would deny it under oath.']])}},
   {t:'Turn the ring light off.',fn:()=>{fr('a',1);tdSay([['','The ring light clicks off. From under the sheet mask: “…no, the other one had it coming too…” and then nothing.']])}},
   {t:'Fix her bonnet, it’s slipping.',fn:()=>{fr('a',2);tdSay([['','You tug it back over her hair. She smiles in her sleep, the real one, with teeth, and says “pull,” to nobody.']])}},
   {t:'Wake her.',fn:()=>{fr('a',1);tdSay([['','She sits bolt upright with a hand already on the shotgun. It takes her a second to decide you’re you.'],[AN,'who is it. who do i get to kill. two minutes, i need my lashes.']],()=>talkAngel())}}])});
const _stNpc=ROOMS.studio.npcs;ROOMS.studio.npcs=()=>{const L=_stNpc?_stNpc():[];return sleepsA()?L.filter(n=>!/Angel/.test(n.label||'')):L};
for(const id of ['ewing','trailer','ronin','studio']){const M=TD.maps[id];M.props.forEach((p,n)=>{p.id=p.id||id+'#n'+n;p.map=M;if(p.solid===undefined)p.solid=!p.flat&&!p.wall&&!p.exit;p.w=p.w||TS;p.d=p.d===undefined?TS:p.d})}
/* ---------- waking in the middle of the night ---------- */
function nightWake(go){const v=S.pov==='v',moved=!!S.f.movedIn,t=tier();let L,O;
 if(S.rom&&!v){const N=romName(),W=romWho();L=[['','You wake at 3:12 with your heart going for no reason. The phone glows on the floor.']];O=[
  {t:`Go to ${N}’s place.`,fn:()=>{fr(S.rom,3);say(S.rom==='r'?[['','You climb his fire escape. The window is already open. He’s sitting up in the dark with the crowbar across his knees.'],[RN,'Heard you comin’ three streets off. You’re shit at this. Get in.']]:[['','You knock once. Angel opens the door with the shotgun in one hand and a sheet mask in the other.'],[AN,'oh, it’s you. good. i wasn’t in the mood to mop. get in, we’re doing the cucumber ones.']],go)}},
  {t:'Text instead.',fn:()=>say([['hitmeuppp','(text) u up'],[W,S.rom==='r'?'(text) am now, asshole. what’d you break':'(text) obviously. facetime me, i want to look at you. don’t fix your hair.']],go)},
  {t:'Go back to sleep.',fn:go}]}
 else if(S.vrom&&v){const N=vromName(),W=vromWho();L=S.vrom==='r'?[['','4:02. Something thuds softly on the roof, twice, and then someone very large tries and fails to be quiet on your skylight.']]:[['','3:47. Your phone lights up with a photo of Angel in a sheet mask with Beyoncé across her knees, captioned “cant sleep. come over or call. pick one.”']];O=[
  {t:S.vrom==='r'?'Open the skylight.':'Call her.',fn:()=>{fr(S.vrom,3);say(S.vrom==='r'?[[RN,'Evenin’. Couldn’t sleep, so I brought crumble. Move.'],['K9','It is four in the morning.'],[RN,'And now you’re up. Get forks.']]:[[AN,'you called. good. now tell me what you did tonight, all of it. start with what’s on the table.']],go)}},
  {t:'Go back to sleep.',fn:go}]}
 else if(!v&&moved){L=[['','You wake at 3:12. The house is so quiet you can hear the server racks two floors down. His door is at the end of the hall.'],['hitmeuppp','(go to his room?)']];O=[
  {t:t>=2?'Go. Don’t knock.':'Go. Knock first.',fn:()=>{apply({aff:t>=2?3:2});if(typeof calm==='function')calm(5);say(t>=2?[['','You slip in without knocking. He lifts the blanket without opening his eyes, like he was waiting.'],['K9','(asleep, almost) ...Cold feet.'],['hitmeuppp','deal with it, babe.']]:[['','You knock, very softly. The door opens immediately. He was awake.'],['K9','You are awake as well.'],['hitmeuppp','no shit.'],['K9','Kettle, then. The dogs will want to be involved.']],go)}},
  {t:'Go to the kennel instead.',fn:()=>{if(typeof calm==='function')calm(4);say([['','You sleep on the kennel floor in a pile of dogs. Biscuit puts her chin on your neck like a seatbelt.']],go)}},
  {t:'Stay in bed. Stare at the ceiling.',fn:go}]}
 else if(!v){L=[['','You wake at 3am in the trailer. Something outside — wind, probably. Your hand is already under the pillow.'],['hitmeuppp','(text him?)']];O=[
  {t:'Text him “u up”.',fn:()=>{apply({aff:2});say([['hitmeuppp','(text) u up'],['K9','(text, nine seconds later) I am up.'],['K9','(text) Do you want me to drive by? I will not stop. I will just drive by.'],['hitmeuppp',MV('(text) no. maybe. no. creep','(text) no weirdo. stay there. text me till i pass out','(text) No! God. Just stay on the phone a bit, okay? Say boring stuff.','(text) Don’t drive by like a stalker, babe. Come in. Door’s open, gun’s down, mostly.')]],go)}},
  {t:'Check the lot barefoot, with the gun.',fn:()=>say([['','There’s nothing out there but a cat on the bonnet of a car and the stars. You stand there anyway until your feet go numb.']],go)},
  {t:'Go back to sleep.',fn:go}]}
 else{L=moved?[['','You wake at 4:00 out of habit. Down the hall, her door is open a crack, the way she leaves it.'],['K9','(Go and check on her?)']]:[['','You wake at 4:00 out of habit. You think about the trailer, the lot, the fence with the gap in it.'],['K9','(She asked you once not to drive by at night. Do you?)']];O=moved?[
  {t:'Look in. Don’t go in.',fn:()=>{apply({aff:1});say([['','She’s asleep sideways across the bed with Mochi, one sock on. You stand in the doorway for one minute exactly, by your watch, and go back to bed.']],go)}},
  {t:'Go in and sit for a while.',fn:()=>{apply({aff:2});say([['','You sit in the chair by her window. She half-wakes, sees you, says “creep,” throws a sock at you, and goes back to sleep.']],go)}},
  {t:'Go down to the library instead.',fn:()=>say([['','You read under the tree until the light well turns grey. Then you go and feed the animals.']],go)}]:[
  {t:'Respect it. Stay home.',fn:()=>{apply({aff:2});if(typeof relApply==='function')relApply({trust:3});say([['','You don’t go. You sit in the chair by the front door instead, with the phone face-up on your knee, until it is light.']],go)}},
  {t:'Text her instead.',fn:()=>say([['K9','(text) Are you safe?'],['hitmeuppp',MV('(text) yes grandpa. go to bed','(text) yes. i have like nine guns. go to bed v','(text) Yes! I’m armed and annoyed. But thanks for asking instead of creeping past.','(text) Yes, babe. You texted instead of driving by like a serial killer, which, okay, you are. I noticed. Go to bed.')]],go)},
  {t:'Drive by. Just once.',fn:()=>{if(typeof relApply==='function')relApply({tension:4});say([['','You drive by once. Her light is off. On the way back you see her text: “i can hear ur car v. go home before i shoot the tyres.”']],go)}}]}
 cut(L,()=>ask(v?'K9':'hitmeuppp','(...)',O),'#06050c')}
const _slNW=sleep;sleep=function(){if(S&&!S.dark&&S.phase!=='taken'&&!isLone()&&S.day>=3&&Math.random()<.3&&(tier()>=1||S.rom||S.vrom)){const go=()=>_slNW();return nightWake(go)}return _slNW()};
/* friends call at night too */
EVENTS.push({id:'nw_angel3am',when:()=>frT('a')>=2&&!S.dark&&S.phase!=='taken',run:done=>say([['','3:30am. Angel calls and doesn’t say hello.'],[AN,'are you asleep. don’t answer that. i had the comments dream again. stay on the line while i make tea, or i’m going out with the shotgun, and i’d rather sleep.'],['','You stay on the line. She makes tea and narrates it, then narrates what she’d do to the commenters, in order, in Maria’s sweetest voice, until she falls asleep mid-threat. You hang up.']],()=>{fr('a',3);done()})},
 {id:'nw_ronin3am',when:()=>frT('r')>=2&&!S.dark&&S.phase!=='taken',run:done=>say([['','4am. Ronin texts you a slightly blurry photo of a full moon over a graveyard.'],[RN,'(text) june liked these. dunno why im tellin you. fuck off back to sleep'],['','You don’t. You send him a photo of your ceiling. He sends back a middle finger.']],()=>{fr('r',3);done()})});
/* when he's the one awake, she isn't wandering the house at 3am either */
HOUSE.forEach(r=>{const R=ROOMS[r];if(!R)return;const o=R.npcs;R.npcs=()=>{const L=o?o():[];return LATE()&&youV()&&sleepNight('m')?L.filter(n=>!/Misaki/.test(n.label||'')):L}});
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
