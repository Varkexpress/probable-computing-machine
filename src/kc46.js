/* ===================== STILL THERE (kc46) =====================
   If the captivity went badly enough, the infirmary delusion lasts longer. Severity (kdSev) is worked out when she
   is carried in: sessions, missing hours, failed escapes, the last-chance route, low composure, and how much she
   said. At 4+ she stays convinced she is still held for extra days (m.ext, 1 or 2), and each morning of it the room
   goes back to being a cell, whatever she worked out the day before. Each extra day pushes the after-phase back. */
function kdSev(){const k=S.kd||{};let s=0;s+=Math.max(0,(k.ses||0)-1);if((k.hrs||0)>=16)s++;if((k.hrs||0)>=24)s++;if((S.tries||0)>=2)s++;if(S.f.lastChance||S.f.lateRoute)s++;if((S.comp||50)<35)s++;if((k.said||0)>=2)s++;if((S.f.missing||0)>=3)s++;return s}
const _msKD=kdMedStart;kdMedStart=function(self,L){const sev=kdSev();const r=_msKD.apply(this,arguments);const m=S.kd&&S.kd.med;if(m){m.sev=sev;m.ext=sev>=6?2:sev>=4?1:0;if(m.ext)S.endDay+=m.ext;save()}return r};
const KD_STILL_M=[
 [['','You wake up and it is a cell again.'],
  ['','You knew yesterday, you’re nearly sure you knew, that it was a room in a house. You remember a handle, and a hound with a seam down her shoulder, and somebody reading about tax law. In the morning the handle isn’t there, and the bulb is, and you can hear the radio down the hall even though there isn’t one.'],
  ['','Your wrist has a new dressing on it that you don’t remember being put on. Somebody had their hands on you while you slept. That is the part that makes you sit up with your back to the wall.'],
  ['hitmeuppp',MV('(they moved me back.)','(they moved me back while i slept. clever.)','(They moved me back while I was asleep. That was clever of them.)','(They let me think I was out. That’s a technique. I’ve read about it. You let them think they’re out and then you take it back. Okay. I know what this is. I can do this one. I did the other one.)')]],
 [['','The tall one comes in with soup. He kneels down so his face is lower than yours, which none of the others ever did, and that is how you know he’s the clever one.'],
  ['','He says your name. He says the date. He says a word that sounds like “hounds.” He says a name that you know is important and can’t place, and every time he says it something in your chest goes tight, and you hate him for knowing it.'],
  ['','You count the loops of a jingle that is not playing, and you don’t answer, because that is the rule. Say nothing. They can only take what you say.']],
 [['','Third morning in the cell. You have started making a tally on the wall with the edge of a spoon, the way the girl before you did on the cot frame. Three marks.'],
  ['','The tall one sees it when he brings the water. He looks at it for a long time. Then he sits down on the floor under it and puts his face in his hands, and stays like that, and doesn’t say anything at all.'],
  ['hitmeuppp',MV('(...)','(why is HE upset.)','(Why is he the one who’s upset?)','(Why is the guard upset. Guards don’t get upset. That’s not in the script. Why does he look like that.)')],
  ['','You don’t ask. It feels like a trap. It also feels like the worst thing you’ve seen in here, and you don’t know why.']]];
const KD_STILL_V=[
 [['','She does not know him this morning.'],
  ['','Yesterday she asked him what seven down was. Today she is under the bed with the tray held edge-out, and when he says her name she counts, under her breath, the loops of a radio that has never been in this house.'],
  ['','He changed her dressings at four while she slept, because she would not let him while she was awake. He knows that was a mistake as soon as she wakes and sees them, and goes white, and backs into the corner.'],
  ['K9','(It came back in the night. It will come back again. I am going to be here each time it does, and each time I am going to be one of them.)']],
 [['','She calls him the tall one. She is polite to him, the way she is polite to landlords and men she is about to kill. She thanks him for the soup and doesn’t eat it.'],
  ['','He sits on the floor, lower than her, and reads the tax history aloud through all of it, in the same voice, at the same speed, so that one thing in the room is always the same.'],
  ['','Halfway through chapter six she says, to nobody, “there’s a man called V. if he comes looking, he’s not with me. leave him out of it.” She says it to the tall one. She is asking him to protect himself, from himself.'],
  ['K9','(I will.)'],['','He says it out loud, to the room, and she nods, satisfied, and goes back to counting.']],
 [['','There are three scratches on the wall above the bed this morning, made with the edge of a spoon. A tally. She has started counting days in his house as days in that one.'],
  ['','He sits down under it. He does not know what to do with his face, so he puts it in his hands.'],
  ['','When he looks up she is watching him, from the corner, with an expression he has never seen on her. It takes him a moment to place it. It is pity. She feels sorry for the guard.']]];
