import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base-service.service';
import { AuthResponse } from '../models/auth-response.interface';

@Injectable()
export abstract class AuthService extends BaseService {
  protected _token: string | null = null;

  get token() {
    return this._token;
  }

  get isLoggedIn() {
    return !!this._token;
  }

  constructor(protected router: Router) {
    super();
  }

  abstract login(email: string, password: string): Promise<AuthResponse>;

  abstract tryAutoLogin(): Promise<void>;

  abstract logout(): Promise<void>;
}
