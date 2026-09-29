import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ocodigobrasil.com'),
  title: { default: 'O Código Brasil | Manifesto', template: '%s | O Código Brasil' },
  description: 'O marketing no Brasil está errado. Nós consumimos por pertencimento, não por lógica. Leia o manifesto definitivo sobre o cérebro instintivo brasileiro.',
  openGraph: {
    type: 'website', locale: 'pt_BR', url: 'https://ocodigobrasil.com',
    siteName: 'O Código Brasil',
    title: 'O Código Brasil | Manifesto',
    description: 'O segredo para vender no mercado mais emocional do mundo.',
    images: [{ url: '/capa_manifesto_o_codigo_brasil_fabian_baldovino.png', width: 1200, height: 630, alt: 'Livro O Código Brasil' }],
  },
  twitter: { card: 'summary_large_image', title: 'O Código Brasil | Manifesto', images: ['/capa_manifesto_o_codigo_brasil_fabian_baldovino.png'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a href="#conteudo-principal" className="skip-link">Pular para o conteúdo</a>
        <header className="container header-layout" style={{ paddingTop: '2rem' }}>
          <div style={{ fontWeight: 900, letterSpacing: '-0.02em', fontSize: '1.25rem' }}>
            O CÓDIGO BRASIL © 2026
          </div>
          <nav aria-label="Navegação principal" style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" className="nav-link">O Manifesto</Link>
            <Link href="/conteudo" className="nav-link">Conteúdo</Link>
            <a href="https://pay.hotmart.com/C107804167U" className="nav-link" style={{ color: 'var(--accent)' }}>Comprar</a>
          </nav>
        </header>
        
        <div id="conteudo-principal">
          {children}
        </div>
        
        <footer className="container header-layout" style={{ paddingBottom: '2rem', paddingTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.1)', marginTop: '4rem' }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>
            O CÓDIGO BRASIL
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Criado por Fabian Baldovino
          </div>
        </footer>
      </body>
    </html>
  );
}
