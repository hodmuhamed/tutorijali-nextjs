'use client'

import { useEffect } from 'react'

const HARD_FALLBACK_TITLE = 'Go2Njemačka – Život i rad u Njemačkoj'

export function TitleGuard() {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const titleElement = document.querySelector('title')
    const initialTitle =
      (titleElement?.textContent || document.title || '').trim() ||
      HARD_FALLBACK_TITLE

    const enforceTitle = () => {
      const current = (titleElement?.textContent || document.title || '').trim()
      if (!current) {
        document.title = initialTitle
      }
    }

    enforceTitle()

    if (!titleElement) return

    const observer = new MutationObserver(enforceTitle)
    observer.observe(titleElement, {
      characterData: true,
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return null
}
