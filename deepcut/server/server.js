// Deep Cut HTTP server: static files + JSON API. Zero runtime dependencies (node:http, node:sqlite).
//   PORT=8787 DEEPCUT_DB=./deepcut.db node server/server.js
import http from 'node:http';
import { readFileSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROMPTS } from '../shared/content/index.js';
import { compilePrompts } from '../shared/memory-store.js';
import { Engine, GameError, newId } from '../shared/game.js';
import { SqliteStore } from './db.js';
import { createValidator } from './llm.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

export async function createApp({ dbFile = ':memory:', validator, now } = {}) {
  const store = new SqliteStore(dbFile, compilePrompts(PROMPTS), { validator: validator === undefined ? await createValidator() : validator });
  const engine = new Engine(store, now ? { now } : {});
  const assets = loadAssets();
  const limiter = rateLimiter({ capacity: 40, perSecond: 4 });

  async function api(req, url, body) {
    const parts = url.pathname.split('/').filter(Boolean); // ['api', ...]
    const m = req.method;
    const pid = body.playerId || url.searchParams.get('playerId');
    if (m === 'GET' && parts[1] === 'health') return { ok: true, prompts: (await store.allPrompts()).length };
    if (m === 'GET' && parts[1] === 'config') return { mode: 'server', llm: !!store.validator };
    if (parts[1] === 'game') {
      if (m === 'POST' && parts.length === 2) return engine.startGame({ mode: body.mode, playerId: body.playerId, date: body.date, duelId: body.duelId });
      const gameId = parts[2];
      if (m === 'GET' && parts[3] === 'results') return engine.results(gameId, pid);
      if (parts[3] === 'round' && m === 'POST') {
        const idx = Number(parts[4]);
        if (parts[5] === 'start') return engine.startRound(gameId, pid, idx);
        if (parts[5] === 'answer') return engine.submit(gameId, pid, idx, body.answer, body.flags);
        if (parts[5] === 'end') return engine.endRound(gameId, pid, idx, body.reason, body.flags);
      }
    }
    if (parts[1] === 'duel' && m === 'GET') {
      const duel = await store.getDuel(parts[2]);
      if (!duel) throw new GameError('no_duel', 'Duel not found', 404);
      const mine = duel.games.find((g) => g.playerId === pid);
      return { id: duel.id, players: duel.games.length, mine: mine ? await engine.duelStatus(duel.id, mine.gameId) : null };
    }
    if (parts[1] === 'daily' && m === 'GET') return store.dailyStats(parts[2]);
    if (parts[1] === 'account') {
      if (m === 'POST' && parts.length === 2) {
        if (!pid) throw new GameError('bad_player', 'Missing player id');
        const code = syncCode();
        const id = newId(12);
        await store.createAccount(id, code, body.profile);
        await store.linkPlayer(pid, id);
        return { code };
      }
      const code = String(parts[2] || '').toUpperCase();
      const acct = await store.getAccountByCode(code);
      if (!acct) throw new GameError('no_account', 'No account with that code', 404);
      if (m === 'GET') {
        if (pid) await store.linkPlayer(pid, acct.id);
        return { code, profile: acct.profile, updatedAt: acct.updatedAt };
      }
      if (m === 'PUT') {
        const json = JSON.stringify(body.profile || {});
        if (json.length > 64000) throw new GameError('too_big', 'Profile too large', 413);
        await store.saveAccountProfile(code, body.profile || {});
        return { ok: true };
      }
    }
    throw new GameError('not_found', 'No such endpoint', 404);
  }

  async function handler(req, res) {
    try {
      // Prefix rather than resolve, so odd paths like "//" or "//evil.com" cannot throw or change host.
      const url = new URL('http://x' + (req.url.startsWith('/') ? req.url : '/' + req.url));
      if (url.pathname.startsWith('/api/')) {
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
        if (!limiter(ip)) return json(res, 429, { error: 'slow_down', message: 'Too many requests' });
        const body = req.method === 'GET' ? {} : await readJson(req);
        const out = await api(req, url, body);
        return json(res, 200, out);
      }
      return serveStatic(req, res, url, assets);
    } catch (err) {
      if (err instanceof GameError) return json(res, err.status, { error: err.code, message: err.message });
      console.error(err);
      return json(res, 500, { error: 'server', message: 'Something broke' });
    }
  }

  return { handler, store, engine };
}

// ---------------------------------------------------------------- helpers

