/* ===================== td25: the black bath, the hotel, the call =====================
   - After a job, V washes Misaki's hair in the blackstone bath: his good pyjamas, both half asleep, red water.
   - V needs less sleep than anyone has a right to. Misaki goes under the water and stays there, and never drowns.
   - Once, in a hotel, Ronin walked in on the red water and her stillness and thought V had killed her. The call, the next day.
   Voices: V never contracts. Misaki through MV (plainer after the kidnapping). */
const k25Ok=()=>S&&S.phase!=='taken'&&!isLone()&&!(S.f&&S.f.abroad);
const k25Streak=()=>!(typeof k22Hair==='function'&&k22Hair());

K22EV.push(
 {id:'k25_bath',when:()=>k25Ok()&&tier()>=2&&(S.f.k22art||S.done.job||S.day>=6),run:done=>{const m=S.pov!=='v';const post=typeof k22Post==='function'&&k22Post();
  say([
   ['',m?'After the job. Three in the morning. V’s bathroom: black stone, floor to ceiling, so dark the candle seems to be floating. You are in the bath to your shoulders and the water has gone the colour of weak tea, then the colour of something else.':'After her job. Three in the morning. Your bathroom: black stone, floor to ceiling, one candle. She is in the bath to her shoulders, and the water has gone the colour of weak tea, then the colour of something else.'],
   ['',m?'None of it is yours. You checked twice in the car.':'None of it is hers. She told you twice in the car, flatly, so that you would stop looking at her hands.'],
   ['',m?'V is kneeling on the bath mat in his good pyjamas, the navy silk ones with the piping, sleeves rolled to the elbow, washing your hair with the expensive shampoo like it is an appointment he made months ago.':'You kneel on the bath mat in your good pyjamas, the navy ones, sleeves rolled to the elbow. You wash her hair with the expensive shampoo, slowly, the way you would clean something you meant to keep.'],
   k25Streak()?['',m?'He works the red streak last. It is the only red in the room he is gentle with.':'You work the red streak last. It is the only red in the room you are gentle with.']:['',m?'He works the short layers at the back with his fingertips. You flinch on the left. He moves to the right without being told and stays there.':'You work the short layers at the back with your fingertips. She flinches on the left. You move to the right and stay there.'],
   post?['',m?'You do not let anyone stand behind you any more. You let him kneel behind you with his hands in your hair. You have not decided what that means. You are too tired to decide.':'She does not let anyone stand behind her any more. She lets you kneel behind her with your hands in her hair. You do not say anything about it, in case saying it makes it stop.']:null,
   ['','Neither of you is fully awake. The water steams. The candle gutters. Somewhere under the house a hound turns over in its sleep and the whole floor seems to sigh.'],
   ['',m?'You tip your head back and slide under. All the way. The water closes over your face and the room goes red and quiet and very, very far away.':'She tips her head back and slides under. All the way. You keep your hand where her hair was and count, out of habit, and then stop counting, because she always comes back up.'],
   ['',m?'You can stay down a long time. You always could. Under the water nothing is looking at you, and nothing is asking you anything, and you have never once drowned. You are not sure the water would know how.':'She can stay under longer than anyone you have ever met. She has never once drowned. You are not sure the water would dare.'],
   ['',m?'When you come up he is exactly where he was, holding the shower head like a man waiting for a train, rinsing water already running.':'When she comes up you are exactly where you were, rinse water already running.'],
   ['K9','Eyes closed.'],
   ['hitmeuppp',MV('they were closed','they were closed. they’re always closed under there.','They were closed.','They were closed. Thank you for waiting.')],
   ['',m?'He rinses until the water at the drain runs clear, then a little longer. Then he wraps you in a towel the size of a bedsheet and goes to bed for exactly three and a half hours, which is all he ever needs, and is up again before you have finished drying your hair.':'You rinse until the water at the drain runs clear, then a little longer. Then you sleep for three and a half hours, which is all you have ever needed, and are back in the kitchen before she has finished drying her hair.']].filter(Boolean),()=>{apply({aff:3});if(S.dark&&typeof calm==='function')calm(8);done()})}},
 {id:'k25_hotel',when:()=>k25Ok()&&frT('r')>=1&&tier()>=2&&!!S.seen.k25_bath,run:done=>{const m=S.pov!=='v';
  say([
   ['',m?'You still think about the hotel.':'You still think about the hotel.'],
   ['',m?'A job across the river last winter, a suite on the fourteenth floor, a bath much too white for what was going into it. V washing your hair. You under the water, perfectly still, eyes closed, the way you go.':'A job across the river last winter, a suite on the fourteenth floor, a bath much too white for what was going into it. You washing her hair. Misaki under the water, perfectly still, eyes closed, the way she goes.'],
   ['','Ronin had a key card. Ronin always has a key card. He came in to drop off a bag, followed the steam into the bathroom, and saw: red water, '+(m?'you':'Misaki')+' not moving, '+(m?'V':'you')+' kneeling over the bath with '+(m?'his':'your')+' sleeves rolled up and '+(m?'his':'your')+' hands wet to the elbow.'],
   ['','He did not say anything. He reached for his crowbar.'],
   ['',m?'You came up out of the water at exactly that moment, gasped, saw Ronin with a crowbar raised over V’s head, and said, very calmly:':'Misaki came up out of the water at exactly that moment, gasped, saw Ronin with a crowbar raised over your head, and said, very calmly:'],
   ['hitmeuppp','hi ronin. shampoo’s on the left.'],
   ['','Ronin put the crowbar down. Ronin left. Ronin did not answer his phone for nineteen hours.']],()=>{
  say([
   ['',m?'The call, the next day. Ronin rang V. Not the server. V. You were on the couch with your hair still damp.':'The call, the next day. Ronin rang you. Not the server. You.'],
   [RN,'Vee.'],
   ['K9','Ronin.'],
   [RN,'I’m callin’ about the… about yesterday.'],
   ['K9','I assumed.'],
   [RN,'I had the crowbar up, Vee. I had it up. I was gonna. I was really gonna. I want you to know that.'],
   ['K9','I know. I saw the angle. It was a good angle.'],
   [RN,'...Thank you.'],
   [RN,'She just goes under like that? Like a corpse in a pond? On purpose?'],
   ['K9','She finds it restful.'],
   [RN,'Restful. The Lord as my witness. I been to six exorcisms and I ain’t never been so scared in my life.'],
   ['K9','For future reference, if I ever do kill her, I will not wash her hair first.'],
   [RN,'That ain’t the comfort you think it is, Vee.'],
   ['','A long pause. Somewhere on the line a kettle starts to whistle.'],
   [RN,'...You washin’ her hair, though. That’s nice. That’s real nice. Don’t tell her I said that.'],
   ['K9','She is listening. You are on speaker.'],
   ['hitmeuppp',MV('hi ronin','hi ronin. thanks for almost avenging me','Hi, Ronin. Thank you for almost avenging me.','Hi, Ronin. Thank you for the crowbar. I mean it.')],
   ['','Ronin hangs up. Then he sends, in the server, without comment, a photograph of a rubber duck with a tiny crowbar drawn on it in marker.']],()=>{fr('r',4);apply({aff:2});done()})})}});

