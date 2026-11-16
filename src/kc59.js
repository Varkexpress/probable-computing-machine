/* ===================== THE WAR BEFORE THE VAN (kc59) =====================
   Makes the abduction earned. While Misaki works, the outfit she hurts most (captorOrg(), from S.orgs) notices, asks,
   warns and circles; the four men on the eventual list are glimpsed before the van (the driver, the radio man, the
   note-taker, the one who brought water); Inspector Hale runs through every phase with one want (a boss in a courtroom);
   V reads the same war in his ledgers, his meetings and his hunts. Notes: docs/notes_world.md.
   State: S.f.w59 = {st:{'m:syn':1..}, g:{driver:'m'|'v'}, rec:{}, day, ...}. Beats are scheduled one per morning
   (w59Next) so the build-up is seen inside the short normal phase. Same rules as the rest: unnamed city, dollars,
   the hounds unnamed in text, no new named characters (underlings unnamed; the bosses are ORG's). */
const W59=()=>{try{return !!S&&!isLone()}catch(e){return false}};
const w59F=()=>{if(!S.f.w59)S.f.w59={st:{},g:{},rec:{},day:-9};return S.f.w59};
const w59Lead=()=>captorOrg();
const w59Lv=k=>(S.orgs&&S.orgs[k])||0;
const w59Me=()=>S.pov!=='v'?'m':'v';
const w59O=k=>ORG[k]||ORG.sato;
const w59Seen=id=>!!(S.seen&&S.seen[id]);
const w59G=(id,who)=>{const g=w59F().g;return who?g[id]===who:!!g[id]};
/* the man she killed for that outfit, if she has; otherwise the one in the canal (takenM: every captor lost one there) */
const w59Did=k=>{const t=TARGETS.find(t=>t.org===k&&S.f['done_'+t.id]);return t?t.n:null};
const w59Bump=(k,n)=>{S.orgs=S.orgs||{};S.orgs[k]=(S.orgs[k]||0)+n};
/* ---------- each outfit, and how it notices ---------- */
const W59ORG={
 syn:{
  mN:()=>[['','The card game under the flyover. A collector Misaki knows by his rings sits down across from her without buying in.'],
   ['','He lays a marker on the felt. It has her lot number on it, and under that, in pencil, '+(w59Did('syn')?w59Did('syn')+'’s name with a line through it.':'the date a man went into the canal in the spring.')],
   ['','“Mr. Kinsella would like to know who has been cutting his earners,” he says, and he leaves the marker there when he goes.']],
  mW:()=>[['','There is a page from a loan book under the trailer door. Her name is written in the debtor column. The principal is “'+(w59Did('syn')||'canal')+', one,” and the interest is compounding daily, from the day he died.'],
   ['','Someone has worked out today’s total in the margin and circled it. It is more money than exists.']],
  vL:'Kinsella’s cheque-cashing chain wired forty thousand dollars to a vehicle auction on Tuesday, for one grey van with a sliding door, and paid a retainer to a payee listed only as “driver.”',
  vA:()=>[['','A charity lunch. Kinsella himself sits down beside V, uninvited, and cuts his steak into very small pieces.'],
   ['Kinsella','Your foundation has volunteers. One of them is short, with a star in her hair. She owes me money. Quite a lot. You could settle it for her and we would all be friends.']],
  hunt:{n:'One of Kinsella’s collectors',d:'Breaks students’ hands for interest. Has been asking at the card games about a girl with a star clip.'},
  front:'a cheque-cashing company that belongs to Kinsella'},
 pike:{
  mN:()=>[['','Somebody has been in the trailer. Nothing is missing. The cereal box has been turned to face the front, and the bed is made, with the corners tucked, which she has never once done.'],
   ['','Pike Property Group keeps a copy of every key it has ever cut. Darren Pike used to tell people that at parties'+(w59Did('pike')?', before she poisoned him.':'.')]],
  mW:()=>[['','A letter on Pike Property Group paper, signed by Mrs. Pike in green ink: the trailer lot has been acquired, and all tenants are “under review.”'],
   ['','A man in a hi-vis vest is photographing her door “for the inventory.” He photographs her as well, without asking, and writes the time on his clipboard.']],
  vL:'A shell company bought the trailer lot outright last week, cash, no survey. The shell’s registered agent is Pike Property Group, and it has already paid a locksmith to cut a key for every door on the lot.',
  vA:()=>[['','Mrs. Pike calls the foundation on the main line and asks for V by his full name.'],
   ['Mrs. Pike','We have a tenant of interest on a lot we just acquired. I’m told she visits your house. I’d like to know which nights, so we don’t disturb you.']],
  hunt:{n:'Pike’s locksmith',d:'Cuts copies of every key on Pike’s lots and sells them by the street. Cut a full set for the trailer lot on Thursday.'},
  front:'a lettings agency that belongs to Pike Property Group'},
 grant:{
  mN:()=>[['','A drone crosses the trailer lot twice at dusk, low and slow, and hangs for a moment over her roof.'],
   ['','In the morning a van marked GRANT SECURITY SOLUTIONS is parked by the gate. Two men in lanyards put a camera on the lamp post opposite her door, and angle it carefully.']],
  mW:()=>[['','An email from Grant Industries’ legal team, very polite, with a still from that camera attached. It is her face, at three in the morning, coming home with blood on her sleeve.'],
   ['','“Director Vance would welcome a conversation at your earliest convenience.” There is no phone number. They will come to her.']],
  vL:'Grant Industries’ security budget has a new line called “special project,” and under it a short lease on a river warehouse, a van, and a doctor who does not bill through any hospital.',
  vA:()=>[['','A donor evening. Director Vance shakes V’s hand and keeps hold of it while he talks.'],
   ['Director Vance',(S.f.done_hollis?'Hollis was a friend. I’m reviewing everyone who was near him in his last month.':'One of my men went into a canal this spring. I’m reviewing everyone who was near him.')+' One of your volunteers keeps coming up. Small, a star clip. I’d like to borrow her for an hour.']],
  hunt:{n:'Grant’s camera man',d:'Installs the cameras and watches the feeds. Put one on a lamp post opposite a trailer on Monday.'},
  front:'a fleet account that belongs to Grant Industries security'},
 mori:{
  mN:()=>[['','A city inspector condemns the trailer’s power hook-up. He shows her the form. Where it says “referred by,” somebody has written “the office of Aide Tanner.”'],
   ['','She reconnects it with a coat hanger the minute he’s gone.']],
  mW:()=>[['','A beat cop she has never seen stops her outside the corner store and says, quite kindly, that Councilman Morrow’s office has been asking for her file.'],
   ['','“You haven’t got a file, so they asked me to start one,” he says, and he takes her picture with his phone before she can turn her face.']],
  vL:'Morrow’s re-election fund paid a private investigator three thousand dollars. On the invoice, under “subject,” somebody has typed “trailer lot, east side, the short one.”',
  vA:()=>[['','City hall, about the shelter permits. Aide Tanner keeps V waiting forty minutes and then sees him in a corridor.'],
   ['Aide Tanner','The councilman has lost some friends this year. He’s been told your foundation knows a girl who helps people lose friends. He’d like her name.']],
  hunt:{n:'Morrow’s investigator',d:'Photographs people for the councilman and sells the copies twice. Has a roll of a trailer lot in his car.'},
  front:'a parking contractor that belongs to Morrow’s people'},
 sato:{
  mN:()=>[['','A scout in the city square, with a lanyard and a soft voice, offers her a card: Sutton’s agency, always looking for new faces.'],
   ['','He takes her picture before she has said no, and then he says thank you and walks off very quickly.']],
  mW:()=>[['','A comp card under the trailer door. It is her photograph from the square, with her height, her weight and her shoe size printed underneath.'],
   ['','They are all correct. On the back, in biro, somebody has written “Ms. Crowder wants this one in person.”']],
  vL:'Sutton’s agency booked a “location shoot” for next week at a river warehouse, hired a van with no logo, and bought four cases of bottled water and a camp bed.',
  vA:()=>[['','Ms. Crowder asks the foundation to sponsor a new-talent showcase. She brings a portfolio, and the last page in it is a photograph of Misaki.'],
   ['Ms. Crowder','I’m looking for this girl. She took something of ours. '+(S.f.done_sato?'Mr. Sutton, specifically.':'A driver, in the spring. The canal.')+' I’m told you know her.']],
  hunt:{n:'One of Sutton’s scouts',d:'Finds the girls in the first place. Has photographed a short one with a star clip three times this week.'},
  front:'a model-transport service that belongs to Sutton’s agency'},
 reyes:{
  mN:()=>[['','The noodle stand has a board where its window was. The owner has two fingers taped together and serves her without looking up.'],
   ['Noodle guy','They asked for you. I said I didn’t know you. They did this so I would remember you next time.']],
  mW:()=>[['','A paper bag on the trailer step. Inside it there is a set of brass knuckles wrapped in a napkin from the card den, and the napkin is wet.'],
   ['','There is no note. Marco Reyes never leaves notes. He says notes are for people who can’t make themselves understood.']],
  vL:'The Reyes crew cleared its whole debt book in one weekend, which it has never done, and paid cash at a scrapyard for a van with the plates off.',
  vA:()=>[['','A boxing gym the foundation pays for. Marco Reyes is in the ring with nobody, and he keeps his gloves on while he talks.'],
   ['Marco Reyes',(S.f.done_reyes?'My brother ran a card game. Somebody put him in a cup of tea.':'One of my guys went in the canal this spring with his shoes on.')+' I hear it was a girl, and I hear she eats at your house.']],
  hunt:{n:'Reyes’ debt man',d:'Collects for the card den and broke a noodle seller’s fingers on Wednesday, asking for a girl.'},
  front:'a scrap dealer that belongs to the Reyes crew'},
 lark:{
  mN:()=>[['','A sample bottle in her mailbox, gift-wrapped: Lark Wellness sleep tonic, complimentary. The seal has been opened and pressed shut again.'],
   ['','She pours it down the sink, and the sink smells like a hospital for an hour.']],
  mW:()=>[['','A man in a Lark Wellness polo shirt knocks with a clipboard. A free health survey for residents. The first question is her blood type.'],
   ['','The second is whether she has any allergies, and the third is how much she weighs. He doesn’t write her answers down. He already has numbers in the boxes.']],
  vL:'Lark Wellness placed an order for veterinary sedative, enough for a large dog for a month, to be delivered to an address on the river where nobody keeps a dog.',
  vA:()=>[['','A medical fundraiser. Lark Jr. finds V by the coats and asks about his animals, at length, and then about something else.'],
   ['Lark Jr.',(S.f.done_lark?'My father’s customers miss him. I’m told a small person with a star in her hair was on the roof across the street.':'Our courier went into the canal this spring. I’m told a small person with a star in her hair was the last one to see him.')+' Do you know her weight, roughly? For dosing. I’m joking.']],
  hunt:{n:'Lark’s delivery man',d:'Drops the company’s sedatives at addresses where there are no patients. Dropped a case on the river on Friday.'},
  front:'a pharmacy courier that belongs to Lark Wellness'},
 hale:{
  mN:()=>[['','A man with an armful of pamphlets stops her at the gate of the lot. He asks her name, and before she can lie he says it for her.'],
   ['','“We’ll pray for you, Misaki,” he says. “The Fellowship prays for everyone by name. Deacon Price chooses the names.”']],
  mW:()=>[['','A Fellowship flyer is taped to every lamp post on her road, with her photograph on it. PRAY FOR THIS SOUL. There is a phone number, and it rings a church.'],
   ['','Somebody at the bus stop crosses himself when she walks by.']],
  vL:'The Fellowship moved the whole collection plate for a month into a “retreat fund.” The retreat is a river warehouse, and its first purchase was a van.',
  vA:()=>[['','An interfaith breakfast. Deacon Price holds V’s hand across the table to say grace and does not let go afterwards.'],
   ['Deacon Price',(S.f.done_hale?'Pastor Holloway was taken from us.':'One of our brothers was taken from us this spring. The canal.')+' We forgive whoever did it, of course. But we would like to meet her first, so that the forgiveness has somewhere to go.']],
  hunt:{n:'A Fellowship doorman',d:'Knocks on doors with pamphlets and writes down who lives alone. Has written down a trailer on the east side.'},
  front:'a minibus hire company that belongs to the Fellowship'}};
