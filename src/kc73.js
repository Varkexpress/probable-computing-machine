/* ===================== ENEMIES TO LOVERS: V × MISAKI (kc73) =====================
   An optional route layer on the main V/Misaki route. On day 1–4 of the normal phase a free side-menu entry (⚔) offers
   the night V takes the card man behind the bowling alley off Misaki's roof and tells the server she is next. Swearing
   it back (M) / writing her name in the ledger (V) sets S.f.e2l=1: a war to the death, ideological on both sides (to V
   she is a wanton killer with no law; to her he is a billionaire hypocrite in a moral costume). Letting it go closes the
   offer and nothing else in this module ever runs. Every gate below checks E2L().
   Beats (one at a time from the side menu, ⚔, one per day; each plays once, S.f.e2ld[id]):
     normal   e2l_eye (he comes to kill her at 4am; the scope or the IOU), e2l_sab (the foundation dinner:
              his head in her scope), e2l_truce (Angel's bowling alley accords; who broke them)
     taken    e2l_come (V, before the rescue: Ronin asks why; wraps vRescue)
              e2l_door (both, just before after(): why him; wraps after)
     infirmary (hub, one a day; never romantic): V ×4 (the door frame and the ledger, dinner, the hounds at night, the
              dressing), Misaki ×3 (the cell reading: it was him; the hounds go out; clear: which is it)
     after    e2l_after (be mean to me), act2 e2l_car (the stakeout), e2l_stitch (the forearm), e2l_spar (the mat),
     act3     e2l_boat (the Constance, the tarp: the declaration → S.f.e2lEnd 'lovers' | 'rivals'),
     epilogue e2l_epi.  Morning after (lovers): scheduled through morningEvent with the shared cap mbOk()/mbUse().
   Flags (S.f): e2lEye scope|note, e2lSab m|v, e2lTruce m|v (who broke it), e2lPride debt|true, e2lLedger kept|torn,
     e2lAfter war|soft, e2lCar bet|watch, e2lScar neat|crooked, e2lSpar kiss|pin, e2lEnd lovers|rivals.
   Coexistence: affection is capped on the route (k73Cap: normal 24, taken/after 49, act2/act3 74, lovers uncapped,
   rivals 49), which keeps every friendly tier-gated scene of the main route asleep until it fits. kc66 plays only its
   aftermath beat (vm_codes) on this route. Nothing touches the hours or the full-story strand, so kdSA() needs no switch.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts. See docs/notes_kc73.md. */
const E2L=()=>{try{return !!S&&!!S.f&&S.f.e2l===1&&!isLone()&&!S.rom&&!S.vrom&&!S.f.k28pair&&!S.f.abroad}catch(e){return false}};
const k73M=()=>S.pov!=='v';
const k73H=(m,v)=>k73M()?m:v;
const k73Done=id=>!!(S.f.e2ld&&S.f.e2ld[id]);
const k73Mark=(id,noDay)=>{S.f.e2ld=S.f.e2ld||{};S.f.e2ld[id]=1;if(!noDay)S.f.e2lLast=S.day;save()};
const K73V=t=>['K9',t];
const K73MV=(...a)=>['hitmeuppp',MV(...(a.length===1?[a[0],a[0],a[0],a[0]]:a.length===2?[a[0],a[0],a[1],a[1]]:a.length===3?[a[0],a[0],a[1],a[2]]:a))];
const k73Fresh=()=>S.f.e2lLast!==S.day;
function k73Cap(){if(!E2L())return 100;const e=S.f.e2lEnd;if(e==='lovers')return 100;if(e==='rivals')return 49;const p=S.phase;return p==='normal'?24:(p==='taken'||p==='after')?49:74}
const K73Who=()=>k73M()?'hitmeuppp':'K9';

/* ===================================== THE WAY IN ===================================== */
/* The war is ideological and lethal. To V she is one of the wanton killers (no code, kills for rent, collateral), and
   he swears in his ledger to kill her. To Misaki he is a billionaire hypocrite who launders killing through a foundation
   and a moral costume, and she swears it back. Early beats are near-attempts; the jokes are dark and few. */
const k73EntryOk=()=>{try{return !!S&&S.phase==='normal'&&S.day<=4&&!S.f.e2lAsk&&!S.f.kidnapSet&&!S.f.movedIn&&!isLone()&&!S.rom&&!S.vrom&&!S.f.k28pair}catch(e){return false}};
function k73Entry(){go(cutBg('#07060b'));const m=k73M();
 const pre=m?[
  ['','Three nights running you have lain on the laundromat roof across from the bowling alley with your rifle, learning the card man’s evenings. He smokes at nine and takes the bins out at ten, and he lends money to people at the shelters at forty percent and takes a finger when they are late.'],
  ['','The contract pays '+money(90000)+'. Rent is '+money(40000)+'. You have done that sum on the roof about sixty times.'],
  ['','On the fourth night he does not come out for his cigarette. At half past nine a long black car pulls into the alley, and a tall man in a long coat comes out of the back door with a rolled carpet over one shoulder. Two hounds the size of ponies walk at his heels. The carpet has shoes on.'],
  K73MV('(no. that’s my rent. that’s my RENT in that carpet)','(no. that’s my rent in that carpet)','(No. That’s my rent he’s carrying.)','(No. That’s my rent he’s carrying, rolled up in a rug, like groceries.)'),
  ['','He puts the carpet in the boot. Then he turns and looks straight up at your roof, sixty metres off in the dark, for as long as it takes to fix a position. Then he gets in the car without waving.']]:[
  ['','You have had the card man on file since the spring. He lends to people at the shelters at forty percent and takes a finger when they are late. Tonight he goes to the cold room under your house, slowly, which he has earned one finger at a time.'],
  ['','Misaki has been on the laundromat roof across the street for three nights. You have a file on her as well. It is thicker. A driver at a gala who was standing in the wrong place. A doorman. A man shot in front of his daughter because the contract said Tuesday. She takes whoever pays, and she sleeps fine.'],
  ['','You carry the card man out to the car with the hounds at your heels, and before you shut the boot you look up at her roof for a long, level moment, the way you look at the next name.']];
 const srv=[
  ['','The server, ten minutes later.'],
  K73MV('who took the bowling alley guy','who took the bowling alley guy. who'),
  K73V('I did. You were next.'),
  K73MV('the fuck does that mean','what the fuck does that mean'),
  K73V('It means I have a file on you. A driver. A doorman. A man in front of his daughter, because the contract said Tuesday. You kill whoever pays and you have no law at all. You are what I clean up.'),
  K73MV('says the billionaire who launders murder through a CHARITY. u cut people up in ur basement for a hobby and call it justice. i do it bc the landlord doesn’t take morals','says the billionaire who launders murder through a charity. you do it for a hobby and call it law. i do it for rent'),
  K73V('Then we understand each other.'),
  [AN,'V. no. not her. she’s ours'],
  [RN,'vee. you touch her and i’m in it. i mean that'],
  K73V('Then you will be in it.')];
 say(pre.concat(srv),()=>ask(K73Who(),m?'(He means it. You can tell from the full stop.)':'(Your ledger is open on the desk.)',[
  {t:m?'“swear it back. i’ll kill u first, grandpa”':'Write her name in the ledger',sub:'starts the enemies-to-lovers route · a war to the death with '+(m?'V':'Misaki'),fn:()=>{
   S.f.e2l=1;S.f.e2lAsk=1;S.f.e2lDay0=S.day;S.aff=Math.min(S.aff,10);k73Mark('e2l_mark');note('e2l','The war: V has sworn in his ledger to kill Misaki, and she has sworn it back.');save();drawHud();
   say((m?[K73MV('then i’ll kill u first, grandpa. somewhere stupid. a car park','then i’ll kill you first. somewhere stupid, like a car park'),K73V('You may try. I have written it down.')]:[
     ['','You write it in fountain pen, under the card man: MISAKI (hitmeuppp). WANTON. COLLATERAL: SEVERAL. TO BE KILLED. You date it, and blot it, and sleep your three and a half hours.'],
     K73V('It is in my ledger. I do not cross things out.'),
     K73MV('cool. ur in mine. i don’t have a ledger. i have a really good memory','cool. you’re in mine')]).concat([
     [RN,'ok. ok. i’m openin’ a book, bc if i don’t make it a joke i’m gonna have to drive over there'],
     [AN,'ronin that is not funny'],
     [RN,'it’s a little funny. fifty on the little killer. she’s quicker'],
     [AN,'i’m not betting on which of my friends dies'],
     [AN,'…i’m putting a hundred on something else. it’s in an envelope. i sealed it. don’t ask']]),hub)}},
  {t:m?'Let it go':'Leave her page blank',sub:'the usual story',fn:()=>{S.f.e2lAsk=1;S.f.e2l=0;save();
   say(m?[K73MV('…whatever. enjoy ur carpet','…whatever. enjoy your carpet'),K73V('I will. Goodnight, Misaki.'),[AN,'ok. good. everybody go to bed']]:[
    ['','You leave her page blank and send her nine hundred dollars with the memo line “Carpet.” She sends back one middle finger and, an hour later, “thx”.'],[AN,'ok. good. everybody go to bed']],hub)}}]))}

