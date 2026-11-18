/* ===KC89-BEGIN=== */
/* ===================== THE WAR: THE ROOM, THE LAST OF IT (kc89) =====================
   Fifteen more infirmary scenes for the enemies-to-lovers route, in kc85's player-opened pool. Needs kc73, kc76–kc88.
   Either setting:  Misaki cell g_late · Misaki clear g_cards, g_walk · V g_bed, g_stairs
   Full story (kc29's rules; see kc87):  Misaki clear x2_bolt, x2_hair, x2_nothing · V x2_boltV, x2_chair
   Injuries only (kc36's rules; see kc88):  Misaki cell y2_sneeze · Misaki clear y2_stitches · V y2_weight, y2_tally, y2_cost
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc86_88.md. Tested in tools/k86_test.js. */

/* ===================================== EITHER SETTING ===================================== */
k86('g_late','m',null,'cell','The tray is late',[
 N('The tray comes at noon. You have the day worked out by it. Today noon goes by, by the blinks of the green light, and there is no tray.'),
 M2('(ok. so that’s it. he’s made up his mind. it’s today)','(ok. so that’s it. he has made up his mind. it’s today)'),
 N('A change in the routine is the job starting. You know that from the other end. You get ready. The spoon comes out from the mattress and goes up your sleeve. You get your back against the wall and your feet under you, as far as the ribs allow, and you go through it.'),
 M2('(one: he comes four steps. two: i go for the collar, not the hands. three: i lose. but he’s gonna need stitches)','(one: he comes four steps. two: i go for the collar, not the hands. three: i lose. but he’s going to need stitches)'),
 N('You hold that for forty minutes. Your legs shake. Then the door opens, and the tall one has the tray. There is a burn across the back of his hand, new, and his sleeve is wet to the elbow.'),
 K76V('I am late. A pan caught. It was my doing, and nothing of yours.'),
 M2('(a pan. the guy who’s gonna cut me up burnt the SOUP. …nobody’d make that up. it’s too stupid)','(a pan. the man who is going to cut me up burned the soup. …nobody would make that up. it’s too stupid)'),
 N('He looks at how you are sitting, and at your sleeve. He puts the tray down a step further off than usual. After that it is never late again, not by a minute. You note it. You can plan around a man who keeps time like that.')]);
k86('g_walk','m',null,'clear','Walk to the door',[
 N('You get up. Nobody has said that you can. You put your feet on the tile and stand, with the good hand on the drip stand, and the room goes round once and stops.'),
 N('It is four steps to the door. He always took four. You take nine.'),
 N('The handle is brushed steel, and cold, and you were more afraid of it than of anything in that building. You put your hand on it.'),
 M2('(one: it’s a door. two: it’s HIS door, so it’s probably got a trick. three—)','(one: it’s a door. two: it’s his door, so it’s probably got a trick. three—)'),
 N('It opens. There is no trick. There is a corridor, and a kitchen chair, and four hounds getting to their feet, and at the far end, a tall man who has stopped dead with a jug in his hand.'),
 M2('boo','boo'),
 N('He does not drop the jug. You will give him that. But he has to put it down on the floor before he can do anything else.')]);
k86('g_bed','v',null,null,'The bed, when it is empty',[
 N('They are taken upstairs to be bathed, and for twenty minutes the room is empty.'),
 N('You have not been in it without them. You go in to change the sheets. You have staff for that, and you have not let one of them through this door.'),
 N('The bed is hardly marked. They take up so little of it. There is a dent in the corner where the wall meets the mattress, where they sit up to sleep, and nothing else.'),
 N('Down the side of the mattress you find a spoon, and a stub of pencil, and a piece of the chart with a sum on it, chewed.'),
 K76V('(A cache. In my house. Against me.)'),
 N('You put each thing back exactly where it was. You make the bed over them. It is the first time that you have ever helped somebody to hide a thing from you.')]);
k86('g_stairs','v',null,null,'The old hound and the stair',[
 N('The old hound will not leave the kennel corridor. His hip is bad, and the stone is cold, and he lies across the infirmary door all night.'),
 N('You bring his bed down. He will not use it. You bring a blanket, and he suffers it.'),
 K76V('You are fourteen years old. You have no business on a stone floor.'),
 N('He looks at you with the eye that still works well, and puts his chin back down against the gap under the door.'),
 K76V('(He has made up his mind about what is behind it. He did so in the first week, at the kennel gate, and he has not gone back on it.)'),
 N('You sit down on the stone beside him, in your suit, with your back against the wall. It is easier, with him there. You find that you are able to be at that door so long as it is on behalf of a hound.')]);

