import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { Post } from 'src/app/models/post';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GameThemes } from 'src/styles/gameThemes';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { Matchup } from 'src/app/models/matchup';
import { MatchupService } from 'src/app/services/matchup/matchup.service';
import { WebsiteResource } from 'src/app/models/resources/websiteResource';
import { EditDto } from 'src/app/models/edits/edit-dto';
import { EditService } from 'src/app/services/edits/edit.service';
import { FrameDataCharacter} from 'src/app/models/framedata/framedata-character';
import { FrameDataService } from 'src/app/services/framedata/frame-data.service';
import { MoveType } from 'src/app/models/framedata/move-type';
import { Move } from 'src/app/models/framedata/move';
import { MatSidenavContent } from '@angular/material/sidenav';
@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.scss']
})
export class CharacterDisplayComponent implements OnInit {
  loading: boolean = true;
  character: Character;
  characterId: number;

  postLoading = true;
  posts: Post[];

  youtubeLoading = true;
  youtubeUrls: SafeResourceUrl[] = [];

  openEdits: EditDto[];
  allEdits: EditDto[];

  frameDataCharacter: FrameDataCharacter;
  moveTypes = [
    { name: 'Grounded attacks', value: MoveType.grounded},
    { name: 'Tilt attacks', value: MoveType.tilt},
    { name: 'Aerial attacks', value: MoveType.air},
    { name: 'Special attacks', value: MoveType.special},
    { name: 'Throws', value: MoveType.throw},
    { name: 'Dodges', value: MoveType.dodge},
    { name: 'Unknown', value: MoveType.unknown}
  ];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private editService: EditService,
    private frameDataService: FrameDataService
  ) { }

  ngOnInit() {
    const characterId = parseFloat(
      this.route.snapshot.paramMap.get('characterId')
    );
    this.characterService
      .getPosts(characterId)
      .subscribe(posts => {
        this.posts = posts;
        this.postLoading = false;
      });

    this.characterService.get(characterId).subscribe(character => {
      this.characterId = characterId;
      this.character = character;
      this.loading = false;

      const videos = this.youtubeVideos();
      videos.forEach(video => {
        this.youtubeUrls.push(
          this.sanitizer.bypassSecurityTrustResourceUrl(video)
        );
      });

      this.youtubeLoading = false;
    });

    this.editService.getOpenEditsForCharacter(characterId).subscribe(edits => {
      this.openEdits = edits;
    });

    this.editService.getHistoryForCharacter(characterId).subscribe(edits => {
      this.allEdits = edits;
    });

    this.frameDataService.getFrameDataForCharacter(characterId).subscribe(frameDataCharacter => 
      this.frameDataCharacter = frameDataCharacter);
  }

  private youtubeVideos(): string[] {
    const videos = [];
    this.character.videos.forEach(video => {
      videos.push(this.getEmbed(video.youtubeId));
    });

    return videos;
  }

  public getEmbed(youtubeId: string): string {
    return 'https://www.youtube.com/embed/' + youtubeId;
  }

  getGameClass(): string {
    return GameThemes.getThemeForGameId(this.character.game.id);
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isContributor(): boolean {
    const foundContributor = this.character.contributors.find(
      contributor => contributor.user.id === this.authService.id
    );

    return (foundContributor != (null || undefined));
  }

  editCharacter(): void {
    this.router.navigate([StaticRoutes.editCharacterNoId, this.character.id]);
  }
  openUrl(url: string): void {
    window.open(url, '_blank');
  }

  getMovesForType(moveType: MoveType): Move[] {
    return this.frameDataCharacter.moves
      .filter(move => move.type === moveType)
      .sort((moveA, moveB) => moveA.name.localeCompare(moveB.name));
  }
}
