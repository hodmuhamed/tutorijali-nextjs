/* =========================
   SHARED POST FIELDS
========================= */
export const POST_FIELDS = `
  id
  title
  slug
  excerpt
  content
  date
  modified
  uri
  commentCount
  featuredImage {
    node {
      mediaItemUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
  categories {
    nodes {
      id
      databaseId
      name
      slug
      uri
    }
  }
  tags {
    nodes {
      id
      name
      slug
      uri
    }
  }
`;

/* =========================
   POSTS
========================= */
export const QUERY_LATEST_POSTS = `
  query LatestPosts($first: Int = 10) {
    posts(
      first: $first
      where: { orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        ${POST_FIELDS}
      }
    }
  }
`;

export const QUERY_POST_BY_SLUG = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ${POST_FIELDS}
    }
  }
`;

/* =========================
   CATEGORY PAGES
========================= */
export const QUERY_CATEGORY_BY_SLUG = `
  query CategoryBySlug($slug: ID!, $first: Int = 12, $after: String) {
    category(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      uri
      description
      count
      posts(
        first: $first
        after: $after
        where: { orderby: { field: DATE, order: DESC } }
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ${POST_FIELDS}
          }
        }
      }
    }
  }
`;

/* =========================
   TAG PAGES
========================= */
export const QUERY_TAG_BY_SLUG = `
  query TagBySlug($slug: ID!, $first: Int = 12, $after: String) {
    tag(id: $slug, idType: SLUG) {
      id
      name
      slug
      uri
      description
      count
      posts(
        first: $first
        after: $after
        where: { orderby: { field: DATE, order: DESC } }
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ${POST_FIELDS}
          }
        }
      }
    }
  }
`;

/* =========================
   ALL CATEGORIES (CRITICAL)
========================= */
export const QUERY_ALL_CATEGORIES = `
  query AllCategories {
    categories(first: 100, where: { hideEmpty: true }) {
      nodes {
        id
        databaseId
        name
        slug
        uri
        count
        parent {
          node {
            id
            databaseId
          }
        }
      }
    }
  }
`;

export const QUERY_TOP_LEVEL_CATEGORIES = `
  query TopLevelCategories {
    categories(first: 20, where: { hideEmpty: true, parent: 0 }) {
      nodes {
        id
        databaseId
        name
        slug
        uri
        count
      }
    }
  }
`;

/* =========================
   SEARCH
========================= */
export const QUERY_SEARCH_POSTS = `
  query SearchPosts($search: String!, $first: Int = 20) {
    posts(
      first: $first
      where: { search: $search, orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        ${POST_FIELDS}
      }
    }
  }
`;

/* =========================
   POSTS BY CATEGORY (USES databaseId)
========================= */
export const QUERY_POSTS_BY_CATEGORY = `
  query PostsByCategory($categoryId: Int!, $first: Int = 6) {
    posts(
      first: $first
      where: {
        categoryId: $categoryId
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        ${POST_FIELDS}
      }
    }
  }
`;

/* =========================
   RELATED POSTS
========================= */
export const QUERY_RELATED_POSTS = `
  query RelatedPosts(
    $categoryIn: [ID!]
    $notIn: [ID!]
    $first: Int = 3
  ) {
    posts(
      first: $first
      where: {
        categoryIn: $categoryIn
        notIn: $notIn
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        ${POST_FIELDS}
      }
    }
  }
`;

/* =========================
   STATIC GENERATION
========================= */
export const QUERY_ALL_POSTS_SLUGS = `
  query AllPostsSlugs {
    posts(first: 10000, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
        modified
      }
    }
  }
`;

export const QUERY_ALL_CATEGORIES_SLUGS = `
  query AllCategoriesSlugs {
    categories(first: 1000, where: { hideEmpty: true }) {
      nodes {
        slug
      }
    }
  }
`;

export const QUERY_ALL_TAGS_SLUGS = `
  query AllTagsSlugs {
    tags(first: 1000, where: { hideEmpty: true }) {
      nodes {
        slug
      }
    }
  }
`;

/* =========================
   TOP TAGS
========================= */
export const QUERY_TOP_TAGS = `
  query TopTags {
    tags(first: 12, where: { orderby: COUNT, order: DESC }) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;
