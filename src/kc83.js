/* ===KC83-BEGIN=== */
/* ===================== THE WAR: THE EDGES OF IT (kc83) =====================
   The remaining thin places on the enemies-to-lovers route. Needs kc73, kc76–kc82.
   1. While Misaki is held (V only; ⚔ side entries after kc79's trailer, one a day):
        e2l_gone2  Angel and Ronin at his door: "are you looking, or waiting"      S.f.e2lGone2 table|door
        e2l_gone3  the black hound and the shoe from the gravel
   2. The infirmary (kc80's delivery): one more scene each. Misaki, clear: what the doctor says about who was not in
      the room. V: the first laugh, through the vent.
   3. The house menu (kc81): "The study, in the evening" (the same room, two chairs).   S.f.e2lStudy near|far
   4. Act III, after the boat: e2l_eve, the night before the auction (lovers / rivals).  S.f.e2lEve
   5. The epilogue: ⚔ A year on (three scenes, once each, lovers and rivals versions; S.f.e2l83).
   6. Four more questions each way for kc82's "one thing a day".
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc83.md. Test: node tools/k83_test.js */
const K83=()=>{try{return typeof K82==='function'&&K82()}catch(e){return false}};

/* ===================================== 1 · WHILE THEY ARE HELD (V) ===================================== */
const k83TakenOk=id=>{try{return K83()&&S.phase==='taken'&&S.pov==='v'&&!k73Done(id)&&S.f.e2lGoneDay!==S.day&&S.day>(S.takenDay||0)}catch(e){return false}};
function k83Gone2(){k77Go('#07070a');k73Mark('e2l_gone2',1);S.f.e2lGoneDay=S.day;save();
 say([
  ['','Angel and Ronin are on your step at midnight. She has the shotgun, broken over her arm. He has the crowbar. Neither of them has come to visit.'],
  [AN,'Their name is in your book, V. So I’m asking you once. Are you looking for them, or are you waiting for somebody else to finish it?'],
  [RN,'She means it. I mean it more.'],
  K76V('Come in.')],
 ()=>ask('K9','(They are not going to take your word.)',[
  {t:'Show them the ops table',fn:()=>{S.f.e2lGone2='table';save();say([
   ['','You take them down to the ops deck. The table is covered: the van, three plates, eleven addresses with eight of them struck through, a map of the river with pins in it. You have not been to bed since the trailer.'],
   ['','Angel looks at it for a long time. She looks at the dates on the sheets, and at the cup rings, and at your hands.'],
   [AN,'You crossed out eight addresses.'],K76V('Those are not names. I may cross out an address.'),
   [RN,'Vee. When’d you last eat?'],K76V('I do not recall. It is not material.'),
   [AN,'Okay. Okay. If you find them first, and you do what the book says, I will know. I’ll see it on you.'],
   K76V('If I find them first, they will be alive when you next see them. I have not thought further than that. I find that I am unable to.')],()=>{fr('a',2);fr('r',2);hub()})}},
  {t:'Tell them at the door',fn:()=>{S.f.e2lGone2='door';save();say([
   K76V('I am looking. I have eleven addresses and I have been to eight. When I have them back, the page stands as it was written, and I will deal with it then.'),
   [AN,'“Deal with it.”'],K76V('I have no better word. I have looked for one.'),
   [RN,'That’s the most fucked-up thing you ever said to me, and you once told me how to joint a man.'],
   [RN,'Fine. I’m drivin’. You ain’t slept, and you’ll put that car in the river, and then she’ll shoot me.'],
   ['','You let him drive. You have not let anybody drive that car in eleven years.']],()=>{fr('r',2);fr('a',1);hub()})}}]))}
function k83Gone3(){k77Go('#060608');k73Mark('e2l_gone3',1);S.f.e2lGoneDay=S.day;save();
 say([
  ['','You come up from the ops deck at four, to lie down for the hours you are owed. The black hound is on your bed. It is not allowed on the bed, and it knows that.'],
  ['','It has brought something up from the car and put it in the middle of the pillow, where a bullet once stood. It is the shoe from the gravel, a size five, with the lace still tied.'],
  K76V('Off.'),
  ['','It does not get off. It lays its chin beside the shoe and looks at you, as it looks at a door that somebody ought to have come through by now.'],
  K76V('I know. I am aware. I am doing it as quickly as it can be done.'),
  ['','You do not move the shoe. You sleep in the chair, facing the door, as you did the night they left the bullet. The hound keeps the bed.'],
  K76V('(I swore to kill what wears that shoe. The animal has not been told, and I cannot think how I would put it to him.)')],hub)}
