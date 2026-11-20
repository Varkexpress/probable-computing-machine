/* ===KC81-BEGIN=== */
/* ===================== THE WAR: UNDER HIS ROOF (kc81) =====================
   After the infirmary Misaki is in V's spare room until the corridor (kc78's row). kc77 gave Act II a case menu; this
   gives the convalescence its own daily menu and two beats. Needs kc73, kc76–kc80.
   The house menu (⚔ His house / ⚔ Your house: them; after the infirmary and through Act II, until the corridor; one
   action a day, costs time; counts in S.f.e2l81):
     the table · the kennel · the hand · the house at night      each: a first scene with a choice, then rotating scenes
     flags: e2lMeat cut|whole, e2lKennel2 in|gate, e2lHandT timed|alone, e2lNightW light|dark
   Beats (kc73's order, kc76's cards), chapter II:
     e2l_room    Misaki goes back down to the infirmary in daylight, on purpose        S.f.e2lRoom sat|sign   (free)
     e2l_thurs   Thursday: the doctor says they may go; the trailer, and the gate      S.f.e2lThurs stayed|gate
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc81.md. Test: node tools/k81_test.js */
const K81=()=>{try{return typeof K80==='function'&&K80()}catch(e){return false}};
const k81F=()=>{S.f.e2l81=S.f.e2l81||{};return S.f.e2l81};
const k81N=k=>k81F()[k]||0;
const k81Inc=k=>{const F=k81F();F[k]=(F[k]||0)+1;save();return F[k]};
const k81Var=(k,arr)=>arr[(k81N(k)-2)%arr.length];
const k81Ok=()=>{try{return K81()&&!S.f.e2lEnd&&!S.f.e2lRow&&k73Done('e2l_door')&&((S.phase==='after'&&typeof kdPost==='function'&&kdPost())||S.phase==='act2')}catch(e){return false}};

function k81House(){const m=k76M();const A=(id,t,sub,fn)=>({t,sub:(k81N(id)?'×'+k81N(id)+' · ':'')+sub,fn:()=>{spend();S.done.k81act=1;save();k77Go('#0b0a09');fn()}});
 ask(K73Who(),m?'(his house. u live in it now, apparently. today:)':'(They are in the spare room. Today:)',[
  A('table',k76H('Eat at his table','Cook for the table'),k76H('he cooks; you have one working hand','they have one working hand'),k81Table),
  A('kennel',k76H('Go out to his kennel','Find them in the kennel'),'four hounds',k81Kennel),
  A('hand','The hand: ten times, on the hour','open and close',k81Hand),
  A('night',k76H('Walk his house at night','The house at night'),k76H('count the doors','they are counting the doors'),k81Night),
  ...(typeof k83Study==='function'?[A('study','The study, in the evening','two armchairs',k83Study)]:[]),
  ...((typeof k82Ask==='function'&&k82Left())?[A('ask',k76H('Ask him one thing','Ask them one thing'),'you will get a straight answer',k82Ask)]:[]),
  {t:'Not today',fn:hub}])}

