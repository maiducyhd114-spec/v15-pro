import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { limit = 20 } = req.query;
    const rows = await prisma.subject.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      include: { tags: { include: { tag: true } } }
    });
    const items = rows.map(s => ({
      slug: s.slug, title: s.title, dept: s.dept, summary: s.summary,
      tags: s.tags.map(t => t.tag.name)
    }));
    return res.json({ items });
  }
  res.setHeader('Allow', ['GET']);
  res.status(405).end();
}
