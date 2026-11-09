/* ===================== MORE MESSAGES: the killers' group chat, and Misaki's luck ===================== */
/* Misaki never expected to last. Five years, tops, she figured, when she started. Then a sniping forum, a reply from a
   stranger called Angelic about wind drift, an invite link, a server full of people exactly as bad as her. Lucky. */
PINGS.push(
 ['ro','PSA: the hardware store on 4th is out of tarps again. someone in this server is buying ALL the tarps. i have my suspicions. i have one suspicion. it’s me. i forgot it was me.'],
 ['an','does anyone know how to get blood out of suede asking for a friend (the friend is suede)'],
 ['k9','Reminder that the foundation’s bake sale is Saturday. Please do not bring anything “from work.”'],
 ['mi','found a guy’s whole diary in his car. he rated his own haircuts. 6/10 every time. mood'],
 ['ro','what’s the etiquette if your target is also at the bowling alley. do i wait till after his frame'],
 ['an','maria got a DM from a brand that sells “luxury tarps” i think the algorithm knows'],
 ['k9','Whoever left a crowbar in the shelter’s donation bin: it has been adopted. A man named Kenji uses it for his garden now. He is very happy.'],
 ['mi','ranking the worst places to wait for a target: 1. bus shelters 2. other bus shelters 3. any bus shelter in february'],
 ['ro','got a fortune cookie that said “you will soon be in the news.” rude. accurate. rude.'],
 ['an','my therapist asked what i do to unwind. i said “target practice.” she said that’s great!! ✨'],
 ['mi','u ever stand in a guy’s kitchen at 3am and think. this man owns NINE spatulas. for who.'],
 ['k9','Biscuit has learned to open the fridge. I am considering whether to tell the board or to promote her.']);
/* --- threads --- */
txDef('tx_lucky',{with:'a',pov:'m',prio:3,when:()=>frT('a')>=1&&S.day>=4&&S.phase!=='taken',nodes:{
 start:{in:()=>['guess what day it is','it’s our forum-versary!!!','two years ago u replied to my post about crosswind on long shots and said “ur math is wrong and ur also wrong as a person” 💕'],expire:3,
  opts:()=>[{t:'“ur math WAS wrong.”',reply:()=>['it was 100% wrong. u saved some guy’s life that week by telling me. i went and shot him later anyway. correctly.'],next:'why'},
   {t:'“why did u invite me to the server”',reply:()=>['honestly? u were the only person on that whole forum who never once asked to see my face.'],next:'why'},
   {t:'“i’m glad u did.”',fx:()=>fr('a',4),reply:()=>['😭 stop. i’m in a meeting. maria is in a meeting. maria is crying in a meeting.']}]},
 why:{in:()=>['were u surprised? when i sent the invite?'],opts:()=>[
   {t:'“i thought it was a sting.”',fx:()=>fr('a',3),reply:()=>['LMAO. i would make the WORST cop. i’d bring the suspect cookies.']},
   {t:'“i figured i’d be dead before i ever met any of u.”',fx:()=>{fr('a',5);S.f.luckyTold=1},reply:()=>['...','misaki.','well u weren’t. so now u have to come to brunch. those are the rules. that’s the trade.']}]}}});
