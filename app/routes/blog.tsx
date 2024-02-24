import PostExcerptCard from "~/components/PostExcerptCard";

const sections = [
  "Latest Posts",
  "Web Development",
  "Modular",
  "Ride Logs",
  "Definitions",
  "Zalgorithm",
];
const iterations = Array(5).fill(0);

export default function Blog() {
  return (
    <div className="px-6 mx-auto">
      {sections.map((section) => (
        <div key={section}>
          <h2 className="text-2xl text-slate-900 mt-3 font-serif font-bold">
            {section}
          </h2>
          <hr className="my-3 border-solid border-slate-900" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {iterations.map((_, index) => (
              <PostExcerptCard key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