const _sh83=sideHub;sideHub=function(late){const o=_sh83(late);try{if(!S)return o;
 if(k73Done('e2l_gone')&&k83TakenOk('e2l_gone2'))o.push({t:'⚔ Midnight: Angel and Ronin are on your step',sub:'costs time · the war · II · she has the shotgun',dis:!!late,fn:()=>{spend();k76Card('e2l_gone2',()=>k83Gone2())}});
 else if(k73Done('e2l_gone2')&&k83TakenOk('e2l_gone3'))o.push({t:'⚔ Four in the morning: the black hound is on your bed',sub:'costs time · the war · II · it has brought something',dis:!!late,fn:()=>{spend();k76Card('e2l_gone3',()=>k83Gone3())}});
 if(k83EpiOk()){const i=o.findIndex(x=>x&&x.t==='⚔ The war so far');const e={t:'⚔ A year on: '+k76H('him','them'),sub:S.done.k83act?'done today':'costs time · '+(S.f.e2lEnd==='lovers'?'what it is like now':'the terms'),dis:!!late||!!S.done.k83act,fn:k83Epi};if(i<0)o.push(e);else o.splice(i,0,e)}}catch(e){}return o};

/* ===================================== 2 · THE INFIRMARY: ONE MORE EACH ===================================== */
if(typeof K80_MX!=='undefined')K80_MX.push(cb=>say([
  ['','The doctor does your dressing herself on the last day. You ask her, as if it did not matter, where the tall one has got to.'],
  ['','She says that he asked her to take it over. She says he told her that he was not to come into this room again while you were in it, and that she was to tell him if he tried.'],
  K76MV('he said that. about himself','he said that about HIMSELF','He said that about himself.','He said that about himself? He told you to keep him out?'),
  ['','She says that in eleven years it is the only instruction he has ever given her twice.'],
  K76MV('(one: he hates me. two: he locked himself out of a room in his own house so i wouldn’t have to look at him. three—)','(one: he hates me. two: he locked himself out of a room in his own house so i wouldn’t have to look at him. three—)','(One: he hates me. Two: he locked himself out of a room in his own house so I wouldn’t have to look at him. Three—)','(One: he hates me. Two: he’s locked himself out of a room in his own house so that I’d not have to look at him. Three—)'),
  ['','There is no three. You look at the door, which opens from both sides, until she has finished with the hand.']],cb));
if(typeof K80_V!=='undefined')K80_V.push(cb=>say([
  ['','On the last night, through the vent in the study, somebody laughs.'],
  ['','It is Misaki. Ronin is down there with them, telling them something filthy about a priest, and they are laughing at it: a short, rude, ugly laugh, with a cough at the end where the ribs object.'],
  ['','You have heard them ask a door for the light, in that room. You have heard them thank you. You had not known, until this moment, that you were waiting to hear whether that laugh had survived.'],
  K76V('(It is theirs. Nothing in that building got it.)'),
  ['','You open the ledger to write the date. You hold the pen over the page for a while. Then you close the book with nothing added, which you have not done before, and sit in the dark and listen until Ronin runs out of priests.']],cb));

