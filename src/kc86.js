/* ===KC86-BEGIN=== */
/* ===================== THE WAR: THE ROOM, EITHER SETTING (kc86) =====================
   Twenty more infirmary scenes for the enemies-to-lovers route that read the same under both aftermath settings
   (nothing here touches the hours, and the doctor does not appear). They join kc85's player-opened pool (K85S):
   ⚔ The room / ⚔ Outside the room, while kdMed(). kc86 also raises the pool's limit to three a slot and shows six
   at a time, since the pool is now large. Needs kc73, kc76–kc85.
     Misaki, cell (the tall one is a captor):  g_north g_spoon g_shoe g_number g_handle g_voice g_eye
     Misaki, clear:                            g_sign g_ronin g_nails g_book g_grandpa
     V:   g_kneel g_soles g_hale g_meat g_shoeV g_aloud g_shotgun g_asked
   (kc90's pass cut eight filler scenes from this module and made the cell scenes warier.)
   Helpers used by kc87 and kc88 as well: k86 (register a scene), N (narration), M2 (Misaki, text-speak / fuller),
   Ms (the same, with what the hands do when the voice is gone).
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc86_88.md. Tested in tools/k86_test.js. */
const K86=()=>{try{return typeof K85==='function'&&K85()}catch(e){return false}};
const N=t=>['',t];
const M2=(a,b)=>K76MV(a,a,b,b);
const Ms=(a,b,alt)=>k80Gone()?N(alt):M2(a,b);
const k86=(id,pov,mode,st,t,L,opt)=>{if(typeof K85S==='undefined')return;K85S.push({id,pov,mode,st,t,run:cb=>{const lines=(typeof L==='function'?L():L).filter(Boolean);opt?say(lines,()=>opt(cb)):say(lines,cb)}})};
/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
k86('g_north','m',null,'cell','Work out which way is north',[
 N('There is no window. You work out north anyway. You have never taken a job without knowing which way you would run.'),
 N('The pipe along the ceiling is warm at one end and cold at the other, so the boiler is that way. The drain slopes to the door. The tall one’s shoes are wet on some days, and only on the left side, which gives you the wind.'),
 M2('(north’s the corner with the drip stand. 60/40. the truck’s north. the rifle’s north)','(north is the corner with the drip stand. 60/40. the truck is north. the rifle is north)'),
 N('It takes you most of a morning. When he comes in with the tray, you are facing north and grinning at a wall, and he stops.'),
 M2('(yeah. look worried, ur honour. i know where i am now)','(yeah. look worried, your honour. i know where i am now)')]);
k86('g_spoon','m',null,'cell','There is a spoon on the tray',[
 N('The spoon on the tray is metal. In the other building they were plastic, and counted.'),
 M2('(metal. he’s left me METAL. either he’s stupid or he’s showing off, and he isn’t stupid)','(metal. he has left me metal. either he’s stupid or he’s showing off, and he isn’t stupid)'),
 N('You put it down the side of the mattress and wait for him to count the tray. He does not count the tray. The next one comes with a spoon, and a fork, and a knife with a proper edge on it.'),
 M2('(a KNIFE. that’s not a mistake. that’s an insult. he’s telling me he’s not scared of me with a knife)','(a knife. that isn’t a mistake. that’s an insult. he’s telling me that he isn’t scared of me with a knife)'),
 N('You have done a man with less. It was a teaspoon, and he was smaller, but the principle holds.'),
 N('You eat with the knife and fork, very correctly, looking at his throat the whole time, and you put all three back on the tray in a row. You keep the first spoon. At night you work the handle against the bed frame, a hundred strokes a side, counting.'),
 M2('(rich guys. they always think the help can’t hurt them)','(rich guys. they always think that the help can’t hurt them)')]);
k86('g_shoe','m',null,'cell','Your shoe',[
 N('One of your shoes is on the floor by the bed. The left one. Somebody has cleaned it; the lace has been washed.'),
 N('You do not know where the right one is. You think about that for a while. A person with one shoe is not going anywhere, and whoever put it there knows it.'),
 M2('(one shoe. so i know i’m not walking out. got it)','(one shoe. so that i know i’m not walking out. got it)'),
 N('That evening the tall one comes in with a shoe box. There is a pair in it, new, your size, the same make. He puts the box under the bed, next to the single shoe, and says nothing about either.'),
 Ms('(…so now i’ve got three. what’s three shoes mean)','(…so now i’ve got three. what do three shoes mean?)','You look at the box until he has gone. You do not touch it.')]);
