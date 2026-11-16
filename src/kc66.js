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
                                          k66Set=1 (they stay a set)
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

/* ===================================== NORMAL: audit night ===================================== */
function k66Audit(){go(cutBg('#06080c'));k66Mark('vm_audit');const m=k66M(),wed=!!S.f.married;
 const L=m?[
  ['','Once a year you audit the security you designed for V’s house. Your rules: he locks up as if he means it, arms every sensor and goes to bed. You have until four to get from the street to his bedroom without tripping anything. If you trip something, he gets to tell you at breakfast, in the flat voice.'],
  ['','Half past two. You go over the back wall where two cameras overlap by eleven centimetres. You put the overlap there on purpose and wrote it down nowhere. The black hound meets you on the lawn, sits on your boot and wags. It would eat anybody else.'],
  K66MV('(been waiting 40 min for the porch light. whatever.)','(forty minutes for the porch light to time out. easy.)','(Forty minutes for the porch light to time out. I once queued fourteen hours in the rain for two dresses. I can wait out a lamp.)','(Forty minutes for the porch light to time out. At fourteen I queued all night in the rain outside a boutique for two dresses I was going to sell by breakfast. I can wait out a lamp. Flight school money, that was. I can wait out anything.)'),
  ['','The kitchen sensor you disarm with a hair clip. You take its battery out and leave it on the island, so he knows you were here. On the back stair you step over the seventh tread, because stepping on it is an automatic fail. You wrote that rule too.'],
  ['','His door is open an inch. He is lying on his back on top of the covers, in a shirt and trousers, with his hands folded on his chest, wide awake.'],
  K66V('Four minutes to three. You are early.'),
  K66MV('u left ur door open. -2','u left ur door open. minus two','You left your door open. That’s minus two.','You left your own door open, V. Minus two. The house was perfect and you ruined it because you wanted to be found.'),
  K66V('I did not want you picking a lock in the dark. Your hands are worth more than the score.'),
  K66V('What is the penalty in this house for breaking and entering?'),
  K66MV('u tell me. ur the eye for an eye guy','u tell me. eye for an eye, right?','You tell me. You’re the eye-for-an-eye man.','You tell me. You’re the eye-for-an-eye man. What does lex talionis say about a girl in your bedroom at three in the morning?'),
  K66V('That you entered without being asked. By that law I am owed an entry.'),
  K66MV('...V.','V. oh my god.','V. Oh my god. Did you rehearse that?','V. Oh my god. Did you rehearse that? You rehearsed that. You’ve been lying there since midnight rehearsing that.'),
  K66V('Since eleven.')]:[
  ['','Once a year Misaki audits the security she designed for your house. Her rules: you lock up as if you mean it, arm every sensor and go to bed. She has until four to get from the street to your bedroom without tripping anything. You have never caught her. You have never slept on audit night either.'],
  ['','At ten to three the kitchen sensor blinks once on your phone and goes dark. She has already been in the kitchen. She has pulled its battery to show you she can, and left it on the island where you will find it with your coffee.'],
  ['','You lie on your back on top of the covers, fully dressed, with your hands folded, and listen to the back stair. The seventh tread does not go. She steps over it, because stepping on it is an automatic fail, and she wrote that rule too.'],
  ['','You left your door open an inch. At four minutes to three it opens the rest of the way, and she is in the doorway in black, with a hair clip in her teeth and the black hound behind her, wagging, a disgrace.'],
  K66V('You are early.'),
  K66MV('u left ur door open. -2','u left ur door open. minus two','You left your door open. That’s minus two.','You left your own door open, V. Minus two. The house was perfect and you ruined it because you wanted to be found.'),
  K66V('I did not want you picking a lock in the dark. Your hands are worth more than the score. What is the penalty in this house for breaking and entering?'),
  K66MV('u tell me. ur the eye for an eye guy','u tell me. eye for an eye, right?','You tell me. You’re the eye-for-an-eye man.','You tell me. You’re the eye-for-an-eye man. What does lex talionis say about a girl in your bedroom at three in the morning?'),
  K66V('That you entered without being asked. By that law I am owed an entry.'),
  ['','You rehearsed that sentence from eleven until half past two. It comes out exactly as rehearsed. She takes the hair clip out of her teeth and stares at you.']];
 const date=()=>{S.f.k66Audit='date';apply({aff:4});note('k66_audit','Audit night: Misaki breaks into V’s house once a year to test the security she designed.');save();say(m?[
   K66MV('then collect.','then collect, doctor.','Then collect.','Then collect. I’m not scoring this part.'),
   ['','He collects. '+(wed?'The rings go on the bedside table by the water, where they live at night. ':'')+'The red pen rolls off the bed and you don’t find it for a week.'],
   ['','Between three and four the house logs eleven alerts from the bedroom sensor. You go through the log the next afternoon with your feet on his desk and mark every one of them as a false alarm.']]:[
   K66MV('then collect.','then collect, doctor.','Then collect.','Then collect. I’m not scoring this part.'),
   ['','You collect. '+(wed?'The rings go on the bedside table by the water, where they live at night. ':'')+'Her red pen rolls off the bed and neither of you looks for it.'],
   ['','Between three and four the bedroom sensor logs eleven alerts. In the afternoon she goes through the log with her feet on your desk and marks every one as a false alarm, and initials each one.']],hub)};
 const report=()=>{S.f.k66Audit='report';if(!wed)S.f.k66Set=1;apply({aff:3});note('k66_audit','Audit night: Misaki breaks into V’s house once a year to test the security she designed. V writes the report.');save();say(wed?[
   ['','The report gets written in bed, on a clipboard propped on '+k66H('his','your')+' knees, with the old hound across '+k66H('your','her')+' feet. Item one is the open door. '+k66H('You fall asleep at item nine with your cheek on his shoulder, and he finishes it alone and scores the house nine out of ten.','She falls asleep at item nine with her cheek on your shoulder. You finish it alone and score the house nine out of ten.')],
   K66V('I took a point off for the door. The door was my fault.')]:[
   K66MV('nope. we’re a set. sets do paperwork','nope. clipboard. we’re a set, not a sitcom','No. Get the clipboard. We’re a set, not a sitcom.','No. Get the clipboard. We’re a set, V, a knife and a fork, and knives and forks do the paperwork.'),
   K66V('That is accurate.'),
   ['','You eat cereal on the kitchen floor at four with the clipboard between you and the hounds in a ring round you, waiting for milk. '+k66H('He','You')+' writes the report out in fountain pen. Item one: the bedroom door, left open by the occupant, minus two. Item two: the black hound, a disgrace.'],
   ['','The house scores seven out of ten. '+k66H('You make him sign it.','She makes you sign it.')]],hub)};
 say(L,()=>ask(m?'hitmeuppp':'K9',m?'(He is waiting on the bed with his hands folded.)':'(She is in the doorway with the hair clip.)',m?[
  {t:'“then collect.”',sub:wed?'the rings go on the bedside table':'make it a date',fn:date},
  {t:wed?'“get the clipboard. report first.”':'“get the clipboard. we’re a set.”',sub:wed?'paperwork in bed':'keep it a set',fn:report}]:[
  {t:'Collect.',sub:wed?'the rings go on the bedside table':'make it a date',fn:date},
  {t:'Fetch the clipboard.',sub:wed?'paperwork in bed':'keep it a set',fn:report}]))}

