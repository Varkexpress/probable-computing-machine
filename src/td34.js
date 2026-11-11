/* ===================== THE ONE WHO KNOWS, AND ORDINARY DAYS (td34) =====================
   1. A hidden route. On the last day the examination would still show, with the house empty, Misaki can answer the
      doctor's question. Only if she has, before then: kept the room (kdKeep 1), read the notebook herself, looked at
      the photographs and not torn them up, taken the "precaution" tablets without asking, and found the box in the
      fridge. She breaks; she allows the examination and the questions; her condition is that nobody ever learns she
      admitted it, V included. Nobody does. To everyone else she goes on exactly as before. Still never named.
      Angel and Ronin are never told anything. What they have, they worked out.
   2. Ordinary days: scenes, texts and a night market that have nothing to do with the kidnapping. */
const kdCanTell=()=>S.f.kdKeep===1&&S.f.kdBook==='read'&&S.f.kdPhotos==='seen'&&S.f.kdCupTook===1&&!!S.f.kdKit;
const _denyKD=kdDeny;kdDeny=function(n){if(S&&S.f&&S.f.kdTold){S.f.kdHalf=(S.f.kdHalf||0)+(n||1);if(S.f.kdHalf%3)return}return _denyKD(n)};
kdEv('kd_last',()=>kdMe()&&S.f.kd_window&&!S.f.kd_last&&!S.f.kd_kitgone&&kdD()>=3,done=>{S.f.kd_last=1;save();const can=kdCanTell();
 say([['','Saturday. V has taken all four dogs to the river, because she told him they were getting fat. The house is empty apart from the doctor, who has come to ask for the last time.'],
  [kdDoc,'After today it would not show, and I stop asking. So: once more.']],()=>ask('hitmeuppp','(Nobody else is in the house.)',[
  can?{t:'Answer the question.',sub:'the house is empty',fn:()=>{S.f.kdTold=1;const k=KD();k.deny=Math.floor((k.deny||0)/2);calm(12);save();note('kd_told','One person knows. It is in a file with a number on it and no name, and it is not in his house.');say([
    ['','She opens her mouth to say that nothing happened. She has said it nine times, and it has come out every time.'],
    ['','It does not come out. Her face does a thing she has not let it do since she was sixteen on a station bench. Then she is bent over the side of the bed with her good hand across her eyes, making a noise she did not know she had.'],
    [kdDoc,'I am here. Take as long as it takes. I have nowhere to be.'],
    ['hitmeuppp','i know what they did. i’ve known since the car. i can do a fucking sum, i’m not stupid, i know EXACTLY what—'],
    ['hitmeuppp','he doesn’t find out. V. nobody does. not the chart he reads, not his archive, not angel. if he ever knows i said it— it’s the one thing left that’s only mine. promise me or get out.'],
    [kdDoc,'He pays my fee. You are my patient. Those are two different things, and I have never confused them. There will be a second file with a number on it and no name. It will not be kept in this house.'],
    ['hitmeuppp','...ok. then yes. the answer’s yes. do it. all of it. then ask me the rest.'],
    ['','It takes fifty minutes. She counts the dogs through it, out loud this time. Afterwards she answers eleven questions, and the doctor writes down what she says without putting it in quotation marks.'],
    ['','The white box leaves the house in the doctor’s bag, under two tubs of soup.'],
    ['','When V comes back with the dogs, she has washed her face and is on the couch with the controller. She asks what’s for dinner. He sees that her eyes are red. She says it is the dog hair, and he has no reason to think otherwise.']],done)}}:KD_NO('Answer the question.'),
  {t:'“nothing happened.” One more time.',fn:()=>{kdDeny();say([['','It comes out, the tenth time, as easily as the first. The doctor writes it down in quotation marks and closes the folder.'],[kdDoc,'Then I have finished asking. The form does not expire. I mean that.']],done)}},
  {t:'Look at the kitchen clock until it’s four.',fn:()=>{kdDeny(2);calm(-3);say([['','She watches the minute hand for an hour and ten minutes and does not speak. At four the doctor stands up, and Misaki says “well,” and that is all either of them says.']],done)}}]))});
