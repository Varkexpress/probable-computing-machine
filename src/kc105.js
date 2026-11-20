/* ===KC105-BEGIN=== */
/* ===================== THE WAR: THE LONG NIGHTS (kc105) =====================
   More infirmary angst during the delusion, at the author's direction. Needs kc73, kc76–kc104.
   Eleven scenes in kc85's player-opened pool (now 219). Misaki believes that the tall one is K9, who holds them
   and means to kill them; they never warm to him, and their anger seethes. These are about the body and the night:
   cold, the pan, talking in sleep, a hound crying at the door, rain on a roof that is not there.
     Misaki, cell:  u_cold  u_pan  u_talk  u_hound  u_rain  u_scars
     V:             u_coldV  u_panV  u_talkV  u_houndV  u_rainV
   Same text under both aftermath settings: nothing touches the hours, and the doctor does not appear.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via M2 and they/them.
   Notes: docs/notes_kc105.md. Tested in tools/k86_test.js and tools/k105_test.js. */
const K105=()=>{try{return typeof K104==='function'&&K104()}catch(e){return false}};

/* ===================================== MISAKI, CELL ===================================== */
k86('u_cold','m',null,'cell','You are cold',[
 N('You are cold. It comes up from the mattress into your back, and the fever takes it and makes it worse, and your teeth go.'),
 N('There is one blanket. You could ask for another. He would bring it; he brings everything.'),
 M2('(no. u don’t ask him for things. u ask him for one thing and then he knows what u need)','(no. you don’t ask him for things. you ask for one thing, and then he knows what you need)'),
 N('You lie and shake all night with your jaw clamped so that the teeth do not carry through the door. You count the shakes. You stop counting at about four hundred.'),
 N('In the morning there is a second blanket folded at the foot of the bed. You did not hear it come.'),
 N('You push it off the end with your foot, onto the tile, and leave it there where he will see it. You are colder the next night. You are colder than you have ever been, and you lie in it and grind your teeth, and it is yours.')]);
k86('u_pan','m',null,'cell','The pan',[
 N('There is a steel pan. You have to use it. There is no other way, with the drip and the ribs.'),
 N('You will not do it while he is in the building. You lie and listen for him: the shoes, the stair, the far door. Then you wait another count of a hundred, in case he is standing outside, as they used to.'),
 M2('(hold it. u can hold it. u’ve held it on a roof for nine hours)','(hold it. you can hold it. you have held it on a roof for nine hours)'),
 N('On the third day he does not leave the building at all. You hold it from noon. By the evening your whole body is a fist round it. You will not. You will not give him that.'),
 N('At ten he comes to the door and says, without coming in, that he is going out to the kennel for half an hour, and that nobody else is in the house. Then he walks away, loudly, all the way, and you hear the far door go.'),
 N('You lie there with the tears running sideways into your ears. He knew. He had worked out what you were doing, and stood out there deciding how to let you stop.')]);
k86('u_talk','m',null,'cell','You talked in your sleep',[
 N('You wake with your throat raw. Your mouth is dry and open. You have been talking.'),
 N('You do not know what you said. You know that you talk; a client’s wife told you once, in a motel, that you counted out loud in your sleep.'),
 M2('(what did i say. the tin. the clients. the fourteen names. the integral. WHAT DID I SAY)','(what did i say? the tin. the clients. the fourteen names. the integral. what did i say?)'),
 N('He is in the doorway. He has been there; the light is behind him and his face is nothing. He does not mention it. He says the day of the week.'),
 N('Now it is in him, whatever it was, and you will never know what, and he will never say, and every time he looks at you for the rest of your life he will know a thing about you that you do not.'),
 M2('(fine. take it. u’ve got everything else. have my sleep as well)','(fine. take it. you have everything else. have my sleep as well)'),
 N('You do not sleep again that night. You lie and bite the inside of your cheek every time your eyes close, and taste coins, and keep your mouth shut by hand.')]);
k86('u_hound','m',null,'cell','A hound at the door',[
 N('There is a hound at the door. You can see its shadow in the gap underneath. It is crying, very high, through its nose, the way a dog does when it wants something it is not allowed.'),
 N('It goes on for an hour. It does not stop.'),
 M2('(he’s doing something to it. he’s doing it out there so i’ll hear. so i know what he does to things)','(he’s doing something to it. he’s doing it out there so that i’ll hear. so i know what he does to things)'),
 N('You know what he does to things. You saw forty minutes of it on your phone, in April, eating cereal. You lie and listen to the dog and you make yourself not put your hands over your ears, because that is what he wants.'),
 N('At two the crying stops. There is a man’s voice, very low, saying something to it, and then nothing.'),
 N('You lie awake until morning and think about the dog. You never even liked dogs. You think about it anyway, out there with him in the dark, and what he said to it, and you cannot stop.')]);
k86('u_rain','m',null,'cell','Rain somewhere',[
 N('There is rain. You cannot see it; there is nothing to see it through. You hear it in the pipe along the ceiling, a long way up, a hiss that comes and goes.'),
 N('On the trailer the rain is loud. It is a tin roof. Everybody who comes in complains about it, and you sleep better under it than anywhere, because nobody can come up the steps without you hearing over it, and because it is the only noise in the world that has never once wanted anything from you.'),
 M2('(it’s raining on my roof. right now. and i’m not under it)','(it’s raining on my roof. right now. and i’m not under it)'),
 N('You lie and try to hear the tin through the pipe. You cannot. It is just a hiss in a basement. You try harder, until your whole head is listening, until you can almost hear it.'),
 N('Then you hear yourself breathing, fast and wet, and you stop trying. It is a pipe. You are in a room with no window. You will not hear that roof again. You lie very still and let the hiss go on without you.')]);
