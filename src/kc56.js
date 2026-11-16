/* ===================== kc56: THE BACKBONE =====================
   Bridging scenes that tie the phases into one story:
   - Act I: Misaki's contracts and V's paperwork land on the same organisation; a polite man in a grey suit buys
     her address; the car outside her lot belongs to Constance Holdings (a ship for a logo).
   - The kidnapping: they wanted K9, and somebody sold them which door. The boss says so at the end.
   - Act II: Hale, Isherwood and Avery are set up before the case, with motives; the Mimic's pages came from the
     note-taker's copies and from the man in grey; V burned his father's ledger once and thought it was over.
   - Act III: the ledger's hand trained the note-taker's; the river page shows the Chairman sold her address
     (through K. and T., who are names five and three); the blank page is a vacancy he wants V to fill.
   - Epilogue: the ship is checked for and gone, or (without Act III) the card arrives and goes in a drawer.
   Scenes run once each, first thing in the morning, through the scheduler below (one per morning at most).
   k56HaleOut(): Hale was the Mimic, so he is gone by Act III and his Act III lines are replaced. */
const K56=[];
const k56Add=o=>K56.push(o);
function k56HaleOut(){return !!(S&&S.case&&S.case.cul==='hara')}
function k56Org(){const k=(S&&S.captor)||captorOrg();return ORG[k]||ORG.sato}
function k56Seen(id){return !!(S&&S.f&&S.f.k56&&S.f.k56[id]!==undefined)}
function k56Mark(id){S.f.k56=S.f.k56||{};S.f.k56[id]=S.day;save()}
const k56A2=()=>S&&S.phase==='act2'&&S.act2Start?S.day-S.act2Start+1:0;
const k56A3=()=>S&&S.phase==='act3'&&S.a3?S.day-S.a3.start+1:0;
const k56Post=()=>typeof kdPost==='function'?kdPost():!!(S&&S.phase==='after');
const K56NUM=['no','one','two','three','four','five','six','seven','eight','nine'];
function k56Hits(){const k=(S&&S.captor)||captorOrg();const n=(S.orgs&&S.orgs[k])||1;return n<K56NUM.length?K56NUM[n]:'a dozen'}
function k56Due(){if(!S||!S.f||S.f.k56Last===S.day)return null;return K56.find(x=>{if(k56Seen(x.id))return false;try{return !!x.when()}catch(e){return false}})||null}
function k56Play(id,cb){const sc=K56.find(x=>x.id===id);if(!sc){if(cb)cb();return}k56Mark(id);sc.run(cb||hub)}
const _k56me=morningEvent;morningEvent=function(done){const sc=k56Due();if(sc){S.f.k56Last=S.day;k56Mark(sc.id);return sc.run(()=>_k56me(done))}return _k56me(done)};
const K56M=(...a)=>['hitmeuppp',MV(...a)];

/* ---------- Act I: two grudges on the same name ---------- */
k56Add({id:'k56_file',when:()=>S.phase==='normal'&&S.day>=3&&!isLone()&&Object.keys(S.orgs||{}).length>0,run:done=>{const o=k56Org();
 if(S.pov==='v')return say([['','The foundation’s lawyers send up their quarterly file at nine: forty pages on '+o.name+', the shell companies, and the cash that goes in clean and comes out cleaner.'],
  ['K9','(He has been building this one since the summer. The cover page says K9, because that is the name the papers are afraid of.)'],
  ['','In the margin somebody from legal has pencilled a note: '+k56Hits()+' of their people have died this year, in ways the police call professional.'],
  ['K9','(He knows whose work that is. He has watched her hold a rifle level for six hours on a roof, through his own scope, on a night he has never mentioned to her.)']],
  ()=>ask('K9','The file on '+o.name+'.',[
   {t:'Send it to the papers now',sub:'+reputation · they will start asking who K9 is',fn:()=>{S.f.k56File='now';apply({rep:3});say([['','By Friday two newspapers have it. '+o.boss+' reads it over breakfast, and by lunch somebody in that office is asking who K9 is, and who he talks to at night.']],done)}},
   {t:'Hold it until it is airtight',sub:'slower',fn:()=>{S.f.k56File='hold';say([['K9','Not yet. I want it to close like a door.'],['','The file goes back in the drawer. Somebody in '+o.name+' has already heard that it exists, and by Thursday somebody there is asking who K9 talks to at night.']],done)}}]));
 say([['','V is at the trailer at eleven at night with a folder under his arm, which is how he says hello now.'],
  ['K9','You have killed '+k56Hits()+' of '+o.name+'’s people this year.'],
  K56M('and?? they had it coming. invoice says so','and? they were on the board. paid is paid','And? Every one of them was on my board for a reason. I read the reasons.','And every one of them had it coming, babe, and I can show you the paperwork. Is this about the canal one? I know the canal one was gross.'),
  ['K9','I am filing against them on paper. My file, your bodies. Anyone who reads both will see two kinds of trouble arriving from two directions, and will want to know who stands between them.'],
  K56M('so we’re like. coworkers','so we’re a team now. cute. terrifying','So somebody’s going to put us in the same sentence. Great.','So the same people want us both dead for two different reasons. That’s almost romantic. That’s a bit romantic, V.'),
  ['K9','Lock the door at night. Both bolts.'],
  ['','She locks one. It is a matter of principle.']],()=>{S.f.k56File='m';done()})}});

