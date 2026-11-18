/* ===KC82-BEGIN=== */
/* ===================== THE WAR: ONE QUESTION A DAY (kc82) =====================
   More of the enemies-to-lovers route between the infirmary and the corridor. Needs kc73, kc76–kc81.
   1. The house menu (kc81) gains "Ask him one thing" / "Ask them one thing": eight questions each way, asked in order,
      one a day (S.f.e2l81.ask counts them; S.f.e2lAskd). Each is answered straight. Neither of them lies in these;
      that is the point, and it is why the corridor (kc78) hurts: they have had the truth out of each other for weeks
      on everything except the one question.
   2. Ronin, Angel and the hounds: three location scenes in kc73's pool (the back pew; the reflector; the hall).
   3. Threads: Angel ("in love or scared"), Ronin (the other book: days nobody died).
   4. A morning in the after phase: "thank you", said asleep, through the wall.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc82.md. Test: node tools/k82_test.js */
const K82=()=>{try{return typeof K81==='function'&&K81()}catch(e){return false}};

/* ===================================== ONE QUESTION ===================================== */
/* Misaki asks V */
const K82_QM=[
 {q:'“why hounds”',a:()=>[
  K76V('They were to be destroyed. Each of them had been used, by somebody, for something. I do not destroy what has been used. I destroy what uses.'),
  K76MV('that’s ur whole thing, isn’t it','that’s your whole thing, isn’t it','That’s your whole thing, isn’t it?','That is your whole thing, isn’t it? Used, and uses. Two columns.'),
  K76V('It is the whole of it. You will have noticed which column I put you in.'),
  K76MV('…yeah','…yeah. i noticed','…Yeah. I noticed.','…Yes. I noticed.'),
  K76V('I wrote that page before I had seen the films of your bones. I have not known since what to do with the page.')]},
 {q:'“what’s slow like. for u. when ur doing it”',a:()=>[
  K76V('It is like accounts. I take no pleasure in the length of it. I take it in the sum coming out even.'),
  K76MV('and mine? what’s my sum','and mine? what does my sum come out to','And mine? What does my sum come out to?','And mine? What does my sum come out to, when you do the accounts?'),
  K76V('I have not been able to make it come out. I have told you that the page has no total.'),
  K76MV('(he keeps saying that like it’s a confession. it’s arithmetic. it’s only arithmetic)','(he keeps saying that like it’s a confession. it’s just arithmetic)','(He keeps saying that like it’s a confession. It’s just arithmetic.)','(He keeps saying that as if it were a confession. It is only arithmetic.)')]},
 {q:'“why isn’t ur name on anything”',a:()=>[
  K76V('A name on a shelter door is a man buying a good opinion of himself. I want the roof to be there. I do not want to be thanked by people who had no choice but to come in under it.'),
  ['','You think of forty-one thank-yous, in the good voice, for soup.'],
  K76MV('yeah. ok. i get that one','yeah. okay. i get that one','Yeah. Okay. I get that one.','Yes. Okay. That one I understand.')]},
 {q:'“do u ever actually sleep”',a:()=>[
  K76V('Three and a half hours.'),
  K76MV('and the rest of the night','and the rest of the night?','And the rest of the night?','And what do you do with the rest of the night?'),
  K76V('I read. I walk them. Lately I listen to a house with a second person in it. It is louder than I had expected.'),
  K76MV('i’m not loud','i am not loud','I am not loud.','I am not loud. I’m practically furniture.'),
  K76V('You count, under your breath. Exits. I can hear it from the stair.')]},
 {q:'“who taught u to cut”',a:()=>[
  K76V('A veterinary text, and eleven animals that did not live. I am better now. You have had the benefit of it.'),
  K76MV('u practised on DOGS','you practised on dogs','You practised on dogs.','You practised on dogs. To get good enough for people.'),
  K76V('I practised in order to save them. It is the only reason I have ever learned to do anything.'),
  ['','He looks at your hand when he says it, and then, very deliberately, at the wall.']]},
 {q:'“would u have done it. in the trailer. if i hadn’t woken up”',a:()=>[
  K76V('Yes.'),
  K76MV('just yes','just “yes”','Just “yes”.','Just “yes”. No speech.'),
  K76V('You asked, and you watch hands; you would know if I lied. Yes. I would have done it that night. I would have been wrong, and I would never have found it out.'),
  K76MV('(he said wrong. he said he’d have been WRONG)','(he said wrong. he said he would have been wrong)','(He said wrong. He said he would have been wrong.)','(He said wrong. He said that he would have been wrong.)'),
  K76MV('(…that’s about that night. not about tomorrow. don’t)','(…that’s about that night. it’s not about tomorrow. don’t)','(…That’s about that night. It’s not about tomorrow. Don’t.)','(…That is about that night. It says nothing about tomorrow. Don’t.)')]},
 {q:'“what happens to the book when u die”',a:()=>[
  K76V('It goes into the furnace, unread. Angel has the instruction.'),
  K76MV('all of it? all those names','all of it? all those names?','All of it? All those names?','All of it? All those names, and not one person reads them?'),
  K76V('It is not a record for anybody. It is how I know that I did not do any of it for nothing.'),
  K76MV('and my page','and my page goes in with them','And my page goes in with them.','And my page goes into the furnace with the card man.'),
  K76V('I am making other arrangements for your page.')]},
 {q:'“what do u want for dinner”',a:()=>[
  ['','He stops with the kettle in his hand.'],
  K76V('Nobody has asked me that in this house.'),
  K76MV('well i’m asking. don’t make it weird','well, i’m asking. don’t make it weird','Well, I’m asking. Don’t make it weird.','Well, I’m asking, V. Don’t make it weird.'),
  K76V('Whatever does not need cutting.'),
  K76MV('(he’s STILL on about the chop)','(he is still on about the chop)','(He is still on about the chop.)','(He is still on about the chop. He will be on about the chop at my funeral.)')]}];
