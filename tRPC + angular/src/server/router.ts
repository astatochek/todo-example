import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

let id = 1;

let todos: { id: number; content: string; done: boolean }[] = [
  { id: 0, content: "TODO 1", done: false },
  { id: 1, content: "TODO 2", done: true },
];

export const appRouter = router({
  todos: publicProcedure.query(() => {
    return todos;
  }),
  addTodo: publicProcedure
    .input(
      z.object({
        content: z.string(),
      }),
    )
    .mutation(({ input }) => {
      const todo = {
        id: ++id,
        done: false,
        ...input,
      };
      todos.push(todo);
      return todo;
    }),
});

export type AppRouter = typeof appRouter;
