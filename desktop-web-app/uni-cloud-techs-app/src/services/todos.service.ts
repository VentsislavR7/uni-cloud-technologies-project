import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable()
export abstract class TodosService extends BaseService {
  constructor() {
    super();
  }

  abstract get(): Promise<Todo[]>;

  abstract create(todo: Todo): Promise<void>;

  abstract update(todo: Todo): Promise<void>;

  abstract delete(id: number): Promise<void>;
}
