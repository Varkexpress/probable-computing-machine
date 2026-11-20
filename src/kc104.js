/* ===KC104-BEGIN=== */
/* ===================== THE WAR: STILL IN THE CELL (kc104) =====================
   More infirmary angst during the delusion, at the author's direction. Needs kc73, kc76–kc103.
   Thirteen scenes in kc85's player-opened pool (now 208). Misaki believes that the tall one is K9, who holds them
   and means to kill them; they never warm to him (the standing rule), and their anger seethes rather than breaks
   things (kc102). What these add is what the cell takes slowly: a skill, a date, a song, a way of seeing out.
     Misaki, cell:  t_finger  t_march  t_window  t_hymn  t_wind  t_text  t_chair  t_peach
     V:             t_chairV  t_windowV  t_marchV  t_phone  t_hymnV
   Pairs: t_chair/t_chairV, t_window/t_windowV, t_march/t_marchV/t_peach, t_hymn/t_hymnV.
   Same text under both aftermath settings: nothing touches the hours, and the doctor does not appear.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via M2 and they/them.
   Notes: docs/notes_kc104.md. Tested in tools/k86_test.js and tools/k104_test.js. */
const K104=()=>{try{return typeof K103==='function'&&K103()}catch(e){return false}};

/* ===================================== MISAKI, CELL ===================================== */
k86('t_finger','m',null,'cell','Keep the finger',[
 N('The splint is on the trigger finger. Two weeks, he said, from the door, as if you would be anywhere in two weeks.'),
 N('You know what two weeks does. A finger forgets. The first joint goes slow, the pull goes long, and a round that should break clean at two pounds comes at two and a half, and somebody walks out of a car park who should not have.'),
 N('So at night, under the blanket, you practise. Not the finger; it cannot bend. The idea of it. You lie there and think the pull, slow, and the break, and the follow-through, a thousand times, until your arm aches from not moving.'),
 M2('(take up the slack. squeeze. don’t jerk. squeeze. u know this. u’ve known this since u were fourteen)','(take up the slack. squeeze. don’t jerk it. squeeze. you know this. you have known this since you were fourteen)'),
 N('On the fifth night you cannot remember whether you breathe out before the shot or after. You lie there with your heart going. You have done it ten thousand times. You have never once had to think about it.'),
 M2('(out. it’s out. half out and hold. …isn’t it?)','(out. it’s out. half out, and hold. …isn’t it?)'),
 N('You are fairly sure it is out. You lie awake until the green light has blinked through the whole of the night, trying to be sure, and you are not.')]);
k86('t_march','m',null,'cell','It might be today',[
 N('You do not know your birthday. The enrolment form says March, in your own handwriting at nine, because the woman at the desk needed a month and March was the one on the wall calendar.'),
 N('You have the date off the tray. He says the day every morning, as if it were part of the dose. It is the fourteenth of March.'),
 M2('(could be today. could be any of them. thirty-one goes at it. odds are bad but they’re never zero)','(it could be today. it could be any of them. thirty-one goes at it. the odds are bad, but they’re never zero)'),
 N('Every March you pick one. You never tell anybody which. You buy a cake from the petrol station, the yellow kind in a plastic box, and eat it on the trailer step, all of it, and that is the whole party.'),
 N('There is no cake. There is soup, and the drip, and a man in the door who is going to kill you, and somewhere a trailer with a cactus in it that nobody has watered.'),
 M2('(happy birthday, idiot. u’re probably twenty-something. in a basement. for free)','(happy birthday, idiot. you’re probably twenty-something. in a basement. for free)'),
 N('You eat the soup as if it were the cake, slowly, all of it, and you do not tell him, because it is the only thing in this room that is yours and he is not having it.')]);
