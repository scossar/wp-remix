import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <div className="sm:max-w-prose mx-auto my-2">
        <h2 className="text-3xl my-1">Hello</h2>
        <p className="my-2">
          This started as a lark. I'm having too much fun to stop. Check out the
          blog. Especially the{" "}
          <Link
            className="text-sky-700 hover:underline"
            to="/blog/category/modular"
          >
            modular category
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
