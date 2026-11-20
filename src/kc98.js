/* ===KC98-BEGIN=== */
/* ===================== THE WAR: HOW THE WORST ROUTE ENDS (kc98) =====================
   The author's decision: write an enemies-route version of the worst route's ending. Needs kc50–kc52, kc73,
   kc76–kc97.
   On the worst route (severity 8+, Misaki's POV) the delusion does not clear, composure runs down, and at 3 or less
   Misaki decides before the tall one can. kc50–kc52 wrote that for the normal route, where the tall one is somebody
   they love and do not recognise. Here he is K9, who swore to kill them, and whom they have recognised all along;
   what they have wrong is what he means to do.
   What is the same, exactly: nothing about a method is shown or implied, anywhere. The decision is not a victory
   and is not written as one. It comes from exhaustion, from days of the bag, and from a mistake about a man.
     1. the dark thought, once a day under composure 15   (three lines, in place of KD_SPIRAL_WARN)
     2. the last night   in place of kdSpiral: what they still have; the war has gone; “not when he says”.
        Lucid too late: the sign says LAUNDRY backwards; a man who is getting you ready does not learn to cook.
        V, too late by minutes. He swore it, and the whole city will take it that he did. Under the mattress, the
        case against him on a soup label, five lines crossed out; the last not crossed, and two words under it.
     3. interrupted   in place of kdInterrupted (same condition: two clues, and the message for K9): he has sat
        at the door every night since. “I swore to kill you, and I have not, and I am not going to, and neither are
        you.” She lives. kd_interrupted_after has a route version.
     4. V, after   seven mornings on his lone route, in place of KD_AFTER: “Not collected.”; Ronin and the book;
        the cactus; the rent, paid to himself; the four; the soup; a car park.
   The bright turn (kc52) is unchanged: it has no V in it, only the tall one, and it plays as written.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc98.md. Test: node tools/k98_test.js */
const K98=()=>{try{return !!(S&&S.f&&S.f.e2l===1&&!S.rom&&!S.vrom&&typeof K97==='function')}catch(e){return false}};

/* ---------- 1 · the dark thought ---------- */
const K98_WARN=[['(he decides when. that’s how it works with him. he’s got it in a book)','(he decides when. that’s how it works with him. he has it in a book)'],
 ['(u keep thinking about the when. not the collar. not the lamp. the when)','(you keep thinking about the when. not the collar. not the lamp. the when)'],
 ['(there’s one thing in this room he hasn’t got. it’s the when)','(there’s one thing in this room that he hasn’t got. it’s the when)']];
const _hub98=hub;hub=function(){const a=arguments,self=this;try{if(K98()&&typeof kdWR==='function'&&kdWR()&&S.comp<15&&!dlg&&S.f.kdWarnDay!==S.day&&S.slot>=1){S.f.kdWarnDay=S.day;S.f.kdWarnN=(S.f.kdWarnN||0)+1;save();go(cutBg('#0c0a08'));
 const w=K98_WARN[Math.min(2,S.f.kdWarnN-1)];return say([M2(w[0],w[1])],()=>_hub98.apply(self,a))}}catch(e){}return _hub98.apply(self,a)};