/* V asks Misaki */
const K82_QV=[
 {q:'“Why did you never ask what they had done?”',a:()=>[
  K76MV('bc then i’d have to decide. u get to decide. u’ve got a house and a book. i’ve got four hundred a month','because then i’d have to decide. you get to decide, you’ve got a house and a book. i’ve got four hundred a month','Because then I’d have to decide. You get to decide; you’ve got a house and a book. I’ve got four hundred a month.','Because then I would have to decide. You get to decide, V; you have a house and a book. I have four hundred a month.'),
  K76MV('deciding’s for people who can afford to be wrong','deciding is for people who can afford to be wrong','Deciding is for people who can afford to be wrong.','Deciding is for people who can afford to be wrong about it.'),
  K76V('(That is an answer. I had forty pages on them, and I did not have that.)')]},
 {q:'“What is March?”',a:()=>[
  K76MV('my birthday. probably. i wrote it on a form myself bc it was the next month','my birthday. probably. i wrote it on a form myself because it was the next month','My birthday. Probably. I wrote it on a form myself, because it was the next month.','My birthday, probably. I wrote it on an enrolment form myself, because March was the next month.'),
  K76MV('nobody wrote the real one down','nobody wrote the real one down','Nobody wrote the real one down.','Nobody wrote the real one down anywhere.'),
  K76V('I have it in the file as a question mark.'),
  K76MV('yeah. so do i','yeah. so have i','Yeah. So have I.','Yes. So have I.')]},
 {q:'“What do you count, under your breath?”',a:()=>[
  K76MV('exits. always. if there’s less than two i don’t sit down','exits. always. if there are fewer than two i don’t sit down','Exits. Always. If there are fewer than two, I don’t sit down.','Exits. Always. If a room has fewer than two, I do not sit down in it.'),
  K76V('There are three from the spare room.'),
  K76MV('i know. i counted. u put me in the one with three','i know. i counted. you put me in the one with three','I know. I counted. You put me in the one with three.','I know; I counted. You put me in the one room up there with three.'),
  K76V('Yes.'),
  ['','They wait for you to say why. You find that you cannot do it without saying something else as well, and you say nothing.']]},
 {q:'“What would you have been?”',a:()=>[
  K76MV('a pilot. don’t laugh','a pilot. don’t laugh','A pilot. Don’t laugh.','A pilot. Don’t you dare laugh.'),
  K76V('I do not laugh.'),
  K76MV('had four grand in a biscuit tin. school wanted a birth certificate. so. this','i had four grand in a biscuit tin. the school wanted a birth certificate. so. this','I had four grand in a biscuit tin. The school wanted a birth certificate. So. This.','I had four thousand dollars in a biscuit tin, and the flight school wanted a birth certificate. So: this.'),
  K76V('(On the ninth floor of a building that I own, a man sold birth certificates at three thousand apiece.)'),
  K76V('(I let him the office.)')]},
 {q:'“Does the doorman trouble you?”',a:()=>[
  K76MV('no','no','No.','No.'),
  K76MV('…it didn’t. it does a bit now. that’s UR fault. u keep SAYING him','…it didn’t. it does a bit, now. that’s your fault. you keep saying him','…It didn’t. It does a bit, now. That’s your fault. You keep saying him.','…It did not. It does a little, now, and that is your fault. You keep saying him.'),
  K76MV('he was a guy in the way. now he’s a guy with a wife with teeth','he was a guy in the way. now he’s a guy whose wife needed teeth','He was a guy in the way. Now he’s a guy whose wife needed teeth.','He was a man in the way. Now he is a man whose wife needed teeth, and I know about the teeth.'),
  K76V('Good.'),K76MV('fuck off, “good”','fuck off, “good”','Fuck off, “good”.','Fuck off with your “good”.'),
  K76V('I did not say that I enjoyed it. I said good.')]},
 {q:'“What did you take me for, in the first week?”',a:()=>[
  K76MV('a rich guy with a hobby. never been hungry and thought that made him clean','a rich guy with a hobby, who’d never been hungry and thought that made him clean','A rich guy with a hobby, who’d never been hungry and thought that made him clean.','A rich man with a hobby, who had never once been hungry and thought that made him clean.'),
  K76V('And now?'),
  K76MV('a rich guy with a hobby who cuts up my dinner. don’t push it','a rich guy with a hobby who cuts up my dinner. don’t push it','A rich guy with a hobby who cuts up my dinner. Don’t push it.','A rich man with a hobby who cuts up my dinner. Do not push it.')]},
 {q:'“Would you have taken the shot, at the dinner? If I had not been worth more alive.”',a:()=>[
  K76MV('yeah','yes','Yes.','Yes.'),
  K76MV('that week, yeah. i had it. two pounds on a three pound trigger','that week, yes. i had it. two pounds on a three-pound trigger','That week, yes. I had it. Two pounds on a three-pound trigger.','That week, yes. I had it: two pounds on a three-pound trigger, and your ear in the glass.'),
  K76V('Thank you.'),
  K76MV('for WHAT','for what','For what?','For what, exactly?'),
  K76V('For not saying otherwise. I would have known, and then I could not have believed the next thing that you told me.')]},
 {q:'“Is there anything that you want?”',a:()=>[
  K76MV('like in general, or for dinner','in general, or like, for dinner','In general, or, like, for dinner?','In general, or do you mean for dinner?'),
  K76V('Either.'),
  K76MV('nobody’s asked me the first one. noodles','nobody’s asked me the first one before. noodles','Nobody’s asked me the first one before. Noodles.','Nobody has asked me the first one before. For dinner: noodles.'),
  K76V('And the first?'),
  K76MV('…ask me when i’ve got two hands','…ask me again when i’ve got two hands','…Ask me again when I’ve got two hands.','…Ask me again when I have two working hands.'),
  K76V('(I told them once what I would do when they had two hands. I do not think that they have forgotten it. I think that is why they said it.)')]}];
