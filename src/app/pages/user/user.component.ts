import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  loading: boolean = true;
  posts: Post[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.userService.getPosts(parseFloat(userId)).subscribe(posts => {
        this.posts = posts;
        this.loading = false;
        console.log(this.posts);
      });
  }

}
