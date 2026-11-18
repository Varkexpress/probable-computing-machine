/* ===KC91-BEGIN=== */
/* ===================== THE WAR: THE DRIP (kc91) =====================
   The author's direction: make it plain that during the delusion (the cell stage of the infirmary) Misaki is on a
   large amount of medicinal drugs, and that this is part of why they take V's house for a cell.
   What was already canon (kc28): the chart, in V's hand, says NO SEDATIVES, underlined twice; the captors dosed them
   in the other building. Both are kept. What this module adds: three broken ribs, a pinned hand and wrists open to
   the tendon need a great deal of pain relief, and what the captors gave is still leaving the blood. Nobody has
   sedated them. They are full of painkiller all the same, by a line in the arm, and it does to their judgement
   what a sedative would. It also tastes exactly as the other building's doses tasted, which for Misaki settles the
   question of who has them.
   V's side: he forbade sedation so that they would be clear, and then had to choose between their pain and their
   reason. Every hour that they are comfortable is an hour that they spend afraid of him.
   Needs kc73, kc76–kc90.
   1. Two opening scenes, first in kc84's scheduler:  d_line (Misaki, cell)  ·  d_dose (V)
        S.f.e2lDose: Misaki kinked|left, V cut|held. 'kinked' and 'cut' bring clarity a day sooner (med.clar +1, once)
        and cost a night of pain; 'left' and 'held' do not.
   3. Beat e2l_green (chapter II, free, after e2l_room): the green book, with the hour of every visit.   S.f.e2lGreen read|unread
   2. The pool (kc85's ⚔ The room / Outside the room):
        Misaki, cell:   d_skip d_three d_taste d_two d_late d_light
        Misaki, clear:  d_bag d_sort d_drugged
        V:              d_weight d_eyes d_chart d_cost d_ronin d_angel d_taper
   Full-story text names the doctor as the one who sets the rate; injuries-only text has V set it himself, from the
   tables he uses for the hounds (kc36: no doctor). No dose, drug name or quantity is given anywhere.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc91.md. Test: node tools/k91_test.js */
const K91=()=>{try{return typeof K90==='function'&&K90()}catch(e){return false}};
const k91Clear=()=>{try{const m=S.kd&&S.kd.med;if(m&&!S.f.e2lDoseUp){m.clar=Math.min(3,(m.clar||0)+1);S.f.e2lDoseUp=1;save()}}catch(e){}};

/* ===================================== THE OPENING SCENES ===================================== */
const k91_line=cb=>say([
  N('There is a needle in the back of your right hand, taped down, and a tube that goes up from it to a bag on a steel stand. The bag is clear. Something comes down the tube a drop at a time, and you can feel each one arrive: cold, at the wrist, and then nowhere.'),
  N('The room will not stay still. The corners are further off than they should be. When you turn your head, the wall takes a moment to come with you.'),
  M2('(one: ur dosed. two: u know this. u know EXACTLY this)','(one: you’re dosed. two: you know this. you know exactly this)'),
  N('In the other building it came in a cup, or in the arm. There was a taste afterwards at the back of the throat, like a coin, and then the floor went soft, and things were done in the gap. You have that taste now.'),
  M2('(same stuff. same people. they’ve just moved me somewhere with a nicer ceiling)','(same stuff. same people. they’ve just moved me somewhere with a nicer ceiling)'),
  N('You try to do the sum on that, and the sum will not hold. You get the first number and reach for the second, and the first has gone.')],
 ()=>ask('hitmeuppp','(The tube lies across your forearm. It would fit under your elbow.)',[
  {t:'Bend your arm on the tube, and keep it bent',sub:'you need your head more than you need the rest',fn:()=>{S.f.e2lDose='kinked';k91Clear();say([
   N('You fold your arm over the tube and lie on it. The drops stop. Nobody comes; they do not check as often as they think.'),
   N('In an hour the pain arrives, all of it together, like a door opening on a furnace. The hand. The ribs, every breath. You had not known how much the bag was holding back.'),
   M2('(good. GOOD. it’s mine. i can think round pain. i can’t think round that)','(good. good. it’s mine. i can think round pain. i can’t think round that)'),
   N('You keep the arm bent all night, with the sheet in your teeth. Towards morning the corners of the room come in to where corners belong. It is a small white room. You still do not know whose. You can at least count it.')],cb)}},
  {t:'Leave it. You cannot fight what is already in',fn:()=>{S.f.e2lDose='left';save();say([
   N('You leave it. You have fought a dose before; you lost an hour and a fingernail.'),
   N('It comes down the tube and you go where it sends you. The ceiling lifts and settles, like a chest. The green light leaves a thread behind it each time it goes out.'),
   M2('(it’s not real. the ceiling’s not breathing. it’s the stuff. …say it again)','(it’s not real. the ceiling’s not breathing. it’s the stuff. …say it again)'),
   N('You say it again. You go on saying it for as long as you can remember what you were saying it about.')],cb)}}]));
