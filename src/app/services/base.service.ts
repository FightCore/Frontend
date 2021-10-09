import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

export class BaseService {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  protected getDefaultHttpOptions() {
    let token = '';

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  protected returnFakeObserver(): Observable<never> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next();
      }, 200);
    });
  }
}