const w59Org=k=>W59ORG[k]||W59ORG.sato;
/* ---------- the four, before ---------- */
const W59G={
 driver:{m:()=>[['','A grey van idles by the fence of the trailer lot with no front plate and the driver’s window down. The man behind the wheel is singing along to the radio, the bank jingle, and he knows every word.'],
   ['','He has a nice voice. He sees her looking and lifts two fingers off the wheel, the way drivers do on country roads.'],
   ['hitmeuppp',MV('(cute.)','(guy’s got pipes. wasted on a bank.)','(He’s got a good voice, honestly, wasted on a bank.)','(Good voice. Wasted on a bank. I wave back, because I’m a fucking idiot who waves at vans.)')]],
  v:()=>[['','Two in the morning. V sits in the car at the end of her road with the lights off. He does this some nights, and he does not call it anything.'],
   ['','A grey van with no front plate goes past the lot twice and stops the third time, by her fence. The driver has his window down and is singing the bank jingle to himself, very well.'],
   ['','It drives off at half past. V writes the time down, and the half of the rear plate he could see.']]},
 radio:{m:()=>[['','The laundromat by the lot. A big man holds the door with his boot and a cheap radio in his other hand, playing the bank jingle.'],
   ['','When it ends he winds the dial back and plays it again, and laughs, every time, as if he has never heard it before. He watches her fold a shirt. He watches the whole time.']],
  v:()=>[['hitmeuppp (in chat)','there is a guy in my laundromat with a RADIO'],
   ['hitmeuppp (in chat)','he plays the bank jingle. the whole jingle. then he rewinds it. then he LAUGHS. eleven times so far'],
   ['ronin.beaufort (in chat)','kill him'],['K9','Describe him.'],
   ['hitmeuppp (in chat)','big. boots. why'],['K9','No reason. Fold quickly.']]},
 notes:{m:()=>[['','On the bench across from the job, when she comes out, a man in a clean coat is writing in a notebook.'],
   ['','His handwriting is very small and very neat. As she passes he looks at his watch, and writes something down, and she reads it upside down: the time, and then “star clip, left-handed bag.”'],
   ['hitmeuppp',MV('(nerd.)','(birdwatcher. or a cop. or a birdwatcher cop.)','(Birdwatcher, or a cop, or both. Something with a notebook.)','(A man with a notebook is either a poet or a problem, and he isn’t a poet.)')]],
  v:()=>[['','The foundation’s lobby. A man in a clean coat waits two hours on the leather bench for nobody, writing in a notebook.'],
   ['','The receptionist says he asked, very politely, for the list of volunteers, and wrote down that she would not give it to him. V reads the visitors’ book afterwards. The man signed it in tiny, perfect handwriting, with a name that does not exist.']]},
 water:{m:()=>[['','The bus stop after the job. She drops her change, and a man picks it up and holds it out to her.'],
   ['','He doesn’t look at her once. He looks at the pavement between their shoes until she has taken it, and then he gets on a bus going the wrong way.'],
   ['hitmeuppp',MV('(weird.)','(nice. weird. nice.)','(That was nice. Strange, but nice.)','(Nice guy. Shy. I hope nobody ever ruins him.)')]],
  v:()=>[['','Walking the hounds past the bus stop opposite the gate. Everyone looks at the hounds. People look at them the way they would look at something that came out of the river.'],
   ['','One man on the bench looks only at the ground, and goes on looking at it until all four of them have passed. V notices him because he is the only one who doesn’t look.']]}};
const W59G_ORDER=['driver','radio','notes','water'];
function w59Glimpse(id,who,done){const g=w59F().g;g[id]=g[id]||who;S.f.w59.gl=S.day;save();say(W59G[id][who](),done)}
const w59NextG=who=>W59G_ORDER.find(id=>!w59G(id));
/* ---------- the morning beats ---------- */
const W59B=[];const w59B=(id,when,run)=>W59B.push({id,when,run});
/* Misaki */
w59B('w59_m_notice',()=>S.phase==='normal'&&w59Me()==='m'&&S.day>=2&&(w59Lv(w59Lead())>=1||S.day>=4),done=>{const k=w59Lead(),F=w59F();F.st['m:'+k]=1;F.nOrg=k;F.nDay=S.day;save();
 say(w59Org(k).mN().concat([['hitmeuppp',MV('(huh.)','(huh. ok. noted.)',`(Okay. ${w59O(k).name}. Noted.)`,`(Okay. ${w59O(k).name}. They’ve noticed. That’s fine. I notice people all the time and nothing happens to them except me.)`)]]),done)});
w59B('w59_m_warn',()=>S.phase==='normal'&&w59Me()==='m'&&w59Seen('w59_m_notice')&&S.day>(w59F().nDay||0)&&(w59Lv(w59Lead())>=2||S.day>=6),done=>{const k=w59Lead(),F=w59F(),o=w59O(k);F.st['m:'+k]=2;F.wOrg=k;save();
 const first=F.nOrg&&F.nOrg!==k?[['','It isn’t '+w59O(F.nOrg).name+' any more. Somebody has a bigger grudge.']]:[];
 say(first.concat(w59Org(k).mW()),()=>ask('hitmeuppp',MV('(well?)','(ok. so. options.)','(Options. One, two, three.)','(One: it’s a warning. Two: warnings mean they haven’t decided. Three: I can work with that.)'),[
  {t:'Tell V',sub:tier()<1?'not close enough':'♥',dis:tier()<1,fn:()=>{F.toldV=1;apply({aff:2});save();say([['hitmeuppp',`@K9 ${o.name} keeps leaving me presents. not the good kind`],['K9',byT('Noted.',`Noted. I know ${o.boss}.`,`I know ${o.boss}. Send me everything they have left you, and do not open the next one.`,`I know ${o.boss}. Come and stay at the house until I have read their accounts. I am asking.`)],['hitmeuppp',MV('lol no','lol no. rent’s nearly paid. i’m not hiding in a basement','I’m not hiding in your basement. Rent’s nearly paid.','No. Rent is nearly paid and I want to see the look on the landlord’s face. After that, maybe. Maybe.')]],done)}},
  {t:'Send it back with something in it',sub:'+edge · they will not like it',fn:()=>{apply({edge:4});w59Bump(k,1);F.sent=1;save();say([['','She posts it back to their front office with a bullet taped to it, hollow point, the cheap kind.'],['hitmeuppp',MV('(lol.)','(lol. gift for a gift.)','(A gift for a gift. Manners.)','(A gift for a gift. My mother raised me right, whoever she was.)')]],done)}},
  {t:'Ignore it. Rent first.',fn:()=>say([['hitmeuppp',MV('rent first.','rent first. war later.','Rent first. War on Thursday.','Rent first. Then I’ll have a home to be scared in, which is a step up.')]],done)}]))});
