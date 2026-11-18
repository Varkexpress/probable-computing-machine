/* ===================== SMALL HOURS (kc72) =====================
   The peach night (kc71) for the other four romance routes. A night after a job (Misaki) or a hunt or a board meeting
   (V), once per game per route: something odd in the small hours with the partner, a short choice, someone asleep, and a
   wake-up in one of five places by how far the route has gone, warmest at the top, each with a note or an object.
     mr  Misaki × Ronin  his workshop: toasties in the bench vice, the spare tyre cut up for her boot soles
     ma  Misaki × Angel  Maria's sponsored eight-hour "sleep with me" stream; Angel cannot sleep on camera
     vr  V × Ronin       the truck in V's garage: Ronin on hold to the four a.m. gospel request line
     va  V × Angel       the kennel at four: Angel paints the hounds' claws under her ring light
   Flags (S.f): k72mr|k72ma|k72vr|k72va (played), k72<r>How (choice), k72<r>W (wake level 1-5), k72Day.
   Misaki's routes play from afterBed (outside kc71's wrapper, so the two never share a night); V's play from sleepJ.
   Nothing plays on a night nightWake has already used. See docs/notes_kc72.md. */
function k72R(){if(!S)return null;if(S.pov!=='v'&&S.rom)return 'm'+S.rom;if(S.pov==='v'&&S.vrom)return 'v'+S.vrom;return null}
function k72Day(r){return r[0]==='m'?!!(S.done&&S.done.job):!!((S.done&&S.done.meet)||S.f.lastVHunt===S.day||S.f.lastHunt===S.day)}
function k72Ok(){try{const r=k72R();if(!r||!['mr','ma','vr','va'].includes(r)||S.f['k72'+r])return null;
 if(!['normal','act2','act3','epilogue'].includes(S.phase)||S.dark||isLone()||(S.f&&S.f.abroad)||(S.phase==='normal'&&S.f.kidnapSet)||(S.kd&&S.kd.med))return null;
 if(S.done&&S.done.k72nw)return null;if(((r[0]==='m'?S.romDates:S.vromDates)||0)<1)return null;return k72Day(r)?r:null}catch(e){return null}}
/* how close: dates (to 3) + friendship tier + route beats done (kc65, and kc67 for V × Ronin; to 3) + a bond
   (engaged or married for Misaki, the key to the house for V). Level 5 also needs the bond; married Misaki is always 5. */
function k72Bond(r){return r[0]==='m'?!!(S.f.romMarried||(typeof qst==='function'&&qst('romwed')>=0)):!!S.f.vromKey}
function k72Score(r){const d=Math.min(3,(r[0]==='m'?S.romDates:S.vromDates)||0);
 const b=Object.keys(S.f.k65d||{}).filter(id=>id.indexOf(r+'_')===0).length+(r==='vr'?Object.keys(S.f.k67d||{}).length:0);
 return d+frT(r[1])+Math.min(3,b)+(k72Bond(r)?1:0)}
function k72Lvl(r){if(r[0]==='m'&&S.f.romMarried)return 5;const s=k72Score(r);
 if(k72Bond(r)&&(s>=9||(S.phase==='epilogue'&&s>=8)))return 5;return s>=7?4:s>=5?3:s>=3?2:1}
const K72M=(...a)=>['hitmeuppp',MV(...a)];
function k72Play(r,cb){S.f['k72'+r]=1;S.f.k72Day=S.day;save();({mr:k72Mr,ma:k72Ma,vr:k72Vr,va:k72Va})[r](cb)}
function k72How(r,h){S.f['k72'+r+'How']=h;save()}

