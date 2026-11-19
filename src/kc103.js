/* ===KC103-BEGIN=== */
/* ===================== THE WAR: OH (kc103) =====================
   Linked to kc102, at the author's direction: Misaki realises that they are loved.
   kc102 has them freeze everybody out: perfect manners for V, “it’s fine” for Ronin, the one exact cruelty for
   Angel, six days of nothing. They have done it since they were nine, and it has always worked: people go.
   This is the part where it does not work. Nobody goes. Misaki adds it up, as they add up everything, and the sum
   comes out to a thing they have no column for.
   It is a realisation, not a romance. Angel and Ronin are in it as much as V. Nothing is said aloud that either of
   them could not stand to hear; the voice stays theirs.
   Delivery: a free ⚔ side entry, one a day, after the infirmary and before the boat, once kc102's anger has begun
   (any of its clear infirmary scenes, or its range morning). Ordered.
     Misaki (S.f.e2l103M): the chair at four; the camera face; the deed; count again; oh.
     V (S.f.e2l103V): Ronin at the door; they call you something; the deed, refolded.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via M2 and they/them.
   Notes: docs/notes_kc102.md. Test: node tools/k103_test.js */
const K103=()=>{try{return typeof K102==='function'&&K102()}catch(e){return false}};
const k103Linked=()=>{try{const F=S.f.e2l85||{};return !!(S.seen.m102_range||['s_wreck','s_ronin','s_debt','s_four','s_pity','s_figure','s_letter','s_wrong','s_board','s_bitten','s_steady'].some(k=>F[k]))}catch(e){return false}};
const k103Ok=()=>{try{return K103()&&!S.f.e2lEnd&&['after','act2','act3'].includes(S.phase)&&!(typeof kdMed==='function'&&kdMed())&&k73Done('e2l_door')&&k103Linked()}catch(e){return false}};

