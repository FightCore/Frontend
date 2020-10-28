import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameThemes } from 'src/styles/gameThemes';
import { Router } from '@angular/router';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { UserOptions } from 'src/app/options/userOptions';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.scss']
})
export class GamePreviewComponent implements OnInit {
  @Input() game: Game;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  getClass(): string {
    return GameThemes.getThemeForGameId(this.game.id, true);
  }

  viewGame(): void {
    this.router.navigate([StaticRoutes.game, this.game.id]);
  }

  isDarkMode(): boolean {
    return UserOptions.getDarkMode();
  }
}
