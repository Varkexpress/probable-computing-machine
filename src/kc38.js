/* ===================== LORE: SHIRTLESS AT HOME (kc38) =====================
   Misaki is shirtless most of the time in V's house: they don't care about gender standards, and nobody on the
   server cares either. They are flat and unusually lanky from childhood malnutrition, and count it as luck: no
   dysphoria from a chest that never developed. Not in the after-phase (dressings, cast) or while taken. */
const shOK=()=>S&&!S.dark&&S.f.shirt!==1&&!['taken','after'].includes(S.phase)&&HOUSE.includes(S.room)&&!(typeof kdCond==='function'&&kdCond()>0);
let SHF=0;
const SH_CACHE=new Map();
function shBare(a){let b=SH_CACHE.get(a);if(b)return b;const g=a.map(r=>r.split(''));
 for(let j=12;j<=19&&j<g.length;j++)for(let i=3;i<=14&&i<g[j].length;i++){const ch=g[j][i];if(ch!=='.'&&ch!=='k'&&ch!=='K'&&ch!=='S')g[j][i]='s'}
 const front=a.some(r=>r.includes('e'));if(front){for(const [j,i] of [[14,6],[14,11],[16,6],[16,11]])if(g[j]&&g[j][i]==='s')g[j][i]='S'}
 b=g.map(r=>r.join(''));b.P=a.P;b.S=a.S;if(SH_CACHE.size>60)SH_CACHE.clear();SH_CACHE.set(a,b);return b}
const _pxSH=tdPx;tdPx=function(a,cx,fy,flip,ps,pal){if(SHF&&a&&a.length>=30)a=shBare(a);return _pxSH(a,cx,fy,flip,ps===undefined?1:ps,pal)};
const _actSH=tdActor;tdActor=function(k){if(k!=='m'||!shOK())return _actSH.apply(this,arguments);SHF=1;try{return _actSH.apply(this,arguments)}finally{SHF=0}};

EVENTS.push({id:'lore_shirt',when:()=>{try{return !isLone()&&!S.dark&&['normal','act2','epilogue'].includes(S.phase)&&S.day>=3&&tier()>=1}catch(e){return false}},run:done=>{const m=S.pov!=='v';
 say(m?[
  ['','Kitchen, nine in the morning. You’re eating cereal out of the box at the island in V’s house, in shorts and nothing else, which is how you’ve dressed in this house since about the second week.'],
  ['','V puts a coffee down beside you without looking up from the paper. Ronin, on the couch, has not looked up either. Nobody in this house has ever said anything about it, and nobody on the server ever did. You put a selfie in the chat once with no shirt on and the only reply was Angel saying the lighting was good.'],
  ['hitmeuppp',MV('(flat as a plank lol.)','(flat as a plank. ribs like a xylophone. long arms. whatever.)','(Flat as a plank, ribs you could play, arms like a coat hanger. I’m built like a lamp.)','(I’m flat as a plank and built like a coat hanger. Ribs you could play a tune on. Whatever happened before I was nine, it didn’t feed me much, and I came out long and thin and flat, and I stayed that way.)')],
  ['hitmeuppp',MV('(lucky tho.)','(lucky though. honestly.)','(I got lucky with it, honestly.)','(And honestly? Lucky. If anything had grown there I’d have hated it, I know I would. I’d have spent years strapping it down and wanting it gone. It never came. Shitty childhood, one free gift. I’ll take it.)')],
  [RN,'(from the couch, not looking) Put a shirt on, you’re makin’ me cold.'],
  ['hitmeuppp',MV('no.','no. ur not even looking.','No. You’re not even looking.','No. You’re not even looking, you’re watching a man get stabbed on the TV, I can hear it.')],
  [RN,'Yeah, ’cause you’re borin’ t’look at. Flat as a fuckin’ ironing board. Pass the cereal.']]:[
  ['','Nine in the morning. Misaki is at the kitchen island in shorts, eating cereal out of the box. They have not worn a shirt inside this house since the second week, and he has never once remarked on it, and does not intend to start.'],
  ['','He puts a coffee down beside them and turns the page. Ronin is on the couch and has not looked up. On the server, nobody ever said a word either; Angel once complimented the lighting.'],
  ['K9','(I notice only the ribs. One can count them from across the room. They were like that when I met them. I have been feeding them for a year and the ribs have not moved, and I have stopped expecting them to.)'],
  [RN,'(from the couch, not looking) Put a shirt on, you’re makin’ me cold.'],
  ['hitmeuppp',MV('no.','no. ur not even looking.','No. You’re not even looking.','No. You’re watching a man get stabbed on the TV, you’re not even looking.')],
  ['K9','The floor is heated. I had it heated for this reason. Ronin may wear a second shirt.']],()=>{apply({aff:1});fr('r',1);done()})}});
TDTOP_M.push({id:'lore_ribs',label:()=>'“You do not wear a shirt in the house.”',show:()=>!S.dark&&tier()>=2&&!(S.talks&&S.talks.lore_ribs),run:b=>{S.talks=S.talks||{};S.talks.lore_ribs=1;warm('m','lore_ribs',4);say([
 ['K9','You do not wear a shirt in the house. I am not objecting. I am asking whether you are warm enough.'],
 ['hitmeuppp',MV('ya. ur floor is hot.','yeah. ur floor’s heated. it’s great.','Yes. Your floor’s heated. It’s great.','Yeah. Your floor’s heated, it’s like living on toast. And it’s your house, and nobody here cares, so why would I bother.')],
 ['hitmeuppp',MV('also nothing to cover lol.','also there’s nothing to cover. flat. always was.','Also there’s nothing to cover. I’m flat. Always have been.','Also, there’s nothing there to cover. Never was. I didn’t eat much before nine, I think, and whatever was supposed to grow just didn’t bother. I came out long and thin and flat.')],
 ['K9','That is the malnutrition. On your films there are fine lines across the long bones, like rings in a tree. Each one is a time your body stopped growing because there was nothing to grow with, and started again later.'],
 ['hitmeuppp',MV('cool.','huh. like tree rings. cool.','Like tree rings. Huh. How many?','Tree rings. Huh. So my legs kept a diary I can’t read. How many are there?')],
 ['K9','Eleven.'],
 ['hitmeuppp',MV('lucky tho.','lucky though. i mean it.','I count it as lucky, though. I mean that.','I count it as lucky, though, for real. If something had grown there I’d have spent my whole life wanting it off me. It never came. Worst childhood, one good side effect. Don’t make the face.')],
 ['K9','I am not making a face.'],['','He is making a face. He goes and makes them breakfast as well, a second one, and does not explain.']],b)}});
const _chatSH=chatLog;chatLog=function(){const L=_chatSH();if(!S||S.phase==='taken'||isLone())return L;const k=(S.day*3+S.slot)%5;
 if(k===0)L.push(['ro','hitmeuppp you’re shirtless in the background of Vee’s meeting call again'],['mi','and??'],['ro','nothin. the donor was starin at the ceiling the whole time. respect']);
 if(k===2)L.push(['an','new rule for the group photo: misaki can wear whatever she wants and that includes nothing on top. the lighting is better that way'],['k9','Seconded. Quietly.']);
 return L};
