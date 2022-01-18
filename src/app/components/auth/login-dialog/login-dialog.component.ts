import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthErrors } from 'src/app/models/firebase/auth-errors';
import { LoginError } from './login-error';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  formGroup: FormGroup;
  loginErrorType = LoginError;
  loginError?: LoginError = null;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  loginWithGoogle(): void {
    this.loginError = null;
    this.authService.googleLogin().subscribe(
      (user) => {
        this.dialogRef.close();
      },
      (error) => {
        switch (error.code) {
          case AuthErrors.credentialNotFound:
          case AuthErrors.wrongPassword:
          case AuthErrors.userNotFound:
            this.loginError = LoginError.invalidCredentials;
            break;
          case AuthErrors.userDisabled:
            this.loginError = LoginError.userDisabled;
            break;
          case AuthErrors.tooManyRequests:
            this.loginError = LoginError.tooManyLogins;
            break;
          default:
            this.loginError = LoginError.unknownError;
        }
      }
    );
  }

  loginWithEmailAndPassword(): void {
    this.loginError = null;
    if (!this.formGroup.valid) {
      return;
    }

    this.authService.emailAndPasswordLogin(this.formGroup.value.email, this.formGroup.value.password).subscribe(
      () => {
        this.dialogRef.close();
      },
      (error) => {
        switch (error.code) {
          case AuthErrors.credentialNotFound:
          case AuthErrors.wrongPassword:
          case AuthErrors.userNotFound:
            this.loginError = LoginError.invalidCredentials;
            break;
          case AuthErrors.userDisabled:
            this.loginError = LoginError.userDisabled;
            break;
          case AuthErrors.tooManyRequests:
            this.loginError = LoginError.tooManyLogins;
            break;
          default:
            this.loginError = LoginError.unknownError;
        }
      }
    );
  }
}
