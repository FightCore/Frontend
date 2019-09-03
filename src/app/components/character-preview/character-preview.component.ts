import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-character-preview',
  templateUrl: './character-preview.component.html',
  styleUrls: ['./character-preview.component.scss']
})
export class CharacterPreviewComponent implements OnInit {
  @Input() character: Character;
  constructor() { }

  ngOnInit() {
  }

}
