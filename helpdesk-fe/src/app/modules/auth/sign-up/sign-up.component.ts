import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { helpdeskAnimations } from '@helpdesk/animations';
import { HelpdeskAlertType } from '@helpdesk/components/alert';
import { AccountService } from 'app/backend-api/account/account.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: helpdeskAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: HelpdeskAlertType; message: string } = {
        type: 'error',
        message: ''
    };
    signUpForm: UntypedFormGroup;
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required],
            Email: ['', [Validators.required, Validators.email]],
            Phone: ['', Validators.required],
            CompanyName: ['', Validators.required],
        }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._accountService.requestAccount(this.signUpForm.value).subscribe({
            next: (response) => {
                if (response.Status == "Success") {
                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/auth/confirmation-required');
                } else {
                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'warning',
                        message: response.Message
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            },
            error: (error) => {
                // Re-enable the form
                this.signUpForm.enable();
                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Something went wrong, please try again.'
                };

                // Show the alert
                this.showAlert = true;
            }
        })
    }
}
