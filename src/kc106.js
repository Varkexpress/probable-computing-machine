/* ===KC106-BEGIN=== */
/* ===================== THE WAR: THE INFIRMARY, AGAIN (kc106) =====================
   The author asked for most of the infirmary expansions to be undone and written again, with proper characterization
   and new concepts. Kept: the route's own infirmary scenes (kc73) and the two newest delusion rounds (kc104, kc105).
   Removed from kc80–kc102: the scheduled scenes, the three nights, the drip opening, “The thought”, and every
   player-opened scene from those rounds (about two hundred). This module replaces them with a tighter set.
   The voice is the author's sample (docs/voice_sample.md): these are killers who enjoy the work and are good at it,
   funny because they are dangerous. Misaki stays loud, profane and unserious even hurt, counts fear in numbered
   steps, and puts the bravado on top of it. V is formal, dry and menacing, keeps the law of an eye for an eye, and
   is tender only about his own, stated as fact. The pain shows through; nobody explains it.
   Canon kept: Misaki is on a heavy pain drip; while the room is a cell they take the tall one for K9, who has them
   and means to kill them, and they never warm to him (taunts and tests, not banter); V's chart says NO SEDATIVES.
   1. SCHEDULED (K84_POOLS, in order, as kc84 delivers them): Misaki in the cell, four; once clear, three; V, five.
   2. THE POOL (kc85's player-opened menu): Misaki in the cell, eighteen; once clear, twelve; V, eighteen.
   Same text under both aftermath settings: nothing touches the hours, and the doctor does not appear.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via M2 and they/them.
   Notes: docs/notes_kc106.md. Tested in tools/k86_test.js and tools/k106_test.js. */
const K106=()=>{try{return typeof K105==='function'&&K105()}catch(e){return false}};

