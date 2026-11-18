/* ===KC94-BEGIN=== */
/* ===================== THE WAR: THE THOUGHT, AGAIN (kc94) =====================
   The author's direction: show that both of them are deeply conflicted during the infirmary, V above all. He thinks
   of killing them more than once, and each time the thought sickens him.
   kc73 has one such scene (the dinner, the sink). This module makes it a sequence. It is ordered, so it is not in the
   rotating pool: while kdMed(), the side menu has a second free entry, one scene a slot.
     V:      ⚔ The thought   seven scenes, in order (S.f.e2l94V counts them). It arrives by a different door each
             time: the law; mercy; anger; the hands, by habit; a throat offered; the tidy book; and once more when they
             are themselves again. Each time he gets a little way, and each time his body refuses before he does.
             He is never talked out of it and never reasons his way out. He despises them throughout.
             Choice in the sixth: S.f.e2lTotal blot|T.
     Misaki: ⚔ What you want   three scenes while the room is a cell, two once clear (S.f.e2l94M, S.f.e2l94X).
             They want him dead and need him alive. They want it over and do not want to die. They cannot find the
             hatred and cannot afford to lose it. Once clear: they owe him, and want him to go on wanting them dead,
             because the alternative is pity.
   The war page (kc76) shows the count for V.
   Nothing here touches the hours, and the doctor does not appear: the same text under both aftermath settings.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc94.md. Test: node tools/k94_test.js */
const K94=()=>{try{return typeof K93==='function'&&K93()}catch(e){return false}};

