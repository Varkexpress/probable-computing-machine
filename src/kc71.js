/* ===================== PEACH (kc71) =====================
   Misaki POV. A night after a job, sleeping at V's: she wakes at three, sure she has a job in the morning, goes down to
   the lowest floor and finds V there in his shirtsleeves making drinks: white peach syrup, water so cold it smokes, clear
   in the glass. He has been awake too long to notice what else went into the jug. She does, after the third. He does
   not, until she is asleep on the floor with the old hound. Once per game. Plays from afterBed, before the night. */
function k71Ok(){try{return !!S&&S.pov!=='v'&&!S.f.k71Peach&&!!(S.done&&S.done.job)&&['normal','act2','act3','epilogue'].includes(S.phase)
 &&!S.dark&&!isLone()&&!(S.f&&S.f.abroad)&&!(S.phase==='normal'&&S.f.kidnapSet)&&!(S.kd&&S.kd.med)&&(S.bed==='vbed'||S.bed==='vcouch')&&tier()>=1}catch(e){return false}}
function k71Below(){return S.phase==='normal'
 ?'the cellar under the cellar, the one with the cold store and the drain in the floor, where he keeps the things that are not for guests'
 :'the lowest floor, past the infirmary door. She walks past it fast and does not look at it'}
function k71Scene(cb){S.f.k71Peach=1;save();const w=S.phase==='epilogue'||tier()>=3;
 say([['','Three in the morning. She is awake all at once, the way she wakes on a job, with her hand already under the pillow.'],
  ['hitmeuppp',MV('(job. i have a job. what time is it.)','(job. i’ve got a job today. what time is it. where are my boots.)','(I have a job today. I’m sure of it. Where are my boots.)','(Job today. I’m certain. I can feel it in my shoulders. Where did I put my boots.)')],
  ['','She has the boots on before she remembers that the job was yesterday, and it went fine, and the money is already in the tin. Her shoulders do not believe her.'],
  ['','The house is dark. There is a light on somewhere below, much further down than the kitchen. She follows it down to '+k71Below()+'.'],
  ['','V is there in his shirtsleeves at a steel table, making drinks. A bottle of white peach syrup. A jug of water so cold it smokes when he pours it. A row of glasses, all clear, all the colour of nothing. He has his reading glasses on top of his head and has forgotten them.'],
  ['K9',MV('It is three in the morning.','It is three in the morning. You should be asleep.','It is three in the morning, Misaki. You should be asleep.','You are awake. I am glad. I did not want to drink these by myself.')],
  ['hitmeuppp',MV('so r u','so are you, dumbass','So are you. What is that.','So are you. What are you making down here, in the murder basement, in your good shirt.')],
  ['K9','Peach. And water. It is the only thing I can drink at this hour that does not keep me awake. Sit down. Mind the drain.']],
 ()=>ask('hitmeuppp',MV('(a glass.)','(he’s holding out a glass.)','(He’s holding out a glass.)','(He’s holding one out. His hand is not completely steady, which is new.)'),[
  {t:'Take it.',fn:()=>k71Drink(cb,w)},
  {t:'Take it, and the stool next to his.',fn:()=>{apply({aff:1});k71Drink(cb,w,1)}}]))}
function k71Drink(cb,w,close){
 say([['',close?'She drags the other stool round so their elbows touch, and he lets her, and the old hound comes down the stairs one step at a time and lies on both their feet.':'She sits across the steel table from him. The old hound comes down the stairs one step at a time and lies on her feet.'],
  ['','The first one is lovely. Cold enough to hurt the teeth. Sweet, then nothing, then sweet again, like a peach that has been in the fridge.'],
  ['hitmeuppp',MV('good','ok this is good','This is really good.','Okay, this is unfairly good. You’ve been hiding this. How long have you been coming down here at three to drink fancy fridge water.')],
  ['K9','Eleven years.'],
  ['','He talks about the hounds. He talks about a ship his father owned and how it listed to port. He says the same sentence about the ship twice, and does not notice, and she does not tell him.'],
  ['','The second one is lovely too. The third one has something under the peach. Something warm at the back of the throat, expensive and quiet, the way the good stuff is quiet.'],
  ['hitmeuppp',MV('(oh.)','(oh. that’s not water.)','(Oh. There’s something in this.)','(Oh. Somebody’s very old bottle of something is in this, and a lot of it.)')],
  ['','She looks at the jug. She looks at the bottle on the shelf behind him, which is clear, and very old, and has a wax seal, and is two-thirds empty. She looks at V, who is pouring her a fourth with total concentration and the reading glasses still on his head.'],
  ['K9','You are very quiet. That is not like you.']],
 ()=>ask('hitmeuppp',MV('(tell him?)','(tell him?)','(Tell him?)','(Tell him what’s in it?)'),[
  {t:'“V. what’s in the jug.”',fn:()=>k71Told(cb,w)},
  {t:'Say nothing. Drink the fourth.',fn:()=>k71Quiet(cb,w)},
  {t:'Tell him it’s the best water you’ve ever had.',fn:()=>k71Quiet(cb,w,1)}]))}
