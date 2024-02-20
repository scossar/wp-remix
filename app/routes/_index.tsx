import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Hello World!" },
    { name: "description", content: "Hello World!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Hello World!</h1>
      <p>
        This is a test, this is only a test.... Please do not adjust your set.
      </p>
    </div>
  );
}
