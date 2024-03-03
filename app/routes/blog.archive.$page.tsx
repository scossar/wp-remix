import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { createApolloClient } from "lib/createApolloClient";
import { ARCHIVE_POSTS_QUERY } from "~/models/wp_queries";
import type { PostConnectionEdge } from "~/graphql/__generated__/graphql";

import PostExcerptCard from "~/components/PostExcerptCard";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let { searchParams } = new URL(request.url);
  // todo: need to handle the case cursor not being set
  const cursor = searchParams.get("cursor");

  const client = createApolloClient();
  const response = await client.query({
    query: ARCHIVE_POSTS_QUERY,
    variables: {
      after: cursor,
    },
  });

  if (response.errors || !response?.data?.posts?.edges) {
    throw new Error("An error was returned loading the posts");
  }

  const postEdges = response.data.posts.edges;

  return json({ postEdges: postEdges });
};

export default function ArchiveBlogPage() {
  const { postEdges } = useLoaderData<typeof loader>();

  return (
    <div className="px-6 mx-auto max-w-screen-lg">
      <h2 className="text-3xl py-3">
        Working on a new archive page for the blog
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {postEdges.map((edge: PostConnectionEdge) => (
          <PostExcerptCard
            title={edge.node?.title}
            date={edge.node?.date}
            featuredImage={edge.node?.featuredImage?.node?.sourceUrl}
            excerpt={edge.node?.excerpt}
            authorName={edge.node?.author?.node?.name}
            slug={edge.node?.slug}
            key={edge.node.id}
          />
        ))}
      </div>
    </div>
  );
}