k86('g_number','m',null,'cell','He says your name',[
 N('He has not called you anything. Then, on the second day, he says your name.'),
 N('Nobody in the other building had it. You were “it” to one of them and “sweetheart” to another, and you kept the name back the whole time, behind your teeth.'),
 N('He has it. Of course he has it. He has had it since April; he read your rent out in the server, and your hours, as if they were charges. There is a file with a page on what you eat.'),
 M2('(he says it like he’s reading it off a sheet. like the next word’s “wanton”)','(he says it as if he’s reading it off a sheet. as if the next word is “wanton”)'),
 M2('(don’t answer. u answer to it and ur in the dock)','(don’t answer. if you answer to it, you’re in the dock)'),
 N('You look at his hands and say nothing. He says it again, lower. You think of four things to call him, and all of them are good, and you swallow every one.'),
 N('He does not try a third time. Your name stays in the room for the rest of the day, like something he has put down on the counter and means to pick up when he is ready.')]);
k86('g_handle','m',null,'cell','The door handle',[
 N('You watch the door. When the tall one goes out, he pulls it shut, and there is no second sound after the latch. No bolt. No key.'),
 M2('(so it’s open. he’s left it OPEN)','(so it’s open. he has left it open)'),
 N('You are not stupid. Nobody leaves a door open on somebody they have sworn to kill. So you go through what an open door is for.'),
 M2('(one: there’s a guy outside. two: it’s the dogs. three: it’s the dogs)','(one: there’s a guy outside. two: it’s the dogs. three: it’s the dogs)'),
 N('You have met his dogs. He put all four of them on you in a yard, in the first week, and you still do not know why they stopped. You can hear them some nights through the wall, eating.'),
 N('That is the play. He leaves it open. You try it, because you are you and he knows you are. And then it is not him who does it at all; it is four animals in a brick passage, and he can tell his book that you ran.'),
 M2('(nice. that’s actually really nice. i’d have thought of that)','(nice. that’s actually really nice. i would have thought of that)'),
 N('You lie on your right side and look at the handle for an hour. It is an ordinary brushed steel handle. You are not going to give him the satisfaction, and you want to try it so badly that your teeth hurt.')]);
k86('g_voice','m',null,'cell','Get your story straight',[
 N('He has not asked you anything yet. He will. You have sat across from enough people to know that the questions come once you have had time to get frightened of them.'),
 N('So you get it straight, as you would for a policeman. You practise it when the room is empty.'),
 Ms('never heard of him. i was at the laundromat. i do deliveries','Never heard of him. I was at the laundromat. I do deliveries.','You run it in your head, since the voice is gone: never heard of him; the laundromat; deliveries. You practise the face that goes with it.'),
 N('The doorman: you were across town. The driver: what driver. The man on his step: you do not work Tuesdays. It is a good story. It got you past an inspector twice.'),
 M2('(he’s got a FILE, dumbass. he’s got the cartridge case. what’s “i do deliveries” gonna do)','(he’s got a file, dumbass. he’s got the cartridge case. what is “i do deliveries” going to do?)'),
 N('Whether he believes it does not matter. You need something to say that is not the truth. He wants you to stand there and agree with him; that is the whole of his hobby. You would sooner go out lying.'),
 N('Through the wall, something heavy is set down, hard, on stone. Then nothing. You run the story again, from the top.')]);
k86('g_eye','m',null,'cell','The green light on the ceiling',[
 N('There is a white disc on the ceiling with a green light in it. It blinks every nine seconds.'),
 N('It is a camera. Of course it is. He put one in the smoke alarm in your trailer, in April, in the middle of a truce, and Ronin had to dig it out with a fork.'),
 M2('(u perv. u absolute creep. u’ve got more money than god and THIS is what u watch)','(you perv. you absolute creep. you have more money than god, and this is what you watch)'),
 N('So everything you do in this bed, you do for him. You perform sleeping: slow breath, slack mouth, the hand open. You do it for six hours with your eyes shut, wide awake, counting blinks through your eyelids. Every hundred or so, you give the ceiling the finger, in case he is getting bored.'),
 M2('(2,400. he’s watched me not sleep 2,400 times. enjoy the show, moneybags)','(2,400. he has watched me not sleep 2,400 times. enjoy the show, moneybags)'),
 N('It is a smoke detector. You will find that out on the third day. It is the one time that it was only a smoke detector, and you will want those six hours back.')]);
/* ===================================== MISAKI: CLEAR ===================================== */
k86('g_sign','m',null,'clear','The sign on the door',[
 N('You can read the door from the bed now, backwards, through the glass panel. YRDNUAL.'),
 M2('he put me in the LAUNDRY. i thought i was getting murdered and i was in the LAUNDRY','he put me in the laundry. i thought i was being murdered, and i was in the laundry'),
 N('You say it to the ceiling. Then you say it again, because it is the first sentence in a week that has come out in your own voice, and you want to hear what that sounds like.'),
 M2('ur honour. hey. UR HONOUR. ur sign’s stupid','your honour! hey, your honour! your sign’s stupid!'),
 N('Nobody answers. Somewhere a long way up the house a door closes, carefully. You are grinning, and it hurts your face, as if the muscles had been put away for the season.')]);
