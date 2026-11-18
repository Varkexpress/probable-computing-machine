/* ===KC90-BEGIN=== */
/* ===================== THE WAR: THE NIGHTS (kc90) =====================
   The author asked for the infirmary to read less like filler, for Misaki to be less friendly with the tall one, and
   for more horror and disgust, with new material of weight. This module is that material. (The same pass cut
   twenty-two scenes from kc86–kc89's pool and rewrote the cell-stage ones in kc84–kc86; see docs/notes_kc90.md.)
   Needs kc73, kc76–kc89.

   1. THE NIGHTS. Three long scenes per POV, one a night, delivered through hub() in the late slot (S.slot>=3) while
      kdMed(), ahead of everything else of this route's: S.f.e2l90N (how many), S.f.e2l90Day.
        I   through the wall: feeding time                         S.f.e2lN1 up|down (M), yard|bowl (V)
        II  full story: the camera, the ruler, the hand laid flat  S.f.e2lN2 (M: a kdDeny)
            injuries only: the wrists have gone bad                 S.f.e2lN2
        III the drain: the room under the room (Misaki must be clear)   S.f.e2lN3 ear|shirt (M), chain|scrub (V)
      In the cell stage Misaki believes what kc73 established: the tall one is K9, who swore to kill them slowly,
      and who has had them all along. They are not friendly to him. They comply, they watch his hands, and they wait.
   2. THE POOL (kc85's ⚔ The room / Outside the room): fifteen more scenes, each about a thing other than the tray.
        Misaki, cell:   h_mouth h_limp · injuries only: y3_splint y3_number y3_blood
        Misaki, clear:  h_hand h_log h_narrate
        V:              h_smell h_cast h_fast h_ronin h_eleven h_carry h_glass
   3. THE ROUTE. Two beats outside the infirmary:
        e2l_bucket (chapter I, free; after the cold room)   what the hounds are fed      S.f.e2lBucket fed|left (M), in|out (V)
        e2l_table  (chapter III, free; after the first one together)  the cold room, in person   S.f.e2lTable lay|stood (M), told|silent (V)
   Full-story text keeps kc29's rules (never named; the honest option greyed; a pretence is a kdDeny). Injuries-only
   text keeps kc36's (no denial, no doctor).
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc90.md. Test: node tools/k90_test.js */
const K90=()=>{try{return typeof K86==='function'&&K86()}catch(e){return false}};

/* ===================================== THE NIGHTS ===================================== */
/* ---------- I · through the wall ---------- */
function k90N1m(cb){say([
  N('The wall behind your head is not an outside wall. You worked that out from the pipes. There is a passage on the other side of it, and at night, things walk up and down it on claws.'),
  N('Tonight a steel bucket is set down on stone, about a metre from your pillow, and the claws all come at once.'),
  N('You listen to them eat. It is slow. Nobody is fighting over it; there is plenty. Something wet is pulled apart, patiently, and after a while a bone goes, with a noise like a green branch.'),
  N('Everybody in the city knows what he feeds them.'),
  M2('(one: that’s meat. two: he’s got people on a table somewhere under here. three: i had meat. an hour ago. in the bowl)','(one: that’s meat. two: he’s got people on a table somewhere under this floor. three: i had meat, an hour ago, in the bowl)'),
  N('You had all of it. Rule three: eat everything. There were small pale cubes in the broth, very tender. You remember thinking that it was the best thing you had tasted in a week.'),
  N('Through the wall, a hound sighs and lies down against the skirting, full.')],
 ()=>ask('hitmeuppp','(The bowl is on the counter. It is clean; you cleaned it with your finger.)',[
  {t:'Bring it up. Quietly, into the bowl',fn:()=>{S.f.e2lN1='up';save();say([
   N('You get two fingers down your throat and bring it up into the bowl, bent double over the broken ribs, with the sheet in your mouth so that the passage will not hear.'),
   N('Then you sit and look at what is in the bowl. You look for a long time. You are an assassin. You have seen the inside of a great many people, and you find that you cannot tell.'),
   M2('(can’t tell. it’s just meat. it all looks like meat. that’s the whole fucking problem with meat)','(i can’t tell. it’s just meat. it all looks like meat. that’s the whole fucking problem with meat)'),
   N('You pour it down the drain in the floor and wash the bowl with the water from your cup. In the morning there is a tray, and you eat everything on it, because it is rule three, and because the alternative is to let him see that you know.')],cb)}},
  {t:'Keep it down',fn:()=>{S.f.e2lN1='down';save();say([
   N('You keep it down. You lie on your right side with your knees up and your jaw shut and you keep it down, a minute at a time, for most of the night.'),
   M2('(u’ve eaten worse. u ate out of a skip for a year. it’s protein. it’s only protein)','(you’ve eaten worse. you ate out of a skip for a year. it’s protein. it’s only protein)'),
   N('You do not know that you have eaten worse. That is what you are lying here trying not to find out.'),
   N('Towards morning the eating stops. Something licks the bucket round and round, and the handle rings against the stone, and you count the rings, because a thing you are counting is a thing you are not picturing.')],cb)}}]))}
function k90N1v(cb){say([
  N('You feed them at six. The bucket is the last of the card man. You do not waste.'),
  N('You set it down in the kennel passage, as you have set one down on that spot every evening for eleven years, and they come to it. You stand and watch them eat, because a thing in your keeping is seen to its food.'),
  N('The passage shares a wall with the infirmary. You had that wall built. It is one course of brick.'),
  N('From the other side of it comes a sound that you know. It is a body trying to be sick without being heard: the breath held, a cloth in the mouth. You have had men do it on the table, towards the end, when they still thought that quiet would help them.'),
  K76V('(They can hear the hounds. They know what I am said to feed them. They had broth at five, with meat in it.)'),
  N('The black hound lifts its head out of the bucket and looks at the wall. Then all four are looking at it, with their muzzles wet.'),
  K76V('(It was chicken. I boiled it myself. I cannot say so. There is no sentence that I could put through that wall, on that subject, in my voice, that would not be the worst thing they heard this week.)'),
  N('You look down into the bucket. You have looked into it every night without a thought. Tonight you see it as it would be seen through one course of brick, by somebody who had just eaten.'),
  K76V('(I have called this not wasting. I have been rather proud of the phrase.)')],
 ()=>ask('K9','(The hounds have stopped eating. They are waiting to be told.)',[
  {t:'Take the bucket out to the far yard, tonight and every night',fn:()=>{S.f.e2lN1='yard';save();say([
   N('You pick the bucket up and carry it out through the rain to the far wall, a hundred metres from the house, and they follow you in a line, puzzled, looking back.'),
   N('They are fed there from now on. It is cold and it is inconvenient and the old hound’s hip does not like the wet grass. You do it every night for as long as that room is occupied, and you find, when the room is empty again, that you cannot make yourself bring the bucket back in.')],cb)}},
  {t:'Fetch a bowl of the same broth, and eat it at the glass',fn:()=>{S.f.e2lN1='bowl';save();say([
   N('You go up to the kitchen and ladle a bowl from the same pot. You carry it down and stand at the infirmary door, where the glass panel is, with the corridor light full on you, and you eat it. Slowly, a spoonful at a time, so that every one can be counted.'),
   N('You do not look in. You are not there to see them. You are there to be seen eating what they ate.'),
   K76V('(It proves nothing. A man who fed them that would also be a man who could eat it. I know that. It is the only thing within my reach.)'),
   N('When the bowl is empty you hold it up to the glass, tipped, to show the bottom. Behind the door the breathing has gone very quiet. You cannot tell what you have done. You have possibly made it worse.')],cb)}}]))}

