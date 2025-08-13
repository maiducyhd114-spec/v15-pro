export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  const key = process.env.HEALTH_KEY;
  const provided = req.headers['x-health-key']; // chỉ nhận qua header

  if (!key || provided !== key) {
    res.status(404).end();
    return;
  }

  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const [subjects, resources] = await Promise.all([
      prisma.subject.count(),
      prisma.resource.count(),
    ]);
    res.status(200).json({ ok: true, subjects, resources, node: process.version });
  } catch (e) {
    res
      .status(500)
      .json({ ok: false, name: e.name, code: e.code || null, message: e.message });
  }
}
