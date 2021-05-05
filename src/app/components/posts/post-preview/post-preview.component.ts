import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostText } from 'src/app/text/post.text';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { MarkdownService } from 'ngx-markdown';
import { GameThemes } from 'src/styles/gameThemes';
import { UserOptions } from 'src/app/options/userOptions';
import { environment } from 'src/environments/environment';
import { PostCategory } from 'src/app/models/post/post-category';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss'],
})
export class PostPreviewComponent implements OnInit {
  @Input() post: Post;
  mouseOvered: boolean;
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
  constructor(
    private postService: PostService,
    private toastrService: ToastrService,
    private router: Router,
    private markdownService: MarkdownService
  ) {}
  ngOnInit() {
    //this.post.body = this.markdownService.compile(this.post.body);
  }

  likePost(heartIcon: HTMLElement, post: Post): void {
    this.postService.likePost(post.id).subscribe(
      () => {
        // this.toastrService.success('Post has been liked successfully.');
        if (post.liked) {
          post.likes--;
          post.liked = false;
        } else {
          post.likes++;
          post.liked = true;
        }
      },
      () => {
        this.toastrService.error(PostText.failedPostLike);
      }
    );
  }

  viewPost(id: number): void {
    this.router.navigate([StaticRoutes.posts, id]);
  }

  getPostClass(): string {
    return GameThemes.getThemeForGameId(this.post.gameId, true);
  }

  minimalMode(): boolean {
    return UserOptions.getMinimalMode();
  }

  viewAuthor(): void {
    this.router.navigate([StaticRoutes.viewUserNoId, this.post.author.id]);
  }

  useAvatar(): boolean {
    return environment.enableAvatars;
  }

  getTranslationsForValue(): string {
    const item = this.categories.find((category) => category.value === this.post.category);

    return item.name;
  }

  isDarkMode(): boolean {
    return UserOptions.getDarkMode();
  }
}
