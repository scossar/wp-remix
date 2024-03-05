import { Link } from "@remix-run/react";
import type { RootQueryToPostConnectionPageInfo } from "~/graphql/__generated__/graphql";

interface PaginatorProps {
  pageInfo: RootQueryToPostConnectionPageInfo;
}

export default function Paginator({ pageInfo }: PaginatorProps) {
  const { hasNextPage, hasPreviousPage, startCursor, endCursor } = pageInfo;

  return (
    <div>
      {hasPreviousPage && startCursor ? (
        <Link
          to={`?startCursor=${startCursor}`}
          className="mr-6 px-3 py-2  bg-sky-700 hover:bg-sky-600 text-slate-50 rounded"
        >
          Previous
        </Link>
      ) : (
        ""
      )}
      {hasNextPage && endCursor ? (
        <Link
          to={`?endCursor=${endCursor}`}
          className="ml-6 px-3 py-2 bg-sky-700 hover:bg-sky-600 text-slate-50 rounded"
        >
          Next
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
