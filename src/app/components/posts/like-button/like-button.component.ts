import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { PostText } from 'src/app/text/post.text';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'],
})
export class LikeButtonComponent implements OnInit {
  /**
   * The amount of likes the post has.
   */
  @Input() likes: number;

  /**
   * The id of the post.
   */
  @Input() postId: number;

  /**
   * If the post is liked by the current user.
   */
  @Input() liked: boolean;

  isLoggedIn: boolean;

  constructor(private postService: PostService, private toastrService: ToastrService, private store: Store) {
    this.store.select(selectUser).subscribe((user) => {
      this.isLoggedIn = user?.id > 0;
    });
  }

  ngOnInit() {}

  likePost(): void {
    this.postService.likePost(this.postId).subscribe(
      () => {
        if (this.liked) {
          this.likes--;
          this.liked = false;
        } else {
          this.likes++;
          this.liked = true;
        }
      },
      () => {
        this.toastrService.error(PostText.failedPostLike);
      }
    );
  }
}
