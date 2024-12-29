import { Hono } from "hono";
import { handle } from "hono/vercel";
import { testData } from "./testData";

const app = new Hono().basePath("/api");
const route = app
  .get("/articles", (c) => {
    return c.json(testData);
  })
  .get("/article/:id", (c) => {
    return c.json(
      testData.filter((d) => d.id === Number(c.req.param("id")))[0]
    );
  });

export const GET = handle(app);
export type AppType = typeof route;
