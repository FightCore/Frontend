import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.scss']
})
export class DiscordComponent implements OnInit {
  @Input() serverId: string = '477272627250069505';
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getDiscordUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://discordapp.com/widget?id=${this.serverId}&theme=dark`);
  }
}
