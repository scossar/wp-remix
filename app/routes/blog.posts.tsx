import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { createApolloClient } from "lib/createApolloClient";
import { ARCHIVE_QUERY } from "~/models/wp_queries";
import Paginator from "~/components/Paginator";
import { Maybe } from "graphql/jsutils/Maybe";
import type { PostConnectionEdge } from "~/graphql/__generated__/graphql";
import PostExcerptCard from "~/components/PostExcerptCard";

interface ArchiveQueryVariables {
  first: Maybe<number>;
  last: Maybe<number>;
  after: Maybe<string>;
  before: Maybe<string>;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

  const startCursor = searchParams.get("startCursor") ?? null;
  const endCursor = searchParams.get("endCursor") ?? null;
  const chunkSize = Number(process.env?.ARCHIVE_CHUNK_SIZE) || 15;

  let queryVariables: ArchiveQueryVariables = {
    first: null,
    last: null,
    after: null,
    before: null,
  };

  if (endCursor) {
    queryVariables.first = chunkSize;
    queryVariables.after = endCursor;
  } else if (startCursor) {
    queryVariables.last = chunkSize;
    queryVariables.before = startCursor;
  } else {
    queryVariables.first = chunkSize;
  }

  const client = createApolloClient();
  const response = await client.query({
    query: ARCHIVE_QUERY,
    variables: queryVariables,
  });

  // note: the case of `response.data.posts.edges` being empty should be handled by the UI
  if (response.errors || !response?.data?.posts?.pageInfo) {
    throw new Error("An error was returned loading the posts.");
  }

  // data for the Paginator component:
  const pageInfo = response.data.posts.pageInfo;
  // data for the PostExcerptCard components:
  // if no RootQueryToPostConnectionEdge objects are returned, deal with it in the UI?
  const postConnectionEdges = response.data.posts?.edges || [];

  return json({
    pageInfo: pageInfo,
    postConnectionEdges: postConnectionEdges,
  });
};

export default function Posts() {
  const { pageInfo, postConnectionEdges } = useLoaderData<typeof loader>();
  const basePath = "/blog";

  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="flex justify-center items-center h-full">
        <h2 className="text-3xl py-3 font-serif text-center">Posts</h2>
      </div>
      <hr className="border-solid border-slate-300" />
      <div className="mx-auto max-w-screen-lg pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {postConnectionEdges.map((edge: PostConnectionEdge) => (
            <PostExcerptCard
              title={edge.node?.title}
              date={edge.node?.date}
              featuredImage={edge.node?.featuredImage?.node?.sourceUrl}
              excerpt={edge.node?.excerpt}
              authorName={edge.node?.author?.node?.name}
              slug={edge.node?.slug}
              includeMetaData={true}
              basePath={basePath}
              databaseId={edge.node.databaseId}
              key={edge.node.databaseId}
            />
          ))}
        </div>
      </div>
      <hr className="my-6 border-solid border-slate-300" />
      <div className="my-3 flex justify-center items-center h-full">
        <Paginator pageInfo={pageInfo} />
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
