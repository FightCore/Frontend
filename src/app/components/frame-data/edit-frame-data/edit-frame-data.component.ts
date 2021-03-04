import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MovesHelper } from 'src/app/helpers/moves-helper';
import { Move } from 'src/app/models/framedata/move';

@Component({
  selector: 'app-edit-frame-data',
  templateUrl: './edit-frame-data.component.html',
  styleUrls: ['./edit-frame-data.component.scss']
})
export class EditFrameDataComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditFrameDataComponent>) { }
  @Input() move: Move;
  @Input() characterName: string;
  attributes: any;
  displayedColumns = ['name', 'value', 'input', 'save'];
  ngOnInit(): void {
    this.attributes = MovesHelper.getMoveAttributes(this.move);
  }
}