const _mmKD46=kdMedMorning;kdMedMorning=function(done){const k=S.kd,m=k&&k.med;if(!m||!m.ext||m.d+1<3)return _mmKD46(done);
 m.xd=(m.xd||0)+1;const i=m.xd-1;m.d++;m.ext--;m.clar=0;S.done={};S.done.bedChosen=1;save();const me=S.pov!=='v';
 const L=(me?KD_STILL_M:KD_STILL_V)[Math.min(i+(m.sev>=6&&i===1?1:0),2)];
 if(me)return say(L,()=>ask('hitmeuppp','(The cell.)',[
  {t:'Count the loops. Say nothing.',fn:()=>{calm(-4);say([['','You count to four hundred. Somewhere around three hundred the tall one stops reading and just sits.']],done)}},
  {t:'Test the door.',fn:()=>{calm(-2);say([['','It opens. That is wrong. Doors don’t open. You shut it again, very carefully, and go back to the corner, because an open door is a trick.']],done)}},
  {t:'Look at the guard’s face. Properly.',dis:tier()<3,sub:tier()<3?'you can’t make yourself':'',fn:()=>{m.ext=0;m.clar=2;calm(4);apply({aff:3});save();say([['','You make yourself look at him. Properly, the whole face, the way you look down a scope.'],['','The coat. The glasses he’s forgotten are on his head. A dog hair on his collar, grey, from the grey one.'],['hitmeuppp',MV('...V?','...V? it’s u. it’s been u.','V? It’s you. It’s been you the whole time.','V. It’s you. It’s been you. I’ve been calling you the tall one for— how long have I been calling you that?')],['K9','Two days. You may call me anything you like.']],done)}}]));
 say(L,()=>ask('K9','(She is under the bed.)',[
  {t:'Read to her. The same book, the same page.',fn:()=>{calm(2);say([['','He reads. She does not come out. At the end of the chapter her hand comes out from under the bed and stays there, flat on the floor, palm down, where he can see it.']],done)}},
  {t:'Let the grey hound in.',fn:()=>{if(m.ext>0&&Math.random()<.5){m.ext--;S.endDay=Math.max(S.day+1,S.endDay-1)}calm(3);save();say([['','The grey hound walks in, lies down beside the bed, and puts her chin on the floor next to the tray. After an hour the tray goes down. After two, a hand comes out and rests on the hound’s neck.']],done)}},
  {t:'Leave the door open and go.',fn:()=>{calm(-2);say([['','He leaves it open. When he comes back at noon it is shut again, from the inside, and the tray is against it.']],done)}}]))};
/* the room looks like a cell again on those days, whatever she worked out */
const _hubKD46=hub;hub=function(){try{const m=S&&S.kd&&S.kd.med;if(m&&m.ext&&m.d>=2&&m.clar>1&&S.slot===0){m.clar=1;save()}}catch(e){}return _hubKD46.apply(this,arguments)};

/* the room, on those days: some things read differently */
(function(){const R=ROOMS.medbay;const wrap=(lab,fn)=>{const sp=R.spots.find(s=>s.label===lab);if(!sp)return;const a=sp.act;sp.act=function(){const m=S.kd&&S.kd.med;if(m&&m.xd&&kdClar()<2)return fn();return a.apply(this,arguments)}};
 wrap('Tray',()=>say([['','Soup, still warm. The tall one made it. You watched him through the gap in the door making it in a kitchen you can’t see, which means there’s a kitchen, which means it’s a house, which means—'],['hitmeuppp','(no. that’s what they want. eat it and you start believing the kitchen.)'],['','You don’t eat it. Your stomach makes a noise loud enough that the hound outside the door lifts her head.']]));
 wrap('Door',()=>ask('hitmeuppp','(Somebody is breathing on the other side. Low down. Sitting on the floor.)',[
   {t:'Listen.',fn:()=>say([['','The breathing is very even. Under it, a page turns. Then a voice, not to you, to something big that sighs: “Yes. I know. She will come out when she is ready.”'],['hitmeuppp','(he talks to the dog like it’s a person. ...who does that. who’s that soft with a dog in a place like this.)']])},
   {t:'Go. Now, while you can stand.',sub:'stealth',fn:kdMedRun},{t:'Not yet',fn:()=>{}}]));
 wrap('Cot',()=>ask('hitmeuppp',KD().med.xd>1?'(Three marks on the wall above it. Yours.)':'(If you sleep, they come while you’re under.)',[{t:'Sleep',sub:'ends the day',fn:()=>{S.slot=3;S.done.bedChosen=1;sleep()}},{t:'Not yet',fn:()=>{}}]))})();
