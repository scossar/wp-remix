import { MetaFunction } from "@remix-run/node";
import { Link, Outlet, useRouteError } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Zalgorithm" },
    { name: "description", content: "Simon's blog" },
  ];
};

export default function BlogIndex() {
  return (
    <div>
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
