/* ===KC84-BEGIN=== */
/* ===================== THE WAR: WHAT WAS DONE, AND HOW (kc84) =====================
   More infirmary on the enemies-to-lovers route, written separately for the two aftermath settings (kdSA(), kc36).
   Needs kc73, kc76–kc83.

   FULL STORY (the strand that "injuries only" hides). kc29's rules hold without exception:
     - what happened in the hours is never named, by Misaki, by V, by the doctor or by the narration;
     - Misaki knows, and so does V; the honest option is on every menu and always greyed (KD_NO);
     - every pretence is a kdDeny(); V can decline to force it and cannot make them;
     - nobody tells Angel or Ronin; no text shows V knowing anything Misaki has said to the doctor.
     On this route it has an extra edge: the man who knows is the man with forty pages on them, who swore to kill them
     slowly. Misaki cannot bear that he has it. V keeps a steel table for the kind of man who does that, and had
     meant to put Misaki on the same table.
   INJURIES ONLY. kc36's rules hold: no denial and no doctor; V does the treatment; Misaki names each injury flatly
     and does not care, because none of it is new to them. What is new here is V: he finds the injuries, and the way
     they were inflicted, disgusting, in spite of himself. He joints men for cause, in order. This was done badly, to
     no purpose, by men who were bored, and he cannot keep hold of the difference between that and his own trade.

   Delivery: this module replaces kc80's scheduler (k80MedScene) with one that orders scenes by id and by setting, and
   gives Misaki the late-night slot as well, so that the stay has room: S.f.e2l84 {id:1}.
     Misaki, cell:  ask (first: it must precede kc73's evening scene) · rules · [s_clothes | i_wrists] · hound · [s_asks | i_careful] · hand
     Misaki, clear: [s_book | i_snob] · said · thanks · doctor (full story only)
     V:             message · [s_table | i_manner] · file · form (full story only) · [s_voice | i_third] · hand · ronin ·
                    [s_vent | i_scale] · laugh
   Beat: e2l_marks (chapter II, free), a version for each setting.
     full story:    the hot water runs out                         S.f.e2lMarks boiler|towels
     injuries only: the pins come out; "it is a different trade"   S.f.e2lMarks same|differ
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc84.md. Test: node tools/k84_test.js */
const K84=()=>{try{return typeof K83==='function'&&K83()}catch(e){return false}};
const k84SA=()=>{try{return typeof kdSA!=='function'||kdSA()}catch(e){return true}};
const k84No=(t,why)=>typeof KD_NO==='function'?KD_NO(t,why):{t,sub:why||'they are not going to',dis:true,fn:()=>{}};
const k84Deny=()=>{try{if(typeof kdDeny==='function')kdDeny()}catch(e){}};

/* ===================================== FULL STORY: MISAKI ===================================== */
const k84_s_clothes=cb=>say([
  ['','The tall one brings clothes. A grey T-shirt, far too big, and soft trousers with a drawstring. He puts them on the end of the bed, folded, and says that he will be outside.'],
  ['','The clothes you came in are not on the chair. They were not yours either. You know that, and you have put it somewhere you do not look.'],
  ['','He goes out, and he shuts the door. You hear him walk away from it, down the corridor, loudly, all the way to the end.'],
  K76MV('(one: he left. two: he shut the door. three: they don’t do that. they don’t leave when u—)','(one: he left. two: he shut the door. three: they don’t do that. they don’t leave when you—)','(One: he left. Two: he shut the door. Three: they don’t do that. They don’t leave when you—)','(One: he left. Two: he shut the door. Three: they don’t do that. They don’t leave when you—)'),
  ['','You stop the sum there. It was going to come out to something, and you do not need it to.']],
  ()=>ask('hitmeuppp','(The door is shut. He is at the far end of the corridor.)',[
   k84No('Finish the sum. Work out why that surprised you.'),
   {t:'Change, fast, facing the door',fn:()=>{k84Deny();say([
    ['','You change in about nine seconds, facing the door, with the good hand. The T-shirt comes to your knees. It smells of soap, and of nothing else, and you notice yourself checking.'],
    K76MV('(it’s a rule. this one leaves. fine. it doesn’t mean anything. it’s a rule)','(it’s just a rule. this one leaves the room. fine. it doesn’t mean anything)','(It’s just a rule. This one leaves the room. Fine. It doesn’t mean anything.)','(It’s only a rule: this one leaves the room. Fine. It doesn’t mean anything.)')],cb)}}]));
