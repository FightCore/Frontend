import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-options-button',
  templateUrl: './user-options-button.component.html',
  styleUrls: ['./user-options-button.component.scss'],
})
export class UserOptionsButtonComponent implements OnInit {
  @Input() currentUser: User;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logout(): void {
    localStorage.setItem('PreviousUrl', this.router.url);
    this.authService.logout();
  }

  toUser(): void {
    this.router.navigate(['user', this.currentUser.id]);
  }

  editUser(): void {
    this.router.navigate(['user/edit', this.currentUser.id]);
  }
}
