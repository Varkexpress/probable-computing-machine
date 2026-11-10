/* ===================== WHAT IT COSTS: the date, the bowls, the door, the hands ===================== */
/* Short scenes about what the work and the years before it left behind. Misaki: the five-year date, the hand-washing,
   the menu math. V: hour 70, closed doors, the dog bowls at 4am. Angel: watching herself from the ceiling. Ronin: the oven. */
const W24=()=>!S.dark&&S.phase!=='taken';
const mP=()=>S.pov!=='v',vP=()=>S.pov==='v';
/* ---------- 1. THE DATE (Misaki gave herself five years. The date is in her phone.) ---------- */
EVENTS.push({id:'five_eve',when:()=>mP()&&W24()&&S.day>=9&&!S.f.fiveDay,run:done=>{S.f.fiveDay=S.day+1;save();say([
 ['','Your phone buzzes at 7am with a calendar reminder you don’t remember setting.'],
 ['','“TOMORROW: done by now lol”. Repeats: never. Created five years ago, by you, at sixteen, on a station bench.'],
 ['hitmeuppp',MV('oh. that’s tomorrow. huh.','oh. i forgot i wrote it down. tomorrow’s the day i figured i’d be dead by.','I put my own deadline in a calendar app. With “lol”. I was sixteen and I thought I was being realistic.','I’d forgotten I ever wrote it down. Sixteen-year-old me scheduled the end and added “lol” so it wouldn’t look like she cared.')]],done)}},
 {id:'five_day',when:()=>mP()&&W24()&&S.f.fiveDay&&S.day>=S.f.fiveDay&&!S.f.fiveDone,run:done=>{
  const fin=(k,L,fx)=>()=>{S.f.fiveDone=k;S.f.fiveOn=S.day;save();say(L,()=>{fx&&fx();done()})};
  const O=[{t:'Go sit on the station bench.',fn:fin('bench',[
    ['','Same bench. They repainted it. Somebody has scratched a phone number into the new paint already.'],
    ['','You buy the bento from the kiosk, the one you bought after the first job, and eat all of it with your hood up.'],
    ['hitmeuppp',MV('(still here. still hungry. ok.)','(i sat here at sixteen and did the math. the math said five years. the math was wrong.)','(I did the sums on this bench. I was sure of them. I’d like to tell her she carried a one wrong.)','(She sat here and worked out how long she had. I finished her lunch for her today. It felt like the least I could do.)')]],()=>apply({heart:2,energy:-1}))},
   {t:'Take a job. Work straight through it.',fn:fin('work',[
    ['','A man in a parking structure, level four. Your hands are the steadiest they’ve been all month.'],
    ['','After, you wash them three times, open the calendar, and delete the entry. The app asks if you’re sure.'],
    ['hitmeuppp',MV('(yeah. i’m sure.)','(yeah i’m sure. u don’t get a vote, app.)','(Yes. I’m sure. I think that’s the first time I’ve meant it.)','(I pressed “delete” with a hand that had just done what it does. Both things felt equally ordinary. I’m not sure what that says about me.)')]],()=>apply({edge:2,heat:1}))}];
  if(!isLone()&&tier()>=1)O.unshift({t:'Show V the reminder.',fn:fin('told',[
    ['','You hold the phone up across the kitchen island. He takes his reading glasses out of his pocket to look at it. It takes him a long time to read six words.'],
    ['K9','...You were sixteen when you wrote this.'],['hitmeuppp',MV('yeah. it’s today. surprise.','yeah. today’s the day. i overshot.','Yes. Today. I seem to have missed my appointment.','Yes. I gave myself until today. I didn’t think I’d be standing in a kitchen for it.')],
    ['','He puts the phone face down. Then he makes you eggs, badly, because the dogs are leaning on his legs the whole time.'],
    ['K9','Eat. Then I would like you to put next year in the calendar. Anything. A dentist.']],()=>{apply({aff:4,heart:2});S.f.fiveTold=1})});
  else O.unshift({t:'Send Angel a screenshot.',fn:fin('angel',[
    ['','You send it before you can think about it. Three dots appear. Then they stop. Then your phone rings, which Angel never does in daylight.'],
    [AN,'ok so i’m outside ur place with two iced coffees and a cake that says “HAPPY NOT DEAD DAY” and the bakery lady looked at me SO weird.'],
    ['hitmeuppp',MV('...u did not.','u got it WRITTEN on a CAKE.','You had that written on a cake. In icing. By a stranger.','You stood in a bakery and said those words out loud to another human being. For me.')],
    [AN,'i got it in pink. open the door.']],()=>{fr('a',5);apply({heart:2})})});
  ask('hitmeuppp','The reminder goes off again at 7am. “TODAY: done by now lol”.',O)}},
 {id:'five_after',when:()=>mP()&&W24()&&S.f.fiveDone&&S.day>S.f.fiveOn&&!S.f.fiveAfter,run:done=>{S.f.fiveAfter=1;save();const k=S.f.fiveDone;
  if(k==='told')phQueue('v',['I have put the dentist in your calendar. It is for March. You may move it but you may not delete it.'],0);
  else if(k==='angel')phQueue('a',['there’s cake left btw. i’m keeping the box. the box is evidence that u lived 💕'],0);
  else if(frT('a')>=1)phQueue('a',['u went quiet yesterday. no pressure. just counting my gremlins. still got 1? 👀'],0);
  phDeliver();say([['','You wake up the day after the date. Nothing in the calendar. The light through the blind is doing what it always does.'],
   ['hitmeuppp',MV('(day one of the extra. ok. what do people do.)','(first day i never planned for. i don’t have anything booked. forever.)','(This is the first morning I never made plans for. I should probably start making some.)','(Everything from here is unscheduled. I never budgeted for it. It turns out I’m going to need groceries for it.)')]],done)}},
 /* V's side of the same morning */
 {id:'five_v',when:()=>vP()&&W24()&&S.day>=9&&tier()>=1&&!isLone()&&!S.f.fiveV,run:done=>{
  const fin=(k,L,fx)=>()=>{S.f.fiveV=k;save();say(L,()=>{fx&&fx();done()})};
  ask('K9','Her phone lights up on the counter while she is in the shower. A calendar reminder: “TODAY: done by now lol”. Created five years ago.',[
   {t:'Ask her about it.',fn:fin('ask',[['K9','Your phone had a reminder.'],['hitmeuppp','...oh. u saw that.'],
    ['hitmeuppp',MV('it’s old. i was 16. i gave myself 5 yrs. it’s fine.','i wrote it at 16. five years, that’s how long i figured i’d last. it’s today. it’s fine.','I set it when I started. Five years seemed generous. It’s today, and I’m in your kitchen in a towel, so.','I gave myself five years and wrote the end date down so I wouldn’t be surprised by it. I’m surprised anyway. I’m here.')],
    ['K9','Then today I am making dinner, and you are choosing it, and tomorrow there will be something else in that calendar.']],()=>{apply({aff:4});relApply({trust:3})})},
   {t:'Say nothing. Add an entry for next year.',fn:fin('entry',[['','You type with one finger. Same date, next year. “Dentist.” You consider it, then add a second one the year after: “Dentist (again).”'],
    ['','She finds them that evening. You hear her laugh once from the other room, short, like a cough.'],['hitmeuppp','(from the hall) v. i don’t even have a dentist.'],['K9','You have a year to find one.']],()=>{apply({aff:5});S.f.fiveTold=1})},
   {t:'Turn the phone face down.',fn:fin('down',[['','You turn it over and line it up with the edge of the counter. When she comes out she looks at the phone, then at you, and neither of you says it.'],
    ['','She eats two breakfasts. You count that as an answer.']],()=>{apply({aff:1});relApply({tension:2})})}])}});
