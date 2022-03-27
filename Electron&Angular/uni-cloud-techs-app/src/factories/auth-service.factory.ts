import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ElectronAPI } from 'src/models/electron-api.interface';
import { AuthElectronService } from 'src/services/auth-electron.service';
import { AuthWebService } from 'src/services/auth-web.service';
import { TodosElectronService } from 'src/services/todos-electron.service';
import { TodosWebService } from '../services/todos-web.service';

export class AuthServiceFactory {
  static getTodoService(http: HttpClient, router: Router) {
    const electronApi = (<any>window).electronAPI as ElectronAPI;

    if (electronApi) {
      return new AuthElectronService(electronApi, router);
    } else {
      return new AuthWebService(http, router);
    }
  }
}
