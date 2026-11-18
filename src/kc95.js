/* ===KC95-BEGIN=== */
/* ===================== THE WAR: TALKING, AFTER (kc95) =====================
   A general expansion of the enemies-to-lovers route outside the infirmary. Needs kc73, kc76–kc94.
   1. TALK. kc74 replaced the talk menu with a hostile one for the early game only; from the kidnapping on, talking to
      the other one fell back to the normal route's topics. On the route, until the boat, convo('v'|'m') now opens a
      route menu instead (not in the infirmary). Three things a day, as before. The topics change with where the two
      of them are:
        wary   out of the infirmary, before the realisation (kc78's e2l_know)
        know   each has found out, alone, that they will not do it, and is sure the other would
        cold   after the corridor (e2l_row), until the boat
      Five topics a stage, each way: thirty exchanges. S.talks['k95_'+id] counts them.
   2. A YEAR ON (kc83's epilogue menu): two more scenes, with lovers and rivals versions: the trailer; Ronin's number.
   3. MORNINGS (shared cap): the rent (after phase); the coffee at the spare-room door (Act II, before the corridor).
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc95.md. Test: node tools/k95_test.js */
const K95=()=>{try{return typeof K94==='function'&&K94()}catch(e){return false}};
const k95Stage=()=>{try{if(!K95()||S.f.e2lEnd||!['after','act2','act3'].includes(S.phase)||(S.kd&&S.kd.med)||!k73Done('e2l_door'))return null;
 return k73Done('e2l_row')?'cold':k73Done('e2l_know')?'know':'wary'}catch(e){return null}};
const T95=(id,t,L)=>({id,t,L});

