/* ===================== OFF HOURS (kc64) =====================
   Lighter days for the four, both POVs. They are still killers and still do not care about the world; they are at
   ease with each other, and some days are only funny.
   1. Angel and Ninefold Chapel, a gacha game about saints (a ten-pull is "a tithe", the currency is candles, the
      thing she wants is Saint Ottilie of the Shears). Eight beats, one every other morning or from the side menu:
      the first pull, 3am, the money, hiding it from Maria's followers, Misaki's luck, the whale night, quitting,
      and V's intervention. Threads, server pings, a talk topic, a spot on the couch.
   2. Misaki likes calculus, for no reason they can give. Location scenes, two topics, a side activity, threads.
   3. Ordinary epilogue days (pub quiz, the furniture store, board games, a selfie, Ronin's cold, the residents'
      letter): one every morning in the epilogue, sharing the kc56 morning cap.
   4. Location events: when you walk into certain rooms there is a chance a small scene plays (once each, one a
      day). Platonic crude banter, and flirting on the V/Misaki route only, in the normal phase and the epilogue.
   Rules kept: unnamed city, dollars, hounds unnamed, no new named people, V never contracts, Misaki through MV.
   Nothing here mentions the kidnapping. Notes: docs/notes_kc64.md. */
const m64=()=>S.pov!=='v';
const h64=(m,v)=>m64()?m:v;
const K64=()=>{try{return !!S&&!isLone()&&!S.dark&&!(typeof jpAway==='function'&&jpAway())&&!(S.kd&&S.kd.med)&&['normal','act2','act3','epilogue'].includes(S.phase)}catch(e){return false}};
/* flirting stays on the V/Misaki route, before the van or in the epilogue, and not on the "apart" ending */
const fl64=()=>{try{return !S.rom&&!S.vrom&&tier()>=2&&['normal','epilogue'].includes(S.phase)&&S.f.k58End!=='apart'}catch(e){return false}};
const c64Any=()=>!!S&&!!S.seen&&['c64_bed','c64_env','c64_limits','c64_parab','c64_book','c64_skin','c64_hole'].some(k=>S.seen[k]);

/* ---------- 1 · Ninefold Chapel ---------- */
const G64=[];
const g64B=(id,side,when,run)=>G64.push({id,side,when:()=>{try{return when()}catch(e){return false}},run});
const g64N=()=>(S.f.g64||0);
const g64Next=()=>{if(!K64()||frT('a')<1||S.day<5)return null;const b=G64[g64N()];if(!b||S.day-(S.f.g64Last||-9)<2||!b.when())return null;return b};
const g64Mark=b=>{S.f.g64=G64.indexOf(b)+1;S.f.g64Last=S.day;S.seen[b.id]=1;save()};
const g64On=()=>g64N()>=1&&g64N()<8;

g64B('g64_pull','Angel’s new game',()=>true,done=>{const m=m64();say([
 ['','A company that makes a phone game has offered Maria eight hundred dollars to play it on stream for twenty minutes. The game is called Ninefold Chapel. Angel downloads it on V’s couch to “learn the controls.”'],
 ['','It is about saints. You collect them. You pray at a bell to get them, a ten-pull is called a tithe, and the money is candles.'],
 [AN,'oh she’s pretty. look at her. she’s a nun and she has garden shears. “saint ottilie, who prunes the wicked.” that’s me. that’s literally my job.'],
 [RN,'They put a slot machine in a church. Most honest church I ever saw.'],
 [AN,'the free tithe gave me a man with a lantern. i don’t want the man with a lantern.'],
 ['',m?'You leave at one. She is still on the couch with her knees up and her face lit blue. When you come back for your charger at two she does not look up.':'V goes to bed at one. She is still on the couch with her knees up and her face lit blue. When he comes down at two for water she does not look up.'],
 [AN,'it’s for the sponsor.']],()=>{fr('a',1);done()})});

g64B('g64_3am','Three in the morning, the server',()=>true,done=>{const m=m64();say([
 ['',m?'3:12 in the morning. Your phone lights up the trailer.':'3:12 in the morning. V is still in the ops deck when the server starts going.'],
 [AN,'(server) is anyone awake. i need a second opinion on a woman'],
 [AN,'(server) [screenshot] [screenshot] [screenshot] [screenshot]'],
 [AN,'(server) she’s on a limited banner. three weeks. i have eleven days left and forty prayers. the maths isn’t mathing'],
 [RN,'(server) it’s three in the fuckin mornin. who’s the nun'],
 [AN,'(server) ottilie. she has SHEARS ronin'],
 [RN,'(server) ...ok yeah she’s hot. go to sleep']],()=>ask(m?'hitmeuppp':'K9',m?'(Angel is typing. Angel is still typing.)':'(Angel has been typing for a long time.)',[
  {t:m?'“the maths: u need about 150 prayers to be safe. go to bed”':'“It is three in the morning, Angel.”',fn:()=>{fr('a',1);say([[AN,m?'(server) 150. ok. ok that’s fine. that’s like nothing':'(server) i know what time it is v. she doesn’t care what time it is'],['',m?'She is still online at five. So are you, because she keeps sending you the odds to check.':'She is still online at five. He knows because the little green dot is still there when he feeds the hounds.']],done)}},
  {t:m?'“show me the nun”':'“Which one is she?”',fn:()=>{fr('a',2);say([[AN,'(server) [screenshot: a nun with pale hair and enormous shears, standing on a pile of men]'],[RN,'(server) she’s standin on guys'],[AN,'(server) she’s standing on GUYS'],['',m?'You look at the nun for a while. You understand Angel a lot better.':'V looks at the nun for some time. He understands Angel better than he would like to.']],done)}}]))});

g64B('g64_money','Angel’s card statement',()=>true,done=>{const m=m64();say([
 ['',m?'Angel does V’s accounts on his couch and he does her alibis, the usual Thursday. You are on the floor with the grey hound, so you see V find it.':'Angel does V’s accounts on his couch and he does her alibis, the usual Thursday. Her card statement is under the alibis.'],
 ['','Fourteen lines in a row. NINEFOLD*CANDLES $99.99.'],
 ['K9','One thousand, three hundred and ninety-nine dollars and eighty-six cents. On candles.'],
 [AN,'they’re digital candles.'],
 ['K9','That is worse.'],
 [AN,'i’ve spent more than that on a lipstick. ...no i haven’t. i’ve spent more than that on a jacket. a jacket you can wear, fine.'],
 [RN,'(from the kitchen) Is this about the nun? Vee, she’s standin’ on guys.']],()=>ask(m?'hitmeuppp':'K9',m?'(V is holding the statement like evidence.)':'(He has a pen. It is hovering over a column.)',[
  {t:m?'“put it under business expenses, she streamed it once”':'“I will put it under business expenses.”',fn:()=>{fr('a',2);say([[AN,'thank you. thank you. see, he gets it.'],['K9','Maria streamed the game for twenty minutes. That covers one line. The other thirteen are a hobby.'],[AN,'it’s a calling.']],done)}},
  {t:m?'“is she at least worth it”':'“Do you have her yet?”',fn:()=>{fr('a',1);say([[AN,'no.'],['','The room waits.'],[AN,'i lost a fifty-fifty to a man holding a fish. do NOT ask me about the fish.']],done)}}]))});