/* ---------- the table ---------- */
function k81Table(){const n=k81Inc('table'),m=k76M();
 if(n>1)return say(k81Var('table',[
  [['',m?'He eats standing at the counter, with the paper. You eat at the island. For twenty minutes the only sound is two people chewing who have each sworn to kill the other, and then he turns a page.':'You eat standing at the counter, with the paper. They eat at the island. For twenty minutes the only sound is two people chewing, and then you turn a page.'],
   K76MV('this is the worst restaurant i’ve ever been to','this is the worst restaurant i’ve ever been to','This is the worst restaurant I’ve ever been to.','This is the worst restaurant I have ever been to. The waiter wants me dead.'),K76V('The waiter is also the cook. I would not complain.')],
  [['',m?'There is a second place laid at the long table. It has been laid every night since you came upstairs: knife on the right, fork on the left. You have eaten every meal at the island with a spoon.':'You lay a second place at the long table, as you have every night since they came upstairs: knife on the right, fork on the left. They eat at the island with a spoon.'],
   m?K76MV('(he’s keeping count. that’s all this is. fork on the left)','(he’s keeping count. that’s all this is. the fork’s on the left)','(He’s keeping count. That’s all this is. The fork’s on the left.)','(He’s keeping count, that’s all this is, with the fork on the left where I can see it.)'):K76V('(I told them what the fork was for. I lay it out regardless. I do not know which of us I am doing it to.)')],
  [['',m?'He has made the thing with the peaches. You did not ask for it. You have never told him you like peaches. It is in his file; you would bet the truck on it.':'You have made the thing with the peaches. It is in the file that they like them: page twelve, a receipt from the corner store, three tins.'],
   K76MV('did u get this out of my FILE','did you get this out of my file','Did you get this out of my file?','Did you get this out of my file, V? Is there a page on what I eat?'),K76V('Page twelve.'),
   ['',m?'You eat it anyway, all of it, furious.':'They eat all of it, in a fury. You wash the dish yourself.']]]),hub);
 say([
  ['',m?'He cooks. You did not know that about him, and you would rather not have found out. It is a chop, with something green, on a warmed plate, set down in front of your right hand.':'You cook. It is a chop, with greens, on a warmed plate, and you set it down by their right hand.'],
  ['',m?'You cannot cut a chop with one hand. You look at it. He looks at you looking at it.':'They cannot cut a chop with one hand. They look at it. You had not thought of that, and you think of everything.'],
  K76MV('(don’t. don’t u dare. if he cuts up my food i’m going to bite him)','(don’t. don’t you dare. if he cuts up my food i am going to bite him)','(Don’t. Don’t you dare. If he cuts up my food I am going to bite him.)','(Don’t. Don’t dare. If that man cuts up my food for me I’m going to bite him.)')],
 ()=>ask(K73Who(),m?'(He has picked up a knife.)':'(The knife is by your hand.)',m?[
  {t:'Let him cut it',sub:'you are hungry',fn:()=>{S.f.e2lMeat='cut';save();say([
   ['','He cuts it in eleven pieces, all the same size, without looking at you, the way he would do it for one of the hounds. Then he puts the knife down on your side of the plate, handle towards you.'],
   K76MV('if u tell ronin i’ll end u','if you tell ronin about this i will end you','If you tell Ronin about this, I will end you.','If you tell Ronin about this, I’ll end you. I mean with the knife you just gave me.'),
   K76V('I gave it to you for that purpose. Eat.')],hub)}},
  {t:'Pick the chop up and eat it with your hand',sub:'like an animal, at his table',fn:()=>{S.f.e2lMeat='whole';save();say([
   ['','You pick it up by the bone and eat it with your teeth, looking at him over it. Grease runs down your wrist onto his tablecloth.'],
   K76V('That is linen.'),K76MV('bill me','bill me. put it in the book','Bill me. Put it in the book.','Bill me. Put it in the book with the rest.'),
   ['','He does not put it in the book. He puts a second chop on your plate.']],hub)}}]:[
  {t:'Cut it for them',sub:'they will hate it',fn:()=>{S.f.e2lMeat='cut';save();say([
   ['','You cut it in eleven pieces, all the same size, without looking at them. It is how you do it for the hounds, and you realise that halfway through, and finish regardless. You put the knife down on their side of the plate, handle towards them.'],
   K76MV('if u tell ronin i’ll end u','if you tell ronin about this i will end you','If you tell Ronin about this, I will end you.','If you tell Ronin about this, I’ll end you. I mean with the knife you just gave me.'),
   K76V('I gave it to you for that purpose. Eat.')],hub)}},
  {t:'Do nothing. See what they do',fn:()=>{S.f.e2lMeat='whole';save();say([
   ['','They pick it up by the bone and eat it with their teeth, looking at you over it. Grease runs down their wrist onto the cloth.'],
   K76V('That is linen.'),K76MV('bill me','bill me. put it in the book','Bill me. Put it in the book.','Bill me. Put it in the book with the rest.'),
   ['','You do not put it in the book. You put a second chop on their plate, and stand over the pan for a while with your back to them.']],hub)}}]))}

