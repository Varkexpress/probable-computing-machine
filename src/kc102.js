/* ===KC102-BEGIN=== */
/* ===================== THE WAR: WHAT THEY ARE BAD AT (kc102) =====================
   The author asked that neither of them be perfect (or that they are, and must be, in everything but emotionally),
   and for Misaki to have more anger; then, that the anger be a seething one, not a physical outburst, because that
   is more destructive. Needs kc73, kc76–kc101.
   Both of them are flawless at the work, because in their work one mistake is the end. Neither has the least idea
   what to do with a feeling. V makes arrangements, quotes figures and leaves the room. Misaki goes cold: silence,
   perfect manners, the one exact sentence that cuts, a ledger of their own. Nothing is thrown. Nothing is broken
   that can be swept up. Each fails the other exactly where the other needs it, and knows it, and does it again.
   kc103 follows from this: the people they froze out did not go.
   1. THE INFIRMARY. Fourteen scenes in kc85's pool (now 195).
        Misaki, cell (at the man they think holds them):  s_tray  s_scream  s_bite
        Misaki, clear:  s_wreck  s_ronin  s_debt  s_four  s_pity
        V (perfect hands; no idea):  s_figure  s_letter  s_wrong  s_board  s_bitten  s_steady
   2. MORNINGS (shared cap, after the route's other mornings): one round an hour; a perfect job, and the car home;
      sorry, in two languages.
   3. THE WORST ROUTE: two more daily scenes for kc97, both about the anger.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via M2 and they/them.
   Notes: docs/notes_kc102.md. Tested in tools/k86_test.js and tools/k102_test.js. */
const K102=()=>{try{return typeof K101==='function'&&K101()}catch(e){return false}};

/* ===================================== MISAKI, CELL ===================================== */
k86('s_tray','m',null,'cell','Look at him while you eat',[
 N('He sets the tray down. You do not thank him. You do not do anything. You pick up the spoon and eat, and you look at him while you do it, without blinking, the whole bowl.'),
 N('You look at him as you look at a man through a scope at six hundred metres, for an hour, while he eats his lunch and does not know. Where the collar sits. How he holds his weight. Which knee he favours on the stair. You let him see you doing it.'),
 M2('(eat ur soup, misaki. look at the man. write it down)','(eat your soup. look at the man. write it down)'),
 N('He holds it for about a minute. Then his eyes go to the drip, and to the wall, and to his own hands. He has looked down rifles at the worst people in the city. He cannot hold your eye over a bowl of soup.'),
 N('You finish. You put the spoon in the bowl without a sound. You go on looking at him until he goes out, and after the door shuts you go on looking at the place where he was.'),
 M2('(that’s one. i’ve got all day. i’ve got every day u give me)','(that’s one. i have all day. i have every day that you give me)')]);
k86('s_scream','m',null,'cell','Stop speaking',[
 N('You decide it on the fourth morning, and it is not fear. You simply stop speaking to him.'),
 N('Not the good voice. Not yes, not no. He comes in and says the day of the week, and you look at the wall. He says that he is going to do the wrist, and you hold it out, and look at the wall. He asks you a question, and waits, and you let it go on waiting until he gives up and goes.'),
 M2('(he wants something from me. everybody in here wants something from me. he can have NOTHING)','(he wants something from me. everybody in here wants something from me. he can have nothing)'),
 N('It is as violent a thing as you can do, lying down, with one hand. You feel it land on him every time. He talks more. He reads out the labels on the bottles. On the second day he reads the weather report from the paper, every word, to a person facing a wall.'),
 N('On the third day he stops. He comes in, and does the wrist, and goes out, and says nothing either, and the room is so quiet that you can hear the drip.'),
 M2('(good. GOOD. now u know what it’s like in here)','(good. now you know what it is like in here)'),
 N('You lie and listen to the drip, and to nobody, and it is as bad as you meant it to be, for both of you.')]);
