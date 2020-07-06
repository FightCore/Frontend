import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, CreatedPost } from 'src/app/models/post';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { BaseService } from '../base.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService {
  private baseUrl: string = `${environment.baseUrl}/Posts`;
  constructor(private httpClient: HttpClient, authService: AuthService) {
    super(authService);
  }

  /**
   * Gets a list of all posts made to FightCore.
   */
  public getPosts(): Observable<Post[]> {
    if (environment.mocking) {
      return new Observable(observer => observer.next(this.generatePostList(10)));
    }

    return this.httpClient.get<Post[]>(this.baseUrl, this.getDefaultHttpOptions());
  }

  /**
   * Gets a list of latest posts.
   */
  public getLatestPosts(): Observable<Post[]> {
    if (environment.mocking) {
      return new Observable(observer => observer.next(this.generatePostList(3)));
    }

    return this.httpClient.get<Post[]>(`${this.baseUrl}/latest`, this.getDefaultHttpOptions());
  }

  /**
   * Gets the currently featured posts.
   */
  public getFeaturedPosts(): Observable<Post[]> {
    if (environment.mocking) {
      return new Observable(observer => observer.next(this.generatePostList(3)));
    }

    return this.httpClient.get<Post[]>(`${this.baseUrl}/featured`, this.getDefaultHttpOptions());
  }

  /**
   * Gets a single post based on it's id.
   * @param id the id of the post requested.
   */
  public getPost(id: number): Observable<Post> {
    if (environment.mocking) {
      return new Observable(observer => observer.next(this.generatePost()));
    }

    return this.httpClient.get<Post>(`${this.baseUrl}/${id}`, this.getDefaultHttpOptions());
  }

  /**
   * Gets a list of posts based on the gameId provided.
   * @param gameId the id of the game
   */
  public getPostsForGame(gameId: number): Observable<Post[]> {
    if (environment.mocking) {
      return new Observable(observer => observer.next(this.generatePostList(10)));
    }

    return this.httpClient.get<Post[]>(`${environment.baseUrl}/games/${gameId}/posts`);
  }

  /**
   * Add or Removes a like from a post if the user is logged in.
   * @param id the id of the post wanting to like or remove a like from.
   */
  public likePost(id: number): Observable<never> | Observable<null> {
    if (environment.mocking) {
      return this.returnFakeObserver();
    }

    return this.httpClient.post<null>(`${this.baseUrl}/${id}`, null, this.getDefaultHttpOptions());
  }

  /**
   * Create a post if the user has logged in.
   * @param post the post that will be created for the current user.
   */
  public createPost(post: CreatedPost): Observable<never> | Observable<null> {
    if (environment.mocking) {
      return this.returnFakeObserver();
    }

    return this.httpClient.post<null>(this.baseUrl, post, this.getDefaultHttpOptions());
  }

  /**
   * Updates the post provided.
   * @param post the post to be updated.
   */
  public updatePost(post: Post): Observable<never> | Observable<null> {
    if (environment.mocking) {
      return this.returnFakeObserver();
    }

    return this.httpClient.put<null>(this.baseUrl, post, this.getDefaultHttpOptions());
  }

  private generatePostList(iterations: number): Post[] {
    const posts = [];
    for (let i = 0; i < iterations; i++) {
      posts.push(this.generatePost());
    }

    return posts;
  }

  private generatePost(): Post {
    const post = new Post();
    // if (faker.random.boolean()) {
    // post.bannerUrl = 'https://i.imgur.com/aEwNXVn.jpg';
    // }

    return post;
  }
}
