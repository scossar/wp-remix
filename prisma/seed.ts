import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getBlogs().map((blog) => {
      return db.blog.create({ data: blog });
    })
  );
}

seed();

function getBlogs() {
  return [
    {
      title: "Amateur Web Development",
      description: "Stake your claim on the internet.",
      url: "https://amateur.example.com",
    },
    {
      title: "Other ways of knowing",
      description: "You've got this.",
      url: "https://otherways.example.com",
    },
    {
      title: "Algorithm Shmalgorithm",
      description: "Free yourself from the machine",
      url: "https://zalgorithm.com",
    },
  ];
}