const k84_s_asks=cb=>say([
  ['','The tall one does your hand. He will not do anything else. A woman in a grey cardigan does the rest, and he waits in the corridor while she does it, with the door shut.'],
  ['','When he has to reach the drip, he says: “I need to move the blanket by the width of a hand. May I?”'],
  K76MV('(he asked. the tall one ASKED. new rule: this one asks)','(he asked. the tall one asked. new rule: this one asks first)','(He asked. The tall one asked. New rule: this one asks first.)','(He asked. The tall one asked me. New rule: this one asks first.)'),
  ['','Then the other thought comes up under it, cold, in the voice you use on a roof: the ones who ask are the ones who want to hear you say yes.']],
  ()=>ask('hitmeuppp','(He is waiting, with his hand a foot from the blanket.)',[
   k84No('Say no. Find out whether it works.'),
   {t:'Say yes',fn:()=>{k84Deny();say([
    k80Gone()?['','You nod, and keep nodding, to anything.']:K76MV('yes. sure. whatever u want','yes. sure. whatever you want','Yes. Sure. Whatever you want.','Yes. Of course. Whatever you want.'),
    ['','He does not move the blanket. He stands there with his hand in the air for a moment, and then he goes and fetches the woman in the cardigan to do it, and waits outside.'],
    K76MV('(wrong answer?? how is yes the wrong answer)','(wrong answer? how is yes the wrong answer)','(Wrong answer? How is yes the wrong answer?)','(Was that the wrong answer? How can yes be the wrong answer?)')],cb)}}]));
const k84_s_book=cb=>say([
  ['','It is V’s house, and the tall one is V. You have had that for a day. This morning the rest of it arrives.'],
  ['','He carried you out of that building. He saw what you had on. He is a man with forty pages on you, who writes everything down, in ink, with the date.'],
  K76MV('(he’s got it. it’s in the book. he’s got a line for it, in fountain pen, under my name)','(he’s got it. it’s in the book. he has a line for it, in fountain pen, under my name)','(He’s got it. It’s in the book. He has a line for it, in fountain pen, under my name.)','(He has it. It’s in the book. He has a line for it in fountain pen, under my name, with the date.)'),
  ['','Of everybody in this city, the one who knows is the one who swore to kill you. You can think of nothing he could do to you on a steel table that is worse than him having that written down.'],
  ['','When he brings the tray, you ask him. You ask it sideways.'],
  K76MV('what’d u write. in the book. about the river','what did you write in the book? about the river','What did you write in the book? About the river.','What did you write in the book, V? About the river.'),
  K76V('The date. The address. That you were recovered alive.'),
  K76MV('that’s all','that’s all?','That’s all?','That’s all?'),
  K76V('That is all that I will ever write of it. The rest does not belong to my book. It is yours, and I have no claim on it.')],
  ()=>ask('hitmeuppp','(He has put the tray down. He is looking at the wall.)',[
   k84No('Ask him what he saw.'),
   {t:'“good. bc there’s nothing else to write”',fn:()=>{k84Deny();say([
    K76V('As you say.'),
    ['','He says it without any weight on it at all. You have heard him lie to a board of directors, in Angel’s videos, and he was much better at it then.'],
    K76MV('(he KNOWS. and he’s not going to use it. why isn’t he going to use it)','(he knows. he knows, and he’s not going to use it. why isn’t he going to use it)','(He knows. He knows, and he’s not going to use it. Why isn’t he going to use it?)','(He knows. He knows, and he’s not going to use it. Why is he not going to use it?)')],cb)}},
   {t:'“cool. whatever. soup’s cold”',fn:()=>{k84Deny();say([
    K76V('I will warm it.'),
    ['','He takes the bowl away and warms it, and brings it back, and does not once look at you below the chin. You notice that he never has, not since you knew him. You had put it down to manners.']],cb)}}]));

