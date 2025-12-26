import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { graphqlFetch } from '@/lib/wpgraphql'
import {
  QUERY_POST_BY_SLUG,
  QUERY_RELATED_POSTS,
  QUERY_LATEST_POSTS,
} from '@/lib/queries'

import { WPPost } from '@/lib/types'
import { formatBosnianDate } from '@/lib/date-utils'
import { sanitizeContent } from '@/lib/sanitize'

import { getCanonicalUrl } from '@/lib/seo'

import {
  generateArticleStructuredData,
  generateBreadcrumbStructuredData,
} from '@/lib/structured-data'

import { extractFaqFromHtml, buildFaqJsonLd } from '@/lib/faq'

import FaqAccordion from '@/components/FaqAccordion'
import { PostCard } from '@/components/PostCard'
import { Sidebar } from '@/components/Sidebar'
import Adsense from '@/components/Adsense'

import { Clock, Calendar } from 'lucide-react'

/* ================= TYPES ================= */
interface PageProps {
  params: {
    postSlug: string
  }
}

/* ================= DATA ================= */
async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const data = await graphqlFetch<{ post: WPPost | null }>(
      QUERY_POST_BY_SLUG,
      { slug },
      { revalidate: 300 }
    )
    return data.post ?? null
  } catch {
    return null
  }
}

async function getRelatedPosts(categoryIds: string[], excludeId: string) {
  if (!categoryIds.length) return []

  try {
    const data = await graphqlFetch<{ posts: { nodes: WPPost[] } }>(
      QUERY_RELATED_POSTS,
      { categoryIn: categoryIds, notIn: [excludeId], first: 4 },
      { revalidate: 600 }
    )
    return data.posts?.nodes ?? []
  } catch {
    return []
  }
}

async function getLatestPosts() {
  try {
    const data = await graphqlFetch<{ posts: { nodes: WPPost[] } }>(
      QUERY_LATEST_POSTS,
      { first: 8 },
      { revalidate: 300 }
    )
    return data.posts?.nodes ?? []
  } catch {
    return []
  }
}

/* ================= METADATA ================= */
export function generateMetadata({ params }: PageProps): Metadata {
  const canonical = getCanonicalUrl(`/${params.postSlug}`)
  const formattedTitle = params.postSlug
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

  return {
    title: `${formattedTitle} | Go2Njemačka`,
    description:
      'Pročitajte cijeli članak na Go2Njemačka uz provjerene informacije o životu i radu u Njemačkoj.',
    alternates: { canonical },
    robots: 'index,follow',
  }
}

/* ================= PAGE ================= */
export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.postSlug)
  if (!post) notFound()

  const categoryNodes = post.categories?.nodes ?? []
  const categoryIds = categoryNodes.map(c => c.id)

  const [relatedPosts, latestPosts] = await Promise.all([
    getRelatedPosts(categoryIds, post.id),
    getLatestPosts(),
  ])

  const category = categoryNodes[0]
  const featuredImage = post.featuredImage?.node
  const canonical = getCanonicalUrl(`/${post.slug}`)

  const rawContent = typeof post.content === 'string' ? post.content : ''
  const contentHtml = sanitizeContent(rawContent)

  /* FAQ */
  const faqItems = extractFaqFromHtml(rawContent)
    .filter(f => f.question && f.answer)
    .slice(0, 8)

  const faqLD = faqItems.length ? buildFaqJsonLd(faqItems) : null

  /* STRUCTURED DATA */
  const articleLD = generateArticleStructuredData(post, canonical)
  const breadcrumbLD = generateBreadcrumbStructuredData([
    { name: 'Početna', url: 'https://go2njemacka.de' },
    ...(category
      ? [{ name: category.name, url: `/c/${category.slug}` }]
      : []),
    { name: post.title, url: canonical },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      {faqLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
        />
      )}

      <div className="bg-gray-50">
        <div className="mx-auto max-w-[1320px] px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

            {/* ================= MAIN ================= */}
            <main>
              <article className="bg-white border rounded-xl overflow-hidden">

                {featuredImage && (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={featuredImage.mediaItemUrl}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="px-6 py-6">

                  {category && (
                    <Link
                      href={`/c/${category.slug}`}
                      className="text-xs font-bold uppercase text-red-600"
                    >
                      {category.name}
                    </Link>
                  )}

                  <h1 className="font-serif font-bold text-[28px] my-4">
                    {post.title}
                  </h1>

                  {/* ===== TOP ARTICLE AD ===== */}
                  <div className="my-6">
                    <Adsense
                      slot="4434342095"
                      minHeight={280}
                      className="bg-white border border-gray-200"
                    />
                  </div>

                  <div className="flex gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatBosnianDate(post.date)}
                    </span>

                    {post.modified && post.modified !== post.date && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Ažurirano: {formatBosnianDate(post.modified)}
                      </span>
                    )}
                  </div>

                  {/* ===== ARTICLE CONTENT (CUSTOM) ===== */}
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />

                  {/* ===== INLINE CONTENT AD ===== */}
                  <div className="my-10">
                    <Adsense
                      slot="4434342095"
                      minHeight={250}
                      className="bg-white border border-gray-200"
                    />
                  </div>

                  {faqItems.length > 0 && (
                    <FaqAccordion items={faqItems} />
                  )}
                </div>
              </article>

              {relatedPosts.length > 0 && (
                <section className="mt-10">
                  <h2 className="font-black uppercase mb-4">
                    Slični članci
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {relatedPosts.map(p => (
                      <PostCard key={p.id} post={p} variant="featured" />
                    ))}
                  </div>
                </section>
              )}
            </main>

            {/* ================= SIDEBAR ================= */}
            <aside className="space-y-6">
              <Sidebar popularPosts={latestPosts.slice(0, 5)} showCTA />

              <div className="hidden lg:block sticky top-24">
                <Adsense
                  slot="4434342095"
                  minHeight={600}
                  className="bg-white border border-gray-200"
                />
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  )
}