k86('s_bite','m',null,'cell','Keep an account',[
 N('If he can keep a book on you, you can keep one on him.'),
 N('You do it on the wall behind the bed frame, with the spoon handle, small. A mark for every time he touches you. A mark for every door he shuts. A mark for every “you need not be afraid,” and he has said that one eleven times, in that voice, as if it were medicine.'),
 M2('(eleven. that’s eleven i owe u. i pay everything back. ask anyone)','(eleven. that’s eleven i owe you. i pay everything back. ask anybody)'),
 N('You are calm about it, which is new. In April you were loud; you threw things, you wanted him to see you coming. This is quiet, and exact, and it does not need him to see it at all.'),
 N('When he changes the sheet he finds it. He looks at the wall, at the little rows of marks, in fours, crossed through. He does not ask what they are. He knows a ledger when he sees one.'),
 N('He leaves it. That night there is a new mark on the wall in a different hand, a neat one, in pencil, at the end of the last row. You lie and look at it until the light changes, and you cannot work out whether he has added to his debt or paid one off.')]);

/* ===================================== MISAKI, CLEAR ===================================== */
k86('s_wreck','m',null,'clear','Be polite to him',[
 N('You are clear. You know whose room it is and who carried you into it and what that cost him and what it costs you. And on the second clear morning it arrives, all of it, like a bill.'),
 N('You do not shout. You have gone very still and very cold, and that you can see everything with great clarity, as you can on a roof just before.'),
 N('When he brings the tray you say, “Thank you, V.”'),
 N('Not “ur honour”. Not “moneybags”. His name, in full, in a clean voice, as you would thank a waiter in a hotel you were going to rob.'),
 K76V('…You are welcome.'),
 N('You keep it up all day. Please, and thank you, and V. You fold the napkin. You ask after the hounds. You are perfect. You watch it go into him like a cold blade, slowly, all the way, and you do not stop.'),
 M2('(u wanted me polite. down there. u wanted me well. here i am. well and polite. enjoy)','(you wanted me polite. you wanted me well. here i am. well, and polite. enjoy)'),
 N('In the evening he stops in the doorway and says your name, once, as a question. You say “Yes, V?” and smile, with your whole face, and he goes away. You have never in your life hurt anybody so much without touching them. It feels like nothing at all.')]);
k86('s_ronin','m',null,'clear','Two streets',[
 N('Ronin tells you about the second night. He was two streets over. He did not know. He tells it to you like a confession, with his rings going round on his fingers.'),
 N('You do not shout at him. You want to. It comes up in you, white, all the way to your teeth, and you hold it there until it goes cold.'),
 M2('two streets','two streets'),
 [RN,'Yeah.'],
 M2('it’s fine','it’s fine'),
 N('You say it in the voice that means it will never be fine. You know how it sounds. You have heard clients use it to men who did not live to the end of the week.'),
 N('He looks at you. He would rather you hit him; you can see it in his face. He sits there backwards on his chair and waits for the rest, and there is no rest. You pick up a magazine.'),
 N('He goes at five. He says he will come tomorrow. You say, “Sure,” without looking up. You hear him stop outside the door, and stand there, and go. It was easy. You have never done a thing to anybody that was so easy and went so deep.')]);
k86('s_debt','m',null,'clear','“You had no right”',[
 N('You have been working on it for two days. When he comes in you say it low, so that he has to stop and listen.'),
 M2('u had no right','you had no right'),
 K76V('To what?'),
 M2('to come. now i owe u. u know what i am. i’ve never owed anybody anything. u made sure i will for the rest of my life','to come. now i owe you. you know what i am. i have never owed anybody anything. you made sure i will for the rest of my life'),
 N('He looks at you. He is working out what to say; you can see him go through the files.'),
 K76V('I have entered it. It is on your page. It may be set against the doorman, if you wish to think of it so.'),
 N('He means it to be kind. He has made the river into a line in a book, a credit, so that you can pay it off and it does not have to be anything.'),
 M2('ok','ok'),
 N('That is all you say. You say “ok” and turn your face to the wall, and you do not say anything else to him for six days. Not a word. Not cruel ones, not good ones. He comes in and goes out and you are a wall.'),
 N('You know what you are doing to the only one who came. You do it anyway, every day, with great care, and you lie awake at night amazed at yourself, and cannot stop.')]);