/* ---------- the kennel ---------- */
function k81Kennel(){const n=k81Inc('kennel'),m=k76M(),loose=!!S.f.e2lLoose;
 if(n>1)return say(k81Var('kennel',[
  [['',m?'The pale hound has a shaved patch on her flank, and a scar across it, sewn so finely that you have to look twice. You know that needlework. It is on your own hand.':'They are looking at the shaved patch on the pale hound’s flank, and the scar across it. Then they look at the stitching on their own hand, and then at you.'],
   K76MV('u do all of them urself','you do all of them yourself','You do all of them yourself.','You do all of them yourself. The hounds. And me.'),K76V('I do not trust anybody else with what is mine.'),
   m?K76MV('(mine. he means the hounds. he means the hounds)','(mine. he means the hounds. he definitely means the hounds)','(Mine. He means the hounds. He definitely means the hounds.)','(Mine. He means the hounds; he definitely means the hounds.)'):K76V('(I meant the hounds. I have gone over the sentence, and I meant the hounds.)')],
  [['',m?'You fall asleep in the straw, by accident, with the old hound along your back. When you wake there is a horse blanket over both of you, and the kennel door has been propped open with a brick, so that it cannot shut on you.':'They have fallen asleep in the straw with the old hound along their back. You put a horse blanket over both of them, and prop the kennel door open with a brick. It locks from the outside. They should not wake behind a door that does.'],
   m?K76MV('(he thought about the door. why did he think about the door)'):K76V('(I thought of the door. I am noting that I thought of it.)')],
  [['',m?'Feeding time. He comes down with the steel bucket, and you watch what he gives them, cubed and cold, and you know what it is, and the black hound eats it out of your hand.':'Feeding time. You bring the steel bucket down, and they watch what is in it, cubed and cold. They know what it is. They take a piece and hold it out to the black hound, flat on the palm.'],
   K76MV('who was it','who was this one','Who was this one?','Who was this one? Go on. You’ve got a name for all of them.'),K76V('A man who insured people’s houses and then set fire to them.'),
   K76MV('huh. i’d have done that one for free','huh. i would have done that one for free','Huh. I would have done that one for free.','Huh. I’d have done that one for free. Write that down.'),K76V('I have not got a column for it.')]]),hub);
 say([
  ['',m?'The kennel is warm, and it smells of straw and disinfectant and big animals. All four of them get up when you come in.'+(loose?' The last time you saw them come at you like that, you were on your back on concrete.':''):'They are in the kennel. You find them standing just inside the gate with all four hounds on their feet around them.'+(loose?' The last time those four went at them, it was on your word.':'')],
  ['',m?'They come up one at a time and smell the cast. The black hound gets its nose under your left hand and lifts it, carefully, as though it had found something broken in the grass.':'They go up one at a time and smell the cast. The black hound gets its nose under the left hand and lifts it, carefully, as it would with something broken that it had found in the grass.'],
  m?K76MV('(they know. how do they know)','(they know it’s hurt. how do they know)','(They know it’s hurt. How do they know?)','(They know that it’s hurt. How do they know?)'):K76V('(They know a hurt thing. Every one of them has been one, on my table.)')],
 ()=>ask(K73Who(),m?'(He is in the doorway, watching.)':'(They have not seen you yet.)',m?[
  {t:'Sit down in the straw with them',fn:()=>{S.f.e2lKennel2='in';save();say([
   ['','You sit down. The old hound lowers himself beside you a joint at a time and puts his chin on your knee, and the other three fold up around you, and you are in the middle of four animals that eat people.'],
   K76V('They will not let me in there when they are like that.'),K76MV('ur problem','sounds like a you problem','Sounds like a you problem.','That sounds like a you problem, V.'),
   ['','He stays in the doorway for an hour. You do not tell him to go.']],hub)}},
  {t:'Stay at the gate',fn:()=>{S.f.e2lKennel2='gate';save();say([
   ['','You stay at the gate, with your good hand on the latch. They lie down facing you, in a row, and wait. They are prepared to wait all day.'],
   K76V('They are not guarding you from leaving. They are guarding the gate from whatever is behind you.'),
   K76MV('ur behind me','you’re what’s behind me','You’re what’s behind me.','You’re what’s behind me, V.'),K76V('Yes. I had noticed that.')],hub)}}]:[
  {t:'Leave them to it',fn:()=>{S.f.e2lKennel2='in';save();say([
   ['','You stay in the doorway. They sit down in the straw, and the old hound lowers himself beside them a joint at a time, and the other three fold up around them. In eleven years those hounds have never let anybody else sit there.'],
   K76V('They will not let me in there when they are like that.'),K76MV('ur problem','sounds like a you problem','Sounds like a you problem.','That sounds like a you problem, V.'),
   ['','You stand in the doorway for an hour. They do not tell you to go.']],hub)}},
  {t:'Say something',fn:()=>{S.f.e2lKennel2='gate';save();say([
   ['','They turn round at once, with the good hand on the latch. The hounds lie down in a row, facing the gate, facing you.'],
   K76V('They are not guarding you from leaving. They are guarding the gate from whatever is behind you.'),
   K76MV('ur behind me','you’re what’s behind me','You’re what’s behind me.','You’re what’s behind me, V.'),K76V('Yes. I had noticed that.')],hub)}}]))}

