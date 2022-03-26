import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base-service.service';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  protected readonly loginUrl = `${this.baseUrl}/login`;

  private _token: string | null = null;

  get token() {
    return this._token;
  }

  get isLoggedIn() {
    return !!this._token;
  }

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        this.loginUrl,
        JSON.stringify({
          email: email,
          password: password,
        })
      )
      .pipe(
        tap((response: AuthResponse) => {
          this._token = response.token;

          sessionStorage.setItem('uct-auth', this._token);

          this.router.navigate(['']);
        })
      );
  }

  tryAutoLogin() {
    this._token = sessionStorage.getItem('uct-auth');

    if (this._token) {
      this.router.navigate(['']);
    }
  }

  logout() {
    this._token = null;
    sessionStorage.removeItem('uct-auth');

    this.router.navigate(['login']);
  }
}
