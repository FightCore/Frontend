// tslint:disable-next-line: max-line-length
// Original source: https://github.com/mmacneil/AngularASPNETCoreOAuth/blob/master/src/Spa/oauth-client/src/app/core/authentication/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Observable navItem source
  private authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this.authNavStatusSource.asObservable();

  private manager = new UserManager(getClientSettings());
  private user: User | null;

  constructor(private http: HttpClient) {
    if (environment.mocking) {
      return;
    }

    this.manager.getUser().then(user => {
      this.user = user;
      this.authNavStatusSource.next(this.isAuthenticated());
    });
  }

  login() {
    if (environment.mocking) {
      return;
    }

    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
    this.user = await this.manager.signinRedirectCallback();
    this.authNavStatusSource.next(this.isAuthenticated());
  }

  register(userRegistration: any) {
    if (environment.mocking) {
      return;
    }

    return this.http
      .post(environment.authentication.authUrl + '/account', userRegistration);
  }

  isAuthenticated(): boolean {
    if (environment.mocking) {
      return true;
    }

    return this.user != null && !this.user.expired;
  }

  get authorizationHeaderValue(): string {
    if (environment.mocking) {
      return '';
    }

    return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    if (environment.mocking) {
      return '';
    }

    return this.user != null ? this.user.profile.name : '';
  }

  get id(): number {
    if (environment.mocking) {
      return 5;
    }

    return this.user != null ? parseFloat(this.user.profile.sub) : 0;
  }

  signout() {
    if (environment.mocking) {
      return;
    }

    this.manager.signoutRedirect();
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.authentication.authUrl,
    client_id: environment.authentication.clientId,
    redirect_uri: environment.authentication.callbackUrl,
    post_logout_redirect_uri: environment.authentication.redirectUrl,
    response_type: 'id_token token',
    scope: 'openid profile fightcore-backend',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
  };
}
