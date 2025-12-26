import { WPPost } from '@/lib/types'

export interface HomeFeaturedMapped {
  heroCenter: WPPost | null
  secondary: WPPost[]
  sidebar: WPPost[]
}

export function mapHomeFeatured(
  posts: WPPost[] | null | undefined
): HomeFeaturedMapped {
  // 🛑 HARD FAILSAFE
  if (!Array.isArray(posts) || posts.length === 0) {
    return {
      heroCenter: null,
      secondary: [],
      sidebar: [],
    }
  }

  // 🛡 FILTER: samo validni postovi
  const safePosts = posts.filter(
    (p): p is WPPost => Boolean(p && p.id)
  )

  if (safePosts.length === 0) {
    return {
      heroCenter: null,
      secondary: [],
      sidebar: [],
    }
  }

  const hero = safePosts[0]

  return {
    heroCenter: {
      ...hero,
      // 🔒 GARANTUJ STRUKTURU
      tags: hero.tags ?? { nodes: [] },
    },

    secondary: safePosts
      .slice(1, 11)
      .map(p => ({
        ...p,
        tags: p.tags ?? { nodes: [] },
      })),

    sidebar: safePosts
      .slice(11, 20)
      .map(p => ({
        ...p,
        tags: p.tags ?? { nodes: [] },
      })),
  }
}
