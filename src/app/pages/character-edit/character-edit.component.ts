import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { FormGroup } from '@angular/forms';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.scss'],
})
export class CharacterEditComponent implements OnInit {
  character: Character;
  characterForm: FormGroup;
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    const characterId = this.route.snapshot.paramMap.get('characterId');
    this.characterService.get(parseFloat(characterId)).subscribe((character) => {
      this.character = character;
      this.loading = false;
    });
  }

  saveForm(): void {
    this.characterService.updateCharacter(this.character).subscribe(
      (_) => {
        this.toastrService.success('Successfully suggested an edit.');
        this.toCharacters();
      },
      () => {
        this.toastrService.error('Failed to suggest edit, try refreshing the page.');
      }
    );
  }

  toCharacters(): void {
    this.router.navigate([StaticRoutes.characters, this.character.id]);
  }
}
