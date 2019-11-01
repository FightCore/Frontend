import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() confirmText = 'Confirm';
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
  }

  confirmClick() {
    if (this.confirmed) {
      this.confirmed.emit(true);
    }
  }

}
