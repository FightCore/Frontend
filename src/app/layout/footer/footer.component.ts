import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  links = [
    {
      icon: ['fab', 'github'],
      url: environment.links.github,
    },
    {
      icon: ['fab', 'docker'],
      url: environment.links.dockerhub
    },
    {
      icon: ['fab', 'discord'],
      url: environment.links.discord
    },
    {
      icon: ['fas', 'mug-hot'],
      url: environment.links.kofi
    },
    {
      icon: ['fab', 'twitter'],
      url: environment.links.twitter
    }
  ];
  constructor() {}

  ngOnInit() {}

  openUrl(url: string) {
    window.open(url);
  }
}
