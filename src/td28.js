/* ===================== td28: partners, the package deal, the other pairing =====================
   - Once Misaki (S.rom) or V (S.vrom) is with Ronin or Angel, that partner takes over the intimate scenes:
     the black bath becomes the partner's, and V and Misaki's own romantic affection options with each other go platonic.
   - V and Misaki stay uncannily close anyway. Their partners do not mind. Everyone knows the two of them are a set.
   - If the player chooses Ronin or Angel, the other lead (V or Misaki) has a chance with whoever is left (S.f.k28pair).
   Voices: V never contracts. Ronin drawls. Angel texts in lowercase. */
const k28Ok=()=>S&&S.phase!=='taken'&&!isLone()&&!(S.f&&S.f.abroad);
const k28Partner=()=>S.rom||S.vrom||null;                  /* 'r' | 'a' | null : whoever the player is with */
const k28PN=k=>k==='r'?RN:AN;
const k28Name=k=>k==='r'?'Ronin':'Angel';
const k28Lead=()=>S.pov==='v'?'m':'v';                      /* the lead the player is not playing */
const k28LeadN=()=>k28Lead()==='v'?'V':'Misaki';

/* ---------- the partner takes the bath ---------- */
(function(){const e=K22EV.find(x=>x.id==='k25_bath');if(!e)return;const run=e.run;
 e.run=function(done){const k=k28Partner();if(!k)return run.apply(this,arguments);const P=k28PN(k),m=S.pov!=='v';
  const L=k==='r'?[
   ['','After the job. Three in the morning. Ronin’s bathroom: a clawfoot tub he found in a church that was being demolished, candles he swears are not stolen, the gospel station on low.'],
   ['','The water goes the colour of weak tea, then the colour of something else. None of it is '+(m?'yours':'yours')+'.'],
   [RN,'Lean back, '+(m?'darlin’':'Vee')+'. I got you. Head back. There.'],
   ['','He washes your hair with his big careful hands, sleeves pushed up, humming the hymn the radio is playing, a half-step flat on purpose. He is very gentle. He is gentle the way only someone who knows exactly how much force a skull can take is gentle.'],
   m?['','You slide under. All the way. When you come up he has his hand flat on the water where your face was, waiting, and he does not say anything about the four minutes. Ronin has seen you go under before. Ronin has made his peace with it, mostly by praying.']:['','You close your eyes. You do not need much sleep. You need this more.'],
   [RN,'There. Clean as a Sunday.']]
  :[
   ['','After the job. Three in the morning. Angel’s bathroom: rose-gold taps, a ring light she has turned to the wall, a playlist called “after” that is only rain.'],
   ['','The water goes pink, then darker. None of it is yours. Angel does not look at the colour. Angel looks at your face.'],
   [AN,'tip ur head back. no, back. trust me. i do this for a living. well. i do faces for a living. hair is like a face that goes on forever.'],
   ['','She washes your hair with her nails, slowly, three different products in a very specific order she explains in a whisper, as if you are a tutorial nobody else is allowed to watch.'],
   m?['','You slide under. All the way. When you come up she is sitting on the edge of the bath with her knees up, filming nothing, waiting. “four minutes,” she says. “ok. ok. u’re back. i’m not going to say anything. i’m going to say one thing. don’t do that when i’m not here.”']:['','You close your eyes. She hums along to the rain. It is the most anybody has looked after you since you were nine.'],
   [AN,'there. u look like a person again. a very tired, very hot person.']];
  say(L,()=>{fr(k,3);if(S.dark&&typeof calm==='function')calm(8);done()})}})();
/* V and Misaki keep it platonic with each other while one of them is with someone else */
(function(){try{const ks=AFFX.kiss;if(ks){const t=ks.t,run=ks.run;ks.t=w=>k28Partner()&&!S.f.married?'A kiss on the forehead':(typeof t==='function'?t(w):t);ks.run=(w,b)=>{if(k28Partner()&&!S.f.married){apply({aff:1});return say([['',w==='v'?'You kiss his forehead on your way past, the way you might straighten a picture frame. He does not look up from his book. He turns a page so you know he noticed.':'You kiss the top of her head on your way past. She does not look up from her phone. She leans into it by one degree.']],b)}return run(w,b)}}
 const hr=AFFX.heart;if(hr){const t=hr.t;hr.t=w=>k28Partner()?'Hold hands under the table':(typeof t==='function'?t(w):t)}}catch(e){}})();

/* ---------- the package deal ---------- */
K22EV.push(
 {id:'k28_set1',when:()=>k28Ok()&&!!k28Partner()&&tier()>=2,run:done=>{const k=k28Partner(),P=k28PN(k),m=S.pov!=='v';
  say([['',m?'Movie night at V’s. You fall asleep against V’s shoulder halfway through, exactly the way you always have. '+k28Name(k)+' comes back from the kitchen with popcorn, looks at the two of you, and puts the blanket over both.':'Movie night. Misaki falls asleep on your shoulder halfway through, exactly the way she always has. '+k28Name(k)+' comes back from the kitchen with popcorn, looks at the two of you, and puts the blanket over both.'],
   [P,k==='r'?'Don’t look at me like that, Vee. I knew what I was signin’ up for. I didn’t date one of you. I dated the whole terrible set.':'don’t look at me like that. i knew. everybody knows. u two are a two-for-one deal. i read the terms and conditions.'],
   ['K9',m?'...Thank you.':'...Thank you.'],
   [P,k==='r'?'Ain’t a favour, darlin’. Just facts. Pass the salt.':'it’s not a favour babe it’s just how u come. pass the popcorn.']],()=>{fr(k,2);apply({aff:2});done()})}},
 {id:'k28_set2',when:()=>k28Ok()&&!!k28Partner()&&!!S.seen.k28_set1,run:done=>{const m=S.pov!=='v';
  say([['','You do not need to call each other. '+(m?'V':'Misaki')+' turns up on the nights you would have called, which is how it has always worked.'],
   ['','You finish each other’s sentences in front of people who find it unsettling. You know where the other one is in a room without looking. You share a toothbrush cup at V’s house and neither of you remembers deciding that.'],
   ['','Nobody has ever asked either of you to choose. Your partners worked it out within a week: the two of you are not a couple, and you are not two people either. You are a package. You come together or not at all.']],()=>{apply({aff:2});done()})}});

