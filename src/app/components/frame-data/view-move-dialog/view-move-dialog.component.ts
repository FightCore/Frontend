import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Move } from 'src/app/models/framedata/move';
import * as SuperGif from 'src/scripts/libgif.js';

@Component({
  selector: 'app-view-move-dialog',
  templateUrl: './view-move-dialog.component.html',
  styleUrls: ['./view-move-dialog.component.scss']
})
export class ViewMoveDialogComponent implements OnInit, AfterViewInit {

  @Input() move: Move;
  @Input() characterName: string;
  @ViewChild('moveImage') moveImage: ElementRef;
  superGif: SuperGif;
  attributes: {name: string, value: any}[];

  constructor() { }
  ngAfterViewInit(): void {
    console.log(this.moveImage);
    this.superGif = new SuperGif({ gif: this.moveImage.nativeElement } );
    this.superGif.load(() => console.log('Wow it fucking works'));
  }

  ngOnInit(): void {
    this.attributes = [
      { name: 'Start', value: this.move.start},
      { name: 'End', value: this.move.end},
      { name: 'IASA', value: this.move.iasa},
      { name: 'Total Frames', value: this.move.totalFrames},
      { name: 'Land lag', value: this.move.landLag},
      { name: 'L-Canceled Land lag', value: this.move.lCanceledLandLang},
      { name: 'Auto cancel before', value: this.move.autoCancelBefore},
      { name: 'Auto cancel after', value: this.move.autoCancelAfter},
      { name: 'Notes', value: this.move.notes},
      { name: 'Source', value: this.move.source}
    ];
  }

  nextFrame(): void {
    	this.superGif.move_relative(1);
  }

  previousFrame(): void {
    this.superGif.move_relative(-1);
  }

  pauseGif(): void {
    if (this.superGif.get_playing()) {
      this.superGif.pause();
    } else {
      this.superGif.play();
    }
  }

}
