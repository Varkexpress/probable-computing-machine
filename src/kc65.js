/* ===================== THE ROUTES, LONGER (kc65) =====================
   More of the four romance routes, one beat per phase, offered from the side menu when due (one at a time per route) and
   played by "Date night" once the first three dates are done. Plus a morning-after event, a phone thread and ending
   lines per route. Routes: 'mr' Misaki × Ronin (S.rom==='r'), 'ma' Misaki × Angel (S.rom==='a'), 'vr' V × Ronin
   (S.vrom==='r'), 'va' V × Angel (S.vrom==='a').
   Choices that come back later (all in S.f):
     k65mrBooth 'true'|'filthy'|'his'  (normal)  → the booth in the epilogue, ending line
     k65mrRadio 'shut'|'back'          (act2)    → the roof before the boat
     k65mrAfter 'lie'|'talk'           (after)
     k65maBet   'won'|'lost'|'draw'    (normal)  → the epilogue, ending line
     k65maAfter 'bed'|'door'           (after)
     k65maLive  'good'|'bad'           (act2)    → the roof before the boat, ending line
     k65vrTea   'again'|'filed'|'back' (normal+, after k27_tea) → the file in the epilogue, ending line
     k65vrGala  'stay'|'car'           (act2)    → the file in the epilogue
     k65vrRing  'on'|'chain'           (act3)    → the file in the epilogue, ending line
     k65vaTable 'off'|'stay'           (normal+) → the epilogue
     k65vaHand  'post'|'keep'          (act2)    → the eyeliner before the boat, the epilogue, ending line
   Done marks: S.f.k65d[id]. See docs/notes_kc65.md. */
const K65=()=>{try{return !!S&&!isLone()&&!S.dark&&!(S.f&&S.f.abroad)&&S.phase!=='taken'}catch(e){return false}};
const k65R=()=>{if(!S)return null;if(S.pov!=='v'&&S.rom)return 'm'+S.rom;if(S.pov==='v'&&S.vrom)return 'v'+S.vrom;return null};
const k65Done=id=>!!(S.f.k65d&&S.f.k65d[id]);
const k65Mark=id=>{S.f.k65d=S.f.k65d||{};S.f.k65d[id]=1;save()};
const k65A2=()=>S.phase==='act2'&&S.day>=(S.act2Start||0)+1;
const k65A3=()=>S.phase==='act3'&&typeof a3d==='function'&&a3d()>=2;
const k65Post=()=>['after','act2'].includes(S.phase)&&(typeof kdPost==='function'?kdPost():true);
const k65D=()=>S.pov==='v'?(S.vromDates||0):(S.romDates||0);
const K65M=(...a)=>['hitmeuppp',MV(...a)];

/* ===================================== MISAKI × RONIN ===================================== */
function k65mrBooth(){go(cutBg('#120a08'));k65Mark('mr_booth');
 say([['','The church across town, after midnight. Ronin has a key to the side door, and you don’t ask where he got it. He walks you up the aisle with a torch in one hand and the crowbar in the other, genuflects to the altar with enormous sarcasm, and opens the confessional like a man showing off a car.'],
  [RN,'Your side’s the one with the cushion. I’m the priest tonight. Get in.'],
  ['','The booth smells of varnish and old breath. Through the grille you can see the shine of his rings and nothing else.'],
  [RN,'“Bless me, Father, for I have sinned.” Go on. Been waitin’ my whole life t’hear that from this side.'],
  K65M('bless me father for i have sinned lol','bless me father for i have sinned. a LOT.','Bless me, Father, for I have sinned. Do you want them alphabetical?','Bless me, Father, for I have sinned. Do you want them alphabetical, or by body count? I’ve got a spreadsheet.'),
  [RN,'Chronological. Take your time. I got all night, and the Devil’s up front with popcorn.']],
  ()=>ask(RN,'(Through the grille, a ring taps the wood twice. He’s waiting.)',[
   {t:MV('tell him something true','tell him something true','Tell him something true.','Tell him something true. No bits.'),fn:()=>{S.f.k65mrBooth='true';fr('r',3);say([
     K65M('i think about u on roofs. during.','i think about you on roofs. in the waiting part. i never used to think about anybody up there.','I think about you on roofs, in the waiting, before the shot. I never used to think about anyone up there. It’s a professional problem.','I think about you on roofs, in the waiting, before the shot. I never used to think about anybody up there. Six hours flat on gravel and I’m thinking about your stupid laugh. I’m furious about it.'),
     ['','For a while nothing comes back through the grille. Then you hear a pen squeak on wood. He is writing something on the inside of his door in silver pen, and he won’t let you see it.'],
     [RN,'Three Hail Marys. And you’re comin’ home with me.']],hub)}},
   {t:MV('confess something filthy','confess something filthy','Confess something filthy.','Confess something filthy. Slowly.'),fn:()=>{S.f.k65mrBooth='filthy';fr('r',3);say([
     ['','You confess something filthy. You take your time over it, and you use the voice.'],
     [RN,'(after a while) ...Hang on.'],
     ['','There are four screws holding the grille in. Ronin has a screwdriver on his keyring. Of course he does.'],
     ...(sugOn()?[[RN,'Father’s comin’ through. Penance is gonna be real hands-on.'],
     ['','The torch rolls off the bench and goes out. Around one o’clock the booth makes a noise no booth was built to make, and up at the altar the candles don’t even flicker.']]
     :[[RN,'Father’s comin’ through. Can’t hear a fuckin’ thing through a cheese grater.'],
     ['','He takes the grille out and puts his head and one arm through the hole, and you finish the confession with his chin on your shoulder and his rings in your hair. The torch rolls off the bench and goes out. Around one o’clock you both fall asleep in there, folded up like deckchairs, and at six the cleaner finds a pair of boots sticking out of the confessional and walks backwards out of the church.']])],hub)}},
   {t:MV('make him swap','make him swap sides','Make him swap sides.','Make him swap sides. It’s his turn.'),fn:()=>{S.f.k65mrBooth='his';fr('r',4);say([
     K65M('no. ur turn. swap','swap. your turn. you get the cushion.','No. Swap. You’re on the cushion.','No. Swap. I hear you in the back pew every Sunday, telling him things. Tell me.'),
     ['','He swaps. He kneels, which you have never once seen him do, and he’s quiet so long you think he’s gone to sleep on the cushion.'],
     [RN,'Bless me, Father. I ain’t sorry for a single one of ’em. I’d do every one again with a smile on.'],
     [RN,'Only thing I’m sorry for is I didn’t know you sooner. Coulda had you in the back pew years back. Coulda been ruinin’ your Sundays for ages.'],
     K65M('ur forgiven','you’re forgiven. three hail marys and buy me fries.','You’re forgiven. Three Hail Marys, and you’re buying the fries.','You’re forgiven. Three Hail Marys, you’re buying the fries, and you never tell anybody you knelt.'),
     [RN,'Kneelin’ was strategic. Hand me the crowbar, my knee’s fucked.']],hub)}}]))}

