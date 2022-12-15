import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'app/backend-api/admin.service';
import { TicketsService } from 'app/backend-api/tickets/tickets.service';
import { TicketModel } from 'app/models/ticketModel';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent {

  public ticketTableColumns = ['Id', 'Title', 'Priority', 'CreatedOn', 'Status','Action'];
  public dataSource = new MatTableDataSource<TicketModel>();
  spinner: boolean;
  searchKey: string;
  ticketCount:number=0
  recs = new MatTableDataSource([]);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _ticketService: TicketsService, private _adminService:AdminService) {
    this.getTicketList();

  }

  ngOnInit(): void {
  }

  getTicketList() {
    this._adminService.listTickets().subscribe({
      next: (response) => {
        this.ticketCount=response.length
        this.dataSource.data = response as TicketModel[];
      }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getpriority(Status: string) {
    if (Status == "High") {
      return "<span class='badge badge-danger'>High</span>";
    } if (Status == "Medium") {
      return "<span class='badge badge-warning'>Medium</span>";
    }
    if (Status == "Low") {
      return "<span class='badge badge-success'>Low</span>";
    }
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  searchTicket(key){
    key = key.trim();
    key = key.toLowerCase();
    this.dataSource.filter = key;
    this.ticketCount = this.dataSource.filteredData.length;
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
