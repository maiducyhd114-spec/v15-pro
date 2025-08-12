// pages/api/health.js
export default async function handler(req, res) {
  try {
    const { PrismaClient } = await import('@prisma/client'); // import động để catch lỗi install/binary
    const prisma = new PrismaClient();

    const [subjects, resources] = await Promise.all([
      prisma.subject.count(),
      prisma.resource.count(),
    ]);

    res.status(200).json({ ok: true, subjects, resources, node: process.version });
  } catch (e) {
    res.status(500).json({
      ok: false,
      name: e?.name || null,
      code: e?.code || null,
      message: e?.message || String(e),
    });
  }
}
