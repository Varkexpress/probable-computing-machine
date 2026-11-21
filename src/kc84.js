/* ===KC84-BEGIN=== */
/* ===================== THE WAR: WHAT WAS DONE, AND HOW (kc84) =====================
   More infirmary on the enemies-to-lovers route, written separately for the two aftermath settings (kdSA(), kc36).
   Needs kc73, kc76–kc83.

   FULL STORY (the strand that "injuries only" hides). kc29's rules hold without exception:
     - what happened in the hours is never named, by Misaki, by V, by the doctor or by the narration;
     - Misaki knows, and so does V; the honest option is on every menu and always greyed (KD_NO);
     - every pretence is a kdDeny(); V can decline to force it and cannot make them;
     - nobody tells Angel or Ronin; no text shows V knowing anything Misaki has said to the doctor.
     On this route it has an extra edge: the man who knows is the man with forty pages on them, who swore to kill them
     slowly. Misaki cannot bear that he has it. V keeps a steel table for the kind of man who does that, and had
     meant to put Misaki on the same table.
   INJURIES ONLY. kc36's rules hold: no denial and no doctor; V does the treatment; Misaki names each injury flatly
     and does not care, because none of it is new to them. What is new here is V: he finds the injuries, and the way
     they were inflicted, disgusting, in spite of himself. He joints men for cause, in order. This was done badly, to
     no purpose, by men who were bored, and he cannot keep hold of the difference between that and his own trade.

   Delivery: this module replaces kc80's scheduler (k80MedScene) with one that orders scenes by id and by setting, and
   gives Misaki the late-night slot as well, so that the stay has room: S.f.e2l84 {id:1}.
     Misaki, cell:  ask (first: it must precede kc73's evening scene) · rules · [s_clothes | i_wrists] · hound · [s_asks | i_careful] · hand
     Misaki, clear: [s_book | i_snob] · said · thanks · doctor (full story only)
     V:             message · [s_table | i_manner] · file · form (full story only) · [s_voice | i_third] · hand · ronin ·
                    [s_vent | i_scale] · laugh
   Beat: e2l_marks (chapter II, free), a version for each setting.
     full story:    the hot water runs out                         S.f.e2lMarks boiler|towels
     injuries only: the pins come out; "it is a different trade"   S.f.e2lMarks same|differ
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc84.md. Test: node tools/k84_test.js */
const K84=()=>{try{return typeof K83==='function'&&K83()}catch(e){return false}};
const k84SA=()=>{try{return typeof kdSA!=='function'||kdSA()}catch(e){return true}};
const k84No=(t,why)=>typeof KD_NO==='function'?KD_NO(t,why):{t,sub:why||'they are not going to',dis:true,fn:()=>{}};
const k84Deny=()=>{try{if(typeof kdDeny==='function')kdDeny()}catch(e){}};

/* ===================================== FULL STORY: MISAKI ===================================== */

/* ===================================== FULL STORY: V ===================================== */

/* ===================================== INJURIES ONLY: MISAKI ===================================== */

/* ===================================== INJURIES ONLY: V ===================================== */

/* ===================================== THE SCHEDULER (replaces kc80's) ===================================== */
const K84_POOLS={mc:[],mx:[],v:[]};
const k84Pool=k=>{const sa=k84SA();return K84_POOLS[k].filter(e=>!e.mode||(e.mode==='sa')===sa)};
const k84Next=k=>{const F=S.f.e2l84||{};return k84Pool(k).find(e=>!F[e.id])||null};
if(typeof k80MedScene==='function')k80MedScene=function(){try{if(!S||!S.f||!K84()||dlg||typeof kdMed!=='function'||!kdMed())return null;
 if(typeof k73MedScene==='function'&&k73MedScene())return null;
 if((typeof k61Scene==='function'&&k61Scene())||(typeof k62Scene==='function'&&k62Scene())||(typeof k63Scene==='function'&&k63Scene()))return null;
 const slot=S.slot||0,cur=S.day+'/'+slot,f=S.f,m=S.pov!=='v';if(f.e2l80Slot===cur||f.e2lMedSlot===cur)return null;
 /* Misaki: kc73 has the evening (slot 2); mornings, afternoons and the late night are free */
 if(m&&slot===2)return null;
 const k=m?(kdClar()<2?'mc':'mx'):'v',e=k84Next(k);if(!e)return null;
 return cb=>{f.e2l84=f.e2l84||{};f.e2l84[e.id]=1;f.e2l80Slot=cur;save();go(cutBg(m?(k==='mc'?'#0c0a08':'#1c2422'):'#06060c'));e.fn(cb)}}catch(e){return null}};

