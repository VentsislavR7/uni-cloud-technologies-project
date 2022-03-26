import { HttpClient } from '@angular/common/http';
import { TodosWebService } from '../services/todos-web.service';
import { TodosService } from '../services/todos.service';

export class TodoServiceFactory {
  static getTodoService(http: HttpClient) {
    const electronApi = (<any>window).electron;

    if (electronApi) {
      return new TodosWebService(http);
    } else {
      return new TodosWebService(http);
    }
  }
}
