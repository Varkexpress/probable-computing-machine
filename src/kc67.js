/* ===================== V × RONIN: THE BUTCHER'S BALANCE (kc67) =====================
   A plot thread of its own for the V × Ronin route (S.pov==='v' && S.vrom==='r'), interleaved with kc65's beats.
   Ronin's second man (the name inside the second skull ring, kc65) was a collector for V's father's book. The winter
   Ronin came to the city he slept in the boiler room of the church across town; the parish owed a private lender for
   the roof; the collector broke the old priest's fingers in the vestry and Ronin killed him with the boiler-hatch
   crowbar. The old priest told the police "burglar" and gave Ronin the side-door key (kc65's key). The man was never
   identified. The Chairman has priced the open balance and sold it to the collector's son, one of his men in grey.
     normal  vr67_church  Sunday in the back pew; a man in grey in the Devil's pew leaves a ledger slip   → k67Pew
     act2    vr67_photo   Hale's file: a photo of the two of them and the old case                      → k67Photo
     act2/3  vr67_row     told: the boiler room together; kept/burn: Ronin is forty minutes late (row)  → k67Row
     act3    vr67_page    the page folded into the back of the ledger; the ring; his balance or keep out → k67Page
     act3    vr67_ten     the boiler room at ten forty; the son; end it or let him walk                  → k67Ten
     boat    (wrapped a3Climax / a3Choice / a3Boat) Ronin on the line, the Chairman's remark, an unlocked door
     epi     vr67_epi     the church across town in February                                            → k67Epi
   Flags (S.f): k67Pew 'ask'|'pocket'|'hand'; k67Photo 'told'|'kept'|'burn' (+k67PhotoDay); k67Row 'kiss'|'file'|
   'sorry'|'stand'; k67Page 'his'|'out' (+k67PageDay); k67Ten 'end'|'walk'; k67Epi 'own'|'quote'|'sorry'|'again';
   k67Boat, k67Ch (boat-night lines shown). Done marks: S.f.k67d[id].
   Threads: tx_k67_eyes (normal/act2), tx_k67_week|weird (started by the photo), tx_k67_mis|torch (Misaki, started by
   the page), tx_k67_epi. Mornings: k67vr_morn (normal), k67vr_loft (act2, Angel), k67vr_morn2 (epilogue).
   Delivery: one ♥ side-menu entry, only when kc65 has no V × Ronin beat due (k65Due()), and "Date night" after the
   first three dates plays the due beat the same way. Nothing runs in 'after' or 'taken', so the kidnapping's after-phase
   and kdSA() are untouched. No morning scheduler; the mornings are ordinary EVENTS. See docs/notes_kc67.md. */
const K67r=()=>{try{return !!S&&S.pov==='v'&&S.vrom==='r'&&!isLone()}catch(e){return false}};
const K67=()=>{try{return K67r()&&!S.dark&&!(S.f&&S.f.abroad)&&S.phase!=='taken'&&S.phase!=='after'}catch(e){return false}};
const k67Done=id=>!!(S.f.k67d&&S.f.k67d[id]);
const k67Did=n=>k67Done('vr67'+'_'+n);
const k67Mark=id=>{S.f.k67d=S.f.k67d||{};S.f.k67d[id]=1;save()};
const k67Free=()=>{try{return typeof k65Due!=='function'||!k65Due()}catch(e){return true}};
const k67HaleOut=()=>{try{return typeof k56HaleOut==='function'&&k56HaleOut()}catch(e){return false}};
const k67A2=()=>S.phase==='act2'&&S.day>=(S.act2Start||0)+2;
const k67A3=()=>S.phase==='act3'&&typeof a3d==='function'&&a3d()>=2&&!!(S.a3&&S.a3.box);
const k67Th=id=>{try{const P=phS();if(!P.run[id])txStart(id)}catch(e){}};
const K67MV=(...a)=>['hitmeuppp',MV(...a)];
const K67T={week:'tx_k67_week',weird:'tx_k67_weird',mis:'tx_k67_mis',torch:'tx_k67_torch'};

/* the photograph in Hale's file, by what happened in the pew */
function k67PhotoLine(){const p=S.f.k67Pew;
 if(p==='hand')return ['','It was taken from the organ loft of the church across town. Two men are sitting in the front pew holding hands. One of them is in a very good coat. The other is waving a slip of paper at a priest.'];
 if(p==='pocket')return ['','It was taken from the organ loft of the church across town. Ronin is in the aisle with a hymn book, and you are taking a slip of paper out of his fingers and putting it in your coat.'];
 if(p==='ask')return ['','It was taken from the organ loft of the church across town. Ronin is in the aisle with a hymn book open in his hands, and his face is turned to you.'];
 return ['','It was taken through the windscreen of his truck at a red light. Ronin is driving, and your hand is on the back of his neck.']}