/* ===================================== V: THE THOUGHT ===================================== */
const K94_V=[
 /* 1 · the law */
 cb=>say([
  N('It comes first as a matter of business. You are at the desk with the ledger open, bringing the week up to date, and you reach their page.'),
  N('TO BE KILLED. It is your hand, and your ink. Every other line in the book that says so has a date beside it, and a total, and the two are never more than a season apart.'),
  K76V('(It is due. It has been due since April. The debtor is under my roof, and cannot lift the left hand.)'),
  N('There is nothing in it. No heat. It is as it is when a bill comes in. You take the scalpel out of your collar and lay it on the page, across their name, as you would lay a paper-knife on a letter that wants answering today.'),
  N('You get up. You have done this forty-one times; the body knows the order. The coat. The cellar key. The back stair, because it is quieter.'),
  N('You reach the head of the back stair, and your legs stop.'),
  N('It is not a decision. You tell them to go on, and they do not go. You stand with one hand on the rail, perfectly well, perfectly clear in your mind, and you cannot get your foot onto the first step. Then the cold comes up from your stomach all at once, and you have to sit down where you are, on the top stair, with your head between your knees.'),
  K76V('(I am not ill. I ate at seven. There is nothing the matter with me except that I was on my way to do a thing that I have every right to do.)'),
  N('You sit there for a quarter of an hour. When you can stand, you go back to the study, and put the scalpel in your collar, and find that you have left a faint line across their name where the edge lay.')],cb),
 /* 2 · mercy */
 cb=>say([
  N('The second time it comes dressed as kindness, and that is harder.'),
  N('They are asleep. It is the first real sleep in three days; the breath is slow, and the hand is open. In an hour they will wake, and for one second they will not know which building, and you will watch all of it come back into their face.'),
  N('You have put down animals. You have done it for four of the eleven, when there was nothing left for them but more of the same. You did it with your own hand, quickly, while they slept, and you never thought it anything but the last decent thing in your power.'),
  K76V('(A quick death is a mercy. I have always said so. One is not cruel to a thing by sparing it the rest.)'),
  K76V('(They would never know. They would go from this, the breath, the open hand, to nothing. They would not have to wake in that second again. Not tomorrow, and not on any of the nights for the rest of their life.)'),
  N('You are standing at the bed. You do not remember crossing the four steps. Your hand is a few inches above the place under the jaw, and it is quite steady, and what is in you is so like tenderness that for a moment you cannot tell them apart.'),
  N('Then you hear it. It is the voice that you use for the hounds, at the end. You have never used it on a person. You have never needed a voice for people; you had the law.'),
  K76V('(I am telling myself that it is for them. A hound cannot be asked. This one can be asked, and I know what the answer would be, and I was about to arrange not to hear it.)'),
  N('You get out of the room. You are sick in the corridor, on the stone, on your knees, making as little noise as you can, with your sleeve across your mouth. The old hound comes and stands over you until it has passed.'),
  K76V('(That was the worst of them. The law at least does not pretend to be fond of anybody.)')],cb),
 /* 3 · anger */
 cb=>say([
  N('The third time it is rage, and it comes out of nowhere, over a bowl.'),
  N('They have thanked you for the soup. They have said that it was very good, and that they are sorry to be a trouble, in that voice, with their eyes on your hands.'),
  N('You swore to kill a person. You had a file on them. They were loud, and foul, and they put a round past your ear and called you “your honour” in front of everybody you know. You have never in your life been so thoroughly despised by anything, and you had come to rely on it.'),
  K76V('(This is not that person. It has their face. Somebody has taken my enemy and left me this in the bed.)'),
  N('And the thought is simply there: kill it. Not them. It. The polite thing. Put it out, so that you need not look at it another day, saying thank you with that mouth.'),
  N('Your hand has closed on the edge of the tray, hard enough that the bowl is ringing against the spoon. They have heard it. They have gone quite still.'),
  K76V('(I want to destroy the evidence. That is what this is. I cannot bear what was done to them, and so I should like to do away with the place where it shows.)'),
  N('You carry the tray out. You get as far as the scullery, and then you throw the bowl at the wall. You have not broken a thing in anger since you were a boy. You stand looking at it, and your hands are shaking, and there is a taste in your mouth like metal.'),
  N('You pick up every piece. You do not waste. There is nothing to be done with the pieces of a bowl, and you stand holding them for some time.')],cb),
 /* 4 · the hands */
 cb=>say([
  N('The fourth time you do not think it at all. Your hands do.'),
  N('You are changing the dressing on the wrist. You have the forearm across your palm, turned up, and your thumb has come to rest on the pulse. It is where your thumb always rests. You have held perhaps a hundred wrists like this.'),
  N('You are thinking about the gauze. And your left hand shifts its grip, a quarter turn, and draws the wrist out straight, and pins it lightly at the heel: so. It is the hold. It is how one presents an arm to the blade. Your right hand has already gone to your collar.'),
  N('You look down, and you see what you are doing, and for a moment you cannot let go, because you do not seem to be the one holding on.'),
  K76V('(I was not there. I was thinking about gauze. The hands began it by themselves, as a man’s feet will take him home.)'),
  N('They have felt it. They know a hold. Their eyes have gone to your right hand, at your collar, and then up over your shoulder to the place where they go.'),
  N('You put the arm down on the blanket. You do it very slowly. You back away, your four steps, with both hands held out from your sides, and you get the door open with your elbow.'),
  N('In the scullery you run the tap until it scalds, and hold your hands under it. You hold them there until the skin is red. You would like to be sick; it would be something. There is only a coldness, and a sense that you are standing a little to the left of yourself.'),
  K76V('(I have made these hands into a thing that does it without me. I was proud of that. I called it skill.)'),
  N('You ask Ronin to do the next dressing. You tell him that you have burned yourself. It is true, by then.')],cb),
 /* 5 · the throat */
 cb=>say([
  N('The fifth time, it is offered.'),
  N('You drop a kidney dish. That is all. It rings on the tile, and when you turn round they are on their back with their hands open beside their head and their chin up. The throat is bare, from the jaw to the collar of your T-shirt, and there is a pulse going in it that you can see from the door.'),
  N('You have hunted. Not as Ronin does, for the pleasure. But you have stood over forty-one things at the moment that they stopped resisting, and there is something in a man older than his law that knows what that moment is for.'),
  N('It goes through you whole. It is not a thought. It is in the mouth, and behind the knees. Take it. It is there. It has been put there for you.'),
  K76V('(I have a foot forward. I have moved. I am one step inside my own rule, and I did not give the order.)'),
  N('You stop. You stand with one foot in front of the other, like a dog on a point, and the room is very clear and bright, and you can smell them.'),
  N('Then it is over, and what comes after is the worst thing that you have felt in that house. It is not that you thought of it. You have thought of it four times. It is that some part of you leapt.'),
  N('You do not get as far as the corridor. You are sick in the kidney dish, on your knees, on their floor, in front of them. You have never let them see it. They are watching you from the pillow, upside down, with their chin still raised, and you can see them trying to work out what the gaoler is doing.'),
  K76V('(They will think that it disgusts me to look at them. I cannot tell them that it was the other thing. I cannot tell them that for one second I wanted it, and that I should sooner have my hands off at the wrist.)')],cb),
 /* 6 · the tidy book */
 cb=>say([
  N('The sixth is the quietest. It is two in the morning, and you are balancing the book.'),
  N('You do it at the turn of every month. Each page is ruled off and the total entered. A page without one is a thing left undone, and you have never had one. It is the whole use of the book: that nothing in it is left open.'),
  N('Their page is open. It has been open for a fortnight. You have turned past it nine times tonight, and each time the eye catches on it, as the tongue goes to a broken tooth.'),
  K76V('(Ronin is asleep in the corridor. Angel went home at midnight. Hale has been told that I have not seen them. There is a furnace, and four hounds, and nobody in this city who would ask.)'),
  K76V('(I should have a clean book by morning. I should be able to turn the page.)'),
  N('It is so reasonable. That is what is frightening about it. It asks nothing of you but ten minutes and the habit of a lifetime. You pick up the pen, and you set the nib to the foot of the page, and you write the first stroke of the word.'),
  N('It is the upright of a T. You look at it. It is a centimetre of ink.'),
  N('Your stomach turns over. The study goes grey at the edges. You have to put your free hand flat on the desk to stay in the chair, and there is sweat running down inside your collar, and you are looking at one black stroke as though it were the worst thing that you have ever done.'),
  K76V('(I have killed forty-one and slept. I have drawn one line, and I cannot breathe.)')],
  ()=>ask('K9','(One stroke, at the foot of their page.)',[
   {t:'Blot it out',fn:()=>{S.f.e2lTotal='blot';save();say([
    N('You press the blotter down on it while it is wet, and drag. It makes a grey smear the width of your thumb.'),
    N('It is the only blot in the book. In eleven years, on four hundred pages, there is not another mark that you did not intend. You sit and look at it until the sickness has gone, and it is some time before you understand that you are looking at it with relief.'),
    K76V('(I have spoiled the book. I find that I should rather have a spoiled book.)')],cb)}},
   {t:'Leave the stroke, and close the book',fn:()=>{S.f.e2lTotal='T';save();say([
    N('You leave it. You do not cross things out, and you do not blot. You close the book on a wet line, so that it prints itself, faintly, on the facing page.'),
    N('It will be there every time that you open it. One upright stroke, at the foot of their page, with nothing after it. The beginning of a word.'),
    K76V('(Let it stand. It is an accurate record. I began, and I could not go on, and anybody who reads this book ought to know both.)')],cb)}}])),
 /* 7 · once more */
 cb=>say([
  N('The seventh time, they are themselves.'),
  N('They know the house. They know you. They have told you that your soup is shit and your sign is stupid, and this morning they looked you in the face, in place of your hands, and called you “your honour”, and meant every letter of it.'),
  N('So now it would be fair. That is the thought. For a fortnight you could not, because there was nobody there to do it to: only a polite voice, and a hand that offered itself. You could not kill that. No law that you ever wrote would have let you.'),
  K76V('(But this is the one in the book. Awake, and foul-mouthed, and knowing exactly who I am. This is the person I swore it of. If it was ever to be done, it would be now, and it would be clean.)'),
  N('You wait for it to take hold. You stand in the doorway with the tray, and you look at them, propped up on three pillows, with a pink star on each fingernail, scowling at you.'),
  N('It does not take hold. There is the thought, quite complete, and there is nothing under it. It is like a word that you have said too many times.'),
  N('What comes is the sickness, without the wanting. A plain, dull turning of the stomach, as at the smell of something that has gone off. You have had it six times in this house and you know it now. You put the tray down and wait for it to pass.'),
  K76MV('what. WHAT. u look like ur going to puke. is it my face','what? you look like you’re going to puke. is it my face?','What? You look like you’re going to puke. Is it my face?','What? You look like you’re going to throw up. Is it my face? It’s my face, isn’t it.'),
  K76V('It is not your face.'),
  K76V('(Seven. I have counted them. I count everything. Seven times in this house I have set out to do what is written, by seven roads, and each time my own body has stopped me at the door like a servant who knows better.)'),
  K76V('(I despise them. Every line of the file is true. I do not think that I shall ever be able to do it, and I do not know what I am if I cannot.)')],cb)];