/* ---------- II · full story: the camera ---------- */
function k90N2mSA(cb){say([
  N('The woman in the cardigan comes late, with a camera. It is a plain black one, with a flash. She has a short steel ruler, and a white card with a date written on it.'),
  N('She says that she would like to make a record of the hand and the wrists. Only those, unless you say otherwise. She says that the pictures will be sealed and numbered, and that they are yours.'),
  N('You look at the camera. There was a camera in the other building.'),
  N('You do not decide to do it. Your left hand comes out from under the blanket and lies down on the tray table, flat, palm to the steel, with the fingers spread as far as the breaks will let them, and the wrist turned so that the light falls across it.'),
  N('That is how the hand goes for a photograph. Somebody arranged it like that, once, finger by finger, and told it to stay. It has remembered. It is lying there now waiting for the flash, and you are looking at it from a long way up.'),
  N('The woman has stopped. She has the ruler in one hand and the card in the other and she is not moving at all.'),
  K76MV('(ok. she wants the wrists. give her the wrists. turn it over)','(okay. she wants the wrists. give her the wrists. turn it over)','(Okay. She wants the wrists. Give her the wrists. Turn it over.)','(Okay. She wants the wrists, so give her the wrists. Turn the hand over.)'),
  N('It will not turn over. It was told to stay.'),
  N('She puts the ruler down. She asks, very evenly, whether there is anything else that ought to be in the record. She says that you may say no.')],
 ()=>ask('hitmeuppp','(The hand is still lying where it was put.)',[
  k84No('Tell her what else the camera was for.'),
  {t:'“no. just the hand. take ur picture”',fn:()=>{S.f.e2lN2=1;k84Deny();save();say([
   k80Gone()?N('You shake your head. You point at the hand, once, and then you look at the wall.'):K76MV('no. just the hand. take ur picture','no. just the hand. take your picture','No. Just the hand. Take your picture.','No. Just the hand. Go on, take your picture.'),
   N('She takes four. The flash goes four times, and each time the whole room is there and then not there. In between, in the dark behind your eyes, it is a different ceiling.'),
   N('She lays the ruler beside your wrist for each one, and the card with the date. She tells you the date out loud, every time, as if the card were for you.'),
   N('When she has gone, the hand is still flat on the table. You have to pick it up with the other one, by the cast, and put it back under the blanket, like something you had borrowed.')],cb)}}]))}
function k90N2vSA(cb){say([
  N('The doctor goes in at ten with the camera. You are not to be in the corridor for it. You are at the far end, by the nail where the keys hang, and the glass panel in the door is a small lit square forty feet away.'),
  N('You see the hand come out from under the blanket. It lays itself on the tray table: flat, the fingers spread, the wrist turned to the light.'),
  N('You know that hand in that position. You have a photograph of it.'),
  N('It came to your telephone on the second day they were gone. A hand on a steel table, arranged, under a bare bulb, with a newspaper beside it. It was sent to the man they call the dog man, as proof that the goods were whole.'),
  K76V('(I studied it. I had it under the loupe for an hour. I had the grain of the table from it, and the angle of the bulb, and the edge of a window, and from those the building.)'),
  K76V('(I thought it competent, as a photograph. I remember thinking so.)'),
  N('You did not once think about how a hand comes to lie like that. Somebody spreads the fingers, one at a time. Somebody turns the wrist. Somebody says keep still, and then steps back to look at it through a lens, as you looked at it through yours.'),
  N('It has just done it again, unasked, in your house, for a woman in a cardigan who has gone white.'),
  K76V('(I was the one that picture was taken for. They were posed for me. I received it, and I enlarged it.)'),
  N('The flash goes, four times. You take the telephone out of your pocket and find the photograph and hold your thumb over it.')],
 ()=>ask('K9','(It is evidence. It found the building.)',[
  {t:'Delete it',fn:()=>{S.f.e2lN2='deleted';save();say([
   N('You delete it. It was the thing that found them, and it is the only image of that room that exists, and you put it beyond anybody’s reach, your own included.'),
   K76V('(Hale would call that destroying evidence. I call it declining to own it.)')],cb)}},
  {t:'Seal it with the doctor’s four',fn:()=>{S.f.e2lN2='sealed';save();say([
   N('You send it to the doctor, to be sealed and numbered with her four, and then you delete your own copy. It belongs in that envelope. It does not belong on a telephone in the pocket of the man it was made to please.'),
   K76V('(Five photographs of one hand. Four taken to help them, and one taken to sell them, and nothing in the pose to tell the two apart.)')],cb)}}]))}
/* ---------- II · injuries only: the wrists ---------- */
function k90N2mINJ(cb){say([
  N('The left wrist has gone bad. You knew before he did. There is a smell when the dressing comes off, sweet and brown, like the bottom of a bin in August, and you have smelled it on yourself before.'),
  N('The tall one smells it. His head goes back a little, as if he had been slapped. Then he goes out, and comes back with a steel dish, and a lamp on a stalk, and the scalpel.'),
  N('So it is tonight. He wrote SLOW, and this is where slow starts: at the place that has already been opened for him.'),
  M2('(ok. ok. u knew it was coming. go to the roof. go NOW)','(okay. okay. you knew it was coming. go to the roof. go now)'),
  N('You go to the roof. It is the one by the bowling alley, at night. Ninety metres. Wind from the left, about four. You do the hold-over. You do it again for six. You do it for a moving mark, walking, and for one who has stopped to light a cigarette.'),
  N('A long way below the roof, somebody has your wrist under a lamp and is cutting at it. You can hear the pieces go into the dish. They make a small flat sound. You count them, because the count is on the roof with you: nine, ten, eleven.'),
  N('Then there is cold water, and gauze, and the lamp goes off.'),
  N('You come down off the roof slowly. The wrist is smaller than it was. It is clean, and pink at the edges, and it hurts less than before he began. In the dish there is a spoonful of grey that used to be you.'),
  M2('(he only took the dead bit. …why’d he only take the dead bit)','(he only took the dead bit. …why did he only take the dead bit?)'),
  N('He is at the basin with his back to you, and his shoulders are going up and down. It takes you a moment to understand that he is trying not to be sick.')],
 ()=>{S.f.e2lN2=1;save();say([
  M2('(it made him sick. i’m making him sick. that’s not good. u don’t want to be the thing that turns his stomach)','(it made him sick. i’m making him sick. that’s not good. you don’t want to be the thing that turns his stomach)'),
  N('You pull the wrist back under the blanket, quickly, to get it out of his sight. Goods that disgust the buyer do not get kept.')],cb)})}
