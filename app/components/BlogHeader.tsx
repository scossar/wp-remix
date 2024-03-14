import { Link, NavLink, useLocation } from "@remix-run/react";
import { useEffect } from "react";
import { Maybe } from "graphql/jsutils/Maybe";
import { type RootQueryToCategoryConnection } from "~/graphql/__generated__/graphql";

interface BlogHeaderProps {
  categories: Maybe<RootQueryToCategoryConnection>;
}

export default function BlogHeader({ categories }: BlogHeaderProps) {
  const location = useLocation();
  useEffect(() => {
    const detailsElement = document.getElementById("blog-nav");
    if (detailsElement) {
      detailsElement.removeAttribute("open");
    }
  }, [location]);
  return (
    <header className="bg-sky-800 text-slate-50 text-xl px-3 py-4 top-0 sticky overflow-visible">
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
        <h1>
          <Link to="/">Zalgorithm</Link>
        </h1>
        <div>
          <details
            className="cursor-pointer absolute top-1/3 right-4 z-10"
            id="blog-nav"
          >
            <summary className="_no-triangle block absolute right-4 list-none">
              Menu
            </summary>
            <ul className="bg-slate-50 text-slate-800 text-lg p-2 rounded relative top-8 shadow-md">
              {categories?.nodes
                ? categories.nodes.map((category, index) => (
                    <li key={index}>
                      <NavLink
                        to={`/blog/category/${category.slug}`}
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "text-sky-700" : ""
                        }
                      >
                        {category.name}
                      </NavLink>
                    </li>
                  ))
                : ""}
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}
