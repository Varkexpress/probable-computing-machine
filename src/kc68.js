/* ===================== V AND RONIN, OFF HOURS (kc68) =====================
   General slice-of-life for the V × Ronin route (S.pov==='v' && S.vrom==='r'). No plot and no sequenced act beats
   (kc67 has those). Anything here can happen in the normal phase, Act II, Act III before the boat, or the epilogue; it
   is all off in the kidnapping's taken/after phases and while Misaki is in the infirmary, and none of it mentions the
   kidnapping, so kdSA() needs no switch.
   1. Location events: walking into a room on the route sometimes plays a short scene (once each). They share kc64's
      one-a-day cap (S.f.k64LDay), so a day has at most one location scene from either module.
   2. Morning events: one every other morning at most, through the shared mbOk()/mbUse() cap.
   3. A repeatable side activity, "Spend the evening with Ronin": once a day, rotating short scenes.
   4. Phone threads (Ronin, Misaki, Angel) and server pings while the route is on.
   5. Ending lines for some of the choices.
   Flags (all in S.f): k68Brolly 'rent'|'stand', k68Boots 'new'|'back', k68Carve 'desk'|'pocket', k68Truck
   'kerb'|'signal', k68Pink 'pink'|'cold', k68Sing 'sang'|'home', k68Bingo 'table'|'hounds', k68Heat 'cold'|'split',
   k68EveN (side activity counter), k68MLast (last morning). Notes: docs/notes_kc68.md. */
const K68=()=>{try{return !!S&&S.pov==='v'&&S.vrom==='r'&&!isLone()&&!S.dark&&!(S.f&&S.f.abroad)&&!(S.kd&&S.kd.med)&&['normal','act2','act3','epilogue'].includes(S.phase)}catch(e){return false}};
const K68M=(...a)=>['hitmeuppp',MV(...a)];
const k68Ron=()=>typeof ronWhere!=='function'||!ronWhere();

/* ===================================== 1 · LOCATION EVENTS ===================================== */
const L68=[];
const l68=(id,rooms,p,when,run)=>L68.push({id,rooms,p,when:()=>{try{return K68()&&when()}catch(e){return false}},run});

l68('vr68_brolly',['atrium'],.4,()=>true,done=>say([
 ['','There is a crowbar in your umbrella stand. It is standing between your black umbrella and your other black umbrella, hooked end up, as if it has always lived there.'],
 ['K9','Ronin.'],
 [RN,'(from the couch, not turning round) It’s gonna rain.'],
 ['K9','It has not rained for nine days.'],
 [RN,'Gonna rain on somebody.'],
 ['','You take it out. It is still warm from his hand, and you stand there holding it for a moment, and then you put it back without meaning to. He has been watching you over the back of the couch with his chin on his arms.'],
 [RN,'Aw, look at that. You put it back. That’s a lease, Vee. He lives here now.']],()=>ask('K9','(The crowbar is back in the stand. Both umbrellas are leaning away from it.)',[
 {t:'“Then he pays rent.”',fn:()=>{S.f.k68Brolly='rent';fr('r',3);save();say([
  [RN,'Yeah? What’s the rent?'],
  ['K9','He comes home every night.'],
  ['','Ronin gets up off the couch at once, which he has never done for anything on television, and kisses you up against the coat hooks hard enough to knock the stand over. The umbrellas roll under the hall table. Nobody picks them up until morning.']],done)}},
 {t:'Move the umbrellas to the cupboard.',fn:()=>{S.f.k68Brolly='stand';fr('r',2);save();say([
  ['','You put both umbrellas in the hall cupboard. The crowbar has the stand to itself.'],
  [RN,'Look at him. He’s got his own room. You’re spoilin’ him.'],
  ['','From then on, most nights, his rings are hanging off the hook end of it when you come in, all nine, like a bunch of keys.']],done)}}])));

l68('vr68_suit',['ronin'],.4,()=>k68Ron(),done=>say([
 ['','Ronin’s apartment. His one suit is hanging off the back of the bedroom door. On the back of the jacket there is a shiny triangle, the exact shape of an iron.'],
 [RN,'Court Thursday. Parkin’ tickets. Forty-one of ’em. Gotta look like a guy who pays parkin’ tickets.'],
 ['K9','You ironed the wool with nothing between it and the iron.'],
 [RN,'Had my hand between it and the iron, mostly.'],
 ['','He does not own an ironing board. You do it on the workbench in his workshop, on a towel, with a damp handkerchief over the cloth. He sits on the far end of the bench in his boxers and his rings, swinging his boots, and watches you press the trousers as if you were picking a lock.'],
 [RN,'You’re real good at that. It’s kinda filthy how good you are at that.'],
 ['K9','It is a crease.'],
 [RN,'It’s a crease when anybody else does it. Do the other leg slower.'],
 ['','You do the other leg slower. Afterwards the trousers hang on the door for some time with nobody in them. On Thursday he wears them to court with a crease you could slice bread on, and the magistrate halves the fine.']],()=>{fr('r',3);done()}));