/* ===================================== MISAKI × RONIN ===================================== */
function k72Mr(cb){const h=S.bed==='ronin';
 say([['',h?'Twenty past three. Ronin’s couch, under the blanket that smells of smoke. The phone buzzes on their chest.':'Twenty past three. The phone buzzes on their chest, and they have it unlocked before they are properly awake.'],
  [RN,'(text) you up. workshop. bring the boots that slip'],
  [RN,'(text) and don’t cha make that face, I can hear it from here'],
  K72M('(u cant hear a face)','(he can’t hear a face. he’s right though)','(He can’t hear a face. I’m making the face.)','(You can’t hear a face, you idiot. I am making it. I’m also already putting my coat on.)'),
  ['',h?'They go down the back stairs in their socks with the boots in one hand.':'They drive across town with the boots on the passenger seat and go in through the yard, past his truck.'],
  ['','The workshop is lit by one bulb and a blowtorch. Ronin is at the bench in a vest and his rings. The spare tyre off his truck is on the floor, and half of it has already been cut into strips.'],
  ['','In the bench vice, wrapped in foil, is a sandwich. He runs the blowtorch along the foil slowly, like he is stripping paint, and the whole workshop smells of burnt cheese.'],
  [RN,'Toasties. Vice is the press, torch is the grill. Patent pendin’. Siddown, little killer.'],
  K72M('is that ur tyre','is that your TYRE','Is that the spare off your truck?','Is that the spare tyre off your truck? On the floor? In strips?'),
  [RN,'Spare’s for emergencies. You slid three feet on a wet roof Tuesday, Angel told me. That’s an emergency. Truck tread grips like a fuckin’ tick. Gimme the boots.']],
 ()=>ask('hitmeuppp',MV('(toastie)','(he’s holding out a toastie. with pliers.)','(He’s holding the first toastie out with the pliers. It’s still smoking.)','(He’s holding the first one out to me with the pliers, still smoking, very proud of himself.)'),[
  {t:'Eat it off the pliers.',fn:()=>{k72How('mr','pliers');say([['','They bite it straight off the pliers. It is the best thing they have eaten all week and it takes the skin off the roof of their mouth.'],
    [RN,'Burned your mouth and you’re still chewin’. Fuckin’ beautiful. Hold still, there’s cheese on your chin.']],()=>k72MrSleep(cb))}},
  {t:'Make him blow on it first.',fn:()=>{k72How('mr','blow');say([[RN,'Blow on it? Fuck’s sake. You kill people for a livin’.'],
    ['','He blows on it anyway, three big careful puffs, and checks it on the back of his wrist like a baby’s bottle before he hands it over.']],()=>k72MrSleep(cb))}},
  {t:'Take the torch. Do the next one yourself.',fn:()=>{k72How('mr','torch');say([['','They take the torch. Their toastie comes out of the vice black on one side and cold on the other, and they eat it with total confidence.'],
    [RN,'That’s a war crime. Gimme the torch back before you weld my vice shut.']],()=>k72MrSleep(cb))}}]))}
function k72MrSleep(cb){
 say([['','He does the boots after. He cuts the tread to the shape of their soles with a box cutter, by eye, glues it on and clamps each boot in the vice where the toasties were. The radio on the shelf is playing gospel, low, because it is the only station that comes in down here.'],
  [RN,'Herringbone, see. Water goes out the sides. Same tread as the truck, so you’ll grip like the truck, and the truck don’t fall off roofs.'],
  K72M('(warm in here)','(it’s so warm in here. why is it so warm)','(It’s warm in here, with the torch and the heater going. I’m shutting my eyes for a minute.)','(It’s warm and he’s explaining water to me and I’m going to close my eyes for one minute. One.)'),
  ['','There is an old bench seat out of a car against the wall with a horse blanket on it. They lie down on it to listen better. He is still explaining herringbone when they go.'],
  [RN,'…and that’s why you never buy the cheap ones. You hear me? Misaki. Aw, fuck me, out like a light. Sucks t’be you, I ain’t finished.']],
  ()=>k72Wake('mr',cb))}
