/* ===================== WHAT SHE KEEPS (kc61) =====================
   More of the infirmary on sublevel two, sadder: what she has lost and is trying to keep, the distance between how hurt
   she is and how little of it she lets herself notice, V on the other side of the door unable to reach her, and the
   small household things. Both POVs, both aftermath settings.
   - Misaki, spots in the medbay: the drawer (her things from her pockets; while she believes it is a cell she hides
     the rent receipt in her cast), the hair tie, the things he leaves by the door, and (full story only) the camera bag.
   - Misaki, once a day in the afternoon, by band: clear (the cactus alarm, her teeth: split by setting), extended
     delusion (the mug with the chip, the lot number), worst route (bread under the door for the hound, Angel's polish).
   - Misaki, right after the morning shatter: the soup tubs in the bin.
   - V, side menu while she is in the infirmary: her things from the river (three), her file (split by setting), and
     asking what she needs. V, once a day by band: clear (did you eat today; the receipt and the rent), extended (the
     mug), worst (the bread on his side of the door).
   - After discharge (aftermath order): the first evening upstairs (the cereal), and the rent.
   Nothing here names what happened in the hours she cannot remember, and nothing shows a method. */
const k61Med=()=>!!(typeof kdMed==='function'&&kdMed());
const k61M=()=>!!(typeof kdMedM==='function'&&kdMedM());
const k61Worst=()=>!!(typeof kdWorstOf==='function'&&kdWorstOf());
const k61WR=()=>!!(typeof kdWR==='function'&&kdWR());
const k61SA=()=>typeof kdSA!=='function'||kdSA();
const k61N=n=>['none','one','two','three','four','five','six','seven','eight','nine','ten','eleven'][Math.max(0,Math.min(11,n))];
const k61Cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

/* ---------- Misaki: the drawer ---------- */
ROOMS.medbay.spots.push({at:[24,150],mark:[24,140],label:'A drawer',show:()=>k61M()&&kdClar()<2&&!S.f.k61Rcpt,act:()=>{S.f.k61Rcpt='cast';save();say([
 ['','There is a metal drawer under the cot. Somebody has put your things in it, in a clear bag with a label: the trailer key on its rubber frog, a lip balm with no lid, two hair ties, and the rent receipt from your back pocket, gone soft as cloth. The red stamp still says PAID.'],
 ['hitmeuppp',MV('(they went thru my pockets.)','(they went through my pockets. they’ve got my RECEIPT.)','(They went through my pockets. They’ve got my rent receipt.)','(They went through my pockets and bagged it all up like evidence. The receipt too. I paid that. That receipt is the only thing in here that says I live somewhere.)')],
 ['','You fold the receipt very small and push it down inside the cast, against your wrist, where they won’t think to look. It itches straight away. You leave the key; they know where you live anyway.']])}});
ROOMS.medbay.spots.push({at:[24,150],mark:[24,140],label:'The drawer',show:()=>k61M()&&kdClar()>=2,act:()=>{
 if(S.f.k61Rcpt==='cast')return say([['','The bag is still in the drawer, with the key on its frog. The receipt is still inside your cast. You can feel the fold of it every time you bend your wrist.'],
  ['hitmeuppp',MV('(leaving it.)','(could take it out. leaving it.)','(I could take it out now. I’m leaving it where it is.)','(It’s his drawer. It was always his drawer. I could take the receipt out and put it back in the bag. I’m leaving it in the cast. It’s fine where it is.)')]]);
 if(S.f.k61Rcpt)return say([['hitmeuppp',MV('(rent’s paid.)','(rent’s paid til the 1st.)','(Rent’s paid until the first.)','(Rent’s paid until the first. I’ve checked four times. It’s still paid.)')]]);
 S.f.k61Rcpt='book';save();say([
 ['','In the drawer under the bed there is a clear bag with your name on it in fountain pen: the trailer key on its rubber frog, a lip balm with no lid, two hair ties, and his tax history.'],
 ['','Pressed flat in chapter six is your rent receipt. It has been dried out and flattened under something heavy, and the landlord’s red PAID has run pink at the edges.'],
 ['hitmeuppp',MV('(he kept my receipt.)','(he dried my receipt. in a BOOK.)','(He dried my receipt out in a book, under a chapter about land tax.)','(He pressed my rent receipt like a flower. In chapter six. He must have found it in my jeans and sat there doing that while I was down here thinking he was one of them.)')],
 ['','You read the date three times. The rent’s paid to the end of the month. You lie there working out whether you’ll be out by then, and whether the lot office will take a signature from your right hand. You do the sum twice. You don’t look at the left hand, which is the reason for the sum.']])}});

