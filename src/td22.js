/* ===================== MORE MESSAGES: the killers' group chat, and Misaki's luck ===================== */
/* Misaki never expected to last. Five years, tops, she figured, when she started. Then a sniping forum, a reply from a
   stranger called Angelic about wind drift, an invite link, a server full of people exactly as bad as her. Lucky. */
PINGS.push(
 ['ro','hardware store on 4th is outta tarps again. some asshole in this server’s buyin’ all of ’em. it’s me. I’m the asshole. sucks t’be the rest of you'],
 ['an','how do u get blood out of suede. don’t say “don’t wear suede.” he had it coming and so did the boots'],
 ['k9','The foundation’s bake sale is Saturday. Bring nothing “from work.” That meat is spoken for.'],
 ['mi','found a guy’s whole fucking diary in his car. he rated his own haircuts. 6/10 every time. babe that was a 4, rest in peace'],
 ['ro','my guy’s at the bowling alley. d’you let a man finish his frame first or nah. he’s bowlin’ a 90 so I’m thinkin’ nah'],
 ['an','maria got a brand deal offer for “luxury tarps.” the algorithm knows. i kind of like that it knows'],
 ['k9','Ronin. Your crowbar was in the shelter’s donation bin. I have washed it. I will not be washing it a second time.'],
 ['mi','two hrs in a bus shelter in february waiting on a target. my ass is frozen to the bench. he better be worth the client’s money, seriously'],
 ['ro','fortune cookie says “you will soon be in the news.” fuckin’ right I will'],
 ['an','therapist asked how i unwind. i said “i hunt.” she wrote down “outdoorsy”'],
 ['mi','standing in a guy’s kitchen at 3am. this man owns NINE fucking spatulas. for who.'],
 ['k9','Biscuit has learned to open the refrigerator. I have moved the work meat to the lower shelf, where she can reach it.']);
/* --- threads --- */
txDef('tx_lucky',{with:'a',pov:'m',prio:3,when:()=>frT('a')>=1&&S.day>=4&&S.phase!=='taken',nodes:{
 start:{in:()=>['guess what day it is','forum-versary. two years','u replied to my crosswind post with “ur math is wrong and ur also wrong as a person.” i screenshotted it. i keep everything'],expire:3,
  opts:()=>[{t:'“ur math WAS wrong.”',reply:()=>['so wrong. some guy walked away that week because of it. i went back and did him properly. he had it coming twice'],next:'why'},
   {t:'“why did u invite me to the server”',reply:()=>['u were the only one on that whole forum who never asked to see my face. everybody wants the face'],next:'why'},
   {t:'“best link i ever clicked. tell no one.”',fx:()=>fr('a',4),reply:()=>['don’t. maria’s on a brand call and she has to keep smiling. say it again later when i can enjoy it']}]},
 why:{in:()=>['were u surprised? when i sent the invite?'],opts:()=>[
   {t:'“i thought it was a sting.”',fx:()=>fr('a',3),reply:()=>['a sting. babe. the cops in this city couldn’t find me if i tagged my location. and i have']},
   {t:'“i figured i’d be dead before i ever met any of u.”',fx:()=>{fr('a',5);S.f.luckyTold=1},reply:()=>['...','well ur not. and nobody gets to change that unless i say so','brunch sunday. wear the star clips']}]}}});
