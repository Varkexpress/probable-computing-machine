/* ===================== THE ARRANGEMENT (kc60) =====================
   1. Apathy between the four themselves. They have a rule, made in the server one night: if one of them dies, nobody
      goes back for the body, the others clear out what identifies them within forty-eight hours, and everybody moves
      on. They mean it, and they are as cool about each other's deaths as about anybody's, and they are also all
      that any of them has. Beats across normal / Act II / Act III / epilogue, both POVs (one every other morning, or
      from the side menu: "The four of you").
   2. Misaki lore: from thirteen to sixteen they scalped lolita dresses to save for flight school. They wanted to be a
      pilot. The school wanted a birth certificate. Angel finds the old seller page; V asks; a dress; one flight.
   3. More of the infirmary: the server kept going without her (Misaki), V's shirt / the stitches, the rule as comfort
      on the worst route; for V, the kennel corridor at night with the other two (three nights). Afterwards: "you broke
      the rule", the page V wrote the night before the river, and (worst stays) what the rule was for in there.
   Rules kept: unnamed city, dollars, hounds unnamed, no new named characters, V never contracts, Misaki through MV,
   nothing about what happened in the hours is named, no method. Notes: docs/notes_kc60.md. */
const a60M=()=>S.pov!=='v';
const a60H=(m,v)=>a60M()?m:v;
const A60=()=>{try{return !!S&&!isLone()&&!S.dark&&!jpAway()&&!(S.kd&&S.kd.med)&&['normal','act2','act3','epilogue'].includes(S.phase)}catch(e){return false}};
const A60NW=['no','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen'];
const a60Days=()=>{const d=(S.kd&&S.kd.days)||3;return Math.max(1,Math.min(15,d))};
const a60DW=()=>A60NW[a60Days()];
const a60Cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

/* ---------- the beats, and how they are delivered ---------- */
const A60B=[];
function a60B(id,side,when,run){const e={id,a60:1,side,when:()=>{try{return A60()&&!S.f[id]&&when()}catch(x){return false}},run:done=>{S.f[id]=1;S.seen[id]=1;S.f.a60Last=S.day;save();run(done)}};A60B.push(e);EVENTS.push(e)}
const a60Next=()=>A60B.find(e=>e.when())||null;
/* one every other morning, before everything else that morning */
const _me60=morningEvent;morningEvent=function(done){let b=null;try{const k58due=typeof K58N!=='undefined'&&S.phase==='normal'&&S.f.k58Day!==S.day&&S.day-(S.f.k58Last||-9)>=2&&!!K58N.find(e=>{try{return e.when()}catch(x){return false}});if(!k58due&&mbOk()&&A60()&&S.f.a60Day!==S.day&&S.day-(S.f.a60Last||-9)>=2)b=a60Next()}catch(x){}if(!b)return _me60(done);mbUse();S.f.a60Day=S.day;return b.run(()=>_me60(done))};
/* or from the side menu, once a day */
const _sh60=sideHub;sideHub=function(late){const o=_sh60(late);try{if(!A60())return o;const b=a60Next();if(!b)return o;const today=S.f.a60Side===S.day;
 return o.concat([{t:typeof b.side==='function'?b.side():b.side,sub:today?'tomorrow':'costs time · the four of you',dis:!!late||today,fn:()=>{spend();S.f.a60Side=S.day;save();go(cutBg('#0a0a10'));b.run(()=>hub())}}])}catch(e){return o}};

/* 1 · normal: the rule, in the server */
a60B('a60_server','The server, at two in the morning',()=>S.phase==='normal'&&S.day>=2,done=>{const m=a60M();say([
 ['',m?'Two in the morning. Your phone goes on the nightstand, and then again, and then it does not stop.':'Two in the morning. The server is busy. V reads it in bed with his glasses on and the old hound across his feet.'],
 [RN,'(server) settle somethin. if one of us gets got on a job. do the rest come get the body or nah'],
 [AN,'(server) nah'],
 ['hitmeuppp','(server) '+MV('nah','nah. leave me','no. leave me where i land','no. leave me where i land. if u come back for me u get caught and then it’s two bodies and i look stupid')],
 ['K9','(server) Retrieval is reasonable if it can be done without risk.'],
 [RN,'(server) it can’t. that’s the whole point of you bein dead vee. somethin already went wrong'],
 [AN,'(server) ok rule. nobody goes back. within 48h we clear out anything at their place that leads to the rest of us. then we move on. no funerals, no visits, no stupid'],
 [AN,'(server) all in favour'],
 ['','Three thumbs come up under it. V’s comes four minutes later.'],
 [RN,'(server) cool. anyone want wings. place on ninth is open till four'],
 ['',m?'You do want wings. You get dressed. Nobody mentions the rule again, and the four of you eat in Ronin’s car with the heater on and the bones in a bag on the dashboard.':'He does not want wings. He gets dressed anyway. Nobody mentions the rule again; they eat in Ronin’s car with the heater on, and Misaki falls asleep against the window with a bone in their hand.']],
 ()=>{S.f.a60Rule=1;note('a60_rule','The rule, from the server: nobody goes back for the body. Forty-eight hours to clear anything that leads to the others. Then move on.');fr('a',1);fr('r',1);done()})});

