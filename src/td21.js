/* ===================== td21: PAST TENSE (pt_) — the far end of Misaki's detachment =====================
   Through Glass (gl_) is her watching life like a show. This goes further, towards something like Cotard's:
   on bad days she is fairly sure she is already dead, and she is very good at making the evidence agree.
   - A chain of priority mornings (PT_EV), three days apart, shared spacing with td19's arcs.
   - Her POV narration is sometimes simply wrong, and the scene corrects it a line or two later.
   - "Past-tense days" (S.f.ptDay===S.day): in her POV her own sprite draws faded. From V's side she looks normal.
   - After the proofs scene, a protocol: on a past-tense morning she texts the server one word, and whoever
     answers gives her a chore with a body in it. It does not fix anything. It gets the day done.
   Misaki's lines here are written in her lowercase voice (mVoice still matures them); V never contracts. */
const pt_M=()=>S.pov!=='v';
const pt_ok=()=>S&&S.phase!=='taken'&&!isLone();
const pt_today=()=>!!(S&&S.f&&S.f.ptDay===S.day);
const pt_set=()=>{S.f.ptDay=S.day;S.f.ptDays=(S.f.ptDays||0)+1;save()};
const pt_P=()=>S.rom==='a'?AN:S.rom==='r'?RN:'K9';
const pt_started=()=>!!(S.q&&S.q.gl_glass!==undefined)||['after','act2','act3','epilogue'].includes(S.phase);
const pt_after=(id,n)=>S.f['pt_'+id]&&S.day>=S.f['pt_'+id]+(n||3);
const pt_mark=id=>{S.f['pt_'+id]=S.day;save()};
const pt_mood=n=>{try{if(typeof mzForce==='function')mzForce(n)}catch(e){}};
const pt_say=(L,cb,mood)=>{if(mood)pt_mood(mood);say(L.filter(Boolean),()=>{if(mood)pt_mood(null);cb&&cb()})};

/* her own sprite fades on past-tense days, but only to her */
const _actPT=tdActor;tdActor=function(k){if(k==='m'&&S&&pt_M()&&pt_today()&&!META.fxOff){const a=c.globalAlpha;c.globalAlpha=a*.5;try{return _actPT.apply(this,arguments)}finally{c.globalAlpha=a}}return _actPT.apply(this,arguments)};

const PT_EV=[];
const _mornPT=morningEvent;morningEvent=function(done){try{if(S&&pt_ok()&&!(S.f.ptLast>=S.day-2)&&!(S.f.t19last>=S.day-1)){
  const e=PT_EV.find(e=>!S.seen[e.id]&&e.when());if(e){S.seen[e.id]=1;S.f.ptLast=S.day;save();return e.run(done)}
  if(S.f.pt_proofs&&!pt_today()&&S.day>S.f.pt_proofs&&Math.random()<.22){S.f.ptLast=S.day;return pt_ghostDay(done)}}}catch(err){}return _mornPT(done)};

