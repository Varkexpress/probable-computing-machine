/* ===================== THE LONG WAY OUT, AND THE ROOM THAT SAYS LAUNDRY (td28) =====================
   1. Captivity takes longer: an endurance game inside every full session (kdHoldOn), four vent screws to work loose
      (kdTurn), the guards' steps to learn for the door (simon), and a second stage to every way out (kdDock; V carries
      her out in kdCarry).
   2. Misaki is not a reliable narrator of her own body. Her lines say "stiff", "asleep", "fine". The chart, the mirror,
      and everyone else's reactions say otherwise.
   3. The adjustment period (S.kd.med): she wakes in V's infirmary on sublevel two, which she never knew existed, with
      a needle in her hand and one light on, and takes it for another cell. Three days. The room's labels change as her
      head clears (med.clar 0–3). She can try to escape it.
   4. More phone: the backlog of messages sent while she was gone, and threads for the infirmary and the injuries. */
const kdMed=()=>!!(S&&S.kd&&S.kd.med&&S.phase==='after'&&!isLone());
const kdMedM=()=>kdMed()&&S.pov!=='v';
const kdClar=()=>kdMed()?S.kd.med.clar:3;
const kdClarUp=(n)=>{if(kdMed()){S.kd.med.clar=Math.min(3,Math.max(S.kd.med.clar,0)+(n||1));save()}};
const kdAuto=()=>typeof globalThis!=='undefined'&&globalThis.KD_AUTO;
function kdPick(){return kdWoozy()+(S&&S.kd&&S.phase==='taken'&&S.kd.ses>=2?1:0)}
const kdFlip=rows=>rows.map(r=>r.split('').reverse().join(''));
const kdFlipG=G=>G.map(p=>p.map(([x,y])=>[19-x,y]));

/* ---------- 1. MORE TO GET THROUGH ---------- */
/* the chair: stay level while the band narrows */
function kdHoldOn(cb,o){cb=once(cb);if(kdAuto())return cb(kdAuto()>0);o=o||{};let y=50,v=0,t=0,inb=0,band=36;const N=o.len||560;const say3=o.lines||['Count the dogs.','Biscuit. Sergeant. Mochi. Pancake.','Again. From Biscuit.','Don’t listen to the radio. Count.'];
 go({onTap(){},update(){t++;v+=held.act?-.1:.075;v+=Math.sin(t/23)*.03+(Math.random()-.5)*.09;v=Math.max(-1.7,Math.min(1.7,v));y+=v;if(y<0){y=0;v=0}if(y>100){y=100;v=0}
   band=36-16*t/N;if(Math.abs(y-50)<=band/2)inb++;if(t>=N)cb(inb/N>=.55)},
  draw(){(o.bg||drawInterro)();rect(0,0,W,H,'rgba(0,0,0,.6)');hudBar(o.title||'The chair',o.hint||'hold E to stay level');
   rect(150,28,20,120,'#1a1612');rect(150,28+(50-band/2)*1.2,20,band*1.2,'#3a5a3a');rect(146,28+y*1.2-1,28,3,'#ece4da');
   bar(110,158,100,4,t/N*100,'#5fd4c4');txt(say3[Math.min(3,Math.floor(t/140))],160,172,'#c9c39a',11,'center')}})}
/* a timing bar: used for the vent screws and, later, the foam ball */
function kdTurn(cb,o){cb=once(cb);if(kdAuto())return cb(kdAuto()>0);o=o||{};let pos=0,dir=1,ok=0,miss=0,zone=ri(25,75),end=0,sp=1.6+kdWoozy()*.3+(o.fast||0);
 go({update(){if(end){if(++end>50)cb(ok>=3);return}if(hit('back'))return cb(false);pos+=dir*sp;if(pos>100||pos<0)dir*=-1;
   if(hit('act')){if(Math.abs(pos-zone)<=9){ok++;zone=ri(20,80);sp+=.3}else miss++;if(ok>=3||miss>=2)end=1}},
  draw(){(o.bg||drawCell)();rect(60,60,200,60,'rgba(10,8,8,.92)');hudBar(o.title||'The vent screw',(o.unit||'turns')+' '+ok+'/3');rect(74,96,172,8,'#222');rect(74+zone*1.72-15,96,31,8,'#5a8a3a');rect(74+pos*1.72-1,92,3,16,'#ece4da');
   txt(end?(ok>=3?(o.ok||'It turns.'):(o.bad||'The tray slips and rings on the concrete.')):(o.hint||'Press E when the edge bites.'),160,84,'#ece4da',12,'center')}})}
const _tmKD2=takenM;takenM=function(){S.f.kdScrews=0;S.f.kdSteps=0;return _tmKD2()};
(function(){const R=ROOMS.cell;const vent=R.spots.find(s=>s.label==='Vent'),va=vent.act;
 vent.act=function(){const k=KD();if(k.clock<6&&S.f.tray&&S.f.listened&&(S.f.kdScrews||0)<4)return kdTurn(ok=>{k.clock+=ok?1:2;if(ok)S.f.kdScrews=(S.f.kdScrews||0)+1;save();toRoom('cell',[212,128]);
    say(ok?[['',`Screw ${S.f.kdScrews} of four comes out. You put it in your mouth so it can’t roll.`],S.f.kdScrews>=4?['hitmeuppp','(four. it’s open. go.)']:['hitmeuppp','(next.)']]:[['','The tray skids off the screw head. Down the hall, a chair scrapes.'],['hitmeuppp','(shit. wait. wait for him to sit back down.)']])});
   return va.apply(this,arguments)};
 const door=R.spots.find(s=>s.label==='Door'),da=door.act;
 door.act=function(){const k=KD();if(k.clock<6&&S.f.listened&&!S.f.kdSteps){k.clock++;save();return simon({title:'THE HALL // count their steps',rounds:[3,4,5]},ok=>{if(ok)S.f.kdSteps=1;save();toRoom('cell',[246,140]);
    say(ok?[['','Eleven steps down, a turn, eleven back. The one with the phone stops on the seventh every time.'],['hitmeuppp','(seven. i go on seven.)']]:[['hitmeuppp','(lost count. the radio keeps eating the steps. again.)']])})}
   return da.apply(this,arguments)}})();
/* every full session: the chair first, then the question about before she was nine */
const _bqKD=kdBlankQ;kdBlankQ=function(n,cb){go({draw(){drawInterro()}});say([['','He leaves. Somebody else comes in and stands behind the chair, and then for a while there are no questions at all.']],()=>kdHoldOn(ok=>{IR.R=clamp(IR.R+(ok?8:-10));if(!ok)KD().hrs+=1;save();go({draw(){drawInterro()}});
  say([['',ok?'You stay in your own head the whole time. You get to Pancake forty times.':'You lose count somewhere after Mochi. When it comes back you are not sure it is the same day.'],['hitmeuppp',ok?'(still here. didn’t even hurt.)':'(didn’t hurt. i just got bored and left for a bit.)']],()=>_bqKD(n,cb))}))};