/* ===================================== II · WHAT IS LEFT (a version for each setting) ===================================== */
function k84Marks(){k77Go('#0c0b0b');k73Mark('e2l_marks',1);const m=k76M(),f=S.f;
 if(k84SA()){const L=m?[
   ['','You are upstairs now, in the spare room, with a bathroom of your own. Tonight you have washed five times.'],
   ['','On the fifth the water goes cold. You stand under it anyway. You have used all the hot water in a billionaire’s house, and you would use it again if there were any.'],
   ['','When you come out there are towels on the floor outside the bathroom door, a stack of them, warm, and nobody in the corridor. At the far end of the house somebody is making a great deal of noise with the hounds’ bowls, so that you will know where he is.']]:[
   ['','At eleven the boiler gives out. It has not done so in eleven years. They have the bathroom off the spare room, and the water has been running in it since nine.'],
   ['','You know what that is. You have sat with people who did it. It is not a thing that one is clean of after one wash, or after five, and nobody can do it for them.'],
   K76V('(I cannot go to that door. I am the last man in this city who may stand outside that door.)')];
  return say(L,()=>ask(K73Who(),m?'(The towels are warm. He must have put them there a minute ago.)':'(There is nothing that you are permitted to say.)',m?[
   k84No('Tell him why it takes five.'),
   {t:'“ur boiler’s shit, by the way”',sub:'shout it down the corridor',fn:()=>{f.e2lMarks='boiler';k84Deny();save();say([
    K76V('(from the far end) It is forty years old. I will have another put in.'),
    ['','There is a second boiler by Thursday. The water never runs out again. Nobody ever mentions why a house with one person in it needed two.']],hub)}},
   {t:'Take the towels and say nothing',fn:()=>{f.e2lMarks='towels';k84Deny();save();say([
    ['','You take the towels in and shut the door. The noise with the bowls goes on for another twenty minutes, steadily, and you are timing your breathing to it.'],
    K76MV('(he doesn’t know anything. he’s just loud. he’s just a loud old man with dogs)','(he doesn’t know anything. he’s just loud. a loud old man with dogs)','(He doesn’t know anything. He’s just loud. A loud old man with dogs.)','(He doesn’t know anything. He’s merely loud: a loud old man with dogs.)')],hub)}}]:[
   k84No('Ask them whether there is anything that you can do.','it is not yours to ask'),
   {t:'Have a second boiler put in',fn:()=>{f.e2lMarks='boiler';save();say([
    ['','You leave towels on the floor outside their door, warm from the rail, and go to the far end of the house.'],
    K76MV('(down the corridor) ur boiler’s shit, by the way','(down the corridor) your boiler’s shit, by the way','(down the corridor) Your boiler’s shit, by the way.','(down the corridor) Your boiler is shit, by the way.'),
    K76V('It is forty years old. I will have another put in.'),
    ['','You have it in by Thursday. The plumber asks why a house with one person in it should need two. You tell him that it is no longer a house with one person in it, and hear that after you have said it.']],hub)}},
   {t:'Leave towels, and make a noise at the far end of the house',fn:()=>{f.e2lMarks='towels';save();say([
    ['','You leave towels on the floor outside their door, warm from the rail. Then you go to the kennel passage and rattle the hounds’ bowls for twenty minutes, so that anybody in the house can tell exactly where you are and that you are not coming nearer.'],
    K76V('(I have found one thing that I can give them, and it is where I am.)')],hub)}}]))}
 const L=[
  ['',m?'The pins come out today, on the kitchen island, under the good lamp. He does it himself, with the small pliers, and you watch, because it is your hand and you like to know how things are done.':'You take the pins out today, on the kitchen island, under the good lamp. They watch every one. They like to know how a thing is done.'],
  ['',m?'There are a lot of marks, with the cast off. He goes over them as he goes, in the voice of a man marking somebody else’s homework.':'There are a great many marks, with the cast off. You go over them aloud as you work.'],
  K76V('This was a heel. This is from the cable ties; they were put on wet and left. This one I cannot account for at all. It is merely where somebody leaned.'),
  K76MV('u sound like a food critic','you sound like a food critic','You sound like a food critic.','You sound like a food critic, V. Two stars.'),
  K76V('I intend to find the man with the boot.'),
  K76MV('why. he did ur job for u','why? he did your job for you','Why? He did your job for you.','Why? He did your job for you, and for free.'),
  K76V('He did not do my job. There is a reason at every cut that I make. He had none. I will not have it said that what he did and what I do are one trade.')];
 const same=()=>{f.e2lMarks='same';apply({aff:1});save();say([
   m?K76MV('they’re the same trade, v','they are the same trade, v','They are the same trade, V.','They are the same trade, V. Ask the guy on the table.'):null,
   ['',m?'He stops with the pliers on the last pin. He does not argue. You have never seen him not argue.':'You stop with the pliers on the last pin. You have an answer to that. You have had it for eleven years, and it does not come.'],
   K76V('Then I would ask you to let me go on being disgusted by his. Of that much I am sure.'),
   K76MV('knock urself out','knock yourself out','Knock yourself out.','Knock yourself out. Be disgusted. It’s free.'),
   ['',m?'He takes the last pin out more gently than he took the first. You pretend that you have not noticed.':'You take the last pin out more gently than you took the first. They pretend that they have not noticed.']],hub)};
 const differ=()=>{f.e2lMarks='differ';apply({aff:1});save();say([
   m?K76MV('fine. it’s different. happy?','fine. it’s a different trade. happy?','Fine. It’s a different trade. Happy?','Fine. It’s a completely different trade. Are you happy?'):K76V('It is a different trade.'),
   m?K76V('No. You do not believe it. You said it to be kind, and I find that harder to hear than the other.'):K76MV('sure it is','sure it is, ur honour','Sure it is.','Sure it is, V. Completely different.'),
   ['',m?'He lays the pins out on the towel in a row, by length. There are six. He looks at them as he looked at the kicked ribs.':'They said it to be kind. You lay the pins out on the towel in a row, by length. There are six. You cannot look at them and keep your face.'],
   K76V('(Six pins, to mend what one bored man did in passing. I have never once had to mend anything of mine.)')],hub)};
 say(L,()=>ask(K73Who(),m?'(He has stopped, with the pliers on the last pin.)':'(One pin left.)',m?[
  {t:'“they’re the same trade, v”',fn:same},{t:'“fine. it’s different. happy?”',fn:differ}]:[
  {t:'Say nothing more',sub:'let them answer it',fn:same},{t:'“It is a different trade.”',fn:differ}]))}
