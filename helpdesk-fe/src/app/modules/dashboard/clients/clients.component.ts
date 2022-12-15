import { Component } from '@angular/core';
import { AdminService } from 'app/backend-api/admin.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  clients: any
  clientsCount :number=0
  
  constructor(
    private _adminService: AdminService
  ) {
    this.listClient();
  }


  listClient() {
    this._adminService.listClients().subscribe({
      next: (response) => {
        this.clients = response;
        this.clientsCount=response.length
      }
    })
  }


}
