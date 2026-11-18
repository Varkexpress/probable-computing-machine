/* ===KC87-BEGIN=== */
/* ===================== THE WAR: THE ROOM, FULL STORY (kc87) =====================
   Twenty-six more infirmary scenes for the enemies-to-lovers route under the full-story setting (kdSA()), in kc85's
   player-opened pool. Needs kc73, kc76–kc86.
   kc29's rules hold without exception:
     - what happened in the hours is never named, by Misaki, by V, by the doctor, by anybody, or by the narration;
     - Misaki knows, and so does V; the honest option is on the menu and always greyed (k84No → KD_NO);
     - every pretence is a kdDeny() (k84Deny); V can decline to force it and cannot make them;
     - nobody tells Angel or Ronin; what they have, they worked out;
     - no text shows V knowing anything Misaki has said to the doctor.
   Misaki, cell:  x2_corner x2_dark x2_palms x2_look x2_bag x2_back x2_gap
   Misaki, clear: x2_soap x2_mirror x2_floor x2_gross x2_hours x2_joke x2_asleep x2_weak
   V:             x2_bagV x2_leaflet x2_asked x2_noone x2_pockets x2_names x2_sheet x2_dream x2_tall x2_soapV x2_sentence
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc86_88.md. Tested in tools/k86_test.js. */
const k87Pick=(who,hint,no,why,yes,after)=>cb=>ask(who,hint,[k84No(no,why),{t:yes,fn:()=>{k84Deny();say(after.filter(Boolean),cb)}}]);

/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
k86('x2_corner','m','sa','cell','Where you sleep',[
 N('You do not sleep lying down. You sleep sitting up, in the corner where the bed meets the wall, with the blanket round you and your knees up, so that there is wall on two sides and nothing behind you.'),
 N('It is bad for the ribs. You know that. You have done the sum, and the ribs lost.'),
 N('The tall one comes in at six and finds you like that. He stands there for a while. Then he goes away, and comes back with three more pillows, and puts them on the foot of the bed where you can reach them, and goes out again.'),
 M2('(he wants me comfy. why’s he want me comfy. what’s comfy FOR)','(he wants me comfortable. why does he want me comfortable? what’s comfortable for?)'),
 N('You build the corner up with them. It is much better. You hate that it is better.')]);
k86('x2_dark','m','sa','cell','The light',[
 N('You ask about the light every evening. Politely. It is the one thing you ask for.'),
 Ms('can the light stay on. if that’s ok. i’ll be good','could the light stay on, please? if that’s okay. i’ll be good','You point at the light, and put your hands together.'),
 N('He says that it will stay on. He says it every evening in exactly the same words, and it does.'),
 N('In the dark you could not see the door. In the dark, in the other building, you only knew that the door had opened when the dark changed.'),
 M2('(don’t. don’t finish that. light’s on. look at the light)','(don’t. don’t finish that. the light’s on. look at the light)')],
 k87Pick('hitmeuppp','(The light is on.)','Finish it. Say what the dark was for.','they are not going to','Look at the light until it hurts',[
  N('You look at it until there are green holes in everything. It is still on when you stop. It is on all night.'),
  M2('(see. fine. it’s just a light. i just like light. lots of people like light)','(see? fine. it’s just a light. i just like light. lots of people like light)')]));
k86('x2_palms','m','sa','cell','Where he keeps his hands',[
 N('This one keeps his hands where you can see them. Always. Out from his sides, palms forward, like a man walking up to a dog that bites.'),
 N('When he carries the tray, both hands are on the tray. When he has nothing to carry, he holds his own wrist, in front of him. He has never once put a hand in a pocket in this room.'),
 M2('(new rule. this one shows u his hands. write it down)','(new rule: this one shows you his hands. write it down)'),
 N('You try to work out what it is for. In the other building nobody showed you anything first.'),
 M2('(…so he knows. he knows what the other ones did with theirs. and he’s showing me he’s not)','(…so he knows. he knows what the other ones did with theirs, and he’s showing me that he’s not)'),
 M2('(or he’s showing me he’s not YET. that’s the same hands either way)','(or he’s showing me that he’s not yet. it’s the same hands either way)')]);
