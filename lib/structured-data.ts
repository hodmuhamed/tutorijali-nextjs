import { WPPost } from './types';
import { getOgImage } from './seo';

export function generateArticleStructuredData(post: WPPost, canonicalUrl: string) {
  const ogImage = getOgImage(post);
  const category = post.categories?.nodes?.[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: ogImage ? [ogImage] : [],
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      '@type': 'Organization',
      name: 'Go2Njemačka',
      url: 'https://go2njemacka.de',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Go2Njemačka',
      url: 'https://go2njemacka.de',
      logo: {
        '@type': 'ImageObject',
        url: 'https://go2njemacka.de/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    articleSection: category?.name || 'Općenito',
    keywords: post.tags?.nodes?.map((tag) => tag.name).join(', ') || '',
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
