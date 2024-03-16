import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { injectTRPCClient } from "./data-access/trpc-clent";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  template: `{{ hello | async | json }}`,
})
export class AppComponent {
  hello = injectTRPCClient().hello.query();
}
