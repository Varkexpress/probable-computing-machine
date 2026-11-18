/* ===================== WHAT HER HEAD DOES (kc63) =====================
   More angst in the infirmary, almost all of it inside Misaki. She tests her own head, keeps instruments she trusts
   (a pulse, a plastic band with her name on it), and finds out that the thing holding her may be her own mind. On the
   surface she is flat, joking and competent; the narration and greyed options show what is under it. V is at a distance.
   - Misaki, medbay spot "Your wristband" (once she knows the room): reading her own name.
   - Misaki, once a day through the hub, by band, after kc61/kc62's scene for that day: clear (the questions only she
     knows the answers to; the high note); extended delusion (which day was real; the order she would give them people
     in); worst route, still deluded (the pulse; her own name).
   - The moment clarity returns: right after the morning shatter (her body has not been told; every day turns over);
     on an extended stay, the clarity that comes back without breaking; on the worst route, the next hub after the
     logic or caught shatter (she knows, and she has to sleep next to the head that was so sure).
   - V, once a day through the hub, by band: the first day she knows him (she goes back through the days); the numbers
     through the door; the list of names with his left off; her name forty times; the date said at intervals.
   - After discharge (aftermath order): boots in bed, the alarms every forty minutes, the dope card in the glovebox.
   Nothing here names what happened in the hours she cannot remember, and nothing shows a method. */
const k63Med=()=>!!(typeof kdMed==='function'&&kdMed());
const k63M=()=>!!(typeof kdMedM==='function'&&kdMedM());
const k63Worst=()=>!!(typeof kdWorstOf==='function'&&kdWorstOf());
const k63WR=()=>!!(typeof kdWR==='function'&&kdWR());
const k63SA=()=>typeof kdSA!=='function'||kdSA();
const k63No=(t,sub)=>({t,sub,dis:true,fn:()=>{}});
/* kc61 and kc62 each play one scene a day through the same hub; this module waits until theirs is done */
const k63Busy=()=>{try{return !!((typeof k61Scene==='function'&&k61Scene())||(typeof k62Scene==='function'&&k62Scene()))}catch(e){return false}};

/* ---------- Misaki: the wristband ---------- */
ROOMS.medbay.spots.push({at:[118,170],mark:[118,160],label:'Your wristband',show:()=>k63M()&&kdClar()>=2&&!S.f.k63Band,act:()=>{say([
 ['','There is a plastic band on your right wrist with your name on it. '+(k63SA()?'The doctor wrote it in on the first night, in capitals, with a date of birth under it that she must have got from V, because it is the one you made up.':'V wrote it in on the first night, in fountain pen, with a date of birth under it. It is the one you made up, because there isn’t another one.')],
 ['','You read it when you wake. You read it before you eat, and whenever the boiler comes on, because for half a second the boiler is the radio, and after that half-second you need to see your name.'],
 ['','It always says the same thing. You keep expecting a number instead, or UNCOOPERATIVE, which is what they wrote next to you in the other building.'],
 ['hitmeuppp',MV('(still me.)','(still says misaki. ok.)','(It still says Misaki. Okay.)','(It still says Misaki. Spelled right and everything. Somebody in this house can spell me, which is more than the school ever managed.)')]],()=>ask('hitmeuppp','(The band.)',[
  {t:'Read it again.',fn:()=>{S.f.k63Band='read';calm(-1);save();say([['','You read your name, then the date, then your name again, to check it didn’t change while you were reading the date.'],
   ['','When V knocks you have your sleeve pulled down over it, and you tell him you were doing a crossword in your head. Seven down was “wristband”. You are very pleased with it.']])}},
  {t:'Pull your sleeve down over it.',fn:()=>{S.f.k63Band='sleeve';save();say([['','You pull the cuff of his shirt down over it.'],
   ['','For the rest of the afternoon your thumb goes under the cuff every few minutes to find the edge of the plastic, and you only notice it doing that on about one time in five.']])}},
  k63No('Ask him to cut it off.','then you couldn’t check')]))}});

