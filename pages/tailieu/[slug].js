import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import RightBanner from '../../components/RightBanner';
import RightCategories from '../../components/RightCategories';
import { useEffect, useRef, useState } from 'react';

const fetcher = (url) => fetch(url).then(r=>r.json());

export default function SubjectDetail() {
  const [q, setQ] = useState('');
  const [sugs, setSugs] = useState([]);
  const [open, setOpen] = useState(false);
  const inRef = useRef(null);
  const timer = useRef(null);

  const router = useRouter();
  const { slug } = router.query;
  const { data } = useSWR(()=> slug ? `/api/subjects/${slug}` : null, fetcher);

  useEffect(()=>{
    if(!q.trim()){ setSugs([]); setOpen(false); return; }
    clearTimeout(timer.current);
    timer.current = setTimeout(async ()=>{
      try{
        const r = await fetch(`/api/search?q=${encodeURIComponent(q)}&pageSize=6`);
        const d = await r.json();
        setSugs(Array.isArray(d.items)? d.items.slice(0,6):[]);
        setOpen(true);
      }catch{ setSugs([]); setOpen(false); }
    }, 200);
  }, [q]);

  if (!data) return <div className="container">Đang tải...</div>;
  if (!data.item) return <div className="container">Không tìm thấy tài liệu.</div>;
  const item = data.item;

  const types = Array.from(new Set((item.resources || []).map(r=>r.type))).filter(Boolean);

  return (
    <main className="container">
      <div className="homeGrid">
        {/* MAIN CONTENT */}
        <article className="mainCol">
          <section className="section">
            {item.dept && <div className="category">{item.dept}</div>}
            <h1 className="title" style={{textAlign:'left'}}>{item.title}</h1>
            <div className="metaFooter">
              <div className="kicker">{item.date || ''}</div>
              <Link href={`/tailieu/${item.slug}`} className="readMore">READ MORE</Link>
            </div>
          </section>

          {item.summary && (
            <section className="section card">
              <p style={{margin:0}}>{item.summary}</p>
            </section>
          )}

          {types.map((type) => (
            <section className="section card" key={type}>
              <h3>{type}</h3>
              <ul className="list">
                {(item.resources || []).filter(r=>r.type===type).map((f)=>(
                  <li key={f.id}>
                    <a className="btn" href={f.url} target="_blank" rel="noreferrer">
                      Xem/Tải: {f.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </article>

        {/* RIGHT SIDEBAR */}
        <aside className="rightCol">
          {/* Mini search box */}
          <form className="miniSearch" method="get" action="/search" role="search">
            <input className="input" name="q" placeholder="Tìm kiếm tài liệu" />
            <button type="submit" className="btnSearch">TÌM KIẾM</button>
          </form>

          {/* Banners */}
          <RightBanner
            items={[{ href: 'https://example.com/kh', src: '/uploads/banner-right.jpg', alt: 'Khóa học BKST' }]} />

          {/* Categories */}
          <RightCategories items={['Khoa Ngoại ngữ','Khoa Cơ khí','Khoa học']} />
        </aside>
      </div>
    </main>
  );
}