function k90N2vINJ(cb){say([
  N('You take the dressing off the left wrist and the smell comes up at you. It is sweet. It is the smell of the cold room in summer, on the fourth day of a man, when the ice has not been kept up.'),
  N('It is coming from somebody who is alive, and who is watching your hands.'),
  K76V('(Necrosis, along the upper edge. A week old. It was left in a cable tie, wet, and nobody looked at it, and it has begun to die while still attached.)'),
  N('It must come away, tonight, or the hand will follow it. You fetch the dish and the lamp and a number fifteen blade. It is the blade that you use for everything.'),
  N('You look at their face before you begin. They are not there. The eyes are open and fixed on a point above your shoulder, and the breath has gone slow and even, and the wrist in your fingers has no more resistance in it than a glove.'),
  N('You have seen that. On the table, in the last hour, the ones who have something in them go away like that, and leave you the body to get on with. You have always been grateful for it. It makes the work quieter.'),
  K76V('(They think that this is the work. They have looked at me with a blade and a dish and a lamp, and drawn the only conclusion open to them, and gone.)'),
  N('You cut. The dead tissue is grey and has no grain, and it comes away under the blade like wet paper. You lay each piece in the dish. You have laid a great many pieces in that dish.'),
  N('Your gorge comes up twice. You jointed a man in this house last month and ate an hour afterwards. You stop both times, with the blade in the air, and breathe through your mouth, and go on.'),
  K76V('(It is the same hand, the same steel, the same motion of the wrist. I am saving the arm. There is nothing in the act itself by which anybody in the room could know it.)'),
  N('When it is clean you irrigate it and dress it, and turn off the lamp. You get as far as the basin.')],
 ()=>{S.f.e2lN2=1;save();say([
  N('Behind you, the blanket moves. When you turn round they are back, and looking at you, and they have drawn the wrist in under the covers, out of your sight.'),
  K76V('(They have hidden it. They saw me at the basin, and they have concluded that the sight of them offends me, and that it will be counted against them.)'),
  K76V('(I was sick at what was done. They have taken it for disgust at what they are.)'),
  N('You empty the dish into the furnace yourself. You do not give it to the hounds. That is the first thing of that kind which you have ever burned.')],cb)})}
/* ---------- III · the drain ---------- */
function k90N3m(cb){say([
  N('You know where you are now. V’s house. The bed, the drip, the door that opens. You have been clear for most of a day, and you are lying awake being clear.'),
  N('There is a drain in the middle of the floor. A round steel grating the size of a plate. You have looked at it for days without asking what a sickroom wants with a drain.'),
  N('At two in the morning, something comes up through it. Water, running, a long way down. Under the water, a scraping, steady, back and forth: a wire brush on steel.'),
  N('You get out of bed. It takes a while. You get down on the tile on your good side and put your eye to the grating, and then your ear.'),
  N('It is another room. You cannot see it, but you can hear the size of it. It is this size. It has a hard floor and bare walls and something large and metal in the middle, and the drain in its ceiling is the drain in your floor.'),
  M2('(he sent me a link. white tile. a drain. a steel table. i watched it on my phone eating cereal)','(he sent me a link. white tile, a drain, a steel table. i watched it on my phone, eating cereal)'),
  N('You look up from the floor at the room you are in. White tile. A drain. In the middle, where a table would stand, a bed.'),
  M2('(it’s the same room. he built it twice. one on top of the other. one for taking them apart and one for—)','(it’s the same room. he built it twice, one on top of the other. one for taking them apart, and one for—)'),
  N('You do not have the end of that. From the inside there is nothing to tell you which of the two you have been put in. The tile is the same tile. The only difference you can find is a word on the door, and he chose the word.'),
  N('Down the drain, the brush stops. A man coughs, and spits, and is sick: thoroughly, with his whole back in it, like somebody who has been holding it in for days. Then the brush starts again.')],
 ()=>ask('hitmeuppp','(The grating is cold against your face.)',[
  {t:'Stay on the floor, with your ear to it',fn:()=>{S.f.e2lN3='ear';save();say([
   N('You stay. You lie on his tile with your ear on his drain and listen to him scrub. It goes on until four. He is sick twice more.'),
   M2('(that’s him. that’s grandpa. down there throwing up in his own murder room)','(that’s him. that’s grandpa, down there, throwing up in his own murder room)'),
   N('You do not know what a man is scrubbing off a table at two in the morning, or why it should turn his stomach now when it never has. You know that he has no idea anybody can hear him. It is the first time you have ever had him at a disadvantage, and you cannot find a single thing to do with it.')],cb)}},
  {t:'Stuff the drain with his T-shirt',fn:()=>{S.f.e2lN3='shirt';save();say([
   N('You pull his T-shirt off over your head, one-handed, and push it down into the grating with your thumb until the sound stops.'),
   N('Then you are sitting on the floor of the room above the cold room with no shirt on, and the green light blinking, and it is quiet. You count your ribs with your good hand. They are all there. Three of them move.'),
   M2('(he’ll find it in the morning. he’ll know i heard. good. let him know one thing about me he didn’t write down himself)','(he’ll find it in the morning. he’ll know that i heard. good. let him know one thing about me that he didn’t write down himself)')],cb)}}]))}