/* ---------- the other pairing ---------- */
function k28Other(){const k=k28Partner();if(!k)return null;return k==='r'?'a':'r'}
K22EV.push(
 {id:'k28_pair1',when:()=>k28Ok()&&!!k28Partner()&&frT(k28Other())>=1&&S.day>=8&&!S.f.k28pair,run:done=>{const o=k28Other(),L=k28LeadN(),P=k28PN(o);
  say([['','You notice it at the gala before anyone says anything. '+L+' and '+k28Name(o)+' at the bar, not talking, standing slightly too close, both of them looking at the same exit.'],
   [P,o==='r'?'(later, to you) Your '+L+' got a way of not lookin’ at a fella that’s real hard to ignore. Just sayin’. Just makin’ conversation.':'(later, to you) ok random question. is '+L+' seeing anyone. not for me. for science. for a friend. the friend is me.']],()=>ask(S.pov==='v'?'K9':'hitmeuppp','(…)',[
   {t:S.pov==='v'?'“You should ask.”':MV('“you should ask”','“u should ask. seriously.”','“You should ask.”','“You should ask. I mean it.”'),fn:()=>{S.f.k28nudge=1;fr(o,2);save();say([[P,o==='r'?'Should I? Huh. Alright. Alright, I will.':'should i??? ok. ok ok. i will. i’m going to throw up first but i will.']],done)}},
   {t:S.pov==='v'?'“That is between the two of you.”':MV('“that’s their business”','“that’s their business, not mine”','“That is between the two of you.”','“That is between the two of you. I will not get in the way.”'),fn:()=>{S.f.k28nudge=0;save();done()}}]))}},
 {id:'k28_pair2',when:()=>k28Ok()&&!!S.seen.k28_pair1&&!S.f.k28pair&&(S.f.k28nudge||frT(k28Other())>=2||Math.random()<.4),run:done=>{const o=k28Other(),lead=k28Lead(),L=k28LeadN(),P=k28PN(o);S.f.k28pair={lead,with:o,day:S.day};save();
  const V=lead==='v';
  say(o==='r'?[
   ['','Ronin turns up at the house at two in the morning with a single rose, still wet, and a crowbar, also wet, and asks for '+L+' by name at the gate.'],
   [RN,'Kiss or kill, '+(V?'Mister Foundation':'little killer')+'? Pick careful. I already know which one I’m hopin’ for.'],
   [V?'K9':'hitmeuppp',V?'...Kiss. Do not make me say it twice.':MV('kiss. obviously. u idiot.','kiss. obviously, u idiot. come in, it’s raining.','Kiss. Obviously. Come in out of the rain.','Kiss. Obviously. You could have asked at a normal hour.')],
   ['','You watch from the landing. '+(V?'V':'Misaki')+' lets him in. The hounds let him past. That is how you know it is serious.']]
  :[
   ['','Angel sends '+L+' a forty-second voice note that is mostly breathing and then, very fast: “do u want to get dinner. like a date. like a real one. with a reservation. i made a reservation.”'],
   [V?'K9':'hitmeuppp',V?'(text) I would like that very much. I will bring flowers. Tell me which ones are not a statement.':MV('(text) yeah','(text) yeah. yes. ok. what do i wear','(text) Yes. I’d like that.','(text) Yes. I would really like that. I’ll wear something you can’t see blood on.')],
   [AN,'(text) i’m SCREAMING. quietly. into a pillow. see u at 8'],
   ['','You hear about it from both of them, separately, in detail, the next morning. Everyone is very happy. Nobody is surprised.']],()=>{toast(L+' and '+k28Name(o)+' are together');fr(o,3);done()})}},
 {id:'k28_pair3',when:()=>k28Ok()&&!!S.f.k28pair&&S.day>=S.f.k28pair.day+3,run:done=>{const o=S.f.k28pair.with,L=k28LeadN(),p=k28Partner();
  say([['','Family dinner. Four people, two pairs, one table. Somebody has to set the seating plan and nobody can agree on it, because V and Misaki keep ending up next to each other no matter where anyone puts their name card.'],
   [k28PN(p),p==='r'?'Let ’em sit together, darlin’. It’s like separatin’ a bomb from its fuse. Ain’t worth it.':'just let them sit together. it’s easier. they’re like a pair of earrings. u can wear them separately but why would u.'],
   [k28PN(o),o==='r'?'Amen.':'agreed. i’ll sit across. i like the view.'],
   ['','V and Misaki exchange one look across the gravy. Their two partners exchange a different look, of complete and cheerful resignation. Dinner is very good.']],()=>{fr(o,2);fr(p,2);done()})}});
const _xe28=extraEnding;extraEnding=function(){const L=_xe28();try{if(S&&S.f&&S.f.k28pair){const P=S.f.k28pair;L.push((P.lead==='v'?'V':'Misaki')+' and '+(P.with==='r'?'Ronin':'Angel')+' got together the same year. Four people, two pairs, one table, and V and Misaki still always sit next to each other.')}if(S&&k28Partner())L.push('Whoever V and Misaki loved, they loved knowing the two of them came as a set. Nobody ever asked them to choose.')}catch(e){}return L};
