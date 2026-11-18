/* ===KC80-BEGIN=== */
/* ===================== THE WAR: THE ROOM MARKED LAUNDRY (kc80) =====================
   More of the infirmary on the enemies-to-lovers route. kc73 gave V four scenes and Misaki three; this adds eleven,
   in the same register: never romantic, nothing resolved, V despising them and unable to act, Misaki taking the tall
   one with the tray for a captor and being good for him. Nothing names or hints at what happened in the hours; the
   text touches only the hand and the ribs, so it reads the same with kdSA() on or off.
   Delivery: through hub(), only while kdMed(), only when kc73 (and kc61–63) have nothing for the slot, one a slot.
     Misaki, while the room is a cell (kdClar()<2), mornings and afternoons:  the rules · the message for K9 ·
       the hound at the door · the other hand                                   S.f.e2l80MC (index), S.f.e2lMedAsk
     Misaki, once clear:  what you said · forty-one thank-yous                  S.f.e2l80MX, S.f.e2lThanks told|soup
     V, any slot kc73 leaves free:  the message · the file · the form · the other hand · Ronin in the corridor
                                                                                S.f.e2l80V, S.f.e2lMedKey ronin|kept
   Rules: unnamed city, hounds unnamed, no new named characters (the doctor has no name), V never contracts,
   Misaki via MV and they/them. Notes: docs/notes_kc80.md. Test: node tools/k80_test.js */
const K80=()=>{try{return typeof K79==='function'&&K79()}catch(e){return false}};
const k80Gone=()=>{try{return typeof k73Gone==='function'&&k73Gone()}catch(e){return false}};

