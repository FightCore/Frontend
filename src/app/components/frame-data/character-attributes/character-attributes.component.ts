import { Component, OnInit, Input } from '@angular/core';
import { FrameDataCharacter } from 'src/app/models/framedata/framedata-character';

@Component({
  selector: 'app-character-attributes',
  templateUrl: './character-attributes.component.html',
  styleUrls: ['./character-attributes.component.scss']
})
export class CharacterAttributesComponent implements OnInit {

  constructor() { }
  @Input() frameDataCharacter: FrameDataCharacter;
  statistics: any[];
  ngOnInit(): void {
    const stats = this.frameDataCharacter.characterStatistics;
    this.statistics = [
      { name: 'Weight', value: stats.weight},
      { name: 'Gravity', value: stats.gravity},
      { name: 'Walk speed', value: stats.walkSpeed},
      { name: 'Run speed', value: stats.runSpeed},
      { name: 'Wavedash length rank', value: stats.waveDashLengthRank},
      { name: 'PLA Intangibility frames', value: stats.plaIntangibilityFrames},
      { name: 'Jump squat', value: stats.jumpSquat},
      { name: 'Can wall jump', value: stats.canWallJump ? 'Yes' : 'No'},
      { name: 'Notes', value: stats.notes},
    ].filter(stat => stat.value !== (null || undefined) && stat.value !== '');
  }

}
