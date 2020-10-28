import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { UserOptions } from 'src/app/options/userOptions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private dialog: MatDialog,
      private router: Router) { }

  userName: string;
  opened: boolean;

  links = [
    {
      name: 'Nav.Posts',
      route: ['/post'],
      icon: 'file'
    },
    {
      name: 'Nav.Characters',
      route: ['/character'],
      icon: 'mask'
    },
    {
      name: 'Nav.Games',
      route: ['game'],
      icon: 'gamepad'
    }
  ];
  ngOnInit() {
  }

  toggleDarkMode(): void {
    UserOptions.toggleDarkMode();
  }

  getUserName(): string {
    if (this.userName) {
      return this.userName;
    }

    if (this.authService.isAuthenticated()) {
      this.userName = this.authService.name;
      return this.userName;
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    localStorage.setItem('PreviousUrl', this.router.url);
    return this.authService.signout();
  }

  toUser() {
    this.router.navigate(['user', this.authService.id]);
  }

  register() {
    this.dialog.open(RegisterComponent, {
      width: '40em'
    });
  }

  hideSidebar() {
    this.opened = false;
  }

  goToLogin(): void {
    this.authService.login();
  }

}
