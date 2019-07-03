import { Component, OnInit } from '@angular/core';
import { Post, CreatedPost } from 'src/app/models/post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor() { }
  markdownContent: string = '';
  title: string;
  isPrivate: boolean;


  ngOnInit() {
  }

  createPost() {
    const post = new CreatedPost();
    post.body = this.markdownContent;
    post.title = this.title;
    post.isPrivate = this.isPrivate;

    console.log(post);
  }

}