/* ---------- 2 · the last night ---------- */
function k98Spiral(){S.f.kdSpiral=1;save();const full=typeof kdSA!=='function'||kdSA();go(cutBg('#000'));
 const L=[N('Night. The bulb. The shoes in the passage, going up and down. He walks when he cannot sleep, and he never can.'),
  N('You have done the sums. You always do the sums. He has never killed a thing that was not well, and you are not going to be well. So he will wait. He is the most patient man in the city. He will keep you in this bed, on this bag, until there is enough of you to answer for a doorman, and there is not going to be enough.'),
  N('You go through what you still have, as you would go through a bag before a job. The spoon; you have not worked on it in days. The list, which is down to one line, and you could not swear to that one. A paper cup, washed, that you do not know why you kept.'),
  full?N('You do not have the hours. They took the hours, and whatever was in them. You became what you became so that nobody would own any part of you again. You learned the wind and the drop and what a man is worth; you were cheap, and fast, and nobody’s. And for days you were somebody’s, and you were not even there for it.')
      :N('They broke what they wanted to break. Some of it will set crooked. The hand is not going to hold a fore-end again; you have known that for a week and not said it. A contractor who cannot shoot is a person who owes rent.'),
  N('The war has gone. You have looked. You had a whole war: a rich man with a hobby, and a car park, and a promise that you made with your whole chest in front of everybody. It was the best thing you ever had, and you cannot find the door to it. You feel like a room that somebody has moved out of.'),
  N('You think about Ronin, running a book on the two of you so that he would not have to drive over and look. Angel, and her list. You hold it up, and it is somebody else’s: a photograph of a town where you used to live.'),
  M2('(they’ll be ok. ronin’ll break something. angel’ll cry on main and then go find out who. his honour’ll have to rule me off. no total. he’ll HATE that)','(they’ll be ok. ronin will break something. angel will cry on main, and then go and find out who. his honour will have to rule me off. no total. he’ll hate that)'),
  M2('(i was gonna do him somewhere stupid. i said. i’m sorry about that one. i’m so tired)','(i was going to do him somewhere stupid. i said so. i’m sorry about that one. i’m so tired)'),
  N('You have always decided when. Nobody had that off you before you were nine, or by the river. It is not much of a thing to own, but it is what there is.'),
  M2('(not when he says.)','(not when he says.)'),
  N('The light is on. You leave it on.')];
 if(typeof kdSpiralSecret==='function'&&kdSpiralSecret())return cut(L,k98Interrupted,'#000');
 cut(L,()=>{go(cutBg('#000'));cut([
  N('And then, after, in the little space after, with nothing left to decide—'),
  N('The sign on the door, through the glass. You have looked at it for days. YRDNUAL. It is backwards. It says LAUNDRY.'),
  N('The toothbrush on the counter has a frog on it. The door was never bolted. There were three pillows, and a splint for your trigger finger, and soup that somebody made himself, badly, at eight and noon and six.'),
  N('A man who is getting you ready does not learn to cook. He does not hand you cover. He does not walk loudly for nine days so that you will always know where he is.'),
  M2('(…oh.)','(…oh.)'),
  M2('(oh, u IDIOT. he wasn’t. he was never going to. he had me nine days and he made SOUP)','(oh, you idiot. he wasn’t. he was never going to. he had me for nine days, and he made soup)'),
  N('You try to call out. You want to tell him. You want, more than you have ever wanted anything, to tell that man to his face that his soup is shit, and to hear what he says.'),
  N('It is too late for your voice to work. It is not too late for you to know. You read him wrong. It is the only job that you ever got wrong, and it was this one.')],()=>{go(cutBg('#000'));cut([
  N('The shoes stop in the passage at four, because the breathing on the other side of the door has changed, and he has listened to that breathing for nine nights with the ledger shut on his knee.'),
  N('He is through the door before the book has reached the floor. He has the bag. He has the light. He is fast, and he is very good, and he is too late by minutes, not hours.'),
  ...(typeof kdShapeLines==='function'?kdShapeLines():[]),
  N('They are looking at the door. The face is not afraid. It is the face of somebody who has worked a thing out a second too late, on a roof, when the wind has changed. He has had that face in his field glasses. He knows what it means.'),
  N('He swore to kill them. He wrote it down, and he read it out, and it is in ink. He stands in the room marked LAUNDRY with their wrist in his hand and understands that it was the one thing about him on which they relied.'),
  [RN,'…Tell me it wasn’t you.'],
  K76V('It was not.'),
  [RN,'I know it wasn’t. I know. I just needed t’hear you say it the once.'],
  N('The grey hound lies down across the threshold and will not move for anybody for two days.'),
  N('The funeral is small. Angel does the eyeliner one last time, and her hands shake the whole way through, and she does not stop until it is right. Ronin closes the book at the graveside and gives everybody their stake back.'),
  N('Under the mattress he finds a spoon, with the handle worked to an edge. He finds a soup label. The case against him is on the back of it, in biro, in six lines. Five have been crossed through, one a day. The sixth has not. “nobody asked him.” Beneath it, smaller, in a hand that was going: “came anyway.”'),
  K76V('(TO BE KILLED. They believed it to the end. I had ceased to mean it by the second night, and I did not once say so. I am a man who writes everything down.)')],()=>{S.kd.med=null;S.f.lateRoute='self';S.f.e2l98='late';save();startLone('v')},'#000')},'#000')},'#000')}

