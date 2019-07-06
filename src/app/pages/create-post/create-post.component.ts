import { Component, OnInit } from '@angular/core';
import { Post, CreatedPost } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(
    private postService: PostService,
    private toastrService: ToastrService,
    private router: Router
  ) { }
  markdownContent: string = '';
  title: string;
  isPrivate: boolean;
  isLoading: boolean = false;


  ngOnInit() {
  }

  createPost() {
    const post = new CreatedPost();
    post.body = this.markdownContent;
    post.title = this.title;
    post.isPrivate = this.isPrivate;
    this.isLoading = true;
    this.postService.createPost(post).subscribe((_) => {
      this.toastrService.success('Post has been created');
      this.router.navigate(['/post']);
    });
    console.log(post);
  }

}
