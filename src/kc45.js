/* ===================== MORE OF THEIR WEEK (kc45) =====================
   Same rules as the rest: the unnamed city, the hounds unnamed in text, no new characters, the four frighten
   everyone but each other. V gets darker scenes of his own; Sunday at the table becomes something you can do; the
   four build each other's alibis over dinner; more texts and apathy notes. */
const MW=()=>{try{return !isLone()&&!S.dark&&['normal','act2','act3','epilogue'].includes(S.phase)}catch(e){return false}};
const mwEv=(id,when,run)=>EVENTS.push({id,when:()=>{try{return MW()&&when()}catch(e){return false}},run});
/* ---------- V ---------- */
mwEv('dk_v_dawn',()=>S.pov==='v'&&S.day>=4,done=>say([
 ['','Five in the morning. V feeds the hounds himself, every day, from the cold room. He weighs each portion on a kitchen scale and writes the weight down.'],
 ['','He talks to them while they eat. He tells them what the weather will do and which of them needs a bath. He has never once in his life spoken to a person as gently as this.'],
 ['K9','(Nothing is wasted. I have not been argued out of that one.)']],()=>{apply({heart:-1});Object.keys(S.dogs||{}).forEach(k=>S.dogs[k]=clamp(S.dogs[k]+4));done()}));
mwEv('dk_v_self',()=>S.pov==='v'&&S.day>=7,done=>say([
 ['','January, or near enough. V updates the files on the four of them. The last one is his own.'],
 ['','He reads last year’s entry. “Subject has no reason to stop.” He writes this year’s underneath it, and it is the same sentence, and then after a while he adds: “Subject no longer looks for one.”'],
 ['','He files it under V, between the hounds’ vaccination records and the deed to the house, and goes up to make breakfast for whoever is awake.']],done));
mwEv('dk_v_thread',()=>S.day>=6&&tier()>=1,done=>{const m=S.pov!=='v';say([
 ['','Three in the morning in the room off the kennel. V is stitching a hound’s paw on the steel table, with a curved needle and the fine thread, talking to her the whole time.'],
 ['','When he has finished he lifts her down, washes the table, and lays out the same needle and the same thread for the man on the trolley by the door. He works on the man with exactly the same care. It just has a different purpose.'],
 ['',m?'You’re sitting on the counter eating an apple, keeping him company. You don’t find it strange. You notice that you don’t, and you finish the apple.':'Misaki is sitting on the counter eating an apple, keeping him company. They don’t find any of it strange, and he has stopped being surprised by that.']],()=>{apply({edge:2});done()})});
/* ---------- Misaki ---------- */
mwEv('dk_m_bench',()=>S.pov!=='v'&&S.f.fiveDone&&S.day>=10,done=>say([
 ['','You pass the station bench where you did the sums at sixteen. Five years, you worked out. You’re past it now.'],
 ['hitmeuppp',MV('(still here.)','(if i’d died on time nobody would’ve noticed.)','(If I’d died on schedule, nobody would have noticed.)','(If I’d died on schedule, nobody would’ve noticed. Now three people would, and the rest of the city would throw a party. That’s growth, I think.)')],
 ['','A family sits down on the bench after you. You watch them for a second, the way you’d look at a picture of a town you’ve never been to, and then you go to buy cereal.']],done));
mwEv('dk_m_hands',()=>frT('a')>=2,done=>say([
 ['','Angel holds her hand out flat over the table to show how steady it is. It doesn’t move. Then Misaki puts theirs beside it. Neither of them moves at all.'],
 [AN,'see. that’s how you know. normal people shake a little.'],
 ['hitmeuppp',MV('we’re not normal.','we’re not normal people.','We aren’t normal people.','We stopped being normal people a long time ago. I don’t even remember shaking. I think I skipped it.')],
 ['','They hold their hands out side by side over the breakfast table for a whole minute, like a contest.']],()=>{fr('a',2);done()}));
/* ---------- the four ---------- */
mwEv('rel_alibi',()=>frT('a')>=1&&frT('r')>=1&&S.day>=5,done=>{const m=S.pov!=='v';say([
 ['','Sunday dinner. They build each other’s alibis for the week the way other families plan the school run.'],
 [AN,'tuesday ronin is at my studio from eight. i have footage. he was in the back of a makeup tutorial eating a sandwich.'],
 [RN,'Thursday you’re at mine. Gospel night. Ask anybody. Well, don’t ask anybody, ask the neighbours, they hate it.'],
 ['K9','Wednesday the two of you are at a donor dinner with me. You were very polite. Misaki spilled soup on a judge.'],
 ['hitmeuppp',MV('did i.','did i? good. i hate soup.','Did I? Good. I hate soup.','Did I? Love that for me. Which judge? Never mind, I’ll pick one.')],
 ['','It takes twenty minutes and it is airtight. Then they talk about something else. The whole week of the city is laid out on the table between the bread and the salt, and none of them thinks of it as anything but logistics.']],()=>{fr('a',2);fr('r',2);apply({heat:-6});done()})});
mwEv('rel_vote',()=>frT('a')>=2&&frT('r')>=2&&S.day>=8,done=>say([
 ['','There is an election. Posters on every lamp post about safer streets.'],
 [RN,'Anybody votin’?'],[AN,'for who. they’re both promising to catch us.'],['K9','I vote. It is a civic duty. I vote for whoever is least likely to succeed.'],
 ['hitmeuppp',MV('i’m not registered.','i’m not even registered. i don’t exist on paper.','I can’t. I don’t exist on paper until I was nine, and barely after.','I don’t exist enough to vote. No birth certificate. I’m a rumour with a trailer.')],
 ['','The winner gives a speech promising to find whoever is responsible. They watch it in the atrium with the sound off and the hounds asleep across their feet, and Ronin gives it a score out of ten.']],()=>{fr('r',1);fr('a',1);done()}));
