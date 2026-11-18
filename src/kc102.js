/* ===KC102-BEGIN=== */
/* ===================== THE WAR: WHAT THEY ARE BAD AT (kc102) =====================
   The author asked for more of the sadness, for it to be clearer that neither of them is perfect (or that they are,
   and must be, in everything but emotionally), and for Misaki to have more anger. Needs kc73, kc76–kc101.
   Both of them are flawless at the work, because in their work one mistake is the end. Neither has the least idea
   what to do with a feeling. V makes arrangements, quotes figures and leaves the room. Misaki throws things, picks
   the fight, and will not be helped. Each fails the other exactly where the other needs it, and knows it, and does
   it again.
   1. THE INFIRMARY. Fourteen scenes in kc85's pool (now 195).
        Misaki, cell (anger at the man they think holds them):  s_tray  s_scream  s_bite
        Misaki, clear (anger):  s_wreck  s_ronin  s_debt  s_four  s_pity
        V (perfect hands; no idea):  s_figure  s_letter  s_wrong  s_board  s_bitten  s_steady
   2. MORNINGS (shared cap, after the route's other mornings): a perfect job, and the car home; sorry, in two
      languages; the range, two hundred rounds.
   3. THE WORST ROUTE: two more daily scenes for kc97, both anger.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via M2 and they/them.
   Notes: docs/notes_kc102.md. Tested in tools/k86_test.js and tools/k102_test.js. */
const K102=()=>{try{return typeof K101==='function'&&K101()}catch(e){return false}};

/* ===================================== MISAKI, CELL: ANGER ===================================== */
k86('s_tray','m',null,'cell','Throw the tray',[
 N('He sets the tray down. You have been lying here for an hour building it up, like pressure in a pipe, and you do not even decide. The good hand goes out and the tray goes at him, bowl and spoon and all, as hard as you can throw a thing lying down.'),
 N('It misses his head. It hits the wall. Soup goes up the tile in a fan.'),
 M2('GO ON. go on, then. do it. u’ve been looking at me like a fucking SIDE OF BEEF for a week. DO IT','go on. go on, then. do it. you’ve been looking at me like a side of beef for a week. do it'),
 N('He does not do it. He looks at the wall. Then he gets a cloth and a bucket and he cleans it, all of it, every drop, on his knees, with his back to you, while you call him every name you have.'),
 M2('(don’t CLEAN it. u don’t get to clean it. hit me. at least then i’d know what u are)','(don’t clean it. you don’t get to clean it. hit me. at least then i’d know what you are)'),
 N('He brings another tray. The same soup. He puts it down a step further off, and goes. You are so angry that you are shaking, and you eat it, because you are starving, and you hate him for every mouthful.')]);
k86('s_scream','m',null,'cell','Scream at the door',[
 N('The light does not go off. The door does not open. Nobody comes and does anything. It has been like that for days, and something in you comes loose.'),
 N('You scream at the door. Not words, at first. Then words. Every name you have for him and some that you make up. What you will do to him, in order, with what. What you will do to the four. What you will do to the city, to the river, to the man in the van, to the landlord.'),
 M2('COME IN. COME IN AND DO IT. U COWARD. U FUCKING RICH COWARD. COME IN','come in. come in and do it. you coward. you rich fucking coward. come in'),
 N('Your voice goes after about an hour. It goes ragged and then it goes, and you are left sitting up in the bed with your mouth open and no sound coming out of it.'),
 N('Through the door, very close, somebody has been sitting on the floor the whole time. You can hear him get up. His knees crack. He walks away down the passage, loudly, and does not come in.'),
 M2('(he listened to all of it. he sat there and LISTENED. like it was the radio)','(he listened to all of it. he sat there and listened. as if it were the radio)')]);
