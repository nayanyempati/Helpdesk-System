import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthSignInComponent } from './sign-in/sign-in.component';
import { AuthConfirmationRequiredComponent } from './confirmation-required/confirmation-required.component';
import { AuthForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthUnlockSessionComponent } from './unlock-session/unlock-session.component';
import { AuthSignUpComponent } from './sign-up/sign-up.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HelpdeskCardModule } from '@helpdesk/components/card';
import { HelpdeskAlertModule } from '@helpdesk/components/alert';
import { AuthComponent } from './auth.component';
import { AuthSignOutComponent } from './sign-out/sign-out.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

const routes: Route[] = [
 {
  path:'',
  component:AuthComponent,
  children:[
    {
      path: 'signin',
      component: AuthSignInComponent,
      data: { title: "SignIn" }
    },
    {
      path: 'signup',
      component: AuthSignUpComponent,
      data: { title: "Signup" }
    },
    {
      path: 'forgot-password',
      component: AuthForgotPasswordComponent,
      data: { title: "Signup" }
    },
    {
      path: 'activate/:id',
      component: ActivateAccountComponent,
      data: { title: "Reset Password" }
    },
    {
      path: 'reset-password/:id/:id',
      component: AuthResetPasswordComponent,
      data: { title: "Reset Password" }
    },
    {
      path: 'confirmation-required',
      component: AuthConfirmationRequiredComponent,
      data: { title: "Confirmation Required" }
    },
    {
      path: 'signout',
      component: AuthSignOutComponent,
      data: { title: "Signout" }
    },
  ]
 }

]

@NgModule({
  declarations: [
    AuthComponent,
    AuthSignInComponent,
    AuthConfirmationRequiredComponent,
    AuthForgotPasswordComponent,
    AuthResetPasswordComponent,
    AuthUnlockSessionComponent,
    AuthSignUpComponent,
    AuthComponent,
    AuthSignOutComponent,
    ActivateAccountComponent

  ],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    HelpdeskCardModule,
    HelpdeskAlertModule,
    SharedModule,
    MatDialogModule,
  ]
})
export class AuthModule { }
