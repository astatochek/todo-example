import type { App } from "@server/index";
import { edenTreaty } from "@elysiajs/eden";
import { createInjectionToken } from "ngxtension/create-injection-token";

const client = edenTreaty<App>("http://localhost:8080");

export const [
  injectEdenClient,
  provideEdenClient,
] = createInjectionToken(() => client);

export type Todo = NonNullable<
  Awaited<ReturnType<typeof client["todos"]["get"]>>["data"]
>[number];