function k65mrAfter(){go(cutBg('#0e0c0c'));k65Mark('mr_after');
 say([['','Ronin comes by at the end of the day with a burger he knows you won’t eat and sits on the end of the bed, as far from you as the bed allows. He hasn’t touched you since you came home. You noticed. He noticed you noticing.'],
  [RN,'Right. Job brief. Where can I put my hands? Say it like you’d say it to a client. I don’t want it nice.'],
  K65M('shoulders ok. wrists no. from behind no.','shoulders are fine. hair’s fine. wrists no. nothing from behind.','Shoulders are fine. Hair is fine. Leave the wrists alone. Nothing from behind unless you say it first.','Shoulders, fine. Hair, fine. Leave the wrists alone. Nothing from behind unless you say it out loud first, even if it sounds stupid. Especially if it sounds stupid.'),
  [RN,'Copy.'],
  ['','He takes his rings off, all of them, one at a time, and lines them up on the windowsill. He knows you hear every click now, and he puts each one down like it might go off.']],
  ()=>ask(RN,'(He is sitting on his hands.)',[
   {t:MV('“lie down. on top.”','“lie down. on top of the covers.”','“Lie down. On top of the covers.”','“Lie down. On top of the covers, and keep your boots on, I don’t care.”'),fn:()=>{S.f.k65mrAfter='lie';fr('r',3);calm(2);say([
     ['','He lies on his back on top of the covers with his boots on and his hands folded on his chest like a man laid out in a coffin. You put your head on his shoulder, which is allowed. He hums the second verse of something off the gospel radio, flat, until you sleep.']],hub)}},
   {t:MV('“stay there. talk.”','“stay over there and talk.”','“Stay there. Talk to me.”','“Stay there and talk. Anything. Whatever’s in your head.”'),fn:()=>{S.f.k65mrAfter='talk';fr('r',3);calm(2);say([
     ['','He stays at the end of the bed and tells you about every asshole he killed this month, in order, low, like a bedtime story. You fall asleep at number four. He finishes the list anyway, and then he sits there till it gets light, and he’s still sitting there when you wake up.']],hub)}}]))}

function k65mrRadio(){go(cutBg('#0a0c10'));k65Mark('mr_radio');
 say([['','A job, together. You’re on the roof across the street with the rifle. Ronin’s in the stairwell of the target’s building with the crowbar and an earpiece, waiting for the shot so he can go up and finish whatever’s left.'],
  [RN,'(radio) You in position, little killer?'],
  K65M('(radio) yeah','(radio) yeah. quiet now.','(radio) In position. Radio silence, please.','(radio) In position. Radio silence, please, I’m doing the breathing thing.'),
  [RN,'(radio) Copy. Radio silence.'],
  [RN,'(radio) ...Know what you look like from down here? Flat on your belly on that gravel? Been thinkin’ about it all week. Real specific.'],
  [RN,'(radio) Say “red” and I’ll shut my mouth. Say anythin’ else and I won’t.']],
  ()=>ask('hitmeuppp','(Your crosshair is drifting. You’re laughing into the stock.)',[
   {t:MV('“red. shut up.”','“red. shut the fuck up.”','“Red. Shut the fuck up.”','“Red. Shut the fuck up, I’m working.”'),fn:()=>{S.f.k65mrRadio='shut';fr('r',2);say([
     ['','He shuts up so completely that you check his channel twice to see if he’s dead. You take the shot at 11:52, clean. Over the radio the stairwell door bangs open, and he’s laughing like a lion in feast.'],
     [RN,'(radio) Purgatory, please and thank you. ...Nice shot. Can I talk now?']],hub)}},
   {t:MV('talk back','talk back','Talk back.','Talk back. Be specific.'),fn:()=>{S.f.k65mrRadio='back';fr('r',3);say([
     K65M('(radio) u want specific?','(radio) you want specific? fine.','(radio) You want specific? Fine. Listen.','(radio) You want specific? Fine. Listen carefully, because the guy in the window has about forty seconds.'),
     ['','You tell him, very specifically. You take the shot in the middle of a sentence and then finish the sentence. On the radio, Ronin has stopped breathing.'],
     [RN,'(radio) ...Fuck. Okay. I’m goin’ up t’do my job now, and I ain’t gonna be able to concentrate on it at all.'],
     ['','He’s so distracted he only hits the man in the window eleven times.']],hub)}}]))}

function k65mrBoat(){go(cutBg('#0a0a12'));k65Mark('mr_boat');const r=S.f.k65mrRadio;
 const L=[['','The roof of his building, two nights before the boat. He’s in a T-shirt in the wind, because he runs hot and has never owned a coat. You brought two. He won’t wear either. He lets you put one round his shoulders and complains about it.'],
  [RN,'Friday. Say it goes bad. Say we both go.'],
  [RN,'I’m goin’ down, obviously. Got a reservation. You, I dunno. You might get let in upstairs on a technicality.'],
  K65M('then i go down too','then i’m going down too','Then I’m going down with you.','Then I’m going down with you. I’ve read the brochure. Upstairs has harps. I’d last a week.'),
  [RN,'Nah, here’s the plan. You go up if they’ll have you. I go down. Then I come up the back stairs with the crowbar and get you. They never lock the back door up there. Too fuckin’ trustin’.']];
 if(r==='back')L.push([RN,'And on the way down you tell me somethin’ specific again. Like the roof. I ain’t ever gettin’ over the roof.']);
 else if(r==='shut')L.push([RN,'And this time I ain’t keepin’ radio silence. You wanna say red, you’re gonna have t’shoot me.']);
 L.push(['','He takes your hand and puts it up under his T-shirt, flat over his heart, where he’s hot as a stove even in this wind. You stay up there until the spare coat blows off the roof, and nobody goes after it.']);
 say(L,()=>{fr('r',3);hub()})}

function k65mrEpi(){go(cutBg('#120a08'));k65Mark('mr_epi');const b=S.f.k65mrBooth;
 const L=[['','The church across town, after midnight. He still has the key.']];
 if(b==='true')L.push(['','The booth is still there. So is what he wrote on the inside of his door that night, in silver pen, and this time he lets you read it.'],
  ['','It says the date, and under it, in his worst handwriting: THEY THINK ABOUT ME ON ROOFS. GOD HELP ME.'],
  [RN,'Priest’s never seen it. Or he has, and he’s prayin’ for me. Either way.']);
 else if(b==='filthy')L.push(['','The grille is back in with eight screws instead of four. Somebody in the parish noticed something.'],
  [RN,'Eight. Eight fuckin’ screws, little killer. Like that’s gonna stop me.'],
  ['','He has a bigger screwdriver now. He bought it specially. He shows it to you in the aisle like an engagement ring.']);
 else if(b==='his')L.push(['','Ronin goes in on the kneeling side without being asked, now. He confesses once a month, to you, on a Sunday night. He’s still not sorry about any of them. He is sorrier every month about the years before he knew you, and he’s getting more creative about how he puts it.'],
  K65M('ur getting good at this','you’re getting good at this','You’re getting good at this.','You’re getting good at this. Last month made me cry and I had to pretend it was the varnish.'));
 else L.push(['','He picks the lock on the confessional to show you he can, sits on the cushion with the crowbar across his knees, and won’t come out until you confess something.'],
  K65M('i love u','i love you. there. confessed.','I love you. That’s my confession.','I love you. That’s it. That’s the confession.'),
  [RN,'That ain’t a sin. Try harder.']);
 if(S.f.romMarried)L.push([RN,'Married in the eyes of God an’ everythin’. He’s furious. Best day of my life.']);
 L.push([RN,'C’mon. Back pew. Devil’s saved us seats.']);
 say(L,()=>{fr('r',2);hub()})}