/* ===================================== FULL STORY: V ===================================== */
const k84_s_table=cb=>say([
  ['','The doctor has told you nothing. She is not permitted to, and you would think less of her if she did.'],
  ['','She has asked you for a camera, a ruler, a card to write the date on, a white box that seals, and a lock for the small fridge. You have been at this work for eleven years. You know what that list is for.'],
  ['','Your book has had four men in it for whom you kept the steel table and did not hurry. You know what they do, because you have read the files. You know what it looks like afterwards, because you have sat with the people it was done to while they did not say it.'],
  K76V('(I wrote SLOW at the top of their page. I meant the cold room. I meant the straps.)'),
  K76V('(I would have had them where those four were. One more room in which they could not have said no, and I would have called it law.)'),
  ['','You go up to the study and take the plan out of the drawer: the trailer from the air, their week in columns, the three ways. The plan is not the book. You are permitted to burn a plan.'],
  ['','You burn it in the grate, a sheet at a time, and hold each one until it reaches your fingers.']],cb);
const k84_s_voice=cb=>say([
  ['','They thank you for the water. It is the pleasant voice, the careful one, with the eyes on your hands.'],
  ['','You have despised that voice for three days. You took it for cowardice, in a killer who never once showed any on a roof.'],
  K76V('(It is not cowardice. It is a method. It is what one says, and how one holds the face, so that the one with the keys will be finished sooner.)'),
  K76V('(They learned it in four days in that building. Or they have had it since before they could write a month on a form, and took it out again when it was needed. I cannot tell which, and I find that I cannot bear either.)'),
  ['','By your law, what is done is owed back to those who did it, in kind. You have names for some of them, and you will have the rest.'],
  K76V('(And that settles one account. There is another, and nothing I take out of those men will go back into them. The book is for eyes and for hands. It has no column for this.)'),
  ['','You say “You are welcome”, because not to answer would frighten them. It is the foulest thing you have ever had in your mouth.']],cb);
const k84_s_vent=cb=>say([
  ['','The doctor is required to ask one question, once a day. You know when she asks it, because the vent in the study carries.'],
  ['','For three days there has been no answer that you could hear. Today there is. It is loud, and it is rude, and it is the first thing they have said in their own voice since the river.'],
  K76MV('NOTHING HAPPENED. write it down. N-O-T-H-I-N-G','NOTHING HAPPENED. write it down','NOTHING HAPPENED. Write it down.','NOTHING HAPPENED. Write that down, and put quotation marks on it if you like.'),
  K76V('(It is their own voice. It is a lie. I was glad to hear it, and I will have to carry having been glad.)'),
  ['','It is not your question. You may not ask it, and you may not have the answer, and you ought not to be sitting where you can hear it refused.']],
  ()=>ask('K9','(The vent is above the desk. It has four screws.)',[
   k84No('Go down, and ask them yourself.','it is not yours to ask'),
   {t:'Screw the vent shut',fn:()=>{S.f.e2lVent='shut';save();say([
    ['','You fetch a screwdriver and a square of board, and you shut the vent over the desk. You heard them ask for the light through it, and you heard them laugh at nothing through it, and you will not hear either again.'],
    K76V('(What they say in that room is theirs. I have taken enough from them in writing.)')],cb)}},
   {t:'Leave the study to them at that hour',fn:()=>{S.f.e2lVent='left';save();say([
    ['','You leave the vent as it is, and you mark the hour. Every day after, at that hour, you are in the kennel, at the far end of the house, with the hose running.'],
    K76V('(The hounds have never been so clean. They do not know what they are being washed for.)')],cb)}}]));