txDef('tx_vlucky',{with:'m',pov:'v',prio:3,when:()=>tier()>=2&&S.slot>=2&&!S.dark&&S.phase!=='taken',nodes:{
 start:{in:()=>['do u ever think about how unlikely this all is','like. statistically.'],expire:2,
  opts:()=>[{t:'“Often. Tell me yours.”',reply:()=>['i started at sixteen. i gave myself five years. tops. that’s the average, if u do it badly. i was doing it badly.','then a stranger on a sniping forum corrects my wind math, and invites me to a group chat, and the group chat is u.'],next:'odds'},
   {t:'“You are going to say something sad. I can feel it.”',reply:()=>['lol. no. ok yes. a little.'],next:'odds'},
   {t:'“Go to sleep, Misaki.”',fx:()=>relApply({tension:2}),reply:()=>['ok grandpa. night.']}]},
 odds:{in:()=>['i really didn’t expect to be lucky. that’s the whole thought. i don’t know what to do with it.'],opts:()=>[
   {t:'“You do not have to do anything with it. Just stay.”',fx:()=>{apply({aff:4});S.f.vLucky='stay'},reply:()=>['staying. obviously. i’m past the five years. everything now is bonus levels.']},
   {t:'“It was not luck. You were good enough to survive until we found you.”',fx:()=>{apply({aff:3});relApply({trust:3});S.f.vLucky='earned'},reply:()=>['...that’s a very v way of saying it.','i’ll take it. i’m putting it on a sticky note.']},
   {t:'“I expected to die young as well. Then the dogs needed walking.”',fx:()=>{apply({aff:5});S.f.vLucky='both'},reply:()=>['the DOGS kept u alive???','...ok. me too, kind of. biscuit sat on me the first night i stayed over. i didn’t die that night either.']}]}}});
txDef('tx_rhow',{with:'r',pov:'m',prio:2,when:()=>frT('r')>=1&&S.day>=5,nodes:{
 start:{in:()=>['random q little killer','how’d u even end up w us. u never said. angel just showed up one day with “i found a gremlin on a forum”'],expire:3,
  opts:()=>[{t:'“angel corrected my wind math. i corrected her back. then i got a link.”',reply:()=>['ha. course she did. she recruits like a cat brings home birds.'],next:'more'},
   {t:'“luck. pure stupid luck.”',reply:()=>['ain’t no such thing in our line, darlin’. there’s luck and there’s bein’ worth keepin’. you were worth keepin’.'],next:'more'}]},
 more:{in:()=>['what’d you think we’d be like'],opts:()=>[
   {t:'“scarier.”',fx:()=>fr('r',3),reply:()=>['we’re plenty scary. we just also do brunch.']},
   {t:'“i didn’t think i’d live long enough to find out.”',fx:()=>{fr('r',5);S.f.luckyTold=1},reply:()=>['...yeah. me neither, when i started. figured i’d go out in a parkin’ garage by thirty.','still might. but now there’s folks who’d come lookin’. that changes the math.']}]}}});
txDef('tx_tarps',{with:'r',prio:1,when:()=>frT('r')>=1,nodes:{
 start:{in:()=>['hypothetically','how many tarps is too many tarps'],expire:2,
  opts:()=>[{t:phMe()==='v'?'“There is no such number. Bulk discounts exist.”':'“there’s no such thing as too many tarps.”',fx:()=>fr('r',2),reply:()=>['THANK you. the cashier gave me a LOOK.']},
   {t:phMe()==='v'?'“Why are you asking me.”':'“why are u asking me”',reply:()=>['you seem like a tarp person. that’s a compliment.'],next:'why'},
   {t:phMe()==='v'?'“Please buy them in different stores.”':'“pls buy them at different stores. like a normal criminal.”',fx:()=>{fr('r',3);if(isM())apply({heat:-2})},reply:()=>['...see THIS is why we keep you around.']}]},
 why:{in:()=>[],opts:()=>[{t:'“…how many did you buy.”',reply:()=>['forty.','for a shed. it’s a big shed.','it’s not a shed.']}]}}});
txDef('tx_vgroc',{with:'v',pov:'m',prio:1,when:()=>tier()>=1&&!S.dark,nodes:{
 start:{in:()=>['I am at the supermarket. Do you need anything?','My list so far: lemons, rice, dog food (large), bleach (large), a single lime.'],expire:2,
  opts:()=>[{t:'“why ONE lime”',reply:()=>['It is for the drink. The bleach is for the drink as well.','...','That came out wrong. The bleach is for the floor. The lime is for the drink.']},
   {t:'“egg sandwich pls”',fx:()=>apply({aff:2}),reply:()=>['Noted. They have two left. I am taking both. A woman is looking at me.']},
   {t:'“don’t buy the bleach and the tarps at the same place”',fx:()=>{relApply({trust:2});apply({heat:-2})},reply:()=>['...I was about to. Thank you. You are better at this than me.']}]}}});
