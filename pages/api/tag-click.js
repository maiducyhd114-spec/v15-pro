import { limitByIp } from '../../lib/rate';
// pages/api/tag-click.js
export default async function handler(req, res) {
  if (!(await limitByIp(req, res))) return;
  if (req.method !== 'POST') return res.setHeader('Cache-Control','s-maxage=60, stale-while-revalidate=600');
  res.status(405).json({ ok: false, error: 'Method Not Allowed' });

  // Ở bản kết nối DB thật, bạn sẽ +1 count cho tag ở đây
  // const { tagName } = req.body;
  // await prisma.tagClickStat.upsert(...)

  return res.status(200).json({ ok: true });
}
