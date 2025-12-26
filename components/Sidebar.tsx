import Link from 'next/link'
import { WPPost } from '@/lib/types'
import { formatBosnianDate } from '@/lib/date-utils'
import { TrendingUp, Flame, ArrowRight, BookOpen } from 'lucide-react'

interface SidebarProps {
  popularPosts?: WPPost[]
  showCTA?: boolean
}

export function Sidebar({
  popularPosts = [],
  showCTA = true,
}: SidebarProps) {
  return (
    <aside className="lg:sticky lg:top-24 space-y-6 h-fit">

      {/* ================= NAJČITANIJE ================= */}
      {popularPosts.length > 0 && (
        <section className="bg-white border border-gray-200 overflow-hidden">
          <header className="flex items-center gap-2 px-4 py-3 bg-red-600">
            <TrendingUp className="w-4 h-4 text-white" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              Najčitanije
            </h3>
          </header>

          <ul className="divide-y divide-gray-100">
            {popularPosts.slice(0, 5).map((post, index) => (
              <li key={post.id}>
                <Link
                  href={`/${post.slug}`}
                  className="group flex gap-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h4>
                    <time className="text-xs text-gray-500">
                      {formatBosnianDate(post.date)}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ================= NAJTRAŽENIJE TEME ================= */}
      <section className="bg-white border border-gray-200 overflow-hidden">
        <header className="flex items-center gap-2 px-4 py-3 bg-gray-900">
          <Flame className="w-4 h-4 text-white" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">
            Najtraženije teme
          </h3>
        </header>

        <ul className="divide-y divide-gray-100 text-sm">
          {[
            { name: 'Povrat poreza', slug: 'povrat-poreza' },
            { name: 'Posao u Njemačkoj', slug: 'posao' },
            { name: 'Dolazak u Njemačku', slug: 'dolazak-u-njemacku' },
            { name: 'Zdravstveno osiguranje', slug: 'zdravstveno-osiguranje' },
            { name: 'Spajanje porodice', slug: 'spajanje-porodice' },
          ].map((item) => (
            <li key={item.slug}>
              <Link
                href={`/c/${item.slug}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-800">
                  {item.name}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= CTA ================= */}
      {showCTA && (
        <section className="bg-gradient-to-br from-green-700 to-green-600 p-5 text-white">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wide">
              Vodič za Njemačku
            </h3>
          </div>

          <p className="text-sm text-green-100 mb-4 leading-relaxed">
            Kompletan vodič za život i rad u Njemačkoj – dokumenti, porez, posao i prava.
          </p>

          <Link
            href="/c/dolazak-u-njemacku"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 text-sm hover:bg-green-50 transition"
          >
            Počni ovdje
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      )}
    </aside>
  )
}