k56Add({id:'k56_grey',when:()=>S.phase==='normal'&&S.day>=4&&!isLone()&&k56Seen('k56_file')&&S.f.k56.k56_file<S.day,run:done=>{
 if(S.pov==='v')return say([['','An anonymous donation lands in the shelter fund overnight: forty-one thousand dollars, one for each city, from a company called Constance Holdings.'],
  ['','The covering note is a single card with a small ship for a watermark. There is no signature.'],
  ['K9','(Nobody gives forty-one of anything by accident. Somebody has read the brochure very carefully.)']],
  ()=>ask('K9','Forty-one thousand dollars, from a ship.',[
   {t:'Keep it for the shelters',sub:'+$41k',fn:()=>{S.f.k56Ship='kept';apply({funds:41});say([['','The money goes to the shelters in the north. He puts the card in the drawer of things he does not yet understand, and it sits on top of the pile.']],done)}},
   {t:'Send it back',sub:'+conscience',fn:()=>{S.f.k56Ship='back';apply({heart:2});say([['','The cheque comes back a week later in a fresh envelope, uncashed. On the back somebody has written, in a small slanted hand: “It was a gift. Your father always kept gifts.”'],['K9','(He reads it at the kitchen counter, standing up, and then he reads it again.)']],done)}}]));
 say([['','The lot manager stops her by the bins. In four years he has never once asked her anything.'],
  ['Lot manager','Fella came by yesterday. Grey suit, nice shoes. Paid cash to look at the register.'],
  K56M('what register','the TENANT register? u have a register??','You keep a register of tenants? And you showed it to him?','You keep a list of who sleeps in which trailer, and you let a man in a grey suit read it for cash. Okay. Just checking I heard the whole sentence.'),
  ['Lot manager','Didn’t write nothing down. Just looked at your line a while. Said it was a lovely lot.'],
  ['','She checks the trailer that night: the windows, the hinges, the gap under the floor. Nobody has touched anything. Whoever he was, he only wanted to know which door.'],
  K56M('(one: grey suit. two: cash. three: rifle under the bed.)','(one: grey suit. two: cash. three: rifle under the bed tonight.)','(One: a grey suit. Two: cash. Three: the rifle sleeps under the bed tonight.)','(One: a grey suit with nice shoes. Two: he paid cash, so he’s done this before. Three: the rifle sleeps under the bed, and I sleep on top of it.)')],
  ()=>{S.f.k56Grey=1;done()})}});

/* ---------- the kidnapping: the car outside the lot ---------- */
k56Add({id:'k56_plate',when:()=>S.phase==='taken'&&S.pov==='v',run:done=>{const o=k56Org();
 say([['','At four in the morning he runs the partial plate from the lot camera: the car that idled under the broken streetlight two nights before she went.'],
  ['','Eleven possible matches. Ten are delivery firms and a funeral home. The third car on the list is registered to Constance Holdings, a company with a small ship for a logo and no directors anyone can name.'],
  S.f.k56Ship?['K9','(The same ship was on the card that came with the forty-one thousand dollars.)']:null,
  ['K9','(The people who took her are '+o.name+'. The car that watched her door belongs to somebody else.)'],
  ['','He writes CONSTANCE on the inside of his wrist in biro, so that he cannot lose it, and goes back to the river map.']].filter(Boolean),()=>{S.f.k56Plate=1;done()})}});

