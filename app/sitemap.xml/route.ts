import { NextResponse } from 'next/server';
import { graphqlFetch } from '@/lib/wpgraphql';
import {
  QUERY_ALL_POSTS_SLUGS,
  QUERY_ALL_CATEGORIES_SLUGS,
  QUERY_ALL_TAGS_SLUGS,
} from '@/lib/queries';

const ORIGIN_CANONICAL = process.env.ORIGIN_CANONICAL || 'https://go2njemacka.de';

interface PostSlug {
  slug: string;
  modified: string;
}

interface Slug {
  slug: string;
}

interface PostsData {
  posts: {
    nodes: PostSlug[];
  };
}

interface CategoriesData {
  categories: {
    nodes: Slug[];
  };
}

interface TagsData {
  tags: {
    nodes: Slug[];
  };
}

async function getAllPostsSlugs(): Promise<PostSlug[]> {
  try {
    const data = await graphqlFetch<PostsData>(
      QUERY_ALL_POSTS_SLUGS,
      {},
      { revalidate: 3600 }
    );
    return data.posts?.nodes || [];
  } catch (error) {
    console.error('Error fetching posts slugs:', error);
    return [];
  }
}

async function getAllCategoriesSlugs(): Promise<Slug[]> {
  try {
    const data = await graphqlFetch<CategoriesData>(
      QUERY_ALL_CATEGORIES_SLUGS,
      {},
      { revalidate: 3600 }
    );
    return data.categories?.nodes || [];
  } catch (error) {
    console.error('Error fetching categories slugs:', error);
    return [];
  }
}

async function getAllTagsSlugs(): Promise<Slug[]> {
  try {
    const data = await graphqlFetch<TagsData>(
      QUERY_ALL_TAGS_SLUGS,
      {},
      { revalidate: 3600 }
    );
    return data.tags?.nodes || [];
  } catch (error) {
    console.error('Error fetching tags slugs:', error);
    return [];
  }
}

function generateSitemapXml(
  posts: PostSlug[],
  categories: Slug[],
  tags: Slug[]
): string {
  const urls: string[] = [];

  urls.push(`
  <url>
    <loc>${ORIGIN_CANONICAL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`);

  posts.forEach((post) => {
    urls.push(`
  <url>
    <loc>${ORIGIN_CANONICAL}/${post.slug}</loc>
    <lastmod>${new Date(post.modified).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  categories.forEach((category) => {
    urls.push(`
  <url>
    <loc>${ORIGIN_CANONICAL}/c/${category.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`);
  });

  tags.forEach((tag) => {
    urls.push(`
  <url>
    <loc>${ORIGIN_CANONICAL}/t/${tag.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;
}

export async function GET() {
  const [posts, categories, tags] = await Promise.all([
    getAllPostsSlugs(),
    getAllCategoriesSlugs(),
    getAllTagsSlugs(),
  ]);

  const sitemap = generateSitemapXml(posts, categories, tags);

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
