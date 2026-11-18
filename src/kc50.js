/* ===================== THINKING HER WAY OUT, OR NOT (kc50) =====================
   Worst route only (infirmary severity 8+, Misaki's POV): the delusion no longer clears by itself.
   - Logic: five things in the room can be "thought through" (the bed, the line, the handwriting, the door, the
     machine). Each clue gives a little composure back. Four clues and she reasons her way out (m.logicOut).
   - Spiral: every deluded morning costs 7 composure. If composure falls to 3 or less before she reasons her way out, at night
     she decides before her captors can. Not shown. It goes to V's lone route, like the late route does.
   - Descriptions: the main things in the room get a line each time she looks, by day and by state of mind.
   Nothing here describes a method. */
const kdWR=()=>{const m=S&&S.kd&&S.kd.med;return !!(m&&(m.sev||0)>=8&&!m.logicOut&&S.pov!=='v')};
const _worstOfKD50=kdWorstOf;kdWorstOf=function(){const m=S&&S.kd&&S.kd.med;if(m&&m.logicOut)return false;return _worstOfKD50()};
const KD_CLUES={
 'Cot':['bed','A cell cot is a board on a frame. You know; you slept on one for eleven days. This one has springs. The sheet has been ironed. Somebody ironed a sheet for you.','(Nobody irons a sheet for something they’re selling on Friday.)','You run your good hand over it. It’s been ironed with the corners folded under, hospital corners, the way somebody was taught in a kitchen by a mother who also folded tea towels in thirds.'],
 'The line in your hand':['needle','The cannula in the back of your hand has a green cap, the wide-gauge kind. Veterinary. You’ve handed somebody a hundred of these, in a kennel, holding a hound’s leg while he talked to her.','(The green ones. He buys them by the box. You’ve seen the box.)','The box was on the second shelf, behind the worming tablets, and it had a label in fountain pen: “For the big ones. Do not use the blue.” You laughed at that label. You remember laughing.'],
 'Their notes':['pen','The notes on the clipboard are in fountain pen. Nobody writes in fountain pen. One person does. He writes the M in Misaki the way you’ve seen it on soup labels, on sticky notes, on a list of things you’ve said.','(That M. You know that M.)','There is a line at the bottom of the page, in the same pen, that isn’t medical: “Asked for the light off. Then on. Then off. Left it on.” Nobody in the other building ever wrote down what you asked for.'],
 'Door':['design','The door opens inward and hinges on the right. The bed is set so nobody can stand behind it. The light-well is where the sightline from the bed lands. You drew a room exactly like this once. On the back of a takeaway menu, at two in the morning, eating cereal, for a man who asked for a room nobody could get into.','(You designed this room. That’s not possible. Unless it is.)','You remember the menu. Pizza place on the corner, the one with the dog on the sign. You drew the room on the back of the pepperoni section and he asked why the bed was at that angle, and you said so nobody can ever stand behind me, and he didn’t ask anything else.'],
 'A machine that beeps':['memory','The machine beeps on the same note as an oven timer you know. You’ve heard this exact machine before: the night the grey hound had surgery, in a room off a kennel, while somebody tall held a lamp and you held the hound’s head.','(You have been in this room before. You held a hound in this room.)','She had her head in your lap the whole time. Afterwards you sat on this floor, in that corner, with your back against that wall, and somebody brought you tea and said “thank you” in a voice like a filing cabinet.']};
