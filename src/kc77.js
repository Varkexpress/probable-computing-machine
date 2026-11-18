/* ===KC77-BEGIN=== */
/* ===================== THE WAR, THE REST OF IT (kc77) =====================
   kc74 gave the enemies-to-lovers route a full early game; after the kidnapping it had one beat in the after phase,
   four in Act II, one in Act III and one in the epilogue. This module fills chapters II–V. Needs kc73 and kc76.
   Beats (spliced into kc73's order; each opens on kc76's chapter card):
     II  e2l_rifle  V gives the rifle back, cleaned, with one round                       S.f.e2lRifle aimed|kept
         e2l_fork   the fork in both hands, at dinner (only after "be mean to me" → war)  S.f.e2lFork waited|potato   (free)
     III e2l_list   the Mimic's fourth: Misaki's shot, V's cutting, done badly            S.f.e2lList shot|cut        (free)
     IV  e2l_will   Angel's wills, before Pier Nine                                       S.f.e2lWill bullet|nothing (M), hounds|page (V)  (free)
         e2l_book   rivals only: Ronin closes the book
     V   e2l_page   what became of the page                                               S.f.e2lPage burned|kept (lovers), wrote|unread (rivals)
   "free" beats do not use up the day's move.
   The case menu (Act II, once the car has happened; ⚔ The case: with him / with them; one action a day, costs time):
     walk the old list, the ops table, sleep in shifts (S.f.e2lSlept {m,v}; counts S.f.e2l77).
   Also: four location scenes (Ronin's fridge, the hounds on the infirmary stairs, the crêpe stand again, Angel's
   safe), two threads (the lock; Thursday), server lines for the after phase and Act III, and ending lines.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc77.md. Test: node tools/k77_test.js */
const K77=()=>{try{return typeof K76==='function'&&K76()}catch(e){return false}};
const k77F=()=>{S.f.e2l77=S.f.e2l77||{};return S.f.e2l77};
const k77N=k=>k77F()[k]||0;
const k77Inc=k=>{const F=k77F();F[k]=(F[k]||0)+1;save();return F[k]};
const k77Go=col=>go(cutBg(col||'#08080a'));

/* ===================================== II · THE RIFLE ===================================== */
function k77Rifle(){k77Go('#0c0b0a');k73Mark('e2l_rifle');const m=k76M(),eye=S.f.e2lEye;
 const L=(m?[
  ['','Your rifle has been in his house since the river. Ronin carried it in from the truck the first night, V took it down to the ops deck, and nobody has mentioned it since.'],
  ['','Today it is on the kitchen island when you come down, on a folded towel, cleaned and put back together. '+(eye==='scope'?'The scope he took from you is back on it.':'Somebody has re-zeroed the scope; you can see the fresh witness mark.')]]:[
  ['','Their rifle has been on your ops deck since the river. It was full of silt. You have had it apart four times, at night, and each time you have told yourself it was to see how they keep it.'],
  ['','Today you lay it on the kitchen island on a folded towel, clean, with a new firing pin, '+(eye==='scope'?'and the scope you took from them back on the rail.':'and the scope zeroed.')+' They come down at noon and stop.']]).concat([
  K76V('It was full of river. The firing pin is new. I have not altered anything else.'),
  K76MV('u cleaned the gun i’m going to shoot u with','you cleaned the gun i’m going to shoot you with','You cleaned the gun I’m going to shoot you with.','You cleaned the gun I’m going to shoot you with, V. You do know that’s what it’s for.'),
  K76V('I do. I would not be shot by a dirty one.'),
  ['',m?'He stands one round on its end on the towel, beside the bolt, and takes his hand away.':'You stand one round on its end on the towel, beside the bolt, and take your hand away.']]);
 const aimed=()=>{S.f.e2lRifle='aimed';apply({aff:2});save();say([
   ['',m?'You load it with one hand, which takes a while, and he waits. You get the stock into your shoulder and the crosshair onto the second button of his shirt. Your left hand will not take the weight. The muzzle draws a slow circle on his chest.':'You stay where you are. They load it with one hand, which takes a while, and get the stock into their shoulder and the muzzle onto your chest. Their left hand will not take the weight. The muzzle draws a slow circle over your shirt buttons.'],
   K76V('In a month it will hold still. I will stand here again then, if you ask me to.'),
   m?K76MV('(he would. he’d stand there)','(he would. he’d stand right there and let me)','(He would. He’d stand right there.)','(He would. He would stand right there in his own kitchen and let me line it up.)'):K76V('(I meant it. I have checked, twice, and I meant it.)'),
   ['',m?'You take the round back out, which is harder than putting it in, and stand it on the towel where he put it.':'They take the round back out, which is harder than putting it in, and stand it on the towel exactly where you put it.']],hub)};
 const kept=()=>{S.f.e2lRifle='kept';apply({aff:2});save();say([
   ['',m?'You put the round in your pocket and the rifle over your good shoulder.':'You go out to the kennels and leave them with it. Through the window you see them hang the rifle over their good shoulder, turn the round over in their fingers for some time, and put it in a pocket.'],
   m?K76MV('not today. i want both hands for it','not today. i want both hands for you','Not today. I want both hands for you.','Not today. When I do it I want both hands, and I want you to have seen it coming for weeks.'):null,
   m?K76V('I assumed as much. It is why I gave you one round and not five.'):K76V('(One round. I told myself that five would be an insult to their aim.)')],hub)};
 say(L,()=>ask(K73Who(),m?'(One round, on its end.)':'(They are looking at the round.)',m?[
  {t:'Load it, and put it on him',sub:'find out what your hand can do',fn:aimed},{t:'Put the round in your pocket',sub:'not today',fn:kept}]:[
  {t:'Stay where they can aim at you',sub:'find out what they do',fn:aimed},{t:'Leave them alone with it',sub:'go out to the kennels',fn:kept}]))}

