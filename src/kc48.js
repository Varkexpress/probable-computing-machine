/* ===================== THE INFIRMARY, LONGER (kc48) =====================
   More of the days on sublevel two, for both settings (nothing here touches the examination strand).
   Misaki's side: nights in the infirmary (a scene each night, by day), talking to V through the door once she knows
   where she is (five topics, one each), the sink, the corridor and the hounds, and two visitors.
   V's side: more to do when he sits with her. */
const kdIn=()=>typeof kdMedM==='function'&&kdMedM();
/* ---------- nights ---------- */
const KD_NIGHT=[
 [['','The first night she does not sleep. She lies on her side facing the door with her eyes open, the way animals do, and watches the gap under it for feet.'],
  ['','At two the light under the door goes dark: somebody has sat down against it. At three the somebody starts to read aloud, very quietly, something about land tax in the eighteen-seventies. At four the voice stops in the middle of a sentence, and she realises he has fallen asleep sitting up.'],
  ['','She listens to him breathe until it gets light. She does not know who he is. She knows his breathing better than her own by morning.']],
 [['','She dreams the van. Not the inside, only the door, the side door, sliding back on its track, over and over, the sound it makes.'],
  ['','She wakes up with her good hand already round the drip stand and the needle out of her other hand, and blood on the sheet, and the room dark.'],
  ['','There is a voice on the other side of the door, ordinary, close to the floor: “Misaki. It is three in the morning. You are on sublevel two. Nobody is coming in. I am going to stay where I am.”'],
  ['','She doesn’t answer. She puts the stand down, very slowly, so it won’t clatter. After a long time she lies down on the floor herself, on her side of the door, with her back against it. They sleep like that, back to back through two inches of wood.']],
 [['','Third night. She can’t sleep with the light off and she can’t sleep with it on. She turns it on and off fifty-one times. She counts.'],
  ['','At the fifty-second the door opens a hand’s width, and something big comes through the gap low down and lies across her feet. It is warm and very heavy and it sighs.'],
  ['','The grey hound. She knows it’s the grey hound because of the seam down the shoulder, under her palm, where V sewed her back together when she was a pup.'],
  ['hitmeuppp',MV('(...hi.)','(hi. ok. hi. you can stay.)','(Hi. You can stay. You can stay.)','(Hi, baby. Hi. You can stay. You can absolutely stay. I’ll leave the light however you want it.)')],
  ['','She sleeps with her hand on the seam and the light off. It is the first time since the van that the dark has been just dark.']],
 [['','She wakes at four with her face wet and doesn’t know why. She checks the room in order, the way she checks a roof: door, corners, bed, ceiling, her own hands. Everything is where it should be.'],
  ['','It isn’t the cell. She knows it isn’t. She cried anyway, in her sleep, about something she can’t reach, and she lies there furious about it, as though somebody had gone through her pockets.'],
  ['hitmeuppp',MV('(stupid.)','(stupid. nothing happened. it was a dream about nothing.)','(Stupid. It was a dream about nothing.)','(Crying in my sleep. Over what? Some dream I don’t even get to keep. If I’m going to cry I want to at least know what it was about. That’s the deal. That’s the bare minimum.)')]]];
KD_NIGHT.push(
 [['','Fifth night. She has started to know the sounds of the house: the boiler at one, a hound turning over at two, the lift somewhere above going up and down for no reason anybody has ever explained to her.'],
  ['','She lies there cataloguing them, the way she catalogued the building with the radio. It is the same skill. She is using it for a different thing now, and she notices, and she isn’t sure whether that’s getting better or just getting used to it.'],
  ['hitmeuppp',MV('(boiler. hound. lift.)','(boiler, hound, lift. that’s his house. that’s his house breathing.)','(Boiler. Hound. Lift. His house, breathing.)','(Boiler at one. Hound at two. Lift at whenever it likes. It’s a house. It’s a house breathing in its sleep. I’m in a house that breathes and nobody in it wants anything from me.)')],
  ['','She falls asleep before three for the first time. In the morning she will not remember deciding to.']]);
ROOMS.medbay.spots.push({at:[124,128],mark:[124,24],label:'The light-well',show:()=>kdIn()&&kdClar()>=2,act:()=>{const d=(S.kd.med.d||0);say([
 ['','High up in the ceiling there is a slot of thick glass, a light-well, that goes up through four floors of house to the garden. A little grey daylight comes down it. Nothing else does.'],
 d>=2?['','Today a leaf is stuck on the glass at the top, very small, very far up. You watch it for a long time. It is the only thing from outside you’ve seen in a week that nobody brought in to you on a tray.']:['','You can’t see sky through it. Just light, which changes. You find you are timing it: brighter at eleven, gone by five.'],
 ['hitmeuppp',MV('(outside.)','(that’s outside. it’s still there.)','(That’s outside. It’s still there.)','(It’s still out there, then. The whole city. Nobody turned it off while I was gone. That’s nice of it. That’s honestly really rude of it.)')]])}});
