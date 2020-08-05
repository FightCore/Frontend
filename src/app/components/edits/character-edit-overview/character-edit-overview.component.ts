import { Component, OnInit, Input } from '@angular/core';
import { CharacterEdits } from 'src/app/models/edits/character-edits';

@Component({
  selector: 'app-character-edit-overview',
  templateUrl: './character-edit-overview.component.html',
  styleUrls: ['./character-edit-overview.component.scss']
})
export class CharacterEditOverviewComponent implements OnInit {
  @Input() characterEdits: CharacterEdits;
  constructor() { }

  ngOnInit(): void {
  }

  characterIcon(): string {
    if (this.characterEdits.character.stockIcon) {
      return this.characterEdits.character.stockIcon.url;
    }

    return 'https://www.civhc.org/wp-content/uploads/2018/10/question-mark.png';
  }


}