k86('s_bite','m',null,'cell','Bite him',[
 N('He is doing the wrist. His hand is right there, across your face, holding the dressing flat.'),
 N('You bite it. The meat of the thumb, as hard as your jaw will close, with the bad tooth and all. You taste it straight away.'),
 N('He does not pull away. That is the worst of it. He holds still, with your teeth in his hand, and finishes taping the dressing with the other one, slowly, and only then does he take the hand back.'),
 M2('(that’s what u get. that’s what u fucking GET)','(that’s what you get. that’s what you fucking get)'),
 N('There is blood on your lip. His. He looks at the hand, and at you, and he nods, once, as if you had told him the time.'),
 N('He wraps the thumb in his handkerchief and goes out. You lie there with his blood in your mouth and the only good feeling that you have had in that room. It lasts about a minute. Then you are sick into the pan, and that is his fault too.')]);

/* ===================================== MISAKI, CLEAR: ANGER ===================================== */
k86('s_wreck','m',null,'clear','Wreck the room',[
 N('You are clear. You know where you are. You know whose room it is and what it is for and who carried you into it. And on the second clear morning it all arrives at once, like a bill.'),
 N('You put your good arm along the counter and sweep it. Bottles, dishes, the clipboard, the frog toothbrush, everything, onto the tile. You kick the drip stand over. You get the lamp off its arm with both hands, the bad one too, screaming at the hand, and put it through the glass panel in the door.'),
 M2('(break it. break all of it. it’s HIS. everything in here is his)','(break it. break all of it. it’s his. everything in here is his)'),
 N('He is in the doorway. He came at the first crash. He stands there with the glass round his shoes and watches, and he does not come in.'),
 N('When there is nothing left to break you sit down on the floor in it. You are bleeding from somewhere. You are crying, which you did not agree to.'),
 N('He still does not come in. You can see him not know what to do. The most competent man in the city, and his hands hang there at his sides, and he looks at the broken door as if it might tell him.'),
 M2('(come in. say something. say ANYTHING. u always have something to say)','(come in. say something. say anything. you always have something to say)'),
 K76V('I shall have the glass replaced.'),
 N('He goes. You sit in the wreck of his room and laugh until it turns into the other thing. It is the most wrong thing that anybody has ever said to you, and you know that he knew it as he said it.')]);
k86('s_ronin','m',null,'clear','Shout at Ronin',[
 N('Ronin tells you about the second night. He was two streets over. He did not know. He tells it to you as if it were a confession, with his rings going round on his fingers.'),
 N('And something in you goes white.'),
 M2('TWO STREETS. u were two STREETS. u were having a fucking CIGARETTE two streets away while they —','two streets. you were two streets away. you were having a fucking cigarette two streets away while they —'),
 [RN,'I know, kid.'],
 M2('DON’T “kid” me. u find people. that’s ur WHOLE THING. u find guys in skips. u couldn’t find ME','don’t “kid” me. you find people. that’s your whole thing. you find men in skips. you couldn’t find me'),
 N('It is unfair. You know it is unfair while it is coming out of you; you can hear it. He looked for four days. He has not slept. You keep going, because the anger has to go somewhere and he is the one in the chair.'),
 N('He takes all of it. He sits there backwards on his chair and lets you, with his face doing nothing, which is not a thing that his face can do.'),
 N('When you are finished he gets up and puts the chair back against the wall. He says he will come tomorrow. You do not say sorry. He does not say it is fine. Neither of you has the first idea how, and he goes out, and you lie there knowing you just did to Ronin what the river did to you.')]);
k86('s_debt','m',null,'clear','“u had no right”',[
 N('You have been working it out for two days, and when he comes in you are ready.'),
 M2('u had no RIGHT','you had no right'),
 K76V('To what?'),
 M2('to come. to CARRY me. now i owe u. i owe u my whole fucking LIFE, u prick. do u know what that does to me. i’ve never owed ANYONE','to come. to carry me. now i owe you. i owe you my whole fucking life, you prick. do you know what that does to me? i have never owed anybody'),
 N('You want him to fight. You want “you would have died.” You want something you can throw.'),
 K76V('I have entered it. It is on your page. It can be set against the doorman, if you wish to think of it so.'),
 N('He says it to be kind. You can see that he means it to be kind. It is the worst thing he could have said. He has turned the river into a line in a book, a credit, so that you can pay it off, so that it does not have to be anything.'),
 M2('it’s not a fucking LINE. it’s not on a PAGE. get out','it is not a fucking line. it is not on a page. get out'),
 N('He goes. You hear him stop in the passage. He knows; you can tell from the stop. He knows exactly what he did wrong, and he could not have done anything else, and neither could you.')]);
