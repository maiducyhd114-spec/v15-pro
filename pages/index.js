// pages/index.js
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import TrendingTags from '../components/TrendingTags';
import RightBanner from '../components/RightBanner';
import SubjectCard from '../components/SubjectCard';
import RightCategories from '../components/RightCategories';
import Link from 'next/link';

export default function Home() {
  const [q, setQ] = useState('');
  const [sugs, setSugs] = useState([]);
  const [open, setOpen] = useState(false);
  const inRef = useRef(null);
  const timer = useRef(null);

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

  return (
    <>
      <Head>
        <title>Tàiliệu.edu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container">
        {/* HERO */}
        <section className="hero">
          <h1 className="title">Chào Bạn 👋, bạn muốn tìm gì?</h1>
          <form className="searchWrap" method="get" action="/search" role="search" style={{margin:0}}>
            <input name="q" list="search-suggestions"
              id="homeSearch"
              className="input"
              placeholder="Nhập tên môn/ từ khóa..."
              aria-label="Tìm kiếm"
              />
            <datalist id="search-suggestions">
              <option value="Giải tích" />
              <option value="Hóa đại cương" />
              <option value="Vật lý đại cương" />
              <option value="TSA" />
              <option value="HSA" />
              <option value="Cấp 3" />
              <option value="Giải tích 2" />
              <option value="Giải tích 3" />
            </datalist>
            <button type="submit" className="btnSearch">TÌM KIẾM</button>
          {open && sugs.length>0 && (
            <div className="suggestPanel" style={{position:'absolute', zIndex:20,
                 top: (inRef.current? (inRef.current.offsetTop + inRef.current.offsetHeight + 8): 72),
                 left: (inRef.current? inRef.current.offsetLeft : 0),
                 width: (inRef.current? inRef.current.offsetWidth : '100%') }}>
              <ul className="suggestList">
                {sugs.map(it => (
                  <li key={it.slug}>
                    <a href={`/tailieu/${it.slug}`}>{it.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          </form>
          <p className="hint">Gợi ý: "Giải tích", "Hoá đại cương", "Vật lý đại cương", ...</p>
        </section>

        {/* 🔥 Hot search / Trending — Đứng NGOÀI lưới để banner ngang hàng với card đầu */}
        <section className="section">
          <TrendingTags limit={10} />
        </section>

        {/* Lưới 2 cột: Main + Banner phải */}
        <div className="homeGrid">
          {/* MAIN */}
          <div className="mainCol">
            {/* Card bài MI111X */}
            <section className="section">
              <article className="postCard">
                {/* Ảnh/khung bên trái (gradient) */}
                <div
                  className="thumb"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    background:
                      'linear-gradient(135deg, rgba(255,133,133,1) 0%, rgba(255,172,164,1) 100%)',
                    minHeight: 220,
                  }}
                >
                  <div style={{ textAlign: 'center', color: '#fff' }}>
                    <div style={{ fontWeight: 800, fontSize: 28, letterSpacing: 1 }}>
                      GIẢI TÍCH 1
                    </div>
                    <div style={{ marginTop: 8, opacity: 0.9, fontWeight: 700 }}>MI111X</div>
                  </div>
                </div>

                {/* Nội dung bên phải */}
                <div>
                  <div className="category">GIẢI TÍCH</div>
                  <h2 className="postTitle">
                    <Link href="/tailieu/mi111x-giai-tich-1">
                      MI111X — Giải tích 1 (Giáo trình, Slide, Bài tập)
                    </Link>
                  </h2>
                  <div className="metaFooter">
                    <div className="kicker">15/07/2025</div>
                    <Link className="readMore" href="/tailieu/mi111x-giai-tich-1">READ MORE</Link>
                  </div>
                </div>
              </article>
            </section>

            {/* ...Các bài khác nếu có */}
{/* DEMO: các môn khác, thẳng hàng với MI111X */}
<SubjectCard
              title="MI112X — Giải tích 2 (Giáo trình, Slide, Bài tập)"
              category="GIẢI TÍCH"
              slug="mi112x-giai-tich-2"
              date="16/07/2025"
            />
<SubjectCard
              title="MI113X — Giải tích 3 (Giáo trình, Slide, Bài tập)"
              category="GIẢI TÍCH"
              slug="mi113x-giai-tich-3"
              date="17/07/2025"
            />

          </div>

          {/* ASIDE: Banner phải */}
          <RightBanner items={[
              {
                href: 'https://example.com/khoa-hoc',
                src: '/uploads/banner-right.jpg',
                alt: 'Khóa học BKST',
              },
            ]}>
            <RightCategories items={['Khoa Ngoại ngữ','Khoa Cơ khí','Khoa học']} />
          </RightBanner>
        </div>
      </main>
    </>
  );
}
