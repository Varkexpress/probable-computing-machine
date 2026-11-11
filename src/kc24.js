/* ===================== WHAT IT COSTS: the date, the bowls, the door, the hands ===================== */
/* Short scenes about what the work and the years before it left behind. Misaki: the five-year date, the hand-washing,
   the menu math. V: hour 70, closed doors, the dog bowls at 4am. Angel: watching herself from the ceiling. Ronin: the oven. */
const W24=()=>!S.dark&&S.phase!=='taken';
const mP=()=>S.pov!=='v',vP=()=>S.pov==='v';
/* ---------- 1. THE DATE (Misaki gave herself five years. The date is in her phone.) ---------- */
EVENTS.push({id:'five_eve',when:()=>mP()&&W24()&&S.day>=9&&!S.f.fiveDay,run:done=>{S.f.fiveDay=S.day+1;save();say([
 ['','Your phone buzzes at 7am with a calendar reminder you don’t remember setting.'],
 ['','“TOMORROW: done by now lol”. It doesn’t repeat. You made it five years ago, at sixteen, on a station bench.'],
 ['hitmeuppp',MV('oh fuck. that’s tomorrow.','oh fuck i wrote it DOWN. tomorrow’s the day i figured i’d be dead by. lol.','I put my own deadline in a calendar app. With “lol”. I was sixteen and I thought I was being realistic.','I forgot I ever wrote it down. Sixteen-year-old me scheduled her own death in a calendar app and added “lol.” What a little shit, seriously.')]],done)}},
 {id:'five_day',when:()=>mP()&&W24()&&S.f.fiveDay&&S.day>=S.f.fiveDay&&!S.f.fiveDone,run:done=>{
  const fin=(k,L,fx)=>()=>{S.f.fiveDone=k;S.f.fiveOn=S.day;save();say(L,()=>{fx&&fx();done()})};
  const O=[{t:'Go sit on the station bench.',fn:fin('bench',[
    ['','It’s the same bench, repainted. Somebody has already scratched a phone number into the new paint.'],
    ['','You buy the bento from the kiosk, the one you bought after the first job, and eat all of it with your hood up.'],
    ['hitmeuppp',MV('(still here. still hungry. ok.)','(i sat here at sixteen and did the math and the math said five years. my math is always shit. ask angel.)','(I did the sums on this bench. I was sure of them. I’d like to tell her she carried a one wrong.)','(She sat right here and worked out how long she had, the smug little idiot. One: she was wrong. Two: the bento’s still good. Three: I’m not crying on a train platform, it’s the wasabi.)')]],()=>apply({heart:2,energy:-1}))},
   {t:'Take a job. Work straight through it.',fn:fin('work',[
    ['','The target is a man on level four of a parking structure. Your hands are the steadiest they’ve been all month.'],
    ['','After, you wash them three times, open the calendar, and delete the entry. The app asks if you’re sure.'],
    ['hitmeuppp',MV('(yeah. i’m sure.)','(yeah i’m sure. u don’t get a vote, app.)','(Yes, I’m sure. I shot a man an hour ago, I can manage a button.)','(I pressed “delete” with the same finger I had on the trigger an hour ago. The trigger was easier. That sucker had it coming, and the calendar never did anything to anyone.)')]],()=>apply({edge:2,heat:1}))}];
  if(!isLone()&&tier()>=1)O.unshift({t:'Show V the reminder.',fn:fin('told',[
    ['','You hold the phone up across the kitchen island. He takes his reading glasses out of his pocket to look at it. It takes him a long time to read six words.'],
    ['K9','You were sixteen when you wrote this.'],['hitmeuppp',MV('yeah. it’s today. surprise.','yeah. today’s the day. i overshot.','Yes. Today. I seem to have missed my appointment.','Yeah. I gave myself until today. I’m late for my own funeral and I’m standing in your kitchen in hound hair about it.')],
    ['','He puts the phone face down. Then he makes you eggs, badly, because the hounds are leaning on his legs the whole time.'],
    ['K9','Eat. Then I would like you to put something for next year in the calendar. A dentist, if nothing else.']],()=>{apply({aff:4,heart:2});S.f.fiveTold=1})});
  else O.unshift({t:'Send Angel a screenshot.',fn:fin('angel',[
    ['','You send it before you can think about it. Three dots appear and stop, and then your phone rings, which Angel never does in daylight.'],
    [AN,'i’m outside ur place with a cake that says “HAPPY NOT DEAD DAY.” the bakery lady asked who it was for and i said “someone who’s mine.” she stopped asking.'],
    ['hitmeuppp',MV('...u did not.','u got it WRITTEN on a CAKE.','You had a stranger write that on a cake. In icing.','You stood in a bakery and said that out loud to a stranger with a piping bag. Oh my God, babe. That’s evidence.')],
    [AN,'it’s in pink. open the door before i shoot the lock.']],()=>{fr('a',5);apply({heart:2})})});
  ask('hitmeuppp','The reminder goes off again at 7am. “TODAY: done by now lol”.',O)}},
 {id:'five_after',when:()=>mP()&&W24()&&S.f.fiveDone&&S.day>S.f.fiveOn&&!S.f.fiveAfter,run:done=>{S.f.fiveAfter=1;save();const k=S.f.fiveDone;
  if(k==='told')phQueue('v',['I have put the dentist in your calendar. It is for March. You may move it but you may not delete it.'],0);
  else if(k==='angel')phQueue('a',['there’s cake left. i’m keeping the box. it’s my evidence that u lived and i like having evidence'],0);
  else if(frT('a')>=1)phQueue('a',['u went quiet yesterday. i count my gremlins every night. tell me i still have one or i’m coming over with the shotgun'],0);
  phDeliver();say([['','You wake up the day after the date to an empty calendar. The light through the blind is doing what it always does.'],
   ['hitmeuppp',MV('(it’s day one of the extra. ok. what do people do.)','(it’s the first day i never planned for, and nothing’s booked ever again. fuck.)','(This is the first morning I never made plans for. What do people even do? Brunch? Taxes?)','(Everything from here is unscheduled and I never budgeted for it. Rent, groceries, a dentist, et cetera, whatever. Life is so unfair: I have to keep paying for it.)')]],done)}},
 /* V's side of the same morning */
 {id:'five_v',when:()=>vP()&&W24()&&S.day>=9&&tier()>=1&&!isLone()&&!S.f.fiveV,run:done=>{
  const fin=(k,L,fx)=>()=>{S.f.fiveV=k;save();say(L,()=>{fx&&fx();done()})};
  ask('K9','Her phone lights up on the counter while she is in the shower. A calendar reminder: “TODAY: done by now lol”. Created five years ago.',[
   {t:'Ask her about it.',fn:fin('ask',[['K9','Your phone showed me a reminder. I read it.'],['hitmeuppp','oh fuck. u saw that.'],
    ['hitmeuppp',MV('it’s old. i was 16. i gave myself 5 yrs. it’s fine.','i wrote it at 16. five years, that’s how long i figured i’d last. it’s today. it’s fine.','I set it when I started. Five years seemed generous. It’s today, and I’m in your kitchen in a towel, so.','I gave myself five years and wrote the end date down so it wouldn’t sneak up on me. It snuck up on me anyway, and I’m in your kitchen in a towel, so don’t make the face.')],
    ['K9','Then it was a poor estimate. You will choose dinner tonight, and tomorrow there will be something else in that calendar.']],()=>{apply({aff:4});relApply({trust:3})})},
   {t:'Say nothing. Add an entry for next year.',fn:fin('entry',[['','You type with one finger: same date next year, “Dentist.” You consider it, then add a second one the year after: “Dentist (again).”'],
    ['','She finds them that evening. You hear her laugh once from the other room, short, like a cough.'],['hitmeuppp','(from the hall) v. what the fuck. i don’t even HAVE a dentist.'],['K9','You have a year to find one.']],()=>{apply({aff:5});S.f.fiveTold=1})},
   {t:'Turn the phone face down.',fn:fin('down',[['','You turn it over and line it up with the edge of the counter. When she comes out she looks at the phone, then at you, and neither of you says it.'],
    ['','She eats two breakfasts and takes the toast off your plate.']],()=>{apply({aff:1});relApply({tension:2})})}])}});