EVENTS.push({id:'k65mr_morn',when:()=>{try{return K65()&&k65R()==='mr'&&S.phase==='normal'&&(S.romDates||0)>=2}catch(e){return false}},run:done=>say(!sugOn()?[
 ['','You wake up at Ronin’s at noon on his couch, under his only blanket, with your head on his thigh and the gospel radio still going from last night. You both fell asleep halfway through an argument about wrestling. He’s been up since four and hasn’t moved, because of your head. Now there’s bacon, and he’s wearing the apron over a T-shirt with a skull on it.'],
 ['',S.seen&&S.seen.rom_r_ring?'His rings are lined up on the arm of the couch, eight skulls in a row, and a gap at the end where the first one used to sit. That one’s on your thumb.':'His rings are lined up on the arm of the couch, nine skulls in a row, in the order of the names inside them.'],
 [RN,'(from the kitchen) Don’t go tryin’ ’em on. You got no knuckles. They’ll fall off in the bacon.'],
 [AN,'(text) u didn’t come home. ronin isn’t answering. are u both dead or did u fall asleep on his couch again'],
 K65M('(text) couch','(text) the couch','(text) The couch.','(text) The couch. He put his only blanket on me. Don’t tell V.'),
 [AN,'(text) gross. proud of u. tell him he owes me a crowbar, he left one in my hallway and it scratched the floor']]:[
 ['','You wake up at Ronin’s at noon with the gospel radio still going from last night. He’s been up since four. There’s bacon, and he’s wearing the apron over a pair of boxers with skulls on and nothing else.'],
 ['',S.seen&&S.seen.rom_r_ring?'His rings are lined up on the nightstand, eight skulls in a row, and a gap at the end where the first one used to sit. That one’s on your thumb.':'His rings are lined up on the nightstand, nine skulls in a row, in the order of the names inside them.'],
 [RN,'(from the kitchen) Don’t wear ’em to bed. Ain’t puttin’ skulls in anybody’s hair.'],
 [AN,'(text) u didn’t come home. ronin isn’t answering. are u both dead or is it the other thing'],
 K65M('(text) other thing','(text) the other thing','(text) The other thing.','(text) The other thing. Twice. Don’t tell V.'),
 [AN,'(text) gross. proud of u. tell him he owes me a crowbar, he left one in my hallway and it scratched the floor']],()=>{fr('r',2);done()})});

txDef('tx_k65_mr',{with:'r',pov:'m',prio:1,when:()=>K65()&&k65R()==='mr'&&['normal','act2'].includes(S.phase)&&(S.romDates||0)>=1,nodes:{
 start:{in:()=>['what’re you wearin'],expire:3,
  opts:()=>[{t:MV('“ur hoodie. that’s it”','“your hoodie. that’s it.”','“Your hoodie. That’s it.”','“Your hoodie, and that’s all.”'),fx:()=>fr('r',2),reply:()=>['come here and say that','actually don’t, I’m on a job. say it after','guy on the floor heard that btw. he says congrats']},
   {t:MV('“armour and a chainsaw”','“body armour and a chainsaw”','“Body armour and a chainsaw.”','“Body armour and a chainsaw, and a smile.”'),fx:()=>fr('r',2),reply:()=>['stop it, I’m at work','I got a crowbar in a guy and I just went all warm']},
   {t:MV('“none of ur business”','“none of your business”','“None of your business.”','“None of your fucking business.”'),reply:()=>['wrong answer'],next:'again'}]},
 again:{in:()=>['try again. slower'],
  opts:()=>[{t:MV('“...ur hoodie”','“...your hoodie.”','“...Your hoodie.”','“...Your hoodie. Happy?”'),fx:()=>fr('r',3),reply:()=>['better','home in twenty. don’t change']},
   {t:MV('“nope”','“still none of your business”','“Still none of your business.”','“Still none of your business. Come and find out.”'),fx:()=>fr('r',2),reply:()=>['oh it’s like that','leavin now. devil can finish this guy']}]}}});

/* ===================================== MISAKI × ANGEL ===================================== */
function k65maBet(){go(cutBg('#1a0c14'));k65Mark('ma_bet');
 say([['','A roof at dusk, two rifles, and a row of bottles on a wall across the yards, four hundred metres off. Angel is in a silk scarf and full lashes, and she lies down on the gravel without a thought for either.'],
  [AN,'loser does whatever winner says. a whole night. no vetoes.'],
  K65M('deal','deal. prepare to lose.','Deal. Prepare to lose.','Deal. Prepare to lose badly, because I’ve already decided what you’re doing.'),
  ['','Neither of you misses. You go through the bottles, then the caps off the bottles, then the stalks off a row of cherries she brought along for the purpose. It gets dark. You’re both still on a perfect score.'],
  [AN,'(narrating, very soft) and the light’s going, and she’s lying next to the hottest person she’s ever met, and she knows she should miss one on purpose, and she isn’t going to.']],
  ()=>ask(AN,'(One cherry left on the wall.)',[
   {t:MV('take the shot','take the shot','Take the shot.','Take the shot. Win.'),fn:()=>{S.f.k65maBet='won';fr('a',3);say([
     ['','You take the stalk off the last cherry. Angel watches it go through her scope, then rolls onto her back on the gravel and stares at the sky.'],
     [AN,'ok. ok. what do you want.'],
     K65M('ur hair down. no lashes. my hoodie.','maria off. hair down, no lashes, my hoodie, no narrating.','I want Maria off. Hair down, no lashes, my hoodie, and you don’t narrate anything.','I want Maria off. All of it. Hair down, no lashes, my hoodie, and you don’t narrate a single thing all night, however much you want to.'),
     ...(sugOn()?[[AN,'that’s so mean. that’s the meanest thing anyone’s ever wanted. drive faster.']]:[[AN,'that’s so mean. that’s the meanest thing anyone’s ever wanted. fine. your floor. i’m bringing the cherries.']])],hub)}},
   {t:MV('miss it on purpose','miss it on purpose','Miss it on purpose.','Miss it on purpose. Make it look good.'),fn:()=>{S.f.k65maBet='lost';fr('a',3);say([
     ['','You put the round two inches left of the cherry and swear about it, loudly. Angel turns her head on the gravel and looks at you for a long time.'],
     [AN,'you missed on purpose.'],
     K65M('wind','it was the wind','It was the wind.','It was the wind. There’s a lot of wind up here. Look it up.'),
     [AN,'there’s no wind. ok. you’re going to regret that so much. get in the car.']],hub)}},
   {t:MV('“draw?”','“call it a draw.”','“Call it a draw.”','“Call it a draw. We both win.”'),fn:()=>{S.f.k65maBet='draw';fr('a',4);say([
     [AN,'a draw means we both do whatever the other one says.'],
     sugOn()?K65M('...oh','oh. OH.','Oh. That’s a problem.','Oh. That’s a logistics problem. That’s a real logistics problem. Who goes first?')
      :K65M('...oh. what if we both say nap','oh. what if we both say “nap”','Oh. What if we both say “nap”?','Oh. That’s a logistics problem. What if we both say “nap”? Who goes first?'),
     ...(sugOn()?[[AN,'we go at the same time. obviously. i’ve thought about this a lot.']]:[[AN,'then we nap at the same time. on top of each other. obviously. i’ve thought about this a lot.']]),
     ['','She shoots the last cherry off the wall without using the scope, to make a point, and goes to get the car.']],hub)}}]))}

function k65maAfter(){go(cutBg('#140c10'));k65Mark('ma_after');
 say([['','Angel comes by in the evening with the pink pads she cleans her face with after a job, and her rifle in its case, which she leans by the door. She sits on the edge of the bed and doesn’t touch you.'],
  [AN,'i want to do your face. you can say no.'],
  [AN,'i’ll do it in the voice. that way you’re saying no to maria. everybody says no to maria. her comments do it all day.'],
  K65M('ok','ok. the voice.','Okay. Do the voice.','Okay. Do the voice. It’s stupid. Do it.'),
  [AN,'(bright, soft, maria) and now she’s going to do the left side, if that’s okay with you, and if it isn’t okay she’ll stop. she’s really good at stopping.'],
  ['','You nod. She does the left side. She asks again in Maria’s voice for the right side, then your forehead, then your hair, and each time she waits for the nod before she moves, and each time you nod a little faster.']],
  ()=>ask(AN,'(She has gone through eleven pads.)',[
   {t:MV('“stay. on the bed.”','“stay. on the bed, on top.”','“Stay. Here, on the bed.”','“Stay. Here, on the bed, on top of the covers. Don’t narrate it.”'),fn:()=>{S.f.k65maAfter='bed';fr('a',3);calm(2);say([
     ['','She lies down on top of the covers in her coat, back to the wall, face to you, and keeps the narration in. You can see what it costs her: her lips keep moving. She falls asleep before you do, halfway through a word.']],hub)}},
   {t:MV('“floor. by the door.”','“the floor. by the door. with the rifle.”','“The floor, by the door. With the rifle.”','“The floor, by the door, with the rifle. I want you between me and it.”'),fn:()=>{S.f.k65maAfter='door';fr('a',3);calm(2);say([
     ['','She takes the cushion off the chair and lies down across the doorway with the rifle along her body, the way it lies in the foam in the pink safe.'],
     [AN,'(maria, from the floor) and here’s angel, and she’s comfortable, the floor is lovely, she’s going to have a terrible back and she doesn’t care.'],
     ['','Every time you wake in the night she’s awake too, and she says your name once, so you know where she is.']],hub)}}]))}