/* ===================================== MISAKI TALKS TO V ===================================== */
const K95_V={
 wary:[
  T95('wv1','“am i still in the book”',()=>[K76V('Yes.'),M2('so what am i doing in ur spare room','so what am i doing in your spare room?'),K76V('Recovering. The two are not in conflict. I have never killed a thing that was not well.'),M2('(that’s meant to be reassuring. it’s the least reassuring thing anyone’s ever said to me)','(that’s meant to be reassuring. it’s the least reassuring thing anybody has ever said to me)')]),
  T95('wv2','“why’s there a place laid for me”',()=>[K76V('Because you eat here.'),M2('i eat at the island','i eat at the island'),K76V('Then it is laid in case you should change your mind. I lay it. You are under no obligation to notice.'),N('You notice. You have noticed every night. The fork is on the left.')]),
  T95('wv3','“what did u tell hale”',()=>[K76V('That I had not seen you. It is the first untruth that I have told that man in eleven years.'),M2('u lied to a cop. for me','you lied to a cop. for me'),K76V('I lied to a policeman. The reason is my own affair.'),M2('(he had a letter to that guy with my thumbprint in it. and he lied to him. file that somewhere. i don’t know where)','(he had a letter to that man with my thumbprint in it, and he lied to him. file that somewhere. i don’t know where)')]),
  T95('wv4','“give me something to do. i’m going mad”',()=>[K76V('You have one hand.'),M2('i’ve got one GOOD hand','i’ve got one good hand'),K76V('Then you may clean the pistols. All of them. There are nineteen.'),N('He lays them out along the kitchen island in a row, with the cloths and the oil. He has just put nineteen firearms in front of the person who swore to kill him, to keep them occupied. You clean every one. Not one of them is loaded, and you check each one twice.')]),
  T95('wv5','“stop walking so loud. i know it’s u”',()=>[K76V('It is so that you know.'),M2('i KNOW. u walk like a hearse','i know. you walk like a hearse'),K76V('Then the shoes are doing their work.'),N('He goes out. You listen to him all the way down the corridor, every step, and you find that your shoulders have come down. You hate the shoes. You would hate it more if he took them off.')])],
 know:[
  T95('kv1','“what’s the date. in the book. for me”',()=>[K76V('There is no date.'),M2('everything in there’s got a date','everything in there has a date'),K76V('Everything else has.'),M2('(he’s not telling me. it’s in there. he’s got it written down and he’s not telling me)','(he’s not telling me. it’s in there. he’s got it written down, and he’s not telling me)')]),
  T95('kv2','“the boots. why”',()=>[K76V('Yours let in water.'),M2('that’s it?','that’s it?'),K76V('What other reason is there for boots?'),N('You do not say it. You need a size for boots. You also need one to cut plastic. He looks at you as if he were waiting for something, and then he looks at the kettle.')]),
  T95('kv3','“do u ever change ur mind. about anyone”',()=>[K76V('I have not had occasion.'),M2('not once. in eleven years','not once, in eleven years?'),K76V('I am careful before I write. It is why I may be firm after.'),M2('(so that’s a no. good. fine. i wasn’t asking for me)','(so that’s a no. good. fine. i wasn’t asking for me)')]),
  T95('kv4','“what’d u do if i just left”',()=>[K76V('I should want to know that you had somewhere to go.'),M2('and then','and then?'),K76V('And then nothing. You are not held here.'),M2('(“then nothing.” he’d know where i was, though. he’d always know where)','(“then nothing.” he’d know where i was, though. he’d always know where)')]),
  T95('kv5','“ur staring”',()=>[K76V('I was not aware of it.'),M2('u do it when u think i’m not looking. like ur measuring something','you do it when you think i’m not looking. like you’re measuring something'),K76V('I am not measuring.'),M2('then what','then what?'),K76V('I do not have the word. You will be told when I have it.'),N('That is either a promise or a threat. You go over it all evening, and you cannot make it come down on one side.')])],
 cold:[
  T95('cv1','“case stuff. that’s all i’m here for”',()=>[K76V('Understood.'),N('He gives you the file across the island. He slides it. A week ago he would have handed it to you.'),M2('(four steps. he’s back to four steps)','(four steps. he’s back to four steps)')]),
  T95('cv2','“how’s the old one. the hip”',()=>[K76V('He does not settle. He goes to the spare room and stands in it.'),M2('tell him i said hi','tell him i said hi'),K76V('I will not. He would look for you.'),N('You had not thought of that. You think of nothing else for the rest of the day: a hound of fourteen, on a bad leg, standing in an empty room.')]),
  T95('cv3','“u still lock it”',()=>[K76V('Yes.'),M2('good','good'),K76V('You still have both bolts on.'),M2('yeah','yeah'),K76V('Good.'),N('It is the most that either of you has said in three days, and all of it was about doors.')]),
  T95('cv4','“about the corridor”',()=>[S.f.e2lRow==='said'?M2('i meant it. what i said','i meant it. what i said'):M2('i should’ve said it. i didn’t. i’m saying i should’ve','i should have said it. i didn’t. i’m saying that i should have'),K76V('I know what was said, and what was not.'),M2('and?','and?'),K76V('And I have no way of testing it that would not cost one of us our life if I were wrong.'),M2('so that’s that','so that’s that'),K76V('It is where I have got to. I have not stopped.')]),
  T95('cv5','“u look like shit”',()=>[K76V('I have not slept.'),M2('u only sleep three and a half hours','you only sleep three and a half hours'),K76V('I have not had them.'),M2('(good. …no. not good. why isn’t that good)','(good. …no. not good. why isn’t that good?)')])]};