/* ---------- 2. HOUR 70 (V at nine: 72 hours in a locked room, asking if the dogs were fed) ---------- */
EVENTS.push({id:'v_bowls',when:()=>vP()&&W24()&&S.day>=4&&(S.f.bowls||0)<3,run:done=>{S.seen.v_bowls=0;const n=S.f.bowls=(S.f.bowls||0)+1;S.f.bowlDay=S.day;save();
  ask('K9',n===1?'4:10am. You are standing in the kitchen in the dark, looking at the dog bowls. They are full. You filled them at nine. You knew that when you got out of bed.':n===2?'4:10am again. The bowls are full. Biscuit watches you check from her bed with one eye open, the way a nurse watches a patient.':'4:10am. You are already in the kitchen before you are properly awake. Full. Of course they are full.',[
   {t:'Check the water as well.',fn:()=>{apply({edge:1,energy:-1});say([['','The water is fine. You top it up anyway and stand there until the tap stops dripping.'],['K9','(Fed. Watered. Fed. Go to bed.)']],done)}},
   {t:'Sit on the floor with the dogs.',fn:()=>{apply({heart:1});say([['','You sit down on the tile in your good trousers. All four of them come over and lie on you, heavily, in order of rank.'],['K9',n>1?'(You are fed. I saw it. I did it myself.)':'(Nobody is going to tell me no. I am the one with the food now.)']],done)}},
   ...(!isLone()&&tier()>=2?[{t:'Text Misaki. She will be awake.',fn:()=>{S.f.bowlsTold=1;apply({aff:2});phQueue('m',['they’re fed v','i know bc u sent me a photo of the full bowls at 9pm with the caption “Fed.”','go to sleep. i’ll check them in my head for u. ok checked. still full'],0);phDeliver();say([['','You type “Are you awake.” The answer comes before you put the phone down.']],done)}}]:[])])}},
 {id:'m_bowls',when:()=>mP()&&W24()&&tier()>=2&&!isLone()&&S.day>=6&&!S.f.mBowls,run:done=>{const kn=tdF('vChildKnown');
  ask('hitmeuppp','4am. You get up for water and find V in the kitchen with the light off, looking at the dog bowls. They’re full. He doesn’t hear you come in.',[
   {t:'“they’re fed, v.”',fn:()=>{S.f.mBowls='said';apply({aff:3});say([['K9','...Yes. I know. I checked.'],['hitmeuppp','how many times'],['K9','Twice. This is the third.'],
     kn?['hitmeuppp',MV('i read the logbook. hour 70. u don’t have to explain.','i saw the logbook downstairs. hour 70. i know why.','I read the log from downstairs. Hour seventy. You asked if they’d been fed.','I read what they wrote about you at nine. You held out for seventy hours and the dogs were what broke you. I know why you’re standing here.')]:['hitmeuppp','ok. i’ll stand here w u for the fourth.'],
     kn?['K9','...Then you know they said no.']:['K9','That is not necessary.'],kn?['hitmeuppp','yeah. and i’m saying yes. they’re fed. look.']:['hitmeuppp','wasn’t asking.']],()=>{if(kn)S.f.hour70Told=1;done()})}},
   {t:'Add one more scoop to each bowl while he watches.',fn:()=>{S.f.mBowls='scoop';apply({aff:4});say([['','You don’t say anything. You get the scoop and put a little extra in each bowl, slowly, where he can see it land.'],['','He breathes out. Biscuit, who has never turned down food in her life, gets up and eats it immediately.'],['K9','...Thank you. That helps more than it ought to.']],done)}},
   {t:'Go back to bed. Leave him to it.',fn:()=>{S.f.mBowls='left';say([['','You take your water and go. He comes back at five. His feet are cold. You pretend to be asleep and move over.']],done)}}])}},
 /* the door */
 {id:'m_door',when:()=>mP()&&W24()&&tier()>=2&&!isLone()&&S.day>=5&&!S.f.doorAsk,run:done=>{
  ask('hitmeuppp','You push his bedroom door shut behind you, the way you’d shut any door. The latch clicks. V stops reading mid-page.',[
   {t:'“...what.”',fn:()=>{S.f.doorAsk='asked';apply({aff:2});relApply({trust:3});say([['K9','Would you open it. A hand’s width is enough.'],['hitmeuppp','is it too hot or'],['K9','No.'],['','You open it a hand’s width. He finds his place on the page again. You look around the house in your head: you have never seen one door in it fully closed.'],
     ['hitmeuppp',MV('(oh. ok. noted.)','(every door in this house is open a little. every one. how did i miss that)','(Every door here stands a little open. I thought it was for the dogs.)','(I thought the open doors were for the dogs. They’re for a nine-year-old who needed to see the hallway.)')]],done)}},
   {t:'Open it again without asking.',fn:()=>{S.f.doorAsk='opened';apply({aff:4});say([['','You open it again, a hand’s width, and sit down on the bed like that’s where you were always going.'],['K9','...You did not have to do that.'],['hitmeuppp',MV('i know','i know. i like a draft.','I know. I wanted to.','I know. You gave me a door that opens from my side. I can manage one that stays open from yours.')]],done)}}])}},
 {id:'v_latch',when:()=>vP()&&W24()&&tier()>=2&&!isLone()&&S.day>=5&&!S.f.doorAsk,run:done=>{
  ask('K9','She closes the bedroom door behind her, as anyone would. The latch clicks. You have read the same line four times and you are counting, without wanting to, from one.',[
   {t:'“Would you open it. A hand’s width.”',fn:()=>{S.f.doorAsk='asked';apply({aff:3});relApply({trust:3});say([['hitmeuppp','is it too hot or'],['K9','No. I do not sleep in closed rooms. I have not since I was nine.'],['','She opens it exactly a hand’s width, measures it with her actual hand, and looks at you to check.'],['hitmeuppp',MV('good?','that good?','Like that?','Tell me if it should be more. I don’t mind a wide open door. I grew up without one.')],['K9','That is good.']],done)}},
   {t:'Get up and open it yourself.',fn:()=>{S.f.doorAsk='opened';apply({aff:1});say([['','You get up, open the door a hand’s width, and get back into bed. She watches the whole trip.'],['hitmeuppp','...u could’ve just said.'],['K9','Yes. I am aware that I could have.']],done)}},
   {t:'Leave it. Count.',fn:()=>{S.f.doorAsk='counted';apply({edge:3,energy:-1});say([['','You get to four thousand and six before she falls asleep. Then you open it, quietly, and the hallway is there, the same as always.'],['K9','(Seventy-two hours was two hundred and fifty-nine thousand, two hundred. I never needed to count that high again. I still know the number.)']],done)}}])}});