/* ---------- Misaki: the hair tie ---------- */
ROOMS.medbay.spots.push({at:[100,170],mark:[100,160],label:'Hair tie',show:()=>k61M()&&kdClar()>=2,act:()=>{
 if(S.f.k61Hair)return say([['hitmeuppp',S.f.k61Hair==='v'?MV('(still up.)','(still up. too tight. not touching it.)','(It’s still up. Too tight. I’m not touching it.)','(It’s still up, too tight, and I’m not touching it. He did it like a stitch.)'):MV('(it’s just hair.)','(it’s just hair.)','(It’s just hair.)','(It’s just hair. Everybody has hair in their face sometimes.)')]]);
 ask('hitmeuppp','(Your hair is in your eyes. You have put it up before every job for years, one twist and the tie, in two seconds, usually in the dark.)',[
  {t:'Do it one-handed.',fn:()=>{S.f.k61Hair='one';apply({energy:-6});calm(-2);save();say([
   ['','You get the twist. The tie is the problem. You try it with your teeth, and it snaps back against your lip, and the next go pulls at the stitches over your ear until your eyes water.'],
   ['','It takes forty minutes. In the end it is up, crooked, with a piece hanging over the stitches. You don’t take it down for two days, because you don’t know if you could do it again.'],
   ['hitmeuppp',MV('(done.)','(done. fine. it’s fine.)','(Done. It’s fine.)','(Done. It took forty minutes and it looks like I did it in a car, and it’s fine.)')]])}},
  {t:'Leave it down.',fn:()=>{S.f.k61Hair='down';save();say([
   ['','You leave it. It hangs in the soup. You keep pushing it back with the '+(S.f.k61Rcpt==='cast'?'cast, where the receipt is':'back of your right wrist')+', and it keeps coming down, and you keep pushing it back.']])}},
  {t:'Ask V. He’s the only one allowed behind you.',dis:tier()<2,sub:tier()<2?'you can’t make yourself':'',fn:()=>{S.f.k61Hair='v';apply({aff:2});calm(2);save();say([
   ['','He stands where you can see him in the mirror. He has never put up anybody’s hair in his life, and he does it the way he would tie off a suture, slowly and much too tight.'],
   ['','It pulls on the stitches. You don’t tell him, because he is concentrating so hard that he has forgotten to breathe.'],
   ['hitmeuppp',MV('...thx.','thanks. never touch my hair again.','Thank you. Never touch my hair again.','It’s perfect. Thank you. Never touch my hair again as long as you live.')],
   ['K9','Noted.']])}},
  {t:'Not now',fn:()=>{}}])}});

/* ---------- Misaki: what he leaves by the door ---------- */
ROOMS.medbay.spots.push({at:[262,170],mark:[262,160],label:'The things by the door',show:()=>k61M()&&kdClar()>=2&&(S.kd.med.d||0)>=1&&!S.f.k61Pile,act:()=>{say([
 ['','When you open the door a hand’s width, there is a pile on the corridor floor that was not there last night: your hoodie, the Switch, Prickles in his pot, the frog sock the pale hound didn’t eat, your rifle-cleaning kit in its tin, a box of your cereal and the pillow from your side of his bed.'],
 ['','Yesterday he asked through the door what you needed, and you said nothing, you were good. He has brought everything he could think of and gone away again, so that you won’t have to say thank you.']],()=>ask('hitmeuppp','(It’s all your stuff.)',[
  {t:'Take it all in.',fn:()=>{S.f.k61Pile='all';apply({aff:3});calm(3);save();say([['','It takes six trips in the boot. You line it all up along the wall in the order it was in the corridor, and put Prickles where the light-well lands at eleven.'],
   ['hitmeuppp',MV('(ok. ok.)','(ok. it’s my stuff. ok.)','(It’s my stuff. Okay.)','(It’s all my stuff. He carried my cactus down four floors. Okay. I’m sleeping on my own pillow.)')]])}},
  {t:'Take the cleaning kit. Only that.',fn:()=>{S.f.k61Pile='kit';calm(1);save();say([['','You take the tin and shut the door. You strip the kit down on the blanket and clean all of it, the rods and the brushes and the jag and the little bottle of oil, with your right hand and your teeth.'],
   ['','There is no rifle. You clean the kit anyway, for an hour, because your hands want a job they already know.'],
   ['','Later you hear him come back down the corridor and stop at the pile, and pick it up one piece at a time, and carry it away.']])}},
  {t:'Leave all of it there.',fn:()=>{S.f.k61Pile='none';save();say([['','You shut the door. In the morning the pile is still there. Somebody has turned Prickles so that his good side faces the door.']])}}]))}});

