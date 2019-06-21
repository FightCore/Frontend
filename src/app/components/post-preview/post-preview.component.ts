import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { Theme } from 'src/styles/fightcore-theme';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
  @Input() post: Post;

  constructor(
    private postService: PostService,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
  }

  likePost(heartIcon: HTMLElement): void {
    this.postService.likePost(0).subscribe(() => {
      heartIcon.style.color = Theme.accentColor;
      this.toastrService.success('Post has been liked successfully.');
    }, () => {
      this.toastrService.error('Failed to like post, try refreshing');
    });
  }
  viewPost(id: number): void {
    // TODO Properly implement viewing
    console.log(`Viewing post ${id}`);
  }
}
