import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { slug } = req.query;
  if (req.method === 'GET') {
    const s = await prisma.subject.findUnique({
      where: { slug },
      include: {
        resources: true,
        tags: { include: { tag: true } }
      }
    });
    if (!s || s.status !== 'PUBLISHED') return res.json({ item: null });
    return res.json({
      item: {
        slug: s.slug,
        title: s.title,
        dept: s.dept,
        summary: s.summary,
        tags: s.tags.map(t => t.tag.name),
        resources: s.resources,
        date: (s.createdAt? new Date(s.createdAt).toLocaleDateString('vi-VN') : '')
      }
    });
  }
  res.setHeader('Allow', ['GET']);
  res.status(405).end();
}