/* ---------- 3. HANDS (three washes: one for the job, one for the walk home, one for luck) ---------- */
EVENTS.push({id:'m_hands',when:()=>mP()&&W24()&&S.day>=3&&(S.heat||0)>0&&!S.f.handsDay,run:done=>{S.f.handsDay=S.day;save();
  ask('hitmeuppp','Three washes. One for the job, one for the walk home, one for luck. That’s the rule. This morning you’re on the fourth and you don’t remember deciding to start it.',[
   {t:'Turn the tap off at four.',fn:()=>{apply({edge:-1});say([['','You turn it off. Your hands are pink and they smell like the lemon soap from the konbini. They’re just hands.'],['hitmeuppp',MV('(four. fine. four is fine.)','(four’s allowed. nobody’s counting but me.)','(Four. I’ll allow it. I wrote the rule, I can amend it.)','(Hands are the cheapest thing I own, I said. I wash them like they cost more than that.)')]],done)}},
   {t:'Keep going until the hot water runs out.',fn:()=>{S.f.handsBad=1;apply({edge:2,energy:-1});say([['','The water goes lukewarm, then cold. You count eleven. Your knuckles split a little at the creases.'],['','You put a plaster on the worst one. It has cartoon frogs on it. It was the only box they had.']],done)}},
   ...(!isLone()?[{t:'Dry them and text someone about anything else.',fn:()=>{apply({heart:1});phQueue('v',['The dogs send their regards. Biscuit sends hers by sitting on my foot. Have you eaten.'],0);phDeliver();say([['','You type “hi” with wet thumbs and send it before you’ve picked who it’s to. It goes to V. Of course it goes to V.']],done)}}]:[])])}},
 {id:'m_frogs',when:()=>vP()&&W24()&&tier()>=1&&!isLone()&&S.day>=4&&!S.f.frogs,run:done=>{S.f.frogs=1;save();
  ask('K9','Misaki has a plaster across one knuckle. It has cartoon frogs on it. The skin around it is red in the way skin gets from soap, and you know what soap damage looks like; you run a shelter.',[
   {t:'“How many times do you wash them?”',fn:()=>{apply({aff:3});relApply({trust:2});say([['hitmeuppp','...three. usually. job, walk home, luck.'],['K9','And when it is more than three?'],['hitmeuppp',MV('then it’s a bad day. it’s fine.','then it was a bad one. it happens. it’s fine.','Then it was a bad day, and I count until I stop.','Then something got on me that soap doesn’t reach, and I keep trying anyway.')],['','You go and get the hand cream you use after bathing forty dogs. You put it down next to her without a word. She uses it. She says it smells like an old man. She keeps it.']],done)}},
   {t:'Say nothing. Buy the gentle soap.',fn:()=>{apply({aff:2});say([['','You replace every bar of soap in the house with the unscented kind the vet recommends for cracked paws. She notices in two days.'],['hitmeuppp','did u dog-soap me'],['K9','It is very good soap.']],done)}}])}});