/* afterwards, on that route only: she keeps the appointments, and still lies about them */
kdEv('kd_told_box',()=>S.f.kdTold&&!S.f.kd_told_box&&S.f.kdKit,done=>{S.f.kd_told_box=1;S.f.kd_kitgone=1;save();say([
 ['','The white box is gone from the infirmary fridge a day before its date. V notices the gap, and decides that the doctor must have wanted the shelf.'],
 ['hitmeuppp',MV('more room for soup.','more room for soup. finally.','Good. More room for soup.','Good. More room for soup. I told her that shelf was wasted.')],
 ['','She says it exactly as she would have said it. That is the hard part, and she is good at it.']],done)});
kdEv('kd_told_dentist',()=>S.f.kdTold&&S.phase!=='after'&&S.f.kdRes&&!S.f.kd_dentist&&kdD()>=10,done=>{S.f.kd_dentist=1;S.f.kdBloodGiven=1;save();say([
 ['','The calendar says “dentist.” She drives herself, goes up the stairs above the pharmacy, and gives her own name at the desk.'],
 ['','The result goes to a post-office box the doctor rents. She reads it standing at the box, once, and burns it in the car ashtray.'],
 ['hitmeuppp','(ok. ...ok.)'],
 ['','At home she tells V: no cavities. He says that he is glad. Both things are true, and he only knows about one of them.']],done)});
kdEv('kd_told_sleep',()=>S.f.kdTold&&S.phase!=='after'&&!S.f.kd_told_sleep&&kdD()>=8,done=>{S.f.kd_told_sleep=1;apply({energy:10});save();say([
 ['','She sleeps six hours and tells people six.'],
 ['','She still says “fine.” She still walks round it like the low beam in the trailer. Once a month she is forty minutes late back from walking the dogs, and smells faintly of a waiting room, and V puts it down to the weather.']],done)});
const _xeKD8=extraEnding;extraEnding=function(){let L=_xeKD8();if(!S||!S.f||!S.f.kdTold)return L;
 L=L.filter(x=>!/most likely to kill her|The window closed on a Saturday|never rang for the result/.test(x));
 L.push('On the last Saturday, with the house empty, she said yes. One person knows. V never found out that she said it, and he was meant not to.');
 return L};

/* ===================== ORDINARY DAYS ===================== */
const G34=()=>!S.dark&&S.phase!=='taken'&&S.phase!=='after'&&S.phase!=='act3';
const gEv=(id,when,run)=>EVENTS.push({id,when:()=>{try{return G34()&&when()}catch(e){return false}},run});
gEv('g_pancake',()=>!isLone(),done=>{const m=mP();say([
 ['',m?'Pancake has eaten your left sock. She is sitting very upright beside the evidence, which is the other sock.':'Pancake has eaten pages nine to fourteen of the quarterly report. She is sitting very upright beside pages one to eight.'],
 [m?'hitmeuppp':'K9',m?MV('PANCAKE.','pancake. that was my good sock.','Pancake. That was the good one. It had a frog on it.','Pancake, you little criminal. That was the frog sock. I respect it, but that was the frog sock.'):'Pages nine to fourteen were the audit. I had not wanted to read them either.']],()=>ask(m?'hitmeuppp':'K9',m?'(She is not sorry.)':'(She is not sorry.)',[
  {t:m?'Give her the other sock. Finish the job.':'Give her pages one to eight.',fn:()=>{apply({aff:1});S.dogs.Pancake=clamp(S.dogs.Pancake+8);say([['',m?'She takes it under the couch. V finds you both there an hour later and asks no questions.':'She takes them under the desk. The board receives a report that begins on page fifteen, and nobody remarks on it.']],done)}},
  {t:m?'Tell V his dog owes you ¥600.':'Take her to the vet.',fn:()=>{if(m)apply({yen:600,aff:1});else apply({funds:-2,heart:1});say([['K9',m?'She is good for it. I will pay on her behalf. She will work it off in the usual way, by existing.':'She has eaten worse. She once ate a chequebook. I am taking her regardless.']],done)}}]))});
gEv('g_review',()=>mP()&&S.day>=3,done=>say([
 ['','A client has left a review on the forum where people like her get hired. Four point four stars.'],
 ['','“Prompt. Tidy. Left the scene cleaner than she found it. Talked the entire time. One star off for the humming.”'],
 ['hitmeuppp',MV('4.4??','FOUR POINT FOUR. for HUMMING.','Four point four. He docked me for humming.','Four point four! I gave that man a clean kitchen and a dead brother-in-law, and he’s docked me for humming.')]],()=>ask('hitmeuppp','(Reply to review?)',[
  {t:'“thank u for ur feedback. i know where u live :)”',fn:()=>{apply({heat:2,edge:2,rep:1});say([['','He edits it to five stars within the minute, and adds: “The humming was lovely.”']],done)}},
  {t:'Take it. Hum quieter.',fn:()=>{apply({rep:1});say([['','She practises humming quieter on the next job. The target hears it anyway. It doesn’t matter for long.']],done)}}])));
