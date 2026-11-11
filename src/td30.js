/* ===================== MORE OF THE ARC (td30) =====================
   In the cell: the cup of water (and the man who brings it), what she overhears under the radio.
   V while she is gone: the photograph they send, Ronin and Angel on his floor.
   After: her first night back in the trailer, the other shoe, the parcel with her clip in it, Ronin collecting on the
   man who did the hand, and the cast coming off (the hand is only as good as the physio she did). */
/* ---------- the cell ---------- */
const _doseKD2=kdDose;kdDose=function(cb){S.f.kdCup=1;return _doseKD2(cb)};
const _tmKD3=takenM;takenM=function(){S.f.kdCup=0;S.f.kdWaterN=0;S.f.kdThanks=0;S.f.kdHear=0;S.f.kdFriday=0;return _tmKD3()};
ROOMS.cell.spots.push({at:[232,160],mark:[232,152],label:'A cup of water',show:()=>!!S.f.kdCup,act:()=>{const k=KD();if(k.clock>=6)return kdTheyCome();k.clock++;save();
 const n=S.f.kdWaterN||0;ask('hitmeuppp',n?'The cup is inside the door again. He put it down so that it wouldn’t spill.':'There is a paper cup of water just inside the door. Somebody pushed it through the slot while you were under.',[
  {t:'Drink it.',fn:()=>{S.f.kdCup=0;S.f.kdWaterN=n+1;k.dose-=2;save();say([['','It is only water. Your head clears a little quicker for it.'],['hitmeuppp','(ok. one of them isn’t a total asshole. or he’s the one who doses it. guess i’ll find out.)']])}},
  {t:'Say “thanks” through the slot.',fn:()=>{S.f.kdCup=0;S.f.kdWaterN=n+1;S.f.kdThanks=(S.f.kdThanks||0)+1;k.dose-=2;save();say([['','Nobody answers. A pair of shoes on the other side of the door stays where it is for a moment longer than it needs to, and then goes.'],
    ['hitmeuppp',S.f.kdThanks>1?'(he heard that. he’s the only one who never looks at me. i’m keeping him.)':'(he heard that.)']])}},
  {t:'Pour it down the drain. It could be anything.',fn:()=>{S.f.kdCup=0;apply({edge:2});save();say([['','You pour it down the drain and put the cup back by the door, upside down, so that they know.']])}}])}});
(function(){const sp=ROOMS.cell.spots.find(s=>s.label==='The radio down the hall'),a=sp.act;const H=[
  [['','Under the jingle, two of them are talking. “Friday. The buyer comes Friday.” “For her?” “For what she knows.”'],['hitmeuppp','(friday. ok. so i’m out before friday.)']],
  [['','One of them is singing along with the bank jingle. He knows all the words, and he has a nice voice.'],['hitmeuppp','(that’s the driver. he sang the whole way here. i’m going to remember that voice.)']],
  [['','“Clean Hands says not the face. He wants the face for the photograph.” “What photograph?” “The one we send the dog man.”'],['hitmeuppp','(the dog man. they mean V. ...they’re going to send him a picture of me. oh, he’s going to be so fucking calm about it.)']]];
 sp.act=function(){if(!S.f.kdLoops||(S.f.kdHear||0)>=H.length)return a.apply(this,arguments);const r=a.apply(this,arguments);const i=S.f.kdHear||0;S.f.kdHear=i+1;if(i===0)S.f.kdFriday=1;save();
  for(let n=0;n<40&&dlg;n++)adv();say(H[i]);return r}})();
/* the man with the water looks at the floor as she goes past */
const _dockKD=kdDock;kdDock=function(r1){if((S.f.kdThanks||0)>=2&&!S.f.kdWaterPass){S.f.kdWaterPass=1;save();const W0=WARE_G;return cut([['','On the dock stairs you come round the corner straight into one of them. He has a paper cup in each hand.'],['','He looks at the floor. He goes on looking at it until you are past him.']],()=>{const t=S.tries;S.tries=Math.max(0,(S.tries||0)-1);try{_dockKD(r1)}finally{S.tries=t}},'#000')}return _dockKD(r1)};

