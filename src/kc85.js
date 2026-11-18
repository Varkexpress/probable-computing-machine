/* ===KC85-BEGIN=== */
/* ===================== THE WAR: MORE OF THE ROOM (kc85) =====================
   More infirmary on the enemies-to-lovers route, for both aftermath settings. kc84's scheduler fills every slot of the
   stay already, so these are opened by the player: while kdMed(), the side menu has one free ⚔ entry (The room /
   Outside the room). Each scene plays once; three a slot at most, six listed at a time (S.f.e2l85 {id:1}, S.f.e2l85Day, S.f.e2l85N).
   Needs kc73, kc76–kc84.
   FULL STORY (kc29's rules: never named; the honest option greyed with KD_NO; each pretence a kdDeny(); nobody tells
   Ronin or Angel; V never shown knowing what Misaki has said to the doctor):
     Misaki, cell:  x_radio, x_water     Misaki, clear: x_ceiling, x_fridge      V: x_radioV, x_owed (S.f.e2lOwed word|blank)
   INJURIES ONLY (kc36's rules: no denial, no doctor, V does the treatment; V's disgust, despite himself):
     Misaki, cell:  y_report, y_ties    Misaki, clear: y_floss, y_stars         V: y_boot, y_sleep
   EITHER SETTING:  Misaki, clear: z_name (how he says it)     V: z_line (the chalk line, four steps from the door)
   Voice: Misaki keeps the swearing, the jokes and some contractions at every tier (tools/mv_loosen.py contracts the
   common pairs in the top tier of kc76–kc85 and changes nothing else).
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc85.md. Tested in tools/k80_test.js. */
const K85=()=>{try{return typeof K84==='function'&&K84()}catch(e){return false}};