/* 2 · normal: who gets what, at the Sunday table */
a60B('a60_list','Sunday at V’s table',()=>S.phase==='normal'&&S.day>=3&&!!S.f.a60Rule&&frT('a')>=1&&frT('r')>=1,done=>{const m=a60M();say([
 ['','Sunday, at V’s table. There is a man on it in four pieces, and the hounds are lying by the drain with their chins on their paws, waiting their turn.'],
 ['','Angel has her laptop open on the counter, well back from the splash. She is doing the list.'],
 [AN,'ok. who gets what. ronin go'],
 [RN,'Truck to whoever wants it. Rings stay on. Throw me in the river with the crowbar and don’t say nothin’ over me.'],
 [AN,'“say nothing.” love that for you. V'],
 ['K9','The house and the accounts are arranged. The hounds go to Misaki. It is with a lawyer.'],
 ['hitmeuppp',MV('wait what','wait. the hounds go to ME?','Hold on. The hounds go to me?','Hold on, go back. The hounds go to me? All four of them? When did you do that?')],
 ['K9','Some weeks ago. It was the obvious choice.'],
 [AN,'misaki. go'],
 ['hitmeuppp',MV('rifle to angel. truck n chainsaw to ronin. prickles to v. clips in the bin.','rifle to angel. truck and the chainsaw to ronin. prickles to v. the clips can go in the bin. that’s it','Rifle to Angel. The truck and the chainsaw to Ronin. Prickles to V. The clips can go in the bin. That’s everything I own.','Rifle to Angel, she’s the only one who’d zero it right. Truck and the chainsaw to Ronin, he’ll ruin both. Prickles to V. The star clips can go in the bin. That’s it. That’s everything I own. Wow.')],
 [AN,'and me: delete maria. don’t post anything. let the comments find out on their own. i want to know how long it takes them'],
 [RN,'You won’t know. You’ll be dead.'],
 [AN,'i’ll know.'],
 ['','She saves it as “list (final) (2)”.']],()=>ask(m?'hitmeuppp':'K9',m?'(He left you the hounds. He is cutting round the shoulder joint as if he had not.)':'(They are looking at him over the shoulder joint.)',m?[
  {t:'“don’t die then.”',fn:()=>{S.f.a60Hounds='said';apply({aff:3});say([['hitmeuppp',MV('don’t die then.','ok well don’t die then. i can’t lift the black one','Don’t die, then. I can’t lift the black one.','Fine. Don’t die, then. I can’t even lift the black one, he’d have to walk himself to the vet.')],['K9','I will bear it in mind.'],['','The black hound gets the first piece. Nobody says anything else about any of it.']],done)}},
  {t:'Say nothing. Keep cutting.',fn:()=>{S.f.a60Hounds='quiet';apply({edge:1});say([['','You go back to the elbow. Under the table the grey hound leans her whole weight on your shin, and you let her, and the black hound gets the first piece.']],done)}}]:[
  {t:'“It is only practical.”',fn:()=>{S.f.a60Hounds='said';apply({aff:2});say([['K9','It is only practical. They know you.'],['hitmeuppp',MV('k.','ok. practical.','All right. Practical.','Okay. Practical. You’re a very practical man, V.')],['','They go back to the elbow. The black hound gets the first piece.']],done)}},
  {t:'Say nothing. Keep cutting.',fn:()=>{S.f.a60Hounds='quiet';say([['','He goes back to the shoulder. They watch him for a while longer and then go back to the elbow, and the black hound gets the first piece, and nobody mentions the lawyer again.']],done)}}]))
});

/* 3 · normal or Act II: a job goes quiet */
a60B('a60_quiet','The server goes quiet',()=>['normal','act2'].includes(S.phase)&&S.day>=6&&!!S.f.a60Rule&&frT('r')>=1,done=>{const m=a60M();say([
 ['','Ronin went in on a job at nine. He said two hours. At midnight the server has nothing from him. At three it still has nothing.'],
 [AN,'(server, 3:02am) ronin'],
 [AN,'(server, 4:40am) ok. rule.'],
 ['',m?'You are on a roof across town on your own job, and you read it between breaths. You think, quite clearly, about the truck: you would have to get the seat moved back. Then the man you are waiting for comes out of his door and you stop thinking about anything.':'V reads it at the kitchen island. He finishes his tea. He does the sums on a job that has gone quiet for seven hours and gets the answer anyone would get.'],
 ['K9','(server, 4:41am) Agreed. I will go to his flat at noon for anything that leads to us.'],
 ['','At ten past six there is a photo: a burger on a car bonnet at dawn, with a thumb in the corner of the frame. The thumb has a skull ring on it.'],
 [RN,'(server) phone died. had to hide in a fuckin ceiling. guy had a dog'],
 [AN,'(server) k'],
 ['hitmeuppp','(server) '+MV('k','k. bring me a burger','ok. bring me a burger','ok. bring me a burger. i was about to get ur truck')],
 ['K9','(server) Noted.'],
 ['',m?'Nobody says they were worried. You check, honestly, and you weren’t, quite. You had already decided which of his records you were going to keep, and you feel a little robbed.':'Nobody says they were worried. V checks, honestly, and he was not, quite. He takes “Ronin’s flat, noon” off the list on the fridge and puts the kettle on again.']],()=>{fr('r',2);calm(1);done()})});

/* 4 · "some more": Act II or III, the arm */
a60B('a60_hurt','Angel, at the back door',()=>['act2','act3'].includes(S.phase)&&frT('a')>=1&&frT('r')>=1,done=>{const m=a60M();say([
 ['','Angel comes in through V’s back door at one in the morning with a hole through the top of her arm. She sits down at the island and says “noodles?”'],
 ['',m?'V gets the kit. Ronin puts the noodles on while you hold the lamp.':'V gets the kit. Ronin puts the noodles on while Misaki holds the lamp.'],
 [AN,'ok. real question. if it had been my head. would you all have finished the noodles'],
 [RN,'Yeah.'],
 ['hitmeuppp',MV('ya.','yeah. obviously','Yes. Obviously.','Yeah. Obviously. They’re really good noodles.')],
 ['K9','I would have finished the noodles. Then I would have gone to your flat for the hard drives.'],
 [AN,'good. ok. good. that’s what i wanted to hear'],
 ['','He puts in nine stitches. They eat with their other hand while he does it and do not look. When he ties off the last one they lean their head against '+(m?'your':'Misaki’s')+' shoulder for about a second, and then sits up and asks Ronin for the chilli.']],()=>{fr('a',2);done()})});