/* ---------- Misaki: one scene a day, by band ---------- */
const KD63_MC=[
 cb=>say([['','You test your head the way you would test a rifle somebody else has had their hands on, with questions only you know the answers to.'],
   ['','What was in the biscuit tin when the flight school said no? Four thousand one hundred and twelve dollars. Where did you come at regionals, at eleven? Third. Nine hundred metres with the old scope? Four clicks up.'],
   ['','You get all of them. An hour later you ask them again, in case.'],
   ['',k63SA()?'There are hours the questions don’t go near. You set them round those hours like a fence, and walk the fence.':'There is a van the questions don’t go near. You set them round it like a fence, and walk the fence.'],
   ['hitmeuppp',MV('(4112. third. 4 up.)','(4112. third. four up. still here.)','(Four thousand one hundred and twelve. Third. Four clicks. I’m still in here.)','(Four thousand one hundred and twelve, third, four clicks up. All correct. I’m still in here. I’ll check again at four.)')]],()=>ask('hitmeuppp','(The questions.)',[
   {t:'Ask one you might get wrong.',fn:()=>{S.f.k63Quiz='hard';calm(-2);save();say([['','You ask yourself what day the van was. You get Thursday, then Wednesday, and then you can’t tell which of them you made up.'],
     ['','You go back to the tin. Four thousand one hundred and twelve. That one has never moved, and you say it over until your mouth is dry.']],cb)}},
   {t:'Stop while you’re ahead.',fn:()=>{S.f.k63Quiz='stop';calm(1);save();say([['','You stop. When V knocks with the soup you tell him you have been doing mental arithmetic for fun, and he believes you, because you used to.']],cb)}},
   k63No('Ask V if your answers are right.','what if they aren’t')])),
 cb=>say([['','There is a high note in the room tonight. It might be the pump on the drip stand, or the lamp, or the inside of your own ears.'],
   ['','The pump’s little green screen says nothing is wrong. A minute later you check it again. You put your good ear to the pump, then to the lamp, then to the pillow, and the note is exactly as loud in each place.'],
   ['','In the corridor a hound’s claws tick on the lino. Your whole body has gone rigid before you know what the sound was, and it stays rigid long after your head has caught up and is telling it so.'],
   ['hitmeuppp',MV('(hound. stand down.)','(it’s a hound. stand DOWN.)','(It’s a hound. Stand down. It’s one of his.)','(That was a hound. One of his, going for water. I know her claws. Stand down. I said stand down, you stupid body.)')]],()=>ask('hitmeuppp','(The note.)',[
   {t:'Count your heartbeats instead.',fn:()=>{S.f.k63Note='count';calm(-1);save();say([['','You count the gaps between your own heartbeats, which are at least yours. Some time after midnight the note stops, or you stop hearing it. At three it starts again.']],cb)}},
   {t:'Sleep with your hand on the pump.',fn:()=>{S.f.k63Note='pump';save();say([['','You sleep with the pillow over your head and your right hand flat on the pump, so that if it changes you will feel it. In the morning your hand is still there, and cold.']],cb)}},
   k63No('Ask V if he can hear it.','then he’d know you can’t tell')]))];