g64B('g64_hide','Maria’s stream, and the phone',()=>true,done=>{const m=m64();say([
 ['',m?'Maria’s Sunday makeup tutorial. You’re her “assistant,” which means you stand behind the ring light in a hoodie holding a brush you will not be allowed to touch her with.':'Maria’s Sunday makeup tutorial. Ronin is her “assistant.” V is on the couch out of frame, reading.'],
 ['','Her phone is face down on the vanity, in shot. It buzzes. It lights up through the case. It says, in gold letters, YOUR TITHE IS READY.'],
 ['','The chat fills: <i>maria plays ninefold??</i> <i>MARIA WHO R U PULLING FOR</i> <i>omg same i’m at 74 pity</i>'],
 [AN,'(as Maria, sweetly) oh! no, that’s my assistant’s phone, sorry, guys. he’s obsessed. it’s so embarrassing for him.'],
 ['',m?'She hands you the phone without looking. You hold it up to the ring light like it is yours.':'She hands the phone back to Ronin without looking. Ronin, live on stream, holds it up to the light.'],
 [RN,'Yeah. Love the nun. Big nun guy.'],
 ['','After the stream she changes her account name, her profile picture, and the email it is attached to, and sits for a while with the comments open.'],
 [AN,'if one of them finds my account i’ll find them. i mean it as a promise. a cute promise.']],()=>{fr('a',2);fr('r',1);S.f.g64Hide=1;done()})});

g64B('g64_luck','Misaki’s luck, borrowed',()=>true,done=>{const m=m64();say([
 [AN,'give me your hands.'],
 ['hitmeuppp',MV('why','why do u want my hands','Why do you want my hands?','Why do you want my hands? Last time somebody wanted my hands they paid forty grand for them.')],
 [AN,'you were supposed to be dead in five years. you said so. you’re the luckiest person i know. one tithe. it’s banner day nine.'],
 ['',m?'She puts the phone in your hands as carefully as a rifle. You look at the odds page.':'She puts the phone in Misaki’s hands as carefully as a rifle. Misaki looks at the odds page.'],
 ['hitmeuppp',MV('6% lol','point six percent a prayer. so like six percent on a tithe','Point six percent a prayer. About six percent on a tithe.','Point six percent a prayer, so one minus point nine nine four to the tenth. Call it five point eight percent on a tithe. Angel, that’s worse than a coin toss off a roof.')],
 [AN,'pray.'],
 ['','The bell rings ten times. On the ninth, the screen goes white and gold. Angel stops breathing.'],
 ['','It is a saint with a halo. It is a short bald saint holding a loaf of bread. Saint Gall the Patient.'],
 [RN,'Lucky as shit. Wrong saint.']],()=>ask(m?'hitmeuppp':'K9',m?'(Angel is staring at the bread.)':'(Angel is staring at the bread.)',[
  {t:m?'“a haloed’s a haloed. i’ll do one more”':'“Let her do one more.”',fn:()=>{fr('a',1);S.f.g64Luck='more';say([['','The second tithe is ten men with lanterns.'],[AN,'you’re banned. you are banned from my phone forever.'],['',m?'At three that morning she texts you a photo of her phone on a pillow and asks you to breathe on it.':'At three that morning Misaki gets a photo of Angel’s phone on a pillow, and a request to breathe on it.']],done)}},
  {t:m?'“give the phone back before it gets worse”':'“Give her the phone back.”',fn:()=>{fr('a',2);S.f.g64Luck='back';say([[AN,'he’s a five-star. he’s worthless. he’s a five-star.'],['','She levels Saint Gall up to forty that night. Nobody mentions it. He is very good, it turns out, against bosses.']],done)}}]))});

g64B('g64_whale','The last night of the banner',()=>true,done=>{const m=m64();say([
 ['','The banner ends at midnight. At eleven, the four of them are in V’s atrium in a circle around Angel’s phone, the way people stand around a safe.'],
 [AN,'i have sixty-one prayers until pity. i have zero candles. i’m buying the cathedral pack.'],
 ['K9','What is the cathedral pack?'],
 [AN,'ninety-nine ninety-nine. i need three.'],
 ['','She buys three. Ronin puts a hand on her head and prays out loud to the Devil, in detail. V holds the hounds back from the noise. '+(m?'You count':'Misaki counts')+' prayers aloud.'],
 ['hitmeuppp',MV('80. 85. 87.','eighty. eighty-five. eighty-seven','Eighty. Eighty-five. Eighty-seven.','Eighty. Eighty-five. Eighty-seven. You don’t need the pity, Angel, it’s coming, it’s a step function, it has to come.')],
 ['','On the eighty-eighth prayer the screen goes white, and then gold, and then a pale woman with garden shears is standing on a pile of men.'],
 ['','Angel screams. All four hounds stand up. She cries, properly, with her mascara running.'],
 [AN,'she’s home. she’s actually HOME. two thousand eight hundred and sixty dollars, and she’s home.']],()=>ask(m?'hitmeuppp':'K9',m?'(Angel is holding the phone to her chest.)':'(Angel is holding the phone to her chest.)',[
  {t:m?'Hug her, phone and all':'“Congratulations.”',fn:()=>{fr('a',3);S.f.g64Whale='hug';say([[AN,'thank you. thank you so much. i want to kill someone so badly right now, in a nice way.'],[RN,'Big night. I got a guy.']],done)}},
  {t:m?'“$2,860 is like eleven nights at a good hotel”':'“Was it worth it?”',fn:()=>{fr('a',1);S.f.g64Whale='sum';say([[AN,'yes. obviously. i’d do it again. i’m going to do it again.'],['','Nobody likes how sure she sounds. They let it go, because she is so happy.']],done)}}]))});

g64B('g64_quit','“i’m quitting”',()=>true,done=>{const m=m64();say([
 ['','A week later there is a new banner. It is Ottilie’s sister, who has tongs.'],
 [AN,'(server) ok. i have something to say. i’ve thought about it a lot. ninefold has taken a lot from me. money. sleep. two chipped nails. i am deleting it. i want you all to witness this'],
 ['','She video-calls all three of them, holds the phone up to the laptop camera, and drags the little chapel to the bin. She says “goodbye, my girl” to Ottilie first.'],
 [AN,'free. i’m free. that was easy. that was actually so easy.'],
 [RN,'Proud of you, princess.'],
 ['','Thirty-eight minutes later:'],
 [RN,'(server) she’s back on. I can see her through her kitchen window from my truck. she’s on the kitchen floor reinstalling it'],
 [AN,'(server) i was getting my account back. it’s a backup. you can’t throw away a saint'],
 [AN,'(server) ronin why are you outside my house']],()=>{fr('a',1);fr('r',1);S.f.g64Quit=1;done()})});