/* what she reports about her body after each one */
const KD_INJ=[[['','Your wrists itch under the cable ties. You don’t look at them. Itching means healing.']],
 [['','Your left hand has gone to sleep. You tuck it inside your hoodie and let it.'],['hitmeuppp','(nothing’s broken. i’d know. i’ve had broken.)']],
 [['','There is a tooth on the floor by the drain. You wonder whose it is, and nudge it under the cot with your shoe so nobody steps on it.'],['hitmeuppp','(honestly? feeling pretty good. bit tired.)']]];
const _doseKD=kdDose;kdDose=function(cb){_doseKD(()=>say(KD_INJ[Math.min(3,Math.max(1,KD().ses))-1],cb))};
/* a second stage to her way out */
function kdDock(r1){const fin=r=>{if(r.ok){S.f.selfEscape=1;S.bodies+=(r1.bodies||0)+(r.bodies||0);save();escaped(r)}else failedEscape('The roller door was right there. You could smell the river.')};
 cut([['','That was the inside. Between you and the river there is still the loading dock, lit like a football pitch.'],['hitmeuppp','(One: don’t run. Two: the foot’s just asleep. Three: run when it wakes up.)']],()=>
  stealth({map:kdFlip(WARE),guards:kdFlipG(WARE_G.slice(0,S.tries>=1?4:3)),title:'The loading dock',hint:'Get to the EXIT. Plants hide you. E from behind takes a guard down.',smoke:0,actor:'m',takedown:true,guardCol:'#2a1a1a',takeLine:'The screw from your mouth, in his neck.',autoExit:true,sens:1.05+kdWoozy()*.1},fin),'#000')}
/* V has to get her out again, with no hands free */
function kdCarry(next,fight){cut([['','He has her. She weighs less than she did on Tuesday, and she tells him twice that she can walk.'],['','She cannot. He has no hands free now, and the way out is the way he came in.']],()=>
  stealth({map:WARE,guards:WARE_G.slice(0,2+((S.f.missing||0)>=2?1:0)),title:'Carry her out',hint:'No hands free: you cannot take anyone down. Reach the EXIT. Plants hide you both.',smoke:S.f.roninOwes?1:0,smokeName:'Ronin’s distraction',actor:'v',takedown:false,guardCol:'#2a1a1a',sens:.95,autoExit:true},r=>r.ok?next():fight()),'#000')}

/* ---------- 2. THE INFIRMARY ---------- */
function kdMedStart(self,L){const k=KD();k.med={d:0,clar:0,run:0};k.aftL=L.filter(Boolean);k.self=self?1:0;S.endDay+=3;S.done.bedChosen=1;save();
 if(S.pov==='v')return cut([['','The infirmary is on sublevel two, behind a door marked LAUNDRY. V had it built four years ago for the dogs and for himself. No other person has ever been in it.'],
  ['','The doctor works on her for six hours and V holds the lamp. He learns that the left hand was broken on the first day and again on the third, and that she walked out of that building on a foot that should not have taken weight.'],
  ['K9','She told me in the car that she was fine. She said it twice.'],
  ['','She will wake in a room she has never seen, with a needle in her and one light on. He takes the bulb out of its cage and fits a lampshade from the east wing. It helps very little.']],hub,'#05040a');
 cut([['','She comes up in pieces again: a ceiling, a bulb, a needle taped into the back of her hand.'],
  ['','There is a door. Her shoes are gone, and the clip was in the shoe.'],
  ['hitmeuppp','(no. no no no. i got OUT. i remember getting out.)'],
  ['hitmeuppp','(...do i? One: a river. Two: a coat. Three: nothing. shit. they moved me.)'],
  ['','She takes an inventory and finds everything where she left it. She feels fine, a bit stiff. She does the whole inventory without once looking at her left hand.']],()=>toRoom('medbay',[120,150]),'#000')}
function kdDrawMed(){if(kdClar()<2){drawCell();rect(112,96,2,54,'#8a8a8a');rect(106,94,14,3,'#8a8a8a');rect(108,84,10,12,'rgba(200,220,230,.5)');return}
 rect(0,0,W,H,'#1c2422');rect(0,0,W,120,'#2c3835');for(let k=0;k<12;k++)rect(k*28,0,1,120,'#34423e');
 lightPool(160,30,110,'rgba(255,225,170,.16)');rect(150,10,20,10,'#c9a46a');rect(146,20,28,3,'#8a6a3a');
 rect(30,104,70,18,'#d8d4c8');rect(34,98,62,8,'#ece4da');rect(34,98,18,8,'#c8d0d8');rect(260,40,40,80,'#3a4a46');rect(262,74,4,8,'#c9a46a');rect(264,46,32,10,'#ece4da');txt('LAUNDRY',280,54,'#3a4a46',8,'center');
 rect(112,96,2,54,'#b0b0b0');rect(106,94,14,3,'#b0b0b0');rect(108,84,10,12,'rgba(200,230,240,.7)');rect(196,24,28,16,'#5a5248');rect(130,150,22,4,'#c8b89a');rect(214,150,34,8,'#5a4030')}
const KD_CHART=[['','The clipboard is in fountain pen. “L hand: 3rd and 4th metacarpals fractured, healed crooked, re-broken and pinned. R shoulder: dislocated, reduced. Ribs 6–8 L: fractured.”'],
 ['','“L foot: fracture, walked on. Wrists: ligature burns, both, to the tendon. Scalp: 14 sutures. Two molars. Weight: minus 7 kg. Back: see photographs. Do not show patient.”']];
