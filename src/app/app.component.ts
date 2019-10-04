import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { UserOptions } from './options/userOptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FightCore';
  themeDictionary: Map<number, string> = new Map([
    [1, 'fightcore-theme'],
    [2, 'melee-theme'],
    [3, 'fightcore-theme'],
    [4, 'fightcore-theme'],
    [5, 'fightcore-theme'],
    [6, 'fightcore-theme'],
  ]);

  constructor(public overlayContainer: OverlayContainer) { }
  @HostBinding('class') componentCssClass;

  ngOnInit(): void {
   this.setThemeForGame();
  }

  public setThemeForGame() {
    const gameId = UserOptions.getCurrentGame();
    const theme = this.getThemeForGameId(gameId);
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

  public getThemeForGameId(gameId: number) {
    return this.themeDictionary.get(gameId);
  }
}