/* ---------- 2. HOUR 70 (V at nine: 72 hours in a locked room, asking if the dogs were fed) ---------- */
EVENTS.push({id:'v_bowls',when:()=>vP()&&W24()&&S.day>=4&&(S.f.bowls||0)<3,run:done=>{S.seen.v_bowls=0;const n=S.f.bowls=(S.f.bowls||0)+1;S.f.bowlDay=S.day;save();
  ask('K9',n===1?'4:10am. You are standing in the kitchen in the dark, looking at the hound bowls. They are full. You filled them at nine. You knew that when you got out of bed.':n===2?'4:10am again. The bowls are full. The grey hound watches you check from her bed with one eye open, the way a nurse watches a patient.':'4:10am. You are already in the kitchen before you are properly awake. The bowls are full. Of course they are full.',[
   {t:'Check the water as well.',fn:()=>{apply({edge:1,energy:-1});say([['','The water is fine. You top it up anyway and stand there until the tap stops dripping.'],['K9','(Fed. Watered. Fed. Go to bed.)']],done)}},
   {t:'Sit on the floor with the hounds.',fn:()=>{apply({heart:1});say([['','You sit down on the tile in your good trousers. All four of them come over and lie on you, heavily, in order of rank.'],['K9',n>1?'(You are fed. I saw it. I did it myself.)':'(No one will tell me no. I hold the food now, and the keys.)']],done)}},
   ...(!isLone()&&tier()>=2?[{t:'Text Misaki. She will be awake.',fn:()=>{S.f.bowlsTold=1;apply({aff:2});phQueue('m',['they’re FED v','i know bc u sent me a photo of the full bowls at 9pm with the caption “Fed.”','go to sleep. i’ll check them in my head. ok checked. still full. the grey one’s looking at me like i should fuck off'],0);phDeliver();say([['','You type “Are you awake.” The answer comes before you put the phone down.']],done)}}]:[])])}},
 {id:'m_bowls',when:()=>mP()&&W24()&&tier()>=2&&!isLone()&&S.day>=6&&!S.f.mBowls,run:done=>{
  ask('hitmeuppp','4am. You get up for water and find V in the kitchen with the light off, looking at the hound bowls. They’re full. He doesn’t hear you come in.',[
   {t:'“they’re fed, v.”',fn:()=>{S.f.mBowls='said';apply({aff:3});say([['K9','Yes. I am aware. I checked.'],['hitmeuppp','how many times'],['K9','Twice. This is the third.'],
     ['hitmeuppp','ok. i’ll stand here w u for the fourth.'],
     ['K9','That is not necessary.'],['hitmeuppp','wasn’t asking.']],()=>done())}},
   {t:'Add one more scoop to each bowl while he watches.',fn:()=>{S.f.mBowls='scoop';apply({aff:4});say([['','You don’t say anything. You get the scoop and put a little extra in each bowl, slowly, where he can see it land.'],['','He breathes out. The grey hound, who has never turned down food in her life, gets up and eats it immediately.'],['K9','She was fed at nine. She is a glutton. Thank you.']],done)}},
   {t:'Go back to bed. Leave him to it.',fn:()=>{S.f.mBowls='left';say([['','You take your water and go. He comes back at five. His feet are cold. You pretend to be asleep and move over.']],done)}}])}},
 /* the door */
 {id:'m_door',when:()=>mP()&&W24()&&tier()>=2&&!isLone()&&S.day>=5&&!S.f.doorAsk,run:done=>{
  ask('hitmeuppp','You push his bedroom door shut behind you, the way you’d shut any door. The latch clicks. V stops reading mid-page.',[
   {t:'“...what.”',fn:()=>{S.f.doorAsk='asked';apply({aff:2});relApply({trust:3});say([['K9','Would you open it. A hand’s width is enough.'],['hitmeuppp','is it too hot or'],['K9','No.'],['','You open it a hand’s width. He finds his place on the page again. You look around the house in your head: you have never seen one door in it fully closed.'],
     ['hitmeuppp',MV('(oh. ok. noted.)','(every door in this house is open a little. every one. how the fuck did i miss that)','(Every door here stands a little open. I thought it was for the hounds.)','(He leaves every door open a hand’s width. I thought that was for the hounds, like an idiot. He was nine and somebody shut one on him.)')]],done)}},
   {t:'Open it again without asking.',fn:()=>{S.f.doorAsk='opened';apply({aff:4});say([['','You open it again, a hand’s width, and sit down on the bed like that’s where you were always going.'],['K9','You did not need to do that.'],['hitmeuppp',MV('i know','i know. i like a draft.','I know. Shut up, I wanted to.','I know. I like a draft. And if anybody comes down that hallway I’d rather see them first; I sleep with a knife, babe, it works out.')]],done)}}])}},
 {id:'v_latch',when:()=>vP()&&W24()&&tier()>=2&&!isLone()&&S.day>=5&&!S.f.doorAsk,run:done=>{
  ask('K9','She closes the bedroom door behind her, as anyone would. The latch clicks. You have read the same line four times and you are counting, without wanting to, from one.',[
   {t:'“Would you open it. A hand’s width.”',fn:()=>{S.f.doorAsk='asked';apply({aff:3});relApply({trust:3});say([['hitmeuppp','is it too hot or'],['K9','No. I do not sleep in closed rooms.'],['','She opens it exactly a hand’s width, measures it with her actual hand, and looks at you to check.'],['hitmeuppp',MV('good?','that good?','Like that?','Like that? Say if you want it wider. I’ll take the whole door off, I’ve got a chainsaw in the car.')],['K9','That is sufficient.']],done)}},
   {t:'Get up and open it yourself.',fn:()=>{S.f.doorAsk='opened';apply({aff:1});say([['','You get up, open the door a hand’s width, and get back into bed. She watches the whole trip.'],['hitmeuppp','...u could’ve just said.'],['K9','Yes. I am aware that I could have.']],done)}},
   {t:'Leave it. Count.',fn:()=>{S.f.doorAsk='counted';apply({edge:3,energy:-1});say([['','You get to four thousand and six before she falls asleep. Then you open it, quietly, and the hallway is there, the same as always.'],['K9','(The hallway is where I left it. I look twice.)']],done)}}])}});