/* 5 · Act II: what to do with the body */
a60B('a60_body','The kennel room, at feeding time',()=>S.phase==='act2'&&S.day>=(S.act2Start||0)+2&&frT('r')>=1,done=>{const m=a60M();say([
 ['','Feeding time in the kennel room. V weighs each bowl. Ronin is sitting on the steel counter swinging his boots, watching the old hound eat.'],
 [RN,'Real question. Say I get got, and you get to me before anybody else does. What d’you do with me?'],
 ['K9','The same as anyone.'],
 [RN,'You’d feed me to the dogs.'],
 ['K9','The hounds. Yes. It is the cleanest way, and nothing is wasted.'],
 [RN,'...Fuck, Vee. That’s the nicest thing anyone’s ever said to me.'],
 [AN,'me too. give me to the black one. he’s got taste'],
 ['hitmeuppp',MV('me 2. the pale one.','me too. the pale one. she already started on my socks','Me too. The pale one. She’s already started on my socks.','Me too. The pale one, she’s already had my socks, she might as well finish the set.')],
 ['K9','Noted.'],
 ['hitmeuppp',MV('who does u tho','and who does you?','And who does you?','And who does you, then? If you’re the one on the table, who’s cutting?')],
 ['K9','Whoever is left. I have written notes on the joints.'],
 [RN,'He’s written notes on the joints.'],[AN,'he’s written NOTES.'],
 ['',m?'He writes the names in the feeding ledger, one beside each hound. The old hound has his already. It is the only line in the book older than tonight.':'He writes the names in the feeding ledger, one beside each hound. The old hound has his already. It is the only line in the book older than tonight, and nobody asks when he wrote it.']],()=>{fr('r',2);fr('a',1);apply({edge:1});done()})});

/* 6 · Act III: the old hound */
a60B('a60_hounds','An envelope on the island',()=>S.phase==='act3'&&typeof a3d==='function'&&a3d()>=2,done=>{const m=a60M();say([
 ['','There is an envelope on the kitchen island. On the front, in fountain pen: “If I am dead. Hounds.”'],
 ['K9','The grey, the black and the pale will take to whoever feeds them. The old one will not. She will stop eating within a day of me, and she will not start again.'],
 ['K9','If I am dead, she is to be put down inside the week. The drug and the dose are in the envelope. Do not let her starve out of sentiment. That would be a cruelty, and I would be very angry about it.']],
 ()=>ask(m?'hitmeuppp':'K9',m?'(He means you. Nobody else is in the kitchen.)':'(They have picked it up and are reading the dose.)',m?[
  {t:'“ok.”',fn:()=>{S.f.a60Env='ok';apply({aff:2});say([['hitmeuppp',MV('ok.','ok. inside the week.','All right. Inside the week.','Okay. Inside the week. I’ll do it myself, I won’t make Angel.')],['K9','Thank you.'],['','He puts the envelope in the drawer with the takeaway menus. Then you make dinner.']],done)}},
  {t:'“and if it’s me?”',fn:()=>{S.f.a60Env='bed';apply({aff:3});say([['hitmeuppp',MV('and if it’s me','and if it’s me. who stops eating','And if it’s me that dies? Which of them stops eating?','And if it’s me? Which one of them goes off her food for me?')],
    ['K9','The grey one will sleep outside your door. After a week somebody should move her bed. She will not like it.'],
    ['hitmeuppp',MV('k. write it down','ok. write that down too','All right. Write that down as well.','Okay. Write that down too. Week one, move her bed. Don’t let her sleep in a doorway for a month like an idiot.')],
    ['','He writes it on the back of the envelope, under his own, and puts it in the drawer with the takeaway menus.']],done)}}]:[
  {t:'Ask them to be the one who does it.',fn:()=>{S.f.a60Env='ok';apply({aff:2});say([['K9','I would like it to be you. She trusts your hands.'],['hitmeuppp',MV('k.','ok. me.','All right. Me.','Okay. Me. Inside the week. I won’t make Angel.')],['','They put the envelope in the drawer with the takeaway menus themself. Then they make dinner.']],done)}},
  {t:'Say nothing more.',fn:()=>{S.f.a60Env='bed';say([['hitmeuppp',MV('and if it’s me','what about if it’s me','And if it’s me?','And if it’s me? Which one of them goes off her food for me?')],['K9','The grey one will sleep outside your door. After a week somebody should move her bed.'],['','They take his pen and write it on the back of the envelope, “week one, move her bed,” under his, and puts it in the drawer with the menus.']],done)}}]))});

/* 7 · epilogue: the list again */
a60B('a60_epi','The list, once a year',()=>S.phase==='epilogue',done=>{const m=a60M();say([
 ['','Once a year, at the Sunday table, Angel opens the list and asks if anybody wants to change anything.'],
 [RN,'Same. River. Crowbar. Say nothin’.'],
 ['K9','Unchanged.'],
 [AN,'misaki?'],
 ['hitmeuppp',MV('...it’s longer.','it’s longer now. hang on','It’s longer now. Give me a minute.','It’s longer now. I own things. When did I start owning things? Give me a minute, I have to go room by room.')],
 ['',m?'It takes you twenty minutes. There are mugs on it now, and a coat, and a stool at the island that has worn into your shape, and a drawer of takeaway menus with floor plans drawn on the backs.':'It takes their twenty minutes. There are mugs on it now, and a coat, and a stool at the island that has worn into their shape, and a drawer of takeaway menus with floor plans on the backs.'],
 [AN,'who gets the stool'],
 ['hitmeuppp',MV('nobody. burn it','nobody. burn the stool','Nobody. Burn the stool.','Nobody gets the stool. Burn it. I don’t want anybody sitting on it pretending.')],
 [AN,'(typing) “burn stool.”'],
 ['','The rule is still at the top of the page in Angel’s pink font. Under it, in small grey type, somebody has added: “(nobody has ever followed this).” Nobody has proposed deleting either line. Ronin asks for the salt.']],()=>{apply({aff:2});done()})});

