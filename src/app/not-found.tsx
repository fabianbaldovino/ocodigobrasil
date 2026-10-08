import Link from 'next/link';

export const metadata = {
  title: 'Página não encontrada',
  openGraph: {
    title: 'Página não encontrada | O Código Brasil',
  },
  twitter: {
    title: 'Página não encontrada | O Código Brasil',
  },
};

export default function NotFound() {
  return (
    <div className="container section flex-col" style={{ textAlign: 'center', minHeight: '60vh', justifyContent: 'center' }}>
      <h1 className="text-title" style={{ color: 'var(--accent)' }}>404</h1>
      <p className="text-body" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        Página não encontrada
      </p>
      <Link href="/" className="btn-hero">
        VOLTAR PARA O INÍCIO
      </Link>
    </div>
  );
}
