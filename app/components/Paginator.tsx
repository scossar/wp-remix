import { Link } from "@remix-run/react";
import type { RootQueryToPostConnectionPageInfo } from "~/graphql/__generated__/graphql";
import { Icon } from "~/components/Icon";

interface PaginatorProps {
  pageInfo: RootQueryToPostConnectionPageInfo;
}

export default function Paginator({ pageInfo }: PaginatorProps) {
  const { hasNextPage, hasPreviousPage, startCursor, endCursor } = pageInfo;

  return (
    <div className="w-full flex justify-between">
      <div className="flex">
        {hasPreviousPage && startCursor ? (
          <Link to={`?startCursor=${startCursor}`}>
            <Icon
              key="arrow-left"
              id="arrow-left"
              className="text-slate-700 w-10 h-10"
            />
            <div>Previous Posts</div>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="flex">
        {hasNextPage && endCursor ? (
          <Link to={`?endCursor=${endCursor}`}>
            <Icon
              key="arrow-right"
              id="arrow-right"
              className="text-slate-700 w-10 h-10 justify-end"
            />
            <div>Next Posts</div>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
