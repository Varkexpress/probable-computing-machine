/* ===================== WHAT SHE IS MADE OF, AND DARKER DAYS (kc40) =====================
   Lore: Misaki was assigned female at birth and has no reproductive organs. They joke that they don't know whether they
   were born that way or had their uterus sold, and they mean both halves: it could be either, and no check has ever
   been done. They say it makes things simpler. They decline the check, every time.
   Darker: no new characters. What the four are like on an ordinary week, and what V finds about chapter one. */
const DK=()=>{try{return !isLone()&&!S.dark&&['normal','act2','act3','epilogue'].includes(S.phase)}catch(e){return false}};
const dkEv=(id,when,run)=>EVENTS.push({id,when:()=>{try{return DK()&&when()}catch(e){return false}},run});
/* ---------- the joke ---------- */
dkEv('lore_sold',()=>S.day>=5&&frT('a')>=1&&frT('r')>=1,done=>{const m=S.pov!=='v';say([
 ['','Sunday brunch, at Angel’s. Angel is complaining about cramps with a hot-water bottle on her stomach and her feet in Ronin’s lap.'],
 [AN,'i want it OUT. i want to put it on a shelf and shoot it.'],
 ['hitmeuppp',MV('i don’t have one lol.','i don’t have one. never did. lol.','I don’t have one. Never had one.','Don’t have one. Never did. No uterus, no ovaries, no nothing, it’s just a waiting room in there.')],
 [RN,'The fuck d’you mean, never did.'],
 ['hitmeuppp',MV('either born like that or somebody sold it.','either i was born like that or somebody sold it. 50/50.','Either I was born that way or somebody sold it. Honestly, could be either.','Either I came out like that or somebody took it out and sold it before I was nine. Genuinely don’t know. It’s a coin toss. Heads, I’m a medical curiosity. Tails, somebody got paid.')],
 ['','She says it the way she says everything, and laughs, and goes back to her waffle.'],
 ['hitmeuppp',MV('saves time tho.','saves a lot of hassle tho. no cramps, no scares, nothing to bind.','It saves a lot of hassle, though. No cramps, no scares. Nothing to hate.','And honestly? Simpler. No cramps, no scares on a job, nothing growing that I’d have to hate. Nobody can ever make me into something I’m not. Pass the syrup.')],
 ['',m?'Angel laughs, a second late. Ronin doesn’t, for once, and then does, because she is looking at him.':'Angel laughs a second late. Ronin doesn’t, and then does, because she is looking at him. V is the only one at the table who does not laugh at all, and Misaki notices, and lets him have that.']],()=>{fr('a',1);fr('r',1);S.f.loreSold=1;save();done()})});
dkEv('lore_scan',()=>S.f.loreSold&&tier()>=2,done=>{const m=S.pov!=='v';say([
 ['','There is an ultrasound machine in the kennel room. V bought it for the hounds. It takes four minutes, and it would answer the question.'],
 [m?'K9':'K9','It would take four minutes. You would know which it was. I would not look unless you asked me to.']],()=>ask(m?'hitmeuppp':'K9',m?'(Four minutes.)':'(She is looking at the machine.)',m?[
  {t:'“nope.”',fn:()=>{S.f.loreScan='no';save();say([['hitmeuppp',MV('nope.','nope. i like not knowing.','No. I like not knowing.','No. If I look, it’s either boring or it’s a crime, and I don’t want either. Right now it’s a joke. I’d like to keep the joke.')],['K9','Then you will keep it.']],done)}},
  {t:'“maybe one day. not today.”',fn:()=>{S.f.loreScan='later';save();say([['hitmeuppp',MV('not today.','not today. keep it plugged in.','Not today. Keep it plugged in.','Not today. Maybe never. Keep it plugged in, though, and don’t sell it to anyone. I’m funny about things getting sold.')],['K9','It is not for sale.']],done)}}]:[
  {t:'Leave it at the offer.',fn:()=>{S.f.loreScan='no';save();say([['hitmeuppp',MV('nope.','nope. i like the joke.','No. I like the joke better.','No. If I look it’s either boring or a crime, and right now it’s a joke. I like the joke.')],['','He unplugs the machine and puts the cover back on it. He does not ask again. He does, that night, go back through every ledger in the archive for the years before she was nine.']],done)}},
  {t:'Unplug it in front of her.',fn:()=>{S.f.loreScan='no';apply({aff:2});save();say([['','He unplugs it and coils the cable. She watches him do it and says nothing, which is how he knows it was the right thing.']],done)}}]))});