/* ---------- 3. HANDS (three washes: one for the job, one for the walk home, one for luck) ---------- */
EVENTS.push({id:'m_hands',when:()=>mP()&&W24()&&S.day>=3&&(S.heat||0)>0&&!S.f.handsDay,run:done=>{S.f.handsDay=S.day;save();
  ask('hitmeuppp','Your rule is three washes: one for the job, one for the walk home, one for luck. This morning you’re on the fourth and you don’t remember deciding to start it.',[
   {t:'Turn the tap off at four.',fn:()=>{apply({edge:-1});say([['','You turn it off. Your hands are pink and they smell like the lemon soap from the corner shop. They’re just hands.'],['hitmeuppp',MV('(four. fine. four is fine.)','(four’s allowed. nobody’s counting but me.)','(Four. I’ll allow it. I wrote the rule, I can amend it.)','(Four. Whatever. One for the job, one for the walk home, one for luck, and one because the guy was a bleeder. I wrote the rule, I can add a fucking clause.)')]],done)}},
   {t:'Keep going until the hot water runs out.',fn:()=>{S.f.handsBad=1;apply({edge:2,energy:-1});say([['','The water goes lukewarm, then cold. You count eleven. Your knuckles split a little at the creases.'],['','You put a plaster on the worst one. It has cartoon frogs on it. It was the only box they had.']],done)}},
   ...(!isLone()?[{t:'Dry them and text someone about anything else.',fn:()=>{apply({heart:1});phQueue('v',['The hounds send their regards. The grey hound sends hers by sitting on my foot. Have you eaten.'],0);phDeliver();say([['','You type “hi” with wet thumbs and send it before you’ve picked who it’s to. It goes to V. Of course it goes to V.']],done)}}]:[])])}},
 {id:'m_frogs',when:()=>vP()&&W24()&&tier()>=1&&!isLone()&&S.day>=4&&!S.f.frogs,run:done=>{S.f.frogs=1;save();
  ask('K9','Misaki has a plaster across one knuckle. It has cartoon frogs on it. The skin around it is red in the way skin gets from soap, and you know what soap damage looks like; you run a shelter.',[
   {t:'“How many times do you wash them?”',fn:()=>{apply({aff:3});relApply({trust:2});say([['hitmeuppp','...three. usually. job, walk home, luck.'],['K9','And when it is more than three?'],['hitmeuppp',MV('then it’s a bad day. it’s fine.','then it was a bad one. it happens. it’s fine.','Then it was a bad day, and I count until I stop.','Then some asshole got on me somewhere soap doesn’t go, and I keep scrubbing anyway. It’s fine. Don’t look at me like I’m one of your three-legged hounds.')],['','You go and get the hand cream you use after bathing forty hounds. You put it down next to her without a word. She uses it, says it smells like an old man, and keeps it.']],done)}},
   {t:'Say nothing. Buy the gentle soap.',fn:()=>{apply({aff:2});say([['','You replace every bar of soap in the house with the unscented kind the vet recommends for cracked paws. She notices in two days.'],['hitmeuppp','did u hound-soap me'],['K9','It is very good soap.']],done)}}])}});