/* ---------- Misaki, full story only: the camera bag ---------- */
ROOMS.medbay.spots.push({at:[56,170],mark:[56,160],label:'A black bag on the chair',show:()=>k61M()&&kdClar()>=2&&k61SA()&&!S.f.k61Cam,act:()=>{say([
 ['','The doctor has left her black bag on the chair by the sink. A folding ruler sticks out of the side pocket, and there is a clip of small white cards, each with the same date written on it in her hand: the night you came in.'],
 ['','You have seen photographs with a ruler and a date in the corner before. They were never of anything good.']],()=>ask('hitmeuppp','(The bag.)',[
  KD_NO('Ask her what the photographs were for.'),
  {t:'Turn the chair to face the wall.',fn:()=>{S.f.k61Cam='chair';kdDeny();save();say([['','You turn the chair round so the bag faces the wall. Then you lie down facing the other way, and all afternoon you know exactly which way the bag is facing.'],
   ['hitmeuppp',MV('(clutter.)','(it’s clutter. i hate clutter.)','(It’s clutter. I don’t like clutter where I sleep.)','(It’s the doctor’s stuff, and it’s untidy, and I don’t like clutter in a room I’m sleeping in. That’s all it is.)')]])}},
  {t:'Tell V to move it. It’s untidy.',fn:()=>{S.f.k61Cam='v';kdDeny();save();say([['hitmeuppp',MV('her bag’s in the way.','the doctor left her bag. it’s in the way.','The doctor left her bag. It’s in the way.','The doctor left her bag on the chair. It’s really in the way, V. I can’t sleep with clutter, you know I can’t.')],
   ['K9','I will take it upstairs.'],
   ['','He comes in and picks it up without looking at it or at you, and carries it out by the handle, at arm’s length, the way he would carry something for a hound that has to go to the vet. Neither of you mentions the side pocket.']])}}]))}});

/* ---------- Misaki: one afternoon scene a day, by band ---------- */
const KD61_MC=[
 cb=>{say([['','At nine your phone goes off on the blanket, very loud: the alarm you set months ago. WATER PRICKLES (every other sun, NOT MORE).'],
   ['','You lie there and look at it. It is Sunday. Across the city a cactus on a trailer windowsill is due a quarter of a cup of water, and nobody is home to give it to him.'],
   ['hitmeuppp',MV('(prickles.)','(prickles. shit. it’s sunday.)','(Prickles. It’s Sunday. He’s due.)','(It’s Sunday and Prickles is due. That’s my job. I’m in charge of exactly one living thing, and it’s a cactus, and I’m in a basement with a broken hand.)')]],()=>ask('hitmeuppp','(The alarm.)',[
   {t:'Text V: “prickles is due”',fn:()=>{S.f.k61Prk='v';apply({aff:2});save();say([['','You text it to the man on the other side of the door. The answer comes after a minute.'],
     ['K9','I watered him last Sunday, a week early. I apologise. I did not know what else to do with him. He looks well. I have set an alarm.'],
     ['','You turn your alarm off. Then you turn it back on, because it is yours, and set it again for every other Sunday, and lie with the phone on your chest until the soup comes.']],cb)}},
   {t:'Snooze it.',fn:()=>{S.f.k61Prk='snooze';calm(-1);save();say([['','You snooze it. It goes off again at nine minutes past, and at eighteen minutes past, and every nine minutes after that, all morning.'],
     ['','You could turn it off with one thumb. You keep not turning it off.']],cb)}}]))},
 cb=>say(k61SA()?[
   ['','You run your tongue along your teeth while you eat the soup, the way you’d run a thumb along a blade. On the left, at the back, there is a gap where two teeth should be. The gum is sore and new.'],
   ['','You think about it for a second and decide it has always been like that. You chew on the right, like you always have.'],
   ['hitmeuppp',MV('(always been like that.)','(always been like that. i’d know.)','(It’s always been like that. I’d know. They’re my teeth.)','(It’s always been like that. I’d know. They’re my teeth, I’ve had them my whole life, I know what’s in my own mouth.)')],
   ['','The chart at the end of the bed says something else, in fountain pen. You don’t go and read it again.']]:[
   ['','You run your tongue along your teeth while you eat the soup. Two are gone on the left at the back, this week’s, the gum still sore.'],
   ['','Further back on the right there is another gap, smooth and closed over a long time ago. You have had it for as long as you have had a tongue to find it with. You don’t know who took that one either.'],
   ['hitmeuppp',MV('(2 new 1 old.)','(two new, one old. old one healed nice.)','(Two new, one old. The old one healed nicely.)','(Two new, one old. The old one’s healed lovely. Give these a few years and you won’t be able to tell them apart.)')],
   ['','You chew in the middle, the way you did when you were small, and you notice that you still know how.']],cb)];
