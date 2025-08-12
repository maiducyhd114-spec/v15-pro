// components/Header.js
import Link from "next/link";

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
          <Link href="/" className="brand" aria-label="Tàiliệu.edu">
            <img src="/uploads/logo.png" alt="Tàiliệu.edu" className="brandLogo" />
            <span className="brandName">Tàiliệu.edu</span>
          </Link>
        </div>

        <nav className="headerNav">
          <div className="menu"><Link href="/tai-lieu-dai-hoc">TÀI LIỆU ĐẠI HỌC</Link>          <div className="menuDropdown" role="menu">
            <ul>
              <li><a href="#">TÀI LIỆU BÁCH KHOA</a></li>
              <li><a href="#">TÀI LIỆU NEU</a></li>
              <li><a href="#">TÀI LIỆU HNUE</a></li>
              <li><a href="#">TÀI LIỆU UET</a></li>
              <li><a href="#">TÀI LIỆU PHENIKAA</a></li>
            </ul>
          </div></div>
          <div className="menu"><Link href="/tai-lieu-ngoai-ngu">TÀI LIỆU NGOẠI NGỮ</Link>          <div className="menuDropdown" role="menu">
            <ul>
              <li><a href="#">TÀI LIỆU BÁCH KHOA</a></li>
              <li><a href="#">TÀI LIỆU NEU</a></li>
              <li><a href="#">TÀI LIỆU HNUE</a></li>
              <li><a href="#">TÀI LIỆU UET</a></li>
              <li><a href="#">TÀI LIỆU PHENIKAA</a></li>
            </ul>
          </div></div>
          <div className="menu"><Link href="/tai-lieu-chuyen-nganh">TÀI LIỆU CHUYÊN NGÀNH</Link>          <div className="menuDropdown" role="menu">
            <ul>
              <li><a href="#">TÀI LIỆU BÁCH KHOA</a></li>
              <li><a href="#">TÀI LIỆU NEU</a></li>
              <li><a href="#">TÀI LIỆU HNUE</a></li>
              <li><a href="#">TÀI LIỆU UET</a></li>
              <li><a href="#">TÀI LIỆU PHENIKAA</a></li>
            </ul>
          </div></div>
          <div className="menu"><Link href="/?q=TSA" onClick={() => trackHot('TSA')}>TSA</Link>          <div className="menuDropdown" role="menu">
            <ul>
              <li><a href="#">TÀI LIỆU BÁCH KHOA</a></li>
              <li><a href="#">TÀI LIỆU NEU</a></li>
              <li><a href="#">TÀI LIỆU HNUE</a></li>
              <li><a href="#">TÀI LIỆU UET</a></li>
              <li><a href="#">TÀI LIỆU PHENIKAA</a></li>
            </ul>
          </div></div>
          <div className="menu"><Link href="/?q=HSA" onClick={() => trackHot('HSA')}>HSA</Link>          <div className="menuDropdown" role="menu">
            <ul>
              <li><a href="#">TÀI LIỆU BÁCH KHOA</a></li>
              <li><a href="#">TÀI LIỆU NEU</a></li>
              <li><a href="#">TÀI LIỆU HNUE</a></li>
              <li><a href="#">TÀI LIỆU UET</a></li>
              <li><a href="#">TÀI LIỆU PHENIKAA</a></li>
            </ul>
          </div></div>
          <div className="menu"><Link href="/?q=cấp 3" onClick={() => trackHot('cấp 3')}>CẤP 3</Link>          <div className="menuDropdown" role="menu">
            <ul>
              <li><a href="#">TÀI LIỆU BÁCH KHOA</a></li>
              <li><a href="#">TÀI LIỆU NEU</a></li>
              <li><a href="#">TÀI LIỆU HNUE</a></li>
              <li><a href="#">TÀI LIỆU UET</a></li>
              <li><a href="#">TÀI LIỆU PHENIKAA</a></li>
            </ul>
          </div></div>
          <div className="menu"><Link href="/khoa-hoc">KHÓA HỌC</Link>          <div className="menuDropdown" role="menu">
            <ul>
              <li><a href="#">TÀI LIỆU BÁCH KHOA</a></li>
              <li><a href="#">TÀI LIỆU NEU</a></li>
              <li><a href="#">TÀI LIỆU HNUE</a></li>
              <li><a href="#">TÀI LIỆU UET</a></li>
              <li><a href="#">TÀI LIỆU PHENIKAA</a></li>
            </ul>
          </div></div>
        </nav>
      </div>
    </header>
  );
}