txDef('tx_vlucky',{with:'m',pov:'v',prio:3,when:()=>tier()>=2&&S.slot>=2&&!S.dark&&S.phase!=='taken',nodes:{
 start:{in:()=>['ok do u ever think about how fucking unlikely this all is','like statistically. i should be so dead'],expire:2,
  opts:()=>[{t:'“Often. Go on.”',reply:()=>['i started at sixteen and gave myself five years tops. that’s the average if u do it badly and i was doing it SO badly','then some stranger on a sniping forum fights me about wind math and sends a link, and the link is u guys. what the fuck, seriously'],next:'odds'},
   {t:'“You are about to say something maudlin.”',reply:()=>['no i’m NOT. ok yes. a little. shut up'],next:'odds'},
   {t:'“Go to sleep, Misaki.”',fx:()=>relApply({tension:2}),reply:()=>['ok grandpa. night.']}]},
 odds:{in:()=>['i really didn’t expect to be lucky. that’s it, that’s the whole thought. it’s freaking me out'],opts:()=>[
   {t:'“You need do nothing with it. Stay.”',fx:()=>{apply({aff:4});S.f.vLucky='stay'},reply:()=>['obviously staying?? i’m past the five years. it’s all bonus levels now babe']},
   {t:'“You were merely difficult to kill. I approve of that in a person.”',fx:()=>{apply({aff:3});relApply({trust:3});S.f.vLucky='earned'},reply:()=>['wow. romantic','putting “difficult to kill” on a sticky note']},
   {t:'“I expected to die young as well. Then the dogs needed walking.”',fx:()=>{apply({aff:5});S.f.vLucky='both'},reply:()=>['the DOGS kept u alive???','ok honestly same. biscuit sat on me the first night i stayed over and i couldn’t move till morning. can’t die if u can’t move']}]}}});
txDef('tx_rhow',{with:'r',pov:'m',prio:2,when:()=>frT('r')>=1&&S.day>=5,nodes:{
 start:{in:()=>['question, gremlin','how the fuck’d you end up with us anyway. Angel just showed up one day goin’ “i found a gremlin on a forum” like you were a stray'],expire:3,
  opts:()=>[{t:'“angel corrected my wind math. i corrected her back. then i got a link.”',reply:()=>['course she did. she drags people home like a cat with a dead bird. you’re the bird, by the way'],next:'more'},
   {t:'“luck. pure stupid luck.”',reply:()=>['luck my ass. you’re a mean little shot and Angel wanted you where she could see you. I’d’ve done the same'],next:'more'}]},
 more:{in:()=>['what’d you think we’d be like'],opts:()=>[
   {t:'“scarier.”',fx:()=>fr('r',3),reply:()=>['scarier. the fuck. come watch me work sometime, then say that to my face']},
   {t:'“i didn’t think i’d live long enough to find out.”',fx:()=>{fr('r',5);S.f.luckyTold=1},reply:()=>['yeah, well. I had me dead in a parkin’ garage by thirty. sucks t’be wrong','you’re stuck with us now, gremlin. anybody puts you in the ground, that one’s mine to kill']}]}}});
txDef('tx_tarps',{with:'r',prio:1,when:()=>frT('r')>=1,nodes:{
 start:{in:()=>['hypothetically','how many tarps is too many tarps'],expire:2,
  opts:()=>[{t:phMe()==='v'?'“There is no such number. Bulk discounts exist.”':'“there’s no such thing as too many tarps.”',fx:()=>fr('r',2),reply:()=>['THANK you. cashier looked at me like I was a fuckin’ serial killer. rude']},
   {t:phMe()==='v'?'“Why are you asking me.”':'“why are u asking me”',reply:()=>['you look like you know your way ’round a tarp. take the compliment'],next:'why'},
   {t:phMe()==='v'?'“Please buy them in different stores.”':'“pls buy them at different stores. like a normal criminal.”',fx:()=>{fr('r',3);if(isM())apply({heat:-2})},reply:()=>['huh. yeah, alright. knew we kept you ’round for somethin’']}]},
 why:{in:()=>[],opts:()=>[{t:'“…how many did you buy.”',reply:()=>['forty.','it’s for a shed','ain’t no fuckin’ shed']}]}}});
txDef('tx_vgroc',{with:'v',pov:'m',prio:1,when:()=>tier()>=1&&!S.dark,nodes:{
 start:{in:()=>['I am at the supermarket. Do you need anything?','My list so far: lemons, rice, dog food (large), bleach (large), a single lime.'],expire:2,
  opts:()=>[{t:'“why ONE lime”',reply:()=>['One is sufficient. It is for the drink.','The bleach is for the table downstairs.','Do not confuse the two. It has happened.']},
   {t:'“egg sandwich pls”',fx:()=>apply({aff:2}),reply:()=>['They have two left. I have taken both. A woman wished to object, and then she looked at me properly.']},
   {t:'“don’t buy the bleach and the tarps at the same place”',fx:()=>{relApply({trust:2});apply({heat:-2})},reply:()=>['I never do. It is good that you think of it. Continue to think of it.']}]}}});