k86('u_scars','m',null,'cell','Count the old scars',[
 N('You count your scars, to know whose body this is.'),
 N('The zip on the forearm, from the boy at veterinary college. The burn on the left palm, from a stove at eleven. The small one under the chin that you do not remember getting, which means before nine. The graze on the hip from the car park in April. You know every one. You have the dates.'),
 M2('(see. that’s me. those are mine. i earned every one of those)','(see. that’s me. those are mine. i earned every one of those)'),
 N('Then you get to the new ones. The wrists. The hand, under the cast. The ribs. Places that you cannot see, that you can feel the shape of under your fingers.'),
 N('They are not in the count. You do not have dates for them. You did not earn them; nobody paid you; you were not even there for some of them. They are on you anyway, and they are going to be on you longer than anything else, and you did not agree to a single one.'),
 N('You stop counting. You put your hands flat on the blanket, away from all of it, and look at the ceiling, and do not count anything else that night.')]);

/* ===================================== V ===================================== */
k86('u_coldV','v',null,null,'The blanket on the floor',[
 N('You heard their teeth through the door all night. You put a second blanket at the foot of the bed at six, while they were asleep at last.'),
 N('At eight it is on the floor. Pushed off the end, onto the tile, where it will be seen.'),
 K76V('(They would rather be cold than owe me a blanket. I know the arithmetic. I have kept it myself, at fifteen, against my father.)'),
 N('You fold it and put it back. In the morning it is on the floor again. On the third morning you leave it on the floor.'),
 N('Instead, at night, you turn the boiler up until the whole house is too hot. You sit in your study in your shirt with the windows open and sweat, and through the door the teeth stop. They will think the fever has turned. Let them.')]);
k86('u_panV','v',null,null,'Half an hour in the kennel',[
 N('By the evening of the third day you have understood. They wait until the house is empty, and you have not left it in three days, because the fever was bad.'),
 N('You have read of it. Men on your table have done it to others: made them ask, made them do it in the room. You have fed two of those men to the hounds.'),
 K76V('(They have been holding it since noon, rather than let me be in the building. They think I am one of those men. Of course they do.)'),
 N('At ten you go to the door. You do not go in. You say that you are going out to the kennel for half an hour, and that nobody else is in the house. Then you walk away as loudly as you know how, the full length of the passage, and slam the far door behind you.'),
 N('You stand in the kennel with the hounds for forty minutes, in the cold, with your back against the bars, and you make yourself stay the full forty. You do it every evening after that, at ten, so that it is a fact of the house and not a favour.')]);
k86('u_talkV','v',null,null,'What they say asleep',[
 N('They talk in their sleep. You are in the passage; you hear it through the door.'),
 N('Numbers, mostly: wind, ranges, a count of something. A name you do not know. Then, very clearly, in a child’s voice, “I’ll be good. I’ll be good. Don’t put me back.”'),
 N('You stand very still.'),
 N('You write down everything. Every hour, every bag, every temperature. It is how you keep a thing safe; it is how you kept the hounds.'),
 K76V('(I will not write this down. It is not mine. They did not give it to me. I had it through a door.)'),
 N('In the morning they wake with their throat raw and you are in the doorway, and you see them see you, and see them work out that you heard. You say the day of the week. You never say anything else about it, to them or to anybody. On their page that night there is the temperature, and the bag, and nothing else.')]);
k86('u_houndV','v',null,null,'The black hound will not come away',[
 N('The black hound will not come away from the infirmary door. It lies with its nose to the gap and cries, high, through the nose, for an hour.'),
 N('You know its sounds. This is wanting: the sound it made outside the surgery door when the grey hound was under, for three days, until you let it in.'),
 N('You go down at two and sit with it on the stone. You put your hand on its neck and tell it, very low, that they are all right, that they are only ill, that it cannot go in.'),
 K76V('(I should let it in. It would lie on the floor by the bed and that would be the end of the crying. They would think it had been sent.)'),
 N('It stops for your voice. It lies down with its chin on your foot and sighs. You stay there until it sleeps.'),
 N('You do not know what they made of the hour of crying through the door. You think, going up the stair, that you would very much rather not find out.')]);
k86('u_rainV','v',null,null,'Rain',[
 N('It rains in the night. You hear it on the study window and think of their trailer, which has a tin roof. It is in the file: they complained of it to the landlord once and he did nothing, and they never complained of it again.'),
 N('There is a vent from the infirmary to the outside, closed, behind the pipe. It was for the hounds, in summer.'),
 N('You go down at one and open it. It will let the cold in. It will also let in the sound of the rain on the yard, faint, through a grille.'),
 K76V('(A grille in a yard. It is what I have, from this side of the door.)'),
 N('You stand in the passage and listen. Through the door there is the rain, very faint, and their breathing, which is quick, and then is not so quick.'),
 N('In the morning it has stopped raining, and the vent is still open, and they are asleep with their face turned up towards the grille, and you close it as slowly as it will go, and they wake anyway.')]);

/* ===================================== ENDINGS ===================================== */
const _xe105=extraEnding;extraEnding=function(){const L=_xe105();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const F=S.f.e2l85||{};
 if(F.u_cold||F.u_coldV)L.push('Misaki pushed the second blanket onto the floor every morning. V turned the boiler up until the whole house was too hot, and sweated in his study with the windows open.');
 if(F.u_pan||F.u_panV)L.push('Every night at ten, for as long as Misaki was in the infirmary, V spent forty minutes in the kennel so that the house would be empty.');
 if(F.u_talkV)L.push('V heard what Misaki said in their sleep, through the door. It is the first thing about them that he kept out of the book.');
 if(F.u_rainV)L.push('On a night of rain V opened the infirmary vent so that Misaki could hear it.')}catch(e){}return L};
/* ===KC105-END=== */
