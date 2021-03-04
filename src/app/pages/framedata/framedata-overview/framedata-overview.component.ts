import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
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
  popularMoveIds = [ 1284, 1227, 950, 1103, 1579, 1580, 1362, 830, 1280];
  popularMoves = [];

  constructor(
    private characterService: CharacterService,
    private frameDataService: FrameDataService,
    private router: Router) { }

  ngOnInit(): void {
    const observables = this.popularMoveIds.map((moveId) => this.frameDataService.getMove(moveId));
    zip(...observables).subscribe((moves) => {
      this.popularMoves = moves;
    });

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