function k90N3v(cb){say([
  N('The cold room, two in the morning. You have a wire brush, a bucket of hot water with soda in it, and the steel table. The straps are gone from it. You burned them.'),
  N('You have scrubbed this table after every use. It is clean. There has been nothing on it since the card man. You are scrubbing it again because you came down here to look at it and found that you could not stand and look.'),
  N('The water runs off the steel and across the tile and down the drain in the floor. You watch it go. Above the table there is a second drain, in the ceiling, a round steel plate. It was cheaper to run the two rooms on one stack. You approved the drawing yourself.'),
  K76V('(It is the same room. I built it twice. I chose the same tile, because I had found one that cleaned well.)'),
  N('The room above is the infirmary. You put them there because it was the only bed in the house with a drip stand beside it. You did not think about what it stood on.'),
  K76V('(For four days they have been lying over this table. Whatever I washed off it went down a pipe that passes under their bed. I washed the card man down it while they were on the river, and I cleaned his dish while they were learning to thank me for soup.)'),
  N('It comes up without warning. You are sick into the bucket, with both hands on the edge of the table, as you have seen men be sick on it. It does not stop when there is nothing left.'),
  N('When you can stand, you listen. There is no sound from the ceiling. You tell yourself that the pipe does not carry.')],
 ()=>ask('K9','(The table is clean. It has been clean for an hour.)',[
  {t:'Chain the cold room door',fn:()=>{S.f.e2lN3='chain';save();say([
   N('You take the chain from the kennel gate and put it through the handles of the cold room door, and close the padlock, and hang the key on the nail beside the infirmary keys, where anybody may see it.'),
   K76V('(While they are in this house, that room is shut. I do not know what I shall do when the next name comes due. I find that I am able to leave that for another night.)'),
   N('On your way up you pass the infirmary. In the morning you will find your own T-shirt pushed down into the drain in its floor, or you will find nothing. You will not learn which it would have been until you look.')],cb)}},
  {t:'Pour bleach down the drain, and go on scrubbing',fn:()=>{S.f.e2lN3='scrub';save();say([
   N('You pour a gallon of bleach down the floor drain, and a second, so that whatever is in that pipe is nothing. Then you go on with the brush.'),
   N('You scrub until four. The steel is thin and bright where you have been at it, and there are grey threads of it in the water. You are wearing the table away. You are aware of that, and you do not stop until your hands will no longer close on the brush.'),
   K76V('(I cannot get it clean. I am no longer certain what I should be satisfied with.)')],cb)}}]))}
function k90Night(){try{if(!S||!S.f||!K90()||dlg||typeof kdMed!=='function'||!kdMed()||(S.slot||0)<3)return null;const f=S.f;if(f.e2l90Day===S.day)return null;
 const n=f.e2l90N||0,m=S.pov!=='v',sa=k84SA();if(n>=3)return null;if(n===2&&m&&kdClar()<2)return null;
 const fn=n===0?(m?k90N1m:k90N1v):n===1?(m?(sa?k90N2mSA:k90N2mINJ):(sa?k90N2vSA:k90N2vINJ)):(m?k90N3m:k90N3v);
 return cb=>{f.e2l90N=n+1;f.e2l90Day=S.day;f.e2l80Slot=S.day+'/'+(S.slot||0);save();go(cutBg(m?'#040404':'#030306'));fn(cb)}}catch(e){return null}}
const _hub90=hub;hub=function(){const a=arguments,self=this;try{const s=k90Night();if(s)return s(()=>_hub90.apply(self,a))}catch(e){}return _hub90.apply(self,a)};

/* ===================================== THE POOL ===================================== */
/* ---------- Misaki, cell ---------- */
k86('h_mouth','m',null,'cell','Your mouth says it without you',[
 N('The tall one sets the cup down. Your mouth says thank you.'),
 N('You were not there for it. You were thinking about the drain. The words came out by themselves, in the good voice, with the little lift at the end, the way a hand comes off a hot ring before you have felt the heat.'),
 M2('(i didn’t say that. my MOUTH said that. who’s driving)','(i didn’t say that. my mouth said that. who’s driving?)'),
 N('You bite the inside of your cheek, hard, to make it yours again. It works. There is a taste of coins, and something warm runs out of the corner of your mouth.'),
 N('He sees the blood. He comes across the room in two strides, fast, with his hand out towards your face.'),
 N('You have never seen him move fast. Everything in you goes flat. You are on your back with your hands open beside your head and your chin up, and you did not choose that either.'),
 N('He stops as if he had walked into glass. His hand is in the air a foot from your jaw. He takes it back, slowly, and holds it against his own chest with the other one, and backs away until he reaches the door.'),
 M2('(he was going for my throat. then he changed his mind. don’t give him a reason to change it back)','(he was going for my throat, and then he changed his mind. don’t give him a reason to change it back)')]);
k86('h_limp','m',null,'cell','He has to lift you',[
 N('The sheet has to be changed. He says so, from the door, and says that he will have to lift you to do it, and waits.'),
 N('You know about being lifted. In the other building you were moved, between rooms, by whoever was on. You learned that it goes quicker limp. If you go limp there is nothing for them to get a grip on in you, and they put you down sooner.'),
 N('He gets one arm under your knees and one behind your shoulders. You go limp.'),
 N('Your head drops back over his arm. Your good hand hangs. You are looking at the ceiling upside down, the green light, the crack, and you have gone a long way off behind your eyes and left him the weight.'),
 N('He makes a sound. It is low, and not a word, and it comes from somewhere under his ribs. You feel it through his arm more than you hear it.'),
 M2('(what. i’m making it easy. this is me making it EASY)','(what? i’m making it easy. this is me making it easy)'),
 N('He puts you down in the chair as though you were hot. He strips the bed with his back to you, and it takes him three tries to get the corner of the clean sheet on, because his hands will not do it.')]);
k86('y3_splint','m','inj','cell','Nobody has done the fingers',[
 N('Nobody has done the fingers. If they are left, they will set bent, and a bent trigger finger is the end of rent.'),
 N('So you do them, in the night, by the green light, with your back to the door. The spoon off the first tray. A strip off the hem of the sheet, torn with your teeth. Two fingers bound to the handle, straight, with the knot on the back.'),
 N('It takes an hour. You stop every time there is a step in the corridor and hide the hand under your thigh.'),
 M2('(if he finds it he’ll take the spoon. if he takes the spoon they set bent. so he doesn’t find it)','(if he finds it he’ll take the spoon. if he takes the spoon they set bent. so he doesn’t find it)'),
 N('He finds it at six. He lifts the blanket to see to the drip, and there it is, and he stands looking down at a spoon tied to a hand.'),
 N('You wait for him to take it. You have the sentence ready, in the good voice: that you will not do it again.'),
 N('He lays the blanket back over the hand, exactly as it was, and goes out. When he comes back he has a proper splint, padded, and he puts it on the counter where you can reach it, and leaves you to change them over yourself. He does not touch the spoon. His face is the colour of the tile.')]);
