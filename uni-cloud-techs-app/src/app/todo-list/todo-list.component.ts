import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { AuthService } from '../services/auth.service';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] | null = null;

  constructor(
    private todosService: TodosService,
    private authService: AuthService
  ) {}

  logOut() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.todosService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }
}