/* ===================================== II · THE FORK ===================================== */
function k77Fork(){k77Go('#0e0b08');k73Mark('e2l_fork',1);const m=k76M();
 const L=[
  ['',m?'Dinner at the long table, all four of you. Every night since the kitchen you have practised in the bathroom with a fork off the tray, until the hand shook too much to go on.':'Dinner at the long table, all four of you. Since the kitchen, one fork has been missing from the trays every night and back in the drawer by morning, and you have said nothing about it to anybody.'],
  ['',m?'Tonight you pick up the knife in your right hand and the fork in your left, and the fork stays where you put it.':'Tonight they pick up the knife in the right hand and the fork in the left, and the fork stays where they put it.'],
  ['',m?'Nobody else at the table knows what he said to you in the kitchen. He stops cutting his meat.':'Nobody else at the table knows what you said to them in the kitchen. You stop cutting your meat.'],
  K76V('You can hold a fork in both hands.'),
  K76MV('yep. u said','yep. so. you said','Yes. So. You said.','Yes. As of tonight. So. You said when.'),
  K76V('I said.')];
 const waited=()=>{S.f.e2lFork='waited';apply({aff:3});save();say([
   ['',m?'You put the knife and fork down and lay both hands flat on the cloth, where he can see them. Angel has stopped chewing. Ronin has one hand under the table, where the crowbar is.':'They put the knife and fork down and lay both hands flat on the cloth, where you can see them. Angel has stopped chewing. Ronin has one hand under the table, where the crowbar is.'],
   K76V('I would not do it at dinner, in front of them. I have tried this week to fix another time, and I find that I cannot fix one.'),
   m?K76MV('(he had a date for everything else)','(he had a date for everything else. the bins have a date)','(He had a date for everything else.)','(He had a date for everything else he ever wrote down. He has a date for the bins.)'):K76V('(Every other line in that book has a date beside it.)'),
   [RN,'Somebody wanna tell me what the fuck that was.'],[AN,'No. Eat.']],hub)};
 const potato=()=>{S.f.e2lFork='potato';apply({aff:3});save();say([
   ['',m?'You reach across the table with the left hand, slowly, because it has to be slow, and take the last potato off his plate with the fork, and eat it looking at him.':'You push your plate an inch toward them. They reach across with the left hand, slowly, because it has to be slow, and take the last potato off it with the fork, and eat it looking at you.'],
   K76V('That was mine.'),
   K76MV('so’s the oath. come get either one','so is the oath. come and get either one','So is the oath. Come and get either one.','So is the oath, V. You’re welcome to come round the table for either of them.'),
   ['',m?'He does not come round the table. He cuts the rest of his meat very small.':'You do not go round the table. You cut the rest of your meat very small.'],
   [RN,'Somebody wanna tell me what the fuck that was.'],[AN,'No. Eat.']],hub)};
 say(L,()=>ask(K73Who(),m?'(He is waiting, with the knife still in his hand.)':'(They are waiting.)',m?[
  {t:'Put the fork down. Hands flat on the table',sub:'let him say when',fn:waited},{t:'Take the last potato off his plate with it',sub:'left-handed',fn:potato}]:[
  {t:'Tell them you cannot fix a date',sub:'it is true',fn:waited},{t:'Push your plate toward them',sub:'see what the hand can do',fn:potato}]))}

/* ===================================== III · THE FOURTH BODY ===================================== */
function k77List(){k77Go('#08090c');k73Mark('e2l_list',1);const m=k76M(),show=!!S.f.e2lShow;
 const L=[
  ['','The Mimic’s fourth is on a landing in a block off the ring road. Inspector Hale has the stairwell taped, and lets the two of you up for ten minutes, because the name on the wall is V’s.'],
  ['',m?'The man is off your old list. He has been shot the way you would have done it: one round from across the street, through the landing window. Then somebody has come up the stairs and done to the body what V does in his cold room, with the wrong kind of knife, and written K9 above it in the man’s blood.':'The man is off their old list. He has been shot the way they would have done it: one round from across the street, through the landing window. Then somebody has come up the stairs and done to the body what you do in the cold room, with the wrong kind of knife, and written K9 above it in the man’s blood.'],
  K76V('The shot is yours. It is a good copy. He has your distance.'),
  K76MV('the cutting’s shit tho. that’s meant to be u?','the cutting is shit though. that’s meant to be you?','The cutting is shit, though. That’s meant to be you?','The cutting is shit, though. That’s meant to be you? He’s hacked at it like a Sunday roast.'),
  K76V('It is meant to be. He has cut across the grain. I would be ashamed of that joint.'),
  ['','You stand over a dead man, the two of you, each insulted on the other’s behalf. Hale watches from the top stair and writes nothing down.']];
 const shot=()=>{S.f.e2lList='shot';apply({aff:2});save();say([
   m?K76MV('he shoots like me. so he’s watched me work','he shoots like me. that means he’s watched me work','He shoots like me. That means he’s watched me work.','He shoots like me, down to the window. That means he has watched me work, more than once.'):['','You crouch at the landing window and find the line back across the street: their roof, their distance, the gap they would have picked.'],
   K76V('Then he has watched you for longer than I have. I do not like that.'),
   K76MV('jealous?','…are u jealous','Are you jealous?','Are you jealous of a serial killer, V? Because that’s what that sounded like.'),
   K76V('Territorial. Your name is in my book. It is in nobody else’s.')],hub)};
 const cut=()=>{S.f.e2lList='cut';apply({aff:2});save();say([
   m?K76MV('he cuts like someone who got told about u','he cuts like somebody who was told about you','He cuts like somebody who was told about you.','He cuts like somebody who was told about you and never saw it. He’s got the order right and the hands wrong.'):['','You turn the wrist over with a pen. He has the order of the cuts right and every one of them wrong: too deep, across the grain, in a hurry.'],
   K76V('Yes. Somebody has described my work to him. Very few living people have seen it.'),
   show?K76MV('i have. u sent me a link','i have. you sent me a link','I have. You sent me a link.','I have. You sent me a link at three in the morning, remember.'):K76MV('don’t look at me','don’t look at me. i’ve only seen the carpet','Don’t look at me. I’ve only seen the carpet.','Don’t look at me. All I ever saw was a carpet with shoes on.'),
   show?K76V('You have. You would have got the grain right.'):K76V('I was not looking at you. I was thinking that you would have got the grain right.')],hub)};
 say(L,()=>ask(K73Who(),'(Ten minutes. Hale is counting them.)',m?[
  {t:'“he shoots like me”',sub:'the shot',fn:shot},{t:'“he cuts like somebody who was told about u”',sub:'the cutting',fn:cut}]:[
  {t:'Look at the shot',sub:'their half of it',fn:shot},{t:'Look at the cutting',sub:'your half of it',fn:cut}]))}

