import React from 'react';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

function toRelative(url: string): string {
  if (url.startsWith(SITE_URL)) {
    return url.slice(SITE_URL.length) || '/';
  }
  return url;
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <nav aria-label="Trilha de navegação" className="breadcrumbs" style={{ marginBottom: '2rem' }}>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: 'var(--fs-sm)' }}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.url} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isLast ? (
                  <span aria-current="page" style={{ color: 'var(--text-muted)' }}>{item.name}</span>
                ) : (
                  <>
                    <Link href={toRelative(item.url)} style={{ color: 'var(--accent-text)', textDecoration: 'none' }}>
                      {item.name}
                    </Link>
                    <span style={{ color: 'var(--text-faint)' }} aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
