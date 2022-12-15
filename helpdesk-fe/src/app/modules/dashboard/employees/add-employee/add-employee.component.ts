import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'app/backend-api/admin.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  addEmployeeForm: FormGroup

  constructor(
    private _adminService: AdminService,
    private _fb: FormBuilder,
    private _matSnackBar: MatSnackBar
  ) {

  }



  ngOnInit(): void {
    // Create the form
    this.addEmployeeForm = this._fb.group({
      FirstName: [null, (Validators.required)],
      LastName: [null, Validators.required],
      Email: [null, (Validators.required, Validators.email)],

    });
  }


  addEmployee() {
    if (!this.addEmployeeForm.valid) {
      return;
    }
    this.addEmployeeForm.disable();
    this._adminService.addEmployee(this.addEmployeeForm.value).subscribe({
      next: (response) => {
        this.addEmployeeForm.enable()
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
