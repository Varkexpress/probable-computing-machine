/* ===KC97-BEGIN=== */
/* ===================== THE WAR: THE WORST OF IT (kc97) =====================
   The worst route (kc49–kc52: infirmary severity 8+, Misaki's POV, the delusion does not clear by itself) shows a
   short scene from inside Misaki's head each morning, chosen by composure band (KD_MIND). Those were written for the
   normal route, where the person they are losing hold of is somebody they love. On the enemies route the tall one
   is K9, who swore to kill them, and what they are losing hold of is the war. This module gives the route its own
   set, in kc95's characterization: twelve scenes, three a band.
     hold  (composure 22+)  the kit and the list; a dog guy's basement; the case against him, all of it
     fray  (14+)            the list is a line short; the insults are getting fewer; whose soup
     thin  (7+)             somebody else's grudge; the rent receipt; his step, and nothing gets up
     gone                   facing the wall; the kid on the bench; “somewhere stupid”
   Delivery: an outer wrap of hub that plays the route's scene and marks the day, so that kc51's does not.
   The ending itself (the last night, the interrupted version, and V afterwards) is kc98.
   Rules: unnamed city, hounds unnamed, no new named characters, Misaki via MV and they/them. No method, ever.
   Notes: docs/notes_kc96.md. Test: node tools/k97_test.js */