/* ===================================== NORMAL ===================================== */
function k73Eye(){go(cutBg('#08080c'));k73Mark('e2l_eye');const m=k73M();
 const L=(m?[
  ['','The morning after the server, you shot the shelter landlord off his own front steps at twenty to nine. Nobody paid you for it. He was the next name on V’s list, and you wanted him to know how it feels.'],
  ['','At four the next morning you wake up because somebody in your trailer is breathing, carefully, through his nose.'],
  ['','V is sitting at your fold-down table in the dark with your rifle across his knees. Your lock is on the table in two pieces. There is a roll of plastic sheeting on the floor by his feet, and the black hound is outside the door, not making a sound.'],
  ['','You have the pistol out from under the pillow and against his head before you are properly awake. He does not move his hands, and he does not look surprised.']]:[
  ['','At twenty to nine yesterday morning Misaki shot the shelter landlord off his own front steps, to show you she could. You had spent eleven weeks on him. Your papers were due at nine.'],
  ['','You have studied her for a week the way you study anything you are going to put on a table. She sleeps on her right side with a pistol under the pillow. Her lock is a joke. She wakes at small sounds and not at large ones.'],
  ['','At four in the morning you let yourself into her trailer with a roll of sheeting under your arm and sit down at her fold-down table to wait for your hands to be ready. Her rifle is on the table. You pick it up, to have it out of her reach. Then there is a pistol at your temple.']]).concat([
  K73MV('u have 3 seconds','you have three seconds'),
  K73V('I came to kill you. You woke. It happens.'),
  K73MV('with a SHOWER CURTAIN?','with a shower curtain?'),
  K73V('It is sheeting. I do not like to leave a mess for whoever cleans a place after me. You took the landlord.'),
  K73MV('he charged people for air. u were going to SUE him. rich people get to sue first and kill later','he charged people for air. you were going to sue him. rich people get to sue first and kill later'),
  K73V('Lex talionis. You took one of mine. By my law I am owed one of yours. I came for all of you. Since you are awake, I will take an eye on account.'),
  K73MV('try it','try it and find out'),
  K73V('I will take the eye of your rifle.')]);
 const scope=()=>{S.f.e2lEye='scope';save();say([K73V('Thank you.'),
   ['',m?'He takes the scope off with a coin while you hold the gun on him, slowly, so you can watch every turn. Then he picks up his sheeting and goes. You keep the gun on the door until it is light.':'You take the scope off with a coin while she holds the gun on you, slowly, so that she can watch every turn. Then you pick up the sheeting and go. She keeps the gun on the door until it is light. You know, because the black hound sits facing it until it is light.'],
   ['',m?'At noon you let yourself into his study while he is at a board meeting and take his reading glasses, and the three spare pairs in the drawer, and leave a single bullet standing on the desk where they were.':'At noon your reading glasses are gone from the desk, and the three spare pairs from the drawer. Where they were, a single bullet is standing on its end.'],
   K73V(m?'(text) You were in my study and you did not wait for me.':'(text) You were in my study and you did not wait for me.'),
   K73MV('i wanted u to know i could. next time i wait','i wanted you to know i could. next time i wait')],hub)};
 const iou=()=>{S.f.e2lEye='note';save();say([K73V('Very well. Then it stays owed.'),
   ['',m?'He lays the rifle on your table, whole, and writes on the back of your electricity bill with a fountain pen while you hold a gun on him. He props it against the cereal box.':'You lay the rifle on her table, whole, and write on the back of her electricity bill with your fountain pen while she holds a gun on you. You prop it against the cereal box.'],
   ['','OWED: ONE EYE, AND THE REST. COLLECTABLE AT A TIME OF MY CHOOSING. —K9'],
   K73MV('get out of my trailer','get out of my trailer'),
   K73V('Your lock is very poor. Have it changed. I would prefer you difficult.')],hub)};
 say(L,()=>ask(K73Who(),m?'(He has the rifle. You have his head.)':'(The pistol has not moved.)',m?[
  {t:'“take the scope and get out”',sub:'an eye, on account',fn:scope},
  {t:'“touch that scope and i paint ur skull on my wall”',sub:'the debt stays open',fn:iou}]:[
  {t:'Take the scope',sub:'an eye, on account',fn:scope},
  {t:'Put the rifle down and write the debt instead',sub:'the debt stays open',fn:iou}]))}

function k73Sab(){go(cutBg('#0c0a10'));k73Mark('e2l_sab');const m=k73M(),eye=S.f.e2lEye;
 const L=(m?[
  ['','The foundation dinner is at the hotel by the river: a hundred and forty people in black tie clapping for a man who cuts people up in his basement. Your contract is the man at table one, who sold the hospital fund’s debt to people who collect with pliers. Your rifle is on the roof of the car park across the street. '+(eye==='scope'?'The scope is Angel’s spare; she handed it over without a word and with a look you did not like.':'The scope is your own. His IOU is in your back pocket.')],
  ['','You have two names tonight. One of them is paying you. The other one is giving the speech.'],
  ['','At seven he sent you a text that said only “Table one has been moved.” It has been moved four times since. Every time a waiter sets it down near a window, you put a round through the place card, from two hundred metres, so that he knows exactly how close you are.']]:[
  ['','Your foundation dinner is at the hotel by the river. The man at table one sold the hospital fund’s debt to people who collect with pliers, and after dessert Inspector Hale is taking him out through the kitchen with your papers in an envelope. Misaki has the same man on a contract. She is on the roof of the car park across the street, and she has sworn to kill you.'],
  ['','You have moved table one four times since seven. Every time a waiter sets it down near a window, a place card leaves it, very fast, and goes into the far wall. She is telling you she can see you.'],
  ['','At eight you sent the black hound and the old hound to the bottom of the car park stairwell. They are sitting there now, in the dark, waiting for anything to come down.']]).concat([
  K73MV('nice speech. 140 people clapping for a butcher'),K73V('They are clapping for the shelters. I paid for the shelters.'),
  K73MV('with what. blood money with a tax receipt'),K73V('There are two hounds at the bottom of your stairwell. You have until the coffee.'),
  ['',m?'Dessert comes out, a cake in four tiers on a trolley. The man from the hospital fund gets up to admire it, which puts him at the window at last, in your crosshairs.':'Dessert comes out, a four-tier cake on a trolley, and the man from the hospital fund gets up to admire it, which puts him at the window.'],
  ['',m?'Then V gets up from the head table with a glass of water, walks over and stands in the window beside him, between you and him, and looks out into the dark at exactly where you are. His whole head is in your scope. You have wanted this for a week. He knows it.':'You stand up, take your glass of water, and go and stand in the window beside him, between the glass and the car park roof, and look straight at where she is. You have put your head in her scope, on purpose, in front of a hundred and forty witnesses. You want to know what she is.']]);
 const hers=()=>{S.f.e2lSab='m';save();say([
   ['',m?'You put the round past his ear with about a thumb to spare, through the man behind him. He keeps perfectly still, and then he turns to a hundred and forty screaming people and tells them, in his board-meeting voice, to remain seated.':'You stay exactly where you are. The round passes your ear with about a thumb of room and goes through the man behind you, and your ear rings for two days. You turn to a hundred and forty screaming people and tell them to remain seated.'],
   K73V('(text) You had my head. Why did you not take it?'),
   K73MV('bc a dead billionaire at his own charity dinner is a martyr. i want u to die somewhere stupid. a car park. a toilet'),
   K73V('(text) I will make a note of that. Your stairwell is clear now. I have called them off.')].concat(k73SabSrv('m')),hub)};
 const his=()=>{S.f.e2lSab='v';save();say([
   ['',m?'You shoot the cake. The top tier goes up and comes down on the man from the hospital fund, on V, on the mayor’s wife, and while the room is screaming, two of Hale’s officers walk the man out through the kitchen in handcuffs and buttercream. You go down the stairwell with your pistol out, and the two hounds at the bottom stand up, look at you, and let you pass.':'She shoots the cake. The top tier comes down on the man from the hospital fund, on you and on the mayor’s wife, and while the room is screaming, Hale’s officers walk the man out through the kitchen in handcuffs and buttercream. On the stairwell camera she comes down with her pistol out, and the hounds stand up and look at her, and let her pass. You did not tell them to.'],
   K73V('(text) You had my head. You shot a cake.'),
   K73MV('a dead billionaire at his own charity dinner is a martyr. i want u to die somewhere stupid'),
   K73V('(text) My hounds let you past. I would like to know why.'),
   K73MV('ask them. they’ve got better taste than u')].concat(k73SabSrv('v')),hub)};
 say(L,()=>ask(K73Who(),m?'(His head is in your scope.)':'(Your head is in her scope.)',m?[
  {t:'Take the mark past his ear',sub:'the mark is yours',fn:hers},{t:'Shoot the cake',sub:'he keeps the mark',fn:his}]:[
  {t:'Stay in the window',sub:'keep the mark',fn:his},{t:'Step back and let her have him',sub:'the mark is hers',fn:hers}]))}
const k73SabSrv=w=>[['','The server, at midnight.'],
 [AN,'somebody shot at the foundation dinner. V are you alive. misaki are you alive. answer me'],
 K73V('I am alive.'),
 K73MV('unfortunately'),
 [RN,w==='m'?'ok. book says point to misaki. i’m not havin’ fun anymore, for the record':'ok. book says point to vee, she shot a cake. i’m not havin’ fun anymore, for the record'],
 [AN,'nobody is having fun']];

function k73Truce(){go(cutBg('#0a0810'));k73Mark('e2l_truce');const m=k73M(),eye=S.f.e2lEye;
 const L=[['','The server, Saturday night.'],
  [AN,'ok. i’m done watching this. you are scaring people. ronin hasn’t slept'],
  [AN,'the bowling alley accords. one: nobody kills anybody for seven days. two: nobody goes inside anybody’s home. three: '+(eye==='scope'?'the scope and the glasses go in my safe':eye==='note'?'the IOU goes in my safe':'nobody brings sheeting anywhere')+'. four: by sunday you each say one true thing about the other one. in here, where we can all see'],
  [RN,'witnessed. i got a pen. sign it or i drive over'],
  K73MV('fine. signed. for angel'),
  K73V('Signed, for Angel. I would like it noted that I have not changed my mind.'),
  [AN,'nobody asked you to. sunday']];
 const sun=[['','Sunday night. Clause four.'],
  K73MV('true thing about v: he has a very steady hand. i know bc i’ve watched it down a scope all week, waiting for it to do something i can shoot him for. it never has'),
  K73V('Misaki is the best shot in this city. That is why her name is first in my ledger.'),
  [RN,'jesus christ. ok'],
  [AN,'that’s two true things. i hate both of them']];
 const sheBroke=()=>{S.f.e2lTruce='m';save();say([
   ['',m?'You last until Tuesday at noon. His mark is a man who runs a dogfight in a car wash, and you can see him from your bus stop. Clause one says nobody kills anybody. You decide it means each other.':'She lasts until Tuesday at noon. Your mark is a man who runs a dogfight in a car wash; she can see him from her bus stop. She decides clause one means each other.'],
   [AN,'misaki. three days'],
   K73MV('he ran a DOGFIGHT. the accords are about us. i didn’t touch v'),
   K73V('You touched my list. I have added him to what you owe me.')].concat(sun),hub)};
 const heBroke=()=>{S.f.e2lTruce='v';save();say([
   ['',m?'He lasts until Wednesday. On Wednesday, Ronin comes round to borrow your chainsaw and stops in the doorway, looking at the smoke alarm, and gets on a chair, and takes a camera the size of a fingernail out of it.':'You last until Wednesday. On Wednesday you go into her trailer while she is out and put a camera the size of a fingernail in her smoke alarm, to learn her evenings. Ronin finds it within the hour. He was looking.'],
   [RN,'vee. there was a camera in her smoke alarm'],
   [AN,'V. clause two'],
   K73V('Clause two forbids entry. I entered. I accept the breach.'),
   K73MV('ur sick. u know that. u watch people like they’re meat')].concat(sun),hub)};
 say(L,()=>ask(K73Who(),'(Seven days.)',m?[
  {t:'Break it first',sub:'his mark, Tuesday, noon',fn:sheBroke},{t:'Keep it, and wait for him to slip',sub:'he will',fn:heBroke}]:[
  {t:'Keep it to the letter',sub:'she will not',fn:sheBroke},{t:'Put a camera in her trailer',sub:'learn her evenings',fn:heBroke}]))}

