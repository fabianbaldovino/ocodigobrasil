import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'CCBot', 'anthropic-ai', 'PerplexityBot'],
        allow: '/',
      }
    ],
    sitemap: 'https://ocodigobrasil.com.br/sitemap.xml',
  };
}
