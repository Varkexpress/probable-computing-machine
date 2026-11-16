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
  [/^x\.n(ame)?$|^x\.who$|^t\.n$/, '[list name]'],
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
  if (ors.length > 1) return ors.map(o => condText(o, scope) || 'always').join(' or ');
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
        branch(ctx, 'If ' + c, d, () => walk(ctx, st.consequent, d + 1));
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
      branch(ctx, 'If ' + c, d, () => walk(ctx, n.consequent, d + 1));
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
      if (tc) branch(ctx, 'If ' + c, d, () => walk(ctx, n.consequent, d + 1));
      if (ta) branch(ctx, tc ? otherwise(c) : 'Unless ' + c, d, () => walk(ctx, n.alternate, d + 1));
      return;
    }
    case 'LogicalExpression': {
      if (n.operator === '&&' && hasText(ctx, n.right) && !hasText(ctx, n.left)) {
        branch(ctx, 'If ' + condText(src(ctx, n.left), ctx.scope), d, () => walk(ctx, n.right, d + 1)); return;
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
function walkCall(ctx, n, d) {
  const nm = calleeName(n), A = n.arguments;
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
