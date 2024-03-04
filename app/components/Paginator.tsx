import { Link } from "@remix-run/react";
import { Page } from "~/types/Page";

interface PaginatorProps {
  pages: Page[];
  currentPage: number;
}

export default function Paginator({ pages, currentPage }: PaginatorProps) {
  const previousCursor =
    currentPage > 0 ? pages[currentPage - 1].lastCursor : null;
  const nextCursor =
    currentPage < pages.length - 1 ? pages[currentPage + 1].lastCursor : null;
  return (
    <div>
      {previousCursor ? (
        <Link
          to={`?page=${currentPage - 1}&cursor=${previousCursor}`}
          className="mr-1 my-3 py-3 text-sky-700 text-sm font-semibold hover:bg-sky-100 rounded"
        >
          Previous
        </Link>
      ) : (
        <div className="inline-block mr-1 my-3 py-3 text-slate-500 font-light text-sm">
          Previous
        </div>
      )}
      {pages.map((page: Page) => (
        <Link
          prefetch="intent"
          to={`?page=${page.pageNumber}&cursor=${page.lastCursor}`}
          key={page.pageNumber}
          className={`mr-1 my-3 p-2 text-sky-700 font-semibold hover:bg-sky-100 rounded text-sm ${
            currentPage === page.pageNumber ? "bg-sky-200" : ""
          }`}
        >
          {page.pageNumber + 1}
        </Link>
      ))}
      {nextCursor ? (
        <Link
          to={`?page=${currentPage + 1}&cursor=${nextCursor}`}
          className="ml-1 my-3 pl-3 text-sky-700 font-semibold hover:bg-sky-100 rounded"
        >
          Next
        </Link>
      ) : (
        <div className="inline-block mr-1 my-3 py-3 text-slate-500 font-light text-sm">
          Next
        </div>
      )}
    </div>
  );
}
