import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/character';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { Router } from '@angular/router';
import { GameThemes } from 'src/styles/gameThemes';

@Component({
  selector: 'app-character-preview',
  templateUrl: './character-preview.component.html',
  styleUrls: ['./character-preview.component.scss']
})
export class CharacterPreviewComponent implements OnInit {
  @Input() character: Character;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewCharacter(id: number): void {
    this.router.navigate([StaticRoutes.characters, id]);
  }

  characterIcon(): string {
    if (this.character.stockIcon) {
      return this.character.stockIcon.url;
    }

    return 'https://www.civhc.org/wp-content/uploads/2018/10/question-mark.png';
  }

  seriesIcon(): string {
    if (this.character.series) {
      return this.character.series.gameIcon.url;
    }

    return '';
  }

  getGameClass(): string {
    return GameThemes.themeDictionary.get(this.character.game.id);
  }
}
