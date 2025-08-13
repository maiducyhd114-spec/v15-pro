import Link from "next/link";
import MainNav from "./MainNav";

function trackHot(term){
  try{
    const data = JSON.stringify({ term });
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([data], { type:'application/json' });
      navigator.sendBeacon('/api/hot-search', blob);
    } else {
      fetch('/api/hot-search', { method:'POST', headers:{'Content-Type':'application/json'}, body:data });
    }
  } catch {}
}

export default function Header() {
  return (
    <header className="header">
      <div className="container headerInner">
        <div className="headerTop">
          <Link href="/" className="brand" aria-label="Tài liệu Học tập">
            <img src="/uploads/logo.png" alt="Tài liệu Học tập" className="brandLogo" />
            <span className="brandName">Tài liệu Học tập</span>
          </Link>
        </div>

        <nav className="headerNav">
          <MainNav />
        </nav>
      </div>
    </header>
  );
}
