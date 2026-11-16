/* ===================== THE GOOD ONE (kc62) =====================
   The infirmary, from the side of the delusion that is about V himself: while she believes the room is a cell, every
   true thing about him (his steps, his hands, his coat, his kindness) is read as a captor's technique, and she builds a
   file on him as "the good one", the guard you are meant to like. She is polite to him the way you are polite to a guard
   and plans around him. On V's side, he is looked at as one of them by the one person who never looked at him that way,
   and he keeps going in, without explaining himself.
   - Misaki, medbay spot "Listen for the tall one" (cell reading, once per time of day): four entries of the file.
   - Misaki, evenings while it is a cell: the sink, the napkin. Worst route, after she reasons or is talked out: it
     comes back the next time he walks in.
   - V, side menu while she does not know him: "Go in anyway" (three). V, once a day by band: extended (the coat),
     worst (the good one, told to his face), clear after a bad stay (sir).
   - After discharge (aftermath order): sir in the kitchen, the file told on the sofa, his timetable (after kc58's
     stair), and the job report (after kc55's hardening). Ending lines.
   Nothing here names what happened in the hours she cannot remember, and nothing shows a method. */
const k62Med=()=>!!(typeof kdMed==='function'&&kdMed());
const k62M=()=>!!(typeof kdMedM==='function'&&kdMedM());
const k62Worst=()=>!!(typeof kdWorstOf==='function'&&kdWorstOf());
const k62SA=()=>typeof kdSA!=='function'||kdSA();
const k62Sev0=()=>(S.kd&&S.kd.sev0)||0;