/* ---------- the hand ---------- */
function k81Hand(){const n=k81Inc('hand'),m=k76M();
 if(n>1)return say(k81Var('hand',[
  [['',m?'Six times out of ten today. On the seventh the fingers stop halfway and shake, and you sit and watch your own hand fail, with him watching it too.':'Six times out of ten today. On the seventh the fingers stop halfway and shake. They sit and watch it. You have seen that look on men at the table, and you never once minded it there.'],
   K76MV('say something smug','go on. say something smug','Go on. Say something smug.','Go on. Say something smug. You’ve been saving it up.'),K76V('Six is two more than Tuesday.'),
   K76MV('that’s not smug that’s just counting','that’s not smug. that’s just counting','That’s not smug. That’s just counting.','That’s not smug, V. That’s just counting.'),K76V('I am better at counting.')],
  [['',m?'He has brought a tennis ball. You are to squeeze it. It has teeth marks in it.':'You bring them a tennis ball to squeeze. It has teeth marks in it; it is the grey hound’s.'],
   K76MV('is this the DOG’S','is this the hound’s ball','Is this the hound’s ball?','Is this the hound’s ball? You’ve given me a used ball.'),K76V('She has lent it. She expects it back.'),
   ['',m?'The grey hound sits and watches you squeeze her ball for a quarter of an hour, with her whole attention.':'The grey hound sits and watches them squeeze her ball for a quarter of an hour, with her whole attention. You have never seen her lend anything.']],
  [['',m?'Ten out of ten. You hold the hand up, open, all five fingers, and for one second you forget who you are showing it to.':'Ten out of ten. They hold the hand up to you, open, all five fingers, and for one second their whole face is in it.'],
   m?K76MV('(don’t smile at him. he said a fork. he said both hands. this is the thing he’s waiting for)','(don’t smile at him. he said a fork in both hands. this is the thing he’s waiting for)','(Don’t smile at him. He said a fork in both hands. This is the thing he is waiting for.)','(Don’t smile at him. He said a fork in both hands. This is the very thing he’s waiting for.)'):K76V('(I told them what I would do when that hand worked. I watched their face remember it. I would give a great deal to have said anything else in that kitchen.)'),
   ['',m?'You put the hand down under the blanket.':'They put the hand away under the blanket, where you cannot see it.']]]),hub);
 say([
  ['',m?'The sheet says: open and close, ten times, on the hour. The hand does it four times and then lies down.':'The sheet says: open and close, ten times, on the hour. Their hand does it four times and then lies still.'],
  ['',m?'He is in the doorway with his pocket watch out. He has been there for all four.':'You are in the doorway with your watch out. You have been there for all four.'],
  K76MV('are u TIMING me','are you timing me','Are you timing me?','Are you timing me? With an actual watch?'),
  K76V('The sheet says on the hour. Somebody must know when the hour is.')],
 ()=>ask(K73Who(),m?'(The watch is still open.)':'(They are glaring at the watch.)',m?[
  {t:'“fine. time me. count out loud”',fn:()=>{S.f.e2lHandT='timed';save();say([
   ['','He counts. He has a voice for it, level, with no praise in it and no pity, and the hand gets to six before it stops. It is easier with the numbers. You will not be telling him that.'],
   K76V('Six. The same hour tomorrow.'),K76MV('ur enjoying this','you’re enjoying this','You’re enjoying this.','You’re enjoying this. Don’t lie.'),
   K76V('No. I find that I am not, and I expected to.')],hub)}},
  {t:'“get out. i’ll do it myself”',fn:()=>{S.f.e2lHandT='alone';save();say([
   ['','He goes. You do it alone, four, and four again, and then you lose count, because there is nobody to keep it.'],
   ['','On the hour, every hour after that, the clock in the hall strikes. It has never struck before. Somebody has wound it.']],hub)}}]:[
  {t:'Count for them',fn:()=>{S.f.e2lHandT='timed';save();say([
   ['','You count. You keep the voice level, with no praise in it and no pity, because either would be an insult. The hand gets to six.'],
   K76V('Six. The same hour tomorrow.'),K76MV('ur enjoying this','you’re enjoying this','You’re enjoying this.','You’re enjoying this. Don’t lie.'),
   K76V('No. I find that I am not, and I expected to.')],hub)}},
  {t:'Leave them to it',fn:()=>{S.f.e2lHandT='alone';save();say([
   ['','You go. From the corridor you hear them lose count twice.'],
   ['','You wind the clock in the hall, which has not run in eleven years, and set it to strike. They need not know who is keeping the hour.']],hub)}}]))}

