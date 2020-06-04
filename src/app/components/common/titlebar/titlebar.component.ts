import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserOptions } from 'src/app/options/userOptions';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {
  @Input() title: string;
  @Output() selectionChange: EventEmitter<number> = new EventEmitter();

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
  }

  onSwitchingGame(gameId: number): void {
    UserOptions.setCurrentGame(gameId);
    this.appComponent.setThemeForCurrentGame();

    if (this.selectionChange) {
      this.selectionChange.emit(gameId);
    }
  }

  getCurrentGame(): number {
    return UserOptions.getCurrentGame();
  }
}