/* ---------- Misaki: the file on him ---------- */
const KD62_TH=[
 ()=>({L:[['','You lie with your ear to the lino by the door and learn him, the way you learned the hall in the other place.'],
   ['','He comes nine steps from the stairs. He walks heel first, heavy, so that you hear every one of them from the corner of the corridor. The others walked so you would never hear them coming. This one wants you to.'],
   ['hitmeuppp',MV('(9. he lets me count him.)','(nine. heel first. he WANTS me counting.)','(Nine steps, heel first. He wants me counting him.)','(Nine steps, heel first, loud on purpose. They let me learn their steps last time too. I went on seven, and they were ready for seven. This is the same thing done nicer.)')]],
  q:'(Nine steps.)',o:[
   {t:'File it. He wants you counting.',fn:()=>say([['','You put it in the file. Nine steps. When he is on six you will be in the corner with the tray in your good hand, and by nine you will be sitting nicely on the cot with your hands in your lap.']])},
   {t:'Think about who else walks like that.',fn:()=>{calm(-2);apply({aff:1});say([['',S.f.k58Stair==='his'?'There is a man who comes up a back stair at night heel first, so as not to frighten anybody, and puts his weight on the seventh step because you asked him to. You nearly have his name.':'There is a man who comes up a back stair at night heel first, so as not to frighten anybody. You nearly have his name.'],
     ['hitmeuppp',MV('(they copied it.)','(they copied it. they had me for days. i talked.)','(They copied it. They had me for days, and I talked.)','(They copied it. They watched him, or I told them, under the needle. I probably told them about the stair myself. That’s why he walks like that. Stop it.)')]])}}]}),
 ()=>({L:[['','When he brings the tray he stops in the doorway and shows you both hands before he comes in, palms and backs. He puts the tray down at the full stretch of his arm, steps back, and keeps his hands where you can see them.'],
   ['',k62SA()?'You watch his hands the whole time. You have a reason to watch hands, and you have filed it with the hours that are gone.':'You watch his hands the whole time. Hands are what break things. Yours has been broken three times, and you know the shape a hand makes just before.'],
   ['hitmeuppp',MV('(dog bite hands.)','(that’s how u go up to a dog that bites.)','(That’s how you walk up to a hound that bites. Hands first, low, slow.)','(That’s how you walk up to a hound that bites. Hands first, low and slow, no surprises. Somebody taught him that, and he practised it on somebody before me.)')]],
  q:'(His hands.)',o:[
   {t:'File it. Trained.',fn:()=>say([['','Trained, then, and patient. You put patient in the file twice.']])},
   {t:'Look at the callus on his middle finger.',fn:()=>{calm(-2);apply({aff:1});say([['','There is a hard lump on the side of his middle finger where a pen sits. You know a hand with a callus there. It writes on soup labels and sticky notes in fountain pen, and once, at two in the morning, it wrote down something you said so that it wouldn’t get lost.'],
     ['hitmeuppp',MV('(note-taker had 1 too.)','(the note-taker had one too. they all write stuff down.)','(The note-taker had one too. They all write things down.)','(The note-taker had one too. Neat little hand, pages of it. They all write things down in here. That’s what the pen is for.)')]])}}]}),
 ()=>({L:[['','He kneels to put the water by the cot, and for a second he is close enough to smell: hound and coffee, laundry soap, ink.'],
   ['','It is the smell of a coat on a hook by a back door. You have slept under that coat across the seat of a truck, with the heater on.'],
   ['hitmeuppp',MV('(they got his coat.)','(they got his COAT. they took it off him.)','(They’ve got his coat. They took it off him.)','(They’ve got his coat. They were in his house and they took it off the hook and put it on this one, because they know what I’d do when I smelled it.)')]],
  q:'(The coat.)',o:[
   {t:'File it. Breathe through your mouth.',fn:()=>{S.f.k62Mouth=1;save();say([['','From then on you breathe through your mouth when he comes in, and turn your face to the wall while he kneels, and count to twenty after the door shuts before you breathe through your nose again.']])}},
   {t:'Breathe in. Once.',fn:()=>{calm(-2);apply({aff:1});say([['','You breathe in. For one second you are across the seat of the truck, and somebody is driving with the heater up and his coat over you, and you are safe.'],
     ['hitmeuppp',MV('(1 breath. careful.)','(one breath and i’m in a truck. careful.)','(One breath and I’m in a truck. That’s how they get you talking.)','(One breath and I’m in the truck. One breath. That’s how they’d get me talking, and I’d never notice I’d started.)')]])}}]}),
 ()=>({L:[['','He has never raised his voice. Before he touches the tape on your hand he says “I apologise” to it, and he leaves the door unlocked and sits outside it, so that you can hear him not coming in.'],
   ['',S.f.kdThanks?'There is always one of these. In the other place it was the one who brought the water. He never looked at you, and you said thanks through the slot, and you started keeping him.':'There is always one of these. In the other place it was the one who brought the water, who never once looked at you. You nearly thanked him through the slot. You thought about it for a day.'],
   ['hitmeuppp',MV('(the good one.)','(he’s the good one. every set has 1.)','(He’s the good one. Every set has a good one.)','(He’s the good one. Every set has a good one. You like him, and you tell him things because he’s nice, and later he writes them down in the corridor.)')]],
  q:'(The good one.)',o:[
   {t:'Be polite. Tell him nothing.',fn:()=>{S.f.k62Rule='polite';save();say([['','You decide it the way you decide a drop. Please and thank you, sir. Nothing about V or the hounds, and nothing with a number in it.'],
     ['','When he brings the evening tray you thank him for it beautifully, and he stands in the doorway a moment longer than he needs to.']])}},
   {t:'Ask him his name.',fn:()=>{S.f.k62Rule='name';save();say([['hitmeuppp',MV('what’s ur name.','what’s ur name. u know mine.','What’s your name? You know mine.','What’s your name? You all know mine. It’s only fair.')],
     ['K9','You know my name.'],
     ['hitmeuppp',MV('(he wants me 2 say it.)','(see. he wants me to say it first.)','(See? He wants me to say it first.)','(See? He wants me to be the one who says it. Then it was my idea.)')],
     ['','You don’t say it. You are polite to him for the rest of the day, very polite, the way you are polite to a landlord.']])}}]})];
ROOMS.medbay.spots.push({at:[214,168],mark:[214,158],label:'Listen for the tall one',show:()=>k62M()&&kdClar()<2&&(S.f.k62Th||0)<KD62_TH.length&&S.f.k62LsAt!==S.day+'/'+(S.slot||0),act:()=>{const i=S.f.k62Th||0;S.f.k62LsAt=S.day+'/'+(S.slot||0);S.f.k62Th=i+1;save();
 const T=KD62_TH[i]();say(T.L,()=>ask('hitmeuppp',T.q,T.o))}});