/* ===================================== THE KIDNAPPING ===================================== */
/* V, at the river, before he goes in (wraps vRescue) */
function k73Come(cb){say([
  ['','The river, past midnight. The car is two warehouses up with the lights off, and the grey hound is in the passenger seat with its chin on the dash, looking where you are looking.'],
  ['','Your phone has buzzed eleven times in the last hour. It is the server. For a week they have watched the two of you try to kill each other, and now they have worked out where you are.'],
  [RN,'(text) vee. u at the river?'],
  [RN,'(text) thought u swore to kill her. it’s in ur fuckin’ book'],
  [AN,'(text) the book is closed. nobody is betting on anything. V, answer him'],
  ['','Her name is in your ledger, in your hand: TO BE KILLED. You stood in a window last week and let her put a round past your ear to find out what she was. You have never gone into a building for a thing you swore to put down. You are about to, and everybody you know is watching you do it.']],
 ()=>ask('K9','(Ronin is waiting.)',[
  {t:'“She is mine to kill. Nobody else does it.”',fn:()=>{S.f.e2lPride='debt';save();say([K73V('(text) She is mine to kill. Nobody else in this city does it.'),[RN,'(text) yeah ok. go collect'],
    ['','You put the phone face down on the seat and get out. The grey hound comes with you.']],cb)}},
  {t:'Say nothing, and get out of the car',fn:()=>{S.f.e2lPride='true';save();say([['','You do not answer. You put the phone face down on the seat and get out, and the grey hound comes with you.'],
    [RN,'(text) yeah. thought so. go get her']],cb)}}]))}
/* both, just before after(): why him (wraps after) */
function k73Door(self,cb){const m=k73M();say(m?(self?[
  ['','Later you try to work out why his door. You had a week of hating him and a whole city of doors, and your feet took you to the one that belongs to the man who wanted you dead most. Nobody gets through that door. You know, because you have tried it every night this week.'],
  K73MV('(great. now i owe him)','(great. now i owe him. fuck)','(Great. Now I owe him. Fuck.)','(Great. Now I owe him. Of all the people in this city to owe. Fuck.)')]:[
  ['','Of all the people in the city. You think it in the dark while he carries you, very clearly, the way you think things on a roof: of course it was him. He is the only one who wanted you dead badly enough to come and check.'],
  K73MV('(…now i owe him)','(…now i owe him. fuck)','(Now I owe him. Fuck.)','(Now I owe him. Of all the people in this city to owe. Fuck.)')]):(self?[
  ['','She came to your door. For a week she has called you grandpa in front of everyone you know, and tonight she walked two kilometres on that foot to your door, and only yours. You do not know what to do with that, so you carry her down the stairs and do not think about it.']]:[
  ['','In the car she sleeps against the window. At a red light your phone buzzes once on the dash. It is Ronin: “book’s closed. nobody wins this one.” You do not answer. You drive the rest of the way at exactly the speed limit, because if anybody stops you tonight, you will not be able to be polite to them.']]),cb)}

/* ===================================== THE INFIRMARY (never romantic) ===================================== */
/* V: four scenes, at most two a day; Misaki: two while the room is a cell, one once she knows it. */
const k73Gone=()=>{try{return typeof kdBand==='function'&&kdBand()==='gone'}catch(e){return false}};
const k73WorstOf=()=>{try{return typeof kdWorstOf==='function'&&kdWorstOf()}catch(e){return false}};
const K73_VM=[
 cb=>{const eye=S.f.e2lEye;say([
  ['','She has been downstairs in the room marked LAUNDRY for a day. You stand at the door with your hand on the frame and do not go in.'],
  ['','A week ago you sat in her trailer with sheeting at your feet. You have wanted her exactly like this, unable to lift her left hand, in a room you control. She says thank you now, to everything, to the soup and to the doctor and to you, in the same flat, pleasant voice, the way people speak to whoever holds the keys. Her eyes stay on your hands.'],
  ['','To her you are the tall one, who brings the tray. In her head the man who brings the tray is also the man who kept her in the other building, and she is being good for him.'],
  ['','Upstairs, in the study, you open the ledger. Her page opens with the line you wrote on the first night: MISAKI. WANTON. COLLATERAL: SEVERAL. TO BE KILLED. Under it, a week of what she owes: the landlord, the man from the car wash, eleven place cards, your reading glasses'+(eye==='note'?', and one eye and the rest, outstanding.':'.')+' You write the date under the last line.'],
  ['K9','(Nothing I wrote there is untrue. She is everything I said. I could go down those stairs tonight and close the account, and my own law would sign it.)']],
  ()=>ask('K9','(The total.)',[
   {t:'Write the total',sub:'your hand will not do it',dis:true,fn:()=>{}},
   {t:'Close the ledger',fn:()=>{S.f.e2lLedger='kept';save();say([['','You close it on the open page, un-totalled, and put it in the drawer and lock the drawer, and you sit for some time with your hand flat on the desk above it.']],cb)}},
   {t:'Tear the page out',fn:()=>{S.f.e2lLedger='torn';save();say([['','You tear the page out along the spine, fold it in four and put it inside your jacket. It sits against you all evening. The ledger closes much more easily without it.']],cb)}}]))},
 cb=>say([
  ['','Dinner at nine, in the kitchen, alone. You made it yourself and it is good.'],
  ['','Halfway through, the thought arrives whole and in your own voice, the way the law always does. She is downstairs. She cannot close her left hand. The doctor goes home at ten. You are owed. Nobody in the city would ever know which building it happened in, and the hounds would keep the rest.'],
  ['','You get as far as the back stair in your head. You see your own hand on the LAUNDRY door. Then your fork is on the plate and you are at the sink, being sick, neatly, with the tap running.'],
  ['K9','(I have done it to men who owed me less. I am entitled to it. I would sooner put my hand in the mincer.)'],
  ['K9','(I despise her. I cannot work out why this is happening, and I despise her for that as well.)'],
  ['','You rinse the sink and scrape the plate into the hounds’ bowl. The old hound eats it and then stands looking at you for a long time, the way it looks at you when you have been ill.']],cb),
 cb=>say([
  ['','After midnight she talks through the wall.'],
  ['','The infirmary is under the study and the vent carries. She is being polite to the door, in a low reasonable voice: telling it that she has been good today and ate all of it, and that she would like to keep the light on, please, if that is all right with whoever decides.'],
  ['','In her head, whoever decides is you.'],
  ['','You put on your coat and take all four hounds out into the grounds in the rain at a quarter to one, as far as the far wall, where the vent is only a vent. The black hound keeps stopping to look back at the house. You keep calling it on, and it keeps coming, slower each time.'],
  ['K9','(I do not want to hear it. I would like that written down somewhere. I do not want to hear her ask me for the light.)'],
  ['','You stay out until three. When you come in, the light under her door is on, and you leave it on.'],
  k73WorstOf()?['','The next night you take them out again, and the night after that. The black hound starts waiting by the back door at a quarter to one without being called.']:null],cb),
 cb=>{const gone=k73Gone();say([
  ['','On the third day you change the dressing on her hand yourself, because the doctor is late and you will not wait for her.'],
  ['','You do it the way you do everything on a table: exactly, in order, without speaking. She holds the hand out before you ask. '+(gone?'She does not speak at all. She holds it very still and looks at the floor beside your shoe.':'She keeps her face bored and watches your fingers the whole time, and you watch hers, and neither of you says that you are both doing it.')],
  gone?null:K73MV('ur good at this. the other one wasn’t','you’re good at this. the other one wasn’t','You’re good at this. The other one wasn’t.','You’re good at this. Better than the other one. Do they rotate you, or is it just you now?'),
  gone?null:K73V('Hold still.'),
  gone?null:K73MV('i get it. ur the careful one. so i talk','i get it. you’re the careful one, so i talk to you','I get it. You’re the careful one, so I talk to you. It’s a good system. I’d use it.','I get it. You’re the careful one, so I talk to you. It’s a good system, honestly. I’d have set it up that way myself.'),
  ['','You tie it off. Your hands are perfectly steady. You put the old dressing in the bin and wash your hands at the little sink, and go on washing them for some time after they are clean.'],
  ['K9','(I am keeping her well so that the debt can still be collected. I said that to the mirror this morning and it sounded fine.)'],
  ['',gone?'When you go she says nothing. You leave the door the way she likes it, with the light on.':'When you go she says thank you. You say nothing at all, and leave the door the way she likes it, with the light on.']],cb)}];