ROOMS.medbay={name:()=>kdClar()<2?'Somewhere else. Another one.':'The infirmary · sublevel two',walk:[20,250,124,172],back:()=>{},backLabel:'stay in bed',draw:kdDrawMed,who:()=>'m',spots:[]};
(function(){const R=ROOMS.medbay,lo=()=>kdClar()<2,hi=()=>kdClar()>=2;const T=(x)=>toRoom('medbay',[x,150]);
 const two=(a,b,at,mark,fa,fb)=>{R.spots.push({at,mark,label:a,show:lo,act:fa},{at,mark,label:b,show:hi,act:fb||fa})};
 two('Cot','Bed',[64,128],[64,98],()=>ask('hitmeuppp',lo()?'(if i sleep, they come while i’m under.)':'(the sheets smell like his laundry.)',[{t:'Sleep',sub:'ends the day',fn:()=>{S.slot=3;S.done.bedChosen=1;sleep()}},{t:'Not yet',fn:()=>{}}]));
 two('The line in your hand','The drip',[112,150],[112,100],()=>ask('hitmeuppp','(whatever’s in the bag is going into me.)',[
   {t:'Pull it out.',fn:()=>{apply({energy:-12});calm(-3);S.f.kdPulled=(S.f.kdPulled||0)+1;save();say([['','She pulls it with her teeth, because her left hand won’t close on the tape. It bleeds more than a needle should.'],['hitmeuppp','(barely a scratch.)'],['','When she next wakes it is back in, in the other hand, with twice as much tape and a small drawing of a dog on the tape.']])}},
   {t:'Leave it. Find out what it is first.',fn:()=>say([['','The bag has a label, in handwriting. She can’t make her eyes hold the letters still.']])}]),
  ()=>say([['','“Saline. Cefazolin. NO sedatives — she reacts.” The last part is underlined twice, in fountain pen.'],['hitmeuppp',MV('(his handwriting.)','(that’s V’s handwriting. he labelled my DRIP.)','(That’s his handwriting. He underlined it twice.)','(He wrote “no sedatives” and underlined it twice. He’d have stood over the doctor until she agreed.)')]]));
 two('The eye in the ceiling','Smoke detector',[160,128],[160,24],()=>say([['','A red light in the ceiling blinks every eight seconds.'],['hitmeuppp','(camera. hi, assholes. get my good side.)']]),()=>say([['','It’s a smoke detector. It has a sticker on it of a dog in a fire helmet.']]));
 two('Their notes','Your chart',[214,150],[230,150],()=>{const first=!S.f.kdChart;S.f.kdChart=1;if(first)kdClarUp();save();say(KD_CHART.concat([
   ['hitmeuppp','(somebody had a rough week.)'],['hitmeuppp','(...why’s my name at the top. that’s not right. i walked out. i’m FINE. the hand’s just stiff.)'],
   ['','She hangs the clipboard back up with her right hand. The left one is in a cast to the elbow, and she has not looked at it yet.']]))},
  ()=>{S.f.kdChart=1;save();say(KD_CHART.concat([['hitmeuppp',MV('(that’s a lot of words for “fine.”)','(ok that’s. that’s a lot. i still feel fine tho??)','(That’s a long list. I don’t feel any of it. Is that the drip, or is that me?)','(That’s two pages, and I’d have told you I had a stiff hand and a bad night. So either the doctor’s lying or I am, and I’m the one who lost '+kdHrs()+' hours.)')]]))});
 two('Tray','Soup',[140,152],[140,148],()=>say([['','A covered bowl. Still warm.'],['hitmeuppp','(not eating anything i didn’t watch get made. nice try.)']]),
  ()=>{if(S.done.kdSoup)return say([['hitmeuppp','(had it. there’s ten more in the fridge down the hall. he labelled them by day.)']]);S.done.kdSoup=1;apply({energy:15});calm(2);say([['','There is a note under the bowl: “I made this. I watched myself make it. —V.”'],['','She eats it with the spoon in her right fist. Two of the teeth on the left side aren’t there to help, and she chews on the other side without wondering why.']])});
 two('Something covered up','The mirror',[196,128],[210,32],()=>say([['','A towel has been taped over something on the wall.'],['hitmeuppp','(they don’t want me to see something. psychological. cute.)']]),
  ()=>{if(S.f.kdMirror)return say([['hitmeuppp','(seen it. it’s a face. it’s fine.)']]);ask('hitmeuppp','(He taped a towel over the mirror.)',[{t:'Take the towel down.',fn:()=>{S.f.kdMirror=1;calm(-4);save();say([
    ['hitmeuppp',MV('see? fine.','see? fine. bit tired.','There. Fine. A bit tired.','There, see? Fine. I’ve looked worse after karaoke.')],
    ['','The person in the mirror has a shaved patch above one ear with fourteen stitches in it, an eye that does not open all the way, and a jaw the colour of a plum.'],
    ['','She fixes her fringe with one hand and hangs the towel back up, to be polite.']])}},{t:'Leave it.',fn:()=>{}}])});
 two('Door','The door',[246,140],[280,80],()=>ask('hitmeuppp','(No lock I can see. So somebody’s on it.)',[
   {t:'Listen.',fn:()=>say([['','Somebody is breathing on the other side, low down, as if he were sitting on the floor. There is a second set of lungs with him, much bigger.'],['hitmeuppp','(guard. and a dog. fuck. they’ve got a dog now.)']])},
   {t:'Go. Now, while you can stand.',sub:'stealth',fn:kdMedRun},{t:'Not yet',fn:()=>{}}]),
  ()=>say([['','The door has a handle. It has had one the whole time.'],['','Outside, V is asleep sitting up against the corridor wall, in the coat, with Sergeant across his shins. There is a thermos and a romance novel beside him.'],['hitmeuppp',MV('(...)','(he’s been out here the whole time.)','(He’s been out here the whole time. That was the breathing.)','(That’s the guard I’ve been listening to for two days. He brought a book.)')]]));
 R.spots.push({at:[90,160],mark:[90,152],label:'Your phone',show:()=>kdMed()&&S.kd.med.d>=1,act:()=>openPhone('dm')},
  {at:[178,160],mark:[178,152],label:'Foam ball',show:()=>hi(),act:()=>{if(S.done.kdGrip)return say([['hitmeuppp','(did my reps. the hand says no more today.)']]);S.done.kdGrip=1;kdTurn(ok=>{T(178);if(ok&&KD().shake>0)S.kd.shake--;calm(ok?2:-1);
    say([['',ok?'Three squeezes with the left hand. The pins move when she does it, and she watches them move with interest.':'The ball rolls under the bed. She tells it that it’s a stupid ball.'],['hitmeuppp',ok?'(easy. doesn’t even hurt.)':'(whatever. hand’s just stiff.)']])},{bg:kdDrawMed,title:'Left hand · the foam ball',unit:'squeezes',hint:'Press E as the grip closes.',ok:'Three.',bad:'It gets away from her.',fast:.3})}})})();
function kdMedRun(){const k=S.kd;k.med.run++;save();stealth({map:VENT,guards:VENT_G,title:'Get out. Again.',hint:'Same as last time. Plants hide you. E from behind.',smoke:0,actor:'m',takedown:true,guardCol:'#2a1a1a',takeLine:'The drip needle, into his forearm. He doesn’t make a sound.',autoExit:true,sens:1.1},r=>{
  go(cutBg('#0a0c0e'));const back=()=>toRoom('medbay',[120,150]);
  if(r.ok&&r.kills>0){S.f.kdStab=1;k.med.clar=3;calm(-4);save();return say([['','She comes out into a garage. Her own truck is parked in it. Beside it is a black sedan with a dog blanket on the back seat.'],
    ['','Behind her, the guard she put the needle in is sitting on the corridor floor holding his forearm. He is wearing a brown coat.'],['K9','Misaki. It is Thursday. You are in my house.'],
    ['hitmeuppp',MV('...V?','V? ...i stabbed u.','V. I stabbed you. I thought— there was a bulb.','Oh, fuck. I stabbed you. I looked right at you and I saw the radio guy. I saw his fucking shoes, V.')],
    ['K9','It is a small needle. Pancake has done worse.']],back)}
  if(r.ok){k.med.clar=3;calm(4);save();return say([['','She comes out into a garage. A dog the size of a horse is asleep against the big door. It wakes, sees her, and loses its mind with joy as quietly as it knows how.'],
    ['hitmeuppp',MV('...biscuit?','biscuit?? why do they have BISCUIT.','Biscuit? Why would they have— oh.','Biscuit. Why would they have Biscuit, unless— oh. Oh, I’m an idiot. I’m in his fucking basement.')],
    ['','She sits down on the concrete, and it takes a while. Her foot has been trying to tell her something since the corridor.'],['hitmeuppp','(it’s asleep. it’s been asleep all week.)']],back)}
  kdClarUp();say([['','Hands on her shoulders, from the front. The guard kneels until his face is lower than hers. None of the others ever did that.'],
   ['K9','It is Thursday. You are on sublevel two of my house. I am going to carry you back, and I am telling you before I do.'],
   ['hitmeuppp',kdClar()>=2?MV('...V?','V? is that—','V? Is that you?','V? ...Say something only you’d say.'):'(the tall one knows my name. they all know my name.)']],back)})}
