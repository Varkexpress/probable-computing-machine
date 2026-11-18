/* ===================== FRIDAY (kc49) =====================
   A secret scene in the worst stays (infirmary severity 6+): on an extra night, still sure she is held, she believes
   the buyer comes on Friday and she won't see Saturday. She leaves her goodbyes with the only person there, the tall
   one, for him to pass on to V, Angel, Ronin and the hounds. The tall one is V. Afterwards he delivers them, word for
   word, and never tells her that he heard them first.
   Code "fridaycomes": a new run that starts on the infirmary floor after the worst captivity. */
const kdFri=()=>{const m=S&&S.kd&&S.kd.med;return !!(m&&m.sev>=6&&((m.xd||0)>=1||((m.sev||0)>=8&&(m.d||0)>=1))&&!S.f.kdGoodbye)};
const KD_BYE={v:'“Tell V— tell him it wasn’t his fault. Tell him I didn’t say anything. Tell him to eat. Tell him he can stop counting now.”',
 a:'“Tell Angel the lighting was always good. Tell her she never missed. Tell her she can have my rifle, the good one, it’s under the trailer floor, and she has to name it something stupid.”',
 r:'“Tell Ronin he can have the ring back. Tell him the joke about the priest was never funny and I laughed every time. Tell him he was two streets over and it doesn’t matter.”',
 h:'“Tell the grey one she’s good. Tell all of them they’re good. Somebody has to tell them every day or they forget, they’re hounds, they forget, so somebody has to tell them every day.”'};
function kdGoodbye(after){const said=[];S.f.kdGoodbye=1;save();go(cutBg('#04040a'));
 say([['','It is the second night, or the third. You have lost the count again. Somewhere in the losing it you worked out what day it must be.'],
  ['','Friday. The buyer comes Friday. You heard them say it under the radio, the first night, before anything. Tomorrow is Friday.'],
  ['','You do the sums the way you always do the sums. You don’t get a Saturday. That’s fine. You had five years and then some extra. You were lucky. You always said you were lucky.'],
  ['','The tall one is on the other side of the door. He always is. He breathes like somebody trying not to be heard.'],
  ['hitmeuppp',MV('...hey.','hey. tall guy. u awake.','Hey. You. Are you awake?','Hey. Tall one. I know you’re there, you breathe like a radiator. Are you awake?')],
  ['','A pause. Then: “Yes.”'],
  ['hitmeuppp',MV('i need u to pass some stuff on.','i need you to pass some stuff on. after. you don’t have to. but you’re the only one here.','I need you to pass some things on. After. You don’t have to. You’re just the only one here.','I need you to do something for me. After Friday. You don’t have to, you don’t owe me, but you’re the only person in this whole building who ever knelt down, so it’s you. I need you to pass some things on.')],
  ['','A longer pause. Then: “Tell me.”']],next);
 function next(){const o=[['v','For V.'],['a','For Angel.'],['r','For Ronin.'],['h','For the hounds.']].filter(([k])=>!said.includes(k)).map(([k,t])=>({t,fn:()=>{said.push(k);say([['hitmeuppp',KD_BYE[k]],['','On the other side of the door, nothing. Then, after a while: “I will tell them.”'+(k==='v'?' The voice does something on the last word that a guard’s voice wouldn’t.':'')]],next)}}));
  if(!o.length)return end();ask('hitmeuppp','(Who else.)',o.concat([{t:'That’s everyone.',fn:end}]))}
 function end(){S.f.kdBye=said.slice();save();say([
  ['hitmeuppp',MV('ok. thanks.','ok. that’s it. thanks. sorry about the soup.','That’s all. Thank you. I’m sorry about the soup.','That’s everyone. That’s all of them. Thank you. Sorry I never ate your soup, it smelled really good. Sorry I called you the tall one. You were the only nice thing in here.')],
  ['','You lie down with your back against the door. On the other side somebody lies down too. You can tell from the sound, a long slow slide down the wood, the way somebody sits down when their legs stop working.'],
  ['','Through two inches of door, the tall one starts to read aloud. It is tax history. It is the most boring book in the world. You are asleep in four minutes.'],
  ['','He reads until it gets light. He doesn’t stop once, because if he stops they will hear what his voice is doing.']],after)}}
