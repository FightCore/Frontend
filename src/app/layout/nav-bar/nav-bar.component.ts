import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { UserOptions } from 'src/app/options/userOptions';
import { ThemeSchemeService } from 'src/app/services/theme/theme-scheme.service';
import { StaticRoutes } from 'src/app/routes/static-routes';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private dialog: MatDialog,
      private router: Router,
      private themeService: ThemeSchemeService) { }

  userName: string;
  opened: boolean;

  links = [
    {
      name: 'Nav.Posts',
      route: ['/post']
    },
    {
      name: 'Nav.Characters',
      route: ['/character']
    },
    {
      name: 'Nav.FrameData',
      route: ['/framedata']
    },
    // {
    //   name: 'Nav.Techniques',
    //   route: ['/techniques']
    // },
    // {
    //   name: 'Nav.Tools',
    //   route: ['/tools']
    // },
    {
      name: 'Nav.AboutUs',
      route: [StaticRoutes.about]
    }
  ];
  ngOnInit() {
  }

  toggleDarkMode(): void {
    this.themeService.toggle();
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
