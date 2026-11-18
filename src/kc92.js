/* ===KC92-BEGIN=== */
/* ===================== THE WAR: WHAT THEY DO IN THE ROOM (kc92) =====================
   More infirmary for the enemies-to-lovers route, in kc85's player-opened pool. These are scenes in which somebody
   does something, as against scenes in which a tray arrives. Needs kc73, kc76–kc91.
     Misaki, cell:   k_knife (S.f.e2lKnife tried|held)   k_offer   k_hound   k_wash (a version for each setting)
                     k_ran (only after an escape attempt: S.kd.med.run)
     Misaki, clear:  k_pray   k_pistol (S.f.e2lPistol checked|aimed)
     V:              k_knifeV (S.f.e2lKnifeV still|told)   k_offerV   k_houndV   k_washV (injuries only)
                     k_ranV (after an escape attempt)   k_miss   k_hale   k_empty
   Characters, as they are here:
     Misaki is an assassin on a great deal of pain relief who believes the tall one is K9 and means to kill them.
       They are not broken. They are working: they case the room, they try him with a knife, and when that fails
       they offer him the only thing they have ever had to sell.
     V does not explain himself and does not contract. He keeps still under a knife. He writes down what he did.
     Ronin bargains with the Devil, and is rude to him. Angel never misses, and here she does.
   Full-story text keeps kc29's rules; injuries-only text keeps kc36's (no doctor).
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc92.md. Tested in tools/k86_test.js and tools/k92_test.js. */
const K92=()=>{try{return typeof K91==='function'&&K91()}catch(e){return false}};
const k92When=fn=>{try{K85S[K85S.length-1].when=fn}catch(e){}};
const k92Ran=()=>{try{return !!(S.kd&&S.kd.med&&S.kd.med.run>0)}catch(e){return false}};

/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
k86('k_knife','m',null,'cell','The knife on the tray',[
 N('There is a knife on the tray. A table knife, steel, with a real edge on it. He has left you one at every meal, and you have put it back each time, in line with the fork, to show that you are no trouble.'),
 N('You are an assassin. You have been lying here saying thank you for three days with a blade a foot from your hand.'),
 M2('(he kneels. when he puts the tray down, he kneels. his neck comes level with the bed)','(he kneels. when he puts the tray down, he kneels. his neck comes level with the bed)'),
 N('You have watched him do it nine times. He goes down on the left knee. His head turns a little to the right, to see the counter. For about two seconds the side of his throat is eighteen inches from your good hand, and he is looking the other way.'),
 N('The drip has your hand slow, and the room is not steady. You would get one. You would not get a second.'),
 M2('(u swore it. in front of everyone. u said a car park. this isn’t a car park but it’ll do)','(you swore it, in front of everyone. you said a car park. this isn’t a car park, but it’ll do)'),
 N('He comes in. He crosses the four steps. He goes down on the left knee.')],
 cb=>ask('hitmeuppp','(Two seconds.)',[
  {t:'Do it',fn:()=>{S.f.e2lKnife='tried';save();say([
   N('You do it. It is not fast. It is the slowest thing you have ever done with a blade, through the drip, like cutting under water. The edge arrives against the side of his neck and stops there, because your arm has nothing left to put behind it.'),
   N('He keeps perfectly still. He does not take the tray from under his own hands. You can feel his pulse through the steel. It is slow.'),
   K76V('It happens.'),
   N('You know those words. You cannot think where from. A table, in the dark, and plastic on the floor.'),
   K76V('You have the vessel. It is two fingers further back than you think. If you are going to, press, and draw towards yourself.'),
   N('He is telling you how. He is kneeling on your floor with your knife on his neck, telling you where to cut.'),
   M2('(why’s he telling me. guards don’t tell u where to cut)','(why is he telling me? guards don’t tell you where to cut)'),
   N('Your hand begins to shake. It shakes until the knife is ringing against his collar stud. Then it opens, by itself, and the knife is on the blanket.'),
   N('You wait for it. You have your eyes shut and your chin up. You hear him pick the knife up. You hear him lay it on the tray, and turn it, so that the handle is towards you. Then his knee comes off the tile, and four steps, and the door.'),
   M2('(he put it BACK. he put it back where i can reach it)','(he put it back. he put it back where i can reach it)')],cb)}},
  {t:'Leave the knife where it is',fn:()=>{S.f.e2lKnife='held';save();say([
   N('Your hand goes as far as the handle, and lies down on it, and will not close. The drip has it. Or you have it; you cannot tell any longer which of you is deciding.'),
   N('He sets the tray down. He sees where your hand is. He looks at the hand on the knife, and at you, and he does not move the tray out of reach.'),
   N('He stays on his knee a moment longer than he needs to. It is as if he were giving you the two seconds again. Then he gets up, and takes his four steps back, and at the door he says what day it is.'),
   M2('(he saw. he SAW my hand on it. and he left it there)','(he saw. he saw my hand on it, and he left it there)'),
   M2('(so it’s a test and i failed it. or it’s a test and that was passing. i don’t know which. i don’t know what he WANTS)','(so it’s a test and i failed it. or it’s a test, and that was passing. i don’t know which. i don’t know what he wants)')],cb)}}]));
