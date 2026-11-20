/* ===KC105-BEGIN=== */
/* ===================== THE WAR: WHAT THE DARK IS FOR (kc105) =====================
   A third kc105, at the author's direction; the two before it were withdrawn and reverted in git, and nothing from
   either is used here. Needs kc73, kc76–kc104.
   Fifteen scenes in kc85's player-opened pool (now 223), all during the delusion: Misaki believes that the tall one
   is K9, who holds them and means to kill them. They never warm to him; the anger seethes. Several are paired with
   V's side of the same night.
     Misaki, cell:  n_smell  n_hair  n_dream  n_clock  n_pray  n_total  n_good  n_fast  n_dark  n_moth
     V:             n_hairV  n_goodV  n_fastV  n_darkV  n_clockV
   Same text under both aftermath settings: nothing touches the hours, and the doctor does not appear.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via M2 and they/them.
   Notes: docs/notes_kc105.md. Tested in tools/k86_test.js and tools/k105_test.js. */
const K105=()=>{try{return typeof K104==='function'&&K104()}catch(e){return false}};

/* ===================================== MISAKI, CELL ===================================== */
k86('n_smell','m',null,'cell','You can smell yourself',[
 N('You can smell yourself. The river, still, in your hair. The van. Sweat from the fever, gone sour. Something under that which you will not name.'),
 N('You have been dirty before. You have lain in a ditch for a night on a job and come home and sat in the shower with your clothes on. That was work. This is in you.'),
 N('He comes in with the tray. You watch his face, because you know what a face does near a smell like this. It does nothing. He breathes in through his nose like a man in a garden.'),
 M2('(don’t be polite about it. don’t u DARE be polite about it)','(don’t be polite about it. don’t you dare be polite about it)'),
 N('It is worse than if he had flinched. If he flinched you would know that he could smell it too. This way you lie there alone with it, and a man who is too well brought up to notice that you stink, and you would like to put your thumbs in his eyes for his manners.')]);
k86('n_hair','m',null,'cell','Hair on the pillow',[
 N('There is hair on the pillow when you lift your head. Not a few strands. A soft dark clump, the size of a coin, from the back.'),
 M2('(what’s he doing. what’s he putting in the bag. what’s he DOING to me)','(what is he doing? what is he putting in the bag? what is he doing to me?)'),
 N('You put your good hand up and pull, very lightly, and more comes away between your fingers. You look at it for a long minute. You have had a lot of things taken. You had not thought of this one.'),
 N('You put the hair under the mattress, with the spoon. Every morning there is more. You keep all of it. You do not know why. It seems wrong to let him sweep up the pieces.'),
 N('By the fifth day you have a little nest of it under there. You lie on top of it at night like a hen on an egg. If he comes for the rest of you, he is not having that.')]);
k86('n_dream','m',null,'cell','You dream of the bowling alley',[
 N('You dream that it is Thursday at the bowling alley. Ronin has a straw up each nostril. Angel is filming him and saying “babe, babe, hold still”. The pizza is terrible, and you are eating your third slice.'),
 N('You are laughing so hard that your ribs hurt, and in the dream that is a good thing, because it is only laughing.'),
 N('You wake up still laughing. It goes out of your mouth halfway, like a match in a draught, and the ribs keep hurting, and it is the cell.'),
 M2('(no. go back. GO BACK. it was thursday. it was thursday and nobody had)','(no. go back. go back. it was thursday. it was thursday, and nobody had)'),
 N('You shut your eyes and try for it. You try the smell of the place, the noise of the pins, Ronin’s face. You get the noise of the pins for a second, very faint. Then the green light blinks, and you have the cell, and you have it for the rest of the night.'),
 N('It would have been easier to dream about the van. You know where you are with the van.')]);
