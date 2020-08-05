import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private characterService: CharacterService
  ) { }

  popularCharacters: Character[];

  ngOnInit() {
    this.characterService.getPopular().subscribe(characters => this.popularCharacters = characters);
  }
}
