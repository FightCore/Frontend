import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { MatSelectChange, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  displayedCharacters: Observable<Character[]>;
  gameCharacters: Character[];
  characters: Character[];
  loading = true;
  characterFormControl = new FormControl();

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getAll().subscribe(characters => {
      this.characters = characters;
      this.loading = false;
      this.updateGame(this.gameId);
    });

    // Taken from the official example
    // https://material.angular.io/components/autocomplete/examples
    this.displayedCharacters = this.characterFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.gameCharacters.slice())
      );
  }

  updateGame(gameId: number): void {
    this.gameId = gameId;
    this.gameCharacters = this.characters.filter(character => this.filterCharacterByGame(character, gameId));
    this.gameCharacters.sort(this.sortCharacters);

    // Basically resets the control so that the right characters from the right
    // game are in the dropdown.
    this.characterFormControl.setValue('');
  }

  /**
   * Method called when the value of the autocomplete has changed.
   * @param change the change from the original value to the option selected.
   */
  protected onSelectChange(change: MatAutocompleteSelectedEvent): void {
    if (this.selectionChange && change.option.value) {
      this.selectionChange.emit(change.option.value.id);
    }
  }

  /**
   * Displays the value of the character in the input field.
   * @param character the character that will be displayed.
   */
  displayCharacter(character?: Character): string | undefined {
    return character ? character.name : null;
  }

  private _filter(name: string): Character[] {
    let characters = [];
    characters = this.gameCharacters.filter(character =>
      this.filterCharacterByGame(character, this.gameId)
      && character.name.includes(name));
    characters.sort(this.sortCharacters);

    return characters;
  }

  //#region Filters
  private sortCharacters(characterOne: Character, characterTwo: Character): number {
    return characterOne.name > characterTwo.name ? 1 : -1;
  }

  private filterCharacterByGame(character: Character, gameId: number): ConstrainBoolean {
    if (character == null || character.game == null) {
      return false;
    }
    return gameId === 0 ? true : character.game.id === gameId;
  }
  //#endregion Filters
}
