// Validates every content pack: `node scripts/check-content.js [file...]`
import { compilePack } from '../shared/pack.js';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const files = process.argv.slice(2);
let prompts;
if (files.length) {
  prompts = [];
  for (const f of files) prompts.push(...(await import(pathToFileURL(path.resolve(f)).href)).default);
} else {
  prompts = (await import('../shared/content/index.js')).PROMPTS;
}
const { prompts: compiled, errors } = compilePack(prompts);
for (const p of compiled) {
  const byBand = [1, 2, 3, 4, 5].map((b) => p.answers.filter((a) => a.band === b).length);
  console.log(`${p.id.padEnd(22)} ${String(p.answers.length).padStart(4)} answers  bands ${byBand.join('/')}`);
}
console.log(`\n${compiled.length} prompts, ${compiled.reduce((s, p) => s + p.answers.length, 0)} answers`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n` + errors.join('\n'));
  process.exit(1);
}
console.log('OK');
