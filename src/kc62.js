/* ===================== THE GOOD ONE (kc62) =====================
   The infirmary, inside Misaki's head. While the room is a cell her mind keeps a file on V as "the good one", the
   guard you are meant to like, and the file is a symptom: it runs at four in the morning instead of sleep, it eats every
   kind thing he does, and she can partly see her own head doing it and cannot make it stop. Under it, fear she hides
   completely: on the surface she is flat, joking and competent; the narration (and options she cannot take) show the
   rest. V is mostly at a distance, noticing the rituals and the flatness, and that she hides it from him most of all.
   - Misaki, medbay spot "Listen for the tall one" (cell reading, once per time of day): four entries of the file.
   - Misaki, evenings while it is a cell: sleep she won't allow, the napkin, the joke over the tray, the handle.
     Worst route, after she reasons or is talked out: the file keeps running after she knows.
   - V, once a day by band: the ritual through the gap in the door; the light that stays on (worst); the spoon (clear).
   - After discharge (aftermath order): "sorry, sir" in the kitchen, the file at four in the morning, counting his house
     (after kc58's stair), and the truck in the garage (after kc55's hardening). Ending lines.
   Nothing here names what happened in the hours she cannot remember, and nothing shows a method. */
const k62Med=()=>!!(typeof kdMed==='function'&&kdMed());
const k62M=()=>!!(typeof kdMedM==='function'&&kdMedM());
const k62Worst=()=>!!(typeof kdWorstOf==='function'&&kdWorstOf());
const k62SA=()=>typeof kdSA!=='function'||kdSA();
const k62Sev0=()=>(S.kd&&S.kd.sev0)||0;
const k62No=(t,sub)=>({t,sub,dis:true,fn:()=>{}});

/* ---------- Misaki: the file ---------- */
const KD62_TH=[
 ()=>({L:[['','You lie with your ear to the lino by the door. He comes nine steps from the stairs, heel first, heavy, so that you hear every one.'],
   ['','Then you hear nine more, and he isn’t there. The boiler does nine. Your own pulse in the ear on the floor does nine. By the afternoon you can’t say which of the steps were him and which your head made, and you count all of them anyway.'],
   ['hitmeuppp',MV('(9. 9. 9.)','(nine. that was real. that one was real.)','(Nine. That was real. I think that one was real.)','(Nine. That was him. That was the boiler. That was him. I can hear it doing this. I can hear my head make up a man on the stairs and I still have to count him.)')]],
  q:'(Nine.)',o:[
   {t:'Count again from one.',fn:()=>{calm(-1);say([['','You count again from one. You get to nine, and start again, because you weren’t sure about the fourth.']])}},
   {t:'Decide which ones were real.',fn:()=>{calm(-2);say([['',S.f.k58Stair==='his'?'You try. What comes back instead is a back stair in a house, and a man putting his weight on the seventh tread at night because you asked him to. You put that in the file as well: they must have studied him.':'You try. What comes back instead is a back stair in a house, and a man coming up it heel first at night so as not to frighten anybody. You put that in the file as well: they must have studied him.']])}},
   k62No('Stop counting.','you can’t')]}),
 ()=>({L:[['','When the tray comes your right hand goes to the edge of it and closes, and stays closed after he has gone.'],
   ['',k62SA()?'You watch hands now. You have a reason, and you have filed the reason with the hours that are gone, where you don’t have to look at it.':'You watch hands now. Hands are what break things. Yours has been broken three times, and the hand knows that better than you do.'],
   ['','Your face is fine the whole time. You check it in the dark of the window: bored, a bit tired. Your knuckles have gone white on the tray.']],
  q:'(Your hand.)',o:[
   k62No('Let go of the tray.','your hand won’t open'),
   {t:'Wait for it to open on its own.',fn:()=>{calm(-1);say([['','It takes twenty minutes. You talk to it the whole time, very reasonably, like a hound on a ledge, and when it opens you put it under your thigh so it can’t do it again.']])}},
   {t:'Open it with the other hand, one finger at a time.',fn:()=>{calm(-2);apply({energy:-4});say([['','The left is in a cast, so you do it with your teeth and the cast. Four fingers. The thumb last. It hurts in a way you decide not to have noticed.']])}}]}),
 ()=>({L:[['','He kneels to put the water down and you get the smell of him: hound and coffee, laundry soap, ink. A coat on a hook by a back door.'],
   ['','Your head goes straight past “that’s V” to the next thing, the way it always goes now. If they have his coat, they took it off him. You see where. A metal table in the other building, and his hands under the straps.'],
   ['','You don’t want the picture. It plays anyway, all the way through, in colour, while you sit on the cot and say “thanks” to the guard about the water in a perfectly ordinary voice.']],
  q:'(The picture.)',o:[
   {t:'Count the hounds until it goes.',fn:()=>{calm(-1);say([['hitmeuppp',MV('(grey old black pale.)','(grey. old. black. pale. again.)','(Grey, old, black, pale. Again. From the grey one.)','(Grey, old, black, pale. Again. Grey, old, black, pale. Don’t look at the table. Grey.)')],['','It goes on the fortieth time round. It comes back at two in the morning, at the same place, with the radio.']])}},
   {t:'Let it play to the end.',fn:()=>{calm(-3);S.f.k62Pic=1;save();say([['','You let it. It has an end, and you see the end, and afterwards you lie very flat and breathe through your mouth until the guard has gone.'],['hitmeuppp',MV('(not real.)','(not real. it’s not real. i made it.)','(It isn’t real. I made it up. I know I made it up.)','(I made that up. My head made that, by itself, and showed it to me. Knowing that doesn’t do anything at all.)')]])}}]}),
 ()=>({L:[['','At four in the morning you notice that you have been writing a file on the tall one in your head for hours, instead of sleeping. His steps are in it, and his hands, and the coat, and that he never raises his voice and says “I apologise” to the tape on your hand.'],
   ['',S.f.kdThanks?'Every set has one of these. In the other place it was the one who brought the water. You said thanks through the slot and you started keeping him, and the file says that was how they got in.':'Every set has one of these. In the other place it was the one who brought the water, who never once looked at you. The file says that is how they get in: you like one of them.'],
   ['','You can see your head doing this. You can see it the way you would watch somebody else do it, from up near the light: a girl on a cot, eyes open, adding to a list about a man who brings soup. It doesn’t stop when you see it.'],
   ['hitmeuppp',MV('(the good one.)','(he’s the good one. write it down.)','(He’s the good one. Write that down.)','(He’s the good one. Every set has one. Write it down. I don’t know who I’m writing it down for.)')]],
  q:'(The file.)',o:[
   {t:'Add to it.',fn:()=>{S.f.k62Rule='add';calm(-1);save();say([['','You add the soup. Then the way he knelt. Then the fact that you added the soup. It is light at the top of the light-well before you stop, and you didn’t stop, you just ran out of him.']])}},
   {t:'Watch yourself from the corner.',fn:()=>{S.f.k62Rule='watch';calm(-2);save();say([['','You stay up by the light and watch the girl on the cot for the rest of the night. She doesn’t sleep either. Once she laughs at something, and you can’t think what.']])}},
   k62No('Close the file.','it opens again on its own')]})];