/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
const K80_MC=[
 cb=>say([
  ['','You have worked out the rules of this room, the way you worked out the rules of the other one.'],
  K76MV('(one: the light stays on if u ask nicely. two: the tall one doesn’t like being looked at in the face, so look at his hands. three: eat all of it)','(one: the light stays on if you ask nicely. two: the tall one doesn’t like being looked at in the face, so look at his hands. three: eat all of it)','(One: the light stays on if you ask nicely. Two: the tall one doesn’t like being looked at in the face, so look at his hands. Three: eat all of it.)','(One: the light stays on if you ask nicely. Two: the tall one does not like being looked at in the face, so look at his hands. Three: eat all of it.)'),
  ['','Nobody told you any of these. You made them up, because a room with rules is a room you can get right.'],
  ['','He comes in at noon with the tray. You get every one of them right: you ask about the light, you look at his hands, you finish the soup while he is still standing there. He stays by the door with his jaw set, like a man who has been insulted, and you cannot work out which rule you broke.']],
  ()=>ask('hitmeuppp','(What did you get wrong?)',[
   {t:'Ask him what you did wrong',sub:'you do not ask the ones with the keys',dis:true,fn:()=>{}},
   {t:'Say sorry',fn:()=>say([K76MV('sorry','sorry. sorry','Sorry.','Sorry. I’m sorry.'),
    ['','His hand closes on the door frame until the wood makes a sound. He goes out without a word, and shuts the door with so little noise that you have to listen for the latch.'],
    K76MV('(ok. so sorry’s wrong too. rule four: don’t say sorry)','(ok. so sorry is wrong too. rule four: don’t say sorry)','(Okay. So sorry is wrong too. Rule four: don’t say sorry.)','(Okay. So sorry is wrong as well. Rule four: do not say sorry to the tall one.)')],cb)}])),
 cb=>{S.f.e2lMedAsk=1;save();say([
  ['','In the afternoon you have an idea, and it is the first good one you have had in this room.'],
  K76MV('(k9 swore to kill me. k9 wants to know where i am. k9 pays for things)','(k9 swore to kill me. so k9 wants to know where i am. and k9 pays for things)','(K9 swore to kill me. So K9 wants to know where I am. And K9 pays for things.)','(K9 swore to kill me. So K9 will want to know where I am, and K9 pays for what he wants.)'),
  ['','He would be slow. Everybody knows he is slow. But he would tell you why, with dates, and it would be for something you actually did. You find that you would give a great deal to be killed for something you actually did.'],
  ['','When the tall one comes for the tray, you keep your eyes on his hands and say it in the good voice.'],
  k80Gone()?['','You cannot get the voice to come. You write it with your finger on the blanket instead, K, 9, and point at the door, and at yourself.']:K76MV('can u get a message to k9. tell him he can have me. tell him it’s owed','can you get a message to k9? tell him he can have me. tell him it’s owed','Can you get a message to K9? Tell him he can have me. Tell him it’s owed.','Could you get a message to somebody called K9? Tell him he can have me. Tell him it’s owed, he’ll know. He’ll pay you for it.'),
  ['','The tall one puts the tray down very slowly, as if it had become heavy.'],
  K76V('I will tell him.'),
  K76MV('(good. that’s good. that’s a plan)','(good. ok. that’s a plan. i’ve got a plan)','(Good. Okay. That’s a plan. I’ve got a plan.)','(Good. Okay. That is a plan. I have a plan, and it ends with somebody telling me why.)')],cb)},
 cb=>say([
  ['','There is a hound outside the door. You can see the grey of it in the gap at the bottom, and hear it breathe.'],
  ['','Everybody in the city knows what the hounds are for. So this is how it is done here: they send the animal first and let you listen to it.'],
  K76MV('(stay awake. if i’m awake i can at least see it. i want to see it)','(stay awake. if i’m awake i can at least see it coming. i want to see it)','(Stay awake. If I’m awake I can at least see it coming. I want to see it.)','(Stay awake. If I am awake I can at least see it coming, and I want to see it.)'),
  ['','It does not come in. It lies down across the door with a sigh, the way a big animal does when it means to stay. You count the sighs until morning. There are sixty-two.'],
  ['','At some point in the night you notice that the gap under the door is warm, and that you have put your good hand flat on the floor beside it. You take it back.']],cb),
 cb=>say([
  ['','The tall one stands at the foot of the bed with a sheet of paper and tells you to open your left hand.'],
  ['','You try. You look at it and tell it, and it lies there on the blanket, shut, like something that belongs to somebody else.'],
  K76MV('(he said open. it didn’t open. that’s a no. u don’t say no in here)','(he said open and it didn’t open. that’s a no. you don’t say no in here)','(He said open and it didn’t open. That’s a no. You don’t say no in here.)','(He said open, and it did not open. That counts as a no, and you do not say no in here.)'),
  k80Gone()?['','You hold your right hand out to him instead, palm up.']:K76MV('this one works. use this one','this one works. you can use this one','This one works. You can use this one.','This one works. You can use this one instead. It does what it’s told.'),
  ['','You hold the right hand out to him, palm up. He looks at it, and something goes out of his face, as if a lamp had been carried out of a room.'],
  K76V((typeof kdSA==='function'&&!kdSA())?'It was for an exercise, for the hand. There is no penalty.':'It was for an exercise. The doctor left it. There is no penalty.'),
  ['','You do not know that word in here. You keep the hand out until he has gone, to be safe.']],cb)];

/* ===================================== MISAKI: CLEAR ===================================== */
const K80_MX=[
 cb=>say([
  ['','It comes back in pieces while you are eating toast, and you put the toast down.'],
  K76MV('(oh my GOD. i asked him to tell k9 he could have me. i asked V to hand me over to V)','(oh my god. i asked him to tell k9 he could have me. i asked v to hand me over to v)','(Oh my God. I asked him to tell K9 he could have me. I asked V to hand me over to V.)','(Oh my God. I asked him to tell K9 that he could have me. I asked V, to his face, to hand me over to V.)'),
  ['','You try laughing at it. It is funny; it is the funniest thing that has ever happened to anybody. The laugh gets as far as your ribs and stops.'],
  ['','He said “I will tell him.” You have gone over the three words a hundred times. He hates you. It is in his book. A man who hates you should have enjoyed that, and his voice did something else, and you do not have a word for what it did.'],
  K76MV('(don’t. don’t make it into something. he’s got a table downstairs with straps on it)','(don’t. don’t make it into something. he’s got a table downstairs with straps on)','(Don’t. Don’t make it into something. He’s got a table downstairs with straps on it.)','(Don’t. Do not make it into something. He has a table downstairs with straps on it, and my name in a book.)')],cb),
 cb=>say([
  ['','You count the thank-yous. The trays, the dressing, the light, the water, the door. You get to forty-one.'],
  ['','You have never thanked that man for anything in your life. You did it forty-one times for soup, in the good voice, and he took every one of them standing up. You would give a year of rent to have them back.'],
  ['','He comes in with the tray at one. He puts it down and waits, with his eyes on the wall, and you understand that he is waiting for the forty-second.']],
  ()=>ask('hitmeuppp','(He is waiting.)',[
   {t:'“none of those count. the thank yous. that wasn’t me”',fn:()=>{S.f.e2lThanks='told';save();say([
    K76V('I know. I did not keep them.'),
    K76MV('u keep everything','you keep everything. you’ve got a BOOK','You keep everything. You’ve got a book.','You keep everything, V. You have a whole book for keeping things.'),
    K76V('I did not keep those. They were not addressed to me.'),
    ['','He goes out. You eat the soup, and you do not say anything to the door, and it is the best thing you have done in a week.']],cb)}},
   {t:'“ur soup’s shit, by the way”',fn:()=>{S.f.e2lThanks='soup';save();say([
    K76V((typeof kdSA==='function'&&!kdSA())?'It is Ronin’s soup. It is out of a can.':'It is the doctor’s soup.'),
    (typeof kdSA==='function'&&!kdSA())?K76MV('then his is shit','then ronin’s soup is shit','Then Ronin’s soup is shit.','Then Ronin’s soup is shit, and you can tell him I said so.'):K76MV('then hers is shit','then the doctor’s soup is shit','Then the doctor’s soup is shit.','Then the doctor’s soup is shit, and you can tell her I said so.'),
    ['','For about a second he looks like a man who has been set down somewhere safe. Then he has his own face again.'],
    K76V((typeof kdSA==='function'&&!kdSA())?'I will convey it to him in those words.':'I will convey it to her in those words.')],cb)}}]))];