/* ---------- Misaki lore: the dresses, and flight school ---------- */
a60B('lp60_listing','Angel’s laptop',()=>S.day>=4&&frT('a')>=1&&tier()>=1,done=>{const m=a60M();const L=[
 ['','Angel is going through resale sites for a dress for Maria, for a gala. She stops scrolling and turns the laptop round on the kitchen island.'],
 [AN,'misaki. explain this'],
 ['','It is a seller page, years dead. Lace dresses, the frilly kind with petticoats and big bows, photographed one at a time on a trailer floor. In the corner of every photo there is a toe in a sock with a frog on it.'],
 ['','The seller has four hundred reviews. “Fast shipping.” “Pricey but legit.” “Came with a note that said THANK YOU FOR FUNDING AVIATION.”'],
 [AN,'funding WHAT'],
 ['hitmeuppp',MV('flight school.','flight school. i was saving for flight school','Flight school. I was saving up for flight school.','Flight school. I was saving for flight school. Don’t look at me like that, I’d have been great.')],
 ['hitmeuppp',MV('shop uptown did drops. i queued all nite. bought 2. sold for 3x','the boutique uptown did limited drops. two per person. i queued all night, bought my two, listed them by morning at triple. thirteen to sixteen','The boutique uptown did limited drops, two per person. I’d queue all night, buy my two and list them by the morning at three times the price. From thirteen to sixteen.','There was a boutique uptown that did limited drops, two per customer. I’d sit on the pavement all night with a flask, buy my two, and have them listed by breakfast at three times the price. Thirteen to sixteen. I kept the books on a library computer.')],
 [RN,'You were a fuckin’ scalper.'],
 ['hitmeuppp',MV('businesswoman.','i was an entrepreneur ronin','I was an entrepreneur.','I was an entrepreneur, Ronin. Rich girls paid me for having a bladder of steel.')],
 ['K9','How much did you save?'],
 ['hitmeuppp',MV('4112.','$4,112. in a biscuit tin','Four thousand one hundred and twelve dollars, in a biscuit tin.','Four thousand one hundred and twelve dollars. In a biscuit tin. That was the first block of lessons and the medical, I’d done the sums.')],
 ['K9','What happened?'],
 ['hitmeuppp',MV('they wanted a birth cert.','they wanted a birth certificate. i had a form that said march','They wanted a birth certificate. All I had was the school form that said “March.”','I went in with the tin. The woman at the desk was really nice. She needed a birth certificate for the student licence, and I had a school enrolment form where I’d written “March” in the box myself. She was so nice about it. That was the worst bit.')],
 [AN,'so what happened to the money'],
 ['hitmeuppp',MV('rent. then a scope.','rent. then a scope','Rent, for a while. Then a scope.','Rent, for a bit. Then a scope, a good one. It’s the same sums, wind and distance and drop. Different seat.')],
 [AN,'did you keep one. a dress'],
 ['hitmeuppp',MV('one.','one. bought it the day they said no. never listed it','One. I bought it the day they said no and never listed it.','One. I bought it on the way home the day they said no, and never listed it. It’s in a vacuum bag under the trailer bed. It doesn’t fit, I grew.')]];
 say(L,()=>{const fin=()=>{S.f.lp60Day=S.day;save();say([['','Angel leaves a review on the dead page, five stars, “still the best,” and closes the laptop.']],done)};
  if(!m){S.f.lp60Dress='show';return say([[AN,'bring it on sunday'],['hitmeuppp',MV('no.','no. ...fine','Fine.','No. ...Fine. Sunday. Nobody laughs.')]],fin)}
  ask('hitmeuppp','(Angel wants to see the dress.)',[
   {t:'“fine. sunday. nobody laughs.”',fn:()=>{S.f.lp60Dress='show';fr('a',2);fin()}},
   {t:'“no. it stays under the bed.”',fn:()=>{S.f.lp60Dress='keep';say([[AN,'ok. it stays under the bed'],['','She doesn’t ask again, which for Angel is a very large thing to do.']],fin)}}])})});
a60B('lp60_dress','The dress, on a Sunday',()=>S.f.lp60Dress==='show'&&S.day-(S.f.lp60Day||0)>=2,done=>{const m=a60M();say([
 ['',m?'Sunday. You put a vacuum bag on the table where the body usually goes, and let the air into it.':'Sunday. Misaki puts a vacuum bag on the table where the body usually goes, and lets the air into it.'],
 ['','The dress comes out pale blue, with a great deal of lace and a bow at the back the size of a hound’s head. The boutique’s tag is still on it: ninety-five dollars. On the back of the tag, in pencil, “list at 290,” and a line through it.'],
 [AN,'oh my god. put it on'],
 ['hitmeuppp',MV('won’t fit.','it won’t fit. i was tiny','It won’t fit. I was tiny at sixteen.','It won’t fit. I was tiny at sixteen, I hadn’t started eating yet. I got tall all at once, at about eighteen. It was very upsetting for everybody.')],
 ['','Angel holds it up against '+(m?'you':'them')+' anyway. It stops halfway down '+(m?'your':'their')+' thigh, and the sleeves would end at the elbow. Ronin laughs until he has to put his head down on the steel.'],
 [AN,'maria is wearing this to the gala. i’ll get it let out. i’m paying'],
 ['hitmeuppp',MV('290.','290. it says on the tag','Two hundred and ninety. It’s on the tag.','Two hundred and ninety. It says on the tag. I don’t set the prices, babe, sixteen-year-old me sets the prices.')],
 ['',m?'Angel pays in cash, on the spot. You put it in a biscuit tin on top of the fridge. V writes something down.':'Angel pays in cash, on the spot. Misaki puts it in a biscuit tin on top of the fridge. V writes something down.'],
 [RN,'Scalper.']],()=>{S.f.lp60Sold=1;apply({yen:29000});fr('a',2);done()})});
