import { Component, OnInit, Input } from '@angular/core';
import { NotablePlayer } from 'src/app/models/notablePlayer';

@Component({
  selector: 'app-notable-player',
  templateUrl: './notable-player.component.html',
  styleUrls: ['./notable-player.component.scss']
})
export class NotablePlayerComponent implements OnInit {
  @Input() player: NotablePlayer;
  constructor() { }

  ngOnInit() {
  }

}
