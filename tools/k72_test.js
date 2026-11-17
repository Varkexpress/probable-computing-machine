/* kc72 (small hours): every route, every option, all five wake levels per route with the suggestive setting on and off,
   both triggers (afterBed for Misaki, sleepJ for V), the gates, the kc71 and nightWake exclusions, the ending lines,
   and the text checks (no V contractions, no hound names). Usage: node tools/k72_test.js */
const path=require('path'),ROOT=path.resolve(__dirname,'..');
const pw=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await pw.chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+ROOT+'/index.html');await p.waitForTimeout(400);await p.keyboard.press('x');await p.waitForTimeout(400);
await p.evaluate(()=>{document.querySelectorAll('.splash').forEach(e=>e.remove());
 /* a route on a bench save: m routes on Misaki's, v routes on V's; ph n/2/3/e */
 window.__set=(r,ph,o)=>{o=o||{};const bi={n:r[0]==='m'?0:1,2:r[0]==='m'?2:3,3:r[0]==='m'?4:5,e:r[0]==='m'?6:7}[ph||'n'];benchLoad(BENCH[bi]);for(let k=0;k<80&&dlg;k++)adv();
  const v=r[0]==='v';S.pov=v?'v':'m';S.rom=v?null:r[1];S.vrom=v?r[1]:null;S.romDates=v?0:(o.d??1);S.vromDates=v?(o.d??1):0;
  S.dark=0;S.lone=null;S.f.abroad=0;S.f.kidnapSet=0;if(S.kd)S.kd.med=null;S.f.heartbreak=0;S.f.romMarried=0;S.f.vromKey=0;if(S.q)delete S.q.romwed;
  S.fr={a:o.fr??0,r:o.fr??0};S.f.k65d=o.k65d||{};S.f.k67d=o.k67d||{};Object.assign(S.f,o.f||{});
  ['mr','ma','vr','va'].forEach(x=>{S.f['k72'+x]=0});S.f.k71Peach=0;S.done=S.done||{};S.done.job=v?0:1;S.done.k72nw=0;if(v){S.done.meet=0;S.f.lastVHunt=S.day}
  S.bed=o.bed||(v?'trailer':'trailer');save()};
 /* drive dialogue and options until fin() or nothing left; picks are used in order, then 0 */
 window.__drive=(picks,fin)=>{const txt=[];let pi=0;for(let i=0;i<400&&!fin();i++){if(typeof dlg!=='undefined'&&dlg){const l=dlg.lines&&dlg.lines[dlg.i];if(l)txt.push([l[0],String(l[1])]);adv();continue}
  const o=[...document.querySelectorAll('.opt:not(.dis)')];if(o.length){o[Math.min(picks[pi++]||0,o.length-1)].click();continue}break}return txt}});
let fails=0,runs=0;const ok=(c,m)=>{runs++;if(!c){fails++;console.log('FAIL',m)}};const all=[];
const R=['mr','ma','vr','va'],HOW={mr:['pliers','blow','torch'],ma:['hand','chat','maths'],vr:['own','voice','hounds'],va:['paw','colour','mine']};

