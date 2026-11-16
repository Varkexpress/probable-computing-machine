/* ===================== RONIN AND ANGEL, THEIR OWN ARCS (kc57) =====================
   Two personal arcs with a set-up in normal play, a complication in Act II and a payoff in Act III and the epilogue.
   Ronin: "two streets over". He has not been late to anything since he was nine (the church clock stopped at twenty
   to eleven). The one night it mattered, the kidnapping, he was two streets over. Since she came home he has parked
   two streets from every one of her jobs. What is done about the truck decides where he stands on the boat, and
   whether he ever sits in the front pew.
   Angel: "my somebody". The rule (none of them can say they didn't have it coming) and the promise from k29_angelwhy:
   the day she kills for herself, somebody takes the rifle. In Act II the account that sent her the wrong man sends
   her a tip about the copycat, and she wants him for herself. What her somebody does that night decides Act III and
   the epilogue.
   Flags (all in S.f): k57rClock, k57rWatch, k57rWatchV, k57rStreets ('let'|'stop'|'closer'), k57rBy, k57rKnow,
   k57rBoat ('on'|'two'|'home'), k57rPew; k57aCode, k57aAsk, k57aRifle ('taken'|'went'|'rule'|'alone'), k57aNight,
   k57aBack, k57aEpi. See docs/notes_friends.md. */
const K57=()=>{try{return !!S&&!isLone()&&!S.dark&&!(S.f&&S.f.abroad)&&S.phase!=='taken'}catch(e){return false}};
const k57M=()=>S.pov!=='v';
const k57Ev=(id,when,run)=>EVENTS.push({id,when:()=>{try{return K57()&&when()}catch(e){return false}},run});
const k57Done=id=>!!(S.f.k57d&&S.f.k57d[id]);
const k57Mark=id=>{S.f.k57d=S.f.k57d||{};S.f.k57d[id]=1;save()};
const k57A3=()=>S.phase==='act3'&&typeof a3d==='function'&&a3d()>=2;
const k57A2=()=>S.phase==='act2'&&S.day>=(S.act2Start||0)+1;
/* who Misaki is in a line: "you" in her POV, "Misaki" in V's */
const k57Her=(m,v)=>k57M()?m:v;

/* ===================================== RONIN ===================================== */
/* R1 · set-up: the clock at twenty to eleven */
function k57rClock(){const m=k57M();go(cutBg('#120c0a'));k57Mark('r_clock');
 say([['','Ronin’s workshop on a Sunday afternoon, after church. Above the bench, between the crowbars, there is a clock out of a church: the big kind, Roman numerals, a brass hand as long as your forearm. It has stopped at twenty to eleven.'],
  [RN,'Took it off the wall the night I left town. Hung over the door at the back, so the whole congregation could turn ’round and see who come in late.'],
  [RN,'Service was half ten. I come in at ten forty once. Once. I was nine. Every head in the place turned ’round to look at me.'],
  [m?'hitmeuppp':'K9',m?MV('and?','and then what','And then what happened?','And then what? You can’t stop a story at the good bit, that’s my move.'):'And then?'],
  [RN,'Then I got the belt, and then I got the front row for a year, so everybody could keep an eye on me. Front row’s where I met him. Devil sits up front, y’know. Best view of the priest.'],
  [RN,'Ain’t been late since. Not to a job, not to a dinner, not to the fuckin’ dentist. He likes a show that starts on time.'],
  ['',m?'He’s right. In all the time you’ve known him, nobody has ever seen Ronin walk in a minute late. He shows up to Sunday dinner at the exact minute, every week, with a bottle and blood under one fingernail.':'V has a note in Ronin’s file to the same effect. In all the years V has known him, Ronin has never once been late. He arrives at Sunday dinner on the minute, every week, with a bottle and blood under one fingernail.']],
  ()=>ask(RN,'(He has gone back to filing a crowbar. The clock says twenty to eleven.)',[
   {t:m?'Ask him why he kept it.':'Ask him why he kept it.',fn:()=>{S.f.k57rClock='asked';fr('r',2);say([
     [RN,'Kept it ’cause it’s right twice a day and wrong all the rest. Like me.'],
     [RN,'Nah, that’s bullshit, I just made that up. I kept it so I’d know what time it is when I fuck up. Twenty to eleven. Always is.'],
     ['','He throws you a beer from the fridge without looking, hard, at your head.']],hub)}},
   {t:'Try to wind it.',fn:()=>{S.f.k57rClock='wound';fr('r',1);say([
     ['','He lets you. He even hands you the key off a nail. The spring is broken; the hand jumps a hair and settles back on twenty to eleven.'],
     [RN,'Been broke since I took it. Good. Stays there. Leave it be, you’ll hurt its feelings.']],hub)}},
   {t:'Leave it.',fn:()=>{S.f.k57rClock='left';fr('r',1);say([
     ['','You don’t ask. Ronin puts the gospel radio on, loud enough that the clock rattles in its case, and sings along to the second verse in a voice nobody expects out of him.']],hub)}}]))}

/* R1 · texture: the stopwatch at Sunday dinner */
k57Ev('k57r_minute',()=>['normal','act2'].includes(S.phase)&&frT('r')>=1&&S.day>=4,done=>{const m=k57M();say([
 ['','Sunday dinner. V says seven. At six fifty-nine the hounds stand up and face the front door, all four, and at seven exactly the bell goes.'],
 [AN,'how. HOW. i’ve watched him sit in the truck outside for ten minutes waiting'],
 [RN,'(coming in, bottle under his arm) Early’s for cowards. Late’s for dead men. Seven’s seven.'],
 ['',m?'He drops the bottle on the island and takes the chair at the end with his back to the wall, where he can see every door.':'He drops the bottle on the island and takes the chair at the end with his back to the wall. V noted years ago that it is the only seat in the kitchen with a sightline to every door.']],()=>{fr('r',1);done()})});

/* R1 · threads: the Devil says hi */
txDef('tx_k57r_watch',{with:'r',pov:'m',prio:1,when:()=>K57()&&['normal','after','act2'].includes(S.phase)&&frT('r')>=1&&S.day>=3,nodes:{
 start:{in:()=>['on a job','talkin to the devil again. out loud. he says hi','guy on the floor thinks i’m talkin to him. i’m not. he ain’t important enough'],expire:2,
  onExpire:()=>{S.f.k57rWatch='none'},
  opts:()=>[{t:'“tell him i said hi back”',fx:()=>{S.f.k57rWatch='hi';fr('r',2)},reply:()=>['he says he knows who you are','says you got a real nice trigger finger. he’s a fan','I’m a bigger fan. don’t tell him']},
   {t:'“is he watching me too”',fx:()=>{S.f.k57rWatch='me';fr('r',2)},reply:()=>['course he is. you’re the best show in town','I’ll keep an eye on you for him. somebody oughta take notes']},
   {t:'“you’re fucking insane”',fx:()=>{S.f.k57rWatch='insane';fr('r',1)},reply:()=>['and punctual','guy on the floor agrees with you btw. he’s the only one who does and look where it got him']}]}}});