w59B('w59_m_hale',()=>S.phase==='normal'&&w59Me()==='m'&&S.day>=3&&((S.bodies||0)>=1||S.day>=5||Object.keys(S.f).some(f=>f.startsWith('done_'))),done=>{const k=w59Lead(),o=w59O(k),F=w59F();
 say([['','The noodle stand, late. A tired man in a good coat sits on the stool beside her and orders the same thing she has, with a cheap coffee.'],
  ['Hale','Inspector Hale. Eat, I’m not here for you. I’m here for the bodies. Somebody has been taking '+o.name+'’s people off the board, one a week, very neatly.'],
  ['Hale','For the first month they called us about it. This month they stopped calling. When an outfit like that stops calling the police, it means it has decided to settle the matter itself.'],
  ['hitmeuppp',MV('ok','sounds like a them problem','Sounds like a them problem.','Sounds like a them problem, Inspector. I just like noodles.')],
  ['Hale','I have been doing this twenty-two years. I have watched '+o.boss+' walk out of court twice, smiling, with a better lawyer than God. I would like once, before I retire, to see somebody like that walk in.'],
  ['Hale','If they come for you, you will be the first thing they have done in years that I could prove. Try not to make it easy for them. I hate it when my best evidence dies.']],
  ()=>ask('hitmeuppp','He puts a card down by her bowl.',[
   {t:'Take the card',fn:()=>{F.haleCard=1;save();say([['','She puts it in her back pocket with the rent money. He nods, and leaves the coffee.']],done)}},
   {t:'Leave it in the broth',sub:'+edge',fn:()=>{apply({edge:2});say([['','She pushes it under the noodles with her chopsticks. He watches it go under, finishes his coffee, and pays for both bowls.']],done)}}]))});
w59B('w59_m_circle',()=>S.phase==='normal'&&w59Me()==='m'&&(S.paid||0)>=1&&w59Seen('w59_m_warn'),done=>{const o=w59O(w59Lead());
 say([['','Eleven at night, coming home. The grey van is back by the fence, with no front plate and the engine off. Four shapes are sitting in it in the dark, and nobody is smoking.'],
  ['','Somebody inside it laughs at something on the radio. She stands at her door with the key out for a long time.'],
  ['hitmeuppp',MV('(nope.)','(nope. not tonight. i have a gun on my hip and they know it.)','(One: there’s a gun on my hip. Two: they can see it. Three: so not tonight.)','(One: gun on my hip. Two: they can see it. Three: they’re waiting for a night it isn’t there, and I’m not stupid, I’ll just never take it off. Easy.)')],
  ['','In the morning the van has gone and there is a cigarette end by her step that wasn’t there before. It is '+o.name+'’s brand, or it is anybody’s.']],done)});
/* V */
w59B('w59_v_ledger',()=>S.phase==='normal'&&w59Me()==='v'&&S.day>=2,done=>{const k=w59Lead(),F=w59F();F.st['v:'+k]=1;F.lOrg=k;F.lDay=S.day;F.lease=1;save();
 say([['','The ops deck at six. V reads the city’s money the way other men read the paper. Most of it is dull, and then one line is not.'],
  ['',w59Org(k).vL],
  ['K9','(Somebody is buying a van, a room on the river and the people to fill both. They are not shy about it, which means they have stopped expecting anyone to look.)'],
  ['','He opens a folder for '+w59O(k).name+' and puts it on top of the pile.']],()=>{note('w59_lease','V’s ledger: '+w59O(k).name+' bought a van and something on the river.');done()})});
w59B('w59_v_ask',()=>S.phase==='normal'&&w59Me()==='v'&&w59Seen('w59_v_ledger')&&S.day>(w59F().lDay||0),done=>{const k=w59Lead(),F=w59F(),o=w59O(k);F.st['v:'+k]=2;save();
 say(w59Org(k).vA(),()=>ask('K9','(They are asking about her.)',[
  {t:'She is nobody to me',fn:()=>{say([['K9','I have a great many volunteers. I do not keep track of their hair.'],[o.boss,'We do.'],['','It is the only thing in the conversation V cannot answer, so he does not.']],done)}},
  {t:'Say nothing, and tell her tonight',sub:'♥',fn:()=>{F.vTold=1;apply({aff:2});save();say([['','He drives to the lot after midnight and texts “Outside.”'],['K9',`${o.boss} asked about you today, by description. I would prefer that you slept at the house.`],['hitmeuppp',MV('lol','lol. no. i’m fine','I’m fine. I’ve been asked about before.','I’ve been asked about my whole life, V. Mostly by people I owed money. Go home. I’ll text you when I wake up.')],['','She texts him at nine. He has not slept.']],done)}},
  {t:'Make it clear what she is to you',sub:'−conscience · they learn something',fn:()=>{F.lever=1;w59Bump(k,2);apply({heart:-3});save();say([['K9','If anyone touches her I will take them apart and feed them to my animals in portions. I weigh the portions.'],[o.boss,'Thank you. That was what we needed to know.'],['K9','(He understands what he has given them about one second after he has given it.)']],done)}}]))});