/* ===================================== AFTER: the codes (not romantic in any register) ===================================== */
function k66Codes(){go(cutBg('#080a0e'));k66Mark('vm_codes');const m=k66M(),nm=S.f.k58Name;
 const door=nm==='name'?k66H('V says your name from the corridor before he comes into the light.','You say her name from the corridor before you come into the light.')
  :nm==='look'?k66H('V stops in the doorway, in the light, and waits until you have looked at him properly.','You stop in the doorway, in the light, and wait until she has looked at you properly.')
  :k66H('V knocks on the open door, and waits, before he comes in.','You knock on the open door, and wait, before you come in.');
 const L=m?[
  ['','Three in the morning, and you are in the security room off the kitchen instead of in bed. You drew this room on the back of his plans. Every door in the house is on its eight screens, and your back is to the only wall without a door in it.'],
  ['','You wrote every code in this house. Since you came home you cannot remember whether anybody else has them, and you have been sitting here every night trying to work it out.'],
  K66MV('one. front door. two. kitchen. three. kennel. four.','one. front door. two. kitchen. three. kennel yard. four.','One: front door. Two: kitchen. Three: the kennel yard. Four—','One: front door, six digits. Two: kitchen, the same six, which was stupid. Three: the kennel yard. Four: his study. Four is where I stop knowing who else knows.'),
  ['',door],
  ['','He puts a glass of water by the keyboard, and next to it a plastic card: the master card. It opens every lock in the house and changes any of them.'],
  K66V('It is yours. I should have given it to you the night you came upstairs. I did not think of it, and I am sorry.'),
  K66V('Change whatever you like. You do not have to tell me any of it.')]:[
  ['','Three in the morning. The light is on in the security room off the kitchen, the room she drew on the back of your plans. She is in there with every door in the house on eight screens and her back to the one wall without a door in it.'],
  ['','Through the glass you can see her lips moving. She is counting doors in numbered steps. Every time she gets to four she stops and goes back to one.'],
  ['','You have had the master card in your wallet since the house was finished. It opens every lock in the house and changes any of them. Standing in the kitchen at three in the morning, you understand that you never gave it to her, and that she has been sitting in there every night trying to work out who else has it.'],
  ['',door],
  ['','You put the water by the keyboard and the card beside it.'],
  K66V('It is yours. I should have given it to you the night you came upstairs. I did not think of it, and I am sorry. Change whatever you like.')];
 const hers=()=>{S.f.k66Codes='hers';apply({aff:3});calm(4);save();say(m?[
   K66MV('all of them. even urs.','all of them. even yours.','All of them. Yours too.','All of them. Yours too. I need to be the only one, V, for a bit. I don’t know how long a bit is.'),
   K66V('Then all of them.'),
   ['','Forty-one locks. It takes you until five. He sits on the floor of the corridor outside with his back to the wall and doesn’t look in once. The grey hound lies across his shins.'],
   ['','At five he tries his own bedroom door on the screen, to show you it won’t open for him. It doesn’t. He stands there in his socks and knocks on it, politely, like a man at a bank, and you let him in from the keyboard.']]:[
   ['','She changes all of them. Forty-one locks, yours included. It takes her until five. You sit on the floor of the corridor with your back to the wall and do not look in, and the grey hound lies across your shins.'],
   ['','At five you try your own bedroom door, so that she can watch it not open for you on the screen. It does not open. You knock on it, and wait, and after a moment the lock goes, from the keyboard downstairs.'],
   K66V('Thank you.'),
   K66MV('...welcome.','ur welcome. weirdo.','You’re welcome. You’re a weirdo.','You’re welcome. You knocked on your own door. You’re such a weirdo, V. Go to bed.')],hub)};
 const both=()=>{S.f.k66Codes='both';apply({aff:3});calm(4);save();say(m?[
   K66MV('the rest are mine. urs stays.','the rest are mine. leave urs.','The rest are mine. I’ll leave yours.','The rest are mine. I’ll leave yours. One other person in this house gets to open one door, and it’s you, and I picked that.'),
   ['','Forty locks. It takes you until half past four. He brings a second glass of water at four, knocks, and leaves it outside the door on the floor without coming in.'],
   K66MV('(one. front door. mine. two. kitchen. mine. three...)','(one: front door, mine. two: kitchen, mine.)','(One: front door, mine. Two: kitchen, mine. Three: the yard, mine. Four: his. Four is his. Fine.)','(One: front door, mine. Two: kitchen, mine. Three: the yard, mine. Four: his room, his. I know who’s got four. I know exactly who’s got four.)')]:[
   K66V('If you are willing, leave my door as it is. I would like one door in this house that I can open without waking you.'),
   K66MV('ok. ur door.','ok. ur door stays. the rest are mine','Fine. Your door stays. The rest are mine.','Fine. Your door stays. The rest are mine. One other person in this house gets to open one door, and it’s you. I picked that. Go away now.'),
   ['','Forty locks. It takes her until half past four. At four you put a second glass of water on the floor outside the room, knock, and go. Through the glass, when you look back from the kitchen, she is counting on her fingers, and at four she stops and nods and goes on to five.']],hub)};
 say(L,()=>ask(m?'hitmeuppp':'K9',m?'(The card is on the desk. He has stepped back out of the doorway.)':'(The card is on the desk.)',m?[
  {t:'Change every code. His too.',fn:hers},
  {t:'Change every code but his.',fn:both}]:[
  {t:'Ask for nothing.',fn:hers},
  {t:'Ask her to leave your door.',fn:both}]))}