function k71Told(cb,w){S.f.k71How='told';save();
 say([['hitmeuppp',MV('v whats in the jug','v. what’s in the jug.','V. What’s in the jug.','V. Babe. What is in the jug.')],
  ['K9','Peach syrup. And water.'],
  ['hitmeuppp',MV('and','and??','And?','And what else, V.')],
  ['','He looks at the jug for a long time. He looks at the bottle behind him. He takes the reading glasses off the top of his head, finds that they were there, and puts them on.'],
  ['K9','That was a gift from a man in shipping. It was meant to be opened at a wedding. I appear to have put it in the water.'],
  ['K9','At about midnight. I remember deciding the water needed something. I do not remember deciding what.'],
  ['hitmeuppp',MV('lmao','you’ve been drinking this since midnight??','You’ve been drinking this since midnight?','You’ve been drinking wedding liquor out of a jug since midnight and telling me about a boat.')],
  ['K9','So have you. For three glasses.'],
  ['hitmeuppp',MV('four','four.','Four. You poured me four.','Four. You were very careful about the fourth. I watched you.')],
  ['','She means to say something else after that. She has it ready. Then the floor is very comfortable, and the old hound is warm, and V is saying her name in a voice she has only heard him use for the hounds.']],
  ()=>k71Down(cb,w))}
function k71Quiet(cb,w,lie){S.f.k71How=lie?'lied':'quiet';save();
 say([lie?['hitmeuppp',MV('best water ever','best water i’ve ever had. 10/10','It’s the best water I’ve ever had.','Honestly? Best water I have ever had. You should sell it. You should never, ever sell it.')]:['','She drinks the fourth. He pours a fifth for himself and tells her about the ship again, from the beginning.'],
  ['K9',lie?'Thank you. It is only peach.':'It listed to port. I have told you that.'],
  ['hitmeuppp',MV('ya','yeah. port.','Yeah. Port. You said.','You did. Port. Very listy. Tell me again.')],
  ['','At some point she stops being on the stool. The floor is cold and clean and the drain is a nice shape. The old hound arranges himself along her back.'],
  ['','The last thing she sees is V, still at the steel table, holding the jug up to the light and frowning at it like a column of figures that does not add up.']],
  ()=>k71Down(cb,w))}
function k71Down(cb,w){
 say([['','She wakes at eleven in his bed with her boots still on. There is a glass of water on the side table, plain, and two aspirin, and a note on the back of a gas bill in fountain pen.'],
  ['','“The bottle was 1961. It was meant for a wedding. I carried you up four flights, which at my age you will appreciate. The old hound would not let go of your sleeve the whole way. You said a great many things on the stairs about my shirts. I have written them down. — V.”'],
  ['','Under that, in the same pen, smaller: “I did not notice until you were on the floor. I apologise for the floor, and for nothing else.”'],
  ['hitmeuppp',MV('(…)','(i’m never drinking water again)','(I’m never drinking water again.)',S.f.married?'(I am never drinking water again. I married this man. I am going to make him open another one.)':w?'(I am never drinking water again. I am going to marry this man. I am going to make him open another one.)':'(I am never drinking water again. Also I need to know what I said about his shirts.)')]],
  ()=>{apply({energy:-15,aff:3});if(typeof relApply==='function')relApply({trust:2});cb()})}
const _afterBed71=afterBed;afterBed=function(){const a=arguments,self=this;if(k71Ok()&&(globalThis.K71_FORCE||Math.random()<.4))return k71Scene(()=>_afterBed71.apply(self,a));return _afterBed71.apply(self,a)};
if(typeof extraEnding==='function'){const _xe71=extraEnding;extraEnding=function(){const L=_xe71();try{if(S.pov!=='v'&&S.f.k71Peach)L.push(S.f.k71How==='told'?'There is still a jug of peach water in the cellar. Nothing else goes in it now without a label in fountain pen.':'V never found out that she knew about the jug by the third glass. She never told him. She did ask for it again.')}catch(e){}return L}}
