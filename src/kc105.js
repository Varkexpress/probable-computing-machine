/* ===KC105-BEGIN=== */
/* ===================== THE WAR: WHAT IT COSTS TO MEND (kc105) =====================
   Replaces an earlier kc105 (“the long nights”), withdrawn at the author's direction. Needs kc73, kc76–kc104.
   Thirty-four scenes in kc85's player-opened pool (now 242). Pain and the delusion, and the things beside them: what
   the injuries cost, whom they cost, and what the four men from the river turn out to be connected to.
     Misaki, cell:   w_ribs  w_itch  w_tooth  w_pump  w_faces  w_tremor  w_ear  w_clutch  w_nails  w_ankle  w_paper  w_straw  w_lullaby
     Misaki, clear:  w_cost  w_photo  w_client  w_stairs  w_taste  w_wake  w_angelmsg  w_lace
     V:              w_pumpV  w_earV  w_itchV  w_ronin  w_school  w_stairsV  w_angel  w_nailsV  w_ankleV  w_paperV  w_bookV  w_laceV  w_facesV
   While the room is a cell, Misaki believes that the tall one is K9, who holds them and means to kill them; they
   never warm to him, and their anger seethes. Same text under both aftermath settings.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via M2 and they/them.
   Notes: docs/notes_kc105.md. Tested in tools/k86_test.js and tools/k105_test.js. */
const K105=()=>{try{return typeof K104==='function'&&K104()}catch(e){return false}};

/* ===================================== MISAKI, CELL ===================================== */
k86('w_ribs','m',null,'cell','Breathe in quarters',[
 N('A whole breath is not possible. That was the first thing the first day taught you. The ribs stop it halfway, like a hand on your chest.'),
 N('So you breathe in quarters. A quarter in, hold, a quarter in, hold. You can get to three quarters before it catches. You do it all day. It is like climbing a ladder with a rung missing at the top.'),
 M2('(three. hold. don’t go for four. four’s where it bites)','(three. hold. don’t go for four. four is where it bites)'),
 N('The worst is when he comes in. The catch makes a sound, a small click in the throat, and you will not let him hear it.'),
 N('So you learn his step. You time it. Four steps from the door to the bed, and you breathe on the second and the fourth, when his shoe comes down, so that the shoe covers it.'),
 M2('(he walks loud so i’ll know he’s coming. fine. now his feet are mine too)','(he walks loudly so that i’ll know he’s coming. fine. now his feet are mine too)'),
 N('You do it for two days. On the third he stops halfway across the room, for no reason, and you are caught on an in-breath with nothing to hide it.'),
 N('The click is very loud. He stands there. Then he takes the last two steps more heavily than he has ever walked in his life, and sets the tray down with a bang, and goes, and you lie there and do not know whether he heard.')]);
k86('w_itch','m',null,'cell','Under the cast',[
 N('The itch starts on the second night, under the cast, halfway between the wrist and the knuckles, where no finger can go.'),
 N('Pain you can do. You have done pain since you were small; it has rules, and you know them. This has no rules. It is a fly in a jar inside your arm.'),
 M2('(don’t think about it. think about the wind tables. four hundred, ten, two point —)','(don’t think about it. think about the wind tables. four hundred, ten, two point —)'),
 N('It does not care about the wind tables. By three in the morning it is the only thing in the room. You would tell him anything to make it stop.'),
 N('You get the spoon handle down inside the cast. It is too short. You push. Something tears, and the itch goes, and there is a warm wet feeling instead.'),
 N('In the morning there is a brown stain on the edge of the cast. You put your arm under the blanket. He will see. He sees everything.'),
 M2('(worth it. it was worth it. i’d do it again. …i’d do it again tonight)','(worth it. it was worth it. i would do it again. …i would do it again tonight)')]);
k86('w_tooth','m',null,'cell','The tooth',[
 N('The broken tooth has an edge. Your tongue goes to it. It goes to it all day, a hundred times an hour, and every time the edge takes a little off.'),
 N('By the afternoon the side of your tongue is raw and everything tastes of coins. You tell your tongue to stop. It goes back to the tooth while you are telling it.'),
 M2('(leave it. LEAVE IT. it’s a tooth. u’ve been shot)','(leave it. leave it. it’s a tooth. you have been shot)'),
 N('You have been shot. Twice, and once with a nail gun, which does not count but hurt more. None of it got into your head like this. A bullet is done with you in a second. The tooth is there every time you swallow.'),
 N('You put a corner of the blanket between your teeth to keep the tongue off it. You lie there like that half the night, chewing a blanket in a basement, like a dog, and you think of the four, and of which of them did the tooth, and you add it to his account.')]);
