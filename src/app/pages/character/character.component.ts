import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { GameService } from 'src/app/services/game/game.service';
import { Game } from 'src/app/models/game';
import { UserOptions } from 'src/app/options/userOptions';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  constructor(
    private characterService: CharacterService,
    private gameService: GameService,
    private router: Router) {}
  loading: boolean = true;
  characters: Character[];
  displayedCharacters: Character[];
  games: Game[];

  // 6 is the Id that ultimate has, as this is the most recent game, lets filter on this.
  // This should become an user preference.
  selectedGame: number = UserOptions.getCurrentGame();
  searchedName: string;

  ngOnInit() {
    this.gameService.getAllGames().subscribe(games => {
      this.games = games;
    });

    this.characterService.getAll().subscribe(characters => {
      this.characters = characters;
      this.filterCharacters();
      this.loading = false;
    });
  }

  getCurrentGame(): Game {
    return this.games.find(game => game.id === this.selectedGame);
  }

  changeGameSelection(gameId: number): void {
    this.selectedGame = gameId;
    this.filterCharacters();
  }

  onSearchChange(term: string): void {
    this.searchedName = term;
    this.filterCharacters();
  }

  viewCharacter(id: number): void {
    this.router.navigate([StaticRoutes.characters, id]);
  }

  filterCharacters(): void {
    this.displayedCharacters = this.characters.filter(
      character => this.selectedGame === 0 ? true : character.game.id === this.selectedGame
    );
    if (this.searchedName) {
      this.displayedCharacters = this.displayedCharacters.filter(character =>
        // 'i' modifier makes the case-insensitive.
        character.name.search(new RegExp(this.searchedName, 'i')) >= 0
      );
    }

    this.displayedCharacters.sort((characterOne, characterTwo) =>
      characterOne.game.id > characterTwo.game.id ? 1 : -1
    );

    this.displayedCharacters.sort((characterOne, characterTwo) =>
      characterOne.name > characterTwo.name ? 1 : -1
    );
  }
}