/* ---------- the house at night ---------- */
function k81Night(){const n=k81Inc('night'),m=k76M();
 if(n>1)return say(k81Var('night',[
  [['',m?'The cellar stair, the bottom door, steel, cold to the hand. You know what is behind it; he sent you forty minutes of it. You stand with your palm flat on it for a long while.':'The camera on the cellar stair shows them at the cold-room door, with one palm flat on the steel. They stand like that for a long while. They do not try the handle.'],
   m?K76MV('(he could’ve put me in there. he had a week. he put me in a bed and it said laundry on the door)','(he could have put me in there. he had a whole week. he put me in a bed)','(He could have put me in there. He had a whole week. He put me in a bed.)','(He could have put me in there. He had a whole week, and he put me in a bed.)'):K76V('(They are working out that I had a week and did not use it. I would give something to know what they conclude.)')],
  [['',m?'His study. The ledger is on the desk, shut, and not locked. He must know that you walk at night. You look at it for ten minutes and do not open it.':'In the morning the ledger is exactly where you left it on the desk, shut, and not locked. There is a mug ring beside it that is not yours. They stood here for some time and did not open it.'],
   m?K76MV('(if i read it i’ll know. i don’t want to know. since when do i not want to know)','(if i read it i’ll know. and i don’t want to know. since when do i not want to know)','(If I read it I’ll know. And I don’t want to know. Since when do I not want to know?)','(If I read it, I’ll know. And I don’t want to know. Since when do I not want to know?)'):K76V('(I left it unlocked on purpose. I do not know what I wanted them to find.)')],
  [['',m?'At four you meet him on the back stair. He is in his shirtsleeves with a cup of something. He stops four steps below you and stands to one side, against the wall, so that you can pass.':'At four you meet them on the back stair. You stop four steps below, and stand to one side, against the wall, so that they have the whole width to pass.'],
   K76MV('can’t sleep?','can’t sleep either?','Can’t sleep either?','Can’t sleep either? Guilty conscience?'),K76V('Three and a half hours. I have had them.'),
   ['',m?'You go past him. He does not turn his head to watch you go. You notice that, and you notice yourself noticing.':'They go past. You keep your eyes on the wall until they are down. It costs more than it should.']]]),hub);
 say([
  ['',m?'You cannot sleep in a house you have not counted. At two you get up and walk it: every door, every stair, every window that opens.':'On the cameras, at two, they get up and walk the house: every door, every stair, every window that opens. They are counting. They did it in the first week, from outside, to kill you.'],
  ['',m?'Three ways out of the east wing. Two off the kitchen. The back stair groans on the left. You knew all of it from the ivy; it is different from inside, barefoot, with a cast.':'Three ways out of the east wing. Two off the kitchen. They step over the left side of the back stair, where it groans. They remembered that.'],
  ['',m?'Every door you come to is already unlocked. Every one. In the hall the lamps are lit, low, all the way to the side door, and the side door has the key standing in it.':'You went round at midnight and unlocked every door in the house, and lit the hall lamps, low, as far as the side door. You left the key standing in it.']],
 ()=>ask(K73Who(),m?'(The key is in the side door. On your side.)':'(They have reached the side door.)',m?[
  {t:'Leave the key where it is',fn:()=>{S.f.e2lNightW='light';save();say([
   ['','You leave it. You go back up by the lamps, and for the first time since the river you sleep until it is light.'],
   K76MV('(he wants me to know i can leave. so he can say i stayed. it’s a trick. it’s a really good trick)','(he wants me to know i can leave, so he can say i chose to stay. it’s a trick. it’s a good trick)','(He wants me to know I can leave, so he can say I chose to stay. It’s a trick. It’s a good trick.)','(He wants me to know that I can leave, so that he can say I chose to stay. It’s a trick, and it’s a good one.)')],hub)}},
  {t:'Take the key up to bed with you',fn:()=>{S.f.e2lNightW='dark';save();say([
   ['','You take it. You sleep with it in your good fist. In the morning nobody mentions the side door, and there is a second key standing in it, exactly where the first one was.'],
   K76MV('(how many keys has he GOT)')],hub)}}]:[
  {t:'Stay away from the cameras tonight',fn:()=>{S.f.e2lNightW='light';save();say([
   ['','You turn the screen off and go to bed. In the morning the key is still in the side door, and the lamps have burned down, and they are asleep in the spare room with the door open a hand’s width.'],
   K76V('(They think it is a trick. I would think so. I do not know how to leave a door open so that it is not one.)')],hub)}},
  {t:'Watch what they do with the key',fn:()=>{S.f.e2lNightW='dark';save();say([
   ['','They take it out of the lock, look at it, and carry it upstairs in the good fist. You go down and put the spare in its place.'],
   K76V('(There are nine. They may have all of them.)')],hub)}}]))}
