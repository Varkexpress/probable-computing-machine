/* ===================== STILL THERE (kc46) =====================
   If the captivity went badly enough, the infirmary delusion lasts longer. Severity (kdSev) is worked out when she
   is carried in: sessions, missing hours, failed escapes, the last-chance route, low composure, and how much she
   said. At 4+ she stays convinced she is still held for extra days (m.ext, 1 or 2), and each morning of it the room
   goes back to being a cell, whatever she worked out the day before. Each extra day pushes the after-phase back. */
function kdSev(){const k=S.kd||{};let s=0;s+=Math.max(0,(k.ses||0)-1);if((k.hrs||0)>=16)s++;if((k.hrs||0)>=24)s++;if((S.tries||0)>=2)s++;if(S.f.lastChance||S.f.lateRoute)s++;if((S.comp||50)<35)s++;if((k.said||0)>=2)s++;if((S.f.missing||0)>=3)s++;return s}
const _msKD=kdMedStart;kdMedStart=function(self,L){const sev=kdSev();const r=_msKD.apply(this,arguments);const m=S.kd&&S.kd.med;if(m){m.sev=sev;m.ext=sev>=6?2:sev>=4?1:0;if(m.ext)S.endDay+=m.ext;save()}return r};
const KD_STILL_M=[
 [['','You wake up and it is a cell again.'],['','You knew yesterday, you’re nearly sure you knew, that it was a room in a house. You remember a handle and a hound. In the morning the handle isn’t there, and the bulb is, and you can hear the radio down the hall even though there isn’t one.'],
  ['hitmeuppp',MV('(they moved me back.)','(they moved me back while i slept. clever.)','(They moved me back while I was asleep. That was clever of them.)','(They let me think I was out. That’s a technique. I’ve read about it. You let them think they’re out and then you take it back. Okay. I know what this is. I can do this one.)')]],
 [['','The tall one comes in with soup. He kneels down so his face is lower than yours, which none of the others ever did, and that is how you know he’s the clever one.'],['','He says your name. He says the date. He says a word that sounds like “hounds.” You count the loops of a jingle that is not playing, and you don’t answer, because that is the rule, say nothing.']]];
const KD_STILL_V=[
 [['','She does not know him this morning.'],['','Yesterday she asked him what seven down was. Today she is under the bed with the tray held edge-out, and when he says her name she counts, under her breath, the loops of a radio that has never been in this house.'],['K9','(It came back in the night. It will come back again. I am going to be here each time it does.)']],
 [['','Day after day she wakes up in the cell again. Day after day he is the tall one who brings the water.'],['','He sits on the floor, lower than her, and reads the tax history aloud through all of it, in the same voice, at the same speed, so that one thing in the room is always the same.']]];
const _mmKD46=kdMedMorning;kdMedMorning=function(done){const k=S.kd,m=k&&k.med;if(!m||!m.ext||m.d+1<3)return _mmKD46(done);
 const i=(m.sev>=6?2:1)-m.ext;m.d++;m.ext--;m.clar=0;S.done={};S.done.bedChosen=1;save();const me=S.pov!=='v';
 const L=(me?KD_STILL_M:KD_STILL_V)[Math.min(i,1)];
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