/* ===================================== FULL STORY ===================================== */
k86('x2_bolt','m','sa','clear','A lock on your side',[
 N('There is a little washroom off the room. The door has no lock. In this house, nothing of his seems to.'),
 N('You tell V that you want a bolt on it. On the inside. You say that it is because Ronin never knocks.')],
 k87Pick('hitmeuppp','(He has not asked why.)','Tell him what the bolt is for.','they are not going to','“ronin barges in. i want a bolt. inside”',[
  K76V('You will have one within the hour.'),
  N('He fits it himself. You hear the drill. When he has finished, he stands back from the door and tells you that it throws from your side only, that there is no key to it, and that if you bolt it nobody in this house can open it, himself included, without taking the door off.'),
  M2('ok. good. …what if i pass out in there','okay. good. …what if i pass out in there?'),
  K76V('Then I shall take the door off. I have the tools laid out. I would ask you to knock twice on the wall every ten minutes, so that I do not have to.'),
  N('You bolt it. You sit on the edge of the bath for a long time with the bolt across, doing nothing at all, and knocking twice on the wall every ten minutes.')]));
k86('x2_hair','m','sa','clear','Your hair',[
 N('You ask Angel to cut it. All of it, short. You say that it is in your eyes.'),
 N('It has never been in your eyes. You have worn it like this for years, and the red streak is the only thing you have ever spent money on.'),
 [AN,'how short'],
 M2('short. so there’s nothing to — short. just short','short. so that there’s nothing to — short. just short'),
 N('Angel has the scissors in her hand. She is very still, in the way she is still on a roof.')],
 k87Pick('hitmeuppp','(She is waiting for the rest of the sentence.)','Finish the sentence.','they are not going to','“it’s in my eyes. come on, i’m bored”',[
  [AN,'okay, baby. in your eyes'],
  N('She cuts it. She does it beautifully; she could not do it any other way. She keeps the red streak in a tissue, in her bag, and you pretend that you did not see.'),
  M2('(feels lighter. see. practical. it was a practical decision)','(it feels lighter. see? practical. it was a practical decision)')]));
k86('x2_nothing','m','sa','clear','The doctor’s question',[
 N('The doctor says that there is one question she is required to ask, once a day, and that you may answer it however you like.'),
 N('She asks it. It is short, and she asks it kindly, and she does not look at you while she does.'),
 N('Everything goes very clear. It is how it goes on a roof, in the last second, when there is only the wind and the distance.')],
 k87Pick('hitmeuppp','(She has her pen ready, and she is looking at the wall.)','Answer the question.','they are not going to','“NOTHING HAPPENED. write it down”',[
  M2('NOTHING HAPPENED. write it down. n-o-t-h-i-n-g','NOTHING HAPPENED. write it down. put it in quotes if you want'),
  N('It is the loudest that you have been since the river. It is your own voice, the real one, with the edge on it. You had been wondering where it had got to.'),
  N('She writes it down. She puts it in quotation marks. Then she says that she will ask again tomorrow, because she has to, and that the answer may be the same.'),
  N('When she has gone you find that you are shaking so hard that the drip stand rattles. You hold it still with your good hand.'),
  M2('(that’s the cold. this room’s freezing. rich people never put the heating on)','(that’s just the cold. this room’s freezing. rich people never put the heating on)')]));
k86('x2_boltV','v','sa',null,'Fit the bolt',[
 N('They have asked for a bolt on the washroom door, on the inside. They say that it is on account of Ronin.'),
 N('You fit it yourself. A steel bolt, the heaviest that the ironmonger had, on the inner face of a door in your own house. You choose one that cannot be drawn from outside.'),
 K76V('(I have spent eleven years making this house so that nothing in it is shut to me. There are forty doors, and I hold a key to each.)'),
 N('You drive the last screw. You stand back, and try the door from your side, and it does not move.'),
 K76V('(There is now one room in my house that I cannot enter. It is the best work that I have done here.)'),
 N('You lay the tools out on a cloth in the corridor, the drill and the pry bar, in case they should fall. Then you sit down on the floor, where you can hear the wall, and wait for two knocks.')]);
k86('x2_chair','v','sa',null,'Ronin’s chair, at three',[
 N('At three you take two cups down to the corridor. Ronin is in the kitchen chair, with the crowbar, awake. He has not had the radio in four nights.'),
 N('You sit on the floor on the other side of the door. He takes the cup.'),
 N('You sit for an hour without a word. He has guessed, and you have guessed, and each of you knows that the other has. If either spoke of it, it would be a thing that had been said about them in a corridor while they slept.'),
 [RN,'Vee.'],
 K76V('Yes.'),
 [RN,'Nothin’. Just checkin’ you was still there.'],
 K76V('I am still here.'),
 N('It is the whole conversation. It is as much as the two of you are entitled to, and you have it again the next night, word for word.')]);

