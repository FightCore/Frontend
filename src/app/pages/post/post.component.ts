import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/post';
import { Router } from '@angular/router';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { ToastrService } from 'ngx-toastr';
import { PostText } from 'src/app/text/post.text';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private postService: PostService,
    private router: Router,
    private toastrService: ToastrService
    ) { }
  loading: boolean = true;
  posts: Post[];

  ngOnInit() {
    const posts = this.postService.getPosts();
    if (posts instanceof Array) {
      this.posts = posts;
      this.loading = false;
    } else {
      posts.subscribe(postArray => {
          this.posts = postArray;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastrService.error(PostText.failedPostsLoad);
        });
    }
  }

  createPost() {
    this.router.navigate([`/${StaticRoutes.createPost}`]);
  }
}
