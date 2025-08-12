// components/AutocompleteSearch.js
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function AutocompleteSearch() {
  const [q, setQ] = useState('');
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!q.trim()) { setItems([]); setOpen(false); return; }
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        const r = await fetch(`/api/subjects?q=${encodeURIComponent(q)}&limit=6`);
        const j = await r.json();
        setItems(j.items || []);
        setOpen(true);
      } catch {
        setItems([]); setOpen(false);
      }
    }, 250);
    return () => clearTimeout(timer.current);
  }, [q]);

  function bump(term){
    try{
      const data = JSON.stringify({ term });
      if (navigator.sendBeacon) {
        const blob = new Blob([data], { type:'application/json' });
        navigator.sendBeacon('/api/hot-search', blob);
      } else {
        fetch('/api/hot-search', { method:'POST', headers:{'Content-Type':'application/json'}, body:data });
      }
    } catch {}
  }

  const go = (slug) => router.push(`/tailieu/${slug}`);

  const onSubmit = (e) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    bump(term);
    if (items[0]?.slug) return go(items[0].slug);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="searchWrap">
      <div style={{ position:'relative', flex:1 }}>
        <form onSubmit={onSubmit}>
          <input
            id="homeSearch"
            placeholder="Nhập tên môn/ từ khóa…"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            onFocus={()=> items.length && setOpen(true)}
            onBlur={()=> setTimeout(()=>setOpen(false), 120)}
            className="input"
          />
        </form>

        {open && items.length > 0 && (
          <div
            style={{
              position:'absolute', left:0, right:0, top:'100%', marginTop:8,
              background:'#fff', border:'1px solid #e5e7eb', borderRadius:12,
              boxShadow:'0 10px 28px rgba(0,0,0,.08)', zIndex:20
            }}
          >
            {items.map(it => (
              <div
                key={it.slug}
                onMouseDown={()=>{ bump(it.title || q); go(it.slug); }}
                style={{ padding:'12px 14px', cursor:'pointer' }}
              >
                <div style={{ fontWeight:700 }}>{it.title}</div>
                <div style={{ color:'#6b7280' }}>
                  {it.dept} · {Array.isArray(it.tags)? it.tags.join(', ') : ''}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" formAction="" onClick={onSubmit} className="btnSearch">
        TÌM KIẾM
      </button>
    </div>
  );
}