g64B('g64_inter','The intervention',()=>true,done=>{const m=m64();say([
 ['','V organises it. Nobody asked him to. There are four chairs in a circle in the atrium, a box of tissues, and a folder for each person with a tab that says NINEFOLD.'],
 ['','Ronin has made a banner from a bedsheet: WE LOVE YOU STOP PRAYING TO THE NUN.'],
 [AN,'what is this. why are there folders.'],
 ['K9','Sit down, please. Each of us has written something. You will listen, and then you may speak.'],
 ['K9','(reading) Angel. Since the first of the month you have spent four thousand and eighty-one dollars on a woman who does not exist. I have no objection to the woman. I object to the rate.'],
 [RN,'(reading off his hand) You ain’t slept right in a month. You missed a guy Tuesday ’cause your phone said the bells were ready. A GUY, Angel. He walked. He’s still walkin’.'],
 ['hitmeuppp',MV('i made a graph.','i made a graph. it goes up','I made a graph. The line only goes up.','I made a graph. Spending against days. The slope’s getting steeper every week, Angel, the second derivative’s positive, that means it’s accelerating. That’s the bad one.')],
 ['','Angel cries a little. Then a phone in the circle buzzes and lights up through its case: YOUR TITHE IS READY.'],
 ['','It is Ronin’s.'],
 [RN,'...Got a priest. Demon priest. Father somethin’. He’s got a bell made of teeth, Vee, I couldn’t not.'],
 ['K9','(closing his folder) We will reconvene.']],()=>ask(m?'hitmeuppp':'K9',m?'(Everyone is looking at you. You made the graph.)':'(Everyone is looking at V. He made the folders.)',[
  {t:m?'“limit. forty bucks a month. i’ll check the slope”':'“Forty dollars a month. I will hold the card.”',fn:()=>{fr('a',2);fr('r',1);S.f.g64End='limit';save();say([[AN,'forty. fine. forty. i can do forty.'],['',m?'She spends it at 12:01 on the first of the month, every month, and sends you a screenshot as proof she has not gone over.':'She spends it at 12:01 on the first of the month, every month, and sends V a screenshot as proof she has not gone over. He files them.']],done)}},
  {t:m?'“she’s happy. let her pray”':'“She is happy. Let her keep the nun.”',fn:()=>{fr('a',3);S.f.g64End='keep';save();say([[AN,'thank you. i love you. i love all of you. ronin give me your phone, i’ll show you how to level your priest.'],['','The intervention ends with all four of them on the couch around two phones. V is holding the folders and asking what a fifty-fifty is.']],done)}}]))});

/* server pings while the arc is running */
const G64P=[
 ['an','who here has a phone they don’t use. asking for ottilie'],
 ['ro','angel’s been in my bathroom 40 mins with her phone. either she’s dyin or she’s prayin to the nun'],
 ['k9','Angel. The hounds do not need to be in the screenshots for luck. Please return the pale one to the kennel.'],
 ['an','reminder that i am NOT addicted. i am collecting. it’s different. ask anyone on the chapel forum'],
 ['mi','angel just asked me what my “lucky hand” is. she wants me to tap her screen with it at midnight. i said yes obviously'],
 ['an','someone in global chat called ottilie “mid.” i have his username. i have his city. i’m just saying i have them'],
 ['ro','what’s a “spark.” angel said she’s gonna spark. is that like arson. I’ll come'],
 ['an','ninefold sent me a survey asking how i feel about the game. i wrote four paragraphs. one of them was a threat']];
function g64Ping(){if(!S||dlg||ctrl||!g64On()||typeof toastBox!=='function')return false;const L=G64P.filter(([u])=>!((u==='k9'&&S.pov==='v')||(u==='mi'&&S.pov==='m')));if(!L.length)return false;
 const [u,t]=pk(L);const box=toastBox();while(box.children.length>3)box.firstChild.remove();const el=document.createElement('div');el.className='ping';el.innerHTML=`<span class="u ${U[u][1]}">${U[u][0]}</span> ${t}`;box.appendChild(el);setTimeout(()=>el.remove(),4200);S.unread=Math.min(9,(S.unread||0)+1);drawHud();return true}
const _sp64=serverPing;serverPing=function(){try{if(S&&g64On()&&Math.random()<.35&&g64Ping())return}catch(e){}return _sp64()};

/* ---------- 3 · ordinary epilogue days ---------- */
const E64=[];
const e64B=(id,side,when,run)=>E64.push({id,side,when:()=>{try{return when()}catch(e){return false}},run});
const e64Next=()=>{if(!K64()||S.phase!=='epilogue')return null;return E64.find(e=>!S.seen[e.id]&&e.when())||null};

e64B('e64_quiz','Pub quiz night',()=>frT('a')>=1&&frT('r')>=1,done=>{const m=m64();say([
 ['','There is a pub quiz on Wednesdays at a bar on the ring road. The four of them enter as Book Club.'],
 ['','V takes the anatomy round and gets ten out of ten without picking up the pen. Ronin takes the round on the Bible and knows every hymn by its number. Angel takes celebrities, and identifies a pop star from a photograph of his teeth.'],
 ['','The tiebreak is a sum. The quizmaster has not finished reading it when '+(m?'you say':'Misaki says')+' the answer.'],
 ['','A man on the next table, Team Quizteama Aguilera, stands up and says that somebody is cheating.'],
 [RN,'(smiling at him) Yeah?'],
 ['','The man sits down. He withdraws the complaint. A while later his team leaves before the last round.'],
 ['','First prize is a meat raffle: six kilos of assorted cuts in a cooler box.'],
 ['K9','The hounds thank you all.'],
 [AN,'next week we do it as maria and friends. i want the bar tab.']],()=>{fr('a',2);fr('r',2);apply({aff:2});done()})});

e64B('e64_store','The furniture store',()=>true,done=>{const m=m64();say([
 ['','V needs a bookcase. All four of them go, which is a mistake, to the big furniture store off the motorway with the one-way arrows painted on the floor.'],
 ['',m?'You note every fire exit on the way in, out loud, so that the others will know them. V has already noted them. He is reading the floor plan like a briefing.':'Misaki notes every fire exit on the way in, out loud. V has already noted them. He is reading the floor plan like a briefing.'],
 ['','Ronin lies down on every bed in the bedroom section and announces how he would kill a man in it.'],
 [RN,'This one, pillow. This one, the fuckin’ headboard, look at it. This one I’d just leave him in, it’s comfy, he’d thank me.'],
 [AN,'(filming a “showroom tour” in a display kitchen, as Maria) and this is the knife block. so sharp. so sharp, you guys.'],
 ['','The knives are plastic. She keeps one anyway.'],
 ['','Four hours later they come out with two hundred tealights, a houseplant, a bath mat for the pale hound, and no bookcase.']],()=>{fr('a',1);fr('r',1);apply({aff:2});calm(2);done()})});

e64B('e64_board','Board game night',()=>frT('r')>=1,done=>{const m=m64();say([
 ['','Board game night. The game is the one where you buy streets and charge rent, and V reads all of the rules aloud before anyone may touch the dice. It takes twenty-five minutes.'],
 ['',m?'You buy every orange street and then every red one. By the second lap you own the bottom half of the board, and you charge whatever you like.':'Misaki buys every orange street and then every red one. By the second lap they own the bottom half of the board, and they charge whatever they like.'],
 [RN,'That’s not the rent on the card. That ain’t the rent on the card, Vee, tell them.'],
 ['hitmeuppp',MV('market rate.','market rate babe. i was a scalper','Market rate. I used to scalp dresses, Ronin.','That’s market rate. I scalped dresses for three years, Ronin. You land on my street, you pay what the street’s worth to you right now, and right now it’s worth everything.')],
 ['','Angel has been taking money out of the bank in plain sight all evening. Nobody stops her. V notices, and decides it is a lesson for the others.']],()=>ask(m?'hitmeuppp':'K9',m?'(Ronin has landed on your red street with a hotel on it.)':'(Ronin has landed on Misaki’s red street with a hotel on it.)',[
  {t:m?'“triple. pay up”':'“The card says nine hundred.”',fn:()=>{fr('r',1);say([[RN,'Fuck this.'],['','He flips the board. The houses go everywhere. The black hound eats a hotel. V fishes it out of the hound’s mouth, puts it back on the red street, and says that the game will resume after a ten minute recess.']],done)}},
  {t:m?'“...u can owe me”':'Say nothing, and let them decide.',fn:()=>{fr('r',2);say([[RN,'...Aw. Gremlin.'],['',m?'He owes you for the rest of the game. You collect at the end in washing-up.':'He owes them for the rest of the game. They collect at the end in washing-up. He does it for a week, badly, with the radio on.']],done)}}]))});

