import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './component/form-builder/form-builder.component';
import { FormComponent } from './component/form/form.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './component/form-dialog/form-dialog.component';
import { HomeComponent } from './component/home/home.component';
import { FormBuilderDialogComponent } from './component/form-builder-dialog/form-builder-dialog.component'
import { MatSelectModule } from '@angular/material/select';
import { FormExecutionComponent } from './component/form-execution/form-execution.component';




@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormBuilderComponent,
    RegisterComponent,
    LoginComponent,
    FormDialogComponent,
    HomeComponent,
    FormBuilderDialogComponent,
    FormExecutionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
