import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/models/auth-response.interface';
import { ElectronAPI } from 'src/models/electron-api.interface';
import { AuthService } from './auth.service';

export class AuthElectronService extends AuthService {
  constructor(private electron: ElectronAPI, protected router: Router) {
    super(router);
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = (await this.electron.login(email, password)) as AuthResponse;

    if (data.token) {
      this._token = data.token;
      this.electron.setToken(this._token);
      this.router.navigate(['']);
    }

    return data;
  }

  async tryAutoLogin() {
    this._token = await this.electron.tryGetToken();

    if (this._token) {
      this.router.navigate(['']);
    }
  }

  async logout() {
    this._token = null;
    await this.electron.setToken(null);

    this.router.navigate(['login']);
  }
}
