// components/SubjectCard.js
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function SubjectCard({
  title,
  category = 'GIẢI TÍCH',
  date = '',
  slug = 'mi111x-giai-tich-1',
}) {
  const candidates = useMemo(() => ([
    `/uploads/${slug}.svg`,
    `/uploads/${slug}.jpg`,
    `/uploads/${slug}.png`,
    `/logo.png`,
  ]), [slug]);

  const [i, setI] = useState(0);
  const href = `/tailieu/${slug}`;

  return (
    <article className="postCard">
      <div className="thumb">
        <Link href={href}>
          <img
            src={candidates[i]}
            alt={title}
            onError={() => setI(x => Math.min(x + 1, candidates.length - 1))}
          />
        </Link>
      </div>

      <div className="meta">
        <div className="category">{category}</div>
        <h2 className="postTitle">
          <Link href={href} className="titleLink">{title}</Link>
        </h2>
        {(date || true) && (
        <div className="metaFooter">
          <div className="kicker">{date}</div>
          <Link href={href} className="readMore">READ MORE</Link>
        </div>
        )}
      </div>
    </article>
  );
}
