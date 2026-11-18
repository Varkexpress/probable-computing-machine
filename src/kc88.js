/* ===KC88-BEGIN=== */
/* ===================== THE WAR: THE ROOM, INJURIES ONLY (kc88) =====================
   Twenty-six more infirmary scenes for the enemies-to-lovers route under the injuries-only setting (!kdSA()), in kc85's
   player-opened pool. Needs kc73, kc76–kc87.
   kc36's rules hold: no denial and no doctor; V does the treatment. Misaki names every injury flatly and is not
   interested in any of them, because none of it is new; they are funny about it, and mean it. The horror is on V's
   side: he joints men for cause, in order, and he finds what was done to them, and the manner of it, disgusting,
   in spite of himself and of forty pages in his own hand.
   Misaki, cell:  y2_splint y2_two y2_breathe y2_tooth y2_water y2_slow y2_sorrymess
   Misaki, clear: y2_tour y2_work y2_basket y2_eye y2_bet y2_wall y2_face y2_ten
   V:             y2_spoon y2_scale y2_right y2_door y2_theirs y2_shears y2_mine y2_strap y2_once y2_list y2_ham
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc86_88.md. Tested in tools/k86_test.js. */

/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
k86('y2_breathe','m','inj','cell','Breathe properly',[
 N('Broken ribs, you breathe deep, ten times, every hour, however much it hurts. If you breathe shallow to spare them, the lung fills, and then you have a real problem.'),
 N('Nobody told you that in here. You have known it since you were about eight.'),
 N('So every hour, by the blinks of the green light, you sit up and do ten. It is like being stabbed, slowly, by someone polite.'),
 M2('(7… 8… fuck… 9… fuck fuck… 10. gold star)','(seven… eight… fuck… nine… fuck, fuck… ten. gold star)'),
 N('On the third round the tall one is in the doorway, with a sheet of paper in his hand. It has a drawing of a pair of lungs on it. He has come to teach you something, and he has found you doing it already.'),
 N('He folds the paper in half, and then in half again, and puts it in his pocket.')]);
k86('y2_tooth','m','inj','cell','A bit of tooth',[
 N('A piece of the back tooth comes away in the soup. You find it with your tongue. It is about the size of a grain of rice.'),
 N('You do not spit it out. A thing with a piece missing is worth less, and they knock that off somewhere. You have seen what happens to goods that arrive short.'),
 M2('(keep it. if he doesn’t know it’s gone, it’s not gone)','(keep it. if he doesn’t know that it’s gone, it’s not gone)'),
 N('You hold it under your tongue through the rest of the bowl. When he comes for the tray you have it in your fist, under the blanket.'),
 N('He looks at the fist. He looks at your jaw, where you are holding it wrong. He says that he would like to see what is in your hand, and that nothing will follow from it.'),
 N('You open the hand. You keep your eyes on his. This is the part where you learn what short goods cost.'),
 N('He takes the piece of tooth between finger and thumb, and holds it under the light. Then he wraps it in his handkerchief, a linen one with a letter in the corner, and puts it in his breast pocket, and goes out.'),
 M2('(he took it. he’s keeping it. what’s he keeping a tooth FOR)','(he took it. he’s keeping it. what’s he keeping a tooth for?)')]);
/* ===================================== MISAKI: CLEAR ===================================== */
k86('y2_tour','m','inj','clear','Give him the tour of your films',[
 N('He has your films up on the lightbox, and he is standing in front of them with his arms folded, like a man in a gallery who does not care for the picture.'),
 M2('want the tour? i’ll do the tour','want the tour? i’ll do the tour'),
 M2('that’s the ladder. that one’s a door. that’s… dunno, i was small. THAT one’s good, that’s a guy with a bat, i was 14 and i won','that’s the ladder. that one’s a door. that one… don’t know, i was small. that one’s good: that’s a guy with a bat. i was fourteen, and i won'),
 K76V('A door.'),
 M2('yeah. somebody shut it. my arm was in it','yeah. somebody shut it. my arm was in it'),
 K76V('Whose door?'),
 M2('pfft. i don’t know. a door. who remembers doors','pfft. i don’t know. a door. who remembers doors?'),
 N('He turns the lightbox off. It is the first time you have seen him stop looking at something before he had finished with it.')]);
k86('y2_eye','m','inj','clear','Angel asks who did the eye',[
 N('Angel sits on the end of the bed and looks at you for a long time: the eye, the lip, the wrists.'),
 [AN,'who did the eye'],
 M2('big one. bald. had a ring on','the big one. bald. he had a ring on'),
 [AN,'and the wrists'],
 M2('different guy. skinny. he just forgot to take them off. wasn’t even being mean','a different guy. skinny. he just forgot to take them off. he wasn’t even being mean about it'),
 [AN,'“wasn’t even being mean.”'],
 M2('yeah. it’s kind of insulting','yeah. it’s kind of insulting, actually'),
 N('Angel writes both descriptions down in the notes on her phone, under a heading you cannot see. She is smiling the smile she does on camera.'),
 [AN,'asking for a friend. the friend is a shotgun']]);
