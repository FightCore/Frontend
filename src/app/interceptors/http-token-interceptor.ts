import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.getIdToken().pipe(
      tap((idToken) => {
        if (idToken == null) {
          return;
        }
        request = request.clone({
          setHeaders: {
            authorization: `Bearer ${idToken}`,
          },
        });
      }),
      switchMap(() => next.handle(request))
    );
  }
}