const K73_MM=[
 cb=>{const gone=k73Gone();say([
  ['','The tall one brings the tray. You know who he is now. You worked it out at about four this morning, lying on your side doing sums so you would not sleep, and once you saw it everything went together like a rifle.'],
  K73MV('(1: he swore to kill me. 2: he wrote it down. 3: he’s the most patient man in the city)','(one: he swore to kill me. two: he wrote it down. three: he’s the most patient man in the city)','(One: he swore to kill me. Two: he wrote it down. Three: he is the most patient man in this city, and he has the money.)','(One: he swore to kill me, in front of everybody. Two: he wrote it down, in fountain pen. Three: he is the most patient man in this city, and he has more money than God.)'),
  ['','Of course he bought the van. Who else in this city feeds people to dogs and calls it law? He sat in your trailer with a roll of sheeting and decided you deserved worse than quick. That is his whole religion, the long ones for the ones who earned it, and here it is: a room with one door, and soup at eight.'],
  ['','It makes sense. It makes so much sense that it is almost restful.'],
  ['','He kneels to put the tray down, and you thank him, because the careful one is the one you thank.']],()=>ask('hitmeuppp','(The tray.)',[
  {t:'Throw it at him',sub:'your hand will not let go of it',dis:true,fn:()=>{}},
  {t:'Say thank you',fn:()=>say([K73MV('thank u','thank you','Thank you.','Thank you.'),
   ['','He goes out. He stands outside the door for a long time; you can see the shadow of his feet under it. '+(gone?'You do not count. You lie still until it goes.':'You count how long. Four hundred and eleven.')]],cb)}]))},
 cb=>say([
  ['','In the night you hear the hounds go out.'],
  ['','All four of them: the big door at the end, the claws on the stone, his voice calling them on in the rain. You know what he feeds them. Everybody in the city knows what he feeds them.'],
  K73MV('(it’s ok. not tonight. he’s got a schedule)','(it’s fine. it isn’t tonight. he’s got a schedule)','(It’s fine. It isn’t tonight. He has a schedule. He’s that type.)','(It’s fine. It isn’t tonight. He’s the type with a schedule. He’d have it in a ledger with the date written in.)'),
  ['','You count the hounds coming back. You get to four. You count again to be sure, and again, until the light goes grey at the vent.']],cb)];
const k73MClear=cb=>say([
  ['','You know the room now. Bed, drip, smoke detector, his house. LAUNDRY on the door, because he thinks he is funny.'],
  ['','It was never him. You know it like a sum you have checked twice. The tall one with the tray was V, and V carried you out of that building and has changed your dressing for three days as if it mattered, and he hates you.'],
  K73MV('(so which is it)','(so which is it)','(So which is it? He hates me and he did all that? Or he did all that so he can hate me properly later?)','(So which is it, V? You hate me and you did all this? Or you did all this so that you can hate me properly once I can stand up?)'),
  ['','It will not come out. Every time you put him in the doorway with the tray your stomach goes cold, because for three days that was the worst man in the world, and he still is, and he also brought the soup.'],
  K73MV('(still owe him)','(i still owe him. now i owe him more)','(I still owe him. Now I owe him more. Great.)','(I still owe him. Now I owe him a great deal more. Fantastic.)')],cb);
function k73MedScene(){if(!S||!S.f||!E2L()||dlg||typeof kdMed!=='function'||!kdMed())return null;
 const busy=()=>{try{return !!((typeof k61Scene==='function'&&k61Scene())||(typeof k62Scene==='function'&&k62Scene())||(typeof k63Scene==='function'&&k63Scene()))}catch(e){return false}};
 const run=(fn,bg,mark)=>cb=>{mark();save();go(cutBg(bg));fn(cb)};
 if(S.pov!=='v'){if(S.f.e2lMedDay===S.day||(S.slot||0)<2||busy())return null;const day=()=>{S.f.e2lMedDay=S.day};
  if(kdClar()<2){const i=S.f.e2lMM||0;if(i>=K73_MM.length)return null;return run(K73_MM[i],'#0c0a08',()=>{S.f.e2lMM=i+1;day()})}
  if(S.f.e2lMC)return null;return run(k73MClear,'#1c2422',()=>{S.f.e2lMC=1;day()})}
 if((S.slot||0)<1||busy())return null;const n=S.f.e2lMedDay===S.day?(S.f.e2lMedN||0):0;if(n>=2||S.f.e2lMedSlot===S.day+'/'+S.slot)return null;
 const i=S.f.e2lVM||0;if(i>=K73_VM.length)return null;
 return run(K73_VM[i],'#06060c',()=>{S.f.e2lVM=i+1;S.f.e2lMedDay=S.day;S.f.e2lMedN=n+1;S.f.e2lMedSlot=S.day+'/'+S.slot})}

/* ===================================== AFTER ===================================== */
function k73After(){go(cutBg('#0e0c0a'));k73Mark('e2l_after');const m=k73M(),sab=S.f.e2lSab;
 const L=(m?[
  ['','Everybody is being so nice to you.'],
  ['','Angel cried twice on the way in and said it was her lashes. Ronin brought soup and called you “little killer” in a voice so gentle you wanted to put a fork through his hand. The doctor says your name every time she comes in, as if she is checking it is still there. Even the hounds walk round you.'],
  ['','V comes into the kitchen at noon and stops in the doorway, and you watch him decide to be careful with you as well.']]:[
  ['','Everybody is being careful with her. Angel cries and blames her lashes. Ronin calls her “little killer” in a voice you have only heard him use on things that were about to die. The hounds walk round her chair. She sits at your kitchen island with her cast on the counter and lets them all do it, and her face gets flatter every time.'],
  ['','You come in at noon and stop in the doorway, and decide to be careful as well.']]).concat([
  K73MV('don’t','don’t. don’t u start','Don’t. Don’t you start.','Don’t. Don’t you dare start. Everybody else, fine. Not you.'),
  K73V('I beg your pardon?'),
  K73MV('be mean to me','be mean to me. i mean it','Be mean to me. I mean it. Everyone’s being nice and I can’t breathe in here.','Be mean to me, V. I mean it. Everybody is being so nice to me I can’t breathe in here. You’re the only one who has never been nice to me in his life. Don’t you dare start now.')]);
 const war=()=>{S.f.e2lAfter='war';apply({aff:4});save();say([
   K73V('Very well. Your lock was the worst I have ever opened. '+(sab==='v'?'Your shot at the cake was low and to the left. ':sab==='m'?'Your shot past my ear was a thumb too wide. ':'')+'You kill for whoever pays and you sleep fine, and I have not changed my mind about a word of it. Your name is still in my ledger. I will kill you when you can hold a fork in both hands, and not before, because I do not kill things that cannot hold a fork. So I suggest you practise.'),
   ['',k73M()?'You laugh. It hurts your ribs and you laugh anyway, harder, with your face on the cold counter, until Angel comes to the doorway to see what is wrong.':'She laughs. It is the first time since the river. It hurts her ribs and she does it anyway, with her face down on the cold counter, until Angel comes to the doorway to see what is wrong.'],
   K73MV(sab==='v'?'low and to the LEFT??':'a thumb TOO WIDE??',sab==='v'?'Low and to the left? I was on a roof in a crosswind.':'A thumb too wide? I was on a roof in a crosswind.',sab==='v'?'Low and to the left? I was on a roof in a crosswind, V, and I took the top tier off clean.':'A thumb too wide? I was on a roof in a crosswind, V. I could have parted your hair.'),
   K73V('Practise.')],hub)};
 const soft=()=>{S.f.e2lAfter='soft';apply({aff:2});save();say([
   K73V('No.'),
   ['',k73M()?'He sits down across the island and pushes the soup an inch nearer, carefully, and says nothing else. You watch your worst enemy be gentle with you, and you understand for the first time how bad it must have been.':'You sit down across the island and push the soup an inch nearer, and say nothing else. She watches you be careful for a long time, and something in her face shuts, and you understand that you have just told her how bad it was.'],
   K73MV('ok','ok. ok, v','Okay. Okay, V.','Okay. Okay. You win that one.')],hub)};
 say(L,()=>ask(K73Who(),m?'(He is looking at the cast.)':'(She means it.)',m?[
  {t:'“we’re enemies. act like it”',fn:war},{t:'Let him be kind',fn:soft}]:[
  {t:'Insult her properly',fn:war},{t:'Be kind anyway',fn:soft}]))}

/* ===================================== ACT II: the Mimic ===================================== */
function k73Car(){go(cutBg('#060810'));k73Mark('e2l_car');const m=k73M();
 const L=[['','The server, the first night of the case.'],
  [AN,'ok so. the mimic has misaki’s list. every name on it. and he’s signing them K9'],
  [RN,'so he’s wearin’ both of ya. like a fuckin’ couple’s costume'],
  [AN,'which makes you two a pair now. congratulations. i’m not babysitting either of you. go sit in a car'],
  K73MV('no','no. absolutely not','No. Absolutely not. I’ll sit in a car with Ronin.','No. Absolutely not. I would rather sit in a car with Ronin and his feet.'),
  K73V('I decline.'),
  [AN,'he’s using both your names. it’s a car or a coffin, babes 💕'],
  ['',k73M()?'Eight hours, then, in V’s car, outside the next address on your old list: a flat over a launderette where a man you were once paid to kill still lives, because you never got round to him. The Mimic will presumably finish the job for you.':'Eight hours, then, in your car, outside the next address on her old list: a flat over a launderette where a man she was once paid to kill still lives, because she never got round to him. The Mimic will presumably finish the job for her.'],
  ['',k73M()?'It turns out he can keep up. You do the sightlines in your head and draw them on the windscreen in the fog of your breath, four roofs and a bus shelter, and before you have finished the third one he says “the third roof” at the same moment you do. You both stop and look at each other with real dislike.':'It turns out she can keep up. She does the sightlines in her head and draws them on the windscreen in the fog of her breath, four roofs and a bus shelter, and before she has finished the third one you both say “the third roof” at the same moment. You stop and look at each other with real dislike.'],
  K73MV('stop finishing my sentences','stop finishing my sentences. it’s creepy','Stop finishing my sentences. It’s creepy.','Stop finishing my sentences, V. It’s creepy, and you keep getting them right.'),
  K73V('Then stop starting mine.'),
  K73V('For the record, I still think you should be dead.'),
  K73MV('noted. i still think ur a hypocrite with a butcher’s table. pass the flask','noted. i still think you’re a hypocrite with a butcher’s table. pass the flask','Noted. I still think you’re a hypocrite with a butcher’s table. Pass the flask.','Noted. I still think you’re a rich hypocrite with a butcher’s table and a tax receipt. Pass the flask.'),
  K73MV('ur radio is all violins','your radio is all violins','Your radio is all violins. It’s like being murdered in a lift.','Your radio is all violins. It’s like being murdered very slowly in a lift by somebody classy.'),
  K73V('It is a cello. If I were murdering you, it would be quick. I would not waste the cello on it.')];
 const bet=()=>{S.f.e2lCar='bet';apply({aff:3});save();say([
   K73V('Agreed. I would like that in writing.'),
   ['',k73M()?'He writes it on the back of a parking ticket and you both sign. At hour seven a man in a long coat crosses the far end of the street with a carrier bag, and you both say “there” in the same breath and argue about who said it first until the sun comes up. The man in the coat is a dentist. The parking ticket goes in V’s wallet; he says it is evidence.':'You write it on the back of a parking ticket and you both sign. At hour seven a man in a long coat crosses the far end of the street with a carrier bag, and you both say “there” in the same breath and argue about who said it first until the sun comes up. The man in the coat is a dentist. You keep the parking ticket in your wallet. It is evidence.']],hub)};
 const watch=()=>{S.f.e2lCar='watch';apply({aff:4});save();say([
   ['',k73M()?'You close your eyes, meaning only to rest them. You have not slept with anybody else awake in the room since the river, and certainly not next to him.':'She looks at you for a long time, the way she looks at a roof before she lies down on it. Then she closes her eyes. She has not slept with anybody else awake in the room since the river.'],
   ['',k73M()?'You wake two hours later with his coat over you. He is exactly where he was, eyes on the street, and the cello is turned down so low it is only a hum.':'She sleeps for two hours under your coat. You turn the cello down until it is only a hum and do not take your eyes off the street.'],
   K73MV('that was 20 min','that was twenty minutes','That was twenty minutes.','That was twenty minutes, V. I said twenty minutes.'),
   K73V('It was twenty minutes. Several times. He has not come.'),
   K73MV('don’t tell anyone','don’t tell anyone','Don’t tell anyone.','Don’t tell anyone. I mean it. I will end you.'),
   K73V('I will tell nobody. It would ruin my reputation as well.')],hub)};
 say(L,()=>ask(K73Who(),'(Hour four.)',m?[
  {t:'“bet u i spot him first. loser buys dinner”',fn:bet},{t:'“u watch. i’m closing my eyes for twenty minutes”',fn:watch}]:[
  {t:'Bet her that you see him first',fn:bet},{t:'Offer to watch while she sleeps',fn:watch}]))}

