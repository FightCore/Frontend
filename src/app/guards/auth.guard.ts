import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../pages/register/register.component';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private dialog: MatDialog) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAuthenticated()) {
        return true;
      }

      if (this.authService.isAuthenticationDone) {
        this.openRegisterDialog();

        return false;
      }

      return this.authService.authenticationDone.asObservable().pipe(map(result => {
        if (result) {
          return true;
        }

        this.openRegisterDialog();

        return false;
      }), catchError((error) => {
        this.openRegisterDialog();

        return of(false);
      }));
  }

  openRegisterDialog(): void {
    this.dialog.open(RegisterComponent, {
      width: '40em'
    });
  }
}