/* ===================================== 3 · THE HOUSE MENU: THE STUDY ===================================== */
function k83Study(){const n=k81Inc('study'),m=k76M();
 if(n>1)return say(k81Var('study',[
  [['',m?'He reads with a pair of glasses you have not seen before. The other four pairs are still in your trailer, in the cutlery drawer, where you put them in the first week.':'You read with the fifth pair. The other four are in their trailer; you saw them in the cutlery drawer when you fitted the lock, and left them there.'],
   K76MV('new glasses','those are new','Those are new.','Those are new. Did you have to buy more?'),K76V('I had to. Somebody robbed me.'),
   ['',m?'You nearly offer to bring them back. You get as far as opening your mouth.':'They open their mouth, and shut it again. You go back to the page, and read the same line four times.']],
  [['',m?'You do integrals on the back of his foundation’s annual report, with his pencil. He watches the pencil for some time.':'They do integrals on the back of the foundation’s annual report, with your pencil. You watch the pencil for some time. It is fast, and it does not cross out.'],
   K76V('What is that for?'),K76MV('nothing. it’s not for anything. that’s why i like it','nothing. it isn’t for anything. that’s why i like it','Nothing. It isn’t for anything. That’s why I like it.','Nothing. It’s not for anything at all. That’s why I like it.'),
   K76V('(I own nothing that is not for something. I had thought that a virtue.)')],
  [['',m?'The fire has burned down. You have both been pretending to read for an hour, and neither of you has turned a page, and neither of you has left.':'The fire has burned down. Neither of you has turned a page in an hour. Neither of you has left.'],
   m?K76MV('(if i get up, it’s over. if he gets up, it’s over. so nobody gets up)','(if i get up it’s over. if he gets up it’s over. so nobody’s getting up)','(If I get up it’s over. If he gets up it’s over. So nobody’s getting up.)','(If I get up, it’s over. If he gets up, it’s over. So nobody is getting up.)'):K76V('(If either of us stands, the evening is finished. I have a great deal to do. I remain in the chair.)')]]),hub);
 say([
  ['',m?'His study, after dinner. There is a fire, and two armchairs, and he is in one of them with a book. The other one has never had anybody in it; you can tell from the cushion.':'The study, after dinner. You are in your chair with a book. They come in without knocking and stand looking at the second armchair, which nobody has sat in since you bought it.'],
  K76V('You may sit. It is only a chair.'),
  ['',m?'It is four steps from his. You count them.':'It is four steps from yours. You placed it there last week, with a rule.']],
 ()=>ask(K73Who(),m?'(Four steps.)':'(They are counting the distance.)',m?[
  {t:'Drag the chair a step nearer the fire',sub:'which is also a step nearer him',fn:()=>{S.f.e2lStudy='near';save();say([
   ['','You drag it a step nearer the fire. It makes a terrible noise on the boards. He does not look up, and the hand holding his book goes white at the knuckle.'],
   K76MV('it was cold over there','what. it was cold over there','What? It was cold over there.','What? It was cold over there. Don’t read into it.'),K76V('I have read nothing into it. I am reading my book.'),
   ['','His book is upside down. You decide to let him have that one.']],hub)}},
  {t:'Sit where it is',fn:()=>{S.f.e2lStudy='far';save();say([
   ['','You sit where it is. Four steps. You take the pistol out of your waistband and lay it on the arm of the chair, because sitting on it hurts the ribs, and he takes the scalpel out of his collar and lays it on the arm of his.'],
   ['','You read like that for two hours, armed, by a fire. It is the most peaceful evening you have had since you were about nine, and you would rather be shot than tell him.']],hub)}}]:[
  {t:'Say nothing when they move the chair',fn:()=>{S.f.e2lStudy='near';save();say([
   ['','They drag it a step nearer the fire. It makes a terrible noise on the boards. You do not look up. You find that your hand has gone white on the book.'],
   K76MV('it was cold over there','what. it was cold over there','What? It was cold over there.','What? It was cold over there. Don’t read into it.'),K76V('I have read nothing into it. I am reading my book.'),
   ['','It is some minutes before you observe that the book is upside down. They have observed it already, and said nothing, and you are not certain what you owe them for that.']],hub)}},
  {t:'Put the scalpel on the arm of your chair',sub:'where they can see it',fn:()=>{S.f.e2lStudy='far';save();say([
   ['','They sit where it is. They lay the pistol on the arm of the chair, because sitting on it hurts the ribs. You take the scalpel from your collar and lay it on the arm of yours.'],
   ['','You read like that for two hours, armed, by a fire. You have had this room for eleven years. It is the first evening that it has been used as a room.']],hub)}}]))}