/* ===================================== 1 · SCHEDULED ===================================== */
const K106_SCH={
 mc:[
  {id:'b6_wake',fn:cb=>say([
   N('You wake up. You do the inventory before you open your eyes, because opening your eyes is information you give away for free.'),
   M2('(one: alive. great. love that for me. two: one hand. the other one’s in something hard. three: there’s a needle in me and i didn’t put it there)','(one: alive. great. love that for me. two: one hand. the other one is in something hard. three: there is a needle in me, and i didn’t put it there)'),
   M2('(four: it smells clean. the van didn’t smell clean. so this is a different building. so somebody BOUGHT me)','(four: it smells clean. the van didn’t smell clean. so this is a different building. so somebody bought me)'),
   N('You open one eye. There is a man in the doorway, very tall, in shirtsleeves, with a tray. You know the shoulders. You have had them in a scope.'),
   M2('(oh, fuck. oh, that’s K9. of course it’s K9. he outbid them. he outbid four guys with a van for the privilege)','(oh, fuck. oh, that’s K9. of course it is. he outbid them. he outbid four men with a van for the privilege)'),
   N('Five: you are flat on your back with a drip in your arm in the house of the one man in the city who has your name in a book with a line under it. You lie there and wait for him to say something smug.'),
   N('He does not. He says the day of the week, and that the soup is hot, and goes out. The not-saying is so much worse that you laugh, once, and the ribs make you regret it for an hour.')],cb)},
  {id:'b6_terms',fn:cb=>say([
   N('You are a professional. Professionals negotiate. When he comes back for the tray you are ready.'),
   Ms('i want to discuss terms','I want to discuss terms.','You point at him, then at yourself, then rub your thumb across two fingers: money. Terms.'),
   K76V('Go on.'),
   Ms('the four guys. they were on day rates. i’m not. whatever u paid them, i’ll beat it. i’ll do anyone on ur list. two for one. this week only','The four men were on day rates. I’m not. Whatever you paid them, I’ll beat it. I’ll do anybody on your list. Two for one. This week only.','You hold up four fingers, wave them away, and hold up two fingers to him, eyebrows up. Two for one.'),
   K76V('I paid them nothing. I do not hire, and I do not buy. You are not for sale, and neither am I.'),
   M2('(he’s lying. everybody’s for sale. he’s just expensive)','(he’s lying. everybody is for sale. he’s just expensive)'),
   N('He picks up the tray and goes. You lie there working out what a man like that charges, and come to the conclusion that he does not charge. You go cold all over.')],cb)},
  {id:'b6_drip',fn:cb=>say([
   N('You work out the drip by noon. You know drugs. You have bought them, sold them, been paid in them once, and put a man to sleep with a syringe in a lift.'),
   M2('(this is the GOOD stuff. this is rich-guy stuff. this is hospital stuff. he’s got me on the stuff they give senators)','(this is the good stuff. this is rich-man stuff. this is hospital stuff. he has me on the stuff they give senators)'),
   N('It is also what the four used. The same coin taste at the back of the throat. The same soft floor. You lie there and work out that it means one of two things, and you do not like either of them.'),
   M2('(one: he bought their supplier. two: he bought THEM. either way it’s the same outfit and i’m the same stock)','(one: he bought their supplier. two: he bought them. either way it’s the same outfit, and i’m the same stock)'),
   N('You could pull it out. You put your fingers on the tape. Then the hand goes, on the hour, like a nail through it, and you leave the tape where it is, and hate yourself in a very orderly way for the rest of the afternoon.')],cb)},
  {id:'b6_hounds',fn:cb=>say([
   N('At six the hounds are fed. You can hear it through the wall: a bucket set down on stone, four animals coming at once, and then eating, wet and patient.'),
   N('Everybody in this city knows what he feeds them. You made a joke about it at the bowling alley in April. It was a good joke. Ronin snorted beer.'),
   M2('(it’s fine. it’s fine. it’s not you. you’re still in here. you can tell bc ur still in here)','(it’s fine. it’s fine. it isn’t you. you are still in here. you can tell, because you’re still in here)'),
   M2('(one: four dogs. two: big dogs. three: one of me. four: i’m like nine stone wet, that’s a bad meal, they’d be insulted)','(one: four dogs. two: big dogs. three: one of me. four: i’m about nine stone wet. that’s a bad meal. they’d be insulted)'),
   N('You lie there and listen to every mouthful. It takes eleven minutes. When it stops, something heavy lies down against the far side of the wall, right behind your head, and sighs, full, and you lie very still until morning so as not to remind it that you are there.')],cb)}],
 mx:[
  {id:'b6_clear',fn:cb=>say([
   N('You wake up on the fifth day, and your head is your own, and you know.'),
   N('K9 did not buy you. Nobody bought you. He came to the river. He carried you. Ronin is in the passage eating crisps and Angel has texted you two hundred times, and the man with the tray put you on the drip because you were in so much pain that you were screaming.'),
   M2('(oh no. oh NO. that’s so much worse)','(oh, no. oh, no. that is so much worse)'),
   M2('(one: he saved me. two: i owe him. three: i’ve never owed anyone. four: i’m gonna have to kill him just to get out of the debt)','(one: he saved me. two: i owe him. three: i have never owed anybody. four: i’m going to have to kill him just to get out of the debt)'),
   N('He comes in with the tray. You look at him. He looks at you, and sees that you know, and his face does nothing at all.'),
   K76V('Good morning.'),
   M2('fuck u','fuck you'),
   K76V('Ah. You are yourself again.')],cb)},
  {id:'b6_review',fn:cb=>say([
   N('You are bored. Boredom is a symptom of recovery; he said so. You decide to review the facility.'),
   M2('ok. room: clean, i’ll give u that. lighting: interrogation chic. decor: what colour is that, “witness protection beige”?','ok. room: clean, i’ll give you that. lighting: interrogation chic. decor: what colour is that, “witness protection beige”?'),
   K76V('It is ivory.'),
   M2('staff: tall. rude. reads the weather out loud. food: one star. drugs: five stars. would get kidnapped again, two stars overall','staff: tall. rude. reads the weather aloud. food: one star. drugs: five stars. would be kidnapped again. two stars overall'),
   K76V('I shall have it framed.'),
   N('He does. It is on the wall by the door the next morning, in a black frame, in his handwriting, transcribed word for word, with a note underneath: “Management regrets the soup.” You laugh until the stitches pull, and then you are furious, because he made you.')],cb)},
  {id:'b6_contract',fn:cb=>say([
   N('You cannot owe him. You will not. So you do what you always do with a debt: you write it down and put a number on it.'),
   N('It takes you all afternoon, on the back of the chart, left-handed because the right is on the drip line. CONTRACT. Party A (me) owes party B (you) for: one rescue, river, assorted. Rate: market. Payable in: one (1) job, any target, no questions. Then the debt is CLEAR and nobody mentions it EVER.'),
   N('You give it to him with the tray. He reads it at the door. He takes out a fountain pen.'),
   N('He gives it back. He has corrected “recieve”. He has struck through “no questions” and written “questions” above it. At the bottom, in his hand: “Party B declines. Party B was collecting his own property. No debt arises. —K9.”'),
   M2('(“property.” PROPERTY. i’m gonna kill him with a fountain pen)','(“property.” property. i’m going to kill him with a fountain pen)'),
   N('You keep it. You fold it up very small and keep it, which is the most annoying thing about the whole business.')],cb)}],
 v:[
  {id:'b6_river',fn:cb=>say([
   N('You carried them out of the building by the river. You remember it as you remember all work: in order, and exactly.'),
   N('The door, which took a shoulder. The stair. The room. Then the thing on the mattress, which was them, and which looked at you and tried to bite.'),
   K76V('(Good. I thought. Something left.)'),
   N('You put your coat round them. You lifted them. They weighed less than the old hound. On the stair they tried again for your throat, with their teeth, and got your collar, and held on all the way to the car like something that would not let go of a bone.'),
   N('You have the coat in the scullery. There is a bite through the collar, both rows, clean. You are not going to have it mended. You have hung it on the hook by the door where you will see it every time you go down to them.')],cb)},
  {id:'b6_work',fn:cb=>say([
   N('You go over the injuries with the films up on the light box, as you would go over another man’s work on the table.'),
   N('It is very bad work. Nothing in it answers to anything. A finger broken for no reason that the finger had given. The ribs gone over twice from boredom. The wrists tied wrong, so that they cut. Not one thing was asked that needed asking.'),
   K76V('(Amateurs. They hurt a thing because it was in front of them, and because they could.)'),
   N('You have a law. An eye for an eye; a finger for a finger; and, for the man who does it for nothing, the long way round.'),
   N('You take four clean pages in the ledger, and head each one with what you have: a bald head, a boot, a van, a green book. Under each you write the charges, in full, with the films as evidence. You do not hurry. You have not looked forward to a piece of work so much in years.')],cb)},
  {id:'b6_ledger',fn:cb=>say([
   N('Their page has been open on your desk since April. MISAKI (hitmeuppp). WANTON. COLLATERAL: SEVERAL. TO BE KILLED.'),
   N('You bring it up to date, as you would any page.'),
   N('“Condition: poor. Four fractures, one tooth, the wrists. Not fit.” And under that, in the column where the date goes: “Collection deferred.”'),
   K76V('(I do not kill a thing that is not well. It cannot answer. There is nobody at home to collect from.)'),
   N('You blot it. You look at it for some time. It is correct; you would write the same of any page in the book. You would like somebody to argue with you about it. The only person in the house who would is downstairs on a drip, calling you names in their sleep.')],cb)},
  {id:'b6_ronin',fn:cb=>say([
   [RN,'Let me in.'],
   K76V('No.'),
   [RN,'Vee. Let me in or I put this through your door.'],
   N('He has the crowbar. He would. He has been sitting in his truck at your gate since the river, smoking, and the gate has had enough of him.'),
   K76V('In that room I am the man who holds them. They will look at your face and decide that I have you as well. You will make it worse.'),
   [RN,'So what, I just sit in the passage?'],
   K76V('Yes. There is a chair.'),
   N('He sits in the passage. He sits in it every day for a week, in his coat, with the crowbar across his knees, eating crisps very loudly, so that whoever is in that room can hear that there is somebody on their side of the door. You did not think of that. You are annoyed that he did.')],cb)},
  {id:'b6_angel',fn:cb=>say([
   N('Angel comes to the gate at midnight with the shotgun, in heels.'),
   [AN,'give me the names.'],
   K76V('No.'),
   [AN,'v. i have a free afternoon and nine shells and a very good reason. give me the names.'],
   K76V('They are mine. They took a thing of mine and damaged it. By my law the claim is prior.'),
   [AN,'the claim’s THEIRS, you pompous fuck. not yours. not mine. theirs. when they can hold a rifle you’re going to give them those names, and you’re going to hold the door.'],
   N('You look at her for a while, across the gate, with the shotgun broken over her arm and her mascara perfect. She is right, and it is very irritating.'),
   K76V('Agreed.'),
   [AN,'good. now let me in, it’s freezing.']],cb)}]};
(function(){try{if(typeof K84_POOLS==='undefined')return;['mc','mx','v'].forEach(k=>K106_SCH[k].forEach(e=>K84_POOLS[k].push({id:e.id,fn:e.fn,mode:null})))}catch(e){}})();

/* ===================================== 2 · THE POOL: MISAKI, CELL ===================================== */
k86('m6_arsenal','m',null,'cell','Rate the weapons in the room',[
 N('You do a weapons inventory, because you are not an amateur.'),
 M2('(drip stand: javelin. bad javelin. three out of ten. lamp arm: comes off if u put ur back into it, and i have no back. two)','(drip stand: a javelin. a bad javelin. three out of ten. lamp arm: comes off if you put your back into it, and i have no back. two)'),
 M2('(spoon: classic. timeless. a seven if u’ve got a week. pillow: only if he’s asleep and also very stupid. one)','(spoon: classic. timeless. a seven if you have a week. pillow: only if he’s asleep and also very stupid. one)'),
 M2('(him: the best weapon in the room. it’s attached to him. that’s the problem with this room)','(him: the best weapon in the room. it’s attached to him. that’s the problem with this room)'),
 N('You lie there and run the numbers on every way out. It comes to the spoon. It always comes to the spoon. You have killed men with a lot less, but you were standing up at the time.')]);