const KD63_MX=[
 cb=>say([['','Here is what you can’t get past. Yesterday, for most of a day, you believed you were in a house. You ate the soup. You let a hound lie on your feet. You were happy in it.'],
   ['','So one of the two days was your head building a room round you, and you can’t tell which. If it can build a house that well, it can build bars.'],
   ['','You look at the bars, and they look like bars. Your head has never lied to you before. You have searched every room you were ever put in, and you have no way to pat this one down.'],
   ['hitmeuppp',MV('(which one.)','(which one was real. which ONE.)','(Which one was real? Yesterday, or this?)','(Which one was it. The house or this. I can’t check my own head for wires. I can’t get behind it to look.)')]],()=>ask('hitmeuppp','(Yesterday.)',[
   {t:'Hold on to yesterday.',fn:()=>{S.f.k63Yday='hold';calm(-1);save();say([['','You hold on to the house: the island, the cereal, the hounds at five. You hold it so hard that by the afternoon you can’t tell whether you are remembering it or making it, and you put it down.']],cb)}},
   {t:'Let yesterday go. Believe the bars.',fn:()=>{S.f.k63Yday='bars';calm(-2);save();say([['','You decide on the bars, because the worse one has always turned out to be the true one. For about an hour your hands stop shaking.']],cb)}},
   k63No('Ask the tall one which one is real.','he would lie either way')])),
 cb=>say([['','You work out the order before they come again, so that it will be yours and not the needle’s.'],
   ['','If they come they will ask about people. Last time you gave them things without knowing you had. This time you will decide first: who they get, and in what order, and how much about each.'],
   ['','It takes all afternoon. The worst part is that it has an order at all, that your head can rank them, quite calmly, by who would forgive you fastest.'],
   ['hitmeuppp',MV('(ronin first. he’d get it.)','(ronin first, he’d laugh. angel second. not V. never V.)','(Ronin first; he’d understand. Angel second. V nowhere. They don’t get V.)','(Ronin first, because he’d understand and then he’d kill them. Angel second, because she’d forgive me before I finished asking. V nowhere on it. They don’t get V, whatever they do.)')]],()=>ask('hitmeuppp','(The order.)',[
   {t:'Put yourself at the top.',fn:()=>{S.f.k63Ord='self';calm(1);save();say([['','You cross them all out and put your own name first, and under it your own name again, all the way down. Whatever they want, they can have it out of you.'],
     ['','You go to sleep on that. It is the first real sleep in two days.']],cb)}},
   {t:'Leave it as it is.',fn:()=>{S.f.k63Ord='list';calm(-2);save();say([['','You leave it. You go over it until you know it like a phone number, and you hate the kid who wrote it, and you go over it again at night in case you need it.']],cb)}},
   k63No('Tear it up.','it’s in your head. there’s nothing to tear')]))];
const KD63_MW=[
 cb=>say([['','Two fingers on the inside of your right wrist, all day. Your pulse is the one instrument in the room you trust. Nobody brought it in on a tray.'],
   ['','You count it for a minute and get a number. You count it again and get a different one. You decide to stop when you get the same number three times running.'],
   ['','You never get it three times. By the evening your two fingers have left a dent, and you can’t remember what the first number was.'],
   ['','When the tall one comes in with the tray you tell him you are taking your pulse for fun. It’s a hobby. Some people knit.'],
   ['hitmeuppp',MV('(98. 104. 91.)','(ninety-eight. a hundred and four. ninety-one. again.)','(Ninety-eight. A hundred and four. Ninety-one. Again.)','(Ninety-eight. A hundred and four. Ninety-one. It can’t be all of those. One of them is lying, and I’m the only one counting. Again.)')]],()=>ask('hitmeuppp','(Again.)',[
   {t:'Count again.',fn:()=>{S.f.k63Pulse='again';calm(-2);save();say([['','Eighty-eight, the lowest yet. You don’t believe it, so you count again.']],cb)}},
   {t:'Take your fingers off.',fn:()=>{S.f.k63Pulse='off';calm(-1);save();say([['','You take them off and sit on the hand. Without the count the room gets bigger. Ten minutes later the fingers are back on your wrist, and you didn’t feel yourself put them there.']],cb)}},
   k63No('Let it be whatever it is.','you have to know')])),
 cb=>say([['','You say your name into the pillow, to hear it. Misaki. It sounds like a word from a language you learned off a tape.'],
   ['','You say it louder. You can’t tell any more whether it is yours or something they called you in the other building.'],
   ['','Through the door, the tall one says it back, low and even, as a hound is called in from a field. In his mouth it sounds more like you than it did in yours.'],
   ['hitmeuppp',MV('(don’t answer.)','(don’t answer him. don’t.)','(Don’t answer. That’s how they do it: they give you your own name back.)','(Don’t answer. They take your name off you, and then they’re the only ones who say it right, and you start coming when they call.)')]],()=>ask('hitmeuppp','(He said it.)',[
   {t:'Say it yourself until it fits.',fn:()=>{S.f.k63Name='say';calm(-1);save();say([['','You say it to the wall forty times. Around the thirtieth it stops meaning anything, and you lie there with the sound of it in your mouth and no girl attached to it.']],cb)}},
   {t:'Push your face into the pillow until he stops.',fn:()=>{S.f.k63Name='pillow';calm(-2);save();say([['','He says it twice more, a long way apart, and then he stops. You wait for him to say it again for the rest of the night.']],cb)}},
   k63No('Answer him.','not to them')]))];

