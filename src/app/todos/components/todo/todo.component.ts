import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();
  editingText: string = '';
  @ViewChild('textInput') textInput!: ElementRef;

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }
  setTodoInEditMode(): void {
    console.log(this.todoProps.id);
    this.setEditingIdEvent.emit(this.todoProps.id);
  }
  removeTodo(): void {
    console.log('remove to do');
    this.todoService.removeTodo(this.todoProps.id);
  }
  toggleTodo(): void {
    this.todoService.toggleTodo(this.todoProps.id);
    console.log('toggleTodo');
  }
  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
    console.log('changeText');
  }
  changeTodo(): void {
    console.log('changeTodo');
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
