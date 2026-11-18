/* ===KC86-BEGIN=== */
/* ===================== THE WAR: THE ROOM, EITHER SETTING (kc86) =====================
   Twenty-eight more infirmary scenes for the enemies-to-lovers route that read the same under both aftermath settings
   (nothing here touches the hours, and the doctor does not appear). They join kc85's player-opened pool (K85S):
   ⚔ The room / ⚔ Outside the room, while kdMed(). kc86 also raises the pool's limit to three a slot and shows six
   at a time, since the pool is now large. Needs kc73, kc76–kc85.
     Misaki, cell (the tall one is a captor):  g_north g_spoon g_shoe g_number g_handle g_steps g_voice g_eye
     Misaki, clear:                            g_sign g_ronin g_nails g_book g_grandpa g_tab g_hands g_notsorry
     V:   g_kneel g_soles g_hale g_soup g_meat g_server g_shoeV g_aloud g_shotgun g_asked g_count g_cactus
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
 N('There is no window. You work out north anyway, because a room you cannot point out of is a room you cannot leave.'),
 N('The pipe along the ceiling is warm at one end and cold at the other, so the boiler is that way. The drain slopes to the door. The tall one’s shoes are wet on some days, and only on the left side, which gives you the wind.'),
 M2('(north’s the corner with the drip stand. probably. 60/40)','(north is the corner with the drip stand. probably. sixty-forty)'),
 N('It takes you most of a morning. When he comes in with the tray, you are facing north, and he stops, because you are smiling at a wall.'),
 Ms('(don’t ask. u wouldn’t get it. u’ve got windows)','(don’t ask. you wouldn’t get it. you’ve got windows)','You stop smiling. You are not supposed to have things in here.')]);
k86('g_spoon','m',null,'cell','There is a spoon on the tray',[
 N('The spoon on the tray is metal. In the other building they were plastic, and counted.'),
 M2('(he left me a METAL SPOON. is he stupid. is he new)','(he left me a metal spoon. is he stupid? is he new?)'),
 N('You could do a great deal with a metal spoon and a week. You put it down the side of the mattress and wait for him to count the tray.'),
 N('He does not count the tray. The next one comes with a spoon, and a fork, and a knife with a proper edge on it.'),
 M2('(ok. it’s a test. nobody’s this dumb. it’s a test and i don’t know what passing looks like)','(okay. it’s a test. nobody’s this dumb. it’s a test, and i don’t know what passing looks like)'),
 N('You eat with the knife and fork, very correctly, and put all three back on the tray in a row. You leave the first spoon where it is. You want to see how long it takes him.')]);
k86('g_shoe','m',null,'cell','Your shoe',[
 N('One of your shoes is on the floor by the bed. The left one. Somebody has cleaned it; the lace has been washed.'),
 N('You do not know where the right one is. You think about that for a while. A person with one shoe is not going anywhere, and whoever put it there knows it.'),
 M2('(nice. really nice. here’s half ur stuff. good luck hopping)','(nice. really nice. here’s half your stuff. good luck hopping)'),
 N('That evening the tall one comes in with a shoe box. There is a pair in it, new, your size, the same make. He puts the box under the bed, next to the single shoe, and says nothing about either.'),
 Ms('(…so now i’ve got three. what’s three shoes mean)','(…so now i’ve got three. what do three shoes mean?)','You look at the box until he has gone. You do not touch it.')]);
k86('g_number','m',null,'cell','What he calls you',[
 N('He has not called you anything. Not a name, not a number, not “you”. In the other building you were “it” to one of them and “sweetheart” to another, and you preferred “it”.'),
 N('So you give him something to use. People are easier to manage when they have a word for you.'),
 Ms('u can call me nine. if u want. it’s easy to remember','you can call me nine, if you want. it’s easy to remember','You hold up nine fingers. It takes both hands, and the left one will only give you four.'),
 N('He stands quite still with the tray.'),
 K76V('I know what you are called.'),
 M2('(shit. shit. he’s got my file. who gave him my file)','(shit. he’s got my file. who gave him my file?)'),
 N('He goes out. He did not use it, whatever he knows. You lie there trying to work out which is worse.')]);
k86('g_handle','m',null,'cell','The door handle',[
 N('You have not tried the door. You do not try doors in here. Trying a door tells them that you still think about doors.'),
 N('But you watch it. When the tall one goes out, he pulls it shut, and there is no second sound after the latch. No bolt. No key.'),
 M2('(so it’s electric. or there’s a guy outside. or it’s open)','(so it’s electric. or there’s a guy outside. or it’s just open)'),
 M2('(it’s not open. don’t be stupid. nobody leaves it open)','(it’s not open. don’t be stupid. nobody leaves it open)'),
 N('You lie on your right side and look at the handle for an hour. It is an ordinary brushed steel handle. You are more afraid of it than you were of the men.')]);
k86('g_steps','m',null,'cell','Count his steps',[
 N('He takes four steps from the door to the bed. Always four. He is tall enough to do it in three.'),
 N('You have counted every time. Four in, and he stops a full arm’s length short, and puts the tray down by stretching.'),
 M2('(he’s making himself slow. on purpose. why would u do that)','(he’s making himself slow, on purpose. why would you do that?)'),
 N('The only reason you can think of is the reason you walk slowly up to a mark: so that they do not bolt before you are close enough.'),
 M2('(joke’s on him. i can’t bolt. i’ve got one shoe)','(joke’s on him. i can’t bolt. i’ve got one shoe)')]);
k86('g_voice','m',null,'cell','Practise the good voice',[
 N('You practise it when nobody is in the room. It has to be ready.'),
 Ms('thank u. yes please. no trouble. whatever’s easiest','thank you. yes, please. no trouble. whatever’s easiest','You move your mouth through it without the sound: thank you, yes please, no trouble.'),
 N('It is pitched a little higher than yours, with the swearing taken out. You found it in about a day, in the other building. It turned out you had always had it.'),
 M2('(ur so good at this. it’s disgusting. u should’ve been in the drama club)','(you’re so good at this. it’s disgusting. you should’ve been in the drama club)'),
 N('Through the wall, something heavy is set down, hard, on stone. Then nothing. You do the voice again, quieter, in case that was about you.')]);
k86('g_eye','m',null,'cell','The green light on the ceiling',[
 N('There is a white disc on the ceiling with a green light in it. It blinks every nine seconds.'),
 N('It is a camera. Of course it is. So everything you do in this bed, you do for whoever is on the other end of it.'),
 N('You perform sleeping. You are good at it: slow breath, slack mouth, the hand open. You do it for six hours with your eyes shut, wide awake, counting blinks through your eyelids.'),
 M2('(2,400. he’s watched me not sleep 2,400 times. enjoy the show, creep)','(two thousand four hundred. he’s watched me not sleep two thousand four hundred times. enjoy the show, creep)'),
 N('It is a smoke detector. You will find that out on the third day, and you will want those six hours back more than anything else you lost that week.')]);

/* ===================================== MISAKI: CLEAR ===================================== */
k86('g_sign','m',null,'clear','The sign on the door',[
 N('You can read the door from the bed now, backwards, through the glass panel. YRDNUAL.'),
 M2('he put me in the LAUNDRY. i thought i was getting murdered and i was in the LAUNDRY','he put me in the laundry. i thought i was being murdered, and i was in the laundry'),
 N('You say it to the ceiling. Then you say it again, because it is the first sentence in a week that has come out in your own voice, and you want to hear what that sounds like.'),
 M2('grandpa. hey. GRANDPA. ur sign’s stupid','grandpa! hey, grandpa! your sign’s stupid!'),
 N('Nobody answers. Somewhere a long way up the house a door closes, carefully. You find that you are grinning, and that it hurts your face, as if the muscles had been put away for the season.')]);
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
k86('g_grandpa','m',null,'clear','Call him grandpa',[
 N('He brings the tray. You have a line ready. You have had it ready since four in the morning.'),
 M2('took u long enough, grandpa. what, did u have to milk the cow','took you long enough, grandpa. what, did you have to milk the cow?'),
 N('It comes out thin. The words are right, and there is nothing under them. A week ago you could have peeled paint with it.'),
 N('He looks at you for a moment. Then he answers it as though it had landed.'),
 K76V('The cow was unwilling. You have a foul mouth, and you will eat this before it is cold.'),
 M2('(he heard it. he heard it was weak. and he took the hit anyway)','(he heard it. he heard that it was weak, and he took the hit anyway)'),
 M2('(don’t be nice to me. u’re SO bad at it)','(don’t be nice to me. you’re so bad at it)')]);
