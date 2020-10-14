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
export class CreatePostComponent {
  constructor(
    private postService: PostService,
    private toastrService: ToastrService,
    private router: Router,
  ) {}
  @ViewChild('initialPost') initialPost: EditIntialPostComponent;
  @ViewChild('editPost') editPostText: EditPostTextComponent;

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
}
