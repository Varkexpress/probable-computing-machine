/* ===================== DRINKS (kc37) =====================
   An evening option: the four drink at V's. The first time, at midnight, Angel notices two of them are missing. */
const drOK=()=>S&&!isLone()&&!S.dark&&['normal','act2','epilogue','after'].includes(S.phase)&&!(S.kd&&S.kd.med)&&frT('a')>=1&&frT('r')>=1;
const _shDR=sideHub;sideHub=function(late){const o=_shDR(late);if(!drOK()||S.slot<2)return o;const wait=S.day-(S.f.drLast||-9)<4;
 return o.concat([{t:'Drinks at V’s (everyone)',sub:wait?'everyone’s liver needs a few days':'costs the evening',dis:wait,fn:()=>{spend();S.f.drLast=S.day;save();drinks()}}])};
function drinks(){const m=S.pov!=='v',me=m?'hitmeuppp':'K9';go({draw:hubBg});
 const first=!S.f.drDoor;
 say([['','Ten o’clock in the atrium. Ronin has brought a bottle with no label. Angel has brought a bottle with a ribbon on it, and a second one in her bag in case the first one is not enough. V has put out four glasses and a coaster for each glass.'],
  [RN,'Coasters. In a house where the floor’s seen what this floor’s seen.'],
  ['K9','The floor is sealed. The table is walnut.']],()=>ask(me,'(What are you drinking?)',[
   {t:m?'Whatever Ronin poured. Don’t ask.':'One glass of wine, slowly.',fn:()=>{apply({energy:-6});m?fr('r',2):apply({aff:1});next(m?[[RN,'Attagirl. That one strips paint. I tested it.'],['hitmeuppp',MV('it’s fine.','it’s fine. it tastes like a fire.','It tastes like a car fire. It’s great.','It tastes like a car fire and I love it. Pour me another before I can taste the second one.')]]:[['','He drinks one glass in two hours and watches the other three get louder.'],[AN,'you’re doing the face. the fond face. the one you think nobody sees.']])}},
   {t:m?'Angel’s, the one with the ribbon.':'Whatever Ronin poured.',fn:()=>{apply({energy:-6});m?fr('a',2):fr('r',3);next(m?[[AN,'it’s rose. it’s pink. it matches nothing in this house and that is the point.'],['hitmeuppp',MV('it’s good.','it’s nice. it’s like a perfume u can drink.','It’s nice. It’s like drinking a perfume.','It’s like drinking a perfume. Expensive. Pink. I’d kill for this, actually, who do I have to kill.')]]:[[RN,'Holy shit. Vee’s drinkin’ mine. Somebody film it.'],['K9','It is very bad.'],[RN,'Yeah it is. Have another.']])}},
   {t:'Water. You’re the one driving people home.',fn:()=>{apply({heart:1});next([[AN,'boring. responsible. hot, a bit. whatever.']])}}]));
 function next(L){say(L.concat([
   ['','By eleven Ronin is telling the story about the priest again, and Angel is narrating him under her breath in her vlog voice, and the hounds have come in one by one and lain down in a ring around the four of them.'],
   ['','By half past, Misaki and V aren’t there. Nobody saw them go.']]),first?door:short)}
 function door(){S.f.drDoor=1;save();cut([['','Midnight.'],
   [AN,'...where are they.'],
   [RN,'(from the couch, face down) bed. they’re old. let ’em be old.'],
   ['','Angel goes looking anyway. The east wing is dark all the way down. The bedroom door at the end is shut, and the panel beside it is red.'],
   ['','Locked. V’s lock, the good kind. Angel puts her drink down on the floor, takes out her phone, prises the cover off the panel with a nail, and has it open in forty seconds, because she is very good and slightly drunk and nobody locks a door on her.'],
   ['','The room is pitch black. No lamp, no curtains open. The only light is a small rectangle in the middle of the bed, about the size of a hand.'],
   ['','In the middle of a pile of every duvet in the house, Misaki is lying on their back with no shirt on, holding a Switch above their face with both hands, the screen lighting them up blue from underneath. Something on the screen goes “bwoop.”'],
   ['','On the floor beside the bed, there is a shape. It takes Angel a second. It is V, flat on his back, fully dressed, and on top of him are all four hounds, the grey and the old and the black and the pale, arranged across him like sandbags. Only his head and one hand are visible. The hand is holding a glass of water.'],
   ['hitmeuppp',MV('shh.','shhh. i’m catching something.','Shh. I’m catching something.','Shhh. Angel. Shut the door. I’m catching something. If you make me miss it I’ll kill you with this Switch.')],
   [AN,'...are you playing POKÉMON. in the DARK. at a PARTY.'],
   ['hitmeuppp',MV('ya.','yeah. it’s quiet in here.','Yes. It’s quiet in here.','Yeah. It’s quiet and it’s dark and nobody’s talking about priests. Best party I’ve been to all year.')],
   [AN,'(to the floor) and you?'],
   ['K9','I came in to bring her water. I lay down for one moment. They have decided.'],
   ['','The grey hound opens one eye at Angel. It does not move. Nothing moves. V’s glass of water, held upright on his chest, does not spill.'],
   ['K9','I have been here for forty minutes. I am very comfortable. I would like it noted that I did not lock the door. She did.'],
   ['hitmeuppp',MV('i did.','i did. u hacked it. rude.','I did lock it. You hacked it. Rude.','I locked it. You hacked my lock, Angel. In this house. That’s a crime. I’m pressing charges, as soon as I’ve caught this.')]]
  ,()=>ask(m?'hitmeuppp':'K9','(Angel is standing in the doorway with her phone torch off, considering it.)',[
   {t:'“get in. shut the door.”',fn:()=>end('in')},
   {t:'“bring ronin. and the bottle.”',fn:()=>end('all')},
   {t:'“go away. lovingly.”',fn:()=>end('out')}]),'#000')}
 function end(k){fr('a',3);fr('r',2);apply({aff:3,energy:-10});S.f.drDoor=k;save();say(k==='in'?[
   ['','Angel shuts the door, kicks her shoes off, and gets into the duvet pile on the side that isn’t occupied by a Switch. She watches Misaki catch it. It takes eleven minutes.'],
   [AN,'(whispering) we’re not telling ronin about this'],['K9','(from under the hounds) Agreed.'],
   ['','Ronin finds them at two. He stands in the doorway for a while, looking at the three of them and the four hounds in the dark. Then he lies down across the foot of the bed on top of everyone’s feet and falls asleep in his boots.']]:k==='all'?[
   ['','Angel comes back with Ronin and the bottle. Ronin looks at the room for a long time.'],
   [RN,'This is the most fucked-up thing I’ve ever seen, and I’ve seen a guy eat his own ear.'],
   ['','He lies down on the floor next to V, because there is no room on V. The pale hound moves over onto him without being asked. They pass the bottle across the floor in the dark, and Misaki narrates the battle on the Switch in Angel’s vlog voice until Angel takes the Switch off her.']]:[
   [AN,'lovingly. ok.'],
   ['','Angel shuts the door very gently. Then she re-locks it from outside, with her phone, to show that she can.'],
   ['','When she gets back to the atrium Ronin asks where they are.'],[AN,'asleep,'],['','she says, which is not true, and goes and lies down with her head on Ronin’s back, and listens to the house be quiet.']],()=>{hub()})}
 function short(){const L=pk([
   [['','At midnight Angel goes to look for them. The bedroom door is shut, the panel is red, and through it comes a very faint “bwoop.” She leaves them to it.']],
   [['','At midnight Ronin goes to look for them. He comes back and says “hounds,” and nothing else, and pours another.']],
   [['','At midnight the four of them are on the atrium floor in the dark. The hounds are lying across all of them. Nobody has been able to move for an hour, and nobody has tried.']]]);
  apply({energy:-8});fr('a',1);fr('r',1);say(L,hub)}}