const K85S=[
 /* ---------------- full story: Misaki ---------------- */
 {id:'x_radio',pov:'m',mode:'sa',st:'cell',t:'Somebody has a radio on',run:cb=>say([
   ['','Somewhere past the door a radio comes on. It is a choir, and a man shouting about the Lord over the top of it.'],
   ['','You stop. All of you stops: the breathing, the counting, the hand. You are looking at the ceiling, and you cannot remember having decided to.'],
   K76MV('(it’s a radio. it’s JUST a radio. people have radios. stop it)','(it’s a radio. it’s just a radio. people have radios. stop it)','(It’s a radio. It’s just a radio. People have radios. Stop it.)','(It’s a radio. It’s just a radio. People have radios, you absolute idiot. Stop it.)'),
   ['','It goes off. It was on for about four seconds. In the corridor somebody says something short, and somebody else says “the fuck, Vee”, and then there is no sound at all.'],
   ['','The tall one opens the door a hand’s width, without coming in. He says that there will be no radio in this corridor again.']],
   ()=>ask('hitmeuppp','(He is waiting in the gap of the door.)',[
    k84No('Remember what comes after the radio gets turned up.'),
    {t:'“u can put it back on. i’m fine. i like choirs”',fn:()=>{k84Deny();say([
     k80Gone()?['','You get as far as a thumbs-up. It is the wrong hand, and it does not open.']:K76MV('put it back on. i’m fine. i love a choir','you can put it back on. i’m fine. i love a choir','You can put it back on. I’m fine. I love a choir.','You can put it back on, honestly. I’m fine. Big choir fan. Huge.'),
     ['','He looks at your hands, which are both fists, and says that the radio has been taken out to a truck. He shuts the door so that the latch makes no noise.'],
     K76MV('(he didn’t believe me. rude. i’d believe me)','(he didn’t believe me. rude. i would’ve believed me)','(He didn’t believe me. Rude. I’d’ve believed me.)','(He didn’t believe me. Rude. I’d have totally believed me.)')],cb)}}]))},
 {id:'x_ceiling',pov:'m',mode:'sa',st:'clear',t:'The ceiling',run:cb=>say([
   ['','You can’t sleep, so you invent a game. You rate ceilings.'],
   ['','This one is V’s. White, one smoke detector, a crack like a river in the corner. The detector blinks green every nine seconds. Solid. A six.'],
   K76MV('(the trailer’s a 7, it’s got the stars. angel’s is a 9 bc of the mirror, the pervert. the other one was a—)','(the trailer’s a seven, it’s got the stars. angel’s is a nine because of the mirror, the pervert. the other one was a—)','(The trailer’s a seven; it’s got the stars. Angel’s is a nine because of the mirror, the pervert. The other one was a—)','(The trailer’s a seven, because of the stars. Angel’s is a nine because of the mirror, the absolute pervert. The other one was a—)'),
   ['','You know the other one very well. You could draw it. You have told everybody that you slept through those hours, and nobody sleeps with their eyes on a ceiling.']],
   ()=>ask('hitmeuppp','(Green. Nine seconds. Green.)',[
    k84No('Give the other ceiling its number.'),
    {t:'Tell V his ceiling is a six',fn:()=>{k84Deny();say([
     ['','He comes in at seven with the tray, and you get in first.'],
     K76MV('ur ceiling’s a 6. just so u know','your ceiling’s a six. just so you know','Your ceiling’s a six. Just so you know.','Your ceiling’s a six, grandpa. Just so you know. Out of ten.'),
     K76V('It is a sound ceiling.'),
     K76MV('six. the crack loses u a point','six. the crack loses you a point','Six. The crack loses you a point.','Six. You lose a point for the crack and one for the vibes.'),
     ['','By the evening the crack has been filled and painted. You did not ask him to. You lie there and look at a seven, and you are so angry that you nearly cry.']],cb)}}]))},
 {id:'x_fridge',pov:'m',mode:'sa',st:'clear',t:'The small fridge',run:cb=>say([
   ['','There is a small fridge under the counter. It has a lock on it, new, with sawdust still on the floor where it was fitted.'],
   ['','You ask the doctor whether her boss thinks you are going to steal his yoghurt.'],
   ['','She says that he is not her boss in this. She says that he fitted the lock himself, gave her the only key, and told her not to hand it to him even if he asked.'],
   K76MV('he locked himself out of his own FRIDGE','he locked himself out of his own fridge','He locked himself out of his own fridge.','He locked himself out of his own fridge? That’s the dumbest thing I ever heard. He owns the fridge.'),
   ['','She says that there is a date on what is in it, and that the date is yours to use or not, and that nobody in this house will mention it again unless you do.']],
   ()=>ask('hitmeuppp','(The lock is very shiny.)',[
    k84No('Ask what is in the box.'),
    {t:'“cool. is there pudding in it”',fn:()=>{k84Deny();say([
     ['','There is pudding on the next tray. Chocolate, two of them. You eat both, staring at the lock.'],
     K76MV('(he doesn’t have the key. he MADE it so he doesn’t have the key. who does that)','(he doesn’t have the key. he made it so he doesn’t have the key. who does that)','(He doesn’t have the key. He made it so he doesn’t have the key. Who does that?)','(He doesn’t have the key. He set it up so he couldn’t. Who does that? What kind of evil billionaire does that?)')],cb)}}]))},
 /* ---------------- full story: V ---------------- */
 {id:'x_radioV',pov:'v',mode:'sa',t:'Ronin’s radio',run:cb=>say([
   ['','Ronin is in the kitchen chair outside the door marked LAUNDRY. He cannot sleep without the radio, so he has brought it in from the truck, and at two in the morning he turns it on low: a choir, and a preacher.'],
   ['','Behind the door, the breathing stops.'],
   ['','You have the radio out of his hands and off before the bar is finished.'],
   [RN,'The fuck, Vee.'],
   K76V('Not in this corridor.'),
   ['','He looks at the radio. He looks at the door. You watch him add it up, slowly, the way he does everything but kill.'],
   [RN,'Oh.'],[RN,'Vee, I didn’t —'],
   K76V('You could not have known. You do not know now. You have guessed, and you will keep your guess to yourself, as I keep mine.'),
   ['','He takes the radio out to the truck. Then he comes back and sits in the chair, awake, for the rest of the night, and for every night after it. He does not once complain of it. That is how you know what he has guessed.']],()=>{fr('r',1);cb()})},
 {id:'x_owed',pov:'v',mode:'sa',t:'The ledger: a new page',run:cb=>say([
   ['','You open the ledger at the four. Each has a charge, and a date, and a total that comes out even.'],
   ['','There are men from the building on the river who belong after them. You have some of their names. You uncap the pen to open a page, and you stop at the first line, which is where the charge goes.'],
   K76V('(I have always had the charge from the one it was done to. I have sat with them, and they have told me, and I have written it down in their words.)'),
   K76V('(Nobody has told me anything. They have said, loudly, with quotation marks, that there is nothing. The law is theirs to invoke, and they have not invoked it.)'),
   ['','You may kill those men for the hand and the ribs. That is in your gift. The rest is not a charge that you are entitled to name.']],
   ()=>ask('K9','(The line for the charge is empty.)',[
    k84No('Write the charge.','it is not yours to name'),
    {t:'Write: OWED TO M. AMOUNT NOT STATED. TO BE COLLECTED AT THEIR WORD',fn:()=>{S.f.e2lOwed='word';save();say([
     ['','You write it. It is the only entry in the book that waits on somebody else’s say.'],
     K76V('(If they never give the word, it is never collected. I will have to be a man who can leave that page open.)')],cb)}},
    {t:'Leave the line blank, and find the men for the hand',fn:()=>{S.f.e2lOwed='blank';save();say([
     ['','You write the hand, and the ribs, and the four days. You leave one line empty above them. You have never left a line empty.'],
     K76V('(It is the truest line on the page.)')],cb)}}]))},
 /* ---------------- injuries only: Misaki ---------------- */
 {id:'y_report',pov:'m',mode:'inj',st:'cell',t:'Tell him what’s broken',run:cb=>say([
   ['','He will want to know what he has got. The careful ones always do. So when he comes in, you give it to him like a job report for a client.'],
   k80Gone()?['','You hold up fingers. Three, for the hand. Three, for the ribs. You point at the wrists, and open your mouth to show him the gap.']:K76MV('left hand, 3 bones, maybe 4. ribs, 3, left side. wrists. one tooth, back left. that’s it. i’ve had worse off a ladder','left hand, three bones, maybe four. ribs, three, left side. both wrists. one tooth, back left. that’s it. i’ve had worse off a ladder','Left hand, three bones, maybe four. Ribs, three, left side. Both wrists. One tooth, back left. That’s it. I’ve had worse off a ladder.','Left hand, three bones, maybe four. Ribs, three, on the left. Both wrists. One tooth, back left, and I liked that tooth. That’s the lot. Honestly, I’ve had worse off a ladder.'),
   ['','He writes it down. He presses so hard that the pen goes through the paper on “ladder”.'],
   K76MV('(he’s going to wreck that nib. it’s a nice pen, too)','(he’s going to wreck that nib. and it’s a nice pen)','(He’s going to wreck that nib. And it’s a nice pen.)','(He’s going to wreck that nib, pressing like that. It’s a really nice pen, too.)'),
   ['','He asks you, in a voice like a drawer shutting, what happened on the ladder. You tell him you were ten and it was somebody else’s roof. He writes that down as well.']],cb)},
 {id:'y_floss',pov:'m',mode:'inj',st:'clear',t:'The old stitches',run:cb=>say([
   ['','He is doing the dressing on your side when he stops, with his thumb on something that is not new.'],
   K76V('This was stitched before. Years ago. Who did it?'),
   K76MV('me. i was like 12. dental floss!! mint','me. i was about twelve. dental floss. the mint kind','Me. I was about twelve. Dental floss. The mint kind.','Me! I was about twelve. Dental floss, the mint kind, and a needle out of a hotel sewing kit.'),
   K76V('You stitched your own side, at twelve, with dental floss.'),
   K76MV('it HELD tho','and it held. look at that. years','And it held. Look at that. Years, and it’s still there.','And it held! Look at that. Years later and it’s still there. I should’ve been a surgeon.'),
   ['','He looks at it for a long time. His face has gone the colour of the wall.'],
   K76V('It is a competent stitch.'),
   K76MV('(COMPETENT. from him that’s basically a medal)','(competent. from him that’s basically a medal)','(Competent. From him that’s basically a medal.)','(Competent! From him that’s basically a medal. I’m putting it on a T-shirt.)'),
   ['','You do not know why he has to go and stand in the corridor for a minute before he can finish the dressing.']],cb)},
 {id:'y_stars',pov:'m',mode:'inj',st:'clear',t:'Make him rate them',run:cb=>say([
   ['','He keeps making that face at your ribs. So you make it a game.'],
   K76MV('go on then. rate them. out of 10. u’re the expert','go on, then. rate them out of ten. you’re the expert','Go on, then. Rate them out of ten. You’re the expert.','Go on, then, rate them. Out of ten. You’re the expert, you do this for a living.'),
   K76V('The hand: two. Lazy. A heel, and no thought given to it. The ribs: one. He was not even looking. The wrists: nought. That is not work, it is neglect.'),
   K76MV('harsh. the wrists tried their best','harsh. the wrists were trying their best','Harsh. The wrists were trying their best.','Harsh! The wrists were trying their best. Give them a one for effort.'),
   K76V('No.'),
   K76MV('ok and urs? the plastic sheet plan. what would u have got','okay, and yours? the plastic sheeting plan. what would you have scored','Okay, and yours? The plastic sheeting plan. What would you have scored?','Okay, and yours? The whole plastic-sheeting thing you had planned for me. What would you have scored?'),
   ['','He does not answer at once. You have been winding him up all morning, and this is the first one that has landed.'],
   K76V('Nine, for workmanship. I have withdrawn it from consideration.'),
   K76MV('modest','wow. modest','Wow. Modest.','Wow. A nine. So modest. Withdrawn, though? Coward.')],cb)},
 /* ---------------- injuries only: V ---------------- */
 {id:'y_boot',pov:'v',mode:'inj',t:'The hoodie they came in',run:cb=>say([
   ['','You go over the hoodie that they came in, on the ops table, under the lamp, as you would go over anything that had been at a scene.'],
   ['','There is a boot print on the back of it. Size eleven, worn down on the outside of the heel. Lower, there is a long scuff, where somebody has cleaned the sole.'],
   K76V('(He wiped his boot on them. Afterwards. As one does on a mat.)'),
   ['','You have fed men to your animals. You have laid their fingers out in a row. You have never in your life wiped your feet on one.'],
   K76V('(I am aware of how that sounds. A butcher, taking offence at a man’s manners.)'),
   K76V('(I take it. I am revolted, and I would rather be revolted than be the man who looks at that scuff and sees nothing wrong with it. Until this week I had thought that I might be that man.)'),
   ['','You bag the hoodie and label it. Then you wash your hands, and find that you are still at the basin four minutes later.']],cb)},
 {id:'y_sleep',pov:'v',mode:'inj',t:'Re-strap the ribs while they sleep',run:cb=>say([
   ['','The strapping has slipped. They are asleep. You mean to wake them first, and you say their name twice, and they do not stir.'],
   ['','You do it as lightly as you can. It is three broken ribs; no hand is light enough. They do not wake. They do not so much as change their breathing.'],
   K76V('(An animal that does not cry out when it is handled has been handled often. I know that from the kennel. I have known it for eleven years, and I did not once apply it to them.)'),
   ['','Their good hand is lying open on the blanket, with the palm up. You look at it for some time.'],
   K76V('(I despise them. I have it in writing. I am to keep hold of that.)'),
   ['','You do not touch the hand. You pull the blanket up over it, so that it will be warm, and so that you will not have to see it lying open like that.'],
   K76V('(The body was taught not to report. Somebody found that convenient, long before the river. Of everything on the films, that is what I find hardest to stomach, and there is no film of it.)')],cb)}];

