"use client";

import { useEffect, useState } from 'react';
import { fetchRatings, type Rating } from '@/lib/api';
import StarIcon from './StarIcon';

export default function RatingsSummary({ slug }: { slug: string }) {
  const [rating, setRating] = useState<Rating | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const ratings = await fetchRatings([slug]);
        if (!alive) return;
        const r = ratings[slug];
        if (r && r.count > 0) setRating(r);
      } catch {
        if (!alive) return;
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (!rating) return null;

  const rounded = Math.round(rating.avg);
  const avg = rating.avg.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <span
      className="rating-summary"
      aria-label={`Nota ${avg} de 5, ${rating.count} ${rating.count === 1 ? 'avaliação' : 'avaliações'}`}
    >
      <span className="rating-summary__stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <StarIcon key={n} filled={n <= rounded} />
        ))}
      </span>
      <span className="rating-summary__num" aria-hidden="true">
        {avg} ({rating.count})
      </span>
    </span>
  );
}