l68('vr68_boots',['kennel'],.4,()=>true,done=>say([
 ['','Ronin came in through the skylight at two and left his boots at the top of the stairs. At seven they were gone.'],
 ['','You find them in the kennel. The grey hound has one and the pale hound has the other. Each boot is in a bed, unchewed, with a hound curled round it the way a hound keeps a thing it has decided is a puppy.'],
 [RN,'(in the kennel doorway, in his socks) Gimme. C’mon. Them’s my kickin’ boots.'],
 ['','The grey hound puts its chin on the boot and looks at him.'],
 ['K9','They have adopted them.'],
 [RN,'They’re boots, Vee.'],
 ['K9','They smell of you. The hounds have decided you live here, and that you must be kept somewhere.'],
 [RN,'...They said that?'],
 ['K9','They said it to me.']],()=>ask('K9','(He is standing in his socks. Neither hound has blinked.)',[
 {t:'Buy him a new pair.',fn:()=>{S.f.k68Boots='new';fr('r',3);save();say([
  ['','You buy him a new pair that afternoon, black, steel toes, the same make. He scuffs them on your gravel for twenty minutes before he will wear them indoors.'],
  ['','The old pair stays in the kennel. When he goes home at night the grey hound sleeps with its nose inside one of them.'],
  [RN,'That’s my dog now. Don’t argue. I can see it in his face.']],done)}},
 {t:'“Give them back.”',fn:()=>{S.f.k68Boots='back';fr('r',3);save();say([
  ['K9','Give.'],
  ['','They give. Each hound gets up, picks up its boot, carries it across the kennel and lays it at Ronin’s feet, soaking wet, and goes back to its bed with enormous dignity.'],
  ['','He puts them on with the spit still in them. His eyes have gone red round the edges.'],
  [RN,'It’s the spit. Fuck off. It’s the spit, Vee.']],done)}}])));

l68('vr68_glasses',['archive'],.4,()=>true,done=>say([
 ['','Ronin is at the long table in the archive, in your reading glasses, reading the file on a man you mean to feed to the hounds on Friday. The glasses are gold wire and too small for his face, and they sit halfway down his nose.'],
 [RN,'How old’re you? These’re for an old man. Everything’s huge. I can see this asshole’s pores in his passport photo.'],
 ['K9','Take them off. You will damage your eyes.'],
 [RN,'(looking up at you over the top of them) Whaddya reckon. Do I look like I got a library card?'],
 ['','He looks like a schoolteacher who keeps a crowbar in his desk drawer. You do not say so. Your face says it for you, and he sees it, and the grin starts at one side of his mouth.'],
 [RN,'Oh. Oh, you like it. Mister Foundation’s got a thing for specs.'],
 ['K9','I have a thing for my glasses being returned to me.'],
 [RN,'So come get ’em.'],
 ['','You come and get them. It takes a great deal longer than taking off a pair of glasses should take, the file ends up on the floor, and the man in it goes to the hounds on Sunday instead.']],()=>{fr('r',3);done()}));

l68('vr68_heat',['ops'],.4,()=>true,done=>say([
 ['','Your house is kept cold. The hounds like it cold, and so do you. Today it is warm enough on the ops deck to grow tomatoes.'],
 ['','Somebody has turned the heating up as far as it goes. There is a skull drawn on the panel in silver pen, and the override code has been changed to 666.'],
 ['K9','Ronin.'],
 [RN,'(over the house speakers, from somewhere upstairs) Was freezin’. This place is a morgue, Vee. Your house is colder’n the stuff in your basement.'],
 ['K9','You told Misaki you have never owned a coat. You said you run hot.'],
 [RN,'I run hot outside. In here I’m a lizard on a cold rock.'],
 ['','The grey hound is lying flat out on the floor of the ops deck, panting at you, like a witness.']],()=>ask('K9','(The code is 666. It took you four seconds.)',[
 {t:'Turn it back down.',fn:()=>{S.f.k68Heat='cold';fr('r',2);save();say([
  ['','You turn it back down. Within the hour Ronin is in your study, in your chair, in your long coat, with his boots on your desk and the collar turned up round his ears like a vampire’s.'],
  [RN,'Found a coat. Possession’s nine-tenths. Don’t look at me like that.'],
  ['','He wears it all evening. The coat smells of him for two days afterwards, and you do not send it to be cleaned.']],done)}},
 {t:'Split the difference.',fn:()=>{S.f.k68Heat='split';fr('r',3);save();say([
  ['','You set it halfway. The hounds sulk. Ronin sulks. You read in the atrium all evening, very comfortable, while the two of them lie at your feet and complain at you from both sides.'],
  [RN,'This is what you’re like. This is what you’re like in a relationship. A fuckin’ compromise.']],done)}}])));

