/* ===KC78-BEGIN=== */
/* ===================== THE WAR: NOT AN ENEMY, AND STILL IN DANGER (kc78) =====================
   The route's middle conflict. In Act II each of them finds out, privately, that they no longer count the other an
   enemy, and in the same minute is certain the other would still kill them without a second thought: his book is in
   ink and he does not cross things out; they kill for whoever pays and have never taken the car park back. So each
   guards against the other, reads every kindness as preparation, and cannot say it first, because saying it first
   means disarming in front of someone you believe would do it. Needs kc73, kc76, kc77.
   Beats (spliced into kc73's order, behind kc76's cards):
     III e2l_know   the realisation, and the certainty that comes with it        S.f.e2lKnow hide|watch          (free)
         e2l_test   the parapet: a test, read wrongly from both sides            S.f.e2lTest fought|laughed
     IV  e2l_row    the corridor at two in the morning; neither can go first     S.f.e2lRow said|silent  (affection −6)
         e2l_guard  Pier Six: a watchman gets to V because they were watching    S.f.e2lGuard own|blame
                    each other
   After the row: "Sleep in shifts" is refused in the case menu, Misaki is back in the trailer, V's door is locked.
   The boat (kc73) is where it breaks; it opens with a lead-in that reads these flags.
   Also: ⚔ case-menu action "Watch him / Study them" (every kindness read as preparation; S.f.e2l77.tells), two
   mornings (Ronin, Angel), a 3am thread, server lines, ending lines, and kc76's page ("What you believe").
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc78.md. Test: node tools/k78_test.js */
const K78=()=>{try{return typeof K77==='function'&&K77()}catch(e){return false}};
const k78Open=()=>{try{return K78()&&k73Done('e2l_know')&&!S.f.e2lEnd}catch(e){return false}};

