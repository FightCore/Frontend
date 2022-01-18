import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';
import { from, Observable, of, throwError } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { clearUser, setUser } from 'src/app/store/user/user.actions';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public static userKey = 'fightcore_user';
  private user?: firebase.default.User;
  constructor(private angularFireAuth: AngularFireAuth, private userService: UserService, private store: Store) {
    angularFireAuth.user
      .pipe(
        switchMap((firebaseUser) => {
          if (firebaseUser == null) {
            return of(null);
          }

          this.user = firebaseUser;
          const user = sessionStorage.getItem(AuthService.userKey);
          if (user != null) {
            return of(JSON.parse(user) as User);
          }

          return this.userService.getCurrentUser();
        })
      )
      .subscribe((user) => {
        if (user == null) {
          this.store.dispatch(clearUser());
          return;
        }

        this.dispatchUser(user);
      });
  }

  getIdToken(): Observable<string> {
    if (this.user) {
      return from(this.user.getIdToken());
    }

    return this.angularFireAuth.user.pipe(
      switchMap((user) => {
        if (user) {
          return user.getIdToken();
        }

        return of(null);
      })
    );
  }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  emailAndPasswordRegister(email: string, password: string): Observable<firebase.default.auth.UserCredential> {
    return from(firebase.default.auth().createUserWithEmailAndPassword(email, password));
  }

  emailAndPasswordLogin(email: string, password: string): Observable<firebase.default.auth.UserCredential> {
    return from(
      firebase.default
        .auth()
        .setPersistence(firebase.default.auth.Auth.Persistence.SESSION)
        .then(() => this.angularFireAuth.signInWithEmailAndPassword(email, password))
        .then((firebaseResponse) => {
          if (firebaseResponse == null) {
            throw new Error('Failed to login');
          }

          return firebaseResponse;
        })
    );
  }

  forgotPassword(email: string): void {
    from(firebase.default.auth().sendPasswordResetEmail(email)).subscribe(
      () => {},
      (error) => {
        if (error.code === 'auth/user-not-found') {
          throw new Error('User not found');
        }

        throw error;
      }
    );
  }

  googleLogin(): Observable<firebase.default.auth.UserCredential> {
    return from(
      firebase.default
        .auth()
        .setPersistence(firebase.default.auth.Auth.Persistence.SESSION)
        .then(() => {
          const provider = new firebase.default.auth.GoogleAuthProvider();
          return this.angularFireAuth.signInWithPopup(provider);
        })
        .then((firebaseResponse) => {
          if (firebaseResponse == null) {
            throw new Error('Failed to login');
          }

          return firebaseResponse;
        })
    );
  }

  logout(): void {
    sessionStorage.removeItem(AuthService.userKey);
    from(this.angularFireAuth.signOut()).subscribe(() => {
      this.user = null;
    });
  }

  private dispatchUser(user: User): void {
    this.store.dispatch(setUser({ user }));
    sessionStorage.setItem(AuthService.userKey, JSON.stringify(user));
  }
}
