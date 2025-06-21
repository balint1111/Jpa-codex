import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['DASHBOARD'] } },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: ['DASHBOARD'] } },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard], data: { roles: ['DASHBOARD'] } },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard], data: { roles: ['TASK'] } },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard], data: { roles: ['TASK'] } },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