k86('n_clock','m',null,'cell','What time is it',[
 N('You ask him the time. It is the first thing you have asked him.'),
 K76V('Twenty past four. In the afternoon.'),
 N('It cannot be. It was morning when he took the tray. You have only been lying here for an hour; you would swear it on anything.'),
 M2('(he’s lying. why would he lie about the time. …so u don’t know how long. so u can’t count)','(he’s lying. why would he lie about the time? …so that you don’t know how long. so that you can’t count)'),
 N('You stop asking. You keep your own time instead, in your head, by counting. Sixty seconds, a mark on the blanket with your thumbnail; sixty marks, an hour.'),
 N('Your time and his do not agree. They get further apart every day. By the end of the week you are certain that it is Tuesday, and he says that it is Saturday, and you lie there with your thumbnail on the blanket and hate him for stealing four days off you with a sentence.')]);
k86('n_pray','m',null,'cell','Three in the morning',[
 N('You do not pray. Ronin prays; he lights candles in a church at the end of his road and calls it insurance. You have always laughed at him.'),
 N('At three in the morning, in the cell, you try it. Not on your knees. Lying on your back with your eyes on the green light, the way you would talk to a client on the phone.'),
 M2('(ok. hi. if anyone’s taking contracts. i’ll be quick)','(ok. hi. if anybody is taking contracts. i’ll be quick)'),
 M2('(get me out. that’s the job. i don’t care how. i’ll pay whatever. i’ve got a truck and a rifle and a cactus. u can have the truck)','(get me out. that’s the job. i don’t care how. i’ll pay whatever it is. i have a truck and a rifle and a cactus. you can have the truck)'),
 N('Nothing answers. The light blinks. Through the wall a hound turns over in its sleep.'),
 M2('(no? ok. didn’t think so. nobody’s ever taken a job from me without a deposit)','(no? ok. i didn’t think so. nobody has ever taken a job from me without a deposit)'),
 N('You lie there with your face hot, because you tried, and because there was nobody there, and because you are never going to tell Ronin.')]);
k86('n_total','m',null,'cell','What he will write',[
 N('Every page in his book ends the same way. You have heard it from Ronin, who has heard it from him: a date, and a total. You do not know what the total is. You think it might be what the person was worth.'),
 N('You lie there and wonder what he will write on yours.'),
 M2('(one doorman. one driver. one guy on a tuesday. a landlord. a lot of rent. what’s that come to)','(one doorman. one driver. one man on a tuesday. a landlord. a lot of rent. what does that come to?)'),
 N('You add it up as he would, against you. It is a long column. Then you try adding up the other side, the things that were not charges, and you cannot think of a single thing he would write there. You had a cactus. You paid on time.'),
 N('You are going to be a page in a rich man’s book with a number at the bottom, and the number is going to be fair. He will not cheat on it. It will be small.')]);
k86('n_good','m',null,'cell','“Good”',[
 N('You finish the soup. All of it. You put the spoon down.'),
 K76V('Good.'),
 N('It is one word, said in passing, while he picks up the tray. He does not even look at you when he says it.'),
 N('It goes into you like a hook. One of them said that. Every time. When you ate, when you held still, when you did what you were told. “Good.” In that tone, as if to a dog that had sat.'),
 N('You are sick before he has got to the door. All of it, over the side of the bed, the whole bowl that you just finished.'),
 M2('(fine. take it back. there. not good. NOT good)','(fine. take it back. there. not good. not good)'),
 N('You lie there with your face over the edge, shaking, and you hear him stop in the doorway. He stands there a long time. Then he goes out without a word, and comes back with a bucket and a cloth, and does not say anything at all, then or ever again.')]);