e64B('e64_selfie','V’s first selfie',()=>frT('a')>=1,done=>{const m=m64();say([
 ['','Angel finds out that V has never taken a photograph of himself, and puts down her coffee.'],
 [AN,'arm out. higher. higher. chin down. why are you holding it like that. it’s not evidence.'],
 ['K9','I do not see what the photograph is for.'],
 [AN,'it’s for having. smile.'],
 ['','He smiles. It is the smile from the man on the table, and Angel takes the phone off him and puts it face down.'],
 [AN,'no. smile like when the old hound puts her head on your knee.'],
 ['',m?'Forty photographs later there is one. V is nearly smiling, and the black hound’s head is coming into the frame from below, very large. Behind him, out of focus, you are pulling a face.':'Forty photographs later there is one. He is nearly smiling, and the black hound’s head is coming into the frame from below, very large. Behind him, out of focus, Misaki is pulling a face.'],
 ['','He has it printed, and framed, and puts it on the piano nobody plays.']],()=>{fr('a',2);apply({aff:2});done()})});

e64B('e64_cold','Ronin has a cold',()=>frT('r')>=1,done=>{const m=m64();say([
 ['','Ronin has a cold. He comes over to V’s house to have it, and lies across the whole couch in a blanket and makes noises.'],
 [RN,'Angel. Angel. Get the list. I wanna change my will.'],
 [AN,'(opening “list (final) (2)”) go on.'],
 [RN,'Crowbar goes in the ground with me. Records to the gremlin. Truck to whoever kills the guy who gave me this cold. He was coughin’ at the gas station. I know his face.'],
 ['','V brings him soup. It has the correct amount of salt in it. He has measured it.'],
 [RN,'You’re tryin’ t’kill me.'],
 ['K9','If I were trying, you would not be able to talk.'],
 ['',m?'You take his temperature. It is thirty-seven point four.':'Misaki takes his temperature. It is thirty-seven point four.'],
 [RN,'Write that down. That’s a fever. Write it down so they know, after.']],()=>ask(m?'hitmeuppp':'K9',m?'(He is holding your sleeve.)':'(He is holding V’s sleeve.)',[
  {t:m?'“you’re going to live, you giant baby”':'“You will live.”',fn:()=>{fr('r',2);say([[RN,'Sucks t’be you.'],['','He is asleep in four minutes, snoring, with the old hound lying on his feet.']],done)}},
  {t:m?'Find the guy from the gas station':'“Describe the man at the gas station.”',fn:()=>{fr('r',3);apply({edge:1});say([[RN,'(sitting up at once) Grey cap. Bad moustache. Drives a blue van with a dent in the side.'],['','By the weekend Ronin is better. The man from the gas station has stopped coughing too. Ronin gives the truck to nobody, and keeps it.']],done)}}]))});

e64B('e64_letter','The residents’ letter',()=>true,done=>{const m=m64();say([
 ['','The residents’ association has written to V. They are concerned about the height of his hedge, and “noises from the property at night, sometimes including screaming.”'],
 ['','V drafts a reply at the kitchen table, in fountain pen. It is two pages long and very polite. It thanks them for their concern, gives the height of the hedge to the centimetre, and explains that the noises are his hounds.'],
 [AN,'they’re going to know it’s not the hounds.'],
 ['K9','They are going to know that they should not ask again.'],
 ['','All four of them sign it. Angel signs in lipstick and blots it. Ronin signs “Satan” and then, under it, “(Ronin)”. '+(m?'You draw':'Misaki draws')+' a small frog. V signs last.'],
 ['','The hedge stays. In the spring, the chairman of the residents’ association sells his house and moves to the coast, for unrelated reasons.'],
 ['K9','I did nothing.'],
 [RN,'I did a little.']],()=>{fr('a',1);fr('r',2);apply({aff:1});done()})});

/* one beat a morning at most, shared cap with kc56/58/59/60 */
const k64Next=()=>g64Next()||e64Next();
const k64Mark=b=>{if(G64.includes(b))g64Mark(b);else{S.seen[b.id]=1;S.f.e64Last=S.day;save()}};
const _me64=morningEvent;morningEvent=function(done){let b=null;try{if(mbOk()&&S.f.k64Day!==S.day)b=k64Next()}catch(e){}if(!b)return _me64(done);mbUse();S.f.k64Day=S.day;k64Mark(b);return b.run(()=>_me64(done))};
const _sh64=sideHub;sideHub=function(late){const o=_sh64(late);try{const b=k64Next();if(!b)return o;const today=S.f.k64Side===S.day||S.f.k64Day===S.day;
 return o.concat([{t:b.side,sub:today?'tomorrow':'costs time · the four of you',dis:!!late||today,fn:()=>{spend();S.f.k64Side=S.day;k64Mark(b);go(cutBg('#0a0a10'));b.run(()=>hub())}}])}catch(e){return o}};

/* ---------- 4 · location events ---------- */
const K64L=[];
const l64=(id,rooms,p,when,run)=>K64L.push({id,rooms,p,when:()=>{try{return K64()&&when()}catch(e){return false}},run});

/* calculus */
l64('c64_bed',['trailer'],.35,()=>S.day>=3,done=>{const m=m64();say([
 ['',m?'You come in after a job, kick your boots off, lie on the bed, and do integrals in the back of a notebook until your hands stop feeling like somebody else’s.':'Misaki is lying on the bed in the trailer with a notebook held up over their face, doing integrals. There is still somebody else’s blood on their knuckles.'],
 ['hitmeuppp',MV('ok. by parts.','ok. by parts. u times v minus the integral of v du. nice','Integration by parts. Lovely.','Integration by parts. You pick the bit that gets simpler when you differentiate it, and the rest takes care of itself. I love it. I don’t know why. It’s like folding laundry.')],
 ['',m?'It’s the most relaxing thing you know, after the work. Nobody taught you to do it this way. Nobody taught you any of it.':'V asks whether they are working. They say no, this is the opposite of working, and turn the page.']],()=>{calm(4);apply({edge:-1});done()})});

l64('c64_env',['ops','trailer'],.4,()=>S.day>=4,done=>{const m=m64();say([
 ['',m?'The envelope from yesterday’s client is still on the table. On the back, in your handwriting, there are four derivatives you did while you waited for him to finish talking.':'There is a contract envelope that Misaki left on the side. On the back, in their small upright writing, there are four derivatives and a little drawing of a frog.'],
 ['','d/dx of x squared sine x. The chain rule twice. A quotient. The last one is circled and has “ha!” written next to it.'],
 ['',m?'The client was paying forty thousand dollars for a man on a balcony. You remember the derivatives better than the man.':'The client paid forty thousand dollars for a man on a balcony. V has no record of the man. He keeps the envelope.'],
 ['hitmeuppp',MV('he talked too much.','he talked for 20 mins. i needed something to do','He talked for twenty minutes. I needed something to do with my hands.','He talked for twenty minutes about his ex-business-partner. I needed something to do with my hands that wasn’t strangling a client, so I did the chain rule.')]],()=>{apply({aff:1});done()})});