k86('x2_look','m','sa','cell','The woman in the cardigan',[
 N('A woman comes. Grey cardigan, reading glasses on a cord, hands that smell of soap. She says that she would like to have a look at you, if you will let her, and that you can say no to any part of it.'),
 N('She says “any part of it” twice.'),
 Ms('nothing to look at. hand’s broke. ribs. that’s all there is','there’s nothing to look at. the hand’s broken. ribs. that’s all there is','You hold out the hand in the cast. Then you pull the blanket up to your chin with the other one.'),
 N('She says that that is fine. She does the hand and the ribs. She does not ask again, and she does not write for very long.')],
 k87Pick('hitmeuppp','(She has put her pen down.)','Let her look.','they are not going to','Keep the blanket where it is',[
  N('She leaves a card on the counter with a telephone number on it and no name. She says that it is good for any hour.'),
  M2('(a number. in a CELL. who am i going to call, the front desk)','(a number, in a cell. who am i going to call, the front desk?)'),
  N('You put the card down the side of the mattress, with the spoon.')]));
k86('x2_bag','m','sa','cell','The paper bag',[
 N('The clothes you came in are in a brown paper bag on the counter, folded over at the top. You did not put them there.'),
 N('They were not yours. You know whose they were not. You look at the bag for most of a morning as you would look at something that might move.'),
 N('The tall one comes in for the tray. He sees where you are looking. He picks the bag up by the very top, between two fingers, and holds it away from his body.'),
 K76V('This is going out of the room. It will not be opened. Nobody in this house will look inside it.'),
 Ms('ok','okay','You nod. You keep nodding after he has stopped talking.')],
 k87Pick('hitmeuppp','(He is holding it like something dead.)','Tell him to burn it.','you would have to say why','“it’s just clothes. do what u want”',[
  K76V('As you say.'),
  N('He carries it out at arm’s length. Later there is a smell in the corridor, faint, of a furnace burning something that is not wood. You decide that you cannot smell it.')]));
k86('x2_back','m','sa','cell','Which way you lie',[
 N('When you do lie down, it is on your right side, facing the door, with your back to the wall. You have not been on your back since the river.'),
 N('The drip is on the wrong side for that. The line pulls. Twice it has come out, and there has been blood on the sheet, and you have waited to be punished for the sheet.'),
 N('The second time, the tall one looks at the line, and at the way you are lying, and at the wall. He does not tell you to turn over. He goes and fetches a second stand, and moves the whole drip round to the other side of the bed, where it will reach.'),
 M2('(he moved the furniture. so i wouldn’t have to turn round. who DOES that)','(he moved the furniture, so that i wouldn’t have to turn round. who does that?)'),
 M2('(somebody who wants me relaxed. don’t relax)','(somebody who wants me relaxed. don’t relax)')]);
k86('x2_gap','m','sa','cell','The door, when he is in the room',[
 N('When he is in the room, the door stays open. He props it with his heel, or with the tray trolley, and he stands in the doorway, half in the corridor.'),
 N('He has never once shut himself in with you. In the other building, the first thing was always the door.'),
 M2('(he leaves it open so someone can hear. so there’s a witness. …no. so i’ve got a way out past him)','(he leaves it open so someone can hear. so there’s a witness. …no. so that i’ve got a way out past him)'),
 M2('(nobody gives u a way out. it’s so he can leave fast. that’s all. it’s for HIM)','(nobody gives you a way out. it’s so that he can leave fast. that’s all. it’s for him)'),
 N('You settle on that one. It is the only version in which he is an ordinary guard, and you need him to be an ordinary guard.')]);

/* ===================================== MISAKI: CLEAR ===================================== */
k86('x2_soap','m','sa','clear','The soap',[
 N('There is a bar of soap on the little basin. It is a good one. It smells of something: cedar, or a man’s shaving things.'),
 N('You wash your hands with it once and stand there with them held away from you.'),
 M2('(it’s soap. it’s nice soap. rich guy soap. it doesn’t smell like anybody)','(it’s soap. it’s nice soap. rich-guy soap. it doesn’t smell like anybody)'),
 N('When V comes in, you tell him that his soap is for old men, and that you want the kind with no smell at all, the kind they have in hospitals.')],
 k87Pick('hitmeuppp','(He is looking at the soap, and then at the way you are holding your hands.)','Tell him what it smelled like.','they are not going to','“it’s an old man soap. get me a normal one”',[
  K76V('It will be changed within the hour.'),
  N('It is changed within the quarter-hour. A white bar with no name on it. He takes the cedar one away himself, wrapped in a towel, and you never smell it in that house again, not on him and not on anything.'),
  M2('(he changed his own soap. upstairs too. over an insult. what a pushover)','(he changed his own soap. upstairs, too. over an insult. what a pushover)')]));