a60B('lp60_fly','An airfield an hour out',()=>S.phase==='epilogue'&&!!S.f.lp60_listing&&tier()>=2,done=>{const m=a60M();
 const up=m?[
  ['','V has found a small airfield an hour out of the city where the instructor takes cash for a trial lesson and does not ask for anything on paper. He drives you there and then drives home, because he says the hounds have not been fed, which is a lie.'],
  ['','The plane is a two-seater, white, older than either of you. The instructor talks for ten minutes about checks. You have done them before he finishes saying them.'],
  ['','At two thousand feet he takes his hands off the controls.'],
  ['hitmeuppp',MV('(oh.)','(oh. it’s the sums.)','(Oh. It’s the same sums.)','(Oh. Oh, it’s the same sums. Crosswind twelve knots off the left, you hold it with your feet. It’s a rifle you sit in.)')],
  ['','You find V’s house from the air by the dark square of the kennel yard, and bank over it twice. There are four dots on the grass, and one tall one, all looking up.']]:[
  ['','He has found a small airfield an hour out of the city where the instructor takes cash for a trial lesson and does not ask for anything on paper. He drives them there and then drives home, and tells them the hounds have not been fed, which is not true.'],
  ['','At ten past three he is in the kennel yard with all four of them when a small white plane comes over low from the west and banks over the house, twice. The old hound barks at it, once, which she has not done at anything in years.'],
  ['K9','(They are up there, above everything, where nobody can get behind them.)']];
 say(up,()=>{const back=[['','They come back with grass on their knees and the instructor’s card in their pocket.'],
   ['hitmeuppp',MV('78/hr.','seventy-eight dollars an hour','Seventy-eight dollars an hour. I had it at fifteen.','Seventy-eight dollars an hour. I had it at fifteen. I had it in a tin.')]];
  say(back,()=>ask(m?'hitmeuppp':'K9',m?'(The card says Thursdays.)':'(They keep turning the card over.)',[
   {t:m?'“same time thursday.”':'“Shall I drive you on Thursday?”',fn:()=>{S.f.lp60Fly='more';apply({aff:4});say([['hitmeuppp',MV('thursday.','thursday. don’t make it a thing','Thursday. Don’t make it a thing.','Thursday. Cash. Don’t make it a thing, V, I can see you making it a thing.')],['','He makes it a thing. He writes “Thursday” in the kitchen calendar in fountain pen, and draws a very small plane beside it.']],done)}},
   {t:m?'“once was enough.”':'Ask nothing.',fn:()=>{S.f.lp60Fly='once';apply({aff:2});say([['hitmeuppp',MV('once was enough','once was enough. i wanted to know','Once was enough. I only wanted to know.','Once was enough. I only wanted to know whether I’d have been good at it.')],['K9','And?'],['hitmeuppp',MV('ya.','yeah.','Yes.','Yeah. Obviously.')],['','They put the card on the fridge under the magnet shaped like a fish, and it stays there for years.']],done)}}]))})});

/* talk */
TDTOP_M.push({id:'lp60_t_why',label:()=>'“Why a pilot?”',show:()=>!S.dark&&!isLone()&&!!S.f.lp60_listing&&!(S.talks&&S.talks.lp60_t_why),run:b=>{S.talks=S.talks||{};warm('m','lp60_t_why',3);S.talks.lp60_t_why=1;const drew=!!(S.seen&&(S.seen.lore_architect||S.talks.lore_draw));say([
 ['K9','Why a pilot?'],
 ['hitmeuppp',MV('nobody can get behind u.','ur up above everything. nobody can get behind u','You’re above everyone, and the door locks from your side.','It’s the only job I ever heard of where you sit in a room with one door, and it locks from your side, and nobody can get behind you, and everybody on the radio has to do what you say. At thirteen that sounded like heaven. It still sounds pretty good.')],
 ['K9',drew?'You have drawn me that room. You labelled it “not a cell.”':'That is a very particular heaven.'],
 ['hitmeuppp',MV('shut up.','shut up. it was a cockpit first','Shut up. It was a cockpit first.','Shut up. I drew a cockpit first, years before you. You just paid for the walls.')],
 ['hitmeuppp',MV('add it to the list.','add it to the wasted list','Put it on the list. The wasted one.','Put it on the list. Maths, pilot, architect, apparently. I’m a careers fair nobody turned up to.')],
 ['','He does not tell them it was a waste. He writes down “careers fair.”']],b)}});
TDTOP_V.push({id:'lp60_t_now',label:()=>'“do you think they’d let me fly now?”',show:()=>!S.dark&&!isLone()&&!!S.f.lp60_listing&&tier()>=2&&!(S.talks&&S.talks.lp60_t_now),run:b=>{S.talks=S.talks||{};warm('v','lp60_t_now',3);S.talks.lp60_t_now=1;say([
 ['hitmeuppp',MV('could i fly now?','would they let me fly now. like now now','Do you think they’d let me fly now?','Do you think they’d let me fly now? I still don’t have a birth certificate. I have a school form that says March.')],
 ['K9','A licence, no. Not without paper, and I will not make you paper that a stranger could check. A lesson, yes. There are airfields that take cash.'],
 ['hitmeuppp',MV('...u looked.','u looked it up.','You looked it up.','You already looked it up. When did you look it up?')],
 ['K9','The night Angel found the dresses.'],
 ['hitmeuppp',MV('creep. how far.','creep. ...how far','Creep. How far is it?','Creep. ...How far is it? Don’t book it. I’m only asking how far.')],
 ['K9','An hour. I have not booked it.']],b)}});

/* ---------- threads ---------- */
txDef('tx_a60_body',{with:'r',pov:'m',prio:2,when:()=>A60()&&S.phase==='normal'&&S.day>=3&&frT('r')>=1,nodes:{
 start:{in:()=>['real talk. if i get got. you comin for me','like the body'],expire:3,
  opts:()=>[{t:'“no. rule.”',fx:()=>fr('r',2),reply:()=>['good. same. i ain’t comin for yours either','unless you got somethin good in your pockets']},
   {t:'“depends what’s in ur pockets”',fx:()=>fr('r',2),reply:()=>['gum. a ring. maybe a finger. not mine','ok fair. you can have the gum']},
   {t:'“i’d come.”',fx:()=>{fr('r',1);S.f.a60Soft=1},reply:()=>['nah you wouldn’t','don’t. you get caught and then i gotta haunt you and that’s a lotta work']}]}}});
txDef('tx_a60_bodyv',{with:'r',pov:'v',prio:2,when:()=>A60()&&S.phase==='normal'&&S.day>=3&&frT('r')>=1,nodes:{
 start:{in:()=>['vee. if i get got you feedin me to the dogs or what'],expire:3,
  opts:()=>[{t:'“Hounds.”',fx:()=>fr('r',2),reply:()=>['HOUNDS. sorry. you feedin me to the hounds or what'],next:'two'},
   {t:'“That depends on how you are got.”',fx:()=>fr('r',1),reply:()=>['in one piece. ish'],next:'two'}]},
 two:{in:()=>['serious tho. don’t come get me. rule’s the rule'],
  opts:()=>[{t:'“I will not come.”',fx:()=>fr('r',2),reply:()=>['good','liar']},
   {t:'“I will do what is sensible.”',fx:()=>fr('r',1),reply:()=>['that’s a no then. fuckin knew it']}]}}});
