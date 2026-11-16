/* ===================== kc69: last module — topic sync =====================
   Several modules push talk topics onto TDTOP_V/TDTOP_M only; the talk menu reads TOPICS_V/TOPICS_M.
   Copy any topic that is missing, keeping the menu's last entry (the "leave" row) last. */
[[TDTOP_V,TOPICS_V],[TDTOP_M,TOPICS_M]].forEach(([src,dst])=>{
 if(typeof dst==='undefined'||!dst)return;
 src.forEach(t=>{if(t&&t.id&&!dst.find(x=>x&&x.id===t.id))dst.splice(Math.max(0,dst.length-1),0,t)});
});
