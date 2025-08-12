import { limitByIp } from '../../lib/rate';
// pages/api/hot-search.js
const G = globalThis;
if (!G.__hotStore) {
  G.__hotStore = {
    counts: new Map(),
    bump(term) {
      const key = String(term || '').trim().toLowerCase();
      if (!key) return;
      this.counts.set(key, (this.counts.get(key) || 0) + 1);
    },
    top(n = 10) {
      return Array.from(this.counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([name, count]) => ({ name, count }));
    }
  };
}

export default async function handler(req, res) {
  if (!(await limitByIp(req, res))) return;
  const store = G.__hotStore;
  if (req.method === 'GET') {
    const limit = Number(req.query.limit || 10);
    return res.setHeader('Cache-Control','s-maxage=60, stale-while-revalidate=600');
  res.json({ tags: store.top(limit) });
  }
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (body?.term) store.bump(body.term);
      if (Array.isArray(body?.tags)) body.tags.forEach(t => store.bump(t));
      return res.json({ ok: true });
    } catch {
      return res.status(400).json({ error: 'bad_request' });
    }
  }
  res.status(405).json({ error: 'method_not_allowed' });
}