/* ---------- 4. THE BENTO (after every job: the same bento. She ate one after the first and woke up still owning all of herself.) ---------- */
EVENTS.push({id:'m_bento',when:()=>mP()&&W24()&&tier()>=2&&!isLone()&&S.day>=7&&!S.f.bento,run:done=>{S.f.bento=1;save();say([
 ['','You open V’s fridge for water. Second shelf: six salmon bentos from the station kiosk, stacked, labels facing out. The kiosk is forty minutes from here.'],
 ['hitmeuppp','v. why do u have six of these.'],['K9','You buy one after every job. You have never once missed. I assumed the supply should not depend on the kiosk’s opening hours.'],
 ['hitmeuppp',MV('...i didn’t know u knew that.','u clocked the bento thing?? i never told anyone the bento thing.','I never told anyone about the bento. I’ve never said it out loud.','I ate one after the first job and woke up still belonging to myself. I’ve bought one every time since, to check. And you just put six in a fridge.')],
 ['K9','They expire on Thursday. Please do not have six jobs by Thursday.']],()=>{apply({aff:4});done()})}});
/* ---------- talk topics ---------- */
TDTOP_V.push({id:'hour70',label:()=>'“hour 70.”',show:()=>tdF('vChildKnown')&&tier()>=2&&!S.dark&&!(S.talks&&S.talks.hour70),run:b=>{warm('v','hour70',5);S.talks=S.talks||{};S.talks.hour70=1;S.f.hour70Told=1;
 say([['hitmeuppp','i read the logbook. downstairs. subject v, age 9.'],['','He takes his glasses off and folds them. It takes him three tries to get the arms flat.'],['K9','Then you know I lasted seventy hours.'],['hitmeuppp','and asked about the dogs.'],
  ['K9','There were four. I had named them, which was against the rules. I could hear them through the wall for the first day. After that I could not, and I did not know which was worse.'],
  ['hitmeuppp',MV('were they ok','were they ok. after.','Were they all right? After?','Did anyone ever tell you what happened to them?')],['K9','No one told me. I have fed every dog I have met since. It has not answered the question. It is still the best thing I know how to do.']],b)}});
if(!TOPICS_V.find(x=>x.id==='hour70'))TOPICS_V.splice(TOPICS_V.length-1,0,TDTOP_V[TDTOP_V.length-1]);
TDTOP_V.push({id:'sleeping',label:()=>'“do u dream about work.”',show:()=>tier()>=1&&!S.dark&&!(S.talks&&S.talks.sleeping),run:b=>{warm('v','sleeping',4);S.talks=S.talks||{};S.talks.sleeping=1;
 say([['hitmeuppp','do u dream about work.'],['K9','Rarely. I dream about paperwork. A form I have not filed, and the deadline was in 1987.'],['hitmeuppp',MV('i don’t dream about them at all. is that bad','i never dream about the jobs. ever. i dream about the locker room.','I never dream about the people. I dream about the week before I started.','The jobs never come back at night. The locker room does. I think my head filed the wrong thing under “worst”.')],['K9','I do not think it filed it wrong.']],b)}});
if(!TOPICS_V.find(x=>x.id==='sleeping'))TOPICS_V.splice(TOPICS_V.length-1,0,TDTOP_V[TDTOP_V.length-1]);
TDTOP_M.push({id:'menu',label:()=>'“You read menus for a long time.”',show:()=>tier()>=2&&!S.dark&&!(S.talks&&S.talks.menu),run:b=>{warm('m','menu',5);S.talks=S.talks||{};S.talks.menu=1;
 say([['K9','You read menus for a long time. You do not look at the prices.'],['hitmeuppp',MV('i’m looking at what i’d owe.','i’m working out what it costs. not the money kind.','I’m working out what I’d owe for it. Who’s paying, and what they’ll want after.','Every nice thing used to come with a bill I couldn’t see yet. I still read for the bill.')],['K9','And at my table?'],['hitmeuppp',MV('still reading. sorry.','i still check. every time. it’s always blank.','I still check. It comes up blank every time, and I check again.','I check every time. There’s never anything written there. I’m learning to order anyway.')],['K9','Then order the expensive thing. Tonight, as an exercise.'],['hitmeuppp','...the eel??'],['K9','The eel.']],b)}});
if(typeof TOPICS_M!=='undefined'&&!TOPICS_M.find(x=>x.id==='menu'))TOPICS_M.splice(TOPICS_M.length-1,0,TDTOP_M[TDTOP_M.length-1]);
/* ---------- 5. TEXT THREADS ---------- */
txDef('tx_aceil',{with:'a',pov:'m',prio:3,when:()=>frT('a')>=2&&S.day>=6&&W24(),nodes:{
 start:{in:()=>['weird q','when ur working. do u ever watch urself do it','like from the ceiling. like ur the camera'],expire:3,
  opts:()=>[{t:'“no. i’m in my hands the whole time.”',reply:()=>['god. lucky.','i’m never in mine. i’m always up in the corner going “bad angle. chin down. the light’s wrong.”'],next:'who'},
   {t:'“sometimes. after.”',fx:()=>fr('a',2),reply:()=>['ok so u get it','i do it DURING. i’ve never once been in the room for my own work'],next:'who'},
   {t:'“is this a maria question or an angel question”',reply:()=>['...that’s the question babe. that’s literally the question'],next:'who'}]},
 who:{in:()=>['my mom filmed everything. i learned to watch from outside before i learned to read','so now maria smiles and the angel works and i’m on the ceiling directing both','which one do u text. when u text me'],opts:()=>[
   {t:'“the one on the ceiling.”',fx:()=>{fr('a',5);S.f.angelCeil='ceiling'},reply:()=>['...','nobody’s ever picked her','ok. she says hi. she’s crying a little. she’s checking how it looks']},
   {t:'“whoever sends the pigeon pics.”',fx:()=>{fr('a',3);S.f.angelCeil='pigeon'},reply:()=>['LMAO that’s all three. detective is a group project','thank u for not making it weird. i made it weird. u unmade it']},
   {t:'“i don’t care which. come down sometimes.”',fx:()=>{fr('a',4);S.f.angelCeil='down'},reply:()=>['i’m trying','brunch helps. u guys are so loud it’s hard to float']}]}}});