/* ===================================== V TALKS TO MISAKI ===================================== */
const K95_M={
 wary:[
  T95('wm1','“Are you sleeping?”',()=>[M2('like a baby','like a baby'),K76V('I can hear you walking.'),M2('then why’d u ask','then why did you ask?'),K76V('To see whether you would tell me.'),M2('…no. i’m not sleeping. happy?','…no. i’m not sleeping. happy?'),K76V('(They told me. It was dragged out of them, and they made it an insult, and they told me.)')]),
  T95('wm2','“Is the hand any better?”',()=>[N('They hold it up. It closes halfway, and shakes. They watch your face while it does, to see what you make of it.'),K76V('It is further than Tuesday.'),M2('u remember tuesday','you remember tuesday?'),K76V('I remember all of them.'),N('They put the hand away. You have said too much, or the wrong thing; with them it is not always possible to tell which.')]),
  T95('wm3','“Do you want your trailer?”',()=>[M2('is that u kicking me out','is that you kicking me out?'),K76V('It is a question.'),M2('bc if ur kicking me out, say so. i’ve been kicked out by better','because if you’re kicking me out, say so. i’ve been kicked out by better'),K76V('I am not. The room is yours for as long as you want it. I asked because nobody had.'),N('They do not answer. They go on eating cereal out of the box, standing up, with their back against the one wall of your kitchen that has no door in it.')]),
  T95('wm4','“What do you want done about them?”',()=>[M2('who','who?'),K76V('The men from the river. I have names.'),M2('…how many','…how many?'),K76V('Four.'),M2('i want the bald one. the rest u can have','i want the bald one. the rest you can have'),K76V('When you can hold the rifle.'),M2('i can hold it NOW','i can hold it now'),K76V('When you can hold it still.'),K76V('(It is the first thing that they have wanted since they came upstairs. I should give them all four, if I thought that it would last.)')]),
  T95('wm5','“You have not insulted me today.”',()=>[M2('it’s only ten','it’s only ten o’clock'),K76V('You had managed three by ten yesterday.'),M2('ur counting my INSULTS','you’re counting my insults?'),K76V('I count everything. I should be concerned if the figure fell.'),M2('ur ugly and ur soup’s bad','you’re ugly and your soup’s bad'),K76V('Thank you.')])],
 know:[
  T95('km1','“Have you had any offers of work?”',()=>[M2('why','why?'),K76V('I am asking.'),M2('couple. nothing good','a couple. nothing good'),K76V('On whom?'),M2('i don’t ask who. that’s ur whole problem with me, remember','i don’t ask who. that’s your whole problem with me, remember?'),K76V('(They did not say that it was not on me. They did not say that it was.)')]),
  T95('km2','“Your rifle is zeroed for a tall man.”',()=>[M2('most men are tall next to me','most men are tall, next to me'),K76V('It is zeroed at chest height, on my lane.'),M2('it’s the only lane u’ve GOT. u hung the targets','it’s the only lane you’ve got. you hung the targets'),K76V('I did.'),M2('so what’s ur point','so what’s your point?'),K76V('I have none. I observed it.'),K76V('(I hung them at my own height, eleven years ago, without a thought. I have had a week in which to think about it.)')]),
  T95('km3','“Do you ever turn a contract down?”',()=>[M2('twice','twice'),K76V('Why?'),M2('one was a kid. one didn’t pay enough','one was a kid. one didn’t pay enough'),K76V('And if one paid enough?'),M2('depends who','depends who'),K76V('On whom would it depend?'),M2('…what’s this about','…what’s this about?'),K76V('Nothing.'),N('They look at you for some time. You have never been a good liar, and they are a person who watches hands.')]),
  T95('km4','“You are careful with me, of late.”',()=>[M2('am not','am not'),K76V('You have stopped throwing things.'),M2('i can start','i can start'),K76V('I had rather that you did. It was easier to read.'),N('They look at you a moment too long. Then they throw a tea towel at your head. It is not convincing, and both of you know it, and you pick it up and fold it.')]),
  T95('km5','“Where do you go, at night?”',()=>[M2('roof','the roof'),K76V('Which?'),M2('urs. i like the deckchair','yours. i like the deckchair'),K76V('With the rifle.'),M2('i take the rifle everywhere','i take the rifle everywhere'),K76V('(From my roof one can see my bedroom window. I know it. I had the sight lines surveyed in the first week, to learn what they could see of me.)')])],
 cold:[
  T95('cm1','“I have the manifest.”',()=>[M2('slide it under','slide it under'),N('You slide it under the trailer door. It is taken from the other side before you have let go of it. They were standing there.'),K76V('(They were at the door before I knocked. They heard the car. I do not know for how many nights they have been listening for it.)')]),
  T95('cm2','“The old hound is not eating.”',()=>[M2('…bring him','…bring him'),K76V('That would be entering your home. It is against the accords.'),M2('the accords are DEAD, v','the accords are dead, v'),K76V('I have kept them regardless.'),N('There is a silence behind the door. Then the lower bolt is drawn, and stops, and is shot again.'),M2('tie him to the step. i’ll come out when ur gone','tie him to the step. i’ll come out when you’re gone')]),
  T95('cm3','“Are both bolts on?”',()=>[M2('why','why?'),K76V('I should prefer to know that they were.'),M2('against who','against who?'),K76V('Against anybody.'),M2('against u','against you'),K76V('Against me also. Yes.'),N('You hear both of them tried, one after the other, from the inside. It is done for your benefit. You find that you are grateful, and that it is like swallowing a stone.')]),
  T95('cm4','“I will not ask you to come back.”',()=>[M2('didn’t think u would','i didn’t think you would'),K76V('I wished you to know that it is not for want of —'),N('You stop. You do not have the end of that sentence in a form that is safe to give them.'),M2('for want of what','for want of what?'),K76V('The room is as you left it.')]),
  T95('cm5','“You are thinner.”',()=>[M2('ur one to talk','you’re one to talk'),K76V('There is food in the house.'),M2('there’s food here','there’s food here'),K76V('There is cereal.'),M2('cereal’s food','cereal is food'),N('When you go, you leave on the step the dish that you brought. It is the thing with the peaches. You do not knock. From the lane you see the door open a hand’s width, and a thin arm come out for it.')])]};

