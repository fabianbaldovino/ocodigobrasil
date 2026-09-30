"use client";

import { useEffect, useState } from 'react';
import { fetchComments, submitComment, type PostComment } from '@/lib/api';
import { formatDateBR } from '@/lib/format';

export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<PostComment[] | null>(null);
  const [available, setAvailable] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await fetchComments(slug);
        if (!alive) return;
        setComments(list);
        setAvailable(true);
      } catch {
        if (!alive) return;
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setErrorMessage('');
    const result = await submitComment(slug, { name, text, website });
    if (result.ok) {
      setState('sent');
      setName('');
      setText('');
    } else {
      setErrorMessage(result.error);
      setState('error');
    }
  }

  if (!available) return null;

  return (
    <section className="interaction-block comments-block" aria-labelledby={`comentarios-${slug}`}>
      <div className="widget-head">
        <h2 id={`comentarios-${slug}`} className="widget-title">
          Comentários{comments && comments.length > 0 ? ` (${comments.length})` : ''}
        </h2>
      </div>

      {comments && comments.length > 0 ? (
        <ul className="comment-list">
          {comments.map((c) => (
            <li key={c.id} className="comment-item">
              <div className="comment-meta">
                <span className="comment-name">{c.name}</span>
                {c.createdAt && (
                  <time className="comment-date" dateTime={c.createdAt.slice(0, 10)}>
                    {formatDateBR(c.createdAt.slice(0, 10))}
                  </time>
                )}
              </div>
              <p className="comment-text">{c.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="widget-note">Seja o primeiro a comentar este artigo.</p>
      )}

      <form className="comment-form" onSubmit={handleSubmit} noValidate>
        <div className="comment-field">
          <label htmlFor={`nome-${slug}`}>Seu nome</label>
          <input
            id={`nome-${slug}`}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            required
            autoComplete="name"
          />
        </div>
        <div className="comment-field">
          <label htmlFor={`comentario-${slug}`}>Seu comentário</label>
          <textarea
            id={`comentario-${slug}`}
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            maxLength={1000}
            required
          />
        </div>
        <div className="comment-hp" aria-hidden="true">
          <label htmlFor={`website-${slug}`}>Website</label>
          <input
            id={`website-${slug}`}
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div className="comment-actions">
          <button type="submit" className="comment-submit" disabled={state === 'sending'}>
            {state === 'sending' ? 'Enviando…' : 'Enviar comentário'}
          </button>
          <p className="widget-note" role="status">
            {state === 'sent' && 'Comentário enviado! Ele será publicado após moderação.'}
            {state === 'error' && errorMessage}
          </p>
        </div>
      </form>
    </section>
  );
}
