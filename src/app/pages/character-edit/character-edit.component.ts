import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { NotablePlayer } from 'src/app/models/notablePlayer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { VideoResource } from 'src/app/models/videoResource';
import { WebsiteResource } from 'src/app/models/resources/websiteResource';
import { ToastrService } from 'ngx-toastr';

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
    private toastrService: ToastrService,
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
    const player = new NotablePlayer();
    player.new = true;
    this.character.notablePlayers.push(player);
  }

  createVideo(): void {
    const video = new VideoResource();
    video.new = true;
    this.character.videos.push(video);
  }

  createWebsite(): void {
    const website = new WebsiteResource();
    website.new = true;
    this.character.websites.push(website);
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
    this.characterService.updateCharacter(this.character).subscribe(_ => {
    this.toastrService.success('Successfully suggested an edit.');
    this.toCharacters();
    }, error => {
      console.log(error);
      this.toastrService.error('Failed to suggest edit, try refreshing the page.');
    });
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
