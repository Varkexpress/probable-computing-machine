/* ===================== GETTING BETTER (kc54) =====================
   The recovery is a tragedy too. Everything that heals takes something with it; every milestone is reached and is
   not what it was supposed to be. The better she does, the more alone she is with what didn't come back.
   Scenes run in the aftermath order (KD_ORDER), both settings, both POVs. */
const rhEv=(id,when,run)=>kdEv(id,()=>!S.f[id]&&when(),done=>{S.f[id]=1;save();run(done)});
rhEv('kd_reh_fist',()=>(S.f.kdGripN||0)>=6||S.f.kdCast,done=>{const m=S.pov!=='v';say(m?[
 ['','You make a full fist with the left hand. All the way. It takes everything you’ve got and you hold it for a count of three, and you did it, you actually did it.'],
 ['','You open it and look at it and wait to feel the thing you were waiting for, all those weeks of foam ball and putty and rubber bands. Proud. Relieved. Something.'],
 ['','Nothing comes. You made a fist. It’s a hand. You hold it out in front of you and there is nothing in the whole world you want to pick up with it.'],
 ['hitmeuppp',MV('(cool.)','(cool. it works. great.)','(It works. Great. That’s great.)','(It works. I worked so hard for it to work. I don’t know what I wanted it to work for.)')]]:[
 ['','She makes a full fist at the kitchen island and holds it for three seconds. He has been waiting for this for six weeks. He had planned what to say.'],
 ['','She opens it, looks at it, and goes back to her cereal with the same face she had before, and he does not say any of it.'],
 ['K9','(The hand came back. I had thought that she would come back with it.)']],()=>{calm(-2);done()})});
rhEv('kd_reh_rifle',()=>S.pov!=='v'&&kdD()>=5,done=>say([
 ['','First time on the range since. The rifle comes out of its case and it’s yours, it’s the one you know best in the world, and it feels like somebody else’s.'],
 ['','You settle. You breathe. The hand is fine. The hand is steady. Under the steady, very small, at full draw, there is a tremble that wasn’t there before, the width of a hair.'],
 ['','You miss. Eight hundred metres, no wind, a paper target. You have not missed a paper target since you were seventeen.'],
 ['hitmeuppp',MV('(again.)','(again. it was the scope.)','(Again. It was the scope.)','(It was the scope. It was the light. I’ll go again. I’ll go again until it isn’t the scope.)')],
 ['','You go again forty times. You hit thirty-eight. Thirty-eight is better than almost anyone alive. You drive home and sit in the truck in V’s garage for an hour, because thirty-eight is not forty, and you used to be forty, and now you’re a person who used to be forty.']],()=>{apply({edge:-3});calm(-3);done()}));
rhEv('kd_reh_dark',()=>kdD()>=4,done=>{const m=S.pov!=='v';say(m?[
 ['','You practise turning the light off. It’s a thing you have to practise now, like the physio. Thirty seconds the first night. A minute the second.'],
 ['','On the ninth night you get to four minutes and then you’re on the floor with the light back on and your back against the wall and you don’t remember the part in between.'],
 ['','You write the times in your notes app like a training log. 0:30. 1:00. 1:40. 2:10. 3:00. 4:00. Then a gap. Then 0:30 again.'],
 ['hitmeuppp',MV('(back to start.)','(back to the start. ok. ok.)','(Back to the start. That’s fine. That’s how training goes.)','(Back to thirty seconds. That’s how training goes, you go backwards sometimes, everybody knows that. I’ve trained for things my whole life. I never had to train to be in the dark.)')]]:[
 ['','She is practising the light. He knows because the strip under her door goes dark at eleven every night, for a few seconds, then a minute, then four.'],
 ['','On the ninth night it goes dark for four minutes and then back on, very suddenly, and stays on, and he hears her on the other side of the door doing the counting.'],
 ['','The next night it goes dark for thirty seconds. He realises she has started again from the beginning. He sits down in the corridor and does not go to bed.']],()=>{calm(-2);done()})});
rhEv('kd_reh_adapt',()=>kdD()>=6&&frT('a')>=1&&frT('r')>=1,done=>{const m=S.pov!=='v';say([
 ['','Everyone has learned. That’s the worst part, if you had to choose one.'],
 ['','Angel says “jacket” before she touches a jacket. Ronin knocks before he comes into a room, Ronin, who has never knocked on anything except to break it. V says her name on the stairs. Nobody laughs too loud. Nobody stands behind her. Nobody turns the light off.'],
 ['',m?'They do it so well. They do it without being asked, without ever mentioning it, so smoothly that you would hardly notice, and you notice every single time. You’ve become a thing people walk around carefully. You were never a thing anybody walked around carefully.':'They do it so well. And she notices every time. He watches her notice: the little stillness when Ronin knocks, when Angel says “jacket.” Every kindness is a reminder. There is no way to be kind to her that does not tell her what happened.'],
 ['hitmeuppp',MV('(they’re being so nice.)','(they’re all being so nice. i hate it. i love them. i hate it.)','(They’re being so careful with me. I love them for it. I hate it.)','(They’re being so careful. They’re being so good. I want to scream at them to stop it and I want them never to stop and I can’t say either one.)')]],()=>{fr('a',1);fr('r',1);calm(-2);done()})});
