/* ===KC79-BEGIN=== */
/* ===================== THE WAR: WHAT IT COSTS (kc79) =====================
   More of the enemies-to-lovers route, and the part that hurts. Needs kc73, kc76, kc77, kc78.
   Beats (kc73's order, kc76's cards):
     II  e2l_gone   V only, while Misaki is held: the empty trailer he once came to with sheeting   S.f.e2lGone recover|cactus
     IV  e2l_cant   after the corridor: the thing each of them cannot do                           S.f.e2lCant deleted|angel (M), capped|pencil (V)  (free)
         e2l_night  three in the morning; Misaki rings the number they bolt the door against       S.f.e2lNight opened|shut
         e2l_dress  Angel's two black garment bags, bought in March                                S.f.e2lDress said|quiet  (free)
     V   e2l_last   lovers: the pistol at his temple, in his bed (the first week again)             S.f.e2lPillow down|held
                    rivals: the message neither of them sends, on the anniversary                  S.f.e2lPillow bullet|nothing
   Voices: Misaki talks themself through fear in numbered steps and does not reach three; V states it as fact and
   keeps the true thought in brackets. Nothing here names or shows what happened in the hours.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc79.md. Test: node tools/k79_test.js */
const K79=()=>{try{return typeof K78==='function'&&K78()}catch(e){return false}};

/* ===================================== II · THE EMPTY TRAILER (V) ===================================== */
const k79GoneOk=()=>{try{return K79()&&S.phase==='taken'&&S.pov==='v'&&!k73Done('e2l_gone')&&S.day>(S.takenDay||0)}catch(e){return false}};
function k79Gone(){k77Go('#08070a');k73Mark('e2l_gone',1);const f=S.f;
 say([
  ['','Their trailer door is standing open, and one shoe is in the gravel. You came here in the first week with a roll of sheeting to do this yourself. Somebody has done it for you, badly, with a van.'],
  ['',f.e2lEye==='note'?'Your own writing is still propped against the cereal box on the back of their electricity bill: OWED: ONE EYE, AND THE REST.':'The pistol is still under the pillow. They did not reach it. You know the side they sleep on, and you can see how far the hand got.'],
  K76V('(I have wanted this trailer empty. I planned it on the ops table, three ways.)'),
  ['','The cactus is on the windowsill'+(f.e2lPrickles?', with a hole in it from each of you':'')+'. Its soil is dry. You stand there with their kettle in your hand for some time before you understand that you are watering it.'],
  K76V('(They are a wanton thing with no law, and they are mine to put down. It is merely that. Somebody has taken what is mine.)'),
  K76V('(It is not merely that.)'),
  ['','You sit down at the fold-down table, where you sat with the sheeting, and open the ledger at their page. Under the last line you write the date, and TAKEN BY OTHERS.']],
 ()=>ask('K9','(The pen is still on the paper.)',[
  {t:'Write: TO BE RECOVERED',fn:()=>{f.e2lGone='recover';save();say([
   ['','You write TO BE RECOVERED. Under it, because the book must be exact, you write AND THEN KILLED.'],
   ['','You look at the last three words until the light in the trailer goes. You do not strike them. You do not cross things out.']],hub)}},
  {t:'Write nothing more. Take the cactus',fn:()=>{f.e2lGone='cactus';save();say([
   ['','You carry it out to the car under your coat, as if you had stolen it. The grey hound smells it the whole way home.'],
   K76V('(They would come back into a fire for it. I wrote that down in the first week, as a way to kill them.)')],hub)}}]))}
const _sh79=sideHub;sideHub=function(late){const o=_sh79(late);try{if(S&&k79GoneOk())o.push({t:'⚔ Their trailer: the door is open',sub:'costs time · the war · II · you came here once with sheeting',dis:!!late,fn:()=>{spend();k76Card('e2l_gone',()=>k79Gone())}})}catch(e){}return o};

