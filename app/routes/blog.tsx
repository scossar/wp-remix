import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { createApolloClient } from "lib/createApolloClient";
import type {
  RootQueryToCategoryConnectionEdge,
  PostConnectionEdge,
} from "~/graphql/__generated__/graphql";
import { INDEX_PAGE_POSTS_QUERY } from "~/models/wp_queries";
import PostExcerptCard from "~/components/PostExcerptCard";

export async function loader() {
  const client = createApolloClient();
  const response = await client.query({
    query: INDEX_PAGE_POSTS_QUERY,
  });

  if (response.errors) {
    // todo: handle the error
    console.log(
      "An unhandled error was returned from the INDEX_PAGE_POSTS_QUERY"
    );
  }

  // if this isn't set, an error should already have been thrown
  const data = response?.data;
  const latestPostsEdges = data?.posts?.edges;
  const categoryEdges = data?.categories?.edges;

  return json({
    latestPostsEdges: latestPostsEdges,
    categoryEdges: categoryEdges,
  });
}

export default function Blog() {
  const { latestPostsEdges, categoryEdges } = useLoaderData<typeof loader>();
  return (
    <div className="px-6 mx-auto">
      <h2 className="text-2xl text-slate-900 mt-3 font-serif font-bold">
        Latest Posts
      </h2>
      <hr className="my-3 border-solid border-slate-900" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {latestPostsEdges.map((edge: PostConnectionEdge) => (
          <PostExcerptCard
            title={edge.node?.title}
            date={edge.node?.date}
            featuredImage={edge.node?.featuredImage?.node?.sourceUrl}
            excerpt={edge.node?.excerpt}
            authorName={edge.node?.author?.node?.name}
            key={edge.node.id}
          />
        ))}
      </div>
      {categoryEdges.map((categoryEdge: RootQueryToCategoryConnectionEdge) => (
        <div key={categoryEdge.node.name}>
          <h2 className="text-2xl text-slate-900 mt-3 font-serif font-bold">
            {categoryEdge.node.name}
          </h2>
          <hr className="my-3 border-solid border-slate-900" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categoryEdge.node?.posts?.edges.map(
              (postEdge: PostConnectionEdge) => (
                <PostExcerptCard
                  title={postEdge.node?.title}
                  date={postEdge.node?.date}
                  featuredImage={postEdge.node?.featuredImage?.node?.sourceUrl}
                  excerpt={postEdge.node?.excerpt}
                  authorName={postEdge.node.author?.node?.name}
                  key={postEdge.node.id}
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
