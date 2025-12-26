'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: unknown
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error boundary:', error)
  }, [error])

  const message =
    error instanceof Error
      ? error.message
      : 'Došlo je do neočekivane greške.'

  return (
    <>
      {/* ✅ TITLE MORA BITI OVAKO */}
      <title>Greška | Go2Njemačka</title>

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f3f4f6',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '480px',
            width: '100%',
            boxShadow: '0 10px 30px rgba(0,0,0,.1)',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '20px', marginBottom: '12px' }}>
            Greška u aplikaciji
          </h1>

          <p style={{ color: '#555', marginBottom: '20px' }}>
            {message}
          </p>

          <button
            onClick={() => reset()}
            style={{
              padding: '10px 16px',
              background: '#dc2626',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Pokušaj ponovo
          </button>
        </div>
      </div>
    </>
  )
}
