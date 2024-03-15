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
      <div>
        {hasPreviousPage && startCursor ? (
          <Link
            to={`?startCursor=${startCursor}`}
            className="hover:underline flex flex-col items-start"
          >
            <Icon
              key="arrow-left"
              id="arrow-left"
              x={-5}
              className="text-slate-700 w-10 h-10"
            />
            <div>Previous Posts</div>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div>
        {hasNextPage && endCursor ? (
          <Link
            to={`?endCursor=${endCursor}`}
            className="hover:underline flex flex-col items-end"
          >
            <Icon
              key="arrow-right"
              id="arrow-right"
              x={5}
              className="text-slate-700 w-10 h-10"
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