function k73Stitch(){go(cutBg('#0a0a0c'));k73Mark('e2l_stitch');const m=k73M(),sab=S.f.e2lSab;
 const L=[
  ['',k73M()?'The Mimic does not come for the man over the launderette himself. He sends a hired boy with a box cutter to wait in the back stair. V puts the boy through the banister and walks out of the stairwell with his left sleeve black to the elbow.':'The Mimic does not come himself. He sends a hired boy with a box cutter to wait in the back stair. You put the boy through the banister and walk out with your left sleeve black to the elbow.'],
  ['',k73M()?'He will not go to the doctor. You find out why at the house: the doctor is downstairs, through the door that says LAUNDRY, and he will not go through it. He sits on a crate in the garage instead and tries to stitch his own forearm with one hand.':'You will not go to the doctor. The doctor is downstairs, through the door that says LAUNDRY, and you have not been through that door since she came out of it. You sit on a crate in the garage and try to stitch your own forearm one-handed, and she watches you fail at it from the doorway.'],
  K73MV('give me that','give me that','Give me that. You’re sewing like a priest.','Give me that. You’re sewing like a nun with the shakes. Give it here.'),
  K73V('Your left hand is not healed.'),
  K73MV('i have teeth','i’ve got teeth. hold still','I’ve got a right hand and teeth. Hold still.','I’ve got a right hand and a full set of teeth. Hold still, and if you flinch, I sew your mouth shut as well.'),
  K73V('I do not flinch.'),
  sab==='v'?K73MV('u flinched at the cake','you flinched at the cake','You flinched at the cake. I saw it down the scope.','You flinched at the cake. I saw it down the scope. A very small flinch. I’ll treasure it forever.'):
   K73MV('u didn’t flinch at dinner. it annoyed me','you didn’t flinch at the dinner. it annoyed me for a week','You didn’t flinch when I put one past your ear. It annoyed me for a week.','You didn’t flinch when I put one past your ear. It annoyed me for a week. I’m going to fix that.'),
  ['',k73M()?'You sew him up with your right hand and tie each knot with your teeth, bent over his arm, close enough to smell the river still on him. He keeps dead still and watches the top of your head the whole time.':'She sews you up with her right hand and ties each knot with her teeth, bent over your arm. You keep dead still and watch the top of her head the whole time, and her lips moving as she counts the stitches.']];
 const neat=()=>{S.f.e2lScar='neat';apply({aff:4});save();say([
   ['','Eleven stitches, straight as a ruled line. She bites off the thread.'],
   K73MV('there. u’ll barely scar','there. you’ll barely scar','There. You’ll barely scar. Don’t get used to it.','There. You’ll barely scar. Don’t get used to me being good at things near you.'),
   K73V('Thank you.'),
   ['',k73M()?'He looks at the arm for a long time. Then he tells you that you were faster than the doctor, in the voice of a man reading out a fine.':'You look at the arm for a long time. Then you tell her she was faster than the doctor, in the voice you use for reading out fines.']],hub)};
 const crook=()=>{S.f.e2lScar='crooked';apply({aff:5});save();say([
   m?null:K73V('Sign it, if you are going to.'),
   ['','The last three stitches go off at an angle and come back, with a little hook at the end like the tail of a letter M. She bites off the thread and looks at it with enormous satisfaction.'],
   K73MV('signed','signed. now u think of me every time','Signed. Now every time you roll your sleeves up, you think of me.','Signed. Now every time you roll your sleeves up for a board meeting, you think of me and get furious.'),
   K73V('I will think of you, and I will be furious. I am already doing both.')],hub)};
 say(L,()=>ask(K73Who(),'(The last three stitches.)',m?[
  {t:'Sew it neat',fn:neat},{t:'Sew it crooked, so he remembers',fn:crook}]:[
  {t:'Ask for it neat',fn:neat},{t:'“Sign it, if you are going to.”',fn:crook}]))}

function k73Spar(){go(cutBg('#100a0a'));k73Mark('e2l_spar');const m=k73M();
 const L=[
  ['',k73M()?'The training hall, late: the knife wall, the mats, the practice blades with the edges ground off. You have your cast off for the first time and you want to hit something that hits back.':'The training hall, late. She has her cast off for the first time, and she has asked you, very politely, to let her hit something that hits back.'],
  K73MV('first to 3','first to three. pins count','First to three. Pins count. Crying counts double.','First to three. Pins count, and crying counts double, and you’re going to cry, V.'),
  K73V('I do not cry. You will be fine.'),
  ['',k73M()?'He is better with a knife than you are, which you hate, and slower, which you love. He takes the first one with a wrist lock so neat you want to frame it. You take the second by going under his arm and laying the dull blade against the back of his knee, and he says “ah” in a way you will think about later.':'You are better with a knife and she is faster, and she knows both of those things. You take the first with a wrist lock. She takes the second by going under your arm and laying the dull blade against the back of your knee, and you say “ah” before you can stop it, and she grins at the floor.'],
  ['',k73M()?'The third goes on for ages. It ends with him on his back on the mat and you sitting on his chest with the practice blade under his chin, both of you breathing as if you had run up all the stairs in the house, and him looking up at you with an expression you have only ever seen on him through a scope.':'The third goes on a long time. It ends with you on your back on the mat and her sitting on your chest with the practice blade under your chin, both of you breathing hard. She looks down at you the way she looks down a scope.'],
  K73MV('say it','say it. say i win','Say it. Say I win.','Say it. Say “Misaki wins.” Out loud. I want to hear it in the board-meeting voice.'),
  K73V('You have a knife at my throat. It would be a confession made under duress.'),
  K73MV('so?','so?','So?','So? I’m very good at duress.')];
 const kiss=()=>{S.f.e2lSpar='kiss';apply({aff:6});save();say([
   m?null:K73V('If you are going to do it, do it.'),
   ['',k73M()?'You kiss him with the blade still under his chin. It is a terrible kiss; your teeth hit his. He kisses you back as if he is trying to win it, and he might be, and you put the knife down on the mat so that you can have both hands.':'She kisses you with the blade still under your chin. It is a terrible kiss, all teeth, and you kiss her back as though you could win it, and she puts the knife down on the mat so that she can use both hands.'],
   ['','When it stops, neither of you says anything for a while.'],
   K73MV('that doesn’t count','that doesn’t count. that was a tactic','That doesn’t count. That was a tactic.','That doesn’t count. That was a tactic. I was distracting you.'),
   K73V('Then you won by it. Three to one.'),
   K73MV('3 to 1','three to one. write it down','Three to one. Write it down.','Three to one. Write that down in your little book.')],hub)};
 const pin=()=>{S.f.e2lSpar='pin';apply({aff:3});save();say([
   ['',k73M()?'He taps the mat twice, which is not the same as saying it. You know it, and he knows you know it.':'You tap the mat twice. It is not the same as saying it, and she knows it.'],
   ['',k73M()?'You get up and walk out with the practice knife and do not look back. You lie awake until four, and when you go past the study for water there is a light under his door.':'She gets up and walks out with the knife and does not look back. You lie on the mat for some time. At four she comes past the study for water, sees the light under your door, stops, and goes on.']],hub)};
 say(L,()=>ask(K73Who(),m?'(He is waiting.)':'(She is waiting.)',m?[
  {t:'Kiss him',fn:kiss},{t:'Get up and walk out',fn:pin}]:[
  {t:'“If you are going to do it, do it.”',fn:kiss},{t:'Tap the mat',fn:pin}]))}

