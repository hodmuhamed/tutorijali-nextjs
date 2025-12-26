import { NextResponse } from 'next/server';

const ORIGIN_CANONICAL = 'https://go2njemacka.de';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Disallow: /api/
Disallow: /search

Sitemap: ${ORIGIN_CANONICAL}/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
