import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/models/post';
import { Observable } from 'rxjs';
import { CreateUser } from 'src/app/models/createUser';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private baseUrl = `${environment.baseUrl}/accounts`;
  constructor(private httpClient: HttpClient,
              authService: AuthService) {
    super(authService);
   }

   /**
    * Gets the posts that are written by the user.
    * @param userId the id of the user.
    */
   public getPosts(userId: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/${userId}/posts`, this.getDefaultHttpOptions());
   }

   /**
    * Registers and creates an user.
    * @param user the user to be created.
    */
   public createUser(user: CreateUser): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/`, user, this.getDefaultHttpOptions());
   }
}