const k82Left=()=>{try{const m=k76M(),P=m?K82_QM:K82_QV;return (S.f.e2lAskd||0)<P.length}catch(e){return false}};
function k82Ask(){const m=k76M(),P=m?K82_QM:K82_QV,i=S.f.e2lAskd||0;k81Inc('ask');if(i>=P.length)return hub();const Q=P[i];S.f.e2lAskd=i+1;save();
 const where=[m?'The kitchen, late. He is drying the same cup he has been drying for some minutes.':'The kitchen, late. They are sitting on the counter, which you have asked them not to do.',
  m?'The kennel. He is checking the old hound’s hip, and cannot leave until he has finished.':'The kennel. They are in the straw with the old hound, and cannot get up without disturbing him.',
  m?'The back stair, at four. He has stood aside for you, against the wall.':'The back stair, at four. You have stood aside, against the wall.',
  m?'His car, outside an address, with the engine off.':'Your car, outside an address, with the engine off.'][i%4];
 say([['',where],m?K76MV(Q.q.slice(1,-1)):K76V(Q.q.slice(1,-1))].concat(Q.a()),()=>{apply({aff:1});hub()})}

/* ===================================== RONIN, ANGEL, THE HOUNDS ===================================== */
if(typeof l73==='function'){
 l73('l82_pew',['ronin'],.6,()=>S.phase==='act2'&&k73Done('e2l_car'),done=>say(k76M()?[
  ['','Ronin is cleaning the crowbar at his kitchen table with a toothbrush and something out of a gold bottle.'],
  [RN,'Went to church Sunday. Back pew. Asked about you two.'],
  K76MV('asked who','asked WHO','Asked who?','Asked who, Ronin? Be specific.'),
  [RN,'Who d’you fuckin’ think. Asked the Devil which one of you he’s gettin’ first.'],
  [RN,'Says he don’t want either. Says you’re both too busy torturin’ each other to be any fun for him.'],
  K76MV('that’s not funny','that’s not funny','That’s not funny.','That is not funny.'),
  [RN,'Wasn’t jokin’. Eat somethin’.']]:[
  ['','Ronin is cleaning the crowbar at his kitchen table with a toothbrush and something out of a gold bottle.'],
  [RN,'Went to church Sunday. Back pew. Asked about you two.'],
  K76V('Of whom did you ask?'),
  [RN,'Who d’you fuckin’ think. Asked the Devil which one of you he’s gettin’ first.'],
  [RN,'Says he don’t want either. Says you’re both too busy torturin’ each other to be any fun for him.'],
  K76V('I do not find that amusing.'),
  [RN,'Wasn’t jokin’, Vee. Sit down. You look like a fuckin’ coat rack.']],()=>{fr('r',1);done()}));
 l73('l82_reflector',['studio'],.6,()=>S.phase==='act2'&&k73Done('e2l_car')&&!S.f.e2lEnd,done=>say(k76M()?[
  ['','Angel has you hold the reflector for a shoot, in the left hand, because she says it is good for it. Her camera face is on. It goes off between takes like a light.'],
  [AN,'you flinch when he’s behind you, and you lean when he’s next to you. i’ve watched you do both in one minute'],
  K76MV('i don’t lean','i do not lean','I do not lean.','I do not lean. I have never leaned.'),
  [AN,'you lean, baby. about two degrees. i shoot for a living'],
  [AN,'pick one. flinch or lean. you’ll pull something doing both'],
  ['','The reflector shakes, and it is not the hand.']]:[
  ['','Angel has you hold the reflector for a shoot, because you are tall. Her camera face is on. It goes off between takes like a light.'],
  [AN,'you stand four steps away from them. always four. i counted. in the kitchen, on the stairs, at my table'],
  K76V('It is a courtesy.'),
  [AN,'it’s a leash, V. you’ve put yourself on a four-step leash and you’re holding the other end'],
  [AN,'what happens at three'],
  K76V('I do not know. I have not permitted it to arise.')],()=>{fr('a',1);done()}));
 l73('l82_hall',['atrium'],.6,()=>['after','act2'].includes(S.phase)&&typeof kdPost==='function'&&kdPost()&&!S.f.e2lRow,done=>say([
  ['',k76M()?'You come into the hall from the stairs as he comes in from the yard. The four hounds, who were following him, stop and lie down in a line across the floor, exactly halfway between you.':'You come in from the yard as they come down the stairs. The four hounds, who were at your heel, stop and lie down in a line across the floor, exactly halfway between you.'],
  ['','The old hound looks at one of you and then at the other. He puts his chin on his paws.'],
  K76V('They have never done that.'),
  K76MV('they don’t know who to follow','they don’t know which one of us to follow','They don’t know which one of us to follow.','They do not know which one of us to follow.'),
  K76V('They know. They are declining to choose.'),
  ['',k76M()?'You both stand there. Neither of you is going to be the one who walks across.':'You both stand there. Neither of you is going to be the one who walks across.']],()=>{done()}))}

