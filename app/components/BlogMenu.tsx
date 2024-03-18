import { NavLink, useLocation } from "@remix-run/react";
import { useEffect } from "react";
import { Maybe } from "graphql/jsutils/Maybe";
import { type RootQueryToCategoryConnection } from "~/graphql/__generated__/graphql";
import { Icon } from "~/components/Icon";
import { useState } from "react";

interface BlogMenuProps {
  categories: Maybe<RootQueryToCategoryConnection>;
}

export default function BlogMenu({ categories }: BlogMenuProps) {
  const containerHeightClass: string = "h-12";
  const hamburgerWidthClass: string = "w-12";
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  console.log("toggle", isPanelOpen);

  return (
    <>
      <div className="cursor-pointer absolute top-0 right-0 z-10" id="blog-nav">
        <button
          onClick={togglePanel}
          className="_no-triangle block absolute right-0 top-0 list-none"
        >
          <Icon
            key="hamburger"
            id="hamburger"
            className={`text-slate-50 rounded hover:bg-sky-700 hover:outline hover:outline-sky-700 hover:outline-4 hover:outline-solid ${hamburgerWidthClass} ${containerHeightClass}`}
          />
        </button>
      </div>

      {/*<div
        className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800 right-0"
        aria-labelledby="drawer-label"
  >*/}
      <div
        className={`bg-purple-400 fixed left-0 top-16 h-screen p-4 overflow-y-auto ${
          isPanelOpen
            ? "transition-transform -translate-x-0"
            : "transition-transform -translate-x-full"
        } `}
      >
        <ul className="bg-slate-50 text-slate-800 text-lg shadow-lg w-56 divide-slate-300 divide-y">
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
      </div>
    </>
  );
}
