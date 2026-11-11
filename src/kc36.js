/* ===================== STORY SETTING: THE AFTERMATH (kc36) =====================
   META.kdFull (default on). "Full story" keeps the strand about what was done to her in the hours she cannot remember
   (the doctor's question, the examination window, the photographs she denies, the box in the fridge, the hidden route).
   "Injuries only" removes that strand completely; the aftermath is about her injuries, the treatment, and how badly
   she lies about them. The rest of the kidnapping arc is the same in both. */
const kdSA=()=>typeof META==='undefined'||META.kdFull!==0;
const KD_SA_EV=['kd_math','kd_clothes','kd_exam','kd_photos','kd_wash','kd_smell','kd_notask','kd_vknows','kd_later','kd_draft',
 'kd_recount','kd_slip','kd_sleeptalk','kd_shop','kd_ask','kd_window','kd_bodymap','kd_photodeny','kd_cup','kd_results','kd_dentist',
 'kd_vdoc','kd_kitgone','kd_last','kd_told_box','kd_told_dentist','kd_told_sleep'];
const KD_SA_TX=['tx_kd_sleep','tx_kd_ask','tx_kd_vdots','tx_kd_ronsoft','tx_kd_docstop'];
EVENTS.forEach(e=>{if(KD_SA_EV.includes(e.id)){const w=e.when;e.sa=1;e.when=()=>kdSA()&&w()}});
KD_SA_TX.forEach(id=>{const t=TXS[id];if(t){const w=t.when;t.when=()=>kdSA()&&w()}});
[TDTOP_V,TDTOP_M,TOPICS_V,TOPICS_M].forEach(L=>L.forEach(t=>{if(t&&t.id==='kd_second'&&!t.sa){const s=t.show;t.sa=1;t.show=()=>kdSA()&&s()}}));
(function(){const sp=ROOMS.medbay.spots.find(s=>s.label==='The small fridge');if(!sp)return;const a=sp.act;
 sp.act=function(){if(kdSA())return a.apply(this,arguments);say([['','Soup, in eleven tubs, labelled by day in fountain pen. Two bags of saline. A box of the dressings for her wrists, half used, and a note on it: “Order more. She goes through them.”']])}})();
const _xeSA=extraEnding;extraEnding=function(){const L=_xeSA();if(kdSA())return L;
 return L.filter(x=>!/did the sum|second page of the doctor|said yes|window closed|false name|“dentist”|remembers a ceiling|turned up first/.test(x))};

/* ---------- injuries only: the medical horror of what was done to her body ---------- */
const kdInj=(id,d,when,run)=>{kdEv2(id,d,()=>!kdSA()&&(!when||when()),run);const e=EVENTS[EVENTS.length-1];e.inj=1};
kdInj('kd_inj_hand',1,null,done=>{const m=kdMe();say([
 ['','The doctor puts the hand films up on the lightbox. The first is from the night she came in. The two bones behind her ring finger and her little finger had broken on the first day and started knitting by the third, crooked, at an angle you could see across the room.'],
 [kdDoc,'Bone starts to set in about three days whether you want it to or not. So before I could pin it I had to break it again, in two places.'],
 ['hitmeuppp',MV('cool.','cool. didn’t feel it.','Did you? I didn’t feel it.','You broke my hand? Again? While I was there? I didn’t feel a thing. You’re good. That’s a compliment.')],
 ['',m?'She did feel it. She was awake for it, and she counted the hounds out loud, and she has filed that hour with the others.':'She was awake for it. He held the lamp. She counted his hounds out loud the whole time, grey, old, black, pale, and asked afterwards if it was done yet.']],()=>ask(m?'hitmeuppp':'K9',m?'(The second film. Two pins, straight.)':'(She is admiring the pins.)',m?[
  KD_NO('Say that you felt it.'),
  {t:'“can i have the x-ray. for the fridge.”',fn:()=>{kdDeny();S.f.kdInjFilm=1;save();say([['','The doctor gives her a copy. She puts it on V’s fridge under a magnet shaped like a bone, which nobody admits to having bought.']],done)}},
  {t:'Ask how long until it works.',fn:()=>{calm(-2);say([[kdDoc,'Six weeks in the cast. After that it depends on how much work you put in. Some people get all of it back.'],['hitmeuppp',MV('i will.','i will. obviously.','I will. Obviously.','I will. I’ll get all of it back, plus interest. Watch me.')]],done)}}]:[
  {t:'“You were awake. I was there.”',fn:()=>{kdDeny();apply({aff:2});say([['hitmeuppp',MV('was not.','nope. slept through it.','No. I slept through it.','I slept through the whole thing. You must be thinking of a different hand.')],['','He lets her have it.']],done)}},
  {t:'Pin the film to the fridge.',fn:()=>{apply({aff:3});S.f.kdInjFilm=1;save();say([['','He puts it on the fridge. She stands in front of it eating cereal out of the box and tells it that it looks great.']],done)}}]))});