/* the way out, on a bad captivity: what she says on the stairs */
const _mmKD46b=kdMedMorning;kdMedMorning=function(done){const k=S.kd,m=k&&k.med;if(m&&!m.ext&&m.sev>=4&&m.d+1>=3&&!m.stairs){m.stairs=1;save();const me=S.pov!=='v',n=(m.xd||0)+3;
  return say(me?[['','On the stairs, with his hand under your elbow, you stop.'],
   ['hitmeuppp',MV('how many days.','how many days did i think i was there.','How many days did I think I was still there?','How many days. In there. How many days did I think you were one of them? Don’t round it.')],
   ['K9',`${n-1}. You knew me for part of the first.`],
   ['hitmeuppp',MV('...sorry.','i called u the tall one. sorry.','I called you the tall one. I’m sorry.','I called you the tall one. I didn’t eat your soup. I told you to keep V away from me, to your face. I’m— fuck. I’m so sorry.')],
   ['K9','You were polite to me throughout. You are polite to men you are about to kill. I have decided to take it as a compliment.'],
   ['','You laugh, and it hurts your ribs, and you keep laughing anyway because the alternative is the other thing, and he stands one step below you so his face is lower than yours until you’re done.']]:[
   ['','On the stairs she stops and asks how many days she thought she was still there. He tells her the real number.'],
   ['hitmeuppp',MV('...sorry.','i called u the tall one. sorry.','I called you the tall one. I’m sorry.','I called you the tall one. I told you to keep yourself away from me. I didn’t eat your soup for two days. I’m so sorry, V.')],
   ['K9','You were polite to me throughout. You are polite to men you are about to kill. I took it as a compliment.'],
   ['','She laughs, and it hurts her ribs, and she keeps going. He stands one step below her until she is done. He will remember the scratches on the wall for the rest of his life, and he does not tell her that.']],()=>_mmKD46b(done))}
 return _mmKD46b(done)};
/* a week later, once: it comes back for a minute in the dark */
EVENTS.push({id:'kd_still_relapse',kd:1,when:()=>{try{return (typeof KD_RUN!=='undefined'&&KD_RUN||globalThis.KD_AUTO)&&kdPost()&&kdD()>=4&&!S.f.kdRelapse&&kdSev()>=4}catch(e){return false}},run:done=>{S.f.kdRelapse=1;save();const m=S.pov!=='v';
 say(m?[['','You wake at three in the morning and you are in the cell. The bulb. The radio. The breathing at the door.'],
   ['','It lasts about a minute. Then a hound sighs at the end of the bed, a big tired sigh, and you know the sigh, and the cell comes apart like wet paper and it’s his ceiling, his room, the door open a hand’s width.'],
   ['','You don’t wake him. You lie there and count the hounds by their breathing until it’s light. Four. All four. You count them about a thousand times.'],
   ['hitmeuppp',MV('(still here.)','(it’ll keep coming back. ok.)','(It’ll keep coming back. Okay. I can do a minute.)','(It’s going to keep coming back, isn’t it. For a minute at a time, at three in the morning, for years. Okay. I can do a minute. I did eleven days.)')]]:[
   ['','At three in the morning he hears her in the dark: very quiet, very fast, counting loops of a radio that isn’t there.'],
   ['','He does not turn the light on, because of what the light would look like. He says, from where he lies, in an ordinary voice: “It is Tuesday. It is my house. The grey one is on your feet.”'],
   ['','The counting stops. After a long time a hand finds his sleeve in the dark and holds it, and stays holding it until morning, and neither of them mentions it at breakfast.']],()=>{calm(-4);apply({aff:2});done()})}});
if(typeof KD_ORDER!=='undefined'){const i=KD_ORDER.indexOf('kd_blank');KD_ORDER.splice(i<0?KD_ORDER.length:i,0,'kd_still_relapse')}