/* ---------- Misaki: evenings while it is a cell ---------- */
const KD62_MP=[
 cb=>say([['','You need the sink. It is four steps from the cot, and nobody has told you that you can use it.'],
   ['','You wait until the tall one comes with the evening tray, and you ask him, sitting up straight with your hands where he can see them.'],
   ['hitmeuppp',MV('can i use the sink pls.','can i use the sink please. i’ll be quick.','May I use the sink, please? I’ll be quick.','Sorry. Excuse me. May I use the sink? I’ll be quick, I won’t touch anything else on that side.')],
   ['K9','It is your sink.'],
   ['hitmeuppp',MV('(“ur sink.” cute.)','(“your sink.” they say “your” about everything. it’s a method.)','(“Your sink.” They say “your” about everything in here. It’s a method. It makes you feel you live here.)','(“Your sink.” Your bed, your soup, your room. They say “your” about everything so you start to feel you live here, and stop looking for the door. I’ve read about this.)')],
   ['','You thank him. You use it with your back to the wall and one eye on him, quickly, and you thank him again when you are done. He goes out and sits down on the other side of the door, and for a long time you don’t hear him turn a page.']],cb),
 cb=>say([['','The tray tonight has the soup, the roll, the water, and a paper napkin folded in four. Inside the napkin somebody has drawn a hound in fountain pen, badly. It is the grey one. You can tell from the seam down her shoulder.'],
   ['','Somebody has drawn you hounds before, on napkins and once on the back of a parking ticket. Whoever it was could never draw either.']],()=>ask('hitmeuppp','(The hound.)',[
   {t:'Fold it over so you can’t see it.',fn:()=>{S.f.k62Nap='fold';calm(-1);save();say([['hitmeuppp',MV('(they know about her.)','(they know about the grey one. i must’ve told them.)','(They know about the grey one. I must have told them, under the needle.)','(They know about her seam. I told them. I must have, under the needle, with everything else, and now they’re drawing it on napkins for me.)')],
     ['','You fold it in four again and put it under the tray, hound side down, and leave the soup.']],cb)}},
   {t:'Keep it. Put it under the pillow.',fn:()=>{S.f.k62Nap='keep';apply({aff:1});save();say([['','You put it under the pillow and lie on it, and tell yourself you are keeping it as evidence of how much they know.'],
     ['hitmeuppp',MV('(evidence.)','(evidence. that’s all.)','(Evidence. That’s all.)','(It’s evidence. I’m keeping it as evidence. Shut up.)')]],cb)}}]))];

/* ---------- Misaki, worst route: after she knows, the next time he walks in ---------- */
const k62Flash=cb=>say([['',S.f.kdInterrupted?'You know where you are. He held your wrists and told you, the menu and the bed and Tuesday and his house, until it came back.':'You know where you are. You worked it out yourself, a piece at a time, the way you work out a drop.'],
 ['','He comes in at noon with the soup and says your name first, and your body does everything it did yesterday before your head can get to it. Your back is against the wall and your right hand is on the edge of the tray before you know you have moved.'],
 ['hitmeuppp',MV('thank u sir.','thank u, sir.','Thank you, sir.','Thank you, sir. Thank you.')],
 ['','You hear it after it is out. Sir, to V, in the voice you used through the slot.']],()=>ask('hitmeuppp','(He is standing very still.)',[
 {t:'Say his name.',fn:()=>{S.f.k62FlC='name';calm(2);save();say([['hitmeuppp',MV('V.','V. it’s V.','V. It’s V. Sorry.','V. It’s V, I know it’s V. I worked it out. Sorry.')],['K9','Yes.'],
   ['','He sits down on the floor, lower than you, and stays there while you eat. Every few spoonfuls you look up and check his face, and it is his face every time, and you check anyway.']],cb)}},
 {t:'Eat. Don’t look up.',fn:()=>{S.f.k62FlC='eat';calm(-2);save();say([['','You eat with your eyes on his hands. When he takes the tray you thank him again, the same way, and you don’t correct it. He says “you are welcome,” goes out, and sits down against the door.']],cb)}}]));

/* ---------- V: once a day, by band ---------- */
const KD62_VX=cb=>say([['','When he comes in she breathes through her mouth. He notices on the second day. She turns her face to the wall while he kneels with the water, and she does not breathe through her nose again until the door is shut.'],
 ['','He goes upstairs and showers, and puts on a shirt that has been in a drawer since before the grey hound was born, and leaves the coat on its hook by the back door.'],
 ['','At six he goes in smelling of nothing at all. She turns her face to the wall and breathes through her mouth.'],
 ['K9','(I am the smell she is keeping out.)'],
 ['','The next morning he puts the coat back on and kneels with the water, and a grey hair comes off his sleeve onto her blanket. She picks it off and holds it up to the light from the light-well for a long time.']],()=>{calm(-1);cb()});
