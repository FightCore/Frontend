import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { PostService } from 'src/app/services/post/post.service';
import { CharacterService } from 'src/app/services/character/character.service';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game';
import { Character } from 'src/app/models/character';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.scss']
})
export class GameDisplayComponent implements OnInit {
  game: Game;
  loading: boolean = true;
  characters: Character[];
  characterLoading: boolean = true;
  posts: Post[];
  postLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private postService: PostService,
    private characterService: CharacterService) { }

  ngOnInit() {
    const gameId = parseFloat(this.route.snapshot.paramMap.get('gameId'));
    this.gameService.getGame(gameId).subscribe(game => {
      this.game = game;
      this.loading = false;

      this.characterService.getForGame(gameId).subscribe(characters => {
          this.characters = characters.sort((characterOne, characterTwo) =>
            characterOne.name > characterTwo.name ? 1 : -1);
          this.characterLoading = false;
        });

      this.postService.getPostsForGame(gameId).subscribe(posts => {
          this.posts = posts;
          this.postLoading = false;
        });
    });
  }

}