/* ===================================== INJURIES ONLY: MISAKI ===================================== */
const k84_i_wrists=cb=>say([
  ['','The tall one has a bowl, a bottle and a pair of tweezers. He is going to do the wrists, where the ties went through.'],
  ['','He starts at the top. That is wrong. If the edge is left, it seals over dirty and goes bad inside a week. You had that at eleven. You remember the smell.'],
  K76MV('(don’t. u don’t correct them. u NEVER correct them)','(don’t. you don’t correct them. you never correct them)','(Don’t. You don’t correct them. You never correct them.)','(Don’t. You don’t correct them. You never, ever correct them.)'),
  ['','He is going to do it wrong, and in a week it will be your arm. You weigh the two. It takes most of a minute to decide that the arm is worth being hit for.'],
  k80Gone()?['','You touch the edge of the wound with one finger. Then you pull the hand back and wait for it.']:K76MV('under the edge. sorry. it goes bad if u don’t. sorry','under the edge. sorry. it goes bad if you don’t. sorry','Under the edge. Sorry. It goes bad if you don’t. Sorry.','Under the edge. Sorry. It goes bad if you don’t go under. Sorry.'),
  ['','You shut your eyes for what comes next. Nothing comes. When you open them he is holding the tweezers in the air, and he looks as if he is going to be sick into the bowl.'],
  ['','He does it your way, and does not speak. You have never met a guard who could be told. You like him less for it; the ones you can predict are the safe ones.']],cb);
const k84_i_careful=cb=>say([
  ['','He cuts the old strapping off the ribs. When it comes away he makes a small sound through his nose.'],
  ['','You know what is under there. A boot, three or four times, from the left. It has gone every colour, and in one place the skin has the print of a tread in it.'],
  K76MV('(he’s angry. look at his jaw. he’s ANGRY)','(he’s angry. look at his jaw. he’s angry)','(He’s angry. Look at his jaw. He’s angry.)','(He’s angry. Look at his jaw; he’s properly angry.)'),
  ['','You go back over it. You kept still. You did not bleed on his sheet. You ate all of it. There is nothing left for him to be angry at except the damage, and you cannot take the damage back.'],
  k80Gone()?['','You pull the blanket up over the ribs, to get them out of his sight.']:K76MV('i can’t fix it. sorry','i can’t fix it. i would. sorry','I can’t fix it. I would. Sorry.','I can’t fix it. I would if I could. Sorry.'),
  ['','He puts both hands flat on the edge of the bed and leaves them there. The knuckles are white. You watch the hands. They do not come towards you, and that is all you can get out of them.'],
  ['','Then he straps you again, so evenly that you could rule a line along it. He is angry the whole time and none of it lands. You lie awake afterwards, waiting for it to land.']],cb);
const k84_i_snob=cb=>say([
  ['','You know him now. So when he does the hand this morning and his face does that thing again, you say so.'],
  K76MV('what. WHAT. u’ve done worse. u did eight fingers','what? you’ve done worse. you did eight fingers','What? You’ve done worse. You did eight fingers.','What? You’ve done worse than this, V. You took eight fingers off a man.'),
  K76V('I did. In order, and for cause.'),
  K76MV('so why’s this bother u. it’s a hand. third time for that one. it sets fine','so why does this bother you? it’s a hand. third time for that one, it sets fine','So why does this bother you? It’s a hand. Third time for that one; it sets fine.','So why does this bother you? It’s a hand. That’s the third time for that one, and it sets fine.'),
  K76V('Because it was done badly, to no purpose, by men who were bored.'),
  K76MV('so ur a SNOB about it','so you’re a snob about it','So you’re a snob about it.','So you’re a snob about it. About torture.'),
  K76V('Yes. It appears that I am.'),
  ['','It is the funniest thing you have heard in a fortnight. The man with the cold room is put off his breakfast by your ribs.'],
  K76MV('(…no one’s been grossed out for me before. is that what that is)','(…nobody’s been grossed out for me before. is that what that is)','(…Nobody’s been grossed out for me before. Is that what that is?)','(…Nobody’s been disgusted on my account before. Is that what that is?)')],cb);