k86('s_four','m',null,'clear','The four',[
 N('You go through the four. You do it in detail, at night, for hours. What you will do with each. Where. With what. For how long.'),
 N('The bald one first, because he laughed. You have it planned to the minute and you do it again with improvements. The one with the boot. The driver, who looked away, which is worse. The one who kept the books.'),
 M2('(i’m gonna make it last. i’ve never made it last. i always thought that was HIS thing. it’s gonna be my thing)','(i’m going to make it last. i have never made it last. i always thought that was his thing. it’s going to be my thing)'),
 N('Then, at four, it turns round on you, as it always does at four.'),
 N('You walked past the van. Three days. You are the person who counts the exits in a public toilet. You walked past a van with no plates three days running and thought about rent.'),
 M2('(so add one. five. the fifth one walked past the van. the fifth one’s the worst. u know where the fifth one sleeps)','(so add one. five. the fifth walked past the van. the fifth is the worst. you know where the fifth one sleeps)'),
 N('You lie there hating the fifth until it is light, with exactly the same heat as the other four, and you cannot work out which of the five plans to start on.')]);
k86('s_pity','m',null,'clear','Angel’s face',[
 N('Angel comes in and her face does the thing. Soft. Wet at the edges. The face for a dog with three legs.'),
 M2('don’t','don’t'),
 [AN,'don’t what, babe?'],
 M2('don’t do the FACE. i’m not ur fucking charity stream. get it off. get the face off or get out','don’t do the face. i’m not your fucking charity stream. get it off. get the face off, or get out'),
 N('She gets out. She goes white and she goes out and the door shuts, carefully, and you hear her heels stop just outside.'),
 N('You wanted her to stay and you threw her out. You do it every time anybody is kind to you; you have done it since you were nine. It is the one thing about yourself that you have never been able to fix, and you are very good at fixing things.'),
 N('Ten minutes later the door opens again. She has done her face. It is perfect: the eyeliner, the lips, the smile she does for the camera. It is a mask and it is very good and it is for you.'),
 [AN,'better?'],
 M2('…yeah','…yeah'),
 N('She sits down. Neither of you mentions it. You let her do your nails, and you watch her hands shake the whole time behind the perfect face, and you do not say anything, because that is the only thing you know how to give.')]);

/* ===================================== V: PERFECT HANDS ===================================== */
k86('s_figure','v',null,null,'“am i gonna be ok”',[
 N('You close the wound in eleven stitches. They are perfect. You could rule a line along them. You have closed a thousand wounds and you have never closed one better.'),
 K76MV('am i gonna be ok','am i going to be ok?','Am I going to be ok?','Am I going to be ok? Tell me straight.'),
 N('They have never asked you anything in that voice. Small, and level, and not a joke.'),
 K76V('Fractures of that kind recover full function in about eighty percent of cases, given compliance with the exercises.'),
 N('You hear it as you say it. A figure. They asked you a question that a person asks a person, and you gave them a figure.'),
 N('They look at you. Then they look at the ceiling, and you watch them put the question away somewhere, carefully, where they will not ask it again, of anybody.'),
 K76V('(I know the answer to the question that they asked. It is “I do not know, and I am here.” I have known it since I was eleven. I could not get it past my teeth.)'),
 N('You tie off the last stitch. It is perfect. You go up to the study and sit with your hands on the desk, the best hands in the city, and you would trade them both for one sentence that you could not say.')]);
