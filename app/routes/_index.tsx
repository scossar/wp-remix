import type { MetaFunction } from "@remix-run/node";
import { Link, useRouteError } from "@remix-run/react";
import SiteHeader from "~/components/SiteHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "Zalgorithm" },
    { name: "description", content: "A zigzag algorithm." },
  ];
};

export default function Index() {
  return (
    <div>
      <SiteHeader />
      <div className="sm:max-w-prose mx-auto my-2">
        <h2 className="text-3xl my-1">Hello</h2>
        <p className="my-2">
          Welcome to the Zalgorithm test site! I'm using it to learn about
          headless WordPress, GraphQL, Remix, React, Typescript, Tailwind CSS...
        </p>
        <p className="my-2">
          Most of the work is happening in the site's{" "}
          <Link to="/blog" className="text-sky-700 hover:underline">
            blog
          </Link>
          . I'm converting my WordPress site (
          <Link
            to="https://zalgorithm.com"
            className="text-sky-700 hover:underline"
          >
            https://zalgorithm.com
          </Link>
          ) into a headless WordPress site and blogging about it as I go.
        </p>
        <p className="my-2">
          Posts in the blog's{" "}
          <Link
            to="/blog/category/web-development"
            className="text-sky-700 hover:underline"
          >
            Web Development Category
          </Link>
          , should not taken as tutorials. I have no idea what I'm doing (yet).
        </p>
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
