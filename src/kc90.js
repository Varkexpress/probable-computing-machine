/* ===KC90-BEGIN=== */
/* ===================== THE WAR: THE NIGHTS (kc90) =====================
   The author asked for the infirmary to read less like filler, for Misaki to be less friendly with the tall one, and
   for more horror and disgust, with new material of weight. This module is that material. (The same pass cut
   twenty-two scenes from kc86–kc89's pool and rewrote the cell-stage ones in kc84–kc86; see docs/notes_kc90.md.)
   Needs kc73, kc76–kc89.

   1. THE NIGHTS. Three long scenes per POV, one a night, delivered through hub() in the late slot (S.slot>=3) while
      kdMed(), ahead of everything else of this route's: S.f.e2l90N (how many), S.f.e2l90Day.
        I   through the wall: feeding time                         S.f.e2lN1 up|down (M), yard|bowl (V)
        II  full story: the camera, the ruler, the hand laid flat  S.f.e2lN2 (M: a kdDeny)
            injuries only: the wrists have gone bad                 S.f.e2lN2
        III the drain: the room under the room (Misaki must be clear)   S.f.e2lN3 ear|shirt (M), chain|scrub (V)
      In the cell stage Misaki believes what kc73 established: the tall one is K9, who swore to kill them slowly,
      and who has had them all along. They are not friendly to him. They comply, they watch his hands, and they wait.
   2. THE POOL (kc85's ⚔ The room / Outside the room): fifteen more scenes, each about a thing other than the tray.
        Misaki, cell:   h_mouth h_limp · injuries only: y3_splint y3_number y3_blood
        Misaki, clear:  h_hand h_log h_narrate
        V:              h_smell h_cast h_fast h_ronin h_eleven h_carry h_glass
   3. THE ROUTE. Two beats outside the infirmary:
        e2l_bucket (chapter I, free; after the cold room)   what the hounds are fed      S.f.e2lBucket fed|left (M), in|out (V)
        e2l_table  (chapter III, free; after the first one together)  the cold room, in person   S.f.e2lTable lay|stood (M), told|silent (V)
   Full-story text keeps kc29's rules (never named; the honest option greyed; a pretence is a kdDeny). Injuries-only
   text keeps kc36's (no denial, no doctor).
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc90.md. Test: node tools/k90_test.js */
const K90=()=>{try{return typeof K86==='function'&&K86()}catch(e){return false}};

/* ===================================== THE NIGHTS ===================================== */
/* ---------- I · through the wall ---------- */

/* ---------- II · full story: the camera ---------- */
/* ---------- II · injuries only: the wrists ---------- */
/* ---------- III · the drain ---------- */
function k90Night(){return null}
const _hub90=hub;hub=function(){const a=arguments,self=this;try{const s=k90Night();if(s)return s(()=>_hub90.apply(self,a))}catch(e){}return _hub90.apply(self,a)};