k86('s_letter','v',null,null,'The letter',[
 N('You write it down. It is what you do with anything you cannot say: you write it, in full, in good ink, and then you know where you stand.'),
 N('It takes three drafts. The first is too long. The second is a list of their injuries, which you notice only at the end. The third is right. It says the river, and the four days, and what you did on the stair at the end of the second, and the other thing, the thing with no heading.'),
 N('It is perfect. You have never written anything so exactly true.'),
 K76V('(I could slide it under the door. They would read it. They read everything; they read my ledger when my back is turned.)'),
 N('You put it in the stove. You watch it go, all three sheets, from the edges in.'),
 N('In the morning they are cruel to you all through breakfast, and you are cold and correct in return, and neither of you lands a single thing that you meant. You know what was in the stove. They do not. It is the most perfect thing you have ever made and it is ash, and you did that, on purpose, with steady hands.')]);
k86('s_wrong','v',null,null,'They are crying',[
 N('You come in with the tray and they are crying. Not loudly. With their face to the wall and their shoulders going.'),
 N('You stop at four steps. You put your hands behind your back, which is what you do when you do not know what to do with them.'),
 N('You know how to quiet a hound. You have done it with eleven of them, in the worst state that an animal can be in. You sit on the floor. You do not look at them. You breathe slowly, until they breathe with you. It takes hours, and it works.'),
 K76V('(This is not a hound. If I sit on their floor they will think it a method. They will be right. It is the only one I have.)'),
 N('So you do nothing. You stand there at four steps with your hands behind your back, for a full minute, while they cry at a wall.'),
 N('Then you put the tray down and leave. You know as you turn that it is the wrong thing. You have seldom been so sure of anything. You go out anyway and close the door on it with no sound at all, so that it will not have been anything.'),
 N('You stand in the passage. Through the door it stops, after a while. Not because of you. Because people stop.')]);
k86('s_board','v',null,null,'The board-meeting voice',[
 N('When you are frightened you become very correct. You have known it about yourself for years. It is the voice you used for the board on the morning after your father died, and at his funeral, and you used it on the telephone to Hale the night they were taken.'),
 N('You are using it now. You are standing at the end of their bed, reading them the plan for the week: physio at ten, films on Thursday, the stitches out on the fourteenth.'),
 K76MV('stop it','stop it','Stop it.','Stop it, V.'),
 K76V('I beg your pardon?'),
 K76MV('stop talking to me like a MEETING. talk to me like a fucking PERSON','stop talking to me like a meeting. talk to me like a fucking person','Stop talking to me like a meeting. Talk to me like a person.','Stop talking to me like I’m a meeting. Talk to me like a person.'),
 N('You open your mouth. What comes out is “The stitches will come out on the fourteenth.”'),
 N('They throw the cup at you. It is plastic. It hits your chest and bounces, and you stand there with water down your shirt, still correct, still holding the chart.'),
 K76V('(I do not have the other voice. I had it once, I think, at about eight. I do not know where it went.)')]);
k86('s_bitten','v',null,null,'The bite',[
 N('They bite you while you do the wrist. The ball of the thumb, to the bone, with the broken tooth.'),
 N('You do not pull away. You could; it would tear. You finish the dressing with the other hand. You are good at that. You have finished a great many things one-handed while something had hold of the other.'),
 N('You look at the thumb afterwards, under the lamp, in the scullery. It will want two stitches. You put them in yourself. They are perfect.'),
 K76V('(It is the first honest thing that they have done to me in a week. Everything else has been thank you, and yes, and the empty face. That was theirs.)'),
 N('You are glad of it. You would not say so to anybody. You enter it on their page: “Bit me. Right thumb. Good.” You look at the last word for a long while, and you leave it.')]);
k86('s_steady','v',null,null,'Your hands do not shake',[
 N('Your hands do not shake. They have never shaken. It is the first thing they told you at school, the masters, and the first thing the board noticed, and the thing that every one of the forty-one saw last.'),
 N('You set the fingers. You strap the ribs. You draw blood and change the bag and take the films, and your hands are perfect, every time, in that room.'),
 N('Outside the room, in the passage, at night, you sit on the floor with your back to their door and they do not shake either. Nothing shakes. Nothing comes out.'),
 K76V('(If I could weep I should know where I stood. I have watched people do it on my table and envied them the relief. I am not built for it. I was built for the other thing, by a man who needed me to be.)'),
 N('You sit until it is light, perfectly steady, perfectly dry, and feel the whole of it go round inside you with nowhere to get out, like a wasp in a jar.')]);