/* ===================================== NORMAL: the back pew ===================================== */
function k67Church(){go(cutBg('#100c0a'));k67Mark('vr67_church');
 say([['','Sunday, the church across town. You have never attended a service in your life, and Ronin has told the whole server so, with photographs of your good coat as evidence.'],
  ['','He walks you in at the exact minute, nods to a plaster saint as if they owe each other money, and sits in the back pew with his arm along the top of it behind you. There is a bucket in the aisle. Every so often the roof drips into it.'],
  ['K9','There is a bucket in the aisle.'],
  [RN,'Roof’s leaked since before I come to town. That bucket’s older than half the parish. Show it some respect.'],
  ['K9','What do I do with my hands?'],
  [RN,'Fold ’em, don’t touch nobody, stand when I stand. If the priest looks at you, look sorry. You got a real good sorry face, Vee, you just never use it.'],
  ['','He sings every hymn without the book, in a voice you did not know he owned. In the gaps he leans to your ear and describes your coat, the way you knelt, and what he would like to do about the way you knelt, in language that would get a man struck by lightning in most denominations. At the sign of peace he shakes your hand like a business partner and scratches your palm with his thumb.'],
  ['K9','(This is the most thoroughly I have been flirted with in my life, and it is happening in a house of God.)'],
  ['','The front pew is always empty. Ronin says the parish leaves it for the Devil, who likes a good view of the priest. Today a man in a grey suit is sitting in it. He neither kneels nor sings, and he leaves before communion, and the door at the back swings shut behind him without a sound.'],
  ['','When the parish has filed out past the bucket, Ronin walks up the aisle and picks up the hymn book the man left open on the seat. There is a slip of paper inside it, ruled like a page from a ledger, and he reads it and stops talking.'],
  ['','In all the years you have kept his file, you have never seen him quiet in a church.'],
  ['','The slip says, in a patient, slanted hand: “For the roof. Received: nil. Balance outstanding.” Under it is a date from a long time ago, and the word PAID, crossed out.']],
  ()=>ask('K9','(He is holding the slip by one corner, as if it might be hot.)',[
   {t:'“What roof?”',fn:()=>{S.f.k67Pew='ask';fr('r',2);say([
     [RN,'This roof. Old business. Ain’t tellin’ it in here, Vee, the walls got ears and one set of ’em’s His.'],
     [RN,'(louder, to the plaster saint) Ain’t that right?'],
     ['','He buttons the slip into his shirt pocket. On the steps outside he makes you eat a communion wafer he stole from the sacristy, to see if you go up in flames. You stay as you are, which disappoints him, and then he kisses you against the church railings in full view of the parish and the bakery across the road.']],hub)}},
   {t:'Take the slip out of his fingers and put it in your coat.',fn:()=>{S.f.k67Pew='pocket';fr('r',3);say([
     [RN,'Hey.'],
     ['K9','You do not want to hold it. I will hold it.'],
     [RN,'...You’re gonna file that.'],
     ['K9','Yes.'],
     [RN,'Fuckin’ course you are.'],
     ['','He lets you keep it and never asks for it back. On the walk to the car he bumps his shoulder into yours every few steps, hard enough to put you off the kerb, and you have learned to take that as thanks.']],hub)}},
   {t:'Sit down beside him in the front pew and take his hand.',fn:()=>{S.f.k67Pew='hand';fr('r',4);say([
     [RN,'In the Devil’s pew, Vee? In front of Him?'],
     ['K9','He has seen worse from you.'],
     [RN,'He has. Fuck, He has. Fine.'],
     ['','The priest comes back to lock up and finds the two of you still sitting in the front pew, holding hands like teenagers. Ronin waves the slip at him. The priest blesses you both very fast and goes back to the vestry.']],hub)}}]))}

/* ===================================== ACT II: Hale's file ===================================== */
function k67Photo(){go(cutBg('#0e0c0a'));k67Mark('vr67_photo');const ho=k67HaleOut();S.f.k67PhotoDay=S.day;
 const L=ho?[['','An envelope comes to the foundation’s front desk, addressed to “the man who answers letters”. Inside is a cardboard police folder with Inspector Hale’s initials on the cover, out of a cabinet that should have been locked, and a photograph.']]
  :[['','A coffee shop that has been open since 1962. Hale is in the back booth with two coffees and a cardboard folder, and he does not get up.'],
   ['Hale','Somebody has sent me a photograph. I would like you to look at it before I decide what sort of afternoon I am having.']];
 L.push(k67PhotoLine(),['','On the back, in a patient, slanted hand: “The large one. Ask him about the roof.”']);
 if(ho)L.push(['','The file is old. A man was found dead in the boiler room of that church one February, his head broken with something long and made of iron. He had no papers and no wallet, and nobody came to claim him. The old priest told the constable he had found a burglar. The constable wrote it down and went for his lunch.'],
  ['','Clipped inside is a note on the foundation’s own letterhead, which somebody has stolen: “Two newspapers have the photograph. One of them wants a name.”']);
 else L.push(['Hale','There was a case number with it. I pulled the file. It is older than my divorce.'],
  ['Hale','A man found dead in the boiler room of that church, one February. Head broken with something long and made of iron. No papers, no wallet, and nobody came to claim him. The old priest told the constable he had found a burglar. The constable wrote it down and went for his lunch.'],
  ['Hale','I do not care about a burglar who died before I went grey. I care that somebody wants me to care. The same photograph went to two newspapers. One of them rang me. The other is waiting for a name.'],
  ['K9','And the name they want is his.'],
  ['Hale','I did not say a name. I am going to the lavatory. I have a weak bladder and a worse memory, and this folder will be on the table for eleven minutes.']);
 say(L,()=>ask('K9',ho?'(The folder is on your desk with the photograph on top.)':'(Hale has gone to the lavatory. The folder is on the table.)',[
  {t:'Take it to Ronin tonight.',fn:()=>{S.f.k67Photo='told';fr('r',3);if(typeof relApply==='function')relApply({trust:2});say([
    ['','You drive to the workshop with the folder on the passenger seat. Ronin opens the door in his apron, floured to the elbows, halfway through his grandmother’s crumble, and sees your face and turns the oven off.'],
    [RN,'Somebody’s dead or somebody’s about to be.'],
    ['K9','Somebody has been dead for a long time. Sit down.'],
    ['','He reads the file standing up. When he gets to “burglar” he laughs so hard he has to hold onto the bench.'],
    [RN,'Burglar. He told ’em burglar. God love that lyin’ old man.'],
    [RN,'Tomorrow night. Bring a torch. I’ll show you where.']],()=>{k67Th(S.f.k67Photo==='told'?K67T.week:K67T.weird);hub()})}},
  {t:'Keep it. Deal with the newspaper yourself.',fn:()=>{S.f.k67Photo='kept';fr('r',1);say([
    ['','You take the folder and the photograph. That afternoon the foundation buys a year of full-page advertising in the newspaper that wanted a name, at a rate that makes its editor cry on the phone, and the photograph goes into a drawer in your study under the shelter accounts.'],
    ['K9','(He does not need to carry this. I can carry it.)'],
    ['','Ronin comes in through the skylight at midnight and asks why you are smiling at the accounts. You tell him it is the accounts.']],()=>{k67Th(S.f.k67Photo==='told'?K67T.week:K67T.weird);hub()})}},
  {t:ho?'Burn it in the study grate.':'Burn it in Hale’s ashtray.',fn:()=>{S.f.k67Photo='burn';fr('r',1);say(ho?[
    ['','The file burns badly, the way old cardboard does. You hold the photograph over the grate last and watch the two of you go brown at the edges.'],
    ['K9','(He does not need to know that anyone is digging. I will see to the newspaper, and then I will see to whoever is digging.)']]:[
    ['','When Hale comes back from the lavatory the folder is ash in his saucer and the photograph is curling on top of it. He sits down and looks at it for some time.'],
    ['Hale','That was police property.'],
    ['K9','It was a burglar.'],
    ['Hale','So it was. It was a terrible file anyway. The constable could not spell “boiler”.'],
    ['','He pays for both coffees. He does not ask what you will tell Ronin, and you do not tell him the answer is nothing.']],()=>{k67Th(S.f.k67Photo==='told'?K67T.week:K67T.weird);hub()})}}]))}

