import type { PostConnectionEdge } from "~/graphql/__generated__/graphql";

interface PostExcerptCardProps {
  postConnectionEdge: PostConnectionEdge;
}

export default function PostExcerptCard({
  postConnectionEdge,
}: PostExcerptCardProps) {
  const post = postConnectionEdge.node;
  const date = post?.date ? new Date(post.date) : null;
  const formattedDate = date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`
    : null;

  return (
    <article>
      {post?.featuredImage && post.featuredImage.node?.sourceUrl ? (
        <img src={post.featuredImage.node.sourceUrl} />
      ) : (
        ""
      )}
      <h3 className="text-xl font-serif font-bold mt-3">{post.title}</h3>
      {post?.excerpt ? (
        <div
          className="italic text-slate-800 text-base"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
      ) : (
        ""
      )}
      {post?.author?.node?.name && formattedDate ? (
        <div className="text-slate-800 text-base mt-1">
          {post.author.node.name} <br />
          {formattedDate}
        </div>
      ) : (
        ""
      )}
    </article>
  );
}
