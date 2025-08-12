import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const TYPES = ['Giáo trình','Slide','Bài tập','Đề thi'];
const DEPTS = ['Toán-IT','Vật lý','Hoá học','CNTT','Điện','Cơ khí','Tự chọn','Đại cương'];

export default function Filters({ q='', dept='', type='', tag='', onChange }) {
  const router = useRouter();
  const [text, setText] = useState(q || '');
  const [sugs, setSugs] = useState([]);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const timer = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    const t = text.trim();
    if (!t) { setSugs([]); setOpen(false); return; }
    timer.current = setTimeout(async () => {
      try {
        const r = await fetch('/api/suggest?q=' + encodeURIComponent(t));
        const j = await r.json();
        setSugs(j.suggestions || []);
        setOpen((j.suggestions||[]).length > 0);
        setIdx(-1);
      } catch { setSugs([]); setOpen(false); }
    }, 200);
    return () => timer.current && clearTimeout(timer.current);
  }, [text]);

  useEffect(() => {
    const onDoc = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const choose = (sg) => {
    setOpen(false);
    if (sg?.href) router.push(sg.href);
    else if (sg?.slug) router.push(`/tailieu/${sg.slug}`);
    else onChange?.({ key:'q', val:text });
  };

  const onKey = (e) => {
    if (!open || sugs.length===0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i=>Math.min(i+1, sugs.length-1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx(i=>Math.max(i-1, 0)); }
    if (e.key === 'Enter')     { e.preventDefault(); choose(sugs[idx] || { text, type:'Tìm' }); }
    if (e.key === 'Escape')    { setOpen(false); }
  };

  return (
    <div className="grid" style={{gridTemplateColumns:'2fr 1fr 1fr', gap:12}} ref={boxRef}>
      <div style={{ position:'relative' }}>
        <input
          className="input"
          placeholder="Nhập tên môn/ từ khóa..."
          value={text}
          onChange={e=>setText(e.target.value)}
          onFocus={()=> setOpen(sugs.length>0)}
          onKeyDown={onKey}
          style={{ fontSize:18, padding:'14px 18px', height:56, borderRadius:16, paddingRight:130 }}
        />
        <button
          type="button"
          onClick={()=> router.push(`/tim-kiem?q=${encodeURIComponent(text.trim())}`)}
          disabled={!text.trim()}
          style={{
            position:'absolute', right:8, top:'50%', transform:'translateY(-50%)',
            height:40, borderRadius:12, padding:'0 18px', fontWeight:700,
            background:'#ef4444', color:'#fff', border:'none', cursor:'pointer',
            boxShadow:'0 6px 16px rgba(239,68,68,.35)', zIndex:10
          }}
        >Search</button>

        {open && sugs.length>0 && (
          <ul
            style={{
              position:'absolute', top:'calc(100% + 6px)', left:0, right:0,
              background:'#fff', border:'1px solid #e5e7eb', borderRadius:12,
              boxShadow:'0 12px 32px rgba(0,0,0,.12)', maxHeight:320, overflowY:'auto',
              zIndex: 1000, padding:4
            }}>
            {sugs.map((s, i) => (
              <li key={i}
                  onMouseDown={(e)=>{ e.preventDefault(); choose(s); }}
                  onMouseEnter={()=>setIdx(i)}
                  style={{
                    display:'flex', gap:8, alignItems:'center',
                    padding:'10px 12px', borderRadius:10,
                    background: i===idx ? '#f1f5f9' : 'transparent',
                    cursor:'pointer'
                  }}>
                <span style={{fontSize:12, padding:'2px 8px', borderRadius:999, background:'#0f172a', color:'#fff'}}>
                  {s.type}
                </span>
                <span style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{s.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <select className="input" value={dept} onChange={e=>onChange?.({key:'dept', val:e.target.value})}>
        <option value="">Khoa/Viện</option>
        {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      <select className="input" value={type} onChange={e=>onChange?.({key:'type', val:e.target.value})}>
        <option value="">Loại tài liệu</option>
        {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </div>
  );
}