/* ---------- 1. the pulse ---------- */
PT_EV.push({id:'pt_pulse',when:()=>pt_started()&&S.day>=6,run:done=>{pt_set();pt_mark('pulse');
 if(pt_M())pt_say([
  ['','You wake up at six and check for a pulse, the way you do after a job. Two fingers on the wrist. Nothing.'],
  ['','You try the other wrist. Nothing.'],
  ['','You lie there and work it through, the way you would work through a floor plan. No pulse. No hunger, either, now you think about it. The room is cold and you are not shivering. It is not a feeling. It is a conclusion.'],
  ['M','huh.'],
  ['','You get up, because the alternative is lying there being correct. You make toast. You do not eat it. It is for whoever lives here.'],
  ['M','(server) quick q. how long can a person go without a pulse'],
  [RN,'(server) ’Bout four minutes, darlin’. You writin’ a mystery?'],
  ['M','(server) kind of'],
  ['K9','(server) Where are you checking?'],
  ['','You do not answer that. You were checking on the thumb side, where there is no artery to find. You will not know that for a while. Right now you only know that the toast is going cold and nobody is coming to eat it.']],done,'loss');
 else pt_say([
  ['hitmeuppp','(server) quick q. how long can a person go without a pulse'],
  [RN,'(server) ’Bout four minutes, darlin’. You writin’ a mystery?'],
  ['hitmeuppp','(server) kind of'],
  ['K9','(server) Where are you checking?'],
  ['','No answer. You are in the car before the dogs have finished being surprised.'],
  ['','She is at the trailer table with two fingers pressed to the thumb side of her wrist, very calm, like someone waiting for a kettle. There is a plate of toast in front of her that nobody has touched.'],
  ['K9','May I?'],
  ['','She holds the arm out to you as if it belongs to someone else. You move her fingers half an inch, to the inside of the wrist, under the tendon.'],
  ['','She goes still. You watch her count.'],
  ['hitmeuppp','...seventy-two.'],
  ['hitmeuppp','huh. that’s a good fake.'],
  ['K9','It is not a fake. It is a radial artery. Everybody has two.'],
  ['hitmeuppp','sure. sure. that’s what it would feel like either way though, right'],
  ['','You do not have an answer to that. You eat the toast, so that somebody has.']],()=>{apply({aff:2});done()},'loss')}});

/* ---------- 2. the door ---------- */
PT_EV.push({id:'pt_door',when:()=>pt_after('pulse'),run:done=>{pt_set();pt_mark('door');
 const L=pt_M()?[
  ['','The konbini at midnight. You walk up to the automatic door and it does not open.'],
  ['','You step back. You step forward. You wave at the sensor, politely, the way you would wave at a dog that does not know you yet. Nothing.'],
  ['','Through the glass the night clerk looks up, sees you, and comes round the counter to haul the door open by hand.'],
  ['Clerk','Sorry, sorry. It’s been doing that.'],
  ['','You nod. You buy an egg sandwich. You file it with the pulse. Two things now. Two is a pattern if you want it to be, and you notice that you want it to be.'],
  [RN,'(next day) Sensor’s been busted a week, little killer. There’s a sign. Taped right at your eye level. “PLEASE PULL.”'],
  ['M','i saw the sign.'],
  [RN,'And?'],
  ['M','i thought it was for other people.'],
  ['','Ronin does not laugh. He goes very quiet, the way he does when somebody at the next table raises their voice at a waitress.'],
  [RN,'C’mon. We’re goin’ back. You’re pullin’ that door yourself, and I’m gonna watch you do it.']]
 :[
  ['','Ronin calls at seven in the morning, which he never does.'],
  [RN,'Vee. She tell you about the door?'],
  ['K9','Which door?'],
  [RN,'Konbini door. Busted sensor. Whole neighbourhood’s been pullin’ it by hand for a week. There’s a sign.'],
  [RN,'She stood there wavin’ at it. Then she told me, real calm, like she was readin’ me a weather report, that it was “consistent with the other thing.”'],
  ['K9','What other thing?'],
  [RN,'That’s what I asked. She said she’d tell me when she had three.'],
  ['','After he hangs up you write it in the notebook you keep for her, under the pulse: <i>the door. She is collecting.</i>']];
 pt_say(L,()=>{if(pt_M())fr('r',3);done()},'loss')}});

