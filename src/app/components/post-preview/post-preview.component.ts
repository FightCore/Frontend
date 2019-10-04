import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { Theme } from 'src/styles/fightcore-theme';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostText } from 'src/app/text/post.text';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
  @Input() post: Post;
  themeDictionary: Map<number, string> = new Map([
    [1, 'fightcore-theme'],
    [2, 'melee-theme'],
    [3, 'fightcore-theme'],
    [4, 'fightcore-theme'],
    [5, 'fightcore-theme'],
    [6, 'fightcore-theme'],
  ]);

  constructor(
    private postService: PostService,
    private toastrService: ToastrService,
    private router: Router,
    private markdownService: MarkdownService
    ) { }

  ngOnInit() {
    this.post.body = this.markdownService.compile(this.post.body);
  }

  likePost(heartIcon: HTMLElement, post: Post): void {
    this.postService.likePost(post.id).subscribe(() => {
      // this.toastrService.success('Post has been liked successfully.');
      if (post.liked) {
        post.likes--;
        post.liked = false;
      } else {
        post.likes++;
        post.liked = true;
      }
    }, () => {
      this.toastrService.error(PostText.failedPostLike);
    });
  }

  viewPost(id: number): void {
    this.router.navigate([StaticRoutes.posts, id]);
  }

  getPostClass(): string {
    return this.themeDictionary.get(this.post.gameId);
  }
}