txDef('tx_k57r_watch_v',{with:'r',pov:'v',prio:1,when:()=>K57()&&['normal','after','act2'].includes(S.phase)&&frT('r')>=1&&S.day>=3,nodes:{
 start:{in:()=>['(a photograph: the back pew of a church, empty, a hymn book open on it)','10:40. on time'],expire:2,
  onExpire:()=>{S.f.k57rWatchV='none'},
  opts:()=>[{t:'“On time for what?”',fx:()=>{S.f.k57rWatchV='what';fr('r',2)},reply:()=>['for him. he sits up front. i sit back here so he has to turn round to see me','you should come. you’d hate it so much']},
   {t:'“The service begins at half past ten. You are ten minutes late.”',fx:()=>{S.f.k57rWatchV='late';fr('r',2)},reply:()=>['how the fuck do you know that','...course you got a file on the church. course you do','ten forty’s the point vee. ten forty’s mine']}]}}});

/* R2 · complication (Act II): the truck two streets over */
function k57rTruck(){const m=k57M();go(cutBg('#0a0c10'));k57Mark('r_truck');S.f.k57rBy=m?'m':'v';
 if(m)return say([
  ['','You come down the fire stairs from a job across the river, the case on your back and your ears still ringing, and two streets over, under the dead streetlamp by the laundromat, there is a black pickup with its engine running and gospel coming out of a crack in the window.'],
  ['','Everybody who has ever owed Ronin money knows the truck.'],
  ['','He doesn’t see you until you knock on the glass. Then he winds the window down, slowly, the whole way, like a man with nothing to hide.'],
  [RN,'Fancy seein’ you here.'],
  ['hitmeuppp',MV('ronin.','ronin. how long.','Ronin. How long?','Ronin. How long have you been parking two streets from my jobs?')],
  ['','He flips the sun visor down. On the back of it there are tally marks in silver pen, in fives, more than you can count from the pavement.'],
  [RN,'Since you come home. Every one. I don’t come in. I sit here with the radio, and I listen for the shot, and then I count to a hundred and go get a burger.'],
  [RN,'Two streets. That’s where I was last time. Figured if I’m gonna be two streets over, I’m gonna be two streets over on purpose.'+(S.f.k57rClock?' Like the clock.':'')]],
  ()=>ask(RN,'(He is holding the steering wheel with both hands, which he never does.)',[
   {t:'Get in the passenger side.',fn:()=>{S.f.k57rStreets='let';S.f.k57rKnow=1;fr('r',3);calm(2);say([
     [RN,'Burger?'],
     ['','You eat two in his truck with your boots on his dashboard while he drives the long way back. Nobody says anything about the visor. At a red light he adds a mark while you watch, and he doesn’t hide it, and you don’t tell him to stop.']],()=>{k57rTwo();hub()})}},
   {t:'Tell him to fuck off home.',fn:()=>{S.f.k57rStreets='stop';S.f.k57rKnow=1;fr('r',1);apply({edge:1});say([
     ['hitmeuppp',MV('i don’t need a babysitter.','i don’t need a fucking babysitter, ronin.','I don’t need a babysitter, Ronin. I need you to fuck off home.','I don’t need a babysitter. I was doing this before I met any of you, and I’m still doing it, and I don’t need somebody counting to a hundred two streets away.')],
     [RN,'Babysitter. Fuck you. Babysitters get paid.'],
     [RN,'Fine. Home. You win. Don’t get shot.'],
     ['','He pulls out without looking, and at the end of the street he runs the red light on purpose so that you’ll see him do it.']],()=>{k57rTwo();hub()})}},
   {t:'“Two streets is too far. Park at one.”',fn:()=>{S.f.k57rStreets='closer';S.f.k57rKnow=1;fr('r',4);apply({heat:-2});say([
     ['hitmeuppp',MV('one street. and bring two burgers.','if you’re gonna sit there, sit closer. one street. two burgers.','If you’re going to sit there, sit somewhere useful. One street. You can cover the back door.','If you’re going to do it, do it properly. One street over, where you can see the back door. And bring two burgers, I’m not sharing mine.')],
     ['','Ronin laughs like a lion in feast, so loud a light comes on in the flat above the laundromat.'],
     [RN,'One street. Fuck me. That’s practically a date.'],
     ['','He takes the silver pen out of the visor, writes a 1 on the dashboard, and circles it twice.']],()=>{k57rTwo();hub()})}}]));
 say([
  ['','V reviews the traffic cameras after every one of Misaki’s jobs. He has never told her that he does it. Tonight he notices something in the corner of the frame that he has been looking past for weeks.'],
  ['','A black pickup, parked two streets from her, engine running. It is there on four different nights, in four districts. It is always two streets.'],
  ['','He finds Ronin on the roof of the garage at two in the morning, where Ronin sits when he cannot sleep, and lays the stills out on the gravel between them one by one.'],
  [RN,'Aw. You made me a photo album.'],
  ['K9','You have been two streets from every job she has done since she came home.'],
  [RN,'Yep.'],
  ['K9','Why two?'],
  [RN,'’Cause that’s where I was last time. You know that. It’s in the file.'],
  [RN,'Don’t tell her. She’ll think I think she can’t do it. I know she can fuckin’ do it, Vee. It ain’t for her.']],
  ()=>ask('K9','(The stills are on the gravel. Ronin has put a rock on each one so the wind cannot take them.)',[
   {t:'“I will tell her.”',fn:()=>{S.f.k57rStreets='stop';S.f.k57rKnow=1;fr('r',1);if(typeof relApply==='function')relApply({rivalry:2,trust:2});say([
     ['K9','I do not keep things from her about her own work. You know that. It is also in the file.'],
     [RN,'Course you don’t. Fuck you, then.'],
     ['','The next evening Misaki texts Ronin one word, which V does not see, and the truck is not there any more. Ronin sends V a photograph of a middle finger with a silver skull ring on it.']],()=>{k57rTwo();hub()})}},
   {t:'Pick up the stills and say nothing.',fn:()=>{S.f.k57rStreets='let';S.f.k57rKnow=0;fr('r',3);if(typeof relApply==='function')relApply({rivalry:-2});say([
     ['','V gathers the stills, squares the edges, and tears them in half, and then in half again.'],
     ['K9','I have not seen these.'],
     [RN,'Look at you, lyin’. Devil’s gonna be so proud.']],()=>{k57rTwo();hub()})}},
   {t:'“Two streets is a poor position.”',fn:()=>{S.f.k57rStreets='closer';S.f.k57rKnow=0;fr('r',4);if(typeof relApply==='function')relApply({rivalry:-4});say([
     ['K9','If you are going to do it, do it properly. Two streets is a poor position. You cannot see the exits from there.'],
     ['','He takes out a pen and writes her next three jobs on the back of a still, with the addresses and the best place to park for each.'],
     [RN,'Vee. Is this a fuckin’ rota?'],
     ['K9','It is a sightline. Do not let her see you.'],
     [RN,'I’m the size of a door, Vee. In a pickup. Sure.']],()=>{k57rTwo();hub()})}}]))}