k86('n_fast','m',null,'cell','Do not eat',[
 N('You stop eating. Not to die. To find out what he does.'),
 N('The tray comes, and you do not touch it, and he takes it away. Noon, the same. Six, the same. You lie there and wait for the hand on your jaw, the tube, the shouting. You have seen what happens when somebody stops eating.'),
 N('On the second day he brings the chair. He sits in it, at the foot of the bed, with the bowl on his knee, and waits. He does not touch you. He does not speak. He sits there for an hour with the soup going cold, and then he goes.'),
 M2('(he won’t make me. why won’t he make me. they always make u)','(he won’t make me. why won’t he make me? they always make you)'),
 N('Then you get it, and it is worse than the tube. He does not need to force you. He can wait. He can sit there with a bowl every day until you are too weak to lift your head, and then do whatever he likes, and you will have done it to yourself.'),
 N('On the third morning you eat. Every mouthful, looking at him. He watches every one go down.')]);
k86('n_dark','m',null,'cell','The light goes out',[
 N('The light goes out. Not the green one. All of it. The bulb, the pump’s little screen, the line under the door. Black.'),
 N('You know what the dark is for. In the other building the dark was when they came. The light went, and then the door, and you never saw a face.'),
 N('You cannot breathe. You are on your back with your hands over your face, and you cannot get air past the ribs, and the dark is pressing on your eyes like thumbs.'),
 M2('(one: it’s dark. two: it’s just dark. three: they’re coming. three. THREE)','(one: it’s dark. two: it’s only dark. three: they’re coming. three. three)'),
 N('A light comes. Small, yellow, moving. A candle, in the passage, and then in the doorway, and it stops there. It does not come in.'),
 N('It is him, holding it out in front of himself so that you can see his face, all of it, lit from below. He stands in the doorway and keeps the candle on his own face and does not move, for as long as it takes you to start breathing.'),
 M2('(he wants me to see him. why does he want me to see him. they never)','(he wants me to see him. why does he want me to see him? they never)'),
 N('When the power comes back he blows the candle out and goes. You lie there with your heart going and the bulb too bright, and the only face you have in your head from the whole night is his.')]);
k86('n_moth','m',null,'cell','A moth',[
 N('There is a moth in the room. It must have come in with the tray. Small, grey, the colour of the tile.'),
 N('It goes for the light. Up, bump, down, up, bump. You watch it for an hour. It is the only other thing in the room that did not choose to be here.'),
 M2('(go on. u can do it. there’s no way out but go on)','(go on. you can do it. there is no way out, but go on)'),
 N('It keeps at the light all night. Towards morning it is slower. Then it is on the floor by the drain, on its back, with its legs going, and then it is not.'),
 N('You lie and look at it until he comes in and the door moves the air and it blows a little way across the tile. He does not see it. He puts the tray down on top of where it was.'),
 N('You cry, then, over a moth, with your face to the wall so that he will not think it is for him.')]);

/* ===================================== V ===================================== */
k86('n_hairV','v',null,null,'Hair on the pillow',[
 N('Their hair is coming out. It is the fever, and the shock, and the weight they have lost; you have seen it in hounds brought in off chains. It grows back.'),
 N('They do not know that. You see them find it on the pillow, and put a hand up, and pull, and look at what comes away. You see their face go very still.'),
 K76V('(They think I am doing it. Of course they do. Everything that happens to them in that room, I am doing.)'),
 N('You could tell them. You could say “stress, it grows back” from the door, and they would hear a man in a coat explaining away what he was doing to them.'),
 N('Instead you change the pillowcase each morning, and find nothing on it, and the sheet, and find nothing. They are keeping it. You do not know where. You do not look. You let them have that.')]);
k86('n_goodV','v',null,null,'One word',[
 N('They finished the soup. You said “Good.” You did not think about it; it is what you say to the hounds when they eat, and you have said it to them every day for eleven years.'),
 N('They were sick before you reached the door. Everything, over the side of the bed. You turned, and saw them hanging over the edge, shaking, saying “not good, not good” under their breath.'),
 K76V('(It was theirs. One of the men by the river said it to them. I said it in his voice, without knowing that I had his voice.)'),
 N('You fetch the bucket and you clean it, and you say nothing.'),
 N('After that you stop saying the word. Not to them. To anybody. You stop saying it to the hounds, at their bowls, and they look up at you, puzzled, waiting for it, all four, every evening, and you stand there with the bucket and do not say it.')]);
