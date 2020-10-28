import { Component, OnInit, Input } from '@angular/core';
import { Hitbox } from 'src/app/models/framedata/hitbox';
import { MatTableDataSource } from '@angular/material/table';
import { UserOptions } from 'src/app/options/userOptions';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-hitbox-table-dialog',
  templateUrl: './hitbox-table-dialog.component.html',
  styleUrls: ['./hitbox-table-dialog.component.scss'],
})
export class HitboxTableDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<HitboxTableDialogComponent>,
  ) {}
  @Input() hitboxes: Hitbox[];
  @Input() moveName: string;

  columns = [
    'name',
    'damage',
    'angle',
    'knockbackGrowth',
    'setKnockback',
    'baseKnockback',
    'effect',
    'hitlagAttacker',
    'hitlagDefender',
    'shieldstun',
  ];
  hitboxDataSource: MatTableDataSource<Hitbox>;
  ngOnInit(): void {
    this.hitboxDataSource = new MatTableDataSource(this.hitboxes);
  }

  isDarkMode(): boolean {
    return UserOptions.getDarkMode();
  }
}