function k65maLive(){go(cutBg('#2a1428'));k65Mark('ma_live');
 say([['','Maria de la Rosa does a live Q&A on Thursdays. Tonight you’re on the daybed two feet out of frame, under strict instructions not to exist.'],
  [AN,'(maria) hi angels! so many questions tonight. somebody wants my skincare routine “after a long day”, which is so sweet.'],
  ['','You are wearing her silk robe, the one from the thumbnail.']],
  ()=>ask('hitmeuppp','(Two million people are watching her smile.)',[
   {t:MV('behave','behave','Behave.','Behave. Mostly.'),fn:()=>{S.f.k65maLive='good';fr('a',2);say([
     ['','You behave. You lie on the daybed eating her cereal and watch her work. She answers forty questions in the sweet voice, and once, when somebody asks if she has a special someone, her eyes go to you, off the edge of the frame, for half a second. The clip of that half-second has a million views by morning.'],
     [AN,'(after, lowercase) you looked at me like that the whole hour. it was so distracting. i hate you. come here.']],hub)}},
   {t:MV('misbehave','misbehave','Misbehave.','Misbehave. Carefully.'),fn:()=>{S.f.k65maLive='bad';fr('a',3);say([
     ['','You get off the daybed. You stay low, under the eyeline of the camera, and put one hand on her knee under the desk.'],
     [AN,'(maria) so for an evening routine i always start with a, with a cleansing balm—'],
     ['',sugOn()?'You move the hand.':'You draw a small heart on her knee with one finger, slowly, and then a skull.'],
     [AN,'(maria) a BALM, sorry guys, i’m so tired today, um. okay.'],
     ['','The chat fills up with “maria are u ok” and “she’s flushed???” and a hundred thousand fire emojis. She ends the stream four minutes early, the first time in four years, with the smile still on.'],
     ...(sugOn()?[[AN,'(lowercase, not smiling) bedroom. now. you’re in so much trouble.']]
     :[[AN,'(lowercase, not smiling) couch. now. you’re in so much trouble.'],
     ['','The trouble is that she lies down on top of you on the couch in full Maria, lashes and all, with her face in your neck, and calls you a menace into it until she falls asleep there, and you can’t get up for two hours.']])],hub)}}]))}

function k65maBoat(){go(cutBg('#0c0a14'));k65Mark('ma_boat');const l=S.f.k65maLive;
 const L=[['','The night before the boat you go up on Angel’s roof to check sightlines over the water. She lies next to you on the wet gravel and narrates you instead of the water.'],
  [AN,'(soft, maria) and here we see the love of my life, lying in a puddle, holding a rifle she’s left to me in a will i keep in my notes app called list final two, which is so romantic and also not legally binding.']];
 if(l==='bad')L.push([AN,'(still maria) and four hundred thousand people have made a meme out of her hand on my knee, and they don’t even know it’s her hand. they call it the flush. there’s merch.']);
 else if(l==='good')L.push([AN,'(still maria) and a million people watched me look at her for half a second, and none of them know she’s real.']);
 L.push(K65M('i’m not dying friday','i’m not dying friday. you’re not getting the rifle.','I’m not dying Friday, so forget the rifle.','I’m not dying Friday, so forget the rifle. Stop narrating my funeral, it’s a bad look on you.'),
  [AN,'(lowercase) i know. i checked. i checked twice.'],
  ['','She puts her cheek down on the stock of your rifle, next to your hand, and stays there until the puddle has soaked all the way through her coat.']);
 say(L,()=>{fr('a',3);hub()})}

function k65maEpi(){go(cutBg('#1a0c14'));k65Mark('ma_epi');const b=S.f.k65maBet;let L;
 if(b==='won')L=sugOn()?[['','It’s been months and you’re still collecting on the roof. Every so often you say “bet” at dinner, and Angel takes her lashes off at the table, one at a time, and lets her hair down, and doesn’t say a word for the rest of the night, and Ronin has to leave the room.'],
  [AN,'(afterwards) i want a rematch. i want a rematch so bad.']]
  :[['','It’s been months and you’re still collecting on the roof. Every so often you say “bet” at dinner, and Angel takes her lashes off at the table, one at a time, and lets her hair down, and puts your hoodie on, and lies on the living-room floor with her head on your stomach for the rest of the night without a word, and Ronin has to step over you both to get to the fridge.'],
  [AN,'(at midnight, from the floor) i want a rematch. i want a rematch so bad.']];
 else if(b==='lost')L=[['','She still hasn’t collected. She hasn’t told you what you owe. Every Sunday she looks at you across the table, says “not yet” and smiles with all her teeth, and you haven’t had a calm Sunday since.'],
  [AN,'i’m saving it. it’s going to be so good. you have no idea.']];
 else if(b==='draw')L=[sugOn()?['','You still haven’t settled the draw. You’ve tried every order there is. Angel keeps a spreadsheet of the attempts, colour-coded, with a notes column she won’t let V see.']
  :['','You still haven’t settled the draw. Every Sunday you both say “nap” at the same time and you both lose, on her couch, tangled up under one blanket with the ring light off. Angel keeps a spreadsheet of the naps, colour-coded, with a notes column for who snored and who drooled on whose neck.'],
  [AN,'rematch on the roof sunday. tiebreaker’s the cherry. i bought a whole crate.']];
 else L=[['','Angel has bought a crate of cherries and two boxes of rounds. She would like a bet. She hasn’t told you the stakes, and she’s already wearing your hoodie, which you think is a tell.']];
 if(S.f.romMarried)L.push([AN,'also we’re married, so legally your debts are my debts, so i owe me. i love that.']);
 L.push(['','She turns the ring light on, looks at you through the phone for a while, and turns it off again without recording anything.']);
 say(L,()=>{fr('a',2);hub()})}

EVENTS.push({id:'k65ma_morn',when:()=>{try{return K65()&&k65R()==='ma'&&S.phase==='normal'&&(S.romDates||0)>=2}catch(e){return false}},run:done=>say(!sugOn()?[
 ['','You wake up on the floor of Angel’s studio, under the ring light, still in yesterday’s clothes, with a cushion under your head that wasn’t there when you fell asleep mid-argument about lip liner. She’s cross-legged beside you in your T-shirt, with her phone held flat above her face, filming the ceiling.'],
 [AN,'found it. the right ceiling. the brands can wait though. this one’s mine.'],
 ['','There is a lipstick print on your cheek the exact shade of the one on her mouth, from a goodnight kiss you don’t remember. You go to rub it off and she catches your hand and puts it back on the cushion.'],
 [AN,'don’t. that’s a watermark.'],
 K65M('ur insane','you’re insane','You’re insane.','You’re insane, and I’m wearing it to Sunday dinner.'),
 [AN,'wear it to sunday dinner. i want ronin to choke on his bread.']]:[
 ['','You wake up in Angel’s bed. She’s already up, cross-legged at the bottom of it in your T-shirt, with her phone held flat above her face, filming the ceiling.'],
 [AN,'found it. the right ceiling. the brands can wait though. this one’s mine.'],
 ['','There is a lipstick print on your collarbone the exact shade of the one on her mouth. You go to rub it off and she catches your hand and puts it back on the pillow.'],
 [AN,'don’t. that’s a watermark.'],
 K65M('ur insane','you’re insane','You’re insane.','You’re insane, and I’m wearing a low neck to Sunday dinner.'),
 [AN,'wear it to sunday dinner. i want ronin to choke on his bread.']],()=>{fr('a',2);done()})});

