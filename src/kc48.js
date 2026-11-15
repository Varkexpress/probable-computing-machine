/* ===================== WHAT SHE HID (kc48) =====================
   Secrets that only exist in the worst stays (infirmary severity 6+, so two extra days). While she still thinks it
   is a cell, two extra spots appear on her side: behind the towel (a plan in toothpaste) and under the mattress (a
   stash, and a note to the real V). Afterwards, in both POVs, the stash is found. */
const kdWorstStay=()=>{const m=S&&S.kd&&S.kd.med;return !!(m&&m.sev>=6&&kdClar()<2)};
ROOMS.medbay.spots.push(
 {at:[196,140],mark:[210,40],label:'Behind the towel',show:()=>kdWorstStay(),act:()=>{const m=S.kd.med;m.plan=(m.plan||0)+1;save();
  say([['','You lift the corner of the towel. On the mirror behind it, in toothpaste, so they can wipe it off if they find it and never know, is the room.'],
   ['','The door. The bed. The tall one’s chair, outside. His times: in at seven, soup at twelve, reading at nine, a long one, an hour. An X where he sits. An arrow from the bed to the X. A number: four steps.'],
   m.plan>1?['','You add today’s times under yesterday’s. They are the same. He is very regular. That will be what kills him.']:['','You don’t remember drawing it. It is in your writing. It must have been the first night.'],
   ['hitmeuppp',MV('(nine o’clock.)','(nine o’clock. the long one. four steps.)','(Nine. The long reading. Four steps.)','(Nine o’clock, when he reads. He gets lost in it. Four steps and the drip needle. He kneels so his throat’s lower than mine. He makes it so easy. Why does he make it so easy.)')]])}},
 {at:[64,140],mark:[64,110],label:'Under the mattress',show:()=>kdWorstStay(),act:()=>{const m=S.kd.med;m.stash=1;save();
  say([['','Under the mattress, in the slats, where you kept the screw last time:'],
   ['','The spoon, its handle worked to an edge on the bed frame. Four white tablets you didn’t swallow. The rounded scissors, which are no good, and which you keep anyway.'],
   ['','And a soup label, folded small, with writing on the back in biro. Your writing. You don’t remember writing it.'],
   ['','“V — if this is how you find out: i didn’t tell them anything about you. not your name, not the hounds, not the house. i was good. i was so good. — M”'],
   ['hitmeuppp',MV('(...)','(i wrote that for when i’m dead.)','(I wrote it for after. For whoever finds me.)','(I wrote it for after. For when he finds the body. I wrote a letter to the one person in the world I wanted, and put it under the mattress in his house, to be found by him, and I don’t know that.)')],
   ['','You put it back exactly how it was. The tall one must never see it.']])}});
/* afterwards: the stash is found */
kdEv('kd_stash',()=>kdD()>=1&&S.kd&&S.kd.sev0>=6&&!S.f.kdStash,done=>{S.f.kdStash=1;save();const m=S.pov!=='v';
 say(m?[['','You remember the mattress at four in the morning, all at once, and go down to sublevel two in the dark.'],
   ['','The bed has been stripped. The slats are bare. The spoon, the tablets, the scissors and the label are gone. On the mirror, the toothpaste has been wiped off, and wiped carefully, corner to corner.'],
   ['','Upstairs, on your pillow, there is a soup label, folded small. Under your writing, in fountain pen:'],
   ['','“I know. You were. — V”'],
   ['hitmeuppp',MV('(...)','(he read it.)','(He read it. He read all of it.)','(He found the plan too. He’ll have seen the X. He’ll have seen the number of steps to where he sits. He wiped it off himself, corner to corner, and wrote back to the letter and not to the plan.)')],
   ['','You keep the label in your phone case. You never mention the plan. Neither does he.']]:[
   ['','He strips the infirmary bed himself, after. Under the mattress, in the slats: a spoon worked to an edge, four tablets, the rounded scissors, and a soup label folded small.'],
   ['','“V — if this is how you find out: i didn’t tell them anything about you. not your name, not the hounds, not the house. i was good. i was so good. — M”'],
   ['','Then he lifts the towel off the mirror. In toothpaste: his own times, in, soup, reading. An X where he sits. Four steps.'],
   ['K9','(She wrote the letter to me, and the plan for me. She did not know they were for the same man.)'],
   ['','He wipes the mirror, corner to corner, until there is nothing on it. He writes four words under her letter and puts it on her pillow. He keeps the spoon.']],()=>{apply({aff:4});calm(-3);done()})});
/* record the severity at discharge so the stash scene knows it was a worst stay */
const _mmKD48=kdMedMorning;kdMedMorning=function(done){const m=S.kd&&S.kd.med;if(m)S.kd.sev0=m.sev||0;return _mmKD48(done)};
if(typeof KD_ORDER!=='undefined'){const i=KD_ORDER.indexOf('kd_count');KD_ORDER.splice(i<0?0:i,0,'kd_stash')}
const _xeKD48=extraEnding;extraEnding=function(){const L=_xeKD48();if(S&&S.f&&S.f.kdStash)L.push('Misaki keeps a soup label in the back of her phone case: a letter to V, and his four-word answer. V keeps a spoon worked to an edge in his desk drawer. Neither of them has mentioned the toothpaste.');return L};