const k91_dose=cb=>say([
  N('The chart is in your hand, and so is the first line on it: NO SEDATIVES. You underlined it twice. They were kept under in that building, and you will not have it done to them again in yours.'),
  N(k84SA()?'The doctor has read the line. She has not disputed it. She has shown you the films instead, and told you what three ribs, a pinned hand and two wrists open to the tendon will require if the patient is to breathe at all.':'You have read the films. You know what three ribs, a pinned hand and two wrists open to the tendon will require, if the patient is to breathe at all. You have the tables for it; you have dosed a hound of the same weight.'),
  N('It is not a sedative. It is only relief. It goes in by the arm, a drop at a time, and at the quantity needed it does to a mind very much what the other would have done.'),
  N('There is also what the men in that building gave them, which is still leaving the blood, and which nobody can name.'),
  K76V('(So they are not sedated, and they cannot tell the ceiling from the floor. I have kept to the letter of my own instruction.)'),
  N('You watch them through the glass. The eyes are open. They follow something across the wall that is not there, and then they find you in the doorway, and you see what they make of a tall shape with a bag of something on a stand.'),
  K76V('(While it runs, they do not hurt. While it runs, I am whatever that building left in their head. I may have one or the other.)')],
 ()=>ask('K9','('+(k84SA()?'The doctor is waiting for your word on the rate.':'Your hand is on the roller clamp.')+')',[
  {t:'Bring it down by half',sub:'they will be clear sooner, and they will feel all of it',fn:()=>{S.f.e2lDose='cut';k91Clear();say([
   N(k84SA()?'You tell her to halve it. She looks at you for a moment, and does it, and writes the hour.':'You turn the clamp until the drops come at half the rate, and write the hour.'),
   N('By ten they are grey, and sweating, and breathing in sips. They do not make a sound. They lie with the sheet between their teeth and look at the ceiling, which has, you suppose, stopped moving.'),
   K76V('(I have chosen that they should be in pain, so that they may know me sooner. I have dressed it as their interest. I am not certain whose it was.)'),
   N('You sit in the corridor until it is light, and count every breath that catches.')],cb)}},
  {t:'Leave it where it is',sub:'they will not hurt, and they will go on taking you for a gaoler',fn:()=>{S.f.e2lDose='held';save();say([
   N(k84SA()?'You tell her to leave it. She nods, and writes the hour.':'You take your hand off the clamp, and write the hour.'),
   N('They sleep, or near enough. The breath is even. The hand lies open. For some hours they are not in pain, and you stand at the glass and take that in, a tall shape in a doorway.'),
   K76V('(They will say thank you to me tomorrow, in that voice, and look at my hands. I have bought their comfort with it. I would make the same purchase again, and I should like it noted that I dislike the price.)')],cb)}}]));
