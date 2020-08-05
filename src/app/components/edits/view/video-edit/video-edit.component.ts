import { Component, OnInit, Input } from '@angular/core';
import { VideoResource } from 'src/app/models/videoResource';
import { CsharpJsonHelper } from 'src/app/helpers/csharp-json-helper';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit {
  @Input() target: string;
  constructor() { }
  videoResource: VideoResource;

  ngOnInit(): void {
    this.videoResource = CsharpJsonHelper.parseUpperCaseObject(this.target) as VideoResource;
  }

}
