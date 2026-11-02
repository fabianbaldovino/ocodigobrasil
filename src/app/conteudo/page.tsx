import { getSortedPostsData } from '@/lib/markdown';
import { formatDateBR } from '@/lib/format';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artigos',
  description: 'Artigos sobre o comportamento do consumidor brasileiro, com análises de marcas como Nubank e Havaianas e o método O Código Brasil.',
  alternates: { canonical: '/conteudo/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'O Código Brasil',
    url: '/conteudo/',
    title: 'Artigos | O Código Brasil',
    description: 'Artigos sobre o comportamento do consumidor brasileiro, com análises de marcas como Nubank e Havaianas e o método O Código Brasil.',
    images: [{ url: '/capa_manifesto_o_codigo_brasil_fabian_baldovino.png', width: 1200, height: 630, alt: 'Capa do manifesto O Código Brasil, de Fabian Baldovino' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artigos | O Código Brasil',
    description: 'Artigos sobre o comportamento do consumidor brasileiro, com análises de marcas como Nubank e Havaianas e o método O Código Brasil.',
    images: ['/capa_manifesto_o_codigo_brasil_fabian_baldovino.png'],
  },
};

export default function Conteudo() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="cb-artigo">
      <div className="cb-a-largo">
        <header className="cb-a-topo cb-a-topo--lista">
          <h1 className="cb-a-titulo">Artigos</h1>
          <p className="cb-a-linha-fina">
            Por que o brasileiro compra de quem o faz se sentir em <em>casa</em>: análises de marcas e do comportamento do consumidor, pelo método O Código Brasil.
          </p>
        </header>

        {allPostsData.length === 0 ? (
          <p className="cb-a-vazio">Nenhum artigo publicado ainda.</p>
        ) : (
          <ul className="cb-a-lista">
            {allPostsData.map(({ slug, title, description, date }) => (
              <li key={slug}>
                <Link href={`/conteudo/${slug}/`} className="cb-a-card">
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <time dateTime={date}>{formatDateBR(date)}</time>
                  <span>Ler o artigo <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
