import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { noop } from 'rxjs';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthErrors } from 'src/app/models/firebase/auth-errors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorCode: AuthErrors;
  errorCodes = AuthErrors;

  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  ngOnInit(): void {}

  onFocusoutCheckUsername(): void {
    const { username } = this.registerForm.value;
    this.userService.isUsernameAvailable(username).subscribe(noop, (error) => {
      if (error.status === 409) {
        this.registerForm.controls.username.setErrors({ taken: true });
      }
    });
  }

  onSubmit(): void {
    if (!this.registerForm.valid) {
      return;
    }

    this.errorCode = null;

    this.registerForm.controls.username.setErrors({ taken: false });

    const { username, email, password } = this.registerForm.value;
    this.userService.isUsernameAvailable(username).subscribe(
      () => {
        this.authService.emailAndPasswordRegister(email, password).subscribe(
          (user) => {
            this.userService.updateUser({ username }).subscribe(() => {
              this.router.navigate([StaticRoutes.home]);
            });
          },
          (error) => {
            if (error.code) {
              this.errorCode = error.code;
              return;
            }

            this.errorCode = AuthErrors.unknown;
          }
        );
      },
      (error) => {
        if (error.status === 409) {
          this.registerForm.controls.username.setErrors({ taken: true });
        }
      }
    );
  }
}