l64('c64_limits',['ronin'],.4,()=>frT('r')>=1&&(typeof ronWhere!=='function'||!ronWhere()),done=>{const m=m64();say([
 ['',m?'Ronin’s workshop. Ronin is at the bench, and you’re on the floor with chalk, explaining limits to him, because he asked what they were and then couldn’t stop you.':'Ronin’s workshop. Ronin is at the bench, and Misaki is on the floor with chalk, explaining limits to him, because he asked what they were and then could not stop them.'],
 ['hitmeuppp',MV('u get closer and closer.','u get closer and closer and closer. but u never actually get there.','You get closer and closer to it. You never actually arrive.','You get closer and then closer again, half the distance each time, forever. You never actually arrive. But the limit is where you were going, so we say that’s the answer.')],
 [RN,'Closer and closer and never get there.'],
 ['hitmeuppp',MV('ya.','yeah','Yes.','Yeah. That’s it. That’s limits.')],
 [RN,'That’s my whole fuckin’ love life, gremlin. I been livin’ calculus since I was fifteen.'],
 ['',m?'You laugh so hard you smudge the chalk. He makes you explain it again, slower, with the crowbar as the x axis.':'Misaki laughs so hard they smudge the chalk. He makes their explain it again, slower, with the crowbar as the x axis.']],()=>{fr('r',2);calm(2);done()})});

l64('c64_parab',['dp_range'],.45,()=>true,done=>{const m=m64();say([
 ['',m?'You’re at the range under the house with V, scoring yesterday’s shots off the drone footage.':'V is at the range under the house with Misaki, scoring yesterday’s shots off the drone footage.'],
 ['hitmeuppp',MV('nice curve.','look at that curve. that’s a good parabola','That’s a good parabola. Look at it.','Look at that. Clean parabola. Drag’s barely touching it. The vertex is right where I said. I’d frame that, if it wasn’t evidence.')],
 ['K9','You are rating the trajectory.'],
 ['hitmeuppp',MV('9/10.','9/10. ronin’s are like 3/10 he throws stuff','Nine out of ten. Ronin’s get a three. He throws things.','Nine out of ten. Angel’s get eight, she’s greedy with elevation. Ronin’s get three, his are mostly a crowbar going in a circle, which isn’t even a parabola, it’s a crime against conics.')],
 ['','V asks how his own would rate. They say his are all straight lines, because he does it with his hands, up close, and straight lines do not count.']],()=>{apply({aff:2});done()})});

l64('c64_book',['bedroom','atrium'],.35,()=>tier()>=1&&S.day>=5,done=>{const m=m64();say([
 ['',m?'V has one of your notebooks open on his knee. He did not hear you come in.':'There is a notebook under the couch cushion that is not V’s. He opens it to see whose it is.'],
 ['','It is full of solved problems, front to back. No crossings-out. The dates go back two years. Some pages have a coffee ring; one has a bloody thumbprint at the corner, perfectly dry.'],
 ['','At the top of one page, in small capitals: FOR FUN. At the top of the next: ALSO FOR FUN.'],
 ['K9','(turning a page) These are university problems.'],
 ['hitmeuppp',MV('i found a book in a bin.','found a textbook in a skip once. did all of it','I found the textbook in a skip when I was fifteen. I did all of it.','I found the textbook in a skip behind a college when I was fifteen. Somebody had chucked it at the end of term. I did every page in a year, in the cab of a truck, with a torch. Then I started again from page one.')],
 ['','He closes the notebook carefully and gives it back, and asks if they would let him read it properly some time. They say yes before they have thought about it.']],()=>{apply({aff:3});S.f.c64Book=1;done()})});

l64('c64_skin',['studio'],.4,()=>frT('a')>=1&&(typeof angWhere!=='function'||!angWhere()),done=>{const m=m64();say([
 ['',m?'Angel is doing her face at the vanity. You’re on her bed with a notebook, doing a definite integral to unwind.':'Angel is doing her face at the vanity. Misaki is on their bed with a notebook, and V is waiting for both of them in the doorway.'],
 [AN,'what are you doing'],
 ['hitmeuppp',MV('calculus.','calculus','Calculus.','Calculus. An integral. It’s relaxing.')],
 [AN,'oh i love calculus. their eye cream is so good. the one in the little frosted pot.'],
 ['','Nobody corrects them.'],
 [AN,'what’s yours doing for you. you have really good skin actually.'],
 ['hitmeuppp',MV('...it keeps me calm.','it’s. yeah. it keeps me calm','It keeps me calm.','It keeps me calm. It takes the area under things. Very gentle.')],
 [AN,'see. i knew it. send me the link.']],()=>{fr('a',2);calm(2);done()})});

l64('c64_hole',['dp_forest'],.4,()=>frT('r')>=1,done=>{const m=m64();say([
 ['','The forest, three in the morning, a hole. Ronin is digging and singing a hymn. Angel is rating the shovels.'],
 [AN,'this one’s a seven. this one has a splinter. this one’s ronin’s and it has a skull on it, ten.'],
 ['hitmeuppp',MV('needs to be deeper.','deeper. he’s like 0.07 cubic metres','He’s about point zero seven cubic metres. It’s not deep enough.','He’s about point zero seven cubic metres if you integrate him properly, cross-section by cross-section. Shoulders are the problem. You need another forty centimetres or a fox gets his hand by Thursday.')],
 [RN,'(still digging) Did you just do the integral of a guy.'],
 ['hitmeuppp',MV('ya.','yeah','Yes.','Yeah. Roughly. Ellipses, stacked.')],
 [RN,'Fuckin’ love you, gremlin. Gimme the forty.'],
 ['',m?'He digs the forty. You were right about the shoulders.':'He digs the forty. They were right about the shoulders.']],()=>{fr('r',2);fr('a',1);done()})});

/* the gacha arc, seen in passing */
l64('g64_couch',['atrium'],.5,()=>g64N()>=2&&g64N()<6,done=>{const m=m64();say([
 ['','Angel is on V’s couch with her phone clutched to her chest and her eyes shut.'],
 [AN,'don’t look at me. i’m at eighty-nine. i’m letting it rest.'],
 ['',m?'You ask why a phone needs to rest.':'V asks why a phone needs to rest.'],
 [AN,'the bells can smell fear.'],
 ['','The grey hound comes over and lays its huge head on her stomach. She takes that as a sign and opens her eyes and prays.'],
 ['','It is a man with a lantern.'],
 [AN,'i’m going to put this phone in the hounds’ bowl. i mean it.']],()=>{fr('a',1);done()})});

/* the rest of the house and the city */
l64('x64_hound',['kennel'],.35,()=>frT('r')>=1,done=>{const m=m64();say([
 ['','Ronin is in the kennel trying to teach the black hound to shake hands. He has been at it for an hour. He has a bag of something red.'],
 [RN,'Paw. Paw. C’mon. Paw.'],
 ['','The black hound sits and looks at him. It does not blink. It has not blinked for an hour.'],
 [RN,'He’s judgin’ me. Vee. Is he judgin’ me.'],
 ['K9','Yes.'],
 [RN,'For what.'],
 ['K9','He has not said.'],
 ['','The hound eats the whole bag in one movement, bag included, and lies down with its back to Ronin.']],()=>{fr('r',2);if(S.dogs)Object.keys(S.dogs).forEach(k=>S.dogs[k]=clamp(S.dogs[k]+2));done()})});

