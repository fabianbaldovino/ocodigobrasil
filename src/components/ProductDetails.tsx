import React from 'react';
import { produto } from '@/data/produto';

const isTodo = (value: string) => value.startsWith('TODO_DADO');

export default function ProductDetails() {
  const isSample = process.env.NEXT_PUBLIC_SHOW_SAMPLE === '1';
  
  const showFormato = !isTodo(produto.formato);
  const showPaginas = !isTodo(produto.paginas);
  const showTempo = !isTodo(produto.tempoDeLeitura);
  const showAcesso = !isTodo(produto.formaDeAcesso);
  const showPreco = !isTodo(produto.preco);
  const showWhatsapp = !isTodo(produto.whatsapp);

  const hasAnyDetail = showFormato || showPaginas || showTempo || showAcesso;
  
  if (!hasAnyDetail && !showPreco && !showWhatsapp) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      
      {hasAnyDetail && (
        <section aria-labelledby="details-heading" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          {isSample && <div className="sample-banner" style={{ background: 'var(--accent)', color: 'white', padding: '0.25rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem', borderRadius: '4px' }}>EXEMPLO (somente prévia)</div>}
          <h2 id="details-heading" style={{ fontSize: 'var(--fs-h3)', marginBottom: '1.5rem', color: 'var(--foreground)' }}>Detalhes do Manifesto</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {showFormato && <li style={{ color: 'var(--text-muted)' }}><strong>Formato:</strong> {produto.formato}</li>}
            {showPaginas && <li style={{ color: 'var(--text-muted)' }}><strong>Páginas:</strong> {produto.paginas}</li>}
            {showTempo && <li style={{ color: 'var(--text-muted)' }}><strong>Tempo de leitura:</strong> {produto.tempoDeLeitura}</li>}
            {showAcesso && <li style={{ color: 'var(--text-muted)' }}><strong>Acesso:</strong> {produto.formaDeAcesso}</li>}
          </ul>
        </section>
      )}

      {showPreco && (
        <section aria-labelledby="price-heading" style={{ background: 'var(--foreground)', color: 'var(--background)', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          {isSample && <div className="sample-banner" style={{ background: 'var(--accent)', color: 'white', padding: '0.25rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem', borderRadius: '4px' }}>EXEMPLO (somente prévia)</div>}
          <h2 id="price-heading" style={{ fontSize: 'var(--fs-body)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--surface-alt)', marginBottom: '1rem' }}>Investimento</h2>
          <div style={{ fontSize: 'var(--fs-h1)', fontWeight: 900, marginBottom: '2rem' }}>{produto.preco}</div>
          <a href="https://pay.hotmart.com/C107804167U" className="btn-hero" target="_blank" rel="noopener noreferrer" aria-label="Comprar o manifesto agora">
            ACESSAR O MANIFESTO
          </a>
        </section>
      )}

      {showWhatsapp && (
        <section aria-labelledby="whatsapp-heading" style={{ textAlign: 'center', padding: '2rem' }}>
          {isSample && <div className="sample-banner" style={{ background: 'var(--accent)', color: 'white', padding: '0.25rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem', borderRadius: '4px' }}>EXEMPLO (somente prévia)</div>}
          <h2 id="whatsapp-heading" style={{ fontSize: 'var(--fs-lead)', marginBottom: '1rem' }}>Ficou com alguma dúvida?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Entre em contato direto comigo pelo WhatsApp.</p>
          <a 
            href={`https://wa.me/${produto.whatsapp}?text=${encodeURIComponent('Olá Fabian, tenho interesse no manifesto O Código Brasil mas fiquei com uma dúvida.')}`}
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Falar com Fabian no WhatsApp"
            style={{ 
              display: 'inline-block', 
              background: '#1F5C3E', /* Dark green for AAA contrast against #FCFBF8 */
              color: '#FFFFFF', 
              padding: '1rem 2rem', 
              borderRadius: 'var(--radius-md)', 
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            Falar no WhatsApp
          </a>
        </section>
      )}

    </div>
  );
}
