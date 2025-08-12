// pages/api/health.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const [subjects, resources] = await Promise.all([
      prisma.subject.count(),
      prisma.resource.count(),
    ]);
    res.status(200).json({ ok: true, subjects, resources });
  } catch (e) {
    console.error('HEALTH_ERR', e);
    res.status(500).json({ ok: false, code: e.code, message: e.message });
  }
}