(function(){const R=ROOMS.medbay;Object.keys(KD_CLUES).forEach(lab=>{const sp=R.spots.find(s=>s.label===lab);if(!sp)return;const a=sp.act;
 sp.act=function(){if(!kdWR()||kdClar()>=2)return a.apply(this,arguments);const m=S.kd.med,c=KD_CLUES[lab],got=(m.clues||[]).includes(c[0]);const self=this,args=arguments;
  ask('hitmeuppp',S.comp<15?'(You can hardly make yourself look at it.)':'(Look at it the way you look down a scope.)',[
   {t:'Look',fn:()=>a.apply(self,args)},
   {t:'Think it through',dis:got,sub:got?'you already did':'',fn:()=>{m.clues=(m.clues||[]).concat([c[0]]);calm(3);save();say([['',c[1]],['hitmeuppp',c[2]]].concat(c[3]?[['',c[3]]]:[]),()=>{if(m.clues.length>=4)kdLogicOut()})}},
   {t:'Leave it',fn:()=>{}}])}})})();
function kdLogicOut(){const m=S.kd.med;m.logicOut=1;m.ext=0;m.clar=2;calm(10);apply({aff:3});save();go(cutBg('#1c2422'));say([
 ['hitmeuppp','(Okay. Okay. Do it like a job. One thing at a time.)'],
 ['hitmeuppp','(One: the bed’s been ironed. Two: the line’s from his box. Three: that’s his M. Four: I drew this room. Five, if I want it: I’ve held a hound’s head in here.)'],
 ['hitmeuppp','(So either they built a perfect copy of V’s infirmary, with his handwriting and my floor plan and his needles, to fool one girl they were selling on Friday—)'],
 ['hitmeuppp','(—or it’s his. And the tall one is—)'],
 ['','You don’t finish it. You get up, on the foot that’s broken, and go to the door, and open it, which you could have done at any time, and look out.'],
 ['','The corridor. The four hounds lying in a row. At the end of it, on the floor, a man in a coat with a book face down on his knee, who looks up, and does not get up, and does not say anything at all.'],
 ['hitmeuppp',MV('...V.','V. it’s u. it was always u.','V. It’s you. It’s been you.','V. I worked it out. Nobody told me, I worked it out. You ironed the sheet, you idiot. Who irons a sheet in a cell.')],
 ['K9','I did not know what else to do with my hands.']],()=>toRoom('medbay',[240,150]))}
/* the spiral: deluded mornings cost composure; at zero, the night goes differently */
const _mmKD50=kdMedMorning;kdMedMorning=function(done){if(kdWR()&&(S.kd.med.d||0)>=1){S.comp=clamp(S.comp-7);save()}return _mmKD50(done)};
const KD_SPIRAL_WARN=['(If they come Friday, they come. You’ve done the sums.)','(You keep thinking about Friday. Not about getting out. About Friday.)','(There’s one thing they can’t take, and it’s the when.)'];
const _hubKD50=hub;hub=function(){const a=arguments,self=this;try{if(kdWR()&&S.comp<15&&!dlg&&S.f.kdWarnDay!==S.day&&S.slot>=1){S.f.kdWarnDay=S.day;S.f.kdWarnN=(S.f.kdWarnN||0)+1;save();go(cutBg('#0c0a08'));
 return say([['hitmeuppp',KD_SPIRAL_WARN[Math.min(2,S.f.kdWarnN-1)]]],()=>_hubKD50.apply(self,a))}}catch(e){}return _hubKD50.apply(self,a)};