/* ===================================== V ===================================== */
const K80_V=[
 cb=>{const asked=!!S.f.e2lMedAsk;say([
  ['',asked?'They asked the tall one with the tray to carry a message to K9. He can have them. It is owed. He will pay you for it.':'This morning they asked the tall one with the tray, in the pleasant voice, whether anybody had told K9 where they were, because he would want to know, and he pays.'],
  ['','You take it upstairs and sit down with it.'],
  K76V('(They would sooner be given to me. To the man with the sheeting, who wrote SLOW. They have weighed me against whatever had them in that building, and I am the better death.)'),
  K76V('(I intended to be the worst thing that ever happened to them. I have been outbid.)'),
  ['','You go down to the cold room and stand beside the steel table for a long time. Then you take the straps off it, all six, and put them in the furnace.'],
  ['','You will need them again; there is always somebody. You watch them burn anyway, until the buckles drop through the grate.']],cb)},
 cb=>say([
  ['','You take your file on them down to the corridor and read it in the chair outside the door marked LAUNDRY. Forty pages. You read them the way a man re-reads a contract he has begun to doubt.'],
  ['','The driver at the gala. The doorman who swapped a shift. The man on a Tuesday, in front of his daughter. All of it is still true. It does not do what it did.'],
  ['',((typeof kdSA==='function'&&!kdSA())?'The films are on the lightbox. The hand, the ribs.':'The doctor has left the films on the light-box. The hand, the ribs.')+' Further up the long bones there are fine pale lines, one above another, where a child stopped growing for want of food and started again, several times.'],
  K76V('(I have forty pages of what they have done. Nobody in this city kept one page of what was done to them.)'),
  ['','You find that you have begun one, on the back of page forty, in pencil. You have written a date and the word “nine”. You stop, and put the cap on, and sit with the file shut on your knee until the tray is due.']],cb),
 cb=>say([
  ['','The doctor has a form. She needs a name on it for whoever consents, if they cannot.'],
  ['','They have no papers. They have never had papers. On the line for date of birth the doctor has written “March?”, because that is what they told her, in the pleasant voice.'],
  K76V('I am the nearest thing that they have to anybody in this house. I have also sworn, in writing, to kill them. Which of those do you require on the form?'),
  ['','The doctor has worked for you for eleven years. She holds out the pen and says nothing at all.'],
  ['','You write: K9. Under “relationship” you write CREDITOR, and look at it, and it is exact, and you sign.']],cb),
 cb=>say([
  ['',(typeof kdSA==='function'&&!kdSA())?'You asked them to open the left hand. It was for the exercise: ten times, on the hour.':'You asked them to open the left hand. It was for the doctor’s sheet: ten times, on the hour.'],
  ['','They heard an order. When the hand would not obey it, they held the other one out to you instead, palm up, '+(k80Gone()?'without a word, and kept it there.':'and said, most courteously, that this one worked and you could use this one.')],
  K76V('(They offered me the working hand, to be done with as I saw fit.)'),
  K76V('(I have wanted them afraid of me. I wrote it down as an aim. I did not know what it would look like, and I had not thought that it would be polite.)'),
  ['','You go out to the kennel and sit on the upturned bucket. The old hound comes and leans the whole of his weight against your knee.'],
  ['','You tell him what day it is, and that there is no penalty. He is a hound. He knew both of those already.']],cb),
 cb=>say([
  ['','At two in the morning Ronin is asleep in a kitchen chair in the kennel corridor, tipped back against the door marked LAUNDRY, with the crowbar across his knees.'],
  [RN,'(not opening his eyes) No offence, Vee. Your book says what it says.'],
  K76V('None is taken. I would have posted you there myself.'),
  [RN,'You gonna?'],K76V('No.'),
  [RN,'You know that, or you hopin’ it?'],
  ['','You do not answer. He opens one eye, and looks at you for some time with it, and shuts it again.'],
  [RN,'Yeah. Me too. Go get me a fuckin’ blanket.']],
  ()=>ask('K9','(The infirmary key is on your ring.)',[
   {t:'Give Ronin the key',sub:'so that it is not yours to use',fn:()=>{S.f.e2lMedKey='ronin';save();say([
    ['','You bring the blanket. You take the infirmary key off your ring and put it in his hand, and close his fingers on it.'],
    [RN,'You’re lockin’ yourself out your own basement.'],K76V('I am aware of what I am doing.'),
    [RN,'Yeah. I know you are. That’s what’s freakin’ me out.']],()=>{fr('r',2);cb()})}},
   {t:'Bring the blanket, and keep the key',fn:()=>{S.f.e2lMedKey='kept';save();say([
    ['','You bring the blanket and put it over him. The key stays on your ring. You are aware of it in your pocket for the rest of the night, the way you are aware of a tooth.'],
    [RN,'Night, Vee. I sleep light.'],K76V('I know that you do. It is why I can sleep at all.')],()=>{fr('r',1);cb()})}}]))];

