import { limitByIp } from '../../lib/rate';
import prisma from '../../lib/prisma';

// Bỏ dấu an toàn cho mọi Node
const strip = (s='') => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default async function handler(req, res) {
  if (!(await limitByIp(req, res))) return;
  try {
    const { q = '', dept = '', type = '', tag = '', page = 1, pageSize = 10 } = req.query;
    const term = String(q).trim();
    const skip = (Number(page) - 1) * Number(pageSize);

    const baseAnd = [
      dept ? { dept } : {},
      tag  ? { tags: { some: { tag: { name: tag } } } } : {},
      type ? { resources: { some: { type } } } : {},
      { status: 'PUBLISHED' }
    ];

    // Truy vấn có dấu (KHÔNG dùng mode)
    const where = {
      AND: [
        term ? { OR: [
          { title:   { contains: term } },
          { summary: { contains: term } },
          { slug:    { contains: term } },
          { tags: { some: { tag: { name: { contains: term } } } } },
          { resources: { some: { OR: [
            { label: { contains: term } },
            { type:  { contains: term } }
          ]}}}
        ] } : {},
        ...baseAnd
      ]
    };

    const [agg, rows] = await Promise.all([
      prisma.subject.aggregate({ where, _count: { _all: true } }),
      prisma.subject.findMany({
        where,
        include: { tags: { include: { tag: true } }, resources: true },
        orderBy: { createdAt: 'desc' }
      })
    ]);

    let dbTotal = typeof agg._count === 'number' ? agg._count : (agg._count?._all ?? 0);
    let pool = rows;

    // Fallback không dấu + hợp nhất
    if (term) {
      const lim = 300;
      const extra = await prisma.subject.findMany({
        where: { AND: baseAnd },
        include: { tags: { include: { tag: true } }, resources: true },
        orderBy: { createdAt: 'desc' },
        take: lim
      });
      const t = strip(term);
      const accentFree = extra.filter(s => {
        const hay = [
          s.title, s.summary, s.slug,
          ...s.tags.map(t=>t.tag.name),
          ...s.resources.map(r=>r.label),
          ...s.resources.map(r=>r.type)
        ].join(' | ');
        return strip(hay).includes(t);
      });
      const map = new Map();
      for (const r of [...rows, ...accentFree]) map.set(r.slug, r);
      pool = Array.from(map.values());
      dbTotal = pool.length;
    }

    const total = dbTotal;
    const pageItems = pool
      .slice(skip, skip + Number(pageSize))
      .map(s => ({
        slug: s.slug,
        title: s.title,
        dept: s.dept,
        summary: s.summary,
        tags: s.tags.map(t => t.tag.name)
      }));

    res.setHeader('Cache-Control','s-maxage=60, stale-while-revalidate=600');
  res.json({ items: pageItems, total });
  } catch (e) {
    console.error('SEARCH_ERROR', e);
    res.status(200).json({ items: [], total: 0, error: 'search_failed' });
  }
}
