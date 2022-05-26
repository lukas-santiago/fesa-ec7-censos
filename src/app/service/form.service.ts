import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { Field } from '../models/field.model';
import { FormExecution } from '../models/form-execution.model';
import { FormField } from '../models/form-field.model';
import { Form } from '../models/form.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  httpOptions: Object = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": AuthenticationService.user.authdata
    }
  }

  constructor(private http: HttpClient) { }

  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(AppSettings.API_ROUTES.Form, this.httpOptions)
  }
  getForm(formId: number): Observable<Form> {
    return this.http.get<Form>(AppSettings.API_ROUTES.Form + formId, this.httpOptions)
  }
  createForm(form: Form): Observable<any> {
    return this.http.post(AppSettings.API_ROUTES.Form, JSON.stringify(form), this.httpOptions)
  }
  editForm(form: Form): Observable<any> {
    return this.http.put(AppSettings.API_ROUTES.Form, JSON.stringify(form), this.httpOptions)
  }
  deleteForm(form: Form): Observable<any> {
    return this.http.delete(AppSettings.API_ROUTES.Form + form.id, this.httpOptions)
  }

  getFields(): Observable<Field[]> {
    return this.http.get<Field[]>(AppSettings.API_ROUTES.Field, this.httpOptions)
  }

  getFormFields(form: Form): Observable<FormField[]> {
    return this.http.get<FormField[]>(AppSettings.API_ROUTES.FormField + '?formId=' + form.id, this.httpOptions)
  }

  saveFormFields(formField: FormField[], form: Form): Observable<any> {
    return this.http.post(AppSettings.API_ROUTES.FormField + 'many/' + form.id, JSON.stringify(formField), this.httpOptions)
  }

  getFormExecution(form: Form): Observable<FormExecution[]> {
    return this.http.get<FormExecution[]>(AppSettings.API_ROUTES.FormExecution + '?formId=' + form.id, this.httpOptions)
  }

  saveFormExecution(formExecution: FormExecution[], form: Form): Observable<any> {
    return this.http.post(AppSettings.API_ROUTES.FormExecution + 'many/' + form.id, JSON.stringify(formExecution), this.httpOptions)
  }
}
