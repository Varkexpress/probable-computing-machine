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
k86('r_rent','m',null,'cell','The first of the month',[
 N('You know the date the way you have always known it: in your stomach, before you are awake. It is the first.'),
 N('Four hundred, to a man in a van. You are not there. You have never once not been there. Since you were sixteen you have been on that step with the envelope at nine in the morning, every first, with a fever, with a bullet graze, once with a broken foot in a carrier bag.'),
 M2('(he’ll give it a week. then the lock. then whatever’s inside goes in a skip)','(he’ll give it a week. then the lock. then whatever is inside goes in a skip)'),
 N('You go through what is inside. The rifle is not; they will have that. The biscuit tin, empty. The notebooks with FOR FUN at the top. Your one dress, that you cannot wear any more and kept anyway. The cactus.'),
 N('Nobody is going to water the cactus. That is the one that gets you. Everything else you could stand to lose, and you have lost most of it before. But it has been on that sill for six years and you have never once forgotten it, and it is going to sit there in the dark behind a padlock and go soft from the bottom up, and it will not understand why.'),
 M2('(it’s a CACTUS. u can’t cry about a cactus in front of him. wait till the light goes)','(it’s a cactus. you can’t cry about a cactus in front of him. wait until the light goes)'),
 N('The light does not go. He leaves it on. You turn your face to the wall instead, and do it there, without a sound, which is a thing you are very good at.')]);
k86('r_will','m',null,'cell','Make a will in your head',[
 N('Angel made everybody do one. “list (final) (2)”. You did yours on a napkin in four minutes and laughed about it.'),
 N('You go over it now, properly, lying still. The rifle to Angel. The truck and the chainsaw to Ronin. The star clips in the bin. That is the whole list. That was always the whole list.'),
 M2('(that’s it? that’s all u’ve got to give anybody? twenty-something years and it fits on a tray)','(that’s it? that’s all you have to give anybody? twenty-something years, and it fits on a tray)'),
 N('You try to add something. A thing you know, a thing you could tell them. The wind tables. How to sleep in a truck. The integral that comes out to exactly one, which you have never shown anybody because they would think it was stupid.'),
 N('None of it can be left. It is all in your head, and your head is in here.'),
 M2('(they’ll get a rifle and a truck. they won’t get the integral. nobody gets the integral)','(they’ll get a rifle and a truck. they won’t get the integral. nobody gets the integral)'),
 N('You do it in your head, the whole of it, start to finish, so that at least somebody has seen it done once.')]);
k86('r_laugh','m',null,'cell','A laugh through the floor',[
 N('Somebody laughs, somewhere above you. A big laugh, too loud, a man’s, the kind that sets dogs off. The hounds through the wall start up at once.'),
 N('It is Ronin’s. You would know it in a stadium. You have heard it across a bowling alley and down a phone and once through a car door while he was being shot at.'),
 M2('(it’s the bag. the bag does voices. it did his voice twice already. it’s the bag)','(it’s the bag. the bag does voices. it has done his voice twice already. it’s the bag)'),
 N('You know it is the bag. You have the rule. The bag gives you voices that come late and men who are two places at once. It does not give you anybody real.'),
 N('You lie and wait for it to do it again anyway. You would give the good hand. You wait with your whole body, the way you would wait on a roof for a mark to come back to the window.'),
 N('It does not come again. The hounds settle. You lie there and are ashamed of how much you wanted it, a fake laugh, from a bag, from a friend who is not looking for you, because why would he be.')]);
k86('r_four','m',null,'cell','Who would notice',[
 N('You count who would notice. It is a short sum. You do it on your fingers, the good hand, under the blanket.'),
 M2('(one: angel. she’d notice by the second day. two: ronin. third day, and he’d break something. three: the guy in the van. for the rent)','(one: angel. she would notice by the second day. two: ronin. the third day, and he’d break something. three: the man in the van. for the rent)'),
 N('Four is him. The one with the tray. He would notice, because he would have to rule you off. Every page in that book has a total. Yours would get one.'),
 M2('(four people. one of them for money and one of them for paperwork)','(four people. one of them for money, and one of them for paperwork)'),
 N('You had thought it would be more. You are not sure why. You never did anything that would make it more. You were careful, all the way through, that it would never be more, because more is more people who can be used against you.'),
 N('It worked. You did it right. You lie there with your four fingers up under the blanket. Doing it right feels like being nobody.')]);
