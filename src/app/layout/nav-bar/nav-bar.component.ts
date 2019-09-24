import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }
  userName: string;
  ngOnInit() {
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
    return this.authService.signout();
  }

  toUser() {
    this.router.navigate(['user', this.authService.id]);
  }

}