const _ophKD=openPhone;openPhone=function(tab){if(kdMedM()&&S.kd.med.d<1){toast('No phone. They took it.');return}return _ophKD(tab)};
/* mornings in the infirmary replace the usual morning scenes */
function kdBacklog(){phPush('v','sys','— while you were gone —');phPush('a','sys','— while you were gone —');phPush('r','sys','— while you were gone —');
 phQueue('v',['[tue 07:00] Did you eat today?','[tue 12:00] Did you eat today?','[tue 18:00] Did you eat today?','[tue 18:40] Misaki.','[wed 07:00] Did you eat today?','[wed 03:12] I am looking. I will not stop.','[thu 07:00] Did you eat today?'],0);
 phQueue('a',['[tue] misaki?? you didn’t answer my vlog poll. you ALWAYS answer my vlog poll','[wed] ok this isn’t funny','[wed] answer or i post the bad photo to two million people. i mean it','[thu] please'],0);
 phQueue('r',['[tue 21:41] (a raccoon in a tiny hat)','[wed] phone’s goin’ straight t’nothin’. you dead or rude','[thu] don’t be dead. I’d have t’be nice at a funeral and I ain’t got the suit'],0);phDeliver()}
function kdMedMorning(done){const k=S.kd,m=k.med;m.d++;m.clar=Math.min(3,m.clar+1);S.done.bedChosen=1;save();const me=S.pov!=='v';
 if(m.d>=3){const L=me?[['','V walks her up the stairs himself, one at a time, with a hand under her elbow. She lets him.'],['','The infirmary door is on the kennel corridor. It says LAUNDRY. She has walked past it forty times.'],
    ['hitmeuppp',MV('u have a hospital.','u have a HOSPITAL. in the BASEMENT.','You have a hospital in your basement, and the sign says “laundry.”','You’ve got a whole hospital behind a door that says “laundry.” I thought I was back in it, V. For two days. You could’ve put up a fucking poster.')],['K9','There is a poster now.']]
   :[['','On the third morning she knows the house. She asks why the door says LAUNDRY, and he tells her that nobody ever opens a laundry.'],['hitmeuppp',MV('i thought i was back there.','i thought i was back in it. for two days.','I thought I was back in it. For two days, in your house.','For two days I thought I was back in it, and you were the guard. You could’ve put up a fucking poster.')],['K9','There is a poster now.']];
  const aft=k.aftL||[['','She is upstairs again, in daylight.']];k.med=null;k.aftL=null;k.t0=S.day;save();return say(L,()=>cut(aft,done,'#05040a'))}
 if(me){if(m.d===1){kdBacklog();return say([['','Somebody is changing the bag on the stand. She keeps her eyes shut and her breathing slow, the way she did for the others.'],
    ['','This guard is new. He says “I apologise” to her hand before he touches the tape. He smells of dog.'],['hitmeuppp','(good cop. ok. they’ve got a good cop now. don’t fall for it.)'],
    ['','When she looks, her phone is on the floor just inside the door, face up and charged.']],done)}
  m.clar=Math.max(m.clar,2);save();return say([['','There is a weight across her legs that was not there last night. It is warm, and it snores.'],
   ['hitmeuppp',MV('(dog.)','(they brought a DOG in. to soften me up. good trick.)','(They’ve brought in a dog. It’s a good trick. It’s exactly Biscuit’s weight.)','(A dog, to soften me up. It weighs what Biscuit weighs and it’s got Biscuit’s stupid ear. ...Oh.)')],
   ['','Her left hand goes to scratch the ear and doesn’t arrive. She looks at it properly for the first time. It is in a cast to the elbow, and two steel pins stand out of the back of it.'],['hitmeuppp','(huh. when did that happen.)']],done)}
 if(m.d===1){const found=late=>()=>{if(late)calm(-3);say([['',late?'Ten minutes lost in the kennel corridor. By the time he reaches the garage she has the big door up by a hand’s width.':'She is where he thought she would be.'],
    ['','She is holding the drip stand like a spear, on a foot she should not be standing on. She does not know him.']],()=>ask('K9','(She believes she is still in that building.)',[
    {t:'Sit down on the floor.',fn:()=>{calm(5);kdClarUp();fin()}},{t:'Say the day and the place.',fn:()=>{calm(3);fin()}},{t:'Let Biscuit through.',fn:()=>{calm(6);m.clar=Math.max(m.clar,2);save();fin()}}]))};
  const fin=()=>say([['hitmeuppp','i’m fine. i was just leaving.'],['','She says it pleasantly, as if he had met her on the way out of a shop. There is blood down the hand where the needle was, and she has not noticed that either.'],['K9','(She is not lying to me. She believes it.)']],done);
  return say([['','At six the infirmary bed is empty. The drip stand is gone, and a line of blood drops leads to the door.']],()=>ask('K9','(Where would she go.)',[{t:'The garage. She will go for the biggest door.',fn:found(0)},{t:'The kennel corridor.',fn:found(1)}]))}
 say([['','She asks for a mirror. The doctor has said not yet.']],()=>ask('K9','(She has not seen her face.)',[
  {t:'Give her the mirror.',fn:()=>{S.f.kdMirror=1;apply({heart:-1});save();say([['hitmeuppp',MV('see? fine.','see? fine. told u.','See? Fine. I told you.','See? Fine. I’ve looked worse after karaoke. You’re all so dramatic.')],['','She is looking straight at fourteen stitches and an eye that will not open. He watches her do it, and she hands the mirror back and asks what’s for lunch.']],done)}},
  {t:'“Not yet.”',fn:()=>{apply({tension:2});say([['hitmeuppp',MV('why.','u think i can’t handle a bruise?','You think I can’t handle a bruise?','What, you think I’ll faint at a bruise? I’ve seen what I do to other people, V.')],['K9','I think that you would look at it and tell me it was nothing. I am not ready to hear that.']],done)}}]))}
