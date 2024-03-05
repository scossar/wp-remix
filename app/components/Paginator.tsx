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
        <Link to={`?startCursor=${startCursor}`}>Previous</Link>
      ) : (
        ""
      )}
      {hasNextPage && endCursor ? (
        <Link to={`?endCursor=${endCursor}`}>Next</Link>
      ) : (
        ""
      )}
    </div>
  );
}