k86('s_four','m',null,'clear','The four',[
 N('You go through the four. You do it at night, for hours, with complete calm, as you would plan any job.'),
 N('The bald one first, because he laughed. You have it to the minute and you do it again with improvements. The one with the boot. The driver, for looking away. The one who kept the books.'),
 M2('(i’m gonna make it last. i never make it last. that was always HIS thing. it’s gonna be my thing now)','(i’m going to make it last. i never make it last. that was always his thing. it’s going to be my thing now)'),
 N('It does not make you hot. In April a man who stiffed you on a fee would have you up all night shaking. This is cold. It is very orderly. You could do any of them tomorrow and sleep afterwards like a stone.'),
 N('Then, at four, it turns round on you, as it always does at four. You walked past the van. Three days. You, who count the exits in a public toilet.'),
 M2('(so add one. five. the fifth one walked past the van. u know where the fifth one sleeps)','(so add one. five. the fifth walked past the van. you know where the fifth one sleeps)'),
 N('You plan the fifth with the same care. The cold does not mind which one it is.')]);
k86('s_pity','m',null,'clear','Angel’s face',[
 N('Angel comes in and her face does the thing. Soft. Wet at the edges. The face for a dog with three legs.'),
 N('You do not throw her out. You look at her, steadily, until the face starts to fail at the corners. Then you say it, quite pleasantly.'),
 M2('u should do this face on stream. ur numbers are down','you should do this face on stream. your numbers are down'),
 N('It is accurate. You read her analytics; she showed you once, laughing, on her phone. You knew where it would go and you put it there.'),
 N('She goes white. She says “okay,” very lightly, and gets up, and goes out, and the door shuts carefully behind her.'),
 N('You wanted her to stay. You did it anyway. You have done it to every person who was ever kind to you since you were nine.'),
 N('Ten minutes later the door opens. She has done her face: the eyeliner, the lips, the smile she does for the camera. It is a mask, and it is perfect, and she has put it on for you.'),
 [AN,'better?'],
 M2('…yeah','…yeah'),
 N('She sits down and does your nails. Her hands shake the whole time behind the perfect face. You watch them and say nothing, because you have just found out that she will come back, and you do not know what to do with it.')]);

/* ===================================== V: PERFECT HANDS ===================================== */
k86('s_figure','v',null,null,'“am i gonna be ok”',[
 N('You close the wound in eleven stitches. They are perfect. You could rule a line along them. You have closed a thousand wounds and you have never closed one better.'),
 K76MV('am i gonna be ok','am i going to be ok?','Am I going to be ok?','Am I going to be ok? Tell me straight.'),
 N('They have never asked you anything in that voice. Small, and level, and not a joke.'),
 K76V('Fractures of that kind recover full function in about eighty percent of cases, given compliance with the exercises.'),
 N('You hear it as you say it. A figure. They asked you a question that a person asks a person, and you gave them a figure.'),
 N('They look at you. Then they look at the ceiling, and you watch them put the question away somewhere, carefully, where they will not ask it again, of anybody.'),
 K76V('(I know the answer to the question that they asked. It is “I do not know, and I am here.” I could not get it past my teeth.)'),
 N('You tie off the last stitch. It is perfect. You go up to the study and sit with your hands on the desk, the best hands in the city, and you would trade them both for one sentence that you could not say.')]);
k86('s_letter','v',null,null,'The letter',[
 N('You write it down. It is what you do with anything you cannot say: you write it, in full, in good ink, and then you know where you stand.'),
 N('It takes three drafts. The first is too long. The second is a list of their injuries, which you notice only at the end. The third is right. It says the river, and the four days, and what you did on the stair at the end of the second, and the other thing, the thing with no heading.'),
 N('It is perfect. You have never written anything so exactly true.'),
 K76V('(I could slide it under the door. They would read it. They read everything; they read my ledger when my back is turned.)'),
 N('You put it in the stove. You watch it go, all three sheets, from the edges in.'),
 N('In the morning they are polite to you all through breakfast, and you are correct in return, and neither of you lands a single thing that you meant. The letter was the best thing you have ever made, and it is ash, and you burned it on purpose, with steady hands.')]);
