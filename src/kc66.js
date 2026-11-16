/* ===================== V AND MISAKI, LONGER (kc66) =====================
   The main route given the kc65 treatment: no S.rom, no S.vrom, no k28pair; affection through S.aff / tier().
   A beat per phase, offered from the side menu (♥, one at a time), a morning-after event, a phone thread per POV and
   ending lines. Three registers, read at play time by k66Mode():
     'wed'  S.f.married                                       romantic, the rings
     'set'  not married, and they chose to stay a set (S.f.k66Set), or kc58 ended 'apart', or tier < 2
            → warm and platonic; no romance after kc58's 'apart'
     'rom'  otherwise                                         romantic, unmarried
   Choices that come back later (all in S.f):
     k66Audit 'date'|'report' (normal)  → the morning after, the epilogue, ending line; 'report' while unmarried sets
                                          k66Set=1 (they stay a set: cereal on the kitchen floor)
     k66Codes 'hers'|'both'   (after)   → the house before the boat, ending line
     k66Troph 'shelf'|'pawn'  (act2)    → the epilogue, ending line
   Done marks: S.f.k66d[id]. In the infirmary nothing here runs (K66 needs !S.kd.med); the after beat waits for kdPost()
   and is not romantic in any register. Nothing here touches the hours, so kdSA() needs no switch.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts. See docs/notes_kc66.md. */
const K66=()=>{try{return !!S&&!isLone()&&!S.dark&&!(S.f&&S.f.abroad)&&S.phase!=='taken'&&!S.rom&&!S.vrom&&!S.f.k28pair&&!(S.kd&&S.kd.med)}catch(e){return false}};
const k66M=()=>S.pov!=='v';
const k66H=(m,v)=>k66M()?m:v;
const k66Done=id=>!!(S.f.k66d&&S.f.k66d[id]);
const k66Mark=id=>{S.f.k66d=S.f.k66d||{};S.f.k66d[id]=1;save()};
const k66Apart=()=>S.f.k58End==='apart';
function k66Mode(){if(k66Apart())return 'set';if(S.f.married)return 'wed';if(S.f.k66Set||tier()<2)return 'set';return 'rom'}
const k66Rom=()=>k66Mode()!=='set';
const k66A2=()=>S.phase==='act2'&&S.day>=(S.act2Start||0)+1;
const k66A3=()=>S.phase==='act3'&&typeof a3d==='function'&&a3d()>=2;
const k66Post=()=>['after','act2'].includes(S.phase)&&(typeof kdPost==='function'?kdPost():true)&&(typeof kdD!=='function'||!S.kd||!S.kd.t0||kdD()>=3);
const K66V=t=>['K9',t];
const K66MV=(...a)=>['hitmeuppp',MV(...a)];
const k66Fin=(e,b)=>()=>{apply(e);save();b()};