/* ===================================== ACT II: third at regionals ===================================== */
function k66Troph(){go(cutBg('#0e0c08'));k66Mark('vm_troph');const m=k66M();
 const L=[
  ['',m?'V puts a carrier bag on the kitchen island and says nothing. With V that means it cost a lot.':'You put a carrier bag on the kitchen island and say nothing. She looks at the bag, and at you, and puts her spoon down.'],
  ['','Inside is a trophy: a plastic gold figure on a marble-effect base, holding a protractor over its head like a sword. The plate says REGIONAL MATHEMATICS CHALLENGE, JUNIOR, THIRD PLACE, and the year '+(m?'you were':'she was')+' eleven.'],
  K66MV('...no.','no. no way. where','Where did you get this?','Where did you get this? V. I pawned this for three dinners when I was eleven. I had the ticket for years.'),
  K66V('The ticket was in the back of your go-bag, in the calculus book. The pawn shop closed nine years ago. Its stock went to a man with a stall under the flyover, who still had it, because nobody else came third in your year.'),
  K66V('He asked four hundred dollars. He had seen my watch. I paid it.'),
  K66MV('it’s worth 3 bucks','it’s worth like three dollars','It’s worth three dollars. The protractor comes off.','It cost three dollars to make and the protractor comes off if you breathe on it. He saw you coming from the end of the street.'),
  K66V('He did. He also kept it for nine years. I considered that worth the difference.'),
  ['',m?'He has printed the paper from that year, too, off the competition’s archive. Thirty questions, forty minutes, no calculator. He puts the kitchen timer on the island and sets it without asking.':'You have printed the paper from that year off the competition’s archive. Thirty questions, forty minutes, no calculator. You set the kitchen timer without asking. She has a pencil before it starts ticking.'],
  ['',m?'You get twenty-nine in thirty-one minutes. Question seventeen is wrong. It was wrong when you were eleven, too, the same mistake in the same place, and you laugh until the black hound comes in to check on you.':'She gets twenty-nine in thirty-one minutes. Question seventeen is wrong; she says it was wrong when she was eleven, too, the same mistake in the same place, and she laughs until the black hound comes in to check on her. You have not heard that laugh in this kitchen since before.'],
  K66V('Twenty-nine. First place, that year, scored twenty-seven.'),
  K66MV('...shut up.','shut up. are u serious','Shut up. I’d have won?','Shut up. I’d have won. Eleven-year-old me would have won if she’d had a table and a lamp. Write that down. Don’t write that down.')];
 const shelf=()=>{S.f.k66Troph='shelf';apply({aff:3});calm(3);save();say([
   ['',m?'It goes on the shelf in the security room, above the screens, where you can see it at three in the morning. He puts it up himself with a spirit level. The protractor falls off twice. You glue it.':'It goes on the shelf in the security room, above the screens, where she will see it at three in the morning. You put it up with a spirit level. The protractor falls off twice. She glues it, and holds it in place for the full four minutes on the tube.'],
   K66MV('third place. at 3am. good.','third place, watching the doors.','Third place, on night watch.','Third place, on the night watch. Promoted. Somebody in this house finally has a medal.')],hub)};
 const pawn=()=>{S.f.k66Troph='pawn';apply({aff:3});save();const r=k66Rom();say([
   K66MV('we’re pawning it again. dinner','we’re pawning it again. for dinner','We’re pawning it again. For dinner.','We’re pawning it again. For dinner. That’s what it’s for. That’s what it was always for.'),
   ['','The man under the flyover offers twelve dollars for it. He has never seen V before, but he looks at the watch for a long time.'],
   ['',r?(m?'Twelve dollars is two bowls of noodles and one beer, and you split the beer. Under the table you hook your ankle round his, and you tell him dessert is at home and costs a lot more than twelve dollars, and he asks for the bill before the noodles have arrived.':'Twelve dollars is two bowls of noodles and one beer, split. Under the table she hooks her ankle round yours and tells you that dessert is at home and costs a great deal more than twelve dollars. You ask for the bill before the noodles have arrived.')
    :(m?'Twelve dollars is two bowls of noodles and one beer, split, with the hounds’ leads tied round the chair legs. You tell him about question seventeen for an hour. He listens to all of it.':'Twelve dollars is two bowls of noodles and one beer, split, with the hounds’ leads tied round the chair legs. She tells you about question seventeen for an hour, and you listen to all of it.')],
   ['',m?'The next morning the trophy is back on the island, and the man under the flyover has started calling him “sir”. You never ask what that cost.':'The next morning you are under the flyover at seven. He has put the price back up to four hundred dollars. You pay it.']],hub)};
 say(L,()=>ask(m?'hitmeuppp':'K9',m?'(Where does it go?)':'(She is holding it like a rifle.)',m?[
  {t:'The shelf in the security room.',fn:shelf},
  {t:'“we’re pawning it again.”',fn:pawn}]:[
  {t:'Clear a shelf for it in the security room.',fn:shelf},
  {t:'Offer to take her to pawn it again.',fn:pawn}]))}