txDef('tx_a60_will',{with:'a',pov:'m',prio:2,when:()=>A60()&&!!S.f.a60_list,nodes:{
 start:{in:()=>['updating the list. u said the clips go in the bin. i want the clips','also u forgot ur phone. what do i do with ur phone'],expire:3,
  opts:()=>[{t:'“wipe it. don’t read it.”',fx:()=>fr('a',2),reply:()=>['i would never read it','i’d read it']},
   {t:'“give it to v. he’ll want the screenshots.”',fx:()=>{fr('a',2);apply({aff:1})},reply:()=>['ok. “phone: V (screenshots).” done','you two are so weird about each other']},
   {t:'“u can have the clips”',fx:()=>fr('a',3),reply:()=>['already put me down for them. i was being polite']}]}}});
txDef('tx_a60_willv',{with:'a',pov:'v',prio:2,when:()=>A60()&&!!S.f.a60_list,nodes:{
 start:{in:()=>['you put misaki down for the hounds and didn’t tell them first. they’ve been weird all day','they keep saying “my hounds” and then “if”'],expire:3,
  opts:()=>[{t:'“Is that a problem?”',fx:()=>fr('a',1),reply:()=>['no. i just thought you should know they’re practising']},
   {t:'“I should have asked them.”',fx:()=>fr('a',2),reply:()=>['lol no. if you’d asked they’d have said no. this way they have to keep them']}]}}});
txDef('tx_lp60_v',{with:'a',pov:'v',prio:2,when:()=>!isLone()&&!S.dark&&!!S.f.lp60_listing,nodes:{
 start:{in:()=>['ok i can’t stop reading their old reviews','“arrived with a little plane drawn on the packing slip.” V. a PLANE'],expire:3,
  opts:()=>[{t:'“They wanted to fly.”',fx:()=>fr('a',1),reply:()=>['i know. i was there. i’m just saying. a plane']},
   {t:'“Send me the link.”',fx:()=>{fr('a',2);S.f.lp60Link=1},reply:()=>['sent. don’t buy anything off a dead account','you’re going to buy something off a dead account']}]}}});
txDef('tx_a60_after',{with:'m',pov:'v',prio:2,when:()=>!isLone()&&!S.dark&&['act2','act3','epilogue'].includes(S.phase)&&!!S.f.kd60_rule,nodes:{
 start:{in:()=>['if it happens again. i mean it. 48h then move on','write it down so u have to'],expire:3,
  opts:()=>[{t:'“I have written it down.”',fx:()=>apply({aff:1}),reply:()=>['did u','send a photo']},
   {t:'“No.”',fx:()=>apply({aff:2}),reply:()=>['V.','ok. noted. i’m noting that ur a liar']}]}}});
txDef('tx_a60_grey',{with:'v',pov:'m',prio:2,when:()=>!isLone()&&!S.dark&&['act2','act3','epilogue'].includes(S.phase)&&!!S.f.kd60_rule,nodes:{
 start:{in:()=>['Angel has asked whether your line on the list should stay grey. I told her it was your decision.'],expire:3,
  opts:()=>[{t:'“leave it grey a bit”',fx:()=>apply({aff:1}),reply:()=>['Understood.']},
   {t:'“un-grey it. i’m back”',fx:()=>apply({aff:2}),reply:()=>['I will tell her. She will make it pink.']}]}}});

/* ---------- the infirmary: Misaki ---------- */
const kd60In=()=>typeof kdMedM==='function'&&kdMedM();
ROOMS.medbay.spots.push({at:[180,166],mark:[180,156],label:'The server',show:()=>kd60In()&&kdClar()>=2&&(S.kd.med.d||0)>=1&&!S.f.a60Srv,act:()=>{S.f.a60Srv=1;save();const n=a60DW();say([
 ['','Your phone has the server on it. You scroll up to the day you went quiet and read forward.'],
 ['','It kept going. Somebody asked where to get tarps. Ronin posted a burger. Angel posted a Maria video about lip liner and forty people said “slay.” There was an argument about a parking space that went on for most of a day.'],
 ['hitmeuppp',MV('(good.)','(good. that’s the rule. u keep posting)','(Good. That’s the rule. You keep it normal so nobody asks.)','(Good. That’s right. That’s the rule: you keep it normal so nobody on the server asks where the sniper went. They did it properly. I’m proud of them. I’m so proud of them.)')],
 ['','You scroll back to find V in it. He posted once, the first night, at twenty to seven: “Has anyone seen hitmeuppp.” Somebody you don’t know asked if that was a band. After that there is nothing from K9 for '+n+' days, in a server where he has never once gone a day without correcting somebody’s grammar.'],
 ['hitmeuppp',MV('(...idiot.)','(he broke it. idiot)','(He broke the rule. Idiot.)','(He broke it. He didn’t even try to keep it. He just stopped. Idiot. Idiot.)')],
 ['','You put the phone face down on your chest and lie there with it for the rest of the afternoon, while somewhere above it the server goes on about tarps.']],()=>{calm(1);apply({aff:2})})}});
ROOMS.medbay.spots.push({at:[76,166],mark:[76,156],label:'V’s shirt',show:()=>kd60In()&&kdClar()>=2&&kdSA()&&!S.done.a60Shirt,act:()=>{S.done.a60Shirt=1;S.f.a60ShirtN=(S.f.a60ShirtN||0)+1;save();const d=S.kd.med.d||0;say([
 ['','You are sleeping in one of V’s shirts. It is too big, it buttons all the way to the throat, and it is the only thing in the room you chose.'],
 ['','Every time you wake you check the buttons before you open your eyes, top to bottom, by feel. They are all done up. You did them up yourself. You do them up again anyway, all eleven, and lie still.'],
 ['hitmeuppp',MV('(eleven.)','(eleven. all done)','(Eleven. All done up.)','(Eleven. All done up. It’s a nice shirt. It smells like the hounds. I just like it done up, it’s cold, it’s a basement.)')],
 d>=2?['','When V brings the soup he sees you check them once, while he is in the doorway. He looks at the soup until you have finished.']:null])}});
ROOMS.medbay.spots.push({at:[76,166],mark:[76,156],label:'Count the stitches',show:()=>kd60In()&&kdClar()>=2&&!kdSA()&&!S.done.a60Stitch,act:()=>{S.done.a60Stitch=1;save();say([
 ['','You count the stitches with your good hand, by feel, the way you count rounds. There are fourteen in your scalp, six on the left wrist and four by your eye.'],
 ['','Under the new ones your fingers keep finding old ones, flat and shiny, that somebody put in a long time ago. You have no idea who.'],
 ['hitmeuppp',MV('(24 new.)','(24 new. dunno how many old)','(Twenty-four new. I don’t know how many old.)','(Twenty-four new. I can’t count the old ones, they run into each other. Somebody sewed me up before, more than once, and I don’t remember a single time. Fine. Same as now.)')],
 ['','You do it again before you sleep, and get the same number for the new ones and a different one for the old.']])}});
