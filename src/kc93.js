/* ===KC93-BEGIN=== */
/* ===================== THE WAR: WHAT IT DID (kc93) =====================
   More infirmary for the enemies-to-lovers route, in kc85's player-opened pool. The subject here is the damage itself:
   what four days in the other building taught Misaki's body and judgement to do, which goes on working in a safe
   room; and what it does to V to stand where the men stood. Nothing in it is a twist. The horror is that the methods
   worked, on somebody who thought they could not be worked on, and that they keep working with nobody applying them.
   Needs kc73, kc76–kc92.
     Misaki, cell:   p_grateful  p_spoon  p_days  p_table  p_error  p_under (S.f.e2lUnder out|stayed)  p_name
     Misaki, clear:  p_real  p_voice  p_list  p_wake  p_good
     V:              p_orders  p_plan  p_underV  p_meat  p_day  p_leave  p_power
   Nothing here touches the hours, and the doctor does not appear, so the text is the same under both aftermath
   settings.
   Also: kc85's menu now rotates which six scenes it lists, by day and slot, so that a large pool is not always read
   from the top.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc93.md. Tested in tools/k86_test.js and tools/k93_test.js. */
const K93=()=>{try{return typeof K92==='function'&&K92()}catch(e){return false}};

/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
k86('p_grateful','m',null,'cell','It is only him',[
 N('The door opens. You have the spoon in your fist before you know who it is. It is the tall one, with the water, and your breath goes out of you.'),
 N('It takes you a second to place it. You were braced for the others. Any of the four. And it was only him.'),
 M2('(“only.” it’s only the guy who swore in front of everyone to kill me. hi. what a relief)','(“only.” it’s only the man who swore in front of everybody to kill me. hi. what a relief)'),
 N('You go over it, because it is disgusting and you want to know how it got in. The four never said what they were going to do. They never said why. One of them called you sweetheart.'),
 N('This one stood up in a bowling alley and said it to your face. He gave reasons. He wrote it down and showed you the page. He has never once pretended to be anything but the man who is going to do it.'),
 M2('(he’s the only one in this who’s been STRAIGHT with me. that’s so fucked. that’s the most honest relationship i’ve got)','(he’s the only one in this who has been straight with me. that’s so fucked. that’s the most honest relationship i have)'),
 N('You drink the water, with the spoon still in your other hand. You do not thank him. He looks at the spoon, and at you, and he nods, once, as one professional to another, and that makes you so angry that you nearly throw the cup.')]);
k86('p_spoon','m',null,'cell','The soup',[
 N('You have been eating it for two days before it occurs to you to wonder what is in it.'),
 N('He would not need to cut you. He is a man with a counter full of bottles. You hold a mouthful on your tongue, as you were taught at fifteen by a woman who did restaurants, and you go through it: salt, something green, far too much pepper, an onion that has been burned and put in anyway.'),
 M2('(it’s not drugged. nobody drugs soup and ALSO makes it taste like that)','(it isn’t drugged. nobody drugs soup and also makes it taste like that)'),
 N('Then you see what follows. Nobody bought this. There is no cook in the world who would put his name to it. He made it. The billionaire went and stood at a stove, in person, and made you soup, and it is the worst soup that you have ever had, and you have eaten out of bins.'),
 M2('(three out of ten. and the three’s for it being hot. he’s got a HOSPITAL and he can’t do an onion)','(three out of ten. and the three is for its being hot. he has a hospital, and he can’t do an onion)'),
 N('You finish it. You are hungry, and you have finished worse. You put the spoon down in the empty bowl with a click.'),
 N('It bothers you for the rest of the day. A man who meant to do it soon would not be learning to cook for you. He is settling in. He thinks that he has weeks.')]);
