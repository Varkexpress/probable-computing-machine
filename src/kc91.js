/* ===KC91-BEGIN=== */
/* ===================== THE WAR: THE DRIP (kc91) =====================
   The author's direction: make it plain that during the delusion (the cell stage of the infirmary) Misaki is on a
   large amount of medicinal drugs, and that this is part of why they take V's house for a cell.
   What was already canon (kc28): the chart, in V's hand, says NO SEDATIVES, underlined twice; the captors dosed them
   in the other building. Both are kept. What this module adds: three broken ribs, a pinned hand and wrists open to
   the tendon need a great deal of pain relief, and what the captors gave is still leaving the blood. Nobody has
   sedated them. They are full of painkiller all the same, by a line in the arm, and it does to their judgement
   what a sedative would. It also tastes exactly as the other building's doses tasted, which for Misaki settles the
   question of who has them.
   V's side: he forbade sedation so that they would be clear, and then had to choose between their pain and their
   reason. Every hour that they are comfortable is an hour that they spend afraid of him.
   Needs kc73, kc76–kc90.
   1. Two opening scenes, first in kc84's scheduler:  d_line (Misaki, cell)  ·  d_dose (V)
        S.f.e2lDose: Misaki kinked|left, V cut|held. 'kinked' and 'cut' bring clarity a day sooner (med.clar +1, once)
        and cost a night of pain; 'left' and 'held' do not.
   3. Beat e2l_green (chapter II, free, after e2l_room): the green book, with the hour of every visit.   S.f.e2lGreen read|unread
   2. The pool (kc85's ⚔ The room / Outside the room):
        Misaki, cell:   d_skip d_three d_taste d_two d_late d_light
        Misaki, clear:  d_bag d_sort d_drugged
        V:              d_weight d_eyes d_chart d_cost d_ronin d_angel d_taper
   Full-story text names the doctor as the one who sets the rate; injuries-only text has V set it himself, from the
   tables he uses for the hounds (kc36: no doctor). No dose, drug name or quantity is given anywhere.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc91.md. Test: node tools/k91_test.js */
const K91=()=>{try{return typeof K90==='function'&&K90()}catch(e){return false}};
const k91Clear=()=>{try{const m=S.kd&&S.kd.med;if(m&&!S.f.e2lDoseUp){m.clar=Math.min(3,(m.clar||0)+1);S.f.e2lDoseUp=1;save()}}catch(e){}};

/* ===================================== THE OPENING SCENES ===================================== */

