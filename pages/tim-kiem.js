import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Filters from '../components/Filters';

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState({ q:'', dept:'', type:'', tag:'', page:1, pageSize:10 });
  const [data, setData] = useState({ items: [], total: 0 });
  const timer = useRef(null);

  const run = async (params) => {
    const sp = new URLSearchParams(params);
    const res = await fetch('/api/search?' + sp.toString());
    const json = await res.json();
    setData(json);
  };

  // load lần đầu / khi ?q= thay đổi
  useEffect(() => {
    const q = typeof router.query.q === 'string' ? router.query.q : '';
    const init = { q, dept:'', type:'', tag:'', page:1, pageSize:10 };
    setQuery(init);
    run(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q]);

  const onChange = ({key, val}) => {
    const next = { ...query, page:1, [key]: val };
    setQuery(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => run(next), 300);
  };

  const go = (p) => {
    const next = { ...query, page: p };
    setQuery(next);
    run(next);
  };

  return (
    <main>
      <h1 className="title">Tìm kiếm</h1>
      <Filters q={query.q} dept={query.dept} type={query.type} tag={query.tag} onChange={onChange} />
      <p className="hint" style={{marginTop:8}}>Kết quả: {data.total}</p>
      <ul className="list" style={{marginTop:12}}>
        {data.items.map(item => (
          <li key={item.slug}>
            <Link href={`/tailieu/${item.slug}`}><b>{item.title}</b></Link>
            <div className="kicker">{item.dept} • {item.tags.join(', ')}</div>
            <p style={{margin:'6px 0 0'}}>{item.summary}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button className="btn" onClick={()=>go(Math.max(1, Number(query.page)-1))} disabled={Number(query.page)<=1}>« Trước</button>
        <span>Trang {query.page}</span>
        <button className="btn" onClick={()=>go(Number(query.page)+1)} disabled={(Number(query.page) * Number(query.pageSize)) >= data.total}>Sau »</button>
      </div>
    </main>
  );
}