/* ===================================== NORMAL: break-in night ===================================== */
function k66Audit(){go(cutBg('#06080c'));k66Mark('vm_audit');const m=k66M(),wed=!!S.f.married;
 const film=[
  K66MV('also ur dog pushed me','ur dog pushed me through the dog door','Your dog pushed me through the dog door.','Your dog pushed me through the dog door, V. With his face. On my arse. I want that on the record.'),
  K66V('I know. I watched it on the kitchen camera. I have saved it.'),
  K66MV('delete it','delete it. now','Delete it.','Delete it. Delete it or I break in again tomorrow and delete it myself.'),
  K66V('I made a second copy. It is in the safe. You are welcome to break into the safe.')];
 const law=[
  K66V('What is the penalty in this house for breaking and entering?'),
  K66MV('u tell me. ur the eye for an eye guy','u tell me. eye for an eye, right?','You tell me. You’re the eye-for-an-eye man.','You tell me. You’re the eye-for-an-eye man. What does lex talionis say about a girl in your bedroom at three in the morning?'),
  K66V('That you entered without being asked. By that law I am owed an entry.')];
 const L=m?[
  ['','Once a year you break into V’s house. You wired the alarms yourself, so you call it quality control. Your rules: he locks up, sets everything and goes to bed like an honest man, and you have until four to get from the street to his bedroom without setting anything off. The two of you have never agreed what the prize is.'],
  ['','Half past two. You go over the back wall and land in his rosebed. The black hound meets you there, sits on your boot and wags its whole back end. It would eat anybody else. You whisper to it that it is a terrible guard dog, and it takes this as praise and licks your ear.'],
  K66MV('(stay. STAY. good boy)','(stay. stay. ok. good boy)','(Stay. Stay. Good boy. Don’t follow me.)','(Stay. Stay. Good boy. Don’t follow me in, you great disgrace. You’re a horse with anxiety. You can’t do stealth.)'),
  ['','You go in by the hounds’ door in the kitchen, which is big enough for a person, because the hounds are about the size of people. It is big enough for most of a person. You stick at the hips, with your arms out on the kitchen tiles and your legs on the patio, and you hang there in the dark thinking about your life, until the black hound puts its whole head against your backside and shoves you through onto your face.'],
  ['','On the back stair you step over the seventh tread, because stepping on it is an automatic fail, and you made that rule too. His door is open an inch. He is lying on top of the covers in a shirt and trousers with his hands folded on his chest, like a man laid out for viewing, wide awake.'],
  K66V('Four minutes to three. You are early.'),
  K66MV('u left ur door open. -2','u left ur door open. minus two','You left your door open. That’s minus two.','You left your own door open, V. Minus two. The house was perfect and you ruined it because you wanted to be found.'),
  ...film,...law,
  K66MV('...V.','V. oh my god.','V. Oh my god. Did you rehearse that?','V. Oh my god. Did you rehearse that? You rehearsed that. You’ve been lying there with your hands folded rehearsing that.'),
  K66V('Since eleven.')]:[
  ['','Once a year Misaki breaks into your house. She wired the alarms herself, so she calls it quality control. Her rules: you lock up, set everything and go to bed like an honest man, and she has until four to get from the street to your bedroom without setting anything off. You have never caught her. You have never slept on the night, either.'],
  ['','At twenty to three your phone lights up with the kitchen camera. The hounds’ door opens, and Misaki’s head and arms come through it, and then the rest of her does not. She hangs there, half in, with her palms flat on the tiles and her face set, for a full minute. Then the black hound comes up behind her on the patio, puts its head against her backside and shoves, and she shoots across the kitchen floor on her stomach like a curling stone.'],
  ['','You save the clip. You save it again, somewhere else. Then you put the phone face down, fold your hands on your chest, and listen to the back stair. The seventh tread does not go. She steps over it, because stepping on it is an automatic fail, and she made that rule too.'],
  ['','You left your door open an inch. At four minutes to three it opens the rest of the way. She is in the doorway in black, with a hair clip in her teeth and dog hair all down her front.'],
  K66V('You are early.'),
  K66MV('u left ur door open. -2','u left ur door open. minus two','You left your door open. That’s minus two.','You left your own door open, V. Minus two. The house was perfect and you ruined it because you wanted to be found.'),
  ...film,...law,
  ['','You rehearsed that from eleven until half past two. It comes out exactly as rehearsed. She takes the hair clip out of her teeth and stares at you, and the black hound, which has followed her up, sits down in the doorway to watch.']];
 const date=()=>{S.f.k66Audit='date';apply({aff:4});note('k66_audit','Break-in night: once a year Misaki breaks into V’s house to test the alarms she wired.');save();say(m?[
   K66MV('then collect.','then collect, doctor.','Then collect.','Then collect. I’m not scoring this part.'),
   ['','He collects. '+(wed?'The rings go on the bedside table by the water, where they live at night. ':'')+'He shuts the door on the black hound, very politely, and it lies down against the other side and sighs at intervals, like a lodger. Your hair clip ends up on the lampshade. You don’t find it for a week.'],
   ['','Between three and four the bedroom sensor goes off eleven times. The next afternoon you go through the alarm log with your feet on his desk and mark every one of them as a false alarm, in red.']]:[
   K66MV('then collect.','then collect, doctor.','Then collect.','Then collect. I’m not scoring this part.'),
   ['','You collect. '+(wed?'The rings go on the bedside table by the water, where they live at night. ':'')+'You shut the door on the black hound, politely, and it lies down against the other side and sighs at intervals, like a lodger. Her hair clip ends up on the lampshade, and neither of you looks for it.'],
   ['','Between three and four the bedroom sensor goes off eleven times. In the afternoon she goes through the alarm log with her feet on your desk and marks every one as a false alarm, in red, and initials them.']],hub)};
 const report=()=>{S.f.k66Audit='report';if(!wed)S.f.k66Set=1;apply({aff:3});note('k66_audit','Break-in night: once a year Misaki breaks into V’s house to test the alarms she wired. V writes the score on the cereal box.');save();say(wed?[
   ['',k66H('You make him write the score down first, in bed, on the back of a cereal box, because it is the nearest paper. You dictate. It is mostly about the dog door. You fall asleep halfway through a sentence about the dog door with your cheek on his shoulder and his pen still moving.','She makes you write the score down first, in bed, on the back of a cereal box, because it is the nearest paper. She dictates. It is mostly about the dog door. She falls asleep halfway through a sentence about the dog door with her cheek on your shoulder.')],
   ['',k66H('He finishes it alone, by the lamp, and gives the house nine out of ten.','You finish it alone, by the lamp, and give the house nine out of ten.')],
   K66V('I took a point off for my door. My door was my fault.')]:[
   K66MV('nope. we’re a set. cereal','nope. cereal. we’re a set, not a sitcom','No. Cereal. We’re a set, not a sitcom.','No. Cereal. We’re a set, V, a knife and a fork, and knives and forks have cereal at four in the morning and argue about the score.'),
   K66V('That is accurate.'),
   ['','You eat cereal on the kitchen floor with your backs against the cupboards, and the hounds sit round you in a ring and watch every spoonful go in, with great sorrow. '+k66H('He','You')+' writes the score on the back of the cereal box in fountain pen: seven out of ten. The deductions are the bedroom door, left open by the occupant, and the black hound, a disgrace.'],
   ['',k66H('The black hound tries to eat the score. You make him sign it before it can.','The black hound tries to eat the score. She makes you sign it before it can.')]],hub)};
 say(L,()=>ask(m?'hitmeuppp':'K9',m?'(He is waiting on the bed with his hands folded.)':'(She is in the doorway with the hair clip.)',m?[
  {t:'“then collect.”',sub:wed?'the rings go on the bedside table':'make it a date',fn:date},
  {t:wed?'“score first. in bed.”':'“cereal. we’re a set.”',sub:wed?'the cereal box, in bed':'keep it a set',fn:report}]:[
  {t:'Collect.',sub:wed?'the rings go on the bedside table':'make it a date',fn:date},
  {t:'Fetch the cereal.',sub:wed?'the score first, in bed':'keep it a set',fn:report}]))}