l68('vr68_carve',['ronin'],.4,()=>k68Ron()&&!S.f.k68Carve,done=>say([
 ['','Ronin’s workshop. He has something in the vice under a cloth, and when you walk in he throws himself across it like a man lying on a grenade.'],
 [RN,'Nope. Out. Ain’t ready.'],
 ['K9','What is it?'],
 [RN,'It’s a crowbar. It’s wood. I’m whittlin’. Men whittle, Vee, it’s in the Bible. Fuck off.'],
 ['','There are shavings all over the floor. In the bin there are four small wooden dogs with the wrong number of legs.'],
 ['','Two Sundays later he puts it on your desk without a word and walks straight out of the room. It is a hound, lying down, the size of your palm, carved in something dark and oiled. One ear is up and one is down. It is the old hound, to the life. On the underside he has burned a very small skull with a hot nail.']],()=>ask('K9','(It is still warm from his pocket.)',[
 {t:'Keep it on the desk.',fn:()=>{S.f.k68Carve='desk';fr('r',4);save();say([
  ['','It goes on the desk beside the pen tray, facing the door, where the real one lies when you work. The old hound comes in, sniffs it for a long time, and lies down next to it.'],
  ['','Ronin pretends, in the doorway, to be looking at something on the ceiling.']],done)}},
 {t:'Keep it in your coat pocket.',fn:()=>{S.f.k68Carve='pocket';fr('r',4);save();say([
  ['','It goes in the pocket of your coat. In board meetings you hold it under the table.'],
  ['','He finds out three weeks later, when he puts his hand in your pocket for your keys and comes out with it. He looks at it for a while. Then he goes out into the garden and stands there with his back to the house until he is ready to come in.']],done)}}])));

l68('vr68_truck',['garage'],.4,()=>true,done=>say([
 ['','Ronin’s truck is in your garage, parked across two bays and part of a third. He is leaning on it, holding the keys out to you.'],
 [RN,'You drive like a hearse. I watched you. You indicate in empty car parks.'],
 ['K9','The law requires it.'],
 [RN,'The law’s in the back of my truck under a tarp. Get in.'],
 ['','You get in. You drive him round the industrial estate at the speed limit with both hands on the wheel, and he puts his boots up on the dashboard and gives instructions.'],
 [RN,'Kerb. Take the kerb. Nah, take it, it’s a truck, it wants the kerb. ...Vee. Vee, you went round a pigeon.'],
 ['K9','It was in the road.'],
 [RN,'It was in YOUR road. Horn. Lean on it. Like it owes you money.'],
 ['','You lean on it. The horn on Ronin’s truck plays the first line of a hymn, at a volume that stops a forklift on the far side of the estate.'],
 [RN,'Look at that guy. He’s prayin’. You did that.']],()=>ask('K9','(A roundabout is coming. He is watching your hands.)',[
 {t:'Take the kerb.',fn:()=>{S.f.k68Truck='kerb';fr('r',3);save();say([
  ['','You take the kerb. You take the next one as well, on purpose, and then a traffic cone, which goes under the truck and scrapes along with you for half a mile like something screaming.'],
  ['','Ronin laughs so hard he has to hold on to the dashboard. You park across two bays and part of a third, and he says you are ready for the city.']],done)}},
 {t:'Indicate.',fn:()=>{S.f.k68Truck='signal';fr('r',3);save();say([
  ['','You indicate, and slow down, and go round the roundabout correctly. Then you go round it again, and again, faster each time, indicating perfectly, until the truck is up on two wheels and he has a hand flat on the roof.'],
  [RN,'...Say you did that on purpose.'],
  ['K9','I did that on purpose.'],
  [RN,'Pull over.'],
  ['','You pull over, indicating. The windows of the truck take some time to clear.']],done)}}])));

l68('vr68_pink',['laundro'],.4,()=>true,done=>say([
 ['','The laundromat at three in the morning. Ronin did the washing, and he did yours with his. Your white shirts come out of the machine the colour of a tongue.'],
 [RN,'Huh. Pink.'],
 ['K9','Something in that load was red.'],
 [RN,'One of my socks. It was white once. Had a long week.'],
 ['K9','I have a board meeting at nine.'],
 [RN,'So go pink. Pink’s in. Angel wears pink, and Angel’s the scariest bitch in the city.']],()=>ask('K9','(He is holding up a shirt to the strip light, admiring it.)',[
 {t:'Wear it to the board.',fn:()=>{S.f.k68Pink='pink';fr('r',3);save();say([
  ['','You wear it to the board. Nobody says anything for two hours. At the end of the meeting the finance director stops you by the lift, and asks, very carefully, where you buy your shirts.'],
  ['K9','(text) The finance director likes the shirt.'],
  [RN,'(text) what’s his name. I wanna thank him personally'],
  ['K9','(text) No.']],done)}},
 {t:'Wash them again, in cold.',fn:()=>{S.f.k68Pink='cold';fr('r',2);save();say([
  ['','You wash them again on cold and stand guard over the machine. He sits on the dryer next to it, kicking his heels against the door and singing with the radio, until they come out a shade paler, the colour of chewing gum.'],
  [RN,'Better on you than white. Gum’s your colour.'],
  ['','He holds one up against you to prove it, and then kisses you up against the change machine to prove something else, and does not explain what.']],done)}}])));

