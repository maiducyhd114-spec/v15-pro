
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Layout({ children }) {
  const { data } = useSession();
  const user = data?.user;
  return (
    <div>
      <header className="header">
        <div className="brand">
          <Link href="/"><span>📚 Tailieu v3</span></Link>
        </div>
        <nav className="nav">
          <Link href="/tim-kiem">Tìm kiếm</Link>
          <Link href="/tags/hust">Tags</Link>
          <Link href="/admin">Admin</Link>
          {!user && <button className="btn" onClick={()=>signIn('google')}>Đăng nhập</button>}
          {user && (
            <div className="chips">
              <span className="badge">{user.name || user.email}</span>
              <button className="btn" onClick={()=>signOut()}>Đăng xuất</button>
            </div>
          )}
        </nav>
      </header>
      <div className="container">{children}</div>
      <footer className="footer">
        <small>v3-pro • Next.js + Prisma + NextAuth + Meili • cổng 3000</small>
      </footer>
    </div>
  );
}