gEv('g_board',()=>vP()&&S.day>=3,done=>say([
 ['','A board member proposes that the new shelter wing be named after a major donor. The major donor is himself. He has brought a rendering.'],
 ['K9','(The rendering has his name in brass letters a metre high. He has had the dogs drawn smaller to make room.)']],()=>ask('K9','(He is waiting for applause.)',[
  {t:'Agree, and invoice him for the brass.',fn:()=>{apply({funds:60,rep:2});say([['','The brass comes to forty thousand dollars. He pays it. The letters are installed on the inside of the building, in the room where the bins are kept.']],done)}},
  {t:'Invite him to tour the kennels at feeding time.',fn:()=>{apply({edge:3,heart:-1});say([['','Sergeant stands on his foot for nine minutes without malice. The proposal is withdrawn by email before he reaches his car.']],done)}},
  {t:'Name it after the oldest dog.',fn:()=>{apply({heart:4,rep:1});say([['','It is the Biscuit Wing. Biscuit attends the opening and eats the ribbon.']],done)}}])));
gEv('g_couch',()=>frT('r')>=1&&!isLone(),done=>{const m=mP();say([
 [RN,'Need a hand movin’ somethin’ heavy. Bring gloves. Don’t ask what.'],
 ['',m?'You bring gloves, a tarp and the bone saw. It’s a couch.':'He brings gloves, sheeting and a great deal of bleach. It is a couch.'],
 [RN,'What? It’s a fuckin’ couch. Three flights. What’d you think it was?']],()=>ask(m?'hitmeuppp':'K9',m?'(Orange. Corduroy. Three flights.)':'(It is orange. It is corduroy.)',[
  {t:m?'Carry your end.':'Carry it. Alone, if he keeps talking.',fn:()=>{fr('r',4);apply({energy:-8});say([[RN,m?'Lift with your legs. You got two. Use both.':'Show-off.'],['','It goes up three flights and does not fit through the door. Ronin looks at the door, and then at the crowbar.'],[RN,'Doors are a suggestion.']],done)}},
  {t:m?'“i brought a bone saw. it’d be quicker.”':'“It would go up more easily in four pieces.”',fn:()=>{fr('r',3);say([[RN,'...Go on, then.'],['','It goes up in four pieces and is put back together with skull rings and spite. It is now the best couch he has ever owned.']],done)}}]))});
gEv('g_brand',()=>frT('a')>=1&&!isLone(),done=>{const m=mP();say([
 ['','Maria de la Rosa has a brand deal with a knife company. The brief says “lifestyle, aspirational, no eye contact with the blade.”'],
 [AN,m?'they want me to slice a peach. softly. on camera. i have never done anything softly with a knife in my life. hold the ring light.':'they want me to slice a peach, V. softly. u have a kitchen with marble in it. i’m coming over.']],()=>ask(m?'hitmeuppp':'K9',m?'(She is holding it like she means it.)':'(She is in his kitchen with a santoku and a peach.)',[
  {t:m?'“hold it like u’ve never killed anyone.”':'“Hold it as though it frightens you slightly.”',fn:()=>{fr('a',4);say([['','It takes thirty-one takes. In the one they use, Maria smiles and the peach falls open, and two million people comment on how gentle her hands are.'],[AN,'gentle. GENTLE. i’m putting that on a shirt.']],done)}},
  {t:m?'Do the hands yourself. Her face, your hands.':'Offer to do the cutting. He is quicker.',fn:()=>{fr('a',3);if(m)apply({yen:8000});else apply({heart:1});say([['',m?'Her face, your hands, one continuous take. The knife company asks who the hand model is. Angel says “a professional,” and you get eight thousand yen and a free knife.':'His hands, her face. The peach is in sixteen identical pieces in four seconds. The brand asks for it to be done again, more slowly, and less like that.']],done)}}]))});