/* ---------- after: why her, and the two people the Mimic will come out of ---------- */
k56Add({id:'k56_why',when:()=>S.phase==='after'&&k56Post()&&!isLone(),run:done=>{const o=k56Org();
 say([['','The kitchen, late. The list is on the table between them.'],
  K56M('why me tho','why me. like actually. i’m one guy with a rifle','Why me? Out of everyone who’s ever hurt them. I’m one person with a rifle and a trailer.','I keep doing the sum and it doesn’t come out, babe. I’ve hit a lot of people. Why me, why that week, and why did they already know which trailer?'),
  ['K9','You cost '+o.name+' '+k56Hits()+' of their people. I put their accounts in a file with my name on the cover.'],
  ['K9','They could not find K9. They could find you, and they thought you would know where I sleep.'],
  S.leaks>0?K56M('i did know.','i did know. that’s the bad part','I did know. That’s the bit I keep landing on.','I did know, and I don’t remember what I told them. That’s the bit I keep landing on.')
   :K56M('i didn’t tell them shit','i didn’t tell them. for the record','I didn’t tell them. For the record. For the list.','I didn’t tell them anything, and they kept asking politely, like they had all week. They did have all week.'),
  ['K9','There is a third thing. The lot has forty trailers, and they walked straight to yours.'],
  S.f.k56Grey?K56M('the grey suit','the grey suit. the register','The man in the grey suit. He read my line in the register.','The grey suit. He stood by the bins and read my line in a book, and a week later there was a van.')
   :K56M('someone sold the door','somebody sold them the door','Somebody sold them which door.','Somebody sold them my door, and I want to know what I went for.'),
  S.f.k56Plate?['K9','A car belonging to a company with a ship on its letterhead sat outside your lot two nights before. The company has no directors. I am still looking.']:['K9','I do not know who yet. I am looking.'],
  ['','He adds a line under the names on the list and leaves it blank.'],
  K56M('ok','ok. look faster','Then look faster. I’ll help when my hand works.','Then we look together, when my hand works. And when we find the seller I pick the method. That’s my one condition.')].filter(Boolean),
  ()=>{note('k56_why','They took her for two reasons: her contracts, and his file on '+o.name+'. Somebody sold them which trailer.');done()})}});

k56Add({id:'k56_hale',when:()=>S.phase==='after'&&k56Post()&&!isLone()&&k56Seen('k56_why')&&S.f.k56.k56_why<S.day,run:done=>{
 if(S.pov==='v')return say([['',S.seen&&(S.seen.w59_v_hale||S.f.w59_hale_after)?'Inspector Hale comes back to the foundation at ten in the morning, again with a cheap coffee and again with no appointment.':'Inspector Hale comes to the foundation at ten in the morning with a cheap coffee and no appointment.'],
  ['Hale','Mr. V. Somebody cleaned a warehouse by the river last week. Floors, walls, the drains. Nobody cleans a warehouse that well unless something happened in it.'],
  ['K9','I fund shelters, Inspector. I do not own warehouses.'],
  ['Hale','No. But I have kept a file on a man who calls himself K9 for four years, and every page in it is about somebody who had it coming. I would like to know who had that warehouse coming.'],
  ['K9','So would I.'],
  ['','Hale writes that down and underlines it. On his way out he stops in front of the photograph of the hounds in the lobby and looks at it for longer than anybody ever has.']],()=>{S.f.k56Hale=1;done()});
 say([['','From the landing she watches a man in a good coat walk out of V’s front door with a cheap coffee. On the step he looks up at the windows, one at a time, as if he were counting them.'],
  K56M('who’s the coat','who’s the coat guy','Who was the man with the coffee?','Who was the man with the coffee, and why did he count the windows?'),
  ['K9',S.seen&&S.seen.w59_m_hale?'Inspector Hale. You have met him, at the noodle stand. He has kept a file on K9 for four years. He is the only policeman in this city who reads to the end.':'Inspector Hale. He has kept a file on K9 for four years. He is the only policeman in this city who reads to the end.'],
  K56M('cool. hate him','cool. i hate him. he looks smart','Great. He looks smart. I hate smart policemen.','Great. A policeman who reads. That’s the worst kind, babe. They notice things.')],()=>{S.f.k56Hale=1;done()})}});