/* ===================================== ACT II: the boiler room, or the row ===================================== */
function k67Row(){go(cutBg(S.f.k67Photo==='told'?'#0c0806':'#0e0a0a'));k67Mark('vr67_row');
 if(S.f.k67Photo==='told')return say([
  ['','After midnight, the side door of the church across town. Ronin has a key on his ring you have never asked about. He lets you in, shuts the door with his hip and takes you down a stair behind the vestry into the boiler room, where it is warm and smells of coal dust and candle ends.'],
  [RN,'First winter I was in this city I slept down here. Old man upstairs found me behind the boiler and didn’t call nobody. Gave me soup and the key and told me not t’steal the candles. I stole the candles.'],
  [RN,'Parish borrowed for the roof off some private lender. Roof leaked anyway. One night in February a fella comes down them stairs for the payment, and the old man ain’t got it, so the fella takes him in the vestry and starts on his fingers. One at a time. Countin’ out loud.'],
  ['','He puts the torch on an iron hook by the boiler hatch. Nothing hangs on it.'],
  [RN,'Crowbar for the hatch used to live there. I heard the old man countin’ along with him. I got up the stairs by four.'],
  ['K9','You left a great deal of evidence.'],
  [RN,'I was a kid, Vee. I was fuckin’ busy.'],
  ['K9','You left him where he fell, in a room with your bedding in it, with the parish’s own crowbar.'],
  [RN,'And the old man come down here with his hand all strapped up and looked at him, and looked at me, and said “burglar”. Told the cops the same. Gave me the key back and said Mass that Sunday with four fingers in a splint.'],
  [RN,'So. You’re the expert. Your law. Eye for an eye. Was I square?'],
  ['K9','He broke four fingers over a roof. You broke one head. By my law you gave him a discount.'],
  ['','Ronin laughs like a lion in feast, and the boiler room throws it back at him off every pipe.']],
  ()=>ask('K9','(He is sitting on the floor with his back to the warm boiler, where he used to sleep, looking up at you.)',[
   {t:'Sit down with him.',fn:()=>{S.f.k67Row='kiss';fr('r',4);say([
     ['',sugOn()?'You sit down on the coal-black floor in your good trousers. He makes a noise about the trousers. Then he pulls you in by the collar, and the torch rolls away under the boiler, and nobody goes after it for a long time.':'You sit down on the coal-black floor in your good trousers. He makes a noise about the trousers. Then he pulls you in by the collar and kisses you, and the torch rolls away under the boiler, and nobody goes after it. You sit in the dark against the warm boiler where he used to sleep, with his head on your shoulder, saying nothing at all, until he is asleep the way he must have slept down here that first winter, and you stay where you are until the boiler ticks itself cool.'],
     [RN,'(later) If the old man’s watchin’ he’s laughin’. Always said I’d bring somebody nice down here and ruin ’em.']],hub)}},
   {t:'“Tell it again, in order. It is going in your file.”',fn:()=>{S.f.k67Row='file';fr('r',3);say([
     [RN,'Romantic.'],
     ['K9','I want the date, the hour, and which hand.'],
     ['','He tells it again in order while you write in your notebook by torchlight. He says the right hand, then remembers it was the left, and makes you cross it out. At the end he takes your pen and draws a crowbar in the margin with a heart on the end of it.'],
     ['K9','That will not be admissible.'],
     [RN,'Ain’t nothin’ about me admissible, Vee.']],hub)}}]));
 const kept=S.f.k67Photo==='kept';
 say([['','Sunday dinner, seven o’clock. At seven the hounds stand up and face the front door, all four of them, and the bell does not ring.'],
  ['','At seven forty Ronin comes in through the kitchen door. He has not been late to anything since he was nine. He puts a copy of the photograph from Hale’s folder face up on the island, and beside it a note in a patient, slanted hand: “He has had this since Tuesday. Ask him what else he keeps.”'],
  k67HaleOut()?[RN,'A cop’s file on my murder turns up on your desk and you don’t even show me the pictures.']:[RN,'You had coffee with a cop about my murder and you didn’t invite me.'],
  ['K9','It was not your murder. You were the one who walked out of the room.'],
  [RN,'Don’t lawyer me, Vee. Not in your own kitchen.'],
  K67MV('...i’m gonna go','i’m gonna take the hounds out. bye.','I’m taking the hounds out. All of them. For a long time.','I’m taking the hounds out. All four. It’s going to be a really long walk. Possibly a hike. Don’t kill each other on the good tiles.'),
  ['','The back door shuts behind them and four hounds.'],
  kept?[RN,'Somebody’s diggin’ up the worst night of my life and mailin’ it to the papers, and you bought the papers. You bought a whole fuckin’ newspaper so I wouldn’t find out.']
   :[RN,'Somebody’s diggin’ up the worst night of my life and mailin’ it to the papers, and you burned it. You burned police property so I wouldn’t find out. That’s the most romantic crime anybody ever done for me and I’m so fuckin’ mad about it.'],
  ['K9','I did not want you in my father’s book.'],
  [RN,'Your father’s what?'],
  ['K9','The lender on that roof was a firm my father owned. I checked. Whoever is sending these is reading from his pages.'],
  ['','Ronin sits down hard on a stool. He laughs once, with no fun in it.'],
  [RN,'So you kept me out of it. Like he would’ve. Quiet, with money. Your daddy with a nicer haircut.']],
  ()=>ask('K9','(He is looking at you the way he looks at men on his floor, and he has not taken his rings off.)',[
   {t:'“You are right. I will not do it again.”',fn:()=>{S.f.k67Row='sorry';fr('r',3);if(typeof relApply==='function')relApply({trust:2});say([
     ['K9','I kept you out because it was easier for me. It was wrong, and I will not do it again.'],
     [RN,'Say the last bit slower.'],
     ['K9','I will not do it again.'],
     [RN,'Good. Now feed me. I sat in the truck forty minutes bein’ late on purpose and it nearly fuckin’ killed me.'],
     ['','He eats two plates. Halfway through the second he tells you about the boiler room with his mouth full: the old priest, the lender’s man, the fingers, the crowbar off the hook, the word “burglar”. Then he takes your hand across the island and will not let go of it to eat, so you have to feed him, which he enjoys enormously.']],hub)}},
   {t:'“I would do it again.”',fn:()=>{S.f.k67Row='stand';fr('r',1);if(typeof relApply==='function')relApply({rivalry:3});say([
     ['K9','I would do it again. I will do it as many times as it takes to keep you out of that book.'],
     [RN,'Yeah?'],
     ['K9','Yes.'],
     [RN,'Then you better get real good at it, Vee, ’cause I’m gonna be goin’ through your drawers.'],
     ['','He goes out the way he came. At seven forty-one he comes back for the photograph, and then, after a moment in the doorway, for you, and kisses you hard enough to put you against the fridge, and leaves again without a word.']],hub)}}]))}

