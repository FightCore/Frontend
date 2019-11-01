import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  loading: boolean = true;
  posts: Post[];
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    const userId = parseFloat(this.route.snapshot.paramMap.get('userId'));

    const user = this.userService.get(userId).subscribe(user => {
      this.user = user;
    });

    this.userService.getPosts(userId).subscribe(posts => {
        this.posts = posts;
        this.loading = false;
      });
  }

}
