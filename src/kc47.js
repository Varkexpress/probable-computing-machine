/* ===================== THE WORST START, AND SMALL SAD THINGS (kc47) =====================
   Code "thetallone" (Settings → Enter a code, title screen or in a run): a new Misaki run that starts at the
   abduction under the worst conditions: barely close to V (so no early recognition, and the last-chance route on a
   second failed escape), composure 20, exhausted, and S.f.kdWorst, which adds 2 to the infirmary severity.
   Small sad things: one quiet line some mornings after the kidnapping, chosen from what actually happened. */
function codeHook(v){if(v!=='thetallone')return false;
 newRun('m');S.day=5;S.slot=3;S.paid=2;S.f.kidnapSet=1;S.aff=12;S.comp=20;S.energy=20;S.edge=10;S.orgs={sato:3};S.fr={a:30,r:30};S.f.kdWorst=1;S.dark=0;S.phase='normal';save();
 toast('The worst of it. Good luck.');setTimeout(()=>{try{takenM()}catch(e){console.error(e)}},60);return true}
const _sevKD=kdSev;kdSev=function(){return _sevKD()+(S&&S.f&&S.f.kdWorst?2:0)};
const SD_NOTES=[
 [()=>S.f.kdLoops,'A shop plays the bank jingle. Misaki finishes paying, says thank you, and walks out with no change and no shopping, and sits in the truck for a while.'],
 [()=>S.kd&&S.kd.xd,'There are three scratches on the infirmary wall above the bed. V has had every other wall in the house repainted this year. He has not touched those.'],
 [()=>S.kd&&S.kd.xd,'V has not used the word “tall” about anything since. Not doors, not trees, not men. He says “high,” and nobody remarks on it.'],
 [()=>1,'Misaki still eats every meal with her back to a wall. At the kitchen island she has moved her stool round to the end, and the dent it has left in the floor is already permanent.'],
 [()=>1,'The grey hound slept outside the infirmary door for a week after Misaki left it. Then she started sleeping outside Misaki’s door instead, and has never stopped.'],
 [()=>S.f.kdLaps||S.f.kdWalk,'Misaki walks every hallway in the house once before bed, the whole length, like laps. V has noticed, and noticed that she counts them, and leaves the lights on along the route.'],
 [()=>1,'There is a paper cup in Misaki’s trailer, on the shelf, washed. It is the one the water came in, the first morning in the cell. She doesn’t know why she kept it.'],
 [()=>S.f.kdRelapse,'Some nights V hears counting through the wall, very quiet. He says the day and the place out loud from his own bed. The counting stops. Neither of them ever mentions it.'],
 [()=>1,'Misaki has started leaving her phone on, face up, all night, every night, on the pillow next to her. In case. She has never said in case of what.'],
 [()=>S.f.kdBook,'The note-taker’s handwriting turns up on a delivery slip, or something close to it. Misaki signs for the parcel with her left hand, badly, and then washes both hands three times.'],
 [()=>1,'V keeps a page at the back of his notebook headed with the dates she was gone. There is nothing written under them. He has never been able to decide what to write.'],
 [()=>1,'Every so often Misaki says “i’m fine” in answer to a question nobody asked.']];
EVENTS.push({id:'sd_note',when:()=>{try{return typeof kdPost==='function'&&kdPost()&&!isLone()&&S.f.sdDay!==S.day&&kdD()>=2}catch(e){return false}},run:done=>{S.seen.sd_note=0;S.f.sdDay=S.day;const all=SD_NOTES.map((x,i)=>[x,i]).filter(([x])=>{try{return x[0]()}catch(e){return false}});const used=S.f.sdUsed||[];
 const left=all.filter(([,i])=>!used.includes(i));if(!left.length){done();return}const [x,i]=pk(left);S.f.sdUsed=used.concat([i]);save();say([['',x[1]]],done)}});
if(typeof EV_REPEAT!=='undefined')EV_REPEAT.add('sd_note');
