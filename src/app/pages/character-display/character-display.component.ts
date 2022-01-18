import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { Post } from 'src/app/models/post';
import { SafeResourceUrl } from '@angular/platform-browser';
import { GameThemes } from 'src/styles/gameThemes';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { EditDto } from 'src/app/models/edits/edit-dto';
import { EditService } from 'src/app/services/edits/edit.service';
import { FrameDataCharacter } from 'src/app/models/framedata/framedata-character';
import { FrameDataService } from 'src/app/services/framedata/frame-data.service';
import { MoveType } from 'src/app/models/framedata/move-type';
import { Move } from 'src/app/models/framedata/move';
import { zip, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.scss'],
})
export class CharacterDisplayComponent implements OnInit {
  loading = true;
  character: Character;
  characterId: number;
  posts: Post[];

  youtubeLoading = true;
  youtubeUrls: SafeResourceUrl[] = [];

  openEdits: EditDto[];
  allEdits: EditDto[];

  frameDataCharacter: FrameDataCharacter;
  moveTypes = [
    { name: 'Grounded attacks', value: MoveType.grounded },
    { name: 'Tilt attacks', value: MoveType.tilt },
    { name: 'Aerial attacks', value: MoveType.air },
    { name: 'Special attacks', value: MoveType.special },
    { name: 'Throws', value: MoveType.throw },
    { name: 'Dodges', value: MoveType.dodge },
    { name: 'Unknown', value: MoveType.unknown },
  ];

  private userId: number;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private router: Router,
    private editService: EditService,
    private frameDataService: FrameDataService,
    private store: Store
  ) {
    this.store.select(selectUser).subscribe((user) => {
      this.userId = user?.id;
    });
  }

  ngOnInit() {
    const characterId = parseFloat(this.route.snapshot.paramMap.get('characterId'));
    this.characterId = characterId;
    zip(
      this.characterService.getPosts(characterId),
      this.characterService.get(characterId),
      this.editService.getOpenEditsForCharacter(characterId).pipe(catchError(() => of([]))),
      this.editService.getHistoryForCharacter(characterId).pipe(catchError(() => of([])))
    ).subscribe(([posts, character, openEdits, allEdits]) => {
      this.character = character;
      this.posts = posts;
      this.openEdits = openEdits;
      this.allEdits = allEdits;
      this.loading = false;
    });

    this.frameDataService
      .getFrameDataForCharacter(characterId)
      .subscribe((frameDataCharacter) => (this.frameDataCharacter = frameDataCharacter));
  }

  public getUrl(youtubeId: string): string {
    return 'https://www.youtube.com/watch?v=' + youtubeId;
  }

  getGameClass(): string {
    return GameThemes.getThemeForGameId(this.character.game.id);
  }

  get isLoggedIn(): boolean {
    return this.userId > 0;
  }

  isContributor(): boolean {
    const foundContributor = this.character.contributors.find((contributor) => contributor.user.id === this.userId);

    return foundContributor != null;
  }

  editCharacter(): void {
    this.router.navigate([StaticRoutes.editCharacterNoId, this.character.id]);
  }
  openUrl(url: string): void {
    window.open(url, '_blank');
  }

  getMovesForType(moveType: MoveType): Move[] {
    return this.frameDataCharacter.moves
      .filter((move) => move.type === moveType)
      .sort((moveA, moveB) => moveA.name.localeCompare(moveB.name));
  }
}
