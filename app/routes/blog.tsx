import { type LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";

import { createApolloClient } from "lib/createApolloClient";
import { CATEGORIES_DETAILS_QUERY } from "~/models/wp_queries";
import BlogHeader from "~/components/BlogHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "Zalgorithm" },
    { name: "description", content: "Simon's blog" },
  ];
};

// I think I'll be using the `request` arg soon
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const client = createApolloClient();
  const response = await client.query({
    query: CATEGORIES_DETAILS_QUERY,
  });

  // For this case it makes sense to handle both errors here
  // todo: apollo errors seem to be crashing the site. Figure out how to handle that.
  if (response.errors || !response?.data?.categories) {
    throw new Error("An error was returned loading the site's categories.");
  }

  const categories = response.data.categories;

  return json({ categories: categories });
};

export default function BlogIndex() {
  const { categories } = useLoaderData<typeof loader>();
  return (
    <div>
      <BlogHeader categories={categories} />
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  const error: any = useRouteError();
  const status = error?.status;

  return (
    <div className="px-2">
      <div className="mx-auto max-w-3xl px-2 py-4 my-10 bg-sky-100 border-2 border-sky-700 rounded">
        {status && status === 404 ? (
          <h2 className="text-xl">
            The page you were looking for could not be found
          </h2>
        ) : (
          <h2 className="text-xl">Sorry, something has gone wrong</h2>
        )}
        <p className="pt-1">
          Click this link to return to the blog's homepage:{" "}
          <Link className="text-sky-800 font-bold" to="/blog">
            Zalgorithm
          </Link>
        </p>
      </div>
    </div>
  );
}
