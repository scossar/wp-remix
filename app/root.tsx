import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useMatches,
  Params,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";

import Header from "~/components/Header";
import Footer from "~/components/Footer";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

interface Handle {
  breadcrumb?: (match: any) => JSX.Element;
}

interface Match {
  handle?: Handle;
  pathname: string;
  data: any; // probably not correct.
  params: any; // probably not correct.
}

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
  const matches = useMatches() as Match[];

  return (
    <Document>
      <Header />
      <div className="flex-1">
        <ol>
          {matches
            .filter((match) => match.handle && match.handle.breadcrumb)
            .map((match, index) => (
              <li key={index}>
                {match?.handle?.breadcrumb
                  ? match.handle.breadcrumb(match)
                  : ""}
              </li>
            ))}
        </ol>
        <Outlet />
      </div>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
      <Footer />
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