/* ---------- 3 · interrupted ---------- */
function k98Interrupted(){const m=S.kd.med;S.f.kdInterrupted=1;S.f.e2l98='heard';save();go(cutBg('#000'));cut([
 N('The tall one has not walked the passage since the night that they gave him a message to carry. He has sat against the door every night since, with the ledger shut on his knee, because of how they said it.'),
 N('So he hears it the second that it changes. Before the breathing. The small sound of somebody deciding.'),
 N('The door comes off its top hinge. He does not slow down for it.'),
 N('He has their wrists, both of them, in one hand, the broken one and the other. They go for his eyes with what they have left, which is nothing, and he lets them. He is saying something over and over that they cannot hear yet.'),
 N('“—Tuesday. It is Tuesday. It is my house. I am K9. I swore to kill you, and I have not, and I am not going to, and neither are you. The sign on the door says LAUNDRY. You are in my laundry. It is Tuesday.”'),
 M2('(…the sign.)','(…the sign.)'),
 M2('(YRDNUAL. it’s backwards. it’s been backwards the whole — the frog. the pillows. the SOUP)','(YRDNUAL. it’s backwards. it has been backwards the whole — the frog. the pillows. the soup)'),
 N('It comes at them all at once, as a room comes back when somebody puts the light on, and it is so much worse and so much better than the cell that they cannot get a breath.'),
 M2('ur honour','your honour'),
 K76V('Yes.'),
 M2('it was U. the whole time. u made the soup','it was you. the whole time. you made the soup'),
 K76V('I made the soup.'),
 M2('it’s so BAD','it’s so bad'),
 K76V('So I am told. You may tell me again tomorrow. I should like you to tell me every day.'),
 N('He does not let go of their hands. They do not tell him to. They sit on the infirmary floor, with the door hanging by one hinge, until it is light, and the grey hound comes in over the broken door and lies down across the pair of them.'),
 N('Towards morning they tell him, without much force, that they are still going to kill him. He says that he will hold them to it.')],
 ()=>{m.logicOut=1;m.ext=0;m.clar=3;S.comp=clamp(S.comp+25);apply({aff:4});note('kd_interrupted','The night in the infirmary when the tall one said who he was. “I swore to kill you, and I have not, and I am not going to, and neither are you.” Neither of them talks about it.');save();toRoom('medbay',[150,150])},'#000')}
if(typeof kdSpiral==='function'){const _sp98=kdSpiral;kdSpiral=function(){try{if(K98())return k98Spiral()}catch(e){}return _sp98.apply(this,arguments)}}
if(typeof kdEv==='function'){kdEv('kd_interrupted_after_e2l',()=>S.f.kdInterrupted&&S.f.e2l===1&&kdD()>=1&&!S.f.kdIntAfter,done=>{S.f.kdIntAfter=1;save();const me=S.pov!=='v';say(me?[
 N('The infirmary door has a new hinge. V fitted it himself. He did not replace the door. There is a dent in it at the height of a man’s shoulder.'),
 N('He sits in the passage at night, on a kitchen chair, with the ledger. You found out on the second night. He walks to the chair loudly, so that you will know that he is there.'),
 K76MV('(he heard me bc i sent k9 a message. and he WAS k9. and he sat there every night after. that’s the only reason i’m here. …i OWE him. fuck)','(he heard me because i sent k9 a message. and he was k9. and he sat there every night after. that’s the only reason i’m here. …i owe him. fuck)','(He heard me because I sent K9 a message. And he was K9. And he sat there every night after. That’s the only reason I’m here. …I owe him. Fuck.)','(He heard me because I sent K9 a message, and he was K9, and he sat at that door every night after. That’s the only reason I’m here. …I owe him. Fuck.)')]:[
 N('You fit a new hinge on the infirmary door. You do not replace the door. You leave the dent.'),
 N('You sit in the passage at night, on a kitchen chair, with the ledger shut. The grey hound comes on the first night, and the other three on the second. Nobody in the house mentions it.'),
 K76V('(I was at that door because of a message that I was asked to carry to myself. Had they not sent it, I should have been upstairs. Their page is in the book still. I have written nothing under it, and I do not mean to be asked why.)')],()=>{apply({aff:3});calm(3);done()})});
 if(typeof KD_ORDER!=='undefined')KD_ORDER.unshift('kd_interrupted_after_e2l')}

