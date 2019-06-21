import { Injectable } from '@angular/core';
import { Observable, of, never } from 'rxjs';
import { Post } from 'src/app/models/post';
import * as faker from 'faker';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  /**
   * Gets a list of all posts made to FightCore.
   */
  public getPosts(): Post[] | Observable<Post> {
    if (environment.mocking) {
      return this.generatePostList(10);
    }

    return null;
  }

  /**
   * Add or Removes a like from a post if the user is logged in.
   * @param id the id of the post wanting to like or remove a like from.
   */
  public likePost(id: number): Observable<never> {
    if (environment.mocking) {
      return new Observable(observer => {
        setTimeout(() => {
          observer.next();
        }, 200);
      });
    }

    return null;
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
    post.id = faker.random.number();
    post.title = faker.lorem.sentence();
    post.author = faker.internet.userName();
    post.body = faker.lorem.paragraphs(2);
    post.votes = faker.random.number();
    post.bannerUrl = 'https://i.imgur.com/aEwNXVn.jpg';
    return post;
  }
}
