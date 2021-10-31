import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ThemeSchemeService } from 'src/app/services/theme/theme-scheme.service';
import { LoginDialogComponent } from 'src/app/components/auth/login-dialog/login-dialog.component';
import { UserService } from 'src/app/services/user/user.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  opened: boolean;

  links = [
    {
      name: 'Nav.Posts',
      route: ['/post'],
    },
    {
      name: 'Nav.Characters',
      route: ['/character'],
    },
    {
      name: 'Nav.FrameData',
      route: ['/framedata'],
    },
  ];

  currentUser: User;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private themeService: ThemeSchemeService,
    private store: Store
  ) {
    this.store.select(selectUser).subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {}

  toggleDarkMode(): void {
    this.themeService.toggle();
  }

  logout() {
    localStorage.setItem('PreviousUrl', this.router.url);
    this.authService.logout();
  }

  toUser() {
    this.router.navigate(['user', this.currentUser.id]);
  }

  hideSidebar() {
    this.opened = false;
  }

  onOpenLoginClick(): void {
    this.dialog.open(LoginDialogComponent);
  }
}
