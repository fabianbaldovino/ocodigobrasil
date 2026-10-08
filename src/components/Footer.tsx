import Link from 'next/link';
import { SITE_EMAIL } from '@/lib/site';

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
            <p><strong>Fabian Alexis Baldovino Paciel</strong></p>
            <p>CNPJ: 57.974.931/0001-08 (MEI)</p>
            <p>E-mail: <a href={`mailto:${SITE_EMAIL}`} style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>{SITE_EMAIL}</a></p>
            <p>WhatsApp: <a href="https://wa.me/5551999654160" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>+55 51 99965-4160</a></p>
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
