import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { zip } from 'rxjs';
import { Character } from 'src/app/models/character';
import { FrameDataCharacter } from 'src/app/models/framedata/framedata-character';
import { Move } from 'src/app/models/framedata/move';
import { MoveType } from 'src/app/models/framedata/move-type';
import { UserOptions } from 'src/app/options/userOptions';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { CharacterService } from 'src/app/services/character/character.service';
import { FrameDataService } from 'src/app/services/framedata/frame-data.service';

@Component({
  selector: 'app-framedata-character',
  templateUrl: './framedata-character.component.html',
  styleUrls: ['./framedata-character.component.scss'],
})
export class FramedataCharacterComponent implements OnInit {
  frameData: FrameDataCharacter;
  characters: Character[];
  loading = true;
  charactersLoading = true;
  moveTypes = [
    { name: 'Grounded attacks', value: MoveType.grounded },
    { name: 'Tilt attacks', value: MoveType.tilt },
    { name: 'Aerial attacks', value: MoveType.air },
    { name: 'Special attacks', value: MoveType.special },
    { name: 'Throws', value: MoveType.throw },
    { name: 'Dodges', value: MoveType.dodge },
    { name: 'Unknown', value: MoveType.unknown },
  ];
  constructor(
    private route: ActivatedRoute,
    private frameDataService: FrameDataService,
    private router: Router,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.characterService
      .getForGame(UserOptions.getCurrentGame())
      .subscribe((characters) => {
        (this.characters = characters.sort((a,b) => b.name > a.name ? -1 : 1));
        this.charactersLoading = false;
      });

      this.reloadFrameData();
  }

  reloadFrameData(): void {
    this.loading = true;
    const characterId = parseFloat(this.route.snapshot.paramMap.get('characterId'));

    this.frameDataService.getFrameDataForCharacter(characterId).subscribe((frameData) => {
      this.frameData = frameData;
      this.loading = false;
    });
  }

  viewCharacter(characterId: number): void {
    this.router.navigate([StaticRoutes.frameData, characterId]).then(() => this.reloadFrameData());
  }

  getMovesForType(moveType: MoveType): Move[] {
    return this.frameData.moves
      .filter((move) => move.type === moveType)
      .sort((moveA, moveB) => moveA.name.localeCompare(moveB.name));
  }
}
