import { getPostData, getSortedPostsData } from '@/lib/markdown';
import { formatDateBR } from '@/lib/format';
import ShareButtons from '@/components/ShareButtons';
import Comments from '@/components/Comments';
import { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { buildGraph, generateArticle, generatePerson, generateOrganization } from '@/lib/jsonld';
import { SITE_URL, FEATURE_COMMENTS_ENABLED, MANIFESTO_PDF } from '@/lib/site';
import { linkWhatsapp, produto } from '@/data/produto';
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
    <main className="cb-artigo">
      <JsonLd data={jsonLdData} />
      <article className="cb-a-coluna">
        <Breadcrumbs
          items={[
            { name: 'O Código Brasil', url: SITE_URL },
            { name: 'Artigos', url: `${SITE_URL}/conteudo/` },
            { name: postData.title, url: `${SITE_URL}/conteudo/${postData.slug}/` },
          ]}
        />
        <header className="cb-a-topo">
          <h1 className="cb-a-titulo">{postData.title}</h1>
          <p className="cb-a-linha-fina">{postData.description}</p>
          <p className="cb-a-meta">
            <time dateTime={postData.date}>{formatDateBR(postData.date)}</time>
            <span>Por <a href="https://www.fabian.art.br" target="_blank" rel="noopener noreferrer">Fabian Baldovino</a></span>
          </p>
          <ShareButtons slug={postData.slug} title={postData.title} />
        </header>

        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        <div className="cb-a-compartilhar">
          <ShareButtons slug={postData.slug} title={postData.title} />
        </div>

        {FEATURE_COMMENTS_ENABLED && <Comments slug={postData.slug} />}

        <section className="cb-a-convite" aria-labelledby="convite-heading">
          <h2 id="convite-heading">Quer ver a sua marca pelo lado da <em>Casa</em>?</h2>
          <p>
            Converse com Fabian sobre o seu negócio. A primeira conversa é gratuita e sem compromisso:
            você fala direto com ele, sem robô, e ele lê a sua marca com o método Casa × Rua.
          </p>
          <div className="cb-a-acoes">
            <a className="cb-a-btn cb-a-btn--casa" href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">
              Conversar com Fabian no WhatsApp<span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a
              className="cb-a-btn"
              href={MANIFESTO_PDF}
              download
              aria-label="Baixar o manifesto O Código Brasil gratuitamente (PDF)"
            >
              Baixar o manifesto grátis (PDF)
            </a>
          </div>
          <p className="cb-a-nota">
            O manifesto tem {produto.paginas}, {produto.tempoDeLeitura.toLowerCase()} de leitura, e baixa sem cadastro.
          </p>
        </section>
      </article>

      <div className="cb-a-coluna">
        <AuthorBio />
      </div>

      {relatedPosts.length > 0 && (
        <section className="cb-a-leia" aria-labelledby="leia-tambem-heading">
          <div className="cb-a-largo">
            <h2 id="leia-tambem-heading">Leia também</h2>
            <div className="cb-a-cards">
              {relatedPosts.map(({ slug, title, description }) => (
                <Link key={slug} href={`/conteudo/${slug}/`} className="cb-a-card">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span>Ler o artigo <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
