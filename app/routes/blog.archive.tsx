import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { Maybe } from "graphql/jsutils/Maybe";

import { createApolloClient } from "lib/createApolloClient";
import { ARCHIVE_CURSORS_QUERY } from "~/models/wp_queries";
import type { RootQueryToPostConnectionEdge } from "~/graphql/__generated__/graphql";

interface Page {
  pageNumber: number;
  lastCursor: string;
}

export const loader = async () => {
  const client = createApolloClient();

  const response = await client.query({
    query: ARCHIVE_CURSORS_QUERY,
    variables: {
      after: "",
    },
  });

  if (response.errors || !response?.data?.posts?.edges) {
    throw new Error("Unable to load post details.");
  }

  const chunkSize = Number(process.env?.ARCHIVE_CHUNK_SIZE) || 15;
  const cursorEdges = response.data.posts.edges;
  const pages = cursorEdges.reduce(
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
  // handle the case of the chunk size being a multiple of the total number of posts.
  if (cursorEdges.length % chunkSize === 0) {
    pages.pop();
  }

  // add a first page object (lastCursor: "")
  pages.unshift({
    lastCursor: "",
    pageNumber: 0,
  });

  return json({ pages: pages });
};

export default function Archive() {
  const { pages } = useLoaderData<typeof loader>();

  return (
    <div className="px-6 mx-auto max-w-screen-lg">
      <h2 className="text-3xl py-3">
        Working on a new archive page for the blog
      </h2>
      <Outlet />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"></div>
      {pages.map((page: Page) => (
        <Link
          prefetch="intent"
          to={{
            pathname: String(page.pageNumber),
            search: `?cursor=${page.lastCursor}`,
          }}
          className="px-3 py-2 mx-3 hover:underline text-sky-700"
          key={page.pageNumber}
        >
          {page.pageNumber + 1}
        </Link>
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
