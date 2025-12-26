export const QUERY_TOP_TAGS = `
  query TopTags {
    tags(
      first: 8
      where: {
        orderby: COUNT
        order: DESC
        hideEmpty: true
      }
    ) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`
