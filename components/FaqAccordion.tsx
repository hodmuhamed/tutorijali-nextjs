'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FaqItem } from '@/lib/faq'

interface Props {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!items.length) return null

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="font-serif text-[22px] sm:text-[26px] font-bold mb-6">
        Često postavljana pitanja
      </h2>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50"
              >
                <span className="font-semibold text-gray-900">
                  {item.question}
                </span>

                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
