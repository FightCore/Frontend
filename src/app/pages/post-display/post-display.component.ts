import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { PostText } from 'src/app/text/post.text';
import { MarkdownService } from 'ngx-markdown';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit() {
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
}
