import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './component/form-builder/form-builder.component';
import { FormComponent } from './component/form/form.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { FormExecutionComponent } from './component/form-execution/form-execution.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'forms', component: FormComponent },
  { path: 'form-builder', component: FormBuilderComponent },
  { path: 'form-execution', component: FormExecutionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