const _sh81=sideHub;sideHub=function(late){const o=_sh81(late);try{if(!S||!k81Ok())return o;
 const i=o.findIndex(x=>x&&x.t==='⚔ The war so far');const e={t:'⚔ '+k76H('His house','Your house: them'),sub:S.done.k81act?'done today':'costs time · the table, the kennel, the hand, the house at night',dis:!!late||!!S.done.k81act,fn:k81House};
 if(i<0)o.push(e);else o.splice(i,0,e)}catch(e){}return o};

/* ===================================== II · BACK DOWN THE STAIRS ===================================== */
function k81Room(){k77Go('#10100e');k73Mark('e2l_room',1);const m=k76M(),f=S.f;
 const L=m?[
  ['','In the afternoon, with the house empty, you go back down to it on purpose.'],
  ['','The kennel corridor. The door. There is a poster on it now, in his writing, in capitals: THIS IS THE INFIRMARY. YOU ARE IN V’S HOUSE. THE DOOR OPENS FROM BOTH SIDES. Under it the old sign still says LAUNDRY.'],
  ['','Inside it is a small white room with a bed, a drip stand and a smoke detector. It is about the size of your trailer. You thought it was the other building for two days, and you can see each thing you built that out of: the drain, the one light, the tray slot that is only a shelf.'],
  K76MV('(one: it’s a room. two: it’s just a room. three: i was so fucking polite in here)','(one: it’s a room. two: it’s just a room. three: i was so fucking polite in here)','(One: it’s a room. Two: it’s just a room. Three: I was so fucking polite in here.)','(One: it’s a room. Two: it’s only a room. Three: I was so fucking polite in here.)'),
  ['','When you turn round, he is in the corridor, four steps back from the door, with a bag of the hounds’ feed on his shoulder. He has stopped dead.']]:[
  ['','You come in by the kennel corridor with a bag of feed on your shoulder, and the door marked LAUNDRY is open.'],
  ['','They are inside, standing in the middle of the floor in a T-shirt, looking at the room: the drain, the one light, the shelf by the door that they took for a slot. They are going over it the way they go over a roof.'],
  K76V('(They have come back down to it by themselves. I would not have. I have not been through that door since I carried them out of it.)'),
  ['','They turn round and see you. You are four steps back from the door, and you cannot make yourself go any nearer.']];
 const sat=()=>{f.e2lRoom='sat';apply({aff:2});save();say([
   ['',m?'You sit down on the bed. It takes some doing. You pat the blanket beside you, once, like calling a hound, to see what he will do.':'They sit down on the bed. It plainly costs them. Then they pat the blanket beside them, once, as one calls a hound.'],
   K76V('No. I will not come into that room while you are in it. I have been in it enough.'),
   K76MV('scared?','what, are u scared of it','What, are you scared of it?','What, are you scared of a laundry room, V?'),
   K76V('Of what I was in it. Yes.'),
   ['',m?'He puts the feed down in the corridor and sits on the bag, outside the door, where you can see his shoes. You stay on the bed until your heart has stopped being stupid. It takes forty minutes. His shoes do not move.':'You put the feed down in the corridor and sit on the bag, outside the door, where they can see your shoes. They stay on the bed for forty minutes. You do not move your feet.']],hub)};
 const sign=()=>{f.e2lRoom='sign';apply({aff:2});save();say([
   ['',m?'You come out, reach up with the good hand, and tear the old LAUNDRY sign off the door. It comes away with four screws and some paint.':'They come out, reach up with the good hand, and tear the old LAUNDRY sign off the door. It comes away with four screws and some paint.'],
   K76MV('nobody opens a laundry, huh','“nobody opens a laundry.” that’s what u said','“Nobody opens a laundry.” That’s what you said.','“Nobody opens a laundry.” That’s what you told me. I opened it, V. From the inside.'),
   K76V('You did.'),
   ['',m?'You hold the sign out to him. He takes it, and looks at it, and you watch him work out that there is nowhere in his house he can bear to put it. He carries it out to the furnace himself.':'They hold the sign out to you. You take it. There is nowhere in this house that you can bear to put it. You carry it out to the furnace yourself.']],hub)};
 say(L,()=>ask(K73Who(),m?'(He hasn’t come any closer.)':'(Four steps. You cannot do the fifth.)',m?[
  {t:'Sit down on the bed',sub:'on purpose',fn:sat},{t:'Tear the LAUNDRY sign off the door',fn:sign}]:[
  {t:'Stay in the corridor',fn:sat},{t:'Tell them the sign can come down',fn:sign}]))}