const _sleepKD50=sleep;sleep=function(){if(kdWR()&&S.comp<=3&&!S.f.kdSpiral)return kdSpiral();return _sleepKD50.apply(this,arguments)};
function kdSpiralSecret(){const m=S.kd.med;return !!(m&&(m.clues||[]).length>=2&&S.f.kdBye&&S.f.kdBye.includes('v'))}
function kdSpiral(){S.f.kdSpiral=1;save();const full=typeof kdSA!=='function'||kdSA();go(cutBg('#000'));
 const L=[['','Night. The bulb. The radio that isn’t there. The tall one breathing on the other side of the door, slow, the way he breathes when he is reading to himself.'],
  ['','You have done the sums. You always do the sums. Tomorrow is Friday, and on Friday somebody comes and takes the rest of you away, and there is not much rest left.'],
  ['','You go through what you still have, the way you’d go through a bag before a job. You have very little. You have your hands, which are broken. You have your name, which you had to go looking for on the third day. You have a paper cup, washed, that you don’t know why you kept.'],
  full?['','You don’t have the hours. They took the hours, and whatever happened in them, and you will never have those back and never know. You kept one thing out of everything, all your life. You became what you became, you learned the wind and the drop and the price of a man’s kidneys, so that nobody would ever own any part of you again. And they did, for days, and you weren’t even there for it.']:['','They broke what they wanted to break. Some of it will set crooked. Some of it was crooked already, from before you were nine, from people you don’t remember doing things you can’t remember. You are so tired of being something people do things to.'],
  ['','The worst part is that it doesn’t hurt. You keep waiting for it to hurt, the way a hand hurts when the cold goes out of it, and nothing comes. You feel like a room somebody has moved out of. Everything is still where it was. Nobody lives there.'],
  ['','You think about the four of them at the table on a Sunday, the bread and the salt and the week laid out between them. You think about the grey hound’s seam under your palm. You hold the thought up and look at it, and it is lovely, and it is somebody else’s, a photograph of a town you used to live in.'],
  ['hitmeuppp','(They’ll be okay. They were okay before me. Angel will cry on main. Ronin will break something. V will make tea for two for a while and then he’ll stop.)'],
  ['hitmeuppp','(He won’t stop. I know he won’t. I know exactly what he’s like. I’m sorry. I’m so sorry. I’m so tired.)'],
  ['','You have always decided when. Nobody took that off you before nine, or in the cell, and nobody here is going to.'],
  ['hitmeuppp','(Not Friday. Not them.)'],
  ['','The light is on. You leave it on.']];
 if(kdSpiralSecret())return cut(L,kdInterrupted,'#000');
 cut(L,()=>{go(cutBg('#000'));cut([
  ['','And then, after, in the little space after, with nothing left to decide—'],
  ['','The sheet is ironed. The corners are folded under. The cannula has a green cap. The M on the clipboard. The bed at the angle you drew on a pizza menu so that nobody could ever stand behind you.'],
  ['','The breathing on the other side of the door. You know that breathing. You have fallen asleep to that breathing on a couch, in a car, on a roof under a blanket with a hound on it.'],
  ['hitmeuppp','(...oh.)'],
  ['hitmeuppp','(oh, no. oh, V. it’s his house. it was always his house. it’s Tuesday, and I’m in his house, and I’ve—)'],
  ['','You try to call out. You want to say his name. You want, more than you have ever wanted anything, to say sorry to the tall one for the soup.'],
  ['','It is too late for your voice to work. It is not too late for you to know. That is the last thing they took, and they didn’t even have to be there for it.']],()=>{go(cutBg('#000'));cut([
  ['','The tall one stops reading at four, because the breathing on the other side of the door has changed, and he knows that breathing better than his own.'],
  ['','He is through the door before the book hits the floor. He has the bag. He has the light. He is fast, and he is very good, and he is too late by minutes, not hours.'],
  ...(typeof kdShapeLines==='function'?kdShapeLines():[]),
  ['','They are looking at the door. Their face is not afraid. It is the face they make when they have worked something out a second too late, on a roof, when the wind has changed. He has seen it a hundred times. He knows exactly what it means.'],
  ['','The grey hound lies down across the threshold and will not move for anyone for two days.'],
  ['','The funeral is small. Angel does the eyeliner one last time, and her hands shake the whole way through, and she does not stop until it is perfect. Ronin stands at the back with his crowbar and does not sing.'],
  ...(S.kd&&S.kd.med&&S.kd.med.br3?[['','Later, under the mattress, he finds one more soup label, one word on it in biro, very small, written after everything else: “V?”']]:[['','Under the mattress, V finds a paper cup, washed, and a soup label with one word on it in biro, written very small, the last thing they wrote: “V?”']]),
  ['K9','(They knew. At the end, they knew where they were. They were in my house the whole time.)']],()=>{S.kd.med=null;S.f.lateRoute='self';save();startLone('v')},'#000')},'#000')},'#000')}