kdInj('kd_inj_foot',2,null,done=>{const m=kdMe();say([
 ['','The foot she walked two kilometres on was broken before she started. The walk moved it. It is in a boot now, a big grey plastic one with three straps, and she is meant to wear it at all times.'],
 ['',m?'She takes it off to walk the hounds. She takes it off for the stairs, because the boot is loud on the stairs, and loud is how people find you.':'She takes it off. He finds it on the stairs, in the yard and once in the bath, and he puts it back by the bed each time.']],()=>ask(m?'hitmeuppp':'K9',m?'(The boot is by the bed.)':'(The boot is on the stairs again.)',m?[
  {t:'Wear the boot. It’s loud. Wear it anyway.',fn:()=>{const k=KD();if(k.rx)k.rx.heal++;calm(-2);save();say([['','She wears it. Every step on the stairs goes off like a door. She stops halfway down the first time and waits to see who comes.'],['','Nobody comes. The black hound looks up from the bottom step and goes back to sleep.']],done)}},
  {t:'Leave it off. You can walk fine.',fn:()=>{kdDeny();const k=KD();k.shake=Math.min(3,(k.shake||0)+1);apply({energy:-8});save();say([['hitmeuppp',MV('see. fine.','see. walking. fine.','Look at that. Walking. Fine.','Look. Walking. Two whole legs. The boot’s for people who can’t walk, and I can, so.')],['','By the evening the foot is the size of a grapefruit. She keeps it under the blanket and says she is cold.']],done)}}]:[
  {t:'Put it back by the bed. Say nothing.',fn:()=>{kdDeny();say([['','He puts it back. In the morning it is on the stairs again. They do this for nine days, and neither of them ever mentions it.']],done)}},
  {t:'Wear it yourself around the house for an hour.',fn:()=>{apply({aff:4});const k=KD();if(k.rx)k.rx.heal++;save();say([['','He wears it on his left foot, over the shoe, with the coat, for an hour, and goes up and down the stairs eleven times.'],['hitmeuppp',MV('...fine.','omg. fine. FINE. give it.','All right. Fine. Give it here.','Oh my God. Fine. You look insane. Give it to me before Ronin sees you and I have to live with it.')]],done)}}]))});