const KD61_MX=[
 cb=>say([['','They have started bringing the water in a mug instead of the paper cup. It is a green mug with a chip in the rim.'],
   ['','You know this mug. You have drunk out of a mug like this every morning for a year, at an island in a kitchen, with a hound’s chin on your foot. You can’t remember which side the chip was on in that kitchen.'],
   ['hitmeuppp',MV('(which side.)','(which side was it. left. right. which side.)','(Which side was the chip on? Left? Which side?)','(Which side was it on. I drank out of it every single day. Left. Right. I had it every morning and I can’t remember which side.)')],
   ['','You turn it round and round, and you can’t remember, and you cry for the first time since the van, face to the wall so the tall one won’t hear.'],
   ['','(When you drink, your mouth goes to the side without the chip.)']],cb),
 cb=>say([['','You go through it all again, so that they can’t have it. The trailer is lot fourteen. Rent is due on the first. Prickles gets a quarter of a cup every other Sunday. The hounds, by colour: grey, old, black, pale. V takes his tea with nothing in it.'],
   ['','You get to the end and start again, and the second time round you can’t remember the lot number. Fourteen, or forty.'],
   ['hitmeuppp',MV('(14. or 40.)','(fourteen. or forty. it’s fourteen. is it.)','(Fourteen. Or forty. It’s fourteen. Isn’t it?)','(Fourteen. It’s fourteen. It’s forty. I’ve lived there for years, I’ve given that number to a hundred delivery men, it’s— which is it.)')],
   ['','You start counting up from one, under your breath, to see which number looks like home. On the other side of the door somebody says “fourteen,” and you stop, and don’t trust it, and start again from one.']],()=>{calm(-2);cb()})];
const KD61_MW=[
 cb=>say([['','There is a bread roll with the soup now, still warm. You leave it on the tray with everything else they bring.'],
   ['','At night you have heard a hound in the corridor. They have a hound out there, a big one, and sometimes she whines very low and scratches once at the door, the way a hound does when somebody has told her no. You know what places like this do to animals.'],
   ['','You tear the roll into pieces and push them under the door one at a time, flat on the lino, as far as your fingers reach.'],
   ['','For a long time nothing comes. Then something does, very gently, a big muzzle so careful that it never touches your fingers.'],
   ['hitmeuppp',MV('(good girl.)','(good girl. good girl. quick.)','(Good girl. Eat it quick, before they see.)','(Good girl. Good girl. Eat it quick, before they see. Somebody in here should get fed.)')],
   ['','You do it with every roll after that. You lie with your fingertips under the door until the hound’s breath comes back to them.']],()=>{calm(-1);cb()}),
 cb=>say([['','There is black polish on the nails of your right hand, chipped down to half-moons. Angel did them on a Sunday, before, with a little pink star on the thumb.'],
   ['','Every time you have been frightened in here you have picked at it. Today you look down and see how little is left, and you stop.'],
   ['hitmeuppp',MV('(sorry babe.)','(sorry babe. i’ll stop. keeping the star.)','(Sorry, babe. I’ll stop. I’m keeping the star.)','(Sorry, babe. Sorry. I’ll stop. That’s all of you I’ve got in here and I’ve been dropping it on their floor a flake at a time. I’m keeping the star.)')],
   ['','You sit on the hand so you can’t pick at it. You keep it under you all afternoon, and when you sleep, you sleep on it.']],cb)];

/* ---------- V: one scene a day, by band ---------- */
const KD61_VC=[
 cb=>say([['','They know him this morning. He can tell from the doorway: they look at his face first and then at his hands.'],
   ['','The first thing they say to him, once they know who he is, is the message he sent them three times a day for the whole of the time they were gone.'],
   ['hitmeuppp',MV('did u eat today.','did u eat today.','Did you eat today?','Did you eat today? Don’t lie. You look like a coat somebody left on a chair.')],
   ['','He thinks about it honestly. He has had coffee. At four this morning, in the kennel room, he ate half of a hound biscuit without noticing that he was doing it.'],
   ['K9','No.'],
   ['hitmeuppp',MV('sit.','sit down. have my soup.','Sit down. You can have half my soup.','Then sit down. You can have half of my soup. It’s your soup anyway. Sit.')],
   ['','He sits on the end of the bed. They push the tray at him with their good hand and watch him eat every spoonful, the way he has been watching them not eat for days, and does not say anything about it.']],()=>{apply({aff:3});calm(4);cb()}),
 cb=>{const flat=!!S.f.k61VRcpt;say([['','They ask for the things from their pockets. He has already given them the phone.'],
   ['',flat?'He brings the bag, and the tax history. The receipt comes out of chapter six flat and dry, and they read it all the way through.':'He brings the bag. The receipt is still in it, a soft grey lump, and they unfold it on their knee one-handed, very slowly, so that it will not tear.'],
   ['hitmeuppp',MV('rent’s due the 1st.','rent’s due on the 1st. what’s the date.','The rent’s due on the first. What’s the date?','The rent’s due on the first. What’s today? Don’t do the careful voice, just tell me the date.')],
   ['','They have a cast to the elbow, two pins through the back of their hand, a boot on their left foot and fourteen stitches in their scalp. They are asking about the rent.']],()=>ask('K9','(The rent.)',[
   {t:'“I have paid it.”',fn:()=>{S.f.k61VPaid=1;save();say([['hitmeuppp',MV('u WHAT.','u WHAT. i pay my rent.','You what? I pay my rent.','You what? V. I pay my rent. I’ve paid it every month since I was sixteen. I’ve never been late once. That’s mine.')],
     ['K9','Then you may pay me back.'],['hitmeuppp',MV('i will.','i will. to the cent.','I will. To the cent.','I will. To the cent. I want a receipt.')],
     ['','They put the receipt back in the bag and the bag under their pillow, and turns over, and is angry with him for the rest of the afternoon. It is the best afternoon he has had since the river.']],cb)}},
   {t:'“It is the twelfth. You have until the first.”',fn:()=>{S.f.k61VPaid=0;save();say([['hitmeuppp',MV('til the 1st. ok.','til the 1st. ok. i can sign w my right. right?','The first. I can sign with my right hand, can’t I?','The first. Okay. That’s fine, that’s loads of time. I can sign with my right. I can sign with my right hand, can’t I?')],
     ['K9','Yes.'],
     ['','They practise their signature on the back of a soup label with their right hand for an hour. It looks like a child’s. They keep going until it looks like theirs.']],cb)}}]))}];