l68('vr68_arcade',['mall'],.35,()=>true,done=>say([
 ['','The arcade in the square, after midnight. There is a zombie game with two plastic pistols on cables, and Ronin has fed it eleven dollars in quarters.'],
 ['','You hit everything you aim at. Ronin hits the zombies, and the screaming civilians, and a dog, and the man in the helicopter who is trying to rescue you both.'],
 ['K9','Those are civilians.'],
 [RN,'They’re lookin’ at me funny. They had it comin’.'],
 ['','You finish first on the high score table by a margin the machine has not seen before. It asks for your initials, and you put in a single V and leave the other two blank.'],
 ['','Ronin comes second, a very long way down, and puts in HIS.']],()=>{fr('r',2);done()}));

l68('vr68_sing',['mall'],.35,()=>frT('a')>=1,done=>say([
 ['','A karaoke box off the square, with a sticky table and a tambourine. Angel booked it. She has sung nine songs. Misaki has sung six, standing on the seat. Ronin has sung the same gospel number five times, and on his knees for the last two.'],
 [RN,'Duet. Vee. It’s a love song, it’s got a part for the low guy.'],
 ['K9','No.'],
 [RN,'It’s got a part for a guy who says no a lot.'],
 ['K9','No.'],
 ['','So he sings both parts himself, and he does yours in your voice, very upright, very formal, with every word pronounced in full. Angel has to lie down on the bench.'],
 [AN,'v. v he’s doing u. he’s doing u so good. i’m going to be sick.'],
 K68M('do the face. do the face he does','ronin do the face he does when the hounds eat','Do the face he does at the hounds. Do it.','Do the face he makes when the hounds are eating. The proud one. Ronin, do it, I’ll pay you.'),
 ['','At one in the morning, while Angel is choosing and Misaki is in the bathroom, Ronin puts the second microphone down on the table in front of you without a word, and goes back to his screen.']],()=>ask('K9','(The microphone is sitting by your glass.)',[
 {t:'Pick it up.',fn:()=>{S.f.k68Sing='sang';fr('r',4);fr('a',1);save();say([
  ['','You pick it up. You come in on the low part on the right beat, in tune, because you had eleven years of piano lessons and nobody has asked you to sing in any of the years since.'],
  ['','Ronin turns round so fast he drops the tambourine. He sings the rest of the song to the side of your face. You keep your eyes on the words on the screen to the end, because if you look at him you will stop.'],
  [AN,'posting this. no i’m not. yes i am. no. i’m keeping it. i’m keeping it forever and i’m going to play it at ur funerals']],done)}},
 {t:'Take it home.',fn:()=>{S.f.k68Sing='home';fr('r',4);save();say([
  ['','You put the microphone in your coat pocket and pay the man at the desk for it on the way out.'],
  ['','At four in the morning, in your kitchen, with only the hounds there to hear, you sing him the low part once, start to finish. He sits on the island with his mouth open, and for the length of a song he does not make a single joke.'],
  [RN,'...Again. Do it again. I wasn’t ready.']],done)}}])));

l68('vr68_range',['dp_range'],.4,()=>true,done=>say([
 ['','The range under the house. You put five rounds through the same hole in the paper man’s forehead. Ronin puts five rounds into the ceiling and the floor and, once, the lamp.'],
 [RN,'Guns are for cowards and Angel.'],
 ['K9','Your elbow is locked. Let me.'],
 ['','You stand behind him and fix his stance, a hand on each side of his waist, the way he once fixed yours in a bowling alley.'],
 ['K9','Hips.'],
 [RN,'Don’t you fuckin’ dare.'],
 ['K9','No. Hips.'],
 ['','He misses the next five as well, because he is laughing too hard to stand up. Then he puts the pistol down on the counter, takes the crowbar off his back, and throws it underarm down the lane. It goes through the paper man’s head and sticks in the wall behind.'],
 [RN,'Hit him, though.']],()=>{fr('r',3);done()}));

l68('vr68_coat',['roof'],.4,()=>true,done=>say([
 ['','The roof, late. It is cold enough to see your breath, and Ronin is up here in a T-shirt, because he has never owned a coat and does not intend to start now.'],
 ['','You sit down next to him on the parapet and open your coat, and he gets inside it with you without being asked. It is a long coat, and nowhere near long enough for two. Most of him stays outside it, and he lets you know about it.'],
 [RN,'Lizard on a rock, Vee. Lizard on a cold rock.'],
 ['','He falls asleep in it at about one, half inside your coat, with his head on your shoulder and his rings cold against your wrist. You do not move. At five the old hound comes up the stairs and lies down across both your feet.'],
 ['','Misaki comes up at seven with her coffee and stops at the top of the stairs.'],
 K68M('...','oh my god. look at u two','You two look like a pile of coats someone’s giving to charity.','You look like a pile of coats somebody’s about to give to charity. I’m taking a picture. I’m taking it for the server. Don’t move, V, you’re fine, you’re a coat.')],()=>{fr('r',3);calm(2);done()}));

