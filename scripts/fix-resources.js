const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
(async () => {
  const s = await p.subject.findUnique({ where: { slug: 'mi111x-giai-tich-1' } });
  if (!s) { console.log('Không thấy subject'); process.exit(1); }
  const ex = await p.resource.count({ where: { subjectId: s.id } });
  if (ex>0) { console.log('Đã có', ex, 'resource'); process.exit(0); }
  await p.resource.createMany({ data:[
    { type:'Giáo trình', label:'Giáo trình GT1 (PDF)', url:'/uploads/gt1.pdf', subjectId:s.id },
    { type:'Slide', label:'Slide chương 1-3', url:'/uploads/slide-gt1.pdf', subjectId:s.id },
    { type:'Bài tập', label:'Bài tập tuần 1-5 có lời giải', url:'/uploads/bt-gt1.pdf', subjectId:s.id },
    { type:'Đề thi', label:'Tổng hợp đề thi GK/CK', url:'/uploads/de-gt1.pdf', subjectId:s.id }
  ]});
  console.log('Đã thêm resources');
  process.exit(0);
})();
