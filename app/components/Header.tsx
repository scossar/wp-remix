/*
For my own reference, details about getting this to work with user sessions are in wp_remix_two
*/
import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="bg-slate-500 text-slate-50 text-xl p-3 flex justify-between items-center">
      <h1>
        <Link to="/">Hello Zalgorithm</Link>
      </h1>
      <div>
        <Link to="/blogs">Blogs</Link>
      </div>
    </header>
  );
}
