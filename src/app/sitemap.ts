import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/markdown';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData();

  let maxDate = new Date(0);
  const postsMap = posts.map((post) => {
    const d = new Date(post.updated || post.date);
    if (d > maxDate) maxDate = d;
    return {
      url: `${SITE_URL}/conteudo/${post.slug}/`,
      lastModified: d.toISOString().split('T')[0],
    };
  });

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/conteudo/`, lastModified: maxDate.toISOString().split('T')[0] },
    { url: `${SITE_URL}/privacidade/` },
    { url: `${SITE_URL}/termos/` },
    { url: `${SITE_URL}/reembolso/` },
    ...postsMap,
  ];
}