k86('p_days','m',null,'cell','How long',[
 N('You count by trays. Three a day. You have a scratch for each one, on the wall behind the bed frame, done with the handle of the spoon.'),
 N('There are fourteen scratches.'),
 N('That is nearly five days. It does not feel like five days. You try to walk back through them, one tray at a time, and you get four trays back, and then there is a place where the trays simply are not.'),
 M2('(so u lost some. the bag took some. fine. how many)','(so you lost some. the bag took some. fine. how many?)'),
 N('You cannot know. Fourteen is the number of trays that you were present for. It matters, because of the others: Ronin gives a person three days before he starts breaking doors, and Angel gives two. If it has been five, then they are not coming, or they have come.'),
 M2('(or he’s told them something. he’s good at that. he’s got that voice. “they are not here.” and ronin goes “ok”)','(or he has told them something. he’s good at that. he has that voice. “they are not here.” and ronin says “ok”)'),
 N('You look at your fingernails, to see how far they have grown. Two are missing. The rest have been cut, neatly, straight across, by somebody else, at a time when you were not there.'),
 M2('(he did my NAILS. what kind of psycho — no. i know what kind. the kind that keeps things tidy for later)','(he did my nails. what kind of psycho — no. i know what kind. the kind that keeps things tidy for later)')]);
k86('p_table','m',null,'cell','Plan it like a job',[
 N('He wrote SLOW. He showed you what it means; you watched forty minutes of it. So it is coming, and the only part left to you is how you take it.'),
 N('You plan it as you would plan a job.'),
 M2('(one: don’t beg. the card man begged. didn’t buy him a minute)','(one: don’t beg. the card man begged. it didn’t buy him a minute)'),
 M2('(two: he’ll want me to say i did it and i’m sorry. i did it. i’m not sorry. i was paid)','(two: he’ll want me to say that i did it and that i’m sorry. i did it. i’m not sorry. i was paid)'),
 M2('(three: he’ll start with the left hand, bc of the rifle. joke’s on him, i can’t feel most of it)','(three: he’ll start with the left hand, because of the rifle. the joke’s on him, i can’t feel most of it)'),
 N('You got to three. It is the first time in days that you have got to three, and it was for this.'),
 N('It is a good plan. It is thorough. You have allowed for the lamp, and for his voice, and for the hounds afterwards. You are rather proud of it.'),
 M2('(four: when he does the speech, yawn. he’ll hate that)','(four: when he does the speech, yawn. he’ll hate that)'),
 M2('(five: last words. “somewhere stupid.” so he knows i remembered. and “ur soup’s shit.” so he’s got to live with it)','(five: last words. “somewhere stupid.” so that he knows i remembered. and “your soup’s shit.” so that he has to live with it)')]);
k86('p_error','m',null,'cell','Find the mistake',[
 N('There was a mistake. There must have been. You are the best in the city, and people like you do not get taken unless they get something wrong.'),
 N('You go back over the night, as you go over a job that went bad. The lot. The gravel. The time. You were coming back from the corner store with a bag in each hand.'),
 M2('(both hands. there. u had both hands full)','(both hands. there. you had both hands full)'),
 N('The second time through, you notice the van. It had been in the lot for three days. You are a person who counts the exits in every room, and you walked past a parked van with no plates three days running.'),
 N('The third time, you stop looking at yourself and look at them. They knew the lot. They knew the hour. They knew that on a Thursday you go to the corner store and come back with both hands full of tins.'),
 M2('(who knows that. who’s got my THURSDAYS)','(who knows that? who has my thursdays?)'),
 N('Four idiots from a river do not have your Thursdays. You have seen their work; they could not find their own van. Somebody gave it to them. Somebody with a file: rent, hours, tins. Somebody who sat outside your lot for a month with a flask.'),
 M2('(page twelve. he handed them page twelve. it wasn’t my mistake. i got DOSSIERED)','(page twelve. he handed them page twelve. it wasn’t my mistake. i got dossiered)'),
 N('It is the best that you have felt in that room. You were beaten by research. You can respect that, and you are going to kill him for it.')]);