/* ===================================== THE MENU ===================================== */
const K95OPEN={v:{wary:['You may sit. The chair by the window has two ways out behind it.','You are up. I had not expected you before noon.'],know:['You wanted something.','I am listening.'],cold:['You have come about the case.','You may leave the door open. I should prefer it.']},
 m:{wary:['what','what do u want'],know:['what. i’m busy','u need something'],cold:['say it from there','case stuff only']}};
function k95Talk(w,where){const st=k95Stage(),tk='k95tok_'+w;if(S.done[tk]===undefined)S.done[tk]=3;const me=w==='v'?'hitmeuppp':'K9';
 if(S.done[tk]<=0)return say([w==='v'?K76V('That is enough for one day. I have the hounds to see to.'):K76MV('we’re done. go home, grandpa','we’re done for today. go home','We’re done for today. Go home.','We’re done for today. Go home, V.')]);
 const T=(w==='v'?K95_V:K95_M)[st];
 const menu=()=>ask(me,`<span class="hint">${S.done[tk]} things left to say · ${st==='wary'?'out of the infirmary':st==='know'?'neither of you has said it':'since the corridor'}</span>`,
  T.map(t=>({t:t.t,sub:S.talks&&S.talks['k95_'+t.id]?'said ×'+S.talks['k95_'+t.id]:'✦',fn:()=>{S.done[tk]--;S.talks=S.talks||{};S.talks['k95_'+t.id]=(S.talks['k95_'+t.id]||0)+1;save();
   say([w==='v'?K76MV(t.t.slice(1,-1)):K76V(t.t.slice(1,-1))].concat(t.L()).filter(Boolean),()=>{if(S.done[tk]>0)menu()})}})).concat([{t:'Leave',fn:()=>{}}]));
 const ok='k95open_'+w+st;if(S.done[ok])return menu();S.done[ok]=1;save();
 say([w==='v'?K76V(pk(K95OPEN.v[st])):['hitmeuppp',pk(K95OPEN.m[st])]],menu)}
if(typeof convo==='function'){const _convo95=convo;convo=function(w,where){try{if((w==='v'||w==='m')&&k95Stage())return k95Talk(w,where)}catch(e){}return _convo95.apply(this,arguments)}}

