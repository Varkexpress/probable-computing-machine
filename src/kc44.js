/* ===================== LOVE, AND NOT CARING (kc44) =====================
   Romantic lore for each route, plus short apathy notes. Routes: S.rom 'r'/'a' (Misaki with Ronin/Angel), S.vrom
   'r'/'a' (V with Ronin/Angel), S.f.married (V and Misaki). Love among the four looks like the rest of their lives:
   devoted to each other, indifferent to everything else. No new characters. */
const LV=()=>{try{return !isLone()&&!S.dark&&['normal','act2','act3','epilogue'].includes(S.phase)}catch(e){return false}};
const lvEv=(id,when,run)=>EVENTS.push({id,when:()=>{try{return LV()&&when()}catch(e){return false}},run});
const mP44=()=>S.pov!=='v';
/* Misaki and Ronin */
lvEv('rom_r_ring',()=>S.rom==='r'&&mP44()&&frT('r')>=3,done=>say([
 ['','Ronin takes the first of his nine skull rings off, the one on his index finger, the one with the first name inside it, and puts it on your thumb, because it is too big for anything else.'],
 [RN,'Thumbs are for the Devil. Figured he could share.'],
 ['hitmeuppp',MV('...it’s heavy.','it’s heavy. whose name’s in it.','It’s heavy. Whose name is inside?','It’s heavy. Whose name’s inside it? Actually, don’t tell me. I like wearing somebody I don’t know.')],
 [RN,'First one I ever did. Never took it off before. Don’t lose it, it’s the only thing I own that I’d come back from Hell for.'],
 ['','He goes straight back to the fight on the TV. Out on the street a siren goes past. You turn the ring round and round on your thumb, and it is the most romantic thing that has ever happened to you, and it is a dead man’s ring.']],()=>{fr('r',4);done()}));
lvEv('rom_r_cemetery',()=>S.rom==='r'&&frT('r')>=3&&S.day>=8,done=>say([
 ['','Their dates are in graveyards. Ronin brings a blanket and a thermos and a crowbar, in case. They lie on the grass between the stones and watch the planes.'],
 [RN,'Everybody here’s dead, and nobody here wants anythin’ from us. Best date spot in the city.'],
 ['','A groundskeeper shouts at them from the gate. Ronin waves at him with the crowbar, and he leaves. Nothing else in the world gets near them all night.']],()=>{fr('r',3);done()}));
/* Misaki and Angel */
lvEv('rom_a_channel',()=>S.rom==='a'&&frT('a')>=3,done=>say([
 ['','Angel has a second channel. It is private and it has one subscriber. Everything on it is the two of you: cereal at four in the morning, the drive back from a job, you asleep in the passenger seat with blood on your cuff.'],
 [AN,'two million people watch maria. one person watches this. it’s the only one i care about the numbers on.'],
 ['hitmeuppp',MV('who’s the one.','who’s the one subscriber.','Who’s the subscriber?','Who’s the one subscriber? It’s you, isn’t it. You watch us back at night.')],
 [AN,'it’s me. obviously it’s me. i rewatch the cereal one when i can’t sleep.'],
 ['','The comments on Maria’s main channel are full of people in love with her. She hasn’t read them in weeks.']],()=>{fr('a',4);done()}));
lvEv('rom_a_rule',()=>S.rom==='a'&&frT('a')>=3&&S.day>=8,done=>say([
 ['','Angel tells you the rule, the real one, lying in her bed in the dark: none of them can say they didn’t have it coming. Then she tells you there is one person it doesn’t apply to.'],
 [AN,'if anybody ever touches you again. i’m not going to check if they had it coming. i won’t even ask.'],
 ['hitmeuppp',MV('that’s sweet.','that’s the sweetest thing anyone’s said to me.','That’s the sweetest thing anyone has ever said to me.','That’s the most romantic thing anyone’s ever said to me, and it was a threat against a stranger. I love you. Go to sleep.')],
 ['','They are asleep in a minute. You lie awake a while, happy, while outside the city has the kind of night it has, and none of it reaches the bed.']],()=>{fr('a',4);done()}));
/* V and Angel */
lvEv('rom_va_file',()=>S.vrom==='a'&&S.pov==='v'&&frT('a')>=3,done=>say([
 ['','V keeps a file on each of the four, updated every January. Angel’s has changed. There are no notes in it any more. Every page is something she has said to him, dated, in fountain pen.'],
 [AN,'(reading over his shoulder) you made me a quote book. you made me a QUOTE BOOK, V.'],
 ['K9','It is a file.'],[AN,'it’s a quote book and i’m going to cry and then i’m going to shoot something.'],
 ['','She does both, that night, in that order. He drives.']],()=>{fr('a',4);done()}));
