/* ===================== HER MIND, AND AFTER (kc51) =====================
   The worst route, told more from inside. Each day in the deluded worst stay opens with her state of mind, by how
   much composure she has left (four bands). After the spiral ending, V's lone route opens with what is left: the room,
   the hounds, Angel, Ronin, and him. Nothing here shows a method. */
const KD_MIND={
 hold:[[['','You wake up and do your inventory before you open your eyes. Hands. Feet. Name. You have all three. That’s a good morning, in here.'],['hitmeuppp','(One: I’m alive. Two: they haven’t come yet. Three: the tall one is outside and he has not hurt me once. I don’t know what to do with Three.)']],
  [['','You make yourself do the exercises you did at fourteen, in the first room with a lock on the outside: name five things you can see. Bulb. Door. Tray. Your own knees. A crack in the ceiling shaped like a hound.'],['hitmeuppp','(A hound. Why does everything in here look like a hound.)']]],
 fray:[[['','You lose time in the afternoon. One minute the light-well is bright, the next it’s dark, and the soup on the tray has a skin on it. You don’t know where the hours went. You know exactly where the hours went. You’ve been here before.'],['hitmeuppp','(It’s happening again. It’s the van again. They’re doing the needle again and I didn’t feel it.)'],['','Nobody has given you a needle. You are losing the hours all by yourself now. That’s worse, and you know it’s worse, and you can’t make it stop.']],
  [['','You catch yourself apologising out loud to nobody. Sorry. Sorry. In the voice you use for clients.'],['hitmeuppp','(Who am I saying sorry to.)'],['','You think it might be V. You think you might be saying sorry to V for not being there when he comes, for making him find whatever is left. You don’t know you are already in his house. You are saying sorry to the right man through two inches of door.']]],
 thin:[[['','You can’t remember what his voice sounds like. V’s. You try, and you get the tall one’s instead, the slow reading voice, and you panic, because they’ve taken that too, they’ve swapped it out.'],['hitmeuppp','(I had it. I had it this morning. I had his voice and they’ve put the guard’s in its place.)'],['','It is the same voice. It was always the same voice. You are grieving a man who is sitting four feet away.']],
  [['','You don’t eat. Not to make a point any more. You just can’t remember the reason people do it.'],['','You think about the trailer. The rent receipt in your back pocket, PAID. You were so proud of that receipt. You were going to frame it. You can’t remember now why it mattered that much, and that frightens you more than the bulb.']]],
 gone:[[['','You don’t do the inventory. There isn’t any point counting things they’re going to take on Friday.'],['','You lie on your side facing the wall instead of the door, which you have never done in your life, in any room, ever. You have always faced the door. You don’t care which way you face.'],['','On the other side of the door the tall one stops reading for a long time. He has noticed which way you are facing.']],
  [['','You think about the girl who did the sums on a station bench at sixteen and gave herself five years. You think she’d be disappointed, and then you think she wouldn’t, she’d nod, because she always knew. She was so sure. You spent years proving her wrong. You’re so tired of proving her wrong.'],['hitmeuppp','(She was right. Five years and some extra. She was right all along and I made everybody love me anyway. That wasn’t fair of me. That wasn’t fair on them.)']]]};
const kdBand=()=>S.comp>=22?'hold':S.comp>=14?'fray':S.comp>=7?'thin':'gone';
const _hubKD51=hub;hub=function(){const a=arguments,self=this;try{if(typeof kdWR==='function'&&kdWR()&&kdClar()<2&&!dlg&&S.f.kdMindDay!==S.day){S.f.kdMindDay=S.day;const b=kdBand();const L=KD_MIND[b][(S.kd.med.d||0)%2];save();go(cutBg('#0c0a08'));return say(L,()=>_hubKD51.apply(self,a))}}catch(e){}return _hubKD51.apply(self,a)};
/* after the spiral: V, alone */
const KD_AFTER=[
 [['','He closes the infirmary. He doesn’t lock it; she never liked a locked door. He takes the door off its hinges and leans it against the wall of the corridor, so that the room can never be shut again, and then he doesn’t go down to sublevel two for a month.'],
  ['','The grey hound goes down every night. He hears her claws on the stairs at two in the morning. He doesn’t stop her. In the morning she comes up and lies across his feet and does not eat until he puts her bowl beside the empty doorway.']],
 [['','Angel comes on the fourth day with no makeup on. He has never seen her without it. She sits on the kitchen floor with her back against the island where Misaki ate cereal, and doesn’t say anything for an hour.'],
  [AN,'she said goodbye to you. through the door. i know, i heard you tell ronin. she said goodbye to you and you said you’d pass it on.'],
  [AN,'did you pass it on, V. did you tell her yourself what she said. did you tell her it wasn’t your fault.'],
  ['','He doesn’t answer. She takes his hand, the left one, and holds it in her lap, and they sit there until the light goes.']],
 [['','Ronin doesn’t come for nine days. On the tenth, V finds him in the garage at four in the morning with the crowbar, taking Misaki’s truck apart very slowly, one bolt at a time, laying every part out on a tarp in rows.'],
  [RN,'I keep thinkin’ I can put it back together better. Y’know. If I do it right this time.'],
  [RN,'Two streets over, Vee. And then four feet. You were four feet away. Through a fuckin’ door.'],
  ['K9','I know.'],
  [RN,'Yeah. Yeah, you do. Fuck. Sorry. Pass me the eleven.'],
  ['','V passes him the eleven. They take the truck down to its frame together without speaking, and in the morning they put it back, every bolt, exactly as it was, because neither of them could stand it being any different.']],
 [['','He makes tea at six in the morning and pours two cups before he notices. He does not pour the second one out. He leaves it on the island, where her stool used to be, until it goes cold, every day.'],
  ['','Somewhere in the second month he realises he has started saying the date out loud when he wakes up. It is Tuesday. It is my house. Nobody is listening. He keeps doing it.'],
  ['K9','(I said it to her for four days through a door. She could not hear it. I will say it for the rest of my life to a room where she cannot hear it either. It is the same thing. It was always the same thing.)']],
 [['','In her trailer, on the shelf, he finds a paper cup, washed, and next to it the rent receipt she was so proud of, PAID, pinned to the wall with a star clip.'],
  ['','He sits down on the trailer floor with his back to the bed. It is the first time since the infirmary that he cries, and he does it the way he does everything, thoroughly, without hurrying, until it is finished, and then he gets up and feeds the hounds.']]];
const _meKD51=morningEvent;morningEvent=function(done){try{if(S&&S.lone==='v'&&S.f.lateRoute==='self'){const n=S.f.kdAfterN||0;if(n<KD_AFTER.length&&S.f.kdAfterDay!==S.day){S.f.kdAfterN=n+1;S.f.kdAfterDay=S.day;save();return say(KD_AFTER[n],()=>_meKD51(done))}}}catch(e){}return _meKD51(done)};
const _xeKD51=extraEnding;extraEnding=function(){const L=_xeKD51();if(!S||!S.f)return L;
 if(S.f.lateRoute==='self')L.push('The infirmary has no door. It leans against the corridor wall where V left it. Every night at two the grey hound goes down the stairs to lie in the doorway, and every morning V says the date out loud to a room where nobody is listening.');
 if(S.f.kdInterrupted)L.push('There is a dent in the infirmary door at the height of a man’s shoulder. V never fixed it. Some nights Misaki gets up and puts her hand on it, and goes back to bed.');
 return L};
/* the setting now says what the worst route can end in */
if(typeof KD_SA_HELP!=='undefined'){}
