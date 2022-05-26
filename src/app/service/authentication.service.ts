import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { ISignIn } from '../models/signin.model';
import { ISignUp } from '../models/signup.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  static user: User;
  static authenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {

    let userJson: any = JSON.parse(localStorage.getItem('user') || '{}')

    if (userJson.authdata?.length > 0) {
      AuthenticationService.user = userJson;
      AuthenticationService.authenticated.next(true);
    }
    else {
      AuthenticationService.user = new User();
      AuthenticationService.authenticated.next(false);
    }

  }
  public signup(signup: ISignUp): Observable<any> {
    console.log("signup");

    let httpOptions = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    return this.http.post<String>(AppSettings.API_ROUTES.SignUp, JSON.stringify(signup), httpOptions)
      .pipe(catchError(this.handleError))
  }
  public signin(signin: ISignIn): Observable<any> {
    console.log("signin");

    let httpOptions = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    return this.http.post<any>(AppSettings.API_ROUTES.SignIn, JSON.stringify(signin), httpOptions)
      // .pipe(catchError(this.handleError))
      .pipe(map(data => {
        let user: User = new User();
        user.name = data.name
        user.username = data.username
        user.email = data.email
        user.authdata = 'Basic ' + window.btoa(signin.usernameOrEmail + ':' + signin.password)

        AuthenticationService.user = user

        localStorage.setItem('user', JSON.stringify(user))
        AuthenticationService.authenticated.next(true)

        return data
      }))
  }
  public signout(): Observable<any> {
    return this.http.get<any>(AppSettings.API_ROUTES.SignOut).pipe(
      map(() => {
        console.log('signout');
        AuthenticationService.authenticated.next(false)
        localStorage.removeItem('user')
      })
    )
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0)
      console.error('Um erro ocorreu em:', error.error);
    else
      console.error(`Backend retornou cóodigo ${error.status}, request body: `, error.error);

    return throwError(() => new Error('Algo errado ocorreu, tente novamente mais tarde.'));
  }
  public isAuthenticated(): boolean {
    // return document.cookie.indexOf('JSESSIONID=') != -1;
    let auth = AuthenticationService.authenticated.getValue()
    let userJson: User = JSON.parse(localStorage.getItem('user') || '{}')
    if (auth && userJson.authdata?.length > 0) {
      AuthenticationService.authenticated.next(true)
      return true;
    }
    AuthenticationService.authenticated.next(false)
    return false;
  }
}
