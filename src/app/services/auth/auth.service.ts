import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';
import { from, Observable, of } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { clearUser, setUser } from 'src/app/store/user/user.actions';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user?: firebase.default.User;
  private fightCoreUser: User;
  constructor(private angularFireAuth: AngularFireAuth, private userService: UserService, private store: Store) {
    angularFireAuth.user
      .pipe(
        first(),
        tap((user) => (this.user = user)),
        switchMap(() => this.userService.getCurrentUser())
      )
      .subscribe((user) => {
        this.store.dispatch(setUser({ user }));
      });
  }

  getIdToken(): Observable<string> {
    if (this.user) {
      return from(this.user.getIdToken());
    }

    return of(null);
  }

  get id(): number {
    return this.fightCoreUser?.id;
  }

  get userName(): string {
    return this.fightCoreUser?.name;
  }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  emailAndPasswordRegister(email: string, password: string): Observable<User> {
    const authPromise = firebase.default.auth().createUserWithEmailAndPassword(email, password);

    return from(authPromise).pipe(
      first(),
      tap((user) => (this.user = user.user)),
      switchMap(() => this.userService.getCurrentUser()),
      tap((user) => {
        this.store.dispatch(setUser({ user }));
      })
    );
  }

  emailAndPasswordLogin(email: string, password: string): Observable<User> {
    const authPromise = firebase.default
      .auth()
      .setPersistence(firebase.default.auth.Auth.Persistence.SESSION)
      .then(() => this.angularFireAuth.signInWithEmailAndPassword(email, password));

    return from(authPromise).pipe(
      first(),
      tap((user) => (this.user = user.user)),
      switchMap(() => this.userService.getCurrentUser()),
      tap((user) => {
        this.store.dispatch(setUser({ user }));
      })
    );
  }

  googleLogin(): Observable<User> {
    const authPromise = firebase.default
      .auth()
      .setPersistence(firebase.default.auth.Auth.Persistence.SESSION)
      .then(() => {
        const provider = new firebase.default.auth.GoogleAuthProvider();
        return this.angularFireAuth.signInWithPopup(provider);
      });

    return from(authPromise).pipe(
      first(),
      tap((user) => (this.user = user.user)),
      switchMap(() => this.userService.getCurrentUser()),
      tap((user) => {
        this.store.dispatch(setUser({ user }));
      })
    );
  }

  logout(): void {
    from(this.angularFireAuth.signOut()).subscribe(() => {
      this.store.dispatch(clearUser());
    });
  }
}
