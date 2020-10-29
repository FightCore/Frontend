import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService {

  constructor(private httpClient: HttpClient, authService: AuthService) {
    super(authService);
  }

  create(postId: number, content: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/posts/${postId}/comments`, {
      content
    }, this.getDefaultHttpOptions());
  }
}
