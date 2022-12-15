import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { throwError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  serverUrl = environment.apiUrl;
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private router: Router,
    private _userService: UserService) {
  }



  get AccessToken(): string {
    return localStorage.getItem('AccessToken') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Sign in - POST
  // -----------------------------------------------------------------------------------------------------

  signIn(data: any) {

    return this.http.post<any>(`${this.serverUrl}account/login`, data, { headers: this.headers })
      .pipe(
        map((response: any) => {
          if (response.AccessToken) {
            // Store the access token in the local storage
            localStorage.setItem('AccessToken', response.AccessToken);
            // Set the authenticated flag to true
            this._authenticated = true;

          }
          // Return a new observable with the response
          return response;
        })
      );
  }

  activateAccount(data: any, token: string) {
    return this.http.post<any>(`${this.serverUrl}account/activate/` + token, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Forgot Password - POST
  // -----------------------------------------------------------------------------------------------------

  forgotPassword(email: string) {
    return this.http.post<any>(`${this.serverUrl}account/forgot/` + email, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  changePassword(data: any) {
    return this.http.post<any>(`${this.serverUrl}account/changepasseword/`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Reset Password - PUT
  // -----------------------------------------------------------------------------------------------------

  resetPassword(email: string, token: string, data: any) {
    return this.http.post<any>(`${this.serverUrl}account/reset/` + email + '/' + token, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Reqeust Account - POST
  // -----------------------------------------------------------------------------------------------------

  requestAccount(data: any) {
    return this.http.post<any>(`${this.serverUrl}account/requestaccount`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Activate Account - PUT
  // -----------------------------------------------------------------------------------------------------

  accountActivate(data: any) {
    return this.http.put<any>(`${this.serverUrl}account/activate`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Signout Account - PUT
  // -----------------------------------------------------------------------------------------------------

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('AccessToken');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Check the authentication status
  // -----------------------------------------------------------------------------------------------------


  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.AccessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.AccessToken)) {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    return this.signInUsingToken();
  }



  // -----------------------------------------------------------------------------------------------------
  // @ Sign in using the access token
  // -----------------------------------------------------------------------------------------------------


  signInUsingToken(): Observable<any> {
    // Renew token
    return this.http.get<any>(`${this.serverUrl}account/refreshtoken`)
      .pipe(
        map((response: any) => {

          if (response.token) {
            // Store the access token in the local storage
            localStorage.setItem('AccessToken', response.token);
            // Set the authenticated flag to true
            this._authenticated = true;



          }
          // Return a new observable with the response
          return response;
        })
      );
  }
}