/* ===================================== MORNINGS ===================================== */
const K102MORN=[
 {id:'m102_job',when:()=>S.phase==='act2'&&k73Done('e2l_car')&&!k73Done('e2l_row'),run:done=>say([
   N('The job is perfect. A man who owned the building that burned with eleven people in it. Six hundred metres, a moving car, rain.'),
   N(k76M()?'You call it. He takes it. One round. The car rolls to a stop against a bollard as if it had decided to park. You are off the roof and in his car in ninety seconds, and nobody in the street has worked out that anything happened.':'They call it. You take it. One round. The car rolls to a stop against a bollard as if it had decided to park. You are off the roof and in the car in ninety seconds, and nobody in the street has worked out that anything happened.'),
   N('It is the best piece of work that either of you has ever been part of. You both know it. In the car neither of you says so.'),
   N(k76M()?'You try. You get as far as “hey” and stop. He looks at you. He opens his mouth and shuts it. You reach over and turn the radio on, loud, to something terrible, and he reaches over and turns it off, and you turn it on, and you do that for twenty minutes, all the way back, until you are both furious.':'They begin something. “hey.” It stops. You open your mouth, and close it. They reach over and turn the radio on, loud, to something terrible. You turn it off. They turn it on. You do that for twenty minutes, all the way back, until you are both furious.'),
   K76MV('(we did it PERFECT. and i can’t even say “good shot.” what is WRONG with us)','(we did it perfectly. and i can’t even say “good shot.” what is wrong with us?)','(We did it perfectly, and I can’t even say “good shot.” What is wrong with us?)','(We did it perfectly, and I can’t even say “good shot” to him. What is wrong with us?)')],done)},
 {id:'m102_sorry',when:()=>S.phase==='act3'&&k73Done('e2l_row')&&!S.f.e2lEnd,run:done=>say(k76M()?[
   N('After the corridor you try to say sorry. You do it the only way you know.'),
   N('At four in the morning you shoot the stone ball off the top of his left gatepost from three hundred metres. Clean. It drops into the drive. It is the best shot you have made since the hand.'),
   M2('(that means sorry. he’ll get it. that’s the clearest sorry i’ve got)','(that means sorry. he’ll get it. that’s the clearest sorry that i have)'),
   N('In the morning there is a reply. He has had the stone ball put back on the post, and on top of it there is a second, smaller ball, of the same stone, carved, very fine.'),
   N('You look at it through the scope for a long time. It is beautiful. You have no idea what it means. You are fairly sure that he has no idea what yours meant, and that both of you have just said sorry at enormous expense, and that neither of you heard it.')]:[
   N('After the corridor you try to say sorry. You do it the only way you know.'),
   N('You write it in the ledger, on their page, in the column for the total: “Owed: an apology. By me.” You leave the book open on the desk at that page, with the study window unlatched.'),
   N('At four the stone ball comes off your left gatepost. A rifle, from three hundred metres. Clean.'),
   K76V('(It is a reply. It is a better shot than any they have made since the hand. I do not know whether it says “accepted” or “go to hell.”)'),
   N('You have the ball put back, and a second carved to sit on top of it, which is as near as you can come to saying that you heard. The next night the window is shut, and the ledger has not been touched, and you understand that they never came in. They answered a page that they had not read, and you replied to a shot that perhaps was not a reply at all.')],done)},
 {id:'m102_range',when:()=>['after','act2'].includes(S.phase)&&k73Done('e2l_door')&&!S.f.e2lEnd,run:done=>say(k76M()?[
   N('You go down to his range with the pistol and four boxes and you shoot paper until you cannot feel your hands.'),
   N('It is not practice. There is nothing to practise; you hit what you aim at. It is two hundred rounds of being angry at a thing that is not there: the four, the van, the fifth one, the river, the soup, the bed, him.'),
   N('At a hundred and sixty the cast has rubbed through the skin. There is blood on the grip. You keep going.'),
   N('He is behind the line. He has been there since the first box. He does not tell you to stop. He does not come up and take the pistol. He stands there, and when you run out, he puts a fifth box on the bench beside you, and steps back.'),
   M2('(he can’t stop me. he can’t help me. he can only hand me MORE. that’s all either of us has got)','(he can’t stop me. he can’t help me. he can only hand me more. that’s all either of us has)'),
   N('You shoot the fifth box. Every round in the black. Then you sit down on the floor of the range, and he sits down at the other end of it, and nobody says anything until the light in the stairwell goes off on its timer.')]:[
   N('They go down to the range with the pistol and four boxes. You hear the first shot from the study, and you go down, and stand behind the line.'),
   N('It is not practice. They hit what they aim at, every time. It is two hundred rounds of rage at something that is not there.'),
   N('At a hundred and sixty there is blood on the grip. The cast has rubbed through. They keep going.'),
   K76V('(I could stop them. I could take the pistol. I could say a sentence. I have none that would not be an order or a figure.)'),
   N('When they run out you put a fifth box on the bench beside them, and step back. It is all that you know how to give: more of the thing that is hurting them, because they asked for it.'),
   N('They shoot the fifth box, every round in the black. Then they sit on the floor, and you sit at the other end of the range, and nobody speaks until the stairwell light goes off.')],done)}];