/* ===================================== III · THE REALISATION ===================================== */
function k78Know(){k77Go('#07080b');k73Mark('e2l_know',1);const m=k76M(),f=S.f;
 const L=m?[
  ['','A job for the case. V goes into a stairwell to talk to a man who knew the Mimic, and you lie on the roof opposite to cover the door. For nine minutes his back is in your scope at ninety metres, with no wind.'],
  ['','Then you notice what your hands are doing. You are reading the windows above him, the parked van, the far corner. You have not put the crosshair on him once. You have spent nine minutes keeping him alive, and it did not cross your mind to do anything else.'],
  K76MV('(one: i’m not going to kill him. two: i haven’t wanted to since the river. three: oh, fuck)','(one: i’m not going to kill him. two: i don’t think i’ve wanted to since the river. three: oh, fuck)','(One: I’m not going to kill him. Two: I don’t think I’ve wanted to since the river. Three: oh, fuck.)','(One: I’m not going to kill him. Two: I don’t think I have wanted to since the river. Three: oh, fuck.)'),
  ['','He comes out. He looks up at your roof before he looks anywhere else, the way he did on the night of the carpet, and you remember what is in his book in fountain pen.'],
  K76MV('(he doesn’t cross things out. he TOLD me. he’ll do it the day it says to, between the tea and the hounds, and not feel a thing)','(he doesn’t cross things out. he told me so. he’ll do it on the day it says, between the tea and the hounds, and not feel a thing)','(He doesn’t cross things out. He told me so. He’ll do it on the day it says, between the tea and the hounds, and feel nothing.)','(He doesn’t cross things out; he told me so himself. He’ll do it on the day the book says, between the tea and the hounds, and feel nothing at all.)'),
  f.e2lSpar==='kiss'?K76MV('(he kissed me back like he was trying to win. that’s all that was)','(he kissed me back like he was trying to win. that’s all it was. winning)','(He kissed me back like he was trying to win. That’s all it was.)','(He kissed me back on the mat as if he was trying to win. That’s all it was. He told me so: three to one.)'):null]:[
  ['','A job for the case. You go into a stairwell to talk to a man who knew the Mimic, and Misaki lies on the roof opposite with the rifle. For nine minutes your back is to a marksman who has sworn in front of witnesses to kill you, and you do not think of it once.'],
  ['','You think of it on the way out. You stood with your back to that roof and felt covered. You have never in your life let anybody stand behind you.'],
  K76V('(I am not going to kill them. I have known it since I could not write the total. I have declined to look at it until today.)'),
  ['','You look up at the roof. They wave the rifle at you, one-handed, like somebody waving from a bus.'],
  K76V('(They have not withdrawn a word. A car park, they said; somewhere stupid. They take what pays and they sleep well. On the day somebody prices me, they will do it between two mouthfuls of cereal and never ask what I had done.)'),
  f.e2lSpar==='kiss'?K76V('(They called it a tactic, on the mat. I chose not to believe them. I ought to believe what people tell me about themselves.)'):null];
 const hide=()=>{f.e2lKnow='hide';save();say(m?[
   ['','On the way down you call him “ur honour” twice and tell him his coat makes him look like a hearse. He looks pleased, or as near to it as he gets. You feel as if you are lying to a mark.']]:[
   ['','In the car you tell them their position was sloppy and their sling is frayed. They tell you where you may put the sling. It is exactly as it has always been, and you sit in it as if in somebody else’s coat.']],hub)};
 const watch=()=>{f.e2lKnow='watch';save();say(m?[
   ['','That night you put the pistol back under the pillow, where it has not been since the infirmary, and balance a glass on the door handle of the spare room.'],
   K76MV('(i’ll hear him. that’s all i need. to hear him)','(i’ll hear him. that’s all i need, to hear him first)','(I’ll hear him. That’s all I need: to hear him first.)','(I’ll hear him. That’s all I need, to hear him first. I don’t know what I do after that.)')]:[
   ['','That night, for the first time since they came into the house, you turn the key in your bedroom door. The black hound, outside it, looks at the lock and then at you.'],
   K76V('(It is a precaution. I take them against everybody. I have not, until now, taken them against anybody I would miss.)')],hub)};
 say(L,()=>ask(K73Who(),m?'(He’s waiting at the car, holding the door.)':'(They are coming down the fire escape.)',m?[
  {t:'Say nothing. Be as horrible to him as ever',sub:'he can’t know',fn:hide},{t:'Start listening for the night he does it',sub:'the pistol goes back under the pillow',fn:watch}]:[
  {t:'Say nothing. Change nothing they could notice',sub:'they must not know',fn:hide},{t:'Begin to take precautions',sub:'the key, in the bedroom door',fn:watch}]))}

