import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronAPI } from 'src/models/electron-api.interface';
import { AuthGuard } from '../guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const electronApi = (<any>window).electronAPI as ElectronAPI;

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: TodoListComponent, pathMatch: 'full' }],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: !!electronApi })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