k86('w_pump','m',null,'cell','The pump beeps',[
 N('The pump on the stand beeps when the bag runs low. Three short notes, and then again, every minute.'),
 N('The pain arrives before he does. It comes up from the ribs and the hand and the wrists together, as if it had been standing behind a door waiting for the beep.'),
 N('And you listen for his shoes. You hate it more than anything in the room. You lie there with your whole body straining for the sound of the man who is going to kill you, because he is the only thing in the building that can stop this.'),
 M2('(come on. come ON. where are u. u’re always — )','(come on. come on. where are you? you’re always — )'),
 N('He is there before the third beep. He always is. He changes the bag without a word and turns the wheel and the pain goes back behind its door.'),
 N('You do not look at him. You look at the wall, and your face is wet, and it is not from the pain, and you would kill him for having seen it if you could lift your arm.'),
 M2('(that’s how they get u. u know that. u’ve done it to people. make them need u. then u’re god)','(that’s how they get you. you know that. you have done it to people. make them need you. then you’re god)')]);
k86('w_faces','m',null,'cell','Keep the faces',[
 N('You keep the four in your head. The bald one. The boot. The driver. The one with the book. You go over their faces every night, so that when you are out you will know them in a crowd.'),
 N('Tonight the bald one has no face. You have his head, and the shine on it, and the laugh. You go for the eyes and there is a smear, like a thumb on a lens.'),
 M2('(no. no no. u HAD him. u had him this morning)','(no. no. you had him. you had him this morning)'),
 N('The bag. It is taking them. It took the eight-hundred-metre table and now it is taking the men, and in a week you will be out, and you will walk past the bald one in a queue, and buy him a coffee.'),
 N('You go over the other three, hard, until your head aches. The boot is there. The driver is there, looking away. The one with the book is going. You hold on to the book: green, cloth, with a pencil in the spine.'),
 M2('(if i can’t have his face i’ll have his book. i’ll find every green book in this city)','(if i can’t have his face, i’ll have his book. i will find every green book in this city)'),
 N('You say the four of them over in the dark like a prayer, and each night they are a little shorter.')]);
k86('w_tremor','m',null,'cell','Your hand shakes',[
 N('You hold up the good hand, the right, in front of your face, to see if it is still good.'),
 N('It shakes. Not much. A fine shiver at the ends of the fingers, like a leaf in a draught. You hold it still. It goes on shaking.'),
 M2('(the drip. it’s the drip. everybody shakes on this stuff)','(the drip. it’s the drip. everybody shakes on this stuff)'),
 N('You know what a tremor is to somebody in your work. At six hundred metres the width of a hair at the shoulder is a man’s width at the other end. A sniper with a shake is a person who used to be a sniper.'),
 N('You hold the hand up for an hour. You try everything: breathing, counting, pressing it flat on your chest. It shakes against your chest. You can feel your own heart through it.'),
 N('When he comes in, you put the hand under the blanket so fast that it hurts the ribs. He is not going to have that as well.')]);
k86('w_ear','m',null,'cell','The left ear',[
 N('Since the van there has been a ringing in the left ear. High and thin, like a wet finger round a glass. You thought it would go. It has not gone.'),
 N('He says something from the door, and you do not hear it. You see his mouth move. You turn your head, slowly, so that the right ear is to him.'),
 M2('(don’t let him see. turn ur head like u’re just looking. like u’re bored)','(don’t let him see. turn your head as if you’re just looking. as if you’re bored)'),
 N('A shooter needs both ears. You hear a shot before you see it, and you know where it came from by the difference between the two sides. With one ear the world comes from nowhere. Everything is in front of you and behind you at once.'),
 N('He says the thing again. Louder. He has seen. He has seen, and he is speaking up for you, like a man speaking to his old father in a hospital.'),
 N('You look at the wall. You do not answer. You lie there with the ringing in one ear and his kindness in the other.')]);
