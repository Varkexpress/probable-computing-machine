/* ===================== BRIGHT, AND AFTER (kc52) =====================
   Psychological horror for the worst route. Before the spiral night, the game turns bright: she feels better, the
   room looks lovely, and she makes small, harmless-looking choices. They are not harmless. The last one decides the
   shape of the ending (where she is, what she holds, what V finds). The method is never shown or implied.
   More of her mind on the bad days, more uncanny moments, and more of V alone afterwards. */
const KD_BRIGHT_PAL=['#2b2410','#3a2f12','#4a3b14'];
function kdBrightDraw(){const t=(T>>3)%60;rect(0,0,W,H,'#f6e7c8');const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#fff6dc');g.addColorStop(1,'#f3d9a8');c.fillStyle=g;c.fillRect(0,0,W,H);
 for(let i=0;i<24;i++){const x=(i*53+t*2)%W,y=(i*37)%H;c.fillStyle='rgba(255,255,255,.5)';c.fillRect(x,y,2,2)}rect(140,0,40,H,'rgba(255,255,240,.35)')}
function kdBright(cb){const m=S.kd.med;go({draw:kdBrightDraw});
 say([['','You wake up and you feel better. That’s the first thing. You feel so much better.'],
  ['','The bulb looks warm, for once. Like a kitchen light. The soup on the tray smells of somebody’s home, and you eat all of it, and it is the best thing you have ever tasted.'],
  ['hitmeuppp',MV('(oh. i feel ok.)','(oh. i feel ok. i feel really ok actually.)','(Oh. I feel all right. I feel completely all right.)','(Oh. I feel good. I feel lighter than I have in— I can’t remember. Everything’s so clear. I know exactly what to do now. It’s such a relief to know what to do.)')],
  ['','You hum. You fold the blanket. You tidy the tray. You say “good morning” through the door, brightly, and on the other side the tall one goes completely silent, and stays silent, and you don’t understand why he doesn’t say it back.']],()=>
  ask('hitmeuppp','(What should you hum?)',[
   {t:'The bank jingle. It’s catchy, honestly.',fn:()=>{m.br1='jingle';two()}},
   {t:'Ronin’s hymn, the one the man knew.',fn:()=>{m.br1='hymn';two()}},
   {t:'Nothing. Just listen to the house.',fn:()=>{m.br1='quiet';two()}}]));
 function two(){say([['','You hum it all the way through. It sounds lovely in here. The room has good acoustics; you’d never noticed.'],
   ['hitmeuppp',MV('(should i tidy up?)','(i should leave it nice. for whoever.)','(I should leave the room nice. For whoever comes in.)','(I want to leave everything nice. Tidy. You don’t leave a mess for people. That’s just manners.)')]],()=>
   ask('hitmeuppp','(What should you leave out, neatly, where someone will see it?)',[
    {t:'The paper cup. Washed. In the middle of the tray.',fn:()=>{m.br2='cup';three()}},
    {t:'The soup label. Write something nice on it.',fn:()=>{m.br2='label';three()}},
    {t:'Nothing. Just the blanket, folded.',fn:()=>{m.br2='blanket';three()}}]))}
 function three(){say([['','It looks so tidy. You feel proud of it. You feel proud of everything today.'],
   ['','The light-well is very bright this afternoon. There’s a leaf on the glass at the top, very small and very far up. You could look at it forever.']],()=>
   ask('hitmeuppp','(Where do you want to sit tonight? Somewhere nice.)',[
    {t:'Under the light-well, where you can see the leaf.',fn:()=>{m.br3='light';save();cb()}},
    {t:'With your back to the door. The tall one’s on the other side; it’s warm there.',fn:()=>{m.br3='door';save();cb()}},
    {t:'On the bed, facing the wall, with the light off. Just for once.',fn:()=>{m.br3='dark';save();cb()}},
    {t:'On the floor by the door. Maybe a hound will come.',fn:()=>{m.br3='hound';save();cb()}}]))}}
