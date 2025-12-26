'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { MobileMenu } from './MobileMenu'
import { SearchModal } from './SearchModal'

type HeaderCategory = {
  name: string
  slug: string
  isHome?: boolean
}

const CATEGORIES: HeaderCategory[] = [
  { name: 'Početna', slug: '', isHome: true },
  { name: 'Dolazak u Njemačku', slug: 'dolazak-u-njemacku' },
  { name: 'Povrat poreza', slug: 'povrat-poreza' },
  { name: 'Posao', slug: 'posao' },
  { name: 'Porodica', slug: 'porodica' },
  { name: 'Mirovina u Njemačkoj', slug: 'mirovina-u-njemackoj' },
]

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* INFO BAR */}
        <div className="bg-gray-900 text-gray-100 text-[12px]">
          <div className="max-w-[1320px] mx-auto px-4 py-1 flex justify-between items-center">
            <span className="uppercase tracking-wide font-semibold">
              Informativni portal
            </span>
            <span className="hidden md:inline text-gray-400">
              Život i rad u Njemačkoj
            </span>
          </div>
        </div>

        {/* MAIN HEADER */}
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="flex items-center justify-between h-[68px]">

            {/* LEFT: LOGO + NAV */}
            <div className="flex items-center gap-8">
              {/* LOGO */}
              <Link href="/" className="leading-tight">
                <div className="text-2xl font-black tracking-tight text-gray-900">
                  Go2Njemačka
                </div>
              </Link>

              {/* DESKTOP NAV */}
              <nav className="hidden lg:flex items-center gap-6">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.slug || 'home'}
                    href={category.isHome ? '/' : `/c/${category.slug}`}
                    className="
                      relative flex items-center gap-2
                      text-[15px] font-semibold tracking-normal
                      text-gray-800 hover:text-black
                      transition
                      after:absolute after:-bottom-1 after:left-0
                      after:h-[2px] after:w-0 after:bg-red-600
                      after:transition-all after:duration-200
                      hover:after:w-full
                    "
                  >
                    {!category.isHome && (
                      <span className="w-1 h-1 rounded-full bg-red-600"></span>
                    )}
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* RIGHT: SEARCH + MOBILE */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-red-600 transition"
                aria-label="Pretraga"
              >
                <Search className="w-5 h-5" />
              </button>

              <div className="lg:hidden">
                <MobileMenu categories={CATEGORIES} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH MODAL */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}
