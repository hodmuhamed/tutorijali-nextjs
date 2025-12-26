'use client'

import { useState } from 'react'
import { X, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query)}`)
    onClose()
    setQuery('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0 flex justify-center pt-24 px-4">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-6 relative">
          
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-black"
          >
            <X className="w-6 h-6" />
          </button>

          {/* LOGO */}
          <div className="text-center mb-6">
            <div className="text-2xl font-black">Go2Njemačka</div>
          </div>

          {/* SEARCH */}
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pretraži vijesti…"
                className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-5 text-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* HINT */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Pritisni Enter za pretragu
          </p>
        </div>
      </div>
    </div>
  )
}
