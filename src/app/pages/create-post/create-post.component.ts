import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterContentInit,
} from '@angular/core';
import { Post, CreatedPost } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostHelpComponent } from 'src/app/components/posts/post-help/post-help.component';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { PostText } from 'src/app/text/post.text';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserOptions } from 'src/app/options/userOptions';
import { CharacterPickerComponent } from 'src/app/components/characters/character-picker/character-picker.component';
import { MarkdownService } from 'ngx-markdown';
import * as Showdown from 'showdown';
import { PostPreviewDialogComponent } from 'src/app/components/posts/post-preview-dialog/post-preview-dialog.component';
import { GameService } from 'src/app/services/game/game.service';
import { CharacterService } from 'src/app/services/character/character.service';
import { User } from 'src/app/models/user';
import * as SimpleMDE from 'simplemde';
import { EditIntialPostComponent } from 'src/app/components/posts/editor/edit-intial-post/edit-intial-post.component';
import { EditPostTextComponent } from 'src/app/components/posts/editor/edit-post-text/edit-post-text.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements AfterContentInit {
  constructor(
    private postService: PostService,
    private toastrService: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private gameService: GameService,
    private characterService: CharacterService
  ) {}
  @ViewChild('initialPost') initialPost: EditIntialPostComponent;
  @ViewChild('editPost') editPostText: EditPostTextComponent;
  @Input() post: Post = null;

  ngAfterContentInit(): void {
    if (this.post === null) {
      return;
    }

    this.initialPost.formGroup.value.title = this.post.title;
    this.initialPost.selectedCharacter = this.post.characterId;
    this.initialPost.selectedGame = this.post.gameId;
    this.editPostText.useMarkdownEditor(this.post.body);
  }

  forgePost(): Post {
    const post = new Post();
    post.title = this.initialPost.formGroup.value.title;
    post.characterId = this.initialPost.selectedCharacter;
    post.gameId = this.initialPost.selectedGame;
    post.body = this.editPostText.getMarkdownContent();
    return post;
  }

  createPost(): void {
    const post = this.forgePost();
    this.postService.createPost(post).subscribe(
      (_) => {
        this.toastrService.success(PostText.createdPost);
        this.router.navigate([`/${StaticRoutes.posts}`]);
      },
      (error) => {
        this.toastrService.error(PostText.failedCreatePost);
      }
    );
  }
  // content = '';
  // useMarkdown = false;
  // title: string;
  // isPrivate: boolean;
  // isLoading = false;
  // gameId: number = this.getGameId();
  // converter: Showdown.Converter = new Showdown.Converter();
  // editor: SimpleMDE;

  // @ViewChild('characterPicker')
  // characterPicker: CharacterPickerComponent;
  // ngOnInit() {
  //   if (this.post) {
  //     this.title = this.post.title;
  //     this.isPrivate = this.post.isPrivate;
  //     this.gameId = this.post.gameId;
  //     this.content = this.converter.makeHtml(this.post.body);
  //   }
  // }

  // getGameId(): number {
  //   if (this.post) {
  //     return this.post.gameId;
  //   }

  //   return UserOptions.getCurrentGame() === 0
  //     ? -1
  //     : UserOptions.getCurrentGame();
  // }

  // getCharacterId(): number {
  //   if (this.post && this.post.character) {
  //     return this.post.character.id;
  //   }

  //   return -1;
  // }

  // createPost(): void {
  //   if (this.post != null) {
  //     this.updatePost();
  //     return;
  //   }

  //   const post = new Post();
  //   this.forgePost(post);

  //   this.isLoading = true;
  //   this.postService.createPost(post).subscribe(
  //     (_) => {
  //       this.toastrService.success(PostText.createdPost);
  //       this.router.navigate([`/${StaticRoutes.posts}`]);
  //     },
  //     (error) => {
  //       this.isLoading = false;
  //       this.toastrService.error(PostText.failedCreatePost);
  //     }
  //   );
  // }

  // private updatePost(): void {
  //   this.post = this.forgePost(this.post);

  //   this.postService.updatePost(this.post).subscribe(
  //     (_) => {
  //       this.toastrService.success(PostText.updatedPost);
  //       this.router.navigate([StaticRoutes.viewPostNoId, this.post.id]);
  //     },
  //     (error) => {
  //       this.isLoading = false;
  //       this.toastrService.error(PostText.failedUpdatePost);
  //     }
  //   );
  // }

  // private forgePost(post: Post): Post {
  //   post.title = this.title;
  //   post.isPrivate = this.isPrivate;
  //   post.gameId = this.gameId;
  //   post.characterId = this.characterPicker.getValue();
  //   let postContent = this.content;

  //   // Use a local copy of the variable instead of the actual value to not
  //   // destroy the HTML content while converting to Markdown.
  //   if (!this.useMarkdown) {
  //     postContent = this.converter.makeMarkdown(this.content);
  //   } else {
  //     postContent = this.editor.value();
  //   }

  //   post.body = postContent;

  //   if (post.body.length <= 0 || post.title.length <= 0) {
  //     this.toastrService.error('Please provide a title and write a body.');
  //     return null;
  //   }

  //   return post;
  // }

  // openHelp(): void {
  //   this.dialog.open(PostHelpComponent, {
  //     width: '50em',
  //   });
  // }

  // onGameChange(id: number): void {
  //   this.gameId = id;
  //   this.characterPicker.updateGame(id);
  // }

  // togglePreview(): void {
  //   const post = this.forgePost(new Post());
  //   post.author = new User();
  //   post.author.name = this.authService.name;

  //   this.gameService.getGame(post.gameId).subscribe((game) => {
  //     post.game = game;

  //     if (post.characterId && post.characterId !== 0) {
  //       this.characterService.get(post.characterId).subscribe((character) => {
  //         post.character = character;
  //         this.createDialog(post);
  //       });
  //     } else {
  //       this.createDialog(post);
  //     }
  //   });
  // }

  // private createDialog(post: Post) {
  //   const dialogRef = this.dialog.open(PostPreviewDialogComponent, {
  //     width: '40em',
  //   });

  //   dialogRef.componentInstance.post = post;
  // }

  // toggleMarkdown() {
  //   if (!this.useMarkdown) {
  //     this.content = this.editor.value();
  //     this.content = this.converter.makeHtml(this.content);
  //   } else {
  //     this.content = this.converter.makeMarkdown(this.content);
  //   }

  //   if (this.useMarkdown) {
  //     setTimeout(() => this.createEditor(this.content));
  //   } else {
  //     if (this.editor) {
  //       this.editor.toTextArea();
  //     }
  //   }
  // }

  // private createEditor(text: string) {
  //   this.editor = new SimpleMDE({
  //     element: document.getElementById('markdown-editor'),
  //     initialValue: text,
  //     spellChecker: false,
  //   });
  // }
}