const K72W_MR=lv=>({id:'mr_wake',
 1:[['','They wake at ten on the bench seat with the horse blanket over them and his jacket over that. It smells of smoke and burnt cheese. The bulb is off. Their boots are on their feet, laced in double knots, and the soles are black truck tread.'],
  ['','On their chest, on an offcut of tyre, in silver pen: “Glue’s set. Don’t cha go up anythin’ wet till noon. You snore like an outboard motor, and I let you, ’cause I’m a saint. — R.”']],
 2:[['','They wake at ten across the bench seat of his truck out in the yard, under his jacket. The windows have fogged from their breathing. The back of the truck has a gap where the spare tyre used to be.'],
  ['','Their boots are on the dashboard with the new soles turned up where they can see them. In the fog on the windscreen, written with one big finger: “BACK IN 10. DONT TOUCH THE RADIO. — R”. The radio is still on the gospel station, low.']],
 3:[['','They wake at ten on his couch upstairs, under the blanket that smells of smoke. Heathers is paused on the croquet lawn. Somebody has put the Gameboy on their chest, switched off, with his high score on a sticker on the back so they know what to beat.'],
  ['','Their boots are by the couch with the new soles up. A takeaway menu is tucked into the left one, with silver pen on the back: “Glue’s set. Carried you up. You talked in your sleep about integrals, nerd. — R.”']],
 4:[['','They wake at ten in his bed, which is a mattress on the floor, with the sheet tucked in round them as if he thought they might roll off it. The church bells across the road are going. Their boots stand at the end of the mattress with the new soles showing.'],
  ['','Ronin is asleep in the doorway, sitting up against the frame with the crowbar across his knees. There is a sticky note on the crowbar: “Took the door. Glue’s set. Don’t cha step on me. — R.”']],
 5:[['',sugOn()?'They wake at ten on his mattress under the heavy blanket, in yesterday’s clothes, too warm to want to move. Ronin is asleep on his back with one arm flung over them and his mouth open. His rings are off and lined up on the windowsill.':'They wake at ten on top of his mattress, both of them still dressed and still in their socks, under his jacket and the heavy blanket. Ronin is asleep on his back with one arm flung over them and his mouth open. His rings are off and lined up on the windowsill.'],
  ['','The church bells go across the road and he does not wake. At the end of the mattress their boots stand with the soles turned out, and he has burned a word into each heel with the tip of the torch. Both of them say KISS.'],
  ['','There is a note in silver pen on the back of their hand, where they will see it first: “Didn’t make it to the couch. Your fault. — R.”']]})[lv];
const K72T_MR=lv=>lv===5?K72M('(stay)','(don’t move. he’s asleep)','(Don’t move. He’s actually asleep. He sleeps like he’s been shot.)',S.f.romMarried?'(My husband sleeps like he’s been shot, mouth open, one arm on me like a fallen fence. I’m not moving till the bells stop.)':'(He sleeps like he’s been shot, mouth open, one arm on me like a fallen fence. I am not moving till the bells stop.)')
 :lv===1?K72M('(ow)','(ow. ok. car seat)','(Ow. I slept on a car seat.)','(Ow. I slept on a car seat in a workshop that smells of cheese, and my feet have never been happier.)')
 :K72M('(boots)','(he did the boots)','(He did both boots while I was asleep.)','(He did both boots while I was asleep and wrote me a note like a fucking schoolgirl. I’m going to stamp around in these all day.)');