/* ---------- Misaki: the moment it comes back ---------- */
/* a normal stay: right after the morning shatter (and kc61's bin) */
function k63After(next){S.f.k63Sh=1;save();go(cutBg('#1c2422'));say([
 ['','The room is a room. Your body hasn’t been told.'],
 ['','Your heart is still going at the speed it kept in the cell, and your right hand is still shut. Every few seconds your eyes go to the gap under the door to check it for feet.'],
 ['','Then the days come back, all at once, and they have changed while you weren’t looking. Every time the tall one knelt, it was V kneeling. Every time you thanked the guard for the water in the voice from the slot, you were thanking V, and he said “you are welcome”, and went out, and sat down outside.'],
 ['','You go through them one at a time, sitting on the floor, and each one turns over and has his face on the other side.'],
 k63SA()?['','Under the floor of it there are still the hours from the other building. The break doesn’t reach that far down.']:['','Under the cast the hand goes on throbbing at its own speed, the same as it did in the cell.'],
 ['hitmeuppp',MV('(it was him.)','(it was him. every time. it was him.)','(It was him every time. I thanked him like he was one of them.)','(It was V. Every soup. Every time I said thanks in that voice. He sat there and took it and said “you are welcome”, and I counted his steps.)')]],()=>ask('hitmeuppp','(The floor.)',[
 {t:'Get up before he comes in.',fn:()=>{S.f.k63Up='up';calm(1);save();say([['','You get up and sit on the bed with your legs crossed and your hair pushed back. When he knocks you say come in, and you sound completely normal, and your fist is under your thigh.']],next)}},
 {t:'Stay down there until your hands stop.',fn:()=>{S.f.k63Up='floor';calm(-1);save();say([['','You stay on the floor. Your hands don’t stop. After an hour you get up anyway, because the lino is cold and the hands have no plans.']],next)}},
 k63No('Call him in.','not with this face')]))}
const _fx63=kdShatterFx;kdShatterFx=function(cb,o){try{if(k63M()&&!(o&&o.dark)){
 if(o&&o.title===''&&!S.f.k63Sh){const c0=cb;cb=function(){const _s=say;let hit=0;say=function(L,c2){say=_s;hit=1;return _s(L,()=>k63After(c2))};try{return c0.apply(this,arguments)}finally{if(!hit)say=_s}}}
 else if(!(o&&o.title==='')&&!S.f.k63ShW){S.f.k63ShW=1;save()}}}catch(e){}return _fx63(cb,o)};
/* an extended stay: it comes back without breaking */
const k63XBack=cb=>say([['','It comes back without breaking, this time. Nothing cracks and nothing falls. The bulb is a lamp again, as a word comes back that was on the tip of your tongue, and you can’t remember not knowing it.'],
 ['','You don’t trust it. You had a whole room yesterday and woke up in the other one.'],
 ['','So you keep very still inside it, as if you were standing on ice.'],
 ['hitmeuppp',MV('(don’t move.)','(don’t move. don’t look at it hard.)','(Don’t move. Don’t look at it too hard or it goes.)','(Don’t move. Don’t look straight at it. Last time I looked straight at it, it went, and I was back in there by breakfast.)')]],()=>ask('hitmeuppp','(The lamp.)',[
 {t:'Say the date out loud.',fn:()=>{S.f.k63XBa='date';calm(2);save();say([['','You say it to the lamp. He told you it through the door this morning. You say it again at noon and at four, like a reading off a gauge, and it stays the same date.']],cb)}},
 {t:'Don’t believe it yet.',fn:()=>{S.f.k63XBa='wait';calm(-1);save();say([['','You eat the soup as a guard’s soup and lie on the bed as if it were a cot, in case, so that it can’t be taken off you twice.']],cb)}},
 k63No('Tell V it’s back.','not till it stays')]));