/* ===================================== IV · THE THING YOU CANNOT DO ===================================== */
function k79Cant(){k77Go('#060609');k73Mark('e2l_cant',1);const m=k76M(),f=S.f;
 if(m)return say([
  ['','The trailer, four in the morning, both bolts on. You have a message to K9 typed out on the phone. It says: “i wouldn’t. ok. i wouldn’t do it. not for money, not for anything.”'],
  ['','You have typed it eleven times tonight and deleted it eleven times.'],
  K76MV('(one: he reads it and believes me. two: he reads it and knows i’m soft now, and a man with a book and a cold room knows what to do with soft. three: he reads it and doesn’t answer. what if it’s three, what if he just—)','(one: he reads it and believes me. two: he reads it and knows i’m soft now, and a man with a book and a cold room knows what to do with soft. three: he reads it and doesn’t answer. what if it’s three, what if he just doesn’t—)','(One: he reads it and believes me. Two: he reads it and knows I’m soft now, and a man with a book and a cold room knows what to do with soft. Three: he reads it and doesn’t answer. What if it’s three, what if he just doesn’t—)','(One: he reads it and believes me. Two: he reads it and knows that I am soft now, and a man with a book and a cold room knows what to do with soft. Three: he reads it and does not answer. What if it is three, what if he simply does not—)'),
  ['','In the bed under his house you said thank you to whoever held the keys. You swore afterwards that you would never again be nice to somebody because they could hurt you. You cannot tell, tonight, whether this is that.'],
  K76MV('(life is so fucking unfair. i finally want to say one nice thing and i can’t tell if it’s mine)')],
 ()=>ask('hitmeuppp','(Your thumb is over the arrow.)',[
  {t:'Delete it',fn:()=>{f.e2lCant='deleted';save();say([['','You delete it, and put the phone face down, and lie on your right side with the pistol, counting the bolts. Two. Two. Two.']],hub)}},
  {t:'Send it to Angel instead',fn:()=>{f.e2lCant='angel';save();say([
   [AN,'(text) i know, baby. i’ve known since the river'],[AN,'(text) now send it to HIM'],
   K76MV('(text) can’t'),[AN,'(text) i know that too'],
   ['','She stays on the line until it is light and does not make you say anything else.']],()=>{fr('a',1);hub()})}}]));
 say([
  ['','The study, four in the morning. The ledger is open at their page. The fountain pen is uncapped, and the nib is a finger’s width above the M of their name.'],
  ['','One line through it. They asked for that in the corridor. It would take less ink than a signature.'],
  K76V('(If I strike this name, I own a book in which names may be struck. The card man is in this book, and every aberration before him. Each of them died because what is written here is not open to appeal.)'),
  K76V('(If it is open to appeal for the one whom I happen to — )'),
  ['','You do not finish the sentence. A drop of ink falls from the nib and lands beside their name. You blot it at once, very carefully, so that it will not look like the beginning of a line.'],
  K76V('(I can kill for this book. It appears that I can do nothing else for it.)')],
 ()=>ask('K9','(The nib has not moved.)',[
  {t:'Cap the pen',fn:()=>{f.e2lCant='capped';save();say([['','You cap the pen and lay it in the groove of the tray. Your hand is perfectly steady. You sit with it flat on the page, over their name, until the hounds begin to ask for the door.']],hub)}},
  {t:'Write beside the name, in pencil',fn:()=>{f.e2lCant='pencil';save();say([
   ['','There is a pencil in the drawer. You have never used one in this book. You write beside their name, very small: NOT BY ME.'],
   K76V('(Pencil is not a crossing-out. It can be rubbed away.)'),
   ['','You know that you will not rub it away. You shut the book on it before the graphite has had time to smudge.']],hub)}}]))}