/* ---------- 4. THE BENTO (after every job: the same bento. She ate one after the first and woke up still owning all of herself.) ---------- */
EVENTS.push({id:'m_bento',when:()=>mP()&&W24()&&tier()>=2&&!isLone()&&S.day>=7&&!S.f.bento,run:done=>{S.f.bento=1;save();say([
 ['','You open V’s fridge for water. On the second shelf are six salmon bentos from the station kiosk, stacked with the labels facing out. The kiosk is forty minutes from here.'],
 ['hitmeuppp','v. why the fuck do u have six of these.'],['K9','You buy one after every job. You have never once missed. I assumed the supply should not depend on the kiosk’s opening hours.'],
 ['hitmeuppp',MV('...i didn’t know u knew that.','u clocked the bento thing?? i never told anyone the bento thing.','I never told anyone about the bento. Seriously, no one. Have you been following me?','I ate one after the first job and woke up still me. I’ve bought one every time since, to check. And you just went and put six in a fridge like it’s nothing, you absolute weirdo.')],
 ['K9','They expire on Thursday. Please do not have six jobs by Thursday.']],()=>{apply({aff:4});done()})}});
/* ---------- talk topics ---------- */
/* the “hour 70” topic was removed with V’s childhood in the lower floor (setting rework) */
TDTOP_V.push({id:'sleeping',label:()=>'“do u dream about work.”',show:()=>tier()>=1&&!S.dark&&!(S.talks&&S.talks.sleeping),run:b=>{warm('v','sleeping',4);S.talks=S.talks||{};S.talks.sleeping=1;
 say([['hitmeuppp','do u dream about work.'],['K9','Rarely. The work is finished when I leave the table. There is nothing left of them to dream about.'],['hitmeuppp',MV('i don’t dream about them at all. is that bad','i never dream about the jobs. ever. i dream about the locker room.','I never dream about the people. I dream about the week before I started.','The jobs never come back at night. None of them, and I’ve chainsawed people. The locker room does. My head filed the wrong fucking thing under “worst.”')],['K9','I do not think it filed it wrong.']],b)}});
if(!TOPICS_V.find(x=>x.id==='sleeping'))TOPICS_V.splice(TOPICS_V.length-1,0,TDTOP_V[TDTOP_V.length-1]);
TDTOP_M.push({id:'menu',label:()=>'“You read menus for a long time.”',show:()=>tier()>=2&&!S.dark&&!(S.talks&&S.talks.menu),run:b=>{warm('m','menu',5);S.talks=S.talks||{};S.talks.menu=1;
 say([['K9','You read menus for a long time. You do not look at the prices.'],['hitmeuppp',MV('i’m looking at what i’d owe.','i’m working out what it costs. not the money kind.','I’m working out what I’d owe for it. Who’s paying, and what they’ll want after.','Every nice thing I ever got came with a bill later, and it was never money. So I read for the bill. Old habit, don’t make it a thing.')],['K9','And at my table?'],['hitmeuppp',MV('still reading. sorry.','i still check. every time. it’s always blank.','I still check. It comes up blank every time, and I check again.','I check every time. There’s never anything written there, which is honestly suspicious. I’m ordering anyway.')],['K9','Then order the most expensive thing on it. I will know if you do not.'],['hitmeuppp','...the eel??'],['K9','The eel.']],b)}});
if(typeof TOPICS_M!=='undefined'&&!TOPICS_M.find(x=>x.id==='menu'))TOPICS_M.splice(TOPICS_M.length-1,0,TDTOP_M[TDTOP_M.length-1]);
/* ---------- 5. TEXT THREADS ---------- */
txDef('tx_aceil',{with:'a',pov:'m',prio:3,when:()=>frT('a')>=2&&S.day>=6&&W24(),nodes:{
 start:{in:()=>['weird q','when ur working. do u ever watch urself do it','like from the ceiling. like ur the camera'],expire:3,
  opts:()=>[{t:'“no. i’m in my hands the whole time.”',reply:()=>['god. lucky.','i’m never in mine. i’m always up in the corner going “bad angle. chin down. the light’s wrong.”'],next:'who'},
   {t:'“sometimes. after.”',fx:()=>fr('a',2),reply:()=>['ok so u get it','i do it DURING. i’ve never once been in the room for my own work'],next:'who'},
   {t:'“is this a maria question or an angel question”',reply:()=>['that IS the question. keep up'],next:'who'}]},
 who:{in:()=>['my mom filmed everything. i learned to watch from outside before i learned to read','so now maria smiles and the angel hunts and i’m on the ceiling directing both','which one do u text. when u text me'],opts:()=>[
   {t:'“the one on the ceiling.”',fx:()=>{fr('a',5);S.f.angelCeil='ceiling'},reply:()=>['...','nobody’s ever picked her. they want maria or they get the angel','ok. she says hi. she’s crying a little. she’s checking how it looks']},
   {t:'“whoever sends the pigeon pics.”',fx:()=>{fr('a',3);S.f.angelCeil='pigeon'},reply:()=>['that’s all three of us. detective is a group project','good answer. u get to live']},
   {t:'“don’t care which. get ur ass down here sometimes.”',fx:()=>{fr('a',4);S.f.angelCeil='down'},reply:()=>['working on it','brunch helps. ronin’s so loud it’s hard to float. hunting helps more but u can’t say that at brunch']}]}}});