k86('w_clutch','m',null,'cell','The clutch',[
 N('You dream that you are driving the truck. It is night, on the ring road, with the window down. You change down for the roundabout, and your left foot goes for the clutch.'),
 N('You wake with your leg kicking at nothing under the blanket. The ribs catch it. You lie gasping, three quarters of a breath, with the leg still twitching for a pedal that is in a car park somewhere across the city.'),
 M2('(the truck. who’s got the truck. did they leave it in the lot. is it towed. is it — )','(the truck. who has the truck? did they leave it in the lot? is it towed? is it — )'),
 N('You own it outright, the one thing you do. Bought for cash at nineteen, from a man who had used it to move pianos. It has a dent in the door where a mark kicked it and a smell you would know blindfolded.'),
 N('You will never drive it again. You do not know that, but in here you believe it, all the way down, the way you believe in the drain.'),
 N('Your foot goes on looking for the clutch on and off for the rest of the night. You let it.')]);

/* ===================================== MISAKI, CLEAR ===================================== */
k86('w_cost','m',null,'clear','What this would have cost',[
 N('You do the sum. You cannot help it; it is what your head does with anything it is left alone with.'),
 N('Four days on a drip. Films. Pins. A nurse in a cardigan. A room, a man, a surgeon’s hands, round the clock. You priced a hospital once, for a client who wanted to know what a broken leg cost a man with no insurance. You remember the figure.'),
 M2('(twenty grand. thirty. more. and that’s if u don’t climb out the window)','(twenty grand. thirty. more. and that’s if you don’t climb out of the window)'),
 N('You have ninety dollars. You had ninety dollars. You will have nothing, because you cannot work with one hand, and the rent is due on the first whether or not you are in a basement.'),
 N('You could not pay for a week of this if you worked the rest of your life. You lie there doing it over, adding a little each time, a bandage, a bag, until the number is so big that it stops meaning anything.'),
 N('He will never send a bill. You add it up again anyway.')]);
k86('w_photo','m',null,'clear','The photograph',[
 N('Angel brings a photograph, printed, because she says screens are for people who do not mean it. It is from last summer: the four of you at the bowling alley, on a Thursday, with the bad pizza.'),
 N('You are in the middle. You are laughing at something Ronin has done with a straw. Your hair is long. Both your hands are up in the air, open, all ten fingers.'),
 [AN,'i thought you’d want it. for the wall. so it’s not just tile.'],
 M2('yeah. thanks','yeah. thanks'),
 N('You look at the person in the middle. You know everything about them. You know what they ate that night and what was in their pockets. You do not know them at all.'),
 N('When she has gone, you put the photograph face down on the counter. The person in it is looking back at you, laughing, with ten good fingers, and has no idea.'),
 M2('(enjoy it, kid. ur having a great summer)','(enjoy it, kid. you’re having a great summer)')]);
k86('w_client','m',null,'clear','A message from a client',[
 N('He has given you your phone back. There are two hundred and eleven messages from Angel. You have not opened them. There is one from a client.'),
 N('“u available fri? usual rate. warehouse job, easy, 300m.”'),
 N('You type “yes”. You look at it. Three hundred metres. You could have done it with your eyes shut. You look at the cast on your left arm and delete it.'),
 N('You type “no”. You delete that too. If you say no, he will ask somebody else, and the somebody else will get the next one, and the one after. Clients do not wait. Nobody in your line of work has ever got a job back.'),
 M2('(say ur sick. no. say ur busy. say anything. say SOMETHING)','(say you’re sick. no. say you’re busy. say anything. say something)'),
 N('You type and delete for an hour. In the end you do not answer at all. At midnight the message says “seen”, and the man knows that you saw it and did not answer, and that is an answer too.'),
 N('You lie there and understand that you have just lost your best client by being in bed.')]);
k86('w_stairs','m',null,'clear','The stairs',[
 N('You decide that you are going up the stairs. Fourteen steps, from the passage to the kitchen. You told him not to help. You said it twice.'),
 N('He stands at the bottom with his hands behind his back.'),
 N('You make four. On the fifth your legs go to water and you sit down hard on the step, and the ribs take it, and you hold on to the rail with the good hand and breathe in quarters.'),
 M2('(get up. get UP. ten more. u’ve climbed a crane in the rain)','(get up. get up. ten more. you have climbed a crane in the rain)'),
 N('You cannot get up. You sit on the fifth step for twenty minutes. He stands at the bottom for twenty minutes. He does not come up. He does not say anything. He is doing exactly what you asked, and every second of it you hate him for it, and you know that if he took one step you would hate him more.'),
 N('In the end you go up on your backside, one step at a time, with your back to the top, like a small child. You do not look at him once. At the top you sit on the kitchen floor and shake. You have done it. He watched every step.')]);
