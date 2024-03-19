import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="w-full bg-sky-800 text-slate-50 min-h-12 mt-3 z-20">
      <Link to="/" className="py-3 block mx-auto text-center text-4xl">
        Zalgorithm
      </Link>
    </footer>
  );
}
