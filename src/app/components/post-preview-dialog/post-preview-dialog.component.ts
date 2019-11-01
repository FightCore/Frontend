import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog/';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-preview-dialog',
  templateUrl: './post-preview-dialog.component.html',
  styleUrls: ['./post-preview-dialog.component.scss']
})
export class PostPreviewDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PostPreviewDialogComponent>) { }
  @Input() post: Post;
  ngOnInit() {
  }

}