const K103_M=[
 /* 1 · the chair at four */
 cb=>say([
  N('Ronin comes at four. He has come at four every day since you told him it was fine.'),
  N('You have not been kind to him once. You have said “sure” and “ok” and read magazines at him. On the Tuesday you pretended to be asleep for the whole hour, and he knew, and sat there anyway with his crowbar across his knees, and read the racing results to himself under his breath.'),
  N('Today you count. You are good at counting. You go back through the days with your thumb on your fingers.'),
  M2('(nineteen. nineteen days. four o’clock. he hasn’t missed ONE)','(nineteen. nineteen days. four o’clock. he hasn’t missed one)'),
  N('You know what it costs to be somewhere every day at four for nineteen days. You have done surveillance. It is the hardest thing there is; people give up on the fourth. Nobody pays him. There is no book on it; you asked.'),
  [RN,'What? I got somethin’ on my face?'],
  M2('why do u keep coming','why do you keep coming?'),
  N('He looks at you as if you had asked him why he keeps breathing.'),
  [RN,'’S four o’clock.'],
  N('That is all he has. He picks up the paper. You lie back and look at the ceiling, and something in your chest that has been clenched since the river lets go about an inch, and you do not know what to call it, so you call it indigestion.')],cb),
 /* 2 · the camera face */
 cb=>say([
  N('You keep thinking about Angel’s face. Not the pity one. The other one: the eyeliner and the lips and the smile, that she went away and put on and came back in, ten minutes after you had told her that her numbers were down.'),
  N('You know what that face costs her. You have watched her put it on for a stream: forty minutes in front of the ring light, and then a long breath at the door, as if she were going on stage.'),
  N('She did all of that in your toilet, with her hands shaking, so that you would not have to look at her being sad. She did it for somebody who had just put a knife in her on purpose.'),
  M2('(i was cruel to her. properly. i aimed. and she went and did her FACE so i wouldn’t feel bad about it)','(i was cruel to her. properly. i aimed. and she went and did her face so that i wouldn’t feel bad about it)'),
  N('You look her stream up on his tablet. The night you were taken. Two hours and eleven minutes, in her bedroom, no make-up, no lighting, asking a city of strangers to find you. You watch ninety seconds and turn it off and put the tablet face down on the blanket.'),
  N('She comes in at six with the polish. You do not say anything. You hold your hand out before she asks for it, and she stops in the doorway and looks at the hand for a moment longer than a hand needs, and then she comes and sits down.')],cb),
 /* 3 · the deed */
 cb=>say([
  N('You read his ledger. You always have; he leaves it on the desk and you read it when his back is turned, the way you would read anybody’s mail.'),
  N('Your page is longer than it was. You go through it with your jaw set, expecting the charges. They are there. Under them, the dates. “Ate.” “Did not speak.” One night, in the middle, a single word: “Nothing.” And “Day 3. Nothing said.” You did that. It is written down.'),
  N('Folded once, between your page and the next, there is a sheet of thick paper. A deed. A plot at the north wall of the churchyard where Ronin lights his candles, under a yew. Bought by telephone at three in the morning, on the night your fever went past forty. The stone paid for. No words chosen for the stone.'),
  M2('(he bought me a GRAVE. he sat up at three and bought me a grave. the absolute FREAK)','(he bought me a grave. he sat up at three and bought me a grave. the absolute freak)'),
  N('You hold it for a long time. You know him. He makes arrangements when he is frightened; it is the only thing he knows how to do with it. You have watched him do it all month: the hall lamp, the soup, the plan for the week read out like minutes.'),
  N('So you know what this is. It is the most frightened that man has ever been. He was so frightened that he went and made a place to put you, under a tree, near the one friend who prays, so that you would not be on your own.'),
  M2('(nobody’s ever planned where to put me. nobody ever thought i’d need putting anywhere)','(nobody has ever planned where to put me. nobody ever thought i’d need putting anywhere)'),
  N('You fold it back along the crease, exactly, and put it back between the pages. Then you take it out again, and write on the back of it, in biro, small, and put it back.')],()=>{S.f.e2l103Deed=1;save();cb()}),
 /* 4 · count again */
 cb=>say([
  N('In the room you counted who would notice. Four. One for money, one for paperwork. You were quite proud of how short it was.'),
  N('You do it again, on the roof, with your fingers. Properly. You are good at counting and you do not cheat.'),
  M2('(one: angel. on AIR. two: ronin. nineteen days at four. three: him. a grave, the soup, the lamp)','(one: angel. on air. two: ronin. nineteen days at four. three: him. a grave, the soup, the lamp)'),
  M2('(four: the old hound. sat at the door every night. five: the woman in the cardigan who said “any part of it” twice. six: the guy at the shelter i gave twenty to, who said “see u next week”)','(four: the old hound. he sat at the door every night. five: the woman in the cardigan who said “any part of it” twice. six: the man at the shelter i gave twenty to, who said “see you next week”)'),
  M2('(seven: the teacher. eleven years old. three hours in a car park)','(seven: the teacher. eleven years old. three hours in a car park)'),
  N('You run out of fingers on the good hand. You start on the bad one, slowly, because it is slow. Eight: the grey hound, who lay along your back all night when you thought she was going to eat you. Nine: the black hound, who lifted your broken hand out of the straw with his nose.'),
  N('You stop at nine because you have run out of things to hold up. You sit there with nine fingers in the air, on a roof, at night, like a kid at a quiz.'),
  M2('(that’s not four. i was wrong. i’m never wrong about numbers)','(that isn’t four. i was wrong. i am never wrong about numbers)'),
  N('You were wrong by more than double. You sit with your hands up until they get cold. You were very careful your whole life that the number should stay small, so that nothing could be used against you. It did not stay small. People got in anyway, while you were not looking, through doors you had bolted.')],cb),
 /* 5 · oh */
 cb=>say([
  N('It is nothing. It is a Wednesday. You are at the kitchen island, at half past seven, and he puts a cup of coffee by your right hand and goes back to the stove.'),
  N('It is how you take it. You have never told him how you take it. He found out. He found out the way he finds out everything, and then he did it every morning, without saying, for a month, while you thanked him in that voice, and called him V, and said nothing for six days.'),
  N('And that is where it happens. Not at the river. Not at the grave. At a cup of coffee.'),
  M2('(oh)','(oh)'),
  M2('(oh, FUCK)','(oh, fuck)'),
  N('It arrives all at once, as the rest arrives: all the numbers together, nineteen days and two hours eleven and a plot under a yew and a pencil mark on a wall and nine fingers on a roof. And they come out to one word, and it is not a word you have a column for.'),
  M2('(they love me. all of them. the whole stupid lot of them. even when i did the voice. even when i was a WALL)','(they love me. all of them. the whole stupid lot of them. even when i did the voice. even when i was a wall)'),
  N('It is the most frightening thing that has ever happened to you. You have been held for four days by men with a van and it was less frightening than this. That you could plan around. This you cannot do anything with at all. It is just there, in the kitchen, with the coffee, and you cannot give it back.'),
  N('He turns round from the stove, because you have gone very quiet in a different way.'),
  K76V('Is something the matter with it?'),
  M2('ur coffee’s shit','your coffee’s shit'),
  N('It is perfect coffee. He looks at you. Something goes across his face, very fast, and he turns back to the stove before you can read it.'),
  K76V('So I am told.'),
  N('You drink it. Your hands are not steady, which they have always been, on every roof you have ever lain on. You let them shake. It is the first thing in a month that you have let happen to you without a fight.')],()=>{S.f.e2l103Oh=1;apply({aff:4});note('e2l103','Misaki worked out, over a cup of coffee, that they are loved. It was the most frightening thing that ever happened to them.');save();cb()})];