k86('g_tab','m',null,'clear','Work out what you owe him',[
 N('You keep a tab. You always have. You do not like to owe.'),
 M2('(one carry, out of a building. 9 trays. a week of electric. one pair shoes)','(one carry, out of a building. nine trays. a week of electricity. one pair of shoes)'),
 M2('(minus: he swore to kill me. minus: the plastic. minus: he still owes me 900 for the carpet)','(minus: he swore to kill me. minus: the plastic sheet. minus: he still owes me nine hundred for the carpet)'),
 N('You do it three times, on the back of the chart, with the stub of pencil. It does not come out in your favour. It does not come out anywhere near it.'),
 M2('(i owe a billionaire. a billionaire who wants me dead. life is so fucking unfair)','(i owe a billionaire. a billionaire who wants me dead. life is so fucking unfair)'),
 N('You tear the sum off the chart and eat it, so that he will not find it.')]);
k86('g_hands','m',null,'clear','His hands',[
 N('For three days you watched his hands, because in a cell you watch the hands. You know them better than your own.'),
 N('A scar across the left knuckles, old. A callus on the second finger, from the pen. They are very clean, and the nails are cut straight across. He holds them slightly away from his body when he is in the room, turned so that you can see the palms.'),
 N('You know all of that, and you know now whose they are. You cannot make the two things one. The hands that brought the water, and the hands that had your rifle across his knees in the dark.'),
 M2('(stop looking at his hands. ur clear now. u’re allowed to look at his stupid face)','(stop looking at his hands. you’re clear now. you’re allowed to look at his stupid face)'),
 N('You try the face. You last about a second, and go back to the hands.')]);