/* worst route, still deluded: the rule as the only comfort in the room */
const _hub60=hub;hub=function(){const a=arguments,self=this;try{if(typeof kdWR==='function'&&kdWR()&&kdClar()<2&&!dlg&&!S.f.a60WR&&S.f.kdMindDay===S.day&&(S.kd.med.d||0)>=1){S.f.a60WR=1;save();go(cutBg('#0c0a08'));return say([
 ['','You lie on the cot and work it out, the way you work out a drop, because it is something to do with your head that is not the door.'],
 ['','Day one, they would have noticed. Day two, they would have looked. The rule is forty-eight hours. So by now Angel has greyed your line in the spreadsheet. Ronin has the truck and has already put the seat back. V has taken Prickles off your windowsill and is watering him every two weeks, like you told him a hundred times, and is not looking for you, because that is the rule, and you voted for it.'],
 ['hitmeuppp','(Good. That’s good. That’s what we said. Nobody comes. Nobody does anything stupid.)'],
 ['','It comforts you more than anything has in days. You hold onto it like a rail, and you do not once let yourself wonder about the man outside the door who has been there every night, who reads, and who is the right height.'],
 ['hitmeuppp','(They moved on. Good. I’d have moved on. I’d have—)']],()=>_hub60.apply(self,a))}}catch(e){}return _hub60.apply(self,a)};

/* ---------- the infirmary: V, the kennel corridor at night ---------- */
const A60COR=[
 ()=>[['','Midnight. Ronin and Angel come down the kennel stairs with a bottle and sit on the corridor floor beside him, opposite the door that says LAUNDRY.'],
  [RN,'Forty-eight hours, we said. Then move on.'],
  [AN,'we did say that'],
  ['K9','We did.'],
  ['','Nobody gets up. The bottle goes round. On the other side of the door Misaki turns over, and all three of them stop to listen until they settle.'],
  [RN,'Anyway. Rule’s for when you’re dead. They ain’t dead. Technicality.'],
  [AN,'technicality. yeah'],
  ['','At six they are still there, Angel asleep on Ronin’s shoulder and the crowbar across his knees. V steps over his legs to put the kettle on.']],
 ()=>kdSA()?[['','At four in the morning the shower in the infirmary runs. It runs for forty minutes.'],
  ['','He does not knock. He goes to the boiler room and turns the hot water up as far as it will go, so that it will not run cold on them, and sits on the floor by the boiler until he hears the water stop.'],
  ['K9','(If I ask, they will tell me it is the cell they are washing off. So I do not ask.)'],
  ['','The next night it runs for an hour. He turns the boiler up again, and does not write it in the ledger.']]
  :[['','At three he hears tape tear on the other side of the door, one strip and then another. They are changing their own wrist dressings in the dark.'],
  ['','He listens to them do it. They are faster than the doctor, in the right order, and they make no sound at all when the saline goes on.'],
  ['K9','(Somebody taught them this. Or nobody did, and they learned it alone.)'],
  ['','In the morning the old dressings are in the bin, folded very small, the way a person folds them who has always had to hide them.']],
 ()=>(typeof kdWorstOf==='function'&&kdWorstOf())?[['','Two in the morning. Through the door, they start talking to the tall one, which they have never done before.'],
  ['hitmeuppp','You can stop waiting for somebody to come for me. Nobody’s coming. We have a rule.'],
  ['hitmeuppp','Forty-eight hours, then you move on. It’s a good rule. I voted for it. So did he. They’ll have done my list by now. You should tell your boss not to expect anybody.'],
  ['','He sits on the other side of the door and listens to the rule he voted for explained to him, kindly, as the reason he is not there.'],
  ['','He says “I see” in the tall one’s voice, because it is the only voice they will answer. They say “yeah,” and turns over.']]
  :[['','At two in the morning they talk in their sleep, clear as anything.'],
  ['hitmeuppp','Rifle to Angel. Truck and the chainsaw to Ronin. Prickles to V. The clips in the bin.'],
  ['','They say it twice, the way they go over a list before a job. Then they say “forty-eight hours” and is quiet.'],
  ['','He sits with his back to the door until the boiler comes on at six. Then he goes upstairs and moves Prickles to the kitchen windowsill, where they will see him when they come up.']]];
const _sh60k=sideHub;sideHub=function(late){const o=_sh60k(late);try{if(!kdMed()||S.pov!=='v'||isLone())return o;const n=S.f.a60Cor||0;if(n>=A60COR.length)return o;
 return o.concat([{t:'The kennel corridor, at night',sub:S.done.a60Cor?'done today':'costs time · outside the door marked LAUNDRY',dis:!!late||!!S.done.a60Cor,fn:()=>{spend();S.done.a60Cor=1;S.f.a60Cor=n+1;save();go(cutBg('#06060c'));say(A60COR[n](),()=>{calm(2);if(n===0){fr('a',1);fr('r',1)}hub()})}}])}catch(e){return o}};

