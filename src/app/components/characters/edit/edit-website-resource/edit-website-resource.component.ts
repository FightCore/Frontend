import { Component, Input, OnInit } from '@angular/core';
import { WebsiteResource } from 'src/app/models/resources/websiteResource';

@Component({
  selector: 'app-edit-website-resource',
  templateUrl: './edit-website-resource.component.html',
  styleUrls: ['./edit-website-resource.component.scss']
})
export class EditWebsiteResourceComponent implements OnInit {

  constructor() { }
  @Input() websites: WebsiteResource[];

  ngOnInit(): void {
  }

  createWebsite(): void {
    const website = new WebsiteResource();
    website.new = true;
    this.websites.unshift(website);
  }

  deleteWebsite(website: WebsiteResource): void {
    const index = this.websites.indexOf(website);
    if (index > -1) {
      this.websites.splice(index, 1);
    }
  }
}
