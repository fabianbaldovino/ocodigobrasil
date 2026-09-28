import { getPostData, getSortedPostsData } from '@/lib/markdown';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  return {
    title: `${postData.title} | O Código Brasil`,
    description: postData.description,
  };
}

export default async function Post({ params }: Props) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);

  return (
    <main>
      <article className="section container flex-col" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ marginBottom: '4rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '3rem' }}>
          <h1 className="text-title" style={{ marginBottom: '1.5rem', color: 'var(--foreground)' }}>{postData.title}</h1>
          <p className="text-subtitle" style={{ opacity: 0.7, marginBottom: '2.5rem', fontFamily: 'Inter, sans-serif', fontWeight: 400, maxWidth: '800px', lineHeight: '1.5' }}>
            {postData.description}
          </p>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', opacity: 0.6, fontWeight: 700 }}>
            <time>{new Date(postData.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</time>
            <span>POR <a href="https://www.fabian.art.br" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>FABIAN BALDOVINO</a></span>
          </div>
        </header>

        <div 
          className="markdown-content text-body"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
          style={{ width: '100%' }}
        />

        <div style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--foreground)' }}>
            O Manifesto
          </h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.7, maxWidth: '600px', marginBottom: '2.5rem' }}>
            Aprofunde-se nestes conceitos e descubra o método exato para decodificar o comportamento do consumidor brasileiro e blindar a percepção de valor da sua marca.
          </p>
          <a 
            href="https://pay.hotmart.com/C107804167U" 
            className="btn-hero" 
            aria-label="Prosseguir para o checkout seguro na Hotmart e comprar o manifesto agora"
          >
            COMPRAR O MANIFESTO AGORA
          </a>
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