/* ===================================== ACT III: the page ===================================== */
function k67Page(){go(cutBg('#0a0810'));k67Mark('vr67_page');const r=S.f.k65vrRing;S.f.k67PageDay=S.day;
 const L=[['','Late, in the archive, with the ledger open under the lamp. Ronin has heard he is in it as “the Butcher”, spelled wrong, and has asked for that page so he can make somebody eat it.'],
  ['','He has not heard about this one. It is folded into the back cover, behind the blank page with your name at the top. The paper is older than the rest, and the hand is your father’s.'],
  ['','“The Butcher. Boiler room, the church across town. One collector, ours, lost in February. Balance open.” Under it is the collector’s name.']];
 if(r==='on')L.push(['','You know the name. You take the ring off your finger and turn it to the lamp, and the same name is cut inside it, small, by hand.']);
 else if(r==='chain')L.push(['','You know the name. You pull the chain out of your shirt and turn the ring to the lamp, and the same name is cut inside it, small, by hand.']);
 else L.push(['','You do not know the name. You think Ronin will.']);
 L.push(['','Under your father’s line, in the patient, slanted hand that kept the book after him, there is more.'],
  ['','“Offered to the family at cost: forty-one thousand, or the Butcher. The son accepts the second. Collection: the boiler room, ten forty.” Under that, smaller: “Valentin may close the balance himself. See his page.”'],
  ['K9','(He would take my name on the blank page as payment. He would take me.)'],
  ['','You sign nothing. You sit with the page under the lamp until the hounds come down to see why the lamp is still on.']);
 if(S.f.k67Row==='sorry')L.push(['K9','(I told him in my kitchen that I would not keep him out again.)']);
 say(L,()=>ask('K9','(Ten forty is tomorrow night.)',[
  {t:'“It is his balance.” Take him the page.',fn:()=>{S.f.k67Page='his';fr('r',4);if(typeof relApply==='function')relApply({trust:3});const M=[
    ['','You drive to the workshop at one in the morning. Ronin is awake under the stopped church clock, filing a crowbar with the gospel on. You put the page on the bench, and he reads it.'],
    [RN,'Ten forty. Course it’s ten forty.'],
    [RN,'He had a kid. I never once thought about him havin’ a kid. You think about that, when you do one? Whether they got a kid?'],
    ['K9','Always. I make a note.'],
    [RN,'Course you do.']];
   if(S.f.k67Row==='stand')M.push([RN,'You brought it. You coulda kept it. You told me you’d do it again.'],['K9','I said a great many things in my kitchen.']);
   M.push([RN,'Comin’ with me?'],['K9','I am bringing the torch.'],
    ['','He laughs and reaches up and pushes the hand of the dead clock with one finger, all the way round, from twenty to eleven back to twenty to eleven.']);
   say(M,()=>{k67Th(S.f.k67Page==='out'?K67T.mis:K67T.torch);hub()})}},
  {t:'“It is my father’s book.” Keep him out of it.',fn:()=>{S.f.k67Page='out';fr('r',1);apply({edge:1});say([
    ['','You fold the page into your inside pocket. In the morning you text Angel.'],
    ['K9','(text) I need Ronin kept busy tomorrow night, from ten until midnight, somewhere loud.'],
    [AN,'(text) busy HOW. v. VEE. how busy'],
    ['K9','(text) Dinner. Wrestling. You will think of something.'],
    [AN,'(text) ok. and here we see angel, being asked to babysit a grown man so her friend can go do a murder in a church. i love this family. i’m taking him to karaoke'],
    ['','You touch your inside pocket twice before breakfast to check the page is still there.']],()=>{k67Th(S.f.k67Page==='out'?K67T.mis:K67T.torch);hub()})}}]))}

