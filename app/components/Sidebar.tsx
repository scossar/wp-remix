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
      className={`fixed left-0 top-16 right-20 sm:right-1/2 h-screen pb-36 bg-slate-100 z-10 shadow-lg rounded  overflow-y-auto ${
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
            className={`block hover:bg-slate-300 pt-10 pb-3 px-3 ${
              isRoot && "text-sky-700 font-medium"
            }`}
          >
            <h2 className="text-2xl">Zalgorithm (home page)</h2>
          </Link>
          <ul>
            <NavLink
              to="/blog"
              className={` block hover:bg-slate-300 p-3 ${
                isBlog && "text-sky-700"
              }`}
            >
              <li>
                <span className="text-2xl">Blog</span>
                <p>
                  Blogging about creating a blog. Kind of meta at the moment.
                </p>
              </li>
            </NavLink>
            <NavLink
              to="/music"
              className={`block hover:bg-slate-300 p-3 ${
                isMusic && "text-sky-700"
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
              className={`block hover:bg-slate-300 p-3 ${
                isStories && "text-sky-700"
              }`}
            >
              <li>
                <span className="text-2xl">Stories</span>
                <p>Everybody's got a one...</p>
              </li>
            </NavLink>
            <NavLink
              to="/hire-me"
              className={`block hover:bg-slate-300 p-3 ${
                isHireMe && "text-sky-700"
              }`}
            >
              <li>
                <span className="text-2xl">Hire Me</span>
                <p>
                  But not yet. A contact form coming soon. There will be details
                  about it in the blog.
                </p>
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
                  `p-3 block hover:bg-slate-200 ${
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-sky-700 font-medium bg-slate-200"
                      : ""
                  }`
                }
              >
                <li>
                  <span className="text-2xl">{category.name}</span>
                </li>
              </NavLink>
            ))}
          </ul>
          <Link to="/" className="p-3 inline-block text-2xl hover:bg-slate-200">
            Zalgorithm (home page)
          </Link>
        </div>
      )}
    </div>
  );
}
