import { AuthResponse } from './auth-response.interface';
import { Todo } from './todo.model';

export interface ElectronAPI {
  login(email: string, password: string): Promise<AuthResponse>;
  tryGetToken(): Promise<string | null>;
  setToken(token: string | null): Promise<void>;
  get(): Promise<Todo[]>;
  create(todo: Todo): Promise<void>;
  update(todo: Todo): Promise<void>;
  delete(id: number): Promise<void>;
}