const KD62_VW=cb=>say([['','At noon, when he puts the tray down inside the door, she speaks to him for the first time in two days. She is sitting up with the blanket folded square on her knees, and her voice is very polite.'],
 ['hitmeuppp',MV('ur the good one.','u’re the good one. i know how it works.','You’re the good one. I know how this works.','You’re the good one. I know how it works. You’re nice to me and I tell you things. So I’m saying it now, so you don’t waste your time: I won’t. You make good soup, though.')],
 ['','He says nothing. She nods, as if that were the answer she expected from a professional, and turns to face the wall.'],
 ['K9','(She is apologising to the guard in advance.)'],
 ['','He comes back at six with the next tray, and at noon the day after, and at six. She thanks him for every one.']],()=>{calm(-2);cb()});
const KD62_VC=cb=>say([['','She knows him today. She said his name at breakfast and asked after the hounds by colour.'],
 ['','At noon he brings the tray in without knocking, because she knows him, and she is off the bed and in the corner with her eyes on his hands before he has the door shut.'],
 ['hitmeuppp',MV('thank u sir.','thank u. sir. sorry.','Thank you, sir. Sorry.','Thank you, sir. Sorry. Thank you.')],
 ['','Then her face catches up. She stays in the corner anyway, because her legs have not.']],()=>ask('K9','(She called him sir.)',[
 {t:'Go out, knock twice, and come in again.',fn:()=>{S.f.k62VKnock=1;apply({aff:2});save();say([['','He goes out and shuts the door, and knocks twice, and waits, and comes in again with the tray. She is on the bed. She says “hi, V” as if he had just arrived, and he lets that be the first time.']],cb)}},
 {t:'Put the tray down. Sit on the floor.',fn:()=>{S.f.k62VKnock=0;calm(1);save();say([['','He puts it down and sits on the floor by the door, lower than her. She comes back to the bed a piece at a time, a foot and then a hand, while he looks at the soup.']],cb)}}]));

function k62Scene(){if(!S||!S.f||dlg||!k62Med())return null;const m=S.kd.med;if(S.f.k62Day===S.day)return null;
 const run=(fn,bg,mark)=>cb=>{S.f.k62Day=S.day;mark();save();go(cutBg(bg));fn(cb)};
 if(S.pov!=='v'){
  if(m.logicOut&&(m.sev||0)>=8&&kdClar()>=2&&!S.f.k62Fl)return run(k62Flash,'#1c2422',()=>{S.f.k62Fl=1});
  if((S.slot||0)<2||kdClar()>=2)return null;const i=S.f.k62MP||0;if(i>=KD62_MP.length)return null;return run(KD62_MP[i],'#0c0a08',()=>{S.f.k62MP=i+1})}
 if((S.slot||0)<1)return null;
 if(k62Worst()&&(m.d||0)>=1&&!S.f.k62VW)return run(KD62_VW,'#06060c',()=>{S.f.k62VW=1});
 if((m.xd||0)>=1&&(m.clar||0)<2&&!k62Worst()&&!S.f.k62VX)return run(KD62_VX,'#06060c',()=>{S.f.k62VX=1});
 if((m.clar||0)>=2&&!k62Worst()&&(m.sev||0)>=4&&(m.d||0)>=1&&!S.f.k62VC)return run(KD62_VC,'#1c2422',()=>{S.f.k62VC=1});
 return null}
const _hub62=hub;hub=function(){const a=arguments,self=this;try{const s=k62Scene();if(s)return s(()=>_hub62.apply(self,a))}catch(e){}return _hub62.apply(self,a)};

