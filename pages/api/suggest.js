import { limitByIp } from '../../lib/rate';
import prisma from '../../lib/prisma';
const strip = (s='') => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default async function handler(req, res) {
  if (!(await limitByIp(req, res))) return;
  const q = String(req.query.q || '').trim();
  if (!q) return res.setHeader('Cache-Control','s-maxage=60, stale-while-revalidate=600');
  res.json({ suggestions: [] });

  const base = await prisma.subject.findMany({
    where: { status: 'PUBLISHED' },
    include: { tags:{ include:{ tag:true } }, resources:true },
    orderBy: { createdAt: 'desc' },
    take: 300
  });

  const t = strip(q);
  const seen = new Set(), out = [];
  const put = (o) => { const k = [o.type,o.text,o.slug||o.href||''].join('|'); if(!seen.has(k)){seen.add(k); out.push(o);} };

  for (const s of base) {
    if (strip(s.title).includes(t) || strip(s.slug).includes(t)) put({ type:'Môn học', text:s.title, slug:s.slug });
    for (const tg of s.tags) if (strip(tg.tag.name).includes(t)) put({ type:'Tag', text:tg.tag.name, href:`/tags/${encodeURIComponent(tg.tag.name)}` });
    for (const r of s.resources) if (strip(r.label).includes(t) || strip(r.type).includes(t)) put({ type:r.type, text:r.label, slug:s.slug });
  }

  res.json({ suggestions: out.slice(0, 10) });
}
