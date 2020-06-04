import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-help',
  templateUrl: './post-help.component.html',
  styleUrls: ['./post-help.component.scss']
})
export class PostHelpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PostHelpComponent>,
  ) { }

  ngOnInit() {
  }

}