/* ---------- 3. food ---------- */
PT_EV.push({id:'pt_food',when:()=>pt_after('door'),run:done=>{pt_set();pt_mark('food');const P=pt_P();
 const L=pt_M()?[
  ['','Breakfast. The rice tastes like the idea of rice: a word with a temperature.'],
  ['','You do the arithmetic. If nothing tastes of anything, then eating is just moving food from one place to another. It would be more use to somebody else. That is not sad. It is efficient.'],
  ['','You take the onigiri down to the lot and break it up for the crows. They know what to do with it. It is a relief to watch something that knows what to do with it.'],
  ['','The crows were not there. You remember them, but when you look at the photo you took, the lot is empty and the rice is on the gravel and nobody is eating it.'],
  P==='K9'?['K9','(text) Did you eat?']:P===AN?[AN,'(text) babe did u eat. be honest. i can smell lies through the phone']:[RN,'(text) You eat today, darlin’? Don’t lie, I’ll know.'],
  ['M','(text) the crows did'],
  ['','Twenty minutes later there is a knock. '+(P==='K9'?'V':P===AN?'Angel':'Ronin')+' is on your step with two bowls of something hot and a rule.'],
  [P,P==='K9'?'You do not have to taste it. You only have to describe it. Three words. Wrong words are allowed.':P===AN?'ok new rule. u don’t have to taste it. u just have to describe it. three words. wrong words count.':'New rule. Don’t gotta taste it. Just gotta tell me about it. Three words. Wrong ones count.'],
  ['','You eat the first spoonful to get it over with.'],
  ['M','salt. hot. ...tuesday.'],
  [P,P==='K9'?'It is Thursday.':P===AN?'it’s thursday. still counts.':'It’s Thursday. Still counts.'],
  ['','You do it again. And again. By the bottom of the bowl the words are getting less wrong. “Ginger.” “Too much ginger.” Neither of you mentions that you finished it.']]
 :[
  ['','On the camera wall, the trailer lot, 7:12. Misaki comes out with an onigiri, unwraps it, and breaks it up on the gravel. There are no crows. She stands there as if there are.'],
  ['','She goes back inside. The rice stays on the gravel until a cat finds it at noon.'],
  ['K9','(text) Did you eat?'],
  ['hitmeuppp','(text) the crows did'],
  ['','You look at the empty gravel on camera four for a long moment. Then you make soup, badly, quickly, and drive.'],
  ['K9','You do not have to taste it. You only have to describe it. Three words. Wrong words are allowed.'],
  ['hitmeuppp','salt. hot. ...tuesday.'],
  ['K9','It is Thursday.'],
  ['','She does it again. By the bottom of the bowl the words are getting less wrong. “Ginger.” “Too much ginger.” “You burned the onions.” You did.']];
 pt_say(L,()=>{apply({energy:8,aff:2});done()},'loss')}});

/* ---------- 4. the obituary ---------- */
PT_EV.push({id:'pt_obit',when:()=>pt_after('food'),run:done=>{pt_set();pt_mark('obit');S.f.ptObit=1;
 const A=frT('a')>=1;const finder=A?AN:'K9';
 const L=[
  ['',pt_M()?(A?'Angel borrows your phone to film something and stops scrolling halfway through your notes app.':'You leave your phone unlocked on V’s kitchen counter. When you come back he is not reading it. He is very carefully not reading it, which means he has.'):(A?'Angel calls you, which she never does. She sends a screenshot first.':'Misaki leaves her phone unlocked on your counter. A note is open. You are halfway through it before you understand what it is.')],
  ['','A note titled “bio (final)”. It is very good. It is the best thing she has ever written. It is in the past tense.'],
  ['','<i>“She was fast at sixteen and quiet at twenty. She was good at doors. She was survived by a trailer, a coin jar, a sticker sheet with eleven stickers left, and a man who kept a list of the ways she said no.”</i>'],
  [finder,A?'babe. “was survived by.” that’s not how that works. u can’t be survived in the past tense.':'You cannot be survived in the past tense. It is grammatically impossible.'],
  [pt_M()?'M':'hitmeuppp','watch me.'],
  ['',A?'Angel does not argue. She sits down, opens the note, and starts changing it, one verb at a time, out loud.':'He does not argue. He sits down beside her, opens the note, and changes one verb, slowly, where she can see.'],
  [finder,A?'“she IS fast.” ...ok fine “she is FASTER than u.” “she IS good at doors.” “she HAS a coin jar.”':'“She is good at doors.”'],
  ['',pt_M()?'You watch each verb change like a card trick you know the secret of. The trick still works on everyone else. It does not work on you. You let them do it anyway.':'She watches each verb change the way people watch a card trick they already know the secret of. She does not stop you.'],
  [pt_M()?'M':'hitmeuppp','you missed one.'],
  [finder,A?'where':'Where?'],
  [pt_M()?'M':'hitmeuppp','“survived by.” you left it.'],
  [finder,A?'i left it on purpose. u ARE survived by all that stuff. every day. it’s called living with it. it’s the most boring miracle in the world.':'I left it on purpose. You are survived by all of it, every day. That is what living in a place means. It is very dull. It is extremely difficult to do.']];
 pt_say(L,()=>{note('pt_obit','She wrote her own obituary in the notes app, titled “bio (final)”. Someone changed the verbs. She let them.');if(A)fr('a',4);else apply({aff:3});done()},'loss')}});

