/* ===================== HARDER, AND HIM WATCHING (kc55) =====================
   1. V's side of the recovery, with nobody to tell.
   2. Misaki refuses to be made less by what happened. She gets harder, colder, quicker, better at the work; more
      "competent" than she has ever been. V can see exactly what it is and cannot make himself stop her, because
      stopping her would be telling her she is broken, and because some of it is what he would do.
   Scenes run in the aftermath order after the recovery scenes (both settings). */
const hdEv=(id,when,run)=>kdEv(id,()=>!S.f[id]&&when(),done=>{S.f[id]=1;save();run(done)});
/* ---------- V's side of the recovery ---------- */
hdEv('kd_v_ledger',()=>S.pov==='v'&&kdD()>=3,done=>say([
 ['','He keeps a ledger of her recovery in the same book he keeps the house accounts in, because it is the only book he trusts. Weight. Sleep. Composure, his estimate. Light off, in seconds.'],
 ['','The weight goes up. The hand improves. Every column he can measure is better than the week before.'],
 ['','There is no column for the thing that is wrong. He has tried to draw one three times. He does not know what to head it.'],
 ['K9','(I can measure everything about her except whether she is still in there.)']],done));
hdEv('kd_v_kitchen',()=>S.pov==='v'&&kdD()>=5,done=>say([
 ['','Four in the morning. He is in the kitchen with the light off, because she sleeps badly with light coming under the door, and he cannot sleep at all.'],
 ['','The grey hound comes and leans on his leg. He puts his hand on the seam down her shoulder, the one he sewed when she was a pup, and for a long time he does not move.'],
 ['K9','(I know how to fix a hound. You open it and close it and it lives or it does not. I do not know how to fix the thing I am looking at, and I am the one who was four feet away for nine days.)'],
 ['','He goes back to bed at six and lies there until seven, so that when she comes down he will have been asleep.']],done));
hdEv('kd_v_nobody',()=>S.pov==='v'&&kdD()>=7&&frT('r')>=1,done=>say([
 ['','Ronin asks him, on the roof, how he is doing. Nobody else has.'],
 ['K9','I am well.'],
 [RN,'Yeah. Me too. I’m great. Sleepin’ like a baby. Ain’t thought about two streets once.'],
 ['','They stand there not looking at each other. Below them the city is loud about something.'],
 [RN,'You can’t tell her, can you. That you’re fucked up about it. ’Cause then it’s about you.'],
 ['K9','No.'],
 [RN,'Yeah. Same.'],
 ['','That is the whole conversation. It is the only one he will have about it with anybody, and it lasted under a minute.']],()=>{fr('r',3);done()}));
hdEv('kd_v_tally',()=>S.pov==='v'&&kdD()>=9,done=>say([
 ['','He is cleaning the infirmary, finally, after. Under the bed, scratched into the floor near the wall with something small and sharp, there is a tally. Short lines, in groups of five.'],
 ['','He counts them. More than the nights she was there. She was marking something else. He doesn’t know what. Hours, maybe. Loops of the radio. Times the tall one spoke.'],
 ['','He does not sand it out. He does not tell her it is there. He puts the bed back exactly where it was, over it, and shuts the door, and it is the only thing in his house he has ever kept from her on purpose.']],done));
/* ---------- harder ---------- */
hdEv('kd_hard_first',()=>kdD()>=8&&S.pov!=='v',done=>say([
 ['','You decide, one morning, very clearly, the way you decide on a roof: you are not going to be less.'],
 ['','They took eleven days or nine days or however many it was, and some hours, and some of your hand. They don’t get anything else. They don’t get the way you work. They don’t get to have made you careful.'],
 ['hitmeuppp',MV('(not less. more.)','(not less. if anything, more.)','(Not less. If anything, I’m going to be more.)','(Not less. I refuse. If they took something, I’ll make it back somewhere else, with interest. I’m going to be so much better at this than I was. I’m going to be terrifying.)')],
 ['','You take three contracts that week. You haven’t taken three in a week since you were nineteen.']],()=>{apply({edge:6,heat:4});done()}));
hdEv('kd_hard_work',()=>kdD()>=10&&S.pov!=='v',done=>say([
 ['','You’re better than you were. That’s the frightening thing. Quicker on the setup, colder on the trigger, nothing wasted. You don’t talk to them any more before. You used to talk to them, do a bit, call them sugar. Now you just do it.'],
 ['','A client tells you, on the way out, that you’re the best he’s ever hired. You say thanks. You don’t feel anything about that either. You count the money twice, which you’ve never done.'],
 ['hitmeuppp',MV('(efficient.)','(efficient. that’s the word.)','(Efficient. That’s what I am now.)','(I’m so good now. I don’t even hum. I used to hum. When did I stop humming.)')]],()=>{apply({edge:4,yen:20000});done()}));
