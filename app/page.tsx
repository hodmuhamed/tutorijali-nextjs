import { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { graphqlFetch } from '@/lib/wpgraphql'
import {
  QUERY_LATEST_POSTS,
  QUERY_ALL_CATEGORIES,
  QUERY_POSTS_BY_CATEGORY,
} from '@/lib/queries'

import { HOME_FEATURED_QUERY } from '@/lib/queries/homeFeatured'
import { mapHomeFeatured } from '@/lib/mappers/homeFeatured'

import { WPPost, WPCategory } from '@/lib/types'
import TopTags from '@/components/TopTags'
import FeaturedGrid from '@/components/homepage/FeaturedGrid'
import { PostCard } from '@/components/PostCard'
import { Sidebar } from '@/components/Sidebar'

import { getCanonicalUrl } from '@/lib/seo'
import { getCategoryColor } from '@/lib/category-colors'
import { ChevronRight, TrendingUp } from 'lucide-react'

/* =========================
   🔥 ADSENSE – CLIENT ONLY
========================= */
const Adsense = dynamic(
  () => import('@/components/Adsense'),
  { ssr: false }
)

/* =========================
   SEO METADATA
========================= */
const canonical = getCanonicalUrl('/')

export const metadata: Metadata = {
  title: 'Go2Njemačka – Život i rad u Njemačkoj',
  description:
    'Sve što trebate znati o životu i radu u Njemačkoj: posao, porez, porodica, dokumenti i praktični savjeti.',
  alternates: { canonical },
  robots: 'index,follow',
}

/* =========================
   TYPES
========================= */
interface PostsData {
  posts?: { nodes?: WPPost[] }
}

interface CategoriesData {
  categories?: { nodes?: WPCategory[] }
}

/* =========================
   DATA FETCHERS
========================= */
async function getLatestPosts(): Promise<WPPost[]> {
  const data = await graphqlFetch<PostsData>(
    QUERY_LATEST_POSTS,
    { first: 30 },
    { revalidate: 300 }
  )
  return data?.posts?.nodes ?? []
}

async function getCategories(): Promise<WPCategory[]> {
  const data = await graphqlFetch<CategoriesData>(
    QUERY_ALL_CATEGORIES,
    {},
    { revalidate: 3600 }
  )
  return data?.categories?.nodes ?? []
}

async function getCategoryPosts(categoryId: number): Promise<WPPost[]> {
  const data = await graphqlFetch<PostsData>(
    QUERY_POSTS_BY_CATEGORY,
    { categoryId, first: 6 },
    { revalidate: 600 }
  )
  return data?.posts?.nodes ?? []
}

/* =========================
   PAGE
========================= */
export default async function Home() {
  const [latestPosts, categories, featuredRaw] = await Promise.all([
    getLatestPosts(),
    getCategories(),
    graphqlFetch<PostsData>(
      HOME_FEATURED_QUERY,
      {},
      { revalidate: 60, tags: ['home'] }
    ),
  ])

  const featuredPosts = featuredRaw?.posts?.nodes ?? []
  const featured = mapHomeFeatured(featuredPosts)

  const usedPostIds = new Set<string>([
    featured.heroCenter?.id,
    ...(featured.secondary?.map(p => p.id) ?? []),
  ].filter(Boolean) as string[])

  const mirovinaCategory = categories.find(
    cat => cat.slug === 'mirovina-u-njemackoj'
  )

  let mirovinaPopular: WPPost[] = []

  if (mirovinaCategory?.databaseId) {
    const posts = await getCategoryPosts(mirovinaCategory.databaseId)
    mirovinaPopular = posts
      .filter(p => p.id && !usedPostIds.has(p.id))
      .slice(0, 3)
  }

  const highlightCategories = categories.filter(cat =>
    ['dolazak-u-njemacku', 'povrat-poreza', 'posao', 'savjeti'].includes(cat.slug)
  )

  const categoryPostsMap: Record<string, WPPost[]> = Object.fromEntries(
    await Promise.all(
      highlightCategories.map(async cat => {
        if (!cat.databaseId) return [cat.slug, []]
        const posts = await getCategoryPosts(cat.databaseId)
        return [
          cat.slug,
          posts.filter(p => p.id && !usedPostIds.has(p.id)),
        ]
      })
    )
  )

  return (
    <div className="bg-gray-100">

      <div className="max-w-[1320px] mx-auto px-4 pt-4 pb-4">
        <div className="mb-3 border-b border-gray-300 pb-2">
          <TopTags />
        </div>

        <FeaturedGrid {...featured} />
      </div>

      {/* ===== ADSENSE (SAFE) ===== */}
      <div className="max-w-[1320px] mx-auto px-4 mb-10">
        <Adsense
          slot="1071050222"
          minHeight={280}
          className="bg-white border border-gray-200 rounded-md"
        />
      </div>

      <div className="max-w-[1320px] mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <main className="lg:col-span-2 space-y-10">

            {mirovinaPopular.length > 0 && (
              <section className="bg-white border-l-4 border-red-600 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                    <h2 className="text-xl font-bold uppercase">
                      Mirovina u Njemačkoj
                    </h2>
                  </div>

                  <Link href="/c/mirovina-u-njemackoj">
                    Vidi sve <ChevronRight className="inline w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {mirovinaPopular.map(post => (
                    <PostCard key={post.id} post={post} variant="featured" />
                  ))}
                </div>
              </section>
            )}

            <Adsense
              slot="8772345229"
              minHeight={250}
              className="bg-white border border-gray-200 rounded-md"
            />

            {highlightCategories.map(category => {
              const posts = categoryPostsMap[category.slug] ?? []
              if (!posts.length) return null

              const colors = getCategoryColor(category.slug)

              return (
                <section
                  key={category.id}
                  className={`bg-white border-l-4 ${colors.border} p-6`}
                >
                  <h2 className={`text-xl font-bold uppercase ${colors.text}`}>
                    {category.name}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    {posts.slice(0, 4).map(post => (
                      <PostCard key={post.id} post={post} variant="compact" />
                    ))}
                  </div>
                </section>
              )
            })}
          </main>

          <aside className="lg:col-span-1 space-y-6">
            <Sidebar showCTA />

            <div className="hidden lg:block sticky top-24">
              <Adsense
                slot="4434342095"
                minHeight={600}
                className="bg-white border border-gray-200 rounded-md"
              />
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