k86('k_offer','m',null,'cell','Make him an offer',[
 N('You have nothing in here to bargain with. You have been through it. Ninety dollars, in a trailer that he has certainly searched. A truck. A cactus.'),
 N('There is one thing. It is what you have sold since you were sixteen, and it has always found a buyer.'),
 N('When he comes for the tray, you keep your eyes on his hands and you quote for it, as you would for any client.'),
 Ms('ur list’s too long. ur one guy. u do, what, four a year? i do four a MONTH. give me the list. no fee. u want them explained to, i’ll read them a card','Your list’s too long. You’re one guy. You do, what, four a year? I do four a month. Give me the list. No fee. If you want them explained to, I’ll read them a card.','You point at him, and hold up four fingers, and make a face. You point at yourself and hold up four, four, four. Then you rub finger and thumb together and shake your head: no charge.'),
 N('It is a good offer. It is a great offer. A man with a list and no time ought to bite your hand off.'),
 N('He has stopped with the tray half lifted. Something is going on in his face that you have not seen before, and you find that you are looking at it, in place of his hands.'),
 K76V('No.'),
 M2('(no?? i offered him free LABOUR. he could clear the backlog by christmas)','(no? i offered him free labour. he could clear the backlog by christmas)'),
 N('Then you have it. He does not want them dead. He wants to do it. It was never about the list getting shorter; you said so in the bowling alley, and he looked at you as if you had spat.'),
 M2('(i KNEW it. it’s not a law. it’s a hobby. …so that’s what i’m here for)','(i knew it. it’s not a law. it’s a hobby. …so that’s what i’m here for)')]);
k86('k_hound','m',null,'cell','The door opens, and it is not him',[
 N('The door opens in the night. There are no footsteps before it. The handle goes down by itself, and something pushes the door with its head.'),
 N('It is the grey one. It is the size of a calf. It stands in the doorway with the corridor light behind it, looking at you, and its eyes give the light back green.'),
 M2('(so this is how. he doesn’t do it himself. he opens the door and lets them)','(so this is how. he doesn’t do it himself. he opens the door and lets them)'),
 N('It comes across the room. Its nails are loud on the tile. You hold still. There is no point in anything else; you have seen what four of them do to a man in a yard.'),
 N('It gets its front feet up on the bed. The mattress goes down under them. Its breath is on your face, hot, and it smells of the bucket.'),
 N('Then the whole weight of it comes up beside you, and turns round once, and lies down along your back. There is a sigh that you feel in your own ribs.'),
 N('You do not move for six hours. Your leg goes dead under its jaw. It is the warmest that you have been since the river, and you spend every minute of it waiting for the teeth.'),
 M2('(it’s keeping me here till he comes. that’s all. it’s a guard. don’t u dare like it)','(it’s keeping me here until he comes. that’s all. it’s a guard. don’t you dare like it)'),
 N('In the morning it gets down, and stretches, and noses the door shut behind it as it goes.')]);
