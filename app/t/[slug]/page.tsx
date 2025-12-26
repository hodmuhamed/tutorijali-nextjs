import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { graphqlFetch } from '@/lib/wpgraphql';
import { QUERY_TAG_BY_SLUG, QUERY_LATEST_POSTS, QUERY_ALL_CATEGORIES } from '@/lib/queries';
import { WPTagWithPosts, WPPost, WPCategory } from '@/lib/types';
import { PostCard } from '@/components/PostCard';
import { Pagination } from '@/components/Pagination';
import { Sidebar } from '@/components/Sidebar';
import { getCanonicalUrl, isTestDomain, stripHtml } from '@/lib/seo';
import { Tag as TagIcon } from 'lucide-react';

interface TagData {
  tag: WPTagWithPosts | null;
}

interface PostsData {
  posts: {
    nodes: WPPost[];
  };
}

interface CategoriesData {
  categories: {
    nodes: WPCategory[];
  };
}

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    after?: string;
  };
}

async function getTag(slug: string, after?: string): Promise<WPTagWithPosts | null> {
  try {
    const data = await graphqlFetch<TagData>(
      QUERY_TAG_BY_SLUG,
      { slug, first: 12, after: after || null },
      { revalidate: 300 }
    );
    return data.tag;
  } catch (error) {
    console.error('Error fetching tag:', error);
    return null;
  }
}

async function getLatestPosts(): Promise<WPPost[]> {
  try {
    const data = await graphqlFetch<PostsData>(
      QUERY_LATEST_POSTS,
      { first: 10 },
      { revalidate: 300 }
    );
    return data.posts?.nodes || [];
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
}

async function getCategories(): Promise<WPCategory[]> {
  try {
    const data = await graphqlFetch<CategoriesData>(
      QUERY_ALL_CATEGORIES,
      {},
      { revalidate: 3600 }
    );
    return data.categories?.nodes || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tag = await getTag(params.slug);

  if (!tag) {
    return {
      title: 'Oznaka nije pronađena | Go2Njemačka',
    };
  }

  const canonical = getCanonicalUrl(`/t/${tag.slug}`);
  const description = tag.description
    ? stripHtml(tag.description).substring(0, 160)
    : `Pogledajte sve članke označene sa ${tag.name} na Go2Njemačka.`;

  return {
    title: `${tag.name} | Go2Njemačka`,
    description,
    alternates: {
      canonical,
    },
    robots: isTestDomain ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: `${tag.name} | Go2Njemačka`,
      description,
      url: canonical,
      siteName: 'Go2Njemačka',
      locale: 'bs_BA',
      type: 'website',
    },
  };
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const [tag, latestPosts, categories] = await Promise.all([
    getTag(params.slug, searchParams.after),
    getLatestPosts(),
    getCategories(),
  ]);

  if (!tag || !tag.posts) {
    notFound();
  }

  const posts = tag.posts.edges?.map((edge) => edge.node) || tag.posts.nodes || [];
  const pageInfo = tag.posts.pageInfo;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <main className="lg:col-span-2">
            <header className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TagIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl md:text-4xl font-black text-gray-900">#</span>
                  <h1 className="text-3xl md:text-4xl font-black text-gray-900">{tag.name}</h1>
                </div>
              </div>
              {tag.description && (
                <p className="text-base text-gray-600 leading-relaxed mb-3">{stripHtml(tag.description)}</p>
              )}
              {tag.count !== undefined && (
                <p className="text-sm text-gray-500 font-medium">{tag.count} {tag.count === 1 ? 'članak' : 'članaka'}</p>
              )}
            </header>

            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} variant="featured" />
                  ))}
                </div>

                <Pagination
                  hasNextPage={pageInfo.hasNextPage}
                  hasPreviousPage={pageInfo.hasPreviousPage}
                  nextCursor={pageInfo.endCursor}
                  prevCursor={pageInfo.startCursor}
                  baseUrl={`/t/${tag.slug}`}
                />
              </>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <TagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Nema objavljenih članaka sa ovom oznakom.</p>
              </div>
            )}
          </main>

          <aside className="lg:col-span-1">
  <Sidebar
    popularPosts={latestPosts.slice(0, 5)}
    showCTA
  />
</aside>
        </div>
      </div>
    </div>
  );
}