/* ---------- V: the side menu while she does not know him ---------- */
const KD62_GO=[
 cb=>say([['','He knocks twice and goes in with the soup, as he does every day, whether she eats it or not.'],
  ['','She is sitting up against the wall with the blanket folded square on her knees. She watches his hands all the way across the room, and when he puts the tray down she says thank you in the voice she uses for parking attendants.'],
  ['','He knows the look. Men on his table watch his hands like that, between one thing and the next, to see what the hands will do. She has never once looked at him that way. She has looked at him across a body and asked if he wanted half her sandwich.'],
  ['K9','(I have told her who I am. It did not reach her. Telling her again would be for me.)'],
  ['','He shows her his hands, both sides, and goes out, and comes back at six with the next one.']],cb),
 cb=>say([['','She asks him whether she may use the sink.'],
  ['','She has asked him whether she may sit up, and whether she may have the lamp off, and then whether she may have it on again. Once, at two in the morning, she asked through the door whether she was allowed to cry, and he did not know what to say, and said yes.']],()=>ask('K9','(The sink.)',[
  {t:'“It is your sink.”',fn:()=>{S.f.k62VSink='your';save();say([['hitmeuppp',MV('thank u sir.','thank u, sir.','Thank you, sir.','Thank you, sir. I’ll be quick.')],
    ['','She uses it with her back to the wall and one eye on him. He goes out and sits against the door, and does not turn a page for an hour.']],cb)}},
  {t:'“Misaki. It is V. You do not have to ask me anything.”',fn:()=>{S.f.k62VSink='v';save();say([['hitmeuppp',MV('ok. sorry.','ok. sorry. thank u.','Okay. Sorry. Thank you.','Of course. Okay. Sorry. Thank you, sir.')],
    ['','She nods at him the way people nod at a guard who has explained the rules. The next morning she asks again.']],cb)}}])),
 cb=>say([['','At night, through the door, he hears her going over it under her breath.'],
  ['hitmeuppp',MV('9 steps. hands. move on 6.','nine steps. hands first. move on six. be nice.','Nine steps, and he shows his hands, and on six you move, and you’re polite.','Nine steps, heel first, and he shows his hands, and on six you move, and by nine you’re sitting nicely, and you say please and thank you and nothing about the hounds.')],
  ['','It is a plan for him. She has counted his steps from the stairs, and she sleeps with the tray on the floor where her right hand will find it.'],
  ['K9','(I taught her none of this.)']],()=>ask('K9','(Tomorrow.)',[
  {t:'Walk the nine steps exactly the same.',fn:()=>{S.f.k62VPlan='same';save();say([['','He does. On the sixth step he hears the tray scrape, and by the ninth she is sitting on the bed with her hands in her lap. He goes in anyway, puts the soup down, shows his hands, and goes out, and he leaves the plan the way she made it.']],cb)}},
  {t:'Stop on the sixth step and say her name.',fn:()=>{S.f.k62VPlan='six';calm(-1);save();say([['','He stops on six and says “Misaki,” and on the other side of the door everything goes still. Then he hears the tray scrape, later than she planned it. He goes in anyway.'],
    ['','The next night, under her breath, the plan has a new line in it. He knows about six.']],cb)}}]))];
const _sh62=sideHub;sideHub=function(late){const o=_sh62(late);try{if(!k62Med()||S.pov!=='v'||isLone())return o;const m=S.kd.med,n=S.f.k62Go||0;if(n>=KD62_GO.length||(m.clar||0)>=2)return o;
 return o.concat([{t:'Go in anyway',sub:S.done.k62Go?'done today':'costs time · she takes you for one of them',dis:!!late||!!S.done.k62Go,fn:()=>{spend();S.done.k62Go=1;S.f.k62Go=n+1;save();go(cutBg('#0c0e10'));KD62_GO[n](()=>{calm(1);hub()})}}])}catch(e){return o}};

