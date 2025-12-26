'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FaqItem } from '@/lib/faq'

export default function FaqAccordionClient({
  items,
}: {
  items: FaqItem[]
}) {
  const [open, setOpen] = useState<number | null>(null)

  if (!items || !items.length) return null

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={i}
            className="border rounded-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex justify-between px-5 py-4 text-left hover:bg-gray-50"
            >
              <span className="font-semibold">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 text-gray-700">
                {item.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
