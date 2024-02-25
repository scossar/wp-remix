import { gql } from "@apollo/client/core/index.js";

export const POSTS_QUERY = gql(`
query GetPosts {
    posts {
        nodes {
            id
            title
            content
            date
            slug
            excerpt
            author {
                node {
                    name
                }
            }
            featuredImage {
                node {
                    caption
                    description
                    id
                    sourceUrl
                }
            }
        }
    }
}
`);

export const INDEX_PAGE_POSTS_QUERY = gql(`
query getSitePosts {
    posts(first: 5, where: {orderby: {field: DATE, order: DESC}}) {
      edges {
        node {
          id
          title
          excerpt
          date
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              caption
              description
              id
              sourceUrl
            }
          }
        }
      }
    }
    categories {
      edges {
        node {
          name
          posts(first: 5, where: {orderby: {field: DATE, order: DESC}}) {
            edges {
              node {
                id
                title
                excerpt
                date
                author {
                  node {
                    name
                  }
                }
                featuredImage {
                  node {
                    caption
                    description
                    id
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);