const KD61_VX=cb=>say([['','He brings them water in their own mug, the green one with the chip, because they have not drunk from the paper cup in two days and he has run out of other ideas.'],
 ['','They wait until he has gone before they touch the tray, as they do with everything. He watches through the gap in the door.'],
 ['','They turn the mug round in their hands for a long time. Then they drink, and their mouth goes to the left, the side without the chip, the way it has every morning for a year at his island.'],
 ['K9','(They think that I am the guard, and they drink from the left side of my cup.)'],
 ['','He sits down on the floor outside the door with the other green mug, the one with no chip, and drinks from the left as well, so that it will be the same.']],()=>{calm(-1);cb()});
const KD61_VW=cb=>say([['','Every evening he puts a bread roll on their tray beside the soup. Every morning the roll is gone and the soup has not been touched.'],
 ['','On the third morning he finds the roll on his side of the door, torn into pieces and pushed under one at a time, and nosed into a straight line along the lino. The grey hound is lying beside the line with her chin on her paws. They have not eaten one.'],
 ['','He understands it slowly. Misaki has heard a hound in the corridor and decided that the people holding them are starving it. They are giving it their bread. They have not eaten in four days.'],
 ['','He picks the pieces up and does not know what to do with them. In the end he feeds them to the grey hound one at a time, from his hand, telling her each time that she is good, and the hound eats them because he asks her to.'],
 ['K9','(Tonight I will put two rolls on the tray. They will push both of them under the door. I will still put two.)']],()=>{calm(-3);cb()});

function k61Scene(){if(!S||!S.f||dlg||!k61Med())return null;const m=S.kd.med;if(S.f.k61Day===S.day)return null;
 const run=(key,list,i,bg)=>cb=>{S.f.k61Day=S.day;S.f[key]=i+1;save();go(cutBg(bg||'#0c0a08'));(Array.isArray(list)?list[i]:list)(cb)};
 if(S.pov!=='v'){if((S.slot||0)<1)return null;
  if(k61WR()&&kdClar()<2){const i=S.f.k61WN||0;if(S.f.kdMindDay!==S.day||i>=KD61_MW.length)return null;return run('k61WN',KD61_MW,i,'#0c0a08')}
  if((m.xd||0)>=1&&kdClar()<2&&!k61Worst()){const i=S.f.k61XN||0;if(i>=KD61_MX.length)return null;return run('k61XN',KD61_MX,i,'#0c0a08')}
  if(kdClar()>=2&&m.shattered&&(m.d||0)>=1){const i=S.f.k61CN||0;if(i>=KD61_MC.length)return null;return run('k61CN',KD61_MC,i,'#1c2422')}
  return null}
 if(k61Worst()&&(m.d||0)>=1&&!S.f.k61VW)return run('k61VW',KD61_VW,0,'#06060c');
 if((m.xd||0)>=1&&(m.clar||0)<2&&!k61Worst()&&!S.f.k61VX)return run('k61VX',KD61_VX,0,'#06060c');
 if((m.clar||0)>=2&&!k61Worst()){const i=S.f.k61VCN||0;if(i>=KD61_VC.length)return null;return run('k61VCN',KD61_VC,i,'#1c2422')}
 return null}
const _hub61=hub;hub=function(){const a=arguments,self=this;try{const s=k61Scene();if(s)return s(()=>_hub61.apply(self,a))}catch(e){}return _hub61.apply(self,a)};