/* ===================================== 4 · THE NIGHT BEFORE THE AUCTION ===================================== */
function k83Eve(){k77Go('#05060a');k73Mark('e2l_eve',1);const m=k76M(),f=S.f,lov=f.e2lEnd==='lovers';f.e2lEve=1;save();
 if(lov)return say([
  ['',m?'The night before the auction. Neither of you is asleep. You are on the floor of his study with the rifle in pieces on a towel, and he is at the desk with his knives laid out in order of size.':'The night before the auction. Neither of you is asleep. They are on the floor of your study with the rifle in pieces on a towel, and you are at the desk with the knives laid out in order of size.'],
  ['',m?'You notice it at the same time he does. You have been cleaning his pistol. He has been checking the zero on your scope.':'You notice it at the same moment they do. They have been cleaning your pistol. You have been checking the zero on their scope.'],
  K76MV('this is so embarrassing','this is so embarrassing','This is so embarrassing.','This is so embarrassing. Two days, V. It’s been two days.'),
  K76V('It is efficient. Each of us is the better judge of the other’s work.'),
  K76MV('(one: he could die tomorrow. two: i just got him. three: life is so fucking—)','(one: he could die tomorrow. two: i only just got him. three: life is so fucking—)','(One: he could die tomorrow. Two: I only just got him. Three: life is so fucking—)','(One: he could die tomorrow. Two: I’ve only just got him. Three: life is so fucking—)'),
  m?K76V('I can hear you counting. Stop at two.'):K76V('(They are counting. I can hear it. I do not have a number system for this; I have only the one fact, and I have had it for two days, and I would like longer.)'),
  ['',m?'You stop at two. He hands you the scope. You hand him the pistol. You do not say be careful, and he does not. Neither of you has ever been.':'You hand them the scope. They hand you the pistol. You do not say be careful, and they do not. Neither of you has ever been.']],hub);
 say([
  ['',m?'The night before the auction. Under the terms you prepare in separate rooms: you in the spare room with the rifle, him in the study with the knives, and the door between left open, so that each of you can hear what the other is doing.':'The night before the auction. Under the terms you prepare in separate rooms: they in the spare room with the rifle, you in the study with the knives, and the door between left open, so that each of you can hear the other.'],
  ['',m?'You hear every blade go across the stone. He must hear every round go into the magazine. You count his; he is certainly counting yours.':'You hear every round go into the magazine. They must hear every blade go across the stone. You count theirs. They are certainly counting yours.'],
  K76MV('(five rounds. he heard five. tomorrow if i fire six he’ll know one was for him)','(five rounds. he heard five. tomorrow, if i fire six, he’ll know one was for him)','(Five rounds. He heard five. Tomorrow, if I fire six, he’ll know one was for him.)','(Five rounds; he heard five. If I fire six tomorrow, he’ll know that one was meant for him.)'),
  m?['','You load five. Then you hold the sixth in your fist for a long time, and put it back in the box, loudly, so that he hears that too.']:K76V('(Five. I heard a sixth taken up, and then put back in the box, with some noise. They wished me to hear it.)'),
  K76V('(through the door) Thank you.'),
  K76MV('(through the door) for what','(through the door) for what','(through the door) For what?','(through the door) For what? I didn’t do anything.'),
  K76V('(through the door) For that.'),
  ['','That is the whole of what is said. Under the terms it is a great deal.']],hub)}
(function(){try{if(typeof K73B==='undefined'||typeof k76Card!=='function')return;const at=id=>K73B.findIndex(b=>b.id===id);
 const b={id:'e2l_eve',t:()=>'The night before the auction',sub:()=>'costs time · neither of you is asleep',when:()=>S.phase==='act3'&&!!S.f.e2lEnd&&k73Done('e2l_boat')&&k73Fresh()&&(S.f.e2lEnd!=='rivals'||k73Done('e2l_book')),run:function(){return k76Card('e2l_eve',()=>k83Eve())}};
 const i=at('e2l_epi');K73B.splice(i<0?K73B.length:i,0,b)}catch(e){}})();

