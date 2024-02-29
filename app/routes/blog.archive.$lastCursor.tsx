import { LoaderFunctionArgs, json, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useRouteError } from "@remix-run/react";

import { createApolloClient } from "lib/createApolloClient";
import { ARCHIVE_POSTS_QUERY } from "~/models/wp_queries";
import type { PostConnectionEdge } from "~/graphql/__generated__/graphql";
import PostExcerptCard from "~/components/PostExcerptCard";

// todo: improve this and add og tags
export const meta: MetaFunction = () => {
  return [
    { title: "Zalgorithm blog archive" },
    { description: "Zalgorithm blog archive" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const cursor = params.lastCursor || "";
  const client = createApolloClient();
  const response = await client.query({
    query: ARCHIVE_POSTS_QUERY,
    variables: {
      after: cursor,
    },
  });

  if (response.errors || !response?.data) {
    throw new Error("An error was returned loading the post archive.");
  }

  const data = response?.data;
  const pageInfo = data?.posts?.pageInfo;
  const postEdges = data?.posts?.edges;
  const lastCursor = postEdges?.[postEdges.length - 1]?.cursor;

  return json({
    pageInfo: pageInfo,
    postEdges: postEdges,
    lastCursor: lastCursor,
  });
};

export default function BlogArchiveNext() {
  const { pageInfo, postEdges, lastCursor } = useLoaderData<typeof loader>();
  return (
    <div className="px-6 mx-auto max-w-screen-lg">
      <h2 className="text-3xl text-slate-900 mt-3 font-serif font-bold">
        Archive
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
      <div className="py-3">
        {pageInfo?.hasNextPage && lastCursor ? (
          <Link
            prefetch="intent"
            to={`/blog/archive/${lastCursor}`}
            className="bg-slate-500 hover:bg-slate-700 text-slate-50 font-bold py-2 px-4 rounded"
          >
            Next Posts
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <div className="mx-auto max-w-3xl px-5 py-4 my-10 bg-red-200 border-2 border-red-700 rounded break-all">
      <h1>App Error</h1>
      <pre>{errorMessage}</pre>
    </div>
  );
}
