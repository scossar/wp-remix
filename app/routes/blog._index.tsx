import { json, MetaFunction } from "@remix-run/node";
import { Link, useRouteError, useLoaderData } from "@remix-run/react";

import { createApolloClient } from "lib/createApolloClient";
import type {
  RootQueryToCategoryConnectionEdge,
  PostConnectionEdge,
  TagToPostConnectionEdge,
} from "~/graphql/__generated__/graphql";
import { INDEX_PAGE_POSTS_QUERY } from "~/models/wp_queries";
import BlogHeader from "~/components/BlogHeader";
import PostExcerptCard from "~/components/PostExcerptCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Zalgorithm" },
    { name: "description", content: "Simon's blog" },
  ];
};

export async function loader() {
  const client = createApolloClient();
  const response = await client.query({
    query: INDEX_PAGE_POSTS_QUERY,
  });

  if (response.errors) {
    throw new Error("Unable to load posts.");
  }

  const data = response?.data;
  const featuredPosts = data?.tags?.edges?.[0]?.node?.posts?.edges ?? [];
  const categoryEdges = data?.categories?.edges ?? [];

  if (featuredPosts.length === 0 && categoryEdges.length === 0) {
    throw new Error("No posts were returned for the homepage.");
  }

  return json({
    featuredPosts: featuredPosts,
    categoryEdges: categoryEdges,
  });
}

export default function BlogIndex() {
  const { featuredPosts, categoryEdges } = useLoaderData<typeof loader>();
  // use the same basePath for featured and category PostExcerptCards for now
  const basePath = "/blog";

  return (
    <div>
      <BlogHeader />
      <div className="px-6 pb-6 mx-auto max-w-screen-lg">
        <h2 className="text-3xl text-slate-900 mt-3 font-serif font-bold text-center">
          Simon's Blog
        </h2>
        <hr className="mt-2 mb-3 border-solid border-slate-400" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-3">
          {featuredPosts.map((postEdge: TagToPostConnectionEdge) => (
            <PostExcerptCard
              title={postEdge.node?.title}
              date={postEdge.node?.date}
              featuredImage={postEdge.node?.featuredImage?.node?.sourceUrl}
              excerpt={postEdge.node?.excerpt}
              authorName={postEdge.node.author?.node?.name}
              slug={postEdge.node?.slug}
              excerptLength={160}
              includeMetaData={true}
              basePath={basePath}
              databaseId={postEdge.node.databaseId}
              key={postEdge.node.databaseId}
            />
          ))}
        </div>
        <Link
          className="text-2xl text-sky-700 font-semibold font-serif hover:underline pt-3 block"
          prefetch="intent"
          to="posts"
        >
          View all posts
        </Link>

        {categoryEdges.map(
          (categoryEdge: RootQueryToCategoryConnectionEdge) => (
            <div key={categoryEdge.node.name} className="py-3">
              <hr className="mt-2 mb-2 border-solid border-slate-400" />
              <Link
                to={`/blog/category/${categoryEdge.node.slug}`}
                className="text-2xl text-sky-700 font-medium hover:underline pt-3"
              >
                <h2 className="text-3xl my-6 font-serif font-bold text-center">
                  {categoryEdge.node.name}
                </h2>
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {categoryEdge.node?.posts?.edges.map(
                  (postEdge: PostConnectionEdge) => (
                    <PostExcerptCard
                      title={postEdge.node?.title}
                      date={postEdge.node?.date}
                      featuredImage={
                        postEdge.node?.featuredImage?.node?.sourceUrl
                      }
                      excerpt={postEdge.node?.excerpt}
                      authorName={postEdge.node.author?.node?.name}
                      slug={postEdge.node?.slug}
                      excerptLength={160}
                      includeMetaData={true}
                      basePath={basePath}
                      databaseId={postEdge.node.databaseId}
                      key={postEdge.node.databaseId}
                    />
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <div className="mx-auto max-w-2xl px-20 py-4 my-10 bg-red-200 border-2 border-red-700 rounded">
      <h1>App Error</h1>
      <pre>{errorMessage}</pre>
    </div>
  );
}