l68('vr68_bath',['vbath'],.4,()=>true,done=>say([
 ['','The door of your bathroom is open, and your bath is full of Ronin. It is a deep bath. He has his knees up out of the water like two islands and his rings in a row on the soap dish, and he is singing a hymn from the gospel radio with the echo off the tiles turned up as far as it goes.'],
 [RN,'There’s room.'],
 ['K9','There is no room. You have put most of the water on the floor.'],
 [RN,'There’s room if you lie on top. Physics, Vee.'],
 ['K9','That is not physics.'],
 [RN,'So get in here and prove it ain’t.'],
 ['','You get in and attempt to prove it. The water on the floor gets deeper. The grey hound comes up to see what the noise is and stands in the doorway with its head on one side, until a wet sponge hits the door and the door swings shut on it.']],()=>{fr('r',3);done()}));

/* how they fire: on walking into a room, sometimes, once each; one a day, shared with kc64's location events */
const K68ROOMS=[...new Set(L68.reduce((a,e)=>a.concat(e.rooms),[]))];
const l68Pool=id=>L68.filter(e=>e.rooms.includes(id)&&!S.seen[e.id]&&e.when());
function l68Run(e,done){S.seen[e.id]=1;S.f.k64LDay=S.day;S.f.k68LN=(S.f.k68LN||0)+1;save();e.run(done||(()=>{}))}
function l68Try(id,force){if(!S||!K68()||S.f.k64LDay===S.day&&!force)return null;const pool=l68Pool(id);if(!pool.length)return null;const e=pk(pool);if(!force&&Math.random()>e.p)return null;return e}
function l68Wait(id,e,n){setTimeout(()=>{if(!S||!scene||!scene.isRoom||S.room!==id||S.seen[e.id]||S.f.k64LDay===S.day)return;if(dlg||ctrl||(typeof mgOn==='function'&&mgOn())){if(n<8)l68Wait(id,e,n+1);return}l68Run(e)},1000)}
K68ROOMS.forEach(id=>{const R=ROOMS[id];if(!R)return;const o=R.enter;R.enter=function(){const r=o?o.apply(this,arguments):undefined;
 try{const e=l68Try(id);if(e)l68Wait(id,e,0)}catch(x){}return r}});

/* ===================================== 2 · MORNINGS ===================================== */
const M68=[];
const m68=(id,when,run)=>M68.push({id,when:()=>{try{return K68()&&when()}catch(e){return false}},run});

m68('m68_cook',()=>true,done=>say([
 ['','You come down at six and the kitchen is on fire, a little. Ronin is in the apron, beating out a frying pan with a tea towel.'],
 [RN,'Breakfast. Sit. Don’t look at the pan.'],
 ['','He has laid the island for two, with a candle in a bottle, and there is a heap of something sliced and browned in the pan that he is very proud of.'],
 ['K9','Where did you find the meat?'],
 [RN,'Back of the big fridge. Second shelf. Real nice cuts, Vee, real lean. Somebody took care of these.'],
 ['K9','The second shelf is for the hounds.'],
 ['','Ronin stops with the spatula in the air.'],
 [RN,'...Who was it?'],
 ['K9','A landlord. He kept his tenants’ deposits and their heating money.'],
 ['','He tips the lot into the four bowls by the back door, and the hounds come in at a gallop.'],
 [RN,'Had it comin’. Crumble for breakfast, then. Don’t argue. Get the big spoon.']],()=>{fr('r',2);done()}));

m68('m68_bingo',()=>true,done=>say([
 ['','Ronin wakes you at seven by sitting on you. It is Tuesday, and on Tuesdays there is bingo in the hall behind his church.'],
 ['','He has been going for years. He has his own dabber, red, and his own chair, and the old women at his table call him “the young man” and feed him biscuits out of their handbags. Today he has brought you. They look at you for a long time.'],
 [RN,'This here’s Vee. He’s mine. He don’t talk much and he’s real rich.'],
 ['','A woman in a lilac cardigan pats your hand and says you have kind eyes. Nobody in your life has said that to you before, and you do not know where to put your face.'],
 ['','The priest calls the numbers. You play four cards and Ronin plays nine. When the priest calls legs eleven, Ronin whistles, and the whole table whistles with him, and the priest sighs into the microphone.'],
 ['','You win the last game, a full house, on a card you were not watching, because Ronin was dabbing it for you under the table. The prize is a ham.']],()=>ask('K9','(The whole hall is looking at you, and at the ham.)',[
 {t:'Give the ham to the table.',fn:()=>{S.f.k68Bingo='table';fr('r',3);save();say([
  ['','You give the ham to the table. The women are delighted with you. The woman in the lilac cardigan says she is going to knit you something.'],
  [RN,'(on the way out) She’s gonna knit you somethin’. You know what that means? You’re in. You’re in for life. You can’t leave me now, she’ll find you.']],done)}},
 {t:'Take the ham home for the hounds.',fn:()=>{S.f.k68Bingo='hounds';fr('r',2);save();say([
  ['','You carry the ham home under your arm. The hounds eat it in a minute and a half, bone and all.'],
  [RN,'First honest thing that church ever gave away.']],done)}}])));