txDef('tx_avface',{with:'a',pov:'v',prio:2,when:()=>frT('a')>=1&&S.day>=5&&W24(),nodes:{
 start:{in:()=>['v. serious question. don’t be weird','do u remember their faces'],expire:3,
  opts:()=>[{t:'“All of them. In order.”',reply:()=>['of course u do. u probably have a spreadsheet'],next:'me'},
   {t:'“I remember their hounds.”',fx:()=>fr('a',2),reply:()=>['that is the MOST u answer possible','did u rehome them','u did. i know u did. don’t even type it'],next:'me'},
   {t:'“Why do you ask?”',reply:()=>['bc i can’t'],next:'me'}]},
 me:{in:()=>['i don’t remember any. i remember the lighting. i could tell u the colour temperature of every single one','is that broken'],opts:()=>[
   {t:'“They were things. One does not owe a thing the courtesy of remembering it.”',fx:()=>{fr('a',4);S.f.angelFace=1},reply:()=>['ok. cold. i like it','screenshotting that for a bad day. don’t let it go to ur head']},
   {t:'“Somewhat. So is counting them. We manage.”',fx:()=>fr('a',3),reply:()=>['lol. “we manage.” put it on the foundation letterhead']},
   {t:'“You should talk to your therapist about the true version.”',fx:()=>relApply({tension:1}),reply:()=>['v she’s a mandated reporter. i’d have to shoot her and i like her','but thanks. dad.']}]}}});
txDef('tx_roven',{with:'r',pov:'m',prio:2,when:()=>frT('r')>=1&&S.day>=5&&W24(),nodes:{
 start:{in:()=>['you up','course you’re up. it’s 4. nobody in this fuckin’ server sleeps on a work night','three pies in the oven. shut up. I can hear you laughin’'],expire:2,
  opts:()=>[{t:'“why do u always bake after”',reply:()=>['can’t sleep after. never fuckin’ could, not since the first one','oven’s got a timer. it dings, it’s done. guy tonight took forty minutes and never did shut up'],next:'more'},
   {t:'“what kind”',reply:()=>['peach, peach, pecan. fourth’s peach. don’t say a fuckin’ word'],next:'more'},
   {t:'“save me a slice”',fx:()=>fr('r',2),reply:()=>['boxed it ’fore I texted. you’re welcome, asshole']}]},
 more:{in:()=>['what d’you do with it. the after. and don’t gimme “nothin’,” I’ve seen you after'],opts:()=>[
   {t:'“wash my hands. three times.”',fx:()=>{fr('r',4);S.f.ronHands=1},reply:()=>['three. alright. least it stops','I got pies, you got soap, V’s got his mutts, princess has a ring light. bunch of fuckin’ head cases. don’t tell ’em I said so']},
   {t:'“eat a bento and sleep 12 hrs”',fx:()=>fr('r',3),reply:()=>['the fuck. that’s the sanest thing anybody’s ever said in this server. you’re makin’ the rest of us look bad']},
   {t:'“nothing. it doesn’t weigh anything.”',fx:()=>fr('r',1),reply:()=>['bullshit','I ran that line eleven years. then one night it was nine pies and I ain’t talkin’ about the seventh. it’ll get you too']}]}}});
txDef('tx_rvdown',{with:'r',pov:'v',prio:2,when:()=>frT('r')>=1&&S.day>=6&&W24(),nodes:{
 start:{in:()=>['got a question. you can tell me t’fuck off','that house of yours goes down a long fuckin’ way. you ever go back down to the bottom?'],expire:3,
  opts:()=>[{t:'“Once a year. To check the locks.”',reply:()=>['from which side'],next:'side'},
   {t:'“Mind your business.”',fx:()=>relApply({tension:1}),reply:()=>['yeah, yeah. there’s a pie on your porch. don’t read into it']},
   {t:'“Misaki has been down there. She found the logs.”',fx:()=>fr('r',2),reply:()=>['and she’s still eatin’ at your table?','gremlin’s got bigger balls than the both of us. don’t fuck that up'],next:'side'}]},
 side:{in:()=>['there was a shed back home. burned it the week I left town. felt fuckin’ great for about an hour','why’s yours still standin’'],opts:()=>[
   {t:'“So that I am the one who holds the keys.”',fx:()=>{fr('r',4);S.f.ronDown='keys'},reply:()=>['huh. yeah. alright','beats fire. shit. shoulda kept mine and locked somebody in it']},
   {t:'“I put a flower room in it. And a library.”',fx:()=>{fr('r',3);S.f.ronDown='flowers'},reply:()=>['you put FLOWERS in it','V. buddy. that’s the most fucked up thing I ever heard and I crack heads for a livin’. send pictures']},
   {t:'“I do not know.”',fx:()=>{fr('r',3);S.f.ronDown='dunno'},reply:()=>['huh','well, when you want it gone, I got matches and a crowbar. I’ll ask questions the whole fuckin’ time but I’ll do it']}]}}});
txDef('tx_vhands',{with:'m',pov:'v',prio:3,when:()=>tier()>=1&&S.day>=4&&W24(),nodes:{
 start:{in:()=>['q','how many times do u wash ur hands after a job'],expire:2,
  opts:()=>[{t:'“Once. Thoroughly. Then I walk the hounds.”',reply:()=>['ONCE???','u cube people, v. into cubes. once. ok'],next:'three'},
   {t:'“How many times do you?”',reply:()=>['3'],next:'three'},
   {t:'“What happened?”',fx:()=>apply({aff:1}),reply:()=>['nothing HAPPENED. it’s a survey. seriously'],next:'three'}]},
 three:{in:()=>['i do 3. job, walk home, luck','today i did 9','is that a thing or am i being a freak'],opts:()=>[
   {t:'“It is a thing, and a common one. Half my shelter volunteers do it.”',fx:()=>{apply({aff:3});relApply({trust:3});S.f.handsTold=1},reply:()=>['ur volunteers wash HOUNDS','i was washing off a guy who owed my client forty grand','whatever. boring is good. i’m counting it']},
   {t:'“Come here. I will make tea and you can hold the cup.”',fx:()=>{apply({aff:4});S.f.handsTold=1},reply:()=>['so my hands have a job that isn’t the tap','ok that’s annoyingly smart','omw. not the smoky one, it tastes like a house fire']},
   {t:'“Nine is excessive. It is also not unusual. Show me the knuckles.”',fx:()=>{apply({aff:2});relApply({trust:2})},reply:()=>['ok dr. v','(thx)']}]}}});