/* ===================================== THREADS ===================================== */
if(typeof txDef==='function'){
 txDef('tx_e2l_both',{with:'a',prio:2,when:()=>K82()&&S.phase==='act2'&&k73Done('e2l_know')&&!S.f.e2lEnd,nodes:{
  start:{in:()=>[k76M()?'ok. are you in love with him or are you scared of him':'ok. are you in love with them or are you scared of them','one word. i’m timing you'],expire:3,
   opts:()=>[{t:k76M()?'“both”':'“Both.”',reply:()=>['yeah','that’s what i wrote down','it’s not in the envelope. the envelope’s something else. this is just on a napkin']},
    {t:k76M()?'“neither”':'“Neither.”',reply:()=>['liar ❤️','you took four seconds. neither takes one']},
    {t:k76M()?'“is there a difference”':'“Is there a difference?”',reply:()=>['for us? no','for normal people i think there’s supposed to be','i’ll ask one']}]}}});
 txDef('tx_e2l_days',{with:'r',prio:2,when:()=>K82()&&['after','act2'].includes(S.phase)&&k73Done('e2l_after')&&!S.f.e2lEnd,nodes:{
  start:{in:()=>['book’s closed. i’m keepin’ a different one now','just a number on the fridge. days nobody in this server’s tried to kill nobody else in it','we’re at '+Math.max(3,(S.day-(S.kd&&S.kd.t0||S.day))+3)],expire:3,
   opts:()=>[{t:k76M()?'“what’s the record”':'“What is the record?”',reply:()=>['this is the record','it was four before','don’t fuck it up']},
    {t:k76M()?'“don’t jinx it”':'“You will tempt it.”',reply:()=>['i’m a religious man','i’ve tempted worse','eat somethin’']}]}}})}

