import { Component, OnInit, Input } from '@angular/core';
import { EditDto } from 'src/app/models/edits/edit-dto';
import { NotablePlayer } from 'src/app/models/notablePlayer';
import { CsharpJsonHelper } from 'src/app/helpers/csharp-json-helper';

@Component({
  selector: 'app-update-notable-player-edit',
  templateUrl: './update-notable-player-edit.component.html',
  styleUrls: ['./update-notable-player-edit.component.scss']
})
export class UpdateNotablePlayerEditComponent implements OnInit {
  @Input() editDto: EditDto;
  notablePlayer: NotablePlayer;
  constructor() { }

  ngOnInit(): void {
    this.notablePlayer = CsharpJsonHelper.parseUpperCaseObject(this.editDto.target) as NotablePlayer;
  }
}