k86('k_wash','m',null,'cell','You have to be washed',()=>k84SA()?[
 N('The woman in the cardigan says that you must be washed. She says it kindly. She has a basin, and a cloth, and a sheet that she will hold up, and she says that she will tell you each thing before she does it.'),
 N('The tall one has gone to the far end of the house. You heard him go; he made a noise on every stair.'),
 N('She does your face first. She tells you. She does your arm, and tells you. It is warm water, and the cloth is soft, and she has done this for a great many people.'),
 N('You are shaking so hard that the water slops out of the basin onto the floor.'),
 M2('(it’s a wash. it’s soap. it’s a nice lady with a flannel. STOP it)','(it’s a wash. it’s soap. it’s a nice lady with a flannel. stop it)'),
 N('She stops. She puts the cloth in your good hand, and holds the sheet up between you with her face turned to the wall, and says that you can do the rest, and that she will be on the other side of the sheet with her eyes shut for as long as it takes.'),
 N('It takes forty minutes. You do it with one hand, in pieces, under the T-shirt. The water goes cold. She does not once say that it is taking a long time.')]:[
 N('You have to be washed. There is four days of the other building on you, and it is in the wrists.'),
 N('The tall one brings a basin, and a cloth, and stands looking at them. There is nobody else. He says that he is going to wash your arms and your back, and that he will say each thing before he does it, and that you may tell him to stop.'),
 M2('(may. he said MAY. like it’s a thing)','(may. he said may. as if that were a thing)'),
 N('You go to the roof. You leave him the arm.'),
 N('From a long way up you can feel that he is doing it properly. Long strokes, the same way each time. The cloth rinsed between. He washes round the worst places without touching them, and he does not hurry, and he keeps his eyes on the wall above your head.'),
 N('It is how you would wash a rifle that had been in a river. With respect for the thing, and no interest in it.'),
 M2('(he’s cleaning his equipment. that’s what this is. u don’t put a dirty thing on a clean table)','(he’s cleaning his equipment. that’s what this is. you don’t put a dirty thing on a clean table)'),
 N('When he has finished, he wrings the cloth out into the basin. The water is brown. He looks at it, and his throat moves, and he carries it out at arm’s length.')]);
k86('k_ran','m',null,'cell','You ran',[
 N('You ran. You got the needle out with your teeth and the door open and as far as the corridor.'),
 N('It was not the corridor of the other building. You knew that, with the part of you that counts. This one had a kitchen chair in it, and a nail with keys on it, and it smelled of straw. But the part that counts was not driving.'),
 N('You are back in the bed. Nobody has hit you. The needle is back in your hand, with fresh tape, and there is a dressing on your foot that you do not remember needing.'),
 M2('(they always bring u back. doesn’t matter how far. it’s the bringing back that’s the point)','(they always bring you back. it doesn’t matter how far. the bringing back is the point)'),
 N('You wait for what comes after a run. In the other building it came the same night, and it was worse than what had made you run.'),
 N('The tall one comes in. He has a bowl of water and a towel. He kneels at the end of the bed, where your feet are, and washes the gravel out of the one that bled. He does not say anything about the door.'),
 N('When he has gone, the door is not locked. It is not even shut. He has left it standing a hand’s width open, on purpose, with the corridor light coming through.'),
 M2('(that’s worse. that’s so much worse. he WANTS me to try it again)','(that’s worse. that’s so much worse. he wants me to try it again)')]);
k92When(k92Ran);

/* ===================================== MISAKI: CLEAR ===================================== */
k86('k_pray','m',null,'clear','Ronin, in the corridor, at night',[
 N('You wake at three. Ronin is in the corridor, in the chair, and he is talking to somebody. He has his voice down. The vent carries it anyway.'),
 [RN,'…ain’t askin’ Him. He don’t take my calls. I’m askin’ you.'],
 N('You lie still. You have never heard Ronin pray. You have heard him say grace, with his mouth full, to annoy V.'),
 [RN,'You want one, you take one of them. The skinny one that forgot the ties. I’ll bring him down to you myself, I’ll gift-wrap the fucker. Take two. I got a list.'],
 [RN,'But you keep your hands off the one in there. That one’s ours. I know what they done, I know they ain’t clean, I know they’re yours by rights. So’m I. So’s all of us.'],
 [RN,'I’ll owe you. Put it on my tab. You know I’m good for it; I’m comin’ to you anyway.'],
 N('There is a silence. You think he has finished.'),
 [RN,'…And you can go fuck yourself if that ain’t enough. Amen.'],
 M2('(he’s haggling with the DEVIL. for me. he’s doing a deal)','(he’s haggling with the devil, for me. he’s doing a deal)'),
 N('You do not let him know that you heard. In the morning you tell him that he snores, and he tells you that you smell like a hospital, and it is the nearest that either of you will come.')]);