/* ===================================== MISAKI: WHAT YOU WANT ===================================== */
const K94_M=[
 /* cell 1 · dead, and alive */
 cb=>say([
  N('You want him dead. That has not changed. It is the oldest thing in the room; you brought it in with you.'),
  N('You go through it, as you would for any mark. He kneels, twice a day, with his neck level with the bed. There is a knife on the tray. The drip stand would do, if you could lift it. You have killed men with less, and in worse light.'),
  M2('(so. he’s dead. he’s on the floor. then what)','(so. he’s dead. he’s on the floor. then what?)'),
  N('Then there is a door that you have never tried, in a building that you do not know, with four hounds in it that eat people. There is a drip that nobody will change. There is no water, after the cup that he brought.'),
  M2('(then nothing. then i’m in a room with a body till the next one comes. and the next one won’t kneel)','(then nothing. then i’m in a room with a body until the next one comes, and the next one won’t kneel)'),
  N('You need him. That is the sum, and it comes out the same each time. The one thing in this place that stands between you and whatever is worse is the man you have sworn to kill.'),
  N('You want him dead, and you listen for his step. You hate the sound of it, and when it is late your mouth goes dry. Both of those are true in the same minute, and you lie there with one in each hand.'),
  M2('(pick one. u can’t want both. PICK)','(pick one. you can’t want both. pick)'),
  N('You cannot pick. You have never before been unable to decide whether to kill somebody. It was the one question that you could always answer.')],cb),
 /* cell 2 · over */
 cb=>say([
  N('You want it over. You are tired. You have been ready for nine days, counting the other building, and nobody can stay ready for that long.'),
  N('He wrote slow. He showed you. So it is coming, and every hour that it does not come is an hour of lying here with your jaw set. You have begun to think that the waiting is the first part of it. That it has already started, and this is what it is.'),
  M2('(just DO it. come in and do it. i’ll hold still. i’ve got a place to go, i’ve got the roof)','(just do it. come in and do it. i’ll hold still. i’ve got a place to go; i’ve got the roof)'),
  N('You mean it. You lie there meaning it for an hour. It would be a relief; you would know where you were.'),
  N('Then there are steps in the corridor. Hard soles, coming on, not hurrying.'),
  N('Everything in you gets up at once. Your heart is going like something in a trap. You do not want it. You do not want it today. You have rent due, and a cactus, and you never saw the coast.'),
  M2('(not now. not now. tomorrow. i’ll be ready tomorrow)','(not now. not now. tomorrow. i’ll be ready tomorrow)'),
  N('The steps stop at the door. He comes in, with a tray. It is soup. He sets it down, and says what day it is, and goes.'),
  N('You lie there shaking with relief, and under the relief, as it goes out, there is something that is very nearly disappointment. You asked for it. You begged a door for it. And when it came down the corridor you would have given him anything he liked to turn round.')],cb),
 /* cell 3 · the hatred */
 cb=>say([
  N('You swore to kill him. You did it in front of everybody. You told him that you would do it somewhere stupid, and you meant it; you have never meant anything more.'),
  N('You go looking for that. You want to hold it for a minute. It was yours, and nearly nothing in here is.'),
  N('It is thin. You can find the words. “Ur honour.” “A car park.” You can remember saying them. But the heat that was under them has gone somewhere, and what is left is like the outline of a thing on a wall after it has been taken down.'),
  M2('(he’s a rich hypocrite who cuts people up and calls it law. come on. COME ON. u know this one)','(he’s a rich hypocrite who cuts people up and calls it law. come on. come on. you know this one)'),
  N('You do know it. It is all true. It will not catch. It is hard to hate a man properly when you are lying down, and he is the one with the water.'),
  N('That frightens you more than the table. If the hatred goes, then he has had that as well. Then there is nobody left in here but the one who says thank you, and that one would walk down to the cold room on its own feet and ask where to lie.'),
  M2('(keep it. i don’t care if it’s fake. say it till it’s real. ur honour. ur honour. i’m going to kill u somewhere stupid)','(keep it. i don’t care if it’s fake. say it until it’s real. your honour. your honour. i’m going to kill you somewhere stupid)'),
  N('You say it, under your breath, to the green light, forty times. It is the nearest thing that you have to a prayer. You are asking to be allowed to go on wanting him dead.')],cb)];