(function(){try{if(typeof K84_POOLS==='undefined')return;K84_POOLS.mc.unshift({id:'d_line',fn:k91_line,mode:null});K84_POOLS.v.unshift({id:'d_dose',fn:k91_dose,mode:null})}catch(e){}})();

/* ===================================== THE POOL: MISAKI, CELL ===================================== */
k86('d_skip','m',null,'cell','The tray is there',[
 N('The tray is on the counter. It was not there. You were looking at the counter, and then it was there, with steam on it.'),
 N('You did not hear the door. You did not see him cross the room. There is a piece gone out of the afternoon, the size of a man walking four steps and back.'),
 M2('(he can come in without the door)','(he can come in without the door)'),
 M2('(no. it’s the stuff. it’s taking bits out. u blinked and it was ten minutes)','(no. it’s the stuff. it’s taking bits out. you blinked and it was ten minutes)'),
 N('That is worse. If he could walk through a wall, he would at least be somewhere. If the stuff is taking pieces out, then things can be done in the pieces, and you would be the last to know.'),
 N('You check. Your hand under the blanket goes over yourself, quickly, in order: the drip, the cast, the strapping, the drawstring. Everything is as you left it. You do it again an hour later, and again, every time you come back from a gap.')]);
k86('d_three','m',null,'cell','One, two',[
 N('You do it the way you always do it. On a roof, in a stairwell, in a cell: you count your way through.'),
 M2('(one: find out whose room this is)','(one: find out whose room this is)'),
 M2('(two: find the way out of it)','(two: find the way out of it)'),
 M2('(three: —)','(three: —)'),
 N('There is no three. You had it. It was a good one; it had a verb in it. You go back for it and one has gone as well, and you are lying on a bed with the number two and nothing either side of it.'),
 N('You have done this on four hours’ sleep with a man shooting at you. It is the only tool you have ever owned outright. The bag on the stand has taken it out of your hand as easily as he took the scope off your rifle.'),
 M2('(ok. ok. just the one, then. one: don’t let him see u can’t count)','(okay. okay. just the one, then. one: don’t let him see that you can’t count)')]);
k86('d_taste','m',null,'cell','The taste',[
 N('It is at the back of your throat when you swallow. A coin, held on the tongue. A battery.'),
 N('You know it. You have had it nine times, in the other building, and you can count them, because each one was the last thing before a gap.'),
 N('The tall one comes in and changes the bag. He hangs the new one, and turns the little wheel, and holds the tube up to the light to see that it runs. He is very careful about it. They were careful, too; they did not want to lose you.'),
 M2('(same taste. same bag. so it’s the same outfit. he’s not a new guy. he’s the one they answer to)','(same taste. same bag. so it’s the same outfit. he’s not a new guy. he’s the one they answer to)'),
 N('It comes together in your head with a click, all of it, like a magazine going home. He swore it. He wrote it down. He has the money. He bought the van, and the building, and now he has moved the goods to the house.'),
 N('It is the most sense that anything has made in a week. You are almost grateful to the bag for it.')]);
k86('d_two','m',null,'cell','There are two of him',[
 N('The tall one is at the door. He is also at the foot of the bed.'),
 N('They are the same height, in the same shirt. The one at the door has a tray. The one at the foot of the bed has nothing in his hands, and he is looking at you, and he does not have the careful face on.'),
 M2('(pick one. only one’s real. PICK)','(pick one. only one of them is real. pick)'),
 N('You watch the hands. The one with the tray keeps his where you can see them. The other one has his at his sides, and the fingers are moving, a little, as fingers do before they pick something up.'),
 N('The one at the door puts the tray down and says the day of the week. When you look back, there is nobody at the foot of the bed. There is a drip stand, and a coat that somebody has hung on it.'),
 M2('(it was the coat. it was a COAT. …he hung it there so i’d see it)','(it was the coat. it was a coat. …he hung it there so that i’d see it)'),
 N('The coat is gone when you next look. You do not know whether somebody took it or whether there was a coat.')]);
