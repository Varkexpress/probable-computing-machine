/* ===================== td29: the four, as they are =====================
   Scenes that lean on what is canon for each of them:
   - V has a code and does not trust anyone easily. He and Ronin clash over codes; Ronin finds V's threats delightful.
   - Ronin: the most unhinged of them, finds joy in it, the Devil in every sentence, sarcasm as armour.
   - Angel: sweet, mature, the reliable one; never kills for herself; never misses.
   - Misaki: the contract killer; whimsical before the kidnapping, plain after; keeps beliefs, not places; used to draw.
   Voices: V never contracts. Ronin drawls. Angel texts in lowercase. */
const k29Ok=()=>S&&S.phase!=='taken'&&!isLone()&&!(S.f&&S.f.abroad);
const k29M=()=>S.pov!=='v';
K22EV.push(
 /* V and Ronin: codes */
 {id:'k29_code',when:()=>k29Ok()&&frT('r')>=1&&S.day>=6&&S.vrom!=='r',run:done=>say([
   ['','The kitchen, late. V and Ronin, a name on a piece of paper between them, and neither of them has touched it.'],
   ['K9','He is on my list. There is a file. There is a court record he bought his way out of. There is a process.'],
   [RN,'There’s a man who hurts kids and walks around breathin’ the same air as me. That’s the whole process, Vee. The rest is paperwork.'],
   ['K9','The paperwork is the difference between us and him.'],
   [RN,'Darlin’, the difference between us and him is that I’m gonna enjoy it and he ain’t.'],
   ['K9','If you take him before the file is closed, Ronin, I will put you in the ground myself. I want you to understand that I mean it.'],
   [RN,'Oh, I know you mean it. That’s the best part. Say it again. Slower.'],
   ['','V does not say it again. V picks up the paper, folds it once, and puts it in his breast pocket. Ronin watches him do it with the delighted expression of a man who has just been handed a dare.'],
   [RN,'Friday, then. After your little file’s all tidy. I’ll bring the crowbar, you bring the paperwork. Romantic.'],
   ['K9','It is not romantic.'],
   [RN,'Everythin’s romantic if you’re me.']],()=>{if(typeof relApply==='function')relApply({rivalry:3});fr('r',1);done()})},
 /* Ronin and the Devil */
 {id:'k29_pew',when:()=>k29Ok()&&frT('r')>=1&&S.day>=9,run:done=>{const m=k29M();
  say([['','Sunday. Ronin sits in the back pew of a church across town, the way he does every week, in his good jacket, with his hands folded and his head bowed like the most devout man in the building.'],
   ['',m?'You sit beside him because he asked. He did not say why. Ronin never says why.':'You sit beside him because he asked. You did not ask why. With Ronin, the why is usually worse.'],
   ['','When the priest says “deliver us from evil”, Ronin murmurs, under his breath, “not today, Father,” and smiles like a man hearing a private joke.'],
   [RN,'(outside, after) Grew up in a pew just like that one. Front row. Every Sunday, every Wednesday, every time somethin’ went wrong in the house, which was a lot of times.'],
   [RN,'They told me the Devil was always watchin’. I took it real personal. Figured if somebody was watchin’, I’d best give him a show.'],
   [m?'hitmeuppp':'K9',m?MV('is he watching now','is he watching now?','Is he watching now?','Do you think he is watching now?'):'Do you believe he is?'],
   [RN,'Darlin’, I made sure. I got him a front-row seat.'],
   ['','He laughs, and lights a cigarette off the church’s candle he slipped into his pocket on the way out, and it is impossible to tell where the joke stops.']],()=>{fr('r',3);done()})}},
 /* Angel: the reliable one */
 {id:'k29_bday',when:()=>k29Ok()&&frT('a')>=1&&S.day>=10,run:done=>{const m=k29M();
  say([['',m?'You come home to a cake on V’s kitchen table. One candle. Your name on it in icing that has clearly been redone twice.':'You come home to find Angel in your kitchen with a cake. One candle. Misaki’s name on it in icing that has clearly been redone twice.'],
   [AN,'ok before u say anything. u never tell anyone ur birthday. u said once u put “march” on a form and it stuck and u don’t know if it’s true.'],
   [AN,'so i picked one. today. it’s today now. i put it in my calendar with a reminder for every year until i die, and i have very good skincare, so that’s a long time.'],
   [m?'hitmeuppp':'K9',m?MV('angel','angel. u didn’t have to','Angel. You did not have to.','Angel. Nobody has ever picked a day for me.'):'She has never let anyone do this.'],
   [AN,'i know i didn’t have to. that’s the whole point of a friend, babe. somebody who does the stuff nobody had to.'],
   ['','She makes everyone sing. Ronin sings in a register that rattles the windows. V sings perfectly on key, formally, like a national anthem. '+(m?'You do not sing. You eat the cake. You let it be your birthday.':'Misaki does not sing. She eats the cake. She lets it be her birthday.')]],()=>{fr('a',4);apply({aff:2});done()})}},
 {id:'k29_angelwhy',when:()=>k29Ok()&&frT('a')>=2&&!!S.seen.k29_bday,run:done=>{const m=k29M();
  say([['','You see the transfer by accident on Angel’s laptop: her entire sponsorship payment for the quarter, sent to a children’s hospital, with no name on it.'],
   [m?'hitmeuppp':'K9',m?MV('angel. that’s all of it','angel that’s ALL of it','Angel, that is all of it.','Angel. That is the whole quarter.'):'Angelic. That is the whole quarter.'],
   [AN,'i know. i don’t need it. i have my followers and my face and my rifle and u guys. that’s everything.'],
   [AN,'i never took a single job for me. not one. the day i do, i want somebody to take my rifle away. that’s the rule. ok? u’re my somebody.'],
   ['','She says it the way she says everything: sweetly, with a smile, as if it is a skincare tip. You understand that it is the most serious thing she has ever asked you.']],()=>{fr('a',3);done()})}},
 /* V's distrust */
 {id:'k29_files',when:()=>k29Ok()&&frT('r')>=1&&frT('a')>=1&&tier()>=1&&S.day>=12,run:done=>{const m=k29M();
  say([['',m?'You find them on the ops deck by accident: four folders, one for each of you. Yours is the thickest.':'You leave the drawer open by accident. Misaki finds them: four folders, one for each of you, updated every January.'],
   ['','Addresses, aliases, bank accounts, every job each of them has ever done that left a trace. The one with your own name on it is in there too. V keeps a file on himself.'],
   [RN,'(in the server, a photograph of his folder) Vee. Buddy. You got my dental records.'],
   ['K9','(server) I have everyone’s dental records.'],
   [AN,'(server) u have MY dental records?? i had veneers!!'],
   ['K9','(server) I know. They are noted.'],
   [m?'hitmeuppp':'hitmeuppp',m?MV('(server) why do you have a file on yourself','(server) why is there one on YOU','(server) Why is there one on you?','(server) Why do you keep a file on yourself?'):'(server) why is there one on you'],
   ['K9','(server) Because I do not trust anybody, and I would be a hypocrite to make an exception for the man I trust least.'],
   [RN,'(server) ...That’s the most romantic thing he’s ever said and it was about himself.'],
   ['','Nobody asks him to stop. Everyone in the server knows he would not, and that the folders are the closest thing V has to saying he would come for any of you, anywhere, with everything he has.']],()=>{if(typeof relApply==='function')relApply({trust:3});done()})}},
 /* Misaki draws the four of them */
 {id:'k29_drawing',when:()=>k29Ok()&&!!S.f.k22art&&frT('r')>=1&&frT('a')>=1,run:done=>{const m=k29M();const post=typeof k22Post==='function'&&k22Post();
  say(post?[['',m?'You open the tablet for the first time in weeks and draw the four of you, at V’s table, from behind: Ronin’s jacket, Angel’s hair, V’s shoulders, your own hood.':'Misaki shows you a drawing on her tablet: the four of you at your table, from behind. Ronin’s jacket, Angel’s hair, your shoulders, her hood.'],
    ['','No faces. You can’t do faces any more. But anyone who knew you would know exactly who each of them was from the backs of their heads.'],
    [AN,'(server) can i print this. can i print this and frame it. i’m printing it.'],
    [RN,'(server) Looks like the back of a real nice album cover. Satan’s Greatest Hits.']]
   :[['',m?'You draw the four of you for fun, the way you used to draw commissions: chibi, huge eyes, Ronin with tiny horns, Angel with a halo and a rifle, V in his coat with the hounds drawn as four very small, very sinister clouds.':'Misaki draws the four of you the way she used to draw commissions: huge eyes, Ronin with tiny horns, Angel with a halo and a rifle, you in your coat with the hounds drawn as four very small, very sinister clouds.'],
    [RN,'(server) The horns are accurate. I’m gettin’ ’em tattooed.'],
    [AN,'(server) MY HALO. i’m making this my profile picture. i’m making it EVERYONE’S profile picture'],
    ['K9','(server) The hounds are not clouds.'],
    ['hitmeuppp','(server) they are to me. sinister clouds.']],()=>{fr('r',2);fr('a',2);done()})}});