k86('s_wrong','v',null,null,'They are crying',[
 N('You come in with the tray and they are crying. Not loudly. With their face to the wall and their shoulders going.'),
 N('You stop at four steps. You put your hands behind your back, which is what you do when you do not know what to do with them.'),
 N('You know how to quiet a hound. You sit on the floor. You do not look at it. You breathe slowly, until it breathes with you. It takes hours, and it works.'),
 K76V('(This is not a hound. If I sit on their floor they will think it a method. They will be right. It is the only one I have.)'),
 N('So you do nothing. You stand there at four steps with your hands behind your back, for a full minute, while they cry at a wall.'),
 N('Then you put the tray down and leave. You know as you turn that it is the wrong thing. You go out anyway and close the door on it with no sound at all, so that it will not have been anything.'),
 N('You stand in the passage. Through the door it stops, after a while.')]);
k86('s_board','v',null,null,'The board-meeting voice',[
 N('When you are frightened you become very correct. It is the voice you used for the board on the morning after your father died, and at his funeral, and on the telephone to Hale the night they were taken.'),
 N('You are using it now. You are standing at the end of their bed, reading them the plan for the week: physio at ten, films on Thursday, the stitches out on the fourteenth.'),
 K76MV('stop it','stop it','Stop it.','Stop it, V.'),
 K76V('I beg your pardon?'),
 K76MV('talk to me like a person','talk to me like a person','Talk to me like a person.','Talk to me like a person.'),
 N('You open your mouth. What comes out is: “The stitches will come out on the fourteenth.”'),
 N('They look at you. Then they smile, very pleasantly, and fold their hands on the blanket.'),
 K76MV('thank u, V. that’s very clear','thank you, v. that’s very clear','Thank you, V. That’s very clear.','Thank you, V. That’s very clear.'),
 N('They have answered you in your own voice. They are perfect at it. You stand there holding the chart, and you understand that you have taught them this, the coldest thing you own, and that they are going to use it on you for as long as you keep using it on them.')]);
k86('s_bitten','v',null,null,'They have stopped speaking',[
 N('They have stopped speaking to you. Not the good voice; nothing. You say the day of the week and they look at the wall.'),
 N('You know what it is. You have done it yourself, to the board, to your father, for a whole winter when you were fifteen. It is a sentence, served on the other party, and it has no date on it.'),
 N('You talk to fill it. You read them the labels on the bottles. On the second day you read the weather from the paper, every word, to the back of a head. You can hear how you sound.'),
 K76V('(I have had men on the table refuse to speak to me. It never troubled me. They spoke in the end.)'),
 N('On the third day you stop. You come in and do the wrist and go out, and say nothing either. It is worse, and you had not known that it could be.'),
 N('You enter it on their page, since you enter everything: “Day 3. Nothing said.” You look at it, and see that you have written it as a charge against them, and that it is not. You leave it. You have no other way of writing things down.')]);
k86('s_steady','v',null,null,'Your hands do not shake',[
 N('Your hands do not shake. They have never shaken. It was the first thing your masters at school noticed, and the first thing the board noticed, and it is the last thing that every one of the forty-one saw.'),
 N('You set the fingers. You strap the ribs. You draw blood and change the bag and take the films, and your hands are perfect, every time, in that room.'),
 N('Outside the room, in the passage, at night, you sit on the floor with your back to their door, and they do not shake either. Nothing shakes. Nothing comes out.'),
 K76V('(If I could weep I should know where I stood. I have watched people do it on my table and envied them the relief. I was not built for it. I was built for the other thing, by a man who needed me to be.)'),
 N('You sit until it is light, perfectly steady, perfectly dry, and feel the whole of it go round inside you with nowhere to get out, like a wasp in a jar.')]);