w59B('w59_v_hale',()=>S.phase==='normal'&&w59Me()==='v'&&S.day>=3,done=>{const k=w59Lead(),o=w59O(k),F=w59F();
 say([['','Inspector Hale, at the foundation, rain on his coat, with a cheap coffee he has brought from outside so as not to owe anyone a cup.'],
  ['Hale','Mr. V. I’m told your foundation has been very hard on '+o.name+' on paper. Somebody else has been harder on them in person.'],
  ['Hale','There is a war on in this city, and they’ve stopped reporting their dead. I don’t much mind their dead. What I mind is that when they finish it, '+o.boss+' will walk out of court again, the way they did twice already.'],
  ['Hale','You have files. I’ve seen what your lawyers do with them. I would like one file, on '+o.boss+', with enough in it to hold. One trial with a real judge, before I retire.']],
  ()=>ask('K9','(He is watching your hands again.)',[
   {t:'Give him the file',sub:'+conscience · Hale owes you',fn:()=>{F.haleFile=1;apply({heart:4,rep:2});save();say([['','V gives him a thick grey folder, already labelled. Hale weighs it in one hand and does not open it in front of him.'],['Hale','You had this ready.'],['K9','I have one ready on everyone. That is not a confession, Inspector. It is filing.']],done)}},
   {t:'Tell him you have nothing',fn:()=>say([['K9','My foundation exposes fraud, Inspector. I do not keep files on people like that.'],['Hale','Of course you don’t. I’ll be seeing you.']],done)}]))});
w59B('w59_v_circle',()=>S.phase==='normal'&&w59Me()==='v'&&(S.paid||0)>=1&&w59Seen('w59_v_ledger'),done=>{const k=w59Lead(),o=w59O(k),F=w59F();
 say([['','Every outfit in the city is noisy in the ledgers. '+o.name+' has gone quiet: no new debts, no new hires, no payments, nothing for three days.'],
  ['K9','(An outfit goes quiet when it has finished buying what it needs and is only waiting for the right night.)']],
  ()=>ask('K9','(The right night.)',[
   {t:'Sit outside her lot tonight',sub:'−energy',fn:()=>{F.watched=1;apply({energy:-20});save();say([['','He sits in the car with the lights off from ten until four. Nothing comes. At four she opens the trailer door to put the rubbish out, sees the car, and waves with the bin bag.'],['','Nothing comes the next night either. He has a board meeting the night after that.']],done)}},
   {t:'Ask her to move in now',sub:S.f.movedIn?'she already has':'♥',dis:!!S.f.movedIn,fn:()=>{F.asked=1;apply({aff:2});save();say([['K9','I would like you to stay at the house. Starting tonight. For no reason I am prepared to explain.'],['hitmeuppp',MV('who is this','after rent. i’m paying it MYSELF. one more week','After rent. I want to pay it myself once, V. Then I’ll come and let your hounds sit on me.','After rent. I need to pay it once, myself, with my own money. Then I’m yours. Don’t make the face. I can hear the face.')]],done)}},
   {t:'Read the accounts again',fn:()=>say([['','He reads them until three in the morning. They are still quiet, and he knows exactly what that means.']],done)}]))});
/* V's hunt among them: the morning after */
w59B('w59_v_hunted',()=>w59Me()==='v'&&S.phase==='normal'&&!!w59F().got&&!w59F().gotSeen,done=>{const F=w59F(),k=F.got,o=w59O(k);F.gotSeen=1;save();
 say([['','He took the man’s phone, as he always does, and he reads it at the kitchen table with the hounds lying across his feet.'],
  ['','There are photographs of a trailer door, taken from across the lot at different hours, and a shift rota with four initials on it, and a group chat about a van.'],
  ['K9','(They will think it was her. Everything that happens to '+o.name+' this month, they will think was her.)'],
  ['','He copies the rota into his own book before he burns the phone.']],done)});
/* taken: Hale calls V */
w59B('w59_v_halecall',()=>S.phase==='taken'&&w59Me()==='v'&&S.day>S.takenDay,done=>{const k=S.captor,o=w59O(k),org=w59Org(k),F=w59F();
 const pre=[F.lease?['','He has the folder open before he is awake. A van, a room on the river: '+o.name+' bought the whole thing in front of him, and he read it with his coffee.']:null,
  F.phone===k?['','And the rota he copied from the phone. Four initials, the hours each man stands in a hall. He knows when they change now.']:null,
  F.vTold||F.asked?['K9','(I asked her. She said after rent.)']:null,
  F.lever?['K9','(I told them what she was to me. They wrote it down.)']:null];
 if(F.phone===k)S.f.schedule=1;save();
 say(pre.concat([['','The phone. A withheld number, at seven.'],
  ['Hale','It’s Hale. Don’t say anything. A van with no front plate left the trailer lot at nine fifty-two the night before last. A woman in the end trailer wrote the back plate down on a cereal box.'],
  ['Hale','The plate belongs to '+org.front+'. At noon my captain told me to lose the cereal box.'],
  ['Hale','I can tell you which part of the river that company rents on. You’ll find her before I’m allowed to. When you find them, leave me '+o.boss+'. Breathing, and in a room with a lawyer. That is my price.']]),
  ()=>ask('K9','(A policeman wants a promise.)',[
   {t:'Promise him',sub:S.f.traced?'the unit, not just the district':'skips the trace',fn:()=>{F.deal='promise';if(S.f.traced)S.f.schedule=1;else S.f.traced=1;save();say([['K9','You will have your courtroom.'],['Hale','East bank, the warehouse row. I don’t know which. I didn’t call you.'],['','He hangs up. V writes “Hale: the boss, breathing” on the inside of his wrist in biro, so that he will see it.']],done)}},
   {t:'Refuse',sub:'no deal',fn:()=>{F.deal='no';save();say([['K9','I do not make promises about that man.'],['Hale','Then I never called. Good luck, Mr. V. I mean that, which is the unprofessional part.']],done)}}]))});
