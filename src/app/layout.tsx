import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'O Código Brasil | Manifesto',
  description: 'O marketing no Brasil está errado. Nós consumimos por pertencimento, não por lógica. Leia o manifesto definitivo sobre o cérebro instintivo brasileiro.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="container header-layout" style={{ paddingTop: '2rem' }}>
          <div style={{ fontWeight: 900, letterSpacing: '-0.02em', fontSize: '1.25rem' }}>
            O CÓDIGO BRASIL © 2026
          </div>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <a href="/" className="nav-link">O Manifesto</a>
            <a href="/conteudo" className="nav-link">Conteúdo</a>
            <a href="https://pay.hotmart.com/C107804167U" className="nav-link" style={{ color: 'var(--accent)' }}>Comprar</a>
          </nav>
        </header>
        
        {children}
        
        <footer className="container header-layout" style={{ paddingBottom: '2rem', paddingTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.1)', marginTop: '4rem' }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>
            O CÓDIGO BRASIL
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.6 }}>
            Criado por Fabian Baldovino
          </div>
        </footer>
      </body>
    </html>
  );
}
