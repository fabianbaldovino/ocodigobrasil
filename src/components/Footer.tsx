import Link from 'next/link';
import { linkWhatsapp } from '@/data/produto';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="footer-logo">O Código <span>Brasil</span></p>
          <p className="footer-tagline">
            Consultoria de marca a partir da leitura cultural do consumidor brasileiro.
          </p>
        </div>

        <div className="footer-conversa">
          <a className="footer-whatsapp" href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">
            Fale com Fabian no WhatsApp<span className="sr-only"> (abre em nova aba)</span>
          </a>
          <p className="footer-numero">+55 51 99965-4160 · A primeira conversa é gratuita e sem compromisso.</p>
        </div>

        <div className="footer-meta">
          <nav aria-label="Links do rodapé" className="footer-links">
            <a href="https://www.fabian.art.br/sobre" target="_blank" rel="noopener noreferrer">Fabian Baldovino</a>
            <a href="https://www.linkedin.com/in/fabianbaldovino/" target="_blank" rel="me noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/fabianbaldovino9/" target="_blank" rel="me noopener noreferrer">Instagram</a>
            <a href="https://www.youtube.com/@FabianBaldovino9" target="_blank" rel="me noopener noreferrer">YouTube</a>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos de Uso</Link>
          </nav>
          <p className="footer-copy">© 2026 O Código Brasil. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