/* glimpses as morning beats, if no job has shown them */
W59G_ORDER.forEach((id,i)=>w59B('w59_g_'+id,()=>S.phase==='normal'&&!w59G(id)&&w59NextG()===id&&S.day>=2+i&&S.day-(w59F().gl||-9)>=1,done=>w59Glimpse(id,w59Me(),done)));
/* act II: Hale remembers */
w59B('w59_a2_hale',()=>S.phase==='act2'&&S.day>=(S.act2Start||0)+1&&(w59F().deal==='promise'||w59F().mHale==='yes'),done=>{const F=w59F(),o=w59O(S.captor);const kept=!!S.f.finalRuin,m=w59Me()==='m';
 say(kept?[['','A postcard on the doormat, unsigned, from the courthouse gift shop. It shows the steps. Somebody has drawn a very small arrow on them, and written “walked in.”'],
  [m?'hitmeuppp':'K9',m?MV('…huh.','huh. hale got his.','Hale got his courtroom. Good for him.','Hale got his courtroom. I’m happy for him, which is horrible. Don’t tell anybody.'):'He kept his word to me before I kept mine to him. Now we are even, and he will come after me with a clear conscience. That is fair.']]
  :[['','Inspector Hale, at the gate, not coming in. He has a newspaper under his arm with '+o.boss+' on the front page, dead, and he holds it up so that the camera can see.'],
   ['Hale','You promised me breathing.'],
   [m?'hitmeuppp':'K9',m?MV('…','he wasn’t yours','He wasn’t yours, Inspector.','He was never yours, Inspector. He was mine the second the van door opened.'):'I did. I am sorry for the promise. I am not sorry for the rest.'],
   ['Hale','Then I’m back to the other file. The one with your name on it.']],()=>{if(!kept)apply({heat:6});done()})});
/* scheduler: one beat per morning, before the rest of the morning */
function w59Next(){if(!W59())return null;const F=w59F();F.hp=0;if(F.day===S.day)return null;return W59B.find(b=>!w59Seen(b.id)&&(()=>{try{return b.when()}catch(e){return false}})())||null}
const _me59=morningEvent;morningEvent=function(done){let b=null;try{if(mbOk())b=w59Next()}catch(e){}if(!b)return _me59(done);mbUse();const F=w59F();F.day=S.day;S.seen[b.id]=1;save();b.run(()=>_me59(done))};
/* ---------- glimpses on the way home from a job ---------- */
const _jr59=jobResult;jobResult=function(t,ok,info){try{if(W59()&&S.phase==='normal'&&w59Me()==='m'&&w59NextG()&&w59F().gl!==S.day)w59F().pend=1}catch(e){}return _jr59.apply(this,arguments)};
const _hub59=hub;hub=function(){try{const F=S&&S.f&&S.f.w59;if(F&&F.pend&&!dlg&&!ctrl&&W59()&&S.phase==='normal'){F.pend=0;const id=w59NextG();if(id){go(cutBg('#0e0a10'));return w59Glimpse(id,'m',()=>_hub59())}}}catch(e){}return _hub59.apply(this,arguments)};
/* ---------- in the cell: their faces ---------- */
ROOMS.cell.spots.push({at:[100,150],mark:[100,140],label:'Their faces',show:()=>{try{return w59Me()==='m'&&!w59F().faces&&W59G_ORDER.some(id=>w59G(id,'m'))}catch(e){return false}},act:()=>{const F=w59F();F.faces=1;save();const s=id=>w59G(id,'m');
 say([['','You know them. That is the worst part, and you make yourself look at it.'],
  s('driver')?['','The driver sang the whole way here, and you had heard that voice before, by your own fence, when he lifted two fingers off the wheel at you and you waved back.']:null,
  s('radio')?['','The big one with the radio is the man who held the laundromat door with his boot and watched you fold your shirts.']:null,
  s('notes')?['','You read the note-taker’s handwriting once already, upside down, on a bench outside a job. He wrote down your bag.']:null,
  s('water')?['','And the water. He picked your change up at a bus stop and handed it back without looking at you, and you decided he was shy.']:null,
  ['hitmeuppp',MV('(they were there the whole time.)','(they were there the whole time. weeks.)','(They were there for weeks. I saw every one of them and I filed them all under nothing.)','(Weeks. They were in my life for weeks, and I clocked every single one, and I filed them under “weird guy.” One: I am good at noticing. Two: I am bad at believing it. Three: fuck.)')]])}});
/* ---------- the list: knowing him ---------- */
const W59REC={driver:['He sang the bank jingle by her fence, weeks before, and lifted two fingers off the wheel at her.','V has the time he parked by her fence, and half of his rear plate, in a notebook from before.'],
 radio:['He held the laundromat door with his boot and laughed at the jingle eleven times while she folded her shirts.','She told the server about him from the laundromat. “Big. Boots.” V asked her to fold quickly.'],
 notes:['He sat on a bench outside one of her jobs and wrote down her bag.','He signed the foundation’s visitors’ book in tiny, perfect handwriting, with a name that does not exist.'],
 water:['He picked her change up at a bus stop and gave it back without looking at her.','He sat at the bus stop opposite the gate and was the only man in the city who would not look at the hounds.']};
const _lt59=listTarget;listTarget=function(x){try{const F=w59F();const r=W59REC[x&&x.id];if(r&&W59()&&!F.rec[x.id]){const m=S.pov!=='v';const seen=w59G(x.id,m?'m':'v')?(m?r[0]:r[1]):w59G(x.id)?(m?r[1]:r[0]):null;
  if(seen){F.rec[x.id]=1;save();return say([['',seen]],()=>_lt59(x))}}}catch(e){}return _lt59.apply(this,arguments)};
