import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

export class BaseService {
    private authService: AuthService;
    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public getDefaultHttpOptions() {
        let token = '';

        if (this.authService.isAuthenticated()){
            token = this.authService.authorizationHeaderValue;
        }
        console.log(token);
        return {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': token
          })
        };
    }
}
