import { NavLink, useFetcher, useMatches } from "@remix-run/react";
import { Maybe } from "graphql/jsutils/Maybe";
import { type RootQueryToCategoryConnection } from "~/graphql/__generated__/graphql";

interface SidebarProps {
  isSidebarOpen: boolean;
  categories: Maybe<RootQueryToCategoryConnection>;
}
export default function Sidebar({ isSidebarOpen, categories }: SidebarProps) {
  const matches = useMatches();
  const pathStart: string = matches.slice(-1)?.[0].pathname.split("/")[1] || "";
  console.log(`categories: ${JSON.stringify(categories, null, 2)}`);

  let isRoot = false,
    isBlog = false,
    isMusic = false,
    isStories = false,
    isHireMe = false;

  switch (pathStart) {
    case "blog":
      isBlog = true;
      break;
    case "music":
      isMusic = true;
      break;
    case "stories":
      isStories = true;
      break;
    case "hire-me":
      isHireMe = true;
      break;
    default:
      isRoot = true;
  }

  return (
    <div
      className={`fixed left-0 top-16 right-24 h-screen bg-slate-200 z-10 ${
        isSidebarOpen
          ? "transition-transform -translate-x-0"
          : "transition-transform -translate-x-full"
      }`}
    >
      {isRoot && (
        <div>
          <NavLink to="/">
            <h2>Zalgorithm</h2>
          </NavLink>
          <ul>
            <NavLink to="/blog">
              <li>Blog</li>
            </NavLink>
            <NavLink to="/music">
              <li>Music</li>
            </NavLink>
            <NavLink to="/stories">
              <li>Stories</li>
            </NavLink>
            <NavLink to="/hire-me">
              <li>Hire Me</li>
            </NavLink>
          </ul>
        </div>
      )}
      {isBlog && categories?.nodes && (
        <div>
          <ul>
            {categories.nodes.map((category, index) => (
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
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