/* ---------- after: what they saw before ---------- */
kdEv('w59_know',()=>!S.f.w59_know&&W59G_ORDER.some(id=>w59G(id)),done=>{S.f.w59_know=1;save();const m=kdMe(),o=w59O(S.captor),F=w59F();
 say(m?[['','You sit at V’s kitchen table with the list and a pen, and you write next to each line where you saw him first.'],
   ['','You can date most of them by the job you were coming home from.'],
   F.wOrg||F.nOrg?['','Then you write down what '+o.name+' sent you before that, in order, and it reads like a timetable. They told you, more or less, every week.']:null,
   ['hitmeuppp',MV('(i saw them.)','(i saw all of them. i just didn’t look.)','(I saw all of them. I clocked all of them. I just never added them up, because then I’d have had to do something.)','(I’m good at sums. Regionals, third place, age eleven. And I left this one on the desk for a month because I didn’t like what it came to.)')],
   ['K9',F.lease?'I read about the van in a ledger, Misaki, and about the room on the river, and then I put the folder on top of the pile and went to a board meeting.':'I sat outside your lot and wrote down half a number plate. I should have written down the other half.']]
  :[['','V lays it out on the ops deck in order: '+(F.lease?'the ledger lines, ':'')+'his notes from the car, her messages from the laundromat, the visitors’ book with the name that does not exist.'],
   ['','It makes a straight line to the van, with a date on every point. Every point on it is something he saw.'],
   ['K9','(I watched it come for her. I wrote it down very neatly. The note-taker and I have that in common.)'],
   ['hitmeuppp',MV('stop','don’t. i saw them too','Don’t do that. I saw them too, V. I waved at one of them.','Stop it. I waved at the driver. I took change from the water guy. If we’re doing blame I’m winning, so put the folder down and come and eat.')]],()=>{apply({aff:2});done()})});
kdEv('w59_hale_after',()=>!S.f.w59_hale_after&&kdD()>=2,done=>{S.f.w59_hale_after=1;save();const m=kdMe(),o=w59O(S.captor),F=w59F();
 const head=[['','Inspector Hale comes to the house in daylight and stands on the step, because he hasn’t been asked in and won’t ask.'],
  F.deal==='promise'?['Hale','I read the incident log for the river. A power failure, and several men who slipped. I am here about the one who didn’t slip yet.']:['Hale','I’ll be honest, since nobody else in this is. I want '+o.boss+'. In a courtroom, alive, on the news, with a lawyer who has to stand up and say it in front of a judge.'],
  ['Hale','Whatever is going to happen to them, I want it to happen there. I have waited twenty-two years.']];
 if(m)return say(head,()=>ask('hitmeuppp','(He is asking you, not V.)',[
  {t:'“they’re all yours. what’s left of them.”',sub:'+composure',fn:()=>{F.mHale='yes';calm(4);save();say([['Hale','That’s all I ask. Thank you, miss.'],['','He leaves. You sit on the step for a while afterwards, because it is the first decision about them that has been yours.']],done)}},
  {t:'“fuck off, inspector.”',sub:'+edge',fn:()=>{F.mHale='no';apply({edge:4});save();say([['Hale','Understood.'],['','He goes. He leaves a card on the step, and you leave it there in the rain until it is pulp.']],done)}}]));
 say(head,()=>ask('K9','(Hale wants the boss breathing.)',[
  {t:'He will have his courtroom',sub:'the K9 way, if you can',fn:()=>{F.deal='promise';apply({heart:3});save();say([['K9','You will have it. I keep files on everyone, Inspector. This one is going to be very thick.'],['Hale','Thick enough to hold?'],['K9','Thick enough to bury.']],done)}},
  {t:'Make no promise',fn:()=>{if(F.deal!=='promise')F.deal='no';save();say([['K9','I cannot promise you anything about that man. I am being honest with you, which I would like noted.'],['Hale','Noted. I’ll be reading the papers, then.']],done)}}]))});
if(typeof KD_ORDER!=='undefined'){const i=KD_ORDER.indexOf('kd_card');KD_ORDER.splice(i<0?KD_ORDER.length:i+1,0,'w59_know');const j=KD_ORDER.indexOf('kd_math');KD_ORDER.splice(j<0?KD_ORDER.length:j+1,0,'w59_hale_after')}
/* ---------- V's hunts in the war ---------- */
Object.keys(W59ORG).forEach(k=>HUNTS.push(Object.assign({w59:k},W59ORG[k].hunt)));
const _vh59=vHuntMenu;vHuntMenu=function(back){const keep=HUNTS.splice(0);try{const lead=S.phase==='normal'?w59Lead():null;const hunted=S.f.vHunted||{};
  const war=keep.find(h=>h.w59&&h.w59===lead&&!hunted[h.n]);const rest=keep.filter(h=>!h.w59).sort(()=>Math.random()-.5);
  HUNTS.push(...(war?[war].concat(rest.filter(h=>!hunted[h.n]).slice(0,2)):rest));return _vh59(back)}finally{HUNTS.splice(0);HUNTS.push(...keep)}};
const _vH59=vHunt;vHunt=function(h){try{w59F().hp=h&&h.w59?h.w59:0}catch(e){}return _vH59.apply(this,arguments)};
const _dsp59=dispose;dispose=function(who,n,cb){try{const F=S&&S.f&&S.f.w59;if(F&&F.hp&&who==='v'){F.got=F.hp;F.phone=F.hp;F.gotSeen=0;F.hp=0;w59Bump(F.got,1)}}catch(e){}return _dsp59.apply(this,arguments)};
/* ---------- side options: who is asking ---------- */
const _sh59=sideHub;sideHub=function(late){const o=_sh59(late);try{if(!W59()||S.phase!=='normal'||S.slot>=3)return o;const F=w59F(),wait=S.day-(F.ask||-9)<3;
 if(w59Me()==='m')o.push({t:'Ask around: who’s asking about you',sub:wait?'nobody’s talking twice in a week':'costs time · the card den, the noodle stand',dis:late||wait,fn:()=>{spend();F.ask=S.day;save();w59Ask()}});
 else o.push({t:'The street file',sub:wait?'nothing has moved':'costs time · who is angry, and at whom',dis:late||wait,fn:()=>{spend();F.ask=S.day;save();w59File()}})}catch(e){}return o};