/* ---------- 5. the count ---------- */
PT_EV.push({id:'pt_count',when:()=>pt_after('obit'),run:done=>{pt_set();pt_mark('count');
 const L=pt_M()?[
  ['','Angel posts the photo from movie night. You count the people in it, because you count people in every room you are in.'],
  ['','Eleven. Ronin, Angel, V, the three dogs that count as people, the delivery guy Angel made stay, his girlfriend, the two neighbours, and Biscuit twice, because she moved halfway through. Eleven.'],
  ['M','(server) good pic. who took it'],
  [AN,'(server) timer!! we’re ALL in it'],
  ['M','(server) i’m not'],
  [AN,'(server) u’re literally in the middle. the armchair. star clip. u’re holding the popcorn'],
  ['','You look again. There is a girl in the armchair with a star clip, holding the popcorn, looking at the camera. You counted her. You counted her as furniture.'],
  ['','There were twelve. There were always twelve.'],
  ['M','(server) oh. yeah. there i am'],
  ['','You set the photo as your lock screen, not because you believe it, but so that you will have to look at the evidence every time you check the time.']]
 :[
  ['','Angel posts the photo from movie night. Twelve people, three dogs, one bowl of popcorn.'],
  ['hitmeuppp','(server) good pic. who took it'],
  [AN,'(server) timer!! we’re ALL in it'],
  ['hitmeuppp','(server) i’m not'],
  ['','You open the photo. She is in the middle of it, in the armchair, holding the popcorn, looking straight down the lens.'],
  ['K9','(server) You are in the armchair. You are holding the popcorn. You took most of it.'],
  ['','The typing indicator comes up and goes away three times.'],
  ['hitmeuppp','(server) oh. yeah. there i am'],
  ['','Later, at the gate, she shows you her lock screen. It is the photo. She does not say why. You do not need her to.']];
 pt_say(L,()=>{fr('a',2);done()},'loss')}});

/* ---------- 6. the windows ---------- */
PT_EV.push({id:'pt_air',when:()=>pt_after('count'),run:done=>{pt_set();pt_mark('air');
 const L=pt_M()?[
  ['','November, and every window in the guest room is open. You have been awake since four. You opened them one at a time.'],
  ['','There is a smell. Sweet, and wrong, and close. You have stood near enough rooms after enough jobs to know what it is.'],
  ['','You shower. You shower again, with the blue one, the one for hair, on your arms. You light Angel’s incense, the expensive one.'],
  ['','The smell is the lilies. Somebody left lilies on the landing two days ago. They are turning. That is all it was.'],
  ['','You do not find that out for an hour, and for that hour it was you.'],
  ['K9','(through the door) Misaki. It is four degrees in there.'],
  ['M','do i smell'],
  ['K9','...Of what?'],
  ['M','like it’s been a few days'],
  ['','The door does not open. He does not laugh. You hear him sit down on the floor outside, the way he did when you showered with the door open.'],
  ['K9','You smell of lavender, the blue shampoo on your arms, and Angel’s incense, which she will want back. The lilies on the landing are dying. I will take them out. Nothing in this room is ending except the flowers.'],
  ['M','...you checked the flowers'],
  ['K9','I checked everything in the house at four. I heard the first window.']]
 :[
  ['','At four in the morning you hear a window open in the guest room. Then another. Then all of them.'],
  ['','You check the house the way you would check it for an intruder. The lilies on the landing have turned. The whole floor smells of them, sweet and wrong.'],
  ['','At five you knock.'],
  ['hitmeuppp','(through the door) do i smell'],
  ['K9','Of what?'],
  ['hitmeuppp','like it’s been a few days'],
  ['','You sit down on the floor outside her door, the way you did when she showered with it open.'],
  ['K9','You smell of lavender, the blue shampoo, and Angel’s incense, which she will want back. The lilies on the landing are dying. I am taking them out now. Nothing in that room is ending except the flowers.'],
  ['','A long silence. Then, one by one, you hear the windows close.']];
 pt_say(L,()=>{apply({aff:3});if(S.dark)calm(4);done()},'loss')}});

