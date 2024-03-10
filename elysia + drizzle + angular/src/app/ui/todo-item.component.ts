import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import { Todo } from "@client/data-access/eden-treaty";
import { TodoService, TodoServiceApi } from "@client/data-access/todo.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: "todo-item",
  template: `
    @if (todo(); as todo) {
     <div class="flex flex-row space-x-3">
      <p>{{todo.content}}</p>
      <input (click)="actions.toggle(todo.id)" type="checkbox" [checked]="todo.completed">
      <button (click)="actions.remove(todo.id)" class="text-red-500"> X </button>
    </div>
  }
`,
})
export class TodoItemComponent {
  readonly todo = input<Todo>();

  readonly actions: Pick<TodoServiceApi, "toggle" | "remove">;

  constructor() {
    const { toggle, remove } = inject(TodoService);
    this.actions = { toggle, remove };
  }
}