/* ===================================== THE POOL ===================================== */
/* ---------- Misaki, cell ---------- */
/* ---------- Misaki, clear ---------- */
/* ---------- V ---------- */
/* ===================================== THE ROUTE: TWO BEATS ===================================== */
function k90Bucket(){k77Go('#080707');k73Mark('e2l_bucket',1);const m=k76M(),f=S.f;
 const L=m?[
  N('You are in his kennel passage at six in the evening, behind the feed bins, because you want to know what time the back door is unlocked. It is unlocked now. He comes through it with a steel bucket.'),
  N('He sets it down. The four of them come to it without a sound and put their heads in.'),
  N('You have a clear line into the bucket from where you are. It is cubed. Somebody has taken trouble over it: the pieces are all of a size, and trimmed, and cold enough to smoke a little in the warm air. On the top there is a piece with a tattoo on it. An anchor, blue, gone soft at the edges.'),
  N('The card man had an anchor on his forearm. You watched it through a scope for three nights, lighting cigarettes.'),
  M2('(oh. oh, that’s — ok. that’s what the link was FOR. the fingers were just the start)','(oh. oh, that’s — okay. that’s what the link was for. the fingers were just the start)'),
  N('You have killed forty people. You have never once thought about where they went afterwards. They went into the morning paper, and you went for noodles.'),
  N('The black hound takes the anchor. It chews with its eyes half shut. V stands over them with his hands clasped behind his back, watching them eat, and on his face there is the nearest thing to tenderness that you have ever seen there.'),
  M2('(that’s the plan for me. that’s what “slow” ends in. a bucket. and him looking like THAT)','(that’s the plan for me. that’s what “slow” ends in: a bucket, and him looking like that)')]:[
  N('Six in the evening. You carry the bucket down to the kennel passage. It is the best of the card man: the long muscles, trimmed and cubed, chilled overnight. You have left the skin on one piece, with the anchor, because the black hound likes something to work at.'),
  N('They eat. You stand over them. It is the quietest quarter of an hour in your day.'),
  N('The grey hound stops, and lifts her head, and looks at the feed bins. Then she goes back to the bucket. She has decided that it is nothing she need mention.'),
  N('You know that look. You follow it. Behind the third bin, between the bin and the wall, there is the toe of a boot, size five.'),
  K76V('(They are in my house. They are four metres from me, and they have a clear view of the bucket.)'),
  K76V('(Good. Let them see where it ends. I have shown them the table. This is the remainder.)'),
  N('You do not turn your head. You stand with your hands behind your back and let them look for as long as they can bear to. You are a little surprised by how long that is.')];
 say(L,()=>ask(K73Who(),m?'(The old hound has left the bucket. He is coming towards the bins.)':'(The old hound has left the bucket. He is walking to the bins.)',m?[
  {t:'Hold out what is in your pocket',sub:'the meat you took from his kitchen',fn:()=>{f.e2lBucket='fed';save();say([
   N('The old hound comes round the bin and finds you. He does not bark. He looks at you, and then at your pocket, where there is a piece of ham that you lifted from the cold larder on the way in.'),
   N('You hold it out. He takes it from your palm, gently, with his lips. His muzzle is wet, and it leaves a mark across your hand, pink.'),
   M2('(that’s the card man. on my hand. that’s the card man)','(that’s the card man, on my hand. that’s the card man)'),
   N('You do not wipe it off until you are over the wall. You scrub it on the grass, and then on your jeans, and that night you wash the hand until the water runs cold. In the morning you can still tell where it was.')],hub)}},
  {t:'Keep still until he loses interest',fn:()=>{f.e2lBucket='left';save();say([
   N('The old hound comes round the bin and stands over you. His breath is on your face. It smells of the bucket.'),
   N('You keep still. You are very good at it. He looks at you for a long time with his one clear eye, and then he sighs and goes back and lies down, and V has not turned his head once.'),
   M2('(he knows. he KNOWS i’m here. he’s letting me watch)','(he knows. he knows that i’m here. he’s letting me watch)'),
   N('You go out over the wall at seven. You are sick in the lane, tidily, behind a skip. You are annoyed about it. You have seen worse; you have done worse. You had never before seen it eaten.')],hub)}}]:[
  {t:'Let the old hound go to them',fn:()=>{f.e2lBucket='in';save();say([
   N('The old hound goes round the bin. You hear him stop. You hear nothing for some seconds, and then the small wet sound of a hound taking something from a hand.'),
   K76V('(They are feeding him. With their fingers. From my larder, I have no doubt.)'),
   N('He comes back to the bucket licking his lips. You do not look at the bins. When you come down again at ten, the boot has gone, and on the lawn by the back wall there is a patch of grass rubbed raw, as if somebody had been cleaning a hand on it.'),
   K76V('(They did not like the feel of it on them. I have never thought to ask what it feels like.)')],hub)}},
  {t:'Call him back',fn:()=>{f.e2lBucket='out';save();say([
   K76V('Leave it.'),
   N('The old hound stops. He looks at the bins, and at you, and comes back, slowly, to show you what he thinks of the order.'),
   N('You stand another ten minutes. You do not turn round. At seven you hear the ivy move on the back wall, and afterwards, faintly, from the lane, somebody being sick behind the skip.'),
   K76V('(So that is the limit of them. Forty dead, and they cannot stomach a bucket. I have found a thing that they are squeamish about, and I find that I have no wish to use it.)')],hub)}}]))}