txDef('tx_avface',{with:'a',pov:'v',prio:2,when:()=>frT('a')>=1&&S.day>=5&&W24(),nodes:{
 start:{in:()=>['v. serious question. don’t be weird','do u remember their faces'],expire:3,
  opts:()=>[{t:'“All of them. In order.”',reply:()=>['of course u do. u probably have a spreadsheet'],next:'me'},
   {t:'“I remember their dogs.”',fx:()=>fr('a',2),reply:()=>['that is the MOST u answer possible','did u rehome them','u did. i know u did. don’t even type it'],next:'me'},
   {t:'“Why do you ask?”',reply:()=>['bc i can’t'],next:'me'}]},
 me:{in:()=>['i don’t remember any. i remember the lighting. i could tell u the colour temperature of every single one','is that broken'],opts:()=>[
   {t:'“It is how you got through it. I would not call that broken.”',fx:()=>{fr('a',4);S.f.angelFace=1},reply:()=>['ok. ok','i’m screenshotting that for a bad day. don’t let it go to ur head']},
   {t:'“Somewhat. So is counting them. We manage.”',fx:()=>fr('a',3),reply:()=>['lol. “we manage.” put it on the foundation letterhead']},
   {t:'“You should talk to your therapist about the true version.”',fx:()=>relApply({tension:1}),reply:()=>['i can’t tell her the true version v she’s a mandated reporter','but thanks. dad.']}]}}});
txDef('tx_roven',{with:'r',pov:'m',prio:2,when:()=>frT('r')>=1&&S.day>=5&&W24(),nodes:{
 start:{in:()=>['you up','course you’re up. it’s 4. nobody in this server sleeps on a work night','i got three pies in and a fourth thinkin’ about it'],expire:2,
  opts:()=>[{t:'“why do u always bake after”',reply:()=>['can’t sleep after. never could, not since the first.','oven’s got a timer. somethin’ in the house ends when it’s supposed to. I like that.'],next:'more'},
   {t:'“what kind”',reply:()=>['peach, peach, pecan. the fourth’s gonna be peach. I’m in a rut.'],next:'more'},
   {t:'“save me a slice”',fx:()=>fr('r',2),reply:()=>['already boxed, darlin’. had your name on it ‘fore I texted.']}]},
 more:{in:()=>['what do you do with it. the after. you’re too little to be carryin’ it around loose'],opts:()=>[
   {t:'“wash my hands. three times.”',fx:()=>{fr('r',4);S.f.ronHands=1},reply:()=>['three’s good. three’s a number with an end on it.','mine’s pies. yours is soap. V’s got them dogs. Angel’s got a ring light. look at us. a whole support group and not one of us can say why.']},
   {t:'“eat a bento and sleep 12 hrs”',fx:()=>fr('r',3),reply:()=>['now THAT’s the healthiest thing I ever heard outta this server. write that down for the rest of us.']},
   {t:'“nothing. it doesn’t weigh anything.”',fx:()=>fr('r',1),reply:()=>['mm.','I said that for eleven years. then one night I baked nine pies and cried in the seventh. come get a slice when it catches up.']}]}}});
txDef('tx_rvdown',{with:'r',pov:'v',prio:2,when:()=>frT('r')>=1&&S.day>=6&&W24(),nodes:{
 start:{in:()=>['question, and you can tell me to mind my business','that house of yours goes down a long way. you ever go back down to the bottom?'],expire:3,
  opts:()=>[{t:'“Once a year. To check the locks.”',reply:()=>['from which side'],next:'side'},
   {t:'“Mind your business.”',fx:()=>relApply({tension:1}),reply:()=>['fair enough. pie’s on your porch regardless.']},
   {t:'“Misaki has been down there. She found the logs.”',fx:()=>fr('r',2),reply:()=>['and she’s still at your table?','then she’s a keeper, and you already knew that'],next:'side'}]},
 side:{in:()=>['there was a shed back home. I burned it the week I left town. felt real good for about an hour','why’d you keep yours standin’'],opts:()=>[
   {t:'“So that I am the one who holds the keys.”',fx:()=>{fr('r',4);S.f.ronDown='keys'},reply:()=>['...yeah. alright. that’s a better answer than fire.','don’t tell the shed I said so.']},
   {t:'“I put a flower room in it. And a library.”',fx:()=>{fr('r',3);S.f.ronDown='flowers'},reply:()=>['you planted a garden in the place that hurt you','V, I mean this kindly. that is the most unwell and beautiful thing I ever heard.']},
   {t:'“I do not know.”',fx:()=>{fr('r',3);S.f.ronDown='dunno'},reply:()=>['honest man.','when you figure it out, or you want it gone, I own a lot of matches and I ask no questions.']}]}}});
txDef('tx_vhands',{with:'m',pov:'v',prio:3,when:()=>tier()>=1&&S.day>=4&&W24(),nodes:{
 start:{in:()=>['q','how many times do u wash ur hands after a job'],expire:2,
  opts:()=>[{t:'“Once. Thoroughly. Then I walk the dogs.”',reply:()=>['once???','ok so that’s. normal. ok'],next:'three'},
   {t:'“How many times do you?”',reply:()=>['3'],next:'three'},
   {t:'“What happened?”',fx:()=>apply({aff:1}),reply:()=>['nothing happened. i’m just doing a survey'],next:'three'}]},
 three:{in:()=>['i do 3. job, walk home, luck','today i did 9','is that a thing or am i being weird'],opts:()=>[
   {t:'“It is a thing. It has a name. It is also very common in my shelter volunteers.”',fx:()=>{apply({aff:3});relApply({trust:3});S.f.handsTold=1},reply:()=>['...ok. it’s kind of nice that it’s boring','ur volunteers wash DOGS tho','whatever. i’m counting it']},
   {t:'“Come here. I will make tea and you can hold the cup.”',fx:()=>{apply({aff:4});S.f.handsTold=1},reply:()=>['so my hands have a job','...that’s actually smart','omw. don’t make the smoky one']},
   {t:'“You are not weird. Nine is a lot. Both are true.”',fx:()=>{apply({aff:2});relApply({trust:2})},reply:()=>['ok dr. v','(thx)']}]}}});