k86('r_nobody','m',null,'cell','It does not occur to you',[
 N('In the films there is always a part where somebody comes. A door goes in, and there is a friend in it, out of breath.'),
 N('You notice, on about the fourth day, that you have not once imagined that. Not as a hope, not as a dream on the drip. It has not come up.'),
 M2('(why would it. who comes. nobody came at nine. nobody came at thirteen. u got out of all of those by urself)','(why would it? who comes? nobody came at nine. nobody came at thirteen. you got out of all of those by yourself)'),
 N('You go back and look for a time when somebody came for you. Anybody, for anything. A lift home. You find a teacher once, at eleven, who drove you to the regionals because you had no way there. She waited in the car park for three hours. You had forgotten her.'),
 N('That is the one. That is the whole list of people who came.'),
 M2('(so get out urself. like always. …with one hand. on a drip. ok)','(so get out yourself. as always. …with one hand. on a drip. ok)'),
 N('You lie there and do the plan again. It is a bad plan, and there is nobody else in it.')]);

/* ===================================== MISAKI: THE ROOM IS A ROOM ===================================== */
k86('r_looked','m',null,'clear','They were looking',[
 N('Angel tells you about the four days. She does not mean to. It comes out sideways while she does your nails.'),
 N('She went on air. She asked a city of strangers to look for you, on camera, with her face doing the thing that her face does not do. Ronin was two streets over on the second night, and did not know it, and has not slept properly since. V had the hounds out at the river for nine hours in the rain.'),
 M2('u went on AIR','you went on air?'),
 [AN,'i went on air. i cried on main, babe. i have never cried on main.'],
 N('You had worked out, in the room, that nobody would come. You were calm about it. It was the one thing in there that you were sure of.'),
 N('And they did. All of them, the whole time, at full tilt, while you were lying on a mattress being certain that they would not.'),
 M2('(that’s worse. why is that worse. it’s supposed to be better)','(that’s worse. why is that worse? it’s supposed to be better)'),
 N('You start to cry, and you are furious, and Angel holds your hand down flat on the table and finishes the nail, and says that you will smudge it.')]);
k86('r_hand','m',null,'clear','The fore-end',[
 N('You try the left hand on the rifle. Not to shoot. Only to hold the fore-end, as you have held it since you were fourteen.'),
 N('The fingers go round. They do not close. The barrel dips and wanders like a branch in wind, and does not come back, and you stand there in his range with your arm shaking and watch it fail to come back.'),
 M2('(it’ll come. weeks. physio. he said six weeks)','(it’ll come. weeks. physio. he said six weeks)'),
 N('You know what six weeks means. You have heard doctors say it to people. It means the doctor does not know.'),
 N('You put the rifle down. You do sums, because that is what you do. If you cannot shoot, you cannot work. If you cannot work, there is no rent. There was a school once that would have taught you to fly, if you had had a birth certificate. There was a man who said you would have made an architect. Everything you were going to be has already gone. The rifle was the thing that was left.'),
 M2('(so what am i. if not that. what’s left)','(so what am i, if not that? what’s left?)'),
 N('Nothing answers. The range is very quiet. You pick the rifle up again and hold it until the arm gives out, and then once more.')]);
k86('r_dish','m',null,'clear','The kidney dish',[
 N('There is a steel kidney dish on the counter, polished. You catch yourself in it while you are reaching for the water.'),
 N('It is a bad mirror. It bends everything. But it is good enough. The eye has gone yellow at the edges. There is a gap where the tooth was. The hair, cut short around the place that they shaved.'),
 N('You look. You were never vain; you could not afford it. But you knew your own face. You used it at work: the delivery face, the lost-tourist face, the face that gets you past a doorman.'),
 M2('(nobody’s getting past a doorman with that)','(nobody is getting past a doorman with that)'),
 N('Bruises go. The look in it does not, and you cannot get it out by arranging your mouth. Something in it has stopped expecting anything. You know the look. You have seen it on people from the other side of a scope, at the end.'),
 N('You turn the dish face down on the counter. In the morning it has been taken away, and nobody says by whom.')]);
k86('r_war','m',null,'clear','You cannot find the war',[
 N('He comes in with the tray. You know who he is now. K9, ur honour, moneybags. The man you swore to kill in front of everybody.'),
 N('You reach for it. The old thing, the heat. In April just the sight of his coat in a doorway would light you up for a day: the plan, the car park, the joke you would make over him.'),
 N('It is not there. You reach again. You find the facts, very tidy, like a file. You do not find the heat.'),
 M2('(come on. he’s RIGHT there. he fed people to dogs. u had a whole war)','(come on. he’s right there. he feeds people to dogs. you had a whole war)'),
 N('You had a whole war, and it was the best thing you ever had: something to get up for that was not rent, and somebody who took you seriously enough to want you dead.'),
 N('He sets the tray down and looks at you, and for a second you see him look for it too, in your face, the old thing, and not find it either.'),
 M2('…ur soup’s shit','…your soup’s shit'),
 N('It is a good line. It comes out thin. He says “So I am told,” as if it had landed, and goes out, and you lie there and grieve for a war like other people grieve for a house that burned down.')]);

