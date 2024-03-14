import { gql } from "@apollo/client/core/index.js";

export const CATEGORIES_DETAILS_QUERY = gql(`
query GetCategoriesDetails {
  categories {
    nodes {
      name
      slug
    }
  }
}
`);

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

// todo: remove if not being used
export const ARCHIVE_CURSORS_QUERY = gql(`
query ArchiveCursors($after: String!) {
    posts (first: 100, after: $after, where: {orderby: {field:DATE, order: DESC}} ) {
        pageInfo {
            hasNextPage
            endCursor
            } 
        edges {
            cursor
        }
    }
}
`);

// todo: remove if not being used
export const ARCHIVE_POSTS_QUERY = gql(`
query ArchivePosts($after: String!) {
    posts (first: 15, after: $after, where: {orderby: {field:DATE, order: DESC}}) {
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

export const ARCHIVE_QUERY = gql(`
query ArchiveQuery (
    $first: Int
    $last: Int
    $after: String
    $before: String
    $categorySlug: String
  ) {
    posts(first: $first, last: $last, after: $after, before: $before, where: {categoryName: $categorySlug}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          databaseId
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

// todo: remove this once it's no longer being used
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
    previousPost {
      title
      slug
    }
    nextPost {
      title
      slug
    }
  }
}
`);

export const POST_BY_ID_QUERY = gql(`
query GetPostById ($id: ID!) {
  post(id: $id, idType: DATABASE_ID) {
    title
    content
    excerpt
    slug
    databaseId
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
    previousPost {
      title
      slug
      databaseId
    }
    nextPost {
      title
      slug
      databaseId
    }
  }
}
`);

export const CATEGORY_POST_BY_ID_QUERY = gql(`
query GetCategoryPostById ($id: ID!) {
  post(id: $id, idType: DATABASE_ID) {
    title
    content
    excerpt
    slug
    databaseId
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
    previousPostInCategory {
      title
      slug
      databaseId
    }
    nextPostInCategory {
      title
      slug
      databaseId
    }
  }
}
`);

export const INDEX_PAGE_POSTS_QUERY = gql(`
query getHomepagePosts {
    tags (where: {name: "featured"}) {
    edges {
      node {
        posts(first: 5, where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              databaseId
              title
              slug
              excerpt
              date
              author {
                node {
                  name
                }
              }
              categories {
                nodes {
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
  categories {
    edges {
      node {
        name
        slug
        posts(first: 5, where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              databaseId
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
