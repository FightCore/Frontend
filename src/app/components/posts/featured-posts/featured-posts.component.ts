import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-featured-posts',
  templateUrl: './featured-posts.component.html',
  styleUrls: ['./featured-posts.component.scss']
})
export class FeaturedPostsComponent implements OnInit {
  loading = true;
  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getFeaturedPosts().subscribe(posts => {
      this.posts = posts;
      this.loading = false;
    });
  }

}