m68('m68_shirt',()=>true,done=>say([
 ['','You wake at nine in Ronin’s apartment, with the bells going in the church across the road, on his mattress, which is on the floor of a room with a crowbar on every wall.'],
 ['','He is at the stove in your shirt. It does not close over his chest. He has done up the middle button, out of respect.'],
 [RN,'Mornin’, Mister Foundation. Coffee’s in a saucepan. Don’t start about the saucepan.'],
 ['K9','Where are my clothes?'],
 [RN,'Your shirt’s on me. Your trousers are on the landin’. Your tie’s...'],
 ['','He points up with the spoon. Your tie is going round slowly on the ceiling fan.'],
 ['','You have a board meeting at ten. You go in your own suit, and his T-shirt under it, the one with a skull on the front that has been washed so many times you can see through it. Nobody at the board can see it. You can feel it all morning.'],
 [AN,'(text) why is ronin wearing ur shirt in a selfie on the server'],
 [AN,'(text) he captioned it “spoils.” i’m screaming. i’m in a meeting with a brand and i’m screaming']],()=>{fr('r',3);fr('a',1);done()}));

m68('m68_choir',()=>true,done=>say([
 ['','Six in the morning. There is singing in the kitchen. Ronin has the gospel radio up loud, and he is conducting with a wooden spoon, and all four of the hounds are sitting in a row in front of him with their heads back, howling along with the choir.'],
 [RN,'Altos! Where’re my altos! There she is. Beautiful.'],
 ['','The old hound is the alto. She is flat. He does not tell her.'],
 [RN,'(to you, not stopping) They got real feelin’, Vee. Better’n my church. My church just mumbles.'],
 ['','Misaki comes down the stairs in a T-shirt and one sock with her hair over her face and stands at the bottom of them.'],
 K68M('it’s six.','it’s six in the morning. why is there a choir','It’s six in the morning. Why is there a choir?','It’s six in the morning, Ronin. Why is there a choir in the kitchen. Why are they good.'),
 [RN,'Grab a spoon, gremlin. We need a soprano.']],()=>{fr('r',2);if(S.dogs)Object.keys(S.dogs).forEach(k=>S.dogs[k]=clamp(S.dogs[k]+2));done()}));

/* one every other morning at most, sharing the morning cap with kc56/58/59/60/64 */
const m68Next=()=>{if(!K68()||S.day-(S.f.k68MLast||-9)<2)return null;return M68.find(b=>!S.seen[b.id]&&b.when())||null};
const _me68=morningEvent;morningEvent=function(done){let b=null;try{if(mbOk())b=m68Next()}catch(e){}if(!b)return _me68(done);mbUse();S.f.k68MLast=S.day;S.seen[b.id]=1;save();return b.run(()=>_me68(done))};

/* ===================================== 3 · AN EVENING WITH RONIN ===================================== */
const E68=[
 ()=>[['','The couch. A crime show is on, the kind where the killer leaves a playing card at every scene. Ronin is lying across you with his head in your lap, telling the television how he would have done it.'],
  [RN,'Nah. Nah. Nobody leaves a card. Leave a card, you’re askin’ for it. You leave nothin’. You leave a guy.'],
  ['K9','They would have his fibres from the first scene.'],
  [RN,'See, he’s gettin’ it. Vee’s got the fibres. Arrest yourself, pal.'],
  ['','The detective on the screen works it out twenty minutes after the two of you do. Ronin is asleep for the arrest, with his mouth open and your hand in his hair.']],
 ()=>[['','Ronin reads to you in bed, out of the Bible he stole from a hotel, because you said once that you had never read it. He does the Book of Revelation in voices. The Whore of Babylon sounds like Angel. The beast with seven heads sounds like your accountant.'],
  ['K9','You have the pronunciation of that wrong.'],
  [RN,'I’ve had it wrong since I was six, and so’s the Devil. Shut up. The angels are about to pour out the bowls. This is the good bit.'],
  ['','You fall asleep somewhere around the fourth bowl, and he keeps reading to the end of the chapter, then dog-ears the page.']],
 ()=>[['','Chess, in your study. You teach him the moves, and he learns them, and then he does not use any of them. His bishops are “my guys”. His queen is “the bitch”. He takes your knight with his king, and when you point out that a king does not do that, he says this one does.'],
  [RN,'Check. Checkmate. Whatever. Your guy’s dead, Vee.'],
  ['K9','You have put my king in your pocket.'],
  [RN,'Yeah, and he ain’t gettin’ out. Your move.'],
  ['','You leave the king in his pocket. It is still in there a week later, when he empties his jeans out on your kitchen island, and he gives it back to you without a word, like a ring.']],
 ()=>[['','Your kitchen, late. You have let Ronin cut your hair. He does it with his straight razor and a comb he found in your bathroom, standing behind your chair, and from time to time he lays the flat of the razor along your throat, very cold, and leaves it there for a moment.'],
  [RN,'Hold still. I ain’t gonna. Unless you want me to. You want me to?'],
  ['K9','Finish the back.'],
  [RN,'Thought so. Your pulse is real slow, Vee. Everybody else’s goes like a rabbit. Yours goes like a church bell.'],
  ['','He finishes the back. It is a very good haircut. Afterwards he blows the cut hair off your neck instead of brushing it off, which takes him much longer than it needs to.']],
 ()=>[['','Ronin’s workshop. He has a record player on the bench, older than both of you, and one record that is not gospel. He puts it on and holds out a hand with sawdust on it.'],
  [RN,'Dance with me. C’mon. Nobody’s lookin’. The Devil’s lookin’, but he’s seen worse.'],
  ['','You dance in the sawdust in your socks. You lead. He lets you, for most of a song, and then he does not, and the record goes round to the end and keeps going, clicking, in the groove at the middle, and neither of you gets up to take the needle off until morning.']]];