kdInj('kd_inj_fever',3,null,done=>{const m=kdMe();const k=KD();say([
 ['','The wrists were cut to the tendon by cable ties and were dirty for days. On the third night the left one goes hot. There is a thin red line running up the inside of the arm toward the elbow, under the cast, where she cannot see it.'],
 ['',m?'She feels it climbing. She knows what a red line means. She has watched one climb up a man she was paid not to help.':'He sees it when she reaches for the salt: the line has come out from under the cast, and she has pulled her sleeve down over it.']],()=>ask(m?'hitmeuppp':'K9',m?'(Thirty-nine point two. You checked with his thermometer.)':'(She has pulled her sleeve down.)',m?[
  {t:'Tell him. Now.',fn:()=>{if(k.rx)k.rx.heal++;calm(2);apply({aff:2});save();say([['','He has the doctor on the phone before she finishes the sentence. By midnight there is a drip back in her hand and something cold going into it.'],['hitmeuppp',MV('ugh.','ugh. back on the drip.','Back on the drip. Brilliant.','Back on the drip. My arm’s going to look like a pincushion. Thanks, though. Don’t say anything.')]],done)}},
  {t:'Hide it. It’ll go down by itself.',fn:()=>{kdDeny(2);k.shake=Math.min(3,(k.shake||0)+1);apply({energy:-20});save();say([['','It doesn’t go down. At four in the morning she wakes up talking, and V is already in the doorway, because he heard her teeth.'],['','The doctor comes at five. She says another twelve hours and they would have been talking about the arm and not the wrist. Misaki says “what arm.”']],done)}}]:[
  {t:'Ring the doctor. Don’t ask her first.',fn:()=>{if(k.rx)k.rx.heal++;apply({tension:3});save();say([['hitmeuppp',MV('i’m FINE.','i’m fine. it’s nothing. it’s a scratch.','It’s nothing. It’s a scratch.','It’s a scratch! It’s a red scratch! You’ve all seen a scratch before!')],['','The doctor comes. It is not a scratch. Misaki watches the drip go back in with the expression of someone being served a parking fine.']],done)}},
  {t:'Ask to see the arm.',fn:()=>{apply({aff:2});if(k.rx)k.rx.heal++;save();say([['','She looks at him for a long time and then rolls the sleeve up herself, all the way, and lets him see the line. That is the most she has let him see of anything since the river.']],done)}}]))});
kdInj('kd_inj_ribs',3,()=>frT('r')>=1,done=>{const m=kdMe();say([
 [RN,'—and the priest goes, “son, that ain’t holy water,” and I go, “it is now, Father.”'],
 ['','She laughs. It catches on the third broken rib, and for a second she can’t breathe in or out, and she folds over the table with her good hand flat on the wood.'],
 [RN,'...Shit. You good?'],
 ['hitmeuppp',MV('fine. ur not funny.','fine. you’re just not that funny.','I’m fine. You’re just not as funny as you think.','I’m fine! I’m fine. Your joke was bad and my body rejected it. That’s all that was.')],
 ['',m?'From then on she laughs with her mouth shut, through her nose, holding her side, and Ronin tells his worst jokes on purpose to watch her try.':'From then on Ronin tells jokes that are not funny on purpose. She laughs at them through her nose, holding her side. V notices that Ronin’s stories have got worse, and that he has never seen him so careful.']],()=>{kdDeny();fr('r',3);done()})});
kdInj('kd_inj_nerve',4,null,done=>{const m=kdMe();say([
 ['','The doctor tests the hand with a pin. Thumb: yes. First finger: yes. Middle finger: yes. Ring finger. Little finger.'],
 [kdDoc,'Tell me when you feel it.'],
 ['hitmeuppp',MV('now.','now. ...now.','Now. Yes. Now.','Now. Yeah. Definitely now. Very sharp. Ow.')],
 ['','The doctor has not touched the ring finger yet. She has been holding the pin in the air, a centimetre away.'],
 [kdDoc,'The nerve was crushed. It may come back over months. It may not.'],
 ['hitmeuppp',MV('it’s asleep.','it’s just asleep.','It’s just asleep.','It’s asleep. It’s been asleep since the van. It’ll wake up. Things wake up.')]],()=>ask(m?'hitmeuppp':'K9',m?'(“Since the van.” You said that out loud.)':'(She said “since the van.”)',m?[
  KD_NO('Say that you can’t feel those two fingers.'),
  {t:'Ask to try again.',fn:()=>{kdDeny();calm(-3);say([['','They try again with her eyes shut. She guesses. She guesses right three times out of ten, which the doctor writes down, and which Misaki says is better than half.']],done)}},
  {t:'“lol whatever. i pick with the right.”',fn:()=>{kdDeny();S.f.kdHandBad=1;save();say([['','She does pick with the right. She also used to change magazines with the left, without looking, in under a second. She has not tried since.']],done)}}]:[
  {t:'Write it in the file.',fn:()=>{kdDeny();save();say([['','He writes it down: ring and little finger, no sensation, date. He writes it in the file for the man with the radio, not in hers.']],done)}},
  {t:'Hold the hand.',fn:()=>{apply({aff:3});say([['','He holds the hand. She can feel his thumb on the back of it and not his fingers on the side, and she doesn’t tell him which part she can feel.']],done)}}]))});