k86('k_pistol','m',null,'clear','Your pistol',[
 N('V comes in with something wrapped in a cloth. He lays it on the counter and opens the cloth. It is your pistol.'),
 K76V('This was under your pillow, in the trailer. It ought to be under this one.'),
 N('You look at it. You look at him. He has stepped back from the counter, his four steps, and his hands are open at his sides.'),
 M2('is it loaded','is it loaded?'),
 K76V('Yes. I have cleaned it. I have altered nothing else.'),
 M2('u know what i said i’d do','you know what i said i’d do'),
 K76V('I was there. I should prefer that you slept. You do not sleep without it; I have watched you try.'),
 N('He is giving a loaded gun to the one person in the city who has promised, in front of witnesses, to use it on him. He is doing it in his own cellar, with nobody else in the house.')],
 cb=>ask('hitmeuppp','(It is seven feet away. He is eleven.)',[
  {t:'Drop the magazine and count',fn:()=>{S.f.e2lPistol='checked';save();say([
   N('You drop the magazine with your good thumb, and count. Seven, and one in the pipe. It is full. He has not kept one back.'),
   M2('ur stupid','you’re stupid. you know that?'),
   K76V('It has been said.'),
   N('You put it under the pillow. For the first time in that room you sleep on your back, right through, with your hand on the grip, and you do not dream about either building.')],cb)}},
  {t:'Put it on him',fn:()=>{S.f.e2lPistol='aimed';save();say([
   N('You pick it up and put it on him. It is steady. The pistol always was, even when nothing else is.'),
   N('He looks down the barrel at you. He does not raise his hands, and he does not lower his eyes. He is waiting to see what you are.'),
   M2('(i could. right now. who’d know which building it happened in)','(i could. right now. who would know which building it happened in?)'),
   N('You know that thought. It is not yours. It came from somewhere above this ceiling, through a vent, in his voice.'),
   M2('not in the laundry','not in the laundry. somewhere stupid, i said'),
   K76V('A car park. I recall.'),
   N('You put it under the pillow. He inclines his head, exactly as he would to an equal, and goes out, and turns his back on you to do it.')],cb)}}]));

/* ===================================== V ===================================== */
k86('k_knifeV','v',null,null,'A knife at your neck',[
 N('You leave them a knife at every meal. A real one. You will not have them eat with a spoon, like a prisoner.'),
 N('You go down on your left knee to set the tray on the counter, as you have done nine times. There is steel against the side of your neck.'),
 N('It has come slowly. Through the drip, from a hand that will hardly lift. A week ago they could have opened you before you heard it. This has taken them a full second, and it has stopped where it touched, because there is nothing left in the arm to drive it.'),
 K76V('(There they are.)'),
 N('It is the first thing that they have done in this room which was not for a gaoler. It is the person who stood a bullet on your pillow. You had begun to think that the building had kept that one.'),
 N('You could have the knife out of their hand before they blinked. You keep still. You find that you would not disturb it for anything that you own.'),
 K76V('It happens.')],
 cb=>ask('K9','(The edge is two fingers forward of the vessel.)',[
  {t:'Tell them where to cut',fn:()=>{S.f.e2lKnifeV='told';save();say([
   K76V('You have the vessel. It is two fingers further back than you think. If you are going to, press, and draw towards yourself.'),
   N('You mean it. It is their right; you wrote the charge yourself, and you came to their trailer with sheeting. If it is to be collected, let it be collected well.'),
   N('The blade begins to shake. It rings against your collar stud. Then it is on the blanket, and they have their eyes shut and their chin up, waiting for you to do what one does about a knife.'),
   N('You pick it up. You lay it on the tray, and turn the handle towards them.'),
   K76V('(They will have another chance at noon, and another at six. I shall kneel in the same place.)')],cb)}},
  {t:'Say nothing more, and wait',fn:()=>{S.f.e2lKnifeV='still';save();say([
   N('You wait. You count your own pulse against the edge. Forty. It is slower than it has been all week.'),
   N('The blade shakes, and falls. They wait, with their chin up, for the consequence. You pick the knife up and lay it on the tray, with the handle towards them.'),
   N('In the corridor you find that you are smiling. It is a small, ugly thing, and it has no business on your face tonight. You stand with your hand over your mouth until it has gone.'),
   K76V('(They tried to kill me. I have not been so relieved since I found the building.)')],cb)}}]));
