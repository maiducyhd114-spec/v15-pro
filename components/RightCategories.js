// components/RightCategories.js
export default function RightCategories({ items = [], title = 'Danh mục' }) {
  if (!items.length) return null;
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div style={{ fontWeight: 700, marginBottom: 10 }}>{title}</div>
      <ul className="list">
        {items.map((t, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            <a href="#" className="linklike">{t}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