const k85Key=()=>S.day+'/'+(S.slot||0);
const k85Day=()=>S.f.e2l85Day===k85Key()?(S.f.e2l85N||0):0;
const k85List=()=>{try{const sa=k84SA(),m=S.pov!=='v',st=m?(kdClar()<2?'cell':'clear'):null,F=S.f.e2l85||{};
 return K85S.filter(e=>(e.pov==='m')===m&&(!e.mode||(e.mode==='sa')===sa)&&(!e.st||e.st===st)&&!F[e.id])}catch(e){return []}};
const k85Ok=()=>{try{return K85()&&typeof kdMed==='function'&&kdMed()&&k85List().length>0}catch(e){return false}};
function k85Room(){const m=S.pov!=='v',all=k85List(),L=all.slice(0,6),full=k85Day()>=3;
 ask(K73Who(),m?(kdClar()<2?'(the room.)':'(the room marked laundry.)'):'(The corridor outside the door marked LAUNDRY.)',L.map(e=>({t:e.t,sub:full?'enough for now':'',dis:full,fn:()=>{const f=S.f;f.e2l85=f.e2l85||{};f.e2l85[e.id]=1;f.e2l85N=k85Day()+1;f.e2l85Day=k85Key();save();
   go(cutBg(m?(kdClar()<2?'#0c0a08':'#1c2422'):'#06060c'));e.run(hub)}})).concat([{t:all.length>6?'Not now ('+(all.length-6)+' more after these)':'Not now',fn:hub}]))}
