import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ChangeUsernameDialogComponent } from 'src/app/components/user/change-username-dialog/change-username-dialog.component';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  loading = true;
  posts: Post[];
  user: User;
  isCurrentUser = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const userId = parseFloat(this.route.snapshot.paramMap.get('userId'));

    this.userService.get(userId).subscribe((user) => {
      this.user = user;
    });

    this.userService.getPosts(userId).subscribe((posts) => {
      this.posts = posts;
      this.loading = false;
    });

    this.store.select(selectUser).subscribe((currentUser: User) => {
      this.isCurrentUser = currentUser?.id === this.user?.id;
    });
  }

  openEdit() {
    this.dialog.open(ChangeUsernameDialogComponent);
  }
}