function w59Ask(){const k=w59Lead(),o=w59O(k),lv=w59Lv(k);go(cutBg('#0e0a10'));
 say([['','The card den under the flyover, then the noodle stand, then a man who sells phone cases and knows everything. She buys a phone case.'],
  ['','Everybody gives her the same name: '+o.name+'. '+(lv>=3?'“They’ve stopped asking where you live,” the phone-case man says. “That means they know.”':lv>=2?'“They’re asking what time you go home,” the phone-case man says.':'“They’re asking who you are,” the phone-case man says. “Just that. For now.”')]],
  ()=>ask('hitmeuppp',MV('(so?)','(so what do i do with that)','(So what do I do with that?)','(One: I know who. Two: they know I know, now. Three: what do I do with that.)'),[
   {t:'Lie low for a day',sub:'−heat · they lose the thread a little',fn:()=>{apply({heat:-8});w59Bump(k,-1);save();say([['','She sleeps at a different laundromat, with her back to a dryer, and goes home the long way.']],hub)}},
   {t:'Go and make a point',sub:'+edge · they will remember',fn:()=>{apply({edge:5,heat:4});w59Bump(k,1);save();say([['','She finds the man who has been doing the asking and asks him something back, in an alley, with her knee on his chest.'],['hitmeuppp',MV('bye','tell '+o.boss+' hi','Tell '+o.boss+' I said hi.','Tell '+o.boss+' I said hi, and that I can ask questions too, and that I’m better at it.')]],hub)}},
   {t:'Just go home',fn:hub}]))}
function w59File(){const ks=Object.keys(ORG).sort((a,b)=>w59Lv(b)-w59Lv(a));const word=n=>n>=4?'hunting':n>=3?'circling':n>=2?'asking questions':n>=1?'annoyed':'quiet';
 panel(`<h2>The street file</h2><p>V keeps a page on every outfit in the city and updates it in pencil. Tonight he reads them for one thing: who is angry, and at whom.</p>${ks.map(k=>`<p><b>${ORG[k].name}</b> (${ORG[k].boss}) — ${word(w59Lv(k))}</p>`).join('')}<p class="hint">Misaki’s work raises it. So do his own hunts: they will think it was her.</p>`,
  [{t:'Close the file',fn:hub}])}
/* ---------- texts ---------- */
txDef('tx_w59_ron',{with:'r',pov:'m',prio:2,when:()=>W59()&&S.phase==='normal'&&S.day>=3&&w59Lv(w59Lead())>=1,nodes:{
 start:{in:()=>['somebody was in my bar askin’ about a girl with a star clip','i told ’em she died. they didn’t laugh','who the fuck did you piss off, little killer'],expire:3,
  opts:()=>[{t:'“'+w59O(w59Lead()).name+', probably”',fx:()=>fr('r',2),reply:()=>['oh shit. ok','want me t’go ask THEM some questions. i got a crowbar that asks real nice']},
   {t:'“nobody. it’s fine”',fx:()=>fr('r',1),reply:()=>['sure. sure it is','sleep with a hammer, then. don’t cha make me find out at your funeral']}]}}});
txDef('tx_w59_ang',{with:'a',pov:'m',prio:2,when:()=>W59()&&S.phase==='normal'&&w59G('driver'),nodes:{
 start:{in:()=>['a fan sent me this. grey van outside your lot, no front plate, 2am','they said “isn’t this near where your friend lives” which is creepy of THEM but also','is it yours'],expire:3,
  opts:()=>[{t:'“no.”',fx:()=>fr('a',2),reply:()=>['ok','i’m keeping the photo. i’m keeping all of them. if anything happens i have a folder and a shotgun']},
   {t:'“it’s some guy who sings”',fx:()=>fr('a',1),reply:()=>['he sings??','misaki that’s worse. men who sing in vans are the worst ones. i’ve met them. briefly']}]}}});
txDef('tx_w59_vq',{with:'v',pov:'m',prio:2,when:()=>W59()&&S.phase==='normal'&&tier()>=1&&w59Seen('w59_m_notice'),nodes:{
 start:{in:()=>[`Who did you work against last.`,`Not the name of the man. The name of whoever paid his salary.`],expire:3,
  opts:()=>[{t:'“'+w59O(w59Lead()).name+'. why”',fx:()=>apply({aff:2}),reply:()=>[`Their accounts have changed shape.`,`Please carry something at all times. I am aware that you already do. Carry something larger.`]},
   {t:'“client confidentiality, babe”',fx:()=>apply({aff:1}),reply:()=>[`I respect that.`,`I will find out anyway. I would rather have found out from you.`]}]}}});
txDef('tx_w59_vm',{with:'m',pov:'v',prio:2,when:()=>W59()&&S.phase==='normal'&&S.day>=3,nodes:{
 start:{in:()=>['someone left a thing on my step','not a bad thing. a weird thing. like a reminder','do u know anything about '+w59O(w59Lead()).name],expire:3,
  opts:()=>[{t:'“Yes. Do not open the next one.”',fx:()=>{apply({aff:2});w59F().vTold=1},reply:()=>['ok dad','…ok. i won’t. i’ll bring it to you']},
   {t:'“Send me a photograph of it.”',fx:()=>apply({aff:1}),reply:()=>['sent','why are u typing for so long','V']}]}}});
/* ---------- ending lines ---------- */
const _xe59=extraEnding;extraEnding=function(){const L=_xe59();try{if(!S||!S.f||!S.f.w59)return L;const F=S.f.w59,o=S.captor?w59O(S.captor):null;
 const pr=F.deal==='promise'||F.mHale==='yes';
 if(o&&pr&&S.f.finalRuin)L.push('Inspector Hale made the arrest himself, on the courthouse steps, in front of the cameras. '+o.boss+' had a very good lawyer. It did not help this time.');
 else if(o&&pr&&S.phase!=='normal'&&S.phase!=='taken')L.push('Hale got his newspaper instead of his courtroom. He keeps the clipping in the K9 file.');
 if(o&&(F.wOrg||F.lOrg))L.push(o.name+' told them, more or less, every week. Afterwards both of them could recite the dates.');
 if(F.lever)L.push('V told '+o.boss+' what she was to him. He has not said it to anyone outside the house since.');
 if(F.faces||S.f.w59_know)L.push('She still waves at vans. She makes herself do it, so that they do not get to keep that as well.')}catch(e){}return L};