k56Add({id:'k56_avery',when:()=>S.phase==='after'&&k56Post()&&!isLone()&&k56Seen('k56_hale')&&S.f.k56.k56_hale<S.day,run:done=>{const o=k56Org();
 say([['','A letter comes to the foundation on '+o.name+'’s letterhead. It is two lines long and signed in a small upright hand: Ren Avery, Accounts.'],
  ['','“We note that one of our vehicles has not been returned. We would be grateful for its whereabouts, so that we may close the account.”'],
  K56M('the van. he wants the VAN back','he wants the van. the van they put me in','He wants the van back. That van.','He’s asking for the van back, V. The one with my fingernails in the gravel outside it. He wants to close the account.'),
  ['K9','He was not in the warehouse. I have checked every name I was given, and his is not among them. He kept their books.'],
  K56M('so he’s just a guy','so he’s just a guy with a pen','So he’s a man with a pen.','So he’s a man with a pen who knows exactly what that van is for, and writes to us about it like it’s a library book.'),
  ['K9','I am going to keep this letter.'],
  ['','He files it under A, in the drawer of people he has not decided about.']],()=>{S.f.k56Avery=1;done()})}});

/* the boss's last words: the address was bought */
const _k56end=ending;ending=function(kind){if(kind==='final'&&S&&S.phase==='after'&&!isLone()&&!k56Seen('k56_boss')){k56Mark('k56_boss');return k56BossScene(()=>_k56end(kind))}return _k56end(kind)};
function k56BossScene(cb){const o=k56Org();const me=S.pov==='v'?'K9':'hitmeuppp';let L;
 if(S.f.finalRuin)L=[['','Four days after the accounts freeze, a lawyer for '+o.name+' asks for ten minutes with V and gets six.'],
  ['Lawyer','My client wishes you to know it was never personal. The address was bought. It was not cheap, and the man who sold it keeps very good books.'],
  ['K9','Who?'],
  ['Lawyer','My client would rather go to prison than say that name, Mr. V. I would draw my own conclusions.']];
 else if(S.f.bossLives)L=[['','A text arrives from a number that stops working an hour later.'],
  ['???','you think this was my idea. i PAID for your address. ask the man with the ship who sold it. he keeps a book.'],
  [me,me==='K9'?'(He forwards it to himself three times, so it cannot be lost.)':MV('...a book.','a book. great. a BOOK','A book. Somebody has me in a book.','A book. There’s a man somewhere with my address in a book, and he got paid for it.')]];
 else L=[['','At the end, '+o.boss+' does not beg. There is one thing left to say, and it comes out calmly, from somebody who has already been paid for it.'],
  [o.boss,'You think this was my idea? I bought your address. Ask who sold it to me. He keeps a book.'],
  [me,me==='K9'?'Who?':MV('who','who sold it','Who sold it?','Who sold it? Say the name and I’ll make this quick.')],
  ['',o.boss+' laughs once, and that is the last thing anybody gets.']];
 if(S.f.k56Plate)L.push(['K9','(A book. He writes it on the inside of his wrist, under the other word.)']);
 go({draw(){rect(0,0,W,H,'#05040a')}});cut(L,cb,'#05040a')}

/* ---------- Act II: the suspects, the pages, the grey suit, the burned ledger ---------- */
k56Add({id:'k56_a2sus',when:()=>S.phase==='act2'&&k56A2()>=2&&!isLone(),run:done=>{const o=k56Org();
 say([['','The case board goes up on the kitchen wall, because the archive is too far from the coffee.'],
  ['K9','Somebody wants me to wear these. I can think of three people, and none of them is a stranger.'],
  ['K9',S.f.k56Hale?'Inspector Hale has kept a file on K9 for four years. He came to the foundation while you were in the infirmary and asked about the river.':'Inspector Hale has kept a file on K9 for four years, and been laughed at for it at every Christmas party since.'],
  K56M('the coffee cop','the cop with the coffee. he looks at me like a crossword','The one with the coffee. He looks at me like a crossword he’s nearly finished.','The one with the cheap coffee and the good coat. He looks at me like a crossword he’s nearly finished, and I hate crosswords, V.'),
  ['K9',S.q&&S.q.stalker>=2?'Dale Isherwood. The man who wrote Angelic’s letters. We took his job, his flat and his good name, on paper.':'Dale Isherwood. A hotel guard who wrote Angelic letters in a cipher he invented. She says he stopped. Men like that stop for a while.'],
  ['K9','Ren Avery kept '+o.name+'’s books. '+(S.f.k56Avery?'He wrote to ask for the van back. ':'')+'Every man in my paperwork was also in his ledgers.'],
  K56M('so. cop, creep, accountant','cop, creep, accountant. sounds like a bad joke','A cop, a creep and an accountant walk into a gala. One of them’s wearing your name.','A cop, a creep and an accountant. One of them stamped those tags by hand and enjoyed it. I want to see their hands, V.'),
  ['K9','Then we will go and look at their hands.'],
  ['','(The three of them are on the case board. You can visit each from the day planner.)']],done)}});

