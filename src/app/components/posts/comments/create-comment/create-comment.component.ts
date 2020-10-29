import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from 'src/app/services/comments/comment.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  constructor(private commentService: CommentService) { }
  @Input() postId: number;
  @Output() createdComment = new EventEmitter<Comment>();
  comment: string;
  ngOnInit(): void {
  }

  postComment(): void {
    this.commentService.create(this.postId, this.comment).subscribe((result) => {
      this.createdComment.emit(result);
      this.comment = '';
    });
  }
}