/* ===================================== III · THE PARAPET ===================================== */
function k78Test(){k77Go('#06070a');k73Mark('e2l_test');const m=k76M(),f=S.f;
 const L=m?[
  ['','A roof on the east side, six floors up, waiting on one of the old names. You decide to find out.'],
  ['','You sit down on the parapet with your back to him and your legs over the drop, and leave the pistol in its holster, and count. It would take him one hand. He would not even have to hurry.'],
  ['','At forty his hand closes in the back of your hoodie and you are on the gravel, pulled off the edge so hard that your teeth click.'],
  K76V('Do not do that again.'),
  K76MV('(so that’s the answer. not like that. not quick, not when i pick. his way, on his day)','(so that’s the answer. not like that. not quick and not when i pick. his way, on his day)','(So that’s the answer. Not like that. Not quick, and not when I pick. His way, on his day.)','(So that’s the answer. Not like that: not quick, and not when I choose. His way, on his day, as written.)')]:[
  ['','A roof on the east side, six floors up, waiting on one of the old names. Misaki sits down on the parapet with their back to you and their legs over the drop, and leaves the pistol in its holster.'],
  ['','You understand at once that it is a test. They are offering you the easiest kill of your life, to see whether you take it.'],
  K76V('(If I take it, I am what they say I am. If I do not, they learn that I cannot. A person who kills for rent will know what to do with a man who cannot.)'),
  ['','You count as far as forty. Then your hand is in the back of their hoodie and they are on the gravel, and your heart is going like something shut in a box.'],
  K76V('Do not do that again.')];
 const fought=()=>{f.e2lTest='fought';save();say(m?[
   ['','You put an elbow into his ribs and come up with the pistol out. The two of you stand a metre apart on a roof, breathing, exactly as you stood in the first week.'],
   K76V('There. That is more like you.'),
   K76MV('(he sounded relieved. he likes me dangerous. it’s easier to do it to something dangerous)','(he sounded relieved. he likes me better dangerous. it’s easier to do to something dangerous)','(He sounded relieved. He likes me better dangerous. It’s easier to do to something dangerous.)','(He sounded relieved. He prefers me dangerous; it must be easier to do it to something dangerous.)')]:[
   ['','You step back and let go. They put an elbow into your ribs on the way up and have the pistol out before they are standing. The two of you face each other a metre apart on a roof, as you did in the first week.'],
   K76V('There. That is more like you.'),
   K76V('(Armed, they are safe from me, and I am spared having to explain what I did with my hand.)')],hub)};
 const laughed=()=>{f.e2lTest='laughed';save();say(m?[
   ['','You lie on the gravel and laugh at him, because the other thing you could do is ask. He stands over you with his hand still closed on nothing.'],
   K76V('I fail to see what is amusing.'),K76MV('ur face. u looked scared','your face. you looked scared','Your face. You looked scared.','Your face, V. For a second there you looked scared.'),K76V('I was not.'),
   K76MV('(he was. scared i’d go over before he’s ready. that’s all)','(he was, though. scared i’d go over before he’s ready for it. that’s all that is)','(He was, though. Scared I’d go over before he was ready. That’s all that is.)','(He was, though. Scared that I’d go over the edge before he was ready for me to. That’s all that is.)')]:[
   ['','You do not let go of the hoodie. They lie on the gravel and laugh at you, and you stand over them with your fist closed in the cloth.'],
   K76V('I fail to see what is amusing.'),K76MV('ur face. u looked scared','your face. you looked scared','Your face. You looked scared.','Your face, V. For a second there you looked scared.'),K76V('I was not.'),
   K76V('(I was. They saw it, and they will file it under weaknesses, as I would.)')],hub)};
 say(L,()=>ask(K73Who(),m?'(His hand is still in your hoodie.)':'(Your hand is still in their hoodie.)',m?[
  {t:'Fight him off',sub:'elbow, pistol',fn:fought},{t:'Lie there and laugh at him',sub:'it’s that or ask',fn:laughed}]:[
  {t:'Let go, and wait for the pistol',fn:fought},{t:'Keep hold of them',fn:laughed}]))}