k86('w_taste','m',null,'clear','Nothing tastes',[
 N('Nothing tastes. It is the drip, or the tongue, or something else. The soup is warm wet. The bread is soft dry. Ronin brings you a bag of the sour sweets you have liked since you were twelve, and they are like chewing a pencil eraser.'),
 [RN,'Them’s your ones, right? The green ones?'],
 M2('yeah. they’re great','yeah. they’re great'),
 N('You eat the whole bag in front of him so that he will see you liking them. He watches you, pleased, with his rings going round.'),
 N('You used to buy a cake at the petrol station, a yellow one in a plastic box, and eat it all on your step once a year. You think about it now and cannot remember what it tasted like. Only that it was good, and that you looked forward to it.'),
 M2('(it’ll come back. taste comes back. …right?)','(it will come back. taste comes back. …right?)'),
 N('You lie awake and try to remember the yellow cake, the exact taste, and get the colour of the box and the man at the till and nothing else, and it is a stupid thing to cry about, and you do.')]);

/* ===================================== V ===================================== */
k86('w_pumpV','v',null,null,'Three short notes',[
 N('The pump beeps at three in the morning. You are at the door before the second set. You sleep in the passage on a chair on the nights the bag is low, for this.'),
 N('They are lying rigid, with their eyes open and their face wet. The pain got there first. It always does; there is a minute between the beep and the bag, and you cannot make it shorter than that.'),
 K76V('(One minute. I have timed it. I have run down that passage in fifty seconds. They spend it waiting for me.)'),
 N('You change the bag. You turn the wheel. You watch their breathing ease, and you watch them turn their face to the wall so that you will not see it ease.'),
 N('You know what they are thinking. You have read about it; you have seen it done to others, and avenged it. They think that you have made them need you, on purpose. That is the method.'),
 N('You go back to your chair in the passage. You sit there until five, with your watch in your hand.')]);
k86('w_earV','v',null,null,'The left side',[
 N('They did not hear you. You said the day of the week from the door, and they lay still, and then turned their head, slowly, as if they were bored, so that the right ear was towards you.'),
 N('You know what that is. You have seen a hound do it after a blast. The left drum, then. From the van, or the night with the boot.'),
 N('You say it again, louder. You hear yourself. You sound like a man in a ward speaking to his father.'),
 K76V('(I have made it worse. I have shown them that I saw.)'),
 N('After that you come in on the right side of the bed. Always. You walk round the foot of it to do so, every time, eleven extra steps. You speak at your usual pitch, but from the right, and nearer.'),
 N('You book the specialist for when they are clear, under a false name, and pay in advance. You do not tell them. You put it in the ledger, under their page, as a thing owed to them.')]);
k86('w_itchV','v',null,null,'Blood on the cast',[
 N('There is a brown stain on the edge of the cast. You know at once what it is. You have had it with hounds in cones.'),
 N('You lift the edge with a probe while they pretend to sleep. The skin under it is torn in three lines. Something thin and hard has gone down there and dragged.'),
 K76V('(The spoon. They would rather tear their own arm than ask me for anything. I respect it. I should like to break something.)'),
 N('You clean it. You trim the cast edge, and pad it. They do not open their eyes, and their jaw is so tight you can see the muscle.'),
 N('That evening you put on the tray, beside the bowl, a long smooth stick of beech that you have spent an hour in the workshop shaping and sanding until it would not mark a baby. It is exactly the right length to reach under the cast. You say nothing about it.'),
 N('In the morning it is in the bin. In the night, through the door, you hear the scratch of wood on plaster, on and on, and then a sigh, and you stand in the passage with your hand over your mouth.')]);
k86('w_ronin','v',null,null,'“How bad”',[
 [RN,'How bad is it?'],
 K76V('Three fractures to the left hand. Four ribs, two displaced. Bruising to the left kidney, resolving. A tooth. Lacerations to both wrists, healing well. The left eardrum, I think, perforated. A fever which has broken.'),
 [RN,'No. I didn’t ask what’s broke. I asked how bad.'],
 N('You look at him. You have the films in your head. You have every number.'),
 K76V('I do not know what you are asking.'),
 [RN,'Yeah, you do. Is the kid in there? When you go in. Is it them?'],
 N('You open your mouth. You think of the face to the wall, the wet cheek after the pump, the head turned slowly so as to seem bored. You think of the way they used to come into a room in April, like weather.'),
 K76V('I have the injuries. I can give you every one of them.'),
 [RN,'That’s a no, then.'],
 N('He goes out. You stand in the kitchen and find that you are holding the edge of the counter, and that you cannot let go of it.')]);