TDTOP_V.push({id:'lore_simple',label:()=>'“it’s simpler, honestly.”',show:()=>!S.dark&&S.f.loreSold&&tier()>=2&&!(S.talks&&S.talks.lore_simple),run:b=>{S.talks=S.talks||{};S.talks.lore_simple=1;warm('v','lore_simple',3);say([
 ['hitmeuppp',MV('it’s simpler. me. the way i am.','it’s simpler, being like this. honestly.','It is simpler, being built like this. I mean that.','It’s simpler, honestly. Flat, empty, long. Nothing to bind, nothing to bleed, nothing anybody can want from me except the hands. The hands are the only bit of me that’s ever been worth anything, and they’re mine.')],
 ['K9','And if it was taken?'],
 ['hitmeuppp',MV('then they got ripped off.','then whoever bought it got ripped off lol.','Then whoever bought it overpaid.','Then somebody paid good money for something I never wanted, and I got the better end of it. That’s the only deal from back then I came out ahead on.')],
 ['','She means it. He can see that she means it. He agrees with her out loud and goes downstairs afterwards and stands by the table for some time.']],b)}});
/* ---------- darker days ---------- */
dkEv('dk_prices',()=>S.pov!=='v'&&S.day>=6,done=>say([
 ['','The man on his knees in the stairwell offers her money. Then his car, then his apartment, then his brother’s apartment.'],
 ['hitmeuppp',MV('ur kidney’s worth more than ur car.','your kidney’s worth more than your car, buddy. both of them, way more.','Your kidneys are worth more than your car. Your corneas are worth more than your apartment.','Kidney, about forty grand on the bad market, each. Liver, you’ve been drinking, so less. Corneas, eight. You’re walking around worth more than everything you just offered me, and you didn’t even know.')],
 ['','She knows the numbers without thinking about them, the way she knows her times tables. She has known them for as long as she can remember, which is not very long.'],
 ['','She shoots him on the third step. On the drive home she tries to remember who taught her the prices, and gets nothing at all, and decides she read it somewhere.']],()=>{apply({edge:3});done()}));
dkEv('dk_table',()=>S.day>=5&&tier()>=1,done=>{const m=S.pov!=='v';say([
 ['','Sunday. There is one on V’s table downstairs from Friday, and the hounds have to eat.'],
 ['',m?'You help. You always help now. You hum. You take the shoulder off at the joint first try, by feel, with the short knife.':'She helps. She hums. She takes the shoulder off at the joint first try, by feel, with the short knife, which took him two years to learn.'],
 ['K9','Who taught you where that comes apart?'],
 ['hitmeuppp',MV('nobody.','nobody. i just know where stuff comes apart.','Nobody. I just know where things come apart.','Nobody. Hands just know. I’ve always known where people come apart. Is that weird? Don’t answer, pass me the bag.')],
 ['','The four hounds sit in a row by the drain, perfectly still, waiting their turn. Nobody in the room thinks any of this is strange, and that, if anyone else were here to see it, would be the worst part.']],()=>{apply({edge:2});m?apply({aff:1}):apply({heart:-1});done()})});