/* ===================================== IV · THE CORRIDOR ===================================== */
function k78Row(){k77Go('#050508');k73Mark('e2l_row');const m=k76M(),f=S.f;
 const L=[
  ['',m?'Two in the morning, the east corridor. You came out because you heard a door. He is standing outside his bedroom in his shirtsleeves with the scalpel in his hand. You have the pistol.':'Two in the morning, the east corridor. You came out because you heard a door. They are standing outside the spare room in a T-shirt with the pistol in their hand. You have the scalpel.'],
  ['','Neither of you asks what the other is doing up. You have each lain awake listening for the other one for a week.'],
  K76MV('u lock ur door now','you lock your door now. you never used to','You lock your door now. You never used to.','You lock your door now, V. You never used to. I can hear the key from my room.'),
  K76V('There is a glass balanced on your door handle. I heard it from the stair.'),
  K76MV('bc ur going to do it. it’s in ur book in INK and u don’t cross things out. u TOLD me','because you’re going to do it. it’s in your book in ink and you don’t cross things out. you told me','Because you’re going to do it. It’s in your book in ink, and you don’t cross things out. You told me that.','Because you’re going to do it. It’s in your book, in ink, and you don’t cross things out. You told me that yourself, the first night.'),
  K76V('And you promised me a car park in front of witnesses, and have never withdrawn it. You kill for whoever pays. I assume that sooner or later somebody will.')];
 const tail=[['',m?'He goes in, and you hear the key turn. Before it is light you carry your things out to the truck and go back to the trailer, and shoot both bolts.':'You go in and turn the key. In the morning the spare room is empty and the bed is stripped. The black hound lies across that doorway all day and will not be called off it.']];
 const fin=(k,M)=>()=>{f.e2lRow=k;S.aff=Math.max(0,S.aff-6);save();drawHud();say(M.concat(tail),hub)};
 const said=fin('said',m?[
   K76V('That is what I would say, if I intended to.'),
   K76MV('then cross it out. right now. get the pen','then cross it out. right now. go and get the pen','Then cross it out. Right now. Go and get the pen.','Then cross it out. Right now, V. Go and get the fountain pen and do it in front of me.'),
   K76V('I do not cross things out. If I strike one name, every other name in that book is worth nothing.'),
   K76V('Give me the rifle, and I will believe you.'),
   K76MV('and stand in ur house with nothing. no','and stand in your house with nothing in my hands. no','And stand in your house with nothing in my hands. No.','And stand in your house, at night, with nothing in my hands? No.'),
   ['','Neither of you can go first. Going first means standing unarmed in front of somebody you believe would do it, and you have both lived this long by not doing it.']]:[
   K76MV('that’s what i’d say if i was going to','that’s exactly what i’d say if i was going to','That’s exactly what I’d say if I was going to.','That’s exactly what I’d say, V, if I was going to.'),
   K76V('Then give me the rifle, and I will prove it.'),
   K76MV('cross the name out first. get the pen','cross the name out first. go and get the pen','Cross the name out first. Go and get the pen.','Cross the name out first. Go and get the fountain pen and do it where I can see.'),
   K76V('I do not cross things out. If I strike one name, every other name in that book is worth nothing.'),
   K76MV('so it stays. and i hand u my gun. no','so it stays, and i hand you my gun. no','So it stays, and I hand you my gun. No.','So the name stays, and I hand you my gun and trust you. No.'),
   ['','Neither of you can go first. Going first means standing unarmed in front of somebody you believe would do it, and you have both lived this long by not doing it.']]);
 const silent=fin('silent',m?[
   K76MV('yeah. u should lock it','yeah. you should lock it','Yeah. You should lock it.','Yeah. You should lock it, then.'),
   K76V('I see.'),
   ['','You watch him take that in and put it away somewhere, tidily. You wanted him to argue. He nods, as if you had confirmed a delivery.'],
   K76MV('(say u won’t. i’d know if u were lying. i think i’d know)','(say you won’t. i’d know if you were lying. i think i’d know)','(Say you won’t. I’d know if you were lying. I think I’d know.)','(Say that you won’t. I’d know if you were lying. I think that I’d know.)'),
   K76V('Goodnight, Misaki.')]:[
   K76V('You are right to take precautions.'),
   K76MV('cool. great. good talk','cool. great. good talk, v','Cool. Great. Good talk.','Cool. Great. Good talk, V. Really cleared things up.'),
   ['','You watch them take that in. Their face does what it does on a roof when the wind changes. You wanted them to argue.'],
   K76V('(Say that you would not. I would hear it, if it were a lie. I think that I would hear it.)'),
   K76MV('night')]);
 say(L,()=>ask(K73Who(),m?'(He hasn’t put the scalpel down.)':'(They have not lowered the pistol.)',m?[
  {t:'“i’m not going to kill u, u idiot”',sub:'say it first',fn:said},{t:'“yeah. u should lock it”',sub:'let him think you would',fn:silent}]:[
  {t:'“I am not going to kill you.”',sub:'say it first',fn:said},{t:'“You are right to take precautions.”',sub:'let them think you would',fn:silent}]))}

