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

@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.scss']
})
export class CharacterDisplayComponent implements OnInit {
  loading: boolean = true;
  character: Character;

  postLoading = true;
  posts: Post[];

  youtubeLoading = true;
  youtubeUrls: SafeResourceUrl[] = [];

  matchups: Matchup[];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private postService: PostService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private authService: AuthService
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
      this.character = character;
      this.loading = false;

      const videos = this.youtubeVideos();
      videos.forEach(video => {
        this.youtubeUrls.push(
          this.sanitizer.bypassSecurityTrustResourceUrl(video)
        );
      });

      this.youtubeLoading = false;

      this.generateMatchup();

      console.log(this.character);
    });
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

  seriesIcon(): string {
    if (this.character.series) {
      return this.character.series.gameIcon.url;
    }

    return 'https://www.stickpng.com/assets/images/5a4613ddd099a2ad03f9c994.png';
  }

  getGameClass(): string {
    return GameThemes.getThemeForGameId(this.character.game.id);
  }

  isContributor(): boolean {
    return (
      this.character.contributors.find(
        contributor => contributor.user.id === this.authService.id
      ) !== null
    );
  }

  editCharacter(): void {
    this.router.navigate([StaticRoutes.editCharacterNoId, this.character.id]);
  }

  viewUser(userId: number): void {
    this.router.navigate([StaticRoutes.viewUserNoId, userId]);
  }

  private generateMatchup() {
    this.characterService
      .getForGame(this.character.game.id)
      .subscribe(characters => {
        const matchups: Matchup[] = [];
        for (const characterTwo of characters) {
          const matchup = new Matchup();
          matchup.character1 = this.character;
          matchup.character1Id = this.character.id;
          matchup.character2 = characterTwo;
          matchup.character2Id = characterTwo.id;
          matchup.value = Math.floor(Math.random() * 9) + -4;
          matchups.push(matchup);
        }

        this.matchups = matchups;
      });
  }
}
