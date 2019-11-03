import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from 'src/app/models/tourrnament';

@Component({
  selector: 'app-tournament-preview',
  templateUrl: './tournament-preview.component.html',
  styleUrls: ['./tournament-preview.component.scss']
})
export class TournamentPreviewComponent implements OnInit {
  @Input() tournament: Tournament;
  constructor() { }

  ngOnInit() {
  }
  getDateString(): string {
    return new Date(this.tournament.startAt).toLocaleDateString();
  }
}