k86('p_under','m',null,'cell','Under the bed',[
 N('Things happen on a bed. You have known that for some time, and at about three in the morning you act on it.'),
 N('It takes a while, with the drip. You get the stand over to the edge. You go down onto the tile on your good side and work yourself under the frame, on your back, until there is steel mesh a hand above your face and the wall against one shoulder.'),
 N('It is better at once. Nothing can come at you from above. Anything that comes has to get down on the floor to do it, and you will see its knees first.'),
 M2('(should’ve done this days ago. this is the best room in the building)','(i should have done this days ago. this is the best room in the building)'),
 N('You sleep, a little. You have not slept in the bed.'),
 N('When you wake, there is a face on the floor. It is a long way off, out in the corridor, beyond the open door: a man lying flat on the stone on his stomach, with his cheek down, so that his eyes are level with yours. He is not coming any closer. He has been there for some time; there is a mark on the stone where his breath has been.'),
 K76V('I am not going to ask you to come out.')],
 cb=>ask('hitmeuppp','(He is lying on the floor of his own corridor, in a suit.)',[
  {t:'Stay where you are',fn:()=>{S.f.e2lUnder='stayed';save();say([
   N('You stay. He stays. You look at each other along forty feet of floor, under a bed frame and through a doorway, with your cheeks on the tile.'),
   N('He does not speak again. At some point he slides a folded blanket across the stone with one hand, as far as his arm will reach, and leaves it there, a long way short of the door.'),
   M2('(he’s on the floor. he got down on the FLOOR. they don’t get down)','(he’s on the floor. he got down on the floor. they don’t get down)'),
   N('You are under there until the light changes. When you come out, he has gone, and the blanket is where he left it, and there is a pillow from the bed pushed in beside you under the frame that you do not remember taking.')],cb)}},
  {t:'Come out',fn:()=>{S.f.e2lUnder='out';save();say([
   N('You come out. You do not know why. It may be that a man lying down is a man who is not above you.'),
   N('It takes ten minutes, an inch at a time, with the drip line snagging. He does not move while you do it. He does not help. He keeps his face on the stone and his hands flat beside it, where you can see all ten fingers.'),
   N('When you are back on the bed, he gets up, slowly, the way a tall man gets up from a floor, with one hand on the wall. There is grit pressed into the side of his face.'),
   K76V('The floor is yours also, whenever you prefer it. I will have a mat put under there.'),
   M2('(a mat. so he knows where i’ll be)','(a mat. so that he knows where i’ll be)')],cb)}}]));
k86('p_name','m',null,'cell','Something you have stopped thinking',[
 N('You notice it by its absence, as you notice a tooth that has gone.'),
 N('You have not thought your own name in days. You think “you”. You think “it”, sometimes, when you are tired. You say what the hand is doing, and what the ribs want, as if you were reporting on a room.'),
 M2('(say it. in ur head. just once)','(say it. in your head. just once)'),
 N('You try. It is like trying to step on a stair that has been taken out. The word is there. You know what it is. You have signed it on a thousand packing slips. You go to think it and you have thought about the drain instead.'),
 N('There was a reason. You remember having one. In the other building, the name was the thing that you kept back. If they never had it, there was a part that they never had. So you put it somewhere, on the first day, where even you would not come across it by accident.'),
 M2('(ok. so where’d u put it. …shit. where did i PUT it)','(okay. so where did you put it? …shit. where did i put it?)'),
 N('You hid it too well. The tall one has it; he said it once, and you would not answer. He has your name and you do not, and you are going to have to get it back from him.')]);