/* ---------- after discharge ---------- */
const k62Ev=(id,when,run)=>kdEv(id,()=>!S.f[id]&&!isLone()&&when(),done=>{S.f[id]=1;save();run(done)});
k62Ev('kd62_sir',()=>kdD()>=1,done=>{const me=S.pov!=='v',w=k62Sev0()>=8;
 const sorry=['hitmeuppp',MV('sorry. sorry sir.','sorry. sorry, sir.','Sorry. Sorry, sir.','Sorry. I’m sorry, sir. I didn’t mean to be in the way.')];
 if(me)return say([['','The second morning upstairs. You are at the island in the hoodie with a bowl of cereal, and the house is so quiet you can hear the hounds breathing in the next room.'],
  ['','He comes in behind you to get to the kettle, the way anybody would, and his hand goes past your shoulder for the tea.'],
  ['','You are off the stool and against the fridge before the spoon hits the floor, with your good hand flat on the fridge door behind you and your eyes on his hand. Your mouth says it on its own, in the voice you used through the slot.'],
  sorry,w?['','It is the second time this morning. You only heard this one.']:null,
  ['','He doesn’t move. He has the tea caddy in his hand, and he holds it still where you can see it.']],()=>ask('hitmeuppp','(Sir.)',[
  {t:'Say his name.',fn:()=>{S.f.k62Sir='name';calm(-1);save();say([['hitmeuppp',MV('V. sorry. V.','V. sorry. it’s V. i know it’s V.','V. Sorry. It’s V. I know it’s you.','V. It’s V. I know it’s you, I’ve known since Thursday. My mouth didn’t.')],['K9','Good morning.'],
    ['','He makes the tea and puts yours down at arm’s length, and you watch his hands the whole time. You pick up the spoon. You move your stool to the end of the island, where the wall is.'],
    w?['','An hour later you thank him for the salt and call him sir, and you don’t hear yourself do it.']:null],done)}},
  {t:'Pick up the spoon. Don’t say anything.',fn:()=>{S.f.k62Sir='left';calm(-2);save();say([['','You pick up the spoon and sit back down and eat the cereal, and you don’t say his name, because you don’t trust what will come out.'],
    ['','He puts your tea down beside you. “You are welcome,” he says, as if you had thanked him, and goes to feed the hounds.']],done)}}]));
 say([['','The second morning upstairs. He reaches past her for the tea caddy, the way he has reached past her a thousand times, and forgets.'],
  ['','She is off the stool and against the fridge before the spoon hits the floor, with her eyes on his hand.'],sorry,
  w?['','It is the second time this morning. She did not hear the first.']:null,
  ['','Men on his table have called him sir, near the end, when they thought manners might help. She has called him an idiot, a creep and a tall problem, and once, drunk, her sugar honey dumpling.']],()=>ask('K9','(He has the tea caddy in his hand.)',[
  {t:'Hold still. “Good morning.”',fn:()=>{S.f.k62Sir='name';save();say([['','He holds the caddy where she can see it and says it in his ordinary voice.'],
    ['hitmeuppp',MV('V. sorry.','V. sorry. it’s V.','V. Sorry. It’s you.','V. Sorry. It’s you. I know it’s you. My mouth didn’t.')],
    ['','She picks up the spoon. He makes the tea and puts hers down at arm’s length, and she watches his hands do it, and he lets her.']],done)}},
  {t:'“You are welcome.”',fn:()=>{S.f.k62Sir='left';save();say([['','He answers it as if it had been thanks. She picks up the spoon and sits back down and does not say his name.'],
    ['K9','(If I correct her, she will apologise to me again. I would rather be sir.)']],done)}}]))});

const k62File=me=>{const n=S.f.k62Th||0,P=['Nine steps from the stairs, heel first, loud on purpose.','Hands shown at the door, like for a hound that bites.','The coat, which they must have taken off its hook.','Polite, and never once raising his voice, which was the worst thing in it.'].slice(0,n);
 return n?(me?'You give him the file. ':'She gives him the file, the way she would brief him on a job. ')+P.join(' '):(me?'You tell him you had it all worked out, and then you can’t remember any of it, only that it was very neat.':'She says she had it all worked out, and then cannot remember any of it, only that it was very neat.')};