hdEv('kd_hard_rule',()=>kdD()>=12&&S.pov!=='v',done=>say([
 ['','A man on his knees in a car park. He has a kid’s car seat in the back of his car. You see it. You used to have a thing about car seats: you’d pass, or wait, or do it somewhere the kid would never have to see.'],
 ['','You don’t pass. You don’t wait. It’s faster this way, and the car seat is empty, and the job is the job.'],
 ['','On the drive home you try to remember why you ever had the rule about car seats. You know you had a reason. You can’t find it. It’s gone, the same place the hours went.'],
 ['hitmeuppp',MV('(whatever.)','(whatever. it was a stupid rule.)','(It was a soft rule. I don’t need soft rules.)','(It was a soft rule. Soft rules are how you end up in a van. I’m not ending up in a van again.)')]],()=>{apply({edge:5,heat:3});done()}));
hdEv('kd_hard_angel',()=>kdD()>=11&&frT('a')>=1,done=>{const m=S.pov!=='v';say([
 [AN,'babe. you took the job on the man with the kid. you never take those. you have a rule.'],
 ['hitmeuppp',MV('had.','had a rule.','I had a rule.','I had a rule. Rules are weight. I’m travelling light now.')],
 [AN,'that’s not light. that’s—'],
 ['','She stops. She looks at Misaki for a while, the way she looks down a scope, and decides not to finish.'],
 [AN,'ok. ok. your call. you know i’d never tell you how to work.'],
 ['',m?'She hugs you on the way out, harder than usual. Over your shoulder, she looks at V, and V looks back, and neither of them says anything, and you notice, and you pretend you didn’t.':'She hugs Misaki on the way out, too hard. Over Misaki’s shoulder she looks at him. He looks back. Neither of them says anything. Misaki notices. Misaki pretends she did not.']],()=>{fr('a',-1);done()})});
/* ---------- V sees it ---------- */
hdEv('kd_v_sees',()=>S.pov==='v'&&kdD()>=10,done=>say([
 ['','She took three contracts this week. She came back from all three without a mark on her and without a word, and ate, and went to bed at nine, and slept, which she has not done since.'],
 ['','He knows exactly what he is looking at. He has looked at it in the mirror. It is what he did after his mother: decided that nothing would ever make him less, and became something nothing could touch, and called it competence, and it was.'],
 ['K9','(She is turning into me. She is doing it on purpose, and very well, and faster than I did.)']],()=>ask('K9','(He could say something.)',[
  {t:'Say something.',fn:()=>{apply({tension:6});say([['K9','You took the car-seat job.'],['hitmeuppp',MV('so?','so? it was a job.','So? It was a job.','So? It was a job. A good one. Clean. Since when do you care about my rules, V, you don’t even let me pick the music.')],
    ['K9','Since always.'],['hitmeuppp',MV('...','don’t. don’t do the careful thing.','Don’t. Don’t do the careful voice.','Don’t. Don’t do the careful voice at me. Everybody does the careful voice. I’m fine. I’m better than fine. I’m the best I’ve ever been. Look at me.')],
    ['','He looks at her. She is the best she has ever been. He can’t find the sentence that says what is wrong with that without saying she is broken, and she will never forgive him for that sentence, and she would be right.'],['K9','I am looking.'],['','He doesn’t say anything else. That night he writes the sentence down, the one he couldn’t say, and burns the page.']],done)}},
  {t:'Say nothing. Make her dinner.',fn:()=>{apply({heart:-2});say([['','He makes her dinner. She eats all of it. She says it’s good. It is good. He watches her eat and thinks about every person he has ever seen go cold on purpose, and how none of them came back, and how he never once asked them to.'],
    ['K9','(If I stop her I am telling her she is less. If I do not stop her I am watching her become nothing anyone can touch. I cannot do either. So I am doing nothing, carefully, which is the one thing I promised I would never do to her again.)']],done)}}])));
hdEv('kd_v_cant',()=>S.pov==='v'&&kdD()>=14&&S.f.kd_v_sees,done=>say([
 ['','She comes home at three in the morning from a job and walks past him in the kitchen without seeing him, and washes her hands once. Once. She used to wash them three times: one for the job, one for the walk home, one for luck.'],
 ['','He stands there with the kettle. He thinks about saying her name. He thinks about the careful voice. He thinks about her face when she said “look at me.”'],
 ['','He does not say anything. He makes two cups. He drinks one. He leaves the other on the island where she will find it in the morning, and she finds it in the morning, and drinks it cold, and says thanks, and goes to work.'],
 ['K9','(I could not keep them from taking her. Now I cannot keep her from taking herself, a little at a time, in a direction I know all the way to the end. I am very good at a great many things. I am no good at all at this.)']],()=>{apply({heart:-2});done()}));
(function(){if(typeof KD_ORDER==='undefined')return;KD_ORDER.push('kd_v_ledger','kd_v_kitchen','kd_v_nobody','kd_v_tally','kd_hard_first','kd_hard_work','kd_hard_angel','kd_v_sees','kd_hard_rule','kd_v_cant')})();
const _xeKD55=extraEnding;extraEnding=function(){const L=_xeKD55();if(!S||!S.f)return L;
 if(S.f.kd_hard_first)L.push('She is the best she has ever been. Faster, colder, nothing wasted. She doesn’t hum on jobs any more, and she washes her hands once.');
 if(S.f.kd_v_sees)L.push('V knows exactly what she is turning into; he turned into it himself. He has never once found the sentence that would stop her without telling her she was broken. He makes two cups every night she works.');
 return L};