k86('w_school','v',null,null,'A name you know',[
 N('You find the third of the four. The one who drove. It takes a week and a man at the registry who owes you.'),
 N('He has a daughter. She is nine. She is at the school whose fees you pay for another child of nine: the girl whose father was shot on his step on a Tuesday, by the person in your infirmary, for money.'),
 N('They are in the same class. You have the register. They sit two desks apart.'),
 K76V('(I pay for one of them because of what was done to her father. I am going to do something to the father of the other.)'),
 N('You sit with the two names on your desk, side by side, for most of the night. You have never had doubts about a page. You do not have doubts now; he drove the van, and the wrists are what they are.'),
 N('But you set up a second fund before morning, through four accounts, for a child who has not lost anybody yet. You know what that makes you. You do it anyway, and do not enter it in the book.')]);
k86('w_stairsV','v',null,null,'Fourteen steps',[
 N('They are going up the stairs. Fourteen steps. They have told you twice not to help.'),
 N('You stand at the bottom with your hands behind your back. You have had men under a scalpel who did not move; you can stand still.'),
 N('They make four. On the fifth they go down. You hear the ribs take it, the breath catch at a quarter. Your whole body goes forward an inch and stops.'),
 K76V('(They asked me for one thing in this house. I will give it to them if it kills me.)'),
 N('Twenty minutes. You do not move. They sit on the fifth step breathing in quarters with their back to you and their hand white on the rail.'),
 N('Then they go up on their backside, a step at a time, facing down, towards you, without once looking at you. You stand there and watch the most stubborn thing you have ever seen climb nine steps like a child, and at the top they sit on the kitchen floor and shake, and you have not moved, and your hands behind your back are bleeding where your nails went in.')]);
k86('w_angel','v',null,null,'Angel, at two in the morning',[
 N('Angel is in your kitchen at two in the morning, in a coat over pyjamas, eating your cereal out of the box. She does not explain how she got in.'),
 [AN,'will they be them again.'],
 K76V('I do not know.'),
 [AN,'liar. you always know. you knew where they were before anyone. you know what everyone in this city had for breakfast.'],
 K76V('I do not know this.'),
 N('She looks at you over the box, chewing. She has her own face on, the real one, with nothing on it, which you have seen perhaps twice.'),
 [AN,'that’s the first time i’ve ever heard you say that and mean it. i don’t like it.'],
 K76V('Nor I.'),
 N('She puts the box down. She comes round the island and puts her arms round you, briefly, hard, which she has never done, and smells of somebody else’s house. Then she goes, the way she came, without saying how, and you stand with the cereal and do not know what to do with your arms.')]);

/* ===================================== MORE ===================================== */
k86('w_nails','m',null,'cell','He holds the hand',[
 N('Two of the nails on the left hand are gone. The beds are raw and pink and throb with your heart. Everything catches on them: the blanket, the sheet, the air.'),
 N('He has to hold the hand to dress it. He takes it by the wrist, below the cast, and turns it to the light, and the two raw fingers are right there under his thumb.'),
 M2('(now. he’ll press now. that’s what u’d do. that’s what they did)','(now. he’ll press now. that’s what you would do. that’s what they did)'),
 N('You wait for it. Every muscle you have is waiting for it. He has the dressing and the tape, and his thumb is a quarter of an inch from the left fingers, and you can see his nails, short, square, very clean.'),
 N('He does not press. He dresses the two fingers with the tips of his own, as if they were wet paint, and lets go of the wrist, and steps back.'),
 N('You lie there with your heart going in your fingers. You were ready, and it did not come.'),
 M2('(next time. he’s saving it. he’s waiting for when i stop waiting)','(next time. he’s saving it. he’s waiting for when i stop waiting)')]);