/* ---------- 7. proofs, and then not ---------- */
PT_EV.push({id:'pt_proofs',when:()=>pt_after('air'),run:done=>{pt_set();pt_mark('proofs');
 const L=[
  ['',pt_M()?'V asks you to come to the archive. There is a notebook on the desk. The label says PROOFS in his small capitals.':'You put the notebook on the archive desk between you. You have been keeping it for three weeks. The label says PROOFS.'],
  ['K9','I have been keeping evidence. I thought you might respect evidence.'],
  ['K9','One. Your radial pulse: seventy-two, then sixty-eight, then eighty-one when Biscuit stood on your foot.'],
  ['hitmeuppp','bodies keep going for a bit. hair grows. you know that. you’ve seen it.'],
  ['K9','Two. You pulled the konbini door yourself. Ronin has a video.'],
  ['hitmeuppp','doors don’t care who pulls them.'],
  ['K9','Three. You ate a bowl of soup and identified the ginger.'],
  ['hitmeuppp','i identified the ginger because you always put too much in. i was remembering. that’s not tasting.'],
  ['K9','Four. The dogs greet you at the door.'],
  ['hitmeuppp','the dogs greet the postman. the dogs greet a bin bag if it moves.'],
  ['',pt_M()?'It goes on. Twenty-three entries. You have an answer for every one, and every answer is clean, and quick, and better than the proof.':'It goes on. Twenty-three entries. She has an answer for every one, and every answer is clean, and quick, and better than the proof.'],
  ['',pt_M()?'You can see him realise it somewhere around entry fifteen: every proof he hands you, you take apart, and you get faster at it. He is training you.':'Somewhere around entry fifteen you understand it: every proof you hand her, she takes apart, and she is getting faster at it. You are training her.'],
  ['','He closes the notebook.'],
  ['K9','I am going to stop asking you to believe that you are alive.'],
  ['hitmeuppp','...ok?'],
  ['K9','I will ask you something smaller. On the days you are sure, text the server one word. Anyone who sees it gives you a job. Carry the dog food. Hold the ladder. Stir the pot. You may do it dead. It still has to be done.'],
  ['hitmeuppp','what word'],
  ['K9','You choose. It will be a stupid one. That is how I will know it is yours.'],
  ['',pt_M()?'You think about it for the length of time it takes Biscuit to give up on the biscuit tin.':'She thinks about it for the length of time it takes Biscuit to give up on the biscuit tin.'],
  ['hitmeuppp','“boo.”']];
 pt_say(L,()=>{note('pt_proofs','V kept twenty-three proofs that she is alive. She took every one apart. So now: on bad days she texts “boo”, and somebody gives her a chore.');apply({aff:4});if(typeof relApply==='function')relApply({trust:6});done()},'loss')}});

