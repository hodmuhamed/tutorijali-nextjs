import Link from 'next/link'
import { graphqlFetch } from '@/lib/wpgraphql'
import { QUERY_TOP_TAGS } from '@/lib/queries/TopTagsBar'

interface WPTag {
  id: string
  name: string
  slug: string
}

interface TopTagsData {
  tags?: {
    nodes?: WPTag[]
  }
}

export default async function TopTags() {
  const data = await graphqlFetch<TopTagsData>(
    QUERY_TOP_TAGS,
    {},
    { revalidate: 3600 }
  )

  const tags = data?.tags?.nodes ?? []
  if (!tags.length) return null

  return (
<div className="border-b border-gray-300 bg-white">    <div
      className="
        max-w-[1320px] mx-auto px-4
        flex gap-x-4 gap-y-1
        overflow-x-auto whitespace-nowrap
        text-[11px] uppercase tracking-wide
        text-gray-600
        py-3
      "
    >
      {tags.slice(0, 6).map(tag => (
        <Link
          key={tag.id}
          href={`/t/${tag.slug}`}
          className="flex items-center hover:text-red-600 transition-colors"
        >
          <span className="font-bold mr-1 text-gray-800">#</span>
          <span>{tag.name}</span>
        </Link>
      ))}
    </div>
  </div>
)

}