/* ===================================== IV · THREE IN THE MORNING ===================================== */
function k79Night(){k77Go('#030305');k73Mark('e2l_night');const m=k76M(),f=S.f;
 const door=[K76V('I am outside. I am not coming in. There are two bolts between us. My coat is on the bonnet of the car, where you can see it from the window, and the scalpel is in the pocket.'),
  K76V('You are in your trailer. It is Tuesday. The door opens from your side.')];
 const L=(m?[
  ['','You wake at three in the trailer, and it is not the trailer. It is the room with the one bulb. The bolts are on the wrong side of the door, and your left hand has shut and will not open.'],
  K76MV('(one: this is the trailer. two: this is the trailer, look, the cactus, the stupid cactus. three—)','(one: this is the trailer. two: this is the trailer, look, there’s the cactus, the stupid cactus. three—)','(One: this is the trailer. Two: this is the trailer, look, there’s the cactus, the stupid cactus. Three—)','(One: this is the trailer. Two: this is the trailer; look, there is the cactus, the stupid cactus. Three—)'),
  ['','You do not get to three. Your right hand has the phone, and it has rung the only number it knows without asking you.'],
  K76V('(on the phone) Misaki.'),
  ['','You cannot make a word. He listens to you breathe for about four seconds, and then you hear car keys.'],
  ['','Eleven minutes later there are headlights in the lot, and then his voice on the other side of your door. He does not touch the handle.']]:[
  ['','Your phone rings at three. It is Misaki. They do not speak. You listen to them breathe for four seconds. You know the sound: you heard it through a vent for a week.'],
  ['','You are in the car before you have decided anything. In the trailer lot you take off your coat and leave it on the bonnet, with the scalpel in the pocket, where it can be seen from their window.'],
  K76V('(I am the thing they bolt this door against. I am also the number they rang. I cannot tell which of us that is worse for.)'),
  ['','You stand four steps back from the door, in the rain, and do not touch the handle.']]).concat(door,[
  m?K76MV('(he’s who i’m scared of. he’s who i called. what the FUCK is wrong with me)','(he’s who i’m scared of. he’s who i called. what the fuck is wrong with me)','(He’s who I’m scared of. He’s who I called. What the fuck is wrong with me?)','(He is who I am scared of, and he is who I called. What the fuck is wrong with me?)'):['','Inside, something small falls over. Then nothing, for a long time, except their breathing, which you can hear through the door.']]);
 const opened=()=>{f.e2lNight='opened';apply({aff:3});save();say([
   ['',m?'It takes both hands, and a long time. He is standing four steps back in his shirtsleeves in the rain, with his arms held out from his sides, soaked to the skin. He looks at your left hand before he looks at your face.':'It takes them a long time. When the door opens you are still four steps back, in your shirtsleeves, with your arms held out from your sides. You look at the left hand before you look at their face.'],
   K76V('May I?'),
   ['',m?'You hold it out. He opens your fingers one at a time, as he did when he changed the dressing, and comes not one step nearer than he has to.':'They hold it out. You open the fingers one at a time, as you did when you changed the dressing, and go not one step nearer than you have to.'],
   K76MV('this doesn’t change anything','this doesn’t change anything, ok','This doesn’t change anything.','This doesn’t change anything, V. I want that understood.'),
   K76V('No. I will be gone before it is light, and tomorrow you may go back to believing whatever keeps you alive.')],hub)};
 const shut=()=>{f.e2lNight='shut';apply({aff:3});save();say([
   m?K76MV('don’t come in','don’t come in. don’t','Don’t come in.','Don’t come in. Please don’t come in.'):null,
   m?K76V('I will not.'):null,
   ['',m?'He does not. You hear him sit down on the step, in the rain. Every so often he tells you the day, and that the door opens from your side, in the voice he uses for reading out minutes.':'You sit down on their step, in the rain. Every so often you tell the door what day it is, and that it opens from their side. You use the voice in which you read out minutes, because it is the only one you have that does not shake.'],
   ['',m?'At some point your hand opens. When it gets light the step is empty and wet, except for one dry patch the width of a man.':'Towards five the breathing behind the door evens out. You go before it is light, as they would wish. You leave a dry patch on the step, and you find that you resent the rain for the speed at which it will cover it.']],hub)};
 say(L,()=>ask(K73Who(),m?'(Two bolts. They open from your side.)':'(Two bolts, on their side.)',m?[
  {t:'Open the door',sub:'it will take both hands',fn:opened},{t:'Keep it shut',sub:'he stays where he is',fn:shut}]:[
  {t:'Ask them to open the door',sub:'and stay four steps back',fn:opened},{t:'Sit down on the step',sub:'ask for nothing',fn:shut}]))}

