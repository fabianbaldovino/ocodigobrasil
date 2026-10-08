import React from 'react';
import { produto } from '@/data/produto';

export default function Testimonials() {
  const isSample = process.env.NEXT_PUBLIC_SHOW_SAMPLE === '1';
  
  if (!produto.depoimentos || produto.depoimentos.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="testimonials-heading" style={{ background: 'var(--background)', padding: '4rem 0', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      {isSample && <div className="sample-banner" style={{ background: 'var(--accent)', color: 'white', padding: '0.25rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem', borderRadius: '4px' }}>EXEMPLO (somente prévia)</div>}
      <h2 id="testimonials-heading" style={{ fontSize: 'var(--fs-h2)', textAlign: 'center', marginBottom: '3rem', color: 'var(--foreground)' }}>O que dizem sobre o método</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {produto.depoimentos.map(dep => (
          <div key={dep.id} style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: 'var(--fs-lead)', marginBottom: '1.5rem' }}>&quot;{dep.texto}&quot;</p>
            <div>
              <strong style={{ display: 'block', color: 'var(--foreground)' }}>{dep.nome}</strong>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-faint)' }}>{dep.cargo}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