k86('w_ankle','m',null,'cell','Stand up',[
 N('You decide to find out whether you can stand. Not to run. Only to know. At three in the morning, when he is furthest off.'),
 N('You get your legs over the side. You get the drip stand in the good hand. You put weight on the right foot, and then the left.'),
 N('The left ankle goes like a wet stick. You did not know about the ankle. Something they did with the ties. You are on the floor before you have understood it, on the tile, on your side, with the stand on top of you and the line pulled tight.'),
 M2('(get up. get up before he comes. he can’t find u like this)','(get up. get up before he comes. he can’t find you like this)'),
 N('You cannot get up. You try for an hour. The ribs will not let you turn and the ankle will not hold and the good hand cannot find anything to pull on but the bed, which rolls.'),
 N('So you lie on his floor, under the stand, with your cheek on the tile, and you wait for morning. It is very cold, and very bright, and the green light blinks on and off over you, and you do not call out. You would die on that floor first.')]);
k86('w_paper','m',null,'cell','The tray is lined with newspaper',[
 N('The tray is lined with a sheet of newspaper, to catch the soup. You read it, because there is nothing else to read.'),
 N('Page seven, at the bottom, a paragraph. Concern grows for a local delivery driver missing since Thursday. A streamer with a large following has appealed for information. Police are not treating the disappearance as suspicious.'),
 N('It is you. It must be you. They have the age wrong, and they call you a delivery driver because that is what it says on the trailer’s lease, which you lied on.'),
 M2('(not suspicious. NOT SUSPICIOUS. i got put in a van)','(not suspicious. not suspicious. i was put in a van)'),
 N('Four lines, between a council meeting and a sale on patio sets, wrong about your age. Under it there is an advertisement for garden furniture.'),
 N('You fold the paper very small and put it under the mattress. Then you take it out again and read it eleven times.')]);
k86('w_wake','m',null,'clear','Leave the door open',[
 N('You know where you are now. You know whose room it is. It does not help at night.'),
 N('At night it is the river. Every night. You wake up with your mouth open and no sound coming out of it, and the room is the other room for a second, two seconds, three, and then it is not.'),
 N('Every time, when it stops being the other room, he is in the doorway. Not in the room. In the doorway, with his hands where you can see them, against the frame.'),
 M2('(he never comes in. not once. he just stands there till i’m back)','(he never comes in. not once. he just stands there until i’m back)'),
 N('On the fourth night you tell him to leave the door open. He asks whether you are certain. You say that you want to be able to see him not coming in.'),
 N('He leaves it open. At three you wake, and it is the river, and then it is not, and there is the open door, and the passage, and a kitchen chair out there in the light with him on it, not coming in.')]);
k86('w_angelmsg','m',null,'clear','Two hundred and eleven',[
 N('You open them at last, at two in the morning, under the blanket, so that the screen will not light the room.'),
 N('The first night is all capitals. WHERE ARE YOU. PICK UP. MISAKI PICK UP. Then numbers, which you work out are the plates of vans. Then, on the third night, a list: every hospital in the city, with a line through each.'),
 N('Then it changes. On the fifth day she starts telling you things. “it’s tuesday. ronin burned toast in v’s kitchen and the alarm went off and v stood under it for a full minute before he moved.” “the grey dog sleeps on your hoodie.” “i did a stream. didn’t mention you. numbers were bad lol.”'),
 M2('(she kept talking to me. like i was there. like i’d read it after)','(she kept talking to me. as if i were there. as if i would read it after)'),
 N('She did not know whether you were alive. She went on telling you about the toast anyway, every night, at about two, which is when you know she cannot sleep.'),
 N('You read all two hundred and eleven. It takes until five. At the end you type “im here”. You look at it until the screen dims. Then you send it, and lie with the phone on your chest, and it buzzes before you have got your hand off it.')]);
k86('w_nailsV','v',null,null,'Two fingers',[
 N('Two nails are gone from the left hand. You know how they went. It is a slow thing, and you know men who do it, and you have fed one of them to the hounds.'),
 N('You take the wrist to turn the hand to the light. You feel the whole arm go rigid in your grip, from the shoulder down.'),
 N('They are waiting for you to press. It is in every line of them. They have worked out that a man who holds a hand like this will press, because the last men who held it did, and they have got themselves ready.'),
 K76V('(I could press. I know where. I know how much. I have done it to people to learn what they knew, and it worked.)'),
 N('You dress the two fingers with the tips of your own, as lightly as you would touch wet paint, and let go, and step back.'),
 N('They stay rigid long after you have stepped back. They are still waiting. You go out and stand in the passage with your hands in your pockets, where nobody can see them.')]);
