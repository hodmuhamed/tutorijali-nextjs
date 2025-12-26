# Go2Njemačka - Headless WordPress Frontend

Production-ready Next.js frontend for Go2Njemačka.de news portal, fetching all content via WPGraphQL.

## Architecture

- **Frontend**: Next.js 13+ with App Router, TypeScript, Tailwind CSS
- **CMS Backend**: WordPress with WPGraphQL at https://go2njemacka.de/graphql
- **Test Domain**: https://tutorijali.org (noindex, canonical points to go2njemacka.de)
- **Production Domain**: https://go2njemacka.de (to be deployed later)

## Features

- ✅ Server-side rendering with ISR (Incremental Static Regeneration)
- ✅ SEO optimized: metadata, OpenGraph, Twitter cards, canonical URLs
- ✅ URL structure preserved from WordPress
- ✅ Test domain safe: noindex robots, canonical pointing to production
- ✅ Modern news portal layout with hero, categories, sidebar
- ✅ Full-text search via WordPress GraphQL
- ✅ Cursor-based pagination
- ✅ Safe HTML content rendering with sanitization
- ✅ Responsive images with Next.js Image optimization
- ✅ Dynamic sitemap.xml and robots.txt

## URL Structure

- Home: `/`
- Single Post: `/[postSlug]` (no prefix)
- Category: `/c/[categorySlug]`
- Tag: `/t/[tagSlug]`
- Search: `/search?q=...`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

## Environment Variables

Create a `.env` file in the project root:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://tutorijali.org
ORIGIN_CANONICAL=https://go2njemacka.de

# WordPress GraphQL Endpoint
WP_GRAPHQL_ENDPOINT=https://go2njemacka.de/graphql
```

### Variable Descriptions

- `NEXT_PUBLIC_SITE_URL`: Current deployment URL (tutorijali.org for testing)
- `ORIGIN_CANONICAL`: Production domain for canonical URLs (go2njemacka.de)
- `WP_GRAPHQL_ENDPOINT`: WordPress GraphQL API endpoint

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Type Checking

```bash
npm run typecheck
```

## Project Structure

```
/app
  /[postSlug]         # Single post pages
  /c/[slug]           # Category archive pages
  /t/[slug]           # Tag archive pages
  /search             # Search results page
  /sitemap.xml        # Dynamic XML sitemap
  /robots.txt         # Dynamic robots.txt
  layout.tsx          # Root layout with Header/Footer
  page.tsx            # Homepage

/components
  Header.tsx          # Site header with navigation
  Footer.tsx          # Site footer
  SearchBox.tsx       # Search input component
  PostCard.tsx        # Post card component
  Sidebar.tsx         # Sidebar with popular posts
  Pagination.tsx      # Pagination controls

/lib
  wpgraphql.ts        # GraphQL fetch utility
  queries.ts          # All GraphQL queries
  types.ts            # TypeScript types for WP data
  seo.ts              # SEO utilities (canonical, meta)
  sanitize.ts         # HTML sanitization
  date-utils.ts       # Date formatting (Bosnian)
```

## SEO Behavior

### Test Domain (tutorijali.org)

- All pages have `<meta name="robots" content="noindex,nofollow">`
- Canonical URLs point to `https://go2njemacka.de` + path
- Robots.txt disallows all crawlers
- Sitemap still lists production URLs

### Production Domain (go2njemacka.de)

Once you update `NEXT_PUBLIC_SITE_URL=https://go2njemacka.de`:

- Pages will be `index,follow`
- Canonical URLs will point to themselves
- Robots.txt allows crawlers
- Sitemap lists all content

## Moving to Production

To deploy to go2njemacka.de:

1. Update environment variables:
   ```env
   NEXT_PUBLIC_SITE_URL=https://go2njemacka.de
   ORIGIN_CANONICAL=https://go2njemacka.de
   WP_GRAPHQL_ENDPOINT=https://go2njemacka.de/graphql
   ```

2. Rebuild the application:
   ```bash
   npm run build
   ```

3. Deploy to your hosting platform

No code changes needed!

## ISR Revalidation Times

- Homepage: 5 minutes (300s)
- Single posts: 5 minutes (300s)
- Categories: 5 minutes (300s)
- Tags: 5 minutes (300s)
- Search: 1 minute (60s)
- Categories list: 1 hour (3600s)
- Sitemap: 1 hour (3600s)

## WordPress Requirements

Your WordPress installation must have:

- **Required**: WPGraphQL plugin installed and activated
- **Required**: WPGraphQL endpoint accessible at `/graphql`

### Optional SEO Plugins

The app works without SEO plugins and uses smart fallbacks:
- **Without SEO Plugin**: Uses post title + site name for meta title, excerpt for description
- **With Yoast SEO/RankMath**: Can leverage advanced SEO fields if you uncomment the `seo` field in `lib/queries.ts`

To enable advanced SEO fields (if you have Yoast/RankMath):
1. Install WPGraphQL SEO plugin
2. Uncomment the `seo` field section in `lib/queries.ts`
3. Rebuild the app

## GraphQL Schema

The app expects these WPGraphQL fields:

**Posts:**
- id, title, slug, excerpt, content, date, modified, uri
- featuredImage { node { mediaItemUrl, altText, mediaDetails } }
- categories { nodes { id, name, slug, uri } }
- tags { nodes { id, name, slug, uri } }
- seo (optional, requires WPGraphQL SEO plugin)

**Categories & Tags:**
- id, name, slug, uri, description, count
- posts (with pagination support)

## Troubleshooting

### GraphQL Endpoint Returns Error in Browser

This is expected! WPGraphQL requires POST requests with query payload. The browser shows an error because it sends GET. The app works correctly.

### Images Not Loading

Check that WordPress media library URLs are publicly accessible. Verify `featuredImage.node.mediaItemUrl` returns valid URLs.

### Build Errors

Run type checking first:
```bash
npm run typecheck
```

Check that all environment variables are set correctly.

## Performance

- Server Components reduce client-side JS
- ISR provides fast page loads with fresh content
- Next.js Image optimization for responsive images
- Cursor-based pagination for efficient queries

## License

All rights reserved © Go2Njemačka

---

**Questions?** This frontend is deployment-ready and tested with the WordPress backend at go2njemacka.de.
