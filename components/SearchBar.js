import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar({ autoFocus=false, defaultValue='' }) {
  const [q, setQ] = useState(defaultValue);
  const router = useRouter();
  const submit = (e) => {
    e.preventDefault();
    router.push(`/tim-kiem?q=${encodeURIComponent(q)}`);
  };
  return (
    <form onSubmit={submit} className="searchWrap">
      <input className="input" autoFocus={autoFocus} placeholder="Nhập tên môn/ từ khóa..." value={q} onChange={e=>setQ(e.target.value)} autoFocus={autoFocus} />
      <button className="btn" type="submit">Search</button>
    </form>
  );
}
