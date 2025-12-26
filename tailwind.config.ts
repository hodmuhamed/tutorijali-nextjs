import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* =========================
         FONTS (KLIX STYLE)
      ========================= */
     fontFamily: {
  sans: [
    'var(--font-inter)',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'sans-serif',
  ],
  serif: [
    'var(--font-serif)',
    'serif',
  ],
},



      /* =========================
         BORDER RADIUS (NO ROUNDED)
      ========================= */
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '0',
      },

      /* =========================
         KLIX COLORS
      ========================= */
      colors: {
        klix: {
          red: '#E30613',
          dark: '#111111',
          text: '#333333',
          muted: '#8A8A8A',
          border: '#E5E5E5',
          bg: '#F5F5F5',
          white: '#FFFFFF',
        },

        category: {
          vijesti: '#E30613',
          biznis: '#F97316',
          sport: '#16A34A',
          magazin: '#9333EA',
          lifestyle: '#EAB308',
          scitech: '#0284C7',
          auto: '#2563EB',
        },
      },

      /* =========================
         BACKGROUNDS (optional)
      ========================= */
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      /* =========================
         ANIMATIONS (shadcn safe)
      ========================= */
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
