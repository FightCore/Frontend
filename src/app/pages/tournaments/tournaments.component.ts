import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournaments/tournament.service';
import { Tournament } from 'src/app/models/tourrnament';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[];
  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.getAll().subscribe(tournaments => {
      this.tournaments = tournaments.sort((a, b) => a.startAt > b.startAt ? 1 : -1);
      console.log(this.tournaments);
    });
  }

}
