import { getSortedPostsData } from '@/lib/markdown';
import { formatDateBR } from '@/lib/format';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conteúdo | O Código Brasil',
  description: 'Artigos e estudos de caso sobre neuromarketing, comportamento do consumidor brasileiro e o Método O Código Brasil.',
};

export default function Conteudo() {
  const allPostsData = getSortedPostsData();

  return (
    <main>
      <section className="section container flex-col">
        <h1 className="text-title" style={{ color: 'var(--accent)' }}>CONTEÚDO E ARTIGOS</h1>
        <p className="text-body" style={{ marginTop: '1rem', maxWidth: '800px' }}>
          Estudos, análises de mercado e a decodificação do cérebro instintivo brasileiro.
        </p>
      </section>

      <section className="container" style={{ paddingBottom: '8rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {allPostsData.length === 0 ? (
            <p className="text-body">Nenhum artigo publicado ainda.</p>
          ) : (
            allPostsData.map(({ slug, title, description, date }) => (
              <article key={slug} style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '2rem' }}>
                <Link href={`/conteudo/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                    {title}
                  </h2>
                  <p className="text-body" style={{ marginBottom: '1rem' }}>{description}</p>
                  <span style={{ fontSize: '0.875rem', opacity: 0.6, fontWeight: 700 }}>
                    {formatDateBR(date)}
                  </span>
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
