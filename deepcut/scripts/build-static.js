// Builds dist/: a fully static, serverless copy of the game (GitHub Pages, Netlify, S3, artifact hosts).
// The browser runs the engine itself with localStorage stats. Note: answer lists ship to the client
// in this mode, so use the Node server when ranks and anti-cheat matter.
import { cpSync, rmSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(out);
cpSync(path.join(root, 'public'), out, { recursive: true });
cpSync(path.join(root, 'shared'), path.join(out, 'shared'), { recursive: true });
console.log('Static build written to', out);