const _sleepKD48=sleep;sleep=function(){const a0=arguments,s0=this;if(kdIn()&&!S.done.kdVisEve){S.done.kdVisEve=1;if(kdVisitor(()=>sleep.apply(s0,a0)))return}if(!kdIn()||S.done.kdNight)return _sleepKD48.apply(this,arguments);S.done.kdNight=1;const m=S.kd.med;const n=Math.min(KD_NIGHT.length-1,m.d||0);
 go(cutBg('#04040a'));const a=arguments,self=this;return say(KD_NIGHT[n],()=>{if(n>=2)calm(4);_sleepKD48.apply(self,a)})};
/* ---------- the door, once she knows ---------- */
const KD_DOOR=[
 ['“what day is it.”',[['K9','Thursday. The twelfth. It is ten past four in the afternoon. It is raining, which you cannot hear down here, so I am telling you.'],
   ['hitmeuppp',MV('thursday.','thursday. ok. what was it when i came in.','Thursday. What day was it when I came in?','Thursday. Okay. And when I came in, what was it? Don’t do the kind voice. Just the day.')],
   ['K9','Monday night. Before that, you were gone for '+'days I will tell you the number of when you ask for it, and not before.'],
   ['hitmeuppp',MV('k.','ok. not yet.','Not yet.','Not yet. Ask me again on Saturday. If I don’t ask, tell me anyway.')]]],
 ['“who else knows i’m here.”',[['K9','Ronin. Angel. The doctor. The four hounds. Nobody else in the world.'],
   ['hitmeuppp',MV('the server?','does the server know.','Does the server know?','Does the server know? Did somebody post about it? Tell me nobody posted.')],
   ['K9','Angel told the server that you have food poisoning and are being insufferable about it. There have been forty messages since about soup.'],
   ['hitmeuppp',MV('lol.','lmao. ok. good. food poisoning.','Food poisoning. Good. That’s good.','Food poisoning. That’s perfect. That’s exactly what I’d want them to think. Tell her thank you. Tell her I said the soup was bad.')]]],
 ['“where’s my phone.”',[['K9','In my pocket. It was in the gravel at the trailer. It has four hundred unread messages and a cracked corner.'],
   ['hitmeuppp',MV('don’t give it to me yet.','don’t give it to me yet.','Don’t give it to me yet.','Keep it. I don’t want to see four hundred people asking where I was. I don’t want to read the ones from you. Not yet. I know what they say.')],
   ['K9','What do they say?'],
   ['hitmeuppp',MV('did u eat today.','“did you eat today.” three times a day. then just my name.','“Did you eat today,” three times a day, and then just my name.','“Did you eat today,” at seven, twelve and six. And then on the Tuesday, at twenty to seven, just my name. I know because it’s what you’d send. I don’t need to read it to know.')]]],
 ['“tell me about the hounds.”',[['K9','The grey one has slept outside this door every night. She will not eat unless I put her bowl next to it. The old one guards the stairs. The black one is sulking because you have not thrown anything for him. The pale one has eaten one of your socks, which I found in the laundry.'],
   ['hitmeuppp',MV('which sock.','which sock. was it the frog one.','Which sock?','Which sock? If it was the frog one I’m going to kill her, and then I’m going to be very nice to her for a week.')],
   ['K9','The frog one.'],['hitmeuppp',MV('...good girl.','good girl. tell her good girl.','Tell her she’s a good girl.','Tell her she’s a good girl. Tell her that exactly. She ate my sock while I was gone, she kept a bit of me in the house. That’s loyalty.')]]],
 ['“are you okay.”',[['','There is a long pause on the other side of the door.'],
   ['K9','Nobody has asked me that since you went.'],
   ['hitmeuppp',MV('i’m asking.','well i’m asking. are u.','I’m asking. Are you?','I’m asking. You’ve been on the floor outside this door for three days, reading to someone who called you the guard. Are you okay, V.')],
   ['K9','No. I will be. I would like to be okay in the same room as you, when you are ready, and not before.'],
   ['','She puts her hand flat on the door. On the other side, a few seconds later, so does he. Neither of them can tell, through two inches of wood, but both of them are sure.']]]];
ROOMS.medbay.spots.push({at:[246,160],mark:[246,150],label:'Talk to V through the door',show:()=>kdIn()&&kdClar()>=2&&KD_DOOR.some((_,i)=>!(S.f.kdDoorT||[]).includes(i)),act:()=>{const used=S.f.kdDoorT||[];
 const o=KD_DOOR.map((x,i)=>({t:x[0],dis:used.includes(i)||(i===4&&used.length<3),sub:i===4&&used.length<3?'not yet':'',fn:()=>{S.f.kdDoorT=used.concat([i]);apply({aff:2});calm(2);save();say(x[1])}}));
 ask('hitmeuppp','(He is on the other side. He always is.)',o.concat([{t:'Not now',fn:()=>{}}]))}});
