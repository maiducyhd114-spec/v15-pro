// components/TrendingTags.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const FALLBACK_TAGS = [
  { tag: 'tsa', count: 5 },
  { tag: 'hsa', count: 3 },
  { tag: 'cấp 3', count: 1 },
  { tag: 'giải tích', count: 12 },
  { tag: 'đại cương', count: 7 },
];

export default function TrendingTags({ limit = 10 }) {
  const [tags, setTags] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/trending-tags?limit=${limit}`);
        if (!res.ok) throw new Error('bad status');
        const data = await res.json();
        const arr = Array.isArray(data.tags)
          ? data.tags
          : Array.isArray(data.items)
          ? data.items
          : [];
        if (!cancelled) {
          if (arr.length) {
            setTags(arr.map(x => ({ tag: x.tag ?? x.name ?? x, count: x.count ?? 0 })));
          } else {
            setTags(FALLBACK_TAGS.slice(0, limit));
          }
        }
      } catch {
        if (!cancelled) setTags(FALLBACK_TAGS.slice(0, limit));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  const go = (name) => {
    // fire-and-forget tăng đếm
    fetch('/api/tag-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tagName: name }),
    }).catch(() => {});
    router.push(`/search?q=${encodeURIComponent(name)}`);
  };

  if (!tags.length) return null;

  return (
    <div className="trending" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      {tags.map((t, i) => (
        <button
          key={`${t.tag}-${i}`}
          className="chip"
          onClick={() => go(t.tag)}
          style={{ cursor: 'pointer', border: 0 }}
          aria-label={`Tìm "${t.tag}"`}
          title={`Tìm "${t.tag}"`}
        >
          <span>#{t.tag}</span>
          {typeof t.count === 'number' && <span className="cnt">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}
