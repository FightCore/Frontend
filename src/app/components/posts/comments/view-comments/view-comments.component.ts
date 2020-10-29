import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/post/comment';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent implements OnInit {

  constructor() { }

  @Input() comments: Comment[];

  ngOnInit(): void {
  }

}
