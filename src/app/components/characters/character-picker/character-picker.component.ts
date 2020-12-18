import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-character-picker',
  templateUrl: './character-picker.component.html',
  styleUrls: ['./character-picker.component.scss']
})
export class CharacterPickerComponent implements OnInit {
  @Input() selected: number;
  @Input() gameId: number;
  @Output() selectionChange: EventEmitter<number> = new EventEmitter();
  @Input() addAllOptions: boolean = false;
  displayedCharacters: Observable<Character[]>;
  characters: Character[];
  loading = true;
  characterFormControl = new FormControl();

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
      this.loading = false;
      this.updateGame(this.gameId);

      // Taken from the official example
      // https://material.angular.io/components/autocomplete/examples
      this.displayedCharacters = this.characterFormControl.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.name)),
        map(name => (name ? this._filter(name) : this.characters.slice()))
      );
  }

  getValue(): number | null {
    if (this.characterFormControl.value) {
      return this.characterFormControl.value.id;
    }

    return null;
  }

  updateGame(gameId: number): void {
    this.gameId = gameId;
    this.loading = true;
    this.getCharsForGame();
  }

  private getCharsForGame(): void {
    if (this.gameId === 0) {
      this.characterService.getAll().subscribe(characters => {
        this.processCharacters(characters)
      });
    } else {
      this.characterService.getForGame(this.gameId).subscribe(characters => {
        this.processCharacters(characters);
      });
    }


  }

  private processCharacters(characters: Character[]) {
    this.characters = characters;
    this.characters.sort(this.sortCharacters);

    // Check if character that was previously picked is no longer in the dropdown.
    const pickedCharacterIndex = this.characters.findIndex(character =>
      character.id === this.getValue());

    if (pickedCharacterIndex < 0) {
      // Reset the dropdown.
      this.characterFormControl.setValue('');
    }

    this.characterFormControl.setValue(this.getCharacterForId(this.selected));
    this.loading = false;
  }

  private getCharacterForId(id: number): Character {
    return this.characters.find(character => character.id === id);
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
    characters = this.characters.filter(
      character =>
        this.filterCharacterByGame(character, this.gameId) &&
        character.name.search(new RegExp(name, 'i')) >= 0
    );
    characters.sort(this.sortCharacters);

    return characters;
  }

  //#region Filters
  private sortCharacters(
    characterOne: Character,
    characterTwo: Character
  ): number {
    return characterOne.name > characterTwo.name ? 1 : -1;
  }

  private filterCharacterByGame(
    character: Character,
    gameId: number
  ): ConstrainBoolean {
    if (character == null || character.game == null) {
      return false;
    }
    return gameId === 0 ? true : character.game.id === gameId;
  }
  //#endregion Filters
}