/* ===================================== MORNINGS ===================================== */
const K102MORN=[
 {id:'m102_job',when:()=>S.phase==='act2'&&k73Done('e2l_car')&&!k73Done('e2l_row'),run:done=>say([
   N('The job is perfect. A man who owned the building that burned with eleven people in it. Six hundred metres, a moving car, rain.'),
   N(k76M()?'You call it. He takes it. One round. The car rolls to a stop against a bollard as if it had decided to park. You are off the roof and in his car in ninety seconds, and nobody in the street has worked out that anything happened.':'They call it. You take it. One round. The car rolls to a stop against a bollard as if it had decided to park. You are off the roof and in the car in ninety seconds, and nobody in the street has worked out that anything happened.'),
   N('It is the best piece of work that either of you has ever been part of, and in the car neither of you says so.'),
   N(k76M()?'You try. You get as far as “hey” and stop. He looks at you. He opens his mouth and shuts it. Then nobody speaks for the forty minutes home. By the end the air in the car has gone hard and cold, and you are both angry, and could not say at what.':'They begin something. “hey.” It stops. You open your mouth, and close it. Then nobody speaks for the forty minutes home. By the end the air in the car has gone hard and cold, and you are both angry, and could not say at what.'),
   K76MV('(we did it PERFECT. and i can’t even say “good shot.” what is WRONG with us)','(we did it perfectly. and i can’t even say “good shot.” what is wrong with us?)','(We did it perfectly, and I can’t even say “good shot.” What is wrong with us?)','(We did it perfectly, and I can’t even say “good shot” to him. What is wrong with us?)')],done)},
 {id:'m102_sorry',when:()=>S.phase==='act3'&&k73Done('e2l_row')&&!S.f.e2lEnd,run:done=>say(k76M()?[
   N('After the corridor you try to say sorry. You do it the only way you know.'),
   N('At four in the morning you shoot the stone ball off the top of his left gatepost from three hundred metres. Clean. It drops into the drive. It is the best shot you have made since the hand.'),
   M2('(that means sorry. he’ll get it. that’s the clearest sorry i’ve got)','(that means sorry. he’ll get it. that’s the clearest sorry that i have)'),
   N('In the morning there is a reply. He has had the stone ball put back on the post, and on top of it there is a second, smaller ball, of the same stone, carved, very fine.'),
   N('You look at it through the scope. It is beautiful. You have no idea what it means. You are fairly sure that he has no idea what yours meant, and that both of you have just said sorry at enormous expense, and that neither of you heard it.')]:[
   N('After the corridor you try to say sorry. You do it the only way you know.'),
   N('You write it in the ledger, on their page, in the column for the total: “Owed: an apology. By me.” You leave the book open on the desk at that page, with the study window unlatched.'),
   N('At four the stone ball comes off your left gatepost. A rifle, from three hundred metres. Clean.'),
   K76V('(It is a reply. It is a better shot than any they have made since the hand. I do not know whether it says “accepted” or “go to hell.”)'),
   N('You have the ball put back, and a second carved to sit on top of it, which is as near as you can come to saying that you heard. The next night the window is shut, and the ledger has not been touched, and you understand that they never came in. They answered a page that they had not read, and you replied to a shot that perhaps was not a reply at all.')],done)},
 {id:'m102_range',when:()=>['after','act2'].includes(S.phase)&&k73Done('e2l_door')&&!S.f.e2lEnd,run:done=>say(k76M()?[
   N('You go down to his range with the pistol and one box, at six in the morning, and you fire one round. Then you sit on the bench and wait an hour, and fire another.'),
   N('All day. Every round in the black, exactly, one on top of another, until the centre of the paper is a single ragged hole. You do not say anything. You do not feel anything that you would call anything. You are very, very calm.'),
   M2('(the four. the van. the bed. the soup. him. one an hour. i can do this for years)','(the four. the van. the bed. the soup. him. one an hour. i can do this for years)'),
   N('He is behind the line from the third hour. He does not tell you to stop. He does not ask what it is for. At about two he comes forward and puts one round on the bench beside you, a single cartridge, and steps back.'),
   N('You load it. You fire it, on the hour, into the same hole. Nobody speaks until the light in the stairwell goes off on its timer at nine, and then you go up, and he goes up, by different stairs.')]:[
   N('They go down to the range at six with one box. You hear the first shot from the study. An hour later, the second.'),
   N('All day, one round an hour, every one into the same hole. They do not speak. They sit on the bench between rounds with their hands on their knees, perfectly still. You have seen them put a round past your ear in front of a hundred and forty people, and this frightens you more.'),
   K76V('(I could stop them. I could say a sentence. I have none that would not be an order or a figure.)'),
   N('At two you go forward and put one round on the bench beside them, a single cartridge, and step back. It is all that you know how to give: one more of the thing that is hurting them, because they are asking for it.'),
   N('They fire it on the hour into the same hole. Nobody speaks until the stairwell light goes off at nine. You go up by the front stair, and they by the back, and in the morning the target is in your study, folded, on the desk, with nothing written on it.')],done)}];