k86('d_late','m',null,'cell','His voice comes late',[
 N('He speaks, and it reaches you late. You see his mouth finish, and then the words come, low and dragged out, like a record with a thumb on it.'),
 N('You have to hold each one and wait for the next. By the time the sentence is all there, you have lost the front of it.'),
 K76V('The… door… opens… from… both… sides.'),
 N('Slowed down like that, it is not his voice. It could be anybody’s. It could be the one who called you sweetheart; he spoke slowly too, as you would to a child or a dog.'),
 M2('(what’d he say. something about the door. open. he said OPEN)','(what did he say? something about the door. open. he said open)'),
 N('You know what “open” meant, in the other building. You lie quite still and wait for the door to do it. It does not. He has gone, and you never saw him go, and the word is still in the room.')]);
k86('d_light','m',null,'cell','The green light',[
 N('The green light on the ceiling goes on and off. Every time it goes off, it leaves a thread of itself hanging in the dark, and the threads do not fade.'),
 N('By the middle of the night the ceiling is hung with them. They move when you breathe. Some of them have begun to join up.'),
 M2('(it’s the stuff. there’s NOTHING on the ceiling. it’s the stuff)','(it’s the stuff. there’s nothing on the ceiling. it’s only the stuff)'),
 N('You know that. You are an assassin; you have spent a hundred nights looking at one window, and you know what eyes do when they are tired. You tell yourself so, in a firm voice.'),
 N('The threads have made a shape. It is long, and it has shoulders. It is exactly as tall as the door.'),
 N('You pull the sheet over your face. You have not done that since you were small enough for it to work.')]);

/* ===================================== THE POOL: MISAKI, CLEAR ===================================== */
k86('d_bag','m',null,'clear','The bag is smaller',[
 N('The bag on the stand is a small one today. Yesterday’s came down to your elbow. This one is the size of a fist.'),
 N('The corners of the room have stopped where corners stop. When you turn your head, the wall is already there. You can hold a number, put it down, and find it again.'),
 M2('(oh. oh, there u are. hi, brain. where the fuck have u been)','(oh. oh, there you are. hi, brain. where the fuck have you been?)'),
 N('You read the label. A long word, a number, the hour, and two initials in fountain pen. Under them, in the same hand: NO SEDATIVES, underlined twice, hard enough to dent the paper.'),
 M2('(he wrote that. HE wrote no sedatives. and then pumped me full of this)','(he wrote that. he wrote “no sedatives”. and then he pumped me full of this)'),
 N('You look at the fist-sized bag, and at your hand in its cast, and you do the sum that you could not do for three days. It is not hard. It comes out to a man who would not have you put under, and could not have you screaming, and had nothing in between.')]);
k86('d_sort','m',null,'clear','Sort it',[
 N('You make two columns on the back of the chart. HAPPENED. DIDN’T.'),
 M2('happened: the tray. the hound at the door. him moving the drip stand so i didn’t have to turn over','happened: the tray. the hound at the door. him moving the drip stand so that i didn’t have to turn over'),
 M2('didn’t: two of him. the thing on the ceiling. him coming through the wall','didn’t: two of him. the thing on the ceiling. him coming through the wall'),
 N('It goes quickly at first. Then you get to the ones in the middle.'),
 N('Him at the foot of the bed with nothing in his hands. Him saying “open”. A coat on the drip stand. A hand that came at your face, fast, and stopped.'),
 M2('(don’t know. don’t know either. that last one felt real)','(don’t know. don’t know that one either. that last one felt real)'),
 N('There are nine that you cannot put in either column. You will never be able to. Three days of your life happened in a room with him in it, and for part of it you cannot say what he did, and neither of you will ever be able to prove it either way.'),
 M2('(i could ask him. he’d tell me. he’s got it written down with the time)','(i could ask him. he’d tell me. he’s got it written down, with the time)'),
 M2('(…and i’d have to take HIS word for what happened to me while i was out)','(…and i’d have to take his word, of all people’s, for what happened to me while i was out)')]);
