import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/markdown';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData();

  return [
    {
      url: 'https://ocodigobrasil.com.br',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://ocodigobrasil.com.br/conteudo/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `https://ocodigobrasil.com.br/conteudo/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