txDef('tx_m4am',{with:'v',pov:'m',prio:3,when:()=>tier()>=2&&S.day>=5&&S.slot>=2&&W24(),nodes:{
 start:{in:()=>['Are you awake.'],expire:1,onExpire:()=>phQueue('v',['Disregard. Good night.'],0),
  opts:()=>[{t:'“yeah. what’s up”',reply:()=>['Nothing is “up.” I have checked the dog bowls three times. They are full. I am aware they are full.'],next:'fed'},
   {t:'“no. i’m asleep. this is my ghost”',fx:()=>apply({aff:1}),reply:()=>['Then please ask the ghost whether the dogs have been fed.'],next:'fed'}]},
 fed:{in:()=>['I would like someone else to say it.'],opts:()=>[
   {t:'“they’re fed, v.”',fx:()=>{apply({aff:4});relApply({trust:3});S.f.fedSaid=(S.f.fedSaid||0)+1},reply:()=>['Thank you.','That works better in your voice than in mine. I do not know why.','Go back to sleep. I will also attempt it.']},
   {t:'“send a pic of the bowls. i’ll confirm”',fx:()=>{apply({aff:3});S.f.fedSaid=(S.f.fedSaid||0)+1},reply:()=>['(photo: four bowls, full, flash on. Biscuit’s eyes glow in the background like a small demon’s.)','Confirmed by a second party. Thank you. Good night.']},
   {t:'“v it’s 4am. go to bed”',fx:()=>relApply({tension:2}),reply:()=>['Yes. Of course. I apologise for the hour.']}]}}});
/* lighter ones */
txDef('tx_aquiz',{with:'a',pov:'m',prio:1,when:()=>frT('a')>=1&&S.day>=3&&W24(),nodes:{
 start:{in:()=>['QUIZ TIME','“which type of serial killer are u” it’s on a real website. with ADS','q1: ur ideal sunday'],expire:3,
  opts:()=>[{t:'“asleep”',reply:()=>['boring. valid. next'],next:'q2'},{t:'“konbini egg sandwich on a roof”',fx:()=>fr('a',2),reply:()=>['specific. i love her. next'],next:'q2'}]},
 q2:{in:()=>['q2: “how do you feel after?” options are A) powerful B) nothing C) hungry D) i have never done this'],opts:()=>[
   {t:'“C”',fx:()=>fr('a',2),reply:()=>['u got: “THE VISIONARY (mission-oriented)”','i got “THE HEDONIST” which, rude. ronin got “please contact a mental health professional”. v refused to take it and then took it and won’t say']},
   {t:'“D, officer”',fx:()=>fr('a',3),reply:()=>['LMAOOO','u got: “you are not a serial killer! :)” w a little balloon','framing it']},
   {t:'“B”',reply:()=>['u got: “THE PROFESSIONAL”','it says ur “organised and emotionally detached” babe u cried at a duck video yesterday']}]}}});
txDef('tx_rname',{with:'r',pov:'m',prio:1,when:()=>frT('r')>=1&&S.day>=4&&W24(),nodes:{
 start:{in:()=>['motion to rename the group chat','currently “killer chat”. that’s evidence, darlin’. that’s exhibit A with a bow on it','I’m proposin’ “book club”'],expire:3,
  opts:()=>[{t:'“seconded”',fx:()=>fr('r',2),reply:()=>['motion carries. V abstained. Angel changed it to “book club 🔪” so we’re back where we started']},
   {t:'“counter: ‘brunch’”',fx:()=>fr('r',3),reply:()=>['hell. that’s better. nobody ever got convicted on “brunch”','Angel says only if there’s a brunch. there’s a brunch now. Sunday.']},
   {t:'“we should probably delete the whole server”',reply:()=>['and lose four years of Angel’s pigeon photos? I’d sooner do the time']}]}}});
txDef('tx_vcactus',{with:'v',pov:'m',prio:1,when:()=>tier()>=1&&S.day>=4&&W24(),nodes:{
 start:{in:()=>['Your cactus is dying.','I noticed on Tuesday. I have been reading about it since. May I intervene?'],expire:3,
  opts:()=>[{t:'“prickles is fine”',reply:()=>['Prickles is soft at the base. That is rot. He has been overwatered by someone who loves him.'],next:'gary'},
   {t:'“...how do u kill a cactus”',reply:()=>['With attention. You have watered him every day. He needed to be left alone for a month.'],next:'gary'}]},
 gary:{in:()=>['I can cut above the rot and re-root him. He will be shorter. He will live.'],opts:()=>[
   {t:'“do it. save prickles”',fx:()=>{apply({aff:3});S.f.prickCut='saved'},reply:()=>['It is done. He is drying on your windowsill on a paper towel. Do not water him. I will know.','(photo: a small green stump on a paper towel, labelled “PRICKLES — DO NOT WATER” in fountain pen)']},
   {t:'“no. he lives or dies as he is”',fx:()=>{apply({aff:1});S.f.prickCut='left'},reply:()=>['...Very well. That is his right, and yours.','I have left a small sign by his pot. It says “please.”']}]}}});
