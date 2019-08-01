import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { MarkdownService } from 'ngx-markdown';
import { PostText } from 'src/app/text/post.text';
import { StaticRoutes } from 'src/app/routes/static-routes';

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
    private markdownService: MarkdownService
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

}
