import { limitByIp } from '../../lib/rate';
// pages/api/trending-tags.js
export default function handler(req, res) {
  const limit = Number(req.query.limit || 10);

  const tags = [
    { tag: 'tsa', count: 5 },
    { tag: 'hsa', count: 3 },
    { tag: 'cấp 3', count: 1 },
    { tag: 'giải tích', count: 12 },
    { tag: 'đại cương', count: 7 },
    { tag: 'toán-IT', count: 2 },
  ].slice(0, limit);

  res.setHeader('Cache-Control','s-maxage=60, stale-while-revalidate=600');
  res.status(200).json({ tags });
}