/* the worst route: the next hub after the logic or caught shatter */
const k63WBack=cb=>{const intr=!!S.f.kdInterrupted;say([
 ['',intr?'He let go of your wrists at six. Since then you have known where you are, completely.':'You worked it out, and opened the door, and he was there. Since then you have known where you are, completely.'],
 ['','It came with everything else attached. Everything you said to the tall one. The sums you did about Friday, very calmly, in a clean bed in his house, while he read a yard away.'],
 ['','You were so sure. You were sure enough to decide things. Your head did that by itself, and from the inside it felt exactly like being right.'],
 ['hitmeuppp',MV('(it was so sure.)','(i was SURE. i was so sure.)','(I was sure. I was completely sure, and I was wrong.)','(I was so sure. I’d have bet my life on it. I nearly did. My own head did that, and it’s still in here with me, and I have to sleep next to it.)')]],()=>ask('hitmeuppp','(Your head.)',[
 {t:'Lie down facing the door.',fn:()=>{S.f.k63WB='door';calm(2);save();say([['','You lie down facing the door, as you have in every room of your life except that one. He is on the other side of it. You can hear the pages.']],cb)}},
 {t:'Count what’s true.',fn:()=>{S.f.k63WB='count';calm(1);save();say([['hitmeuppp',MV('(1 ironed. 2 his. 3 me.)','(one: ironed. two: his house. three: i’m in it.)','(One: the bed is ironed. Two: it’s his house. Three: I’m in it.)','(One: the bed is ironed. Two: it’s his house. Three: I’m in it. Four: there isn’t a four yet. Start again.)')],
   ['','You say them in order, and again, and you don’t get to four, because there isn’t a four you trust yet.']],cb)}},
 k63No('Tell him what you’d decided.',intr?'he heard. you know he heard':'he can’t ever know')]))};

function k63Scene(){if(!S||!S.f||dlg||!k63Med())return null;const m=S.kd.med;
 const run=(fn,bg,mark)=>cb=>{mark();save();go(cutBg(bg));fn(cb)};
 const day=()=>{S.f.k63Day=S.day};
 if(S.pov!=='v'){
  if(S.f.k63ShW===1&&m.logicOut&&kdClar()>=2)return run(k63WBack,'#1c2422',()=>{S.f.k63ShW=2});
  if(S.f.k63Day===S.day||(S.slot||0)<1||k63Busy())return null;
  if((m.xd||0)>=1&&kdClar()>=2&&!k63Worst()&&!S.f.k63XB)return run(k63XBack,'#1c2422',()=>{S.f.k63XB=1;day()});
  if(k63WR()&&kdClar()<2){const i=S.f.k63MW||0;if(S.f.kdMindDay!==S.day||i>=KD63_MW.length)return null;return run(KD63_MW[i],'#0c0a08',()=>{S.f.k63MW=i+1;day()})}
  if((m.xd||0)>=1&&kdClar()<2&&!k63Worst()){const i=S.f.k63MX||0;if(i>=KD63_MX.length)return null;return run(KD63_MX[i],'#0c0a08',()=>{S.f.k63MX=i+1;day()})}
  if(kdClar()>=2&&m.shattered&&(m.d||0)>=1&&!k63Worst()){const i=S.f.k63MC||0;if(i>=KD63_MC.length)return null;return run(KD63_MC[i],'#1c2422',()=>{S.f.k63MC=i+1;day()})}
  return null}
 if(S.f.k63Day===S.day||(S.slot||0)<1||(m.d||0)<1||k63Busy())return null;
 if(k63Worst()){if(S.f.k63VW)return null;return run(KD63_VW,'#06060c',()=>{S.f.k63VW=1;day()})}
 if((m.xd||0)>=1&&(m.clar||0)>=2&&!S.f.k63VB)return run(KD63_VB,'#1c2422',()=>{S.f.k63VB=1;day()});
 if((m.xd||0)>=1&&(m.clar||0)<2&&!S.f.k63VX)return run(KD63_VX,'#06060c',()=>{S.f.k63VX=1;day()});
 if((m.clar||0)>=2){const i=S.f.k63VC||0;if(i>=KD63_VC.length)return null;return run(KD63_VC[i],'#1c2422',()=>{S.f.k63VC=i+1;day()})}
 return null}

