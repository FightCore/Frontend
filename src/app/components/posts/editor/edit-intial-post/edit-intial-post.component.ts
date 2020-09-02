import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-intial-post',
  templateUrl: './edit-intial-post.component.html',
  styleUrls: ['./edit-intial-post.component.scss']
})
export class EditIntialPostComponent implements OnInit {
  formGroup: FormGroup;

  selectedCharacter: number;
  selectedGame: number;
  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
}