dkEv('dk_tally',()=>S.day>=6&&frT('r')>=1&&frT('a')>=1,done=>say([
 ['','The four of them keep a tally on the whiteboard in the kennel room. It started as a joke. It has columns.'],
 [RN,'I’m up two on the quarter. One was a priest, so that’s two points, it’s in the rules.'],
 [AN,'it is NOT in the rules. you wrote it in the rules with a sharpie at four in the morning.'],
 ['K9','I do not participate. I keep the board accurate.'],
 ['hitmeuppp',MV('v’s winning lol.','v’s winning by like forty. he just doesn’t count his.','V’s winning by forty and he doesn’t count his.','V’s winning by forty, easy. He “doesn’t participate.” His column’s under the hounds’ bowls, I’ve seen it.')],
 ['','They argue about the scoring for an hour. Somebody makes popcorn. It is the most normal evening any of them has had all month.']],()=>{fr('r',2);fr('a',2);done()}));
dkEv('dk_stream',()=>S.day>=7&&frT('a')>=2,done=>{const m=S.pov!=='v';say([
 ['','Maria’s 9pm stream is a makeup tutorial. Two million people watch. Behind her, out of focus, there is a man tied to a chair with a bag over his head.'],
 ['','The comments ask if the mannequin is new. Maria says yes, it’s for a Halloween look, and laughs, and turns the ring light up so the background goes to white.'],
 ['',m?'You’re on the couch off-camera with a bowl of cereal, holding the bag still when he moves.':'Misaki is off-camera holding the bag still when he moves. V is in the kitchen. He has been asked to make tea for after.'],
 [AN,'(after, ring light off) best numbers this month. people love a mannequin.']],()=>{fr('a',2);apply({edge:2});done()})});
/* what V finds about chapter one */
dkEv('dk_ledger',()=>S.pov==='v'&&(S.f.loreScan||S.f.kdSuspect)&&S.day>=9,done=>say([
 ['','In a crate of ledgers taken from a man he killed last spring there is a book from twenty years ago, in this city. It is an intake book. Every line is a child: an estimate of age, a weight, and a column headed “use.”'],
 ['','Most of the lines say “whole.” Some say “parts.” A few say “partial.”'],
 ['','Two thirds of the way down there is a line: “F, approx. 7, 19.2 kg, no name. Partial.” There is no photograph. There never are, in books like this one. It could be anyone. It could be one of a hundred.'],
 ['K9','(It could be her. It could be anyone.)']],()=>ask('K9','(The book is open on the archive table.)',[
  {t:'File it under M. Do not tell her.',fn:()=>{S.f.dkLedger='kept';apply({heart:-3,veng:8});save();say([['','He files it under M with the enrolment form. She has a joke she likes, and he is not going to replace it with a line in a book that might not even be her.'],['K9','(Every name in that book that is still breathing is on a list now. That part, I can do without telling her.)']],done)}},
  {t:'Show her. She would want to choose.',fn:()=>{S.f.dkLedger='shown';apply({aff:2});save();say([['','He puts the book in front of her and shows her the line, and nothing else.'],
    ['hitmeuppp',MV('...could be anyone.','could be anyone. there’s a hundred lines.','It could be anyone. There are a hundred lines.','Could be anyone. Could be me. “Partial.” Huh. So that’s the coin toss, written down by somebody with nice handwriting.')],
    ['hitmeuppp',MV('still a joke.','i’m keeping the joke.','I’m keeping the joke. I mean it.','I’m keeping the joke. Write the names down, though. All of them. And save me one.')],['K9','I will save you one.']],done)}},
  {t:'Burn the book.',fn:()=>{S.f.dkLedger='burned';apply({heart:1,veng:4});save();say([['','He burns it in the kennel incinerator, page by page, and stays until the binding goes. He has already copied out every name that was in it.']],done)}}])));
const _xeDK=extraEnding;extraEnding=function(){const L=_xeDK();if(!S||!S.f)return L;
 if(S.f.loreScan==='no')L.push('There is an ultrasound machine in the kennel room with its cable coiled on top. Nobody has ever used it on her. She still tells the joke.');
 if(S.f.dkLedger==='shown')L.push('Every name in the intake book is crossed out now. One was crossed out by her.');
 else if(S.f.dkLedger==='kept')L.push('There is an intake book in the archive under M. She has never seen it. Every name in it is crossed out.');
 return L};
