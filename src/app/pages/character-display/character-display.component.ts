import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { CharacterService } from 'src/app/services/character/character.service';
import { Character } from 'src/app/models/character';
import { Post } from 'src/app/models/post';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    const videos = this.youtubeVideos();
    videos.forEach(video => {
      this.youtubeUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(video));
    });

    const characterId = this.route.snapshot.paramMap.get('characterId');
    this.postService.getPosts().subscribe(posts =>
      this.posts = posts);

    this.characterService.get(parseFloat(characterId)).subscribe(character => {
      this.character = character;
      this.loading = false;
      console.log(this.character);
    });
  }

  lorem(): string {
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ullamcorper ornare orci in gravida. Vivamus cursus, felis eget scelerisque faucibus, ex ligula mollis elit, in tristique eros nisl quis quam. Donec dictum tellus ut egestas posuere. Maecenas congue, turpis ut cursus tempus, sem lorem euismod ipsum, a hendrerit nulla sem nec sapien. Phasellus metus nulla, lobortis ac felis eu, malesuada pretium nunc. Proin vulputate eu dolor non tincidunt. Curabitur consequat leo sed ligula convallis tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis rutrum placerat diam. Quisque vel dignissim orci. Nam vitae ante hendrerit, hendrerit turpis vitae, cursus nulla.\n\nEtiam consectetur augue eget ultrices aliquet. Integer dictum odio vitae mauris posuere porttitor. Suspendisse quis pretium sem. Aliquam erat volutpat. Nullam ultrices tempor eros et tempus. Mauris sagittis sed diam vitae tincidunt. Aenean sapien massa, condimentum non commodo vel, semper non felis. Nam non nunc at nisi porta faucibus in id lacus. Etiam vestibulum nisl vel urna accumsan varius a ac tellus. Proin eget libero augue. Aliquam erat volutpat.';
  }

  private youtubeVideos(): string[] {
    return [
      "https://www.youtube.com/embed/MyTg9PqCMac",
      "https://www.youtube.com/embed/CN9Qnn9Zdq4",
      "https://www.youtube.com/embed/6Lns6lSy0mQ",
      "https://www.youtube.com/embed/8C5klDv-y_A"
    ];
  }
}
