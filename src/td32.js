/* ===================== WHAT WAS DONE WITH CARE (td32) =====================
   The medical side of the missing hours. The evidence on her body is not that of a beating. Somebody in that building
   could suture, dose on a schedule, and keep a chart. She was being kept well for the buyer, and nobody will ever know
   for what. The rules of td29 hold: nothing is named, the honest option is greyed (KD_NO), each pretence is a
   kdDeny(). Second half: her treatment in V's infirmary, which has to be done without sedation because she reacts. */
const kdDoc='The doctor';
kdEv2('kd_sutures',1,()=>S.f.kdCount,done=>{const m=kdMe();say([
 ['',m?'The doctor takes the stitches out of her scalp. Fourteen, and she counts each one going into the dish.':'The doctor takes the stitches out of her scalp, fourteen of them, and then asks him to step round to the other side of the bed.'],
 ['','There are nine more in her back, low down on the left. The doctor did not put those in. The thread is finer than hers, the spacing is exact, and they are a week further along than anything else on her.'],
 [kdDoc,'Somebody closed this properly. A surgeon’s knot, buried. Whoever did it does it for a living.'],
 ['hitmeuppp',MV('nice of them.','huh. they patched me up. nice of them.','So they patched me up. That’s decent of them.','So one of them could sew. Good for him. Free stitches. I’ve paid for worse.')]],()=>ask(m?'hitmeuppp':'K9',m?'(Nine. Neater than the fourteen.)':'(The doctor is looking at him, not at her.)',m?[
  KD_NO('Ask what they closed.'),
  {t:'“leave them in. they’re good work.”',fn:()=>{kdDeny();S.f.kdNine='in';save();say([[kdDoc,'They dissolve. They will go by themselves.'],['hitmeuppp','(even better. no evidence.)']],done)}},
  {t:'“can u take a photo. for angel.”',fn:()=>{kdDeny();S.f.kdNine='photo';save();say([['','The doctor takes the photograph. Misaki looks at it for the length of time it takes to send, tells her it’s a tidy job, and never opens the picture again.']],done)}}]:[
  {t:'“What did they close?”',fn:()=>{S.f.kdNine='asked';apply({veng:6});save();say([[kdDoc,'I cannot tell from outside. I would have to open it to see, and she will not let me.'],['hitmeuppp',MV('it’s fine.','it’s FINE. it’s closed. closed is good.','It’s closed. Closed is the good outcome.','It’s closed, it’s healing, it’s the best stitching on me. Nobody’s opening it to have a look, I’m not a present.')]],done)}},
  {t:'Say nothing. Hold the dish.',fn:()=>{kdDeny();save();say([['','He holds the dish. Fourteen stitches go into it. Nobody mentions the nine again, and he can feel exactly where they are whenever she turns her back.']],done)}}]))});
kdEv2('kd_xray',2,()=>S.f.kd_sutures,done=>{const m=kdMe();say([
 ['','The films go up on the lightbox in the infirmary. The hand, with its two pins. Three ribs, knitting. The foot.'],
 ['','And on the fourth film, under the nine stitches, there are three small bright staples in a row, each the size of a grain of rice. They are surgical clips. They are what is left behind when somebody ties something off inside a person.'],
 [kdDoc,'They went in for something, and they were tidy coming out.'],
 ['hitmeuppp',MV('free piercings.','lol. free piercings. on the inside.','Free piercings. On the inside. Very niche.','Three little staples. I’m like a pamphlet. Do they set off airports? Tell me they set off airports.')]],()=>ask(m?'hitmeuppp':'K9',m?'(Three. In a row.)':'(She is making jokes at a lightbox.)',m?[
  KD_NO('Let the doctor open it and look.'),
  {t:'“do they come out”',fn:()=>{kdDeny();save();say([[kdDoc,'Not without my going in to see what they are holding shut.'],['hitmeuppp',MV('then no.','then they stay. finders keepers.','Then they stay. Finders keepers.','Then they stay. Whatever they’re holding shut can stay shut. That’s what shut is for.')]],done)}},
  {t:'Turn the lightbox off.',fn:()=>{kdDeny();calm(-3);say([['','She turns it off. The clips stay on the inside of her eyelids for a while, three in a row.']],done)}}]:[
  {t:'Keep the film. File it.',fn:()=>{kdDeny();apply({veng:5});say([['','He files it under M. He has opened people himself, and knows what it takes to tie off inside one and close in nine stitches: a table, a light, an assistant, and an hour.'],['K9','(They had an hour with her that she has never asked about.)']],done)}},
  {t:'Ask the doctor what clips like that are for.',fn:()=>{apply({veng:7,heart:-2});S.f.kdClipsKnown=1;save();say([[kdDoc,'A vessel. A duct. You clip what you have cut so that it does not bleed. I cannot tell you more from a film.'],['','He thanks her. He stands at the lightbox after she has gone until the film has stopped meaning anything.']],done)}}]))});