/* ===================================== AFTER: the codes (not romantic in any register) ===================================== */
function k66Codes(){go(cutBg('#080a0e'));k66Mark('vm_codes');const m=k66M(),nm=S.f.k58Name;
 const door=nm==='name'?k66H('V says your name from the corridor before he comes into the light.','You say her name from the corridor before you come into the light.')
  :nm==='look'?k66H('V stops in the doorway, in the light, and waits until you have looked at him properly.','You stop in the doorway, in the light, and wait until she has looked at you properly.')
  :k66H('V knocks on the open door, and waits, before he comes in.','You knock on the open door, and wait, before you come in.');
 const L=m?[
  ['','Three in the morning, and you are in the little security room off the kitchen instead of in bed. You drew this room on the back of his plans. Every door in the house is on the screens, and your back is to the one wall with no door in it.'],
  ['','You set every code in this house. Since you came home you cannot remember who else has them, and every night you come down here to work it out, and every night you lose count.'],
  K66MV('one. front door. two. kitchen. three. four.','one. front door. two. kitchen. three. the yard. four.','One: front door. Two: kitchen. Three: the yard. Four—','One: front door. Two: kitchen. Three: the yard. Four— Four is where I stop knowing who else knows. Fine. Start again. One.'),
  ['',door],
  ['','He puts a glass of water by the keyboard, and next to it a plastic card out of his wallet: the card that opens every lock in the house and lets you change any of them.'],
  K66V('This is yours. I should have given it to you the night you came upstairs. I did not think of it, and I am sorry.'),
  K66V('Change whatever you like. You do not have to tell me any of it.'),
  ['','The old hound has come down with him. It walks into the room without asking, the way it goes everywhere, and lies down under the desk across your feet, heavy and warm as a sandbag.']]:[
  ['','Three in the morning. The light is on in the little security room off the kitchen, the room she drew on the back of your plans. She is in there with every door in the house on the screens and her back to the one wall with no door in it.'],
  ['','Through the glass you can see her lips moving. She is counting doors, one, two, three, and every time she gets to four she stops and goes back to one.'],
  ['','You have had the master card in your wallet since the house was finished. It opens every lock in the house and changes any of them. Standing in the kitchen at three in the morning you understand that you never gave it to her, and that she has been sitting in there every night trying to work out who else has it.'],
  ['',door],
  ['','You put the water by the keyboard and the card beside it. The old hound has followed you down. It goes in without asking and lies down under the desk across her feet, and she lets it.'],
  K66V('This is yours. I should have given it to you the night you came upstairs. I did not think of it, and I am sorry. Change whatever you like.')];
 const hers=()=>{S.f.k66Codes='hers';apply({aff:3});calm(4);save();say(m?[
   K66MV('all of them. even urs.','all of them. even yours.','All of them. Yours too.','All of them. Yours too. I need to be the only one, V, for a bit. I don’t know how long a bit is.'),
   K66V('Then all of them.'),
   ['','It takes you until five. He sits on the floor of the corridor outside with his back to the wall and doesn’t look in once. The grey hound lies across his shins, and the old hound stays on your feet the whole time and snores.'],
   ['','At five he tries his own bedroom door on the screen, to show you it won’t open for him. It doesn’t. He stands there in his socks and knocks on it, politely, like a man at a bank, and you let him in from the keyboard.']]:[
   ['','She changes all of them, yours included. It takes her until five. You sit on the floor of the corridor with your back to the wall and do not look in, and the grey hound lies across your shins. Through the door you can hear the old hound snoring on her feet.'],
   ['','At five you try your own bedroom door, so that she can watch it not open for you on the screen. It does not open. You knock on it, and wait, and after a moment the lock goes, from the keyboard downstairs.'],
   K66V('Thank you.'),
   K66MV('...welcome.','ur welcome. weirdo.','You’re welcome. You’re a weirdo.','You’re welcome. You knocked on your own door. You’re such a weirdo, V. Go to bed.')],hub)};
 const both=()=>{S.f.k66Codes='both';apply({aff:3});calm(4);save();say(m?[
   K66MV('the rest are mine. urs stays.','the rest are mine. leave urs.','The rest are mine. I’ll leave yours.','The rest are mine. I’ll leave yours. One other person in this house gets to open one door, and it’s you, and I picked that.'),
   ['','It takes you until half past four. At four he brings a second glass of water, knocks, and leaves it on the floor outside without coming in. The old hound gets up, drinks half of it, and comes back to your feet.'],
   K66MV('(one. front door. mine. two. kitchen. mine. three...)','(one: front door, mine. two: kitchen, mine.)','(One: front door, mine. Two: kitchen, mine. Three: the yard, mine. Four: his. Four is his. Fine.)','(One: front door, mine. Two: kitchen, mine. Three: the yard, mine. Four: his room, his. I know who’s got four. I know exactly who’s got four.)')]:[
   K66V('If you are willing, leave my door as it is. I would like one door in this house that I can open without waking you.'),
   K66MV('ok. ur door.','ok. ur door stays. the rest are mine','Fine. Your door stays. The rest are mine.','Fine. Your door stays. The rest are mine. One other person in this house gets to open one door, and it’s you. I picked that. Go away now.'),
   ['','It takes her until half past four. At four you put a second glass of water on the floor outside the room, knock, and go. Through the glass, when you look back from the kitchen, she is counting on her fingers, and at four she stops, and nods, and goes on to five.']],hub)};
 say(L,()=>ask(m?'hitmeuppp':'K9',m?'(The card is on the desk. He has stepped back out of the doorway.)':'(The card is on the desk.)',m?[
  {t:'Change every code. His too.',fn:hers},
  {t:'Change every code but his.',fn:both}]:[
  {t:'Ask for nothing.',fn:hers},
  {t:'Ask her to leave your door.',fn:both}]))}