l64('x64_claw',['mall'],.3,()=>frT('a')>=1,done=>{const m=m64();say([
 ['','The arcade in the square. Angel has put twenty-two dollars into the claw machine for a plush bat with a heart on its chest.'],
 [AN,'it’s rigged. the claw goes soft at the top. it’s literally designed to drop it. it’s gambling for babies.'],
 ['hitmeuppp',MV('i can do it.','gimme a sec. watch the swing.','Give me a second. Watch the swing.','Give me a second. The cable’s got a swing on it, about a second and a half each way. You don’t drop it on the bat, you drop it where the bat’s going to be.')],
 ['',(m?'You get':'Misaki gets')+' the bat on the second try. A security guard comes over to ask if everything is all right, sees Ronin leaning on the side of the machine, and decides that it is.'],
 [AN,'say “gambling for babies” back to me. say it.'],
 ['hitmeuppp',MV('nope.','nope. ur holding the bat.','No. You’re holding the bat.','No. You’re hugging the bat. You know exactly what you said.')]],()=>{fr('a',2);apply({aff:1});done()})});

l64('x64_wash',['laundro'],.4,()=>frT('r')>=1||frT('a')>=1,done=>{const m=m64();say([
 ['','The laundromat at three in the morning. Three machines on cold, because blood sets in hot water. The four of them are the only people here.'],
 [AN,'cold for blood. always cold. say it with me.'],
 ['','Ronin is folding everybody’s things, which nobody asked him to do. He holds up a pair of '+(m?'your':'Misaki’s')+' socks with frogs on them.'],
 [RN,'These yours, gremlin? Fuckin’ frogs. These the kill socks?'],
 ['hitmeuppp',MV('lucky socks.','lucky socks. don’t fold them weird','Those are my lucky socks. Don’t fold them like that.','They’re the lucky socks. Don’t ball them, you stretch the elastic. If the elastic goes, the luck goes, and then you lot are stuck with me unlucky.')],
 ['','He folds them correctly, flat, toe to toe. Then he folds V’s shirts, and V watches him do it and says nothing about how it is wrong.']],()=>{fr('r',2);calm(2);done()})});

l64('x64_green',['green'],.35,()=>frT('a')>=1,done=>{const m=m64();say([
 ['','Angel is filming a plant tour in V’s greenhouse for Maria’s channel. V has agreed on the condition that she does not film the back two rows.'],
 [AN,'(as Maria) and this is lavender, which is so calming. and this is basil. and this is, um.'],
 ['K9','(off camera) Hemlock.'],
 [AN,'(as Maria) parsley! wild parsley. so fresh. you guys can go and forage for it in any ditch.'],
 ['','She cuts that part out of the video before it goes up. She keeps the raw clip on her phone, and plays it to Ronin twice, and both times he cries laughing.']],()=>{fr('a',2);done()})});

l64('x64_spar',['training'],.35,()=>frT('r')>=1,done=>{const m=m64();say([
 ['',m?'Sparring in the training hall. Ronin goes for your knees, and you put him on his back in a second and a half and sit on his chest.':'Ronin and Misaki are sparring in the training hall. Ronin goes for their knees, and they put him on his back in a second and a half and sits on his chest.'],
 [RN,'(winded) If you wanted me on my back, gremlin, all you had t’do was buy me dinner.'],
 ['hitmeuppp',MV('ur not worth dinner.','u wish. ur a two drink guy at most','You’re worth a drink. Two, at most.','I’ve seen your apartment. You’re a two-drink guy at best, and one of them would be the water I gave you for the concussion.')],
 [RN,'Two drinks. I’ll take that. Gimme the knee next time, I like it.'],
 ['','He taps out, still grinning. V, in the doorway with a towel over his arm, writes down the second and a half.']],()=>{fr('r',2);apply({edge:1});done()})});

l64('x64_car',['garage'],.3,()=>frT('r')>=1,done=>{const m=m64();say([
 ['','Somebody has been in V’s car. The seat is all the way back. There is a hymn sheet on the dashboard, and glitter in the footwell, and a single silver skull ring in the cup holder.'],
 ['K9','Ronin.'],
 [RN,'(from the far side of the garage, under a tarp) It was Angel.'],
 [AN,'(from inside the car, lying down in the back seat) it was ronin.'],
 ['',m?'You ask how long they have both been in here.':'V asks how long they have both been in here.'],
 [AN,'since tuesday. it’s the quietest room in the city. your car is a church, v.'],
 ['','V leaves them there. He takes the bus to the gala, in the coat, and does not mention it to anybody.']],()=>{fr('r',1);fr('a',1);done()})});

/* the V/Misaki route: flirting, adult and not explicit */
l64('f64_shelf',['vbath'],.4,()=>fl64(),done=>{const m=m64();say([
 ['',m?'You’re in V’s bath with the door unlocked, shirtless, the way you always are in this house, and you have used every bottle on his shelf. There are eleven.':'Misaki is in V’s bath with the door unlocked, shirtless, the way they always are in this house, and they have used every bottle on his shelf. There are eleven.'],
 ['K9','(in the doorway) That is a forty dollar serum.'],
 ['hitmeuppp',MV('smells like u.','it smells like u. so','It smells like you. So I used all of it.','It smells like you. I thought I’d see if it worked better on somebody who actually goes outside. Come here and smell it, tell me if it worked.')],
 ['','He comes here. He checks, carefully, at their neck, for longer than the question needs.'],
 ['K9','It is working.'],
 ['hitmeuppp',MV('ur blushing.','ur ears are red','Your ears have gone red.','Your ears have gone red, V. I can see them from here. Shut the door, you’re letting the steam out.')],
 ['',sugOn()?'He shuts the door. He stays on the inside of it.':'He shuts the door and sits down on the bath mat with his back against the tub. They put one wet hand on his head and leave it there while he tells them what each of the eleven bottles is for.']],()=>{apply({aff:4});done()})});

l64('f64_roof',['roof'],.4,()=>fl64()&&c64Any(),done=>{const m=m64();say([
 ['',m?'The roof at night. You have your feet on V’s knees and you’re reading him calculus pick-up lines off a website.':'The roof at night. Misaki has their feet on V’s knees and is reading him calculus pick-up lines off a website.'],
 ['hitmeuppp',MV('r u a function. bc i wanna find ur max','are you a function? because i want to find your maximum','Are you a function? Because I’d like to find your maximum.','Are you a differentiable function? Because I’d like to find your maximum. Set you to zero, do the second-derivative test, all of it.')],
 ['K9','My second derivative is negative everywhere. You would find it.'],
 ['',m?'It takes you a second to work out what he said.':'It takes them a second to work out what he said.'],
 ['hitmeuppp',MV('...did u just','did u just flirt in calculus','Did you just flirt back in calculus?','Did you just flirt back in calculus? V. V, that was so good. Say something else concave.')],
 ['K9','No. I have used it.'],
 ['','They do not let it go for the rest of the night. He does not want them to.']],()=>{apply({aff:4});done()})});