ROOMS.medbay.spots.push({at:[214,168],mark:[214,158],label:'Listen for the tall one',show:()=>k62M()&&kdClar()<2&&(S.f.k62Th||0)<KD62_TH.length&&S.f.k62LsAt!==S.day+'/'+(S.slot||0),act:()=>{const i=S.f.k62Th||0;S.f.k62LsAt=S.day+'/'+(S.slot||0);S.f.k62Th=i+1;save();
 const T=KD62_TH[i]();say(T.L,()=>ask('hitmeuppp',T.q,T.o))}});

/* ---------- Misaki: evenings while it is a cell ---------- */
const KD62_MP=[
 cb=>say([['','The rule is that if you sleep, they come while you are under. So you don’t.'],
   ['','You do sums. Wind at eight knots across six hundred metres. The rent divided by thirty-one. You pinch the inside of your wrist above the dressing until there is a mark like a fingernail moon, and then another next to it.'],
   ['','Around three the room goes thin. You are up in the corner by the light, looking down at somebody on a cot with her eyes open, pinching her own wrist, and you think, quite calmly, that she looks tired and should probably sleep, and that you won’t let her.'],
   ['hitmeuppp',MV('(awake. still awake.)','(still awake. good. good girl.)','(Still awake. Good.)','(Still awake. Good. They can’t do anything to somebody who’s watching. I’m watching. Somebody’s watching.)')]],()=>{apply({energy:-8});calm(-2);cb()}),
 cb=>say([['','On the tray tonight, under the spoon, there is a paper napkin folded in four. Inside it somebody has drawn a hound in fountain pen, badly. It is the grey one. You can tell from the seam.'],
   ['','Somebody has drawn you hounds before, on napkins and once on a parking ticket. Whoever it was could never draw either.']],()=>ask('hitmeuppp','(The hound.)',[
   {t:'Fold it over so you can’t see it.',fn:()=>{S.f.k62Nap='fold';calm(-1);save();say([['hitmeuppp',MV('(they know about her.)','(they know about the grey one. i must’ve told them.)','(They know about the grey one. I must have told them, under the needle.)','(They know about her seam. I told them. I must have, under the needle, with everything else, and now they draw it on napkins.)')],
     ['','You put it under the tray, hound side down. Your hand goes back to it every few minutes to check it is still face down.']],cb)}},
   {t:'Keep it under the pillow.',fn:()=>{S.f.k62Nap='keep';apply({aff:1});save();say([['','You put it under the pillow and lie on it, and tell yourself it is evidence of how much they know.'],
     ['hitmeuppp',MV('(evidence.)','(evidence. that’s all.)','(Evidence. That’s all.)','(It’s evidence. I’m keeping it as evidence. Shut up.)')]],cb)}}])),
 cb=>say([['','When the tray comes you are sitting up with your legs crossed and your hair pushed back, and you tell the guard the soup smells amazing, compliments to the chef, you’d leave five stars if you had a phone.'],
   ['','Your voice is fine. It is your usual voice, the one for clients. Under the blanket the fingers of your right hand are tapping the doors of the other building in order, from the van to the cell, eleven of them, and starting again.'],
   ['','Your heart is going so hard that you can see the blanket move with it. You keep your face pointed at the soup.']],()=>ask('hitmeuppp','(He is in the doorway.)',[
   {t:'Make another joke.',fn:()=>{calm(-1);say([['hitmeuppp',MV('ur soup’s great btw.','ur soup is honestly so good. tell ur boss.','Honestly, the soup is great. Tell your boss.','Honestly, best soup I’ve had in any cell, and I’ve been in a few. Tell your boss I said so.')],['','He goes. You keep tapping until the boiler comes on.']],cb)}},
   {t:'Say nothing. Smile.',fn:()=>{calm(-1);say([['','You smile at him until the door shuts. Then you stop, and your face doesn’t know what to do instead.']],cb)}},
   k62No('Tell him you’re frightened.','it doesn’t come out')])),
 cb=>say([['','The door has a handle this evening. You saw it this morning too, and you decided then that your eyes were lying, because cells don’t have handles.'],
   ['','So you check. You touch the handle three times, and then the bottom of the door, where the slot was in the other place, and there isn’t a slot, so you check again. Three and the slot, and again.'],
   ['hitmeuppp',MV('(it’s my head.)','(it’s my head doing this. i KNOW that.)','(It’s my head doing this. I know it is.)','(It’s my head. I can tell it’s my head. There’s a handle, and my head says there isn’t, and I believe my head, and I’ve never been so scared of anything in my life as I am of the inside of it.)')],
   ['','You do it eleven times. Then you sit down on the floor with your back to the door, and when you hear his steps you get up and are on the cot with your hands in your lap before the ninth.']],()=>{calm(-2);cb()})];

