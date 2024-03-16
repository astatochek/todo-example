import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createInjectionToken } from "ngxtension/create-injection-token";
import type { AppRouter } from "@server/router";

const tRPCClientFactory = () => {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3333/",
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: "include",
          });
        },
      }),
    ],
  });
};

export const [injectTRPCClient, provideTRPCClient] = createInjectionToken(
  tRPCClientFactory,
);
