import { Component, Input, OnInit } from '@angular/core';
import { NotablePlayer } from 'src/app/models/notablePlayer';

@Component({
  selector: 'app-edit-notable-player',
  templateUrl: './edit-notable-player.component.html',
  styleUrls: ['./edit-notable-player.component.scss']
})
export class EditNotablePlayerComponent implements OnInit {

  constructor() { }
  @Input() notablePlayers: NotablePlayer[];
  ngOnInit(): void {
  }

  createPlayer(): void {
    const player = new NotablePlayer();
    player.new = true;
    this.notablePlayers.unshift(player);
  }

  deletePlayer(player: NotablePlayer): void {
    const index = this.notablePlayers.indexOf(player, 0);
    if (index > -1) {
      this.notablePlayers.splice(index, 1);
    }
  }
}