/* ===================================== THE POOL: MISAKI, CELL ===================================== */
/* ===================================== THE POOL: MISAKI, CLEAR ===================================== */
/* ===================================== THE POOL: V ===================================== */
/* ===================================== II · THE GREEN BOOK ===================================== */
function k91Green(){k77Go('#0b0c0a');k73Mark('e2l_green',1);const m=k76M(),f=S.f;
 const L=m?[
  N('There are things from the room that you cannot place. Him at the foot of the bed, with nothing in his hands. A coat. A hand coming at your face. You were full of the drip, and you do not know which of them happened.'),
  N('He has a green book. Every time he came through that door, he wrote the hour and what he did. Angel told you. He has not offered it. He would not; offering it would be asking you to believe him.'),
  N('You find it in the counter drawer of the room marked LAUNDRY, where it always was. You take it upstairs and put it on the kitchen island between you.'),
  M2('this is ur version','this is your version'),
  K76V('It is. It is only that. I wrote it at the time, and I have not altered a line. It is not evidence of anything except what I say that I did.'),
  M2('and if i read it and it doesn’t match what i’ve got','and if i read it, and it doesn’t match what i’ve got?'),
  K76V('Then you will have two accounts, and one of them is from a man with your name in a ledger. I should not advise you which to prefer.')]:[
  N('They come into the kitchen with the green book, and lay it on the island between you.'),
  N('You know what they want it for. There are days in that room for which they have only what the drip left them, and some of it is of you, and some of that never took place.'),
  K76MV('this is ur version','this is your version','This is your version.','So this is your version.'),
  K76V('It is. It is only that. I wrote it at the time, and I have not altered a line. It is not evidence of anything except what I say that I did.'),
  K76MV('and if it doesn’t match what i’ve got','and if i read it, and it doesn’t match what i’ve got?','And if I read it, and it doesn’t match what I’ve got?','And if I read it, and it doesn’t match what I’ve got in my head?'),
  K76V('Then you will have two accounts, and one of them is from a man with your name in a ledger. I should not advise you which to prefer.')];
 const read=()=>{f.e2lGreen='read';apply({aff:2});save();say([
   N(m?'He goes out. He goes right out, to the kennel, and you hear the hose start, so that you will know where he is while you read.':'You go out to the kennel and turn the hose on, so that they will know where you are while they read.'),
   N(m?'It is all there, by the hour. “06:00. Tray. They thanked me. Did not answer.” “11:40. Moved the drip to the left side. They will not turn over.” You go through it with your list beside it.':'They will be going through it with a list. You know what is on the list. You wrote the other half of it.'),
   N(m?'You find the one with the hand. “14:10. Blood at the mouth. Crossed the room too quickly. Stopped a foot short. They gave me the throat. My fault; I have a rule about speed and I broke it.”':'There is an entry at ten past two on the second day that you would give a good deal to have been able to leave out. You left it in.'),
   N(m?'So that one happened. He did come at you. And he wrote it down against himself, at the time, in ink, where you might one day read it.':'When you come back in, the book is shut on the island, and they are looking at you as they look at a roof they have not shot from before.'),
   K76MV('u put the bad one in','you put the bad one in','You put the bad one in.','You put the bad one in. The one with your hand.'),
   K76V('It occurred.'),
   K76MV('(seven of the nine are in there. two aren’t. so two were the drip. i’ll take that. i’ll take seven out of nine from HIM)','(seven of the nine are in there. two aren’t. so two were the drip. i’ll take that. i’ll take seven out of nine, from him)','(Seven of the nine are in there. Two aren’t. So two were the drip. I’ll take that. I’ll take seven out of nine, from him.)','(Seven of the nine are in there. Two aren’t, so two were the drip. I’ll take that. I’ll take seven out of nine, from him of all people.)')],hub)};
 const unread=()=>{f.e2lGreen='unread';apply({aff:1});save();say([
   N(m?'You put your good hand flat on the cover. You do not open it.':'They put the good hand flat on the cover. They do not open it.'),
   K76MV('no. i don’t want urs. i want mine. even with holes in it','no. i don’t want yours. i want mine, even with holes in it','No. I don’t want yours. I want mine, even with holes in it.','No. I don’t want your version. I want mine, even if it’s got holes in it.'),
   K76V('Then it goes back in the drawer. It is there whenever you wish, and you need never tell me that you looked.'),
   N(m?'He carries it down himself. You sit at the island with nine things that you will never be able to sort. They are yours. Nobody gave them to you, and nobody is going to tell you what is in them.':'You carry it down yourself and lay it in the drawer. They have chosen to keep nine things that they cannot sort, in preference to having them sorted by you. You think the better of them for it, and that does not make it any easier.')],hub)};
 say(L,()=>ask(K73Who(),m?'(Green cloth. His initials on the spine.)':'(They have not opened it.)',m?[
  {t:'Read it',sub:'his word, against your pieces',fn:read},{t:'Give it back unopened',sub:'keep your own, holes and all',fn:unread}]:[
  {t:'Offer to go out while they read',fn:read},{t:'Tell them that it is only your account, and wait',fn:unread}]))}
(function(){try{if(typeof K73B==='undefined'||typeof k76Card!=='function')return;const at=id=>K73B.findIndex(b=>b.id===id);
 const b={id:'e2l_green',t:()=>k76H('The green book, from the counter drawer','They have brought you the green book'),sub:()=>'costs time · what happened, and what was the drip',
  when:()=>['after','act2'].includes(S.phase)&&k73Done('e2l_room')&&k73Fresh(),run:function(){return k76Card('e2l_green',()=>k91Green())}};
 const i=at('e2l_marks');K73B.splice(i<0?K73B.length:i,0,b)}catch(e){}})();

/* ===================================== ENDINGS ===================================== */
const _xe91=extraEnding;extraEnding=function(){const L=_xe91();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,F=f.e2l85||{};
 if(f.e2lDose==='cut')L.push('V wrote NO SEDATIVES on Misaki’s chart, and then a rate for the pain relief that took their judgement as surely. On the first night he halved it. They did not make a sound, and they knew him a day sooner.');
 else if(f.e2lDose==='held')L.push('V wrote NO SEDATIVES on Misaki’s chart, and then a rate for the pain relief that took their judgement as surely. He left it running. They were not in pain, and for those days they took him for a gaoler.');
 else if(f.e2lDose==='kinked')L.push('On the first night in the infirmary Misaki lay on the drip line until morning, to get their head back. It was the worst night of the week, and they chose it.');
 if(F.d_sort)L.push('There are nine things from the infirmary that Misaki can put in neither column: happened, or didn’t. V has the hour of every visit written in a green book. They have never asked to see it.');
 if(F.d_drugged)L.push('“You drugged me.” “Yes.” “Like they did.” “Yes.”')}catch(e){}return L};
/* ===KC91-END=== */
