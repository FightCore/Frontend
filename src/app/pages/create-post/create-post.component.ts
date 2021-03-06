import { Component, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { PostText } from 'src/app/text/post.text';
import { EditIntialPostComponent } from 'src/app/components/posts/editor/edit-intial-post/edit-intial-post.component';
import { EditPostTextComponent } from 'src/app/components/posts/editor/edit-post-text/edit-post-text.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  constructor(private postService: PostService, private toastrService: ToastrService, private router: Router) {}
  @ViewChild('initialPost') initialPost: EditIntialPostComponent;
  @ViewChild('editPost') editPostText: EditPostTextComponent;

  forgePost(): Post {
    const post = new Post();
    post.title = this.initialPost.formGroup.value.title;
    post.characterId = this.initialPost.selectedCharacter;
    post.gameId = this.initialPost.selectedGame;
    post.markdown = this.editPostText.getMarkdownContent();
    post.html = this.editPostText.getHtmlContent();
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