function k57rTwo(){try{const id=k57M()?'tx_k57r_two':'tx_k57r_two_v';const P=phS();if(!P.run[id])txStart(id)}catch(e){}}

/* R2 · threads: after the truck */
txDef('tx_k57r_two',{with:'r',pov:'m',prio:2,when:()=>false,nodes:{
 start:{in:()=>{const s=S.f.k57rStreets;return s==='stop'?['not there. fyi','am at home. watchin wrestling. truck’s downstairs with nobody in it, which is fine']
   :s==='closer'?['one street’s weird','i can hear you hum. you hum before you shoot. you know that']
   :['nice shot','(a photograph: the dashboard, a burger in its paper, the sun visor down, one more mark on it)']},expire:3,
  opts:()=>{const s=S.f.k57rStreets;
   if(s==='stop')return[{t:'“good”',fx:()=>fr('r',1),reply:()=>['yeah yeah','you owe me a burger. a hypothetical burger. for the job i didn’t sit outside of']},
    {t:'“…you can come back”',fx:()=>{S.f.k57rStreets='let';S.f.k57rBack=1;fr('r',3)},reply:()=>['wasn’t askin','already parked. two over. don’t look']}];
   if(s==='closer')return[{t:'“i do not hum”',fx:()=>fr('r',2),reply:()=>['you hum. it’s the hymn. the one off my radio','you stole my fuckin hymn and you hum it at people before you shoot em. that’s the best thing i ever heard']},
    {t:'“then sing along”',fx:()=>fr('r',2),reply:()=>['not on the clock','devil hates a duet. makes him feel left out']}];
   return[{t:'“how many now”',fx:()=>fr('r',2),reply:()=>['don’t count em out loud. bad luck','more than the rings. less than the rest']},
    {t:'“bring me fries next time”',fx:()=>fr('r',2),reply:()=>['already in the bag','they’re cold. you took too long. you always take too long, it’s a nice long count']}]}}}});
txDef('tx_k57r_two_v',{with:'r',pov:'v',prio:2,when:()=>false,nodes:{
 start:{in:()=>{const s=S.f.k57rStreets;return s==='stop'?['she told me to fuck off home','I went home. you happy']
   :s==='closer'?['position’s better. you were right','can see three exits and her hood from here. she hums before she shoots. you know that?']
   :['you tore em up. i saw','you lied to her for me. you don’t lie']},expire:3,
  opts:()=>{const s=S.f.k57rStreets;
   if(s==='stop')return[{t:'“Yes.”',fx:()=>fr('r',1),reply:()=>['course you are']},{t:'“No.”',fx:()=>fr('r',3),reply:()=>['...yeah','me neither. night vee']}];
   if(s==='closer')return[{t:'“I know.”',fx:()=>fr('r',2),reply:()=>['course you do. it’s in the file under hums']},
    {t:'“Do not let her see you.”',fx:()=>{S.f.k57rKnow=1;fr('r',2)},reply:()=>['vee I’m the size of a door, in a pickup','she saw me. she waved. she waved with the rifle']}];
   return[{t:'“I declined to volunteer it.”',fx:()=>fr('r',2),reply:()=>['that’s lyin in a suit','I’m keepin it. best thing you ever done for me and it was a crime']},
    {t:'“Do not make me regret it.”',fx:()=>fr('r',1),reply:()=>['you regret everything. I’m in the file under regret']}]}}}});

/* R2 · texture: the visor */
k57Ev('k57r_visor',()=>['act2','act3'].includes(S.phase)&&!!S.f.k57rStreets&&frT('r')>=1,done=>{const m=k57M(),s=S.f.k57rStreets;say(
 s==='stop'?[['','Ronin is at breakfast in V’s kitchen, early, with the truck keys on the island in front of him. He keeps turning them over. He has not been anywhere at night all week.'],
   [RN,'Watched eleven hours of wrestling. Eleven. I know all their names now. That’s on you.'],
   ['',m?'He says it to his eggs, and he doesn’t look up, and he salts them about nine times.':'He says it to his eggs. V watches him salt them about nine times and does not comment.']]
 :s==='closer'?[['',m?'You find a burger on the roof of the next building after a job, still warm, in its paper, with a 1 drawn on it in silver pen.':'Misaki comes home with a burger in a paper bag with a 1 drawn on it in silver pen, and does not explain it, and eats it standing at the sink.'],
   [RN,'(server) don’t say nothin. it’s just a burger. it fell off a truck']]
 :[['',m?'Ronin leaves his truck at V’s overnight. In the morning you look at the visor while he’s asleep on the couch. There are two more fives than last time.':'Ronin leaves his truck at the house overnight. V looks at the visor in the garage at five, on his way to feed the hounds. There are two more fives than last time.'],
   ['','Under the tally, very small, somebody has written “10:40” and crossed it out.']],()=>{fr('r',1);done()})});

/* R3 · payoff (Act III): where he stands on the boat */
function k57rBoat(){const m=k57M(),s=S.f.k57rStreets,kn=S.f.k57rKnow;go(cutBg('#0c0a0e'));k57Mark('r_boat');
 const L=[['','Ronin comes in through the kitchen door at ten forty exactly, with the crowbar over his shoulder, and sits on the island with his boots on V’s chairs.'],
  [RN,'Read my page in that ledger. They got me down as “the Butcher,” one T. I’m gonna make somebody eat that page.'],
  [RN,'Boat night. Where d’you want me.']];
 if(s==='stop')L.push([RN,m?'You told me home. I been home. I watched so much wrestling, Misaki.':'She told me home. I been home. I watched so much wrestling, Vee.'],[RN,'I’m askin’ once. Two streets. Just the one night. Then I go back to the wrestling.']);
 else if(s==='closer')L.push([RN,'One street, I figure. Or the boat. Fuck it. Put me on the boat.']);
 else if(s==='let')L.push(kn?[RN,m?'Don’t make that face. I been two streets over twenty-some times since you come home and you never said nothin’ after the first one, which is the nicest thing anybody ever done for me, and I’m gonna hold it against you.':'Don’t make that face. She knows. She got in the truck the one time and never said nothin’ after, and you never said nothin’ either. Nicest thing two people ever done for me. I’m gonna hold it against you both.']
   :[RN,m?'Don’t make that face. You don’t know nothin’ about where I park. Vee don’t know nothin’ either. Nobody knows nothin’.':'She don’t know. You know. That’s already one too many.']);
 else L.push([RN,'And don’t say home. Last time I was home, or near enough, two streets near enough, and look how that went.']);
 say(L,()=>ask(RN,'(He is turning one of his skull rings round and round on his finger.)',[
  {t:m?'“On the boat. Next to me.”':'“On the boat. Next to her.”',fn:()=>{S.f.k57rBoat='on';fr('r',4);say([
    [RN,m?'Next to you. Front row.':'Next to her. Front row.'],
    ['','He drums the rings on the crowbar, all nine at once, and laughs, and keeps it up for most of a minute, until V asks him to get his boots off the chairs.']],hub)}},
  {t:'“Two streets over. Where you always are.”',fn:()=>{S.f.k57rBoat='two';fr('r',2);say([
    [RN,'Two streets. Right. I’ll listen for it.'],
    ['','He nods a lot, as if that’s fine. Then he steals an apple out of V’s bowl and eats it core and all, staring at the clock on the oven.']],hub)}},
  {t:'“Stay home. Someone has to be left if it goes wrong.”',fn:()=>{S.f.k57rBoat='home';fr('r',1);apply({edge:1});say([
    [RN,'Somebody’s gotta be left. Sure. And it’s me. Course it’s me.'],
    ['','He goes out the back without the crowbar. At ten forty-one he comes back for it, and the whole kitchen hears him swear at the clock in the hall.']],hub)}}]))}

