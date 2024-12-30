import { Hono } from "hono";
import { handle } from "hono/vercel";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = new Hono().basePath("/api");
const route = app
  .get("/articles", async (c) => {
    const articles = await prisma.article.findMany({
      include: { user: true },
      orderBy: { updateAt: "desc" },
      take: 10,
    });
    return c.json(articles);
  })
  .get("/article/:id", async (c) => {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(c.req.param("id")),
      },
      include: { user: true },
    });
    return c.json(article);
  });

export const GET = handle(app);
export type AppType = typeof route;