k56Add({id:'k56_lone2',when:()=>S.phase==='act2'&&k56A2()>=2&&isLone(),run:done=>{const o=k56Org();
 say(S.lone==='v'?[['K9','(Somebody wants me to wear these. Inspector Hale has kept a file on K9 for four years. A hotel guard once wrote Angelic letters in a cipher. Ren Avery kept '+o.name+'’s books and was never in the warehouse.)'],
  ['K9','(She would have made a joke of it: a cop, a creep and an accountant. I will write the names on the wall instead, in the kitchen, where she used to sit.)']]
 :[['hitmeuppp','(one: hale, the cop with the coffee. four years on a K9 file. two: the hotel creep who wrote angel those letters. three: ren avery, who kept '+o.name+'’s books and wasn’t in the warehouse.)'],
  ['hitmeuppp','(a cop, a creep and an accountant. he’d have made the face. i’m doing the face for him. somebody has to.)']],done)}});

k56Add({id:'k56_a2pages',when:()=>S.phase==='act2'&&k56A2()>=5&&!isLone()&&k56Seen('k56_a2sus'),run:done=>{const b=S.f.kdBook;const said=(S.kd&&S.kd.said)||0;
 say([b==='burn'?['K9','I burned the note-taker’s book in the incinerator off the kennel corridor, and I watched the binding go. He made copies. Men who write that neatly always make copies.']
   :(b==='read'||b==='v'||b==='vsolo')?['K9','We read his notebook. Whatever was in it, the man who wrote it kept a fair copy and sent it somewhere every night.']
   :['K9','The pages that came in the post are photocopies. Somebody has the original, and is enjoying it.'],
  K56M('who keeps a copy of THAT','who even WANTS a copy of that','Who wants a copy of that? Who reads it at breakfast?','Who reads a copy of that over breakfast, V? Who files it?'),
  ['K9','The man who paid for it. A note-taker does not write for himself.'],
  (said>0||S.leaks>0)?K56M('so my list is in it','so whatever i said is in someone’s drawer','So whatever I said in there is in somebody’s drawer.','So whatever I said in there, the jobs, the list, the trailer row, is in somebody’s drawer, and now somebody is using it to kill people in your coat.')
   :K56M('i said hounds. that’s all','i gave them four hounds. that’s it','All I gave them was four hounds, in order. So how do they know my list?','All I gave them was your hounds, in order, for hours. So my list came from somewhere else. Somebody else was keeping books.'),
  ['K9','Then we find the drawer.']],()=>{note('k56_pages','The Mimic knows Misaki’s list. The note-taker made copies, and somebody paid for them.');done()})}});

k56Add({id:'k56_a2grey',when:()=>S.phase==='act2'&&k56A2()>=7&&!isLone()&&k56Seen('k56_a2pages'),run:done=>{
 say([[AN,'okay so. i went through every clip again. two scenes. same man at the back of the crowd both times. grey suit. holding an umbrella over a police officer like he works there.'],
  [AN,'he doesn’t work there. i checked. nobody in that building owns a suit that nice.'],
  (S.f.k56Plate||S.f.k56Ship)?['K9','(A grey suit, and a company with a ship on its letterhead. He does not say it out loud yet.)']:['K9','Send me the frame.'],
  S.f.k56Grey?K56M('grey suit. ok. i hate that','grey suit. there was a grey suit at my lot. before','There was a grey suit at my lot, before the van. He read my line in the register.','Grey suit. There was one at my lot before the van, reading my line in a book. If it’s the same man, I want to be the one who finds out.')
   :K56M('who wears a suit to a crime scene','who wears a SUIT to a crime scene','Who wears a good suit to a crime scene?','Who wears a good suit to watch the police work? Somebody checking they do it right.'),
  [AN,'i’m sending the frame. he’s looking right at the camera in both. he knew where it was.']],()=>{S.f.k56A2Grey=1;done()})}});