/* ===================================== INJURIES ONLY: V ===================================== */
const k84_i_manner=cb=>say([
  ['','You do the treatment yourself. You trust nobody else with a hand.'],
  ['','You know how a hand is broken. You have broken them on the steel table, in order, each bone answering a charge, and stopped when the sum came out.'],
  ['','This one was stamped on. A heel, or a car door, by somebody who was passing. The ribs were kicked from the left by a right-footed man who was not aiming. The wrists were put in cable ties and then left, until the plastic went through the skin by itself.'],
  K76V('(There is no order in it. There is no charge. Not one mark on them was for anything.)'),
  K76V('(It disgusts me. I had not expected to be capable of that. I jointed the card man, and I am standing over a kicked rib and I find it obscene.)'),
  ['','You had meant to do worse. It is in your own hand, with SLOW written across the top.'],
  K76V('(Mine would have been exact, and for cause. I have told myself for eleven years that this is a difference. I am no longer certain that the one on the table would have been able to tell.)'),
  ['','You wash your hands before you touch them, and again afterwards, and you cannot have said which of the two was for whom.']],cb);
const k84_i_third=cb=>say([
  ['','You set the hand. They watch you do it as one watches a man change a tyre.'],
  k80Gone()?['','They do not speak. They turn the wrist for you before you ask, to the exact angle, and hold it there. They have been through this before, and they know where it goes.']:K76MV('third time for that one. it sets fine. do the thumb first','third time for that one. it sets fine. do the thumb first','Third time for that one. It sets fine. Do the thumb first.','That’s the third time for that one. It sets fine. Do the thumb first, or the rest won’t sit.'),
  ['','They are right about the thumb.'],
  ['','The films are on the lightbox. The new breaks are white and sharp. Behind them, further up, there are old ones: an arm that knit crooked, two ribs, a collarbone. None of them was ever set. The newest of those is from before they were nine.'],
  K76V('(Somebody watched a child carry a broken arm about until it healed bent.)'),
  K76V('(I have despised them for feeling nothing about a doorman. They feel nothing about this either. It is the same skill. They were taught it before they could write the name of a month.)'),
  ['','You keep four animals that were used like that. You took each of them in and wrote nothing against it. Against this one you wrote forty pages.'],
  K76V('(I find the old breaks more disgusting than the new. I am aware of what that says about where my disgust has gone, and I have not given it leave.)')],cb);
const k84_i_scale=cb=>say([
  ['','There is no scale in the house for a person. You carry them to the kennel and weigh them on the one for the hounds.'],
  ['','They weigh less than the grey hound. They find this extremely funny, and tell her so.'],
  ['','They had four days on water, and on whatever came through a slot. There is a tooth gone at the back, on the left; they showed you the gap with a finger, quite cheerfully, as proof of something.'],
  K76V('(They were not even starved for a purpose. Nobody decided upon it. They were forgotten, between one shift and the next.)'),
  K76V('(I feed what is in my keeping. I fed the card man, and fed him well, to the last night. It is not kindness. A thing that I hold is held properly, or I am no better than a man with a van.)'),
  ['','You are aware that this is a butcher’s objection. You are disgusted as a tradesman is, at bad work. You had thought that it would stop there, at the workmanship.'],
  K76V('(It has not stopped there. I do not want it. I did not ask to be made sick on behalf of something in my own book.)'),
  ['','You cook. Broth first, then egg, then a little rice, in that order, a spoon at a time, as you would for an animal brought in off a chain. They eat all of it and ask whether there is any ham.']],cb);

