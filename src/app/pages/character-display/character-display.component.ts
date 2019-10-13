import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { Post } from 'src/app/models/post';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GameThemes } from 'src/styles/gameThemes';

@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.scss']
})
export class CharacterDisplayComponent implements OnInit {
  loading: boolean = true;
  character: Character;
  posts: Post[];
  youtubeUrls: SafeResourceUrl[] = [];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private postService: PostService,
    private router: Router,
    private sanitizer: DomSanitizer) {
    }

  ngOnInit() {

    const characterId = parseFloat(this.route.snapshot.paramMap.get('characterId'));
    this.characterService.getPosts(characterId).subscribe(posts =>
      this.posts = posts);

    this.characterService.get(characterId).subscribe(character => {
      this.character = character;
      const videos = this.youtubeVideos();
      videos.forEach(video => {
        this.youtubeUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(video));
      });
      this.loading = false;
    });
  }

  private youtubeVideos(): string[] {
    const videos = [];
    this.character.videos.forEach(video => {
      console.log(video);
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
}
