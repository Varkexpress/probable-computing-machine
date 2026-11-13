/* ===================== THE FOUR OF THEM (kc41) =====================
   Relationships, and the strange catharsis of being with each other: the world goes on being loud and terrible
   outside, and in a room with the other three none of them can bring themselves to care. No new characters. */
const RL=()=>{try{return !isLone()&&!S.dark&&['normal','act2','act3','epilogue'].includes(S.phase)}catch(e){return false}};
const rlEv=(id,when,run)=>EVENTS.push({id,when:()=>{try{return RL()&&when()}catch(e){return false}},run});
const rM=()=>S.pov!=='v';
rlEv('rel_news',()=>S.day>=4&&frT('a')>=1&&frT('r')>=1,done=>say([
 ['','The evening news leads with a body found in a canal, then a second, then a man the police describe as “known to them” who has not been seen since Thursday. All three are theirs.'],
 ['','Nobody turns it up. Angel is painting Ronin’s nails black. V is reading. Misaki is upside down on the couch with her feet on the wall.'],
 [AN,'her eyeliner is uneven. she’s on national television. somebody should do something.'],
 [RN,'Somebody should. Not me. I’m busy.'],
 ['','The anchor says the city is frightened. Out in the city that is probably true. In this room nobody can find it in themselves to care, and they all notice that about each other and say nothing.']],()=>{fr('a',1);fr('r',1);calm(2);done()}));
rlEv('rel_power',()=>tier()>=2,done=>say([
 ['','There is a power cut across half the city. Sirens, car alarms, a helicopter. On the phone screens, people are calling it a disaster.'],
 ['','V’s house has its own generator, which does not come on, because nobody notices the lights are off for two hours. Misaki and V are on the kitchen floor with a candle, the hounds and a puzzle of a thousand pieces that are all sky.'],
 ['hitmeuppp',MV('is it dark out?','wait. is the whole city dark?','Wait. Is the whole city dark?','Wait, hang on. The whole city’s out? When did that happen? Huh. Anyway. This is an edge, I found an edge.')],
 ['K9','Since nine. I did not want to interrupt.'],
 ['','They finish the puzzle at four in the morning. The power comes back at five. Neither of them has looked out of a window.']],()=>{apply({aff:3});calm(3);done()}));
rlEv('rel_roof',()=>S.pov==='v'&&frT('r')>=1,done=>say([
 ['','Four in the morning on the roof. Both of them came back from separate work tonight. Ronin is smoking. V does not smoke, and is holding a cup of tea he has not drunk.'],
 [RN,'You ever feel anythin’ for ’em. After.'],['K9','No.'],
 [RN,'Me neither. Feels good, don’t it.'],
 ['K9','It feels like nothing. That is what is good about it.'],
 ['','Ronin laughs, the big ugly laugh, and V almost does. Below them the city goes on with its sirens. Neither of them looks down.']],()=>{fr('r',3);apply({heart:-1});done()}));
rlEv('rel_graves',()=>frT('a')>=1&&frT('r')>=1,done=>{const m=rM();say([
 ['','Angel and Ronin are having a picnic on a grave. Not one of theirs. It has a good tree. Forty metres away, somebody else’s funeral is going on.'],
 [AN,'they’re doing the bit with the dirt.'],[RN,'Sandwich.'],
 [AN,'thank you. ...do you feel bad for them'],[RN,'Nah. You?'],[AN,'no. i thought i would. i keep checking. it’s just not there.'],
 ['',m?'You’re on the grave next to theirs, lying flat, with a sandwich on your chest. You check as well. It isn’t there for you either. It’s nice, lying here with them, not feeling it together.':'Misaki, lying flat on the next grave with a sandwich on their chest, says they checked too. Nobody feels anything, together, under a good tree, and it is a lovely afternoon.']],()=>{fr('a',2);fr('r',2);calm(2);done()})});