/* ===================================== IV · PIER SIX ===================================== */
function k78Guard(){k77Go('#04060a');k73Mark('e2l_guard');const m=k76M(),f=S.f;
 const L=(m?[
  ['','The harbour office on Pier Six, where the auction’s manifest is kept. He goes in through the roof light for it. You are on the crane with the rifle, and your job is the gantry behind him.'],
  ['','You are meant to be watching the gantry. You are watching V, because a man who is going to kill you is easiest to read when he thinks you are busy.'],
  ['','So you do not see the watchman come along the gantry until he has a boat hook through V’s coat. Your shot is a full second late. You have never been a second late in your life.']]:[
  ['','The harbour office on Pier Six, where the auction’s manifest is kept. You go in through the roof light for it. Misaki is on the crane with the rifle, covering the gantry behind you.'],
  ['','You should be listening to the gantry. Instead you are watching the crane in the glass of the roof light, where a rifle has been pointed in your general direction for an hour.'],
  ['','The boat hook goes through your coat and a hand’s breadth of your shoulder before you hear the man at all. The shot that kills him comes a full second after it should.']]).concat([
  ['',m?'In the car he drives one-handed and bleeds into his good coat.':'In the car you drive one-handed and bleed into your good coat.'],
  K76V('You were late.'),K76MV('i was watching u','i was watching you','I was watching you.','I was watching you, V. Not the gantry. You.'),K76V('I know. I was watching you.'),
  ['','A watchman with a boat hook has just come nearer to it than either of you has in months, because each of you was busy guarding against the other.']]);
 const ang=[[AN,'(text) ronin says V got hooked like a FISH because you two were staring at each other. fix it before the boat, or i open the envelope and read it at you both']];
 const own=()=>{f.e2lGuard='own';save();say((m?[
   K76MV('that’s on me. i took my eye off the door','that’s on me. i took my eye off the door','That’s on me. I took my eye off the door.','That’s on me. I took my eye off the door, and I don’t do that.'),
   K76V('It is on both of us. I will not have it happen on the boat.'),
   K76MV('so what do we do','so what do we do about it','So what do we do about it?','So what do we do about it, then?'),
   K76V('I do not know. I have a procedure for everything, and I have none for you.')]:[
   K76V('It is on both of us. I will not have it happen on the boat.'),
   K76MV('so what do we do','so what do we do about it','So what do we do about it?','So what do we do about it, then?'),
   K76V('I do not know. I have a procedure for everything, and I have none for you.'),
   ['','They look at you for the length of a red light, and then at the road.']]).concat(ang),hub)};
 const blame=()=>{f.e2lGuard='blame';save();say((m?[
   K76MV('u were watching me too. don’t put this on me','you were watching me too. don’t put this on me','You were watching me too. Don’t put this on me.','You were watching me too, in the glass. Don’t you dare put this on me.'),
   K76V('I am not putting it anywhere. I am telling you that I cannot work Friday like this.'),
   K76MV('then stop watching me','then stop watching me','Then stop watching me.','Then stop watching me, V.'),K76V('Then stop giving me cause.'),
   K76MV('(i haven’t given him any. that’s the whole fucking problem)','(i haven’t given him any. that’s the whole fucking problem)','(I haven’t given him any. That’s the whole fucking problem.)','(I haven’t given him any cause. That’s the whole fucking problem.)')]:[
   K76V('You were late because you were aiming at me.'),
   K76MV('i was LOOKING at u. it’s different','i was looking at you. it’s different','I was looking at you. It’s different.','I was looking at you, V. It’s different. You of all people know it’s different.'),
   K76V('It is not different through a scope.'),
   K76V('(It is different. I have looked at them through glass for months, and I know how different it is.)')]).concat(ang),hub)};
 say(L,()=>ask(K73Who(),m?'(His blood is on the gearstick.)':'(They are holding your scarf against the shoulder, hard.)',m?[
  {t:'“that’s on me”',fn:own},{t:'“u were watching me too”',fn:blame}]:[{t:'“It is on both of us.”',fn:own},{t:'“You were late because you were aiming at me.”',fn:blame}]))}

