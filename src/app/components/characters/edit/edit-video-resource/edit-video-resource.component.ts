import { Component, Input, OnInit } from '@angular/core';
import { VideoResource } from 'src/app/models/videoResource';

@Component({
  selector: 'app-edit-video-resource',
  templateUrl: './edit-video-resource.component.html',
  styleUrls: ['./edit-video-resource.component.scss']
})
export class EditVideoResourceComponent implements OnInit {

  constructor() { }
  @Input() videos: VideoResource[];
  ngOnInit(): void {
  }

  createVideo(): void {
    const video = new VideoResource();
    video.new = true;
    this.videos.unshift(video);
  }

  deleteVideo(video: VideoResource): void {
    const index = this.videos.indexOf(video);
    if (index > -1) {
      this.videos.splice(index, 1);
    }
  }
}
