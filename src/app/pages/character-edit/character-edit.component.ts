import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { NotablePlayer } from 'src/app/models/notablePlayer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaticRoutes } from 'src/app/routes/static-routes';

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
    private characterService: CharacterService,
    private router: Router) {
    }

  ngOnInit() {
    const characterId = this.route.snapshot.paramMap.get('characterId');
    this.characterService.get(parseFloat(characterId)).subscribe(character => {
        this.character = character;
        this.loading = false;
    });
  }

  createPlayer(): void {
    this.character.notablePlayers.push(new NotablePlayer());
  }

  saveForm(): void {
    console.log(this.character);
  }

  deletePlayer(player: NotablePlayer): void {
    const index = this.character.notablePlayers.indexOf(player, 0);
    if (index > -1) {
      this.character.notablePlayers.splice(index, 1);
    }
  }
  toCharacters(): void {
    this.router.navigate([StaticRoutes.characters, this.character.id]);
  }

}