/* ===================================== 5 · A YEAR ON ===================================== */
const k83EpiOk=()=>{try{return K83()&&S.phase==='epilogue'&&!!S.f.e2lEnd&&k73Done('e2l_epi')&&Object.keys(K83E).some(k=>!(S.f.e2l83||{})[k])}catch(e){return false}};
const K83E={
 race:{t:()=>k76H('Race him for a mark','Race them for a mark'),lov:m=>[
   ['',m?'A man who sells flats with no fire doors. You get to the roof first. He is already in the stairwell below, and you can hear him not hurrying.':'A man who sells flats with no fire doors. They reach the roof first. You are in the stairwell below, and you do not hurry.'],
   K76MV('mine. clean. one round. ur cooking','mine. clean, one round. you’re cooking','Mine. Clean, one round. You’re cooking.','Mine. Clean, one round, two hundred metres. You’re cooking tonight.'),
   K76V('He did not know why he died.'),
   K76MV('i told him. i shouted it across the street first. happy?','i told him. i shouted it across the street first. happy?','I told him. I shouted it across the street first. Happy?','I told him, V. I shouted it across the street before I fired. Are you happy?'),
   ['',m?'He is. You can tell, because he says nothing at all, and takes your rifle case off your shoulder to carry it down.':'You are. You say nothing at all, and take the rifle case off their shoulder to carry it down. A year ago they would not have shouted, and you would not have carried.']],
  riv:m=>[
   ['','A man who sells flats with no fire doors. You both want him. Under the terms you meet on the roof and toss for it.'],
   ['',m?'His coin. Your call. You lose. You stand a metre from him and watch him go down to do it his way, and you do not put a round in the man first to spare him the week.':'Your coin. Their call. They lose. They stand a metre from you and watch you go down to do it your way.'],
   K76MV('(a year ago i’d have taken it anyway. to piss him off)','(a year ago i’d have taken the shot anyway, just to piss him off)','(A year ago I’d have taken the shot anyway, just to piss him off.)','(A year ago I’d have taken the shot anyway, purely to annoy him.)'),
   m?['','At the stair door he stops, with his back to you. It is the first time he has had his back to you since the Constance. It lasts about a second, and then he remembers, and turns.']:K76V('(At the stair door I found that I had my back to them. I corrected it. I noted that for one second I had not thought to.)')]},
 table:{t:()=>'Sunday, the long table',lov:m=>[
   ['','Sunday, the long table, all four. There are two forks at your end now, and nobody remarks on it.'],
   [RN,'So who won the war. I had money on it.'],
   K76MV('me','me. obviously','Me. Obviously.','Me, obviously. Ask him.'),K76V('They did.'),
   [AN,'you’re both still armed at my — at this table. i can see the pistol. i can see the collar'],
   K76V('It is habit.'),K76MV('it’s foreplay','it’s a hobby','It’s a hobby.','It’s a hobby, Angel. Couples have hobbies.'),
   ['',m?'Under the table his knee is against yours. It has been there since the soup. You are going to have to think about that later, when you can afford to.':'Under the table your knee is against theirs. It has been there since the soup. You have left it there as one leaves a door unlocked.']],
  riv:m=>[
   ['','Sunday, the long table, all four. Under the terms you sit at opposite ends, and the weapons go in the middle of the cloth, where Angel can see them.'],
   [RN,'It’s like eatin’ at a fuckin’ peace conference.'],
   [AN,'it’s been a year. one of you could pass the other one the salt'],
   ['',m?'The salt is at his end. You look at it. He looks at it. Ronin gets up, swearing, walks the length of the table, and puts it down in front of you.':'The salt is at your end. They look at it. You look at it. Ronin gets up, swearing, walks the length of the table, and puts it down in front of them.'],
   m?K76MV('(i’d have passed it. if he’d asked. he’d have passed it if i’d asked. nobody asked)','(i’d have passed it if he’d asked. he’d have passed it if i’d asked. nobody asked)','(I’d have passed it if he’d asked. He’d have passed it if I’d asked. Nobody asked.)','(I’d have passed it if he had asked. He’d have passed it if I had asked. Nobody asked.)'):K76V('(I would have passed it, had they asked. It did not occur to either of us that we were permitted to ask.)')]},
 hound:{t:()=>'The old hound',lov:m=>[
   ['',m?'The old hound cannot manage the back stair any longer. V carries him up at night, all of him, like a calf, and puts him down on your side of the bed.':'The old hound cannot manage the back stair any longer. You carry him up at night and put him down on their side of the bed, where he has decided that he sleeps.'],
   K76MV('he’s fifteen','he’s fifteen now','He’s fifteen now.','He’s fifteen now. That’s old, for one that size.'),K76V('I know how old he is.'),
   K76MV('u going to be ok','are you going to be ok. when','Are you going to be okay? When.','Are you going to be okay, when it happens?'),
   K76V('No.'),
   ['',m?'He says it like a weather report. Then he sits down on the floor by the bed, in his good trousers, with one hand on the hound’s ribs, and you get down there with him. There is nothing else in his whole house that you can shoot for him.':'You sit down on the floor by the bed, with one hand on the hound’s ribs. They get down beside you. Neither of you is any use to the other with this, and they stay regardless.']],
  riv:m=>[
   ['',m?'The old hound is at your trailer door at six in the morning. He has walked it, on that hip, from the house. It is four kilometres.':'The old hound is not in the kennel at six. On the gate camera he is going down the drive, alone, on that hip, in the direction of the trailer lot. It is four kilometres.'],
   ['',m?'You let him in. He gets up on your bed, which takes three tries, and lies down with a sigh you have counted before, through a door.':'You do not go after him. You sit in the car at the end of their lane for the whole morning, where the terms allow, and watch the trailer door, which stays shut with him behind it.'],
   m?K76V('(text) He is with you.'):K76V('(text) He is with you.'),
   K76MV('(text) yeah. he walked','(text) yeah. he walked the whole way'),
   K76V('(text) Keep him as long as he likes. I will bring his food to the gate and leave it.'),
   m?K76MV('(he could’ve come in. i’d have let him in. it’s the HOUND, he could’ve come in for the hound)','(he could have come in. i’d have let him. it’s the hound, he could have come in for the hound)','(He could have come in. I’d have let him. It’s the hound; he could have come in for the hound.)','(He could have come in. I’d have let him. It’s the hound; he could have come in for the hound.)'):K76V('(I could have gone to the door. They would have opened it, for him. I have gone over the terms, and there is nothing in them that forbids it, and I stayed in the car.)')]}};