/* R3 · epilogue: the pew */
function k57rPew(){const m=k57M(),b=S.f.k57rBoat;go(cutBg('#100c0a'));k57Mark('r_pew');
 const L=[['','Sunday. The church across town. Ronin in his good jacket at ten twenty-five, early, which nobody alive has ever seen.']];
 if(b==='on')L.push(['','He walks past the back pew. He walks all the way up the aisle, past everyone, and sits in the front row, in the middle, where the whole congregation can see who came in, and he pats the seat beside him.'],
   [RN,'(under his breath) I was there. Right next to '+(m?'you':'her')+', on time, the whole fuckin’ night. First time since I was nine.'],
   [RN,'Devil can sit in the back for once. See how he likes it.']);
 else if(b==='two')L.push(['','He sits in the back pew, same as always, and puts his arm along the top of it.'],
   [RN,'Two streets. Heard every shot. Counted to a hundred like a good boy.'],
   [RN,'Back’s fine. Back’s where you can see the door.']);
 else if(b==='home')L.push(['','He sits in the back pew. He doesn’t fold his hands. When the priest says “deliver us from evil,” he doesn’t say “not today, Father.” He watches the clock over the door for the whole service.'],
   [RN,'(outside, after) I was home. '+(m?'You were':'She was')+' on a boat. I was home with the wrestling on, and I counted to a hundred about forty times.']);
 else L.push(['','He sits in the back pew, the way he does every week, with his head bowed like the most devout man in the building.'],
   [RN,'Ten forty. On time.']);
 say(L,()=>ask(RN,'(The service is starting. He has saved you the seat.)',[
  {t:'Sit next to him.',fn:()=>{S.f.k57rPew='with';fr('r',2);say([
    ['','You sit next to him. He sings every hymn, beautifully, and in the gaps he whispers the worst things anyone has ever said in a church, and you have to bite the inside of your cheek through the whole of the second reading.']],hub)}},
  {t:'“You can stop counting now.”',fn:()=>{S.f.k57rPew='stop';fr('r',3);calm(2);say([
    [RN,'Yeah? You gonna make me?'],
    ['','That afternoon he pulls the sun visor out of the truck with a screwdriver and hangs it on the workshop wall, tally side out, under the clock that says twenty to eleven. He doesn’t say anything about it. He puts the gospel on and makes you hold the ladder.']],hub)}}]))}

/* Misaki raises it with V */
TDTOP_V.push({id:'k57r_tv',label:()=>'“Did you know Ronin parks two streets from my jobs?”',show:()=>K57()&&!!S.f.k57rStreets&&S.f.k57rBy==='m'&&!(S.talks&&S.talks.k57r_tv),run:b=>{S.talks=S.talks||{};S.talks.k57r_tv=1;if(typeof warm==='function')warm('v','k57r_tv',3);say([
 ['hitmeuppp',MV('ronin parks outside my jobs.','did u know ronin parks two streets from my jobs','Did you know Ronin parks two streets from my jobs?','Did you know Ronin’s been parking two streets from every job I’ve done since I got back? With a tally. On the visor. In silver pen.')],
 ['K9','Yes. The truck is in the corner of the traffic footage. I did not tell you because it was not mine to tell.'],
 ['hitmeuppp',MV('u watch the footage??','you watch the footage of my jobs??','You watch the footage of my jobs?','Hold on. You watch the footage of my jobs? Every one?')],
 ['K9','Every one. He sits two streets away and I sit eleven kilometres away. Between us you have never been less alone in your life, and you were not supposed to find out about either of us.'],
 ['hitmeuppp',MV('you’re both freaks.','you’re both fucking freaks.','You’re both freaks.','You’re both fucking freaks. Keep doing it.')]],b)}});

/* ===================================== ANGEL ===================================== */
/* A1 · set-up: the pink safe */
function k57aSafe(){const m=k57M();go(cutBg('#140c10'));k57Mark('a_safe');
 const bd=S.seen&&S.seen.k29_bday;const why=S.seen&&S.seen.k29_angelwhy;
 say([['','Angel’s studio after hours. The ring light is off and the set is dark. Behind the rail of dresses there is a gun safe painted the same blush pink as the walls, so it won’t spoil a shot.'],
  [AN,why?'ok. so. the somebody thing. i meant it. this is the paperwork.':'ok. so. i need a somebody. it’s a whole thing. it’s you.'],
  [AN,'the shotgun’s maria’s. it lives in the closet with the shoes and it doesn’t count. the rifle lives in here. it’s mine. it’s the one i do the work with.'],
  [AN,'every one i ever did, somebody sent me. a tip, a client, a comment. i check it. i check it twice. then i do it, and none of them can say they didn’t have it coming. i never went out once because i wanted to.'],
  [AN,'the day i do. you open this, and you take it, and you don’t give it back however nice i ask. and i’ll ask so nice. i’ll cry. i look amazing when i cry.'],
  ['',bd?(m?'She types the code in front of you, slowly, so you can see it. It is the date she picked for your birthday.':'She types the code in front of you, slowly, so you can see it. It is the date she picked for Misaki’s birthday.'):'She types the code in front of you, slowly, so you can see it. Four numbers. The door opens on the rifle, standing in its foam like something asleep.']],
  ()=>ask(AN,'(She is watching your face, not the safe.)',[
   {t:'Learn the code.',fn:()=>{S.f.k57aCode='took';fr('a',3);say([
     [AN,'good. now forget you know it till you need it. like a fire exit.'],
     ['','She shuts the safe, turns the ring light on, and makes you sit for a full get-ready-with-me for a camera that is not recording, talking to it the entire time in Maria’s voice about the importance of a good primer.']],()=>{k57aCodeTx();hub()})}},
   {t:'Look at the dresses instead.',fn:()=>{S.f.k57aCode='away';fr('a',1);say([
     [AN,'rude. you have to look. looking is the job.'],
     ['','She changes the code while your back is turned, punches it in twice to be sure, and goes to make tea as though nothing has happened.']],()=>{k57aCodeTx();hub()})}},
   {t:'“How would I know it was for you?”',fn:()=>{S.f.k57aCode='took';S.f.k57aAsk=1;fr('a',3);say([
     [AN,'you’d know. i’d be happy.'],
     [AN,'like actually happy. not maria happy. you’ve never seen it. i’ve never seen it. that’s how you’d know.'],
     ['','She says it with a smile, the way she says everything, and then she asks whether you want oat milk.']],()=>{k57aCodeTx();hub()})}}]))}