kdEv2('kd_blood',3,()=>S.f.kdCard,done=>{const m=kdMe();say([
 ['','The laboratory sends back four lines. The sedative, which she reacts to. An antibiotic, started on the first day. A drug that keeps blood from clotting.'],
 ['','The fourth line says “unidentified, sample forwarded,” and has a telephone number in Osaka beside it.'],
 [kdDoc,'She was being dosed on a schedule. An antibiotic before they needed one. That is preparation. Nobody does that for someone they mean to throw away.'],
 ['hitmeuppp',MV('so they liked me.','aw. they were looking after me.','So they were looking after me. Sweet.','So I had better healthcare in that warehouse than I’ve had in my whole life. Typical. I finally get a doctor and he’s theirs.')]],()=>ask(m?'hitmeuppp':'K9',m?'(Preparation. For Friday.)':'(“The buyer comes Friday.”)',m?[
  KD_NO('Ask what you prepare a person for.'),
  {t:'“what’s the osaka one”',fn:()=>{kdDeny();S.f.kdOsaka=1;save();say([[kdDoc,'I will know in three weeks.'],['hitmeuppp',MV('don’t tell me.','cool. don’t tell me.','Good. Don’t tell me when you do.','Great. When they ring back, tell him and not me. I’ve got enough hobbies.')]],done)}},
  {t:'Fold the page into a crane.',fn:()=>{kdDeny();calm(2);say([['','It takes her nine minutes with one hand. It is a bad crane. She puts it on the drip stand, where it stays for a month.']],done)}}]:[
  {t:'Ring Osaka.',fn:()=>{S.f.kdOsaka=2;apply({veng:6});save();say([['','They will know in three weeks. He gives them his private number and tells them to ring him and nobody else.']],done)}},
  {t:'Put the page with the others.',fn:()=>{kdDeny();save();say([['','There is a folder now. It is thicker than her whole life on paper before the age of twenty-one.']],done)}}]))});
kdEv2('kd_light',3,()=>S.f.kdHas||S.f.kd_xray,done=>{const m=kdMe();if(!m)return say([
  ['','She will not sit under the lamp over the kitchen island. It is round, with six bulbs. She has eaten under it for a year, and now she takes her bowl to the stairs.'],
  ['K9','(I have a lamp like that over my own table downstairs. I know what one is for.)']],()=>ask('K9','(Six bulbs.)',[
   {t:'Change the fitting. Say nothing.',fn:()=>{kdDeny();apply({aff:3});say([['','By the evening there is a paper shade over the island, and it is not round. She eats at the island and doesn’t remark on it.']],done)}},
   {t:'Eat on the stairs with her.',fn:()=>{kdDeny();apply({aff:2});say([['','They eat on the stairs. The dogs think it is the best idea anyone in the house has had.']],done)}}]));
 say([['','She has more than a ceiling. There was a lamp in the second room: round, with six bulbs in it, on an arm. It was cold under her back. A pleasant voice counted backwards from ten, and she helped with seven and six, to be polite.'],
  ['hitmeuppp',MV('(dentist.)','(that’s a dentist. i’m remembering a dentist.)','(That’s a dentist’s. I’m thinking of a dentist.)','(That’s from a dentist. Everyone’s got a dentist memory. I’ve never been to a dentist. So it’s from TV.)')]],()=>ask('hitmeuppp','(Six bulbs, on an arm.)',[
   KD_NO('Tell V about the lamp.'),
   {t:'Decide it was a dentist.',fn:()=>{kdDeny();save();say([['','She decides. It holds as long as she doesn’t count the bulbs, and she can’t stop counting them.']],done)}},
   {t:'Stop eating at the kitchen island.',fn:()=>{kdDeny();calm(-2);save();say([['','His kitchen lamp is round and has six bulbs. She takes her bowl to the stairs and says the stools hurt her back.']],done)}}]))});