function k83Epi(){const m=k76M(),F=(S.f.e2l83=S.f.e2l83||{}),lov=S.f.e2lEnd==='lovers';
 const o=Object.keys(K83E).filter(k=>!F[k]).map(k=>({t:K83E[k].t(),fn:()=>{spend();S.done.k83act=1;F[k]=1;save();k77Go('#09080b');say((lov?K83E[k].lov:K83E[k].riv)(m),hub)}}));
 ask(K73Who(),m?'(a year on.)':'(A year on.)',o.concat([{t:'Not today',fn:hub}]))}

/* ===================================== 6 · MORE QUESTIONS ===================================== */
if(typeof K82_QM!=='undefined')K82_QM.push(
 {q:'“what’s ur actual name”',a:()=>[
  K76V('You know it. You have it in the server.'),
  K76MV('that’s a letter','that’s a letter, not a name','That’s a letter, not a name.','That’s a letter, V. It’s not a name.'),
  K76V('It is what is left when one takes everything off that was not mine. I kept the first letter. It seemed enough.'),
  K76MV('(i wrote in “march”. he kept one letter. we’re both about four characters long)')]},
 {q:'“have u ever been wrong. in the book”',a:()=>[
  K76V('Once. I crossed him out. It is the only crossing-out, and it is on your page.'),
  K76MV('on MINE','on my page?','On my page?','On my page? Who was he?'),
  K76V('A man I had charged to you, on poor evidence. I was not sure. So I struck him, and I do not strike things, and I have looked at the line every day since.'),
  K76MV('(he was fair. to me. in the book where he was going to kill me. what am i supposed to DO with that)','(he was fair to me. in the book where he was going to kill me. what am i supposed to do with that)','(He was fair to me. In the book where he was going to kill me. What am I supposed to do with that?)','(He was fair to me, in the very book in which he meant to kill me. What am I supposed to do with that?)')]},
 {q:'“why’d u really come in. at the river”',a:()=>[
  ['','He takes a long time. You have never seen him take a long time over an answer.'],
  K76V('I have given Ronin one reason and myself another. Neither of them was true.'),
  K76V('I do not have the true one in a form that I can say. If I find it, you will be told. I would ask you not to guess at it.'),
  K76MV('ok','ok. i won’t','Okay. I won’t.','Okay. I won’t guess.'),
  K76MV('(i’m guessing. i can’t stop guessing)')]},
 {q:'“are u scared of anything”',a:()=>[
  K76V('Of being a man who does it for pleasure. I check, each time.'),
  K76MV('and?','and? are u','And? Are you?','And? What do you find?'),
  K76V('Not yet. I thought that I would enjoy you. I have been very much relieved.'),
  K76MV('that’s the worst compliment anyone’s ever given me','that is the worst compliment i’ve ever had','That is the worst compliment I’ve ever had.','That’s the worst compliment anybody has ever paid me, and I’ve been called a scalper.')]});