k86('x2_floor','m','sa','clear','Angel sits on the floor',[
 N('Angel comes to hug you. She comes in fast, the way she does, from the side you are not looking at, with her arms already out.'),
 N('You do not decide anything. You are simply against the wall, on the far side of the bed, with the drip stand between you, and your good hand is a fist.'),
 N('Angel stops. Her arms come down very slowly. Her camera face comes on, and goes off, and then she has no face on at all.'),
 [AN,'okay. okay. i’m going to sit down. right here. on the floor'],
 N('She sits down on the tile in a white skirt, with her back against the door, and her hands in her lap where you can see them. V does that with his hands.'),
 M2('sorry. u surprised me. i’m jumpy. it’s the meds','sorry. you surprised me. i’m jumpy. it’s the meds')],
 k87Pick('hitmeuppp','(She has not asked. She is not going to ask.)','Tell her why you are on the other side of the bed.','they are not going to','“it’s the meds. come here, ur ruining ur skirt”',[
  [AN,'it’s a cheap skirt. i’m fine down here'],
  N('She stays on the floor for an hour and talks about a brand deal. She does not once come nearer than the door. When she goes, she blows you a kiss from there, and you hear her stop in the corridor, and you hear what she does when she thinks the vent does not carry.')]));
k86('x2_gross','m','sa','clear','Ronin is being nice',[
 N('Ronin is being nice to you. He has brought grapes. He has not sworn in ten minutes. He called you “kid” in a voice like a hand on your hair.'),
 N('Ronin is only nice to things that are dying, or to things he has guessed something about.'),
 M2('stop it','stop it'),
 [RN,'Stop what.'],
 M2('being nice. it’s creepy. say something gross','being nice. it’s creepy. say something gross'),
 N('He looks at you for a while. He does not ask, and you see him decide not to, as you would see a man put a gun back.'),
 [RN,'…Vee’s got a fuckin’ toilet in this house costs more than my truck. Heated seat. I took a shit on it so long my legs went dead and he had to send a dog in.'],
 M2('better','better. thank you'),
 [RN,'Don’t thank me, I ain’t the goddamn tray guy.'],
 N('He eats all the grapes himself. It is the kindest thing anybody has done for you all week, and neither of you will ever say so.')]);
k86('x2_hours','m','sa','clear','The chart',[
 N('The chart is on the end of the bed. It has a line that says: RECOVERED, and a time, and a day.'),
 N('You know the day you were taken. You were there. So there is a sum on that page, waiting, with both of the numbers written in.'),
 M2('(don’t. it’s just hours. hours are hours. u slept through most of them)','(don’t. it’s just hours. hours are hours. you slept through most of them)'),
 N('You did not sleep through most of them. You have the ceiling. You have the radio going up. You have filed all of that under “gone”, and nobody can ask you about a thing that is gone.')],
 k87Pick('hitmeuppp','(Two numbers. One subtraction.)','Do the subtraction.','they are not going to','Turn the chart face down',[
  N('You turn it over. On the back, in fountain pen, somebody has written the date in large plain figures, and under it: THE DOOR OPENS FROM BOTH SIDES.'),
  M2('(he wrote on my chart. he’s got a pen for EVERYTHING)','(he wrote on my chart. he’s got a pen for everything)')]));
k86('x2_joke','m','sa','clear','Make a joke of it',[
 N('Ronin, Angel and V are all in the room at once, which is too many. Nobody knows what to say. So you say something.'),
 M2('well. at least they fed me. four stars. would get kidnapped again','well, at least they fed me. four stars. would get kidnapped again'),
 N('It is a good line. It is exactly the kind of thing you say.'),
 N('Nobody laughs. Ronin looks at his boots. Angel’s smile stays where it is, a second too long, like a picture left up after the people have gone. V, in the doorway, does not move at all.'),
 M2('(tough crowd. what. WHAT. it was funny)','(tough crowd. what? what? it was funny)')],
 k87Pick('hitmeuppp','(They are all very carefully not looking at each other.)','Ask them what they think they know.','you would have to hear the answer','“jeez. tough room. somebody die?”',[
  [RN,'Not yet. Workin’ on it.'],
  N('That gets the laugh, a real one, from Angel, and the room starts again. You have done it. You have got them past it. You are so tired that you could sleep on the floor.')]));