k86('n_fastV','v',null,null,'The bowl on your knee',[
 N('They have stopped eating. Not because they are ill. You can see it: they are watching you, every time you take the tray away, to see what you do.'),
 N('You know what they expect. A hand on the jaw. A tube. You have the tube; it is in the drawer. You will not use it on somebody who is watching you with that face.'),
 N('So you bring the chair and sit at the foot of the bed with the bowl on your knee, and wait. You do not speak. You hold the bowl until the soup is cold, and take it away, and bring another.'),
 K76V('(Ronin says that I am being slow. He says that people die of this. He is right. I have done the arithmetic on how long they have, and I sit here anyway.)'),
 N('On the third morning they eat. Every mouthful, looking at you, like a person spitting in your face one spoonful at a time.'),
 N('You go up afterwards and sit on the back stair with your head in your hands for some while, because you did not know until it was over how far down you would have let it go before you used the tube.')]);
k86('n_darkV','v',null,null,'The power goes',[
 N('The power goes at one in the morning; the whole street is out. In the study you find the candles by feel and are halfway down the back stair before you have thought about why.'),
 N('From the passage you can hear them. Not crying. A sound you have heard in the kennel, from an animal brought in from a dark place: breath that will not go in, over and over.'),
 N('You know what the dark is to them now. You did not, until this moment.'),
 N('You stop in the doorway. You do not go in; a man coming in out of the dark is the thing itself. You hold the candle up, by your own face, so that they can see who it is and see that the hands are empty, and you stand there.'),
 K76V('(I would rather be seen. I would rather be anything that can be seen, than one more thing that comes in the dark.)'),
 N('It is twenty minutes before the power comes back. You stand still for all of it with the wax running down onto your fingers. In the morning you put a battery lamp on the counter, the kind that runs for three days, switched on, and you never mention the night.')]);
k86('n_clockV','v',null,null,'A clock on the wall',[
 N('They asked you the time. You told them. You saw them not believe it.'),
 N('Since then they have been keeping their own. You see the marks on the blanket, in rows, made with a thumbnail. Their count is wrong. It is four days behind by Saturday, and every day you tell them the day and watch them decide that you are lying.'),
 K76V('(It is the drip. It takes the hours out of them and they do not notice the gaps. They think I am the one taking them.)'),
 N('You put a clock on the wall, opposite the bed, where they can see it. A plain one, with a second hand, ticking. And a calendar beside it, with the days crossed off in your fountain pen.'),
 N('In the morning the calendar is face down on the floor. The clock is still there; they could not reach it. They lie and look at it with an expression you have seen on men looking at a gun pointed at them.'),
 N('You take it down. Anything you give them to count by is a thing you could have set wrong.')]);

/* ===================================== ENDINGS ===================================== */
const _xe105=extraEnding;extraEnding=function(){const L=_xe105();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const F=S.f.e2l85||{};
 if(F.n_goodV||F.n_good)L.push('V said “Good” once, in the infirmary, when Misaki finished their soup. He has not said the word since, not even to the hounds.');
 if(F.n_dark||F.n_darkV)L.push('On the night the power went, V stood in the infirmary doorway for twenty minutes holding a candle up by his own face.');
 if(F.n_fast||F.n_fastV)L.push('When Misaki stopped eating, V sat at the foot of the bed with the bowl on his knee for three days, and never used the tube.');
 if(F.n_pray)L.push('At three in the morning, in the infirmary, Misaki tried to hire God. Nobody took the contract.');
 if(F.n_moth)L.push('In the infirmary Misaki cried over a moth, with their face to the wall, so that V would not think it was for him.')}catch(e){}return L};
/* ===KC105-END=== */