k86('y3_number','m','inj','cell','Out of ten',[
 N('He asks you to put a number to the pain, out of ten.'),
 N('It is a trap, and an old one. Say high and they know where to press. Say low and they think you have something left.'),
 M2('(what’s the number that makes him stop asking)','(what’s the number that makes him stop asking?)'),
 Ms('2','two','You hold up two fingers.'),
 N('It is also true, as it happens. The hand is three bones and the ribs are three more, and next to some things you have had, it is a two. You did not mean to tell him the truth. It was simply the safest number.'),
 N('He writes it down. He looks at the hand, and at the number, and at you. You watch him work out what your ten must have been, and you see the exact moment that he gets there.'),
 M2('(don’t look at me like that. that’s not on the menu. u get the hand and the ribs)','(don’t look at me like that. that’s not on the menu. you get the hand and the ribs)'),
 N('He leaves two tablets on the counter and does not say what they are. You do not take them. You have never been anywhere that it paid to be slow.')]);
k86('y3_blood','m','inj','cell','There is blood when you go',[
 N('There is blood in it when you go. Pink, in the steel pan, like water somebody has rinsed a brush in.'),
 N('You know what that is. A kidney took a boot. Pink is a bruise; red is a split. It clears in three days if you drink. You have had it twice, and the first time, at eleven, you thought that you were dying and told nobody, because whoever you told would have had to pay for a doctor.'),
 N('He will see the pan. He sees everything. So either he sees it and you said nothing, or you say.'),
 Ms('there’s blood. it’s the kidney. it stops if i get water','there’s blood. it’s the kidney. it stops if i get water','You tilt the pan towards him, and look at the floor.'),
 N('You say it to his shoes. You are asking a man who means to kill you for a glass of water so that you will be in better condition when he does it. You are aware of how that sounds.'),
 N('He brings a jug. He fills the glass himself, and his hand shakes on the jug, and some of it goes on the counter.'),
 M2('(he’s shaking. he’s angry about the pan. he wanted me whole)','(he’s shaking. he’s angry about the pan. he wanted me whole)')]);
/* ---------- Misaki, clear ---------- */
k86('h_hand','m',null,'clear','The cast comes off for cleaning',[
 N('V takes the cast off to clean under it. He saws down the side with something that buzzes, and opens it like a shell.'),
 N('There is a hand inside. It is grey. It is thinner than the other by a third, and the skin is coming off it in soft white flakes, and the hair on the back has gone. Two of the nails are missing. In the beds where they were, something ridged and yellow has started.'),
 N('It smells like a wet dog. It smells like the inside of a boot.'),
 M2('that’s not mine','that’s not mine'),
 K76V('It is yours. It has been in the dark for nine days. It will come back.'),
 M2('that’s a dead guy’s hand. u’ve sewn a dead guy’s hand on me. is that what u do down here','that’s a dead guy’s hand. you’ve sewn a dead guy’s hand on me. is that what you do down here?'),
 N('It is a joke. It comes out of you without any air in it.'),
 N('He washes it. Warm water, a cloth, each finger separately, round the pins. Dead skin comes away on the cloth in rolls. He does not hurry and he does not look away, and you find that you are looking at his face and not at the hand, because his face is easier. He is not disgusted by it. You are, and he is not.'),
 M2('(he’s seen worse. he’s MADE worse. of course it doesn’t bother him)','(he’s seen worse. he’s made worse. of course it doesn’t bother him)'),
 M2('(…it’s bothering me that it doesn’t bother him. what is WRONG with me)','(…it’s bothering me that it doesn’t bother him. what is wrong with me?)')]);
k86('h_log','m',null,'clear','The book in the counter drawer',[
 N('There is a book in the counter drawer. Green cloth, the size of a cash book. You are bored, and it is his, so you read it.'),
 N('It is a record of this bed. His writing, one entry a page, eleven years of it.'),
 N('“Hound, grey, female. Used for fighting. Jaw wired, lower left. Would not eat for six days. Ate on the seventh from the hand.” “Hound, black, male. Found chained. Collar grown into the neck; removed under sedation, forty minutes. Bit me twice. Was right to.”'),
 N('There are eleven with a line ruled under them and a date, and a single word: “Lost.” He has written what he did wrong, each time, underneath, in smaller letters.'),
 N('The last entry has no ruled line. It is in the same hand and laid out the same way.'),
 N('“Misaki. Weight on admission, as the grey hound less four pounds. Left hand, three metacarpals. Ribs 7, 8, 9, left. Will not lie on the back. Will not be approached from behind. Thanks me. Is not to be thanked back. Ate on the first day, everything, too fast, from fear. Not to be hurried.”'),
 M2('(he wrote me up like a dog)','(he wrote me up like a dog)'),
 M2('(…it’s the nicest thing anybody’s ever written about me. he wrote me up like a DOG and it’s the nicest—)','(…it’s the nicest thing anybody’s ever written about me. he wrote me up like a dog, and it’s the nicest—)'),
 N('You put it back in the drawer, at the same angle. There is another book with your name in it, upstairs, that says TO BE KILLED. You have no idea which one he reads at night.')]);
k86('h_narrate','m',null,'clear','Angel is narrating',[
 N('Angel is doing the nails on your good hand, and she is narrating. She does it when she is frightened. She does it on rooftops before a shot. Only the four of you have ever heard it.'),
 [AN,'and she takes the pink. and she does the thumb first, because the thumb’s the big one. and she does not look at the other hand'],
 [AN,'and it’s fine. everybody’s fine. it’s a self-care day. and she breathes in'],
 N('Her own hands are shaking. She paints a stripe of pink across your knuckle and does not see it.'),
 M2('angel. ur doing the voice','angel. you’re doing the voice'),
 [AN,'and they notice the voice. and she says, i know, baby, i can’t stop, if i stop i’m going to walk upstairs and put both barrels through the first man i see'],
 M2('that’d be v','that would be v'),
 [AN,'and she knows who it would be'],
 N('She does the little finger. She gets the star on it perfectly, dead centre, with a hand that is shaking like a wire. She never misses. That is the frightening thing about her; it always has been.'),
 [AN,'and she breathes out.']]);
