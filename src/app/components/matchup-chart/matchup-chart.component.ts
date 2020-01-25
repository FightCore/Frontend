import { Component, OnInit, Input } from '@angular/core';
import { Matchup } from 'src/app/models/matchup';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-matchup-chart',
  templateUrl: './matchup-chart.component.html',
  styleUrls: ['./matchup-chart.component.scss']
})
export class MatchupChartComponent implements OnInit {
  @Input() matchups: Matchup[];
  tiers: Set<number>;
  loaded = false;
  constructor() { }

  ngOnInit() {
    this.tiers = new Set(this.matchups.sort((matchupOne, matchupTwo) => matchupOne.value < matchupTwo.value ? 1 : -1)
      .map(matchup => matchup.value));
    this.loaded = true;
  }

  getCharactersByTier(tier: number): Character[] {
    return this.matchups.filter(matchup => matchup.value === tier).map(matchup => matchup.character2);
  }
}