/* ---------- the sink ---------- */
ROOMS.medbay.spots.push({at:[230,128],mark:[230,96],label:'The sink',show:()=>kdIn()&&kdClar()>=2,act:()=>{if(S.f.kdSink)return say([['hitmeuppp','(hair’s clean. first time in days. still smells like his shampoo, which is somehow worse and better.)']]);
 ask('hitmeuppp','(Your hair has the cell in it. You can smell it. You can’t lift your left arm above your shoulder.)',[
  {t:'Do it yourself, one-handed.',fn:()=>{S.f.kdSink=1;apply({energy:-10});calm(-1);save();say([['','It takes forty minutes. The water runs grey, then clear. You get shampoo in the stitches above your ear and stand there with your forehead against the cold mirror until the sting stops.'],['hitmeuppp',MV('(done.)','(done. alone. good.)','(Done. On my own.)','(Done, on my own. I needed one thing in here to be mine.)')]])}},
  {t:'Ask V. He’s the only one allowed behind you.',dis:tier()<2,sub:tier()<2?'you can’t make yourself':'',fn:()=>{S.f.kdSink=2;apply({aff:4});calm(5);save();say([
   ['','He comes in when you call, which is the first time he has come all the way in. He stands where you can see him in the mirror the whole time, and asks before every single thing: the tap, the jug, his hands.'],
   ['','He wraps the cast in a bread bag and tapes it. He washes your hair the way he washes the hounds, thoroughly, without hurrying, talking the whole time about nothing, about the weather he can’t see.'],
   ['','The water goes grey. He keeps going until it doesn’t. You watch his face in the mirror. It is very calm. His hands are not, quite, and he keeps them moving so that you won’t notice.'],
   ['hitmeuppp',MV('...thanks.','thank u. nobody’s ever.','Thank you. Nobody’s ever done that.','Thank you. I don’t think anyone’s ever done that for me. Not ever. Not even before nine, probably. I think I’d remember that. Even I’d remember that.')],
   ['K9','Then I will do it again on Thursday.']])}},
  {t:'Leave it.',fn:()=>{}}])}});
/* ---------- the corridor, and the hounds ---------- */
ROOMS.medbay.spots.push({at:[262,150],mark:[262,140],label:'Open the door. All the way.',show:()=>kdIn()&&kdClar()>=3&&!S.f.kdCorr,act:()=>{S.f.kdCorr=1;calm(6);apply({aff:3});save();go(cutBg('#0a0c0e'));say([
 ['','You open the door all the way, for the first time, on your own, and look out.'],
 ['','The corridor is long and white and lit, and in it, lying down in a row, spaced exactly evenly, facing the door, are the four hounds. They don’t get up. They have been told not to rush you, and they don’t.'],
 ['','V is at the far end, sitting on the floor with his back to the wall and a book face down on his knee. He doesn’t get up either.'],
 ['hitmeuppp',MV('...hi.','hi. hi guys. hi.','Hi. Hi, all of you.','Hi. Hi, babies. Hi. I’m okay. I’m okay. Look at you all lying down like a guard of honour, oh my god, who taught you that.')],
 ['K9','Nobody. They worked it out.'],
 ['','You sit down in the doorway. One at a time, in order, oldest first, they get up and come and lie down against you, until you are under four hounds and can’t see the corridor at all, and you don’t want to.']],()=>toRoom('medbay',[240,150]))}});
