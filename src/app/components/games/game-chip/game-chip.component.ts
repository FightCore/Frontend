import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game-chip',
  templateUrl: './game-chip.component.html',
  styleUrls: ['./game-chip.component.scss']
})
export class GameChipComponent implements OnInit {
  @Input() game: Game;
  constructor() { }

  ngOnInit() {
  }

}