/* ---------- Misaki, worst route: it keeps running after she knows ---------- */
const k62Flash=cb=>say([['',S.f.kdInterrupted?'You know where you are. He held your wrists and told you, the menu and the bed and Tuesday and his house, until it came back.':'You know where you are. You worked it out yourself, a piece at a time.'],
 ['','At noon you hear him on the stairs, and you are counting. Nine steps. Your back finds the wall. You know it is V, and the knowing sits in the front of your head, and the counting goes on behind it as if nobody had told it anything.'],
 ['','When he comes in you say “thanks” to the soup in the voice from the slot. Then you hear yourself.']],()=>ask('hitmeuppp','(It’s still counting.)',[
 {t:'Say his name to yourself until it stops.',fn:()=>{S.f.k62FlC='name';calm(1);save();say([['hitmeuppp',MV('(V. V. V.)','(V. it’s V. V.)','(V. It’s V. It’s his house.)','(V. It’s V. It’s his house. V.)')],['','It takes an hour. It doesn’t stop. It gets quieter, so that you can eat with it going on.']],cb)}},
 {t:'Let it count. Eat.',fn:()=>{S.f.k62FlC='eat';calm(-2);save();say([['','You eat with your eyes on his hands and the count going. You know who he is the whole time. It doesn’t make any difference to your hands.']],cb)}}]));