/* ===================================== ACT III: the Constance ===================================== */
function k73Boat(){go(cutBg('#04060c'));k73Mark('e2l_boat');const m=k73M(),f=S.f;
 const L=[
  ['','Pier Nine, two nights before the auction. The Constance sits at the end of the jetty with her lights off and one guard on deck, and the two of you go out to her in a borrowed dinghy with towels wrapped round the oars.'],
  ['',k73M()?'You want a hide for the rifle in her port lifeboat for Friday. He wants the guard rota. You row. He tells you that you are rowing wrong, and you tell him where he can put the oar, and the dinghy turns a full circle in the dark while you argue in whispers.':'She wants a hide for her rifle in the port lifeboat for Friday. You want the guard rota. She rows. You tell her she is rowing wrong, and she tells you where you may put the oar, and the dinghy turns a full circle in the dark while you argue in whispers.'],
  ['','You get aboard, and you get the hide in. Then the guard comes round the deck with a torch and a cigarette, and the only place to go is under the tarp of the lifeboat, together, flat on your backs in about the space of a coffin for one.'],
  ['','He stops at the rail right beside you to smoke, and takes his time about it.'],
  K73MV('ur on my hair','you’re on my hair','You’re lying on my hair.','You’re lying on my hair. If he finds us, I’m telling him you kidnapped me.'),
  K73V('Your knee is in my kidney.'),
  K73MV('good','good. that’s where i keep it','Good. That’s where I keep it.','Good. That’s where it lives now.'),
  f.e2lTruce==='v'?K73MV('u put a camera in my smoke alarm','you put a camera in my smoke alarm','You put a camera in my smoke alarm.','You put a camera in my smoke alarm, V. I still check it every night.'):f.e2lTruce==='m'?K73V('You broke the accords in three days.'):null,
  f.e2lScar==='crooked'?['',k73M()?'His sleeve has ridden up. In the torchlight coming through the tarp you can see the hook at the end of the scar.':'Your sleeve has ridden up. In the torchlight through the tarp she finds the hook at the end of the scar with one finger, and leaves the finger there.']:null,
  f.e2lSpar==='kiss'?K73MV('still 3 to 1','still three to one btw','It’s still three to one, by the way.','It’s still three to one, by the way. In case you were going to bring up the mat.'):null,
  f.e2lLedger==='torn'?K73V('There is a page from my ledger inside my jacket. It is yours. I could not total it.'):f.e2lLedger==='kept'?K73V('There is a page in my ledger with your name on it. It has no total. I sat at the desk for an hour and could not write one.'):null,
  ['','The guard flicks his cigarette into the harbour and walks on. Neither of you moves.'],
  K73V('I want you to know that I still believe every word I wrote about you. I have not been able to act on one of them since the river.'),
  K73MV('same','same. i still think ur a hypocrite','Same. I still think you’re a hypocrite in a good coat.','Same. I still think you’re a rich hypocrite in a good coat, and I haven’t been able to do a single thing about it since you carried me out.'),
  K73V('Misaki. I have something to say, and I would like you to hear the whole of it before you hit me.'),
  K73MV('that’s how u start a fight','that’s how you start a fight','That’s how you start a fight.','That’s how you start a fight, V. Go on. I’m listening. I’m armed.')];
 const lovers=()=>{S.f.e2lEnd='lovers';S.f.e2lMorn=S.day+1;apply({aff:15});note('e2l_end','The war: Misaki and V declared it, under a tarp on the Constance.');save();
  const sug=sugOn();say([
   K73V('Then I am declaring war. On you. I want every mark you take and every one you miss, and your knee in my kidney for the rest of my life. I want to be the only man in this city allowed to beat you at anything, and I will fight anybody else who tries, including you. Those are my terms.'),
   f.e2lEye==='note'?K73V('I am also still owed an eye. I would like it to be yours, on me, every morning. That is how I intend to collect.'):f.e2lEye==='scope'?K73V('You may have the scope back. I would like to keep the glasses on your face.'):null,
   K73MV('worst confession ever','that’s the worst confession i ever heard','That’s the worst confession I’ve ever heard.','That is the worst confession anybody has ever made. You did it like a hostage video.'),
   K73MV('counteroffer: i win','counteroffer. i win','Counteroffer: I accept. I win.','Counteroffer. I accept your war. I win it. You lose every day for the rest of your life, very slowly, and you like it.'),
   K73V('Accepted.'),
   sug&&m?['','Under the tarp of the Constance’s port lifeboat, two nights before Friday, you kiss him the way you would take a building. You do not get back to the dinghy until the sky goes grey over the cranes, and you row home in his coat with not much on under it, and he lets you row the wrong way the whole way.']:null,
   sug&&!m?['','Under the tarp of the port lifeboat she kisses you the way she would take a building. You do not get back to the dinghy until the sky goes grey over the cranes. She rows home in your coat with not much on under it, and you let her row the wrong way the whole way.']:null,
   !sug&&m?['','Under the tarp of the Constance’s port lifeboat, two nights before Friday, you kiss him the way you would take a building. Then you lie there with your head on his chest, listening to the harbour, until the sky goes grey over the cranes, and you row home in his coat, and he lets you row the wrong way the whole way.']:null,
   !sug&&!m?['','Under the tarp of the port lifeboat she kisses you the way she would take a building. Then she lies with her head on your chest and you listen to the harbour together until the sky goes grey over the cranes. She rows home in your coat, and you let her row the wrong way the whole way.']:null],hub)};
 const rivals=()=>{S.f.e2lEnd='rivals';note('e2l_end','The war: Misaki and V shook on it under a tarp on the Constance. It stands.');save();say([
   m?K73MV('if u say it i lose','don’t. if you say it, i lose','Don’t. If you say it, I lose, and I don’t lose to you.','Don’t. If you say it, one of us loses, and I don’t lose to you, and I won’t let you lose either. I like this. I like you exactly where you are, in my sights.'):
    K73V('No. I will not say it. If I said it, I would lose, and I do not lose to you.'),
   K73V('Then the war stands. Your name stays in my ledger. I will not act on it unless you act first.'),
   K73MV('same terms. ur name stays in my head','same terms','Same terms. Your name stays in my head, and my hand stays off the trigger unless yours moves.','Same terms. Your name stays in my head, my hand stays off the trigger, and the day yours moves I put one through your good coat. Shake on it.'),
   ['',k73M()?'You shake on it, flat on your backs under the tarp, with your other hand on your pistol and his on his knife, and neither of you lets go of either. On Friday you are the only two people on the Constance who know exactly where the other one is the whole time, and both of you check.':'You shake on it lying flat under the tarp, with your other hand on your knife and hers on her pistol, and neither of you lets go of either. On Friday you are the only two people on the Constance who know exactly where the other one is the whole time, and both of you check.']],hub)};
 say(L,()=>ask(K73Who(),m?'(He is waiting for you to say go.)':'(She has not hit you yet.)',m?[
  {t:'“go on, then. declare it”',sub:'lovers',fn:lovers},{t:'“don’t. if u say it, one of us loses”',sub:'rivals: a truce with knives under the table',fn:rivals}]:[
  {t:'Declare it',sub:'lovers',fn:lovers},{t:'Keep the war',sub:'rivals: a truce with knives under the table',fn:rivals}]))}

/* the morning after (lovers), scheduled the next morning under the shared cap */
function k73Morn(done){S.seen.e2l_morn=1;save();const m=k73M(),sug=sugOn(),crook=S.f.e2lScar==='crooked';say((sug?(m?[
  ['','You wake up in his bed at eleven, face down, shirtless, with the black hound across your feet, and for a full second you think you have broken in.']]:[
  ['','You wake at half past five, as always, and do not get up, because she is face down across most of your bed, shirtless, with the black hound across her feet, and you would like to go on looking.']]):(m?[
  ['','You wake up on the couch in his study at eleven, still in last night’s black with your boots on, under his coat, with the black hound across your feet. He is in the armchair opposite with a cup of tea gone cold, and he has clearly been watching you for some time.']]:[
  ['','You did not sleep. She is asleep on the couch in your study in last night’s black, boots on, under your coat, with the black hound across her feet, and you have been in the armchair opposite since half past five with a cup of tea going cold, watching her, because now you are allowed to.']])).concat([
  K73MV('this doesn’t mean u won','this doesn’t mean you won','This doesn’t mean you won.','This doesn’t mean you won. I want that clear before anybody makes coffee.'),
  K73V('I am aware. You won. I was there.'),
  K73MV('say it again','i won? say it again','I won? Say it again.','I won? Say it again. Slower.'),
  K73V(sug?'You won. Repeatedly.':'You won. I was there for all of it, and I will be there for the rest.'),
  crook&&sug?['',k73M()?'His arm is across your back. The hook of the scar is right by your face, and you kiss it, because it is yours.':'Your arm is across her back. She finds the hook of the scar with her mouth without opening her eyes, as if checking it is still there.']:null,
  ['','Both phones go off at once, and keep going.'],
  [AN,'(text) did you two kill each other or what. i need an answer. i need to open the envelope'],
  [RN,'(text) i got fifty on a body. somebody tell me there’s a body'],
  K73MV('tell them','tell them. go on','Tell them. Go on.','Tell them, V. In the board-meeting voice. I want to watch you type it.'),
  K73V('(text) There is no body. Angel, open the envelope.'),
  [AN,sug?'(text) 💌💌💌💌 I KNEW IT. it says “they end up in bed by the boat.” pay up ronin':'(text) 💌💌💌💌 I KNEW IT. it says “they end up together by the boat.” pay up ronin'],
  [RN,'(text) fuck. FUCK. fine. vee, u owe me fifty, this is ur fault']]),()=>{apply({aff:4});done()})}

/* ===================================== EPILOGUE ===================================== */
function k73Epi(){go(cutBg('#08060c'));k73Mark('e2l_epi');const f=S.f,lov=f.e2lEnd==='lovers';
 const L=lov?[
  ['','A year on, the anniversary of the bowling alley. The server has a recurring event for it, made by Angel, called WAR DAY 💌.'],
  ['','They still go after the same marks. They race, and the loser cooks. V has cooked eleven dinners this year and Misaki has cooked forty, and Misaki says that is because she lets him win.'],
  ['','Tonight they arrive on the same car park roof from opposite stairwells at the same moment, both with rifle cases.'],
  K73MV('mine','mine. i called it','Mine. I called this one in March.','Mine. I called this one in March, V. It’s on the calendar. Angel put it on the calendar.'),
  K73V('I called it in February.'),
  f.e2lEye==='note'?['','He still has the IOU in his wallet. He collects a little of the eye every morning, which means she has to look at him first thing, before the coffee, and she complains about it daily.']:f.e2lEye==='scope'?['','The scope lives on her rifle again. His reading glasses live on her face about half the time.']:null,
  f.e2lScar==='crooked'?['','He rolls his sleeves up in board meetings now. The directors have stopped asking about the M.']:null,
  f.e2lTruce?['','Clause four of the bowling alley accords is still in force: once a week each of them has to say one true thing about the other in the server. These days the true things are mostly worse than the threats.']:null,
  K73MV('race u','race you','Race you. Loser cooks.','Race you. Loser cooks. Winner gets the scope and the glasses.'),
  K73V('Go.')]:[
  ['','A year on, the anniversary of the bowling alley. The war has not stopped. It has only stopped being fought.'],
  ['','They have not tried to kill each other since the Constance. They still could, and both of them know the exact distance at which they could, all the time. Her name is still in his ledger in fountain pen. His is still in her head.'],
  ['','They work the same city under the truce. When they want the same mark they meet on a roof and settle it with a coin, and neither of them turns their back to the other to walk away, so they leave down the stairwell side by side, which Angel says is the most romantic thing she has ever seen and Ronin says is the most frightening.'],
  ['','Once a year, on this night, a single bullet stands on its end on his pillow. He leaves it there until morning, and sleeps.'],
  f.e2lEye==='note'?['','The IOU is still in V’s wallet. He has never collected.']:null,
  f.e2lScar==='crooked'?['','He has a scar on his left forearm with a hook at the end of it. She looks at it every time they meet, quickly, before she looks at his hands.']:null,
  K73MV('u still owe me 900','you still owe me 900 dollars','You still owe me nine hundred dollars. From the carpet.','You still owe me nine hundred dollars from the carpet. I’m going to collect it off your body one day.'),
  K73V('And you still owe me an eye, and the rest. I prefer my debt.'),
  ['','In Angel’s safe the envelope is still sealed. She will not open it. She says the bet is not over yet.']];
 say(L,()=>{apply({aff:lov?4:2});save();hub()})}