/* ===================================== IV · THE WILLS ===================================== */
function k77Will(){k77Go('#0a0a10');k73Mark('e2l_will',1);const m=k76M(),torn=S.f.e2lLedger==='torn';
 if(m)return say([
  ['','Before Pier Nine, Angel makes everybody bring their will up to date. She keeps them in a note on her phone called “list (final) (3)”.'],
  ['','Yours is short. The rifle goes to Angel. The truck and the chainsaw go to Ronin. The cactus goes to whoever remembers to water it.'],
  [AN,'and V?']],()=>ask('hitmeuppp','(Angel has her thumbs over the keyboard.)',[
  {t:'“he gets the bullet i was saving”',fn:()=>{S.f.e2lWill='bullet';apply({aff:2});save();say([
   ['','Angel types it in without looking up.'],[AN,'he put you in his, you know. this afternoon. do you want to hear it'],
   K76MV('no','no. …what’s it say','No. …What does it say?','No. …Fine. What does it say?'),
   [AN,'“Misaki is to have the hounds. The hounds have already decided.”'],
   K76MV('(…fuck)','(…oh, fuck)','(Oh, fuck.)','(Oh, fuck. He put it in writing. He puts everything in writing.)')],hub)}},
  {t:'“nothing. he’s got everything already”',fn:()=>{S.f.e2lWill='nothing';apply({aff:2});save();say([
   [AN,'ok. nothing for the billionaire'],[AN,'he left you something. he rang it in this afternoon. it’s a page. he said you’d know which'],
   K76MV('(the page)','(the page. my page)','(The page. My page.)','(The page. He is leaving me my own page, with everything on it.)'),
   [AN,torn?'it’s inside his jacket, by the way. it has been for weeks. i’ve seen him check it':'it’s still in the book, by the way. he hasn’t written at the bottom of it. i looked']],hub)}}]));
 say([
  ['','Before Pier Nine, Angel requires a current will from each of you. Yours has been with the foundation’s lawyers for eleven years. It disposes of forty-one shelters and four hounds, and it has never named a person.'],
  ['','This afternoon you ring her to dictate an addition.']],()=>ask('K9','(Angel is waiting, with the note open.)',[
  {t:'Leave them the hounds',fn:()=>{S.f.e2lWill='hounds';apply({aff:2});save();say([
   K76V('Misaki is to have the hounds. The hounds have already decided.'),[AN,'V.'],K76V('Type it, please.'),
   [AN,'typed. they left you something too. a bullet. they said you’d know which one'],
   K76V('(I know which. It has stood on my pillow.)')],hub)}},
  {t:'Leave them their page',fn:()=>{S.f.e2lWill='page';apply({aff:2});save();say([
   K76V('There is a page with their name on it. '+(torn?'It is inside my jacket.':'It is in the ledger.')+' It is to go to them, unread by anybody else.'),
   [AN,'typed. they left you nothing, V. they said you’ve got everything already'],
   K76V('(I do not have everything. I went through the house this week to be certain.)')],hub)}}]))}

/* ===================================== IV · THE BOOK (rivals) ===================================== */
function k77Book(){k77Go('#08070c');k73Mark('e2l_book');const m=k76M();say([
  ['','The server, the night after the Constance.'],
  [RN,'ok. book’s closed for good. nobody won. the pot’s goin’ to the old priest'],
  [AN,'the envelope stays shut'],
  K76V('Their name remains in my ledger.'),
  K76MV('and his is in my head. we shook on it'),
  [RN,'you shook on it under a tarp with a knife and a gun. that ain’t a truce, that’s a fuckin’ wedding'],
  [AN,'RONIN'],
  ['',m?'You do not answer him. You are on the water tower with V’s bedroom window in the scope, and he is at the window with field glasses on the tower. That is how you both like to read the server now.':'You do not answer him. You are at the bedroom window with field glasses on the water tower, and they are on the tower with your window in the scope. That is how you both prefer to read the server now.']],hub)}

