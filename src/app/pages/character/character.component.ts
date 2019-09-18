import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import * as faker from 'faker';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  constructor(private characterService: CharacterService) {}
  loading: boolean = true;
  characters: Character[];
  displayedCharacters: Character[];

  // 6 is the Id that ultimate has, as this is the most recent game, lets filter on this.
  // This should become an user preference.
  selectedGame: number = 6;
  searchedName: string;

  ngOnInit() {
    this.characterService.getAll().subscribe(characters => {
      this.characters = characters;
      this.filterCharacters();
      this.loading = false;
    });
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
