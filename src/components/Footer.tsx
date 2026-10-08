import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">O CÓDIGO BRASIL</div>
          <p className="footer-tagline">
            Decifrando o comportamento instintivo no mercado mais emocional do mundo.
          </p>
        </div>
        
        <div className="footer-meta">
          <div className="footer-links" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            <Link href="/privacidade" className="footer-link">Privacidade</Link>
            <Link href="/termos" className="footer-link">Termos de Uso</Link>
            <Link href="/reembolso" className="footer-link">Política de Reembolso</Link>
          </div>

          <div className="footer-company-info" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <p><strong>TODO_DADO: Razão social</strong></p>
            <p>CNPJ: <strong>TODO_DADO: CNPJ</strong></p>
            <p>E-mail: <strong>TODO_DADO: E-mail de suporte</strong></p>
            <p>WhatsApp: <strong>TODO_DADO: WhatsApp</strong></p>
          </div>

          <p className="footer-author" style={{ marginBottom: '0.5rem' }}>
            Criado por <a href="https://www.fabian.art.br/sobre" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>Fabian Baldovino</a>
          </p>
          <p className="footer-copy">© 2026 O Código Brasil. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
