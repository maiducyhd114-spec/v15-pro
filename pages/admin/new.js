
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import slugify from 'slugify';

export default function NewSubject() {
  const { data } = useSession();
  const user = data?.user;
  const [form, setForm] = useState({ title:'', dept:'', summary:'', tags:'' });

  if (!user) return <div className="alert">Cần đăng nhập Google. <button className="btn" onClick={()=>signIn('google')}>Đăng nhập</button></div>;

  const submit = async (e) => {
    e.preventDefault();
    const slug = slugify(form.title, { lower: true, strict: true });
    const tags = form.tags.split(',').map(s=>s.trim()).filter(Boolean);
    const r = await fetch('/api/subjects', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ slug, ...form, tags, status:'PENDING' }) });
    alert(await r.text());
  };

  return (
    <main>
      <h1 className="title">Tạo môn học</h1>
      <form onSubmit={submit} className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))'}}>
        <input className="input" placeholder="Tiêu đề (vd: MI111X – Giải tích 1)" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input className="input" placeholder="Khoa/Viện" value={form.dept} onChange={e=>setForm({...form,dept:e.target.value})} />
        <input className="input" placeholder="Tóm tắt" value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})} />
        <input className="input" placeholder="Tags (phẩy ,)" value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} />
        <button className="btn" type="submit">Gửi duyệt</button>
      </form>
    </main>
  );
}
