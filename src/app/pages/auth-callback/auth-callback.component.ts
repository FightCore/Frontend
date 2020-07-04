import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  private error: boolean;
  async ngOnInit() {
    // check for error
    if (this.route.snapshot.fragment.indexOf('error') >= 0) {
      this.error = true;
      return;
    }

    await this.authService.completeAuthentication();

    const previousUrl = localStorage.getItem('PreviousUrl');
    if (previousUrl) {
      localStorage.setItem('PreviousUrl', null);
      this.router.navigateByUrl(previousUrl);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
