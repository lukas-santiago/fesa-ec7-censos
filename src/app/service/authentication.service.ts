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
  static authenticatedObservable: Observable<boolean>
  static _authenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    AuthenticationService.user = new User();
    AuthenticationService._authenticated.next(this.isAuthenticated());
    AuthenticationService.authenticatedObservable = AuthenticationService._authenticated.asObservable()
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
        AuthenticationService.user.name = data.name
        AuthenticationService.user.username = data.username
        AuthenticationService.user.email = data.email
        AuthenticationService.user.authdata = window.btoa(signin.usernameOrEmail + ':' + signin.password)

        AuthenticationService._authenticated.next(true)

        return data
      }))
  }
  public signout(): Observable<any> {
    return this.http.get<any>(AppSettings.API_ROUTES.SignOut).pipe(
      map(() => {
        AuthenticationService._authenticated.next(false)
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
    return AuthenticationService._authenticated.getValue();
  }
}
