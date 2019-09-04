import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/character';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-preview',
  templateUrl: './character-preview.component.html',
  styleUrls: ['./character-preview.component.scss']
})
export class CharacterPreviewComponent implements OnInit {
  @Input() character: Character;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewCharacter(id: number): void {
    console.log(id);
    this.router.navigate([StaticRoutes.characters, id]);
  }
}