rlEv('rel_crash',()=>rM()&&frT('r')>=1,done=>say([
 ['','There is a car crash outside Ronin’s window. Two cars, one on its side, glass all over the road. People running.'],
 [RN,'Six outta ten. The flip was good. No fire.'],
 ['hitmeuppp',MV('five.','five. the flip was slow.','Five. The flip was slow.','Five. The flip was slow and nobody’s even bleeding properly. I’ve seen better from a bike.')],
 ['','They watch the ambulance come and go, eating cereal out of the box, scoring the paramedics. Then Ronin puts the radio on, and they forget it happened.']],()=>{fr('r',3);done()}));
rlEv('rel_nails',()=>rM()&&frT('a')>=1,done=>say([
 ['','Three in the morning, after a job. Angel is doing your nails at her kitchen table. There is still some of the job under them. She cleans it out first without saying anything.'],
 [AN,'do you ever feel bad. after.'],
 ['hitmeuppp',MV('no.','no. only if ur not around.','No. Only when you lot aren’t around.','No. Not after. Only sometimes when I’m on my own, and it’s not even about them, it’s about nothing. Then I come here and it goes.')],
 [AN,'same. it goes when i’m with you guys. like turning the tv off.'],
 ['','She does a small knife on each thumb. Outside, a car alarm goes on for an hour. Neither of you notices when it stops.']],()=>{fr('a',3);calm(3);done()}));
rlEv('rel_va',()=>S.pov==='v'&&frT('a')>=1,done=>say([
 ['','Angel does V’s quarterly accounts on his couch with her feet in his lap, because she likes his spreadsheets and he likes how she formats them. He does her alibis for the month. It is the most restful thing either of them does.'],
 [AN,'there’s a fire on the east side. big one. it’s on every channel.'],
 ['K9','Is it ours?'],[AN,'no.'],['K9','Then pass me March.'],
 ['','She passes him March. They work until two. The east side burns until morning.']],()=>{fr('a',3);done()}));
rlEv('rel_scream',()=>S.day>=6&&frT('a')>=1&&frT('r')>=1&&tier()>=1,done=>{const m=rM();say([
 ['','Midnight. The four of them are in V’s car, driving out past the last streetlights, because Ronin said they should and nobody had a reason not to.'],
 ['','At the edge of the city V pulls over on the hard shoulder. Ronin winds his window down and screams, as loud as he can, at nothing, for as long as his breath lasts.'],
 ['','Then Angel does. Then Misaki, who goes on longest. Then they all look at V.'],
 ['K9','No.'],[RN,'Vee.'],[AN,'V.'],['hitmeuppp',MV('V.','V. come on.','V. Come on.','V. It’s just us. Nobody else is out here. Nobody would care anyway.')],
 ['','V winds his window down. He does it once, short, like a door slammed in a different house. Then he winds the window up and pulls back onto the road.'],
 ['',m?'Nobody says anything for a while. Then you all go and get fried food from a place by the motorway, and eat it in the car park, and you feel as light as you’ve ever felt in your life.':'Nobody says anything for a while. Then they get fried food from a place by the motorway and eat it in the car park. He does not feel better, exactly. He feels nothing at all, very cleanly, and it is the best he has felt in a year.']],()=>{fr('a',3);fr('r',3);apply({aff:3});calm(6);done()})});
rlEv('rel_hose',()=>tier()>=1&&frT('r')>=1,done=>say([
 ['','A job went messy. The three who were on it come back covered, and stand in V’s back yard in the rain while V hoses them down like a car.'],
 [RN,'Cold! Fuck, Vee, cold!'],['hitmeuppp',MV('do ronin again.','do ronin again he’s still got some in his ear.','Do Ronin again, it’s still in his ear.','Do Ronin again! It’s in his ear, V, it’s in his EAR!')],
 [AN,'i’m going to kill all of you and then myself and then the hose.'],
 ['','The water runs pink and then clear into the drain. They laugh so hard that Angel has to sit down on the wet grass. Somewhere out there a family is going to wonder all their lives what happened. In the yard, nobody is thinking about that at all.']],()=>{fr('a',2);fr('r',2);apply({aff:2});calm(4);done()}));
