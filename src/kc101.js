/* ===KC101-BEGIN=== */
/* ===================== THE WAR: WHAT IS LOST (kc101) =====================
   The author asked for more angst and sadness overall, especially in the infirmary and the hopeless stretch.
   Needs kc73, kc76–kc100.
   1. THE INFIRMARY. Fifteen scenes in kc85's player-opened pool (now 181). Grief, not fear: what goes on outside
      the room without them, what will not come back, and V watching the war, the one thing that the two of them
      had, go out of the room before the person does.
        Misaki, cell:   r_rent  r_will  r_laugh  r_four  r_nobody
        Misaki, clear:  r_looked  r_hand  r_dish  r_war
        V:              r_plot  r_phone  r_entry  r_old  r_soup  r_name
      While the room is a cell, Misaki still takes the tall one for K9 and does not warm to him (the standing rule).
      The sadness is theirs, and they keep it from him. Same text under both aftermath settings.
   2. MORNINGS (shared cap): four, after the infirmary and a year on: the cactus; Ronin and the book; the date;
      the receipt.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via M2 and they/them.
   Notes: docs/notes_kc101.md. Tested in tools/k86_test.js and tools/k101_test.js. */
const K101=()=>{try{return typeof K100==='function'&&K100()}catch(e){return false}};

/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
/* ===================================== MISAKI: THE ROOM IS A ROOM ===================================== */
/* ===================================== V ===================================== */
/* ===================================== MORNINGS ===================================== */
const K101MORN=[
 {id:'m101_cactus',when:()=>['after','act2'].includes(S.phase)&&k73Done('e2l_door'),run:done=>say(k76M()?[
   N('The cactus is on the sill in his spare room, where it has been since he fetched it from the trailer. This morning it has gone brown and soft at the base and folded over, like a man sitting down.'),
   N('The soil is wet. It has been wet for a fortnight. He has been watering it. Every day, you realise; a little, at the same hour, the way he does everything for anything in his care.'),
   M2('(u don’t water a cactus, u rich idiot. it’s the ONE THING. i told u. i nearly killed u for it)','(you don’t water a cactus, you rich idiot. it’s the one thing. i told you. i nearly killed you for it)'),
   N('You stand there holding the pot. He was trying. Of everything in the trailer he picked the one living thing, and he brought it here, and he tried to keep it alive for you, and he did it wrong, carefully, every day.'),
   N('You do not throw it away. It stays on the sill, dead, for a month. He never asks why, and he never waters it again, and every morning you see him stop at the door and look at it.')]:[
   N('The cactus that you brought from their trailer has died on the sill of the spare room. It has gone brown at the base and folded over.'),
   N('You watered it. You were told not to, and you watered it, a little, every day at eight, because it was the one thing of theirs that you had been able to bring into the house, and you could not stand by and do nothing for it as well.'),
   K76V('(I know a great deal about keeping animals alive, and I drowned it, with great care, a little each morning.)'),
   N('They do not throw it away. It stays on the sill for a month, dead, facing the room. You do not ask why, and you do not move it. Every time you pass the door you see it there, the one thing of theirs that you were given to keep.')],done)},
 {id:'m101_book',when:()=>['after','act2'].includes(S.phase)&&k73Done('e2l_door'),run:done=>say([
   N(k76M()?'Ronin is in the kitchen at seven with his book, the one with the rubber band, open on the island. He is not writing in it.':'Ronin is in your kitchen at seven with his book open on the island. He is not writing in it.'),
   [RN,'I had a page for the river. Odds on how long. On whether. I wrote it the first night, ’cause that’s what I do. I make a book on things.'],
   N('He turns the book round. There is a page in his big square hand: a date, and a column of figures, and then nothing, because on the second night he stopped.'),
   [RN,'Couldn’t do it. First time in my life I couldn’t set a price on somethin’. Just sat in the truck with the pen.'],
   N('He tears the page out. He does it slowly, along the spine, so it comes clean. He folds it, and folds it again, and puts it in the stove.'),
   [RN,'Don’t tell nobody. I got a reputation.'],
   N(k76M()?'He goes out. You sit with the book. Every page in it is the two of you. You had not known how many.':'He goes out. You turn the pages. Every one is the two of you, from April: who goes first, the car park, the eye. He has kept every one. He tore out only the one that he could not bear.')],done)},
 {id:'m101_date',when:()=>S.phase==='epilogue'&&!!S.f.e2lEnd,run:done=>say(S.f.e2lEnd==='lovers'?[
   N('It is a year since the river. Nobody says so. There is nothing in the kitchen to mark it, and that is on purpose.'),
   N(k76M()?'You wake at four, the hour you always wake now, and he is already awake beside you, on his back, looking at the ceiling.':'You wake at four. They are already awake beside you, on their side, facing the door, with their eyes open.'),
   K76MV('u too?','you too?','You too?','You too, then.'),
   K76V('Every year, I imagine.'),
   N('Neither of you gets up. You lie there until it is light, not touching, not talking, both of you somewhere else: one in a room, and one at a door. Then the hounds want feeding, and you get up, and it is an ordinary day.')]:[
   N('It is a year since the river. The terms say nothing about it.'),
   N(k76M()?'At four your phone lights on the table. One message, from him. There is nothing in it. It is empty. He has sent you nothing at all, on purpose, at the hour you always wake.':'At four you send them a message with nothing in it. You type nothing, and send it. You know they will be awake.'),
   N(k76M()?'You send nothing back. It is the only thing that has passed between you all year that was not about the terms.':'Nothing comes back. Then, at ten past, the same: an empty message, from their number. You sit with it until it is light.')],done)},
 {id:'m101_receipt',when:()=>['act2','act3'].includes(S.phase)&&k73Done('e2l_door'),run:done=>say(k76M()?[
   N('You find it in the pocket of the jeans you were wearing at the river, which somebody has washed and folded and put back in your drawer. The rent receipt. PAID. Your last one before.'),
   N('It has been through the wash. The ink has run. You can read the P and the D, and the date is a blue stain.'),
   N('You were going to frame it. You were proud of it, and would never have said so: on time, every month, since you were sixteen, without anybody’s help. It was the one thing about your life that you got right.'),
   M2('(it’s a piece of paper. it’s a piece of PAPER)','(it’s a piece of paper. it’s a piece of paper)'),
   N('You smooth it out on the island with the side of your hand, as if it could still be read. Then you put it in the back of the ledger, where he will find it, because you cannot think of anywhere else in the world that keeps things.')]:[
   N('There is a laundered rent receipt in the back of your ledger. It is unreadable. The ink has run in the wash. You can make out a P and a D.'),
   N('You know what it is. It was in the pocket of their jeans at the river, and you had the jeans washed, and you did not check the pockets. You check every pocket. You did not check those.'),
   K76V('(The only thing they had that said: on time, every month, without help. I put it through a machine.)'),
   N('They have put it in your book, the one place in the house that keeps things. You leave it there. You do not know what heading it goes under. You turn to it more often than to any other page.')],done)}];