/* ---------- V ---------- */
k86('h_smell','v',null,null,'The smell of the room',[
 N('You know the smell before you have the door fully open. You could not have named it to anybody. You have never had to.'),
 N('It is fear, four days old, in a shut room. Sweat that has dried and been sweated through again. Something sharp underneath, from the gut. A body keeping itself ready, hour after hour, with nothing to do with it.'),
 N('It is the smell of the cold room on the fourth night of a man. You have worked in it for eleven years. You have eaten your dinner in it.'),
 K76V('(I had thought of it as the smell of the room. A property of the tile, and of the drain.)'),
 N('It is not the tile. It has come upstairs with you. You are standing in a sickroom, with soup on a tray, and the air in it is the air of your workshop, and it is being made by somebody for whom you are fetching a pillow.'),
 N('There is no window to open. You had the room built without one, for the animals’ sake; they settle better. You stand in the doorway, breathing it, and you do not let yourself breathe through your mouth.'),
 K76V('(I will not spare myself that. It is the one honest report in the house of what I am to them.)')]);
k86('h_cast','v',null,null,'Under the cast',[
 N('You open the cast to clean beneath it. The hand inside has been in the dark for nine days.'),
 N('It is grey, and wasted, and the skin is lifting from it in sheets. Two nails are gone. You have handled a great deal of dead flesh, and you know it by the feel: cool, obedient, finished with.'),
 N('This is warm. When your thumb comes near the pin it moves. A tendon stands up under the skin, of its own accord, and lies down again.'),
 K76V('(I am used to hands that have stopped. I had forgotten that they do this.)'),
 N('They say that it is a dead man’s hand. They ask whether that is what you do down here. It is said as a joke, and there is no breath behind it.'),
 N('You wash it. Each finger. The skin comes away on the cloth and you rinse the cloth and go on. You do not find it disgusting. You look for the disgust, and it is not there, and you understand that it has all gone elsewhere: to a boot heel, and a man you have not yet met.'),
 K76V('(I can wash this for an hour and feel nothing but care for the work. Show me the heel that did it, and I should not be able to keep my food down. I have got the two the wrong way round, for a man in my trade, and I do not think that I can put them back.)')]);
k86('h_fast','v',null,null,'You moved too quickly',[
 N('There was blood at the corner of their mouth. You thought of the ribs, and of a lung, and you crossed the room.'),
 N('You crossed it quickly. You had not moved quickly in that room before. You had made a rule of it.'),
 N('They went flat. You have never seen a thing done so fast. On the back, the hands open on the pillow either side of the head, the chin lifted, the throat given. Every part of them arranged, in less than a second, so as to be no trouble.'),
 N('Nobody is born knowing how to lie like that. It is taught. It is taught by repetition, by somebody who wants a thing made easy.'),
 K76V('(I have had forty-one on the table. Not one of them offered me the throat. They fought the straps to the last.)'),
 N('Your hand was a foot from their jaw. You took it back and held it against your own chest, and it was some time before you could trust it at your side.'),
 N('The blood was from the cheek. They had bitten it. You learned that afterwards, from a stain on the pillow. They would not open the mouth for you, and you did not ask twice.'),
 K76V('(I went at them like a man with a claim. For one second I was exactly what they took me for. I should like to be sick, and I have not earned it.)')]);
k86('h_ronin','v',null,null,'Ronin cannot look',[
 N('Ronin comes down while you are doing the wrists. He stops in the door. He looks at what is under the lamp for about as long as it takes to read a line, and then he is gone.'),
 N('You find him in the kennel passage with his forehead against the brick.'),
 [RN,'I done worse’n that. You know I have. I done worse’n that to a guy last month and whistled.'],
 K76V('I know.'),
 [RN,'I LIKE it, Vee. That’s the thing. I ain’t like you, I don’t need a fuckin’ reason. I like the noise it makes.'],
 N('He turns round. He is grey, and there is sweat on his lip.'),
 [RN,'So why can’t I look at that. It’s a wrist. It’s two inches of wrist.'],
 K76V('Because it is theirs.'),
 [RN,'That ain’t supposed to make a difference. Meat’s meat. Devil don’t care whose.'],
 N('You have nothing for him. You have been asking yourself the same question for four days, in longer words.'),
 [RN,'Every one I ever did was somebody’s. Wasn’t they. Had a — had somebody standin’ in a hall like this.'],
 [RN,'…Nah. Fuck that. Don’t answer that. I’m goin’ to church.'],
 N('He goes. It is Wednesday, and three in the morning, and the church will be locked. He goes anyway.')]);
k86('h_eleven','v',null,null,'Their temperature is up',[
 N('At midnight their temperature is up. A degree and a half. You take it again, and it is the same.'),
 N('You have a cold room in the lower wing for the eleven that did not live. Each of them was brought to this bed, and each of them ran a fever on the third night, and you sat where you are sitting now and did everything that was in the text.'),
 N('You know the look of the third night. The eyes too bright. The skin dry. They stop taking water, and you tell yourself that it is sleep.'),
 K76V('(If I lose this one, it is twelve. I shall have killed them after all, in the infirmary, by not being good enough. It would satisfy the ledger to the letter.)'),
 N('You find that you cannot bear the neatness of it.'),
 N('You sit by the bed with a basin and a cloth, four steps forgotten, and you bring it down by hand, as you have done for the hounds: the wrists, the throat, the backs of the knees. They are too far under to know who is doing it. They turn their face into the cloth.'),
 N('It breaks at five. You take it three times to be certain. Then you go out to the kennel, and sit down in the straw among the four that lived, and put your face in your hands.'),
 K76V('(I have never wanted anything in my book to go on breathing. I do not know what to do with a list that I am afraid of completing.)')]);
k86('h_carry','v',null,null,'How they go, when you lift them',[
 N('The sheet must be changed. You tell them, from the door, that you will have to lift them. You wait for a count of ten, so that they may refuse.'),
 N('They do not refuse. You get an arm under the knees and an arm behind the shoulders, and you take the weight.'),
 N('They go slack. All at once, like a line let go. The head drops back over your arm; the good hand swings. The eyes are open and nobody is using them.'),
 N('You have carried that. Down the cellar stair, to the table, more than once, when a man had fainted or the sedative had him. A thing weighs like that when it has stopped objecting.'),
 K76V('(They are not unconscious. They have done it on purpose. It is what one does in order to be put down quickly.)'),
 N('A noise comes out of you. You do not have a name for it. You have not made it before.'),
 N('You set them in the chair. You cannot get the sheet onto the bed; your hands have gone stupid, and the corner comes off three times. Behind you there is no sound at all. They are sitting exactly as you left them, waiting to be collected.')]);