/* ---------- V: one a day, by band, from a distance ---------- */
const KD63_VC=[
 cb=>say([['','The first day they know him, he watches them go back through the days.'],
   ['','He can see it from the doorway. He kneels to put the tray down, as he has every day, and their eyes go to his knee on the lino and stay there, and something crosses their face and is put away. He hands them the spoon, and the same thing happens. When they thank him he says “you are welcome”, and they shut their eyes for a second.'],
   ['K9','(They are taking each thing I did while they did not know me and finding me in it. I cannot do that for them, and I cannot make there be fewer of them.)'],
   ['','He goes out and sits down in the corridor, where he sat on all the other days.']],()=>{calm(-1);cb()}),
 cb=>say([['','In the afternoon, through the door, they are saying numbers under their breath. Four thousand one hundred and twelve. Third. Four clicks.'],
   ['','An hour later they say them again in the same order, at the same speed, like a check before a shot.'],
   ['','He knows the first one. It was in a biscuit tin, a long time ago, and it was going to be flight school.'],
   ['K9','(They are making sure that they are still in there, with things only they would know. They get them right, and an hour later they check again.)'],
   ['','He does not knock until they have finished. He writes nothing down.']],()=>{calm(-1);cb()})];
const KD63_VX=cb=>say([['','At four in the afternoon they are talking to themself on the far side of the door, low and businesslike, in the voice they use to price a job.'],
 ['','It is names. Ronin, then Angel, in that order, and what she could give about each of them, and how much.'],
 ['','His name is not on it. He listens for it twice through.'],
 ['','The third time through they stop, and begins again with their own name, and then their own name again, and nothing else.'],
 ['K9','(They are deciding whom to give them, so that the needle cannot decide it. They have left me off, and put themself on in my place.)'],
 ['','He sits with his back to the door until the list stops.']],()=>{calm(-2);cb()});
const KD63_VW=cb=>say([['','From the corridor he hears them say their own name. Then again, louder, as if they were testing a microphone.'],
 ['','They say it forty times. He counts, because there is nothing else he can do with his hands.'],
 ['','Twice he says it back, low, through the wood. Both times they stop, and the room goes very still, and then they start again.'],
 ['K9','(My voice is in the wrong place. Anything I give them through this door goes into the cell with them.)'],
 ['','He stops answering. At forty they stop too. He writes “40” on the chart, and does not know why.']],()=>{calm(-2);cb()});
const KD63_VB=cb=>say([['','They know him again by the afternoon. It comes back to them slowly this time, and they hold it very carefully, as though it could be taken away.'],
 ['','They hardly move. They eat his soup, looks at the lamp, and says the date to themself at intervals, like a reading off a gauge.'],
 ['K9','(The last time they knew me, it went in the night. They remember that better than I do.)'],
 ['','He does not go in. He says the date through the door at noon, and again at four, in the same words, so that it will match.']],()=>{calm(1);cb()});

const _hub63=hub;hub=function(){const a=arguments,self=this;try{const s=k63Scene();if(s)return s(()=>_hub63.apply(self,a))}catch(e){}return _hub63.apply(self,a)};