const _sh85=sideHub;sideHub=function(late){const o=_sh85(late);try{if(S&&k85Ok())o.push({t:'⚔ '+(S.pov!=='v'?'The room':'Outside the room'),sub:'free · '+k85List().length+' left'+(k85Day()>=3?' · enough for now':''),fn:k85Room})}catch(e){}return o};

 /* ---------------- more: either setting ---------------- */
K85S.push(
 {id:'x_water',pov:'m',mode:'sa',st:'cell',t:'A cup of water',run:cb=>say([
   ['','The tall one brings a cup of water and puts it where your good hand can reach it. Then he goes.'],
   ['','You know the cup of water. In the other building it came after. It was how you knew that a thing was finished and the next thing had not started.'],
   K76MV('(so where’s the rest. there’s always a rest. water, then the rest)','(so where’s the rest. there’s always a rest. the water, and then the rest)','(So where’s the rest? There’s always a rest. The water, and then the rest.)','(So where’s the rest? There’s always a rest. First the water, and then the rest of it.)')],
   ()=>ask('hitmeuppp','(The cup is sweating on the counter.)',[
    k84No('Ask him what the water comes after, here.'),
    {t:'Drink it, and wait for the rest',fn:()=>{k84Deny();say([
     ['','You drink it and you wait. You lie on your right side, facing the door, with everything you have got pulled in tight.'],
     ['','Nothing comes. An hour. Two. The cup is empty and the door stays shut, and at the end of the corridor somebody is running a tap.'],
     K76MV('(he forgot. he’ll remember. they always remember)','(he forgot. he’ll remember. they always remember)','(He forgot. He’ll remember. They always remember.)','(He forgot, that’s all. He’ll remember. They always remember.)'),
     ['','It was only water. It will be three days before you can drink one without watching the door.']],cb)}}]))},
 {id:'y_ties',pov:'m',mode:'inj',st:'cell',t:'He has scissors',run:cb=>say([
   ['','The tall one comes in with a pair of scissors. Blunt-ended ones, the kind for dressings.'],
   ['','You hold your wrists out to him, together, one crossed over the other. You do it before you have thought about it. It is how you hold them for the ties, and for the ties coming off, and the second is the better of the two.'],
   k80Gone()?['','You keep them there, crossed, and look at the floor beside his shoe.']:K76MV('go on. i’ll hold still. i’m good at it','go on. i’ll hold still. i’m really good at it','Go on. I’ll hold still. I’m really good at it.','Go on, then. I’ll hold still. I’m really good at holding still, ask anybody.'),
   ['','He looks at the crossed wrists. He puts the scissors down on the counter, very carefully, as if they had turned into something else in his hand.'],
   K76V('They were for the tape on your drip. I ought to have said so first.'),
   ['','He takes one wrist in each of his hands and moves them apart, and lays them on the blanket, a foot from each other. Then he does the tape.'],
   K76MV('(weird guy. who says what the scissors are for)','(weird guy. who tells you what the scissors are for)','(Weird guy. Who tells you what the scissors are for?)','(Weird guy. Who actually tells you what the scissors are for?)')],cb)},
 {id:'z_name',pov:'m',mode:null,st:'clear',t:'Your name, in the corridor',run:cb=>say([
   ['','You hear him in the corridor, talking to somebody about the dressings. He says your name.'],
   ['','You have heard him say it before. In the server, in the lift, across a kitchen: he says it like an item, the way he would say “the doorman”. That is not how he has just said it.'],
   K76MV('(say it again. no. don’t. say it normal, u freak, say it like u hate me)','(say it again. no, don’t. say it normally, you freak. say it like you hate me)','(Say it again. No, don’t. Say it normally, you freak. Say it like you hate me.)','(Say it again. No, don’t. Say it normally, you freak. Say it like you hate me, like you’re supposed to.)'),
   ['','He comes in with the tray, and you try him.'],
   K76MV('what’s my name','hey. what’s my name','Hey. What’s my name?','Hey, grandpa. What’s my name?'),
   K76V('Misaki.'),
   ['','It is the item again, with the full stop on it. He must have heard himself out there, and put it right.'],
   K76MV('(ok. good. that’s the right one. …i liked the other one. shut UP)','(okay. good. that’s the right one. …i liked the other one. shut up)','(Okay. Good. That’s the right one. …I liked the other one. Shut up.)','(Okay. Good. That’s the right one. …I liked the other one better. Shut up, shut up.)')],cb)},
 {id:'z_line',pov:'v',mode:null,t:'Four steps',run:cb=>say([
   ['','You have walked to that door a dozen times a day, and each time you have stopped four steps short of it. Twice you have found yourself at three.'],
   ['','You fetch a stick of chalk from the ops deck and draw a line across the corridor floor, four steps from the door marked LAUNDRY. It is the first mark that you have ever made on a floor of this house.'],
   K76V('(I do not trust my feet. I have never before had occasion to say so of any part of me.)'),
   ['','The black hound comes down the corridor, smells the chalk, and lies down along the line, with its nose pointing at the door.'],
   K76V('You are on the wrong side of it.'),
   ['','It is on their side of it. It looks at you, and does not move, and you find that you have nothing to say to it that would not also apply to you.']],cb)});