/* an evening option: nothing, together */
const _shRL=sideHub;sideHub=function(late){const o=_shRL(late);if(!RL()||S.slot<2||frT('a')<1||frT('r')<1)return o;
 return o.concat([{t:'Do nothing (everyone)',sub:S.done.rlNothing?'done tonight':'costs the evening · the four of you, the atrium, no plans',dis:!!S.done.rlNothing,fn:()=>{spend();S.done.rlNothing=1;save();go({draw:hubBg});
  const L=pk([
   [['','Nobody talks for an hour. Ronin is asleep on the rug with a hound for a pillow. Angel is scrolling. V is reading. Misaki is lying across the end of the couch with their head in Angel’s lap. Outside it is raining on a city that is afraid of all four of them.']],
   [['','Somebody puts a film on. Nobody watches it. When it finishes nobody puts another on, and nobody gets up. The credits go up in the dark, and it is the most restful thing any of them has done all week.']],
   [['','Angel reads them the comments under the news article about the canal. The four of them laugh at the comments until Ronin cries. Then they all go quiet, together, at the same time, the way a room goes quiet after a storm.']],
   [['','Ronin asks, out of nowhere, if anybody ever feels guilty. Everybody thinks about it, honestly, for a whole minute. Nobody does. Angel says “huh.” V says “No.” Misaki says “not when i’m here.” Then they talk about something else.']]]);
  fr('a',1);fr('r',1);apply({aff:1});calm(4);say(L,hub)}}])};
txDef('tx_rl_fire',{with:'r',pov:'v',prio:1,when:()=>RL()&&frT('r')>=1&&S.day>=4,nodes:{
 start:{in:()=>['city’s on fire again. east side. you seein this','(a photo: orange sky over rooftops)'],expire:3,
  opts:()=>[{t:'“Is it yours?”',fx:()=>fr('r',2),reply:()=>['nah. wish it was. look at that color'],next:'two'},
   {t:'“I am reading.”',fx:()=>fr('r',1),reply:()=>['course you are. what book'],next:'two'}]},
 two:{in:()=>['wanna watch it from your roof. bring the bad tea'],
  opts:()=>[{t:'“Come over.”',fx:()=>{fr('r',3);calm(2)},reply:()=>['omw. bringin princess and the gremlin','nobody’s gonna talk about the fire. we’re gonna eat']},
   {t:'“It is a fire, Ronin.”',fx:()=>fr('r',1),reply:()=>['yeah. and it’s pretty. and it ain’t ours. that’s like three good things']}]}}});
txDef('tx_rl_end',{with:'a',pov:'m',prio:1,when:()=>RL()&&frT('a')>=1&&S.day>=4,nodes:{
 start:{in:()=>['news says the world’s ending again. sirens everywhere. you scared'],expire:3,
  opts:()=>[{t:'“no. u?”',fx:()=>fr('a',2),reply:()=>['no. i keep checking to see if i should be','it’s not there. i think it’s because of you guys'],next:'two'},
   {t:'“of what lol”',fx:()=>fr('a',2),reply:()=>['exactly lmao','of what'],next:'two'}]},
 two:{in:()=>['come over. ronin’s here. we’re making pancakes while the city screams'],
  opts:()=>[{t:'“omw. save me the burnt ones”',fx:()=>{fr('a',3);calm(3)},reply:()=>['they’re all burnt. ronin’s cooking']},
   {t:'“bring them to v’s. hounds want pancakes”',fx:()=>{fr('a',2);apply({aff:1})},reply:()=>['ok. the four of us and the hounds and pancakes and the end of the world. perfect night honestly']}]}}});