(function(){const vIns=o=>TOPICS_V.splice(TOPICS_V.length-1,0,o),mIns=o=>TOPICS_M.splice(TOPICS_M.length-1,0,o);
 vIns({id:'k29_code_m',label:()=>'“what’s your actual code. like the rules.”',show:()=>S.phase!=='taken'&&tier()>=1,run:b=>{warm('v','k29_code_m',3);
  say([['K9','There is a list. Nobody goes on it without a file. Nobody comes off it without the file being closed.'],['K9','Nobody who is not on it is touched. Not a guard, not a driver, not a witness. If I am wrong about someone, I live with the cost. I do not pass it on.'],['hitmeuppp','and if you break it'],['K9','Then the next name on the list is mine. It is already in a folder. Ronin has a copy.']],b)}});
 mIns({id:'k29_contract',label:()=>'“How do you choose which contracts to take?”',show:()=>S.phase!=='taken'&&tier()>=1,run:b=>{warm('m','k29_contract',3);
  say([['hitmeuppp',MV('whoever pays','whoever pays. mostly.','Whoever pays. Mostly. I read the file first. If the file’s bad enough, the money doesn’t matter.','I read the file. If it’s bad enough, I’d do it for free. If it’s not bad enough, there isn’t enough money. Rent is the only reason I ever took the ones in between.')],['K9','And now?'],['hitmeuppp',MV('now i read the file twice','now i read the file twice','Now I read it twice. Then I ask you if you have a thicker one.','Now I read it twice, and then I come and find out whether you already have a folder. You usually do.')]],b)}});})();
