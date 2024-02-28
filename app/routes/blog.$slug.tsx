import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { createApolloClient } from "lib/createApolloClient";
import { POST_BY_SLUG_QUERY } from "~/models/wp_queries";
import type { Post } from "~/graphql/__generated__/graphql";
import { stripHtml, truncateText } from "~/utils/utilities";

export const meta: MetaFunction = ({ data }) => {
  const post = data as Post;
  const title = post?.title ? post.title : "Simon's blog";
  let description = post?.excerpt
    ? stripHtml(post.excerpt)
    : `Read more about ${post.title}`;
  description = truncateText(description, 160);
  // todo: set BASE_URL as an environental variable so that it doesn't have to be hard coded here:
  const url = post?.slug
    ? `https://hello.zalgorithm.com/blog/${post.slug}`
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
  invariant(params.slug, "params.slug is required");
  const slug = params.slug;
  const client = createApolloClient();
  const response = await client.query({
    query: POST_BY_SLUG_QUERY,
    variables: {
      id: slug,
    },
  });

  const post = response?.data?.post;

  // todo: improve this
  if (!post) {
    throw new Response(`Post not found for slug: ${slug}`, {
      status: 404,
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

  return (
    <div className="mx-2 md:max-w-prose md:mx-auto">
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
      <hr className="my-3 border-solid border-slate-900" />
      <div
        className="text-slate-800 wp-post"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
