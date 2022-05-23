import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './component/form-builder/form-builder.component';
import { FormComponent } from './component/form/form.component';

const routes: Routes = [
  { path: 'forms', component: FormComponent },
  { path: 'createForm', component: FormBuilderComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