/* ---------- 8. the cell (after the kidnapping) ---------- */
PT_EV.push({id:'pt_cell',when:()=>pt_after('proofs',2)&&['after','act2','act3','epilogue'].includes(S.phase),run:done=>{pt_set();pt_mark('cell');
 const L=[
  ['',pt_M()?'Three in the morning. V finds you on the kitchen floor with your back to the fridge, because it hums, and the humming is proof of something.':'Three in the morning. You find her on the kitchen floor with her back against the fridge, because it hums.'],
  ['hitmeuppp','can i tell you the worst part. of the room. the cell.'],
  ['K9','Yes.'],
  ['hitmeuppp','i was alive the whole time in there. every second. i could feel my heart. i could taste the water. the light hurt. my wrists hurt. everything was so loud and so real and so mine.'],
  ['hitmeuppp','and it was unbearable.'],
  ['hitmeuppp','out here it’s easier to be dead. dead people don’t get taken. you can’t take something that isn’t there. i think i decided that in the room, on day two, and i forgot i decided it.'],
  ['',pt_M()?'He does not tell you that you are wrong. He sits down on the floor next to you, which takes him a while, because of the knee.':'You do not tell her she is wrong. You sit down on the floor next to her, which takes a while, because of the knee.'],
  ['K9','Then I will not ask you to stop. Not yet. I will only point out that the dead do not decide things, and you just told me you did.'],
  ['hitmeuppp','...that’s a cheap shot.'],
  ['K9','It is a very cheap shot. I have been saving it.'],
  ['','The fridge hums. Upstairs a dog changes position and sighs. At some point she leans on your shoulder, and at some point after that she says, very quietly, without making it a joke:'],
  ['hitmeuppp','present tense. for a minute.']];
 pt_say(L,()=>{apply({aff:4});if(S.dark)calm(8);note('pt_cell','“Out here it’s easier to be dead. You can’t take something that isn’t there.” She decided it on day two in the cell.');done()},'grief')}});

/* ---------- the protocol: boo ---------- */
const PT_CHORES=[
 ['K9','Carry the dog food from the garage to the kennel. It is fifteen kilos. Ghosts cannot lift fifteen kilos. I am not making a point. The dogs are hungry.','You carry the dog food. It is heavy in exactly the way heavy things are. Biscuit supervises.'],
 [AN,'hold the ring light for 20 mins. ur not allowed to be dead on my set, union rules','You hold the ring light. Your arms ache by minute twelve. Angel says “higher” forty times. The aching is annoying and specific and yours.'],
 [RN,'Come hold the ladder, darlin’. Gutters. If I fall, it’s on your conscience, and ghosts ain’t got one, so you’d better be somethin’ else.','You hold the ladder for an hour while Ronin pulls leaves out of a gutter and sings badly. Twice it wobbles and twice you catch it.'],
 ['K9','Stir the soup. Clockwise. If it sticks to the bottom it will be your fault, which requires a self, which I am told you lack. We will find out.','You stir the soup for forty minutes. It does not stick. When you taste it to check, you say “salt” before you can stop yourself.'],
 [AN,'come walk biscuit with me. V said i could borrow her. she pulls. she only pulls when someone’s actually holding the lead lol','Biscuit pulls the whole way round the park. Your shoulder hurts for the rest of the day. Angel says “told u” every time you rub it.'],
 [RN,'Dishes. My place. There’s a stack. I ain’t proud of it. Water’s hot enough to argue with you.','The water is too hot. Your hands go pink. You wash the whole stack and Ronin dries, and neither of you says anything about why you are there.'],
 ['K9','Read to me. Chapter nine. My eyes are tired. Ghosts do not do voices for the duke, so if you do the voice, I will draw my own conclusions.','You read chapter nine. You do the voice for the duke. You do not mean to. He turns a page he has not read, so that you will keep going.']];