function k57aCodeTx(){try{const id=k57M()?'tx_k57a_code':'tx_k57a_code_v';const P=phS();if(!P.run[id])txStart(id)}catch(e){}}

txDef('tx_k57a_code',{with:'a',pov:'m',prio:2,when:()=>false,nodes:{
 start:{in:()=>S.f.k57aCode==='away'?['changed it. new code. you looked at the dresses too long','(four numbers)','memorise it then delete this. i’m serious. i’m serious in a cute font']
   :['did you forget it yet','you have to forget it till the fire. that’s the deal'],expire:3,
  opts:()=>[{t:'“deleted. still in my head”',fx:()=>{S.f.k57aCode='took';fr('a',2)},reply:()=>['perfect. my somebody','ok say something normal now, i’m getting misty and my lashes are glued on']},
   {t:'“what if i’m the one who wants you to do one for yourself”',fx:()=>{S.f.k57aAsk=1;fr('a',1);apply({edge:1})},reply:()=>['then you ask me nice and you pay me','and i still give the money away, and you still take the rifle after','rules are rules babe. that’s what makes them hot']}]}}});
txDef('tx_k57a_code_v',{with:'a',pov:'v',prio:2,when:()=>false,nodes:{
 start:{in:()=>S.f.k57aCode==='away'?['changed the code. you looked at a dress for nine seconds, i counted','(four numbers)','don’t put it in a FILE']
   :['you didn’t write it down right','v. tell me you didn’t write it down'],expire:3,
  opts:()=>[{t:'“It is filed.”',fx:()=>{S.f.k57aCode='took';fr('a',2)},reply:()=>['NOT IN THE FILE','i swear to god if my safe code is in a manila folder next to my veneers']},
   {t:'“Why me?”',fx:()=>{S.f.k57aAsk=1;fr('a',3)},reply:()=>['because you’d actually do it','ronin would give it back the first time i cried. misaki would come with me','you’d put it in the vault and never think about it again. that’s love v']}]}}});

/* A1 · texture: where the names come from */
k57Ev('k57a_tips',()=>['normal','after','act2'].includes(S.phase)&&frT('a')>=1&&S.day>=3,done=>{const m=k57M();say([
 ['',m?'Two in the morning on Angel’s daybed. She has her laptop on her knees and you have your head on her shoulder, and she is reading her DMs out loud in Maria’s voice, very softly.':'Two in the morning. Angel is on the daybed in V’s atrium with her laptop on her knees, reading her DMs out loud in Maria’s voice, very softly, to the hounds.'],
 [AN,'“maria i think my landlord is the man from the news.” no he isn’t, babe, he’s just a landlord. “maria the guy at my gym.” no. “maria my stepdad.”'],
 [AN,'...oh. oh, hi.'],
 ['','She opens a spreadsheet. A name, an address, a second source, a third. A column headed HAD IT COMING with a dropdown that only says yes.'],
 [AN,S.seen&&S.seen.dk_a_wrong?'every one i do started in here. i check them. i check them twice now.':'every one i do started in here. i check them like homework. i was never good at homework so i do it twice.']],()=>{fr('a',1);done()})});

/* A2 · complication (Act II): the same account */
function k57aTip(){const m=k57M();go(cutBg('#100a10'));k57Mark('a_tip');
 const wrong=S.seen&&S.seen.dk_a_wrong;
 say([['','Maria goes live at nine about the copycat: the stamped tags, the alley across the river. Two million people are watching.'+(S.f.angelHelp?(m?' She did this once before, when you were gone.':' She did this once before, when Misaki was gone.'):'')],
  [AN,'(live, soft) I know a lot of you are frightened. I am too. If you’ve seen anything, anything at all, you can message me. I promise I read every single one.'],
  ['','Afterwards, off camera, she takes her face off with the same pads she uses on the rifle and scrolls through the leads. Then she stops scrolling.'],
  [AN,'this account.'],
  ['',wrong?'It is the account that sent her the tip last month, about the man on the night buses. The wrong man.':'Last month a tip sent her to a man who looked like the one taking girls off the night buses. It wasn’t him. It is the same account.'],
  ['','She goes back through everything it has ever sent, to every channel like hers. Wrong names and real addresses, on purpose. He sends a stranger’s face to a true-crime channel and waits to see what happens to them. He keeps a folder of the ones where something did.'],
  [AN,'he has a folder. he has my one in his folder. he made me miss.'],
  [AN,'and he’s got it coming. look at him. he so has it coming.'],
  [AN,'i’d want it if he didn’t, though. i want it so bad my teeth hurt.'],
  ['','She shuts the laptop very gently, smiles at you with Maria’s smile, and goes to bed at ten, which she never does.']],()=>{try{const id=m?'tx_k57a_rifle':'tx_k57a_rifle_v';const P=phS();if(!P.run[id])txStart(id)}catch(e){}hub()})}

/* A2 · threads: three in the morning */
const k57aRifleSet=v=>{S.f.k57aRifle=v};
txDef('tx_k57a_rifle',{with:'a',pov:'m',prio:3,when:()=>false,nodes:{
 start:{in:()=>['it’s 3am','remember what i asked you','i’m standing in front of the pink safe. i haven’t opened it. i’m being so good'],expire:1,
  onExpire:()=>k57aRifleSet('alone'),
  opts:()=>[{t:'“i’m coming to get it.”',fx:()=>{k57aRifleSet('taken');fr('a',3)},reply:()=>['ok','door’s open. i’m going to sit on the bed and not watch you do it','bring a bag. it doesn’t fit in a bag. bring one anyway']},
   {t:'“wait for me. i’ll spot.”',fx:()=>{k57aRifleSet('went');fr('a',4);apply({edge:3})},reply:()=>['you’d do that','i knew you’d do that. i knew and i asked anyway so i wouldn’t be the one who said it','wear black. not the cute black']},
   {t:'“does he have it coming?”',fx:()=>{k57aRifleSet('rule');fr('a',1)},reply:()=>['yes','yes he does. he so does. ok. it counts. it counts, right','don’t answer that. goodnight']}]}}});