k86('m6_line','m',null,'cell','The line in your arm',[
 N('You have a plan. The drip line is a metre of good plastic tube. Get it round a neck, cross the hands, lean back. You have done it with a phone charger.'),
 N('You lie there with your eyes shut and walk it through. He leans over to change the bag. You get the tube round. You cross your hands —'),
 N('— and the tube is in your arm. It is taped to the back of your hand. If you garrotte him with it you pull your own needle out and bleed on him a bit, and then he takes it off you, with the other hand, like a man taking a lead off a dog.'),
 M2('(ok. so the best weapon in the room is plugged into ME. cool. great design. who designed this. oh. him)','(ok. so the best weapon in the room is plugged into me. cool. great design. who designed this? oh. him)'),
 N('He comes in to change the bag. You watch the tube go past your face, within an inch of his neck, and do nothing, and he does not even look at you, which means that he knows.')]);
k86('m6_grade','m',null,'cell','Grade his visits',[
 N('You keep a score of his visits, like a waiter. It gives the day a shape.'),
 M2('(eight o’clock: on time. didn’t speak. tray to the left, ugh. six out of ten. noon: on time. said the date. creepy. four)','(eight o’clock: on time. didn’t speak. tray to the left, ugh. six out of ten. noon: on time. said the date. creepy. four)'),
 M2('(six: on time AGAIN. nobody’s on time three times a day. that’s not a person. that’s a train. three)','(six: on time again. nobody is on time three times a day. that isn’t a person. that’s a train. three)'),
 N('Day four he is a minute late at noon. It throws you so badly that you sit up, which you cannot do, and lie back down shaking. Something has changed. Something is about to happen.'),
 N('He comes in with flour on his sleeve. He has made bread. He puts it on the tray and goes. Nothing happens. You give him a one, out of spite, and eat the bread, which is good, and give him a two.')]);
k86('m6_kilos','m',null,'cell','He is on the phone',[
 N('He is on the phone in the passage. You can hear his half, the board-meeting voice, very clear.'),
 K76V('Eighteen kilos. Thursday. Cubed, if you would, and kept cold.'),
 N('You stop breathing.'),
 M2('(eighteen kilos. that’s. how much do i. i’m like fifty. so that’s like a third of me. cubed. CUBED)','(eighteen kilos. that’s. how much do i weigh? about fifty. so that is about a third of me. cubed. cubed)'),
 M2('(one: he’s ordering me in parts. two: he’s ordering me THURSDAY. three: who’s he ordering me FROM, he’s got me RIGHT HERE)','(one: he’s ordering me in parts. two: he’s ordering me for thursday. three: who is he ordering me from? he has me right here)'),
 N('It is beef, for the hounds, from the butcher on the ring road. You do not find that out until the second week. For six days you lie there doing the arithmetic on a third of yourself, and every Thursday after that, for the rest of your life, you will not eat stew.')]);
k86('m6_seizure','m',null,'cell','Time him',[
 N('You want to know how fast he is. Everybody in your line of work wants to know how fast the other side is.'),
 N('So you fake a fit. You are good at it. You did one in a bank once. You arch, you rattle the drip stand, you make the noise in your throat.'),
 N('He is through the door in nine seconds. From the kitchen. That is up a flight and along a passage. He is at the bed with your head in one hand and the other on your jaw before you have finished the second arch.'),
 M2('(nine. NINE. nobody’s nine. he must sleep on the stairs)','(nine. nine. nobody is nine. he must sleep on the stairs)'),
 N('You open your eyes and look at him. He looks at you. He knows. He knew by about the fourth second; you saw it land. He came anyway, the whole way, at full speed, and he does not let go of your head.'),
 K76V('Do that again and I shall come again. Every time. I should like you to know that, before you decide.'),
 N('You do not do it again. You lie awake trying to work out whether that was a promise or a threat, and in the end you decide that, from him, there is no difference.')]);
k86('m6_joke','m',null,'cell','Make him laugh',[
 N('You want to know whether he is human. The quickest test you know is a joke.'),
 Ms('what’s the difference between u and a rottweiler','What’s the difference between you and a rottweiler?','You point at him, then make a dog’s ears on your head with your good hand, and raise your eyebrows.'),
 K76V('I do not know.'),
 Ms('the rottweiler eventually lets go','The rottweiler eventually lets go.','You mime biting down, and then shake your head: no. Never lets go.'),
 N('Nothing. His face does nothing. He picks up the tray and goes out. You lie there, triumphant: not human. A machine in a shirt.'),
 N('Then, from the passage, a sound. Once. Short, through the nose, very hard, like something escaping a valve under pressure.'),
 M2('(…that was a laugh. he LAUGHED. he went out so i wouldn’t see. that’s so much creepier)','(…that was a laugh. he laughed. he went out so that i wouldn’t see. that is so much creepier)')]);
k86('m6_soup','m',null,'cell','What is in the soup',[
 N('There is meat in the soup. Small, pale, very tender. You are halfway through the bowl before the thought arrives, fully formed, with a little bow on it.'),
 M2('(lex talionis. an eye for an eye. he’s been feeding me the GUYS)','(lex talionis. an eye for an eye. he’s been feeding me the men)'),
 N('You stop chewing. You consider it from every side, as you would a job. It would be very him. It would be the most him thing that has ever happened.'),
 M2('(one: disgusting. two: kind of a power move. three: is this the bald one. he was the one who laughed. i hope it’s the bald one)','(one: disgusting. two: something of a power move. three: is this the bald one? he was the one who laughed. i hope it is the bald one)'),
 N('You eat the rest. Slowly. Every piece. You are not sure, all the way down, whether you are horrified or having the best meal of your life.'),
 N('It is chicken. You never ask. You never find out, and you never quite stop hoping.')]);
k86('m6_jingle','m',null,'cell','Sing',[
 N('You cannot get up and you cannot get out. You can still be a pain in the arse. It is one of your gifts.'),
 N('You sing the jingle from the carpet warehouse advert. The one with the dog. You sing it at the top of what is left of your lungs, on a loop, for an hour and twenty minutes, with the ribs screaming at you on every chorus.'),
 M2('(DOUBLE THE CARPET, HALF THE PRICE. let’s see how long the big man lasts)','(double the carpet, half the price. let’s see how long the big man lasts)'),
 N('At the eighty-first minute the door opens. He stands in it. You sing straight at him.'),
 K76V('There is a second verse.'),
 N('You stop. There is not a second verse. There has never been a second verse.'),
 K76V('There is in the version they ran in the east of the city. I shall wait.'),
 N('He leans on the door frame with his arms folded and waits for it. You do not know it. You are not going to admit that. You lie there in silence with your face hot, and he waits for a full five minutes before he goes, and you have lost to a man about a carpet advert.')]);