/* ===================================== ACT II: third at regionals ===================================== */
function k66Troph(){go(cutBg('#0e0c08'));k66Mark('vm_troph');const m=k66M(),r=k66Rom();
 const L=[
  ['',m?'V puts a carrier bag on the kitchen island and says nothing. With V that means it cost a lot.':'You put a carrier bag on the kitchen island and say nothing. She looks at the bag, and at you, and puts her spoon down.'],
  ['','Inside is a trophy: a plastic gold figure on a marble-effect base, holding a protractor over its head like a sword. The plate says REGIONAL MATHEMATICS CHALLENGE, JUNIOR, THIRD PLACE, and the year '+(m?'you were':'she was')+' eleven.'],
  K66MV('...no.','no. no way. where','Where did you get this?','Where did you get this? V. I pawned this for three dinners when I was eleven. I had the ticket for years.'),
  K66V('The ticket was in your calculus book. The pawn shop closed years ago. A man with a stall under the flyover bought its stock and still had this, because nobody else in the city wanted it.'),
  K66V('He asked four hundred dollars. He had seen my watch. I paid it.'),
  K66MV('it’s worth 3 bucks','it’s worth like three dollars','It’s worth three dollars. The protractor comes off.','It cost three dollars to make and the protractor comes off if you breathe on it. He saw you coming from the end of the street. He saw you coming from space.'),
  K66V('He did. He also kept it all these years. I considered that worth the difference.'),
  ['',m?'He has printed the paper from that year, too, and puts it on the island with a pencil. He sets the kitchen timer without asking, as if this were a normal thing to do on a Tuesday.':'You have printed the paper from that year. You put it on the island with a pencil and set the kitchen timer without asking. She has the pencil before it starts ticking.'],
  ...(r?[
   K66MV('what do i get if i win','and if i beat first place?','And what do I get if I beat first place?','And what do I get if I beat first place? Don’t say the trophy. I’ve got the trophy. I want a prize, V, a proper one.'),
   K66V('Name it.'),
   K66MV('...later. here.','later. here. on the island','Later. Here. On the island, where you eat your toast.','Later. Here. On this island, where you eat your toast every morning and read the paper like a grandfather. You’ll never look at toast the same way again.'),
   K66V('Start the timer.')]:[
   K66MV('and if i win?','and if i beat first place?','And if I beat first place?','And if I beat first place? You do the washing up for a month. In an apron. I’ll pick the apron.'),
   K66V('Agreed. Start the timer.')]),
  ['',m?'You do it cross-legged on the island with the pencil in your teeth. The black hound puts its chin on the counter to watch. On a question you hate you throw the pencil at the fridge, and the black hound brings it back, wet, and you finish the paper with a wet pencil.':'She does it cross-legged on the island with the pencil in her teeth. The black hound puts its chin on the counter to watch. On a question she hates she throws the pencil at the fridge, and the black hound brings it back, wet, and she finishes the paper with a wet pencil.'],
  ['',m?'You get one wrong. Question seventeen. You got it wrong when you were eleven, too, the same mistake in the same place, and you laugh until you have to lie down flat on the island.':'She gets one wrong, question seventeen. She says she got it wrong when she was eleven, too, the same mistake in the same place, and she laughs until she has to lie down flat on the island. You have not heard that laugh in this kitchen since before.'],
  K66V('The girl who came first that year got three wrong.'),
  K66MV('...shut up.','shut up. are u serious','Shut up. I’d have won?','Shut up. I’d have won. Eleven-year-old me would have won if she’d had a table and a lamp. Write that down. Don’t write that down.')];
 const shelf=()=>{S.f.k66Troph='shelf';apply({aff:3});calm(3);save();say([
   ['',m?'It goes on the shelf in the security room, above the screens, where you can see it at three in the morning. He puts it up himself with a spirit level. The protractor falls off twice. You glue it.':'It goes on the shelf in the security room, above the screens, where she will see it at three in the morning. You put it up with a spirit level. The protractor falls off twice. She glues it, and holds it in place for the full four minutes on the tube.'],
   K66MV('third place. at 3am. good.','third place, watching the doors.','Third place, on night watch.','Third place, on the night watch. Promoted. Somebody in this house finally has a medal.'),
   ['',r?(m?'You collect your prize that evening on the island, after he has moved the toast rack. The kitchen timer gets knocked off the counter and rings under the fridge for a full minute, and neither of you goes to get it.':'She collects her prize that evening on the island, after you have moved the toast rack. The kitchen timer gets knocked off the counter and rings under the fridge for a full minute, and neither of you goes to get it.')
    :(m?'He does the washing up for a month in the apron you pick, which has a cartoon lobster on it, with his sleeves rolled exactly to the elbow. He does not mention the lobster once.':'You do the washing up for a month in the apron she picks, which has a cartoon lobster on it, with your sleeves rolled exactly to the elbow. You do not mention the lobster once.')]],hub)};
 const pawn=()=>{S.f.k66Troph='pawn';apply({aff:3});save();say([
   K66MV('we’re pawning it again. dinner','we’re pawning it again. for dinner','We’re pawning it again. For dinner.','We’re pawning it again. For dinner. That’s what it’s for. That’s what it was always for.'),
   ['','The man under the flyover offers twelve dollars for it. He has never seen V without the watch, and he looks at the watch for a long time.'],
   ['',r?(m?'Twelve dollars is two bowls of noodles and one beer, and you split the beer. Under the table you hook your ankle round his, and tell him the prize is waiting at home and costs a lot more than twelve dollars, and he asks for the bill before the noodles have arrived.':'Twelve dollars is two bowls of noodles and one beer, split. Under the table she hooks her ankle round yours and tells you the prize is waiting at home and costs a great deal more than twelve dollars. You ask for the bill before the noodles have arrived.')
    :(m?'Twelve dollars is two bowls of noodles and one beer, split, with the hounds’ leads tied round the chair legs. You tell him about question seventeen for an hour. He listens to all of it, and then he does the washing up at home in the lobster apron.':'Twelve dollars is two bowls of noodles and one beer, split, with the hounds’ leads tied round the chair legs. She tells you about question seventeen for an hour, and you listen to all of it, and then you go home and put on the lobster apron.')],
   ['',m?'The next morning the trophy is back on the island, and the man under the flyover has started calling him “sir”. You never ask what that cost.':'The next morning you are under the flyover at seven. He has put the price back up to four hundred dollars. You pay it.']],hub)};
 say(L,()=>ask(m?'hitmeuppp':'K9',m?'(Where does it go?)':'(She is holding it like a rifle.)',m?[
  {t:'The shelf in the security room.',fn:shelf},
  {t:'“we’re pawning it again.”',fn:pawn}]:[
  {t:'Clear a shelf for it in the security room.',fn:shelf},
  {t:'Offer to take her to pawn it again.',fn:pawn}]))}

