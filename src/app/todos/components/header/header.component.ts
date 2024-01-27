import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  todoText: string = '';

  constructor(private todoService: TodosService) {
    // this.todoService.todos$.subscribe((todo) => {
    //   console.log('todos :', todo);
    // });
  }
  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todoText = target.value;
    // console.log(this.todoText);
  }
  addToDo(): void {
    this.todoService.addTodo(this.todoText);
    this.todoText = '';
    // console.log('addTodo', this.todoText);
  }
}
