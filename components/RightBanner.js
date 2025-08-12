// components/RightBanner.js
export default function RightBanner({ items = [], className = '', children }) {
  if (!items.length) return null;
  return (
    <aside className={`rightCol ${className}`}>
      {items.map((b, i) => (
        <a
          key={i}
          href={b.href || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            borderRadius: 12,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 8px 24px rgba(0,0,0,.06)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={b.src}
            alt={b.alt || 'Banner'}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            loading="lazy"
          />
        </a>
      ))}
          {children}
    </aside>
  );
}
