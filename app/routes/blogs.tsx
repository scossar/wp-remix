import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    blogs: await db.blog.findMany(),
  });
};

export default function Blogs() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {data.blogs.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url}>{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