k86('m6_glasses','m',null,'cell','His glasses',[
 N('He wears reading glasses for the chart. He holds the chart at the end of his nose and squints. You have been watching him for days.'),
 M2('(he’s blind without them. a guy with his kind of money and he’s blind as a mole. that’s a weak point. that’s a WEAK point)','(he’s blind without them. a man with his kind of money, and he’s as blind as a mole. that’s a weak point. that’s a weak point)'),
 N('You make a plan. Get the glasses. Then he is a big blind man in a small room, and you know where everything is, and you have a spoon.'),
 N('On the sixth day he leans over to read the bag and the glasses are right there, on the bridge of his nose, a foot from your good hand. You go for them.'),
 N('You miss by a foot. The hand gets about halfway and goes down on the blanket like a dead bird. He looks at the hand, and at you, and takes the glasses off, and folds them, and puts them on the tray by your fingers.'),
 K76V('There. Now I cannot read your chart. I hope that you are satisfied.'),
 N('You lie there with the glasses under your fingers and a man who cannot see you standing at the foot of the bed, waiting politely to be attacked. You do not move. You are too humiliated to move.')]);
k86('m6_scale','m',null,'cell','The pain, by calibre',[
 N('He asks for the pain, out of ten. You have never liked tens. They are for people who have not been shot.'),
 Ms('a nine mil. hollow point','A nine mil. Hollow point.','You make a pistol of your fingers and point it at the hand, then hold up nine fingers and close them into a fist.'),
 K76V('I beg your pardon?'),
 Ms('the hand. ribs are a .22, a lot of them. the wrists are a bb gun. the tooth’s a fifty cal, don’t touch the tooth','The hand. The ribs are a .22, a lot of them. The wrists are a BB gun. The tooth is a fifty cal. Don’t touch the tooth.','You point at the ribs and tap them lots of times, quickly; at the wrists and flick your fingers, small; then at your mouth and open your hand wide, like an explosion.'),
 N('He writes it down. Word for word, on the chart, under PAIN: “Hand, 9mm (hollow point). Ribs, .22, multiple. Wrists, BB. Tooth, .50.”'),
 M2('(he wrote it DOWN. he’s gonna use my scale. he’s gonna ask about BB guns every HOUR)','(he wrote it down. he’s going to use my scale. he’s going to ask about bb guns on the hour)'),
 N('He does. Every hour, for the rest of the week, from the door: “Calibre?” You hate that it works. You hate that it is the only question in the room that you know how to answer.')]);
k86('m6_shadow','m',null,'cell','Behind him in the door',[
 N('He is in the doorway with the tray. Behind him, in the passage, there is somebody else. Shorter. Bald. Standing very still in the dark just past his shoulder.'),
 N('Your mouth opens to shout. To warn him. Before you know what you are doing, the word is in your throat, and it is going to be “behind you”.'),
 N('You shut your teeth on it so hard that the bad tooth goes off like a flashbulb.'),
 M2('(were u gonna WARN him. were u gonna warn the guy who bought u. from the guy who sold u. what is WRONG with u)','(were you going to warn him? were you going to warn the man who bought you, from the man who sold you? what is wrong with you?)'),
 N('He puts the tray down. The passage behind him is empty. There was never anybody there; it is the drip, which does faces now.'),
 N('You lie there afterwards for an hour, so angry that you shake. Not at the bald one. At yourself, for the half-second when you were going to save K9’s life for free.')]);
k86('m6_decor','m',null,'cell','The decor',[
 M2('(who paints a murder room ivory)','(who paints a murder room ivory?)'),
 N('You have been looking at the walls for five days. It has to be said.'),
 M2('(a drain in the floor and IVORY walls. that’s a man who’s never cleaned up after himself in his life. that’s got a GUY)','(a drain in the floor and ivory walls. that is a man who has never cleaned up after himself in his life. that man has a guy)'),
 M2('(no. he does it himself. look at the grout. that’s a man on his knees with a toothbrush every sunday. oh NO)','(no. he does it himself. look at the grout. that is a man on his knees with a toothbrush every sunday. oh no)'),
 N('You lie there and look at the grout, and are frightened of a man who would keep it this clean.')]);
k86('m6_con','m',null,'cell','Play the good patient',[
 N('New plan. You have done grifts; you know how a mark works. Be the good patient. Make him relax. Then the spoon.'),
 Ms('good morning!! wow, is that soup? u shouldn’t have. i feel SO much better today','Good morning! Wow, is that soup? You shouldn’t have. I feel so much better today.','You smile at him with every tooth you have left and give him two thumbs up, which is one more thumb than you can do.'),
 N('He stops dead in the doorway. He looks at you as he would look at a hound that had started walking on its hind legs.'),
 K76V('Are you in pain?'),
 Ms('never better!','Never better!','You smile harder.'),
 N('He comes over and checks the drip, and the line, and your pupils with a little light, and then he goes away and comes back with Ronin’s chair and sits in the doorway for the whole of the next hour, watching you, very closely, like a man waiting for a bomb.'),
 M2('(ok. the good patient was too good. noted. back to being a cunt)','(ok. the good patient was too good. noted. back to being a cunt)')]);
k86('m6_when','m',null,'cell','Ask him when',[
 N('You are sick of waiting. Waiting is the worst part of a job; you would rather be shot at than wait.'),
 Ms('when','When?','You point at the floor, at him, and draw a finger across your throat, and tap your wrist where a watch would be.'),
 K76V('Not while you are ill.'),
 N('He goes out. You lie there turning it over. Not while you are ill. You know him. Everybody knows him. He has never killed a thing that was not well; it is the one thing he says about himself that everybody believes.'),
 M2('(so that’s the clock. get better and he does me. stay sick and i live. i have to stay SICK. i’m in the only hospital in the world where getting better kills u)','(so that’s the clock. get better and he does me. stay sick and i live. i have to stay sick. i am in the only hospital in the world where getting better kills you)'),
 N('That night the ribs feel better. You can breathe all the way down for the first time. You lie there with your eyes open and your heart going, appalled at your own body for healing.')]);