/* 1. every option per route, in every phase it can play in */
for(const r of R)for(const ph of ['n','2','3','e'])for(let c=0;c<3;c++){
 const res=await p.evaluate(([r,ph,c])=>{__set(r,ph,{d:2,fr:55,bed:c===1?(r==='mr'?'ronin':r==='ma'?'angel':'trailer'):'trailer'});const ok0=k72Ok();let fin=0;k72Play(r,()=>{fin=1});
  const txt=__drive([c],()=>fin);return {ok0,fin,how:S.f['k72'+r+'How'],lv:S.f['k72'+r+'W'],played:S.f['k72'+r],txt}},[r,ph,c]);
 all.push(...res.txt);const s=res.txt.map(x=>x[1]).join(' | ');
 ok(res.ok0===r,`${r} ${ph} ${c} gate ${res.ok0}`);ok(res.fin,`${r} ${ph} ${c} finished`);ok(res.how===HOW[r][c],`${r} ${ph} ${c} how ${res.how}`);
 ok(res.played===1&&res.lv>=1&&res.lv<=5,`${r} ${ph} ${c} flags`);ok(!/undefined|NaN|\[object/.test(s),`${r} ${ph} ${c} text`)}

/* 2. all five wake levels per route, suggestive setting on and off */
const LV={
 1:{d:1,fr:0},2:{d:3,fr:0},3:{d:3,fr:55},4:{d:3,fr:80,k65d:{x_one:1}},
 5:{d:3,fr:80,k65d:{a:1,b:1,c:1},f:{romMarried:'x',vromKey:'x'}}};
for(const r of R)for(const lv of [1,2,3,4,5]){const o=JSON.parse(JSON.stringify(LV[lv]));if(o.k65d)o.k65d=Object.fromEntries(Object.keys(o.k65d).map(k=>[r+'_'+k,1]));
 if(o.f){if(r[0]==='m'){o.f={romMarried:r[1]}}else o.f={vromKey:r[1]}}
 const out={};for(const sug of [1,0]){out[sug]=await p.evaluate(([r,o,sug])=>{__set(r,'n',o);META.sug=sug;const want=k72Lvl(r);let fin=0;k72Wake(r,()=>{fin=1});
  const txt=__drive([],()=>fin);META.sug=1;return {want,lv:S.f['k72'+r+'W'],fin,txt}},[r,o,sug]);all.push(...out[sug].txt)}
 ok(out[1].lv===lv&&out[0].lv===lv,`${r} level ${lv} got ${out[1].lv}/${out[0].lv}`);ok(out[1].fin&&out[0].fin,`${r} level ${lv} finished`);
 const t1=out[1].txt.map(x=>x[1]).join('|'),t0=out[0].txt.map(x=>x[1]).join('|');
 ok(lv===5?t1!==t0:t1===t0,`${r} level ${lv} sug branch`);ok(!/undefined/.test(t1+t0),`${r} level ${lv} text`)}
/* level rules: level 5 needs the bond; engaged Misaki counts; the epilogue lowers the bar by one */
const rules=await p.evaluate(()=>{const g={};
 __set('vr','n',{d:3,fr:80,k65d:{vr_a:1,vr_b:1,vr_c:1}});g.vrNoKey=k72Lvl('vr');
 __set('vr','n',{d:3,fr:80,k67d:{vr67_a:1,vr67_b:1,vr67_c:1},f:{vromKey:'r'}});g.vrK67=k72Lvl('vr');
 __set('mr','n',{d:3,fr:80,k65d:{mr_a:1,mr_b:1,mr_c:1}});S.q.romwed=1;g.mrEngaged=k72Lvl('mr');
 __set('ma','e',{d:3,fr:80,k65d:{ma_a:1}});S.q.romwed=0;g.maEpi=k72Lvl('ma');
 __set('va','n',{d:3,fr:80,k65d:{ma_a:1,mr_b:1,vr_c:1}});g.vaOther=k72Lvl('va');return g});
ok(rules.vrNoKey===4&&rules.vrK67===5&&rules.mrEngaged===5&&rules.maEpi===5&&rules.vaOther===3,'level rules '+JSON.stringify(rules));

/* 3. gates */
const gates=await p.evaluate(()=>{const g={};const t=(r,f,o)=>{__set(r,'n',o||{});f();return k72Ok()};
 g.base=['mr','ma','vr','va'].map(r=>t(r,()=>{}));
 g.noJob=t('mr',()=>{S.done.job=0});g.noHunt=t('vr',()=>{S.f.lastVHunt=S.day-1;S.f.lastHunt=S.day-1});g.meet=t('va',()=>{S.f.lastVHunt=-9;S.done.meet=1});
 g.noDate=t('ma',()=>{S.romDates=0});g.once=t('mr',()=>{S.f.k72mr=1});g.dark=t('ma',()=>{S.dark=1});g.lone=t('vr',()=>{S.lone={}});
 g.abroad=t('va',()=>{S.f.abroad=1});g.kidnap=t('mr',()=>{S.f.kidnapSet=1});g.kidnapA2=(()=>{__set('mr','2');S.f.kidnapSet=1;return k72Ok()})();
 g.med=t('ma',()=>{S.kd=S.kd||{};S.kd.med={}});g.after=t('vr',()=>{S.phase='after'});g.taken=t('mr',()=>{S.phase='taken'});
 g.nw=t('ma',()=>{S.done.k72nw=1});g.vOnM=t('mr',()=>{S.pov='v'});g.mOnV=t('vr',()=>{S.pov='m'});g.none=t('mr',()=>{S.rom=null});return g});
ok(JSON.stringify(gates.base)==='["mr","ma","vr","va"]'&&gates.meet==='va','gates open '+JSON.stringify(gates));
for(const k of ['noJob','noHunt','noDate','once','dark','lone','abroad','kidnap','med','after','taken','nw','vOnM','mOnV','none'])ok(!gates[k],'gate '+k+' '+gates[k]);
ok(gates.kidnapA2==='mr','kidnapSet only blocks the normal phase');

/* 4. triggers: afterBed for Misaki (kc71 never on the same night), sleepJ for V, nightWake marks the night */
const trig=await p.evaluate(()=>{const g={};globalThis.K72_FORCE=1;globalThis.K71_FORCE=1;
 __set('mr','n',{d:2,fr:55,bed:'vbed'});S.aff=100;g.k71would=k71Ok();afterBed();g.mr72=S.f.k72mr;g.mr71=S.f.k71Peach;
 __set('ma','n',{d:2,fr:55,bed:'vbed'});S.aff=100;S.done.job=0;afterBed();g.ma72NoJob=S.f.k72ma;
 __set('vr','n',{d:2,fr:55});sleepJ();g.vr72=S.f.k72vr;
 __set('va','n',{d:2,fr:55});S.pov='m';S.rom='a';S.vrom=null;S.romDates=2;S.done.job=1;sleepJ();g.vaFromM=S.f.k72va;g.maViaSleepJ=S.f.k72ma;
 __set('vr','n',{d:2,fr:55});nightWake(()=>{});g.nwMarked=S.done.k72nw;
 globalThis.K72_FORCE=0;globalThis.K71_FORCE=0;return g});
ok(trig.k71would&&trig.mr72===1&&!trig.mr71,'afterBed plays kc72 and skips kc71 '+JSON.stringify(trig));
ok(trig.ma72NoJob===0||!trig.ma72NoJob,'no job, no scene');ok(trig.vr72===1,'sleepJ plays V route');
ok(!trig.vaFromM&&!trig.maViaSleepJ,'sleepJ ignores Misaki POV');ok(trig.nwMarked===1,'nightWake marks the night');

/* 5. ending lines */
const end=await p.evaluate(()=>{const o={};for(const r of ['mr','ma','vr','va']){__set(r,'e',{d:3});const n0=extraEnding().length;S.f['k72'+r]=1;const L=extraEnding();o[r]={n:L.length-n0,hit:L.filter(x=>/tread|duvet|gospel hour|ring light in the kennel/.test(x)).length}}return o});
for(const r of R)ok(end[r].n===1&&end[r].hit===1,'ending '+r+' '+JSON.stringify(end[r]));

/* 6. text: V never contracts; hounds never named */
const src=require('fs').readFileSync(ROOT+'/src/kc72.js','utf8');
const vb=all.filter(([w,t])=>w==='K9'&&/n[’']t\b|[’'](re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here)[’']s\b/i.test(t.replace(/“[^”]*”/g,'')));
ok(!vb.length,'V contractions '+vb.map(x=>x[1]).slice(0,3).join(' || '));
ok(!/\['K9','[^']*\b\w+’(t|s|re|ll|ve|d)\b/.test(src),'V contractions in source');
ok(!all.some(([w,t])=>/\b(Biscuit|Sergeant|Mochi|Pancake|Elysium)\b/.test(t)),'hound names');
if(process.env.V)console.log(all.slice(0,40).map(x=>x[0]+': '+x[1]).join('\n'));console.log('lines seen',all.length,'checks',runs);
console.log(fails?'K72 FAIL '+fails:'K72 OK','page errors',errs.length,errs.slice(0,3));await b.close();process.exit(fails||errs.length?1:0)})();