/* ---------- Sunday at the table, as something to do ---------- */
const _shMW=sideHub;sideHub=function(late){const o=_shMW(late);if(!MW()||isLone()||tier()<1)return o;const wait=S.day-(S.f.mwTable||-9)<5;
 return o.concat([{t:'Sunday at the table',sub:wait?'the cold room is full':'costs time · downstairs, with '+(S.pov==='v'?'Misaki':'V')+' · the hounds have to eat',dis:late||wait,fn:()=>{spend();S.f.mwTable=S.day;save();mwTable()}}])};
function mwTable(){const m=S.pov!=='v';go(cutBg('#0c0e10'));
 say([['','Downstairs. The steel table, the drain, the good light. The four hounds sit in a row by the door and do not make a sound.'],
  ['',m?'You take the short knife. V takes the long one. You hum. He does not ask you to stop.':'He takes the long knife. Misaki takes the short one and starts to hum. He does not ask them to stop.']],()=>kdTurn(ok=>{
   go(cutBg('#0c0e10'));Object.keys(S.dogs||{}).forEach(k=>S.dogs[k]=clamp(S.dogs[k]+(ok?10:5)));apply(m?{edge:2,aff:ok?2:1}:{heart:-1,aff:ok?2:1});save();
   say([['',ok?'Every joint comes apart first time. It takes under an hour. The portions are weighed and labelled and in the cold room by noon.':'It takes longer than it should. A joint fights you. Nobody minds; you have all afternoon, and the hounds are patient.'],
    ['',pk(['Afterwards you both wash up at the big sink, elbow to elbow, and argue about what to have for lunch.','Afterwards the hounds are fed, one at a time, by weight. V talks to each of them. Misaki eats a sandwich on the stairs.','Afterwards you hose the floor down together. The water runs pink and then clear, and someone puts the radio on.'])]],hub)},
   {bg:()=>rect(0,0,W,H,'#0c0e10'),title:'Sunday · the joints',unit:'joints',hint:'Press E as the knife finds the joint.',ok:'Clean.',bad:'It fights you.'}))}
/* ---------- texts ---------- */
txDef('tx_mw_door',{with:'v',pov:'m',prio:1,when:()=>MW()&&tier()>=2&&S.slot>=2,nodes:{
 start:{in:()=>['It is three in the morning.','The hounds are lying by the front door, all four of them, facing it.'],expire:2,
  opts:()=>[{t:'“is that a hint”',fx:()=>apply({aff:2}),reply:()=>['It is a statement of fact.','...It is a hint.']},
   {t:'“omw. leave it unlocked”',fx:()=>{apply({aff:3});calm(2)},reply:()=>['It has never been locked to you.','I will put the kettle on. They have already stood up.']}]}}});
txDef('tx_mw_grave',{with:'r',pov:'m',prio:1,when:()=>MW()&&frT('r')>=2,nodes:{
 start:{in:()=>['found a grave with your name on it','not you. some old lady. same spelling. 1931 to 1998','want me to steal the headstone. it’d look great in your trailer'],expire:3,
  opts:()=>[{t:'“YES”',fx:()=>fr('r',3),reply:()=>['already in the truck. heavy as shit','you owe me a beer and a hernia']},
   {t:'“leave her alone she’s resting”',fx:()=>fr('r',2),reply:()=>['aw. you got manners for the dead','I’ll leave her flowers. stole ’em off the next one over']}]}}});
txDef('tx_mw_format',{with:'a',pov:'v',prio:1,when:()=>MW()&&frT('a')>=2,nodes:{
 start:{in:()=>['i reformatted your ledger','it was in times new roman V. TIMES NEW ROMAN. i almost called the police on you'],expire:3,
  opts:()=>[{t:'“What is it in now?”',fx:()=>fr('a',2),reply:()=>['something with dignity. i color coded the deceased','green means fed to the hounds. it’s very calming']},
   {t:'“Change it back.”',fx:()=>fr('a',1),reply:()=>['no','i did keep a copy in times new roman. for your funeral']}]}}});
/* ---------- more apathy notes ---------- */
if(typeof AP_NOTES!=='undefined')AP_NOTES.push(
 ['','A missing-person poster has gone up on the lamp post outside V’s gate. Misaki uses it to wipe the mud off a hound’s paw on the way in.'],
 ['','The four of them watch a documentary about serial killers. Ronin heckles the experts. Angel critiques the lighting. V corrects a date. Misaki falls asleep halfway through.'],
 ['','There is a vigil in the square for “the victims of the last year.” The four drive past it on the way to dinner, and Angel says the candles are a nice touch.'],
 ['','A neighbour asks V whether he feels safe with everything that has been going on. V says that he does, very much.']);
const _xeMW=extraEnding;extraEnding=function(){const L=_xeMW();if(!S||!S.seen)return L;
 if(S.seen.dk_v_self)L.push('V’s file on himself has the same line every January: “Subject has no reason to stop.” Under it, in a newer ink: “Subject no longer looks for one.”');
 if(S.f&&S.f.mwTable)L.push('Sundays are still at the table downstairs. Somebody hums. The hounds are fed by weight.');
 return L};
