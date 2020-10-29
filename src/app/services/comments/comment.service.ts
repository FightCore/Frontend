import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { BaseService } from '../base.service';
import { Comment} from 'src/app/models/post/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService {

  constructor(private httpClient: HttpClient, authService: AuthService) {
    super(authService);
  }

  create(postId: number, content: string): Observable<Comment> {
    return this.httpClient.post<Comment>(`${environment.baseUrl}/posts/${postId}/comments`, {
      content
    }, this.getDefaultHttpOptions());
  }

  delete(postId: number, commentId: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/posts/${postId}/comments/${commentId}`, this.getDefaultHttpOptions());
  }
}
