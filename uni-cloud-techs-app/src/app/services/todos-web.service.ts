import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodosService } from './todos.service';

@Injectable()
export class TodosWebService extends TodosService {
  getTodos() {
    return this.http.get<Todo[]>(this.todosEndPoint);
  }
}
