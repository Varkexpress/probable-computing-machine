/* ===================== THE BIRDCAGE (kc39, compact) ===================== */
EVENTS.push({id:'dream_cage',when:()=>{try{return S.pov!=='v'&&!isLone()&&S.phase!=='taken'&&!(S.kd&&S.kd.med)&&S.day>=4&&tier()>=1}catch(e){return false}},run:done=>say([
 ['','They dream of a white birdcage the size of a cathedral, hung in stars, its floor scattered with their things made over in glass. They touch a bar and the whole cage goes to dust. They fall a long way and land on a snake as wide as a road. It looks at them with green eyes.'],
 ['hitmeuppp',MV('(weird.)','(weird dream. not a bad one.)','(Strange dream. Not a bad one.)','(First dream I’ve had that wasn’t a room I had to get out of. That one had a way out, and I didn’t want it.)')]],done)});