k86('g_notsorry','m',null,'clear','Rehearse not apologising',[
 N('You were polite to him for three days. You were good. You said sorry to that man.'),
 N('You will not be apologising for it. You run the lines.'),
 M2('“i wasn’t being nice. i thought u were someone else.” no. sounds like i’d be nice to someone else','“i wasn’t being nice. i thought you were someone else.” no. that sounds like i’d be nice to someone else'),
 M2('“forget everything i said.” no. then he knows i remember','“forget everything i said.” no. then he knows that i remember'),
 M2('“fuck u.” …yeah. that one. keep it simple','“fuck you.” …yeah. that one. keep it simple'),
 N('He comes in at noon. You say it. He says “Good morning”, and puts the tray down, and you could swear that his shoulders come down an inch.')]);

/* ===================================== V ===================================== */
k86('g_kneel','v',null,null,'The tray',[
 N('You are a tall man. In that room, with them flat on the bed, you are the height of the door.'),
 N('So you kneel to put the tray down. You have not knelt to anybody in your life. You do it four times a day, on the tile, in a good suit.'),
 K76V('(It is not humility. It is a matter of sight lines. A thing looked at from below is a larger thing.)'),
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
k86('g_soup','v',null,null,'Soup',[
 N('They can keep soup down. So you make soup.'),
 N('The first is too salt. You are a good cook, and you have not over-salted a thing since you were a boy. The second you forget on the stove. The third is right, and you carry it down, and bring it back up untouched, because they were asleep.'),
 N('You pour all three away. The old hound watches the third go down the sink with an expression that you have earned.'),
 K76V('(I have cooked for nobody but animals in eleven years. I find that I do not know how much salt a person takes.)'),
 N('You make a fourth.')]);
k86('g_meat','v',null,null,'Feeding time',[
 N('You bring the steel bucket down to the kennel at six, as you do every evening.'),
 N('The hounds do not come to it. They stand in the passage, all four, with their heads turned towards the door at the far end, the one marked LAUNDRY.'),
 K76V('Eat.'),
 N('The black hound looks at the bucket and then at you. It has never in its life had to be told twice.'),
 K76V('(They can smell them. Blood, and that particular fear. They have every one of them smelled like that, once, on my table.)'),
 N('You put the bucket down and leave it. In the morning it is empty, and all four are asleep against the infirmary door in a heap, and you step over them to take in the tray.')]);
k86('g_server','v',null,null,'The server',[
 N('The server has been asking since the river. Angel has asked nine times. Ronin has asked once, which is worse.'),
 N('You type: “I have them.” You look at it. It is how one reports the taking of a mark. You delete it.'),
 N('You type: “They are in my keeping.” You delete that as well.'),
 N('You type: “They are alive. They are in my house. The door opens from both sides.”'),
 [AN,'(server) oh thank GOD. can i come'],
 [RN,'(server) vee. your house. the book still say what it says'],
 K76V('(server) Yes.'),
 [RN,'(server) then i’m bringin’ a chair'],
 K76V('(server) I had hoped that you would.')]);
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
k86('g_count','v',null,null,'Four in the morning',[
 N('Four in the morning. You stand in the corridor, four steps from the door, and count their breathing.'),
 N('Fourteen to the minute, asleep. Twenty-two, when they are awake and pretending. You have learned to tell the two apart. Tonight it is twenty-two.'),
 K76V('(They are lying in the dark performing sleep for a man who is standing in the dark counting it. Neither of us is at rest. It is the most honest exchange that we have had.)'),
 N('You could say something. “I know that you are awake.” It would be true, and it would tell them that even their sleep is watched.'),
 N('You go upstairs. You make a noise on every stair. By the time you reach the top it is fourteen.')]);
k86('g_cactus','v',null,null,'The cactus',[
 N('Every afternoon you drive to lot fourteen and water their cactus. A thimbleful. You have read up on it.'),
 N('You wrote that plant into your plan, in the first week, as a way to bring them back into a fire. Now you stand in their trailer with a thimble, like a man feeding a bird.'),
 K76V('(If it dies while they are in my house, they will come home to that. I will not be the cause of one more thing.)'),
 N('Today there is a flower on it. One, yellow, the size of a button. You did not know that they did that.'),
 N('You photograph it. You have nobody to send the photograph to who would not ask what you were doing in that trailer. You keep it. It is the only photograph on your telephone that is not evidence.')]);
/* ===KC86-END=== */