/* ===================================== II · THURSDAY ===================================== */
function k81Thurs(){k77Go('#0b0c0e');k73Mark('e2l_thurs',1);const m=k76M(),f=S.f;
 const L=m?[
  ['','Thursday. '+((typeof kdSA==='function'&&!kdSA())?'He says the ribs will do, and that you can go.':'The doctor says you can go.')+' Ronin brings your truck round to the gate, and you drive it to the lot yourself, one-handed, in second gear the whole way.'],
  ['','The trailer has a new lock. Inside it is exactly as you left it, except that somebody has washed the bowl and watered the cactus.'],
  ['','You lie down on your own bed in your own trailer with the pistol under the pillow. It is what you have wanted for a fortnight. It takes you about an hour to understand that you are listening for four hounds and a clock in a hall.'],
  K76MV('(no. absolutely not. i live HERE. i’ve got a cactus)','(no. absolutely not. i live here. i have a cactus)','(No. Absolutely not. I live here. I have a cactus.)','(No. Absolutely not. I live here; I have a cactus and a lock that takes him four minutes.)')]:[
  ['','Thursday. '+((typeof kdSA==='function'&&!kdSA())?'The ribs will do, and you have told them that they may go.':'The doctor says that they may go.')+' Ronin brings their truck round to the gate, and they drive it out themselves, one-handed, in second gear, without looking back at the house.'],
  ['','You strip the bed in the spare room yourself. You have staff for that.'],
  ['','At nine you eat at the long table, at your own place, opposite one that is laid and empty. The hounds will not settle. The black hound goes to the side door every quarter of an hour and stands at it.'],
  K76V('(The house is as it was a month ago. I kept it like this for eleven years, and I found no fault with it.)')];
 const stayed=()=>{f.e2lThurs='stayed';save();say(m?[
   ['','You stay. You lie on your right side and count the bolts, and at about three you fall asleep, and you do not dream of the other building. You dream of a hall clock striking, in a house you have sworn to burn down.'],
   K76V('(text, at six) The spare room is as you left it. That is information, and not an invitation.'),
   K76MV('(text) didn’t ask','(text) didn’t ask, ur honour'),
   K76MV('(i’m back there by sunday. i tell everyone it’s for the case)','(i’m back there by sunday. i tell everybody it’s for the case)','(I’m back there by Sunday. I tell everybody it’s for the case.)','(I’m back there by Sunday. I tell everybody that it’s for the case.)')]:[
   ['','You do not go to the gate. You go to bed at the usual time and lie awake for three and a half hours, which is the whole of your allowance.'],
   K76V('(text, at six) The spare room is as you left it. That is information, and not an invitation.'),
   K76MV('(text) didn’t ask','(text) didn’t ask, ur honour'),
   ['','On Sunday their truck is at the gate. They say that it is for the case. You say that naturally it is, and you carry the bag up yourself.']],hub)};
 const gate=()=>{f.e2lThurs='gate';apply({aff:2});save();say(m?[
   ['','At one in the morning you get in the truck and drive back, and park outside his gate with the lights off, and get the blanket out from behind the seat. Ronin did this once, to stop a killing. You do not look at why you are doing it.'],
   ['','At about two the side door opens. He does not come out. The black hound does; it walks down the drive, gets its front paws up on your running board, and looks in at you through the glass.'],
   K76MV('go home','go home. go on','Go home. Go on.','Go home. Go on. I’m not here.'),
   ['','It lies down under the truck. In the morning there is a flask on the bonnet, and Ronin has texted you a single photograph of yourself asleep in the cab with your mouth open.']]:[
   ['','At one in the morning the gate camera shows a truck with its lights off. They are in the cab with a blanket round them. Ronin slept out there once, to stop you killing them. You do not know what they are there to stop.'],
   ['','You open the side door and stand in it. You do not go down the drive. The black hound goes for you; it walks down, gets its front paws on their running board, and then lies down under the truck.'],
   K76V('(I will not go out to them. If I go out, it is a thing that I have done, and they will have to answer it.)'),
   ['','At five you leave a flask on the bonnet. Ronin, who has apparently been watching the same camera, sends the server a photograph. You delete it from the server and keep the copy.']],hub)};
 say(L,()=>ask(K73Who(),m?'(It is very quiet in here.)':'(The side door is unlocked. It has been all evening.)',m?[
  {t:'Stay in the trailer',sub:'you live here',fn:stayed},{t:'Drive back, and sleep in the truck at his gate',sub:'do not ask yourself why',fn:gate}]:[
  {t:'Go to bed',fn:stayed},{t:'Look at the gate camera',fn:gate}]))}