const K97=()=>{try{return typeof K96==='function'&&K96()}catch(e){return false}};
const K97_MIND={
 hold:[
  [N('You wake up and do your inventory before you open your eyes. Hands: one and a half. Feet. Name. The spoon, down the side of the mattress. The list.'),
   M2('(one: four steps, door to bed. two: the lamp arm. three: collar, left side. still got it. that’s a good morning, in here)','(one: four steps, door to bed. two: the lamp arm. three: the collar, left side. still got it. that’s a good morning, in here)'),
   N('He has not done it yet. He is slow. It is the one thing that everybody in the city knows about him, and you are going to use every day of it.')],
  [N('You make yourself do the exercise you did at fourteen, in the first room you were ever in with a lock on the outside. Five things you can see. Bulb. Door. Tray. Your own knees. A crack in the ceiling shaped like a hound.'),
   M2('(a hound. why’s everything in here look like a hound. …bc it’s a dog guy’s basement, dumbass)','(a hound. why does everything in here look like a hound? …because it’s a dog guy’s basement, dumbass)'),
   N('Four of them, and they eat what he gives them. You have decided that you will not be given. If it comes to that, you will make such a mess of the room that there is nothing fit for a bucket.')],
  [N('You go through the case against him, to keep it sharp. You do it every morning, as you would strip a rifle.'),
   M2('(rich. smug. nobody asked him. cuts up broke psychos in a basement and calls it law. put a camera in my smoke alarm. his soup)','(rich. smug. nobody asked him. cuts up broke psychos in a basement and calls it law. put a camera in my smoke alarm. his soup)'),
   N('It is all there. You could say it in your sleep. You are fairly sure that you do, because some mornings he comes in looking as if he had been called something.')]],
 fray:[
  [N('You lose time in the afternoon. One minute the light is bright, the next it is dark, and the soup on the tray has a skin on it.'),
   N('You go straight to the list. Four steps. The lamp arm. Then there is a third one, and you had it this morning, and it has a place on him in it.'),
   M2('(four steps. lamp. …four steps. lamp. come ON. it’s where he keeps the — it’s on the LEFT)','(four steps. the lamp. …four steps. the lamp. come on. it’s where he keeps the — it’s on the left)'),
   N('You get it back after an hour. The collar. You are so relieved that you nearly cry, and then you are frightened, because you have just spent an hour unable to remember how you meant to kill a man.')],
  [N('You catch yourself saying it out loud, to nobody. The case. “Rich. Smug.”'),
   N('That is as far as it goes. There were six. You had six this morning; you count them every morning. You stand at the edge of “smug” and there is nothing after it.'),
   M2('(nobody asked him. NOBODY ASKED HIM. there. three. …what’s four)','(nobody asked him. nobody asked him. there. three. …what’s four?)'),
   N('On the other side of the door, somebody has stopped walking. He is listening to you run out of reasons to hate him. You would give your good hand for him not to have heard that.')],
  [N('You eat the soup, and it is fine.'),
   N('You put the spoon down. It has never been fine. It is the worst soup in the city; you have said so; it is on the list of things that you were going to tell him at the end.'),
   M2('(either he’s got better or i’ve got worse. he hasn’t got better)','(either he has got better or i’ve got worse. he hasn’t got better)'),
   N('You cannot taste what was wrong with it. The burned onion is gone. You sit and look at the bowl, and understand that the room is taking things off you in order of size, and has got down to the onion.')]],
 thin:[
  [N('You cannot remember why you hate him.'),
   N('You know the facts. A card man, behind a bowling alley. A file. A book with your name in it. You can say them. They are like a grudge that somebody else told you about, a long time ago, at a party.'),
   M2('(u need it. u NEED it. it’s the only thing holding the roof up)','(you need it. you need it. it’s the only thing holding the roof up)'),
   N('You try being angry about the camera in the smoke alarm. It was a good one; it used to work every time. You get a small, tired flicker, like a pilot light, and you sit round it with both hands.')],
  [N('You do not eat. It is not to make a point. You cannot remember the reason that people do it.'),
   N('You think about the trailer. The rent receipt, in your back pocket: PAID. You were so pleased with that receipt. You were going to walk into a bowling alley and slap it down in front of a billionaire and say: see? Somebody like me. On time.'),
   N('You cannot now see why it mattered what he thought. That frightens you more than the bulb does. You have spent since April caring very much what that man thought, and it was the best fun you ever had.')],
  [N('There are his shoes in the passage. Hard soles, coming on, not hurrying.'),
   N('Nothing gets up. That is new. Every time until now your whole body has stood to: the spoon, the list, the count of his steps. You wait for it.'),
   M2('(four steps. …so? four steps. and?)','(four steps. …so? four steps. and?)'),
   N('He comes in with the tray. He looks at you, and at your hands, which are lying open on the blanket with nothing in them. You have had some bad looks from him. You have never had that one. He looks like a man who has come to a fight and found the other side gone home.')]],
 gone:[
  [N('You do not do the inventory. There is no point counting things.'),
   N('You lie on your side facing the wall. You have never done that in your life, in any room. You have always faced the door. A person faces the door so as to see it coming, and you find that you do not much want to see it.'),
   N('On the other side of the door the shoes stop. He stands there for a long time. He has noticed which way you are facing. You think, without any heat, that it must be annoying for him: all that law, and nobody left to read it to.')],
  [N('You think about the kid who did the sums on a station bench at sixteen and gave themself five years.'),
   N('You think that they would be disappointed. Then you think that they would not; they would nod. They had every way it could go worked out, and done in a basement by a rich man, for free, was about halfway down the page.'),
   M2('(u were right. five years and some extra. …i got a truck, tho. and a cactus. u didn’t have those on the sheet)','(you were right. five years and some extra. …i got a truck, though. and a cactus. you didn’t have those on the sheet)')],
  [N('You swore it in front of everybody. Somewhere stupid. A car park.'),
   N('It is the only thing that you are still sorry about. You are not sorry about the doorman, or the driver, or any of it; you have looked, and it is too late to start. But you gave your word on that one, loudly, with your whole chest, and you are not going to keep it.'),
   M2('(sorry, ur honour. looks like u get to live. don’t let it go to ur head)','(sorry, your honour. it looks as if you get to live. don’t let it go to your head)'),
   N('You say it to the wall. It is the last joke that you have, and nobody is in the room, and you find that you would have liked him to hear it.')]]};
const k97Mind=()=>{try{if(!K97()||typeof kdWR!=='function'||!kdWR()||kdClar()>=2||dlg||S.f.kdMindDay===S.day)return null;
 const b=typeof kdBand==='function'?kdBand():'hold',A=K97_MIND[b]||K97_MIND.hold;return A[(S.kd.med.d||0)%A.length]}catch(e){return null}};
const _hub97=hub;hub=function(){const a=arguments,self=this;try{const L=k97Mind();if(L){S.f.kdMindDay=S.day;S.f.e2l97=(S.f.e2l97||0)+1;save();go(cutBg('#0c0a08'));return say(L,()=>_hub97.apply(self,a))}}catch(e){}return _hub97.apply(self,a)};
/* ===KC97-END=== */
