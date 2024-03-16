import { createInjectable } from "ngxtension/create-injectable";
import { injectTRPCClient, Todo } from "./trpc-clent";
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from "@tanstack/angular-query-experimental";

export const TodoRepository = createInjectable(() => {
  const trpc = injectTRPCClient();
  const queryClient = injectQueryClient();

  const query = injectQuery(() => ({
    queryKey: ["todos"],
    queryFn: () => trpc.todos.query(),
  }));

  const add = injectMutation(() => ({
    mutationFn: (content: Todo["content"]) => trpc.addTodo.mutate({ content }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  })).mutate;

  return { query, actions: { add } };
});
