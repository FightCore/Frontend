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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent implements OnInit {
  post: Post;
  bodyHtml: string;
  loading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private toastrService: ToastrService,
    private markdownService: MarkdownService,
    private authService: AuthService,
    private dialog: MatDialog
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
    return this.post.author.id === this.authService.id;
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

  deletePost(): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '20em'
    });
    dialog.componentInstance.title = 'Delete ' + this.post.title;
    dialog.componentInstance.description = `Are you sure you want to delete "${this.post.title}".\nThis action can not be undone.`;
    dialog.componentInstance.confirmText = 'Delete';
    dialog.componentInstance.confirmed.subscribe(_ => {
      this.postService.deletePost(this.post.id).subscribe(_ => {
        this.toastrService.success('Deleted');
      }, error => {
        this.toastrService.error('Error');
      });
    });
  }
}