txDef('tx_mbiscuit',{with:'m',pov:'v',prio:1,when:()=>tier()>=1&&S.day>=3&&W24(),nodes:{
 start:{in:()=>['v','v emergency','biscuit is wearing ur reading glasses','i didn’t put them on her. she’s just wearing them. she looks like a tax lawyer'],expire:2,
  opts:()=>[{t:'“Send a photograph.”',fx:()=>apply({aff:2}),reply:()=>['(photo: Biscuit, gold wire glasses, deeply serious)','she’s reviewing ur budget. she has notes'],next:'notes'},
   {t:'“Please take them off her before she eats them.”',reply:()=>['she’d never. she respects the craft','ok she licked a lens'],next:'notes'}]},
 notes:{in:()=>['can i keep the photo as ur contact pic'],opts:()=>[
   {t:'“You may.”',fx:()=>{apply({aff:3});S.f.biscuitPic=1},reply:()=>['done. when u call me it’s a dog in glasses now. forever']},
   {t:'“What was it before?”',fx:()=>apply({aff:2}),reply:()=>['...a blurry one of u reading. from the first week','don’t make it weird','it’s still in a folder']}]}}});
/* ---------- 6. CALLS ---------- */
call({id:'c_vfour',from:'v',when:()=>phMe()==='m'&&tier()>=2&&S.slot>=2&&S.day>=6&&W24(),hint:()=>'V calls at night about one thing.',
 answer:done=>say([['','You pick up. For a few seconds there’s only breathing, and a dog’s tags jingling close to the phone.'],['K9','I am sorry. I do not have a reason prepared.']],()=>ask('hitmeuppp','(...)',[
  {t:'“bad one?”',fn:()=>{apply({aff:3});S.f.vNightCall=1;say([['K9','The room. The small one. I was the age I am now, which was new, and I could not reach the handle.'],['hitmeuppp',MV('ur out. ur in ur kitchen. i can hear the fridge.','ur out, v. i can hear ur fridge humming. that’s ur fridge.','You’re out. I can hear your refrigerator. Nobody in that room had a refrigerator.','You’re in your own kitchen. I can hear the fridge and at least two dogs. That room never had either.')],['K9','...Yes. That is the fridge. Thank you. Stay a moment.']],done)}},
  {t:'Tell him about your day until he’s breathing normally.',fn:()=>{apply({aff:4});S.f.vNightCall=1;say([['','You tell him about the egg sandwich, the bus that didn’t come, the man with nine spatulas. Somewhere around the spatulas his breathing evens out.'],['K9','Nine.'],['hitmeuppp','NINE, v.'],['K9','For whom.'],['hitmeuppp','THAT’S WHAT I SAID.']],done)}}])),
 miss:()=>{phQueue('v',['Disregard the call. Biscuit sat on the phone.','(She did not. Good night.)'],0)}});
call({id:'c_mtap',from:'m',when:()=>phMe()==='v'&&tier()>=2&&W24()&&S.day>=5,hint:()=>'Misaki calls with the tap running.',
 answer:done=>say([['','She never calls. You answer on the first ring. Behind her, a tap is running hard.'],['hitmeuppp','hi. can u talk. about anything. i need to hear something that isn’t water.']],()=>ask('K9','(...)',[
  {t:'Read her the shelter’s adoption list.',fn:()=>{apply({aff:4});S.f.handsTold=1;say([['K9','Dumpling. Eleven years old. Three legs. Dislikes umbrellas. Adopted Tuesday by a retired bus driver.'],['','You get through fourteen dogs. At the ninth the tap turns off. You keep going so she will not have to mention it.'],['hitmeuppp','...do another one.'],['K9','Kevin. Age unknown. Bites.']],done)}},
  {t:'“Turn the tap off, Misaki. I will wait.”',fn:()=>{apply({aff:2});relApply({trust:2});say([['','A long pause. Then the water stops, and the line gets very quiet.'],['hitmeuppp',MV('ok. off.','ok. it’s off. my hands hurt.','It’s off. My hands hurt. I wasn’t going to stop on my own.','It’s off. I’d have stood there another hour. Thank you for saying it like an instruction.')]],done)}}])),
 miss:()=>{phQueue('m',['nvm. sorry. butt dial','(it wasn’t a butt dial)'],0);relApply({tension:1})}});
/* ---------- 7. THINGS IN THE ROOMS ---------- */
(function(){const bd=TD.maps.trailer.props.find(p=>p.id==='tr_bed');if(!bd)return;
 TD.maps.trailer.props.push({id:'tr_box',x:bd.x+bd.w+2,y:bd.y+bd.d-10,w:12,d:8,h:5,solid:false,label:()=>'Shoebox',draw:(x,y)=>{tdBox(x,y,12,8,5,'#7a5a3a','#5a4028');rect(x+1,y-5,10,1,'#a07a52')},
  act:who=>{if(who==='v')return tdSay([['','A shoebox, half under her bed, taped at the corners. Her handwriting on the lid: “MINE”.'],['K9','(It says whose it is. That is all I need to know about it.)']]);
   const n=S.f.boxN||0;const L=['1. my hands','2. the knife w the star charm','3. this box','4. whatever i ate today','5. prickles (cactus)'];if(tier()>=1)L.push('6. a key i didn’t ask for');if(S.f.luckyTold||S.f.fiveDone)L.push('7. the extra years');
   ask('hitmeuppp','The shoebox. Inside: a list on the back of a bus timetable, started at sixteen. “THINGS THAT ARE MINE.” '+L.join(' · '),[
    {t:n?'Read it again.':'Read it through.',fn:()=>{S.f.boxN=n+1;save();tdSay([['hitmeuppp',MV('(short list. still mine tho.)','(started w 3 things. the first one was “my hands”. i underlined it.)','(It started with three things. I underlined “my hands” so hard the pen went through.)','(Three things, at sixteen. I wrote “my hands” first, before the box I was writing it in.)')]])}},
    ...(!S.f.boxAdd&&tier()>=2?[{t:'Add a line.',fn:()=>{S.f.boxAdd=1;apply({heart:2});tdSay([['','You find a pen that works on the third try and write at the bottom: “'+(L.length+1)+'. a seat at a table”.'],['hitmeuppp','(...ok. don’t make it weird, list.)']])}}]:[]),
    {t:'Put the lid back on.',fn:()=>{}}])}});
 const b2=TD.maps.ewing.props.find(p=>p.id==='bd_bed');if(b2)TD.maps.ewing.props.push({id:'bd_wedge',x:b2.x+b2.w+6,y:b2.y+b2.d-8,w:10,d:6,h:2,solid:false,flat:1,label:()=>'Door wedge',draw:(x,y)=>{rect(x,y+2,10,3,'#3a3a3a');rect(x,y+1,6,1,'#4a4a4a')},
  act:who=>{if(who==='v')return tdSay([['','A rubber door wedge. There is one in every room of the house. You bought forty.'],['K9','(A door that is wedged cannot be locked from the outside. I worked that out at nine and a half.)']]);
   tdSay([['','A rubber door wedge, the cheap grey kind. Now that you’ve noticed this one, you realise every room in the house has one.'],['hitmeuppp',tdF('vChildKnown')?MV('(oh. yeah. that tracks.)','(one per room. so nothing can shut on him. ok.)','(One for every door. So that none of them can close on him again.)','(Forty rooms, forty wedges. He childproofed the house for a child who’d already grown up in it.)'):'(he really hates a closed door huh.)']])}});
 for(const id of ['ewing','trailer']){const M=TD.maps[id];M.props.forEach((p,n)=>{p.id=p.id||id+'#n'+n;p.map=M;if(p.solid===undefined)p.solid=!p.flat&&!p.wall&&!p.exit;p.w=p.w||TS;p.d=p.d===undefined?TS:p.d})}})();