function k90Table(){k77Go('#050608');k73Mark('e2l_table',1);const m=k76M(),f=S.f;
 const L=m?[
  N('You ask to see it. You have been in his house for weeks; you have slept over it. You say that you are not going to go on living on top of a room you have only seen on a phone.'),
  N('He takes you down. There is a chain on the door, and he has to fetch the key from a nail.'),
  N('It is the infirmary. That is the first thing. The same tile, the same lamp, the same round drain; you could lay one over the other. Where your bed was, there is a steel table with a gutter round the edge, and no straps on it. There are six holes where straps were bolted.'),
  N('It is very clean. It smells of soda. On the steel, in the middle, there is a patch worn bright and thin, as if somebody had gone at it with a wire brush for a long time.'),
  M2('this is where u were going to do it','this is where you were going to do it'),
  K76V('Yes.'),
  M2('show me. where’d i have gone','show me. where would i have gone?'),
  N('He does not want to. You watch him not want to, and you wait, because you have a right to it.'),
  K76V('The head at that end. The left hand first, for the trigger finger. I had allowed nine days.')]:[
  N('They ask to see it. They say that they will not go on living over a room that they have only seen on a telephone.'),
  N('You take them down. You have to fetch the key to the chain. You have not opened that door since the night you scrubbed the table.'),
  N('They stand in the doorway and look. You watch them see that it is the infirmary: the tile, the lamp, the drain. They look at the six holes in the steel where the straps were.'),
  K76MV('this is where u were going to do it','this is where you were going to do it','This is where you were going to do it.','So this is where you were going to do it.'),
  K76V('Yes.'),
  K76MV('show me. where’d i have gone','show me. where would i have gone?','Show me. Where would I have gone?','Show me. Go on. Where would I have gone?'),
  N('You do not wish to. They have a right to it. You have never refused anybody the terms of the charge.'),
  K76V('The head at that end. The left hand first, for the trigger finger. I had allowed nine days.')];
 const lay=()=>{f.e2lTable='lay';apply({aff:2});save();say([
   N(m?'You get up on it. He makes a movement to stop you and does not finish it. You lie down on the steel, on your back, with your head at that end and your left hand out where he said.':'They get up on it. You begin to put a hand out and do not finish. They lie down on the steel, on the back, with the head at that end and the left hand out where you said.'),
   N(m?'It is cold right through your shirt. Over your face there is a lamp on an arm, and beyond the lamp a round steel plate in the ceiling. You know what is on the other side of that plate. You lay looking down through it, one night, from a bed.':'They look up at the lamp, and past it at the plate in the ceiling. You see them recognise it.'),
   K76MV('huh. u can see the drain from here','huh. you can see the drain from here','Huh. You can see the drain from here.','Huh. You can see my drain from here. I used to listen to you through that.'),
   K76V('Get down. Please.'),
   N(m?'It is the first time he has ever said please to you. His face is the colour it went over the wrists. You stay where you are for another ten seconds, to have had them, and then you get down.':'It is the first time that you have said please to them. They stay another ten seconds, deliberately, and then they get down, and only then do you let go of the edge of the door.'),
   K76MV('(i’ve been on his table now. and got off it. nobody else can say that)','(i’ve been on his table now, and got off it. nobody else can say that)','(I’ve been on his table now, and got off it. Nobody else can say that.)','(I’ve been on his table now, and I got off it. Nobody else alive can say that.)')],hub)};
 const stood=()=>{f.e2lTable='stood';apply({aff:2});save();say([
   N(m?'You do not go in. You stand on the sill with your good hand on the frame and look at the bright patch on the steel.':'They do not go in. They stand on the sill with the good hand on the frame, and look at the patch that you wore into the steel.'),
   K76MV('what’s that. the shiny bit','what’s that? the shiny bit','What’s that? The shiny bit.','What’s that, in the middle? The shiny bit.'),
   m?K76V('I cleaned it. One night, while you were upstairs. I found that I could not get it clean.'):K76V('I cleaned it. One night, while you were upstairs. I found that I could not get it clean.'),
   N(m?'You heard that. You were on the floor above with your ear on a drain. You look at him, and you very nearly tell him.':'They look at you for a long moment. There is something that they are deciding whether to say, and they decide against it.'),
   K76MV('u missed a bit','you missed a bit','You missed a bit.','You missed a bit. There, by the gutter.'),
   N(m?'He looks. There is nothing there. It takes him a second to understand that it was a joke, in that room, about that table, and when he does, something goes across his face that you have no name for.':'You look. There is nothing there. It is a joke. They have made a joke, in this room, about this table, to you. You have to turn away from them for a moment and look at the wall.')],hub)};
 say(L,()=>ask(K73Who(),m?'(Six bolt holes. A lamp. The drain.)':'(They are looking at the table as they look at a roof.)',m?[
  {t:'Get up on the table',sub:'lie where he said',fn:lay},{t:'Stay in the doorway',fn:stood}]:[
  {t:'Tell them all of it, in order, if they ask',fn:lay},{t:'Say nothing more',fn:stood}]))}