/* ===================================== DELIVERY ===================================== */
function k80MedScene(){try{if(!S||!S.f||!K80()||dlg||typeof kdMed!=='function'||!kdMed())return null;
 if(typeof k73MedScene==='function'&&k73MedScene())return null;
 if((typeof k61Scene==='function'&&k61Scene())||(typeof k62Scene==='function'&&k62Scene())||(typeof k63Scene==='function'&&k63Scene()))return null;
 const cur=S.day+'/'+(S.slot||0),f=S.f;if(f.e2l80Slot===cur||f.e2lMedSlot===cur)return null;
 const run=(fn,bg,key,i)=>cb=>{f[key]=i+1;f.e2l80Slot=cur;save();go(cutBg(bg));fn(cb)};
 if(S.pov!=='v'){if((S.slot||0)>=2)return null;
  if(kdClar()<2){const i=f.e2l80MC||0;return i<K80_MC.length?run(K80_MC[i],'#0c0a08','e2l80MC',i):null}
  const i=f.e2l80MX||0;return i<K80_MX.length?run(K80_MX[i],'#1c2422','e2l80MX',i):null}
 const i=f.e2l80V||0;return i<K80_V.length?run(K80_V[i],'#06060c','e2l80V',i):null}catch(e){return null}}
const _hub80=hub;hub=function(){const a=arguments,self=this;try{const s=k80MedScene();if(s)return s(()=>_hub80.apply(self,a))}catch(e){}return _hub80.apply(self,a)};

/* ===================================== ENDINGS ===================================== */
const _xe80=extraEnding;extraEnding=function(){const L=_xe80();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f;
 if(f.e2lMedAsk)L.push('In the infirmary Misaki asked the tall one with the tray to tell K9 he could have them. V said that he would tell him. He burned the straps off his table that night.');
 if(f.e2lThanks==='told')L.push('Misaki thanked V forty-one times for soup while they took him for a captor. He says he did not keep them. They were not addressed to him.');
 if(f.e2lMedKey==='ronin')L.push('For the week Misaki was in the infirmary, Ronin held the only key. V put it in his hand himself.')}catch(e){}return L};
/* ===KC80-END=== */
