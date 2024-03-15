import { Link } from "@remix-run/react";
import type { Post } from "~/graphql/__generated__/graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { Icon } from "~/components/Icon";

export interface PostNavigationProps {
  previousPost: Maybe<Post>;
  nextPost: Maybe<Post>;
  basePath: string;
}

export default function OlderNewerPostNavigation({
  previousPost,
  nextPost,
  basePath,
}: PostNavigationProps) {
  return (
    <div className="my-3 flex justify-between  flex-col min-[431px]:flex-row">
      {previousPost?.title && previousPost?.slug && previousPost?.databaseId ? (
        <div>
          <Link
            prefetch="intent"
            to={`${basePath}/${previousPost.databaseId}/${previousPost.slug}`}
            className="text-lg font-bold text-sky-700 hover:underline"
          >
            <div className="flex items-center">
              {" "}
              <Icon
                key="arrow-left"
                id="arrow-left"
                x={-5}
                className="text-slate-700 w-10 h-10 self-center"
              />{" "}
              <div className="text-slate-700">Older</div>
            </div>
            {previousPost.title}
          </Link>
        </div>
      ) : null}
      {nextPost?.title && nextPost?.slug && nextPost?.databaseId ? (
        <div className="min-[431px]:text-right">
          <Link
            prefetch="intent"
            to={`${basePath}/${nextPost.databaseId}/${nextPost.slug}`}
            className="text-lg font-bold text-sky-700 hover:underline"
          >
            <div className="flex items-center min-[431px]:justify-end">
              <div className="text-slate-700">Newer</div>
              <Icon
                key="arrow-right"
                id="arrow-right"
                x={5}
                className="text-slate-700 inline w-10 h-10"
              />{" "}
            </div>
            {nextPost.title}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