k86('t_window','m',null,'cell','Draw a window',[
 N('There is no window. You have worked out north, and the boiler, and the slope of the drain. You cannot see out, and it is starting to do something to your head.'),
 N('So you make one. With the spoon handle, on the wall beside the bed, at the height your eyes are when you are lying on your side. A rectangle, about the size of a paperback. You put a cross in it for the bars of the frame.'),
 N('At night you look through it. You put the laundromat roof in it, because you know that roof better than any window you have ever owned: the vent, the gravel, the bit of tarpaulin that flaps. You put the bowling alley sign across the road, with the B out.'),
 M2('(see. there it is. u can see out. ur fine. that’s the city. it’s still there)','(see. there it is. you can see out. you’re fine. that’s the city. it’s still there)'),
 N('He sees it, in the morning, when he does the drip. He stops, and looks at the scratched rectangle, and goes on looking. You wait for him to make something of it, so that you can hate him properly.'),
 N('He does not make anything of it. He does the drip and goes. You lie and look at your window, and the city is not in it any more. It is a scratch on a wall in a basement. He looked at it and the roof went out.')]);
k86('t_hymn','m',null,'cell','Something to keep time by',[
 N('You need something to keep time by, or the hours come apart. The green light is no good; it lies.'),
 N('So you hum. The only thing you know all the way through is the thing Ronin sings at the bowling alley when he is three pints in, with the wrong words: a hymn, from a church he still lights candles in. You do not know the real words. You know his.'),
 M2('(three verses. that’s about four minutes. fifteen goes is an hour. u can count an hour)','(three verses. that’s about four minutes. fifteen goes is an hour. you can count an hour)'),
 N('You hum it under the blanket with your mouth shut. Fifteen times. Thirty. It works. You have a clock again, and it has Ronin in it, three pints in, leaning on the lane with his crowbar.'),
 N('Then, out in the passage, very low, somebody hums the next line. The real one. In tune.'),
 N('You stop. Everything in you stops. You lie there with your mouth shut and your heart going like a rabbit’s, and the passage is silent, and it does not come again.'),
 M2('(he knows it. he knows ronin’s song. how does he know ronin’s — )','(he knows it. he knows ronin’s song. how does he know ronin’s — )'),
 N('You do not hum again. You lose the clock. You lose Ronin too, a bit, because now the song has the tall one in it, and you cannot get him out.')]);
k86('t_wind','m',null,'cell','The wind tables',[
 N('You go over the wind tables, to keep your head straight. Four hundred metres, a crosswind of ten: hold-over, so many minutes of angle. You have had them in your head since you were fifteen, as other people have their phone number.'),
 N('The four hundred is there. The six hundred is there. You go for the eight, and there is a hole.'),
 N('You go round it. You come at it from the five hundred and add. The number you get is wrong; you know it is wrong the way you know a step is missing in the dark. You do it again and get a different wrong number.'),
 M2('(the bag. it’s the BAG. it’s eating the numbers. it ate the eight)','(the bag. it’s the bag. it’s eating the numbers. it ate the eight)'),
 N('It is not anger the way anger used to be. Nothing goes hot. It goes very cold and very quiet, all the way down, like water filling a room. You look at the bag on the stand for an hour without blinking.'),
 N('When he comes to change it you watch every move his hands make, and you put them away, one by one, in the place where you used to keep the eight. You have room now.'),
 M2('(take the numbers. fine. i’ll fill the space with u)','(take the numbers. fine. i’ll fill the space with you)')]);
k86('t_text','m',null,'cell','A message you cannot send',[
 N('You write Angel a message. You do it in your head, because you have no phone. It gives you something to do with the hours.'),
 M2('(angel. the rifle’s urs. don’t sell it. don’t cry on main. it’s bad for ur numbers)','(angel. the rifle’s yours. don’t sell it. don’t cry on main. it’s bad for your numbers)'),
 N('That is too short. You add the truck, and the chainsaw for Ronin. You take out the bit about her numbers, because she would think you meant it. You put it back, because she would know you did not.'),
 N('By the third day it is long. You have been through it a hundred times and you cannot stop. Every time you get to the end you go back to the top and change one word, and the word is always the same one: whether to sign it, or just leave it, the way you always leave everything.'),
 M2('(sign it. no. if u sign it it’s a goodbye. if u don’t sign it it’s just a text)','(sign it. no. if you sign it, it’s a goodbye. if you don’t sign it, it’s just a text)'),
 N('You never send it. You never decide. It sits there in your head with the cursor going after the last word, and in the end you understand that you are not writing to Angel at all. You are writing to see whether there is anybody you would sign it for.')]);
