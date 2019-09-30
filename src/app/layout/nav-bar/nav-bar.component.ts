import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { MatDialog } from '@angular/material';

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

  register() {
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: '25%'
    });
  }

}