/* ---------- after discharge ---------- */
const k63Ev=(id,when,run)=>kdEv(id,()=>!S.f[id]&&!isLone()&&when(),done=>{S.f[id]=1;save();run(done)});
k63Ev('kd63_boots',()=>kdD()>=1,done=>{const me=S.pov!=='v';
 if(me)return say([['','The first nights upstairs you sleep in your boots.'],
  ['','Laced and double-knotted, under his duvet, with your jeans on and your phone in the back pocket. If they come, you will not be the kid with one shoe on the cell floor again.'],
  ['','You know nobody is coming. Your feet haven’t been told.'],
  ['','You tell him it’s a trailer thing; the floor there is freezing. He has stood on that floor in summer, and he lets it go.'],
  ['hitmeuppp',MV('(boots on. good.)','(boots on. if they come i run.)','(Boots on. If they come, I can run.)','(Boots on. Knots doubled. If they come I can run on a broken foot, as long as it’s in a boot. I’ve done the maths.)')]],()=>ask('hitmeuppp','(The boots.)',[
  {t:'Keep them on.',fn:()=>{S.f.k63Boots='on';calm(-1);save();say([['','You keep them on. In the morning there is mud from the garage on his sheets. He changes them without a word and stands your boots by the bed for the next night, with the laces loosened.']],done)}},
  {t:'Take them off. Stand them by the bed, laced.',fn:()=>{S.f.k63Boots='off';calm(-2);save();say([['','You stand them by the bed with the laces open and the tongues pulled out, pointing at the door. At two you wake with one foot already in the left one.']],done)}},
  k63No('Tell him why.','he’d be careful with you for ever')]));
 say([['','The first night upstairs he finds them asleep on their side of his bed fully dressed, under the duvet, in their boots, laced.'],
  ['','In the morning they say it is a trailer habit; the floor there is freezing. He has stood on the trailer floor in summer.'],
  ['K9','(They are sleeping ready to run. They are doing it in my bed.)']],()=>ask('K9','(Their boots.)',[
  {t:'Change the sheets. Say nothing.',fn:()=>{S.f.k63Boots='sheets';save();say([['','He changes the sheets every morning. On the fourth he buys a second set, dark grey, so that the mud from the garage will not show and they will not have to see it.']],done)}},
  {t:'Stand his own boots by the bed.',fn:()=>{S.f.k63Boots='his';apply({aff:2});save();say([['','He stands his own boots by the bed, beside the place theirs would go, laces open.'],
    ['','They look at them for a long time that night. In the morning theirs are still on their feet, but they have turned his round so that they point at the door as well.']],done)}}]))});
k63Ev('kd63_alarms',()=>kdD()>=2,done=>{const me=S.pov!=='v';
 if(me)return say([['','You set alarms: one every forty minutes, from midnight to six, on vibrate, under your pillow.'],
  ['','The rule from the other building holds when you are asleep. If you go under for too long, things happen that you don’t get to see. Forty minutes is as long as you think you can afford.'],
  ['',k63SA()?'You don’t think about why forty. It is a number you came up with in the dark, and you leave the reason where it is.':'You picked forty because the radio in the other building did the jingle on the forty, and your body still keeps that time.'],
  ['','Each time it buzzes you wake all at once, check the door and your hands, and lie back down. By morning you have woken nine times.'],
  ['hitmeuppp',MV('(9. fine.)','(nine alarms. still here each time.)','(Nine alarms. I was still here every time.)','(Nine alarms. Nine checks, and I was in his bed every time, boots on. That’s a good night. That’s data.)')]],()=>ask('hitmeuppp','(The alarms.)',[
  {t:'Keep all of them.',fn:()=>{S.f.k63Alarm='all';calm(-1);apply({energy:-6});save();say([['','You keep them. At breakfast you are bright and quick and make toast for both of you, and you drop the butter knife twice without noticing either time.']],done)}},
  {t:'Turn off the three o’clock.',fn:()=>{S.f.k63Alarm='three';calm(-2);save();say([['','You turn off the three o’clock. At three you wake anyway, on the minute, without it, and lie there with your heart going until the four o’clock comes to tell you that you are allowed to be awake.']],done)}},
  k63No('Sleep through.','not yet')]));
 say([['','At night their phone buzzes under their pillow every forty minutes, from midnight to six. Each time they wake all the way, lift their head, looks at the door, and lies back down.'],
  ['','He lies still and counts with them. Nine times.'],
  ['K9','(They have set a guard over themself. It is them, every forty minutes, all night.)'],
  ['','In the morning they are cheerful and make toast, and drop the butter knife twice. He sets the coffee for five without mentioning the phone, so that it will be ready when they wake for the last one.']],()=>{S.f.k63Alarm='v';apply({heart:-1});save();done()})});