k56Add({id:'k56_a2burn',when:()=>S.phase==='act2'&&k56A2()>=8&&!isLone()&&k56Seen('k56_a2grey'),run:done=>{
 say([['','Two in the morning, in the archive. Misaki has found a scorch mark on the vault floor, a black square the size of a book, and she is sitting in the middle of it.'],
  K56M('what burned here','v what burned here','What burned here? It’s exactly book-shaped.','This is exactly the shape of a book, babe. You don’t burn things. You file them.'),
  ['K9','My father’s ledger. The night of his funeral I took it out of his desk and burned it here, a page at a time, so that I would know it was gone.'],
  ['K9','It was the record of everyone he owned: debts, favours, and what he did when people could not pay. I thought that if the book was gone, they would be free of him.'],
  K56M('were they','and were they','Were they?','And were they? Free?'),
  ['K9','Some of them sent flowers. Most of them went on paying somebody. I never found out who. I told myself it was finished, and I let myself believe it, which I have done exactly once.'],
  K56M('u never asked??','u never asked who they paid?','You never looked into who they were paying. You look into everything.','You look into everything. You looked up my blood type. You never looked into who they were paying?'),
  ['K9','I was nineteen. I wanted one thing in that house to be finished.'],
  ['','She stays in the scorch mark until he sits down in it with her. It is a small square, and neither of them is small.']],()=>{S.f.k56Burn=1;done()})}});

/* ---------- Act II into Act III: where the Mimic's pages came from ---------- */
const _k56a3=startAct3;startAct3=function(){if(!S||isLone()||(S.f.inter&&S.f.inter.act3)||k56Seen('k56_a3why'))return _k56a3();k56Mark('k56_a3why');k56WhyScene(_k56a3)};
function k56WhyScene(cb){const C=S.case||{};const n=C.cul?SUS()[C.cul].n:'The Mimic';let L;
 if(C.cul&&!C.wrong&&!C.escaped)L=[['','In the service corridor, before anything else happens to them, the Mimic says one useful thing.'],
  [n,'You think I found you? I was sent. A man in a grey suit bought me a coffee and put three pages on the table. Names, addresses, which of them lived alone.'],
  [n,'He said Valentin ought to be shown what his name was worth on the open market. He paid for the tags.'],
  ['K9','What was his name?'],
  [n,'He never gave one. He had a card with a ship on it.'],
  ['',C.end==='police'?'The police get everything else. Nobody gives them that part.':'After that the Mimic does not say anything else, to anyone.']];
 else L=[['','A week after the gala, a parcel comes to the foundation’s post room: a box of steel dog tags stamped K9, four hundred and ninety-seven of them, unused.'],
  ['','The receipt is still in the box. The tags were paid for by Constance Holdings. On the back, in a small slanted hand: “Well done.”'],
  ['K9',(S.f.k56Plate||S.f.k56Ship)?'The ship again.':'I do not know that company. I should know every company in this city.'],
  K56M('they’re showing off','somebody’s showing off','Somebody’s showing off. To us.','Somebody bought five hundred of your name and used three, and now he wants us to know he can afford the rest.')];
 L.push(['K9','(Whoever he is, he was already paying for things before the river, and now he wants V to know it.)']);
 go({draw(){rect(0,0,W,H,'#05040a')}});cut(L,cb,'#05040a')}

/* ---------- Act III: the box, the river page, the blank page ---------- */
function k56BoxLines(){const L=[];
 if(S.kd&&(S.kd.ses||0)>0)L.push(['M',MV('v. the sevens','v. the sevens have a line through them','V, look at the sevens. A line through the middle. The note-taker wrote his sevens like that.','V. The sevens. He crossed his sevens like that, across the table from me, every time he wrote the hour. Somebody taught him to write like this book.')],['V','Then the man who keeps this book trained the man who kept her notebook.']);
 const seen=[S.f.k56Plate&&'the car outside her lot',S.f.k56Ship&&'the cheque for forty-one thousand',k56Seen('k56_a3why')&&'the dog tags'].filter(Boolean);
 L.push(seen.length?['V','Constance. '+seen.join(', ').replace(/, ([^,]*)$/,' and $1').replace(/^./,c=>c.toUpperCase())+'. All of it was paid for from this boat.']:['V','The Constance. I have never heard of her, and I do not like that I have never heard of her.']);
 return L}