if(typeof K82_QV!=='undefined')K82_QV.push(
 {q:'“Why did you come to my door? Of every door.”',a:()=>[
  K76MV('idk','i don’t know','I don’t know.','I don’t know.'),
  K76MV('…bc nobody gets through it. i tried all week. if i couldn’t get in, they couldn’t','…because nobody gets through it. i tried all week. if i couldn’t, they couldn’t','…Because nobody gets through it. I tried all week. If I couldn’t, they couldn’t.','…Because nobody gets through it. I had tried all week. If I couldn’t get in, nobody could.'),
  K76V('You came to the one house in the city that you had found impregnable, because I had made it so against you.'),
  K76MV('yeah. don’t make it a thing','yeah. don’t make it a thing','Yeah. Don’t make it a thing.','Yes. Don’t make it into a thing.'),
  K76V('(It is the only use that anybody has ever had for what I am.)')]},
 {q:'“Do you remember saying thank you?”',a:()=>[
  ['','You should not have asked it. You watch them go somewhere else behind the eyes, and then come back.'],
  K76MV('every one','every fucking one','Every fucking one.','Every one of them. Forty-one.'),
  K76MV('do u','do you','Do you?','Do you?'),
  K76V('Yes.'),
  K76MV('then we’re even. we’ve both got to carry it','then we’re even. we both have to carry it','Then we’re even. We both have to carry it.','Then we are even. We both have to carry it about.'),
  K76V('(It is the first debt between us that either of us has called even.)')]},
 {q:'“What will you do, after the case?”',a:()=>[
  K76MV('work. rent’s still four hundred','work. rent’s still four hundred','Work. Rent’s still four hundred.','Work. The rent is still four hundred a month.'),
  K76V('I could—'),
  K76MV('don’t','don’t. don’t u dare offer','Don’t. Don’t you dare offer.','Don’t. Don’t you dare offer me money, V.'),
  K76V('I was going to say that I could tell you what each of them had done, beforehand. So that you might decide.'),
  ['','They do not have anything to say to that. You have not seen it happen before.']]},
 {q:'“Have you ever been afraid of me?”',a:()=>[
  K76MV('first week? no. u were a rich guy with dogs','the first week? no. you were a rich guy with dogs','The first week? No. You were a rich guy with dogs.','In the first week? No. You were a rich man with large dogs.'),
  K76MV('in the room downstairs. yeah. but that wasn’t u. that was a guy with ur face','in the room downstairs, yes. but that wasn’t you. that was a guy with your face','In the room downstairs, yes. But that wasn’t you. That was a guy with your face.','In the room downstairs, yes. But that wasn’t you; that was somebody with your face on.'),
  K76V('And now?'),
  K76MV('…next question','…ask me another one','…Ask me another one.','…Ask me a different one.'),
  K76V('(That was an answer. I am not certain which.)')]});

/* ===================================== ENDINGS ===================================== */
const _xe83=extraEnding;extraEnding=function(){const L=_xe83();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,E=f.e2l83||{};
 if(k73Done('e2l_gone3'))L.push('While Misaki was held, the black hound put their shoe on V’s pillow and would not get off the bed. V slept in the chair.');
 if(f.e2lGone2==='door')L.push('The night V let Ronin drive his car was the night he was looking for Misaki.');
 if(f.e2lStudy)L.push('There are two armchairs in V’s study. For eleven years one of them had never been sat in.');
 if(f.e2lEve&&f.e2lEnd==='rivals')L.push('The night before the auction Misaki loaded five rounds, and put the sixth back in the box loudly enough for V to hear.');
 if(E.hound)L.push(f.e2lEnd==='lovers'?'V carries the old hound up the back stair every night, and puts him down on Misaki’s side.':'The old hound walked four kilometres to Misaki’s trailer on his bad hip. V brings his food to the gate.');
 if(E.table&&f.e2lEnd==='rivals')L.push('At Sunday dinner Ronin still has to carry the salt from one end of the table to the other.')}catch(e){}return L};
/* ===KC83-END=== */
