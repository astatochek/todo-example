import { appRouter } from "./router";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

createHTTPServer({
  middleware: cors({
    origin: true,
    credentials: true,
  }),
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(3333);
