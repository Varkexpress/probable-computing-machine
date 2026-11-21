/* ===KC102-BEGIN=== */
/* ===================== THE WAR: WHAT THEY ARE BAD AT (kc102) =====================
   The author asked that neither of them be perfect (or that they are, and must be, in everything but emotionally),
   and for Misaki to have more anger; then, that the anger be a seething one, not a physical outburst, because that
   is more destructive. Needs kc73, kc76–kc101.
   Both of them are flawless at the work, because in their work one mistake is the end. Neither has the least idea
   what to do with a feeling. V makes arrangements, quotes figures and leaves the room. Misaki goes cold: silence,
   perfect manners, the one exact sentence that cuts, a ledger of their own. Nothing is thrown. Nothing is broken
   that can be swept up. Each fails the other exactly where the other needs it, and knows it, and does it again.
   kc103 follows from this: the people they froze out did not go.
   1. THE INFIRMARY. Fourteen scenes in kc85's pool (now 195).
        Misaki, cell (at the man they think holds them):  s_tray  s_scream  s_bite
        Misaki, clear:  s_wreck  s_ronin  s_debt  s_four  s_pity
        V (perfect hands; no idea):  s_figure  s_letter  s_wrong  s_board  s_bitten  s_steady
   2. MORNINGS (shared cap, after the route's other mornings): one round an hour; a perfect job, and the car home;
      sorry, in two languages.
   3. THE WORST ROUTE: two more daily scenes for kc97, both about the anger.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via M2 and they/them.
   Notes: docs/notes_kc102.md. Tested in tools/k86_test.js and tools/k102_test.js. */
const K102=()=>{try{return typeof K101==='function'&&K101()}catch(e){return false}};

/* ===================================== MISAKI, CELL ===================================== */
/* ===================================== MISAKI, CLEAR ===================================== */
/* ===================================== V: PERFECT HANDS ===================================== */
/* ===================================== MORNINGS ===================================== */
const K102MORN=[
 {id:'m102_job',when:()=>S.phase==='act2'&&k73Done('e2l_car')&&!k73Done('e2l_row'),run:done=>say([
   N('The job is perfect. A man who owned the building that burned with eleven people in it. Six hundred metres, a moving car, rain.'),
   N(k76M()?'You call it. He takes it. One round. The car rolls to a stop against a bollard as if it had decided to park. You are off the roof and in his car in ninety seconds, and nobody in the street has worked out that anything happened.':'They call it. You take it. One round. The car rolls to a stop against a bollard as if it had decided to park. You are off the roof and in the car in ninety seconds, and nobody in the street has worked out that anything happened.'),
   N('It is the best piece of work that either of you has ever been part of, and in the car neither of you says so.'),
   N(k76M()?'You try. You get as far as “hey” and stop. He looks at you. He opens his mouth and shuts it. Then nobody speaks for the forty minutes home. By the end the air in the car has gone hard and cold, and you are both angry, and could not say at what.':'They begin something. “hey.” It stops. You open your mouth, and close it. Then nobody speaks for the forty minutes home. By the end the air in the car has gone hard and cold, and you are both angry, and could not say at what.'),
   K76MV('(we did it PERFECT. and i can’t even say “good shot.” what is WRONG with us)','(we did it perfectly. and i can’t even say “good shot.” what is wrong with us?)','(We did it perfectly, and I can’t even say “good shot.” What is wrong with us?)','(We did it perfectly, and I can’t even say “good shot” to him. What is wrong with us?)')],done)},
 {id:'m102_sorry',when:()=>S.phase==='act3'&&k73Done('e2l_row')&&!S.f.e2lEnd,run:done=>say(k76M()?[
   N('After the corridor you try to say sorry. You do it the only way you know.'),
   N('At four in the morning you shoot the stone ball off the top of his left gatepost from three hundred metres. Clean. It drops into the drive. It is the best shot you have made since the hand.'),
   M2('(that means sorry. he’ll get it. that’s the clearest sorry i’ve got)','(that means sorry. he’ll get it. that’s the clearest sorry that i have)'),
   N('In the morning there is a reply. He has had the stone ball put back on the post, and on top of it there is a second, smaller ball, of the same stone, carved, very fine.'),
   N('You look at it through the scope. It is beautiful. You have no idea what it means. You are fairly sure that he has no idea what yours meant, and that both of you have just said sorry at enormous expense, and that neither of you heard it.')]:[
   N('After the corridor you try to say sorry. You do it the only way you know.'),
   N('You write it in the ledger, on their page, in the column for the total: “Owed: an apology. By me.” You leave the book open on the desk at that page, with the study window unlatched.'),
   N('At four the stone ball comes off your left gatepost. A rifle, from three hundred metres. Clean.'),
   K76V('(It is a reply. It is a better shot than any they have made since the hand. I do not know whether it says “accepted” or “go to hell.”)'),
   N('You have the ball put back, and a second carved to sit on top of it, which is as near as you can come to saying that you heard. The next night the window is shut, and the ledger has not been touched, and you understand that they never came in. They answered a page that they had not read, and you replied to a shot that perhaps was not a reply at all.')],done)},
 {id:'m102_range',when:()=>['after','act2'].includes(S.phase)&&k73Done('e2l_door')&&!S.f.e2lEnd,run:done=>say(k76M()?[
   N('You go down to his range with the pistol and one box, at six in the morning, and you fire one round. Then you sit on the bench and wait an hour, and fire another.'),
   N('All day. Every round in the black, exactly, one on top of another, until the centre of the paper is a single ragged hole. You do not say anything. You do not feel anything that you would call anything. You are very, very calm.'),
   M2('(the four. the van. the bed. the soup. him. one an hour. i can do this for years)','(the four. the van. the bed. the soup. him. one an hour. i can do this for years)'),
   N('He is behind the line from the third hour. He does not tell you to stop. He does not ask what it is for. At about two he comes forward and puts one round on the bench beside you, a single cartridge, and steps back.'),
   N('You load it. You fire it, on the hour, into the same hole. Nobody speaks until the light in the stairwell goes off on its timer at nine, and then you go up, and he goes up, by different stairs.')]:[
   N('They go down to the range at six with one box. You hear the first shot from the study. An hour later, the second.'),
   N('All day, one round an hour, every one into the same hole. They do not speak. They sit on the bench between rounds with their hands on their knees, perfectly still. You have seen them put a round past your ear in front of a hundred and forty people, and this frightens you more.'),
   K76V('(I could stop them. I could say a sentence. I have none that would not be an order or a figure.)'),
   N('At two you go forward and put one round on the bench beside them, a single cartridge, and step back. It is all that you know how to give: one more of the thing that is hurting them, because they are asking for it.'),
   N('They fire it on the hour into the same hole. Nobody speaks until the stairwell light goes off at nine. You go up by the front stair, and they by the back, and in the morning the target is in your study, folded, on the desk, with nothing written on it.')],done)}];