/* ---------- V, while she is gone ---------- */
EVENTS.push({id:'kd_vphoto',when:()=>S.phase==='taken'&&S.pov==='v'&&(S.f.missing||0)>=2&&!S.f.kdVPhoto,run:done=>{S.f.kdVPhoto=1;save();say([
 ['','A photograph arrives from her number. It shows a metal table, today’s newspaper, and her left hand laid flat beside it. The hand is the wrong shape.'],
 ['','Under it, one line: “She is very funny. We have time.”']],()=>ask('K9','(He does not put the telephone down.)',[
  {t:'Study it. The table is polished.',fn:()=>{apply({edge:5});if(!S.f.schedule){S.f.schedule=1;save()}say([['','There is a wall clock reflected in the table top, and a duty sheet pinned beside it. He can read the shift changes. It takes him two hours with a mirror.'],['K9','(Thank you for sending this.)']],done)}},
  {t:'Reply: “I am coming.”',fn:()=>{S.f.kdAlert=(S.f.kdAlert||0)+1;S.f.kdToldComing=1;apply({heart:-2});save();say([['','It says Delivered, and then Read. They will be ready for him now. They will also have read it out to her.']],done)}},
  {t:'Show Ronin.',fn:()=>{S.f.roninOwes=1;S.f.kdRonCall=1;save();say([['','Ronin looks at the photograph for a long time without saying anything, which is not like him.'],[RN,'Whoever did that hand is mine t’kill. I’m askin’ you nice, Vee. One time.'],['K9','Granted.']],done)}}]))}});
EVENTS.push({id:'kd_vfloor',when:()=>S.phase==='taken'&&S.pov==='v'&&(S.f.missing||0)>=1&&S.f.called&&!S.f.kdVFloor,run:done=>{S.f.kdVFloor=1;apply({edge:-6});save();say([
 ['','Ronin and Angel are on the atrium floor when he comes down at five. Nobody asked them over. Angel has the big makeup case for a pillow, and Ronin is asleep sitting up with the crowbar across his knees and Pancake on his boots.'],
 [AN,'don’t. we’re not leaving. make coffee.'],
 ['','He makes coffee for three. It is the first thing he has made since Tuesday that anybody drank.']],done)}});

/* ---------- after ---------- */
kdEv2('kd_home',1,()=>!S.f.movedIn,done=>{const m=kdMe();say([
 ['',m?'She goes back to the trailer. The fence post has been scrubbed. Somebody has raked the gravel, and she can tell from the rake marks that it was him.':'He has scrubbed the fence post and raked the gravel. She sees it in the first second and says nothing about it.'],
 ['','Inside, the noodles are gone and the counter has been wiped. Her other shoe is on the step, beside its pair.']],()=>ask(m?'hitmeuppp':'K9',m?'(Forty metres from the door. That’s all it was.)':'(She is standing where the van stood.)',m?[
  {t:'Sleep here tonight. It’s your trailer.',fn:()=>{calm(-4);apply({edge:3});S.f.kdHome='slept';save();say([['','She sleeps in the bath with the door locked and the tray from his kitchen across her knees. She tells him in the morning that she slept great.']],done)}},
  {t:'Move the trailer. Three metres. Away from the fence.',fn:()=>{calm(4);S.f.kdHome='moved';save();say([['','It takes the truck, a tow strap and four hours, one-handed. Three metres. The fence post is no longer the first thing in the window.'],['hitmeuppp',MV('better.','better. feng shui.','Better. It’s feng shui.','Better. It’s feng shui, I read about it. Nothing to do with anything.')]],done)}},
  {t:'Get the cactus and go back to his.',fn:()=>{calm(2);apply({aff:2});S.f.kdHome='left';save();say([['','She takes Prickles and the shoebox and nothing else. She leaves the door unlocked, because locking it didn’t help.']],done)}}]:[
  {t:'Wait by the car.',fn:()=>{apply({aff:2});S.f.kdHome='waited';save();say([['','She is inside for nine minutes. She comes out with the cactus and the shoebox and gets into the car without looking at the fence.']],done)}},
  {t:'Offer to have the trailer moved.',fn:()=>{calm(3);S.f.kdHome='moved';save();say([['K9','I can have it moved. Three metres would do it.'],['hitmeuppp',MV('...ok.','ok. yeah. three metres.','Yes. Three metres. Away from the fence.','Yeah. Three metres. And don’t say why to the tow guy, just say feng shui.')]],done)}}]))});
