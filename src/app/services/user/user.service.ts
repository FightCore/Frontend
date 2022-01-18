import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/models/post';
import { Observable } from 'rxjs';
import { CreateUser } from 'src/app/models/createUser';
import { User } from 'src/app/models/user';
import { UpdateUser } from 'src/app/models/users/update-user';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { setUser } from 'src/app/store/user/user.actions';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.baseUrl}/accounts`;
  private userUrl = `${environment.baseUrl}/users`;
  constructor(private httpClient: HttpClient, private store: Store) {}

  /**
   * Gets the posts that are written by the user.
   * @param userId the id of the user.
   */
  public getPosts(userId: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/${userId}/posts`);
  }

  public get(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${userId}`);
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.userUrl}/me`);
  }

  /**
   * Registers and creates an user.
   *
   * @param user the user to be created.
   */
  createUser(user: CreateUser): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/`, user);
  }

  updateUser(user: UpdateUser): Observable<User> {
    return this.httpClient.put<User>(`${this.userUrl}/me`, user).pipe(
      tap((newUser) => {
        this.store.dispatch(setUser({ user: newUser }));
        sessionStorage.setItem(AuthService.userKey, JSON.stringify(newUser));
        return newUser;
      })
    );
  }
}
