import { Link, useMatches } from "@remix-run/react";
import BlogMenu from "~/components/BlogMenu";

import { type RootQueryToCategoryConnection } from "~/graphql/__generated__/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

interface HeaderProps {
  categories: Maybe<RootQueryToCategoryConnection>;
}

export default function Header({ categories }: HeaderProps) {
  const matches = useMatches();
  const path: string = matches.slice(-1)?.[0].pathname;
  const pathParts: string[] = path.split("/");
  const blogPage: boolean = pathParts.includes("blog");

  const containerHeightClass: string = "h-14";
  return (
    <header className="bg-sky-800 text-slate-50 px-3 py-2 top-0 sticky">
      <div
        className={`flex justify-between items-center w-full max-w-screen-xl mx-auto relative ${containerHeightClass}`}
      >
        <h1>
          <Link to="/" className="text-3xl">
            Zalgorithm
          </Link>
        </h1>
        <div className={`relative ${containerHeightClass}`}>
          {blogPage ? <BlogMenu categories={categories} /> : ""}
        </div>
      </div>
    </header>
  );
}
