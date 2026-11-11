import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createApp } from '../server/server.js';
import { localDate } from '../shared/daily.js';

async function boot() {
  const app = await createApp({ dbFile: ':memory:', validator: null });
  const server = http.createServer(app.handler);
  await new Promise((r) => server.listen(0, r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = async (method, path, body) => {
    const res = await fetch(base + path, { method, headers: { 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
    return { status: res.status, body: await res.json().catch(() => null), headers: res.headers };
  };
  return { app, server, base, call };
}

test('HTTP: static assets, content stays private, full daily game', async () => {
  const { server, base, call, app } = await boot();
  try {
    const page = await fetch(base + '/', { headers: { 'accept-encoding': 'gzip' } });
    assert.equal(page.status, 200);
    assert.match(page.headers.get('content-type'), /html/);
    assert.ok(page.headers.get('etag'));
    assert.equal((await fetch(base + '/shared/scoring.js')).status, 200);
    assert.equal((await fetch(base + '/shared/content/pack-a.js')).status, 404, 'answer packs must not be served');

    // Odd request paths must not crash the process (regression: "//" used to throw outside try/catch).
    for (const odd of ['//', '//evil.com/x', '/%zz']) {
      const r = await new Promise((resolve) => http.get({ host: '127.0.0.1', port: server.address().port, path: odd }, resolve));
      assert.ok(r.statusCode < 500, `${odd} -> ${r.statusCode}`);
      r.resume();
    }
    const cfg = await call('GET', '/api/config');
    assert.equal(cfg.body.mode, 'server');

    const pid = 'p_test';
    const date = localDate();
    const g = await call('POST', '/api/game', { mode: 'daily', playerId: pid, date });
    assert.equal(g.status, 200);
    assert.equal(g.body.promptIds, undefined, 'prompt ids are not leaked');

    for (let i = 0; i < 7; i++) {
      const r = await call('POST', `/api/game/${g.body.id}/round/${i}/start`, { playerId: pid });
      assert.equal(r.status, 200);
      assert.ok(r.body.prompt.text);
      assert.ok(r.body.remainingMs > 20000);
      // Use a deep-cut answer straight from the database so every prompt gets a valid one.
      const prompt = await app.store.getPrompt(r.body.prompt.id);
      const deep = prompt.answers.find((a) => a.band === 4) || prompt.answers[0];
      await new Promise((res) => setTimeout(res, 950)); // stay above the too-fast threshold
      const wrong = await call('POST', `/api/game/${g.body.id}/round/${i}/answer`, { playerId: pid, answer: 'qqqzzzxxx' });
      assert.equal(wrong.body.valid, false);
      const ok = await call('POST', `/api/game/${g.body.id}/round/${i}/answer`, { playerId: pid, answer: deep.display.toLowerCase() });
      assert.equal(ok.body.valid, true, `answer ${deep.display} for ${prompt.id}`);
      assert.ok(ok.body.round.points > 0);
    }
    const res = await call('GET', `/api/game/${g.body.id}/results?playerId=${pid}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.reveal.length, 7);
    assert.ok(res.body.game.total > 0);
    assert.equal(res.body.game.suspicious, false);
    assert.equal(res.body.players, 1);

    // Someone else cannot read or play this game.
    const other = await call('POST', `/api/game/${g.body.id}/round/0/start`, { playerId: 'intruder' });
    assert.equal(other.status, 403);

    // Accounts / sync codes
    const acct = await call('POST', '/api/account', { playerId: pid, profile: { streak: 3 } });
    assert.match(acct.body.code, /^[A-Z]+-[A-Z]+-\d{4}$/);
    const loaded = await call('GET', `/api/account/${acct.body.code}?playerId=other`);
    assert.equal(loaded.body.profile.streak, 3);
  } finally {
    server.close();
  }
}, { timeout: 30000 });