/* ===================================== IV · TWO GARMENT BAGS ===================================== */
function k79Dress(){k77Go('#0a080a');k73Mark('e2l_dress',1);const m=k76M(),f=S.f;
 const L=[
  ['','Angel gets the two of you into her studio by saying it is about Friday. It is not about Friday. She has no make-up on, which neither of you has seen since the river, and there are two garment bags on the rail.'],
  [AN,'I bought these in March. One each. Black. Yours is taken in at the waist, V. Misaki’s is trousers, because I am not burying them in a skirt.'],
  [AN,'I’ve been to both funerals in my head. I know what I’m reading at each one. I know which of you I never speak to again afterwards.'],
  [RN,'I’m carryin’ the box at both. Already picked the hole. Don’t look at me, she made me.'],
  [AN,'So one of you is going to tell me, right now, to my face, that I wasted my money.'],
  ['','There is a silence. You look at each other across a dress rail, each waiting to hear it from the other one first, and Angel watches you both wait.']];
 const said=()=>{f.e2lDress='said';save();say(m?[
   K76MV('u wasted ur money','you wasted your money, angel','You wasted your money, Angel.','You wasted your money, Angel. Both of them.'),
   [AN,'Thank you. Now say it to him.'],K76MV('…'),[AN,'Yeah. That’s what I thought.'],
   K76V('I heard it.'),K76MV('i said it to HER','i said it to her. not to you','I said it to her. Not to you.','I said it to her, V. Not to you. Don’t write it down.'),
   K76V('(I will write it down.)')]:[
   K76V('You wasted your money, Angel.'),
   [AN,'Thank you. Now say it to them.'],K76V('…'),[AN,'Yeah. That’s what I thought.'],
   K76MV('i heard it','i heard it, grandpa','I heard it.','I heard it. I’m not deaf.'),K76V('I said it to Angel.'),
   K76V('(They heard it. I cannot tell what they will do with it. I find that I said it anyway.)')],()=>{fr('a',2);hub()})};
 const quiet=()=>{f.e2lDress='quiet';save();say([
   ['','Angel zips both bags shut again, slowly, one and then the other.'],
   [AN,'Okay. Then they stay on the rail.'],
   [AN,'Get out of my flat. Both of you. Separately. I can’t watch you go down the stairs together.'],
   ['',m?'You go first. On the second landing you stop and listen for his feet above you, and you cannot tell whether you are listening for a man coming after you or a man who might fall.':'They go first. You give them two landings. You stand at the top with your hand on the rail and listen to their feet, and you cannot tell whether you are tracking them or seeing them safely down.']],()=>{fr('a',1);hub()})};
 say(L,()=>ask(K73Who(),m?'(She’s looking at you first.)':'(She is looking at you first.)',m?[
  {t:'“u wasted ur money”',fn:said},{t:'Say nothing',fn:quiet}]:[{t:'“You wasted your money, Angel.”',fn:said},{t:'Say nothing',fn:quiet}]))}

