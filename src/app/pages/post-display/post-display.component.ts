import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { PostText } from 'src/app/text/post.text';
import { MarkdownService } from 'ngx-markdown';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GameThemes } from 'src/styles/gameThemes';
import { saveAs } from 'file-saver';
import { PostCategory } from 'src/app/models/post/post-category';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent implements OnInit {
  post: Post;
  bodyHtml: string;
  loading: boolean = true;

  categories = [
    { value: PostCategory.uncategorised, name: 'Posts.Category.NoCategory'},
    { value: PostCategory.matchup, name: 'Posts.Category.Matchup'},
    { value: PostCategory.techskill, name: 'Posts.Category.Techskill'},
    { value: PostCategory.combos, name: 'Posts.Category.Combos'},
    { value: PostCategory.frameData, name: 'Posts.Category.FrameData'},
    { value: PostCategory.powerranking, name: 'Posts.Category.PowerRanking'},
    { value: PostCategory.player, name: 'Posts.Category.Player'},
    { value: PostCategory.tournament, name: 'Posts.Category.Tournament'},
  ];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private toastrService: ToastrService,
    private markdownService: MarkdownService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      return `<img src="${href}" alt="${text}" class="fit-image-max-width">`;
    };

    const postId = this.route.snapshot.paramMap.get('postId');

    this.postService.getPost(parseFloat(postId)).subscribe(
      post => {
        this.setupPost(post);
        this.loading = false;
      },
      error => {
        console.log(error);
        this.toastrService.error(PostText.postNotFound);
        this.router.navigate([StaticRoutes.posts]);
      }
    );
  }

  isPostFromUser(): boolean {
    return this.authService.isAuthenticated() && this.post.author.id === this.authService.id;
  }

  editPost() {
    this.router.navigate([StaticRoutes.editPostNoId, this.post.id]);
  }

  setupPost(post: Post) {
    this.post = post;
    this.bodyHtml = this.markdownService.compile(post.body);
  }

  getGameClass(): string {
    return GameThemes.getThemeForGameId(this.post.gameId);
  }

  likePost(): void {
    this.postService.likePost(this.post.id).subscribe(
      _ => {
        console.log('Liked!');
      },
      error => {
        console.log('Something went wrong');
      }
    );
  }

  viewCharacter(characterId: number): void {
    this.router.navigate([StaticRoutes.characters, characterId]);
  }

  viewGame(gameId: number): void {
    this.router.navigate([StaticRoutes.game, gameId]);
  }

  downloadPost(): void {
    const blob = new Blob([this.post.body], {type: 'text/markdown' });
    saveAs(blob, this.post.title + '.md');
  }

  viewAuthor(): void {
    this.router.navigate([StaticRoutes.viewUserNoId, this.post.author.id]);
  }

  getTranslationsForValue(): string {
    const item = this.categories.find(category => category.value === this.post.category);

    return item.name;
  }
}