txDef('tx_aalibi',{with:'a',prio:2,when:()=>frT('a')>=1&&S.phase!=='taken',nodes:{
 start:{in:()=>['need u in the background of maria’s live at 9','just like. walk past. laugh at something. it’s for. reasons.','(timestamp reasons)'],expire:1,
  opts:()=>[{t:'“on it. what am i laughing at”',fx:()=>{fr('a',3);apply({heat:-4})},reply:()=>['anything!! think about ronin falling off a roof. works every time.']},
   {t:'“whose alibi is it”',reply:()=>['a lady never tells.','(it’s mine. it’s the heartsick angel’s. she was very busy at 9:15. she was ALSO in my live. isn’t that crazy)'],next:'yes'}]},
 yes:{in:()=>['so ur coming??'],opts:()=>[{t:'“yeah. obviously.”',fx:()=>{fr('a',4);apply({heat:-4})},reply:()=>['ILY. wear something that reads as “bystander”']},{t:'“can’t tonight.”',fx:()=>fr('a',-2),reply:()=>['ok!! i’ll get ronin. he’s so bad at laughing on cue. he laughs like a man being stabbed.']}]}}});
txDef('tx_mcontact',{with:'m',pov:'v',prio:2,when:()=>tier()>=2&&S.phase!=='taken',nodes:{
 start:{in:()=>['weird question','can i put u as my emergency contact','like on forms. hospital stuff. in case i get shot somewhere inconvenient'],expire:3,
  opts:()=>[{t:'“Yes. Obviously yes.”',fx:()=>{apply({aff:3});S.f.vEmergency=1},reply:()=>['ok cool. i put u as “brother”. i also put “tall”. they asked for distinguishing features.']},
   {t:'“Only if I can put you as mine.”',fx:()=>{apply({aff:5});S.f.vEmergency=2},reply:()=>['...deal.','i’m putting “person to call.” just that. it felt like the right size.']},
   {t:'“What does inconvenient mean.”',reply:()=>['like somewhere they ask questions. a regular hospital. not ronin’s kitchen.','don’t say “never get shot.” i know ur typing it. no promises. bonus levels.'],next:'yes'}]},
 yes:{in:()=>['so yes?'],opts:()=>[{t:'“Yes.”',fx:()=>{apply({aff:3});S.f.vEmergency=1},reply:()=>['k. ur official. ur on paperwork. no backsies.']}]}}});
txDef('tx_rangel',{with:'r',prio:1,when:()=>frT('r')>=1&&frT('a')>=1&&S.f.mariaKnown,nodes:{
 start:{in:()=>['princess is doin her heartsick face again','the one where she stares at the wall and says “i’m FINE” like a threat','bring snacks. the bad ones.'],expire:2,onExpire:()=>fr('a',-1),
  opts:()=>[{t:phMe()==='v'?'“On my way. Which bad ones.”':'“omw. which bad ones”',fx:()=>{fr('a',3);fr('r',2)},reply:()=>['the cheese puffs that turn your fingers orange. she likes to leave prints on maria’s mirror.']},
   {t:phMe()==='v'?'“What happened?”':'“what happened”',reply:()=>['comments section. somebody said maria looks “tired.” she’s been murderin’ people for six years and THAT’S what gets her.'],next:'go'}]},
 go:{in:()=>['you comin?'],opts:()=>[{t:'“coming.”',fx:()=>{fr('a',4)},reply:()=>['good. i’m out of jokes. i told her the one about the priest. she threw a shoe.']},{t:'“can’t.”',fx:()=>fr('a',-1),reply:()=>['damn. ok. i’ll do the priest one again.']}]}}});
