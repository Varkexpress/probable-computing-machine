/* ===================== WASTED, AND WHAT RONIN AND ANGEL ARE LIKE (kc42) =====================
   Lore: Misaki was clever at school for the short time they were there. No time for homework and no time to join
   anything, but very good at competition maths. They say a lot of talents were wasted on them.
   Darker scenes for Ronin and for Angel. No new characters; the people they kill are unnamed. */
const WK=()=>{try{return !isLone()&&!S.dark&&['normal','act2','act3','epilogue'].includes(S.phase)}catch(e){return false}};
const wkEv=(id,when,run)=>EVENTS.push({id,when:()=>{try{return WK()&&when()}catch(e){return false}},run});
/* ---------- the maths ---------- */
wkEv('lore_maths',()=>S.day>=4&&tier()>=1,done=>{const m=S.pov!=='v';say([
 ['','There is a puzzle in the back of V’s paper, the hard kind, marked with three stars. He has been working on it since breakfast.'],
 ['',m?'You read it upside down from across the table, over your cereal, and say the answer with your mouth full.':'Misaki reads it upside down from across the table, over her cereal, and says the answer with her mouth full.'],
 ['K9','...That is correct. How?'],
 ['hitmeuppp',MV('i was good at this stuff.','i used to be good at these. competition maths. at school.','I was good at these. Competition maths, at school, for the bit I was there.','I was really good at these. Competition maths, the timed ones. For the couple of years I was in school, I was the kid they sent to the regional round.')],
 ['hitmeuppp',MV('never did homework tho.','never did a single homework. no time. no table.','I never did any homework. There wasn’t time, and there wasn’t a table.','I never did one homework in my life. There wasn’t a table to do it at, or a lamp, or an evening that was mine. But you can do the competition ones in your head, so I could do those.')]],()=>ask(m?'hitmeuppp':'K9',m?'(He is looking at you differently.)':'(She has gone back to the cereal.)',[
  {t:m?'“i got third at regionals once. at eleven.”':'“What happened at the regional round?”',fn:()=>{apply({aff:2});say([['hitmeuppp',MV('third. at eleven.','got third. i was eleven. there was a trophy.','I came third. I was eleven. There was a little trophy.','Third. I was eleven, and everyone else had a parent in the audience and a calculator they’d been allowed to practise with. I had a trophy, after. A little gold man holding a pencil.')],['K9','Do you still have it?'],['hitmeuppp',MV('sold it.','sold it. it was like six dollars.','I sold it. It got me about six dollars.','Sold it the week after. Six dollars, from a pawn place. That was dinner for three days. Best use of a trophy, honestly.')]],done)}},
  {t:m?'“a lot of stuff got wasted on me.”':'“You were wasted on them.”',fn:()=>{apply({aff:2});say([['hitmeuppp',MV('lots of stuff got wasted on me.','a lot of stuff got wasted on me. that’s fine.','A lot of things got wasted on me. It’s fine.','A lot of stuff got wasted on me. Maths. Languages, I picked some up off the radio. A memory like a trap. Good hands. Most of it went into this, in the end. Wind, distance, drop. Turns out a sniper’s just a maths kid with nowhere to go.')],['K9','It went somewhere.'],['hitmeuppp',MV('yeah. here.','yeah. it went here. could be worse.','Yes. It went here. It could have gone worse.','Yeah, it went here. To your kitchen. I’ve had worse outcomes. Finish your puzzle, I’ll tell you the next one too.')]],done)}}]))});
TDTOP_M.push({id:'lore_school',label:()=>'“How long were you in school?”',show:()=>!S.dark&&tier()>=2&&S.seen&&S.seen.lore_maths&&!(S.talks&&S.talks.lore_school),run:b=>{S.talks=S.talks||{};S.talks.lore_school=1;warm('m','lore_school',4);say([
 ['K9','How long were you in school?'],
 ['hitmeuppp',MV('like four years.','nine to thirteen. ish.','From nine to about thirteen.','From nine, when somebody put me on a form, to about thirteen, when nobody noticed I’d stopped coming. Four years. The teachers liked me. They kept writing “wasted” in the margins, like it was my fault.')],
 ['K9','What did they mean by it?'],
 ['hitmeuppp',MV('that i could’ve been smth.','that i could’ve been something. doctor. engineer. idk.','That I could have been something. An engineer, one of them said.','That I could have been something. One of them said engineer. I think about that sometimes, on a roof, doing the drop for a nine-hundred-metre shot in my head. I did become an engineer. I just engineer where a bullet goes.')],
 ['','He does not say it is a waste. He knows she is waiting for it, and he is not going to give it to her.']],b)}});