gEv('g_cat',()=>vP()&&S.day>=4,done=>say([
 ['','A stray cat has moved into the kennel. It is orange, has one and a half ears, and has taken Sergeant’s bed. Sergeant is standing beside the bed, looking at V.'],
 ['K9','(He outweighs it by forty kilograms. He has asked me to handle it.)']],()=>ask('K9','(The cat is washing a foot.)',[
  {t:'The cat stays. Buy Sergeant a second bed.',fn:()=>{S.f.gCat=1;apply({heart:3});say([['','The cat takes the second bed as well. Sergeant now sleeps on the floor between them, guarding both, and seems content.']],done)}},
  {t:'Ask Misaki to name it.',dis:isLone()||tier()<1,fn:()=>{S.f.gCat=2;apply({aff:3,heart:2});phQueue('m',['his name is Receipt','bc he showed up after u paid for everything','he’s mine now. he lives at urs. that’s how this works'],0);say([['','He sends a photograph. The answer comes in nine seconds.']],done)}}])));
gEv('g_leak',()=>mP()&&!S.f.movedIn&&weather()==='rain',done=>say([
 ['','The trailer roof is leaking over the bed, in the one place a bucket won’t stand level.'],
 ['hitmeuppp',MV('ugh.','of COURSE it’s over the bed.','Of course it’s over the bed.','It’s over the bed. Of course it is. The roof’s got a whole trailer to leak on and it’s picked my pillow.')]],()=>ask('hitmeuppp','(Drip. Drip.)',[
  {t:'Fix it yourself. Tarp, tape, a great deal of swearing.',fn:()=>{apply({energy:-10,edge:1});say([['','It holds. She stands on the roof in the rain afterwards with her arms up, and a neighbour takes a photograph.']],done)}},
  {t:'Text V a picture of the bucket.',dis:isLone()||tier()<1,fn:()=>{apply({aff:3});say([['','He is there in nineteen minutes with a ladder, a roll of roofing felt, and a level. He does the whole roof. He does not say that he owns four buildings she could live in.'],['K9','It was the flashing. It has been the flashing since March.']],done)}}])));
gEv('g_book',()=>!isLone()&&frT('a')>=1&&frT('r')>=1&&S.day>=5,done=>say([
 ['','The group chat is called “book club” now, so Angel has decided that there has to be a book. V chose it. It is Persuasion.'],
 [RN,'Read the first page. Nobody got killed. Read the second page. Still nobody.'],
 [AN,'she waited EIGHT YEARS for him. i’d have shot him in year two and felt fine about it.'],
 ['K9','That is not the reading the text supports.'],
 ['hitmeuppp',MV('i liked the letter bit.','i liked the bit with the letter. shut up.','I liked the part with the letter. Don’t look at me.','I liked the letter. “You pierce my soul.” Shut up, all of you, it’s good.')]],()=>{fr('a',2);fr('r',2);apply({aff:2});done()}));
/* texts */
txDef('tx_g_bet',{with:'r',pov:'m',prio:1,when:()=>G34()&&frT('r')>=1&&S.day>=3,nodes:{
 start:{in:()=>['bet you 2000 yen Vee’s never eaten a corn dog'],expire:3,
  opts:()=>[{t:'“taking that. he’s rich, he’s had everything”',fx:()=>fr('r',2),reply:()=>['asked him','he said “I am aware of them.” that’s a no. pay up'],next:'two'},
   {t:'“not taking it. he looks at them like they’re a crime scene”',fx:()=>fr('r',3),reply:()=>['smart','he said “I am aware of them.” fuckin’ tragic'],next:'two'}]},
 two:{in:()=>['we’re fixin’ it. saturday. the pier. you’re bringin’ him, I’m bringin’ the mustard'],
  opts:()=>[{t:'“he’s vegan”',fx:()=>fr('r',2),reply:()=>['then he can watch me eat four','and hold the mustard. everybody’s got a job']},
   {t:'“i’m in. i’ll film it”',fx:()=>{fr('r',3);apply({aff:1})},reply:()=>['send it t’princess. she’ll put a filter on his face of disgust']}]}}});
txDef('tx_g_knife',{with:'a',pov:'m',prio:1,when:()=>G34()&&frT('a')>=1&&S.day>=4,nodes:{
 start:{in:()=>['the knife people sent me a whole block. twelve. i’ve used one of them and it wasn’t on a peach','do u want the bread knife'],expire:3,
  opts:()=>[{t:'“who wants a BREAD knife”',fx:()=>fr('a',2),reply:()=>['serrated, babe. think about it','takes longer. u get to talk to them']},
   {t:'“yes. and the little one”',fx:()=>{fr('a',3);S.smoke=(S.smoke||0)},reply:()=>['the paring knife’s mine. i’ve named her','u can have the bread knife and the one for tomatoes. the tomato one’s got teeth, it’s adorable']}]}}});