k86('m6_pistol','m',null,'cell','Something to strip',[
 N('Your hands are going mad. Five days and nothing to do. In your whole life you have not gone five days without stripping something.'),
 Ms('i need something to strip','I need something to strip.','You mime stripping a pistol, slide, spring, barrel, with your one good hand and your teeth.'),
 N('He looks at you a long time. Then he goes away, and comes back with an old service pistol, a heavy one, and lays it on the blanket by your good hand. It has no firing pin. He shows you the hole where the pin goes, so that you will not wonder.'),
 M2('(he gave me a GUN. a broken gun. he gave a broken gun to the guy he’s gonna kill. who IS this man)','(he gave me a gun. a broken gun. he gave a broken gun to the person he is going to kill. who is this man?)'),
 N('You strip it forty times that night, one-handed, by feel, in the dark. Slide, spring, barrel. Barrel, spring, slide. It is the best night you have had since the river.'),
 N('In the morning you put it back together and hold it out to him by the barrel, grip first, like a professional. He takes it the same way. Nobody says anything. You have both just been very polite with a gun.')]);
k86('m6_roof','m',null,'cell','On a roof',[
 N('The drip is high tonight. The ceiling is a sky. You are on a roof. You know the roof: the laundromat, the vent, the gravel in your elbows.'),
 M2('left to right. four. he’s coming out the side door. ur high','left to right. four. he’s coming out of the side door. you’re high'),
 N('You say it out loud. You are calling wind for somebody. You do not know who. You are just calling it, at the ceiling, because that is what you do on a roof.'),
 K76V('Left to right, four. I have him.'),
 N('It comes from the door. Low, exact, in a spotter’s voice, as if he had done it a hundred times. You lie there and the roof is real for a whole second, with somebody on it with you, calling it back.'),
 N('Then it is the ceiling. You turn your face to the wall. You were on a roof with K9, and it was the best you have felt in a week, and you are never going to forgive the drip for that, or him.')]);
k86('m6_last','m',null,'cell','The last thing you said to Angel',[
 N('You try to remember the last thing you said to Angel. It was Wednesday, on the phone, and she was talking about her stream.'),
 N('You said “bring me fries.” That was it. “bring me fries,” and you hung up, because you had a job in the morning and her stream was boring.'),
 M2('(that’s it? that’s the last thing? out of everything? FRIES?)','(that’s it? that’s the last thing? out of everything, fries?)'),
 N('You go over it all night, rewording it, as if you could go back and say it differently. You could have said thanks. You could have said the stream was good. You could have just not hung up.'),
 M2('(if i get out. one: tell her the stream was good. two: it wasn’t. three: tell her anyway)','(if i get out. one: tell her the stream was good. two: it wasn’t. three: tell her anyway)'),
 N('You will not get out. You know that. You lie there and say “the stream was good” to the ceiling until it sounds like a lie, and then until it does not.')]);
k86('m6_crackers','m',null,'cell','Crackers',[
 N('He leaves crackers on the tray, for when you cannot do soup. Little square ones. There are nine.'),
 N('You cannot throw anything; it would take the ribs. You cannot shout; it would take the ribs. But you can arrange crackers.'),
 N('It takes you an hour with one hand. When he comes back for the tray, there is a word on it, spelled out in crackers, facing the door so that he can read it from there.'),
 M2('(four letters. nine crackers. had to make the C out of two. art)','(four letters. nine crackers. had to make the c out of two. art)'),
 N('He reads it. He does not change his face. He looks at the C for some time, as if assessing the workmanship.'),
 K76V('The C is very good.'),
 N('He takes the tray. Next time there are eleven crackers. He has given you enough for the full sentence.')]);

/* ===================================== THE POOL: MISAKI, CLEAR ===================================== */
k86('x6_rifle','m',null,'clear','Ask for the rifle',[
 M2('i want my rifle','i want my rifle'),
 K76V('You cannot hold it.'),
 M2('i didn’t say i wanted to HOLD it. i said i want it. in here. with me','i didn’t say i wanted to hold it. i said i want it. in here. with me'),
 N('He brings it. Unloaded, bolt out, the bolt in his pocket. He lays it along the bed beside you like a second person.'),
 N('You put your good hand on the stock. You have had that stock against your cheek more than you have had anything against your cheek, ever. Your hand knows the scratch by the comb where you dropped it off the water tower.'),
 M2('hi, babe. i missed u. did he touch u. he touched u. i can smell his oil on u','hi, babe. i missed you. did he touch you? he touched you. i can smell his oil on you'),
 K76V('I cleaned it. It needed cleaning.'),
 M2('NOBODY cleans her but me','nobody cleans it but me'),
 N('You sleep with it that night, along your side, with your hand on the grip. He leaves the bolt on the counter where you can see it and not reach it, which you will be complaining about for years.')]);
k86('x6_scars','m',null,'clear','Ronin compares',[
 N('Ronin comes in with the chair and sits on it backwards and asks to see. You show him the wrists. He whistles, low.'),
 [RN,'Amateur work. Look at that. They tied it wrong. Anybody with a brain ties it here, see, an’ it don’t mark.'],
 M2('thanks. very helpful','thanks. very helpful'),
 [RN,'I’m just sayin’. Here.'],
 N('He rolls up his sleeve. There is a scar on his forearm like a zip. Then his trouser leg: a dent in the shin you could put a thumb in. Then his shirt.'),
 [RN,'Sawn-off. Nineteen. Guy was a sore loser at cards.'],
 M2('nail gun. sixteen. guy was a sore loser at being alive','nail gun. sixteen. guy was a sore loser at being alive'),
 N('You sit there trading scars for an hour like kids with cards. He wins on number. You win on the nail gun. At the end he looks at the wrists again and goes quiet, and puts his sleeve down, and says, to the floor, that he is going to do the one with the boot so slow.')]);
k86('x6_stream','m',null,'clear','Angel is streaming',[
 N('Angel brings her phone and her ring light and sets it up at the end of your bed.'),
 [AN,'okay. my followers have been praying for “my friend” for a week. they want an update. you’re going to give them one.'],
 M2('i’m not going on ur STREAM','i am not going on your stream'),
 [AN,'you’re going on my stream. face off camera. hand on camera. wave it. they love a cast.'],
 N('You wave the cast. Forty thousand people send hearts. Someone sends money. Angel reads out the names of everyone who sent money, in her Maria voice, sweetly, and you hear her store each one.'),
 M2('(she’s gonna find the ones who didn’t send hearts. she’s gonna find them)','(she is going to find the ones who didn’t send hearts. she is going to find them)'),
 N('Afterwards she turns the light off and sits there in the dark with you, not Maria, the other one, and says that if you ever do that to her again she will kill you herself, and that she means it, and does your nails.')]);
k86('x6_tax','m',null,'clear','He paid for all of it',[
 N('You work out what it all cost. The films, the pins, the drip, the food, the bag that runs all night. A hospital would have had you in debt until you were dead.'),
 M2('did u pay for all this','did you pay for all this?'),
 K76V('It is my house.'),
 M2('so ur gonna write it off. ur gonna write ME off. i’m a TAX DEDUCTION','so you’re going to write it off. you’re going to write me off. i’m a tax deduction'),
 K76V('You are not deductible. I have asked.'),
 N('You stare at him. He has asked. He has rung an accountant, a real one, with a pen and a waiting room, and asked whether you were deductible.'),
 M2('(he asked. that’s the funniest thing i’ve ever heard. i’m gonna die laughing in a billionaire’s basement and it’s gonna be his ACCOUNTANT’S fault)','(he asked. that is the funniest thing i have ever heard. i’m going to die laughing in a billionaire’s basement, and it will be his accountant’s fault)')]);