k86('h_glass','v',null,null,'Your reflection in the door',[
 N('At night the glass in the infirmary door shows you yourself, laid over the room.'),
 N('A tall man in a dark coat, with keys at his belt. Behind him, through him, a bed, and something small in the corner of it, sitting up, with its knees drawn in.'),
 N('It is how they see you. It is also how you looked on a feed that you sent to a telephone, at three in the morning, in a rubber apron, holding up a man’s hand to a lens. “This is what the word slow means when I write it.”'),
 K76V('(I showed them that. I chose the angle. I wished them to know precisely what stood over them.)'),
 N('They knew it precisely. They carried it into a building on the river, and through four days there, and out again, and when they opened their eyes in a tiled room with a drain, the thing standing over them was the thing from the feed.'),
 K76V('(I have been wondering why they took me for the worst of it. I supplied the picture myself.)'),
 N('You take the coat off. You hang the keys at the far end of the corridor. It makes no difference to the glass. The height is still there, and you cannot take that off.')]);

/* ===================================== THE ROUTE: TWO BEATS ===================================== */
function k90Bucket(){k77Go('#080707');k73Mark('e2l_bucket',1);const m=k76M(),f=S.f;
 const L=m?[
  N('You are in his kennel passage at six in the evening, behind the feed bins, because you want to know what time the back door is unlocked. It is unlocked now. He comes through it with a steel bucket.'),
  N('He sets it down. The four of them come to it without a sound and put their heads in.'),
  N('You have a clear line into the bucket from where you are. It is cubed. Somebody has taken trouble over it: the pieces are all of a size, and trimmed, and cold enough to smoke a little in the warm air. On the top there is a piece with a tattoo on it. An anchor, blue, gone soft at the edges.'),
  N('The card man had an anchor on his forearm. You watched it through a scope for three nights, lighting cigarettes.'),
  M2('(oh. oh, that’s — ok. that’s what the link was FOR. the fingers were just the start)','(oh. oh, that’s — okay. that’s what the link was for. the fingers were just the start)'),
  N('You have killed forty people. You have never once thought about where they went afterwards. They went into the morning paper, and you went for noodles.'),
  N('The black hound takes the anchor. It chews with its eyes half shut. V stands over them with his hands clasped behind his back, watching them eat, and on his face there is the nearest thing to tenderness that you have ever seen there.'),
  M2('(that’s the plan for me. that’s what “slow” ends in. a bucket. and him looking like THAT)','(that’s the plan for me. that’s what “slow” ends in: a bucket, and him looking like that)')]:[
  N('Six in the evening. You carry the bucket down to the kennel passage. It is the best of the card man: the long muscles, trimmed and cubed, chilled overnight. You have left the skin on one piece, with the anchor, because the black hound likes something to work at.'),
  N('They eat. You stand over them. It is the quietest quarter of an hour in your day.'),
  N('The grey hound stops, and lifts her head, and looks at the feed bins. Then she goes back to the bucket. She has decided that it is nothing she need mention.'),
  N('You know that look. You follow it. Behind the third bin, between the bin and the wall, there is the toe of a boot, size five.'),
  K76V('(They are in my house. They are four metres from me, and they have a clear view of the bucket.)'),
  K76V('(Good. Let them see where it ends. I have shown them the table. This is the remainder.)'),
  N('You do not turn your head. You stand with your hands behind your back and let them look for as long as they can bear to. You are a little surprised by how long that is.')];
 say(L,()=>ask(K73Who(),m?'(The old hound has left the bucket. He is coming towards the bins.)':'(The old hound has left the bucket. He is walking to the bins.)',m?[
  {t:'Hold out what is in your pocket',sub:'the meat you took from his kitchen',fn:()=>{f.e2lBucket='fed';save();say([
   N('The old hound comes round the bin and finds you. He does not bark. He looks at you, and then at your pocket, where there is a piece of ham that you lifted from the cold larder on the way in.'),
   N('You hold it out. He takes it from your palm, very gently, with his lips. His muzzle is wet, and it leaves a mark across your hand, pink.'),
   M2('(that’s the card man. on my hand. that’s the card man)','(that’s the card man, on my hand. that’s the card man)'),
   N('You do not wipe it off until you are over the wall. You scrub it on the grass, and then on your jeans, and that night you wash the hand until the water runs cold. In the morning you can still tell exactly where it was.')],hub)}},
  {t:'Keep still until he loses interest',fn:()=>{f.e2lBucket='left';save();say([
   N('The old hound comes round the bin and stands over you. His breath is on your face. It smells of the bucket.'),
   N('You keep still. You are very good at it. He looks at you for a long time with his one clear eye, and then he sighs and goes back and lies down, and V has not turned his head once.'),
   M2('(he knows. he KNOWS i’m here. he’s letting me watch)','(he knows. he knows that i’m here. he’s letting me watch)'),
   N('You go out over the wall at seven. You are sick in the lane, tidily, behind a skip. You are annoyed about it. You have seen worse; you have done worse. You had never before seen it eaten.')],hub)}}]:[
  {t:'Let the old hound go to them',fn:()=>{f.e2lBucket='in';save();say([
   N('The old hound goes round the bin. You hear him stop. You hear nothing for some seconds, and then the small wet sound of a hound taking something from a hand.'),
   K76V('(They are feeding him. With their fingers. From my larder, I have no doubt.)'),
   N('He comes back to the bucket licking his lips. You do not look at the bins. When you come down again at ten, the boot has gone, and on the lawn by the back wall there is a patch of grass rubbed raw, as if somebody had been cleaning a hand on it.'),
   K76V('(They did not like the feel of it on them. I have never thought to ask what it feels like.)')],hub)}},
  {t:'Call him back',fn:()=>{f.e2lBucket='out';save();say([
   K76V('Leave it.'),
   N('The old hound stops. He looks at the bins, and at you, and comes back, slowly, to show you what he thinks of the order.'),
   N('You stand another ten minutes. You do not turn round. At seven you hear the ivy move on the back wall, and afterwards, faintly, from the lane, somebody being sick behind the skip.'),
   K76V('(So that is the limit of them. Forty dead, and they cannot stomach a bucket. I have found a thing that they are squeamish about, and I find that I have no wish to use it.)')],hub)}}]))}
