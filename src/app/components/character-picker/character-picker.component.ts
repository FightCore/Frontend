import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-character-picker',
  templateUrl: './character-picker.component.html',
  styleUrls: ['./character-picker.component.scss']
})
export class CharacterPickerComponent implements OnInit {
  @Input() gameId: number;
  @Output() selectionChange: EventEmitter<number> = new EventEmitter();
  @Input() addAllOptions: boolean = false;
  selected: number;
  displayedCharacters: Character[];
  characters: Character[];
  loading = true;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getAll().subscribe(characters => {
      this.characters = characters;
      this.filterCharacters();
      this.loading = false;
    });
  }

  protected filterCharacters(): void {
    this.displayedCharacters = this.characters.filter(character =>
      this.gameId === 0 ? true : character.game.id === this.gameId);
    this.displayedCharacters.sort((characterOne, characterTwo) =>
      characterOne.name > characterTwo.name ? 1 : -1
    );
  }

  updateGame(gameId: number) {
    this.gameId = gameId;
    this.filterCharacters();
  }

  protected onSelectChange(change: MatSelectChange): void {
    if (this.selectionChange) {
      this.selectionChange.emit(change.value);
    }
  }
}