k86('w_ankleV','v',null,null,'They are on the floor',[
 N('At six you find them on the floor. On their side on the tile, under the drip stand, with the line pulled taut and their cheek against the cold. Their eyes are open.'),
 N('The left ankle is the size of a fist. You had not known about the ankle. They did not tell you. Nobody told you.'),
 N('You go to lift them, and they say “don’t.” It is the first word they have said to you in two days.'),
 K76V('(They have been on the floor for three hours rather than call out. They would rather die there than be lifted by me.)'),
 N('So you do not. You sit down on the tile in the doorway, at their level, with your back against the frame, and wait. You wait while they get an arm onto the bed, and fail, and get it there again. It takes them forty minutes. You do not move.'),
 N('When they are on the mattress, face to the wall, you strap the ankle without a word, and they let you, because they cannot stop you, and their foot is rigid in your hands the whole time.')]);
k86('w_paperV','v',null,null,'Page seven',[
 N('You line the tray with newspaper to catch the soup. You did not look at the page.'),
 N('When you come back for the tray it is gone. The bowl is on the bare steel. They are lying with their back to you and one hand under the mattress.'),
 N('You find a copy of the same edition in the study and go through it until you find it. Page seven, four lines. Concern grows. Not suspicious. Next to the garden furniture.'),
 K76V('(I lined their tray with it. I gave them the city’s opinion of them, with their soup, and did not look.)'),
 N('You do not take it from under the mattress. It is theirs now.'),
 N('From that day you burn every newspaper that comes into the house before it reaches the kitchen. You read them standing at the stove, and put them in, page by page, and line the trays with greaseproof paper.')]);
k86('w_bookV','v',null,null,'FOR FUN',[
 N('Their go-bag is in your study, where you put it on the night of the river. You have not opened it. Tonight you do, to find a toothbrush.'),
 N('There is a notebook in it with FOR FUN written across the top in capitals. Inside, page after page, in pencil, there is mathematics. Calculus, mostly, done fast, with crossings-out and a little drawing of a frog in the margin when a thing came out right.'),
 N('You have a good education. You were expensively taught. You cannot follow the third page. By the tenth you are not sure what it is about at all.'),
 K76V('(They left school at thirteen. They did this in a truck, by torchlight, after shooting men, to relax.)'),
 N('On the last page there is a problem not finished. It stops halfway down, in the middle of a line, on the Wednesday before the river.'),
 N('You sit with it under the lamp until the clock in the hall strikes. You think of what they might have been, with a table and a lamp of their own. You think that the four men did not take that from them; it was gone long before. Then you put the notebook back exactly as it was, with the pencil in the spine, so that they will find it there when they can hold a pencil.')]);

k86('w_straw','m',null,'cell','A straw',[
 N('You cannot hold the cup. The good hand shakes too much on the drip, and the other is in plaster. The first time you tried, it went down your front.'),
 N('So he holds it. He stands at the side of the bed with the cup, and there is a bent paper straw in it, and he holds it at the height of your mouth and waits.'),
 M2('(drink from his hand. like a calf. like something he’s raising)','(drink from his hand. like a calf. like something he is raising)'),
 N('You are so thirsty that your tongue is stuck to the roof of your mouth. You look at the straw. You look at his hand round the cup, very still, the knuckles big.'),
 N('You turn your head away. You lie there with your mouth like sand and your face to the wall, and you hear him wait, and wait, and put the cup down on the counter, with the straw still in it, where you cannot reach.'),
 N('An hour later you get it with the shaking hand, by pulling the counter cloth until the cup slides to the edge. Half of it goes on the floor. You drink the half that is left with your teeth on the paper straw, alone.')]);
k86('w_lullaby','m',null,'cell','Somebody is humming',[
 N('The bag is high. The ceiling has a slow tide in it. And somewhere a woman is humming.'),
 N('Not in the room. Not in the passage. Further off, and further back, like a sound from the other side of a lot of years. A tune you do not know, low, going round and round the same five notes.'),
 M2('(who’s that. there’s no woman here. it’s the bag. it’s the BAG)','(who is that? there is no woman here. it’s the bag. it’s the bag)'),
 N('You know it is the bag. But you know the tune. You do not know where from. You have no memory before nine that you would put your name to; there is a hole there the shape of a whole childhood, and you have always been glad of it.'),
 N('It goes round. Five notes. Somebody was holding you once, while it went round. You are sure of that with your whole body and you cannot see a face, or a room, or anything at all.'),
 M2('(don’t. don’t go looking. there’s nothing in there. there was never anything in there)','(don’t. don’t go looking. there is nothing in there. there was never anything in there)'),
 N('When the bag is changed in the morning the humming stops. You lie and try to get it back for the rest of the morning, and cannot.')]);