k86('x2_asleep','m','sa','clear','What you said asleep',[
 N('You talk in your sleep. You know, because you woke yourself with it, and because the doctor was in the room.'),
 M2('what’d i say','what did i say?'),
 N('She takes a moment over it. She is choosing. You have watched people choose what to tell a client, and she is good at it.'),
 N('She says that you were counting. She says that she thinks you were counting the hounds: grey, old, black, pale.'),
 M2('oh. yeah. i do that. there’s 4','oh. yeah. i do that. there are four of them'),
 N('It is true as far as it goes. You both know how far it goes.')],
 k87Pick('hitmeuppp','(She is waiting, in case there is more.)','Ask her what else you said.','they are not going to','“yeah. 4 dogs. that’s all that’s in there”',[
  N('She says that that is good to know. She writes nothing down. On her way out she turns the vent grille by the door to shut, so that the room does not carry.'),
  M2('(she shut the vent. so nobody’d hear. hear WHAT, i was counting dogs)','(she shut the vent, so that nobody would hear. hear what? i was counting dogs)')]));
k86('x2_weak','m','sa','clear','What he could do with it',[
 N('You lie awake and work out what a man does with it, when he has sworn to kill you and he knows.'),
 M2('(one: he tells the server. two: he puts it in the file, under weaknesses. three: he waits till i’m better and says it to my face, right before—)','(one: he tells the server. two: he puts it in the file, under weaknesses. three: he waits until i’m better and says it to my face, right before—)'),
 N('You know what you would do with it. You have used worse on people for nine hundred dollars.'),
 N('It is four days now. He has had it for four days. He has not said one word that comes within a mile of it. He will not look below your chin. He kneels to put a tray down.'),
 M2('(he’s not using it. he’s got the best weapon anybody’s ever had on me and he’s just… holding it)','(he’s not using it. he’s got the best weapon anybody’s ever had on me, and he’s just… holding it)'),
 M2('(i don’t know what that is. i don’t have a word for a guy who doesn’t)','(i don’t know what that is. i don’t have a word for a guy who doesn’t)')]);

/* ===================================== V ===================================== */
k86('x2_bagV','v','sa',null,'The paper bag',[
 N('You carry the paper bag out of the room at the length of your arm. It weighs almost nothing.'),
 N('It is evidence. You know what an examiner would get from it; you have handed such bags to Hale. There is a white box in a locked fridge that exists for the same purpose, and the purpose is theirs, and they have not chosen it.'),
 K76V('(I could keep it. Sealed, dated, in the safe. If they ever wished to bring the charge, it would be there.)'),
 K76V('(And it would be in my house, in my keeping, for as long as I lived. I would know what was in my safe. They would know that I knew.)'),
 N('You seal it without opening it, and take it to the doctor, and tell her that it is hers to keep or to destroy, on their word and nobody else’s. Then you burn the gloves you carried it in.'),
 K76V('(That smell in the corridor was the gloves. I should like that written down somewhere, and there is nowhere that I may write it.)')]);
k86('x2_leaflet','v','sa',null,'The doctor’s leaflet',[
 N('The doctor may not tell you what she thinks. She has told you so. She has no doubt of it, and she has said nothing, and she has left a leaflet on the kitchen island.'),
 N('It is four pages, on cheap paper. Most of it is a list of things not to do. Do not ask. Do not press. Do not touch without saying so first. Do not stand between them and a door. Do not say that you understand.'),
 N('You read it eleven times. You have it by heart on the third.'),
 K76V('(I have been doing the half of this already. I did not need to be told. I have sat in rooms with people it was done to.)'),
 K76V('(I sat in those rooms as the one who would see to the man afterwards. I have not before been the tall thing in the doorway. The leaflet has no page for a reader who had planned worse.)'),
 N('You put it in the ledger, at their page, as a marker. It is the only thing in that book which you did not write.')]);
k86('x2_asked','v','sa',null,'Ronin asks you straight',[
 N('Ronin corners you at the kennel sink. He has been looking at the tennis ball in his hand for some time.'),
 [RN,'Vee. I’m gonna ask you a thing, and you’re gonna answer it.'],
 K76V('I will answer what I can.'),
 [RN,'What’d they do to ’em. In that building. I seen the hand. I ain’t askin’ about the hand.'],
 K76V('I have been told nothing.'),
 [RN,'That ain’t what I asked.'],
 K76V('It is what I am able to answer. I have been told nothing. Nor have you. If either of us had been told, it would have been because they chose it, and they have not.'),
 N('He squeezes the ball until it splits along the seam.'),
 [RN,'You got names?'],
 K76V('Some.'),
 [RN,'I want one. I ain’t askin’ what for. You ain’t tellin’ me what for. I just want one.'],
 K76V('You will have one. For the hand.'),
 [RN,'Sure. For the hand.']]);
