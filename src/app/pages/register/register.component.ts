import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { noop } from 'rxjs';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

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

  onSubmit(): void {
    if (!this.registerForm.valid) {
      return;
    }

    const { username, email, password } = this.registerForm.value;
    this.authService.emailAndPasswordRegister(email, password).subscribe((user) => {
      this.userService.updateUser({ username }).subscribe(() => {
        this.router.navigate([StaticRoutes.home]);
      });
    });
  }
}
