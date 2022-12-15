import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { helpdeskAnimations } from '@helpdesk/animations';
import { HelpdeskValidators } from '@helpdesk/validators';
import { HelpdeskAlertType } from '@helpdesk/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';
import { AccountService } from 'app/backend-api/account/account.service';

@Component({
    selector: 'auth-reset-password',
    templateUrl: './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: helpdeskAnimations
})
export class AuthResetPasswordComponent implements OnInit {
    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;
    token: string
    email: string
    alert: { type: HelpdeskAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    resetPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _accountService: AccountService
    ) {
        const path = this._router.url.split('?')[0];
        this.token = path.split('/').filter(x => x !== '')[2];
        this.email = path.split('/').filter(x => x !== '')[3];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.resetPasswordForm = this._formBuilder.group({
            Password: ['', (Validators.required, Validators.minLength(12))],
            PasswordConfirm: ['', Validators.required]
        },
            {
                validators: HelpdeskValidators.mustMatch('Password', 'PasswordConfirm')
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset password
     */
    resetPassword(): void {
        // Return if the form is invalid
        if (this.resetPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.resetPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Send the request to the server
        this._accountService.resetPassword(this.email, this.token, this.resetPasswordForm.value).subscribe({
            next: (response) => {
                // Show the alert
                this.showAlert = true;
                if (response.Status == "Success") {
                    this.alert = {
                        type: 'success',
                        message: 'Your password has been reset.'
                    };
                } else {
                    this.resetPasswordForm.enable();
                    this.alert = {
                        type: 'warning',
                        message: response.Message
                    };
                }
            },
            error: (error) => {
                this.resetPasswordForm.enable();
                this.alert = {
                    type: 'error',
                    message: "Something went wrong"
                };
            }
        })

    }
}
