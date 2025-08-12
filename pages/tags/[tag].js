
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
const fetcher = (u)=>fetch(u).then(r=>r.json());

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;
  const { data } = useSWR(()=> tag ? `/api/tags/${encodeURIComponent(tag)}` : null, fetcher);
  const list = data?.items || [];
  return (
    <main>
      <h1 className="title">Tag: {tag}</h1>
      <ul className="list">
        {list.map(item => (
          <li key={item.slug}>
            <Link href={`/tailieu/${item.slug}`}><b>{item.title}</b></Link>
            <div className="kicker">{item.dept}</div>
            <p style={{marginTop:6}}>{item.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