/* ===================================== THE SCHEDULER (replaces kc80's) ===================================== */
const K84_POOLS=(()=>{try{const mc=typeof K80_MC!=='undefined'?K80_MC:[],mx=typeof K80_MX!=='undefined'?K80_MX:[],v=typeof K80_V!=='undefined'?K80_V:[];const E=(id,fn,mode)=>fn?{id,fn,mode:mode||null}:null;
 return {mc:[E('ask',mc[1]),E('rules',mc[0]),E('s_clothes',k84_s_clothes,'sa'),E('i_wrists',k84_i_wrists,'inj'),E('hound',mc[2]),E('s_asks',k84_s_asks,'sa'),E('i_careful',k84_i_careful,'inj'),E('hand',mc[3])].filter(Boolean),
  mx:[E('s_book',k84_s_book,'sa'),E('i_snob',k84_i_snob,'inj'),E('said',mx[0]),E('thanks',mx[1]),E('doctor',mx[2],'sa')].filter(Boolean),
  v:[E('message',v[0]),E('s_table',k84_s_table,'sa'),E('i_manner',k84_i_manner,'inj'),E('file',v[1]),E('form',v[2],'sa'),E('s_voice',k84_s_voice,'sa'),E('i_third',k84_i_third,'inj'),E('vhand',v[3]),E('ronin',v[4]),E('s_vent',k84_s_vent,'sa'),E('i_scale',k84_i_scale,'inj'),E('laugh',v[5])].filter(Boolean)}}catch(e){return {mc:[],mx:[],v:[]}}})();
const k84Pool=k=>{const sa=k84SA();return K84_POOLS[k].filter(e=>!e.mode||(e.mode==='sa')===sa)};
const k84Next=k=>{const F=S.f.e2l84||{};return k84Pool(k).find(e=>!F[e.id])||null};
if(typeof k80MedScene==='function')k80MedScene=function(){try{if(!S||!S.f||!K84()||dlg||typeof kdMed!=='function'||!kdMed())return null;
 if(typeof k73MedScene==='function'&&k73MedScene())return null;
 if((typeof k61Scene==='function'&&k61Scene())||(typeof k62Scene==='function'&&k62Scene())||(typeof k63Scene==='function'&&k63Scene()))return null;
 const slot=S.slot||0,cur=S.day+'/'+slot,f=S.f,m=S.pov!=='v';if(f.e2l80Slot===cur||f.e2lMedSlot===cur)return null;
 /* Misaki: kc73 has the evening (slot 2); mornings, afternoons and the late night are free */
 if(m&&slot===2)return null;
 const k=m?(kdClar()<2?'mc':'mx'):'v',e=k84Next(k);if(!e)return null;
 return cb=>{f.e2l84=f.e2l84||{};f.e2l84[e.id]=1;f.e2l80Slot=cur;save();go(cutBg(m?(k==='mc'?'#0c0a08':'#1c2422'):'#06060c'));e.fn(cb)}}catch(e){return null}};