l64('f64_kitchen',['atrium'],.3,()=>fl64()&&S.day>=4,done=>{const m=m64();say([
 ['',m?'V is cooking. You’re sitting on the counter next to the stove, which he has asked you not to do eleven times.':'V is cooking. Misaki is sitting on the counter next to the stove, which he has asked them not to do eleven times.'],
 ['hitmeuppp',MV('let me taste.','let me taste it','Let me taste it.','Let me taste it. Come on. Hold the spoon out, I won’t bite. I might bite.')],
 ['',m?'He holds the spoon out. You take it slowly and look at him the whole time, on purpose.':'He holds the spoon out. They take it slowly and look at him the whole time, on purpose.'],
 ['K9','Is it seasoned?'],
 ['hitmeuppp',MV('needs more.','needs more of something. not salt','It needs something that isn’t salt.','It needs something, and it isn’t salt. Taste it off me and tell me what.')],
 [RN,'(from the couch, not looking up) I can hear this. All of it. Some of us are tryin’ t’watch a guy get stabbed on TV.']],()=>{apply({aff:3});fr('r',1);done()})});

/* how they fire: on walking into a room, sometimes, once each, one a day */
const K64ROOMS=[...new Set(K64L.reduce((a,e)=>a.concat(e.rooms),[]))];
const l64Pool=id=>K64L.filter(e=>e.rooms.includes(id)&&!S.seen[e.id]&&e.when());
function l64Run(e,done){S.seen[e.id]=1;S.f.k64LDay=S.day;S.f.k64LN=(S.f.k64LN||0)+1;save();e.run(done||(()=>{}))}
function l64Try(id,force){if(!S||!K64()||S.f.k64LDay===S.day&&!force)return null;const pool=l64Pool(id);if(!pool.length){if(Math.random()<.12)g64Ping();return null}
 const e=pk(pool);if(!force&&Math.random()>e.p)return null;return e}
/* waits for whatever else the room opened (an arrival line, an ambient line) to close, while you stay in the room */
function l64Wait(id,e,n){setTimeout(()=>{if(!S||!scene||!scene.isRoom||S.room!==id||S.seen[e.id]||S.f.k64LDay===S.day)return;if(dlg||ctrl||(typeof mgOn==='function'&&mgOn())){if(n<8)l64Wait(id,e,n+1);return}l64Run(e)},1000)}
K64ROOMS.forEach(id=>{const R=ROOMS[id];if(!R)return;const o=R.enter;R.enter=function(){const r=o?o.apply(this,arguments):undefined;
 try{const e=l64Try(id);if(e)l64Wait(id,e,0)}catch(x){}return r}});

/* a spot: Angel’s phone, face down on the couch (some days, while the arc is running) */
ROOMS.atrium.spots.push({at:[118,160],mark:[118,150],label:'Angel’s phone, face down',show:()=>K64()&&g64On()&&g64N()>=2&&((S.day*7+3)%5===0)&&!S.done.g64Phone,act:()=>{S.done.g64Phone=1;save();const m=m64();
 ask('','(It is buzzing. The case is warm. “YOUR TITHE IS READY” shows through it in gold.)',[
  {t:'Turn it over',fn:()=>{S.f.g64Peek=(S.f.g64Peek||0)+1;say([['','The lock screen is Saint Ottilie with her shears. Three hundred and twelve notifications. The most recent says “The bells miss you, Angelic.”'],[AN,'(from the kitchen) whoever’s touching my phone, she bites.']])}},
  {t:'Leave it',fn:()=>{say([['',m?'You leave it face down. It buzzes twice more while you stand there, like something under a floor.':'V leaves it face down. It buzzes twice more while he stands there, like something under a floor.']])}}])}});

/* ---------- 2 · calculus, the topics and the couch ---------- */
TDTOP_M.push({id:'c64_t_why',label:()=>'“Why calculus?”',show:()=>!S.dark&&!isLone()&&c64Any()&&!(S.talks&&S.talks.c64_t_why),run:b=>{S.talks=S.talks||{};warm('m','c64_t_why',3);S.talks.c64_t_why=1;say([
 ['K9','Why calculus?'],
 ['hitmeuppp',MV('idk. i like it.','idk. it just works','I don’t know. It always works.','I don’t know. I’ve thought about it. Everything else I ever liked either got sold or got taken off me, and you can’t pawn a derivative. And it always comes out. If you do it right, it comes out, every time, and nobody can say it didn’t.')],
 ['K9','The competition maths was not calculus.'],
 ['hitmeuppp',MV('nah. found the book later.','nah. found a textbook in a skip later','No. I found the textbook later, in a skip.','No, the competitions were all tricks and counting. Calculus I found myself, in a skip, at fifteen. It was the first thing that was mine that nobody gave me. Third at regionals got pawned. The skip book’s still in my go-bag.')],
 ['','He asks to see the go-bag. There is a rifle, two passports, a toothbrush, and a water-stained textbook with no cover.']],b)}});
TDTOP_V.push({id:'c64_t_teach',label:()=>'“want me to teach you integrals?”',show:()=>!S.dark&&!isLone()&&c64Any()&&tier()>=1&&!(S.talks&&S.talks.c64_t_teach),run:b=>{S.talks=S.talks||{};warm('v','c64_t_teach',3);S.talks.c64_t_teach=1;const f=fl64();say([
 ['hitmeuppp',MV('want me to teach u integrals','want me to teach u integrals. i’m good','Do you want me to teach you integrals? I’m good at it.','Do you want me to teach you integrals? I’m really good. I’d go slow. I’d be extremely patient with you, for once.')],
 ['K9','I did calculus at university. I have forgotten it on purpose.'],
 ['hitmeuppp',MV('why','why on purpose','Why on purpose?','Why would you forget it on purpose? That’s like throwing a rifle in the river because you’re not using it this week.')],
 ['K9','To make room. I keep the hounds’ weights, everyone’s dosages, and the names.'],
 f?['hitmeuppp',MV('i’ll teach u anyway','i’ll teach u anyway. on the couch. lights off','I’ll teach you anyway. On the couch, with the lights off.','I’ll teach you anyway. On the couch, lights off, one theorem at a time. You can forget it again after. I’ll make it worth the room.')]:['hitmeuppp',MV('i’ll teach u anyway','i’ll teach u anyway. ur gonna love it','I’ll teach you anyway.','I’ll teach you anyway. One a week. You’re going to love it and hate that you love it.')],
 ['','He says yes. The first lesson is on a napkin. He gets the first one right, and they are more pleased about it than about anything they have done all week.']],b)}});
TDTOP_V.push({id:'g64_t_angel',label:()=>'“are we doing something about angel and the nun”',show:()=>!S.dark&&!isLone()&&g64N()>=4&&g64N()<8&&!(S.talks&&S.talks.g64_t_angel),run:b=>{S.talks=S.talks||{};warm('v','g64_t_angel',2);S.talks.g64_t_angel=1;say([
 ['hitmeuppp',MV('should we do smth abt angel','are we doing something about angel and the nun','Are we going to do something about Angel and the nun?','Are we going to do something about Angel and the nun? She asked me to blow on her phone at three in the morning, V. I did it. I’d do it again. That’s how I know it’s bad.')],
 ['K9','I have started a folder.'],
 ['hitmeuppp',MV('ofc u have','of course u have','Of course you have.','Of course you’ve started a folder. What colour.')],
 ['K9','Pink. It is hers, after all.']],b)}});