/* ===================================== MISAKI × ANGEL ===================================== */
function k72Ma(cb){const h=S.bed==='angel';
 say([['',h?'Ten to four. Angel’s spare room. The light under the door is white and flat and much too bright for a lamp.':'Ten to four. Her phone lights up on the pillow: Maria de la Rosa is live. “sleep with me 🌙 8 hrs, no cuts”.'],
  ['',h?'She opens the studio door a crack. Angel is in bed under the ring light with a camera on a tripod at the foot of it.':'She opens the stream. Maria is in bed under the ring light with a camera on a tripod at the foot of it.'],
  ['','Her eyes are shut. She is in full lashes and a silk bonnet and looks exactly like a woman asleep in an advert for sheets. Forty-one thousand people are watching her.'],
  [AN,'(on mic, in Maria’s softest voice, eyes shut) mmm. night night, my loves. so sleepy. this tea is doing wonders.'],
  ['','Then, without opening her eyes, she moves her lips at the camera. The chat thinks she is dreaming. Misaki can read it fine: “help.”'],
  ['',h?'Misaki crawls in on their elbows, under the line of the camera, and lies on the floor by the bed out of shot.':'Misaki is there in twenty minutes. They let themself in the back way, crawl into the studio on their elbows under the line of the camera, and lie on the floor by the bed out of shot.'],
  [AN,'(a whisper, lips not moving) don’t come in frame. the tea people paid for eight hours of maria sleeping. eight. i have never slept on camera in my life.'],
  [AN,'(whisper) i’ve been lying here two hours doing a face. chat says i look peaceful. i want to kill every one of them.'],
  K72M('why 8 hrs','why did u say yes to eight hours','Why did you agree to eight hours?','Babe. Why would you sign up for eight hours of sleeping on camera when you can’t sleep with the light off, let alone on?'),
  [AN,'(whisper) they sent a tea. it tastes of hay. it’s a lot of money for hay.']],
 ()=>ask('hitmeuppp',MV('(she needs 2 sleep)','(she needs to actually sleep)','(She needs to actually fall asleep. How do I do that from the floor.)','(She needs to actually fall asleep, or she’ll go and do something to the tea people. How do I fix this from the floor.)'),[
  {t:'Hold her hand under the edge of the duvet, out of frame.',fn:()=>{k72How('ma','hand');say([['','She reaches up under the edge of the duvet, below where the camera can see, and finds Angel’s hand. Angel’s nails dig in once, hard, then let go and hold on properly.'],
    [AN,'(whisper) don’t let go. if you let go i’m getting the shotgun.']],()=>k72MaSleep(cb))}},
  {t:'Read her the worst comments, in a whisper.',fn:()=>{k72How('ma','chat');say([['','She reads the chat off her own phone in the smallest voice she has. “is she breathing.” “what tea is that.” “her pores omg.” “wake up maria i’m lonely.”'],
    [AN,'(whisper) i’m writing down usernames. in my head. keep going, it’s working.']],()=>k72MaSleep(cb))}},
  {t:'Talk her through an integral.',fn:()=>{k72How('ma','maths');say([K72M('ok so. area under a curve','ok so. you want the area under a curve','Okay. You want the area under a curve, and the curve is wiggly, so you cut it into strips.','Okay. Listen. You want the area under a curve, but it’s wiggly, so you cut it into strips, thinner and thinner, until you could fit infinity of them under one fingernail. Then you add them up.'),
    [AN,'(whisper) i hate this so much. keep going. what’s a strip.']],()=>k72MaSleep(cb))}}]))}
function k72MaSleep(cb){
 say([['','At twenty to five Angel’s sleeping face goes slack in a way she could never do on purpose. Her mouth falls open. She snores once, small, like a cat.'],
  ['','The chat loses its mind. Misaki watches the numbers climb with the phone on their chest and the ring light making a white square on the ceiling, and some time after five they stop watching.']],
  ()=>k72Wake('ma',cb))}