/* ===================================== II · WHAT IS LEFT (a version for each setting) ===================================== */
function k84Marks(){k77Go('#0c0b0b');k73Mark('e2l_marks',1);const m=k76M(),f=S.f;
 if(k84SA()){const L=m?[
   ['','You are upstairs now, in the spare room, with a bathroom of your own. Tonight you have washed five times.'],
   ['','On the fifth the water goes cold. You stand under it anyway. You have used all the hot water in a billionaire’s house, and you would use it again if there were any.'],
   ['','When you come out there are towels on the floor outside the bathroom door, a stack of them, warm, and nobody in the corridor. At the far end of the house somebody is making a great deal of noise with the hounds’ bowls, so that you will know exactly where he is.']]:[
   ['','At eleven the boiler gives out. It has not done so in eleven years. They have the bathroom off the spare room, and the water has been running in it since nine.'],
   ['','You know what that is. You have sat with people who did it. It is not a thing that one is clean of after one wash, or after five, and nobody can do it for them.'],
   K76V('(I cannot go to that door. I am the last man in this city who may stand outside that door.)')];
  return say(L,()=>ask(K73Who(),m?'(The towels are warm. He must have put them there a minute ago.)':'(There is nothing that you are permitted to say.)',m?[
   k84No('Tell him why it takes five.'),
   {t:'“ur boiler’s shit, by the way”',sub:'shout it down the corridor',fn:()=>{f.e2lMarks='boiler';k84Deny();save();say([
    K76V('(from the far end) It is forty years old. I will have another put in.'),
    ['','There is a second boiler by Thursday. The water never runs out again. Neither of you ever mentions why a house with one person in it needed two.']],hub)}},
   {t:'Take the towels and say nothing',fn:()=>{f.e2lMarks='towels';k84Deny();save();say([
    ['','You take the towels in and shut the door. The noise with the bowls goes on for another twenty minutes, steadily, and you find that you are timing your breathing to it.'],
    K76MV('(he doesn’t know anything. he’s just loud. he’s just a loud old man with dogs)','(he doesn’t know anything. he’s just loud. a loud old man with dogs)','(He doesn’t know anything. He’s just loud. A loud old man with dogs.)','(He doesn’t know anything. He’s merely loud: a loud old man with dogs.)')],hub)}}]:[
   k84No('Ask them whether there is anything that you can do.','it is not yours to ask'),
   {t:'Have a second boiler put in',fn:()=>{f.e2lMarks='boiler';save();say([
    ['','You leave towels on the floor outside their door, warm from the rail, and go to the far end of the house.'],
    K76MV('(down the corridor) ur boiler’s shit, by the way','(down the corridor) your boiler’s shit, by the way','(down the corridor) Your boiler’s shit, by the way.','(down the corridor) Your boiler is shit, by the way.'),
    K76V('It is forty years old. I will have another put in.'),
    ['','You have it in by Thursday. The plumber asks why a house with one person in it should need two. You tell him that it is no longer a house with one person in it, and hear that after you have said it.']],hub)}},
   {t:'Leave towels, and make a noise at the far end of the house',fn:()=>{f.e2lMarks='towels';save();say([
    ['','You leave towels on the floor outside their door, warm from the rail. Then you go to the kennel passage and rattle the hounds’ bowls for twenty minutes, so that anybody in the house can tell exactly where you are and that you are not coming nearer.'],
    K76V('(It is the only thing I have found to give them: the knowledge of where I am.)')],hub)}}]))}
 const L=[
  ['',m?'The pins come out today, on the kitchen island, under the good lamp. He does it himself, with the small pliers, and you watch, because it is your hand and you like to know how things are done.':'You take the pins out today, on the kitchen island, under the good lamp. They watch every one. They like to know how a thing is done.'],
  ['',m?'There are a lot of marks, with the cast off. He goes over them as he goes, in the voice of a man marking somebody else’s homework.':'There are a great many marks, with the cast off. You find that you are going over them aloud.'],
  K76V('This was a heel. This is from the cable ties; they were put on wet and left. This one I cannot account for at all. It is merely where somebody leaned.'),
  K76MV('u sound like a food critic','you sound like a food critic','You sound like a food critic.','You sound like a food critic, V. Two stars.'),
  K76V('I intend to find the man with the boot.'),
  K76MV('why. he did ur job for u','why? he did your job for you','Why? He did your job for you.','Why? He did your job for you, and for free.'),
  K76V('He did not do my job. There is a reason at every cut that I make. He had none. I will not have it said that what he did and what I do are one trade.')];
 const same=()=>{f.e2lMarks='same';apply({aff:1});save();say([
   m?K76MV('they’re the same trade, v','they are the same trade, v','They are the same trade, V.','They are the same trade, V. Ask the guy on the table.'):null,
   ['',m?'He stops with the pliers on the last pin. He does not argue. You have never seen him not argue.':'You stop with the pliers on the last pin. You have an answer to that. You have had it for eleven years, and it does not come.'],
   K76V('Then I would ask you to let me go on being disgusted by his. It is the only part of it that I am sure of.'),
   K76MV('knock urself out','knock yourself out','Knock yourself out.','Knock yourself out. Be disgusted. It’s free.'),
   ['',m?'He takes the last pin out more gently than he took the first. You pretend that you have not noticed.':'You take the last pin out more gently than you took the first. They pretend that they have not noticed.']],hub)};
 const differ=()=>{f.e2lMarks='differ';apply({aff:1});save();say([
   m?K76MV('fine. it’s different. happy?','fine. it’s a different trade. happy?','Fine. It’s a different trade. Happy?','Fine. It’s a completely different trade. Are you happy?'):K76V('It is a different trade.'),
   m?K76V('No. You do not believe it. You said it to be kind, and I find that harder to hear than the other.'):K76MV('sure it is','sure it is, grandpa','Sure it is.','Sure it is, V. Completely different.'),
   ['',m?'He lays the pins out on the towel in a row, by length. There are six. He looks at them as he looked at the kicked ribs.':'They said it to be kind. You lay the pins out on the towel in a row, by length. There are six. You cannot look at them and keep your face.'],
   K76V('(Six pins, to mend what one bored man did in passing. I have never once had to mend anything of mine.)')],hub)};
 say(L,()=>ask(K73Who(),m?'(He has stopped, with the pliers on the last pin.)':'(One pin left.)',m?[
  {t:'“they’re the same trade, v”',fn:same},{t:'“fine. it’s different. happy?”',fn:differ}]:[
  {t:'Say nothing more',sub:'let them answer it',fn:same},{t:'“It is a different trade.”',fn:differ}]))}