/* ===================================== V · THE PAGE ===================================== */
function k77Page(){k77Go('#0a080c');k73Mark('e2l_page');const m=k76M(),lov=S.f.e2lEnd==='lovers';
 if(lov){const L=[
   ['',m?'He gives you the page on an ordinary Tuesday, across the kettle. All of it is there in fountain pen, from the carpet to the Constance. At the bottom, where the total goes, he has written a date. It is today’s.':'You give them the page on an ordinary Tuesday, across the kettle. All of it is there, from the carpet to the Constance. At the bottom, where the total goes, you have written a date. It is today’s.'],
   K76MV('what’s the date for','what’s the date for?','What’s the date for?','What’s the date for? That’s where the total goes. You told me that’s where the total goes.'),
   K76V('It is the day I stop adding to it. I had to choose one, or I would have gone on.')];
  const burned=()=>{S.f.e2lPage='burned';apply({aff:3});save();say([
    ['',m?'You burn it in the sink with his lighter. It takes a long time; it is good paper. He watches all of it go, with the old hound’s head on his shoe.':'You burn it in the sink with your own lighter, in front of them. It is good paper and it goes slowly. The old hound puts his head on your shoe.'],
    K76MV('there. now u’ve got nothing on me','there. now you’ve got nothing on me','There. Now you’ve got nothing on me.','There. Now you have nothing on me at all, V. How does that feel?'),
    K76V('I have it by heart. I am not going to say so again.')],hub)};
  const kept=()=>{S.f.e2lPage='kept';apply({aff:3});save();say([
    ['',m?'You fold it in four and put it in the go-bag, between the calculus book with no cover and the spare magazine.':'They fold it in four and put it in the go-bag, between a book with no cover and a spare magazine.'],
    K76MV('i’m keeping it. in case u get ideas','i’m keeping it. in case you get ideas','I’m keeping it. In case you get ideas.','I’m keeping it. If you ever get ideas, I want to be able to read you your own handwriting.'),
    K76V('That is why I gave it to you.')],hub)};
  return say(L,()=>ask(K73Who(),m?'(It is one sheet. It weighs nothing.)':'(They are reading it for the second time.)',m?[
   {t:'Burn it in the sink',fn:burned},{t:'Keep it in the go-bag',fn:kept}]:[{t:'Burn it yourself, in front of them',fn:burned},{t:'Let them keep it',fn:kept}]))}
 const L=[
  ['',m?'Once a year he shows you the page. That is in the terms now. You read it standing up in his study, with your pistol on his desk and his knife beside it.':'Once a year you show them the page. That is in the terms now. They read it standing up in your study, with their pistol on your desk and your knife beside it.'],
  ['','There is one line under the Constance. It is this year’s date, and the word NOTHING.'],
  K76MV('u wrote nothing','you wrote “nothing”','You wrote “nothing”.','You wrote “nothing”. A whole year, and you got out the fountain pen to write “nothing”.'),
  K76V('Nothing happened. I record what happens.')];
 const wrote=()=>{S.f.e2lPage='wrote';apply({aff:2});save();say([
   ['',m?'You take his fountain pen and write under his line, in your own hand: STILL COULD. He blots it for you.':'You hold the pen out to them. They write under your line, in their own hand: STILL COULD. You blot it for them.'],
   K76V('That is accurate.'),K76MV('i know','i know it is','I know it is.','I know it is. See you next year.')],hub)};
 const unread=()=>{S.f.e2lPage='unread';apply({aff:1});save();say([
   ['',m?'You hand it back without reading the rest. He puts it in the drawer, and you watch his hands the whole way there and the whole way back.':'You close the ledger. They watch your hands the whole way to the drawer and the whole way back.'],
   K76MV('same time next year','same time next year','Same time next year.','Same time next year. Bring the knife.')],hub)};
 say(L,()=>ask(K73Who(),m?'(His pen is on the blotter.)':'(Your pen is on the blotter.)',m?[
  {t:'Write the next line yourself',fn:wrote},{t:'Hand it back',fn:unread}]:[{t:'Offer them the pen',fn:wrote},{t:'Close the ledger',fn:unread}]))}

/* ===================================== SPLICE (kc73's order, kc76's cards) ===================================== */
(function(){try{if(typeof K73B==='undefined'||typeof k76Card!=='function')return;const at=id=>K73B.findIndex(b=>b.id===id);
 const add=(before,b)=>{const r=b.run;b.run=function(){return k76Card(b.id,()=>r())};const i=at(before);K73B.splice(i<0?K73B.length:i,0,b)};
 const late=()=>['after','act2'].includes(S.phase);
 add('e2l_car',{id:'e2l_rifle',t:()=>k76H('Your rifle is on his kitchen island','Give the rifle back'),sub:()=>'costs time · one round',when:()=>late()&&k73Done('e2l_after')&&k73Fresh(),run:k77Rifle});
 add('e2l_car',{id:'e2l_fork',t:()=>'Dinner: a fork in both hands',sub:()=>'costs time · what he said in the kitchen',when:()=>late()&&k73Done('e2l_rifle')&&S.f.e2lAfter==='war'&&k73Fresh(),run:k77Fork});
 add('e2l_stitch',{id:'e2l_list',t:()=>'The Mimic’s fourth, off the ring road',sub:()=>'costs time · Hale gives you ten minutes',when:()=>S.phase==='act2'&&k73Done('e2l_car')&&k73Fresh(),run:k77List});
 add('e2l_boat',{id:'e2l_will',t:()=>'Angel wants the wills updated',sub:()=>'costs time · “list (final) (3)”',when:()=>S.phase==='act3'&&typeof a3d==='function'&&a3d()>=1,run:k77Will});
 add('e2l_epi',{id:'e2l_book',t:()=>'The server: Ronin closes the book',sub:()=>'costs time · the night after',when:()=>S.f.e2lEnd==='rivals'&&['act3','epilogue'].includes(S.phase)&&k73Done('e2l_boat')&&k73Fresh(),run:k77Book});
 K73B.push({id:'e2l_page',t:()=>'The page with the name on it',sub:()=>'costs time · where the total goes',when:()=>S.phase==='epilogue'&&k73Done('e2l_epi')&&!!S.f.e2lEnd&&k73Fresh(),run:function(){return k76Card('e2l_page',()=>k77Page())}})}catch(e){}})();