/* ---------- Misaki: right after the morning shatter, the bin ---------- */
function k61Tubs(next){const m=S.kd&&S.kd.med;S.f.k61Tubs=1;save();const n=Math.max(1,Math.min(6,(m&&m.d)||1));go(cutBg('#1c2422'));
 say([['','The first thing you do, now that it is a room, is the first thing you would do in any room. You look in the bin.'],
  ['','There are soup tubs in it. '+k61Cap(k61N(n))+(n>1?' of them, full, with the lids on, cold.':', full, with the lid on, cold.')+' Every lid has a day written on it in fountain pen, in order.'],
  ['','He made it every day and you wouldn’t touch it, and every evening he took the full tub away without a word and made another.'],
  ['hitmeuppp',MV('(he kept making it.)','(he just kept making it.)','(He just kept making it, and throwing it away, and making it.)','(He just kept making it. Every day. He kept making it and throwing it out and making it again, and he never once said eat.)')]],()=>ask('hitmeuppp','(Today’s is on the tray.)',[
  {t:'Eat today’s.',fn:()=>{apply({energy:10});calm(3);save();say([['','It has gone cold while you stood at the bin. You eat all of it, cold, standing up, with the spoon in your right fist.']],next)}},
  {t:'Take the lids out of the bin.',fn:()=>{S.f.k61Lids=1;apply({aff:2});save();say([['','You fish the lids out and wipe them on the sheet, one at a time, and stack them under your pillow in order, because you want to have them.']],next)}}]))}
const _fx61=kdShatterFx;kdShatterFx=function(cb,o){try{if(o&&o.title===''&&!o.dark&&k61M()&&!S.f.k61Tubs){const c0=cb;cb=function(){const _s=say;let hit=0;say=function(L,c2){say=_s;hit=1;return _s(L,()=>k61Tubs(c2))};try{return c0.apply(this,arguments)}finally{if(!hit)say=_s}}}}catch(e){}return _fx61(cb,o)};

/* ---------- V: the side menu while she is in the infirmary ---------- */
const KD61_THINGS=[
 ()=>[['','One trainer came back with them, the left. The right was never found. There is river water in it, a stone in the toe, something from the cell floor dried into the laces, and their name in biro inside the tongue, the way a child’s shoes are labelled for school.'],
  ['','He washes it in the kennel sink with the hounds’ brush and dries it on the boiler.'],
  ['','Then he stands in the hall holding one clean shoe and finds that he does not know where it goes. In the end he puts it by the front door beside his own, where they kick theirs off when they come in, and lines it up straight.'],
  ['K9','(They will want the other one. I will go back to the river on Thursday and look again.)']],
 ()=>[['','In their back pocket, the rent receipt, soaked through. The landlord’s PAID has run pink across the paper.'],
  ['','He lays it flat in his tax history at chapter six and puts the book under a sack of hound food in the kennel room. The key is on a ring with a rubber frog. He washes the frog.'],
  ['','Two days later he takes the receipt out, dry and flat, and reads it. Rent paid to the end of the month. They paid it two days before the van. They texted him about it at the time, in capitals.'],
  ['K9','(The rent is due on the first. They will ask about the rent before they ask about their hand. I would put money on it.)']],
 ()=>[['','Their phone is in his inside pocket. At nine on Sunday it goes off against his ribs: WATER PRICKLES (every other sun, NOT MORE).'],
  ['','He cannot unlock it and does not know how to stop it. It goes off every nine minutes until ten while he sits on the floor outside their door.'],
  ['','At noon he drives to the trailer and gives the cactus a quarter of a cup of water, measured. Their kettle still has water in it from the morning of the van.'],
  ['','He pours it out. Then he stands there holding the empty kettle and cannot think why he did that, and fills it again, and leaves it on the hob for them.']]];
const KD61_FILE=()=>k61SA()?[
 ['','The doctor has left the file on his desk. He has read every page of it eleven times: the hand, the ribs, the foot, the wrists.'],
 ['','At the back there is a brown envelope, sealed and numbered in the corner, with a strip across the flap that says DO NOT SHOW PATIENT.'],
 ['','He leaves it sealed. He puts it in the safe behind the vaccination records, face down, turns the dial, and stands with his hand flat on the safe door for some time.'],
 ['K9','(It is theirs. If they ever wants it, it will be here. They will not want it. It will be here.)']]:[
 ['','He weighs them on the scale in the kennel room, because it is the only scale in the house. He weighs the hounds on it at five every morning.'],
 ['','They stand on it in his shirt and the boot, holding the rail, and reads the number before he can.'],
 ['hitmeuppp',MV('winter weight.','winter weight. been lighter.','Winter weight. I’ve been lighter than that.','Winter weight. Don’t write it down like that, I’ve been way lighter. At eleven I was twenty-six kilos. I remember because somebody weighed me for something.')],
 ['K9','Who weighed you?'],
 ['hitmeuppp',MV('dunno.','dunno. somebody w a clipboard.','I don’t know. Somebody with a clipboard.','Don’t know. Somebody with a clipboard. It was ages ago. Can I go back to bed?')],
 ['','They step off and go back to bed. He writes the number down. Under it he writes “age 11: 26 kg?”, and looks at it for a long time. The grey hound weighed more than that at six months.']];
