export const HOME_FEATURED_QUERY = `
  query HomeFeatured {
    posts(first: 16, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        date
        excerpt

        tags {
          nodes {
            id
            name
            slug
          }
        }

        categories {
          nodes {
            name
            slug
          }
        }

        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`;