k86('t_chair','m',null,'cell','He sits in the corner all night',[
 N('The fever is bad. You know it is bad because the tall one does not go out. He brings the chair from the counter and puts it in the corner by the door, and sits down in it, and stays.'),
 N('You watch him through your lashes all night. He is between you and the door. He has a book he does not read. Every hour he gets up, puts the back of his hand to your forehead, looks at the bag, and sits down again.'),
 M2('(guarding the door. or waiting. same chair either way. same man)','(guarding the door. or waiting. the same chair either way. the same man)'),
 N('Towards dawn his head goes forward. The book slides off his knee onto the tile and he does not wake. He is asleep, sitting up, three steps from you, with the light on his face and his collar open.'),
 N('You have the spoon. You have had it for days. It is sharp now. Three steps, and he is asleep, and you could.'),
 N('You lie there and do not. You do not know why. You go through the reasons, the hounds, the door you do not know, the drip, and none of them is the reason, and that makes you angrier than anything he has done.'),
 M2('(u had him. u HAD him. asleep, three steps, and u lay there like a — what the fuck is wrong with u)','(you had him. you had him. asleep, three steps away, and you lay there like a — what the fuck is wrong with you?)'),
 N('He wakes at six with a start, and finds you looking at him, and the spoon in your fist on top of the blanket. You do not move. He does not move. Then he picks up his book and goes out, and you turn your face to the wall and hate yourself until noon.')]);
k86('t_peach','m',null,'cell','There is a peach on the tray',[
 N('There is a peach on the tray. A real one, fresh, not out of a tin. It is on the side of the tray by your good hand. There has never been a peach.'),
 M2('(why’s there a peach. what’s the peach FOR)','(why is there a peach? what is the peach for?)'),
 N('You do not touch it. You go through it as you would go through a parcel on the step. He knows about the peaches; it is in his file, page twelve, the receipts. So he wants you to know he knows. Or it is poisoned. Or it is the last meal, the thing they give you on the day.'),
 N('It is the fourteenth of March. You remember that, and something goes through you so fast and cold that you have to shut your eyes.'),
 M2('(he can’t know. NOBODY knows. it’s not even a real date. i made it up at nine)','(he can’t know. nobody knows. it isn’t even a real date. i made it up at nine)'),
 N('He cannot know. It is a coincidence, or a test, or a last meal. You leave it on the tray. When he takes the tray away the peach is still there, untouched, and he looks at it for a second longer than he looks at the bowl.'),
 N('You lie and think about the peach all night. In the morning you are sorry you did not eat it, and you cannot work out whether that is because you were hungry or because of the date.')]);

/* ===================================== V ===================================== */
k86('t_chairV','v',null,null,'The chair in the corner',[
 N('The fever is at forty. You bring the chair from the counter and sit in the corner by the door. You will not leave them alone with a fever like that, and you will not sit any nearer, because nearer is a man looming over a bed.'),
 N('Every hour you check. The forehead, the back of the hand, the bag. They are awake every time. They watch you through their lashes and you let them.'),
 N('You fall asleep towards dawn. You did not mean to; you have not slept in three days, and the body took the matter out of your hands.'),
 N('You wake at six. They are looking at you. The spoon is in their fist on top of the blanket. You know that spoon. You have watched them work it against the bed frame for a week. It would go through your throat.'),
 K76V('(I was asleep, three steps from them, with my collar open. They had the spoon and they had the night. I am still here.)'),
 N('You pick up the book and go out, because there is nothing that you can say to them that they would hear. In the passage you put your back to the wall.'),
 K76V('(They did not. I do not know why they did not. Neither, I think, do they, and it will cost them something to have found that out.)')]);
k86('t_windowV','v',null,null,'The window on the wall',[
 N('There is a rectangle scratched into the wall beside the bed, at the height of their eyes when they lie on their side. A cross through it, for the frame. Inside it, faint, there are marks: a roof line, a vent, a sign with a letter missing.'),
 N('It is the laundromat roof. You know it. You stood under it in April with the field glasses and saw them lying on it.'),
 N('You look at it too long. They are watching you look. By the time you turn away it is a scratch on a wall, and you made it one.'),
 K76V('(There is no window. There is no window anywhere on that floor. I built it so.)'),
 N('That night you leave the passage door open, and the door at the top of the back stair. There is a window on the landing, facing east. At about six the first of the light comes down the stair and along the passage and through the glass panel, and lies on the wall beside their bed, over the scratched rectangle, for nine minutes.'),
 N('You do it every morning after. You never say. You do not know whether they see it; you are not in the room at six. You stand on the stair and watch the light go down, and then you go and make the soup.')]);