kdEv2('kd_weight',4,()=>S.f.kd_sutures,done=>{const m=kdMe();say([
 ['','When the cast is changed there is writing on the inside of her forearm, in marker, half washed off: “52.4” and a date, the second day.'],
 ['',m?'Somebody weighed her and wrote it on her, where it would not get lost.':'Somebody weighed her and wrote it on her. V has done exactly that, in that marker, to things on his own table, so that the portions come out even.'],
 ['hitmeuppp',MV('rude.','rude. i was 54 going in.','Rude. I was fifty-four going in.','Fifty-two point four. I was fifty-four when I went in, so that’s their scales. Cheap scales.')]],()=>ask(m?'hitmeuppp':'K9',m?'(A weight, and a date.)':'(He knows that handwriting’s purpose.)',m?[
  KD_NO('Ask who weighs a person, and for what.'),
  {t:'Scrub it off.',fn:()=>{kdDeny();save();say([['','It takes the skin with it before it takes the ink. She keeps going until the doctor takes the cloth away from her.']],done)}},
  {t:'“leave it. it’s like a concert stamp.”',fn:()=>{kdDeny();calm(-2);save();say([['','The new cast goes on over it. She knows it is under there. Some nights that arm feels as though it belonged to a shop.']],done)}}]:[
  {t:'Clean it off for her, gently.',fn:()=>{apply({aff:3,heart:2});say([['','He uses surgical spirit and cotton, and goes slowly enough that the skin stays. She watches the numbers go.'],['hitmeuppp',MV('thx.','thanks. u do that like u’ve done it before.','Thanks. You’ve done that before.','Thanks. You’re weirdly good at that. Don’t tell me why you’re good at that.')],['K9','I will not tell you.']],done)}},
  {t:'Go and look at his own marker pens.',fn:()=>{apply({heart:-3,veng:5});say([['','He goes downstairs to the metal table and throws away every marker in the drawer. He orders a different brand. It does not help in any way.']],done)}}]))});
kdEv2('kd_teeth',5,()=>S.f.kd_sutures,done=>{const m=kdMe();say([
 ['','The dentist comes to the house for the two molars. She has been telling people a man punched them out, and that she bit him first.'],
 ['Dentist','Nobody punched these out. The sockets are clean and the bone is not broken. They were taken out with forceps, by somebody trained, one at a time.'],
 ['','The dentist does not say why anyone would. The two that were taken had the fillings she got at fifteen: the only dental record with her name on it.'],
 ['hitmeuppp',MV('tooth fairy owes me.','tooth fairy owes me double then.','Then the tooth fairy owes me for two.','So I got a free extraction. Two. I’ve been putting that off for years. Somebody did me a favour, honestly.')]],()=>{kdDeny();if(!m)apply({veng:5});done()})});
kdEv('kd_obs',()=>kdD()>=2&&!S.f.kd_obs&&S.f.kdBook&&S.f.kd_xray,done=>{S.f.kd_obs=1;save();const read=['read','v','vsolo'].includes(S.f.kdBook);say(read?[
 ['','The notebook again. Beside each quarter-hour, to the left of what she said, there are four narrow columns of figures that nobody has looked at.'],
 ['','Pulse. Pressure. Breaths. The fourth column runs from 1 to 4 and is headed “depth.”'],
 [kdDoc,'This is an anaesthetic record. He was not taking notes on her. He was keeping her under, and keeping her alive while somebody else worked.'],
 ['hitmeuppp',MV('so he’s a nurse.','so the note guy’s like. a nurse. cool.','So the note-taker’s a nurse. Good for him.','So he wasn’t even listening to me. He was watching a dial. I said all that and I was the radio.')]]:[
 [kdDoc,'I will say this once. That sedative should have killed her at the doses in her blood. It did not, so somebody sat beside her and managed her breathing, for hours, more than once.'],
 [kdDoc,'There was a trained person in that room. Whatever was in the notebook, it was not only what she said.'],
 ['hitmeuppp',MV('good thing we burned it.','well. good thing it’s ash.','Then it’s a good thing it’s ash.','Then it’s a good thing it’s ash, isn’t it. I don’t want my blood pressure getting out.')]],()=>{kdDeny();apply({veng:4});const x=(S.list||[]).find(x=>x.id==='notes');if(x&&!x.st)x.d='He kept her under and kept her breathing while somebody else worked. He wrote it all down in four columns.';save();done()})});

