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
  matchupsLoading = true;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private postService: PostService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private matchupService: MatchupService
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
    });

    this.matchupService.getAll(characterId).subscribe(matchups => {
      this.matchups = matchups;
      this.matchupsLoading = false;
    }, error => {
        this.matchups = [];
        this.matchupsLoading = false;
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

  getGameClass(): string {
    return GameThemes.getThemeForGameId(this.character.game.id);
  }

  isContributor(): boolean {
    const foundContributor = this.character.contributors.find(
      contributor => contributor.user.id === this.authService.id
    );

    return (foundContributor !== null && foundContributor !== undefined);
  }

  editCharacter(): void {
    this.router.navigate([StaticRoutes.editCharacterNoId, this.character.id]);
  }
  openUrl(url: string): void {
    window.open(url, '_blank');
  }
}
