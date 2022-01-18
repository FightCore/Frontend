import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { setUser } from 'src/app/store/user/user.actions';
import { selectUser } from 'src/app/store/user/user.selector';
@Component({
  selector: 'app-change-username-dialog',
  templateUrl: './change-username-dialog.component.html',
  styleUrls: ['./change-username-dialog.component.scss'],
})
export class ChangeUsernameDialogComponent implements OnInit {
  currentUser: User;
  username: string;

  constructor(
    private dialogRef: MatDialogRef<ChangeUsernameDialogComponent>,
    private store: Store,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.store.select(selectUser).subscribe((user) => {
      this.currentUser = user;
      this.username = user.name;
    });
  }

  ngOnInit(): void {}

  changeUserName(username: string): void {
    const user = JSON.parse(JSON.stringify(this.currentUser)) as User;
    user.name = username;
    this.userService.updateUser({ username }).subscribe(noop, () => {
      this.store.dispatch(setUser({ user: this.currentUser }));
      this.snackBar.open('Failed to update the user', null, { duration: 3000 });
    });

    this.dialogRef.close();
  }
}
