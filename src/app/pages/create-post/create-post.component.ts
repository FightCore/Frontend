import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Post, CreatedPost } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostHelpComponent } from 'src/app/components/post-help/post-help.component';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { PostText } from 'src/app/text/post.text';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserOptions } from 'src/app/options/userOptions';
import { CharacterPickerComponent } from 'src/app/components/character-picker/character-picker.component';
import { MarkdownService } from 'ngx-markdown';
import * as Showdown from 'showdown';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @Input() post: Post;

  constructor(
    private postService: PostService,
    private toastrService: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private markdownService: MarkdownService
  ) { }
  markdownContent = '';
  title: string;
  isPrivate: boolean;
  isLoading = false;
  gameId: number = this.getGameId();

  options = {
    initialValue: '' ,
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical',
    height: '50em'
    };
  @ViewChild('characterPicker', { static: false}) characterPicker: CharacterPickerComponent;
  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.authService.login();
    }

    if (this.post) {
      this.title = this.post.title;
      this.isPrivate = this.post.isPrivate;
      this.gameId = this.post.gameId;
      const converter = new Showdown.Converter();
      this.markdownContent = converter.makeHtml(this.post.body);
    }
  }

  getGameId(): number {
    if (this.post) {
      return this.post.gameId;
    }

    return UserOptions.getCurrentGame() === 0 ? -1 : UserOptions.getCurrentGame();
  }
  getCharacterId(): number {
    if (this.post && this.post.character) {
      return this.post.character.id;
    }

    return -1;
  }
  createPost(): void {
    if (this.post != null) {
      this.updatePost();
      return;
    }

    const post = new CreatedPost();
    post.title = this.title;
    post.isPrivate = this.isPrivate;
    post.gameId = this.gameId;
    post.characterId = this.characterPicker.getValue();
    const converter = new Showdown.Converter();
    post.body = converter.makeMarkdown(this.markdownContent);

    this.isLoading = true;
    this.postService.createPost(post).subscribe((_) => {
      this.toastrService.success(PostText.createdPost);
      this.router.navigate([`/${StaticRoutes.posts}`]);
    },
    error => {
      this.isLoading = false;
      this.toastrService.error(PostText.failedCreatePost);
    });
  }

  updatePost(): void {
    this.post.title = this.title;
    this.post.isPrivate = this.isPrivate;
    this.post.gameId = this.gameId;
    this.post.characterId = this.characterPicker.getValue();

    const converter = new Showdown.Converter();
    this.post.body = converter.makeMarkdown(this.markdownContent);

    this.postService.updatePost(this.post).subscribe((_) => {
      this.toastrService.success(PostText.updatedPost);
      this.router.navigate([StaticRoutes.viewPostNoId, this.post.id]);
    },
    error => {
      this.isLoading = false;
      this.toastrService.error(PostText.failedUpdatePost);
    });
  }

  openHelp(): void {
    this.dialog.open(PostHelpComponent, {
      width: '50%',
    });
  }

  onGameChange(id: number): void {
    this.gameId = id;
    this.characterPicker.updateGame(id);
  }

  togglePreview(): void {
    const converter = new Showdown.Converter();
    console.log(converter.makeMarkdown(this.markdownContent));
    console.log(this.markdownContent);
  }
}