/* ===================================== ACT III: the house, before the boat ===================================== */
function k66House(){go(cutBg('#08080e'));k66Mark('vm_house');const m=k66M(),c=S.f.k66Codes,mode=k66Mode();
 const L=[
  ['',m?'Two nights before the boat, V gives you a tour of the house. He does it room by room, as if you had never been inside, in the voice he uses for the hounds’ weights. The hounds follow the pair of you in single file, like a coach party.':'Two nights before the boat, you give her a tour of the house, room by room, as if she had never been inside, in the voice you use for the hounds’ weights. The hounds follow the pair of you in single file, like a coach party.'],
  K66V('This is the kitchen. The house is in your name and has been since the spring. The hounds are yours. The old hound will not eat from a bowl you are holding. Put it down and leave the room, and he will pretend he was never hungry.'),
  K66MV('stop.','stop. ur not dying.','Stop it. You’re not dying on a boat.','Stop it. Nobody’s dying on a boat, V, on a yacht full of bankers. I’ve seen scarier vending machines.'),
  K66V('This is the larder.'),
  K66MV('i KNOW it’s the larder','i know it’s the larder. i live here','I know it’s the larder, V. I live here.','I know it’s the larder, V. I live here. I wired the larder. The larder has a motion sensor because of me.'),
  K66MV('and if i don’t come back','and if it’s me that doesn’t come back','And if it’s me that doesn’t come back?','And if it’s me? If I don’t come back. Where’s that on the tour?'),
  K66V('Lex talionis. An eye for an eye.'),
  K66V('I would not stop at the eye. Then I would come home and feed the hounds, because they would be hungry. I would like you to know both of those things.')];
 if(c==='hers')L.push(K66MV('front door’s 0311.','front door’s 0311. all of them are','Every lock in the house is 0311.','Every lock in the house is 0311. All of them. In case you have to get in without me. And for when we both get back.'),
  K66V('Third, at eleven.'),
  K66MV('ya.','yeah. don’t make it a thing.','Yeah. Don’t make it a thing.','Yeah. Don’t make it a thing. You’re making it a thing. You’re writing it down.'));
 else if(c==='both')L.push(K66V('I changed the code on my door last week. It was the only one I was allowed. It is 0311.'),
  K66MV('that’s MINE','that’s MY number. third at eleven','That’s my number. That’s all of mine.','That’s my number, V. Third at eleven. Every other lock in this house is 0311. You picked my number for the one door I left you.'),
  K66V('I know. I read the log.'));
 if(mode==='set')L.push(['',m?'At ten he goes to bed, because the old hound refuses to go up without him. You sit on the end of his bed with the rifle across your knees and your back to the footboard. He sleeps three and a half hours, as always. You don’t sleep at all. At half past one he wakes, exactly on time, and sees you still there. He gets up without telling you to go to bed, and makes two cups.':'At ten you go to bed, because the old hound will not go up without you. She sits on the end of your bed with the rifle across her knees and her back to the footboard. You sleep three and a half hours, as always. At half past one you wake, exactly on time, and she is still there. You get up without telling her to go to bed, and make two cups.']);
 else L.push(K66V('This is the bedroom. I believe you are familiar with it.'),
  K66MV('tour me','go on. tour me','Go on, then. Give me the tour.','Go on, then, doctor. Give me the full tour. Point at things. Use the voice.'),
  ['',m?'He uses the voice. The coach party is shut out on the landing. '+(mode==='wed'?'The rings go on the bedside table by the water. ':'')+'Afterwards he sleeps three and a half hours, as always, and you stay awake the whole time with your hand flat on his chest and the rifle against the headboard, watching the door.':'You use the voice. The coach party is shut out on the landing. '+(mode==='wed'?'The rings go on the bedside table by the water. ':'')+'Afterwards you sleep three and a half hours, as always. When you wake she is lying on her side with her hand flat on your chest and the rifle against the headboard, watching the door.'],
  K66MV('ur turn to sleep. mine to watch','go back to sleep. i’ve got the door','Go back to sleep. I’ve got the door.','Go back to sleep. Four more hours. I’ve got the door, V. I designed the door.'),
  ['',m?'He goes back to sleep. He has never once in his life slept past half past one. He sleeps until six, and wakes up furious about it, and you laugh into his shoulder until the hounds start barking downstairs.':'You go back to sleep. You have never slept past half past one in your adult life. You sleep until six, and wake up furious, and she laughs into your shoulder until the hounds start barking downstairs.']);
 say(L,k66Fin({aff:3},hub))}

