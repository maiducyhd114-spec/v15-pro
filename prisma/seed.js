
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tags = ['đại cương','giải tích','hust','hoá','điện tử'];
  const tagMap = {};
  for (const t of tags) {
    tagMap[t] = await prisma.tag.upsert({ where:{ name:t }, update:{}, create:{ name:t } });
  }

  const subjects = [
    {
      slug: 'mi111x-giai-tich-1',
      title: 'MI111X – Giải tích 1',
      dept: 'Toán-IT',
      summary: 'Tổng hợp giáo trình, slide, bài tập, đề thi môn Giải tích 1.',
      tags: ['đại cương','giải tích','hust'],
      status: 'PUBLISHED',
      resources: [
        { type:'Giáo trình', label:'Giáo trình GT1 (PDF)', url:'/uploads/gt1.pdf' },
        { type:'Slide', label:'Slide chương 1-3', url:'/uploads/slide-gt1.pdf' },
        { type:'Bài tập', label:'Bài tập tuần 1-5 có lời giải', url:'/uploads/bt-gt1.pdf' },
        { type:'Đề thi', label:'Tổng hợp đề thi GK/CK', url:'/uploads/de-gt1.pdf' }
      ]
    }
  ];

  
    ,
    {
      slug: 'mi112x-giai-tich-2',
      title: 'MI112X – Giải tích 2',
      dept: 'Toán-IT',
      summary: 'Giải tích 2: đạo hàm nhiều biến, tích phân kép, chuỗi, ứng dụng.',
      tags: ['giải tích','đại cương'],
      resources: [
        { label: 'Giáo trình — Giải tích 2', type: 'Giáo trình', url: '/uploads/gt1.pdf' },
        { label: 'Slide — Giải tích 2', type: 'Slide', url: '/uploads/slide-gt1.pdf' },
        { label: 'Bài tập — Giải tích 2', type: 'Bài tập', url: '/uploads/bt-gt1.pdf' }
      ]
    },
    {
      slug: 'mi113x-giai-tich-3',
      title: 'MI113X – Giải tích 3',
      dept: 'Toán-IT',
      summary: 'Giải tích 3: trường vector, tích phân đường-mặt, định lý Green-Gauss-Stokes.',
      tags: ['giải tích','đại cương'],
      resources: [
        { label: 'Giáo trình — Giải tích 3', type: 'Giáo trình', url: '/uploads/gt1.pdf' },
        { label: 'Slide — Giải tích 3', type: 'Slide', url: '/uploads/slide-gt1.pdf' },
        { label: 'Bài tập — Giải tích 3', type: 'Bài tập', url: '/uploads/bt-gt1.pdf' }
      ]
    }
    

  for (const s of subjects) {
    const subject = await prisma.subject.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug, title: s.title, dept: s.dept, summary: s.summary, status: s.status
      }
    });
    for (const t of s.tags) {
      const tag = tagMap[t];
      await prisma.subjectTag.upsert({
        where: { subjectId_tagId: { subjectId: subject.id, tagId: tag.id } },
        update: {},
        create: { subjectId: subject.id, tagId: tag.id }
      });
    }
    for (const r of s.resources) {
      await prisma.resource.create({ data: { ...r, subjectId: subject.id } });
    }
  }
  console.log('Seeded');
}

main().catch(e=>{ console.error(e); process.exit(1); }).finally(async ()=>{ await prisma.$disconnect(); });