/* ===================================== THREADS ===================================== */
txDef('tx_e2l_m',{with:'v',pov:'m',prio:2,when:()=>E2L()&&S.phase==='normal'&&k73Done('e2l_mark'),nodes:{
 start:{in:()=>['You left a shell casing on the roof of the laundromat.','It has your thumbprint on it. It is in an envelope with the date on it, in my safe, next to a letter to Inspector Hale that I have not sent.'],expire:3,
  opts:()=>[{t:'“send it then. coward”',fx:()=>apply({aff:1}),reply:()=>['No. A courtroom would be quick, and you would be fed in a cell.','I have other plans for you.'],next:'what'},
   {t:'“ur a billionaire with a filing system. that’s all u are”',reply:()=>['I am a billionaire with a filing system and four hounds.','You are a woman with a rifle and no law. One of us will outlast the other.']},
   {t:'“stalker”',fx:()=>apply({aff:1}),reply:()=>['You lay on a roof for three nights watching my mark.','I watched you for one. You eat cereal out of the box at two in the morning with the door unlocked. You would be very easy.'],next:'easy'}]},
 what:{in:()=>['Do you want to know what they are?'],
  opts:()=>[{t:'“no”',reply:()=>['Good.']},
   {t:'“yes. tell me. i want it in writing”',fx:()=>apply({aff:1}),reply:()=>['No. You would find a way to use it.','That is the only thing about you I respect.']}]},
 easy:{in:()=>['Lock your door.'],
  opts:()=>[{t:'“come and try”',fx:()=>apply({aff:1}),reply:()=>['I intend to.','Next week. I like to know a thing well before I do it.']},
   {t:'“why do u care if i lock my door”',reply:()=>['I do not care.','I would prefer you difficult. It is cleaner.']}]}}});
txDef('tx_e2l_v',{with:'m',pov:'v',prio:2,when:()=>E2L()&&S.phase==='normal'&&k73Done('e2l_mark'),nodes:{
 start:{in:()=>['i can see ur bedroom from here','ur light’s on. u stand at the window like a man who wants to get shot'],expire:3,
  opts:()=>[{t:'“Where are you?”',fx:()=>apply({aff:1}),reply:()=>['somewhere with a really good angle'],next:'where'},
   {t:'“Come any closer and I will set the hounds on you.”',reply:()=>['send them','i’ll shoot the first one through the gate','…no i won’t. they didn’t do anything. send urself, coward']},
   {t:'“Then take the shot.”',fx:()=>apply({aff:1}),reply:()=>['…','not like this. i want u to see it coming','go to bed v']}]},
 where:{in:()=>['the water tower. i’ve got a flask and a rifle and no plans to sleep'],
  opts:()=>[{t:'“The water tower is mine. I bought it.”',reply:()=>['of course u did','of course u bought the water. rich men buy the WATER','i hope u choke on it']},
   {t:'“Turn round.”',fx:()=>apply({aff:2}),reply:()=>['…','how long have u been up here','ok. u had the shot. i had the shot. nobody took it','i don’t know what that means and i hate it']}]}}});
txDef('tx_e2l_pool',{with:'a',prio:2,when:()=>E2L()&&S.phase==='normal'&&k73Done('e2l_eye'),nodes:{
 start:{in:()=>['ok i’m not joking anymore','are you actually going to kill each other','ronin’s running a book so he doesn’t have to feel anything. i can’t do that. answer me'],expire:3,
  opts:()=>[{t:k73M()?'“yes”':'“Yes.”',reply:()=>['ok','then i’m going to be there when it happens, because somebody should be']},
   {t:k73M()?'“what’s in the envelope”':'“What is in the envelope?”',reply:()=>['the only bet i’m making','i sealed it with wax. i bought wax for this','i’ll open it when one of you is dead or i’m right']},
   {t:k73M()?'“stay out of it, angel”':'“Stay out of it, Angel.”',reply:()=>['no ❤️','you’re both mine. that’s not a vote']}]}}});
txDef('tx_e2l_a2m',{with:'v',pov:'m',prio:2,when:()=>E2L()&&S.phase==='act2'&&k73Done('e2l_stitch'),nodes:{
 start:{in:()=>['The stitches itch.','I would like to know whether that was deliberate.'],expire:3,
  opts:()=>[{t:'“yes”',fx:()=>apply({aff:2}),reply:()=>['I thought so.','I am not scratching them. I am thinking about you instead. It is worse.']},
   {t:'“scratch them and i redo the whole arm”',fx:()=>apply({aff:2}),reply:()=>['With your teeth?','I am in a board meeting. I have had to stop thinking about that.']}]}}});
txDef('tx_e2l_a2v',{with:'m',pov:'v',prio:2,when:()=>E2L()&&S.phase==='act2'&&k73Done('e2l_stitch'),nodes:{
 start:{in:()=>['how’s the arm','not that i care','i care about my work. i do good work'],expire:3,
  opts:()=>[{t:'“It is the best work on my body.”',fx:()=>apply({aff:2}),reply:()=>['…','it’s the ONLY work on ur body','for now']},
   {t:'“It itches.”',fx:()=>apply({aff:1}),reply:()=>['good','don’t touch it. i’ll know','i always know']}]}}});

/* ===================================== THE SERVER ===================================== */
const K73CHAT={normal:[
  [['an','can we please talk about the fact that V has misaki in a ledger'],['k9','I have a great many people in a ledger.'],['ro','vee. she’s one of us'],['k9','She is one of you.']],
  [['mi','reminder that k9 is a billionaire who kills people for fun and calls it law'],['k9','Reminder that hitmeuppp kills people for four hundred dollars a month and calls it rent.'],['an','please']],
  [['ro','book’s at $210. i’m only runnin’ it so i don’t drive over there'],['an','ronin'],['ro','i know']],
  [['an','the envelope is still sealed. it’s the only thing in this server i like right now']]],
 act2:[[['an','the book stays closed till the mimic’s caught. professional courtesy'],['ro','i got twenty on them bein’ in the same car right now'],['an','they ARE in the same car right now']]],
 lovers:[[['an','WAR DAY is in the calendar 💌'],['ro','still can’t believe i paid out on that']]],
 rivals:[[['an','it’s been a year. nobody’s dead. i’m counting that as mine'],['ro','still checkin’ the news every mornin’ for a car park']]]};
const _chat73=chatLog;chatLog=function(){const L=_chat73();try{if(!S||!E2L()||!k73Done('e2l_mark'))return L;let P=null;
 if(S.phase==='normal')P=K73CHAT.normal;else if(S.phase==='act2')P=K73CHAT.act2;else if(S.phase==='epilogue'&&S.f.e2lEnd)P=K73CHAT[S.f.e2lEnd];
 if(P)P[(S.day+S.slot)%P.length].forEach(x=>L.push(x))}catch(e){}return L};

/* ===================================== LOCATION EVENTS (one a day, shared with kc64/kc68) ===================================== */
const K73L=[];const l73=(id,rooms,p,when,run)=>K73L.push({id,rooms,p,when:()=>{try{return E2L()&&k73Done('e2l_mark')&&!(S.kd&&S.kd.med)&&when()}catch(e){return false}},run});
l73('l73_crepe',['mall'],.5,()=>S.phase==='normal',done=>say([
 ['',k73M()?'There is one crêpe left at the stand in the square, and you and V reach the counter at the same moment from opposite sides. A family is queueing behind you. Your hand goes to the small of your back, and his goes inside his coat, and neither of you finishes the movement.':'There is one crêpe left at the stand in the square, and Misaki reaches the counter at the same moment you do. A family is queueing behind her. Her hand goes to the small of her back and yours goes inside your coat, and neither of you finishes the movement.'],
 K73V('There are children here.'),
 K73MV('oh NOW u care about collateral'),
 K73V('I have always cared about collateral. It is the whole of my complaint against you.'),
 ['',k73M()?'You buy the crêpe and eat it at the counter, looking at him the entire time, with your other hand still behind your back. He waits until the family has gone. Then he leaves, walking backwards for the first ten steps.':'She buys the crêpe and eats it at the counter, looking at you the entire time, with her other hand still behind her back. You wait until the family has gone, and leave, walking backwards for the first ten steps.']],()=>{done()}));
l73('l73_base',['atrium'],.5,()=>S.phase==='normal',done=>say(k73M()?[
 ['','V’s atrium, empty. He is at a meeting. You have twenty minutes, and you came to learn the house the way he learned your trailer.'],
 ['','Four hounds. Back stair. Cameras on the kitchen, the hall and the yard, none on the study. You find his bedroom. The bed is made so tightly you could bounce a coin on it.'],
 ['','You stand a single bullet on its end in the middle of his pillow, and go.'],
 K73MV('(so u know i was here. so u know i didn’t)'),
 ['','On the way out the old hound watches you from the stairs and does not get up. You do not know what to make of that.']]:[
 ['','You come home from a meeting and go up to bed, and there is a single bullet standing on its end in the middle of your pillow.'],
 K73V('(She was in my house. She stood where I sleep, and did nothing, so that I would know she could.)'),
 ['','The old hound is on the stairs, where it has been all afternoon. It let her in and let her out.'],
 ['','You put the bullet in the ledger, taped under her name, and sleep in the chair facing the door.']],()=>{done()}));