/* ===================================== A YEAR ON: TWO MORE ===================================== */
if(typeof K83E!=='undefined'){
 K83E.trailer={t:()=>'The trailer in lot fourteen',lov:m=>[
   N(m?'You have kept the trailer. You pay the four hundred yourself, on the first, in cash, and you will not discuss it.':'They have kept the trailer. They pay the four hundred themselves, on the first, in cash, and it is not to be discussed.'),
   N(m?'Tonight he comes to it. He has never slept in it. He has to fold himself to get through the door, and the bed is a foot too short for him, and his feet hang off the end over the cactus.':'Tonight you go to it. You have not been inside since the morning you fitted the lock. You have to stoop for the door, and the bed is a foot too short.'),
   K76MV('this is where u sat. with the plastic','this is where you sat, with the plastic','This is where you sat, with the plastic.','This is where you sat. With the plastic, at my table, waiting for your hands.'),
   K76V('Yes.'),
   K76MV('and now ur feet are on my cactus','and now your feet are on my cactus','And now your feet are on my cactus.','And now your feet are on my cactus. Life’s weird.'),
   N(m?'You sleep with the pistol under the pillow, on your right side, facing the door. He lies behind you. It is the only place that anybody has ever been allowed to lie.':'They sleep on the right side, facing the door, with the pistol under the pillow. You are behind them. Nobody else has been permitted there. You do not sleep. You lie awake, in a trailer that you once entered to kill them, keeping count of the breaths.')],
  riv:m=>[
   N(m?'Once a year he changes your lock. That is not in the terms. He does it while you are out, and leaves the old one on the step, in two pieces, and no key anywhere.':'Once a year you change their lock, for a better. It is not in the terms. You do it while they are out, and leave the old one on the step, in two pieces. You keep no key.'),
   N(m?'This year you come back early and find him on his knees at your door with a screwdriver.':'This year they come back early, and find you on your knees at their door with a screwdriver.'),
   K76MV('how long would this one take u','how long would this one take you?','How long would this one take you?','How long would this one take you? To get through.'),
   K76V('Six minutes.'),
   K76MV('last one was four','the last one was four','The last one was four.','The last one was four. You’re getting slower.'),
   K76V('The lock is better. I chose it for that.'),
   N(m?'He finishes the last screw and stands up, and backs off the step, his four paces, before he turns. You go in and shoot both bolts. Then you stand with your hand flat on the inside of the door until you hear the car.':'You finish the last screw and stand, and back off the step, four paces, before you turn. You hear both bolts go across. You sit in the car at the end of the lane for an hour. It is not in the terms. Nothing in them forbids it.')]};
 K83E.number={t:()=>'The number on Ronin’s fridge',lov:m=>[
   N('The whiteboard is still on Ronin’s fridge. THE WAR has been wiped off it. In its place there is one number, in red, that he changes every morning.'),
   [RN,'Days nobody in this server tried to kill nobody else in it. Three hundred and ninety-one.'],
   K76MV('that’s since the boat','that’s since the boat','That’s since the boat.','That’s since the boat. You’ve been counting.'),
   [RN,'Since the boat. I ain’t countin’ the mat, or that thing with the pistol in the bedroom, that’s you two bein’ fuckin’ weird.'],
   K76V('It is not an attempt if neither party objects.'),
   [RN,'Don’t tell me what it is. I don’t wanna know what it is.'],
   N(m?'He changes it to three hundred and ninety-two while you are standing there, a day early, and dares either of you to say anything.':'He changes it to three hundred and ninety-two while you are standing there, a day early, and dares either of you to remark on it.')],
  riv:m=>[
   N('The whiteboard is still on Ronin’s fridge. THE WAR is still written across the top. Under it there is one number, in red, that he changes every morning.'),
   [RN,'Three hundred and ninety-one. Days neither of you’s tried it.'],
   K76MV('we’ve got terms','we’ve got terms','We’ve got terms.','We’ve got terms, Ronin. It’s all written down.'),
   [RN,'Yeah. I read your terms. “Unless the other one moves.” I check this fuckin’ board every mornin’ before I check the news.'],
   K76V('Neither of us has moved.'),
   [RN,'I know. That’s what gets me. It’s the same number I’d have if you two was — forget it. It’s the same number.'],
   N(m?'He does not finish. You do not look at V, and V does not look at you, and both of you look at the number.':'He does not finish. You do not look at them, and they do not look at you. You both look at the number.')]}}

