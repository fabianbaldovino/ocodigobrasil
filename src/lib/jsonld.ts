import { SITE_URL, SITE_EMAIL } from "./site";

export const PERSON_ID = `${SITE_URL}/#person`;
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function generatePerson() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    "name": "Fabian Baldovino",
    "url": "https://www.fabian.art.br",
    "jobTitle": "Brand Filmmaker",
    "description": "Brand filmmaker em Porto Alegre e autor do manifesto O Código Brasil, sobre como o código cultural molda a decisão de compra do brasileiro.",
    "email": SITE_EMAIL
  };
}

export function generateOrganization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    "name": "O Código Brasil",
    "url": SITE_URL
  };
}

export function generateWebSite() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    "name": "O Código Brasil",
    "url": SITE_URL,
    "inLanguage": "pt-BR"
  };
}

export function generateCreativeWork(description: string) {
  return {
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/#manifesto`,
    "name": "O Código Brasil",
    "description": description,
    "image": `${SITE_URL}/capa_manifesto_o_codigo_brasil_fabian_baldovino.png`,
    "url": SITE_URL,
    "inLanguage": "pt-BR",
    "author": {
      "@id": PERSON_ID
    }
  };
}

export function generateFAQPage(qaPairs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    "mainEntity": qaPairs.map((qa) => ({
      "@type": "Question",
      "name": qa.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer
      }
    }))
  };
}

export function generateArticle(slug: string, title: string, description: string, date: string, ogImage: string, updated?: string) {
  const url = `${SITE_URL}/conteudo/${slug}/`;
  const article: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${url}#article`,
    "headline": title,
    "description": description,
    "datePublished": date,
    "author": {
      "@id": PERSON_ID
    },
    "publisher": {
      "@id": ORG_ID
    },
    "image": [ogImage],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "inLanguage": "pt-BR"
  };
  if (updated) {
    article["dateModified"] = updated;
  }
  return article;
}

export function buildGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes
  };
}
