import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { UserOptions } from './options/userOptions';
import { GameThemes } from 'src/styles/gameThemes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FightCore';

  constructor() { }

  ngOnInit(): void {
  }
}
