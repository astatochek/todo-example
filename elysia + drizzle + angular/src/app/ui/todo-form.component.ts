import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Todo } from "@client/data-access/eden-treaty";
import { TodoService } from "@client/data-access/todo.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: "todo-form",
  imports: [ReactiveFormsModule],
  template: `
    <form
      class="flex flex-row space-x-3"
      (submit)="onSubmit($event)"
    >
      <input type="text" [formControl]="content" class="border border-black" />
      <button type="submit">Add</button>
    </form>
`,
})
export class TodoFormComponent {
  readonly content = new FormControl<Todo["content"]>("", {
    nonNullable: true,
  });

  private service = inject(TodoService);

  onSubmit(event: Event) {
    event.preventDefault();
    this.service.add(this.content.value);
    this.content.reset();
  }
}