txDef('tx_g_stars',{with:'v',pov:'m',prio:1,when:()=>G34()&&tier()>=1&&S.seen&&S.seen.g_review,nodes:{
 start:{in:()=>['I have read your review. Four point four.','I do not think that the humming should have counted against you.'],expire:3,
  opts:()=>[{t:'“THANK u”',fx:()=>apply({aff:2}),reply:()=>['I have left a review of my own on your profile. Five stars.','“Reliable. Thorough. Hums.”']},
   {t:'“how are u ON that forum”',fx:()=>apply({aff:1}),reply:()=>['I have an account on every forum you have an account on.','I prefer to say so in advance.']}]}}});
txDef('tx_g_receipt',{with:'m',pov:'v',prio:1,when:()=>G34()&&S.f.gCat===2,nodes:{
 start:{in:()=>['how’s receipt','has he eaten','send a pic of him. not the ear side, he’s shy about it'],expire:3,
  opts:()=>[{t:'[Send the photograph. The good ear.]',fx:()=>apply({aff:3}),reply:()=>['HIS LITTLE FACE','he looks like a landlord. i love him','tell sergeant he’s being very brave']},
   {t:'“He has taken my chair.”',fx:()=>apply({aff:2}),reply:()=>['good','it’s his chair now. that’s the law','u can sit on the floor w sergeant. u both lost']}]}}});
/* the night market at the shrine: every third evening */
const _shG=sideHub;sideHub=function(late){const o=_shG(late);if(!S||!G34()||S.slot<2||late)return o;const wait=S.day-(S.f.gMarket||-9)<3;
 return o.concat([{t:'Night market at the shrine',sub:wait?'the stalls are packing up':'costs time · three stalls',dis:wait,fn:()=>{spend();S.f.gMarket=S.day;save();gMarket()}}])};
function gMarket(){const m=mP(),who=m?'hitmeuppp':'K9',pair=!isLone()&&tier()>=1;go({draw:hubBg});
 say([['','Paper lanterns up the shrine steps, and forty stalls. It smells of charcoal and sugar.'+(pair?(m?' V has come. He is carrying your bag without having been asked.':' Misaki has come. She has already bought something on a stick.'):'')]],()=>ask(who,'(Three stalls before they close.)',[
  {t:'The shooting gallery',fn:()=>{if(m){S.inv.plush=(S.inv.plush||0)+1;apply({edge:1});say([['','Cork rifle, bent sights, ten shots. She corrects for the sights after the first and takes the top shelf, left to right.'],['','The stallholder gives her the largest plush and asks her, politely, not to come back.'],pair?['K9','You were holding your breath between shots. On a cork gun.']:['hitmeuppp','(force of habit.)']],hub)}else say([['','V takes ten shots with great care and hits nothing. The sights are bent. A girl of about seven takes the rifle after him and clears the bottom shelf.'],['K9','(I do not use rifles. I am told that is obvious.)'],pair?['hitmeuppp',MV('LMAO.','u lost to a CHILD.','You lost to a seven-year-old.','You lost to a child. In a yukata. With a goldfish in her other hand. I’m telling everyone.')]:null].filter(Boolean),()=>{apply({heart:2});hub()})}},
  {t:'Takoyaki, eaten too hot',fn:()=>{apply({energy:14});say([['',m?'She eats the first one whole and then stands with her mouth open, steaming, refusing to admit anything.':'He waits four minutes for them to cool, as the sign says. He is the only person at the market who has read the sign.'],pair?[m?'K9':'hitmeuppp',m?'There is a sign.':MV('just EAT it.','just eat it. live a little.','Just eat one. Live a little.','Eat it hot. Suffer like the rest of us.')]:null].filter(Boolean),hub)}},
  {t:'The fortune stall',fn:()=>{const f=pk(['“Something you lost will be returned by someone tall.”','“A debt is forgiven this month. Possibly yours.”','“Avoid the east. Or the east should avoid you.”','“You will be fed. Accept it.”']);apply(m?{heart:1}:{heart:2});say([['','An old woman shakes a box until one stick falls out, and reads the number against a drawer.'],['',f],[who,m?MV('ok.','huh. ok.','Huh. All right.','Huh. I’ll allow it.'):'I do not hold with fortunes. I will keep the paper.']],hub)}}]))}
