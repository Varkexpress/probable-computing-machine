// Client data layer. Talks to the server API when one is reachable; otherwise runs the very same
// Engine in the browser against a localStorage-backed store (static hosting / offline play).

const LS = {
  get(k, d = null) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode / quota */ } },
};
export { LS };

export function playerId() {
  let id = LS.get('dc_player');
  if (!id) {
    const b = new Uint8Array(12);
    crypto.getRandomValues(b);
    id = 'p_' + [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
    LS.set('dc_player', id);
  }
  return id;
}

class ApiError extends Error {
  constructor(code, message, status) { super(message); this.code = code; this.status = status; }
}

// ------------------------------------------------------------------ server adapter
function serverApi() {
  const pid = playerId();
  async function call(method, path, body) {
    const res = await fetch('api/' + path + (method === 'GET' ? (path.includes('?') ? '&' : '?') + 'playerId=' + encodeURIComponent(pid) : ''), {
      method,
      headers: body ? { 'content-type': 'application/json' } : {},
      body: body ? JSON.stringify({ ...body, playerId: pid }) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new ApiError(data.error || 'http', data.message || 'Network error', res.status);
    return data;
  }
  return {
    mode: 'server',
    startGame: (o) => call('POST', 'game', o),
    startRound: (g, i) => call('POST', `game/${g}/round/${i}/start`, {}),
    submit: (g, i, answer, flags) => call('POST', `game/${g}/round/${i}/answer`, { answer, flags }),
    endRound: (g, i, reason, flags) => call('POST', `game/${g}/round/${i}/end`, { reason, flags }),
    results: (g) => call('GET', `game/${g}/results`),
    duelInfo: (id) => call('GET', `duel/${id}`),
    duelLink: (res) => `${location.origin}${location.pathname}?duel=${res.game.duelId}`,
    createAccount: (profile) => call('POST', 'account', { profile }),
    getAccount: (code) => call('GET', `account/${encodeURIComponent(code)}`),
    saveAccount: (code, profile) => call('PUT', `account/${encodeURIComponent(code)}`, { profile }),
  };
}

// ------------------------------------------------------------------ offline adapter
async function offlineApi() {
  const [{ Engine, GameError }, { MemoryStore, compilePrompts }, { PROMPTS }] = await Promise.all([
    import('./shared/game.js'), import('./shared/memory-store.js'), import('./shared/content/index.js'),
  ]);
  const store = new MemoryStore(compilePrompts(PROMPTS));
  store.restore(LS.get('dc_offline'));
  // Keep only recent games so localStorage stays small.
  const save = () => {
    const d = store.snapshot();
    const ids = Object.keys(d.games);
    if (ids.length > 60) {
      ids.sort((a, b) => d.games[a].createdAt - d.games[b].createdAt).slice(0, ids.length - 60).forEach((id) => delete d.games[id]);
    }
    LS.set('dc_offline', d);
  };
  const engine = new Engine(store);
  const pid = playerId();
  const wrap = (fn) => async (...a) => {
    try { const r = await fn(...a); save(); return JSON.parse(JSON.stringify(r)); } catch (e) {
      if (e instanceof GameError) throw new ApiError(e.code, e.message, e.status);
      throw e;
    }
  };

  // Offline duels travel inside the link: prompts + the creator's scored answers.
  async function importDuel(code) {
    const data = JSON.parse(decodeURIComponent(escape(atob(code.replace(/-/g, '+').replace(/_/g, '/')))));
    const duelId = 'o' + data.i;
    if (await store.getDuel(duelId)) return duelId;
    const ghost = {
      id: 'ghost-' + data.i, mode: 'duel', playerId: 'friend', duelId, promptIds: data.p, total: 0, createdAt: Date.now(), finishedAt: Date.now(), flags: [], suspicious: false,
      rounds: data.a.map((r, idx) => ({ idx, promptId: data.p[idx], status: 'done', answerId: r[0], points: r[1], tier: r[2], display: r[3], attempts: [], flags: [] })),
    };
    ghost.total = ghost.rounds.reduce((s, r) => s + (r.points || 0), 0);
    await store.createGame(ghost);
    await store.createDuel({ id: duelId, seed: data.i, promptIds: data.p, creatorGameId: ghost.id, games: [{ gameId: ghost.id, playerId: 'friend' }], createdAt: Date.now() });
    save();
    return duelId;
  }

  return {
    mode: 'offline',
    startGame: wrap(async (o) => {
      if (o.mode === 'duel' && o.duelId && o.duelId.startsWith('off.')) o = { ...o, duelId: await importDuel(o.duelId.slice(4)) };
      return engine.startGame({ ...o, playerId: pid });
    }),
    startRound: wrap((g, i) => engine.startRound(g, pid, i)),
    submit: wrap((g, i, answer, flags) => engine.submit(g, pid, i, answer, flags)),
    endRound: wrap((g, i, reason, flags) => engine.endRound(g, pid, i, reason, flags)),
    results: wrap((g) => engine.results(g, pid)),
    duelInfo: async () => null,
    duelLink: (res) => {
      const game = store.data.games[res.game.id];
      const payload = { i: res.game.duelId, p: game.promptIds, a: game.rounds.map((r) => [r.answerId ?? null, r.points || 0, r.tier || 'miss', r.display || null]) };
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      return `${location.origin}${location.pathname}?duel=off.${code}`;
    },
    createAccount: async () => { throw new ApiError('offline', 'Sync needs the online server'); },
    getAccount: async () => { throw new ApiError('offline', 'Sync needs the online server'); },
    saveAccount: async () => ({ ok: false }),
  };
}

export async function connect() {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 2500);
    const res = await fetch('api/config', { signal: ctl.signal });
    clearTimeout(t);
    if (res.ok && (await res.json()).mode === 'server') return serverApi();
  } catch { /* no server */ }
  return offlineApi();
}
