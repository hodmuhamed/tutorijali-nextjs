'use client'

import { useEffect, useRef, useState } from 'react'

type AdsenseProps = {
  slot: string
  minHeight?: number
  className?: string
}

export default function Adsense({
  slot,
  minHeight = 250,
  className = '',
}: AdsenseProps) {
  const adRef = useRef<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!adRef.current || loaded) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          try {
            // @ts-ignore
            window.adsbygoogle = window.adsbygoogle || []
            // @ts-ignore
            window.adsbygoogle.push({})
            setLoaded(true)
          } catch (err) {
            console.error('Adsense error:', err)
          }
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(adRef.current)
    return () => observer.disconnect()
  }, [loaded])

  return (
    <div ref={adRef} className={className} style={{ minHeight }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight }}
        data-ad-client="ca-pub-7632125522495008"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
