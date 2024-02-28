import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Zalgorithm" },
    { name: "description", content: "A zigzag algorithm." },
  ];
};

export default function Index() {
  return (
    <div className="max-w-md mx-auto my-2">
      <h2 className="text-3xl my-1">Hello World!</h2>
      <p className="my-1">
        I'm developing this site to learn about Remix and headless WordPress
        applications.
      </p>
      <p>
        Click on the "Blog" link in the header to read some WordPress posts.
      </p>
      <p>This is a test, this is only a test...</p>
      <p>This is yet another test...</p>
      <p>and yet another test</p>
    </div>
  );
}
