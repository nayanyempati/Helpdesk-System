import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'app/backend-api/admin.service';
import { TicketsService } from 'app/backend-api/tickets/tickets.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {
  addClientForm: FormGroup
  Logo: string
  logoFile = [];
  constructor(
    private _adminService: AdminService,
    private _fb: FormBuilder,
    private _ticketService: TicketsService,
    private _matSnackBar:MatSnackBar
  ) {

  }

  ngOnInit(): void {
    // Create the form
    this.addClientForm = this._fb.group({
      Clientname: [null, (Validators.required)],
    });
  }

  uploadAttachment(event) {
    this.onRemovePoc(event);
    this.logoFile.push(...event.addedFiles);
    this._ticketService.UploadFile(this.logoFile).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this.Logo = response.Message;

        }
      }
    })
  }

  onRemovePoc(event) {
    this.logoFile.splice(this.logoFile.indexOf(event), 1);

  }


  addClient() {
    if (!this.addClientForm.valid) {
      return;
    }
    this.addClientForm.addControl("Logo", new FormControl(this.Logo))
    this.addClientForm.disable();
    this._adminService.addClient(this.addClientForm.value).subscribe({
      next: (response) => {
        this.addClientForm.enable()
        this._matSnackBar.open(response.Message, 'End now', {
          duration: 2000,
          panelClass: "",
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    })

  }
}
