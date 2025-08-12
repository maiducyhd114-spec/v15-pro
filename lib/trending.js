import prisma from './prisma';
export function getWeekStart(d = new Date()) {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dow = x.getUTCDay() || 7; const back = (dow + 6) % 7;
  x.setUTCDate(x.getUTCDate() - back); x.setUTCHours(0,0,0,0); return x;
}
export async function bumpTagClicks(tagNames = [], inc = 1) {
  const names = [...new Set((Array.isArray(tagNames)?tagNames:[tagNames]).filter(Boolean))];
  if (!names.length) return; const weekStart = getWeekStart();
  await Promise.all(names.map(name =>
    prisma.tagClickStat.upsert({
      where:{ tagName_weekStart:{ tagName:name, weekStart } },
      update:{ count:{ increment:inc } },
      create:{ tagName:name, weekStart, count:inc }
    })
  ));
}