/* ===================================== EPILOGUE: break-in night, a year on ===================================== */
function k66Epi(){go(cutBg('#06080c'));k66Mark('vm_epi');const m=k66M(),a=S.f.k66Audit,t=S.f.k66Troph,mode=k66Mode();
 const L=[['',m?'Break-in night, a year on. You go over the back wall at half past two. The black hound is waiting at the hounds’ door, and holds the flap up with its head, like a doorman, while you go through it feet first.':'Break-in night, a year on. At half past two the kitchen camera shows the black hound holding up the flap of the hounds’ door with its head, like a doorman, and Misaki going through it feet first, which she has clearly been practising.']];
 if(k66Apart())L.push(['',m?'He does not leave his door open any more. You get in at ten past three, touch his door handle to show you were there, and go back down. In the morning your score is on the island on the back of a cereal box, and under it, in fountain pen, he has written “Noted.” and the time.':'You do not leave your door open any more. She gets in at ten past three, touches your door handle and goes back down the stair. In the morning her score is on the island on the back of a cereal box. You write “Noted.” and the time under it, and leave it where it was.']);
 else if(a==='date'&&mode!=='set')L.push(['',m?'His door is open an inch. On the floor in front of it somebody has chalked MINUS TWO, and beside that, on a card, in fountain pen: “I have been informed of the penalty. I am prepared to pay it.”':'You leave your door open an inch, and chalk MINUS TWO on the floor in front of it, and beside that a card: “I have been informed of the penalty. I am prepared to pay it.”'],
  K66MV('...u PREPARED?','u prepared. u wrote a card.','You prepared. You wrote me a card.','You prepared. You wrote me a card, V, in fountain pen, about the penalty. Move over.'),
  ['',m?'He moves over. The bedroom sensor goes off fourteen times before four. You mark them all false alarms in the morning, in red, and he initials every one under yours.':'You move over. The bedroom sensor goes off fourteen times before four. In the morning she marks them false alarms in red, and you initial every one under hers.']);
 else L.push(['',m?'The kitchen light is on. He is at the table with two bowls of cereal poured, and on the wall above him is last year’s cereal box, flattened, in a frame, with the score showing.':'You are at the kitchen table with two bowls of cereal poured, under last year’s cereal box, which you have flattened and framed and hung with the score showing.'],
  K66V('I have left room on the wall for forty more.'),
  K66MV('40 years of 7s','forty years of sevens. u optimist','Forty years of sevens. You optimist.','Forty years of sevens, V. You absolute optimist. Pass the milk. The black hound’s still a disgrace and I’m taking it off this year’s too.'));
 if(t==='shelf')L.push(['','The trophy is still above the screens in the security room, with a ring of glue round the protractor. '+(m?'You say goodnight to it on the way past.':'She says goodnight to it on the way past.')]);
 else if(t==='pawn')L.push(['','The trophy has been pawned eleven times this year, for dinner. The man under the flyover charges V four hundred dollars every morning after, and V pays it every time. It is the most expensive meal in the city and it is noodles.']);
 if(S.f.lp60Fly==='more')L.push(['',m?'On Thursdays you fly over the house at two thousand feet and mark the roof down in red pen. You’ve told him the roof is a weak point. He has started standing on it on Thursdays, at ten past three, in his coat, so that it isn’t.':'On Thursdays she flies over the house at two thousand feet and marks the roof down in red pen. She has told you the roof is a weak point. You have started standing on it on Thursdays at ten past three, in your coat, so that it is not.']);
 if(mode==='wed'&&!k66Apart())L.push(K66V('Married people are allowed to give each other a key. I asked the lawyer.'),K66MV('no.','no. break-ins only.','No. Break-ins only.','No. Break-ins only. I’ll get in on my own, every year, through the dog door, until you’re ninety. Write that down.'));
 say(L,k66Fin({aff:2},hub))}