/* the secret: she had started to work it out, and she had said goodbye to him by name. He is listening when it matters. */
function kdInterrupted(){const m=S.kd.med;S.f.kdInterrupted=1;save();go(cutBg('#000'));cut([
 ['','The tall one is not reading tonight. He has not read since the night they gave him their goodbyes to pass on. He has been sitting against the door listening, every night, because of what they said for V.'],
 ['','So he hears it the second it changes. Not the breathing. Before that. The small sound of somebody deciding.'],
 ['','The door comes off its top hinge. He doesn’t slow down for it.'],
 ['','He has their wrists, both of them, in one hand, very gently, the broken one and the other one, and his face is lower than theirs, the way he always kneels, and he is saying something over and over that they can’t hear yet.'],
 ['','“—Tuesday. It is Tuesday. It is my house. You drew this room. You drew it on a menu. The bed is at that angle because you said nobody should stand behind you. It is my house. It is Tuesday. You drew this room.”'],
 ['hitmeuppp','(...the menu.)'],
 ['hitmeuppp','(the pizza place with the dog on the sign. the pepperoni side. i drew the bed at an angle.)'],
 ['','The ironed sheet. The green cap. The M. The breathing they have fallen asleep to on a couch, in a car, on a roof. It comes at them all at once, the way a room comes back when somebody turns the light on, and it is so much worse and so much better than the cell that they can’t breathe.'],
 ['hitmeuppp','V.'],
 ['K9','Yes.'],
 ['hitmeuppp','V, i nearly— i was going to— it’s Tuesday?'],
 ['K9','It is Tuesday. You are in my house. I am not letting go of your hands until you tell me to, and I would rather you did not tell me to.'],
 ['','They don’t tell him to. They sit on the infirmary floor with the door hanging off its hinge until it gets light, and the grey hound comes in over the broken door and lies down across both of them, and nobody says anything else at all.']],()=>{m.logicOut=1;m.ext=0;m.clar=3;S.comp=clamp(S.comp+25);apply({aff:6});note('kd_interrupted','The night in the infirmary when the tall one was V, and he was listening. Neither of them talks about it. He sleeps against the door for a month afterwards.');save();toRoom('medbay',[150,150])},'#000')}
kdEv('kd_interrupted_after',()=>S.f.kdInterrupted&&kdD()>=1&&!S.f.kdIntAfter,done=>{S.f.kdIntAfter=1;save();const me=S.pov!=='v';say(me?[
 ['','The infirmary door has a new hinge. V fitted it himself. He did not replace the door. There is a dent in it at the height of a man’s shoulder.'],
 ['','He sleeps against your bedroom door now, on the floor, on a dog bed. You found out on the second night. You haven’t said anything. Neither has he.'],
 ['hitmeuppp',MV('(he heard me.)','(he was listening. every night. because i said goodbye to him by name.)','(He was listening because I said goodbye to him by name. That’s why he was in time.)','(I said goodbye to the guard and asked him to tell V, and V was the guard, and he listened to it, and then he sat by the door every night after just in case. That’s the only reason. That’s the whole reason I’m here.)')]]:[
 ['','He fits a new hinge on the infirmary door. He does not replace the door. He leaves the dent.'],
 ['','He sleeps on a dog bed outside their room for a month. On the first night the grey hound comes and lies down beside him, and on the second the other three, and nobody in the house mentions it.'],
 ['K9','(I was listening because they said goodbye to me. If they had not, I would have been reading, and I would not have heard. I have thought about that every night since. I will not stop.)']],()=>{apply({aff:4});calm(3);done()})});
