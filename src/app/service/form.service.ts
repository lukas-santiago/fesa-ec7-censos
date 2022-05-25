import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form } from '../models/form.model';
import { AppSettings } from '../app-settings';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getForms(): Observable<Form[]> {
    let httpOptions = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + AuthenticationService.user.authdata
      }
    }
    return this.http.get<Form[]>(AppSettings.API_ROUTES.Form, httpOptions)
  }
}