/* ===================================== THE MORNING AFTER ===================================== */
EVENTS.push({id:'k66_morn',when:()=>{try{return K66()&&k66Rom()&&S.f.k66Audit==='date'&&!k66Apart()&&(S.phase==='normal'||S.phase==='epilogue'&&k66Done('vm_epi'))}catch(e){return false}},run:done=>{const m=k66M(),wed=!!S.f.married;
 const born=K66MV('nothing in there. born that way or sold. no refunds','nothing in there, V. born that way or sold before i was nine. no refunds','There’s nothing in there to worry about. I was born that way or somebody sold it before I was nine. No refunds either way.','Nothing in there to worry about, doctor. Either I was born without one or somebody sold it before I was nine. I’ve never found out which, and either way, no refunds. Next question.');
 say(m?[
 ['','You wake at noon in V’s bed, face down, shirtless, with the old hound across your calves and the black hound across the old hound. V is awake. V has been awake since half past five, because he slept his three and a half hours and not a minute more. He hasn’t got up, because you are lying on his arm.'],
 K66V('I lost the feeling in this arm at six. I have decided you may keep it.'),
 K66MV('...time','what time is it','What time is it? Why didn’t you get up?','What time is it? Why didn’t you get up? You’ve been lying there six hours. You could have rolled me.'),
 K66V('Twelve minutes past twelve. I have been busy with the notebook.'),
 ['','The notebook is open on his chest. The last entry is dated last night, and it has a line through it, firmly, in the same pen.'],
 K66MV('what did i say','what did i SAY','What did I say? Why is it crossed out?','What did I say last night? Why is it crossed out? V, you never cross anything out.'),
 K66V('I crossed it out because I could never read it aloud at breakfast without having to sit down. I have it by heart.'),
 K66MV('tell me','tell me or i lie on the other arm','Tell me, or I lie on the other arm.','Tell me. Tell me or I lie on the other arm, and then you’ve got no arms, and you’ll have to sign things with your teeth.'),
 K66V('No.'),
 ['','You lie on the other arm. He loses the feeling in that one as well, and does not mention it, and lies there with no arms and two hounds on his legs, looking pleased with himself.'],
 K66V('There is one thing I should have asked last night, as a physician. I would rather ask it at noon than not at all. Contraception.'),
 K66MV('the doctor voice. naked. at noon.','oh my god. the doctor voice','Oh my god. The doctor voice. Now?','Oh my god. You’re doing the doctor voice. Naked. At noon. Under two dogs. Go on, then.'),
 born,
 K66V('There are no further questions.'),
 ['','He says it in exactly the voice he uses in board meetings, with no arms and a hound on his shins, and you laugh into the pillow so hard that the old hound gets off the bed in protest and the black hound moves up into its place.'+(wed?' His ring is still on the bedside table. Yours is on your thumb, where you sleep with it.':'')]]:[
 ['','You slept three and a half hours, as always, and woke at half past five, as always. You have not got up. She is lying across your arm, face down, shirtless, with the old hound across her calves and the black hound across the old hound, and you have decided the arm is hers now.'],
 ['','You spend the six hours on the notebook. At ten past twelve you put a line through last night’s entry, firmly, because you will never be able to read it aloud at breakfast without having to sit down. You have it by heart.'],
 K66MV('...u crossed something out','u crossed something out. u never cross anything out','You crossed something out. You never cross anything out.','You crossed something out. What did I say? V. What did I say last night?'),
 K66V('Something I will not be repeating before noon. It is twelve minutes past. I will not be repeating it after noon either.'),
 K66MV('tell me','tell me or i lie on the other arm','Tell me, or I lie on the other arm.','Tell me. Tell me or I lie on the other arm, and then you’ve got no arms, and you’ll have to sign things with your teeth.'),
 ['','She lies on the other arm. You lose the feeling in that one too, and do not mention it.'],
 K66V('There is one thing I should have asked last night, as a physician. I would rather ask it at noon than not at all. Contraception.'),
 born,
 K66V('There are no further questions.'),
 ['','You say it in exactly the voice you use in board meetings, with no arms and a hound on your shins. She laughs into the pillow so hard that the old hound gets off the bed in protest, and the black hound moves up into its place.'+(wed?' Your ring is on the bedside table. Hers is on her thumb, where she sleeps with it.':'')]],()=>{apply({aff:3});done()})}});

/* ===================================== THREADS ===================================== */
/* Misaki's phone: V, the day after break-in night */
txDef('tx_k66_m',{with:'v',pov:'m',prio:1,when:()=>K66()&&k66Done('vm_audit')&&['normal','epilogue'].includes(S.phase)&&tier()>=1,nodes:{
 start:{in:()=>k66Rom()?['Your red pen was under my pillow.','There is red ink on my left shoulder. It appears to say 7/10.']:['Your red pen was in the cereal box.','The black hound would like to appeal its score.'],expire:3,
  opts:()=>{const o=[];if(k66Rom())o.push({t:'“7 is generous”',fx:()=>apply({aff:2}),reply:()=>['I have read the scale.','Seven out of what?'],next:'scale'});
   o.push({t:'“that’s the house’s score”',fx:()=>apply({aff:1}),reply:()=>['The house has never scored below nine.','I would like to know where it lost the points.'],next:'house'});
   o.push({t:k66Rom()?'“wash it off”':'“appeal denied”',fx:()=>apply({aff:1}),reply:()=>k66Rom()?['No.','I am in a board meeting. The chairman has asked about my shoulder. I said it was a filing error.']:['I have told it.','It wagged.']});return o}},
 scale:{in:()=>['I am asking for my records.'],
  opts:()=>[{t:'“out of 10. room for improvement”',fx:()=>apply({aff:2}),reply:()=>['Noted.','I have cleared my evening.']},
   {t:'“out of 7.”',fx:()=>apply({aff:3}),reply:()=>['I am in a board meeting.','I am going to have to remain seated for some time.']}]},
 house:{in:()=>['Where, please.'],
  opts:()=>[{t:'“the dog door. u could fit a sofa through it”',fx:()=>apply({aff:1}),reply:()=>['I fitted you through it.','With help.','I will not have it made smaller. You would have to come in another way.']},
   {t:'“the black hound. -2. a disgrace”',fx:()=>apply({aff:2}),reply:()=>['It pushed you through the door.','It has never pushed me through anything.','I have reprimanded it. It wagged.']}]}}});