const _sh68=sideHub;sideHub=function(late){const o=_sh68(late);try{if(!K68())return o;const d=S.done.k68Eve;
 return o.concat([{t:'Spend the evening with Ronin',sub:d?'done today':'costs time · nothing planned',dis:!!late||!!d,fn:()=>{spend();S.done.k68Eve=1;const n=S.f.k68EveN||0;S.f.k68EveN=n+1;save();go(cutBg('#100a08'));
  say(E68[n%E68.length](),()=>{fr('r',2);calm(3);hub()})}}])}catch(e){return o}};

/* ===================================== 4 · THREADS AND SERVER PINGS ===================================== */
txDef('tx_k68_heat',{with:'r',pov:'v',prio:1,when:()=>K68()&&(S.vromDates||0)>=1,nodes:{
 start:{in:()=>['how d’you turn your heat up','there’s a panel. it wants a password. it called me “unauthorised”'],expire:3,
  opts:()=>[{t:'“You are unauthorised.”',fx:()=>fr('r',1),reply:()=>['I’m in your BED vee','that’s the most authorised a guy can get'],next:'two'},
   {t:'“The password is in the safe.”',fx:()=>fr('r',1),reply:()=>['what’s the code for the safe'],next:'two'}]},
 two:{in:()=>['I’m gonna die in here. I’m gonna be a popsicle and you’re gonna feed me to the dogs'],
  opts:()=>[{t:'“There is a blanket in the chest at the end of the bed.”',fx:()=>fr('r',2),reply:()=>['found it','it’s got a hound on it. you got a blanket with a dog on it','I’m keepin this forever']},
   {t:'“I will be home in an hour. Stay where you are.”',fx:()=>fr('r',3),reply:()=>['an hour','vee I’ll be a corpse in an hour','...ok I’ll stay where I am. hurry up']}]}}});

txDef('tx_k68_dog',{with:'r',pov:'v',prio:1,when:()=>K68()&&!S.f.k68Carve&&(S.vromDates||0)>=1,nodes:{
 start:{in:()=>['which dog’s your favourite','don’t say all of ’em. that’s a coward answer'],expire:3,
  opts:()=>[{t:'“The old one.”',fx:()=>fr('r',2),reply:()=>['knew it','which ear’s the floppy one. left or right. lookin at her from the front'],next:'two'},
   {t:'“I do not have a favourite.”',fx:()=>fr('r',1),reply:()=>['coward','it’s the old one. I seen you give her the good bits'],next:'two'}]},
 two:{in:()=>['no reason','don’t come to the workshop for a week'],
  opts:()=>[{t:'“Why?”',fx:()=>fr('r',1),reply:()=>['reasons','men’s reasons','go feed somebody to somethin’']},
   {t:'“The left ear.”',fx:()=>fr('r',2),reply:()=>['thank you','shit. ok. doin it again']}]}}});

txDef('tx_k68_mi',{with:'m',pov:'v',prio:1,when:()=>K68()&&tier()>=1&&S.f.k68Boots!=='back',nodes:{
 start:{in:()=>['v','why are there boots in the kennel','and why is ronin in the kitchen in socks eating cereal out of the box like a raccoon'],expire:3,
  opts:()=>[{t:'“The hounds have adopted his boots.”',fx:()=>apply({aff:1}),reply:()=>['ok','ok that’s actually so cute i want to die','the grey one growled at me when i went near the boot. at ME. i feed her'],next:'two'},
   {t:'“He lives here now.”',fx:()=>apply({aff:2}),reply:()=>['since when','did u tell the hounds or did they tell u'],next:'two'}]},
 two:{in:()=>['also there’s a crowbar in the umbrella stand','is it load bearing. can i move it'],
  opts:()=>[{t:'“Do not move it.”',fx:()=>apply({aff:1}),reply:()=>['wasn’t gonna','ur both so weird. i’m happy for u. gross']},
   {t:'“Ask him.”',fx:()=>apply({aff:1}),reply:()=>['i asked him','he said “touch it and you’re next.” then he gave me half the cereal']}]}}});

