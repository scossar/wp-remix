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

export const ARCHIVE_POSTS_QUERY = gql(`
query ArchivePosts($after: String!) {
    posts (first: 5, after: $after, where: {orderby: {field:DATE, order: DESC}}) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            title
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
                altText
                sourceUrl
              }
            }
          }
        }
      }
}
`);

export const POST_BY_SLUG_QUERY = gql(`
query GetPostBySlug ($id: ID!) {
  post(id: $id, idType: SLUG) {
    id
    title
    content
    excerpt
    slug
    date
    author {
      node {
        name
      }
    }
    featuredImage {
      node {
        altText
        description
        caption
        id
        sourceUrl
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
          slug
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
                slug
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