/* ---------- treatment, awake ---------- */
kdEv('kd_pins',()=>S.phase==='after'&&kdD()>=4&&!S.f.kd_pins,done=>{S.f.kd_pins=1;save();const m=kdMe();
 const after=ok=>say([['',ok?'Both pins come out. She has talked the whole way through, about a pigeon she knows, and has not moved the hand a millimetre.':'The first pin comes out. She stops in the middle of a sentence about a pigeon and puts her head down on the pillow, very neatly.'],
   ['hitmeuppp',ok?MV('ez.','easy. didn’t feel it.','Easy. Didn’t feel a thing.','Easy. Didn’t feel a thing. Can I keep them? I’m keeping them.'):MV('took a nap.','sorry. took a nap. long week.','Sorry. I took a little nap.','I didn’t faint. I took a nap. It was boring and I took a nap, write that down.')],
   ['',m?'V’s hand, the one she was holding, has four white marks across the back of it that take an hour to go.':'She was holding his hand. There are four white marks across the back of it, and he would not have asked her to let go for anything.']],()=>{if(ok){calm(3);if(S.kd.shake>0)S.kd.shake--}else{calm(-3);apply({energy:-15})}kdDeny();done()});
 say([['','The pins come out today. There is a pair of pliers for it. There is no sedation, because of how she reacts, and the local only does the skin.'],
  [kdDoc,'I need the hand flat and still for about two minutes. You may shout. You may not move.'],
  ['hitmeuppp',MV('k.','k. i’m good at still.','Fine. I’m good at keeping still.','Two minutes. I’ve held a scope on a man for six hours. Go on, I’ll tell you about a pigeon.')]],()=>m?kdHoldOn(after,{bg:kdDrawMed,title:'The pins',hint:'hold E to keep the hand still',len:420,lines:['Tell her about the pigeon.','It had one foot. It did fine.','Don’t look at the pliers.','Nearly. Keep talking.']}):ask('K9','(She has held out her other hand without looking at him.)',[
   {t:'Take it. Do not let go.',fn:()=>after(true)},{t:'Stand at the foot of the bed.',fn:()=>after(false)}]))});
kdEv2('kd_wrists',2,()=>S.phase==='after',done=>{const m=kdMe();say([
 ['','The wrist dressings are changed every morning. The cable ties went in a long way. On the left one there is a pale cord at the bottom of it that moves when she moves her thumb.'],
 ['hitmeuppp',MV('whoa.','whoa. u can see the string.','You can see the string that does my thumb. Look.','Look at that. That’s the string that works my thumb. I’m a puppet. Angel, come and look, I’m a puppet.')],
 [AN,m?'i’m good. i’m just going to. stand over here. by the window. and look at the window.':'(from the corridor) i’m good out here. i love this corridor.'],
 ['',m?'She moves the thumb for the doctor on request, four times, and watches it work with real interest. It doesn’t occur to her that this ought to hurt.':'She moves the thumb on request and watches the cord slide, pleased with it. V finds he is holding the bed rail and lets go of it.']],()=>{kdDeny();done()})});
/* the only table in the house */
kdEv2('kd_vtable',3,()=>S.pov==='v'&&S.phase==='after',done=>say([
 ['','The doctor needed a steel surface, a drain and a strong light to redo the hand. There is one in the house. It is his, downstairs, and he has taken a great many people apart on it.'],
 ['','He scrubbed it for an hour and changed the bulbs. She was on it for six. She was awake for most of that, and told the doctor about a pigeon.'],
 ['hitmeuppp',MV('where’d they fix my hand.','where’d the doc do my hand btw. the room was cold.','Where did the doctor do my hand? The room was cold.','Where did she do the hand, by the way? It was freezing, and there was a drain in the floor. Is that the dog-washing room?')]],()=>ask('K9','(She thinks it was the dog-washing room.)',[
  {t:'“Yes. The dog-washing room.”',fn:()=>{kdDeny();apply({heart:-2});S.f.kdTable='lie';save();say([['hitmeuppp',MV('knew it.','knew it. smelled like dog.','I knew it. It smelled of dog.','Knew it. It smelled of dog and bleach. Tell Biscuit I borrowed her table.')],['','It smelled of bleach because of what he had spent the hour getting out of the grooves.']],done)}},
  {t:'“It was my table. The one I work at.”',fn:()=>{apply({aff:2});S.f.kdTable='told';save();say([['','She thinks about that.'],['hitmeuppp',MV('...ok.','huh. ok. it’s a good table.','Huh. Well. It’s a good table.','Huh. So I’m the only one who ever got up off it. That’s— I’m choosing to find that romantic. Don’t say anything.')]],done)}}])));
