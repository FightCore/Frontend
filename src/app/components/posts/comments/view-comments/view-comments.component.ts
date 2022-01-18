import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Comment } from 'src/app/models/post/comment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommentService } from 'src/app/services/comments/comment.service';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss'],
})
export class ViewCommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() postId: number;
  private userId: number;

  constructor(private commentService: CommentService, private store: Store) {
    this.store.select(selectUser).subscribe((user) => {
      this.userId = user?.id;
    });
  }

  ngOnInit(): void {}

  // TODO: Rewrite the logic to be a single comment being viewed instead of the entire list
  // in one component.
  isCommentFromUser(comment: Comment): boolean {
    return this.userId === comment.authorId;
  }

  deleteComment(comment: Comment): void {
    this.commentService.delete(this.postId, comment.id).subscribe(() => {
      this.comments.splice(this.comments.indexOf(comment), 1);
    });
  }
}
