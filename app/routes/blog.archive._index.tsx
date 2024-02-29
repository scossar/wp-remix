import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { createApolloClient } from "lib/createApolloClient";
import { ARCHIVE_POSTS_QUERY } from "~/models/wp_queries";
import type { PostConnectionEdge } from "~/graphql/__generated__/graphql";
import PostExcerptCard from "~/components/PostExcerptCard";

/*export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const lastCursor = form.get("lastCursor");

  console.log(`lastCursor: ${lastCursor}`);

  return redirect("/");
};*/

export async function loader() {
  const client = createApolloClient();
  const response = await client.query({
    query: ARCHIVE_POSTS_QUERY,
    variables: {
      after: "",
    },
  });

  if (response.errors) {
    // todo: handle the errors
    console.log("An error was returned from the ARCHIVE_POSTS_QUERY");
  }

  const data = response?.data;
  const pageInfo = data?.posts?.pageInfo;
  const postEdges = data?.posts?.edges;
  const lastCursor = postEdges?.[postEdges.length - 1]?.cursor;
  const lastDate = 

  // don't worry about errors for now
  return json({
    pageInfo: pageInfo,
    postEdges: postEdges,
    lastCursor: lastCursor,
  });
}

export default function Archive() {
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
          <Form method="post" action="next">
            <input type="hidden" name="lastCursor" value={lastCursor} />
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-slate-50 font-bold py-2 px-4 rounded"
            >
              Next Page
            </button>
          </Form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
