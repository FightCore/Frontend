import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private postService: PostService) { }
  loading: boolean = true;
  posts: Post[];

  ngOnInit() {
    const posts = this.postService.getPosts();
    if (posts instanceof Array) {
      this.posts = posts;
      this.loading = false;
    } else {
      console.log('Not Mocking!');
    }
  }

}