k86('y2_face','m','inj','clear','The face he makes',[
 N('He is doing the wrists, and he is doing the face.'),
 M2('ur doing the face','you’re doing the face'),
 K76V('I am not aware of a face.'),
 M2('the one like u found a hair in ur soup. u do it every time u look at me','the one like you found a hair in your soup. you do it every time you look at me'),
 N('He stops. He puts the tweezers down.'),
 K76V('It is not at you.'),
 M2('it’s at my wrists. my wrists are attached to me','it’s at my wrists. my wrists are attached to me'),
 K76V('It is at the men who left them like that, and at the fact that you find it unremarkable. I am sorry that it lands on you. I have not been able to keep it off my face, and I have tried.'),
 M2('(he SAID sorry. to me. write the date down)','(he said sorry. to me. write the date down)')]);
k86('y2_ten','m','inj','clear','What a ten is',[
 N('He asks you again for the number. You say two. He asks you what a ten would be.'),
 M2('dunno','i don’t know'),
 K76V('You have had one.'),
 M2('yeah. i was 9. i don’t remember it. that’s how i know it was a 10','yeah. i was nine. i don’t remember it. that’s how i know it was a ten'),
 N('You say it cheerfully. It is a neat bit of reasoning, and you are pleased with it.'),
 N('He writes nothing down. He stands with the pen over the chart for a long time, and then he caps it.'),
 M2('what. it’s a good scale. everything’s a 2 next to that','what? it’s a good scale. everything’s a two next to that'),
 K76V('Yes. I see that it would be.')]);

/* ===================================== V ===================================== */
k86('y2_spoon','v','inj',null,'The spoon',[
 N('They have splinted two of their own fingers. They did it with the spoon from the first tray and a strip from the hem of the sheet, torn with the teeth. The knot is on the back of the hand, where it will not press.'),
 N('You have splinted paws. You know good work when it is in front of you.'),
 K76V('(It is a field dressing. It is what one does when one knows that nobody is coming.)'),
 N('They apologise to you for the sheet, and offer to pay for it.'),
 N('You go to the surgery for a proper splint. You get as far as the cabinet, and then you are standing with both hands flat on the steel and your head down.'),
 K76V('(I had them for a day before I thought of the fingers. A killer with no law saw to it in an hour, with a spoon. I am disgusted, and for once I can put my finger on with whom.)')]);
k86('y2_scale','v','inj',null,'Two out of ten',[
 N('You asked them for the pain, out of ten. They considered it honestly, and said two.'),
 N('Three bones in the hand. Three ribs. Wrists cut to the tendon sheath. A tooth broken off at the gum. Two.'),
 K76V('(I have had men on the table say ten at the first finger. I thought the less of them for it.)'),
 N('You know what a scale is. It is made by its top. Somewhere there is a thing that is their ten, and everything since has been measured against it and found small.'),
 K76V('(I do not want to know what it was. That is false. I want to know exactly, with a name and an address.)'),
 K76V('(I have no standing to want it. I had my own entry planned for that scale. I would have been proud to reach a six.)')]);
k86('y2_right','v','inj',null,'They were right about the kidney',[
 N('They told you, as one would give the time, that the kidney had taken a boot; that pink meant bruised and not split; that it would clear in three days with water.'),
 N('You looked it up. You have a veterinary text and a human one, and you read both.'),
 N('They are correct on every point. They are correct to the day.'),
 K76V('(They have no schooling past thirteen. They did not read that. They have had it, and watched it, and counted the days, more than once.)'),
 N('You bring the water. Your hand shakes on the jug, and they see it, and you watch them wonder what they have said to upset the guard.'),
 K76V('(They were eleven the first time. They wrote a will. I asked what was in it, and I wish that I had not.)')]);
k86('y2_door','v','inj',null,'A door',[
 N('They gave you the tour of their own films, as one might show a visitor round a flat. The ladder. A man with a bat, whom they are proud of. A door.'),
 N('“Somebody shut it. My arm was in it.” You asked whose door. They did not remember. Who remembers doors.'),
 N('It is a spiral fracture of the forearm. It was never set. They were perhaps six.'),
 K76V('(A door does not shut on a child’s arm and stay shut by accident. Somebody leaned on it.)'),
 N('You turned the lightbox off. You have looked at the inside of a great many people without difficulty. You could not look at that one for another second.'),
 K76V('(I find that I am sickened by a thing done twenty years ago to somebody whom I meant to joint. There is no sense in it. I have looked for the sense.)')]);