const KD61_ASK=[['','He knocks twice and asks, through the door, what they need.'],
 ['hitmeuppp',MV('nothing. i’m good.','nothing! i’m good. thx.','Nothing. I’m good. Thank you.','Nothing, honestly. I’m good. I’ve got soup, I’ve got a light-well. Go to bed, V.')],
 ['','He asks again in the evening, with the same knock, and gets the same answer in the same cheerful voice.'],
 ['','So he makes a list of everything they have ever wanted in his house, which is not long, and brings all of it down and lays it out on the corridor floor: the hoodie, the Switch, Prickles, the other frog sock, the rifle-cleaning kit, the cereal, the pillow from their side of the bed. Then he goes to the far end of the corridor and sits down.'],
 ['','After an hour the door opens a hand’s width. One hand comes out and takes the cleaning kit and nothing else, and the door shuts.'],
 ['K9','(They took the only thing on the floor that is for work.)']];
const _sh61=sideHub;sideHub=function(late){const o=_sh61(late);try{if(!k61Med()||S.pov!=='v'||isLone())return o;const add=[];const n=S.f.k61Things||0;
 if(n<KD61_THINGS.length)add.push({t:'Their things, from the river',sub:S.done.k61Th?'done today':'costs time · what came back with them',dis:!!late||!!S.done.k61Th,fn:()=>{spend();S.done.k61Th=1;S.f.k61Things=n+1;if(n===0)S.f.k61Shoe=1;if(n===1)S.f.k61VRcpt=1;save();go(cutBg('#0c0e10'));say(KD61_THINGS[n](),()=>{calm(1);hub()})}});
 if(!S.f.k61File)add.push({t:'Their file',sub:S.done.k61Fl?'done today':'costs time · in his study',dis:!!late||!!S.done.k61Fl,fn:()=>{spend();S.done.k61Fl=1;S.f.k61File=1;save();go(cutBg('#0c0e10'));say(KD61_FILE(),()=>{apply({heart:-1});hub()})}});
 if(!S.f.k61Ask&&(S.kd.med.clar||0)>=2)add.push({t:'Ask what they need',sub:S.done.k61Ak?'done today':'costs time · through the door',dis:!!late||!!S.done.k61Ak,fn:()=>{spend();S.done.k61Ak=1;S.f.k61Ask=1;save();go(cutBg('#0c0e10'));say(KD61_ASK,()=>ask('K9','(The rest of it is still on the floor.)',[
  {t:'Carry it all back upstairs.',fn:()=>{S.f.k61AskR='back';save();say([['','He carries it back one thing at a time and puts every piece exactly where they left it, so that the house will be the same when they come up.']],hub)}},
  {t:'Leave it where it is.',fn:()=>{S.f.k61AskR='leave';save();say([['','He leaves it. In the morning nothing has moved, except that Prickles has been turned in the night so that his good side faces the door.']],()=>{calm(2);hub()})}}]))}});
 return o.concat(add)}catch(e){return o}};

/* ---------- after discharge ---------- */
const k61Ev=(id,when,run)=>kdEv(id,()=>!S.f[id]&&!isLone()&&when(),done=>{S.f[id]=1;save();run(done)});
k61Ev('kd61_home',()=>kdD()>=0,done=>{const me=S.pov!=='v',d=(typeof kdDays==='function'&&kdDays())||6,n=d>=9?4:d>=5?3:2,nw=k61N(n);say(me?[
 ['','The first evening upstairs. You go round the house the way you went round the cell, checking each room from the doorway before you go in.'],
 ['','Your stool is at the island and your hoodie is on the hook by the back door, where you left it. In his bathroom your toothbrush is in the cup, bone dry, the bristles splayed out the way you splay them.'],
 ['','In the cupboard where your cereal goes there are '+nw+' boxes of it, the same kind, unopened, in a row. He went to the shop while you were gone, and every time he came back with a box.'],
 ['hitmeuppp',MV('('+n+' boxes.)','('+n+' boxes. he kept buying my cereal.)','('+k61Cap(nw)+' boxes. He kept buying my cereal.)','('+k61Cap(nw)+' boxes. He kept buying my cereal. He kept buying it, in case.)')],
 ['','You open the oldest one, because it will go stale first, and eat a bowl standing at the island in the dark with your back to the wall. He comes in, sees you, and goes out again without turning on the light.']]:[
 ['','The first evening upstairs, they go round the house the way they went round the infirmary on their worst day, checking each room from the doorway before they go in.'],
 ['','In the cupboard they find the cereal: '+nw+' boxes of it, unopened, in a row. He had not counted them until he watched them count them.'],
 ['K9','(I bought one every time I went to the shop. Not buying it would have meant deciding something.)'],
 ['','They open the oldest box and eat a bowl at the island in the dark, standing, with their back to the wall, and do not look at him. He goes out again without turning on the light.'],
 S.f.k61Shoe?['','In the hall he takes the one clean trainer from beside the front door and puts it in the cupboard under the stairs, so that they will not have to see that there is only one.']:null],()=>{calm(-2);done()})});