k86('d_drugged','m',null,'clear','“u drugged me”',[
 N('You say it when he comes in with the tray. You have had it ready since the bag got small.'),
 M2('u drugged me','you drugged me'),
 K76V('Yes.'),
 M2('like THEY did','like they did'),
 K76V('Yes.'),
 N('You had expected him to argue. You had the next three lines ready for when he argued.'),
 K76V('It was for the ribs, and the hand. I would not have you sedated, and I would not have you in that much pain. There was nothing between the two that worked. I am aware that from inside the bag the reason does not show.'),
 M2('i thought u were them. for three days. bc of that','i thought you were them. for three days. because of that'),
 K76V('I know. I watched you think it. I could have ended it in a night by turning a wheel, and you would have paid for the night.'),
 M2('so u picked. for me. while i was out of it','so you picked, for me, while i was out of it'),
 K76V('Somebody had to. I would rather that it had not been a man with your name in a book.'),
 N('It is not an apology. He does not make them. But he stands there and lets you look at him for as long as you want, with his hands open, and you find that you want to for some time.')]);

/* ===================================== THE POOL: V ===================================== */
k86('d_weight','v',null,null,'By weight',()=>[
 N('A dose is reckoned by weight. You have the tables. You have used them for eleven years, for animals between twenty kilos and sixty.'),
 N(k84SA()?'The doctor reads the weight off the chart and does the sum aloud. You do it in your head beside her, from the other table, and you arrive at the same figure. It falls between the grey hound and the pale one.':'You do the sum yourself. They are on the chart at the grey hound’s weight less four pounds, and the figure falls in the table between her and the pale one.'),
 K76V('(I have a marksman in that bed whom I once thought the most dangerous person in the city. I am dosing them out of the column for a medium dog.)'),
 N('You draw it up. It is a small amount to look at. You have given the same to an animal with its jaw wired and watched it stop knowing where it was.'),
 K76V('(The hound did not know its own name on that dose. It knew me. It had no reason to fear what was holding the syringe.)'),
 N('You hang the bag. You set the rate. In the bed the eyes turn towards the sound, a little late, and settle on your hands.')]);
k86('d_eyes','v',null,null,'Their eyes',[
 N('The pupils are down to points. In that light they should be wide. You could not get a pin into them.'),
 N('You have looked into those eyes down the length of a lift, with a pistol under your chin. They were the quickest things you had ever seen. They went to your hand before your hand had moved.'),
 N('They come round to you now like something being wound. They arrive, and rest on your face, and there is nobody using them. Then they sharpen, by an effort that you can watch, and what they sharpen into is fear.'),
 K76V('(It is the only thing that gets through. Everything else in them is under the drip. The fear floats.)'),
 N('You say the day of the week. You say that the door opens. You watch the words go in, late, and you watch them turn into something else on the way.'),
 K76V('(I am speaking to them through the bag. Nothing that I say comes out the other side as I said it.)')]);
k86('d_chart','v',null,null,'Your own handwriting',[
 N('NO SEDATIVES. It is the top line of the chart, and you wrote it before the car had stopped.'),
 N('You knew what they would find in the blood. You have seen what those men use: it is cheap, and it is given by the cupful, by people who have never weighed anything. You wrote the line so that whatever was done in your house would be done to somebody awake.'),
 N('Under it, eleven lines down, in the same pen, is the rate for the drip. It is a large figure. You wrote that as well.'),
 K76V('(I forbade the one and prescribed the other within the same hour. I thought that I had made a distinction.)'),
 N('You look through the glass. They are lying with their eyes on the ceiling, following something across it.'),
 K76V('(A person on that table cannot tell which of my two lines is making the ceiling move. They know only that they were dosed in the last place, and that they are dosed in this one, and that in both there was a careful man with a bag.)')]);