k86('g_ronin','m',null,'clear','Ronin, with a chair',[
 N('Ronin comes in with a kitchen chair and puts it down backwards and sits on it. He has brought the crowbar. He always brings the crowbar.'),
 [RN,'You look like shit. I’ve dug up better.'],
 M2('thanks. u smell like a church','thanks. you smell like a church'),
 [RN,'’Cause I been in one. Lit a candle for you. Then I lit one for whoever I’m gonna find, so it’s even.'],
 N('He tells you a story about a priest, a goat and a collection plate that you could not repeat to anybody. You laugh, and the ribs catch, and you laugh at that too.'),
 [RN,'There it is. Thought he’d fuckin’ broke it.'],
 M2('who. v? he didn’t do this','who, v? he didn’t do this'),
 [RN,'I know he didn’t. I checked. Sat outside this door four nights with a crowbar, checkin’.'],
 N('He says it as if it was nothing. You look at the crowbar, and at the door, and you understand who the chair in the corridor was for.')]);
k86('g_nails','m',null,'clear','Angel does your nails',[
 N('Angel does the nails on your good hand. Pink, with a star on each. She has to keep stopping.'),
 [AN,'it’s my lashes. the glue’s cheap. shut up'],
 M2('i didn’t say anything','i didn’t say anything'),
 [AN,'you were going to'],
 N('She does the thumb twice. She will not look at the other hand, in its cast, and she will not stop looking at it either.'),
 [AN,'he carried you in himself, you know. wouldn’t let ronin. i’ve never seen him carry anything but a dog'],
 M2('yeah well. he’s got a claim. i’m in his book','yeah, well. he’s got a claim. i’m in his book'),
 [AN,'baby. i watched his face. that wasn’t a man with a claim'],
 M2('(she’s wrong. she’s an optimist. it’s the lashes)','(she’s wrong. she’s an optimist. it’s the lashes)')]);
k86('g_book','m',null,'clear','Ask Ronin about the book',[
 N('You ask Ronin, because Ronin will tell you.'),
 M2('am i still in it. the book','am i still in it? the book'),
 [RN,'Ain’t my book.'],
 M2('ronin','ronin.'),
 [RN,'…Yeah. You’re still in it. I asked him. He said he don’t cross things out.'],
 N('You nod. It is what you expected. It is better to know. You have always said so.'),
 [RN,'He also ain’t slept, he’s burned somethin’ in the furnace that stunk of leather, and he’s locked hisself out his own basement. So I dunno what the fuck the book’s worth this week.'],
 M2('(don’t. it’s worth what it says. it’s in INK)','(don’t. it’s worth what it says. it’s in ink)')]);
k86('g_grandpa','m',null,'clear','Call him “ur honour”',[
 N('He brings the tray. You have a line ready. You have had it ready since four in the morning.'),
 M2('took u long enough, ur honour. what, did u have to milk the cow','took you long enough, your honour. what, did you have to milk the cow?'),
 N('It comes out thin. The words are right, and there is nothing under them. A week ago you could have peeled paint with it.'),
 N('He looks at you for a moment. Then he answers it as though it had landed.'),
 K76V('The cow was unwilling. You have a foul mouth, and you will eat this before it is cold.'),
 M2('(he heard it. he heard it was weak. and he took the hit anyway)','(he heard it. he heard that it was weak, and he took the hit anyway)'),
 M2('(don’t be nice to me. u’re SO bad at it)','(don’t be nice to me. you’re so bad at it)')]);
/* ===================================== V ===================================== */
k86('g_kneel','v',null,null,'The tray',[
 N('You are a tall man. In that room, with them flat on the bed, you are the height of the door.'),
 N('So you kneel to put the tray down. You have not knelt to anybody in your life. You do it four times a day, on the tile, in a good suit.'),
 K76V('(It is a matter of sight lines, nothing more. A thing looked at from below is a larger thing.)'),
 N('They thank you. They thank the top of your head, since that is what they have been given.'),
 K76V('(I am on my knees to a person whose name is in my book under TO BE KILLED. I have looked for the contradiction, and I find that I am not interested in it.)')]);
k86('g_soles','v',null,null,'Your shoes',[
 N('You walk quietly. You have always done so; it is useful in your work.'),
 N('On the second day you go down in the leather-soled pair, the ones that ring on stone, and you put your feet down hard the whole length of the kennel corridor.'),
 K76V('(They should hear me from the stair. Nobody ought to arrive at that door without warning. I, least of all.)'),
 N('You hear the breathing in the room change when your step reaches the corner. They are bracing. You have given them twelve seconds in which to do it.'),
 K76V('(It is a wretched gift. It is what I have.)')]);