/* Misaki's side: on a worst-stay night, before sleep */
const _sleepKD49=sleep;sleep=function(){const a=arguments,self=this;if(typeof kdMedM==='function'&&kdMedM()&&kdFri()&&kdClar()<2)return kdGoodbye(()=>{S.done.kdNight=1;_sleepKD49.apply(self,a)});return _sleepKD49.apply(self,a)};
/* V's side: the same night, on his side of the door, as the second extra morning */
const _mmKD49=kdMedMorning;kdMedMorning=function(done){const m=S.kd&&S.kd.med;if(m&&S.pov==='v'&&m.sev>=6&&(m.xd||0)>=1&&m.ext>0&&!S.f.kdGoodbye){S.f.kdGoodbye=1;S.f.kdBye=['v','a','r','h'];save();go(cutBg('#04040a'));
  return say([['','Three in the morning. He is on the floor outside the infirmary door, where he has been every night. Their voice comes through it, low, close to the floor on their side.'],
   ['hitmeuppp','hey. tall guy. u awake.'],['K9','Yes.'],
   ['hitmeuppp','i need you to pass some stuff on. after friday. the buyer comes friday. you’re the only one here.'],
   ['','They think it is Thursday. They think they will be sold in the morning. They are asking the guard to deliver them last words to V.'],
   ['hitmeuppp',KD_BYE.v],['hitmeuppp',KD_BYE.a],['hitmeuppp',KD_BYE.r],['hitmeuppp',KD_BYE.h],
   ['','He says “I will tell them” after each one. He manages it every time. He does not manage anything after that for some minutes.'],
   ['hitmeuppp','sorry about the soup. you were the only nice thing in here.'],
   ['','He reads to them through the door until it is light, the tax history, at the same speed, in the same voice. He does not stop once. If he stops they will hear what his voice is doing.']],()=>_mmKD49(done))}
 return _mmKD49(done)};
/* afterwards: he delivers them, word for word. She finds out. */
kdEv('kd_delivered',()=>kdD()>=2&&S.f.kdBye&&S.f.kdBye.length&&!S.f.kdDelivered,done=>{S.f.kdDelivered=1;save();const b=S.f.kdBye,m=S.pov!=='v';
 const L=[['',m?'Angel is strange with you at lunch. She keeps touching your arm. Ronin comes by at three with nothing to say and stays until nine.':'He delivers them the morning they come upstairs, in person, word for word, standing in a doorway each time, the way you would deliver news of a death.']];
 if(b.includes('a'))L.push(m?[AN,'babe. i named it. the rifle. it’s called “lighting was always good.” it’s engraved. i’m never using it. it’s on the wall.']:['','Angel listens to hers with both hands over her mouth. Then she goes and gets the rifle from under the trailer floor and has the name engraved on it before the end of the day.']);
 if(b.includes('r'))L.push(m?[RN,'Ain’t takin’ the ring back. Priest joke stays. And it fuckin’ matters, two streets. It matters. Don’t tell me what matters.']:['','Ronin listens to his in the yard, with his back to V, smoking. He says “two streets” once, and nothing else, and puts the cigarette out on his own hand.']);
 if(b.includes('h'))L.push(['',m?'Every morning now, V goes down the row of hounds and tells each one she’s good. Out loud. By name, the grey, the old, the black, the pale. You hear him through the floor.':'He does the hounds that evening. He goes down the row and tells each one she is good, out loud. He does it every morning after that and never misses one.']);
 L.push(m?['','You work it out at dinner. Nobody delivered anything. You never sent anything. There was only the tall one, and the tall one was—'] :['','He saves his own until last, and doesn’t deliver it. They sent it to him. It arrived.']);
 if(m)L.push(['hitmeuppp',MV('...it was u.','it was you. at the door. i told YOU.','That was you at the door. I said all of it to you.','That was you. Behind the door. I said goodbye to you, to you, and asked you to tell yourself, and you said “I will tell them” four times and then read me tax law until it got light. V. V, look at me.')],['K9','It was not my fault. You did not say anything. I am eating. I have stopped counting.'],['','He has learned it by heart. He says it back to them exactly. Then he goes and stands at the sink with his back to the room, and they let him, because they would want the same.']);
 say(L,()=>{fr('a',3);fr('r',3);apply({aff:5});calm(-4);done()})});
