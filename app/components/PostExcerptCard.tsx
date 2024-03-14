import { Link } from "@remix-run/react";
import { Maybe } from "graphql/jsutils/Maybe";

// todo: I don't think I need to use `null` with the Maybe generic type
interface PostExcerptCardProps {
  date: Maybe<string | null>;
  featuredImage: Maybe<string | null>;
  title: Maybe<string | null>;
  excerpt: Maybe<string | null>;
  authorName: Maybe<string | null>;
  slug: Maybe<string | null>;
  includeMetaData: boolean;
  basePath: string;
  databaseId: number;
}

export default function PostExcerptCard({
  date,
  featuredImage,
  title,
  excerpt,
  authorName,
  slug,
  includeMetaData,
  basePath,
  databaseId,
}: PostExcerptCardProps) {
  const formattedDate = date
    ? `${new Date(date).getFullYear()}-${String(
        new Date(date).getMonth() + 1
      ).padStart(2, "0")}-${String(new Date(date).getDate()).padStart(2, "0")}`
    : null;

  return (
    <article>
      {featuredImage ? <img className="rounded-md" src={featuredImage} /> : ""}
      <Link prefetch="intent" to={`${basePath}/${databaseId}/${slug}`}>
        <h3 className="text-xl font-serif font-bold mt-3 text-sky-700 hover:underline">
          {title}
        </h3>
      </Link>
      {excerpt ? (
        <div
          className="italic text-slate-800 text-base wp-excerpt"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      ) : (
        ""
      )}
      {includeMetaData && authorName && formattedDate ? (
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
