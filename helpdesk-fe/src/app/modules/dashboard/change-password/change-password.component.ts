import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelpdeskValidators } from '@helpdesk/validators';
import { AccountService } from 'app/backend-api/account/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _accountService: AccountService,
    private _matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // Create the form
    this.changePasswordForm = this._fb.group({
      OldPassword: ['', (Validators.required, Validators.minLength(12))],
      NewPassword: ['', Validators.required]
    },
      {
        validators: HelpdeskValidators.mustMatch('OldPassword', 'NewPassword')
      }
    );
  }

  changePassword() {
    if (!this.changePasswordForm.valid) {
      return;
    }
    this.changePasswordForm.disable();
    this._accountService.changePassword(this.changePasswordForm.value).subscribe({
      next: (response) => {
        this.changePasswordForm.enable();
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
