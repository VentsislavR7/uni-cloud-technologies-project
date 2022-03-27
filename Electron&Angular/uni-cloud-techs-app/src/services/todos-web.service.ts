import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { TodosService } from './todos.service';

@Injectable()
export class TodosWebService extends TodosService {
  protected readonly todosEndPoint = `${this.baseUrl}/todos`;
  protected readonly createTodoEndPoint = `${this.baseUrl}/todos`;
  protected readonly updateTodoEndPoint = (id: number) =>
    `${this.baseUrl}/todos/${id}`;
  protected readonly deleteTodoEndPoint = (id: number) =>
    `${this.baseUrl}/todos/${id}`;

  constructor(protected http: HttpClient) {
    super();
  }

  get() {
    return this.http.get<Todo[]>(this.todosEndPoint).toPromise();
  }

  create(todo: Todo): Promise<void> {
    return this.http
      .post<void>(this.createTodoEndPoint, JSON.stringify(todo))
      .toPromise();
  }

  update(todo: Todo): Promise<void> {
    return this.http
      .put<void>(this.updateTodoEndPoint(todo.id), JSON.stringify(todo))
      .toPromise();
  }

  delete(id: number): Promise<void> {
    return this.http.delete<void>(this.deleteTodoEndPoint(id)).toPromise();
  }
}