/* ---------- visitors (afternoons, once she knows where she is) ---------- */
function kdVisitor(cont){const self=null,a=[];const _hubKD48=cont;try{if(kdIn()&&kdClar()>=2){
 if(!S.f.kdVisR&&frT('r')>=1){S.f.kdVisR=1;save();go(cutBg('#1c2422'));return say([
  ['','Ronin comes down the stairs at two in the afternoon. You can hear him from the top: he is incapable of being quiet on stairs.'],
  [RN,'Brought you some hospital jelly. Stole it from a hospital. Real one. They had a whole cart.'],
  ['','He stands in the door for a second too long before he comes in. He has never once in his life stood in a doorway before coming in.'],
  ['hitmeuppp',MV('u can come in.','come in. i won’t bite. probably.','You can come in. I won’t bite.','Come in. Jesus. You’re letting the cold in. I won’t bite you. I might bite you. Get in here.')],
  [RN,'Yeah. Course. I knew that.'],
  ['','He sits on the end of the bed and eats most of the jelly himself, red and green, talking about a man he did on Tuesday with great and loving detail. You laugh twice. Both times he looks at you like he’s checking that it was real.'],
  ['','When he goes, he stops at the door with his back to you.'],
  [RN,'Shoulda been me that found you. I was two streets over. I keep doin’ the math on it.'],
  ['hitmeuppp',MV('don’t.','don’t do the math. i’m the math one.','Don’t do the math. I’m the maths one.','Don’t do the maths. That’s my job. And the answer’s that you’d have done it messier and I’d have had to wash you off. Go home, Ronin.')],
  [RN,'Sucks t’be you.'],['','He goes. On the stairs going up he is, for the first time anyone can remember, perfectly quiet.']],()=>{fr('r',4);calm(3);_hubKD48()}),true}
 if(!S.f.kdVisA&&frT('a')>=1&&(S.kd.med.d||0)>=2){S.f.kdVisA=1;save();go(cutBg('#1c2422'));return say([
  ['','Angel comes with the big makeup case and doesn’t open it. She sits in the chair by the bed with it on her lap, both hands flat on the lid, and looks at you for a long time without saying anything, which she has never once done.'],
  [AN,'i had a whole plan. i was going to do your nails. i had a bit ready. it was funny.'],
  ['hitmeuppp',MV('do the bit.','do the bit. i want the bit.','Do the bit. I want the bit.','Do the bit. Please. I’ve been in here four days with a man who reads tax history. I want the bit.')],
  ['','She does the bit. It is about a man at a perfume counter, and it is very funny, and halfway through her voice goes and she has to stop and look at the ceiling for a while, which is what she does instead of crying, because it doesn’t ruin the eyeliner.'],
  [AN,'sorry. the ending’s good. hang on.'],
  ['','She finishes it. You laugh at the ending, properly, and hurt your ribs, and she does your nails after all, on the right hand only, black, with a tiny knife on the thumb, and a tiny pink heart on the cast where the left thumb would be.'],
  [AN,'none of them can say they didn’t have it coming. i’m going to be so thorough about this, babe. you have no idea.'],
  ['hitmeuppp',MV('i know.','i know. save me one.','I know. Save me one.','I know. Save me one. The radio one. And film it. Not for the channel. For me.')]],()=>{fr('a',4);calm(3);_hubKD48()}),true}
}}catch(e){}return false}
const _hubKD48b=hub;hub=function(){const a=arguments,self=this;if(kdIn()&&S.slot>=1&&!dlg&&kdVisitor(()=>_hubKD48b.apply(self,a)))return;return _hubKD48b.apply(self,a)};
/* ---------- V's side: more to do when he sits with her ---------- */
const _sitKD48=kdSit;kdSit=function(){const m=S.kd.med;if(m.clar<2||S.f.kdVsit>=3)return _sitKD48();const n=S.f.kdVsit||0;S.f.kdVsit=n+1;save();go({draw:hubBg});
 const V=[
  [['','She knows him now, mostly. He sits on the chair by the door rather than the floor, and she watches him decide that, and nods once, which is permission.'],
   ['hitmeuppp',MV('read me something.','read me something. not tax.','Read me something. Not tax.','Read me something. Anything but tax. I swear to God, if I hear the word “assessment” again I’m going to climb out the light-well.')],
   ['','He reads her the only other book he has in his coat, which is Persuasion. She is asleep by chapter two. He keeps reading to the end of chapter three, quietly, in case stopping wakes her, and because he has realised he wants to know how it goes this time.']],
  [['','He changes the wrist dressings with her awake, for the first time. She watches every movement. He narrates each one before he makes it, the way you would for an animal that has been hurt by people.'],
   ['K9','I am going to lift the tape now. This will pull. I am going to clean it with saline. That will sting for four seconds. One. Two. Three. Four.'],
   ['hitmeuppp',MV('...u counted.','u counted for me.','You counted. For me.','You counted the four seconds out loud. Nobody’s ever counted for me. I’ve always done my own counting.')],
   ['K9','You may do mine, then, when it is my turn.'],
   ['','She laughs, and then she doesn’t, and then she lets him finish. When he’s done she doesn’t let go of his sleeve for a while, and he doesn’t ask her to.']],
  [['','She is asleep. He isn’t needed. He stays anyway, because he cannot think of anywhere in the house that would be bearable instead.'],
   ['','He makes a list, in the notebook where he keeps her quotes, of things he did not do in time. It is long. It is precise. Every item has a date and an hour.'],
   ['','At the bottom he writes the one thing he did in time, which is carry her up the river stairs. Then he crosses out the whole list above it, line by line, because she would hate it, and she would be right.']]][n];
 say(V,()=>{apply({aff:2});calm(3);hub()})};

const _mmKD48=kdMedMorning;kdMedMorning=function(done){_mmKD48(done);const m=S.kd&&S.kd.med;if(m&&(m.sev||0)<4&&m.d>=1&&m.clar<2){m.clar=2;save()}};
