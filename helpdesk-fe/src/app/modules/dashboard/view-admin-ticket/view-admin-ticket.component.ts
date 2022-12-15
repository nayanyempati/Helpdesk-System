import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'app/backend-api/admin.service';
import { TicketsService } from 'app/backend-api/tickets/tickets.service';

@Component({
  selector: 'app-view-admin-ticket',
  templateUrl: './view-admin-ticket.component.html',
  styleUrls: ['./view-admin-ticket.component.scss']
})
export class ViewAdminTicketComponent {
  TicketClaims: any
  CommentForm: FormGroup
  assignForm:FormGroup
  token: string
  ticketComments: any;
  employees: any;
  markAsResolved: boolean = true;
  constructor(private _router: Router,
    private _matSnackBar: MatSnackBar,
    private _ticketService: TicketsService,
    private _adminService: AdminService,
    private _fb: FormBuilder) {
    const path = this._router.url.split('?')[0];
    this.token = path.split('/').filter(x => x !== '')[2];
    this.ticketDetails();
    this.loadComment();
    this.listEmployees();
  }

  ngOnInit(): void {
    this.CommentForm = this._fb.group({
      Comment: [null, [Validators.required]],
      AttachmentLink: []
    });

  }

  ticketDetails() {
    this._adminService.ticketDetails(this.token).subscribe({
      next: (response) => {
        this.TicketClaims = response;
        if (response.Status == "Closed") {
          this.markAsResolved = false;
        }

      }
    })
  }

  listEmployees() {
    this._adminService.listEmployees().subscribe({
      next: (response) => {
        this.employees = response;
      }
    })
  }

  assignTicketTo(event:any){
    this._adminService.assignTicket(this.token, event.value).subscribe({
      next:(response)=>{
        this.ticketDetails()
        this._matSnackBar.open(response.Message, 'End now', {
          duration: 1200,
          panelClass: "",
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    })
  }

  ticketagecal(CreatedDate: any) {
    const TicketDate = new Date(CreatedDate);

    var dateNow = new Date();
    var seconds = Math.abs(Date.now() - TicketDate.getTime()) / 1000;
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
    if (days != 0)
      return days + " day"
    if (days > 1)
      return days + " days"
    if (hours != 0)
      return hours + " hour"
    if (hours > 1)
      return hours + " hours"
    if (minutes != 0)
      return minutes + " min";
    if (seconds != 0)
      return seconds + " sec";

  }


  loadComment() {
    this._ticketService.listTicketsComments(this.token).subscribe({
      next: (response) => {
        this.ticketComments = response;
      }
    })
  }

  markResolved() {
    this._ticketService.markAsResolved(this.token).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this.markAsResolved = false;
          this.ticketDetails();
          this.TicketClaims
          this._matSnackBar.open(response.Message, 'End now', {
            duration: 1200,
            panelClass: "",
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }else{
          this._matSnackBar.open(response.Message, 'End now', {
            duration: 1200,
            panelClass: "",
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      }
    })
  }

  createComment() {
    if (!this.CommentForm.valid) {
      return;
    }
    this.CommentForm.disable()
    this._ticketService.createComment(this.CommentForm.value, this.token).subscribe({
      next: (respose) => {
        this.CommentForm.enable()
        this.CommentForm.reset();
        if (respose.Status == "Success") {
          this.loadComment();
          this._matSnackBar.open(respose.Message, 'End now', {
            duration: 1200,
            panelClass: "",
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }else{
          this._matSnackBar.open(respose.Message, 'End now', {
            duration: 1200,
            panelClass: "",
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      },
      error: (error) => {
        this.CommentForm.enable()
      }
    })
  }
}
