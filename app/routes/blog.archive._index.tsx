import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useRouteError, useLoaderData } from "@remix-run/react";

import { createApolloClient } from "lib/createApolloClient";
import { ARCHIVE_POSTS_QUERY } from "~/models/wp_queries";
import type { PostConnectionEdge } from "~/graphql/__generated__/graphql";

import PostExcerptCard from "~/components/PostExcerptCard";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor") || "";

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

export function ErrorBoundary() {
  const error = useRouteError();

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <div className="mx-auto max-w-3xl px-5 py-4 my-10 bg-red-200 border-2 border-red-700 rounded">
      <h1>App Error</h1>
      <pre className="break-all">{errorMessage}</pre>
    </div>
  );
}
