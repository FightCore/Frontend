import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  formGroup: FormGroup;
  loginErrored = false;

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
    this.authService.googleLogin().subscribe((user) => {
      this.dialogRef.close();
    });
  }

  loginWithEmailAndPassword(): void {
    if (!this.formGroup.valid) {
      return;
    }

    this.authService.emailAndPasswordLogin(this.formGroup.value.email, this.formGroup.value.password).subscribe(
      (user) => {
        this.dialogRef.close();
      },
      () => {
        this.loginErrored = true;
      }
    );
  }
}
