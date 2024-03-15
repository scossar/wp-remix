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
      <div className="sm:max-w-prose mx-auto my-2 px-3">
        <h2 className="text-3xl my-1">Hello</h2>
        <p className="my-2">
          This started as a lark. The site is under construction...
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
