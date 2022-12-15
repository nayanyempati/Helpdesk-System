import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  serverUrl = environment.apiUrl;
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private router: Router,
    private _userService: UserService) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ List Tickets - GET
  // -----------------------------------------------------------------------------------------------------
  listTicketsForClient() {
    return this.http.get<any>(`${this.serverUrl}tickets/clients`);
  }

  listTicketsComments(token:string) {
    return this.http.get<any>(`${this.serverUrl}tickets/commentlist/`+token);
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Forgot Password - POST
  // -----------------------------------------------------------------------------------------------------

  createTicket(data: any) {
    return this.http.post<any>(`${this.serverUrl}tickets/clients/add`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }


  markAsResolved(token: string) {
    return this.http.post<any>(`${this.serverUrl}tickets/markasresolved/`+token, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  createComment(data: any, token:string) {
    return this.http.post<any>(`${this.serverUrl}tickets/createcomment/`+token, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  viewTicket(token: string) {
    return this.http.get<any>(`${this.serverUrl}tickets/view/` + token);
  }

  viewComment(token: string) {
    return this.http.get<any>(`${this.serverUrl}tickets/commentlist/` + token);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ UploadFile Clients - POST
  // -----------------------------------------------------------------------------------------------------
  UploadFile(files: any): Observable<any> {
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post<any>(`${this.serverUrl}tickets/upload/`, formData)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
