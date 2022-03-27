import { HttpClient } from '@angular/common/http';
import { ElectronAPI } from 'src/models/electron-api.interface';
import { TodosElectronService } from 'src/services/todos-electron.service';
import { TodosWebService } from '../services/todos-web.service';

export class TodoServiceFactory {
  static getTodoService(http: HttpClient) {
    const electronApi = (<any>window).electronAPI as ElectronAPI;

    if (electronApi) {
      return new TodosElectronService(electronApi);
    } else {
      return new TodosWebService(http);
    }
  }
}