const _me102=morningEvent;morningEvent=function(done){try{if(S&&K102()&&!(S.kd&&S.kd.med)&&!(typeof k101Pending==='function'&&k101Pending())&&S.f.e2lMornDay!==S.day&&typeof mbOk==='function'&&mbOk()){
  const e=K102MORN.find(x=>!S.seen[x.id]&&x.when());if(e){S.seen[e.id]=1;S.f.e2lMornDay=S.day;mbUse();save();go(cutBg('#0b0a0c'));return e.run(()=>_me102(done))}}}catch(e){}return _me102(done)};

/* ===================================== THE WORST ROUTE ===================================== */
if(typeof K97_MIND!=='undefined'){
 K97_MIND.fray.push([N('You wake up angry. Not at him; at all of it. It is the first thing you have felt in two days and you grab it with both hands.'),
  M2('(GOOD. good. stay angry. angry gets up. angry eats. angry kills four guys and a van)','(good. good. stay angry. angry gets up. angry eats. angry kills four men and a van)'),
  N('You hold on to it all morning. You are furious at the tray, the light, the green dot, the drain. It is wonderful. By noon it has gone grey at the edges, like a coal, and you blow on it, and blow on it, and it goes out anyway.')]);
 K97_MIND.thin.push([N('You try to make yourself angry. You go through the four on purpose, the bald one, the van, the way the driver looked away. You used to be able to light a whole day off the driver.'),
  N('Nothing catches. You know they deserve it. You cannot feel that they do.'),
  M2('(u used to be so ANGRY. it was the best thing about u. where did it go)','(you used to be so angry. it was the best thing about you. where did it go?)'),
  N('You lie there and miss your own temper the way you would miss a dog.')])}

/* ===================================== ENDINGS ===================================== */
const _xe102=extraEnding;extraEnding=function(){const L=_xe102();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const F=S.f.e2l85||{};
 if(F.s_wreck)L.push('Misaki wrecked the infirmary on the second clear morning. V stood in the door and said that he would have the glass replaced, and knew as he said it.');
 if(F.s_debt)L.push('“it’s not a fucking LINE.” V had entered the river on Misaki’s page, as a credit, to be kind.');
 if(F.s_figure)L.push('Misaki asked V whether they would be all right. He gave them a figure.');
 if(F.s_letter)L.push('V wrote Misaki a letter in the infirmary, three drafts. It is the most exactly true thing he has written. He burned it.');
 if(F.s_bitten)L.push('On Misaki’s page, in V’s hand: “Bit me. Right thumb. Good.”');
 if(S.seen.m102_sorry)L.push('After the corridor they apologised to each other: a shot and a carved stone ball. Neither understood the other.');
 if(S.seen.m102_range)L.push('Two hundred rounds on V’s range, and a fifth box. It was all either of them knew how to give.')}catch(e){}return L};
/* ===KC102-END=== */