/* ===================================== MISAKI: CLEAR ===================================== */
k86('p_real','m',null,'clear','How you know',[
 N('You are clear. V’s house, a Wednesday, the infirmary. You are certain.'),
 N('You were certain before. That is what you are lying here with. For three days you knew, without any doubt, that this was a cell and he was the man who had you. It did not feel like a guess. It felt exactly as this feels.'),
 M2('(so how do i know this one’s the real one)','(so how do i know that this one’s the real one?)'),
 N('You make a test. Something only V would know. When he comes in, you ask him what you left on his pillow, in the first week.'),
 K76V('A bullet. Standing on its end.'),
 N('It is right. You feel better for about four seconds.'),
 M2('(…i know that, though. i put it there. if i was making him up, he’d know everything i know)','(…i know that, though. i put it there. if i were making him up, he’d know everything that i know)'),
 N('There is no question that you can ask him which a room built out of your own head could not answer. You go through eleven, to be sure. He answers all of them, patiently, standing by the door, and at the end you are no further on, and he has understood what you are doing.'),
 K76V('I cannot prove it to you. I have tried to think of a way. Anything that I could show you, you could have supplied.'),
 M2('great. thanks. really helpful','great. thanks. that’s really helpful'),
 K76V('It was not offered as help. I thought that you would prefer to hear that it cannot be done, from somebody who had looked.')]);
k86('p_voice','m',null,'clear','Get your own voice back',[
 N('You stand at the little mirror and try to swear.'),
 M2('fuck','fuck.'),
 N('It is the word, but it comes out wrong: in the good voice, pitched up, with the lift at the end, like somebody saying it for the first time at a dinner.'),
 M2('fuck. FUCK. fuck off. piss off, ur honour','fuck. fuck. fuck off. piss off, your honour.'),
 N('You know how you sound. Angel has it on a hundred videos: loud, and flat, and bored, with a laugh in it. You know it as you know a tune. You go to sing it and you get the other tune.'),
 N('You try for twenty minutes. You try insults. You try your order at the noodle place. You try “a double-tap never hurts”, which you have said over forty bodies, and it comes out as if you were asking permission.'),
 M2('(they didn’t take it. u can’t take a voice. it’s in there. it’s just behind the other one)','(they didn’t take it. you can’t take a voice. it’s in there. it’s just behind the other one)'),
 N('In the end you get one. It is short, and rude, and it cracks in the middle, and it is yours. You are so pleased that you say it again, and the second time it is gone.')]);
k86('p_list','m',null,'clear','What sets it off',[
 N('You make a list, because a list is a thing you can work down.'),
 M2('keys. a cup put down hard. feet that stop outside a door. someone saying “there we go”','keys. a cup put down hard. feet that stop outside a door. somebody saying “there we go”'),
 M2('a hand i didn’t see coming. the smell of a van. being told i’m doing well','a hand that i didn’t see coming. the smell of a van. being told that i’m doing well'),
 N('It runs to a page. Some of them you have not tested; you only know that they are there, the way you know there is a step missing in the dark.'),
 N('You read it over. It is a list of ordinary things. There is nothing on it that is not in every street in the city. Cups. Keys. Somebody being nice.'),
 M2('(i used to be the thing people listened for. now i’m scared of a CUP)','(i used to be the thing that people listened for. now i’m scared of a cup)'),
 N('You are an assassin. You have stood on a roof in the rain for nine hours and not moved. You try to put that person next to the one who wrote this page, and they will not go in the same body.'),
 N('You fold the list small and put it down the side of the mattress. In the wrong hands it is a set of instructions.')]);
k86('p_wake','m',null,'clear','The second after waking',[
 N('You are afraid of sleeping. The dreams you can do.'),
 N('It is the second after. You come up out of it, and for one second there is no information. A ceiling. A light. A smell of disinfectant. You do not know which building, and in that second every part of you gets ready for the one it was.'),
 N('Then you see the crack in the corner, or the green light, and you know. It is V’s house. It takes about a second.'),
 M2('(it’s one second. u can do a second. u’ve held ur breath for four minutes)','(it’s one second. you can do a second. you’ve held your breath for four minutes)'),
 N('It is one second, forty times a night. Each time, the whole thing is there, entire, as if it had never stopped: the taste, the slackness, the good voice already in your mouth. Each time you have to be told again, by a crack in a ceiling, that it is over.'),
 N('You start keeping your eyes on the crack as you go under, so that it will be the first thing. It helps. It means that you are falling asleep staring at a wall, like something in a pen, and that helps as well, and you do not look at why.')]);