k56Add({id:'k56_a3river',when:()=>S.phase==='act3'&&S.a3&&S.a3.box&&k56A3()>=2,run:done=>{const o=k56Org();
 say([['','The ledger again, the second night. Halfway through the back section there is a page headed with the date of the van.'],
  ['','“'+o.name+'. One address, trailer lot by the canal, supplied through K. Cleaning of the river premises afterwards, through T. Paid in full.”'],
  K56M('that’s me. that line is me','that’s me. i’m a line. “one address”','That’s me. I’m “one address.”','That’s me. Four days of my life, and I’m “one address,” between a land deal and somebody’s gambling debt.'),
  ['K9','He sold them your door, and afterwards he sold them somebody to wash the floor.'],
  K56M('K and T','who’s K. who’s T','Who are K and T?','K and T. Two people got paid for me. I want their whole names.'),
  ['K9','They are further in. We will reach them in order.'],
  ['','He closes the ledger on his finger to keep the place, and does not take the finger out for an hour.']],()=>{note('k56_river','The Chairman sold her address to '+o.name+' through “K.”, and the cleaning afterwards through “T.”');done()})}});

k56Add({id:'k56_a3heir',when:()=>S.phase==='act3'&&S.a3&&S.a3.box&&k56Seen('k56_a3river')&&((S.a3.names&&S.a3.names.chairman)||k56A3()>=8),run:done=>{
 say([['','The blank page headed “Valentin” has a watermark when you hold it up to the lamp: the same small ship.'],
  K56M('why’s ur name on an empty page','why is ur page empty','Why is your page the only empty one?','Every page in that book is somebody who owes him. Yours is empty. What do you owe him, V?'),
  ['K9','Nothing. The other pages are what people owe him. Mine is a job opening.'],
  ['K9','He is old, and the book needs somebody to keep it after him. My father kept it before him. The Mimic was an interview: he wanted to see whether I would use my name the way my father used his.'],
  K56M('and the girl','“and the girl.” that’s me','“And the girl.” That’s me. What am I, the dowry?','“And the girl.” I’m in pencil, V. I’m the bit he hasn’t decided about. Either I come with the job or I’m in the way of it.'),
  ['K9','You are neither. I would like to tell him so on Friday.']],done)}});

k56Add({id:'k56_a3hale',when:()=>S.phase==='act3'&&S.a3&&S.a3.box&&!k56HaleOut()&&!(S.a3.names&&S.a3.names.kanzaki)&&k56Seen('k56_a3river')&&S.f.k56.k56_a3river<S.day,run:done=>{
 say([['','Inspector Hale rings the foundation’s public line and asks, for the first time, for V by his initial.'],
  ['Hale','Three pages walked out of my K9 file in the autumn. I have found out where they went. A man in a grey suit collected them from a colleague of mine in a café, and paid with a card that has a ship on it.'],
  ['K9','Which colleague?'],
  ['Hale','Organised crime division. I trained him. I am not going to say his name on a telephone, because I still have some hope that I am wrong about him.'],
  ['Hale','For four years I wanted K9 to be real so that I could arrest him. I have decided I would rather arrest whoever has been selling my files. If you find the man with the ship, I would like to be standing nearby.'],
  ['K9','(Organised crime. “K.” He does not say it aloud. Hale has asked to be allowed his hope a little longer.)']],()=>{S.f.k56HaleCall=1;done()})}});

k56Add({id:'k56_a3kt',when:()=>S.phase==='act3'&&S.a3&&S.a3.names&&S.a3.names.tsuji&&S.a3.names.kanzaki&&k56Seen('k56_a3river'),run:done=>{
 say([['','She opens the ledger at the river page again and writes two whole names in the margin, next to K. and T., in her own handwriting, which is terrible.'],
  K56M('there. whole names','there. now they’re people. now they’re done','There. Whole names. Both of them dealt with.','There. Kessler and Tully. Whole names, both done. That’s my line finished, babe. The rest of the book is yours.'),
  ['K9','Your handwriting is a crime.'],
  K56M('it’s a ledger. it can take it','it’s a ledger. it’s seen worse','It’s a ledger. It’s seen worse than my handwriting.','It’s a book full of murders and debts, V. My sevens are the least of its problems.')],done)}});

