// pages/search.js
import Head from 'next/head';
import Link from 'next/link';

export async function getServerSideProps({ query, req }) {
  const q = String(query.q || '').trim();
  const proto = (req.headers['x-forwarded-proto'] || 'http');
  const host  = req.headers.host;
  const base  = `${proto}://${host}`;
  let items = [];
  try {
    const res = await fetch(`${base}/api/search?q=${encodeURIComponent(q)}&pageSize=20`);
    const data = await res.json();
    items = data.items || [];
  } catch (e) {
    items = [];
  }
  return { props: { q, items } };
}

export default function SearchPage({ q, items }) {
  return (
    <>
      <Head>
        <title>Kết quả tìm kiếm: {q}</title>
      </Head>
      <main className="container">
        <section className="section">
          <h1 className="title" style={{textAlign:'left'}}>Kết quả cho: “{q}”</h1>
          {items.length === 0 && <p>Không tìm thấy kết quả.</p>}
          <ul className="list">
            {items.map((it) => (
              <li key={it.slug} style={{margin:'10px 0'}}>
                <Link href={`/tailieu/${it.slug}`} className="linklike">{it.title}</Link>
                {it.summary && <div style={{fontSize:14, color:'#4b5563'}}>{it.summary}</div>}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
