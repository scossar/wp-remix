import { Maybe } from "graphql/jsutils/Maybe";

interface PostExcerptCardProps {
  date: Maybe<string | null>;
  featuredImage: Maybe<string | null>;
  title: Maybe<string | null>;
  excerpt: Maybe<string | null>;
  authorName: Maybe<string | null>;
}

export default function PostExcerptCard({
  date,
  featuredImage,
  title,
  excerpt,
  authorName,
}: PostExcerptCardProps) {
  const formattedDate = date
    ? `${new Date(date).getFullYear()}-${String(
        new Date(date).getMonth() + 1
      ).padStart(2, "0")}-${String(new Date(date).getDate()).padStart(2, "0")}`
    : null;

  return (
    <article>
      {featuredImage ? <img src={featuredImage} /> : ""}
      <h3 className="text-xl font-serif font-bold mt-3">{title}</h3>
      {excerpt ? (
        <div
          className="italic text-slate-800 text-base wp-excerpt"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      ) : (
        ""
      )}
      {authorName && formattedDate ? (
        <div className="text-slate-800 text-base mt-1">
          {authorName} <br />
          {formattedDate}
        </div>
      ) : (
        ""
      )}
    </article>
  );
}