/* ===================================== ENDINGS ===================================== */
const _xe85=extraEnding;extraEnding=function(){const L=_xe85();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,F=f.e2l85||{};
 if(k84SA()){
  if(F.x_radio||F.x_radioV)L.push('No radio has played in the kennel corridor since the infirmary. Ronin sat awake in that chair every night and never complained of it.');
  if(f.e2lOwed==='word')L.push('One entry in V’s ledger waits on somebody else’s say: OWED TO M. AMOUNT NOT STATED. TO BE COLLECTED AT THEIR WORD.');
  else if(f.e2lOwed==='blank')L.push('One page of V’s ledger has an empty line at the top, above the hand and the ribs. He has never left another line empty.');
  if(F.x_ceiling)L.push('Misaki told V his infirmary ceiling was a six, because of the crack. He had the crack filled that day.')}
 else{
  if(F.y_floss)L.push('At twelve Misaki stitched their own side with mint dental floss. V called it a competent stitch and had to stand in the corridor.');
  if(F.y_stars)L.push('V rated the work on Misaki’s injuries: two, one and nought. He gave his own plan a nine, and withdrew it from consideration.');
  if(F.y_boot)L.push('V has a bagged hoodie with a boot print on the back, size eleven, and a scuff where the sole was cleaned.')}}catch(e){}return L};
/* ===KC85-END=== */
