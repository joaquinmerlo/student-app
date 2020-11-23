import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormAlumnoComponent } from './components/form-alumno/form-alumno.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'edit/:id',
    component: FormAlumnoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: FormAlumnoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
