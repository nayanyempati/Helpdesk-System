import { Component, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpdeskAlertType } from '@helpdesk/components/alert';
import { AccountService } from 'app/backend-api/account/account.service';
import { AuthService } from 'app/core/auth/auth.service';
import { timer, finalize, takeWhile, takeUntil, tap, Subject } from 'rxjs';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {

  @ViewChild('signInNgForm') signInNgForm: NgForm;

  alert: { type: HelpdeskAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  activateAccount: FormGroup;
  showAlert: boolean = false;
  token: string
  countdown: number = 5;
  countdownMapping: any = {
      '=1'   : '# second',
      'other': '# seconds'
  };
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  showForm:boolean=true;
  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _accountService: AccountService
  ) {
    const path = this._router.url.split('?')[0];
    this.token = path.split('/').filter(x => x !== '')[2];
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.activateAccount = this._formBuilder.group({
      Email: [null, [Validators.required, Validators.email]],
      Password: [null, Validators.required],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  activate() {
    // Return if the form is invalid
    if (!this.activateAccount.valid) {
      return;
    }

    // Disable the form
    this.activateAccount.disable();

    // Hide the alert
    this.showAlert = false;


    this._accountService.activateAccount(this.activateAccount.value, this.token).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this.showForm=false;
          this.activateAccount.enable();
          this.alert = {
            type: 'success',
            message: response.Message
          };
          this.showAlert = true;
          // Redirect after the countdown
        timer(1000, 1000)
        .pipe(
            finalize(() => {
                this._router.navigate(['auth/signin']);
            }),
            takeWhile(() => this.countdown > 0),
            takeUntil(this._unsubscribeAll),
            tap(() => this.countdown--)
        )
        .subscribe();
        } else {
          this.activateAccount.enable();
          this.alert = {
            type: response.Status,
            message: response.Message
          };
          this.showAlert = true;
        }

      },
      error: (error) => {
        this.activateAccount.enable();
        // Set the alert
        this.alert = {
          type: 'warning',
          message: "Oops"
        };
        this.showAlert = true;
      }
    })


  }
}