(function(){const vIns=o=>TOPICS_V.splice(TOPICS_V.length-1,0,o),mIns=o=>TOPICS_M.splice(TOPICS_M.length-1,0,o);
 vIns({id:'k25_sleep',label:()=>'“do you ever actually sleep”',show:()=>S.phase!=='taken',run:b=>{warm('v','k25_sleep',2);
  say([['K9','Three and a half hours. Sometimes four, if it has been a long week.'],['hitmeuppp','that’s not a human amount of sleep.'],['K9','It is the amount my body has always asked for. Doctors were very interested in it when I was a child. I stopped letting them be interested.'],['K9','It is useful. The city does its worst work between two and five. So do I.']],b)}});
 mIns({id:'k25_water',label:()=>'“Why do you stay under the water so long?”',show:()=>S.phase!=='taken'&&!!S.seen.k25_bath,run:b=>{warm('m','k25_water',2);
  say([['hitmeuppp',MV('it’s quiet','it’s quiet under there. nobody can see you','It is quiet. Nobody can see you, nobody can ask you anything. Everything up here goes away.','Under there nothing is looking at me. I can stay as long as I want. I have never once run out of air. I don’t think about why.')],['K9','You stayed under for four minutes on Tuesday.'],['hitmeuppp','you counted.'],['K9','I always count. I have also always stopped worrying by the second minute. That frightens me more than the four minutes.']],b)}});})();