/* ===================================== SPLICE; THE BOAT'S LEAD-IN ===================================== */
(function(){try{if(typeof K73B==='undefined'||typeof k76Card!=='function')return;const at=id=>K73B.findIndex(b=>b.id===id);
 const add=(before,b)=>{const r=b.run;b.run=function(){return k76Card(b.id,()=>r())};const i=at(before);K73B.splice(i<0?K73B.length:i,0,b)};
 const mid=()=>['act2','act3'].includes(S.phase)&&!S.f.e2lEnd&&!k73Done('e2l_boat');
 add('e2l_will',{id:'e2l_know',t:()=>k76H('Cover him: the stairwell, ninety metres','A stairwell, with them on the roof behind you'),sub:()=>'costs time · the case · nine minutes',when:()=>mid()&&k73Done('e2l_car')&&k73Fresh(),run:k78Know});
 add('e2l_will',{id:'e2l_test',t:()=>'A roof on the east side, six floors',sub:()=>'costs time · find out',when:()=>mid()&&k73Done('e2l_know')&&k73Fresh(),run:k78Test});
 add('e2l_will',{id:'e2l_row',t:()=>'The east corridor, two in the morning',sub:()=>'costs time · a door',when:()=>S.phase==='act3'&&!S.f.e2lEnd&&k73Done('e2l_test')&&k73Fresh(),run:k78Row});
 add('e2l_will',{id:'e2l_guard',t:()=>'Pier Six: the manifest',sub:()=>'costs time · the crane and the roof light',when:()=>S.phase==='act3'&&!S.f.e2lEnd&&k73Done('e2l_row')&&typeof a3d==='function'&&a3d()>=1&&k73Fresh(),run:k78Guard});
 /* the boat is where it breaks: a lead-in, before the card, when the row has happened */
 const boat=K73B[at('e2l_boat')];if(boat){const r=boat.run;boat.run=function(){const a=arguments,self=this,L=k78BoatPre();if(!L.length)return r.apply(self,a);k77Go('#04060c');return say(L,()=>r.apply(self,a))}}}catch(e){}})();
function k78BoatPre(){try{if(!S||!K78()||!S.f.e2lRow)return [];const m=k76M(),f=S.f;return [
  ['',m?'You have not been inside arm’s reach of him since the corridor.'+(f.e2lGuard?' His shoulder is strapped under the coat, and he rows nothing tonight.':''):'You have not been inside arm’s reach of them since the corridor.'+(f.e2lGuard?' Your shoulder is strapped under the coat, and they will have to row.':'')],
  ['',f.e2lRow==='said'?(m?'You told him you would not, and he did not believe you. You have gone over the sentence since, looking for what was wrong with it.':'You told them you would not, and they did not believe you. You have gone over the sentence since, looking for the fault in it.'):(m?'You let him think you would. He has been polite to you ever since, the way he is with people in his book.':'You let them think you would. They have been cheerful with you ever since, the way they are with a mark.')],
  ['','Tonight needs two people in a very small boat, and whoever rows has their back to the other one.']]}catch(e){return []}}

