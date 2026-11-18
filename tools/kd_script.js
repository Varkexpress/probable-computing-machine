#!/usr/bin/env node
/* Compile the kidnapping arc's text (captivity, the infirmary, the recovery and its endings) into one readable script.
   Run from the repo root:   node tools/kd_script.js
   Writes docs/kidnapping_script.md and docs/kidnapping_script.html. Read-only on the game code.

   How it works: every source file is parsed with acorn (a JS parser; found in the local or global node_modules), and the
   syntax tree is walked in source order. Dialogue is recognised by shape: [speaker, text] pairs inside say()/cut() arrays,
   ask(who, prompt, options), option objects {t, sub}, phone threads (txDef nodes: in / opts / reply), phQueue/kdTell texts,
   and text tables (objects and arrays of prose strings). MV()/byT() become the four tier variants; pk() becomes "one of";
   ternaries and if-statements become labelled branches. Nothing is paraphrased: every quoted line is the game's string,
   with ${…} expressions shown as [placeholders]. Scenes are then arranged into sections by the SECTIONS table below. */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');

function loadAcorn() {
  const tries = ['acorn'];
  try { const g = require('child_process').execSync('npm root -g', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); tries.push(path.join(g, 'acorn')); } catch (e) {}
  tries.push('/opt/node-tools/node_modules/acorn', '/usr/lib/node_modules/acorn', '/usr/local/lib/node_modules/acorn');
  for (const t of tries) { try { return require(t); } catch (e) {} }
  console.error('acorn not found: npm i -g acorn (or npm i acorn in the repo) and run again'); process.exit(1);
}
const acorn = loadAcorn();

/* ------------------------------------------------------------------ sources */
const IDX = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
function originalRegion() {
  let s = IDX.slice(IDX.indexOf('<script>\n"use strict";') + 8, IDX.lastIndexOf('</script>'));
  const cutBlock = (b, e) => { const a = s.indexOf(b), z = s.indexOf(e); if (a >= 0 && z > a) s = s.slice(0, a) + ' '.repeat(0) + s.slice(z + e.length); };
  cutBlock('/* ===TD-BEGIN=== */', '/* ===TD-END=== */');
  cutBlock('/* ===UI2-BEGIN=== */', '/* ===UI2-END=== */');
  return s;
}
const SRC = {};
SRC['index.html'] = originalRegion();
for (let n = 27; n <= 68; n++) { const f = `kc${n}.js`, p = path.join(ROOT, 'src', f); if (fs.existsSync(p)) SRC[f] = fs.readFileSync(p, 'utf8'); }

/* ------------------------------------------------------------------ text helpers */
const SPEAKER = { '': '', hitmeuppp: 'Misaki', K9: 'V', Angelic: 'Angel', 'ronin.beaufort': 'Ronin', AN: 'Angel', RN: 'Ronin', B: '[boss]', boss: '[boss]',
  P: '[the doctor]', N: '[name]', M: 'Misaki', V: 'V', sys: '(phone)', 'hitmeuppp (in chat)': 'Misaki (in chat)', me: 'Misaki / V', who: 'Misaki / V', w: '[speaker]', ME: 'Misaki / V', MS: 'Misaki', VV: 'V', DOC: 'The doctor' };