kdEv2('kd_parcel',3,null,done=>{const m=kdMe();say([
 ['','A parcel comes with no return address. Inside is a ring box, and in the ring box is her star clip, cleaned.'],
 ['','The card says, in very neat handwriting: “You left this. We still have time.”']],()=>ask(m?'hitmeuppp':'K9',m?'(He washed it.)':'(It is addressed to her. He has opened it.)',m?[
  {t:'Put it back in your hair.',fn:()=>{apply({veng:6,edge:4});S.f.kdClip='worn';S.smoke=(S.smoke||0)+1;save();say([['hitmeuppp',MV('mine.','mine. thanks for the delivery, asshole.','Mine. Thanks for the delivery.','Mine. He posted me my own lockpick. I’m going to open his front door with it and I’m going to tell him so.')],['','(She goes in with one more trick than they expect.)']],done)}},
  {t:'Give it to V. For the file.',fn:()=>{apply({veng:4,aff:2});S.f.kdClip='file';save();say([['','He photographs the card under a lamp and has the handwriting matched by lunch. It is the note-taker’s.'],['K9','He will not need his hands for much longer.']],done)}},
  {t:'Throw it in the river.',fn:()=>{calm(4);S.f.kdClip='river';save();say([['','She throws it off the bridge left-handed, out of habit, and it goes about four metres. She watches it sink anyway.']],done)}}]:[
  {t:'Give it to her.',fn:()=>{apply({aff:2,veng:4});S.f.kdClip='worn';S.smoke=(S.smoke||0)+1;save();say([['','She turns it over twice and puts it in her hair without a word. Then she asks him for the list.']],done)}},
  {t:'Keep it from her. Match the handwriting.',fn:()=>{apply({veng:6,heart:-2});S.f.kdClip='kept';save();say([['','The handwriting is the note-taker’s. He has kept something from her for the second time, and he writes that down as well.']],done)}}]))});
/* Ronin called the man who did the hand. If nobody has dealt with him in time, Ronin does. */
kdEv('kd_ronradio',()=>S.phase==='after'&&kdD()>=3&&S.f.kdRonCall&&!S.f.kdRonRadio&&S.list&&S.list.some(x=>x.id==='radio'&&!x.st&&!x.gone),done=>{S.f.kdRonRadio=1;const x=S.list.find(x=>x.id==='radio');x.st=1;fr('r',3);save();say([
 [RN,'So I went and found your radio fella. He had the bank song for a ringtone. Swear t’God.'],
 [RN,'He’s in my freezer in about nine bags. I kept the shoes, figured somebody’d want t’see ’em. Brown. Resoled twice.'],
 ['hitmeuppp',MV('...thanks.','u didn’t have to. ...thanks.','You didn’t have to do that. Thank you.','You absolute psycho. That was mine. ...Thank you. Don’t tell me what you did with the hand, I want to guess.')],
 [RN,'Sucks t’be him. One less on your list. Bring beer.']],done)});
kdEv('kd_ronmad',()=>S.phase==='after'&&S.f.kdRonCall&&!S.f.kdRonRadio&&!S.f.kdRonMad&&S.list&&S.list.some(x=>x.id==='radio'&&x.st),done=>{S.f.kdRonMad=1;fr('r',-2);save();say([
 [RN,'Heard the radio guy’s done. Heard it wasn’t me that did it.'],[RN,'I called that one. I called it out loud. You’re an asshole, and I’m takin’ the next one without askin’.']],done)});
/* the cast comes off: the hand is as good as the physio she did */
kdEv('kd_cast',()=>S.phase!=='after'&&!S.f.kdCast,done=>{const g=S.f.kdGripN||0;S.f.kdCast=1;S.f.kdHandBad=g>=2?0:1;save();const m=kdMe();say([
 ['','The cast comes off. The hand under it is thinner than the other one, and there are two small round scars on the back of it where the pins were.'],
 ['',g>=2?'She makes a fist and opens it. It does both. She did the foam ball every day in that basement and complained every time.':'She makes a fist, and it stops at three quarters. She did not do the foam ball. She said the hand was only stiff.'],
 ['hitmeuppp',g>=2?MV('works.','it works. told u. fine.','It works. I told you it was fine.','Look at that. Works. I told every one of you it was fine and none of you listened.'):MV('it’s fine.','it’s fine. it’s just stiff.','It’s fine. It’s only stiff.','It’s fine. It’s stiff, that’s all. I pick with the right anyway.')],
 g>=2?null:['',m?'(Lockpicking is harder from now on.)':'(He watches her try a pen, and looks at the wall when it drops.)']].filter(Boolean),done)});
const _pickKD=kdPick;kdPick=function(){return _pickKD()+(S&&S.f&&S.f.kdHandBad&&S.phase!=='taken'?1:0)};
(function(){const sp=ROOMS.medbay.spots.find(s=>s.label==='Foam ball'),a=sp.act;sp.act=function(){if(!S.done.kdGrip)S.f.kdGripN=(S.f.kdGripN||0)+1;return a.apply(this,arguments)}})();
const _xeKD4=extraEnding;extraEnding=function(){const L=_xeKD4();if(!S||!S.f||!S.kd||!S.kd.t0)return L;const f=S.f;
 if(f.kdClip==='worn')L.push('She wears the star clip they posted back to her. She has opened eleven doors with it since.');
 if(f.kdHandBad)L.push('The left hand closes three quarters of the way. She says it is stiff.');
 if(f.kdRonRadio)L.push('Ronin still has a pair of brown shoes, resoled twice, on a shelf in his workshop. Nobody asks.');
 return L};