txDef('tx_k57a_rifle_v',{with:'a',pov:'v',prio:3,when:()=>false,nodes:{
 start:{in:()=>['v it’s 3am','remember what i asked','i’m in front of the safe. i haven’t opened it. i’m being SO good'],expire:1,
  onExpire:()=>k57aRifleSet('alone'),
  opts:()=>[{t:'“I am on my way. Leave the safe closed.”',fx:()=>{k57aRifleSet('taken');fr('a',3)},reply:()=>['ok','you’re the only one who’d actually come. i knew it. i hate it']},
   {t:'“I will come. I will hold the scope.”',fx:()=>{k57aRifleSet('went');fr('a',4);if(typeof relApply==='function')relApply({tension:2})},reply:()=>['you’d break your own rule for me','oh v. oh that’s so romantic and you’re going to be so weird about it after']},
   {t:'“Tell me what he does.”',fx:()=>{k57aRifleSet('rule');fr('a',1)},reply:()=>['wrong names. real addresses. a folder of the ones that went bad','that’s a yes. that’s a yes, v. i’m saying it for you. goodnight']}]}}});

/* A2 · the night itself */
function k57aNight(){const m=k57M(),r=S.f.k57aRifle;go(cutBg('#0c0a10'));k57Mark('a_night');S.f.k57aNight=1;
 if(r==='taken')return say([
  ['',m?'You let yourself into the studio at half three. She is sitting on the edge of the daybed in a silk robe with her face fully done, as if for camera, with her hands under her thighs.':'V lets himself into the studio at half three. She is sitting on the edge of the daybed in a silk robe with her face fully done, as if for camera, with her hands under her thighs.'],
  ['','The code still works. The rifle is lighter than you expected for something that has never missed.'],
  [AN,'don’t look at me. ok look at me. do i look ok. i look so good. this is so unfair.'],
  [AN,m?'take it to v’s. put it somewhere high. i’m tall, so really high.':'put it in the vault. with the deed and the hounds’ shots. somewhere i’d have to ask you.'],
  ['',m?'You carry it out past the ring light. She doesn’t watch. You put it on top of the wardrobe in V’s room, and he looks at it, and at you, and goes back to sleep.':'He carries it out past the ring light. She does not watch. It goes into the vault between the deed to the house and the hounds’ vaccination records, and he writes the date on a card beside it.'],
  [AN,'(server, 4:12am) he’s still going to send tips. i’m still going to read them.']],()=>{S.f.k57aHeld=m?'wardrobe':'vault';fr('a',2);calm(1);hub()});
 if(r==='went')return say([
  ['',m?'A roof across from his flat, in the rain. You’re on the spotting scope. She is flat on her stomach beside you in black, the boring black, with her chin on the stock.':'A roof across from his flat, in the rain. V is on the spotting scope. She is flat on her stomach beside him in black, the boring black, with her chin on the stock.'],
  ['','Through the glass the man is at a desk with three monitors. There is a folder of printouts pinned to the wall behind him. Faces. One of them is the man on the night buses who wasn’t.'],
  [AN,'(very quietly, in her vlog voice) and she breathes in. and she isn’t sorry. and she isn’t doing it for anybody. not one person sent her.'],
  [AN,'cork.'],
  ['','The folder on the wall goes red. Then she rolls onto her back on the wet roof and laughs, really laughs, louder than you have ever heard her, with the rain going in her mouth.'],
  [AN,'oh my god. that was for me. that was all for me.'],
  [AN,m?'you saw it. ok. so now you have to decide what you are, because you were supposed to take it off me and you held the scope.':'you saw it, v. you held the scope. you were supposed to take it off me and you held the scope.'],
  ['','She packs the rifle, and hands you the case to carry down, and you carry it.']],()=>{fr('a',3);apply(m?{edge:3}:{heart:-2});hub()});
 const alone=r==='alone';
 say([
  ['','The morning news: a man found at his desk, a single shot through the window from very far away. Police are asking anyone with information to come forward.'],
  ['','By nine Maria has a video up about staying safe online. It is lovely. She is glowing.'],
  [AN,'(on camera) Please be careful who you trust. Not everyone who sends you a tip wants to help. Some people just like to watch.'],
  ...(alone?[[AN,m?'(at breakfast) you were asleep. it’s fine. i didn’t want to wake you. it counted.':'(at breakfast) you were asleep, v. it’s fine. it counted.']]
   :[[AN,'(at breakfast) he had it coming. it counted. i checked twice.']]),
  ['','She eats a waffle. She hums. Nobody at the table says anything, and she doesn’t bring it up again, and for the rest of the week she is the happiest anyone has ever seen her and she keeps saying it counted.']],()=>{S.f.k57aHungry=1;fr('a',1);apply(m?{heart:0}:{heart:-1});hub()})}

/* A2/A3 · texture: the rule stretches, or holds */
k57Ev('k57a_after',()=>['act2','act3','epilogue'].includes(S.phase)&&!!S.f.k57aNight&&frT('a')>=1,done=>{const m=k57M(),r=S.f.k57aRifle;say(
 r==='taken'?[['',m?'Angel comes to V’s for dinner and goes up to his room first, alone, for a minute. When she comes down she has fixed her lipstick.':'Angel comes for dinner and asks to see the vault. V lets her. She stands in front of the rifle for a minute without touching it and then fixes her lipstick in the steel door.'],
   [AN,'just saying hi. it’s rude not to.']]
 :r==='went'?[['',m?'Angel sends you the news clip about the man at his desk, with no message. Then a selfie from that night, on the roof, rain-soaked, still laughing. Then: “delete both.” You don’t.':'Angel sends V the news clip about the man at his desk, with no message. Then a selfie from the roof. Then: “delete both.” He files them.']]
 :[['','A second man turns up at his desk, a week after the first. Another account, another channel, another folder. Maria does a follow-up video about online safety and it does even better than the first.'],
   [AN,'they’re all so guilty, babe. the tips are so good right now.']],()=>{fr('a',1);done()})});

