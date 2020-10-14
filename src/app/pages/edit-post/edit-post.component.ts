import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { MarkdownService } from 'ngx-markdown';
import { PostText } from 'src/app/text/post.text';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { EditPostTextComponent } from 'src/app/components/posts/editor/edit-post-text/edit-post-text.component';
import { EditIntialPostComponent } from 'src/app/components/posts/editor/edit-intial-post/edit-intial-post.component';
import { EditMetaDataComponent } from 'src/app/components/posts/editor/edit-meta-data/edit-meta-data.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: Post;
  loading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) {}

  @ViewChild('initialPost') initialPost: EditIntialPostComponent;
  @ViewChild('editPost') editPostText: EditPostTextComponent;
  @ViewChild('postMetaData') postMetaData: EditMetaDataComponent;

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('postId');

    this.postService.getPost(parseFloat(postId)).subscribe(
      post => {
        this.post = post;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.toastrService.error(PostText.postNotFound);
        this.router.navigate([StaticRoutes.posts]);
      }
    );
  }

  forgePost(): Post {
    const post = new Post();
    post.id = this.post.id;
    post.author = this.post.author;
    post.title = this.initialPost.formGroup.value.title;
    post.characterId = this.initialPost.selectedCharacter;
    post.gameId = this.initialPost.selectedGame;
    post.body = this.editPostText.getMarkdownContent();
    post.tags = this.postMetaData.tags;
    post.category = this.postMetaData.categoryFormControl.value;
    post.description = this.initialPost.formGroup.value.description;
    return post;
  }

  createPost(): void {
    this.postService.updatePost(this.forgePost()).subscribe(result => {
      this.toastrService.success(this.translateService.instant('Posts.SuccessfullyEdited'));
      this.router.navigate([StaticRoutes.posts, this.post.id]);
    });
  }
}
