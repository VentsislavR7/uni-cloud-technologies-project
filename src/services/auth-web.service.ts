import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthResponse } from 'src/models/auth-response.interface';
import { AuthService } from './auth.service';

@Injectable()
export class AuthWebService extends AuthService {
  protected readonly loginUrl = `${this.baseUrl}/login`;

  constructor(private http: HttpClient, protected router: Router) {
    super(router);
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
      )
      .toPromise();
  }

  async tryAutoLogin() {
    this._token = sessionStorage.getItem('uct-auth');

    if (this._token) {
      this.router.navigate(['']);
    }
  }

  async logout() {
    this._token = null;
    sessionStorage.removeItem('uct-auth');

    this.router.navigate(['login']);
  }
}
