import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';
import { Inter, Playfair_Display } from 'next/font/google';
import ActiveLink from '@/components/ActiveLink';
import Footer from '@/components/Footer';
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
  metadataBase: new URL(SITE_URL),
  title: { default: 'O Código Brasil: manifesto sobre como o brasileiro compra', template: '%s | O Código Brasil' },
  description: 'O marketing no Brasil está errado. Nós consumimos por pertencimento, não por lógica. Leia o manifesto definitivo sobre o cérebro instintivo brasileiro.',
  openGraph: {
    type: 'website', locale: 'pt_BR', url: SITE_URL,
    siteName: 'O Código Brasil',
    title: 'O Código Brasil: manifesto sobre como o brasileiro compra',
    description: 'O marketing no Brasil está errado. Nós consumimos por pertencimento, não por lógica. Leia o manifesto definitivo sobre o cérebro instintivo brasileiro.',
    images: [{ url: '/capa_manifesto_o_codigo_brasil_fabian_baldovino.png', width: 1200, height: 630, alt: 'Capa do manifesto O Código Brasil, de Fabian Baldovino' }],
  },
  twitter: { 
    card: 'summary_large_image', 
    title: 'O Código Brasil: manifesto sobre como o brasileiro compra', 
    description: 'O marketing no Brasil está errado. Nós consumimos por pertencimento, não por lógica. Leia o manifesto definitivo sobre o cérebro instintivo brasileiro.',
    images: ['/capa_manifesto_o_codigo_brasil_fabian_baldovino.png'] 
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
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
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="header-logo" aria-label="O Código Brasil — Início">
              <span className="logo-main">O CÓDIGO</span>
              <span className="logo-accent">BRASIL</span>
            </Link>
            <nav aria-label="Navegação principal" className="header-nav">
              <ActiveLink href="/" className="header-nav__link">Manifesto</ActiveLink>
              <ActiveLink href="/conteudo" className="header-nav__link">Artigos</ActiveLink>
              <a
                href="https://pay.hotmart.com/C107804167U"
                className="header-nav__cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprar
              </a>
            </nav>
          </div>
        </header>
        
        <div id="conteudo-principal">
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}
