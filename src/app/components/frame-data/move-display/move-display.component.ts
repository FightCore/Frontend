import { Component, OnInit, Input } from '@angular/core';
import { Move } from 'src/app/models/framedata/move';
import { MatDialog } from '@angular/material/dialog';
import { HitboxTableDialogComponent } from '../hitbox-table-dialog/hitbox-table-dialog.component';
import { ViewMoveDialogComponent } from '../view-move-dialog/view-move-dialog.component';

@Component({
  selector: 'app-move-display',
  templateUrl: './move-display.component.html',
  styleUrls: ['./move-display.component.scss']
})
export class MoveDisplayComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  @Input() move: Move;
  @Input() characterName: string;
  @Input() displayMoveGifs: boolean;
  attributes: any[];

  ngOnInit(): void {
    this.attributes = [
      { name: 'Start', value: this.move.start, important: true},
      { name: 'End', value: this.move.end, important: true},
      { name: 'Total Frames', value: this.move.totalFrames, important: true},
      { name: 'IASA', value: this.move.iasa},
      { name: 'Land lag', value: this.move.landLag},
      { name: 'L-Canceled Land lag', value: this.move.lCanceledLandLang},
      { name: 'Auto cancel before', value: this.move.autoCancelBefore},
      { name: 'Auto cancel after', value: this.move.autoCancelAfter},
    ];
  }

  openHitboxes(move: Move): void {
    const dialog = this.dialog.open(HitboxTableDialogComponent, { width: '1600px'});
    dialog.componentInstance.hitboxes = move.hitboxes;
    dialog.componentInstance.moveName = move.name;
  }

  openMove(move: Move): void {
    const dialog = this.dialog.open(ViewMoveDialogComponent, { width: '1600px', maxHeight: '85vh'});
    dialog.componentInstance.move = move;
    dialog.componentInstance.characterName = this.characterName;
  }
}
