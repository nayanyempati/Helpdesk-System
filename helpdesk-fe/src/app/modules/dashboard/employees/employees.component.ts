import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'app/backend-api/admin.service';
import { TicketsService } from 'app/backend-api/tickets/tickets.service';
import { EmployeeModel } from 'app/models/employeeModel';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  public employeeTableColumns = ['Id', 'FullName', 'Role', 'Action'];
  public dataSource = new MatTableDataSource<EmployeeModel>();
  spinner: boolean;
  searchKey: string;
  employeeCount: number = 0
  recs = new MatTableDataSource([]);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _ticketService: TicketsService, private _adminService: AdminService) {
    this.getEmployees();

  }

  getEmployees() {
    this._adminService.listEmployees().subscribe({
      next: (response) => {
        this.employeeCount = response.length
  
        this.dataSource.data = response as EmployeeModel[];
      }
    })
  }

  searchEmployee(key) {
    key = key.trim();
    key = key.toLowerCase();
    this.dataSource.filter = key;
    this.employeeCount = this.dataSource.filteredData.length;
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
