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

  public getPosts(): Post[] | Observable<Post> {
    if (environment.mocking) {
      return this.generatePostList(10);
    }

    return null;
  }

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
    post.title = faker.lorem.sentence();
    post.author = faker.internet.userName();
    post.body = faker.lorem.paragraphs(2);
    post.votes = faker.random.number();
    post.bannerUrl = 'https://i.imgur.com/aEwNXVn.jpg';
    return post;
  }
}
