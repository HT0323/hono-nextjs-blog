import { Hono } from "hono";
import { handle } from "hono/vercel";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { title } from "process";

const prisma = new PrismaClient();
const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

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
  })
  .post("/articles", zValidator("json", schema), async (c) => {
    const { title, content } = c.req.valid("json");
    const article = await prisma.article.create({
      data: {
        title: title,
        content: content,
        userId: 1, //いったん固定値
      },
    });
    return c.json(article);
  });

export const GET = handle(app);
export const POST = handle(app);
export type AppType = typeof route;
