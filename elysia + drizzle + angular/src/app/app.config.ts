import { ApplicationConfig } from "@angular/core";
import { provideEdenClient } from "./data-access/eden-treaty";
import {
  provideAngularQuery,
  QueryClient,
} from "@tanstack/angular-query-experimental";

export const appConfig: ApplicationConfig = {
  providers: [provideEdenClient(), provideAngularQuery(new QueryClient())],
};
