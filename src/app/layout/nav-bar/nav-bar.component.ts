import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ThemeSchemeService } from 'src/app/services/theme/theme-scheme.service';
import { LoginDialogComponent } from 'src/app/components/auth/login-dialog/login-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private themeService: ThemeSchemeService
  ) {}

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
  ngOnInit() {}

  toggleDarkMode(): void {
    this.themeService.toggle();
  }

  getUserName(): string {
    return this.authService.userName;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    localStorage.setItem('PreviousUrl', this.router.url);
    this.authService.logout();
  }

  toUser() {
    this.router.navigate(['user', this.authService.id]);
  }

  hideSidebar() {
    this.opened = false;
  }

  goToLogin(): void {
    this.dialog.open(LoginDialogComponent);
  }
}
