import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeadersOverrideInterceptor } from '../interceptors/headers-override.interceptor';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { TodosService } from '../services/todos.service';
import { TodoServiceFactory } from '../factories/todo-service.factory';
import { TodosWebService } from '../services/todos-web.service';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { LayoutComponent } from './layout/layout.component';
import { TodoRowComponent } from './todo-list/todo-row/todo-row.component';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { AuthServiceFactory } from 'src/factories/auth-service.factory';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    LoginComponent,
    TodoCreateComponent,
    LayoutComponent,
    TodoRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersOverrideInterceptor,
      multi: true,
    },
    {
      provide: TodosService,
      deps: [HttpClient],
      useFactory: (http: HttpClient) => {
        return TodoServiceFactory.getTodoService(http);
      },
    },
    {
      provide: AuthService,
      deps: [HttpClient, Router],
      useFactory: (http: HttpClient, router: Router) => {
        return AuthServiceFactory.getTodoService(http, router);
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
