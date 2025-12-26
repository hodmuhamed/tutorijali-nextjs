import { WPPost } from '@/lib/types'
import { PostCard } from '@/components/PostCard'

interface FeaturedGridProps {
  heroCenter: WPPost | null
  secondary: WPPost[]
}

export default function FeaturedGrid({
  heroCenter,
  secondary,
}: FeaturedGridProps) {
  // 🛑 HARD FAILSAFE
  if (!heroCenter || !heroCenter.id) return null

  // 🛡 FILTER: samo validni postovi
  const safeSecondary = Array.isArray(secondary)
    ? secondary.filter(p => p && p.id)
    : []

  const rightPosts = safeSecondary.slice(0, 6)
  const bottomPosts = safeSecondary.slice(6, 10)

  return (
    <section className="mb-8">
      {/* ================= FEATURED GRID ================= */}
      <div
        className="
          grid grid-cols-1 lg:grid-cols-3 gap-4
          lg:min-h-[520px]
        "
      >
        {/* ================= HERO ================= */}
        <div className="lg:col-span-2 h-full">
          <PostCard post={heroCenter} variant="hero" />
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div
          className="
            flex flex-col
            gap-2 lg:gap-3
            h-full
            min-h-[520px]
          "
        >
          {rightPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              variant="featured-small"
            />
          ))}
        </div>
      </div>

      {/* ================= BOTTOM GRID ================= */}
      {bottomPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {bottomPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              variant="featured"
            />
          ))}
        </div>
      )}
    </section>
  )
}