/* ---------- V: once a day, by band, from a distance ---------- */
const KD62_VR=cb=>say([['','He sees it through the gap in the door, before he knocks. She is at the door on her side, touching the handle three times, then crouching to run her fingers along the bottom edge, then the handle again. Her lips are moving.'],
 ['','He knocks twice. By the time the door is open she is on the bed with her legs crossed, and she tells him the soup smells amazing.'],
 ['K9','(She stops when I am there. Whatever she is doing, she hides it from me first.)'],
 ['','He goes back to the corridor and sits down where the gap shows him nothing, so that she can start again.']],()=>{calm(-1);cb()});
const KD62_VW=cb=>say([['','The light under her door stays on all night. It has for three nights.'],
 ['','At four he hears her through the wood, counting, very steadily, and then a small sound he takes a long time to place: a fingernail, pinching. Then the counting again from one.'],
 ['','He does not go in. Going in is the thing she is staying awake for. He writes the hours on the chart, three nights of them, in a column nobody asked for.']],()=>{calm(-2);cb()});
const KD62_VC=cb=>say([['','She knows him today. She says his name at breakfast and rates the soup ten out of ten.'],
 ['','She sits where she can see the door. Every time it moves her eyes go to it and come back, and her face does not change. Her right hand has closed on the spoon and stayed closed, and under the tray she is working the fingers open with her thumb, one at a time, while she tells him a joke about a priest.'],
 ['K9','(She is most cheerful when I am in the room.)'],
 ['','He laughs at the end of the joke, in the right place, and goes out so that she can stop.']],()=>{calm(-1);cb()});

function k62Scene(){if(!S||!S.f||dlg||!k62Med())return null;const m=S.kd.med;if(S.f.k62Day===S.day)return null;
 const run=(fn,bg,mark)=>cb=>{S.f.k62Day=S.day;mark();save();go(cutBg(bg));fn(cb)};
 if(S.pov!=='v'){
  if(m.logicOut&&(m.sev||0)>=8&&kdClar()>=2&&!S.f.k62Fl)return run(k62Flash,'#1c2422',()=>{S.f.k62Fl=1});
  if((S.slot||0)<2||kdClar()>=2)return null;const i=S.f.k62MP||0;if(i>=KD62_MP.length)return null;return run(KD62_MP[i],'#0c0a08',()=>{S.f.k62MP=i+1})}
 if((S.slot||0)<1||(m.d||0)<1)return null;
 if(k62Worst()&&!S.f.k62VW)return run(KD62_VW,'#06060c',()=>{S.f.k62VW=1});
 if((m.clar||0)<2&&!S.f.k62VR)return run(KD62_VR,'#06060c',()=>{S.f.k62VR=1});
 if((m.clar||0)>=2&&!k62Worst()&&(m.sev||0)>=4&&!S.f.k62VC)return run(KD62_VC,'#1c2422',()=>{S.f.k62VC=1});
 return null}
const _hub62=hub;hub=function(){const a=arguments,self=this;try{const s=k62Scene();if(s)return s(()=>_hub62.apply(self,a))}catch(e){}return _hub62.apply(self,a)};

/* ---------- after discharge ---------- */
const k62Ev=(id,when,run)=>kdEv(id,()=>!S.f[id]&&!isLone()&&when(),done=>{S.f[id]=1;save();run(done)});
k62Ev('kd62_sir',()=>kdD()>=1,done=>{const me=S.pov!=='v',w=k62Sev0()>=8;
 const sorry=['hitmeuppp',MV('sorry. sorry sir.','sorry. sorry, sir.','Sorry. Sorry, sir.','Sorry. I’m sorry, sir. I didn’t mean to be in the way.')];
 if(me)return say([['','The second morning upstairs. He reaches past your shoulder for the tea.'],
  ['','You are off the stool and against the fridge before the spoon hits the floor, and your mouth says it on its own, in the voice from the slot.'],sorry,
  w?['','It was the second time this morning. You only heard this one.']:null,
  ['','Then you hear it. Your face does the rest before you can stop it: a laugh and an eye-roll. Under the island your right hand has closed on nothing and won’t open.']],()=>ask('hitmeuppp','(Your hand.)',[
  {t:'Make a joke of it.',fn:()=>{S.f.k62Sir='joke';calm(-2);save();say([['hitmeuppp',MV('lol. cell brain.','lol sorry. cell brain. it’s fine.','Sorry. Cell brain. It’s fine, it’s funny.','Sorry. Cell brain. Give it a week and I’ll be calling you “your majesty.” It’s fine. It’s funny.')],
    ['','He picks up the spoon and gives it to you handle first. You eat the cereal with the left hand in the cast, because the right one is still shut under the island, and you keep it there until he has gone to feed the hounds.']],done)}},
  {t:'Pick up the spoon. Say nothing.',fn:()=>{S.f.k62Sir='left';calm(-2);save();say([['','You pick up the spoon with the left and sit back down. You count the doors out of the kitchen while you eat. There are two. You count them again.']],done)}},
  k62No('Tell him what just happened.','you’d have to know')]));
 say([['','The second morning upstairs. He reaches past her shoulder for the tea, as he has a thousand times, and forgets.'],
  ['','She is off the stool and against the fridge before the spoon hits the floor.'],sorry,
  w?['','It is the second time this morning. She did not hear the first.']:null,
  ['','Then she laughs and says something about cell brain, very fast. He picks the spoon up and gives it to her handle first.'],
  ['','She eats with the hand in the cast. The other one stays under the island the whole time, and from where he stands at the kettle he can see that it is shut.']],()=>{S.f.k62Sir='v';calm(-2);save();done()})});

k62Ev('kd62_file',()=>kdD()>=4&&!!S.f.kd62_sir,done=>{const me=S.pov!=='v',n=S.f.k62Th||0;
 if(me)return say([['','Four in the morning in his kitchen. You are home, and you know it, and you are adding to the file.'],
  ['',n?'It still has his steps in it, and his hands, and now new pages: he leaves the bathroom door open so you can hear the tap; he says your name on the stairs; he buys your cereal. Every kind thing he does goes in, and comes out the other end as technique.':'It has his steps in it, and his hands, and new pages: he says your name on the stairs; he buys your cereal. Every kind thing he does goes in, and comes out the other end as technique.'],
  ['','You watch yourself do it from the doorway. A girl at an island in a hoodie, very still, thinking hard. It looks like a person deciding what to have for breakfast.'],
  ['hitmeuppp',MV('(stop it.)','(it’s V. stop it. it’s V.)','(It’s V. Stop it. Stop doing this.)','(It’s V. It’s V, it’s his kitchen, I know that. Stop putting him in it. Please stop putting him in it.)')]],()=>ask('hitmeuppp','(The file.)',[
  {t:'Write it down so it stops.',fn:()=>{S.f.k62File='wrote';calm(-1);save();say([['','You write it in the margin of his newspaper, small, in biro, with times. It doesn’t stop. In the morning you tear the margin off in strips and run them down the sink.']],done)}},
  {t:'Go back to bed and lie there.',fn:()=>{S.f.k62File='bed';calm(-2);save();say([['','You lie beside him with your eyes open and your back to the wall, and the file goes on writing itself until the hounds want feeding.']],done)}}]));
 say([['','Four in the morning. He comes down for water and stops on the stair, because the kitchen light is on.'],
  ['','She is at the island, very still, writing in the margin of his newspaper in small biro capitals. Times. A column of times. He reads one upside down from the stair: “4:10 tap. bathroom door open. why.”'],
  ['','He goes back up without being seen. In the morning the margin has been torn off the paper, neatly, and she is cheerful at breakfast, and asks if he slept.']],()=>{S.f.k62File='v';apply({heart:-1});save();done()})});