k86('p_good','m',null,'clear','You were good',[
 N('You were good. That is the word that you used. You told a door that you had been good today.'),
 N('You have been called a great many things, and you have been proud of most of them. Not one of them was “good”, and you never wanted it.'),
 N('It took them four days. You have known men hold out for weeks; you have been paid to wait for them to finish. You had thought of yourself as one of those. You had a whole picture of how you would be, if it ever came to it: bored, and filthy-mouthed, and no use to anybody.'),
 M2('(four days. and then yes please and thank u and i’ll be good)','(four days. and then yes, please, and thank you, and i’ll be good)'),
 N('You try telling yourself that it was sense. That you did what kept you alive, and that anybody would. It is true. You have said it to marks, afterwards, when you were feeling generous.'),
 N('It does not go in. What goes in is that there was a person you believed you were, and when somebody leaned on it, there was nothing behind it but a polite voice.'),
 M2('(don’t tell angel. don’t tell ronin. don’t ever let HIM know u know)','(don’t tell angel. don’t tell ronin. don’t ever let him know that you know)'),
 N('He knows. He took every thank-you standing up. You would give your rifle for him to be the kind of man who would use it against you, You would know what to do about a weapon.')]);

/* ===================================== V ===================================== */
k86('p_orders','v',null,null,'You said “sit up”',[
 N('You said “Sit up.” You were thinking about the pillow.'),
 N('They sat up. At once, straight from the waist, on three broken ribs. You heard what it did to them: a breath that stopped half-way, and no other sound. They were upright before you had finished the second word, with their hands in their lap and their eyes on your hands, waiting for the next one.'),
 K76V('(I have not given an order in this room. I had made a rule of it. I gave one without noticing, and it was obeyed faster than I have ever been obeyed by anything.)'),
 N('A hound thinks about it. A man on the table will fight you for the last inch. This was instant. There was nothing between your voice and their spine.'),
 K76V('(I could say anything. I could say stand, on that foot. I could say hold out your hand. There is nothing in them at present that would refuse me.)'),
 N('You have wanted that. You set it down as an aim, in the first week: that they should fear you enough to do as they were told.'),
 N('You tell them that they may lie back. It is another order. You hear it as it leaves you. They lie back, instantly.'),
 N('After that you take the imperative out of your mouth. “I am going to raise the pillow.” “The water is on your left.” It makes you slow, and stiff, and absurd. You go over every sentence before you say it, looking for the verb that commands, and you are astonished at how many of yours do.')]);
k86('p_plan','v',null,null,'Your plan, line by line',[
 N('You burned the plan. You still have it by heart. You go through it at the desk, a line at a time, against what you know of the building on the river.'),
 N('Taken at night, from the trailer, when they are alone. Yes.'),
 N('A vehicle with no plates. Yes.'),
 N('A room with one door, a hard floor and a drain. Yes.'),
 N('Kept. Fed, so as to last. Yes.'),
 N('The hand first. Yes.'),
 K76V('(I wrote it in April. They carried it out in the autumn. They had never seen the page.)'),
 N('Nobody gave anybody the idea. There is only one way of doing this to a person, and you worked it out for yourself, at a desk, with a good pen, and found it sound.'),
 N('You look for the place where the two part company. There must be one. You are not those men.'),
 N('You find it at the end. Your plan has a last line. It says what is done when it is over, and that it is done once, and stops. Theirs had no last line. They meant to go on.'),
 K76V('(So that is the difference. I would have finished. I had thought that there would be more between us than a full stop.)')]);