/* ===================================== ACT III: ten forty ===================================== */
function k67Ten(){go(cutBg('#080606'));k67Mark('vr67_ten');const his=S.f.k67Page==='his',r=S.f.k65vrRing;
 const L=his?[['','Half past ten, the church across town. Ronin lets you in by the side door, and you go down to the boiler room with the torch switched off, because he knows the stair in the dark. He hangs his crowbar on the empty hook by the hatch and stands under it with his arms folded.'],
   [RN,'Put it back where I got it. Seemed polite.']]
  :[['','Half past ten, the church across town. The side door takes you eleven seconds with a pick. You go down to the boiler room alone. Across the city Ronin is at karaoke with Angel, and she has sent you a video of him singing a gospel number to a room of drunk accountants. He is very good.']];
 L.push(['','At ten forty exactly the side door opens upstairs. A man in a grey suit comes down the stair with a torch in one hand and a pistol in the other, and stops on the bottom step. He is younger than you expected. He holds the pistol like a man who learned on a range and has never pointed it at a person.']);
 if(his)L.push(['','He puts the torch on Ronin. “You were late once,” he says. “Ten forty. He told me you would never be late again.”'],
  [RN,'Your boss talks about me a lot.'],
  ['','“He says you killed my father in this room and left him for a burglar.”'],
  [RN,'Yeah. I did. You want to know why, or you wanna get on with it?'],
  ['','The pistol wavers. Ronin tells him: the vestry, the counting, the hook. He tells it plainer than he told you, and he leaves the jokes out.'],
  (r==='on'||r==='chain')?['','Then he holds out his hand to you, and you give him the ring, and he holds it in the torchlight so the man can read the name inside.']
   :['','Then he takes the second skull ring off his right hand and holds it in the torchlight so the man can read the name inside.'],
  [RN,'Wore him every day since. Somebody oughta remember what a piece of shit he was. Figured it might as well be me.'],
  ['','Ronin looks over the man’s head at you, and you understand that he is asking.']);
 else L.push(['','He puts the torch on you, and then into every corner of the room, looking for somebody larger.'],
  ['','“Where is he?” he says. “He is never late.”'],
  ['K9','He is at karaoke. I came instead.'],
  ['','“Who are you?”'],
  ['K9','The son of the man who employed your father.'],
  ['','You tell him what his father was doing in the vestry, with the date and the number of fingers.'],
  (r==='on'||r==='chain')?['','You show him the name inside the ring. He reads it twice.']:null,
  ['','“That is not what your book says.”'],
  ['K9','My father started that book, and I have read all of it. I would not trust it with the weather.']);
 say(L,()=>ask('K9',his?'(Ronin is waiting for a ruling. Your law, his crowbar.)':'(The pistol is pointing at your chest. His hand is shaking. Yours is not.)',[
  {t:his?'Nod.':'Take him.',fn:()=>{S.f.k67Ten='end';fr('r',2);apply({veng:3});say(his?[
    ['','You nod. Ronin gives you back the ring and takes the crowbar off the hook. The pistol goes off once, into the coal, and then the boiler room is very loud for a short while. It is the same hook and very nearly the same patch of floor, and Ronin finds that funnier than anyone should.'],
    [RN,'(breathing hard) He come here to kill a man for money. Your law, Vee. I checked.'],
    ['','The hounds eat well that week.']]:[
    ['','You take him before the pistol has finished shaking. It does not take long, and the boiler covers the noise. Afterwards you sit on the bottom step in the dark, and at a quarter past eleven your phone lights up with Ronin singing to the accountants again.'],
    ['','The hounds eat well that week. You do not tell Ronin why.']],hub)}},
  {t:his?'Shake your head.':'Let him go.',fn:()=>{S.f.k67Ten='walk';fr('r',3);apply({heart:3});say((his?[
    ['','You shake your head. Ronin puts the crowbar back on the hook.'],
    ['K9','He has taken nothing yet. By my law he owes nothing yet.'],
    [RN,'Hear that? Man says you’re square. Side door. Go on, before he changes his mind.']]:[
    ['K9','You have taken nothing. By my law you owe nothing. Go up the stair.']]).concat([
    ['','He goes up backwards with the pistol pointed at the floor. At the top he stops. “The service door on the Constance,” he says. “Below the waterline. I have the watch on it Friday.”'],
    his?['','The side door shuts. Ronin puts the ring back in your palm and closes your fingers on it, and then he does not let go of your hand, in the dark, by the boiler, for some time.']
     :['','The side door shuts. You sit on the bottom step in the dark for a while. At a quarter past eleven your phone lights up with Ronin singing gospel to the accountants, and you watch it twice.']]),hub)}}]))}

/* ===================================== ACT III: the boat ===================================== */
function k67BoatLines(){const p=S.f.k67Page,t=S.f.k67Ten,b=S.f.k57rBoat;
 const L=[];
 if(b==='home')L.push(['','Ronin is at home with the wrestling on, and he has the phone on speaker beside him.']);
 else if(b==='two')L.push(['','Ronin is two streets over, in the truck, with the engine running and an earpiece in.']);
 if(p==='his')L.push(['','Before you go up the gangway, Ronin comes on the line.'],
  [RN,'(on the line) Boiler room’s square, Vee. Go close his fuckin’ book. Make him say please and thank you.'],
  ['K9','Please and thank you. Yes.']);
 else L.push(['','Before you go up the gangway you touch your inside pocket. The page from the back of the ledger is still there, folded against your chest, and Ronin does not know it exists.'],
  [RN,'(on the line) Vee. You been weird all week. You got a fella? Gimme his name after. I’ll be real polite.'],
  ['K9','There is nobody. Concentrate.']);
 if(t==='walk')L.push(['','At the service door below the waterline a young man in a grey suit looks at you, looks at his watch, and goes up to the stern for a cigarette. He leaves the door unlocked. (One fewer guard tonight.)']);
 else if(t==='end')L.push(['','There is a new man on the service door, older, who has not heard about the boiler room yet.']);
 return L}
