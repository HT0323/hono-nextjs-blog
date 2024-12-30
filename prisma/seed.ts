import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { articleData, userData } from "./seedData";

async function main() {
  console.log("Start delete article...");
  await prisma.article.deleteMany({});
  console.log("Finsh delete article...");

  console.log("Start delete user...");
  await prisma.user.deleteMany({});
  console.log("Finsh delete user...");

  console.log("Start create user...");
  for (const user of userData) {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
      },
    });
  }
  console.log("Finsh create user...");

  console.log("Start create article...");
  for (const article of articleData) {
    await prisma.article.create({
      data: {
        id: article.id,
        title: article.title,
        content: article.content,
        userId: article.userId,
        updateAt: article.updateAt,
        createdAt: article.createdAt,
      },
    });
  }
  console.log("Finsh create article...");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