k62Ev('kd62_good',()=>kdD()>=4&&!!S.f.kd62_sir,done=>{const me=S.pov!=='v';
 const said=['hitmeuppp',MV('u were the good one.','u were the good one. in there. i had u down as the good one.','You were the good one, in there. I had you down as the good one.','In there I had you down as the good one. Every set’s got one. I kept a whole file on you.')];
 const still=['hitmeuppp',MV('still got u down sometimes.','still got u down. some mornings.','Some mornings I’ve still got you down.','Some mornings I’ve still got you down. I wake up, and I know it’s your house, and the file’s open anyway, and I have to shut it again.')];
 if(me)return say([['','Late, on his sofa, with the old hound across your feet and the television on with the sound off. He brings a blanket and puts it on the arm of the sofa, not on you, and steps back.'],
  said,['K9','Tell me.'],['','So you tell him, because it is dark and he isn’t looking at you.'],['',k62File(1)],still],()=>ask('hitmeuppp','(He is waiting.)',[
  {t:'“walk different. so i stop counting.”',fn:()=>{S.f.k62Walk='change';save();say([['K9','No.'],['hitmeuppp',MV('no??','no??','No?','No? Why not?')],
    ['K9','You learned it. If I change it, you will have to learn another one.'],
    ['','He goes up to bed at eleven. You hear him on the stairs, heel first, every step, and you count them, and he is where you knew he would be.']],done)}},
  {t:'Pull the blanket over. Say nothing else.',fn:()=>{S.f.k62Walk='keep';calm(1);save();say([['','You pull the blanket off the arm and over you. He sits down on the floor by the sofa, lower than you, with his back against it, and you fall asleep before you have decided whether to shut the file.']],done)}}]));
 say([['','Late, on the sofa. He puts a blanket on the arm beside her, not on her, and steps back where she can see his hands.'],
  said,['K9','Tell me.'],['',k62File(0)],
  ['','He listens to himself described as somebody’s method. He cannot find anything in it that is wrong.'],still],()=>ask('K9','(The file.)',[
  {t:'“Then keep it. I will not change anything in it.”',fn:()=>{S.f.k62Walk='keep';save();say([['hitmeuppp',MV('weird.','weird thing 2 say.','That’s a weird thing to say.','That’s such a weird thing to say, V. Okay. Keeping it.')],
    ['','He goes up at eleven, heel first, every step, and stops on the landing long enough for her to hear where he stopped.']],done)}},
  {t:'“Which page are you on tonight?”',fn:()=>{S.f.k62Walk='ask';apply({aff:2});save();say([['hitmeuppp',MV('the coat one.','the coat one.','The coat one.','The coat one. You smell like you. It’s horrible.')],
    ['','He takes the coat off and hangs it in the hall by the back door, and comes back and sits down on the floor by the sofa in his shirtsleeves.']],done)}}]))});

k62Ev('kd62_clock',()=>kdD()>=6&&!!S.f.k58_creak,done=>{const me=S.pov!=='v',w=k62Sev0()>=8,note3=S.f.k58Stair==='his'?'I will step on the seventh.':'I will say your name on the landing.';
 if(me)return say([['','Since the night on the back stair with the pistol, you have been keeping track of him again. You didn’t decide to. On Wednesday you noticed that you had his whole day.'],
  ['','He feeds the hounds at five, has coffee at the island at seven with his back to the room, is in the study from nine until noon with the door open a hand’s width, and comes up the back stair at three with a glass of water.'],
  ['','You know where he is at every minute, the way you knew where the guards were. You sit where you can see the door he will come through.'],
  w?['','Some afternoons, for an hour, the file opens by itself and he is the good one again. You are polite to him at the island, and he answers in the voice from the infirmary, and neither of you says what it is.']:null,
  ['hitmeuppp',MV('(i have his shifts.)','(i’ve got his shifts. i’m planning around V.)','(I’ve got his shifts. I’m planning around V.)','(I’ve got his whole rota. I could break out of his house with it. I don’t want to go anywhere, and I’ve got a plan for it anyway.)')]],()=>ask('hitmeuppp','(His day.)',[
  {t:'Tell him.',fn:()=>{S.f.k62Clock='told';apply({aff:2});save();say([['hitmeuppp',MV('i have ur shifts.','i know where u are all day. like shifts.','I know where you are all day. Like shifts.','I know where you are all day, V. Every minute. Like you’re on shifts. I didn’t mean to.')],['K9','Good.'],
    ['','The next morning his day is on the fridge in fountain pen, under the magnet shaped like a cactus, with the times and the rooms, and at the bottom: “3:00, back stair, water. '+note3+'” He keeps to it to the minute.']],done)}},
  {t:'Keep it to yourself.',fn:()=>{S.f.k62Clock='kept';calm(-1);save();say([['','You keep it. It’s useful. In the evening you sit in the armchair that faces the study door at the time he comes out of the study, and he comes out at that time, and you are ready for him, and he is carrying two cups.']],done)}}]));
 say([['','She always knows where he is. He notices on Wednesday. She is at the island before he comes down at seven, with her back to the wall, and in the armchair that faces the study door at noon, and awake at three before he reaches the stair.'],
  ['','She has worked out his day, since the night on the back stair. He knows what that is. He has done it to men.'],
  w?['','Some afternoons she is polite to him again for an hour, in the voice from the infirmary, and he answers in the tall one’s voice, because it is the one she can hear.']:null],()=>ask('K9','(She has his timetable.)',[
  {t:'Write it on the fridge for her.',fn:()=>{S.f.k62Clock='told';apply({aff:2});save();say([['','He writes his day out in fountain pen and puts it on the fridge under the magnet shaped like a cactus: the hounds at five, coffee at seven, the study until noon, and at the bottom, “3:00, back stair, water. '+note3+'”'],
    ['','She reads it, takes it down, and puts it back up straighter. After that he keeps to it to the minute. When he is going to be late he texts her the new time.']],done)}},
  {t:'Keep to it to the minute. Say nothing.',fn:()=>{S.f.k62Clock='kept';save();say([['','He keeps to it. He comes down at seven exactly, and out of the study at noon, and up the stair at three, so that the thing she has worked out will always be right.'],
    ['K9','(If she is going to plan around me, I will be easy to plan around.)']],done)}}]))});

