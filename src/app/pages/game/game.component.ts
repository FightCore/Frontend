import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  games: Game[];
  loading: boolean = true;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getAllGames().subscribe(games => {
      this.games = games;
      this.loading = false;
    });
  }

}
