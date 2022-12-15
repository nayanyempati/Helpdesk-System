import { Component } from '@angular/core';
import { DashboardService } from 'app/backend-api/dashboard/dashboard.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  details: any
  Role: string
  profile: any;
  dashboard: any;
  dashboardEmployee: any;
  constructor(
    private _dashbaordService: DashboardService,) {
    this.userDetails();
    this.dashboardOverview();
  }

  userDetails() {
    this._dashbaordService.userDetails().subscribe({
      next: (response) => {
        this.profile = response;
        this.Role = response.Role;
      }
    })
  }

  dashboardOverview() {
    this._dashbaordService.dashboardOverview().subscribe({
      next: (response) => {
        this.dashboard = response;
      }
    })
  }
}
