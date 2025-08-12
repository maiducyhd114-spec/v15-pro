
export async function getServerSideProps() {
  return { props: {} };
}

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function AdminUpload() {
  const { data } = useSession();
  const user = data?.user;
  const [list, setList] = useState([]);

  if (!user) return <div className="alert">Cần đăng nhập Google. <button className="btn" onClick={()=>signIn('google')}>Đăng nhập</button></div>;

  const uploadFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    const r = await fetch('/api/admin/upload', { method:'POST', body: form });
    const json = await r.json();
    setList(x=>[json, ...x]);
  };

  return (
    <main>
      <h1 className="title">Upload file</h1>
      <p className="sub">Backend tự chọn lưu local hay S3 theo ENV.</p>
      <input type="file" onChange={uploadFile} />
      <ul className="list" style={{marginTop:10}}>
        {list.map((f,i)=>(<li key={i}><code>{f.url}</code> ({f.size} bytes)</li>))}
      </ul>
    </main>
  );
}