txDef('tx_aalibi',{with:'a',prio:2,when:()=>frT('a')>=1&&S.phase!=='taken',nodes:{
 start:{in:()=>['need u in the background of maria’s live at 9','walk past. laugh at something. get seen. it’s for reasons','(timestamp reasons)'],expire:1,
  opts:()=>[{t:'“on it. what am i laughing at”',fx:()=>{fr('a',3);apply({heat:-4})},reply:()=>['anything. think about ronin falling off a roof. works on me every time']},
   {t:'“whose alibi is it”',reply:()=>['a lady never tells','(mine. the heartsick angel has a 9:15 and she’s been looking forward to him all week. she’ll also be live in maria’s kitchen. isn’t that crazy)'],next:'yes'}]},
 yes:{in:()=>['so ur coming??'],opts:()=>[{t:'“yeah. obviously.”',fx:()=>{fr('a',4);apply({heat:-4})},reply:()=>['good. wear something that says “bystander.” nothing red']},{t:'“can’t tonight.”',fx:()=>fr('a',-2),reply:()=>['fine. i’ll use ronin. he can’t laugh on cue, he sounds like the people he works on']}]}}});
txDef('tx_mcontact',{with:'m',pov:'v',prio:2,when:()=>tier()>=2&&S.phase!=='taken',nodes:{
 start:{in:()=>['weird question','can i put u as my emergency contact','like on forms. hospital shit. in case i get shot somewhere inconvenient'],expire:3,
  opts:()=>[{t:'“Yes. That did not require a question.”',fx:()=>{apply({aff:3});S.f.vEmergency=1},reply:()=>['cool. i put u down as “brother.” under distinguishing features i put “tall” and “u’ll know”']},
   {t:'“Only if I can put you as mine.”',fx:()=>{apply({aff:5});S.f.vEmergency=2},reply:()=>['deal. oh my god ur form is gonna be so boring','i wrote “person to call.” there wasn’t a box for “sugar honey dumpling”']},
   {t:'“What does inconvenient mean.”',reply:()=>['like somewhere they ask questions. a real hospital. not ronin’s kitchen table','and don’t type “do not get shot.” i can see u typing it. no promises, bonus levels'],next:'yes'}]},
 yes:{in:()=>['so yes?'],opts:()=>[{t:'“Yes.”',fx:()=>{apply({aff:3});S.f.vEmergency=1},reply:()=>['k. ur official. ur on paperwork. no backsies.']}]}}});
txDef('tx_rangel',{with:'r',prio:1,when:()=>frT('r')>=1&&frT('a')>=1&&S.f.mariaKnown,nodes:{
 start:{in:()=>['princess is doin’ the heartsick face again','starin’ at the wall goin’ “i’m FINE” like she’s about t’shoot it','bring snacks. the bad ones.'],expire:2,onExpire:()=>fr('a',-1),
  opts:()=>[{t:phMe()==='v'?'“On my way. Which bad ones.”':'“omw. which bad ones”',fx:()=>{fr('a',3);fr('r',2)},reply:()=>['the cheese puffs that turn your fingers orange. she likes to leave prints on maria’s mirror.']},
   {t:phMe()==='v'?'“What happened?”':'“what happened”',reply:()=>['some asshole in her comments said maria looks “tired.” six years of blowin’ throats out with a shotgun and THAT’S what gets her'],next:'go'}]},
 go:{in:()=>['you comin?'],opts:()=>[{t:'“coming.”',fx:()=>{fr('a',4)},reply:()=>['good. I’m outta jokes. did the one about the priest and she threw a shoe at my fuckin’ head']},{t:'“can’t.”',fx:()=>fr('a',-1),reply:()=>['sucks t’be me then. priest joke again. she’s got one shoe left']}]}}});