(function(){try{if(typeof K73B==='undefined'||typeof k76Card!=='function')return;const at=id=>K73B.findIndex(b=>b.id===id);
 const add=(before,b)=>{const r=b.run;b.run=function(){return k76Card(b.id,()=>r())};const i=at(before);K73B.splice(i<0?K73B.length:i,0,b)};
 const late=()=>['after','act2'].includes(S.phase);
 add('e2l_rifle',{id:'e2l_room',t:()=>k76H('Go back down to the room, in daylight','The door marked LAUNDRY is open'),sub:()=>'costs time · on purpose',when:()=>late()&&k73Done('e2l_after')&&k73Fresh(),run:k81Room});
 add('e2l_car',{id:'e2l_thurs',t:()=>'Thursday: they can go home',sub:()=>'costs time · the truck, the trailer',when:()=>late()&&k73Done('e2l_rifle')&&(k73Done('e2l_fork')||S.f.e2lAfter!=='war')&&k73Fresh(),run:k81Thurs})}catch(e){}})();

/* ===================================== ENDINGS ===================================== */
const _xe81=extraEnding;extraEnding=function(){const L=_xe81();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f;
 if(f.e2lRoom==='sign')L.push('The LAUNDRY sign is gone from the infirmary door. Misaki tore it off, and V burned it.');
 else if(f.e2lRoom==='sat')L.push('Misaki went back down to the infirmary once, on purpose, and sat on the bed. V sat outside the door for forty minutes and would not come in.');
 if(f.e2lThurs==='gate')L.push('The first night Misaki was allowed home, they drove back and slept in the truck outside V’s gate. The black hound slept under it.');
 if(f.e2lNightW)L.push('There are nine keys to V’s side door. One has stood in the lock, on the inside, since the week Misaki came upstairs.');
 if(f.e2lHandT==='alone')L.push('The clock in V’s hall had not run for eleven years. It strikes the hour now.')}catch(e){}return L};
/* ===KC81-END=== */