/* ---------- 4 · V, after ---------- */
const K98_AFTER=[
 [N('He takes the infirmary door off its hinges and leans it against the wall of the passage, so that the room cannot be shut again.'),
  N('Then he goes up to the study and opens the ledger at their page. Every page in that book ends in the same way: a date, and a total. He has done it forty-one times.'),
  N('He sits with the pen. He is an honest bookkeeper. He writes the date. Under TOTAL he writes: “Not collected.”'),
  K76V('(It is the only page in the book that I did not finish. I shall leave the book open at it. Let it be the first thing that anybody sees who comes into this room for me.)')],
 [N('Ronin comes on the third day, with the crowbar and the book.'),
  [RN,'Whole city figures you did it. Hale figures you did it. I had a guy in a bar tell me you did it, an’ he’s in the hospital.'],
  K76V('I said that I would. Before witnesses.'),
  [RN,'Yeah, you did. An’ I told ’em you couldn’t. Stood up in a room an’ said my friend the serial killer couldn’t do it. You know how that sounds?'],
  N('He puts the book on the kitchen island. It has a rubber band round it. He has ruled a line under the last page.'),
  [RN,'Book’s closed. Everybody gets their stake back. I had four-to-one you’d never. I was right, an’ I ain’t collectin’.'],
  N('He stands there. Then he puts the crowbar through the kitchen table, once, to the floor, and leaves it standing in it, and goes out. V does not have it removed.')],
 [N('Angel comes with no make-up on, and a cactus in a pot.'),
  [AN,'nobody else knows how to keep it. you watered it once and they nearly killed you for it. so don’t water it.'],
  K76V('I shall not water it.'),
  [AN,'they left the rifle to me. the truck to ronin. you’re not in it. i checked twice. i want you to know they didn’t leave you anything, and i’m giving you this anyway, because i think they’d have hated that.'],
  N('He puts it on the sill in the spare room, which was never slept in. He does not water it. In March it flowers, one small yellow flower, and he stands in the door looking at it with his hands behind him, like a man who has been insulted.')],
 [N('He is their landlord. He had forgotten. The first of the month comes, and there is four hundred dollars owing on a trailer in lot fourteen.'),
  N('He pays it. He pays it to his own holding company, out of his own pocket, in cash, and he has the receipt made out in their name. PAID. He does the same on the first of the month after.'),
  K76V('(They were proud of that receipt. They had it in a back pocket. They meant to put it down in front of me and say: on time.)'),
  N('The lot is not let again. He has the lock changed for a better, and he keeps no key.')],
 [N('He takes the four. It is the longest piece of work of his life, and he does it alone, and he tells each of them what it is for.'),
  N('He is exact. Nothing is done that does not answer to something. Each of them asks what he gets out of it, and to each he gives the one word, and there is no smile with it.'),
  N('It does not help. He had not supposed that it would. A debt paid to the wrong creditor is not discharged, and he was not the one who was owed. He does it thoroughly all the same, and the hounds eat for a month.')],
 [N('He has made the soup. It is noon. There is a pan of it on the stove and a tray laid, and he has been doing it for nine days at eight and noon and six without once looking at his hands.'),
  N('He tastes it, standing. There is too much pepper. The onion has caught.'),
  K76V('(It is bad. They were quite right. I had put it down to malice.)'),
  N('He does not correct the recipe. He puts the bowl on the floor, and the old hound eats it, and looks up at him afterwards as that hound looks at a man who has been ill.')],
 [N('On War Day he goes to the bowling alley. Angel has kept the lane. Nobody bowls. Ronin reads the accords out, all four clauses, to an empty chair, and they let him.'),
  N('Afterwards V goes out to the car park alone. It is where they said that they would do it. Somewhere stupid: they named it twice, and laughed.'),
  N('He stands in the middle of it for an hour, in the open, under the lamp, with his back to the laundromat roof. It is the worst place in the city for a man in his trade to stand. He knows the range from that roof. He paced it in April.'),
  N('Nothing happens. A car alarm goes off, and stops. At eleven he does up his coat and drives home at exactly the speed limit.')]];
const _me98=morningEvent;morningEvent=function(done){try{if(S&&S.lone==='v'&&S.f.lateRoute==='self'&&S.f.e2l===1){const n=S.f.e2l98After||0;
  if(n<K98_AFTER.length){if(S.f.kdAfterDay!==S.day){S.f.e2l98After=n+1;S.f.kdAfterDay=S.day;if(n+1>=K98_AFTER.length&&typeof KD_AFTER!=='undefined')S.f.kdAfterN=KD_AFTER.length;save();go(cutBg('#0a0a0c'));return say(K98_AFTER[n],()=>_me98(done))}}
  else if(typeof KD_AFTER!=='undefined'&&(S.f.kdAfterN||0)<KD_AFTER.length){S.f.kdAfterN=KD_AFTER.length;save()}}}catch(e){}return _me98(done)};
/* ===KC98-END=== */