/* ===================================== V · THE PILLOW ===================================== */
function k79Last(){k77Go('#060508');k73Mark('e2l_last');const m=k76M(),f=S.f,lov=f.e2lEnd==='lovers';
 if(lov){const L=m?[
   ['','His bed, four in the morning, months in. He turns over in his sleep, and his arm comes across you, and you are awake with the pistol against his temple before you know whose arm it is.'],
   ['','It is the trailer in the first week again: his head, your gun. He opens his eyes and does not move his hands.'],
   K76V('It happens.'),
   K76MV('(i love him. i’ve got a gun to his head. both. at once. life is so fucking unfair)','(i love him. i’ve got a gun to his head. both, at the same time. life is so fucking unfair)','(I love him. I’ve got a gun to his head. Both, at the same time. Life is so fucking unfair.)','(I love him, and I have a gun to his head. Both, at the same time, in his own bed. Life is so fucking unfair.)')]:[
   ['','You turn over in your sleep, and wake with their pistol against your temple. Their eyes are open. They are not in this room. They are in the other building.'],
   ['','It is their trailer in the first week again: your head, their gun. You do not move your hands.'],
   K76V('It happens.'),
   K76V('(I swore once to put them down. I will lie under this for as long as it takes, on every night that it takes, and I will not reach for it. That is the whole of what I have to give them, and it is not enough, and I will go on giving it.)')];
  const down=()=>{f.e2lPillow='down';apply({aff:2});save();say([
    ['',m?'It takes a while. The hand does not take orders at this hour. He waits. When the pistol is on the nightstand he slides it an inch nearer to you, so that you can reach it, and goes back to sleep on the side that faces it.':'It takes them a while. The hand does not take their orders at this hour. You wait. When the pistol is on the nightstand you slide it an inch nearer to them, so that they can reach it, and lie down again on the side that faces it.'],
    K76MV('sorry','…sorry','Sorry.','Sorry. I hate that I do that.'),K76V('Do not be. I earned that reflex. I would rather you kept it than lost it on my account.')],hub)};
  const held=()=>{f.e2lPillow='held';apply({aff:2});save();say([
    ['',m?'You keep it there. He lies still under it for twenty minutes and tells you the day, and that the door opens from your side, and what the hounds ate. Your hand gives up at twenty past four.':'You keep still under it for twenty minutes, and tell them the day, and that the door opens from their side, and what the hounds ate. Their hand gives up at twenty past four.'],
    K76V('Better?'),K76MV('shut up','shut up. …yeah','Shut up. …Yeah.','Shut up. …Yes. Say the bit about the hounds again.')],hub)};
  return say(L,()=>ask(K73Who(),m?'(Your hand hasn’t caught up yet.)':'(Their hand has not caught up with them yet.)',m?[
   {t:'Put it down',fn:down},{t:'Keep it there until your hand believes you',fn:held}]:[{t:'Wait for them to put it down',fn:down},{t:'Keep still, and tell them the day',fn:held}]))}
 const L=m?[
  ['','The anniversary. You are on the water tower with his window in the scope, as the terms allow. He is at his desk with the lamp on. On your phone there is a message, typed and not sent, that says “come up here”.'],
  K76MV('(one: i send it and he comes. two: he comes and i put the rifle down. three: then i’m the one who went first, and he never has to, and what if that’s what he’s waited a whole year for, what if—)','(one: i send it and he comes. two: he comes and i put the rifle down. three: then i’m the one who went first and he never has to, and what if that’s what he’s been waiting a whole year for, what if—)','(One: I send it and he comes. Two: he comes and I put the rifle down. Three: then I’m the one who went first and he never has to, and what if that’s what he’s been waiting a whole year for, what if—)','(One: I send it and he comes. Two: he comes and I put the rifle down. Three: then I am the one who went first, and he never has to, and what if that is what he has waited a whole year for, what if—)'),
  ['','You delete it. In the scope he picks up his own phone, looks at it for a long time, and lays it face down on the blotter. You will never know what he had typed.']]:[
  ['','The anniversary. They are on the water tower. You have known the shape of them up there for a year. On your phone there is a message, typed and not sent, that says “Come down.”'],
  K76V('(If I send it, I have asked. A person who kills for whoever pays will know exactly what a man who asks is worth.)'),
  K76V('(I do not believe that of them any longer. I act as though I do. It has kept us both alive, and I cannot find the day on which it stopped being a reason.)'),
  ['','You lay the phone face down on the blotter. You will never know whether they saw you do it.']];
 const bullet=()=>{f.e2lPillow='bullet';save();say(m?[
   ['','At midnight you go in by the bedroom window, which is never latched on this night, and stand the bullet on his pillow.'],
   ['','He sleeps beside it. You watch him do it from the tower until it gets light. Then you go home and eat cereal out of the box, and it is the worst thing you have ever tasted.']]:[
   ['','You leave the bedroom window unlatched, as you do on this night. At midnight there is a bullet standing on the pillow.'],
   ['','You sleep beside it. It is the one night of the year on which you sleep through, and you have never told anybody that.']],hub)};
 const nothing=()=>{f.e2lPillow='nothing';save();say(m?[
   ['','You leave nothing this year. You stay on the tower with your hands in your sleeves.'],
   K76V('(text) There was no bullet. Are you alive.'),K76MV('(text) yes'),
   ['','That is the whole conversation. You read it forty times before you climb down.']]:[
   ['','You go to bed. There is no bullet on the pillow this year, and you do not sleep.'],
   K76V('(text) There was no bullet. Are you alive.'),K76MV('(text) yes'),
   ['','That is the whole conversation. You read it more often than you would admit to the book.']],hub)};
 say(L,()=>ask(K73Who(),m?'(His lamp is still on.)':'(The tower is a dark shape against the sky.)',m?[
  {t:'Stand the bullet on his pillow, as always',fn:bullet},{t:'Leave nothing this year',fn:nothing}]:[{t:'Leave the bedroom window unlatched',fn:bullet},{t:'Go to bed',fn:nothing}]))}