const K103_V=[
 /* 1 · Ronin at the door */
 cb=>say([
  N('Ronin comes out of the spare room at five, as he has every day, and stops in the passage by your study door.'),
  [RN,'Kid asked me why I keep comin’.'],
  K76V('What did you tell them?'),
  [RN,'Said it was four o’clock.'],
  N('He stands there turning a ring.'),
  [RN,'They looked at me like I’d handed ’em a live grenade, Vee. Like nobody’d come back before. Nineteen days, an’ they only just noticed I wasn’t goin’ anywhere.'],
  K76V('(Nineteen days. I have been in that room some two hundred times in the same period. I wonder whether they have counted those.)'),
  [RN,'You ever tell ’em? Anythin’?'],
  K76V('I have told them that the stitches come out on the fourteenth.'),
  N('Ronin looks at you for a long moment, and then he laughs, the big one, and goes down the stair, and the hounds go off all over the house.')],cb),
 /* 2 · they call you something */
 cb=>say([
  N('Six days of nothing. Then a month of “Thank you, V,” in a clean voice, which was worse.'),
  N('This morning you put the coffee down and they say, without looking up from the paper:'),
  K76MV('thanks, ur honour','thanks, your honour','Thanks, your honour.','Thanks, your honour.'),
  N('You go back to the stove. You do it at once, so that they will not see your face, and you stand there turning bacon that does not need turning.'),
  K76V('(The name. It is an insult. It was always an insult. I have been waiting at that door a month for an insult, and it has come, and I cannot turn round.)'),
  N('You turn the bacon four times. When you do turn round they are looking at you, steadily, over the paper, as they look at a thing through a scope, and you do not know how long they have been looking.'),
  K76MV('ur burning that','you’re burning that','You’re burning that.','You’re burning that, by the way.'),
  K76V('I am browning it.'),
  N('They snort, and go back to the paper. You burn it. It is the best breakfast that you have ever cooked.')],cb),
 /* 3 · the deed, refolded */
 cb=>say([
  N('The ledger has been read. It always has; you leave it on the desk for the purpose. Tonight the deed has been read too. It is back between the pages, folded along the crease, exactly, but it has been opened. You can tell from the paper.'),
  N('You unfold it. On the back, in biro, very small, in the hand that writes FOR FUN at the top of notebooks:'),
  ...(S.f.e2l103Deed?[N('“not yet. —M.” And under it, smaller, as if added after: “north wall’s nice tho. good tree.”')]:[N('Nothing. They opened it, and read it, and put it back without a word, which from them is a word.')]),
  K76V('(They know what it is. They know what I was at three in the morning. There is no figure for it and they have read it anyway.)'),
  N('You sit with it for a long time. You do not tear it up. You do not put it away. You write on their page, under the last entry, in good ink: “Read the deed.” It is not a charge. It is the first entry in the book that is only a fact about you.')],cb)];

function k103Next(){try{if(!k103Ok())return null;const f=S.f;if(f.e2l103Day===S.day)return null;const v=S.pov==='v',A=v?K103_V:K103_M,k=v?'e2l103V':'e2l103M',i=f[k]||0;
 if(i>=A.length)return null;if(v&&i===2&&!(f.e2l103M>=3||f.e2l103Deed||(S.f.e2l85||{}).r_plot))return null;return {fn:A[i],k,i,v}}catch(e){return null}}
const K103_T={m:['Ronin, at four','Angel’s other face','His ledger, again','Count again','Half past seven, a Wednesday'],v:['Ronin, in the passage','The coffee','The deed']};
function k103Run(){const e=k103Next();if(!e)return hub();S.f[e.k]=e.i+1;S.f.e2l103Day=S.day;save();go(cutBg(e.v?'#0c0b0d':'#100e0c'));e.fn(hub)}
const _sh103=sideHub;sideHub=function(late){const o=_sh103(late);try{if(S){const e=k103Next();if(e)o.push({t:'⚔ '+K103_T[e.v?'v':'m'][e.i],sub:'free · '+(e.v?'they have noticed something':'something does not add up'),fn:k103Run})}}catch(e){}return o};

const _xe103=extraEnding;extraEnding=function(){const L=_xe103();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f;
 if(f.e2l103Oh)L.push('At half past seven on a Wednesday, over a cup of coffee, Misaki worked out that they were loved. “ur coffee’s shit.” “So I am told.”');
 if((f.e2l103M||0)>=4)L.push('Misaki counted, on a roof, who would notice. It came to nine. In the infirmary they had made it four.');
 if(f.e2l103Deed)L.push('On the back of the deed to a plot under a yew, in biro: “not yet. —M.” and “north wall’s nice tho. good tree.”');
 if((f.e2l103V||0)>=2)L.push('After a month of “Thank you, V,” Misaki called him “ur honour” again over breakfast. He burned the bacon.')}catch(e){}return L};
/* ===KC103-END=== */
