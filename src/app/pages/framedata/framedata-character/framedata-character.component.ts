import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrameDataCharacter } from 'src/app/models/framedata/framedata-character';
import { Move } from 'src/app/models/framedata/move';
import { MoveType } from 'src/app/models/framedata/move-type';
import { FrameDataService } from 'src/app/services/framedata/frame-data.service';

@Component({
  selector: 'app-framedata-character',
  templateUrl: './framedata-character.component.html',
  styleUrls: ['./framedata-character.component.scss']
})
export class FramedataCharacterComponent implements OnInit {

  frameData: FrameDataCharacter;
  loading = true;
  displayMoveGifs = true;
  moveTypes = [
    { name: 'Grounded attacks', value: MoveType.grounded},
    { name: 'Tilt attacks', value: MoveType.tilt},
    { name: 'Aerial attacks', value: MoveType.air},
    { name: 'Special attacks', value: MoveType.special},
    { name: 'Throws', value: MoveType.throw},
    { name: 'Dodges', value: MoveType.dodge},
    { name: 'Unknown', value: MoveType.unknown}
  ];
  constructor(
    private route: ActivatedRoute,
    private frameDataService: FrameDataService
  ) { }

  scrollToCategory(type: MoveType): void {
    const element = document.getElementById('category'+type);
    element.scrollIntoView();
  }

  ngOnInit(): void {
    const characterId = parseFloat(
      this.route.snapshot.paramMap.get('characterId')
    );

    this.frameDataService.getFrameDataForCharacter(characterId).subscribe((frameData) => {
      this.frameData = frameData;
      this.loading = false;
    });
  }

  getMovesForType(moveType: MoveType): Move[] {
    return this.frameData.moves
      .filter(move => move.type === moveType)
      .sort((moveA, moveB) => moveA.name.localeCompare(moveB.name));
  }

}
