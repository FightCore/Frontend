import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Game } from 'src/app/models/game';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-game-selector',
  templateUrl: './game-selector.component.html',
  styleUrls: ['./game-selector.component.scss']
})
export class GameSelectorComponent implements OnInit {
  constructor(private gameService: GameService) { }
  @Output() selectionChange: EventEmitter<number> = new EventEmitter();
  @Input() addAllOptions: boolean = false;

  loading: boolean = true;
  failed: boolean;
  games: Game[];

  ngOnInit() {
    const allGames = this.gameService.getAllGames();

    if (allGames instanceof Array) {
      this.processGames(allGames);
    } else {
      allGames.subscribe((games: Game[]) => this.processGames(games),
      error => this.failed = true);
    }
  }

  private processGames(games: Game[]): void {
    this.games = games;
    this.loading = false;
  }

  protected onSelectChange(change: MatSelectChange): void {
    if (this.selectionChange) {
      this.selectionChange.emit(change.value);
    }
  }
}
