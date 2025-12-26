import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Oswald } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CANONICAL_ORIGIN } from '@/lib/seo';

/* ================================
   FONTS
================================ */

/* BODY FONT */
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

/* HEADINGS FONT */
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

/* ================================
   SITE CONFIG
================================ */

const SITE_URL = CANONICAL_ORIGIN;

/* ================================
   SEO METADATA
================================ */

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: {
    default: 'Go2Njemačka – Život i rad u Njemačkoj',
    template: '%s | Go2Njemačka',
  },
  description:
    'Sve što trebate znati o životu i radu u Njemačkoj: posao, povrat poreza, zdravstveno osiguranje, spajanje porodice, dječiji doplatak, prava radnika i praktični savjeti.',
  robots: 'index,follow',
  alternates: {
    canonical: CANONICAL_ORIGIN,
  },
  openGraph: {
    siteName: 'Go2Njemačka',
    locale: 'bs_BA',
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

/* ================================
   ROOT LAYOUT
================================ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bs">
      <body
        className={`${inter.variable} ${oswald.variable} font-sans bg-gray-50`}
      >
        {/* ================================
           GOOGLE ADSENSE (GLOBAL)
        ================================ */}
        <Script
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7632125522495008"
          crossOrigin="anonymous"
        />

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