const WORDS = ['AMBER', 'BASALT', 'COBALT', 'DRILL', 'EMBER', 'FLINT', 'GARNET', 'HEMATITE', 'IRON', 'JASPER', 'KILN', 'LAVA', 'MAGMA', 'NICKEL', 'ONYX', 'PUMICE', 'QUARTZ', 'RUBY', 'SHALE', 'TOPAZ', 'UMBER', 'VEIN', 'WOLFRAM', 'XENON', 'YTTRIUM', 'ZIRCON'];
const ANIMALS = ['MOLE', 'BADGER', 'WOMBAT', 'AARDVARK', 'GOPHER', 'MEERKAT', 'ARMADILLO', 'PANGOLIN', 'VOLE', 'WORM', 'OTTER', 'FERRET'];
function syncCode() {
  const r = (n) => globalThis.crypto.getRandomValues(new Uint32Array(1))[0] % n;
  return `${WORDS[r(WORDS.length)]}-${ANIMALS[r(ANIMALS.length)]}-${String(r(10000)).padStart(4, '0')}`;
}

function rateLimiter({ capacity, perSecond }) {
  const buckets = new Map();
  return (key) => {
    const t = Date.now();
    let b = buckets.get(key);
    if (!b) { b = { tokens: capacity, t }; buckets.set(key, b); }
    b.tokens = Math.min(capacity, b.tokens + ((t - b.t) / 1000) * perSecond);
    b.t = t;
    if (buckets.size > 50000) buckets.clear();
    if (b.tokens < 1) return false;
    b.tokens -= 1;
    return true;
  };
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > 70000) { reject(new GameError('too_big', 'Body too large', 413)); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')) || {}); } catch { reject(new GameError('bad_json', 'Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

const SECURITY_HEADERS = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-frame-options': 'SAMEORIGIN',
  'content-security-policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'none'",
};

function json(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...SECURITY_HEADERS });
  res.end(body);
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.ico': 'image/x-icon' };

/** Preload and pre-gzip public/ and the browser-safe shared modules (content packs excluded: answers stay server-side). */
function loadAssets() {
  const map = new Map();
  const add = (urlPath, file) => {
    const buf = readFileSync(file);
    const ext = path.extname(file);
    const etag = '"' + createHash('sha1').update(buf).digest('base64url').slice(0, 16) + '"';
    map.set(urlPath, { buf, gz: /text|javascript|json|svg/.test(TYPES[ext] || '') ? gzipSync(buf, { level: 9 }) : null, type: TYPES[ext] || 'application/octet-stream', etag });
  };
  const walk = (dir, prefix, skip = () => false) => {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      if (skip(full)) continue;
      if (statSync(full).isDirectory()) walk(full, prefix + name + '/', skip);
      else add(prefix + name, full);
    }
  };
  walk(path.join(root, 'public'), '/');
  walk(path.join(root, 'shared'), '/shared/', (f) => f.includes(path.sep + 'content'));
  return map;
}

function serveStatic(req, res, url, assets) {
  let p = url.pathname;
  if (p === '/' || !path.extname(p)) p = '/index.html'; // SPA routes like /duel/abc
  const a = assets.get(p);
  if (!a) {
    res.writeHead(404, { 'content-type': 'text/plain', ...SECURITY_HEADERS });
    return res.end('Not found');
  }
  const headers = {
    'content-type': a.type,
    etag: a.etag,
    'cache-control': p === '/index.html' || p === '/sw.js' ? 'no-cache' : 'public, max-age=3600, stale-while-revalidate=86400',
    vary: 'accept-encoding',
    ...SECURITY_HEADERS,
  };
  if (req.headers['if-none-match'] === a.etag) { res.writeHead(304, headers); return res.end(); }
  if (a.gz && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
    res.writeHead(200, { ...headers, 'content-encoding': 'gzip' });
    return res.end(req.method === 'HEAD' ? undefined : a.gz);
  }
  res.writeHead(200, headers);
  res.end(req.method === 'HEAD' ? undefined : a.buf);
}

// ---------------------------------------------------------------- main

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dbFile = process.env.DEEPCUT_DB || path.join(root, 'data', 'deepcut.db');
  if (dbFile !== ':memory:') mkdirSync(path.dirname(dbFile), { recursive: true });
  const { handler } = await createApp({ dbFile });
  const port = Number(process.env.PORT || 8787);
  http.createServer(handler).listen(port, () => console.log(`Deep Cut running on http://localhost:${port}`));
}