/* lowest priority: the route's earlier mornings go first */
const k101Pending=()=>{try{const f=S.f;
 if(S.phase==='after'&&!S.seen.m82_wall&&k73Done('e2l_after'))return true;
 if(f.e2lEnd==='lovers'&&!S.seen.e2l_morn&&['act3','epilogue'].includes(S.phase))return true;
 if(['act2','act3'].includes(S.phase)&&typeof k78Open==='function'&&k78Open()&&(!S.seen.m78_ronin||(!S.seen.m78_angel&&k73Done('e2l_row'))))return true;
 return false}catch(e){return false}};
const _me101=morningEvent;morningEvent=function(done){try{if(S&&K101()&&!(S.kd&&S.kd.med)&&!k101Pending()&&S.f.e2lMornDay!==S.day&&S.f.e2lMorn101Day!==S.day&&typeof mbOk==='function'&&mbOk()){
  const e=K101MORN.find(x=>!S.seen[x.id]&&x.when());if(e){S.seen[e.id]=1;S.f.e2lMorn101Day=S.day;S.f.e2lMornDay=S.day;mbUse();save();go(cutBg('#0a0a0d'));return e.run(()=>_me101(done))}}}catch(e){}return _me101(done)};

/* ===================================== ENDINGS ===================================== */
const _xe101=extraEnding;extraEnding=function(){const L=_xe101();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const F=S.f.e2l85||{},m=S.pov!=='v';
 if(F.r_plot)L.push('There is a deed for a plot under a yew at the north wall of a churchyard, folded once, in V’s ledger. He has never torn it up.');
 if(F.r_entry)L.push('On one night in the infirmary V’s entry on Misaki’s page was “Nothing.” It is the only time the word appears in the book.');
 if(F.r_war)L.push('In the infirmary Misaki reached for the war and could not find it, and grieved for it like a house that had burned down.');
 if(S.seen.m101_cactus)L.push('V watered Misaki’s cactus every morning, to keep it alive for them. He drowned it.');
 if(S.seen.m101_book)L.push('Ronin burned one page of his book: the odds on the river. He could not set a price on it.');
 if(S.seen.m101_receipt)L.push('Misaki’s last rent receipt went through the wash. It is in the back of V’s ledger, unreadable.')}catch(e){}return L};
/* ===KC101-END=== */