k86('p_underV','v',null,null,'The bed is empty',[
 N('The bed is empty. The sheet is thrown back and the drip stand has been dragged to the edge.'),
 N('For one moment you are certain that they have gone, and something happens to you that you will not find a word for until much later. Then you see the line. It runs from the bag down over the side of the mattress, and under.'),
 N('They are beneath the frame. On the tile, on their back, with the mesh a hand above their face and one shoulder against the wall. They have gone to ground. It is what a hurt animal does, and you have never once pulled one out.'),
 K76V('(Because a bed is where it was done. They have put eighteen inches of steel between themselves and whatever comes from above. What comes from above, in this room, is me.)'),
 N('You cannot stand over that. You cannot kneel; kneeling still puts your head above the frame. You go out into the corridor, as far as you can go and still see them, and you lie down on the stone.'),
 N('On your stomach, with your cheek on the floor. Your eyes are level with theirs, forty feet off. It is cold, and it smells of the hounds. You have never lain on a floor of this house.'),
 N('They wake. They see a face on the ground. You watch them work out that it has not come closer.'),
 K76V('I am not going to ask you to come out.'),
 K76V('(I have had men under that floor below who would have given everything to crawl somewhere I could not reach. I never thought what the crawling was like. I am being shown.)')]);
k86('p_meat','v',null,null,'The knife and the board',[
 N('You are cutting the hounds’ meat. It is beef, from the butcher on the high street; you have bought nothing else for them this week.'),
 N('The knife goes through, and you see a hand. Flat on a steel table, the fingers spread, the wrist turned to the light. It is there for as long as the blade is moving, and then it is beef again.'),
 N('You put the knife down. You pick it up. The next cut, it is there again.'),
 K76V('(I have cut meat every day for eleven years. I have cut a great deal that was not beef. I have never once seen anything but what was on the board.)'),
 N('It is the hand in the photograph: posed, and whole, and about to be broken. You looked at that picture for an hour, to find a building. It seems that it has kept the hour.'),
 N('You finish the meat. It takes you three times as long as it should. You do it with your eyes on the blade, cut after cut, with that hand under every one, because the hounds must eat and there is nobody else to do it.'),
 K76V('(I do not know how long this lasts. I have no text for it. I had not supposed that I was a person to whom it could happen.)'),
 N('The old hound takes his portion and carries it out of the room, to eat it elsewhere. He has never done that. You think that he could smell it on you.')]);
k86('p_day','v',null,null,'It is Tuesday',[
 N('It is Tuesday. The door opens from both sides.'),
 N('You say it at the infirmary door, each time that you go in. You have said it perhaps sixty times. It was the only sentence that you could find that promised nothing and was true.'),
 N('This morning you said it to the black hound, when you let him out. You said it in the car, at a red light, to nobody. You said it at the foundation, to the chair of the board, in the middle of the accounts, and she put her pen down.'),
 K76V('(It has got loose. I made it for one room, and it is in all of them.)'),
 N('You are a man who says a thing once. You have built your life on not needing to repeat yourself. You have become something that stands in doorways telling people what day it is.'),
 N('Tonight you catch your own face in the study window, with the lamp behind it, and your mouth is moving.'),
 K76V('It is Tuesday.'),
 N('You stop. You stand there for some time. You are not certain, any longer, which of the two of you the sentence is for.')]);
k86('p_leave','v',null,null,'If you were not here',[
 N('You are the worst thing in the house for them. You have looked at it from every side. A tall shape, a bag on a stand, a ring of keys. If there were no such shape, there would be nothing for the building to wear.'),
 N('So you pack. One case. You will go to the flat over the foundation, and Ronin and Angel will have the house, and the door will be opened by people who do not look like anybody.'),
 [RN,'The fuck are you doin’.'],
 K76V('Removing the cause.'),
 [RN,'Uh huh. So they wake up, and the tall one’s gone. Nobody says where. New people on the door. You know what that is, in a place like they think this is?'],
 N('You stop with the case in your hand.'),
 [RN,'That’s the boss goin’ away to think up somethin’ worse. That’s a shift change. Kid’ll lie there all night waitin’ on whatever you went to fetch.'],
 K76V('Then there is nothing that I can do which is not harm. If I stay, I am the gaoler. If I go, I am the gaoler’s absence.'),
 [RN,'Yep.'],
 K76V('That is not acceptable.'),
 [RN,'Didn’t say it was. Said it’s what you got. Unpack your fuckin’ bag, Vee. Least if you’re the Devil they know, they can count your steps.'],
 N('You unpack. You hang the coat up. You go down and take your four steps and say what day it is, and behind the door you hear the breathing settle, a very little, at a sound that it has learned.')]);