const K72W_MA=lv=>({id:'ma_wake',
 1:[['','She wakes at nine on the studio floor among the cables, out of frame, with a sheet mask on her face that she did not put there. The ring light is off and so is the camera. Angel has put a cushion under her head and the faux-fur throw over her.'],
  ['','The tea people’s sponsor card is stuck to her chest, with lipstick on the back: “maria slept 5 hrs on camera. 2.3 million views. they want to know who was snoring at 6. i said the ring light. don’t take the mask off yet, it’s working ♡ a”']],
 2:[['','She wakes at nine in Angel’s spare room under three blankets, with her boots off and paired by the door. Somebody has taken the phone off her chest and put it on charge.'],
  ['','There is a sticky note on the phone screen in eyeliner: “u fell asleep on my floor like a dropped puppet. i walked u here and u kept saying ‘strips’. the hay tea people renewed ♡”']],
 3:[['','She wakes at nine on Angel’s pink velvet sofa under the faux-fur throw, wearing Angel’s silk bonnet. It is too small and has slid over one eye.'],
  ['','Her phone has a voice memo on it, recorded at six. It is Maria, very sweetly: “good morning, beautiful. you snored at my sponsors. there are pancakes in the oven, and one of them is shaped like an integral. i looked it up.”']],
 4:[['','She wakes at nine in Angel’s bed, under the duvet from the stream, with the ring light turned to face the wall. Angel’s side is made very neatly. She has gone to a nine o’clock shoot.'],
  ['','On the pillow, on the back of the tea contract, in eyeliner: “you slept in maria’s bed. two million people would kill you for that. i’d kill them first. back by two. stay put ♡ a”']],
 5:[['',sugOn()?'They wake at nine in Angel’s bed with the curtains shut and the ring light off, warm all the way through. Angel is asleep beside them for real, on her front, mouth open, in yesterday’s lashes, still holding Misaki’s hand under the duvet.':'They wake at nine on top of Angel’s duvet, both of them still in yesterday’s clothes, under the faux-fur throw, with the curtains shut and the ring light off. Angel is asleep beside them for real, on her front, mouth open, still holding Misaki’s hand.'],
  ['','One of Angel’s lashes has come off in the night and is stuck to Misaki’s cheek. On the nightstand, their phone has a text from Angel, sent at 6:58 with her eyes visibly shut: “stream’s over. i slept. dont move. dont u DARE move.”']]})[lv];
const K72T_MA=lv=>lv===5?K72M('(ok)','(not moving. ok)','(Not moving. She’s asleep. She’s actually asleep.)',S.f.romMarried?'(My wife is asleep with her mouth open and her lash is on my face. I’m putting the lash in my wallet. Don’t ask.)':'(She’s asleep with her mouth open and her lash is on my face. I’m putting the lash in my wallet. Don’t ask.)')
 :lv===1?K72M('(ow)','(ow. floor)','(Ow. I slept on her floor in a sheet mask.)','(Ow. I slept on a studio floor in a sheet mask, and two million people heard me snore. Fine. Iconic.)')
 :K72M('(she slept)','(she slept tho)','(She slept, though. She actually slept.)','(She slept, on camera, for five hours, with me on the floor holding the edge of the duvet. Fuck the tea people.)');

/* ===================================== V × RONIN ===================================== */
function k72Vr(cb){
 say([['',S.f.vromKey?'Four o’clock. You are awake, as you always are at four. Ronin’s side of the bed is cold.':'Four o’clock. You are awake, as you always are at four. Ronin came over after dinner and never left, and he is not on the couch.'],
  ['','There is a light on in the garage. His truck is parked in there nose to the wall, where he leaves it, and the cab light is on.'],
  ['','He is in the driver’s seat in his vest and a pair of your socks, with the radio running off the battery, a phone to his ear and a family-size bag of crisps open on the dashboard. The radio is playing gospel. He waves you round to the passenger side without looking.'],
  [RN,'Shh. I’m on hold. Forty minutes, Vee. Get in.'],
  ['K9','Who are you on hold for, at four in the morning?'],
  [RN,'Request line. Four a.m. gospel hour. I call in every night, different name every night, so’s she don’t catch on. Monday I was a widow from across town. Last night I was a trucker with a bad knee. I got her cryin’ Thursday.'],
  ['K9','Who are you tonight?'],
  [RN,'Dunno yet. Depends on my mood. Crisps?'],
  ['','The cab is warm; he has the heater going off the battery too. The truck will not start in the morning and you both know it, and you both stay where you are.'],
  ['','The line clicks. Ronin sits up straight, says “Yes, hello, long-time listener” an octave higher than his own voice, and then claps the phone to his chest.'],
  [RN,'She wants a name and a dedication. Your call, Mister Foundation.']],
 ()=>ask('K9','(He holds the phone out to you. A woman is saying “hello?” into your hand.)',[
  {t:'Request one yourself, under your own name.',fn:()=>{k72How('vr','own');say([['K9','(into the phone) Good morning. My name is V. I would like to request a hymn for the man next to me, who is eating crisps in my socks.'],
    [RN,'(a whisper) Oh, you absolute bastard.'],
    ['','The host laughs and says she will play it after the news. Ronin puts his forehead on the steering wheel, and the horn plays the first line of a hymn, very loud, in your garage.']],()=>k72VrSleep(cb))}},
  {t:'Let him do the voice.',fn:()=>{k72How('vr','voice');say([[RN,'(into the phone, an octave up) This is the widow from across town again. I’d like to dedicate the next one to a tall fella with very cold feet who does a lot for charity.'],
    ['','The host says she will play it after the news. Ronin hangs up and eats a crisp with tremendous dignity.']],()=>k72VrSleep(cb))}},
  {t:'“Dedicate it to the hounds.”',fn:()=>{k72How('vr','hounds');say([['K9','(into the phone) I would like to dedicate a hymn to my hounds. They are good animals, and they are asleep.'],
    ['','There is a pause on the line. Then the host says that is the nicest thing anybody has said to her this week, and she will play it after the news.'],
    [RN,'Fuckin’ hell, Vee. She’s cryin’ again.']],()=>k72VrSleep(cb))}}]))}
