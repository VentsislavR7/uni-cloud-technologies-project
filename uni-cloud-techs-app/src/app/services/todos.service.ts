import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable()
export abstract class TodosService extends BaseService {
  protected readonly todosEndPoint = `${this.baseUrl}/todos`;

  constructor(protected http: HttpClient) {
    super();
  }

  abstract getTodos(): Observable<Todo[]>;
}