function k90Table(){k77Go('#050608');k73Mark('e2l_table',1);const m=k76M(),f=S.f;
 const L=m?[
  N('You ask to see it. You have been in his house for weeks; you have slept over it. You say that you are not going to go on living on top of a room you have only seen on a phone.'),
  N('He takes you down. There is a chain on the door, and he has to fetch the key from a nail.'),
  N('It is the infirmary. That is the first thing. The same tile, the same lamp, the same round drain; you could lay one over the other. Where your bed was, there is a steel table with a gutter round the edge, and no straps on it. There are six holes where straps were bolted.'),
  N('It is very clean. It smells of soda. On the steel, in the middle, there is a patch worn bright and thin, as if somebody had gone at it with a wire brush for a long time.'),
  M2('this is where u were going to do it','this is where you were going to do it'),
  K76V('Yes.'),
  M2('show me. where’d i have gone','show me. where would i have gone?'),
  N('He does not want to. You watch him not want to, and you wait, because you have a right to it.'),
  K76V('The head at that end. The left hand first, for the trigger finger. I had allowed nine days.')]:[
  N('They ask to see it. They say that they will not go on living over a room that they have only seen on a telephone.'),
  N('You take them down. You have to fetch the key to the chain. You have not opened that door since the night you scrubbed the table.'),
  N('They stand in the doorway and look. You watch them see that it is the infirmary: the tile, the lamp, the drain. They look at the six holes in the steel where the straps were.'),
  K76MV('this is where u were going to do it','this is where you were going to do it','This is where you were going to do it.','So this is where you were going to do it.'),
  K76V('Yes.'),
  K76MV('show me. where’d i have gone','show me. where would i have gone?','Show me. Where would I have gone?','Show me. Go on. Where would I have gone?'),
  N('You do not wish to. They have a right to it. You have never refused anybody the terms of the charge.'),
  K76V('The head at that end. The left hand first, for the trigger finger. I had allowed nine days.')];
 const lay=()=>{f.e2lTable='lay';apply({aff:2});save();say([
   N(m?'You get up on it. He makes a movement to stop you and does not finish it. You lie down on the steel, on your back, with your head at that end and your left hand out where he said.':'They get up on it. You begin to put a hand out and do not finish. They lie down on the steel, on the back, with the head at that end and the left hand out where you said.'),
   N(m?'It is cold right through your shirt. Over your face there is a lamp on an arm, and beyond the lamp a round steel plate in the ceiling. You know what is on the other side of that plate. You lay looking down through it, one night, from a bed.':'They look up at the lamp, and past it at the plate in the ceiling. You see them recognise it.'),
   K76MV('huh. u can see the drain from here','huh. you can see the drain from here','Huh. You can see the drain from here.','Huh. You can see my drain from here. I used to listen to you through that.'),
   K76V('Get down. Please.'),
   N(m?'It is the first time he has ever said please to you. His face is the colour it went over the wrists. You stay where you are for another ten seconds, to have had them, and then you get down.':'It is the first time that you have said please to them. They stay another ten seconds, deliberately, and then they get down, and you find that you have been holding the edge of the door.'),
   K76MV('(i’ve been on his table now. and got off it. nobody else can say that)','(i’ve been on his table now, and got off it. nobody else can say that)','(I’ve been on his table now, and got off it. Nobody else can say that.)','(I’ve been on his table now, and I got off it. Nobody else alive can say that.)')],hub)};
 const stood=()=>{f.e2lTable='stood';apply({aff:2});save();say([
   N(m?'You do not go in. You stand on the sill with your good hand on the frame and look at the bright patch on the steel.':'They do not go in. They stand on the sill with the good hand on the frame, and look at the patch that you wore into the steel.'),
   K76MV('what’s that. the shiny bit','what’s that? the shiny bit','What’s that? The shiny bit.','What’s that, in the middle? The shiny bit.'),
   m?K76V('I cleaned it. One night, while you were upstairs. I found that I could not get it clean.'):K76V('I cleaned it. One night, while you were upstairs. I found that I could not get it clean.'),
   N(m?'You heard that. You were on the floor above with your ear on a drain. You look at him, and you very nearly tell him.':'They look at you for a long moment. There is something that they are deciding whether to say, and they decide against it.'),
   K76MV('u missed a bit','you missed a bit','You missed a bit.','You missed a bit. There, by the gutter.'),
   N(m?'He looks. There is nothing there. It takes him a second to understand that it was a joke, in that room, about that table, and when he does, something goes across his face that you have no name for.':'You look. There is nothing there. It is a joke. They have made a joke, in this room, about this table, to you. You have to turn away from them for a moment and look at the wall.')],hub)};
 say(L,()=>ask(K73Who(),m?'(Six bolt holes. A lamp. The drain.)':'(They are looking at the table as they look at a roof.)',m?[
  {t:'Get up on the table',sub:'lie where he said',fn:lay},{t:'Stay in the doorway',fn:stood}]:[
  {t:'Tell them all of it, in order, if they ask',fn:lay},{t:'Say nothing more',fn:stood}]))}
(function(){try{if(typeof K73B==='undefined'||typeof k76Card!=='function')return;const at=id=>K73B.findIndex(b=>b.id===id);
 const add=(before,b)=>{const r=b.run;b.run=function(){return k76Card(b.id,()=>r())};const i=at(before);K73B.splice(i<0?K73B.length:i,0,b)};
 add('e2l_sab',{id:'e2l_bucket',t:()=>k76H('His kennel passage, at six','Feeding time: somebody is behind the bins'),sub:()=>'costs time · the war · what he feeds them',when:()=>S.phase==='normal'&&k73Done('e2l_show')&&(at('e2l_kennel')<0||k73Done('e2l_kennel'))&&k73Fresh(),run:k90Bucket});
 add('e2l_spar',{id:'e2l_table',t:()=>k76H('Ask to see the cold room','They ask to see the cold room'),sub:()=>'costs time · the room under the room',when:()=>S.phase==='act2'&&k73Done('e2l_pair')&&k73Fresh(),run:k90Table})}catch(e){}})();

/* ===================================== ENDINGS ===================================== */
const _xe90=extraEnding;extraEnding=function(){const L=_xe90();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f;
 if(f.e2lN1==='yard')L.push('V feeds the hounds at the far wall, a hundred metres from the house, in all weathers. He has not brought the bucket indoors since the night Misaki heard them eat.');
 else if(f.e2lN1==='bowl')L.push('The night Misaki heard the hounds eat through the wall, V stood at the glass and ate a bowl of the same broth, a spoonful at a time. It was chicken. He has never been able to say so.');
 if(f.e2lN3==='chain')L.push('The cold room under V’s house has a chain on the door. The key hangs on a nail, in plain sight.');
 else if(f.e2lN3==='scrub')L.push('There is a patch on V’s steel table worn thin and bright with a wire brush. He could not get it clean.');
 if(f.e2lN3==='ear'||f.e2lN3==='shirt')L.push('Misaki heard V being sick in the cold room, through the drain in the infirmary floor. They have never told him.');
 if(f.e2lTable==='lay')L.push('Misaki has lain on V’s table, where he said the head would go, and got down again. He said please.');
 if(f.e2lBucket==='fed')L.push('In the first week the old hound took ham from Misaki’s hand with the card man still on his muzzle. They could tell where it had touched them for a day.')}catch(e){}return L};
/* ===KC90-END=== */