/* ===================================== THE CASE MENU: WATCH HIM / STUDY THEM ===================================== */
const k78TellsOk=()=>{try{return k78Open()&&S.phase==='act2'}catch(e){return false}};
function k78Tells(){const n=k77Inc('tells'),m=k76M();
 if(n>1)return say(k77Var('tells',m?[
  [['','On Sunday he sharpens every knife in the kitchen, in order of size, and tries each one on the hair of his forearm. When he has done the last he stands looking at the door of the spare room.'],
   K76MV('(he was going to ask if i wanted breakfast. he asked. i said no through the door with the gun in my hand)')],
  [['','He has the doctor in again. They talk in the study with the door shut for twenty minutes, and you hear your name, and “the left hand”, and “how long”.'],K76MV('(how long till WHAT)'),
   ['','The doctor leaves you a sheet of exercises for the hand, with times beside them, in V’s writing.']],
  [['','There is a new line on the ops board in his hand: M. THURSDAY. 0400. You do not sleep on Wednesday. At four on Thursday he knocks, holding two cups, because four on Thursday is when the Mimic’s next name comes off shift.'],
   K76MV('(he could’ve just SAID)')]]:[
  [['','They have zeroed the rifle on the range under your house. The last group is five rounds in a space a coin would cover, at the height of a tall man’s chest.'],
   K76V('(Every target on that lane hangs at that height. I hung them.)')],
  [['','They ask Ronin, in the server, where you park on Tuesdays.'],K76V('(A car park. Somewhere stupid.)'),
   ['','On Tuesday there is a ticket from the machine under your wiper, four hours, paid for, with “ur meter ran out, ur honour” on the back.']],
  [['','Your teacup has been moved a hand’s width to the left of where you leave it. You pour the tea down the sink and wash the cup twice.'],
   ['','Angel mentions, that evening, that Misaki was in your kitchen looking for the sugar.']]]),hub);
 say(m?[
  ['','You watch him for a day from the water tower, the way you did in the first week. This time you are looking for the day he decides.'],
  ['','He walks the hounds, signs things, eats standing up. At four he goes into a shoe shop on the high street and comes out with a box. They are boots, in your size. He leaves them on the step of the spare room without a note.'],
  K76MV('(he knows my size. u need a size for boots. u also need a size for the plastic)','(he knows my size. you need a size for boots. you also need one for the plastic)','(He knows my size. You need a size for boots. You also need one for the plastic.)','(He knows my size. You need a size to buy somebody boots. You also need one to cut the plastic.)'),
  ['','You wear them. They are very good boots, and you resent every step.']]:[
  ['','You study them for a day, as you did in the first week. This time you are looking for the day somebody pays them.'],
  ['','They sleep until noon. At three they meet a man in a café by the station, and he passes an envelope across the table, and they count it.'],
  K76V('(So I have been priced.)'),
  ['','At five they are in your kitchen with a bag from the butcher on the high street: the hounds’ cut, the dear one, four portions.'],
  K76MV('commission came in. the hounds eat good this week. u get nothing','commission came in. the hounds eat well this week. you get nothing','A commission came in. The hounds eat well this week. You get nothing.','A commission came in. A drawing, before you ask. The hounds eat well this week, and you get nothing.'),
  K76V('(A drawing. I sat in the car with the engine off for two hours, over a drawing.)')],hub)}

/* ===================================== MORNINGS (shared cap) ===================================== */
const K78MORN=[
 {id:'m78_ronin',when:()=>k78Open(),run:done=>say(k76M()?[
   ['','Ronin rings before you are up.'],
   [RN,'He bought you boots and you think he’s measurin’ you for the plastic. Kid. Listen to yourself.'],
   K76MV('he hasn’t crossed it out','he hasn’t crossed it out, ronin','He hasn’t crossed it out, Ronin.','He hasn’t crossed it out, Ronin. Go and look. It’s still there.'),
   [RN,'Yeah, and you ain’t took yours back neither. You’re both sat there with a gun on the table waitin’ on the other one to pick theirs up first.'],
   [RN,'I’d laugh, ’cept I think one of you’s gonna flinch.']]:[
   ['','Ronin rings at ten to five, while the kettle is on.'],
   [RN,'They moved your teacup and you washed it twice. Vee. Listen to yourself.'],
   K76V('They have not withdrawn it.'),
   [RN,'Yeah, and you ain’t crossed yours out neither. You’re both sat there with a gun on the table waitin’ on the other one to pick theirs up first.'],
   [RN,'I’d laugh, ’cept I think one of you’s gonna flinch.']],done)},
 {id:'m78_angel',when:()=>k78Open()&&k73Done('e2l_row'),run:done=>say(k76M()?[
   ['','Angel is on the trailer step at eight with two coffees and her sunglasses on.'],
   [AN,'so the spare room’s empty, and V’s door is locked, and nobody will tell me why'],
   [AN,'do you want to kill him. yes or no'],K76MV('no'),
   [AN,'does he want to kill you'],K76MV('yes','yeah','Yes.','Yes. It’s in writing.'),
   [AN,'did you ask him'],K76MV('…'),
   [AN,'right. so it’s a guess. you’re betting your life on a guess, and you won’t even let me hold the stake']]:[
   ['','Angel is in your kitchen at eight, uninvited, with her sunglasses on.'],
   [AN,'so the spare room’s empty, and your door is locked, and nobody will tell me why'],
   [AN,'do you want to kill them, V. yes or no'],K76V('No.'),
   [AN,'do they want to kill you'],K76V('They would, for a price.'),
   [AN,'did you ask them'],K76V('…'),
   [AN,'right. so it’s a guess. you’re betting your life on a guess, and you won’t even let me hold the stake']],done)}];