const _meKD=morningEvent;morningEvent=function(done){if(kdMed()){S.bed=null;return kdMedMorning(done)}return _meKD(done)};
/* V: sitting with her */
function kdSit(){const m=S.kd.med;const pre=[['','She is asleep, or pretending to be. The chart on the end of the bed runs to two pages.']].concat(S.f.kdChartV?[]:KD_CHART);S.f.kdChartV=1;save();go({draw:hubBg});
 say(pre,()=>ask('K9','(He has read it eleven times.)',[
  {t:'Sit on the floor outside the door.',fn:()=>{calm(4);say([['','He sits where she will hear a person breathing and not have to see one. Sergeant lies down across his shins.']],hub)}},
  {t:'Read to her through the door.',fn:()=>{calm(5);apply({aff:1});say([['K9','Chapter four. The land tax reform of 1873.'],['','After twenty minutes something hits the inside of the door, lightly. It is a foam ball. He takes it for a request to continue.']],hub)}},
  {t:'Go in and sit by the bed.',fn:()=>{if(m.clar<2){calm(-5);return say([['','She has the soup tray up edge-out before he is through the door, in the hand that works.'],['K9','(I am the guard. Of course I am. I am the right height.)'],['','He backs out and shuts the door, and sits down against it.']],hub)}
    calm(6);apply({aff:2});say([['','She moves her feet to make room on the bed for a dog, and then a little more room than a dog needs.'],['hitmeuppp',MV('hi.','hi. i’m fine btw.','Hi. I’m fine, by the way.','Hi. I’m fine, before you ask. Stop looking at my hand like that, it’s a hand.')]],hub)}}]))}
const _shKD=sideHub;sideHub=function(late){const o=_shKD(late);if(!kdMed()||S.pov!=='v')return o;return o.concat([{h:'Sublevel two'},{t:'The infirmary',sub:S.done.kdSit?'done today':'costs time · sit with her',dis:late||!!S.done.kdSit,fn:()=>{spend();S.done.kdSit=1;kdSit()}}])};
/* she is more tired than she says, for a while after */
const _hubKD2=hub;hub=function(){try{if(S&&S.kd&&S.kd.t0&&!S.kd.med&&S.phase==='after'&&S.kd.tiredDay!==S.day&&S.day-S.kd.t0<4){S.kd.tiredDay=S.day;if(S.slot===0){apply({energy:-20});toast(S.pov==='v'?'She says she slept well. She did not.':'Slept great. (Energy is low.)')}}}catch(e){}return _hubKD2.apply(this,arguments)};
/* before: the man she put in the canal comes back up */
EVENTS.push({id:'kd_omen',when:()=>S.phase==='normal'&&(S.paid||0)>=1&&!S.f.kidnapSet&&!isLone(),run:done=>say(S.pov!=='v'?[
 ['','The canal gives a man back, down by the pumping station. The news says “unidentified.” She identifies him from the shoes.'],
 ['hitmeuppp',MV('oops.','should’ve weighted him. lazy.','I should have weighted him. That was lazy.','I should’ve weighted him. I was in a hurry, there was a sale on. That’s going to be a problem, isn’t it.')],
 ['','On the way home there is a grey van at the end of her road with no front plate. It is gone when she looks again, and she decides that settles it.']]:[
 ['','The evening news has a body out of the canal by the pumping station. V knows the tailoring. A certain firm dresses all its men at the same shop.'],
 ['K9','(She told me about a canal, in the spring. She was proud of the knot.)'],
 ['','He sends “Did you eat today?” an hour early. She sends back a photograph of a corn dog.']],done)});
kdEv('kd_konbini',()=>kdD()>=1&&kdMe()&&!S.f.kdKonbini,done=>{S.f.kdKonbini=1;save();say([
 ['','At the konbini the clerk rings up her noodles, looks at her, and voids the sale. He pushes the bag across the counter with two fingers and looks at the cigarette display until she leaves.'],
 ['hitmeuppp',MV('free noodles??','free noodles. nice guy. weird, but nice.','Free noodles. Nice of him. Odd man.','Free noodles! He didn’t even want to chat. People are so nice in this neighbourhood when you’re not robbing them.')],
 ['','On the way out a child points at her and is turned around by the shoulders.']],done)});
kdEv('kd_angelsees',()=>kdD()>=1&&frT('a')>=1&&!S.f.kdAngelSees,done=>{S.f.kdAngelSees=1;fr('a',3);save();say([
 ['','Angel comes through the door already talking and stops in the middle of a word.'],['hitmeuppp',MV('hi. what.','what. i’m fine. what’s that face.','What? I’m fine. Why are you making that face?','What? I’m fine. Babe. You’re doing a face. It’s a stiff hand and a bad haircut.')],
 [AN,'no face. there’s no face. sit down, i’m doing your eyebrows.'],['','She does the eyebrows. It takes an hour, and she does it with the big makeup case open and her back to the shotgun, and twice she has to stop and look at the ceiling.']],done)});

/* ---------- 3. PHONE ---------- */
txDef('tx_kd_help',{with:'v',pov:'m',prio:3,when:()=>kdMed()&&S.kd.med.d>=1&&S.kd.med.clar<3,nodes:{
 start:{in:()=>['Misaki. You have your telephone back.','Where do you believe you are?'],expire:2,
  opts:()=>[{t:'“don’t come. room w a bulb. they moved me”',fx:()=>kdClarUp(),reply:()=>['You are on sublevel two of my house. I am four metres from you, on the other side of that door.','I am going to knock twice.','(two knocks, from the door)'],next:'two'},
   {t:'“who is this”',fx:()=>kdClarUp(),reply:()=>['It is V. You have this number saved as “tall problem.” I have seen your telephone.'],next:'two'},
   {t:'[Don’t answer. It’s a trick.]',reply:()=>['I will ask again in an hour. I will ask every hour.']}]},
 two:{in:()=>['The door is not locked. Open it or leave it shut. I will be here in either case.'],
  opts:()=>[{t:'“prove it. what’s my cactus called”',fx:()=>{kdClarUp();apply({aff:2})},reply:()=>['Prickles. He is on your windowsill, and I have not watered him.']},
   {t:'“ok”',fx:()=>calm(3),reply:()=>['Good. Eat the soup. I made it, and I watched myself make it.']}]}}});
