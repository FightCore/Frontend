import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournaments/tournament.service';
import { Tournament } from 'src/app/models/tourrnament';
import { IpService } from 'src/app/services/ip/ip.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[];
  latitude: number;
  longitude: number;
  useCountry: boolean;
  constructor(
    private tournamentService: TournamentService,
    private ipService: IpService) { }

  ngOnInit() {
    this.ipService.getIp().subscribe(ipResult => {
      this.latitude = ipResult.lat;
      this.longitude = ipResult.lon;
    });
    this.tournamentService.getAll().subscribe(tournaments => {
      this.tournaments = tournaments.sort((a, b) => a.startAt > b.startAt ? 1 : -1);
      console.log(this.tournaments);
    });
  }

}
