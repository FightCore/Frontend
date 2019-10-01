import { Component, OnInit } from '@angular/core';
import { CreateUser } from 'src/app/models/createUser';
import { Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialogRef } from '@angular/material/dialog';

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
    Validators.minLength(8)]);
  confirmPassword = new FormControl('', [Validators.required]);
  showPasswordInfo: boolean;
  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private toastrService: ToastrService,
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

  checkPassword(password:string) : boolean {
    //password reqs : 1 upper, 1 lower, 1 digit, 1 special
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(password) ? true : false;
    
  }

  register(): void {
    console.log(this.password);
    var validPassword = this.checkPassword(this.password.value);
    if(!validPassword){
      this.toastrService.error('Password must have at least : 1 upper case, 1 lower case, 1 digit ,1 special character');
      return;
    }
    if(this.password.value !== this.confirmPassword.value){
      this.toastrService.error('Passwords do not match');
      return;
    }
    if (this.email.invalid || this.password.invalid || this.confirmPassword.invalid
      || this.username.invalid ) {
        this.toastrService.error('There are invalid fields', 'Unable to register');
        return;
      }

    

    const user = new CreateUser();
    user.email = this.email.value;
    user.password = this.password.value;
    user.userName = this.username.value;

    this.userService.createUser(user).subscribe(_ => {
      this.toastrService.success('Successfully registered, redirecting...', 'Success');
    }, error => {
      this.toastrService.error('An error occurred while registering', 'Error');
    });
  }
}