if(typeof KD_ORDER!=='undefined')KD_ORDER.unshift('kd_interrupted_after');
/* descriptions that change by the day and the state of her mind */
const KD_DESC={
 'Cot':{dark:['The cot. You lie on it and think about how long the night is. That’s all you think about now.','The cot. You haven’t slept on it, you’ve waited on it. There’s a difference and you know it.'],cell:['The cot is too soft for a cot. You file that and don’t look at it.','The cot. Somebody changed the sheet while you were under. You don’t know which is worse, that they did or that it smells clean.'],clear:['The bed. His sheets. They smell like the laundry room upstairs and like the grey hound.','The bed. Somebody has put a second pillow on it, the way you like, without asking how you like it.']},
 'Bed':{dark:['The bed.','The bed.'],cell:['The bed.','The bed.'],clear:['The bed. His sheets. They smell like the laundry room upstairs and like the grey hound.','The bed. Somebody has put a second pillow on it, the way you like, without asking how you like it.']},
 'Their notes':{dark:['Their notes. You don’t want to know what they write about you any more.','Their notes. Every line is something they know and you don’t.'],cell:['Their notes. Neat writing. Too neat. Like someone who cares.','Their notes. There’s more ink on the page today. They watched you all night.'],clear:['Your chart. You read it like a weather report.','Your chart. Somebody has started writing your quotes in the margin.']},
 'Door':{dark:['The door. You don’t look at it any more. Looking at it is what hope feels like and you can’t afford that.','The door. On the other side, the tall one, breathing. Always the tall one.'],cell:['The door. It has a handle on your side. You’ve decided not to think about that.','The door. Someone sits against it all night. You can hear the pages turn.'],clear:['The door. Open a hand’s width. Out there, four hounds, and a man with a book.','The door. You open and close it a few times, just because you can.']},
 'Tray':{dark:['The tray. You don’t eat. Not eating is the one thing in here that’s yours.','The tray. Soup again. You let it go cold like the others.'],cell:['The tray. The soup smells like somebody’s kitchen. Somebody you know’s kitchen.','The tray. There is a note under the bowl that you won’t read.'],clear:['Soup. “I watched myself make it.”','Soup. Day four. He’s run out of ideas and gone back to day one.']},
 'The line in your hand':{dark:['The line in your hand. Whatever’s in it, it’s theirs. Everything in here is theirs.','The line in your hand. You could pull it out. You don’t see the point of pulling it out.'],cell:['The line in your hand. Green cap. You’ve seen green caps somewhere.','The line in your hand. They put it in the other hand this time. Someone gentle did it.'],clear:['The drip. Saline and something for the wrist. He labelled it.','The drip. Nearly empty. You’re nearly done with it.']},
 'A machine that beeps':{dark:['The machine counts you. Soon there won’t be anything for it to count.','The machine. You’ve stopped listening to it.'],cell:['The machine. It beeps like an oven timer. Whose oven.','The machine. You count the beeps instead of the radio.'],clear:['The monitor. The numbers are better than yesterday. You don’t tell anyone you checked.','The monitor. Steady. Steadier than you.']}};
(function(){const R=ROOMS.medbay;Object.keys(KD_DESC).forEach(lab=>R.spots.filter(s=>s.label===lab).forEach(sp=>{const a=sp.act;sp.act=function(){if(S.pov==='v'||!S.kd||!S.kd.med)return a.apply(this,arguments);
  const st=kdClar()>=2?'clear':S.comp<15?'dark':'cell';const L=KD_DESC[lab][st];const line=L[(S.kd.med.d||0)%L.length];const self=this,args=arguments;say([['',line]],()=>a.apply(self,args))}}))})();
/* the code starts with enough composure to choose */
const _codeKD50=codeHook;codeHook=function(v){const r=_codeKD50(v);if(r&&v==='fridaycomes')setTimeout(()=>{try{if(S){S.comp=30;save()}}catch(e){}},200);return r};