k86('p_power','v',null,null,'What you wanted',[
 N('You open the file at the first page, where the aims are. You wrote them in April.'),
 N('THAT THEY SHOULD KNOW WHAT IS COMING. THAT THEY SHOULD FEAR IT. THAT THEY SHOULD UNDERSTAND WHY.'),
 N('The first two have been met in full. They know what is coming; you sent it to their telephone. They fear it so completely that they will sit up on broken ribs at two words from you.'),
 N('You had imagined it differently. You had imagined a killer brought to see what they had done: sullen, and afraid, and at last serious. You had wanted, you think, to be taken seriously by them.'),
 K76V('(This is what fear is, when it is finished: somebody asking whether they have been good.)'),
 N('It has no understanding in it. It cannot have. The third aim wants a mind, and the first two take the mind away. You wrote three lines that cannot all be had of one person, and you did not see it, because you had only ever watched from your side of the table.'),
 K76V('(Every one of the forty-one knew what was coming, and feared it. I told each of them why. I do not now believe that a single one of them was able to hear me.)'),
 N('You sit with that. It covers eleven years, and every page of the book. You had thought that you were teaching something, and you were only frightening things until they stopped.')]);

/* ===================================== THE MENU ROTATES ===================================== */
if(typeof k85Room==='function'){const _r93=k85Room;k85Room=function(){try{const all=k85List();if(all.length>6){const off=((S.day||0)*5+(S.slot||0)*2+(S.f.e2l85?Object.keys(S.f.e2l85).length:0))%all.length;
  const _l=k85List;const m=S.pov!=='v',L=all.slice(off).concat(all.slice(0,off)).slice(0,6),full=k85Day()>=3;
  return ask(K73Who(),m?(kdClar()<2?'(the room.)':'(the room marked laundry.)'):'(The corridor outside the door marked LAUNDRY.)',L.map(e=>({t:e.t,sub:full?'enough for now':'',dis:full,fn:()=>{const f=S.f;f.e2l85=f.e2l85||{};f.e2l85[e.id]=1;f.e2l85N=k85Day()+1;f.e2l85Day=k85Key();save();
    go(cutBg(m?(kdClar()<2?'#0c0a08':'#1c2422'):'#06060c'));e.run(hub)}})).concat([{t:'Not now ('+(all.length-6)+' more after these)',fn:hub}]))}}catch(e){}return _r93.apply(this,arguments)}}

/* ===================================== ENDINGS ===================================== */
const _xe93=extraEnding;extraEnding=function(){const L=_xe93();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,F=f.e2l85||{};
 if(f.e2lUnder)L.push('One night in the infirmary Misaki slept under the bed. V lay down on the stone of the corridor, forty feet off, with his cheek on the floor, and did not ask them to come out. There is a mat under that bed now.');
 if(F.p_orders)L.push('V has not used an imperative to Misaki since the day he said “sit up” and they did, on three broken ribs, before he had finished the second word.');
 if(F.p_real)L.push('Misaki asked V eleven questions that only he could answer, to prove that the room was real. He answered them all, and then told them that it could not be proved.');
 if(F.p_power)L.push('V wrote three aims for Misaki in April: to know, to fear, to understand. The infirmary taught him that the first two destroy the third, and that this was true of everybody he ever put on the table.');
 if(F.p_day)L.push('For a time V said “It is Tuesday. The door opens from both sides” to the hounds, to a red light, and once to the chair of his foundation.')}catch(e){}return L};
/* ===KC93-END=== */