/* V's phone: Misaki, inside the house, round two */
txDef('tx_k66_v',{with:'m',pov:'v',prio:1,when:()=>K66()&&k66Done('vm_audit')&&S.phase==='normal'&&tier()>=1,nodes:{
 start:{in:()=>['round 2','i’m in ur house','guess where'],expire:3,
  opts:()=>{const o=[{t:'“The study.”',fx:()=>apply({aff:1}),reply:()=>['wrong. ur reading glasses are on the desk tho. i’m wearing them','i look like a librarian who kills people'],next:'two'},
   {t:'“The kennel.”',fx:()=>apply({aff:1}),reply:()=>['wrong. but the black one just walked past me and didn’t even look up','DISGRACE'],next:'two'}];
   if(k66Rom())o.push({t:'“My bed.”',fx:()=>apply({aff:3}),reply:()=>['how did u know','did a sensor go','i disarmed all of them'],next:'bed'});return o}},
 two:{in:()=>['colder. u have 10 min then i win'],
  opts:()=>[{t:'“I am coming up the back stair.”',fx:()=>apply({aff:2}),reply:()=>S.f.k58Stair==='his'?['step on it so i know it’s u','...i heard it. ok. hi']:['step over the 7th or u fail','...ok u passed. hi']},
   {t:'“I forfeit.”',fx:()=>apply({aff:1}),reply:()=>['u can’t forfeit ur own house','ok fine. u owe me cereal','i’m on the roof. bring the cereal up']}]},
 bed:{in:()=>['ok yes. ur bed. i’m in it. ur glasses are on'],
  opts:()=>[{t:'“I am in a board meeting.”',fx:()=>apply({aff:2}),reply:()=>['i know','that’s why i’m telling u now','have a good meeting v. don’t stand up']},
   {t:'“I will be home in twenty minutes.”',fx:()=>apply({aff:3}),reply:()=>['the meeting’s for an hour','...','ok. 20. step on the stair']}]}}});

/* ===================================== DELIVERY ===================================== */
const K66B=[
 {id:'vm_audit',t:()=>k66H('Break-in night: get into V’s bedroom by four','Break-in night: Misaki is coming for the house'),sub:()=>'costs time · late · the alarms '+k66H('you','she')+' wired',when:()=>S.phase==='normal'&&tier()>=2,run:k66Audit},
 {id:'vm_codes',t:()=>k66H('The security room, at three','The light in the security room, at three'),sub:()=>'costs time · the master card',when:k66Post,run:k66Codes},
 {id:'vm_troph',t:()=>k66H('V has a carrier bag','Give Misaki the carrier bag'),sub:()=>'costs time · the stall under the flyover',when:k66A2,run:k66Troph},
 {id:'vm_house',t:()=>k66H('V gives you a tour of the house','Give Misaki a tour of the house'),sub:()=>'costs time · before the boat',when:k66A3,run:k66House},
 {id:'vm_epi',t:()=>'Break-in night, a year on',sub:()=>'costs time · the dog door',when:()=>S.phase==='epilogue'&&(!!S.f.k58End||!S.f.k58_creak),run:k66Epi}];
function k66Due(){if(!K66())return null;for(const b of K66B){if(k66Done(b.id))continue;let ok=false;try{ok=!!b.when()}catch(e){}if(ok)return b}return null}
const _shK66=sideHub;sideHub=function(late){const o=_shK66(late);try{if(!K66())return o;const b=k66Due();if(!b)return o;
 return o.concat([{t:'♥ '+b.t(),sub:b.sub(),dis:!!late,fn:()=>{spend();b.run()}}])}catch(e){return o}};

/* ===================================== ENDINGS ===================================== */
const _xeK66=extraEnding;extraEnding=function(){const L=_xeK66();try{if(!S||!S.f||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,apart=f.k58End==='apart';
 if(f.k66Audit==='date'&&!apart&&!f.k66Set)L.push('Once a year Misaki breaks into V’s house by four in the morning, usually through the dog door. The score for that night has never been written down. The bedroom sensor logs a great many false alarms.');
 else if(f.k66Audit==='date')L.push('Misaki still breaks into V’s house once a year. She leaves her score on the island, and in the morning V writes “Noted.” under it.');
 else if(f.k66Audit)L.push('On the kitchen wall of V’s house there is a row of framed cereal boxes, one a year, each with the house’s score on the back in fountain pen. The black hound is always marked down.');
 if(f.k66Codes==='hers')L.push('Every lock in V’s house is 0311: third, at eleven. Only Misaki can change them. V knocks on his own bedroom door, and she lets him in.');
 else if(f.k66Codes==='both')L.push('Every lock in V’s house answers only to Misaki except one. That one is V’s bedroom door, and its code is 0311.');
 if(f.k66Troph==='shelf')L.push('Above the screens in the security room there is a third-place trophy with a glued protractor. Misaki says goodnight to it.');
 else if(f.k66Troph==='pawn')L.push('A man with a stall under the flyover has sold the same three-dollar trophy back to V for four hundred dollars more times than he can count.');
 if(S.seen&&S.seen.k66_morn&&!apart)L.push('There is one crossed-out line in V’s notebook. He has never read it aloud, and he knows it by heart.')}catch(e){}return L};
