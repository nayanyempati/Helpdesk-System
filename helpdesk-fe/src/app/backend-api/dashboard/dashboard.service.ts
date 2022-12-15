import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  serverUrl = environment.apiUrl;
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private router: Router,
    private _userService: UserService) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Logged In User Details - GET
  // -----------------------------------------------------------------------------------------------------
  userDetails() {
    return this.http.get<any>(`${this.serverUrl}user/details`);
  }

  dashboardOverview() {
    return this.http.get<any>(`${this.serverUrl}admin/dashboardcount`);
  }

  dashboardOverviewEmployee() {
    return this.http.get<any>(`${this.serverUrl}admin/dashboardcount/employee`);
  }

}
