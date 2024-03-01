import type { MetaFunction } from "@remix-run/node";
import { useRouteError } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Zalgorithm" },
    { name: "description", content: "A zigzag algorithm." },
  ];
};

export default function Index() {
  return (
    <div className="max-w-md mx-auto my-2">
      <h2 className="text-3xl my-1">Hello Zalgorithm!</h2>
      <p className="my-1">This is a test. This is only a test...</p>
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
