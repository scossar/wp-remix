import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useRouteError } from "@remix-run/react";
import invariant from "tiny-invariant";

import { createApolloClient } from "lib/createApolloClient";
import { POST_BY_ID_QUERY } from "~/models/wp_queries";
import type { Post } from "~/graphql/__generated__/graphql";
import { stripHtml, truncateText } from "~/utils/utilities";
import { Icon } from "~/components/Icon";
import type { PostNavigationProps } from "~/components/OlderNewerPostNavigation";
import OlderNewerPostNavigation from "~/components/OlderNewerPostNavigation";

export const meta: MetaFunction = ({ data }) => {
  const post = data as Post;
  // Without this condition, errors in the loader function will cause an unhandled
  // error in the meta function.
  if (!post || !post?.title) {
    return [
      { title: "Error Page" },
      { description: "An error occurred while loading the post." },
    ];
  }

  const title = post?.title ? post.title : "Simon's blog";
  let description = post?.excerpt
    ? stripHtml(post.excerpt)
    : `Read more about ${post.title}`;
  description = truncateText(description, 160);
  // todo: set BASE_URL as an environental variable so that it doesn't have to be hard coded here:
  const url =
    post?.slug && post.databaseId
      ? `https://hello.zalgorithm.com/blog/${post.databaseId}/${post.slug}`
      : "";

  let metaTags = [
    { title: title },
    { description: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
  ];

  if (post?.featuredImage?.node?.sourceUrl) {
    metaTags.push({
      property: "og:image",
      content: post.featuredImage.node.sourceUrl,
    });
  }

  return metaTags;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.postId, "params.postId is required");
  const postId = params?.postId;
  const client = createApolloClient();
  const response = await client.query({
    query: POST_BY_ID_QUERY,
    variables: {
      id: postId,
    },
  });

  if (response.errors) {
    throw new Error(`An error was returned when querying for post: ${postId}`);
  }

  const post = response?.data?.post ?? null;

  if (!post) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return post;
};

export default function BlogPost() {
  const post = useLoaderData<typeof loader>();
  const caption = post?.featuredImage?.node?.altText
    ? post.featuredImage.node.altText
    : "";
  const author = post?.author?.node?.name;
  // todo: improve this and extract into a utility file:
  const date = post?.date
    ? `${new Date(post.date).getFullYear()}-${String(
        new Date(post.date).getMonth() + 1
      ).padStart(2, "0")}-${String(new Date(post.date).getDate()).padStart(
        2,
        "0"
      )}`
    : "";

  console.log(JSON.stringify(post?.previousPost, null, 2));
  const previousTitle = post?.previousPost?.title;
  const previousSlug = post?.previousPost?.slug;
  const previousId = post?.previousPost?.databaseId;
  const nextTitle = post?.nextPost?.title;
  const nextSlug = post?.nextPost?.slug;
  const nextId = post?.nextPost?.databaseId;
  const postNavigationProps: PostNavigationProps = {
    previousPost: post?.previousPost,
    nextPost: post?.nextPost,
    basePath: "/blog",
  };

  return (
    <div className="mx-2 my-6 md:max-w-prose md:mx-auto">
      {post?.featuredImage?.node?.sourceUrl ? (
        <figure className="max-w-full">
          <img
            className="my-3 max-w-full rounded-md"
            src={post.featuredImage.node.sourceUrl}
            alt={caption}
          />
          {caption ? (
            <figcaption className="mt-2 text-sm text-center text-slate-700">
              {caption}
            </figcaption>
          ) : (
            ""
          )}
        </figure>
      ) : (
        ""
      )}
      <h2 className="text-3xl text-slate-900 font-serif">{post.title}</h2>
      {author && date ? (
        <span>
          <span>{author}</span>
          <br />
          <span className="text-sm">{date}</span>
        </span>
      ) : (
        ""
      )}
      <hr className="my-6 border-solid border-slate-400" />
      <div
        className="text-slate-800 wp-post"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="my-3 flex justify-between flex-col min-[431px]:flex-row">
        {previousTitle && previousSlug && previousId ? (
          <div>
            <Link
              prefetch="intent"
              to={`/blog/${previousId}/${previousSlug}`}
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
              {previousTitle}
            </Link>
          </div>
        ) : null}
        {nextTitle && nextSlug && nextId ? (
          <div className="min-[431px]:text-right">
            <Link
              prefetch="intent"
              to={`/blog/${nextId}/${nextSlug}`}
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
              {nextTitle}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error: any = useRouteError();
  const status = error?.status;

  return (
    <div className="px-2">
      <div className="mx-auto max-w-3xl px-2 py-4 my-10 bg-sky-100 border-2 border-sky-700 rounded">
        {status && status === 404 ? (
          <h2 className="text-xl">
            The page you were looking for could not be found
          </h2>
        ) : (
          <h2 className="text-xl">Sorry, something has gone wrong</h2>
        )}
        <p className="pt-1">
          Click this link to return to the blog's homepage:{" "}
          <Link className="text-sky-800 font-bold" to="/blog">
            Zalgorithm
          </Link>
        </p>
      </div>
    </div>
  );
}
