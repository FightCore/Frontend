import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss']
})
export class LatestPostsComponent implements OnInit {
  loading = true;
  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getLatestPosts().subscribe(posts => {
      this.posts = posts;
      this.loading = false;
    });
  }
}
