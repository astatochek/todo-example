import { ApplicationConfig } from "@angular/core";
import { provideTRPCClient } from "./data-access/trpc-clent";
import {
  provideAngularQuery,
  QueryClient,
} from "@tanstack/angular-query-experimental";

export const appConfig: ApplicationConfig = {
  providers: [provideTRPCClient(), provideAngularQuery(new QueryClient())],
};
