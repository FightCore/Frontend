import { Component, OnInit, Input } from '@angular/core';
import { Matchup } from 'src/app/models/matchup';
import { Character } from 'src/app/models/character';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matchup-chart',
  templateUrl: './matchup-chart.component.html',
  styleUrls: ['./matchup-chart.component.scss']
})
export class MatchupChartComponent implements OnInit {
  @Input() matchups: Matchup[];
  tiers: Set<number>;
  loaded = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.tiers = new Set(this.matchups.sort(this.sortMatchup)
      .map(matchup => matchup.value));
    this.loaded = true;
  }

  getCharactersByTier(tier: number): Character[] {
    return this.matchups.filter(matchup => matchup.value === tier).map(matchup => matchup.character2);
  }
   viewCharacter(id: number): void {
    this.router.navigate([StaticRoutes.characters, id]);
   }

  sortMatchup(matchupOne: Matchup, matchupTwo: Matchup): number {
    return matchupOne.value < matchupTwo.value ? 1 : -1;
  }
}