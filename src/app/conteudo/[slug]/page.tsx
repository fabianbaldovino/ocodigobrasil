import { getPostData, getSortedPostsData } from '@/lib/markdown';
import { formatDateBR } from '@/lib/format';
import ShareButtons from '@/components/ShareButtons';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  const canonicalPath = `/conteudo/${postData.slug}/`;
  const shareTitle = `${postData.title} | O Código Brasil`;
  const ogImage = {
    url: '/capa_manifesto_o_codigo_brasil_fabian_baldovino.png',
    width: 1200,
    height: 630,
    alt: 'Livro O Código Brasil',
  };

  return {
    title: postData.title,
    description: postData.description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      siteName: 'O Código Brasil',
      url: canonicalPath,
      title: shareTitle,
      description: postData.description,
      publishedTime: postData.date,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      images: [ogImage.url],
    },
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
            <time dateTime={postData.date}>{formatDateBR(postData.date)}</time>
            <span>POR <a href="https://www.fabian.art.br" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>FABIAN BALDOVINO</a></span>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <ShareButtons slug={postData.slug} title={postData.title} />
          </div>
        </header>

        <div 
          className="markdown-content text-body"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
          style={{ width: '100%' }}
        />

        <div style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ marginBottom: '3rem' }}>
            <ShareButtons slug={postData.slug} title={postData.title} compact />
          </div>
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