txDef('tx_m4am',{with:'v',pov:'m',prio:3,when:()=>tier()>=2&&S.day>=5&&S.slot>=2&&W24(),nodes:{
 start:{in:()=>['Are you awake.'],expire:1,onExpire:()=>phQueue('v',['Disregard. Good night.'],0),
  opts:()=>[{t:'“yeah. what’s up”',reply:()=>['Nothing is “up.” I have checked the hound bowls three times. They are full. I am aware they are full.'],next:'fed'},
   {t:'“no. i’m asleep. this is my ghost”',fx:()=>apply({aff:1}),reply:()=>['Then please ask the ghost whether the hounds have been fed.'],next:'fed'}]},
 fed:{in:()=>['I would like someone else to say it.'],opts:()=>[
   {t:'“they’re fed, v.”',fx:()=>{apply({aff:4});relApply({trust:3});S.f.fedSaid=(S.f.fedSaid||0)+1},reply:()=>['Thank you.','It holds when you say it. I do not know why.','Go back to sleep. I will also attempt it.']},
   {t:'“send a pic of the bowls. i’ll confirm”',fx:()=>{apply({aff:3});S.f.fedSaid=(S.f.fedSaid||0)+1},reply:()=>['(photo: four bowls, full, flash on. The grey hound’s eyes glow in the background like a small demon’s.)','Confirmed by a second party. Thank you. Good night.']},
   {t:'“v it’s 4am. go to bed”',fx:()=>relApply({tension:2}),reply:()=>['Yes. Of course. I apologise for the hour.']}]}}});
/* lighter ones */
txDef('tx_aquiz',{with:'a',pov:'m',prio:1,when:()=>frT('a')>=1&&S.day>=3&&W24(),nodes:{
 start:{in:()=>['QUIZ TIME','“which type of serial killer are u” it’s on a real website. with ADS','q1: ur ideal sunday'],expire:3,
  opts:()=>[{t:'“asleep”',reply:()=>['boring. next'],next:'q2'},{t:'“corner shop egg sandwich on a roof”',fx:()=>fr('a',2),reply:()=>['specific. i love her. next'],next:'q2'}]},
 q2:{in:()=>['q2: “how do you feel after?” options are A) powerful B) nothing C) hungry D) i have never done this'],opts:()=>[
   {t:'“C”',fx:()=>fr('a',2),reply:()=>['u got: “THE VISIONARY (mission-oriented)”','i got “THE HEDONIST” which, fine, yes. ronin got “please contact a mental health professional.” v took it and won’t say']},
   {t:'“D, officer”',fx:()=>fr('a',3),reply:()=>['liar','u got: “you are not a serial killer! :)” w a little balloon','i’m framing it for ur trial']},
   {t:'“B”',reply:()=>['u got: “THE PROFESSIONAL”','it says ur “organised and emotionally detached” babe u cried at a duck video yesterday']}]}}});
txDef('tx_rname',{with:'r',pov:'m',prio:1,when:()=>frT('r')>=1&&S.day>=4&&W24(),nodes:{
 start:{in:()=>['motion to rename the group chat','it’s called “killer chat.” that’s exhibit fuckin’ A. might as well mail the cops our addresses','I’m proposin’ “book club”'],expire:3,
  opts:()=>[{t:'“seconded”',fx:()=>fr('r',2),reply:()=>['motion carries. V abstained. Angel already changed it to “book club 🔪” so fuck me, I guess']},
   {t:'“counter: ‘brunch’”',fx:()=>fr('r',3),reply:()=>['shit. that’s better. nobody ever got the chair over “brunch”','Angel says only if there’s an actual brunch. so there’s a brunch. Sunday. bring nothin’, you can’t cook']},
   {t:'“we should probably delete the whole server”',reply:()=>['and lose four years of princess’s pigeon photos? nah. she’d kill me, and I mean with the shotgun']}]}}});
txDef('tx_vcactus',{with:'v',pov:'m',prio:1,when:()=>tier()>=1&&S.day>=4&&W24(),nodes:{
 start:{in:()=>['Your cactus is dying.','I noticed on Tuesday. I have been reading about it since. May I intervene?'],expire:3,
  opts:()=>[{t:'“prickles is fine”',reply:()=>['Prickles is soft at the base. That is rot. He has been overwatered by someone who loves him.'],next:'gary'},
   {t:'“...how do u kill a cactus”',reply:()=>['With attention. You have watered him every day. He needed to be left alone for a month.'],next:'gary'}]},
 gary:{in:()=>['I can cut above the rot and re-root him. He will be shorter. He will live, which is more than I usually offer.'],opts:()=>[
   {t:'“do it. save prickles”',fx:()=>{apply({aff:3});S.f.prickCut='saved'},reply:()=>['It is done. He is drying on your windowsill on a paper towel. Do not water him. I will know.','(photo: a small green stump on a paper towel, labelled “PRICKLES — DO NOT WATER” in fountain pen)']},
   {t:'“no. he lives or dies as he is”',fx:()=>{apply({aff:1});S.f.prickCut='left'},reply:()=>['Very well. He is yours to lose.','I have left a note by his pot regardless. It says “Do not water.” It is addressed to you.']}]}}});