k86('d_cost','v',null,null,'What the night cost',()=>S.f.e2lDose==='cut'||S.f.e2lDose==='kinked'?[
 N(S.f.e2lDose==='kinked'?'In the morning the bag is as full as you left it. The tube has a crease in it, at the height of an elbow. They lay on it all night.':'You brought the rate down by half. You sat in the corridor and heard the result.'),
 N('Seven hours. A breath taken in sips, and held, and let out through the teeth. Nothing else. No word, no call. Once, at about four, a single sound through the nose, cut off.'),
 K76V('(I have had men scream on that floor below for less. I thought poorly of them for it.)'),
 N('You go in at six. The sheet is wet through. There is blood on the hem of it, where it was in their mouth. Their eyes come to you at once, quick, and they are entirely present.'),
 N('They look at you as they looked at you in the lift. It is hatred, and it is fear, and after four days it is at last addressed to the right man.'),
 K76V('(There they are. I have missed being looked at like that. I should not have thought it possible to be glad of it.)')]:[
 N('You left the rate where it was. They have had four nights without pain.'),
 N('They have also had four nights of you. A tall thing at the glass. A hand that changes the bag. A voice that comes to them slowed and wrong, saying a day of the week.'),
 N('This morning they thanked you for the water, and asked, with great courtesy, whether they had done something to make the tray late. The tray was not late.'),
 K76V('(I have kept them comfortable. I have also kept them in that building, in their head, for four days longer than its owners managed.)'),
 N('You stand with your hand on the clamp for some time. They are asleep, and breathing easily, and the ribs move without catching.'),
 K76V('(I do not know that I chose rightly. I know that I chose the thing which I could bear to watch.)')]);
k86('d_ronin','v',null,null,'Ronin has seen the bag',[
 N('Ronin has been in the room. He comes out and shuts the door, and leans on it.'),
 [RN,'They’re high as a fuckin’ kite, Vee.'],
 K76V('It is for the pain.'),
 [RN,'I know what it’s for. I had it for my shoulder, I thought my truck was talkin’ to me. I’m sayin’ they don’t know what room they’re in.'],
 K76V('No.'),
 [RN,'They asked me if I worked here. ME. Asked real nice if I could put in a word.'],
 N('He rubs his face with both hands.'),
 [RN,'So lemme get this straight. They got took, they got doped, they got out. Now they’re on a table in the basement of the guy who swore he’d cut ’em up, doped again, with him standin’ over ’em holdin’ the bag.'],
 K76V('That is an accurate account.'),
 [RN,'And you’re wonderin’ why they think you’re the Devil.'],
 K76V('I am not wondering.'),
 [RN,'Good. ’Cause from in there, Vee, I’d fuckin’ think so too. And I LIKE you.']]);
k86('d_angel','v',null,null,'What they will remember',[
 N('Angel is in the kitchen with her hands round a cup that she has not drunk from.'),
 [AN,'Will they remember it? The things they’re saying. Thanking me. Asking if they’ve been good.'],
 K76V('Some of it.'),
 [AN,'Which?'],
 K76V('I cannot say. It is not chosen. They will have pieces, and they will not know which pieces are true.'),
 [AN,'So they could remember you doing something you never did.'],
 K76V('Yes.'),
 [AN,'And you couldn’t prove you didn’t.'],
 K76V('No. Nor would I ask them to accept my account of it. I am the last person whose account they should be asked to accept.'),
 N('She puts the cup down.'),
 [AN,'That’s the worst thing I’ve ever heard. You could do everything right in that room and they’d walk out with a memory of you that isn’t you.'],
 K76V('I have written the hour of every time that I went in, and what I did. It is in the green book in the counter drawer. It is not for me. It is so that there is something they may check, if they should ever wish to, that they need not ask me for.')]);