const TX_WITH = { m: 'Misaki', v: 'V', a: 'Angel', r: 'Ronin', g: 'The group', an: 'Angel', ro: 'Ronin', mar: 'Maria' };
const PH = [
  [/^(ORG\[S\.captor\]\.boss|o\.boss|B|boss|ORG\[[^\]]+\]\.boss)$/, '[boss]'],
  [/^(ORG\[S\.captor\]\.name|o\.name|ORG\[[^\]]+\]\.name|on|oname)$/, '[captor org]'],
  [/^(h|kdHrs\(\)|S\.kd\.hrs|k\.hrs|hrs)$/, '[hours]'],
  [/^(kdDays\(\)|S\.kd\.days|k\.days|days|d)$/, '[days]'],
  [/^(k|kills|r\.kills)$/, '[number]'],
  [/^(nick\(\))$/, '[nickname]'],
  [/^(S\.name|nm)$/, '[name]'],
  [/^x\.n(ame)?$|^x\.who$|^t\.n$|^x\.n\.replace/, '[list name]'],
  [/^w59O\(.*\)\.name$|^org\.front$/, '[org]'], [/^k56Hits\(\)$/, '[number of hits]'], [/^k61Cap\(|^a60Cap\(/, '[number, in words]'],
  [/^S\.f\.kdScrews$/, '[screw count]'], [/^IR\.R$/, '[resolve]'], [/Math\.|\*\d|[+-]\d+\)?$/, '[number]'], [/^\(?S\.day\)?$/, '[day]'],
];
function phName(src) {
  src = src.replace(/\s+/g, ' ').trim();
  if (/=>/.test(src)) return /\.map\(/.test(src) ? '[one entry per name]' : '[…]';
  for (const [re, v] of PH) if (re.test(src)) return v;
  return '[' + (src.length > 48 ? src.slice(0, 45) + '…' : src) + ']';
}
const clean = s => String(s).replace(/<br\s*\/?>/gi, ' ').replace(/<\/(h\d|p|div)>/gi, ' ').replace(/<\/?[a-z][a-z0-9]*(\s[^<>]*)?>/gi, '').replace(/&nbsp;/g, ' ').replace(/[ \t]+/g, ' ').trim();

/* ------------------------------------------------------------------ condition notes */
let COND_KEEP = false;
const ONCE_OK = /^(kdTold|movedIn|kdBook|kdCast|kdKeep|kdStab|kdInterrupted|kdBye|kdKit|kdPhotos|kdCupTook|kdRes|kdHas|kdLoops|kdRonCall|lastChance|married|finalRuin|called|schedule|informant|kdAlert|kdBldg)$/;
const COND = [
  [/^(S\.pov!==?'v'|kdMe\(\)|S\.pov==='m'|isMe|mine|w59Me\(\)==='m'|k58M\(\)|m|me|mm|isM\(\)&&S\.pov!=='v'|mP\(\))$/, 'Misaki POV'],
  [/^(S\.pov===?'v'|!kdMe\(\)|S\.pov!=='m'|w59Me\(\)==='v'|!k58M\(\)|!m|isV\(\)|vP\(\))$/, 'V POV'],
  [/^S\.pov==='both'$/, 'both POVs'],
  [/^(kdSA\(\)|k61SA\(\)|k62SA\(\))$/, 'full-story setting'], [/^(!kdSA\(\)|kdOff\(\)|!k61SA\(\)|!k62SA\(\))$/, 'injuries-only setting'],
  [/^(kdPost\(\)|k56Post\(\)|k58Post\(\))$/, 'after discharge from the infirmary'],
  [/^(kdMed\(\)|k61Med\(\)|k62Med\(\))$/, 'during the infirmary stay'],
  [/^(kdMedM\(\)|kdIn\(\)|kd60In\(\)|k61M\(\)|k62M\(\))$/, 'Misaki in the infirmary'],
  [/^(kdWR\(\)|k61WR\(\))$/, 'worst route (severity 8+, still deluded)'],
  [/^(k61Worst\(\)|k62Worst\(\)|kdWorstOf\(\))$/, 'worst stay (severity 8+, not reasoned out)'],
  [/^kdFri\(\)$/, 'a Friday night is possible (severity 6+)'],
  [/^S\.phase==='taken'$/, 'during captivity'], [/^S\.phase==='after'$/, 'in the after-phase'], [/^S\.phase!=='after'$/, 'Act II or later'],
  [/^S\.phase==='act2'$/, 'Act II'], [/^S\.phase==='act3'$/, 'Act III'], [/^S\.phase==='epilogue'$/, 'epilogue'], [/^S\.phase==='normal'$/, 'before the kidnapping'],
  [/^\[(.*)\]\.includes\(S\.phase\)$/, (m) => 'phase: ' + m[1].replace(/'/g, '').split(',').join(' / ')],
  [/^S\.dark$/, 'after the kidnapping (dark)'], [/^!S\.dark$/, 'not in the dark stretch'],
  [/^isLone\(\)$/, 'lone route'], [/^!isLone\(\)$/, ''], [/^W59\(\)$|^A60\(\)$/, ''], [/^S\.f\.lateRoute==='self'$/, 'after the spiral (V alone)'],
  [/^tier\(\)>=(\d)$/, (m) => `closeness tier ${m[1]}+`], [/^tier\(\)<(\d)$/, (m) => `closeness tier below ${m[1]}`], [/^tier\(\)===(\d)$/, (m) => `closeness tier ${m[1]}`],
  [/^frT\('a'\)>=(\d)$/, (m) => `Angel friendship ${m[1]}+`], [/^frT\('r'\)>=(\d)$/, (m) => `Ronin friendship ${m[1]}+`],
  [/^kdD\(\)>=(\d+)$/, (m) => `day ${m[1]}+ after discharge`], [/^kdD\(\)>(\d+)$/, (m) => `day ${+m[1] + 1}+ after discharge`],
  [/^S\.kd\.said>=?(\d)$|^k\.said>=?(\d)$/, (m) => `she talked under the needle (${m[1] || m[2]}+)`],
  [/^S\.f\.kdWorst$/, 'worst start (code thetallone)'],
  [/^S\.f\.kdTold$/, 'she told the doctor (hidden route)'], [/^!S\.f\.kdTold$/, 'she has not told the doctor'],
  [/^S\.f\.kdKeep===1$/, 'she kept the room'], [/^S\.f\.kdKeep===0$/, 'she let it go blank'],
  [/^S\.f\.kdStab$/, 'she put the drip needle in V’s arm'], [/^!S\.f\.movedIn$/, 'she has not moved in'], [/^S\.f\.movedIn$/, 'she has moved in'],
  [/^S\.f\.kdBook==='read'$/, 'she read the notebook'],
  [/^(lo|lo\(\)|kdClar\(\)<2)$/, 'she still thinks it is a cell (clarity under 2)'], [/^(hi|hi\(\)|kdClar\(\)>=2)$/, 'she knows where she is (clarity 2+)'],
  [/^kdClar\(\)>=3$/, 'full clarity'], [/^(S\.kd\.med\.clar|m\.clar|med\.clar)<(\d)$/, (m) => `clarity under ${m[2]}`], [/^(S\.kd\.med\.clar|m\.clar|med\.clar)>=(\d)$/, (m) => `clarity ${m[2]}+`],
  [/^\(?S\.kd\.med\.d\|?\|?0?\)?>=(\d)$/, (m) => `infirmary day ${+m[1] + 1}+`],
  [/^\(S\.kd\.sev0\|\|0\)>=(\d+)$|^S\.kd\.sev0>=(\d+)$/, (m) => `stay severity ${m[1] || m[2]}+`],
  [/^kdBand\(\)==='(\w+)'$/, (m) => `state of mind: ${m[1]}`],
  [/^\(?S\.f\.missing\|?\|?0?\)?>=(\d)$/, (m) => `${m[1]}+ nights missing`],
  [/^S\.f\.(\w+)$/, (m) => `flag ${m[1]} set`], [/^!S\.f\.(\w+)$/, (m) => ONCE_OK.test(m[1]) || COND_KEEP ? `${m[1]} not set` : ''],
  [/^!S\.done\.\w+$|^!\(S\.talks&&.*\)$|^!S\.f\[id\]$|^!w59F\(\)\.\w+$|^!S\.seen\.\w+$/, ''],
  [/^S\.f\.(\w+)===?('?[\w-]+'?)$/, (m) => `${m[1]} = ${m[2]}`], [/^S\.f\.(\w+)!==?undefined$/, (m) => `${m[1]} decided`],
  [/^S\.f\.(\w+)===undefined$/, (m) => `${m[1]} not yet decided`],
  [/^\(?S\.f\.(\w+)\|?\|?0?\)?>=(\d+)$/, (m) => `${m[1]} ≥ ${m[2]}`],
  [/^\(?S\.kd\.deny\|?\|?0?\)?>=(\d+)$/, (m) => `denial ${m[1]}+`],
  [/^S\.comp<(\d+)$/, (m) => `composure under ${m[1]}`], [/^S\.comp>=(\d+)$/, (m) => `composure ${m[1]}+`], [/^S\.comp<=(\d+)$/, (m) => `composure ${m[1]} or less`],
  [/^(S\.seen\.|k56Seen\('|w59Seen\(')(\w+)'?\)?$/, (m) => `after ${m[2]}`],
  [/^S\.rom==='(\w)'$/, (m) => `romance: Misaki + ${{ r: 'Ronin', a: 'Angel', v: 'V' }[m[1]] || m[1]}`],
  [/^late$/, 'it is too late in the day'], [/^S\.done\.\w+$/, 'already done today'],
  [/^opts\.every\(/, 'every option left is a leak (resolve too low)'], [/^opts\.filter\(.*===0$/, ''], [/^n===(\d)$/, (m) => `n = ${m[1]} (session or count)`],
  [/^S\.lone==='v'$/, 'V’s lone route'], [/^S\.lone==='m'$/, 'Misaki’s lone route'], [/^S\.kd\.said$/, 'she said something under the needle'],
  [/^self$/, 'she got out on her own'], [/^S\.phase!=='taken'$/, 'not during captivity'], [/^kdWarned\(\)$/, 'the people in the notebook were warned'],
  [/^rx\.palmed$/, 'she hid tablets'], [/^S\.leaks>0$/, 'she leaked something under questioning'], [/^true$/, ''],
  [/^isM\(\)$|^KD_RUN$|^globalThis\.KD_AUTO$|^S\.f\.kdBye\.length$|^S\.kd\.rx$|^S\.kd\.lostDay!==S\.day$/, ''],
  [/^\(S\.paid\|\|0\)>=(\d)$/, (m) => `rent paid ${m[1]}+ times`], [/^!S\.rom$/, 'no romance with Angel or Ronin'],
  [/^kdSev\(\)>=(\d+)$/, (m) => `stay severity ${m[1]}+`],
  [/^S\.list\.some\(x=>x\.id==='(\w+)'&&x\.st\)$/, (m) => `the ${m[1]} man has been dealt with (list)`],
  [/^S\.list\.some\(x=>x\.id==='(\w+)'&&!x\.st&&!x\.gone\)$/, (m) => `the ${m[1]} man is still on the list`],
  [/^S\.list\.some\(x=>!x\.st&&!x\.gone\)$/, 'a name is left on the list'],
  [/^W59G_ORDER\.some\(id=>w59G\(id\)\)$/, 'one of the list men was glimpsed before the van'],
  [/^S\.kd\.lost>=1$/, 'she has lost an afternoon'], [/^S\.kd\.anc<3$/, 'fewer than three anchors'], [/^S\.kd\.lost<5$/, ''],
  [/^Math\.random\(\)/, 'at random'], [/^S\.day>S\.takenDay$/, 'from the second day'], [/^a3d\(\)>=(\d+)$/, (m) => `Act III day ${m[1]}+`],
  [/^KD_DOOR\.some/, 'a door topic is left'], [/^kdFileShow\(\)$/, 'the chapter-one file is open to talk about'],
  [/^\(S\.f\.kdDraft\|\|0\)<4$/, 'fewer than four drafts so far'], [/^S\.f\.kdDraftDay!==S\.day$/, 'once a day'],
  [/^S\.day>S\.f\.kdCrash\+1$/, 'two days after the first collapse'],
  [/^S\.day<\(S\.f\.returnDay\|\|0\)\+(\d+)$/, (m) => `within ${m[1]} days of her return`], [/^S\.day>\(S\.f\.returnDay\|\|0\)\+(\d+)$/, (m) => `from day ${+m[1] + 1} after her return`],
  [/^!!(.*)$/, (m) => condPart(m[1])],
  [/^kdSpiralSecret\(\)$/, 'the secret is caught in time (2+ clues and a goodbye left for V)'],
  [/^typeof\w+(!==|===)'(function|undefined)'$|^S\.kd(\.med)?$|^S$|^S\.f$|^m$|^S\.kd\.med\.br3$|^S\.kd\.t0$|^S\.list$|^dlg$|^!dlg$/, ''],
  [/^!S\.kd\.med$/, 'out of the infirmary'],
  [/^S\.kd\.med\.br3==='(\w+)'$|^m\.br3==='(\w+)'$/, (m) => `in the bright turn she chose to sit: ${m[1] || m[2]}`],
  [/^ok$|^r\.ok$|^won$/, 'success'], [/^!ok$|^!r\.ok$/, 'failure'],
];
function condPart(src, scope) {
  src = src.replace(/\s+/g, '');
  if (/^\(.*\)$/.test(src) && balanced(src.slice(1, -1))) {
    const inner = src.slice(1, -1);
    if (splitTop(inner, '||').length > 1 || splitTop(inner, '&&').length > 1) { const t = condText(inner, scope); return t ? '(' + t + ')' : ''; }
    src = inner;
  }
  if (scope && /^!?[A-Za-z_$][\w$]*$/.test(src)) {
    const neg = src[0] === '!', id = neg ? src.slice(1) : src;
    if (scope[id] && scope[id] !== src && scope[id].length < 160) {
      const inner = condText(scope[id], null);
      if (neg && inner === 'Misaki POV') return 'V POV';
      if (neg && inner === 'V POV') return 'Misaki POV';
      return neg ? 'not (' + inner + ')' : inner;
    }
  }
  src = src.replace(/(^|[^.\w$])f\.(?=\w)/g, '$1S.f.').replace(/(^|[^.\w$])k\.(said|hrs|ses|deny|days|lost|anc)\b/g, '$1S.kd.$2');
  for (const [re, v] of COND) { const m = src.match(re); if (m) return typeof v === 'function' ? v(m) : v; }
  return '`' + (src.length > 110 ? src.slice(0, 107) + '…' : src) + '`';
}
function splitTop(src, op) {
  const out = []; let d = 0, q = null, last = 0;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if ('([{'.includes(c)) d++; else if (')]}'.includes(c)) d--;
    else if (d === 0 && src.startsWith(op, i)) { out.push(src.slice(last, i)); last = i + op.length; i += op.length - 1; }
  }
  out.push(src.slice(last)); return out;
}
function condText(src, scope) {
  src = String(src).replace(/\s+/g, ' ').trim().replace(/^\(\)\s*=>\s*/, '').replace(/^\{\s*try\s*\{\s*return\s+(.*?)\s*\}\s*catch\s*\(\w*\)\s*\{\s*return\s+false;?\s*\}\s*\}$/, '$1').replace(/^\{?\s*return\s+/, '').replace(/;?\s*\}$/, '');
  let s = src.replace(/\s+/g, '');
  while (/^\(.*\)$/.test(s) && splitTop(s.slice(1, -1), '&&').join('&&') === s.slice(1, -1) && balanced(s.slice(1, -1))) s = s.slice(1, -1);
  const ors = splitTop(s, '||');
  if (ors.length > 1) return ors.map(o => condText(o, scope)).filter(Boolean).join(' or ');
  return splitTop(s, '&&').map(p => condPart(p, scope)).filter(Boolean).join(', ');
}
function balanced(s) { let d = 0; for (const c of s) { if (c === '(') d++; else if (c === ')') { d--; if (d < 0) return false; } } return d === 0; }

/* ------------------------------------------------------------------ the walker */
const CODE_KEYS = new Set(['id', 'when', 'show', 'act', 'fn', 'run', 'fx', 'at', 'mark', 'kd', 'with', 'pov', 'prio', 'expire', 'next', 'e', 'c', 'leak',
  'dis', 'map', 'guards', 'sens', 'smoke', 'actor', 'takedown', 'guardCol', 'autoExit', 'col', 'bg', 'pal', 'draw', 'enter', 'key', 'cb', 'ok', 'icon',
  'hint', 'title', 'smokeName', 'backLabel', 'name', 'walk', 'back', 'zones', 'floor', 'wall', 'arrive', 'rounds',
  'img', 'sfx', 'font', 'size', 'tag', 'pin', 'type', 'kind', 'org', 'st', 'warm', 'aff', 'edge', 'heart', 'comp', 'energy', 'funds', 'calm', 'heat']);
const NOT_SCENE_CALLEES = new Set(['ask', 'say', 'cut', 'warm', 'phQueue', 'kdTell', 'go', 'toRoom', 'apply', 'toast', 'fr', 'frT', 'save', 'tdMap', 'panel',
  'showCG', 'journal', 'jot', 'addNote', 'note', 'calm', 'pk', 'MV', 'byT', 'D', 'cutBg', 'stealth', 'simon', 'lockpick', 'require', 'setTimeout', 'chat',
  'mVoice', 'k56Mark', 'k57Mark', 'k58Set', 'kdDeny', 'console', 'push', 'includes', 'find', 'filter', 'map', 'some', 'every', 'indexOf', 'replace']);
const TEXT_CALLS = { MV: 'tier', byT: 'tier', pk: 'one of', D: 'dark' };

function isProse(s) {
  if (typeof s !== 'string') return false;
  const t = s.trim(); if (!t) return false;
  if (/^#[0-9a-f]{3,8}$|^\.[a-z]|=>|function\b|\bpx\b|rgba?\(|^\w+_\w+$|^[a-z]+[A-Z]\w*$|^https?:/i.test(t)) return false;
  if (/^[a-z0-9_]+$/.test(t)) return false;
  return /\s/.test(t) || /[.!?…”)]$/.test(t) || /^[“"(\[]/.test(t);
}

function mkCtx(file, code) { return { file, code, scenes: [], stack: [], scope: {} }; }
function src(ctx, n) { return ctx.code.slice(n.start, n.end); }
function lineOf(ctx, n) { let l = 1; for (let i = 0; i < n.start; i++) if (ctx.code.charCodeAt(i) === 10) l++; return l; }
function cur(ctx) { return ctx.stack[ctx.stack.length - 1]; }
function emit(ctx, item) {
  const s = cur(ctx); if (!s) return;
  if (item.type === 'loose' && item.alts && item.alts.every(a => (a.text.replace(/\[[^\]]*\]/g, '').match(/[A-Za-z]/g) || []).length < 3)) return;
  s.items.push(item);
}
function pushScene(ctx, sc) { sc.items = []; sc.unit = ctx.stack.length ? ctx.stack[0].id : sc.id; if (sc.cond === undefined) sc.cond = sc.when ? condText(sc.when, ctx.scope) : ''; sc.file = ctx.file; ctx.scenes.push(sc); ctx.stack.push(sc); }
function popScene(ctx) {
  const sc = cur(ctx);
  if (sc && sc.def) for (const k of Object.keys(sc.def)) { const f = sc.def[k]; if (!f.used) { f.used = 1; walk(ctx, f.node, 0); } }
  ctx.stack.pop();
}
function findDef(ctx, name) { for (let i = ctx.stack.length - 1; i >= 0; i--) { const sc = ctx.stack[i]; if (sc.def && Object.prototype.hasOwnProperty.call(sc.def, name)) return sc.def[name]; } return null; }

/* alternatives of a text expression: [{label, text}] or null if not text */
function alts(ctx, n, depth = 0) {
  if (!n || depth > 8) return null;
  switch (n.type) {
    case 'Literal': return typeof n.value === 'string' ? [{ label: '', text: n.value }] : null;
    case 'TemplateLiteral': {
      let s = '';
      n.quasis.forEach((q, i) => { s += q.value.cooked; if (i < n.expressions.length) s += inline(ctx, n.expressions[i]); });
      return [{ label: '', text: s }];
    }
    case 'BinaryExpression': {
      if (n.operator !== '+') return null;
      const a = alts(ctx, n.left, depth + 1) || [{ label: '', text: phName(src(ctx, n.left)), ph: 1 }];
      const b = alts(ctx, n.right, depth + 1) || [{ label: '', text: phName(src(ctx, n.right)), ph: 1 }];
      if (a.every(x => x.ph) && b.every(x => x.ph)) return null;
      if (a.length * b.length > 8) return [{ label: '', text: inline(ctx, n.left) + inline(ctx, n.right) }];
      const out = []; for (const x of a) for (const y of b) out.push({ label: [x.label, y.label].filter(Boolean).join('; '), text: x.text + y.text });
      return out;
    }
    case 'ConditionalExpression': {
      const a = alts(ctx, n.consequent, depth + 1), b = alts(ctx, n.alternate, depth + 1);
      if (!a && !b) return null;
      const c = condText(src(ctx, n.test), ctx.scope);
      const lab = (pre, l) => [pre, l].filter(Boolean).join('; ');
      return [].concat((a || [{ label: '', text: '(nothing)' }]).map(x => ({ label: lab('if ' + c, x.label), text: x.text })),
        (b || [{ label: '', text: '(nothing)' }]).map(x => ({ label: lab('otherwise', x.label), text: x.text })));
    }
    case 'LogicalExpression': {
      if (n.operator === '||' || n.operator === '??') { const a = alts(ctx, n.left, depth + 1), b = alts(ctx, n.right, depth + 1); if (a && b) return a.concat(b.map(x => ({ label: 'fallback', text: x.text }))); return a || b; }
      return null;
    }
    case 'CallExpression': {
      const nm = calleeName(n);
      if (TEXT_CALLS[nm]) {
        let args = n.arguments;
        if (nm === 'pk' && args[0] && args[0].type === 'ArrayExpression') args = args[0].elements;
        const out = [];
        args.forEach((a, i) => {
          const v = alts(ctx, a, depth + 1); if (!v) return;
          const lab = nm === 'pk' ? 'one of' : nm === 'D' ? (i ? 'dark' : 'normal') : 'tier ' + i;
          v.forEach(x => out.push({ label: [lab, x.label].filter(Boolean).join('; '), text: x.text }));
        });
        return out.length ? out : null;
      }
      if (nm === 'mVoice' || nm === 'clean' || nm === 'String') return alts(ctx, n.arguments[0], depth + 1);
      if (n.callee.type === 'MemberExpression' && /^(toUpperCase|toLowerCase|trim)$/.test(n.callee.property.name || '')) return alts(ctx, n.callee.object, depth + 1);
      if (n.callee.type === 'MemberExpression' && n.callee.property.name === 'join' && n.callee.object.type === 'ArrayExpression') {
        const parts = n.callee.object.elements.map(e => inline(ctx, e)); return [{ label: '', text: parts.join(n.arguments[0] ? (n.arguments[0].value || '') : ',') }];
      }
      return null;
    }
    case 'ArrowFunctionExpression': if (n.expression) return alts(ctx, n.body, depth + 1); return null;
    case 'MemberExpression': {
      if (n.computed && n.object.type === 'ArrayExpression' && n.object.elements.length && n.object.elements.every(e => e && ((e.type === 'Literal' && typeof e.value === 'string') || e.type === 'TemplateLiteral'))) {
        const ix = src(ctx, n.property).replace(/\s+/g, '');
        return n.object.elements.map((e, i) => ({ label: `${i + 1} of ${n.object.elements.length} (by ${ix.length > 30 ? 'count' : ix})`, text: alts(ctx, e)[0].text }));
      }
      return null;
    }
    case 'SequenceExpression': return alts(ctx, n.expressions[n.expressions.length - 1], depth + 1);
    default: return null;
  }
}
function inline(ctx, n) {
  const a = alts(ctx, n);
  if (!a) return phName(src(ctx, n));
  if (a.length === 1) return a[0].text;
  return '{' + a.map(x => (x.label ? x.label + ': ' : '') + x.text).join(' | ') + '}';
}
function calleeName(n) {
  const c = n.callee; if (c.type === 'Identifier') return c.name;
  if (c.type === 'MemberExpression' && !c.computed) return c.property.name;
  return '';
}
function speakerOf(ctx, n) {
  if (n.type === 'Literal' && typeof n.value === 'string') return n.value in SPEAKER ? SPEAKER[n.value] : n.value;
  if (n.type === 'Identifier') return n.name in SPEAKER ? SPEAKER[n.name] : '[' + n.name + ']';
  if (n.type === 'ConditionalExpression') {
    const a = speakerOf(ctx, n.consequent), b = speakerOf(ctx, n.alternate);
    return a === b ? a : (a || 'narration') + ' / ' + (b || 'narration');
  }
  if (n.type === 'MemberExpression') { const s = src(ctx, n); return /boss/.test(s) ? '[boss]' : '[' + s + ']'; }
  return '[' + src(ctx, n).slice(0, 30) + ']';
}
function looksSpeaker(ctx, n) {
  if (n.type === 'Literal') return typeof n.value === 'string' && n.value.length <= 26 && (n.value in SPEAKER || (!TX_CONTACT && /^[A-Z@?]/.test(n.value) && !/[.!,…“”]/.test(n.value))) && !/^\[|^\d/.test(n.value);
  if (n.type === 'Identifier') return n.name in SPEAKER || /^[A-Z][A-Z0-9_]{0,10}$/.test(n.name) || /^(me|who|w|sp|sk|spk|nm|n)$/.test(n.name);
  if (n.type === 'ConditionalExpression') return looksSpeaker(ctx, n.consequent) && looksSpeaker(ctx, n.alternate);
  if (n.type === 'MemberExpression') return /boss|\.n$|who/.test(src(ctx, n));
  return false;
}
function hasText(ctx, n) {
  let found = false;
  (function rec(x) {
    if (found || !x || typeof x !== 'object') return;
    if (x.type === 'Literal' && isProse(x.value)) { found = true; return; }
    if (x.type === 'Identifier' && GOTO[x.name]) { found = true; return; }
    if (x.type === 'TemplateLiteral' && x.quasis.some(q => isProse(q.value.cooked))) { found = true; return; }
    for (const k in x) { if (k === 'parent') continue; const v = x[k]; if (Array.isArray(v)) v.forEach(rec); else if (v && typeof v.type === 'string') rec(v); }
  })(n);
  return found;
}
function propKey(p) { if (!p.key) return ''; return p.key.type === 'Identifier' ? p.key.name : String(p.key.value); }
function getProp(o, k) { return o.properties.find(p => p.type === 'Property' && propKey(p) === k); }

/* a line [speaker, text] */
function asLine(ctx, n) {
  if (n.type !== 'ArrayExpression' || n.elements.length < 2 || n.elements.length > 3) return null;
  const [s, t] = n.elements; if (!s || !t) return null;
  if (!looksSpeaker(ctx, s)) return null;
  const a = alts(ctx, t); if (!a) return null;
  if (!a.some(x => isProse(x.text) || (s.type === 'Literal' && s.value in SPEAKER) || (s.type === 'Identifier' && s.name in SPEAKER))) return null;
  return { type: 'line', who: speakerOf(ctx, s), alts: a.map(x => ({ label: x.label, text: clean(x.text) })) };
}

let TX_CONTACT = null, TX_PLAYER = null;
function returns(st) {
  if (!st) return false;
  if (st.type === 'ReturnStatement') return true;
  if (st.type === 'BlockStatement') return st.body.length > 0 && returns(st.body[st.body.length - 1]);
  if (st.type === 'ExpressionStatement' && st.expression.type === 'SequenceExpression') return false;
  return false;
}
function walkStatements(ctx, list, d) {
  for (let i = 0; i < list.length; i++) {
    const st = list[i];
    if (st.type === 'IfStatement' && !st.alternate && returns(st.consequent) && hasText(ctx, st.consequent)) {
      const rest = list.slice(i + 1);
      if (rest.some(r => hasText(ctx, r))) {
        const c = condText(src(ctx, st.test), ctx.scope);
        branch(ctx, ifText(c), d, () => walk(ctx, st.consequent, d + 1));
        branch(ctx, otherwise(c), d, () => walkStatements(ctx, rest, d + 1));
        return;
      }
    }
    walk(ctx, st, d);
  }
}
function branch(ctx, text, d, fn) {
  const sc = cur(ctx); if (!sc) return fn();
  const at = sc.items.length; sc.items.push({ type: 'branch', text, d });
  fn();
  if (sc.items.length === at + 1) sc.items.pop();
}
function walk(ctx, n, d) {
  if (!n || typeof n !== 'object') return;
  if (Array.isArray(n)) { n.forEach(x => walk(ctx, x, d)); return; }
  switch (n.type) {
    case 'BlockStatement': case 'Program': return walkStatements(ctx, n.body, d);
    case 'Identifier': {
      const f = findDef(ctx, n.name);
      if (f) { if (!f.used) { f.used = 1; walk(ctx, f.node.body || f.node, d); } else emit(ctx, { type: 'note', text: `(then the same passage as above)`, d }); }
      return;
    }
    case 'VariableDeclarator':
      if (n.id.type === 'Identifier' && n.init && /FunctionExpression/.test(n.init.type) && cur(ctx) && cur(ctx).kind !== 'unit' + 'x' && ctx.stack.length && hasText(ctx, n.init) && !/^[A-Z]/.test(n.id.name)) {
        const sc = cur(ctx); sc.def = sc.def || {}; sc.def[n.id.name] = { node: n.init, used: 0 }; return;
      }
      if (n.id.type === 'Identifier' && n.init) ctx.scope[n.id.name] = src(ctx, n.init);
      if (n.id.type === 'Identifier' && n.init && cur(ctx) && /^[A-Z][A-Z0-9_]+$/.test(n.id.name) && hasText(ctx, n.init) && cur(ctx).items.length) emit(ctx, { type: 'key', text: n.id.name, d });
      walk(ctx, n.init, d); return;
    case 'ArrayExpression': {
      const L = asLine(ctx, n);
      if (L) { L.d = d; emit(ctx, L); if (n.elements[2]) walk(ctx, n.elements[2], d); return; }
      for (const e of n.elements) {
        if (e && (e.type === 'Literal' || e.type === 'TemplateLiteral' || (e.type === 'BinaryExpression' && e.operator === '+') || (e.type === 'CallExpression' && TEXT_CALLS[calleeName(e)]))) {
          const a = alts(ctx, e);
          if (a && a.some(x => isProse(x.text) || (TX_CONTACT && x.text.trim() && !/^[a-z]+_[a-z0-9_]+$/.test(x.text)))) { emit(ctx, { type: TX_CONTACT ? 'line' : 'loose', who: TX_CONTACT || '', alts: a.map(x => ({ label: x.label, text: clean(x.text) })), d, msg: !!TX_CONTACT }); continue; }
        }
        walk(ctx, e, d);
      }
      return;
    }
    case 'ObjectExpression': return walkObject(ctx, n, d);
    case 'CallExpression': return walkCall(ctx, n, d);
    case 'IfStatement': {
      if (!hasText(ctx, n.consequent) && !hasText(ctx, n.alternate)) { return; }
      const c = condText(src(ctx, n.test), ctx.scope);
      branch(ctx, ifText(c), d, () => walk(ctx, n.consequent, d + 1));
      if (n.alternate) {
        if (n.alternate.type === 'IfStatement') { walk(ctx, n.alternate, d); }
        else if (hasText(ctx, n.alternate)) branch(ctx, otherwise(c), d, () => walk(ctx, n.alternate, d + 1));
      }
      return;
    }
    case 'ConditionalExpression': {
      const tc = hasText(ctx, n.consequent), ta = hasText(ctx, n.alternate);
      if (!tc && !ta) return;
      const a = (n.consequent.type !== 'ArrayExpression' && n.consequent.type !== 'ObjectExpression') ? alts(ctx, n) : null;
      if (a && a.length && n.consequent.type !== 'CallExpression') { emit(ctx, { type: 'loose', alts: a.map(x => ({ label: x.label, text: clean(x.text) })), d }); return; }
      const c = condText(src(ctx, n.test), ctx.scope);
      if (tc) branch(ctx, ifText(c), d, () => walk(ctx, n.consequent, d + 1));
      if (ta) branch(ctx, tc ? otherwise(c) : 'Unless ' + c, d, () => walk(ctx, n.alternate, d + 1));
      return;
    }
    case 'LogicalExpression': {
      if (n.operator === '&&' && hasText(ctx, n.right) && !hasText(ctx, n.left)) {
        branch(ctx, ifText(condText(src(ctx, n.left), ctx.scope)), d, () => walk(ctx, n.right, d + 1)); return;
      }
      walk(ctx, n.left, d); walk(ctx, n.right, d); return;
    }
    case 'SwitchStatement': {
      walk(ctx, n.discriminant, d);
      for (const cs of n.cases) { if (!hasText(ctx, cs)) continue; branch(ctx, cs.test ? 'Case ' + src(ctx, n.discriminant) + ' = ' + src(ctx, cs.test) : 'Default case', d, () => walk(ctx, cs.consequent, d + 1)); }
      return;
    }
    case 'Literal': if (isProse(n.value) && n.value.length > 14) emit(ctx, { type: TX_CONTACT ? 'line' : 'loose', who: TX_CONTACT || '', alts: [{ label: '', text: clean(n.value) }], d, msg: !!TX_CONTACT }); return;
    case 'TemplateLiteral': {
      const a = alts(ctx, n); if (a && isProse(clean(a[0].text)) && a[0].text.length > 14) emit(ctx, { type: 'loose', alts: a.map(x => ({ label: x.label, text: clean(x.text) })), d });
      for (const e of n.expressions) if (!alts(ctx, e) && hasText(ctx, e)) walk(ctx, e, d + 1);
      return;
    }
    case 'BinaryExpression': if (n.operator === '+') { const a = alts(ctx, n); if (a && a.some(x => isProse(x.text))) { emit(ctx, { type: 'loose', alts: a.map(x => ({ label: x.label, text: clean(x.text) })), d }); return; } } walk(ctx, n.left, d); walk(ctx, n.right, d); return;
  }
  for (const k in n) {
    if (k === 'type' || k === 'start' || k === 'end' || k === 'loc' || k === 'range') continue;
    const v = n[k]; if (v && typeof v === 'object') walk(ctx, v, d);
  }
}

function ifText(c) { return c ? 'If ' + c : 'If (an internal state check passes)'; }
function otherwise(c) { return c === 'Misaki POV' ? 'Otherwise (V POV)' : c === 'V POV' ? 'Otherwise (Misaki POV)' : c === 'full-story setting' ? 'Otherwise (injuries-only setting)' : c === 'injuries-only setting' ? 'Otherwise (full-story setting)' : 'Otherwise'; }
function walkObject(ctx, n, d) {
  const id = getProp(n, 'id'), t = getProp(n, 't'), label = getProp(n, 'label');
  // an event or topic: {id:'…', when, run} / {id, label, show, run}
  if (id && id.value.type === 'Literal' && typeof id.value.value === 'string' && (getProp(n, 'run') || getProp(n, 'act') || getProp(n, 'nodes') || getProp(n, 'fn'))) {
    const w = getProp(n, 'when') || getProp(n, 'show');
    const lab = label ? alts(ctx, label.value) : null;
    pushScene(ctx, { id: id.value.value, kind: getProp(n, 'label') ? 'topic' : 'event', when: w ? src(ctx, w.value) : '', title: lab ? lab.map(x => x.text).join(' / ') : '', line: lineOf(ctx, n) });
    for (const p of n.properties) if (p.type === 'Property' && !['id', 'label', 'when', 'show'].includes(propKey(p))) walk(ctx, p.value, 0);
    else if (p.type === 'SpreadElement') walk(ctx, p, 0);
    popScene(ctx); return;
  }
  // a room spot: {label, act}
  if (label && getProp(n, 'act')) {
    const lab = alts(ctx, label.value);
    const sh = getProp(n, 'show');
    pushScene(ctx, { id: 'spot: ' + (lab ? lab.map(x => clean(x.text)).filter((v, i, a) => a.indexOf(v) === i).join(' / ') : src(ctx, label.value)), kind: 'spot', when: sh ? src(ctx, sh.value) : '', title: '', line: lineOf(ctx, n), parent: cur(ctx) ? cur(ctx).id : '' });
    if (lab && lab.length > 1) emit(ctx, { type: 'note', text: 'Spot label: ' + lab.map(x => (x.label ? x.label + ' → ' : '') + '“' + clean(x.text) + '”').join('; '), d: 0 });
    for (const p of n.properties) if (p.type === 'Property' && !['label', 'show', 'at', 'mark'].includes(propKey(p))) walk(ctx, p.value, 0);
    popScene(ctx); return;
  }
  // an option: {t:'…', sub, fn | r | reply | next}
  if (t && (getProp(n, 'fn') || getProp(n, 'sub') || getProp(n, 'r') || getProp(n, 'reply') || getProp(n, 'next') || getProp(n, 'dis') || getProp(n, 'c') || getProp(n, 'leak') || getProp(n, 'fx'))) {
    const ta = alts(ctx, t.value), sb = getProp(n, 'sub'), dis = getProp(n, 'dis');
    if (ta) {
      const sa = sb ? alts(ctx, sb.value) : null;
      const costs = [];
      const c = getProp(n, 'c'); if (c && c.value.type === 'Literal') costs.push('resolve −' + c.value.value);
      if (getProp(n, 'leak')) costs.push('they get what they want');
      emit(ctx, { type: 'opt', who: TX_PLAYER || '', alts: ta.map(x => ({ label: x.label, text: clean(x.text) })), sub: sa ? sa.map(x => clean(x.text)).filter((v, i, a) => a.indexOf(v) === i).join(' / ') : costs.join(', '),
        dis: dis ? (dis.value.type === 'Literal' && dis.value.value === true ? 'greyed out' : (COND_KEEP = true, 'greyed out when ' + condText(src(ctx, dis.value), ctx.scope) + ((COND_KEEP = false), ''))) : '', d });
      const saveC = TX_CONTACT;
      for (const p of n.properties) {
        if (p.type !== 'Property') continue; const k = propKey(p);
        if (['t', 'sub', 'dis', 'c', 'leak', 'e', 'next'].includes(k)) continue;
        if (k === 'reply' || k === 'r') { TX_CONTACT = k === 'reply' ? saveC : null; walk(ctx, p.value, d + 1); TX_CONTACT = saveC; continue; }
        TX_CONTACT = null; walk(ctx, p.value, d + 1); TX_CONTACT = saveC;
      }
      const nx = getProp(n, 'next'); if (nx && nx.value.type === 'Literal') emit(ctx, { type: 'note', text: '→ goes to “' + nx.value.value + '”', d: d + 1 });
      return;
    }
  }
  // generic object: tables keyed by name
  for (const p of n.properties) {
    if (p.type === 'SpreadElement') { walk(ctx, p.argument, d); continue; }
    const k = propKey(p);
    if (CODE_KEYS.has(k) && !['in', 'opts', 'reply', 'r', 'pre', 'post', 'o', 'nodes', 'L', 'lines'].includes(k)) {
      if (['run', 'act', 'fn', 'fx', 'enter', 'cb'].includes(k)) walk(ctx, p.value, d);
      continue;
    }
    if (k === 'in') { walk(ctx, p.value, d); continue; }
    if (!hasText(ctx, p.value)) continue;
    const textual = alts(ctx, p.value);
    if (textual && p.value.type !== 'ArrowFunctionExpression') {
      emit(ctx, { type: 'loose', key: k, alts: textual.map(x => ({ label: x.label, text: clean(x.text) })), d }); continue;
    }
    if (!['opts', 'o', 'pre', 'post', 'r', 'reply', 'nodes', 'L', 'lines', 'start'].includes(k) || (ctx.inNodes && k !== 'opts')) emit(ctx, { type: 'key', text: k, d });
    const was = ctx.inNodes; if (k === 'nodes') ctx.inNodes = true;
    walk(ctx, p.value, k === 'opts' || k === 'pre' || k === 'post' || k === 'o' || k === 'nodes' || k === 'r' || k === 'L' || k === 'lines' ? d : d + 1);
    ctx.inNodes = was;
  }
}

const CHAT_U = { an: 'Angel', ro: 'Ronin', mi: 'Misaki', k9: 'V' };
/* calls that hand over to another scene or a minigame: shown as "→ …" so the flow is visible */
const GOTO = {
  interrogate: 'the interrogation', kdTheyCome: 'they come for another session', kdDose: 'the dose', kdBlankQ: 'the question about before nine',
  escapeRun: 'escape run (stealth minigame)', failedEscape: 'the failed escape', escaped: 'she gets out on her own', vRescue: 'V’s rescue (stealth minigame)',
  vRescueCut: 'V arrives at the loading bay', rescued: 'V reaches her cell', kdDock: 'the loading dock (stealth minigame)', kdCarry: 'carrying her out (stealth minigame)',
  after: 'after: into the infirmary', kdMedStart: 'waking in the infirmary', kdMedRun: 'running from the infirmary (stealth minigame)',
  kdLogicOut: 'she reasons it out', kdSpiral: 'the spiral', kdInterrupted: 'the secret, interrupted', kdBright: 'the bright turn', kdGoodbye: 'the Friday goodbyes',
  startLone: 'V’s lone route', kdKeepIt: 'keep the room', kdLetGo: 'let it go blank', finale: 'the finale', finalM: 'Misaki’s infiltration (stealth minigame)', finalV: 'V’s infiltration (stealth minigame)',
  lockpick: 'lockpick minigame', simon: 'step-memory minigame', kdTurn: 'hold-still minigame', ground: 'breathing minigame', kdHoldOn: 'the chair (hold-steady minigame)',
  kdVisitor: 'a visitor', theList: 'the list', listTarget: 'a name on the list', kdShatterFx: 'the shatter (the cell drawing breaks away)', kdScout: 'hunt along the river',
};
function walkCall(ctx, n, d) {
  const nm = calleeName(n), A = n.arguments;
  if (n.callee.type === 'Identifier' && GOTO[nm]) emit(ctx, { type: 'note', text: '→ ' + GOTO[nm], d, go: 1 });
  for (const a of A) if (a.type === 'Identifier' && GOTO[a.name]) emit(ctx, { type: 'note', text: '→ ' + GOTO[a.name], d, go: 1 });
  if (A.length === 2 && A[0].type === 'Literal' && A[0].value in CHAT_U) {
    const a = alts(ctx, A[1]); if (a) { emit(ctx, { type: 'line', who: CHAT_U[A[0].value] + ' (server chat)', alts: a.map(x => ({ label: x.label, text: clean(x.text) })), d }); return; }
  }
  // ask(who, prompt, options)
  if (nm === 'ask' && A.length >= 3) {
    const pr = alts(ctx, A[1]);
    if (pr) emit(ctx, { type: 'prompt', who: speakerOf(ctx, A[0]), alts: pr.map(x => ({ label: x.label, text: clean(x.text) })), d });
    walk(ctx, A[2], d); for (const a of A.slice(3)) walk(ctx, a, d); return;
  }
  if (nm === 'KD_NO' && A[0]) {
    const ta = alts(ctx, A[0]); const why = A[1] ? alts(ctx, A[1]) : null;
    if (ta) { emit(ctx, { type: 'opt', alts: ta.map(x => ({ label: x.label, text: clean(x.text) })), sub: why ? clean(why[0].text) : 'she is not going to', dis: 'always greyed out', d }); return; }
  }
  if (nm === 'phPush' && A.length >= 3) {
    const lit = x => x.type === 'Literal' ? [x.value, x.value] : x.type === 'ConditionalExpression' && x.consequent.type === 'Literal' && x.alternate.type === 'Literal' ? [x.consequent.value, x.alternate.value] : [null, null];
    const [k1, k2] = lit(A[0]), [w1, w2] = lit(A[1]);
    const who = (k, w) => k == null ? '[phone]' : w === 't' ? (TX_WITH[k] || k) : k === 'v' ? 'Misaki' : k === 'm' ? 'V' : 'Misaki / V';
    const a = who(k1, w1), b = who(k2, w2);
    const t = alts(ctx, A[2]);
    if (t) { emit(ctx, { type: 'line', who: (a === b ? a : a + ' / ' + b) + ' (text)', alts: t.map(x => ({ label: x.label, text: clean(x.text) })), d }); return; }
  }
  if ((nm === 'phQueue' || nm === 'phSend' || nm === 'phPush') && A.length >= 2) {
    const k = A[0].type === 'Literal' ? A[0].value : '';
    const save = TX_CONTACT; TX_CONTACT = (TX_WITH[k] || '[' + src(ctx, A[0]) + ']') + ' (text)'; walk(ctx, A[1], d); TX_CONTACT = save; return;
  }
  if (nm === 'kdTell' && A.length >= 3) {
    const k = A[1].type === 'Literal' ? A[1].value : '';
    emit(ctx, { type: 'note', text: 'Sent as texts on her phone in Misaki’s POV; shown as narration-speech in V’s POV.', d });
    const save = TX_CONTACT; TX_CONTACT = (TX_WITH[k] || '[' + src(ctx, A[1]) + ']'); walk(ctx, A[2], d); TX_CONTACT = save; return;
  }
  if ((nm === 'toast' || nm === 'showCG' || nm === 'journal' || nm === 'jot') && A[0]) {
    const a = alts(ctx, A[0]); if (a) { emit(ctx, { type: 'loose', key: nm === 'toast' ? 'on screen' : nm === 'showCG' ? 'picture card' : 'journal', alts: a.map(x => ({ label: x.label, text: clean(x.text) })), d }); for (const x of A.slice(1)) walk(ctx, x, d); return; }
  }
  if (nm === 'txDef' && A[0] && A[0].type === 'Literal') {
    const o = A[1] && A[1].type === 'ObjectExpression' ? A[1] : null;
    const w = o && getProp(o, 'with'), pv = o && getProp(o, 'pov'), wh = o && getProp(o, 'when');
    const contact = w && w.value.type === 'Literal' ? TX_WITH[w.value.value] || w.value.value : '[contact]';
    const player = pv && pv.value.type === 'Literal' ? (pv.value.value === 'v' ? 'V' : 'Misaki') : 'Misaki / V';
    pushScene(ctx, { id: A[0].value, kind: 'thread', when: wh ? src(ctx, wh.value) : '', title: `Phone thread: ${player} and ${contact}`, line: lineOf(ctx, n) });
    const sc = TX_CONTACT, sp = TX_PLAYER; TX_CONTACT = contact; TX_PLAYER = player;
    const nodes = o && getProp(o, 'nodes');
    if (nodes && nodes.value.type === 'ObjectExpression') {
      for (const p of nodes.value.properties) { emit(ctx, { type: 'key', text: 'message ' + propKey(p), d: 0 }); walk(ctx, p.value, 0); }
    } else walk(ctx, A[1], 0);
    TX_CONTACT = sc; TX_PLAYER = sp; popScene(ctx); return;
  }
  // kc36 / kc46: wrap('Spot label', act) replaces what a medbay spot does in one setting or state
  if (nm === 'wrap' && A[0] && A[0].type === 'Literal' && A[1] && /Function/.test(A[1].type)) {
    const tag = ctx.file === 'kc36.js' ? ' (injuries only)' : ctx.file === 'kc46.js' ? ' (extended delusion)' : '';
    pushScene(ctx, { id: 'spot: ' + A[0].value + tag, kind: 'spot', when: '', cond: ctx.file === 'kc36.js' ? 'The injuries-only setting’s version of this infirmary spot.' : ctx.file === 'kc46.js' ? 'This infirmary spot on an extended-delusion morning (it is a cell again).' : '', title: '', line: lineOf(ctx, n) });
    walk(ctx, A[1], 0); popScene(ctx); return;
  }
  // kc28's medbay pairs: two('Cot','Bed', at, mark, actWhileCell, actOnceClear)
  if (nm === 'two' && A.length >= 5 && A[0].type === 'Literal' && A[1].type === 'Literal') {
    pushScene(ctx, { id: 'spot: ' + A[0].value + ' / ' + A[1].value, kind: 'spot', when: '', cond: 'infirmary room spot', title: '', line: lineOf(ctx, n) });
    emit(ctx, { type: 'branch', text: `While she still thinks it is a cell (clarity under 2): “${A[0].value}”`, d: 0 }); walk(ctx, A[4], 1);
    emit(ctx, { type: 'branch', text: `Once she knows where she is (clarity 2+): “${A[1].value}”` + (A[5] ? '' : ' (same as above)'), d: 0 }); if (A[5]) walk(ctx, A[5], 1);
    popScene(ctx); return;
  }
  // scene helpers: kdEv('id', when, run), kdEv2('id', d, when, run), rhEv('id', when, run), …
  if (A[0] && A[0].type === 'Literal' && typeof A[0].value === 'string' && (/^[a-z][a-z0-9]*_[a-z0-9_]+$/i.test(A[0].value) || /Ev\d*$|Scene$/.test(nm)) && A[0].value.length >= 3 && !NOT_SCENE_CALLEES.has(nm)
      && A.slice(1).some(a => /Function/.test(a.type)) && hasText(ctx, n)) {
    const fns = A.slice(1).filter(a => /Function/.test(a.type));
    const when = fns.length >= 2 ? src(ctx, fns[0]) : '';
    const dayArg = A.slice(1).find(a => a.type === 'Literal' && typeof a.value === 'number');
    pushScene(ctx, { id: A[0].value, kind: 'event', helper: nm, when: when, day: dayArg ? dayArg.value : null, title: '', line: lineOf(ctx, n) });
    ctx.scope = {};
    for (const a of (fns.length >= 2 ? A.slice(1).filter(x => x !== fns[0]) : A.slice(1))) walk(ctx, a, 0);
    popScene(ctx); return;
  }
  walk(ctx, n.callee, d);
  for (const a of A) walk(ctx, a, d);
}

/* top-level units */
function unitName(ctx, st) {
  if (st.type === 'FunctionDeclaration') return st.id.name;
  if (st.type === 'VariableDeclaration') return st.declarations.map(x => x.id.name).filter(Boolean).join(', ');
  if (st.type === 'ExpressionStatement') {
    const e = st.expression;
    if (e.type === 'AssignmentExpression') return src(ctx, e.left);
    if (e.type === 'CallExpression') { const s = src(ctx, e.callee); if (s.length < 40) return s + '(…)'; }
  }
  return 'code@' + lineOf(ctx, st);
}
function extractFile(file, opts = {}) {
  const code = SRC[file];
  const ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true, allowHashBang: true });
  const ctx = mkCtx(file, code);
  for (const st of ast.body) {
    const nm = unitName(ctx, st);
    if (opts.only && !opts.only(nm, st, ctx)) continue;
    ctx.scope = {};
    pushScene(ctx, { id: nm, kind: 'unit', when: '', title: '', line: lineOf(ctx, st) });
    if (opts.focus) { const f = opts.focus(nm, st, ctx); if (f) { walk(ctx, f, 0); popScene(ctx); continue; } }
    walk(ctx, st, 0);
    popScene(ctx);
  }
  return ctx.scenes.filter(s => s.items.some(i => i.type !== 'key' && i.type !== 'branch' && i.type !== 'note'));
}

/* ------------------------------------------------------------------ rendering */
const KEYNAME = { q: 'prompt', n: 'name', d: 'description', sub: 'option note', takeLine: 'on a takedown', killLine: 'on a kill', html: 'on screen', update: 'on screen', legacy: 'room label' };
const mdEsc = t => String(t).split(/(`[^`]*`)/).map((seg, i) => i % 2 ? seg : seg.replace(/\*/g, '\\*').replace(/_/g, '\\_')).join('').replace(/^([#>+-])/, '\\$1');
function mdItems(items) {
  const out = [];
  for (const it of items) {
    const q = '> '.repeat(it.d || 0);
    const P = s => out.push(q + s, q.trimEnd());
    const multi = it.alts && it.alts.length > 1;
    const body = (who, fmt) => {
      if (!multi) return fmt(it.alts[0].text);
      return '\n' + it.alts.map(a => q + '- ' + (a.label ? '*' + mdEsc(a.label) + ':* ' : '') + fmt(a.text)).join('\n');
    };
    switch (it.type) {
      case 'line': {
        const narr = !it.who;
        const fmt = t => narr ? '*' + mdEsc(t) + '*' : mdEsc(t);
        P((narr ? '' : '**' + mdEsc(it.who) + ':** ') + body(it.who, fmt)); break;
      }
      case 'prompt': P('**' + (it.who ? mdEsc(it.who) + ' — ' : '') + 'choice:** ' + body('', t => '*' + mdEsc(t) + '*')); break;
      case 'opt': P('▸ ' + (it.who ? '**' + mdEsc(it.who) + ':** ' : '') + body('', t => '**' + mdEsc(t) + '**') + (it.sub ? ' — *(' + mdEsc(it.sub) + ')*' : '') + (it.dis ? ' `' + it.dis + '`' : '')); break;
      case 'branch': P('**⟨' + mdEsc(it.text) + '⟩**'); break;
      case 'key': P('`' + (KEYNAME[it.text] || it.text) + '`'); break;
      case 'note': P('<small>' + mdEsc(it.text) + '</small>'); break;
      case 'loose': P((it.key ? '`' + (KEYNAME[it.key] || it.key) + '` ' : '') + body('', t => mdEsc(t))); break;
    }
  }
  return out.join('\n');
}
module.exports = { extractFile, SRC, condText, mdItems };
if (require.main === module && process.argv[2] === '--dump') {
  for (const s of extractFile(process.argv[3])) { console.log(`\n### ${s.id} (${s.kind}, line ${s.line})\n`); if (s.cond) console.log('_when: ' + s.cond + '_\n'); console.log(mdItems(s.items)); }
}
if (require.main === module && process.argv[2] === '--inventory') {
  const f = process.argv[3];
  for (const s of extractFile(f)) console.log(s.kind.padEnd(6), String(s.line).padStart(5), s.id, '|', s.items.length, '|', (s.when || '').slice(0, 90));
}

/* ================================================================== THE SCRIPT: what goes where
   Selectors are 'file:id' (every scene with that id in that file, in source order) or 'file:id#n' (the n-th one).
   Scenes from the included files that no section claims are listed in the last appendix, so nothing is silently lost;
   SKIP holds the ones that have nothing to do with the arc. */
const INCLUDE_FILES = ['index.html', 'kc27.js', 'kc28.js', 'kc29.js', 'kc30.js', 'kc31.js', 'kc32.js', 'kc33.js', 'kc34.js', 'kc35.js', 'kc36.js',
  'kc46.js', 'kc47.js', 'kc48.js', 'kc49.js', 'kc50.js', 'kc51.js', 'kc52.js', 'kc53.js', 'kc54.js', 'kc55.js', 'kc56.js', 'kc58.js', 'kc59.js', 'kc60.js', 'kc61.js', 'kc62.js', 'kc63.js'];
const INDEX_UNITS = /^(takenM|takenV|interrogate|informant|hub|sleepBase|chatLog|failedEscape|escapeRun|vRescueCut|escaped|vRescue|rescued|finale|finalM|finalV|kdTell|after|flashCheck|ground|sleepAfter|theList|listTarget|extraEnding|ROOMS|gl_taken|gl_spot|lateV|interrogateLite|lateM|loneIntro|LBEATS|LONE_EV|morningEvent|sleep|collapseEnding|loneEnding|act2Hub|npcBarks|dmTab|EVENTS\.push\(…\)|TOPICS_M|TOPICS_V|gl_ev\(…\))$/;
const INDEX_EVENTS = /^(clip|brac_off|mirror|angel_sleeves|ronin_bulb|two_cups|v_door|shower_door|v_notice_bed|nightmareV|gl_ph_after|them|mtaken|mafter|quiet|boring|touch|third|stay)$/;
const SKIP = new Set(['kc28.js:kdRag', 'kc28.js:kdGrime', 'kc28.js:tdMap(…)', 'kc35.js:morningEvent', 'kc36.js:settings', 'kc36.js:kdSALab', 'kc36.js:pauseMenu',
  'kc27.js:kdAskIR', 'kc29.js:KD_NO', 'kc56.js:k56Hits', 'kc56.js:k56WhyScene', 'kc56.js:code@244', 'kc56.js:k56_file', 'kc56.js:k56_a2sus', 'kc56.js:k56_lone2',
  'kc56.js:k56_a2pages', 'kc56.js:k56_a2grey', 'kc56.js:k56_a2burn', 'kc56.js:k56_a3river', 'kc56.js:k56_a3heir', 'kc56.js:k56_a3hale', 'kc56.js:k56_a3kt', 'kc56.js:k56_epi',
  'kc56.js:k56BoxLines', 'kc56.js:k56_hale', 'kc56.js:k56_avery', 'kc58.js:k58_stair', 'kc58.js:k58_book', 'kc58.js:k58_first', 'kc58.js:tx_k58_late', 'kc58.js:tx_k58_kettle',
  'kc58.js:tx_k58_rule', 'kc58.js:tx_k58_before', 'kc58.js:K58_SIT', 'kc58.js:sideHub', 'kc58.js:k58_t_first', 'kc58.js:k58_t_last', 'kc59.js:W59ORG', 'kc59.js:w59_m_notice', 'kc59.js:w59_m_warn',
  'kc59.js:w59_m_hale', 'kc59.js:w59_v_ledger', 'kc59.js:w59_v_ask', 'kc59.js:w59_v_hale', 'kc59.js:w59_v_hunted', 'kc59.js:w59_a2_hale', 'kc59.js:sideHub', 'kc59.js:w59Ask',
  'kc59.js:w59File', 'kc59.js:tx_w59_ron', 'kc59.js:tx_w59_ang', 'kc59.js:tx_w59_vq', 'kc59.js:tx_w59_vm', 'kc60.js:sideHub#1', 'kc60.js:a60_server', 'kc60.js:a60_list',
  'kc60.js:a60_quiet', 'kc60.js:a60_hurt', 'kc60.js:a60_body', 'kc60.js:a60_hounds', 'kc60.js:a60_epi', 'kc60.js:lp60_listing', 'kc60.js:lp60_dress', 'kc60.js:lp60_fly',
  'kc60.js:lp60_t_why', 'kc60.js:lp60_t_now', 'kc60.js:tx_a60_body', 'kc60.js:tx_a60_bodyv', 'kc60.js:tx_a60_will', 'kc60.js:tx_a60_willv', 'kc60.js:tx_lp60_v',
  'kc60.js:PINGS.push(…)', 'kc60.js:code@336', 'kc34.js:g_review', 'kc34.js:g_board', 'kc34.js:g_couch', 'kc34.js:g_brand', 'kc34.js:g_leak', 'kc34.js:g_book',
  'kc34.js:tx_g_bet', 'kc34.js:tx_g_knife', 'kc34.js:tx_g_stars', 'kc34.js:sideHub', 'kc34.js:gMarket', 'kc47.js:codeHook', 'kc49.js:codeHook', 'kc33.js:code@85']);

/* plain-English notes for scenes that are functions rather than events (they have no `when` of their own) */
const NOTE = {
  'kc59.js:W59G': 'Before the kidnapping (normal phase), one glimpse on some mornings after a job: the four men later on the list, seen beforehand without knowing who they are. Misaki and V see different ones.',
  'kc56.js:k56_grey': 'Before the kidnapping, day 4+: the man in the grey suit buys her address.',
  'index.html:takenM': 'Misaki POV. Plays the night the rent has been paid twice (the kidnapping is set when she pays the second time and fires at the next night card).',
  'index.html:interrogate': 'Misaki POV. Every interrogation session. Session 1 questions, then later sessions; each answer costs resolve or leaks something. kc27 wraps it (below).',
  'kc27.js:interrogate': 'Misaki POV. The wrapper on every session: session 1 opens with her waking; from session 2 the shorter session (kdShort) is used.',
  'kc27.js:kdBlankQ': 'Misaki POV. After the original questions in every full session: the question about her life before nine. Session 1: where did she grow up. Session 2: the invented mother.',
  'kc28.js:kdBlankQ': 'Misaki POV. Wrapped around the before-nine question: the chair minigame (hold steady while counting the hounds).',
  'kc28.js:kdHoldOn': 'The words shown on screen during the chair minigame.',
  'kc27.js:kdShort': 'Misaki POV. Sessions after the second: no table, standing; resolve starts lower each time.',
  'kc27.js:kdDose': 'Misaki POV. The end of every session: the needle, the lost hours, and whether she talks without knowing it.',
  'kc28.js:KD_INJ': 'Misaki POV, full story: one of these after each dose, in turn (she reports her injuries wrongly).',
  'kc28.js:KD_INJ_OFF': 'Misaki POV, injuries-only setting: used in place of the lines above (she names her injuries flatly).',
  'kc27.js:KD_SAID': 'What the note-taker wrote down while she was under, one line per thing she said (S.kd.said 1–3). Read later if she reads the notebook.',
  'kc27.js:kdTheyCome': 'Misaki POV. When the cell clock runs out (six actions), they come for another session.',
  'kc27.js:code@65': 'Misaki POV, in the cell: two spots added by kc27.',
  'kc28.js:code@36': 'Misaki POV, in the cell: the vent now needs four screws worked loose with the tray, and the door needs the guards’ steps learned (the Vent and Door spots).',
  'kc30.js:code@15': 'Misaki POV, in the cell: the radio spot also gives three overheard exchanges, one per visit.',
  'index.html:ROOMS': 'Misaki POV, in the cell (“Somewhere owned by [captor org]”, back label “there is no leaving”). The original cell spots.',
  'index.html:escapeRun': 'Misaki POV. The escape attempt itself (stealth through the warehouse or the vents).',
  'kc28.js:kdDock': 'Misaki POV. Second stage of every escape: the loading dock.',
  'kc30.js:kdDock': 'Misaki POV. On the dock stairs, if she thanked the man with the water twice.',
  'index.html:failedEscape#1': 'Misaki POV. A failed escape. First failure: back to the cell, the hand. Second failure in the joint POV (“both”): V comes.',
  'index.html:failedEscape#2': 'Misaki POV. The wrapper for the second failure: with closeness tier 2+ (or the joint POV) V comes (above); with lower closeness, the last chance (the cell again, then a short third session); a further failure is the late route (lateM, below).',
  'index.html:interrogateLite': 'Misaki POV, the last-chance route: the third, shorter session.',
  'index.html:lateM': 'Misaki POV, the late route: after the last chance fails. V gets her out and dies by the car. Leads to Misaki’s lone route.',
  'index.html:vRescueCut': 'Misaki POV. After a failed escape where V comes for her (second failure with closeness tier 2+).',
  'index.html:escaped': 'Misaki POV. She gets out on her own (escape and dock stages both succeed) and walks to V’s door.',
  'index.html:takenV': 'V POV. The first morning she is gone.',
  'index.html:hub': 'V POV, during captivity: the “Find her” menu. Trace the phone (ops minigame), shake down one of their people, call Ronin and Angel, hunt along the river (needs the trace), go get her (needs the district, the building and a way in).',
  'index.html:informant': 'V POV. “Shake down one of their people”.',
  'kc27.js:kdScout': 'V POV. “Hunt along the river”: which of the warehouses. The right one is the fourth. Angel’s fans find it if he has called her.',
  'index.html:sleepBase': 'V POV. Each night she is missing. At four nights the late route starts (lateV).',
  'index.html:lateV': 'V POV, the late route: four nights missing. He is too late. Leads to V’s lone route.',
  'index.html:chatLog': 'The server chat (group channel), during captivity and in the after-phase.',
  'index.html:gl_taken': 'V POV during captivity, at certain places in the city (one of these at random).',
  'index.html:vRescue': 'V POV. The rescue (stealth through the river warehouse). Being seen means the fight.',
  'kc28.js:kdCarry': 'V POV. Second stage of the rescue: carrying her out.',
  'index.html:rescued': 'V POV. He reaches her cell.',
  'index.html:after': 'Both POVs, once she is out (escape, rescue, or V arriving). Hands over to the infirmary.',
  'index.html:kdTell': 'How the friends’ reactions to what she leaked arrive (texts in her POV, narration in his).',
  'kc27.js:stealth': 'After the rescue: her hands on stealth jobs (one line while they shake).',
  'index.html:theList': 'After the infirmary: the list of the men who held her, as a menu.',
  'index.html:listTarget': 'Going after one name on the list.',
  'kc59.js:W59REC': 'Recognition lines when a list name is one of the men glimpsed before the kidnapping (Misaki’s line / V’s line).',
  'kc59.js:spot: Their faces': 'Misaki POV, in the cell, if she glimpsed any of the men before the van.',
  'index.html:finale': 'End of the after-phase (“has waited long enough”): going after the boss.',
  'index.html:finalM': 'Misaki’s infiltration of the boss.', 'index.html:finalV': 'V’s infiltration of the boss.',
  'kc56.js:k56BossScene': 'After the finale: the boss says the address was bought (lawyer version if V ruined them; otherwise the boss himself).',
  'kc28.js:kdMedStart': 'Both POVs: the first night in V’s infirmary on sublevel two (the door says LAUNDRY). Misaki takes it for another cell.',
  'kc28.js:KD_CHART': 'Full story: the chart on the end of the bed (shown when she reads it).',
  'kc28.js:code@83': 'Misaki POV, the infirmary room. Every spot has two labels: what she thinks it is while it is a cell (clarity under 2), and what it is.',
  'kc28.js:kdMedRun': 'Misaki POV. Running from the infirmary (Door, “Go. Now”). Caught: V kneels. Out clean: Biscuit in the garage. Out with a takedown: the drip needle in V’s arm.',
  'kc28.js:openPhone': 'Misaki POV, first infirmary day: the phone is blocked.',
  'kc28.js:kdBacklog': 'Misaki POV: the backlog of messages sent while she was gone, delivered when V slides her phone under the door.',
  'kc28.js:kdMedMorning': 'Both POVs: each infirmary morning (day 1, day 2, and the walk upstairs on day 3).',
  'kc28.js:kdSit': 'V POV: “The infirmary” (sit with her), once a day.',
  'kc28.js:sideHub': 'V POV: the side-menu entry while she is in the infirmary.',
  'kc28.js:hub': 'The first few mornings after discharge.',
  'kc32.js:spot: Steel cabinet': 'Misaki POV, infirmary, while it is a cell.', 'kc32.js:spot: Supply cabinet': 'Misaki POV, infirmary, once she knows.',
  'kc33.js:code@85': 'Injuries-only setting: the cabinet’s plain version.',
  'kc36.js:code@14': 'Injuries-only setting: the small fridge (no white box).',
  'kc36.js:code@31': 'Injuries-only setting: the plain versions of the chart, mirror, monitor and treatment trolley.',
  'kc48.js:KD_NIGHT': 'Misaki POV: one scene each infirmary night, by night.',
  'kc48.js:KD_NIGHT.push(…)': 'Misaki POV: the fifth night (only on long stays).',
  'kc48.js:KD_DOOR': 'Misaki POV, once she knows where she is: “Talk to V through the door”, five topics, one each.',
  'kc48.js:kdVisitor': 'Misaki POV, an afternoon or evening once she knows where she is: Ronin, then Angel.',
  'kc48.js:kdSit': 'V POV: three more ways to sit with her (Persuasion; changing the dressings; the list of things he didn’t do in time).',
  'kc60.js:sideHub#2': 'V POV, infirmary: the side-menu entry for the kennel corridor at night.',
  'kc60.js:A60COR': 'V POV, infirmary: the kennel corridor at night (Ronin and Angel with a bottle), one per night.',
  'kc60.js:hub': 'Misaki POV, worst route: the four’s rule (if one dies, nobody goes back), as she lies on the cot.',
  'kc61.js:KD61_MC': 'Misaki POV, infirmary, once she knows the room and the shatter has happened: one scene each afternoon.',
  'kc61.js:k61Tubs': 'Misaki POV: the bin, right after the morning shatter (normal stays only).',
  'kc61.js:KD61_VC': 'V POV, infirmary, once she knows him: one scene a day.',
  'kc61.js:KD61_THINGS': 'V POV, infirmary: “Her things, from the river”, three days.',
  'kc61.js:KD61_FILE': 'V POV, infirmary: “Her file” (once). Full story: the sealed envelope. Injuries only: the kennel scale.',
  'kc61.js:KD61_ASK': 'V POV, infirmary, once she knows him: “Ask what she needs”.',
  'kc61.js:sideHub': 'V POV, infirmary: the side-menu entries for the scenes above.',
  'kc61.js:KD61_MX': 'Misaki POV, extended delusion (not the worst route): one scene each afternoon.',
  'kc61.js:KD61_VX': 'V POV, extended delusion: one scene a day.',
  'kc61.js:KD61_MW': 'Misaki POV, worst route, still deluded: after that day’s state-of-mind scene.',
  'kc61.js:KD61_VW': 'V POV, worst stay (severity 8+): one scene a day.',
  'kc46.js:KD_STILL_M': 'Misaki POV, extended delusion (severity 4+ gives one extra day, 6+ two): the morning it is a cell again, three escalating versions.',
  'kc46.js:KD_STILL_V': 'V POV, extended delusion: she does not know him this morning, three escalating versions.',
  'kc46.js:kdMedMorning#1': 'Misaki POV, extended-delusion mornings: count the loops, test the door, or (tier 3 only) look at the guard’s face properly, which breaks it early.',
  'kc46.js:code@47': 'Misaki POV, extended delusion: the Tray, Door and Cot spots read differently on those days.',
  'kc46.js:kdMedMorning#2': 'Misaki POV: on the stairs out after an extended stay.',
  'kc49.js:hub': 'Misaki POV, severity 8+ (the code fridaycomes starts here): the extra opening scene, “Eleven days”.',
  'kc49.js:KD_BYE': 'The goodbyes she can leave with the tall one (V, Angel, Ronin, the hounds).',
  'kc49.js:kdGoodbye': 'Misaki POV, worst stays (severity 6+), on an extra night, while the room is still a cell: Friday. She leaves goodbyes with the tall one.',
  'kc49.js:kdMedMorning': 'V POV: the second extra morning, the night he heard the goodbyes.',
  'kc50.js:KD_DESC': 'Worst route: the main things in the room, described by day and by state of mind (clear / cell / dark, dark = composure under 15).',
  'kc50.js:KD_CLUES': 'Worst route (severity 8+, Misaki): the five things she can “think through”. Each is the spot it belongs to; each gives +3 composure. Four of them is the logic-out.',
  'kc50.js:code@17': 'Worst route: what each of those spots asks.',
  'kc50.js:kdLogicOut': 'Worst route: four clues thought through. She opens the door and finds V.',
  'kc51.js:KD_MIND': 'Worst route, still deluded: the first time each day the planner opens, one scene from inside her head by composure band (hold 22+, fray 14+, thin 7+, gone).',
  'kc52.js:code@47': 'Worst route: a third state-of-mind scene per band.',
  'kc52.js:KD_UNCANNY': 'Worst route, evenings, composure under 14: uncanny moments.',
  'kc52.js:code@59': 'Continues the list above (KD_AFTER): V alone after the spiral.',
  'kc50.js:KD_SPIRAL_WARN': 'Worst route, composure under 15: one dark thought a day.',
  'kc52.js:kdBright': 'Worst route, at the bedtime the spiral would come (composure 3 or less), the first time: the bright turn. The three choices shape the ending.',
  'kc52.js:KD_SHAPE': 'Spiral ending: where V finds her (by where she chose to sit).',
  'kc52.js:KD_LEFT': 'Spiral ending: what he finds on the tray (by what she left out).',
  'kc52.js:KD_HUM': 'Spiral ending: what he heard her humming (by what she hummed).',
  'kc50.js:kdSpiral': 'Worst route: composure 3 or less at bedtime (after the bright turn, the same night). If she has thought through 2+ clues and left a goodbye for V, it is interrupted (below). Otherwise: lucid too late, and V’s lone route.',
  'kc50.js:kdInterrupted': 'Worst route: the secret, interrupted (2+ clues and a goodbye for V). She lives.',
  'kc53.js:KD_SHATTER_LINES': 'Whenever her clarity returns, the cell drawing breaks away; then the lines for how it came back: morning (a normal stay), logic (reasoning it out), caught (the interrupted route), late (the spiral).',
  'kc51.js:KD_AFTER': 'V’s lone route after the spiral (lateRoute = self): one per morning.',
  'kc52.js:sideHub': 'V’s lone route after the spiral: “Sit in the infirmary doorway”, once a day.',
  'kc36.js:sideHub': 'Injuries-only setting, after discharge: the recovery activities (once a day each, six sessions).',
  'kc54.js:sideHub': 'A physio or walking session that makes progress: one of these lines.',
  'kc47.js:SD_NOTES': 'After the kidnapping: one quiet line on some mornings, each used once, chosen from what happened.',
  'index.html:flashCheck': 'After-phase, Misaki: a flashback in some rooms.', 'index.html:ground': 'The breathing minigame (on-screen text).',
  'index.html:sleepAfter': 'Each night in the after-phase.', 'index.html:extraEnding': 'Ending lines that depend on the kidnapping arc (shown on any ending screen that applies).',
  'index.html:loneIntro': 'Six weeks later, the lone route (Act II alone).', 'index.html:LBEATS': 'Lone route: beats by Act II day.',
  'index.html:LONE_EV': 'Lone route mornings: one at random.', 'index.html:morningEvent': 'Lone route mornings.', 'index.html:sleep': 'Lone route bedtime (Misaki’s lone route chooses where to sleep).',
  'index.html:collapseEnding': 'Lone route ending if stability reaches zero: The Chair By The Door.', 'index.html:loneEnding': 'Lone route endings at the end of Act II.',
  'index.html:act2Hub': 'Lone route day menu: the grief options.', 'index.html:npcBarks': 'Lone route: the words that float by the player.', 'index.html:dmTab': 'Lone route: the DM thread to the one who died.',
};
for (const k of Object.keys(NOTE)) if (/^kc(27|28|29|30|31|32|33|34|36|47|49|50|51|52|53|54|55|56|58|59|60|61)\.js:extraEnding$/.test(k)) {}

const S_ = (title, intro, sel) => ({ title, intro, sel });
/* helper functions that hold part of a scene's text: printed right after that scene */
const DYN = { kd_knock1: 'kc27.js:kdKn', kd_knock2: 'kc27.js:kdKn', kd_knock3: 'kc27.js:kdKn' };
const ATTACH = { 'kc62.js:k62File': 'kd62_good', 'kc27.js:kdBookWarn': 'kd_book', 'kc27.js:kdKeepIt': 'kd_blank', 'kc27.js:kdLetGo': 'kd_blank',
  'kc27.js:kdMotherL': 'kd_file', 'kc27.js:kdFileOpen': 'kd_file', 'kc29.js:KD_DRAFT': 'kd_draft' };
Object.assign(NOTE, {
  'kc62.js:spot: Listen for the tall one': 'Misaki POV, while the infirmary is a cell: once per time of day, one entry of the file on him (below).',
  'kc62.js:KD62_TH': 'Misaki POV, while the infirmary is a cell: the spot “Listen for the tall one”, once per time of day, gives one of these four entries of her file on him.',
  'kc62.js:KD62_MP': 'Misaki POV, evenings while it is a cell: sleep she won’t allow, the napkin, the joke over the tray, the handle.',
  'kc62.js:k62Flash': 'Worst route, after she has reasoned it out or been talked out: it comes back the next time he walks in.',
   'kc62.js:KD62_VR': 'V POV, once a day: the ritual through the gap in the door.',
   'kc62.js:KD62_VW': 'V POV, worst stay, once a day: the light under her door.',
  'kc62.js:KD62_VC': 'V POV, clear after a bad stay, once a day: her hand under the tray.',
  'kc63.js:spot: Your wristband': 'Misaki POV, once she knows the room: the plastic band with her name on it (once).',
  'kc63.js:KD63_MC': 'Misaki POV, once she knows the room and the shatter has happened: one a day through the hub, after kc61’s and kc62’s scene for that day.',
  'kc63.js:KD63_VC': 'V POV, once she knows him: one a day through the hub, after kc61’s and kc62’s.',
  'kc63.js:KD63_MX': 'Misaki POV, extended delusion (not the worst route), while it is a cell: one a day through the hub.',
  'kc63.js:KD63_VX': 'V POV, extended delusion, while she does not know him: once.',
  'kc63.js:k63XBack': 'Misaki POV, extended delusion: the first hub after clarity comes back on an extra day (no shatter this time).',
  'kc63.js:KD63_VB': 'V POV, extended delusion: the first day she knows him again.',
  'kc63.js:KD63_MW': 'Misaki POV, worst route, still deluded: one a day, after that day’s state-of-mind scene.',
  'kc63.js:KD63_VW': 'V POV, worst stay (severity 8+): once.',
  'kc63.js:k63After': 'Misaki POV, normal stays: right after the morning shatter lines and the bin.',
  'kc63.js:k63WBack': 'Misaki POV, worst route: the next hub after the logic or the caught shatter (variant by which).', 'kc62.js:k62File': 'Part of kd62_file.',
  'kc27.js:kdBookWarn': 'Part of kd_book: what V says when he holds or reads the notebook and warns the people on it.',
  'kc27.js:kdKn': 'Part of kd_knock1–3: what happens at each place she gave away, one per thing she said (warned or not).',
  'kc27.js:kdKeepIt': 'Part of kd_blank: the journal note if she keeps the room.', 'kc27.js:kdLetGo': 'Part of kd_blank: the journal note if she lets it go blank.',
  'kc27.js:kdMotherL': 'Part of the kd_file topic: if the invented mother came up in the cell.', 'kc27.js:kdFileOpen': 'Part of the kd_file topic: the enrolment form, if opened.',
  'kc29.js:KD_DRAFT': 'Part of kd_draft: the unsent drafts, shorter each night.', 'kc36.js:KD_SA_HELP': 'The setting’s explanation on the Settings panel.' });
const SECTIONS = [
  { title: '1. Before: the war and the warnings', intro: 'Only the scenes that lead straight into the van. The wider war (eight hunts, one per organisation) is left out.', subs: [
    S_('1.1 The man from the canal, the man in grey, the circling', 'Normal phase.', ['kc28.js:kd_omen', 'kc56.js:k56_grey', 'kc59.js:w59_m_circle', 'kc59.js:w59_v_circle', 'kc59.js:W59G']),
  ] },
  { title: '2. The abduction and captivity', intro: 'The kidnapping happens the night after she pays the rent for the second time. Which POV you play decides which half you see; in the joint POV both run.', subs: [
    S_('2.1 Misaki: the van', '', ['index.html:takenM']),
    S_('2.2 Misaki: the interrogation', 'Every session runs the original questions, the chair, the question about before nine, and the dose. Later sessions are shorter.', ['index.html:interrogate', 'kc27.js:interrogate', 'kc27.js:kdBlankQ', 'kc28.js:kdBlankQ', 'kc28.js:kdHoldOn', 'kc27.js:kdShort', 'kc27.js:kdDose', 'kc28.js:KD_INJ', 'kc28.js:KD_INJ_OFF', 'kc27.js:KD_SAID', 'kc27.js:kdTheyCome']),
    S_('2.3 Misaki: the cell', 'The room is “Somewhere owned by [captor org]”; the way back is labelled “there is no leaving”. Every action that is not a ready escape uses up the clock; at six they come for another session.', ['index.html:spot: *', 'kc27.js:code@65', 'kc27.js:spot: Your arm', 'kc27.js:spot: The radio down the hall', 'kc28.js:code@36', 'kc30.js:spot: A cup of water', 'kc30.js:code@15', 'kc59.js:spot: Their faces']),
    S_('2.4 Misaki: escape, failure, the last chance, the late route', '', ['index.html:escapeRun', 'kc28.js:kdDock', 'kc30.js:kdDock', 'index.html:escaped', 'index.html:failedEscape#1', 'index.html:vRescueCut', 'index.html:failedEscape#2', 'index.html:interrogateLite', 'index.html:lateM']),
    S_('2.5 V: the search', 'V POV. Each night she is missing raises the rescue’s difficulty; from two nights, one more guard; at four nights, the late route.', ['index.html:takenV', 'index.html:hub', 'index.html:informant', 'kc27.js:kdScout', 'kc27.js:kd_tape', 'kc30.js:kd_vphoto', 'kc30.js:kd_vfloor', 'kc33.js:kd_maria', 'kc56.js:k56_plate', 'kc59.js:w59_v_halecall', 'index.html:two_cups', 'index.html:gl_taken', 'index.html:chatLog', 'index.html:sleepBase', 'index.html:lateV']),
    S_('2.6 V: the rescue', '', ['index.html:vRescue', 'kc28.js:kdCarry', 'index.html:rescued']),
    S_('2.7 Out', 'Every way out ends here. What she leaked under questioning reaches her friends: as texts on her phone in her POV, as narration in his.', ['index.html:after', 'kc27.js:stealth']),
    S_('2.8 The list and the finale', 'After the infirmary, through the after-phase: the men who held her, one at a time; then the boss.', ['index.html:theList', 'index.html:listTarget', 'kc59.js:W59REC', 'index.html:finale', 'index.html:finalM', 'index.html:finalV', 'kc56.js:k56_why', 'kc56.js:k56BossScene']),
  ] },
  { title: '3. The infirmary', intro: 'V’s infirmary on sublevel two, behind a door marked LAUNDRY. In Misaki’s POV the room is drawn as the cell until her clarity reaches 2, and the spots carry her reading of them. How long the delusion lasts depends on how bad the captivity was (severity: see the route map).', subs: [
    S_('3.1 Waking, and the ordinary stay (Misaki)', 'All stays. A mild stay (severity under 4) clears by the first morning. In the room, kc28’s spots have two labels: what she thinks it is while it is a cell (clarity under 2), and what it is.', ['kc28.js:kdMedStart', 'kc28.js:KD_CHART', 'kc28.js:kdNoLeave', 'kc28.js:spot: *', 'kc32.js:spot: *', 'kc33.js:spot: *', 'kc28.js:kdMedRun', 'kc28.js:openPhone', 'kc28.js:kdBacklog', 'kc28.js:kdMedMorning', 'kc48.js:KD_NIGHT', 'kc48.js:KD_NIGHT.push(…)', 'kc48.js:spot: *', 'kc48.js:KD_DOOR', 'kc48.js:kdVisitor', 'kc60.js:spot: *', 'kc61.js:spot: *', 'kc61.js:KD61_MC', 'kc61.js:k61Tubs', 'kc63.js:spot: Your wristband', 'kc63.js:KD63_MC']),
    S_('3.2 The infirmary phone threads', '', ['kc28.js:tx_kd_help', 'kc28.js:tx_kd_mdoor', 'kc28.js:tx_kd_selfie', 'kc28.js:tx_kd_rvis', 'kc28.js:tx_kd_adoc', 'kc28.js:tx_kd_rhand']),
    S_('3.3 V’s side of the stay', 'V POV.', ['kc28.js:sideHub', 'kc28.js:kdSit', 'kc48.js:kdSit', 'kc60.js:sideHub#2', 'kc60.js:A60COR', 'kc61.js:sideHub', 'kc61.js:KD61_THINGS', 'kc61.js:KD61_FILE', 'kc61.js:KD61_ASK', 'kc61.js:KD61_VC', 'kc63.js:KD63_VC']),
    S_('3.4 The extended delusion', 'Severity 4+ gives one extra day in the cell, 6+ two. On those mornings the room is a cell again, whatever she worked out the day before.', ['kc46.js:KD_STILL_M', 'kc46.js:KD_STILL_V', 'kc46.js:kdMedMorning#1', 'kc46.js:spot: *', 'kc46.js:kdMedMorning#2', 'kc61.js:KD61_MX', 'kc61.js:KD61_VX', 'kc63.js:KD63_MX', 'kc63.js:KD63_VX', 'kc63.js:k63XBack', 'kc63.js:KD63_VB']),
    S_('3.5 The file: V read as one of them', 'While she believes the room is a cell, every true thing about V (his steps, his hands, his coat, his kindness) is read as a captor’s technique, and she keeps a file on him that she can watch herself writing and cannot stop. Both POVs.', ['kc62.js:KD62_TH', 'kc62.js:KD62_MP', 'kc62.js:k62Flash', 'kc62.js:KD62_VR', 'kc62.js:KD62_VW', 'kc62.js:KD62_VC']),
    S_('3.6 The worst route: Friday', 'Severity 6+ (worst stays). At 8+ the stay never clears by itself (the code fridaycomes starts here).', ['kc49.js:hub', 'kc49.js:KD_BYE', 'kc49.js:kdGoodbye', 'kc49.js:kdMedMorning', 'kc49.js:kd_delivered']),
    S_('3.7 The worst route: the room, her mind, the clues', 'Severity 8+, Misaki POV, still deluded.', ['kc50.js:KD_DESC', 'kc51.js:KD_MIND', 'kc52.js:code@47', 'kc52.js:KD_UNCANNY', 'kc50.js:KD_SPIRAL_WARN', 'kc60.js:hub', 'kc61.js:KD61_MW', 'kc61.js:KD61_VW', 'kc63.js:KD63_MW', 'kc63.js:KD63_VW', 'kc50.js:KD_CLUES', 'kc50.js:code@17', 'kc50.js:kdLogicOut']),
    S_('3.8 The worst route: the bright turn, the spiral, lucid too late, the interrupted secret', 'Composure 3 or less at bedtime. The bright turn plays first, then the spiral the same night.', ['kc52.js:kdBright', 'kc52.js:KD_HUM', 'kc52.js:KD_LEFT', 'kc52.js:KD_SHAPE', 'kc50.js:kdSpiral', 'kc50.js:kdInterrupted', 'kc50.js:kd_interrupted_after']),
    S_('3.9 The shatter', 'How the cell drawing breaks away when clarity returns, by route; and the pieces that don’t go.', ['kc53.js:KD_SHATTER_LINES', 'kc63.js:k63After', 'kc63.js:k63WBack', 'kc53.js:kd_shards']),
    S_('3.10 Full story only: the examination, the photographs, the denial, the hidden route', 'These scenes exist only in the full-story setting. They play after discharge, in the aftermath order. What happened is never named. The honest option is always on the menu and always greyed out, except once (kd_last).', ['kc36.js:KD_SA_HELP', '@SA']),
    S_('3.11 Injuries only: the recovery', 'These exist only in the injuries-only setting. No doctor, no denial.', ['kc36.js:code@14', 'kc36.js:spot: *', '@REC', 'kc36.js:sideHub']),
  ] },
  { title: '4. Recovery and aftermath', intro: 'Once she is out of the infirmary the scheduler (kc35) plays the next due scene every morning and the first time the planner opens in the afternoon, evening and night, in KD_ORDER. Each scene still needs its own conditions. Scenes already printed in section 3 are listed here by name only, so the order stays readable.', subs: [
    S_('4.1 The aftermath scenes, in scheduler order', '', ['@ORDER']),
    S_('4.2 Other after-phase scenes (not scheduled)', 'Ordinary morning events, one-off notes and activities in the after-phase.', ['kc27.js:kd_lost', 'kc28.js:hub', 'kc47.js:SD_NOTES', 'kc54.js:sideHub', 'index.html:clip', 'index.html:brac_off', 'index.html:mirror', 'index.html:angel_sleeves', 'index.html:ronin_bulb', 'index.html:v_door', 'index.html:shower_door', 'index.html:v_notice_bed', 'index.html:nightmareV', 'index.html:gl_ph_after', 'index.html:flashCheck', 'index.html:ground', 'index.html:sleepAfter']),
    S_('4.3 Phone threads', '', ['@TX']),
    S_('4.4 Talk topics', '', ['@TOPIC']),
  ] },
  { title: '5. Endings and the lone routes', intro: '', subs: [
    S_('5.1 V alone after the spiral', 'lateRoute = self (Misaki died in the infirmary). V’s lone route.', ['kc51.js:KD_AFTER', 'kc52.js:code@59', 'kc52.js:sideHub']),
    S_('5.2 The lone routes after the late routes (Act II alone)', 'After lateV (V too late, Misaki POV gone) or lateM (V dies), and after the spiral: Act II is played alone.', ['index.html:loneIntro', 'index.html:LBEATS', 'index.html:LONE_EV', 'index.html:morningEvent', 'index.html:sleep', 'index.html:act2Hub', 'index.html:npcBarks', 'index.html:dmTab', 'index.html:collapseEnding', 'index.html:loneEnding']),
    S_('5.3 Ending lines', 'Added to the ending screen when they apply. In the injuries-only setting, lines about the sum, the doctor’s second page, saying yes, the window, the false name, the “dentist” and the ceiling/radio are filtered out (kc36).', ['@END']),
  ] },
];

const ROUTE_MAP = `
**When it starts.** The kidnapping is set the night Misaki pays the rent for the second time (or, if she has moved in, on the day she would otherwise be evicted) and happens at the next night card. In Misaki’s POV you play the cell; in V’s POV you play the search; in the joint POV both run.

**Misaki: getting out (section 2.4)**
- *Escape*: the vent (needs the tray, listening at the door, and four screws worked loose) or the door (the star clip or the boot pick, once the guards’ steps are learned) → the stealth run → the loading dock → **she walks to V’s door** (\`escaped\`).
- *First failed escape*: back to the cell; they stand on her hand.
- *Second failed escape*: closeness tier 2+ (or the joint POV) → **V comes** (\`vRescueCut\`). Below tier 2 → **the last chance**: the cell again and a short third session. Failing again → **the late route** (\`lateM\`): V carries her out and dies by the car → Misaki’s lone route (5.2).

**V: getting her out (sections 2.5–2.6)**
- *Find her*: trace the phone, shake down one of their people, call Ronin and Angel, hunt along the river (the fourth warehouse; Angel’s fans find it if he called her) → “Go get her”: the rescue run → carrying her out → **he reaches her cell** (\`rescued\`). Being seen means the fight; same ending.
- Each night she is missing makes the rescue harder; at **four nights** → **the late route** (\`lateV\`): he is too late → V’s lone route (5.2).

**The infirmary: severity (section 3).** When she is carried in, the stay is scored: +1 for each session beyond the first, +1 at 16+ lost hours, +1 at 24+, +1 for two failed escapes, +1 for the last-chance route, +1 for composure under 35, +1 if she said two or more things under the needle, +1 for three or more nights missing; +2 with the code *thetallone*. The code *fridaycomes* starts at 14.
- **Under 4 — the ordinary stay** (3.1): clears by the first morning; the shatter is the *morning* version; the bin of soup tubs.
- **4+ — the extended delusion** (3.4): one extra day in the cell; **6+**: two extra days, and on an extra night **Friday** (3.6): she leaves goodbyes with “the tall one”, who is V. Tier 3 can look at the guard’s face and end it early.
- **8+ — the worst route** (Misaki POV, 3.6–3.8): it never clears by itself. Each deluded morning costs 7 composure; each day brings a state-of-mind scene by composure band.
  - *Think it through*: five clues in the room. **Four clues → she reasons it out**, opens the door and finds V (shatter: *logic*).
  - *Composure 3 or less at bedtime* → **the bright turn** (three choices: what she hums, what she leaves out, where she sits) → **the spiral** the same night:
    - with **2+ clues and a goodbye left for V** at Friday → **the secret, interrupted**: V is listening at the door and gets there in time; she lives (shatter: *caught*; \`kd_interrupted_after\`).
    - otherwise → **lucid too late**: she knows it is V’s house and Tuesday, and cannot call out (shatter: *late*); the bright-turn choices decide what V finds → **V alone** (5.1, \`KD_AFTER\`).

**The setting** (title screen or pause menu: *Kidnapping aftermath: full story / injuries only*).
- **Full story**: adds the strand about the hours she cannot remember: the doctor’s question, the examination window, the photographs, the precaution cup, the white box, the denial (3.10). Never named.
- **Injuries only**: removes that strand and these scenes: \`kd_konbini\`, \`kd_angelsees\`, \`kd_card\`, \`kd_discharge\`, \`kd_checkup\`, \`kd_pins\`, \`kd_wrists\`, threads \`tx_kd_fine\`, \`tx_kd_selfie\`, \`tx_kd_adoc\`. Adds the plain room spots and the \`kd_rec_*\` recovery (3.11). Scenes that branch on the setting show both versions below.

**The hidden route** (\`kd_last\`, full story, Misaki POV). On the last Saturday the examination would still show, “Answer the question.” is enabled only if all five hold: she **kept the room** (\`kd_blank\`), **read the note-taker’s notebook herself** (\`kd_book\`), **looked at the photographs and handed them back** (\`kd_photos\` then \`kd_photodeny\`), **took the precaution tablets** (\`kd_cup\`), and **found the white box** in the infirmary fridge. Then \`kd_told_box\`, \`kd_told_dentist\` and \`kd_told_sleep\` replace the usual scenes, and the collapses (\`kd_crash\`, \`kd_crash2\`) do not happen.

**After discharge (section 4).** One scheduled scene every morning and once each in the afternoon, evening and night, in the order of 4.1. The big choices: the notebook (read it / V holds it / burn it), keep the room or let it go blank, the clip (wear it / file it / the river), the trailer (sleep there / move it / leave), and the many small pretences that raise *denial* (full story).
`;

const TITLES = {
  'index.html:takenM': 'The van (Misaki)', 'index.html:interrogate': 'The interrogation (original questions)', 'kc27.js:interrogate': 'Waking in the cell; the session wrapper',
  'kc27.js:kdBlankQ': 'Before nine', 'kc28.js:kdBlankQ': 'The chair', 'kc28.js:kdHoldOn': 'The chair (on-screen words)', 'kc27.js:kdShort': 'Later sessions',
  'kc27.js:kdDose': 'The dose', 'kc28.js:KD_INJ': 'After the dose: what she says about her injuries (full story)', 'kc28.js:KD_INJ_OFF': 'After the dose (injuries only)',
  'kc27.js:KD_SAID': 'What the note-taker wrote', 'kc27.js:kdTheyCome': 'They come for another session', 'index.html:ROOMS': 'The cell (original spots)',
  'kc27.js:code@65': 'The cell: two more spots', 'kc28.js:code@36': 'The cell: the screws and the steps', 'kc30.js:code@15': 'The radio: overheard',
  'index.html:escapeRun': 'The escape run', 'kc28.js:kdDock': 'The loading dock', 'kc30.js:kdDock': 'The dock stairs', 'index.html:escaped': 'She gets out',
  'index.html:failedEscape#1': 'A failed escape', 'index.html:failedEscape#2': 'The second failure: the last chance', 'index.html:vRescueCut': 'V at the loading bay',
  'index.html:interrogateLite': 'The third session', 'index.html:lateM': 'The late route (Misaki)', 'index.html:takenV': 'Delivered (V)', 'index.html:hub': 'Find her (V’s menu)',
  'index.html:informant': 'Shake down one of their people', 'kc27.js:kdScout': 'Hunt along the river', 'index.html:two_cups': 'Two cups', 'index.html:gl_taken': 'At a window',
  'index.html:chatLog': 'The server chat', 'index.html:sleepBase': 'Nights missing', 'index.html:lateV': 'The late route (V)', 'index.html:vRescue': 'The rescue run',
  'kc28.js:kdCarry': 'Carrying her out', 'index.html:rescued': 'The cell door', 'index.html:after': 'After', 'index.html:kdTell': 'Leaks reach her friends', 'kc27.js:stealth': 'Shaking hands',
  'index.html:theList': 'The list', 'index.html:listTarget': 'A name on the list', 'kc59.js:W59REC': 'The list: recognition lines', 'index.html:finale': 'The finale',
  'index.html:finalM': 'Misaki goes after the boss', 'index.html:finalV': 'V goes after the boss', 'kc56.js:k56BossScene': 'The address was bought',
  'kc28.js:kdMedStart': 'The room that says LAUNDRY', 'kc28.js:KD_CHART': 'The chart', 'kc28.js:code@83': 'The infirmary room', 'kc28.js:kdMedRun': 'Running',
  'kc28.js:openPhone': 'No phone', 'kc28.js:kdNoLeave': 'No leaving', 'kc28.js:kdBacklog': 'The backlog', 'kc28.js:kdMedMorning': 'Infirmary mornings', 'kc48.js:KD_NIGHT': 'Nights', 'kc48.js:KD_NIGHT.push(…)': 'The fifth night',
  'kc48.js:KD_DOOR': 'Talk through the door: the five topics', 'kc48.js:kdVisitor': 'Visitors', 'kc61.js:KD61_MC': 'Afternoons, clear', 'kc61.js:k61Tubs': 'The bin',
  'kc28.js:sideHub': 'Sublevel two (V’s menu)', 'kc28.js:kdSit': 'Sit with her', 'kc48.js:kdSit': 'Sit with her: three more', 'kc60.js:sideHub#2': 'The kennel corridor (menu)',
  'kc60.js:A60COR': 'The kennel corridor, at night', 'kc61.js:sideHub': 'V’s infirmary menu (kc61)', 'kc61.js:KD61_THINGS': 'Her things, from the river', 'kc61.js:KD61_FILE': 'Her file',
  'kc61.js:KD61_ASK': 'Ask what she needs', 'kc61.js:KD61_VC': 'V’s days, clear', 'kc46.js:KD_STILL_M': 'A cell again (Misaki)', 'kc46.js:KD_STILL_V': 'She does not know him (V)',
  'kc46.js:kdMedMorning#1': 'Extended-delusion mornings: the choice', 'kc46.js:code@47': 'The spots on those days', 'kc46.js:kdMedMorning#2': 'On the stairs',
  'kc61.js:KD61_MX': 'Afternoons, extended (Misaki)', 'kc61.js:KD61_VX': 'Extended (V)', 'kc49.js:hub': 'Eleven days', 'kc49.js:KD_BYE': 'The goodbyes', 'kc49.js:kdGoodbye': 'Friday',
  'kc49.js:kdMedMorning': 'Friday, from V’s side', 'kc50.js:KD_DESC': 'The room, described', 'kc51.js:KD_MIND': 'State of mind', 'kc52.js:code@47': 'State of mind: a third scene per band',
  'kc52.js:KD_UNCANNY': 'Uncanny moments', 'kc50.js:KD_SPIRAL_WARN': 'Dark thoughts', 'kc60.js:hub': 'The rule', 'kc61.js:KD61_MW': 'Worst (Misaki)', 'kc61.js:KD61_VW': 'Worst (V)',
  'kc50.js:KD_CLUES': 'The five clues', 'kc50.js:code@17': 'Think it through', 'kc50.js:kdLogicOut': 'The logic-out', 'kc52.js:kdBright': 'The bright turn',
  'kc52.js:KD_HUM': 'What she hummed', 'kc52.js:KD_LEFT': 'What she left out', 'kc52.js:KD_SHAPE': 'Where she sat', 'kc50.js:kdSpiral': 'The spiral, and lucid too late',
  'kc50.js:kdInterrupted': 'The secret, interrupted', 'kc53.js:KD_SHATTER_LINES': 'The shatter lines', 'kc36.js:code@14': 'The small fridge (injuries only)',
  'kc33.js:code@85': 'The cabinet (injuries only)', 'kc36.js:code@31': 'The plain room (injuries only)', 'kc36.js:sideHub': 'Physio and walking (injuries only)',
  'kc28.js:hub': 'Tired mornings', 'kc47.js:SD_NOTES': 'Small sad things', 'kc54.js:sideHub': 'Progress', 'index.html:flashCheck': 'Flashbacks', 'index.html:ground': 'Breathing',
  'index.html:sleepAfter': 'After-phase nights', 'kc51.js:KD_AFTER': 'After the spiral', 'kc52.js:code@59': 'After the spiral, more', 'kc52.js:sideHub': 'Sit in the infirmary doorway',
  'index.html:loneIntro': 'Six weeks later', 'index.html:LBEATS': 'Lone beats', 'index.html:LONE_EV': 'Lone mornings', 'index.html:morningEvent': 'Lost mornings',
  'index.html:sleep': 'Where tonight', 'index.html:act2Hub': 'Grief', 'index.html:npcBarks': 'Floating words', 'index.html:dmTab': 'Delivered', 'index.html:collapseEnding': 'The Chair By The Door',
  'index.html:loneEnding': 'Lone endings', 'kc59.js:W59G': 'Glimpses', 'kc27.js:kdMotherL': '(kd_file, continued) The invented mother', 'kc27.js:kdFileOpen': '(kd_file, continued) The enrolment form', 'kc27.js:kdBookWarn': '(kd_book, continued) The warnings', 'kc27.js:kdKeepIt': '(kd_blank, continued) Keep it', 'kc27.js:kdLetGo': '(kd_blank, continued) Let it go', 'kc29.js:KD_DRAFT': '(kd_draft, continued) The drafts', 'kc36.js:KD_SA_HELP': 'The setting, as the Settings panel explains it', 'kc62.js:KD62_TH': 'The file on him', 'kc62.js:KD62_MP': 'Evenings in the cell', 'kc62.js:k62Flash': 'It comes back',  'kc62.js:KD62_VR': 'Through the gap (V)',  'kc62.js:KD62_VW': 'The light under the door (V)', 'kc62.js:KD62_VC': 'The tray (V)', 'kc63.js:KD63_MC': 'Her head, clear (Misaki)', 'kc63.js:KD63_VC': 'From the doorway (V)', 'kc63.js:KD63_MX': 'Her head, extended (Misaki)', 'kc63.js:KD63_VX': 'The list through the door (V)', 'kc63.js:k63XBack': 'It comes back without breaking', 'kc63.js:KD63_VB': 'The date at intervals (V)', 'kc63.js:KD63_MW': 'Her head, worst (Misaki)', 'kc63.js:KD63_VW': 'Her name, forty times (V)', 'kc63.js:k63After': 'After the shatter: her body has not been told', 'kc63.js:k63WBack': 'After the logic or caught shatter: so sure', 'kc62.js:k62File': '(kd62_file, continued)', 'kc27.js:kdKn': 'kd_knock1 – kd_knock3: the knocks', 'kc56.js:k56_grey': 'The man in grey',
};

/* ------------------------------------------------------------------ runtime lists (order, setting gates) */
function runtimeLists() {
  const fallback = { o: ['kd_shards', 'kd_interrupted_after', 'kd_discharge', 'kd61_home', 'kd_book', 'kd_delivered', 'kd_count', 'kd61_rent', 'kd62_file', 'kd_rec_list', 'kd_rec_stitches', 'kd_rec_ronin', 'kd_rec_angel', 'kd_rec_vpins', 'kd_rec_eat', 'kd_rec_job', 'kd_card', 'w59_know', 'kd_ask', 'kd_math', 'w59_hale_after', 'kd_konbini', 'kd_window', 'kd_cup', 'kd_bodymap', 'kd_still_relapse', 'kd_blank', 'kd_photos', 'kd_angelsees', 'kd_wrists', 'kd_clothes', 'kd_exam', 'kd_practice', 'kd_recount', 'kd_photodeny', 'kd_home', 'kd_results', 'kd_vtable', 'kd_vdoc', 'kd_last', 'kd_told_box', 'kd_kitgone', 'kd_pins', 'kd_wash', 'kd_smell', 'kd_notask', 'kd_vknows', 'kd_slip', 'kd_sleeptalk', 'kd_parcel', 'kd_roncrow', 'kd_vod', 'kd_bank', 'kd_jacket', 'kd_shop', 'kd_round', 'kd_knock1', 'kd_knock2', 'kd_knock3', 'kd_ronradio', 'kd_ronmad', 'kd_reh_fist', 'kd_reh_dark', 'kd_reh_rifle', 'kd_reh_adapt', 'kd_reh_perform', 'kd_reh_laugh', 'kd_reh_who', 'kd_cast', 'kd_bookout', 'kd_van', 'kd_hara', 'kd_dentist', 'kd_told_dentist', 'kd_told_sleep', 'kd_later', 'kd_crash', 'kd_crash2', 'kd_march', 'kd_checkup', 'kd_epi', 'kd_v_ledger', 'kd60_vpage', 'kd_v_kitchen', 'kd_v_nobody', 'kd_v_tally', 'kd_hard_first', 'kd_hard_work', 'kd_hard_angel', 'kd60_rule', 'kd60_wr', 'kd_v_sees', 'kd62_report', 'kd_hard_rule', 'kd_v_cant', 'k58_creak', 'kd62_clock', 'k58_pages', 'k58_cups', 'k58_cupv', 'k58_read', 'k58_test', 'k58_steps', 'k58_end'],
    sa: ['kd_math', 'kd_clothes', 'kd_exam', 'kd_photos', 'kd_wash', 'kd_smell', 'kd_notask', 'kd_vknows', 'kd_later', 'kd_draft', 'kd_recount', 'kd_slip', 'kd_sleeptalk', 'kd_shop', 'kd_ask', 'kd_window', 'kd_bodymap', 'kd_photodeny', 'kd_cup', 'kd_results', 'kd_dentist', 'kd_vdoc', 'kd_kitgone', 'kd_last', 'kd_told_box', 'kd_told_dentist', 'kd_told_sleep'],
    tx: ['tx_kd_sleep', 'tx_kd_ask', 'tx_kd_vdots', 'tx_kd_ronsoft', 'tx_kd_docstop'], gone: ['kd_konbini', 'kd_angelsees', 'kd_card', 'kd_discharge', 'kd_checkup', 'kd_pins', 'kd_wrists'], live: false };
  try {
    const cp = require('child_process');
    const g = cp.execSync('npm root -g', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    const code = `const {chromium}=require(${JSON.stringify(path.join(g, 'playwright'))});(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route('**/fonts.g*/**',r=>r.abort());
      await p.goto('file://'+${JSON.stringify(path.join(ROOT, 'index.html'))});await p.waitForTimeout(400);
      const r=await p.evaluate(()=>({o:KD_ORDER,sa:KD_SA_EV,tx:KD_SA_TX,gone:KD_OFF_GONE}));console.log(JSON.stringify(r));await b.close()})().catch(e=>{console.error(e);process.exit(1)});`;
    const out = cp.execFileSync(process.execPath, ['-e', code], { stdio: ['ignore', 'pipe', 'ignore'], timeout: 60000 }).toString().trim().split('\n').pop();
    const r = JSON.parse(out); r.live = true; return r;
  } catch (e) { return fallback; }
}

/* ------------------------------------------------------------------ assemble */
function main() {
  const RT = runtimeLists();
  const OFF_TX = ['tx_kd_fine', 'tx_kd_selfie', 'tx_kd_adoc'];
  const all = [];
  for (const f of INCLUDE_FILES) {
    let scenes;
    if (f === 'index.html') {
      scenes = extractFile(f, {
        only: nm => INDEX_UNITS.test(nm) || /^(TOPICS_|EVENTS|LIGHT|DARK)/.test(nm) || true,
        focus: (nm, st, ctx) => {
          if (/^(hub|sleepBase|chatLog)$/.test(nm)) {
            const hits = []; (function rec(x) { if (!x || typeof x !== 'object') return; if (x.type === 'IfStatement' && /phase==='(taken|after)'/.test(src(ctx, x.test)) && (nm !== 'hub' || /taken/.test(src(ctx, x.test)))) { hits.push(x.consequent); return; } for (const k in x) { const v = x[k]; if (Array.isArray(v)) v.forEach(rec); else if (v && typeof v.type === 'string') rec(v); } })(st);
            return hits.length ? hits : { type: 'EmptyStatement' };
          }
          if (nm === 'ROOMS') { let cell = null; (function rec(x) { if (cell || !x || typeof x !== 'object') return; if (x.type === 'Property' && propKey(x) === 'cell' && x.value.type === 'ObjectExpression') { cell = x.value; return; } for (const k in x) { const v = x[k]; if (Array.isArray(v)) v.forEach(rec); else if (v && typeof v.type === 'string') rec(v); } })(st); return cell || { type: 'EmptyStatement' }; }
          return null;
        }
      });
      scenes = scenes.filter(s => (s.kind === 'unit' && INDEX_UNITS.test(s.id)) || (s.kind !== 'unit' && INDEX_EVENTS.test(s.id)) || (s.kind === 'spot' && s.parent === 'ROOMS'));
    } else scenes = extractFile(f);
    const seen = {};
    for (const sc of scenes) { seen[sc.id] = (seen[sc.id] || 0) + 1; sc.n = seen[sc.id]; sc.key = f + ':' + sc.id; all.push(sc); }
  }
  // occurrence counts so "#n" selectors can be checked
  const count = {}; for (const sc of all) count[sc.key] = (count[sc.key] || 0) + 1;
  const skip = sc => SKIP.has(sc.key) || SKIP.has(sc.key + '#' + sc.n);
  const pool = all.filter(sc => !skip(sc));
  const placed = new Map();   // scene -> section ref
  const match = (sel) => {
    let file, id, n = 0; const i = sel.indexOf(':'); file = sel.slice(0, i); id = sel.slice(i + 1);
    const h = id.match(/^(.*)#(\d+)$/); if (h) { id = h[1]; n = +h[2]; }
    const re = id.includes('*') ? new RegExp('^' + id.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$') : null;
    return pool.filter(sc => sc.file === file && (re ? re.test(sc.id) : sc.id === id) && (!n || sc.n === n));
  };
  // pass 1: explicit selectors claim their scenes
  const plan = [];
  for (const S1 of SECTIONS) for (const sub of S1.subs) {
    const slot = { sec: S1, sub, ref: sub.title.split(' ')[0], scenes: [] }; plan.push(slot);
    for (const sel of sub.sel) {
      if (sel[0] === '@') { slot.scenes.push({ special: sel }); continue; }
      const m = match(sel); if (!m.length) console.warn('selector matched nothing:', sel);
      for (const sc of m) { if (placed.has(sc)) continue; placed.set(sc, slot.ref); slot.scenes.push(sc); }
    }
  }
  const byId = id => pool.filter(sc => sc.id === id && sc.kind === 'event');
  // pass 2: specials in document order
  for (const slot of plan) {
    const out = [];
    for (const it of slot.scenes) {
      if (!it.special) { out.push(it); continue; }
      const take = list => list.forEach(sc => { if (!placed.has(sc)) { placed.set(sc, slot.ref); out.push(sc); } });
      if (it.special === '@SA') {
        const ids = RT.o.filter(id => RT.sa.includes(id)).concat(RT.sa.filter(id => !RT.o.includes(id)));
        ids.forEach(id => take(byId(id)));
        take(pool.filter(sc => sc.kind === 'topic' && sc.id === 'kd_second'));
        take(pool.filter(sc => sc.kind === 'thread' && RT.tx.includes(sc.id)));
      } else if (it.special === '@REC') take(pool.filter(sc => /^kd_rec_/.test(sc.id)));
      else if (it.special === '@ORDER') {
        RT.o.forEach((id, k) => {
          const L = byId(id);
          if (!L.length && DYN[id]) { const h = pool.find(x => x.key === DYN[id]); if (h && !placed.has(h)) { placed.set(h, slot.ref); h.title = h.title || ''; h.dynId = id; out.push(h); } else out.push({ xref: id, text: `${k + 1}. ${id}: the same scene as above, for the next thing she said` }); return; }
          if (!L.length) { out.push({ xref: id, text: `${id}: (no text found)` }); return; }
          L.forEach(sc => { if (placed.has(sc)) out.push({ xref: id, at: placed.get(sc), pos: k + 1 }); else { placed.set(sc, slot.ref); out.push(sc); } });
        });
      } else if (it.special === '@TX') take(pool.filter(sc => sc.kind === 'thread'));
      else if (it.special === '@TOPIC') take(pool.filter(sc => sc.kind === 'topic'));
      else if (it.special === '@END') take(pool.filter(sc => sc.id === 'extraEnding'));
    }
    slot.scenes = out;
  }
  for (const slot of plan) {
    const out = [];
    for (const sc of slot.scenes) {
      out.push(sc);
      if (sc.xref || !sc.id) continue;
      for (const [hk, ev] of Object.entries(ATTACH)) if (ev === sc.id) for (const h of pool.filter(x => x.key === hk && !placed.has(x))) { placed.set(h, slot.ref); out.push(h); }
    }
    slot.scenes = out;
  }
  const rest = pool.filter(sc => !placed.has(sc));
  if (rest.length) plan.push({ sec: { title: 'Appendix: other text from the same modules' }, sub: { title: 'Not placed above', intro: 'Text from the arc’s modules that the sections above do not place.' }, ref: 'A', scenes: rest });

  /* condition note per scene */
  const orderPos = id => { const i = RT.o.indexOf(id); return i < 0 ? 0 : i + 1; };
  const setNote = sc => {
    if (RT.sa.includes(sc.id) || RT.tx.includes(sc.id) || sc.id === 'kd_second') return 'Full-story setting only.';
    if (RT.gone.includes(sc.id) || OFF_TX.includes(sc.id)) return 'Full-story setting only (cut from injuries-only).';
    if (sc.helper === 'kdRec' || /^kd_rec_/.test(sc.id)) return 'Injuries-only setting only.';
    return '';
  };
  const noteFor = sc => {
    const k = sc.key, kn = k + '#' + sc.n, parts = [];
    const hand = NOTE[kn] || NOTE[k]; if (hand) parts.push(hand);
    if (sc.kind === 'event' || sc.kind === 'thread' || sc.kind === 'topic' || sc.kind === 'spot') {
      let c = sc.cond || '';
      if (sc.day != null && sc.helper === 'kdEv2') c = `day ${sc.day}+ after discharge` + (c ? ', ' + c : '');
      if (sc.day != null && sc.helper === 'kdRec') c = `day ${sc.day}+ after discharge` + (c ? ', ' + c : '');
      if (c) parts.push((sc.kind === 'spot' ? 'Shown when: ' : sc.kind === 'topic' ? 'Offered when: ' : 'Plays when: ') + c + '.');
      const tpov = { stay: 'V', k58_t_step: 'V', k58_t_corner: 'M' }[sc.id];
      if (sc.kind === 'topic' && tpov) parts.push(tpov === 'V' ? 'Talk topic: Misaki talks to V (Misaki’s POV).' : 'Talk topic: V talks to Misaki (V’s POV).');
      else if (sc.kind === 'topic') parts.push(/TOPICS_V|TDTOP_V/.test(sc.unit || '') ? 'Talk topic: Misaki talks to V (Misaki’s POV).' : /TOPICS_M|TDTOP_M/.test(sc.unit || '') ? 'Talk topic: V talks to Misaki (V’s POV).' : 'Talk topic.');
    }
    const p = orderPos(sc.id); if (p && sc.kind === 'event') parts.push(`Aftermath order: ${p} of ${RT.o.length}.`);
    const s = setNote(sc); if (s) parts.push(s);
    if (sc.kind === 'unit' && !hand && sc.id === 'extraEnding') parts.push('Ending lines (' + sc.file + ').');
    return parts.join(' ');
  };
  const headFor = sc => {
    const t = TITLES[sc.key + '#' + sc.n] || TITLES[sc.key];
    if (t) return t;
    if (sc.kind === 'spot') return 'Spot: ' + sc.id.replace(/^spot: /, '');
    if (sc.kind === 'thread') return sc.title.replace('Phone thread: ', 'Thread: ') + ' (' + sc.id + ')';
    if (sc.kind === 'topic') return 'Topic: ' + (sc.title || sc.id) + ' (' + sc.id + ')';
    if (sc.id === 'extraEnding') return 'Ending lines (' + sc.file + ')';
    return sc.id;
  };

  /* ---------- markdown ---------- */
  const md = [];
  const anchors = new Set();
  const slug = t => { let b = t.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 's'; let s = b, i = 2; while (anchors.has(s)) s = b + '-' + i++; anchors.add(s); return s; };
  md.push('# Killer Chat! Off Hours — the kidnapping arc, the infirmary and the recovery', '');
  md.push(`Every line of the arc’s text, compiled from the game source by \`tools/kd_script.js\` (regenerate with \`node tools/kd_script.js\`). Lines are quoted as written; \`[placeholders]\` stand for text the game fills in (the captor organisation, the boss, numbers). Where Misaki’s line changes with closeness, all four tiers are shown (tier 0 = least close; after the kidnapping the voice is pushed toward the plainer tiers). Branches show which condition or choice leads where; ▸ marks a choice the player makes; greyed-out options are marked.`, '');
  md.push('**Speakers:** Misaki (hitmeuppp), V (K9), Angel (Angelic), Ronin (ronin.beaufort); *italic lines are narration*.', '');
  md.push(RT.live ? '_Scheduler order and setting lists were read from the running game._' : '_Scheduler order and setting lists: the snapshot built into the script (the game could not be loaded headless)._', '');
  md.push('## Contents', '');
  md.push('- [Route map](#@@Route map@@)');
  const secTitles = [];
  for (const slot of plan) { if (!secTitles.includes(slot.sec.title)) { secTitles.push(slot.sec.title); md.push(`- [${slot.sec.title}](#@@${slot.sec.title}@@)`); } md.push(`  - [${slot.sub.title}](#@@${slot.sub.title}@@)`); }
  anchors.clear(); md.push('', '## Route map', '', ROUTE_MAP.trim(), '');
  slug('Route map'); for (const t of secTitles) slug(t);
  const usedSec = new Set();
  const sceneAnchor = new Map();
  for (const slot of plan) {
    if (!usedSec.has(slot.sec.title)) { usedSec.add(slot.sec.title); md.push('', '## ' + slot.sec.title, ''); if (slot.sec.intro) md.push(slot.sec.intro, ''); }
    md.push('### ' + slot.sub.title, ''); if (slot.sub.intro) md.push('> ' + slot.sub.intro, '');
    for (const sc of slot.scenes) {
      if (sc.xref) { md.push(sc.at ? `- *${sc.pos}. \`${sc.xref}\` — printed in ${sc.at}.*` : `- *${sc.text}*`, ''); continue; }
      md.push('#### ' + headFor(sc).replace(/[*_]/g, m => '\\' + m), '');
      const nt = noteFor(sc); if (nt) md.push('> ' + nt.replace(/\n/g, ' '), '');
      md.push(mdItems(sc.items), '');
    }
  }
  // GitHub-style anchors: computed over every heading in order, then the contents links are filled in
  const ghSeen = {}, ghFirst = {};
  for (const l of md.join('\n').split('\n')) {
    const h = l.match(/^#{1,6} (.*)$/); if (!h) continue;
    const plain = h[1].replace(/\\([*_])/g, '$1');
    let b = plain.toLowerCase().replace(/[^\p{L}\p{N} _-]/gu, '').replace(/ /g, '-');
    const n = ghSeen[b] || 0; ghSeen[b] = n + 1; const a = n ? b + '-' + n : b;
    if (!(plain in ghFirst)) ghFirst[plain] = a;
  }
  const mdText = md.join('\n').replace(/\]\(#@@(.*?)@@\)/g, (m, t) => '](#' + (ghFirst[t] || '') + ')').replace(/\n{3,}/g, '\n\n') + '\n';

  /* ---------- html ---------- */
  const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const inl = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|[^*\w])\*([^*\n]+?)\*(?=[^*\w]|$)/g, '$1<i>$2</i>').replace(/`([^`]+)`/g, '<code>$1</code>');
  const whoCls = w => /^Misaki/.test(w) ? 'm' : /^V\b/.test(w) ? 'v' : /^Angel/.test(w) ? 'a' : /^Ronin/.test(w) ? 'r' : /boss|^\[/.test(w) ? 'x' : 'o';
  const altsHtml = (it, cls) => it.alts.length === 1 ? `<span class="${cls}">${esc(it.alts[0].text)}</span>`
    : '<ul class="alts">' + it.alts.map(a => `<li>${a.label ? `<span class="lab">${esc(a.label)}</span> ` : ''}<span class="${cls}">${esc(a.text)}</span></li>`).join('') + '</ul>';
  const itemsHtml = items => {
    const h = [];
    for (const it of items) {
      const pad = ` style="--d:${it.d || 0}"`;
      switch (it.type) {
        case 'line': if (!it.who) h.push(`<p class="ln nar"${pad}>${altsHtml(it, 'tx')}</p>`); else h.push(`<p class="ln"${pad}><span class="who ${whoCls(it.who)}">${esc(it.who)}</span> ${altsHtml(it, 'tx')}</p>`); break;
        case 'prompt': h.push(`<p class="ln prompt"${pad}>${it.who ? `<span class="who ${whoCls(it.who)}">${esc(it.who)}</span> ` : ''}<span class="tag">choice</span> ${altsHtml(it, 'tx')}</p>`); break;
        case 'opt': h.push(`<p class="ln opt${it.dis ? ' dis' : ''}"${pad}><span class="arrow">▸</span> ${it.who ? `<span class="who ${whoCls(it.who)}">${esc(it.who)}</span> ` : ''}${altsHtml(it, 'tx')}${it.sub ? ` <span class="sub">(${esc(it.sub)})</span>` : ''}${it.dis ? ` <span class="tag">${esc(it.dis)}</span>` : ''}</p>`); break;
        case 'branch': h.push(`<p class="br"${pad}>${esc(it.text)}</p>`); break;
        case 'key': h.push(`<p class="key"${pad}><code>${esc(KEYNAME[it.text] || it.text)}</code></p>`); break;
        case 'note': h.push(`<p class="nt${it.go ? ' go' : ''}"${pad}>${esc(it.text)}</p>`); break;
        case 'loose': h.push(`<p class="ln loose"${pad}>${it.key ? `<code>${esc(KEYNAME[it.key] || it.key)}</code> ` : ''}${altsHtml(it, 'tx')}</p>`); break;
      }
    }
    return h.join('\n');
  };
  const hAnch = new Set(); const hs = t => { let b = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 's'; let s = b, i = 2; while (hAnch.has(s)) s = b + '-' + i++; hAnch.add(s); return s; };
  const toc = [], body = [];
  const done = new Set();
  for (const slot of plan) {
    if (!done.has(slot.sec.title)) {
      done.add(slot.sec.title); const a = hs(slot.sec.title);
      if (toc.length) toc.push('</ul></li>'); toc.push(`<li><a href="#${a}">${esc(slot.sec.title)}</a><ul>`);
      body.push(`<h2 id="${a}">${esc(slot.sec.title)}</h2>` + (slot.sec.intro ? `<p class="intro">${esc(slot.sec.intro)}</p>` : ''));
    }
    const a = hs(slot.sub.title); toc.push(`<li><a href="#${a}">${esc(slot.sub.title)}</a></li>`);
    body.push(`<section><h3 id="${a}">${esc(slot.sub.title)}</h3>` + (slot.sub.intro ? `<div class="cond">${esc(slot.sub.intro)}</div>` : ''));
    for (const sc of slot.scenes) {
      if (sc.xref) { body.push(sc.at ? `<p class="xref">${sc.pos}. <code>${esc(sc.xref)}</code> — printed in ${esc(sc.at)}</p>` : `<p class="xref">${esc(sc.text)}</p>`); continue; }
      const nt = noteFor(sc);
      body.push(`<article class="scene"><h4 id="${hs('s-' + sc.key + '-' + sc.n)}">${esc(headFor(sc))} <span class="src">${esc(sc.file)}</span></h4>${nt ? `<div class="cond">${esc(nt)}</div>` : ''}\n${itemsHtml(sc.items)}</article>`);
    }
    body.push('</section>');
  }
  toc.push('</ul></li>');
  const routeHtml = ROUTE_MAP.trim().split('\n').reduce((acc, l) => {
    const m = l.match(/^(\s*)- (.*)$/);
    if (m) { const lvl = m[1].length / 2; acc.push(`<li class="l${lvl}">${inl(m[2])}</li>`); } else if (l.trim()) acc.push(`<p>${inl(l)}</p>`);
    return acc;
  }, []).join('\n').replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/g, m => `<ul class="rm">${m}</ul>`);
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kidnapping Arc Script</title>
<style>
:root{--bg:#f6f3ee;--paper:#fffdf9;--ink:#1f1c22;--muted:#6b6470;--rule:#e2dcd3;--cond-bg:#efebe4;--cond-ink:#5a5360;--accent:#8a2b3a;
--m:#b0306b;--v:#2f5b8f;--a:#a0458f;--r:#7a5a1e;--x:#7d2e2e;--o:#4c5a4c;--br:#7a6a8a;--opt:#215a4a;--dis:#9a949e;--code:#f1ece4}
@media (prefers-color-scheme: dark){:root{--bg:#141217;--paper:#1b181f;--ink:#e8e4ec;--muted:#a59fac;--rule:#2e2934;--cond-bg:#24202a;--cond-ink:#b8b0c0;--accent:#e07a8c;
--m:#f08ab8;--v:#8fb6ec;--a:#e2a0d6;--r:#e0bd78;--x:#e69a9a;--o:#a9c2a9;--br:#bba8d6;--opt:#7fd1b7;--dis:#77717d;--code:#2a2530}}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 Georgia,"Iowan Old Style","Palatino Linotype",serif;-webkit-text-size-adjust:100%}
.wrap{display:grid;grid-template-columns:minmax(0,1fr);max-width:1180px;margin:0 auto}
@media (min-width:960px){.wrap{grid-template-columns:290px minmax(0,1fr);gap:28px;padding:0 20px}}
nav.toc{background:var(--paper);border-bottom:1px solid var(--rule);padding:8px 16px}
@media (min-width:960px){nav.toc{position:sticky;top:0;align-self:start;max-height:100vh;overflow:auto;border:0;border-right:1px solid var(--rule);padding:20px 16px 40px 0;background:transparent}}
nav.toc details.d{display:none}@media (min-width:960px){nav.toc details.m{display:none}nav.toc details.d{display:block}}
nav.toc summary{cursor:pointer;font:600 15px/1.4 system-ui,sans-serif;padding:6px 0}
nav.toc ul{list-style:none;margin:0;padding-left:12px;font:14px/1.45 system-ui,sans-serif}nav.toc>details>ul{padding-left:0}
nav.toc li{margin:3px 0}nav.toc a{color:var(--muted);text-decoration:none}nav.toc a:hover{color:var(--accent)}
main{padding:16px;min-width:0}@media (min-width:960px){main{padding:24px 0 80px}}
h1{font-size:1.7rem;line-height:1.25;margin:.4em 0}h2{font-size:1.4rem;margin:2.2em 0 .4em;padding-top:.6em;border-top:2px solid var(--accent)}
h3{font-size:1.15rem;margin:1.8em 0 .5em;color:var(--accent)}h4{font-size:1.02rem;margin:1.6em 0 .4em;font-family:system-ui,sans-serif}
h4 .src{font-weight:400;font-size:.75rem;color:var(--muted);margin-left:.4em}
.lead{color:var(--muted)}
.cond{background:var(--cond-bg);color:var(--cond-ink);border-radius:6px;padding:8px 12px;margin:.4em 0 .8em;font:14px/1.5 system-ui,sans-serif}
.intro{color:var(--muted)}
.scene{background:var(--paper);border:1px solid var(--rule);border-radius:8px;padding:6px 16px 10px;margin:14px 0;overflow-wrap:anywhere}
.ln,.br,.nt,.key{margin:.45em 0 .45em calc(var(--d,0) * 18px);padding-left:calc(min(var(--d,0),1) * 10px);border-left:calc(min(var(--d,0),1) * 2px) solid var(--rule)}
@media (max-width:600px){.ln,.br,.nt,.key{margin-left:calc(var(--d,0) * 10px)}}
.nar .tx{font-style:italic}.who{font:700 13px/1 system-ui,sans-serif;letter-spacing:.02em;margin-right:.35em}
.who.m{color:var(--m)}.who.v{color:var(--v)}.who.a{color:var(--a)}.who.r{color:var(--r)}.who.x{color:var(--x)}.who.o{color:var(--o)}
.br{font:600 13px/1.4 system-ui,sans-serif;color:var(--br)}
.opt .tx{font-weight:600;color:var(--opt)}.opt.dis .tx{color:var(--dis);text-decoration:line-through;text-decoration-thickness:1px}
.arrow{color:var(--opt)}.sub{color:var(--muted);font-size:.9em;font-style:italic}
.tag{font:11px/1.5 system-ui,sans-serif;background:var(--code);color:var(--muted);border-radius:4px;padding:1px 5px;overflow-wrap:anywhere}
.prompt .tx{font-style:italic;color:var(--muted)}
.nt{font:13px/1.4 system-ui,sans-serif;color:var(--muted)}.nt.go{color:var(--br)}
.loose code,.key code,code{font:12px/1.4 ui-monospace,Menlo,monospace;background:var(--code);border-radius:3px;padding:1px 4px}
ul.alts{margin:.2em 0 .2em 0;padding-left:1.1em}ul.alts li{margin:.15em 0}.lab{font:600 12px/1.3 system-ui,sans-serif;color:var(--muted)}
.xref{color:var(--muted);font:14px/1.4 system-ui,sans-serif;margin:.3em 0}
.route{background:var(--paper);border:1px solid var(--rule);border-radius:8px;padding:4px 18px}
ul.rm{padding-left:1.2em}li.l1{margin-left:1.4em}li.l2{margin-left:2.8em}
</style></head>
<body><div class="wrap">
<nav class="toc" aria-label="Contents"><details class="m"><summary>Contents</summary><ul><li><a href="#route-map">Route map</a></li>${toc.join('\n')}</ul></details><details class="d" open><summary>Contents</summary><ul><li><a href="#route-map">Route map</a></li>${toc.join('\n')}</ul></details></nav>
<main>
<h1>Killer Chat! Off Hours — the kidnapping arc, the infirmary and the recovery</h1>
<p class="lead">Every line of the arc’s text, compiled from the game source by <code>tools/kd_script.js</code>. Lines are quoted as written; [placeholders] stand for text the game fills in. Where Misaki’s line changes with closeness, all four tiers are shown (tier 0 = least close). ▸ marks a choice; greyed-out choices are struck through. Narration is in italics. Grey boxes say when a scene plays.</p>
<p class="lead">${RT.live ? 'Scheduler order and setting lists were read from the running game.' : 'Scheduler order and setting lists: the snapshot built into the script.'}</p>
<h2 id="route-map">Route map</h2><div class="route">${routeHtml}</div>
${body.join('\n')}
</main></div></body></html>
`;
  fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'docs', 'kidnapping_script.md'), mdText);
  fs.writeFileSync(path.join(ROOT, 'docs', 'kidnapping_script.html'), html);
  const quoted = all.filter(sc => placed.has(sc) || rest.includes(sc)).reduce((n, sc) => n + sc.items.reduce((m, it) => m + (it.alts ? it.alts.reduce((k, a) => k + (a.text.match(/\S+/g) || []).length, 0) : 0), 0), 0);
  console.log(`docs/kidnapping_script.md: ${(mdText.match(/\S+/g) || []).length} words, ${(Buffer.byteLength(mdText) / 1024).toFixed(0)} KB`);
  console.log(`docs/kidnapping_script.html: ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
  console.log(`quoted game text: ${quoted} words in ${placed.size + rest.length} scenes (${rest.length} unplaced, in the appendix); runtime lists: ${RT.live ? 'live' : 'snapshot'}`);
}
if (require.main === module && !process.argv[2]) main();
