/* ===================== STORY SETTING: SUGGESTIVE SCENES (kc70) =====================
   META.sug (default on). "On" keeps flirting, innuendo, fade-outs and mornings after. "Off" plays a platonic version of
   every such scene instead: the same people and the same closeness, written as quiet company, catharsis, the kind of
   nothing they do together. Content modules branch with sugOn() at the line or scene that is suggestive.
   sugOn is a function declaration so every module in the one script can call it, whatever order it loads in. */
function sugOn(){return typeof META==='undefined'||!META||META.sug!==0}
const SUG_HELP='Suggestive scenes — <b>on</b> keeps the flirting, innuendo and fade-outs on the romance routes. <b>Off</b> replaces each of them with a platonic version: the same people, just as close, without the suggestion. Nothing is ever explicit either way.';
const sugLab=()=>'Suggestive scenes: '+(sugOn()?'on':'off');
const sugToggle=()=>{META.sug=sugOn()?0:1;saveMeta();toast(sugLab())};
const _setSug=settings;settings=function(){_setSug.apply(this,arguments);const box=document.querySelector('.panel');if(!box)return;
 const opts=box.querySelector('.opts');const p=document.createElement('p');p.innerHTML=sugLab().replace(': ',': <b>')+'</b>';p.style.marginTop='6px';
 const h=document.createElement('p');h.className='hint';h.innerHTML=SUG_HELP;if(opts){box.insertBefore(p,opts);box.insertBefore(h,opts);
  const o=document.createElement('div');o.className='opt';o.textContent='Suggestive scenes: turn '+(sugOn()?'off':'on');o.onclick=()=>{sugToggle();settings()};opts.insertBefore(o,opts.lastElementChild)}};
const _pmSug=pauseMenu;pauseMenu=function(){_pmSug.apply(this,arguments);const box=document.querySelector('.pausebox .pbtns');if(!box)return;const b=document.createElement('button');b.textContent=sugLab();b.title='Off replaces flirting and fade-outs with platonic versions that are just as close.';
 b.onclick=e=>{e.stopPropagation();sugToggle();b.textContent=sugLab()};box.insertBefore(b,box.lastElementChild)};