/* --- small one-off texts that land on their own, dark or daft --- */
const DRIFT={a:['sent u a pic of a pigeon. his name is detective. he’s watching me.','if i ever go missing check the sephora first','maria just got sent a free blender. the heartsick angel has ideas for the blender','lipstick shade name: “crime scene.” i bought four.'],
 r:['(photo of a raccoon in a dumpster) him.','found a guy’s mixtape in his glovebox. it slaps. it really slaps. i feel bad now. not that bad.','apple crumble status: cooling. come get some or i eat it all and cry.','my landlord asked why my bin smells like bleach. i said “cleanliness, sir.” he respected it.'],
 v:['Biscuit stole a glove from a crime scene. Not mine. A police officer’s. I have returned it with a note.','The board has asked me to “smile more in photographs.” I have prepared a smile. It frightened the intern.','I found one of your star clips in the car. It is on my keyring now. You may have it back. You may not.','Did you eat.'],
 m:['did u eat. (i didn’t. i’m asking so u feel guilty instead of me)','saw a guy jaywalk and thought “i could”. didn’t. growth.','pls tell biscuit i said she’s the best dog. not to u. to her. u can listen.','i’m at the konbini. they have the good egg sandwich. it’s a sign. of what i don’t know.']};
EVENTS.push({id:'drift_txt',when:()=>!S.dark&&S.phase!=='taken'&&!isLone(),run:done=>{S.seen.drift_txt=0;const ks=phContacts().filter(k=>k==='v'||k==='m'||frT(k)>=1);if(ks.length){const k=pk(ks);phQueue(k,[pk(DRIFT[k])],0);phDeliver()}done()}});
/* --- the luck, in her own head --- */
EVENTS.push({id:'lucky_morning',when:()=>isM()&&S.pov!=='v'&&S.day>=6&&!S.dark&&S.phase!=='taken'&&!S.seen.lucky_morning,run:done=>{say([
 ['','You wake up. That’s the first thing. You always notice it, a little: oh. again.'],
 ['hitmeuppp',MV('(five years. that was the plan. average lifespan for someone doing this badly. i was doing it SO badly.)','(i gave myself five years. tops. i’m past it. every morning since is a bonus level.)','(When I started, I gave myself five years. I’m past that now. I don’t know what to do with the extra.)','(Five years, I figured. Then a stranger on a forum fixed my wind math and sent me a link, and everyone on the other end of it decided to keep me. I really didn’t expect to be lucky.)')]],done)}});
/* --- a talk topic with V --- */
TDTOP_V.push({id:'lucky',label:()=>'“i really didn’t expect to be lucky.”',show:()=>tier()>=1&&!S.dark&&!(S.talks&&S.talks.lucky),run:b=>{warm('v','lucky',5);S.talks=S.talks||{};S.talks.lucky=1;
 say([['hitmeuppp','i really didn’t expect to be lucky.'],['K9','In what sense?'],['hitmeuppp','angel found me on a sniping forum. a SNIPING FORUM, v. like a hobby board. for murder. and she was nice to me.'],['hitmeuppp','then the server. then ronin calling me darlin’ like we’d known each other ten years. then u. asking if i ate. every day.'],
  ['hitmeuppp',MV('i thought i’d be dead by now. that was the plan. a short plan.','i figured five years, tops. that’s how long people like me last. i was ready for it.','I gave myself five years when I started. I was at peace with it. Then all of you happened and now I’m not at peace with it at all.','I had a five-year plan, and the plan was to die at the end of it. You ruined it. All of you. I’ve never been so grateful to have something ruined.')],
  ['K9','...Then it is a good thing you were wrong about the plan.'],['K9','For the record, I do not think it was luck. I think you were very hard to kill, and then you found people who would make it harder.']],b)}});
if(!TOPICS_V.find(x=>x.id==='lucky'))TOPICS_V.splice(TOPICS_V.length-1,0,TDTOP_V[TDTOP_V.length-1]);
/* the server log gets a few more lines too */
const _chatLK=chatLog;chatLog=function(){const L=_chatLK();if(!S||S.phase==='taken')return L;const k=(S.day*7+S.slot)%6;
 if(k===0)L.push(['an','reminder that we met on a SNIPING FORUM and now we do brunch. growth. character development. arcs.']);
 if(k===2)L.push(['ro','day 4 of the tarp situation. we are not discussing the tarp situation.']);
 if(k===4)L.push(['mi','someone ask me if i ate so i can say no and feel cared for']);
 return L};
