import Image from 'next/image'
import Link from 'next/link'

import { formatBosnianDate } from '@/lib/date-utils'
import { getCategoryColor } from '@/lib/category-colors'
import { WPPost } from '@/lib/types'

interface CategorySectionProps {
  title: string
  slug?: string
  description?: string
  posts: WPPost[]
  eyebrow?: string
  viewAllHref?: string
}

function getImage(post: WPPost): string {
  return (
    post.featuredImage?.node?.mediaItemUrl || '/images/fallback-default.jpg'
  )
}

export function CategorySection({
  title,
  slug,
  description,
  posts,
  eyebrow,
  viewAllHref,
}: CategorySectionProps) {
  if (!posts?.length) return null

  const colors = getCategoryColor(slug)

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      aria-labelledby={`${slug || title}-heading`}
    >
      <div
        className={`absolute inset-y-0 left-0 w-1 ${colors.accent}`}
        aria-hidden
      />

      <div className="px-6 pt-6 pb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {eyebrow && (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${colors.bg} ${colors.text}`}
              >
                {eyebrow}
              </span>
            )}
            <div className="h-px flex-1 bg-gray-200 sm:hidden" aria-hidden />
          </div>

          <div className="flex items-center gap-3">
            <h2
              id={`${slug || title}-heading`}
              className={`text-2xl font-semibold tracking-tight text-gray-900 ${colors.text}`}
            >
              {title}
            </h2>
            <span className={`hidden sm:block h-6 w-1 rounded-full ${colors.accent}`} />
          </div>

          {description && (
            <p className="max-w-3xl text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-gray-700 transition hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white hover:shadow-sm"
          >
            Vidi sve
            <span aria-hidden className="text-lg leading-none">→</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 pb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.slice(0, 4).map(post => (
          <Link
            key={post.id}
            href={`/${post.slug}`}
            className="group block h-full"
          >
            <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={getImage(post)}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" aria-hidden />
              </div>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-lg font-semibold leading-snug text-gray-900 transition group-hover:text-red-700">
                  {post.title}
                </h3>

                {post.date && (
                  <time
                    dateTime={post.date}
                    className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-gray-500"
                  >
                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors.accent}`} aria-hidden />
                    {formatBosnianDate(post.date)}
                  </time>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategorySection
