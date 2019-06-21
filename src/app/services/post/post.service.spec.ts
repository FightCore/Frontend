import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';

describe('PostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostService = TestBed.get(PostService);
    expect(service).toBeTruthy();
  });

  it('should give a list of posts', () => {
    const service: PostService = TestBed.get(PostService);
    const posts = service.getPosts();
    expect(posts).toBeTruthy();
  });

  it('should be able to like a post', () => {
    const service: PostService = TestBed.get(PostService);
    const likeObservable = service.likePost(1);
    expect(likeObservable).toBeTruthy();
  });
});
