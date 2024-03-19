import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";

import { createApolloClient } from "lib/createApolloClient";
import { CATEGORIES_DETAILS_QUERY } from "./models/wp_queries";

import AppLayout from "./components/AppLayout";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader = async () => {
  const client = createApolloClient();
  const response = await client.query({
    query: CATEGORIES_DETAILS_QUERY,
  });

  if (response.errors) {
    // probably don't throw an error here
  }

  return response?.data?.categories;
};

function Document({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50">
        {children}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  const categories = useLoaderData<typeof loader>();
  return (
    <Document>
      <AppLayout categories={categories} />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <Document>
      <div className="mx-auto max-w-2xl px-20 py-4 my-10 bg-red-200 border rounded">
        <h1>App Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  );
}