/* ===================================== ACT III: the house, before the boat ===================================== */
function k66House(){go(cutBg('#08080e'));k66Mark('vm_house');const m=k66M(),c=S.f.k66Codes,mode=k66Mode();
 const L=[
  ['',m?'Two nights before the boat, V walks you round the house with a clipboard, room by room, in the voice he uses for the hounds’ weights.':'Two nights before the boat, you walk her round the house with a clipboard, room by room, in the voice you use for the hounds’ weights.'],
  K66V('The house is in your name. It has been since the spring; the papers are with the lawyer. The hounds are yours. Their weights and doses are in the blue folder by the kettle. The old hound will not eat from a bowl you are holding. Put it down and leave the room.'),
  K66MV('stop.','stop. ur not dying.','Stop it. You’re not dying on a boat.','Stop it. Nobody’s dying on a boat, V, on a yacht full of bankers. I’ve seen scarier vending machines.'),
  K66MV('and if i don’t come back','and if it’s me that doesn’t come back','And if it’s me that doesn’t come back?','And if it’s me? If I don’t come back. What’s on your clipboard for that?'),
  K66V('Lex talionis. An eye for an eye.'),
  K66V('I would not stop at the eye. Then I would come home and feed the hounds, because they would be hungry. I would like you to know both of those things.')];
 if(c==='hers')L.push(K66MV('front door’s 0311.','front door’s 0311. all of them are','Every lock in the house is 0311.','Every lock in the house is 0311. All forty-one. In case you have to get in without me. And for when we both get back.'),
  K66V('Third, at eleven.'),
  K66MV('ya.','yeah. don’t make it a thing.','Yeah. Don’t make it a thing.','Yeah. Don’t make it a thing. You’re making it a thing. You’re writing it down.'));
 else if(c==='both')L.push(K66V('I changed the code on my door last week. It was the only one I was allowed. It is 0311.'),
  K66MV('that’s MINE','that’s MY number. third at eleven','That’s my number. That’s all of mine.','That’s my number, V. Third at eleven. Every other lock in this house is 0311. You picked my number for the one door I left you.'),
  K66V('I know. I read the log.'));
 if(mode==='set')L.push(['',m?'At ten he goes to bed, because the old hound refuses to go up without him. You sit on the end of his bed with the rifle across your knees and your back to the footboard. He sleeps three and a half hours, as always. You don’t sleep at all. At half past one he wakes, exactly on time, and sees you still there. He gets up without telling you to go to bed, and makes two cups.':'At ten you go to bed, because the old hound will not go up without you. She sits on the end of your bed with the rifle across her knees and her back to the footboard. You sleep three and a half hours, as always. At half past one you wake, exactly on time, and she is still there. You get up without telling her to go to bed, and make two cups.']);
 else L.push(['',m?'At ten you make him come to bed, properly, under the covers. '+(mode==='wed'?'The rings go on the bedside table by the water. ':'')+'He sleeps three and a half hours, as always. You stay awake the whole time with your hand flat on his chest and the rifle against the headboard, watching the door.':'At ten she makes you come to bed, properly, under the covers. '+(mode==='wed'?'The rings go on the bedside table by the water. ':'')+'You sleep three and a half hours, as always. When you wake she is lying on her side with her hand flat on your chest and the rifle against the headboard, watching the door.'],
  K66MV('ur turn to sleep. mine to watch','go back to sleep. i’ve got the door','Go back to sleep. I’ve got the door.','Go back to sleep. Four more hours. I’ve got the door, V. I designed the door.'),
  ['',m?'He goes back to sleep. He has never once in his life slept past half past one. He sleeps until six, and wakes up furious about it, and you laugh into his shoulder until the hounds start barking downstairs.':'You go back to sleep. You have never slept past half past one in your adult life. You sleep until six, and wake up furious, and she laughs into your shoulder until the hounds start barking downstairs.']);
 say(L,k66Fin({aff:3},hub))}