txDef('tx_k65_ma',{with:'a',pov:'m',prio:1,when:()=>K65()&&k65R()==='ma'&&['normal','act2'].includes(S.phase)&&(S.romDates||0)>=1,nodes:{
 start:{in:()=>['(a mirror selfie in a red dress, a rifle case in the corner of the shot)','rate it 1 to 10. wrong answers get punished'],expire:3,
  opts:()=>[{t:'“10”',fx:()=>fr('a',2),reply:()=>['boring. correct, but boring','punishment pending anyway']},
   {t:MV('“7. take it off and try again”','“7. take it off and try again”','“Seven. Take it off and try again.”','“Seven. Take it off and try again, I’ll wait.”'),fx:()=>fr('a',3),reply:()=>['oh??','ok. come over and supervise then. bring the frog sock for luck']},
   {t:MV('“the rifle case is the best part”','“the rifle case is the best part”','“The rifle case is the best part.”','“The rifle case is the best part, honestly.”'),reply:()=>['you get it. you’re the only one who gets it'],next:'case'}]},
 case:{in:()=>['which do i wear to yours then. the dress or the case'],
  opts:()=>[{t:MV('“both”','“both”','“Both.”','“Both. Obviously both.”'),fx:()=>fr('a',3),reply:()=>['both. ok. leaving now','if anyone stops me on the stairs i’m telling them it’s a guitar']},
   {t:MV('“neither”','“neither”','“Neither.”','“Neither. Come as you are.”'),fx:()=>fr('a',3),reply:()=>['misaki','i’m in the car. i’m wearing a coat. that’s all i’m saying']}]}}});

/* ===================================== V × RONIN ===================================== */
function k65vrMugs(){go(cutBg('#100a08'));k65Mark('vr_mugs');
 say([['','Ronin turns up in your study at one in the morning with two mugs he has bought specially. One says, in his silver pen, VEE’S. DO NOT. (POISON). The other says MINE and has a skull on it.'],
  [RN,'New system. You make the tea. You drink first. I watch you swallow.'],
  ['K9','You may watch me swallow.'],
  [RN,'Don’t say it like that. Fuck. Okay, say it like that, but drink.'],
  ['','You drink first. He watches. Then he takes a sip of his own and sits on the arm of your chair, which nobody has been invited to do since the chair was built.'],
  [RN,'So. That night. I said some shit.']],
  ()=>ask('K9','(He is looking at the bookcase as if it owes him money.)',[
   {t:'“Say the part about my hands again.”',fn:()=>{S.f.k65vrTea='again';fr('r',3);say([
     [RN,'Nah.'],
     ['K9','You said it sedated. I would like to hear it sober. I will wait.'],
     ['',sugOn()?'You wait. You are very good at waiting. At twenty to two he puts his mug down, takes your hand off the desk, turns it over, looks at it, and says it again, sober, with worse grammar and more swearing. Then he does something with your hand that he did not mention the first time.':'You wait. You are very good at waiting. At twenty to two he puts his mug down, takes your hand off the desk, turns it over, looks at it, and says it again, sober, with worse grammar and more swearing. Then he kisses the palm, once, and does not give the hand back. He holds it on his knee like something he is minding for you, and falls asleep on the arm of your chair.'],
     ['K9','(The tea went cold. Neither mug was finished.)']],hub)}},
   {t:'“You said nothing I had not already filed.”',fn:()=>{S.f.k65vrTea='filed';fr('r',2);say([
     [RN,'You FILED it?'],
     ['K9','Page four of your file, under “Statements made while sedated”. I quoted you exactly. The grammar is yours.'],
     [RN,'Show me.'],
     ['','You show him. He reads it with the face he made under your coat. Then he takes the pen off your desk, adds a line at the bottom of the page, underlines it twice, and will not let you read it until he has left the room.']],hub)}},
   {t:'Tell him something back.',fn:()=>{S.f.k65vrTea='back';fr('r',4);say([
     ['K9','You said you think about the way I say “no”.'],
     [RN,'Don’t.'],
     ['K9','I think about the way you say “Vee”. You say it as though I owe you money. I have run the figures. I would pay it.'],
     [RN,'...That’s the worst thing anybody ever said t’me. Say it again.'],
     ['',sugOn()?'You do not get to say it again. He is in your lap before you are through the first word, and the mug that says MINE goes off the edge of the desk and breaks, and afterwards he makes you promise not to file that.':'You do not get to say it again. He is in your lap before you are through the first word, kissing you, and the mug that says MINE goes off the edge of the desk and breaks. Then he puts his face in your collar and stays there, all of him, far too heavy, until he is asleep and the lamp has burned the room orange, and in the morning he makes you promise not to file that.']],hub)}}]))}

function k65vrAfter(){go(cutBg('#0c0c10'));k65Mark('vr_after');
 say([['','Four in the morning. You have not slept since Misaki came home. Ronin finds you on the landing outside their door, in a chair you carried up from the kitchen, with a scalpel on your knee.'],
  [RN,'Shift change, Vee.'],
  ['K9','I am fine.'],
  [RN,'You’re a fuckin’ statue. Get up.'],
  ['','He does not pull you up. He knows better than to make a noise on this landing. He leans the crowbar against their door frame, sits down on the floor with his back to the wall and his boots across the landing, and waits.'],
  [RN,'They’re in there. I’m out here. You’re in bed down the hall, where I can hear you. Anybody wants them, they come through me, then through four of your fuckin’ monsters, then through you, rested. That’s an order, Mister Foundation.'],
  ['K9','You do not give me orders.'],
  [RN,'I do tonight. Go on. I’ll wake you if a fly lands.'],
  ['','You go. You sleep three and a half hours exactly. When you come back he has not moved, except that the grey hound is lying across his boots with its head up, watching the stairs, and he has a hand on its back.']],()=>{fr('r',4);calm(1);hub()})}

function k65vrGala(){go(cutBg('#14100a'));k65Mark('vr_gala');
 say([['','The foundation’s autumn gala. Ronin owns one suit. He wore it to a funeral he caused. Tonight he has ironed it himself, as he tells everyone, and he has kept on every ring.'],
  [RN,'(to a donor) Pleasure. Love what you done with the orphans. Real generous. You smell like a guy with a second family.'],
  ['','The donor laughs, uncertainly. You steer Ronin to the edge of the room by the elbow.'],
  ['K9','You may not tell donors what they smell like.'],
  [RN,'He’s got a second family, Vee. Check your file. Bet you got a file.'],
  ['K9','...He does have a second family.'],
  ['','You sit where you always sit, at the table by the kitchen doors, where nobody looks. The chair of the board goes up to give the speech. You have written it nine years running and never once given it; as far as anyone in this room knows, the foundation has no founder. Ronin sits at your elbow with your copy of the notes, and as the chair begins he leans in to your ear.']],
  ()=>ask('K9','(Four hundred people are watching the chair. Ronin is murmuring about your tie and what he means to do with it.)',[
   {t:'Sit through the speech. Do not stop him.',fn:()=>{S.f.k65vrGala='stay';fr('r',3);say([
     ['','The chair gives your whole speech. Ronin gives his whole speech, low, in your ear, the entire time, in more detail than yours. You do not move once. At the end there is a standing ovation for the chair, and afterwards she finds you by the kitchen doors and says the speech was more passionate than usual this year.'],
     ['K9','Thank you. Whoever wrote it had a great deal of motivation.'],
     ['',sugOn()?'You leave before dessert. He takes the tie with him.':'You leave before dessert and eat it in the back of the car out of a napkin he stole, his head on your shoulder, still talking about your tie. He takes the tie with him.']],hub)}},
   {t:'Send him to the car.',fn:()=>{S.f.k65vrGala='car';fr('r',2);say([
     ['K9','(without moving your lips) Car.'],
     [RN,'Yes sir.'],
     ['','He says “yes sir” like a threat, and goes. You sit through the chair’s eleven minutes with perfect composure, and you are out of the side door before the applause stops. He is lying across the back seat of the car with his shoes off, eating canapés he stole, and he does not sit up.'],
     [RN,'Took your time. Get in.']],hub)}}]))}

