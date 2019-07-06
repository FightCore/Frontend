import { Component, OnInit } from '@angular/core';
import { Post, CreatedPost } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostHelpComponent } from 'src/app/components/post-help/post-help.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(
    private postService: PostService,
    private toastrService: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) { }
  markdownContent = '';
  title: string;
  isPrivate: boolean;
  isLoading = false;


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
  }

  openHelp() {
    this.dialog.open(PostHelpComponent, {
      width: '250px',
    });
  }

}