k86('x6_method','m',null,'clear','Method',[
 N('You plan the four with him across the bed, like two professionals over a table. It is the best afternoon you have had in a month.'),
 M2('chainsaw. the bald one. start at the feet','chainsaw. the bald one. start at the feet'),
 K76V('A chainsaw tears. He would be insensible in a minute. He would not have time to understand why.'),
 M2('he’ll understand. i’ll WRITE it on him','he’ll understand. i’ll write it on him'),
 K76V('On the table, with the straps, he could be asked. Each of them could be asked. In order.'),
 M2('ur table is so BORING. it’s like being killed by a dentist','your table is so boring. it’s like being killed by a dentist'),
 N('You argue about it for two hours. Ronin comes in halfway and sits down and takes notes. In the end you agree: the table, but you get to bring the chainsaw, and you get to start it, and it stays running in the corner the whole time, so that the bald one can hear it.')]);
k86('x6_withdrawal','m',null,'clear','Off the drip',[
 N('They take you off the drip. Everything comes back at once, in high definition, and you are the worst you have been in your life.'),
 N('Everything itches. Everything is too loud. The light hurts. The soup is too hot and then it is too cold. You insult everyone who comes into the room, in order, with great care, all day.'),
 M2('ur face is too big. ur hounds are ugly. ur house smells like a museum. ur cufflinks are a CRY FOR HELP','your face is too big. your hounds are ugly. your house smells like a museum. your cufflinks are a cry for help'),
 N('He takes out a small notebook and writes it down.'),
 M2('what are u DOING','what are you doing?'),
 K76V('Keeping them. They are better than the ones from April. I should like to be able to refer to them.'),
 N('He keeps the notebook for years. You find it once, in his desk drawer. It is full. The last page is headed “withdrawal, day two” and underlined twice, and somebody has drawn a small star by the cufflinks.')]);
k86('x6_kennel','m',null,'clear','The hounds',[
 N('You make it to the kennel on the second day you can walk. Twelve minutes, for forty metres, holding the wall. You want to see the animals that you lay awake listening to for a week.'),
 N('All four of them get up when you come in. You stop dead. You know what they did in the yard in April. You know what they eat.'),
 M2('(one: big. two: four. three: they’re looking at the cast. four: i am a snack with a cast on)','(one: big. two: four. three: they’re looking at the cast. four: i am a snack with a cast on)'),
 N('The grey one comes up first. She smells the cast all over, end to end, like a customs officer. Then she licks it, once, the whole length, slow.'),
 N('The other three come and do the same. You stand there with your cast being inspected by four animals that eat people, and it is the most welcome you have felt since you were born.'),
 M2('(…i’m not crying, it’s the dog breath)','(…i am not crying. it’s the dog breath)')]);
k86('x6_sandwich','m',null,'clear','Petrol station sandwiches',[
 M2('i want a petrol station sandwich','i want a petrol station sandwich'),
 K76V('There is soup.'),
 M2('i don’t want SOUP. i want a triangle. in plastic. that’s been under a light since tuesday','i don’t want soup. i want a triangle. in plastic. that has been under a light since tuesday'),
 N('He goes out. He is gone for an hour and forty minutes.'),
 N('He comes back with fourteen. Every kind. Egg, tuna, prawn, the chicken one, the cheese one that is mostly mayonnaise. He lays them out along the counter in a row, still in their plastic, like evidence.'),
 K76V('I did not know which. I asked for all of them. The young man thought that I was going to kill him.'),
 M2('were u','were you?'),
 K76V('I had not decided. Which?'),
 N('You point at the egg. He gives it to you. He eats the prawn himself, standing at the counter, out of the plastic, with an expression of great suspicion, and finishes it.')]);
k86('x6_count','m',null,'clear','How many',[
 M2('how many. ur table. total','how many? your table. total'),
 K76V('Forty-one.'),
 M2('pfft. i did forty-one before i could drive','pfft. i did forty-one before i could drive'),
 K76V('You did not.'),
 M2('i did like twenty. but they were FAST','i did about twenty. but they were fast'),
 K76V('Each of mine could tell you why.'),
 M2('each of mine was over six hundred metres. could ur forty-one tell u that','each of mine was over six hundred metres. could your forty-one tell you that?'),
 N('He opens his mouth and closes it. You have him on range. He has you on count. You sit there scoring each other across the bed like two old soldiers in a bar, and it is the first time in a week that he has looked at you as if you might win something.')]);
k86('x6_swing','m',null,'clear','You wake up swinging',[
 N('You wake up swinging. The river, the van, the bald one, and your good fist is already going.'),
 N('It stops. It stops in a hand. He is at the side of the bed, and he has your fist in his palm, the whole of it, closed, held there, quite gently.'),
 K76V('Left hook. You dropped your shoulder.'),
 M2('i was ASLEEP','i was asleep'),
 K76V('You were. It was still a good punch.'),
 N('He lets go. He goes back to the doorway. He stands there until you have stopped shaking, with his back to the frame, not looking at you, looking at the passage, as if something might come along it.'),
 M2('(he caught it. nobody’s caught it. he caught it like a ball)','(he caught it. nobody has ever caught it. he caught it like a ball)')]);
k86('x6_bet','m',null,'clear','Ronin’s book',[
 N('Ronin has a book on the two of you. He has had it since April. He brings it in to show you, because he thinks it will cheer you up.'),
 [RN,'Odds on you doin’ him were six to four. After the river they went to twenty to one. You know why?'],
 M2('bc i can’t lift a spoon','because i can’t lift a spoon'),
 [RN,'’Cause everybody figures you owe him now an’ you’d never. Bunch o’ sentimental assholes.'],
 M2('put fifty on me','put fifty on me'),
 [RN,'At twenty to one? That’s a grand.'],
 M2('i know what it is. i can do sums. put fifty on me','i know what it is. i can do sums. put fifty on me'),
 N('He writes it down, grinning. You lie there with fifty dollars you do not have riding on the life of the man who carried you out of a river, and it is the most normal you have felt since.')]);
k86('x6_thank','m',null,'clear','Try to thank him',[
 N('You try to thank him. You have been working up to it for a day. You have the words. You say them in your head, over and over, so that they will come out right.'),
 N('He comes in with the tray.'),
 M2('if u ever tell anyone u carried me i’ll gut u','if you ever tell anybody that you carried me, i’ll gut you'),
 N('Those were not the words. It came out of your mouth by itself.'),
 K76V('Understood. You are welcome.'),
 N('He goes. You lie there with your face burning. He heard it. He heard exactly what it was. He translated it perfectly, the first time, as if he had always spoken it, and you will never forgive him for that.')]);