function k65vrRing(){go(cutBg('#0e0a0a'));k65Mark('vr_ring');
 say([['','Two nights before the boat. You find Ronin in your kitchen at four in the morning, after a job, in the apron, frying eggs to the gospel radio. He turns the eggs, turns the radio down, and takes the second skull ring off his right hand. There is a name engraved inside it that you do not recognise.'],
  [RN,'First one’s for the Devil. This one’s for you. Don’t get sentimental, it’s a dead guy’s name.'],
  ['K9','Whose?'],
  [RN,'Second guy I ever did. Nobody you’d know. Real piece of shit, so it’s a compliment.'],
  ['K9','If Friday goes badly—'],
  [RN,'Then you come back for it. Off my hand or off the floor of the boat, I don’t care which. Kiss or kill, Vee. Still pickin’ kiss.']],
  ()=>ask('K9','(The ring is warm from his hand. It fits your ring finger. At some point he measured your finger while you slept, and you did not notice, which ought to alarm you.)',[
   {t:'Put it on.',fn:()=>{S.f.k65vrRing='on';fr('r',4);say([
     ['','You put it on. It fits. You look at him over the eggs.'],
     ['K9','You measured my hand while I was asleep.'],
     [RN,'Twice. Eggs are burnin’.']],hub)}},
   {t:'Put it on the chain under your shirt.',fn:()=>{S.f.k65vrRing='chain';fr('r',4);say([
     ['K9','I cannot wear a skull ring to the board.'],
     [RN,'“I cannot wear a skull ring to the board,” says the guy who fed a finance director to his hounds.'],
     ['','You thread it onto the chain under your shirt, where it sits against your skin. He watches you do it, then turns the radio back up very loud and sings, and does not look at you again until the eggs are on the plates.']],hub)}}]))}

function k65vrEpi(){go(cutBg('#100a08'));k65Mark('vr_epi');const g=S.f.k65vrGala,r=S.f.k65vrRing,t=S.f.k65vrTea;
 const L=[['','January, when you update the files. Ronin finds his on your desk. He has never been allowed to read it. He reads it on your bed with his boots on.'],
  [RN,S.seen&&S.seen.k27_tea?'“Subject drinks other people’s tea.” Fuck you.':'“Subject arrives at seven exactly.” Course I do.'],
  [RN,'“Subject cannot be stopped from comin’ in through the skylight.”'+(S.seen&&S.seen.k65vr_morn?' ...“Subject sleeps on top of me. I sleep eight hours. See medical.”':'')]];
 if(g==='stay')L.push([RN,'“Gala, autumn. Subject described what he would do with my tie for eleven minutes. The chair gave the speech. See attached.” See attached what, Vee? ...Oh. You kept the tie.']);
 else if(g==='car')L.push([RN,'“Gala, autumn. Subject sent to the car. Subject ate forty-one canapés.” You counted?'],['K9','The caterer counted. She billed me.']);
 if(t==='filed')L.push([RN,'And there’s my bit, page four, underlined twice. Still true, asshole.']);
 if(r==='on')L.push([RN,'Last page just says “the ring fits.” That’s it? That’s the whole page?'],['K9','That is the whole page.']);
 else if(r==='chain')L.push([RN,'Last page says “worn under the shirt, against the skin.” ...Don’t look at me. Don’t fuckin’ look at me.']);
 else L.push([RN,'Last page’s blank.'],['K9','That page is for this year.']);
 L.push(['','He shuts the file, puts it under the pillow, lies down on it, and dares you to come and get it.']);
 say(L,()=>{fr('r',2);hub()})}

EVENTS.push({id:'k65vr_morn',when:()=>{try{return K65()&&k65R()==='vr'&&['normal','act2'].includes(S.phase)&&(S.vromDates||0)>=2}catch(e){return false}},run:done=>say([
 ['','You wake at ten. You went to bed at two. You have slept eight hours, which has not happened in fifteen years, and for a moment you assume you have been drugged.'],
 ['','Ronin is asleep on top of you. He runs hot, and he sleeps like a dead man: face down, one arm across your chest like the bar on a fairground ride, the gospel radio going on your nightstand where he put it without asking.'],
 ['K9','(Eight hours. I will have to note this in his file as a medical event.)'],
 [RN,'(into the pillow, not awake) ’S the Devil’s work. Go back t’sleep.'],
 ['','You do. The hounds have to wait for breakfast, which they take personally. The grey one sits by the bed and stares at Ronin until noon.']],()=>{fr('r',2);done()})});

txDef('tx_k65_vr',{with:'r',pov:'v',prio:1,when:()=>K65()&&k65R()==='vr'&&['normal','act2'].includes(S.phase)&&(S.vromDates||0)>=1,nodes:{
 start:{in:()=>['what’re you wearin'],expire:3,
  opts:()=>[{t:'“A suit. I am in a board meeting.”',reply:()=>[],next:'board'},
   {t:'“Your shirt. You left it here.”',fx:()=>fr('r',3),reply:()=>['you’re wearin my shirt','to a board meeting','vee I’m gonna have to sit down']}]},
 board:{in:()=>['take it off','in the board meeting. I’ll wait'],
  opts:()=>[{t:'“The chairman is looking at me.”',fx:()=>fr('r',2),reply:()=>['good','tell him who you’re textin','actually don’t, he’ll want in, they always want in']},
   {t:sugOn()?'“You may take it off yourself. Seven o’clock.”':'“You may tell me to my face. Seven o’clock.”',fx:()=>fr('r',3),reply:()=>['7:00','on the dot. been early once in my life and I’m about to do it again']}]}}});

/* ===================================== V × ANGEL ===================================== */
function k65vaTheatre(){go(cutBg('#0e1214'));k65Mark('va_theatre');
 say([['','For weeks Angel has asked to see the theatre under the house. Tonight you take her down. The table is clean; it is always clean. She walks the length of it in her heels, running one nail along the steel, then sits on it, then lies back on it in a satin slip with her arms over her head, as though it is a shoot.'],
  [AN,'so this is where the magic happens.'],
  ['K9','This is where the magic happens to other people.'],
  [AN,'(looking at the straps) and these are adjustable?'],
  ['K9','They are.'],
  [AN,'(narrating, sweet) and she’s asking about the straps very casually, very normally, like a girl with nothing on her mind at all.']],
  ()=>ask('K9','(She is looking at you upside down off the end of the table.)',[
   {t:'“Get off the table.”',fn:()=>{S.f.k65vaTable='off';fr('a',3);if(!sugOn())return say([
     [AN,'make me.'],
     ['K9','I would rather not make you do anything in this room.'],
     ['','She sits up at once, because she heard what you meant. She kisses you hard enough to knock your reading glasses crooked and makes you carry her up three floors to the kitchen, complaining the whole way that it is so much less interesting, and she falls asleep against your shoulder at the counter halfway through a bowl of cereal, in her slip and your coat.']],hub);say([
     [AN,'make me.'],
     ['K9','I would rather not make you do anything in this room.'],
     ['','She sits up at once, because she heard what you meant. She kisses you hard enough to knock your reading glasses crooked and makes you carry her up three floors to a room with an ordinary bed in it, which, she complains the whole way up, is so much less interesting.']],hub)}},
   {t:'“Stay where you are.”',fn:()=>{S.f.k65vaTable='stay';fr('a',4);if(!sugOn())return say([
     [AN,'(not narrating any more) ...oh.'],
     ['','You turn the big lamp off. She stays on the steel with one arm hanging off the edge, and you lie down on the tiles beside the table in your good suit and hold her hand, and for an hour the two of you look up into the dark and say almost nothing, and she does not narrate a second of it. Afterwards she says the steel was freezing and she would like to come back in the summer.']],hub);say([
     [AN,'(not narrating any more) ...oh.'],
     ['','You lock the theatre door. The straps are, in the end, adjustable. Afterwards she says the steel was freezing and she would like to come back in the summer.']],hub)}}]))}