const _me102=morningEvent;morningEvent=function(done){try{if(S&&K102()&&!(S.kd&&S.kd.med)&&!(typeof k101Pending==='function'&&k101Pending())&&S.f.e2lMornDay!==S.day&&typeof mbOk==='function'&&mbOk()){
  const e=K102MORN.find(x=>!S.seen[x.id]&&x.when());if(e){S.seen[e.id]=1;S.f.e2lMornDay=S.day;mbUse();save();go(cutBg('#0b0a0c'));return e.run(()=>_me102(done))}}}catch(e){}return _me102(done)};

/* ===================================== THE WORST ROUTE ===================================== */
if(typeof K97_MIND!=='undefined'){
 K97_MIND.fray.push([N('You wake up angry. Not at him; at all of it. It is the first thing you have felt in two days and you grab it with both hands.'),
  M2('(GOOD. good. stay angry. angry gets up. angry eats. angry kills four guys and a van)','(good. good. stay angry. angry gets up. angry eats. angry kills four men and a van)'),
  N('You hold on to it all morning, lying very still, hating the tray, the light, the green dot, the drain, one at a time, thoroughly. It is wonderful. By noon it has gone grey at the edges, like a coal, and you blow on it, and blow on it, and it goes out anyway.')]);
 K97_MIND.thin.push([N('You try to make yourself angry. You go through the four on purpose, the bald one, the van, the way the driver looked away. You used to be able to light a whole day off the driver.'),
  N('Nothing catches. You know they deserve it. You cannot feel that they do.'),
  M2('(u used to be so ANGRY. it was the best thing about u. where did it go)','(you used to be so angry. it was the best thing about you. where did it go?)'),
  N('You lie there and miss your own temper the way you would miss a dog.')])}

/* ===================================== ENDINGS ===================================== */
const _xe102=extraEnding;extraEnding=function(){const L=_xe102();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const F=S.f.e2l85||{};
 if(F.s_wreck)L.push('On the second clear morning Misaki thanked V by name, perfectly, all day. They had never hurt anybody so badly, and they did not touch him.');
 if(F.s_debt)L.push('“you had no right.” V entered the river on Misaki’s page, as a credit, to be kind. Misaki said “ok,” and nothing else for six days.');
 if(F.s_figure)L.push('Misaki asked V whether they would be all right. He gave them a figure.');
 if(F.s_letter)L.push('V wrote Misaki a letter in the infirmary, three drafts. It is the most exactly true thing he has written. He burned it.');
 if(F.s_bite)L.push('There are tally marks on the infirmary wall behind the bed, in fours. At the end of the last row there is one more, in pencil, in a neat hand.');
 if(S.seen.m102_sorry)L.push('After the corridor they apologised to each other: a shot and a carved stone ball. Neither understood the other.');
 if(S.seen.m102_range)L.push('Misaki once spent a day on V’s range firing one round an hour into the same hole. He brought the last round down himself.')}catch(e){}return L};
/* ===KC102-END=== */