/* ===================================== SPLICE ===================================== */
(function(){try{if(typeof K73B==='undefined'||typeof k76Card!=='function')return;const at=id=>K73B.findIndex(b=>b.id===id);
 const add=(before,b)=>{const r=b.run;b.run=function(){return k76Card(b.id,()=>r())};const i=before?at(before):-1;K73B.splice(i<0?K73B.length:i,0,b)};
 const open=()=>S.phase==='act3'&&!S.f.e2lEnd&&!k73Done('e2l_boat');
 add('e2l_guard',{id:'e2l_cant',t:()=>k76H('The trailer, four in the morning: a message to K9','The study, four in the morning: the pen'),sub:()=>'costs time · what you cannot do',when:()=>open()&&k73Done('e2l_row')&&k73Fresh(),run:k79Cant});
 add('e2l_will',{id:'e2l_night',t:()=>k76H('Three in the morning. It is not the trailer','Three in the morning. Your phone'),sub:()=>'costs time · two bolts',when:()=>open()&&k73Done('e2l_row')&&k73Fresh(),run:k79Night});
 add('e2l_will',{id:'e2l_dress',t:()=>'Angel wants you both at the studio',sub:()=>'costs time · she says it is about Friday',when:()=>open()&&k73Done('e2l_guard')&&k73Fresh(),run:k79Dress});
 add(null,{id:'e2l_last',t:()=>S.f.e2lEnd==='lovers'?k76H('His bed, four in the morning','Four in the morning: their pistol'):k76H('The water tower, on the anniversary','The anniversary: the tower'),sub:()=>'costs time · a year on',when:()=>S.phase==='epilogue'&&k73Done('e2l_epi')&&!!S.f.e2lEnd&&k73Fresh(),run:k79Last})}catch(e){}})();

/* ===================================== ENDINGS ===================================== */
const _xe79=extraEnding;extraEnding=function(){const L=_xe79();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f;
 if(f.e2lGone==='cactus')L.push('While Misaki was held, V took their cactus home under his coat and watered it. He had once written it down as a way to kill them.');
 else if(f.e2lGone==='recover')L.push('While Misaki was held, V wrote on their page: TO BE RECOVERED, AND THEN KILLED. Only the first half was ever done.');
 if(f.e2lCant==='pencil')L.push('Beside Misaki’s name in V’s ledger there are three words in pencil, the only pencil in the book: NOT BY ME.');
 else if(f.e2lCant==='angel')L.push('Misaki typed “i wouldn’t” to V eleven times and sent it to Angel.');
 if(f.e2lNight==='opened')L.push('One night Misaki rang the man they were bolting the door against, and then opened the door to him. He stood four steps back in the rain.');
 else if(f.e2lNight==='shut')L.push('One night V sat on Misaki’s trailer step in the rain until it was light, telling a bolted door what day it was.');
 if(f.e2lDress)L.push('Angel still has two black garment bags on the rail, bought in March. She has never had to open either.');
 if(f.e2lPillow==='down'||f.e2lPillow==='held')L.push('Some nights Misaki still wakes with the pistol at V’s head. He lies still, tells them the day, and does not reach for it.');
 else if(f.e2lPillow==='bullet')L.push('On the anniversary each of them typed a message asking the other to come, and neither sent it. The bullet stood on his pillow as usual.');
 else if(f.e2lPillow==='nothing')L.push('On the anniversary each of them typed a message asking the other to come, and neither sent it. “Are you alive.” “yes.”')}catch(e){}return L};
/* ===KC79-END=== */
