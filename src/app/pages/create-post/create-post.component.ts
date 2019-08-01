import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Post, CreatedPost } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostHelpComponent } from 'src/app/components/post-help/post-help.component';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { PostText } from 'src/app/text/post.text';
import { MarkdownEditorComponent } from 'ngx-markdown-editor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  @ViewChild('mdEditor', {static: false}) markdownEditor: MarkdownEditorComponent;
  @Input() post: Post;

  constructor(
    private postService: PostService,
    private toastrService: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }
  markdownContent = '';
  title: string;
  isPrivate: boolean;
  isLoading = false;
  gameId: number;


  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.authService.login();
    }

    if (this.post === null) {
      return;
    }

    console.log(this.post);
    this.title = this.post.title;
    this.isPrivate = this.post.isPrivate;
    this.gameId = this.post.gameId;
    this.markdownContent = this.post.body;
  }

  createPost() {
    if (this.post != null) {
      this.updatePost();
      return;
    }

    const post = new CreatedPost();
    post.body = this.markdownContent;
    post.title = this.title;
    post.isPrivate = this.isPrivate;
    post.gameId = this.gameId;
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

  updatePost() {
    this.post.body = this.markdownContent;
    this.post.title = this.title;
    this.post.isPrivate = this.isPrivate;
    this.post.gameId = this.gameId;

    this.postService.updatePost(this.post).subscribe((_) => {
      this.toastrService.success(PostText.createdPost);
      this.router.navigate([`/${StaticRoutes.posts}`]);
    },
    error => {
      this.isLoading = false;
      this.toastrService.error(PostText.failedCreatePost);
    });
  }

  openHelp() {
    this.dialog.open(PostHelpComponent, {
      width: '50%',
    });
  }

  onGameChange(id: number) {
    this.gameId = id;
  }

  togglePreview() {
    this.markdownEditor.togglePreview();
  }

}