/* ===================================== EPILOGUE: audit night, a year on ===================================== */
function k66Epi(){go(cutBg('#06080c'));k66Mark('vm_epi');const m=k66M(),a=S.f.k66Audit,t=S.f.k66Troph,mode=k66Mode();
 const L=[['',m?'Audit night, a year on. You go over the back wall at half past two. The overlap is still eleven centimetres. He never fixed it, because you told him not to.':'Audit night, a year on. At half past two the camera on the back wall shows eleven centimetres of nothing, and then nothing again. You never fixed the overlap. She told you not to.']];
 if(k66Apart())L.push(['',m?'He does not leave his door open any more. You get in at ten past three and tick it off on the clipboard and go back down. In the morning the report is on the island, and under your score, in fountain pen, he has written “Noted.” and the time.':'You do not leave your door open any more. She gets in at ten past three, ticks it off and goes back down the stair without coming in. In the morning her report is on the island. You write “Noted.” and the time under her score, and leave it where it was.']);
 else if(a==='date'&&mode!=='set')L.push(['',m?'His door is open an inch. On the floor in front of it somebody has chalked MINUS TWO, and beside that, on a card, in fountain pen: “I have been informed of the penalty. I am prepared to pay it.”':'You leave your door open an inch, and chalk MINUS TWO on the floor in front of it, and beside that a card: “I have been informed of the penalty. I am prepared to pay it.”'],
  K66MV('...u PREPARED?','u prepared. u wrote a card.','You prepared. You wrote me a card.','You prepared. You wrote me a card, V, in fountain pen, about the penalty. Move over.'),
  ['',m?'He moves over. The house logs fourteen alerts from the bedroom before four. You mark them all false in the morning, in red, and he initials every one under yours.':'You move over. The house logs fourteen alerts from the bedroom before four. In the morning she marks them false in red, and you initial every one under hers.']);
 else L.push(['',m?'His door is open an inch. He is sitting up in bed with a binder on his knees, labelled AUDITS in his small capitals, with last year’s report in the first sleeve and room for forty more.':'You are sitting up in bed with a binder on your knees, labelled AUDITS in your small capitals, with last year’s report in the first sleeve and room for forty more.'],
  K66V('Volume one. I have allowed for growth.'),
  K66MV('40 years of 7s','forty years of sevens. u optimist','Forty years of sevens. You optimist.','Forty years of sevens, V. You absolute optimist. Shove over, I’m cold, and the black hound’s still a disgrace.'));
 if(t==='shelf')L.push(['','The trophy is still above the screens in the security room, with a ring of glue round the protractor. '+(m?'You say goodnight to it.':'She says goodnight to it.')]);
 else if(t==='pawn')L.push(['','The trophy has been pawned eleven times this year, for dinner. The man under the flyover charges V four hundred dollars every morning after, and V pays it every time. It is the most expensive meal in the city and it is noodles.']);
 if(S.f.lp60Fly==='more')L.push(['',m?'On Thursdays you fly over the house at two thousand feet and mark the roof down in red pen. You’ve told him the roof is a weak point. He has started standing on it on Thursdays, at ten past three, so that it isn’t.':'On Thursdays she flies over the house at two thousand feet and marks the roof down in red pen. She has told you the roof is a weak point. You have started standing on it on Thursdays at ten past three, so that it is not.']);
 if(mode==='wed'&&!k66Apart())L.push(K66V('Married people are allowed to give each other a key. I asked the lawyer.'),K66MV('no.','no. break-ins only.','No. Break-ins only.','No. Break-ins only. I’ll get in on my own, every year, until you’re ninety. Write that down.'));
 say(L,k66Fin({aff:2},hub))}