const _a3cK67=a3Climax;a3Climax=function(){try{if(K67r()&&S.phase==='act3'&&S.f.k67Page&&!S.f.k67Boat){S.f.k67Boat=1;save();return cut(k67BoatLines(),()=>_a3cK67(),'#04101a')}}catch(e){}return _a3cK67()};
/* the son left the service door open: one guard fewer (a placeholder ally for the length of the call only) */
const _a3bK67=a3Boat;a3Boat=function(p){let A=null;try{if(K67r()&&S.f.k67Ten==='walk'&&S.a3&&S.a3.allies){A=S.a3.allies;A.k67door=1}}catch(e){}try{return _a3bK67(p)}finally{if(A)delete A.k67door}};
function k67ChairLines(){const p=S.f.k67Page,L=[];
 if(p==='out')L.push(['','“And you closed the Butcher’s balance yourself, at ten forty, without telling him,” the Chairman says. “Your father would have done precisely that.”'],['K9','I know.']);
 else L.push(['','“I hear Mr Beaufort closed his own balance, with you holding the torch,” the Chairman says. “Your father never let anyone else hold anything.”'],['K9','I am aware.']);
 if(S.f.k67Ten==='walk')L.push(['','“And one of my men went for a cigarette and has not come back. I suppose that was you as well.”']);
 return L}
const _a3chK67=a3Choice;a3Choice=function(ok){try{if(K67r()&&S.phase==='act3'&&S.f.k67Page&&!S.f.k67Ch){S.f.k67Ch=1;save();return say(k67ChairLines(),()=>_a3chK67(ok))}}catch(e){}return _a3chK67(ok)};

/* ===================================== EPILOGUE: February ===================================== */
function k67Epi(){go(cutBg('#0c0806'));k67Mark('vr67_epi');const t=S.f.k67Ten;
 if(S.f.k67Page==='his'){const L=[['','February, the church across town. There is scaffolding up the side of it, a skip of old slates in the road, and no bucket in the aisle.'],
   [RN,'Roof’s fixed. Anonymous donor. Paid off the whole loan, plus interest, to some firm that don’t exist no more.'],
   ['K9','How unusual.'],
   [RN,'Foreman owes me money, Vee. He showed me the cheque. You signed it with your fuckin’ initials.'],
   ['K9','I have always signed with my initials.'],
   ['','He takes you down to the boiler room. The crowbar is back on its hook by the hatch.'],
   t==='end'?['','Somebody has cleaned it very carefully and hung it back straight.']:['','Nobody has touched it since the night the man in grey went up the stair.']];
  if(S.f.k67Row==='kiss')L.push([RN,'Torch is still under the boiler. I ain’t gettin’ it out. It lives there now.']);
  else if(S.f.k67Row==='file')L.push([RN,'Read my file in January. There’s a crowbar with a heart on it in the margin, and you never crossed it out.'],['K9','It was evidence.']);
  return say(L,()=>ask('K9','(He has his back to the warm boiler, and he is waiting for you to say something.)',[
   {t:'Say it in your own words.',fn:()=>{S.f.k67Epi='own';fr('r',3);say([
     ['K9','I love you. I have loved you since you climbed into my lap to die, which was inconvenient, and I have filed it under every heading I have.'],
     [RN,'Every headin’?'],
     ['K9','Medical. Financial. Statements made while sedated. Security.'],
     [RN,'Security?'],
     ['K9','You are the largest risk to my house. You come in through the roof.'],
     ['','He laughs until the boiler answers him, and then he climbs into your lap, alive, on purpose this time.']],hub)}},
   {t:'Say it in his.',fn:()=>{S.f.k67Epi='quote';fr('r',3);say([
     ['K9','You have real nice hands, Ronin. I hope they are the ones that bury me.'],
     [RN,'...That’s mine. You can’t have that. That’s my dyin’ speech.'],
     ['K9','You did not die. I am keeping it.'],
     ['','He puts his face in your collar, as he did on the night of the tea, and stays there a long while, and does not snore once.']],hub)}}]))}
 const L=[['','February, the church across town, the boiler room, ten forty at night. You came because he texted one word: “down”. He is sitting on the floor with his back to the boiler and the page from the back of the ledger on his knee.'],
  ['','You put it in his file. You folded it into the back cover, behind the last page, where you thought he would never look. He read the file in January on your bed and laughed at all of it. He found the back cover in February.'],
  [RN,'Folded in the back. Same as your old man done it.'],
  [RN,'Angel sang karaoke with me for two hours, Vee. Two hours, and she hates karaoke. She was babysittin’ me while you went and did my fuckin’ job.']];
 if(t==='end')L.push([RN,'And then the hounds were real fat for a week and nobody said why.']);
 else if(t==='walk')L.push([RN,'And then a fella in grey left a door open on that boat, and nobody said why.']);
 if(S.f.k67Row==='sorry')L.push([RN,'You told me in your kitchen. You said it slow and everythin’.']);
 say(L,()=>ask('K9','(He has not looked up from the page.)',[
  {t:'“I should have brought it to you.”',fn:()=>{S.f.k67Epi='sorry';fr('r',3);calm(1);say([
    ['K9','I should have brought it to you. It was your balance. I kept you out of it the way my father kept people out of things, and I am sorry.'],
    [RN,'Write it down.'],
    ['K9','What?'],
    [RN,'In my file. In your writin’. “Subject is not to be kept out.” Underline it. Twice.'],
    ['','You write it on the back of the ledger page, on your knee, by the boiler, and underline it twice. He folds it up, buttons it into his shirt pocket, and then moves over so you can sit down.']],hub)}},
  {t:'“I would do it again.”',fn:()=>{S.f.k67Epi='again';fr('r',2);say([
    ['K9','I would do it again.'],
    [RN,'Yeah. I know.'],
    [RN,'I’d do it for you too. Every time, and lie about it after. We’re both gonna do this forever, Vee. Worst fuckin’ news I ever heard.'],
    ['','He tears the page in half, and in half again, and feeds the pieces into the boiler hatch one at a time. Then he holds out his hand for you to pull him up, and keeps hold of it all the way up the stairs.']],hub)}}]))}

