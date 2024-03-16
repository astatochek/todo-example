import { ApplicationConfig } from "@angular/core";
import { provideTRPCClient } from "./data-access/trpc-clent";

export const appConfig: ApplicationConfig = {
  providers: [provideTRPCClient()],
};
