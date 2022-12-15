import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  serverUrl = environment.apiUrl;
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private router: Router,
    private _userService: UserService) {
  }


  listEmployees() {
    return this.http.get<any>(`${this.serverUrl}admin/listemployees`);
  }


  listClients() {
    return this.http.get<any>(`${this.serverUrl}admin/listclient`);
  }

  ticketDetails(token: string) {
    return this.http.get<any>(`${this.serverUrl}admin/viewticket/` + token);
  }
  listTickets() {
    return this.http.get<any>(`${this.serverUrl}admin/listtickets`);
  }

  assignTicket(token: string, userId: number) {
    return this.http.post<any>(`${this.serverUrl}admin/assign/` + token + '/' + userId, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  addEmployee(data: any) {
    return this.http.post<any>(`${this.serverUrl}admin/addemployee`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  addClient(data: any) {
    return this.http.post<any>(`${this.serverUrl}admin/addclient`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  clientDetails(token: String) {
    return this.http.get<any>(`${this.serverUrl}admin/client/` + token);
  }


  listClientEmployees(Id: number) {
    return this.http.get<any>(`${this.serverUrl}admin/client/employees/` + Id);
  }

  approve(token:string) {
    return this.http.post<any>(`${this.serverUrl}admin/approveuser/`+token, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  disableUser(token:string) {
    return this.http.post<any>(`${this.serverUrl}admin/disableuser/`+token, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  enableUser(token:string) {
    return this.http.post<any>(`${this.serverUrl}admin/enableuser/`+token, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

}
