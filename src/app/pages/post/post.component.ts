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
  styleUrls: ['./post.component.scss']
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
  orderOptions = 0;

  ngOnInit() {
    this.getPosts();
  }

  onGameChange(gameId: number): void {
    this.gameId = gameId;
    this.characterPicker.updateGame(gameId);
    this.characterId = this.characterPicker.getValue();
    UserOptions.setCurrentGame(gameId);
    this.filterAndOrderPosts();
  }

  getPosts(): void {
    this.loading = true;
    this.posts = [];
    this.characterPicker?.updateGame(this.gameId);
    if (this.gameId === 0) {
      this.postService.getPosts().subscribe(posts => {
        this.posts = posts;
        this.filterAndOrderPosts();
        this.loading = false;
      })

      return;
    }

    this.postService.getPostsForGame(this.gameId).subscribe(posts => {
      this.posts = posts;
      this.filterAndOrderPosts();
      this.loading = false;
    })
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterAndOrderPosts();
  }

  onCharacterChange(characterId: number): void {
    this.characterId = characterId;
    this.filterAndOrderPosts();
  }

  filterValueChanged(valueChanged: string): void {
    this.orderOptions = parseFloat(valueChanged);
    this.filterAndOrderPosts();
  }

  private filterAndOrderPosts(): void {
    if (this.gameId === 0) {
      this.displayPosts = this.posts;
    } else {
      this.displayPosts = this.posts.filter(
        post => post.gameId === this.gameId
      );
    }

    if (this.searchTerm) {
      this.displayPosts = this.displayPosts.filter(
        post =>
          post.title.search(new RegExp(this.searchTerm, 'i')) >= 0 ||
          post.author.name.search(new RegExp(this.searchTerm, 'i')) >= 0
      );
    }

    if (this.characterId) {
      this.displayPosts = this.displayPosts.filter(
        post => post.characterId === this.characterId
      );
    }

    this.displayPosts.sort((postA, postB) => {
      if (this.orderOptions === 0) {
        return postB.likes - postA.likes;
      } else {
        return postB.id - postA.id ? 1 : -1;
      }
    });
  }

  createPost() {
    this.router.navigate([`/${StaticRoutes.createPost}`]);
  }
}
