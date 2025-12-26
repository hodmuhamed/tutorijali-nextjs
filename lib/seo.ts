import { WPPost, WPSeoFields } from './types';

export const CANONICAL_ORIGIN = 'https://go2njemacka.de';

const siteUrlEnv = process.env.NEXT_PUBLIC_SITE_URL;
const SITE_URL = siteUrlEnv || CANONICAL_ORIGIN;
const SITE_NAME = 'Go2Njemačka';

export function getCanonicalUrl(pathname: string): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${CANONICAL_ORIGIN}${normalizedPath}`;
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

export const isTestDomain = Boolean(siteUrlEnv && siteUrlEnv.includes('tutorijali.org'));
