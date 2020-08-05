import { Component, OnInit } from '@angular/core';
import { CreateUser } from 'src/app/models/createUser';
import { Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    )
  ]);
  confirmPassword = new FormControl('', [Validators.required, this.validateAreEqual.bind(this)]);
  showPasswordInfo: boolean;
  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService: UserService) {
  }

  ngOnInit() {
  }

  getErrorMessage(control: FormControl): string {
    return control.hasError('required') ? 'You must enter a value' :
        control.hasError('email') ? 'Not a valid email' :
        control.hasError('match') ? 'Passwords do not match' :
            '';
  }

  register(): void {
    if (this.email.invalid || this.password.invalid || this.confirmPassword.invalid
      || this.username.invalid) {
        this.toastrService.error('There are invalid fields', 'Unable to register');
        return;
      }

    if (this.password.value !== this.confirmPassword.value) {
        return;
      }

    const user = new CreateUser();
    user.email = this.email.value;
    user.password = this.password.value;
    user.userName = this.username.value;

    this.userService.createUser(user).subscribe(_ => {
      this.toastrService.success('Successfully registered, redirecting...', 'Success');
      this.authService.login();
    }, error => {
      this.toastrService.error('An error occurred while registering', 'Error');
    });
  }

  login() {
    this.authService.login();
  }

  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.password.value ? null : {
        match: true
    };
  }
}