txDef('tx_kd_fine',{with:'v',pov:'m',prio:2,when:()=>kdPost()&&tier()>=1,nodes:{
 start:{in:()=>['The doctor says you told her that you are fine.'],expire:3,
  opts:()=>[{t:'“i AM fine”',reply:()=>['This morning you asked me to pass the salt with a hand that has two steel pins in it.','You have not looked at that hand since Tuesday. I have been counting.'],next:'list'},
   {t:'“it’s just stiff”',reply:()=>['It was broken on the first day and again on the third. “Stiff” is your word for it. I am not correcting you. I am telling you that there is another word.'],next:'list'}]},
 list:{in:()=>['Do you want the list? I can send one line of it or all of it. You may also say no.'],
  opts:()=>[{t:'“one line”',fx:()=>{S.f.kdTruth=1;calm(-2);apply({aff:2})},reply:()=>['Left foot: fractured, then walked on for roughly two kilometres.','That is the distance to my door. You told me that you ran part of it.']},
   {t:'“all of it”',fx:()=>{S.f.kdTruth=2;calm(-5);apply({aff:3})},reply:()=>['Left hand, twice. Right shoulder. Three ribs. The foot. Both wrists, to the tendon. Fourteen sutures. Two teeth. Seven kilograms.','Your back, which I will describe if you ask and not otherwise.','You said “fine” in the car. I believe that you meant it. That is the part that frightens me.']},
   {t:'“no”',fx:()=>{S.f.kdTruth=0;calm(2)},reply:()=>['Then I will keep it. Ask when you want it.']}]}}});
txDef('tx_kd_selfie',{with:'a',pov:'m',prio:2,when:()=>(kdMed()&&S.kd.med.d>=1||kdPost())&&frT('a')>=1,nodes:{
 start:{in:()=>['proof of life. selfie. NOW'],expire:3,
  opts:()=>[{t:'[Send one. Thumbs up.]',fx:()=>{fr('a',3);S.f.kdSelfie=1},reply:()=>['(typing for four minutes)','cute. who did the eye. asking for a friend. the friend is a shotgun','i’m coming over. don’t look in any mirrors til i get there. i’m bringing the BIG palette and i need u to not ask why']},
   {t:'“i look fine, i’ll send one later”',fx:()=>fr('a',1),reply:()=>['V told me about the hand','u don’t have to send one. i’m coming anyway. i just wanted to hear u say “fine” so i could be mad at somebody']}]}}});
txDef('tx_kd_rvis',{with:'r',pov:'m',prio:2,when:()=>(kdMed()&&S.kd.med.d>=1||kdPost())&&frT('r')>=1,nodes:{
 start:{in:()=>['came by Vee’s basement hospital. you were out cold','left you a thing on the chair. don’t make it weird'],expire:3,
  opts:()=>[{t:'“why didn’t u wake me”',fx:()=>fr('r',3),reply:()=>['’cause you looked like somethin’ I’d leave in a ditch. I’m the one who makes people look like that. didn’t care for seein’ it on you','had t’go stand in the yard a minute. Vee’s dogs came and stood with me. fuckin’ embarrassing']},
   {t:'“i look FINE”',fx:()=>{fr('r',2);S.f.kdRonCall=1},reply:()=>['sure. yeah. you look fine','(nothing for six minutes)','whoever did the hand is mine t’kill. tell Vee I called it']}]}}});
txDef('tx_kd_mdoor',{with:'m',pov:'v',prio:3,when:()=>kdMed()&&S.kd.med.d>=1&&S.kd.med.clar<3,nodes:{
 start:{in:()=>['V','im in another one. room, bulb, needle in my hand','dont come. its what they want. just telling u so u know i didnt leave on purpose'],expire:2,
  opts:()=>[{t:'“You are in my house. Sublevel two.”',reply:()=>['thats what theyd say'],next:'knock'},
   {t:'“Describe the door.”',reply:()=>['grey. no handle i can see. theres a guy outside it, i can hear him breathe'],next:'knock'}]},
 knock:{in:()=>['if ur really V whats seven down'],
  opts:()=>[{t:'“I do not know. I have left it blank on purpose.”',fx:()=>{kdClarUp();apply({aff:3})},reply:()=>['only V would say that like its a flex','ok its u','theres a handle isnt there. theres been a handle the whole time']},
   {t:'“I am the one breathing. I will knock twice.”',fx:()=>{kdClarUp();calm(3)},reply:()=>['(two knocks)','...ok. dont come in yet. but dont go']}]}}});
txDef('tx_kd_adoc',{with:'a',pov:'v',prio:2,when:()=>(kdMed()||kdPost())&&frT('a')>=1,nodes:{
 start:{in:()=>['how bad. and don’t do the calm voice in text, i can hear it'],expire:3,
  opts:()=>[{t:'“The left hand, twice. Three ribs. The foot. Seven kilograms.”',fx:()=>fr('a',3),reply:()=>['ok','ok. i’m outside ur gate. i have the big makeup case and the shotgun and i don’t know yet which one i need','she’s going to say she’s fine, isn’t she'],next:'fine'},
   {t:'“She is alive.”',fx:()=>fr('a',-1),reply:()=>['that’s not what i asked and u know it','i’m outside ur gate. open it'],next:'fine'}]},
 fine:{in:()=>['when she says she’s fine. do we tell her?'],
  opts:()=>[{t:'“We answer what she asks. Nothing she has not asked.”',fx:()=>{S.f.kdPolicy='ask'},reply:()=>['ok. i can do that. i’ll do her eyebrows and say nothing. i’m so good at saying nothing']},
   {t:'“She should be told.”',fx:()=>{S.f.kdPolicy='tell'},reply:()=>['then u do it. i’ll hold the hand that isn’t in a cast']}]}}});
txDef('tx_kd_rhand',{with:'r',pov:'v',prio:2,when:()=>(kdMed()||kdPost())&&frT('r')>=1,nodes:{
 start:{in:()=>['which one did the hand'],expire:3,
  opts:()=>[{t:'“The man with the radio stood on it. It was already broken.”',fx:()=>{apply({veng:4});fr('r',2);S.f.kdRonCall=1},reply:()=>['mine','you get the rest. that one’s mine t’kill. I’m askin’ nice']},
   {t:'“She does not know that it is broken.”',fx:()=>fr('r',2),reply:()=>['...the fuck d’you mean she don’t know','(typing for a long time)','okay. then nobody tells her it was him. she finds out when he’s already in my freezer']}]}}});
const _xeKD2=extraEnding;extraEnding=function(){const L=_xeKD2();if(!S||!S.f||!S.kd||!S.kd.t0)return L;const f=S.f;
 if(f.kdStab)L.push('V has a small round scar on his left forearm from a drip needle. He says a dog did it, and the dog he names changes each time.');
 if(f.kdTruth===2)L.push('She asked for the whole list once, by text, and read all of it. She still says “fine.” She says it differently now.');
 else L.push('She never did ask for the list. The left hand aches before rain, and she tells people it is just stiff.');
 return L};

/* ---------- 4. BOTH ROOMS, WALKABLE ---------- */
/* The cell and the infirmary are top-down maps like the rest of the house. They share one floor plan on purpose. Spots
   without a prop (her arm) are placed automatically from the side-view coordinates. */