function k72VrSleep(cb){
 say([['','The news is long. Ronin turns the heater up and tells you about every caller he has been, in order, in their voices. The trucker’s knee comes up more than once.'],
  ['','You rest your head against the cold window to listen better. The last thing you hear is the host saying “and this one goes out to,” and Ronin laughing like a lion in feast.'],
  [RN,'Vee. Vee, it’s our one. Aw, you’re shittin’ me. Man sleeps four hours a week and he picks now.']],
  ()=>k72Wake('vr',cb))}
const K72W_VR=lv=>({id:'vr_wake',
 1:[['','You wake at nine in the passenger seat of the truck, still in the garage, with the seatbelt done up across you and his jacket tucked in round your shoulders. The battery is flat and the radio is dead. The crisp bag has been folded into a very small triangle.'],
  ['','The old hound is asleep across the bonnet. Under the wiper, on the back of one of his parking tickets, in pencil: “They played it. You missed it. Belt’s for safety. You owe me a jump start and a hymn. — R.”']],
 2:[['','You wake at nine on the atrium couch under the hound blanket, with the grey hound across your feet and your shoes off. Somebody has carried you up from the garage. That has not happened since you were nine years old.'],
  ['','In your shirt pocket, folded small, is one of his parking tickets. On the back, in pencil: “They played it. You snored through it, start to finish. Battery’s flat, so the truck’s stuck here and I’m stuck with it. — R.”']],
 3:[['','You wake at nine on the bench under the tree in the library, with his jacket over you and your reading glasses folded on your chest. There is an atrium cushion under your head. The hounds followed him down and are asleep at the bottom of the light well.'],
  ['','On the bench by your hand is one of his parking tickets, pencil on the back: “Got lost findin’ your room. This place is a fuckin’ maze. They played it. I taped it off the radio, it’s on my phone. — R.”']],
 4:[['','You wake at nine in your own bed with your shoes and tie off and the covers up to your chin. His side is empty and the pillow is cold. Downstairs, somebody is trying to jump-start a truck off your car and swearing at both of them.'],
  ['','On his pillow is one of his parking tickets with pencil on the back: “Carried you up. You weigh a fuckin’ ton for a skinny fella. They played it. I’ll sing you the bit you missed. — R.”']],
 5:[['',sugOn()?'You wake at nine in your own bed, warm all the way down, with Ronin asleep across half of you like a fallen wardrobe, still in his vest. You slept five hours straight through, which you do not do. He is snoring into your collarbone.':'You wake at nine on top of your own covers, both of you still dressed, under his jacket, with Ronin asleep across half of you like a fallen wardrobe. You slept five hours straight through, which you do not do. He is snoring into your shoulder.'],
  ['','His phone is on the nightstand, propped against your glasses, with a recording open: four minutes and thirty seconds, saved at 4:52. His crowbar is on its hook. The hounds are on the end of the bed, all of them, and nobody has told them to get down.']]})[lv];
