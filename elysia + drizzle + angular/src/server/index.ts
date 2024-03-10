import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { db } from "./db/index";
import { todos } from "./db/schema";
import { eq } from "drizzle-orm";

const app = new Elysia()
  .use(cors())
  .get("/todos", async () => {
    const data = await db.select().from(todos).all();
    return data;
  })
  .post("/todos/toggle/:id", async ({ params }) => {
    const oldTodo = await db
      .select()
      .from(todos)
      .where(eq(todos.id, params.id))
      .get();
    await db
      .update(todos)
      .set({ completed: !oldTodo?.completed })
      .where(eq(todos.id, params.id))
      .returning()
      .get();
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post("/todos/remove/:id", async ({ params }) => {
    await db.delete(todos).where(eq(todos.id, params.id)).run();
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post("/todos", async ({ body }) => {
    if (!body.content.length) {
      throw new Error("Content cannot be empty");
    }
    await db.insert(todos).values(body).returning().get();
  }, {
    body: t.Object({
      content: t.String(),
    }),
  })
  .listen(8080);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