/* ===================================== MORNINGS ===================================== */
EVENTS.push({id:'k67vr_morn',when:()=>{try{return K67()&&S.phase==='normal'&&k67Did('church')&&(S.vromDates||0)>=2}catch(e){return false}},run:done=>say([
 ['',sugOn()?'You wake at Ronin’s at nine, in his bed above the workshop. Through the floor you can hear the gospel radio and something frying. Downstairs the church clock over the bench still says twenty to eleven.':'You wake at Ronin’s at nine, on top of the covers of his bed above the workshop, still in your shirt and trousers, where you fell asleep at two while he was reading you the wrestling results. Through the floor you can hear the gospel radio and something frying. Downstairs the church clock over the bench still says twenty to eleven.'],
 ['','While he cooks, you take his crowbars off the wall and hang them back up in order of length. It takes eleven minutes and it is the most relaxing thing you have done in a year.'],
 [RN,'(on the stairs, holding a spatula) The fuck did you do to my wall.'],
 ['K9','I put them in order.'],
 [RN,'They WERE in order. They were in order of who.'],
 ['','He makes you put them back from memory, in order of who. You get all but two right. He finds this more upsetting than if you had got them all wrong, and feeds you bacon off the spatula to shut you up.']],()=>{fr('r',2);done()})});

EVENTS.push({id:'k67vr_loft',when:()=>{try{return K67()&&S.phase==='act2'&&!!S.f.k67Photo&&(S.f.k67PhotoDay||0)<S.day}catch(e){return false}},run:done=>say([
 [AN,'(text) v. a features editor i do makeup for showed me a photo today and asked if i knew the two men in it'],
 S.f.k67Pew==='hand'?[AN,'(text) it’s you and ronin. in a CHURCH. holding HANDS. in the front row like a wedding']
  :[AN,'(text) it’s you and ronin in a church, from the organ loft. i know that loft. i shot a wedding from it once. with a camera. mostly'],
 [AN,'(text) i said i’d never seen either of you in my life, and then i did her contour so badly she’s going on air tomorrow looking like a melted candle'],
 ['K9','(text) Thank you, Angelic.'],
 [AN,'(text) don’t thank me. also you look so good in that coat. i’m not telling ronin i said that, he’d fight me for it']],()=>{fr('a',1);done()})});

EVENTS.push({id:'k67vr_morn2',when:()=>{try{return K67()&&S.phase==='epilogue'&&k67Did('epi')}catch(e){return false}},run:done=>say([
 ['',sugOn()?'You wake at ten in your own bed with coal dust on the pillowcase, on your hands, and, you discover in the bathroom mirror, on your neck in the shape of four fingers and a thumb.':'You wake at ten in your own bed with coal dust on the pillowcase, on your hands, and, you discover in the bathroom mirror, on your neck in the shape of four fingers and a thumb, where he held on to you, asleep, all the way home from the church in the back of the car last night.'],
 [RN,'(from the bed) Leave it. Go to the board like that.'],
 ['K9','I have a board meeting at eleven.'],
 [RN,'I know. I read your diary. Why d’you think I done it.'],
 ['','You go to the board with your collar up. The chairman of the board asks whether you have been doing building work. You tell him you have been restoring a church.']],()=>{fr('r',2);done()})});

/* ===================================== THREADS ===================================== */
txDef('tx_k67_eyes',{with:'r',pov:'v',prio:1,when:()=>K67()&&['normal','act2'].includes(S.phase)&&k67Did('church'),nodes:{
 start:{in:()=>['(a photograph: your reading glasses, folded on his nightstand, on top of a hymn book)','you left your eyes here'],expire:3,
  opts:()=>[{t:'“I have a spare pair.”',fx:()=>fr('r',1),reply:()=>['course you do','I’m wearin these then. devil says they suit me']},
   {t:'“I will come for them at seven.”',fx:()=>fr('r',3),reply:()=>['7:00','on the dot. bring nothin']},
   {t:'“Read me something from the hymn book.”',fx:()=>fr('r',1),reply:()=>[],next:'hymn'}]},
 hymn:{in:()=>['which one. I know all of em. pick a number'],
  opts:()=>[{t:'“Any number. I want to hear how you ruin it.”',fx:()=>fr('r',3),reply:()=>['(a voice note, four minutes long. it starts as a hymn. the second verse is about your hands.)','that one’s 12. don’t look it up, the real words are worse']},
   {t:'“Number forty-one.”',fx:()=>fr('r',2),reply:()=>['41','vee there’s only 40 in this book','you did that on purpose. you and that fuckin number']}]}}});

txDef('tx_k67_week',{with:'r',pov:'v',prio:1,when:()=>false,nodes:{
 start:{in:()=>['can’t sleep','keep hearin the old man countin','talk to me about somethin boring. talk to me about your shelter accounts'],expire:3,
  opts:()=>[{t:'“Section four. Dog food, bulk.”',fx:()=>fr('r',2),reply:()=>['keep goin','slower. say bulk again']},
   {t:'“I am coming over.”',fx:()=>fr('r',3),reply:()=>['door’s open','well. roof’s open']}]}}});

txDef('tx_k67_weird',{with:'r',pov:'v',prio:1,when:()=>false,nodes:{
 start:{in:()=>['you been weird all week','you got a fella?','gimme his name. I’ll be real polite'],expire:3,
  opts:()=>[{t:'“There is no fella.”',fx:()=>fr('r',1),reply:()=>['that’s what a guy with a fella says']},
   {t:'“I am handling something for the foundation.”',fx:()=>fr('r',1),reply:()=>S.f.k67Photo==='burn'?['foundation stuff','ok. you smell like burnt cardboard and you don’t smoke']:k67HaleOut()?['foundation stuff','ok. you got ink on your face. you been sleepin on your desk again']:['foundation stuff','ok. you smelled like coffee shop on tuesday. you don’t drink coffee']}]}}});

