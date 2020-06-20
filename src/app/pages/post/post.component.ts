import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/post';
import { Router } from '@angular/router';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { ToastrService } from 'ngx-toastr';
import { PostText } from 'src/app/text/post.text';
import { UserOptions } from 'src/app/options/userOptions';
import { CharacterPickerComponent } from 'src/app/components/characters/character-picker/character-picker.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @ViewChild('characterPicker')
  characterPicker: CharacterPickerComponent;
  constructor(
    private postService: PostService,
    private router: Router,
    private toastrService: ToastrService
  ) {}
  loading: boolean = true;
  posts: Post[];
  displayPosts: Post[];

  // Search settings
  searchTerm: string;
  gameId: number = UserOptions.getCurrentGame();
  characterId: number;

  ngOnInit() {
    this.postService.getPosts().subscribe(
      (postArray) => {
        this.setupPosts(postArray);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toastrService.error(PostText.failedPostsLoad);
      }
    );
  }

  private setupPosts(posts: Post[]): void {
    this.posts = posts;
    this.displayPosts = posts;
    this.filterPosts();
  }

  onGameChange(gameId: number): void {
    this.gameId = gameId;
    this.characterPicker.updateGame(gameId);
    this.characterId = this.characterPicker.getValue();
    this.filterPosts();
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterPosts();
  }

  onCharacterChange(characterId: number): void {
    this.characterId = characterId;
    this.filterPosts();
  }

  private filterPosts(): void {
    if (this.gameId === 0) {
      this.displayPosts = this.posts;
    } else {
      this.displayPosts = this.posts.filter(
        (post) => post.gameId === this.gameId
      );
    }

    if (this.searchTerm) {
      this.displayPosts = this.displayPosts.filter(
        (post) =>
          post.title.search(new RegExp(this.searchTerm, 'i')) >= 0 ||
          post.author.name.search(new RegExp(this.searchTerm, 'i')) >= 0
      );
    }

    if (this.characterId) {
      this.displayPosts = this.displayPosts.filter(
        (post) => post.characterId === this.characterId
      );
    }
  }

  createPost() {
    this.router.navigate([`/${StaticRoutes.createPost}`]);
  }
}