/* ===================================== V ===================================== */
k86('r_plot','v',null,null,'The plot',[
 N('On the worst night the fever is past forty, and you sit with them until three, and at three you go up to the study and do what you always do when a thing frightens you. You make arrangements.'),
 N('There is a plot in the churchyard where Ronin lights his candles, at the north wall, under a yew. You buy it on the telephone from a man who was asleep. You pay for the stone. You do not choose words for the stone.'),
 K76V('(One is responsible for the disposal of what is in one’s care. I have done it for four of the eleven. I know the procedure.)'),
 N('In the morning the fever breaks. You have the deed in the ledger, folded once, between their page and the next.'),
 N('You do not tear it up. You have tried, twice, and your hands stop. It is the only plan that you have ever made for them that was not to kill them, and it was to bury them.')]);
k86('r_phone','v',null,null,'Their phone, at three',[
 N('Their phone is in the counter drawer, charged, because you charge it. At three in the morning you ring it from yours.'),
 N('It buzzes in the drawer, and then it goes to the greeting. You have heard it eleven times now. You know where the pause is.'),
 N('“hitmeuppp. leave it after the beep or don’t. whatever. if this is about the money i’m dead.”'),
 K76V('(It is the voice from before. Loud, and bored, and lying. There is nobody in the room downstairs who sounds like that now.)'),
 N('You do not leave a message. You never do. You ring it a twelfth time, to hear “whatever”, and then you put your phone face down on the desk and sit with your hand flat on it until it is light.')]);
k86('r_entry','v',null,null,'The entries get shorter',[
 N('You keep their page as you keep every page. Each night, an entry.'),
 N('On the first night it ran to half a sheet: what was broken, what was said, what they threw. On the fourth, three lines. On the sixth, “Ate. Did not speak.”'),
 N('Tonight you sit with the pen above the page for a quarter of an hour. There is nothing to put. They did not throw anything. They did not call you a name. They looked at the wall.'),
 K76V('(In April their page needed a second leaf. Every day, something: a window, a scope, a bullet stood on my desk. They were the most work that I have ever had.)'),
 N('You write the date. Under it you write: “Nothing.” It is the first time the word has appeared in the book, and it is in your own hand.')]);
k86('r_old','v',null,null,'The old hound',[
 N('The old hound lies across the infirmary door every night now. He is fourteen. He does not get up any more when you come down the passage. He thumps his tail once on the stone, and looks at you, and stays.'),
 N('You sit down beside him on the floor. The hip is bad. He is thinner than in the spring. You have had his films out; you know what they say. A year, perhaps. Less.'),
 K76V('(Nobody in this house is getting better. I am a man with a hospital in his cellar, and I have a dying hound on one side of the door and a person on the other who will not eat.)'),
 N('He puts his chin on your knee. Through the door you can hear them breathing, fourteen to the minute, asleep, for once.'),
 N('You stay until your legs have gone dead under you. It is the only time all day that you are with both of them at once, and neither of them knows that you are there.')]);
k86('r_soup','v',null,null,'The soup comes back',[
 N('The tray comes back full. It came back full at noon, and at six last night.'),
 N('You know the soup is bad. They have told you so, at volume, in two registers. You had begun to look forward to it. You made it badly on purpose on the Tuesday, to see what they would say.'),
 N('Tonight you made it properly. You followed a book. You cut the onion as you have watched them cut an onion. It is, as far as you are any judge, good soup.'),
 N('It comes back untouched, with the spoon laid straight beside it.'),
 K76V('(I should have preferred the insult. I should have preferred them to throw it at the wall.)'),
 N('You stand in the kitchen and eat it yourself, out of the bowl, standing, cold. It is good soup. Nobody tells you so.')]);
k86('r_name','v',null,null,'Nobody calls you anything',[
 N('In April they called you a great many things. “Ur honour.” “Moneybags.” “Hearse.” Once, unrepeatably, in the car, something that Ronin had to explain to you afterwards.'),
 N('In the room they call you nothing. You have been in and out of it forty times. They say “yes” and “no”, and those rarely. They have not called you a name in nine days.'),
 K76V('(I had not known that I was counting. I find that I have been waiting at the door for one, each time, as one waits for a step on the stair.)'),
 N('It was a war, and the names were the whole of the correspondence. Every one of them meant: I see you, I know what you are, I am still coming.'),
 N('You stand in the passage outside the door and say it to yourself, under your breath, in their voice, to hear it. “Ur honour.” It does not sound right in your mouth.')]);

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
