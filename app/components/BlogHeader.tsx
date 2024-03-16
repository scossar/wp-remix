import { Link, NavLink, useLocation } from "@remix-run/react";
import { useEffect } from "react";
import { Maybe } from "graphql/jsutils/Maybe";
import { type RootQueryToCategoryConnection } from "~/graphql/__generated__/graphql";
import { Icon } from "~/components/Icon";

interface BlogHeaderProps {
  categories: Maybe<RootQueryToCategoryConnection>;
}

export default function BlogHeader({ categories }: BlogHeaderProps) {
  const location = useLocation();
  const containerHeightClass: string = "h-14";
  const hamburgerWidthClass: string = "w-14";

  useEffect(() => {
    const detailsElement = document.getElementById("blog-nav");
    if (detailsElement) {
      detailsElement.removeAttribute("open");
    }
  }, [location]);

  useEffect(() => {
    const detailsElement = document.getElementById("blog-nav");
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (detailsElement && !detailsElement.contains(target)) {
        detailsElement.removeAttribute("open");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-sky-800 text-slate-50 px-3 py-2 top-0 sticky overflow-visible">
      <div
        className={`flex justify-between items-center w-full max-w-screen-xl mx-auto relative ${containerHeightClass}`}
      >
        <h1>
          <Link to="/blog" className="text-3xl">
            Zalgorithm
          </Link>
        </h1>
        <div className={`relative ${containerHeightClass}`}>
          <details
            className="cursor-pointer absolute top-0 right-0 z-10"
            id="blog-nav"
          >
            <summary className="_no-triangle block absolute right-0 top-0 list-none">
              <Icon
                key="hamburger"
                id="hamburger"
                className={`text-slate-50 rounded hover:bg-sky-700 hover:outline hover:outline-sky-700 hover:outline-4 hover:outline-solid ${hamburgerWidthClass} ${containerHeightClass}`}
              />
            </summary>
            <ul className="bg-slate-50 text-slate-800 text-lg p-3 rounded relative top-12 right-3 shadow-lg w-56 divide-slate-300 divide-y">
              <NavLink
                key="posts"
                to="/blog/posts"
                className={({ isActive, isPending }) =>
                  `py-1 pl-1 block hover:bg-slate-200 ${
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-sky-700 font-medium bg-slate-200"
                      : ""
                  }`
                }
              >
                <li>all posts</li>
              </NavLink>
              {categories?.nodes
                ? categories.nodes.map((category, index) => (
                    <NavLink
                      key={index}
                      to={`/blog/category/${category.slug}`}
                      className={({ isActive, isPending }) =>
                        `py-1 pl-1 block hover:bg-slate-200 ${
                          isPending
                            ? "pending"
                            : isActive
                            ? "text-sky-700 font-medium bg-slate-200"
                            : ""
                        }`
                      }
                    >
                      <li>{category.name}</li>
                    </NavLink>
                  ))
                : ""}
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}