const _me102=morningEvent;morningEvent=function(done){try{if(S&&K102()&&!(S.kd&&S.kd.med)&&!(typeof k101Pending==='function'&&k101Pending())&&S.f.e2lMornDay!==S.day&&typeof mbOk==='function'&&mbOk()){
  const e=K102MORN.find(x=>!S.seen[x.id]&&x.when());if(e){S.seen[e.id]=1;S.f.e2lMornDay=S.day;mbUse();save();go(cutBg('#0b0a0c'));return e.run(()=>_me102(done))}}}catch(e){}return _me102(done)};

/* ===================================== THE WORST ROUTE ===================================== */
if(typeof K97_MIND!=='undefined'){
 K97_MIND.fray.push([N('You wake up angry. Not at him; at all of it. It is the first thing you have felt in two days and you grab it with both hands.'),
  M2('(GOOD. good. stay angry. angry gets up. angry eats. angry kills four guys and a van)','(good. good. stay angry. angry gets up. angry eats. angry kills four men and a van)'),
  N('You hold on to it all morning, lying very still, hating the tray, the light, the green dot, the drain, one at a time, thoroughly. It is wonderful. By noon it has gone grey at the edges, like a coal, and you blow on it, and blow on it, and it goes out anyway.')]);
 K97_MIND.thin.push([N('You try to make yourself angry. You go through the four on purpose, the bald one, the van, the way the driver looked away. You used to be able to light a whole day off the driver.'),
  N('Nothing catches. You know they deserve it. You cannot feel that they do.'),
  M2('(u used to be so ANGRY. it was the best thing about u. where did it go)','(you used to be so angry. it was the best thing about you. where did it go?)'),
  N('You lie there and miss your own temper the way you would miss a dog.')])}

/* ===================================== ENDINGS ===================================== */
const _xe102=extraEnding;extraEnding=function(){const L=_xe102();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const F=S.f.e2l85||{};
 if(F.s_wreck)L.push('On the second clear morning Misaki thanked V by name, perfectly, all day. They had never hurt anybody so badly, and they did not touch him.');
 if(F.s_debt)L.push('“you had no right.” V entered the river on Misaki’s page, as a credit, to be kind. Misaki said “ok,” and nothing else for six days.');
 if(F.s_figure)L.push('Misaki asked V whether they would be all right. He gave them a figure.');
 if(F.s_letter)L.push('V wrote Misaki a letter in the infirmary, three drafts. It is the most exactly true thing he has written. He burned it.');
 if(F.s_bite)L.push('There are tally marks on the infirmary wall behind the bed, in fours. At the end of the last row there is one more, in pencil, in a neat hand.');
 if(S.seen.m102_sorry)L.push('After the corridor they apologised to each other: a shot and a carved stone ball. Neither understood the other.');
 if(S.seen.m102_range)L.push('Misaki once spent a day on V’s range firing one round an hour into the same hole. He brought the last round down himself.')}catch(e){}return L};
/* ===KC102-END=== */
