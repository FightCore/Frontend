import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/overlay-directives';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-edit-intial-post',
  templateUrl: './edit-intial-post.component.html',
  styleUrls: ['./edit-intial-post.component.scss'],
})
export class EditIntialPostComponent implements OnInit {
  @Input() post: Post;
  formGroup: FormGroup;

  selectedCharacter: number;
  selectedGame: number = 2;
  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.post) {
      this.formGroup.setValue({
        title: this.post.title,
        description: this.post.description,
      });

      this.selectedGame = this.post.gameId;
      this.selectedCharacter = this.post.characterId;
    }
  }
}