txDef('tx_mbiscuit',{with:'m',pov:'v',prio:1,when:()=>tier()>=1&&S.day>=3&&W24(),nodes:{
 start:{in:()=>['v','v emergency','biscuit is wearing ur reading glasses','i didn’t put them on her. she’s just wearing them. she looks like a tax lawyer'],expire:2,
  opts:()=>[{t:'“Send a photograph.”',fx:()=>apply({aff:2}),reply:()=>['(photo: the grey hound, gold wire glasses, deeply serious)','she’s reviewing ur budget. she has notes'],next:'notes'},
   {t:'“Please take them off her before she eats them.”',reply:()=>['she’d never. she respects the craft','ok she licked a lens'],next:'notes'}]},
 notes:{in:()=>['can i keep the photo as ur contact pic'],opts:()=>[
   {t:'“You may.”',fx:()=>{apply({aff:3});S.f.biscuitPic=1},reply:()=>['done. when u call me it’s a hound in glasses now. forever']},
   {t:'“What was it before?”',fx:()=>apply({aff:2}),reply:()=>['a blurry one of u reading. from the first week','shut up','i’m keeping that one too. the folder’s called “blackmail”']}]}}});
/* ---------- 6. CALLS ---------- */
call({id:'c_vfour',from:'v',when:()=>phMe()==='m'&&tier()>=2&&S.slot>=2&&S.day>=6&&W24(),hint:()=>'V calls at night about one thing.',
 answer:done=>say([['','You pick up. For a few seconds there’s only breathing, and a hound’s tags jingling close to the phone.'],['K9','I am sorry. I do not have a reason prepared.']],()=>ask('hitmeuppp','(...)',[
  {t:'“bad one?”',fn:()=>{apply({aff:3});S.f.vNightCall=1;say([['K9','I dreamt of the small room. I was the age I am now, which was new, and I could not reach the handle.'],['hitmeuppp',MV('ur out. ur in ur kitchen. i can hear the fridge.','ur out, v. i can hear ur fridge humming. that’s ur fridge.','You’re out. I can hear your refrigerator. Nobody in that room had a refrigerator.','You’re in your own kitchen, V. I can hear the fridge and at least two hounds, and one of them is definitely eating something she shouldn’t. That room didn’t have shit.')],['K9','Yes. That is the refrigerator. That is the grey hound. Stay on the line a moment.']],done)}},
  {t:'Tell him about your day until he’s breathing normally.',fn:()=>{apply({aff:4});S.f.vNightCall=1;say([['','You tell him about the egg sandwich, the bus that didn’t come, the man with nine spatulas. Somewhere around the spatulas his breathing evens out.'],['K9','Nine.'],['hitmeuppp','NINE, v.'],['K9','For whom.'],['hitmeuppp','THAT’S WHAT I SAID.']],done)}}])),
 miss:()=>{phQueue('v',['Disregard the call. The grey hound sat on the phone.','(She did not. Good night.)'],0)}});
call({id:'c_mtap',from:'m',when:()=>phMe()==='v'&&tier()>=2&&W24()&&S.day>=5,hint:()=>'Misaki calls with the tap running.',
 answer:done=>say([['','She never calls. You answer on the first ring. Behind her, a tap is running hard.'],['hitmeuppp','hi. ok. talk to me. about anything, i don’t care, i need to hear something that isn’t fucking water.']],()=>ask('K9','(...)',[
  {t:'Read her the shelter’s adoption list.',fn:()=>{apply({aff:4});S.f.handsTold=1;say([['K9','Dumpling. Eleven years old. Three legs. Dislikes umbrellas. Adopted Tuesday by a retired bus driver.'],['','You get through fourteen hounds. At the ninth the tap turns off. You keep going so she will not have to mention it.'],['hitmeuppp','...do another one.'],['K9','Kevin. Age unknown. Bites.']],done)}},
  {t:'“Turn the tap off, Misaki. I will wait.”',fn:()=>{apply({aff:2});relApply({trust:2});say([['','A long pause. Then the water stops, and the line gets very quiet.'],['hitmeuppp',MV('ok. off.','ok. it’s off. my hands hurt.','It’s off. My hands hurt. I wasn’t going to stop on my own.','It’s off. My hands hurt like a bitch. I’d have stood there another hour, so, fine, good job bossing me around. Don’t get used to it.')]],done)}}])),
 miss:()=>{phQueue('m',['nvm. sorry. butt dial','(it wasn’t a butt dial)'],0);relApply({tension:1})}});
/* ---------- 7. THINGS IN THE ROOMS ---------- */
(function(){const bd=TD.maps.trailer.props.find(p=>p.id==='tr_bed');if(!bd)return;
 TD.maps.trailer.props.push({id:'tr_box',x:bd.x+bd.w+2,y:bd.y+bd.d-10,w:12,d:8,h:5,solid:false,label:()=>'Shoebox',draw:(x,y)=>{tdBox(x,y,12,8,5,'#7a5a3a','#5a4028');rect(x+1,y-5,10,1,'#a07a52')},
  act:who=>{if(who==='v')return tdSay([['','A shoebox, half under her bed, taped at the corners. Her handwriting on the lid: “MINE”.'],['K9','(It says whose it is. That is all I need to know about it.)']]);
   const n=S.f.boxN||0;const L=['1. my hands','2. the knife w the star charm','3. this box','4. whatever i ate today','5. prickles (cactus)'];if(tier()>=1)L.push('6. a key i didn’t ask for');if(S.f.luckyTold||S.f.fiveDone)L.push('7. the extra years');
   ask('hitmeuppp','Inside the shoebox is a list on the back of a bus timetable, started at sixteen: “THINGS THAT ARE MINE.” '+L.join(' · '),[
    {t:n?'Read it again.':'Read it through.',fn:()=>{S.f.boxN=n+1;save();tdSay([['hitmeuppp',MV('(short list. still mine tho.)','(started w 3 things. the first one was “my hands”. i underlined it.)','(It started with three things. I underlined “my hands” so hard the pen went through.)','(I listed three things at sixteen. I wrote “my hands” first, before the box I was writing it in.)')]])}},
    ...(!S.f.boxAdd&&tier()>=2?[{t:'Add a line.',fn:()=>{S.f.boxAdd=1;apply({heart:2});tdSay([['','You find a pen that works on the third try and write at the bottom: “'+(L.length+1)+'. a seat at a table”.'],['hitmeuppp','(...ok. don’t make it weird, list.)']])}}]:[]),
    {t:'Put the lid back on.',fn:()=>{}}])}});
 const b2=TD.maps.ewing.props.find(p=>p.id==='bd_bed');if(b2)TD.maps.ewing.props.push({id:'bd_wedge',x:b2.x+b2.w+6,y:b2.y+b2.d-8,w:10,d:6,h:2,solid:false,flat:1,label:()=>'Door wedge',draw:(x,y)=>{rect(x,y+2,10,3,'#3a3a3a');rect(x,y+1,6,1,'#4a4a4a')},
  act:who=>{if(who==='v')return tdSay([['','A rubber door wedge. There is one in every room of the house. You bought forty.'],['K9','(A door that is wedged cannot be locked from the outside.)']]);
   tdSay([['','A rubber door wedge, the cheap grey kind. Now that you’ve noticed this one, you realise every room in the house has one.'],['hitmeuppp','(he really hates a closed door huh.)']])}});
 for(const id of ['ewing','trailer']){const M=TD.maps[id];M.props.forEach((p,n)=>{p.id=p.id||id+'#n'+n;p.map=M;if(p.solid===undefined)p.solid=!p.flat&&!p.wall&&!p.exit;p.w=p.w||TS;p.d=p.d===undefined?TS:p.d})}})();
