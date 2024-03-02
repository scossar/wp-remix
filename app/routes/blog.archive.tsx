import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useRouteError } from "@remix-run/react";
import { Maybe } from "graphql/jsutils/Maybe";

import { createApolloClient } from "lib/createApolloClient";
import {
  ARCHIVE_CURSORS_QUERY,
  ARCHIVE_POSTS_QUERY,
} from "~/models/wp_queries";
import type {
  PostConnectionEdge,
  RootQueryToPostConnectionEdge,
} from "~/graphql/__generated__/graphql";
import PostExcerptCard from "~/components/PostExcerptCard";

interface Page {
  pageNumber: number;
  lastCursor: string;
}

interface FetcherTypeData {
  postEdges: PostConnectionEdge;
}

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const after = url.searchParams.get("lastCursor") || "";
  const pageNumber = url.searchParams.get("pageNumber");
  let pages;

  const client = createApolloClient();

  if (!after && !pageNumber) {
    const cursorQueryResponse = await client.query({
      query: ARCHIVE_CURSORS_QUERY,
      variables: {
        after: "",
      },
    });

    if (
      cursorQueryResponse.errors ||
      !cursorQueryResponse?.data?.posts?.edges
    ) {
      throw new Error("Unable to load post details.");
    }

    const chunkSize = Number(process.env?.ARCHIVE_CHUNK_SIZE) || 15;
    const cursorEdges = cursorQueryResponse.data.posts.edges;
    pages = cursorEdges.reduce(
      (
        acc: { lastCursor: Maybe<string | null>; pageNumber: number }[],
        edge: RootQueryToPostConnectionEdge,
        index: number
      ) => {
        if ((index + 1) % chunkSize === 0) {
          acc.push({
            lastCursor: edge.cursor,
            pageNumber: acc.length + 1,
          });
        }
        return acc;
      },
      []
    );

    pages.unshift({
      lastCursor: "",
      pageNumber: 0,
    });
  } else {
    pages = [];
  }

  const postsQueryResponse = await client.query({
    query: ARCHIVE_POSTS_QUERY,
    variables: {
      after: after,
    },
  });

  if (postsQueryResponse.errors || !postsQueryResponse?.data?.posts?.edges) {
    throw new Error("An error was returned loading the posts");
  }

  const postEdges = postsQueryResponse.data.posts.edges;

  return json({ pages: pages, postEdges: postEdges });
};

export default function Archive() {
  const initialData = useLoaderData<typeof loader>();
  let postEdges = initialData.postEdges;
  const fetcher = useFetcher();
  const fetcherData = fetcher.data as FetcherTypeData;

  if (fetcherData && fetcherData?.postEdges) {
    postEdges = fetcherData.postEdges;
  }

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
      {initialData.pages.map((page: Page) => (
        <fetcher.Form
          action="?"
          method="get"
          className="inline-block px-3 mx-3 border border-slate-300"
          key={page.pageNumber}
        >
          <input type="hidden" name="lastCursor" value={page.lastCursor} />
          <input type="hidden" name="pageNumber" value={page.pageNumber} />
          <button type="submit">{page.pageNumber + 1}</button>
        </fetcher.Form>
      ))}
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