k63Ev('kd63_card',()=>kdD()>=4,done=>{const me=S.pov!=='v';
 if(me)return say([['','Every morning in his bathroom, with the toothbrush in your mouth, you run the questions. The tin: four thousand one hundred and twelve. Regionals: third. Nine hundred metres with the old scope: four clicks up.'],
  ['','On the sixth morning you get five clicks.'],
  ['','You stand there with foam on your chin. Then you go down to the truck in his shirt and your boots, and find the dope card in the glovebox, in your own writing, and it says four.'],
  ['','So your head moved a number while you slept and handed it back to you as if nothing had happened. You wonder what else it has moved that you don’t have a card for.'],
  ['hitmeuppp',MV('(4. it’s 4.)','(four. it’s four. it was always four.)','(Four. It was always four. What else did it move?)','(Four. It was always four. I’ve dialled it a thousand times. What else has it moved, then? What else am I sure of that’s wrong?)')]],()=>ask('hitmeuppp','(The card.)',[
  {t:'Write everything you know on cards.',fn:()=>{S.f.k63Card='cards';calm(-1);save();say([['','You buy a pack of index cards and write down everything you know for certain, one fact to a card, and keep them in the glovebox with a rubber band round them. Every morning you check one against your head.'],
    ['','At breakfast you tell V you are learning a language. You do the accent.']],done)}},
  {t:'Put it back. Go and finish your teeth.',fn:()=>{S.f.k63Card='back';calm(-2);save();say([['','You put it back and shut the glovebox, and go up and finish your teeth. At breakfast you tell V you are thinking about a new scope. When he asks why, you say four clicks for no reason and laugh at it.']],done)}},
  k63No('Tell V it moved.','he’d look at you differently')]));
 say([['','On the sixth morning they come out of his bathroom with toothpaste on their chin, walk past him without a word, and go down to the garage in his shirt and their boots.'],
  ['','From the kitchen window he watches them sit in the truck with the glovebox open, reading a small card for a long time. Then they put it back and come up to finish brushing their teeth.'],
  ['','At breakfast they say they are thinking of learning a language. They are very funny about it.'],
  ['K9','(They went down to check something against their own handwriting. I do not know what it was. I know that they did not like the answer.)']],()=>{S.f.k63Card='v';apply({heart:-1});save();done()})});
(function(){if(typeof KD_ORDER==='undefined')return;const put=(id,after)=>{const i=KD_ORDER.indexOf(after);if(i<0)KD_ORDER.push(id);else KD_ORDER.splice(i+1,0,id)};
 put('kd63_boots','kd61_home');put('kd63_alarms','kd63_boots');put('kd63_card','kd62_file')})();

/* ---------- ending lines ---------- */
const _xe63=extraEnding;extraEnding=function(){const L=_xe63();try{if(!S||!S.f)return L;const f=S.f;
 if(f.kd63_boots&&f.k63Boots==='his')L.push('Two pairs of boots stand by V’s bed, laces open, pointing at the door. Nobody moves them.');
 else if(f.kd63_boots)L.push('For a long time after the river they slept with their boots by the bed, laced, pointing at the door.');
 if(f.kd63_alarms)L.push('Some nights their phone still buzzes under the pillow every forty minutes. They are always awake for it.');
 if(f.k63Card==='cards')L.push('There is a stack of index cards in the glovebox of their truck, one fact to a card, in their handwriting. They check one every morning.')}catch(e){}return L};
