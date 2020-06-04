import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { NotablePlayer } from 'src/app/models/notablePlayer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { VideoResource } from 'src/app/models/videoResource';
import { WebsiteResource } from 'src/app/models/resources/websiteResource';

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

  createVideo(): void {
    this.character.videos.push(new VideoResource());
  }

  createWebsite(): void {
    this.character.websites.push(new WebsiteResource());
  }

  deleteVideo(video: VideoResource): void {
    const index = this.character.videos.indexOf(video);
    if (index > -1) {
      this.character.videos.splice(index, 1);
    }
  }

  deleteWebsite(website: WebsiteResource): void {
    const index = this.character.websites.indexOf(website);
    if (index > -1) {
      this.character.websites.splice(index, 1);
    }
  }

  saveForm(): void {
    this.characterService.updateCharacter(this.character).subscribe(_ => {}, error => console.log(error));
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