function k65vaAfter(){go(cutBg('#0c0e0c'));k65Mark('va_after');
 say([['','Some night after Misaki came home, you are in the kennel at two, because the hounds are the only ones in the house who do not ask how you are. Angel finds you there. Her hair is up, she has no makeup on, the rifle is over her shoulder, and she has cancelled every brand deal she had this week without telling anyone.'],
  [AN,'v. you look like something the hounds dug up.'],
  ['K9','I have to be awake.'],
  [AN,'(soft, maria) and here’s v, who hasn’t slept in two days, and he’s going to lie down in the straw right now, because his girlfriend has a rifle and she’s going to sit up with it.'],
  ['K9','Those are cedar shavings.'],
  [AN,'(maria) and he’s arguing about straw, chat, which is a sign of extreme fatigue.'],
  ['','You lie down. The black hound lies down against your back. Angel sits on an upturned bucket by the pen gate with the rifle across her knees, facing the door, and for the next three and a half hours she narrates, under her breath, everything that does not come through it.']],()=>{fr('a',4);calm(1);hub()})}

function k65vaLaunch(){go(cutBg('#2a1428'));k65Mark('va_launch');
 say([['','Angel would like to soft-launch you. She explains what this means twice. It means a photograph of your hand on the steering wheel, at night, with her hand over it, on Maria’s channel, with no caption except a black heart.'],
  [AN,'just the hand. no face. no watch, you’ve got a very rich watch. the hand.'],
  ['K9','My hand has been photographed by the police.'],
  [AN,'not like this it hasn’t.']],
  ()=>ask('K9','(She has the shot already. It is a very good shot.)',[
   {t:'“Post it.”',fn:()=>{S.f.k65vaHand='post';fr('a',3);say([
     ['','She posts it at nine. By midnight there are forty threads examining your hand. They have your age right and the watch wrong. They have decided that the scar on your second knuckle is a cooking injury.'],
     ['K9','(It was a man’s incisor.)'],
     [AN,'they’re calling you “hand guy”. there’s a fan account. it has eleven thousand followers. v, you have FANS.'],
     ['K9','I would like to read the thread about the watch again.']],hub)}},
   {t:'“Keep it.”',fn:()=>{S.f.k65vaHand='keep';fr('a',4);say([
     [AN,'...yeah?'],
     ['K9','I would like there to be a photograph of my hand that only you have seen.'],
     [AN,'ok. ok that’s so much hotter than posting it. you can’t just SAY things, v.'],
     ['','She prints it. The next time you are in her studio, it is taped to the inside of the pink safe door, above the rifle, where nobody will see it unless they have come to take the rifle away.']],hub)}}]))}

function k65vaBoat(){go(cutBg('#100c14'));k65Mark('va_boat');const h=S.f.k65vaHand;
 const L=[['','The night before the boat, Angel sits on your desk and hands you her eyeliner.'],
  [AN,'you have the steadiest hands i know. do my eyes. if i die on that boat i want to die with a wing nobody could have done better.'],
  ['K9','You will not die on the boat.'],
  [AN,'that’s not a reason to have bad eyeliner.'],
  ['','You draw each line in one pass, steady as a suture, with your other hand on her jaw. She keeps her eyes shut and narrates under her breath: “and he’s so close, and he smells like the vault, and she isn’t going to cry, because it’ll ruin it.”'],
  [AN,'(eyes still shut) what’s the last quote going to be. in my file. if.'],
  ['K9','I will not be adding a last one.']];
 if(h==='post')L.push([AN,'hand guy says i’m not allowed to die. chat is going to be so upset if hand guy turns out to be a liar.']);
 else if(h==='keep')L.push([AN,'your photo’s in the safe. anyone who comes for the rifle has to look at your hand first. that’s the rule now.']);
 L.push(['','She opens her eyes. The wings are perfect, and they match. She checks them in the black glass of your monitor, then cries and ruins them, and makes you do them again.']);
 say(L,()=>{fr('a',3);hub()})}

function k65vaEpi(){go(cutBg('#2a1428'));k65Mark('va_epi');const h=S.f.k65vaHand;let L;
 if(h==='post')L=[['','Hand guy has two hundred thousand followers now. Maria posts your hand about once a month: on the wheel, round a coffee cup, holding the lead of a hound just out of shot. The comments write fiction about it. Angel reads you the good ones in bed, with a different voice for each.'],
  [AN,'this one says hand guy is a surgeon. this one says he’s a hitman. this one says he’s “definitely a sad billionaire”. chat is so smart.'],
  ['K9','I would like to meet the third one.'],[AN,'NO.']];
 else if(h==='keep')L=[['','The photograph of your hand is still taped inside the safe door, curling at one corner now. Angel opens the safe every Sunday to clean the rifle and says good morning to both of them.'],
  [AN,'hi baby. hi other baby.']];
 else L=[['','Maria’s channel has never shown so much as your sleeve. Angel says it is the most romantic thing she has ever not posted.']];
 if(S.f.k65vaTable==='stay')L.push([AN,'it’s summer next week. i’m just saying. the steel will be warm.']);
 L.push(['','She turns the ring light on and points it at you, and you let her, and she does not press record.']);
 say(L,()=>{fr('a',2);hub()})}

EVENTS.push({id:'k65va_morn',when:()=>{try{return K65()&&k65R()==='va'&&['normal','act2'].includes(S.phase)&&(S.vromDates||0)>=2}catch(e){return false}},run:done=>say([
 ['','Angel’s alarm is a recording of Maria saying “good morning, beautiful, you’re going to do amazing today” in the sweet voice. She sleeps through it. You do not.'],
 ['','You have heard it fourteen times. On the fifteenth, without thinking, you answer it.'],
 ['K9','Thank you. I will try.'],
 ['','Angel, who was not asleep, laughs so hard into the pillow that the pale hound comes upstairs to check on her.']],()=>{fr('a',2);done()})});

txDef('tx_k65_va',{with:'a',pov:'v',prio:1,when:()=>K65()&&k65R()==='va'&&['normal','act2'].includes(S.phase)&&(S.vromDates||0)>=1,nodes:{
 start:{in:()=>['what are you doing'],expire:3,
  opts:()=>[{t:'“Reading.”',reply:()=>[],next:'read'},
   {t:'“Thinking about you.”',fx:()=>fr('a',2),reply:()=>['in what way','be specific v. use the formal voice'],next:'spec'}]},
 read:{in:()=>['read to me','i don’t care what it is'],
  opts:()=>[{t:'“Section four, subsection two. The company shall indemnify its directors…”',fx:()=>fr('a',2),reply:()=>['say subsection again','slower','ok i’m coming over. keep the glasses on']},
   {t:'“It is the coroner’s report on a man you shot.”',fx:()=>fr('a',3),reply:()=>['OH','read me the part where they can’t work out the angle','i love it when they can’t work out the angle']}]},
 spec:{in:()=>['go on'],
  opts:()=>[{t:'“Your lipstick on my collar. I have not had it cleaned.”',fx:()=>fr('a',3),reply:()=>['you kept the shirt','you KEPT THE SHIRT','i’m going to put it on all of them. every shirt you own']},
   {t:'“That is classified.”',fx:()=>fr('a',1),reply:()=>['i have the code to a gun safe and a ring light','i will get it out of you','tonight']}]}}});

