import { Link, NavLink, useMatches } from "@remix-run/react";
import { Maybe } from "graphql/jsutils/Maybe";
import { type RootQueryToCategoryConnection } from "~/graphql/__generated__/graphql";

interface SidebarProps {
  isSidebarOpen: boolean;
  categories: Maybe<RootQueryToCategoryConnection>;
  onClose: () => void;
}
export default function Sidebar({
  isSidebarOpen,
  categories,
  onClose,
}: SidebarProps) {
  const matches = useMatches();
  const pathStart: string = matches.slice(-1)?.[0].pathname.split("/")[1] || "";

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
      className={`fixed left-0 top-16 right-20 sm:right-1/2 h-screen pb-36 bg-sky-100 z-10 shadow-lg rounded  overflow-y-auto ${
        isSidebarOpen
          ? "transition-transform -translate-x-0"
          : "transition-transform -translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="text-slate-600 fixed top-1 right-4 text-xl py-1 px-1 rounded hover:bg-slate-300"
      >
        close
      </button>
      {(isRoot || isMusic || isStories || isHireMe) && (
        <div>
          <Link
            to="/"
            className={`block hover:bg-sky-200 pt-10 pb-3 px-3 ${
              isRoot && "bg-sky-200"
            }`}
          >
            <h2 className="text-2xl">Zalgorithm (home page)</h2>
          </Link>
          <ul>
            <NavLink
              to="/blog"
              className={` block hover:bg-sky-200 p-3 ${
                isBlog && "bg-sky-200"
              }`}
            >
              <li>
                <span className="text-2xl">Blog</span>
                <p>Blogging about creating a blog. Kind of meta.</p>
              </li>
            </NavLink>
            <NavLink
              to="/music"
              className={`block hover:bg-sky-200 p-3 ${
                isMusic && "bg-sky-200"
              }`}
            >
              <li>
                <span className="text-2xl">Music</span>
                <p>
                  Moving my music off of SoundCloud. It's a work in progress.
                  Check out the blog's modular category for now.
                </p>
              </li>
            </NavLink>
            <NavLink
              to="/stories"
              className={`block hover:bg-sky-200 p-3 ${
                isStories && "bg-sky-200"
              }`}
            >
              <li>
                <span className="text-2xl">Stories</span>
                <p>Only fools rush in...</p>
              </li>
            </NavLink>
            <NavLink
              to="/hire-me"
              className={`block hover:bg-sky-200 p-3 ${
                isHireMe && "bg-sky-200"
              }`}
            >
              <li>
                <span className="text-2xl">Hire Me</span>
                <p>But not yet...</p>
              </li>
            </NavLink>
          </ul>
        </div>
      )}
      {isBlog && categories?.nodes && (
        <div>
          <h2 className="text-2xl px-3 py-2 border-b-2 border-slate-200">
            Categories
          </h2>
          <ul className="border-b-2 border-slate-200">
            {categories.nodes.map((category, index) => (
              <NavLink
                key={index}
                to={`/blog/category/${category.slug}`}
                className={({ isActive, isPending }) =>
                  `p-3 block hover:bg-sky-200 ${
                    isPending ? "pending" : isActive ? "bg-sky-200" : ""
                  }`
                }
              >
                <li>
                  <span className="text-2xl">{category.name}</span>
                </li>
              </NavLink>
            ))}
            <NavLink
              to="/blog/posts"
              className={({ isActive, isPending }) =>
                `p-3 block hover:bg-sky-200 ${
                  isPending ? "pending" : isActive ? "bg-sky-200" : ""
                }`
              }
            >
              <li>
                <span className="text-2xl">Post Archive</span>
                <p>A directory of all posts on the site.</p>
              </li>
            </NavLink>
          </ul>
          <Link to="/" className="p-3 inline-block text-2xl hover:bg-sky-200">
            Zalgorithm (home page)
          </Link>
        </div>
      )}
    </div>
  );
}