txDef('tx_k67_mis',{with:'m',pov:'v',prio:1,when:()=>false,nodes:{
 start:{in:()=>['you keep touching your inside pocket like it’s gonna run off','is it a page from that book','one: if it’s ronin’s, tell him. two: he sulks. three: et cetera, whatever, he gets over it. that’s my whole list'],expire:2,
  opts:()=>[{t:'“It is not his.”',reply:()=>['liar','ok. i’m not telling him. for like a week. then i’m telling him']},
   {t:'“It is his. I am not telling him.”',reply:()=>['v','ok','if he finds out, i was never here. i was at karaoke']}]}}});

txDef('tx_k67_torch',{with:'m',pov:'v',prio:1,when:()=>false,nodes:{
 start:{in:()=>['ronin borrowed my good torch','he’s never borrowed anything in his life. he just takes stuff','what are you two doing tomorrow night'],expire:2,
  opts:()=>[{t:'“Church.”',reply:()=>['at ten forty at night','sure. ok. don’t tell me. bring the torch back']},
   {t:'“Restoring a boiler.”',reply:()=>['is that a sex thing','don’t answer that. bring the torch back']}]}}});

txDef('tx_k67_epi',{with:'r',pov:'v',prio:1,when:()=>K67()&&S.phase==='epilogue'&&k67Did('epi')&&S.f.k67Page==='his',nodes:{
 start:{in:()=>['(a photograph: the aisle of the church across town, dry, with no bucket in it)','first sunday with no drip','priest cried. said it was a miracle. I said it was a guy with initials'],expire:3,
  opts:()=>[{t:'“The donor wishes to remain anonymous.”',fx:()=>fr('r',1),reply:()=>['he knows. he looked right at me','then he looked at the ceilin like he was thankin somebody else. rude']},
   {t:'“Save me a seat.”',fx:()=>fr('r',2),reply:()=>['already did','it’s got your coat on it. people keep tryin to sit there and I keep lookin at em']}]}}});

/* ===================================== DELIVERY ===================================== */
const K67B=[
 {id:'vr67_church',t:'Ronin: “church. sunday. wear the good coat.”',sub:'costs time · date · the church across town',when:()=>S.phase==='normal'&&(S.vromDates||0)>=1,run:k67Church},
 {id:'vr67_photo',t:()=>k67HaleOut()?'An envelope for “the man who answers letters”':'Inspector Hale, with two coffees',sub:'costs time · a photograph of the two of you',when:k67A2,run:k67Photo},
 {id:'vr67_row',t:()=>S.f.k67Photo==='told'?'Ronin: “bring a torch.”':'Ronin is forty minutes late',sub:()=>S.f.k67Photo==='told'?'costs time · date · the boiler room':'costs time · he knows',when:()=>['act2','act3'].includes(S.phase)&&!!S.f.k67Photo&&S.day>(S.f.k67PhotoDay||0),run:k67Row},
 {id:'vr67_page',t:'A page folded into the back of the ledger',sub:'costs time · his name, and a price',when:k67A3,run:k67Page},
 {id:'vr67_ten',t:'The boiler room, at ten forty',sub:'costs time · the collection',when:()=>S.phase==='act3'&&!!S.f.k67Page&&S.day>(S.f.k67PageDay||0),run:k67Ten},
 {id:'vr67_epi',t:()=>S.f.k67Page==='his'?'Ronin: “roof’s fixed. c’mere.”':'Ronin texts one word: “down”',sub:'costs time · the church across town, February',when:()=>S.phase==='epilogue'&&!!S.f.k67Page,run:k67Epi}];
function k67Due(){if(!K67()||!k67Free())return null;for(const b of K67B){if(k67Done(b.id))continue;let ok=false;try{ok=!!b.when()}catch(e){}if(ok)return b}return null}
const k67V=x=>typeof x==='function'?x():x;
const _shK67=sideHub;sideHub=function(late){const o=_shK67(late);try{const b=k67Due();if(!b)return o;
 return o.concat([{t:'♥ '+k67V(b.t),sub:k67V(b.sub),dis:!!late,fn:()=>{spend();b.run()}}])}catch(e){return o}};
/* "Date night" after the first three: kc65's due beat first (the inner wrapper), then this one */
const _vdK67=vromDate;vromDate=function(k){try{if(k==='r'&&K67()&&(S.vromDates||0)>=3&&k67Free()){const b=k67Due();if(b){S.vromDates=(S.vromDates||0)+1;spend();save();return b.run()}}}catch(e){}return _vdK67(k)};

/* ===================================== ENDINGS ===================================== */
const _xeK67=extraEnding;extraEnding=function(){const L=_xeK67();if(!S||!S.f||S.vrom!=='r'||S.pov!=='v')return L;const f=S.f;
 if(f.k67Epi==='own')L.push('V has filed Ronin under every heading he keeps, security included. The church across town has a new roof, paid for by a man who signs with his initials.');
 else if(f.k67Epi==='quote')L.push('Ronin no longer owns his dying speech. V says it back to him, word for word, on bad nights, and the church across town has a new roof.');
 else if(f.k67Epi==='sorry')L.push('At the back of Ronin’s file, on the back of a page from the Chairman’s ledger, in V’s hand, underlined twice: “Subject is not to be kept out.”');
 else if(f.k67Epi==='again')L.push('A page from the back of the Chairman’s ledger went into a church boiler in February, in pieces. V would keep Ronin out of it again. Ronin would do the same for him, and lie about it after.');
 else if(f.k67Ten==='walk')L.push('Every February a postcard with no message comes to the foundation from somewhere warm. V files it in the drawer for the ones he let go.');
 else if(f.k67Ten==='end')L.push('There is a crowbar on a hook in the boiler room of the church across town. It has been used twice, years apart, by the same man.');
 else if(f.k67Pew==='hand')L.push('Somewhere there is a photograph, taken from an organ loft, of two men holding hands in the Devil’s pew.');
 return L};