k86('w_lace','m',null,'clear','Tie a shoelace',[
 N('There are new boots under the bed. Your size. He bought them because yours let in water. You put them on to walk to the kennel, and you have to tie them.'),
 N('You cannot tie a lace with one hand. You did not know that. You have stripped a rifle one-handed in the dark. You sit on the bed and try for twenty minutes, with the good hand and your teeth and your knee, and the loop keeps falling.'),
 M2('(it’s a SHOELACE. u’re a professional killer. kids do this)','(it’s a shoelace. you are a professional killer. children do this)'),
 N('You will not ask. You will walk to the kennel with the laces dragging. You will go everywhere with them dragging until the plaster comes off, and anybody who looks can look.'),
 N('In the morning the laces have gone. In their place, threaded through the eyelets, is a cord of black elastic, knotted at the top, so that the boot goes on with one hand and stays.'),
 N('You sit there holding the boot, so angry that you can feel it in your teeth. Then you put it on, and it fits, and you walk to the kennel in it, and you wear them every day.')]);
k86('w_laceV','v',null,null,'Elastic',[
 N('From the passage you watch them try to tie a lace for twenty minutes. The good hand, the teeth, the knee. The loop falls. They try again. They do not ask.'),
 N('They go to the kennel with the laces dragging. You see them at the gate, and the old hound treading on the end of one, and them not looking down.'),
 K76V('(They will go about with their laces undone for six weeks rather than let me kneel at their feet. I should do the same.)'),
 N('That night you take the boots from under the bed while they sleep. You pull the laces, and thread a cord of black elastic through the eyelets, the kind you use on the hounds’ coats, and knot it at the top, and put the boots back exactly where they were.'),
 N('In the morning you hear them find it. There is a silence from the spare room that goes on for a full minute. You stand in the kitchen and wait for the boot to come down the passage at your head.'),
 N('It does not come. They walk past the kitchen door in the boots, without looking in, and out to the kennel, and the laces do not drag.')]);

k86('w_facesV','v',null,null,'Four words through the door',[
 N('At night, through the door, they say four words over and over, low. You stand in the passage and listen until you can make them out.'),
 N('“Bald. Boot. Driver. Book.”'),
 N('It is the four. They are keeping them, as you keep a ledger. Round and round, in case one drops.'),
 N('On the fourth night there are only three. “Bald. Boot. Driver.” A pause, a long one. Then the three again, faster.'),
 K76V('(The drip is taking them. They know it. They are lying in there trying to hold on to the men they mean to kill, and losing them a word at a time.)'),
 N('You go up to the study. You have the four already, from your own work: a description of each, height, marks, a habit. You copy the fourth onto a plain card in capitals. GREEN CLOTH BOOK. PENCIL IN THE SPINE. LEFT-HANDED. A SCAR THROUGH THE RIGHT EYEBROW.'),
 N('You slide it under the door at two. You do not knock.'),
 N('The next night, through the door, there are four words again.')]);

/* ===================================== ENDINGS ===================================== */
const _xe105=extraEnding;extraEnding=function(){const L=_xe105();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const F=S.f.e2l85||{};
 if(F.w_itchV)L.push('V sanded a beech stick for the itch under Misaki’s cast. It went in the bin in the morning. He heard it used all night.');
 if(F.w_stairs||F.w_stairsV)L.push('Misaki climbed V’s back stair on their backside, nine steps, refusing help. He stood at the bottom with his nails in his palms.');
 if(F.w_school)L.push('There is a second fund at the school V pays for, through four accounts, for the daughter of a man who drove a van to the river.');
 if(F.w_ronin)L.push('“I didn’t ask what’s broke. I asked how bad.” V gave Ronin every injury, and could not answer.');
 if(F.w_angel)L.push('At two in the morning, in V’s kitchen, Angel heard him say “I do not know” and mean it.')}catch(e){}return L};
/* ===KC105-END=== */