/* ===================================== III · THE CASE MENU ===================================== */
const k77CaseOk=()=>{try{return K77()&&S.phase==='act2'&&k73Done('e2l_car')&&!S.f.e2lEnd}catch(e){return false}};
const k77Slept=()=>{const s=S.f.e2lSlept||{};return {m:s.m||0,v:s.v||0}};
const k77Var=(k,arr)=>arr[(k77N(k)-2)%arr.length];
function k77Case(){const m=k76M();const A=(id,t,sub,fn)=>({t,sub:(k77N(id)?'×'+k77N(id)+' · ':'')+sub,fn:()=>{spend();S.done.k77act=1;save();k77Go('#07080c');fn()}});
 ask(K73Who(),m?'(the case. with him. tonight:)':'(The case, with them. Tonight:)',[
  A('list',k76H('Walk your old list with him','Walk their old list with them'),'eleven names nobody collected on',k77Walk),
  A('file','The ops table, two in the morning','his file on the Mimic, and on '+k76H('you','them'),k77Ops),
  k73Done('e2l_row')?{t:'Sleep in shifts',sub:'neither of you will, since the corridor',dis:true,fn:()=>{}}:A('watch','Sleep in shifts','a metre apart, both armed',k77Shifts),
  ...((typeof k78TellsOk==='function'&&k78TellsOk())?[A('tells',k76H('Watch him','Study them'),k76H('for the day he decides','for the day somebody pays them'),k78Tells)]:[]),
  {t:'Not tonight',fn:hub}])}
function k77Walk(){const n=k77Inc('list'),m=k76M();
 if(n>1)return say(k77Var('list',[
  [['',m?'Tonight’s name has moved away. The flat is empty, and four months of post are on the mat. You stand in a stranger’s hallway with V while he reads the man’s gas bill.':'Tonight’s name has moved away. The flat is empty, and four months of post are on the mat. You read the gas bill; it gives a forwarding town.'],
   K76V('He has gone to the coast. He is paid up to March.'),K76MV('so he’s alive. cross him off','so he’s alive. cross him off','So he’s alive. Cross him off.','So he’s alive, and the Mimic doesn’t know where. Cross him off.'),K76V('I do not cross things out. I will write “coast”.')],
  [['','Tonight’s name died in March, of his heart, in a hospital bed, with a nurse holding his hand. The notice is taped inside the shop window.'],
   K76V('He was owed a great deal worse than that.'),K76MV('he’s dead, v. it’s the same dead','he’s dead, v. it’s the same dead','He’s dead, V. It’s the same dead.','He’s dead, V. It comes out the same. Nobody checks how.'),K76V('I check how.')],
  [['',m?'Tonight’s name opens the door herself, sees you, and shuts it, and you hear three bolts go across. She has been waiting four years for you to come back.':'Tonight’s name opens the door herself, sees Misaki, and shuts it, and three bolts go across. She has been waiting four years for them to come back.'],
   K76V('She knew your face.'),K76MV('they all do. i don’t wear a mask. masks are for people who plan on being caught'),K76V('I will put a man on her door. She is on my list, and I want her alive when I reach her.')]]),hub);
 say([
  ['',m?'Your old list has eleven names that were never collected on. The Mimic is working down it. You go round them in V’s car, one a night, to see who is still breathing.':'Their old list has eleven names that were never collected on. The Mimic is working down it. You drive them round it, one name a night, to see who is still breathing.'],
  ['','The first is a woman with a pawnshop on the east side. She buys medals and wedding rings from people at the shelters, and sells them back to the families at four times the price. Her light is on. She is alive.'],
  K76V('You were paid to kill her and you did not.'),
  K76MV('client died before he paid. no money, no job','the client died before he paid. no money, no job','The client died before he paid. No money, no job.','The client died before he paid, so there was no job. I don’t do them for free. That’s the difference between a job and a hobby.'),
  K76V('She has been on my list for two years. I had not reached her.')],
 ()=>ask(K73Who(),m?'(So both of you were going to.)':'(So both of you were going to.)',m?[
  {t:'“so we were both going to. what’s the difference”',fn:()=>say([K76V('The difference is that I know what she did.'),K76MV('and she’s exactly as alive','and she’s exactly as alive as if you didn’t','And she’s exactly as alive as if you didn’t.','And she is exactly as alive tonight as if you had never heard of her.'),['','He does not answer that. He writes something on her page in the dark, without the light on.']],hub)},
  {t:'“u had two years. i’d have done it in a week”',fn:()=>say([K76V('Yes. You would have.'),K76V('I have been turning that over since the river.'),['','He starts the car. You watch him not look at you for eleven streets.']],hub)}]:[
  {t:'“The difference is that I know what she did.”',fn:()=>say([K76V('The difference between us is that I know what she did.'),K76MV('and she’s exactly as alive','and she’s exactly as alive as if you didn’t','And she’s exactly as alive as if you didn’t.','And she is exactly as alive tonight as if you had never heard of her.'),['','You write that on the pawnbroker’s page, in the dark, without the light on, because it is true.']],hub)},
  {t:'Say nothing, and start the car',fn:()=>say([K76MV('u had two years. i’d have done it in a week','you had two years. i’d have done it in a week','You had two years. I’d have done it in a week.','You had two years, V. If he’d paid me, I’d have done it in a week.'),K76V('(They would have. I have been turning that over since the river.)'),['','You drive eleven streets without looking at them.']],hub)}]))}
