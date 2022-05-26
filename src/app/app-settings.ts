import { SignUp } from './models/signup.model';
export class AppSettings {
  public static API_ENDPOINT = 'http://127.0.0.1:8080/api/';
  public static API_ROUTES = {
    SignUp: this.API_ENDPOINT + 'auth/signup/',
    SignIn: this.API_ENDPOINT + 'auth/signin/',
    SignOut: this.API_ENDPOINT + 'auth/logout/',
    Form: this.API_ENDPOINT + 'form/',
    Field: this.API_ENDPOINT + 'field/',
    FormField: this.API_ENDPOINT + 'formField/',
    FormExecution: this.API_ENDPOINT + 'formExecution/',
  }
}