k86('y2_theirs','v','inj',null,'The names',[
 N('You have the names of the men from the building on the river. A bald one, with a ring. A thin one, who forgot.'),
 N('Lex talionis. A hand for a hand. You have done it a dozen times, exactly, each bone in its order.'),
 N('You sit down to plan it, and you find that you do not want to do it in order.'),
 K76V('(I want to stamp on it. I want to do it badly, and at length, and for no reason, and wipe my feet afterwards. I want to do it as they did.)'),
 N('You put the pen down. You have never wanted that. You have despised the men who want that. It is the whole of the distinction on which you have stood for eleven years.'),
 K76V('(So it was never a distinction of nature. It was only that nobody had yet done it to something of mine.)'),
 N('You write the plan in order regardless, bone by bone. Your hand is very neat. You do not trust it.')]);
k86('y2_shears','v','inj',null,'The instruments',[
 N('You clean your instruments on a Thursday. The scalpels, the saw, the small pliers, the bone shears.'),
 N('The shears are the ones you used on the card man. Eight fingers, one at a time, each for a finger that he took. It was good work. You stand by it.'),
 N('You pick them up, and you see a hand in a cast, lying on a blanket, with two fingers bound to a spoon.'),
 K76V('(It is not the same. His were taken for cause. Theirs was broken by a fool.)'),
 K76V('(The bones do not know that. A finger is a finger. I had always known it, and I had kept the knowledge in a drawer.)'),
 N('You clean the shears and oil them and put them back in the roll. It takes you three attempts to close your hand on them, and you count the attempts, because it is the first time that has happened and you intend to know if it happens again.')]);
k86('y2_mine','v','inj',null,'Ronin wants the one with the boot',[
 [RN,'The one with the boot. I want him.'],
 K76V('He is mine.'),
 [RN,'Thought THEY were yours. Says so in your book. So what’s it to you who did your job for you?'],
 N('He says it to see what you will do. He has been doing that all week.'),
 K76V('He did not do my job. I would not have left them in cable ties until the skin went. I would not have forgotten to feed them. I would not have wiped my boot.'),
 [RN,'Listen to you. “I’d have been a better class o’ murderer.” Vee. You’re pissed off ’cause they got hurt. Just fuckin’ say that.'],
 K76V('I am disgusted by the workmanship.'),
 [RN,'Sure you are.'],
 K76V('I am. It is merely that it does not stop at the workmanship, and I had assumed that it would.'),
 [RN,'There he is. Took you a week. You can have the boot. I want the skinny one.']]);
k86('y2_strap','v','inj',null,'The straps on the table',[
 N('The straps on the steel table are leather, two inches wide, lined with felt. You had them made. A man held in them does not cut himself; that would be waste, and it would not be on the charge.'),
 N('The marks on their wrists are a quarter of an inch wide and go to the tendon. Cable ties. A packet of a hundred costs less than a cup of coffee.'),
 K76V('(I took care over how a man should be held while I killed him. They took no care at all, and meant to let this one live.)'),
 N('You stand with one of your straps in your hand and their wrists in your head, and you cannot put the two side by side in any way that is to your credit.'),
 K76V('(Either the felt means that I am better than they are, or it means that I gave more thought to it. I have believed the first for eleven years. Tonight I can only find evidence for the second.)')]);
k86('y2_once','v','inj',null,'They have not said that it hurts',[
 N('You have set three bones and strapped three ribs and cleaned two wrists to the tendon. In all of it they have not once said that it hurts.'),
 N('They have said “ow, fuck” at a cold stethoscope. They have complained at length about the soup, the pillow, your shoes and your face. They are not a quiet person.'),
 K76V('(They complain about everything that does not matter. About what does, they make a joke, and hold still.)'),
 N('You find that you are pressing a little, on the last strap, more than you need. You stop at once. You know what you were doing. You were trying to get one honest sound out of them.'),
 K76V('(That is what the men in the building did, for sport. I did it for three seconds because I could not bear how quiet they were. I have washed my hands twice.)'),
 N('You should like, once, to hear them say that it hurts. You would give a wing of the foundation for it. You will not get it by asking, and you have just learned that you must not try any other way.')]);
k86('y2_list','v','inj',null,'The reasons',[
 N('You keep a list of the reasons. It is the first page of their file. You read it when you feel yourself slipping.'),
 N('Kills for rent. Has no law. Did not ask what the man had done. Shot a doorman who was in the way. Sleeps well.'),
 N('You read it tonight in the corridor, and each line has acquired a second line under it, which you did not write.'),
 K76V('(Kills for rent: has never had an evening that was not owed to somebody. Has no law: was never once on the right side of one. Did not ask: was never asked.)'),
 K76V('(Sleeps well: sleeps sitting up, in a corner, in my house, and does not wake when a rib is strapped.)'),
 N('The list is still true. Every word. You fold it and put it back. It used to be the page that settled things, and now it is only a page.')]);
/* ===KC88-END=== */