function k77Ops(){const n=k77Inc('file'),m=k76M(),car=S.f.e2lCar;
 if(n>1)return say(k77Var('file',[
  [['',m?'He has added a page to your file since the river. He does not show it to you. It lies face down under his hand all night, and when he goes for tea he takes it with him.':'You have added a page to their file since the river. You do not show it to them. It lies face down under your hand all night, and when you go for tea you take it with you.'],
   m?K76MV('(i’m going to read that page if it kills me. it might)'):K76V('(It is a list of what they will not eat. It has no use in a case against them, and I cannot say why I wrote it.)')],
  [['',m?(car==='watch'?'Page thirty-one of his file is a photograph of you asleep in his car, under his coat. It is filed under EVIDENCE.':'Page thirty-one of his file is the parking ticket, in a plastic sleeve, with both your signatures.'):(car==='watch'?'Page thirty-one of their file is a photograph of them asleep in your car, under your coat. You filed it under EVIDENCE.':'Page thirty-one of their file is the parking ticket, in a plastic sleeve, with both your signatures.')],
   K76MV('evidence of what','evidence of what?','Evidence of what?','Evidence of what, V? Be specific. You love being specific.'),K76V('I have not decided. It is filed until I do.')],
  [['','The Mimic’s notes are on the left of the table and the originals on the right. By three in the morning the two piles have crept together, and you are both reading off the same page with your heads a hand apart.'],
   ['',m?'He notices first. He moves the lamp, not himself.':'You notice first. You move the lamp, and stay where you are.']]]),hub);
 say([
  ['',m?'The ops deck, two in the morning. He has the Mimic’s four laid out on the table beside the originals: your jobs from his file, his own from memory.':'The ops deck, two in the morning. You have the Mimic’s four laid out on the table beside the originals: their jobs from your file, your own from memory.'],
  ['',m?'His file on you is forty pages. You read it while he pretends to read something else. He has the doorman’s hotel wrong.':'Your file on them is forty pages. They read it while you pretend to read something else. On page six they stop.'],
  K76MV('it was the hotel by the station. not the river one','it was the hotel by the station, not the river one','It was the hotel by the station, not the river one.','It was the hotel by the station, not the one on the river. You’ve had that wrong the whole time.'),
  K76V('You are correcting my file on you.'),
  K76MV('if ur going to hang me with it, get it right','if you’re going to hang me with it, get it right','If you’re going to hang me with it, get it right.','If you’re going to hang me with it, V, the least you can do is get it right.'),
  ['',m?'He uncaps the fountain pen and changes it, and initials the change.':'You uncap the fountain pen and change it, and initial the change.']],
 ()=>ask(K73Who(),m?'(Thirty-four pages to go.)':'(They have not put the file down.)',m?[
  {t:'Correct the rest of it',fn:()=>{S.f.e2lFileFix=1;save();say([['','You go through all forty pages with him. Two dates are wrong and a street is misspelt, and one job he has given you was never yours. He takes that one out and holds it for a while before he puts it in the bin.'],K76V('The rest stands.'),K76MV('yeah. the rest is me','yeah. the rest is me','Yeah. The rest is me.','Yeah. The rest is me. I never said it wasn’t.')],hub)}},
  {t:'Stop at the doorman',fn:()=>say([['','You shut the file on page six and push it back across the table. You have helped the man who swore to kill you make his case, by one line, and you are not sure why you opened your mouth.'],K76V('Thank you.'),K76MV('don’t')],hub)}]:[
  {t:'Ask them to check the rest',fn:()=>{S.f.e2lFileFix=1;save();say([['','They go through all forty pages with you. Two dates are wrong and a street is misspelt, and one job you gave them was never theirs. You take that page out, hold it for a while, and put it in the bin.'],K76V('The rest stands.'),K76MV('yeah. the rest is me','yeah. the rest is me','Yeah. The rest is me.','Yeah. The rest is me. I never said it wasn’t.')],hub)}},
  {t:'Take the file back',fn:()=>say([['','You take the file back and square the pages. They have improved your case against them by one line, of their own accord, and you do not know what to do with a mark who does that.'],K76V('Thank you.'),K76MV('don’t')],hub)}]))}