/* ===================================== THE POOL: V ===================================== */
k86('v6_whetstone','v',null,null,'The whetstone',[
 N('You sharpen the scalpel at the bedside, to keep your hands busy while the bag runs. You have done it every evening for eleven years. It settles you. Long strokes, on the stone, with a drop of oil.'),
 N('You look up. They are watching you. Their whole body is flat to the mattress. Their eyes are on the blade and they are not breathing.'),
 K76V('(Of course. A man at the foot of their bed in the evening, putting an edge on a knife.)'),
 N('You put the stone away. You put the scalpel in your collar. You go and sharpen it at the kitchen table instead, every evening, which the hounds find very confusing, and you do not tell them why.')]);
k86('v6_hunt','v',null,null,'The first of the four',[
 N('You find the first of the four. The one with the boot. It takes a man at the docks and a man at the registry and an envelope for each.'),
 N('You dress for it. The dark suit, the gloves, the coat. You go down the passage to say that you will be out, as you say everything now, so that they will not hear the far door and wonder.'),
 N('They see you in the doorway, dressed for work. You watch them go white. They think that you are going to fetch the tools.'),
 K76V('I shall be out for some hours.'),
 N('You sit in the car outside his flat for three of them. You watch him carry his shopping up the stairs. You watch him put his boots on the mat outside the door, side by side, the pair that did the ribs. It would take you four minutes.'),
 K76V('(The claim is theirs. Angel is right. I said so, at the gate.)'),
 N('You drive home. You have never in your life sat outside a man in his own street and gone home. You go down the passage to say that you are back, and they are still white, and they look at your hands, and your hands are clean, and you can see them not know what to make of that.')]);
k86('v6_cards','v',null,null,'Cards in the passage',[
 N('Ronin will not leave the passage, so you sit with him. A card table between you and the door, at two in the morning, for the rest of the week.'),
 [RN,'Gin. Again.'],
 K76V('You have a seven in your sleeve.'),
 [RN,'Prove it.'],
 N('You do not prove it. You deal again. He cheats, constantly and badly, and you let him, because he is a man who is two streets from a thing every night and needs to win something.'),
 [RN,'You’re a terrible card player, Vee.'],
 K76V('Yes.'),
 N('Through the door they are breathing slowly, for once. Ronin hears it too; you see his face change. He lowers his voice to a whisper, and cheats in a whisper, until it is light.')]);
k86('v6_reset','v',null,null,'The finger',[
 N('The third finger on the left hand was set by nobody. It has knitted crooked, a little, in four days. A finger that sets crooked on the trigger hand is a career.'),
 N('You will have to break it again. You know how. You tell them, from the door, what you are going to do, and why, and how long it will take, which is under a second.'),
 Ms('do it','Do it.','They hold the hand out to you, flat, without being asked, and turn their face away.'),
 N('You do it in under a second. They do not make a sound. They go white to the lips and look at the wall.'),
 K76V('(I have done that to men for answers. The same finger, the same angle. I have never done it to mend one.)'),
 N('You set it straight. You splint it. Afterwards in the scullery you find that you want very badly to find the man who let it set crooked, and do the same to all ten of his, slowly, and you write that on his page.')]);
k86('v6_board','v',null,null,'The board',[
 N('The board telephones about the gala. It is in nine days. You give the speech every year; they would like to confirm.'),
 K76V('I shall not be there.'),
 N('The chair is distressed. The chair reminds you that there are donors. The chair has a voice you have wanted to put through a wall for eleven years.'),
 K76V('Then hold it without me. You have done so for eleven years in every respect but the cheque. I shall send the cheque.'),
 N('You put the telephone down on him. Downstairs the bag needs changing. You go down, and change it, and find that you have just cancelled the one public engagement of the year without a moment’s thought, for a person who would shoot you if they could lift the rifle.'),
 K76V('(I have not missed it in eleven years.)')]);
k86('v6_pages','v',null,null,'Four pages',[
 N('You bring the four pages up to date at night. You enjoy it. You have not enjoyed the book this much in years.'),
 N('The bald one: laughed. The boot: the ribs, twice. The driver: looked away, and drove. The one with the green book: kept a record, in pencil, of what was done and when.'),
 K76V('(He kept a book. Of them. With times.)'),
 N('That one you write slowly. He is a bookkeeper. He did what you do. He sat with a pencil and wrote down a person in columns.'),
 N('Under his charges you write: “He will be asked to read it aloud. All of it. Then it will be read back to him.” You underline it twice. You have never underlined anything in the book before, and you sit and look at the line, and are not ashamed of it.')]);
k86('v6_mine','v',null,null,'The grey hound',[
 N('The grey hound will not settle. She lies across the infirmary door every night with her nose to the gap, and growls at the passage.'),
 N('You sit down with her on the stone at two. You put your hand on her neck.'),
 K76V('They are mine. Nobody else touches them. Not the four. Not the river. Not anybody.'),
 N('She looks at you. She knows the voice; it is the one you use when you put a thing on the table. She lies down with her chin on her paws, satisfied.'),
 K76V('(I said “mine”. I have said it of the house, and of the hounds, and of three people. It was the voice for the hounds. I did not choose it.)'),
 N('You sit with her until morning. You do not correct the word.')]);
k86('v6_hale','v',null,null,'Inspector Hale',[
 N('Inspector Hale telephones. A missing person: a delivery driver, lot fourteen. A streamer has been making a fuss. Did you know them? There was a matter in April, at the dinner.'),
 K76V('I have not seen them.'),
 N('He thanks you. He rings off. It was easy; it is always easy. You have lied to policemen for eleven years, in that voice, about things that would hang you.'),
 N('Then you open the ledger to your own page. There is one. You keep it as you keep the others, which is the only reason you trust the rest.'),
 N('“Lied to Hale. To keep them.”'),
 K76V('(To keep them from Hale, I wrote. I look at the line and I cannot make it say only that.)')]);
k86('v6_grade','v',null,null,'You are being graded',[
 N('They are grading your visits. You hear it through the door: they mutter the scores to themselves after you go. “Four.” “Three. Train.” “Six, but the tray was on the left.”'),
 N('You are not a man who has been graded since school. You mind.'),
 N('The tray goes on the right. You say the date in a slightly different voice. On Wednesday you are a minute late, on purpose, to see what it does, and hear them sit up, and never do it again.'),
 N('On Thursday you hear, very faintly, “seven.”'),
 K76V('(Seven. Out of ten. From a person who believes that I am going to kill them.)'),
 N('You go upstairs and stand in the kitchen, and are more pleased than by anything the board has said to you in a decade.')]);