/* ===================================== THE MORNING AFTER ===================================== */
EVENTS.push({id:'k66_morn',when:()=>{try{return K66()&&k66Rom()&&S.f.k66Audit==='date'&&!k66Apart()&&(S.phase==='normal'||S.phase==='epilogue'&&k66Done('vm_epi'))}catch(e){return false}},run:done=>{const m=k66M(),wed=!!S.f.married;say(m?[
 ['','You wake at noon in V’s bed, face down, shirtless, with the old hound across your calves. V is awake. V has been awake since half past five, because he slept his three and a half hours and not a minute more. He hasn’t got up, because you are lying on his arm.'],
 K66V('I have lost the arm. I have decided to let you keep it.'),
 K66MV('...time','what time is it','What time is it? Why didn’t you get up?','What time is it? Why didn’t you get up? You’ve been lying there six hours. You could have rolled me.'),
 K66V('Twelve minutes past twelve. I have spent the time on the notebook.'),
 ['','The notebook is open on his chest. The last entry is dated last night, and it has a line through it, firmly, in the same pen.'],
 K66MV('what did i say','what did i SAY','What did I say? Why is it crossed out?','What did I say last night? Why is it crossed out? V, you never cross anything out.'),
 K66V('I crossed it out because I could never read it aloud at breakfast without having to sit down. I have it memorised.'),
 K66V('There is also a matter I should have raised last night, as a physician. I have a list.'),
 K66MV('the doctor list. no.','oh my god. the doctor list','Oh my god. You’re doing the doctor list. Now?','Oh my god. You’re doing the doctor list. Naked. At noon. Go on then, doctor.'),
 K66V('Item three is contraception.'),
 K66MV('nothing in there. born that way or sold. no refunds','nothing in there, V. born that way or sold before i was nine. no refunds','There’s nothing in there to worry about. I was born that way or somebody sold it before I was nine. No refunds either way.','Item three’s covered. Either I was born without one or somebody sold it before I was nine, I’ve never found out which, and either way, no refunds. Strike it.'),
 K66V('Struck.'),
 ['','He puts a neat line through item three. There are eleven items. You make him read you the rest in the flat voice, and by item seven you are both laughing so hard the old hound gets off the bed in protest.'+(wed?' His ring is still on the bedside table. Yours is on your thumb, where you sleep with it.':'')]]:[
 ['','You slept three and a half hours, as always, and woke at half past five, as always. You have not got up. She is lying across your arm, face down, shirtless, with the old hound across her calves, and you have decided the arm is hers now.'],
 ['','You spend the six hours on the notebook. At ten past twelve you put a line through last night’s entry, firmly, because you will never be able to read it aloud at breakfast without having to sit down. You have it memorised.'],
 K66MV('...u crossed something out','u crossed something out. u never cross anything out','You crossed something out. You never cross anything out.','You crossed something out. What did I say? V. What did I say last night?'),
 K66V('Something I will not be repeating before noon. It is twelve minutes past. I will not be repeating it after noon either.'),
 K66V('There is also a matter I should have raised last night, as a physician. Item three is contraception.'),
 K66MV('nothing in there. born that way or sold. no refunds','nothing in there, V. born that way or sold before i was nine. no refunds','There’s nothing in there to worry about. I was born that way or somebody sold it before I was nine. No refunds either way.','Item three’s covered. Either I was born without one or somebody sold it before I was nine, I’ve never found out which, and either way, no refunds. Strike it.'),
 K66V('Struck.'),
 ['','You put a neat line through item three. There are eleven items. She makes you read her the rest, and by item seven she is laughing into the pillow so hard that the old hound gets off the bed in protest, and you have to stop and start item seven again.'+(wed?' Your ring is on the bedside table. Hers is on her thumb, where she sleeps with it.':'')]],()=>{apply({aff:3});done()})}});

