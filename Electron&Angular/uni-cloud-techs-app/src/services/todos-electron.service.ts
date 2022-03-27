import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronAPI } from 'src/models/electron-api.interface';
import { Todo } from '../models/todo.model';
import { TodosService } from './todos.service';

export class TodosElectronService extends TodosService {
  constructor(private electron: ElectronAPI) {
    super();
  }

  async get(): Promise<Todo[]> {
    return [];
  }

  async create(todo: Todo): Promise<void> {}

  async update(todo: Todo): Promise<void> {}

  async delete(id: number): Promise<void> {}
}
