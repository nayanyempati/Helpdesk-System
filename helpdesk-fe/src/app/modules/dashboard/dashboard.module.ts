import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HelpdeskAlertModule } from '@helpdesk/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';
import { FaqComponent } from './faq/faq.component';
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select'
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeesComponent } from './employees/employees.component';
import { ClientsComponent } from './clients/clients.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ViewAdminTicketComponent } from './view-admin-ticket/view-admin-ticket.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ClientOverviewComponent } from './clients/client-overview/client-overview.component';
const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'clients/:id/overview',
        component: ClientOverviewComponent
      },
      {
        path: 'clients/add',
        component: AddClientComponent
      },
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'employees/add',
        component: AddEmployeeComponent
      },
      {
        path: 'tickets',
        component: ListTicketsComponent
      },
      {
        path: 'ticketslist',
        component: TicketListComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'ticketslist/:id/details',
        component: ViewAdminTicketComponent
      },
      {
        path: 'tickets/:id/view',
        component: ViewTicketComponent
      },
      {
        path: 'create',
        component: CreateTicketComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    OverviewComponent,
    MyProfileComponent,
    CreateTicketComponent,
    ViewTicketComponent,
    ListTicketsComponent,
    EmployeesComponent,
    ClientsComponent,
    TicketListComponent,
    ChangePasswordComponent,
    ViewAdminTicketComponent,
    AddEmployeeComponent,
    AddClientComponent,
    ClientOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatInputModule,
    HelpdeskAlertModule,
    SharedModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    NgxDropzoneModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ]
})
export class DashboardModule { }