const kdNoLeave={leave:()=>[],leaveText:()=>S&&S.phase==='taken'?'There is no leaving. Not through the front.':kdClar()<2?'(They’d hear the door.)':'You’re supposed to stay in bed.'};
tdMap('cell',Object.assign({floor:'concrete',wall:'brick',backLabel:'there is no leaving',dust:1,rows:TDROWS.CELL,
 zones:{cell:{r:[2,3,12,5],floor:'concrete',wall:'brick',main:1,under:1,arrive:[7,6,'u']}},
 lights:[{x:128,y:74,r:84,i:.95,col:'255,236,170',flick:.3}],
 view:(x,y,w,h)=>{c.fillStyle='#0a0a0e';c.fillRect(x,y,w,h);for(let k=0;k<4;k++)rect(x+1+k*4,y,1,h,'#3a3a3a')},
 props:[{id:'ce_cot',x:36,y:62,w:44,d:16,h:7,legacy:'Cot',draw:(x,y)=>{tdBox(x,y,44,16,7,'#5a5040','#2a261e','#6a6050');rect(x+2,y-6,10,12,'#4a4236');for(let k=0;k<8;k++)rect(x+16+k*3,y+13,1,3,'#8a8068')}},
  {id:'ce_vent',wall:1,x:44,y:20,w:18,d:26,legacy:'Vent',draw:(x,y)=>{rect(x,y+2,18,12,'#1a1a1a');for(let k=0;k<5;k++)rect(x+1,y+3+k*2,16,1,'#4a4a4a');for(let k=0;k<4;k++)if(k>=(S.f.kdScrews||0))rect(x+(k%2?16:1),y+(k<2?2:13),1,1,'#c8c8d0')}},
  {id:'ce_door',wall:1,x:176,y:16,w:22,d:32,legacy:'Door',draw:(x,y)=>{rect(x,y,22,32,'#2a2a2e');rect(x+1,y+1,20,30,'#3a3a40');rect(x+5,y+8,12,3,'#0a0a0a');rect(x+17,y+18,2,5,'#8a8a8a');for(let k=0;k<3;k++)rect(x+2,y+4+k*11,1,2,'#6a6a70')}},
  {id:'ce_radio',wall:1,x:202,y:22,w:16,d:26,legacy:'The radio',draw:(x,y)=>{if((T>>5)%2)txt('♪',x+8,y+12,'rgba(255,236,170,.35)',8,'center')}},
  {id:'ce_tray',flat:1,solid:false,x:122,y:104,w:14,d:7,legacy:'Meal tray',show:()=>!S.f.tray,draw:(x,y)=>{rect(x,y,14,7,'#8a8a96');rect(x+1,y+1,12,5,'#a8a8b4');rect(x+3,y+2,4,3,'#6a6a70')}},
  {id:'ce_drain',kind:'deco',flat:1,solid:false,x:158,y:84,w:8,d:8,draw:(x,y)=>{rect(x,y,8,8,'#1a1814');for(let k=0;k<3;k++)rect(x+1,y+1+k*3,6,1,'#3a362e');if(S.kd&&S.kd.ses>=3)rect(x-6,y+5,2,2,'#ece4da')}},
  {id:'ce_ties',kind:'deco',flat:1,solid:false,x:60,y:92,w:8,d:4,draw:(x,y)=>{rect(x,y,6,1,'#0e0e0e');rect(x+2,y+2,6,1,'#0e0e0e');rect(x+9,y+1,3,2,'#5a1414')}}]},kdNoLeave));
tdMap('medbay',Object.assign({floor:'lino',wall:'tile',backLabel:'stay in bed',rows:TDROWS.MEDBAY,
 zones:{medbay:{r:[2,3,12,5],floor:'lino',wall:'tile',main:1,under:1,arrive:[7,5,'d']}},
 lights:[{x:128,y:74,r:84,i:.9,col:'255,226,170'}],
 props:[{id:'mb_bed',x:36,y:62,w:46,d:18,h:10,legacy:['Cot','Bed'],draw:(x,y)=>{const lo=kdClar()<2;tdBox(x,y,46,18,10,lo?'#5a5040':'#ece4da',lo?'#2a261e':'#b8b0a0',lo?'#6a6050':'#fff');rect(x+2,y-9,12,14,lo?'#4a4236':'#c8d0d8');if(!lo&&kdMed()&&S.kd.med.d>=2){rect(x+22,y-8,18,10,'#c49a5a');rect(x+36,y-10,5,5,'#b0864a')}}},
  {id:'mb_iv',x:88,y:64,w:6,d:6,h:34,legacy:['The line in your hand','The drip'],draw:(x,y)=>{rect(x+2,y-34,2,38,'#b0b0b0');rect(x-2,y-36,10,2,'#b0b0b0');rect(x-1,y-34,6,10,'rgba(200,230,240,.75)');rect(x-1,y+3,8,2,'#8a8a8a')}},
  {id:'mb_eye',wall:1,x:118,y:20,w:12,d:26,legacy:['The eye in the ceiling','Smoke detector'],draw:(x,y)=>{rect(x+2,y+2,8,4,'#d8d4c8');if((T>>6)%4===0)rect(x+5,y+3,2,2,'#d0283f')}},
  {id:'mb_chart',x:86,y:88,w:10,d:5,h:12,legacy:['Their notes','Your chart'],draw:(x,y)=>{rect(x,y-12,10,13,'#5a4030');rect(x+1,y-10,8,10,'#ece4da');for(let k=0;k<4;k++)rect(x+2,y-9+k*2,6,1,'#3a4a6a')}},
  {id:'mb_tray',x:152,y:104,w:20,d:10,h:8,legacy:['Tray','Soup'],draw:(x,y)=>{tdBox(x,y,20,10,8,'#8a8a96','#5a5a64');rect(x+6,y-7,8,5,kdClar()<2?'#6a6a70':'#c8b89a')}},
  {id:'mb_mirror',wall:1,x:148,y:18,w:20,d:28,legacy:['Something covered up','The mirror'],draw:(x,y)=>{rect(x,y+2,20,22,'#3a4a46');if(S.f.kdMirror&&kdClar()>=2)rect(x+2,y+4,16,18,'#9ab0b8');else{rect(x+1,y+3,18,21,'#c8b89a');rect(x+1,y+3,18,2,'#a89878')}}},
  {id:'mb_door',wall:1,x:184,y:16,w:22,d:32,legacy:['Door','The door'],draw:(x,y)=>{const lo=kdClar()<2;rect(x,y,22,32,lo?'#2a2a2e':'#3a4a46');rect(x+1,y+1,20,30,lo?'#3a3a40':'#5a6a64');if(!lo){rect(x+17,y+18,2,5,'#c9a46a');rect(x+3,y+5,16,7,'#ece4da');rect(x+5,y+7,12,1,'#9aa8a2');rect(x+5,y+9,9,1,'#9aa8a2')}}},
  {id:'mb_phone',flat:1,solid:false,x:170,y:112,w:6,d:9,legacy:'Your phone',show:()=>kdMed()&&S.kd.med.d>=1,draw:(x,y)=>{rect(x,y,6,9,'#141018');rect(x+1,y+1,4,6,(T>>5)%2?'#5fd4c4':'#2a3a4a')}},
  {id:'mb_ball',flat:1,solid:false,x:112,y:118,w:6,d:6,legacy:'Foam ball',show:()=>kdClar()>=2,draw:(x,y)=>{c.fillStyle='#e0c84a';c.beginPath();c.arc(x+3,y+3,3,0,7);c.fill()}},
  {id:'mb_dogbed',kind:'deco',flat:1,solid:false,x:196,y:104,w:22,d:14,show:()=>kdClar()>=2,draw:(x,y)=>{rect(x,y,22,14,'#5a4030');rect(x+2,y+2,18,10,'#8a6a4a')}}]},kdNoLeave));