/* ---------- 8. MORE CHAT ---------- */
PINGS.push(
 ['mi','does anyone else have a number. like a number of times u do a thing after. asking for science'],
 ['ro','mine’s pies. current record is nine. don’t ask about the seventh'],
 ['an','mine’s takes. i refilm everything 6 times. including, once, a guy. (i mean i filmed him 6 times. he only happened once)'],
 ['k9','Four. It is the number of dogs. I count them before bed. There have always been four when I counted.'],
 ['an','group poll: is it self care if there’s a body in the next room. be honest'],
 ['ro','found a lighter in a coat I ain’t worn since I left home. works first strike. of course it does'],
 ['mi','konbini guy asked if i was ok bc i bought 4 lemon soaps. i said “gifts”. he said “for who”. i left'],
 ['k9','The shelter’s new volunteer asked what I do “outside of this.” I said I read. This is true. I did not list the other thing.'],
 ['an','maria hit 400k. the heartsick angel hit 14. only one of those got a cake'],
 ['mi','sat in a guy’s apartment for 2 hrs waiting and his cat sat on me the whole time. felt bad after. for the cat. i left the window open and a tin of tuna'],
 ['ro','PSA from your elder: eat somethin’ after. I don’t care what. the shakes ain’t guilt, they’re blood sugar'],
 ['k9','Addendum to Ronin’s message: the kitchen at the foundation is unlocked. There is soup. No one will ask.']);
DRIFT.a.push('do u think the ceiling is lonely. asking for me','filmed a get-ready-with-me in the same mirror i cleaned a knife in. 80k likes. nobody ever checks the reflection','my mom commented “beautiful!!” on maria’s post. first thing she’s said to me in 3 yrs. she doesn’t know it’s me');
DRIFT.r.push('pie five is out. this one’s yours. come get it warm or don’t come at all (come anyway)','drove past a church and didn’t slow down. personal best','you eat today? I’ll know if you lie. I always know');
DRIFT.v.push('The dogs are fed. I am telling you so that someone else knows.','I have wedged your trailer door open with a shoe while I unload the groceries. Do not be alarmed by the shoe.','There are now seven bentos. I miscounted in your favour.');
DRIFT.m.push('washed my hands 3 times today. just 3. putting it on the fridge','what’s it called when ur happy and it makes u nervous','the calendar app asked if i want to “plan ahead.” first time i’ve said yes');
const _chatW=chatLog;chatLog=function(){const L=_chatW();if(!S||S.phase==='taken')return L;const k=(S.day*5+S.slot)%7;
 if(k===1)L.push(['ro','four killers in a group chat and every one of us has a bedtime routine. we are so close to bein’ fine']);
 if(k===3)L.push(['an','whoever said “the body keeps the score” mine keeps the lighting setup']);
 if(k===5)L.push(['k9','Good night. The dogs are fed. (I will stop announcing this when it stops helping.)']);
 return L};
/* ---------- 9. WHERE IT ENDS UP ---------- */
const _xeW=extraEnding;extraEnding=function(){const L=_xeW();if(!S||!S.f)return L;const f=S.f;
 if(f.fiveDone==='told'||f.fiveV==='entry')L.push('There is a dentist appointment in Misaki’s calendar every March now. She has never been. She has never deleted one.');
 else if(f.fiveDone==='angel')L.push('Angel keeps a flattened cake box in her closet that says HAPPY NOT DEAD DAY. She adds a tally mark to the lid every year.');
 else if(f.fiveDone==='bench')L.push('Once a year Misaki eats a salmon bento on a repainted station bench with her hood up. She goes home afterwards. That’s the new part.');
 if(f.hour70Told||f.fedSaid>=1||f.mBowls==='scoop')L.push('At 4am, when V stands in the kitchen, somebody says “they’re fed.” Some nights it is Misaki. More and more it is him, and he believes it.');
 if(f.doorAsk==='asked'||f.doorAsk==='opened')L.push('Every door in the house stays open a hand’s width. Misaki measures it with her hand. Nobody has had to ask since.');
 if(f.handsTold||f.ronHands)L.push('Three washes, most days. On the days it’s nine, there’s hand cream by the sink that smells like an old man, and nobody counts out loud.');
 if(f.angelCeil==='ceiling'||f.angelCeil==='down')L.push('Angel says she comes down off the ceiling more often now. Mostly at brunch. Mostly when Ronin is being loud.');
 if(f.boxAdd)L.push('The list in the shoebox has more lines than it has room for. She has started writing on the lid.');
 return L};
