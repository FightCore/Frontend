import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private baseUrl = `${environment.baseUrl}/accounts`;
  constructor(private httpClient: HttpClient,
              authService: AuthService) {
    super(authService);
   }

   public getPosts(userId: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/${userId}/posts`, this.getDefaultHttpOptions());
   }
}