/* the cabinet in the infirmary */
ROOMS.medbay.spots.push({at:[40,160],mark:[40,150],label:'Steel cabinet',show:()=>kdClar()<2,act:()=>say([['','A steel cabinet with glass doors. There are instruments in it, laid out in rows on green cloth.'],['hitmeuppp','(of course there’s instruments. there’s always a room with instruments. i know this one. i know what the green cloth is for.)'],['','She notices that she knows, and decides not to have noticed.']])},
 {at:[40,160],mark:[40,150],label:'Supply cabinet',show:()=>kdClar()>=2,act:()=>say([['','Every shelf is labelled in fountain pen. Most of the labels say things like “BISCUIT — 40 kg” and “PANCAKE — ears.”'],['','On the top shelf the word DOGS has been crossed out and “MISAKI — see card. NO sedatives.” written under it. Half of what is in her drip was bought for a mastiff.'],['hitmeuppp',MV('lol.','i’m on dog medicine. LMAO.','I’m on dog medicine. Fantastic.','I’m being treated out of the dog cupboard. I’ve never felt so included.')]])});
/* phone */
txDef('tx_kd_lab',{with:'v',pov:'m',prio:2,when:()=>kdPost()&&S.f.kdOsaka===1&&kdD()>=6,nodes:{
 start:{in:()=>['Osaka has rung back about the fourth line.','You told the doctor not to tell you. I am asking whether that still holds.'],expire:3,
  opts:()=>[{t:'“still holds”',fx:()=>kdDeny(),reply:()=>['Very well.','It is in the folder. The folder is in the archive, under M.']},
   {t:'“is it gonna kill me”',fx:()=>{kdDeny();apply({aff:2})},reply:()=>['No.','That is the whole of what I will say unless you ask for the rest.','(she doesn’t ask for the rest)']},
   {t:'“did it work. whatever it was for”',fx:()=>{apply({aff:3});calm(-4);S.f.kdAskedOnce=1},reply:()=>['I do not know what it was for. Neither does Osaka.','They know what it is. They do not know why anyone would give it to a person.','That is the first question you have asked. I have written the date down.']}]}}});
txDef('tx_kd_awell',{with:'a',pov:'v',prio:2,when:()=>kdPost()&&S.f.kd_blood&&frT('a')>=1,nodes:{
 start:{in:()=>['ok i’ve been good. i haven’t asked her anything','so i’m asking u. what did they DO'],expire:3,
  opts:()=>[{t:'“They kept her well.”',reply:()=>['...','that’s worse','V that’s so much worse'],next:'two'},
   {t:'“I do not know. Nor does she.”',reply:()=>['she knows some of it','she said a thing at dinner. u heard it'],next:'two'}]},
 two:{in:()=>['who keeps somebody well'],
  opts:()=>[{t:'“Someone who is selling them.”',fx:()=>{apply({veng:5});fr('a',2)},reply:()=>['(nothing for a while)','ok','i’m going hunting tonight. don’t wait up. tell her i’m at a brand dinner']},
   {t:'“I would rather not write it down.”',fx:()=>fr('a',1),reply:()=>['yeah','yeah. ok','i’m bringing the big palette tomorrow. she’s getting the works']}]}}});
const _xeKD6=extraEnding;extraEnding=function(){const L=_xeKD6();if(!S||!S.f||!S.kd||!S.kd.t0)return L;const f=S.f;
 if(f.kd_xray)L.push('There are three surgical clips under her left shoulder blade and nine dissolved stitches over them. Nobody has ever opened it to see what they are holding shut. She calls them her piercings.');
 if(f.kdTable==='told')L.push('She knows whose table her hand was mended on. She is the only one who ever got up off it.');
 return L};