/* ===================================== A MORNING ===================================== */
const _me82=morningEvent;morningEvent=function(done){try{if(S&&K82()&&S.phase==='after'&&typeof kdPost==='function'&&kdPost()&&!S.seen.m82_wall&&k73Done('e2l_after')&&S.f.e2lMornDay!==S.day&&mbOk()){
  S.seen.m82_wall=1;S.f.e2lMornDay=S.day;mbUse();save();k77Go('#08080a');return say(k76M()?[
   ['','You wake yourself up, at five, saying thank you. Out loud, in the good voice, to nobody, in a room that has three exits.'],
   K76MV('(stop. STOP. there’s nobody here to thank)','(stop it. stop. there’s nobody in here to thank)','(Stop it. Stop. There’s nobody in here to thank.)','(Stop it. Stop. There is nobody in this room to thank.)'),
   ['','Through the wall, the kettle goes on. He is up; he is always up. He must have heard. He makes exactly as much noise as a man making tea, for exactly as long, and you lie there and hate him for the tact of it.']]:[
   ['','At five, through the wall of the spare room, they say thank you. They are asleep. It is the pleasant voice, from the infirmary, addressed to whoever is holding the keys in the dream.'],
   K76V('(I am in the dream, then. I have a fair idea in which capacity.)'),
   ['','You put the kettle on, so that there will be an ordinary noise in the house when they wake. You make exactly as much of it as a man making tea. It is the only thing you can think of to do for them that they will not have to answer.']],()=>_me82(done))}}catch(e){}return _me82(done)};

/* ===================================== ENDINGS ===================================== */
const _xe82=extraEnding;extraEnding=function(){const L=_xe82();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const n=S.f.e2lAskd||0;
 if(n>=8)L.push('In V’s house they asked each other one thing a day, and got the truth every time. The one question neither of them asked was the one they both needed.');
 else if(n>=3)L.push('In V’s house they asked each other one thing a day, and got the truth every time. They got through '+n+' before the corridor.')}catch(e){}return L};
/* ===KC82-END=== */