kdInj('kd_inj_shoulder',5,null,done=>{const m=kdMe();say([
 ['','She reaches up for a mug on the top shelf, and the right shoulder, the one they put back on the first night, comes out again with a noise like a drawer shutting.'],
 ['',m?'She doesn’t scream. She sits down on the kitchen floor very slowly and says, conversationally, “V.”':'He hears her say his name once, in her ordinary voice, from the kitchen. He knows the voice. It is the one she used on the loading-bay floor.']],()=>ask(m?'hitmeuppp':'K9',m?'(The arm is the wrong shape.)':'(She is on the floor. The arm is the wrong shape.)',m?[
  {t:'Let him put it back.',fn:()=>{calm(2);apply({aff:3});say([['','He kneels in front of her, foot against her side, and asks her to count. On three he pulls. On two, actually, so she wouldn’t brace. It goes in.'],['hitmeuppp',MV('...cheater.','u went on two. cheater.','You went on two. Cheater.','You went on two, you absolute fraud. I’ll remember that. Thank you.')]],done)}},
  {t:'Do it yourself, against the doorframe.',fn:()=>{kdDeny();calm(-3);apply({edge:2});say([['','She stands up, sets the arm against the doorframe, and walks into it. It goes in on the second try. She makes no sound either time.'],['','When V gets there she is drinking water out of the mug she wanted. She says she dropped something.']],done)}}]:[
  {t:'Kneel, and do it on two.',fn:()=>{apply({aff:3});calm(2);say([['','He tells her he will pull on three. He pulls on two. It goes in.'],['hitmeuppp',MV('cheater.','cheater. u went on two.','You went on two.','You went on two! You lying bastard. Thank you.')]],done)}},
  {t:'Call the doctor first.',fn:()=>{apply({tension:2});say([['hitmeuppp',MV('just DO it.','just do it. i know u know how.','Just do it. I know you know how.','Just do it. You’ve put back worse on worse people. Don’t make me sit here while a phone rings.')],['','He does it. Then he calls the doctor anyway.']],done)}}]))});
kdInj('kd_inj_back',3,()=>S.f.kdChart||S.f.kdChartV,done=>{const m=kdMe();say([
 ['','The photographs of her back are in the chart, eleven of them, with a ruler along the edge of each. They show what a doubled cable does, when it is used on somebody who is not allowed to fall over.'],
 ['hitmeuppp',MV('van.','that’s from the van.','That’s from the van. Lots of corners in a van.','That’s from the van! Vans have corners, I’ve been in a van, I know about vans.')],
 ['',m?'She has been in a van. Van corners do not come in parallel lines, a hand’s width apart, eleven times.':'He has used a doubled cable himself, on men who earned it. He knows the spacing. He says nothing about vans.']],()=>ask(m?'hitmeuppp':'K9',m?'(Eleven.)':'(She is waiting for him to agree about the van.)',m?[
  KD_NO('Count them.'),
  {t:'Shut the chart.',fn:()=>{kdDeny();save();say([['','She shuts it. She has counted them anyway. She counted them the first time she looked, without meaning to, the way she counts guards.']],done)}},
  {t:'Get dressed facing the wall from now on.',fn:()=>{kdDeny();calm(-2);save();say([['','From now on she gets dressed facing the wall, and calls it a habit, and tells anybody who asks that she has always done it that way.']],done)}}]:[
  {t:'“The van.”',fn:()=>{kdDeny();apply({heart:-1,aff:2});say([['','“The van,” he says. She nods, and goes to find a hound to stand next to.']],done)}},
  {t:'Add the man with the radio’s name to a page of its own.',fn:()=>{apply({veng:8});say([['','There was a cable in the radio man’s car. V knows because he has already been to look at the car.']],done)}}]))});
