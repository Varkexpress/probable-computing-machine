/* ===KC75-BEGIN=== */
/* ===================== THE HOUNDS LISTEN TO TWO PEOPLE (kc75) =====================
   V can set the hounds on anyone, and they are vicious when he does. They also listen to Misaki.
   1. Enemies to lovers (S.f.e2l, kc73/kc74): after kc74's kennel at three, a war beat in the warehouse yard. V sets the
      hounds on Misaki for real; they stop because Misaki tells them to. Choice per POV, flag S.f.e2lLoose:
      Misaki 'word' (says V's kennel word in V's voice) | 'hand' (holds out an open hand, as at the kennel gate);
      V 'again' (says the word a second time; nobody moves) | 'called' (calls them back). Ending lines read the flag.
   2. Normal route: a night walk on the towpath (S.f.k75Walk 'off'|'look') where Misaki stops the black hound mid-lunge
      on a stranger with one word, and a short follow-up at the gate (S.f.k75Gate).
   Rules: hounds unnamed, V never contracts, Misaki via MV, Misaki is they/them. Test: node tools/k75_test.js */
const k75E=()=>{try{return typeof K74N==='function'&&K74N()&&typeof k73Done==='function'}catch(e){return false}};
const k75M=()=>S.pov!=='v';
const K75V=t=>['K9',t];
const K75MV=(...a)=>['hitmeuppp',MV(...(a.length===1?[a[0],a[0],a[0],a[0]]:a.length===2?[a[0],a[0],a[1],a[1]]:a.length===3?[a[0],a[0],a[1],a[2]]:a))];
const k75T=w=>{try{if(typeof k74Tally==='function')k74Tally(w)}catch(e){}};