k86('k_offerV','v',null,null,'What they offered you',[
 N('They made you an offer this evening. Evenly, with their eyes on your hands, in the pleasant voice.'),
 N('They shoot. They are the best that there is; it is in your file. Whomever you like. No fee. As many as you wish, for as long as you wish.'),
 N('It is the first line of the charge. You wrote it in the first week: KILLS FOR WHOEVER HOLDS THE MONEY. You underlined it. You thought it the worst thing that could be said of a person.'),
 K76V('(They have offered it to me. As rent, on their own life. The only coin that they have ever been allowed to mint.)'),
 N('You said no. You could find nothing to put after it.'),
 N('You watched them take the no. You watched them work out what else a man keeps a person for, when he has declined their work, and you saw them arrive at it. They drew the blanket up to the chin.'),
 K76V('(I cannot go back in and correct it. Every sentence that would correct it begins with what I do not want from them, and they have heard that sentence before, from men who were lying.)'),
 N('You stand in the corridor with the tray in your hands until the soup has a skin on it.'),
 K76V('(I held it against them that they sold the one thing. I had not asked who taught them that it was all they had.)')]);
k86('k_houndV','v',null,null,'The grey hound is not in the kennel',[
 N('The grey hound is not in the kennel at midnight. The infirmary door is ajar. She can work a handle; you have known it for years, and have never fitted a lock against her.'),
 N('You look through the glass. She is on the bed. All of her, laid along their back, with her jaw across their leg.'),
 N('They are rigid. The eyes are open and fixed on the wall. They are not breathing so much as letting air in and out. They think that she has been sent.'),
 K76V('Come.'),
 N('You say it low, through the gap of the door. The grey hound lifts one ear. She does not lift her head.'),
 K76V('(She has refused me. It is the second time in her life. The first was in a yard, over the same person.)'),
 N('You could go in and take her by the collar. You would have to come at the bed, in the dark, quickly, with your hand out. You have a rule about speed in that room.'),
 N('And they are warm. You can see it. There is colour in the back of the neck that has not been there in four days.'),
 K76V('(She is doing what I cannot. She may lie against them, and I may not come within four steps. I find that I am jealous of a hound, and I do not propose to examine it.)'),
 N('You leave her. You sit down in the corridor, where she can hear you, in case the fear should become more than they can hold.')]);
k86('k_washV','v','inj',null,'They have to be washed',[
 N('They have to be washed. Four days of that building is on them. It is in the wrists, and it will be in the blood by tomorrow.'),
 N('There is nobody else. You will not have Ronin do it, and Angel could not get through it. You have washed a great many bodies. They were all past minding.'),
 N('You tell them what you are going to do. Each thing, before you do it. You tell them that they may stop you.'),
 N('They look at your hands. Then the eyes go up and over your shoulder, and the face empties, and the arm that you are holding goes slack. They have left it with you, as one leaves a coat.'),
 K76V('(They are not here for it. They have gone wherever they go. I am alone in the room with their arm.)'),
 N('You wash it. Long strokes, the same way each time; you keep your eyes on the wall. You know every one of these marks by its cause. A ring. A heel. A length of flex. Dirt has been ground into the grazes by somebody’s knee.'),
 N('The water goes brown. You change it twice. What comes off them is that building: its floor, its men, the inside of its van.'),
 K76V('(I have had my hands in a man to the wrist and thought about my dinner. I am rinsing a cloth, and I cannot keep my throat still.)'),
 N('You carry the basin out at the length of your arm. You pour it on the gravel, a long way from the kennel, where none of your animals will walk through it.')]);
k86('k_ranV','v',null,null,'They ran',[
 N('They ran. The needle was pulled with the teeth; you found it on the pillow. They had the door open and were in the kennel corridor before the hounds lifted their heads.'),
 N('Barefoot, on a broken foot’s worth of gravel from the yard door, with a hand in plaster and three ribs loose. They got forty feet. You have had well men on that floor below who did not get to the stair.'),
 K76V('(I should like it recorded that they are the most dangerous thing that I have ever had under this roof. I had it in the file as a charge. Tonight I can only read it as praise.)'),
 N('You brought them back. You carried them; they went slack in your arms, and you have learned what that is.'),
 N('You know what follows a run, in the kind of place that they think this is. They are lying in there waiting for it. Nothing that you say will be believed until the night has passed without it.'),
 N('So you fetch a bowl of water and a towel, and you kneel at the foot of the bed and wash the gravel out of the foot that bled. You do not speak of the door.'),
 N('And you leave it open. A hand’s width, with the light coming through. You know how it will be read. It is the only true thing that you can put in front of them: that it opens.'),
 K76V('(If they go through it again tonight, I shall carry them back again, and wash the other foot.)')]);
