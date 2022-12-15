import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/backend-api/admin.service';
import { UserModel } from 'app/models/usersModel';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})
export class ClientOverviewComponent {
  company: string
  token: string
  userCount: number = 0;
  public userTableColumns = [ 'Name', 'Email', 'Status', 'Action'];
  public dataSource = new MatTableDataSource<UserModel>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _adminService: AdminService,
    private _matSnackBar:MatSnackBar,
    private _router: Router

  ) {
    const path = this._router.url.split('?')[0];
    this.token = path.split('/').filter(x => x !== '')[2];
    this.clientDetails();
  }

  clientDetails() {
    this._adminService.clientDetails(this.token).subscribe({
      next: (response) => {
        this.company = response.CompanyName
        this.listUsers(response.Id)
      }
    })
  }

  listUsers(Id: number) {
    this._adminService.listClientEmployees(Id).subscribe({
      next: (response) => {
        this.dataSource.data = response as UserModel[]
        this.userCount = this.dataSource.data.length;
      }
    })
  }

  searchUser(key: any) {
    key = key.trim();
    key = key.toLowerCase();
    this.dataSource.filter = key;
    this.userCount = this.dataSource.filteredData.length;
  }

  userAction(type: string, token: string) {
    if (type == "Approve") {
      this._adminService.approve(token).subscribe({
        next: (respose) => {
          this.clientDetails();
          this._matSnackBar.open(respose.Message, 'End now', {
            duration: 1200,
            panelClass: "",
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      })
    }
    if (type == "Disable") {
      this._adminService.disableUser(token).subscribe({
        next: (respose) => {
          this.clientDetails();
          this._matSnackBar.open(respose.Message, 'End now', {
            duration: 1200,
            panelClass: "",
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      })
    }
    if (type == "Enable") {
      this._adminService.enableUser(token).subscribe({
        next: (respose) => {
          this.clientDetails();
          this._matSnackBar.open(respose.Message, 'End now', {
            duration: 1200,
            panelClass: "",
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      })
    }
  }

  /**
 * Track by function for ngFor loops
 *
 * @param index
 * @param item
 */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  /**
* On destroy
*/
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
