import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {
  @Input() character: Character;

  constructor() { }

  ngOnInit() {
  }

  openInNewTab(url: string): void {
    window.open(url, '_blank');
  }
}
