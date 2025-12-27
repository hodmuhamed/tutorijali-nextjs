'use client'

import { useEffect } from 'react'

import { ROOT_FALLBACK_TITLE } from '@/lib/seo'

export function TitleGuard() {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const ensureTitle = () => {
      let titleElement = document.querySelector('head > title')

      if (!titleElement) {
        titleElement = document.createElement('title')
        document.head.prepend(titleElement)
      }

      const current = (titleElement.textContent || document.title || '').trim()
      const isMissingTitle = !current || current.toLowerCase() === 'untitled'

      if (isMissingTitle) {
        titleElement.textContent = ROOT_FALLBACK_TITLE
        document.title = ROOT_FALLBACK_TITLE
      }
    }

    ensureTitle()

    const observer = new MutationObserver(ensureTitle)
    observer.observe(document.head, {
      childList: true,
      characterData: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return null
}