k92When(k92Ran);
k86('k_miss','v',null,null,'Angel, on the range',[
 N('You find Angel on the range under the house at four in the morning. She has not been to bed. There is a paper target at fifteen metres, and a box of shells open on the bench.'),
 N('Angel does not miss. It is not a thing that she is good at; it is a thing that she is. You have seen her take a playing card out of a man’s fingers, laughing, with her eyes shut for the camera.'),
 N('The target has not got a mark on it.'),
 [AN,'Don’t.'],
 K76V('I had not spoken.'),
 [AN,'I’ve put eleven down there. Eleven, V. I can’t find the paper. My hands are fine, look at them, they’re fine. It’s my eyes. Every time I look down the barrel I’m looking at that door.'],
 N('She fires. The shell goes into the sandbank a hand’s breadth wide of the frame.'),
 [AN,'I never miss. That’s the whole point of me. If I can’t do that, what’ve they got? A girl who cries and does nails?'],
 K76V('They have somebody who came with a loaded shotgun and gave it to me to hold, so as not to use it. I should call that marksmanship.'),
 N('She looks at you for a long moment. Then she breaks the gun, and lays it on the bench, and sits down on the concrete with her back against the wall.'),
 [AN,'…That’s the nicest thing you’ve ever said to me, and it’s about not shooting you.'],
 K76V('I am out of practice at the other kind.')]);
k86('k_hale','v',null,null,'Inspector Hale, at the gate',[
 N('Inspector Hale is at the gate, on foot, without a car. That is how he comes when it is not a visit.'),
 N('He says that the blood in the building on the river has been typed. He says that some of it belongs to a person of no fixed papers who is known to shoot for hire, and that the person has not been seen. He asks whether you can help him.'),
 K76V('Do you wish to arrest them, Inspector?'),
 N('He takes his time. He looks past you, at the house; at the kennel door; at Ronin’s truck, which has been on your gravel for five days.'),
 N('He says that there are eleven matters on which he would very much like to speak to that person. He says that he has also read the scene, and that he has a daughter. He says that he finds that he is not in a hurry.'),
 K76V('Then I have not seen them.'),
 N('He nods. He has known you for eleven years, and he knows what your word is worth, and you have just spent it.'),
 N('At the gate he turns back. He says that he has never before seen you look like a man who was afraid of something, and that he hopes, whatever it is, it lives.'),
 K76V('(He means to be kind. He has no idea what he is hoping for. I had that person’s name in a letter addressed to him.)')]);
k86('k_empty','v',null,null,'Say it to the kennel',[
 N('You go out to the kennel at two, when the house is asleep, and you say it aloud. You have found that a thing must be said aloud before it is real, and there is nobody else to whom you can say it.'),
 K76V('I am not going to kill them.'),
 N('The four of them look up. The old hound thumps his tail once in the straw, as he does when you state the obvious.'),
 K76V('It is written that I shall. It is in ink. I have never failed to do what is in that book.'),
 N('The black hound yawns.'),
 K76V('I do not know what a book is worth with a line in it that will not be carried out. I do not know what I am, if the book is not worth anything.'),
 N('You stand there. It is cold. None of them has an opinion.'),
 K76V('I am not going to kill them. I should like to be able to say so in that room. I cannot find a way to say it, to a person lying drugged in my cellar, that is not exactly what the worst man alive would also say.'),
 N('The old hound gets up, a joint at a time, and comes and leans on your leg. It is not an answer. It is the nearest thing to one that you are going to get, and you stay out there, taking it, until your feet are numb.')]);

/* ===================================== ENDINGS ===================================== */
const _xe92=extraEnding;extraEnding=function(){const L=_xe92();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,F=f.e2l85||{};
 if(f.e2lKnife==='tried'||f.e2lKnifeV)L.push('In the infirmary, drugged, Misaki put the tray knife to V’s neck. He kept still, said “It happens”, and laid it back on the tray with the handle towards them.');
 if(F.k_offer||F.k_offerV)L.push('In the infirmary Misaki offered to clear V’s list for him, four a month, for nothing. He said no, and could find nothing to put after it.');
 if(f.e2lPistol)L.push('V gave Misaki their pistol back in the infirmary, loaded, with nobody else in the house. They slept on their back that night.');
 if(F.k_pray)L.push('Ronin offered the Devil two men off his list, and himself on account, to leave Misaki alone. He ended the prayer by telling him to go fuck himself.');
 if(F.k_miss)L.push('Angel missed eleven shots in a row on the range under V’s house the week Misaki was in the infirmary. She has not missed one since.')}catch(e){}return L};
/* ===KC92-END=== */
