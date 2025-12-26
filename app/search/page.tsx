import { Metadata } from 'next';
import { graphqlFetch } from '@/lib/wpgraphql';
import { QUERY_SEARCH_POSTS, QUERY_LATEST_POSTS, QUERY_ALL_CATEGORIES } from '@/lib/queries';
import { WPPost, WPCategory } from '@/lib/types';
import { PostCard } from '@/components/PostCard';
import { Sidebar } from '@/components/Sidebar';
import { getCanonicalUrl, isTestDomain } from '@/lib/seo';
import { Search as SearchIcon } from 'lucide-react';

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
  searchParams: {
    q?: string;
  };
}

export function generateMetadata({ searchParams }: PageProps): Metadata {
  const query = searchParams.q || '';
  const canonical = getCanonicalUrl('/search');

  return {
    title: query ? `Rezultati pretrage za "${query}" | Go2Njemačka` : 'Pretraga | Go2Njemačka',
    description: 'Pretražite članke na Go2Njemačka.',
    alternates: {
      canonical,
    },
    robots: isTestDomain ? 'noindex,nofollow' : 'noindex,follow',
  };
}

async function searchPosts(query: string): Promise<WPPost[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const data = await graphqlFetch<PostsData>(
      QUERY_SEARCH_POSTS,
      { search: query, first: 20 },
      { revalidate: 60 }
    );
    return data.posts?.nodes || [];
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
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

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q || '';

  const [posts, latestPosts, categories] = await Promise.all([
    query ? searchPosts(query) : Promise.resolve([]),
    getLatestPosts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <main className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <SearchIcon className="w-6 h-6 text-gray-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900">Pretraga</h1>
              </div>

              {query && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-base text-gray-700">
                    Rezultati za: <span className="font-bold text-gray-900">&quot;{query}&quot;</span>
                    {posts.length > 0 && (
                      <span className="text-gray-600 ml-2">
                        ({posts.length} {posts.length === 1 ? 'rezultat' : 'rezultata'})
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {!query ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Započnite pretragu</h2>
                <p className="text-gray-600">Unesite termin za pretragu u polje gore.</p>
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} variant="featured" />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Nema rezultata</h2>
                <p className="text-gray-600 mb-4">
                  Nismo pronašli članke koji odgovaraju vašoj pretrazi: &quot;{query}&quot;
                </p>
                <p className="text-sm text-gray-500">
                  Pokušajte sa drugim terminom ili pregledajte najnovije članke u sidebaru.
                </p>
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