if(typeof KD_ORDER!=='undefined'){const i=KD_ORDER.indexOf('kd_count');KD_ORDER.splice(i<0?0:i,0,'kd_delivered')}
const _xeKD49=extraEnding;extraEnding=function(){const L=_xeKD49();if(!S||!S.f||!S.f.kdDelivered)return L;
 L.push('There is a rifle on Angel’s wall engraved “lighting was always good.” It has never been fired. Every morning V tells each of the hounds that she is good, by colour, out loud, and has never missed a day.');return L};
/* ---------- the worst stay: severity 8+ never clears until the day she walks out ---------- */
let kdWorstOf=()=>{const m=S&&S.kd&&S.kd.med;return !!(m&&(m.sev||0)>=8)};
const _mmKD49b=kdMedMorning;kdMedMorning=function(done){const before=S.kd&&S.kd.med;_mmKD49b(done);const m=S.kd&&S.kd.med;if(m&&kdWorstOf()&&m.clar>1){m.clar=1;save()}};
const _hubKD49=hub;hub=function(){try{const m=S&&S.kd&&S.kd.med;if(m&&kdWorstOf()&&m.clar>1){m.clar=1;save()}}catch(e){}return _hubKD49.apply(this,arguments)};
const _condKD49=kdCond;kdCond=function(){const m=S&&S.kd&&S.kd.med;if(m&&kdWorstOf())return 4;return _condKD49()};
/* in the worst stay, Friday can come on any night, not only the extra ones */
const _friOld=kdFri;
/* the opening of the worst stay */
const _msKD49=kdMedStart;kdMedStart=function(self,L){const r=_msKD49.apply(this,arguments);const m=S.kd&&S.kd.med;if(m&&kdWorstOf()&&S.pov!=='v'){S.f.kdWorstOpen=1;save()}return r};
const _hubKD49b=hub;hub=function(){const a=arguments,self=this;try{if(S&&S.f&&S.f.kdWorstOpen===1&&kdMedM()&&!dlg){S.f.kdWorstOpen=2;save();go(cutBg('#000'));return say([
 ['','Eleven days. That is what it was, in the end. Nobody tells you. You won’t know for a week.'],
 ['','What you know is the floor, and the bulb, and that you can’t feel two of your fingers, and that the sky you saw for a second when they carried you out must have been a dream, because you are back on a floor under a bulb.'],
 ['hitmeuppp','(it was a nice dream. there was a coat in it.)'],
 ['','You have stopped counting the radio. You lost count somewhere in the second week and you were too tired to start again. That frightens you more than anything else in the room.']],()=>_hubKD49b.apply(self,a))}}catch(e){}return _hubKD49b.apply(self,a)};
/* ---------- the code: straight to the infirmary, after the worst ---------- */
const _codeKD49=codeHook;codeHook=function(v){if(v!=='fridaycomes')return _codeKD49(v);
 newRun('m');S.day=16;S.slot=0;S.paid=2;S.f.kidnapSet=1;S.aff=12;S.comp=5;S.energy=10;S.edge=5;S.orgs={sato:3};S.fr={a:40,r:40};S.captor='sato';S.takenDay=5;
 S.phase='taken';S.dark=1;S.tries=2;S.f.lastChance=1;S.f.lateRoute='m';S.f.kdWorst=1;S.f.kdFriday=1;S.f.kdLoops=1;S.f.kdLoopN=900;S.f.listened=1;
 S.kd=null;KD();S.kd.ses=6;S.kd.hrs=60;S.kd.said=3;S.leaks=3;S.f.missing=6;save();
 toast('Friday comes. The worst of it.');setTimeout(()=>{try{after(false);S.kd.days=11;save()}catch(e){console.error(e)}},60);return true};