k86('d_taper','v',null,null,'The bag comes down',[
 N('On the third day it comes down. A smaller bag, a slower rate.'),
 N('It is not pleasant. They shake. The sheet is soaked by noon, and changed, and soaked again. They are sick twice, into the steel dish, and each time they look at you over the rim of it to see what it will cost them.'),
 K76V('It will pass by tonight. It is the drip leaving. Nothing is being done to you.'),
 N('You say it every hour. You cannot tell how much of it arrives.'),
 N('At about four the eyes change. It is as quick as a lamp. One moment they are on your hands, and the next they are on your face, and they are narrowed, and they know your name.'),
 K76MV('…ur honour?','…ur honour?','Your Honour?','Your Honour? Is that — what the fuck are you doing here?'),
 N('You find that you have sat down on the floor. You did not decide to. Your back is against the wall and your legs have gone.'),
 K76V('You are in my house. It is Thursday. The door opens from both sides.'),
 K76MV('u look like shit','you look like shit','You look like shit.','You look like shit. Have you been sitting there the whole time?'),
 K76V('(I have never been so glad to be insulted. I shall not tell them so. I shall not be able to tell them anything, for a minute or two.)')]);


/* ===================================== II · THE GREEN BOOK ===================================== */
function k91Green(){k77Go('#0b0c0a');k73Mark('e2l_green',1);const m=k76M(),f=S.f;
 const L=m?[
  N('There are things from the room that you cannot place. Him at the foot of the bed, with nothing in his hands. A coat. A hand coming at your face. You were full of the drip, and you do not know which of them happened.'),
  N('He has a green book. Every time he came through that door, he wrote the hour and what he did. Angel told you. He has not offered it. He would not; offering it would be asking you to believe him.'),
  N('You find it in the counter drawer of the room marked LAUNDRY, where it always was. You take it upstairs and put it on the kitchen island between you.'),
  M2('this is ur version','this is your version'),
  K76V('It is. It is only that. I wrote it at the time, and I have not altered a line. It is not evidence of anything except what I say that I did.'),
  M2('and if i read it and it doesn’t match what i’ve got','and if i read it, and it doesn’t match what i’ve got?'),
  K76V('Then you will have two accounts, and one of them is from a man with your name in a ledger. I should not advise you which to prefer.')]:[
  N('They come into the kitchen with the green book, and lay it on the island between you.'),
  N('You know what they want it for. There are days in that room for which they have only what the drip left them, and some of it is of you, and some of that never took place.'),
  K76MV('this is ur version','this is your version','This is your version.','So this is your version.'),
  K76V('It is. It is only that. I wrote it at the time, and I have not altered a line. It is not evidence of anything except what I say that I did.'),
  K76MV('and if it doesn’t match what i’ve got','and if i read it, and it doesn’t match what i’ve got?','And if I read it, and it doesn’t match what I’ve got?','And if I read it, and it doesn’t match what I’ve got in my head?'),
  K76V('Then you will have two accounts, and one of them is from a man with your name in a ledger. I should not advise you which to prefer.')];
 const read=()=>{f.e2lGreen='read';apply({aff:2});save();say([
   N(m?'He goes out. He goes right out, to the kennel, and you hear the hose start, so that you will know where he is while you read.':'You go out to the kennel and turn the hose on, so that they will know where you are while they read.'),
   N(m?'It is all there, by the hour. “06:00. Tray. They thanked me. Did not answer.” “11:40. Moved the drip to the left side. They will not turn over.” You go through it with your list beside it.':'They will be going through it with a list. You know what is on the list. You wrote the other half of it.'),
   N(m?'You find the one with the hand. “14:10. Blood at the mouth. Crossed the room too quickly. Stopped a foot short. They gave me the throat. My fault; I have a rule about speed and I broke it.”':'There is an entry at ten past two on the second day that you would give a good deal to have been able to leave out. You left it in.'),
   N(m?'So that one happened. He did come at you. And he wrote it down against himself, at the time, in ink, where you might one day read it.':'When you come back in, the book is shut on the island, and they are looking at you as they look at a roof they have not shot from before.'),
   K76MV('u put the bad one in','you put the bad one in','You put the bad one in.','You put the bad one in. The one with your hand.'),
   K76V('It occurred.'),
   K76MV('(seven of the nine are in there. two aren’t. so two were the drip. i’ll take that. i’ll take seven out of nine from HIM)','(seven of the nine are in there. two aren’t. so two were the drip. i’ll take that. i’ll take seven out of nine, from him)','(Seven of the nine are in there. Two aren’t. So two were the drip. I’ll take that. I’ll take seven out of nine, from him.)','(Seven of the nine are in there. Two aren’t, so two were the drip. I’ll take that. I’ll take seven out of nine, from him of all people.)')],hub)};
 const unread=()=>{f.e2lGreen='unread';apply({aff:1});save();say([
   N(m?'You put your good hand flat on the cover. You do not open it.':'They put the good hand flat on the cover. They do not open it.'),
   K76MV('no. i don’t want urs. i want mine. even with holes in it','no. i don’t want yours. i want mine, even with holes in it','No. I don’t want yours. I want mine, even with holes in it.','No. I don’t want your version. I want mine, even if it’s got holes in it.'),
   K76V('Then it goes back in the drawer. It is there whenever you wish, and you need never tell me that you looked.'),
   N(m?'He carries it down himself. You sit at the island with nine things that you will never be able to sort. They are yours. Nobody gave them to you, and nobody is going to tell you what is in them.':'You carry it down yourself and lay it in the drawer. They have chosen to keep nine things that they cannot sort, in preference to having them sorted by you. You find that you think the better of them for it, and that it does not make it any easier.')],hub)};
 say(L,()=>ask(K73Who(),m?'(Green cloth. His initials on the spine.)':'(They have not opened it.)',m?[
  {t:'Read it',sub:'his word, against your pieces',fn:read},{t:'Give it back unopened',sub:'keep your own, holes and all',fn:unread}]:[
  {t:'Offer to go out while they read',fn:read},{t:'Tell them that it is only your account, and wait',fn:unread}]))}