function k77Shifts(){const n=k77Inc('watch'),m=k76M();const sl=w=>{S.f.e2lSlept=S.f.e2lSlept||{m:0,v:0};S.f.e2lSlept[w]=(S.f.e2lSlept[w]||0)+1;save()};
 const sleepM=()=>{sl('m');say([
   ['',m?'You put your pistol on the dash where he can reach it, because hiding it would be an insult to both of you, and shut your eyes.':'They put their pistol on the dash where you can reach it, and shut their eyes. You look at it for some time. It would take you less than a second.'],
   ['',m?'When you wake, it is where you left it. He has turned it round so that the grip faces you.':'Before they wake, you turn it round so that the grip faces them.']],hub)};
 const sleepV=()=>{sl('v');say([
   ['',m?'He folds his coat, lays the scalpel from his collar on the dash between you, and is asleep inside a minute. You look at the scalpel for three hours, and then you look at him.':'You fold your coat, lay the scalpel from your collar on the dash between you, and sleep. You have not slept within reach of an armed enemy in your life, and you are gone inside a minute.'],
   m?K76MV('(three and a half hours exactly. he wakes up already looking at me)'):['','You wake after three and a half hours. The scalpel has not moved. Their eyes have not left it.']],hub)};
 if(n>1){const s=k77Slept();return say([['','Shifts again, on a different street. The pistol and the scalpel go on the dash side by side, and nobody remarks on it now.'],
   ['','So far: Misaki has slept '+s.m+' night'+(s.m===1?'':'s')+' beside him, and V '+s.v+' beside them.']],()=>ask(K73Who(),'(Who sleeps first?)',m?[
   {t:'You',fn:sleepM},{t:'Him',fn:sleepV}]:[{t:'You',fn:sleepV},{t:'Them',fn:sleepM}]))}
 say([['','The second night on the same street. One of you has to sleep. Whoever sleeps does it a metre from an armed person who has sworn in front of witnesses to kill them.']],
  ()=>ask(K73Who(),'(Who sleeps first?)',m?[
   {t:'Sleep first',sub:'your pistol goes on the dash',fn:sleepM},{t:'Take the first watch',sub:'he sleeps',fn:sleepV}]:[
   {t:'Sleep first',sub:'your scalpel goes on the dash',fn:sleepV},{t:'Take the first watch',sub:'they sleep',fn:sleepM}]))}
const _sh77=sideHub;sideHub=function(late){const o=_sh77(late);try{if(!S||!k77CaseOk())return o;
 const i=o.findIndex(x=>x&&x.t==='⚔ The war so far');const e={t:'⚔ '+k76H('The case: with him','The case: with them'),sub:S.done.k77act?'done today':'costs time · walk the list, the ops table, sleep in shifts',dis:!!late||!!S.done.k77act,fn:k77Case};
 if(i<0)o.push(e);else o.splice(i,0,e)}catch(e){}return o};

/* ===================================== LOCATION SCENES (kc73's pool; one a day, shared cap) ===================================== */
if(typeof l73==='function'){
 l73('l77_ronin',['ronin'],.6,()=>['after','act2'].includes(S.phase)&&typeof kdPost==='function'&&kdPost(),done=>say(k76M()?[
  ['','THE WAR has been wiped off the whiteboard on Ronin’s fridge. The red marker has stained, and you can still read both columns.'],
  [RN,'Sit. I ain’t askin’ what happened in that building. One question. He been right with you, in his house?'],
  K76MV('he’s been… exact','he’s been exact. about everything','He’s been exact. About everything.','He’s been exact. The dressing, the soup, the light. All of it, to the minute.'),
  [RN,'Exact. Yeah. That’s as soft as that fucker gets, kid. Don’t tell him I said.'],
  [RN,'He ever stops bein’ exact, I’m through his wall with the crowbar. Told him that too.']]:[
  ['','THE WAR has been wiped off the whiteboard on Ronin’s fridge. The red marker has stained, and both columns can still be read.'],
  [RN,'Sit, Vee. One question. You had ’em in a bed downstairs for a week, and your book says what it says. You think about it?'],
  K76V('Once. I was sick in the kitchen sink.'),
  [RN,'Good. That’s the right answer. You ever think about it twice, I’ll know, and I’m through your wall with the crowbar.'],
  K76V('I would expect nothing less of you.')],()=>{fr('r',1);done()}));
 l73('l77_stairs',['atrium'],.6,()=>S.phase==='after'&&typeof kdPost==='function'&&kdPost(),done=>say(k76M()?[
  ['','All four hounds are lying across the bottom of the infirmary stairs when you come up. They get out of your way one at a time.'],
  ['','The black hound smells your left hand for a long while, and then pushes its whole head up under it and stands there, holding it up for you.'],
  K76MV('(u were set on me once. remember that)','(you were set on me once. remember?)','(You were set on me once. Remember?)','(You were set on me once, you great idiot. I remember it even if you don’t.)')]:[
  ['','You come in from the foundation, and all four hounds are lying across the bottom of the infirmary stairs. They do not get up for you.'],
  ['','The old hound looks at you, and then at the door behind him, and stays where he is.'],
  K76V('(They have chosen a post. I did not give it to them.)')],()=>{done()}));
 l73('l77_crepe',['mall'],.6,()=>S.phase==='act2'&&k73Done('e2l_car'),done=>say([
  ['','The crêpe stand in the square has one left again.'],
  ['',k76M()?'He buys it and has it cut in two, and holds one half out to you at the full length of his arm, the way you would feed something through bars.':'You buy it and have it cut in two, and hold one half out to them at the full length of your arm.'],
  K76MV('is it poisoned','is it poisoned?','Is it poisoned?','Is it poisoned? It’s a fair question, between us.'),
  K76V('Mine is the poisoned half. Eat.'),
  ['',k76M()?'You eat it. He eats his. You watch each other chew, in case.':'They eat it. You eat yours. You watch each other chew, in case.']],()=>{apply({aff:1});done()}));
 l73('l77_safe',['studio'],.6,()=>['act2','act3'].includes(S.phase)&&!S.f.e2lEnd,done=>say(k76M()?[
  ['','Angel’s safe is open while she hunts for a lens. The envelope is on the top shelf, with a wax seal the size of a coin.'],
  [AN,'don’t. if you look at that i’ll know, and i’ll change what it says to something worse'],
  K76MV('what’s worse than one of us dead','what’s worse than one of us dead?','What’s worse than one of us dead?','What’s worse than one of us dead, Angel? Go on.'),
  [AN,'you’d be surprised what i’ll put money on, baby']]:[
  ['','Angel’s safe is open while she hunts for a lens. The envelope is on the top shelf, with a wax seal the size of a coin.'],
  [AN,'do not touch it, V. you’ve got a whole ledger. i’ve got one envelope, and mine’s been right more often'],
  K76V('I do not gamble.'),
  [AN,'you wrote a name in a book months ago and you haven’t collected. what do you call that']],()=>{fr('a',1);done()}));
 /* Angel's studio is not one of kc73's wrapped rooms */
 (function(){try{const R=ROOMS.studio;if(!R||(typeof K73ROOMS!=='undefined'&&K73ROOMS.includes('studio')))return;const o=R.enter;R.enter=function(){const r=o?o.apply(this,arguments):undefined;
  try{const e=l73Try('studio');if(e)l73Wait('studio',e,0)}catch(x){}return r}}catch(e){}})()}