/* ---------- afterwards (the aftermath order) ---------- */
const kd60Ev=(id,when,run)=>kdEv(id,()=>!S.f[id]&&!isLone()&&when(),done=>{S.f[id]=1;save();run(done)});
kd60Ev('kd60_rule',()=>kdD()>=4&&frT('a')>=1&&frT('r')>=1,done=>{const m=kdMe(),n=a60Days();say([
 ['','The first Sunday since. Nobody has put anybody on the table. They are eating takeaway out of the cartons, and the hounds are under it.'],
 S.f.a60Rule?null:['','There is a rule. They made it in the server one night, half asleep: nobody goes back for the body, forty-eight hours to clear anything that leads to the others, then move on.'],
 ['hitmeuppp',MV('u broke the rule.','u broke the rule. all of u','You broke the rule. All three of you.','You broke the rule. All three of you. Forty-eight hours, then move on. I counted. I had a lot of time to count, and you were way over.')],
 [AN,'i didn’t break anything. it was content. my viewers love a missing person'],
 [RN,'I was bored. Went for some drives.'],
 ['K9','I was walking the hounds by the river.'],
 ['hitmeuppp',MV('for how long','for how many days, V','For how many days?','For how many days, V?')],
 ['K9',a60Cap(A60NW[n])+'.'],
 [AN,'i did grey your line on the list though. on the '+(n>=3?'third':'second')+' day. like you’re supposed to'],
 ['hitmeuppp',MV('good.','good. that’s the rule','Good. That’s the rule.','Good. That’s correct. That’s what you’re supposed to do.')],
 [AN,'and then i un-greyed it that night. it looked stupid grey'],
 ['',m?'You tell them that next time they follow it. Ronin and Angel both say sure. V eats his noodles. Under the table the grey hound has her chin on your foot and will not move it.':'They tell them that next time they are to follow it. Ronin and Angel both say sure. V does not answer, and they do not make him. Under the table the grey hound has her chin on Misaki’s foot and will not move it.']],()=>{fr('a',1);fr('r',1);done()})});
kd60Ev('kd60_vpage',()=>S.pov==='v'&&kdD()>=6,done=>say([
 ['','He is looking for the vet’s number in the back of the house ledger and finds a page he wrote on the night before the river.'],
 ['','It is in his ordinary hand. “Trailer: give notice to the lot, end of month. Truck and chainsaw: Ronin. Rifle: Angel. Prickles: kitchen windowsill, water fortnightly. The hounds: tell them nothing. They will know.”'],
 ['','He wrote it at two in the morning on the floor of the kennel corridor. At six he went out again to look for them, and found them, and he had forgotten until now that he ever wrote it.'],
 ['K9','(I kept the rule for one night. I did it neatly. I listed their cactus.)']],()=>ask('K9','(The page.)',[
  {t:'Tear it out.',fn:()=>{S.f.kd60Page='burn';say([['','He tears it out along the spine and puts it in the stove, and watches it go. Then he finds the vet’s number, on the next page, where it always was.']],done)}},
  {t:'Leave it where it is.',fn:()=>{S.f.kd60Page='keep';apply({heart:-1});say([['','He leaves it. He turns over to the vet’s number, which is on the next page, where it always was, and rings about the black hound’s ear.']],done)}}])));
kd60Ev('kd60_wr',()=>kdD()>=6&&((S.kd.sev0||0)>=8)&&frT('a')>=1&&frT('r')>=1,done=>{const m=kdMe();say([
 ['','Late, on V’s roof. Ronin has brought beer nobody is drinking.'],
 ['hitmeuppp',MV('in there i counted on the rule.','in there i counted on the rule. that u’d moved on','In there I counted on the rule. I thought you’d all moved on, and it helped.','In there I counted on the rule. I worked it all out: day three, Angel greys me. Day four, Ronin moves the seat back. Day five, somebody clears the trailer, and V puts Prickles on his windowsill and waters him every two weeks. It was the only thing in that room that made it all right.')],
 [RN,'Rule’s off.'],
 [AN,'off. i deleted the sheet'],
 ['hitmeuppp',MV('put it back.','put it back','Put it back.','Put it back. I mean it. I need it to be there. I’m the one who used it.')],
 ['','Angel looks at them for a long moment, and then gets her phone out and types it in again from memory, word for word, and turns the screen round to show them.'],
 ['K9','I voted for it four minutes late. I was thinking about it.'],
 ['hitmeuppp',MV('and?','and?','And?','And? What did you think?')],
 ['K9','That I would vote for it, and not keep it.'],
 ['',m?'Ronin opens the beer, in the end, and hands you the first one.':'Ronin opens the beer, in the end, and hands them the first one.']],()=>{fr('a',1);fr('r',1);calm(2);done()})});
(function(){if(typeof KD_ORDER==='undefined')return;const put=(id,after)=>{const i=KD_ORDER.indexOf(after);if(i<0)KD_ORDER.push(id);else KD_ORDER.splice(i+1,0,id)};
 put('kd60_vpage','kd_v_ledger');put('kd60_rule','kd_hard_angel');put('kd60_wr','kd60_rule')})();

/* ---------- small things ---------- */
PINGS.push(['an','annual reminder the list is due. if u own anything new tell me. ronin a stolen car is not “owned”'],
 ['ro','if I die on this one my last words were “hold my beer.” make sure that gets out'],
 ['mi','who gets my chainsaw if i die. not ronin. ok fine ronin'],
 ['mi','plane went over the trailer so low i could read the tail. i was gonna be a pilot btw. anyway']);
if(typeof AP_NOTES!=='undefined')AP_NOTES.push(
 ['','A man rings the radio to say he has written a will because of “the situation in this city.” The four of them have had one for a year. It is a spreadsheet, and the font is pink.'],
 ['','The news says a body found under the flyover has gone unclaimed for a month. Angel says that is the most respectful thing she has ever heard.'],
 ['','Somebody spray-paints WHO’S NEXT on the wall across from V’s gate. Ronin writes everyone’s initials under it, in the order he thinks they will go. He puts himself first and V last, and nobody argues with the order.']);

/* ---------- ending lines ---------- */
const _xe60=extraEnding;extraEnding=function(){const L=_xe60();try{if(!S||!S.f)return L;const f=S.f;
 if(f.a60_list)L.push('Angel’s list is saved as “list (final) (2)”. The rule is at the top: nobody goes back, forty-eight hours, move on.'+(f.kd60_rule?' All four of them have broken it once, and Misaki made Angel put it back.':''));
 if(f.a60Env==='bed')L.push('There is an envelope in the drawer with the takeaway menus that says “If I am dead. Hounds.” On the back, in a second hand: “week one, move her bed.”');
 if(f.kd60Page==='keep')L.push('In the back of V’s house ledger there is a page he wrote the night before the river, saying where their things should go. He has never torn it out.');
 if(f.lp60Fly==='more')L.push('Misaki flies on Thursdays, for cash, an hour out of the city. They bank twice over V’s house every time, and the old hound barks once.');
 else if(f.lp60_listing)L.push('There is a dead seller page with four hundred reviews and a frog sock in every photo. Angel left the last review.')}catch(e){}return L};
