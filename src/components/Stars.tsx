"use client";

import { useEffect, useState } from 'react';
import { apiGet, apiPost, type Rating } from '@/lib/api';
import StarIcon from './StarIcon';

function getDeviceId(): string {
  try {
    let id = localStorage.getItem('ocb_device');
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem('ocb_device', id);
    }
    return id;
  } catch {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  }
}

function fmtAvg(avg: number): string {
  return avg.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export default function Stars({ slug }: { slug: string }) {
  const [rating, setRating] = useState<Rating | null>(null);
  const [myVote, setMyVote] = useState(0);
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const data = await apiGet<{ ratings: Record<string, Rating> }>(`/api/ratings?slugs=${slug}`);
      if (!alive) return;
      if (data && data.ratings && data.ratings[slug]) {
        setRating(data.ratings[slug]);
        setAvailable(true);
      }
      try {
        const saved = Number(localStorage.getItem(`ocb_vote_${slug}`) || 0);
        if (saved >= 1 && saved <= 5) setMyVote(saved);
      } catch {}
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  async function vote(score: number) {
    if (state === 'loading') return;
    setState('loading');
    setErrorMessage('');
    const { data, error } = await apiPost<{ ok: boolean; rating: Rating }>(`/api/post/${slug}/vote`, {
      score,
      deviceId: getDeviceId(),
    });
    if (data) {
      setRating(data.rating);
      setMyVote(score);
      setAvailable(true);
      try {
        localStorage.setItem(`ocb_vote_${slug}`, String(score));
      } catch {}
      setState('done');
    } else {
      setErrorMessage(error || 'Não foi possível registrar agora.');
      setState('error');
    }
  }

  if (!available && state !== 'error') return null;

  return (
    <section className="interaction-block" aria-labelledby={`avaliacao-${slug}`}>
      <div className="widget-head">
        <h2 id={`avaliacao-${slug}`} className="widget-title">Avalie este artigo</h2>
        {rating && rating.count > 0 && (
          <p className="stars-summary">
            <strong>{fmtAvg(rating.avg)}</strong> de 5 · {rating.count}{' '}
            {rating.count === 1 ? 'avaliação' : 'avaliações'}
          </p>
        )}
      </div>
      <div className="stars-row" role="group" aria-label="Nota de 1 a 5 estrelas">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`star-btn${myVote >= n ? ' is-on' : ''}`}
            aria-label={`Avaliar ${n} de 5 estrelas`}
            aria-pressed={myVote === n}
            disabled={state === 'loading'}
            onClick={() => vote(n)}
          >
            <StarIcon filled={myVote >= n} />
          </button>
        ))}
      </div>
      <p className="widget-note" role="status">
        {state === 'loading' && 'Registrando sua nota…'}
        {state === 'done' && 'Obrigado! Sua nota foi registrada.'}
        {state === 'error' && errorMessage}
      </p>
    </section>
  );
}