(function(){try{if(typeof K73B==='undefined'||typeof k76Card!=='function')return;const at=id=>K73B.findIndex(b=>b.id===id);
 const b={id:'e2l_marks',t:()=>k84SA()?k76H('The bathroom off the spare room','The boiler, at eleven at night'):k76H('The pins come out','Take the pins out'),sub:()=>'costs time · '+(k84SA()?'the hot water':'the kitchen island'),
  when:()=>['after','act2'].includes(S.phase)&&k73Done('e2l_after')&&k73Fresh(),run:function(){return k76Card('e2l_marks',()=>k84Marks())}};
 const i=at('e2l_rifle');K73B.splice(i<0?K73B.length:i,0,b)}catch(e){}})();

/* ===================================== ENDINGS ===================================== */
const _xe84=extraEnding;extraEnding=function(){const L=_xe84();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,F=f.e2l84||{};
 if(k84SA()){
  if(F.s_table)L.push('V burned his plan for killing Misaki in the study grate, a sheet at a time. The plan was not the book.');
  if(f.e2lVent==='shut')L.push('The vent over V’s desk is boarded shut. He did it himself, so as not to hear what was not his.');
  if(f.e2lMarks==='boiler')L.push('V’s house has two boilers. The hot water has not run out since.');
  if(F.s_book)L.push('V’s ledger says of the river: the date, the address, and that Misaki was recovered alive. He has never written another word about it.')}
 else{
  if(F.i_manner||F.i_snob)L.push('V, who joints men for cause, was sickened by what bored men had done to Misaki’s hand and ribs. Misaki called him a snob about it. He agreed.');
  if(F.i_third)L.push('There are old breaks on Misaki’s films that were never set. V wrote forty pages against Misaki, and not a line against whoever watched a child carry a broken arm.');
  if(f.e2lMarks==='same')L.push('Misaki told V that his trade and the boot’s were the same. He did not argue. He asked to go on being disgusted by the other man’s.');
  else if(f.e2lMarks==='differ')L.push('V laid six pins in a row on a towel: what it took to mend what one bored man did in passing.')}}catch(e){}return L};
/* ===KC84-END=== */