/* ===================================== INJURIES ONLY ===================================== */
k86('y2_sneeze','m','inj','cell','You are going to sneeze',[
 N('You are going to sneeze. With three broken ribs. You can feel it coming, and there is nothing you can do.'),
 M2('(no. no no no. not now. think about bricks. think about BRICKS)','(no. no, no, no. not now. think about bricks. think about bricks)'),
 N('You sneeze. It is the worst thing that has ever happened to anybody. The other building did not come close.'),
 Ms('FUCK. fuck. ow. fuck','FUCK. fuck. ow. fuck','You make a sound like a kettle, and then no sound at all.'),
 N('The door opens at once. The tall one is there, with one hand out, as if you had fallen.'),
 Ms('sneezed. sorry. i’ll keep it down','i sneezed. sorry. i’ll keep it down','You point at your nose, and then put a finger to your lips: you will be quieter.'),
 N('He stays in the doorway. You have taken a boot to the kidney without a sound, and he heard you swear at a sneeze, and he looks as if he does not know whether he is allowed to be relieved.')]);
k86('y2_stitches','m','inj','clear','Take your own stitches out',[
 N('The stitches in your side are ready. You can tell; they itch, and the skin has closed. He will get to them on Thursday. It is Tuesday.'),
 N('There are nail scissors in the washroom cabinet. You do it sitting on the edge of the bath: lift, snip, pull. Nine of them. You lay them out along the rim in a row as you go, so that none gets left in.'),
 N('V finds you on number seven.'),
 K76V('What are you doing?'),
 M2('ur job. u were going to leave them till thursday. they’re done NOW','your job. you were going to leave them until thursday. they’re done now'),
 N('He looks at the seven in a row, and at your hand, which is steady. He kneels down on the bath mat.'),
 K76V('Give me the scissors. You cannot see the last two properly from that side.'),
 N('You give them to him. It is quicker, with two. He lays eight and nine down at the end of your row, in line with the rest, and neither of you says that you have just done a piece of work together.')]);
k86('y2_weight','v','inj',null,'What they weigh',[
 N('You carry them from the bed to the washroom, because the floor is wet and the ribs will not take a fall.'),
 N('You have carried the old hound up a flight of stairs. He is the heavier, by some way.'),
 K76V('(I planned the lifting of this body. Into the car, out of the car, down to the cold room. I allowed for a second man.)'),
 N('They hold on round your neck with the good arm, quite cheerfully, and tell you that you smell like a library and that you ought to carry people for a living.'),
 K76V('(I would not have needed the second man. I could have done it with one hand. That is the thought, and I cannot get it to leave.)'),
 N('You set them down on the stool as you would set down a thing with a crack in it. They say that you are doing the face again.')]);
k86('y2_tally','v','inj',null,'Count the scars',[
 N('You count things. It is how you know what you have. So on the second day, while you dress them, you count.'),
 N('Nine new: the wrists, the lip, the side. Thirty-one old. A burn the shape of an iron’s tip. A row of four on the shin, evenly spaced. One down the forearm that somebody closed with what looks like fishing line.'),
 K76V('(Forty. I have forty pages on them. It comes to a scar a page.)'),
 N('You open the file to enter it, as you would enter any finding. The file has headings. COLLATERAL. METHOD. HABITS. WEAKNESSES.'),
 N('There is no heading under which thirty-one old scars may be put. You try each of the four. Under WEAKNESSES the pen will not go down.'),
 K76V('(They are not a weakness. They are the reverse of one. I have built a file that has no place for the most important thing that I know about its subject.)')]);
k86('y2_cost','v','inj',null,'What a laugh costs',[
 N('Ronin is in there, telling them something unrepeatable. You are in the corridor with the dressings, and you can hear them laugh.'),
 N('You know what that laugh costs. Three ribs, on the left. Every breath of it goes through the breaks. You strapped them yourself; you could draw where.'),
 N('They laugh anyway. They laugh until they cough, and swear, and then they tell Ronin to say the bit about the goat again.'),
 K76V('(They have been taught to make no sound when they are hurt. Nobody has been able to teach them not to laugh.)'),
 K76V('(I had that in the file as a fault. “Unserious.” I underlined it.)'),
 N('You wait until they have finished. You would not interrupt it for the dressings, or for anything else that you own.')]);
/* ===KC89-END=== */