/* A3 · payoff (Act III): the boat */
function k57aBoat(){const m=k57M(),r=S.f.k57aRifle;go(cutBg('#100a0e'));k57Mark('a_boat');
 const L=[['','Angel comes over with a garment bag over her shoulder and a box of pink shotgun shells in her hand, because the boat is a charity event and she refuses to be underdressed for a massacre.']];
 let opts;
 if(r==='taken'){L.push([AN,'ok. the ledger. the boat. i need it back.'],[AN,'not for me. for you. for all of you. i swear on my skincare i give it back after.']);
  opts=[{t:'Give the rifle back.',fn:()=>{S.f.k57aBack='gave';fr('a',3);say([
    ['',m?'You lift it down from the top of V’s wardrobe. She checks it the way you’d check an old friend for injuries: chamber, bolt, scope, a long look down the barrel.':'V takes it out of the vault and hands it to her across the steel table. She checks it like an old friend: chamber, bolt, scope, a long look down the barrel.'],
    [AN,'hi. i missed you. don’t tell anyone.']],hub)}},
   {t:'“Keep the shotgun. Maria can come to the boat.”',fn:()=>{S.f.k57aBack='kept';fr('a',2);say([
    [AN,'the shotgun’s maria’s.'],[m?'hitmeuppp':'K9',m?MV('then maria’s coming.','then maria’s coming to the boat.','Then Maria’s coming to the boat.','Then Maria’s coming to the boat. Wear something she’d wear.'):'Then Maria is coming to the boat.'],
    ['','Angel laughs, a real one, and goes to find the shells that match her dress.']],hub)}}]}
 else if(r==='went'){L.push([AN,'i want to do it again. not the boat, the boat’s work. after.'],[AN,'i have a list now. other accounts. other folders. i made it in the spreadsheet, it has its own tab.'],[AN,'you held the scope. so you’re not my somebody any more. so who is.']);
  opts=[{t:'“Still me.”',fn:()=>{S.f.k57aBack='still';fr('a',3);say([
    [AN,'liar.'],[AN,'ok. ok. still you.'],
    ['','She changes the code on the pink safe that night and texts it to you with no words, just the four numbers and a heart, and you have to decide whether the heart is a joke.']],hub)}},
   {t:'“Nobody. Do your list.”',fn:()=>{S.f.k57aBack='none';fr('a',2);apply({edge:2});say([
    [AN,'nobody. wow.'],
    ['','She kisses you on the forehead, hard, and leaves lipstick on it, and goes home to sort the list by how much she wants each one.']],hub)}}]}
 else{L.push([AN,'everyone in that ledger has it coming. everyone who bought a page. everyone who ever read one.'],[AN,'i’ve done two more since. the tips are so good right now. they all have it coming, babe. they all do. i check.']);
  opts=[{t:'Open the safe.',fn:()=>{S.f.k57aBack='late';fr('a',1);calm(2);say([
    ['',(S.f.k57aCode?'You still have the code. ':'She tells you the code, twice, the second time slower. ')+'She lets you. She does her lipstick in the reflection of the safe door while you take the rifle out, and she doesn’t say anything until you’re at the door.'],
    [AN,'it took you so long. i was starting to think you’d never.'],
    [AN,'the boat’s maria’s then. she’s never been to a boat.']],hub)}},
   {t:'“Then the boat’s yours.”',fn:()=>{S.f.k57aBack='fed';fr('a',2);apply({edge:3});say([
    [AN,'mine. ok. mine.'],
    ['','She hums all evening. She is so happy that the hounds will not go near her, and she doesn’t notice.']],hub)}}]}
 say(L,()=>ask(AN,'(She is holding the box of shells against her chest like a bouquet.)',opts))}

/* A3 · epilogue */
function k57aEpi(){const m=k57M(),k=S.f.k57aBack,r=S.f.k57aRifle;go(cutBg('#140c10'));k57Mark('a_epi');
 const L=[['','Angel’s studio, a Sunday months later. The set, the ring light, the rail of dresses. The pink safe.']];
 if(k==='gave')L.push(['','The rifle went back in the safe the night after the boat. The code is still the same, and you still know it, and she has never once asked you to forget it.'],
  [AN,'the account still sends me tips. i read every one at three in the morning with the safe across the room.'],[AN,'it’s like a diet. i’m very good at diets.']);
 else if(k==='kept')L.push(['','The safe is empty. The rifle is still where you put it. She visits it, some Sundays, and fixes her lipstick in whatever is nearest.'],
  [AN,'maria’s been to a boat now. she loved it. she wants a yacht.']);
 else if(k==='still')L.push(['','The code changes every January, when V updates the files. She texts it to you with four numbers and a heart, and you still haven’t decided about the heart.'],
  [AN,'the list has its own tab still. it’s shorter. not by much.']);
 else if(k==='none')L.push(['','The safe is open. It is always open now. The list has its own tab and the tab has its own colour.'],
  [AN,'i’m so happy. look at me. this is what it looks like.']);
 else if(k==='late')L.push(['','The safe is empty. Maria’s shotgun hangs on the wall over the daybed, where everyone who comes on a livestream can see it, and the comments think it’s a prop.'],
  [AN,'it doesn’t count. it’s maria’s.']);
 else if(k==='fed')L.push(['','The safe is open. Maria’s channel is bigger than it has ever been; she does a monthly video on staying safe online, and every month the number of men found at their desks goes up by about one.'],
  [AN,'none of them can say they didn’t have it coming. i make sure.']);
 else L.push(['','The safe is shut. '+(r?'Whatever happened, she doesn’t talk about it, and she still reads the tips at three in the morning.':'She still reads the tips at three in the morning, and checks them twice, and the rule holds because she holds it.')]);
 say(L,()=>{fr('a',2);hub()})}

/* V raises it with Misaki */
TDTOP_M.push({id:'k57a_tm',label:()=>'“Where is Angelic’s rifle?”',show:()=>K57()&&!!S.f.k57aRifle&&!(S.talks&&S.talks.k57a_tm),run:b=>{S.talks=S.talks||{};S.talks.k57a_tm=1;if(typeof warm==='function')warm('m','k57a_tm',3);const r=S.f.k57aRifle;say([
 ['K9','Where is Angelic’s rifle?'],
 ['hitmeuppp',r==='taken'?MV('top of your wardrobe.','top of your wardrobe. don’t touch it.','On top of your wardrobe. Don’t touch it.','On top of your wardrobe, if it isn’t in your vault. Somebody took it off her. Don’t touch it, she says hi to it.')
  :r==='went'?MV('she has it.','she has it. i held the scope.','She has it. I held the scope.','She has it. I was supposed to take it off her and I held the scope instead, and she laughed so hard on that roof I thought somebody would call the police.')
  :MV('she has it.','she has it. she says it counted.','She has it. She says it counted.','She has it. She says it counted. She checked twice. She says that a lot now.')],
 ['K9',r==='taken'?'Good.':r==='went'?'I see. You know what she asked of you.':'I see.'],
 ['hitmeuppp',MV('yeah.','yeah. i know.','Yeah. I know what she asked.','Yeah. I know what she asked. Go feed your hounds.')]],b)}});

/* ===================================== THE SIDE MENU ===================================== */
/* Each beat is offered once, from the side menu, when it is due, so the arc's backbone never depends on the random
   morning picker. One Ronin beat and one Angel beat at most are listed at a time. */
const K57R=[
 {id:'r_clock',t:'Ronin: “c’mere. bring nothin’.”',sub:'costs time · his workshop, after church',when:()=>['normal','after'].includes(S.phase)&&frT('r')>=1&&S.day>=3,run:k57rClock},
 {id:'r_truck',t:'A black pickup, two streets over',sub:()=>k57M()?'costs time · after a job':'costs time · the traffic footage',when:()=>k57A2()&&frT('r')>=1,run:k57rTruck},
 {id:'r_boat',t:'Ronin comes in at ten forty',sub:'costs time · boat night: where he stands',when:()=>k57A3()&&frT('r')>=1,run:k57rBoat},
 {id:'r_pew',t:'Sunday with Ronin',sub:'costs time · the church across town',when:()=>S.phase==='epilogue'&&frT('r')>=1,run:k57rPew}];