txDef('tx_kd_physio',{with:'v',pov:'m',prio:2,when:()=>!kdSA()&&kdPost()&&tier()>=1&&kdD()>=3,nodes:{
 start:{in:()=>['The doctor has left a sheet of exercises for the hand. Ten of each, three times a day.','You have done none of them. I have been counting.'],expire:3,
  opts:()=>[{t:'“they’re boring”',fx:()=>kdDeny(),reply:()=>['Yes. So is a hand that does not close.','I will do them with you, if that helps. I have two hands that work. I will hold one of them still.']},
   {t:'“ok. tonight. u count”',fx:()=>{apply({aff:2});S.f.kdGripN=(S.f.kdGripN||0)+1;const k=KD();if(k.rx)k.rx.heal++},reply:()=>['I will count. I am very good at counting.','Bring the foam ball. Not the hound. The hound will eat the foam ball.']}]}}});
const _xeINJ=extraEnding;extraEnding=function(){const L=_xeINJ();if(kdSA()||!S||!S.f||!S.kd||!S.kd.t0)return L;
 L.push(S.f.kdHandBad?'Two fingers of her left hand never woke up. She changes magazines with the right now, and tells people the left was always slow.':'The hand came back, mostly. She can make a fist. She does not show anyone that she has to think about it.');
 return L};
(function(){const i=KD_ORDER.indexOf('kd_card');KD_ORDER.splice(i+1,0,'kd_inj_hand','kd_inj_foot','kd_inj_back','kd_inj_fever','kd_inj_ribs','kd_inj_nerve','kd_inj_shoulder')})();

/* ---------- the setting itself ---------- */
const KD_SA_HELP='Kidnapping aftermath — <b>full story</b> includes a strand about what may have been done to Misaki during the hours she cannot remember: a doctor’s examination she refuses, photographs she denies, and what that implies. It is never shown or named. <b>Injuries only</b> removes that strand entirely; the aftermath is about her injuries and her treatment.';
const kdSALab=()=>'Kidnapping aftermath: '+(kdSA()?'full story':'injuries only');
const kdSAToggle=()=>{META.kdFull=kdSA()?0:1;saveMeta();toast(kdSALab())};
const _setSA=settings;settings=function(){_setSA.apply(this,arguments);const box=document.querySelector('.panel');if(!box)return;const p=document.createElement('p');p.innerHTML=kdSALab().replace(': ',': <b>')+'</b>';p.style.marginTop='6px';
 const h=document.createElement('p');h.className='hint';h.innerHTML=KD_SA_HELP;const first=box.querySelector('.opts');box.insertBefore(p,first);box.insertBefore(h,first);
 const opts=box.querySelector('.opts');if(opts){const o=document.createElement('div');o.className='opt';o.textContent='Kidnapping aftermath: switch to '+(kdSA()?'injuries only':'full story');o.onclick=()=>{kdSAToggle();settings()};opts.insertBefore(o,opts.lastElementChild)}};
const _pmSA=pauseMenu;pauseMenu=function(){_pmSA.apply(this,arguments);const box=document.querySelector('.pausebox .pbtns');if(!box)return;const b=document.createElement('button');b.textContent=kdSALab();b.title='Full story includes the strand about the hours she cannot remember. Injuries only removes it.';
 b.onclick=e=>{e.stopPropagation();kdSAToggle();b.textContent=kdSALab()};box.insertBefore(b,box.lastElementChild)};