k62Ev('kd62_clock',()=>kdD()>=6&&!!S.f.k58_creak,done=>{const me=S.pov!=='v',w=k62Sev0()>=8;
 if(me)return say([['','Since the night on the back stair with the pistol, you count. Doors, every time you go into a room. His steps, wherever he is in the house.'],
  ['','You have his whole day without trying to: the hounds at five, coffee at seven with his back to the room, the study until noon, and the back stair at three with water. '+(S.f.k58Stair==='his'?'The seventh step goes, and you have the pistol in your hand before you remember what the seventh step means.':'You know his weight on the eighth step, and you have the pistol in your hand before you remember whose weight it is.')],
  w?['','Some afternoons the file opens by itself for an hour and he is the good one again, and you are polite to him at the island, and nothing shows on your face at all.']:null,
  ['','Ronin asks how you are and you say “fine, bored, want a job,” and it is the truest-sounding thing you have ever said.']],()=>ask('hitmeuppp','(The doors.)',[
  {t:'Count them.',fn:()=>{S.f.k62Clock='count';calm(-1);save();say([['','Four in the hall. Two in the kitchen. You count them again from the hall. You get the same number, and it doesn’t help, and you count them again.']],done)}},
  {t:'Walk in without counting.',fn:()=>{S.f.k62Clock='tried';calm(-3);save();say([['','You walk into the kitchen without counting. You get as far as the island. Then you go back out and count them from the hall, and your hands are wet, and you dry them on your jeans before anyone can see.']],done)}}]));
 say([['','Since the night on the back stair, she counts. He can see her do it: a small turn of the head at every doorway, the eyes going round the room once before she comes in.'],
  ['','She knows where he is at every minute. She is at the island before he comes down at seven, in the chair that faces the study door at noon, and awake at three before he reaches the stair.'],
  w?['','Some afternoons she is polite to him again for an hour, in the voice from the infirmary, and he answers in the tall one’s voice, because it is the one she can hear.']:null],()=>ask('K9','(She has his day.)',[
  {t:'Write his day on the fridge. Say nothing about it.',fn:()=>{S.f.k62Clock='told';save();say([['','He writes it out in fountain pen and puts it on the fridge under the cactus magnet: the hounds at five, coffee at seven, the study until noon, and at the bottom, “3:00, back stair, water.”'],
    ['','She never mentions it. He sees her check it, though, every hour or so, on her way past, as she checks her watch before a shot.']],done)}},
  {t:'Keep to it to the minute.',fn:()=>{S.f.k62Clock='kept';save();say([['','He comes down at seven exactly, and out of the study at noon, and up the stair at three, so that whatever she has worked out will always be right.']],done)}}]))});

k62Ev('kd62_truck',()=>kdD()>=11&&(S.pov!=='v'?!!S.f.kd_hard_work:!!S.f.kd_v_sees),done=>{const me=S.pov!=='v';
 if(me)return say([['','The job is clean. One shot at eleven fifty-two, no witnesses, casings in your pocket, home by two. You drive back under the limit with the radio off.'],
  ['','In his garage you turn the engine off, and your hands stay on the wheel.'],
  ['','Nothing is wrong. You are fine. You were fine on the roof; you were better than fine. Your heart is going like it did in the van and your hands will not come off the wheel, and the house is right there, with the kitchen light on.']],()=>ask('hitmeuppp','(The wheel.)',[
  k62No('Go in and tell him.','not him'),
  {t:'Wait it out.',fn:()=>{S.f.k62Truck='wait';calm(-3);save();say([['','You count the hounds. Then the doors of the van. It takes forty minutes. When your hands come off you check your face in the mirror, wipe it, and go in, and you tell him it went great and you want toast.']],done)}},
  {t:'Put your head on the wheel until it passes.',fn:()=>{S.f.k62Truck='head';calm(-2);save();say([['','You put your forehead on the wheel, very carefully, so the horn doesn’t go. When it passes you go in. You tell him about the job with voices, like before, and he laughs in the right places.']],done)}}]));
 say([['','He hears her truck come into the garage at two. He hears the engine stop.'],
  ['','The garage door into the house does not open until twenty to three. In between there is no sound at all, and he stands at the kitchen island with his hand on the kettle and does not go down.'],
  ['','When she comes in she is cheerful. It went great, and she wants toast. Her face has been wiped.'],
  ['K9','(She sat in the dark for forty minutes so that I would not see it. I will not let her know that I heard.)'],
  ['','He makes the toast, and laughs in the right places.']],()=>{S.f.k62Truck='v';apply({heart:-1});save();done()})});
(function(){if(typeof KD_ORDER==='undefined')return;const put=(id,after)=>{const i=KD_ORDER.indexOf(after);if(i<0)KD_ORDER.push(id);else KD_ORDER.splice(i+1,0,id)};
 put('kd62_sir','kd61_home');put('kd62_file','kd61_rent');put('kd62_clock','k58_creak');put('kd62_truck','kd_v_sees')})();

/* ---------- ending lines ---------- */
const _xe62=extraEnding;extraEnding=function(){const L=_xe62();try{if(!S||!S.f)return L;const f=S.f;
 if(f.kd62_clock&&(f.k62Clock==='count'||f.k62Clock==='tried'))L.push('She still counts the doors when she walks into a room. She has got quick at it. Nobody but V has ever seen her do it.');
 else if(f.k62Clock==='told')L.push('V’s day is still on the fridge under the cactus magnet, in fountain pen. He keeps to it to the minute.');
 if(f.kd62_truck)L.push('Some nights her truck sits in the garage for a while after the engine stops. V never goes down. She has never told him, and he has never let her know that he hears.');
 if(f.kd62_file)L.push('At four in the morning, some nights, there is a strip torn off the margin of his newspaper.')}catch(e){}return L};