/* V and Ronin */
lvEv('rom_vr_pew',()=>S.vrom==='r'&&S.pov==='v'&&frT('r')>=3,done=>say([
 ['','Sunday. Ronin goes to the back pew every week; V has started going with him. He does not pray, and Ronin does not exactly pray either. Ronin falls asleep against his shoulder during the second hymn, every week, with his rings catching the light.'],
 ['K9','(I have been to church more in a year than in my whole life before it. I still do not believe in anything. I believe in this pew.)'],
 ['','A woman two rows ahead turns round to glare at the snoring. V looks at her until she turns back.']],()=>{fr('r',4);done()}));
lvEv('rom_vr_crowbar',()=>S.vrom==='r'&&frT('r')>=3&&S.day>=8,done=>say([
 ['','V cleans Ronin’s crowbar for him on Sunday nights, at the kitchen table, with the same care he gives his own knives. Ronin watches him do it with his chin on his fists.'],
 [RN,'Nobody cleans my shit for me.'],['K9','It has not been left on my table before.'],
 [RN,'That’s the gayest thing you ever said to me, Vee. Say it again, slower.'],
 ['','He says it again, slower. Outside there is a news van parked across the road, filming the house of somebody else. Neither of them goes to the window.']],()=>{fr('r',3);done()}));
/* V and Misaki, married */
lvEv('rom_vm_married',()=>S.f.married&&tier()>=3,done=>{const m=mP44();say([
 ['','Being married turns out to be mostly the same as before, with paperwork. You still eat cereal at the island. He still writes your quotes down. The hounds still sleep across both of you.'],
 ['',m?'The only real difference is that when the news says the city is frightened, you look at the ring, and then at him, and then you can’t find a single thing in the whole city that you need to be frightened of.':'The only difference is that when the news says the city is frightened, they look at the ring, and then at him, and then they change the channel.'],
 ['hitmeuppp',MV('we’re boring now.','we’re so boring. i love it.','We’ve become boring. I love it.','We’re boring now. We’re a boring married couple who feed people to hounds on Sundays. I didn’t know I was allowed this.')]],()=>{apply({aff:3});done()})});
/* V and Misaki, not a couple: the package deal */
lvEv('rom_vm_package',()=>!S.f.married&&!S.rom&&!S.vrom&&tier()>=3,done=>say([
 ['','People ask, sometimes. The few people who know them both. Whether V and Misaki are together.'],
 ['hitmeuppp',MV('we’re a set.','no. we’re a set. like salt and pepper.','No. We’re a set. Like a knife and a fork.','No. We’re a set. Not a couple, a set. You don’t ask if a knife and a fork are dating. You just don’t get one without the other.')],
 ['K9','That is accurate.'],
 ['','It is the most anyone has ever got out of either of them on the subject, and it is the whole truth.']],()=>{apply({aff:2});done()}));
/* ---------- apathy notes ---------- */
const AP_NOTES=[
 ['','The city has a curfew this week because of “the recent deaths.” The four of them break it every night, together, to get noodles.'],
 ['','There is a charity appeal on the radio for the families of the missing. V donates, anonymously, a large sum. He has never felt anything about it either way. He does it because it is tidy.'],
 ['','Angel reads out a news comment that says whoever is doing this must be a monster. Ronin says “aw,” the way you would about a puppy.'],
 ['','A man in the queue at the pharmacy is crying on the phone about his brother, who has been missing since Thursday. Misaki holds the door for him on the way out, and does not think about him again.'],
 ['','The four of them are asked, at the same dinner, what they would do if the world ended tomorrow. Nobody can think of a single thing they would change.'],
 ['','The news shows the river being dragged. V turns it off because the hounds want walking.']];
EVENTS.push({id:'ap_note',when:()=>{try{return LV()&&S.day>=4&&S.f.apDay!==S.day}catch(e){return false}},run:done=>{S.seen.ap_note=0;S.f.apDay=S.day;S.f.apN=(S.f.apN||0)+1;save();say([AP_NOTES[(S.f.apN-1)%AP_NOTES.length]],done)}});
if(typeof EV_REPEAT!=='undefined')EV_REPEAT.add('ap_note');
const _xeLV=extraEnding;extraEnding=function(){const L=_xeLV();if(!S||!S.seen)return L;
 if(S.seen.rom_r_ring)L.push('Misaki still wears a dead man’s skull ring on their thumb. Ronin has eight left, and has never once asked for it back.');
 if(S.seen.rom_a_channel)L.push('Angel’s second channel has one subscriber and four hundred videos. Every one of them is just the two of them, doing nothing.');
 if(S.seen.rom_vr_pew)L.push('V goes to church every Sunday. He still believes in nothing except the back pew.');
 return L};