const K57A=[
 {id:'a_safe',t:'Angelic: “come to the studio. alone.”',sub:'costs time · the set, after hours',when:()=>['normal','after'].includes(S.phase)&&frT('a')>=1&&S.day>=4,run:k57aSafe},
 {id:'a_tip',t:'Maria goes live about the copycat',sub:'costs time · watch with her',when:()=>S.phase==='act2'&&S.day>=(S.act2Start||0)+2&&frT('a')>=1,run:k57aTip},
 {id:'a_night',t:()=>({taken:'Angelic’s pink safe, at half three',went:'A roof across from his flat',rule:'The morning news',alone:'The morning news'})[S.f.k57aRifle]||'Angelic',sub:'costs time · what you said at three in the morning',when:()=>['act2','act3'].includes(S.phase)&&!!S.f.k57aRifle,run:k57aNight},
 {id:'a_boat',t:'Angelic, a garment bag and a box of shells',sub:'costs time · boat night',when:()=>k57A3()&&!!S.f.k57aNight&&frT('a')>=1,run:k57aBoat},
 {id:'a_epi',t:'Angelic’s studio, a Sunday',sub:'costs time · the pink safe',when:()=>S.phase==='epilogue'&&frT('a')>=1&&(!!S.f.k57aRifle||k57Done('a_safe')),run:k57aEpi}];
function k57Due(L){for(const b of L){if(k57Done(b.id))continue;let ok=false;try{ok=b.when()}catch(e){}if(ok)return b}return null}
const _shK57=sideHub;sideHub=function(late){const o=_shK57(late);try{if(!K57())return o;
 const add=[];for(const L of [K57R,K57A]){const b=k57Due(L);if(!b)continue;
  add.push({t:typeof b.t==='function'?b.t():b.t,sub:typeof b.sub==='function'?b.sub():b.sub,dis:!!late,fn:()=>{spend();b.run()}})}
 return o.concat(add)}catch(e){return o}};

/* ===================================== THE EPILOGUE THREADS ===================================== */
txDef('tx_k57_epi_r',{with:'r',pov:'m',prio:1,when:()=>K57()&&S.phase==='epilogue'&&!!S.f.k57rBoat,nodes:{
 start:{in:()=>{const b=S.f.k57rBoat;return b==='on'?['front row again today','priest looked at me like i was the devil. which, fair','saved you a seat. it’s the good one']
   :b==='two'?['back pew','10:40','you can come sit two streets over from me if you want. i mean the next pew']
   :['back pew','watched the clock the whole time. it’s the right time on this one. weird']},expire:3,
  opts:()=>[{t:'“on my way”',fx:()=>fr('r',2),reply:()=>['don’t be late','I mean it. don’t be late']},{t:'“say hi to him for me”',fx:()=>fr('r',1),reply:()=>['he says hi back','he says you’re still the best show in town']}]}}});
txDef('tx_k57_epi_rv',{with:'r',pov:'v',prio:1,when:()=>K57()&&S.phase==='epilogue'&&!!S.f.k57rBoat,nodes:{
 start:{in:()=>{const b=S.f.k57rBoat;return b==='on'?['front row. you comin or what','I’m not savin this seat for the devil all mornin']
   :['back pew. 10:40','she’s fine btw. I know you know. I’m just sayin it out loud']},expire:3,
  opts:()=>[{t:'“I will be there at ten forty.”',fx:()=>fr('r',2),reply:()=>['don’t be early. early’s for cowards']},{t:'“I do not attend church.”',fx:()=>fr('r',1),reply:()=>['you attend me. same thing','that’s blasphemy vee, I love it']}]}}});
txDef('tx_k57_epi_a',{with:'a',pov:'m',prio:1,when:()=>K57()&&S.phase==='epilogue'&&!!S.f.k57aBack,nodes:{
 start:{in:()=>{const k=S.f.k57aBack;return ['gave','late','kept'].includes(k)?['got a tip tonight','i read it. i checked it twice. i closed the laptop','tell me i’m good']
   :['got a tip tonight','i read it. it’s so good babe','tell me i’m good']},expire:2,
  opts:()=>[{t:'“you’re good”',fx:()=>fr('a',2),reply:()=>['i know. i just like hearing it']},{t:'“you’re not, and that’s why you text me”',fx:()=>fr('a',3),reply:()=>['rude','correct. go to sleep, my somebody']}]}}});
txDef('tx_k57_epi_av',{with:'a',pov:'v',prio:1,when:()=>K57()&&S.phase==='epilogue'&&!!S.f.k57aBack,nodes:{
 start:{in:()=>['v','is it still in the file. the code','don’t tell me. just tell me yes or no'],expire:2,
  opts:()=>[{t:'“Yes.”',fx:()=>fr('a',3),reply:()=>['ok','good. ok. night']},{t:'“No. I remember it.”',fx:()=>fr('a',3),reply:()=>['that’s worse','that’s so much worse v. that’s the most romantic thing anyone has ever said about a gun safe']}]}}});

/* ===================================== ENDINGS ===================================== */
const _xeK57=extraEnding;extraEnding=function(){const L=_xeK57();if(!S||!S.f)return L;const f=S.f;
 if(f.k57rPew==='stop')L.push('The sun visor hangs on Ronin’s workshop wall, tally side out, under the clock that says twenty to eleven. He stopped counting the day someone told him to. He kept the visor.');
 else if(f.k57rBoat==='on')L.push('Ronin sits in the front row now, on Sundays, in the middle, early. The Devil can sit in the back.');
 else if(f.k57rBoat==='two')L.push('Ronin still parks two streets over, some nights, with the gospel on. Everyone knows. Nobody says. He counts to a hundred and goes for a burger.');
 else if(f.k57rBoat==='home')L.push('Ronin was home the night of the boat, with the wrestling on, counting. He sits in the back pew and watches the clock over the door, and it is always the right time.');
 else if(f.k57rStreets)L.push('Somewhere two streets from wherever Misaki is working, there is a black pickup with its engine running, or there used to be.');
 const k=f.k57aBack,r=f.k57aRifle;
 if(k==='gave')L.push('Angel’s rifle is back in the pink safe and somebody still knows the code. She reads the tips at three in the morning with the safe across the room.');
 else if(k==='kept')L.push('Angel’s rifle never went back to the studio. Maria’s shotgun went to the boat instead, in a dress to match.');
 else if(k==='still')L.push('The code on Angel’s pink safe changes every January. It arrives as four numbers and a heart, and nobody has decided about the heart.');
 else if(k==='none')L.push('Nobody takes Angel’s rifle off her. The list has its own tab. She has never been so happy, and she was right about how you would know.');
 else if(k==='late')L.push('Somebody took Angel’s rifle off her in the end, later than she asked. Maria’s shotgun hangs over the daybed and the comments think it is a prop.');
 else if(k==='fed')L.push('None of them can say they didn’t have it coming. The Heartsick Angel makes sure of it now, about once a month, on camera, in a video about staying safe online.');
 else if(r==='taken')L.push('Angel’s rifle stays where her somebody put it, somewhere high.');
 return L};