/* --- small one-off texts that land on their own, dark or daft --- */
const DRIFT={a:['sent u a pic of a pigeon. his name is detective. he’s watching me.','if i ever go missing check the sephora first','maria just got sent a free blender. the heartsick angel has ideas for the blender','lipstick shade name: “crime scene.” i bought four.'],
 r:['(photo of a raccoon in a dumpster) him.','found a guy’s mixtape in his glovebox. it fuckin’ slaps. shame about his head','crumble’s out. come get some or don’t, more for me, asshole','landlord asked why my bins smell like bleach. told him I’m a clean fuckin’ guy. he quit askin’'],
 v:['Biscuit stole a police officer’s glove from a crime scene. I have returned it with a note.','The board asked me to smile in photographs. I smiled. They have withdrawn the request.','I found one of your star clips in the car. It is on my keyring now. You may have it back. You may not.','Did you eat.'],
 m:['did u eat. (i didn’t. i’m asking so u feel guilty instead of me)','saw a guy jaywalk and thought “i could.” nobody’s paying me for him tho. his lucky day','pls tell biscuit i said she’s the best dog. not to u. to her. u can listen.','konbini has the good egg sandwich. i bought all four. don’t come at me']};
EVENTS.push({id:'drift_txt',when:()=>!S.dark&&S.phase!=='taken'&&!isLone(),run:done=>{S.seen.drift_txt=0;const ks=phContacts().filter(k=>k==='v'||k==='m'||frT(k)>=1);if(ks.length){const k=pk(ks);phQueue(k,[pk(DRIFT[k])],0);phDeliver()}done()}});
/* --- the luck, in her own head --- */
EVENTS.push({id:'lucky_morning',when:()=>isM()&&S.pov!=='v'&&S.day>=6&&!S.dark&&S.phase!=='taken'&&!S.seen.lucky_morning,run:done=>{say([
 ['','You wake up. That’s the first thing. You always notice it, a little: oh. again.'],
 ['hitmeuppp',MV('(five years. that was the plan. average lifespan for someone doing this badly. i was doing it SO badly.)','(five years tops, i said. i’m past it. every morning now is a bonus level and nobody gave me the fucking manual.)','(I gave myself five years when I started. I’m past it. Nobody tells you what to do with the extra, seriously.)','(Five years, I figured. Then a stranger on a forum fought me about wind math and sent a link, and everybody on the other end of it decided to keep me. Life is so unfair to every other idiot who did the same sums.)')]],done)}});
/* --- a talk topic with V --- */
TDTOP_V.push({id:'lucky',label:()=>'“i really didn’t expect to be lucky.”',show:()=>tier()>=1&&!S.dark&&!(S.talks&&S.talks.lucky),run:b=>{warm('v','lucky',5);S.talks=S.talks||{};S.talks.lucky=1;
 say([['hitmeuppp','i really didn’t expect to be lucky.'],['K9','In what sense?'],['hitmeuppp','angel found me on a sniping forum. a SNIPING FORUM, v. like a hobby board. for murder. and she was nice to me.'],['hitmeuppp','then the server. then ronin calling me “gremlin” like he’d known me ten years. then u, asking if i ate. every fucking day.'],
  ['hitmeuppp',MV('i thought i’d be dead by now. that was the plan. a short plan.','i figured five years, tops. that’s how long people like me last. i was ready for it.','I gave myself five years when I started. I was fine with it. Then all of you happened and now I’m not fine with it at all, which is seriously rude.','I had a five-year plan and the plan was to die at the end of it. I had it scheduled, V. Then you all went and ruined it, and it’s the nicest thing anyone’s ever fucked up for me.')],
  ['K9','It was a poor plan.'],['K9','You are difficult to kill, and anyone who tries now must come through three of us first. I do not expect they will enjoy it.']],b)}});
if(!TOPICS_V.find(x=>x.id==='lucky'))TOPICS_V.splice(TOPICS_V.length-1,0,TDTOP_V[TDTOP_V.length-1]);
/* the server log gets a few more lines too */
const _chatLK=chatLog;chatLog=function(){const L=_chatLK();if(!S||S.phase==='taken')return L;const k=(S.day*7+S.slot)%6;
 if(k===0)L.push(['an','reminder that i found misaki on a SNIPING FORUM and now she’s mine. ours. whatever. brunch sunday']);
 if(k===2)L.push(['ro','day 4 of the tarp situation. first one of you t’bring it up gets wrapped in one']);
 if(k===4)L.push(['mi','someone ask me if i ate so i can say no and get yelled at']);
 return L};