/* the side activity: integrals on the couch */
const C64Q=[
 m=>m?[['','You lie on V’s couch with your head on the arm and the notebook held over your face, and do integrals until the sun moves across the floor. The pale hound sleeps on your feet. Your shoulders come down an inch every page.']]:[['','Misaki lies on the couch with the notebook over their face doing integrals. V reads in the chair. Nobody talks. Every so often they say “oh, nice,” to nobody, and turns the page.']],
 m=>m?[['','You do six integrals by substitution. The last one comes out to exactly pi over four, and you say “there you are” out loud to it like a dog that came home.']]:[['','The last integral comes out to exactly pi over four. Misaki says “there you are” to it out loud, the way he talks to the old hound when she comes in out of the rain.']],
 m=>m?[['','Ronin comes in, looks at the page, says “nope,” and lies down on the floor next to the couch to be near it anyway. He falls asleep. You finish the chapter over his snoring.']]:[['','Ronin comes in, looks at Misaki’s page, says “nope,” and lies down on the floor beside the couch to be near it anyway. He is asleep in five minutes.']],
 m=>m?[['','Angel sits on the end of the couch and paints your toenails while you work. She asks what the squiggly S is. You tell her it means “add up all the tiny bits.” She says that’s what she does with her followers.']]:[['','Angel paints Misaki’s toenails at the end of the couch while they work. She asks what the long S is. Misaki says it means adding up all the tiny bits. Angel says that is what she does with her followers.']]];
const _shC64=sideHub;sideHub=function(late){const o=_shC64(late);try{if(!K64()||!c64Any())return o;const d=S.done.c64Couch;
 return o.concat([{t:m64()?'Integrals on the couch':'Sit with Misaki while they do integrals',sub:d?'done today':'costs time · the notebook, the couch',dis:!!late||!!d,fn:()=>{spend();S.done.c64Couch=1;const n=S.f.c64N||0;S.f.c64N=n+1;save();go(cutBg('#0a0a10'));
  say(C64Q[n%C64Q.length](m64()),()=>{if(m64()){calm(5);apply({edge:-2})}else apply({aff:2});hub()})}}])}catch(e){return o}};

/* ---------- threads ---------- */
txDef('tx_g64_3am',{with:'a',pov:'m',prio:2,when:()=>K64()&&g64N()>=2&&g64N()<8,nodes:{
 start:{in:()=>['are u awake','be honest. if i spend $99.99 is that a lot or is that a normal amount'],expire:3,
  opts:()=>[{t:'“that’s a lot”',fx:()=>fr('a',1),reply:()=>['ok but what if it was in candles'],next:'two'},
   {t:'“depends. is it for the nun”',fx:()=>fr('a',2),reply:()=>['it’s for the nun'],next:'two'}]},
 two:{in:()=>['i’m going to do it. i just wanted someone to know. like a witness'],
  opts:()=>[{t:'“witnessed. go get them”',fx:()=>fr('a',2),reply:()=>['lantern man. lantern man again. i hate him. i love you. goodnight']},
   {t:'“put the phone in the freezer”',fx:()=>fr('a',1),reply:()=>['you can still pray from the freezer misaki. i checked']}]}}});
txDef('tx_g64_v',{with:'a',pov:'v',prio:2,when:()=>K64()&&g64N()>=3&&g64N()<8,nodes:{
 start:{in:()=>['hypothetically. if someone needed a small loan','not for anything bad. for a saint'],expire:3,
  opts:()=>[{t:'“No.”',fx:()=>fr('a',1),reply:()=>['ok. ok. that was a test. you passed. i hate it'],next:'two'},
   {t:'“How small?”',fx:()=>fr('a',1),reply:()=>['two ninety-nine ninety-nine'],next:'two'}]},
 two:{in:()=>['would it help if i said she has shears'],
  opts:()=>[{t:'“It would not.”',fx:()=>fr('a',1),reply:()=>['you’re so boring. i’m telling the hounds']},
   {t:'“I will pay for one candle.”',fx:()=>fr('a',2),reply:()=>['one candle. ONE CANDLE. v that’s 1/90th of a prayer','...thank you. i’m keeping the receipt in my wallet']}]}}});
txDef('tx_g64_ron',{with:'r',pov:'m',prio:2,when:()=>K64()&&g64N()>=5&&g64N()<8,nodes:{
 start:{in:()=>['gremlin. real talk. what’s a pity counter'],expire:3,
  opts:()=>[{t:'“why do u want to know”',fx:()=>fr('r',1),reply:()=>['no reason. askin for angel'],next:'two'},
   {t:'“it’s how many pulls till they have to give u one”',fx:()=>fr('r',1),reply:()=>['huh. so they gotta give it to you eventually. like a confession'],next:'two'}]},
 two:{in:()=>['don’t tell vee i asked'],
  opts:()=>[{t:'“ronin r u playing the nun game”',fx:()=>fr('r',2),reply:()=>['I’m playin the PRIEST game. different guy. he’s got a bell made of teeth']},
   {t:'“secret’s safe”',fx:()=>fr('r',2),reply:()=>['good. ’cause I just spent 60 bucks on a demon priest and I feel fuckin GREAT']}]}}});
txDef('tx_c64_ron',{with:'r',pov:'m',prio:1,when:()=>K64()&&!!(S.seen&&S.seen.c64_limits),nodes:{
 start:{in:()=>['ok so','if I keep walkin half the way to the bar. do I ever get a drink'],expire:3,
  opts:()=>[{t:'“no. u get infinitely close”',fx:()=>fr('r',1),reply:()=>['that’s fuckin bleak gremlin'],next:'two'},
   {t:'“yes. the series converges”',fx:()=>fr('r',2),reply:()=>['I don’t know what that means but I feel good about it'],next:'two'}]},
 two:{in:()=>['I’m at the bar btw. walked the whole way. fuck limits'],
  opts:()=>[{t:'“that’s not how it works”',fx:()=>fr('r',1),reply:()=>['it is when you got legs']},
   {t:'“buy me one”',fx:()=>fr('r',2),reply:()=>['already did. it’s halfway to you. get here']}]}}});
txDef('tx_c64_v',{with:'m',pov:'v',prio:1,when:()=>K64()&&c64Any()&&tier()>=1,nodes:{
 start:{in:()=>['(a photo: an integral on a napkin, with a ring of something brown at one corner)','did this at the job. waiting for him to get out of the car','it came out to 1. i love when it comes out to 1'],expire:3,
  opts:()=>[{t:'“Is the brown ring coffee?”',fx:()=>apply({aff:1}),reply:()=>['mostly'],next:'two'},
   {t:'“It is a very neat integral.”',fx:()=>apply({aff:2}),reply:()=>['it IS. thank u. ronin said it looked like a worm'],next:'two'}]},
 two:{in:()=>['he got out of the car btw. home by 9'],
  opts:()=>[{t:'“I will keep the kettle on.”',fx:()=>apply({aff:2}),reply:()=>['and the napkin. keep the napkin']},
   {t:'“Bring the napkin.”',fx:()=>apply({aff:2}),reply:()=>['for ur file? creep','...ok. it’s in my pocket']}]}}});

/* ---------- ending lines ---------- */
const _xe64=extraEnding;extraEnding=function(){const L=_xe64();try{if(!S||!S.f)return L;const f=S.f;
 if(f.g64End==='limit')L.push('Angel still prays to the nun at 12:01 on the first of every month, forty dollars exactly, and sends the screenshot to the server as proof.');
 if(f.g64End==='keep')L.push('Saint Ottilie of the Shears reaches the highest level in the game. So does a demon priest with a bell made of teeth, on a phone with a crowbar on its case.');
 if(f.c64Book)L.push('There is a shelf in the house for notebooks of solved problems, in order. Each one says FOR FUN at the top of the first page.')}catch(e){}return L};
