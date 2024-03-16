import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { TodoRepository } from "./data-access/todo.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  providers: [TodoRepository],
  template: `
    @if(todos.query.data(); as data){
      @for(todo of data; track todo.id) {
        <p>{{ todo | json }}</p>
      }
    }
    <input (keydown.enter)="onSubmit($event)">
`,
})
export class AppComponent {
  readonly todos = inject(TodoRepository);

  onSubmit(event: Event): void {
    const content = (event.target as HTMLInputElement).value;
    if (!content) return;
    this.todos.actions.add(content);
  }
}
