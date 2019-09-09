import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { NotablePlayer } from 'src/app/models/notablePlayer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit {

  character: Character;
  characterForm: FormGroup;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService) {
    }

  ngOnInit() {
    const characterId = this.route.snapshot.paramMap.get('characterId');
    this.characterService.get(parseFloat(characterId)).subscribe(character => {
        this.character = character;
        this.loading = false;
    });
  }

  createPlayer() {
    this.character.notablePlayers.push(new NotablePlayer());
  }

  saveForm() {
    console.log(this.character);
  }

  deletePlayer(player: NotablePlayer) {
    const index = this.character.notablePlayers.indexOf(player, 0);
    if (index > -1) {
      this.character.notablePlayers.splice(index, 1);
    }
  }

}