const K94_X=[
 /* clear 1 · owing */
 cb=>say([
  N('He carried you out of that building. He washed your hand. He knelt on a tile floor, twice a day, to put down a tray, and you held a knife to his neck, or thought about it, and he gave it back.'),
  N('He also wrote your name in a book under TO BE KILLED, and sent you forty minutes of what that means.'),
  N('You are clear now, and you would like one of those to be the real one. You have turned them over all morning. They are both him. There is no other man behind either; you have looked.'),
  M2('(i owe him. i OWE him. i’d rather owe the landlord. i’d rather owe the men in the van)','(i owe him. i owe him. i’d rather owe the landlord. i’d rather owe the men in the van)'),
  N('The worst of it is that you would like to thank him. Properly. Once, in your own voice, for the hand. It is the sort of thing that you would say sideways, and follow with an insult, and he would say something stiff.'),
  N('You cannot. You said thank you to him forty-one times in the good voice, to a gaoler, for soup. You have used the words up. If you said them now, he would not be able to tell which of you was speaking, and neither would you.'),
  M2('(they even got that. the one time i actually mean it and it’s the one thing i can’t say)','(they even got that. the one time that i actually mean it, and it’s the one thing that i can’t say)'),
  N('He comes in at noon. You tell him that his shoes are too loud and that he walks like a hearse. He says that the shoes are deliberate. You look at each other, and you think that he has very possibly understood, and you would die before you asked.')],cb),
 /* clear 2 · the car park */
 cb=>say([
  N('You run the old job. You have not looked at it since the first week.'),
  N('A car park. Level three, by the stairwell, where the light is out. You are on the roof across the street. He comes out of the lift with the grey hound on a short lead, and stops to find his keys, and you have him for four seconds.'),
  N('You do the wind. You do the distance. You have done this a hundred times in your head, lying on the laundromat roof, and it always ended the same way, and you always went for noodles.'),
  N('He stops to find his keys. And he goes down on his left knee, and puts something on the ground, and turns his head a little to the right.'),
  M2('(no. he doesn’t kneel in the car park. that’s the wrong one. start again)','(no. he doesn’t kneel in the car park. that’s the wrong one. start again)'),
  N('You start again. He comes out of the lift. He stops. He kneels. You cannot keep him standing up. You have the crosshair on a man who is setting down a tray.'),
  M2('(i can’t shoot a guy who kneels. what the FUCK. he’s wrecked it. he’s wrecked my car park)','(i can’t shoot a guy who kneels. what the fuck? he’s wrecked it. he’s wrecked my car park)'),
  N('You are furious. It was yours; you had it worked out to the metre. You lie there with your good hand in a fist.'),
  N('And under that, there is the other question, and you make yourself look at it. Does he still mean to? You find that you hope so. You do not want to die. But if he has stopped, if he looked at what came out of that building and crossed you off, then you are not an enemy any more. You are a thing that he was sorry for.'),
  M2('(i’d rather he wanted me dead. at least that’s for something i did)','(i’d rather he wanted me dead. at least that’s for something i did)')],cb)];