/* ===================================== MORNINGS (shared cap) ===================================== */
const K95MORN=[
 {id:'m95_rent',when:()=>S.phase==='after'&&typeof kdPost==='function'&&kdPost()&&k73Done('e2l_after'),run:done=>say(k76M()?[
   N('It is the first of the month. You know, because you have known the first of the month since you were sixteen, in your stomach, before you were awake.'),
   N('Four hundred. You have ninety, and a hand in plaster. You ring the landlord to ask for a week.'),
   N('He tells you that it is paid. Through to the spring. A man came, in a long coat, with an envelope, and would not give a name.'),
   K76MV('u PAID MY RENT','you paid my rent?','You paid my rent?','You paid my rent? Through to the spring?'),
   K76V('I did.'),
   K76MV('i don’t take charity off a guy who’s got me in a book','i don’t take charity from a guy who’s got me in a book','I don’t take charity from a guy who’s got me in a book.','I don’t take charity from a man who’s got my name in a book to be killed.'),
   K76V('It is not charity. A debtor’s property is kept in order until the debt is collected. It is ordinary practice.'),
   K76MV('(he’s keeping my trailer nice so there’s something to collect FROM. that’s the worst reason anyone’s ever done something kind)','(he’s keeping my trailer nice so that there’s something to collect from. that’s the worst reason anybody’s ever had for being kind)','(He’s keeping my trailer nice so that there’s something to collect from. That’s the worst reason anybody’s ever had for being kind.)','(He’s keeping my trailer in order so that there’s something to collect from. That’s the worst reason anybody has ever had for being kind.)')]:[
   N('It is the first of the month. You know what that date is to them. It is in the file: rent, four hundred, and the hour at which they begin to look at the door.'),
   N('You paid it a fortnight ago. Through to the spring, in cash, without a name. You did it on the second day that they were gone, when there was nothing else within your reach that you could do.'),
   K76MV('u PAID MY RENT','you paid my rent?','You paid my rent?','You paid my rent? Through to the spring?'),
   K76V('I did.'),
   K76MV('i don’t take charity off a guy who’s got me in a book','i don’t take charity from a guy who’s got me in a book','I don’t take charity from a guy who’s got me in a book.','I don’t take charity from a man who’s got my name in a book to be killed.'),
   K76V('It is not charity. A debtor’s property is kept in order until the debt is collected. It is ordinary practice.'),
   K76V('(It is the only account of it that they would accept. I had it ready. I do not think that it is true.)')],done)},
 {id:'m95_coffee',when:()=>S.phase==='act2'&&k73Done('e2l_car')&&!k73Done('e2l_row'),run:done=>say(k76M()?[
   N('There is a cup of coffee on the floor outside the spare room, with a saucer over it to keep it hot.'),
   N('There is a note under the saucer, in fountain pen. “It is not poisoned. —K9.”'),
   N('In the first week he left one at the foot of the water tower that said the opposite. You drank that one to find out.'),
   K76MV('(so which one was the lie)','(so which one was the lie?)','(So which one was the lie?)','(So which of the two was the lie?)'),
   N('You stand over it for a while in your socks. Then you drink it. It is very good coffee. It is exactly how you take it, and you have never told him how you take it.')]:[
   N('You leave a cup of coffee on the floor outside the spare room at seven, with a saucer over it.'),
   N('You write a note for it. In the first week you left them one at the foot of the water tower that read “It is poisoned.” It was a joke, of a kind. You were pleased with it.'),
   N('You write: “It is not poisoned. —K9.” You look at it. A man who meant to poison them would write precisely that.'),
   K76V('(There is no form of words by which I can tell them that a thing is safe. I have used all of them up, in the other direction.)'),
   N('You leave the note. At eight the cup is outside the door again, empty, with the note folded under it. They have written on the back: “prove it.” You stand in the corridor with it for some time.')],done)}];
const _me95=morningEvent;morningEvent=function(done){try{if(S&&K95()&&!S.f.e2lEnd&&!(S.kd&&S.kd.med)&&S.f.e2lMornDay!==S.day&&mbOk()){
  const e=K95MORN.find(x=>!S.seen[x.id]&&x.when());if(e){S.seen[e.id]=1;S.f.e2lMornDay=S.day;mbUse();save();k77Go('#0a0a0d');return e.run(()=>_me95(done))}}}catch(e){}return _me95(done)};

/* ===================================== ENDINGS ===================================== */
const _xe95=extraEnding;extraEnding=function(){const L=_xe95();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,E=f.e2l83||{},n=Object.keys(S.talks||{}).filter(k=>/^k95_/.test(k)).length;
 if(S.seen.m95_rent)L.push('V paid Misaki’s rent through to the spring while they were missing. He called it keeping a debtor’s property in order. He does not think that was true.');
 if(S.seen.m95_coffee)L.push('“It is not poisoned. —K9.” “prove it.”');
 if(E.trailer)L.push(f.e2lEnd==='lovers'?'V has slept in the trailer where he once sat with a roll of sheeting. The bed is a foot too short for him.':'Once a year V fits a better lock on Misaki’s trailer and keeps no key. The last one would take him six minutes.');
 if(E.number)L.push('Ronin keeps one number on his fridge: days nobody in the server has tried to kill anybody else in it.');
 if(n>=12)L.push('Between the infirmary and the Constance they talked about a great deal: the pistols, the boots, the rent, the bolts. The one thing went unsaid.')}catch(e){}return L};
/* ===KC95-END=== */
