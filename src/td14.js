/* ===================== AFTERMATH THREADS: what the warehouse cost, and who pays ===================== */
EVENTS.push(
/* the receipt: she paid her own rent. Someone else paid the next three months. */
{id:'sub_receipt',when:()=>S.phase==='after'&&isM()&&S.pov!=='v'&&S.day>=(S.f.returnDay||0)+1,run:done=>say([
 ['','Laundry day. The rent receipt from that night went through the wash in her back pocket. It’s pulp. She goes to the landlord for a copy.'],
 ['Landlord','Copy? Sure, sure. Oh, and your, um, brother came by. Paid you through March. Very polite man. He brought me biscuits, the people kind.'],
 ['hitmeuppp','he brought you fucking BISCUITS.'],
 ['hitmeuppp',MV('yeah my brother. he’s tall and a total problem.','yeah. my brother. he’s tall and he’s a massive problem.','Sure. My brother. I’ve got one of those now, apparently.','My brother, right. He’s so polite. He’s so polite I’m going to strangle him with his own coat.')],
 ['','He paid three months of rent she didn’t earn. She knows what happens to people who owe people; she collects from them for a living. (And the first thing she felt was relief, which is so fucked.)']],
 ()=>ask('hitmeuppp','(What do you do about March?)',[
  {t:'Pay him back. Every yen.',sub:S.yen>0?'−¥'+Math.min(S.yen,120000).toLocaleString()+' · it’s yours':'you’re broke · you’ll owe him',fn:()=>{const p=Math.min(S.yen,120000);S.yen-=p;S.f.rentBack=1;apply({aff:2});save();say([
   ['','She leaves an envelope on his kitchen counter, under the okayest mug, with a note: “for march. don’t.”'],
   ['K9','(That evening.) You did not have to.'],['hitmeuppp','yeah. i did.'],
 ['K9','I am aware. I will not cash it. You may consider that my half of the argument.'],
   ['hitmeuppp',MV('ur so fucking weird','you’re so weird. cash it or i’m egging your car.','You’re so strange. Fine, don’t cash it, see if I care. I’m still not in debt to you.','You’re impossible. I paid, it’s on your counter, we’re square, and what you do with the envelope is your own stupid business. ...Thanks for not fighting me on it.')]],done)}},
  {t:'Let it stand. Just this once.',sub:'+affection · now you owe him',fn:()=>{S.f.rentLet=1;apply({aff:4,edge:2});save();say([
   ['hitmeuppp','(text) march. i saw. i’m letting it go ONCE. make it a thing and i’ll kill u.'],
   ['K9','It is not a thing.'],['K9','(Eleven minutes later.) It is a small thing.'],
   ['','She sits on the step of the trailer until the mosquitoes find her, watching the strawberry magnet hold up a receipt with someone else’s money on it.']],done)}}]))},
/* the hallway: someone cleaned up after V, and wants him to know it */
{id:'sub_hallway',when:()=>S.phase==='after'&&!S.f.selfEscape&&S.day>=(S.f.returnDay||0)+1,run:done=>say([
 ['','Late. Kitchen. Ronin is at the counter eating V’s cereal out of the box, and that is how V learns he’s in the house.'],
 [RN,'Evenin’, Vee. Your cereal’s shit.'],['K9','How did you get in.'],[RN,'Same way you got into that warehouse. ’Cept I didn’t leave a fuckin’ mess.'],
 [RN,'Went by the river Tuesday. Tidied up after you. You’re welcome, by the way.'],
 ['K9','I did not ask you to.'],
 [RN,'Nah. You didn’t ask anybody shit. Guy who calls the cops on jaywalkers, and he didn’t call a single fuckin’ soul. I about pissed myself laughin’.'],
 ['K9','Then why are you here.'],
 [RN,'Wanted to see your face. First one, you’re either up all night pukin’ or you sleep like a baby. So which kinda freak are you, Vee?'],
 ['K9','I slept.'],
 [RN,'Ha! Fuckin’ knew it. Welcome to the club. Buy better cereal.'],
 isM()&&S.pov!=='v'?['','(From the hallway, you hear all of it. You go back to bed before either of them sees you. You don’t sleep.)']:null].filter(Boolean),()=>{S.f.ronHall=1;fr('r',3);if(typeof relApply==='function')relApply({rivalry:-6});save();done()})},
/* what she said in the room: Angel doesn't know */
{id:'sub_angel',when:()=>S.phase==='after'&&isM()&&S.pov!=='v'&&S.leaks>=1&&frT('a')>=0,run:done=>say([
 [AN,'face mask night. i brought the cucumber ones and the ones that look like a panda. you’re the panda. argue and i hold you down.'],
 ['','Angel is on the trailer floor talking about her new building. She moved because someone came to the old one asking for “the vlogger from the server,” and they knew to ask because of something you said under the bulb.'],
 [AN,'you’re quiet. you’re never quiet. i don’t like it. say something foul about my eyebrows.'],
 ['hitmeuppp','...ur eyebrows are fine.'],
 [AN,'fine?? okay, who do i have to kill.']],
 ()=>ask('hitmeuppp','(Angel’s holding a panda face mask out to you.)',[
  {t:'Tell her what you said in that room.',sub:'it will hurt · she deserves it',fn:()=>{S.f.toldAngel=1;fr('a',2);apply({edge:-2});save();say([
   ['hitmeuppp','ok. fuck. one: they found ur building because of me. two: i said “the vlogger.” that’s all i said, i thought it was nothing. three: it totally wasn’t nothing.'],
   ['','Angel’s hands stop. She takes long enough that you start getting up to leave your own trailer. Then she grabs your wrist, the good one.'],
   [AN,'you were in a ROOM, misaki. with a bulb and men. so one of them came to my door. good. saves me the hunting. stop making that face, i’m not letting you be noble at me.'],
   [AN,'...also you’re still the panda.']],done)}},
  {t:'Put the mask on. Say nothing.',sub:'keep it to yourself · you’ll carry it',fn:()=>{S.f.toldAngel=0;S.f.angelSecret=1;apply({edge:3});save();say([
   ['','You put on the panda. Angel laughs so hard she has to lie down. You take a photo of yourselves for the group chat. You look happy in it.'],
   ['','When she’s gone, you look at the photo until the screen dims. (You look happy in it. Fuck.)']],done)}}]))},
/* the coat: V's side */
{id:'sub_coat',when:()=>S.phase==='after'&&isV()&&S.day>=(S.f.returnDay||0)+1,run:done=>say([
 ['','The brown coat hangs on the back of the archive door, still smelling of the river. He has walked past it nineteen times today. He counted.'],
 ['K9','(It is only a coat. My father bought it for me when I was twenty. I have worn it to every board meeting, every shelter opening, every night as K9.)'],
 ['K9','(And to the river.)']],
 ()=>ask('K9','(What does he do with the coat?)',[
  {t:'Have it cleaned. Keep wearing it.',sub:'it is only a coat',fn:()=>{S.f.coatKept=1;save();say([['','The dry cleaner does not ask. It comes back smelling of nothing, on a wire hanger, in plastic. He puts it on. It fits exactly the way it always did. He decides that is reassuring.']],done)}},
  {t:'Fold it into a drawer in the archive.',sub:'he can’t wear it again',fn:()=>{S.f.coatKept=0;apply({heart:3});save();say([['','He folds it the way his mother folded flags, corners in, and lays it in an empty drawer between two files of people he got out. He labels the drawer. The label says: “Not again.”']],done)}}]))});
/* how the threads end up, on the ending screen */
function subEnd(){const L=[];if(!S||!S.f)return L;
 if(S.f.rentBack)L.push('The envelope for March is still in V’s kitchen drawer, unopened. He tells himself he will cash it. He never does. She knows. She lets him have that one.');
 else if(S.f.rentLet)L.push('He paid three months of her rent once. She never mentions it. Every month since, she pays the landlord herself, in person, early, with biscuits.');
 if(S.f.toldAngel===1)L.push('Angel never once brings up the building. She does, now and then, call Misaki “the panda” in front of strangers, and refuses to explain.');
 else if(S.f.angelSecret)L.push('Misaki never tells Angel what she said in that room. Some nights it sits on her chest like a cat, and she tells it to fuck off, and it doesn’t.');
 if(S.f.ronHall)L.push('Ronin and V never talk about the river again. Ronin still turns up unannounced and still says the cereal is shit. V has started leaving it out.');
 if(S.f.coatKept===0)L.push('The drawer marked “Not again” stays shut.');else if(S.f.coatKept===1)L.push('He still wears the brown coat. Most days he doesn’t think about the river.');
 return L}
const _xeSub=extraEnding;extraEnding=function(){return _xeSub().concat(subEnd())};