(function(){try{if(typeof K73B==='undefined'||typeof k76Card!=='function')return;const at=id=>K73B.findIndex(b=>b.id===id);
 const b={id:'e2l_green',t:()=>k76H('The green book, from the counter drawer','They have brought you the green book'),sub:()=>'costs time · what happened, and what was the drip',
  when:()=>['after','act2'].includes(S.phase)&&k73Done('e2l_room')&&k73Fresh(),run:function(){return k76Card('e2l_green',()=>k91Green())}};
 const i=at('e2l_marks');K73B.splice(i<0?K73B.length:i,0,b)}catch(e){}})();

/* ===================================== ENDINGS ===================================== */
const _xe91=extraEnding;extraEnding=function(){const L=_xe91();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,F=f.e2l85||{};
 if(f.e2lDose==='cut')L.push('V wrote NO SEDATIVES on Misaki’s chart, and then a rate for the pain relief that took their judgement as surely. On the first night he halved it. They did not make a sound, and they knew him a day sooner.');
 else if(f.e2lDose==='held')L.push('V wrote NO SEDATIVES on Misaki’s chart, and then a rate for the pain relief that took their judgement as surely. He left it running. They were not in pain, and for those days they took him for a gaoler.');
 else if(f.e2lDose==='kinked')L.push('On the first night in the infirmary Misaki lay on the drip line until morning, to get their head back. It was the worst night of the week, and they chose it.');
 if(F.d_sort)L.push('There are nine things from the infirmary that Misaki can put in neither column: happened, or didn’t. V has the hour of every visit written in a green book. They have never asked to see it.');
 if(F.d_drugged)L.push('“You drugged me.” “Yes.” “Like they did.” “Yes.”')}catch(e){}return L};
/* ===KC91-END=== */