/* ===================================== THREADS ===================================== */
/* Misaki's phone: V, the day after audit night */
txDef('tx_k66_m',{with:'v',pov:'m',prio:1,when:()=>K66()&&k66Done('vm_audit')&&['normal','epilogue'].includes(S.phase)&&tier()>=1,nodes:{
 start:{in:()=>['Your red pen was under my pillow.','There is red ink on my left shoulder. It appears to say 7/10.'],expire:3,
  opts:()=>{const o=[];if(k66Rom())o.push({t:'“7 is generous”',fx:()=>apply({aff:2}),reply:()=>['I have read the scale.','Seven out of what?'],next:'scale'});
   o.push({t:'“that’s the house’s score”',fx:()=>apply({aff:1}),reply:()=>['The house has never scored below nine.','I would like a breakdown.'],next:'house'});
   o.push({t:'“wash it off”',fx:()=>apply({aff:1}),reply:()=>['No.','I am in a board meeting. The chairman has asked about my shoulder. I said it was a filing error.']});return o}},
 scale:{in:()=>['I am asking for my records.'],
  opts:()=>[{t:'“out of 10. room for improvement”',fx:()=>apply({aff:2}),reply:()=>['Noted.','I have cleared my evening.']},
   {t:'“out of 7.”',fx:()=>apply({aff:3}),reply:()=>['I am in a board meeting.','I am going to have to remain seated for some time.']}]},
 house:{in:()=>['Item by item, please.'],
  opts:()=>[{t:'“the study window sticks. -1”',fx:()=>apply({aff:1}),reply:()=>['I will have it fixed.','I will not have it fixed. You would have to come in another way.']},
   {t:'“the black hound. -2. a disgrace”',fx:()=>apply({aff:2}),reply:()=>['It sat on your boot.','It has never sat on mine.','I have reprimanded it. It wagged.']}]}}});