/* the bright day replaces the bedtime of the night the spiral would come */
const _sleepKD52=sleep;sleep=function(){const m=S.kd&&S.kd.med;if(typeof kdWR==='function'&&kdWR()&&S.comp<=3&&!S.f.kdSpiral&&m&&!m.br3){const a=arguments,self=this;return kdBright(()=>_sleepKD52.apply(self,a))}return _sleepKD52.apply(this,arguments)};
/* the shape of the ending follows the "innocent" choices */
const KD_SHAPE={
 light:[['','He finds their under the light-well, sitting, their face turned up. The leaf is still on the glass four floors up. They were looking at it.'],['K9','(They chose the only window in the room. They wanted to see something from outside. I built them a room with one window and it was a slot in the ceiling.)']],
 door:[['','He finds them sitting against the door, on their side of it. Their back was against the wood, exactly where his had been, all night, through two inches. They were back to back. He was reading. He did not stop.'],['K9','(I was right there. I was against the same door. I was reading about land tax.)']],
 dark:[['','He finds them on the bed, facing the wall, in the dark. The light is off. In nine days they have never once turned the light off. They have never once faced a wall.'],['K9','(They turned away from the door. They have never turned away from a door in their life. I heard them do it, at midnight. I heard the bed and I did not understand what it meant.)']],
 hound:[['','He finds them on the floor by the door, and the grey hound is already there, lying along them, chin on their shoulder. The hound had pushed the door open in the night. She had come anyway. She was just too late, too.'],['K9','(The hound was in time to lie beside them. Only the hound.)']]};
const KD_LEFT={cup:['','On the tray, in the middle, washed and set straight, the paper cup. Tidy. They left it tidy for whoever came in.'],
 label:['','On the tray, a soup label, written on in their best handwriting, very neat: “thank u for the soup. sorry. it was good.” It is addressed to the tall one.'],
 blanket:['','The blanket is folded into a perfect square at the end of the bed, corners under, the way he folds them.']};
const KD_HUM={jingle:'Somewhere in the room, still, there’s a tune he can’t place, and then he can: a jingle for a bank. They were humming it. He heard them humming it all afternoon and thought they were getting better.',
 hymn:'All afternoon they hummed Ronin’s hymn, the one the man on the floor knew. He heard it through the door and thought they were getting better. He wrote it down: “Humming. Better?”',
 quiet:'All afternoon it was quiet in there. A good quiet, he thought. The first good quiet in nine days. He wrote it down: “Quiet. Resting. Better?”'};
function kdShapeLines(){const m=S.kd&&S.kd.med;if(!m||!m.br3)return[];const L=(KD_SHAPE[m.br3]||[]).slice();if(KD_LEFT[m.br2])L.push(KD_LEFT[m.br2]);if(KD_HUM[m.br1])L.push(['',KD_HUM[m.br1]]);return L}
/* ---------- more of her mind: a third scene per band ---------- */
if(typeof KD_MIND!=='undefined'){
 KD_MIND.hold.push([['','You practise his name under your breath. V. V. V. In case they take it. You keep it in your mouth like a sweet you’re saving.'],['hitmeuppp','(V. Still got it. Still mine.)']]);
 KD_MIND.fray.push([['','You count the hounds by their breathing through the door. Four. You count again. Five. You count again and get five, and the fifth is slow and shallow and very close, and it takes you a long time to understand that the fifth one is you.']]);
 KD_MIND.thin.push([['','The tall one reads to you from a notebook today instead of the tax book. Every line is something you’ve said. Your jokes. The thing about the mangoes. The bit about the knife and the fork.'],['hitmeuppp','(They’ve been listening to me for years. They wrote it all down. They know every stupid thing I ever said to anyone I loved.)'],['','It is V’s notebook, and he kept it for love. You hear it as a file.']]);
 KD_MIND.gone.push([['','You dream of the kitchen island. Cereal, the hounds, Angel laughing at something Ronin said, V doing the crossword and leaving seven down. It’s so real. You laugh in the dream.'],['','You wake up laughing, in the cell, and the laugh stops in your mouth, and the tall one on the other side of the door says “Misaki?” under his breath, and you think: they’ve learned to do his voice now. They’ve even got his voice.']])}
