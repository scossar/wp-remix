import { Link, NavLink, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Icon } from "~/components/Icon";
import Sidebar from "~/components/Sidebar";

import { type RootQueryToCategoryConnection } from "~/graphql/__generated__/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

interface HeaderProps {
  categories: Maybe<RootQueryToCategoryConnection>;
}

export default function Header({ categories }: HeaderProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const hamburgerWidthClass: string = "w-12";
  const containerHeightClass: string = "h-12";

  return (
    <>
      <header className="bg-sky-800 text-slate-50 px-3 py-2 top-0 sticky">
        <div
          className={`flex justify-between items-center w-full max-w-screen-xl mx-auto relative ${containerHeightClass}`}
        >
          <h1>
            <Link to="/" className="text-3xl">
              Zalgorithm
            </Link>
          </h1>
          <div className={`relative ${containerHeightClass} flex items-center`}>
            <div className="pr-14 pt-3 hidden min-[390px]:flex min-[390px]:justify-between">
              <NavLink
                className={({ isActive, isPending }) =>
                  `pr-2 ${isPending ? "pending" : isActive ? "underline" : ""}`
                }
                to="/stories"
              >
                stories
              </NavLink>
              <NavLink
                className={({ isActive, isPending }) =>
                  `pr-2 ${isPending ? "pending" : isActive ? "underline" : ""}`
                }
                to="/music"
              >
                music
              </NavLink>
              <NavLink
                className={({ isActive, isPending }) =>
                  `pr-2 ${isPending ? "pending" : isActive ? "underline" : ""}`
                }
                to="/blog"
              >
                blog
              </NavLink>
            </div>

            <div className="absolute top-0 right-0">
              <button key="hamburger" id="hamburger" onClick={toggleSidebar}>
                <Icon
                  key="hamburger"
                  id="hamburger"
                  className={`text-slate-50 rounded hover:bg-sky-700 hover:outline hover:outline-sky-700 hover:outline-4 hover:outline-solid ${hamburgerWidthClass} ${containerHeightClass}`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        categories={categories}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