/* ---------- epilogue: what is left of the ship ---------- */
k56Add({id:'k56_epi',when:()=>S.phase==='epilogue'&&!isLone(),run:done=>{const e=S.f.a3End;let L;
 if(e)L=[['','In the spring the trailer lot by the canal is sold to a company nobody has heard of. This time V checks the directors. There are three of them, and they are all real people with dull jobs.'],
  K56M('u checked','u checked the parking lot','You checked who bought a parking lot.','You checked the directors of a parking lot, V.'),
  ['K9','I check everything now. I find it restful.'],
  ['',e==='paper'?'The ledger is in a box under the courthouse. The list from the kitchen table is in the archive drawer, every line on it finished one way or another, and the blank line at the bottom has a name written on it now.'
   :e==='blood'?'The ledger is at the bottom of the bay. The list from the kitchen table is in the archive drawer, and the blank line at the bottom has been filled in with a small drawing of a ship, crossed out.'
   :e==='burn'?'The half-burned page is in the glass case. The list from the kitchen table is beside it, and the blank line at the bottom has one word on it, in her hand: “paid.”'
   :e==='inherit'?'The ledger is on the desk in the archive, and the kitchen list is inside its back cover, folded small. Nobody has filled in the blank line. Nobody needs to.'
   :'The list from the kitchen table is in the archive drawer. The blank line at the bottom is still blank, and the drawer stays shut.']];
 else L=[['','A business card turns up in the mailbox one morning. It has no name and no number, only a small ship for a watermark.'],
  K56M('...','is that the ship','Is that the ship?','That’s the ship, V. That’s the one from the car.'),
  ['K9','Yes.'],
  ['','He puts it in the drawer with the cheque stubs and the receipts. He does not open the drawer again for a long time.']];
 say(L,done)}});

/* ---------- Act III, if Hale was the Mimic: his lines go to people who are still there ---------- */
(function(){
 const b8=A3_BEATS[8];A3_BEATS[8]=()=>k56HaleOut()?[['','A sergeant from the harbour station rings the foundation’s public line and asks, very carefully, whether anybody there has plans for Friday night at Pier Nine.'],['V','Why would we?'],['','He says his superintendent has told him not to look at a yacht on Friday. He has never been told that before. He would like somebody to know he was told.'],['V','Then somebody knows.']]:(typeof b8==='function'?b8():b8);
 const n7=A3_NIGHTS.length-1,nf=A3_NIGHTS[n7];A3_NIGHTS[n7]=()=>k56HaleOut()?[['','A call at midnight from the harbour station: no name, a tired voice, a man who asks which berth Pier Nine is and hangs up before anyone can answer.'],['@','He is checking whether we know about Friday.'],['#','we know about friday. we’ve known since the box.']]:nf();
 const ps=A3_ENDINGS.paper.scene;A3_ENDINGS.paper.scene=()=>{const L=ps();if(!k56HaleOut())return L;return L.map(l=>!l?l:l[0]==='Hale'?['Officer',l[1]]:/^Hale comes up the gangway/.test(l[1]||'')?['','Two officers come up the gangway, sent by a prosecutor who has read Oakes’s statement twice. They do not look at either of you. They look only at the old man.']:typeof l[1]==='string'?[l[0],l[1].replace('Every page that Hale asked for.','Every page a prosecutor could want.')]:l)};
 const pl=A3_ENDINGS.paper.L;A3_ENDINGS.paper.L=()=>pl().map(s=>k56HaleOut()&&/^Hale retires/.test(s)?'The prosecutor who ran the case retires the week after the verdict. On her last day she leaves one folder on her desk for whoever comes next. Inside, on a sticky note: “Still not him.”':s);
 const fl=A3_ENDINGS.fall.L;A3_ENDINGS.fall.L=()=>fl().map(s=>k56HaleOut()?s.replace('Hale makes sure of that.','Somebody at the harbour station makes sure of that.'):s);
})();