k86('v6_fit','v',null,null,'The fit',[
 N('They have a fit at two in the afternoon. You are in the kitchen. You hear the drip stand go, and the noise in the throat, and you are through the door in nine seconds.'),
 N('By the fourth second you know. The eyes are too steady. The arch is too good. You have seen real ones, in hounds and in men, and real ones are not choreographed.'),
 K76V('(They are timing me.)'),
 N('You go on anyway. Head, jaw, the whole drill, as if it were real, and when they open their eyes and look at you, you do not let go.'),
 K76V('Do that again and I shall come again. Every time. I should like you to know that, before you decide.'),
 N('In the kitchen afterwards you find that you are shaking. You had known it was false by the fourth second, and you had run the rest of the way in exactly the same terror.')]);
k86('v6_laugh','v',null,null,'The rottweiler',[
 N('“The rottweiler eventually lets go.”'),
 N('You keep your face still. You have kept your face still across a table from men who were telling you, in detail, what they had done to children. You pick up the tray. You go out.'),
 N('In the passage it gets out. Once, through the nose, hard. You put your sleeve over your mouth and stand there with your eyes watering.'),
 K76V('(It is a very good joke. It is accurate. I do not let go.)'),
 N('You stand in the passage for a full minute, recovering, a grown man with a tray, hiding a laugh from a person who wants him dead. It is the first time you have laughed since the river. You did not know that you had stopped.')]);
k86('v6_spotter','v',null,null,'Calling it back',[
 N('At three they are on a roof. You hear it from the passage: the drip is high, and they are calling wind at the ceiling. “Left to right. Four. He’s coming out the side door.”'),
 N('You know that roof. The laundromat. You stood under it in April with the field glasses and watched them on it for three nights, and they knew, and waved.'),
 N('Before you have decided anything you are in the doorway.'),
 K76V('Left to right, four. I have him.'),
 N('They go quiet. For a second their face is the face you saw through the glasses: easy, sure, at work, with somebody on the roof with them.'),
 N('Then it goes. They turn to the wall. You stand in the door and know that you gave them a second of the thing they do best, and that it came from the wrong man, and that you would do it again.')]);
k86('v6_crackers','v',null,null,'The crackers',[
 N('There is a word on the tray, spelled out in crackers. Four letters. Facing the door.'),
 N('You read it from the doorway. You have been called it before, by better-funded people.'),
 N('The C is very good. They have made it out of two crackers, broken to a curve, with one good hand, in what must have been an hour. You look at the C for some time.'),
 K76V('The C is very good.'),
 N('You take the tray. The next tray has eleven crackers on it, because the full sentence they will want is eleven letters, and you have worked out which sentence. It is the least that you can do for craftsmanship.')]);
k86('v6_notebook','v',null,null,'The insults',[
 N('They come off the drip and for two days they are the worst-tempered creature you have ever had in the house, and you have had a wolverine.'),
 N('Everything you do is wrong. Your face is too big. Your hounds are ugly. Your house smells of a museum. Your cufflinks are a cry for help.'),
 N('You take out a notebook and write them down. All of them, word for word, with the times.'),
 K76V('(It has been a week of “thank you” in a voice that was not theirs. These are theirs. Every one.)'),
 N('You read them over at night, in the study, by the lamp. You laugh at the cufflinks until you have to put the notebook down. Then you go and look at your cufflinks in the mirror for some time, and change them.')]);
k86('v6_angelnight','v',null,null,'Angel, at the kitchen table',[
 N('Angel sits at your kitchen table at one in the morning with the shotgun across her knees and her shoes off.'),
 [AN,'i’m not going home. somebody has to sit up. you don’t count. you’re the warden.'],
 K76V('I am not their warden.'),
 [AN,'babe, in that room you’re the warden. i’m the visitor. ronin’s the guy in the car park. it’s fine. everybody has a job.'],
 N('She is right. She usually is, about rooms. She has been on camera for a decade; she knows what a person sees.'),
 [AN,'when they can hold the rifle, you’re going to give them the names. i want to hear you say it.'],
 K76V('When they can hold the rifle, I shall give them the names.'),
 [AN,'good. now make me a coffee. warden.']]);
k86('v6_ledgerentry','v',null,null,'One line a night',[
 N('Each night you bring their page up to date. It is the habit of eleven years; you do not know another way of ending a day.'),
 N('“Ate. Called me a name that Ronin will have to explain. Temperature down.”'),
 N('“Ate half. Did not speak. Sang the carpet advertisement for eighty minutes; did not know the second verse.”'),
 N('“Graded me. Seven.”'),
 K76V('(None of it is a charge. I have not entered a charge on their page since April.)'),
 N('You look at the page. It used to be the longest charge sheet in the book. It is turning into something else, a line a night, and you do not have a heading for what it is turning into, and you do not stop writing it.')]);
k86('v6_coat','v',null,null,'The coat on the hook',[
 N('The coat from the river is on the hook by the scullery door. The collar has their teeth through it, both rows.'),
 N('Your housekeeper of nine years takes it down to have it mended. You are short with her. You have never been short with her. She hangs it back up and goes home and does not come back for a week.'),
 K76V('(It is the last thing they did before I had them. They bit. They meant it. I should like to keep the evidence that they meant it.)'),
 N('You go past it every time you go down to them. You put your thumb on the holes. It is a habit now. You are not sure when it became one.'),
 N('In the spring you have the coat cleaned, and the collar left exactly as it is, and you wear it again, with their teeth in it, and anybody who asks is told that a dog did it.')]);

/* ===================================== ENDINGS ===================================== */
const _xe106=extraEnding;extraEnding=function(){const L=_xe106();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const F=S.f.e2l85||{},G=S.f.e2l84||{};
 if(G.b6_review)L.push('Misaki’s review of V’s infirmary hangs by the door in a black frame. Two stars. “Management regrets the soup.”');
 if(G.b6_contract)L.push('“Party B declines. Party B was collecting his own property. No debt arises. —K9.” Misaki kept it.');
 if(G.b6_river||F.v6_coat)L.push('V wears the coat from the river. There is a bite through the collar, both rows. He tells people a dog did it.');
 if(F.m6_jingle)L.push('There is a second verse to the carpet warehouse jingle, in the version they ran in the east of the city. Misaki has since learned it.');
 if(F.m6_crackers||F.v6_crackers)L.push('V once gave Misaki eleven crackers, enough for the full sentence.');
 if(F.x6_sandwich)L.push('V once bought fourteen petrol station sandwiches. The young man at the till thought that he was going to be killed. V had not decided.');
 if(F.x6_withdrawal||F.v6_notebook)L.push('V keeps a notebook of the insults from Misaki’s second day off the drip. He changed his cufflinks.');
 if(F.m6_scale)L.push('In the infirmary V asked for Misaki’s pain by calibre. Hand, 9mm (hollow point).')}catch(e){}return L};
/* ===KC106-END=== */