/* ===================================== DELIVERY ===================================== */
const K65B={
 mr:[{id:'mr_booth',t:'Ronin: “church. midnight. wear somethin’ you can kneel in.”',sub:'costs time · date · the church across town',when:()=>S.phase==='normal'&&S.romDates>=1,run:k65mrBooth},
  {id:'mr_after',t:'Ronin, at the end of the day',sub:'costs time · he asks first',when:k65Post,run:k65mrAfter},
  {id:'mr_radio',t:'A job with Ronin on the radio',sub:'costs time · date · you on the roof, him on the stairs',when:k65A2,run:k65mrRadio},
  {id:'mr_boat',t:'Ronin: “roof. bring a coat. I ain’t got one.”',sub:'costs time · before the boat',when:k65A3,run:k65mrBoat},
  {id:'mr_epi',t:'The church across town, after midnight',sub:'costs time · the booth',when:()=>S.phase==='epilogue',run:k65mrEpi}],
 ma:[{id:'ma_bet',t:'Angelic: “roof. bring the rifle. loser does what winner says.”',sub:'costs time · date · a bet',when:()=>S.phase==='normal'&&S.romDates>=1,run:k65maBet},
  {id:'ma_after',t:'Angelic, with the pink pads',sub:'costs time · she asks first',when:k65Post,run:k65maAfter},
  {id:'ma_live',t:'Maria goes live; you’re off camera',sub:'costs time · date · stay out of shot',when:k65A2,run:k65maLive},
  {id:'ma_boat',t:'Angelic narrates you',sub:'costs time · her roof, before the boat',when:k65A3,run:k65maBoat},
  {id:'ma_epi',t:'Angelic: “i’m collecting on the bet”',sub:'costs time · the roof, again',when:()=>S.phase==='epilogue',run:k65maEpi}],
 vr:[{id:'vr_mugs',t:'Ronin brings two mugs',sub:'costs time · date · since the tea',when:()=>S.phase!=='after'&&S.vromDates>=1&&!!(S.seen&&S.seen.k27_tea),run:k65vrMugs},
  {id:'vr_after',t:'Ronin, on the landing',sub:'costs time · he takes the door',when:()=>['after','act2'].includes(S.phase),run:k65vrAfter},
  {id:'vr_gala',t:'The foundation’s gala, with Ronin',sub:'costs time · date · he owns one suit',when:k65A2,run:k65vrGala},
  {id:'vr_ring',t:'Ronin, frying eggs at four',sub:'costs time · before the boat',when:k65A3,run:k65vrRing},
  {id:'vr_epi',t:'Ronin finds his file',sub:'costs time · January',when:()=>S.phase==='epilogue',run:k65vrEpi}],
 va:[{id:'va_theatre',t:'Angelic asks to see the theatre',sub:'costs time · date · under the house',when:()=>S.phase!=='after'&&S.vromDates>=1,run:k65vaTheatre},
  {id:'va_after',t:'Angelic in the kennel',sub:'costs time · she sits up with the rifle',when:()=>['after','act2'].includes(S.phase),run:k65vaAfter},
  {id:'va_launch',t:'Angelic wants to soft-launch you',sub:'costs time · date · your hand, on her channel',when:k65A2,run:k65vaLaunch},
  {id:'va_boat',t:'Angelic: “do my eyeliner for the boat”',sub:'costs time · before the boat',when:k65A3,run:k65vaBoat},
  {id:'va_epi',t:'Angelic’s studio, the ring light on',sub:'costs time · Maria’s channel',when:()=>S.phase==='epilogue',run:k65vaEpi}]};
function k65Due(){if(!K65())return null;const r=k65R();if(!r||!K65B[r])return null;for(const b of K65B[r]){if(k65Done(b.id))continue;let ok=false;try{ok=!!b.when()}catch(e){}if(ok)return b}return null}
const _shK65=sideHub;sideHub=function(late){const o=_shK65(late);try{if(!K65())return o;const b=k65Due();if(!b)return o;
 return o.concat([{t:'♥ '+b.t,sub:b.sub,dis:!!late,fn:()=>{spend();b.run()}}])}catch(e){return o}};
/* after the first three dates, "Date night" plays the beat that is due instead of repeating the third date */
const _rdK65=romDate;romDate=function(k){try{if(K65()&&k65R()==='m'+k&&(S.romDates||0)>=3){const b=k65Due();if(b){S.romDates=(S.romDates||0)+1;spend();save();return b.run()}}}catch(e){}return _rdK65(k)};
const _vdK65=vromDate;vromDate=function(k){try{if(K65()&&k65R()==='v'+k&&(S.vromDates||0)>=3){const b=k65Due();if(b){S.vromDates=(S.vromDates||0)+1;spend();save();return b.run()}}}catch(e){}return _vdK65(k)};

/* ===================================== ENDINGS ===================================== */
const _xeK65=extraEnding;extraEnding=function(){const L=_xeK65();if(!S||!S.f)return L;const f=S.f;
 if(S.rom==='r'){if(f.k65mrBooth==='true')L.push('There is a sentence in silver pen on the inside of a confessional door in the church across town. The priest has never read it. Ronin checks on it every Sunday.');
  else if(f.k65mrBooth==='filthy')L.push('The confessional in the church across town has eight screws in its grille now. Ronin owns a bigger screwdriver.');
  else if(f.k65mrBooth==='his')L.push('Once a month Ronin kneels in the church across town and confesses to Misaki that he isn’t sorry about any of them, and that he loves them, in that order.');}
 if(S.rom==='a'){if(f.k65maBet==='won')L.push('Every so often, at dinner, Misaki says “bet”, and Angel takes Maria off at the table, one lash at a time.');
  else if(f.k65maBet==='lost')L.push('Angel is still saving what Misaki owes her from the roof. She smiles with all her teeth about it every Sunday.');
  else if(f.k65maBet==='draw')L.push(sugOn()?'The bet on the roof was a draw, and Misaki and Angel are still working out who goes first. Angel keeps a spreadsheet.':'The bet on the roof was a draw. Every Sunday Misaki and Angel settle it with a nap at the same time, under one blanket. Angel keeps a spreadsheet.');
  if(f.k65maLive==='bad')L.push('A clip called “the flush” on Maria de la Rosa’s channel has forty million views. Nobody in the comments knows whose hand it was.');}
 if(S.vrom==='r'){if(f.k65vrRing==='on')L.push('V wears a dead stranger’s skull ring on his ring finger to every board meeting. Nobody on the board has asked about it.');
  else if(f.k65vrRing==='chain')L.push('V wears a skull ring on a chain under his shirt. Ronin is the only one who knows it is there, and he checks most nights.');
  if(f.k65vrTea)L.push('There is a mug in V’s study that says VEE’S. DO NOT. (POISON). V drinks first. Ronin watches him swallow.');}
 if(S.vrom==='a'){if(f.k65vaHand==='post')L.push('A pair of hands on Maria de la Rosa’s channel has two hundred thousand followers. They belong to a man the city is afraid of, and the comments have decided he is a sad billionaire.');
  else if(f.k65vaHand==='keep')L.push('Taped inside Angel’s pink safe, above the rifle, is a photograph of V’s hand that only she has seen.');}
 return L};
