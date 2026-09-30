import { getSortedPostsData } from '@/lib/markdown';
import { formatDateBR } from '@/lib/format';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conteúdo',
  description: 'Artigos e estudos de caso sobre neuromarketing, comportamento do consumidor brasileiro e o Método O Código Brasil.',
  alternates: { canonical: '/conteudo/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'O Código Brasil',
    url: '/conteudo/',
    title: 'Conteúdo | O Código Brasil',
    description: 'Artigos e estudos de caso sobre neuromarketing, comportamento do consumidor brasileiro e o Método O Código Brasil.',
    images: [{ url: '/capa_manifesto_o_codigo_brasil_fabian_baldovino.png', width: 1200, height: 630, alt: 'Livro O Código Brasil' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conteúdo | O Código Brasil',
    images: ['/capa_manifesto_o_codigo_brasil_fabian_baldovino.png'],
  },
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
              <article key={slug} className="post-card" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '2rem' }}>
                <h2 className="post-card__title" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                  <Link href={`/conteudo/${slug}/`}>{title}</Link>
                </h2>
                <p className="text-body" style={{ marginBottom: '1rem' }}>{description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
                  <time dateTime={date} style={{ fontSize: '0.875rem', opacity: 0.6, fontWeight: 700 }}>
                    {formatDateBR(date)}
                  </time>
                  <ShareButtons slug={slug} title={title} compact />
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