/* ---------- 1 · the warehouse yard (enemies to lovers) ---------- */
const k75LooseOk=()=>k75E()&&k73Done('e2l_kennel')&&!k73Done('e2l_truce')&&!S.f.e2lLoose&&S.f.e2lLast!==S.day;
function k75Loose(){go(cutBg('#07070a'));S.f.e2lLast=S.day;save();const m=k75M(),k=S.f.e2lKennel;
 const L=m?[
  ['','Two in the morning, the long yard behind the foundation’s warehouse on the river, where he runs the hounds when the park is full of joggers. You are here for his car. You have wire cutters in one hand and the rifle across your back.'],
  ['','The floodlights come on. He is on the loading dock in his coat, with four leads over one arm and nothing on the end of them.'],
  K75V('You have cost me a mug, a lock, a wall and a great deal of sleep. I warned you about this yard.'),
  K75MV('u warned me about everything','u warned me about everything. still here','You warned me about everything, V. I’m still here.','You’ve warned me about every room you own. I’m still standing in one of them.'),
  K75V('Yes. This is the last one.'),
  ['',(k==='set'?'At the kennel he said the word and they stopped at the gate. There is no gate here. ':'')+'He says one word, not loudly, and the hounds come out of the dark of the dock.'],
  ['','They do not bark. Four of them across forty metres of concrete, low and silent and far too fast, the black hound in front with its lips back off every tooth it has.'],
  K75MV('(one: the fence. two: the fence. three: u will not make the fence)'),
  ['','You do not make the fence. The black hound takes your boot heel and the leather goes like paper. The grey hound hits your other side, and you are on your back on the concrete with the rifle under you, and everything is teeth.']]:[
  ['','Two in the morning. Camera four, the yard behind the warehouse on the river: a small figure in a hoodie at your car, with wire cutters.'],
  ['','You have warned them about your wall, your kennel and your locks. '+(k==='set'?'At the kennel you said the word and the black hound stopped a foot short of the gate. There is no gate here.':'They have gone through all of it.')],
  K75V('(This is the last warning. They have had enough of them.)'),
  ['','You turn on the floodlights and go out onto the loading dock with four leads over your arm and nothing on the end of them.'],
  K75MV('oh, fuck','oh, fuck. hi','Oh, fuck. Hi, V.','Oh, fuck. Hi, V. Is this the part where you monologue?')];
 const tail=[['','In the morning there is a text on '+(m?'your':'their')+' phone, sent at four.'],
  K75V('(text) They have never once refused me. In March I set them on a man in a car park and they had him on the ground before I had finished the word.'),
  K75MV('(text) and?','(text) and they won’t do it to me','(text) And they won’t do it to me.','(text) And they won’t do it to me. You didn’t know that.'),
  K75V('(text) I know it now.')];
 const end=(L2)=>say(L2.concat(tail),hub);
 const word=()=>{S.f.e2lLoose='word';k75T('m');save();end([
  ['','“Stay.” It comes out in his voice, the exact flat weight of it. You have heard him say it through a kennel wall for a month.'],
  ['','The black hound stops with your ankle in its mouth. It does not bite down. It looks at you. Then it opens its jaws, backs off one step, and sits.'],
  ['','The grey hound sits. The pale hound lies down where it is. The old hound arrives last, blowing hard, and stands over you with a leg on either side of your chest, facing the dock.'],
  K75V('(from the dock) …Again.'),
  ['','He says the word again. Nobody moves. The black hound looks back at him over its shoulder, the way it looks at a door it is not allowed through.']])};
 const hand=()=>{S.f.e2lLoose='hand';k75T('m');save();end([
  ['','You stop fighting. You let go of the rifle and hold your hand out flat, palm up, under the black hound’s nose. '+(k==='fed'?'You held the meat out like that at the kennel gate.':'It is how you would hold it out to anything you did not want to kill.')],
  ['','There is nothing in it. The black hound lets go of your boot anyway, and smells your palm, and sits.'],
  ['','The others stop where they are. The old hound arrives last, blowing hard, and lies down along your side with his back to the dock.'],
  K75MV('(they listen to me. they LISTEN to me)','(they listen to me. he didn’t know. i didn’t know)','(They listen to me. He didn’t know. I didn’t either.)','(They listen to me too. He didn’t know that. Neither did I, until the one with my boot in its mouth sat down.)'),
  K75V('Come.'),
  ['','They go back to him slowly, every one of them looking back, except the old hound, who stays on the concrete beside you until you are over the fence.']])};
 const go2=()=>{say([
  ['','You say the word. They go out of the dark of the dock together, silent and low, the black hound in front with its lips off its teeth, and for two seconds you watch the thing you built do exactly what you built it for.'],
  ['','Misaki makes nine metres. The black hound takes their boot heel and they go down on the concrete, and the grey hound is on their other side, and you hear the leather go.'],
  ['','Then Misaki says something you cannot hear. The black hound stops with their ankle in its mouth, opens its jaws, and sits.'],
  ['','The grey hound sits. The pale hound lies down. The old hound limps the whole forty metres, last, and stands over Misaki with his back to you.']],()=>ask('K9','(They have never once refused you.)',[
   {t:'Say the word again',sub:'louder',fn:()=>{S.f.e2lLoose='again';k75T('m');save();end([
    ['','You say it again, louder, in the voice you use on the board. Nobody moves. The black hound looks back at you over its shoulder, the way it looks at a door it is not allowed through, and stays where it is.'],
    K75MV('...they don’t want to','...they don’t want to, V','They don’t want to, V.','They don’t want to, V. I think that’s the first time anyone’s told you no and meant it.'),
    ['','Misaki gets up, slowly, and walks out of the yard backwards with the rifle on you. Four hounds watch them go and do not follow.']])}},
   {t:'Call them back',sub:'“Come.”',fn:()=>{S.f.e2lLoose='called';k75T('v');save();end([
    K75V('Come.'),
    ['','They come, slowly, all except the old hound, who lies down on the concrete beside Misaki and will not be moved, and you do not try.'],
    K75MV('(from the ground) why’d u stop','(from the ground) why’d u call them off','Why did you call them off?','Why did you call them off? They’d already stopped.'),
    K75V('They had already decided. I would rather they did not see me lose an argument.'),
    ['','Misaki goes over the fence with a torn boot and the rifle on you the whole way. You stand on the dock until the old hound comes back on his own, at five.']])}}]))};
 say(L,()=>m?ask('hitmeuppp',k==='fed'?'(The black hound has your ankle. The old hound you fed through the bars is still coming, a long way behind.)':'(The black hound has your ankle. The old hound is still coming, limping, a long way behind.)',[
  {t:'Say the word he says at the kennel',sub:'“stay”',fn:word},
  {t:'Let go of the rifle. Hold your hand out, open',sub:'nothing in it',fn:hand}]):ask('K9','(Four hounds in the dark behind you, waiting for one word.)',[
  {t:'Set them on Misaki',sub:'you mean it',fn:go2}]))}
const _sh75=sideHub;sideHub=function(late){const o=_sh75(late);try{if(!S)return o;
 if(k75LooseOk())return o.concat([{t:'⚔ '+(k75M()?'His yard by the river, at two':'The warehouse yard, at two'),sub:'costs time · the war · he says the word',dis:!!late,fn:()=>{spend();k75Loose()}}]);
 if(k75WalkOk())return o.concat([{t:k75M()?'Walk the hounds with V':'Walk the hounds with Misaki',sub:'costs time · the towpath, after midnight',dis:!!late,fn:()=>{spend();k75Walk()}}]);
 if(k75GateOk())return o.concat([{t:'The gate, the black hound and a courier',sub:'costs time · somebody is shouting',dis:!!late,fn:()=>{spend();k75Gate()}}])}catch(e){}return o};

