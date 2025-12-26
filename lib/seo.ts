import { WPPost, WPSeoFields } from './types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tutorijali.org';
const ORIGIN_CANONICAL = process.env.ORIGIN_CANONICAL || 'https://go2njemacka.de';
const SITE_NAME = 'Go2Njemačka';

export function getCanonicalUrl(pathname: string): string {
  return `${ORIGIN_CANONICAL}${pathname}`;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export function generateMetaDescription(post: WPPost): string {
  if (post.seo?.metaDesc) {
    return post.seo.metaDesc;
  }

  if (post.excerpt) {
    return stripHtml(post.excerpt).substring(0, 160);
  }

  return stripHtml(post.content).substring(0, 160);
}

export function generateMetaTitle(post: WPPost): string {
  if (post.seo?.title) {
    return post.seo.title;
  }

  return `${post.title} | ${SITE_NAME}`;
}

export function getOgImage(post: WPPost): string | undefined {
  if (post.seo?.opengraphImage?.sourceUrl) {
    return post.seo.opengraphImage.sourceUrl;
  }

  if (post.featuredImage?.node?.mediaItemUrl) {
    return post.featuredImage.node.mediaItemUrl;
  }

  return undefined;
}

export const isTestDomain = SITE_URL.includes('tutorijali.org');