/* ---------- uncanny moments in the room ---------- */
const KD_UNCANNY=[
 [['','You look at the door. It has a handle. You look away, and back. It hasn’t. You look away and back. It has. You stop looking.']],
 [['','The mirror under the towel. You lift the corner. The kid in it is a second late, lifting the corner of their own towel. You put it down carefully, the way you’d put down something live.']],
 [['','You count the tiles in the floor. Forty-one. You count again. Forty-one. You count again and it’s forty-two, and there is a forty-second tile right under your foot that wasn’t there, and you stand on it all night so it can’t go anywhere.']]];
const _hubKD52=hub;hub=function(){const a=arguments,self=this;try{if(typeof kdWR==='function'&&kdWR()&&kdClar()<2&&S.comp<14&&!dlg&&S.f.kdUncDay!==S.day&&S.slot>=2){S.f.kdUncDay=S.day;S.f.kdUncN=(S.f.kdUncN||0)+1;save();go(cutBg('#0c0a08'));return say(KD_UNCANNY[(S.f.kdUncN-1)%KD_UNCANNY.length],()=>_hubKD52.apply(self,a))}}catch(e){}return _hubKD52.apply(self,a)};
/* ---------- V alone: more ---------- */
if(typeof KD_AFTER!=='undefined')KD_AFTER.push(
 [['','Her name on the server goes grey. Hours become days under it: last online 9 days ago, 2 weeks ago, a month ago. Angel cannot make herself remove her. Nobody can.'],['','At three in the morning, once, the grey name shows as typing. It is Angel, logged into Misaki’s account from the trailer laptop, typing nothing, just to see the dots. V watches the dots for twenty minutes. Then they stop.']],
 [['','He finishes the list. Every name on it. The driver, the radio man, the note-taker, the one behind the chair. He does them slowly and thoroughly and there is nothing left of any of them.'],['','He waits to feel it, afterwards, at the kitchen island. He waits a long time. The list is finished and they are still dead, and the hounds are fed, and it is Tuesday.']],
 [['','On their trailer fridge there is still a sticky note in his handwriting: “Eat. —V.” He wrote it the week they met. They never took it down.'],['','He stands in front of it for a long time. He does not take it down either. He adds one underneath, in the same pen, and leaves before he can read it back: “I did. —V.”']],
 [['','January. He updates the files. He gets to theirs and cannot write the word. He sits with the pen over the page for an hour, and the ink dries on the nib, and he puts the file back unfinished. It stays unfinished. He never closes it.']],
 [['','He goes to the station bench, the one they did the sums on at sixteen. He sits where they sat. A train comes and goes. Another.'],['K9','(Five years, they gave themself. They got a little over that. I was there for one of them. They said it was the best one. They were being kind, or they were being honest, and I would give anything to know which.)']],
 [['','Every morning he goes down the row of hounds and tells each one she is good, out loud, by colour. The grey, the old, the black, the pale. Somebody has to tell them every day, or they forget. Somebody told him that once, through a door.'],['','He has not missed a day. He will not miss a day. It is the one instruction he was given that he can still follow.']]);
const _shKD52=sideHub;sideHub=function(late){const o=_shKD52(late);if(!S||S.lone!=='v'||S.f.lateRoute!=='self')return o;
 return o.concat([{t:'Sit in the infirmary doorway',sub:S.done.kdDoorway?'done today':'costs time',dis:late||!!S.done.kdDoorway,fn:()=>{spend();S.done.kdDoorway=1;S.f.kdDoorwayN=(S.f.kdDoorwayN||0)+1;save();go(cutBg('#0c0e10'));
  const L=pk([[['','He sits in the doorway where the door used to be. The bed is made, hospital corners. He made it the morning after and has not touched it since.'],['K9','It is Tuesday. It is my house.']],
   [['','He reads aloud to the empty room. Tax history, chapter six. He reads until his voice goes, and then he sits, and the grey hound comes down the stairs and lies across the threshold beside him.']],
   [['','He sits in the doorway and does the crossword, and fills in seven down, which he has always left for them.']],
   [['','He tells the empty room what the hounds did today, who ate what, who was sick on the stairs, the way he would have told them through the door. It takes four minutes. Then there is nothing else to say, and he sits there for an hour anyway.']]]);
  say(L,()=>{apply({heart:-1});hub()})}}])};
