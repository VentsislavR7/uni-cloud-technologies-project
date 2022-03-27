import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] | null = null;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  onTodoCreated() {
    this.fetchTodos();
  }

  onTodoUpdated() {
    this.fetchTodos();
  }

  onTodoDeleted() {
    this.fetchTodos();
  }

  private fetchTodos() {
    this.todosService.get().then((todos) => {
      this.todos = todos.sort((left: Todo, right: Todo) => {
        if (left.completed && right.completed) {
          return 0;
        } else if (left.completed) {
          return 1;
        } else {
          return -1;
        }
      });
    });
  }
}