k86('t_marchV','v',null,null,'March',[
 N('Their file has a copy of a school enrolment form. Date of birth: “March”, in a child’s hand, with no day and no year. You have looked at it a great many times.'),
 N('It is the fourteenth. You do not know that it is anything. Neither, you suspect, do they.'),
 N('You buy a peach. A fresh one, from the market by the river, the first of the season, flown in at a price that would keep their trailer for a month. You put it on the tray by the good hand, and say nothing about it, because anything you said would be a man in a long coat saying a date at them.'),
 N('It comes back untouched. You look at it on the tray for a second, and then you take it up to the kitchen and put it in the bowl.'),
 K76V('(They will have thought it poisoned. Or a last meal. They will have thought, being who they are, of every meaning that a peach can have in that room, except that it was a peach.)'),
 N('You eat it standing at the sink at midnight. It is very good. You write in the ledger, on their page, under the date: “Possibly.” It is the only entry in the book that you are not sure of.')]);
k86('t_phone','v',null,null,'Their phone, buzzing',[
 N('Their phone is in the counter drawer. It buzzes. It has buzzed all week.'),
 N('Angel knows that the phone is here. She sends to it anyway, at night, when she cannot sleep. You do not read them. You have never read them. You hear the drawer go against the wood, and you count.'),
 N('Two hundred and eleven. One at four this morning, and then three in a row, close together, as if she had sent one and could not stop.'),
 K76V('(Whatever she writes to them, she writes knowing that they cannot read it. I understand that better than I should like to.)'),
 N('You do not turn it off. You could; it would be kinder to the drawer. You leave it buzzing, because some night they will be well enough to read it, and when they do they ought to find that the count did not stop.'),
 N('You charge it every evening. You have never once looked at the screen.')]);
k86('t_hymnV','v',null,null,'The hymn',[
 N('They are humming. You stop in the passage with the tray. It is very low, under a blanket, through a door. It is the hymn.'),
 N('You know it from a choir, at eight. You know it from Ronin at the bowling alley, with words that would have had you thrown out of that choir. They are humming his words; you can hear the shape of them.'),
 N('Before you have thought about it at all, you hum the next line. The proper one. It is out of your mouth and into the passage before you can stop it.'),
 N('The humming stops. Through the door you hear their breath go short and fast, like an animal that has heard a twig.'),
 K76V('(I have taken that from them as well. It was theirs and Ronin’s, and now it is mine, in a voice they believe means to kill them.)'),
 N('It does not come again, not that night or the next. You stand in the passage both nights at the same hour, and listen to them not hum. You hummed one line, and that was all it took.')]);

/* ===================================== ENDINGS ===================================== */
const _xe104=extraEnding;extraEnding=function(){const L=_xe104();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const F=S.f.e2l85||{};
 if(F.t_march||F.t_peach||F.t_marchV)L.push('On the fourteenth of March there was a peach on Misaki’s tray. It came back untouched. In V’s ledger, under the date: “Possibly.”');
 if(F.t_chair||F.t_chairV)L.push('V fell asleep in the infirmary chair, three steps from Misaki and a sharpened spoon. He woke up.');
 if(F.t_window||F.t_windowV)L.push('There is a window scratched into the infirmary wall. Every morning for a while, at six, V left two doors open so that the light from the landing would fall on it.');
 if(F.t_phone)L.push('Angel sent Misaki’s phone two hundred and eleven messages while it was in V’s drawer. He charged it every evening and never looked at the screen.');
 if(F.t_hymn||F.t_hymnV)L.push('In the infirmary V hummed the next line of Ronin’s hymn through the door. Misaki did not hum again for the rest of the stay.')}catch(e){}return L};
/* ===KC104-END=== */
