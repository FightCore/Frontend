import { Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { PostCategory } from 'src/app/models/post/post-category';
import { FormControl } from '@angular/forms';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-edit-meta-data',
  templateUrl: './edit-meta-data.component.html',
  styleUrls: ['./edit-meta-data.component.scss'],
})
export class EditMetaDataComponent implements OnInit {
  constructor() {}

  @Input() post: Post;

  categories = [
    { value: PostCategory.uncategorised, name: 'Posts.Category.NoCategory' },
    { value: PostCategory.matchup, name: 'Posts.Category.Matchup' },
    { value: PostCategory.techskill, name: 'Posts.Category.Techskill' },
    { value: PostCategory.combos, name: 'Posts.Category.Combos' },
    { value: PostCategory.frameData, name: 'Posts.Category.FrameData' },
    { value: PostCategory.powerranking, name: 'Posts.Category.PowerRanking' },
    { value: PostCategory.player, name: 'Posts.Category.Player' },
    { value: PostCategory.tournament, name: 'Posts.Category.Tournament' },
  ];
  categoryFormControl = new FormControl(PostCategory.uncategorised);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tags: string[] = [];
  ngOnInit(): void {
    if (this.post) {
      this.categoryFormControl.setValue(this.post.category);
      this.tags = this.post.tags;
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