k61Ev('kd61_rent',()=>kdD()>=5,done=>{const me=S.pov!=='v',paid=!me&&S.f.k61VPaid;
 if(paid)return say([['','On the first of the month they put an envelope on the kitchen island in front of him, with RENT on it in capitals and the exact amount inside, counted twice.'],
  ['hitmeuppp',MV('rent. to the cent.','rent. to the cent. receipt pls.','Rent. To the cent. I want a receipt.','Rent. To the cent, count it. I want a receipt. A proper one, with the date.')],
  ['','He writes them one on a page of the house ledger, in fountain pen, with the date and the amount and PAID, and tears it out along the spine. They read it all the way through before they put it in their back pocket.'],
  ['K9','(Their left hand is broken in two places and pinned. They have checked my arithmetic.)']],()=>{apply({aff:2});done()});
 if(!me)return say([['','They lose the first of the month somewhere. On the second they drive to the lot office one-handed, which they are not allowed to do, to pay their rent a day late.'],
  ['','They come back angrier about the twenty-five dollar late fee than he has seen them about anything since the river, and write to the lot office to contest it, with their right hand, three drafts.'],
  ['K9','(They cannot hold a fork in their left hand. They have asked me to check the spelling of “unprecedented.”)']],()=>{calm(1);done()});
 say([['','The rent was due on the first. You were sure all day that the first was the thirtieth, and you find out it wasn’t on the second, from the date on V’s newspaper. You drive to the lot office one-handed, which you are not allowed to do, and stand at the window.'],
  ['','The man behind the glass looks at the cast, and the eye, and the stitches, and asks what happened.'],
  ['hitmeuppp',MV('ladder.','fell off a ladder lol.','I fell off a ladder.','Ladder. Fell off a ladder, hanging fairy lights. Very festive, very stupid. Can I pay my rent?')],
  ['','He stamps it PAID. Then he says it is a day late and there is a twenty-five dollar fee, and it will go on the account.'],
  ['','You stand at the window with fourteen stitches in your head and argue about twenty-five dollars for ten minutes. You have never been late. You have paid on time every month since you were sixteen, and you want somebody to write that down.'],
  ['hitmeuppp',MV('(never late. till now.)','(never late. not once. now there’s a line.)','(Never late, not once. Now there’s a line on it that says late.)','(Never late. Never once in all those years. And now there’s a line on my account that says late, and it’ll be there forever.)')],
  ['',S.f.k61Rcpt==='cast'?'You pay the fee. In the truck you put the new receipt in your back pocket, where the last one was, and then you take it out again and push it down inside the cast, next to the other one.':'You pay the fee. You hold the new receipt flat on your knee all the way home, at every red light, so that it won’t crease.']],()=>{apply({yen:-2500});calm(-1);done()})});
(function(){if(typeof KD_ORDER==='undefined')return;const put=(id,after)=>{const i=KD_ORDER.indexOf(after);if(i<0)KD_ORDER.unshift(id);else KD_ORDER.splice(i+1,0,id)};
 put('kd61_home','kd_discharge');put('kd61_rent','kd_count')})();

/* ---------- ending lines ---------- */
const _xe61=extraEnding;extraEnding=function(){const L=_xe61();try{if(!S||!S.f)return L;const f=S.f;
 if(f.kd61_rent&&f.k61Rcpt==='cast')L.push('When the cast came off they kept it, because there were two rent receipts inside. It is in a drawer at V’s. Nobody is allowed to throw it out.');
 else if(f.kd61_rent&&f.k61VPaid&&S.pov==='v')L.push('In the back of V’s house ledger there is a torn edge where a page came out. It was a receipt for one month’s rent, and they still have it.');
 else if(f.kd61_rent)L.push('The lot office has one late payment on their account, from the month after the river. They have asked twice to have it removed.');
 if(f.k61Lids)L.push('Under the pillow on their side of V’s bed there is a stack of plastic lids, each with a day on it in fountain pen.')}catch(e){}return L};
