import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { PostText } from 'src/app/text/post.text';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent implements OnInit {

  post: Post;
  loading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('postId');

    const postResult = this.postService.getPost(parseFloat(postId));

    if (postResult instanceof Post) {
        this.post = postResult;
        this.loading = false;
    } else {
      postResult.subscribe(post => {
        this.post = post;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.toastrService.error(PostText.postNotFound);
        this.router.navigate([StaticRoutes.posts]);
      });
    }

  }
  likePost(): void {
    this.postService.likePost(this.post.id).subscribe(_ => {
      console.log('Liked!');
    },
    error => {
      console.log('Something went wrong');
    });
  }
}