k62Ev('kd62_report',()=>kdD()>=11&&(S.pov!=='v'?!!S.f.kd_hard_work:!!S.f.kd_v_sees),done=>{const me=S.pov!=='v';
 const rep=['hitmeuppp',MV('done. 1 shot. no witnesses. home 1:58.','done. one shot. no witnesses. 11:52. home 1:58.','Done. One shot at eleven fifty-two. No witnesses. Home at one fifty-eight.','Done. One shot, eleven fifty-two, no witnesses, no complications. Casings recovered. Home at one fifty-eight. That’s everything.')];
 if(me)return say([['','You come in at two from a job. He is at the island, the way he always is, and you stop on the far side of it and give it to him.'],rep,
  ['','Then you stand there with your hands at your sides. You used to come in and tell it like a story, with voices. Tonight you are waiting for him to say you can go.']],()=>ask('hitmeuppp','(He hasn’t said anything.)',[
  {t:'Wait to be told.',fn:()=>{S.f.k62Rep='wait';calm(-2);save();say([['K9','Sit down.'],
    ['','You sit at once, because he said to. He sees you do it. He gets up and comes round the island and sits on the floor by your stool, lower than you, and doesn’t say anything else for a long time.']],done)}},
  {t:'Sit down without asking.',dis:tier()<2,sub:tier()<2?'you can’t make yourself':'',fn:()=>{S.f.k62Rep='sat';apply({aff:2});save();say([['','You pull the stool out and sit down, and it takes more than it should. He pushes a cup across.'],
    ['hitmeuppp',MV('...thx.','thanks.','Thanks. Thanks, V.','Thanks, V. Thank you.')]],done)}}]));
 say([['','She comes in at two from a job and stops on the far side of the island, and reports.'],rep,
  ['','Then she stands with her hands at her sides, waiting. She used to come in and tell it like a story, with voices. He has heard this voice before, through the infirmary door, thanking the guard for soup she would not eat.']],()=>ask('K9','(She is waiting for him to dismiss her.)',[
  {t:'“Sit down.”',fn:()=>{S.f.k62Rep='wait';apply({heart:-1});save();say([['','She sits at once, because he told her to.'],
    ['K9','(I can tell her to sit, and she will sit. I would give a great deal never to have learned that.)'],
    ['','He does not tell her to do anything else all night.']],done)}},
  {t:'Sit down on the floor first, below her.',fn:()=>{S.f.k62Rep='sat';apply({aff:2});save();say([['','He gets off his stool and sits on the kitchen floor with his back against the cupboards. After a minute she comes round the island and sits down on the floor beside him, and tells him about the job again, with voices, badly.']],done)}}]))});
(function(){if(typeof KD_ORDER==='undefined')return;const put=(id,after)=>{const i=KD_ORDER.indexOf(after);if(i<0)KD_ORDER.push(id);else KD_ORDER.splice(i+1,0,id)};
 put('kd62_sir','kd61_home');put('kd62_good','kd61_rent');put('kd62_clock','k58_creak');put('kd62_report','kd_v_sees')})();

/* ---------- ending lines ---------- */
const _xe62=extraEnding;extraEnding=function(){const L=_xe62();try{if(!S||!S.f)return L;const f=S.f;
 if(f.kd62_sir&&f.k62Sir==='left')L.push('Some mornings she still calls V sir, and he still answers to it.');
 else if(f.kd62_sir)L.push('She called V sir once, on the second morning upstairs. She says his name first now, every morning, before anything else.');
 if(f.k62Clock==='told')L.push('V’s day is still on the fridge under the cactus magnet, in fountain pen. He keeps to it to the minute.');
 if((f.k62Th||0)>=4&&f.kd62_good)L.push('She can still recite the file she kept on the good one. She did it once at the Sunday table, as a bit, and Ronin laughed until he looked at V.')}catch(e){}return L};
