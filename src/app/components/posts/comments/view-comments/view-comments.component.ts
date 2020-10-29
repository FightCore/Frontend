import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/post/comment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommentService } from 'src/app/services/comments/comment.service';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss'],
})
export class ViewCommentsComponent implements OnInit {
  constructor(private authService: AuthService, private commentService: CommentService) {}

  @Input() comments: Comment[];
  @Input() postId: number;
  ngOnInit(): void {}

  isCommentFromUser(comment: Comment): boolean {
    return this.authService.isAuthenticated() && this.authService.id === comment.authorId;
  }

  deleteComment(comment: Comment): void {
    this.commentService.delete(this.postId, comment.id).subscribe(() => {
      this.comments.splice(this.comments.indexOf(comment), 1);
    });
  }
}
