import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { TicketsService } from 'app/backend-api/tickets/tickets.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: any;
  CreateSupportForm: FormGroup;
  Priorities = ['High', 'Medium', 'Low'];
  departments = ['Technical', 'Billing', 'Sales']
  Spinner: boolean;
  attachmentLink: string
  fileList: {};
  stack: Platform[] = [];
  ticketPOC = [];
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  removable = true;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.stack.push({ name: value.trim() });
    }
    event.chipInput!.clear();
  }

  remove(stack: Platform): void {
    const index = this.stack.indexOf(stack);
    if (index >= 0) {
      this.stack.splice(index, 1);
    }
  }

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _ticketService: TicketsService,
    private _router:Router
  ) {

  }
  ngOnInit(): void {
    this.CreateSupportForm = this._formBuilder.group({
      Ticket: [null, Validators.required],
      Description: [null, Validators.required],
      Priority: [null, Validators.required],
      Department: [null, Validators.required],
      Keywords: [],
    });
  }

  uploadAttachment(event) {
    this.onRemovePoc(event);
    this.ticketPOC.push(...event.addedFiles);
    this._ticketService.UploadFile(this.ticketPOC).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this.attachmentLink = response.Message;

        }
      }
    })
  }

  onRemovePoc(event) {
    this.ticketPOC.splice(this.ticketPOC.indexOf(event), 1);

  }


  createTicket() {
    if (!this.CreateSupportForm.valid) {
      return;
    }
    this.CreateSupportForm.addControl('Attachment', new FormControl(this.attachmentLink));
    // Disable the form
    this.CreateSupportForm.disable();
    this._ticketService.createTicket(this.CreateSupportForm.value).subscribe({
      next: (response) => {
        if(response.Status=="Success")
        {
          this._router.navigate(['/dashboard/tickets/'+response.Message+'/view']);
        }
      },
      error:(error)=>{
        this.CreateSupportForm.enable();
      }
    })

  }
}
export interface Platform {
  name: string;
}