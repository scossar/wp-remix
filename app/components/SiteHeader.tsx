import { Link } from "@remix-run/react";
import { NavLink } from "@remix-run/react";

export default function SiteHeader() {
  return (
    <header className="bg-sky-800 text-slate-50 text-xl px-3 py-4 sticky top-0">
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
        <h1>
          <Link to="/blog">Zalgorithm</Link>
        </h1>
        <div>
          <NavLink
            to="/blog"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "underline" : ""
            }
          >
            Blog
          </NavLink>
        </div>
      </div>
    </header>
  );
}
