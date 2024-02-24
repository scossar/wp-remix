import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createApolloClient } from "lib/createApolloClient";
import type { Post } from "~/graphql/__generated__/graphql";
import { POSTS_QUERY } from "~/models/wp_queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Posts" },
    { name: "description", content: "WordPress Posts" },
  ];
};

export async function loader() {
  const client = createApolloClient();
  const response = await client.query({
    query: POSTS_QUERY,
  });

  if (response.errors) {
    // todo: use an ErrorBoundary here to handle the error
    console.log("An error was returned from the Posts loader function.");
  }

  const posts = response?.data?.posts?.nodes;
  return posts;
}

export default function Posts() {
  const posts = useLoaderData<typeof loader>();
  return (
    <main className="max-w-prose mx-auto">
      <header>
        <h2 className="text-3xl py-1">WordPress Posts</h2>
      </header>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