function pt_ghostDay(done){pt_set();const avail=PT_CHORES.filter(c=>c[0]==='K9'||(c[0]===AN&&frT('a')>=1)||(c[0]===RN&&frT('r')>=1));const ch=avail[(S.f.ptDays||0)%avail.length];
 const L=pt_M()?[
  ['','You wake up past tense. You know before you open your eyes: the room is a photograph of a room.'],
  ['M','(server) boo'],
  [ch[0],'(server) '+ch[1]],
  ['',ch[2]],
  ['',['It does not fix anything. By evening you are still mostly a rumour. But the job got done, and a ghost could not have done it, and you are too tired to argue with that tonight.','By evening the room is still a photograph. You are in it now, though, somewhere near the edge, holding something.','It does not fix anything. It fills the day, the way sand fills a box. That turns out to be most of what a day is for.'][(S.f.ptDays||0)%3]]]
 :[
  ['hitmeuppp','(server) boo'],
  ch[0]==='K9'?['K9','(server) '+ch[1]]:[ch[0],'(server) '+ch[1]],
  ['',ch[2].replace(/\bYou\b/g,'She').replace(/\byou\b/g,'she').replace(/\bYour\b/g,'Her').replace(/\byour\b/g,'her')],
  ['','It does not fix anything. But the job gets done, and that evening the server gets one more message from her, unprompted, which has not happened on a “boo” day before: “ok. done.”']];
 pt_say(L,()=>{apply({energy:-4,aff:1});if(S.dark)calm(5);done()})}

/* ---------- talk topics ---------- */
(function(){const vIns=o=>TOPICS_V.splice(TOPICS_V.length-1,0,o),mIns=o=>TOPICS_M.splice(TOPICS_M.length-1,0,o);
 vIns({id:'pt_here',label:()=>'“do i look like i’m here to you?”',show:()=>!!S.f.pt_pulse&&S.phase!=='taken',run:b=>{warm('v','pt_here',3);const A=[
  ['K9','You have toast crumbs on your left sleeve and you reorganised my spice rack by colour while I was on a call. I do not know what the dead do, but I doubt it is that.'],
  ['K9','Yes. You are casting a shadow on my book. You have been casting it for twenty minutes. I have not turned the page, because I did not want you to move.'],
  ['K9','You are here. You are also frightened that you are not. Both of those are true, and only one of them is a fact.'],
  ['K9','Biscuit is lying on your feet. She does not lie on furniture. She has opinions about furniture.']];
  say([A[(S.talks.pt_here-1)%A.length],pt_today()?['hitmeuppp','...ok. noted. not convinced. noted.']:['hitmeuppp','ok. good. just checking the instruments.']],b)}});
 mIns({id:'pt_tense',label:()=>'“Which tense is it today?”',show:()=>!!S.f.pt_proofs&&S.phase!=='taken',run:b=>{warm('m','pt_tense',3);
  say(pt_today()?[['hitmeuppp','past. very past. ancient history.'],['K9','Then I have a job for you. The kennel gate sticks. Hold it while I oil it.'],['','She holds it. It sticks twice. The second time she swears at it in the present tense, and catches herself, and does not take it back.']]
   :[['hitmeuppp','present. ish. present-adjacent.'],['K9','Present-adjacent is acceptable. I am mostly present-adjacent myself before coffee.']],b)}});})();

/* ---------- a few walking-around thoughts on past-tense days (her POV) ---------- */
TDREACT.push(
 {id:'pt_r1',map:'trailer',visit:1,when:()=>pt_M()&&pt_today(),line:()=>pk(['(the mirror has the room in it. and the lamp. you have to wave before you find yourself.)','(your breath fogs the window. you look at it for a while. that’s a strange thing for a ghost to be able to do.)','(the kettle is hot. you know because the light is on. not because of your hand.)'])},
 {id:'pt_r2',map:'base',visit:1,when:()=>pt_M()&&pt_today(),line:()=>pk(['(the dogs look up when you come in. they look up at the postman too. it doesn’t mean anything.)','(somebody says your name in the next room. it sounds like it belongs to someone else, someone who used to live here.)','(V says good morning. you check the room behind you before you answer.)'])});