const _me78=morningEvent;morningEvent=function(done){try{if(S&&K78()&&!(S.kd&&S.kd.med)&&['act2','act3'].includes(S.phase)&&S.f.e2lMornDay!==S.day&&mbOk()){
  const e=K78MORN.find(x=>!S.seen[x.id]&&x.when());if(e){S.seen[e.id]=1;S.f.e2lMornDay=S.day;mbUse();save();k77Go('#0a0a0e');return e.run(()=>_me78(done))}}}catch(e){}return _me78(done)};

/* ===================================== THREAD, SERVER ===================================== */
if(typeof txDef==='function'){
 txDef('tx_e2l_3am_m',{with:'v',pov:'m',prio:2,when:()=>k78Open()&&k73Done('e2l_row'),nodes:{
  start:{in:()=>['Are you awake.'],expire:2,
   opts:()=>[{t:'“yes”',reply:()=>['So am I.','That is all. I wished to know.']},
    {t:'“why. u checking”',reply:()=>['Yes.','I check that you are there. I have not decided what I am checking for.']},
    {t:'“is this the night”',reply:()=>['No.','You would not get a message first. Go to sleep.','That was meant to be reassuring. I see now that it is not.']}]}}});
 txDef('tx_e2l_3am_v',{with:'m',pov:'v',prio:2,when:()=>k78Open()&&k73Done('e2l_row'),nodes:{
  start:{in:()=>['u up'],expire:2,
   opts:()=>[{t:'“Yes.”',reply:()=>['same','ok. that’s it. just counting']},
    {t:'“Is this a threat?”',reply:()=>['no','…i don’t know what it is. go to sleep','lock ur door']},
    {t:'“Are you in the trailer?”',reply:()=>['why. u coming','…that was a joke','both bolts are on. i checked 3 times. that’s not a joke']}]}}})}
const K78CHAT=[
 [['ro','why’s everybody in that house lockin’ doors again'],['an','ask them'],['k9','It is a precaution.'],['mi','same']],
 [['an','you two are being weird and polite. i preferred the death threats'],['mi','nobody’s being weird'],['k9','Nobody is being weird.'],['ro','oh that’s fuckin’ chilling']]];
const _chat78=chatLog;chatLog=function(){const L=_chat78();try{if(S&&k78Open()&&(S.day+S.slot)%3===0)K78CHAT[S.day%K78CHAT.length].forEach(x=>L.push(x))}catch(e){}return L};

/* ===================================== ENDINGS ===================================== */
const _xe78=extraEnding;extraEnding=function(){const L=_xe78();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f;
 if(f.e2lRow==='said')L.push('For a time each of them had stopped wanting the other dead and was sure the other had not. One of them said so in a corridor at two in the morning, and was not believed.');
 else if(f.e2lRow==='silent')L.push('For a time each of them had stopped wanting the other dead and was sure the other had not. Neither said so. They locked their doors.');
 if(f.e2lGuard)L.push('V has a scar through the left shoulder from a boat hook on Pier Six. He got it because he was watching Misaki, and Misaki was watching him.');
 if(f.e2lTest)L.push('Misaki once sat on a parapet with their back to V to find out what he would do. They both got the answer wrong.')}catch(e){}return L};
/* ===KC78-END=== */