(function(){try{if(typeof K73B==='undefined'||typeof k76Card!=='function')return;const at=id=>K73B.findIndex(b=>b.id===id);
 const add=(before,b)=>{const r=b.run;b.run=function(){return k76Card(b.id,()=>r())};const i=at(before);K73B.splice(i<0?K73B.length:i,0,b)};
 add('e2l_sab',{id:'e2l_bucket',t:()=>k76H('His kennel passage, at six','Feeding time: somebody is behind the bins'),sub:()=>'costs time · the war · what he feeds them',when:()=>S.phase==='normal'&&k73Done('e2l_show')&&(at('e2l_kennel')<0||k73Done('e2l_kennel'))&&k73Fresh(),run:k90Bucket});
 add('e2l_spar',{id:'e2l_table',t:()=>k76H('Ask to see the cold room','They ask to see the cold room'),sub:()=>'costs time · the room under the room',when:()=>S.phase==='act2'&&k73Done('e2l_pair')&&k73Fresh(),run:k90Table})}catch(e){}})();

/* ===================================== ENDINGS ===================================== */
const _xe90=extraEnding;extraEnding=function(){const L=_xe90();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f;
 if(f.e2lN1==='yard')L.push('V feeds the hounds at the far wall, a hundred metres from the house, in all weathers. He has not brought the bucket indoors since the night Misaki heard them eat.');
 else if(f.e2lN1==='bowl')L.push('The night Misaki heard the hounds eat through the wall, V stood at the glass and ate a bowl of the same broth, a spoonful at a time. It was chicken. He has never been able to say so.');
 if(f.e2lN3==='chain')L.push('The cold room under V’s house has a chain on the door. The key hangs on a nail, in plain sight.');
 else if(f.e2lN3==='scrub')L.push('There is a patch on V’s steel table worn thin and bright with a wire brush. He could not get it clean.');
 if(f.e2lN3==='ear'||f.e2lN3==='shirt')L.push('Misaki heard V being sick in the cold room, through the drain in the infirmary floor. They have never told him.');
 if(f.e2lTable==='lay')L.push('Misaki has lain on V’s table, where he said the head would go, and got down again. He said please.');
 if(f.e2lBucket==='fed')L.push('In the first week the old hound took ham from Misaki’s hand with the card man still on his muzzle. They could tell where it had touched them for a day.')}catch(e){}return L};
/* ===KC90-END=== */