l73('l73_board',['ronin'],.5,()=>['normal','act2'].includes(S.phase)&&!S.f.e2lEnd,done=>say([
 ['','Ronin’s fridge has a whiteboard on it now. Across the top, in red marker: THE WAR. Under it are two columns, MISAKI and VEE, and a third headed ANGEL’S ENVELOPE with nothing in it but a heart.'],
 [RN,k73M()?'Sit down, little killer. Don’t look at it. I keep it so I know. Numbers move, somethin’ happened. Numbers don’t move, everybody’s breathin’.':'Sit down, Vee. Don’t look at it. I keep it so I know. Numbers move, somethin’ happened. Numbers don’t move, everybody’s breathin’.'],
 [RN,'You go for her, Vee, or she goes for you, I’m in it. I told you both. Devil don’t pick sides but I fuckin’ do, and I ain’t picked yet.'],
 [k73H('hitmeuppp','K9'),k73H(MV('noted','noted','Noted.','Noted, Ronin.'),'Noted.')],
 [RN,'Good. Now eat somethin’. You look like shit.']],()=>{fr('r',1);done()}));
l73('l73_range',['dp_range','training'],.5,()=>['act2','act3'].includes(S.phase)&&k73Done('e2l_car'),done=>say([
 ['',k73M()?'V is on the range when you come down, shooting at the far target with a pistol, neatly, in fives. You take the lane next to him without asking and put a rifle group into his target, over his.':'Misaki comes down while you are on the range and takes the lane next to yours without asking, and puts a rifle group into your target, over yours.'],
 K73V('That is my target.'),
 K73MV('it’s my target now','it’s my target now. eye for an eye','It’s my target now. Eye for an eye.','It’s my target now. Lex talionis, V. You taught me that one.'),
 K73V('Your grouping is excellent.'),
 K73MV('say that again slower','say that again. slower','Say that again. Slower.','Say that again, slower, and look at me while you do it.'),
 K73V('Your grouping is excellent.'),
 ['',k73M()?'He says it slower, looking at you, and you miss the next shot by a foot.':'You say it slower, looking at her, and she misses the next shot by a foot.']],()=>{apply({aff:2});done()}));
const K73ROOMS=[...new Set(K73L.reduce((a,e)=>a.concat(e.rooms),[]))];
const l73Pool=id=>K73L.filter(e=>e.rooms.includes(id)&&!S.seen[e.id]&&e.when());
function l73Run(e,done){S.seen[e.id]=1;S.f.k64LDay=S.day;save();e.run(done||(()=>{}))}
function l73Try(id,force){if(!S||!E2L()||S.f.k64LDay===S.day&&!force)return null;const pool=l73Pool(id);if(!pool.length)return null;const e=pk(pool);if(!force&&Math.random()>e.p)return null;return e}
function l73Wait(id,e,n){setTimeout(()=>{if(!S||!scene||!scene.isRoom||S.room!==id||S.seen[e.id]||S.f.k64LDay===S.day)return;if(dlg||ctrl||(typeof mgOn==='function'&&mgOn())){if(n<8)l73Wait(id,e,n+1);return}l73Run(e)},1000)}
K73ROOMS.forEach(id=>{const R=ROOMS[id];if(!R)return;const o=R.enter;R.enter=function(){const r=o?o.apply(this,arguments):undefined;
 try{const e=l73Try(id);if(e)l73Wait(id,e,0)}catch(x){}return r}});

/* ===================================== DELIVERY ===================================== */
const K73B=[
 {id:'e2l_eye',t:()=>k73H('Somebody is in your trailer at four','Lex talionis: her trailer, at four'),sub:()=>'costs time · the war · an eye for an eye',when:()=>S.phase==='normal'&&k73Fresh(),run:k73Eye},
 {id:'e2l_sab',t:()=>k73H('The foundation dinner: table one','Your foundation dinner: table one'),sub:()=>'costs time · the war · the hotel by the river',when:()=>S.phase==='normal'&&k73Done('e2l_eye')&&k73Fresh(),run:k73Sab},
 {id:'e2l_truce',t:()=>'The bowling alley accords',sub:()=>'costs time · the war · Angel has drafted something',when:()=>S.phase==='normal'&&k73Done('e2l_sab')&&k73Fresh(),run:k73Truce},
 {id:'e2l_after',t:()=>k73H('The kitchen, at noon','The kitchen, at noon'),sub:()=>'costs time · everybody is being nice',when:()=>['after','act2'].includes(S.phase)&&(typeof kdPost==='function'?kdPost():true)&&(typeof kdD!=='function'||!S.kd||!S.kd.t0||kdD()>=3),run:k73After},
 {id:'e2l_car',t:()=>'A car, eight hours, the Mimic',sub:()=>'costs time · the case · forced partnership',when:()=>S.phase==='act2'&&S.day>=(S.act2Start||0)+1&&k73Fresh(),run:k73Car},
 {id:'e2l_stitch',t:()=>k73H('V is in the garage with a needle','The garage, one-handed, with a needle'),sub:()=>'costs time · the case · the box cutter',when:()=>S.phase==='act2'&&k73Done('e2l_car')&&k73Fresh(),run:k73Stitch},
 {id:'e2l_spar',t:()=>'The training hall, late',sub:()=>'costs time · first to three',when:()=>S.phase==='act2'&&k73Done('e2l_stitch')&&k73Fresh(),run:k73Spar},
 {id:'e2l_boat',t:()=>'Pier Nine: row out to the Constance',sub:()=>'costs time · the boat · the hide',when:()=>S.phase==='act3'&&typeof a3d==='function'&&a3d()>=2,run:k73Boat},
 {id:'e2l_epi',t:()=>'War Day, a year on',sub:()=>'costs time · the bowling alley',when:()=>S.phase==='epilogue',run:k73Epi}];
function k73Due(){if(!E2L()||S.phase==='taken'||(S.kd&&S.kd.med))return null;for(const b of K73B){if(k73Done(b.id))continue;let ok=false;try{ok=!!b.when()}catch(e){}if(ok)return b}return null}
const _sh73=sideHub;sideHub=function(late){const o=_sh73(late);try{if(!S)return o;
 if(k73EntryOk())return o.concat([{t:'⚔ '+k73H('Somebody took your mark','Take the card man off her roof'),sub:'free · optional · starts the enemies-to-lovers route',fn:k73Entry}]);
 const b=k73Due();if(!b)return o;return o.concat([{t:'⚔ '+b.t(),sub:b.sub(),dis:!!late,fn:()=>{spend();b.run()}}])}catch(e){return o}};
/* the kidnapping: V's river scene before the rescue, and the door before after() */
const _vR73=vRescue;vRescue=function(){try{if(S&&E2L()&&S.pov!=='m'&&!k73Done('e2l_come')){k73Mark('e2l_come',1);go(cutBg('#03050a'));return k73Come(()=>_vR73())}}catch(e){}return _vR73()};
const _af73=after;after=function(self){try{if(S&&E2L()&&!k73Done('e2l_door')){k73Mark('e2l_door',1);go(cutBg('#000'));return k73Door(self,()=>_af73(self))}}catch(e){}return _af73(self)};
/* the infirmary, and the affection cap */
const _hub73=hub;hub=function(){const a=arguments,self=this;try{if(S&&E2L()){const c=k73Cap();if(S.aff>c){S.aff=c;save()}const s=k73MedScene();if(s)return s(()=>_hub73.apply(self,a))}}catch(e){}return _hub73.apply(self,a)};
const _ap73=apply;apply=function(e){try{if(e&&e.aff>0&&S&&E2L()){const c=k73Cap();if(S.aff+e.aff>c)e=Object.assign({},e,{aff:Math.max(0,c-S.aff)})}}catch(x){}return _ap73(e)};
/* the morning after: the next morning, under the shared cap */
const _me73=morningEvent;morningEvent=function(done){try{if(S&&E2L()&&S.f.e2lEnd==='lovers'&&!S.seen.e2l_morn&&S.day>=(S.f.e2lMorn||0)&&['act3','epilogue'].includes(S.phase)&&!(S.kd&&S.kd.med)&&mbOk()){mbUse();go(cutBg('#0a0a10'));return k73Morn(()=>_me73(done))}}catch(e){}return _me73(done)};
/* kc66 on this route: only its aftermath beat (the security room) plays; break-in night and the rest presume an easy romance */
if(typeof k66Due==='function'){const _k66d73=k66Due;k66Due=function(){if(!E2L())return _k66d73();try{if(!K66()||k66Done('vm_codes'))return null;const b=K66B.find(x=>x.id==='vm_codes');return b&&b.when()?b:null}catch(e){return null}}}

/* ===================================== ENDINGS ===================================== */
const _xe73=extraEnding;extraEnding=function(){const L=_xe73();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f;
 if(f.e2lEnd==='lovers')L.push('Misaki and V declared war on each other under a tarp on the Constance, and have been losing to each other on purpose ever since. Angel won the envelope.');
 else if(f.e2lEnd==='rivals')L.push('Misaki and V have not tried to kill each other since the Constance. Her name is still in his ledger. Once a year a bullet stands on his pillow, and Angel’s envelope is still sealed.');
 else L.push('Misaki and V swore to kill each other over a carpet, and neither of them has managed it.');
 if(f.e2lEye==='note')L.push(f.e2lEnd==='lovers'?'V collects the eye he is owed every morning, first thing.':'V has never collected the eye he is owed. The IOU is in his wallet, behind his driving licence.');
 if(f.e2lScar==='crooked')L.push('There is a scar on V’s left forearm with a hook at the end of it like the tail of an M.');
 if(f.e2lLedger==='torn')L.push('There is a page missing from V’s ledger. It never had a total.');else if(f.e2lLedger==='kept')L.push('One page of V’s ledger has no total at the bottom.');
 if(f.e2lTruce==='v')L.push('The bowling alley accords were broken by a camera in a smoke alarm.');else if(f.e2lTruce==='m')L.push('The bowling alley accords lasted three days.')}catch(e){}return L};
