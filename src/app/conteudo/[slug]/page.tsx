import { getPostData, getSortedPostsData } from '@/lib/markdown';
import { formatDateBR } from '@/lib/format';
import ShareButtons from '@/components/ShareButtons';
import Stars from '@/components/Stars';
import Comments from '@/components/Comments';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { buildGraph, generateArticle, generatePerson, generateOrganization } from '@/lib/jsonld';
import { SITE_URL, FEATURE_COMMENTS_ENABLED } from '@/lib/site';
import AuthorBio from '@/components/AuthorBio';
import Breadcrumbs from '@/components/Breadcrumbs';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  const canonicalPath = `/conteudo/${postData.slug}/`;
  
  const finalTitle = postData.metaTitle || postData.title;
  const finalDesc = postData.metaDescription || postData.description;
  const shareTitle = postData.metaTitleAbsolute ? finalTitle : `${finalTitle} | O Código Brasil`;

  const ogImage = {
    url: '/capa_manifesto_o_codigo_brasil_fabian_baldovino.png',
    width: 1200,
    height: 630,
    alt: 'Capa do manifesto O Código Brasil, de Fabian Baldovino',
  };

  return {
    title: postData.metaTitleAbsolute ? { absolute: finalTitle } : finalTitle,
    description: finalDesc,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      siteName: 'O Código Brasil',
      url: canonicalPath,
      title: shareTitle,
      description: finalDesc,
      publishedTime: postData.date,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: finalDesc,
      images: [ogImage.url],
    },
  };
}

export default async function Post({ params }: Props) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  const allPosts = getSortedPostsData();
  const relatedPosts = allPosts.filter((p) => p.slug !== postData.slug).slice(0, 3);

  const finalDesc = postData.metaDescription || postData.description;

  const ogImageUrl = `${SITE_URL}/capa_manifesto_o_codigo_brasil_fabian_baldovino.png`;
  
  const jsonLdData = buildGraph([
    generatePerson(),
    generateOrganization(),
    generateArticle(
      postData.slug,
      postData.title,
      finalDesc,
      postData.date,
      ogImageUrl,
      postData.updated
    )
  ]);

  return (
    <main>
      <JsonLd data={jsonLdData} />
      <article className="section container flex-col" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Breadcrumbs
          items={[
            { name: 'O Código Brasil', url: SITE_URL },
            { name: 'Conteúdo', url: `${SITE_URL}/conteudo/` },
            { name: postData.title, url: `${SITE_URL}/conteudo/${postData.slug}/` },
          ]}
        />
        <header style={{ marginBottom: '4rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '3rem' }}>
          <h1 className="text-title" style={{ marginBottom: '1.5rem', color: 'var(--foreground)' }}>{postData.title}</h1>
          <p className="text-subtitle" style={{ opacity: 0.7, marginBottom: '2.5rem', fontFamily: 'Inter, sans-serif', fontWeight: 400, maxWidth: '800px', lineHeight: '1.5' }}>
            {postData.description}
          </p>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 700 }}>
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

        {FEATURE_COMMENTS_ENABLED && (
          <>
            <Stars slug={postData.slug} />
            <Comments slug={postData.slug} />
          </>
        )}

        {relatedPosts.length > 0 && (
          <section aria-labelledby="leia-tambem-heading" style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <h2 id="leia-tambem-heading" style={{ fontSize: 'var(--fs-h2)', marginBottom: '2rem', color: 'var(--foreground)' }}>Leia Também</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {relatedPosts.map(({ slug, title, description, date }) => (
                <article key={slug} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                    <a href={`/conteudo/${slug}/`} style={{ color: 'var(--foreground)', textDecoration: 'none' }}>{title}</a>
                  </h3>
                  <p className="text-body" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{description}</p>
                  <time dateTime={date} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    {formatDateBR(date)}
                  </time>
                </article>
              ))}
            </div>
          </section>
        )}

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
            aria-label="Quero o manifesto: checkout seguro na Hotmart"
          >
            Quero o manifesto
          </a>
        </div>
      </article>

      <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <AuthorBio />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
