
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Admin() {
  const { data } = useSession();
  const user = data?.user;
  const [pending, setPending] = useState([]);

  useEffect(()=>{
    fetch('/api/admin/pending').then(r=>r.json()).then(d=>setPending(d.items||[]));
  },[]);

  if (!user) return <div className="alert">Cần đăng nhập Google để vào Admin. <button className="btn" onClick={()=>signIn('google')}>Đăng nhập</button></div>;
  if (!['ADMIN','MOD'].includes(user.role)) return <div className="alert">Bạn không có quyền truy cập Admin.</div>;

  return (
    <main>
      <h1 className="title">Bảng điều khiển</h1>
      <p className="sub">Duyệt tài liệu mới gửi, tạo môn, upload file.</p>

      <section className="section">
        <h3>Đang chờ duyệt</h3>
        <ul className="list">
          {pending.map(s => (
            <li key={s.slug}>
              <b>{s.title}</b> <span className="badge">{s.status}</span>
              <div className="kicker">{s.dept} • {s.tags.join(', ')}</div>
              <div style={{marginTop:8, display:'flex', gap:8}}>
                <button className="btn" onClick={()=>action(s.slug,'PUBLISHED')}>Duyệt</button>
                <button className="btn" onClick={()=>action(s.slug,'DRAFT')}>Trả về nháp</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <Link className="btn" href="/admin/new">+ Tạo môn</Link>
        <Link className="btn" href="/admin/upload">Upload file</Link>
      </section>
    </main>
  );

  async function action(slug, status) {
    await fetch('/api/admin/moderate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ slug, status }) });
    setPending(pending.filter(x=>x.slug!==slug));
  }
}
