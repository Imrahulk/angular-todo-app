import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  noTodoClass$!: Observable<boolean>;
  activeCount$: Observable<number>;
  constructor(private todosService: TodosService) {
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
  }
}
