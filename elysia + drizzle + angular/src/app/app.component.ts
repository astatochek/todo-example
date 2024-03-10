import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodoService } from "./data-access/todo.service";
import { TodoItemComponent } from "./ui/todo-item.component";
import { AngularQueryDevtools } from "@tanstack/angular-query-devtools-experimental";
import { TodoFormComponent } from "./ui/todo-form.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    TodoItemComponent,
    TodoFormComponent,
    AngularQueryDevtools,
  ],
  providers: [TodoService],
  template: `
    @if (todo.query.isPending()) {
      Loading...
    }
    @if (todo.query.error(); as error) {
      An error has occurred: {{ error.message }}
    }
    @if (todo.query.data(); as todos) {
      @for (todo of todos; track todo.id) {
        <todo-item [todo]="todo" />
      }
    }
    <todo-form />

    <angular-query-devtools initialIsOpen />
`,
})
export class AppComponent {
  readonly todo = inject(TodoService);
}
