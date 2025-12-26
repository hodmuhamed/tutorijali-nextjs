import Link from 'next/link'
import Image from 'next/image'
import { WPPost } from '@/lib/types'
import { formatBosnianDate } from '@/lib/date-utils'
import { stripHtml } from '@/lib/seo'
import { Clock } from 'lucide-react'

interface PostCardProps {
  post: WPPost
  variant?:
    | 'hero'
    | 'featured'
    | 'featured-small'
    | 'horizontal'
    | 'compact'
    | 'standard'
  showPopularBadge?: boolean
}

/* =========================
   SAFE HELPERS
========================= */
function isNewPost(dateString?: string | null): boolean {
  if (!dateString) return false

  const time = new Date(dateString).getTime()
  if (Number.isNaN(time)) return false

  return (Date.now() - time) / (1000 * 60 * 60 * 24) <= 7
}

function getImage(post: WPPost): string {
  return (
    post.featuredImage?.node?.mediaItemUrl ||
    '/images/fallback-default.jpg'
  )
}

function getExcerpt(post: WPPost, words = 30): string {
  if (!post.excerpt) return ''
  return stripHtml(post.excerpt).split(' ').slice(0, words).join(' ')
}

/* =========================
   COMPONENT
========================= */
export function PostCard({
  post,
  variant = 'standard',
  showPopularBadge = false,
}: PostCardProps) {
  // 🔒 HARD FAILSAFE
  if (!post || !post.id) return null

  const slug = post.slug ?? ''
  const title = post.title ?? ''
  const date = post.date ?? null

  const category = post.categories?.nodes?.[0]
  const imageUrl = getImage(post)
  const excerpt30 = getExcerpt(post, 30)
  const isNew = isNewPost(date)

  /* =========================
     HERO – LCP TARGET
  ========================= */
  if (variant === 'hero') {
    return (
      <Link href={`/${slug}`} className="group block h-full">
        <article className="bg-white overflow-hidden h-full hover:shadow-xl transition">
          <div className="bg-gray-100 relative">
            <Image
              src={imageUrl}
              alt={title}
              width={1320}
              height={566}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 1320px"
              className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />

            {category && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1">
                {category.name}
              </span>
            )}

            {(isNew || showPopularBadge) && (
              <span className="absolute top-4 right-4 bg-black/80 text-white text-[11px] px-2 py-1">
                {isNew ? 'NOVO' : 'POPULARNO'}
              </span>
            )}
          </div>

          <div className="p-6 lg:p-8">
            <h2 className="font-serif text-[20px] sm:text-[22px] lg:text-[26px] font-bold leading-snug mb-3 text-gray-900 group-hover:text-red-600 transition">
              {title}
            </h2>

            {excerpt30 && (
              <p className="text-[14px] text-gray-600 leading-relaxed line-clamp-2 mb-4">
                {excerpt30}…
              </p>
            )}

            {date && (
              <div className="flex items-center gap-2 text-[12px] text-gray-500">
                <Clock className="w-4 h-4" />
                {formatBosnianDate(date)}
              </div>
            )}
          </div>
        </article>
      </Link>
    )
  }

  /* =========================
     FEATURED SMALL
  ========================= */
  if (variant === 'featured-small') {
    return (
      <Link href={`/${slug}`} className="group block">
        <article className="bg-white border border-gray-100 h-[92px] flex hover:shadow-sm transition">
          <Image
            src={imageUrl}
            alt={title}
            width={120}
            height={92}
            loading="lazy"
            sizes="120px"
            className="object-cover w-[120px] h-[92px]"
          />

          <div className="p-3 flex flex-col justify-between flex-1">
            <h3 className="font-serif text-[14px] font-semibold leading-snug line-clamp-2 text-gray-900 group-hover:text-red-600 transition">
              {title}
            </h3>

            {date && (
              <time className="text-[11px] text-gray-400">
                {formatBosnianDate(date)}
              </time>
            )}
          </div>
        </article>
      </Link>
    )
  }

  /* =========================
     FEATURED
  ========================= */
  if (variant === 'featured') {
    return (
      <Link href={`/${slug}`} className="group block h-full">
        <article className="bg-white border border-gray-200 h-full flex flex-col hover:shadow-md transition">
          <Image
            src={imageUrl}
            alt={title}
            width={420}
            height={236}
            loading="lazy"
            sizes="(max-width:768px) 100vw, 420px"
            className="w-full h-auto object-cover"
          />

          <div className="p-4 flex flex-col gap-1 flex-1">
            {category && (
              <span className="text-[11px] uppercase font-semibold text-gray-400">
                {category.name}
              </span>
            )}

            <h3 className="font-serif text-[15px] font-bold leading-snug line-clamp-2 text-gray-900 group-hover:text-red-600 transition">
              {title}
            </h3>

            {date && (
              <time className="text-[11px] text-gray-400 mt-auto">
                {formatBosnianDate(date)}
              </time>
            )}
          </div>
        </article>
      </Link>
    )
  }

  /* =========================
     HORIZONTAL
  ========================= */
  if (variant === 'horizontal') {
    return (
      <Link href={`/${slug}`} className="group block">
        <article className="flex flex-col sm:flex-row bg-white border border-gray-200 hover:shadow-sm transition">
          <Image
            src={imageUrl}
            alt={title}
            width={520}
            height={293}
            loading="lazy"
            sizes="(max-width:768px) 100vw, 520px"
            className="w-full sm:w-[42%] h-auto object-cover"
          />

          <div className="p-4 flex flex-col justify-between flex-1">
            {category && (
              <span className="text-[11px] uppercase font-semibold text-gray-400 mb-1">
                {category.name}
              </span>
            )}

            <h3 className="font-serif font-bold text-gray-900 text-[15px] sm:text-[18px] leading-snug line-clamp-2 mb-2 group-hover:text-red-600 transition">
              {title}
            </h3>

            {excerpt30 && (
              <p className="text-gray-600 text-[13px] sm:text-[14px] leading-relaxed line-clamp-2 mb-3">
                {excerpt30}…
              </p>
            )}

            {date && (
              <time className="text-[11px] text-gray-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatBosnianDate(date)}
              </time>
            )}
          </div>
        </article>
      </Link>
    )
  }

  /* =========================
     STANDARD
  ========================= */
  return (
    <Link href={`/${slug}`} className="group block">
      <article className="bg-white border border-gray-200 p-4 flex gap-3 items-start hover:shadow-sm transition-shadow">
        <Image
          src={imageUrl}
          alt={title}
          width={64}
          height={64}
          loading="lazy"
          sizes="64px"
          className="rounded object-cover flex-shrink-0"
        />

        <div className="flex flex-col">
          <h3 className="font-serif text-[15px] font-bold line-clamp-2 mb-1 text-gray-900 group-hover:text-red-600 transition-colors">
            {title}
          </h3>

          {date && (
            <time className="text-[12px] text-gray-500">
              {formatBosnianDate(date)}
            </time>
          )}
        </div>
      </article>
    </Link>
  )
}