/* ===================================== DELIVERY ===================================== */
const k94Key=()=>S.day+'/'+(S.slot||0);
const k94Next=()=>{try{if(!K94()||typeof kdMed!=='function'||!kdMed())return null;const f=S.f;if(f.e2l94Slot===k94Key())return null;
 if(S.pov==='v'){const i=f.e2l94V||0;if(i>=K94_V.length)return null;if(i===K94_V.length-1&&S.kd&&S.kd.med&&(S.kd.med.clar||0)<2&&(S.kd.med.d||0)<2)return null;return {fn:K94_V[i],key:'e2l94V',i,bg:'#050507'}}
 if(kdClar()<2){const i=f.e2l94M||0;return i<K94_M.length?{fn:K94_M[i],key:'e2l94M',i,bg:'#0b0908'}:null}
 const i=f.e2l94X||0;return i<K94_X.length?{fn:K94_X[i],key:'e2l94X',i,bg:'#1a211f'}:null}catch(e){return null}};
function k94Run(){const e=k94Next();if(!e)return hub();S.f[e.key]=e.i+1;S.f.e2l94Slot=k94Key();save();go(cutBg(e.bg));e.fn(hub)}
const k94Label=()=>{const f=S.f;if(S.pov==='v'){const n=f.e2l94V||0;return {t:'⚔ The thought'+(n?', again':''),sub:'free · '+(n?'it has come '+n+' time'+(n===1?'':'s'):'it is in your own handwriting')}}
 return {t:'⚔ What you want',sub:'free · '+(kdClar()<2?'in a room with one door':'now that you know whose room it is')}};
const _sh94=sideHub;sideHub=function(late){const o=_sh94(late);try{if(S&&k94Next()){const L=k94Label();o.push({t:L.t,sub:L.sub,fn:k94Run})}}catch(e){}return o};

/* ===================================== ENDINGS ===================================== */
const _xe94=extraEnding;extraEnding=function(){const L=_xe94();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,n=f.e2l94V||0;
 if(n>=7)L.push('Seven times, while Misaki lay in the infirmary, V set out to do what was written in his book: for the law, for mercy, in anger, by habit, at an offered throat, to balance a page, and once when it would at last have been fair. Seven times his own body stopped him at the door.');
 else if(n>=2)L.push('While Misaki lay in the infirmary, V set out '+n+' times to do what was written in his book. Each time he was sick before he reached the door.');
 if(f.e2lTotal==='blot')L.push('There is one blot in V’s ledger, at the foot of Misaki’s page, the width of a thumb. He made it on purpose.');
 else if(f.e2lTotal==='T')L.push('At the foot of Misaki’s page in V’s ledger there is one upright stroke: the beginning of a word, with nothing after it.');
 if((f.e2l94M||0)>=3)L.push('In the room they took for a cell, Misaki said “I’m going to kill you somewhere stupid” forty times to a smoke detector, so as not to lose the wanting of it.');
 if((f.e2l94X||0)>=2)L.push('Misaki cannot run the car park job in their head any more. He kneels in it.')}catch(e){}return L};
/* ===KC94-END=== */
