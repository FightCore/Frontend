import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import * as faker from 'faker';
import { GameSeries } from 'src/app/models/gameSeries';
import { GameService } from 'src/app/services/game/game.service';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  constructor(
    private characterService: CharacterService,
    private gameService: GameService) {}
  loading: boolean = true;
  characters: Character[];
  displayedCharacters: Character[];
  games: Game[];

  // 6 is the Id that ultimate has, as this is the most recent game, lets filter on this.
  // This should become an user preference.
  selectedGame: number = 6;
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

  filterCharacters(): void {
    this.displayedCharacters = this.characters.filter(
      character => character.game.id === this.selectedGame
    );
    if (this.searchedName) {
      this.displayedCharacters = this.displayedCharacters.filter(character =>
        character.name.toLowerCase().includes(this.searchedName.toLowerCase())
      );
    }

    this.displayedCharacters.sort((characterOne, characterTwo) =>
      characterOne.name > characterTwo.name ? 1 : -1
    );
  }
}
