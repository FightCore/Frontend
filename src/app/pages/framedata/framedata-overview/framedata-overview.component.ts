import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { Character } from 'src/app/models/character';
import { FrameDataCharacter } from 'src/app/models/framedata/framedata-character';
import { UserOptions } from 'src/app/options/userOptions';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { CharacterService } from 'src/app/services/character/character.service';
import { FrameDataService } from 'src/app/services/framedata/frame-data.service';

@Component({
  selector: 'app-framedata-overview',
  templateUrl: './framedata-overview.component.html',
  styleUrls: ['./framedata-overview.component.scss']
})
export class FramedataOverviewComponent implements OnInit {
  loading = true;
  characters: Character[]
  frameDataCharacters: FrameDataCharacter[];
  constructor(
    private characterService: CharacterService,
    private frameDataService: FrameDataService,
    private router: Router) { }

  ngOnInit(): void {
    zip(
      this.characterService.getForGame(UserOptions.getCurrentGame()),
      this.frameDataService.getCharacters()
      ).subscribe((results) => {
        this.characters = results[0].sort((a,b) => b.name > a.name ? -1 : 1);
        this.frameDataCharacters = results[1];
        this.loading = false;
    });
  }

  viewCharacter(characterId: number): void {
    this.router.navigate([ StaticRoutes.frameData, characterId]);
  }

  getFrameDataForCharacter(characterId: number): FrameDataCharacter {
    return this.frameDataCharacters.find((frameDataCharacter) =>
      frameDataCharacter.fightCoreId === characterId);
  }
}