k86('x2_noone','v','sa',null,'Angel wants to ask them',[
 N('Angel has worked something out. You can see it on her. She is standing in your kitchen with her car keys in her fist.'),
 [AN,'I’m going to ask them. Somebody has to. They’re not going to say it to you, V, you’re — you’re you.'],
 K76V('Nobody asks.'),
 [AN,'They can’t carry that by themselves!'],
 K76V('They are carrying it. It is being done in front of us. What they are asking of us is that we do not make them carry our knowing it as well.'),
 N('She opens her mouth, and shuts it.'),
 K76V('If they wish it said, they will say it, to whom they choose. It will not be me. I should think that it may well be you. And if it is never said, then it is never said, and you will go on doing their nails.'),
 [AN,'…When did you get like this?'],
 K76V('I have not got like anything. I have read a leaflet.')]);
k86('x2_names','v','sa',null,'Three names',[
 N('You have three names from the building on the river. Ronin has one more. Each of them has an address, and at each address there is, tonight, a living man.'),
 N('It would take you one night to begin. You have the car, and the sheeting, and the table.'),
 K76V('(By my law it is owed. I have never sat on a debt.)'),
 N('You get as far as the garage. You stand there with your hand on the car.'),
 K76V('(If I go, I am eleven kilometres from that door for six hours. They wake at three. If they wake at three and the house is empty of everybody they have learned the step of — )'),
 N('You go back in. You take your coat off. You have put a man’s death second to the sound of your own shoes in a corridor.'),
 K76V('(The men will keep. I find that I have a thing which will not.)')]);
k86('x2_sheet','v','sa',null,'The roll of sheeting',[
 N('The roll of sheeting is in the garage, on the shelf where it lives. It is the one that you took to their trailer.'),
 N('You have used that plastic for every table. It is a tool. There is no more harm in it than in a bucket.'),
 K76V('(I carried that into a room where they were asleep. I sat down with it at my feet and waited for my hands to be ready.)'),
 K76V('(Others have since come into a room where they could not leave. I am not as they are. I have the files to show it. I should have to show the files to a great many people before one of them told me what the difference had felt like from the bed.)'),
 N('You take the roll down. You cut it into squares with the scalpel and line the floor of the recovery pens with it, where it will be useful to something that is getting better.'),
 N('You buy no more. You do not yet know what you will do the next time that you need it.')]);
k86('x2_dream','v','sa',null,'Three and a half hours',[
 N('You sleep three and a half hours. You have not dreamed in years; there has not been room.'),
 N('Tonight you are in their trailer at four in the morning. The sheeting is at your feet. Their rifle is across your knees. It is exactly as it was.'),
 N('In the dream they do not wake. No pistol comes to your temple. Your hands are ready. You stand up.'),
 N('You are on the floor of your own bedroom, with your back against the bed, and the black hound has its whole weight across your legs and is holding you there.'),
 K76V('(They woke. On the night itself, they woke. That is all that stood between me and it: a light sleeper.)'),
 N('You do not go back to bed. You go down and sit on the floor of the corridor, four steps from the door, where Ronin is. He looks at your face and moves his chair up without a word.')]);
k86('x2_soapV','v','sa',null,'The soap',[
 N('They have asked for the soap to be changed. They said that it was a soap for old men.'),
 N('It is the soap that you have used for twenty years. It is cedar. You saw how they held their hands after they had washed with it: away from the body, with the fingers spread, as one holds something that has been in the wrong place.'),
 K76V('(One of them wore it, or near enough. I have been walking into that room smelling of one of them.)'),
 N('You have every bar in the house taken out. You wash with the white hospital soap until your hands crack. You send the coat to be cleaned, and the second coat, and you have the sheets on your own bed changed, though they will never be within a floor of it.'),
 K76V('(I should like to know which of them it was. I am aware that I am asking in order to have somewhere to put this. It is not their business to supply me with that.)')]);
k86('x2_sentence','v','sa',null,'One sentence',[
 N('You have tried to make one sentence that you could say to them, to have it said.'),
 K76V('(“You are safe here.” A thing that every one of those men will also have said.)'),
 K76V('(“Nobody will touch you.” It has the word in it. I will not carry that word into that room.)'),
 K76V('(“I am not going to hurt you.” From a man with it in writing that he is.)'),
 N('You stand at the counter with a pencil and a sheet of the foundation’s paper and cross out eleven of them. You do not cross things out.'),
 N('In the end there are two left that are simply true and promise nothing. You say them every day, in the same order, and you will go on saying them for as long as they are needed.'),
 K76V('It is Tuesday. The door opens from both sides.')]);
/* ===KC87-END=== */
