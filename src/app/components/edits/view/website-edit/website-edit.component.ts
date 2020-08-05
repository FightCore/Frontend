import { Component, OnInit, Input } from '@angular/core';
import { CsharpJsonHelper } from 'src/app/helpers/csharp-json-helper';
import { WebsiteResource } from 'src/app/models/resources/websiteResource';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.scss']
})
export class WebsiteEditComponent implements OnInit {
  @Input() target: string;
  constructor() { }
  website: WebsiteResource;
  ngOnInit(): void {
    this.website = CsharpJsonHelper.parseUpperCaseObject(this.target);
  }
}