/* V's phone: Misaki, inside the house, round two */
txDef('tx_k66_v',{with:'m',pov:'v',prio:1,when:()=>K66()&&k66Done('vm_audit')&&S.phase==='normal'&&tier()>=1,nodes:{
 start:{in:()=>['round 2','i’m in ur house','guess where'],expire:3,
  opts:()=>{const o=[{t:'“The study.”',fx:()=>apply({aff:1}),reply:()=>['wrong. ur reading glasses are on the desk tho. i’m wearing them'],next:'two'},
   {t:'“The kennel.”',fx:()=>apply({aff:1}),reply:()=>['wrong. but the black one just walked past me and didn’t even look up','DISGRACE'],next:'two'}];
   if(k66Rom())o.push({t:'“My bed.”',fx:()=>apply({aff:3}),reply:()=>['how did u know','did a sensor go','i disarmed all of them'],next:'bed'});return o}},
 two:{in:()=>['colder. u have 10 min then i win'],
  opts:()=>[{t:'“I am coming up the back stair.”',fx:()=>apply({aff:2}),reply:()=>S.f.k58Stair==='his'?['step on it so i know it’s u','...i heard it. ok. hi']:['step over the 7th or u fail','...ok u passed. hi']},
   {t:'“I forfeit.”',fx:()=>apply({aff:1}),reply:()=>['u can’t forfeit ur own house','ok fine. u owe me cereal','i’m on the roof. bring the cereal up']}]},
 bed:{in:()=>['ok yes. ur bed. i’m in it'],
  opts:()=>[{t:'“I am in a board meeting.”',fx:()=>apply({aff:2}),reply:()=>['i know','that’s why i’m telling u now','have a good meeting v']},
   {t:'“I will be home in twenty minutes.”',fx:()=>apply({aff:3}),reply:()=>['the meeting’s for an hour','...','ok. 20. step on the stair']}]}}});

/* ===================================== DELIVERY ===================================== */
const K66B=[
 {id:'vm_audit',t:()=>k66H('Audit night: get into V’s house by four','Audit night: Misaki is coming for the house'),sub:()=>'costs time · late · the security '+k66H('you','she')+' designed',when:()=>S.phase==='normal'&&tier()>=2,run:k66Audit},
 {id:'vm_codes',t:()=>k66H('The security room, at three','The light in the security room, at three'),sub:()=>'costs time · the master card',when:k66Post,run:k66Codes},
 {id:'vm_troph',t:()=>k66H('V has a carrier bag','Give Misaki the carrier bag'),sub:()=>'costs time · the stall under the flyover',when:k66A2,run:k66Troph},
 {id:'vm_house',t:()=>k66H('V walks you round the house','Walk Misaki round the house'),sub:()=>'costs time · before the boat',when:k66A3,run:k66House},
 {id:'vm_epi',t:()=>'Audit night, a year on',sub:()=>'costs time · the back wall',when:()=>S.phase==='epilogue'&&(!!S.f.k58End||!S.f.k58_creak),run:k66Epi}];
function k66Due(){if(!K66())return null;for(const b of K66B){if(k66Done(b.id))continue;let ok=false;try{ok=!!b.when()}catch(e){}if(ok)return b}return null}
const _shK66=sideHub;sideHub=function(late){const o=_shK66(late);try{if(!K66())return o;const b=k66Due();if(!b)return o;
 return o.concat([{t:'♥ '+b.t(),sub:b.sub(),dis:!!late,fn:()=>{spend();b.run()}}])}catch(e){return o}};

/* ===================================== ENDINGS ===================================== */
const _xeK66=extraEnding;extraEnding=function(){const L=_xeK66();try{if(!S||!S.f||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,apart=f.k58End==='apart';
 if(f.k66Audit==='date'&&!apart&&!f.k66Set)L.push('Once a year Misaki breaks into V’s house by four in the morning. The audit report for that night has never been written. The bedroom sensor logs a great many false alarms.');
 else if(f.k66Audit==='date')L.push('Misaki still audits V’s house once a year. She leaves the report on the island, and in the morning V writes “Noted.” under the score.');
 else if(f.k66Audit)L.push('In the security room of V’s house there is a binder labelled AUDITS. The house has scored seven out of ten every year. The black hound is always marked down.');
 if(f.k66Codes==='hers')L.push('Every lock in V’s house is 0311: third, at eleven. Only Misaki can change them. V knocks on his own bedroom door, and she lets him in.');
 else if(f.k66Codes==='both')L.push('Forty locks in V’s house answer only to Misaki. The forty-first is V’s bedroom door, and its code is 0311.');
 if(f.k66Troph==='shelf')L.push('Above the screens in the security room there is a third-place trophy with a glued protractor. Misaki says goodnight to it.');
 else if(f.k66Troph==='pawn')L.push('A man with a stall under the flyover has sold the same three-dollar trophy back to V for four hundred dollars more times than he can count.');
 if(S.seen&&S.seen.k66_morn&&!apart)L.push('There is one crossed-out line in V’s notebook. He has never read it aloud, and he knows it by heart.')}catch(e){}return L};
