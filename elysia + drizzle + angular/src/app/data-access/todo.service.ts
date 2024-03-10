import { createInjectable } from "ngxtension/create-injectable";
import { injectEdenClient, Todo } from "./eden-treaty";
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from "@tanstack/angular-query-experimental";
import { Type } from "@angular/core";

export const TodoService = createInjectable(() => {
  const edenClient = injectEdenClient();
  const queryClient = injectQueryClient();

  const query = injectQuery(() => ({
    queryKey: ["todos"],
    queryFn: () => edenClient.todos.get().then((r) => r.data),
  }));

  const deleteMutation = injectMutation(() => ({
    mutationFn: (id: Todo["id"]) => edenClient.todos.remove[id].post(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  }));

  const toggleMutation = injectMutation(() => ({
    mutationFn: (id: Todo["id"]) => edenClient.todos.toggle[id].post(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  }));

  const addMutation = injectMutation(() => ({
    mutationFn: (content: Todo["content"]) =>
      edenClient.todos.post({ content }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  }));

  return {
    query,
    remove: (id: Todo["id"]) => deleteMutation.mutate(id),
    toggle: (id: Todo["id"]) => toggleMutation.mutate(id),
    add: (content: Todo["content"]) => addMutation.mutate(content),
  };
});

export type TodoServiceApi = typeof TodoService extends Type<infer T> ? T
  : never;
