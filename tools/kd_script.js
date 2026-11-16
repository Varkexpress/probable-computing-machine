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
for (let n = 27; n <= 61; n++) { const f = `kc${n}.js`, p = path.join(ROOT, 'src', f); if (fs.existsSync(p)) SRC[f] = fs.readFileSync(p, 'utf8'); }

/* ------------------------------------------------------------------ text helpers */
const SPEAKER = { '': '', hitmeuppp: 'Misaki', K9: 'V', Angelic: 'Angel', 'ronin.beaufort': 'Ronin', AN: 'Angel', RN: 'Ronin', B: '[boss]', boss: '[boss]',
  P: '[the doctor]', N: '[name]', me: 'Misaki / V', who: 'Misaki / V', w: '[speaker]', ME: 'Misaki / V', MS: 'Misaki', VV: 'V', DOC: 'The doctor' };
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
  for (const [re, v] of PH) if (re.test(src)) return v;
  return '[' + (src.length > 48 ? src.slice(0, 45) + '…' : src) + ']';
}
const clean = s => String(s).replace(/<br\s*\/?>/gi, ' ').replace(/<\/?(b|i|em|strong|span|div|small|p)[^>]*>/gi, '').replace(/[ \t]+/g, ' ').trim();

/* ------------------------------------------------------------------ condition notes */
const ONCE_OK = /^(kdTold|movedIn|kdBook|kdCast|kdKeep|kdStab|kdInterrupted|kdBye|kdKit|kdPhotos|kdCupTook|kdRes|kdHas|kdLoops|kdRonCall|lastChance|married|finalRuin|called|schedule|informant|kdAlert|kdBldg)$/;
const COND = [
  [/^(S\.pov!==?'v'|kdMe\(\)|S\.pov==='m'|isMe|mine|w59Me\(\)==='m'|k58M\(\)|m|me|mm|isM\(\)&&S\.pov!=='v'|mP\(\))$/, 'Misaki POV'],
  [/^(S\.pov===?'v'|!kdMe\(\)|S\.pov!=='m'|w59Me\(\)==='v'|!k58M\(\)|!m|isV\(\)|vP\(\))$/, 'V POV'],
  [/^S\.pov==='both'$/, 'both POVs'],
  [/^(kdSA\(\)|k61SA\(\))$/, 'full-story setting'], [/^(!kdSA\(\)|kdOff\(\)|!k61SA\(\))$/, 'injuries-only setting'],
  [/^(kdPost\(\)|k56Post\(\)|k58Post\(\))$/, 'after discharge from the infirmary'],
  [/^(kdMed\(\)|k61Med\(\))$/, 'during the infirmary stay'],
  [/^(kdMedM\(\)|kdIn\(\)|kd60In\(\)|k61M\(\))$/, 'Misaki in the infirmary'],
  [/^(kdWR\(\)|k61WR\(\))$/, 'worst route (severity 8+, still deluded)'],
  [/^(k61Worst\(\)|kdWorstOf\(\))$/, 'worst stay (severity 6+)'],
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
  [/^S\.f\.(\w+)$/, (m) => `flag ${m[1]} set`], [/^!S\.f\.(\w+)$/, (m) => ONCE_OK.test(m[1]) ? `${m[1]} not set` : ''],
  [/^!S\.done\.\w+$|^!\(S\.talks&&.*\)$|^!S\.f\[id\]$|^!w59F\(\)\.\w+$|^!S\.seen\.\w+$/, ''],
  [/^S\.f\.(\w+)===?('?[\w-]+'?)$/, (m) => `${m[1]} = ${m[2]}`], [/^S\.f\.(\w+)!==?undefined$/, (m) => `${m[1]} decided`],
  [/^S\.f\.(\w+)===undefined$/, (m) => `${m[1]} not yet decided`],
  [/^\(?S\.f\.(\w+)\|?\|?0?\)?>=(\d+)$/, (m) => `${m[1]} ≥ ${m[2]}`],
  [/^\(?S\.kd\.deny\|?\|?0?\)?>=(\d+)$/, (m) => `denial ${m[1]}+`],
  [/^S\.comp<(\d+)$/, (m) => `composure under ${m[1]}`], [/^S\.comp>=(\d+)$/, (m) => `composure ${m[1]}+`], [/^S\.comp<=(\d+)$/, (m) => `composure ${m[1]} or less`],
  [/^(S\.seen\.|k56Seen\('|w59Seen\(')(\w+)'?\)?$/, (m) => `after ${m[2]}`],
  [/^S\.rom==='(\w)'$/, (m) => `romance: Misaki + ${{ r: 'Ronin', a: 'Angel', v: 'V' }[m[1]] || m[1]}`],
  [/^kdSpiralSecret\(\)$/, 'the secret is caught in time (2+ clues and a goodbye left for V)'],
  [/^typeof\w+(!==|===)'(function|undefined)'$|^S\.kd(\.med)?$|^S$|^S\.f$|^m$|^S\.kd\.med\.br3$|^S\.kd\.t0$|^S\.list$|^dlg$|^!dlg$/, ''],
  [/^!S\.kd\.med$/, 'out of the infirmary'],
  [/^S\.kd\.med\.br3==='(\w+)'$|^m\.br3==='(\w+)'$/, (m) => `in the bright turn she chose to sit: ${m[1] || m[2]}`],
  [/^ok$|^r\.ok$|^won$/, 'success'], [/^!ok$|^!r\.ok$/, 'failure'],
];
function condPart(src, scope) {
  src = src.replace(/\s+/g, '').replace(/^\((.*)\)$/, '$1');
  if (scope && /^!?[A-Za-z_$][\w$]*$/.test(src)) {
    const neg = src[0] === '!', id = neg ? src.slice(1) : src;
    if (scope[id] && scope[id] !== src && scope[id].length < 160) {
      const inner = condText(scope[id], null);
      if (neg && inner === 'Misaki POV') return 'V POV';
      if (neg && inner === 'V POV') return 'Misaki POV';
      return neg ? 'not (' + inner + ')' : inner;
    }
  }
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
  'hint', 'title', 'smokeName', 'backLabel', 'name', 'walk', 'back', 'zones', 'floor', 'wall', 'arrive', 'rounds', 'w', 'h', 'x', 'y', 'n', 'd', 'band',
  'img', 'sfx', 'font', 'size', 'tag', 'pin', 'type', 'kind', 'org', 'st', 'gone', 'warm', 'aff', 'edge', 'heart', 'comp', 'energy', 'funds', 'calm', 'heat']);
const NOT_SCENE_CALLEES = new Set(['ask', 'say', 'cut', 'warm', 'phQueue', 'kdTell', 'go', 'toRoom', 'apply', 'toast', 'fr', 'frT', 'save', 'tdMap', 'panel',
  'showCG', 'journal', 'jot', 'addNote', 'note', 'calm', 'pk', 'MV', 'byT', 'D', 'cutBg', 'stealth', 'simon', 'lockpick', 'require', 'setTimeout', 'chat',
  'mVoice', 'k56Mark', 'k57Mark', 'k58Set', 'kdDeny', 'console', 'push', 'includes', 'find', 'filter', 'map', 'some', 'every', 'indexOf', 'replace']);
const TEXT_CALLS = { MV: 'tier', byT: 'tier', pk: 'one of', D: 'dark' };

function isProse(s) {
  if (typeof s !== 'string') return false;
  const t = s.trim(); if (!t) return false;
  if (/^[#.]|=>|function\b|\bpx\b|rgba?\(|^\w+_\w+$|^[a-z]+[A-Z]\w*$|^https?:/.test(t)) return false;
  if (/^[a-z0-9_]+$/.test(t)) return false;
  return /\s/.test(t) || /[.!?…”)]$/.test(t) || /^[“"(\[]/.test(t);
}

function mkCtx(file, code) { return { file, code, scenes: [], stack: [], scope: {} }; }
function src(ctx, n) { return ctx.code.slice(n.start, n.end); }
function lineOf(ctx, n) { let l = 1; for (let i = 0; i < n.start; i++) if (ctx.code.charCodeAt(i) === 10) l++; return l; }
function cur(ctx) { return ctx.stack[ctx.stack.length - 1]; }
function emit(ctx, item) { const s = cur(ctx); if (s) s.items.push(item); }
function pushScene(ctx, sc) { sc.items = []; if (sc.cond === undefined) sc.cond = sc.when ? condText(sc.when, ctx.scope) : ''; sc.file = ctx.file; ctx.scenes.push(sc); ctx.stack.push(sc); }
function popScene(ctx) {
  const sc = cur(ctx);
  if (sc && sc.def) for (const k of Object.keys(sc.def)) { const f = sc.def[k]; if (!f.used) { f.used = 1; walk(ctx, f.node, 0); } }
  ctx.stack.pop();
}
function findDef(ctx, name) { for (let i = ctx.stack.length - 1; i >= 0; i--) { const sc = ctx.stack[i]; if (sc.def && sc.def[name]) return sc.def[name]; } return null; }

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
  if (n.type === 'Literal') return typeof n.value === 'string' && n.value.length <= 26 && (n.value in SPEAKER || !/[.!?,…“”]/.test(n.value)) && !/^\[|^\d/.test(n.value);
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
          if (a && a.some(x => isProse(x.text))) { emit(ctx, { type: TX_CONTACT ? 'line' : 'loose', who: TX_CONTACT || '', alts: a.map(x => ({ label: x.label, text: clean(x.text) })), d, msg: !!TX_CONTACT }); continue; }
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
    case 'TemplateLiteral': { const a = alts(ctx, n); if (a && isProse(a[0].text) && a[0].text.length > 14) emit(ctx, { type: 'loose', alts: a.map(x => ({ label: x.label, text: clean(x.text) })), d }); return; }
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
        dis: dis ? (dis.value.type === 'Literal' && dis.value.value === true ? 'greyed out' : 'greyed out when ' + condText(src(ctx, dis.value), ctx.scope)) : '', d });
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
const mdEsc = t => String(t).replace(/\*/g, '\\*').replace(/^([#>+-])/, '\\$1').replace(/_/g, '\\_');
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
      case 'key': P('`' + it.text + '`'); break;
      case 'note': P('<small>' + mdEsc(it.text) + '</small>'); break;
      case 'loose': P((it.key ? '`' + it.key + '` ' : '') + body('', t => mdEsc(t))); break;
    }
  }
  return out.join('\n').replace(/(\n>?\s*){3,}/g, '\n\n');
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
  'kc46.js', 'kc47.js', 'kc48.js', 'kc49.js', 'kc50.js', 'kc51.js', 'kc52.js', 'kc53.js', 'kc54.js', 'kc55.js', 'kc56.js', 'kc58.js', 'kc59.js', 'kc60.js', 'kc61.js'];
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
  'kc34.js:tx_g_bet', 'kc34.js:tx_g_knife', 'kc34.js:tx_g_stars', 'kc34.js:sideHub', 'kc34.js:gMarket', 'kc47.js:codeHook', 'kc49.js:codeHook', 'kc28.js:kdNoLeave']);

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
  'kc61.js:KD61_VW': 'V POV, worst stay: one scene a day.',
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
const SECTIONS = [
  { title: '1. Before: the war and the warnings', intro: 'Only the scenes that lead straight into the van. The wider war (eight hunts, one per organisation) is left out.', subs: [
    S_('The man from the canal, the man in grey, the circling', 'Normal phase.', ['kc28.js:kd_omen', 'kc56.js:k56_grey', 'kc59.js:w59_m_circle', 'kc59.js:w59_v_circle', 'kc59.js:W59G']),
  ] },
  { title: '2. The abduction and captivity', intro: 'The kidnapping happens the night after she pays the rent for the second time. Which POV you play decides which half you see; in the joint POV both run.', subs: [
    S_('2.1 Misaki: the van', '', ['index.html:takenM']),
    S_('2.2 Misaki: the interrogation', 'Every session runs the original questions, the chair, the question about before nine, and the dose. Later sessions are shorter.', ['index.html:interrogate', 'kc27.js:interrogate', 'kc27.js:kdBlankQ', 'kc28.js:kdBlankQ', 'kc28.js:kdHoldOn', 'kc27.js:kdShort', 'kc27.js:kdDose', 'kc28.js:KD_INJ', 'kc28.js:KD_INJ_OFF', 'kc27.js:KD_SAID', 'kc27.js:kdTheyCome']),
    S_('2.3 Misaki: the cell', 'Every action that is not a ready escape uses up the clock; at six they come for another session.', ['index.html:ROOMS', 'kc27.js:code@65', 'kc27.js:spot: Your arm', 'kc27.js:spot: The radio down the hall', 'kc28.js:code@36', 'kc30.js:spot: A cup of water', 'kc30.js:code@15', 'kc59.js:spot: Their faces']),
    S_('2.4 Misaki: escape, failure, the last chance, the late route', '', ['index.html:escapeRun', 'kc28.js:kdDock', 'kc30.js:kdDock', 'index.html:escaped', 'index.html:failedEscape#1', 'index.html:vRescueCut', 'index.html:failedEscape#2', 'index.html:interrogateLite', 'index.html:lateM']),
    S_('2.5 V: the search', 'V POV. Each night she is missing raises the rescue’s difficulty; from two nights, one more guard; at four nights, the late route.', ['index.html:takenV', 'index.html:hub', 'index.html:informant', 'kc27.js:kdScout', 'kc27.js:kd_tape', 'kc30.js:kd_vphoto', 'kc30.js:kd_vfloor', 'kc33.js:kd_maria', 'kc56.js:k56_plate', 'kc59.js:w59_v_halecall', 'index.html:two_cups', 'index.html:gl_taken', 'index.html:chatLog', 'index.html:sleepBase', 'index.html:lateV']),
    S_('2.6 V: the rescue', '', ['index.html:vRescue', 'kc28.js:kdCarry', 'index.html:rescued']),
    S_('2.7 Out', 'Every way out ends here.', ['index.html:after', 'index.html:kdTell', 'kc27.js:stealth']),
    S_('2.8 The list and the finale', 'After the infirmary, through the after-phase: the men who held her, one at a time; then the boss.', ['index.html:theList', 'index.html:listTarget', 'kc59.js:W59REC', 'index.html:finale', 'index.html:finalM', 'index.html:finalV', 'kc56.js:k56_why', 'kc56.js:k56BossScene']),
  ] },
  { title: '3. The infirmary', intro: 'V’s infirmary on sublevel two, behind a door marked LAUNDRY. In Misaki’s POV the room is drawn as the cell until her clarity reaches 2, and the spots carry her reading of them. How long the delusion lasts depends on how bad the captivity was (severity: see the route map).', subs: [
    S_('3.1 Waking, and the ordinary stay (Misaki)', 'All stays. A mild stay (severity under 4) clears by the first morning.', ['kc28.js:kdMedStart', 'kc28.js:KD_CHART', 'kc28.js:code@83', 'kc28.js:spot: *', 'kc32.js:spot: *', 'kc33.js:spot: *', 'kc28.js:kdMedRun', 'kc28.js:openPhone', 'kc28.js:kdBacklog', 'kc28.js:kdMedMorning', 'kc48.js:KD_NIGHT', 'kc48.js:KD_NIGHT.push(…)', 'kc48.js:spot: *', 'kc48.js:KD_DOOR', 'kc48.js:kdVisitor', 'kc60.js:spot: *', 'kc61.js:spot: *', 'kc61.js:KD61_MC', 'kc61.js:k61Tubs']),
    S_('3.2 The infirmary phone threads', '', ['kc28.js:tx_kd_help', 'kc28.js:tx_kd_mdoor', 'kc28.js:tx_kd_selfie', 'kc28.js:tx_kd_rvis', 'kc28.js:tx_kd_adoc', 'kc28.js:tx_kd_rhand']),
    S_('3.3 V’s side of the stay', 'V POV.', ['kc28.js:sideHub', 'kc28.js:kdSit', 'kc48.js:kdSit', 'kc60.js:sideHub#2', 'kc60.js:A60COR', 'kc61.js:sideHub', 'kc61.js:KD61_THINGS', 'kc61.js:KD61_FILE', 'kc61.js:KD61_ASK', 'kc61.js:KD61_VC']),
    S_('3.4 The extended delusion', 'Severity 4+ gives one extra day in the cell, 6+ two. On those mornings the room is a cell again, whatever she worked out the day before.', ['kc46.js:KD_STILL_M', 'kc46.js:KD_STILL_V', 'kc46.js:kdMedMorning#1', 'kc46.js:code@47', 'kc46.js:kdMedMorning#2', 'kc61.js:KD61_MX', 'kc61.js:KD61_VX']),
    S_('3.5 The worst route: Friday', 'Severity 6+ (worst stays). At 8+ the stay never clears by itself (the code fridaycomes starts here).', ['kc49.js:hub', 'kc49.js:KD_BYE', 'kc49.js:kdGoodbye', 'kc49.js:kdMedMorning', 'kc49.js:kd_delivered']),
    S_('3.6 The worst route: the room, her mind, the clues', 'Severity 8+, Misaki POV, still deluded.', ['kc50.js:KD_DESC', 'kc51.js:KD_MIND', 'kc52.js:code@47', 'kc52.js:KD_UNCANNY', 'kc50.js:KD_SPIRAL_WARN', 'kc60.js:hub', 'kc61.js:KD61_MW', 'kc61.js:KD61_VW', 'kc50.js:KD_CLUES', 'kc50.js:code@17', 'kc50.js:kdLogicOut']),
    S_('3.7 The worst route: the bright turn, the spiral, lucid too late, the interrupted secret', 'Composure 3 or less at bedtime. The bright turn plays first, then the spiral the same night.', ['kc52.js:kdBright', 'kc52.js:KD_HUM', 'kc52.js:KD_LEFT', 'kc52.js:KD_SHAPE', 'kc50.js:kdSpiral', 'kc50.js:kdInterrupted', 'kc50.js:kd_interrupted_after']),
    S_('3.8 The shatter', 'How the cell drawing breaks away when clarity returns, by route; and the pieces that don’t go.', ['kc53.js:KD_SHATTER_LINES', 'kc53.js:kd_shards']),
    S_('3.9 Full story only: the examination, the photographs, the denial, the hidden route', 'These scenes exist only in the full-story setting. They play after discharge, in the aftermath order. What happened is never named. The honest option is always on the menu and always greyed out, except once (kd_last).', ['@SA']),
    S_('3.10 Injuries only: the recovery', 'These exist only in the injuries-only setting. No doctor, no denial.', ['kc36.js:code@14', 'kc33.js:code@85', 'kc36.js:code@31', 'kc36.js:spot: The lightbox', 'kc36.js:spot: Walk the corridor', '@REC', 'kc36.js:sideHub']),
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
