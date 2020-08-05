import { Component, OnInit, Input } from '@angular/core';
import { NotablePlayer } from 'src/app/models/notablePlayer';
import { CsharpJsonHelper } from 'src/app/helpers/csharp-json-helper';

@Component({
  selector: 'app-notable-player-edit',
  templateUrl: './notable-player-edit.component.html',
  styleUrls: ['./notable-player-edit.component.scss']
})
export class NotablePlayerEditComponent implements OnInit {
  @Input() target: string;
  notablePlayer: NotablePlayer;
  constructor() { }

  ngOnInit(): void {
    this.notablePlayer = CsharpJsonHelper.parseUpperCaseObject(this.target) as NotablePlayer;
  }
}