txDef('tx_k68_an',{with:'a',pov:'v',prio:1,when:()=>K68()&&frT('a')>=1&&(S.vromDates||0)>=2,nodes:{
 start:{in:()=>['question','ronin just asked me how u “ask a guy to a dance” and then said “not for me” and then hung up'],expire:3,
  opts:()=>[{t:'“I do not dance.”',fx:()=>fr('a',1),reply:()=>['oh u’re going to','he’s practising in his workshop. i could hear the record over the phone. it’s the slow one'],next:'two'},
   {t:'“What did you tell him?”',fx:()=>fr('a',2),reply:()=>['i told him the truth. u just put ur hand out and look like u’ll kill them if they say no','he said “easy”'],next:'two'}]},
 two:{in:()=>['if he steps on ur feet u have my permission to shoot him somewhere that heals'],
  opts:()=>[{t:'“Noted.”',fx:()=>fr('a',1),reply:()=>['and send me a picture','one picture v. for me. for my heart']},
   {t:'“I will lead.”',fx:()=>fr('a',2),reply:()=>['OH','oh i love that. tell him that. tell him exactly like that and send me his face']}]}}});

/* server pings, as [speaker,'text'] so the reading copy picks them up */
const G68S={id:'g68_pings',L:[
 [RN,'vee put a crease in my suit pants you could shave with. respect the crease'],
 [RN,'who turned the heat back down. I know it was you. I can feel it in my teeth'],
 [AN,'ronin just sent me a picture of v asleep with three dogs on him and the caption “mine.” anyway i’m crying in an uber'],
 ['hitmeuppp','day 3 of ronin walking around v’s house in socks. the hounds still have the boots. nobody is negotiating'],
 [RN,'bingo tuesday. vee’s comin. dress code is cardigans. bring a dabber or get out'],
 [AN,'v asked me where i buy pink. i have so many questions and he answered none of them'],
 ['hitmeuppp','there are 2 toothbrushes in v’s bathroom now. one of them has a skull on it. i didn’t know they made those'],
 [RN,'taught vee the horn on my truck. he’s a horn guy now. he honked at a funeral. respectfully']]};
const G68U={[RN]:'ro',[AN]:'an',hitmeuppp:'mi'};
const G68P=G68S.L.map(([w,t])=>[G68U[w],t]);
function g68Ping(){if(!S||dlg||ctrl||!K68()||typeof toastBox!=='function')return false;const [u,t]=pk(G68P);const box=toastBox();while(box.children.length>3)box.firstChild.remove();
 const el=document.createElement('div');el.className='ping';el.innerHTML=`<span class="u ${U[u][1]}">${U[u][0]}</span> ${t}`;box.appendChild(el);setTimeout(()=>el.remove(),4200);S.unread=Math.min(9,(S.unread||0)+1);drawHud();return true}
const _sp68=serverPing;serverPing=function(){try{if(S&&K68()&&Math.random()<.3&&g68Ping())return}catch(e){}return _sp68()};

/* ===================================== 5 · ENDING LINES ===================================== */
/* ending lines, as ['',text] so the reading copy picks them up */
const X68={id:'x68_endings',L:{
 e0:['','There is an umbrella stand in V’s hall with a crowbar in it and no umbrellas. Guests do not ask to borrow it.'],
 e1:['','On V’s desk, facing the door, there is a wooden hound the size of a palm with one ear up. The real one lies beside it while he works.'],
 e2:['','V carries a small wooden hound in his coat pocket to every board meeting. Ronin checks for it with his hand, most mornings, on the way out of the door.'],
 e3:['','V has had three parking tickets in his life, all in a black pickup, all across two bays and part of a third. Ronin has them framed in the workshop.'],
 e4:['','Angel still has the karaoke video. She has never posted it. She plays it at every birthday, and V leaves the room, and Ronin turns it up.'],
 e5:['','There is a karaoke microphone in V’s kitchen drawer. Once a year, when the hounds are asleep, it comes out.'],
 e6:['','V owns a lilac scarf, hand-knitted by a woman at Ronin’s bingo table. He wears it on Tuesdays.'],
 e7:['','There is a pair of old boots in V’s kennel. Nobody is allowed to move them.']
}};
const _xe68=extraEnding;extraEnding=function(){const L=_xe68();try{if(!S||!S.f||S.vrom!=='r')return L;const f=S.f;
 if(f.k68Brolly)L.push(X68.L.e0[1]);
 if(f.k68Carve==='desk')L.push(X68.L.e1[1]);
 else if(f.k68Carve==='pocket')L.push(X68.L.e2[1]);
 if(f.k68Truck==='kerb')L.push(X68.L.e3[1]);
 if(f.k68Sing==='sang')L.push(X68.L.e4[1]);
 else if(f.k68Sing==='home')L.push(X68.L.e5[1]);
 if(f.k68Bingo==='table')L.push(X68.L.e6[1]);
 if(f.k68Boots==='new')L.push(X68.L.e7[1]);}catch(e){}return L};