const K72T_VR=lv=>lv===5?['','You do not move. You play the recording twice, very low, with his head on your chest.']
 :lv===1?['K9','(The truck will need a jump. I will need a chiropractor.)']
 :['K9','(He taped it. Naturally he taped it.)'];

/* ===================================== V × ANGEL ===================================== */
function k72Va(cb){
 say([['','Four o’clock. You are awake, as you always are at four. Under the kennel door there is a line of light, much too white and much too bright.'],
  ['','Angel has set up her ring light in the kennel. She is sitting cross-legged in the straw in a satin robe and a sheet mask, with the grey hound on its back across her knees and one foot in the air, painting its claws pink.'],
  ['','The grey hound has eaten parts of eleven people. Her front feet are done, and she is letting Angel blow on them.'],
  [AN,'(to her phone, propped on a feed bowl, in Maria’s voice) and for the second coat we go nice and thin, because nobody likes a gloopy nail, do they, sweetheart. no they don’t.'],
  ['K9','Angel. It is four in the morning, and that is my hound.'],
  [AN,'and they looked tired. look at their little feet. this one’s called saint ottilie pink. i bought it for the name. don’t tell anyone it’s a saint thing.'],
  [AN,'nobody sees this, before you ask. it’s for my folder. i have a folder.'],
  ['','The black hound is waiting beside her with a foot already held out. The old hound is pretending to be asleep in the corner, so that he will not be next.']],
 ()=>ask('K9','(She holds the little brush out to you without looking up.)',[
  {t:'Hold the paw.',fn:()=>{k72How('va','paw');say([['','You sit down in the straw and hold the black hound’s foot still between finger and thumb, very steady. She does each claw in four long strokes.'],
    [AN,'your hands are so good at this. it’s upsetting. do my hands sometime.']],()=>k72VaSleep(cb))}},
  {t:'Choose the colour for the black hound.',fn:()=>{k72How('va','colour');say([['','You look through her bag of bottles for some time. You choose a red so dark it is nearly black.'],
    [AN,'oh, he’s going to look like he’s been at somebody. perfect. you have taste, it’s horrible.']],()=>k72VaSleep(cb))}},
  {t:'“Do mine.”',fn:()=>{k72How('va','mine');say([['K9','Do mine.'],
    ['','She looks up. The sheet mask makes her face hard to read, because it is a panda.'],
    [AN,'V. yes. oh my god. give. hand flat. don’t move. all ten, and you’re wearing them to the board meeting.']],()=>k72VaSleep(cb))}}]))}
function k72VaSleep(cb){
 say([['','It takes a long time. The ring light hums. The hounds lie in a row along the wall with their feet out to dry, and Angel narrates each one to her folder in Maria’s voice, very softly.'],
  ['','You lean your head back against the kennel wall to rest your eyes. She is saying “and that’s a lovely finish” about something, and you do not hear what.'],
  [AN,'(Maria’s voice, very soft) and he’s asleep, everyone. the scariest man in the city. shh. look at his little hands.']],
  ()=>k72Wake('va',cb))}