k86('g_hale','v',null,null,'Inspector Hale rings',[
 N('Inspector Hale rings at nine. A trailer in lot fourteen has been standing open for days. The tenant is known to him. He would like to know whether the tenant is known to you.'),
 K76V('By reputation.'),
 N('He says that there was blood in a building on the river, and a great deal of it was not the tenant’s. He says that he is not asking who did that.'),
 K76V('Then I have nothing to tell you, Inspector.'),
 N('He waits. He is good at it; it is why you have never underrated him.'),
 K76V('If I had seen them, they would be in a bed, and in no state to be questioned. I would say the same of anybody.'),
 N('He thanks you and rings off. In eleven years you have not told that man one lie. You have now told him the truth in such a way that it will do the work of one.'),
 K76V('(I had a letter to him, with their thumbprint in it. I have just stood between them and him. I will take the letter out of the safe tonight.)')]);
k86('g_meat','v',null,null,'Feeding time',[
 N('You bring the steel bucket down to the kennel at six, as you do every evening.'),
 N('The hounds do not come to it. They stand in the passage, all four, with their heads turned towards the door at the far end, the one marked LAUNDRY.'),
 K76V('Eat.'),
 N('The black hound looks at the bucket and then at you. It has never in its life had to be told twice.'),
 K76V('(They can smell them. Blood, and that particular fear. They have every one of them smelled like that, once, on my table.)'),
 N('You put the bucket down and leave it. In the morning it is empty, and all four are asleep against the infirmary door in a heap, and you step over them to take in the tray.')]);
k86('g_shoeV','v',null,null,'The shoe from the gravel',[
 N('You have their shoe. You picked it out of the gravel at the trailer, and it has been on the ops table since.'),
 N('Tonight you clean it. You take the lace out and wash it. You get the gravel out of the tread with a pick. It is a size five. It is very nearly a child’s shoe.'),
 K76V('(I have had this foot in the cross-hairs of my own plan. I measured the stride from it.)'),
 N('You cannot find the other. So you ring the shop on the high street, give the make and the size, and have a pair sent.'),
 N('You put the one shoe by their bed, and the box of two beneath it. You do not know what you mean by three shoes. You suspect that it means you could not decide whether to give back what they had or replace what they lost.')]);
k86('g_aloud','v',null,null,'Read the page aloud',[
 N('You take the ledger down to the cold room, where nobody will hear, and you read their page aloud. You do this with every page, before a thing is done. It is a way of being sure.'),
 K76V('“Misaki. Wanton. Collateral: several.”'),
 N('Your voice is quite steady. The driver, the doorman, the man on a Tuesday. You read them all.'),
 K76V('“To be —”'),
 N('You try it again. You have said that word over forty-one tables. It is one of the commonest words in your mouth.'),
 K76V('(I have a full sentence, written in my own hand, that I am not able to say.)'),
 N('You close the book. The steel table is beside you, with the straps gone from it. You had not noticed until now that you were standing with your hand on it, as on the shoulder of something that had been put down.')]);
k86('g_shotgun','v',null,null,'Angel, with the shotgun',[
 N('Angel arrives with no make-up on and the shotgun in a tennis bag. She walks straight past you to the kennel corridor, and stops at the door.'),
 [AN,'Hold this.'],
 N('She puts the shotgun in your hands. It is loaded.'),
 [AN,'I can’t have it on me in there. If I see what I think I’m going to see, I’ll walk back out here and use it on the first tall thing in the corridor.'],
 K76V('That would be me.'),
 [AN,'I know who it would be, V.'],
 N('She is in the room for an hour. You stand outside with her shotgun and listen to her not crying. When she comes out, she takes it back, looks at you for a long time, and breaks it open over her arm.'),
 [AN,'They said thank you to me. Like I was staff.'],
 K76V('I know.'),
 [AN,'Fix it. I don’t care what’s in your book. Fix it.']]);
k86('g_asked','v',null,null,'What they asked Ronin',[
 N('Ronin comes up from the corridor at four and stands in the kitchen with his hands on the back of a chair.'),
 [RN,'They asked me somethin’.'],
 K76V('Go on.'),
 [RN,'Asked if you’re gonna do it when they’re better. Real polite about it. Like askin’ what time the bus is.'],
 N('You put the knife down.'),
 K76V('What did you say?'),
 [RN,'Said I didn’t know. ’Cause I don’t. Do I, Vee?'],
 K76V('No.'),
 [RN,'You know?'],
 K76V('(I know. I have known since I could not write the total. I cannot say it to him before I have said it to them, and I cannot say it to them at all.)'),
 K76V('Tell them that it is not this week. It is true, and it is all that I can stand behind.'),
 [RN,'Fuck’s sake. “Not this week.” I’ll put it on a card.']]);
/* ===KC86-END=== */
