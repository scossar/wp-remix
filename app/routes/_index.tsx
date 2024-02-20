import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Hello World!" },
    { name: "description", content: "Hello World!" },
  ];
};

export default function Index() {
  return (
    <div className="max-w-md mx-auto my-2">
      <h1 className="text-3xl">Hello World!</h1>
      <p className="my-1">
        This is a test, this is only a test.... Please do not adjust your set.
        Normal programming will resume shortly...
      </p>
      <p>Soon I promise...</p>
    </div>
  );
}