(function(){try{if(typeof K73B==='undefined'||typeof k76Card!=='function')return;const at=id=>K73B.findIndex(b=>b.id===id);
 const b={id:'e2l_marks',t:()=>k84SA()?k76H('The bathroom off the spare room','The boiler, at eleven at night'):k76H('The pins come out','Take the pins out'),sub:()=>'costs time · '+(k84SA()?'the hot water':'the kitchen island'),
  when:()=>['after','act2'].includes(S.phase)&&k73Done('e2l_after')&&k73Fresh(),run:function(){return k76Card('e2l_marks',()=>k84Marks())}};
 const i=at('e2l_rifle');K73B.splice(i<0?K73B.length:i,0,b)}catch(e){}})();

/* ===================================== ENDINGS ===================================== */
const _xe84=extraEnding;extraEnding=function(){const L=_xe84();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,F=f.e2l84||{};
 if(k84SA()){
  if(F.s_table)L.push('V burned his plan for killing Misaki in the study grate, a sheet at a time. The plan was not the book.');
  if(f.e2lVent==='shut')L.push('The vent over V’s desk is boarded shut. He did it himself, so as not to hear what was not his.');
  if(f.e2lMarks==='boiler')L.push('V’s house has two boilers. The hot water has not run out since.');
  if(F.s_book)L.push('V’s ledger says of the river: the date, the address, and that Misaki was recovered alive. He has never written another word about it.')}
 else{
  if(F.i_manner||F.i_snob)L.push('V, who joints men for cause, was sickened by what bored men had done to Misaki’s hand and ribs. Misaki called him a snob about it. He agreed.');
  if(F.i_third)L.push('There are old breaks on Misaki’s films that were never set. V wrote forty pages against Misaki, and not a line against whoever watched a child carry a broken arm.');
  if(f.e2lMarks==='same')L.push('Misaki told V that his trade and the boot’s were the same. He did not argue. He asked to go on being disgusted by the other man’s.');
  else if(f.e2lMarks==='differ')L.push('V laid six pins in a row on a towel: what it took to mend what one bored man did in passing.')}}catch(e){}return L};
/* ===KC84-END=== */