/* ---------- 2 · the normal route ---------- */
const k75Norm=()=>{try{return S.phase==='normal'&&!(typeof E2L==='function'&&E2L())&&!isLone()&&!(S.kd&&S.kd.med)&&tier()>=1}catch(e){return false}};
const k75WalkOk=()=>k75Norm()&&!S.f.k75Walk&&S.day>=3;
const k75GateOk=()=>k75Norm()&&!!S.f.k75Walk&&!S.f.k75Gate&&S.day>(S.f.k75WalkDay||0)+1;
function k75Walk(){go(cutBg('#06080a'));S.f.k75WalkDay=S.day;save();const m=k75M();
 say([['','The towpath after midnight: four hounds, two people, and the canal going by like oil. '+(m?'Halfway along V hands you the black hound’s lead without a word, the way you would hand somebody a coat.':'Halfway along you hand Misaki the black hound’s lead without a word, the way you would hand somebody a coat.')],
  ['','Under the bridge a man steps out of the dark with a knife held low, the way people hold them when they have done this before.'],
  ['Stranger','Wallets, phones, nobody needs to—'],
  ['','He does not finish. The black hound goes for him before anybody has said anything at all. The lead tears out of '+(m?'your':'Misaki’s')+' hand, and the hound is not a dog any more, it is a noise and a great many teeth going for his throat. He gets his arm up in time, and it does not help him much.']],
 ()=>ask(m?'hitmeuppp':'K9',m?'(The black hound is on him. V has not moved.)':'(The black hound is on him. You have not said a word. Neither has Misaki.)',[
  {t:m?'“Off.”':'Wait. See what Misaki does',fn:()=>{S.f.k75Walk='off';save();say([
   ['',m?'You say it once, not loudly. The black hound stops mid-lunge with his sleeve in its teeth, lets go, and comes back to your side and sits, as though it had never been anywhere.':'Misaki says “off,” once, not loudly. The black hound stops mid-lunge with his sleeve in its teeth, lets go, and goes back to sit at Misaki’s side, as though it had never been anywhere.'],
   K75V('They have never done that for anybody but me.'),
   K75MV('guess they like me','guess they like me better','I guess they like me better.','Guess they like me better. Don’t take it personally. Actually, do.'),
   ['','The man is gone up the towpath holding his arm. V picks the knife up in a handkerchief and drops it in the canal, and the walk goes on.']],hub)}},
  {t:m?'Look at V':'Say nothing. Let it go on',fn:()=>{S.f.k75Walk='look';save();say([
   ['',m?'You look at V. V looks at you. The black hound does not stop.':'You look at Misaki. Misaki looks at you. The black hound does not stop.'],
   ['',m?'In the end you say “off,” because he will not. It lets go at once and comes back to you, not to him.':'In the end Misaki says “off.” It lets go at once and goes back to Misaki, not to you.'],
   K75V('I wanted to see whether they would do it for you. I did not want to be the one who asked.'),
   K75MV('creep','u could’ve just asked','You could have just asked.','You could have just asked, V. I’d have said yes. I’d have said it to them, too.')],hub)}}]))}
function k75Gate(){go(cutBg('#0a0a0c'));S.f.k75Gate=1;save();const m=k75M();
 say([['','Eleven in the morning. A courier has tried to climb V’s gate with a parcel he could have left on the step, and the grey hound has him pinned against the bars by the coat, snarling an inch from his ear. The other three stand behind her and wait to be told.'],
  ['',m?'V is at the board meeting. You are the only one home.':'You are at the board meeting. Misaki is the only one home, and the camera on the gate shows you all of it on your phone, under the table.'],
  K75MV('down','down. DOWN. thank u','Down. Thank you. Good. Good hound. Good.','Down. Thank you. Good hound. The man is a courier, which is a crime, but not one we kill for.'),
  ['','The grey hound lets go and sits. The courier leaves the parcel on the wrong side of the gate and runs.'],
  K75V(m?'(text) The camera shows you stopped her with one word. They do not do that for my staff. They do not do it for Ronin.':'(text) I watched that. They do not do it for my staff. They do not do it for Ronin.'),
  K75MV('(text) what can i say','(text) what can i say. they know who’s in charge','(text) What can I say. They know who’s in charge.','(text) What can I say. They know who feeds them the good ham.')],hub)}

/* ---------- 3 · what it feeds: the ending lines ---------- */
const _xe75=extraEnding;extraEnding=function(){const L=_xe75();try{if(!S||!S.f)return L;const f=S.f;
 if(f.e2l===1&&f.e2lLoose&&!S.rom&&!S.vrom&&!f.k28pair){
  if(f.e2lLoose==='word')L.push('V set the hounds on Misaki once, in the yard behind the warehouse. Misaki stopped them with his own word, in his own voice. He has not set them on anyone since without looking at Misaki first.');
  else if(f.e2lLoose==='hand')L.push('The black hound still checks Misaki’s open hand for meat. There has never been any in it.');
  else if(f.e2lLoose==='again')L.push('V said the word twice in the warehouse yard, and nobody moved. It is the only order the hounds have ever refused him.');
  else if(f.e2lLoose==='called')L.push('V called the hounds off Misaki after they had already stopped. He says he did it so they would not see him lose. Misaki says he did it so they would not have to choose.')}
 else if(f.k75Walk&&!f.e2l)L.push('The hounds answer to two people. Anyone else on the towpath after midnight finds out the hard way.')}catch(e){}return L};
/* ===KC75-END=== */
