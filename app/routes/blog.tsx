import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import BlogHeader from "~/components/BlogHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "Zalgorithm" },
    { name: "description", content: "Simon's blog" },
  ];
};

export default function BlogIndex() {
  return (
    <div>
      <BlogHeader />
      <Outlet />
    </div>
  );
}
