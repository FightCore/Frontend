import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  getUserName(): string {
    if (this.authService.isAuthenticated()) {
      return this.authService.name;
    }

    return 'Login';
  }

}