rhEv('kd_reh_perform',()=>kdD()>=7&&tier()>=1,done=>{const m=S.pov!=='v';say(m?[
 ['','You get good at seeming better. It’s just a job, and you’re good at jobs. You laugh at the right times. You eat at the island with your back to the wall and nobody mentions the wall. You say “fine” in a voice that sounds like fine.'],
 ['','And it works. That’s the thing. It works so well that they start to believe it. Angel stops texting at three in the morning. Ronin goes back to the bad jokes. V stops sleeping outside your door.'],
 ['','You did that. You got exactly what you were working for. You lie in bed at three in the morning with the light on, very well, and nobody texts, because you did such a good job of being fine.'],
 ['hitmeuppp',MV('(nailed it.)','(nailed it. nobody’s worried. that’s good.)','(It worked. Nobody’s worried any more. That’s what I wanted.)','(It worked. I fooled all three of them. The best I’ve ever done anything, and the prize is that I’m on my own with it now.)')]]:[
 ['','She is better. Everybody says so. She laughs at the right times and eats at the island and says she’s fine in a voice that sounds like fine.'],
 ['','He stops sleeping outside her door because she asks him to, kindly, with a joke about his back. He goes to his own bed, and lies awake, and at three in the morning he can see the strip of light under her door from the end of the corridor, on, every night.'],
 ['K9','(She is better at seeming better than anyone I have ever met. I taught her nothing; she was always this good. I am the only one who can see the light under the door. I do not know how to tell her I can see it without taking from her the one thing she has managed.)']],()=>{apply({aff:-1});calm(-3);done()})});
rhEv('kd_reh_laugh',()=>kdD()>=8&&frT('r')>=1,done=>say([
 ['','Ronin tells the priest joke. It’s the first time since. Everybody goes still for a second, waiting, the way people wait to see if a dropped glass is going to break.'],
 ['','Misaki laughs. A real one, the big one, head back.'],
 ['','The whole table breathes out. Angel actually claps. Ronin looks like he’s won something. V puts his hand flat on the table, which is the most he does.'],
 ['',S.pov!=='v'?'And you sit there laughing, and you can hear yourself, and it sounds exactly right, and it sounds like somebody in the next room. You did the laugh perfectly. You can’t remember what the joke was. You haven’t been able to remember the end of it since the cell.':'She laughs, and it is exactly right, and he watches her face while she does it, and her eyes are not doing anything at all. She is doing the laugh from memory. She is doing it so they will all breathe out.']],()=>{fr('r',2);calm(-1);done()}));
rhEv('kd_reh_who',()=>kdD()>=10,done=>{const m=S.pov!=='v';say(m?[
 ['','Six weeks. The cast is off. The foot is fine. The stitches are a pale line under your fringe. The doctor, or V, or whoever it is that writes these things down, has written “recovered” on the last page.'],
 ['','You stand in front of the mirror, the one you had a towel over, and look at the person in it. Same face. Same fringe. Healed.'],
 ['hitmeuppp',MV('(who’s that.)','(i know who that is. i do. i just. hm.)','(I know who that is. I do. She looks well.)','(She looks really well. She looks recovered. She looks exactly like the girl who got into the van, and I would give anything to be either one of them.)')],
 ['','You went into that building one person and came out a different one, and everybody spent six weeks getting the first one back. They did a very good job. She’s right there. You just aren’t her.']]:[
 ['','Six weeks. He writes “recovered” on the last page of the file, because medically it is true. Cast off, foot sound, stitches faded, weight back.'],
 ['','He looks at the word for a long time. Then he adds, underneath, smaller: “Not the same.” Then he crosses that out, because it is not a medical observation, and because she would read it one day, and because it is true.']],()=>{calm(-3);done()})});
(function(){if(typeof KD_ORDER==='undefined')return;const ids=['kd_reh_fist','kd_reh_dark','kd_reh_rifle','kd_reh_adapt','kd_reh_perform','kd_reh_laugh','kd_reh_who'];const i=KD_ORDER.indexOf('kd_cast');const at=i<0?KD_ORDER.length:i;KD_ORDER.splice(at,0,...ids)})();
/* the physio and the walks report progress, and the progress doesn't feel like anything */
const _shKD54=sideHub;sideHub=function(late){const o=_shKD54(late);o.forEach(x=>{if(!x||!x.fn||!/^Physio: the hand|^Walk the hounds, a bit further/.test(x.t||''))return;const f=x.fn;x.fn=function(){const before=S.f.kdGripN||0,wb=S.f.kdWalk||0;f.apply(this,arguments);const after=()=>{const g=S.f.kdGripN||0,w=S.f.kdWalk||0;if(g===before&&w===wb)return;const n=Math.max(g,w);const L=['Better than yesterday. You write it down. It doesn’t feel like better. It feels like a number.','The hounds keep pace. You keep pace. Nobody can tell from the outside.','Progress. That’s the word the sheet uses. You keep waiting for it to mean you.','Nearly there, V says. Nearly where.','Almost all the way back. To what, you don’t ask.','Done. Six sessions. You did everything right. It didn’t put anything back that mattered.'];if(!dlg)say([['',L[Math.min(L.length-1,n-1)]]],hub)};setTimeout(()=>{if(!dlg)after()},0)}});return o};
/* endings: what came back, and what didn't */
const _xeKD54=extraEnding;extraEnding=function(){let L=_xeKD54();if(!S||!S.f||!S.kd||!S.kd.t0)return L;
 L=L.map(x=>/^The hand came back/.test(x)?'The hand came back. Every exercise, every day, she never once complained. The hand came back, and she didn’t, not all the way, and nobody can tell but V.':x);
 if(S.f.kd_reh_rifle)L.push('She still shoots thirty-eight out of forty. It is better than almost anyone alive. She used to be forty.');
 if(S.f.kd_reh_who)L.push('Her file says “recovered.” Under it, crossed out so that only he can read it, it says “not the same.”');
 return L};
