import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  submitting: boolean = false;
  form: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      usernameControl: ['', [Validators.required] ],
      emailControl: ['', [Validators.required, Validators.email] ],
      passControl: ['', [Validators.required]],
      confirmPassControl: ['', [Validators.required] ]
    });
  }

  get usernameControl() { return this.form.get('usernameControl'); }
  get emailControl() { return this.form.get('emailControl'); }
  get passControl() { return this.form.get('passControl'); }
  get confirmPassControl() { return this.form.get('confirmPassControl'); }
}