/* ---------- Ronin ---------- */
wkEv('dk_r_booth',()=>frT('r')>=2&&S.day>=6,done=>{const m=S.pov!=='v';say([
 ['','Ronin has a confession booth. He bought it from a church that was closing and put it in the back of his workshop, and he sits on the priest’s side.'],
 ['',m?'You’re on a stool behind the curtain, eating crisps, because he asked you to come and watch “the good bit.”':'He has asked V to come and watch “the good bit.” V stands at the back of the workshop with his hands in his coat.'],
 ['','The man in the other side of the booth is tied to the kneeler. He confesses everything, because Ronin asked nicely and the crowbar was there. It takes forty minutes. Some of it is very bad.'],
 [RN,'That everything? You sure? Take your time, son.'],
 [RN,'Okay. You’re forgiven. I mean it. Go in peace.'],
 ['','Then he opens the little door between them and kills him through it with the crowbar, and says “amen,” and gets up to make coffee.'],
 [RN,'(over his shoulder) Gotta forgive ’em first. Otherwise they go up. Forgiven, they go down light. Devil likes ’em light.']],()=>{fr('r',2);apply({edge:2,heart:m?0:-1});done()})});
wkEv('dk_r_rings',()=>frT('r')>=2,done=>{const m=S.pov!=='v';say([
 ['','Ronin takes off his silver skull rings to wash his hands. There are nine of them. You have never seen him without them before.'],
 ['','Inside each band there is a name engraved, very small. He catches you looking and holds one up to the light so that you can read it.'],
 [RN,'First nine. One a finger, ’cept the thumb. Thumbs are for the Devil.'],
 [m?'hitmeuppp':'K9',m?MV('what about the rest.','and the rest?','And the rest?','And everyone after nine?'):'And the others?'],
 [RN,'Ran outta fingers years ago. Rest of ’em I keep up here.'],
 ['','He taps his head. Then he puts the rings back on in order, first to ninth, without looking, and dries his hands on his jeans.']],()=>{fr('r',2);done()})});
wkEv('dk_r_hymn',()=>frT('r')>=1&&S.day>=5,done=>say([
 ['','Ronin sings when he works. Gospel, mostly, the old ones, in a voice that is honestly beautiful and that nobody ever expects out of him.'],
 ['','Tonight the man on the floor knows the hymn. He joins in on the second verse, very faintly, through what is left of his teeth.'],
 [RN,'(stopping) Oh, you know this one? Aw. Come on, then. From the top.'],
 ['','They sing it all the way through together. Ronin harmonises. At the last line he finishes the job, and holds the note on his own, and it is so lovely that for a second nobody in the room can move.']],()=>{fr('r',2);done()}));
/* ---------- Angel ---------- */
wkEv('dk_a_mirror',()=>frT('a')>=2,done=>{const m=S.pov!=='v';say([
 ['','Angel is in front of her mirror practising a face. It is grief. She is going to a funeral tomorrow as Maria, to film a tribute, for a man she shot on Tuesday.'],
 [AN,'too much? it’s too much. the lip’s doing too much.'],
 ['',m?'She does it again. It is perfect: the brave smile that isn’t holding, the eyes. You have seen real grief do worse.':'She does it again. It is perfect. V has seen real grief look less convincing.'],
 [AN,'the comments are going to say i’m so brave. i’m going to read every one.'],
 ['','She is completely happy. She hums while she does her eyeliner.']],()=>{fr('a',2);done()})});
wkEv('dk_a_scope',()=>frT('a')>=2&&S.day>=6,done=>{const m=S.pov!=='v';say([
 ['',m?'You’re spotting for Angel on a roof. Through the scope the target is in his garden, pushing his daughter on a swing.':'V is spotting for Angel on a roof, which he does when she asks. Through the scope the target is in his garden, pushing his daughter on a swing.'],
 [AN,'(in her vlog voice, very quietly) and she breathes in. and she waits. because she’s sweet. because she’s a sweetheart.'],
 ['','They wait twenty minutes, until the girl is called in for dinner and the back door shuts behind her. Then Angel says “cork,” and he falls in the grass by the swing, and it goes on moving a little on its own.'],
 [AN,'see? sweet. she didn’t see a thing. let’s get waffles.']],()=>{fr('a',3);apply({edge:2});done()})});
wkEv('dk_a_wrong',()=>frT('a')>=2&&S.day>=8,done=>{const m=S.pov!=='v';say([
 ['','Angel is very quiet at breakfast, which she never is. Then she puts her phone in the middle of the table.'],
 ['','It is an article. The man she shot last month, the one the tips said was the man taking girls off the night buses, was not. They have caught that man since. Hers was just a man who looked like him.'],
 [AN,'so.'],
 ['',m?'Everyone waits to see what she will do with it.':'Everyone waits to see what she will do with it. V has his answer ready and is waiting to see whether she needs it.'],
 [AN,'he cheated on his wife. it says so in the comments. so.'],
 [AN,'none of them can say they didn’t have it coming. that’s the rule. i don’t break the rule.'],
 ['','She takes the phone back and eats her waffle. Nobody at the table says anything else about it, and she never brings it up again, and that, more than anything she has done, is what makes Ronin look at her a little longer than usual.']],()=>{fr('a',1);apply({heart:m?0:-2});done()})});
const _xeWK=extraEnding;extraEnding=function(){const L=_xeWK();if(!S||!S.seen)return L;
 if(S.seen.lore_maths)L.push('She still does the hard puzzle in the back of V’s paper, upside down, before he has finished his coffee. Third at regionals, at eleven. The trophy got her three dinners.');
 return L};