/* ---------- 8. MORE CHAT ---------- */
PINGS.push(
 ['mi','does anyone else have a number. like a number of times u do a thing after. asking for science'],
 ['ro','pies. record’s nine. first one t’ask about the seventh gets the crowbar'],
 ['an','mine’s takes. i refilm everything 6 times. including, once, a guy. (i mean i filmed him 6 times. he only happened once)'],
 ['k9','Four. It is the number of hounds. I count them before bed. There have always been four when I counted.'],
 ['an','group poll: is it self care if there’s a body in the next room. be honest'],
 ['ro','found a lighter in a coat I ain’t worn since I left home. works first strike. fuckin’ course it does'],
 ['mi','corner shop guy asked if i was ok bc i bought 4 lemon soaps. i said “gifts”. he said “for who”. i left'],
 ['k9','The shelter’s new volunteer asked what I do “outside of this.” I said that I read, and that I do not waste meat. Both are true.'],
 ['an','maria hit 400k. the heartsick angel hit 14. only one of those got a cake'],
 ['mi','sat in a guy’s apartment for 2 hrs waiting and his cat sat on me the whole time. felt bad after. for the cat. i left the window open and a tin of tuna'],
 ['ro','eat somethin’ after, dipshits. the shakes are blood sugar. nobody in here’s got guilt, I checked'],
 ['k9','Addendum to Ronin’s message: the kitchen at the foundation is unlocked. There is soup. No one will ask.']);
DRIFT.a.push('do u think the ceiling is lonely. asking for me','filmed a get-ready-with-me in the same mirror i cleaned a knife in. 80k likes. nobody ever checks the reflection','my mom commented “beautiful!!” on maria’s post. first thing she’s said to me in 3 yrs. she doesn’t know it’s me');
DRIFT.r.push('pie five’s out. it’s yours. come get it warm or I’m feedin’ it to the raccoon','drove past a church and didn’t slow down. personal best','you eat today, or d’you need me t’come over there and be an asshole about it');
DRIFT.v.push('The hounds are fed. I am telling you so that someone else knows.','I have wedged your trailer door open with a shoe while I unload the groceries. Do not be alarmed by the shoe.','There are now seven bentos. I miscounted in your favour.');
DRIFT.m.push('washed my hands 3 times today. just 3. putting it on the fridge','what’s it called when ur happy and it makes u want to check the exits','calendar app asked if i want to “plan ahead.” i said yes. who the fuck am i');
const _chatW=chatLog;chatLog=function(){const L=_chatW();if(!S||S.phase==='taken')return L;const k=(S.day*5+S.slot)%7;
 if(k===1)L.push(['ro','four killers in a group chat and every one of us has a fuckin’ bedtime routine. embarrassing']);
 if(k===3)L.push(['an','whoever said “the body keeps the score” mine keeps the lighting setup']);
 if(k===5)L.push(['k9','Good night. The hounds are fed. (I will continue to announce it. You may mute me.)']);
 return L};
/* ---------- 9. WHERE IT ENDS UP ---------- */
const _xeW=extraEnding;extraEnding=function(){const L=_xeW();if(!S||!S.f)return L;const f=S.f;
 if(f.fiveDone==='told'||f.fiveV==='entry')L.push('There is a dentist appointment in Misaki’s calendar every March now. She has never been. She has never deleted one.');
 else if(f.fiveDone==='angel')L.push('Angel keeps a flattened cake box in her closet that says HAPPY NOT DEAD DAY. She adds a tally mark to the lid every year.');
 else if(f.fiveDone==='bench')L.push('Once a year Misaki eats a salmon bento on a repainted station bench with her hood up. Then she flips off the departures board and goes home.');
 if(f.fedSaid>=1||f.mBowls==='scoop')L.push('At 4am, when V stands in the kitchen, somebody says “they’re fed.” Usually it is Misaki, from the bedroom, with her face in the pillow. The grey hound eats again regardless.');
 if(f.doorAsk==='asked'||f.doorAsk==='opened')L.push('Every door in the house stays open a hand’s width. Misaki measures it with her hand, and once, to be funny, with a chainsaw bar.');
 if(f.handsTold||f.ronHands)L.push('She does three washes most days. On the days it’s nine, there’s hand cream by the sink that smells like an old man, and nobody counts out loud.');
 if(f.angelCeil==='ceiling'||f.angelCeil==='down')L.push('Angel says she comes down off the ceiling more often now, mostly at brunch when Ronin is being loud.');
 if(f.boxAdd)L.push('The list in the shoebox has more lines than it has room for. She has started writing on the lid.');
 return L};
