import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(formBuilder: FormBuilder, private authService: AuthService, private userService: UserService) {
    this.registerForm = formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    const { username, email, password } = this.registerForm.value;
    this.authService.emailAndPasswordRegister(email, password).subscribe((user) => {
      this.userService.updateUser({ username }).subscribe((newUser) => {});
    });
  }
}