const _tdAmbKD=tdAmbient;tdAmbient=function(M,z){if(M&&(M.id==='cell'||(M.id==='medbay'&&kdClar()<2)))return{d:.66,col:'12,8,4'};if(M&&M.id==='medbay')return{d:.3,col:'8,10,16'};return _tdAmbKD(M,z)};

/* ---------- 5. WHAT IT DOES TO HER: the sprite and her pace ---------- */
/* kdCond() 0–4. In the cell it climbs with each session and failed escape. In the infirmary it starts at 4 and comes
   down a step at a time; a cast and a head dressing stay for the rest of the after-phase. Her walking speed follows it. */
function kdCond(){if(!S||!S.kd||isLone())return 0;const k=S.kd;if(S.phase==='taken')return S.pov==='v'?0:Math.min(4,k.ses+((S.tries||0)>=1?1:0));
 if(S.phase!=='after'||!k.t0)return 0;if(k.med)return [4,3,3,2][Math.min(3,k.med.d)];return S.day-k.t0<3?2:1}
function kdSpeed(){if(typeof tdWho!=='function'||tdWho()!=='m')return 1;const n=kdCond();if(!n)return 1;return Math.max(.45,1-.13*n-(S.phase==='taken'?kdWoozy()*.06:0))}
const KD_RAG=new Map();
function kdRag(a,n,care){const key=n+(care?'c':'t')+((S.tries||0)>=1?'x':'');let m=KD_RAG.get(a);if(!m){m=new Map();KD_RAG.set(a,m)}let b=m.get(key);if(b)return b;
 const g=a.map(r=>r.split(''));const H=g.length,Wd=g[0].length;const at=(j,i)=>j>=0&&j<H&&i>=0&&i<Wd?g[j][i]:'.';const set=(j,i,from,to)=>{if(from.includes(at(j,i)))g[j][i]=to};
 const front=a.some(r=>r.includes('e'));
 if(care){/* cleaned up: a cast to the elbow, a dressing over the stitches */
  for(let j=13;j<=19;j++)for(let i=13;i<=16;i++)set(j,i,'sb','w');if(front){for(let i=3;i<=9;i++)set(6,i,'kKr','w');set(7,4,'kKr','w')}else for(let i=3;i<=12;i++)set(6,i,'kKr','w');
  if(n>=2&&front){set(9,10,'e','K');set(10,5,'s','o')}if(n>=3&&front){set(9,11,'s','o');set(11,10,'so','o');set(10,6,'s','o')}
  if(n>=3)for(let j=30;j<H;j++)for(let i=9;i<Wd;i++){set(j,i,'w','s');set(j,i,'b','.')}}
 else{/* in the cell */
  for(let j=30;j<H;j++)for(let i=9;i<Wd;i++){set(j,i,'w','s');set(j,i,'b','.')}          /* one shoe stayed in the lot */
  set(17,3,'s','h');set(17,15,'s','h');set(18,3,'sb','h');set(18,15,'sb','h');            /* the cable ties */
  if((S.tries||0)>=1)for(let j=2;j<=6;j++)for(let i=12;i<=15;i++)set(j,i,'w','k');        /* they took the clip */
  if(n>=2){for(let j=14;j<=18;j++)set(j,15,'s','o');if(front){set(10,5,'s','o');set(10,6,'s','o')}set(24,11,'s','h')}
  if(n>=3){if(front){set(9,10,'e','K');set(9,11,'s','o');set(11,10,'so','h');set(12,9,'bh','h')}set(15,6,'b','h');set(15,7,'b','h');set(25,6,'g','h');set(21,8,'wb','.');set(22,9,'wb','.')}
  if(n>=4){for(let i=4;i<=7;i++)set(4,i,'kK',front?'h':'K');set(5,4,'kK','h');set(16,8,'r','b');set(16,9,'r','h');set(26,11,'b','h');set(27,6,'b','h');if(front)set(11,6,'s','h')}}
 b=g.map(r=>r.join(''));b.P=a.P;b.S=a.S;m.set(key,b);return b}
const KD_PALC=new Map();
function kdGrime(P,n){const key=n+'|'+Object.values(P).join(',');let o=KD_PALC.get(key);if(o)return o;const t=Math.min(.34,n*.085);const mix=h=>{if(!/^#[0-9a-f]{6}$/i.test(h))return h;const v=parseInt(h.slice(1),16);const ch=(s,d)=>Math.round(((v>>s)&255)*(1-t)+d*t);return'#'+[ch(16,58),ch(8,46),ch(0,42)].map(x=>x.toString(16).padStart(2,'0')).join('')};
 o={};for(const k in P)o[k]=k==='h'?P[k]:mix(P[k]);if(KD_PALC.size>40)KD_PALC.clear();KD_PALC.set(key,o);return o}
let KDF=0;
const _pxKD=tdPx;tdPx=function(a,cx,fy,flip,ps,pal){if(KDF&&a&&a.length>=30){const care=S.phase!=='taken';a=kdRag(a,KDF,care);if(!care)pal=kdGrime(pal||a.P||PAL,KDF)}return _pxKD(a,cx,fy,flip,ps===undefined?1:ps,pal)};
const _actKD=tdActor;tdActor=function(k,x,y,dir,moving,fr,opt){const n=k==='m'?kdCond():0;if(!n)return _actKD(k,x,y,dir,moving,fr,opt);
 /* a limp: she drops on one step of the four, and from three up she carries herself lower */
 const limp=moving&&Math.floor(fr/6)%4===1?1:0;KDF=n;try{_actKD(k,x,y+limp+(n>=3?1:0),dir,moving,fr,opt)}finally{KDF=0}};
const _sprKD=spr;spr=function(a,x,y,flip,s){if(KDF&&(a===MIS||a===MISW||a===MISW2))a=kdRag(a,KDF,S.phase!=='taken');return s===undefined?_sprKD(a,x,y,flip):_sprKD(a,x,y,flip,s)};
const _diKD=drawInterro;drawInterro=function(){KDF=kdCond();try{_diKD()}finally{KDF=0}};