const K72W_VA=lv=>({id:'va_wake',
 1:[['','You wake at nine in the kennel straw with the old hound along your back and her satin robe spread over you. The ring light is off. Your left hand is lying on a towel with the nails painted saint ottilie pink. Your right hand has not been touched.'],
  ['','There is a makeup wipe tucked under your collar with eyeliner on it: “ran out of polish on hand 2. you sleep like a coffin lid, didn’t move once. kinda hot. kinda scary ♡ a”']],
 2:[['','You wake at nine on the atrium couch under her faux-fur coat. Her ring light stands next to you, turned up at the ceiling like a lamp, on its lowest setting. There is a panda sheet mask on your face.'],
  ['','A sticky note on the mask packet on your chest: “woke u up enough to walk. u walked like a haunted coat rack. leave the mask 20 mins, the dogs are dry ♡”']],
 3:[['','You wake at nine on the long sofa in your study, with your shoes off and her fur coat over you. Your reading glasses have been cleaned. All ten of your nails are pink.'],
  ['','Your phone has a text from her, sent at 7:10: “they’re dry now. don’t pick. pink is ur colour, i’m putting it in writing so it’s legal”']],
 4:[['','You wake at nine in your own bed, shoes off, covers up. Her side is warm and empty. On your pillow, lined up neatly, is a pair of false eyelashes.'],
  ['','There is lipstick on the bathroom mirror: “maria had a 7am. took my lashes off on ur pillow, sorry about the pillow. don’t pick the nails ♡ a”']],
 5:[['',sugOn()?'You wake at seven in your own bed, warm all the way down, when her phone says “good morning, beautiful” in Maria’s voice. Angel is asleep against you with her face completely bare, wearing your shirt from yesterday.':'You wake at seven on top of your own covers, both still dressed, under her fur coat, when her phone says “good morning, beautiful” in Maria’s voice. Angel is asleep against you with her face completely bare.'],
  ['','She turns the alarm off without opening her eyes, says “not you,” into your shoulder, and goes back to sleep. Your hands are on the quilt. All ten nails are saint ottilie pink, and she has done a tiny white heart on the left thumb.']]})[lv];
const K72T_VA=lv=>lv===5?['','You do not move. You have a board meeting at ten, and you are going to it in these.']
 :lv===1?['K9','(One hand. I will be chairing the board with one pink hand.)']
 :['K9','(Pink. I appear to be pink.)'];

/* ===================================== WAKING ===================================== */
const K72W={mr:K72W_MR,ma:K72W_MA,vr:K72W_VR,va:K72W_VA},K72T={mr:K72T_MR,ma:K72T_MA,vr:K72T_VR,va:K72T_VA};
function k72Wake(r,cb){const lv=k72Lvl(r);S.f['k72'+r+'W']=lv;save();
 const L=K72W[r](lv).slice();L.push(K72T[r](lv));
 say(L,()=>{fr(r[1],2+lv);apply({energy:lv===5?-5:-12});cb()})}

/* ===================================== DELIVERY ===================================== */
const _nw72=nightWake;nightWake=function(){try{if(S&&S.done)S.done.k72nw=1}catch(e){}return _nw72.apply(this,arguments)};
const _afterBed72=afterBed;afterBed=function(){const a=arguments,self=this;const r=k72Ok();
 if((r==='mr'||r==='ma')&&(globalThis.K72_FORCE||Math.random()<.4)){const nx=typeof _afterBed71==='function'?_afterBed71:_afterBed72;return k72Play(r,()=>nx.apply(self,a))}
 return _afterBed72.apply(self,a)};
const _sleepJ72=sleepJ;sleepJ=function(){const a=arguments,self=this;if(S&&S.pov==='v'){const r=k72Ok();
 if((r==='vr'||r==='va')&&(globalThis.K72_FORCE||Math.random()<.4))return k72Play(r,()=>_sleepJ72.apply(self,a))}
 return _sleepJ72.apply(self,a)};
const K72END={mr:'Misaki’s boots have truck tread on the soles now. Ronin checks it with a coin once a month, and when it wears down he cuts up another tyre.',
 ma:'Once a month Maria de la Rosa does a “sleep with me” stream and sleeps through all of it. Under the edge of the duvet, out of frame, somebody is holding her hand.',
 vr:'Every so often the four a.m. gospel hour takes a request from a man called V, for the man next to him in his socks. The host has stopped asking questions.',
 va:'Once a month the hounds have their claws done under a ring light in the kennel. V holds the paws. The board has noticed his nails and said nothing.'};
if(typeof extraEnding==='function'){const _xe72=extraEnding;extraEnding=function(){const L=_xe72();try{const r=S&&S.f?(S.rom&&!S.vrom?'m'+S.rom:S.vrom?'v'+S.vrom:null):null;if(r&&K72END[r]&&S.f['k72'+r])L.push(K72END[r])}catch(e){}return L}}
