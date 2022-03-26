import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BaseService {
  protected readonly baseUrl: string = '';

  constructor() {
    if (environment.production) {
      this.baseUrl = 'http://cloud-technologies-project.herokuapp.com/api';
    } else {
      this.baseUrl = 'http://cloud-technologies-project.herokuapp.com/api';
    }
  }
}