/* ===================================== THREADS ===================================== */
if(typeof txDef==='function'){
 txDef('tx_e2l_lock',{with:'v',pov:'m',prio:2,when:()=>K77()&&S.phase==='after'&&k73Done('e2l_after'),nodes:{
  start:{in:()=>['The doctor says you may leave the house on Thursday.','Your trailer has a new lock. I fitted it myself. I have not kept a key.'],expire:3,
   opts:()=>[{t:'“u broke the old one in two pieces”',fx:()=>apply({aff:1}),reply:()=>['I did. This one would take me four minutes.','I timed it before I left.']},
    {t:'“why’d u fix my lock”',fx:()=>apply({aff:1}),reply:()=>['Because somebody got in.','It was not me, that time. I would like there to be no confusion again.']},
    {t:'“so u can still get in”',reply:()=>['Yes. In four minutes, and you would hear all four.','That is the purpose of a lock, between the two of us.']}]}}});
 txDef('tx_e2l_thu',{with:'m',pov:'v',prio:2,when:()=>K77()&&S.phase==='after'&&k73Done('e2l_after'),nodes:{
  start:{in:()=>['ur doctor says thursday','i’m taking the rifle'],expire:3,
   opts:()=>[{t:'“It is your rifle.”',reply:()=>['yeah','just checking u knew']},
    {t:'“Will you come back?”',fx:()=>apply({aff:1}),reply:()=>['…','my blood’s all over ur laundry room. feels rude not to','also i still have to kill u. so. yeah']},
    {t:'“There is a new lock on your trailer.”',fx:()=>apply({aff:1}),reply:()=>['u went in my trailer','…how long would it take u','four minutes. ok. i’ll hear u coming then']}]}}})}

/* ===================================== THE SERVER ===================================== */
const K77CHAT={after:[
  [['ro','book’s closed. don’t nobody ask me to open it'],['an','nobody asked'],['ro','i know. i’m tellin’ myself']],
  [['an','they said thank you to me today. THANK YOU. like i was a waiter'],['k9','They say it to me also.'],['an','that is not better, V']],
  [['ro','vee you still got that name in the book'],['k9','Yes.'],['ro','and you’re cookin’ them soup'],['k9','Yes.'],['ro','ok. just gettin’ it straight']]],
 act3:[
  [['an','wills. everybody. list (final) (3) is open'],['mi','who has a (2)'],['an','people who lived, babe']],
  [['ro','two nights. if either of you does the other on that boat i’m not carryin’ anybody back'],['k9','Understood.'],['mi','understood']]]};
const _chat77=chatLog;chatLog=function(){const L=_chat77();try{if(!S||!K77()||!k73Done('e2l_mark'))return L;const P=K77CHAT[S.phase];
 if(P&&(S.phase!=='after'||!(S.kd&&S.kd.med&&S.pov!=='v')))P[(S.day+S.slot)%P.length].forEach(x=>L.push(x))}catch(e){}return L};

/* ===================================== ENDINGS ===================================== */
const _xe77=extraEnding;extraEnding=function(){const L=_xe77();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,s=f.e2lSlept||{};
 if(f.e2lRifle==='aimed')L.push('V gave Misaki their rifle back with one round, and stood in front of it while they found out their hand could not hold it still.');
 else if(f.e2lRifle==='kept')L.push('Misaki still has the one round V gave back with the rifle. It has never been fired.');
 if(f.e2lFork)L.push('V said he would kill Misaki when they could hold a fork in both hands. They held one at dinner, and he could not name a date.');
 if((s.m||0)+(s.v||0)>=2)L.push('During the case Misaki slept '+(s.m||0)+' night'+((s.m||0)===1?'':'s')+' beside V, and V '+(s.v||0)+' beside Misaki, armed, with the pistol and the scalpel on the dash.');
 if(f.e2lFileFix)L.push('Misaki corrected V’s file on them: two dates, a street, and one job that was never theirs.');
 if(f.e2lWill==='hounds'||f.e2lWill==='bullet')L.push('V’s will leaves Misaki the hounds. Misaki’s leaves him a bullet.');
 else if(f.e2lWill)L.push('V’s will leaves Misaki their own page. Misaki’s leaves him nothing, on the grounds that he has everything.');
 if(f.e2lPage==='burned')L.push('The page with Misaki’s name on it was burned in V’s kitchen sink. He has it by heart.');
 else if(f.e2lPage==='kept')L.push('The page with Misaki’s name on it is in their go-bag. The last line on it is a date.');
 else if(f.e2lPage==='wrote')L.push('The last line on Misaki’s page is in Misaki’s handwriting. It says STILL COULD.')}catch(e){}return L};
/* ===KC77-END=== */
